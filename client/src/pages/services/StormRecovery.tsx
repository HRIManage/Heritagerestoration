import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  CloudLightning,
  Wind,
  Hammer,
  Shield,
  CheckCircle,
  Phone,
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

export default function StormRecovery() {
  const services = [
    {
      icon: <Wind size={32} />,
      title: "Emergency Roof Tarping",
      desc: "Immediate heavy-duty tarping to seal damaged roofing structure, prevent active water entry, and protect your home contents from storm secondary impacts.",
      img: "/photo/hero-tarp.jpg"
    },
    {
      icon: <Hammer size={32} />,
      title: "Debris Removal & Cleanup",
      desc: "Safe extraction of fallen trees, blocking limbs, structural debris, and windblown hazards from building envelopes and property yards.",
      img: "/photo/storm-debris-cleanup.jpg"
    },
    {
      icon: <Shield size={32} />,
      title: "Window & Door Board-Ups",
      desc: "Secure structural board-up of breached windows, sliding glass sliders, and garage entries to prevent vandalism and atmospheric damage.",
      img: "/photo/who-we-are.jpg"
    },
    {
      icon: <CheckCircle size={32} />,
      title: "Structural Reconstruction",
      desc: "Complete carpentry rebuild, roofing shingles installation, siding recovery, and interior structural finishing to pre-loss building codes.",
      img: "/photo/storm-structural-rebuilding.jpg"
    },
  ];

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
            telephone: "+1-360-345-1015",
            email: "office@firewaterstorm.com",
            areaServed: "WA",
            serviceType: "Storm Damage Recovery",
          })}
        </script>
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
                  Storm Recovery
                </h1>
                <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-xl">
                  Severe weather can devastate your property in minutes. Our rapid response team handles emergency tarping, debris cleanup, and complete structural reconstruction to restore your home.
                </p>
              </FadeUp>
            </div>
            
            {/* Right Photo Column - Asymmetrical Crop */}
            <div className="lg:col-span-5 relative h-[250px] lg:h-auto overflow-hidden">
              <img
                src="/photo/storm-hero.jpg"
                alt="Tree fallen on house causing storm damage"
                className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.75]"
              />
              <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-[#292b2d] to-transparent hidden lg:block" />
              <div className="absolute inset-0 bg-[#292b2d]/10" />
            </div>
          </div>
        </section>

        {/* Specialized Services - Staggered 2-Column Grid */}
        <section className="py-20 md:py-32 bg-transparent">
          <div className="max-w-[1100px] mx-auto px-6">
            <FadeUp className="mb-16 text-center">
              <h2
                className="text-3xl md:text-4xl font-bold text-[#3F4143] mb-6"
                style={{ fontFamily: "'Libre Caslon Text', serif" }}
              >
                Complete Storm Damage Solutions
              </h2>
            </FadeUp>

            {/* Staggered grid (Desktop has offset spacing on right column) */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-x-16 items-start">
              {/* Left Column (No Offset) */}
              <div className="space-y-16">
                {[services[0], services[2]].map((item, idx) => (
                  <FadeUp
                    key={idx}
                    delay={idx * 0.15}
                    className="bg-white rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-[#3F4143]/5"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-8 space-y-4">
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

              {/* Right Column (Shifted Downwards on Desktop) */}
              <div className="space-y-16 lg:mt-16">
                {[services[1], services[3]].map((item, idx) => (
                  <FadeUp
                    key={idx}
                    delay={idx * 0.15 + 0.1}
                    className="bg-white rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-[#3F4143]/5"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-8 space-y-4">
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

        {/* Typographical Process Section (Asymmetric Sticky Layout) */}
        <section className="py-24 md:py-36 bg-transparent border-t border-[#3F4143]/5" id="process">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column: Anchored/Sticky Header and Service Summary (40% width) */}
              <div className="lg:col-span-5 lg:sticky lg:top-32 self-start space-y-6">
                <FadeUp>
                  <span className="text-[#8DBD42] uppercase tracking-[0.25em] text-xs font-black block">
                    Our Restoration Roadmap
                  </span>
                  <h2
                    className="text-3xl md:text-5xl font-bold text-[#3F4143] mt-3 leading-tight"
                    style={{ fontFamily: "'Libre Caslon Text', serif" }}
                  >
                    Storm Recovery Process
                  </h2>
                  <p 
                    className="text-base md:text-lg text-[#3F4143]/75 leading-relaxed mt-6"
                    style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                  >
                    We guide you through every stage of property restoration. From securing the initial envelope breach to negotiating claims and structural rebuilding, our roadmap is designed to protect your interests and restore your peace of mind.
                  </p>
                </FadeUp>
              </div>

              {/* Right Column: Step-by-step restoration procedures (60% width) */}
              <div className="lg:col-span-7 space-y-12">
                {[
                  {
                    step: "01",
                    title: "Emergency Dispatch",
                    desc: "Immediate response to secure your property, assess active hazards, and document damage severity.",
                  },
                  {
                    step: "02",
                    title: "Roof Tarping & Board-Ups",
                    desc: "Emergency heavy tarping and window/door board-ups to seal structural breaches and prevent secondary water damage.",
                  },
                  {
                    step: "03",
                    title: "Debris Removal",
                    desc: "Safe, professional extraction of fallen trees, limbs, windblown hazards, and compromised building materials.",
                  },
                  {
                    step: "04",
                    title: "Damage Documentation",
                    desc: "Rigorous 3D Matterport scans, high-resolution photo logs, and itemized content inventory for insurance transparency.",
                  },
                  {
                    step: "05",
                    title: "Structural Repair",
                    desc: "Complete rebuild of framing, roofing shingles, structural siding, and interior finishes to modern building codes.",
                  },
                  {
                    step: "06",
                    title: "Final Inspection",
                    desc: "Comprehensive quality control checks, municipal code compliance sign-offs, and client handover walkthrough.",
                  },
                ].map((item, idx) => (
                  <FadeUp
                    key={idx}
                    delay={idx * 0.05}
                    className="relative pl-16 py-4 bg-transparent border-b border-[#3F4143]/5 last:border-b-0"
                  >
                    {/* Floating Brand green number on the left */}
                    <span className="absolute left-0 top-3 text-3xl font-extrabold text-[#8DBD42] font-mono leading-none">
                      {item.step}
                    </span>
                    <div className="space-y-2">
                      <h3 className="font-bold text-[#3F4143] text-xl" style={{ fontFamily: "'Libre Caslon Text', serif" }}>
                        {item.title}
                      </h3>
                      <p className="text-[#3F4143]/70 text-sm leading-relaxed" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                        {item.desc}
                      </p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us - Typographic Grid (Borderless 3-Column Grid) */}
        <section className="py-24 md:py-36 bg-transparent border-t border-[#3F4143]/5">
          <div className="max-w-[1280px] mx-auto px-6">
            <FadeUp className="mb-16 text-center">
              <span className="text-[#8DBD42] uppercase tracking-[0.2em] text-xs font-black block">
                OUR QUALIFICATIONS
              </span>
              <h2
                className="text-3xl md:text-5xl font-bold text-[#3F4143] mt-3"
                style={{ fontFamily: "'Libre Caslon Text', serif" }}
              >
                Why Choose Heritage for Storm Recovery
              </h2>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-16 py-16">
              {[
                { title: "Rapid Response", desc: "Rapid emergency response with equipment and specialists ready to deploy 24/7." },
                { title: "Tree & Debris Extraction", desc: "Professional extraction of fallen trees, limbs, and compromised structural elements." },
                { title: "Property Protection", desc: "Heavy emergency roof tarping and window security board-ups to seal your home." },
                { title: "Structural Rebuild", desc: "Complete structural repair, framing, siding, and roofing restoration back to code." },
                { title: "Insurance Coordination", desc: "Direct coordination with insurance adjusters to ensure claim accuracy." },
                { title: "Detailed Claim Records", desc: "Rigorous 3D Matterport scans, photo documentation, and Xactimate line-item estimates." },
                { title: "Code Compliance", desc: "Professional engineering compliance, building permit management, and structural sign-offs." },
                { title: "Warranty Guarantee", desc: "5-year comprehensive warranty on all structural restoration work." },
                { title: "Local Presence", desc: "Serving Western Washington from our North and South offices in Lacey and Chehalis." },
              ].map((item, idx) => (
                <FadeUp
                  key={idx}
                  delay={idx * 0.05}
                  className="space-y-3 bg-transparent border-t-2 border-[#8DBD42]/20 pt-6"
                >
                  <span className="text-xs font-mono font-bold text-[#8DBD42] tracking-wider block">
                    0{idx + 1}
                  </span>
                  <h3 className="font-bold text-[#3F4143] text-lg" style={{ fontFamily: "'Libre Caslon Text', serif" }}>{item.title}</h3>
                  <p className="text-[#3F4143]/70 text-sm leading-relaxed" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>{item.desc}</p>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative bg-white pt-24 pb-36 overflow-hidden">
          {/* Background image banner */}
          <div className="absolute top-0 left-0 w-full h-[320px] md:h-[400px]">
            <img
              src="/photo/storm-cta-banner.jpg"
              alt="Reconstructed home storm damage recovery Washington"
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
                  Your Storm Damage Recovery Experts
                </h2>
                <div
                  className="text-sm md:text-base text-[#3F4143]/85 space-y-6 leading-relaxed max-w-3xl mx-auto"
                  style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                >
                  <p>
                    Fallen trees, severe wind, and heavy rainfall can breach your home's envelope in minutes. Our 24/7 emergency dispatch team is ready to secure your property with immediate roof tarping and window board-ups.
                  </p>
                  <p>
                    Once the storm settles, we work hand-in-hand with your insurance provider, compiling detailed Matterport records and rebuilding your home back to code compliance and modern safety standards.
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
                    className="bg-[#3F4143] hover:bg-[#292b2d] text-[#ffffff] font-bold px-8 py-4 uppercase tracking-[0.14em] text-xs transition-colors shadow-md"
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
