import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useState } from "react";

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
    title: "Commercial Water Mitigation",
    location: "Auburn, WA",
    type: "Water Restoration",
    before: "/photo/20210520_113125.jpg",
    after: "/photo/20210520_113125.jpg", // Placeholder
    desc: "Emergency water extraction and structural drying for a large retail facility after a pipe burst.",
  },
  {
    title: "Storm Damage Recovery",
    location: "Olympia, WA",
    type: "Storm Recovery",
    before: "/photo/20240403_095638.webp",
    after: "/photo/Monnett Fire After.jpg", // Placeholder
    desc: "Structural repairs and roofing replacement after a severe windstorm caused significant tree damage.",
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

      <div className="pt-32 pb-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1
              className="text-5xl font-black text-[#3F4143] uppercase tracking-tight mb-6"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Our <span className="text-[#8DBD42]">Projects</span>
            </h1>
            <p className="text-xl text-[#3F4143]/70 max-w-2xl mx-auto">
              Real results for real homeowners. See how we transform disaster
              into restoration.
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-3 rounded-sm font-black uppercase text-sm tracking-widest transition-all ${filter === cat ? "bg-[#8DBD42] text-white" : "bg-gray-100 text-[#3F4143] hover:bg-gray-200"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-24">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="aspect-[4/5] rounded-lg overflow-hidden relative">
                      <img
                        src={project.before}
                        alt="Before"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 text-xs font-bold uppercase tracking-widest rounded">
                        Before
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 pt-12">
                    <div className="aspect-[4/5] rounded-lg overflow-hidden relative">
                      <img
                        src={project.after}
                        alt="After"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-[#8DBD42] text-white px-3 py-1 text-xs font-bold uppercase tracking-widest rounded">
                        After
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-[#8DBD42] font-black uppercase text-sm tracking-[0.2em] mb-4">
                    {project.type}
                  </div>
                  <h2
                    className="text-4xl font-black text-[#3F4143] uppercase mb-6 leading-tight"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {project.title}
                  </h2>
                  <div className="flex items-center gap-2 text-[#3F4143]/60 font-bold mb-8">
                    <span>{project.location}</span>
                  </div>
                  <p className="text-xl text-[#3F4143]/70 leading-relaxed mb-10">
                    {project.desc}
                  </p>
                  <div className="grid grid-cols-2 gap-6 border-t border-gray-100 pt-8">
                    <div>
                      <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                        Duration
                      </div>
                      <div className="text-[#3F4143] font-bold">
                        Varies by scope
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                        Outcome
                      </div>
                      <div className="text-[#3F4143] font-bold">
                        Full Restoration
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
