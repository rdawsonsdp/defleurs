"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export type TeaProduct = {
  name: string;
  image: string;
  description: string;
  price?: string;
  shopifyUrl?: string;
};

type TeaFlipGridProps = {
  tagline?: string;
  heading?: string;
  description?: string;
  products: TeaProduct[];
  shopifyStoreUrl?: string;
};

function TeaCard({
  tea,
  isFlipped,
  onClick,
}: {
  tea: TeaProduct;
  isFlipped: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className="cursor-pointer"
      style={{ perspective: "800px" }}
      onClick={onClick}
    >
      <motion.div
        className="relative w-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div style={{ backfaceVisibility: "hidden" }}>
          <div className="aspect-square w-full overflow-hidden rounded-sm bg-neutral-100">
            <img
              src={tea.image}
              alt={tea.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
          <div className="mt-2 text-center">
            <p className="font-didot text-xs tracking-wide text-neutral-700 sm:text-sm">
              {tea.name}
            </p>
            {tea.price && (
              <p className="mt-1 text-xs text-neutral-400">{tea.price}</p>
            )}
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-sm bg-rose-50/80 px-3"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <p className="mb-2 font-didot text-xs tracking-wide text-neutral-700 sm:text-sm">
            {tea.name}
          </p>
          <p className="mb-3 text-center text-[11px] leading-relaxed text-neutral-500 sm:text-xs">
            {tea.description}
          </p>
          {tea.shopifyUrl && (
            <a
              href={tea.shopifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-sm bg-neutral-800 px-4 py-1.5 text-[10px] uppercase tracking-widest text-white transition-colors hover:bg-neutral-700 sm:text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              Buy Now
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export function TeaFlipGrid({
  tagline = "Our Collection",
  heading = "Explore Our Teas",
  description = "Each blend is selected for character, origin, and craft.",
  products,
  shopifyStoreUrl,
}: TeaFlipGridProps) {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setFlippedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="bg-white px-[5%] py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl lg:max-w-none">
        {/* Header */}
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-neutral-400">
            {tagline}
          </p>
          <h1 className="font-didot text-4xl italic tracking-wide md:text-5xl">
            {heading}
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm text-neutral-500 md:text-base">
            {description}
          </p>
          <div className="mx-auto mt-6 h-px w-16 bg-neutral-300" />
        </div>

        {/* Grid */}
        <div className="mx-auto grid max-w-xs grid-cols-1 gap-x-4 gap-y-6 sm:max-w-none sm:grid-cols-3 sm:gap-x-5 sm:gap-y-8 lg:grid-cols-6 lg:gap-x-5 lg:gap-y-8">
          {products.map((tea, index) => (
            <TeaCard
              key={tea.name}
              tea={tea}
              isFlipped={flippedIndex === index}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>

        {/* Shop link */}
        {shopifyStoreUrl && (
          <div className="mt-12 text-center">
            <a
              href={shopifyStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-neutral-300 px-8 py-3 text-xs uppercase tracking-widest text-neutral-600 transition-colors hover:bg-neutral-50"
            >
              Visit Our Shop
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
