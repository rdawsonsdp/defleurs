import { defineType, defineField } from "sanity";

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fieldsets: [
    { name: "hero", title: "Hero Section" },
    { name: "features", title: "Features Section" },
    { name: "chef", title: "Chef Section" },
    { name: "food", title: "Food Gallery Section" },
    { name: "origins", title: "Origins Section" },
    { name: "testimonials", title: "Testimonials Section" },
    { name: "cta", title: "Call to Action" },
  ],
  fields: [
    // Hero
    defineField({
      name: "heroHeading",
      title: "Hero Heading",
      type: "string",
      fieldset: "hero",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "string",
      fieldset: "hero",
    }),
    defineField({
      name: "heroBody",
      title: "Hero Body Text",
      type: "text",
      rows: 3,
      fieldset: "hero",
    }),
    defineField({
      name: "heroImages",
      title: "Hero Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      fieldset: "hero",
    }),

    // Features
    defineField({
      name: "features",
      title: "Feature Cards",
      type: "array",
      fieldset: "features",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
            }),
          ],
          preview: {
            select: { title: "title" },
          },
        },
      ],
    }),

    // Chef
    defineField({
      name: "chefLabel",
      title: "Chef Section Label",
      type: "string",
      fieldset: "chef",
    }),
    defineField({
      name: "chefHeading",
      title: "Chef Heading",
      type: "string",
      fieldset: "chef",
    }),
    defineField({
      name: "chefBody",
      title: "Chef Body Text",
      type: "text",
      rows: 4,
      fieldset: "chef",
    }),

    // Food Gallery
    defineField({
      name: "foodHeading",
      title: "Food Gallery Heading",
      type: "string",
      fieldset: "food",
    }),
    defineField({
      name: "foodSubheading",
      title: "Food Gallery Subheading",
      type: "string",
      fieldset: "food",
    }),
    defineField({
      name: "foodItems",
      title: "Food Gallery Items",
      type: "array",
      fieldset: "food",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Dish Name", type: "string" }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: "name", media: "image" },
          },
        },
      ],
    }),

    // Origins
    defineField({
      name: "originsLabel",
      title: "Origins Label",
      type: "string",
      fieldset: "origins",
    }),
    defineField({
      name: "originsHeading",
      title: "Origins Heading",
      type: "string",
      fieldset: "origins",
    }),
    defineField({
      name: "originsBody",
      title: "Origins Body Text",
      type: "text",
      rows: 4,
      fieldset: "origins",
    }),

    // Testimonials
    defineField({
      name: "testimonialsLabel",
      title: "Testimonials Label",
      type: "string",
      fieldset: "testimonials",
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
  ],
  preview: {
    prepare() {
      return { title: "Home Page" };
    },
  },
});
