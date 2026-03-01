"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Cta31({
  heading = "Come sit at our table",
  body = "Reserve your seat and taste what matters most to us in every bite",
  image = "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
} = {}) {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl flex flex-col items-center">
        <div className="mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            {heading}
          </h2>
          <p className="md:text-md">
            {body}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-8">
            <Button title="Reserve">Reserve</Button>
            <Button title="Menu" variant="secondary">
              Menu
            </Button>
          </div>
        </div>
        <img
          src={image}
          className="size-full object-cover"
          alt="Relume placeholder image"
        />
      </div>
    </section>
  );
}
