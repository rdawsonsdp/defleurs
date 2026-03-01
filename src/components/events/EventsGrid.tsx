"use client";

import Image from "next/image";

interface Event {
  id: string;
  date: string;
  title: string;
  image: string;
  href?: string;
}

const placeholderEvents: Event[] = [
  {
    id: "1",
    date: "March 15, 2026",
    title: "Spring Tasting Menu Launch",
    image: "/images/IMG_8854.jpg",
  },
  {
    id: "2",
    date: "March 22, 2026",
    title: "An Evening with Chef Williams",
    image: "/images/IMG_8851.jpg",
  },
  {
    id: "3",
    date: "April 5, 2026",
    title: "Tea & Pastry Pairing Workshop",
    image: "/images/BerryTruffle-ff.png",
  },
  {
    id: "4",
    date: "April 12, 2026",
    title: "Live Jazz & Southern Supper",
    image: "/images/maisonstorefront1.jpg",
  },
  {
    id: "5",
    date: "April 20, 2026",
    title: "Sunday Brunch Pop-Up",
    image: "/images/RaspberryRefresh-ff.png",
  },
  {
    id: "6",
    date: "May 3, 2026",
    title: "Mother's Day Prix Fixe Dinner",
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

export function EventsGrid({ events = placeholderEvents }: { events?: Event[] }) {
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
          {events.map((event) => (
            <article key={event.id} className="group">
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Date */}
              <p className="mt-5 text-xs uppercase tracking-[0.2em] text-neutral-400">
                {formatEventDate(event.date)}
              </p>

              {/* Title */}
              <h2 className="mt-2 font-didot text-xl text-[#2a3d3a] md:text-2xl">
                {event.title}
              </h2>

              {/* Discover link */}
              <a
                href={event.href || "#"}
                className="mt-3 inline-block text-xs font-medium uppercase tracking-[0.2em] text-[#2a3d3a] underline underline-offset-4 transition-colors hover:text-[#1a2d2a]"
              >
                Discover
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
