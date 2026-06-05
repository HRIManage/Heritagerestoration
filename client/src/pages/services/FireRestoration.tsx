import { Flame, Shield, Clock, CheckCircle, Phone } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Link } from "wouter";
import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

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

      <div className="min-h-screen bg-brand-linen pt-[142px]">
        {/* Hero Section */}
        <section className="relative text-white overflow-hidden border-b border-[#8DBD42]/20 min-h-[380px] md:min-h-[480px]">
          {/* Full-bleed background photo */}
          <img
            src="/photo/Monnett Fire Before.jpg"
            alt="Fire damage restoration scene"
            className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.75]"
          />
          {/* Dark green wash — heavier on left, fades right */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(14,27,17,0.92) 0%, rgba(20,38,24,0.70) 30%, rgba(20,38,24,0.25) 55%, rgba(14,27,17,0.05) 100%)' }} />
          {/* Bottom vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1B11]/40 via-transparent to-transparent" />

          <div className="relative z-10 grid lg:grid-cols-12 min-h-[380px] md:min-h-[480px]">
            <div className="lg:col-span-7 flex flex-col justify-center px-6 py-16 md:py-24 max-w-[720px] mx-auto lg:mx-0 lg:pl-16">
              <FadeIn className="space-y-6" direction="up">
                <span className="text-[#8DBD42] uppercase tracking-[0.25em] text-xs font-black flex items-center gap-2">
                  <span className="w-6 h-[2px] bg-[#8DBD42]" /> Emergency Service
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-serif">
                  Fire Restoration
                </h1>
                <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-xl font-sans font-light">
                  When fire strikes, every moment counts. Heritage Restoration responds immediately to secure your property, mitigate soot damage, and guide you through complete reconstruction to modern standards.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Specialized Services — Staggered, Non-Traditional Grid */}
        <Section bg="none">
          <Container>
            <FadeIn className="mb-20 text-center" direction="up">
              <span className="overline-label">Our Capabilities</span>
              <h2 className="text-3xl md:text-4.5xl font-bold text-[#3F4143] mt-2 font-serif">
                Specialized Fire Services
              </h2>
            </FadeIn>

            <div className="space-y-16">
              {/* Featured Asymmetric Top Service */}
              <FadeIn className="bg-white border border-[#3F4143]/8 grid lg:grid-cols-12 gap-0 items-stretch rounded-none shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_16px_35px_rgba(0,0,0,0.04)] transition-all duration-300" direction="up">
                <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-auto">
                  <img src={services[0].img} alt={services[0].title} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center space-y-4">
                  <div className="text-[#8DBD42]">{services[0].icon}</div>
                  <span className="text-[#8DBD42] uppercase tracking-[0.2em] text-[10px] font-bold">Featured Specialty</span>
                  <h3 className="font-bold text-[#3F4143] text-2xl md:text-3xl font-serif">
                    {services[0].title}
                  </h3>
                  <p className="text-[#3F4143]/70 text-sm leading-relaxed font-sans">
                    {services[0].desc}
                  </p>
                </div>
              </FadeIn>

              {/* Staggered Column Splitting */}
              <div className="grid md:grid-cols-2 gap-10">
                {services.slice(1).map((item, idx) => (
                  <FadeIn
                    key={idx}
                    delay={idx * 0.1}
                    className="bg-white p-8 border border-[#3F4143]/8 flex flex-col justify-between rounded-none shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_16px_35px_rgba(0,0,0,0.04)] transition-all duration-300"
                    direction="up"
                  >
                    <div className="space-y-5">
                      <div className="relative h-[220px] overflow-hidden mb-6 rounded-none border border-gray-100 shadow-sm">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="text-[#8DBD42]">{item.icon}</div>
                      <h3 className="font-bold text-[#3F4143] text-xl md:text-2xl font-serif">
                        {item.title}
                      </h3>
                      <p className="text-[#3F4143]/70 text-sm leading-relaxed font-sans">
                        {item.desc}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* Process Timeline Section (Bespoke Borderless Steps) */}
        <Section bg="white" className="border-t border-gray-100">
          <Container>
            <FadeIn className="mb-20 text-center" direction="up">
              <span className="overline-label">The Journey</span>
              <h2 className="text-3xl md:text-4.5xl font-bold text-[#3F4143] mt-2 font-serif">
                Our Restoration Steps
              </h2>
            </FadeIn>

            <div className="relative max-w-4xl mx-auto pl-8 md:pl-0">
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
                  <FadeIn
                    key={idx}
                    delay={idx * 0.05}
                    className={`relative grid md:grid-cols-2 gap-8 md:gap-16 ${idx % 2 !== 0 ? "md:text-right" : ""}`}
                    direction="up"
                  >
                    {/* Circle Node */}
                    <div className="absolute left-[-41px] md:left-1/2 md:translate-x-[-16px] top-1 w-8 h-8 rounded-none bg-white border border-[#8DBD42] text-[#8DBD42] flex items-center justify-center font-bold text-xs shadow-sm z-10 font-serif">
                      {item.step}
                    </div>
                    
                    {/* Content Column */}
                    <div className={`${idx % 2 !== 0 ? "md:col-start-1" : "md:col-start-2"}`}>
                      <h3 className="font-bold text-[#3F4143] text-lg mb-2 font-serif">
                        {item.title}
                      </h3>
                      <p className="text-[#3F4143]/70 text-sm leading-relaxed font-sans">
                        {item.desc}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* Why Choose Us & Stats Block */}
        <Section bg="none" className="border-t border-gray-100">
          <Container>
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Checklist Column */}
              <div className="lg:col-span-7 space-y-10">
                <FadeIn direction="up">
                  <span className="overline-label">Our Standards</span>
                  <h2 className="text-3xl md:text-4.5xl font-bold text-[#3F4143] mt-2 font-serif">
                    Why Choose Heritage Restoration
                  </h2>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
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
                      <p className="text-[#3F4143] font-bold text-base leading-snug">{item}</p>
                    </FadeIn>
                  ))}
                </div>
              </div>

              {/* Stats Grid Column */}
              <div className="lg:col-span-5">
                <FadeIn className="bg-[#3F4143] text-white p-8 shadow-[0_15px_30px_rgba(0,0,0,0.06)] grid grid-cols-2 gap-6 relative overflow-hidden rounded-none" direction="up">
                  <div className="absolute right-[-40px] bottom-[-40px] w-48 h-48 bg-[#8DBD42]/10 rounded-full blur-2xl pointer-events-none" />
                  {[
                    { val: "60m", lbl: "Response Time" },
                    { val: "24/7", lbl: "Emergency Dispatch" },
                    { val: "5yr", lbl: "Work Warranty" },
                    { val: "100%", lbl: "Bonded & Insured" }
                  ].map((stat, idx) => (
                    <div key={idx} className="space-y-2 p-5 bg-white/5 border border-white/10 hover:border-[#8DBD42]/30 transition-colors rounded-none">
                      <div className="text-3xl md:text-4xl font-bold text-[#8DBD42] font-serif">{stat.val}</div>
                      <div className="text-[10px] text-white/60 uppercase tracking-widest font-semibold">{stat.lbl}</div>
                    </div>
                  ))}
                </FadeIn>
              </div>
            </div>
          </Container>
        </Section>

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
            <div className="absolute inset-0 bg-black/40" />

            {/* Diagonal graphic stripes on the right */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block overflow-hidden pointer-events-none">
              <div className="absolute right-[-100px] top-[-100px] w-[180px] h-[600px] bg-[#3F4143] transform rotate-[35deg] opacity-95 shadow-2xl" />
              <div className="absolute right-[100px] top-[-100px] w-[80px] h-[600px] bg-[#8DBD42] transform rotate-[35deg] opacity-80" />
              <div className="absolute right-[200px] top-[-100px] w-[40px] h-[600px] bg-[#7BB843] transform rotate-[35deg] opacity-65" />
            </div>
          </div>

          {/* Centered Overlapping Card Container */}
          <div className="relative max-w-[960px] mx-auto px-6 pt-[180px] md:pt-[240px] z-10">
            <FadeIn direction="up">
              <div className="bg-white border border-[#3F4143]/10 p-8 md:p-12 shadow-[0_24px_50px_rgba(0,0,0,0.06)] text-center rounded-none">
                <h2 className="text-2xl md:text-3.5xl font-bold text-[#3F4143] mb-6 font-serif">
                  Your Fire Damage Restoration Experts
                </h2>
                <div className="text-sm md:text-base text-[#3F4143]/85 space-y-6 leading-relaxed max-w-3xl mx-auto font-sans font-light">
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
                    What do I need to know?
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
