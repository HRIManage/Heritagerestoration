import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  Facebook,
  Instagram,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation } from "wouter";

// Tightly cropped logo (the original file has ~40% empty padding).
const LOGO = "/photo/heritage-logo-tight.png";

interface HeaderProps {
  onFaqClick?: () => void;
  onBlogsClick?: () => void;
  onBillOfRightsClick?: () => void;
}

export default function Header({
  onFaqClick,
  onBlogsClick,
  onBillOfRightsClick,
}: HeaderProps = {}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const [desktopResourcesOpen, setDesktopResourcesOpen] = useState(false);

  const [location] = useLocation();
  const servicesRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setMobileResourcesOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(e.target as Node)
      )
        setDesktopServicesOpen(false);
      if (
        resourcesRef.current &&
        !resourcesRef.current.contains(e.target as Node)
      )
        setDesktopResourcesOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -6, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
    exit: {
      opacity: 0,
      y: -4,
      scale: 0.98,
      transition: { duration: 0.13, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  const serviceItems = [
    { label: "Fire Restoration", href: "/services/fire-restoration" },
    { label: "Water Restoration", href: "/services/water-restoration" },
    { label: "Storm Restoration", href: "/services/storm-recovery" },
    { label: "Contents Services", href: "/services/contents-services" },
  ];

  const commercialItems = [
    { label: "Commercial Overview", href: "/commercial" },
    { label: "Commercial Fire Restoration", href: "/commercial/fire-restoration" },
    { label: "Commercial Water Restoration", href: "/commercial/water-restoration" },
  ];

  const resourceItems = [
    { label: "Our Projects", href: "/projects" },
    { label: "FAQ", href: "/resources/faq", handler: onFaqClick },
    { label: "Blogs", href: "/resources/blog", handler: onBlogsClick },
    {
      label: "Homeowner Bill of Rights",
      href: "/resources/bill-of-rights",
      handler: onBillOfRightsClick,
    },
  ];

  const navLinkCls = (href?: string) => {
    const isActive = href
      ? href === "/"
        ? location === "/"
        : location.startsWith(href)
      : false;
    return `px-2 xl:px-2.5 2xl:px-3 min-[1900px]:px-4 py-2 text-[13px] xl:text-[14px] 2xl:text-[15px] min-[1900px]:text-[16px] uppercase font-extrabold transition-colors relative group whitespace-nowrap tracking-[0.06em] min-[1900px]:tracking-[0.08em] flex items-center gap-1.5 ${isActive ? "text-[#8DBD42]" : "text-white/90 hover:text-[#8DBD42]"}`;
  };

  const dropdownPanelCls =
    "absolute top-[calc(100%+14px)] left-0 rounded-2xl bg-white shadow-[0_30px_70px_rgba(0,0,0,0.22)] border border-neutral-200 z-50 origin-top py-2";

  // Desktop logo styles (parallelogram design). The panel narrows between
  // 1024px and 1280px so the full menu still fits on small laptops.
  const logoPanel = "max(260px, min(416px, 100% - 864px), 50% - 224px)";
  const logoContainerStyle = {
    width: `calc(${logoPanel})`,
    clipPath: "polygon(0 0, 100% 0, calc(100% - 48px) 100%, 0 100%)",
  };
  const greenAccentStyle = {
    width: `calc(${logoPanel} + 10px)`,
    clipPath: "polygon(0 0, 100% 0, calc(100% - 48px) 100%, 0 100%)",
  };
  // Reserves the logo panel's width (plus a little air) ahead of the link row.
  const navSpacerStyle = { width: `calc(${logoPanel} + 12px)` };

  const navHeight = scrolled ? "h-[64px]" : "h-[88px]";
  const logoHeight = scrolled ? "h-[52px]" : "h-[64px] xl:h-[82px]";

  const handleResourceClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: (typeof resourceItems)[0]
  ) => {
    if (item.handler) {
      e.preventDefault();
      item.handler();
    }
  };

  return (
    <>
      {/* ── GREEN UTILITY BAR ── */}
      <div className="bg-[#173d24] text-white absolute top-0 left-0 right-0 z-50">
        <div className="max-w-[1280px] mx-auto pl-4 pr-0 sm:px-6 flex items-stretch sm:items-center justify-between h-10 sm:h-11">
          {/* Desktop left: phone + email + tagline | Mobile: live tagline */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+13604561886"
              className="hidden sm:flex items-center gap-1.5 text-[15.5px] font-bold hover:text-[#a9d468] transition-colors"
            >
              <Phone size={15} className="text-[#8DBD42]" />
              <span>(360) 456-1886</span>
            </a>
            <span className="text-white/30 hidden sm:block">|</span>
            <a
              href="mailto:office@firewaterstorm.com"
              className="hidden sm:flex items-center gap-1.5 text-[15.5px] font-bold hover:text-[#a9d468] transition-colors"
            >
              <Mail size={15} className="text-[#8DBD42]" />
              <span>office@firewaterstorm.com</span>
            </a>
            <span className="text-white/30 hidden xl:block">|</span>
            <span className="hidden xl:flex items-center gap-2 text-[15px] font-semibold tracking-[0.06em] text-white/95">
              <span className="w-2 h-2 rounded-full bg-[#8DBD42] animate-pulse inline-block" />
              Full Service Restoration – 24/7 Emergency Response
            </span>
            {/* Mobile-only live tagline */}
            <span className="sm:hidden flex items-center gap-2 text-[12px] font-bold tracking-[0.04em] text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8DBD42] animate-pulse inline-block" />
              24/7 Emergency Response
            </span>
          </div>
          {/* Right side: social icons on desktop | red dispatch button on mobile */}
          <div className="flex items-stretch sm:items-center gap-3">
            <a
              href="tel:+13604561886"
              className="sm:hidden relative flex items-center gap-1.5 bg-[#E32B2B] text-white px-4 font-black text-[12px] uppercase tracking-[0.08em] overflow-hidden"
            >
              <span className="absolute inset-0 bg-[#E32B2B] animate-ping opacity-30 pointer-events-none" />
              <Phone size={13} className="relative" />
              <span className="relative">24/7 Dispatch</span>
            </a>
            <a
              href="https://www.facebook.com/heritagerestorationinc/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block hover:text-[#a9d468] transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={15} />
            </a>
            <a
              href="https://www.instagram.com/heritagerestorationwa/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block hover:text-[#a9d468] transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={15} />
            </a>
          </div>
        </div>
      </div>

      {/* ── MOBILE NAV (< lg) ── */}
      <nav
        className={`lg:hidden left-0 right-0 z-40 ${
          scrolled ? "fixed top-0" : "absolute top-10 sm:top-11"
        }`}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {/* Mobile top bar */}
        <div
          className="relative h-[72px] flex items-center justify-between px-4 w-full overflow-hidden"
          style={{
            background: "rgba(255,255,255,1)",
            borderBottom: "2px solid #8DBD42",
            boxShadow: "0 2px 16px rgba(0,0,0,0.10)",
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center h-[56px] flex-shrink-0">
            <img
              src={LOGO}
              alt="Heritage Restoration"
              className="h-full w-auto object-contain max-w-[230px]"
            />
          </Link>

          {/* Right side: Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col justify-center items-center w-11 h-11 gap-[6px] group flex-shrink-0"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block w-6 h-[2.5px] bg-[#3F4143] group-hover:bg-[#8DBD42] transition-colors"
            />
            <motion.span
              animate={
                mobileOpen
                  ? { opacity: 0, scaleX: 0 }
                  : { opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.2 }}
              className="block w-6 h-[2.5px] bg-[#3F4143] group-hover:bg-[#8DBD42] transition-colors"
            />
            <motion.span
              animate={
                mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.25 }}
              className="block w-6 h-[2.5px] bg-[#3F4143] group-hover:bg-[#8DBD42] transition-colors"
            />
          </button>
        </div>

        {/* Mobile slide-down menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#2a2c2e] overflow-y-auto"
              style={{
                maxHeight: "calc(100vh - 100px)",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {/* Nav links */}
              <div className="divide-y divide-white/8">
                <Link
                  href="/"
                  className="flex items-center px-6 py-4 text-white font-bold text-[16px] hover:text-[#8DBD42] hover:bg-white/5 transition-colors active:bg-white/10"
                >
                  Home
                </Link>

                {/* Services accordion */}
                <div>
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="w-full flex items-center justify-between px-6 py-4 text-white font-bold text-[16px] hover:text-[#8DBD42] hover:bg-white/5 transition-colors active:bg-white/10"
                  >
                    <span>Services</span>
                    <motion.span
                      animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={18} className="text-[#8DBD42]" />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden bg-[#222426]"
                      >
                        {serviceItems.map(item => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="flex items-center gap-2 pl-10 pr-6 py-4 text-white/85 font-semibold text-[15px] hover:text-[#8DBD42] hover:bg-white/5 border-l-2 border-transparent hover:border-[#8DBD42] transition-all active:bg-white/10"
                          >
                            <ChevronRight
                              size={14}
                              className="text-[#8DBD42] flex-shrink-0"
                            />
                            {item.label}
                          </Link>
                        ))}
                        <div className="pl-10 pr-6 pt-4 pb-1 text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#8DBD42]">
                          Commercial
                        </div>
                        {commercialItems.map(item => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="flex items-center gap-2 pl-10 pr-6 py-4 text-white/85 font-semibold text-[15px] hover:text-[#8DBD42] hover:bg-white/5 border-l-2 border-transparent hover:border-[#8DBD42] transition-all active:bg-white/10"
                          >
                            <ChevronRight
                              size={14}
                              className="text-[#8DBD42] flex-shrink-0"
                            />
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Resources accordion */}
                <div>
                  <button
                    onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                    className="w-full flex items-center justify-between px-6 py-4 text-white font-bold text-[16px] hover:text-[#8DBD42] hover:bg-white/5 transition-colors active:bg-white/10"
                  >
                    <span>Resources</span>
                    <motion.span
                      animate={{ rotate: mobileResourcesOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={18} className="text-[#8DBD42]" />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {mobileResourcesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden bg-[#222426]"
                      >
                        {resourceItems.map(item => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={e => handleResourceClick(e, item)}
                            className="flex items-center gap-2 pl-10 pr-6 py-4 text-white/85 font-semibold text-[15px] hover:text-[#8DBD42] hover:bg-white/5 border-l-2 border-transparent hover:border-[#8DBD42] transition-all active:bg-white/10"
                          >
                            <ChevronRight
                              size={14}
                              className="text-[#8DBD42] flex-shrink-0"
                            />
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  href="/service-areas"
                  className="flex items-center px-6 py-4 text-white font-bold text-[16px] hover:text-[#8DBD42] hover:bg-white/5 transition-colors active:bg-white/10"
                >
                  Service Areas
                </Link>

                <Link
                  href="/contact"
                  className="flex items-center px-6 py-4 text-white font-bold text-[16px] hover:text-[#8DBD42] hover:bg-white/5 transition-colors active:bg-white/10"
                >
                  Contact Us
                </Link>
              </div>

              {/* CTA at bottom of menu */}
              <div className="p-4 grid grid-cols-2 gap-3 border-t border-white/10">
                <a
                  href="tel:+13604561886"
                  className="flex items-center justify-center gap-2 bg-[#8DBD42] text-white py-3.5 font-black text-[13px] uppercase tracking-wider"
                >
                  <Phone size={14} /> Call Now
                </a>
                <a
                  href="mailto:office@firewaterstorm.com"
                  className="flex items-center justify-center gap-2 border-2 border-white/30 text-white py-3.5 font-black text-[13px] uppercase tracking-wider hover:border-[#8DBD42] hover:text-[#8DBD42] transition-colors"
                >
                  <Mail size={14} /> Email Us
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── DESKTOP NAV (lg+) ── */}
      <nav
        className={`hidden lg:block left-0 right-0 z-40 overflow-x-clip ${
          scrolled ? "fixed top-0" : "absolute top-11"
        }`}
        style={{
          boxShadow: scrolled
            ? "0 4px 32px rgba(0,0,0,0.45), 0 1px 0 rgba(141,189,66,0.35)"
            : "0 2px 12px rgba(0,0,0,0.15)",
        }}
      >
        <div
          className={`relative ${navHeight} transition-all duration-500`}
          style={{
            background: scrolled ? "rgba(16,20,18,0.97)" : "rgba(38,42,40,1)",
            backdropFilter: scrolled ? "blur(12px)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
            borderBottom: scrolled
              ? "1px solid rgba(141,189,66,0.25)"
              : "1px solid rgba(255,255,255,0.08)",
            transition:
              "background 0.5s ease, border-color 0.5s ease, height 0.5s ease",
          }}
        >
          <div
            className="absolute left-0 top-0 bottom-0 bg-[#8DBD42] z-10 transition-all duration-400"
            style={greenAccentStyle}
          />
          <div
            className="absolute left-0 top-0 bottom-0 bg-white z-20 flex items-center transition-all duration-400"
            style={logoContainerStyle}
          >
            <Link
              href="/"
              className={`absolute ${logoHeight} w-auto flex items-center transition-all duration-400 left-[calc(100%_-_258px)] xl:left-[min(212px,calc(100%_-_325px))]`}
            >
              <img
                src={LOGO}
                alt="Heritage Restoration Logo"
                className="h-full w-auto object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)] hover:scale-102 transition-transform duration-300"
              />
            </Link>
          </div>

          <div className="pr-6 flex items-center justify-between h-full relative z-30 pointer-events-none">
            <div className="flex-shrink-0" style={navSpacerStyle} />
            <div className="flex items-center gap-1 min-[1900px]:gap-3 h-full pointer-events-auto">
              <Link href="/" className={navLinkCls("/")}>
                Home
                <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-[#8DBD42] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center rounded-t" />
              </Link>

              {/* Services dropdown */}
              <div
                ref={servicesRef}
                className="relative h-full flex items-center"
                onMouseEnter={() => {
                  setDesktopServicesOpen(true);
                  setDesktopResourcesOpen(false);
                }}
                onMouseLeave={() => setDesktopServicesOpen(false)}
              >
                <button
                  onClick={() => {
                    setDesktopServicesOpen(v => !v);
                    setDesktopResourcesOpen(false);
                  }}
                  className={navLinkCls(location.startsWith("/commercial") ? "/commercial" : "/services")}
                >
                  Services
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${desktopServicesOpen ? "rotate-180 text-[#8DBD42]" : ""}`}
                  />
                  <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-[#8DBD42] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center rounded-t" />
                </button>
                <AnimatePresence>
                  {desktopServicesOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className={`${dropdownPanelCls} w-[340px]`}
                    >
                      <div className="px-5 pt-2 pb-2 text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#8DBD42] border-b border-neutral-200 mb-1">
                        Residential &amp; Commercial
                      </div>
                      {serviceItems.map(item => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setDesktopServicesOpen(false)}
                          className="mx-2 mb-1 rounded-xl border border-transparent px-5 py-4 hover:bg-[#8DBD42]/10 hover:border-[#8DBD42]/30 transition-all duration-200 group flex items-center justify-between gap-3"
                        >
                          <span className="text-[#2f3133] font-bold text-base group-hover:text-[#8DBD42] transition-colors">
                            {item.label}
                          </span>
                          <ChevronRight
                            size={15}
                            className="text-[#3F4143]/40 group-hover:text-[#8DBD42] transition-colors flex-shrink-0"
                          />
                        </Link>
                      ))}
                      <div className="px-5 pt-3 pb-2 text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#8DBD42] border-y border-neutral-200 mt-1 mb-1">
                        Commercial Properties
                      </div>
                      {commercialItems.map(item => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setDesktopServicesOpen(false)}
                          className="mx-2 mb-1 rounded-xl border border-transparent px-5 py-3 hover:bg-[#8DBD42]/10 hover:border-[#8DBD42]/30 transition-all duration-200 group flex items-center justify-between gap-3"
                        >
                          <span className="text-[#2f3133] font-bold text-base group-hover:text-[#8DBD42] transition-colors">
                            {item.label}
                          </span>
                          <ChevronRight
                            size={15}
                            className="text-[#3F4143]/40 group-hover:text-[#8DBD42] transition-colors flex-shrink-0"
                          />
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Resources dropdown */}
              <div
                ref={resourcesRef}
                className="relative h-full flex items-center"
                onMouseEnter={() => {
                  setDesktopResourcesOpen(true);
                  setDesktopServicesOpen(false);
                }}
                onMouseLeave={() => setDesktopResourcesOpen(false)}
              >
                <button
                  onClick={() => {
                    setDesktopResourcesOpen(v => !v);
                    setDesktopServicesOpen(false);
                  }}
                  className={navLinkCls("/resources")}
                >
                  Resources
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${desktopResourcesOpen ? "rotate-180 text-[#8DBD42]" : ""}`}
                  />
                  <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-[#8DBD42] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center rounded-t" />
                </button>
                <AnimatePresence>
                  {desktopResourcesOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className={`${dropdownPanelCls} w-[360px]`}
                    >
                      <div className="px-5 pt-2 pb-2 text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#8DBD42] border-b border-neutral-200 mb-1">
                        Knowledge Center
                      </div>
                      {resourceItems.map(item => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={e => {
                            handleResourceClick(e, item);
                            setDesktopResourcesOpen(false);
                          }}
                          className="mx-2 mb-1 rounded-xl border border-transparent px-5 py-4 hover:bg-[#8DBD42]/10 hover:border-[#8DBD42]/30 transition-all duration-200 group cursor-pointer flex items-center justify-between gap-3"
                        >
                          <span className="text-[#2f3133] font-bold text-base group-hover:text-[#8DBD42] transition-colors">
                            {item.label}
                          </span>
                          <ChevronRight
                            size={15}
                            className="text-[#3F4143]/40 group-hover:text-[#8DBD42] transition-colors flex-shrink-0"
                          />
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/service-areas"
                className={navLinkCls("/service-area")}
              >
                Service Areas
                <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-[#8DBD42] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center rounded-t" />
              </Link>

              <Link href="/contact" className={navLinkCls("/contact")}>
                Contact Us
                <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-[#8DBD42] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center rounded-t" />
              </Link>
            </div>

            <div className="relative flex items-center ml-2 xl:ml-4 flex-shrink-0 pointer-events-auto">
              <span className="absolute inset-0 bg-[#E32B2B] animate-ping opacity-25 pointer-events-none" />
              <a
                href="tel:+13604561886"
                className="relative bg-[#E32B2B] hover:bg-[#c42424] text-white inline-flex items-center gap-2 px-3 xl:px-4 2xl:px-5 py-2.5 uppercase tracking-[0.1em] text-xs xl:text-[13px] 2xl:text-[15px] font-bold shadow-lg hover:scale-105 hover:shadow-[0_4px_20px_rgba(227,43,43,0.5)] transition-all duration-200 whitespace-nowrap"
              >
                <Phone size={14} />
                24/7 Dispatch
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
