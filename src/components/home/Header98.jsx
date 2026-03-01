"use client";

import React from "react";

export function Header98({
  heading = "The Parlour @\nMaison des Fleurs",
  subtitle = "Homewood, IL",
  body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
} = {}) {
  return (
    <section className="bg-white">
      {/* Floral backdrop — decorative, cropped to top */}
      <div className="relative h-[200px] overflow-hidden sm:h-[260px] lg:h-[320px]">
        <img
          src="/images/maison-header-light.png"
          className="size-full object-cover object-top"
          alt=""
          aria-hidden="true"
        />
      </div>

      {/* Centered editorial content */}
      <div className="mx-auto max-w-3xl px-[5%] py-16 text-center md:py-24 lg:py-32">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-neutral-400">
          Laissez-vous envoûter
        </p>
        <h1 className="font-didot text-4xl leading-snug text-neutral-900 sm:text-5xl sm:leading-snug lg:text-6xl lg:leading-snug">
          {heading.split("\n").map((line, i) => (
            <React.Fragment key={i}>
              {i > 0 && <br />}
              {line}
            </React.Fragment>
          ))}
        </h1>
        <p className="mt-5 font-didot text-lg text-neutral-400">{subtitle}</p>
        <div className="mx-auto mt-10 h-px w-16 bg-neutral-300" />
        <p className="mt-10 text-base leading-loose text-neutral-500 md:text-lg md:leading-loose">
          {body}
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-10">
          <a
            href="/menu"
            className="text-xs uppercase tracking-[0.2em] text-neutral-600 transition-colors hover:text-black"
          >
            View Menu
          </a>
          <a
            href="/reserve"
            className="text-xs uppercase tracking-[0.2em] text-neutral-600 transition-colors hover:text-black"
          >
            Reserve a Table
          </a>
        </div>
      </div>

      {/* Hero image — editorial frame */}
      <div className="mx-[5%] pb-16 sm:mx-[8%] md:pb-24 lg:mx-[10%] lg:pb-32">
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src="/hero.jpg"
            className="size-full object-cover"
            alt="The Parlour at Maison des Fleurs"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-6 sm:pr-10 lg:pr-14">
            <h2 className="text-right font-didot text-2xl leading-tight text-white drop-shadow-lg sm:text-3xl md:text-4xl lg:text-5xl">
              The Parlour
              <br />
              <span className="italic">at</span>
              <br />
              Maison de Fleurs
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
