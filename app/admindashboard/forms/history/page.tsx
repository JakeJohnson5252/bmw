"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function HistoryPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ---------------- FETCH ----------------
  const fetchJobs = async () => {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) alert(error.message);
    else setJobs(data || []);

    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // ---------------- NOTES SAVE ----------------
  const updateNotes = async (id: string, notes: string) => {
    await supabase.from("jobs").update({ notes }).eq("id", id);
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

      {/* CONTENT */}
      <main className="max-w-4xl mx-auto p-6 space-y-6">

        <h1 className="text-2xl font-bold text-center">Job History</h1>

        {loading ? (
          <p className="text-center text-zinc-500">Loading...</p>
        ) : (
          <div className="space-y-6">

            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-md space-y-1"
              >

                {/* HEADER */}
                <p className="font-bold text-lg">{job.name}</p>

                <p><strong>Date:</strong> {job.date}</p>
                <p><strong>Address:</strong> {job.address}</p>

                <hr />

                {/* JOB DETAILS */}
                <p><strong>Mulch:</strong> {job.mulchYards} yards ({job.mulchType})</p>
                <p><strong>Dump:</strong> {job.dumpType}</p>
                <p><strong>Hours:</strong> {job.hours}</p>
                <p><strong>Workers:</strong> {job.workers}</p>
                <p><strong>Truck:</strong> {job.truck}</p>
                <p><strong>Miles:</strong> {job.miles}</p>

                <hr />

                {/* COST BREAKDOWN */}
                <p>Labor: ${job.labor?.toFixed(2)}</p>
                <p>Mulch: ${job.mulch?.toFixed(2)}</p>
                <p>Gas: ${job.gas?.toFixed(2)}</p>
                <p>Dump: ${job.dump?.toFixed(2)}</p>
                <p>Misc: ${job.misc?.toFixed(2)}</p>

                {/* PROFIT (NEW REQUIREMENT) */}
                <p className="text-blue-600 font-semibold">
                  Profit: ${job.profit?.toFixed(2)}
                </p>

                <p className="text-emerald-600 font-bold text-lg">
                  Total: ${job.total?.toFixed(2)}
                </p>

                {/* NOTES (ONLY EDITABLE FIELD) */}
                <div className="pt-3">
                  <strong>Notes:</strong>

                  <textarea
                    defaultValue={job.notes || ""}
                    onBlur={(e) =>
                      updateNotes(job.id, e.target.value)
                    }
                    className="w-full border p-2 rounded h-20 mt-1"
                    placeholder="Add job notes..."
                  />

                  <p className="text-xs text-zinc-500">
                    Auto-saves when you click away
                  </p>
                </div>

              </div>
            ))}

          </div>
        )}
      </main>
    </div>
  );
}