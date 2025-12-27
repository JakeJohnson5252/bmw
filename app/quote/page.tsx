// app/quote/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";


export default function Quote() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const { error } = await supabase.from("Quotes").insert([
      {
        "First Name": firstName,
        "Last Name": lastName,
        "Phone Number": phoneNumber,
        "Email Address": emailAddress,
        "Service Category": serviceCategory,
        "Message": messageText,
      },
    ]);

    if (error) {
      setStatus(`Error submitting quote: ${error.message}`);
    } else {
      setStatus("Quote request submitted successfully!");
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setEmailAddress("");
      setServiceCategory("");
      setMessageText("");
      router.push("/quote/thank-you");

    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900 dark:bg-black dark:text-zinc-100">
      <div className="mx-auto max-w-xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          ← Back
        </Link>

        <h1 className="mb-2 text-3xl font-bold tracking-tight">Request a Free Quote</h1>
        <p className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
          Please provide your contact information and service request.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">First Name</label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-black"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Last Name</label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-black"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Phone Number</label>
            <input
              type="tel"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-black"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Email Address</label>
            <input
              type="email"
              required
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-black"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Service Category</label>
            <div>

                <select
                    required
                    value={serviceCategory}
                    onChange={(e) => setServiceCategory(e.target.value)}
                    className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-black"
                >
                    <option value="">Select a service</option>
                    <option value="Mulching">Mulching</option>
                    <option value="Weeding">Weeding</option>
                    <option value="Lawn Care">Lawn Care</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Other">Other</option>
                </select>
                </div>

          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Message</label>
            <textarea
              rows={4}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Tell us more about what you need"
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:opacity-60"
          >
            {loading ? "Submitting…" : "Submit Quote"}
            
          </button>

          {status && (
            <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
