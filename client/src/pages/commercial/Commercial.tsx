import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import {
  Phone,
  ArrowRight,
  Flame,
  Droplets,
  CloudLightning,
  CheckCircle,
  Building2,
  Users,
  Stethoscope,
  BedDouble,
  GraduationCap,
  Store,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import CommercialInquiry from "@/components/commercial/CommercialInquiry";
import {
  BeforeAfterSlider,
  ClientsBlock,
  CommercialFAQ,
  StatsBand,
  CredentialStrip,
  PriorityListBlock,
  ProcessSteps,
  UrgentCallBar,
} from "@/components/commercial/CommercialSections";
import {
  COMMERCIAL_FAQ,
  COMMERCIAL_SERVICES,
  MAIN_PHONE,
  MAIN_PHONE_TEL,
  PROPERTY_TYPES,
  WHY_PROPERTY_TEAMS,
} from "@/data/commercial";
import { COMMERCIAL_SERVICE_SCHEMA, buildBreadcrumbSchema, buildFAQSchema } from "@/seo";

const PROPERTY_ICONS = [Building2, Users, Stethoscope, BedDouble, GraduationCap, Store];

const OVERVIEW_STEPS = [
  {
    title: "Secure and stabilize",
    text: "Board-up, tarping, water shutoff and extraction so the building is protected from further loss. If it's an insured loss, we help you open the claim.",
  },
  {
    title: "Scope with your adjuster",
    text: "Every area of damage photographed and documented, with a detailed scope and estimate walked through with your adjuster.",
  },
  {
    title: "Clean, dry and restore",
    text: "Smoke, soot and water dealt with — with daily moisture logs — before rebuilding starts, so damage doesn't get sealed in behind new walls.",
  },
  {
    title: "Permit and rebuild",
    text: "Same team, no handoff. Permits, structural repairs and finishes, with hidden damage documented for the adjuster before we move on.",
  },
  {
    title: "Walkthrough and handover",
    text: "Final walkthrough with your property team, punch list closed, warranty paperwork in hand.",
  },
];

export default function Commercial() {
  const services = [
    {
      icon: <Flame size={28} />,
      title: "Commercial fire restoration",
      text: "Board-up, smoke and soot cleanup, and full reconstruction under one contract.",
      href: COMMERCIAL_SERVICES.fire.path,
      img: "/photo/Monnett Fire After.jpg",
    },
    {
      icon: <Droplets size={28} />,
      title: "Commercial water restoration",
      text: "Burst pipes, sprinkler discharge and unit-to-unit leaks — extracted, dried and rebuilt.",
      href: COMMERCIAL_SERVICES.water.path,
      img: "/photo/water2-air-movers.jpg",
    },
    {
      icon: <CloudLightning size={28} />,
      title: "Storm damage & board-up",
      text: "Roof tarping, window and storefront board-ups, and envelope repairs after wind and storm events.",
      href: "/services/storm-recovery",
      img: "/photo/storm-project-after.jpg",
    },
  ];

  return (
    <Layout>
      <Helmet>
        <title>Commercial Restoration & Rebuild | Heritage Restoration</title>
        <meta
          name="description"
          content="Commercial fire, water & storm restoration and rebuild for apartments, HOAs, medical, hotels and schools in Western Washington. One crew, one contract."
        />
        <link rel="canonical" href="https://www.firewaterstorm.com/commercial" />
        <meta
          property="og:title"
          content="Commercial Restoration & Rebuild | Heritage Restoration"
        />
        <meta
          property="og:description"
          content="Commercial fire, water & storm restoration and rebuild for apartments, HOAs, medical, hotels and schools in Western Washington. One crew, one contract."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.firewaterstorm.com/commercial" />
        <meta
          property="og:image"
          content="https://www.firewaterstorm.com/photo/og-commercial.jpg"
        />
        <script type="application/ld+json">
          {JSON.stringify(COMMERCIAL_SERVICE_SCHEMA)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(
            buildBreadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Commercial", url: "/commercial" },
            ])
          )}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(buildFAQSchema(COMMERCIAL_FAQ))}
        </script>
      </Helmet>

      <div className="min-h-screen bg-brand-linen pt-[112px] sm:pt-[116px] lg:pt-[132px]">
        {/* Hero */}
        <section className="relative text-white overflow-hidden">
          <img
            src="/photo/who-we-are.jpg"
            alt="Heritage Restoration crew boarding up a commercial storefront"
            className="absolute inset-0 h-full w-full object-cover object-center"
            fetchPriority="high"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg, rgba(14,27,17,0.94) 0%, rgba(20,38,24,0.82) 45%, rgba(20,38,24,0.35) 75%, rgba(14,27,17,0.15) 100%)",
            }}
          />
          <div className="relative z-10 mx-auto max-w-[1200px] 2xl:max-w-[1400px] px-6 lg:px-14 min-[1340px]:px-6 py-14 md:py-20 lg:py-24 min-h-[460px] md:min-h-[540px] short:py-8 lg:min-h-[calc(100svh-132px)] flex items-center">
            <FadeIn className="max-w-[760px] xl:max-w-[1020px] space-y-6 short:space-y-4" direction="up" triggerImmediately>
              <span className="text-[#8DBD42] uppercase tracking-[0.22em] text-xs font-black flex items-center gap-2">
                <span className="w-6 h-[2px] bg-[#8DBD42]" /> For owners,
                operators &amp; property managers
              </span>
              <h1 className="text-[34px] leading-[1.1] sm:text-5xl lg:text-[52px] xl:text-[56px] short:text-[42px] font-bold font-serif">
                Commercial restoration and rebuild,{" "}
                <span className="text-[#a9d468] lg:block">under one contract.</span>
              </h1>
              <p className="text-base md:text-lg short:text-base text-white/85 leading-relaxed font-light max-w-2xl">
                Fire, water and storm losses at apartments, HOAs, clinics,
                hotels, schools and offices. Heritage secures the building,
                cleans it up and rebuilds it — one crew, one point of contact,
                and the business keeps running.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={MAIN_PHONE_TEL}
                  className="inline-flex items-center justify-center gap-2 bg-[#8DBD42] hover:bg-[#7bc034] text-white font-bold px-7 py-4 uppercase tracking-[0.12em] text-xs transition-colors shadow-md"
                >
                  <Phone size={15} /> 24/7 Dispatch {MAIN_PHONE}
                </a>
                <a
                  href="#commercial-inquiry"
                  className="inline-flex items-center justify-center gap-2 border border-white/40 hover:border-white hover:bg-white/10 text-white font-bold px-7 py-4 uppercase tracking-[0.12em] text-xs transition-colors"
                >
                  Request a site walk <ArrowRight size={15} />
                </a>
              </div>
              <p className="text-sm text-white/70">
                Locally owned since 2004 · Lacey &amp; Chehalis offices ·
                Serving Western Washington
              </p>
            </FadeIn>
          </div>
        </section>

        <CredentialStrip />
        <StatsBand />

        {/* Services */}
        <Section bg="none">
          <Container className="2xl:max-w-[1400px]">
            <FadeIn className="mb-10 md:mb-14 max-w-3xl" direction="up">
              <span className="overline-label">Commercial services</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#3F4143] mt-2 font-serif">
                One team from first call to final walkthrough
              </h2>
              <p className="text-[#3F4143]/70 text-base md:text-lg mt-4 leading-relaxed">
                Most commercial losses get split between a mitigation company
                and a general contractor. We do both, so the schedule and the
                scope stay with one team.
              </p>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s, idx) => (
                <FadeIn key={s.href} delay={idx * 0.06} direction="up" className="h-full">
                  <Link
                    href={s.href}
                    className="group flex flex-col h-full bg-white border border-[#3F4143]/8 hover:shadow-[0_16px_35px_rgba(0,0,0,0.06)] transition-shadow"
                  >
                    <div className="h-[200px] lg:h-[220px] 2xl:h-[260px] overflow-hidden">
                      <img
                        src={s.img}
                        alt={s.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 md:p-7 flex flex-col flex-1">
                      <div className="text-[#8DBD42]">{s.icon}</div>
                      <h3 className="font-bold text-[#3F4143] text-xl font-serif mt-3">
                        {s.title}
                      </h3>
                      <p className="text-[#3F4143]/70 text-[15px] leading-relaxed mt-2 flex-1">
                        {s.text}
                      </p>
                      <span className="mt-5 text-[12px] font-black uppercase tracking-[0.14em] text-[#5f8f22] group-hover:text-[#2F3335] inline-flex items-center gap-1">
                        Learn more <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </Container>
        </Section>

        {/* Property types */}
        <Section bg="white" className="border-t border-[#3F4143]/8">
          <Container className="2xl:max-w-[1400px]">
            <FadeIn className="mb-10 md:mb-12 max-w-3xl" direction="up">
              <span className="overline-label">Who we work for</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#3F4143] mt-2 font-serif">
                Buildings that can't just close
              </h2>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {PROPERTY_TYPES.map((p, idx) => {
                const Icon = PROPERTY_ICONS[idx];
                return (
                <FadeIn key={p.title} delay={idx * 0.04} direction="up" className="group border border-[#3F4143]/8 bg-[#FBFBF9] p-6 hover:border-[#8DBD42]/50 hover:bg-white hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)] transition-all duration-300">
                  <span className="w-12 h-12 flex items-center justify-center bg-[#8DBD42]/12 text-[#4f7d1c] group-hover:bg-[#8DBD42] group-hover:text-white transition-colors">
                    <Icon size={22} />
                  </span>
                  <h3 className="font-bold text-[#2F3335] text-lg mt-4">{p.title}</h3>
                  <p className="text-[#3F4143]/70 text-[15px] leading-relaxed mt-2">
                    {p.text}
                  </p>
                </FadeIn>
                );
              })}
            </div>
          </Container>
        </Section>

        {/* Why + clients */}
        <Section bg="none" className="border-t border-[#3F4143]/8">
          <Container className="2xl:max-w-[1400px]">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-7">
                <h2 className="text-2xl md:text-3xl font-bold text-[#3F4143] font-serif mb-6">
                  Why property teams call us
                </h2>
                <div className="space-y-7">
                  {WHY_PROPERTY_TEAMS.map(w => (
                    <FadeIn key={w.title} direction="up" className="flex gap-4">
                      <CheckCircle size={20} className="text-[#8DBD42] flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-[#2F3335] text-lg">{w.title}</h3>
                        <p className="text-[#3F4143]/75 text-[15px] leading-relaxed mt-1.5">
                          {w.text}
                        </p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5">
                <ClientsBlock />
              </div>
            </div>
          </Container>
        </Section>

        {/* Before / after */}
        <Section bg="white" className="border-t border-[#3F4143]/8">
          <Container className="2xl:max-w-[1400px]">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <FadeIn className="lg:col-span-4 space-y-5" direction="up">
                <span className="overline-label">Our own crews</span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#3F4143] font-serif">
                  Fire rebuilds, start to finish
                </h2>
                <p className="text-[#3F4143]/70 text-base leading-relaxed">
                  Board-up, smoke and soot cleanup, then the full rebuild — the
                  same team on every phase. Drag the slider to compare.
                </p>
                <Link
                  href={COMMERCIAL_SERVICES.fire.path}
                  className="inline-flex items-center gap-1 text-[12px] font-black uppercase tracking-[0.14em] text-[#5f8f22] hover:text-[#2F3335]"
                >
                  Commercial fire restoration <ArrowRight size={14} />
                </Link>
              </FadeIn>
              <div className="lg:col-span-8">
                <BeforeAfterSlider
                  before="/photo/Fisher before.jpg"
                  after="/photo/Fisher after.jpg"
                  alt="fire-damaged kitchen rebuilt by Heritage"
                />
              </div>
            </div>
          </Container>
        </Section>

        {/* Process */}
        <Section bg="none" className="border-t border-[#3F4143]/8">
          <Container className="2xl:max-w-[1400px]">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
              <FadeIn className="lg:col-span-4" direction="up">
                <span className="overline-label">How a job runs</span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#3F4143] mt-2 font-serif">
                  A clear scope, one contact, a building handed back ready to
                  use.
                </h2>
              </FadeIn>
              <div className="lg:col-span-8">
                <ProcessSteps steps={OVERVIEW_STEPS} />
              </div>
            </div>
            <div className="mt-12">
              <PriorityListBlock callChecklist="Property address and on-site contact · what happened and which units or areas are affected · whether the building is secured or the water is shut off · insurance carrier and claim number, if you have one." />
            </div>
          </Container>
        </Section>

        {/* FAQ */}
        <Section bg="none" className="border-t border-[#3F4143]/8">
          <Container className="2xl:max-w-[1400px]">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
              <FadeIn className="lg:col-span-4" direction="up">
                <span className="overline-label">Commercial FAQ</span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#3F4143] mt-2 font-serif">
                  Questions property teams ask us
                </h2>
              </FadeIn>
              <div className="lg:col-span-8">
                <CommercialFAQ />
              </div>
            </div>
          </Container>
        </Section>

        {/* Inquiry */}
        <Section bg="white" className="border-t border-[#3F4143]/8" id="commercial-inquiry">
          <Container className="2xl:max-w-[1400px]">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-5 space-y-6">
                <span className="overline-label">Talk to our commercial team</span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#3F4143] font-serif">
                  Dealing with damage, or planning commercial work?
                </h2>
                <p className="text-[#3F4143]/75 text-base leading-relaxed">
                  Tell us about the property and we'll set up a site walk. For
                  an active loss, call — dispatch answers 24/7.
                </p>
                <a
                  href={MAIN_PHONE_TEL}
                  className="inline-flex items-center gap-3 text-3xl md:text-4xl font-bold text-[#173d24] hover:text-[#8DBD42] transition-colors"
                >
                  <Phone size={28} /> {MAIN_PHONE}
                </a>
                <div className="text-[15px] text-[#3F4143]/75 space-y-1">
                  <p>
                    <a href="mailto:office@firewaterstorm.com" className="hover:text-[#2F3335] underline decoration-[#8DBD42] underline-offset-2">
                      office@firewaterstorm.com
                    </a>
                  </p>
                  <p>
                    <strong className="text-[#2F3335]">Lacey office</strong> ·
                    8695 Martin Way E, Suite 103 ·{" "}
                    <a href="tel:+13604561886" className="hover:text-[#2F3335]">(360) 456-1886</a>
                  </p>
                  <p>
                    <strong className="text-[#2F3335]">Chehalis office</strong> ·
                    1581 N. National Ave ·{" "}
                    <a href="tel:+13603451015" className="hover:text-[#2F3335]">(360) 345-1015</a>
                  </p>
                </div>
              </div>
              <div className="lg:col-span-7 bg-[#FBFBF9] border border-[#3F4143]/8 p-6 md:p-10">
                <CommercialInquiry />
              </div>
            </div>
          </Container>
        </Section>

        <UrgentCallBar line="Fire, smoke or water damage right now?" />
      </div>
    </Layout>
  );
}
