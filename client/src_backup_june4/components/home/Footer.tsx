export default function Footer() {
  return (
    <footer id="contact" className="bg-brand-linen border-t border-brand-stone">
      {/* Main footer body */}
      <div className="page-container py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand & Certifications block (4 columns) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Upscaled Logo (105px height, 482px width) */}
            <a href="#hero" className="inline-block">
              <img
                src="/photo/heritage-logo.png"
                alt="Heritage Restoration"
                width={482}
                height={105}
                style={{ height: 105, width: "auto" }}
              />
            </a>

            <p className="font-sans text-brand-ink/70 text-sm md:text-base font-light leading-relaxed max-w-sm">
              Locally owned and operated since 2004. Southwest Washington's
              premier partner for fire, water, and storm damage restoration. We
              restore property and peace of mind.
            </p>

            {/* Certifications badges with zero border radius */}
            <div className="flex flex-wrap gap-2 pt-2">
              {["Lic. #HERITRI964J2", "IICRC Certified", "Est. 2004"].map(
                badge => (
                  <span
                    key={badge}
                    className="font-sans text-[10px] text-brand-charcoal/70 tracking-wider uppercase border border-brand-charcoal/25 px-3 py-1.5"
                    style={{ borderRadius: 0 }} // Strict 0px border radius
                  >
                    {badge}
                  </span>
                )
              )}
            </div>
          </div>

          {/* North Office - Lacey (3 columns) */}
          <div className="lg:col-span-3 lg:col-start-7 space-y-4">
            <h5 className="font-sans text-xs tracking-widest uppercase text-brand-green font-semibold">
              North Office — Lacey
            </h5>
            <div className="font-sans text-brand-ink/80 text-sm font-light leading-loose">
              <p>7895 Martin Way E, Unit 103</p>
              <p>Lacey, WA 98516</p>

              <div className="pt-4 space-y-2">
                <a
                  href="tel:3604561015"
                  className="block font-sans font-semibold text-brand-charcoal hover:text-brand-green transition-colors text-base"
                >
                  (360) 456-1015
                </a>
                <a
                  href="mailto:office@firewaterstorm.com"
                  className="block font-sans text-brand-charcoal/60 hover:text-brand-green transition-colors text-xs tracking-wide"
                >
                  office@firewaterstorm.com
                </a>
              </div>
            </div>
          </div>

          {/* South Office - Chehalis (3 columns) */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="font-sans text-xs tracking-widest uppercase text-brand-green font-semibold">
              South Office — Chehalis
            </h5>
            <div className="font-sans text-brand-ink/80 text-sm font-light leading-loose">
              <p>1581 N. National Ave</p>
              <p>Chehalis, WA 98532</p>

              <div className="pt-4 space-y-2">
                <a
                  href="tel:3604561886"
                  className="block font-sans font-semibold text-brand-charcoal hover:text-brand-green transition-colors text-base"
                >
                  (360) 456-1886
                </a>
                <a
                  href="mailto:office@firewaterstorm.com"
                  className="block font-sans text-brand-charcoal/60 hover:text-brand-green transition-colors text-xs tracking-wide"
                >
                  office@firewaterstorm.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar with fine 1px separator border line */}
      <div className="border-t border-brand-stone py-6">
        <div className="page-container flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="font-sans text-xs text-brand-charcoal/50">
            © 2026 Heritage Restoration. All rights reserved.
          </p>
          <div className="font-sans text-xs text-brand-charcoal/50 space-x-4">
            <span>
              Lacey:{" "}
              <a
                href="tel:3604561015"
                className="text-brand-charcoal/70 hover:text-brand-green transition-colors font-medium"
              >
                (360) 456-1015
              </a>
            </span>
            <span>·</span>
            <span>
              Chehalis:{" "}
              <a
                href="tel:3604561886"
                className="text-brand-charcoal/70 hover:text-brand-green transition-colors font-medium"
              >
                (360) 456-1886
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
