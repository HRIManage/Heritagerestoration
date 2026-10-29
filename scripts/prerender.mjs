/**
 * Build-time prerender (runs after `vite build`).
 *
 * 1. Builds client/src/entry-server.tsx for Node.
 * 2. Renders every route listed in dist/public/sitemap.xml (plus "/").
 * 3. Writes static HTML per route: "/" -> index.html, "/a/b" -> a/b.html
 *    (served at /a/b via `cleanUrls` in vercel.json).
 * 4. Keeps the untouched SPA shell as spa.html — the rewrite target for any
 *    URL that has no prerendered file.
 *
 * The browser still mounts the normal client app over this HTML, so visitors
 * see no difference; crawlers get real content, titles and JSON-LD.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "vite";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "dist", "public");
const SSR_OUT = path.join(ROOT, "dist", "server");

const template = fs.readFileSync(path.join(OUT, "index.html"), "utf-8");
fs.writeFileSync(path.join(OUT, "spa.html"), template);

await build({
  configFile: path.join(ROOT, "vite.config.ts"),
  logLevel: "warn",
  build: {
    ssr: "src/entry-server.tsx",
    outDir: SSR_OUT,
    emptyOutDir: true,
    copyPublicDir: false,
  },
  ssr: { noExternal: ["wouter", "react-helmet-async"] },
});

const { render } = await import(
  pathToFileURL(path.join(SSR_OUT, "entry-server.js")).href
);

const sitemap = fs.readFileSync(path.join(OUT, "sitemap.xml"), "utf-8");
const routes = [
  "/",
  ...[...sitemap.matchAll(/<loc>\s*https?:\/\/[^/<\s]+(\/[^<\s]*)\s*<\/loc>/g)]
    .map(m => m[1].replace(/\/$/, ""))
    .filter(r => r && !/\.[a-z0-9]+$/i.test(r) && !r.startsWith("/google") && r !== "/spa"),
];

let ok = 0;
const failed = [];
for (const route of [...new Set(routes)]) {
  try {
    const { html, head } = await render(route);
    const page = template
      .replace("</head>", `${head}\n  </head>`)
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
    if (!page.includes(html.slice(0, 40))) throw new Error("root div not found");
    const file =
      route === "/" ? path.join(OUT, "index.html") : path.join(OUT, `${route.slice(1)}.html`);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, page);
    ok++;
  } catch (err) {
    failed.push(`${route}: ${err?.message ?? err}`);
  }
}

fs.rmSync(SSR_OUT, { recursive: true, force: true });
console.log(`prerender: ${ok} routes written`);
if (failed.length) {
  // A failed route still works as a normal client-rendered page via spa.html.
  console.warn(`prerender: ${failed.length} route(s) fell back to SPA:\n  ${failed.join("\n  ")}`);
}
