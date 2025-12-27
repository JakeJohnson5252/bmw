// app/page.tsx
// https://bmlw.vercel.app/
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function Home() {
  const { data: tempData, error } = await supabase
    .from("Temp") // must EXACTLY match table name (case-sensitive)
    .select("*");

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="rounded-xl border border-red-200 bg-white p-8 text-red-600 shadow-sm dark:border-red-900 dark:bg-zinc-900 dark:text-red-400">
          <h1 className="mb-2 text-lg font-semibold">Something went wrong</h1>
          <p className="text-sm">Error loading data: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-semibold tracking-tight">B&M Landscaping</h1>
          <div className="flex gap-4">
            <Link
              href="/quote"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Request a Quote
            </Link>
            <Link
              href="/login"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      </header>


      {/* Main content */}
      <main className="mx-auto max-w-5xl px-6 py-10">
        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Temp Table</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Live data pulled from Supabase
              </p>
            </div>
          </div>

          {/* Table / Empty state */}
          {tempData && tempData.length > 0 ? (
            <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-zinc-100 dark:bg-zinc-900">
                  <tr>
                    {Object.keys(tempData[0]).map((col) => (
                      <th
                        key={col}
                        className="whitespace-nowrap border-b border-zinc-200 px-4 py-3 text-left font-medium text-zinc-700 dark:border-zinc-800 dark:text-zinc-300"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tempData.map((row: any, rowIndex: number) => (
                    <tr
                      key={rowIndex}
                      className="transition hover:bg-zinc-50 dark:hover:bg-zinc-900"
                    >
                      {Object.values(row).map((val, colIndex) => (
                        <td
                          key={colIndex}
                          className="border-b border-zinc-200 px-4 py-3 text-zinc-700 dark:border-zinc-800 dark:text-zinc-300"
                        >
                          {String(val)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 py-16 text-center dark:border-zinc-700">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                No data found in the Temp table
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
