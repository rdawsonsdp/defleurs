"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

const defaultStats = [
  { value: "35", label: "Years in operation" },
  { value: "1", label: "James Beard Award" },
  { value: "12", label: "Signature dishes served" },
  { value: "98%", label: "Guest satisfaction rating" },
];

export function Stats55({
  label = "Record",
  heading = "What the numbers tell about our kitchen",
  description = "Years of service and recognition speak to consistency. The work matters because we do it right.",
  stats = defaultStats,
} = {}) {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-[0.5fr_1fr] lg:items-center lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">{label}</p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              {heading}
            </h2>
            <p className="md:text-md">{description}</p>
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
          <div className="grid grid-cols-1 gap-8 py-2 md:grid-cols-2">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col justify-center border border-border-primary p-8 text-center"
              >
                <p className="mb-2 text-10xl font-bold leading-[1.3] md:text-[4rem] lg:text-[5rem]">
                  {stat.value}
                </p>
                <h3 className="text-md font-bold leading-[1.4] md:text-xl">
                  {stat.label}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
