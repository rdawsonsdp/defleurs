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
    image: "/carousel/croissants.jpg",
    alt: "Warm croissants fresh from the oven",
    title: "Croissants & Scones",
    description:
      "Warm from the oven with homemade clotted cream, soft butter, and mixed jams. The way every morning should begin.",
  },
  {
    image: "/carousel/tea-sandwiches.jpg",
    alt: "Delicate tea sandwiches on a platter",
    title: "Tea Sandwiches",
    description:
      "From tuna cucumber dill to smoked turkey gouda — light, elegant, and made fresh for every service.",
  },
  {
    image: "/carousel/macarons.jpg",
    alt: "French macarons in assorted colors",
    title: "Macarons",
    description:
      "Delicate, colorful, and perfectly crisp on the outside with a soft, chewy center. A classic petit four.",
  },
  {
    image: "/carousel/caesar-salad.jpg",
    alt: "Roman caesar salad with parmesan and croutons",
    title: "Roman Caesar Salad",
    description:
      "Crisp romaine with caesar dressing, fresh parmesan, and golden croutons. Simple, honest, and satisfying.",
  },
  {
    image: "/carousel/berry-trifle.jpg",
    alt: "Mini berry trifle in a glass",
    title: "Mini Berry Trifles",
    description:
      "Layers of cream, cake, and fresh seasonal berries in a glass. One of our most-loved petit fours.",
  },
  {
    image: "/carousel/pastry-display.jpg",
    alt: "Pastry display with madeleines and sweets",
    title: "Petit Fours",
    description:
      "Chocolate dipped madeleines, lemon squares, fruit tarts, and more. Pick four from our daily selection.",
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
    <section id="relume" className="bg-[#ece5dd]">
      <div className="px-[5%] py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center md:mb-20 lg:mb-24">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-neutral-400">
              From Our Kitchen
            </p>
            <h2 className="mb-5 font-didot text-3xl font-normal italic tracking-wide md:mb-6 md:text-4xl lg:text-5xl">
              {heading}
            </h2>
            <div className="mx-auto h-px w-16 bg-neutral-300" />
            <p className="mt-6 text-base leading-relaxed text-neutral-500 md:text-lg">{subheading}</p>
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
