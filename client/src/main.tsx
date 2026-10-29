import { createRoot } from "react-dom/client";
import { inject } from '@vercel/analytics';
import App, { preloadRoute, preloadAllRoutes } from "./App";
import "./index.css";
import { initAnalytics } from "./lib/analytics";

// GA4 / Google Ads / Meta Pixel — no-ops until real IDs are set in lib/analytics.ts
initAnalytics();

// Vercel Web Analytics
inject();

// Dynamically inject analytics script if environment variables are provided
const analyticsEndpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
const analyticsWebsiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;

if (analyticsEndpoint && analyticsWebsiteId) {
  const script = document.createElement("script");
  script.defer = true;
  script.src = `${analyticsEndpoint}/umami`;
  script.setAttribute("data-website-id", analyticsWebsiteId);
  document.head.appendChild(script);
}

// Load this URL's page chunk first so the prerendered HTML is swapped for the live
// app in one step (no blank flash); then fetch the other pages in the background.
preloadRoute(window.location.pathname)
  .catch(() => {})
  .finally(() => {
    createRoot(document.getElementById("root")!).render(<App />);
    preloadAllRoutes();
  });
