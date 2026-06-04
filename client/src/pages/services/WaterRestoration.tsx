import { Zap, Thermometer, Droplets, CheckCircle, Phone } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Link } from "wouter";
import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

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

      <div className="min-h-screen bg-brand-linen pt-[142px]">
        {/* Editorial Hero Section */}
        <section className="relative bg-[#292b2d] text-white pt-24 pb-24 px-6 overflow-hidden border-b border-[#8DBD42]/20">
          <div className="max-w-[800px] mx-auto text-center relative z-10 space-y-6">
            <FadeIn className="inline-flex items-center gap-2" direction="up">
              <span className="w-3 h-3 rounded-none bg-[#8DBD42] animate-pulse" />
              <span className="text-[#8DBD42] uppercase tracking-[0.2em] text-xs font-black">
                24/7 Response Dispatch
              </span>
            </FadeIn>
            <FadeIn delay={0.1} direction="up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-serif">
                Water Restoration
              </h1>
            </FadeIn>
            <FadeIn delay={0.2} direction="up">
              <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-2xl mx-auto font-sans font-light">
                Water damage requires immediate action to prevent mold growth and structural deterioration. Our 24/7 team deploys advanced extraction and dehumidification systems to save your property.
              </p>
            </FadeIn>
          </div>

          <div className="absolute top-0 left-0 bottom-0 right-0 opacity-[0.02] pointer-events-none">
            <div className="absolute w-[500px] h-[500px] bg-white rounded-none -top-64 -left-64" />
          </div>
        </section>

        {/* Specialized Services — 6:6 Alternating Checkerboard Layout */}
        <Section bg="none">
          <Container>
            <FadeIn className="mb-20 text-center" direction="up">
              <span className="overline-label">Our Capabilities</span>
              <h2 className="text-3xl md:text-4.5xl font-bold text-[#3F4143] mt-2 font-serif">
                Specialized Water Services
              </h2>
            </FadeIn>

            <div className="space-y-12 max-w-5xl mx-auto">
              {services.map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <FadeIn
                    key={idx}
                    delay={idx * 0.08}
                    className="bg-white border border-[#3F4143]/8 shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-[0_16px_35px_rgba(0,0,0,0.05)] transition-all duration-300 grid md:grid-cols-12 gap-0 items-stretch rounded-none overflow-hidden"
                    direction="up"
                  >
                    {/* Image Column - Alternates Left / Right */}
                    <div className={`md:col-span-6 relative min-h-[220px] md:min-h-auto overflow-hidden ${!isEven ? "md:order-1" : "md:order-2"}`}>
                      <img
                        src={item.img}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-103"
                      />
                    </div>

                    {/* Text Column */}
                    <div className={`md:col-span-6 p-8 md:p-12 flex flex-col justify-center space-y-4 ${isEven ? "md:order-1" : "md:order-2"}`}>
                      <div className="flex items-center gap-3">
                        <div className="text-[#8DBD42]">{item.icon}</div>
                        <h3 className="font-bold text-[#3F4143] text-xl md:text-2xl font-serif">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-[#3F4143]/70 text-sm leading-relaxed font-sans">
                        {item.desc}
                      </p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </Container>
        </Section>

        {/* Highlighted Full-Width Emergency Drying Section */}
        <Section bg="charcoal">
          <Container>
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <FadeIn direction="up">
                  <span className="text-[#8DBD42] uppercase tracking-[0.25em] text-xs font-black">
                    Mitigation Excellence
                  </span>
                  <h2 className="text-3xl md:text-4.5xl font-bold text-white mt-3 font-serif">
                    Advanced LGR Drying Technology
                  </h2>
                </FadeIn>
                <FadeIn delay={0.1} direction="up" className="space-y-4 text-white/80 font-sans font-light">
                  <p className="text-base md:text-lg leading-relaxed">
                    At Heritage Restoration, we employ state-of-the-art <strong>Low Grain Refrigerant (LGR) Dehumidifiers</strong> to achieve maximum drying efficiency. Unlike standard consumer-grade units, LGR systems pull significantly more moisture from the air, enabling them to dry dense building materials like structural timbers, concrete subfloors, and thick plaster walls.
                  </p>
                  <p className="text-sm leading-relaxed">
                    By lowering the grain-per-pound (GPP) moisture level, we create a vapor pressure differential that forces embedded moisture out of saturated materials and into the dry air, where it is instantly condensed and pumped away. This prevents secondary swelling, warping, and bacterial mold growth.
                  </p>
                </FadeIn>
              </div>
              <div className="lg:col-span-5">
                <FadeIn direction="up" className="border border-white/10 p-8 bg-white/5 space-y-6 rounded-none">
                  <h3 className="text-lg font-bold text-[#8DBD42] uppercase tracking-wider font-serif">
                    Mitigation Protocols
                  </h3>
                  <ul className="space-y-4 font-sans text-sm text-white/90">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-none bg-[#8DBD42] mt-2 flex-shrink-0" />
                      <span><strong>Thermal Diagnostics:</strong> Mapping hidden moisture plumes with infrared scanners.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-none bg-[#8DBD42] mt-2 flex-shrink-0" />
                      <span><strong>Pressure Mapping:</strong> Injecting dry air under cabinets and subfloors.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-none bg-[#8DBD42] mt-2 flex-shrink-0" />
                      <span><strong>Daily Tracking:</strong> Documenting relative humidity (RH) and moisture content.</span>
                    </li>
                  </ul>
                </FadeIn>
              </div>
            </div>
          </Container>
        </Section>

        {/* Process Section */}
        <Section bg="white" className="border-t border-gray-100">
          <Container>
            <FadeIn className="mb-20 text-center" direction="up">
              <span className="overline-label">The Journey</span>
              <h2 className="text-3xl md:text-4.5xl font-bold text-[#3F4143] mt-2 font-serif">
                Water Restoration Process
              </h2>
            </FadeIn>

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
                <FadeIn
                  key={idx}
                  delay={idx * 0.05}
                  className="bg-white p-8 border border-[#3F4143]/8 shadow-[0_6px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] transition-all duration-300 relative rounded-none"
                  direction="up"
                >
                  <span className="absolute top-6 right-6 text-4xl font-black text-[#8DBD42]/10 select-none font-serif">{item.step}</span>
                  <div className="w-10 h-10 rounded-none bg-[#8DBD42]/10 text-[#8DBD42] flex items-center justify-center font-bold text-sm mb-4 font-serif">
                    {idx + 1}
                  </div>
                  <h3 className="font-bold text-[#3F4143] text-lg mb-2 font-serif">
                    {item.title}
                  </h3>
                  <p className="text-[#3F4143]/70 text-sm leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </FadeIn>
              ))}
            </div>
          </Container>
        </Section>

        {/* Why Choose Us checklist */}
        <Section bg="none" className="border-t border-gray-100">
          <Container>
            <FadeIn className="mb-16 text-center" direction="up">
              <span className="overline-label">Our Standards</span>
              <h2 className="text-3xl md:text-4.5xl font-bold text-[#3F4143] mt-2 font-serif">
                Why Heritage for Water Damage
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto font-sans">
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
                  <p className="text-[#3F4143] font-bold text-base md:text-lg leading-snug">{item}</p>
                </FadeIn>
              ))}
            </div>
          </Container>
        </Section>

        {/* CTA Section */}
        <Section bg="white" className="border-t border-gray-100 pb-24">
          <Container>
            {/* Centered before/after banner */}
            <div className="max-w-[800px] mx-auto relative z-0 mb-10">
              <div className="border border-[#3F4143]/10 rounded-none overflow-hidden shadow-md">
                <img
                  src="/photo/water-cta-before-after.png"
                  alt="Kitchen water damage before and after restoration"
                  className="w-full h-auto block"
                />
              </div>
            </div>

            {/* Overlapping Card */}
            <div className="relative max-w-[960px] mx-auto z-10">
              <FadeIn direction="up">
                <div className="bg-white border border-[#3F4143]/10 p-8 md:p-12 shadow-[0_24px_50px_rgba(0,0,0,0.06)] text-center rounded-none">
                  <h2 className="text-2xl md:text-3.5xl font-bold text-[#3F4143] mb-6 font-serif">
                    Your Water Damage Restoration Experts
                  </h2>
                  <div className="text-sm md:text-base text-[#3F4143]/85 space-y-6 leading-relaxed max-w-3xl mx-auto font-sans font-light">
                    <p>
                      Water damage is incredibly invasive and can quickly cause severe structural issues if left unaddressed. We map out all moisture using thermal imaging and deploy LGR dryout systems immediately.
                    </p>
                    <p>
                      Our certified team manages the entire scope of claims, coordinate dryout reports for adjusters, and handles the reconstruction of flooring and walls back to code.
                    </p>
                  </div>

                  <div className="mt-10 flex flex-wrap gap-4 justify-center font-sans">
                    <a
                      href="tel:+13608511407"
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
          </Container>
        </Section>
      </div>
    </Layout>
  );
}
