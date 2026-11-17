import { useEffect, useRef, useState } from "react";
import { Flame, Shield, Clock, CheckCircle, Phone } from "lucide-react";
import { Helmet } from "react-helmet-async";
import PageCTA from "@/components/PageCTA";
import Layout from "@/components/layout/Layout";
import { Link } from "wouter";
import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { FIRE_SERVICE_SCHEMA, buildBreadcrumbSchema } from "@/seo";

type JourneyStep = { step: string; title: string; items: { label: string; text: string }[] };

const JOURNEY_STEPS: JourneyStep[] = [
                  {
                    step: "1",
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
                    step: "2",
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
                    step: "3",
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
                    step: "4",
                    title: "Scope Alignment & Regulatory Coordination",
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
                    step: "5",
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
                    step: "6",
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
                    step: "7",
                    title: "Precision Reconstruction",
                    items: [
                      {
                        label: "Structural Rebuild",
                        text: "Execution of the approved scope of work under strict construction standards, featuring recurring milestone meetings with clients to review progress, framing, mechanicals, and finishes.",
                      },
                    ],
                  },
                  {
                    step: "8",
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

/**
 * "The Journey: Our Restoration Steps" - one clear top-to-bottom sequence.
 * Desktop: the step list sits pinned on the left and lights up as each step
 * scrolls past; clicking a title jumps to it. Phones: a single numbered
 * column. Every step's text is shown in full; nothing is hidden behind hover.
 */
function RestorationJourney() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const els = stepRefs.current.filter(Boolean) as HTMLLIElement[];
    if (!els.length || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const jumpTo = (i: number) => {
    const el = stepRefs.current[i];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 160;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section className="bg-[linear-gradient(180deg,#FFFFFF_0%,#F7F5F0_10%,#F7F5F0_90%,#FFFFFF_100%)] py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* intro + step index */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[150px]">
              <p className="text-[15px] font-semibold text-[#44781a]">The Journey</p>
              <h2 className="mt-3 font-serif text-[34px] font-bold leading-[1.08] text-[#1f2a24] md:text-[44px]">
                Our Restoration Steps
              </h2>
              <ol className="mt-8 hidden space-y-1 lg:block">
                {JOURNEY_STEPS.map((s, i) => {
                  const on = i === active;
                  return (
                    <li key={s.step}>
                      <button
                        type="button"
                        onClick={() => jumpTo(i)}
                        aria-current={on ? "step" : undefined}
                        className={`relative flex w-full items-baseline gap-3 px-3 py-2 text-left text-[14.5px] leading-snug transition-colors duration-300 ${
                          on ? "bg-white text-[#173d24] shadow-[0_4px_14px_rgba(23,61,36,0.08)]" : "text-[#3F4143]/80 hover:text-[#173d24]"
                        }`}
                      >
                        <span className={`font-serif text-[13px] tabular-nums ${on ? "text-[#44781a]" : "text-[#3F4143]/80"}`}>
                          {s.step.padStart(2, "0")}
                        </span>
                        <span className={on ? "font-bold" : "font-medium"}>{s.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          {/* steps */}
          <ol className="relative lg:col-span-8">
            {/* connecting rail behind the numbers */}
            <span aria-hidden="true" className="absolute bottom-8 left-[23px] top-8 w-px bg-[#173d24]/15 md:left-[27px]" />
            {JOURNEY_STEPS.map((s, i) => {
              const on = i === active;
              return (
                <li
                  key={s.step}
                  ref={el => { stepRefs.current[i] = el; }}
                  data-index={i}
                  className="relative grid grid-cols-[48px_1fr] gap-5 pb-12 last:pb-0 md:grid-cols-[56px_1fr] md:gap-8"
                >
                  <span
                    className={`relative z-10 grid h-12 w-12 place-items-center font-serif text-[18px] font-bold transition-colors duration-500 md:h-14 md:w-14 md:text-[20px] ${
                      on ? "bg-[#173d24] text-[#8DBD42]" : "bg-white text-[#173d24] shadow-[0_0_0_1px_rgba(23,61,36,0.15)]"
                    }`}
                  >
                    {s.step}
                  </span>
                  <div className="pt-1.5 md:pt-2.5">
                    <h3 className="font-serif text-[22px] font-bold leading-snug text-[#1f2a24] md:text-[25px]">
                      {s.title}
                    </h3>
                    <div className={`mt-5 grid gap-px bg-[#E6E1D7] ${s.items.length > 1 ? "sm:grid-cols-2" : ""}`}>
                      {s.items.map((sub, k) => (
                        <div
                          key={sub.label}
                          className={`bg-white p-5 md:p-6 ${s.items.length === 3 && k === 2 ? "sm:col-span-2" : ""}`}
                        >
                          <p className="text-[15px] font-bold text-[#173d24]">{sub.label}</p>
                          <p className="mt-2 text-[15px] leading-relaxed text-[#3F4143]/80">{sub.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default function FireRestoration() {
  const services = [
    {
      icon: <Flame size={32} />,
      title: "Soot & Smoke Remediation",
      desc: "Advanced soot extraction, smoke odor neutralization, and structural decontamination to restore indoor air quality. We deploy specialized HEPA air scrubbers, thermal foggers, and hydroxyl generators to permanently neutralize smoke particles embedded in framing, finishes, and HVAC ducts.",
      img: "/photo/Photo Jul 06 2024, 08 57 29.jpg",
    },
    {
      icon: <Clock size={32} />,
      title: "Structural Cleaning & Debris",
      desc: "Removal of fire debris, securing structural integrity, and cleaning soot from all surfaces using eco-friendly carbon blasting and dry sponge extraction.",
      img: "/photo/fire-structural-cleaning.png",
    },
    {
      icon: <Shield size={32} />,
      title: "Full Structural Rebuild",
      desc: "Complete framing, drywall, flooring, custom cabinetry, and finish work to modern energy efficient building codes. We handle the process from structural engineering approvals to final occupancy permits.",
      img: "/photo/fire-structural-rebuild.jpg",
    },
  ];

  return (
    <Layout>
      <Helmet>
        <title>Fire Damage Restoration | Heritage Restoration</title>
        <meta
          name="description"
          content="Professional 24/7 fire damage restoration, soot cleaning, and smoke odor removal services in Washington State. Direct insurance coordination."
        />
        <link
          rel="canonical"
          href="https://www.firewaterstorm.com/services/fire-restoration"
        />
        <meta
          property="og:title"
          content="Fire Damage Restoration | Heritage Restoration"
        />
        <meta
          property="og:description"
          content="Professional 24/7 fire damage restoration, soot cleaning, and smoke odor removal across Western Washington. IICRC certified, direct insurance billing."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.firewaterstorm.com/services/fire-restoration"
        />
        <meta
          property="og:image"
          content="https://www.firewaterstorm.com/photo/Monnett%20Fire%20After.jpg"
        />
        <script type="application/ld+json">
          {JSON.stringify(FIRE_SERVICE_SCHEMA)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(
            buildBreadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Services", url: "/services/fire-restoration" },
              { name: "Fire Restoration", url: "/services/fire-restoration" },
            ])
          )}
        </script>
      </Helmet>

      <div className="min-h-screen bg-brand-linen pt-[112px] sm:pt-[116px] lg:pt-[132px]">
        {/* Hero Section */}
        <section className="relative text-white overflow-hidden border-b border-[#8DBD42]/20 min-h-[380px] md:min-h-[480px] lg:min-h-[calc(100svh-132px)]">
          {/* Full-bleed background photo */}
          <img
            src="/photo/Monnett Fire Before.jpg"
            alt="Fire damage restoration scene"
            className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.75]"
          />
          {/* Dark green wash — heavier on left, fades right */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(23,61,36,0.92) 0%, rgba(23,61,36,0.88) 40%, rgba(23,61,36,0.6) 62%, rgba(23,61,36,0.15) 100%)",
            }}
          />
          {/* Bottom vignette */}
          <div className="absolute inset-0 bg-[#173d24]/70 lg:hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#173d24]/40 via-transparent to-transparent" />

          <div className="relative z-10 grid lg:grid-cols-12 min-h-[380px] md:min-h-[480px] lg:min-h-[calc(100svh-132px)]">
            <div className="lg:col-span-7 flex flex-col justify-center px-6 py-10 md:py-16 max-w-[720px] mx-auto lg:mx-0 lg:pl-16">
              <FadeIn className="space-y-6" direction="up">
                <span className="text-[#8DBD42] uppercase tracking-[0.25em] text-xs font-black flex items-center gap-2">
                  <span className="w-6 h-[2px] bg-[#8DBD42]" /> Emergency
                  Service
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-serif">
                  Fire Restoration
                </h1>
                <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-xl font-sans font-light">
                  When fire strikes, every moment counts. Heritage Restoration
                  responds immediately to secure your property, mitigate soot
                  damage, and guide you through complete reconstruction to
                  modern standards.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Specialized Services — Staggered, Non-Traditional Grid */}
        <Section bg="none">
          <Container>
            <FadeIn className="mb-20 text-center" direction="up">
              <h2 className="text-3xl md:text-4.5xl font-bold text-[#3F4143] mt-2 font-serif">
                Our Fire Damage Restoration Services
              </h2>
            </FadeIn>

            <div className="space-y-16">
              {/* Featured Asymmetric Top Service */}
              <FadeIn
                className="bg-white border border-[#E6E1D7] grid lg:grid-cols-12 gap-0 items-stretch rounded-none shadow-[0_4px_20px_rgba(23,61,36,0.01)] hover:shadow-[0_16px_35px_rgba(23,61,36,0.04)] transition-all duration-300"
                direction="up"
              >
                <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-auto">
                  <img
                    src={services[0].img}
                    alt={services[0].title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center space-y-4">
                  <div className="text-[#8DBD42]">{services[0].icon}</div>
                  <span className="text-[#44781a] uppercase tracking-[0.2em] text-[12px] font-bold">
                    Featured Specialty
                  </span>
                  <h3 className="font-bold text-[#3F4143] text-2xl md:text-3xl font-serif">
                    {services[0].title}
                  </h3>
                  <p className="text-[#3F4143]/80 text-sm leading-relaxed font-sans">
                    {services[0].desc}
                  </p>
                </div>
              </FadeIn>

              {/* Staggered Column Splitting */}
              <div className="grid md:grid-cols-2 gap-10">
                {services.slice(1).map((item, idx) => (
                  <FadeIn
                    key={idx}
                    delay={idx * 0.1}
                    className="card-3d bg-white p-8 border border-[#E6E1D7] flex flex-col justify-between rounded-none shadow-[0_4px_20px_rgba(23,61,36,0.01)] hover:shadow-[0_16px_35px_rgba(23,61,36,0.04)] transition-all duration-300"
                    direction="up"
                  >
                    <div className="space-y-5">
                      <div className="relative h-[220px] overflow-hidden mb-6 rounded-none border border-gray-100 shadow-[0_1px_2px_rgba(23,61,36,0.06)]">
                        <img
                          src={item.img}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-[#8DBD42]">{item.icon}</div>
                      <h3 className="font-bold text-[#3F4143] text-xl md:text-2xl font-serif">
                        {item.title}
                      </h3>
                      <p className="text-[#3F4143]/80 text-sm leading-relaxed font-sans">
                        {item.desc}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <RestorationJourney />

        {/* Why Choose Us & Stats Block */}
        <Section bg="none" className="border-t border-gray-100">
          <Container>
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Checklist Column */}
              <div className="lg:col-span-7 space-y-10">
                <FadeIn direction="up">
                  <span className="overline-label">Our Standards</span>
                  <h2 className="text-3xl md:text-4.5xl font-bold text-[#3F4143] mt-2 font-serif">
                    Why Choose Heritage Restoration
                  </h2>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
                  {[
                    "60-minute emergency response time, 24/7 availability",
                    "IICRC certified restoration professionals",
                    "Fully bonded and insured with comprehensive coverage",
                    "Direct insurance company negotiation and advocacy",
                    "DocuSketch 3D documentation for claims",
                    "Xactimate detailed estimates and scope management",
                    "5-year warranty on workmanship",
                    "Local expertise serving Washington State",
                  ].map((item, idx) => (
                    <FadeIn
                      key={idx}
                      delay={idx * 0.05}
                      className="flex gap-4 items-start pl-2"
                      direction="up"
                    >
                      <CheckCircle
                        size={18}
                        className="text-[#8DBD42] flex-shrink-0 mt-1"
                      />
                      <p className="text-[#3F4143] font-bold text-base leading-snug">
                        {item}
                      </p>
                    </FadeIn>
                  ))}
                </div>
              </div>

              {/* Stats Grid Column */}
              <div className="lg:col-span-5">
                <FadeIn
                  className="bg-[#3F4143] text-white p-8 shadow-[0_15px_30px_rgba(23,61,36,0.06)] grid grid-cols-2 gap-6 relative overflow-hidden rounded-none"
                  direction="up"
                >
                  <div className="absolute right-[-40px] bottom-[-40px] w-48 h-48 bg-[#8DBD42]/10 rounded-full blur-2xl pointer-events-none" />
                  {[
                    { val: "60m", lbl: "Response Time" },
                    { val: "24/7", lbl: "Emergency Dispatch" },
                    { val: "5yr", lbl: "Workmanship Warranty" },
                    { val: "100%", lbl: "Bonded & Insured" },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className="space-y-2 p-5 bg-white/5 border border-white/10 hover:border-[#8DBD42]/30 transition-colors rounded-none"
                    >
                      <div className="text-3xl md:text-4xl font-bold text-[#8DBD42] font-serif">
                        {stat.val}
                      </div>
                      <div className="text-[12px] text-white/80 uppercase tracking-widest font-semibold">
                        {stat.lbl}
                      </div>
                    </div>
                  ))}
                </FadeIn>
              </div>
            </div>
          </Container>
        </Section>

        <PageCTA
          title="Your Fire Damage Restoration Experts"
          primary={{ href: "tel:+13604561886", label: "Contact Us Now" }}
          secondary={{ href: "/resources/faq", label: "What do I need to know?" }}
          image={{ src: "/photo/fire-cta-banner-new.png", alt: "Reconstructed home fire damage restoration Washington" }}
        >
          <p>
            We understand the profound challenges and emotional toll
            that arise in the aftermath of a fire disaster. Your world
            has been turned upside down, with physical loss merging with
            emotional and mental upheaval. Amidst this turmoil, the
            intricacies of insurance claims and restoration can seem
            like yet another mountain to climb.
          </p>
          <p>
            We're here to make sure you don't face this climb alone.
            Rather than positioning ourselves in opposition to insurance
            companies, we believe in collaboration. We work together
            with your insurance provider, approaching every situation
            with meticulous documentation and the utmost professionalism
            to ensure a seamless restoration process.
          </p>
        </PageCTA>
      </div>
    </Layout>
  );
}
