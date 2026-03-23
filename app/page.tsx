"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [phoneMode, setPhoneMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
 

  const primaryButton =
    "rounded-md bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-500 hover:shadow-lg";

  const outlineButton =
    "rounded-md border border-emerald-300/60 px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900";

  const services = [
    { title: "Weeding", description: "Keep your garden pristine with expert weeding.", img: "/weeding.jpg" },
    { title: "Mulching", description: "Enhance soil health and appearance with mulching.", img: "/mulching.jpg" },
    { title: "Power Washing", description: "Restore surfaces to their original shine.", img: "/powerwashing.jpg" },
    { title: "Mowing", description: "Perfectly manicured lawns every time.", img: "/mowedlawn.jpg" },
  ];

  const galleryImages = ["/before.jpg","/after.jpg","/pwbefore.jpeg","/pwafter.jpeg", "/mulching1.jpg", "/mulching2.jpg", "/powerwashing1.jpg", "/mulching3.jpg", "/mulching4.jpg", "/trimming.jpg", "/mulching5.jpg", "/mulching6.jpg"];


 
  return (
    <div className={`mx-auto min-h-screen flex-col font-sans text-zinc-900 dark:text-zinc-100
      bg-gradient-to-b from-emerald-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-black dark:to-black
      ${phoneMode ? "max-w-[375px] border-x border-emerald-300 dark:border-zinc-800" : ""}`}>

      {/* Header */}
      <header className="border-b border-emerald-200/60 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90 sticky z-45">
        <div className="flex flex-col items-center py-5 px-4">
          {/* Logo + Title */}
          <div className="flex items-center gap-3">
            <img
              src="/logo.jpg"
              alt="B&M Landscaping Logo"
              className={`${phoneMode ? 'w-32 h-32' : 'w-40 h-40'} object-contain rounded-full`}
            />
            <h1 className="text-2xl font-extrabold tracking-tight hover:text-emerald-600 transition">
              <Link href="/">B&M Landscaping</Link>
            </h1>
          </div>

          {/* Buttons */}
          {phoneMode && (
            <div className="flex flex-col items-center gap-3 mt-4 w-full">
              {/* PC / Phone toggle */}
              <div className="flex gap-2">
                <button 
                  onClick={() => setPhoneMode(false)} 
                  className={outlineButton}
                >
                  PC
                </button>
                <button 
                  onClick={() => setPhoneMode(true)} 
                  className={primaryButton}
                >
                  Phone
                </button>
              </div>

              {/* Main action buttons */}
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                <Link href="/quote" className={`${primaryButton} sm:px-6 sm:py-3 px-3 py-2 text-xs sm:text-sm`}>
                  Request a Quote
                </Link>
                <Link href="/estimate" className={`${primaryButton} sm:px-6 sm:py-3 px-3 py-2 text-xs sm:text-sm`}>
                  Book an Estimate
                </Link>
                <Link href="/login" className={`${primaryButton} sm:px-6 sm:py-3 px-3 py-2 text-xs sm:text-sm`}>
                  Admin Dashboard
                </Link>
              </div>
            </div>
          )}

          {/* PC mode buttons stay on the right */}
          {!phoneMode && (
            <div className="flex items-center gap-6 mt-2">
              <div className="flex gap-2">
                <button 
                  onClick={() => setPhoneMode(false)} 
                  className={primaryButton}
                >
                  PC
                </button>
                <button 
                  onClick={() => setPhoneMode(true)} 
                  className={outlineButton}
                >
                  Phone
                </button>
              </div>

              <div className="flex gap-3 flex-wrap">
                <Link href="/quote" className={primaryButton}>Request a Quote</Link>
                <Link href="/estimate" className={primaryButton}>Book an Estimate</Link>
                <Link href="/login" className={primaryButton}>Admin Dashboard</Link>
              </div>
            </div>
          )}
          
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex justify-center py-10 md:py-16 lg:py-20">
        <div className="relative w-full max-w-7xl rounded-3xl overflow-hidden shadow-lg">
          {/* Background Image */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url("/car.jpeg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Content */}
          <div className="relative px-10 py-30 md:py-38 flex flex-col justify-between items-center text-center h-full">
            
            {/* Top line with lighter shadow box */}
            <div className="bg-black/25 backdrop-blur-md px-6 py-4 rounded-xl shadow-lg mb-10">
              <h2 className="text-4xl md:text-6xl font-extrabold text-white">
                Transforming Outdoor Spaces
              </h2>
            </div>

            {/* Bottom section with lighter shadow box */}
            <div className="flex flex-col items-center gap-6">
              <div className="bg-black/25 backdrop-blur-md px-6 py-4 rounded-xl shadow-lg mb-6 max-w-2xl">
                <p className="text-lg md:text-2xl text-white/90">
                  Residential and commercial landscaping delivering clean, high-quality work that beautifies your property.
                </p>
              </div>

              <div className="flex gap-4 flex-wrap justify-center">
                <Link href="/quote" className={primaryButton}>
                  Get a Free Quote
                </Link>
                <Link href="/estimate" className={primaryButton}>
                  Book an Estimate
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl bg-emerald-600 rounded-3xl shadow-2xl px-8 py-16">

          <h3 className="text-4xl font-bold text-center text-white mb-14 border-b-4 border-white inline-block pb-2">
            Our Services
          </h3>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
              >
                <div className="relative h-48 rounded-t-2xl overflow-hidden border-4 border-white">
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-2">
                    {service.title}
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Gallery Section */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h3 className="text-4xl font-bold text-center mb-12 border-b-4 border-emerald-500 inline-block pb-2">Gallery</h3>
        
        {/* Display first 4 images */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 auto-rows-[200px]">
          {galleryImages.slice(0, 4).map((src, idx) => (
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

        {/* Buttons */}
        <div className="flex gap-4 justify-center mt-8">
          <Link href="/full-gallery" className={    "rounded-md bg-emerald-600 px-10 py-4 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-500 hover:shadow-lg"}>
            View Full Gallery
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
              { quote: "Ben and Andrew did a great job installing concrete pavers as well as edging my flower beds for me. They were on time, clean/neat, and ensured I was satisfied with the work. I can’t recommend them enough. Thanks guys!" },
              { quote: "Definitely highly recommend these guys. They are conscientious and hard workers." },
            ].map((t, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-md hover:shadow-xl transition"
              >
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">"{t.quote}"</p>
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
              <a href="mailto:bmlandscaping@gmail.com" className="block hover:text-emerald-600 transition">Email Us: bmlandscaping@gmail.com</a>
              <a href="https://instagram.com/brownmcgurrin_ls" target="_blank" rel="noopener noreferrer" className="block hover:text-emerald-600 transition">Instagram: brownmcgurrin_ls</a>
              <a href="https://facebook.com/BrownMcGurrinLandscapingServices" target="_blank" rel="noopener noreferrer" className="block hover:text-emerald-600 transition">Facebook: BrownMcGurrinLandscapingServices</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}