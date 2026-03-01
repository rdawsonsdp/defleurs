import { defineType, defineField } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fieldsets: [
    { name: "header", title: "Header Section" },
    { name: "about", title: "About Section" },
    { name: "mastery", title: "Mastery / Chef Section" },
    { name: "team", title: "Team Section" },
    { name: "stats", title: "Stats Section" },
    { name: "gallery", title: "Gallery Section" },
    { name: "faq", title: "FAQ Section" },
    { name: "cta", title: "Call to Action" },
  ],
  fields: [
    // Header
    defineField({
      name: "headerLabel",
      title: "Header Label",
      type: "string",
      fieldset: "header",
    }),
    defineField({
      name: "headerHeading",
      title: "Header Heading",
      type: "string",
      fieldset: "header",
    }),
    defineField({
      name: "headerImage",
      title: "Header Background Image",
      type: "image",
      options: { hotspot: true },
      fieldset: "header",
    }),

    // About
    defineField({
      name: "aboutLabel",
      title: "About Label",
      type: "string",
      fieldset: "about",
    }),
    defineField({
      name: "aboutHeading",
      title: "About Heading",
      type: "string",
      fieldset: "about",
    }),
    defineField({
      name: "aboutBody",
      title: "About Body",
      type: "text",
      rows: 6,
      fieldset: "about",
    }),
    defineField({
      name: "aboutImage",
      title: "About Image",
      type: "image",
      options: { hotspot: true },
      fieldset: "about",
    }),

    // Mastery
    defineField({
      name: "masteryLabel",
      title: "Mastery Label",
      type: "string",
      fieldset: "mastery",
    }),
    defineField({
      name: "masteryHeading",
      title: "Mastery Heading",
      type: "string",
      fieldset: "mastery",
    }),
    defineField({
      name: "masteryBody",
      title: "Mastery Body",
      type: "text",
      rows: 6,
      fieldset: "mastery",
    }),
    defineField({
      name: "masteryImage",
      title: "Mastery Image",
      type: "image",
      options: { hotspot: true },
      fieldset: "mastery",
    }),

    // Team
    defineField({
      name: "teamLabel",
      title: "Team Label",
      type: "string",
      fieldset: "team",
    }),
    defineField({
      name: "teamHeading",
      title: "Team Heading",
      type: "string",
      fieldset: "team",
    }),
    defineField({
      name: "hiringHeading",
      title: "Hiring CTA Heading",
      type: "string",
      fieldset: "team",
    }),
    defineField({
      name: "hiringBody",
      title: "Hiring CTA Body",
      type: "string",
      fieldset: "team",
    }),

    // Stats
    defineField({
      name: "statsLabel",
      title: "Stats Label",
      type: "string",
      fieldset: "stats",
    }),
    defineField({
      name: "statsHeading",
      title: "Stats Heading",
      type: "string",
      fieldset: "stats",
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      fieldset: "stats",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        },
      ],
    }),

    // Gallery
    defineField({
      name: "galleryLabel",
      title: "Gallery Label",
      type: "string",
      fieldset: "gallery",
    }),
    defineField({
      name: "galleryHeading",
      title: "Gallery Heading",
      type: "string",
      fieldset: "gallery",
    }),
    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      fieldset: "gallery",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
            defineField({
              name: "aspect",
              title: "Aspect Ratio",
              type: "string",
              options: {
                list: [
                  { title: "4:3", value: "4/3" },
                  { title: "Square", value: "1/1" },
                  { title: "3:4", value: "3/4" },
                ],
              },
            }),
          ],
        },
      ],
    }),

    // FAQ
    defineField({
      name: "faqHeading",
      title: "FAQ Heading",
      type: "string",
      fieldset: "faq",
    }),

    // CTA
    defineField({
      name: "ctaHeading",
      title: "CTA Heading",
      type: "string",
      fieldset: "cta",
    }),
    defineField({
      name: "ctaBody",
      title: "CTA Body",
      type: "string",
      fieldset: "cta",
    }),
    defineField({
      name: "ctaImage",
      title: "CTA Image",
      type: "image",
      options: { hotspot: true },
      fieldset: "cta",
    }),
  ],
  preview: {
    prepare() {
      return { title: "About Page" };
    },
  },
});
