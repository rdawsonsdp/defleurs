"use client";

import React from "react";

const menuData = {
  starters: {
    title: "Pour Commencer",
    subtitle: "To Begin",
    items: [
      {
        name: "Cornbread Madeleine",
        description:
          "Stone-ground cornmeal batter, baked in a shell mold until golden. Served warm with cultured honey butter.",
        price: "7",
      },
      {
        name: "Pimento Cheese Gougères",
        description:
          "Light-as-air choux pastry folded with sharp cheddar, roasted pimento, and a whisper of cayenne.",
        price: "9",
      },
      {
        name: "Deviled Eggs à l'Ancienne",
        description:
          "Farm eggs filled with Dijon cream and smoked paprika, finished with pickled celery seed and chive oil.",
        price: "8",
      },
      {
        name: "She-Crab Bisque",
        description:
          "A velvety bisque of blue crab and roe, perfumed with dry sherry and tarragon. Served in a warm cup.",
        price: "14",
      },
    ],
  },
  mains: {
    title: "Les Plats",
    subtitle: "Main Courses",
    items: [
      {
        name: "Buttermilk Fried Chicken",
        description:
          "Heritage bird, brined overnight in buttermilk and black pepper. Double-dredged, fried in cast iron. Rested, never rushed.",
        price: "28",
      },
      {
        name: "Slow-Smoked Pork Shoulder",
        description:
          "Twelve hours over pecan wood. Pulled by hand and dressed with cane vinegar jus. The bark tells the story.",
        price: "26",
      },
      {
        name: "Pan-Roasted Gulf Redfish",
        description:
          "Wild-caught, skin crisped in brown butter. Laid over creamed Carolina Gold rice with a spoonful of sauce meunière.",
        price: "32",
      },
      {
        name: "Chicken & Waffles",
        description:
          "Crisp boneless thigh atop a yeasted Belgian waffle. Bourbon maple syrup and a pat of honey butter on the side.",
        price: "24",
      },
      {
        name: "Shrimp & Stone-Ground Grits",
        description:
          "Gulf shrimp sautéed with Tasso ham and Trinity. Spooned over slow-cooked Anson Mills grits with pot liquor.",
        price: "27",
      },
    ],
  },
  sides: {
    title: "Les Accompagnements",
    subtitle: "Sides",
    items: [
      {
        name: "Collard Greens",
        description: "Slow-braised with smoked ham hock and apple cider vinegar. Tender, rich, deeply Southern.",
        price: "8",
      },
      {
        name: "Baked Mac & Cheese",
        description: "Three cheeses, elbow pasta, baked until the crust turns golden and the center still pulls.",
        price: "9",
      },
      {
        name: "Skillet Cornbread",
        description: "Cast-iron baked. Crisp edges, soft center. Arrives with whipped sorghum butter.",
        price: "6",
      },
      {
        name: "Candied Sweet Potatoes",
        description: "Roasted low with brown sugar, warm spices, and a caramelized pecan crumble.",
        price: "8",
      },
    ],
  },
  desserts: {
    title: "Les Douceurs",
    subtitle: "Something Sweet",
    items: [
      {
        name: "Peach Cobbler",
        description:
          "Ripe Georgia peaches beneath a golden biscuit crust. Served warm with a quenelle of vanilla bean ice cream.",
        price: "12",
      },
      {
        name: "Bourbon Pecan Pie",
        description:
          "Dark and sticky, with toasted pecans and a generous pour of small-batch bourbon baked right in.",
        price: "11",
      },
      {
        name: "Banana Pudding",
        description:
          "Layers of vanilla custard, ripe banana, and butter wafers. Topped with soft meringue, torched to order.",
        price: "10",
      },
    ],
  },
};

function MenuSection({ section }) {
  return (
    <div className="mb-20 md:mb-28 lg:mb-32">
      <div className="mb-10 text-center md:mb-14">
        <h2 className="font-didot text-3xl font-normal italic tracking-wide md:text-4xl lg:text-5xl">
          {section.title}
        </h2>
        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-neutral-400">
          {section.subtitle}
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        {section.items.map((item, index) => (
          <div
            key={index}
            className="group border-b border-neutral-200 py-7 first:border-t md:py-9"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-didot text-lg font-medium tracking-wide md:text-xl">
                {item.name}
              </h3>
              <div className="shrink-0 font-didot text-lg tracking-wide md:text-xl">
                {item.price}
              </div>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500 md:mt-3 md:text-[15px]">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Menu() {
  return (
    <section className="px-[5%] pb-20 pt-24 md:pb-28 md:pt-32 lg:pb-36 lg:pt-40">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-20 text-center md:mb-28 lg:mb-36">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-neutral-400">
            The Parlour @ Maison des Fleurs &middot; Established 1992
          </p>
          <h1 className="font-didot text-5xl font-normal italic md:text-7xl lg:text-8xl">
            La Carte
          </h1>
          <div className="mx-auto mt-6 h-px w-16 bg-neutral-300" />
        </div>

        {/* Menu Sections */}
        <MenuSection section={menuData.starters} />
        <MenuSection section={menuData.mains} />
        <MenuSection section={menuData.sides} />
        <MenuSection section={menuData.desserts} />

        {/* Footer note */}
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-6 h-px w-16 bg-neutral-300" />
          <p className="font-didot text-sm italic leading-relaxed text-neutral-400 md:text-base">
            A gratuity of 20% will be added for parties of six or more.
            Please inform your server of any allergies.
          </p>
        </div>
      </div>
    </section>
  );
}
