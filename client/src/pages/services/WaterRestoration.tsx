import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Zap, Thermometer, Droplets, CheckCircle, Phone } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Link } from "wouter";

// Shuffling Deck removed by user request

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

export default function WaterRestoration() {
  const services = [
    {
      icon: <Zap size={32} />,
      title: "24/7 Water Extraction",
      desc: "High-capacity truck-mounted pumps and commercial sub-surface extractors deployed immediately to extract standing water and halt structural mitigation spread.",
      img: "/photo/water2-flooded-hall.jpg"
    },
    {
      icon: <Thermometer size={32} />,
      title: "Thermal Moisture Mapping",
      desc: "Advanced FLIR infrared imaging cameras and non-penetrating moisture meters to trace migration corridors hidden within walls, flooring, and structural sub-assemblies.",
      img: "/photo/water2-flir-meter.jpg"
    },
    {
      icon: <Droplets size={32} />,
      title: "Industrial Dehumidification",
      desc: "LGR (Low Grain Refrigerant) dehumidifiers and high-velocity axial air movers dynamically balance humidity levels to dry structural timbers rapidly.",
      img: "/photo/water2-air-movers.jpg"
    },
    {
      icon: <CheckCircle size={32} />,
      title: "Mold Prevention & Sanitization",
      desc: "EPA-approved anti-microbial treatments combined with negative air pressure HEPA filtration capture spores and clean secondary structural mold growth.",
      img: "/photo/water2-containment.jpg"
    },
  ];

  return (
    <Layout>
      <Helmet>
        <title>Water Damage Restoration | Heritage Restoration</title>
        <meta
          name="description"
          content="Professional 24/7 water damage mitigation, dryout, and mold prevention services in Washington State. Rapid emergency response."
        />
      </Helmet>

      <div className="min-h-screen bg-canvas-textured pt-[142px]">
        {/* Centered Editorial Hero Section */}
        <section className="relative bg-[#292b2d] text-white pt-20 pb-20 px-6 overflow-hidden border-b border-[#8DBD42]/20">
          <div className="max-w-[800px] mx-auto text-center relative z-10 space-y-6">
            <FadeUp className="inline-flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#8DBD42] animate-pulse" />
              <span className="text-[#8DBD42] uppercase tracking-[0.2em] text-xs font-black">
                24/7 Response Dispatch
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                style={{ fontFamily: "'Libre Caslon Text', serif" }}
              >
                Water Restoration
              </h1>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-2xl mx-auto">
                Water damage requires immediate action to prevent mold growth and structural deterioration. Our 24/7 team deploys advanced extraction and dehumidification systems to save your property.
              </p>
            </FadeUp>
          </div>

          {/* Graphic Background elements */}
          <div className="absolute top-0 left-0 bottom-0 right-0 opacity-5 pointer-events-none">
            <div className="absolute w-[500px] h-[500px] bg-white rounded-full -top-64 -left-64" />
          </div>
        </section>

        {/* Specialized Services - Vertical Glow List */}
        <section className="py-20 bg-transparent">
          <div className="max-w-[1280px] mx-auto px-6">
            <FadeUp className="mb-16 text-center">
              <h2
                className="text-3xl md:text-4xl font-bold text-[#3F4143] mb-6"
                style={{ fontFamily: "'Libre Caslon Text', serif" }}
              >
                Our Specialized Services
              </h2>
            </FadeUp>

            <div className="space-y-6 max-w-5xl mx-auto">
              {services.map((item, idx) => (
                <FadeUp
                  key={idx}
                  delay={idx * 0.1}
                  className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)] border-l-4 border-l-transparent hover:border-l-[#8DBD42] hover:shadow-[0_15px_30px_rgba(0,0,0,0.06)] transition-all duration-300 grid md:grid-cols-12 gap-0 items-stretch border border-[#3F4143]/5"
                >
                  {/* Service Text Details */}
                  <div className="md:col-span-8 p-8 flex flex-col justify-center space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="text-[#8DBD42]">{item.icon}</div>
                      <h3 className="font-bold text-[#3F4143] text-xl" style={{ fontFamily: "'Libre Caslon Text', serif" }}>
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-[#3F4143]/70 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  {/* Wide Image Panel */}
                  <div className="md:col-span-4 relative min-h-[180px] md:min-h-auto overflow-hidden">
                    <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Process Horizontal Grid Section */}
        <section className="py-20 md:py-32 bg-transparent border-t border-[#3F4143]/5">
          <div className="max-w-[1280px] mx-auto px-6">
            <FadeUp className="mb-20 text-center">
              <h2
                className="text-3xl md:text-4xl font-bold text-[#3F4143] mb-6"
                style={{ fontFamily: "'Libre Caslon Text', serif" }}
              >
                Water Restoration Process
              </h2>
            </FadeUp>

            {/* Horizontal Timeline Process Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  step: "01",
                  title: "Emergency Assessment",
                  desc: "Immediate evaluation of water source, extent of damage, and contamination level.",
                },
                {
                  step: "02",
                  title: "Water Extraction",
                  desc: "High-capacity pumps and vacuums remove all standing water within the first few hours.",
                },
                {
                  step: "03",
                  title: "Moisture Detection",
                  desc: "Thermal imaging and moisture meters identify hidden water in walls, floors, and cavities.",
                },
                {
                  step: "04",
                  title: "Equipment Deployment",
                  desc: "Industrial dehumidifiers, air movers, and HEPA filters deployed throughout the property.",
                },
                {
                  step: "05",
                  title: "Monitoring & Adjustment",
                  desc: "Daily moisture readings and equipment adjustments ensure optimal drying conditions.",
                },
                {
                  step: "06",
                  title: "Restoration & Rebuild",
                  desc: "Damaged materials replaced with new drywall, flooring, and finishes to pre-loss condition.",
                },
              ].map((item, idx) => (
                <FadeUp
                  key={idx}
                  delay={idx * 0.05}
                  className="bg-white rounded-2xl p-8 border border-[#3F4143]/5 shadow-[0_6px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 relative"
                >
                  <span className="absolute top-6 right-6 text-4xl font-black text-[#8DBD42]/10 select-none">{item.step}</span>
                  <div className="w-10 h-10 rounded-full bg-[#8DBD42]/10 text-[#8DBD42] flex items-center justify-center font-bold text-sm mb-4">
                    {idx + 1}
                  </div>
                  <h3 className="font-bold text-[#3F4143] text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#3F4143]/70 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us checklist */}
        <section className="py-20 md:py-32 bg-transparent border-t border-[#3F4143]/5">
          <div className="max-w-[1280px] mx-auto px-6">
            <FadeUp className="mb-16 text-center">
              <h2
                className="text-3xl md:text-4xl font-bold text-[#3F4143] mb-6"
                style={{ fontFamily: "'Libre Caslon Text', serif" }}
              >
                Why Heritage Restoration for Water Damage
              </h2>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                "24/7 emergency response and water extraction",
                "Thermal imaging for complete moisture detection",
                "Industrial-grade dehumidification equipment",
                "Mold prevention and anti-microbial treatments",
                "IICRC certified water restoration specialists",
                "Complete drywall and flooring restoration",
                "Direct insurance company coordination",
                "5-year warranty on all restoration work",
              ].map((item, idx) => (
                <FadeUp
                  key={idx}
                  delay={idx * 0.05}
                  className="flex gap-4 items-start pl-2"
                >
                  <CheckCircle
                    size={20}
                    className="text-[#8DBD42] flex-shrink-0 mt-1"
                  />
                  <p className="text-[#3F4143] font-bold text-base md:text-lg">{item}</p>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white pb-24 overflow-hidden pt-12">
          {/* Centered before/after banner — natural aspect ratio, high resolution */}
          <div className="max-w-[800px] mx-auto px-6 relative z-0">
            <div className="rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.08)] border border-[#3F4143]/10">
              <img
                src="/photo/water-cta-before-after.png"
                alt="Kitchen water damage before and after restoration"
                className="w-full h-auto block"
              />
            </div>
          </div>

          {/* Overlapping Card */}
          <div className="relative max-w-[960px] mx-auto px-6 -mt-16 z-10">
            <FadeUp>
              <div className="bg-white border border-[#3F4143]/10 rounded-2xl p-8 md:p-12 shadow-[0_24px_50px_rgba(0,0,0,0.08)] text-center">
                <h2
                  className="text-2xl md:text-3xl font-bold text-[#3F4143] mb-6"
                  style={{ fontFamily: "'Libre Caslon Text', serif" }}
                >
                  Your Water Damage Restoration Experts
                </h2>
                <div
                  className="text-sm md:text-base text-[#3F4143]/85 space-y-6 leading-relaxed max-w-3xl mx-auto"
                  style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                >
                  <p>
                    Water damage is incredibly invasive and can quickly cause severe structural issues if left unaddressed. We map out all moisture using thermal imaging and deploy LGR dryout systems immediately.
                  </p>
                  <p>
                    Our certified team manages the entire scope of claims, coordinate dryout reports for adjusters, and handles the reconstruction of flooring and walls back to code.
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
