"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [phoneMode, setPhoneMode] = useState(false);
 

  const primaryButton =
    "rounded-md bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-500 hover:shadow-lg";

  const outlineButton =
    "rounded-md border border-emerald-300/60 px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900";

  const services = [
    { title: "Weeding", description: "Keep your garden pristine with expert weeding.", img: "/weeding.jpg" },
    { title: "Mulching", description: "Enhance soil health and appearance with mulching.", img: "/mulching.jpg" },
    { title: "Power Washing", description: "Restore surfaces to their original shine.", img: "/powerwash.jpg" },
    { title: "Mowing", description: "Perfectly manicured lawns every time.", img: "/mowing.jpg" },
  ];


  return (
    <div className={`mx-auto min-h-screen flex-col font-sans text-zinc-900 dark:text-zinc-100
      bg-gradient-to-b from-emerald-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-black dark:to-black
      ${phoneMode ? "max-w-[375px] border-x border-emerald-300 dark:border-zinc-800" : ""}`}>

      {/* Header */}
      <header className="border-b border-emerald-200/60 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90 sticky top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <h1 className="text-2xl font-bold tracking-tight hover:text-emerald-600 transition">
            <Link href="/">B&M Landscaping</Link>
          </h1>
          <div className="flex items-center gap-6">
            <div className="flex gap-2">
              <button onClick={() => setPhoneMode(false)} className={phoneMode ? outlineButton : primaryButton}>PC</button>
              <button onClick={() => setPhoneMode(true)} className={phoneMode ? primaryButton : outlineButton}>Phone</button>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Link href="/quote" className={primaryButton}>Request a Quote</Link>
              <Link href="/estimate" className={primaryButton}>Book an Estimate</Link>
              <Link href="/login" className={primaryButton}>Admin Dashboard</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px]">

        
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-6">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
            Transforming Outdoor Spaces
          </h2>
          <p className="text-lg md:text-2xl text-white/90 mb-6 max-w-2xl">
            Residential and commercial landscaping delivering clean, high-quality work that beautifies your property.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link href="/quote" className={primaryButton}>Get a Free Quote</Link>
            <Link href="/estimate" className={outlineButton}>Book an Estimate</Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h3 className="text-4xl font-bold text-center mb-12 border-b-4 border-emerald-500 inline-block pb-2">
          Our Services
        </h3>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, idx) => (
            <div key={idx} className="bg-white dark:bg-zinc-900 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
              <div className="relative h-48">
                <Image src={service.img} alt={service.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">{service.title}</h4>
                <p className="text-zinc-600 dark:text-zinc-400">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h3 className="text-4xl font-bold text-center mb-12 border-b-4 border-emerald-500 inline-block pb-2">Gallery</h3>
        <div className="grid gap-6 md:grid-cols-3 auto-rows-[200px]">
          {["/before.jpg","/after.jpg","/mulch1.jpeg","/mulch2.jpeg","/pwbefore.jpeg","/pwafter.jpeg","/mow1.jpeg","/mow2.jpeg","/mow3.jpeg"].map((src, idx) => (
            <div key={idx} className="relative group overflow-hidden rounded-2xl shadow-lg">
              <Image src={src} alt="Gallery image" fill className="object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-4 text-white font-semibold">
                {`Project ${idx + 1}`}
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Testimonials Section */}
      <section className="bg-emerald-50 dark:bg-zinc-950 py-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Title */}
          <h3 className="text-4xl font-bold text-center mb-12 border-b-4 border-emerald-500 inline-block pb-2">
            Testimonials
          </h3>

          {/* Testimonials Grid */}
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { name: "John D.", quote: "B&M Landscaping transformed my backyard into a paradise!" },
              { name: "Sarah P.", quote: "Professional, punctual, and amazing results every time." },
              { name: "Michael R.", quote: "Highly recommend their services for residential and commercial spaces." },
            ].map((t, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-md hover:shadow-xl transition"
              >
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">"{t.quote}"</p>
                <p className="font-semibold text-emerald-600 dark:text-emerald-400">- {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-emerald-200/60 bg-gradient-to-b from-white to-emerald-50 dark:border-zinc-800 dark:from-zinc-950 dark:to-black">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">
          <div>
            <h4 className="text-lg font-bold">B&M Landscaping</h4>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              Professional landscaping and outdoor transformations you can trust.
            </p>
          </div>
          <div>
            <h4 className="mb-3 font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/quote" className="hover:text-emerald-600 transition">Request Quote</Link></li>
              <li><Link href="/login" className="hover:text-emerald-600 transition">Admin Dashboard</Link></li>
              <li><Link href="/" className="hover:text-emerald-600 transition">Home</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold">Contact & Social</h4>
            <div className="space-y-2 text-sm">
              <a href="mailto:bmlandscaping@gmail.com" className="block hover:text-emerald-600 transition">Email Us</a>
              <a href="https://instagram.com/brownmcgurrin_ls" target="_blank" rel="noopener noreferrer" className="block hover:text-emerald-600 transition">Instagram</a>
              <a href="https://facebook.com/BrownMcGurrinLandscapingServices" target="_blank" rel="noopener noreferrer" className="block hover:text-emerald-600 transition">Facebook</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}