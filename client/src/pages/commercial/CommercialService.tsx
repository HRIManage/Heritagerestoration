import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Phone, ArrowRight, CheckCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import CommercialInquiry from "@/components/commercial/CommercialInquiry";
import {
  ClientsBlock,
  CredentialStrip,
  PriorityListBlock,
  ProcessSteps,
  StatsBand,
  UrgentCallBar,
} from "@/components/commercial/CommercialSections";
import {
  COMMERCIAL_SERVICES,
  MAIN_PHONE,
  MAIN_PHONE_TEL,
  WHY_PROPERTY_TEAMS,
  type CommercialServiceKey,
} from "@/data/commercial";
import { BASE_URL, buildBreadcrumbSchema, buildServiceSchema } from "@/seo";

export default function CommercialService({
  service,
}: {
  service: CommercialServiceKey;
}) {
  const s = COMMERCIAL_SERVICES[service];
  const other = COMMERCIAL_SERVICES[service === "fire" ? "water" : "fire"];
  // Equipment ownership is the water-specific differentiator; fire leads with the rest.
  const why =
    service === "fire"
      ? WHY_PROPERTY_TEAMS.filter(w => !w.title.includes("equipment"))
      : WHY_PROPERTY_TEAMS;

  return (
    <Layout>
      <Helmet>
        <title>{s.metaTitle}</title>
        <meta name="description" content={s.metaDescription} />
        <link rel="canonical" href={`${BASE_URL}${s.path}`} />
        <meta property="og:title" content={s.metaTitle} />
        <meta property="og:description" content={s.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${BASE_URL}${s.path}`} />
        <meta
          property="og:image"
          content={`${BASE_URL}${encodeURI(s.gallery[s.gallery.length - 1].src)}`}
        />
        <script type="application/ld+json">
          {JSON.stringify(
            buildServiceSchema(
              s.navLabel,
              s.metaDescription,
              s.path,
              [
                `commercial ${service} damage restoration`,
                `multi-family ${service} damage`,
                `commercial ${service} restoration Washington`,
                "property manager restoration",
              ]
            )
          )}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(
            buildBreadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Commercial", url: "/commercial" },
              { name: s.navLabel, url: s.path },
            ])
          )}
        </script>
      </Helmet>

      <div className="min-h-screen bg-brand-linen pt-[112px] sm:pt-[116px] lg:pt-[152px]">
        {/* Hero */}
        <section className="relative text-white overflow-hidden">
          <img
            src={s.heroImg}
            alt={s.heroAlt}
            className="absolute inset-0 h-full w-full object-cover object-center"
            fetchPriority="high"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg, rgba(14,27,17,0.95) 0%, rgba(20,38,24,0.85) 50%, rgba(20,38,24,0.45) 80%, rgba(14,27,17,0.25) 100%)",
            }}
          />
          <div className="relative z-10 mx-auto max-w-[1200px] 2xl:max-w-[1400px] px-6 py-14 md:py-20 min-h-[440px] md:min-h-[500px] flex items-center">
            <FadeIn className="max-w-[780px] space-y-6" direction="up" triggerImmediately>
              <nav aria-label="Breadcrumb" className="text-xs text-white/65">
                <Link href="/commercial" className="hover:text-white underline-offset-2 hover:underline">
                  Commercial
                </Link>{" "}
                / <span className="text-white/90">{s.navLabel}</span>
              </nav>
              <span className="text-[#8DBD42] uppercase tracking-[0.22em] text-xs font-black flex items-center gap-2">
                <span className="w-6 h-[2px] bg-[#8DBD42]" /> For owners,
                operators &amp; property managers
              </span>
              <h1 className="text-[32px] leading-[1.12] sm:text-5xl lg:text-[56px] font-bold font-serif">
                {s.title} <span className="text-[#a9d468]">{s.titleAccent}</span>
              </h1>
              <p className="text-base md:text-lg text-white/85 leading-relaxed font-light max-w-2xl">
                {s.intro}
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
            </FadeIn>
          </div>
        </section>

        <CredentialStrip />
        <StatsBand />

        {/* What we handle (water) */}
        {s.handles && (
          <Section bg="none">
            <Container className="2xl:max-w-[1400px]">
              <FadeIn className="mb-10 max-w-3xl" direction="up">
                <span className="overline-label">What we handle</span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#3F4143] mt-2 font-serif">
                  Commercial water losses we respond to
                </h2>
              </FadeIn>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
                {s.handles.map((h, idx) => (
                  <FadeIn key={h.title} delay={idx * 0.04} direction="up" className="border-t-2 border-[#8DBD42] pt-5">
                    <h3 className="font-bold text-[#2F3335] text-lg">{h.title}</h3>
                    <p className="text-[#3F4143]/70 text-[15px] leading-relaxed mt-2">
                      {h.text}
                    </p>
                  </FadeIn>
                ))}
              </div>
            </Container>
          </Section>
        )}

        {/* Gallery */}
        <Section bg={s.handles ? "white" : "none"} className={s.handles ? "border-t border-[#3F4143]/8" : ""}>
          <Container className="2xl:max-w-[1400px]">
            <FadeIn className="mb-8 max-w-3xl" direction="up">
              <span className="overline-label">Done by our own crews</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#3F4143] mt-2 font-serif">
                {service === "fire"
                  ? "Two of our fire rebuilds, start to finish"
                  : "Extraction, drying and rebuild"}
              </h2>
            </FadeIn>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {s.gallery.map(g => (
                <figure key={g.src} className="relative aspect-[4/5] overflow-hidden bg-[#2F3335]">
                  <img
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <figcaption className="absolute left-2 bottom-2 bg-[#1f2122]/85 text-white text-[11px] font-black uppercase tracking-[0.14em] px-2.5 py-1">
                    {g.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Container>
        </Section>

        {/* Why + clients */}
        <Section bg={s.handles ? "none" : "white"} className="border-t border-[#3F4143]/8">
          <Container className="2xl:max-w-[1400px]">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-7">
                <h2 className="text-2xl md:text-3xl font-bold text-[#3F4143] font-serif mb-6">
                  Why property teams call us
                </h2>
                <div className="space-y-7">
                  {why.map(w => (
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
                  {service === "water" && (
                    <FadeIn direction="up" className="flex gap-4">
                      <CheckCircle size={20} className="text-[#8DBD42] flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-[#2F3335] text-lg">Drying you can measure</h3>
                        <p className="text-[#3F4143]/75 text-[15px] leading-relaxed mt-1.5">
                          Truck-mounted extraction, thermal imaging to find
                          hidden moisture, LGR dehumidifiers and daily moisture
                          readings until the building is dry.
                        </p>
                      </div>
                    </FadeIn>
                  )}
                </div>
              </div>
              <div className="lg:col-span-5">
                <ClientsBlock />
              </div>
            </div>
          </Container>
        </Section>

        {/* Process */}
        <Section bg="none" className="border-t border-[#3F4143]/8">
          <Container className="2xl:max-w-[1400px]">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
              <FadeIn className="lg:col-span-4" direction="up">
                <span className="overline-label">From first call to final walkthrough</span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#3F4143] mt-2 font-serif">
                  How a commercial {service} job runs with us
                </h2>
                <p className="text-[#3F4143]/70 text-base mt-4 leading-relaxed">
                  You get a clear scope before major work starts, one contact
                  the whole way through, and a building handed back ready to
                  use.
                </p>
              </FadeIn>
              <div className="lg:col-span-8">
                <ProcessSteps steps={s.steps} />
              </div>
            </div>
            <div className="mt-12">
              <PriorityListBlock callChecklist={s.callChecklist} />
            </div>
          </Container>
        </Section>

        {/* Inquiry */}
        <Section bg="white" className="border-t border-[#3F4143]/8" id="commercial-inquiry">
          <Container className="2xl:max-w-[1400px]">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-5 space-y-6">
                <span className="overline-label">Talk to us</span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#3F4143] font-serif">
                  Dealing with damage, or planning commercial work?
                </h2>
                <p className="text-[#3F4143]/75 text-base leading-relaxed">
                  Call and we'll set up a site walk, or send the details below.
                </p>
                <a
                  href={MAIN_PHONE_TEL}
                  className="inline-flex items-center gap-3 text-3xl md:text-4xl font-bold text-[#2f6b2a] hover:text-[#8DBD42] transition-colors"
                >
                  <Phone size={28} /> {MAIN_PHONE}
                </a>
                <Link
                  href={other.path}
                  className="inline-flex items-center gap-1 text-[12px] font-black uppercase tracking-[0.14em] text-[#5f8f22] hover:text-[#2F3335]"
                >
                  See {other.navLabel.toLowerCase()} <ArrowRight size={14} />
                </Link>
              </div>
              <div className="lg:col-span-7 bg-[#FBFBF9] border border-[#3F4143]/8 p-6 md:p-10">
                <CommercialInquiry />
              </div>
            </div>
          </Container>
        </Section>

        <UrgentCallBar line={s.urgentLine} />
      </div>
    </Layout>
  );
}
