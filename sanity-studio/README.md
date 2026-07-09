# Sanity Studio

This Studio is preconfigured for the Heritage Restoration location landing pages.

## First run

1. From this folder, install dependencies with `npm install`.
2. Authenticate with `npx sanity login`.
3. Start the studio with `npm run dev`.

## Project settings

- Project ID: `pm288vva`
- Dataset: `production`

## Import existing landing pages

From the repository root, the bulk export file is already available at:

`sanity-import/location-landing-pages.ndjson`

After logging in, import it with:

`npx sanity dataset import ../sanity-import/location-landing-pages.ndjson production`