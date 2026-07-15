export default function BottomCTA() {
  const regions = [
    "Lacey",
    "Olympia",
    "Tumwater",
    "Chehalis",
    "Centralia",
    "Yelm",
    "Tenino",
    "Rochester",
    "Thurston County",
    "Lewis County",
  ];

  return (
    <>
      {/* Service Areas Section */}
      <section className="bg-brand-linen border-y border-brand-stone py-14">
        <div className="page-container flex items-center justify-center gap-3 flex-wrap">
          <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-brand-charcoal mr-4">
            Service Regions:
          </span>
          {regions.map(region => (
            <span
              key={region}
              className="bg-white border border-brand-stone px-4 py-1.5 rounded-full font-sans text-xs font-medium text-brand-charcoal transition-all hover:bg-brand-green hover:text-white hover:border-brand-green cursor-default"
            >
              {region}
            </span>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-24 text-center bg-brand-charcoal text-white overflow-hidden">
        {/* Background Image with opacity */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15 grayscale pointer-events-none"
          style={{
            backgroundImage:
              "url('https://picsum.photos/seed/heritageCTA2026/1920/800')",
          }}
        />
        {/* Dark linear gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e1f1e]/94 to-[#1e1f1e]/82 z-1" />

        <div className="page-container relative z-10 max-w-2xl mx-auto">
          <span className="overline-label mb-3 text-brand-green">
            Get Help Immediately
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-white mb-6 leading-tight">
            Disaster Doesn't Wait. Neither Do We.
          </h2>
          <p className="font-sans text-brand-linen/75 text-base md:text-lg font-light leading-relaxed mb-10">
            Contact Heritage Restoration for a free professional damage
            assessment. Our teams are on standby 24 hours a day, 7 days a week,
            365 days a year, ready to deploy.
          </p>
          <div className="flex justify-center flex-wrap gap-5">
            <a
              href="tel:3604561015"
              style={{ borderRadius: 0 }}
              className="inline-flex items-center justify-center gap-2.5 bg-brand-green text-brand-charcoal font-sans font-semibold text-xs tracking-widest uppercase px-6 py-4 transition-all duration-300 hover:bg-[#6fa53c] hover:text-white"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.3 1L6.6 10.8z" />
              </svg>
              Call (360) 456-1015
            </a>
            <a
              href="mailto:office@firewaterstorm.com"
              style={{ borderRadius: 0 }}
              className="inline-flex items-center justify-center gap-2.5 border-2 border-white text-white font-sans font-semibold text-xs tracking-widest uppercase px-6 py-[14px] transition-all duration-300 hover:bg-white hover:text-brand-charcoal"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              Email Assessment Request
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
