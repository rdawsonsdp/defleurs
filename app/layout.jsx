import "./globals.css";
import { Navbar5 } from "@/components/Navbar5";
import { Footer3 } from "@/components/Footer3";
import { client } from "../sanity/lib/client";
import { siteSettingsQuery } from "../sanity/lib/queries";

export const metadata = {
  title: "The Parlour @ Maison des Fleurs",
  description:
    "Come hungry, leave satisfied. A James Beard Award-winning Southern restaurant.",
};

export const revalidate = 60;

const defaultSettings = {
  restaurantName: "The Parlour",
  fullName: "The Parlour @ Maison des Fleurs",
  address: "12 Sample St, Sydney NSW 2000",
  hours: "Open Tuesday through Sunday, 5pm - 11pm",
  copyright: "2024 The Parlour @ Maison des Fleurs. All rights reserved.",
  socialLinks: { instagram: "#" },
};

export default async function RootLayout({ children }) {
  let settings = defaultSettings;
  if (client) {
    try {
      const fetched = await client.fetch(siteSettingsQuery);
      if (fetched) settings = { ...defaultSettings, ...fetched };
    } catch (e) {
      // Sanity fetch failed — use defaults
    }
  }

  return (
    <html lang="en">
      <body>
        <Navbar5 settings={settings} />
        {children}
        <Footer3 settings={settings} />
      </body>
    </html>
  );
}
