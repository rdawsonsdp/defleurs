"use client";

import React, { useState, useMemo } from "react";

/* ─── Icons ──────────────────────────────────────────── */
const CalendarIcon = ({ className = "" }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const PersonIcon = ({ className = "" }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ClockIcon = ({ className = "" }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const PinIcon = ({ className = "" }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const CheckIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

/* ─── Data ───────────────────────────────────────────── */
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const lunchSlots = ["12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM"];
const dinnerSlots = ["5:30 PM", "5:45 PM", "6:00 PM", "6:15 PM", "6:30 PM", "6:45 PM", "7:00 PM", "7:15 PM", "7:30 PM", "7:45 PM", "8:00 PM", "8:15 PM", "8:30 PM", "9:00 PM"];

/* ─── Helpers ────────────────────────────────────────── */
function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Convert Sunday=0 to Monday-start: Mon=0 ... Sun=6
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;
  return { startOffset, daysInMonth };
}

function formatShortDate(date) {
  if (!date) return "";
  const d = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const m = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${d[date.getDay()]}, ${m[date.getMonth()]} ${date.getDate()}`;
}

function formatTabDate(date) {
  if (!date) return "Date";
  const m = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${m[date.getMonth()]} ${date.getDate()}`;
}

/* ─── Main Component ─────────────────────────────────── */
export function ReserveForm() {
  const today = new Date();
  const [activeTab, setActiveTab] = useState(0); // 0=Date, 1=Pers, 2=Hour
  const [step, setStep] = useState("select"); // "select" | "confirmed"
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear, setCalYear] = useState(today.getFullYear());

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedPersons, setSelectedPersons] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [requests, setRequests] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  const { startOffset, daysInMonth } = useMemo(
    () => getCalendarDays(calYear, calMonth),
    [calYear, calMonth]
  );

  const canProceedToDetails = selectedDate && selectedPersons && selectedTime;

  /* ── Calendar navigation ── */
  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
    else setCalMonth(calMonth - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
    else setCalMonth(calMonth + 1);
  };

  /* ── Date selection ── */
  const handleDateSelect = (day) => {
    const d = new Date(calYear, calMonth, day);
    if (d < new Date(today.getFullYear(), today.getMonth(), today.getDate())) return;
    setSelectedDate(d);
    setActiveTab(1);
  };

  /* ── Persons selection ── */
  const handlePersonsSelect = (n) => {
    setSelectedPersons(n);
    setActiveTab(2);
  };

  /* ── Time selection ── */
  const handleTimeSelect = (t) => {
    setSelectedTime(t);
  };

  /* ── Submit details ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const dateStr = selectedDate
      ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
      : "";

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim(),
          email,
          phone,
          date: dateStr,
          time: selectedTime,
          partySize: String(selectedPersons),
          requests,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create reservation");
      }

      setStep("confirmed");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ════════════════════════════════════════════════════════
     CONFIRMATION SCREEN
     ════════════════════════════════════════════════════════ */
  if (step === "confirmed") {
    return (
      <section className="min-h-screen bg-[#f5f0eb] px-[5%] pb-20 pt-24 md:pb-28 md:pt-32 lg:pb-36 lg:pt-40">
        <div className="mx-auto max-w-lg text-center">
          {/* Checkmark */}
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#2a3d3a]">
            <CheckIcon />
          </div>

          <h1 className="mt-8 font-didot text-2xl text-[#2a3d3a] md:text-3xl lg:text-4xl">
            Your reservation at The Parlour is confirmed.
          </h1>

          <p className="mt-4 text-base text-neutral-500">
            Thank you {firstName} for your reservation.
            <br />
            We just sent you a confirmation email.
          </p>

          {/* Summary bar */}
          <SummaryBar date={selectedDate} persons={selectedPersons} time={selectedTime} />

          {/* Get Directions */}
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=18601+Dixie+Hwy+Homewood+IL"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-3 rounded-lg border border-neutral-300 bg-white py-4"
          >
            <PinIcon className="text-[#2a3d3a]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#2a3d3a]">
              Get Directions
            </span>
          </a>
        </div>
      </section>
    );
  }

  /* ════════════════════════════════════════════════════════
     SELECTION SCREEN (Date / Pers / Hour tabs)
     ════════════════════════════════════════════════════════ */
  return (
    <section className="min-h-screen bg-[#f5f0eb] px-[5%] pb-20 pt-24 md:pb-28 md:pt-32 lg:pb-36 lg:pt-40">
      <div className="mx-auto max-w-lg">
        {/* Title */}
        <h1 className="text-center font-didot text-3xl text-[#2a3d3a] md:text-4xl">
          The Parlour @ Maison des Fleurs
        </h1>

        {/* Info banner */}
        <div className="mt-8 rounded-lg bg-[#e8e2db] px-6 py-5">
          <div className="flex gap-3">
            <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#2a3d3a] text-xs font-bold text-white">i</div>
            <div>
              <p className="text-sm leading-relaxed text-neutral-700">
                Reservations are for the tea parlour only. Open Tuesday through Sunday.
              </p>
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#2a3d3a]"
              >
                {showInfo ? "HIDE" : "SHOW"} ▾
              </button>
              {showInfo && (
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  Lunch seatings available Tuesday through Sunday. Dinner seatings available Tuesday through Saturday. Parties larger than 8 please call us directly.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ── Tab Bar ── */}
        <div className="mt-8 flex overflow-hidden rounded-full border border-neutral-300 bg-white">
          <button
            onClick={() => setActiveTab(0)}
            className={`flex flex-1 items-center justify-center gap-2 py-3.5 text-sm transition-colors ${
              activeTab === 0 ? "bg-[#d5cec6] font-medium text-[#2a3d3a]" : "text-neutral-400"
            }`}
          >
            <CalendarIcon className="size-4" />
            {selectedDate ? formatTabDate(selectedDate) : "Date"}
            {selectedDate && <span className="text-[10px]">▾</span>}
          </button>
          <button
            onClick={() => setActiveTab(1)}
            className={`flex flex-1 items-center justify-center gap-2 py-3.5 text-sm transition-colors ${
              activeTab === 1 ? "bg-[#d5cec6] font-medium text-[#2a3d3a]" : "text-neutral-400"
            }`}
          >
            <PersonIcon className="size-4" />
            {selectedPersons ? `${selectedPersons} Pers` : "Pers."}
            {selectedPersons && <span className="text-[10px]">▾</span>}
          </button>
          <button
            onClick={() => setActiveTab(2)}
            className={`flex flex-1 items-center justify-center gap-2 py-3.5 text-sm transition-colors ${
              activeTab === 2 ? "bg-[#d5cec6] font-medium text-[#2a3d3a]" : "text-neutral-400"
            }`}
          >
            <ClockIcon className="size-4" />
            {selectedTime || "Hour"}
          </button>
        </div>

        {/* ── Tab Content ── */}
        <div className="mt-6">
          {/* DATE TAB */}
          {activeTab === 0 && (
            <div>
              {/* Month nav */}
              <div className="flex items-center justify-between px-2">
                <button onClick={prevMonth} className="p-2 text-neutral-600 hover:text-black">
                  <ChevronLeft />
                </button>
                <h3 className="text-xl font-medium text-neutral-900">
                  {MONTHS[calMonth]} {calYear}
                </h3>
                <button onClick={nextMonth} className="p-2 text-neutral-600 hover:text-black">
                  <ChevronRight />
                </button>
              </div>

              {/* Day headers */}
              <div className="mt-4 grid grid-cols-7 gap-1">
                {DAYS.map((d) => (
                  <div key={d} className="py-2 text-center text-xs font-medium uppercase tracking-wider text-neutral-500">
                    {d}
                  </div>
                ))}
              </div>

              {/* Day grid */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: startOffset }).map((_, i) => (
                  <div key={`blank-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const d = new Date(calYear, calMonth, day);
                  const isPast = d < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                  const isSelected = selectedDate && d.toDateString() === selectedDate.toDateString();
                  const isToday = d.toDateString() === today.toDateString();

                  return (
                    <button
                      key={day}
                      disabled={isPast}
                      onClick={() => handleDateSelect(day)}
                      className={`aspect-square rounded-lg border text-base transition-colors
                        ${isPast ? "border-transparent text-neutral-300 cursor-default" : "border-neutral-300 text-neutral-800 hover:border-[#2a3d3a] hover:bg-[#2a3d3a]/5 cursor-pointer"}
                        ${isSelected ? "border-[#2a3d3a] bg-[#2a3d3a] text-white hover:bg-[#2a3d3a] hover:text-white" : ""}
                        ${isToday && !isSelected ? "border-[#2a3d3a]" : ""}
                      `}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* PERSONS TAB */}
          {activeTab === 1 && (
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <button
                  key={n}
                  onClick={() => handlePersonsSelect(n)}
                  className={`rounded-lg border py-6 text-xl transition-colors
                    ${selectedPersons === n
                      ? "border-[#2a3d3a] bg-[#2a3d3a] text-white"
                      : "border-neutral-300 text-neutral-800 hover:border-[#2a3d3a] hover:bg-[#2a3d3a]/5"
                    }`}
                >
                  {n}
                </button>
              ))}
            </div>
          )}

          {/* HOUR TAB */}
          {activeTab === 2 && (
            <div>
              {/* Lunch */}
              <div className="grid grid-cols-3 gap-3">
                {lunchSlots.map((t) => (
                  <button
                    key={t}
                    onClick={() => handleTimeSelect(t)}
                    className={`rounded-lg border py-4 text-sm transition-colors
                      ${selectedTime === t
                        ? "border-[#2a3d3a] bg-[#2a3d3a] text-white"
                        : "border-neutral-300 text-neutral-800 hover:border-[#2a3d3a] hover:bg-[#2a3d3a]/5"
                      }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div className="my-6 h-px bg-neutral-300" />

              {/* Dinner */}
              <div className="grid grid-cols-3 gap-3">
                {dinnerSlots.map((t) => (
                  <button
                    key={t}
                    onClick={() => handleTimeSelect(t)}
                    className={`rounded-lg border py-4 text-sm transition-colors
                      ${selectedTime === t
                        ? "border-[#2a3d3a] bg-[#2a3d3a] text-white"
                        : "border-neutral-300 text-neutral-800 hover:border-[#2a3d3a] hover:bg-[#2a3d3a]/5"
                      }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Details + Book (appears when all tabs filled) ── */}
        {canProceedToDetails && (
          <form onSubmit={handleSubmit} className="mt-10">
            {/* Summary bar */}
            <SummaryBar date={selectedDate} persons={selectedPersons} time={selectedTime} />

            {/* Contact fields */}
            <div className="mt-8 space-y-8">
              {/* Title */}
              <div className="flex flex-wrap gap-6">
                {["Mr.", "Ms.", "Mx."].map((t) => (
                  <label key={t} className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="title"
                      value={t}
                      checked={title === t}
                      onChange={() => setTitle(t)}
                      className="size-5 accent-[#2a3d3a]"
                    />
                    <span className="text-base text-neutral-700">{t}</span>
                  </label>
                ))}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">
                  First name <span className="text-neutral-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full border-0 border-b-2 border-neutral-300 bg-transparent py-3 text-base text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#2a3d3a]"
                  placeholder="Enter your first name"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">
                  Last name <span className="text-neutral-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full border-0 border-b-2 border-neutral-300 bg-transparent py-3 text-base text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#2a3d3a]"
                  placeholder="Enter your last name"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">
                  Email <span className="text-neutral-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-0 border-b-2 border-neutral-300 bg-transparent py-3 text-base text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#2a3d3a]"
                  placeholder="example@domain.com"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border-0 border-b-2 border-neutral-300 bg-transparent py-3 text-base text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#2a3d3a]"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">
                  Special Requests
                </label>
                <input
                  type="text"
                  value={requests}
                  onChange={(e) => setRequests(e.target.value)}
                  className="w-full border-0 border-b-2 border-neutral-300 bg-transparent py-3 text-base text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#2a3d3a]"
                  placeholder="You may enter any special requests"
                />
              </div>
            </div>

            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

            <div className="mt-10">
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 bg-[#2a3d3a] py-5 text-sm uppercase tracking-[0.25em] text-white transition-colors hover:bg-[#1e2e2c] disabled:opacity-50"
              >
                {loading ? "Booking..." : "Book"}
                {!loading && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

/* ─── Summary Bar ────────────────────────────────────── */
function SummaryBar({ date, persons, time }) {
  return (
    <div className="mt-6 flex divide-x divide-neutral-300 rounded-lg border border-neutral-300 bg-white">
      <div className="flex flex-1 items-center justify-center gap-2 py-4">
        <CalendarIcon className="size-4 text-[#2a3d3a]" />
        <span className="text-sm text-neutral-700">{date ? formatShortDate(date) : "—"}</span>
      </div>
      <div className="flex flex-1 items-center justify-center gap-2 py-4">
        <PersonIcon className="size-4 text-[#2a3d3a]" />
        <span className="text-sm text-neutral-700">{persons ? `${persons} Pers` : "—"}</span>
      </div>
      <div className="flex flex-1 items-center justify-center gap-2 py-4">
        <ClockIcon className="size-4 text-[#2a3d3a]" />
        <span className="text-sm text-neutral-700">{time || "—"}</span>
      </div>
    </div>
  );
}
