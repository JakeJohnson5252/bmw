"use client";

import Link from "next/link";

export default function PricingPage() {
  const card = "bg-white dark:bg-zinc-900 p-5 rounded-xl shadow-md space-y-2";

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
        <h1 className="text-3xl font-bold text-center">Pricing Breakdown</h1>

        {/* LABOR */}
        <div className={card}>
          <h2 className="text-xl font-semibold">Labor</h2>
          <p>$20 per hour per worker</p>
        </div>

        {/* SHADY BROOKE */}
        <div className={card}>
          <h2 className="text-xl font-semibold">Shady Brooke Farms</h2>
          <p className="text-sm text-zinc-500">
            931 Stony Hill Road, Yardley, PA 19067
          </p>

          <div>
            <h3 className="font-semibold">Mulch</h3>
            <p>Black Triple Shred: $45 / yard</p>
            <p>Natural Brown: $35 / yard</p>
          </div>

          <div>
            <h3 className="font-semibold">Dumping</h3>
            <p>Soil Dump: $32.50 / dump</p>
            <p>Brush Dump: $32.50 / dump</p>
          </div>
        </div>

        {/* OUTDOOR */}
        <div className={card}>
          <h2 className="text-xl font-semibold">Outdoor Landscape Supply</h2>
          <p className="text-sm text-zinc-500">
            149 Falls Tullytown Rd, Levittown, PA 19054
          </p>

          <div>
            <h3 className="font-semibold">Mulch</h3>
            <p>Black Triple Shred: $34.25 / yard</p>
            <p>Brown: $34.25 / yard</p>
          </div>
        </div>

        {/* SPARKS */}
        <div className={card}>
          <h2 className="text-xl font-semibold">Sparks</h2>
          <p className="text-sm text-zinc-500">
            2616 Richland Rd, Jamison, PA 18929
          </p>

          <div>
            <h3 className="font-semibold">Dumping</h3>
            <p>Brush Dump: $20 / dump</p>
          </div>
        </div>

        {/* GAS */}
        <div className={card}>
          <h2 className="text-xl font-semibold">Gas / Travel</h2>
          <p>Ram 1500: $0.85 per mile</p>
          <p>Tacoma: $0.80 per mile</p>
        </div>

        {/* MISC + PROFIT */}
        <div className={card}>
          <h2 className="text-xl font-semibold">Additional Costs</h2>
          <p>Miscellaneous: 10% of job total</p>
          <p className="text-emerald-600 font-semibold">
            Profit Margin: +50%
          </p>
        </div>

      </main>
    </div>
  );
}