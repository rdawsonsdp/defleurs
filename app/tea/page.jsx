import { TeaFlipGrid } from "@/components/tea/TeaFlipGrid";
import { client } from "../../sanity/lib/client";
import { teaProductsQuery, siteSettingsQuery } from "../../sanity/lib/queries";

export const revalidate = 60;

export default async function TeaPage() {
  let products;
  let viewAllButton;

  if (client) {
    try {
      const [sanityProducts, settings] = await Promise.all([
        client.fetch(teaProductsQuery),
        client.fetch(siteSettingsQuery),
      ]);

      if (sanityProducts?.length) {
        products = sanityProducts.map((p) => ({
          image: { src: p.imageUrl || "/tea/tea-1.jpg", alt: p.name },
          name: p.name,
          description: p.description || "",
          price: p.price || "",
          url: p.shopifyUrl || "#",
        }));
      }

      if (settings?.shopifyStoreUrl) {
        viewAllButton = {
          title: "Visit Our Shop",
          variant: "secondary",
          onClick: () => window.open(settings.shopifyStoreUrl, "_blank"),
        };
      }
    } catch (e) {
      // Sanity fetch failed — use defaults
    }
  }

  return (
    <TeaFlipGrid
      {...(products && { products })}
      {...(viewAllButton && { viewAllButton })}
    />
  );
}
