import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  animate,
  useScroll,
  useMotionValueEvent,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowLeft,
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
  ChevronRight,
  Check,
  Building2,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Link, useLocation } from "wouter";
import { buildBreadcrumbSchema } from "@/seo";
import { LOCATIONS } from "@/data/locations";
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
const SERVICE_FIRE = "/photo/card-fire.jpg";
const SERVICE_WATER = "/photo/card-water.jpg";
const SERVICE_STORM = "/photo/card-storm.jpg";
const SERVICE_CONTENTS = "/photo/card-contents.jpg";
const PROJECT_ONE = "/photo/recent-project-1.jpg";
const PROJECT_TWO = "/photo/recent-project-2.jpg";
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
import TrustBadges from "@/components/TrustBadges";
import StaticTrustBar from "@/components/StaticTrustBar";

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
  // Only the hero animates in; everything below it is simply there on scroll.
  if (!triggerImmediately) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }
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

/** Past projects for the rotating before/after deck in the "neighbors" section. */
const PROJECT_DECK = [
  { slug: "kitchen-fire", title: "Kitchen fire, interior rebuild" },
  { slug: "storm", title: "Storm damage, tree removal and repair" },
  { slug: "exterior-fire", title: "House fire, exterior rebuild" },
  { slug: "living-room", title: "Fire damage, living room restored" },
  { slug: "kitchen", title: "Kitchen fire, full rebuild" },
];

/**
 * A stack of project cards, each showing the before photo over the after photo.
 * Clicking (or pressing Enter on) the stack brings up the next project; it also
 * advances every few seconds, pausing on hover or focus, and never auto-advances
 * for people who prefer reduced motion. On desktops its width follows the screen
 * height so the whole section fits on one screen.
 */
function ProjectDeck() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const total = PROJECT_DECK.length;
  const next = () => setIndex(i => (i + 1) % total);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = setInterval(() => setIndex(i => (i + 1) % total), 5000);
    return () => clearInterval(timer);
  }, [paused, reduceMotion, total]);

  // Resting pose for the top card and the two cards peeking out behind it
  const poses = [
    { x: 0, y: 0, rotate: 0, scale: 1 },
    { x: 18, y: 10, rotate: 3, scale: 0.96 },
    { x: -16, y: 18, rotate: -3, scale: 0.92 },
  ];

  return (
    <div
      className="relative mx-auto w-full max-w-[520px] lg:max-w-[min(540px,calc((100svh_-_290px)/1.25))]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
    >
      <div
        className="grid cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#44781a]"
        role="button"
        tabIndex={0}
        aria-label={`Project ${index + 1} of ${total}: ${PROJECT_DECK[index].title}. Show the next project`}
        onClick={next}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            next();
          }
        }}
      >
        <AnimatePresence initial={false}>
          {[2, 1, 0].map(depth => {
            const project = PROJECT_DECK[(index + depth) % total];
            return (
              <motion.figure
                key={project.slug}
                className="[grid-area:1/1] bg-white p-3 shadow-[0_18px_40px_rgba(23,61,36,0.16)] border border-[#E6E1D7]"
                style={{ zIndex: 3 - depth }}
                initial={{ ...poses[2], opacity: 0 }}
                animate={{ ...poses[depth], opacity: 1 }}
                exit={{ x: -90, y: -10, rotate: -8, opacity: 0, transition: { duration: 0.45 } }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden={depth !== 0}
              >
                {(["before", "after"] as const).map(stage => (
                  <div key={stage} className={`relative aspect-[8/5] overflow-hidden bg-[#e9e5dc] ${stage === "after" ? "mt-2" : ""}`}>
                    <img
                      src={`/photo/proj-${project.slug}-${stage}.jpg`}
                      alt={depth === 0 ? `${project.title}, ${stage}` : ""}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <span
                      className={`absolute left-3 top-3 px-3 py-1 text-[13px] font-semibold ${
                        stage === "before" ? "bg-black/75 text-white" : "bg-[#173d24] text-white"
                      }`}
                    >
                      {stage === "before" ? "Before" : "After"}
                    </span>
                  </div>
                ))}
                <figcaption className="px-1 pt-3 pb-1 text-[15px] font-semibold text-[#1f2a24]">
                  {project.title}
                </figcaption>
              </motion.figure>
            );
          })}
        </AnimatePresence>
      </div>

      <p className="mt-6 text-center text-[14px] text-[#3F4143]/80">Click the photo to see the next project</p>
    </div>
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

export default function Home() {
  const [sliderPercent, setSliderPercent] = useState(50);
  const [activeStep, setActiveStep] = useState(0);
  // Desktop: the process section is tall and its content sticks to the screen;
  // scrolling through it moves the active step from 1 to 8. Hover still picks
  // a step directly (until the next scroll).
  const processRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: processProgress } = useScroll({
    target: processRef,
    offset: ["start 64px", "end end"],
  });
  useMotionValueEvent(processProgress, "change", v => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;
    const step = Math.min(7, Math.max(0, Math.floor(v * 8)));
    setActiveStep(prev => (prev === step ? prev : step));
  });
  const [activeService, setActiveService] = useState(2);
  // Wait briefly before switching services so sweeping the mouse across the
  // row doesn't flash through every photo.
  const serviceHoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previewService = (i: number, delay = 90) => {
    if (serviceHoverTimer.current) clearTimeout(serviceHoverTimer.current);
    serviceHoverTimer.current = setTimeout(() => setActiveService(i), delay);
  };
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
          "Something went wrong submitting your request. Please call us at (360) 456-1886."
        );
      }
    } catch {
      setFormError(
        "Network error. Please try again or call us directly at (360) 456-1886."
      );
    } finally {
      setSending(false);
    }
  };

  const handlePrevReview = () => {
    setCurrentReviewIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };
  const handleNextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
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

  // Page-wide scroll reveal for [data-reveal] / [data-reveal-stagger] blocks.
  // The "reveal-ready" class is added only here, so prerendered HTML and
  // no-JS visitors always see everything; reduced motion skips the effect.
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    const targets = root.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-stagger]");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach(el => el.classList.add("is-revealed"));
      return;
    }
    document.documentElement.classList.add("reveal-ready");
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    targets.forEach(el => io.observe(el));
    return () => {
      io.disconnect();
      document.documentElement.classList.remove("reveal-ready");
    };
  }, [reduceMotion]);

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
      backdrop: "/photo/svc-bg-fire.jpg",
      href: "/services/fire-restoration",
      icon: <Flame size={20} />,
      accentColor: "#E05A47",
      accentBarClass: "bg-[#E05A47]",
      iconColor:
        "text-[#173d24] bg-[#8DBD42]/10 group-hover:bg-[#E05A47] group-hover:text-white",
      hoverTextColor: "group-hover:text-[#E05A47]",
    },
    {
      number: "02",
      title: "Water Restoration",
      image: SERVICE_WATER,
      description:
        "Rapid extraction, structural drying, and mold prevention using IICRC-certified mitigation standards.",
      backdrop: "/photo/svc-bg-water.jpg",
      href: "/services/water-restoration",
      icon: <Droplets size={20} />,
      accentColor: "#3A82F6",
      accentBarClass: "bg-[#3A82F6]",
      iconColor:
        "text-[#173d24] bg-[#8DBD42]/10 group-hover:bg-[#3A82F6] group-hover:text-white",
      hoverTextColor: "group-hover:text-[#3A82F6]",
    },
    {
      number: "03",
      title: "Storm Recovery",
      image: SERVICE_STORM,
      description:
        "Emergency tarping, debris removal, and structural rebuilds following severe PNW weather events.",
      backdrop: "/photo/svc-bg-storm.jpg",
      href: "/services/storm-recovery",
      icon: <CloudLightning size={20} />,
      accentColor: "#4F46E5",
      accentBarClass: "bg-[#4F46E5]",
      iconColor:
        "text-[#173d24] bg-[#8DBD42]/10 group-hover:bg-[#4F46E5] group-hover:text-white",
      hoverTextColor: "group-hover:text-[#4F46E5]",
    },
    {
      number: "04",
      title: "Contents Services",
      image: SERVICE_CONTENTS,
      description:
        "Specialized cleaning and restoration of personal contents, textiles, and salvageable valuables.",
      backdrop: "/photo/svc-bg-contents.jpg",
      href: "/services/contents-services",
      icon: <ShieldCheck size={20} />,
      accentColor: "#D97706",
      accentBarClass: "bg-[#D97706]",
      iconColor:
        "text-[#173d24] bg-[#8DBD42]/10 group-hover:bg-[#D97706] group-hover:text-white",
      hoverTextColor: "group-hover:text-[#D97706]",
    },
    {
      number: "05",
      title: "Commercial Restoration",
      image: "/photo/og-commercial.jpg",
      description:
        "Apartments, HOAs, medical, hotels and schools: cleanup and rebuild under one contract, phased around your operations.",
      backdrop: "/photo/svc-bg-commercial.jpg",
      href: "/commercial",
      icon: <Layers size={20} />,
      accentColor: "#173d24",
      accentBarClass: "bg-[#173d24]",
      iconColor: "",
      hoverTextColor: "",
    },
  ];

  const process = [
    {
      number: "01",
      title: "Immediate Emergency Response (Day of Loss)",
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
      items: [
        {
          label: "Closeout & Content Return",
          text: "Upon final inspection and completion of the work, a formal Certificate of Completion is executed, and your securely stored, restored contents are safely returned to the property.",
        },
        {
          label: "Industry-Leading Warranty Activation",
          text: "Your project is covered by our 5-year warranty on workmanship.",
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
        <title>Heritage Restoration | Fire, Water &amp; Storm Damage Experts</title>
        <meta
          name="description"
          content="24/7 fire, water &amp; storm damage restoration for homes and businesses in Western Washington. IICRC certified, direct insurance billing, locally owned since 2004."
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
          content="24/7 fire, water &amp; storm damage restoration for homes and businesses in Western Washington. IICRC certified, direct insurance billing, locally owned since 2004."
        />
        <meta
          property="og:image"
          content="https://www.firewaterstorm.com/photo/og-default.jpg"
        />
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
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Heritage Restoration",
            alternateName: "Heritage Restoration Inc.",
            url: "https://www.firewaterstorm.com/",
          })}
        </script>
      </Helmet>

      <div ref={pageRef} className="bg-white">
        {/* Homepage Hero */}
        <section
          id="home-hero"
          ref={heroRef}
          className="relative overflow-hidden bg-[#173d24] pt-[112px] sm:pt-[116px] lg:pt-[132px] min-h-[calc(100svh-56px)] lg:min-h-[100svh] flex flex-col"
        >
          <img
            data-gsap-hero-image
            src="/photo/hero-crew-tarp.jpg"
            alt="Heritage Restoration crew tarping and boarding up a fire-damaged home"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[70%_75%]"
          />
          {/* Left column: heavy white fade for text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, rgba(250,249,246,0.97) 0%, rgba(250,249,246,0.94) 34%, rgba(250,249,246,0.72) 46%, rgba(250,249,246,0.2) 58%, transparent 68%)",
            }}
          />
          {/* Fixed-width white band behind the text column, so the headline stays
              on a clean background on narrower laptops where % stops fall short */}
          <div
            className="absolute inset-0 hidden lg:block pointer-events-none"
            style={{
              background:
                "linear-gradient(100deg, rgba(250,249,246,0.95) 0px, rgba(250,249,246,0.9) 700px, rgba(250,249,246,0.35) 840px, transparent 960px)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 10% 88%, rgba(250,249,246,0.96) 0%, rgba(250,249,246,0.82) 20%, rgba(250,249,246,0.38) 42%, transparent 68%)",
            }}
          />
          <p className="hidden lg:block short:hidden absolute right-8 bottom-[92px] xl:bottom-[96px] z-10 bg-[#173d24]/90 px-4 py-2.5 text-[13px] text-white/90" style={bodyStyle}>
            Heritage crew tarping and boarding up a fire-damaged home
          </p>
          {/* Mobile-only extra white overlay */}
          <div className="absolute inset-0 bg-[#FAF9F6]/80 lg:hidden pointer-events-none" />

          {/* Hero content */}
          <div className="relative z-10 w-full flex-1 flex flex-col justify-center max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 min-[1570px]:px-0 py-6 lg:py-12 midh:py-6 short:py-6">
            <div className="max-w-[640px] xl:max-w-[720px] short:max-w-[780px]">
              <FadeUp triggerImmediately={true} delay={0.05}>
                <p
                  data-gsap-hero-item
                  className="text-[15px] sm:text-[16px] font-semibold mb-4 sm:mb-5 midh:mb-4 short:mb-4 text-[#173d24]"
                  style={bodyStyle}
                >
                  Residential and commercial restoration in Western Washington
                </p>
              </FadeUp>
              <FadeUp triggerImmediately={true} delay={0.15}>
                <h1 data-gsap-hero-item className="leading-[1.03]" style={headlineStyle}>
                  {/* Brand name stays in the H1 for Google's site-name signal, but hidden visually */}
                  <span className="sr-only">Heritage Restoration: </span>
                  <span className="block text-[2.1rem] sm:text-[2.5rem] md:text-[3.7rem] lg:text-[4.4rem] xl:text-[5.3rem] midh:text-[3.6rem] short:text-[2.95rem] text-[#1a1c1e] font-bold">
                    Restoring{" "}
                    <br className="short:hidden" />
                    Your Property.
                  </span>{" "}
                  <span className="block text-[2.1rem] sm:text-[2.5rem] md:text-[3.7rem] lg:text-[4.4rem] xl:text-[5.3rem] midh:text-[3.6rem] short:text-[2.95rem] text-[#44781a] font-bold mt-1">
                    Restoring Your{" "}
                    <br className="short:hidden" />
                    Peace of Mind.
                  </span>
                </h1>
              </FadeUp>
              <FadeUp triggerImmediately={true} delay={0.28}>
                <p
                  data-gsap-hero-item
                  className="mt-5 sm:mt-6 midh:mt-5 short:mt-6 text-[16px] sm:text-[17px] short:text-[16px] text-[#2f3133]/85 max-w-[480px] leading-[1.6] sm:leading-[1.7] short:leading-[1.55]"
                  style={bodyStyle}
                >
                  For homeowners, property managers and businesses, we handle
                  the full complexity of disaster recovery, from emergency
                  response to the final rebuild. Locally owned and operated
                  since 2004.
                </p>
              </FadeUp>
              {/* CTAs */}
              <FadeUp triggerImmediately={true} delay={0.38}>
                <motion.div
                  className="mt-7 sm:mt-10 lg:mt-12 midh:mt-10 short:mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.18, delayChildren: 0.16 } },
                  }}
                >
                  <motion.a
                    data-gsap-hero-button
                    href="tel:+13604561886"
                    className="btn-3d group inline-flex items-center gap-2.5 bg-[#8DBD42] hover:bg-[#97cf4f] text-[#173d24] px-7 py-4 text-[15px] font-bold transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(141,189,66,0.25)] active:translate-y-0"
                    style={bodyStyle}
                    variants={{
                      hidden: { opacity: 0, y: 18, scale: 0.92 },
                      visible: { opacity: 1, y: 0, scale: 1 },
                    }}
                    transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -2, scale: 1.025 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Phone size={16} className="stroke-[2.5]" />
                    Call 24/7 dispatch
                  </motion.a>
                  <motion.a
                      href="/contact"
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        // plain click -> in-app navigation; modified clicks (new tab etc.) keep native behavior
                        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                        e.preventDefault();
                        setLocation("/contact");
                      }}
                      data-gsap-hero-button
                      className="group inline-flex items-center gap-2 border-2 border-[#173d24]/30 hover:border-[#173d24] text-[#173d24] px-7 py-[14px] text-[15px] font-bold transition-all duration-300 bg-white/60 hover:bg-white/90 hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)] active:translate-y-0 cursor-pointer"
                      style={bodyStyle}
                      variants={{
                        hidden: { opacity: 0, y: 18, scale: 0.92 },
                        visible: { opacity: 1, y: 0, scale: 1 },
                      }}
                      transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ y: -2, scale: 1.025 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Request an assessment
                    </motion.a>
                </motion.div>
              </FadeUp>
              <FadeUp triggerImmediately={true} delay={0.5}>
                <Link
                  href="/commercial"
                  className="mt-6 sm:mt-8 midh:mt-7 short:mt-6 inline-flex items-center gap-2 text-[14px] font-bold text-[#173d24] underline decoration-[#8DBD42] decoration-2 underline-offset-4 hover:text-[#44781a] transition-colors"
                  style={bodyStyle}
                >
                  Managing a commercial or multi-family property? See commercial restoration
                </Link>
              </FadeUp>
            </div>
          </div>

          {/* Trust bar — fixed, every message visible at once (replaces the old scrolling ticker) */}
          <StaticTrustBar
            items={[
              "Licensed & Bonded in WA",
              "22+ Years Serving Washington",
              "Locally Owned & Operated",
            ]}
          />
        </section>

        {/* Office Locations + Trust Badges.
            Each office sits plainly on white; on hover it turns into a
            liquid-glass card (.office-glass in index.css). No divider lines. */}
        <section className="relative bg-white">
          <div className="relative max-w-[860px] mx-auto px-6 sm:px-8 pt-14 md:pt-18">
            <p data-reveal className="text-[#44781a] uppercase tracking-[0.18em] text-sm font-black text-center mb-10" style={bodyStyle}>
              Local Office Locations
            </p>

            {/* Two office cards */}
            <div data-reveal-stagger className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <div className="office-glass flex flex-col items-center gap-5 px-7 py-9 md:px-8 md:py-10 text-center">
                <h3 className="text-[26px] font-bold text-[#2a2c2e]" style={headlineStyle}>North Office</h3>
                <p className="text-[#3F4143]/80 text-[16px] leading-relaxed flex items-start gap-2 text-left" style={bodyStyle}>
                  <MapPin size={15} aria-hidden="true" className="text-[#44781a] mt-1 shrink-0" />
                  <a href="https://maps.google.com/?q=8695+Martin+Way+E+Unit+103+Lacey+WA+98516" target="_blank" rel="noopener noreferrer" className="hover:text-[#1f2a24]">
                    8695 Martin Way E, Unit 103<br />Lacey, WA 98516
                  </a>
                </p>
                <a href="tel:+13604561886" className="btn-3d inline-flex items-center gap-2 bg-[#8DBD42] hover:bg-[#7dac35] text-[#2b2d2f] px-7 py-3 uppercase tracking-wider text-[12px] font-black transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_6px_18px_rgba(141,189,66,0.35)] active:translate-y-0 active:shadow-none w-fit" style={bodyStyle}>
                  <Phone size={13} aria-hidden="true" className="stroke-[3]" /> North: (360) 456-1886
                </a>
              </div>
              <div className="office-glass flex flex-col items-center gap-5 px-7 py-9 md:px-8 md:py-10 text-center">
                <h3 className="text-[26px] font-bold text-[#2a2c2e]" style={headlineStyle}>South Office</h3>
                <p className="text-[#3F4143]/80 text-[16px] leading-relaxed flex items-start gap-2 text-left" style={bodyStyle}>
                  <MapPin size={15} aria-hidden="true" className="text-[#44781a] mt-1 shrink-0" />
                  <a href="https://maps.google.com/?q=1581+N.+National+Ave+Chehalis+WA+98532" target="_blank" rel="noopener noreferrer" className="hover:text-[#1f2a24]">
                    1581 N. National Ave<br />Chehalis, WA 98532
                  </a>
                </p>
                <a href="tel:+13603451015" className="btn-3d inline-flex items-center gap-2 bg-[#8DBD42] hover:bg-[#7dac35] text-[#2b2d2f] px-7 py-3 uppercase tracking-wider text-[12px] font-black transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_6px_18px_rgba(141,189,66,0.35)] active:translate-y-0 active:shadow-none w-fit" style={bodyStyle}>
                  <Phone size={13} aria-hidden="true" className="stroke-[3]" /> South: (360) 345-1015
                </a>
              </div>
            </div>

            {/* 24hr line + badges (no divider line above any more) */}
            <div data-reveal className="mt-12 pb-12 flex flex-col items-center gap-8">
              <div className="flex items-center justify-center gap-2 px-2">
                <Clock size={15} aria-hidden="true" className="text-[#44781a] shrink-0" />
                <span className="text-center text-[#3F4143]/75 uppercase tracking-[0.12em] sm:tracking-[0.18em] text-[12px] sm:text-[13px] font-extrabold" style={bodyStyle}>
                  24 Hours a Day · 7 Days a Week · 365 Days a Year
                </span>
              </div>
              <TrustBadges className="lg:w-[min(1120px,calc(100vw-4rem))] lg:self-start lg:relative lg:left-1/2 lg:-translate-x-1/2" />
            </div>
          </div>
        </section>

        {/* Services — dark showcase. Desktop: the five services as a fixed list on
            the left; hovering or focusing one fades its job photo (shown whole,
            never cropped) and a caption card with its description into the stage
            on the right. Rows never resize, so nothing moves. Each row links to
            its page. Phones and tablets: stacked photo cards. */}
        <section id="services" className="bg-[#173d24] text-white">
          <div className="max-w-[1240px] mx-auto px-6 py-20 md:py-24 lg:py-14 midh:py-12 short:py-8 lg:min-h-[calc(100svh-64px)] lg:flex lg:flex-col lg:justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div data-reveal className="lg:col-span-5">
                <h2 className="text-[38px] md:text-[52px] midh:text-[46px] short:text-[38px] leading-[1.04] font-bold" style={headlineStyle}>
                  What we restore
                </h2>
                <p className="mt-5 short:mt-3 text-[16.5px] md:text-[17.5px] short:text-[15.5px] leading-relaxed text-white/75 max-w-[44ch]" style={bodyStyle}>
                  One local team handles the emergency response, the insurance
                  documentation and the full rebuild, for homes and commercial
                  properties.
                </p>

                <ul className="hidden lg:block mt-9 midh:mt-7 short:mt-5 border-t border-white/12" style={bodyStyle}>
                  {services.map((service, i) => {
                    const open = i === activeService;
                    return (
                      <li key={service.title} className="border-b border-white/12">
                        <Link
                          href={service.href}
                          onMouseEnter={() => previewService(i)}
                          onMouseLeave={() => serviceHoverTimer.current && clearTimeout(serviceHoverTimer.current)}
                          onFocus={() => previewService(i, 0)}
                          aria-current={open ? "true" : undefined}
                          className="group relative flex items-center gap-4 py-4 midh:py-3.5 short:py-3 pl-5 pr-4 transition-colors duration-300 hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#a9d468]"
                        >
                          {/* One highlight panel that glides from row to row */}
                          {open && (
                            <motion.span
                              layoutId="service-highlight"
                              aria-hidden="true"
                              className="absolute inset-0 bg-white/[0.08]"
                              transition={{ type: "spring", stiffness: 260, damping: 32, mass: 0.9 }}
                            />
                          )}
                          <span
                            className={`relative flex h-10 w-10 short:h-9 short:w-9 shrink-0 items-center justify-center border transition-all duration-500 ease-out ${
                              open
                                ? "border-[#8DBD42] bg-[#8DBD42] text-[#173d24]"
                                : "border-white/20 text-white/65 group-hover:border-[#8DBD42]/70 group-hover:text-white"
                            }`}
                          >
                            {service.icon}
                          </span>
                          <h3
                            className={`relative flex-1 text-[21px] xl:text-[23px] short:text-[19px] leading-tight font-bold transition-all duration-500 ease-out ${
                              open ? "text-white translate-x-1" : "text-white/55 group-hover:text-white/90 group-hover:translate-x-1"
                            }`}
                            style={headlineStyle}
                          >
                            {service.title}
                          </h3>
                          <ArrowRight
                            size={18}
                            aria-hidden="true"
                            className={`relative shrink-0 transition-all duration-500 ease-out ${
                              open ? "translate-x-0 text-[#a9d468] opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                            }`}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <a
                  href="tel:+13604561886"
                  className="btn-3d mt-9 midh:mt-7 short:mt-5 hidden lg:inline-flex items-center gap-2.5 bg-[#8DBD42] hover:bg-[#97cf4f] text-[#173d24] px-7 py-4 short:py-3 text-[15px] font-bold transition-colors"
                  style={bodyStyle}
                >
                  <Phone size={16} aria-hidden="true" /> Call 24/7 dispatch (360) 456-1886
                </a>
              </div>

              {/* Photo stage */}
              <div data-reveal style={{ animationDelay: "0.12s" }} className="hidden lg:block lg:col-span-7">
                <div className="relative h-[min(640px,calc(100svh-64px-7rem))] min-h-[460px] overflow-hidden bg-[#173d24] border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.35)]">
                  {services.map((service, i) => (
                    <div
                      key={service.backdrop}
                      aria-hidden={i !== activeService}
                      className={`absolute inset-0 transition-opacity duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
                        i === activeService ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <img
                        src={service.backdrop}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover blur-2xl scale-110 opacity-50"
                      />
                      <img
                        src={service.backdrop}
                        alt={`${service.title} job by Heritage Restoration`}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-contain"
                      />
                    </div>
                  ))}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#173d24]/80 to-transparent pointer-events-none" />

                  {/* Caption: one white card that stays in place; the five services'
                      text is stacked inside it (card sized to the longest) and only the
                      text swaps — old fades out fast, new fades in just after. */}
                  <div
                    className="absolute left-6 bottom-6 right-6 xl:right-auto xl:w-[440px] grid bg-white text-[#1f2a24] p-6 short:p-5 shadow-[0_18px_40px_rgba(0,0,0,0.3)]"
                    style={bodyStyle}
                  >
                    {services.map((service, i) => {
                      const shown = i === activeService;
                      return (
                        <div
                          key={service.title}
                          aria-hidden={!shown}
                          className={`[grid-area:1/1] self-start transition-[opacity,transform] ease-out ${
                            shown
                              ? "opacity-100 translate-y-0 duration-500 delay-150"
                              : "opacity-0 translate-y-1.5 duration-200 pointer-events-none"
                          }`}
                        >
                          <p className="text-[24px] short:text-[21px] leading-tight font-bold" style={headlineStyle}>
                            {service.title}
                          </p>
                          <p className="mt-2 text-[15px] leading-relaxed text-[#3F4143]/80">{service.description}</p>
                          <Link
                            href={service.href}
                            tabIndex={shown ? undefined : -1}
                            className="mt-4 inline-flex items-center gap-2 text-[15px] font-bold text-[#173d24] border-b border-[#173d24]/30 pb-0.5 hover:border-[#173d24]"
                          >
                            View service <ArrowRight size={16} aria-hidden="true" />
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Phones: a swipeable row of cards. Tablets: two-column grid.
                Photo and description are always shown. */}
            <p className="sm:hidden mt-8 text-[14px] text-white/60" style={bodyStyle}>Swipe to see all five services</p>
            <ul
              className="lg:hidden mt-4 sm:mt-10 -mx-6 px-6 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-pl-6 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible"
              style={bodyStyle}
            >
              {services.map(service => (
                <li key={service.title} className="snap-start shrink-0 w-[84%] sm:w-auto">
                  <Link
                    href={service.href}
                    className="card-3d group flex h-full flex-col bg-white text-[#1f2a24] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a9d468]"
                  >
                    <span className="relative block aspect-[16/10] overflow-hidden bg-[#173d24]">
                      <img src={service.backdrop} alt="" aria-hidden="true" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover blur-xl scale-110 opacity-50" />
                      <img src={service.backdrop} alt={`${service.title} job by Heritage Restoration`} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-contain" />
                    </span>
                    <span className="flex flex-1 flex-col p-5">
                      <span className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#8DBD42] text-[#173d24]">{service.icon}</span>
                        <h3 className="text-[21px] leading-tight font-bold" style={headlineStyle}>{service.title}</h3>
                      </span>
                      <span className="mt-3 block flex-1 text-[15px] leading-relaxed text-[#3F4143]/80">{service.description}</span>
                      <span className="mt-4 inline-flex items-center gap-2 text-[15px] font-bold text-[#173d24]">
                        View service <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href="tel:+13604561886"
              className="btn-3d lg:hidden mt-8 inline-flex items-center gap-2.5 bg-[#8DBD42] text-[#173d24] px-6 py-4 text-[15px] font-bold"
              style={bodyStyle}
            >
              <Phone size={16} aria-hidden="true" /> Call (360) 456-1886
            </a>
          </div>
        </section>

        {/* Homes & businesses — two solid-colour panels, each fully clickable */}
        <section className="bg-white py-14 md:py-20">
          <div data-reveal-stagger className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6" style={bodyStyle}>
            {[
              {
                href: "/services/fire-restoration",
                icon: <House size={22} aria-hidden="true" />,
                kicker: "For homeowners",
                title: "Residential restoration",
                text: "Fire, water and storm damage to your home, handled start to finish, with us on your side through the insurance claim.",
                link: "Residential services",
                panel: "bg-[#EEF3E6] text-[#1f2a24]",
                kickerColor: "text-[#173d24]",
                body: "text-[#3F4143]/85",
                linkColor: "text-[#173d24] border-[#173d24]/30 group-hover:border-[#173d24]",
                iconBox: "bg-white text-[#173d24]",
              },
              {
                href: "/commercial",
                icon: <Building2 size={22} aria-hidden="true" />,
                kicker: "For property managers and owners",
                title: "Commercial restoration",
                text: "Apartments, HOAs, medical offices, hotels and schools. Cleanup and rebuild under one contract, phased around your tenants and operations.",
                link: "Commercial restoration",
                panel: "bg-[#173d24] text-white",
                kickerColor: "text-[#cfe6a3]",
                body: "text-white/85",
                linkColor: "text-white border-white/40 group-hover:border-[#a9d468] group-hover:text-[#cfe6a3]",
                iconBox: "bg-[#8DBD42] text-[#173d24]",
              },
            ].map(panel => (
              <Link
                key={panel.title}
                href={panel.href}
                className={`card-3d card-3d--raised group flex flex-col p-7 md:p-9 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#44781a] ${panel.panel}`}
              >
                <span className={`flex h-12 w-12 items-center justify-center ${panel.iconBox}`}>{panel.icon}</span>
                <p className={`mt-6 text-[15px] font-semibold ${panel.kickerColor}`}>{panel.kicker}</p>
                <h2 className="mt-1.5 text-[28px] md:text-[32px] leading-[1.1] font-bold" style={headlineStyle}>
                  {panel.title}
                </h2>
                <p className={`mt-3 max-w-[46ch] text-[15.5px] leading-relaxed ${panel.body}`}>{panel.text}</p>
                <span className={`mt-5 inline-flex w-fit items-center gap-2 border-b pb-1 text-[15px] font-bold transition-colors ${panel.linkColor}`}>
                  {panel.link} <ChevronRight size={16} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Our promise — statement + rotating before/after deck of past projects */}
        <section id="promise" className="bg-[linear-gradient(180deg,#FFFFFF_0%,#F7F5F0_14%,#F7F5F0_86%,#FFFFFF_100%)] py-20 md:py-28 lg:py-16 midh:py-14 short:py-10">
          <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div data-reveal className="lg:col-span-6">
              <h2 className="text-[34px] md:text-[48px] short:text-[40px] leading-[1.06] font-bold text-[#1f2a24]" style={headlineStyle}>
                We are not just technicians. We are your neighbors.
              </h2>
              <p className="mt-6 text-[17px] leading-relaxed text-[#3F4143]/80 max-w-[56ch]" style={bodyStyle}>
                We are proudly local and homeowner focused. When you call
                Heritage, you are not getting an out-of-town franchise. You are
                getting a team that lives in this community and stands behind
                every repair decision.
              </p>
              <blockquote className="mt-8 short:mt-6 text-[20px] md:text-[22px] short:text-[19px] leading-[1.45] text-[#1f2a24] max-w-[46ch]" style={headlineStyle}>
                Most importantly, we are advocates for you. Our priority is
                protecting your home and your best interests, not the insurance
                company.
              </blockquote>
              <div className="mt-10 short:mt-7 flex flex-wrap gap-4" style={bodyStyle}>
                <a
                  href="tel:+13604561886"
                  className="btn-3d inline-flex items-center gap-2 bg-[#8DBD42] hover:bg-[#97cf4f] text-[#173d24] px-7 py-4 text-[14px] font-bold transition-colors"
                >
                  <Phone size={15} aria-hidden="true" /> Start your recovery
                </a>
                <Link
                  href="/contact"
                  className="btn-3d inline-flex items-center gap-2 border border-[#173d24]/30 hover:border-[#173d24] text-[#173d24] px-7 py-4 text-[14px] font-bold transition-colors"
                >
                  Request an assessment
                </Link>
              </div>
            </div>
            <div data-reveal style={{ animationDelay: "0.12s" }} className="lg:col-span-6">
              <ProjectDeck />
            </div>
          </div>
        </section>

        {/* Process — the eight steps are a real sequence, so they read as a numbered
            stepper with a progress line. Desktop: the section is ~3 screens tall
            and its content stays pinned while you scroll, advancing one step per
            stretch of scroll; hover, focus or click also picks a step. All eight
            detail panels share one grid cell, so switching only cross-fades.
            Phones: a vertical timeline whose steps slide in as they scroll into
            view; tap a step to open it. */}
        <section
          id="process"
          ref={processRef}
          className="py-20 md:py-24 lg:py-0 lg:h-[330svh] bg-white text-[#3F4143]"
        >
          <div className="max-w-[1200px] mx-auto px-6 lg:sticky lg:top-16 lg:h-[calc(100svh-64px)] lg:flex lg:flex-col lg:justify-center">
            <div data-reveal className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
              <h2
                className="lg:col-span-8 text-[36px] md:text-[48px] short:text-[36px] text-[#1f2a24] font-bold leading-[1.05]"
                style={headlineStyle}
              >
                What happens after you call.
              </h2>
              <p
                className="lg:col-span-4 text-[16.5px] short:text-[15px] leading-relaxed short:leading-snug text-[#3F4143]/80"
                style={bodyStyle}
              >
                Eight steps from the day of the loss to the warranty handover,
                with one team and one point of contact the whole way through.
              </p>
            </div>

            {/* DESKTOP — stepper + detail panel */}
            <div className="hidden lg:block mt-12 midh:mt-10 short:mt-6" style={bodyStyle}>
              <ol className="relative grid grid-cols-8">
                <span aria-hidden="true" className="absolute top-[21px] left-[6.25%] right-[6.25%] h-[2px] bg-[#173d24]/12" />
                <span
                  aria-hidden="true"
                  className="absolute top-[21px] left-[6.25%] h-[2px] bg-[#8DBD42] transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ width: `${activeStep * 12.5}%` }}
                />
                {process.map((step, idx) => {
                  const isActive = activeStep === idx;
                  const isDone = idx < activeStep;
                  return (
                    <li key={step.number} className="relative">
                      <button
                        type="button"
                        onMouseEnter={() => setActiveStep(idx)}
                        onFocus={() => setActiveStep(idx)}
                        onClick={() => setActiveStep(idx)}
                        aria-pressed={isActive}
                        className="group flex w-full flex-col items-center px-2 text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#44781a]"
                      >
                        <span
                          className={`relative flex h-11 w-11 items-center justify-center border-2 text-[16px] font-bold transition-all duration-500 ${
                            isActive
                              ? "border-[#173d24] bg-[#173d24] text-white shadow-[0_0_0_6px_rgba(141,189,66,0.25)]"
                              : isDone
                                ? "border-[#8DBD42] bg-[#8DBD42] text-[#173d24]"
                                : "border-[#173d24]/20 bg-white text-[#3F4143]/80 group-hover:border-[#8DBD42] group-hover:text-[#173d24]"
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span
                          className={`mt-4 short:mt-3 text-[13.5px] xl:text-[14px] short:text-[13px] leading-snug font-semibold transition-colors duration-300 ${
                            isActive ? "text-[#1f2a24]" : "text-[#3F4143]/80 group-hover:text-[#1f2a24]"
                          }`}
                        >
                          {step.title}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-10 midh:mt-8 short:mt-5 grid border border-[#E6E1D7] bg-[#FAF9F6]">
                {process.map((step, idx) => {
                  const shown = activeStep === idx;
                  return (
                    <div
                      key={step.number}
                      aria-hidden={!shown}
                      className={`[grid-area:1/1] grid grid-cols-12 gap-10 short:gap-7 p-9 midh:p-8 short:p-6 transition-opacity ease-out ${
                        shown ? "opacity-100 duration-500 delay-100" : "opacity-0 duration-200 pointer-events-none"
                      }`}
                    >
                      <div className="col-span-4">
                        <p className="text-[15px] font-semibold text-[#44781a]">
                          Step {idx + 1} of {process.length}
                        </p>
                        <h3 className="mt-2 text-[28px] xl:text-[30px] leading-[1.12] font-bold text-[#1f2a24]" style={headlineStyle}>
                          {step.title}
                        </h3>
                      </div>
                      <div className="col-span-8 grid grid-cols-2 content-start gap-x-10 short:gap-x-7 gap-y-7 short:gap-y-5 border-l border-[#E6E1D7] pl-10 short:pl-7">
                        {step.items.map(item => (
                          <div key={item.label}>
                            <p className="flex items-center gap-2 text-[15px] font-bold text-[#1f2a24]">
                              <Check size={16} strokeWidth={3} aria-hidden="true" className="shrink-0 text-[#44781a]" />
                              {item.label}
                            </p>
                            <p className="mt-2 text-[15px] leading-relaxed text-[#3F4143]/80">{item.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* MOBILE — vertical timeline; tap a step to open it */}
            <ol className="lg:hidden relative mt-10" style={bodyStyle}>
              <span aria-hidden="true" className="absolute left-[21px] top-3 bottom-3 w-[2px] bg-[#173d24]/12" />
              {process.map((step, idx) => {
                const isActive = activeStep === idx;
                const isDone = idx < activeStep;
                return (
                  <motion.li
                    key={step.number}
                    className="relative pl-16 pb-5 last:pb-0"
                    initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveStep(idx)}
                      aria-expanded={isActive}
                      className="flex w-full items-start gap-3 text-left"
                    >
                      <span
                        className={`absolute left-0 top-0 flex h-11 w-11 items-center justify-center border-2 text-[16px] font-bold transition-colors duration-300 ${
                          isActive
                            ? "border-[#173d24] bg-[#173d24] text-white"
                            : isDone
                              ? "border-[#8DBD42] bg-[#8DBD42] text-[#173d24]"
                              : "border-[#173d24]/20 bg-white text-[#3F4143]/60"
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span
                        className={`flex-1 pt-2 text-[18px] leading-snug font-bold ${isActive ? "text-[#1f2a24]" : "text-[#3F4143]/75"}`}
                        style={headlineStyle}
                      >
                        {step.title}
                      </span>
                      <ChevronDown
                        size={18}
                        aria-hidden="true"
                        className={`mt-3 shrink-0 text-[#44781a] transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 space-y-4 bg-[#FAF9F6] border border-[#E6E1D7] p-5">
                            {step.items.map(item => (
                              <div key={item.label}>
                                <p className="flex items-center gap-2 text-[14.5px] font-bold text-[#1f2a24]">
                                  <Check size={15} strokeWidth={3} aria-hidden="true" className="shrink-0 text-[#44781a]" />
                                  {item.label}
                                </p>
                                <p className="mt-1.5 text-[14.5px] leading-relaxed text-[#3F4143]/80">{item.text}</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* Case Study / Proven Results Section */}
        <section
          id="case-study"
          className="py-20 md:py-28 text-[#3F4143] relative overflow-hidden bg-[linear-gradient(180deg,#FFFFFF_0%,#F7F5F0_14%,#F7F5F0_86%,#FFFFFF_100%)]"
        >
          <div data-reveal className="max-w-[1200px] mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 mb-10 md:mb-12">
              <h2
                className="lg:col-span-6 text-[36px] md:text-[48px] leading-[1.05] text-[#1f2a24] font-bold"
                style={headlineStyle}
              >
                Proven transformation
              </h2>
              <p
                className="lg:col-span-5 lg:col-start-8 self-end text-[#3F4143]/80 text-[16.5px] leading-relaxed"
                style={bodyStyle}
              >
                Compare the detailed progress of a full structural rebuild.
                Drag the slider to reveal the craftsmanship that goes into every
                restoration project.
              </p>
            </div>

            {/* Before/After Slider container */}
            <div className="relative">
              <div className="relative z-10">
                <FadeUp>
                  <div
                    ref={sliderRef}
                    className="relative rounded-none overflow-hidden select-none cursor-col-resize border border-[#E0DACE]"
                    onMouseMove={event => updateSlider(event.clientX)}
                    onTouchMove={event => updateSlider(event.touches[0].clientX)}
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
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-none bg-white border border-[#8DBD42] text-[#173d24] flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105">
                          <ChevronsLeftRight size={18} />
                        </div>
                      </div>

                      <span
                        className="absolute top-5 left-5 rounded-none bg-black/75 text-white border border-white/10 px-3.5 py-1.5 text-[13px] font-semibold select-none z-10"
                        style={bodyStyle}
                      >
                        Before
                      </span>
                      <span
                        className="absolute top-5 right-5 rounded-none bg-[#173d24] text-white border border-[#173d24]/20 px-3.5 py-1.5 text-[13px] font-semibold select-none z-10"
                        style={bodyStyle}
                      >
                        After
                      </span>
                    </div>
                  </div>
                </FadeUp>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" style={bodyStyle}>
              <p className="text-[14.5px] text-[#3F4143]/75">
                Exterior of a fire-damaged home, rebuilt by Heritage crews.
              </p>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-[15px] font-bold text-[#173d24] border-b border-[#173d24]/30 pb-1 hover:border-[#173d24] w-fit"
              >
                See more projects <ChevronRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* Reviews — one featured review in a cream card (the arrows change
            which one is featured), the next two as smaller cards, and the
            commercial client list beside them. Featured quotes are stacked in one
            grid cell and cross-fade, so the panel never changes size. */}
        <section id="testimonials" className="py-20 md:py-24 lg:py-20 bg-white text-[#3F4143]">
          <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16" style={bodyStyle}>
            <div data-reveal className="lg:col-span-4">
              <h2 className="text-[36px] md:text-[46px] text-[#1f2a24] font-bold leading-[1.06]" style={headlineStyle}>
                Rebuilding dreams, one story at a time
              </h2>
              <div className="mt-8 border-t border-[#E6E1D7] pt-6">
                <p className="text-[15px] font-semibold text-[#1f2a24]">Commercial clients include</p>
                <ul className="mt-4 space-y-2.5">
                  {[
                    "Providence Hospital",
                    "Washington Orthopedic",
                    "Aberdeen High School",
                    "Essex Property Management",
                    "Rants Group",
                    "Reliable Enterprises",
                  ].map(client => (
                    <li key={client} className="flex items-center gap-3 text-[15.5px] text-[#3F4143]/85">
                      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-[#8DBD42]" />
                      {client}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="https://g.page/r/CWy4NzZ8yjqCEBM/review"
                target="_blank"
                rel="noreferrer"
                className="btn-3d mt-9 inline-flex items-center gap-2 border border-[#173d24]/30 px-6 py-3.5 text-[15px] font-bold text-[#173d24] transition-colors hover:border-[#173d24] hover:bg-[#173d24] hover:text-white"
              >
                Leave a review on Google <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>

            <div data-reveal style={{ animationDelay: "0.12s" }} className="lg:col-span-8">
              {/* Featured review */}
              <figure className="card-3d relative bg-[#FAF9F6] border border-[#E6E1D7] border-t-[3px] border-t-[#173d24] p-7 md:p-9">
                <Quote aria-hidden="true" size={36} className="absolute right-7 top-7 text-[#8DBD42]/50" strokeWidth={1.5} />
                <div className="grid">
                  {reviews.map((review, i) => {
                    const shown = i === currentReviewIndex;
                    const rating = Math.round(review.rating || 5);
                    return (
                      <div
                        key={`${review.name}-${i}`}
                        aria-hidden={!shown}
                        className={`[grid-area:1/1] flex flex-col transition-opacity ease-out ${
                          shown ? "opacity-100 duration-500 delay-100" : "opacity-0 duration-200 pointer-events-none"
                        }`}
                      >
                        <div className="flex gap-1 text-[#44781a]" aria-label={`${rating} out of 5 stars`}>
                          {Array.from({ length: 5 }).map((_, starIndex) => (
                            <Star key={starIndex} size={15} fill={starIndex < rating ? "currentColor" : "none"} aria-hidden="true" />
                          ))}
                        </div>
                        <blockquote className="mt-5 text-[19px] md:text-[21px] leading-[1.5] text-[#1f2a24] max-w-[46ch]" style={headlineStyle}>
                          &ldquo;{review.quote}&rdquo;
                        </blockquote>
                        <figcaption className="mt-6 flex items-center gap-4">
                          {review.profilePhotoUrl ? (
                            <img src={review.profilePhotoUrl} alt="" className="h-11 w-11 rounded-full object-cover" referrerPolicy="no-referrer" />
                          ) : null}
                          <span>
                            <span className="block text-[15px] font-bold text-[#1f2a24]">{review.name}</span>
                            <span className="block text-[13.5px] text-[#3F4143]/80">{review.role}</span>
                          </span>
                        </figcaption>
                      </div>
                    );
                  })}
                </div>
                {reviews.length > 1 && (
                  <div className="mt-6 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={handlePrevReview}
                      className="flex h-10 w-10 items-center justify-center border border-[#173d24]/25 text-[#173d24] transition-colors hover:border-[#173d24] hover:bg-[#173d24] hover:text-white"
                      aria-label="Previous review"
                    >
                      <ArrowLeft size={18} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextReview}
                      className="flex h-10 w-10 items-center justify-center border border-[#173d24]/25 text-[#173d24] transition-colors hover:border-[#173d24] hover:bg-[#173d24] hover:text-white"
                      aria-label="Next review"
                    >
                      <ArrowRight size={18} aria-hidden="true" />
                    </button>
                  </div>
                )}
              </figure>

              {/* The next two reviews */}
              {reviews.length > 1 && (
                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[1, 2].slice(0, Math.min(2, reviews.length - 1)).map(offset => {
                    const review = reviews[(currentReviewIndex + offset) % reviews.length];
                    const rating = Math.round(review.rating || 5);
                    return (
                      <figure key={`${review.name}-${offset}`} className="card-3d flex h-full flex-col bg-[#FAF9F6] border border-[#E6E1D7] p-7">
                        <div className="flex gap-1 text-[#44781a]" aria-label={`${rating} out of 5 stars`}>
                          {Array.from({ length: 5 }).map((_, starIndex) => (
                            <Star key={starIndex} size={14} fill={starIndex < rating ? "currentColor" : "none"} aria-hidden="true" />
                          ))}
                        </div>
                        <blockquote className="mt-4 flex-1 text-[17px] leading-[1.55] text-[#1f2a24]" style={headlineStyle}>
                          &ldquo;{review.quote}&rdquo;
                        </blockquote>
                        <figcaption className="mt-6">
                          <span className="block text-[15px] font-bold text-[#1f2a24]">{review.name}</span>
                          <span className="block text-[13.5px] text-[#3F4143]/80">{review.role}</span>
                        </figcaption>
                      </figure>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Bottom CTA + Contact Form */}
        <section id="home-contact" className="bg-[linear-gradient(180deg,#FFFFFF_0%,#F7F5F0_22%)] py-20 md:py-28">
          <div className="max-w-[1200px] mx-auto px-6">
            <FadeUp>
              <div data-reveal-stagger className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                <div className="lg:col-span-7 lg:order-2">
                  <h2
                    className="text-[36px] md:text-[48px] leading-[1.05] font-bold text-[#1f2a24]"
                    style={headlineStyle}
                  >
                    Need restoration support today?
                  </h2>
                  <p
                    className="mt-5 max-w-[620px] text-[16px] md:text-[17px] leading-relaxed text-[#3F4143]/80"
                    style={bodyStyle}
                  >
                    Send a quick message and our dispatch team will help you decide the next step, whether it is emergency stabilization, documentation, or a full repair assessment.
                  </p>
                  <p className="mt-3 text-[15px] text-[#3F4143]/75" style={bodyStyle}>
                    Managing a commercial property?{" "}
                    <Link href="/commercial#commercial-inquiry" className="font-bold text-[#173d24] underline decoration-[#8DBD42] decoration-2 underline-offset-4 hover:text-[#44781a]">
                      Use the commercial inquiry form
                    </Link>
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
                          className="text-[14px] font-semibold text-[#1f2a24]"
                        >
                          Full name *
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
                          className="text-[14px] font-semibold text-[#1f2a24]"
                        >
                          Phone number *
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
                          className="text-[14px] font-semibold text-[#1f2a24]"
                        >
                          Email address *
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
                          className="text-[14px] font-semibold text-[#1f2a24]"
                        >
                          Service needed
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
                          <option value="contents">Contents Pack-Out & Clean</option>
                          <option value="other">General Inquiry / Assessment</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="home-message"
                        className="text-[14px] font-semibold text-[#1f2a24]"
                      >
                        What happened?
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
                      className="btn-3d inline-flex items-center gap-2 bg-[#8DBD42] hover:bg-[#97cf4f] disabled:opacity-60 disabled:cursor-not-allowed text-[#173d24] px-8 py-4 text-[14px] font-bold transition-colors cursor-pointer"
                    >
                      <Send size={14} /> {sending ? "Sending..." : "Send message"}
                    </button>
                  </form>
                </div>

                <div className="lg:col-span-5 lg:order-1">
                  <div className="relative overflow-hidden bg-[#173d24] p-8 md:p-10 text-white lg:mt-2">
                    <div className="relative z-10">
                      <h3
                        className="text-[28px] md:text-[32px] leading-tight font-bold text-white"
                        style={headlineStyle}
                      >
                        Fast answers when the damage cannot wait.
                      </h3>
                      <div className="mt-8 space-y-5">
                        <a href="tel:+13604561886" className="flex items-start gap-4 group">
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#8DBD42] text-[#173d24] transition-transform duration-300 group-hover:scale-105">
                            <Phone size={18} />
                          </span>
                          <span>
                            <span className="block text-[13px] font-semibold text-white/60">Call now</span>
                            <span className="mt-1 block text-[18px] font-bold text-white">(360) 456-1886</span>
                          </span>
                        </a>
                        <a href="mailto:office@firewaterstorm.com" className="flex items-start gap-4 group">
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#8DBD42] text-[#173d24] transition-transform duration-300 group-hover:scale-105">
                            <Mail size={18} />
                          </span>
                          <span>
                            <span className="block text-[13px] font-semibold text-white/60">Email</span>
                            <span className="mt-1 block text-[15px] font-bold text-white">office@firewaterstorm.com</span>
                          </span>
                        </a>
                        <div className="flex items-start gap-4">
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#8DBD42] text-[#173d24]">
                            <MapPin size={18} />
                          </span>
                          <span>
                            <span className="block text-[13px] font-semibold text-white/60">Local offices</span>
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
              Call 360-456-1886 or use the contact page for service requests.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
