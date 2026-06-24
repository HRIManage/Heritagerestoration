import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";

interface LegalLayoutProps {
  title: string;
  description: string;
  canonical: string;
  updated: string;
  children: ReactNode;
}

export default function LegalLayout({
  title,
  description,
  canonical,
  updated,
  children,
}: LegalLayoutProps) {
  return (
    <Layout>
      <Helmet>
        <title>{title} | Heritage Restoration</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* Hero band */}
      <section className="relative pt-[calc(112px+2rem)] sm:pt-[calc(116px+2rem)] lg:pt-[calc(152px+2rem)] pb-10 md:pb-14 bg-gradient-to-br from-[#1A311F] via-[#142618] to-[#0E1B11] text-white overflow-hidden border-b border-[#8DBD42]/20">
        <Container>
          <FadeIn direction="up">
            <span className="text-[#8DBD42] uppercase tracking-[0.25em] text-xs font-black block mb-4">
              Legal
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-serif">
              {title}
            </h1>
            <p className="mt-4 text-sm text-white/70 font-sans">
              Last updated: {updated}
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Body */}
      <section className="py-12 md:py-16 bg-white">
        <Container size="narrow">
          <FadeIn direction="up">
            <div className="legal-prose space-y-6 text-[#3F4143]/85 font-sans text-[15px] md:text-base leading-relaxed">
              {children}
            </div>
          </FadeIn>
        </Container>
      </section>
    </Layout>
  );
}
