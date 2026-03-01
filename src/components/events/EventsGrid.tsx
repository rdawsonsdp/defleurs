"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Event {
  id: string;
  date: string;
  title: string;
  description?: string;
  image: string;
  href?: string;
}

const placeholderEvents: Event[] = [
  {
    id: "1",
    date: "March 15, 2026",
    title: "Spring Tasting Menu Launch",
    description:
      "Celebrate the season with a five-course tasting menu featuring the freshest spring produce and floral-inspired cocktails.",
    image: "/images/IMG_8854.jpg",
  },
  {
    id: "2",
    date: "March 22, 2026",
    title: "An Evening with Chef Williams",
    description:
      "Join Chef Williams for an intimate dinner showcasing his signature Southern-French fusion dishes, paired with curated wines.",
    image: "/images/IMG_8851.jpg",
  },
  {
    id: "3",
    date: "April 5, 2026",
    title: "Tea & Pastry Pairing Workshop",
    description:
      "Learn the art of pairing fine teas with handcrafted pastries in this hands-on workshop led by our head pâtissier.",
    image: "/images/BerryTruffle-ff.png",
  },
  {
    id: "4",
    date: "April 12, 2026",
    title: "Live Jazz & Southern Supper",
    description:
      "An evening of live jazz, craft cocktails, and a three-course Southern supper in our candlelit dining room.",
    image: "/images/maisonstorefront1.jpg",
  },
  {
    id: "5",
    date: "April 20, 2026",
    title: "Sunday Brunch Pop-Up",
    description:
      "A one-day-only brunch featuring beignets, shrimp & grits, bottomless mimosas, and live acoustic music.",
    image: "/images/RaspberryRefresh-ff.png",
  },
  {
    id: "6",
    date: "May 3, 2026",
    title: "Mother\u2019s Day Prix Fixe Dinner",
    description:
      "Treat Mom to an elegant prix fixe dinner with complimentary champagne, a rose for every guest, and a special dessert.",
    image: "/images/IMG_8854.jpg",
  },
];

function formatEventDate(dateStr: string): string {
  const d = new Date(dateStr);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${d.getDate()} ${months[d.getMonth()]}, ${d.getFullYear()}`;
}

function EventCard({
  event,
  isFlipped,
  onClick,
}: {
  event: Event;
  isFlipped: boolean;
  onClick: () => void;
}) {
  return (
    <article
      className="cursor-pointer"
      style={{ perspective: "800px" }}
      onClick={onClick}
    >
      <motion.div
        className="relative"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div style={{ backfaceVisibility: "hidden" }}>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          <p className="mt-5 text-xs uppercase tracking-[0.2em] text-neutral-400">
            {formatEventDate(event.date)}
          </p>
          <h2 className="mt-2 font-didot text-xl text-[#2a3d3a] md:text-2xl">
            {event.title}
          </h2>
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-[#2a3d3a] underline underline-offset-4">
            Discover
          </p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-[#f5f0eb] px-6 lg:px-8"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-neutral-400">
            {formatEventDate(event.date)}
          </p>
          <h3 className="mb-4 text-center font-didot text-lg text-[#2a3d3a] md:text-xl">
            {event.title}
          </h3>
          <div className="mb-4 h-px w-10 bg-neutral-300" />
          <p className="text-center text-sm leading-relaxed text-neutral-500">
            {event.description}
          </p>
          {event.href && event.href !== "#" && (
            <a
              href={event.href}
              className="mt-6 inline-block text-xs font-medium uppercase tracking-[0.2em] text-[#2a3d3a] underline underline-offset-4 transition-colors hover:text-[#1a2d2a]"
              onClick={(e) => e.stopPropagation()}
            >
              Learn More
            </a>
          )}
        </div>
      </motion.div>
    </article>
  );
}

export function EventsGrid({ events = placeholderEvents }: { events?: Event[] }) {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setFlippedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="px-[5%] pb-20 pt-24 md:pb-28 md:pt-32 lg:pb-36 lg:pt-40">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center md:mb-20">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-neutral-400">
            What&apos;s Happening
          </p>
          <h1 className="font-didot text-5xl font-normal italic text-[#2a3d3a] md:text-7xl lg:text-8xl">
            Events
          </h1>
          <div className="mx-auto mt-6 h-px w-16 bg-neutral-300" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              isFlipped={flippedIndex === index}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
