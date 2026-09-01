/**
 * Analytics & ad-conversion helpers (GA4 + Google Ads + Meta Pixel).
 *
 * ──────────────────────────────────────────────────────────────────────────
 * SETUP — no code change needed. Set these as environment variables in Vercel
 * (Project → Settings → Environment Variables), then redeploy:
 *
 *   VITE_GA4_ID                → GA4 Measurement ID            (G-XXXXXXXXXX)
 *   VITE_GOOGLE_ADS_ID         → Google Ads tag ID             (AW-XXXXXXXXX)
 *   VITE_GOOGLE_ADS_LEAD_LABEL → Google Ads "lead" conversion label
 *   VITE_META_PIXEL_ID         → Meta (Facebook) Pixel ID      (numeric)
 *
 * Until an ID is provided, NOTHING is loaded or sent for that vendor — the site
 * stays clean and no bogus requests fire. Every loader and tracker checks
 * `*Configured()` first. The string constants below are only fallbacks for
 * local/manual use; prefer the env vars.
 * ──────────────────────────────────────────────────────────────────────────
 */

const env = import.meta.env as Record<string, string | undefined>;

export const GA4_ID = env.VITE_GA4_ID || "G-XXXXXXXXXX";
export const GOOGLE_ADS_ID = env.VITE_GOOGLE_ADS_ID || "AW-XXXXXXXXX";
export const GOOGLE_ADS_LEAD_LABEL =
  env.VITE_GOOGLE_ADS_LEAD_LABEL || "XXXXXXXXXXXXXXXXX";
export const META_PIXEL_ID = env.VITE_META_PIXEL_ID || "XXXXXXXXXXXXXXX";

const isPlaceholder = (v: string) => !v || v.includes("XXXX");

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
 * Send a manual GA4 page_view. Called on every client-side route change
 * (see App.tsx) because a single-page app only triggers one automatic
 * page_view — on the initial load — which we disable in initAnalytics().
 */
export function trackPageView(path: string) {
  if (gaConfigured() && typeof window.gtag === "function") {
    window.gtag("event", "page_view", {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });
  }
}

/**
 * Fire a "lead" conversion across GA4, Google Ads, and Meta Pixel.
 * Call on successful contact-form submit (see ThankYou.tsx).
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

/**
 * Fire a phone-call intent event. Wired automatically to every `tel:` link on
 * the site by the delegated click listener in initAnalytics(); `location`
 * defaults to the current page path but a link may override it with a
 * `data-call-location` attribute.
 */
export function trackCallClick(location: string = "unknown") {
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

/** Attach one delegated listener that reports clicks on any `tel:` link. */
function wireTelClickTracking() {
  if (typeof document === "undefined") return;
  document.addEventListener(
    "click",
    e => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.(
        'a[href^="tel:"]'
      ) as HTMLAnchorElement | null;
      if (!link) return;
      trackCallClick(link.dataset.callLocation || window.location.pathname);
    },
    { capture: true }
  );
}

/**
 * Injects GA4 / Google Ads / Meta Pixel scripts — but ONLY for IDs that have
 * been configured. Safe to call once on app startup. No-ops entirely while no
 * IDs are set, so nothing loads on a fresh clone.
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
    // send_page_view:false — this is an SPA, so page views are sent manually
    // on every route change via trackPageView() (see App.tsx).
    if (gaConfigured())
      window.gtag("config", GA4_ID, { send_page_view: false });
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

  if (gaConfigured() || pixelConfigured()) wireTelClickTracking();
}
