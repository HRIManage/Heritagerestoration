import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Flame, Shield, Clock, CheckCircle, Phone } from "lucide-react";
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

export default function FireRestoration() {
  const services = [
    {
      icon: <Flame size={32} />,
      title: "Soot & Smoke Remediation",
      desc: "Advanced soot extraction, thermal fogging, and smoke odor neutralization to restore indoor air quality. We deploy specialized HEPA air scrubbers and hydroxyl generators to permanently neutralize smoke particles embedded in framing, finishes, and HVAC ducts.",
      img: "/photo/Photo Jul 06 2024, 08 57 29.jpg"
    },
    {
      icon: <Clock size={32} />,
      title: "Structural Cleaning & Debris",
      desc: "Removal of fire debris, securing structural integrity, and cleaning soot from all surfaces using eco-friendly carbon blasting and dry chemical sponge extraction.",
      img: "/photo/fire-structural-cleaning.png"
    },
    {
      icon: <Shield size={32} />,
      title: "Full Structural Rebuild",
      desc: "Complete framing, drywall, flooring, custom cabinetry, and finish work to modern building codes. We handle the process from structural engineering approvals to final occupancy permits.",
      img: "/photo/fire-structural-rebuild.jpg"
    },
  ];

  return (
    <Layout>
      <Helmet>
        <title>Fire Damage Restoration | Heritage Restoration</title>
        <meta
          name="description"
          content="Professional 24/7 fire damage restoration, soot cleaning, and smoke odor removal services in Washington State. Direct insurance coordination."
        />
      </Helmet>

      <div className="min-h-screen bg-canvas-textured pt-[142px]">
        {/* Hero Section */}
        <section className="relative bg-[#292b2d] text-white overflow-hidden border-b border-[#8DBD42]/20">
          <div className="grid lg:grid-cols-12 min-h-[380px] md:min-h-[480px]">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center px-6 py-16 md:py-24 max-w-[720px] mx-auto lg:mx-0 lg:pl-16 relative z-10">
              <FadeUp className="space-y-6">
                <span className="text-[#8DBD42] uppercase tracking-[0.2em] text-xs font-black flex items-center gap-2">
                  <span className="w-6 h-[2px] bg-[#8DBD42]" /> Emergency Service
                </span>
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                  style={{ fontFamily: "'Libre Caslon Text', serif" }}
                >
                  Fire Restoration
                </h1>
                <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-xl">
                  When fire strikes, every moment counts. Heritage Restoration responds immediately to secure your property, mitigate soot damage, and guide you through complete reconstruction to modern standards.
                </p>
              </FadeUp>
            </div>
            
            {/* Right Photo Column - Asymmetrical Crop */}
            <div className="lg:col-span-5 relative h-[250px] lg:h-auto overflow-hidden">
              <img
                src="/photo/Monnett Fire Before.jpg"
                alt="Fire damage restoration scene"
                className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.7]"
              />
              <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-[#292b2d] to-transparent hidden lg:block" />
              <div className="absolute inset-0 bg-[#292b2d]/10" />
            </div>
          </div>
        </section>

        {/* Specialized Services - Hot Highlight Featured Layout */}
        <section className="py-20 md:py-32 bg-transparent">
          <div className="max-w-[1280px] mx-auto px-6">
            <FadeUp className="mb-16 text-center">
              <h2
                className="text-3xl md:text-4xl font-bold text-[#3F4143] mb-6"
                style={{ fontFamily: "'Libre Caslon Text', serif" }}
              >
                Our Specialized Services
              </h2>
            </FadeUp>

            <div className="space-y-16">
              {/* Featured Full-Width Top Service */}
              <FadeUp className="bg-white rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.03)] border border-[#3F4143]/5 grid lg:grid-cols-12 gap-0 items-stretch">
                <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-auto">
                  <img src={services[0].img} alt={services[0].title} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="lg:col-span-6 p-8 md:p-12 flex flex-col justify-center space-y-4">
                  <div className="text-[#8DBD42]">{services[0].icon}</div>
                  <span className="text-[#8DBD42] uppercase tracking-[0.15em] text-xs font-bold">Featured Specialty</span>
                  <h3 className="font-bold text-[#3F4143] text-2xl md:text-3xl" style={{ fontFamily: "'Libre Caslon Text', serif" }}>
                    {services[0].title}
                  </h3>
                  <p className="text-[#3F4143]/70 text-base leading-relaxed">
                    {services[0].desc}
                  </p>
                </div>
              </FadeUp>

              {/* Stacked Sub-Columns */}
              <div className="grid md:grid-cols-2 gap-8">
                {services.slice(1).map((item, idx) => (
                  <FadeUp
                    key={idx}
                    delay={idx * 0.1}
                    className="bg-white rounded-2xl p-8 shadow-[0_10px_25px_rgba(0,0,0,0.02)] border-b-4 border-b-[#8DBD42]/20 border border-[#3F4143]/5 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="relative h-[200px] rounded-xl overflow-hidden mb-6 shadow-sm">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="text-[#8DBD42]">{item.icon}</div>
                      <h3 className="font-bold text-[#3F4143] text-xl" style={{ fontFamily: "'Libre Caslon Text', serif" }}>
                        {item.title}
                      </h3>
                      <p className="text-[#3F4143]/70 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process Winding Timeline Section */}
        <section className="py-20 md:py-32 bg-transparent">
          <div className="max-w-[1280px] mx-auto px-6">
            <FadeUp className="mb-20 text-center">
              <h2
                className="text-3xl md:text-4xl font-bold text-[#3F4143] mb-6"
                style={{ fontFamily: "'Libre Caslon Text', serif" }}
              >
                Our Fire Restoration Process
              </h2>
            </FadeUp>

            <div className="relative max-w-4xl mx-auto pl-8 md:pl-0">
              {/* Central vertical line */}
              <div className="absolute top-0 bottom-0 left-0 md:left-1/2 w-[2px] bg-[#8DBD42]/20" />
              
              <div className="space-y-16">
                {[
                  {
                    step: "1",
                    title: "Emergency Response (60 mins)",
                    desc: "We arrive immediately to assess damage, board up windows, tarp the roof, and secure the structure.",
                  },
                  {
                    step: "2",
                    title: "Damage Documentation",
                    desc: "3D Matterport scans and detailed photos create comprehensive records for insurance claims.",
                  },
                  {
                    step: "3",
                    title: "Mitigation & Dryout",
                    desc: "Soot removal, smoke odor neutralization, and structural drying to prevent mold and further damage.",
                  },
                  {
                    step: "4",
                    title: "Insurance Negotiation",
                    desc: "We work directly with adjusters and provide detailed Xactimate estimates to secure full claim approval.",
                  },
                  {
                    step: "5",
                    title: "Full Reconstruction",
                    desc: "Professional framing, drywall, flooring, cabinetry, and finishing to exceed pre-fire condition.",
                  },
                  {
                    step: "6",
                    title: "Final Inspection & Handover",
                    desc: "Building code compliance verification and final walkthrough of your fully restored property.",
                  },
                ].map((item, idx) => (
                  <FadeUp
                    key={idx}
                    delay={idx * 0.05}
                    className={`relative grid md:grid-cols-2 gap-8 md:gap-16 ${idx % 2 !== 0 ? "md:text-right" : ""}`}
                  >
                    {/* Circle Node */}
                    <div className="absolute left-[-41px] md:left-1/2 md:translate-x-[-16px] top-1 w-8 h-8 rounded-full bg-white border-2 border-[#8DBD42] text-[#8DBD42] flex items-center justify-center font-bold text-xs shadow-sm z-10">
                      {item.step}
                    </div>
                    
                    {/* Content Column */}
                    <div className={`${idx % 2 !== 0 ? "md:col-start-1" : "md:col-start-2"}`}>
                      <h3 className="font-bold text-[#3F4143] text-lg mb-2">
                        {item.title}
                      </h3>
                      <p className="text-[#3F4143]/70 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us & Stats Block */}
        <section className="py-20 md:py-32 bg-transparent">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Checklist Column */}
              <div className="lg:col-span-7 space-y-12">
                <FadeUp>
                  <h2
                    className="text-3xl md:text-4xl font-bold text-[#3F4143]"
                    style={{ fontFamily: "'Libre Caslon Text', serif" }}
                  >
                    Why Choose Heritage Restoration
                  </h2>
                </FadeUp>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    "60-minute emergency response time, 24/7 availability",
                    "IICRC certified restoration professionals",
                    "Fully bonded and insured with comprehensive coverage",
                    "Direct insurance company negotiation and advocacy",
                    "Matterport 3D documentation for claims",
                    "Xactimate detailed estimates and scope management",
                    "5-year warranty on all restoration work",
                    "Local expertise serving Washington State",
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
                      <p className="text-[#3F4143] font-bold text-base">{item}</p>
                    </FadeUp>
                  ))}
                </div>
              </div>

              {/* Stats Grid Column */}
              <div className="lg:col-span-5">
                <FadeUp className="bg-[#3F4143] text-white rounded-2xl p-8 shadow-[0_15px_30px_rgba(0,0,0,0.06)] grid grid-cols-2 gap-6 relative overflow-hidden">
                  <div className="absolute right-[-40px] bottom-[-40px] w-48 h-48 bg-[#8DBD42]/10 rounded-full blur-2xl pointer-events-none" />
                  {[
                    { val: "60m", lbl: "Response Time" },
                    { val: "24/7", lbl: "Emergency Dispatch" },
                    { val: "5yr", lbl: "Work Warranty" },
                    { val: "100%", lbl: "Bonded & Insured" }
                  ].map((stat, idx) => (
                    <div key={idx} className="space-y-2 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-[#8DBD42]/30 transition-colors">
                      <div className="text-3xl md:text-4xl font-bold text-[#8DBD42]" style={{ fontFamily: "'Libre Caslon Text', serif" }}>{stat.val}</div>
                      <div className="text-xs text-white/70 uppercase tracking-wider font-semibold">{stat.lbl}</div>
                    </div>
                  ))}
                </FadeUp>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative bg-white pt-24 pb-36 overflow-hidden">
          {/* Background image banner */}
          <div className="absolute top-0 left-0 w-full h-[320px] md:h-[400px]">
            <img
              src="/photo/fire-cta-banner-new.png"
              alt="Reconstructed home fire damage restoration Washington"
              className="w-full h-full object-cover object-center brightness-75"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/35" />

            {/* Diagonal graphic stripes on the right */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block overflow-hidden pointer-events-none">
              <div className="absolute right-[-100px] top-[-100px] w-[180px] h-[600px] bg-[#3F4143] transform rotate-[35deg] opacity-90 shadow-2xl" />
              <div className="absolute right-[100px] top-[-100px] w-[80px] h-[600px] bg-[#8DBD42] transform rotate-[35deg] opacity-75" />
              <div className="absolute right-[200px] top-[-100px] w-[40px] h-[600px] bg-[#7BB843] transform rotate-[35deg] opacity-60" />
            </div>
          </div>

          {/* Centered Overlapping Card Container */}
          <div className="relative max-w-[960px] mx-auto px-6 pt-[180px] md:pt-[240px] z-10">
            <FadeUp>
              <div className="bg-white border border-[#3F4143]/10 rounded-2xl p-8 md:p-12 shadow-[0_24px_50px_rgba(0,0,0,0.08)] text-center">
                <h2
                  className="text-2xl md:text-3xl font-bold text-[#3F4143] mb-6"
                  style={{ fontFamily: "'Libre Caslon Text', serif" }}
                >
                  Your Fire Damage Restoration Experts
                </h2>
                <div
                  className="text-sm md:text-base text-[#3F4143]/85 space-y-6 leading-relaxed max-w-3xl mx-auto"
                  style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                >
                  <p>
                    We understand the profound challenges and emotional toll
                    that arise in the aftermath of a fire disaster. Your world
                    has been turned upside down, with physical loss merging with
                    emotional and mental upheaval. Amidst this turmoil, the
                    intricacies of insurance claims and restoration can seem
                    like yet another mountain to climb.
                  </p>
                  <p>
                    We're here to make sure you don't face this climb alone. Rather than positioning ourselves in opposition to insurance companies, we believe in collaboration. We work together with your insurance provider, approaching every situation with meticulous documentation and the utmost professionalism to ensure a seamless restoration process.
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
                    What do I need to know?
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
