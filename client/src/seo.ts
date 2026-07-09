/**
 * Heritage Restoration: SEO & Structured Data Utilities
 * Covers: LocalBusiness, Service, FAQPage, BreadcrumbList, Article schemas
 */

export const BASE_URL = "https://www.firewaterstorm.com";

// ─── Business Schema (inject on every page) ─────────────────────────────────
export const BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
  "@id": `${BASE_URL}/#business`,
  name: "Heritage Restoration",
  alternateName: "Heritage Restoration Inc.",
  description:
    "Heritage Restoration provides 24/7 emergency fire, water, and storm damage restoration across Western Washington. IICRC certified technicians, 60-minute response guarantee, and direct insurance billing since 2004.",
  url: BASE_URL,
  telephone: "+1-360-345-1015",
  email: "office@firewaterstorm.com",
  foundingDate: "2004",
  priceRange: "$$",
  currenciesAccepted: "USD",
  paymentAccepted: "Cash, Check, Credit Card, Insurance",
  areaServed: [
    { "@type": "State", name: "Washington" },
    { "@type": "County", name: "Thurston County" },
    { "@type": "County", name: "Pierce County" },
    { "@type": "County", name: "Lewis County" },
    { "@type": "County", name: "Mason County" },
  ],
  address: [
    {
      "@type": "PostalAddress",
      "@id": `${BASE_URL}/#address-lacey`,
      streetAddress: "8695 Martin Way E, Unit 103",
      addressLocality: "Lacey",
      addressRegion: "WA",
      postalCode: "98516",
      addressCountry: "US",
    },
    {
      "@type": "PostalAddress",
      "@id": `${BASE_URL}/#address-chehalis`,
      streetAddress: "1581 N. National Ave",
      addressLocality: "Chehalis",
      addressRegion: "WA",
      postalCode: "98532",
      addressCountry: "US",
    },
  ],
  geo: {
    "@type": "GeoCoordinates",
    latitude: 47.034,
    longitude: -122.823,
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
        itemOffered: { "@type": "Service", name: "Mold Remediation" },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Contents Services & Pack-Out",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Emergency Board-Up (1-800-BOARDUP)",
        },
      },
    ],
  },
  sameAs: [
    "https://www.facebook.com/heritagerestorationinc/",
    "https://www.instagram.com/heritagerestorationwa/",
  ],
  knowsAbout: [
    "Fire Damage Restoration",
    "Water Damage Mitigation",
    "Storm Damage Recovery",
    "Mold Remediation",
    "Insurance Claims Assistance",
    "Structural Drying",
    "Smoke & Soot Removal",
    "Contents Pack-Out & Storage",
    "IICRC Certification",
  ],
};

// ─── Service Schema generator ────────────────────────────────────────────────
export const buildServiceSchema = (
  name: string,
  description: string,
  url: string,
  keywords: string[]
) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  url: `${BASE_URL}${url}`,
  provider: {
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#business`,
    name: "Heritage Restoration",
  },
  areaServed: { "@type": "State", name: "Washington" },
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: `${BASE_URL}${url}`,
    availableLanguage: "English",
  },
  keywords: keywords.join(", "),
});

// ─── FAQ Schema generator ────────────────────────────────────────────────────
export const buildFAQSchema = (
  items: { question: string; answer: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map(item => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

// ─── BreadcrumbList Schema generator ────────────────────────────────────────
export const buildBreadcrumbSchema = (
  crumbs: { name: string; url: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((crumb, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: crumb.name,
    item: `${BASE_URL}${crumb.url}`,
  })),
});

// ─── Article Schema generator ─────────────────────────────────────────────
export const buildArticleSchema = (
  headline: string,
  description: string,
  url: string
) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline,
  description,
  url: `${BASE_URL}${url}`,
  author: {
    "@type": "Organization",
    name: "Heritage Restoration",
    url: BASE_URL,
  },
  publisher: {
    "@type": "Organization",
    name: "Heritage Restoration",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/photo/heritage-logo.png`,
    },
  },
});

// ─── Per-page service schemas ────────────────────────────────────────────────
export const FIRE_SERVICE_SCHEMA = buildServiceSchema(
  "Fire Damage Restoration",
  "Complete fire damage cleanup and reconstruction by IICRC-certified specialists. Emergency board-ups, soot removal, smoke odor elimination, structural repairs, and full cosmetic rebuilds across Western Washington.",
  "/services/fire-restoration",
  [
    "fire damage restoration",
    "smoke damage cleanup",
    "soot removal",
    "fire restoration Washington",
  ]
);

export const WATER_SERVICE_SCHEMA = buildServiceSchema(
  "Water Damage Restoration & Structural Drying",
  "24/7 emergency water extraction, industrial dehumidification, thermal moisture mapping, and complete structural drying by IICRC-certified technicians in Washington State.",
  "/services/water-restoration",
  [
    "water damage restoration",
    "water extraction",
    "structural drying",
    "flood cleanup Washington",
  ]
);

export const STORM_SERVICE_SCHEMA = buildServiceSchema(
  "Storm Damage Recovery",
  "Emergency storm damage recovery including roof tarping, tree removal coordination, structural stabilization, and full reconstruction for homes and businesses in Western Washington.",
  "/services/storm-recovery",
  [
    "storm damage repair",
    "roof tarping",
    "wind damage restoration",
    "storm recovery Washington",
  ]
);

export const CONTENTS_SERVICE_SCHEMA = buildServiceSchema(
  "Contents Services & Pack-Out",
  "Professional content pack-out, cleaning, deodorization, and climate-controlled storage for your personal belongings during property restoration.",
  "/services/contents-services",
  [
    "contents pack-out",
    "personal property restoration",
    "content cleaning",
    "climate controlled storage",
  ]
);

// ─── Location (city) landing page schema ────────────────────────────────────
/**
 * Builds a JSON-LD @graph for a city service-area page: a LocalBusiness node
 * scoped to the city, the four core Services with areaServed = City, a
 * BreadcrumbList, and a FAQPage. Returned as a single object ready to JSON
 * stringify into one <script type="application/ld+json">.
 */
export const buildLocationSchema = (city: {
  name: string;
  full: string;
  county: string;
  slug: string;
  lat: number;
  lng: number;
}) => {
  const url = `${BASE_URL}/service-area/${city.slug}`;
  const cityNode = {
    "@type": "City",
    name: city.name,
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: "WA",
      addressCountry: "US",
    },
  };

  const services = [
    {
      name: `Fire Damage Restoration in ${city.name}, WA`,
      path: "/services/fire-restoration",
    },
    {
      name: `Water Damage Restoration in ${city.name}, WA`,
      path: "/services/water-restoration",
    },
    {
      name: `Storm Damage Recovery in ${city.name}, WA`,
      path: "/services/storm-recovery",
    },
    {
      name: `Contents Pack-Out & Cleaning in ${city.name}, WA`,
      path: "/services/contents-services",
    },
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
        "@id": `${url}#business`,
        name: `Heritage Restoration — ${city.full}`,
        description: `24/7 emergency fire, water, and storm damage restoration in ${city.full}. IICRC-certified technicians, 60-minute response, and direct insurance billing serving ${city.county} since 2004.`,
        url,
        telephone: "+1-360-345-1015",
        email: "office@firewaterstorm.com",
        parentOrganization: { "@id": `${BASE_URL}/#business` },
        priceRange: "$$",
        areaServed: cityNode,
        geo: {
          "@type": "GeoCoordinates",
          latitude: city.lat,
          longitude: city.lng,
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
      },
      ...services.map(s => ({
        "@type": "Service",
        name: s.name,
        url: `${BASE_URL}${s.path}`,
        serviceType: s.name,
        provider: { "@id": `${url}#business` },
        areaServed: cityNode,
      })),
      buildBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Service Areas", url: "/service-areas" },
        { name: city.full, url: `/service-area/${city.slug}` },
      ]),
      buildFAQSchema(getLocalFaqs(city)),
    ],
  };
};

// ─── Dynamic localized FAQ items (plain text only — no JSX) ───────────────────
export const getLocalFaqs = (city: { name: string; full: string; county: string }) => [
  {
    question: `How quickly can you respond to a property emergency in ${city.name} or surrounding ${city.county}?`,
    answer: `We guarantee a fast emergency response time of 60 minutes or less in ${city.name} and across ${city.county}. Our disaster restoration crews are on standby 24/7, 365 days a year, including nights, weekends, and holidays.`,
  },
  {
    question: `What should I do immediately after discovering water, fire, or storm damage at my ${city.name} property?`,
    answer: `First, ensure the safety of everyone in your ${city.name} home or business. Shut off main utilities if safe. Avoid electrical hazards and photograph all damage for insurance. Do not attempt DIY cleanup of soot or water, as it can worsen the damage. Call our emergency line immediately.`,
  },
  {
    question: `Do you provide emergency board-up services in ${city.name} on weekends and holidays?`,
    answer: `Yes, our local teams operate with zero days off, including all major holidays. Through our 1-800-BOARDUP division, we provide rapid structural security, commercial roof tarping, and window/door board-ups 24/7 in ${city.name} and the surrounding area.`,
  },
  {
    question: `How quickly can water damage lead to toxic mold growth in ${city.name}?`,
    answer: `Mold spores can activate and begin colonizing damp organic materials within 24 to 48 hours of initial water exposure. Professional structural drying must begin immediately in ${city.name} to prevent toxic indoor air quality issues.`,
  },
  {
    question: `Do you offer direct billing to my insurance company for ${city.name} restoration claims?`,
    answer: `Yes. We handle direct insurance billing for all qualifying restoration projects in ${city.name}. We prepare detailed Xactimate estimates, coordinate directly with your insurance adjuster, and bill your carrier so you only have to pay your deductible.`,
  },
  {
    question: `Are your property restoration technicians in the ${city.name} area licensed and certified?`,
    answer: `Yes. We are a fully licensed, bonded, and insured general contractor in Washington State. Every field technician serving ${city.name} is IICRC-certified in water damage mitigation, fire/smoke cleanup, or mold remediation.`,
  },
];

// ─── FAQ items for JSON-LD (plain text only — no JSX) ───────────────────────
export const FAQ_SCHEMA_ITEMS = [
  {
    question:
      "How quickly can you respond to a property emergency in Lewis, Pierce, or Thurston County?",
    answer:
      "We guarantee a fast emergency response time of 60 minutes or less across our entire service area. Our disaster restoration crews are on standby 24/7, 365 days a year, including nights, weekends, and holidays.",
  },
  {
    question:
      "What should I do immediately after discovering emergency water, fire, or storm damage?",
    answer:
      "Check structural safety and evacuate if needed. Avoid electrical hazards near standing water. Photograph all damage before cleanup. Shut off main utilities if safe. Do not attempt DIY cleanup as this can spread mold or soot. Call our emergency dispatch immediately.",
  },
  {
    question:
      "Do you provide emergency board-up services on weekends and holidays?",
    answer:
      "Yes, our property restoration teams operate with zero days off, including all major holidays. Through our 1-800-BOARDUP division, we provide rapid structural security, commercial roof tarping, and window/door board-ups 24/7.",
  },
  {
    question: "How quickly can water damage lead to toxic mold growth?",
    answer:
      "Mold spores activate and begin colonizing damp organic materials within 24 to 48 hours of initial water exposure. Professional structural drying must begin immediately to prevent toxic indoor air quality issues.",
  },
  {
    question:
      "Do you provide professional water extraction and structural drying?",
    answer:
      "Yes. We deploy industrial-grade truck-mounted water extractors, commercial LGR dehumidifiers, and high-velocity air movers. Our IICRC-certified technicians use infrared thermal imaging and moisture meters to track hidden water pockets.",
  },
  {
    question:
      "Can you completely eliminate smoke odors after a structural fire?",
    answer:
      "Yes. We use thermal fogging, industrial ozone treatments, and hydroxyl generators to permanently destroy smoke odors at the molecular level without masking agents or perfumes.",
  },
  {
    question:
      "Do you offer certified mold removal and black mold remediation services?",
    answer:
      "Yes. We are fully certified mold remediation experts. Our protocols include negative-pressure containment, industrial HEPA air scrubbers, EPA-registered antimicrobials, and fixing the underlying moisture source.",
  },
  {
    question: "Do you work directly with major homeowners insurance companies?",
    answer:
      "Yes. We have over two decades of experience coordinating with all major insurance carriers including State Farm, Allstate, Liberty Mutual, Farmers, and USAA. We use Xactimate, the exact estimating software preferred by insurance adjusters.",
  },
  {
    question: "Do you offer direct billing to my insurance company?",
    answer:
      "Yes. We handle direct insurance billing to remove the financial stress from your shoulders. You are typically only responsible for your standard policy deductible.",
  },
  {
    question:
      "Are your property restoration technicians licensed, bonded, and certified?",
    answer:
      "Yes. We are a fully licensed, bonded, and insured general contractor in Washington State. Every field technician is IICRC-certified in water damage restoration, fire/smoke cleanup, or microbial remediation.",
  },
  {
    question: "How long have you been serving local Washington communities?",
    answer:
      "We have been proudly serving local property owners, landlords, and commercial businesses since 2004 — over 22 years of local history restoring thousands of properties.",
  },
  {
    question:
      "How long does a typical property water damage restoration project take?",
    answer:
      "Emergency water extraction takes 1-2 days. Structural drying and dehumidification takes 3-5 days. Property reconstruction and cosmetic rebuild typically takes 1-3 weeks depending on the scope of damage.",
  },
  {
    question:
      "Do you offer a warranty on your structural restoration and repair work?",
    answer:
      "Yes. We back our craftsmanship, structural repairs, and reconstruction services with a comprehensive 5-year warranty.",
  },
  {
    question:
      "Do you serve communities and housing near Joint Base Lewis-McChord (JBLM)?",
    answer:
      "Yes, absolutely. We proudly support military families and veterans surrounding JBLM including Lakewood, Tacoma, DuPont, Parkland, and Spanaway. We work directly with USAA and other military insurance providers.",
  },
];
