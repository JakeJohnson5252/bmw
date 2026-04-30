"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminCalendarPage() {
  const buttonClass =
    "rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500";

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const [manualText, setManualText] = useState("");

  const [events, setEvents] = useState<{
    [key: string]: { type: "quote" | "estimate" | "job" | "manual"; text: string }[];
  }>({});

  const [loading, setLoading] = useState(true);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(year, month + offset, 1));
    setSelectedDate(null);
  };

  const formatDateKey = (day: number) => {
    const m = String(month + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${year}-${m}-${d}`;
  };

  // Add manual event
  const addManualEvent = () => {
    if (!selectedDate || !manualText.trim()) return;

    setEvents((prev) => {
      const updated = { ...prev };
      if (!updated[selectedDate]) updated[selectedDate] = [];

      updated[selectedDate].push({
        type: "manual",
        text: manualText,
      });

      return updated;
    });

    setManualText("");
  };

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);

      const { data: quotesData } = await supabase
        .from("Quotes")
        .select("firstName,lastName,service,quote_number,created_at");

      const { data: jobsData } = await supabase
        .from("jobs")
        .select("name,date");

      const { data: bookingsData } = await supabase
        .from("estimate_bookings")
        .select("quote_number,booking_date,booking_time");

      const tempEvents: {
        [key: string]: { type: "quote" | "estimate" | "job" | "manual"; text: string }[];
      } = {};

      if (quotesData) {
        quotesData.forEach((q: any) => {
          const date = new Date(q.created_at);
          const key = `${date.getFullYear()}-${String(
            date.getMonth() + 1
          ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

          if (!tempEvents[key]) tempEvents[key] = [];
          tempEvents[key].push({
            type: "quote",
            text: `Quote - ${q.firstName} ${q.lastName} (#${q.quote_number})`,
          });
        });
      }

      if (jobsData) {
        jobsData.forEach((j: any) => {
          const key = j.date;
          if (!tempEvents[key]) tempEvents[key] = [];
          tempEvents[key].push({
            type: "job",
            text: `Job - ${j.name}`,
          });
        });
      }

      if (bookingsData) {
        bookingsData.forEach((b: any) => {
          const key = b.booking_date;
          if (!tempEvents[key]) tempEvents[key] = [];
          tempEvents[key].push({
            type: "estimate",
            text: `Estimate Booking (#${b.quote_number}) at ${b.booking_time}`,
          });
        });
      }

      setEvents(tempEvents);
      setLoading(false);
    };

    fetchEvents();
  }, [currentDate]);

  const cells = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    cells.push(<div key={`empty-${i}`} />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const key = formatDateKey(day);
    const dayEvents = events[key];
    const hasEvent = dayEvents && dayEvents.length > 0;

    let dayClass =
      "bg-white dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700";

    if (hasEvent) {
      const types = dayEvents.map((e) => e.type);

      if (types.includes("manual")) {
        dayClass = "bg-pink-100 border-pink-400 hover:bg-pink-200";
      } else if (types.includes("estimate") && types.includes("quote") && types.includes("job")) {
        dayClass = "bg-purple-100 border-purple-400 hover:bg-purple-200";
      } else if (types.includes("estimate") && types.includes("quote")) {
        dayClass = "bg-indigo-100 border-indigo-400 hover:bg-indigo-200";
      } else if (types.includes("quote") && types.includes("job")) {
        dayClass = "bg-orange-100 border-orange-400 hover:bg-orange-200";
      } else if (types.includes("estimate") && types.includes("job")) {
        dayClass = "bg-teal-100 border-teal-400 hover:bg-teal-200";
      } else if (types.includes("estimate")) {
        dayClass = "bg-blue-100 border-blue-400 hover:bg-blue-200";
      } else if (types.includes("quote")) {
        dayClass = "bg-emerald-100 border-emerald-400 hover:bg-emerald-200";
      } else if (types.includes("job")) {
        dayClass = "bg-yellow-100 border-yellow-400 hover:bg-yellow-200";
      }
    }

    cells.push(
      <button
        key={day}
        onClick={() => setSelectedDate(key)}
        className={`h-16 rounded-lg border text-sm transition ${dayClass}`}
      >
        <div className="font-semibold">{day}</div>
        {hasEvent && (
          <div className="text-xs text-zinc-700">
            {dayEvents.length} event{dayEvents.length > 1 ? "s" : ""}
          </div>
        )}
      </button>
    );
  }

  const deleteEvent = (date: string, index: number) => {
    setEvents((prev) => {
      const updated = { ...prev };

      if (!updated[date]) return prev;

      updated[date] = updated[date].filter((_, i) => i !== index);

      // Remove date key if empty
      if (updated[date].length === 0) {
        delete updated[date];
      }

      return updated;
    });
  };


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <header className="border-b border-emerald-200/60 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold tracking-tight">
            <a href="/">B&amp;M Landscaping</a>
          </h1>
          <h1 className="text-2xl font-bold">Admin Calendar</h1>
          <div className="flex gap-4">
            <Link href="/admindashboard" className={buttonClass}>
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => changeMonth(-1)} className="px-4 py-2 bg-gray-200 dark:bg-zinc-800 rounded">
            ← Previous
          </button>
          <h2 className="text-2xl font-bold">{monthName} {year}</h2>
          <button onClick={() => changeMonth(1)} className="px-4 py-2 bg-gray-200 dark:bg-zinc-800 rounded">
            Next →
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2 text-center font-semibold">
          <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div>
          <div>Thu</div><div>Fri</div><div>Sat</div>
        </div>

        {loading ? (
          <p className="text-center py-10">Loading...</p>
        ) : (
          <div className="grid grid-cols-7 gap-2">{cells}</div>
        )}

        {selectedDate && (
          <div className="mt-6 p-4 border rounded-lg bg-white dark:bg-zinc-900 shadow">
            <h3 className="font-bold mb-2">Schedule for {selectedDate}</h3>

            {/* Manual Input */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={manualText}
                onChange={(e) => setManualText(e.target.value)}
                placeholder="Add manual event..."
                className="flex-1 px-3 py-2 border rounded-md text-sm bg-white dark:bg-zinc-800"
              />
              <button
                onClick={addManualEvent}
                className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-500"
              >
                Add
              </button>
            </div>

            {events[selectedDate] ? (
              <ul className="ml-5 space-y-2">
                {events[selectedDate].map((event, i) => (
                  <li
                    key={i}
                    className={`flex items-center justify-between px-2 py-1 rounded text-sm ${
                      event.type === "quote"
                        ? "bg-emerald-100 text-emerald-800"
                        : event.type === "estimate"
                        ? "bg-blue-100 text-blue-800"
                        : event.type === "manual"
                        ? "bg-pink-100 text-pink-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    <span>{event.text}</span>

                    <button
                      onClick={() => deleteEvent(selectedDate, i)}
                      className="ml-3 text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </li>
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