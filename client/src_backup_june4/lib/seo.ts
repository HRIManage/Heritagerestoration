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
  title: "Heritage Restoration | Fire, Water & Storm Damage Restoration in Washington",
  description: "Professional fire, water, and storm damage restoration services in Washington. 24/7 emergency response, insurance advocacy, and complete reconstruction.",
  ogTitle: "Heritage Restoration | Damage Restoration Services",
  ogDescription: "Emergency restoration services for fire, water, and storm damage in Washington State.",
  ogType: "website",
  keywords: [
    "fire damage restoration",
    "water damage restoration",
    "storm damage recovery",
    "emergency restoration",
    "Washington restoration",
    "insurance claims",
    "property restoration"
  ]
};

export const generateStructuredData = (type: "LocalBusiness" | "Service", data: Record<string, any>) => {
  const baseData = {
    "@context": "https://schema.org",
    "@type": type,
    "name": "Heritage Restoration",
    "telephone": "+1-360-851-1407",
    "email": "office@firewaterstorm.com",
    "areaServed": "WA",
  };

  return JSON.stringify({ ...baseData, ...data });
};

export const BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Heritage Restoration",
  "description": "Professional fire, water, and storm damage restoration services",
  "telephone": "+1-360-851-1407",
  "email": "office@firewaterstorm.com",
  "url": "https://heritagerestoration.com",
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress": "7895 Martin Way E, Unit 103",
      "addressLocality": "Lacey",
      "addressRegion": "WA",
      "postalCode": "98516",
      "addressCountry": "US"
    },
    {
      "@type": "PostalAddress",
      "streetAddress": "3520 Auburn Way S, Suite 201",
      "addressLocality": "Auburn",
      "addressRegion": "WA",
      "postalCode": "98002",
      "addressCountry": "US"
    }
  ],
  "areaServed": "WA",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  },
  "sameAs": [
    "https://www.facebook.com/heritagerestorationinc/",
    "https://www.instagram.com/heritagerestorationwa/"
  ]
};
