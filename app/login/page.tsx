'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SESSION_KEY = 'admin_session';
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '1';

  useEffect(() => {
    // Check if session exists and is still valid
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      const sessionData = JSON.parse(session);
      if (Date.now() < sessionData.expiresAt) {
        router.push('/admindashboard');
      } else {
        localStorage.removeItem(SESSION_KEY);
      }
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      // Set session
      const expiresAt = Date.now() + SESSION_TIMEOUT;
      localStorage.setItem(SESSION_KEY, JSON.stringify({ expiresAt }));
      router.push('/admindashboard');
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <div className="mb-6 text-left">
          <Link
            href="/"
            className="inline-block rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
        >
          <h1 className="mb-6 text-2xl font-bold">Admin Login</h1>
          <label className="block mb-2 text-sm font-medium">Enter Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-black"
          />
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
