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
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import {
  getLocationBySlug,
  NORTH_OFFICE,
  SOUTH_OFFICE,
  LOCATIONS,
} from "@/data/locations";
import { BASE_URL, buildLocationSchema, FAQ_SCHEMA_ITEMS } from "@/seo";

const HERO_IMAGE = "/photo/hero-new.jpg";

const SERVICES = [
  {
    icon: <Flame size={26} />,
    title: "Fire & Smoke Restoration",
    desc: "Soot removal, odor neutralization, structural repair, and full rebuild after fire damage. We document everything for your insurance claim.",
    href: "/services/fire-restoration",
    img: "/photo/fire-structural-rebuild.jpg",
  },
  {
    icon: <Droplets size={26} />,
    title: "Water Damage Restoration",
    desc: "Emergency extraction, structural drying, and mold prevention using IICRC-certified methods. Direct insurance billing available.",
    href: "/services/water-restoration",
    img: "/photo/water-flooded-hallway.jpg",
  },
  {
    icon: <CloudLightning size={26} />,
    title: "Storm Damage Recovery",
    desc: "Emergency roof tarping, tree and debris removal, board-ups, and complete structural reconstruction after Pacific Northwest storms.",
    href: "/services/storm-recovery",
    img: "/photo/storm-hero.jpg",
  },
  {
    icon: <Boxes size={26} />,
    title: "Contents Pack-Out & Storage",
    desc: "Professional inventory, cleaning, deodorization, and climate-controlled storage of your belongings during reconstruction.",
    href: "/services/contents-services",
    img: "/photo/contents-hero.png",
  },
];

const TRUST = [
  { icon: <Clock size={20} />, label: "60-Minute Response" },
  { icon: <ShieldCheck size={20} />, label: "IICRC Certified" },
  { icon: <BadgeCheck size={20} />, label: "5-Year Warranty" },
  { icon: <CheckCircle size={20} />, label: "Direct Insurance Billing" },
];

const STATS = [
  { value: 1800, suffix: "+", label: "Projects Completed" },
  { value: 20, suffix: "+ yrs", label: "Serving Washington" },
  { value: 60, suffix: " min", label: "Emergency Response" },
  { value: 5, suffix: "-Year", label: "Workmanship Warranty" },
];

const PROCESS = [
  {
    num: "01",
    icon: <PhoneCall size={22} />,
    title: "Call — We Answer 24/7",
    desc: "Our emergency line is staffed around the clock by real local dispatchers — not a call center. A certified crew is routed to your property within minutes of your call.",
  },
  {
    num: "02",
    icon: <ClipboardList size={22} />,
    title: "On-Site Assessment",
    desc: "Our technician arrives within 60 minutes, documents all damage with 3D DocuSketch imaging, secures the property, and provides a clear scope of work for your insurance adjuster.",
  },
  {
    num: "03",
    icon: <Hammer size={22} />,
    title: "Certified Restoration",
    desc: "IICRC-certified crews perform full mitigation and reconstruction — water extraction, structural drying, soot removal, structural repairs, and complete rebuilding to current code.",
  },
  {
    num: "04",
    icon: <FileCheck size={22} />,
    title: "Insurance Handled for You",
    desc: "We prepare Xactimate estimates, coordinate directly with your adjuster, and bill your carrier. You typically pay only your deductible. Our 5-year warranty covers all completed work.",
  },
];

const WHY_ITEMS = [
  "Locally owned — not an out-of-town franchise",
  "60-minute emergency response, 24/7/365 including holidays",
  "IICRC-certified technicians and a licensed WA general contractor",
  "Direct insurance billing — you typically pay only your deductible",
  "3D DocuSketch documentation and Xactimate estimates for your claim",
  "Backed by our 5-year workmanship warranty",
];

function StatCounter({
  value,
  suffix,
  label,
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
    <div className="bg-white border border-[#3F4143]/10 overflow-hidden">
      <button
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-[#8DBD42]/4 transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-bold text-[#3F4143] text-[15px] leading-snug font-serif">
          {question}
        </span>
        <ChevronDown
          size={18}
          className={`text-[#8DBD42] flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-[#3F4143]/8 px-6 pb-6 pt-4">
          <p className="text-[#3F4143]/70 text-sm leading-relaxed font-sans">
            {answer}
          </p>
        </div>
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
            We couldn't find that location. Explore all the communities we
            serve.
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

        {/* ── Hero ── */}
        <section className="relative text-white overflow-hidden border-b border-[#8DBD42]/20 min-h-[500px] md:min-h-[580px]">
          <img
            src={HERO_IMAGE}
            alt={`Property damage restoration in ${city.full}`}
            className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.65]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(14,27,17,0.96) 0%, rgba(20,38,24,0.78) 36%, rgba(20,38,24,0.35) 65%, rgba(14,27,17,0.10) 100%)",
            }}
          />
          <div className="relative z-10 grid lg:grid-cols-12 min-h-[500px] md:min-h-[580px]">
            <div className="lg:col-span-8 flex flex-col justify-center px-6 py-14 md:py-20 max-w-[840px] mx-auto lg:mx-0 lg:pl-16">
              <FadeIn className="space-y-6" direction="up">
                <span className="text-[#8DBD42] uppercase tracking-[0.22em] text-xs font-black flex items-center gap-2">
                  <span className="w-6 h-[2px] bg-[#8DBD42]" />
                  {city.county} &middot; 24/7 Emergency Service
                </span>
                <h1 className="text-3xl md:text-[52px] lg:text-[58px] font-bold leading-[1.07] font-serif">
                  Fire, Water &amp; Storm Damage Restoration in {city.name}, WA
                </h1>
                <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-2xl font-sans font-light">
                  {city.blurb}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-1">
                  <a
                    href="tel:+13603451015"
                    className="inline-flex items-center justify-center gap-2 bg-[#8DBD42] hover:bg-[#72a232] text-white px-7 py-3.5 font-bold text-base transition-all duration-200 shadow-lg hover:scale-105"
                  >
                    <Phone size={18} /> Call (360) 345-1015
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white px-7 py-3.5 font-bold text-base hover:border-[#8DBD42] hover:text-[#8DBD42] transition-colors"
                  >
                    Free Damage Assessment <ArrowRight size={16} />
                  </Link>
                </div>
                <p className="text-white/50 text-xs font-sans tracking-wide pt-1">
                  We answer 24/7 &nbsp;&middot;&nbsp; Crews dispatched immediately &nbsp;&middot;&nbsp; Based in Western Washington
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── Trust bar ── */}
        <div className="bg-[#1A311F] text-white">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
              {TRUST.map(t => (
                <div
                  key={t.label}
                  className="flex items-center justify-center gap-2.5 py-5 px-3 text-center"
                >
                  <span className="text-[#8DBD42]">{t.icon}</span>
                  <span className="text-[13px] md:text-sm font-bold tracking-wide">
                    {t.label}
                  </span>
                </div>
              ))}
            </div>
          </Container>
        </div>

        {/* ── Stats strip ── */}
        <div className="bg-white border-b border-[#3F4143]/8">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#3F4143]/8">
              {STATS.map(s => (
                <div key={s.label} className="text-center py-10 px-6">
                  <div className="text-4xl md:text-5xl font-black text-[#8DBD42] font-serif mb-2 leading-none">
                    <StatCounter
                      value={s.value}
                      suffix={s.suffix}
                      label={s.label}
                    />
                  </div>
                  <div className="text-[#3F4143]/55 text-[10px] font-black uppercase tracking-widest">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </div>

        {/* ── Localized intro ── */}
        <Section bg="none" className="py-16 md:py-20">
          <Container size="narrow">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-7">
                <FadeIn direction="up">
                  <span className="overline-label">Local Restoration</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#3F4143] mt-2 mb-5 font-serif">
                    Your Trusted Restoration Company in {city.name}
                  </h2>
                  <p className="text-[#3F4143]/75 leading-relaxed font-sans mb-4">
                    When fire, water, or storm damage strikes a home or business
                    in {city.name}, every minute counts. Heritage Restoration is{" "}
                    {city.distance}, so our IICRC-certified crews reach{" "}
                    {city.full} fast — securing your property, stopping further
                    damage, and starting recovery the same day.
                  </p>
                  <p className="text-[#3F4143]/75 leading-relaxed font-sans mb-4">
                    We've served {city.county} property owners since 2004, working
                    near {city.landmark} and throughout the surrounding
                    communities of {city.nearby.slice(0, 3).join(", ")}. As a
                    locally owned contractor, we advocate for you — not the
                    insurance company — and bill your carrier directly.
                  </p>
                  <p className="text-[#3F4143]/75 leading-relaxed font-sans">
                    From the moment you call to the final walk-through, our team
                    handles everything: damage assessment, insurance coordination,
                    permitting, and certified reconstruction — backed by our
                    5-year workmanship warranty.
                  </p>
                </FadeIn>
              </div>

              {/* Local info card */}
              <div className="lg:col-span-5">
                <FadeIn
                  direction="up"
                  className="bg-white border border-[#3F4143]/10 shadow-[0_10px_40px_rgba(0,0,0,0.06)] p-8"
                >
                  <div className="flex items-center gap-3 mb-6 pb-5 border-b border-[#3F4143]/8">
                    <div className="w-10 h-10 bg-[#8DBD42]/10 flex items-center justify-center">
                      <MapPin size={18} className="text-[#8DBD42]" />
                    </div>
                    <h3 className="font-bold text-[#3F4143] text-lg font-serif">
                      Serving {city.name} &amp; Nearby
                    </h3>
                  </div>
                  <ul className="space-y-5 text-sm font-sans">
                    <li className="flex items-start gap-3">
                      <MapPin
                        size={17}
                        className="text-[#8DBD42] flex-shrink-0 mt-0.5"
                      />
                      <span className="text-[#3F4143]/75">
                        <strong className="text-[#2f3133] block mb-0.5">
                          Nearest Office &mdash; {office.label}
                        </strong>
                        {office.street}
                        <br />
                        {office.city}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock
                        size={17}
                        className="text-[#8DBD42] flex-shrink-0 mt-0.5"
                      />
                      <span className="text-[#3F4143]/75">
                        <strong className="text-[#2f3133] block mb-0.5">
                          Response Time
                        </strong>
                        60 minutes or less, 24/7/365
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ShieldCheck
                        size={17}
                        className="text-[#8DBD42] flex-shrink-0 mt-0.5"
                      />
                      <span className="text-[#3F4143]/75">
                        <strong className="text-[#2f3133] block mb-0.5">
                          County Served
                        </strong>
                        {city.county}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle
                        size={17}
                        className="text-[#8DBD42] flex-shrink-0 mt-0.5"
                      />
                      <span className="text-[#3F4143]/75">
                        <strong className="text-[#2f3133] block mb-0.5">
                          ZIP Codes Served
                        </strong>
                        {city.zips.join(", ")}
                      </span>
                    </li>
                  </ul>
                  <div className="mt-6 space-y-3 pt-5 border-t border-[#3F4143]/8">
                    <a
                      href="tel:+13603451015"
                      className="flex items-center justify-center gap-2 bg-[#8DBD42] hover:bg-[#72a232] text-white py-3.5 font-bold text-sm transition-colors"
                    >
                      <Phone size={16} /> Call (360) 345-1015
                    </a>
                    <Link
                      href="/contact"
                      className="flex items-center justify-center gap-2 border-2 border-[#3F4143]/15 text-[#3F4143] py-3 font-bold text-sm hover:border-[#8DBD42] hover:text-[#8DBD42] transition-colors"
                    >
                      Request Free Assessment <ArrowRight size={15} />
                    </Link>
                  </div>
                </FadeIn>
              </div>
            </div>
          </Container>
        </Section>

        {/* ── How It Works (Process) ── */}
        <Section bg="white" className="border-t border-gray-100">
          <Container>
            <FadeIn className="mb-14 text-center" direction="up">
              <span className="overline-label">How It Works</span>
              <h2 className="text-3xl md:text-4.5xl font-bold text-[#3F4143] mt-2 font-serif">
                What Happens When You Call Heritage
              </h2>
              <p className="text-[#3F4143]/60 font-sans mt-3 max-w-xl mx-auto text-[15px]">
                A straightforward, no-surprises process from first call to final
                walk-through.
              </p>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 border border-[#3F4143]/8">
              {PROCESS.map((step, idx) => (
                <FadeIn
                  key={step.num}
                  delay={idx * 0.1}
                  direction="up"
                  className="border-r border-b sm:border-b-0 last:border-r-0 border-[#3F4143]/8 p-8 relative"
                >
                  <div className="text-[56px] font-black text-[#8DBD42]/12 font-serif leading-none mb-4 select-none">
                    {step.num}
                  </div>
                  <div className="w-10 h-10 bg-[#8DBD42]/10 flex items-center justify-center text-[#8DBD42] mb-4">
                    {step.icon}
                  </div>
                  <h3 className="font-bold text-[#3F4143] text-base mb-3 font-serif leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-[#3F4143]/60 text-sm leading-relaxed font-sans">
                    {step.desc}
                  </p>
                  {idx < PROCESS.length - 1 && (
                    <ArrowRight
                      size={16}
                      className="hidden lg:block absolute top-8 -right-2 text-[#8DBD42]/40 z-10"
                    />
                  )}
                </FadeIn>
              ))}
            </div>
          </Container>
        </Section>

        {/* ── Services with background images ── */}
        <Section bg="none" className="py-16 md:py-20">
          <Container>
            <FadeIn className="mb-14 text-center" direction="up">
              <span className="overline-label">What We Do</span>
              <h2 className="text-3xl md:text-4.5xl font-bold text-[#3F4143] mt-2 font-serif">
                Restoration Services in {city.name}
              </h2>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {SERVICES.map((s, idx) => (
                <FadeIn
                  key={s.title}
                  delay={idx * 0.08}
                  direction="up"
                  className="group relative overflow-hidden flex flex-col min-h-[360px]"
                >
                  <img
                    src={s.img}
                    alt={s.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1b11] via-[#1A311F]/75 to-[#1A311F]/40" />
                  <div className="relative z-10 flex flex-col flex-1 p-7">
                    <div className="w-10 h-10 bg-[#8DBD42]/20 flex items-center justify-center text-[#8DBD42] mb-auto">
                      {s.icon}
                    </div>
                    <div className="mt-auto pt-16">
                      <h3 className="font-bold text-white text-[17px] mb-2 font-serif leading-snug">
                        {s.title}
                      </h3>
                      <p className="text-white/65 text-sm leading-relaxed mb-5 font-sans">
                        {s.desc}
                      </p>
                      <Link
                        href={s.href}
                        className="inline-flex items-center gap-1.5 text-[#8DBD42] font-bold text-sm hover:gap-3 transition-all duration-200"
                      >
                        Learn more <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </Section>

        {/* ── Neighborhoods ── */}
        <Section bg="white" className="border-t border-gray-100">
          <Container size="narrow">
            <FadeIn direction="up" className="text-center mb-10">
              <span className="overline-label">Coverage</span>
              <h2 className="text-2xl md:text-3.5xl font-bold text-[#3F4143] mt-2 font-serif">
                {city.name} Neighborhoods We Serve
              </h2>
              <p className="text-[#3F4143]/60 font-sans mt-3 max-w-xl mx-auto text-[15px]">
                Our crews know every corner of {city.name} — whether you're in a
                newer development or an established neighborhood.
              </p>
            </FadeIn>
            <FadeIn
              direction="up"
              className="flex flex-wrap justify-center gap-3"
            >
              {city.neighborhoods.map(n => (
                <div
                  key={n}
                  className="flex items-center gap-2 bg-brand-linen border border-[#3F4143]/10 text-[#3F4143]/80 text-sm font-semibold px-5 py-2.5 hover:border-[#8DBD42]/50 hover:text-[#8DBD42] transition-colors"
                >
                  <MapPin size={13} className="text-[#8DBD42]" />
                  {n}
                </div>
              ))}
            </FadeIn>
            <FadeIn direction="up" className="mt-8 text-center">
              <p className="text-[#3F4143]/50 text-sm font-sans">
                Don't see your neighborhood?{" "}
                <a
                  href="tel:+13603451015"
                  className="text-[#8DBD42] font-bold hover:underline"
                >
                  Call us
                </a>{" "}
                — we serve all of {city.county}.
              </p>
            </FadeIn>
          </Container>
        </Section>

        {/* ── Why Heritage ── */}
        <Section bg="none" className="py-16 md:py-20">
          <Container size="narrow">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6">
                <FadeIn direction="up">
                  <span className="overline-label">Why Heritage</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#3F4143] mt-2 mb-7 font-serif">
                    Why {city.name} Chooses Heritage Restoration
                  </h2>
                  <div className="space-y-4">
                    {WHY_ITEMS.map((item, idx) => (
                      <div key={idx} className="flex gap-3 items-start">
                        <div className="w-5 h-5 bg-[#8DBD42]/12 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle size={13} className="text-[#8DBD42]" />
                        </div>
                        <p className="text-[#3F4143] font-semibold text-[15px] leading-snug">
                          {idx === 0
                            ? `Locally owned — not an out-of-town franchise dispatched to ${city.county}`
                            : item}
                        </p>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </div>

              <div className="lg:col-span-6">
                <FadeIn
                  direction="up"
                  className="bg-[#1A311F] text-white p-9 relative overflow-hidden"
                >
                  <div
                    className="absolute top-0 right-0 w-40 h-40 opacity-5"
                    style={{
                      background:
                        "radial-gradient(circle, #8DBD42 0%, transparent 70%)",
                    }}
                  />
                  <p className="text-[#8DBD42] uppercase tracking-[0.18em] text-[10px] font-black mb-3">
                    Ready When You Need Us
                  </p>
                  <h3 className="text-2xl font-bold font-serif mb-3">
                    Damage in {city.name}? We're ready now.
                  </h3>
                  <p className="text-white/75 font-sans text-sm leading-relaxed mb-7">
                    Our emergency crews are on standby around the clock. Call
                    now for immediate dispatch to your {city.name} property, or
                    request a free, no-obligation damage assessment.
                  </p>
                  <div className="space-y-3">
                    <a
                      href="tel:+13603451015"
                      className="flex items-center justify-center gap-2 bg-[#8DBD42] hover:bg-[#72a232] text-white py-3.5 font-bold transition-colors text-sm"
                    >
                      <Phone size={17} /> Call (360) 345-1015
                    </a>
                    <Link
                      href="/contact"
                      className="flex items-center justify-center gap-2 border-2 border-white/20 text-white py-3 font-bold hover:border-[#8DBD42] hover:text-[#8DBD42] transition-colors text-sm"
                    >
                      Request Free Assessment <ArrowRight size={15} />
                    </Link>
                  </div>
                  <p className="text-white/35 text-[11px] font-sans mt-4 text-center">
                    Available 24 hours, 7 days a week, 365 days a year
                  </p>
                </FadeIn>
              </div>
            </div>
          </Container>
        </Section>

        {/* ── FAQ Accordion ── */}
        <Section bg="white" className="border-t border-gray-100">
          <Container size="narrow">
            <FadeIn className="mb-10 text-center" direction="up">
              <span className="overline-label">Common Questions</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#3F4143] mt-2 font-serif">
                {city.name} Restoration FAQs
              </h2>
              <p className="text-[#3F4143]/60 font-sans mt-3 max-w-xl mx-auto text-[15px]">
                Answers to questions we hear most from {city.county} homeowners.
              </p>
            </FadeIn>
            <div className="max-w-3xl mx-auto space-y-2">
              {localFaqs.map((f, idx) => (
                <FadeIn key={idx} delay={idx * 0.04} direction="up">
                  <FaqItem question={f.question} answer={f.answer} />
                </FadeIn>
              ))}
            </div>
            <FadeIn direction="up" className="mt-8 text-center">
              <Link
                href="/resources/faq"
                className="inline-flex items-center gap-2 text-[#8DBD42] font-bold text-sm hover:underline"
              >
                View all FAQs <ArrowRight size={14} />
              </Link>
            </FadeIn>
          </Container>
        </Section>

        {/* ── Nearby city links ── */}
        {nearbyCityLinks.length > 0 && (
          <Section bg="none" className="py-16 md:py-20">
            <Container size="narrow">
              <FadeIn direction="up" className="text-center mb-10">
                <span className="overline-label">Nearby Communities</span>
                <h2 className="text-2xl md:text-3.5xl font-bold text-[#3F4143] mt-2 font-serif">
                  We Also Serve Areas Near {city.name}
                </h2>
                <p className="text-[#3F4143]/60 font-sans mt-3 max-w-xl mx-auto text-[15px]">
                  Heritage Restoration covers communities throughout Western
                  Washington along the I-5 corridor.
                </p>
              </FadeIn>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {nearbyCityLinks.map(nearby => (
                  <FadeIn key={nearby.slug} direction="up">
                    <Link
                      href={`/service-area/${nearby.slug}`}
                      className="group block bg-white border border-[#3F4143]/10 p-6 hover:border-[#8DBD42]/50 hover:shadow-[0_8px_24px_rgba(141,189,66,0.08)] transition-all duration-200"
                    >
                      <MapPin
                        size={18}
                        className="text-[#8DBD42] mb-3"
                      />
                      <div className="font-bold text-[#3F4143] font-serif text-[15px] group-hover:text-[#8DBD42] transition-colors">
                        {nearby.name}, WA
                      </div>
                      <div className="text-[#3F4143]/50 text-xs mt-1 font-sans">
                        {nearby.county}
                      </div>
                      <div className="flex items-center gap-1 text-[#8DBD42] text-xs font-bold mt-3">
                        View page <ArrowRight size={11} />
                      </div>
                    </Link>
                  </FadeIn>
                ))}
              </div>
              <FadeIn direction="up" className="mt-8 text-center">
                <Link
                  href="/service-areas"
                  className="inline-flex items-center gap-2 border-2 border-[#3F4143]/15 text-[#3F4143] px-7 py-3 font-bold text-sm hover:border-[#8DBD42] hover:text-[#8DBD42] transition-colors"
                >
                  View All Service Areas <ArrowRight size={15} />
                </Link>
              </FadeIn>
            </Container>
          </Section>
        )}

        {/* ── Emergency CTA strip ── */}
        <section className="bg-[#8DBD42] py-14 md:py-16">
          <Container>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <FadeIn direction="up">
                <p className="text-[#1A311F]/60 text-[10px] font-black uppercase tracking-widest mb-1">
                  24/7 Emergency Dispatch
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-white font-serif leading-snug">
                  Damage in {city.name}?<br className="hidden md:block" /> Don't wait — call now.
                </h2>
                <p className="text-white/70 font-sans text-sm mt-2">
                  Crews based {city.distance} &mdash; fastest response in {city.county}.
                </p>
              </FadeIn>
              <FadeIn direction="up" className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <a
                  href="tel:+13603451015"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#1A311F] px-8 py-4 font-bold text-base hover:bg-[#f0f7e6] transition-colors shadow-lg"
                >
                  <Phone size={18} /> (360) 345-1015
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/50 text-white px-8 py-4 font-bold text-base hover:border-white hover:bg-white/10 transition-colors"
                >
                  Free Assessment <ArrowRight size={16} />
                </Link>
              </FadeIn>
            </div>
          </Container>
        </section>
      </div>
    </Layout>
  );
}
