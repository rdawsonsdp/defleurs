"use client";

import React from "react";

export function Cta31({
  heading = "A table is waiting",
  body = "Come taste what thirty years of dedication looks like.",
} = {}) {
  return (
    <section className="bg-[#f5f0eb] px-[5%] py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-didot text-3xl font-normal italic tracking-wide md:text-4xl lg:text-5xl">
          {heading}
        </h2>
        <div className="mx-auto mt-6 h-px w-16 bg-neutral-300" />
        <p className="mt-8 text-base leading-relaxed text-neutral-500">
          {body}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
          <a
            href="/reserve"
            className="text-xs uppercase tracking-[0.2em] text-neutral-600 transition-colors hover:text-black"
          >
            Reserve
          </a>
          <a
            href="/menu"
            className="text-xs uppercase tracking-[0.2em] text-neutral-600 transition-colors hover:text-black"
          >
            View Menu
          </a>
        </div>
      </div>
    </section>
  );
}
