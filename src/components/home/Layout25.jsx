"use client";

import React from "react";

export function Layout25({
  label = "The Chef",
  heading = "Thirty years in Southern kitchens",
  body = "He learned from the cooks who never wrote recipes down. Who measured by feel and tasted as they went. A James Beard Award confirmed what the regulars already knew.",
  image = "/images/IMG_8854.jpg",
} = {}) {
  return (
    <section className="bg-white px-[5%] py-20 md:py-28 lg:py-36">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20 lg:gap-28">
        {/* Image — left */}
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={image}
            className="size-full object-cover"
            alt={label}
          />
        </div>

        {/* Text — right */}
        <div>
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
            href="/menu"
            className="mt-10 inline-block text-xs uppercase tracking-[0.2em] text-neutral-600 transition-colors hover:text-black"
          >
            Explore the Menu
          </a>
        </div>
      </div>
    </section>
  );
}
