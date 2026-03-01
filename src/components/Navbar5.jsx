"use client";

import { useMediaQuery } from "@relume_io/relume-ui";
import { motion } from "framer-motion";
import React, { useState } from "react";

export function Navbar5({ settings = {} }) {
  const logoText = settings.restaurantName || "The Parlour";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 991px)");
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const animateMobileMenu = isMobileMenuOpen ? "open" : "close";
  const animateMobileMenuButtonSpan = isMobileMenuOpen
    ? ["open", "rotatePhase"]
    : "closed";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white">
      <div className="flex items-center justify-between px-6 py-4 md:px-10 lg:px-12">
        {/* Logo */}
        <a href="/" className="font-didot text-2xl tracking-wide">
          {logoText}
        </a>

        {/* Desktop Nav - Center */}
        <div className="hidden items-center gap-x-8 lg:flex">
          <a
            href="/about"
            className="text-sm text-neutral-600 transition-colors hover:text-black"
          >
            About
          </a>
          <a
            href="/menu"
            className="text-sm text-neutral-600 transition-colors hover:text-black"
          >
            Menu
          </a>
          <a
            href="/tea"
            className="text-sm text-neutral-600 transition-colors hover:text-black"
          >
            Tea
          </a>
          <a
            href="#"
            className="text-sm text-neutral-600 transition-colors hover:text-black"
          >
            Contact
          </a>
        </div>

        {/* Desktop CTAs - Right */}
        <div className="hidden items-center gap-x-3 lg:flex">
          <a
            href="/reserve"
            className="border border-neutral-900 px-5 py-2 text-sm text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
          >
            Reserve
          </a>
          <a
            href="/menu"
            className="bg-neutral-900 px-5 py-2 text-sm text-white transition-colors hover:bg-black"
          >
            Shop
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="-mr-2 flex size-10 flex-col items-center justify-center lg:hidden"
          onClick={toggleMobileMenu}
        >
          <motion.span
            className="my-[3px] h-px w-5 bg-black"
            animate={animateMobileMenuButtonSpan}
            variants={{
              open: { translateY: 7, transition: { delay: 0.1 } },
              rotatePhase: { rotate: -45, transition: { delay: 0.2 } },
              closed: {
                translateY: 0,
                rotate: 0,
                transition: { duration: 0.2 },
              },
            }}
          />
          <motion.span
            className="my-[3px] h-px w-5 bg-black"
            animate={animateMobileMenu}
            variants={{
              open: { width: 0, transition: { duration: 0.1 } },
              closed: {
                width: "1.25rem",
                transition: { delay: 0.3, duration: 0.2 },
              },
            }}
          />
          <motion.span
            className="my-[3px] h-px w-5 bg-black"
            animate={animateMobileMenuButtonSpan}
            variants={{
              open: { translateY: -7, transition: { delay: 0.1 } },
              rotatePhase: { rotate: 45, transition: { delay: 0.2 } },
              closed: {
                translateY: 0,
                rotate: 0,
                transition: { duration: 0.2 },
              },
            }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        variants={{
          open: { height: "auto", opacity: 1 },
          close: { height: 0, opacity: 0 },
        }}
        initial="close"
        animate={animateMobileMenu}
        transition={{ duration: 0.3 }}
        className="overflow-hidden border-t border-neutral-100 bg-white lg:hidden"
      >
        <div className="flex flex-col items-center gap-y-6 px-[5%] py-10">
          <a href="/about" className="text-sm text-neutral-600">
            About
          </a>
          <a href="/menu" className="text-sm text-neutral-600">
            Menu
          </a>
          <a href="/tea" className="text-sm text-neutral-600">
            Tea
          </a>
          <a href="#" className="text-sm text-neutral-600">
            Contact
          </a>
          <div className="mt-2 flex gap-3">
            <a
              href="/reserve"
              className="border border-neutral-900 px-5 py-2 text-sm text-neutral-900"
            >
              Reserve
            </a>
            <a
              href="/menu"
              className="bg-neutral-900 px-5 py-2 text-sm text-white"
            >
              Shop
            </a>
          </div>
        </div>
      </motion.div>
    </nav>
  );
}
