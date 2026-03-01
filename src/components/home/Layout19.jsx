"use client";

import React from "react";

export function Layout19({
  label = "Origins",
  heading = "Built on what matters",
  body = "This restaurant started with a cast-iron skillet and a conviction. Cook honestly. Source carefully. Serve generously. The rest followed.",
} = {}) {
  return (
    <section className="px-[5%] py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-neutral-400">
          {label}
        </p>
        <h2 className="font-didot text-3xl font-normal italic tracking-wide md:text-4xl lg:text-5xl">
          {heading}
        </h2>
        <div className="mx-auto mt-6 h-px w-16 bg-neutral-300" />
        <p className="mt-8 text-base leading-relaxed text-neutral-500 md:text-lg">
          {body}
        </p>
      </div>
    </section>
  );
}
