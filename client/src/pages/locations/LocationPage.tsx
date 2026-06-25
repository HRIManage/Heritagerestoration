import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { useInView, animate } from "framer-motion";
import {
  Flame,
  Droplets,
  CloudLightning,
  Boxes,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  BadgeCheck,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  PhoneCall,
  ClipboardList,
  Hammer,
  FileCheck,
  ChevronsLeftRight,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import {
  getLocationBySlug,
  NORTH_OFFICE,
  SOUTH_OFFICE,
  LOCATIONS,
} from "@/data/locations";
import { BASE_URL, buildLocationSchema, FAQ_SCHEMA_ITEMS } from "@/seo";

const HERO_IMAGE  = "/photo/hero-new.jpg";
const TRUCK_PHOTO = "/photo/hero-truck.jpg";
const BEFORE_IMG  = "/photo/Monnett Fire Before.jpg";
const AFTER_IMG   = "/photo/Monnett Fire After.jpg";

const SERVICES = [
  {
    icon: <Flame size={24} />,
    title: "Fire & Smoke Restoration",
    desc: "Soot removal, odor neutralization, structural repair, and full rebuild after fire damage. We document everything for your insurance claim.",
    href: "/services/fire-restoration",
    cta: "About fire restoration",
  },
  {
    icon: <Droplets size={24} />,
    title: "Water Damage Restoration",
    desc: "Emergency extraction, structural drying, and mold prevention using IICRC-certified methods. Direct insurance billing available.",
    href: "/services/water-restoration",
    cta: "About water restoration",
  },
  {
    icon: <CloudLightning size={24} />,
    title: "Storm Damage Recovery",
    desc: "Emergency roof tarping, tree and debris removal, board-ups, and complete structural reconstruction after Pacific Northwest storms.",
    href: "/services/storm-recovery",
    cta: "About storm recovery",
  },
  {
    icon: <Boxes size={24} />,
    title: "Contents Pack-Out & Storage",
    desc: "Professional inventory, cleaning, deodorization, and climate-controlled storage of your belongings during reconstruction.",
    href: "/services/contents-services",
    cta: "About contents services",
  },
];

const TRUST = [
  { icon: <Clock size={22} />, label: "60-Minute Response", sub: "On-site dispatch, day or night" },
  { icon: <ShieldCheck size={22} />, label: "IICRC Certified", sub: "Nationally credentialed technicians" },
  { icon: <BadgeCheck size={22} />, label: "5-Year Warranty", sub: "Backed on all restoration work" },
  { icon: <CheckCircle size={22} />, label: "Direct Insurance Billing", sub: "We handle your adjuster" },
];

const REVIEWS = [
  {
    name: "D. Butler",
    location: "Homeowner Restoration",
    stars: 5,
    text: "Heritage was at our door in under 45 minutes. They handled the insurance adjuster directly and we only paid our deductible.",
  },
  {
    name: "Linda H.",
    location: "Master Bath Fire Recovery",
    stars: 5,
    text: "After our kitchen fire I didn't know who to call. Heritage took care of everything — from board-up to final paint. Highly recommend.",
  },
  {
    name: "Skip & Alpha Beard",
    location: "DuPont, WA",
    stars: 5,
    text: "Incredible attention to detail. The before and after was unbelievable — better than it looked before the damage.",
  },
];

const PROCESS = [
  {
    num: "01",
    icon: <PhoneCall size={20} />,
    title: "You Call, We Answer",
    desc: "Our emergency line is staffed 24/7 by real local dispatchers — not a call center. A certified crew heads to your property within minutes.",
  },
  {
    num: "02",
    icon: <ClipboardList size={20} />,
    title: "On-Site Assessment",
    desc: "Within 60 minutes, our technician documents all damage with 3D DocuSketch imaging and provides a clear scope of work for your adjuster.",
  },
  {
    num: "03",
    icon: <Hammer size={20} />,
    title: "Certified Restoration",
    desc: "IICRC-certified crews perform full mitigation and rebuild — extraction, drying, soot removal, and reconstruction to current code.",
  },
  {
    num: "04",
    icon: <FileCheck size={20} />,
    title: "Insurance Handled",
    desc: "We prepare Xactimate estimates, coordinate with your adjuster, and bill your carrier directly. You typically pay only your deductible.",
  },
];

function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before restoration",
  afterAlt = "After restoration",
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
}) {
  const [pct, setPct] = useState(48);
  const ref = useRef<HTMLDivElement>(null);

  const update = (clientX: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPct(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  };

  return (
    <div
      ref={ref}
      className="absolute inset-0 select-none cursor-col-resize"
      onMouseMove={e => update(e.clientX)}
      onTouchMove={e => update(e.touches[0].clientX)}
    >
      {/* After — base layer */}
      <img src={afterSrc} alt={afterAlt} className="absolute inset-0 w-full h-full object-cover" />
      {/* Before — clipped left */}
      <div className="absolute top-0 left-0 h-full overflow-hidden" style={{ width: `${pct}%` }}>
        <img
          src={beforeSrc}
          alt={beforeAlt}
          className="absolute top-0 left-0 h-full object-cover"
          style={{ width: ref.current ? `${ref.current.clientWidth}px` : "100%" }}
        />
      </div>
      {/* Divider line + handle */}
      <div
        className="absolute top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#8DBD42]/40 via-[#8DBD42] to-[#8DBD42]/40 shadow-[0_0_8px_rgba(141,189,66,0.6)]"
        style={{ left: `${pct}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-2 border-[#8DBD42] text-[#8DBD42] flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.15),0_0_15px_rgba(141,189,66,0.35)]">
          <ChevronsLeftRight size={20} />
        </div>
      </div>
      {/* Labels */}
      <span className="absolute top-5 left-5 z-10 rounded-full bg-[#292b2d]/85 backdrop-blur-sm text-white px-5 py-2 uppercase tracking-[0.2em] text-xs font-black pointer-events-none">
        Before
      </span>
      <span className="absolute top-5 right-5 z-10 rounded-full bg-[#8DBD42]/95 text-white px-5 py-2 uppercase tracking-[0.2em] text-xs font-black pointer-events-none">
        After
      </span>
    </div>
  );
}

function StatCounter({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "-50px",
  });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const ctrl = animate(0, value, {
      duration: 1.8,
      ease: [0.21, 1, 0.36, 1],
      onUpdate(latest) {
        if (ref.current)
          ref.current.textContent =
            Math.round(latest).toLocaleString() + suffix;
      },
    });
    return () => ctrl.stop();
  }, [inView, value, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#3F4143]/10 last:border-b-0">
      <button
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-bold text-[#3F4143] text-[15px] leading-snug font-serif group-hover:text-[#8DBD42] transition-colors">
          {question}
        </span>
        <ChevronDown
          size={17}
          className={`text-[#8DBD42] flex-shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[300px] opacity-100 pb-5" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-[#3F4143]/70 text-[15px] leading-relaxed font-sans">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function LocationPage() {
  const params = useParams();
  const city = getLocationBySlug(params.slug);

  if (!city) {
    return (
      <Layout>
        <div className="min-h-screen bg-brand-linen pt-[160px] pb-24 text-center px-6">
          <h1 className="text-3xl font-bold text-[#3F4143] font-serif mb-4">
            Service area not found
          </h1>
          <p className="text-[#3F4143]/70 mb-8">
            We couldn't find that location. Explore all the communities we serve.
          </p>
          <Link
            href="/service-areas"
            className="inline-flex items-center gap-2 bg-[#8DBD42] text-white px-6 py-3 font-bold"
          >
            View Service Areas <ArrowRight size={16} />
          </Link>
        </div>
      </Layout>
    );
  }

  const office = city.office === "North" ? NORTH_OFFICE : SOUTH_OFFICE;
  const canonical = `${BASE_URL}/service-area/${city.slug}`;
  const pageTitle = `Fire, Water & Storm Damage Restoration in ${city.full} | Heritage Restoration`;
  const metaDescription = `24/7 emergency fire, water & storm damage restoration in ${city.full}. IICRC-certified, 60-minute response, direct insurance billing. Serving ${city.county} since 2004. Call (360) 345-1015.`;
  const schema = buildLocationSchema(city);
  const localFaqs = FAQ_SCHEMA_ITEMS.slice(0, 6);

  const nearbyCityLinks = LOCATIONS.filter(
    l => l.slug !== city.slug && city.nearby.some(n => l.name === n)
  ).slice(0, 4);

  return (
    <Layout>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta
          name="keywords"
          content={`fire damage restoration ${city.name} WA, water damage restoration ${city.name}, storm damage repair ${city.name}, mold remediation ${city.name}, ${city.county} restoration company`}
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={`${BASE_URL}${HERO_IMAGE}`} />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="geo.region" content="US-WA" />
        <meta name="geo.placename" content={city.full} />
        <meta name="geo.position" content={`${city.lat};${city.lng}`} />
        <meta name="ICBM" content={`${city.lat}, ${city.lng}`} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <div className="min-h-screen bg-brand-linen pt-[112px] sm:pt-[116px] lg:pt-[152px]">

        {/* ── Hero — with trust strip anchored at bottom ── */}
        <section className="relative overflow-hidden bg-white">
          <img
            src={HERO_IMAGE}
            alt={`Property damage restoration in ${city.full}`}
            className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
          />
          {/* Strong white on left fading to transparent — text stays readable */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.97) 28%, rgba(255,255,255,0.62) 50%, rgba(255,255,255,0.12) 70%, transparent 100%)",
            }}
          />
          {/* Subtle right-edge darkening */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to left, rgba(26,49,31,0.30) 0%, transparent 32%)",
            }}
          />
          {/* Mobile: extra white so text is readable on small screens */}
          <div className="absolute inset-0 bg-white/60 lg:hidden pointer-events-none" />

          <div className="relative z-10 min-h-[400px] md:min-h-[460px] flex items-center w-full">
            <div className="px-6 pt-14 pb-8 md:pt-8 md:pb-8 lg:pl-[192px] lg:pt-8 lg:pb-8 max-w-[880px]">
              <FadeIn className="space-y-6" direction="up">
                <span className="text-[#8DBD42] uppercase tracking-[0.24em] text-[11px] font-black flex items-center gap-2.5">
                  <span className="w-8 h-[2px] bg-[#8DBD42]" />
                  {city.county} &middot; 24/7 Emergency Response
                </span>
                <h1 className="text-[34px] md:text-[50px] lg:text-[56px] font-bold leading-[1.1] font-serif text-[#2a2c2e]">
                  Fire, Water &amp; Storm<br className="hidden sm:block" /> Damage Restoration<br className="hidden sm:block" /> in {city.name}, WA
                </h1>
                <p className="text-base md:text-[17px] text-[#3F4143]/75 leading-relaxed max-w-xl font-sans">
                  {city.blurb}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href="tel:+13603451015"
                    className="inline-flex items-center justify-center gap-2 bg-[#8DBD42] hover:bg-[#72a232] text-white px-7 py-4 font-bold text-base transition-all duration-200 shadow-lg hover:shadow-[0_8px_28px_rgba(141,189,66,0.4)] hover:scale-[1.02]"
                  >
                    <Phone size={18} /> Call (360) 345-1015
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 border-2 border-[#3F4143]/20 text-[#3F4143] bg-white/70 px-7 py-4 font-bold text-base hover:border-[#8DBD42] hover:text-[#8DBD42] transition-colors"
                  >
                    Free Damage Assessment <ArrowRight size={16} />
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Scrolling ticker strip */}
          <div className="relative z-10 bg-[#8DBD42] py-5 overflow-hidden">
            <style>{`
              @keyframes heritage-ticker {
                from { transform: translateX(0); }
                to { transform: translateX(-50%); }
              }
              .heritage-ticker { animation: heritage-ticker 45s linear infinite; }
            `}</style>
            <div className="heritage-ticker flex whitespace-nowrap w-max">
              {[...Array(2)].map((_, setIdx) => (
                <div key={setIdx} className="flex">
                  {[
                    "Direct Insurance Billing",
                    "Licensed & Bonded in WA",
                    "22+ Years Serving Washington",
                    "Locally Owned & Operated",
                  ].map(item => (
                    <span key={item} className="flex items-center">
                      <span className="px-7 font-black text-[15px] uppercase tracking-[0.18em] text-[#1A311F]">
                        {item}
                      </span>
                      <span className="text-[#1A311F]/30 text-[10px]">✦</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>


          {/* Trust strip — badge images */}
          <div className="relative z-10 bg-white border-t border-gray-100">
            <Container>
              <div className="flex items-center justify-center gap-10 md:gap-20 py-8 md:py-10">
                {[
                  { src: "/photo/emergency-badge-new-2.png", alt: "24 HR Emergency Response", label: "Emergency Response" },
                  { src: "/photo/iicrc-badge-new-3.png", alt: "IICRC Certified", label: "IICRC Certified" },
                  { src: "/photo/warranty-badge-new-3.png", alt: "5-Year Warranty", label: "5-Year Warranty" },
                ].map((badge, i) => (
                  <FadeIn key={badge.label} delay={i * 0.1} direction="up">
                    <div className="flex items-center justify-center">
                      <img
                        src={badge.src}
                        alt={badge.alt}
                        className="h-28 md:h-32 w-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
                      />
                    </div>
                  </FadeIn>
                ))}
              </div>
            </Container>
          </div>
        </section>

        {/* ── Reviews strip ── */}
        <div className="bg-white border-b border-gray-100 py-14 md:py-16">
          <Container>
            <FadeIn direction="up" className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-8 text-center">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-[#F5A623]" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
                <span className="font-black text-[#3F4143] text-lg ml-2">4.9</span>
              </div>
              <span className="text-[#3F4143]/40 text-sm font-sans sm:ml-2">Based on 80+ verified Google reviews</span>
            </FadeIn>
            <div className="grid md:grid-cols-3 gap-5">
              {REVIEWS.map((r, i) => (
                <FadeIn key={r.name} delay={i * 0.1} direction="up">
                  <div className="bg-brand-linen rounded-2xl p-6 flex flex-col h-full">
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(r.stars)].map((_, j) => (
                        <svg key={j} className="w-4 h-4 fill-[#F5A623]" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      ))}
                    </div>
                    <p className="text-[#3F4143]/80 text-[14px] leading-relaxed font-sans mb-4 flex-1 italic">"{r.text}"</p>
                    <div>
                      <p className="font-bold text-[#3F4143] text-sm">{r.name}</p>
                      <p className="text-[#3F4143]/50 text-xs font-sans">{r.location}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </div>

        {/* ── Intro + full-bleed truck photo ── */}
        <section className="bg-[#E8F5E0] overflow-hidden">
          <div className="lg:grid lg:grid-cols-2">

            {/* Text side */}
            <FadeIn direction="up" className="py-16 md:py-24 px-6 md:px-14 lg:px-16 xl:px-20 max-w-[660px] md:max-w-none flex flex-col justify-center">
              <span className="overline-label">Local Restoration</span>
              <h2 className="text-3xl md:text-[42px] font-bold text-[#3F4143] mt-2 mb-5 font-serif leading-tight">
                Your Trusted Restoration Company in {city.name}
              </h2>
              <p className="text-[#3F4143]/70 leading-relaxed font-sans mb-4 text-[15px]">
                When fire, water, or storm damage strikes a home or business in{" "}
                {city.name}, every minute counts. Heritage Restoration is{" "}
                {city.distance}, so our IICRC-certified crews reach {city.full} fast —
                securing your property, stopping further damage, and starting
                recovery the same day.
              </p>
              <p className="text-[#3F4143]/70 leading-relaxed font-sans mb-8 text-[15px]">
                We've served {city.county} property owners since 2004, working near{" "}
                {city.landmark} and throughout {city.nearby.slice(0, 3).join(", ")}.
                As a locally owned contractor, we advocate for you — not the
                insurance company — and handle your claim from first call to
                final walk-through.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+13603451015"
                  className="inline-flex items-center justify-center gap-2 bg-[#8DBD42] hover:bg-[#72a232] text-white px-6 py-3.5 font-bold text-sm transition-colors"
                >
                  <Phone size={16} /> Call (360) 345-1015
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#3F4143]/15 text-[#3F4143] px-6 py-3.5 font-bold text-sm hover:border-[#8DBD42] hover:text-[#8DBD42] transition-colors"
                >
                  Request Free Assessment <ArrowRight size={15} />
                </Link>
              </div>
            </FadeIn>

            {/* Photo — full height, bleeds to right edge */}
            <FadeIn direction="left" className="relative min-h-[340px] lg:min-h-0">
              <img
                src={TRUCK_PHOTO}
                alt={`Heritage Restoration crew on the way to a job in ${city.name}`}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-linen/50 via-transparent to-transparent lg:from-brand-linen/30" />
              {/* Floating badge */}
              <div className="absolute bottom-6 right-6 bg-[#1A311F] rounded-xl text-white px-5 py-4 shadow-xl">
                <div className="text-3xl font-black font-serif text-[#8DBD42] leading-none">22</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-white/60 mt-1">
                  Years in Washington
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── Process — connected circles ── */}
        <section className="bg-white py-20 md:py-28 border-t border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8DBD42]/20 to-transparent" />
          <Container>
            <FadeIn className="text-center mb-20" direction="up">
              <span className="overline-label">How We Work</span>
              <h2 className="text-3xl md:text-[42px] font-bold text-[#3F4143] mt-2 font-serif">
                What Happens When You Call Us
              </h2>
              <p className="text-[#3F4143]/65 font-sans mt-3 max-w-lg mx-auto text-[15px]">
                A clear, no-surprises process — from first call to final walk-through.
              </p>
            </FadeIn>

            <div className="relative">
              {/* SVG curved connectors — desktop only */}
              <svg
                className="hidden lg:block absolute pointer-events-none"
                style={{ top: "54px", left: "12.5%", width: "75%", height: "36px" }}
                viewBox="0 0 300 36"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M 0,18 Q 50,2 100,18" fill="none" stroke="#8DBD42" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.45"/>
                <path d="M 100,18 Q 150,2 200,18" fill="none" stroke="#8DBD42" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.45"/>
                <path d="M 200,18 Q 250,2 300,18" fill="none" stroke="#8DBD42" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.45"/>
              </svg>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
                {PROCESS.map((step, idx) => (
                  <FadeIn key={step.num} delay={idx * 0.14} direction="up">
                    <div className="group flex flex-col items-center text-center">
                      {/* Step number label */}
                      <span className="text-[11px] font-black uppercase tracking-[0.22em] text-[#8DBD42] mb-3">
                        {step.num}
                      </span>
                      {/* Circle icon */}
                      <div className="relative z-10 w-[72px] h-[72px] rounded-full bg-[#8DBD42]/12 border-2 border-[#8DBD42]/40 shadow-[0_6px_28px_rgba(141,189,66,0.18)] flex items-center justify-center text-[#8DBD42] mb-6 group-hover:bg-[#8DBD42] group-hover:border-[#8DBD42] group-hover:text-white group-hover:shadow-[0_8px_32px_rgba(141,189,66,0.35)] transition-all duration-300">
                        {/* Inner ring */}
                        <span className="absolute inset-[6px] rounded-full border border-[#8DBD42]/25 group-hover:border-white/20 transition-colors duration-300" />
                        <span className="relative">{step.icon}</span>
                      </div>
                      <h3 className="font-bold text-[#3F4143] text-[16px] mb-2.5 font-serif leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-[#3F4143]/65 text-[14px] leading-relaxed font-sans">
                        {step.desc}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ── Services — numbered cards, light green bg ── */}
        <section className="relative bg-white overflow-hidden pb-16 md:pb-24">
          {/* Light green top band covers title + top half of cards */}
          <div className="absolute top-0 left-0 right-0 h-[340px] md:h-[360px] bg-[#E8F5E0]" />
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#E8F5E0]" />
          {/* Subtle glow on light band */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] rounded-full bg-[#8DBD42]/8 blur-[80px] pointer-events-none" />

          <Container className="relative z-10 pt-20">
            <FadeIn className="text-center mb-14 text-[#3F4143]" direction="up">
              <span className="text-[11px] font-black uppercase tracking-[0.22em] text-[#8DBD42]">What We Do</span>
              <h2 className="text-3xl md:text-[42px] font-bold mt-2 font-serif">
                Restoration Services in {city.name}
              </h2>
              <p className="text-[#3F4143]/65 font-sans mt-3 max-w-lg mx-auto text-[15px]">
                From the first emergency call to the final walk-through — we handle every step.
              </p>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {SERVICES.map((s, idx) => (
                <FadeIn
                  key={s.title}
                  delay={idx * 0.1}
                  direction="up"
                  className="group bg-white rounded-2xl p-7 flex flex-col shadow-[0_8px_32px_rgba(0,0,0,0.10)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.18)] hover:-translate-y-2 transition-all duration-300"
                >
                  {/* Large number */}
                  <span className="text-[52px] font-black font-serif text-[#8DBD42]/18 leading-none mb-1 group-hover:text-[#8DBD42]/32 transition-colors duration-300 select-none">
                    0{idx + 1}
                  </span>
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-[#8DBD42]/10 flex items-center justify-center text-[#8DBD42] mb-4 group-hover:bg-[#8DBD42] group-hover:text-white transition-all duration-300">
                    {s.icon}
                  </div>
                  <h3 className="font-bold text-[#3F4143] text-[17px] mb-2.5 font-serif leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-[#3F4143]/65 text-sm leading-relaxed font-sans mb-5 flex-1">
                    {s.desc}
                  </p>
                  <Link
                    href={s.href}
                    className="inline-flex items-center gap-1.5 text-[#8DBD42] font-bold text-sm group-hover:gap-3 transition-all duration-200"
                  >
                    {s.cta} <ArrowRight size={14} />
                  </Link>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>

        {/* ── Neighborhoods ── */}
        <section className="bg-white py-12 md:py-16 border-t border-gray-100">
          <Container size="narrow">
            <FadeIn direction="up" className="text-center mb-10">
              <span className="overline-label">Coverage</span>
              <h2 className="text-2xl md:text-[34px] font-bold text-[#3F4143] mt-2 font-serif">
                {city.name} Neighborhoods We Serve
              </h2>
              <p className="text-[#3F4143]/65 font-sans mt-3 max-w-md mx-auto text-[15px]">
                Our crews know every neighborhood in {city.name} — response time doesn't change based on where you live.
              </p>
            </FadeIn>
            <FadeIn direction="up" className="flex flex-wrap justify-center gap-3">
              {city.neighborhoods.map(n => (
                <div
                  key={n}
                  className="flex items-center gap-2 bg-brand-linen rounded-full text-[#3F4143]/75 text-sm font-semibold px-5 py-2.5 hover:text-[#8DBD42] hover:bg-[#8DBD42]/10 transition-colors cursor-default"
                >
                  <MapPin size={12} className="text-[#8DBD42]" />
                  {n}
                </div>
              ))}
            </FadeIn>
            <FadeIn direction="up" className="mt-7 text-center">
              <p className="text-[#3F4143]/60 text-sm font-sans">
                Don't see your neighborhood?{" "}
                <a href="tel:+13603451015" className="text-[#8DBD42] font-bold hover:underline">
                  Call us
                </a>{" "}
                — we cover all of {city.county}.
              </p>
            </FadeIn>
          </Container>
        </section>

        {/* ── Why Heritage — photo left, checklist right ── */}
        <section className="bg-brand-linen overflow-hidden py-0">
          <div className="lg:grid lg:grid-cols-2">

            {/* Before/After slider — full height, bleeds to left edge */}
            <FadeIn direction="right" className="relative min-h-[380px] lg:min-h-[640px] overflow-hidden">
              <BeforeAfterSlider
                beforeSrc={BEFORE_IMG}
                afterSrc={AFTER_IMG}
                beforeAlt={`Fire damage before Heritage Restoration`}
                afterAlt={`Fully restored home by Heritage Restoration in ${city.name}`}
              />
              {/* Warranty badge — bottom right */}
              <img
                src="/photo/warranty-badge-new-3.png"
                alt="5-Year Warranty"
                className="absolute bottom-4 right-4 z-20 w-56 md:w-64 pointer-events-none drop-shadow-2xl"
              />
            </FadeIn>

            {/* Content side — light green panel */}
            <FadeIn direction="up" className="bg-[#eef7de] py-16 md:py-24 px-6 md:px-14 lg:px-16 xl:px-20 flex flex-col justify-center">
              <span className="text-[11px] font-black uppercase tracking-[0.22em] text-[#8DBD42]">Why Heritage</span>
              <h2 className="text-3xl md:text-[38px] font-bold text-[#8DBD42] mt-2 mb-3 font-serif leading-tight">
                Why {city.name} Homeowners Choose Us
              </h2>
              <p className="text-[#3F4143]/70 font-sans text-[15px] leading-relaxed mb-8">
                We're not a franchise dispatched from out of state. Our crews are
                based right here — we know {city.county}, we respond faster, and
                we stay with you through every step of the insurance process.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: <MapPin size={20} />, label: "Locally Owned", text: `Not an out-of-town franchise — rooted in ${city.county}` },
                  { icon: <Clock size={20} />, label: "60-Min Emergency Response", text: "24/7/365 dispatch including all holidays" },
                  { icon: <ShieldCheck size={20} />, label: "Certified & Licensed", text: "IICRC-certified techs and licensed WA general contractor" },
                  { icon: <BadgeCheck size={20} />, label: "Price Matching", text: "We bill your carrier directly — you pay only your deductible" },
                ].map((item, i) => (
                  <FadeIn key={i} delay={i * 0.08} direction="up">
                    <div className="flex gap-4 items-start group">
                      <div className="w-12 h-12 rounded-xl bg-[#8DBD42] flex items-center justify-center text-white flex-shrink-0 shadow-[0_4px_16px_rgba(141,189,66,0.30)] group-hover:bg-[#8DBD42]/80 transition-colors duration-300">
                        {item.icon}
                      </div>
                      <div className="pt-0.5">
                        <p className="text-[#8DBD42] font-black text-[15px] font-serif mb-0.5">{item.label}</p>
                        <p className="text-[#3F4143]/65 text-[13px] leading-snug font-sans">{item.text}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+13603451015"
                  className="inline-flex items-center justify-center gap-2 bg-[#8DBD42] hover:bg-[#72a232] text-white px-6 py-3.5 font-bold text-sm transition-colors duration-200 rounded-lg shadow-lg"
                >
                  <Phone size={16} /> Call (360) 345-1015
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#8DBD42]/25 text-[#8DBD42] px-6 py-3.5 font-bold text-sm hover:border-[#8DBD42] hover:text-[#8DBD42] transition-colors rounded-lg"
                >
                  Request Assessment <ArrowRight size={15} />
                </Link>
              </div>
              <p className="text-[#3F4143]/50 text-xs font-sans mt-4">
                Available 24 hours a day, 7 days a week, 365 days a year
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── FAQ — clean borderless accordion ── */}
        <section className="bg-white py-20 md:py-24 border-t border-gray-100">
          <Container size="narrow">
            <FadeIn className="text-center mb-12" direction="up">
              <span className="overline-label">Common Questions</span>
              <h2 className="text-3xl md:text-[42px] font-bold text-[#3F4143] mt-2 font-serif">
                {city.name} Restoration FAQs
              </h2>
              <p className="text-[#3F4143]/65 font-sans mt-3 max-w-lg mx-auto text-[15px]">
                Answers to the questions we hear most from {city.county} homeowners.
              </p>
            </FadeIn>
            <div className="max-w-3xl mx-auto">
              {localFaqs.map((f, idx) => (
                <FadeIn key={idx} delay={idx * 0.04} direction="up">
                  <FaqItem question={f.question} answer={f.answer} />
                </FadeIn>
              ))}
            </div>
            <FadeIn direction="up" className="mt-10 text-center">
              <Link
                href="/resources/faq"
                className="inline-flex items-center gap-2 text-[#8DBD42] font-bold text-sm hover:underline"
              >
                View all FAQs <ArrowRight size={13} />
              </Link>
            </FadeIn>
          </Container>
        </section>

        {/* ── Nearby Communities + Emergency CTA — combined light green ── */}
        <section className="bg-[#eef7de] py-20 md:py-28 relative overflow-hidden">
          {/* Decorative accents */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#8DBD42]" />
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#8DBD42]/30" />
          <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-[#8DBD42]/8 blur-[130px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#1A311F]/5 blur-[100px] pointer-events-none" />

          <Container>
            <div className="lg:grid lg:grid-cols-[1fr_460px] lg:gap-20 items-start">

              {/* Left — serving area + stats + city links */}
              <FadeIn direction="up">
                <span className="text-[11px] font-black uppercase tracking-[0.22em] text-[#55664a]">Nearby Communities</span>
                <h2 className="text-[28px] md:text-[38px] font-black font-serif text-[#1A311F] mt-2 mb-4 uppercase leading-tight">
                  Serving {city.name} and the<br className="hidden sm:block" /> Greater {city.county} Area
                </h2>
                <p className="text-[#3F4143]/65 font-sans text-[15px] leading-relaxed mb-8 max-w-md">
                  Heritage covers the I-5 corridor through Western Washington — from Lewis County north through Pierce County. Every crew dispatched from our local Lacey headquarters.
                </p>

                {/* Big counter */}
                <div className="mb-8 pb-8 border-b border-[#1A311F]/12">
                  <div className="text-[80px] md:text-[100px] font-black font-serif text-[#8DBD42] leading-none tabular-nums">
                    <StatCounter value={22} suffix="+" label="Years" />
                  </div>
                  <div className="text-[12px] font-black uppercase tracking-[0.22em] text-[#3F4143]/45 mt-1">
                    Years Serving Washington
                  </div>
                  {/* Trust badges */}
                  <div className="flex items-center gap-6 mt-6">
                    <div className="flex flex-col items-center text-center">
                      <img src="/photo/emergency-badge-new-2.png" alt="Emergency Response" className="h-16 w-auto object-contain drop-shadow-md" />
                      <p className="mt-1 font-bold uppercase tracking-[0.1em] text-[10px] text-[#3F4143]/60">Emergency Response</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <img src="/photo/iicrc-badge-new-3.png" alt="IICRC Certified" className="h-16 w-auto object-contain drop-shadow-md" />
                      <p className="mt-1 font-bold uppercase tracking-[0.1em] text-[10px] text-[#3F4143]/60">IICRC Certified</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <img src="/photo/warranty-badge-new-3.png" alt="5-Year Warranty" className="h-16 w-auto object-contain drop-shadow-md" />
                      <p className="mt-1 font-bold uppercase tracking-[0.1em] text-[10px] text-[#3F4143]/60">5-Year Warranty</p>
                    </div>
                  </div>
                </div>

                {/* City links */}
                {nearbyCityLinks.length > 0 && (
                  <>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {nearbyCityLinks.map((nearby, idx) => (
                        <FadeIn key={nearby.slug} delay={idx * 0.07} direction="up">
                          <Link
                            href={`/service-area/${nearby.slug}`}
                            className="group flex items-center gap-2.5 bg-white hover:bg-[#8DBD42]/8 border border-[#1A311F]/10 hover:border-[#8DBD42]/40 rounded-xl px-4 py-3 transition-all duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                          >
                            <MapPin size={13} className="text-[#8DBD42] flex-shrink-0" />
                            <div className="min-w-0">
                              <div className="font-bold text-[#1A311F] text-[13px] group-hover:text-[#8DBD42] transition-colors leading-tight truncate">
                                {nearby.name}, WA
                              </div>
                              <div className="text-[#3F4143]/40 text-[11px] font-sans">{nearby.county}</div>
                            </div>
                            <ArrowRight size={12} className="text-[#3F4143]/20 group-hover:text-[#8DBD42] ml-auto flex-shrink-0 group-hover:translate-x-0.5 transition-all duration-200" />
                          </Link>
                        </FadeIn>
                      ))}
                    </div>
                    <Link
                      href="/service-areas"
                      className="inline-flex items-center gap-2 text-[#3F4143]/50 hover:text-[#8DBD42] font-bold text-sm transition-colors"
                    >
                      View all service areas <ArrowRight size={13} />
                    </Link>
                  </>
                )}
              </FadeIn>

              {/* Right — Emergency CTA */}
              <FadeIn direction="up" delay={0.15} className="mt-16 lg:mt-0">
                {/* Card container */}
                <div className="bg-[#1A311F] rounded-3xl p-8 md:p-10 shadow-[0_32px_80px_rgba(26,49,31,0.22)] relative overflow-hidden">
                  {/* Subtle inner glow */}
                  <div className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full bg-[#8DBD42]/10 blur-[60px] pointer-events-none" />

                  {/* Live indicator */}
                  <FadeIn direction="up" className="flex items-center gap-2.5 mb-6 relative z-10">
                    <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8DBD42] opacity-60" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#8DBD42]" />
                    </span>
                    <span className="text-[#8DBD42] text-[10px] font-black uppercase tracking-[0.26em]">
                      Live Dispatch — {city.county} — 24 / 7 / 365
                    </span>
                  </FadeIn>

                  {/* Headline */}
                  <FadeIn direction="up" className="relative z-10 text-white">
                    <h2 className="text-[36px] md:text-[48px] font-black font-serif leading-[1.05] mb-2">
                      Damage in {city.name}?
                    </h2>
                    <p className="text-[#8DBD42] text-[36px] md:text-[48px] font-black font-serif leading-[1.05] mb-5">
                      We're on our way.
                    </p>
                    <p className="text-white/50 font-sans text-[14px] leading-relaxed mb-8">
                      Based {city.distance}. IICRC-certified crews dispatched in under 60 minutes — around the clock, every day of the year, including holidays.
                    </p>
                  </FadeIn>

                  {/* Phone button */}
                  <FadeIn direction="up" className="relative z-10 space-y-3">
                    <a
                      href="tel:+13603451015"
                      className="flex flex-col items-center gap-1 w-full bg-[#8DBD42] hover:bg-[#72a232] text-white px-6 py-4 font-bold transition-all duration-200 shadow-[0_0_40px_rgba(141,189,66,0.25)] hover:shadow-[0_0_60px_rgba(141,189,66,0.45)] hover:scale-[1.02] rounded-xl"
                    >
                      <span className="flex items-center gap-3 text-[22px] font-black">
                        <Phone size={20} /> (360) 345-1015
                      </span>
                      <span className="text-white/70 text-[10px] font-semibold uppercase tracking-widest">
                        Tap to Call — Answered 24/7
                      </span>
                    </a>
                    <Link
                      href="/contact"
                      className="flex items-center justify-center gap-2 w-full border border-white/15 hover:border-[#8DBD42]/60 text-white/60 hover:text-[#8DBD42] px-6 py-3 font-bold text-sm transition-colors rounded-xl"
                    >
                      Request Free Damage Assessment <ArrowRight size={14} />
                    </Link>
                  </FadeIn>

                  {/* Trust row */}
                  <FadeIn direction="up" className="relative z-10 flex flex-wrap gap-x-5 gap-y-3 mt-7 pt-7 border-t border-white/10">
                    {[
                      { icon: <Clock size={13} />, text: "60-Min Response" },
                      { icon: <ShieldCheck size={13} />, text: "IICRC Certified" },
                      { icon: <BadgeCheck size={13} />, text: "5-Year Warranty" },
                      { icon: <CheckCircle size={13} />, text: "Direct Insurance Billing" },
                    ].map(item => (
                      <div key={item.text} className="flex items-center gap-1.5 text-white/55 text-[12px] font-semibold">
                        <span className="text-[#8DBD42]">{item.icon}</span>
                        {item.text}
                      </div>
                    ))}
                  </FadeIn>
                </div>
              </FadeIn>

            </div>
          </Container>
        </section>
      </div>
    </Layout>
  );
}
