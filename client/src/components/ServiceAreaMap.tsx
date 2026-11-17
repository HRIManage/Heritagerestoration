import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { CityLocation } from "@/data/locations";

/**
 * Google map of the service area with a pin that drops on the active city.
 *
 * No Maps API key is available, so this uses the standard Google Maps embed
 * at a fixed centre and zoom and draws the pins on top. Pin positions use the
 * same Web Mercator maths as Google's tiles, so they land on the real city.
 * The embed is locked (no drag or scroll zoom) to keep the pins aligned.
 * "Open in Google Maps" opens the full map for anyone who wants to explore.
 */
const TILE = 256;
const mx = (lng: number) => (lng + 180) / 360;
const my = (lat: number) => {
  const s = Math.sin((lat * Math.PI) / 180);
  return 0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI);
};
const unMy = (y: number) => (360 / Math.PI) * Math.atan(Math.exp((0.5 - y) * 2 * Math.PI)) - 90;

export default function ServiceAreaMap({
  cities,
  activeSlug,
  offices,
}: {
  cities: CityLocation[];
  activeSlug: string | null;
  /** slugs drawn as office markers */
  offices: string[];
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const update = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // centre on the cities and pick the largest zoom that still shows them all
  const view = useMemo(() => {
    const xs = cities.map(c => mx(c.lng));
    const ys = cities.map(c => my(c.lat));
    const x0 = Math.min(...xs), x1 = Math.max(...xs);
    const y0 = Math.min(...ys), y1 = Math.max(...ys);
    const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    let zoom = 8;
    if (size.w && size.h) {
      for (let z = 11; z >= 6; z--) {
        const world = TILE * 2 ** z;
        if ((x1 - x0) * world <= size.w - 70 && (y1 - y0) * world <= size.h - 120) {
          zoom = z;
          break;
        }
      }
    }
    return { cx, cy, zoom, lat: unMy(cy), lng: cx * 360 - 180 };
  }, [cities, size.w, size.h]);

  const point = (c: CityLocation) => {
    const world = TILE * 2 ** view.zoom;
    return {
      x: size.w / 2 + (mx(c.lng) - view.cx) * world,
      y: size.h / 2 + (my(c.lat) - view.cy) * world,
    };
  };

  const active = cities.find(c => c.slug === activeSlug) ?? null;
  const src = `https://www.google.com/maps?ll=${view.lat.toFixed(5)},${view.lng.toFixed(5)}&z=${view.zoom}&output=embed`;
  const openHref = active
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(active.full)}`
    : `https://www.google.com/maps/@${view.lat.toFixed(4)},${view.lng.toFixed(4)},${view.zoom}z`;

  return (
    <div ref={boxRef} className="relative h-full w-full overflow-hidden bg-[#E9EEE6]">
      {size.w > 0 && (
        <iframe
          key={view.zoom}
          title="Google map of the Heritage Restoration service area"
          src={src}
          className="pointer-events-none absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          tabIndex={-1}
        />
      )}

      {size.w > 0 && (
        <div className="pointer-events-none absolute inset-0">
          {/* every city: small dot; offices: small dark square */}
          {cities.map(c => {
            const { x, y } = point(c);
            const isOffice = offices.includes(c.slug);
            return (
              <span
                key={c.slug}
                className={`absolute -translate-x-1/2 -translate-y-1/2 ${
                  isOffice
                    ? "h-3 w-3 bg-[#173d24] ring-2 ring-white"
                    : "h-2.5 w-2.5 rounded-full bg-[#44781a] ring-2 ring-white"
                } ${c.slug === activeSlug ? "opacity-0" : "opacity-90"}`}
                style={{ left: x, top: y }}
              />
            );
          })}

          {/* the dropped pin */}
          <AnimatePresence>
            {active && (() => {
              const { x, y } = point(active);
              return (
                <div key={active.slug} className="absolute" style={{ left: x, top: y }}>
                  {/* ground shadow */}
                  <motion.span
                    className="absolute left-0 top-0 h-2 w-5 -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-black/30 blur-[1px]"
                    initial={reduce ? false : { scale: 0.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.12 } }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 flex -translate-x-1/2 flex-col items-center"
                    initial={reduce ? false : { y: -46, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ opacity: 0, y: -8, transition: { duration: 0.12 } }}
                    transition={{ type: "spring", stiffness: 520, damping: 22, mass: 0.7 }}
                  >
                    <span className="mb-1.5 whitespace-nowrap bg-[#173d24] px-2.5 py-1 text-[12.5px] font-bold text-white shadow-[0_6px_16px_rgba(23,61,36,0.25)]">
                      {active.name}
                    </span>
                    <svg width="30" height="40" viewBox="0 0 30 40" aria-hidden="true" className="drop-shadow-[0_3px_4px_rgba(0,0,0,0.25)]">
                      <path d="M15 39C15 39 28 23.6 28 14A13 13 0 0 0 2 14c0 9.6 13 25 13 25Z" fill="#8DBD42" stroke="#173d24" strokeWidth="2" />
                      <circle cx="15" cy="14" r="5" fill="#173d24" />
                    </svg>
                  </motion.div>
                </div>
              );
            })()}
          </AnimatePresence>
        </div>
      )}

      {/* The embed is locked, so its own "Open in Maps" card can't be clicked.
          This invisible link sits over that card and opens Google Maps instead. */}
      <a
        href={openHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={active ? `Open ${active.full} in Google Maps` : "Open the service area in Google Maps"}
        className="absolute left-0 top-0 z-10 h-[52px] w-[150px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#173d24]"
      />
    </div>
  );
}
