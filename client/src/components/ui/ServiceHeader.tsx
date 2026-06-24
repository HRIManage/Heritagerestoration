// ServiceHeader.tsx – Reusable hero section for service-area pages
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Phone } from "lucide-react";

type ServiceHeaderProps = {
  title: string;
  subtitle: string;
  heroImg: string;
  ctaText?: string;
  ctaLink?: string;
};

export default function ServiceHeader({
  title,
  subtitle,
  heroImg,
  ctaText,
  ctaLink,
}: ServiceHeaderProps) {
  return (
    <section className="relative text-white overflow-hidden min-h-[380px] md:min-h-[480px]">
      {/* Background image */}
      <img
        src={heroImg}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.75]"
      />
      {/* Dark green gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(14,27,17,0.92) 0%, rgba(20,38,24,0.70) 30%, rgba(20,38,24,0.25) 55%, rgba(14,27,17,0.05) 100%)",
        }}
      />
      {/* Bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0E1B11]/40 via-transparent to-transparent" />

      <div className="relative z-10 grid lg:grid-cols-12 min-h-[380px] md:min-h-[480px]">
        <div className="lg:col-span-7 flex flex-col justify-center px-6 py-10 md:py-16 max-w-[720px] mx-auto lg:mx-0 lg:pl-16">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-4 text-sm text-white/80">
            <Link href="/" className="text-[#8DBD42] hover:underline">
              Home
            </Link>{" "}
            /{" "}
            <Link href="/service-areas" className="text-[#8DBD42] hover:underline">
              Services
            </Link>{" "}
            / <span>{title}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-serif">
            {title}
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/85 max-w-xl">
            {subtitle}
          </p>
          {ctaText && ctaLink && (
            <Link
              href={ctaLink}
              className="mt-8 inline-flex items-center gap-2 bg-[#8DBD42] hover:bg-[#7BC034] text-white font-bold px-8 py-4 uppercase tracking-[0.14em] text-xs transition-colors rounded-none shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DBD42]"
            >
              <Phone size={16} /> {ctaText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
