"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

type MenuItem = {
  name: string;
  description?: string;
  price: string;
  isAvailable?: boolean;
};

type Subcategory = {
  title: string;
  sortOrder?: number;
  items: MenuItem[];
};

export type MenuCategory = {
  title: string;
  subtitle?: string;
  subcategories: Subcategory[];
};

type TabbedMenuProps = {
  categories: MenuCategory[];
  headerTagline?: string;
  headerTitle?: string;
  footerNote?: string;
};

const NAVBAR_HEIGHT = 63;
const STICKY_NAV_HEIGHT = 48;
const SCROLL_OFFSET = NAVBAR_HEIGHT + STICKY_NAV_HEIGHT + 16;

export function TabbedMenu({
  categories,
  headerTagline = "The Parlour @ Maison des Fleurs \u00b7 Established 1992",
  headerTitle = "La Carte",
  footerNote,
}: TabbedMenuProps) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isProgrammaticScroll = useRef(false);

  // Scroll-spy: highlight active category as user scrolls
  useEffect(() => {
    const sections = sectionRefs.current.filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = sections.indexOf(entry.target as HTMLElement);
            if (index !== -1) {
              setActiveCategoryIndex(index);
            }
          }
        }
      },
      { rootMargin: "-112px 0px -60% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [categories]);

  // Auto-scroll nav to keep active button visible
  useEffect(() => {
    const button = buttonRefs.current[activeCategoryIndex];
    const nav = navRef.current;
    if (button && nav) {
      const navRect = nav.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      const scrollLeft =
        button.offsetLeft - navRect.width / 2 + buttonRect.width / 2;
      nav.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeCategoryIndex]);

  // Tap-to-scroll: smooth scroll to section
  const handleCategoryTap = useCallback((index: number) => {
    setActiveCategoryIndex(index);
    const section = sectionRefs.current[index];
    if (!section) return;

    isProgrammaticScroll.current = true;
    const top =
      section.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });

    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 800);
  }, []);

  return (
    <section className="bg-[#f5f0eb]">
      {/* Header */}
      <MenuHeader tagline={headerTagline} title={headerTitle} />

      {/* Sticky Category Nav */}
      <nav
        className="sticky top-[63px] z-40 bg-[#2a3d3a]"
        role="tablist"
        aria-label="Menu categories"
      >
        <div
          ref={navRef}
          className="scrollbar-hide flex overflow-x-auto md:justify-center"
        >
          {categories.map((category, index) => (
            <button
              key={category.title}
              ref={(el) => {
                buttonRefs.current[index] = el;
              }}
              onClick={() => handleCategoryTap(index)}
              className={`relative whitespace-nowrap px-4 py-3 text-xs uppercase tracking-[0.2em] transition-colors md:px-6 md:text-sm ${
                activeCategoryIndex === index
                  ? "text-white"
                  : "text-[#c5a87e]"
              }`}
              role="tab"
              aria-selected={activeCategoryIndex === index}
            >
              {category.title}
              {activeCategoryIndex === index && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c5a87e]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* All Menu Sections */}
      <div>
        {categories.map((category, catIndex) => (
          <section
            key={category.title}
            ref={(el) => {
              sectionRefs.current[catIndex] = el;
            }}
          >
            {/* Section Header */}
            <div className="pt-12 pb-8 text-center md:pt-16 md:pb-10">
              <h2 className="font-didot text-2xl italic text-[#2a3d3a] md:text-4xl lg:text-5xl">
                {category.title}
              </h2>
              {category.subtitle && (
                <p className="mt-2 text-[11px] uppercase tracking-[0.3em] text-[#8a9e98]">
                  {category.subtitle}
                </p>
              )}
              <div className="mx-auto mt-4 h-px w-12 bg-[#c5a87e]" />
            </div>

            {/* Items */}
            <div className="mx-auto max-w-2xl">
              {category.subcategories.map((sub, subIndex) => (
                <div key={sub.title}>
                  {/* Show subcategory heading only when there are multiple */}
                  {category.subcategories.length > 1 && (
                    <h3 className="mt-8 mb-4 px-5 font-didot text-lg italic text-[#2a3d3a]">
                      {sub.title}
                    </h3>
                  )}
                  {sub.items
                    .filter((item) => item.isAvailable !== false)
                    .map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="border-b border-[#e0cdb5]/40 px-5 py-6 md:py-8"
                      >
                        <div className="flex items-baseline gap-2">
                          <h3 className="shrink-0 font-didot text-[15px] font-semibold uppercase tracking-wide text-[#2a3d3a] md:text-base">
                            {item.name}
                          </h3>
                          {item.price && (
                            <>
                              <div className="flex-1 translate-y-[-3px] border-b border-dotted border-[#c5a87e]" />
                              <span className="shrink-0 font-didot text-[15px] text-[#2a3d3a] md:text-base">
                                ${item.price}
                              </span>
                            </>
                          )}
                        </div>
                        {item.description && (
                          <p className="mt-1.5 font-didot text-xs italic leading-relaxed text-[#8a7a6a] md:text-sm">
                            {item.description}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Footer Note */}
      {footerNote && (
        <div className="px-[5%] pt-12 pb-20 md:pb-28">
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto mb-6 h-px w-16 bg-neutral-300" />
            <p className="font-didot text-sm italic leading-relaxed text-neutral-400 md:text-base">
              {footerNote}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

function MenuHeader({
  tagline,
  title,
}: {
  tagline: string;
  title: string;
}) {
  return (
    <div className="pt-24 pb-8 text-center md:pt-32 lg:pt-40">
      <p className="mb-4 text-xs uppercase tracking-[0.4em] text-neutral-400">
        {tagline}
      </p>
      <h1 className="font-didot text-5xl font-normal italic md:text-7xl lg:text-8xl">
        {title}
      </h1>
      <div className="mx-auto mt-6 h-px w-16 bg-neutral-300" />
    </div>
  );
}
