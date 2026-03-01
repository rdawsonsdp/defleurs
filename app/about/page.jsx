import { Header65 } from "@/components/about/Header65";
import { Layout16 } from "@/components/about/Layout16";
import { Layout89 } from "@/components/about/Layout89";
import { Team6 } from "@/components/about/Team6";
import { Stats55 } from "@/components/about/Stats55";
import { Gallery18 } from "@/components/about/Gallery18";
import { Faq5 } from "@/components/about/Faq5";
import { Cta31 } from "@/components/about/Cta31";
import { client } from "../../sanity/lib/client";
import {
  aboutPageQuery,
  teamMembersQuery,
  faqItemsQuery,
} from "../../sanity/lib/queries";

export const revalidate = 60;

export default async function AboutPage() {
  let aboutData = null;
  let teamMembers = null;
  let faqs = null;

  if (client) {
    try {
      [aboutData, teamMembers, faqs] = await Promise.all([
        client.fetch(aboutPageQuery),
        client.fetch(teamMembersQuery),
        client.fetch(faqItemsQuery, { page: "about" }),
      ]);
    } catch (e) {
      // Sanity fetch failed — use component defaults
    }
  }

  return (
    <>
      <Header65
        {...(aboutData?.headerLabel && { label: aboutData.headerLabel })}
        {...(aboutData?.headerHeading && { heading: aboutData.headerHeading })}
        {...(aboutData?.headerImageUrl && {
          backgroundImage: aboutData.headerImageUrl,
        })}
      />
      <Layout16
        {...(aboutData?.aboutLabel && { label: aboutData.aboutLabel })}
        {...(aboutData?.aboutHeading && { heading: aboutData.aboutHeading })}
        {...(aboutData?.aboutBody && { body: aboutData.aboutBody })}
        {...(aboutData?.aboutImageUrl && { image: aboutData.aboutImageUrl })}
      />
      <Layout89
        {...(aboutData?.masteryLabel && { label: aboutData.masteryLabel })}
        {...(aboutData?.masteryHeading && {
          heading: aboutData.masteryHeading,
        })}
        {...(aboutData?.masteryBody && { body: aboutData.masteryBody })}
        {...(aboutData?.masteryImageUrl && {
          image: aboutData.masteryImageUrl,
        })}
      />
      <Team6
        {...(aboutData?.teamLabel && { label: aboutData.teamLabel })}
        {...(aboutData?.teamHeading && { heading: aboutData.teamHeading })}
        {...(teamMembers?.length && { teamMembers })}
        {...(aboutData?.hiringHeading && {
          hiringHeading: aboutData.hiringHeading,
        })}
        {...(aboutData?.hiringBody && { hiringBody: aboutData.hiringBody })}
      />
      <Stats55
        {...(aboutData?.statsLabel && { label: aboutData.statsLabel })}
        {...(aboutData?.statsHeading && { heading: aboutData.statsHeading })}
        {...(aboutData?.stats?.length && { stats: aboutData.stats })}
      />
      <Gallery18
        {...(aboutData?.galleryLabel && { label: aboutData.galleryLabel })}
        {...(aboutData?.galleryHeading && {
          heading: aboutData.galleryHeading,
        })}
        {...(aboutData?.galleryImages?.length && {
          images: aboutData.galleryImages.map((img) => ({
            src: img.url,
            alt: img.alt || "Gallery image",
            aspect: img.aspect === "1/1" ? "aspect-square" : `aspect-[${img.aspect || "4/3"}]`,
          })),
        })}
      />
      <Faq5
        {...(aboutData?.faqHeading && { heading: aboutData.faqHeading })}
        {...(faqs?.length && { faqs })}
      />
      <Cta31
        {...(aboutData?.ctaHeading && { heading: aboutData.ctaHeading })}
        {...(aboutData?.ctaBody && { body: aboutData.ctaBody })}
        {...(aboutData?.ctaImageUrl && { image: aboutData.ctaImageUrl })}
      />
    </>
  );
}
