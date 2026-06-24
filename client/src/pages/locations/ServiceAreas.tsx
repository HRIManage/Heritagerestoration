import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { MapPin, Phone, ArrowRight, ArrowUpRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import { LOCATIONS, CityLocation } from "@/data/locations";
import { BASE_URL, buildBreadcrumbSchema } from "@/seo";
import ServiceHeader from "@/components/ui/ServiceHeader";

const HERO_IMAGE = "/photo/hero-new.jpg";

export default function ServiceAreas() {
  const canonical = `${BASE_URL}/service-areas`;
  const pageTitle =
    "Service Areas | Fire, Water & Storm Restoration Across Western Washington | Heritage Restoration";
  const metaDescription =
    "Heritage Restoration serves cities along the I-5 corridor from Chehalis to Federal Way — including Olympia, Lacey, Tacoma, Puyallup, Lakewood, DuPont and more. 24/7 emergency response, IICRC certified.";

  const north = LOCATIONS.filter(l => l.office === "North");
  const south = LOCATIONS.filter(l => l.office === "South");

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Heritage Restoration Service Areas",
    itemListElement: LOCATIONS.map((l, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: l.full,
      url: `${BASE_URL}/service-area/${l.slug}`,
    })),
  };

  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Service Areas", url: "/service-areas" },
  ]);

  const CityCard = ({ city }: { city: CityLocation }) => (
    <Link
      href={`/service-area/${city.slug}`}
      className="group relative flex flex-col justify-between bg-white border border-[#3F4143]/8 p-6 hover:border-[#8DBD42]/60 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition-all duration-250 overflow-hidden"
    >
      {/* Accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#8DBD42] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="w-9 h-9 rounded-full bg-[#8DBD42]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#8DBD42]/20 transition-colors">
          <MapPin size={15} className="text-[#8DBD42]" />
        </div>
        <ArrowUpRight
          size={16}
          className="text-[#3F4143]/20 group-hover:text-[#8DBD42] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 mt-0.5"
        />
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-[0.18em] font-black text-[#8DBD42]/80 mb-1">
          {city.county}
        </p>
        <h3 className="text-[17px] font-bold text-[#2a2c2e] group-hover:text-[#1A311F] transition-colors leading-snug">
          {city.name}
        </h3>
        <p className="text-[13px] text-[#3F4143]/50 mt-1 font-medium">
          {city.zips[0]}{city.zips.length > 1 ? ` · +${city.zips.length - 1} more` : ""}
        </p>
      </div>
    </Link>
  );

  return (
    <Layout>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={`${BASE_URL}${HERO_IMAGE}`} />
        <script type="application/ld+json">
          {JSON.stringify(itemListSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumb)}
        </script>
      </Helmet>

      <div className="bg-[#FAF9F6] pt-[112px] sm:pt-[116px] lg:pt-[152px]">
        <ServiceHeader
          title="Areas We Serve"
          subtitle="Western Washington"
          heroImg={HERO_IMAGE}
        />

        {/* Ticker strip */}
        <div className="relative z-10 bg-[#1A311F] py-8 overflow-hidden">
          <style>{`
            @keyframes service-areas-ticker {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
            .service-areas-ticker { animation: service-areas-ticker 45s linear infinite; }
          `}</style>
          <div className="service-areas-ticker flex whitespace-nowrap w-max">
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

        {/* Intro bar */}
        <div className="bg-[#FAF9F6] border-b border-[#3F4143]/8">
          <Container>
            <div className="py-10 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] font-black text-[#8DBD42] mb-2">Coverage Area</p>
                <h2 className="text-[26px] md:text-[32px] font-bold text-[#1a1c1e] leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Serving the I-5 Corridor &amp;<br className="hidden md:block" /> Western Washington
                </h2>
              </div>
              <p className="text-[#3F4143]/65 text-[15px] leading-relaxed max-w-[440px]">
                From Lewis County to King County, our two offices dispatch certified
                crews across the entire region — 24 hours a day, 7 days a week, 365 days a year.
              </p>
            </div>
          </Container>
        </div>

        {/* North Office cities */}
        <section className="py-12 md:py-16">
          <Container>
            <FadeIn direction="up" className="mb-10">
              <div className="flex items-center gap-4 mb-1">
                <span className="w-8 h-[2px] bg-[#8DBD42]" />
                <span className="text-[11px] uppercase tracking-[0.2em] font-black text-[#8DBD42]">North Office — Lacey</span>
              </div>
              <h2 className="text-[24px] md:text-[30px] font-bold text-[#1a1c1e] mt-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Thurston, Pierce &amp; King County
              </h2>
              <p className="text-[#3F4143]/55 text-[14px] mt-2">
                {north.length} cities covered · Dispatching from 8695 Martin Way E, Lacey WA
              </p>
            </FadeIn>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {north.map(l => (
                <CityCard key={l.slug} city={l} />
              ))}
            </div>
          </Container>
        </section>

        {/* Divider */}
        <div className="border-t border-[#3F4143]/8" />

        {/* South Office cities */}
        <section className="py-12 md:py-16 bg-white">
          <Container>
            <FadeIn direction="up" className="mb-10">
              <div className="flex items-center gap-4 mb-1">
                <span className="w-8 h-[2px] bg-[#8DBD42]" />
                <span className="text-[11px] uppercase tracking-[0.2em] font-black text-[#8DBD42]">South Office — Chehalis</span>
              </div>
              <h2 className="text-[24px] md:text-[30px] font-bold text-[#1a1c1e] mt-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Lewis County
              </h2>
              <p className="text-[#3F4143]/55 text-[14px] mt-2">
                {south.length} cities covered · Dispatching from 1581 N. National Ave, Chehalis WA
              </p>
            </FadeIn>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {south.map(l => (
                <CityCard key={l.slug} city={l} />
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16 bg-[#FAF9F6] border-t border-[#3F4143]/8">
          <Container size="narrow">
            <FadeIn direction="up">
              <div className="bg-[#1A311F] text-white p-10 md:p-16 relative overflow-hidden">
                {/* Decorative glow */}
                <div className="absolute right-[-60px] top-[-60px] w-[300px] h-[300px] rounded-full bg-[#8DBD42]/10 blur-[80px] pointer-events-none" />
                <div className="absolute left-[-40px] bottom-[-40px] w-[200px] h-[200px] rounded-full bg-[#8DBD42]/8 blur-[60px] pointer-events-none" />

                <div className="relative z-10 text-center">
                  <p className="text-[11px] uppercase tracking-[0.22em] font-black text-[#8DBD42] mb-4">Don't See Your City?</p>
                  <h2 className="text-[26px] md:text-[36px] font-bold leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    We Likely Cover It.
                  </h2>
                  <p className="text-white/70 text-[16px] leading-relaxed max-w-[480px] mx-auto mb-10">
                    If you're anywhere along the I-5 corridor in Western Washington,
                    call us — our crews travel throughout the region for emergency restoration.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="tel:+13603451015"
                      className="inline-flex items-center justify-center gap-2.5 bg-[#8DBD42] hover:bg-[#7dac35] text-[#1a1c1e] px-8 py-4 font-black uppercase tracking-[0.14em] text-[13px] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(141,189,66,0.4)] active:translate-y-0"
                    >
                      <Phone size={15} className="stroke-[2.5]" /> Call (360) 345-1015
                    </a>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 border-2 border-white/25 hover:border-[#8DBD42] text-white hover:text-[#8DBD42] px-8 py-4 font-black uppercase tracking-[0.14em] text-[13px] transition-all duration-200"
                    >
                      Free Assessment <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>
          </Container>
        </section>

        {/* Trust badges */}
        <div className="bg-white border-t border-gray-100">
          <div className="max-w-[900px] mx-auto px-8 py-14 md:py-16 text-center">
            <p className="text-[11px] uppercase tracking-[0.2em] font-black text-[#8DBD42] mb-10">
              Why Homeowners Trust Heritage
            </p>
            <div className="flex items-center justify-center gap-10 md:gap-20 mb-10">
              {[
                {
                  src: "/photo/emergency-badge-new-2.png",
                  alt: "24 HR Emergency Response",
                  title: "24/7 Emergency Response",
                },
                {
                  src: "/photo/iicrc-badge-new-3.png",
                  alt: "IICRC Certified",
                  title: "IICRC Certified",
                },
                {
                  src: "/photo/warranty-badge-new-3.png",
                  alt: "5-Year Warranty",
                  title: "5-Year Warranty",
                },
              ].map((badge) => (
                <div key={badge.alt} className="flex flex-col items-center gap-4">
                  <img
                    src={badge.src}
                    alt={badge.alt}
                    className="h-24 md:h-28 w-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.18)]"
                  />
                  <p className="text-[13px] font-black text-[#1a1c1e] uppercase tracking-[0.1em] text-center">
                    {badge.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
