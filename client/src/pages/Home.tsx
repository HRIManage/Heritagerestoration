import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  animate,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
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
  ChevronDown,
  Send,
  Mail,
  Quote,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Link, useLocation } from "wouter";
import { buildBreadcrumbSchema } from "@/seo";
import {
  isWeb3FormsConfigured,
  mailtoFallback,
  submitIntake,
} from "@/lib/web3forms";
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

function SpinCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
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
        {display}
        {suffix}
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
      className="relative w-full max-w-[580px] aspect-[1.35] cursor-pointer select-none group"
      onClick={handleNext}
    >
      {images.map((img, idx) => {
        const stackPos = (idx - currentIndex + images.length) % images.length;
        const isVisible = stackPos < 4;

        let rotate = 0;
        let zIndex = 10 - stackPos;
        let scale = 1 - stackPos * 0.035;
        let translateY = stackPos * 12;
        let translateX = stackPos * 8;

        if (stackPos === 0) {
          rotate = 4;
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
              opacity: stackPos === 3 ? 0.75 : 1,
            }}
            whileHover={
              stackPos === 0 ? { scale: 1.015, rotate: rotate + 0.5 } : {}
            }
            transition={{
              type: "spring",
              stiffness: 130,
              damping: 26,
              mass: 0.8,
            }}
            className="absolute inset-0 rounded-none overflow-hidden shadow-[0_12px_36px_rgba(20,81,38,0.04)] border border-[#3F4143]/12 bg-white p-2 flex items-center justify-center"
          >
            <img
              src={img}
              alt={`Gallery image ${idx + 1}`}
              className="w-full h-full object-cover rounded-none pointer-events-none"
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
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const pageRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const [, setLocation] = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState("");

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");

    // If no key is configured yet, fall back to mailto so the form still works.
    if (!isWeb3FormsConfigured()) {
      mailtoFallback(formData);
      return;
    }

    setSending(true);
    try {
      const success = await submitIntake(formData);
      if (success) {
        setLocation("/thank-you");
      } else {
        setFormError(
          "Something went wrong submitting your request. Please call us at (360) 345-1015."
        );
      }
    } catch {
      setFormError(
        "Network error. Please try again or call us directly at (360) 345-1015."
      );
    } finally {
      setSending(false);
    }
  };

  const handlePrevReview = () => {
    setCurrentReviewIndex(prev => (prev === 0 ? reviews.length - 1 : prev - 1));
  };
  const handleNextReview = () => {
    setCurrentReviewIndex(prev => (prev + 1) % reviews.length);
  };

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
          .slice(0, 12)
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
      accentColor: "#E05A47",
      accentBarClass: "bg-[#E05A47]",
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
      accentColor: "#3A82F6",
      accentBarClass: "bg-[#3A82F6]",
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
      accentColor: "#4F46E5",
      accentBarClass: "bg-[#4F46E5]",
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
      accentColor: "#D97706",
      accentBarClass: "bg-[#D97706]",
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
          text: 'We initiate the municipal permit process and conduct an official "Fire Walk" on-site with the local Building Official to establish baseline code requirements.',
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
          Heritage Restoration | Fire, Water &amp; Storm Damage Experts in
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

      <div ref={pageRef} className="bg-[#FAF9F6]">
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
                "linear-gradient(105deg, rgba(250,249,246,1) 0%, rgba(250,249,246,0.98) 28%, rgba(250,249,246,0.82) 44%, rgba(250,249,246,0.25) 60%, transparent 78%)",
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
                "radial-gradient(ellipse at 10% 88%, rgba(250,249,246,0.96) 0%, rgba(250,249,246,0.82) 20%, rgba(250,249,246,0.38) 42%, transparent 68%)",
            }}
          />
          {/* Mobile-only extra white overlay */}
          <div className="absolute inset-0 bg-[#FAF9F6]/60 lg:hidden pointer-events-none" />

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
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
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
                <h1
                  data-gsap-hero-item
                  className="leading-[1.03]"
                  style={headlineStyle}
                >
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
                  As dedicated homeowner advocates, we handle the full
                  complexity of disaster recovery, so you don't have to. Locally
                  owned and operated since 2004.
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
                    visible: {
                      transition: {
                        staggerChildren: 0.18,
                        delayChildren: 0.16,
                      },
                    },
                  }}
                >
                  <motion.a
                    data-gsap-hero-button
                    href="tel:+13603451015"
                    className="group inline-flex items-center gap-2.5 bg-[#8DBD42] hover:bg-[#97cf4f] text-[#145126] px-8 py-4 uppercase tracking-[0.16em] text-xs font-black transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(141,189,66,0.25)] active:translate-y-0"
                    style={bodyStyle}
                    variants={{
                      hidden: { opacity: 0, y: 18, scale: 0.92 },
                      visible: { opacity: 1, y: 0, scale: 1 },
                    }}
                    transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -2, scale: 1.025 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Phone size={14} className="stroke-[3]" />
                    Call 24/7 Dispatch
                  </motion.a>
                  <Link href="/contact">
                    <motion.a
                      data-gsap-hero-button
                      className="group inline-flex items-center gap-2 border-2 border-[#145126]/30 hover:border-[#145126] text-[#145126] px-8 py-[14px] uppercase tracking-[0.16em] text-xs font-black transition-all duration-300 bg-white/60 hover:bg-white/90 hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)] active:translate-y-0 cursor-pointer"
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
                      <span className="text-[#145126] text-base leading-none ml-1 transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </motion.a>
                  </Link>
                </motion.div>
              </FadeUp>
            </div>
          </div>

          {/* Scrolling ticker strip */}
          <div className="relative z-10 bg-[#8DBD42] py-6 md:py-8 overflow-hidden">
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
                    "5-Year Warranty",
                  ].map(item => (
                    <span key={item} className="flex items-center">
                      <span className="px-8 md:px-12 font-semibold text-[16px] md:text-[22px] uppercase tracking-[0.18em] md:tracking-[0.22em] text-[#145126]">
                        {item}
                      </span>
                      <span className="text-[#145126]/30 text-[14px] md:text-[18px]">
                        ✦
                      </span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Office Locations + Trust Badges — unified section */}
        <section
          data-gsap-section
          className="bg-white border-t border-gray-100"
        >
          <div className="max-w-[860px] mx-auto px-8 pt-14 pb-0 md:pt-18">
            {/* Label */}
            <FadeUp>
              <p
                className="text-[#8DBD42] uppercase tracking-[0.18em] text-sm font-black text-center mb-10"
                style={bodyStyle}
              >
                Local Office Locations
              </p>
            </FadeUp>

            {/* Two offices */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#3F4143]/10">
              <FadeUp
                delay={0.05}
                className="flex flex-col gap-5 pb-10 md:pb-0 md:pr-12 md:items-center md:text-center"
              >
                <div data-gsap-reveal className="contents">
                  <h3
                    className="text-[26px] font-bold text-[#2a2c2e]"
                    style={headlineStyle}
                  >
                    North Office
                  </h3>
                  <p
                    className="text-[#3F4143]/65 text-[16px] leading-relaxed flex items-start gap-2"
                    style={bodyStyle}
                  >
                    <MapPin
                      size={15}
                      className="text-[#8DBD42] mt-1 shrink-0"
                    />
                    <a
                      href="https://maps.google.com/?q=8695+Martin+Way+E+Unit+103+Lacey+WA+98516"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#3F4143] transition-colors"
                    >
                      8695 Martin Way E, Unit 103
                      <br />
                      Lacey, WA 98516
                    </a>
                  </p>
                  <a
                    href="tel:+13603451015"
                    className="inline-flex items-center gap-2 bg-[#8DBD42] hover:bg-[#7dac35] text-[#2b2d2f] px-7 py-3 uppercase tracking-wider text-[12px] font-black transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_6px_18px_rgba(141,189,66,0.35)] active:translate-y-0 active:shadow-none w-fit"
                    style={bodyStyle}
                  >
                    <Phone size={13} className="stroke-[3]" /> Call North Office
                  </a>
                </div>
              </FadeUp>
              <FadeUp
                delay={0.1}
                className="flex flex-col gap-5 pt-10 md:pt-0 md:pl-12 md:items-center md:text-center"
              >
                <div data-gsap-reveal className="contents">
                  <h3
                    className="text-[26px] font-bold text-[#2a2c2e]"
                    style={headlineStyle}
                  >
                    South Office
                  </h3>
                  <p
                    className="text-[#3F4143]/65 text-[16px] leading-relaxed flex items-start gap-2"
                    style={bodyStyle}
                  >
                    <MapPin
                      size={15}
                      className="text-[#8DBD42] mt-1 shrink-0"
                    />
                    <a
                      href="https://maps.google.com/?q=1581+N.+National+Ave+Chehalis+WA+98532"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#3F4143] transition-colors"
                    >
                      1581 N. National Ave
                      <br />
                      Chehalis, WA 98532
                    </a>
                  </p>
                  <a
                    href="tel:+13603451015"
                    className="inline-flex items-center gap-2 bg-[#8DBD42] hover:bg-[#7dac35] text-[#2b2d2f] px-7 py-3 uppercase tracking-wider text-[12px] font-black transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_6px_18px_rgba(141,189,66,0.35)] active:translate-y-0 active:shadow-none w-fit"
                    style={bodyStyle}
                  >
                    <Phone size={13} className="stroke-[3]" /> Call South Office
                  </a>
                </div>
              </FadeUp>
            </div>

            {/* 24hr bar + badges combined */}
            <FadeUp delay={0.15}>
              <div className="mt-10 border-t border-[#3F4143]/10 pt-8 pb-10 flex flex-col items-center gap-8">
                <div className="flex items-center justify-center gap-2 px-2">
                  <Clock size={15} className="text-[#8DBD42] shrink-0" />
                  <span
                    className="text-center text-[#3F4143]/60 uppercase tracking-[0.12em] sm:tracking-[0.18em] text-[11px] sm:text-[13px] font-extrabold"
                    style={bodyStyle}
                  >
                    24 Hours a Day · 7 Days a Week · 365 Days a Year
                  </span>
                </div>
                <div className="grid grid-cols-3 items-center gap-4 w-full max-w-[330px] mx-auto sm:flex sm:max-w-none sm:gap-12 md:gap-20">
                  {[
                    {
                      src: "/photo/emergency-badge-new-2.png",
                      alt: "24 HR Emergency Response",
                    },
                    {
                      src: "/photo/iicrc-badge-new-3.png",
                      alt: "IICRC Certified",
                    },
                    {
                      src: "/photo/warranty-badge-new-3.png",
                      alt: "5-Year Warranty",
                    },
                  ].map((badge, i) => (
                    <motion.img
                      key={badge.alt}
                      src={badge.src}
                      alt={badge.alt}
                      initial={{ opacity: 0, scale: 0.7, y: 24 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{
                        duration: 0.9,
                        delay: i * 0.16,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      whileHover={{ scale: 1.04, y: -3 }}
                      className="w-full h-auto object-contain sm:w-auto sm:h-24 md:h-28 drop-shadow-[0_4px_12px_rgba(0,0,0,0.18)]"
                    />
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Specialized Restoration Section */}
        <section
          className="relative py-16 md:py-24 overflow-hidden bg-[#F7F4EE]"
          id="services"
        >
          <div className="max-w-[1160px] mx-auto px-6 md:px-8">
            {/* Header */}
            <FadeUp className="mb-14 md:mb-16">
              <p
                className="inline-flex items-center gap-2.5 text-[#8DBD42] uppercase tracking-[0.2em] text-[11px] font-extrabold"
                style={bodyStyle}
              >
                <span className="w-5 h-px bg-[#8DBD42] inline-block" />
                Our Expertise
              </p>
              <h2
                className="mt-3 text-[40px] md:text-[52px] leading-[1.02] font-bold text-[#2F3335]"
                style={headlineStyle}
              >
                Specialized Restoration
              </h2>
            </FadeUp>

            {/* Service columns — clean, open, no borders */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.09, delayChildren: 0.04 },
                },
              }}
            >
              {services.map(service => (
                <motion.div
                  key={service.title}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.div
                    className="group border border-transparent p-4 sm:p-6 -mx-4 sm:-mx-6 cursor-pointer"
                    style={{ borderWidth: "0.5px" }}
                    initial="rest"
                    whileHover="hovered"
                    animate="rest"
                    variants={{
                      rest: {
                        borderColor: "rgba(0,0,0,0)",
                        backgroundColor: "rgba(0,0,0,0)",
                        y: 0,
                      },
                      hovered: {
                        borderColor: service.accentColor,
                        backgroundColor: "rgba(255,255,255,0.72)",
                        y: -4,
                      },
                    }}
                    transition={{ type: "spring", stiffness: 140, damping: 20 }}
                  >
                    <Link href={service.href} className="block">
                      {/* Icon */}
                      <span
                        className={`inline-flex items-center justify-center w-11 h-11 transition-all duration-500 group-hover:scale-105 ${service.iconColor}`}
                      >
                        {service.icon}
                      </span>

                      {/* Title — color matches border accent via variant propagation */}
                      <motion.h3
                        className="mt-6 text-[22px] md:text-[24px] leading-tight font-bold"
                        style={headlineStyle}
                        variants={{
                          rest: { color: "#2F3335" },
                          hovered: { color: service.accentColor },
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 140,
                          damping: 20,
                        }}
                      >
                        {service.title}
                      </motion.h3>

                      {/* Description */}
                      <p
                        className="mt-4 text-[14.5px] leading-relaxed text-[#3F4143]/65 font-light"
                        style={bodyStyle}
                      >
                        {service.description}
                      </p>

                      {/* CTA */}
                      <span
                        className="mt-5 inline-flex items-center gap-1.5 text-[11.5px] font-black uppercase tracking-[0.14em] text-[#3F4143]/50 group-hover:text-[#2F3335] transition-colors duration-500"
                        style={bodyStyle}
                      >
                        Learn More
                        <ArrowRight
                          size={13}
                          className="transition-transform duration-500 group-hover:translate-x-1"
                        />
                      </span>
                    </Link>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Our Promise Section */}
        <section
          id="promise"
          className="pb-14 md:pb-20 pt-10 md:pt-14 text-[#3F4143] relative overflow-hidden"
          style={{ background: "#FFFFFF" }}
        >
          {/* Soft Seattle Green Glow */}
          <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] rounded-full bg-[#8DBD42]/4.5 blur-[130px] pointer-events-none select-none z-0" />
          <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center relative z-10">
            {/* LEFT: Premium Editorial Image Deck */}
            <FadeUp className="lg:col-span-6 order-2 lg:order-1 flex flex-col gap-4 mt-8 lg:mt-0 items-center justify-center">
              <Parallax
                amount={22}
                className="w-full flex justify-center lg:justify-start"
              >
                <PhotoDeck />
              </Parallax>
            </FadeUp>

            {/* RIGHT: text content + buttons */}
            <FadeUp delay={0.08} className="lg:col-span-6 order-1 lg:order-2">
              <p className="inline-flex items-center gap-2.5 text-[#8DBD42] uppercase tracking-[0.2em] text-[11px] font-extrabold font-sans mb-4">
                <span className="w-5 h-px bg-[#8DBD42] inline-block" />
                Our Promise
              </p>
              <h2 className="text-[26px] sm:text-[30px] md:text-[40px] lg:text-[44px] mt-3 leading-[1.08] text-[#3F4143] font-serif font-bold">
                <span className="block whitespace-nowrap">
                  We Are Not Just Technicians.
                </span>
                <span className="block whitespace-nowrap">
                  We Are Your Neighbors.
                </span>
              </h2>
              <p className="mt-6 text-[#3F4143]/80 text-lg leading-relaxed font-sans font-light">
                We are proudly local and homeowner focused. When you call
                Heritage, you are not getting an out-of-town franchise. You are
                getting a team that lives in this community and stands behind
                every repair decision.
              </p>

              <div className="border-l-2 border-[#8DBD42] pl-5 italic text-[#3F4143]/90 text-[17px] leading-relaxed font-serif mt-8">
                "Most importantly, we are advocates for you. Our priority is
                protecting your home and your best interests, not the insurance
                company."
              </div>

              <div className="mt-8 flex flex-wrap gap-4 font-sans">
                <a
                  href="tel:+13603451015"
                  className="bg-[#8DBD42] hover:bg-[#97cf4f] text-[#145126] px-8 py-4 uppercase tracking-[0.16em] text-xs font-black transition-all duration-300 inline-flex items-center gap-2 rounded-none hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(141,189,66,0.25)] active:translate-y-0"
                >
                  <Phone size={12} /> Start Your Recovery
                </a>
                <Link
                  href="/contact"
                  className="border-2 border-[#145126]/30 hover:border-[#145126] text-[#145126] px-8 py-4 uppercase tracking-[0.16em] text-xs font-black transition-all duration-300 rounded-none hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)] active:translate-y-0 text-center"
                >
                  Request Assessment
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Process Section */}
        <section
          className="py-14 md:py-20 overflow-hidden relative bg-transparent text-[#3F4143]"
          id="process"
        >
          <div className="max-w-[1180px] mx-auto px-6 relative z-10">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 mb-8 md:mb-10"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="lg:col-span-5">
                <p
                  className="text-[#8DBD42] uppercase tracking-[0.18em] text-xs font-extrabold"
                  style={bodyStyle}
                >
                  What To Expect
                </p>
                <h2
                  className="text-[34px] md:text-[50px] mt-2 text-[#2F3335] font-bold leading-tight"
                  style={headlineStyle}
                >
                  What happens after you call.
                </h2>
              </div>
              <div className="lg:col-span-6 lg:col-start-7" />
            </motion.div>

            {/* MOBILE — accordion: each step's detail expands directly below its title */}
            <div className="lg:hidden border-t border-[#145126]/10">
              {process.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <div
                    key={step.number}
                    className="border-b border-[#145126]/10"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveStep(idx)}
                      aria-expanded={isActive}
                      className={`group flex w-full items-center gap-3 py-5 text-left transition-colors duration-300 ${isActive ? "text-[#145126]" : "text-[#3F4143]/60"}`}
                    >
                      <span
                        className={`w-8 shrink-0 text-[12px] font-black tracking-[0.16em] transition-colors duration-300 ${isActive ? "text-[#8DBD42]" : "text-[#8DBD42]/75"}`}
                        style={bodyStyle}
                      >
                        {step.number}
                      </span>
                      <span
                        className={`flex-1 text-[17px] leading-[1.2] font-bold transition-colors duration-300 ${isActive ? "text-[#145126]" : "text-[#3F4143]/70"}`}
                        style={headlineStyle}
                      >
                        {step.title}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-[#8DBD42] transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.35,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pb-6 pl-11 pr-1 space-y-4">
                            {step.items.map(item => (
                              <div
                                key={item.label}
                                className="border-l-2 border-[#8DBD42] pl-4"
                              >
                                <p
                                  className="text-[13.5px] font-black text-[#3F4143]"
                                  style={bodyStyle}
                                >
                                  {item.label}
                                </p>
                                <p
                                  className="mt-1 text-[14px] leading-relaxed text-[#3F4143]/72"
                                  style={bodyStyle}
                                >
                                  {item.text}
                                </p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* DESKTOP — step titles (hover/tap) + sticky detail panel */}
            <div className="hidden lg:grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] gap-12 border-t border-[#145126]/10 pt-9">
              {/* LEFT — step titles (hover/tap to expand on the right) */}
              <div className="flex flex-col">
                {process.map((step, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <motion.button
                      key={step.number}
                      type="button"
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{
                        duration: 0.75,
                        delay: idx * 0.045,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      onMouseEnter={() => setActiveStep(idx)}
                      onFocus={() => setActiveStep(idx)}
                      onClick={() => setActiveStep(idx)}
                      aria-pressed={isActive}
                      className={`group flex items-center gap-5 py-6 text-left transition-colors duration-300 ${isActive ? "text-[#145126]" : "text-[#3F4143]/55 hover:text-[#2F3335]"}`}
                    >
                      <span
                        className={`w-10 shrink-0 text-[13px] font-black tracking-[0.18em] transition-colors duration-300 ${isActive ? "text-[#8DBD42]" : "text-[#8DBD42]/75"}`}
                        style={bodyStyle}
                      >
                        {step.number}
                      </span>
                      <span
                        className={`flex-1 text-[24px] leading-[1.15] font-bold transition-colors duration-300 ${isActive ? "text-[#145126]" : "text-[#3F4143]/60 group-hover:text-[#2F3335]"}`}
                        style={headlineStyle}
                      >
                        {step.title}
                      </span>
                      <span
                        className={`shrink-0 transition-all duration-300 ${isActive ? "translate-x-0 text-[#8DBD42] opacity-100" : "-translate-x-1 text-[#8DBD42]/80 opacity-0 group-hover:opacity-100"}`}
                      >
                        <ArrowRight size={18} />
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* RIGHT — active step detail expands here */}
              <div
                className={`lg:sticky self-start ${
                  activeStep >= 5
                    ? "lg:top-[6.5rem] xl:top-[7.5rem]"
                    : "lg:top-28"
                }`}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, x: -24, scale: 0.97 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      scale: 1,
                      y: activeStep >= 5 ? 60 : 0,
                    }}
                    exit={{ opacity: 0, x: 18, scale: 0.97 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="border border-[#E2E2DD] bg-white p-8 md:p-12 text-[#145126] shadow-[0_18px_45px_rgba(63,65,67,0.06)]"
                  >
                    <div className="flex items-center gap-4">
                      <span className="grid h-12 w-12 place-items-center border border-[#8DBD42]/18 bg-[#F4F8EE] text-[#145126]">
                        {process[activeStep].icon}
                      </span>
                      <span
                        className="text-[13px] font-black uppercase tracking-[0.16em] text-[#8DBD42]"
                        style={bodyStyle}
                      >
                        Step {process[activeStep].number}
                      </span>
                    </div>
                    <h3
                      className="mt-5 text-[26px] md:text-[32px] leading-[1.1] font-bold text-[#3F4143]"
                      style={headlineStyle}
                    >
                      {process[activeStep].title}
                    </h3>
                    <div className="mt-6 space-y-5">
                      {process[activeStep].items.map(item => (
                        <div
                          key={item.label}
                          className="border-l-2 border-[#8DBD42] pl-4"
                        >
                          <p
                            className="text-[14px] font-black text-[#3F4143]"
                            style={bodyStyle}
                          >
                            {item.label}
                          </p>
                          <p
                            className="mt-1 text-[14px] md:text-[15px] leading-relaxed text-[#3F4143]/72"
                            style={bodyStyle}
                          >
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Case Study / Proven Results Section */}
        <section
          id="case-study"
          className="py-14 md:py-20 text-[#3F4143] relative overflow-hidden bg-white border-t border-gray-100"
        >
          {/* Soft Seattle Green Glow */}
          <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#8DBD42]/4 blur-[140px] pointer-events-none select-none z-0" />

          <div className="max-w-[1080px] mx-auto px-6 relative z-10">
            <FadeUp className="text-center max-w-2xl mx-auto mb-12">
              <p
                className="inline-flex items-center gap-2.5 text-[#8DBD42] uppercase tracking-[0.2em] text-[11px] font-extrabold"
                style={bodyStyle}
              >
                <span className="w-5 h-px bg-[#8DBD42] inline-block" />
                Proven Results
                <span className="w-5 h-px bg-[#8DBD42] inline-block" />
              </p>
              <h2
                className="text-[34px] md:text-[46px] mt-4 leading-[1.1] text-[#3F4143] font-bold"
                style={headlineStyle}
              >
                Proven Transformation
              </h2>
              <p
                className="mt-4 text-[#3F4143]/70 text-base md:text-lg leading-relaxed"
                style={bodyStyle}
              >
                Compare the detailed progress of a full structural rebuild. Drag
                the slider to reveal the craftsmanship that goes into every home
                restoration project.
              </p>
            </FadeUp>

            {/* Before/After Slider container */}
            <div className="relative">
              <div className="relative z-10">
                <FadeUp>
                  <div
                    ref={sliderRef}
                    className="motion-soft-lift relative rounded-none overflow-hidden select-none cursor-col-resize shadow-[0_25px_60px_rgba(20,81,38,0.04)] border border-[#3F4143]/12"
                    onMouseMove={event => updateSlider(event.clientX)}
                    onTouchMove={event =>
                      updateSlider(event.touches[0].clientX)
                    }
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={AFTER_IMAGE}
                        alt="After restoration"
                        className="w-full h-[360px] md:h-[540px] object-cover"
                      />
                      <div
                        className="absolute top-0 left-0 h-full overflow-hidden"
                        style={{ width: `${sliderPercent}%` }}
                      >
                        <img
                          src={BEFORE_IMAGE}
                          alt="Before restoration"
                          className="w-full h-[360px] md:h-[540px] object-cover max-w-none"
                          style={{
                            width: sliderRef.current
                              ? `${sliderRef.current.clientWidth}px`
                              : "100%",
                          }}
                        />
                      </div>

                      <div
                        className="absolute top-0 bottom-0 w-[2px] bg-[#8DBD42] shadow-[0_0_8px_rgba(141,189,66,0.4)]"
                        style={{
                          left: `${sliderPercent}%`,
                          transform: "translateX(-50%)",
                        }}
                      >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-none bg-white border border-[#8DBD42] text-[#145126] flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105">
                          <ChevronsLeftRight size={18} />
                        </div>
                      </div>

                      <span
                        className="absolute top-5 left-5 rounded-none bg-black/75 text-white border border-white/10 px-4 py-1.5 uppercase tracking-[0.16em] text-[10px] font-black select-none z-10"
                        style={bodyStyle}
                      >
                        Before
                      </span>
                      <span
                        className="absolute top-5 right-5 rounded-none bg-[#145126] text-white border border-[#145126]/20 px-4 py-1.5 uppercase tracking-[0.16em] text-[10px] font-black select-none z-10"
                        style={bodyStyle}
                      >
                        After
                      </span>
                    </div>
                  </div>
                </FadeUp>
              </div>
            </div>

            <FadeUp delay={0.08} className="mt-10 flex justify-center">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 bg-[#8DBD42] hover:bg-[#3F4143] text-white px-8 py-4 uppercase tracking-[0.16em] text-xs font-black transition-all duration-300 rounded-none hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(141,189,66,0.25)] active:translate-y-0"
                style={bodyStyle}
              >
                View Full Portfolio <ArrowRight size={13} />
              </Link>
            </FadeUp>
          </div>
        </section>

        {/* Testimonials (Editorial Layout) */}
        <section
          id="testimonials"
          className="py-14 md:py-20 bg-transparent relative overflow-hidden text-[#3F4143]"
        >
          <div className="max-w-[1200px] mx-auto px-6 relative z-10">
            <FadeUp>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div>
                  <p
                    className="text-[#8DBD42] uppercase tracking-[0.16em] text-xs font-extrabold"
                    style={bodyStyle}
                  >
                    Testimonials
                  </p>
                  <h2
                    className="text-[34px] md:text-[44px] mt-3 !text-[#145126] font-bold leading-tight font-serif"
                    style={headlineStyle}
                  >
                    Rebuilding Dreams, One Story At A Time
                  </h2>
                </div>
                {/* Clean Top-Right Carousel Navigation Controls */}
                <div className="flex items-center gap-3 self-start md:self-end">
                  <button
                    onClick={handlePrevReview}
                    className="w-10 h-10 border border-[#3F4143]/12 hover:bg-[#145126] hover:text-white hover:border-[#145126] transition-all flex items-center justify-center rounded-none text-[#145126] cursor-pointer"
                    aria-label="Previous testimonial"
                  >
                    <span className="rotate-180 block text-base font-black leading-none">
                      →
                    </span>
                  </button>
                  <button
                    onClick={handleNextReview}
                    className="w-10 h-10 border border-[#3F4143]/12 hover:bg-[#145126] hover:text-white hover:border-[#145126] transition-all flex items-center justify-center rounded-none text-[#145126] cursor-pointer"
                    aria-label="Next testimonial"
                  >
                    <span className="block text-base font-black leading-none">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </FadeUp>

            {/* Testimonials Grid Wrapper */}
            <div className="relative mt-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-transparent">
                {[0, 1, 2].map(offset => {
                  const review =
                    reviews[(currentReviewIndex + offset) % reviews.length];
                  if (!review) return null;

                  const rating = Math.round(review.rating || 5);
                  const isGoogleReview = review.role.includes("Google");

                  return (
                    <FadeUp
                      key={`${offset}-${currentReviewIndex}-${review.name}`}
                      className={`${offset === 1 ? "hidden md:block" : offset === 2 ? "hidden lg:block" : "block"} w-full`}
                    >
                      <article className="group relative flex h-full min-h-[250px] flex-col justify-between bg-white px-7 py-9 text-left border border-[#3F4143]/8 shadow-[0_20px_50px_rgba(20,81,38,0.015)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(20,81,38,0.03)] rounded-none">
                        <div className="relative z-10 flex flex-col">
                          <div className="mb-5 flex items-center justify-between gap-4">
                            {review.profilePhotoUrl ? (
                              <img
                                src={review.profilePhotoUrl}
                                alt={review.name}
                                className="h-10 w-10 rounded-full border border-black/5 object-cover"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/5 bg-[#FAF9F6] text-[#145126]">
                                <Quote size={15} className="stroke-[1.7]" />
                              </div>
                            )}
                            <div className="flex justify-center gap-1 text-[#8DBD42]">
                              {Array.from({ length: 5 }).map((_, starIndex) => (
                                <Star
                                  key={starIndex}
                                  size={13}
                                  fill={
                                    starIndex < rating ? "currentColor" : "none"
                                  }
                                  className={
                                    starIndex < rating ? "" : "text-slate-200"
                                  }
                                />
                              ))}
                            </div>
                          </div>

                          <p
                            className="text-[14px] leading-relaxed text-[#3F4143]/80 transition-colors duration-300 font-serif italic"
                            style={bodyStyle}
                          >
                            "{review.quote}"
                          </p>
                        </div>

                        <div className="relative z-10 mt-6 border-t border-[#3F4143]/6 pt-4">
                          <h4
                            className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-[#145126]"
                            style={bodyStyle}
                          >
                            {review.name}
                          </h4>
                          <p
                            className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#3F4143]/45"
                            style={bodyStyle}
                          >
                            {review.role}
                          </p>
                          {isGoogleReview ? (
                            <span
                              className="mt-3.5 inline-flex w-fit items-center gap-1.5 border border-[#8DBD42]/30 bg-[#8DBD42]/6 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-[#145126]"
                              style={bodyStyle}
                            >
                              <ShieldCheck size={10} />
                              Google Verified
                            </span>
                          ) : null}
                        </div>
                      </article>
                    </FadeUp>
                  );
                })}
              </div>
              <div className="mt-10 flex justify-center">
                <a
                  href="https://g.page/r/CWy4NzZ8yjqCEBM/review"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-[#8DBD42] bg-[#8DBD42] px-6 py-3.5 text-[11px] font-black uppercase tracking-[0.14em] text-[#145126] transition-all duration-300 hover:-translate-y-[2px] hover:bg-[#7dac35] rounded-none hover:shadow-[0_8px_20px_rgba(141,189,66,0.25)]"
                  style={bodyStyle}
                >
                  Leave a review
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA + Contact Form */}
        <section id="home-contact" className="bg-transparent py-16 md:py-24">
          <div className="max-w-[1180px] mx-auto px-6 md:px-8">
            <FadeUp>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                <div className="lg:col-span-7">
                  <p
                    className="text-[#8DBD42] uppercase tracking-[0.18em] text-xs font-extrabold mb-4"
                    style={bodyStyle}
                  >
                    Request Help
                  </p>
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
                    Send a quick message and our dispatch team will help you
                    decide the next step, whether it is emergency stabilization,
                    documentation, or a full repair assessment.
                  </p>

                  <form
                    onSubmit={handleFormSubmit}
                    className="mt-8 space-y-6 font-sans"
                  >
                    {formError && (
                      <div className="p-4 bg-red-50 border border-red-200 text-red-700 font-semibold text-sm text-center rounded-none">
                        {formError}
                      </div>
                    )}

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
                          value={formData.name}
                          onChange={handleFormChange}
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
                          value={formData.phone}
                          onChange={handleFormChange}
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
                          value={formData.email}
                          onChange={handleFormChange}
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
                          value={formData.service}
                          onChange={handleFormChange}
                          className="w-full bg-white border border-[#3F4143]/15 focus:border-[#8DBD42] focus:ring-1 focus:ring-[#8DBD42] focus:outline-none p-3.5 transition-all duration-300 text-sm rounded-none shadow-sm hover:border-[#3F4143]/30 appearance-none cursor-pointer"
                        >
                          <option value="">Select a service category...</option>
                          <option value="fire">Fire Damage Restoration</option>
                          <option value="water">Water Damage Mitigation</option>
                          <option value="storm">Storm Damage Recovery</option>
                          <option value="contents">
                            Contents Pack-Out & Clean
                          </option>
                          <option value="other">
                            General Inquiry / Assessment
                          </option>
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
                        value={formData.message}
                        onChange={handleFormChange}
                        className="w-full bg-white border border-[#3F4143]/15 focus:border-[#8DBD42] focus:ring-1 focus:ring-[#8DBD42] focus:outline-none p-3.5 transition-all duration-300 text-sm rounded-none shadow-sm hover:border-[#3F4143]/30 resize-y"
                        placeholder="Tell us what happened and what kind of help you need..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sending}
                      className="inline-flex items-center gap-2 bg-[#8DBD42] hover:bg-[#97cf4f] disabled:opacity-60 disabled:cursor-not-allowed text-[#145126] px-8 py-4 uppercase tracking-[0.16em] text-xs font-black transition-all duration-300 rounded-none hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(141,189,66,0.25)] active:translate-y-0 cursor-pointer"
                    >
                      <Send size={14} />{" "}
                      {sending ? "Sending..." : "Send Message"}
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
                        <a
                          href="tel:+13603451015"
                          className="flex items-start gap-4 group"
                        >
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#8DBD42] text-[#145126] transition-transform duration-300 group-hover:scale-105">
                            <Phone size={18} />
                          </span>
                          <span>
                            <span className="block text-[11px] font-black uppercase tracking-[0.16em] text-white/55">
                              Call Now
                            </span>
                            <span className="mt-1 block text-[18px] font-bold text-white">
                              (360) 345-1015
                            </span>
                          </span>
                        </a>
                        <a
                          href="mailto:office@firewaterstorm.com"
                          className="flex items-start gap-4 group"
                        >
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#8DBD42] text-[#145126] transition-transform duration-300 group-hover:scale-105">
                            <Mail size={18} />
                          </span>
                          <span>
                            <span className="block text-[11px] font-black uppercase tracking-[0.16em] text-white/55">
                              Email
                            </span>
                            <span className="mt-1 block text-[15px] font-bold text-white">
                              office@firewaterstorm.com
                            </span>
                          </span>
                        </a>
                        <div className="flex items-start gap-4">
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#8DBD42] text-[#145126]">
                            <MapPin size={18} />
                          </span>
                          <span>
                            <span className="block text-[11px] font-black uppercase tracking-[0.16em] text-white/55">
                              Local Offices
                            </span>
                            <span className="mt-1 block text-[15px] font-bold text-white">
                              Lacey and Chehalis, WA
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="mt-8 border-t border-white/14 pt-5">
                        <p className="text-sm leading-relaxed text-white/70">
                          Licensed, bonded, IICRC certified, and ready for fire,
                          water, storm, and contents restoration.
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
