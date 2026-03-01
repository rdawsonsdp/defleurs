"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const teas = [
  {
    name: "Jasmine Pearl",
    image: "/tea/tea-1.jpg",
    description:
      "Hand-rolled green tea buds scented with fresh jasmine blossoms. Delicate, floral, and naturally sweet.",
  },
  {
    name: "Earl Grey Crème",
    image: "/tea/tea-2.jpg",
    description:
      "Classic bergamot-kissed black tea softened with a touch of French vanilla and cream.",
  },
  {
    name: "Rooibos & Ginger",
    image: "/tea/tea-3.jpg",
    description:
      "Caffeine-free South African rooibos with warming ginger root. Earthy, spicy, and naturally smooth.",
  },
  {
    name: "Oolong Formosa",
    image: "/tea/tea-4.jpg",
    description:
      "A partially oxidized Taiwanese oolong with honeyed stone-fruit notes and a lingering finish.",
  },
  {
    name: "Moroccan Mint",
    image: "/tea/tea-5.jpg",
    description:
      "Bright spearmint layered over gunpowder green tea. Refreshing, clean, and traditionally served sweet.",
  },
  {
    name: "Lapsang Souchong",
    image: "/tea/tea-6.jpg",
    description:
      "Pine-smoked black tea from the Wuyi Mountains. Bold, campfire-rich, and utterly distinctive.",
  },
  {
    name: "Chamomile Bloom",
    image: "/tea/tea-7.jpg",
    description:
      "Whole Egyptian chamomile flowers steeped to a golden calm. Honeyed, gentle, and perfect before sleep.",
  },
  {
    name: "Silver Needle",
    image: "/tea/tea-8.jpg",
    description:
      "Rare white tea from Fujian province. Downy buds yield a pale, silken liquor with melon undertones.",
  },
  {
    name: "Chai Masala",
    image: "/tea/tea-9.jpg",
    description:
      "Assam black tea simmered with cardamom, cinnamon, clove, and fresh ginger. Rich and warming.",
  },
  {
    name: "Genmaicha",
    image: "/tea/tea-10.jpg",
    description:
      "Japanese green tea blended with toasted brown rice. Nutty, savory, and unexpectedly comforting.",
  },
  {
    name: "Darjeeling First Flush",
    image: "/tea/tea-11.jpg",
    description:
      "Spring-picked from the Himalayan foothills. Light, muscatel, with a bright floral finish.",
  },
  {
    name: "Rose Petal Black",
    image: "/tea/tea-12.jpg",
    description:
      "Yunnan black tea layered with dried rose petals. Smooth, fragrant, and gently romantic.",
  },
  {
    name: "Peppermint Leaf",
    image: "/tea/tea-13.jpg",
    description:
      "Pure whole peppermint leaves, nothing more. Bright, cooling, and naturally caffeine-free.",
  },
  {
    name: "Matcha Ceremonial",
    image: "/tea/tea-14.jpg",
    description:
      "Stone-ground shade-grown tencha from Uji. Vivid green, creamy umami, whisked to a froth.",
  },
  {
    name: "Hibiscus Berry",
    image: "/tea/tea-15.jpg",
    description:
      "Tart hibiscus blossoms with elderberry and rosehip. A ruby-red infusion, bright and refreshing.",
  },
  {
    name: "Dragon Well",
    image: "/tea/tea-16.jpg",
    description:
      "Pan-fired Chinese green tea with a flat, sword-shaped leaf. Chestnut sweetness and a clean finish.",
  },
  {
    name: "Lavender White",
    image: "/tea/tea-17.jpg",
    description:
      "Delicate white tea with Provençal lavender buds. Airy, floral, and impossibly light.",
  },
  {
    name: "Pu-erh Aged",
    image: "/tea/tea-18.jpg",
    description:
      "Fermented and cave-aged Yunnan tea. Deep, earthy, with notes of damp forest floor and dark chocolate.",
  },
];

function TeaCard({ tea, isFlipped, onClick }) {
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
          <p className="mt-2 text-center font-didot text-xs tracking-wide text-neutral-500 sm:text-sm">
            {tea.name}
          </p>
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
          <p className="text-center text-[11px] leading-relaxed text-neutral-500 sm:text-xs">
            {tea.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export function TeaGrid() {
  const [flippedIndex, setFlippedIndex] = useState(null);

  const handleCardClick = (index) => {
    setFlippedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="bg-white px-[5%] py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl lg:max-w-none">
        {/* Header */}
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-neutral-400">
            Our Collection
          </p>
          <h1 className="font-didot text-4xl italic tracking-wide md:text-5xl">
            Explore Our Teas
          </h1>
          <div className="mx-auto mt-6 h-px w-16 bg-neutral-300" />
        </div>

        {/* Grid — 1 col mobile, 3 col tablet, 6 col desktop */}
        <div className="mx-auto grid max-w-xs grid-cols-1 gap-x-4 gap-y-6 sm:max-w-none sm:grid-cols-3 sm:gap-x-5 sm:gap-y-8 lg:grid-cols-6 lg:gap-x-5 lg:gap-y-8">
          {teas.map((tea, index) => (
            <TeaCard
              key={tea.name}
              tea={tea}
              isFlipped={flippedIndex === index}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
