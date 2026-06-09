/**
 * Heritage Restoration – Home Page
 * Design: Replicates Golden Coast Construction layout structure
 * Brand: Heritage Restoration (#3F4143 charcoal, #8DBD42 green, #F7F4EE cream)
 * Fonts: Libre Caslon Text (headlines), Hanken Grotesk (body/UI)
 */

import { useState, useEffect, useRef } from "react";
import {
  Phone,
  Mail,
  Facebook,
  Instagram,
  Menu,
  X,
  ChevronRight,
  Flame,
  Droplets,
  CloudLightning,
  Star,
  MapPin,
  Clock,
  Shield,
  Award,
  ChevronLeft,
  Package,
} from "lucide-react";
import { motion, useInView } from "framer-motion";

const LOGO = "/photo/heritage-logo.png";
const WARRANTY_BADGE = "/photo/warranty-badge.png";
const IICRC_BADGE = "/photo/iicrc-badge.jpg";
const EMERGENCY_BADGE = "/photo/emergency-badge.png";
const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663048265841/NjuDcGEjeGptqg9uPG6tvu/hero-main-itAXBfnnhiqivQvkEVuTqG.webp";
const FIRE_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663048265841/NjuDcGEjeGptqg9uPG6tvu/fire-damage-MB7SuyyJBjZ4DMkq5rNcEA.webp";
const RESTORED_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663048265841/NjuDcGEjeGptqg9uPG6tvu/restored-home-T4EdSYg6RwkifsbTg2ssK6.webp";
const WATER_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663048265841/NjuDcGEjeGptqg9uPG6tvu/water-damage-btXqdVXm2yBfi7fZGXRfaS.webp";

const testimonials = [
  {
    quote:
      "I want you to know how impressed my wife and I are for you, your company and its employees. From the start, you worked to make the process as easy and painless as possible. The restoration turned out much nicer than we'd expected.",
    author: "D. Butler",
    role: "Residential Client",
  },
  {
    quote:
      "I would like to sincerely thank Heritage Restoration and their entire crew for the professional handling of the refurbishing of our home following a small fire in our master bath. Their work was first rate and I am very impressed!",
    author: "Linda H.",
    role: "Residential Client",
  },
  {
    quote:
      "Heritage was on scene within 45 minutes. The end result was a beautiful home better than before the fire. Heritage Management guided me through the claim process, not the insurance company. Heritage Restoration has my highest recommendation.",
    author: "Skip & Alpha Beard",
    role: "Dupont, WA",
  },
];

const services = [
  {
    num: "01",
    icon: <Flame size={28} />,
    title: "Fire Restoration",
    image: "/photo/Fisher after.jpg",
    tag: "Structure & Smoke",
    desc: "We secure your structure within 45 minutes, manage soot containment, document everything in 3D, and fully rebuild your property.",
    highlights: [
      "Emergency Board-Up & Shoring",
      "Matterport 3D Insurance Scans",
      "Xactimate Estimate Negotiation",
      "Structural Framing & Rebuild",
    ],
  },
  {
    num: "02",
    icon: <Droplets size={28} />,
    title: "Water Restoration",
    image: "/photo/20210520_113125.jpg",
    tag: "Extraction & Dryout",
    desc: "Immediate water extraction, LGR dehumidification, and thermal moisture mapping to dry your property and prevent mold growth.",
    highlights: [
      "24/7 Water Extraction",
      "Thermal Moisture Mapping",
      "Industrial Dehumidification",
      "Hardwood Floor & Drywall Rebuild",
    ],
  },
  {
    num: "03",
    icon: <CloudLightning size={28} />,
    title: "Storm Recovery",
    image: "/photo/20240403_095638.webp",
    tag: "Board-Up & Rebuild",
    desc: "Emergency roof tarping, tree removal, window board-ups, and complete structural reconstruction to code after wind or storm damage.",
    highlights: [
      "Emergency Roof Tarping",
      "Fallen Tree & Debris Cleanup",
      "Window & Door Board-Ups",
      "Siding, Trim & Roofing Repair",
    ],
  },
  {
    num: "04",
    icon: <Package size={28} />,
    title: "Contents Services",
    image: "/photo/Monnett Fire After.jpg",
    tag: "Pack-Out & Storage",
    desc: "Digital inventory tagging, climate-controlled vault storage, and specialized cleaning to restore your valuable personal belongings.",
    highlights: [
      "Digital Barcode Tracking",
      "Condition Intake Photos",
      "Soot & Odor Sanitization",
      "Secure Vault Storage",
    ],
  },
];

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [beforeAfter, setBeforeAfter] = useState(50);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
    >
      {/* ── TOP UTILITY BAR ── */}
      <div className="bg-[#3F4143] text-white text-xs py-2 px-4">
        <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-5 flex-wrap">
            <a
              href="tel:3604561886"
              className="flex items-center gap-1.5 hover:text-[#8DBD42] transition-colors"
            >
              <Phone size={12} />
              <span>(360) 456-1886</span>
            </a>
            <a
              href="mailto:office@firewaterstorm.com"
              className="flex items-center gap-1.5 hover:text-[#8DBD42] transition-colors"
            >
              <Mail size={12} />
              <span>office@firewaterstorm.com</span>
            </a>
            <span className="hidden sm:inline text-white/50">|</span>
            <span className="hidden sm:inline text-white/70">
              Full Service Restoration – 24/7 Emergency Response
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/heritagerestorationinc/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#8DBD42] transition-colors"
            >
              <Facebook size={13} />
            </a>
            <a
              href="https://www.instagram.com/heritagerestorationwa/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#8DBD42] transition-colors"
            >
              <Instagram size={13} />
            </a>
          </div>
        </div>
      </div>

      {/* ── MAIN NAV — Golden Coast style ── */}
      <nav
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-lg" : "shadow-sm"}`}
      >
        <div className="flex items-stretch h-[98px] overflow-hidden">
          {/* Logo area — white background */}
          <a
            href="#"
            className="flex items-center pl-5 pr-8 flex-shrink-0 z-10"
          >
            <img
              src={LOGO}
              alt="Heritage Restoration"
              className="h-[84px] w-auto object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.12)]"
            />
          </a>

          {/* Dark diagonal band with nav links — desktop only */}
          <div
            className="hidden md:flex items-center flex-1 relative"
            style={{
              background: "#3F4143",
              clipPath: "polygon(28px 0%, 100% 0%, 100% 100%, 0% 100%)",
              marginLeft: "-16px",
            }}
          >
            <div className="flex items-center gap-2 pl-12">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-5 py-2 text-sm font-semibold text-white/90 hover:text-[#8DBD42] transition-colors relative group whitespace-nowrap"
                  style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                >
                  {link.label}
                  <span className="absolute bottom-1 left-5 right-5 h-0.5 bg-[#8DBD42] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
                </a>
              ))}
            </div>

            {/* Phone CTA inside the dark band, right side */}
            <div className="ml-auto pr-6">
              <a
                href="tel:3604561886"
                className="flex items-center gap-2 bg-[#8DBD42] text-white px-6 py-3 rounded font-bold text-sm hover:bg-[#7aab30] transition-colors whitespace-nowrap"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              >
                <Phone size={14} />
                (360) 456-1886
              </a>
            </div>
          </div>

          {/* Mobile: right side hamburger */}
          <div className="md:hidden ml-auto flex items-center pr-4">
            <button
              className="p-2 text-[#3F4143]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#3F4143] border-t border-white/10 px-4 py-4 flex flex-col gap-1">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="py-2.5 px-3 text-white font-medium hover:text-[#8DBD42] hover:bg-white/5 rounded transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:3604561886"
              className="mt-3 flex items-center justify-center gap-2 bg-[#8DBD42] text-white px-4 py-3 rounded font-semibold"
            >
              <Phone size={15} /> (360) 456-1886
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO SECTION ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "520px" }}
      >
        <img
          src={HERO_IMG}
          alt="Heritage Restoration crew at work"
          className="w-full h-full object-cover object-center"
          style={{ transform: "scale(1.05)", transformOrigin: "left center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3F4143]/70 via-[#3F4143]/30 to-transparent z-10" />
        <div className="absolute inset-0 flex items-center z-20">
          <div className="max-w-[1200px] mx-auto px-6 w-full">
            <div className="max-w-lg">
              <p className="text-[#8DBD42] font-semibold text-sm tracking-widest uppercase mb-3">
                Serving Washington State
              </p>
              <h1
                className="text-white text-4xl md:text-5xl font-bold leading-tight mb-4"
                style={{ fontFamily: "'Libre Caslon Text', serif" }}
              >
                Property Restoration Experts
              </h1>
              <p className="text-white/90 text-lg mb-6">
                Fire, Water & Storm Damage — Cleanup, Mitigation & Full
                Restoration
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="tel:3604561886" className="btn-primary">
                  <Phone size={16} /> (360) 456-1886
                </a>
                <a href="#services" className="btn-green">
                  Our Services <ChevronRight size={16} />
                </a>
              </div>
              <p className="text-white/80 text-sm mt-4 flex items-center gap-1.5">
                <Clock size={14} /> 24 hours a day, 7 days a week
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN HERO CTA BLOCK ── */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <h2 className="section-title text-3xl md:text-4xl mb-2">
            Washington State Restoration Response
          </h2>
          <p className="section-subtitle text-base mb-1">
            Serving Lacey, Olympia, Chehalis & Surrounding Areas
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-sm mb-6">
            <a
              href="#services"
              className="text-[#8DBD42] font-semibold hover:underline"
            >
              Fire Restoration
            </a>
            <span className="text-gray-400">|</span>
            <a
              href="#services"
              className="text-[#8DBD42] font-semibold hover:underline"
            >
              Water Restoration
            </a>
            <span className="text-gray-400">|</span>
            <a
              href="#services"
              className="text-[#8DBD42] font-semibold hover:underline"
            >
              Storm Damage
            </a>
            <span className="text-gray-400">|</span>
            <a
              href="#contact"
              className="text-[#8DBD42] font-semibold hover:underline"
            >
              Contact
            </a>
          </div>
          <p className="text-gray-500 text-sm mb-6">
            Professional Fire, Water & Storm Damage Cleanup, Mitigation, and
            Restoration
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <a
              href="tel:3604561886"
              className="btn-primary text-base px-6 py-3"
            >
              <Phone size={18} /> (360) 456-1886
            </a>
            <a href="#services" className="btn-green text-base px-6 py-3">
              <Flame size={18} /> Emergency Services
            </a>
          </div>
          <p className="text-gray-500 text-sm mb-6">
            24 hours a day, 7 days a week!
          </p>
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center items-center gap-6">
            <img
              src={WARRANTY_BADGE}
              alt="5 Year Warranty"
              className="h-16 w-auto object-contain"
            />
            <img
              src={IICRC_BADGE}
              alt="IICRC Certified Firm"
              className="h-16 w-auto object-contain"
            />
            <img
              src={EMERGENCY_BADGE}
              alt="24 HR Emergency Response"
              className="h-16 w-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* ── LOCATIONS SECTION ── */}
      <section className="bg-[#F7F4EE] py-14">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Lacey Office */}
            <div className="bg-white border border-gray-200 rounded-lg p-5 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <MapPin size={15} className="text-[#8DBD42]" />
                <h3
                  className="text-xl font-bold text-[#3F4143]"
                  style={{ fontFamily: "'Libre Caslon Text', serif" }}
                >
                  North Office
                </h3>
              </div>
              <p className="text-[#8DBD42] text-xs font-semibold mb-2">
                Serving Lacey & Olympia Metro Area
              </p>
              <div className="flex flex-wrap justify-center gap-1.5 text-xs mb-2">
                <a
                  href="#services"
                  className="text-[#8DBD42] font-medium hover:underline"
                >
                  Fire Restoration
                </a>
                <span className="text-gray-300">|</span>
                <a
                  href="#services"
                  className="text-[#8DBD42] font-medium hover:underline"
                >
                  Water Restoration
                </a>
                <span className="text-gray-300">|</span>
                <a
                  href="#contact"
                  className="text-[#8DBD42] font-medium hover:underline"
                >
                  Contact
                </a>
              </div>
              <p className="text-gray-500 text-xs mb-3">
                Professional Fire, Water & Storm Damage Cleanup, Mitigation, and
                Restoration
              </p>
              <div className="flex justify-center mb-2">
                <a
                  href="tel:3604561886"
                  className="btn-primary text-sm px-4 py-2"
                >
                  <Phone size={13} /> (360) 456-1886
                </a>
              </div>
              <p className="text-gray-400 text-xs mb-2">
                24 hours a day, 7 days a week!
              </p>
              <p className="text-gray-500 text-xs">
                7895 Martin Way E, Unit 103, Lacey WA 98516
              </p>
            </div>

            {/* Chehalis Office */}
            <div className="bg-white border border-gray-200 rounded-lg p-5 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <MapPin size={15} className="text-[#8DBD42]" />
                <h3
                  className="text-xl font-bold text-[#3F4143]"
                  style={{ fontFamily: "'Libre Caslon Text', serif" }}
                >
                  South Office
                </h3>
              </div>
              <p className="text-[#8DBD42] text-xs font-semibold mb-2">
                Serving Chehalis & Lewis County Area
              </p>
              <div className="flex flex-wrap justify-center gap-1.5 text-xs mb-2">
                <a
                  href="#services"
                  className="text-[#8DBD42] font-medium hover:underline"
                >
                  Fire Restoration
                </a>
                <span className="text-gray-300">|</span>
                <a
                  href="#services"
                  className="text-[#8DBD42] font-medium hover:underline"
                >
                  Water Restoration
                </a>
                <span className="text-gray-300">|</span>
                <a
                  href="#contact"
                  className="text-[#8DBD42] font-medium hover:underline"
                >
                  Contact
                </a>
              </div>
              <p className="text-gray-500 text-xs mb-3">
                Professional Fire, Water & Storm Damage Cleanup, Mitigation, and
                Restoration
              </p>
              <div className="flex justify-center mb-2">
                <a
                  href="tel:3604561886"
                  className="btn-primary text-sm px-4 py-2"
                >
                  <Phone size={13} /> (360) 456-1886
                </a>
              </div>
              <p className="text-gray-400 text-xs mb-2">
                24 hours a day, 7 days a week!
              </p>
              <p className="text-gray-500 text-xs">
                1581 N. National Ave, Chehalis WA 98532
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER SLIDER ── */}
      <section
        className="py-0 relative overflow-hidden"
        style={{ height: "420px" }}
      >
        <div className="relative w-full h-full select-none">
          {/* After image (full width) */}
          <img
            src={RESTORED_IMG}
            alt="After restoration"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Before image (clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${beforeAfter}%` }}
          >
            <img
              src={FIRE_IMG}
              alt="Before restoration"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ width: `${10000 / beforeAfter}%`, maxWidth: "none" }}
            />
          </div>
          {/* Divider line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
            style={{ left: `${beforeAfter}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center cursor-ew-resize">
              <ChevronLeft size={14} className="text-[#3F4143]" />
              <ChevronRight size={14} className="text-[#3F4143]" />
            </div>
          </div>
          {/* Labels */}
          <div className="absolute top-4 left-4 bg-[#3F4143]/80 text-white text-xs font-bold px-3 py-1 rounded">
            BEFORE
          </div>
          <div className="absolute top-4 right-4 bg-[#8DBD42]/90 text-white text-xs font-bold px-3 py-1 rounded">
            AFTER
          </div>
          {/* Drag handler */}
          <input
            type="range"
            min={5}
            max={95}
            value={beforeAfter}
            onChange={e => setBeforeAfter(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
            style={{ zIndex: 10 }}
          />
        </div>
      </section>

      {/* ── SERVICES SECTION — Overlapping Layout inspired by Mockup ── */}
      <section id="services" className="relative bg-white pb-24">
        {/* Dark Header Band */}
        <div className="bg-[#3F4143] pt-24 pb-44">
          <div className="max-w-[1200px] mx-auto px-6">
            <FadeUp>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                <div>
                  <span className="text-[#8DBD42] font-extrabold text-xs tracking-[0.22em] uppercase mb-3 flex items-center gap-3">
                    <span className="w-7 h-px bg-[#8DBD42]" />
                    Our Expertise
                  </span>
                  <h2
                    className="text-white font-bold leading-tight uppercase font-serif"
                    style={{
                      fontFamily: "'Libre Caslon Text', serif",
                      fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
                    }}
                  >
                    Comprehensive Restoration Services
                  </h2>
                </div>

                {/* Decorative Prev / Next Slider Controls */}
                <div className="flex items-center gap-6 text-white/50 text-xs font-bold tracking-widest uppercase select-none md:mb-2">
                  <button className="flex items-center gap-1 hover:text-white transition-colors duration-200 group">
                    <ChevronLeft
                      size={16}
                      className="group-hover:-translate-x-0.5 transition-transform"
                    />
                    PREV
                  </button>
                  <span className="text-white/20">|</span>
                  <button className="flex items-center gap-1 hover:text-white transition-colors duration-200 group">
                    NEXT
                    <ChevronRight
                      size={16}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </button>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* Overlapping Cards Grid */}
        <div className="max-w-[1200px] mx-auto px-6 -mt-28 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s, idx) => (
              <FadeUp key={s.title} delay={idx * 0.08} className="h-full">
                <motion.div
                  whileHover={{ y: -12, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  className="bg-white border border-gray-150 p-6 md:p-8 rounded-2xl flex flex-col justify-between h-full hover:bg-[#8DBD42] hover:text-white hover:border-[#8DBD42] shadow-lg hover:shadow-[0_24px_50px_rgba(141,189,66,0.15)] transition-all duration-300 group cursor-pointer relative overflow-hidden"
                >
                  <div>
                    {/* Centered Icon Container */}
                    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-[#8DBD42] border border-gray-100 group-hover:bg-white group-hover:text-[#8DBD42] transition-colors duration-300 mb-6">
                      {s.icon}
                    </div>

                    {/* Tagline */}
                    <span className="text-[#8DBD42] group-hover:text-white/90 text-xs font-bold uppercase mb-2 block tracking-wider">
                      {s.tag}
                    </span>

                    {/* Title */}
                    <h3
                      className="text-xl font-bold text-[#3F4143] group-hover:text-white mb-4 leading-snug"
                      style={{ fontFamily: "'Libre Caslon Text', serif" }}
                    >
                      {s.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 group-hover:text-white/80 text-xs leading-relaxed mb-6">
                      {s.desc}
                    </p>

                    {/* Highlights list */}
                    <ul className="space-y-2 mb-6">
                      {s.highlights.map(h => (
                        <li
                          key={h}
                          className="flex items-center gap-2 text-xs text-gray-500 group-hover:text-white/70"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8DBD42] group-hover:bg-white flex-shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA link */}
                  <a
                    href="#contact"
                    className="mt-auto text-[#8DBD42] group-hover:text-white font-semibold text-xs flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Learn More <ChevronRight size={14} />
                  </a>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / STORY SECTION ── */}
      <section id="about" className="py-16 bg-[#F7F4EE]">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-subtitle uppercase tracking-widest mb-2">
                Our Story
              </p>
              <h2 className="section-title text-3xl md:text-4xl mb-5">
                Restoration Since 2004
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We're proud to be locally owned and operated. Our crew isn't
                just a team of technicians — they're your neighbors. We live and
                work in this community, and we care deeply about the people we
                serve.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                When you call us, you're not getting a national chain or an
                out-of-town franchise. You're getting a local team that
                understands our area and stands behind our work.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Most importantly,{" "}
                <strong className="text-[#3F4143]">
                  we are advocates for you the homeowner.
                </strong>{" "}
                Our priority is protecting your home and your best interests,
                not the insurance company's.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-3 shadow-sm">
                  <Award size={20} className="text-[#8DBD42]" />
                  <span className="text-sm font-semibold text-[#3F4143]">
                    IICRC Certified
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-3 shadow-sm">
                  <Shield size={20} className="text-[#8DBD42]" />
                  <span className="text-sm font-semibold text-[#3F4143]">
                    5 Year Warranty
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-3 shadow-sm">
                  <Clock size={20} className="text-[#8DBD42]" />
                  <span className="text-sm font-semibold text-[#3F4143]">
                    24/7 Emergency
                  </span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src={WATER_IMG}
                alt="Heritage Restoration team at work"
                className="rounded-lg shadow-xl w-full object-cover"
                style={{ height: "380px" }}
              />
              <div className="absolute -bottom-5 -left-5 bg-[#8DBD42] text-white rounded-lg px-5 py-4 shadow-lg">
                <p
                  className="text-3xl font-bold"
                  style={{ fontFamily: "'Libre Caslon Text', serif" }}
                >
                  20+
                </p>
                <p className="text-sm font-medium">Years of Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS GALLERY ── */}
      <section id="projects" className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-10">
            <p className="section-subtitle uppercase tracking-widest mb-2">
              Our Work
            </p>
            <h2 className="section-title text-3xl md:text-4xl">
              Recent Projects
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { img: FIRE_IMG, label: "Fire Damage Assessment" },
              { img: RESTORED_IMG, label: "Full Home Restoration" },
              { img: WATER_IMG, label: "Water Damage Mitigation" },
              { img: HERO_IMG, label: "Emergency Response" },
              { img: FIRE_IMG, label: "Smoke Damage Cleanup" },
              { img: RESTORED_IMG, label: "Rebuild Complete" },
            ].map((p, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-lg group"
                style={{ height: "200px" }}
              >
                <img
                  src={p.img}
                  alt={p.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#3F4143]/0 group-hover:bg-[#3F4143]/60 transition-all duration-300 flex items-end">
                  <p className="text-white font-semibold text-sm px-4 py-3 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {p.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 bg-[#3F4143]">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-[#8DBD42] uppercase tracking-widest text-sm font-semibold mb-2">
              Client Stories
            </p>
            <h2
              className="text-white text-3xl md:text-4xl font-bold"
              style={{ fontFamily: "'Libre Caslon Text', serif" }}
            >
              From Our Clients
            </h2>
            <p className="text-white/60 text-sm mt-1">Stories of Restoration</p>
          </div>

          {/* Featured testimonial */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-10 relative">
              <div className="text-[#8DBD42] text-6xl font-serif leading-none mb-4 select-none">
                "
              </div>
              <p
                className="text-white text-lg md:text-xl leading-relaxed mb-6 italic"
                style={{ fontFamily: "'Libre Caslon Text', serif" }}
              >
                {testimonials[activeTestimonial].quote}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#8DBD42] flex items-center justify-center text-white font-bold text-sm">
                  {testimonials[activeTestimonial].author[0]}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    {testimonials[activeTestimonial].author}
                  </p>
                  <p className="text-white/50 text-xs">
                    {testimonials[activeTestimonial].role}
                  </p>
                </div>
                <div className="ml-auto flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-[#8DBD42] text-[#8DBD42]"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === activeTestimonial ? "bg-[#8DBD42] w-6" : "bg-white/30"}`}
              />
            ))}
          </div>

          {/* All testimonials grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`bg-white/5 border rounded-lg p-6 cursor-pointer transition-all duration-300 ${i === activeTestimonial ? "border-[#8DBD42]" : "border-white/10 hover:border-white/30"}`}
                onClick={() => setActiveTestimonial(i)}
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      size={12}
                      className="fill-[#8DBD42] text-[#8DBD42]"
                    />
                  ))}
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-4">
                  "{t.quote}"
                </p>
                <p className="text-[#8DBD42] font-semibold text-sm">
                  {t.author}
                </p>
                <p className="text-white/40 text-xs">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT TO EXPECT PROCESS ── */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-10">
            <p className="section-subtitle uppercase tracking-widest mb-2">
              The Process
            </p>
            <h2 className="section-title text-3xl md:text-4xl">
              What to Expect
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Mitigation",
                desc: "The first phase removes damage from the home — drywall, flooring, cabinets, and contents. We use specialty dryers and deodorizers to minimize secondary damage. Typically completed in about 3 weeks.",
              },
              {
                step: "02",
                title: "Estimation & Negotiation",
                desc: "Our skilled estimators negotiate the cost of the job with your insurance carrier. We advocate for you throughout the process, ensuring fair and complete coverage for all necessary repairs.",
              },
              {
                step: "03",
                title: "Build Back",
                desc: "The final phase restores your home to pre-loss condition. From permitting to subcontractor coordination to final walk-through — we handle everything so you can focus on getting back to normal.",
              },
            ].map(p => (
              <div
                key={p.step}
                className="relative pl-6 border-l-2 border-[#8DBD42]"
              >
                <span className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-[#8DBD42] text-white text-xs font-bold flex items-center justify-center">
                  {p.step}
                </span>
                <h3
                  className="text-xl font-bold text-[#3F4143] mb-3 mt-1"
                  style={{ fontFamily: "'Libre Caslon Text', serif" }}
                >
                  {p.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section id="contact" className="py-16 bg-[#8DBD42]">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <h2
            className="text-white text-3xl md:text-4xl font-bold mb-3"
            style={{ fontFamily: "'Libre Caslon Text', serif" }}
          >
            Ready to Restore Your Property?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Call us now — we respond within 45 minutes. Available 24/7 for
            emergencies.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:3604561886"
              className="bg-white text-[#3F4143] font-bold px-8 py-4 rounded text-lg flex items-center gap-2 hover:bg-[#F7F4EE] transition-colors shadow-lg"
            >
              <Phone size={20} /> (360) 456-1886
            </a>
            <a
              href="mailto:office@firewaterstorm.com"
              className="bg-[#3F4143] text-white font-bold px-8 py-4 rounded text-lg flex items-center gap-2 hover:bg-[#2a2c2e] transition-colors shadow-lg"
            >
              <Mail size={20} /> Email Us
            </a>
          </div>
          <p className="text-white/80 text-sm mt-6">
            Lic #HERITRI964J2 · IICRC Certified · 5 Year Warranty
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#F7F4EE] text-[#3F4143] py-12 border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <img
                src={LOGO}
                alt="Heritage Restoration"
                className="h-14 w-auto object-contain mb-4"
              />
              <p className="text-[#3F4143]/70 text-sm leading-relaxed mb-4">
                Locally owned and operated restoration company serving
                Washington State since 2004. We are advocates for you the
                homeowner.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/heritagerestorationinc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#3F4143]/10 flex items-center justify-center hover:bg-[#8DBD42] hover:text-white transition-colors text-[#3F4143]"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href="https://www.instagram.com/heritagerestorationwa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#3F4143]/10 flex items-center justify-center hover:bg-[#8DBD42] hover:text-white transition-colors text-[#3F4143]"
                >
                  <Instagram size={16} />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-[#8DBD42] mb-3 uppercase text-xs tracking-widest">
                Services
              </h4>
              <ul className="space-y-2 text-sm text-[#3F4143]/70">
                <li>
                  <a
                    href="#services"
                    className="hover:text-[#8DBD42] transition-colors"
                  >
                    Fire Restoration
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-[#8DBD42] transition-colors"
                  >
                    Water Restoration
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-[#8DBD42] transition-colors"
                  >
                    Storm Damage
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-[#8DBD42] transition-colors"
                  >
                    Emergency Response
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-[#8DBD42] transition-colors"
                  >
                    Mitigation
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-[#8DBD42] mb-3 uppercase text-xs tracking-widest">
                Contact
              </h4>
              <ul className="space-y-3 text-sm text-[#3F4143]/70">
                <li className="flex items-start gap-2">
                  <MapPin
                    size={14}
                    className="mt-0.5 text-[#8DBD42] flex-shrink-0"
                  />
                  <span>
                    7895 Martin Way E, Unit 103
                    <br />
                    Lacey WA 98516
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin
                    size={14}
                    className="mt-0.5 text-[#8DBD42] flex-shrink-0"
                  />
                  <span>
                    1581 N. National Ave
                    <br />
                    Chehalis WA 98532
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={14} className="text-[#8DBD42]" />
                  <a
                    href="tel:3604561886"
                    className="hover:text-[#8DBD42] transition-colors"
                  >
                    (360) 456-1886
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={14} className="text-[#8DBD42]" />
                  <a
                    href="mailto:office@firewaterstorm.com"
                    className="hover:text-[#8DBD42] transition-colors"
                  >
                    office@firewaterstorm.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#3F4143]/15 pt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-[#3F4143]/50">
            <p>
              © {new Date().getFullYear()} Heritage Restoration. All rights
              reserved. Lic #HERITRI964J2
            </p>
            <p>
              IICRC Certified Firm · 5 Year Warranty · 24/7 Emergency Response
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
