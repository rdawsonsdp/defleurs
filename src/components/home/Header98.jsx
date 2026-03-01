"use client";

import React from "react";

export function Header98({
  heading = "The Parlour @\nMaison des Fleurs",
  subtitle = "Homewood, IL",
  body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
} = {}) {
  return (
    <section className="bg-white">
      <div className="grid grid-cols-2 gap-1 lg:grid-cols-12 lg:auto-rows-[180px] lg:gap-1.5">
        {/* Hero image with text overlay */}
        <div className="relative col-span-2 aspect-[4/3] overflow-hidden lg:col-start-1 lg:col-end-10 lg:row-start-1 lg:row-end-3 lg:aspect-auto">
          <img
            src="/hero.jpg"
            className="size-full object-cover"
            alt="The Parlour at Maison des Fleurs"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-10 lg:px-14">
            <h1 className="font-didot text-3xl text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-[5.5rem] xl:leading-[1.05]">
              {heading.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <br />}
                  {line}
                </React.Fragment>
              ))}
            </h1>
            <p className="mt-2 font-didot text-base text-white/80 sm:text-lg lg:text-2xl">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Image 1 — top right */}
        <div className="aspect-[3/2] overflow-hidden lg:col-start-10 lg:col-end-13 lg:row-start-1 lg:row-end-2 lg:aspect-auto">
          <img
            src="/carousel/andrej-lisakov-ElxBX6bsAgQ-unsplash.jpg"
            alt="Restaurant ambiance"
            className="size-full object-cover"
          />
        </div>

        {/* Image 2 — middle, offset left */}
        <div className="aspect-[3/2] overflow-hidden lg:col-start-9 lg:col-end-12 lg:row-start-2 lg:row-end-4 lg:z-10 lg:aspect-auto">
          <img
            src="/carousel/olivie-strauss-EGlcU-e4LaQ-unsplash.jpg"
            alt="Plated dish"
            className="size-full object-cover"
          />
        </div>

        {/* Body text — left side below hero */}
        <div className="col-span-2 px-6 py-8 sm:py-10 lg:col-start-1 lg:col-end-6 lg:row-start-3 lg:row-end-5 lg:flex lg:items-start lg:px-8 lg:pt-8">
          <p className="text-sm leading-relaxed text-neutral-600 sm:text-base lg:text-lg lg:leading-loose">
            {body}
          </p>
        </div>

        {/* Image 3 — right side */}
        <div className="aspect-[3/2] overflow-hidden lg:col-start-10 lg:col-end-13 lg:row-start-4 lg:row-end-6 lg:aspect-auto">
          <img
            src="/carousel/luke-southern-4GShi-SQpcg-unsplash.jpg"
            alt="Southern spread"
            className="size-full object-cover"
          />
        </div>

        {/* Image 4 — bottom center */}
        <div className="aspect-[3/2] overflow-hidden lg:col-start-7 lg:col-end-10 lg:row-start-6 lg:row-end-8 lg:aspect-auto">
          <img
            src="/carousel/leilani-angel-q8Hnv_FeQ1s-unsplash.jpg"
            alt="Flower arrangement"
            className="size-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
