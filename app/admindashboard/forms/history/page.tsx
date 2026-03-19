"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function HistoryPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch jobs from Supabase
  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        alert("Error fetching jobs: " + error.message);
      } else {
        setJobs(data || []);
      }
      setLoading(false);
    };

    fetchJobs();
  }, []);

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

      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Job History</h1>

        {loading ? (
          <p className="text-center text-zinc-500">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-center text-zinc-500">No jobs found.</p>
        ) : (
          <div className="space-y-4">
            {jobs.map((job, i) => (
                <div key={i} className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-md space-y-1">
                    <p><strong>Customer:</strong> {job.name ?? "N/A"}</p>
                    <p><strong>Date:</strong> {job.date ?? "N/A"}</p>
                    <p><strong>Address:</strong> {job.address ?? "N/A"}</p>
                    <p><strong>Mulch:</strong> {job.mulchYards ?? 0} yards</p>
                    <p><strong>Mulch Type:</strong> {job.mulchType ? job.mulchType.replace("_", " ") : "N/A"}</p>
                    <p><strong>Dump Location:</strong> {job.dumpType ?? "N/A"}</p>
                    <p><strong>Dumps:</strong> {job.dumps ?? 0}</p>
                    <p><strong>Hours:</strong> {job.hours ?? 0}</p>
                    <p><strong>Workers:</strong> {job.workers ?? 0}</p>
                    <p><strong>Truck:</strong> {job.truck ?? "N/A"}</p>
                    <p><strong>Miles:</strong> {job.miles ?? 0}</p>
                    <hr />
                    <p><strong>Labor:</strong> ${(job.labor ?? 0).toFixed(2)}</p>
                    <p><strong>Mulch:</strong> ${(job.mulch ?? 0).toFixed(2)}</p>
                    <p><strong>Gas:</strong> ${job.gas ?? 0}</p>
                    <p><strong>Dump:</strong> ${(job.dump ?? 0)}</p>
                    <p><strong>Misc:</strong> ${(job.misc ?? 0)}</p>
                    <p className="text-blue-600 font-semibold">Profit: ${job.profit?.toFixed(2) ?? 0}</p>
                    <hr />
                    <p className="font-bold text-emerald-600">Total: ${job.total?.toFixed(2) ?? 0}</p>
                </div>
                ))}
          </div>
        )}
      </main>
    </div>
  );
}