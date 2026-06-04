import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
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

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <Layout>
      <Helmet>
        <title>Contact Us | Heritage Restoration</title>
        <meta name="description" content="Contact Heritage Restoration for emergency response or free damage assessment. Available 24/7 in Washington." />
        <meta property="og:title" content="Contact Us | Heritage Restoration" />
        <meta property="og:description" content="24/7 emergency contact for fire, water, and storm damage restoration services." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Heritage Restoration",
            "telephone": "+1-360-851-1407",
            "email": "office@firewaterstorm.com",
            "address": [
              {
                "@type": "PostalAddress",
                "streetAddress": "7895 Martin Way E, Unit 103",
                "addressLocality": "Lacey",
                "addressRegion": "WA",
                "postalCode": "98516"
              },
              {
                "@type": "PostalAddress",
                "streetAddress": "3520 Auburn Way S, Suite 201",
                "addressLocality": "Auburn",
                "addressRegion": "WA",
                "postalCode": "98002"
              }
            ],
            "areaServed": "WA",
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              "opens": "00:00",
              "closes": "23:59"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white pt-[142px]">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-r from-[#3F4143] to-[#2a2c2e] text-white overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-6">
            <FadeUp className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Contact Heritage Restoration
              </h1>
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                Available 24/7 for emergency response. Contact us immediately for fire, water, or storm damage. We're here to help.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {[
                {
                  icon: <Phone size={32} />,
                  title: "Emergency Hotline",
                  content: "+1(360)851-1407",
                  subtext: "24/7 Available"
                },
                {
                  icon: <Mail size={32} />,
                  title: "Email",
                  content: "office@firewaterstorm.com",
                  subtext: "Response within 2 hours"
                },
                {
                  icon: <Clock size={32} />,
                  title: "Hours",
                  content: "24 Hours a Day",
                  subtext: "7 Days a Week"
                },
                {
                  icon: <MapPin size={32} />,
                  title: "Service Area",
                  content: "Federal Way to Olympia",
                  subtext: "All of Washington State"
                }
              ].map((item, idx) => (
                <FadeUp key={idx} delay={idx * 0.1} className="bg-[#F5F7FA] rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="text-[#8DBD42] mb-4 flex justify-center">{item.icon}</div>
                  <h3 className="font-bold text-[#3F4143] mb-2 text-lg">{item.title}</h3>
                  <p className="text-[#3F4143] font-semibold mb-1">{item.content}</p>
                  <p className="text-[#3F4143]/60 text-sm">{item.subtext}</p>
                </FadeUp>
              ))}
            </div>

            {/* Offices */}
            <FadeUp className="mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-[#3F4143] mb-12 text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Our Offices
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    name: "North Office (Lacey)",
                    address: "7895 Martin Way E, Unit 103",
                    city: "Lacey, WA 98516",
                    phone: "+1(360)851-1407"
                  },
                  {
                    name: "South Office (Auburn)",
                    address: "3520 Auburn Way S, Suite 201",
                    city: "Auburn, WA 98002",
                    phone: "+1(360)851-1407"
                  }
                ].map((office, idx) => (
                  <FadeUp key={idx} delay={idx * 0.1} className="bg-[#F5F7FA] rounded-lg p-8 border border-gray-200 hover:border-[#8DBD42] transition-all duration-300">
                    <h3 className="font-bold text-[#3F4143] text-lg mb-4">{office.name}</h3>
                    <div className="space-y-3">
                      <div className="flex gap-3 items-start">
                        <MapPin size={20} className="text-[#8DBD42] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[#3F4143] font-semibold">{office.address}</p>
                          <p className="text-[#3F4143]/70">{office.city}</p>
                        </div>
                      </div>
                      <div className="flex gap-3 items-center">
                        <Phone size={20} className="text-[#8DBD42] flex-shrink-0" />
                        <a href={`tel:${office.phone}`} className="text-[#3F4143] font-semibold hover:text-[#8DBD42] transition-colors">{office.phone}</a>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 md:py-32 bg-[#F5F7FA]">
          <div className="max-w-[1280px] mx-auto px-6">
            <FadeUp className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-[#3F4143] mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Send us a Message
              </h2>
              <p className="text-lg text-[#3F4143]/70 max-w-2xl mx-auto">
                For non-emergency inquiries, fill out the form below and we'll respond within 2 hours.
              </p>
            </FadeUp>

            <FadeUp className="max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 shadow-lg">
                {submitted && (
                  <div className="mb-6 p-4 bg-[#7BB843] text-white rounded-lg text-center font-semibold">
                    Thank you! We'll contact you soon.
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-[#3F4143] font-bold mb-2 text-sm">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8DBD42] transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-[#3F4143] font-bold mb-2 text-sm">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8DBD42] transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-[#3F4143] font-bold mb-2 text-sm">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8DBD42] transition-colors"
                      placeholder="+1(360)000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-[#3F4143] font-bold mb-2 text-sm">Service Type</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8DBD42] transition-colors"
                    >
                      <option value="">Select a service...</option>
                      <option value="fire">Fire Restoration</option>
                      <option value="water">Water Restoration</option>
                      <option value="storm">Storm Recovery</option>
                      <option value="contents">Contents Services</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-[#3F4143] font-bold mb-2 text-sm">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8DBD42] transition-colors resize-none"
                    placeholder="Tell us about your situation..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#8DBD42] hover:bg-[#7BB843] text-white font-bold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send size={18} /> Send Message
                </button>

                <p className="text-[#3F4143]/60 text-xs mt-4 text-center">
                  For emergencies, call +1(360)851-1407 immediately.
                </p>
              </form>
            </FadeUp>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <FadeUp className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-[#3F4143] mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Service Areas
              </h2>
              <p className="text-lg text-[#3F4143]/70">
                We serve the entire Washington State region with rapid emergency response.
              </p>
            </FadeUp>

            <FadeUp className="bg-[#F5F7FA] rounded-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  "Federal Way",
                  "Auburn",
                  "Tacoma",
                  "Puyallup",
                  "Lacey",
                  "Olympia",
                  "Chehalis",
                  "Centralia",
                  "Surrounding Areas"
                ].map((area, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <MapPin size={20} className="text-[#8DBD42] flex-shrink-0" />
                    <span className="text-[#3F4143] font-semibold">{area}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-[#7BB843] text-white">
          <div className="max-w-[1280px] mx-auto px-6 text-center">
            <FadeUp>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Emergency? Call Now
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                For immediate emergency response, call our 24/7 hotline right away.
              </p>
              <a href="tel:+13608511407" className="inline-flex items-center justify-center gap-2 bg-white text-[#3F4143] font-bold px-8 py-4 rounded hover:bg-[#F5F7FA] transition-all duration-300 text-lg">
                <Phone size={20} /> +1(360)851-1407
              </a>
            </FadeUp>
          </div>
        </section>
      </div>
    </Layout>
  );
}
