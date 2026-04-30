"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ThankYouClient() {
  const params = useSearchParams();
  const quoteNumber = params.get("quote_number"); // get from URL

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black px-6 py-10">
      <div className="max-w-md w-full rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 text-center">
        <h1 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          Thank You!
        </h1>

        <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">
          Your quote request has been received. 
        </p>


        <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
          We will reach out to you as soon as we can!
        </p>

        <Link
          href="/"
          className="inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}