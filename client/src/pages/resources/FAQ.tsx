import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus, Minus, Phone } from "lucide-react";
import { useState, useRef } from "react";
import { buildFAQSchema, buildBreadcrumbSchema, FAQ_SCHEMA_ITEMS } from "@/seo";

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type FAQItem = {
  question: string;
  answer: React.ReactNode;
};

type FAQCategory = {
  category: string;
  items: FAQItem[];
};

const faqCategories: FAQCategory[] = [
  {
    category: "24/7 Emergency Response & Immediate Disaster Steps",
    items: [
      {
        question:
          "How quickly can you respond to a property emergency in Lewis, Pierce, or Thurston County?",
        answer:
          "We guarantee a fast emergency response time of 60 minutes or less across our entire service area. Our disaster restoration crews are on standby 24/7, 365 days a year, including nights, weekends, and holidays. Rapid dispatch is critical to prevent secondary water damage, halt structural warping, and reduce overall insurance claim repair costs.",
      },
      {
        question:
          "What should I do immediately after discovering emergency water, fire, or storm damage?",
        answer: (
          <div className="space-y-3">
            <p className="font-semibold text-[#3F4143]">
              Immediate Safety Actions for Homeowners and Property Managers:
            </p>
            <ul className="space-y-2">
              {[
                {
                  label: "Check Structural Safety:",
                  text: "Evacuate immediately if there is a threat of ceiling collapse, structural shifting, or severe fire damage.",
                },
                {
                  label: "Avoid Electrical Hazards:",
                  text: "Do not walk through standing water if your electrical panel or outlets are submerged or exposed to moisture.",
                },
                {
                  label: "Take Photographic Documentation:",
                  text: "Photograph and video all affected property and structural damage for your insurance claims adjuster before any cleanup begins.",
                },
                {
                  label: "Shut Off Main Utilities:",
                  text: "If safe to access, shut off your property's main water valve or main electrical breaker.",
                },
                {
                  label: "Do NOT Attempt DIY Cleanup:",
                  text: "Avoid tearing down wet drywall or cleaning soot yourself. Untrained disturbance can spread toxic black mold spores or microscopic soot toxins throughout your HVAC system.",
                },
                {
                  label: "Call Our Emergency Dispatch:",
                  text: "Contact us immediately to deploy certified technicians to secure your property.",
                },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-[#8DBD42]" />
                  <span>
                    <span className="font-semibold text-[#3F4143]">
                      {item.label}
                    </span>{" "}
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ),
      },
      {
        question:
          "Do you provide emergency board-up services on weekends and holidays?",
        answer:
          "Yes, our property restoration teams operate with zero days off, including all major holidays. Through our specialized 1-800-BOARDUP division, we provide rapid structural security, commercial roof tarping, and window/door board-ups to secure homes and businesses following fires, police break-ins, vehicle impacts, or severe wind storms.",
      },
    ],
  },
  {
    category: "Emergency Water Damage Restoration & Structural Drying",
    items: [
      {
        question:
          "What types of water damage repairs do you handle in Washington State?",
        answer: (
          <div className="space-y-3">
            <p>
              We handle all residential and commercial water extraction and
              dry-out emergencies, specifically targeting:
            </p>
            <ul className="space-y-2">
              {[
                {
                  label: "Plumbing Failures:",
                  text: "Burst pipes, frozen pipe lines, slab leaks, and leaking water heaters.",
                },
                {
                  label: "Appliance Overflows:",
                  text: "Washing machine hose failures, dishwasher leaks, and toilet overflows.",
                },
                {
                  label: "Environmental & Sewage Disasters:",
                  text: "Sewer backup cleanup, crawl space water extraction, heavy storm runoff, and basement flooding.",
                },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 list-none">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-[#8DBD42]" />
                  <span>
                    <span className="font-semibold text-[#3F4143]">
                      {item.label}
                    </span>{" "}
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
            <p>
              Our comprehensive water mitigation includes rapid water removal,
              industrial dehumidification, thermal moisture mapping, and
              complete structural reconstruction.
            </p>
          </div>
        ),
      },
      {
        question: "How quickly can water damage lead to toxic mold growth?",
        answer:
          "The 24–48 Hour Window: Mold spores activate and begin colonizing damp organic materials (drywall, carpet padding, plywood framing) within 24 to 48 hours of initial water exposure. To prevent toxic indoor air quality issues, professional structural drying must begin immediately.",
      },
      {
        question:
          "Do you provide professional water extraction and structural drying?",
        answer:
          "Yes. We deploy industrial-grade truck-mounted water extractors, commercial low-grain refrigerant (LGR) dehumidifiers, and high-velocity axial air movers. Our IICRC-certified restoration technicians utilize advanced infrared thermal imaging cameras and moisture meters to track hidden water pockets behind walls and beneath flooring to ensure your property reaches certified dry standards.",
      },
      {
        question: "Can I handle water damage cleanup myself with a shop vac?",
        answer:
          "We strongly advise against DIY water extraction. Standard consumer vacuums and household fans cannot pull deep moisture trapped inside structural wood framing or subfloors. Leaving hidden moisture behind leads to structural wood rot, hidden mold blooms, and can void your homeowner's insurance policy coverage for failing to take proper mitigating steps.",
      },
    ],
  },
  {
    category: "Fire, Smoke, & Corrosive Soot Restoration",
    items: [
      {
        question:
          "Do you provide complete fire-damaged home and business restoration?",
        answer:
          "Yes. We provide complete end-to-end fire damage cleanup and reconstruction services. Our certified specialists manage everything: structural stabilization, emergency board-ups, soot and char removal, structural framing repairs, and complete cosmetic rebuilds back to pre-loss condition.",
      },
      {
        question: "Can smoke damage affect rooms that weren't touched by fire?",
        answer:
          "Yes. Smoke, ash, and soot act as acidic, pressurized gases. They travel freely through residential and commercial HVAC ductwork, settling into distant rooms. This causes invisible odor penetration, yellowing walls, and corrosive soot damage on electronics and metal fixtures throughout the entire property, requiring specialized chemical smoke remediation.",
      },
      {
        question:
          "Can you completely eliminate smoke odors after a structural fire?",
        answer:
          "Yes. We do not use masking agents or perfumes. To permanently destroy smoke odors at the molecular level, we utilize advanced air scrubbing technology, including thermal fogging, industrial ozone treatments, and hydroxyl generators. This safely eradicates embedded smoke molecules from structural studs, concrete floors, and salvaged personal belongings.",
      },
      {
        question:
          "Is it safe to live in my home after experiencing fire or smoke damage?",
        answer:
          "Generally, no. Even minor fires leave behind toxic fine particulate soot that damages respiratory systems and compromises indoor air quality. We perform a rapid physical safety and air quality evaluation upon arrival. If temporary relocation is required, we can coordinate directly with your insurance provider to authorize your Loss of Use or Additional Living Expenses (ALE) benefits.",
      },
    ],
  },
  {
    category: "Certified Mold Remediation & Air Quality Control",
    items: [
      {
        question:
          "Do you offer certified mold removal and black mold remediation services?",
        answer:
          "Yes. We are fully certified mold remediation experts. Our remediation protocols follow strict industry standards: we isolate the affected space using negative-pressure plastic containment barriers, run industrial HEPA air scrubbers to trap airborne spores, physically extract the mold growth, apply specialized EPA-registered antimicrobials, and fix the underlying moisture source to ensure long-term protection.",
      },
      {
        question: "Is mold exposure dangerous to my family's health?",
        answer:
          "Yes. Active indoor mold colonies release mycotoxins into the air that can trigger persistent coughing, sinus infections, chronic headaches, skin rashes, and severe asthma attacks. Children, the elderly, pregnant women, and individuals with compromised immune systems or pre-existing respiratory conditions face the highest health risks.",
      },
    ],
  },
  {
    category: "Insurance Claims & Direct Insurance Billing Assistance",
    items: [
      {
        question:
          "Do you work directly with major homeowners insurance companies?",
        answer:
          "Yes. We have over two decades of experience coordinating directly with all major insurance carriers (including State Farm, Allstate, Liberty Mutual, Farmers, and USAA). We use Xactimate, the exact estimating software preferred by insurance adjusters, to provide them with digital moisture maps, dry logs, and photographic evidence to ensure your claim is processed smoothly, maximizing your eligible coverage.",
      },
      {
        question: "Do you offer direct billing to my insurance company?",
        answer:
          "Yes. We handle direct insurance billing to remove the financial stress and paperwork burden from your shoulders during an active emergency. You are typically only responsible for your standard policy deductible.",
      },
      {
        question:
          "What if my insurance claim is denied or coverage gaps exist?",
        answer:
          "If your insurance policy limits coverage for a specific type of water loss or surface flooding, we provide clear, itemized, and transparent out-of-pocket estimates. We will work with you to prioritize critical structural repairs and offer flexible financing options to fit your budget.",
      },
    ],
  },
  {
    category: "The Restoration Process, Timeline, & Company Background",
    items: [
      {
        question:
          "Are your property restoration technicians licensed, bonded, and certified?",
        answer:
          "Yes. We are a fully licensed, bonded, and insured general contractor in Washington State. Every field technician is individually certified by the IICRC (Institute of Inspection Cleaning and Restoration Certification) in water damage restoration, fire/smoke cleanup, or microbial remediation, ensuring full compliance with local building codes and insurance regulations.",
      },
      {
        question:
          "How long have you been serving local Washington communities?",
        answer:
          "We have been proudly serving local property owners, landlords, and commercial businesses since 2004. Over our 22 years of local history, we have successfully restored thousands of properties devastated by frozen pipes, catastrophic fires, and severe Northwest windstorms.",
      },
      {
        question:
          "Do you handle both the initial emergency cleanup and the final rebuild construction?",
        answer:
          'Yes. We utilize a highly efficient "One Team" workflow. Unlike companies that only perform water extraction and leave you to find a separate general contractor, we manage the entire project from midnight emergency response through structural drying, content pack-outs, final structural framing, drywall patching, flooring installation, and finishing trim.',
      },
      {
        question:
          "How long does a typical property water damage restoration project take?",
        answer: (
          <div className="space-y-2">
            <p>
              While every structural loss varies, a standard timeline generally
              follows this structure:
            </p>
            <ul className="space-y-2 mt-2">
              {[
                {
                  label: "Emergency Water Extraction & Cleanup:",
                  text: "1 to 2 Days.",
                },
                {
                  label: "Structural Drying & Dehumidification:",
                  text: "3 to 5 Days.",
                },
                {
                  label: "Property Reconstruction & Cosmetic Rebuild:",
                  text: "1 to 3 Weeks (depending on the scope of material replacement required).",
                },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 list-none">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-[#8DBD42]" />
                  <span>
                    <span className="font-semibold text-[#3F4143]">
                      {item.label}
                    </span>{" "}
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ),
      },
      {
        question:
          "What is content pack-out, cleaning, and climate-controlled storage?",
        answer:
          "If an emergency compromises your living spaces, our crews perform a professional content pack-out. We carefully catalog, wrap, and transport your personal belongings, clothes, electronics, and furniture to our secure, climate-controlled warehouse facility. There, your items are professionally cleaned, deodorized, and stored safely until your property reconstruction is 100% complete.",
      },
      {
        question:
          "Do you offer a warranty on your structural restoration and repair work?",
        answer:
          "Yes. We back our craftsmanship, structural repairs, and reconstruction services with a comprehensive 5-year warranty, providing you with long-term peace of mind and verified property value retention.",
      },
      {
        question:
          "Do you offer commercial restoration equipment rentals for property managers?",
        answer:
          "Yes. For local property managers, commercial landlords, or facility engineers dealing with minor, controlled water losses, we offer professional restoration equipment rentals. This includes heavy-duty truck-mount or portable water extractors, commercial LGR dehumidifiers, and high-velocity structural air movers to help you maintain your facilities independently.",
      },
    ],
  },
  {
    category: "Cities & Regional Service Communities We Serve",
    items: [
      {
        question:
          "Which cities and communities do you serve across Western Washington?",
        answer: (
          <div className="space-y-4">
            <p>
              We provide complete 24/7 emergency dispatch coverage throughout
              four primary county hubs across Western Washington and South King
              County. Our strategically placed teams ensure a 60-minute or less
              physical response arrival to all emergency calls.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-2">
              {[
                {
                  hub: "Lacey & Olympia Hub (Thurston County)",
                  cities:
                    "Lacey, Olympia, Tumwater, Yelm, Tenino, Rainier, Bucoda, Rochester, Grand Mound, Tanglewilde, Boston Harbor, Littlerock, Maytown, and all surrounding unincorporated neighborhoods.",
                },
                {
                  hub: "Tacoma & Puyallup Hub (Pierce County)",
                  cities:
                    "Tacoma, Puyallup, Lakewood, Gig Harbor, Bonney Lake, University Place, Sumner, Edgewood, Fife, Milton, Fircrest, Steilacoom, Orting, Buckley, Eatonville, DuPont, Carbonado, South Prairie, Wilkeson, Spanaway, Graham, Parkland, Frederickson, Elk Plain, Midland, Fox Island, Anderson Island, Ashford, Elbe, Alder, McKenna, Roy, Key Center, Longbranch, Vaughn, Home, Wauna, and surrounding areas.",
                },
                {
                  hub: "Puyallup & South Hill Hub (Pierce County)",
                  cities:
                    "Puyallup, South Hill, Graham, Spanaway, Parkland, Bonney Lake, and adjacent Pierce County residential and industrial sectors.",
                },
                {
                  hub: "Chehalis & Centralia Hub (Lewis County)",
                  cities:
                    "Chehalis, Centralia, Morton, Mossyrock, Napavine, Pe Ell, Toledo, Vader, Winlock, Mineral, Packwood, Onalaska, Fords Prairie, Adna, Boistfort, Cinebar, Curtis, Doty, Ethel, Evaline, Galvin, Glenoma, Marys Corner, Mayfield, Randle, Salkum, Silver Creek, and surrounding South Sound rural regions.",
                },
              ].map((hub, i) => (
                <div
                  key={i}
                  className="bg-[#3F4143]/5 border border-[#3F4143]/10 p-4 rounded-none font-sans"
                >
                  <p className="font-bold text-[#3F4143] text-sm mb-1 font-serif">
                    {hub.hub}
                  </p>
                  <p className="text-xs text-[#3F4143]/70 leading-relaxed font-sans">
                    {hub.cities}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        question:
          "Do you serve communities and housing near Joint Base Lewis-McChord (JBLM)?",
        answer:
          "Yes, absolutely. We proudly support military families, veterans, and military property communities located surrounding JBLM, including Lakewood, Tacoma, DuPont, Parkland, and Spanaway. Our administration teams are intimately familiar with standard military housing insurance policies and work directly with specialized military insurance providers like USAA to simplify and speed up the claims process. It is our absolute honor to serve those who serve our country.",
      },
    ],
  },
];

export default function FAQ() {
  // Track open item per category independently: key = "catIdx-itemIdx"
  const [openKey, setOpenKey] = useState<string | null>("0-0");

  const toggle = (key: string) =>
    setOpenKey(prev => (prev === key ? null : key));

  return (
    <Layout>
      <Helmet>
        <title>
          Frequently Asked Questions | Heritage Restoration – Washington
          Restoration Experts
        </title>
        <meta
          name="description"
          content="Get answers to 27 common questions about fire, water, and storm damage restoration, mold remediation, insurance claims, and your rights as a homeowner across Western Washington."
        />
        <meta
          name="keywords"
          content="restoration FAQ, water damage questions, fire restoration help, mold remediation questions, insurance claims restoration, Washington restoration contractor FAQ"
        />
        <link
          rel="canonical"
          href="https://www.firewaterstorm.com/resources/faq"
        />
        <meta property="og:title" content="FAQ | Heritage Restoration" />
        <meta
          property="og:description"
          content="Answers to 27 common questions about restoration services, insurance claims, mold remediation, and homeowner rights across Western Washington."
        />
        <meta
          property="og:url"
          content="https://www.firewaterstorm.com/resources/faq"
        />
        <script type="application/ld+json">
          {JSON.stringify(buildFAQSchema(FAQ_SCHEMA_ITEMS))}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(
            buildBreadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Resources", url: "/resources/faq" },
              { name: "FAQ", url: "/resources/faq" },
            ])
          )}
        </script>
      </Helmet>

      <div className="min-h-screen bg-[#FAF9F6] pt-[112px] sm:pt-[116px] lg:pt-[152px]">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#145126] via-[#142618] to-[#0E1B11] text-white pt-24 pb-24 px-6 overflow-hidden border-b border-[#8DBD42]/20">
          <div className="max-w-[800px] mx-auto text-center relative z-10 space-y-6">
            <FadeUp className="inline-flex items-center gap-2 justify-center">
              <span className="w-3 h-3 rounded-none bg-[#8DBD42] animate-pulse" />
              <span className="text-[#8DBD42] uppercase tracking-[0.2em] text-xs font-black">
                Frequently Asked Questions
              </span>
            </FadeUp>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-serif mt-2">
              Restoration <span className="text-[#8DBD42]">FAQ</span>
            </h1>

            <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-2xl mx-auto font-sans font-light">
              Everything you need to know about the restoration process,
              insurance claims, mold remediation, and your rights as a homeowner
              across Western Washington.
            </p>
          </div>
          {/* Background pattern */}
          <div className="absolute top-0 left-0 bottom-0 right-0 opacity-[0.02] pointer-events-none">
            <div className="absolute w-[500px] h-[500px] bg-white rounded-none -top-64 -left-64" />
          </div>
        </section>

        {/* FAQ Accordions Section */}
        <section className="py-10 md:py-16 bg-[#FAF9F6]">
          <div className="max-w-[960px] mx-auto px-6 space-y-14">
            {faqCategories.map((cat, catIdx) => (
              <FadeUp key={catIdx} delay={catIdx * 0.04}>
                {/* Category heading */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-3 h-3 rounded-none bg-[#8DBD42] flex-shrink-0" />
                  <h2 className="text-lg md:text-xl font-bold text-[#3F4143] uppercase tracking-wide font-sans">
                    {cat.category}
                  </h2>
                </div>

                {/* Items */}
                <div className="border-t border-[#3F4143]/10">
                  {cat.items.map((faq, itemIdx) => {
                    const key = `${catIdx}-${itemIdx}`;
                    const isOpen = openKey === key;
                    return (
                      <div
                        key={itemIdx}
                        className="relative border-b border-[#3F4143]/10 group transition-all duration-300 rounded-none"
                      >
                        {/* Green left bar */}
                        <div
                          className={`absolute left-0 top-5 bottom-5 w-[3px] bg-[#8DBD42] transition-transform duration-300 origin-left rounded-none ${
                            isOpen
                              ? "scale-y-100"
                              : "scale-y-0 group-hover:scale-y-100 group-hover:opacity-40"
                          }`}
                        />
                        <button
                          id={`faq-${catIdx}-${itemIdx}`}
                          onClick={() => toggle(key)}
                          className="w-full flex items-center justify-between pl-6 pr-2 py-5 text-left transition-colors group cursor-pointer rounded-none"
                        >
                          <span
                            className={`text-base md:text-lg font-bold transition-colors duration-300 pr-4 font-serif ${
                              isOpen
                                ? "text-[#8DBD42]"
                                : "text-[#3F4143] group-hover:text-[#8DBD42]"
                            }`}
                          >
                            {faq.question}
                          </span>
                          <span className="shrink-0">
                            {isOpen ? (
                              <Minus className="text-[#8DBD42] w-5 h-5" />
                            ) : (
                              <Plus className="text-[#3F4143]/60 group-hover:text-[#8DBD42] w-5 h-5 transition-colors duration-300" />
                            )}
                          </span>
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="pl-6 pr-4 pb-5 text-[#3F4143]/80 leading-relaxed text-sm md:text-base font-sans">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative bg-[#FAF9F6] pt-24 pb-36 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[320px] md:h-[400px]">
            <img
              src="/photo/emergency-cta-banner.jpg"
              alt="Emergency Response Team"
              className="w-full h-full object-cover object-center brightness-90"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>

          <div className="relative max-w-[960px] mx-auto px-6 pt-[180px] md:pt-[240px] z-10">
            <FadeUp>
              <div className="bg-white border border-[#3F4143]/10 p-8 md:p-12 shadow-[0_24px_50px_rgba(0,0,0,0.06)] text-center rounded-none">
                <h2 className="text-2xl md:text-3xl font-bold text-[#3F4143] mb-6 font-serif">
                  Need Immediate Assistance?
                </h2>
                <div className="text-sm md:text-base text-[#3F4143]/85 space-y-6 leading-relaxed max-w-3xl mx-auto font-sans font-light">
                  <p>
                    Heritage Restoration is available 24/7, 365 days a year. Our
                    emergency response team will deploy and arrive within 60
                    minutes of dispatch to secure your home.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-4 justify-center font-sans">
                  <a
                    href="tel:+13603451015"
                    id="faq-call-cta"
                    className="bg-[#8DBD42] hover:bg-[#7BB843] text-white font-bold px-8 py-4 uppercase tracking-[0.14em] text-xs transition-colors shadow-md flex items-center gap-2 rounded-none"
                  >
                    <Phone size={14} /> Call 360-345-1015
                  </a>
                  <a
                    href="mailto:office@firewaterstorm.com"
                    id="faq-email-cta"
                    className="bg-[#3F4143] hover:bg-[#292b2d] text-white font-bold px-8 py-4 uppercase tracking-[0.14em] text-xs transition-colors shadow-md rounded-none"
                  >
                    Email Us Now
                  </a>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>
      </div>
    </Layout>
  );
}
