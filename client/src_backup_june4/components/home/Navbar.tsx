import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "Our Process", href: "#process" },
  { label: "Before & After", href: "#before-after" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const headerRef = useRef<HTMLElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  /* ── Scroll handling: threshold 50px ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Close mobile menu on desktop resize ── */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ── GSAP entrance animation on mount ── */
  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(
      headerRef.current,
      { y: -120, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, ease: "power3.out", delay: 0.1 }
    );
  }, []);

  /* ── GSAP green underline animations for compact navbar ── */
  const handleEnter = (idx: number) => {
    const el = lineRefs.current[idx];
    if (!el) return;
    gsap.fromTo(
      el,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.22, ease: "power2.out" }
    );
  };

  const handleLeave = (idx: number, label: string) => {
    if (label === active) return;
    const el = lineRefs.current[idx];
    if (!el) return;
    gsap.to(el, {
      scaleX: 0,
      transformOrigin: "right center",
      duration: 0.18,
      ease: "power2.in",
    });
  };

  return (
    <>
      <header
        ref={headerRef}
        style={{
          opacity: 0,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
        }}
        className="w-full"
      >
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            DESKTOP HEADER (width >= 1024px)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="hidden lg:block w-full">
          {/* ── 1. TWO-TIER NAVBAR (Not Scrolled) ── */}
          <div
            className="transition-all duration-300 origin-top overflow-hidden"
            style={{
              height: scrolled ? 0 : 188, // 140px top tier + 48px bottom tier
              opacity: scrolled ? 0 : 1,
              pointerEvents: scrolled ? "none" : "auto",
            }}
          >
            {/* Top Tier (White Background, Height 140px) */}
            <div
              style={{
                backgroundColor: "#ffffff",
                height: 140,
                borderBottom: "1px solid var(--color-brand-stone)",
              }}
            >
              <div
                className="page-container"
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {/* Logo Area (Upscaled by an additional 30% to Height 113px inside 140px container) */}
                <a
                  href="#hero"
                  onClick={() => setActive("Home")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src="/photo/heritage-logo.png"
                    alt="Heritage Restoration"
                    width={520}
                    height={113}
                    style={{ height: 113, width: "auto" }}
                  />
                </a>

                {/* Center Slanted Green Band (custom asymmetry slanting forward /) */}
                <div
                  style={{
                    flex: "1 1 auto",
                    height: "100%",
                    backgroundColor: "var(--color-brand-green)",
                    clipPath:
                      "polygon(40px 0, 100% 0, calc(100% - 40px) 100%, 0 100%)",
                    margin: "0 3rem",
                  }}
                />

                {/* Right Call Contact Area */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <a
                    href="tel:3604561015"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      textDecoration: "none",
                    }}
                    className="group"
                  >
                    {/* Circle Green Phone Icon with White Gap Ring */}
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        border: "2px solid var(--color-brand-green)",
                        padding: "3px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.3s ease",
                      }}
                      className="group-hover:scale-105"
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          backgroundColor: "var(--color-brand-green)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#ffffff",
                        }}
                      >
                        <svg
                          style={{ width: 14, height: 14 }}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.3 1L6.6 10.8z" />
                        </svg>
                      </div>
                    </div>
                    {/* Phone Text */}
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 700,
                        fontSize: 18,
                        color: "var(--color-brand-charcoal)",
                        transition: "color 0.2s ease",
                      }}
                      className="group-hover:text-brand-green"
                    >
                      (360) 456-1015
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Tier (Linen Background, Height 48px) */}
            <div
              style={{
                backgroundColor: "var(--color-brand-linen)",
                height: 48,
                borderBottom: "1px solid var(--color-brand-stone)",
              }}
            >
              <div
                className="page-container"
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {/* Navigation Links */}
                <nav
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    gap: "4px",
                  }}
                >
                  {navLinks.map(link => {
                    const isActive = active === link.label;
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={() => setActive(link.label)}
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          padding: "0 20px",
                          height: "100%",
                          fontFamily: "var(--font-sans)",
                          fontSize: 13,
                          fontWeight: isActive ? 600 : 500,
                          letterSpacing: "var(--tracking-nav)",
                          color: "var(--color-brand-charcoal)",
                          textDecoration: "none",
                          transition: "color 0.2s ease",
                        }}
                        className="hover:text-brand-green transition-colors"
                      >
                        {link.label}
                        {/* Active Indicator: sharp 4px x 4px green square directly below */}
                        {isActive && (
                          <span
                            style={{
                              position: "absolute",
                              bottom: "6px",
                              left: "50%",
                              transform: "translateX(-50%)",
                              width: "4px",
                              height: "4px",
                              backgroundColor: "var(--color-brand-green)",
                            }}
                          />
                        )}
                      </a>
                    );
                  })}
                </nav>

                {/* Right Side Info & Badges */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.5rem",
                  }}
                >
                  {/* Search Icon */}
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--color-brand-charcoal)",
                      padding: 4,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "color 0.2s ease",
                    }}
                    className="hover:text-brand-green"
                    aria-label="Search"
                  >
                    <svg
                      style={{ width: 16, height: 16 }}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>

                  {/* 24/7 Availability Pill (Zero Border Radius) */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      backgroundColor: "rgba(141, 189, 66, 0.1)",
                      padding: "4px 12px",
                      borderRadius: 0, // strict 0px border radius
                      color: "var(--color-brand-green)",
                      fontFamily: "var(--font-sans)",
                      fontWeight: 700,
                      fontSize: 11,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: 0, // strict 0px border radius
                        backgroundColor: "var(--color-brand-green)",
                      }}
                      className="animate-pulse"
                    />
                    Available 24/7
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 2. COMPACT STICKY NAVBAR (Scrolled, Height 116px) ── */}
          <div
            className="transition-all duration-300 overflow-hidden"
            style={{
              height: scrolled ? 116 : 0,
              opacity: scrolled ? 1 : 0,
              pointerEvents: scrolled ? "auto" : "none",
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              borderBottom: "1px solid var(--color-brand-stone)",
            }}
          >
            <div
              className="page-container"
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* Logo (Upscaled by an additional 30% to Height 90px inside 116px container) */}
              <a
                href="#hero"
                onClick={() => setActive("Home")}
                style={{ flexShrink: 0 }}
              >
                <img
                  src="/photo/heritage-logo.png"
                  alt="Heritage Restoration"
                  width={426}
                  height={90}
                  style={{ height: 90, width: "auto" }}
                />
              </a>

              {/* Navigation links with GSAP line indicator (Zero border radius) */}
              <nav
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                {navLinks.map((link, idx) => {
                  const isActive = active === link.label;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setActive(link.label)}
                      onMouseEnter={() => handleEnter(idx)}
                      onMouseLeave={() => handleLeave(idx, link.label)}
                      style={{
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0 18px",
                        height: 116,
                        fontFamily: "var(--font-sans)",
                        fontSize: 14,
                        fontWeight: 500,
                        letterSpacing: "0.04em",
                        color: isActive
                          ? "var(--color-brand-green)"
                          : "var(--color-brand-charcoal)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                    >
                      {link.label}
                      {/* Green underline indicator (Zero border radius) */}
                      <span
                        ref={el => {
                          lineRefs.current[idx] = el;
                        }}
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 18,
                          right: 18,
                          height: 3,
                          backgroundColor: "var(--color-brand-green)",
                          borderRadius: 0, // strict 0px border radius
                          transformOrigin: "left center",
                          transform: isActive ? "scaleX(1)" : "scaleX(0)",
                        }}
                      />
                    </a>
                  );
                })}
              </nav>

              {/* Quick Contact CTA Button - Primary Button Style: Charcoal background, linen text, hover green, 0px radius */}
              <a
                href="tel:3604561015"
                style={{ borderRadius: 0 }}
                className="inline-flex items-center justify-center gap-8 bg-brand-charcoal text-brand-linen font-sans font-semibold text-xs tracking-widest uppercase px-8 py-4 transition-all duration-300 hover:bg-brand-green hover:text-brand-linen"
              >
                <svg
                  style={{ width: 13, height: 13 }}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.3 1L6.6 10.8z" />
                </svg>
                Call 24/7
              </a>
            </div>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            MOBILE/TABLET HEADER (width < 1024px, Height 110px)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div
          className="lg:hidden w-full bg-white shadow-sm"
          style={{
            height: 110,
            borderBottom: "1px solid var(--color-brand-stone)",
          }}
        >
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 1.25rem",
            }}
          >
            {/* Mobile Logo (Upscaled by an additional 30% to Height 81px inside 110px container) */}
            <a
              href="#hero"
              onClick={() => {
                setMobileOpen(false);
                setActive("Home");
              }}
            >
              <img
                src="/photo/heritage-logo.png"
                alt="Heritage Restoration"
                width={378}
                height={81}
                style={{ height: 81, width: "auto" }}
              />
            </a>

            {/* Right: Phone link & Hamburger (Zero border radius) */}
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              <a
                href="tel:3604561015"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 0, // strict 0px border radius
                  backgroundColor: "var(--color-brand-green)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                }}
                aria-label="Call 24/7 Line"
              >
                <svg
                  style={{ width: 16, height: 16 }}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.3 1L6.6 10.8z" />
                </svg>
              </a>

              <button
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                  padding: 8,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                <span
                  style={{
                    display: "block",
                    width: 22,
                    height: 2,
                    backgroundColor: "var(--color-brand-charcoal)",
                    transition: "all 0.3s",
                    transform: mobileOpen
                      ? "rotate(45deg) translateY(7px)"
                      : "none",
                  }}
                />
                <span
                  style={{
                    display: "block",
                    width: 22,
                    height: 2,
                    backgroundColor: "var(--color-brand-charcoal)",
                    transition: "all 0.3s",
                    opacity: mobileOpen ? 0 : 1,
                  }}
                />
                <span
                  style={{
                    display: "block",
                    width: 22,
                    height: 2,
                    backgroundColor: "var(--color-brand-charcoal)",
                    transition: "all 0.3s",
                    transform: mobileOpen
                      ? "rotate(-45deg) translateY(-7px)"
                      : "none",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ━━━━ MOBILE MENU OVERLAY (Zero border radius) ━━━━ */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          backgroundColor: "var(--color-brand-linen)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.75rem",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      >
        {/* Small top accent strip */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            backgroundColor: "var(--color-brand-green)",
          }}
        />

        {/* Scaled logo for overlay (Upscaled by an additional 30% to Height 81px) */}
        <img
          src="/photo/heritage-logo.png"
          alt="Heritage Restoration"
          width={378}
          height={81}
          style={{ height: 81, width: "auto", marginBottom: "1rem" }}
        />

        {navLinks.map(link => {
          const isActive = active === link.label;
          return (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                setMobileOpen(false);
                setActive(link.label);
              }}
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "2.2rem",
                fontWeight: 600,
                color: isActive
                  ? "var(--color-brand-green)"
                  : "var(--color-brand-charcoal)",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              className="hover:text-brand-green"
            >
              {link.label}
            </a>
          );
        })}

        <a
          href="tel:3604561015"
          style={{
            marginTop: "0.5rem",
            backgroundColor: "var(--color-brand-charcoal)",
            color: "var(--color-brand-linen)",
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: "var(--tracking-widest)",
            textTransform: "uppercase",
            padding: "14px 32px",
            borderRadius: 0, // strict 0px border radius
            textDecoration: "none",
            transition: "all 0.3s ease",
          }}
          className="hover:bg-brand-green hover:text-brand-linen"
        >
          Call 24/7: (360) 456-1015
        </a>
      </div>
    </>
  );
}
