"use client";

import React from "react";

const defaultFeatures = [
  {
    title: "Award-Winning",
    description:
      "Recognized by the James Beard Foundation for excellence in American cuisine.",
  },
  {
    title: "Southern Heritage",
    description:
      "Three decades of technique passed down, refined, and served with pride.",
  },
  {
    title: "Locally Sourced",
    description:
      "Every ingredient chosen with care from farmers and producers we trust.",
  },
];

export function Layout237({ features = defaultFeatures }) {
  return (
    <section className="px-[5%] py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <h3 className="font-didot text-lg italic tracking-wide md:text-xl">
                {feature.title}
              </h3>
              <div className="mx-auto my-4 h-px w-8 bg-neutral-300" />
              <p className="text-sm leading-relaxed text-neutral-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
