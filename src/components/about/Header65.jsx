"use client";

import React from "react";

export function Header65({
  label = "Our Story",
  heading = "The Parlour",
  backgroundImage = "/about/exterior.jpg",
} = {}) {
  return (
    <section className="relative min-h-[50vh] md:min-h-[60vh]">
      <div className="absolute inset-0 z-0">
        <div className="size-full bg-neutral-200">
          <img
            src={backgroundImage}
            className="size-full object-cover"
            alt="The Parlour exterior"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative z-10 flex min-h-[50vh] flex-col items-center justify-center px-6 text-center md:min-h-[60vh]">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/60">
          {label}
        </p>
        <h1 className="font-didot text-4xl italic tracking-wide text-white sm:text-5xl md:text-6xl lg:text-7xl">
          {heading}
        </h1>
        <div className="mx-auto mt-6 h-px w-16 bg-white/30" />
      </div>
    </section>
  );
}
