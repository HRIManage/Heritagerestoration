
export default function Offices() {
  const offices = [
    {
      title: 'North Office — Lacey',
      address1: '8695 Martin Way E, Unit 102',
      address2: 'Lacey, WA 98516',
      phone: '(360) 456-1015',
      phoneRaw: '3604561015',
      email: 'office@firewaterstorm.com',
    },
    {
      title: 'South Office — Chehalis',
      address1: '1581 N. National Ave',
      address2: 'Chehalis, WA 98532',
      phone: '(360) 456-1886',
      phoneRaw: '3604561886',
      email: 'office@firewaterstorm.com',
    },
  ]

  return (
    <section className="bg-white py-24 md:py-32 border-b border-brand-stone">
      <div className="page-container">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 md:mb-24">
          <span className="overline-label mb-3 text-brand-green">Our Locations</span>
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-brand-charcoal leading-tight">
            Regional Offices Serving Southwest Washington
          </h2>
          <div className="w-12 h-[2px] bg-brand-green mx-auto mt-6" />
        </div>

        {/* Side-by-Side Offices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 md:divide-x md:divide-brand-stone/60">
          {offices.map((office, idx) => (
            <div 
              key={idx}
              className={`flex flex-col justify-between ${idx === 1 ? 'md:pl-16 lg:pl-24' : 'md:pr-16 lg:pr-24'}`}
            >
              <div>
                <h3 className="font-serif text-2xl md:text-3xl font-semibold text-brand-charcoal mb-6">
                  {office.title}
                </h3>
                
                {/* Office Details */}
                <div className="font-sans text-brand-ink text-base font-light space-y-4 mb-8 leading-relaxed">
                  <div>
                    <span className="block font-medium text-xs tracking-wider text-brand-charcoal/60 uppercase mb-1">
                      Address
                    </span>
                    <p>{office.address1}</p>
                    <p>{office.address2}</p>
                  </div>

                  <div>
                    <span className="block font-medium text-xs tracking-wider text-brand-charcoal/60 uppercase mb-1">
                      Email
                    </span>
                    <a 
                      href={`mailto:${office.email}`}
                      className="hover:text-brand-green underline underline-offset-4 decoration-brand-stone hover:decoration-brand-green transition-all"
                    >
                      {office.email}
                    </a>
                  </div>

                  <div>
                    <span className="block font-medium text-xs tracking-wider text-brand-charcoal/60 uppercase mb-1">
                      Phone
                    </span>
                    <p className="font-medium text-brand-charcoal">{office.phone}</p>
                  </div>
                </div>
              </div>

              {/* Call CTA - Solid brand-charcoal, zero border radius, uppercase, hover brand-green */}
              <a
                href={`tel:${office.phoneRaw}`}
                style={{ borderRadius: 0 }}
                className="w-full inline-flex items-center justify-center gap-2.5 bg-brand-charcoal text-brand-linen font-sans font-semibold text-xs tracking-widest uppercase py-4 transition-all duration-300 hover:bg-brand-green hover:text-brand-linen"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.3 1L6.6 10.8z"/>
                </svg>
                Call Office
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
