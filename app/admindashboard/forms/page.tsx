"use client";

import Link from "next/link";

export default function FormsHomePage() {
  const buttonClass =
    "rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-md hover:bg-emerald-500 w-full text-center";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      
      {/* HEADER */}
      <header className="border-b bg-white dark:bg-zinc-950 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link href="/">B&M Landscaping</Link>
        </h1>

        {/* TOP NAV */}
        <div className="flex gap-3">
          <Link href="/admindashboard/forms/new-job" className="navBtn">New Job</Link>
          <Link href="/admindashboard/forms/pricing" className="navBtn">Pricing</Link>
          <Link href="/admindashboard/forms/history" className="navBtn">History</Link>
          <Link href="/admindashboard" className="dashBtn">Dashboard</Link>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-md mx-auto py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Forms Dashboard
        </h2>

        <div className="flex flex-col gap-6">
          <Link href="/admindashboard/forms/new-job" className={buttonClass}>
            Create New Job
          </Link>

          <Link href="/admindashboard/forms/pricing" className={buttonClass}>
            View Pricing
          </Link>

          <Link href="/admindashboard/forms/history" className={buttonClass}>
            Job History
          </Link>
        </div>
      </main>
    </div>
  );
}