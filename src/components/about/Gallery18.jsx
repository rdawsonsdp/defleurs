"use client";

import React from "react";

const defaultImages = [
  { src: "/about/interior-2.jpg", alt: "Dining room", aspect: "aspect-[4/3]" },
  { src: "/about/interior-3.jpg", alt: "Bar area", aspect: "aspect-square" },
  { src: "/about/exterior-2.jpg", alt: "Storefront", aspect: "aspect-square" },
  { src: "/about/interior-4.jpg", alt: "Table setting", aspect: "aspect-[4/3]" },
];

export function Gallery18({
  label = "Inside & Out",
  heading = "The Space",
  images = defaultImages,
} = {}) {
  return (
    <section className="bg-white px-[5%] py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-neutral-400">
            {label}
          </p>
          <h2 className="font-didot text-3xl italic tracking-wide md:text-4xl lg:text-5xl">
            {heading}
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-neutral-300" />
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {images.map((img, i) => (
            <div
              key={img.src || i}
              className={`overflow-hidden bg-neutral-200 ${img.aspect || "aspect-square"}`}
            >
              <img
                src={img.src || img.url}
                alt={img.alt || "Gallery image"}
                className="size-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
