"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function FullGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const primaryButton =
    "rounded-md bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-500 hover:shadow-lg";

  const outlineButton =
    "rounded-md border border-emerald-300/60 px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900";

  const galleryImages = [

    "/after.jpg","/before.jpg","/pwafter.jpeg","/pwbefore.jpeg",
    "/mulching1.jpg","/mulching2.jpg","/powerwashing1.jpg",
    "/mulching3.jpg","/mulching4.jpg","/trimming.jpg",
    "/mulching5.jpg","/mulching6.jpg", "/example.jpg","/Picture1.png"
  
  ];

  return (
    <div className="mx-auto min-h-screen flex-col font-sans text-zinc-900 dark:text-zinc-100
      bg-gradient-to-b from-emerald-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-black dark:to-black">

      {/* Header */}
      <header className="border-b border-emerald-200/60 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90 sticky z-45">
        <div className="flex items-center justify-between pl-15 pr-20 py-5">          
          <div className="flex items-center gap-3">
            <img
              src="/logo.jpg"
              alt="B&M Landscaping Logo"
              className="w-40 h-40 object-contain rounded-full"
            />
            <h1 className="text-2xl font-extrabold tracking-tight hover:text-emerald-600 transition">
              <Link href="/">B&M Landscaping</Link>
            </h1>
          </div>
        </div>
      </header>

      {/* Gallery Section */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h3 className="text-4xl font-bold text-center mb-12 border-b-4 border-emerald-500 inline-block pb-2">
          Full Gallery
        </h3>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 auto-rows-[200px]">
          {galleryImages.map((src, idx) => (
            <div
              key={idx}
              className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer"
              onClick={() => setSelectedImage(src)}
            >
              <Image
                src={src}
                alt={`Gallery image ${idx + 1}`}
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="flex justify-center mt-8">
          <Link href="/" className={primaryButton}>
            Back to Home
          </Link>
        </div>

        {/* Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white text-3xl font-bold hover:text-emerald-400"
            >
              &times;
            </button>
            <div className="relative w-full max-w-4xl h-[70vh] md:h-[90vh]">
              <Image
                src={selectedImage}
                alt="Enlarged image"
                fill
                className="object-contain rounded-2xl"
              />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
