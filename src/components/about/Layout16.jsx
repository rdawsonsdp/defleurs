"use client";

import React from "react";

export function Layout16({
  label = "About Us",
  heading = "A place where tradition meets refinement",
  body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Suspendisse varius enim in eros elementum tristique.",
  image = "/about/interior-1.jpg",
} = {}) {
  const paragraphs = body.split("\n\n");

  return (
    <section className="bg-white px-[5%] py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-12 lg:gap-20">
          {/* Text */}
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-neutral-400">
              {label}
            </p>
            <h2 className="mb-6 font-didot text-3xl italic tracking-wide md:text-4xl lg:text-5xl">
              {heading}
            </h2>
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className={`text-sm leading-relaxed text-neutral-600 md:text-base ${
                  i < paragraphs.length - 1 ? "mb-4" : ""
                }`}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Interior image */}
          <div className="overflow-hidden bg-neutral-200">
            <img
              src={image}
              alt="The Parlour interior"
              className="aspect-[4/5] w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
