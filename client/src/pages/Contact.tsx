import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, ShieldCheck, ArrowUpRight, BadgeCheck } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";
import Layout from "@/components/layout/Layout";
import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import {
  isWeb3FormsConfigured,
  mailtoFallback,
  submitIntake,
} from "@/lib/web3forms";

export default function Contact() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Honeypot — if filled, silently treat as spam success.
    const botField = (
      e.currentTarget.elements.namedItem("botcheck") as HTMLInputElement | null
    )?.checked;
    if (botField) return;

    // If no key is configured yet, fall back to mailto so the form still works.
    if (!isWeb3FormsConfigured()) {
      mailtoFallback(formData);
      return;
    }

    setSending(true);
    try {
      const success = await submitIntake(formData);
      if (success) {
        setLocation("/thank-you");
      } else {
        setError(
          "Something went wrong submitting your request. Please call us at (360) 456-1886."
        );
      }
    } catch {
      setError(
        "Network error. Please try again or call us directly at (360) 456-1886."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Contact Us | Heritage Restoration</title>
        <meta
          name="description"
          content="Contact Heritage Restoration for emergency response or free damage assessment. Available 24/7 in Washington."
        />
        <meta property="og:title" content="Contact Us | Heritage Restoration" />
        <meta
          property="og:description"
          content="24/7 emergency contact for fire, water, and storm damage restoration services."
        />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Heritage Restoration",
            telephone: "+1-360-456-1886",
            email: "office@firewaterstorm.com",
            address: [
              {
                "@type": "PostalAddress",
                streetAddress: "8695 Martin Way E, Unit 103",
                addressLocality: "Lacey",
                addressRegion: "WA",
                postalCode: "98516",
              },
              {
                "@type": "PostalAddress",
                streetAddress: "1581 N. National Ave",
                addressLocality: "Chehalis",
                addressRegion: "WA",
                postalCode: "98532",
              },
            ],
            areaServed: "WA",
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              opens: "00:00",
              closes: "23:59",
            },
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-[calc(112px+2rem)] sm:pt-[calc(116px+2rem)] lg:pt-[calc(152px+2rem)] pb-12 md:pb-16 bg-gradient-to-br from-[#145126] via-[#142618] to-[#0E1B11] text-white overflow-hidden border-b border-[#8DBD42]/20">
          <Container>
            <FadeIn className="max-w-2xl" direction="up">
              <span className="text-[#8DBD42] uppercase tracking-[0.25em] text-xs font-black block mb-4">
                GET IN TOUCH
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-serif mb-6">
                Connect With Heritage
              </h1>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed font-sans font-light">
                Available 24/7 for emergency dispatch and structural secures.
                For non-emergencies, submit an intake form below and our office
                team will follow up within 1 business day.
              </p>
            </FadeIn>
          </Container>
        </section>

        {/* Ticker strip — lime green on contact page */}
        <div className="relative z-10 bg-[#8DBD42] py-5 overflow-hidden">
          <style>{`
            @keyframes contact-ticker {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
            .contact-ticker { animation: contact-ticker 45s linear infinite; }
          `}</style>
          <div className="contact-ticker flex whitespace-nowrap w-max">
            {[...Array(2)].map((_, setIdx) => (
              <div key={setIdx} className="flex">
                {[
                  "Direct Insurance Billing",
                  "Licensed & Bonded in WA",
                  "22+ Years Serving Washington",
                  "Locally Owned & Operated",
                ].map(item => (
                  <span key={item} className="flex items-center">
                    <span className="px-7 font-black text-[15px] uppercase tracking-[0.18em] text-[#145126]">{item}</span>
                    <span className="text-[#145126]/30 text-[10px]">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Asymmetric Form & Info Section */}
        <Section bg="none">
          <Container>
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column (5 cols): High-Density Sticky Editorial Block */}
              <div className="lg:col-span-5 lg:sticky lg:top-36 space-y-8">
                {/* Emergency Block */}
                <FadeIn
                  className="relative overflow-hidden rounded-none"
                  direction="up"
                >
                  {/* Dark green gradient background */}
                  <div className="bg-[#145126] p-8 md:p-10 relative">
                    {/* Glow accents */}
                    <div className="absolute right-[-40px] top-[-40px] w-64 h-64 rounded-full bg-[#8DBD42]/12 blur-[80px] pointer-events-none" />
                    <div className="absolute left-[-20px] bottom-[-20px] w-40 h-40 rounded-full bg-[#8DBD42]/8 blur-[60px] pointer-events-none" />

                    {/* Overline */}
                    <div className="relative z-10 flex items-center gap-3 mb-6">
                      <span className="w-6 h-[2px] bg-[#8DBD42]" />
                      <span className="text-[#8DBD42] uppercase tracking-[0.22em] text-[13px] font-black">
                        Emergency Dispatch
                      </span>
                    </div>

                    {/* Title */}
                    <div className="relative z-10 mb-8">
                      <h3 className="text-[32px] md:text-[36px] font-bold leading-tight font-serif" style={{ color: "#FFFFFF" }}>
                        24/7 Urgent Hotline
                      </h3>
                      <p className="text-white text-[17px] mt-2">Available day, night, weekends &amp; holidays</p>
                    </div>

                    {/* Phone — hero element */}
                    <a
                      href="tel:+13604561886"
                      className="relative z-10 flex items-center gap-4 bg-[#8DBD42] hover:bg-[#7dac35] text-[#1a1c1e] px-6 py-5 mb-6 transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(141,189,66,0.45)] active:translate-y-0 group"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#1a1c1e]/15 flex items-center justify-center flex-shrink-0">
                        <Phone size={20} className="stroke-[2.5]" />
                      </div>
                      <div>
                        <p className="text-[13px] uppercase tracking-[0.18em] font-black opacity-70 mb-0.5">Call Now</p>
                        <p className="text-[24px] font-black tracking-tight leading-none">+1 (360) 456-1886</p>
                      </div>
                    </a>

                    {/* Email + Response time */}
                    <div className="relative z-10 space-y-4">
                      <a
                        href="mailto:office@firewaterstorm.com"
                        className="flex items-center gap-3 text-[16px] text-white hover:text-[#8DBD42] transition-colors group"
                      >
                        <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#8DBD42]/20 transition-colors">
                          <Mail size={16} className="text-[#8DBD42]" />
                        </div>
                        <span>office@firewaterstorm.com</span>
                      </a>

                      <div className="flex items-center gap-3 text-[16px] text-white">
                        <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                          <Clock size={16} className="text-[#8DBD42]" />
                        </div>
                        <span>60-min onsite response in service area</span>
                      </div>
                    </div>
                  </div>

                  {/* Lime green accent bar at bottom */}
                  <div className="h-1 w-full bg-[#8DBD42]" />
                </FadeIn>

                {/* Office Locations */}
                <FadeIn
                  className="bg-white p-8 border border-[#3F4143]/8 shadow-sm space-y-6 rounded-none hover:shadow-[0_15px_35px_rgba(0,0,0,0.03)] transition-all duration-500"
                  direction="up"
                >
                  <h3 className="text-xl font-serif font-bold text-[#3F4143] border-b border-[#3F4143]/10 pb-3">
                    Office Locations
                  </h3>

                  <div className="space-y-4 font-sans">
                    {/* Lacey */}
                    <a
                      href="https://maps.google.com/?q=8695+Martin+Way+E+Unit+103+Lacey+WA+98516"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block border border-[#3F4143]/8 bg-[#FAF9F6]/60 p-4 transition-all duration-300 hover:border-[#8DBD42]/40 hover:bg-[#8DBD42]/[0.04]"
                    >
                      <h4 className="text-xs font-black text-[#8DBD42] uppercase tracking-wider mb-2">
                        North Office (Lacey)
                      </h4>
                      <div className="flex gap-3 items-start text-base text-[#3F4143]/80">
                        <MapPin size={16} className="text-[#8DBD42] mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-semibold text-[#3F4143]">8695 Martin Way E, Unit 103</p>
                          <p>Lacey, WA 98516</p>
                          <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-[0.12em] text-[#3F4143]/45 group-hover:text-[#8DBD42] transition-colors">
                            Get Directions
                            <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </span>
                        </div>
                      </div>
                    </a>

                    {/* Chehalis */}
                    <a
                      href="https://maps.google.com/?q=1581+N.+National+Ave+Chehalis+WA+98532"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block border border-[#3F4143]/8 bg-[#FAF9F6]/60 p-4 transition-all duration-300 hover:border-[#8DBD42]/40 hover:bg-[#8DBD42]/[0.04]"
                    >
                      <h4 className="text-xs font-black text-[#8DBD42] uppercase tracking-wider mb-2">
                        South Office (Chehalis)
                      </h4>
                      <div className="flex gap-3 items-start text-base text-[#3F4143]/80">
                        <MapPin size={16} className="text-[#8DBD42] mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-semibold text-[#3F4143]">1581 N. National Ave</p>
                          <p>Chehalis, WA 98532</p>
                          <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-[0.12em] text-[#3F4143]/45 group-hover:text-[#8DBD42] transition-colors">
                            Get Directions
                            <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </span>
                        </div>
                      </div>
                    </a>
                  </div>
                </FadeIn>
              </div>

              {/* Right Column (7 cols): Secure Intake Form */}
              <div className="lg:col-span-7">
                <FadeIn
                  className="relative bg-white p-8 md:p-12 border border-[#3F4143]/8 shadow-sm rounded-none space-y-8 hover:shadow-[0_15px_35px_rgba(0,0,0,0.03)] transition-all duration-500 overflow-hidden"
                  direction="up"
                >
                  {/* Top brand green accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#8DBD42]" />
                  {/* Soft corner glow for depth */}
                  <div className="absolute right-[-70px] top-[-70px] w-60 h-60 rounded-full bg-[#8DBD42]/[0.07] blur-[70px] pointer-events-none" />
                  <div className="relative z-10 space-y-2">
                    <span className="inline-flex items-center gap-1.5 text-[#8DBD42] uppercase tracking-[0.2em] text-[10px] font-black">
                      <ShieldCheck size={13} className="stroke-[2.5]" />
                      SECURE PORTAL
                    </span>
                    <h2 className="text-3xl font-serif font-bold text-[#3F4143] leading-tight">
                      Submit an Intake Inquiry
                    </h2>
                    <p className="text-sm text-[#3F4143]/60 font-sans">
                      Please enter your contact details and claim details below.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="relative z-10 space-y-6 font-sans">
                    {/* Honeypot anti-spam field (hidden from humans) */}
                    <input
                      type="checkbox"
                      name="botcheck"
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                      aria-hidden="true"
                    />

                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200 text-red-700 font-semibold text-sm text-center rounded-none">
                        {error}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="text-xs font-bold uppercase tracking-wider text-[#3F4143]/70"
                        >
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-white border border-[#3F4143]/15 focus:border-[#8DBD42] focus:ring-1 focus:ring-[#8DBD42] focus:outline-none p-3.5 transition-all duration-300 text-sm rounded-none shadow-sm hover:border-[#3F4143]/30"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <label
                          htmlFor="phone"
                          className="text-xs font-bold uppercase tracking-wider text-[#3F4143]/70"
                        >
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-white border border-[#3F4143]/15 focus:border-[#8DBD42] focus:ring-1 focus:ring-[#8DBD42] focus:outline-none p-3.5 transition-all duration-300 text-sm rounded-none shadow-sm hover:border-[#3F4143]/30"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Email */}
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-xs font-bold uppercase tracking-wider text-[#3F4143]/70"
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-white border border-[#3F4143]/15 focus:border-[#8DBD42] focus:ring-1 focus:ring-[#8DBD42] focus:outline-none p-3.5 transition-all duration-300 text-sm rounded-none shadow-sm hover:border-[#3F4143]/30"
                        />
                      </div>

                      {/* Service Choice */}
                      <div className="space-y-2">
                        <label
                          htmlFor="service"
                          className="text-xs font-bold uppercase tracking-wider text-[#3F4143]/70"
                        >
                          Restoration Service
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full bg-white border border-[#3F4143]/15 focus:border-[#8DBD42] focus:ring-1 focus:ring-[#8DBD42] focus:outline-none p-3.5 transition-all duration-300 text-sm rounded-none shadow-sm hover:border-[#3F4143]/30 appearance-none cursor-pointer"
                        >
                          <option value="">Select a service category...</option>
                          <option value="fire">Fire Damage Restoration</option>
                          <option value="water">Water Damage Mitigation</option>
                          <option value="storm">Storm Damage Recovery</option>
                          <option value="contents">
                            Contents Pack-Out & Clean
                          </option>
                          <option value="other">
                            General Inquiry / Assessment
                          </option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-xs font-bold uppercase tracking-wider text-[#3F4143]/70"
                      >
                        Describe the Loss or Request *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-white border border-[#3F4143]/15 focus:border-[#8DBD42] focus:ring-1 focus:ring-[#8DBD42] focus:outline-none p-3.5 transition-all duration-300 text-sm rounded-none shadow-sm hover:border-[#3F4143]/30 resize-y"
                        placeholder="Please details the current situation (e.g. active water leak, soot damage, insurance claim opened)..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={sending}
                      className="bg-[#3F4143] hover:bg-[#252628] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 px-8 uppercase tracking-[0.15em] text-xs transition-colors rounded-none w-full flex items-center justify-center gap-2"
                    >
                      <Send size={14} />{" "}
                      {sending ? "Sending..." : "Submit Secured Intake"}
                    </button>
                  </form>
                </FadeIn>

                {/* Reassurance strip — under the form */}
                <FadeIn
                  className="mt-6 grid grid-cols-1 sm:grid-cols-3 border border-[#3F4143]/8 bg-white shadow-sm rounded-none divide-y sm:divide-y-0 sm:divide-x divide-[#3F4143]/8"
                  direction="up"
                >
                  {[
                    { icon: <Clock size={16} />, title: "1 Business Day Reply", desc: "Non-emergency intake inquiries answered promptly." },
                    { icon: <ShieldCheck size={16} />, title: "Licensed, Bonded & Insured", desc: "Washington State general contractor since 2004." },
                    { icon: <BadgeCheck size={16} />, title: "Direct Insurance Billing", desc: "We coordinate the claim — you pay your deductible." },
                  ].map(item => (
                    <div key={item.title} className="flex flex-col gap-2.5 p-5">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-[#8DBD42]/10 text-[#145126] flex-shrink-0">
                        {item.icon}
                      </span>
                      <div>
                        <p className="text-[14px] font-black text-[#3F4143] leading-tight">{item.title}</p>
                        <p className="text-[13px] text-[#3F4143]/55 leading-snug mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </FadeIn>
              </div>
            </div>
          </Container>
        </Section>

        {/* Trust badges — bottom of page above footer */}
        <div className="bg-white border-t border-gray-100">
          <div className="max-w-[900px] mx-auto px-8 py-14 md:py-16 text-center">
            <p className="text-[11px] uppercase tracking-[0.2em] font-black text-[#8DBD42] mb-10">
              Why Homeowners Trust Heritage
            </p>
            <div className="flex items-center justify-center gap-10 md:gap-20 mb-10">
              {[
                {
                  src: "/photo/emergency-badge-new-2.png",
                  alt: "24 HR Emergency Response",
                  title: "24/7 Emergency Response",
                  desc: "We answer every call — day or night, weekends and holidays.",
                },
                {
                  src: "/photo/iicrc-badge-new-3.png",
                  alt: "IICRC Certified",
                  title: "IICRC Certified",
                  desc: "Industry-leading certification for water, fire, and mold restoration.",
                },
                {
                  src: "/photo/warranty-badge-new-3.png",
                  alt: "5-Year Warranty",
                  title: "5-Year Warranty",
                  desc: "Every repair backed by our written 5-year workmanship guarantee.",
                },
              ].map((badge) => (
                <div key={badge.alt} className="flex flex-col items-center gap-4">
                  <img
                    src={badge.src}
                    alt={badge.alt}
                    className="h-24 md:h-28 w-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.18)]"
                  />
                  <p className="text-[13px] font-black text-[#1a1c1e] uppercase tracking-[0.1em] text-center">
                    {badge.title}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-[13px] text-[#3F4143]/45 max-w-[520px] mx-auto leading-relaxed">
              Heritage Restoration has served Western Washington since 2004 — locally owned, licensed &amp; bonded, and committed to protecting homeowners through every step of recovery.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
