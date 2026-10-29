/**
 * Build-time render entry. Used only by scripts/prerender.mjs to turn each
 * route into static HTML so crawlers, AI assistants and link unfurlers that
 * don't run JavaScript still see real content and per-page meta tags.
 */
import { renderToString } from "react-dom/server";
import App, { preloadRoute } from "./App";

type HelmetData = Record<string, { toString(): string }>;

export async function render(url: string) {
  await preloadRoute(url);
  const helmetContext: { helmet?: HelmetData } = {};
  const html = renderToString(<App ssrPath={url} helmetContext={helmetContext} />);
  const h = helmetContext.helmet;
  const head = h
    ? ["title", "meta", "link", "script"].map(k => h[k]?.toString() ?? "").join("\n")
    : "";
  return { html, head };
}
