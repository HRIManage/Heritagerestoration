import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { useState, useRef } from "react";
import { Phone } from "lucide-react";
import { motion, useInView } from "framer-motion";

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

const projects = [
  {
    title: "Residential Fire Reconstruction",
    location: "Lacey, WA",
    type: "Fire Restoration",
    before: "/photo/Fisher before.jpg",
    after: "/photo/Fisher after.jpg",
    desc: "Complete structural rebuild following a major residential fire. Included full framing, roofing, and high-end interior finishing.",
  },
  {
    title: "Residential Water Mitigation & Rebuild",
    location: "Auburn, WA",
    type: "Water Restoration",
    before: "/photo/Hill Before.jpg",
    after: "/photo/Hill After.jpg",
    desc: "Complete kitchen water mitigation and structural reconstruction following a major pipe burst. Included full cabinetry and drywall repairs.",
  },
  {
    title: "Storm Damage Recovery",
    location: "Olympia, WA",
    type: "Storm Recovery",
    before: "/photo/storm-project-before.jpg",
    after: "/photo/storm-project-after.jpg",
    desc: "Structural repairs, emergency roof tarping, and ceiling reconstruction after a severe storm caused tree-fall damage.",
  },
];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const categories = [
    "All",
    "Fire Restoration",
    "Water Restoration",
    "Storm Recovery",
  ];

  const filteredProjects =
    filter === "All" ? projects : projects.filter(p => p.type === filter);

  return (
    <Layout>
      <Helmet>
        <title>Our Projects | Heritage Restoration</title>
        <meta
          name="description"
          content="View our portfolio of fire, water, and storm damage restoration projects across Washington State."
        />
      </Helmet>

      <div className="min-h-screen bg-canvas-textured pt-[142px]">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 bg-[#3F4143] text-white overflow-hidden">
          <img
            src="/photo/recent-project-3.jpg"
            alt="Completed kitchen restoration project background"
            className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.35]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#292b2d]/90 via-[#292b2d]/60 to-[#292b2d]/30" />
          <div className="max-w-[1280px] mx-auto px-6 relative z-10">
            <FadeUp className="max-w-2xl">
              <h1
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ fontFamily: "'Libre Caslon Text', serif" }}
              >
                Our <span className="text-[#8DBD42]">Projects</span>
              </h1>
              <p className="text-lg text-white/90 leading-relaxed">
                Real results for real homeowners. See how we transform disaster
                into restoration.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* Filters & Projects Section */}
        <section className="py-20 md:py-32 bg-transparent">
          <div className="max-w-[1280px] mx-auto px-6">
            {/* Filters */}
            <FadeUp className="flex flex-wrap justify-center gap-4 mb-16">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest transition-all hover:scale-[1.03] cursor-pointer ${filter === cat ? "bg-[#8DBD42] text-white shadow-[0_10px_20px_-10px_rgba(141,189,66,0.4)]" : "bg-white border border-[#3F4143]/10 text-[#3F4143] hover:bg-[#FAF9F6] shadow-sm"}`}
                >
                  {cat}
                </button>
              ))}
            </FadeUp>

            <div className="space-y-36">
              {filteredProjects.map((project, idx) => (
                <FadeUp
                  key={idx}
                  delay={idx * 0.05}
                  className="grid lg:grid-cols-2 gap-16 items-center"
                >
                  {/* Staggered Overlapping Image collage */}
                  <div className={`relative flex items-center justify-center min-h-[380px] md:min-h-[480px] ${idx % 2 !== 0 ? "lg:order-2" : ""}`}>
                    {/* Ambient Glow behind images */}
                    <div className="absolute w-[280px] h-[280px] rounded-full bg-[#8DBD42]/5 blur-[80px] pointer-events-none -z-10" />
                    
                    {/* Before Image - Left/Back */}
                    <div className="absolute left-6 md:left-12 top-6 w-[55%] aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-white/50 brightness-75 transition-all duration-500 hover:z-20 hover:scale-105 hover:brightness-100 group/before">
                      <img
                        src={project.before}
                        alt="Before Restoration"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-[#3F4143]/90 backdrop-blur-sm text-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                        Before
                      </div>
                    </div>
                    
                    {/* After Image - Right/Front overlapping */}
                    <div className="absolute right-6 md:right-12 bottom-6 w-[60%] aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] border-[6px] border-white z-10 transition-all duration-500 hover:scale-105 group/after">
                      <img
                        src={project.after}
                        alt="After Restoration"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-[#8DBD42] text-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md shadow-[#8DBD42]/20">
                        After Restored
                      </div>
                    </div>
                  </div>

                  {/* Editorial project details */}
                  <div className={`flex flex-col justify-center ${idx % 2 !== 0 ? "lg:order-1 lg:pr-12" : "lg:pl-12"}`}>
                    <span className="text-[#8DBD42] font-extrabold uppercase text-xs tracking-[0.2em] mb-4 block">
                      {project.type}
                    </span>
                    <h2
                      className="text-3xl md:text-4xl font-bold text-[#3F4143] mb-6 leading-tight"
                      style={{ fontFamily: "'Libre Caslon Text', serif" }}
                    >
                      {project.title}
                    </h2>
                    <div className="flex items-center gap-2 text-[#3F4143]/60 font-bold mb-6 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8DBD42]" />
                      <span>{project.location}</span>
                    </div>
                    <p className="text-base md:text-lg text-[#3F4143]/70 leading-relaxed mb-8">
                      {project.desc}
                    </p>
                    <div className="grid grid-cols-2 gap-8 border-t border-[#3F4143]/10 pt-6">
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-[#3F4143]/40 mb-1">
                          Duration
                        </div>
                        <div className="text-[#3F4143] font-bold text-sm">
                          Varies by scope
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-[#3F4143]/40 mb-1">
                          Outcome
                        </div>
                        <div className="text-[#3F4143] font-bold text-sm">
                          Full Restoration
                        </div>
                      </div>
                    </div>
                  </div>
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
              src="/photo/who-we-are.jpg"
              alt="Heritage team support"
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
                  Start Your Restoration Journey
                </h2>
                <div
                  className="text-sm md:text-base text-[#3F4143]/85 space-y-6 leading-relaxed max-w-3xl mx-auto"
                  style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                >
                  <p>
                    Heritage Restoration is available 24/7, 365 days a year. Our emergency response team will deploy and arrive within 60 minutes of dispatch to secure your home.
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
                    <Phone size={14} /> Call 360-345-1015
                  </a>
                  <a
                    href="mailto:office@firewaterstorm.com"
                    className="bg-[#3F4143] hover:bg-[#292b2d] text-white font-bold px-8 py-4 uppercase tracking-[0.14em] text-xs transition-colors shadow-md"
                  >
                    Email Us Now
                  </a>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>
      </div>
    </Layout>
  );
}
