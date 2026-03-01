"use client";

import React, { useState } from "react";

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

export function TabbedMenu({
  categories,
  headerTagline = "The Parlour @ Maison des Fleurs \u00b7 Established 1992",
  headerTitle = "La Carte",
  footerNote,
}: TabbedMenuProps) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeSubcategoryIndex, setActiveSubcategoryIndex] = useState(0);

  const activeCategory = categories[activeCategoryIndex];
  const subcategories = activeCategory?.subcategories || [];
  const hasSubcategories = subcategories.length > 1;
  const activeSubcategory = subcategories[activeSubcategoryIndex] || subcategories[0];
  const items = activeSubcategory?.items || [];

  const handleCategoryChange = (index: number) => {
    setActiveCategoryIndex(index);
    setActiveSubcategoryIndex(0);
  };

  return (
    <section className="pb-20 pt-24 md:pb-28 md:pt-32 lg:pb-36 lg:pt-40">
      <div className="mx-auto max-w-7xl px-[5%]">
        {/* Header */}
        <div className="mb-16 text-center md:mb-20 lg:mb-24">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-neutral-400">
            {headerTagline}
          </p>
          <h1 className="font-didot text-5xl font-normal italic md:text-7xl lg:text-8xl">
            {headerTitle}
          </h1>
          <div className="mx-auto mt-6 h-px w-16 bg-neutral-300" />
        </div>
      </div>

      {/* Tab Navigation Area */}
      <div className="bg-[#2a3d3a]">
        <div className="mx-auto max-w-4xl px-[5%]">
          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-1 pt-6">
            {categories.map((category, index) => (
              <button
                key={category.title}
                onClick={() => handleCategoryChange(index)}
                className={`px-5 py-3 text-xs uppercase tracking-[0.2em] transition-colors md:px-8 md:text-sm ${
                  activeCategoryIndex === index
                    ? "bg-[#f5f0eb] text-[#2a3d3a]"
                    : "text-[#c5a87e] hover:text-[#e0cdb5]"
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>

          {/* Category Subtitle */}
          {activeCategory?.subtitle && (
            <p className="pt-2 text-center text-[11px] uppercase tracking-[0.3em] text-[#8a9e98]">
              {activeCategory.subtitle}
            </p>
          )}

          {/* Subcategory Tabs */}
          {hasSubcategories && (
            <div className="flex items-center justify-center gap-6 pb-4 pt-4">
              {subcategories.map((sub, index) => (
                <button
                  key={sub.title}
                  onClick={() => setActiveSubcategoryIndex(index)}
                  className={`text-xs uppercase tracking-[0.15em] transition-colors md:text-sm ${
                    activeSubcategoryIndex === index
                      ? "text-white"
                      : "text-[#c5a87e] hover:text-[#e0cdb5]"
                  }`}
                >
                  {sub.title}
                </button>
              ))}
            </div>
          )}

          {/* Spacer if no subcategories */}
          {!hasSubcategories && <div className="pb-4" />}
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-[#f5f0eb]">
        <div className="mx-auto max-w-2xl px-[5%] py-12 md:py-16">
          {items
            .filter((item) => item.isAvailable !== false)
            .map((item, index) => (
              <div key={index} className="mb-8 last:mb-0 md:mb-10">
                {/* Name + dotted leader + price */}
                <div className="flex items-baseline gap-2">
                  <h3 className="shrink-0 font-didot text-sm font-semibold uppercase tracking-wide text-[#2a3d3a] md:text-base">
                    {item.name}
                  </h3>
                  <div className="flex-1 translate-y-[-3px] border-b border-dotted border-[#c5a87e]" />
                  <span className="shrink-0 font-didot text-sm tracking-wide text-[#2a3d3a] md:text-base">
                    ${item.price}
                  </span>
                </div>
                {/* Description */}
                {item.description && (
                  <p className="mt-1.5 font-didot text-xs italic leading-relaxed text-[#8a7a6a] md:text-sm">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
        </div>
      </div>

      {/* Footer Note */}
      {footerNote && (
        <div className="px-[5%] pt-12">
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
