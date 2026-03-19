"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function NewJobPage() {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: Number(e.target.value) || e.target.value });
  };

  const calculate = () => {
    const labor = (data.hours || 0) * (data.workers || 0) * 20;

    const mulchPrices: any = {
      shady_black: 45,
      shady_brown: 35,
      outdoor: 34.25,
    };
    const mulch = (data.mulchYards || 0) * (mulchPrices[data.mulchType] || 0);

    const gasRates: any = { ram: 0.85, tacoma: 0.8 };
    const gas = (data.miles || 0) * (gasRates[data.truck] || 0);

    const dumpRates: any = { shady: 32.5, sparks: 20 };
    const dump = (data.dumps || 0) * (dumpRates[data.dumpType] || 0);

    const subtotal = labor + mulch + gas + dump + ((labor + mulch + gas + dump) * 0.1);
    const misc = subtotal * 0.1;
    const profit = subtotal * 0.5;
    const total = subtotal + profit;

    return { labor, mulch, gas, dump, misc, profit, subtotal, total };
  };

  const costs = calculate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    const { error } = await supabase.from("jobs").insert([
      {
        name: data.name,
        date: data.date,
        address: data.address,
        mulchType: data.mulchType,
        mulchYards: data.mulchYards,
        dumpType: data.dumpType,
        dumps: data.dumps,
        hours: data.hours,
        workers: data.workers,
        miles: data.miles,
        truck: data.truck,
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

      <div className="max-w-xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Create New Job</h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md">

          {/* CUSTOMER INFO */}
          <div className="space-y-2">
            <label className="font-semibold">Customer Name</label>
            <input
              name="name"
              placeholder="Full name of the customer"
              onChange={handleChange}
              value={data.name || ""}
              className="w-full p-2 border rounded"
            />
          </div>

        <div className="space-y-2">
            <label className="font-semibold">Job Date</label>
            <input
              name="date"
              placeholder="MM/DD/YYYY"
              onChange={handleChange}
              value={data.date || ""}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="space-y-2">
            <label className="font-semibold">Job Address</label>
            <p className="text-sm text-zinc-500">Enter the address of the job</p>
            <input
              name="address"
              placeholder="123 Main St, City, State ZIP"
              onChange={handleChange}
              value={data.address || ""}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* MULCH SELECTION */}
          <div className="space-y-2">
            <label className="font-semibold">Mulch</label>
            <p className="text-sm text-zinc-500">Select the type of mulch and enter quantity in yards</p>
            <select
              name="mulchType"
              onChange={handleChange}
              value={data.mulchType || ""}
              className="w-full p-2 border rounded"
            >
              <option value="" disabled>Select mulch type</option>
              <option value="shady_black">Shady Black Triple Shred</option>
              <option value="shady_brown">Shady Natural Brown</option>
              <option value="outdoor">Outdoor Black/Brown</option>
            </select>
            <input
              name="mulchYards"
              type="number"
              placeholder="Yards of mulch"
              onChange={handleChange}
              value={data.mulchYards || ""}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* DUMP SELECTION */}
          <div className="space-y-2">
            <label className="font-semibold">Dump Location</label>
            <p className="text-sm text-zinc-500">Select where leftover material will be dumped</p>
            <select
              name="dumpType"
              onChange={handleChange}
              value={data.dumpType || ""}
              className="w-full p-2 border rounded"
            >
              <option value="" disabled>Select dump location</option>
              <option value="shady">Shady Brook Farms</option>
              <option value="sparks">Sparks</option>
            </select>
            <input
              name="dumps"
              type="number"
              placeholder="Number of dumps"
              onChange={handleChange}
              value={data.dumps || ""}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* LABOR */}
          <div className="space-y-2">
            <label className="font-semibold">Labor</label>
            <p className="text-sm text-zinc-500">Enter total hours worked and number of workers</p>
            <input
              name="hours"
              type="number"
              placeholder="Total hours worked"
              onChange={handleChange}
              value={data.hours || ""}
              className="w-full p-2 border rounded"
            />
            <input
              name="workers"
              type="number"
              placeholder="Number of workers"
              onChange={handleChange}
              value={data.workers || ""}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* TRAVEL */}
          <div className="space-y-2">
            <label className="font-semibold">Travel</label>
            <p className="text-sm text-zinc-500">Enter round-trip miles and select truck type</p>
            <input
              name="miles"
              type="number"
              placeholder="Miles driven"
              onChange={handleChange}
              value={data.miles || ""}
              className="w-full p-2 border rounded"
            />
            <select
              name="truck"
              onChange={handleChange}
              value={data.truck || ""}
              className="w-full p-2 border rounded"
            >
              <option value="" disabled>Select truck</option>
              <option value="ram">Ram 1500 ($0.85/mile)</option>
              <option value="tacoma">Tacoma ($0.80/mile)</option>
            </select>
          </div>

          {/* COST SUMMARY */}
          <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg space-y-1">
            <p>Labor: ${costs.labor.toFixed(2)}</p>
            <p>Mulch: ${costs.mulch.toFixed(2)}</p>
            <p>Gas: ${costs.gas.toFixed(2)}</p>
            <p>Dump: ${costs.dump.toFixed(2)}</p>
            <p>Misc (10%): ${costs.misc.toFixed(2)}</p>
            <p className="text-blue-600 font-semibold">Profit (50%): ${costs.profit.toFixed(2)}</p>
            <p className="font-semibold">Subtotal: ${costs.subtotal.toFixed(2)}</p>
            <p className="text-emerald-600 font-bold text-lg">
              Total (including misc & profit): ${costs.total.toFixed(2)}
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white p-3 rounded font-semibold hover:bg-emerald-500 transition"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Job"}
          </button>
          {success && <p className="text-green-600 font-semibold">{success}</p>}
        </form>
      </div>
    </div>
  );
}