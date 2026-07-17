# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing website for Heritage Restoration, a fire/water/storm damage restoration company serving Western Washington. It is a single-page React app (client-rendered) with a thin optional Express server. Live site: `https://www.firewaterstorm.com`.

## Commands

Package manager is **pnpm** (pinned to `pnpm@10.4.1` via the `packageManager` field). On this Windows machine Node lives at `C:\Program Files\nodejs`; new terminals have it on PATH.

```bash
pnpm install          # install deps
pnpm dev              # Vite dev server on :3000 (falls back to next free port, e.g. 3001), --host
pnpm build            # vite build → dist/public, then esbuild-bundle server/index.ts → dist/index.js
pnpm start            # run the bundled Express server (NODE_ENV=production) — self-hosted only
pnpm preview          # preview the production client build
pnpm check            # tsc --noEmit (typecheck — there is no separate lint step)
pnpm format           # prettier --write .
```

There is **no test suite** despite `vitest` being installed and `TESTING_GUIDE.md` describing manual QA. `pnpm check` is the only automated verification.

## Architecture — the big picture

### Two deploy targets, and they behave differently
- **Vercel (production, `vercel.json`)**: builds **client only** (`vite build` → `dist/public`) and serves it as a **static SPA** — every path rewrites to `/index.html`. The Express server is **not deployed here**, so `server/index.ts` and its `/api/google-reviews` endpoint do **not** exist in production. Assume no backend when reasoning about the live site.
- **Self-hosted (`pnpm start`)**: runs the bundled Express server, which serves the static build *and* exposes `/api/google-reviews`.

Consequence: any feature that needs a server (the Google reviews proxy) only works self-hosted. Client-side features must degrade gracefully when the API is absent.

### Routing & pages
Client-side routing uses **wouter** (`client/src/App.tsx`), not React Router. All routes are declared in the `<Switch>` there. Pages live in `client/src/pages/` grouped by section: `services/`, `resources/`, `locations/`, `legal/`. `App.tsx` also holds `ScrollToTop` (manual scroll restoration on navigation) wrapped in `HelmetProvider` → `ErrorBoundary` → `ThemeProvider`.

Vite serves from `root: client/`, with path aliases: `@` → `client/src`, `@shared` → `shared`, `@assets` → `attached_assets`.

### Location landing pages (SEO engine)
`/service-area/:slug` pages are **data-driven** from `client/src/data/locations.ts` (23 cities). That single array is the source of truth — it generates the routes, footer links, sitemap entries (`vite.config.ts` imports `LOCATIONS`), and per-city JSON-LD schema. **To add a city, append one entry there**; do not hand-wire a route or sitemap URL.

### SEO & structured data
`client/src/seo.ts` is central and imported by both the client and `vite.config.ts`. It exports `BASE_URL` plus JSON-LD builders (`BUSINESS_SCHEMA`, `buildServiceSchema`, `buildFAQSchema`, `buildBreadcrumbSchema`, `buildArticleSchema`, `buildLocationSchema`). Pages inject these via `react-helmet-async`. FAQ schema text is duplicated as plain strings here (no JSX) so it can be serialized — keep the schema FAQ items in sync with visible FAQ content. Sitemap and `robots.txt` are generated at build time by `vite-plugin-sitemap` configured in `vite.config.ts` (route list + priorities live there; AI crawler user-agents like GPTBot/ClaudeBot are explicitly allowed).

### Contact form
`client/src/pages/Contact.tsx` submits directly to **Web3Forms** (`api.web3forms.com`), keeping the form working on static hosting with no backend. The access key is a hardcoded constant `WEB3FORMS_ACCESS_KEY`; when it's still the placeholder `"YOUR_WEB3FORMS_ACCESS_KEY"` the form falls back to a `mailto:` flow. Set the real key there to enable direct submission.

### UI, styling, animation
- **Tailwind CSS 4** via `@tailwindcss/vite` (no `tailwind.config.js` — configured in CSS). Global styles in `client/src/index.css`. (`index_recovered.css` is a stray backup — ignore it.)
- **shadcn/ui** components in `client/src/components/ui/` (`components.json` config). Home-page sections in `client/src/components/home/`, layout in `client/src/components/layout/`.
- Animation uses **both** `framer-motion` and **GSAP** — check which a component already uses before adding motion.
- `ThemeContext` provides light/dark theming (`defaultTheme="light"`), backed by `next-themes`.

### Manus dev tooling (dev-only)
`vite.config.ts` registers several **dev-only** plugins (the `devOnlyPlugins` array, added only when `command === "serve"`): a debug-log collector that POSTs browser console/network logs to `.manus-logs/`, a `/manus-storage` proxy, and JSX location tagging. These are stripped from production builds — don't rely on them at runtime.

## Env vars
All are **optional** and only used by the self-hosted Express server for the Google reviews integration (`.env.example`): `GOOGLE_BUSINESS_PROFILE_*` (preferred, OAuth refresh-token flow) or `GOOGLE_PLACES_API_KEY` + `GOOGLE_PLACE_ID` (fallback), plus `GOOGLE_REVIEWS_CACHE_MS` / `GOOGLE_REVIEWS_LIMIT`. The app runs fully without a `.env` file.

## Business facts baked into content/schema
Two offices: **North** — 8695 Martin Way E, Unit 103, Lacey WA 98516; **South** — 1581 N. National Ave, Chehalis WA 98532. Phone `+1-360-345-1015`, email `office@firewaterstorm.com`, operating since 2004, 24/7. These recur across `seo.ts`, `locations.ts`, and home components — update all when business details change. (Note: `PROJECT_SUMMARY.md` is partly stale — it references port 5173 and an "Auburn" office that no longer apply.)

---

# Heritage Restoration — Content Editing Guide

This section is specifically for handling requests from a non-technical team member making content updates.

## Business context

24/7 fire, water, and storm damage restoration company serving Western Washington (Lacey, Tacoma, Chehalis, Puyallup, and surrounding areas), operating since 2004. IICRC certified. Key selling points: 60-minute emergency response, direct insurance billing. Theme color in site metadata: #8DBD42 (green) — confirm this against the actual design system once /init runs, since metadata color and component-level design tokens aren't always the same value.

## Site sections (as of last check)

- Hero
- Service overview (fire damage, water damage, storm damage, likely mold remediation)
- Certifications / trust signals (IICRC, insurance billing, response time)
- Service area list
- Emergency contact CTA (this site likely has a more prominent "call now" element than the other two, given the 24/7 emergency nature of the business)

## Rules for content-only edits

1. Make the edit locally, then show it to the user running on localhost (`pnpm dev` → http://localhost:3000, or the next free port such as 3001 if 3000 is busy). Only after the user explicitly approves what they see, commit and push directly to `main`. No feature branch or PR is required unless the user asks for one.
2. This is a Vite/React app, not Next.js — routing, data fetching, and file structure conventions differ. Let /init map the actual structure rather than assuming it matches the other two sites.
3. The emergency phone number is the most important content on this site. Treat any request to update it as high-priority and double-check every location it appears (header, footer, hero CTA, any "sticky" call button, schema/meta tags) before confirming done.
4. Only touch content — visible text, image references, phone/address, service area list, certifications/trust badges. Do not touch package.json, config/build files, or anything in lib/, api/, or similar folders.
5. New photos: save into `client/public/photo/` (referenced in code as `/photo/<filename>`), descriptive lowercase-hyphenated filenames, keep under ~2MB.
6. After any change, tell the user in plain English what changed and show it to them on the localhost preview (http://localhost:3000). Don't reference git, branches, or commits in that summary.

## What NOT to do

- Don't change layout, colors, or fonts unless explicitly asked.
- Don't touch anything related to emergency response time claims or certification claims without Ben's explicit sign-off — these are compliance/trust-sensitive statements, not just marketing copy.

## Images folder

The images Vite actually serves live in **`client/public/photo/`** (Vite's `root` is `client/`, so that is the effective public dir). Reference them in code as `/photo/<filename>`. The brand logo is `client/public/photo/heritage-logo.png`. Ignore the duplicate leftover `photo/` and `public/photo/` directories at the repo root — those are not what the site serves.
