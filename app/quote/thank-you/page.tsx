import Link from "next/link";

export default function ThankYou() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="max-w-md rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h1 className="mb-2 text-2xl font-bold">Thank You!</h1>
        <p className="mb-6 text-sm text-zinc-500">
          Your quote request has been received. We'll be in touch shortly.
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
