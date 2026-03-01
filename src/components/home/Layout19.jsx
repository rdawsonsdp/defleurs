"use client";

import React from "react";

export function Layout19({
  label = "The Parlour",
  heading = "Where stories pick up right where they left off",
  body = "Every afternoon, the same thing happens. Old friends sit down and decades disappear. Someone tells the story — the one from twenty-five years ago — and the whole table laughs like it was yesterday. The Parlour was made for this. Not just lunch, but the moment you remember why these people matter.",
  image = "/images/parlour-gathering.jpg",
} = {}) {
  return (
    <section className="bg-[#f5f0eb] px-[5%] py-20 md:py-28 lg:py-36">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20 lg:gap-28">
        {/* Text — left */}
        <div className="order-2 md:order-1">
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-neutral-400">
            {label}
          </p>
          <h2 className="font-didot text-3xl font-normal italic tracking-wide md:text-4xl lg:text-5xl lg:leading-snug">
            {heading}
          </h2>
          <div className="mt-8 h-px w-16 bg-neutral-300" />
          <p className="mt-10 text-base leading-loose text-neutral-500 md:text-lg md:leading-loose">
            {body}
          </p>
          <a
            href="/reserve"
            className="mt-10 inline-block text-xs uppercase tracking-[0.2em] text-neutral-600 transition-colors hover:text-black"
          >
            Join Us
          </a>
        </div>

        {/* Image — right */}
        <div className="order-1 aspect-[4/5] overflow-hidden md:order-2">
          <img
            src={image}
            className="size-full object-cover"
            alt={label}
          />
        </div>
      </div>
    </section>
  );
}
