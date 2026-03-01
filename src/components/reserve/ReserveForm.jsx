"use client";

import React, { useState } from "react";

const timeSlots = [
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
];

const partySizes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];

export function ReserveForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    partySize: "",
    requests: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reservation submitted:", form);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="px-[5%] pb-20 pt-24 md:pb-28 md:pt-32 lg:pb-36 lg:pt-40">
        <div className="mx-auto max-w-xl text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-neutral-400">
            Confirmed
          </p>
          <h1 className="font-didot text-5xl font-normal italic md:text-7xl lg:text-8xl">
            Merci
          </h1>
          <div className="mx-auto mt-6 h-px w-16 bg-neutral-300" />
          <p className="mt-8 text-base leading-relaxed text-neutral-500">
            Your reservation has been received. We look forward to welcoming you
            to The Parlour.
          </p>
          <a
            href="/"
            className="mt-10 inline-block text-xs uppercase tracking-[0.2em] text-neutral-600 transition-colors hover:text-black"
          >
            Return Home
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="px-[5%] pb-20 pt-24 md:pb-28 md:pt-32 lg:pb-36 lg:pt-40">
      <div className="mx-auto max-w-xl">
        {/* Header */}
        <div className="mb-16 text-center md:mb-20">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-neutral-400">
            Your Table Awaits
          </p>
          <h1 className="font-didot text-5xl font-normal italic md:text-7xl lg:text-8xl">
            Reservation
          </h1>
          <div className="mx-auto mt-6 h-px w-16 bg-neutral-300" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-500">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full border-0 border-b border-neutral-300 bg-transparent py-3 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-300 focus:border-neutral-900"
              placeholder="Full name"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-500">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full border-0 border-b border-neutral-300 bg-transparent py-3 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-300 focus:border-neutral-900"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-500">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={form.phone}
              onChange={handleChange}
              className="w-full border-0 border-b border-neutral-300 bg-transparent py-3 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-300 focus:border-neutral-900"
              placeholder="(555) 123-4567"
            />
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-500">
                Date
              </label>
              <input
                type="date"
                name="date"
                required
                value={form.date}
                onChange={handleChange}
                className="w-full border-0 border-b border-neutral-300 bg-transparent py-3 text-sm text-neutral-900 outline-none transition-colors focus:border-neutral-900"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-500">
                Time
              </label>
              <select
                name="time"
                required
                value={form.time}
                onChange={handleChange}
                className="w-full appearance-none border-0 border-b border-neutral-300 bg-transparent py-3 text-sm text-neutral-900 outline-none transition-colors focus:border-neutral-900"
              >
                <option value="">Select a time</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-500">
              Party Size
            </label>
            <select
              name="partySize"
              required
              value={form.partySize}
              onChange={handleChange}
              className="w-full appearance-none border-0 border-b border-neutral-300 bg-transparent py-3 text-sm text-neutral-900 outline-none transition-colors focus:border-neutral-900"
            >
              <option value="">Number of guests</option>
              {partySizes.map((size) => (
                <option key={size} value={size}>
                  {size} {size === "1" ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-500">
              Special Requests
            </label>
            <textarea
              name="requests"
              value={form.requests}
              onChange={handleChange}
              rows={3}
              className="w-full resize-none border-0 border-b border-neutral-300 bg-transparent py-3 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-300 focus:border-neutral-900"
              placeholder="Allergies, celebrations, seating preferences..."
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-neutral-900 py-4 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-black"
            >
              Confirm Reservation
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
