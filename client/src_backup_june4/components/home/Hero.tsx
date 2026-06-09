import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      // Animating the text blocks on the overlapping card
      tl.fromTo(
        cardRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
        .fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.5, ease: "power3.inOut" },
          "-=0.4"
        )
        .fromTo(
          headlineRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          subRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(
          ctaRef.current,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" },
          "-=0.25"
        )
        .fromTo(
          badgesRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4 },
          "-=0.2"
        );

      // Parallax effect on the background banner image
      gsap.to(bgRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full bg-brand-linen pt-[110px] lg:pt-[188px]"
    >
      {/* Upper Panoramic Photographic Banner (55vh height) */}
      <div className="relative h-[55vh] w-full overflow-hidden">
        {/* Background Parallax Image */}
        <div
          ref={bgRef}
          className="absolute inset-0 w-full h-[120%] -top-[10%] bg-cover bg-center"
          style={{
            backgroundImage: "url('/photo/heritage-hero-editorial.png')",
          }}
        />
        {/* Subtle premium dark organic overlay to mesh with brand colors */}
        <div className="absolute inset-0 bg-[#3F4143]/20" />
      </div>

      {/* Lower Card - Overlapping Content Block */}
      <div className="page-container relative z-10 px-4 md:px-8">
        <div
          ref={cardRef}
          style={{ opacity: 0 }}
          className="w-full max-w-4xl mx-auto -mt-20 md:-mt-32 p-8 md:py-16 md:px-0 bg-transparent"
        >
          {/* Subtitle / Overline */}
          <span className="overline-label mb-4 text-brand-green">
            Southwest Washington's Premier Restoration
          </span>

          {/* Sharp Green Accent Line (0px border-radius) */}
          <div
            ref={lineRef}
            style={{
              width: 52,
              height: 3,
              backgroundColor: "var(--color-brand-green)",
              borderRadius: 0,
              marginBottom: "1.5rem",
              transform: "scaleX(0)",
              transformOrigin: "left center",
            }}
          />

          {/* Headline */}
          <h1
            ref={headlineRef}
            style={{ opacity: 0 }}
            className="font-serif text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-brand-charcoal mb-6"
          >
            Restoring Your Home. <br />
            <span className="text-brand-green italic font-normal">
              Restoring Your Peace
            </span>{" "}
            of Mind.
          </h1>

          {/* Subheading/Body Copy */}
          <p
            ref={subRef}
            style={{ opacity: 0 }}
            className="font-sans text-brand-ink text-base md:text-lg font-light leading-relaxed mb-8 max-w-2xl"
          >
            Professional fire, water &amp; storm damage restoration available
            24/7. Locally owned since 2004. Serving Thurston, Lewis, and
            surrounding counties with integrity.
          </p>

          {/* Call to Actions (CTAs) */}
          <div
            ref={ctaRef}
            style={{ opacity: 0 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 mb-10"
          >
            {/* Primary CTA: Solid brand-charcoal, zero border radius, uppercase, hover brand-green */}
            <a
              href="tel:3604561015"
              style={{ borderRadius: 0 }}
              className="inline-flex items-center justify-center gap-3 bg-brand-charcoal text-brand-linen font-sans font-semibold text-xs tracking-widest uppercase px-8 py-5 transition-all duration-300 hover:bg-brand-green hover:text-brand-linen"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.3 1L6.6 10.8z" />
              </svg>
              Emergency: (360) 456-1015
            </a>

            {/* Secondary CTA: Inline flat brand-ink text link with green arrow that shifts right on hover */}
            <a
              href="#services"
              className="group inline-flex items-center justify-center gap-2 text-brand-ink hover:text-brand-green font-sans font-medium text-sm tracking-wide transition-colors py-2"
            >
              Explore Services
              <span className="text-brand-green font-semibold text-base transition-transform duration-300 group-hover:translate-x-1 inline-block">
                →
              </span>
            </a>
          </div>

          {/* Trust Badges Row (Zero border radius green dots) */}
          <div
            ref={badgesRef}
            style={{ opacity: 0 }}
            className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-6 border-t border-brand-stone"
          >
            {[
              "IICRC Certified",
              "Licensed & Bonded",
              "Est. 2004",
              "Lic. #HERITRI964J2",
            ].map(badge => (
              <span
                key={badge}
                className="flex items-center gap-2 font-sans text-[10px] md:text-[11px] tracking-widest uppercase text-brand-charcoal/60"
              >
                {/* 4x4px sharp green square dot */}
                <span className="w-1.5 h-1.5 bg-brand-green inline-block" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Spacious bottom padding for transitions */}
      <div className="h-16 md:h-24 bg-brand-linen" />
    </section>
  );
}
