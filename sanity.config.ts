import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  name: "maison-des-fleurs",
  title: "The Parlour @ Maison des Fleurs",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site Settings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            S.listItem()
              .title("Home Page")
              .child(
                S.document().schemaType("homePage").documentId("homePage")
              ),
            S.listItem()
              .title("About Page")
              .child(
                S.document().schemaType("aboutPage").documentId("aboutPage")
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) =>
                !["siteSettings", "homePage", "aboutPage"].includes(
                  listItem.getId()!
                )
            ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
