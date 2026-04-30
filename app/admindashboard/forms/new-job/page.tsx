"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function NewJobPage() {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const [pricing, setPricing] = useState<any>({
    mulch: {},
    gas: {},
    dump: {},
  });

  useEffect(() => {
    let isMounted = true;

    const fetchPricing = async () => {
      const { data, error } = await supabase
        .from("pricing")
        .select("*");

      if (error || !data || !isMounted) return;

      const grouped: any = {
        mulch: {},
        gas: {},
        dump: {},
      };

      for (const p of data) {
        if (!grouped[p.category]) grouped[p.category] = {};
        grouped[p.category][p.key] = Number(p.value);
      }

      setPricing({ ...grouped }); // IMPORTANT: force new reference
    };

    fetchPricing();

    const channel = supabase
      .channel("pricing-live-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "pricing",
        },
        () => {
          // IMPORTANT: debounce-style refresh (prevents race conditions)
          setTimeout(() => {
            fetchPricing();
          }, 100);
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  // =========================
  // HANDLE INPUTS
  // =========================
  const handleChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: Number(e.target.value) || e.target.value,
    });
  };

  // =========================
  // CALCULATION ENGINE
  // =========================
  const calculate = () => {
    const labor = (data.hours || 0) * (data.workers || 0) * 20;

    const mulch =
      (data.mulchYards || 0) *
      (pricing.mulch?.[data.mulchType] || 0);

    const gas =
      (data.miles || 0) *
      (pricing.gas?.[data.truck] || 0);

    const dump =
      (data.dumps || 0) *
      (pricing.dump?.[data.dumpType] || 0);

    const other = Number(data.other || 0);

    const misc = (labor + mulch + gas + dump + other) * 0.1;
    const subtotal = labor + mulch + gas + dump + other + misc;
    
    const profit = subtotal * 0.5;
    const total = subtotal + misc + profit;


    return {
      labor,
      mulch,
      gas,
      dump,
      other,
      misc,
      profit,
      subtotal,
      total,
    };
  };

  const costs = calculate();

  // =========================
  // SUBMIT JOB
  // =========================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    const { error } = await supabase.from("jobs").insert([
      {
        name: data.name,
        date: data.date,
        address: data.address,
        notes: data.notes,

        mulchType: data.mulchType,
        mulchYards: data.mulchYards,

        dumpType: data.dumpType,
        dumps: data.dumps,

        hours: data.hours,
        workers: data.workers,
        miles: data.miles,
        truck: data.truck,

        other: data.other,

        labor: costs.labor,
        mulch: costs.mulch,
        gas: costs.gas,
        dump: costs.dump,
        misc: costs.misc,
        profit: costs.profit,
        subtotal: costs.subtotal,
        total: costs.total,
      },
    ]);

    if (error) {
      alert("Error saving job: " + error.message);
    } else {
      setSuccess("Job saved successfully!");
      setData({});
    }

    setLoading(false);
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">

      {/* HEADER */}
      <header className="border-b bg-white dark:bg-zinc-950 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link href="/">B&M Landscaping</Link>
        </h1>

        <div className="flex gap-3">
          <Link href="/admindashboard/forms/new-job" className="navBtn">New Job</Link>
          <Link href="/admindashboard/forms/pricing" className="navBtn">Pricing</Link>
          <Link href="/admindashboard/forms/history" className="navBtn">History</Link>
          <Link href="/admindashboard" className="navBtn">Dashboard</Link>
        </div>
      </header>

      {/* FORM */}
      <div className="max-w-xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Create New Job</h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md"
        >

          {/* BASIC INFO */}
          <input name="name" placeholder="Customer Name" onChange={handleChange} value={data.name || ""} className="w-full p-2 border rounded" />

          <input name="date" placeholder="Job Date" onChange={handleChange} value={data.date || ""} className="w-full p-2 border rounded" />

          <input name="address" placeholder="Address" onChange={handleChange} value={data.address || ""} className="w-full p-2 border rounded" />

          {/* NOTES */}
          <textarea
            name="notes"
            placeholder="Job Notes"
            onChange={handleChange}
            value={data.notes || ""}
            className="w-full p-2 border rounded h-24"
          />

          {/* MULCH */}
          <select name="mulchType" onChange={handleChange} value={data.mulchType || ""} className="w-full p-2 border rounded">
            <option value="">Mulch Type</option>
            <option value="shady_black">Shady Black</option>
            <option value="shady_brown">Shady Brown</option>
            <option value="outdoor">Outdoor</option>
          </select>

          <input name="mulchYards" type="number" placeholder="Mulch Yards" onChange={handleChange} value={data.mulchYards || ""} className="w-full p-2 border rounded" />

          {/* DUMP (FIXED) */}
          <select name="dumpType" onChange={handleChange} value={data.dumpType || ""} className="w-full p-2 border rounded">
            <option value="">Dump Type</option>
            <option value="shady">Shady</option>
            <option value="outdoor">Outdoor</option>
          </select>

          <input name="dumps" type="number" placeholder="Dumps" onChange={handleChange} value={data.dumps || ""} className="w-full p-2 border rounded" />

          {/* LABOR */}
          <input name="hours" type="number" placeholder="Hours" onChange={handleChange} value={data.hours || ""} className="w-full p-2 border rounded" />

          <input name="workers" type="number" placeholder="Workers" onChange={handleChange} value={data.workers || ""} className="w-full p-2 border rounded" />

          {/* TRAVEL */}
          <input name="miles" type="number" placeholder="Miles" onChange={handleChange} value={data.miles || ""} className="w-full p-2 border rounded" />

          <select name="truck" onChange={handleChange} value={data.truck || ""} className="w-full p-2 border rounded">
            <option value="">Truck</option>
            <option value="ram">Ram</option>
            <option value="tacoma">Tacoma</option>
          </select>

          {/* OTHER */}
          <input name="other" type="number" placeholder="Other Costs" onChange={handleChange} value={data.other || ""} className="w-full p-2 border rounded" />

          {/* =========================
              LIVE MARGIN PREVIEW
          ========================= */}
          <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded space-y-2">

            <p>Labor: ${costs.labor.toFixed(2)}</p>
            <p>Mulch: ${costs.mulch.toFixed(2)}</p>
            <p>Gas: ${costs.gas.toFixed(2)}</p>
            <p>Dump: ${costs.dump.toFixed(2)}</p>
            <p>Other: ${costs.other.toFixed(2)}</p>

            <hr className="opacity-30" />

            <p className="font-semibold">
              Subtotal: ${costs.subtotal.toFixed(2)}
            </p>

            <p>Misc (10%): ${costs.misc.toFixed(2)}</p>

            <p className="text-blue-600 font-semibold">
              Profit (50%): ${costs.profit.toFixed(2)}
            </p>

            <p className="text-emerald-600 font-bold text-lg">
              Total: ${costs.total.toFixed(2)}
            </p>

          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white p-3 rounded font-semibold hover:bg-emerald-500"
          >
            {loading ? "Saving..." : "Save Job"}
          </button>

          {success && (
            <p className="text-green-600 font-semibold">{success}</p>
          )}

        </form>
      </div>
    </div>
  );
}