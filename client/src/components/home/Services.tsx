import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "wouter";
import { Flame, Droplets, Wind, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Structural Fire Reconstruction",
    subtitle: "Fire & Smoke Damage",
    desc: "Complete fire damage assessment, smoke and soot removal, structural drying, and full interior/exterior reconstruction.",
    icon: Flame,
    link: "/services/fire-restoration",
  },
  {
    title: "Advanced Moisture Mitigation",
    subtitle: "Water Damage",
    desc: "Emergency water extraction, industrial drying, mold prevention, and structural repairs with 3D moisture mapping.",
    icon: Droplets,
    link: "/services/water-restoration",
  },
  {
    title: "Emergency Structural Stabilization",
    subtitle: "Storm Damage",
    desc: "Rapid response roof tarping, board-up, structural bracing, and full storm damage reconstruction.",
    icon: Wind,
    link: "/services/storm-recovery",
  },
  {
    title: "Contents Restoration & Cleaning",
    subtitle: "Specialty Cleaning",
    desc: "Furniture, textiles, electronics, and heirloom item restoration using ultrasonic and ozone treatment.",
    icon: Sparkles,
    link: "/services/contents-services",
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
              className="h-full"
              style={{
                opacity: 0,
              }}
            >
              <Link
                href={svc.link}
                className="group relative block bg-white border border-brand-stone p-8 md:p-12 pt-24 md:pt-28 pb-16 flex flex-col justify-between h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl shadow-md cursor-pointer overflow-hidden"
                style={{ borderRadius: 0 }}
              >
                {/* Green Arrow Ribbon at top left */}
                <div
                  className="absolute top-0 left-0 h-16 w-40 bg-brand-green flex items-center justify-center transition-colors duration-500 group-hover:bg-brand-charcoal"
                  style={{
                    clipPath:
                      "polygon(0% 0%, 80% 0%, 100% 50%, 80% 100%, 0% 100%)",
                  }}
                >
                  <svc.icon className="w-7 h-7 text-white transition-transform duration-500 group-hover:scale-110" />
                </div>

                {/* Text content area */}
                <div className="flex-grow flex flex-col">
                  <span className="font-sans text-[10px] md:text-xs tracking-widest uppercase text-brand-green font-semibold block mb-3 transition-colors duration-500 group-hover:text-brand-charcoal">
                    {svc.subtitle}
                  </span>

                  <h3 className="font-serif text-2xl md:text-3xl font-semibold text-brand-charcoal leading-tight mb-4 transition-colors duration-500 group-hover:text-brand-green">
                    {svc.title}
                  </h3>

                  <p className="font-sans text-brand-ink/85 text-sm md:text-base font-light leading-relaxed mb-8 flex-grow">
                    {svc.desc}
                  </p>
                </div>

                {/* Large outline icon centered at the bottom */}
                <div className="flex justify-center pt-4">
                  <svc.icon className="w-16 h-16 text-brand-stone transition-all duration-500 stroke-[1.25] group-hover:text-brand-green group-hover:scale-110 group-hover:-translate-y-1" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
