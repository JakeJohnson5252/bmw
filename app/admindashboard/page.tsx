"use client";

import Link from "next/link";

export default function AdminDashboard() {
  const buttonClass =
    "rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* Header */}
      <header className="border-b border-emerald-200/60 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-4">
            <Link href="/" className={buttonClass}>
              Home
            </Link>
            <Link href="/quotepage" className={buttonClass}>
              Quotes
            </Link>
            <Link href = "/forms" className={buttonClass}>
              Forms  
            </Link>
            <Link href = "/calendar" className={buttonClass}>
              Calendar  
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Welcome to the Admin Dashboard</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Use the navigation above to manage quotes or go back to the homepage.
        </p>
      </main>
    </div>
  );
}