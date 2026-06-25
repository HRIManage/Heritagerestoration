/**
 * SEO utilities for structured data and meta tags
 */

export interface SEOConfig {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string[];
}

export const DEFAULT_SEO: SEOConfig = {
  title:
    "Heritage Restoration | Fire, Water & Storm Damage Restoration in Washington",
  description:
    "Professional fire, water, and storm damage restoration services in Washington. 24/7 emergency response, insurance advocacy, and complete reconstruction.",
  ogTitle: "Heritage Restoration | Damage Restoration Services",
  ogDescription:
    "Emergency restoration services for fire, water, and storm damage in Washington State.",
  ogType: "website",
  keywords: [
    "fire damage restoration",
    "water damage restoration",
    "storm damage recovery",
    "emergency restoration",
    "Washington restoration",
    "insurance claims",
    "property restoration",
  ],
};

export const generateStructuredData = (
  type: "LocalBusiness" | "Service",
  data: Record<string, any>
) => {
  const baseData = {
    "@context": "https://schema.org",
    "@type": type,
    name: "Heritage Restoration",
    telephone: "+1-360-345-1015",
    email: "office@firewaterstorm.com",
    areaServed: "WA",
  };

  return JSON.stringify({ ...baseData, ...data });
};

export const BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
  name: "Heritage Restoration",
  alternateName: "Heritage Restoration Inc.",
  description:
    "Professional 24/7 fire, water, and storm damage restoration services in Western Washington. IICRC certified, locally owned since 2004. Homeowner advocates handling insurance coordination and complete reconstruction.",
  telephone: "+1-360-345-1015",
  email: "office@firewaterstorm.com",
  url: "https://www.firewaterstorm.com",
  logo: "https://www.firewaterstorm.com/photo/heritage-logo.png",
  image: "https://www.firewaterstorm.com/photo/hero-new.jpg",
  foundingDate: "2004",
  priceRange: "$$",
  currenciesAccepted: "USD",
  paymentAccepted: "Insurance, Cash, Check, Credit Card",
  location: [
    {
      "@type": "Place",
      name: "Heritage Restoration - North Office",
      address: {
        "@type": "PostalAddress",
        streetAddress: "8695 Martin Way E, Unit 103",
        addressLocality: "Lacey",
        addressRegion: "WA",
        postalCode: "98516",
        addressCountry: "US",
      },
      telephone: "+1-360-345-1015",
    },
    {
      "@type": "Place",
      name: "Heritage Restoration - South Office",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1581 N. National Ave",
        addressLocality: "Chehalis",
        addressRegion: "WA",
        postalCode: "98532",
        addressCountry: "US",
      },
      telephone: "+1-360-345-1015",
    },
  ],
  areaServed: [
    { "@type": "State", name: "Washington" },
    { "@type": "City", name: "Lacey" },
    { "@type": "City", name: "Olympia" },
    { "@type": "City", name: "Tumwater" },
    { "@type": "City", name: "Tacoma" },
    { "@type": "City", name: "Chehalis" },
    { "@type": "City", name: "Centralia" },
    { "@type": "City", name: "Puyallup" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Restoration Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Fire Damage Restoration" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Water Damage Restoration" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Storm Damage Recovery" },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Contents Cleaning & Storage",
        },
      },
    ],
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "47",
  },
  sameAs: [
    "https://www.facebook.com/heritagerestorationinc/",
    "https://www.instagram.com/heritagerestorationwa/",
  ],
};
