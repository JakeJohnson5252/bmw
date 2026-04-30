"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function PricingPage() {
  const card = "bg-white dark:bg-zinc-900 p-5 rounded-xl shadow-md space-y-3";

  const [pricing, setPricing] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<number>(0);

  // ------------------------
  // LOAD PRICING
  // ------------------------
  const fetchPricing = async () => {
    const { data } = await supabase.from("pricing").select("*");
    if (data) setPricing(data);
  };

  useEffect(() => {
    fetchPricing();
  }, []);

  // ------------------------
  // SAVE UPDATE
  // ------------------------
  const savePrice = async (id: string) => {
    const { error } = await supabase
      .from("pricing")
      .update({ value: editValue })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setEditingId(null);
    fetchPricing();
  };

  // ------------------------
  // GROUP DATA
  // ------------------------
  const grouped = pricing.reduce((acc: any, item: any) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  // ------------------------
  // RENDER PRICE ROW
  // ------------------------
  const renderItem = (item: any) => {
    const isEditing = editingId === item.id;

    return (
      <div
        key={item.id}
        className="flex justify-between items-center border-b py-1"
      >
        <span className="capitalize">{item.key.replaceAll("_", " ")}</span>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <input
                type="number"
                value={editValue}
                onChange={(e) => setEditValue(Number(e.target.value))}
                className="w-20 p-1 border rounded"
              />
              <button
                onClick={() => savePrice(item.id)}
                className="text-green-600 font-semibold"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <span>${item.value}</span>
              <button
                onClick={() => {
                  setEditingId(item.id);
                  setEditValue(item.value);
                }}
                className="text-blue-600 text-sm"
              >
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    );
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

      <main className="max-w-5xl mx-auto p-6 space-y-8">

        <h1 className="text-3xl font-bold text-center">
          Pricing Editor
        </h1>

        {/* LABOR (static) */}
        <div className={card}>
          <h2 className="text-xl font-semibold">Labor</h2>
          <p>$20 per hour per worker</p>
        </div>

        {/* DYNAMIC PRICING FROM SUPABASE */}
        {Object.keys(grouped).map((category) => (
          <div key={category} className={card}>
            <h2 className="text-xl font-semibold capitalize mb-2">
              {category}
            </h2>

            {grouped[category].map(renderItem)}
          </div>
        ))}

        {/* STATIC RULES */}
        <div className={card}>
          <h2 className="text-xl font-semibold">Additional Rules</h2>
          <p>Miscellaneous: 10% of job total</p>
          <p className="text-emerald-600 font-semibold">
            Profit Margin: +50%
          </p>
        </div>

      </main>
    </div>
  );
}