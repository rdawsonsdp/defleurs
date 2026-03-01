import { groq } from "next-sanity";

// Site Settings (singleton)
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    restaurantName,
    fullName,
    address,
    location,
    hours,
    phone,
    email,
    socialLinks,
    shopifyStoreUrl,
    menuFooterNote,
    "footerImageUrl": footerImage.asset->url,
    copyright
  }
`;

// Home Page (singleton)
export const homePageQuery = groq`
  *[_type == "homePage"][0]{
    heroHeading,
    heroSubtitle,
    heroBody,
    heroImages,
    features,
    chefLabel,
    chefHeading,
    chefBody,
    foodHeading,
    foodSubheading,
    foodItems[]{
      name,
      description,
      "imageUrl": image.asset->url
    },
    originsLabel,
    originsHeading,
    originsBody,
    testimonialsLabel,
    ctaHeading,
    ctaBody
  }
`;

// About Page (singleton)
export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0]{
    headerLabel,
    headerHeading,
    "headerImageUrl": headerImage.asset->url,
    aboutLabel,
    aboutHeading,
    aboutBody,
    "aboutImageUrl": aboutImage.asset->url,
    masteryLabel,
    masteryHeading,
    masteryBody,
    "masteryImageUrl": masteryImage.asset->url,
    teamLabel,
    teamHeading,
    hiringHeading,
    hiringBody,
    statsLabel,
    statsHeading,
    stats,
    galleryLabel,
    galleryHeading,
    galleryImages[]{
      "url": asset->url,
      alt,
      aspect
    },
    faqHeading,
    ctaHeading,
    ctaBody,
    "ctaImageUrl": ctaImage.asset->url
  }
`;

// Tea Products
export const teaProductsQuery = groq`
  *[_type == "teaProduct"] | order(sortOrder asc){
    name,
    "slug": slug.current,
    "imageUrl": image.asset->url,
    description,
    price,
    shopifyUrl,
    category,
    isFeatured
  }
`;

// Menu Categories with subcategories and items
export const menuCategoriesQuery = groq`
  *[_type == "menuCategory"] | order(sortOrder asc){
    title,
    subtitle,
    "slug": slug.current,
    subcategories[]{
      title,
      sortOrder,
      items[]{
        name,
        description,
        price,
        isAvailable
      }
    }
  }
`;

// Team Members
export const teamMembersQuery = groq`
  *[_type == "teamMember"] | order(sortOrder asc){
    name,
    role,
    bio,
    "photoUrl": photo.asset->url,
    socialLinks
  }
`;

// Testimonials
export const testimonialsQuery = groq`
  *[_type == "testimonial" && isActive == true]{
    quote,
    name,
    title,
    "avatarUrl": avatar.asset->url,
    rating
  }
`;

// FAQ Items by page
export const faqItemsQuery = groq`
  *[_type == "faqItem" && page == $page] | order(sortOrder asc){
    question,
    answer
  }
`;
