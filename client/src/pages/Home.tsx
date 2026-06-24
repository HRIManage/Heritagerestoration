import { useRef, useState, useEffect } from "react";
import { motion, useInView, animate, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Phone,
  MapPin,
  Droplets,
  Flame,
  CloudLightning,
  Star,
  ChevronsLeftRight,
  ShieldCheck,
  House,
  FlaskConical,
  Layers,
  Calculator,
  ClipboardCheck,
  HardHat,
  BadgeCheck,
  Clock,
  Trophy,
  Shield,
  Hammer,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Link } from "wouter";
import { buildBreadcrumbSchema } from "@/seo";

const HERO_IMAGE = "/photo/hero-new.jpg";
const ABOUT_IMAGE = "/photo/who-we-are.jpg";
const SERVICE_FIRE = "/photo/hero-new.jpg";
const SERVICE_WATER = "/photo/20240403_095638.jpg";
const SERVICE_STORM = "/photo/hero-tarp.jpg";
const SERVICE_CONTENTS = "/photo/recent-project-4.jpg";
const PROJECT_ONE = "/photo/recent-project-1.jpg";
const PROJECT_TWO = "/photo/recent-project-2.jpg";
const DECK_KITCHEN = "/photo/Before-After-Kitchen.jpg";
const DECK_STAIRS = "/photo/Before-After-staircase.jpg";
const BEFORE_IMAGE = "/photo/Monnett Fire Before.jpg";
const AFTER_IMAGE = "/photo/Monnett Fire After.jpg";

import FadeIn from "@/components/ui/FadeIn";

function FadeUp({
  children,
  delay = 0,
  className = "",
  style,
  triggerImmediately = false,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  triggerImmediately?: boolean;
}) {
  return (
    <FadeIn
      delay={delay}
      className={className}
      style={style}
      triggerImmediately={triggerImmediately}
    >
      {children}
    </FadeIn>
  );
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: 1.8,
        ease: [0.21, 1, 0.36, 1],
        onUpdate(latest) {
          if (ref.current) {
            ref.current.textContent =
              Math.round(latest).toLocaleString() + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [value, suffix, inView]);

  return <span ref={ref}>0{suffix}</span>;
}

function SpinCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        setDisplay(Math.round(v).toLocaleString());
      },
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <div ref={ref} className="overflow-hidden" style={{ perspective: "400px" }}>
      <motion.span
        key={inView ? "active" : "idle"}
        initial={{ rotateX: 90, opacity: 0, y: 20 }}
        animate={inView ? { rotateX: 0, opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: "inline-block", transformOrigin: "50% 100%" }}
      >
        {display}{suffix}
      </motion.span>
    </div>
  );
}

function PhotoDeck() {
  const images = [
    "/photo/contents-gallery-5.jpg",
    "/photo/contents-gallery-4.jpg",
    "/photo/contents-gallery-9.jpg",
    "/photo/contents-gallery-2.jpg",
    "/photo/contents-gallery-10.jpg",
    "/photo/contents-gallery-3.jpg",
    "/photo/contents-gallery-8.jpg",
    "/photo/contents-gallery-6.jpg",
    "/photo/contents-gallery-11.jpg",
    "/photo/contents-gallery-7.jpg",
    "/photo/contents-gallery-12.jpg",
    "/photo/contents-gallery-13.jpg",
    "/photo/contents-gallery-14.jpg",
    "/photo/contents-gallery-15.jpg",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [images.length]);

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  };

  return (
    <div
      className="relative w-full max-w-[710px] aspect-[1.5] cursor-pointer select-none group"
      onClick={handleNext}
    >
      {images.map((img, idx) => {
        const stackPos = (idx - currentIndex + images.length) % images.length;
        const isVisible = stackPos < 4;

        let rotate = 0;
        let zIndex = 10 - stackPos;
        let scale = 1 - stackPos * 0.03;
        let translateY = stackPos * 10;
        let translateX = stackPos * 6;

        if (stackPos === 0) {
          rotate = 5;
        } else if (stackPos === 1) {
          rotate = 1;
        } else {
          rotate = -3;
        }

        return (
          <motion.div
            key={img}
            style={{
              zIndex,
              originX: 0.5,
              originY: 0.5,
              display: isVisible ? "flex" : "none",
            }}
            animate={{
              rotate: rotate,
              scale: scale,
              y: translateY,
              x: translateX,
              opacity: stackPos === 3 ? 0.8 : 1,
            }}
            whileHover={
              stackPos === 0 ? { scale: 1.02, rotate: rotate + 1 } : {}
            }
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="absolute inset-0 rounded-none overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.08)] border border-[#3F4143]/8 bg-white p-3 md:p-4 flex items-center justify-center"
          >
            <img
              src={img}
              alt={`Gallery image ${idx + 1}`}
              className="w-full h-full object-contain rounded-none pointer-events-none"
            />
            {stackPos === 0 && (
              <div className="absolute inset-0 bg-black/5 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

export default function Home() {
  const [sliderPercent, setSliderPercent] = useState(50);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [pathD, setPathD] = useState("");
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(
    null
  );
  const [endPoint, setEndPoint] = useState<{ x: number; y: number } | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isSectionInView = useInView(containerRef, {
    once: true,
    margin: "-100px",
  });

  const services = [
    {
      number: "01",
      title: "Fire Restoration",
      image: SERVICE_FIRE,
      description:
        "Comprehensive cleaning, structural repair, and odor removal to return your property to pre-loss condition.",
      href: "/services/fire-restoration",
      icon: <Flame size={20} />,
      colorClass:
        "hover:border-[#E05A47] hover:ring-[#E05A47]/10 hover:shadow-[0_20px_50px_rgba(224,90,71,0.08)]",
      accentBarClass: "bg-[#E05A47]",
      watermarkColor: "text-[#1A311F]/5 group-hover:text-[#E05A47]/10",
      iconColor:
        "text-[#1A311F] bg-[#8DBD42]/10 group-hover:bg-[#E05A47] group-hover:text-white",
      hoverTextColor: "group-hover:text-[#E05A47]",
    },
    {
      number: "02",
      title: "Water Restoration",
      image: SERVICE_WATER,
      description:
        "Rapid extraction, structural drying, and mold prevention using IICRC-certified mitigation standards.",
      href: "/services/water-restoration",
      icon: <Droplets size={20} />,
      colorClass:
        "hover:border-[#3A82F6] hover:ring-[#3A82F6]/10 hover:shadow-[0_20px_50px_rgba(58,130,246,0.08)]",
      accentBarClass: "bg-[#3A82F6]",
      watermarkColor: "text-[#1A311F]/5 group-hover:text-[#3A82F6]/10",
      iconColor:
        "text-[#1A311F] bg-[#8DBD42]/10 group-hover:bg-[#3A82F6] group-hover:text-white",
      hoverTextColor: "group-hover:text-[#3A82F6]",
    },
    {
      number: "03",
      title: "Storm Recovery",
      image: SERVICE_STORM,
      description:
        "Emergency tarping, debris removal, and structural rebuilds following severe PNW weather events.",
      href: "/services/storm-recovery",
      icon: <CloudLightning size={20} />,
      colorClass:
        "hover:border-[#4F46E5] hover:ring-[#4F46E5]/10 hover:shadow-[0_20px_50px_rgba(79,70,229,0.08)]",
      accentBarClass: "bg-[#4F46E5]",
      watermarkColor: "text-[#1A311F]/5 group-hover:text-[#4F46E5]/10",
      iconColor:
        "text-[#1A311F] bg-[#8DBD42]/10 group-hover:bg-[#4F46E5] group-hover:text-white",
      hoverTextColor: "group-hover:text-[#4F46E5]",
    },
    {
      number: "04",
      title: "Contents Cleaning",
      image: SERVICE_CONTENTS,
      description:
        "Specialized cleaning and restoration of personal contents, textiles, and salvageable valuables.",
      href: "/services/contents-services",
      icon: <ShieldCheck size={20} />,
      colorClass:
        "hover:border-[#D97706] hover:ring-[#D97706]/10 hover:shadow-[0_20px_50px_rgba(217,119,6,0.08)]",
      accentBarClass: "bg-[#D97706]",
      watermarkColor: "text-[#1A311F]/5 group-hover:text-[#D97706]/10",
      iconColor:
        "text-[#1A311F] bg-[#8DBD42]/10 group-hover:bg-[#D97706] group-hover:text-white",
      hoverTextColor: "group-hover:text-[#D97706]",
    },
  ];

  const process = [
    {
      number: "01",
      title: "Day of Loss",
      description:
        "Contact your insurance company and open a claim. We will board up and secure your property as needed.",
      position: "top",
      icon: <Flame size={24} />,
    },
    {
      number: "02",
      title: "Testing",
      description:
        "We can provide testing for asbestos, lead and other hazardous materials if warranted.",
      position: "bottom",
      icon: <FlaskConical size={24} />,
    },
    {
      number: "03",
      title: "3D Modeling",
      description:
        "Our all-in-one platform transforms real-life spaces into immersive digital twin models.",
      position: "top",
      icon: <Layers size={24} />,
    },
    {
      number: "04",
      title: "Estimate",
      description:
        "We will write a scope of repairs and submit an estimate to your insurance provider.",
      position: "bottom",
      icon: <Calculator size={24} />,
    },
    {
      number: "05",
      title: "Contract",
      description:
        "Once an undisputed estimate is approved by your insurance provider a contract is signed and restoration begins. Start dates may vary.",
      position: "top",
      icon: <ClipboardCheck size={24} />,
    },
    {
      number: "06",
      title: "Project Manager",
      description:
        "Once the contract is signed a project manager is assigned and will meet with you to discuss scheduling, repairs and materials to be used.",
      position: "bottom",
      icon: <HardHat size={24} />,
    },
    {
      number: "07",
      title: "QA",
      description:
        "Our quality assurance team will inspect the quality of work at key times throughout construction.",
      position: "top",
      icon: <BadgeCheck size={24} />,
    },
    {
      number: "08",
      title: "Completion of Project",
      description:
        "Once the restoration of your home is completed and you are happy and satisfied with our work, a signed certificate of completion will be provided and your stored contents will be returned.",
      position: "bottom",
      icon: <House size={24} />,
    },
  ];

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current) return;
      const nodes = containerRef.current.querySelectorAll(".journey-node");
      if (nodes.length === 0) return;

      const points: { x: number; y: number }[] = [];
      const containerRect = containerRef.current.getBoundingClientRect();

      nodes.forEach(node => {
        const rect = node.getBoundingClientRect();
        const x = rect.left - containerRect.left + rect.width / 2;
        const y = rect.top - containerRect.top + rect.height / 2;
        points.push({ x, y });
      });

      if (points.length < 2) return;

      const startX = points[0].x;
      const startY = points[0].y - 35;
      setStartPoint({ x: startX, y: startY });

      const endX = points[points.length - 1].x;
      const endY = points[points.length - 1].y + 35;
      setEndPoint({ x: endX, y: endY });

      let d = `M ${startX} ${startY}`;
      d += ` L ${points[0].x} ${points[0].y}`;

      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const cpY1 = p0.y + (p1.y - p0.y) / 2;
        const cpY2 = p1.y - (p1.y - p0.y) / 2;
        d += ` C ${p0.x} ${cpY1}, ${p1.x} ${cpY2}, ${p1.x} ${p1.y}`;
      }

      d += ` L ${endX} ${endY}`;
      setPathD(d);
    };

    updatePath();
    window.addEventListener("resize", updatePath);
    const timer = setTimeout(updatePath, 350);

    return () => {
      window.removeEventListener("resize", updatePath);
      clearTimeout(timer);
    };
  }, []);

  const updateSlider = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const rawPercent = ((clientX - rect.left) / rect.width) * 100;
    const boundedPercent = Math.max(0, Math.min(100, rawPercent));
    setSliderPercent(boundedPercent);
  };

  const headlineStyle = { fontFamily: "'Libre Caslon Text', serif" };
  const bodyStyle = { fontFamily: "'Hanken Grotesk', sans-serif" };

  return (
    <Layout>
      <Helmet>
        <title>
          Heritage Restoration | Fire, Water &amp; Storm Damage Experts
          Washington State
        </title>
        <meta
          name="description"
          content="Heritage Restoration provides 24/7 emergency fire, water, and storm damage restoration across Western Washington. IICRC certified, 60-minute response, direct insurance billing since 2004. Serving Lacey, Tacoma, Chehalis, Federal Way &amp; more."
        />
        <meta
          name="keywords"
          content="fire damage restoration Washington, water damage restoration Tacoma, storm damage repair Olympia, emergency restoration 24/7, mold remediation Thurston County, IICRC certified restoration contractor"
        />
        <link rel="canonical" href="https://www.firewaterstorm.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.firewaterstorm.com/" />
        <meta
          property="og:title"
          content="Heritage Restoration | 24/7 Fire, Water &amp; Storm Damage Experts"
        />
        <meta
          property="og:description"
          content="Professional fire, water, and storm damage restoration across Western Washington. IICRC certified, 60-minute emergency response, direct insurance billing since 2004."
        />
        <meta
          property="og:image"
          content="https://www.firewaterstorm.com/photo/hero-new.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Heritage Restoration | 24/7 Fire, Water &amp; Storm Damage Experts"
        />
        <meta
          name="twitter:description"
          content="Professional fire, water, and storm damage restoration across Western Washington. IICRC certified, 60-minute emergency response."
        />
        <script type="application/ld+json">
          {JSON.stringify(buildBreadcrumbSchema([{ name: "Home", url: "/" }]))}
        </script>
      </Helmet>

      <div className="bg-[#FAF9F5]">
        {/* Homepage Hero */}
        <section className="relative overflow-hidden bg-[#0f1a10] pt-[112px] sm:pt-[116px] lg:pt-[120px]">
          <img
            src="/photo/hero-tarp.jpg"
            alt="Heritage Restoration - Tarping damage recovery"
            className="absolute inset-0 h-full w-full object-cover object-[80%_bottom]"
          />
          {/* Left column: heavy white fade for text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 28%, rgba(255,255,255,0.80) 44%, rgba(255,255,255,0.25) 60%, transparent 78%)",
            }}
          />
          {/* Bottom fade into dark ticker */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent 55%, rgba(15,26,16,0.55) 85%, rgba(26,49,31,1) 100%)",
            }}
          />
          {/* Mobile-only extra white overlay */}
          <div className="absolute inset-0 bg-white/60 lg:hidden pointer-events-none" />

          {/* Hero content */}
          <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-24 py-8 lg:py-10">
            <div className="max-w-[600px]">
              <FadeUp triggerImmediately={true} delay={0.05}>
                <p
                  className="inline-flex items-center gap-3 uppercase tracking-[0.2em] text-[11px] font-extrabold mb-7 text-[#8DBD42]"
                  style={bodyStyle}
                >
                  <span className="w-8 h-[2px] bg-[#8DBD42]" />
                  Professional Property Restoration
                </p>
              </FadeUp>
              <FadeUp triggerImmediately={true} delay={0.15}>
                <h1 className="leading-[1.03]" style={headlineStyle}>
                  <span className="block text-[2.6rem] md:text-[3.4rem] lg:text-[4rem] xl:text-[4.8rem] text-[#1a1c1e] font-bold">
                    Restoring
                    <br />
                    Your Home.
                  </span>
                  <span className="block text-[2.6rem] md:text-[3.4rem] lg:text-[4rem] xl:text-[4.8rem] text-[#8DBD42] font-bold mt-1">
                    Restoring Your
                    <br />
                    Peace of Mind.
                  </span>
                </h1>
              </FadeUp>
              <FadeUp triggerImmediately={true} delay={0.28}>
                <p
                  className="mt-6 text-[17px] text-[#2f3133]/75 max-w-[480px] leading-[1.7]"
                  style={bodyStyle}
                >
                  As dedicated homeowner advocates, we handle the full complexity
                  of disaster recovery, so you don't have to. Locally owned and
                  operated since 2004.
                </p>
              </FadeUp>
              {/* CTAs */}
              <FadeUp triggerImmediately={true} delay={0.38}>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <a
                    href="tel:+13603451015"
                    className="inline-flex items-center gap-2.5 bg-[#8DBD42] hover:bg-[#7dac35] text-[#1a1c1e] px-8 py-4 uppercase tracking-[0.14em] text-[13px] font-black transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(141,189,66,0.4)] active:translate-y-0 active:shadow-none"
                    style={bodyStyle}
                  >
                    <Phone size={14} className="stroke-[3]" />
                    (360) 345-1015
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 border-2 border-[#2a2c2e]/30 hover:border-[#2a2c2e] text-[#2a2c2e] px-8 py-[14px] uppercase tracking-[0.14em] text-[13px] font-black transition-all duration-200 bg-white/60 hover:bg-white/90 hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)] active:translate-y-0 active:shadow-none"
                    style={bodyStyle}
                  >
                    Free Assessment
                    <span className="text-[#8DBD42] text-base leading-none ml-1 transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </FadeUp>
            </div>
          </div>

          {/* Scrolling ticker strip */}
          <div className="relative z-10 bg-[#1A311F] py-8 overflow-hidden">
            <style>{`
              @keyframes home-ticker {
                from { transform: translateX(0); }
                to { transform: translateX(-50%); }
              }
              .home-ticker { animation: home-ticker 45s linear infinite; }
            `}</style>
            <div className="home-ticker flex whitespace-nowrap w-max">
              {[...Array(2)].map((_, setIdx) => (
                <div key={setIdx} className="flex">
                  {[
                    "Direct Insurance Billing",
                    "Licensed & Bonded in WA",
                    "22+ Years Serving Washington",
                    "Locally Owned & Operated",
                  ].map(item => (
                    <span key={item} className="flex items-center">
                      <span className="px-12 font-semibold text-[26px] uppercase tracking-[0.22em] text-[#8DBD42]">{item}</span>
                      <span className="text-[#8DBD42]/25 text-[18px]">✦</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Office Locations + Trust Badges — unified section */}
        <section className="bg-white border-t border-gray-100">
          <div className="max-w-[860px] mx-auto px-8 pt-14 pb-0 md:pt-18">
            {/* Label */}
            <FadeUp>
              <p className="text-[#8DBD42] uppercase tracking-[0.18em] text-sm font-black text-center mb-10" style={bodyStyle}>
                Local Office Locations
              </p>
            </FadeUp>

            {/* Two offices */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#3F4143]/10">
              <FadeUp delay={0.05} className="flex flex-col gap-5 pb-10 md:pb-0 md:pr-12 md:items-center md:text-center">
                <h3 className="text-[26px] font-bold text-[#2a2c2e]" style={headlineStyle}>North Office</h3>
                <p className="text-[#3F4143]/65 text-[16px] leading-relaxed flex items-start gap-2" style={bodyStyle}>
                  <MapPin size={15} className="text-[#8DBD42] mt-1 shrink-0" />
                  <a href="https://maps.google.com/?q=8695+Martin+Way+E+Unit+103+Lacey+WA+98516" target="_blank" rel="noopener noreferrer" className="hover:text-[#3F4143] transition-colors">
                    8695 Martin Way E, Unit 103<br />Lacey, WA 98516
                  </a>
                </p>
                <a href="tel:+13603451015" className="inline-flex items-center gap-2 bg-[#8DBD42] hover:bg-[#7dac35] text-[#2b2d2f] px-7 py-3 uppercase tracking-wider text-[12px] font-black transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_6px_18px_rgba(141,189,66,0.35)] active:translate-y-0 active:shadow-none w-fit" style={bodyStyle}>
                  <Phone size={13} className="stroke-[3]" /> Call North Office
                </a>
              </FadeUp>
              <FadeUp delay={0.1} className="flex flex-col gap-5 pt-10 md:pt-0 md:pl-12 md:items-center md:text-center">
                <h3 className="text-[26px] font-bold text-[#2a2c2e]" style={headlineStyle}>South Office</h3>
                <p className="text-[#3F4143]/65 text-[16px] leading-relaxed flex items-start gap-2" style={bodyStyle}>
                  <MapPin size={15} className="text-[#8DBD42] mt-1 shrink-0" />
                  <a href="https://maps.google.com/?q=1581+N.+National+Ave+Chehalis+WA+98532" target="_blank" rel="noopener noreferrer" className="hover:text-[#3F4143] transition-colors">
                    1581 N. National Ave<br />Chehalis, WA 98532
                  </a>
                </p>
                <a href="tel:+13603451015" className="inline-flex items-center gap-2 bg-[#8DBD42] hover:bg-[#7dac35] text-[#2b2d2f] px-7 py-3 uppercase tracking-wider text-[12px] font-black transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_6px_18px_rgba(141,189,66,0.35)] active:translate-y-0 active:shadow-none w-fit" style={bodyStyle}>
                  <Phone size={13} className="stroke-[3]" /> Call South Office
                </a>
              </FadeUp>
            </div>

            {/* 24hr bar + badges combined */}
            <FadeUp delay={0.15}>
              <div className="mt-10 border-t border-[#3F4143]/10 pt-8 pb-10 flex flex-col items-center gap-8">
                <div className="flex items-center gap-2">
                  <Clock size={15} className="text-[#8DBD42]" />
                  <span className="text-[#3F4143]/60 uppercase tracking-[0.18em] text-[13px] font-extrabold" style={bodyStyle}>
                    24 Hours a Day · 7 Days a Week · 365 Days a Year
                  </span>
                </div>
                <div className="flex items-center justify-center gap-12 md:gap-20">
                  {[
                    { src: "/photo/emergency-badge-new-2.png", alt: "24 HR Emergency Response" },
                    { src: "/photo/iicrc-badge-new-3.png", alt: "IICRC Certified" },
                    { src: "/photo/warranty-badge-new-3.png", alt: "5-Year Warranty" },
                  ].map((badge) => (
                    <img key={badge.alt} src={badge.src} alt={badge.alt} className="h-24 md:h-28 w-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.18)]" />
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Specialized Restoration Cards Section */}
        <section
          className="pt-10 pb-10 md:pt-16 md:pb-16 bg-[#FAF9F6]"
          id="services"
        >
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8 md:mb-12">
              <FadeUp>
                <p
                  className="text-[#8DBD42] uppercase tracking-[0.15em] text-sm font-extrabold"
                  style={bodyStyle}
                >
                  Our Expertise
                </p>
                <h2
                  className="text-[27px] md:text-[45px] mt-2"
                  style={headlineStyle}
                >
                  Specialized Restoration
                </h2>
                <p
                  className="mt-4 text-[#3F4143]/70 text-base md:text-lg max-w-2xl leading-relaxed"
                  style={bodyStyle}
                >
                  Select a service line to explore your options. Crafted for
                  clarity, speed, and premium guidance when every decision
                  matters.
                </p>
              </FadeUp>
            </div>

            {/* Clean minimalist divider */}
            <hr className="border-[#3F4143]/10 mb-6 md:mb-10" />

            {/* Service grid - Premium Typography Cards (No Photos) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, idx) => (
                <FadeUp
                  key={service.title}
                  delay={idx * 0.05}
                  className="group h-full"
                >
                  <Link href={service.href}>
                    <div
                      className={`relative h-full p-6 md:p-8 bg-transparent border border-transparent transition-all duration-300 flex flex-col justify-between cursor-pointer rounded-none overflow-hidden group min-h-[220px] md:min-h-[300px] hover:bg-white hover:ring-4 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.07)] ${service.colorClass}`}
                    >
                      {/* Hover expanding top accent line */}
                      <div
                        className={`absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${service.accentBarClass}`}
                      />

                      {/* Massive typographic number watermark in bottom right */}
                      <span
                        className={`absolute right-4 bottom-2 text-7xl font-serif font-black select-none pointer-events-none transition-all duration-300 group-hover:scale-110 group-hover:-translate-x-1 ${service.watermarkColor}`}
                      >
                        {service.number}
                      </span>

                      <div>
                        {/* Elegant icon with soft background circle */}
                        <div
                          className={`mb-6 w-11 h-11 rounded-full flex items-center justify-center group-hover:scale-105 transition-all duration-300 ${service.iconColor}`}
                        >
                          {service.icon}
                        </div>

                        <p
                          className="text-[#8DBD42] uppercase tracking-[0.2em] text-[10px] font-black mb-1"
                          style={bodyStyle}
                        >
                          Service {service.number}
                        </p>
                        <h3
                          className={`text-xl font-bold leading-snug text-[#3F4143] transition-colors mb-3 ${service.hoverTextColor}`}
                          style={headlineStyle}
                        >
                          {service.title}
                        </h3>
                        <p
                          className="text-[#3F4143]/70 text-[15px] leading-relaxed mb-6 font-light"
                          style={bodyStyle}
                        >
                          {service.description}
                        </p>
                      </div>

                      <p
                        className={`uppercase tracking-[0.14em] text-xs font-black inline-flex items-center gap-1.5 text-[#3F4143]/80 group-hover:translate-x-1.5 transition-all duration-300 ${service.hoverTextColor}`}
                        style={bodyStyle}
                      >
                        Explore Service <ArrowRight size={12} />
                      </p>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Our Promise Section */}
        <section
          className="pb-10 md:pb-16 pt-8 md:pt-12 text-[#3F4143] relative overflow-hidden"
          style={{ background: "#FFFFFF" }}
        >
          {/* Soft Seattle Green Glow */}
          <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] rounded-full bg-[#8DBD42]/4.5 blur-[130px] pointer-events-none select-none z-0" />
          <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start relative z-10">
            {/* LEFT: Photo deck + quote below it */}
            <FadeUp className="lg:col-span-6 order-2 lg:order-1 flex flex-col items-center lg:items-start gap-10 mt-8 lg:mt-8">
              <PhotoDeck />
              <div className="border-l-4 border-[#8DBD42] pl-6 pr-6 py-5 bg-[#FAF9F6] border border-[#3F4143]/5 rounded-none italic text-lg md:text-xl text-[#3F4143]/90 font-sans font-light leading-relaxed w-full mx-0">
                Most importantly, we are advocates for you. Our priority is
                protecting your home and your best interests, not the insurance
                company.
              </div>
            </FadeUp>

            {/* RIGHT: text content + buttons */}
            <FadeUp delay={0.08} className="lg:col-span-6 order-1 lg:order-2">
              <p className="text-[#8DBD42] uppercase tracking-[0.18em] text-xs font-extrabold font-sans">
                Our Promise
              </p>
              <h2 className="text-[27px] md:text-[45px] mt-3 leading-[1.08] text-[#3F4143] font-serif">
                We Are Not Just Technicians.
                <br />
                We Are Your Neighbors.
              </h2>
              <p className="mt-6 text-[#3F4143]/80 text-lg leading-relaxed font-sans font-light">
                We are proudly local and homeowner focused. When you call
                Heritage, you are not getting an out-of-town franchise. You are
                getting a team that lives in this community and stands behind
                every repair decision.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 font-sans">
                <a
                  href="tel:+13603451015"
                  className="bg-[#8DBD42] hover:bg-[#7dac35] text-[#1a1c1e] px-8 py-4 uppercase tracking-[0.16em] text-xs font-bold transition-all duration-200 inline-flex items-center gap-2 rounded-none hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(141,189,66,0.4)] active:translate-y-0 active:shadow-none"
                >
                  <Phone size={12} /> Start Your Recovery
                </a>
                <a
                  href="mailto:office@firewaterstorm.com"
                  className="border-2 border-[#3F4143]/40 hover:border-[#3F4143] text-[#3F4143] px-8 py-4 uppercase tracking-[0.16em] text-xs font-bold transition-all duration-200 rounded-none hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)] active:translate-y-0 active:shadow-none"
                >
                  Email Us
                </a>
              </div>

              <div className="mt-10 grid sm:grid-cols-2 gap-8 border-t border-[#3F4143]/10 pt-8 font-sans">
                <div>
                  <p className="uppercase tracking-[0.14em] text-sm font-extrabold text-[#3F4143] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-none bg-[#8DBD42] inline-block" />
                    Local Accountability
                  </p>
                  <p className="mt-2 text-[#3F4143]/70 text-base leading-relaxed font-light">
                    Direct access to our local leadership and project management
                    teams.
                  </p>
                </div>
                <div className="border-t sm:border-t-0 sm:border-l border-[#3F4143]/10 pt-6 sm:pt-0 sm:pl-8">
                  <p className="uppercase tracking-[0.14em] text-sm font-extrabold text-[#3F4143] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-none bg-[#8DBD42] inline-block" />
                    Homeowner Advocacy
                  </p>
                  <p className="mt-2 text-[#3F4143]/70 text-base leading-relaxed font-light">
                    Insurance guidance to keep your claim and rebuild fair and
                    transparent.
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Process Timeline Section (Light Minimalist Milestones) */}
        <section
          className="py-10 md:py-16 overflow-hidden relative bg-[#FAF9F6]"
          id="process"
        >
          {/* Subtle background glows */}
          <div className="absolute left-[-120px] top-[12%] w-[380px] h-[380px] rounded-full bg-[#8DBD42]/3 blur-[140px] pointer-events-none" />
          <div className="absolute right-[-120px] bottom-[10%] w-[420px] h-[420px] rounded-full bg-[#8DBD42]/3 blur-[150px] pointer-events-none" />

          <div className="max-w-[1200px] mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 relative z-10">
              <p
                className="text-[#8DBD42] uppercase tracking-[0.18em] text-sm font-extrabold"
                style={bodyStyle}
              >
                What To Expect
              </p>
              <h2
                className="text-[32px] md:text-[45px] mt-3 text-[#3F4143] font-bold leading-tight"
                style={headlineStyle}
              >
                Restoration Journey
              </h2>
              <p
                className="text-[#3F4143]/70 mt-4 leading-relaxed text-base md:text-lg max-w-xl mx-auto"
                style={bodyStyle}
              >
                While each project is unique, this organic journey keeps your
                restoration efficient and transparent from first call to final
                walkthrough.
              </p>
            </div>
            {/* Winding Vertical Roadmap (Journey from 1 to 8) */}
            <div
              ref={containerRef}
              className="relative my-8 md:my-16 max-w-[960px] mx-auto"
            >
              {/* Dynamic SVG Connection Line for Desktop */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
                fill="none"
              >
                {pathD && (
                  <>
                    {/* Shadow/Glow path */}
                    <motion.path
                      d={pathD}
                      stroke="#8DBD42"
                      strokeWidth="6"
                      className="opacity-20"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={isSectionInView ? { pathLength: 1 } : {}}
                      transition={{ duration: 2.2, ease: "easeInOut" }}
                    />
                    {/* Route dashed path (using deep forest green accent) */}
                    <motion.path
                      d={pathD}
                      stroke="#1A311F"
                      strokeWidth="3"
                      strokeDasharray="8 6"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={isSectionInView ? { pathLength: 1 } : {}}
                      transition={{ duration: 2.2, ease: "easeInOut" }}
                    />
                  </>
                )}
              </svg>

              {/* Static Dashed Line for Mobile (left aligned with node center) */}
              <div className="absolute left-[42px] top-6 bottom-6 w-[2px] border-l-2 border-dashed border-[#1A311F]/30 lg:hidden pointer-events-none" />

              {/* Start Flag (Desktop) */}
              {startPoint && (
                <div
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-25 pointer-events-none hidden lg:flex"
                  style={{ left: startPoint.x, top: startPoint.y }}
                >
                  <span
                    className="bg-[#3F4143] text-white text-[10px] font-black px-2 py-0.5 rounded tracking-widest shadow"
                    style={bodyStyle}
                  >
                    START
                  </span>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1A311F] border-2 border-white shadow" />
                </div>
              )}

              {/* Start Flag (Mobile) */}
              <div className="absolute left-[42px] -top-6 -translate-x-1/2 flex flex-col items-center gap-1 z-25 pointer-events-none lg:hidden">
                <span
                  className="bg-[#3F4143] text-white text-[9px] font-black px-1.5 py-0.5 rounded tracking-wider shadow"
                  style={bodyStyle}
                >
                  START
                </span>
                <div className="w-2 h-2 rounded-full bg-[#1A311F] border border-white shadow" />
              </div>

              {/* Steps container - spacing reduced to space-y-3 */}
              <div className="space-y-3 relative z-10">
                {process.map((step, idx) => {
                  const isLeft = idx % 2 === 0;

                  return (
                    <div
                      key={step.title}
                      className="relative grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-0 items-center min-h-[85px]"
                    >
                      {/* Left Column (Desktop only: Step content if isLeft) */}
                      <div
                        className={`col-span-4 hidden lg:flex flex-col items-end text-right ${isLeft ? "opacity-100" : "pointer-events-none opacity-0"}`}
                      >
                        {isLeft && (
                          <FadeUp delay={0.05} className="max-w-[360px]">
                            <h3
                              className="text-lg text-[#3F4143] font-bold mb-1.5"
                              style={headlineStyle}
                            >
                              {step.title}
                            </h3>
                            <p
                              className="text-[15px] md:text-base text-[#3F4143]/70 leading-relaxed font-light"
                              style={bodyStyle}
                            >
                              {step.description}
                            </p>
                          </FadeUp>
                        )}
                      </div>

                      {/* Center Node (Teardrop Map Pin using deep green accent) */}
                      <div
                        className={`col-span-4 flex items-center relative z-10 ${
                          isLeft
                            ? "lg:justify-start lg:pl-[12.5%]"
                            : "lg:justify-end lg:pr-[12.5%]"
                        } justify-start pl-[18px] lg:pl-0`}
                      >
                        <div
                          className="journey-node relative select-none group cursor-pointer"
                          data-step={step.number}
                        >
                          {/* Teardrop map pin shape pointing down with deep green border/hover */}
                          <div className="w-12 h-12 bg-white border-2 border-[#1A311F] rounded-full rounded-br-none rotate-45 flex items-center justify-center shadow-md transition-all duration-300 group-hover:bg-[#1A311F] group-hover:border-[#1A311F] group-hover:scale-110">
                            <div className="-rotate-45 text-[#1A311F] group-hover:text-white transition-colors duration-300">
                              {step.icon}
                            </div>
                          </div>
                          {/* Floating badge for step number */}
                          <div className="absolute -top-1 -right-1 bg-[#3F4143] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full select-none shadow">
                            {step.number}
                          </div>
                        </div>
                      </div>

                      {/* Right Column (Step content if isRight on desktop, or ALWAYS on mobile) */}
                      <div
                        className={`col-span-4 flex flex-col items-start text-left pl-20 lg:pl-0 ${
                          !isLeft
                            ? "opacity-100"
                            : "lg:pointer-events-none lg:opacity-0"
                        }`}
                      >
                        {/* On desktop: show if isRight */}
                        {!isLeft && (
                          <div className="hidden lg:block">
                            <FadeUp delay={0.05} className="max-w-[360px]">
                              <h3
                                className="text-lg text-[#3F4143] font-bold mb-1.5"
                                style={headlineStyle}
                              >
                                {step.title}
                              </h3>
                              <p
                                className="text-[15px] md:text-base text-[#3F4143]/70 leading-relaxed font-light"
                                style={bodyStyle}
                              >
                                {step.description}
                              </p>
                            </FadeUp>
                          </div>
                        )}
                        {/* On mobile: always show */}
                        <div className="lg:hidden">
                          <FadeUp delay={0.05} className="max-w-[400px]">
                            <h3
                              className="text-lg text-[#3F4143] font-bold mb-1"
                              style={headlineStyle}
                            >
                              {step.title}
                            </h3>
                            <p
                              className="text-[15px] md:text-base text-[#3F4143]/70 leading-relaxed font-light"
                              style={bodyStyle}
                            >
                              {step.description}
                            </p>
                          </FadeUp>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* End Flag (Desktop) */}
              {endPoint && (
                <div
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-25 pointer-events-none hidden lg:flex"
                  style={{ left: endPoint.x, top: endPoint.y }}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1A311F] border-2 border-white shadow" />
                  <span
                    className="bg-[#1A311F] text-white text-[10px] font-black px-2 py-0.5 rounded tracking-widest shadow flex items-center gap-1"
                    style={bodyStyle}
                  >
                    <House size={10} /> HOME
                  </span>
                </div>
              )}

              {/* End Flag (Mobile) */}
              <div className="absolute left-[42px] -bottom-8 -translate-x-1/2 flex flex-col items-center gap-1 z-25 pointer-events-none lg:hidden">
                <div className="w-2 h-2 rounded-full bg-[#1A311F] border border-white shadow" />
                <span
                  className="bg-[#1A311F] text-white text-[9px] font-black px-1.5 py-0.5 rounded tracking-wider shadow flex items-center gap-1"
                  style={bodyStyle}
                >
                  <House size={9} /> HOME
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Case Study Header (Light Section) */}
        <section
          className="pt-10 md:pt-16 pb-0 text-[#3F4143] relative overflow-hidden"
          id="case-study"
          style={{ background: "#FFFFFF" }}
        >
          {/* Soft Seattle Green Glow */}
          <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#8DBD42]/4 blur-[140px] pointer-events-none select-none z-0" />

          <div className="max-w-[1200px] mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
              <div className="lg:col-span-7">
                <FadeUp>
                  <p
                    className="text-[#8DBD42] uppercase tracking-[0.15em] text-sm font-extrabold flex items-center gap-2"
                    style={bodyStyle}
                  >
                    <span className="w-6 h-[2px] bg-[#8DBD42] inline-block" />{" "}
                    Case Study
                  </p>
                  <h2
                    className="text-[27px] md:text-[45px] mt-3 leading-tight text-[#3F4143] font-bold"
                    style={headlineStyle}
                  >
                    Proven Transformation
                  </h2>
                </FadeUp>
              </div>
              <div className="lg:col-span-5 flex flex-col items-start lg:items-end">
                <FadeUp
                  delay={0.08}
                  className="w-full flex flex-col items-start lg:items-end"
                >
                  <p
                    className="text-[#3F4143]/80 text-base md:text-lg leading-relaxed lg:text-right max-w-xl"
                    style={bodyStyle}
                  >
                    See the difference of meticulous craftsmanship and dedicated
                    homeowner advocacy on a real fire damage rebuild project.
                  </p>
                  <Link
                    href="/projects"
                    className="mt-6 inline-flex items-center gap-2 bg-[#8DBD42] hover:bg-[#3F4143] text-white px-8 py-4 uppercase tracking-[0.16em] text-sm font-bold transition-all duration-300"
                    style={bodyStyle}
                  >
                    Our Portfolio <ArrowRight size={13} />
                  </Link>
                </FadeUp>
              </div>
            </div>
          </div>
        </section>

        {/* Case Study Content (Centered on Canvas Base) */}
        <section
          className="pt-4 pb-12 relative z-20"
          style={{ background: "#FFFFFF" }}
        >
          {/* Ambient Background Glow behind slider */}
          <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#8DBD42]/2.5 blur-[140px] pointer-events-none select-none z-0" />

          <div className="max-w-[1200px] mx-auto px-6">
            {/* Before/After Slider container */}
            <div className="relative">
              <FadeUp>
                <div
                  ref={sliderRef}
                  className="relative rounded-2xl overflow-hidden select-none cursor-col-resize shadow-[0_30px_70px_-20px_rgba(0,0,0,0.15)] border-4 border-white"
                  onMouseMove={event => updateSlider(event.clientX)}
                  onTouchMove={event => updateSlider(event.touches[0].clientX)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={AFTER_IMAGE}
                      alt="After restoration"
                      className="w-full h-[360px] md:h-[560px] object-cover"
                    />
                    <div
                      className="absolute top-0 left-0 h-full overflow-hidden"
                      style={{ width: `${sliderPercent}%` }}
                    >
                      <img
                        src={BEFORE_IMAGE}
                        alt="Before restoration"
                        className="w-full h-[360px] md:h-[560px] object-cover max-w-none"
                        style={{
                          width: sliderRef.current
                            ? `${sliderRef.current.clientWidth}px`
                            : "100%",
                        }}
                      />
                    </div>

                    <div
                      className="absolute top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#8DBD42]/40 via-[#8DBD42] to-[#8DBD42]/40 shadow-[0_0_8px_rgba(141,189,66,0.6)]"
                      style={{
                        left: `${sliderPercent}%`,
                        transform: "translateX(-50%)",
                      }}
                    >
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-2 border-[#8DBD42] text-[#8DBD42] flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.15),0_0_15px_rgba(141,189,66,0.35)] transition-all duration-300 hover:scale-110">
                        <ChevronsLeftRight
                          size={20}
                          className="animate-pulse"
                        />
                      </div>
                    </div>

                    <span
                      className="absolute top-5 left-5 rounded-full bg-[#292b2d]/85 backdrop-blur-md text-white border border-white/20 px-5 py-2 uppercase tracking-[0.2em] text-xs font-black shadow-md select-none"
                      style={bodyStyle}
                    >
                      Before
                    </span>
                    <span
                      className="absolute top-5 right-5 rounded-full bg-[#8DBD42]/95 text-white border border-[#9fd546]/30 px-5 py-2 uppercase tracking-[0.2em] text-xs font-black shadow-md shadow-[#8DBD42]/15 select-none"
                      style={bodyStyle}
                    >
                      After
                    </span>
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Testimonial Quote */}
            <FadeUp delay={0.08}>
              <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center px-4 md:px-6 relative z-10">
                <div className="md:col-span-8 border-l-4 border-[#8DBD42] pl-6 py-2">
                  <p
                    className="italic text-[#3F4143]/95 text-lg md:text-2xl leading-relaxed font-serif"
                    style={bodyStyle}
                  >
                    "Heritage worked to make the process as easy and painless as
                    possible. The restoration turned out much nicer than we
                    expected."
                  </p>
                </div>
                <div className="md:col-span-4 md:justify-self-end flex items-center gap-4">
                  <div className="text-right">
                    <p
                      className="uppercase font-extrabold tracking-[0.12em] text-sm text-[#3F4143]"
                      style={bodyStyle}
                    >
                      Private Residence
                    </p>
                    <p
                      className="text-sm text-[#3F4143]/65 mt-0.5"
                      style={bodyStyle}
                    >
                      Full Structural Fire Rebuild
                    </p>
                  </div>
                  <div className="w-11 h-11 rounded-full bg-[#8DBD42]/20 text-[#8DBD42] flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(141,189,66,0.15)]">
                    <House size={20} />
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Testimonials (Editorial Layout) */}
        <section className="py-10 md:py-16 bg-[#FAF9F6] border-y border-gray-200/40 relative overflow-hidden">
          {/* Ambient Background Glow behind Testimonials frame */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#8DBD42]/3.5 blur-[140px] pointer-events-none select-none z-0" />
          <div className="max-w-[1200px] mx-auto px-6 text-center relative z-10">
            <FadeUp>
              <div className="flex flex-col items-center justify-center gap-3 mb-4">
                <p
                  className="text-[#8DBD42] uppercase tracking-[0.16em] text-xs font-extrabold"
                  style={bodyStyle}
                >
                  Testimonials
                </p>
              </div>
              <h2
                className="text-[27px] md:text-[36px] mt-3 text-[#3F4143] font-bold"
                style={headlineStyle}
              >
                Rebuilding Dreams, One Story At A Time
              </h2>
            </FadeUp>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-left">
              {[
                {
                  name: "D. Butler",
                  role: "Homeowner Restoration",
                  quote:
                    "From the start, you worked to make the process as easy and painless as possible. The restoration turned out much nicer than expected.",
                },
                {
                  name: "Linda H.",
                  role: "Master Bath Fire Recovery",
                  quote:
                    "Thank you again for everything during a very stressful time. Their work was first rate and I would enthusiastically recommend Heritage.",
                },
                {
                  name: "Skip & Alpha Beard",
                  role: "Dupont, WA",
                  quote:
                    "Heritage was on scene within 45 minutes. The end result was beautiful and better than before the fire. Professional and honest team.",
                },
              ].map((testimonial, idx) => (
                <FadeUp key={testimonial.name} delay={idx * 0.06}>
                  <article className="relative h-full rounded-none border-l-4 border-l-[#8DBD42] bg-white p-8 shadow-[0_12px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.045)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group border border-[#3F4143]/5 border-l-0">
                    {/* Big Decorative Quote Mark */}
                    <span className="absolute right-6 top-1 text-8xl font-serif text-[#8DBD42]/10 select-none pointer-events-none transition-transform duration-300 group-hover:scale-110">
                      "
                    </span>

                    <div>
                      {/* Rating Stars */}
                      <div className="flex text-[#8DBD42] gap-1">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <Star key={starIndex} size={16} fill="currentColor" />
                        ))}
                      </div>

                      {/* Review Text */}
                      <p
                        className="mt-6 text-[#3F4143]/85 text-base md:text-lg leading-relaxed italic"
                        style={bodyStyle}
                      >
                        "{testimonial.quote}"
                      </p>
                    </div>

                    {/* Reviewer Details */}
                    <div className="mt-8 pt-5 border-t border-gray-200/40 flex items-center justify-between">
                      <div>
                        <p
                          className="uppercase tracking-[0.15em] text-sm font-bold text-[#3F4143]"
                          style={bodyStyle}
                        >
                          {testimonial.name}
                        </p>
                        <p
                          className="text-[15px] text-[#3F4143]/65 mt-0.5"
                          style={bodyStyle}
                        >
                          {testimonial.role}
                        </p>
                      </div>
                      <div
                        className="flex items-center gap-1.5 text-xs font-bold text-[#8DBD42] bg-[#8DBD42]/10 px-2 py-0.5 rounded-full select-none"
                        style={bodyStyle}
                      >
                        <ShieldCheck size={11} /> Verified
                      </div>
                    </div>
                  </article>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>


        <section className="sr-only" id="resources">
          <div>
            <h2>Resources</h2>
            <p>
              Visit FAQ, blogs, and homeowner rights from the navigation menu.
            </p>
          </div>
        </section>

        <section className="sr-only" id="contact">
          <div>
            <h2>Contact</h2>
            <p>
              Call 360-345-1015 or use the contact page for service requests.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
