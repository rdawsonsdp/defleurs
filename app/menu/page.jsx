import { TabbedMenu } from "@/components/menu/TabbedMenu";
import { client } from "../../sanity/lib/client";
import { menuCategoriesQuery, siteSettingsQuery } from "../../sanity/lib/queries";

export const revalidate = 60;

const defaultCategories = [
  {
    title: "Pour Commencer",
    subtitle: "To Begin",
    subcategories: [
      {
        title: "Starters",
        items: [
          { name: "Cornbread Madeleine", description: "Stone-ground cornmeal batter, baked in a shell mold until golden. Served warm with cultured honey butter.", price: "7" },
          { name: "Pimento Cheese Gougères", description: "Light-as-air choux pastry folded with sharp cheddar, roasted pimento, and a whisper of cayenne.", price: "9" },
          { name: "Deviled Eggs à l'Ancienne", description: "Farm eggs filled with Dijon cream and smoked paprika, finished with pickled celery seed and chive oil.", price: "8" },
          { name: "She-Crab Bisque", description: "A velvety bisque of blue crab and roe, perfumed with dry sherry and tarragon. Served in a warm cup.", price: "14" },
        ],
      },
    ],
  },
  {
    title: "Les Plats",
    subtitle: "Main Courses",
    subcategories: [
      {
        title: "Mains",
        items: [
          { name: "Buttermilk Fried Chicken", description: "Heritage bird, brined overnight in buttermilk and black pepper. Double-dredged, fried in cast iron. Rested, never rushed.", price: "28" },
          { name: "Slow-Smoked Pork Shoulder", description: "Twelve hours over pecan wood. Pulled by hand and dressed with cane vinegar jus. The bark tells the story.", price: "26" },
          { name: "Pan-Roasted Gulf Redfish", description: "Wild-caught, skin crisped in brown butter. Laid over creamed Carolina Gold rice with a spoonful of sauce meunière.", price: "32" },
          { name: "Chicken & Waffles", description: "Crisp boneless thigh atop a yeasted Belgian waffle. Bourbon maple syrup and a pat of honey butter on the side.", price: "24" },
          { name: "Shrimp & Stone-Ground Grits", description: "Gulf shrimp sautéed with Tasso ham and Trinity. Spooned over slow-cooked Anson Mills grits with pot liquor.", price: "27" },
        ],
      },
    ],
  },
  {
    title: "Les Accompagnements",
    subtitle: "Sides",
    subcategories: [
      {
        title: "Sides",
        items: [
          { name: "Collard Greens", description: "Slow-braised with smoked ham hock and apple cider vinegar. Tender, rich, deeply Southern.", price: "8" },
          { name: "Baked Mac & Cheese", description: "Three cheeses, elbow pasta, baked until the crust turns golden and the center still pulls.", price: "9" },
          { name: "Skillet Cornbread", description: "Cast-iron baked. Crisp edges, soft center. Arrives with whipped sorghum butter.", price: "6" },
          { name: "Candied Sweet Potatoes", description: "Roasted low with brown sugar, warm spices, and a caramelized pecan crumble.", price: "8" },
        ],
      },
    ],
  },
  {
    title: "Les Douceurs",
    subtitle: "Something Sweet",
    subcategories: [
      {
        title: "Desserts",
        items: [
          { name: "Peach Cobbler", description: "Ripe Georgia peaches beneath a golden biscuit crust. Served warm with a quenelle of vanilla bean ice cream.", price: "12" },
          { name: "Bourbon Pecan Pie", description: "Dark and sticky, with toasted pecans and a generous pour of small-batch bourbon baked right in.", price: "11" },
          { name: "Banana Pudding", description: "Layers of vanilla custard, ripe banana, and butter wafers. Topped with soft meringue, torched to order.", price: "10" },
        ],
      },
    ],
  },
];

const defaultFooterNote =
  "A gratuity of 20% will be added for parties of six or more. Please inform your server of any allergies.";

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
