import React from "react";
import { PortableText } from "@portabletext/react";

function extractPlainText(blocks) {
  if (!Array.isArray(blocks)) {
    return "";
  }

  return blocks
    .map(block => {
      if (Array.isArray(block?.children)) {
        return block.children.map(child => child?.text || "").join(" ");
      }

      return block?.text || "";
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(text, maxLength = 160) {
  if (!text || text.length <= maxLength) {
    return text || "";
  }

  return `${text.slice(0, maxLength - 1).trim()}…`;
}

export const portableTextComponents = {
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || "#";
      const isExternal = href.startsWith("http");

      return React.createElement(
        "a",
        {
          href,
          target: isExternal ? "_blank" : undefined,
          rel: isExternal ? "noopener noreferrer" : undefined,
        },
        children,
      );
    },
  },
};

export function renderPortableBody(bodyText, components = portableTextComponents) {
  if (!Array.isArray(bodyText) || bodyText.length === 0) {
    return null;
  }

  return React.createElement(PortableText, {
    value: bodyText,
    components,
  });
}

export function buildLandingPageSEO(pageData, canonicalPath = "") {
  const bodySummary = truncate(extractPlainText(pageData?.bodyText));
  const seo = pageData?.seo || {};
  const title = seo.title || pageData?.title || "Heritage Restoration";
  const description = seo.description || pageData?.excerpt || bodySummary;
  const ogImage = seo.ogImage?.asset?.url || pageData?.heroImage?.asset?.url || "";

  return {
    title,
    description,
    canonicalPath,
    keywords: Array.isArray(seo.keywords) ? seo.keywords.filter(Boolean) : [],
    noIndex: Boolean(seo.noIndex),
    ogImage,
    ogImageAlt:
      seo.ogImage?.alt || pageData?.heroImage?.alt || pageData?.title || "",
  };
}

export function mapLandingPageToProps(pageData) {
  if (!pageData) {
    return {
      title: "",
      slug: "",
      heroImage: null,
      bodyText: [],
      features: [],
      seo: buildLandingPageSEO(null),
    };
  }

  return {
    title: pageData.title || "",
    slug: pageData.slug?.current || "",
    heroImage: pageData.heroImage
      ? {
          src: pageData.heroImage.asset?.url || "",
          alt: pageData.heroImage.alt || pageData.title || "",
          lqip: pageData.heroImage.asset?.metadata?.lqip || "",
          dimensions: pageData.heroImage.asset?.metadata?.dimensions || null,
        }
      : null,
    bodyText: Array.isArray(pageData.bodyText) ? pageData.bodyText : [],
    bodyContent: renderPortableBody(pageData.bodyText),
    features: Array.isArray(pageData.features)
      ? pageData.features.map((feature, index) => ({
          id: feature._key || feature.title || `feature-${index}`,
          title: feature.title || "",
          descriptionBlocks: Array.isArray(feature.bodyText) ? feature.bodyText : [],
          descriptionContent: renderPortableBody(feature.bodyText),
          icon: feature.icon || null,
        }))
      : [],
    seo: buildLandingPageSEO(pageData),
  };
}

export function mapLocationLandingPageToProps(pageData) {
  if (!pageData) {
    return null;
  }

  return {
    slug: pageData.slug?.current || "",
    name: pageData.cityName || "",
    full: pageData.fullName || pageData.cityName || "",
    county: pageData.county || "",
    office: pageData.office || "North",
    distance: pageData.distance || "",
    zips: Array.isArray(pageData.zipCodes) ? pageData.zipCodes.filter(Boolean) : [],
    nearby: Array.isArray(pageData.nearbyCities)
      ? pageData.nearbyCities.filter(Boolean)
      : [],
    neighborhoods: Array.isArray(pageData.neighborhoods)
      ? pageData.neighborhoods.filter(Boolean)
      : [],
    landmark: pageData.landmark || "",
    blurb: pageData.blurb || "",
    lat: pageData.coordinates?.lat || 0,
    lng: pageData.coordinates?.lng || 0,
    faqItems: Array.isArray(pageData.faqItems)
      ? pageData.faqItems
          .filter(item => item?.question && item?.answer)
          .map(item => ({
            question: item.question,
            answer: item.answer,
          }))
      : [],
    seo: {
      title:
        pageData.seo?.title ||
        pageData.title ||
        `Fire, Water & Storm Damage Restoration in ${pageData.fullName || pageData.cityName || "Washington"} | Heritage Restoration`,
      description:
        pageData.seo?.description ||
        `24/7 emergency fire, water & storm damage restoration in ${pageData.fullName || pageData.cityName || "Washington"}. IICRC-certified, 60-minute response, direct insurance billing.`,
      keywords: Array.isArray(pageData.seo?.keywords)
        ? pageData.seo.keywords.filter(Boolean)
        : [],
      noIndex: Boolean(pageData.seo?.noIndex),
      heroImageAlt:
        pageData.seo?.heroImageAlt ||
        pageData.seo?.ogImage?.alt ||
        `Property damage restoration in ${pageData.fullName || pageData.cityName || "Washington"}`,
      ogImage: pageData.seo?.ogImage?.asset?.url || "",
    },
  };
}
