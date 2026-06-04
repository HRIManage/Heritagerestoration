

export default function CTA() {
  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-10 border-b border-brand-stone">
      {/* Left side: Testimonial & Contact Callout (60% width on desktop) */}
      <a 
        href="tel:3604561015"
        style={{ borderRadius: 0 }}
        className="lg:col-span-6 bg-brand-moss p-10 md:p-24 flex flex-col justify-between items-start text-left group cursor-pointer transition-colors duration-300 hover:bg-[#46543D]"
      >
        <div>
          {/* Large lime-green quotation mark SVG */}
          <svg 
            className="w-12 h-12 md:w-16 md:h-16 text-brand-green mb-8 transition-transform duration-300 group-hover:scale-105" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>

          {/* Testimonial Quote Text */}
          <blockquote className="font-serif text-2xl md:text-4xl text-brand-linen font-light italic leading-relaxed mb-12 select-none">
            "From confusion to clarity, their restoration process made everything feel simple."
          </blockquote>
        </div>

        {/* Bottom Credits & Click Action Indicator */}
        <div className="w-full pt-8 border-t border-brand-linen/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <div>
              <span className="block font-sans text-[10px] tracking-widest uppercase text-brand-linen/50 mb-1">
                Client Type
              </span>
              <span className="font-sans text-xs tracking-wider uppercase text-brand-linen/80 font-medium">
                Residential Client
              </span>
            </div>
            <div>
              <span className="block font-sans text-[10px] tracking-widest uppercase text-brand-linen/50 mb-1">
                Client Name
              </span>
              <span className="font-sans text-xs tracking-wider uppercase text-brand-linen font-semibold">
                Kevin Wijaya
              </span>
            </div>
          </div>

          {/* Call CTA Prompt */}
          <div className="inline-flex items-center gap-2 text-brand-green font-sans font-semibold text-xs tracking-widest uppercase py-2">
            Call for Consultation
            <span className="text-brand-green font-bold text-sm transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </a>

      {/* Right side: High-resolution portrait (40% width on desktop) */}
      <div className="lg:col-span-4 relative min-h-[400px] lg:min-h-full w-full overflow-hidden bg-brand-stone">
        <img src="/photo/cta-client.png" alt="Kevin Wijaya - Heritage Restoration Client" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105" style={{ objectPosition: 'center 20%', borderRadius: 0 }} />
      </div>
    </section>
  )
}
