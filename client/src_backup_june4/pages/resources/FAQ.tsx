import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "What should I do immediately after fire or water damage?",
    answer: "First, ensure everyone's safety and call 911 if there is an active emergency. Then, contact Heritage Restoration immediately at (360) 851-1407. Do not enter the building if it's structurally compromised. We will arrive within 45-60 minutes to secure the property and begin mitigation."
  },
  {
    question: "Do I have to use the restoration company my insurance recommends?",
    answer: "No. According to the Homeowner Bill of Rights, you have the legal right to choose any licensed restoration contractor you trust. Heritage Restoration works for you, not the insurance company, ensuring your property is restored to its full pre-loss condition."
  },
  {
    question: "How long does the restoration process typically take?",
    answer: "The timeline varies depending on the extent of the damage. Mitigation (water extraction/drying or soot cleanup) usually takes 3-7 days. The reconstruction phase can take anywhere from a few weeks to several months for major fire losses. We provide a detailed schedule once the insurance estimate is approved."
  },
  {
    question: "Will you work directly with my insurance adjuster?",
    answer: "Yes. We are experts in insurance claims. We use Xactimate (the industry-standard estimating software) and provide 3D Matterport scans to ensure your adjuster has all the documentation needed to approve the full scope of repairs."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Layout>
      <Helmet>
        <title>Frequently Asked Questions | Heritage Restoration</title>
        <meta name="description" content="Get answers to common questions about fire, water, and storm damage restoration and insurance claims." />
      </Helmet>
      
      <div className="pt-32 pb-24 bg-white">
        <div className="max-w-[1000px] mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-black text-[#3F4143] uppercase tracking-tight mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Frequently Asked <span className="text-[#8DBD42]">Questions</span>
            </h1>
            <p className="text-xl text-[#3F4143]/70 max-w-2xl mx-auto">
              Everything you need to know about the restoration process, insurance claims, and your rights as a homeowner.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                <button 
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-bold text-[#3F4143]">{faq.question}</span>
                  {openIndex === idx ? <Minus className="text-[#8DBD42]" /> : <Plus className="text-[#8DBD42]" />}
                </button>
                {openIndex === idx && (
                  <div className="p-6 bg-gray-50 text-[#3F4143]/80 leading-relaxed border-t border-gray-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
