# SEO & Traffic Growth Plan — firewaterstorm.com

Follow-on from `WEBSITE_AUDIT_2026-09.md`. Where leads come from for a local
emergency-restoration company, in order of value:

1. **Google local pack / Maps** — "water damage restoration near me", "[service] [city]". Mostly off-site (Google Business Profile, reviews, proximity, citations).
2. **Organic "[service] [city]"** — the 22 location pages + 4 service pages.
3. **Research-stage content** — "does insurance cover water damage", "what to do after a house fire". Currently zero (the blog is placeholder).
4. **AI answers** — ChatGPT / Perplexity / Google AI Overviews. Needs crawlable, authoritative pages.

---

## Tier 1 — Foundation

### 1a. Analytics + conversion tracking  ← IN PROGRESS (this PR)

The code is wired; it activates the moment the IDs exist. **No further code change needed.**

**Steps:**
1. Create a **GA4 property** at analytics.google.com → copy the Measurement ID (`G-XXXXXXXXXX`).
2. In **Vercel → Heritagerestoration → Settings → Environment Variables**, add for *Production* (and Preview):
   - `VITE_GA4_ID` = your `G-…` ID
3. Redeploy (Vercel → Deployments → ⋯ → Redeploy, or push any commit).
4. Verify: open the site, then GA4 → Reports → Realtime — you should see yourself.

**What you'll then have automatically:**
- Page views on every route (SPA route changes are tracked manually — see `App.tsx`).
- `phone_call_click` event on **every `tel:` link** on the site (delegated listener in `lib/analytics.ts`).
- `generate_lead` event on successful contact-form submit (`ThankYou.tsx`).

**In GA4, mark as key events (conversions):** `phone_call_click`, `generate_lead`.
(Admin → Events → toggle "Mark as key event".)

**Optional, same mechanism:**
- `VITE_GOOGLE_ADS_ID` + `VITE_GOOGLE_ADS_LEAD_LABEL` — only if you run Google Ads.
- `VITE_META_PIXEL_ID` — only if you run Facebook/Instagram ads.

### 1b. Google Search Console  ← DO THIS

1. Go to search.google.com/search-console → add property `https://www.firewaterstorm.com`.
2. Verify — easiest options:
   - **GA4 method**: once 1a is live and you use the same Google account, GSC verifies automatically. *(recommended)*
   - **HTML tag**: copy the `content="…"` value into Vercel env var `VITE_GSC_VERIFICATION`, redeploy. The tag renders site-wide (see `App.tsx`).
   - **DNS TXT**: add the record at your domain registrar (no code).
3. Submit the sitemap: GSC → Sitemaps → enter `sitemap.xml`.
4. After a week, check **Pages** (indexing coverage) and **Performance** (which queries you rank for). This tells you what's working.

### 1c. Prerendering  ← NEXT BUILD TASK (separate PR)

The 22 location + 4 service pages are client-rendered only — social/AI crawlers
get a blank shell and Google indexes them slowly. Add build-time prerendering so
every route ships real static HTML. Biggest single on-site ranking lever.

### 1d. Google Business Profile tune-up  ← YOU (checklist)

More leads than the whole website for this industry.
- Claimed & verified; primary category **Water Damage Restoration Service**, secondaries: Fire Damage Restoration Service, Building Restoration Service.
- NAP **exactly** `(360) 345-1015`, address matching the site.
- Service area set to the cities in the footer.
- 15+ recent photos (crews, trucks, before/after, team).
- Weekly "Update" posts (a recent job, a seasonal tip).
- Q&A seeded with your top 5 FAQs.
- Enable messaging; respond fast.
- Turn on a review-request habit (see Tier 3).

---

## Tier 2 — Content engine

- **Rebuild the blog.** ~25 real articles were 301'd to `/404` in the Squarespace
  migration (`vercel.json`). Restore/rewrite the best, add real
  `/resources/blog/:slug` pages + `Article` schema (`buildArticleSchema` exists).
  Priority topics: insurance-claim process, "what to do in the first 24 hours
  after [fire/water/storm]", "does insurance cover X", mold timeline, choosing a
  contractor vs. a franchise.
- **Deepen location pages** — embedded map, real local review quotes (replace the
  fabricated per-city ones in `LocationPage.tsx`), references to actual recent
  local weather/fire events, more neighborhood-specific copy.
- **Deepen service pages** — per-service FAQ block, cost ranges, "signs you need
  this", equipment/process detail. Fix the breadcrumb schema (positions 2 & 3
  currently share a URL).

## Tier 3 — Authority (off-site + on-site support)

- **Reviews** — build a post-job review-request flow (SMS/email → GBP review
  link). Replace fabricated testimonials with real, attributed ones. Only add
  `Review`/`AggregateRating` schema once backed by real reviews.
- **Citations** — Yelp, BBB, Angi, HomeAdvisor, Thumbtack, Nextdoor, chamber of
  commerce, IICRC "find a firm" directory. Identical NAP everywhere.
- **Local backlinks** — pitch storm/fire-recovery stories to local news; partner
  links from roofers, plumbers, realtors, property managers, insurance agents.

## Tier 4 — Ongoing

- Monthly: GSC Performance + Pages review; GA4 conversions by landing page.
- Track rank for "[service] [city]" across the 22 cities.
- Keep publishing (target 2–4 articles/month).
- Refresh location/service pages quarterly.
