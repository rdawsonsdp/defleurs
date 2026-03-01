"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout109() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 items-start justify-between gap-x-12 gap-y-5 md:mb-18 md:grid-cols-2 md:gap-x-12 md:gap-y-8 lg:mb-20 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Chef's note</p>
            <h3 className="text-5xl font-bold leading-[1.2] md:text-7xl lg:text-8xl">
              Why this dish matters
            </h3>
          </div>
          <div>
            <p className="mb-5 md:mb-6 md:text-md">
              My grandmother made fried chicken on Sundays. The whole
              neighborhood could smell it. That's what I'm trying to recreate
              here, that feeling of something worth gathering for.
            </p>
            <ul className="my-4 list-disc pl-5">
              <li className="my-1 self-start pl-2">
                <p>Built on respect for ingredients</p>
              </li>
              <li className="my-1 self-start pl-2">
                <p>Rooted in Southern culinary tradition</p>
              </li>
              <li className="my-1 self-start pl-2">
                <p>Prepared with intention every service</p>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Learn more" variant="secondary">
                Learn more
              </Button>
              <Button
                title="Back"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
              >
                Back
              </Button>
            </div>
          </div>
        </div>
        <img
          src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
          className="w-full object-cover"
          alt="Relume placeholder image"
        />
      </div>
    </section>
  );
}
