'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminPage() {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      const { data } = await supabase
        .from('Quotes')
        .select('*');

      setQuotes(data || []);
      setLoading(false);
    };

    fetchQuotes();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 p-8 dark:bg-black">
      {/* Back to Home */}
      <Link
        href="/"
        className="mb-6 inline-block rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
      >
        ← Back to Home
      </Link>

      <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Admin Dashboard
      </h1>

      {loading ? (
        <p className="text-zinc-600 dark:text-zinc-400">Loading quotes…</p>
      ) : quotes.length === 0 ? (
        <p className="text-zinc-600 dark:text-zinc-400">No quotes found</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border bg-white dark:bg-zinc-950">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-zinc-100 dark:bg-zinc-900">
              <tr>
                {Object.keys(quotes[0]).map((col) => (
                  <th
                    key={col}
                    className="border-b px-4 py-3 text-left font-medium"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {quotes.map((row, i) => (
                <tr key={i} className="border-t">
                  {Object.values(row).map((val, j) => (
                    <td key={j} className="px-4 py-2">
                      {String(val)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
