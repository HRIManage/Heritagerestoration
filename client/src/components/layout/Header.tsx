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

const LOGO = "/photo/heritage-logo.png";

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setDesktopServicesOpen(false);
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) setDesktopResourcesOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -6, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] as const } },
    exit: { opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.13, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  };

  const serviceItems = [
    { label: "Fire Restoration", sub: "Soot, shoring & full rebuild", href: "/services/fire-restoration" },
    { label: "Water Restoration", sub: "Extraction, dryout & drywall", href: "/services/water-restoration" },
    { label: "Storm Restoration", sub: "Board-up, tarping & framing", href: "/services/storm-recovery" },
    { label: "Contents Services", sub: "Pack-out, clean & storage", href: "/services/contents-services" },
  ];

  const resourceItems = [
    { label: "Our Projects", sub: "Recent restoration case studies", href: "/projects" },
    { label: "FAQ", sub: "Common insurance & process questions", href: "/resources/faq", handler: onFaqClick },
    { label: "Blogs", sub: "Guides & restoration articles", href: "/resources/blog", handler: onBlogsClick },
    { label: "Homeowner Bill of Rights", sub: "Know your rights after a loss", href: "/resources/bill-of-rights", handler: onBillOfRightsClick },
  ];

  const navLinkCls = (href?: string) => {
    const isActive = href ? (href === "/" ? location === "/" : location.startsWith(href)) : false;
    return `px-4 py-2 text-[15px] uppercase font-extrabold transition-colors relative group whitespace-nowrap tracking-[0.08em] flex items-center gap-1.5 ${isActive ? "text-[#8DBD42]" : "text-white/90 hover:text-[#8DBD42]"}`;
  };
  const dropdownPanelCls =
    "absolute top-[calc(100%+14px)] left-0 rounded-2xl bg-white shadow-[0_30px_70px_rgba(0,0,0,0.22)] border border-neutral-200 z-50 origin-top py-2";

  const logoContainerStyle = {
    width: "calc(max(416px, 50% - 224px))",
    clipPath: "polygon(0 0, 100% 0, calc(100% - 48px) 100%, 0 100%)",
  };

  const greenAccentStyle = {
    width: "calc(max(426px, 50% - 214px))",
    clipPath: "polygon(0 0, 100% 0, calc(100% - 48px) 100%, 0 100%)",
  };

  const logoStyle = {
    left: "calc(max(212px, 50% - 428px))",
  };

  const navHeight = scrolled ? "h-[72px]" : "h-[108px]";
  const logoHeight = scrolled ? "h-[58px]" : "h-[94px]";

  const handleResourceClick = (e: React.MouseEvent<HTMLAnchorElement>, item: typeof resourceItems[0]) => {
    if (item.handler) {
      e.preventDefault();
      item.handler();
    }
  };

  return (
    <>
      {/* ── GREEN UTILITY BAR ── */}
      <div className="bg-[#8DBD42] text-white relative z-50">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-wrap items-center justify-between h-11">
          <div className="flex items-center gap-5">
            <a href="tel:+13603451015" className="flex items-center gap-1.5 text-[15.5px] font-bold hover:text-[#3F4143] transition-colors">
              <Phone size={15} /><span>(360) 345-1015</span>
            </a>
            <span className="text-white/30 hidden sm:block">|</span>
            <a href="mailto:office@firewaterstorm.com" className="hidden sm:flex items-center gap-1.5 text-[15.5px] font-bold hover:text-[#3F4143] transition-colors">
              <Mail size={15} /><span>office@firewaterstorm.com</span>
            </a>
            <span className="text-white/30 hidden lg:block">|</span>
            <span className="hidden lg:flex items-center gap-2 text-[15px] font-semibold tracking-[0.06em] text-white/95">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse inline-block" />
              Full Service Restoration – 24/7 Emergency Response
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://www.facebook.com/heritagerestorationinc/" target="_blank" rel="noopener noreferrer" className="hover:text-[#3F4143] transition-colors" aria-label="Facebook"><Facebook size={15} /></a>
            <a href="https://www.instagram.com/heritagerestorationwa/" target="_blank" rel="noopener noreferrer" className="hover:text-[#3F4143] transition-colors" aria-label="Instagram"><Instagram size={15} /></a>
          </div>
        </div>
      </div>

      {/* ── MAIN NAV ── */}
      <nav
        className={`fixed left-0 right-0 z-40 transition-all duration-500 ${scrolled ? "top-0" : "top-[44px]"}`}
        style={{
          boxShadow: scrolled
            ? "0 4px 32px rgba(0,0,0,0.45), 0 1px 0 rgba(141,189,66,0.35)"
            : "0 2px 12px rgba(0,0,0,0.15)",
        }}
      >
        <div
          className={`relative ${navHeight} transition-all duration-500`}
          style={{
            background: scrolled ? "rgba(20,22,23,0.97)" : "rgba(63,65,67,1)",
            backdropFilter: scrolled ? "blur(12px)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
            borderBottom: scrolled ? "1px solid rgba(141,189,66,0.25)" : "1px solid rgba(255,255,255,0.08)",
            transition: "background 0.5s ease, border-color 0.5s ease, height 0.5s ease",
          }}
        >
          <div className="absolute left-0 top-0 bottom-0 bg-[#8DBD42] z-10 transition-all duration-400" style={greenAccentStyle} />
          <div className="absolute left-0 top-0 bottom-0 bg-white z-20 flex items-center transition-all duration-400" style={logoContainerStyle}>
            <Link href="/" className={`absolute ${logoHeight} w-auto flex items-center transition-all duration-400`} style={logoStyle}>
              <img
                src={LOGO}
                alt="Heritage Restoration Logo"
                className="h-full w-auto object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)] hover:scale-102 transition-transform duration-300 filter"
              />
            </Link>
          </div>

          <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-full relative z-30">
            <div className="hidden lg:block w-[410px] flex-shrink-0" />
            <div className="hidden lg:flex items-center gap-1 xl:gap-3 h-full">
              <Link href="/" className={navLinkCls("/")}>
                Home
                <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-[#8DBD42] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center rounded-t" />
              </Link>
              <div
                ref={servicesRef}
                className="relative h-full flex items-center"
                onMouseEnter={() => { setDesktopServicesOpen(true); setDesktopResourcesOpen(false); }}
                onMouseLeave={() => setDesktopServicesOpen(false)}
              >
                <button
                  onClick={() => { setDesktopServicesOpen(v => !v); setDesktopResourcesOpen(false); }}
                  className={navLinkCls("/services")}
                >
                  Services
                  <ChevronDown size={13} className={`transition-transform duration-200 ${desktopServicesOpen ? "rotate-180 text-[#8DBD42]" : ""}`} />
                  <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-[#8DBD42] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center rounded-t" />
                </button>
                <AnimatePresence>
                  {desktopServicesOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden" animate="visible" exit="exit"
                      className={`${dropdownPanelCls} w-[390px]`}
                    >
                      <div className="px-5 pt-2 pb-2 text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#8DBD42] border-b border-neutral-200 mb-1">
                        Service Solutions
                      </div>
                      {serviceItems.map((item) => (
                        <Link key={item.label} href={item.href} onClick={() => setDesktopServicesOpen(false)}
                          className="mx-2 mb-1 rounded-xl border border-transparent px-5 py-4 hover:bg-[#8DBD42]/10 hover:border-[#8DBD42]/30 transition-all duration-200 group flex items-center justify-between gap-3">
                          <span className="text-[#2f3133] font-bold text-base group-hover:text-[#8DBD42] transition-colors">{item.label}</span>
                          <ChevronRight size={15} className="text-[#3F4143]/40 group-hover:text-[#8DBD42] transition-colors flex-shrink-0" />
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div
                ref={resourcesRef}
                className="relative h-full flex items-center"
                onMouseEnter={() => { setDesktopResourcesOpen(true); setDesktopServicesOpen(false); }}
                onMouseLeave={() => setDesktopResourcesOpen(false)}
              >
                <button
                  onClick={() => { setDesktopResourcesOpen(v => !v); setDesktopServicesOpen(false); }}
                  className={navLinkCls("/resources")}
                >
                  Resources
                  <ChevronDown size={13} className={`transition-transform duration-200 ${desktopResourcesOpen ? "rotate-180 text-[#8DBD42]" : ""}`} />
                  <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-[#8DBD42] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center rounded-t" />
                </button>
                <AnimatePresence>
                  {desktopResourcesOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden" animate="visible" exit="exit"
                      className={`${dropdownPanelCls} w-[410px]`}
                    >
                      <div className="px-5 pt-2 pb-2 text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#8DBD42] border-b border-neutral-200 mb-1">
                        Knowledge Center
                      </div>
                      {resourceItems.map((item) => (
                        <Link key={item.label} href={item.href} onClick={(e) => { handleResourceClick(e, item); setDesktopResourcesOpen(false); }}
                          className="mx-2 mb-1 rounded-xl border border-transparent px-5 py-4 hover:bg-[#8DBD42]/10 hover:border-[#8DBD42]/30 transition-all duration-200 group cursor-pointer flex items-center justify-between gap-3">
                          <span className="text-[#2f3133] font-bold text-base group-hover:text-[#8DBD42] transition-colors">{item.label}</span>
                          <ChevronRight size={15} className="text-[#3F4143]/40 group-hover:text-[#8DBD42] transition-colors flex-shrink-0" />
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link href="/contact" className={navLinkCls("/contact")}>
                Contact Us
                <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-[#8DBD42] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center rounded-t" />
              </Link>
            </div>

            <div className="hidden lg:flex items-center ml-auto">
              <a href="tel:+13603451015" className="flex items-center gap-2 bg-[#8DBD42] hover:bg-[#72a232] text-white px-5 py-2.5 rounded-none font-bold text-base transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105">
                <Phone size={16} /> (360) 345-1015
              </a>
            </div>

            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-white hover:text-[#8DBD42]">
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          <AnimatePresence>
            {mobileOpen && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-[#3F4143] border-t border-white/10 overflow-hidden shadow-lg">
                <div className="flex flex-col divide-y divide-white/10 max-h-[70vh] overflow-y-auto">
                  <Link href="/" className="px-6 py-4 text-white font-bold text-base hover:text-[#8DBD42]" onClick={() => setMobileOpen(false)}>Home</Link>
                  <div>
                    <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)} className="w-full text-left px-6 py-4 text-white font-bold text-base flex justify-between items-center">
                      <span>Services</span>
                      <ChevronDown size={16} className={`text-[#8DBD42] transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-[#2f3133] border-t border-white/10">
                          {serviceItems.map((item) => (
                            <Link key={item.label} href={item.href} className="block px-10 py-3.5 text-sm text-white/95 font-bold hover:text-white hover:bg-[#8DBD42]/18 transition-colors" onClick={() => setMobileOpen(false)}>{item.label}</Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div>
                    <button onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)} className="w-full text-left px-6 py-4 text-white font-bold text-base flex justify-between items-center">
                      <span>Resources</span>
                      <ChevronDown size={16} className={`text-[#8DBD42] transition-transform duration-200 ${mobileResourcesOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {mobileResourcesOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-[#2f3133] border-t border-white/10">
                          {resourceItems.map((item) => (
                            <Link key={item.label} href={item.href} className="w-full text-left block px-10 py-3.5 text-sm text-white/95 font-bold hover:text-white hover:bg-[#8DBD42]/18 transition-colors" onClick={(e) => { handleResourceClick(e, item); setMobileOpen(false); }}>{item.label}</Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <Link href="/contact" className="px-6 py-4 text-white font-bold text-base hover:text-[#8DBD42]" onClick={() => setMobileOpen(false)}>Contact Us</Link>
                  <a href="tel:+13603451015" className="m-4 flex items-center justify-center gap-2 bg-[#8DBD42] text-white py-4 font-bold text-base shadow-sm">
                    <Phone size={16} /> (360) 345-1015
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
}
