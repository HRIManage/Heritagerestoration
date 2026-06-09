import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );
      gsap.fromTo(
        rightRef.current,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white py-24 md:py-32 border-b border-brand-stone"
    >
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (Logo/Title Area) */}
          <div ref={leftRef} className="lg:col-span-5" style={{ opacity: 0 }}>
            <span className="overline-label mb-3 text-brand-green">
              Who We Are
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-brand-charcoal leading-tight">
              Your Property Restoration Experts.
            </h2>
            <div className="w-12 h-[2px] bg-brand-green mt-6 mb-8" />
          </div>

          {/* Right Column (Editorial Text & Ghost Links) */}
          <div
            ref={rightRef}
            className="lg:col-span-7 space-y-6"
            style={{ opacity: 0 }}
          >
            <p className="font-sans text-brand-ink text-base md:text-lg font-light leading-relaxed">
              When disaster strikes your home or business, the path to recovery
              can feel overwhelming. At Heritage Restoration, we specialize in
              transforming chaos into absolute clarity. Since 2004, our team of
              IICRC-certified professionals has guided property owners through
              the complex process of fire reconstruction, advanced moisture
              mitigation, and storm damage stabilization.
            </p>

            <p className="font-sans text-brand-ink text-base md:text-lg font-light leading-relaxed">
              We operate as your dedicated advocate, working directly with
              insurance providers to navigate complex claims and ensure your
              property is restored to its pre-loss state with zero compromise.
              We don't just rebuild structures; we restore peace of mind.
            </p>

            {/* Underlined Ghost Links with fine border-b that hover transition to green */}
            <div className="flex flex-wrap gap-x-8 gap-y-4 pt-6">
              <a
                href="#contact"
                className="inline-block border-b border-brand-stone pb-1.5 hover:border-brand-green hover:text-brand-green text-brand-charcoal font-sans font-medium text-xs tracking-widest uppercase transition-all duration-300"
              >
                Insurance Claims Guide &nbsp;→
              </a>
              <a
                href="#process"
                className="inline-block border-b border-brand-stone pb-1.5 hover:border-brand-green hover:text-brand-green text-brand-charcoal font-sans font-medium text-xs tracking-widest uppercase transition-all duration-300"
              >
                Our Quality Commitment &nbsp;→
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
