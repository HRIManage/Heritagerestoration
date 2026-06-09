import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Structural Fire Reconstruction",
    subtitle: "Fire & Smoke Damage",
    desc: "Complete fire damage assessment, smoke and soot removal, structural drying, and full interior/exterior reconstruction.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Advanced Moisture Mitigation",
    subtitle: "Water Damage",
    desc: "Emergency water extraction, industrial drying, mold prevention, and structural repairs with 3D moisture mapping.",
    img: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Emergency Structural Stabilization",
    subtitle: "Storm Damage",
    desc: "Rapid response roof tarping, board-up, structural bracing, and full storm damage reconstruction.",
    img: "https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Contents Restoration & Cleaning",
    subtitle: "Specialty Cleaning",
    desc: "Furniture, textiles, electronics, and heirloom item restoration using ultrasonic and ozone treatment.",
    img: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&q=80&w=800",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
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
      id="services"
      className="py-24 md:py-32 bg-brand-linen border-b border-brand-stone"
    >
      <div className="page-container">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 md:mb-24">
          <span className="overline-label mb-3 text-brand-green">
            Our Expertise
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-brand-charcoal leading-tight mb-6">
            Architectural Recovery <br />
            &amp; Restoration Services
          </h2>
          <div className="w-12 h-[2px] bg-brand-green mb-6" />
          <p className="font-sans text-brand-ink text-base md:text-lg font-light leading-relaxed">
            From emergency response to final walkthrough. We offer full-spectrum
            property restoration managed with technical precision, empathy, and
            absolute care.
          </p>
        </div>

        {/* Services Grid (Zero border radius) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {services.map((svc, i) => (
            <div
              key={svc.title}
              ref={el => {
                cardRefs.current[i] = el;
              }}
              className="group bg-transparent transition-all duration-300 relative"
              style={{
                borderRadius: 0,
                opacity: 0,
              }}
            >
              {/* Image Grid Block (Grayscale on normal, full color on hover, 0px border-radius) */}
              <div className="h-64 md:h-80 overflow-hidden relative mb-6">
                <div
                  className="w-full h-full bg-cover bg-center transition-all duration-700 hover:scale-105"
                  style={{
                    backgroundImage: `url('${svc.img}')`,
                    filter: "grayscale(100%) brightness(0.95)",
                    transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.filter = "grayscale(0%) brightness(1)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.filter = "grayscale(100%) brightness(0.95)";
                  }}
                />
              </div>

              {/* Content Panel - Borderless inline styling */}
              <div className="pt-2">
                <span className="font-sans text-[10px] tracking-widest uppercase text-brand-green font-semibold block mb-2">
                  {svc.subtitle}
                </span>

                <h3 className="font-serif text-2xl font-semibold text-brand-charcoal leading-tight mb-3">
                  {svc.title}
                </h3>

                <p className="font-sans text-brand-ink text-sm md:text-base font-light leading-relaxed mb-4 max-w-xl">
                  {svc.desc}
                </p>

                {/* Secondary/Ghost Action Style Link: Arrow shifts 4px on hover */}
                <div className="inline-flex items-center gap-2 text-brand-charcoal group-hover:text-brand-green font-sans font-medium text-xs tracking-wider uppercase transition-colors">
                  Learn More
                  <span className="text-brand-green font-semibold text-base transition-transform duration-300 group-hover:translate-x-1 inline-block">
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
