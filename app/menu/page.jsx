import { TabbedMenu } from "@/components/menu/TabbedMenu";
import { client } from "../../sanity/lib/client";
import { menuCategoriesQuery, siteSettingsQuery } from "../../sanity/lib/queries";

export const revalidate = 60;

const defaultCategories = [
  {
    title: "Croissants & Scones",
    subtitle: "Warm from the Oven",
    subcategories: [
      {
        title: "Pastries",
        items: [
          { name: "Warm Croissants & Scones", description: "With homemade clotted cream, soft butter and mixed jams.", price: "" },
        ],
      },
    ],
  },
  {
    title: "Light Fare",
    subtitle: "Pick Two",
    subcategories: [
      {
        title: "Sandwiches",
        items: [
          { name: "Tuna, Cucumber & Dill Pickle Tea Squares", description: "Tuna, mayo, green onion, lemon juice, salt & pepper topped with fresh cucumbers and fresh minced dill on white bread.", price: "" },
          { name: "Warm Classic American Grill Cheese", description: "Sliced American cheese grilled on thick-sliced white bread.", price: "" },
          { name: "Savory Ham & Cheese Rounds", description: "Honey ham, provolone cheese, honey dijon mustard on white whole grain.", price: "" },
          { name: "Nutella Raspberry Fluff", description: "Chocolate hazelnut Nutella, raspberry preserves, marshmallow fluff, white bread garnished with fresh raspberries.", price: "" },
          { name: "Smoked Chicken on Focaccia", description: "Smoked pulled chicken, fresh mozzarella, vine-ripened tomatoes, red onions, fresh basil and chipotle sauce on peppered focaccia bread.", price: "" },
          { name: "Smoked Turkey Gouda", description: "Smoked turkey, sliced bacon, smoked gouda, spicy mustard, tomato on tomato basil bread.", price: "" },
        ],
      },
    ],
  },
  {
    title: "A La Carte",
    subtitle: "Soups & Salads",
    subcategories: [
      {
        title: "A La Carte",
        items: [
          { name: "Vegetable Minestrone Soup", description: "", price: "" },
          { name: "Broccoli Cheddar Soup", description: "", price: "" },
          { name: "Pizza Bites", description: "", price: "" },
          { name: "Roman Caesar Salad", description: "With caesar dressing, fresh parmesan and croutons.", price: "" },
        ],
      },
    ],
  },
  {
    title: "Petit Fours",
    subtitle: "Pick Four",
    subcategories: [
      {
        title: "Sweets",
        items: [
          { name: "Macarons", description: "", price: "" },
          { name: "Lemon Squares", description: "", price: "" },
          { name: "Mini Berry Trifles", description: "", price: "" },
          { name: "Chocolate Dipped Madeleines", description: "", price: "" },
          { name: "Plain Madeleines", description: "", price: "" },
          { name: "Banana Nut Slice", description: "", price: "" },
          { name: "Blueberry Muffins", description: "", price: "" },
          { name: "Cookies", description: "", price: "" },
          { name: "Donuts", description: "", price: "" },
          { name: "Fresh Seasonal Fruit", description: "", price: "" },
          { name: "Fruit Tart", description: "", price: "" },
          { name: "Banana Vanilla Bean Bomb", description: "", price: "" },
          { name: "Fresh Dipped Fruit", description: "", price: "" },
          { name: "Raspberry Truffle Double Chocolate Cake", description: "", price: "" },
          { name: "Chocolate Covered Pretzels", description: "", price: "" },
          { name: "Strawberry Cheesecake", description: "", price: "" },
          { name: "Red Velvet Cheesecake", description: "", price: "" },
        ],
      },
    ],
  },
];

const defaultFooterNote =
  "Vegetarian & gluten free menu available upon request. Add-ons incur additional fees.";

export default async function MenuPage() {
  let categories = defaultCategories;
  let footerNote = defaultFooterNote;

  if (client) {
    try {
      const [sanityCategories, settings] = await Promise.all([
        client.fetch(menuCategoriesQuery),
        client.fetch(siteSettingsQuery),
      ]);

      if (sanityCategories?.length) {
        categories = sanityCategories;
      }

      if (settings?.menuFooterNote) {
        footerNote = settings.menuFooterNote;
      }
    } catch (e) {
      // Sanity fetch failed — use defaults
    }
  }

  return <TabbedMenu categories={categories} footerNote={footerNote} />;
}
