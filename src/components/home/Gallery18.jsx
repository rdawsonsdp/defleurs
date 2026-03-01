"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@relume_io/relume-ui";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

const defaultMenuItems = [
  {
    image: "/carousel/fried-sampler.jpg",
    alt: "Southern fried sampler platter",
    title: "The Southern Sampler",
    description:
      "Crispy fried chicken, golden popcorn shrimp, hand-battered onion rings, and our tangy house slaw. A little bit of everything done right.",
  },
  {
    image: "/carousel/soul-plate.jpg",
    alt: "Chicken and waffles with maple syrup",
    title: "Chicken & Waffles",
    description:
      "Buttermilk-brined fried chicken over a golden Belgian waffle, served with warm maple syrup and a pat of honey butter. Sweet meets savory.",
  },
  {
    image: "/carousel/crispy-chicken.jpg",
    alt: "Waffle ice cream sandwich with cocoa dust",
    title: "Waffle Ice Cream Sandwich",
    description:
      "Two warm pressed waffles hugging a scoop of house-churned vanilla bean ice cream, dusted with cocoa and cinnamon. Dessert worth saving room for.",
  },
  {
    image: "/carousel/bbq-spread.jpg",
    alt: "Brunch plate with waffles, eggs, bacon, and sausage",
    title: "The Big Southern Brunch",
    description:
      "Fluffy scrambled eggs, crispy smoked bacon, griddled sausage links, a golden waffle, and buttered toast with house-made jam. Morning done the Southern way.",
  },
  {
    image: "/carousel/smoked-ribs.jpg",
    alt: "Baked mac and cheese casserole",
    title: "Baked Mac & Cheese",
    description:
      "Three cheeses melted into elbow pasta, baked until the top is golden and bubbling. Rich, creamy, and impossible to eat just one forkful.",
  },
  {
    image: "/carousel/comfort-classics.jpg",
    alt: "Classic breakfast plate with eggs, waffle, bacon, and hash brown",
    title: "Rise & Shine Plate",
    description:
      "Two sunny-side eggs, a crispy hash brown, thick-cut bacon, and a golden waffle with a side of real maple syrup. The breakfast that keeps you coming back.",
  },
];

const FlipCard = ({ item }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="aspect-square w-full cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped((prev) => !prev)}
    >
      <div
        className="relative size-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front - Image */}
        <div
          className="absolute inset-0"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={item.image}
            alt={item.alt || item.title}
            className="size-full object-cover"
          />
        </div>
        {/* Back - Description */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-black p-6 text-center text-white md:p-8"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <h3 className="mb-3 text-xl font-bold md:text-2xl">{item.title}</h3>
          <p className="text-sm leading-relaxed text-neutral-300 md:text-base">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const useCarousel = () => {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleDotClick = (index) => () => {
    if (api) {
      api.scrollTo(index);
    }
  };

  const dotClassName = (index) => {
    return clsx("relative mx-[3px] inline-block size-2 rounded-full", {
      "bg-black": current === index + 1,
      "bg-neutral-darker/40": current !== index + 1,
    });
  };

  return { api, setApi, handleDotClick, dotClassName };
};

export function Gallery18({
  heading = "The food",
  subheading = "Each plate is a photograph of what we believe in",
  menuItems = defaultMenuItems,
} = {}) {
  const carouselState = useCarousel();
  return (
    <section id="relume">
      <div className="px-[5%] py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="rb-12 mb-12 text-center md:mb-18 lg:mb-20">
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              {heading}
            </h2>
            <p className="md:text-md">{subheading}</p>
          </div>
          <Carousel
            setApi={carouselState.setApi}
            opts={{ loop: true, align: "start" }}
          >
            <div className="relative">
              <CarouselContent className="ml-0">
                {menuItems.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-1/2 px-3 md:basis-1/3 md:px-4"
                  >
                    <FlipCard item={item} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex md:size-12 lg:size-14" />
              <CarouselNext className="hidden md:flex md:size-12 lg:size-14" />
            </div>
            <div className="mt-[30px] flex items-center justify-center md:mt-[46px]">
              {menuItems.map((_, index) => (
                <button
                  key={index}
                  onClick={carouselState.handleDotClick(index)}
                  className={carouselState.dotClassName(index)}
                />
              ))}
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
