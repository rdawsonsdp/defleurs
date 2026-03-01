"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@relume_io/relume-ui";
import React from "react";
import { RxPlus } from "react-icons/rx";

const defaultFaqs = [
  {
    question: "How do I make a reservation?",
    answer:
      "Call us or use the reservation system on this site. We hold tables for parties of all sizes and take walk-ins when we can. Give us a day or two notice when possible.",
  },
  {
    question: "Do you accommodate dietary restrictions?",
    answer:
      "We do. Let us know when you reserve, and the chef will work with you. We take allergies seriously and handle them with care.",
  },
  {
    question: "Can we host a private event?",
    answer:
      "Yes. We have space for groups and can arrange menus built around what matters to you. Contact us to discuss what you have in mind.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Cancel with twenty-four hours notice and there is no charge. Less notice and we hold a deposit. It is fair to us and to the other people waiting for tables.",
  },
  {
    question: "Do you take walk-in guests?",
    answer:
      "We do when we have space. Weekday evenings are usually easier than weekends. Call ahead if you want to know if we can seat you.",
  },
];

export function Faq5({
  heading = "Questions",
  subheading = "What you need to know before you come sit at our table",
  faqs = defaultFaqs,
} = {}) {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="rb-12 mb-12 max-w-lg md:mb-18 lg:mb-20">
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            {heading}
          </h2>
          <p className="md:text-md">{subheading}</p>
        </div>
        <Accordion
          type="multiple"
          className="grid items-start justify-stretch gap-4"
        >
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border border-border-primary px-5 md:px-6"
            >
              <AccordionTrigger
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
                className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-12 md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            Need more help?
          </h4>
          <p className="md:text-md">
            Reach out and we will answer what you need to know
          </p>
          <div className="mt-6 md:mt-8">
            <Button title="Contact" variant="secondary">
              Contact
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
