import {
  Camera,
  Package,
  Wind,
  Warehouse,
  ClipboardCheck,
  Sparkles,
  Cpu,
  MapPin,
  Shirt,
  Palette,
  HardDrive,
  Phone,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Link } from "wouter";
import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { CONTENTS_SERVICE_SCHEMA, buildBreadcrumbSchema } from "@/seo";

export default function ContentsServices() {
  return (
    <Layout>
      <Helmet>
        <title>Contents Services | Heritage Restoration</title>
        <meta
          name="description"
          content="Professional contents pack-out, inventory, cleaning, and storage services. Digital tracking and climate-controlled warehouse storage."
        />
        <meta
          property="og:title"
          content="Contents Services | Heritage Restoration"
        />
        <meta
          property="og:description"
          content="Professional contents services with digital inventory tracking and secure climate-controlled storage."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.firewaterstorm.com/services/contents-services"
        />
        <meta
          property="og:image"
          content="https://www.firewaterstorm.com/photo/recent-project-4.jpg"
        />
        <link
          rel="canonical"
          href="https://www.firewaterstorm.com/services/contents-services"
        />
        <script type="application/ld+json">
          {JSON.stringify(CONTENTS_SERVICE_SCHEMA)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(
            buildBreadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Services", url: "/services/contents-services" },
              {
                name: "Contents Services",
                url: "/services/contents-services",
              },
            ])
          )}
        </script>
      </Helmet>

      <div className="min-h-screen">
        {/* Editorial Collage Hero Section */}
        <section className="relative bg-gradient-to-br from-[#145126] via-[#142618] to-[#0E1B11] text-white border-b border-[#8DBD42]/20 overflow-hidden pt-[112px] sm:pt-[116px] lg:pt-[152px]">
          <div className="max-w-[1280px] mx-auto px-6 py-10 md:py-16 relative z-10">
            <div className="grid md:grid-cols-12 items-center gap-12">
              {/* Left Column: Heading and description details */}
              <div className="col-span-12 md:col-span-6 lg:col-span-7 space-y-8 text-white">
                <FadeIn
                  className="inline-flex items-center gap-2.5"
                  direction="up"
                >
                  <span className="w-2 h-2 rounded-none bg-[#8DBD42] animate-pulse" />
                  <span className="text-[#8DBD42] uppercase tracking-[0.25em] text-xs font-black">
                    SPECIALIZED CARE
                  </span>
                </FadeIn>

                <FadeIn delay={0.1} className="space-y-6" direction="up">
                  <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight font-serif">
                    Contents <span className="text-[#8DBD42]">Services</span>
                  </h1>
                  <p className="text-base text-white/85 leading-relaxed max-w-xl font-sans font-light">
                    When disaster strikes your property, your personal
                    belongings need the same level of professional care as the
                    building structure itself. We provide a streamlined,
                    end-to-end contents management system, handling everything
                    from digital inventory tracking and specialized cleaning to
                    secure, climate-stabilized storage while your home is being
                    rebuilt.
                  </p>
                </FadeIn>

                <FadeIn delay={0.2} className="pt-2" direction="up">
                  <a
                    href="tel:+13603451015"
                    className="inline-flex items-center gap-3 bg-[#8DBD42] hover:bg-[#72a232] text-white px-8 py-4 uppercase tracking-[0.16em] text-xs font-bold transition-all duration-300 shadow-md hover:-translate-y-0.5 rounded-none"
                  >
                    Contact Us: (360) 345-1015
                  </a>
                </FadeIn>
              </div>

              {/* Right Column: Smaller collage image */}
              <div className="col-span-12 md:col-span-6 lg:col-span-5 flex justify-center lg:justify-end">
                <FadeIn
                  delay={0.15}
                  className="w-full max-w-md lg:max-w-full"
                  direction="up"
                >
                  <img
                    src="/photo/contents-hero.png"
                    alt="Contents restoration services collage showing packaging and inventory"
                    className="w-full h-auto object-contain"
                  />
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* Complete Contents Management - 2-Column Asymmetric Split-List */}
        <Section bg="none">
          <Container>
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 max-w-5xl mx-auto items-start">
              {/* Left Column - 40% Width Sticky Text Anchor */}
              <div className="lg:col-span-5 lg:sticky lg:top-40 space-y-6">
                <FadeIn direction="up">
                  <span className="text-[#8DBD42] uppercase tracking-[0.2em] text-xs font-black block">
                    TRUSTED CUSTODY
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#3F4143] leading-tight font-serif">
                    Complete Contents Management
                  </h2>

                  {/* Progress Sidebar Tracker */}
                  <div className="hidden lg:block relative mt-8 pl-4 border-l border-[#3F4143]/10 space-y-6">
                    {[
                      { index: "01", label: "Inventory Logging" },
                      { index: "02", label: "Careful Extraction" },
                      { index: "03", label: "Molecular Cleaning" },
                      { index: "04", label: "Climate Storage" },
                    ].map((step, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 text-xs tracking-wider uppercase font-bold text-[#3F4143]/40 hover:text-[#8DBD42] transition-colors cursor-default"
                      >
                        <span className="font-mono text-[10px]">
                          {step.index}
                        </span>
                        <span>{step.label}</span>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </div>

              {/* Right Column - 60% Width Vertical Stack */}
              <div className="lg:col-span-7 space-y-10">
                {[
                  {
                    num: "01",
                    title: "Assured Pack-Out™ Inventory",
                    desc: "Before a single box is packed, we map your home using Assured PackOut™ software. Every item is photographed in place and barcoded, creating a transparent, insurance-approved digital record that prevents claims disputes.",
                    icon: <Camera size={20} />,
                  },
                  {
                    num: "02",
                    title: "Protective Extraction",
                    desc: "Your belongings are wrapped in conservation-grade materials and safely moved. To prevent cross-contamination, items are immediately sorted by material class, keeping fragile electronics, fabrics, and furniture separated in transit.",
                    icon: <Package size={20} />,
                  },
                  {
                    num: "03",
                    title: "Specialized Decontamination",
                    desc: "At our facility, we use targeted recovery methods. Hard goods undergo ultrasonic cleaning to lift fine soot, while textiles receive specialized air treatments to neutralize smoke and water odors at a molecular level.",
                    icon: <Wind size={20} />,
                  },
                  {
                    num: "04",
                    title: "Climate-Controlled Warehouse Storage",
                    desc: "Restored items are stored in secure storage units within our monitored warehouse facility. We maintain strict climate controls (40–60% relative humidity) to protect sensitive woods, artwork, and fabrics from environmental damage and warping while your property is being rebuilt.",
                    icon: <Warehouse size={20} />,
                  },
                ].map((item, idx) => (
                  <FadeIn
                    key={idx}
                    delay={idx * 0.08}
                    className="group border-b border-[#3F4143]/10 pb-10 last:border-0 last:pb-0"
                    direction="up"
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon & Index Module */}
                      <div className="flex-shrink-0 w-10 h-10 rounded-none bg-white border border-[#3F4143]/10 text-[#8DBD42] flex items-center justify-center shadow-sm group-hover:border-[#8DBD42] group-hover:bg-[#8DBD42]/5 transition-all duration-300">
                        {item.icon}
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs font-black text-[#8DBD42] tracking-widest uppercase">
                          {item.num} / PROCESS MODULE
                        </div>
                        <h3 className="font-bold text-xl text-[#3F4143] group-hover:text-[#8DBD42] transition-colors font-serif">
                          {item.title}
                        </h3>
                        <p className="text-[#3F4143]/70 text-sm leading-relaxed pt-1 font-sans font-light">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* The Process Timeline - Left-Aligned Vertical Axis Timeline */}
        <Section bg="white" className="border-t border-gray-100">
          <Container>
            <div className="max-w-3xl mx-auto">
              <FadeIn className="mb-20" direction="up">
                <span className="text-[#8DBD42] uppercase tracking-[0.25em] text-xs font-black block mb-3">
                  THE PATH TO RESTORATION
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-[#3F4143] font-serif">
                  A Seamless Five-Phase Journey
                </h2>
              </FadeIn>

              {/* Vertical axis line */}
              <div className="relative pl-10 border-l-2 border-[#8DBD42]/20 space-y-12 py-4">
                {[
                  {
                    num: "01",
                    title: "Site Assessment",
                    desc: "We review all impacted items on-site, logging damage and photo-documenting conditions to establish accurate restoration costs for your insurance adjuster.",
                    icon: <ClipboardCheck size={14} />,
                  },
                  {
                    num: "02",
                    title: "Secure Packing",
                    desc: "Technicians carefully pack your assets using protective wraps, stopping corrosive soot, color bleeding, or mold from causing further damage.",
                    icon: <Package size={14} />,
                  },
                  {
                    num: "03",
                    title: "Targeted Cleaning",
                    desc: "Each item goes down a specific restoration pathway, from ultrasonic line washing for hard goods to rapid drying protocols for wet materials.",
                    icon: <Sparkles size={14} />,
                  },
                  {
                    num: "04",
                    title: "Secure Warehouse Storage & Testing",
                    desc: "Your contents are transferred to our secure, climate-controlled warehouse. While your property undergoes construction, electronics are fully deionized and tested, and all items are monitored under stabilized temperature and humidity levels until your home is ready.",
                    icon: <Cpu size={14} />,
                  },
                  {
                    num: "05",
                    title: "Blueprint Move-Back",
                    desc: "We don't just drop off boxes. Using our initial digital room mapping, we return every piece of furniture and box back to its exact original location to make your transition home seamless.",
                    icon: <MapPin size={14} />,
                  },
                ].map((item, idx) => (
                  <FadeIn
                    key={idx}
                    delay={idx * 0.06}
                    className="relative group bg-white/40 hover:bg-white/90 border border-[#3F4143]/5 hover:border-[#8DBD42]/20 p-6 sm:p-8 rounded-none transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1"
                    direction="up"
                  >
                    {/* Node badge centered exactly on the border line */}
                    <div className="absolute left-[-58px] top-7 w-8 h-8 rounded-none bg-white border-2 border-[#8DBD42] text-[#8DBD42] flex items-center justify-center shadow-md z-10 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-bold text-[#8DBD42] tracking-wider uppercase flex items-center gap-2">
                        <span>PHASE {item.num}</span>
                      </div>
                      <h3 className="font-bold text-[#3F4143] text-xl group-hover:text-[#8DBD42] transition-colors font-serif">
                        {item.title}
                      </h3>
                      <p className="text-[#3F4143]/70 text-sm leading-relaxed pt-1 font-sans">
                        {item.desc}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* Specialized Portfolios - 3-Column Horizontal Grid */}
        <Section bg="none" className="border-t border-gray-100">
          <Container>
            <FadeIn className="mb-20 text-center" direction="up">
              <span className="text-[#8DBD42] uppercase tracking-[0.25em] text-xs font-black block mb-3">
                ASSETS WE PROTECT
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#3F4143] font-serif">
                Items We Professionally Clean & Restore
              </h2>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
              {[
                {
                  title: "Advanced Textile Remediation",
                  desc: "Removing soot, water stains, and embedded smoke odors from delicate fabrics.",
                  includes:
                    "Formalwear, suits, dresses, outerwear, fine linens, bedding, and specialty leathers.",
                  icon: <Shirt size={28} className="text-[#8DBD42]" />,
                },
                {
                  title: "Electronics & Data Recovery",
                  desc: "Counteracting internal corrosion from soot and water to save critical hardware and files.",
                  includes:
                    "Computers, data drives, mobile devices, game consoles, and home appliances.",
                  icon: <HardDrive size={28} className="text-[#8DBD42]" />,
                },
                {
                  title: "Art & Collectibles Preservation",
                  desc: "Low-moisture, conservator-approved cleaning techniques for high-value items.",
                  includes:
                    "Paintings, prints, family photographs, antiques, ceramics, and rare books.",
                  icon: <Palette size={28} className="text-[#8DBD42]" />,
                },
              ].map((item, idx) => (
                <FadeIn
                  key={idx}
                  delay={idx * 0.08}
                  className="group bg-white border border-[#3F4143]/10 hover:border-[#8DBD42] rounded-none p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
                  direction="up"
                >
                  <div className="space-y-5">
                    {/* Header Module */}
                    <div className="w-12 h-12 rounded-none bg-[#8DBD42]/5 flex items-center justify-center group-hover:bg-[#8DBD42]/10 transition-colors">
                      {item.icon}
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-bold text-2xl text-[#3F4143] group-hover:text-[#8DBD42] transition-colors font-serif">
                        {item.title}
                      </h3>
                      <p className="text-[#3F4143]/70 text-sm leading-relaxed font-sans">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Detailed list inclusions */}
                  <div className="pt-6 mt-6 border-t border-[#3F4143]/10 font-sans">
                    <h4 className="text-xs font-black text-[#8DBD42] uppercase tracking-widest mb-3">
                      Includes:
                    </h4>
                    <p className="text-[#3F4143]/80 text-xs leading-relaxed font-semibold">
                      {item.includes}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </Section>

        {/* CTA Section */}
        <section className="relative bg-white pt-24 pb-36 overflow-hidden border-t border-gray-100">
          {/* Background image banner */}
          <div className="absolute top-0 left-0 w-full h-[450px] md:h-[550px]">
            <img
              src="/photo/contents-cta.png"
              alt="Completed contents inventory cleaning and storage"
              className="w-full h-full object-cover object-center brightness-75"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Centered Overlapping Card Container */}
          <div className="relative max-w-[960px] mx-auto px-6 pt-[260px] md:pt-[340px] z-10">
            <FadeIn direction="up">
              <div className="bg-white border border-[#3F4143]/10 p-8 md:p-12 shadow-[0_24px_50px_rgba(0,0,0,0.06)] text-center rounded-none">
                <h2 className="text-2xl md:text-3.5xl font-bold text-[#3F4143] mb-6 font-serif">
                  Protect Your Valuables
                </h2>
                <div className="text-sm md:text-base text-[#3F4143]/85 space-y-6 leading-relaxed max-w-3xl mx-auto font-sans font-light">
                  <p>
                    We understand that your personal belongings represent a
                    lifetime of memories and investments. When disaster strikes,
                    it's not just the building structure that needs care; it's
                    the cherished contents inside.
                  </p>
                  <p>
                    Our professional contents pack-out, digital inventory, and
                    specialized cleaning services ensure that your valuables are
                    protected, restored, and securely stored in our
                    climate-controlled vaults while reconstruction is underway.
                  </p>
                </div>

                <div className="mt-10 flex flex-wrap gap-4 justify-center font-sans">
                  <a
                    href="tel:+13603451015"
                    className="bg-[#8DBD42] hover:bg-[#7bc034] text-white font-bold px-8 py-4 uppercase tracking-[0.14em] text-xs transition-colors rounded-none shadow-md flex items-center gap-2"
                  >
                    <Phone size={14} /> Contact Us Now
                  </a>
                  <Link
                    href="/resources/faq"
                    className="bg-[#3F4143] hover:bg-[#292b2d] text-white font-bold px-8 py-4 uppercase tracking-[0.14em] text-xs transition-colors rounded-none shadow-md"
                  >
                    FAQ & Resources
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </div>
    </Layout>
  );
}
