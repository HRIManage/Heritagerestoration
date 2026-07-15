import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Shield,
  BadgeCheck,
  Zap,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";
import Layout from "@/components/layout/Layout";
import FadeIn from "@/components/ui/FadeIn";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

// Web3Forms — free, unlimited, no backend required (works on static Vercel hosting).
// Get a free access key at https://web3forms.com (enter office@firewaterstorm.com)
// and paste it below. Submissions are emailed to that address.
const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";

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
    if (WEB3FORMS_ACCESS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY") {
      const subject = encodeURIComponent(
        `Intake Inquiry - ${formData.service || "General"} - ${formData.name}`
      );
      const body = encodeURIComponent(
        `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nService: ${formData.service}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:office@firewaterstorm.com?subject=${subject}&body=${body}`;
      return;
    }

    setSending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New Intake Inquiry - ${formData.service || "General"} - ${formData.name}`,
          from_name: "Heritage Restoration Website",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
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

  const inputClass =
    "w-full bg-[#FAFAF8] border border-[#3F4143]/12 focus:border-[#8DBD42] focus:ring-2 focus:ring-[#8DBD42]/20 focus:outline-none px-4 py-3.5 transition-all duration-300 text-[15px] text-[#2F3335] rounded-none placeholder:text-[#3F4143]/35 hover:border-[#3F4143]/25";

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

      <div className="min-h-screen bg-[#F7F4EE]">
        {/* Hero */}
        <section className="relative pt-[calc(112px+2rem)] sm:pt-[calc(116px+2rem)] lg:pt-[calc(120px+3rem)] pb-14 md:pb-20 bg-[#0f1f11] text-white overflow-hidden">
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#145126]/90 via-[#0f1a10] to-[#0a1209] pointer-events-none" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#8DBD42]/8 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#8DBD42]/5 blur-[100px] pointer-events-none" />

          <Container>
            <FadeIn className="relative z-10 max-w-3xl" direction="up">
              <p className="inline-flex items-center gap-2.5 text-[#8DBD42] uppercase tracking-[0.22em] text-[11px] font-black mb-5">
                <span className="w-5 h-px bg-[#8DBD42]" />
                Get In Touch
              </p>
              <h1 className="text-[2.6rem] md:text-[3.5rem] lg:text-[4.2rem] font-bold leading-[1.04] font-serif mb-6 text-white">
                We're Here When
                <br />
                <span className="text-[#8DBD42]">You Need Us Most.</span>
              </h1>
              <p className="text-[17px] md:text-[18px] text-white/75 leading-relaxed font-light max-w-[560px]">
                Available 24/7 for emergency dispatch and structural secures.
                For non-emergencies, submit an intake form below and our team
                will follow up within 1 business day.
              </p>
            </FadeIn>
          </Container>
        </section>

        {/* Ticker strip */}
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
                  "5-Year Warranty",
                ].map(item => (
                  <span key={item} className="flex items-center">
                    <span className="px-7 font-black text-[14px] md:text-[15px] uppercase tracking-[0.18em] text-[#145126]">
                      {item}
                    </span>
                    <span className="text-[#145126]/30 text-[10px]">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Main form + info section */}
        <Section bg="none" className="!py-14 md:!py-20">
          <Container>
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* ── LEFT: Sticky sidebar ── */}
              <div className="lg:col-span-5 lg:sticky lg:top-28 self-start space-y-6">
                {/* Emergency call card */}
                <FadeIn direction="up">
                  <div className="bg-[#145126] overflow-hidden relative">
                    {/* Glow accents */}
                    <div className="absolute right-[-40px] top-[-40px] w-64 h-64 rounded-full bg-[#8DBD42]/12 blur-[80px] pointer-events-none" />
                    <div className="absolute left-[-20px] bottom-[-20px] w-40 h-40 rounded-full bg-[#8DBD42]/8 blur-[60px] pointer-events-none" />

                    <div className="relative z-10 p-7 md:p-9">
                      {/* Label */}
                      <div className="flex items-center gap-3 mb-6">
                        <span className="w-5 h-px bg-[#8DBD42]" />
                        <span className="text-[#8DBD42] uppercase tracking-[0.22em] text-[11px] font-black">
                          Emergency Dispatch
                        </span>
                      </div>

                      <h3 className="text-[28px] md:text-[32px] font-bold leading-tight font-serif text-white mb-2">
                        24/7 Urgent Hotline
                      </h3>
                      <p className="text-white/65 text-[15px] mb-7">
                        Day, night, weekends &amp; holidays — we answer.
                      </p>

                      {/* Phone CTA */}
                      <a
                        href="tel:+13604561886"
                        className="flex items-center gap-4 bg-[#8DBD42] hover:bg-[#97cf4f] text-[#145126] px-5 py-4 mb-6 transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(141,189,66,0.45)] active:translate-y-0 group"
                      >
                        <div className="w-10 h-10 rounded-full bg-[#145126]/15 flex items-center justify-center flex-shrink-0">
                          <Phone size={18} className="stroke-[2.5]" />
                        </div>
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.18em] font-black opacity-70 mb-0.5">
                            Call Now — Free
                          </p>
                          <p className="text-[22px] font-black tracking-tight leading-none">
                            (360) 456-1886
                          </p>
                        </div>
                      </a>

                      {/* Email + response time */}
                      <div className="space-y-3">
                        <a
                          href="mailto:office@firewaterstorm.com"
                          className="flex items-center gap-3 text-[15px] text-white/80 hover:text-[#8DBD42] transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#8DBD42]/20 transition-colors">
                            <Mail size={14} className="text-[#8DBD42]" />
                          </div>
                          <span>office@firewaterstorm.com</span>
                        </a>

                        <div className="flex items-center gap-3 text-[15px] text-white/80">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                            <Clock size={14} className="text-[#8DBD42]" />
                          </div>
                          <span>60-min onsite response in service area</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom accent bar */}
                    <div className="h-[3px] w-full bg-[#8DBD42]" />
                  </div>
                </FadeIn>

                {/* Office locations card */}
                <FadeIn
                  className="bg-white p-7 md:p-8 border border-[#3F4143]/8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] space-y-5"
                  direction="up"
                >
                  <h3 className="text-[16px] font-black uppercase tracking-[0.14em] text-[#2F3335] border-b border-[#3F4143]/10 pb-4">
                    Office Locations
                  </h3>

                  <div className="space-y-5">
                    {/* North */}
                    <div>
                      <p className="text-[11px] font-black text-[#8DBD42] uppercase tracking-[0.18em] mb-2">
                        North Office — Lacey
                      </p>
                      <div className="flex gap-3 items-start text-[14px] text-[#3F4143]/75">
                        <MapPin
                          size={14}
                          className="text-[#8DBD42] mt-0.5 flex-shrink-0"
                        />
                        <div>
                          <a
                            href="https://maps.google.com/?q=8695+Martin+Way+E+Unit+103+Lacey+WA+98516"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-[#2F3335] hover:text-[#8DBD42] transition-colors block"
                          >
                            8695 Martin Way E, Unit 103
                          </a>
                          <span>Lacey, WA 98516</span>
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-[#3F4143]/8" />

                    {/* South */}
                    <div>
                      <p className="text-[11px] font-black text-[#8DBD42] uppercase tracking-[0.18em] mb-2">
                        South Office — Chehalis
                      </p>
                      <div className="flex gap-3 items-start text-[14px] text-[#3F4143]/75">
                        <MapPin
                          size={14}
                          className="text-[#8DBD42] mt-0.5 flex-shrink-0"
                        />
                        <div>
                          <a
                            href="https://maps.google.com/?q=1581+N.+National+Ave+Chehalis+WA+98532"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-[#2F3335] hover:text-[#8DBD42] transition-colors block"
                          >
                            1581 N. National Ave
                          </a>
                          <span>Chehalis, WA 98532</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>

                {/* Trust pills */}
                <FadeIn direction="up" className="grid grid-cols-3 gap-3">
                  {[
                    { icon: <Zap size={15} />, label: "24/7 Response" },
                    { icon: <Shield size={15} />, label: "5-Yr Warranty" },
                    {
                      icon: <BadgeCheck size={15} />,
                      label: "IICRC Certified",
                    },
                  ].map(pill => (
                    <div
                      key={pill.label}
                      className="bg-white border border-[#3F4143]/8 flex flex-col items-center gap-2 py-4 px-2 text-center shadow-sm"
                    >
                      <span className="text-[#8DBD42]">{pill.icon}</span>
                      <span className="text-[10px] font-black uppercase tracking-[0.1em] text-[#3F4143]/70 leading-tight">
                        {pill.label}
                      </span>
                    </div>
                  ))}
                </FadeIn>
              </div>

              {/* ── RIGHT: Intake form ── */}
              <div className="lg:col-span-7">
                <FadeIn
                  className="relative bg-white border border-[#3F4143]/8 shadow-[0_8px_40px_rgba(0,0,0,0.05)] overflow-hidden"
                  direction="up"
                >
                  {/* Top accent bar */}
                  <div className="h-[3px] w-full bg-[#8DBD42]" />

                  <div className="p-8 md:p-12 space-y-8">
                    {/* Form header */}
                    <div className="space-y-2">
                      <span className="text-[#8DBD42] uppercase tracking-[0.22em] text-[11px] font-black block">
                        Secure Portal
                      </span>
                      <h2 className="text-[28px] md:text-[32px] font-serif font-bold text-[#2F3335] leading-tight">
                        Submit an Intake Inquiry
                      </h2>
                      <p className="text-[14px] text-[#3F4143]/55 leading-relaxed">
                        Fill in the details below and our team will reach out
                        within 1 business day. For emergencies, call us
                        directly.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Honeypot anti-spam field */}
                      <input
                        type="checkbox"
                        name="botcheck"
                        tabIndex={-1}
                        autoComplete="off"
                        className="hidden"
                        aria-hidden="true"
                      />

                      {error && (
                        <div className="p-4 bg-red-50 border border-red-200 text-red-700 font-semibold text-sm text-center">
                          {error}
                        </div>
                      )}

                      {/* Name + Phone */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label
                            htmlFor="name"
                            className="text-[11px] font-black uppercase tracking-[0.12em] text-[#3F4143]/60"
                          >
                            Full Name <span className="text-[#8DBD42]">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            placeholder="John Smith"
                            value={formData.name}
                            onChange={handleChange}
                            className={inputClass}
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label
                            htmlFor="phone"
                            className="text-[11px] font-black uppercase tracking-[0.12em] text-[#3F4143]/60"
                          >
                            Phone Number{" "}
                            <span className="text-[#8DBD42]">*</span>
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            placeholder="(360) 000-0000"
                            value={formData.phone}
                            onChange={handleChange}
                            className={inputClass}
                          />
                        </div>
                      </div>

                      {/* Email + Service */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label
                            htmlFor="email"
                            className="text-[11px] font-black uppercase tracking-[0.12em] text-[#3F4143]/60"
                          >
                            Email Address{" "}
                            <span className="text-[#8DBD42]">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className={inputClass}
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label
                            htmlFor="service"
                            className="text-[11px] font-black uppercase tracking-[0.12em] text-[#3F4143]/60"
                          >
                            Restoration Service
                          </label>
                          <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className={`${inputClass} cursor-pointer appearance-none`}
                          >
                            <option value="">
                              Select a service category...
                            </option>
                            <option value="fire">
                              Fire Damage Restoration
                            </option>
                            <option value="water">
                              Water Damage Mitigation
                            </option>
                            <option value="storm">Storm Damage Recovery</option>
                            <option value="contents">
                              Contents Pack-Out &amp; Clean
                            </option>
                            <option value="other">
                              General Inquiry / Assessment
                            </option>
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="message"
                          className="text-[11px] font-black uppercase tracking-[0.12em] text-[#3F4143]/60"
                        >
                          Describe the Loss or Request{" "}
                          <span className="text-[#8DBD42]">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={6}
                          value={formData.message}
                          onChange={handleChange}
                          className={`${inputClass} resize-y`}
                          placeholder="Please describe the current situation (e.g. active water leak, soot damage, insurance claim opened)..."
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={sending}
                        className="w-full bg-[#145126] hover:bg-[#1a6932] disabled:opacity-60 disabled:cursor-not-allowed text-white font-black py-4 px-8 uppercase tracking-[0.16em] text-[12px] transition-all duration-300 flex items-center justify-center gap-2.5 hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(20,81,38,0.3)] active:translate-y-0"
                      >
                        <Send size={13} />
                        {sending ? "Sending..." : "Submit Intake Request"}
                      </button>

                      <p className="text-[11px] text-[#3F4143]/40 text-center leading-relaxed">
                        By submitting you agree to be contacted by our team. We
                        never share your information.
                      </p>
                    </form>
                  </div>
                </FadeIn>
              </div>
            </div>
          </Container>
        </Section>

        {/* Trust badges — bottom of page */}
        <div className="bg-white border-t border-gray-100">
          <div className="max-w-[860px] mx-auto px-8 py-14 md:py-16 text-center">
            <p className="text-[11px] uppercase tracking-[0.22em] font-black text-[#8DBD42] mb-10">
              Why Homeowners Trust Heritage
            </p>
            <div className="flex items-center justify-center gap-10 md:gap-20 mb-10">
              {[
                {
                  src: "/photo/emergency-badge-new-2.png",
                  alt: "24 HR Emergency Response",
                  title: "24/7 Emergency Response",
                },
                {
                  src: "/photo/iicrc-badge-new-3.png",
                  alt: "IICRC Certified",
                  title: "IICRC Certified",
                },
                {
                  src: "/photo/warranty-badge-new-3.png",
                  alt: "5-Year Warranty",
                  title: "5-Year Warranty",
                },
              ].map(badge => (
                <div
                  key={badge.alt}
                  className="flex flex-col items-center gap-3"
                >
                  <img
                    src={badge.src}
                    alt={badge.alt}
                    className="h-20 md:h-24 w-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                  />
                  <p className="text-[11px] font-black text-[#2F3335] uppercase tracking-[0.1em] text-center">
                    {badge.title}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-[13px] text-[#3F4143]/45 max-w-[520px] mx-auto leading-relaxed">
              Heritage Restoration has served Western Washington since 2004 —
              locally owned, licensed &amp; bonded, and committed to protecting
              homeowners through every step of recovery.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
