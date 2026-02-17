"use client";

import Link from "next/link";
import { useState } from "react";

export default function CalendarPage() {
  const buttonClass =
    "rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500";

  // State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Example scheduled events (replace with database later)
  const events = {
    "2026-02-17": ["Lawn mowing - Smith residence", "Estimate - Johnson"],
    "2026-02-20": ["Mulching job - Brown property"],
    "2026-03-05": ["Tree trimming - Wilson"],
  };

  // Helpers
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  const changeMonth = (offset) => {
    setCurrentDate(new Date(year, month + offset, 1));
    setSelectedDate(null);
  };

  const formatDateKey = (day) => {
    const m = String(month + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${year}-${m}-${d}`;
  };

  // Generate calendar cells
  const cells = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    cells.push(<div key={`empty-${i}`} />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const key = formatDateKey(day);
    const hasEvent = events[key];

    cells.push(
      <button
        key={day}
        onClick={() => setSelectedDate(key)}
        className={`h-16 rounded-lg border text-sm transition
          ${hasEvent
            ? "bg-emerald-100 border-emerald-400 hover:bg-emerald-200"
            : "bg-white dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700"
          }
        `}
      >
        <div className="font-semibold">{day}</div>
        {hasEvent && (
          <div className="text-xs text-emerald-700">
            {hasEvent.length} event{hasEvent.length > 1 ? "s" : ""}
          </div>
        )}
      </button>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* Header */}
      <header className="border-b border-emerald-200/60 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold tracking-tight">
            <a href="/">B&amp;M Landscaping</a>
          </h1>
          <h1 className="text-2xl font-bold">Calendar</h1>
          <div className="flex gap-4">
            <Link href="/admindashboard" className={buttonClass}>
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Calendar */}
      <main className="mx-auto max-w-4xl px-6 py-10">

        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => changeMonth(-1)}
            className="px-4 py-2 bg-gray-200 dark:bg-zinc-800 rounded hover:bg-gray-300"
          >
            ← Previous
          </button>

          <h2 className="text-2xl font-bold">
            {monthName} {year}
          </h2>

          <button
            onClick={() => changeMonth(1)}
            className="px-4 py-2 bg-gray-200 dark:bg-zinc-800 rounded hover:bg-gray-300"
          >
            Next →
          </button>
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 gap-2 mb-2 text-center font-semibold">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2">
          {cells}
        </div>

        {/* Selected Day Popup */}
        {selectedDate && (
          <div className="mt-6 p-4 border rounded-lg bg-white dark:bg-zinc-900 shadow">
            <h3 className="font-bold mb-2">
              Schedule for {selectedDate}
            </h3>

            {events[selectedDate] ? (
              <ul className="list-disc ml-5">
                {events[selectedDate].map((event, i) => (
                  <li key={i}>{event}</li>
                ))}
              </ul>
            ) : (
              <p className="text-zinc-500">No events scheduled.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}