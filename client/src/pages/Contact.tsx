import { useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

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
                "streetAddress": "1581 N. National Ave",
                "addressLocality": "Chehalis",
                "addressRegion": "WA",
                "postalCode": "98532"
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

      <div className="min-h-screen bg-brand-linen pt-[142px]">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-r from-[#3F4143] to-[#252628] text-white overflow-hidden border-b border-[#8DBD42]/20">
          <Container>
            <FadeIn className="max-w-2xl" direction="up">
              <span className="text-[#8DBD42] uppercase tracking-[0.25em] text-xs font-black block mb-4">
                GET IN TOUCH
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-serif mb-6">
                Connect With Heritage
              </h1>
              <p className="text-base md:text-lg text-white/80 leading-relaxed font-sans font-light">
                Available 24/7 for emergency dispatch and structural secures. For non-emergencies, submit an intake form below and our office team will follow up within 2 hours.
              </p>
            </FadeIn>
          </Container>
        </section>

        {/* Asymmetric Form & Info Section */}
        <Section bg="none">
          <Container>
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column (5 cols) — High-Density Sticky Editorial Block */}
              <div className="lg:col-span-5 lg:sticky lg:top-36 space-y-8">
                {/* Emergency Block */}
                <FadeIn className="bg-[#3F4143] text-white p-8 md:p-10 shadow-[0_24px_50px_rgba(0,0,0,0.06)] rounded-none space-y-6 relative overflow-hidden" direction="up">
                  <div className="absolute right-[-30px] bottom-[-30px] w-48 h-48 bg-[#8DBD42]/8 rounded-full blur-2xl pointer-events-none" />
                  
                  <span className="text-[#8DBD42] uppercase tracking-[0.2em] text-[10px] font-black block">
                    EMERGENCY DISPATCH
                  </span>
                  
                  <h3 className="text-2xl font-serif font-bold text-white leading-tight">
                    24/7 Urgent Hotline
                  </h3>
                  
                  <div className="space-y-4 pt-2">
                    <a
                      href="tel:+13608511407"
                      className="flex items-center gap-3 text-xl md:text-2xl font-bold text-[#8DBD42] hover:text-[#9fd546] transition-colors font-sans"
                    >
                      <Phone size={24} className="flex-shrink-0" />
                      <span>+1 (360) 851-1407</span>
                    </a>
                    
                    <a
                      href="mailto:office@firewaterstorm.com"
                      className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors font-sans"
                    >
                      <Mail size={16} className="text-[#8DBD42] flex-shrink-0" />
                      <span>office@firewaterstorm.com</span>
                    </a>

                    <div className="flex items-center gap-3 text-sm text-white/80 font-sans">
                      <Clock size={16} className="text-[#8DBD42] flex-shrink-0" />
                      <span>Immediate 45-minute response in service area</span>
                    </div>
                  </div>
                </FadeIn>

                {/* Office Locations */}
                <FadeIn className="bg-white p-8 border border-[#3F4143]/8 shadow-sm space-y-6 rounded-none" direction="up">
                  <h3 className="text-xl font-serif font-bold text-[#3F4143] border-b border-[#3F4143]/10 pb-3">
                    Office Locations
                  </h3>
                  
                  <div className="space-y-6 font-sans">
                    {/* Lacey */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-[#8DBD42] uppercase tracking-wider">
                        North Office (Lacey)
                      </h4>
                      <div className="flex gap-3 items-start text-sm text-[#3F4143]/80">
                        <MapPin size={16} className="text-[#8DBD42] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-[#3F4143]">7895 Martin Way E, Unit 103</p>
                          <p>Lacey, WA 98516</p>
                        </div>
                      </div>
                    </div>

                    {/* Chehalis */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-[#8DBD42] uppercase tracking-wider">
                        South Office (Chehalis)
                      </h4>
                      <div className="flex gap-3 items-start text-sm text-[#3F4143]/80">
                        <MapPin size={16} className="text-[#8DBD42] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-[#3F4143]">1581 N. National Ave</p>
                          <p>Chehalis, WA 98532</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>

              {/* Right Column (7 cols) — Secure Intake Form */}
              <div className="lg:col-span-7">
                <FadeIn className="bg-white p-8 md:p-12 border border-[#3F4143]/8 shadow-sm rounded-none space-y-8" direction="up">
                  <div className="space-y-2">
                    <span className="text-[#8DBD42] uppercase tracking-[0.2em] text-[10px] font-black block">
                      SECURE PORTAL
                    </span>
                    <h2 className="text-3xl font-serif font-bold text-[#3F4143] leading-tight">
                      Submit an Intake Inquiry
                    </h2>
                    <p className="text-sm text-[#3F4143]/60 font-sans">
                      Please enter your contact details and claim details below.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6 font-sans">
                    {submitted && (
                      <div className="p-4 bg-[#8DBD42] text-white font-bold text-center rounded-none shadow-sm transition-all duration-300">
                        Intake Received. We will contact you shortly.
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-[#3F4143]/70">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-brand-linen/40 border border-[#3F4143]/15 focus:border-[#8DBD42] focus:outline-none p-3.5 transition-colors text-sm rounded-none"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-[#3F4143]/70">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-brand-linen/40 border border-[#3F4143]/15 focus:border-[#8DBD42] focus:outline-none p-3.5 transition-colors text-sm rounded-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Email */}
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-[#3F4143]/70">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-brand-linen/40 border border-[#3F4143]/15 focus:border-[#8DBD42] focus:outline-none p-3.5 transition-colors text-sm rounded-none"
                        />
                      </div>

                      {/* Service Choice */}
                      <div className="space-y-2">
                        <label htmlFor="service" className="text-xs font-bold uppercase tracking-wider text-[#3F4143]/70">
                          Restoration Service
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full bg-brand-linen/40 border border-[#3F4143]/15 focus:border-[#8DBD42] focus:outline-none p-3.5 transition-colors text-sm rounded-none appearance-none cursor-pointer"
                        >
                          <option value="">Select a service category...</option>
                          <option value="fire">Fire Damage Restoration</option>
                          <option value="water">Water Damage Mitigation</option>
                          <option value="storm">Storm Damage Recovery</option>
                          <option value="contents">Contents Pack-Out & Clean</option>
                          <option value="other">General Inquiry / Assessment</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-[#3F4143]/70">
                        Describe the Loss or Request *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-brand-linen/40 border border-[#3F4143]/15 focus:border-[#8DBD42] focus:outline-none p-3.5 transition-colors text-sm rounded-none resize-y"
                        placeholder="Please details the current situation (e.g. active water leak, soot damage, insurance claim opened)..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="bg-[#3F4143] hover:bg-[#252628] text-white font-bold py-4 px-8 uppercase tracking-[0.15em] text-xs transition-colors rounded-none w-full flex items-center justify-center gap-2"
                    >
                      <Send size={14} /> Submit Secured Intake
                    </button>
                  </form>
                </FadeIn>
              </div>

            </div>
          </Container>
        </Section>
      </div>
    </Layout>
  );
}
