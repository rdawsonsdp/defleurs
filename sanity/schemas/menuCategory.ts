import { defineType, defineField } from "sanity";

export default defineType({
  name: "menuCategory",
  title: "Menu Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title (French)",
      type: "string",
      description: 'French title, e.g. "Pour Commencer"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle (English)",
      type: "string",
      description: 'English subtitle, e.g. "To Begin"',
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "subcategories",
      title: "Subcategories",
      type: "array",
      of: [
        {
          type: "object",
          name: "menuSubcategory",
          title: "Subcategory",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "sortOrder",
              title: "Sort Order",
              type: "number",
              initialValue: 0,
            }),
            defineField({
              name: "items",
              title: "Items",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "menuItem",
                  title: "Menu Item",
                  fields: [
                    defineField({
                      name: "name",
                      title: "Name",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "description",
                      title: "Description",
                      type: "text",
                      rows: 2,
                    }),
                    defineField({
                      name: "price",
                      title: "Price",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "isAvailable",
                      title: "Available",
                      type: "boolean",
                      initialValue: true,
                    }),
                  ],
                  preview: {
                    select: { title: "name", subtitle: "price" },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: "title" },
          },
        },
      ],
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
    select: { title: "title", subtitle: "subtitle" },
  },
});
