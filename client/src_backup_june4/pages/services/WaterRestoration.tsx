import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Droplets,
  Zap,
  Thermometer,
  CheckCircle,
  Phone,
  Mail,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";

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
  return (
    <Layout>
      <Helmet>
        <title>Water Damage Restoration | Heritage Restoration</title>
        <meta
          name="description"
          content="Emergency water damage restoration and dryout services. 24/7 extraction, dehumidification, and mold prevention in Washington."
        />
        <meta
          property="og:title"
          content="Water Damage Restoration | Heritage Restoration"
        />
        <meta
          property="og:description"
          content="24/7 water extraction and professional drying services to prevent mold and structural damage."
        />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Heritage Restoration - Water Damage",
            description:
              "Professional water damage restoration and drying services",
            telephone: "+1-360-851-1407",
            email: "office@firewaterstorm.com",
            areaServed: "WA",
            serviceType: "Water Damage Restoration",
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white pt-[142px]">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-r from-[#3F4143] to-[#2a2c2e] text-white overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-6">
            <FadeUp className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Droplets size={32} className="text-[#8DBD42]" />
                <span className="text-[#8DBD42] font-bold text-sm uppercase tracking-widest">
                  Our Expertise
                </span>
              </div>
              <h1
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Water Damage Restoration & Dryout
              </h1>
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                Water damage requires immediate action to prevent mold growth
                and structural deterioration. Our 24/7 team deploys advanced
                extraction and dehumidification systems to save your property.
              </p>
              <a
                href="tel:+13608511407"
                className="inline-flex items-center gap-2 bg-[#8DBD42] hover:bg-[#7BB843] text-white font-bold px-8 py-4 rounded transition-all duration-300"
              >
                <Phone size={18} /> 24/7 Emergency: +1(360)851-1407
              </a>
            </FadeUp>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <FadeUp className="mb-16">
              <h2
                className="text-3xl md:text-4xl font-bold text-[#3F4143] mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Complete Water Damage Solutions
              </h2>
              <p className="text-lg text-[#3F4143]/70 max-w-2xl">
                From emergency extraction to complete drywall and flooring
                restoration, we prevent mold and restore your property to
                pre-loss condition.
              </p>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Zap size={32} />,
                  title: "24/7 Water Extraction",
                  desc: "High-capacity pumps and vacuums deployed immediately to remove standing water and prevent spreading.",
                },
                {
                  icon: <Thermometer size={32} />,
                  title: "Thermal Moisture Mapping",
                  desc: "Advanced thermal imaging to detect hidden moisture in walls, floors, and structural cavities.",
                },
                {
                  icon: <Droplets size={32} />,
                  title: "Industrial Dehumidification",
                  desc: "LGR dehumidifiers and air movers to achieve complete structural dryout in days, not weeks.",
                },
                {
                  icon: <CheckCircle size={32} />,
                  title: "Mold Prevention & Sanitization",
                  desc: "Anti-microbial treatments and HEPA air filtration to prevent mold growth and contamination.",
                },
              ].map((item, idx) => (
                <FadeUp
                  key={idx}
                  delay={idx * 0.1}
                  className="bg-[#F5F7FA] rounded-lg p-8 hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-[#8DBD42] mb-4">{item.icon}</div>
                  <h3 className="font-bold text-[#3F4143] mb-3 text-lg">
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

        {/* Process */}
        <section className="py-20 md:py-32 bg-[#F5F7FA]">
          <div className="max-w-[1280px] mx-auto px-6">
            <FadeUp className="mb-16 text-center">
              <h2
                className="text-3xl md:text-4xl font-bold text-[#3F4143] mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Water Restoration Process
              </h2>
              <p className="text-lg text-[#3F4143]/70 max-w-2xl mx-auto">
                Rapid response and systematic drying to prevent mold and
                structural damage.
              </p>
            </FadeUp>

            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Emergency Assessment",
                  desc: "Immediate evaluation of water source, extent of damage, and contamination level.",
                },
                {
                  step: "2",
                  title: "Water Extraction",
                  desc: "High-capacity pumps and vacuums remove all standing water within the first few hours.",
                },
                {
                  step: "3",
                  title: "Moisture Detection",
                  desc: "Thermal imaging and moisture meters identify hidden water in walls, floors, and cavities.",
                },
                {
                  step: "4",
                  title: "Equipment Deployment",
                  desc: "Industrial dehumidifiers, air movers, and HEPA filters deployed throughout the property.",
                },
                {
                  step: "5",
                  title: "Monitoring & Adjustment",
                  desc: "Daily moisture readings and equipment adjustments ensure optimal drying conditions.",
                },
                {
                  step: "6",
                  title: "Restoration & Rebuild",
                  desc: "Damaged materials replaced with new drywall, flooring, and finishes to pre-loss condition.",
                },
              ].map((item, idx) => (
                <FadeUp
                  key={idx}
                  delay={idx * 0.05}
                  className="flex gap-6 items-start"
                >
                  <div className="w-12 h-12 rounded-full bg-[#8DBD42] text-white flex items-center justify-center font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#3F4143] text-lg mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[#3F4143]/70">{item.desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <FadeUp className="mb-16">
              <h2
                className="text-3xl md:text-4xl font-bold text-[#3F4143] mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Why Heritage Restoration for Water Damage
              </h2>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  className="flex gap-4 items-start"
                >
                  <CheckCircle
                    size={24}
                    className="text-[#8DBD42] flex-shrink-0 mt-1"
                  />
                  <p className="text-[#3F4143] font-semibold">{item}</p>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-[#7BB843] text-white">
          <div className="max-w-[1280px] mx-auto px-6 text-center">
            <FadeUp>
              <h2
                className="text-3xl md:text-4xl font-bold mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Water Damage Emergency?
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Call immediately for 24/7 water extraction and emergency
                mitigation services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+13608511407"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#3F4143] font-bold px-8 py-4 rounded hover:bg-[#F5F7FA] transition-all duration-300"
                >
                  <Phone size={18} /> +1(360)851-1407
                </a>
                <a
                  href="mailto:office@firewaterstorm.com"
                  className="inline-flex items-center justify-center gap-2 bg-[#3F4143] text-white font-bold px-8 py-4 rounded hover:bg-[#2a2c2e] transition-all duration-300"
                >
                  <Mail size={18} /> Email Us
                </a>
              </div>
            </FadeUp>
          </div>
        </section>
      </div>
    </Layout>
  );
}
