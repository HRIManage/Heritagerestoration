# Sanity Location Landing Pages

This repo already has location landing pages in code at `client/src/pages/locations/LocationPage.tsx` and `client/src/data/locations.ts`.

If you want a non-developer to edit those landing pages later, the easiest path is:

1. Keep the current route and page template.
2. Set up a Sanity Studio separately.
3. Import the existing location records in bulk.
4. Later switch the frontend from local data to Sanity data.

## What is already prepared here

- `client/src/components/SEOHead.tsx` centralizes page SEO output.
- `client/src/sanity/client.js` reads `VITE_SANITY_PROJECT_ID` and `VITE_SANITY_DATASET`.
- `npm run sanity:export-location-pages` creates a bulk import file from the existing location landing pages.

## Export the current landing pages

Run:

```bash
npm run sanity:export-location-pages
```

That writes:

`sanity-import/location-landing-pages.ndjson`

This file is ready for `sanity dataset import` after you create your Sanity project and dataset.

## Recommended Sanity document type

Create a document type named `locationLandingPage` in your Sanity Studio with fields that match the exported data:

- `title`
- `slug`
- `cityName`
- `fullName`
- `county`
- `office`
- `distance`
- `zipCodes`
- `nearbyCities`
- `neighborhoods`
- `landmark`
- `blurb`
- `coordinates.lat`
- `coordinates.lng`
- `seo.title`
- `seo.description`
- `seo.keywords`
- `seo.noIndex`
- `seo.heroImageAlt`
- `faqItems[]`

## Minimal schema shape

```ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "locationLandingPage",
  title: "Location Landing Page",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: rule => rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "cityName" }, validation: rule => rule.required() }),
    defineField({ name: "cityName", type: "string", validation: rule => rule.required() }),
    defineField({ name: "fullName", type: "string", validation: rule => rule.required() }),
    defineField({ name: "county", type: "string", validation: rule => rule.required() }),
    defineField({ name: "office", type: "string", options: { list: ["North", "South"] } }),
    defineField({ name: "distance", type: "string" }),
    defineField({ name: "zipCodes", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "nearbyCities", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "neighborhoods", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "landmark", type: "string" }),
    defineField({ name: "blurb", type: "text", rows: 4 }),
    defineField({
      name: "coordinates",
      type: "object",
      fields: [
        defineField({ name: "lat", type: "number" }),
        defineField({ name: "lng", type: "number" }),
      ],
    }),
    defineField({
      name: "seo",
      type: "object",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "description", type: "text", rows: 3 }),
        defineField({ name: "keywords", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "noIndex", type: "boolean", initialValue: false }),
        defineField({ name: "heroImageAlt", type: "string" }),
      ],
    }),
    defineField({
      name: "faqItems",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", type: "string" }),
            defineField({ name: "answer", type: "text", rows: 3 }),
          ],
        },
      ],
    }),
  ],
});
```

## Import into Sanity later

After you create the Sanity project and dataset:

```bash
sanity dataset import sanity-import/location-landing-pages.ndjson production
```

## Frontend status today

Today the landing pages still render from local code data. That means the site keeps working without Sanity.

When you are ready, the next code step is to update `client/src/pages/locations/LocationPage.tsx` so it fetches by slug from Sanity first and falls back to `client/src/data/locations.ts` while you finish content entry.