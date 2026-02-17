"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ThankYou() {

  const params = useSearchParams();

  const date = params.get("date");
  const time = params.get("time");

  return (

    <div className="flex min-h-screen items-center justify-center">

      <div className="max-w-md border rounded-xl p-8 text-center">

        <h1 className="text-2xl font-bold mb-2">
          Thank You!
        </h1>

        <p className="mb-4">

          We look forward to seeing you on:

          <br/>

          <strong>
            {date} at {time}
          </strong>

        </p>

        <Link
          href="/"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Home
        </Link>

      </div>

    </div>
  );
}