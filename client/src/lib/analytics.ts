/**
 * Analytics & ad-conversion helpers (GA4 + Google Ads + Meta Pixel).
 *
 * ──────────────────────────────────────────────────────────────────────────
 * SETUP: replace the placeholder IDs below with your real ones, then redeploy.
 *   - GA4_ID                 → Google Analytics 4 Measurement ID  (G-XXXXXXXXXX)
 *   - GOOGLE_ADS_ID          → Google Ads tag ID                  (AW-XXXXXXXXX)
 *   - GOOGLE_ADS_LEAD_LABEL  → Conversion label for "lead" action (from Google Ads)
 *   - META_PIXEL_ID          → Meta (Facebook) Pixel ID           (numeric)
 *
 * Until the placeholders are replaced, NOTHING is loaded or sent — so the site
 * stays clean and no bogus requests fire. The loader and the trackers all check
 * `*Configured()` first.
 * ──────────────────────────────────────────────────────────────────────────
 */

export const GA4_ID = "G-XXXXXXXXXX";
export const GOOGLE_ADS_ID = "AW-XXXXXXXXX";
export const GOOGLE_ADS_LEAD_LABEL = "XXXXXXXXXXXXXXXXX";
export const META_PIXEL_ID = "XXXXXXXXXXXXXXX";

const isPlaceholder = (v: string) => v.includes("XXXX");

export const gaConfigured = () => !isPlaceholder(GA4_ID);
export const adsConfigured = () =>
  !isPlaceholder(GOOGLE_ADS_ID) && !isPlaceholder(GOOGLE_ADS_LEAD_LABEL);
export const pixelConfigured = () => !isPlaceholder(META_PIXEL_ID);

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Fire a generic event to GA4 (no-op until configured). */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (gaConfigured() && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}

/**
 * Fire a "lead" conversion across GA4, Google Ads, and Meta Pixel.
 * Call on successful contact-form submit (and optionally on phone-CTA clicks).
 */
export function trackLead(context: string = "contact_form") {
  trackEvent("generate_lead", { method: context });

  if (adsConfigured() && typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_LEAD_LABEL}`,
    });
  }

  if (pixelConfigured() && typeof window.fbq === "function") {
    window.fbq("track", "Lead", { content_name: context });
  }
}

/** Fire a phone-call intent event (call on tel: link clicks). */
export function trackCallClick(location: string = "header") {
  trackEvent("phone_call_click", { location });
  if (pixelConfigured() && typeof window.fbq === "function") {
    window.fbq("track", "Contact", { method: "phone", location });
  }
}

function loadScript(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

/**
 * Injects GA4 / Google Ads / Meta Pixel scripts — but ONLY for IDs that have
 * been filled in. Safe to call once on app startup. No-ops entirely while every
 * ID is still a placeholder, so nothing loads on a fresh clone.
 */
export function initAnalytics() {
  if (typeof window === "undefined") return;

  // ── Google (GA4 + Ads share one gtag instance) ──────────────────────────
  if (gaConfigured() || adsConfigured()) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };
    window.gtag("js", new Date());

    const primaryId = gaConfigured() ? GA4_ID : GOOGLE_ADS_ID;
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${primaryId}`);
    if (gaConfigured()) window.gtag("config", GA4_ID);
    if (adsConfigured()) window.gtag("config", GOOGLE_ADS_ID);
  }

  // ── Meta (Facebook) Pixel ───────────────────────────────────────────────
  if (pixelConfigured() && !window.fbq) {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const w = window as any;
    const fbq: any = function (...args: unknown[]) {
      fbq.callMethod ? fbq.callMethod.apply(fbq, args) : fbq.queue.push(args);
    };
    if (!w._fbq) w._fbq = fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    w.fbq = fbq;
    /* eslint-enable @typescript-eslint/no-explicit-any */

    loadScript("https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", META_PIXEL_ID);
    fbq("track", "PageView");
  }
}
