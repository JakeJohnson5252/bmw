"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [phoneMode, setPhoneMode] = useState(false);

  const primaryButton =
    "rounded-md bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500 hover:shadow-md";

  const outlineButton =
    "rounded-md border border-emerald-300/60 px-5 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900";

  return (
    <div
      className={`mx-auto min-h-screen flex-col font-sans text-zinc-900 dark:text-zinc-100
      bg-gradient-to-b from-emerald-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-black dark:to-black
      ${
        phoneMode
          ? "max-w-[375px] border-x border-emerald-300 dark:border-zinc-800"
          : ""
      }`}
    >
      {/* Header */}
      <header className="border-b border-emerald-200/60 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <h1 className="text-2xl font-bold tracking-tight">
            B&amp;M Landscaping
          </h1>

          <div className="flex items-center gap-6">
            <div className="flex gap-2">
              <button
                onClick={() => setPhoneMode(false)}
                className={phoneMode ? outlineButton : primaryButton}
              >
                PC
              </button>

              <button
                onClick={() => setPhoneMode(true)}
                className={phoneMode ? primaryButton : outlineButton}
              >
                Phone
              </button>
            </div>

            <div className="flex gap-3">
              <Link href="/quote" className={primaryButton}>
                Request a Quote
              </Link>

              <Link href="/login" className={primaryButton}>
                Admin Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15),transparent_60%)]" />

        <div className="relative mx-auto max-w-6xl px-6 py-28 text-center">
          <h2
            className={`mb-4 font-bold tracking-tight ${
              phoneMode ? "text-3xl" : "text-4xl"
            }`}
          >
            Reliable. Professional.{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              Beautiful Results.
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Residential and commercial landscaping delivering clean,
            high-quality work that transforms outdoor spaces.
          </p>

          {phoneMode && (
            <div className="mx-auto mt-8 max-w-sm">
              <Link href="/quote" className={primaryButton + " block text-center"}>
                Get a Free Quote
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Gallery */}
      <main className="flex-1">
        <section className="relative mx-auto max-w-6xl px-6 py-20">

          {/* Background Accent */}
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_65%)]" />

          <h3 className="mb-14 text-center text-4xl font-bold tracking-tight">
            <span className="border-b-4 border-emerald-500 pb-2">Gallery</span>
          </h3>

          {/* Weeding Section */}
          <div className="mb-12">
            <h4 className="mb-4 text-2xl font-semibold">Weeding</h4>
            <div className="grid gap-6 md:grid-cols-3 auto-rows-[200px]">
              <div className="relative group overflow-hidden rounded-2xl shadow-md">
                <Image
                  src="/before.jpg"
                  alt="Before Weeding"
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
              </div>
              <div className="relative group overflow-hidden rounded-2xl shadow-md">
                <Image
                  src="/after.jpg"
                  alt="After Weeding"
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
              </div>
            </div>
          </div>

          {/* Mulching Section */}
          <div className="mb-12">
            <h4 className="mb-4 text-2xl font-semibold">Mulching</h4>
            <div className="grid gap-6 md:grid-cols-2 auto-rows-[200px]">
              <div className="relative group overflow-hidden rounded-2xl shadow-md">
                <Image
                  src="/mulch1.jpeg"
                  alt="Mulching Work"
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
              </div>
              <div className="relative group overflow-hidden rounded-2xl shadow-md">
                <Image
                  src="/mulch2.jpeg"
                  alt="Mulching Work"
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
              </div>
            </div>
          </div>

          {/* Power Washing Section */}
          <div className="mb-12">
            <h4 className="mb-4 text-2xl font-semibold">Power Washing</h4>
            <div className="grid gap-6 md:grid-cols-2 auto-rows-[200px]">
              <div className="relative group overflow-hidden rounded-2xl shadow-md">
                <Image
                  src="/pwbefore.jpeg"
                  alt="Before Power Washing"
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
              </div>
              <div className="relative group overflow-hidden rounded-2xl shadow-md">
                <Image
                  src="/pwafter.jpeg"
                  alt="After Power Washing"
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
              </div>
            </div>
          </div>

          {/* Mowing Section */}
          <div className="mb-12">
            <h4 className="mb-4 text-2xl font-semibold">Mowing</h4>
            <div className="grid gap-6 md:grid-cols-3 auto-rows-[200px]">
              <div className="relative group overflow-hidden rounded-2xl shadow-md">
                <Image
                  src="/mow1.jpeg"
                  alt="Mowing Work"
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
              </div>
              <div className="relative group overflow-hidden rounded-2xl shadow-md">
                <Image
                  src="/mow2.jpeg"
                  alt="Mowing Work"
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
              </div>
              <div className="relative group overflow-hidden rounded-2xl shadow-md">
                <Image
                  src="/mow3.jpeg"
                  alt="Mowing Work"
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-emerald-200/60 bg-gradient-to-b from-white to-emerald-50 dark:border-zinc-800 dark:from-zinc-950 dark:to-black">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">

          {/* Branding */}
          <div>
            <h4 className="text-lg font-bold">B&amp;M Landscaping</h4>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              Professional landscaping and outdoor transformations you can trust.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-3 font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/quote" className="hover:text-emerald-600">
                  Request Quote
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-emerald-600">
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-emerald-600">
                  Home
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-3 font-semibold">Contact & Social</h4>
            <div className="space-y-2 text-sm">
              <a
                href="mailto:bmlandscaping@gmail.com"
                className="block hover:text-emerald-600"
              >
                Email Us
              </a>

              <a
                href="https://instagram.com/brownmcgurrin_ls"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-emerald-600"
              >
                Follow us on Instagram
              </a>

              <a
                href="https://facebook.com/BrownMcGurrinLandscapingServices"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-emerald-600"
              >
                Like us on Facebook
              </a>
            </div>
          </div>
        </div>

        
      </footer>
    </div>
  );
}