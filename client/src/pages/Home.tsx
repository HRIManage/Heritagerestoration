import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  animate,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
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
  Send,
  Mail,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Link } from "wouter";
import { buildBreadcrumbSchema } from "@/seo";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

type DisplayReview = {
  name: string;
  role: string;
  quote: string;
  rating?: number;
  profilePhotoUrl?: string;
};

const fallbackTestimonials: DisplayReview[] = [
  {
    name: "D. Butler",
    role: "Homeowner Restoration",
    quote:
      "From the start, you worked to make the process as easy and painless as possible. The restoration turned out much nicer than expected.",
    rating: 5,
  },
  {
    name: "Linda H.",
    role: "Master Bath Fire Recovery",
    quote:
      "Thank you again for everything during a very stressful time. Their work was first rate and I would enthusiastically recommend Heritage.",
    rating: 5,
  },
  {
    name: "Skip & Alpha Beard",
    role: "Dupont, WA",
    quote:
      "Heritage was on scene within 45 minutes. The end result was beautiful and better than before the fire. Professional and honest team.",
    rating: 5,
  },
];

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

function Parallax({
  children,
  amount = 30,
  className = "",
}: {
  children: React.ReactNode;
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [amount, -amount]
  );
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
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
            transition={{ type: "spring", stiffness: 120, damping: 24, mass: 0.9 }}
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
  const [activeStep, setActiveStep] = useState(0);
  const [reviews, setReviews] = useState<DisplayReview[]>(fallbackTestimonials);
  const pageRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const controller = new AbortController();

    async function loadReviews() {
      try {
        const response = await fetch("/api/google-reviews", {
          signal: controller.signal,
        });
        if (!response.ok) return;

        const payload = (await response.json()) as {
          reviews?: Array<{
            name?: string;
            quote?: string;
            rating?: number;
            relativeTime?: string;
            profilePhotoUrl?: string;
          }>;
        };

        const googleReviews = (payload.reviews || [])
          .filter(review => review.quote)
          .slice(0, 3)
          .map(review => ({
            name: review.name || "Google reviewer",
            role: review.relativeTime
              ? `Verified Google Review · ${review.relativeTime}`
              : "Verified Google Review",
            quote: review.quote || "",
            rating: review.rating || 5,
            profilePhotoUrl: review.profilePhotoUrl,
          }));

        if (googleReviews.length > 0) {
          setReviews(googleReviews);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.warn("Using fallback testimonials.", error);
        }
      }
    }

    loadReviews();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (reduceMotion || !heroRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline
        .fromTo(
          "[data-gsap-hero-image]",
          { scale: 1.08, xPercent: 1.5 },
          { scale: 1, xPercent: 0, duration: 4.4, ease: "power2.out" }
        )
        .fromTo(
          "[data-gsap-hero-item]",
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 1.35, stagger: 0.18 },
          0.18
        )
        .fromTo(
          "[data-gsap-hero-button]",
          { autoAlpha: 0, y: 22, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 1.1, stagger: 0.16 },
          0.9
        )
        .fromTo(
          "[data-gsap-explore]",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 1.15 },
          1.35
        );

      gsap.utils.toArray<HTMLElement>("[data-gsap-section]").forEach(section => {
        const items = section.querySelectorAll("[data-gsap-reveal]");

        gsap.fromTo(
          section,
          { autoAlpha: 0.92, y: 34 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              once: true,
            },
          }
        );

        if (items.length) {
          gsap.fromTo(
            items,
            { autoAlpha: 0, y: 26 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 72%",
                once: true,
              },
            }
          );
        }
      });
    }, pageRef);

    return () => ctx.revert();
  }, [reduceMotion]);


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
      watermarkColor: "text-[#145126]/5 group-hover:text-[#E05A47]/10",
      iconColor:
        "text-[#145126] bg-[#8DBD42]/10 group-hover:bg-[#E05A47] group-hover:text-white",
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
      watermarkColor: "text-[#145126]/5 group-hover:text-[#3A82F6]/10",
      iconColor:
        "text-[#145126] bg-[#8DBD42]/10 group-hover:bg-[#3A82F6] group-hover:text-white",
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
      watermarkColor: "text-[#145126]/5 group-hover:text-[#4F46E5]/10",
      iconColor:
        "text-[#145126] bg-[#8DBD42]/10 group-hover:bg-[#4F46E5] group-hover:text-white",
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
      watermarkColor: "text-[#145126]/5 group-hover:text-[#D97706]/10",
      iconColor:
        "text-[#145126] bg-[#8DBD42]/10 group-hover:bg-[#D97706] group-hover:text-white",
      hoverTextColor: "group-hover:text-[#D97706]",
    },
  ];

  const process = [
    {
      number: "01",
      title: "Immediate Emergency Response (Day of Loss)",
      icon: <Flame size={20} />,
      items: [
        {
          label: "Claim Initialization",
          text: "We guide you through the critical first steps of contacting your insurance carrier and properly opening your property claim.",
        },
        {
          label: "Emergency Asset Stabilization",
          text: "Our team immediately secures the property (tarping, board-ups, and structural stabilization) to prevent further environmental or physical damage.",
        },
      ],
    },
    {
      number: "02",
      title: "Advanced Forensic Documentation",
      icon: <Layers size={20} />,
      items: [
        {
          label: "Comprehensive 3D Site Mapping",
          text: "We execute a complete photographic documentation and high-definition 3D virtual tour of the unaffected and damaged areas to create an indisputable record for your adjuster.",
        },
        {
          label: "Environmental Hazard Testing",
          text: "Certified testing for asbestos and lead is immediately performed to ensure all hazardous materials are identified prior to disturbing any structures.",
        },
      ],
    },
    {
      number: "03",
      title: "Asset Preservation & Sentimental Salvage",
      icon: <ShieldCheck size={20} />,
      items: [
        {
          label: "Sentimental Item Recovery",
          text: "We meticulously locate and extract irreplaceable personal and family heirlooms.",
        },
        {
          label: "Secure Document Retrieval",
          text: "Critical legal, financial, and business documents are carefully recovered and secured.",
        },
        {
          label: "Emergency Textile Cleaning",
          text: "Essential clothing and textile items are immediately triaged and sent for specialized restoration cleaning.",
        },
      ],
    },
    {
      number: "04",
      title: "Scope Alignment & Regulatory Coordination",
      icon: <Calculator size={20} />,
      items: [
        {
          label: "Joint Preliminary Estimation",
          text: "We write a comprehensive scope of repairs and build a preliminary estimate directly alongside your insurance adjuster using industry-standard platforms.",
        },
        {
          label: "Jurisdictional Navigation & Fire Walk",
          text: "We initiate the municipal permit process and conduct an official \"Fire Walk\" on-site with the local Building Official to establish baseline code requirements.",
        },
      ],
    },
    {
      number: "05",
      title: "Site Clearance & Content Auditing",
      icon: <HardHat size={20} />,
      items: [
        {
          label: "Strategic Debris Removal",
          text: "Safe, efficient extraction of non-salvageable structural materials and fire debris from the premises.",
        },
        {
          label: "Itemized Content Chain-of-Custody",
          text: "Every single item on the property is documented, cataloged, and classified as salvageable or non-salvageable for your contents claim.",
        },
      ],
    },
    {
      number: "06",
      title: "Project Initiation & Design Selection",
      icon: <Clock size={20} />,
      items: [
        {
          label: "Repair Process Activation",
          text: "Transitioning the project from the mitigation phase into active structural reconstruction.",
        },
        {
          label: "Alignment Meeting",
          text: "A formal job site alignment conference between the Homeowner, Property Manager, and your dedicated Project Manager to establish timelines and expectations.",
        },
        {
          label: "Material Selection & Customization",
          text: "The design phase begins. Clients choose finishes, cabinetry, and fixtures, allowing an opportunity to integrate desired modern upgrades or layout changes.",
        },
      ],
    },
    {
      number: "07",
      title: "Precision Reconstruction",
      icon: <Hammer size={20} />,
      items: [
        {
          label: "Structural Rebuild",
          text: "Execution of the approved scope of work under strict construction standards, featuring recurring milestone meetings with clients to review progress, framing, mechanicals, and finishes.",
        },
      ],
    },
    {
      number: "08",
      title: "Project Handover & Warranty Execution",
      icon: <House size={20} />,
      items: [
        {
          label: "Closeout & Content Return",
          text: "Upon final inspection and completion of the work, a formal Certificate of Completion is executed, and your securely stored, restored contents are safely returned to the property.",
        },
        {
          label: "Industry-Leading Warranty Activation",
          text: "Your project transitions to our elite 5-Year Warranty, guaranteeing the long-term integrity of our construction.",
        },
      ],
    },
  ];

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
          content="Heritage Restoration provides 24/7 emergency fire, water, and storm damage restoration across Western Washington. IICRC certified, 60-minute response, direct insurance billing since 2004. Serving Lacey, Tacoma, Chehalis, Puyallup &amp; more."
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

      <div ref={pageRef} className="bg-[#FAF9F5]">
        {/* Homepage Hero */}
        <section
          id="home-hero"
          ref={heroRef}
          className="relative overflow-hidden bg-[#0f1a10] pt-[112px] sm:pt-[116px] lg:pt-[120px]"
        >
          <img
            data-gsap-hero-image
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
                "linear-gradient(to bottom, transparent 55%, rgba(15,26,16,0.55) 85%, rgba(20,81,38,1) 100%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 10% 88%, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.82) 20%, rgba(255,255,255,0.38) 42%, transparent 68%)",
            }}
          />
          {/* Mobile-only extra white overlay */}
          <div className="absolute inset-0 bg-white/60 lg:hidden pointer-events-none" />

          <motion.a
            data-gsap-explore
            href="#services"
            className="hidden lg:flex absolute right-8 bottom-[108px] z-20 flex-col items-center gap-4 text-[#2F3335]/65 hover:text-[#8DBD42] transition-colors duration-500"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="text-[11px] font-black uppercase tracking-[0.26em] [writing-mode:vertical-rl]"
              style={bodyStyle}
            >
              Explore
            </span>
            <motion.span
              className="h-16 w-px bg-current origin-top"
              animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.35, 0.9, 0.35] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.a>

          {/* Hero content */}
          <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-0 py-8 lg:py-10">
            <div className="max-w-[600px]">
              <FadeUp triggerImmediately={true} delay={0.05}>
                <p
                  data-gsap-hero-item
                  className="inline-flex items-center gap-3 uppercase tracking-[0.2em] text-[11px] font-extrabold mb-7 text-[#8DBD42]"
                  style={bodyStyle}
                >
                  <span className="w-8 h-[2px] bg-[#8DBD42]" />
                  Professional Property Restoration
                </p>
              </FadeUp>
              <FadeUp triggerImmediately={true} delay={0.15}>
                <h1 data-gsap-hero-item className="leading-[1.03]" style={headlineStyle}>
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
                  data-gsap-hero-item
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
                <motion.div
                  className="mt-9 flex flex-wrap items-center gap-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.18, delayChildren: 0.16 } },
                  }}
                >
                  <motion.a
                    data-gsap-hero-button
                    href="tel:+13603451015"
                    className="group inline-flex items-center gap-4 bg-[#8DBD42] hover:bg-[#97cf4f] text-[#145126] pl-8 pr-4 py-3 rounded-none text-xs font-black uppercase tracking-[0.16em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.025] active:scale-[0.98] shadow-sm hover:shadow-[0_8px_24px_rgba(141,189,66,0.35)]"
                    style={bodyStyle}
                    variants={{
                      hidden: { opacity: 0, y: 18, scale: 0.92 },
                      visible: { opacity: 1, y: 0, scale: 1 },
                    }}
                    transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -2, scale: 1.025 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Call 24/7 Dispatch
                    <span className="w-8 h-8 rounded-none bg-white/20 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                      <Phone size={13} className="stroke-[3]" />
                    </span>
                  </motion.a>
                  <motion.a
                    data-gsap-hero-button
                    href="/contact"
                    className="group inline-flex items-center gap-4 border-2 border-[#145126]/30 hover:border-[#145126] text-[#145126] pl-8 pr-4 py-[10px] rounded-none text-xs font-black uppercase tracking-[0.16em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-white/60 hover:bg-white/90 hover:scale-[1.025] active:scale-[0.98] shadow-sm hover:shadow-md"
                    style={bodyStyle}
                    variants={{
                      hidden: { opacity: 0, y: 18, scale: 0.92 },
                      visible: { opacity: 1, y: 0, scale: 1 },
                    }}
                    transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -2, scale: 1.025 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Request Assessment
                    <span className="w-8 h-8 rounded-none bg-[#145126]/6 text-[#145126] flex items-center justify-center transition-transform duration-500 group-hover:translate-x-0.5 group-hover:scale-110">
                      →
                    </span>
                  </motion.a>
                </motion.div>
              </FadeUp>
            </div>
          </div>

          {/* Scrolling ticker strip */}
          <div className="relative z-10 bg-[#145126] py-8 overflow-hidden">
            <style>{`
              @keyframes home-ticker {
                from { transform: translateX(0); }
                to { transform: translateX(-50%); }
              }
              .home-ticker { animation: home-ticker 45s linear infinite; }
              .home-ticker:hover { animation-play-state: paused; }
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
        <section data-gsap-section className="bg-white border-t border-gray-100">
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
                <div data-gsap-reveal className="contents">
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
                </div>
              </FadeUp>
              <FadeUp delay={0.1} className="flex flex-col gap-5 pt-10 md:pt-0 md:pl-12 md:items-center md:text-center">
                <div data-gsap-reveal className="contents">
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
                </div>
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
                  ].map((badge, i) => (
                    <motion.img
                      key={badge.alt}
                      src={badge.src}
                      alt={badge.alt}
                      initial={{ opacity: 0, scale: 0.7, y: 24 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.9, delay: i * 0.16, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ scale: 1.04, y: -3 }}
                      className="h-24 md:h-28 w-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.18)]"
                    />
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Specialized Restoration Section */}
        <section
          data-gsap-section
          className="relative py-16 md:py-24 overflow-hidden bg-[#F7F4EE]"
          id="services"
        >
          <div className="max-w-[1280px] mx-auto px-6 md:px-8">
            {/* Header */}
            <FadeUp>
              <span
                className="inline-block bg-[#145126]/6 text-[#145126] text-[10px] font-black uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-none border border-[#145126]/12 select-none"
                style={bodyStyle}
              >
                Our Expertise
              </span>
              <h2
                className="mt-3 text-[40px] md:text-[56px] leading-[1.02] font-bold text-[#2F3335]"
                style={headlineStyle}
              >
                Specialized Restoration
              </h2>
              <p
                className="mt-5 max-w-[600px] text-[17px] leading-relaxed text-[#3F4143]/70"
                style={bodyStyle}
              >
                Select a service line to explore your options. Crafted for
                clarity, speed, and premium guidance when every decision matters.
              </p>
            </FadeUp>

            <motion.div
              className="mt-10 md:mt-12 h-px origin-left bg-[#3F4143]/12"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.65 }}
              transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Service columns */}
            <motion.div
              className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.28 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.14, delayChildren: 0.18 } },
              }}
            >
              {services.map((service, idx) => (
                <motion.div
                  key={service.title}
                  data-gsap-reveal
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={service.href}
                    className="block group"
                  >
                    <div className="p-2 rounded-none bg-black/[0.012] border border-black/[0.04] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.025] hover:shadow-[0_20px_45px_rgba(20,81,38,0.06)] h-full">
                      <div className="bg-white rounded-none p-6 md:p-8 h-full border border-black/[0.015] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] flex flex-col justify-between">
                        <div>
                          {/* Icon */}
                          <span
                            className={`grid h-12 w-12 place-items-center rounded-none transition-transform duration-500 group-hover:scale-110 ${service.iconColor}`}
                          >
                            {service.icon}
                          </span>

                          <h3
                            className={`mt-6 text-[21px] md:text-[23px] leading-[1.1] font-bold text-[#2F3335] transition-colors duration-500 ${service.hoverTextColor}`}
                            style={headlineStyle}
                          >
                            <span className="relative inline-block">
                              {service.title}
                              <span
                                className={`absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 ${service.accentBarClass}`}
                              />
                            </span>
                          </h3>
                          <p
                            className="mt-4 text-[14.5px] leading-relaxed text-[#3F4143]/70 font-light"
                            style={bodyStyle}
                          >
                            {service.description}
                          </p>
                        </div>

                        <span
                          className={`relative z-10 mt-6 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#2F3335] transition-colors duration-500 ${service.hoverTextColor}`}
                          style={bodyStyle}
                        >
                          Explore Service
                          <ArrowRight
                            size={14}
                            className="transition-transform duration-500 group-hover:translate-x-1"
                          />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Our Promise Section */}
        <section
          data-gsap-section
          id="promise"
          className="pb-10 md:pb-16 pt-8 md:pt-12 text-[#3F4143] relative overflow-hidden"
          style={{ background: "#FFFFFF" }}
        >
          {/* Soft Seattle Green Glow */}
          <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] rounded-full bg-[#8DBD42]/4.5 blur-[130px] pointer-events-none select-none z-0" />
          <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start relative z-10">
            {/* LEFT: Photo deck + quote below it */}
            <FadeUp className="lg:col-span-6 order-2 lg:order-1 flex flex-col items-center lg:items-start gap-10 mt-8 lg:mt-8">
              <Parallax amount={26} className="w-full flex justify-center lg:justify-start">
                <PhotoDeck />
              </Parallax>
              <div className="motion-soft-lift border-l-4 border-[#8DBD42] pl-6 pr-6 py-5 bg-[#FAF9F6] border border-[#3F4143]/5 rounded-none italic text-lg md:text-xl text-[#3F4143]/90 font-sans font-light leading-relaxed w-full mx-0">
                Most importantly, we are advocates for you. Our priority is
                protecting your home and your best interests, not the insurance
                company.
              </div>
            </FadeUp>

            {/* RIGHT: text content + buttons */}
            <FadeUp delay={0.08} className="lg:col-span-6 order-1 lg:order-2">
              <span className="inline-block bg-[#145126]/6 text-[#145126] text-[10px] font-black uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-none border border-[#145126]/12 select-none font-sans mb-4">
                Our Promise
              </span>
              <h2 className="text-[30px] md:text-[44px] mt-3 leading-[1.08] text-[#3F4143] font-serif font-bold">
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
                  className="group inline-flex items-center gap-4 bg-[#8DBD42] hover:bg-[#97cf4f] text-[#145126] pl-8 pr-4 py-3 rounded-none text-xs font-black uppercase tracking-[0.16em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.025] active:scale-[0.98] shadow-sm hover:shadow-[0_8px_24px_rgba(141,189,66,0.35)]"
                >
                  Start Your Recovery
                  <span className="w-8 h-8 rounded-none bg-white/20 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                    <Phone size={12} />
                  </span>
                </a>
                <a
                  href="/contact"
                  className="group inline-flex items-center gap-4 border-2 border-[#145126]/30 hover:border-[#145126] text-[#145126] pl-8 pr-4 py-[10px] rounded-none text-xs font-black uppercase tracking-[0.16em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-white/60 hover:bg-white/90 hover:scale-[1.025] active:scale-[0.98] shadow-sm hover:shadow-md"
                >
                  Request Assessment
                  <span className="w-8 h-8 rounded-none bg-[#145126]/6 text-[#145126] flex items-center justify-center transition-transform duration-500 group-hover:translate-x-0.5 group-hover:scale-110">
                    →
                  </span>
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

        {/* Process Section */}
        <section
          data-gsap-section
          className="py-14 md:py-20 overflow-hidden relative bg-[#FAF9F6]"
          id="process"
        >
          <div className="max-w-[1180px] mx-auto px-6 relative z-10">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-10 md:mb-12"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="lg:col-span-5">
                <span
                  className="inline-block bg-[#145126]/6 text-[#145126] text-[10px] font-black uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-none border border-[#145126]/12 select-none mb-3"
                  style={bodyStyle}
                >
                  What To Expect
                </span>
                <h2
                  className="text-[30px] md:text-[44px] mt-2 text-[#3F4143] font-bold leading-tight"
                  style={headlineStyle}
                >
                  What happens after you call.
                </h2>
              </div>
              <p
                className="lg:col-span-6 lg:col-start-7 text-[#3F4143]/70 leading-relaxed text-[16px] md:text-[17px]"
                style={bodyStyle}
              >
                Restoration is not one big event. It is a sequence of decisions:
                stop the damage, document the loss, align the scope, then rebuild
                carefully. This is the practical order we follow with homeowners.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] gap-8 lg:gap-14 border-t border-[#3F4143]/12 pt-8 md:pt-10">
              {/* LEFT — step titles (hover/tap to expand on the right) */}
              <div className="flex flex-col">
                {process.map((step, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <motion.button
                      key={step.number}
                      data-gsap-reveal
                      type="button"
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.72, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
                      onMouseEnter={() => setActiveStep(idx)}
                      onFocus={() => setActiveStep(idx)}
                      onClick={() => setActiveStep(idx)}
                      aria-pressed={isActive}
                      className={`group flex items-center gap-4 border-b border-[#3F4143]/10 py-4 md:py-[18px] text-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? "bg-[#145126]/4 px-4" : "hover:bg-white/50 px-4"}`}
                    >
                      <span
                        className={`w-7 shrink-0 text-[13px] font-black uppercase tracking-[0.12em] transition-colors duration-300 ${isActive ? "text-[#8DBD42]" : "text-[#3F4143]/35"}`}
                        style={bodyStyle}
                      >
                        {step.number}
                      </span>
                      <span
                        className={`flex-1 text-[18px] md:text-[21px] leading-[1.15] font-bold transition-colors duration-300 ${isActive ? "text-[#145126]" : "text-[#3F4143]/55 group-hover:text-[#3F4143]/80"}`}
                        style={headlineStyle}
                      >
                        {step.title}
                      </span>
                      <span
                        className={`shrink-0 transition-all duration-300 ${isActive ? "translate-x-0 text-[#8DBD42] opacity-100" : "-translate-x-1 text-[#3F4143]/30 opacity-0 group-hover:opacity-100"}`}
                      >
                        <ArrowRight size={18} />
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* RIGHT — active step detail expands here */}
              <div className="lg:sticky lg:top-28 self-start relative">
                {/* Clean Flat Accent Background behind active step card */}
                <div className="absolute -inset-3 bg-[#8DBD42]/8 rounded-none z-0 pointer-events-none" />

                <div className="relative z-10">
                  <div className="p-2 rounded-none bg-black/[0.012] border border-black/[0.04]">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, x: 18, filter: "blur(6px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                      className="border border-[#3F4143]/12 bg-white p-7 md:p-10 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.2)] rounded-none shadow-[inset_0_1px_1px_rgba(255,255,255,1)]"
                    >
                      <div className="flex items-center gap-4">
                        <span className="grid h-12 w-12 place-items-center bg-[#8DBD42]/12 text-[#145126] rounded-none border border-[#145126]/8">
                          {process[activeStep].icon}
                        </span>
                        <span
                          className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#8DBD42]"
                          style={bodyStyle}
                        >
                          <span className="w-4 h-px bg-[#8DBD42] inline-block" />
                          {process[activeStep].number} of {process.length}
                        </span>
                      </div>
                      <h3
                        className="mt-5 text-[24px] md:text-[29px] leading-[1.1] font-bold text-[#2F3335]"
                        style={headlineStyle}
                      >
                        {process[activeStep].title}
                      </h3>
                      <div className="mt-6 space-y-5">
                        {process[activeStep].items.map(item => (
                          <div key={item.label} className="border-l-2 border-[#8DBD42]/40 pl-4">
                            <p
                              className="text-[14px] font-black text-[#3F4143]"
                              style={bodyStyle}
                            >
                              {item.label}
                            </p>
                            <p
                              className="mt-1 text-[14px] md:text-[15px] leading-relaxed text-[#3F4143]/68"
                              style={bodyStyle}
                            >
                              {item.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Study Header (Light Section) */}
        <section
          data-gsap-section
          className="pt-10 md:pt-16 pb-0 text-[#3F4143] relative overflow-hidden"
          id="case-study"
          style={{ background: "#FFFFFF" }}
        >
          {/* Soft Seattle Green Glow */}
          <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#8DBD42]/4 blur-[140px] pointer-events-none select-none z-0" />

          <div className="max-w-[1200px] mx-auto px-6 relative z-10">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="lg:col-span-7">
                <FadeUp>
                  <p
                    className="inline-flex items-center gap-2.5 text-[#8DBD42] uppercase tracking-[0.2em] text-[11px] font-extrabold"
                    style={bodyStyle}
                  >
                    <span className="w-5 h-px bg-[#8DBD42] inline-block" />
                    Proven Results
                  </p>
                  <h2
                    className="text-[30px] md:text-[44px] mt-3 leading-tight text-[#3F4143] font-bold"
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
                    className="group mt-6 inline-flex items-center gap-2 bg-[#8DBD42] hover:bg-[#3F4143] text-white px-8 py-4 uppercase tracking-[0.16em] text-sm font-bold premium-btn"
                    style={bodyStyle}
                  >
                    Our Portfolio <ArrowRight size={13} className="motion-link-arrow" />
                  </Link>
                </FadeUp>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Case Study Content (Centered on Canvas Base) */}
        <section
          data-gsap-section
          className="pt-4 pb-12 relative z-20"
          style={{ background: "#FFFFFF" }}
        >
          {/* Ambient Background Glow behind slider */}
          <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#8DBD42]/2.5 blur-[140px] pointer-events-none select-none z-0" />

          <div className="max-w-[1200px] mx-auto px-6">
            {/* Before/After Slider container */}
            <div className="relative">
              {/* Skewed Green Accent Background Stripe behind the slider */}
              <div className="absolute -top-8 -bottom-8 left-[10%] w-[32%] bg-[#8DBD42]/10 skew-x-[-15deg] rounded-3xl z-0 pointer-events-none" />

              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 36 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    ref={sliderRef}
                    className="motion-soft-lift relative rounded-2xl overflow-hidden select-none cursor-col-resize shadow-[0_30px_70px_-20px_rgba(0,0,0,0.15)] border-4 border-white"
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
                </motion.div>
              </div>
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
        <section data-gsap-section id="testimonials" className="py-10 md:py-16 bg-[#FAF9F6] border-y border-gray-200/40 relative overflow-hidden">
          {/* Ambient Background Glow behind Testimonials frame */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#8DBD42]/3.5 blur-[140px] pointer-events-none select-none z-0" />
          <div className="max-w-[1200px] mx-auto px-6 text-center relative z-10">
            <FadeUp>
              <div className="flex flex-col items-center justify-center gap-3 mb-4">
                <span
                  className="inline-block bg-[#145126]/6 text-[#145126] text-[10px] font-black uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-none border border-[#145126]/12 select-none"
                  style={bodyStyle}
                >
                  Client Stories
                </span>
              </div>
              <h2
                className="text-[30px] md:text-[40px] mt-3 text-[#3F4143] font-bold leading-tight"
                style={headlineStyle}
              >
                Rebuilding Dreams, One Story At A Time
              </h2>
            </FadeUp>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-left">
              {reviews.map((testimonial, idx) => (
                <FadeUp key={testimonial.name} delay={idx * 0.06}>
                  <div className="p-2 rounded-none bg-black/[0.012] border border-black/[0.04] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] hover:shadow-[0_20px_45px_rgba(20,81,38,0.06)] group h-full">
                    <article data-gsap-reveal className="relative h-full rounded-none border-l-4 border-l-[#8DBD42] bg-white p-8 flex flex-col justify-between overflow-hidden border border-[#3F4143]/5 border-l-0 shadow-[inset_0_1px_1px_rgba(255,255,255,1)]">
                      {/* Big Decorative Quote Mark */}
                      <span className="absolute right-6 top-1 text-8xl font-serif text-[#8DBD42]/10 select-none pointer-events-none transition-transform duration-700 group-hover:scale-105">
                        "
                      </span>

                      <div>
                        {/* Rating Stars */}
                        <motion.div
                          className="flex text-[#8DBD42] gap-1"
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.8 }}
                          variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.06, delayChildren: 0.16 } },
                          }}
                        >
                          {Array.from({ length: 5 }).map((_, starIndex) => (
                            <motion.span
                              key={starIndex}
                              variants={{
                                hidden: { opacity: 0, y: 6, scale: 0.8 },
                                visible: { opacity: 1, y: 0, scale: 1 },
                              }}
                              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                            >
                              <Star
                                size={16}
                                fill={
                                  starIndex < Math.round(testimonial.rating || 5)
                                    ? "currentColor"
                                    : "none"
                                }
                                className={
                                  starIndex < Math.round(testimonial.rating || 5)
                                    ? ""
                                    : "text-[#3F4143]/20"
                                }
                              />
                            </motion.span>
                          ))}
                        </motion.div>

                        {/* Review Text */}
                        <p
                          className="mt-6 text-[#3F4143]/85 text-base md:text-lg leading-relaxed italic"
                          style={bodyStyle}
                        >
                          "{testimonial.quote}"
                        </p>
                      </div>

                      {/* Reviewer Details */}
                      <div className="mt-8 pt-5 border-t border-gray-200/40 flex items-center justify-between transition-transform duration-700 group-hover:translate-x-1">
                        <div className="flex items-center gap-3">
                          {testimonial.profilePhotoUrl && (
                            <img
                              src={testimonial.profilePhotoUrl}
                              alt=""
                              className="h-10 w-10 rounded-none object-cover border border-[#3F4143]/10"
                              referrerPolicy="no-referrer"
                            />
                          )}
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
                        </div>
                        <div
                          className="flex items-center gap-1.5 text-xs font-bold text-[#145126] bg-[#8DBD42]/10 px-2.5 py-1 rounded-none select-none border border-[#145126]/8"
                          style={bodyStyle}
                        >
                          <ShieldCheck size={11} /> Verified
                        </div>
                      </div>
                    </article>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA + Contact Form */}
        <section id="home-contact" className="bg-transparent py-16 md:py-24">
          <div className="max-w-[1180px] mx-auto px-6 md:px-8">
            <FadeUp>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                <div className="lg:col-span-7">
                  <span
                    className="inline-block bg-[#145126]/6 text-[#145126] text-[10px] font-black uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-none border border-[#145126]/12 select-none mb-4"
                    style={bodyStyle}
                  >
                    Request Help
                  </span>
                  <h2
                    className="mt-3 text-[34px] md:text-[52px] leading-[1.04] font-bold text-[#145126]"
                    style={headlineStyle}
                  >
                    Need restoration support today?
                  </h2>
                  <p
                    className="mt-5 max-w-[620px] text-[16px] md:text-[17px] leading-relaxed text-[#3F4143]/72"
                    style={bodyStyle}
                  >
                    Send a quick message and our dispatch team will help you decide the next step, whether it is emergency stabilization, documentation, or a full repair assessment.
                  </p>

                  <form
                    action="mailto:office@firewaterstorm.com"
                    method="post"
                    encType="text/plain"
                    className="mt-8 space-y-6 font-sans"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="home-name"
                          className="text-xs font-bold uppercase tracking-wider text-[#3F4143]/70"
                        >
                          Full Name *
                        </label>
                        <input
                          id="home-name"
                          name="name"
                          type="text"
                          required
                          className="w-full bg-white border border-[#3F4143]/15 focus:border-[#8DBD42] focus:ring-1 focus:ring-[#8DBD42] focus:outline-none p-3.5 transition-all duration-300 text-sm rounded-none shadow-sm hover:border-[#3F4143]/30"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="home-phone"
                          className="text-xs font-bold uppercase tracking-wider text-[#3F4143]/70"
                        >
                          Phone Number *
                        </label>
                        <input
                          id="home-phone"
                          name="phone"
                          type="tel"
                          required
                          className="w-full bg-white border border-[#3F4143]/15 focus:border-[#8DBD42] focus:ring-1 focus:ring-[#8DBD42] focus:outline-none p-3.5 transition-all duration-300 text-sm rounded-none shadow-sm hover:border-[#3F4143]/30"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="home-email"
                          className="text-xs font-bold uppercase tracking-wider text-[#3F4143]/70"
                        >
                          Email Address *
                        </label>
                        <input
                          id="home-email"
                          name="email"
                          type="email"
                          required
                          className="w-full bg-white border border-[#3F4143]/15 focus:border-[#8DBD42] focus:ring-1 focus:ring-[#8DBD42] focus:outline-none p-3.5 transition-all duration-300 text-sm rounded-none shadow-sm hover:border-[#3F4143]/30"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="home-service"
                          className="text-xs font-bold uppercase tracking-wider text-[#3F4143]/70"
                        >
                          Restoration Service
                        </label>
                        <select
                          id="home-service"
                          name="service"
                          defaultValue=""
                          className="w-full bg-white border border-[#3F4143]/15 focus:border-[#8DBD42] focus:ring-1 focus:ring-[#8DBD42] focus:outline-none p-3.5 transition-all duration-300 text-sm rounded-none shadow-sm hover:border-[#3F4143]/30 appearance-none cursor-pointer"
                        >
                          <option value="" disabled>
                            Select a service category...
                          </option>
                          <option value="fire">Fire Damage Restoration</option>
                          <option value="water">Water Damage Mitigation</option>
                          <option value="storm">Storm Damage Recovery</option>
                          <option value="contents">Contents Pack-Out & Clean</option>
                          <option value="other">General Inquiry / Assessment</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="home-message"
                        className="text-xs font-bold uppercase tracking-wider text-[#3F4143]/70"
                      >
                        Describe the Loss or Request
                      </label>
                      <textarea
                        id="home-message"
                        name="message"
                        rows={6}
                        className="w-full bg-white border border-[#3F4143]/15 focus:border-[#8DBD42] focus:ring-1 focus:ring-[#8DBD42] focus:outline-none p-3.5 transition-all duration-300 text-sm rounded-none shadow-sm hover:border-[#3F4143]/30 resize-y"
                        placeholder="Tell us what happened and what kind of help you need..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="group inline-flex items-center gap-4 bg-[#8DBD42] hover:bg-[#97cf4f] text-[#145126] pl-8 pr-4 py-3 rounded-none text-xs font-black uppercase tracking-[0.16em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.025] active:scale-[0.98] shadow-sm hover:shadow-[0_8px_24px_rgba(141,189,66,0.35)] cursor-pointer"
                    >
                      Send Message
                      <span className="w-8 h-8 rounded-none bg-white/20 flex items-center justify-center transition-transform duration-500 group-hover:translate-x-0.5 group-hover:scale-110">
                        <Send size={13} />
                      </span>
                    </button>
                  </form>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative overflow-hidden bg-[#145126] p-8 md:p-10 text-white shadow-[0_28px_80px_rgba(20,81,38,0.22)]">
                    <div className="absolute right-[-70px] top-[-70px] h-56 w-56 rounded-full bg-[#8DBD42]/18 blur-3xl" />
                    <div className="absolute left-[-60px] bottom-[-70px] h-52 w-52 rounded-full bg-white/10 blur-3xl" />
                    <div className="relative z-10">
                      <p
                        className="text-[#B7DC73] uppercase tracking-[0.18em] text-[11px] font-black"
                        style={bodyStyle}
                      >
                        24/7 Dispatch
                      </p>
                      <h3
                        className="mt-3 text-[28px] md:text-[34px] leading-tight font-bold text-white"
                        style={headlineStyle}
                      >
                        Fast answers when the damage cannot wait.
                      </h3>
                      <div className="mt-8 space-y-5">
                        <a href="tel:+13603451015" className="flex items-start gap-4 group">
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#8DBD42] text-[#145126] transition-transform duration-300 group-hover:scale-105">
                            <Phone size={18} />
                          </span>
                          <span>
                            <span className="block text-[11px] font-black uppercase tracking-[0.16em] text-white/55">Call Now</span>
                            <span className="mt-1 block text-[18px] font-bold text-white">(360) 345-1015</span>
                          </span>
                        </a>
                        <a href="mailto:office@firewaterstorm.com" className="flex items-start gap-4 group">
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#8DBD42] text-[#145126] transition-transform duration-300 group-hover:scale-105">
                            <Mail size={18} />
                          </span>
                          <span>
                            <span className="block text-[11px] font-black uppercase tracking-[0.16em] text-white/55">Email</span>
                            <span className="mt-1 block text-[15px] font-bold text-white">office@firewaterstorm.com</span>
                          </span>
                        </a>
                        <div className="flex items-start gap-4">
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#8DBD42] text-[#145126]">
                            <MapPin size={18} />
                          </span>
                          <span>
                            <span className="block text-[11px] font-black uppercase tracking-[0.16em] text-white/55">Local Offices</span>
                            <span className="mt-1 block text-[15px] font-bold text-white">Lacey and Chehalis, WA</span>
                          </span>
                        </div>
                      </div>
                      <div className="mt-8 border-t border-white/14 pt-5">
                        <p className="text-sm leading-relaxed text-white/70">
                          Licensed, bonded, IICRC certified, and ready for fire, water, storm, and contents restoration.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
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
