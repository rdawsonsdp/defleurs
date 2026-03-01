import { defineType, defineField } from "sanity";

export default defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "page",
      title: "Page",
      type: "string",
      options: {
        list: [
          { title: "About", value: "about" },
          { title: "Menu", value: "menu" },
        ],
      },
      description: "Which page this FAQ appears on",
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
    select: { title: "question", subtitle: "page" },
  },
});
