import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Package, Barcode, Lock, CheckCircle, Phone, Mail } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
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

export default function ContentsServices() {
  return (
    <Layout>
      <Helmet>
        <title>Contents Services | Heritage Restoration</title>
        <meta name="description" content="Professional contents pack-out, inventory, cleaning, and storage services. Digital tracking and climate-controlled vault storage." />
        <meta property="og:title" content="Contents Services | Heritage Restoration" />
        <meta property="og:description" content="Professional contents services with digital inventory tracking and secure vault storage." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Heritage Restoration - Contents Services",
            "description": "Professional contents pack-out, cleaning, and storage services",
            "telephone": "+1-360-851-1407",
            "email": "office@firewaterstorm.com",
            "areaServed": "WA",
            "serviceType": "Contents Services"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white pt-[142px]">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-r from-[#3F4143] to-[#2a2c2e] text-white overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-6">
            <FadeUp className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Package size={32} className="text-[#8DBD42]" />
                <span className="text-[#8DBD42] font-bold text-sm uppercase tracking-widest">Our Expertise</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Contents Services & Storage
              </h1>
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                When disaster strikes, your personal belongings need professional care. We provide comprehensive pack-out, inventory, cleaning, and secure storage services to protect your valuables.
              </p>
              <a href="tel:+13608511407" className="inline-flex items-center gap-2 bg-[#8DBD42] hover:bg-[#7BB843] text-white font-bold px-8 py-4 rounded transition-all duration-300">
                <Phone size={18} /> Contact Us: +1(360)851-1407
              </a>
            </FadeUp>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <FadeUp className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#3F4143] mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Complete Contents Management
              </h2>
              <p className="text-lg text-[#3F4143]/70 max-w-2xl">
                From careful packing to secure storage and professional cleaning, we handle your belongings with the care they deserve.
              </p>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Barcode size={32} />,
                  title: "Digital Inventory Tagging",
                  desc: "Each item is photographed, cataloged, and assigned a unique barcode for complete tracking."
                },
                {
                  icon: <Package size={32} />,
                  title: "Professional Pack-Out",
                  desc: "Expert packing of all contents with condition assessment and detailed documentation."
                },
                {
                  icon: <Lock size={32} />,
                  title: "Secure Vault Storage",
                  desc: "Climate-controlled, secure facility with 24/7 monitoring and restricted access."
                },
                {
                  icon: <CheckCircle size={32} />,
                  title: "Specialized Cleaning",
                  desc: "Professional restoration cleaning for soot, smoke, water, and odor damage on all items."
                }
              ].map((item, idx) => (
                <FadeUp key={idx} delay={idx * 0.1} className="bg-[#F5F7FA] rounded-lg p-8 hover:shadow-lg transition-all duration-300">
                  <div className="text-[#8DBD42] mb-4">{item.icon}</div>
                  <h3 className="font-bold text-[#3F4143] mb-3 text-lg">{item.title}</h3>
                  <p className="text-[#3F4143]/70 text-sm leading-relaxed">{item.desc}</p>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 md:py-32 bg-[#F5F7FA]">
          <div className="max-w-[1280px] mx-auto px-6">
            <FadeUp className="mb-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-[#3F4143] mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Contents Services Process
              </h2>
              <p className="text-lg text-[#3F4143]/70 max-w-2xl mx-auto">
                Systematic care and documentation of your valuable belongings.
              </p>
            </FadeUp>

            <div className="space-y-6">
              {[
                { step: "1", title: "Initial Assessment", desc: "Evaluate all contents and determine which items require cleaning or specialized care." },
                { step: "2", title: "Condition Documentation", desc: "Photograph each item and document pre-existing condition for insurance purposes." },
                { step: "3", title: "Professional Pack-Out", desc: "Carefully pack all items using protective materials and secure containers." },
                { step: "4", title: "Digital Inventory", desc: "Create detailed inventory with photos, descriptions, and unique barcode tracking." },
                { step: "5", title: "Specialized Cleaning", desc: "Professional restoration cleaning for soot, smoke, water damage, and odor removal." },
                { step: "6", title: "Secure Storage & Return", desc: "Climate-controlled vault storage with 24/7 monitoring and organized return to your home." }
              ].map((item, idx) => (
                <FadeUp key={idx} delay={idx * 0.05} className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-full bg-[#8DBD42] text-white flex items-center justify-center font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#3F4143] text-lg mb-2">{item.title}</h3>
                    <p className="text-[#3F4143]/70">{item.desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <FadeUp className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#3F4143] mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Why Choose Heritage for Contents Services
              </h2>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                "Complete digital inventory with barcode tracking",
                "Professional condition documentation for insurance",
                "Expert packing and handling of valuables",
                "Climate-controlled secure vault storage",
                "24/7 facility monitoring and restricted access",
                "Specialized cleaning for all damage types",
                "Transparent pricing and detailed invoicing",
                "Organized return and placement in your home"
              ].map((item, idx) => (
                <FadeUp key={idx} delay={idx * 0.05} className="flex gap-4 items-start">
                  <CheckCircle size={24} className="text-[#8DBD42] flex-shrink-0 mt-1" />
                  <p className="text-[#3F4143] font-semibold">{item}</p>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* What We Clean */}
        <section className="py-20 md:py-32 bg-[#F5F7FA]">
          <div className="max-w-[1280px] mx-auto px-6">
            <FadeUp className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-[#3F4143] mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Items We Professionally Clean & Restore
              </h2>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Furniture & Upholstery",
                "Clothing & Textiles",
                "Electronics & Appliances",
                "Artwork & Collectibles",
                "Books & Documents",
                "Kitchenware & Dishes",
                "Jewelry & Accessories",
                "Toys & Memorabilia",
                "Bedding & Linens"
              ].map((item, idx) => (
                <FadeUp key={idx} delay={idx * 0.05} className="bg-white rounded-lg p-6 border border-gray-200 hover:border-[#8DBD42] transition-all duration-300">
                  <p className="text-[#3F4143] font-semibold text-center">{item}</p>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-[#7BB843] text-white">
          <div className="max-w-[1280px] mx-auto px-6 text-center">
            <FadeUp>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Protect Your Valuables
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Let us handle your contents with professional care and secure storage while your property is being restored.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+13608511407" className="inline-flex items-center justify-center gap-2 bg-white text-[#3F4143] font-bold px-8 py-4 rounded hover:bg-[#F5F7FA] transition-all duration-300">
                  <Phone size={18} /> +1(360)851-1407
                </a>
                <a href="mailto:office@firewaterstorm.com" className="inline-flex items-center justify-center gap-2 bg-[#3F4143] text-white font-bold px-8 py-4 rounded hover:bg-[#2a2c2e] transition-all duration-300">
                  <Mail size={18} /> Email Us
                </a>
              </div>
            </FadeUp>
          </div>
        </section>
      </div>
    </Layout>
  );
}
