import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { MapPin, Phone, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import { LOCATIONS } from "@/data/locations";
import { BASE_URL, buildBreadcrumbSchema } from "@/seo";

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

  const CityCard = ({ slug, full }: { slug: string; full: string }) => (
    <Link
      href={`/service-area/${slug}`}
      className="group flex items-center justify-between gap-3 bg-white border border-[#3F4143]/10 px-5 py-4 rounded-none shadow-sm hover:shadow-[0_12px_28px_rgba(0,0,0,0.06)] hover:border-[#8DBD42]/50 transition-all"
    >
      <span className="flex items-center gap-3">
        <MapPin
          size={18}
          className="text-[#8DBD42] flex-shrink-0"
        />
        <span className="font-bold text-[#3F4143] group-hover:text-[#8DBD42] transition-colors">
          {full}
        </span>
      </span>
      <ArrowRight
        size={16}
        className="text-[#3F4143]/30 group-hover:text-[#8DBD42] group-hover:translate-x-1 transition-all flex-shrink-0"
      />
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

      <div className="min-h-screen bg-brand-linen pt-[112px] sm:pt-[116px] lg:pt-[152px]">
        {/* Hero */}
        <section className="relative text-white overflow-hidden border-b border-[#8DBD42]/20 min-h-[340px] md:min-h-[420px]">
          <img
            src={HERO_IMAGE}
            alt="Heritage Restoration service area across Western Washington"
            className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.7]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(14,27,17,0.93) 0%, rgba(20,38,24,0.70) 38%, rgba(14,27,17,0.10) 100%)",
            }}
          />
          <div className="relative z-10 flex flex-col justify-center min-h-[340px] md:min-h-[420px] px-6 py-12 max-w-[820px] mx-auto lg:mx-0 lg:pl-16">
            <FadeIn className="space-y-5" direction="up">
              <span className="text-[#8DBD42] uppercase tracking-[0.22em] text-xs font-black flex items-center gap-2">
                <span className="w-6 h-[2px] bg-[#8DBD42]" /> Western Washington
              </span>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight font-serif">
                Areas We Serve
              </h1>
              <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-2xl font-sans font-light">
                From our Lacey and Chehalis offices, Heritage Restoration
                responds to fire, water, and storm emergencies along the I-5
                corridor — from Lewis County north through Thurston, Pierce, and
                into south King County.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* North */}
        <Section bg="none">
          <Container>
            <FadeIn direction="up" className="mb-8">
              <span className="overline-label">North Office — Lacey</span>
              <h2 className="text-2xl md:text-3.5xl font-bold text-[#3F4143] mt-2 font-serif">
                Thurston, Pierce &amp; King County
              </h2>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {north.map(l => (
                <CityCard key={l.slug} slug={l.slug} full={l.full} />
              ))}
            </div>
          </Container>
        </Section>

        {/* South */}
        <Section bg="white" className="border-t border-gray-100">
          <Container>
            <FadeIn direction="up" className="mb-8">
              <span className="overline-label">South Office — Chehalis</span>
              <h2 className="text-2xl md:text-3.5xl font-bold text-[#3F4143] mt-2 font-serif">
                Lewis County
              </h2>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {south.map(l => (
                <CityCard key={l.slug} slug={l.slug} full={l.full} />
              ))}
            </div>
          </Container>
        </Section>

        {/* CTA */}
        <Section bg="none">
          <Container size="narrow">
            <FadeIn
              direction="up"
              className="bg-[#1A311F] text-white text-center p-10 md:p-14 rounded-none"
            >
              <h2 className="text-2xl md:text-3.5xl font-bold font-serif mb-4">
                Don't see your city? We likely cover it.
              </h2>
              <p className="text-white/80 font-sans max-w-2xl mx-auto mb-8">
                If you're anywhere along the I-5 corridor in Western Washington,
                call us — our crews travel throughout the region for emergency
                restoration.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+13603451015"
                  className="inline-flex items-center justify-center gap-2 bg-[#8DBD42] hover:bg-[#72a232] text-white px-7 py-3.5 font-bold transition-colors"
                >
                  <Phone size={18} /> Call (360) 345-1015
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-7 py-3.5 font-bold hover:border-[#8DBD42] hover:text-[#8DBD42] transition-colors"
                >
                  Contact Us <ArrowRight size={16} />
                </Link>
              </div>
            </FadeIn>
          </Container>
        </Section>
      </div>
    </Layout>
  );
}
