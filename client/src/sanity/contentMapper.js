import React from "react";
import { PortableText } from "@portabletext/react";

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

export function mapLandingPageToProps(pageData) {
  if (!pageData) {
    return {
      title: "",
      heroImage: null,
      bodyText: [],
      features: [],
    };
  }

  return {
    title: pageData.title || "",
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
  };
}
