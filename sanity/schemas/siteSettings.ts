import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "restaurantName",
      title: "Restaurant Name",
      type: "string",
      initialValue: "The Parlour",
    }),
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
      initialValue: "The Parlour @ Maison des Fleurs",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location Subtitle",
      type: "string",
      description: 'e.g. "Homewood, IL"',
    }),
    defineField({
      name: "hours",
      title: "Hours",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({ name: "instagram", title: "Instagram", type: "url" }),
        defineField({ name: "facebook", title: "Facebook", type: "url" }),
        defineField({ name: "twitter", title: "X / Twitter", type: "url" }),
      ],
    }),
    defineField({
      name: "shopifyStoreUrl",
      title: "Shopify Store URL",
      type: "url",
      description: "Main Shopify store link for tea purchases",
    }),
    defineField({
      name: "menuFooterNote",
      title: "Menu Footer Note",
      type: "text",
      rows: 2,
      description: "e.g. gratuity policy, allergy notice",
    }),
    defineField({
      name: "footerImage",
      title: "Footer Background Image",
      type: "image",
      options: { hotspot: true },
      description: "Background image for the site footer",
    }),
    defineField({
      name: "copyright",
      title: "Copyright Text",
      type: "string",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
