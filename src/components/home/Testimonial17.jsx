"use client";

import React from "react";

const defaultTestimonials = [
  {
    quote:
      "I've eaten in a lot of places, but this is the real thing. You taste the difference.",
    name: "Margaret Hayes",
    title: "Food writer",
  },
  {
    quote:
      "Every bite reminds you why Southern cooking matters. It's not fancy, it's true.",
    name: "Thomas Brennan",
    title: "Chef, Charleston",
  },
  {
    quote:
      "This is what good food tastes like when someone actually cares about it.",
    name: "Sarah Mitchell",
    title: "Restaurant critic",
  },
];

export function Testimonial17({
  label = "Voices",
  testimonials = defaultTestimonials,
} = {}) {
  return (
    <section className="bg-[#ece5dd] px-[5%] py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center md:mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
            {label}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-12">
          {testimonials.map((t, i) => (
            <div key={i} className="text-center">
              <blockquote className="font-didot text-base italic leading-relaxed text-neutral-600 md:text-lg">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mx-auto mt-6 h-px w-8 bg-neutral-300" />
              <p className="mt-4 text-xs font-medium uppercase tracking-[0.15em]">
                {t.name}
              </p>
              <p className="mt-1 text-xs text-neutral-400">{t.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
