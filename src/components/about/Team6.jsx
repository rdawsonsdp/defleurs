"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { BiLogoLinkedinSquare } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import { BiLogoInstagram } from "react-icons/bi";

const defaultTeamMembers = [
  {
    name: "James Beard winner",
    role: "Executive chef",
    bio: "Learned the craft in kitchens where nothing less than excellence was accepted",
    photoUrl: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
  },
  {
    name: "Marcus Williams",
    role: "Sous chef",
    bio: "Twenty years of service to the same kitchen, refining technique and honoring tradition",
    photoUrl: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
  },
  {
    name: "Sarah Mitchell",
    role: "Pastry chef",
    bio: "Biscuits and desserts that taste like home, made the way they should be",
    photoUrl: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
  },
  {
    name: "Robert Hayes",
    role: "Line cook",
    bio: "Steady hands and a sharp eye for the details that separate good from great",
    photoUrl: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
  },
  {
    name: "Elena Rodriguez",
    role: "Front of house",
    bio: "Knows every regular by name and what they like to drink before they ask",
    photoUrl: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
  },
  {
    name: "David Thompson",
    role: "Server",
    bio: "Attentive without hovering, present without intruding on the meal",
    photoUrl: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
  },
];

export function Team6({
  label = "Kitchen",
  heading = "The people behind it",
  subheading = "These are the hands that make it work every day",
  teamMembers = defaultTeamMembers,
  hiringHeading = "Join the team",
  hiringBody = "We are always looking for people who care about the work",
} = {}) {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">{label}</p>
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            {heading}
          </h2>
          <p className="md:text-md">{subheading}</p>
        </div>
        <div className="grid grid-cols-1 items-start justify-center gap-x-8 gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
          {teamMembers.map((member, i) => (
            <div key={i} className="flex flex-col text-center">
              <div className="rb-5 mb-5 flex w-full items-center justify-center md:mb-6">
                <img
                  src={member.photoUrl || "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"}
                  alt={member.name}
                  className="aspect-square size-full object-cover"
                />
              </div>
              <div className="mb-3 md:mb-4">
                <h5 className="text-md font-semibold md:text-lg">
                  {member.name}
                </h5>
                <h6 className="md:text-md">{member.role}</h6>
              </div>
              <p>{member.bio}</p>
              <div className="mt-6 grid grid-flow-col grid-cols-[max-content] gap-[0.875rem] self-center">
                {member.socialLinks?.linkedin && (
                  <a href={member.socialLinks.linkedin}>
                    <BiLogoLinkedinSquare className="size-6" />
                  </a>
                )}
                {member.socialLinks?.twitter && (
                  <a href={member.socialLinks.twitter}>
                    <FaXTwitter className="size-6 p-0.5" />
                  </a>
                )}
                {member.socialLinks?.instagram && (
                  <a href={member.socialLinks.instagram}>
                    <BiLogoInstagram className="size-6" />
                  </a>
                )}
                {!member.socialLinks && (
                  <>
                    <a href="#">
                      <BiLogoLinkedinSquare className="size-6" />
                    </a>
                    <a href="#">
                      <FaXTwitter className="size-6 p-0.5" />
                    </a>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-14 w-full max-w-md text-center md:mt-20 lg:mt-24">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            {hiringHeading}
          </h4>
          <p className="md:text-md">{hiringBody}</p>
          <div className="mt-6 flex items-center justify-center gap-x-4 text-center md:mt-8">
            <Button title="Careers" variant="secondary">
              Careers
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
