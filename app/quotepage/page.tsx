'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Quote = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: string;
  created_at: string;
};

export default function AdminPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const fetchQuotes = async () => {
    setLoading(true);
    let query = supabase.from('Quotes').select('*').order('created_at', { ascending: false });

    if (filterStatus !== 'All') {
      query = query.eq('status', filterStatus);
    }

    const { data } = await query;
    setQuotes(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchQuotes();
  }, [filterStatus]);

  const updateStatus = async (id: number, newStatus: string) => {
    const { error } = await supabase.from('Quotes').update({ status: newStatus }).eq('id', id);
    if (error) {
      alert(`Error updating status: ${error.message}`);
    } else {
      fetchQuotes();
    }
  };

  const deleteQuote = async (id: number) => {
    if (!confirm('Are you sure you want to delete this quote?')) return;

    const { error } = await supabase.from('Quotes').delete().eq('id', id);
    if (error) {
      alert(`Error deleting quote: ${error.message}`);
    } else {
      fetchQuotes();
    }
  };

  const getRowClass = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-green-100 dark:bg-green-900';
      case 'Contacted':
        return 'bg-yellow-100 dark:bg-yellow-900';
      case 'Completed':
        return 'bg-gray-100 dark:bg-gray-800';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-8 dark:bg-black">
      <Link
        href="/"
        className="mb-6 inline-block rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
      >
        ← Back to Home
      </Link>

      <h1 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Admin Dashboard
      </h1>

      <div className="mb-6">
        <label className="mr-2 text-sm font-medium">Filter by Status:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded border border-zinc-300 px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-black dark:text-zinc-100"
        >
          <option value="All">All</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {loading ? (
        <p className="text-zinc-600 dark:text-zinc-400">Loading quotes…</p>
      ) : quotes.length === 0 ? (
        <p className="text-zinc-600 dark:text-zinc-400">No quotes found</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border bg-white dark:bg-zinc-950">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-zinc-100 dark:bg-zinc-900">
              <tr>
                <th className="border-b px-4 py-3 text-left font-medium">Name</th>
                <th className="border-b px-4 py-3 text-left font-medium">Email</th>
                <th className="border-b px-4 py-3 text-left font-medium">Phone</th>
                <th className="border-b px-4 py-3 text-left font-medium">Service</th>
                <th className="border-b px-4 py-3 text-left font-medium">Message</th>
                <th className="border-b px-4 py-3 text-left font-medium">Status</th>
                <th className="border-b px-4 py-3 text-left font-medium">Created At</th>
                <th className="border-b px-4 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((quote) => (
                <tr key={quote.id} className={`${getRowClass(quote.status)} border-t`}>
                  <td className="px-4 py-2">{quote.firstName} {quote.lastName}</td>
                  <td className="px-4 py-2">{quote.email}</td>
                  <td className="px-4 py-2">{quote.phone}</td>
                  <td className="px-4 py-2">{quote.service}</td>
                  <td className="px-4 py-2">{quote.message}</td>
                  <td className="px-4 py-2">
                    <select
                      value={quote.status}
                      onChange={(e) => updateStatus(quote.id, e.target.value)}
                      className="rounded border border-zinc-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td className="px-4 py-2">{new Date(quote.created_at).toLocaleString()}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => deleteQuote(quote.id)}
                      className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
