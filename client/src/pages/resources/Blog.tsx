import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Calendar, User, ArrowRight, Phone } from "lucide-react";
import { useRef } from "react";
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

const posts = [
  {
    title: "5 Critical Steps After Water Damage",
    excerpt:
      "Immediate action can save thousands in repair costs. Learn the essential steps to take in the first 24 hours...",
    date: "May 15, 2026",
    author: "Heritage Team",
    image: "/photo/20210520_113125.jpg",
  },
  {
    title: "Understanding Your Insurance Policy",
    excerpt:
      "What does 'Replacement Cost' actually mean? We break down the complex language of property insurance policies...",
    date: "May 10, 2026",
    author: "Heritage Team",
    image: "/photo/hero-new.jpg",
  },
  {
    title: "Fire Safety: Protecting Your Family",
    excerpt:
      "Prevention is the best restoration. Here are the top fire safety tips for homeowners in the Pacific Northwest...",
    date: "May 05, 2026",
    author: "Heritage Team",
    image: "/photo/Fisher after.jpg",
  },
];

export default function Blog() {
  return (
    <Layout>
      <Helmet>
        <title>Restoration Blog & Guides | Heritage Restoration</title>
        <meta
          name="description"
          content="Expert advice on fire, water, and storm damage restoration. Stay informed about property maintenance and insurance claims."
        />
      </Helmet>

      <div className="min-h-screen bg-canvas-textured pt-[142px]">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 bg-[#3F4143] text-white overflow-hidden">
          <img
            src="/photo/20210408_161309.jpg"
            alt="General restoration work insights background"
            className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.35]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#292b2d]/90 via-[#292b2d]/60 to-[#292b2d]/30" />
          <div className="max-w-[1280px] mx-auto px-6 relative z-10">
            <FadeUp className="max-w-2xl">
              <h1
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ fontFamily: "'Libre Caslon Text', serif" }}
              >
                Restoration <span className="text-[#8DBD42]">Insights</span>
              </h1>
              <p className="text-lg text-white/90 leading-relaxed">
                Expert guides, tips, and industry news to help you protect and
                restore your most valuable asset.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* Blog Post Grid Section */}
        <section className="py-20 md:py-36 bg-transparent">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-start">
              {posts.map((post, idx) => {
                // Staggered vertical margins for index-based offsets
                const staggerClass = 
                  idx === 1 ? "lg:mt-16" : 
                  idx === 2 ? "lg:mt-8" : "";
                  
                return (
                  <FadeUp
                    key={idx}
                    delay={idx * 0.1}
                    className={`group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] hover:-translate-y-2.5 border border-[#3F4143]/5 transition-all duration-500 flex flex-col justify-between min-h-[460px] ${staggerClass}`}
                  >
                    <div>
                      {/* Image frame */}
                      <div className="aspect-[4/3] overflow-hidden relative">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                      </div>
                      
                      {/* Text content */}
                      <div className="p-8">
                        <div className="flex items-center gap-4 text-[10px] text-[#3F4143]/50 mb-4 font-bold uppercase tracking-wider">
                          <span className="flex items-center gap-1.5 flex-nowrap">
                            <Calendar size={12} className="shrink-0 text-[#8DBD42]" /> {post.date}
                          </span>
                          <span className="flex items-center gap-1.5 flex-nowrap">
                            <User size={12} className="shrink-0 text-[#8DBD42]" /> {post.author}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-[#3F4143] group-hover:text-[#8DBD42] transition-colors duration-300 leading-snug mb-3">
                          {post.title}
                        </h3>
                        
                        <p className="text-[#3F4143]/70 text-sm leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                    
                    {/* Read more footer with divider line */}
                    <div className="px-8 pb-8">
                      <div className="w-full h-[1px] bg-[#3F4143]/5 mb-6" />
                      <div className="flex items-center gap-2 text-[#8DBD42] font-extrabold uppercase text-xs tracking-widest group-hover:gap-4 transition-all duration-300">
                        Read Full Guide <ArrowRight size={14} />
                      </div>
                    </div>
                  </FadeUp>
                );
              })}
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
                  Need Immediate Assistance?
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
