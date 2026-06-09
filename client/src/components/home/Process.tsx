import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    phase: "Discover",
    title: "Assessment & Claims",
    desc: "Immediate 24/7 emergency response, thermal moisture mapping, and complete damage documentation to kickstart your insurance claim.",
  },
  {
    num: "02",
    phase: "Design",
    title: "Scope & Specifications",
    desc: "Detailed restoration planning, layout drafting, architectural review, and direct alignment with insurance adjusters for budget approvals.",
  },
  {
    num: "03",
    phase: "Build",
    title: "Structural Reconstruction",
    desc: "Professional restoration construction, specialized smoke/mold remediation, framing, drywall, and high-end finish work.",
  },
  {
    num: "04",
    phase: "Deliver",
    title: "Final Handover",
    desc: "Deep cleaning, contents placement, final QA inspection checkpoint, and official walkthrough to deliver your fully restored property.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".process-card");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="py-24 md:py-32 bg-white border-b border-brand-stone"
    >
      <div className="page-container">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 md:mb-24">
          <span className="overline-label mb-3 text-brand-green">
            Recovery Pathway
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-brand-charcoal leading-tight">
            Our Restoration Process
          </h2>
          <div className="w-12 h-[2px] bg-brand-green mx-auto mt-6" />
        </div>

        {/* 4-Step Grid with Vertical Dividers */}
        <div
          ref={stepsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 pt-16 border-t border-brand-stone"
        >
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="process-card bg-transparent transition-all duration-300 relative group flex flex-col justify-between"
              style={{ opacity: 0 }}
            >
              <div>
                {/* Step Phase Title & Number */}
                <div className="flex justify-between items-baseline mb-8">
                  <span className="font-sans text-xs tracking-widest uppercase text-brand-green font-semibold">
                    {step.phase}
                  </span>
                  <span className="font-serif text-3xl font-light text-brand-charcoal/30">
                    {step.num}
                  </span>
                </div>

                {/* Step Header */}
                <h3 className="font-serif text-xl font-semibold text-brand-charcoal mb-4 leading-snug">
                  {step.title}
                </h3>

                {/* Step Copy */}
                <p className="font-sans text-brand-ink text-sm md:text-base font-light leading-relaxed mb-6">
                  {step.desc}
                </p>
              </div>

              {/* Minimalist interactive accent dot at bottom of card */}
              <div className="h-[2px] w-0 bg-brand-green transition-all duration-300 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
