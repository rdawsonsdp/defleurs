"use client";

import React, { useState } from "react";
import { Button, ButtonProps } from "@relume_io/relume-ui";
import { motion } from "framer-motion";

type ImageProps = {
  src: string;
  alt?: string;
};

type ProductProps = {
  image: ImageProps;
  name: string;
  description: string;
  price: string;
  url: string;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  viewAllButton: ButtonProps;
  products: ProductProps[];
};

export type TeaFlipGridProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const TeaFlipGrid = (props: TeaFlipGridProps) => {
  const { tagline, heading, description, viewAllButton, products } = {
    ...TeaFlipGridDefaults,
    ...props,
  };

  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setFlippedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="relume" className="bg-[#f5f0eb] px-[5%] py-20 md:py-28 lg:py-36">
      <div className="container">
        <div className="mb-16 grid grid-cols-1 md:mb-20 md:grid-cols-[1fr_max-content] md:items-end md:gap-x-12 lg:mb-24 lg:gap-x-20">
          <div className="w-full max-w-lg">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-neutral-400 md:mb-6">{tagline}</p>
            <h2 className="mb-4 font-didot text-3xl font-normal italic tracking-wide md:mb-6 md:text-4xl lg:text-5xl">
              {heading}
            </h2>
            <p className="text-base leading-loose text-neutral-500 md:text-lg">{description}</p>
          </div>
          <div className="hidden md:block">
            <Button {...viewAllButton}>{viewAllButton.title}</Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:gap-x-10 md:gap-y-20 lg:grid-cols-4">
          {products.map((product, index) => (
            <TeaCard
              key={index}
              product={product}
              isFlipped={flippedIndex === index}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const TeaCard = ({
  product,
  isFlipped,
  onClick,
}: {
  product: ProductProps;
  isFlipped: boolean;
  onClick: () => void;
}) => {
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
          <div className="mb-4 md:mb-5">
            <img
              src={product.image.src}
              alt={product.image.alt}
              className="aspect-[10/12] size-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
          <div>
            <p className="font-didot text-base tracking-wide text-neutral-800 md:text-lg">{product.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">{product.description}</p>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-sm bg-[#f5f0eb]/90 px-4 lg:px-6"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <p className="mb-2 font-didot text-xs tracking-wide text-neutral-700 sm:text-sm lg:text-base">
            {product.name}
          </p>
          <p className="mb-3 text-center text-[11px] leading-relaxed text-neutral-500 sm:text-xs lg:text-sm">
            {product.description}
          </p>
          {product.url && product.url !== "#" && (
            <a
              href={product.url}
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
};

export const TeaFlipGridDefaults: Props = {
  tagline: "Our Collection",
  heading: "Explore Our Teas",
  description:
    "Each blend is selected for character, origin, and craft.",
  viewAllButton: {
    title: "Visit Our Shop",
    variant: "secondary",
  },
  products: [
    {
      image: { src: "/images/BerryTruffle-ff.png", alt: "Jasmine Pearl" },
      name: "Jasmine Pearl",
      description:
        "Hand-rolled green tea buds scented with fresh jasmine blossoms. Delicate, floral, and naturally sweet.",
      price: "$18",
      url: "#",
    },
    {
      image: { src: "/images/RaspberryRefresh-ff.png", alt: "Earl Grey Crème" },
      name: "Earl Grey Crème",
      description:
        "Classic bergamot-kissed black tea softened with a touch of French vanilla and cream.",
      price: "$16",
      url: "#",
    },
    {
      image: { src: "/images/BerryTruffle-ff.png", alt: "Rooibos & Ginger" },
      name: "Rooibos & Ginger",
      description:
        "Caffeine-free South African rooibos with warming ginger root. Earthy, spicy, and naturally smooth.",
      price: "$15",
      url: "#",
    },
    {
      image: { src: "/images/RaspberryRefresh-ff.png", alt: "Oolong Formosa" },
      name: "Oolong Formosa",
      description:
        "A partially oxidized Taiwanese oolong with honeyed stone-fruit notes and a lingering finish.",
      price: "$22",
      url: "#",
    },
    {
      image: { src: "/images/BerryTruffle-ff.png", alt: "Moroccan Mint" },
      name: "Moroccan Mint",
      description:
        "Bright spearmint layered over gunpowder green tea. Refreshing, clean, and traditionally served sweet.",
      price: "$14",
      url: "#",
    },
    {
      image: { src: "/images/RaspberryRefresh-ff.png", alt: "Lapsang Souchong" },
      name: "Lapsang Souchong",
      description:
        "Pine-smoked black tea from the Wuyi Mountains. Bold, campfire-rich, and utterly distinctive.",
      price: "$20",
      url: "#",
    },
    {
      image: { src: "/images/BerryTruffle-ff.png", alt: "Chamomile Bloom" },
      name: "Chamomile Bloom",
      description:
        "Whole Egyptian chamomile flowers steeped to a golden calm. Honeyed, gentle, and perfect before sleep.",
      price: "$13",
      url: "#",
    },
    {
      image: { src: "/images/RaspberryRefresh-ff.png", alt: "Silver Needle" },
      name: "Silver Needle",
      description:
        "Rare white tea from Fujian province. Downy buds yield a pale, silken liquor with melon undertones.",
      price: "$28",
      url: "#",
    },
  ],
};
