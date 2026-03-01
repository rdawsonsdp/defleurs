"use client";

import React from "react";
import { BiLogoInstagram, BiLogoFacebook } from "react-icons/bi";

export function Footer3({ settings = {} }) {
  const address = settings.address || "12 Sample St, Sydney NSW 2000";
  const location = settings.location || "Homewood, IL";
  const phone = settings.phone || "(708) 555-0192";
  const hours = settings.hours || "Open Tuesday through Sunday, 5pm \u2013 11pm";
  const instagramUrl = settings.socialLinks?.instagram || "#";
  const facebookUrl = settings.socialLinks?.facebook || "#";
  const footerImage = settings.footerImageUrl || "/images/maison-sign1.jpg";

  return (
    <footer>
      {/* Main footer with background image */}
      <div className="relative">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={footerImage}
            alt=""
            className="size-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 px-[5%] py-16 md:py-20 lg:py-24">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10 lg:gap-16">
              {/* Left Column — Address & Reservation */}
              <div>
                <h3 className="text-xs font-medium uppercase tracking-[0.3em] text-white">
                  Adresse
                </h3>
                <div className="mt-3 h-px w-10 bg-[#c5a87e]" />
                <div className="mt-6 space-y-1">
                  <p className="text-sm leading-relaxed text-white/80">
                    {address}
                  </p>
                  <p className="text-sm leading-relaxed text-white/80">
                    {location}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">
                    {phone}
                  </p>
                </div>

                <div className="mt-12">
                  <h3 className="text-xs font-medium uppercase tracking-[0.3em] text-white">
                    Horaires
                  </h3>
                  <div className="mt-3 h-px w-10 bg-[#c5a87e]" />
                  <p className="mt-6 text-sm leading-relaxed text-white/80">
                    {hours}
                  </p>
                </div>

                <div className="mt-12">
                  <h3 className="text-xs font-medium uppercase tracking-[0.3em] text-white">
                    R&eacute;servation
                  </h3>
                  <div className="mt-3 h-px w-10 bg-[#c5a87e]" />
                  <a
                    href="/reserve"
                    className="mt-6 inline-block bg-[#c5a87e] px-10 py-3 text-xs font-medium uppercase tracking-[0.25em] text-white transition-colors hover:bg-[#b0946b]"
                  >
                    R&eacute;server
                  </a>
                </div>
              </div>

              {/* Middle Column — Social & Links */}
              <div>
                <h3 className="text-xs font-medium uppercase tracking-[0.3em] text-white">
                  Nous Suivre
                </h3>
                <div className="mt-3 h-px w-10 bg-[#c5a87e]" />
                <div className="mt-6 flex items-center gap-5">
                  <a
                    href={facebookUrl}
                    className="text-white/70 transition-colors hover:text-white"
                  >
                    <BiLogoFacebook className="size-7" />
                  </a>
                  <a
                    href={instagramUrl}
                    className="text-white/70 transition-colors hover:text-white"
                  >
                    <BiLogoInstagram className="size-7" />
                  </a>
                </div>

                <div className="mt-10">
                  <a
                    href="/tea"
                    className="inline-block border border-[#c5a87e] bg-[#c5a87e] px-10 py-3 text-xs font-medium uppercase tracking-[0.25em] text-white transition-colors hover:bg-[#b0946b]"
                  >
                    Shop Tea
                  </a>
                </div>

                <div className="mt-12">
                  <h3 className="text-xs font-medium uppercase tracking-[0.3em] text-white">
                    Navigation
                  </h3>
                  <div className="mt-3 h-px w-10 bg-[#c5a87e]" />
                  <div className="mt-6 flex flex-col gap-3">
                    <a
                      href="/about"
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      About
                    </a>
                    <a
                      href="/menu"
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      Menu
                    </a>
                    <a
                      href="/tea"
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      Tea
                    </a>
                    <a
                      href="/reserve"
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      Reservations
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
