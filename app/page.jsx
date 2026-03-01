import { Header98 } from "@/components/home/Header98";
import { Layout237 } from "@/components/home/Layout237";
import { Layout25 } from "@/components/home/Layout25";
import { Gallery18 } from "@/components/home/Gallery18";
import { Layout19 } from "@/components/home/Layout19";
import { Testimonial17 } from "@/components/home/Testimonial17";
import { Cta31 } from "@/components/home/Cta31";
import { client } from "../sanity/lib/client";
import { homePageQuery, testimonialsQuery } from "../sanity/lib/queries";

export const revalidate = 60;

export default async function HomePage() {
  let homeData = null;
  let testimonials = null;

  if (client) {
    try {
      [homeData, testimonials] = await Promise.all([
        client.fetch(homePageQuery),
        client.fetch(testimonialsQuery),
      ]);
    } catch (e) {
      // Sanity fetch failed — use component defaults
    }
  }

  return (
    <>
      <Header98
        {...(homeData?.heroHeading && {
          heading: homeData.heroHeading,
        })}
        {...(homeData?.heroSubtitle && {
          subtitle: homeData.heroSubtitle,
        })}
        {...(homeData?.heroBody && {
          body: homeData.heroBody,
        })}
      />
      <Layout237
        {...(homeData?.features && {
          features: homeData.features,
        })}
      />
      <Layout25
        {...(homeData?.chefLabel && { label: homeData.chefLabel })}
        {...(homeData?.chefHeading && { heading: homeData.chefHeading })}
        {...(homeData?.chefBody && { body: homeData.chefBody })}
      />
      <Gallery18
        {...(homeData?.foodHeading && { heading: homeData.foodHeading })}
        {...(homeData?.foodSubheading && {
          subheading: homeData.foodSubheading,
        })}
        {...(homeData?.foodItems && {
          menuItems: homeData.foodItems.map((item) => ({
            image: item.imageUrl || "/carousel/fried-sampler.jpg",
            alt: item.name,
            title: item.name,
            description: item.description,
          })),
        })}
      />
      <Layout19
        {...(homeData?.originsLabel && { label: homeData.originsLabel })}
        {...(homeData?.originsHeading && { heading: homeData.originsHeading })}
        {...(homeData?.originsBody && { body: homeData.originsBody })}
      />
      <Testimonial17
        {...(homeData?.testimonialsLabel && {
          label: homeData.testimonialsLabel,
        })}
        {...(testimonials?.length && { testimonials })}
      />
      <Cta31
        {...(homeData?.ctaHeading && { heading: homeData.ctaHeading })}
        {...(homeData?.ctaBody && { body: homeData.ctaBody })}
      />
    </>
  );
}
