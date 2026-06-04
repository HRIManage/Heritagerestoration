import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Phone,
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
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Link } from "wouter";

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

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
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Heritage Restoration - Contents Services",
            description:
              "Professional contents pack-out, cleaning, and storage services",
            telephone: "+1-360-345-1015",
            email: "office@firewaterstorm.com",
            areaServed: "WA",
            serviceType: "Contents Services",
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-canvas-textured pt-[98px]">
        {/* Editorial Collage Hero Section */}
        <section className="relative bg-[#292b2d] text-white border-b border-[#8DBD42]/20 overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-6 py-20 md:py-28 relative z-10">
            <div className="grid md:grid-cols-12 items-center gap-12">
              {/* Left Column: Heading and description details */}
              <div className="col-span-12 md:col-span-6 lg:col-span-7 space-y-8 text-white">
                <FadeUp className="inline-flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#8DBD42] animate-pulse" />
                  <span className="text-[#8DBD42] uppercase tracking-[0.25em] text-xs font-black">
                    SPECIALIZED CARE
                  </span>
                </FadeUp>
                
                <FadeUp delay={0.1} className="space-y-6">
                  <h1
                    className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight"
                    style={{ fontFamily: "'Libre Caslon Text', serif" }}
                  >
                    Contents <span className="text-[#8DBD42]">Services</span>
                  </h1>
                  <p className="text-base text-white/80 leading-relaxed max-w-xl font-medium">
                    When disaster strikes your property, your personal belongings need the same level of professional care as the building structure itself. We provide a streamlined, end-to-end contents management system—handling everything from digital inventory tracking and specialized cleaning to secure, climate-stabilized storage while your home is being rebuilt.
                  </p>
                </FadeUp>

                <FadeUp delay={0.2} className="pt-2">
                  <a
                    href="tel:+13603451015"
                    className="inline-flex items-center gap-3 bg-[#8DBD42] hover:bg-[#7BB843] text-white px-8 py-4 uppercase tracking-[0.16em] text-xs font-bold transition-all duration-300 shadow-md hover:-translate-y-0.5"
                  >
                    Contact Us: 360-345-1015
                  </a>
                </FadeUp>
              </div>

              {/* Right Column: Smaller collage image displayed on the right for desktop, centered below for mobile */}
              <div className="col-span-12 md:col-span-6 lg:col-span-5 flex justify-center lg:justify-end">
                <FadeUp delay={0.15} className="w-full max-w-md lg:max-w-full">
                  <div className="overflow-hidden rounded-2xl border border-neutral-200/60 shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300 bg-white p-2">
                    <img
                      src="/photo/contents-hero.png"
                      alt="Contents restoration services collage showing packaging and inventory"
                      className="w-full h-auto object-contain rounded-xl"
                    />
                  </div>
                </FadeUp>
              </div>

            </div>
          </div>
        </section>

        {/* Complete Contents Management - 2-Column Asymmetric Split-List */}
        <section className="py-24 md:py-32 bg-transparent">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 max-w-5xl mx-auto items-start">
              
              {/* Left Column - 40% Width Sticky Text Anchor */}
              <div className="lg:col-span-5 lg:sticky lg:top-40 space-y-6">
                <FadeUp>
                  <span className="text-[#8DBD42] uppercase tracking-[0.2em] text-xs font-black block">
                    TRUSTED CUSTODY
                  </span>
                  <h2
                    className="text-3xl md:text-4xl font-bold text-[#3F4143] leading-tight"
                    style={{ fontFamily: "'Libre Caslon Text', serif" }}
                  >
                    Complete Contents Management
                  </h2>
                  
                  {/* Progress Sidebar Tracker */}
                  <div className="hidden lg:block relative mt-8 pl-4 border-l border-[#3F4143]/10 space-y-6">
                    {[
                      { index: "01", label: "Inventory Logging" },
                      { index: "02", label: "Careful Extraction" },
                      { index: "03", label: "Molecular Cleaning" },
                      { index: "04", label: "Climate Storage" }
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs tracking-wider uppercase font-bold text-[#3F4143]/40 hover:text-[#8DBD42] transition-colors cursor-default">
                        <span className="font-mono text-[10px]">{step.index}</span>
                        <span>{step.label}</span>
                      </div>
                    ))}
                  </div>
                </FadeUp>
              </div>

              {/* Right Column - 60% Width Vertical Stack (No Card Boxes, Premium Interactive Rows) */}
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
                    desc: "Your belongings are wrapped in conservation-grade materials and safely moved. To prevent cross-contamination, items are immediately sorted by material class—keeping fragile electronics, fabrics, and furniture separated in transit.",
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
                  <FadeUp
                    key={idx}
                    delay={idx * 0.08}
                    className="group border-b border-[#3F4143]/10 pb-10 last:border-0 last:pb-0"
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon & Index Module */}
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white border border-[#3F4143]/10 text-[#8DBD42] flex items-center justify-center shadow-sm group-hover:border-[#8DBD42] group-hover:bg-[#8DBD42]/5 transition-all duration-300">
                        {item.icon}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-xs font-black text-[#8DBD42] tracking-widest uppercase">
                          {item.num} / PROCESS MODULE
                        </div>
                        <h3 className="font-bold text-xl text-[#3F4143] group-hover:text-[#8DBD42] transition-colors" style={{ fontFamily: "'Libre Caslon Text', serif" }}>
                          {item.title}
                        </h3>
                        <p className="text-[#3F4143]/70 text-sm leading-relaxed pt-1">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* The Process Timeline - Left-Aligned Vertical Axis Timeline */}
        <section className="py-24 md:py-32 bg-transparent border-t border-[#3F4143]/5">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <FadeUp className="mb-20">
                <span className="text-[#8DBD42] uppercase tracking-[0.25em] text-xs font-black block mb-3">
                  THE PATH TO RESTORATION
                </span>
                <h2
                  className="text-3xl md:text-5xl font-bold text-[#3F4143]"
                  style={{ fontFamily: "'Libre Caslon Text', serif" }}
                >
                  A Seamless Five-Phase Journey
                </h2>
              </FadeUp>

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
                  <FadeUp
                    key={idx}
                    delay={idx * 0.06}
                    className="relative group bg-white/40 hover:bg-white/90 border border-[#3F4143]/5 hover:border-[#8DBD42]/20 p-6 sm:p-8 rounded-2xl transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1"
                  >
                    {/* Node badge centered exactly on the border line */}
                    <div className="absolute left-[-58px] top-7 w-8 h-8 rounded-full bg-white border-2 border-[#8DBD42] text-[#8DBD42] flex items-center justify-center shadow-md z-10 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-[#8DBD42] tracking-wider uppercase flex items-center gap-2">
                        <span>PHASE {item.num}</span>
                      </div>
                      <h3 className="font-bold text-[#3F4143] text-xl group-hover:text-[#8DBD42] transition-colors" style={{ fontFamily: "'Libre Caslon Text', serif" }}>
                        {item.title}
                      </h3>
                      <p className="text-[#3F4143]/70 text-sm leading-relaxed pt-1">
                        {item.desc}
                      </p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Specialized Portfolios - 3-Column Horizontal Grid */}
        <section className="py-24 md:py-32 bg-transparent border-t border-[#3F4143]/5">
          <div className="max-w-[1280px] mx-auto px-6">
            <FadeUp className="mb-20 text-center">
              <span className="text-[#8DBD42] uppercase tracking-[0.25em] text-xs font-black block mb-3">
                ASSETS WE PROTECT
              </span>
              <h2
                className="text-3xl md:text-5xl font-bold text-[#3F4143]"
                style={{ fontFamily: "'Libre Caslon Text', serif" }}
              >
                Items We Professionally Clean & Restore
              </h2>
            </FadeUp>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
              {[
                {
                  title: "Advanced Textile Remediation",
                  desc: "Removing soot, water stains, and embedded smoke odors from delicate fabrics.",
                  includes: "Formalwear, suits, dresses, outerwear, fine linens, bedding, and specialty leathers.",
                  icon: <Shirt size={28} className="text-[#8DBD42]" />
                },
                {
                  title: "Electronics & Data Recovery",
                  desc: "Counteracting internal corrosion from soot and water to save critical hardware and files.",
                  includes: "Computers, data drives, mobile devices, game consoles, and home appliances.",
                  icon: <HardDrive size={28} className="text-[#8DBD42]" />
                },
                {
                  title: "Art & Collectibles Preservation",
                  desc: "Low-moisture, conservator-approved cleaning techniques for high-value items.",
                  includes: "Paintings, prints, family photographs, antiques, ceramics, and rare books.",
                  icon: <Palette size={28} className="text-[#8DBD42]" />
                },
              ].map((item, idx) => (
                <FadeUp
                  key={idx}
                  delay={idx * 0.08}
                  className="group bg-white/80 border border-[#3F4143]/10 hover:border-[#8DBD42] rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
                >
                  <div className="space-y-5">
                    {/* Header Module */}
                    <div className="w-12 h-12 rounded-2xl bg-[#8DBD42]/5 flex items-center justify-center group-hover:bg-[#8DBD42]/10 transition-colors">
                      {item.icon}
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="font-bold text-2xl text-[#3F4143] group-hover:text-[#8DBD42] transition-colors" style={{ fontFamily: "'Libre Caslon Text', serif" }}>
                        {item.title}
                      </h3>
                      <p className="text-[#3F4143]/70 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  
                  {/* Detailed list inclusions */}
                  <div className="pt-6 mt-6 border-t border-[#3F4143]/10">
                    <h4 className="text-xs font-black text-[#8DBD42] uppercase tracking-widest mb-3">
                      Includes:
                    </h4>
                    <p className="text-[#3F4143]/80 text-xs leading-relaxed font-semibold">
                      {item.includes}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative bg-white pt-24 pb-36 overflow-hidden">
          {/* Background image banner */}
          <div className="absolute top-0 left-0 w-full h-[450px] md:h-[550px]">
            <img
              src="/photo/contents-cta.png"
              alt="Completed contents inventory cleaning and storage"
              className="w-full h-full object-cover object-center brightness-75"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/35" />
          </div>

          {/* Centered Overlapping Card Container */}
          <div className="relative max-w-[960px] mx-auto px-6 pt-[260px] md:pt-[340px] z-10">
            <FadeUp>
              <div className="bg-white border border-[#3F4143]/10 rounded-2xl p-8 md:p-12 shadow-[0_24px_50px_rgba(0,0,0,0.08)] text-center">
                <h2
                  className="text-2xl md:text-3xl font-bold text-[#3F4143] mb-6"
                  style={{ fontFamily: "'Libre Caslon Text', serif" }}
                >
                  Protect Your Valuables
                </h2>
                <div
                  className="text-sm md:text-base text-[#3F4143]/85 space-y-6 leading-relaxed max-w-3xl mx-auto"
                  style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                >
                  <p>
                    We understand that your personal belongings represent a lifetime of memories and investments. When disaster strikes, it's not just the building structure that needs care—it's the cherished contents inside.
                  </p>
                  <p>
                    Our professional contents pack-out, digital inventory, and specialized cleaning services ensure that your valuables are protected, restored, and securely stored in our climate-controlled vaults while reconstruction is underway.
                  </p>
                </div>

                <div
                  className="mt-8 flex flex-wrap gap-4 justify-center"
                  style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                >
                  <a
                    href="tel:+13603451015"
                    className="bg-[#8DBD42] hover:bg-[#7BB843] text-white font-bold px-8 py-4 uppercase tracking-[0.14em] text-xs transition-colors shadow-md flex items-center gap-2"
                  >
                    <Phone size={14} /> Contact Us Now
                  </a>
                  <Link
                    href="/resources/faq"
                    className="bg-[#3F4143] hover:bg-[#292b2d] text-white font-bold px-8 py-4 uppercase tracking-[0.14em] text-xs transition-colors shadow-md"
                  >
                    FAQ & Resources
                  </Link>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>
      </div>
    </Layout>
  );
}
