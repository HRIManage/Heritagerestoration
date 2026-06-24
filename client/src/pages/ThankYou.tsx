import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { CheckCircle, Phone, ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import { trackLead } from "@/lib/analytics";

export default function ThankYou() {
  // Fire the lead conversion across GA4 / Google Ads / Meta Pixel once.
  useEffect(() => {
    trackLead("contact_form");
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Thank You | Heritage Restoration</title>
        <meta name="description" content="Your request has been received." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <section className="relative min-h-[70vh] flex items-center pt-[calc(112px+2rem)] sm:pt-[calc(116px+2rem)] lg:pt-[calc(152px+2rem)] pb-16 bg-gradient-to-br from-[#1A311F] via-[#142618] to-[#0E1B11] text-white overflow-hidden">
        <div className="absolute top-[15%] right-[-8%] w-[460px] h-[460px] rounded-full bg-[#8DBD42]/10 blur-[140px] pointer-events-none" />
        <Container size="narrow" className="relative z-10">
          <FadeIn direction="up" className="max-w-2xl">
            <div className="w-16 h-16 rounded-full bg-[#8DBD42]/15 border border-[#8DBD42]/40 flex items-center justify-center mb-8">
              <CheckCircle size={32} className="text-[#8DBD42]" />
            </div>
            <span className="text-[#8DBD42] uppercase tracking-[0.25em] text-xs font-black block mb-4">
              Request Received
            </span>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight font-serif mb-6">
              Thank you — we'll be in touch shortly.
            </h1>
            <p className="text-base md:text-lg text-white/80 leading-relaxed font-sans font-light mb-10">
              Our office team will follow up within 1 business day. If this is an
              active emergency, please call our 24/7 hotline now — we respond
              within 60 minutes in our service area.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+13604561886"
                className="inline-flex items-center justify-center gap-2 bg-[#8DBD42] hover:bg-[#97cf4f] text-[#1A311F] px-8 py-4 uppercase tracking-[0.14em] text-xs font-black transition-colors"
              >
                <Phone size={16} /> 24/7 Hotline: (360) 456-1886
              </a>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-[#8DBD42] hover:text-[#8DBD42] text-white px-8 py-4 uppercase tracking-[0.14em] text-xs font-bold transition-colors"
              >
                <ArrowLeft size={16} /> Back to Home
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>
    </Layout>
  );
}
