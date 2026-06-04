import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";

const posts = [
  {
    title: "5 Critical Steps After Water Damage",
    excerpt: "Immediate action can save thousands in repair costs. Learn the essential steps to take in the first 24 hours...",
    date: "May 15, 2026",
    author: "Heritage Team",
    image: "/photo/20210520_113125.jpg"
  },
  {
    title: "Understanding Your Insurance Policy",
    excerpt: "What does 'Replacement Cost' actually mean? We break down the complex language of property insurance policies...",
    date: "May 10, 2026",
    author: "Heritage Team",
    image: "/photo/hero-new.jpg"
  },
  {
    title: "Fire Safety: Protecting Your Family",
    excerpt: "Prevention is the best restoration. Here are the top fire safety tips for homeowners in the Pacific Northwest...",
    date: "May 05, 2026",
    author: "Heritage Team",
    image: "/photo/Fisher after.jpg"
  }
];

export default function Blog() {
  return (
    <Layout>
      <Helmet>
        <title>Restoration Blog & Guides | Heritage Restoration</title>
        <meta name="description" content="Expert advice on fire, water, and storm damage restoration. Stay informed about property maintenance and insurance claims." />
      </Helmet>
      
      <div className="pt-32 pb-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-black text-[#3F4143] uppercase tracking-tight mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Restoration <span className="text-[#8DBD42]">Insights</span>
            </h1>
            <p className="text-xl text-[#3F4143]/70 max-w-2xl mx-auto">
              Expert guides, tips, and industry news to help you protect and restore your most valuable asset.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[16/10] overflow-hidden rounded-lg mb-6 relative">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                </div>
                <div className="flex items-center gap-4 text-sm text-[#3F4143]/50 mb-4 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
                  <span className="flex items-center gap-1.5"><User size={14} /> {post.author}</span>
                </div>
                <h3 className="text-2xl font-black text-[#3F4143] uppercase mb-4 group-hover:text-[#8DBD42] transition-colors leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {post.title}
                </h3>
                <p className="text-[#3F4143]/70 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-[#8DBD42] font-black uppercase text-sm tracking-widest group-hover:gap-4 transition-all">
                  Read More <ArrowRight size={16} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
