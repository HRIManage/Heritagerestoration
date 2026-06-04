import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { ShieldCheck, Scale, FileText, UserCheck } from "lucide-react";

export default function BillOfRights() {
  const rights = [
    {
      icon: <Scale className="w-8 h-8" />,
      title: "Right to Choose Your Contractor",
      desc: "You are not required to use the contractor recommended by your insurance company. You have the legal right to hire any licensed professional you trust to restore your home."
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Right to Full Restoration",
      desc: "Your insurance policy is designed to return your property to its pre-loss condition. You have the right to have all damaged materials replaced with materials of like kind and quality."
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Right to Independent Estimates",
      desc: "You have the right to receive an independent estimate from your contractor. We use the same software as insurance adjusters to ensure every detail of your loss is documented and paid for."
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "Right to Professional Advocacy",
      desc: "You have the right to have your contractor present during the adjuster's inspection to ensure all damage is identified and recorded accurately."
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Homeowner Bill of Rights | Heritage Restoration</title>
        <meta name="description" content="Know your legal rights as a homeowner after property damage. You have the right to choose your own restoration contractor." />
      </Helmet>
      
      <div className="pt-32 pb-24 bg-[#F5F7FA]">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl font-black text-[#3F4143] uppercase tracking-tight mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Homeowner <span className="text-[#8DBD42]">Bill of Rights</span>
            </h1>
            <p className="text-xl text-[#3F4143]/70 max-w-3xl mx-auto">
              In the wake of a disaster, it's easy to feel overwhelmed. We're here to ensure you know your rights and receive the full protection your insurance policy provides.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {rights.map((right, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="text-[#8DBD42] mb-6">{right.icon}</div>
                <h3 className="text-2xl font-black text-[#3F4143] uppercase mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>{right.title}</h3>
                <p className="text-[#3F4143]/70 leading-relaxed text-lg">{right.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 bg-[#3F4143] rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-black uppercase mb-6">Need an Advocate?</h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              Don't let the insurance company dictate your recovery. Contact us today for a free consultation on your rights and your claim.
            </p>
            <a href="tel:+13608511407" className="inline-block bg-[#8DBD42] text-white px-10 py-5 rounded-sm font-black text-xl uppercase tracking-wider hover:bg-[#72a232] transition-colors">
              Call (360) 851-1407
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
