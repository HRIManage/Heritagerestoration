import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  CloudLightning,
  Wind,
  Hammer,
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

export default function StormRecovery() {
  return (
    <Layout>
      <Helmet>
        <title>Storm Damage Recovery | Heritage Restoration</title>
        <meta
          name="description"
          content="Emergency storm damage recovery and wind damage restoration. Roof tarping, tree removal, and structural repair in Washington."
        />
        <meta
          property="og:title"
          content="Storm Damage Recovery | Heritage Restoration"
        />
        <meta
          property="og:description"
          content="Professional storm damage recovery with emergency roof tarping and structural repairs."
        />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Heritage Restoration - Storm Recovery",
            description:
              "Professional storm damage recovery and wind damage restoration",
            telephone: "+1-360-851-1407",
            email: "office@firewaterstorm.com",
            areaServed: "WA",
            serviceType: "Storm Damage Recovery",
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white pt-[142px]">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-r from-[#3F4143] to-[#2a2c2e] text-white overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-6">
            <FadeUp className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <CloudLightning size={32} className="text-[#8DBD42]" />
                <span className="text-[#8DBD42] font-bold text-sm uppercase tracking-widest">
                  Our Expertise
                </span>
              </div>
              <h1
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Storm Damage Recovery & Restoration
              </h1>
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                Severe weather can devastate your property in minutes. Our rapid
                response team handles emergency tarping, debris cleanup, and
                complete structural reconstruction to restore your home.
              </p>
              <a
                href="tel:+13608511407"
                className="inline-flex items-center gap-2 bg-[#8DBD42] hover:bg-[#7BB843] text-white font-bold px-8 py-4 rounded transition-all duration-300"
              >
                <Phone size={18} /> Emergency Response: +1(360)851-1407
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
                Complete Storm Damage Solutions
              </h2>
              <p className="text-lg text-[#3F4143]/70 max-w-2xl">
                From emergency roof tarping to complete structural
                reconstruction, we restore your property quickly and
                professionally.
              </p>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Wind size={32} />,
                  title: "Emergency Roof Tarping",
                  desc: "Immediate roof coverage to prevent water intrusion and further weather damage.",
                },
                {
                  icon: <Hammer size={32} />,
                  title: "Debris Removal & Cleanup",
                  desc: "Professional removal of fallen trees, branches, and debris from your property.",
                },
                {
                  icon: <CloudLightning size={32} />,
                  title: "Window & Door Board-Ups",
                  desc: "Secure boarding of damaged windows and doors to protect your home from intrusion.",
                },
                {
                  icon: <CheckCircle size={32} />,
                  title: "Structural Reconstruction",
                  desc: "Complete repair or replacement of roofing, siding, framing, and structural elements.",
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
                Storm Recovery Process
              </h2>
              <p className="text-lg text-[#3F4143]/70 max-w-2xl mx-auto">
                Systematic approach to emergency response and complete
                restoration.
              </p>
            </FadeUp>

            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Emergency Dispatch",
                  desc: "Immediate response to secure your property and assess damage extent.",
                },
                {
                  step: "2",
                  title: "Roof Tarping & Board-Ups",
                  desc: "Emergency tarping and boarding to prevent water intrusion and further damage.",
                },
                {
                  step: "3",
                  title: "Debris Removal",
                  desc: "Professional cleanup of fallen trees, branches, and storm debris.",
                },
                {
                  step: "4",
                  title: "Damage Documentation",
                  desc: "Detailed photos and assessment for insurance claims and scope of work.",
                },
                {
                  step: "5",
                  title: "Structural Repair",
                  desc: "Complete repair or replacement of roofing, siding, windows, and framing.",
                },
                {
                  step: "6",
                  title: "Final Inspection",
                  desc: "Building code compliance verification and final walkthrough.",
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
                Why Choose Heritage for Storm Recovery
              </h2>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                "Rapid emergency response with equipment ready",
                "Professional tree removal and debris cleanup",
                "Emergency roof tarping and board-ups",
                "Complete structural repair and reconstruction",
                "Direct insurance company coordination",
                "Detailed damage documentation for claims",
                "Building code compliance expertise",
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
                Storm Damage? We're Here to Help
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Call immediately for emergency tarping, debris removal, and
                storm damage restoration.
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
