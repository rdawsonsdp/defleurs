"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout89({
  label = "Mastery",
  heading = "A James Beard Award-winning chef leads the way",
  body = "The chef came up through the old way, learning in kitchens where shortcuts were not tolerated and flavor was everything. Recognition came not from chasing trends but from staying true to what works, what tastes right, and what feeds the soul. Every plate that leaves this kitchen carries that same commitment.",
  image = "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
} = {}) {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid grid-cols-1 items-start justify-between gap-x-12 gap-y-5 md:mb-18 md:grid-cols-2 md:gap-x-12 md:gap-y-8 lg:mb-20 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">{label}</p>
            <h3 className="text-5xl font-bold leading-[1.2] md:text-7xl lg:text-8xl">
              {heading}
            </h3>
          </div>
          <div>
            <p className="md:text-md">{body}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Reserve" variant="secondary">
                Reserve
              </Button>
              <Button
                title="Menu"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
              >
                Menu
              </Button>
            </div>
          </div>
        </div>
        <img
          src={image}
          className="w-full object-cover"
          alt="Chef at work"
        />
      </div>
    </section>
  );
}
