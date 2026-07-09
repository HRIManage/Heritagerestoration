import fs from "node:fs";
import path from "node:path";
import { LOCATIONS, type CityLocation } from "../client/src/data/locations.ts";
import { FAQ_SCHEMA_ITEMS } from "../client/src/seo.ts";

type SanityLocationDocument = {
  _id: string;
  _type: "locationLandingPage";
  title: string;
  slug: { _type: "slug"; current: string };
  cityName: string;
  fullName: string;
  county: string;
  office: CityLocation["office"];
  distance: string;
  zipCodes: string[];
  nearbyCities: string[];
  neighborhoods: string[];
  landmark: string;
  blurb: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    noIndex: boolean;
    heroImageAlt: string;
  };
  faqItems: Array<{
    _key: string;
    question: string;
    answer: string;
  }>;
};

const projectRoot = path.resolve(import.meta.dirname, "..");
const outputDir = path.join(projectRoot, "sanity-import");
const outputFile = path.join(outputDir, "location-landing-pages.ndjson");

function slugKey(prefix: string, slug: string, index: number) {
  return `${prefix}-${slug}-${String(index + 1).padStart(2, "0")}`;
}

function toSanityDocument(location: CityLocation): SanityLocationDocument {
  return {
    _id: `locationLandingPage.${location.slug}`,
    _type: "locationLandingPage",
    title: `Fire, Water & Storm Damage Restoration in ${location.full} | Heritage Restoration`,
    slug: {
      _type: "slug",
      current: location.slug,
    },
    cityName: location.name,
    fullName: location.full,
    county: location.county,
    office: location.office,
    distance: location.distance,
    zipCodes: [...location.zips],
    nearbyCities: [...location.nearby],
    neighborhoods: [...location.neighborhoods],
    landmark: location.landmark,
    blurb: location.blurb,
    coordinates: {
      lat: location.lat,
      lng: location.lng,
    },
    seo: {
      title: `Fire, Water & Storm Damage Restoration in ${location.full} | Heritage Restoration`,
      description: `24/7 emergency fire, water & storm damage restoration in ${location.full}. IICRC-certified, 60-minute response, direct insurance billing. Serving ${location.county} since 2004. Call (360) 345-1015.`,
      keywords: [
        `fire damage restoration ${location.name} WA`,
        `water damage restoration ${location.name}`,
        `storm damage repair ${location.name}`,
        `mold remediation ${location.name}`,
        `${location.county} restoration company`,
      ],
      noIndex: false,
      heroImageAlt: `Property damage restoration in ${location.full}`,
    },
    faqItems: FAQ_SCHEMA_ITEMS.slice(0, 6).map((item, index) => ({
      _key: slugKey("faq", location.slug, index),
      question: item.question,
      answer: item.answer,
    })),
  };
}

function main() {
  fs.mkdirSync(outputDir, { recursive: true });

  const lines = LOCATIONS.map(location => JSON.stringify(toSanityDocument(location)));
  fs.writeFileSync(outputFile, `${lines.join("\n")}\n`, "utf8");

  console.log(`Exported ${LOCATIONS.length} location landing pages to ${outputFile}`);
}

main();