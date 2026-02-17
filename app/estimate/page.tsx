"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EstimateBookingPage() {

  const router = useRouter();

  const buttonClass =
    "rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500";

  const [quoteNumber, setQuoteNumber] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // time slots
  const timeSlots = [];
  for (let hour = 8; hour <= 17; hour++) {
    const suffix = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour;
    timeSlots.push(`${displayHour}:00 ${suffix}`);
  }

  // Load booked slots
  useEffect(() => {
    if (!selectedDate) return;

    loadBookedSlots();

  }, [selectedDate]);

  async function loadBookedSlots() {

    const { data } = await supabase
      .from("estimate_bookings")
      .select("booking_time")
      .eq("booking_date", selectedDate);

    if (data)
      setBookedSlots(data.map(x => x.booking_time));
  }

  const changeMonth = (offset) => {

    setCurrentDate(new Date(year, month + offset, 1));
    setSelectedDate(null);
    setSelectedTime(null);

  };

  const isWeekday = (day) => {

    const date = new Date(year, month, day);
    const d = date.getDay();

    return d !== 0 && d !== 6;
  };

  const formatDate = (day) =>
    `${year}-${String(month + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;

  async function confirmBooking() {

    setError("");

    if (!quoteNumber) {
      setError("You must enter your quote number before booking.");
      return;
    }

    if (!selectedDate || !selectedTime) return;

    setLoading(true);

    const { error } = await supabase
      .from("estimate_bookings")
      .insert({
        quote_number: quoteNumber,
        booking_date: selectedDate,
        booking_time: selectedTime
      });

    setLoading(false);

    if (error) {

      if (error.code === "23505")
        setError("This time slot is already booked.");

      else
        setError("Booking failed. Try again.");

      return;
    }

    // redirect with params
    router.push(
      `/estimate/thank-you?date=${selectedDate}&time=${encodeURIComponent(selectedTime)}`
    );
  }

  // calendar
  const cells = [];

  for (let i=0;i<firstDayOfMonth;i++)
    cells.push(<div key={i}/>);

  for (let day=1;day<=daysInMonth;day++) {

    const weekday = isWeekday(day);

    cells.push(

      <button
        key={day}
        disabled={!weekday}
        onClick={()=>{

          if (!quoteNumber) {

            setError("Enter your quote number first.");
            return;
          }

          setSelectedDate(formatDate(day));
          setSelectedTime(null);
        }}
        className={`h-14 rounded border
        ${
          weekday
          ? "bg-white dark:bg-zinc-800 hover:bg-emerald-100"
          : "bg-gray-200 text-gray-400"
        }`}
      >
        {day}
      </button>
    );
  }

  return (

    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">

      <header className="border-b bg-white dark:bg-zinc-950">

        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between">

          <h1 className="text-xl font-bold">
            <Link href="/">B&M Landscaping</Link>
          </h1>

          <Link href="/" className={buttonClass}>
            Home
          </Link>

        </div>

      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">

        <h2 className="text-3xl font-bold mb-6">
          Book an Estimate
        </h2>

        {/* Quote number */}

        <div className="mb-6">

          <label className="font-semibold block mb-2">
            Enter your Quote Number
          </label>

          <input
            value={quoteNumber}
            onChange={e=>setQuoteNumber(e.target.value)}
            className="border rounded p-2 w-full"
            placeholder="Example: 12345"
          />

          <p className="text-sm text-gray-500 mt-1">
            Don't have a quote number? You must request a quote before booking an estimate.
          </p>

        </div>

        {/* Calendar */}

        <div className="flex justify-between mb-4">

          <button onClick={()=>changeMonth(-1)}>
            Prev
          </button>

          <div className="font-bold">
            {monthName} {year}
          </div>

          <button onClick={()=>changeMonth(1)}>
            Next
          </button>

        </div>

        <div className="grid grid-cols-7 gap-2 mb-6">

          {cells}

        </div>

        {/* Time slots */}

        {selectedDate && (

          <div>

            <h3 className="font-bold mb-2">
              Available times for {selectedDate}
            </h3>

            <div className="grid grid-cols-3 gap-2 mb-4">

              {timeSlots.map(time=>{

                const booked = bookedSlots.includes(time);

                return (

                  <button
                    key={time}
                    disabled={booked}
                    onClick={()=>setSelectedTime(time)}
                    className={`p-2 border rounded
                    ${
                      booked
                      ? "bg-gray-300 text-gray-500"
                      : selectedTime===time
                      ? "bg-emerald-600 text-white"
                      : "bg-white hover:bg-emerald-100"
                    }`}
                  >
                    {time}
                  </button>

                );

              })}

            </div>

            <button
              onClick={confirmBooking}
              disabled={!selectedTime || loading}
              className={buttonClass}
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>

          </div>
        )}

        {error && (
          <div className="text-red-500 mt-4">
            {error}
          </div>
        )}

      </main>

    </div>
  );
}