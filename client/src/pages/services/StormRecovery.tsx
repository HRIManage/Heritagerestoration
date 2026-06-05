import { CloudLightning, Wind, Hammer, Shield, CheckCircle, Phone } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Link } from "wouter";
import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

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
      </Helmet>

      <div className="min-h-screen bg-brand-linen pt-[100px] lg:pt-[142px]">
        {/* Hero Section */}
        <section className="relative text-white overflow-hidden border-b border-[#8DBD42]/20 min-h-[380px] md:min-h-[480px]">
          {/* Full-bleed background photo */}
          <img
            src="/photo/storm-hero.jpg"
            alt="Tree fallen on house causing storm damage"
            className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.75]"
          />
          {/* Dark green wash â€” heavier on left, fades right */}
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
                  Storm Recovery
                </h1>
                <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-xl font-sans font-light">
                  Severe weather can devastate your property in minutes. Our rapid response team handles emergency tarping, debris cleanup, and complete structural reconstruction to restore your home.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Specialized Services - Staggered 2-Column Grid */}
        <Section bg="none">
          <Container size="narrow">
            <FadeIn className="mb-20 text-center" direction="up">
              <span className="overline-label">Our Capabilities</span>
              <h2 className="text-3xl md:text-4.5xl font-bold text-[#3F4143] mt-2 font-serif">
                Storm Damage Solutions
              </h2>
            </FadeIn>

            {/* Staggered grid (Desktop has offset spacing on right column) */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-x-16 items-start">
              {/* Left Column (No Offset) */}
              <div className="space-y-16">
                {[services[0], services[2]].map((item, idx) => (
                  <FadeIn
                    key={idx}
                    delay={idx * 0.15}
                    className="bg-white border border-[#3F4143]/8 shadow-[0_10px_30px_rgba(0,0,0,0.02)] rounded-none overflow-hidden"
                    direction="up"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-8 space-y-4">
                      <div className="text-[#8DBD42]">{item.icon}</div>
                      <h3 className="font-bold text-[#3F4143] text-xl font-serif">
                        {item.title}
                      </h3>
                      <p className="text-[#3F4143]/70 text-sm leading-relaxed font-sans">
                        {item.desc}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>

              {/* Right Column (Shifted Downwards on Desktop) */}
              <div className="space-y-16 lg:mt-16">
                {[services[1], services[3]].map((item, idx) => (
                  <FadeIn
                    key={idx}
                    delay={idx * 0.15 + 0.1}
                    className="bg-white border border-[#3F4143]/8 shadow-[0_10px_30px_rgba(0,0,0,0.02)] rounded-none overflow-hidden"
                    direction="up"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-8 space-y-4">
                      <div className="text-[#8DBD42]">{item.icon}</div>
                      <h3 className="font-bold text-[#3F4143] text-xl font-serif">
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

        {/* Process Section (Asymmetric Sticky Layout) */}
        <Section bg="white" className="border-t border-gray-100" id="process">
          <Container>
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column: Anchored/Sticky Header and Service Summary (40% width) */}
              <div className="lg:col-span-5 lg:sticky lg:top-32 self-start space-y-6">
                <FadeIn direction="up">
                  <span className="text-[#8DBD42] uppercase tracking-[0.25em] text-xs font-black block">
                    Our Restoration Roadmap
                  </span>
                  <h2 className="text-3xl md:text-5xl font-bold text-[#3F4143] mt-3 leading-tight font-serif">
                    Storm Recovery Process
                  </h2>
                  <p className="text-base md:text-lg text-[#3F4143]/75 leading-relaxed mt-6 font-sans font-light">
                    We guide you through every stage of property restoration. From securing the initial envelope breach to negotiating claims and structural rebuilding, our roadmap is designed to protect your interests and restore your peace of mind.
                  </p>
                </FadeIn>
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
                  <FadeIn
                    key={idx}
                    delay={idx * 0.05}
                    className="relative pl-16 py-4 bg-transparent border-b border-[#3F4143]/5 last:border-b-0"
                    direction="up"
                  >
                    {/* Floating green number on the left */}
                    <span className="absolute left-0 top-3 text-3xl font-bold text-[#8DBD42] font-serif leading-none">
                      {item.step}
                    </span>
                    <div className="space-y-2">
                      <h3 className="font-bold text-[#3F4143] text-xl font-serif">
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

        {/* Why Choose Us - Borderless Staggered Grid */}
        <Section bg="none" className="border-t border-gray-100">
          <Container>
            <FadeIn className="mb-16 text-center" direction="up">
              <span className="text-[#8DBD42] uppercase tracking-[0.2em] text-xs font-black block">
                OUR QUALIFICATIONS
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#3F4143] mt-3 font-serif">
                Why Choose Heritage for Storm Recovery
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-16 py-12">
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
                <FadeIn
                  key={idx}
                  delay={idx * 0.05}
                  className="space-y-3 bg-transparent border-t-2 border-[#8DBD42]/20 pt-6"
                  direction="up"
                >
                  <span className="text-xs font-mono font-bold text-[#8DBD42] tracking-wider block">
                    0{idx + 1}
                  </span>
                  <h3 className="font-bold text-[#3F4143] text-lg font-serif">{item.title}</h3>
                  <p className="text-[#3F4143]/70 text-sm leading-relaxed font-sans">{item.desc}</p>
                </FadeIn>
              ))}
            </div>
          </Container>
        </Section>

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
                  Your Storm Damage Recovery Experts
                </h2>
                <div className="text-sm md:text-base text-[#3F4143]/85 space-y-6 leading-relaxed max-w-3xl mx-auto font-sans font-light">
                  <p>
                    Fallen trees, severe wind, and heavy rainfall can breach your home's envelope in minutes. Our 24/7 emergency dispatch team is ready to secure your property with immediate roof tarping and window board-ups.
                  </p>
                  <p>
                    Once the storm settles, we work hand-in-hand with your insurance provider, compiling detailed Matterport records and rebuilding your home back to code compliance and modern safety standards.
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
        </section>
      </div>
    </Layout>
  );
}

