"use client";

import React, { useState } from "react";

/* ─── Icons ──────────────────────────────────────────── */
const PhoneIcon = ({ className = "" }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
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

/* ─── Main Component ─────────────────────────────────── */
export function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  /* ── Confirmation Screen ── */
  if (submitted) {
    return (
      <section className="min-h-screen bg-[#f5f0eb] px-[5%] pb-20 pt-24 md:pb-28 md:pt-32 lg:pb-36 lg:pt-40">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#2a3d3a]">
            <CheckIcon />
          </div>

          <h1 className="mt-8 font-didot text-2xl text-[#2a3d3a] md:text-3xl lg:text-4xl">
            Thank you for reaching out.
          </h1>

          <p className="mt-4 text-base text-neutral-500">
            We received your message{firstName ? `, ${firstName}` : ""}.
            <br />
            We&apos;ll get back to you as soon as possible.
          </p>

          <a
            href="/"
            className="mt-8 inline-block border border-neutral-300 bg-white px-8 py-4 text-xs uppercase tracking-[0.2em] text-[#2a3d3a] transition-colors hover:bg-neutral-50"
          >
            Back to Home
          </a>
        </div>
      </section>
    );
  }

  /* ── Form Screen ── */
  return (
    <section className="min-h-screen bg-[#f5f0eb] px-[5%] pb-20 pt-24 md:pb-28 md:pt-32 lg:pb-36 lg:pt-40">
      <div className="mx-auto max-w-lg">
        {/* Title */}
        <h1 className="text-center font-didot text-3xl text-[#2a3d3a] md:text-4xl">
          Get in Touch
        </h1>

        {/* Info banner */}
        <div className="mt-8 rounded-lg bg-[#e8e2db] px-6 py-5">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <PhoneIcon className="size-5 shrink-0 text-[#2a3d3a]" />
              <a
                href="tel:+17087981500"
                className="text-sm text-neutral-700 underline-offset-2 hover:underline"
              >
                (708) 798-1500
              </a>
            </div>
            <div className="flex items-center gap-3">
              <PinIcon className="size-5 shrink-0 text-[#2a3d3a]" />
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=18601+Dixie+Hwy+Homewood+IL"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neutral-700 underline-offset-2 hover:underline"
              >
                18601 Dixie Hwy, Homewood, IL 60430
              </a>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-10">
          <div className="space-y-8">
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
                Message <span className="text-neutral-400">*</span>
              </label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full resize-none border-0 border-b-2 border-neutral-300 bg-transparent py-3 text-base text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#2a3d3a]"
                placeholder="How can we help you?"
              />
            </div>
          </div>

          <div className="mt-10">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 bg-[#2a3d3a] py-5 text-sm uppercase tracking-[0.25em] text-white transition-colors hover:bg-[#1e2e2c]"
            >
              Send Message
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
