import { defineType, defineField } from "sanity";

export default defineType({
  name: "teaProduct",
  title: "Tea Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
      description: 'e.g. "$12" or "$12.50"',
    }),
    defineField({
      name: "shopifyUrl",
      title: "Shopify Product URL",
      type: "url",
      description: "Paste the full Shopify product link",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Green", value: "green" },
          { title: "Black", value: "black" },
          { title: "White", value: "white" },
          { title: "Oolong", value: "oolong" },
          { title: "Herbal", value: "herbal" },
          { title: "Specialty", value: "specialty" },
        ],
      },
    }),
    defineField({
      name: "isFeatured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Sort Order",
      name: "sortOrder",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "category", media: "image" },
  },
});
