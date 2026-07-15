import { Helmet } from "react-helmet-async";
import { BASE_URL } from "@/seo";

type SchemaValue = Record<string, unknown>;

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  keywords?: string[];
  noIndex?: boolean;
  schemas?: SchemaValue[];
  geo?: {
    region?: string;
    placename?: string;
    position?: string;
    icbm?: string;
  };
}

const DEFAULT_OG_IMAGE = `${BASE_URL}/photo/hero-new.jpg`;

function toAbsoluteUrl(value?: string) {
  if (!value) return undefined;
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("/")) return `${BASE_URL}${value}`;
  return `${BASE_URL}/${value}`;
}

function buildWebPageSchema({
  title,
  description,
  canonical,
  image,
  keywords,
}: {
  title: string;
  description: string;
  canonical: string;
  image: string;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: title,
    description,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Heritage Restoration",
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: image,
    },
    keywords: keywords?.length ? keywords.join(", ") : undefined,
  };
}

export default function SEOHead({
  title,
  description,
  canonical,
  path,
  image,
  imageAlt,
  type = "website",
  keywords,
  noIndex = false,
  schemas = [],
  geo,
}: SEOHeadProps) {
  const canonicalUrl = canonical ?? toAbsoluteUrl(path) ?? BASE_URL;
  const imageUrl = toAbsoluteUrl(image) ?? DEFAULT_OG_IMAGE;
  const robots = noIndex
    ? "noindex, follow"
    : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";
  const allSchemas = [
    buildWebPageSchema({
      title,
      description,
      canonical: canonicalUrl,
      image: imageUrl,
      keywords,
    }),
    ...schemas,
  ];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords?.length ? (
        <meta name="keywords" content={keywords.join(", ")} />
      ) : null}
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={robots} />
      <meta name="author" content="Heritage Restoration" />
      <link rel="alternate" type="text/plain" href={`${BASE_URL}/llms.txt`} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Heritage Restoration" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      {imageAlt ? <meta property="og:image:alt" content={imageAlt} /> : null}
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {imageAlt ? <meta name="twitter:image:alt" content={imageAlt} /> : null}

      {geo?.region ? <meta name="geo.region" content={geo.region} /> : null}
      {geo?.placename ? (
        <meta name="geo.placename" content={geo.placename} />
      ) : null}
      {geo?.position ? (
        <meta name="geo.position" content={geo.position} />
      ) : null}
      {geo?.icbm ? <meta name="ICBM" content={geo.icbm} /> : null}

      {allSchemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
