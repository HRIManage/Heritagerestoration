# Website Audit — firewaterstorm.com (Heritage Restoration)

**Date:** 2026-09-01
**Scope:** Full audit — SEO, performance / Core Web Vitals, accessibility, technical health, content & conversion, plus code-level review of the repo.
**Method:** Live-site crawl + rendered-DOM inspection, Lighthouse (mobile), Chrome performance trace, source review of `client/`.

---

## Executive summary

The site has a **strong SEO foundation** — good information architecture, 22 genuinely-localized service-area pages, rich JSON-LD, a clean sitemap/robots setup, and an `llms.txt` for AI crawlers. Lighthouse scores are already high (Best Practices 100, SEO 92, Accessibility 90).

The problems are concentrated in a few areas that punch above their weight:

| # | Issue | Severity | Effort |
|---|-------|----------|--------|
| 1 | **Duplicate `<title>` / meta / OG tags on every page** — `index.html` hard-codes a full SEO set that every page then re-declares via Helmet. Crawlers and social scrapers see two of everything. | 🔴 Critical | Low ✅ fixed |
| 2 | **Client-only rendering, no prerender** — every route's raw HTML is the homepage shell. Social shares, Bing, and LLM crawlers that don't run JS get generic homepage title/description/image for all 30+ pages. | 🔴 Critical | High |
| 3 | **Inconsistent phone numbers** — the office line and a second `(360) 456-1886` line were used interchangeably across pages and schema. | 🔴 Critical (business) | ✅ fixed — standardized on `(360) 345-1015` per owner |
| 4 | **Fake / dead blog** — 3 hard-coded placeholder posts that link nowhere; ~25 real articles from the old site now 302-redirect to `/404`. Major lost top-of-funnel content. | 🟠 High | Medium |
| 5 | **Images unoptimized** — hero JPGs 300–615 KB, PNG logo/badges 130 KB+, no WebP/AVIF, no `srcset`, almost no lazy-loading. | 🟠 High | Medium |
| 6 | **No analytics / conversion tracking** — GA4, Google Ads, Meta Pixel are all placeholder IDs. Only Vercel Web Analytics (pageviews only). No way to measure calls or form fills. | 🟠 High | Low |
| 7 | **Soft 404s** — unknown URLs return HTTP 200 with the SPA shell, then render the 404 component. Google treats this as a quality problem. | 🟡 Medium | Medium |
| 8 | Visible placeholder heading ("Services Section") on the Fire Restoration page. | 🟡 Medium | Low ✅ fixed |
| 9 | Accessibility: color-contrast failures on the brand green, icon-only links with no name, heading-order jumps. | 🟡 Medium | Low ✅ partly fixed |
| 10 | 809 KB / 245 KB-gz single JS bundle, no route splitting; several unused heavy deps. | 🟡 Medium | Medium |

**Overall SEO score: 74 / 100** — good foundation, held back by the rendering model, the duplicate-tag bug, and the missing blog.

---

## 1. Crawlability & indexation

**Good**
- `robots.txt` is generated at build, allows everything important, explicitly allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.), and points to the sitemap.
- `sitemap.xml` has 35 clean URLs — homepage, 4 service pages, 22 location pages, resources, legal. `/thank-you` is correctly excluded and `noindex`.
- `vercel.json` has sensible 301s for legacy URLs (`/firedamage`, `/contact-us`, old city URLs).
- `llms.txt` is well written and served correctly.

**Issues**
- **Soft 404 (medium).** `https://www.firewaterstorm.com/anything-invalid` returns **HTTP 200**, not 404, because `vercel.json` rewrites every path to `/index.html`. The React 404 view then renders client-side. Google's guidance is explicit that "not found" pages must return a 404/410 status. Fix options: prerender a real `404.html` (Vercel serves it with a 404 status automatically if present in the output dir), or add an edge/middleware check for known routes.
- **Legacy blog URLs bleed link equity (high).** `vercel.json` sends ~25 old article URLs to `/blog/... → /404` with `"permanent": false` (302). Any inbound links or residual rankings those pages had are thrown away. Redirect each to the closest living page (a service page or `/resources/faq`) with `"permanent": true` (301) instead — or restore the content (see §5).
- **`changefreq`/`lastmod` mismatch (cosmetic).** Sitemap says `/` changes `weekly` but `lastmod` is the build date (currently ~6 weeks old). Rebuild/redeploy refreshes it; not harmful, just noise.
- Pages `/contact`, `/projects`, `/resources/blog`, `/resources/bill-of-rights` **have no `<link rel="canonical">`** at all (their Helmet blocks omit it). Every indexable page should self-canonicalize.

---

## 2. Meta tags & `<head>` — the duplicate-tag bug 🔴

`client/index.html` hard-codes a complete SEO set (`<title>`, description, keywords, robots, canonical policy, full Open Graph, full Twitter Card, geo tags). **Every page component then renders its own** via `react-helmet-async`. The Helmet build in use does not de-duplicate against tags it didn't create, so after React hydrates, every page ends up with:

- **2× `<title>`** (generic + page-specific)
- **2× `<meta name="description">`**
- **2× `og:title`, `og:url`, `og:description`, `og:image`, `twitter:*`**
- **2× `<meta name="robots">`**

Verified live on `/service-area/tacoma-wa` and `/services/water-restoration`. Consequences:
- Google's rendered-title algorithm and snippet selection get ambiguous input.
- **Social scrapers (Facebook, LinkedIn, iMessage, Slack) read raw HTML and never run JS** — so every shared link, for every page, shows the homepage title, homepage description, and `og:url = https://www.firewaterstorm.com/`. A shared Tacoma page looks identical to a shared homepage.

**Fix (done in this pass):** stripped the per-page SEO tags out of `index.html`, leaving only the genuinely global tags (charset, viewport, favicon, theme-color, PWA, preconnect, fonts, sitemap/llms links, LocalBusiness JSON-LD). Each page now owns its own `<head>` with no duplication. Verified via local production build.

**Follow-up (recommended):** every page except the location pages uses a bespoke inline `<Helmet>` with an inconsistent tag set (service pages have OG but no Twitter; Contact/Projects/Blog/Bill-of-Rights have neither OG nor canonical). There is already a good `<SEOHead>` component (`client/src/components/SEOHead.tsx`) that handles all of this consistently — only `LocationPage` uses it. Migrate the other ~11 pages to `<SEOHead>`.

**Other head issues**
- `og:image` URLs contain literal spaces (`/photo/Monnett Fire After.jpg`, `/photo/Photo Jul 06 2024, 08 57 29.jpg`). Some scrapers reject these. Percent-encode or rename the files to hyphenated lowercase.
- Title lengths: homepage title is ~75 chars (truncates in SERPs at ~60). Service page titles ("Fire Damage Restoration | Heritage Restoration") are fine. Consider front-loading city/State for location titles (already good).

---

## 3. Rendering model — no SSR / prerender 🔴

The site is a **client-rendered Vite SPA** deployed as static files on Vercel. There is no server-side rendering and no build-time prerendering, so:

- Initial HTML for `/service-area/olympia-wa` === initial HTML for `/` (both 8.6 KB, identical `<head>` and empty `<div id="root">`).
- Googlebot *can* render JS and will eventually index the real content (confirmed: rendered DOM has correct unique titles, H1s, and 3 JSON-LD blocks per location page), but rendering is deferred and less reliable than static HTML.
- Non-JS consumers — social unfurlers, some Bing paths, many AI crawlers, older scrapers — get nothing page-specific.

**Recommendation:** add build-time prerendering. For this stack the least invasive option is a Vite prerender step (e.g. `vite-react-ssg`, or a Puppeteer-based `prerender` that crawls the route list already defined in `vite.config.ts`) that emits a real static `.html` per route into `dist/public`. This keeps the SPA behavior for users, keeps Vercel static hosting, and gives every route correct HTML for crawlers and shares. This is the single biggest SEO lever for a 30-page local-service site and is worth prioritizing.

---

## 4. Phone numbers — inconsistent, business-critical 🔴

Two real numbers exist:

| Number | Role (per `llms.txt`) |
|--------|-----------------------|
| `(360) 345-1015` | Office — **non-emergency** |
| `(360) 456-1886` | **24/7 Emergency Hotline** |

Current usage in the code:

| Uses `345-1015` (office) | Uses `456-1886` (emergency) |
|---|---|
| Header (all 4 CTAs incl. red "24/7 Dispatch"), Footer, Home (all hero + section CTAs), LocationPage (all 5 CTAs), ServiceAreas, FAQ, Blog, Projects, Bill of Rights, Contents Services, **business JSON-LD in `index.html` + `seo.ts`** | Contact page (+ its JSON-LD), Thank-You, Privacy, Terms, **Fire / Water / Storm** service-page CTAs |

So a homeowner in a 2 a.m. emergency who taps "Call 24/7 Dispatch" in the header reaches the line `llms.txt` itself labels "non-emergency," while the three service pages that are *most* likely to be hit in an emergency use the correct hotline. Google's knowledge panel / local pack will show `345-1015` because that's the only number in the schema.

Additionally, `Fire/Water/StormRestoration.tsx` used a malformed `tel:13604561886` (missing `+1`).

**RESOLVED (2026-09-01).** The site owner confirmed **`(360) 345-1015` is the single number** to use everywhere. Applied site-wide:

| File | Change |
|------|--------|
| `pages/Contact.tsx` | Hotline CTA `tel:` + display, 2 form-error messages, and the page's `LocalBusiness` JSON-LD `telephone` → `345-1015`. |
| `pages/ThankYou.tsx` | "24/7 Hotline" CTA `tel:` + display → `345-1015`. |
| `pages/services/Fire / Water / StormRecovery.tsx` | CTA `tel:` → `tel:+13603451015` (fixes the malformed prefix *and* the number). |
| `pages/legal/Privacy.tsx`, `Terms.tsx` | Collapsed the "Office … · 24/7 Emergency …" two-number lines to a single "Phone (24/7): (360) 345-1015"; the Terms "No Emergency Substitute" clause updated. |
| `public/llms.txt` | Removed the separate "24/7 Emergency Hotline" number; one "Phone (24/7): (360) 345-1015" line. |

Header, Footer, Home, all 22 location pages, ServiceAreas, FAQ, Blog, Projects, Bill of Rights, Contents Services, and the business JSON-LD in `index.html` + `seo.ts` were **already** on `345-1015` — no change needed. Verified in a production build: every `tel:` link, every visible phone string, and every JSON-LD `telephone` across the site is now `(360) 345-1015` / `+1-360-345-1015`. No occurrence of `456-1886` remains in shipped code.

**Still to do (outside the site code):** make sure `(360) 345-1015` matches the Google Business Profile, Bing Places, and any directory listings exactly (NAP consistency).

**Dead code note:** `client/src/components/home/Footer.tsx` and `Offices.tsx`, and the whole `client/src/src_backup_june4/` folder, still contain the old `456-1886` (and other stale data). None of them are imported or shipped — but they should be deleted so nobody wires them back in by mistake.

---

## 5. Content & conversion

**The blog is not real (high).**
`client/src/pages/resources/Blog.tsx` renders 3 hard-coded cards ("5 Critical Steps After Water Damage", etc.) with invented dates. The cards are styled `cursor-pointer` but are **not links** — there are no article pages, and "Read Full Guide" goes nowhere. Meanwhile the old Squarespace site had ~25 real articles, all now redirected to `/404`.

For a restoration company, informational content ("does insurance cover water damage", "what to do after a house fire", "category 1/2/3 water") is the primary way to rank for research-stage queries and feed the funnel. Options, best to fastest:
- **Rebuild the blog** with real MDX/markdown articles (migrate the best of the old 25) and real `/resources/blog/:slug` routes + `Article` schema (the `buildArticleSchema` helper already exists).
- **Minimum:** remove the fake cards so the page doesn't look broken, and 301 the old article URLs to the most relevant service/FAQ page.

**The dedicated Contact-page form does not submit (high).**
`client/src/pages/Contact.tsx` has its **own inline** `const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY"` — the placeholder value. Its submit handler checks for exactly that placeholder and, finding it, **falls back to opening the visitor's `mailto:` client on every submission** — it never posts to Web3Forms, so no lead email is generated unless the visitor then completes and sends the email themselves. The homepage form is fine: it imports `client/src/lib/web3forms.ts`, which has the real key (`d24301a7-…`). Fix: delete the inline key/handler in `Contact.tsx` and use the shared `submitIntake` / `isWeb3FormsConfigured` from `@/lib/web3forms` exactly as `Home.tsx` does. (Confirm which inbox the Web3Forms key delivers to — the lib comment says `nick@`, the Contact page mailto says `office@`.) This is a direct lead-capture leak on the page most likely to receive form fills.

**Other content notes**
- Fire Restoration page has a visible placeholder `<h2>` reading **"Services Section"** — ✅ fixed to "Our Fire Damage Restoration Services".
- Fire page CTA button says "Contact Us Now" but is a `tel:` link. ✅ It now dials `(360) 345-1015` like every other CTA; consider relabeling to "Call (360) 345-1015" for clarity.
- `Projects.tsx` references an "Auburn, WA" project; `PROJECT_SUMMARY.md` still describes an Auburn *office* that no longer exists (`CLAUDE.md` notes this doc is stale) — clean up the doc.
- Service-page breadcrumb JSON-LD has positions 2 and 3 pointing to the same URL (there's no `/services` index). Point crumb 2 at `/service-areas` or drop it.
- Contact page injects a second `LocalBusiness` entity (different phone, no `@id`, missing `url`) that competes with the canonical business entity. Reference `{"@id": "https://www.firewaterstorm.com/#business"}` instead of redefining.

---

## 6. Performance & Core Web Vitals

Chrome trace (home, unthrottled): **LCP 954 ms, CLS 0.00, TTFB 27 ms.** No CrUX field data — the site doesn't get enough traffic for real-user metrics yet. LCP is ~97% "render delay" — time spent booting the SPA before the hero paints; on a mid-range phone / 4G this will be materially worse.

**Levers, highest impact first:**

1. **Images (high).** Served as raw JP/PNG at full resolution:
   - `hero-new.jpg` 414 KB · `hero-tarp.jpg` 314 KB · `contents-gallery-9.jpg` **615 KB** · `Monnett Fire Before.jpg` 314 KB · `heritage-logo.png` 134 KB · `emergency-badge-new-2.png` 137 KB
   - No `<picture>`/WebP/AVIF, no `srcset`, no width/height on most `<img>` (9 of 14 on the Tacoma page).
   - Vercel Image Optimization works for any project via the `images` field in `vercel.json` + requesting `/_vercel/image?url=…&w=…&q=…`. Or add a build step (`vite-imagetools` / `sharp`) to emit resized WebP + `srcset`.
   - Convert the logo and badge PNGs to compact SVG or small WebP (target <10 KB each).
   - Expected saving: ~1.5–2 MB on the homepage, large LCP/《FCP》improvement on mobile.
2. **Lazy-load below-the-fold images (low).** Only 1 `loading="lazy"` in the entire `pages/` tree. ✅ Added `loading="lazy"` + `decoding="async"` to the home PhotoDeck, blog cards, service-page section images, and location-page gallery/badges; added `fetchpriority="high"` to hero images.
3. **JS bundle (medium).** 809 KB / 245 KB-gz, single chunk, every page's code loaded up front. Vite itself warns. Actions:
   - Route-level `React.lazy()` + `Suspense` (wouter supports it) — the 22 near-identical location pages, legal pages, and resources don't need to be in the initial bundle.
   - Drop unused heavy deps: `recharts`, `cmdk`, `input-otp`, `react-day-picker`, `vaul`, `streamdown`, `embla-carousel-react`, most of the `@radix-ui/*` set, and likely one of `framer-motion` **or** GSAP (the codebase uses both).
4. **Fonts (low).** Google Fonts via render-blocking `<link>`, 2 families, Hanken Grotesk in 6 weights (300–800). `display=swap` and `preconnect` are already set. Self-host the woff2 files (eliminates the `fonts.gstatic.com` round-trip) and ship only the 3–4 weights actually used.
5. **LCP hero animation.** The homepage hero image is animated with GSAP (`scale 1.08 → 1` over 4.4 s). Animating the LCP element can delay when the browser considers it "painted." `useReducedMotion` is respected — good — but consider a shorter/cheaper transform or animating an overlay instead of the image.

---

## 7. Accessibility (Lighthouse 90)

Failing audits:
- **color-contrast (61 nodes).** The brand green `#8DBD42` is the culprit:
  - white text on `#8DBD42` = **2.2:1** (needs 4.5) — mobile utility-bar chip, hero call button.
  - `#145126` on `#8DBD42` = 4.24:1 — ticker strip text (fails for normal-size text).
  - faded greens like `#a8cc6f` / `#8DBD42` on the near-white `#faf9f6` = 1.7–2.1:1 — process step numbers, some labels.
  - Also `text-[#3F4143]/72` and `/65` body text on light backgrounds land around 4.2–4.4:1.
  - Fix: use a darker green (`~#5f8e2e` or `#4d7a25`) for green-on-white *text*; use dark charcoal text on green *fills*; keep `#8DBD42` for large headings, icons, borders and decoration only. Bump muted body text to at least `/80` opacity.
- **link-name (2 nodes).** The footer Facebook/Instagram links are icon-only with no accessible name. ✅ Fixed — added `aria-label`.
- **heading-order.** Footer section headers are `<h4>` with no `<h2>/<h3>` above them; the homepage "North Office / South Office" block uses `<h3>` before any `<h2>`. ✅ Footer bumped to `<h2>` (same styling). Home office block still to do.

Not flagged by Lighthouse but worth doing:
- No **skip-to-content** link; `<Header>` isn't wrapped in a `<header>`/`role="banner"`; both the mobile and desktop `<nav>` render into the DOM simultaneously (hidden by CSS) with no distinguishing `aria-label`.
- Desktop "Services"/"Resources" dropdown triggers have no `aria-expanded` / `aria-haspopup`.
- Mobile menu doesn't trap focus or return focus to the toggle on close.

---

## 8. Structured data

**Good** — `LocalBusiness`/`HomeAndConstructionBusiness` on every page, per-service `Service` schema, `FAQPage`, `BreadcrumbList`, and a full `@graph` on location pages with city-scoped business + services + FAQ. `buildArticleSchema` ready for a real blog.

**Fix**
- Contact page's standalone `LocalBusiness` (different phone, no `@id`) — reference the canonical `@id` instead.
- Service-page breadcrumbs: duplicate URL at positions 2 & 3.
- The `index.html` JSON-LD and `seo.ts` `BUSINESS_SCHEMA` should agree on phone number (see §4) and ideally the `index.html` copy should carry the same `@id` (`/#business`) so it merges rather than creating a second node.
- Consider adding `aggregateRating` / `Review` schema **only if** you have a real, policy-compliant source (the site currently shows "4.9 / 80+ Google reviews" as static text and invented per-city review quotes in `LocationPage.tsx` — those fabricated testimonials are a trust/liability risk and must not be marked up as `Review` schema; ideally replace with real, attributed reviews).

---

## 9. Internal linking & IA

**Good** — footer links to all 22 location pages + services + resources on every page; location pages cross-link 4 nearby cities and back to `/service-areas`; service pages link to FAQ. Nav is clear.

**Improve**
- Service pages don't link to the location pages (or vice-versa in body content) — add "Serving [city list]" blocks or contextual links so the two page clusters reinforce each other.
- No breadcrumb UI on the page (only in schema) — visible breadcrumbs help users and give Google anchor-text signals.
- The homepage doesn't link to individual service-area pages (only "Service Areas" hub).

---

## 10. Security & config (minor)

- No `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, or `Referrer-Policy` headers (HSTS is present via Vercel). Add a `headers` block in `vercel.json`.
- `client/public/__manus__/debug-collector.js` ships to production (harmless but dead weight / info leak of the build tooling). The Vite plugin is dev-only but the static file in `public/` is always deployed — delete it.
- Repo hygiene: `client/src_backup_june4/` (a full stale copy), `client/src/lib/seo.ts` (superseded by `client/src/seo.ts` — having both is a footgun), and `index_recovered.css` should be removed.
- `web3forms` access key is committed in source (`client/src/lib/web3forms.ts`). This is inherent to the static-hosting choice and Web3Forms keys are low-risk, but be aware it's public and rate-limited.

---

## What was changed in this pass

| File | Change |
|------|--------|
| `client/index.html` | Removed **all** hard-coded SEO tags — `<title>`, description, keywords, robots, author, every `og:*`, every `twitter:*`, `geo.*`, and the stale `images.squarespace-cdn.com` dns-prefetch. Kept charset, viewport, favicon, theme-color, PWA, preconnect, fonts, sitemap/llms links, LocalBusiness JSON-LD. This is what fixes the site-wide duplicate-tag bug. |
| `client/src/pages/services/FireRestoration.tsx` | "Services Section" placeholder `<h2>` → "Our Fire Damage Restoration Services"; `tel:13604561886` → `tel:+13604561886`; percent-encoded the `og:image` URL; lazy-loaded the section images. |
| `client/src/pages/services/WaterRestoration.tsx`, `StormRecovery.tsx` | `tel:13604561886` → `tel:+13604561886` (format only — the number dialed is unchanged). |
| `client/src/components/layout/Footer.tsx` | `aria-label` on the Facebook/Instagram links (fixes the `link-name` a11y failure); section headers `<h4>` → `<h2>` (fixes `heading-order`; classes/appearance unchanged). |
| `client/src/pages/Home.tsx`, `resources/Blog.tsx`, `locations/LocationPage.tsx` | `loading="lazy"` + `decoding="async"` on below-the-fold images (home 14-image PhotoDeck, blog cards, location before/after + truck + badges); `fetchpriority="high"` + `decoding="async"` on the LCP hero images. Improved the generic `alt="Gallery image N"` text on the home deck. |

Verified against a local production build (`tsc --noEmit` clean, `vite build` clean, checked in `vite preview`): the homepage and the `/services/*` and `/service-area/*` routes now each render **exactly one** `<title>`, one `<meta name="description">`, one `<link rel="canonical">`, one set of Open Graph tags, and one set of Twitter tags. `index.html` dropped from 8.6 KB to 6.4 KB.

**Trade-offs / notes on this change**
- The pre-JS raw HTML now has *no* `<title>` or meta tags at all (previously it had homepage-generic ones on every route). For Googlebot (which renders JS) this is a clear improvement — it now sees correct, unique, un-duplicated tags. For non-rendering consumers (social unfurlers, some AI crawlers) it's neutral: they previously got *wrong* homepage tags on every subpage, now they get *none*. **Adding build-time prerendering (§3) is what actually fixes that** and should be the next step.
- The bespoke `<Helmet>` blocks on the non-location pages still don't emit a `robots` meta tag (only `<SEOHead>` does). Missing = `index, follow` by default, so pages stay indexable, but migrating every page to `<SEOHead>` (§2 follow-up) would restore the explicit directive plus consistent Twitter/canonical coverage.
- No visual/layout changes. Phone-number *routing* was not touched (§4 — needs your decision); only the malformed `tel:` prefix was corrected.

## Recommended next (not done — needs decisions or larger work)

1. **Fix the Contact-page form** (§5) — it currently never submits, it only opens a `mailto:`. Point it at the shared `@/lib/web3forms` like the homepage form does. *(Small, high-value — do this first.)*
2. **Add build-time prerendering** (§3).
3. **Rebuild the blog** with real content and 301 the old URLs (§5).
4. **Image pipeline** — WebP/AVIF + `srcset` + resize; convert logo/badges (§6.1).
5. **Wire up analytics** — GA4 + call-click and form-submit conversion events (`client/src/lib/analytics.ts` is scaffolded).
6. **Migrate all pages to `<SEOHead>`** (§2 follow-up) — also gives Contact/Projects/Blog/Bill-of-Rights their missing canonical tags.
7. **Fix the green contrast** in the design tokens (§7).
8. **Fix the soft-404** and add a real 404 status (§1).
9. **Code-split routes + drop unused deps** (§6.3).
10. Confirm `(360) 345-1015` on Google Business Profile / directories; add security headers; delete `__manus__/`, `src_backup_june4/`, `components/home/`, `lib/seo.ts`, `index_recovered.css`.
