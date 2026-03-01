import { TeaFlipGrid } from "@/components/tea/TeaFlipGrid";
import { client } from "../../sanity/lib/client";
import { teaProductsQuery, siteSettingsQuery } from "../../sanity/lib/queries";

export const revalidate = 60;

const defaultProducts = [
  { name: "Jasmine Pearl", image: "/tea/tea-1.jpg", description: "Hand-rolled green tea buds scented with fresh jasmine blossoms. Delicate, floral, and naturally sweet." },
  { name: "Earl Grey Crème", image: "/tea/tea-2.jpg", description: "Classic bergamot-kissed black tea softened with a touch of French vanilla and cream." },
  { name: "Rooibos & Ginger", image: "/tea/tea-3.jpg", description: "Caffeine-free South African rooibos with warming ginger root. Earthy, spicy, and naturally smooth." },
  { name: "Oolong Formosa", image: "/tea/tea-4.jpg", description: "A partially oxidized Taiwanese oolong with honeyed stone-fruit notes and a lingering finish." },
  { name: "Moroccan Mint", image: "/tea/tea-5.jpg", description: "Bright spearmint layered over gunpowder green tea. Refreshing, clean, and traditionally served sweet." },
  { name: "Lapsang Souchong", image: "/tea/tea-6.jpg", description: "Pine-smoked black tea from the Wuyi Mountains. Bold, campfire-rich, and utterly distinctive." },
  { name: "Chamomile Bloom", image: "/tea/tea-7.jpg", description: "Whole Egyptian chamomile flowers steeped to a golden calm. Honeyed, gentle, and perfect before sleep." },
  { name: "Silver Needle", image: "/tea/tea-8.jpg", description: "Rare white tea from Fujian province. Downy buds yield a pale, silken liquor with melon undertones." },
  { name: "Chai Masala", image: "/tea/tea-9.jpg", description: "Assam black tea simmered with cardamom, cinnamon, clove, and fresh ginger. Rich and warming." },
  { name: "Genmaicha", image: "/tea/tea-10.jpg", description: "Japanese green tea blended with toasted brown rice. Nutty, savory, and unexpectedly comforting." },
  { name: "Darjeeling First Flush", image: "/tea/tea-11.jpg", description: "Spring-picked from the Himalayan foothills. Light, muscatel, with a bright floral finish." },
  { name: "Rose Petal Black", image: "/tea/tea-12.jpg", description: "Yunnan black tea layered with dried rose petals. Smooth, fragrant, and gently romantic." },
  { name: "Peppermint Leaf", image: "/tea/tea-13.jpg", description: "Pure whole peppermint leaves, nothing more. Bright, cooling, and naturally caffeine-free." },
  { name: "Matcha Ceremonial", image: "/tea/tea-14.jpg", description: "Stone-ground shade-grown tencha from Uji. Vivid green, creamy umami, whisked to a froth." },
  { name: "Hibiscus Berry", image: "/tea/tea-15.jpg", description: "Tart hibiscus blossoms with elderberry and rosehip. A ruby-red infusion, bright and refreshing." },
  { name: "Dragon Well", image: "/tea/tea-16.jpg", description: "Pan-fired Chinese green tea with a flat, sword-shaped leaf. Chestnut sweetness and a clean finish." },
  { name: "Lavender White", image: "/tea/tea-17.jpg", description: "Delicate white tea with Provençal lavender buds. Airy, floral, and impossibly light." },
  { name: "Pu-erh Aged", image: "/tea/tea-18.jpg", description: "Fermented and cave-aged Yunnan tea. Deep, earthy, with notes of damp forest floor and dark chocolate." },
];

export default async function TeaPage() {
  let products = defaultProducts;
  let shopifyStoreUrl;

  if (client) {
    try {
      const [sanityProducts, settings] = await Promise.all([
        client.fetch(teaProductsQuery),
        client.fetch(siteSettingsQuery),
      ]);

      if (sanityProducts?.length) {
        products = sanityProducts.map((p) => ({
          name: p.name,
          image: p.imageUrl || `/tea/tea-1.jpg`,
          description: p.description || "",
          price: p.price,
          shopifyUrl: p.shopifyUrl,
        }));
      }

      shopifyStoreUrl = settings?.shopifyStoreUrl;
    } catch (e) {
      // Sanity fetch failed — use defaults
    }
  }

  return (
    <TeaFlipGrid
      products={products}
      shopifyStoreUrl={shopifyStoreUrl}
    />
  );
}
