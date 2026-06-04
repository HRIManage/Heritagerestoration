import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Flame, Shield, Clock, CheckCircle, Phone, Mail } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
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

export default function FireRestoration() {
  return (
    <Layout>
      <Helmet>
        <title>Fire Damage Restoration | Heritage Restoration</title>
        <meta name="description" content="Professional fire damage restoration services in Washington. Emergency response within 45 minutes. Full structural reconstruction and smoke mitigation." />
        <meta property="og:title" content="Fire Damage Restoration | Heritage Restoration" />
        <meta property="og:description" content="Professional fire damage restoration services in Washington. Emergency response within 45 minutes." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Heritage Restoration - Fire Restoration",
            "description": "Professional fire damage restoration and reconstruction services",
            "telephone": "+1-360-851-1407",
            "email": "office@firewaterstorm.com",
            "areaServed": "WA",
            "serviceType": "Fire Damage Restoration"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white pt-[142px]">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-r from-[#3F4143] to-[#2a2c2e] text-white overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-6">
            <FadeUp className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Flame size={32} className="text-[#8DBD42]" />
                <span className="text-[#8DBD42] font-bold text-sm uppercase tracking-widest">Our Expertise</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Fire Damage Restoration & Reconstruction
              </h1>
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                When fire strikes, every moment counts. Heritage Restoration responds within 45 minutes to secure your property, mitigate damage, and guide you through complete restoration to modern standards.
              </p>
              <a href="tel:+13608511407" className="inline-flex items-center gap-2 bg-[#8DBD42] hover:bg-[#7BB843] text-white font-bold px-8 py-4 rounded transition-all duration-300">
                <Phone size={18} /> Emergency Hotline: +1(360)851-1407
              </a>
            </FadeUp>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <FadeUp className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#3F4143] mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Comprehensive Fire Restoration Services
              </h2>
              <p className="text-lg text-[#3F4143]/70 max-w-2xl">
                From emergency board-up to complete structural reconstruction, we handle every aspect of fire damage restoration with precision and care.
              </p>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Shield size={32} />,
                  title: "Emergency Board-Up & Shoring",
                  desc: "Immediate structural securing and tarping to prevent further damage from weather and intrusion."
                },
                {
                  icon: <Flame size={32} />,
                  title: "Soot & Smoke Mitigation",
                  desc: "HEPA air scrubbing, soot washing, encapsulation, and thermal deodorization to eliminate odors."
                },
                {
                  icon: <Clock size={32} />,
                  title: "3D Matterport Scanning",
                  desc: "Professional 3D documentation for insurance claims and detailed damage assessment."
                },
                {
                  icon: <CheckCircle size={32} />,
                  title: "Full Structural Rebuild",
                  desc: "Complete framing, drywall, flooring, cabinetry, and finish work to modern standards."
                }
              ].map((item, idx) => (
                <FadeUp key={idx} delay={idx * 0.1} className="bg-[#F5F7FA] rounded-lg p-8 hover:shadow-lg transition-all duration-300">
                  <div className="text-[#8DBD42] mb-4">{item.icon}</div>
                  <h3 className="font-bold text-[#3F4143] mb-3 text-lg">{item.title}</h3>
                  <p className="text-[#3F4143]/70 text-sm leading-relaxed">{item.desc}</p>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 md:py-32 bg-[#F5F7FA]">
          <div className="max-w-[1280px] mx-auto px-6">
            <FadeUp className="mb-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-[#3F4143] mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Our Fire Restoration Process
              </h2>
              <p className="text-lg text-[#3F4143]/70 max-w-2xl mx-auto">
                A proven methodology that minimizes disruption and maximizes recovery.
              </p>
            </FadeUp>

            <div className="space-y-6">
              {[
                { step: "1", title: "Emergency Response (45 min)", desc: "We arrive immediately to assess damage, board up windows, tarp the roof, and secure the structure." },
                { step: "2", title: "Damage Documentation", desc: "3D Matterport scans and detailed photos create comprehensive records for insurance claims." },
                { step: "3", title: "Mitigation & Dryout", desc: "Soot removal, smoke odor neutralization, and structural drying to prevent mold and further damage." },
                { step: "4", title: "Insurance Negotiation", desc: "We work directly with adjusters and provide detailed Xactimate estimates to secure full claim approval." },
                { step: "5", title: "Full Reconstruction", desc: "Professional framing, drywall, flooring, cabinetry, and finishing to exceed pre-fire condition." },
                { step: "6", title: "Final Inspection & Handover", desc: "Building code compliance verification and final walkthrough of your fully restored property." }
              ].map((item, idx) => (
                <FadeUp key={idx} delay={idx * 0.05} className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-full bg-[#8DBD42] text-white flex items-center justify-center font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#3F4143] text-lg mb-2">{item.title}</h3>
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
              <h2 className="text-3xl md:text-4xl font-bold text-[#3F4143] mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Why Choose Heritage Restoration
              </h2>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                "45-minute emergency response time, 24/7 availability",
                "IICRC certified restoration professionals",
                "Fully bonded and insured with comprehensive coverage",
                "Direct insurance company negotiation and advocacy",
                "Matterport 3D documentation for claims",
                "Xactimate detailed estimates and scope management",
                "5-year warranty on all restoration work",
                "Local expertise serving Washington State"
              ].map((item, idx) => (
                <FadeUp key={idx} delay={idx * 0.05} className="flex gap-4 items-start">
                  <CheckCircle size={24} className="text-[#8DBD42] flex-shrink-0 mt-1" />
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Need Fire Restoration Help?
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Contact us immediately for emergency response, free assessment, and insurance consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+13608511407" className="inline-flex items-center justify-center gap-2 bg-white text-[#3F4143] font-bold px-8 py-4 rounded hover:bg-[#F5F7FA] transition-all duration-300">
                  <Phone size={18} /> +1(360)851-1407
                </a>
                <a href="mailto:office@firewaterstorm.com" className="inline-flex items-center justify-center gap-2 bg-[#3F4143] text-white font-bold px-8 py-4 rounded hover:bg-[#2a2c2e] transition-all duration-300">
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
