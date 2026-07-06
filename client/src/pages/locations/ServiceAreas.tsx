import { type FormEvent, useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { MapPin, Phone, ArrowRight, ArrowUpRight, Compass, ShieldCheck, Star } from "lucide-react";
import Layout from "@/components/layout/Layout";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import { LOCATIONS, CityLocation, NORTH_OFFICE, SOUTH_OFFICE } from "@/data/locations";
import { BASE_URL, buildBreadcrumbSchema } from "@/seo";
import ServiceHeader from "@/components/ui/ServiceHeader";

const HERO_IMAGE = "/photo/hero-new.jpg";

export default function ServiceAreas() {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [coverageQuery, setCoverageQuery] = useState("");
  const [coverageSearch, setCoverageSearch] = useState("");
  const [selectedCitySlug, setSelectedCitySlug] = useState<string | null>(null);

  const canonical = `${BASE_URL}/service-areas`;
  const pageTitle =
    "Service Areas | Fire, Water & Storm Restoration Across Western Washington | Heritage Restoration";
  const metaDescription =
    "Heritage Restoration serves cities along the I-5 corridor from Chehalis to Tacoma, including Olympia, Lacey, Puyallup, Lakewood, DuPont and more. 24/7 emergency response, IICRC certified.";

  const serviceLocations = LOCATIONS;
  const north = serviceLocations.filter(l => l.office === "North");
  const south = serviceLocations.filter(l => l.office === "South");

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Heritage Restoration Service Areas",
    itemListElement: serviceLocations.map((l, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: l.full,
      url: `${BASE_URL}/service-area/${l.slug}`,
    })),
  };

  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Service Areas", url: "/service-areas" },
  ]);

  // Kept for the hidden SVG fallback markup below.
  const MIN_LAT = 46.3;
  const MAX_LAT = 47.4;
  const MIN_LNG = -123.25;
  const MAX_LNG = -122.1;

  const getXY = (lat: number, lng: number) => {
    const x = 40 + ((lng - MIN_LNG) / (MAX_LNG - MIN_LNG)) * 320;
    const y = 450 - ((lat - MIN_LAT) / (MAX_LAT - MIN_LAT)) * 400;
    return { x, y };
  };

  const normalizedCoverageSearch = coverageSearch.trim().toLowerCase();
  const coverageMatch = normalizedCoverageSearch
    ? serviceLocations.find(location => {
        const searchable = [
          location.name,
          location.full,
          location.slug.replace(/-/g, " "),
          location.county,
          ...location.zips,
          ...location.nearby,
          ...location.neighborhoods,
        ]
          .join(" ")
          .toLowerCase();

        return searchable.includes(normalizedCoverageSearch);
      }) || null
    : null;

  const selectedCityData = serviceLocations.find(l => l.slug === selectedCitySlug);
  const activeCityData =
    selectedCityData || serviceLocations.find(l => l.slug === hoveredCity) || coverageMatch;

  const handleCoverageCheck = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextSearch = coverageQuery.trim();
    setCoverageSearch(nextSearch);

    const normalized = nextSearch.toLowerCase();
    const match =
      serviceLocations.find(location => {
        const searchable = [
          location.name,
          location.full,
          location.slug.replace(/-/g, " "),
          location.county,
          ...location.zips,
          ...location.nearby,
          ...location.neighborhoods,
        ]
          .join(" ")
          .toLowerCase();

        return searchable.includes(normalized);
      }) || null;

    setSelectedCitySlug(match?.slug || null);
  };

  return (
    <Layout>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={`${BASE_URL}${HERO_IMAGE}`} />
        <script type="application/ld+json">
          {JSON.stringify(itemListSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumb)}
        </script>
      </Helmet>

      <div className="bg-[#FAF9F6] pt-[112px] sm:pt-[116px] lg:pt-[152px]">
        <ServiceHeader
          title="Areas We Serve"
          subtitle="Western Washington"
          heroImg={HERO_IMAGE}
        />

        {/* Ticker strip */}
        <div className="relative z-10 bg-[#1A311F] py-8 border-b border-[#8DBD42]/20 overflow-hidden shadow-md">
          <style>{`
            @keyframes service-areas-ticker {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
            .service-areas-ticker { animation: service-areas-ticker 45s linear infinite; }
          `}</style>
          <div className="service-areas-ticker flex whitespace-nowrap w-max">
            {[...Array(2)].map((_, setIdx) => (
              <div key={setIdx} className="flex">
                {[
                  "Direct Insurance Billing",
                  "Licensed & Bonded in WA",
                  "22+ Years Serving Washington",
                  "Locally Owned & Operated",
                ].map(item => (
                  <span key={item} className="flex items-center">
                    <span className="px-12 font-semibold text-[26px] uppercase tracking-[0.22em] text-[#8DBD42]">{item}</span>
                    <span className="text-[#8DBD42]/25 text-[18px]">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Intro bar */}
        <div className="bg-[#FAF9F6] border-b border-[#3F4143]/8">
          <Container>
            <div className="py-10 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] font-black text-[#8DBD42] mb-2">Coverage Area</p>
                <h2 className="text-[26px] md:text-[32px] font-bold text-[#1a1c1e] leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Serving the I-5 Corridor &amp;<br className="hidden md:block" /> Western Washington
                </h2>
              </div>
              <p className="text-[#3F4143]/65 text-[15px] leading-relaxed max-w-[440px] font-sans font-light">
                From Lewis County to Pierce County, our two offices dispatch certified
                crews across the entire region — 24 hours a day, 7 days a week, 365 days a year.
              </p>
            </div>
          </Container>
        </div>

        {/* Split Screen Cities List & Map Section */}
        <section className="py-12 md:py-20 bg-transparent">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              
              {/* Left Column: Cities List (Buttons/Pills) */}
              <div className="lg:col-span-7 space-y-12">
                
                {/* North Office Section */}
                <div className="space-y-6">
                  <FadeIn direction="up">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="w-8 h-[2px] bg-[#8DBD42]" />
                      <span className="text-[11px] uppercase tracking-[0.2em] font-black text-[#8DBD42]">North Office Dispatch Hub</span>
                    </div>
                    <h2 className="text-[24px] md:text-[30px] font-bold text-[#1a1c1e] font-serif">
                      Thurston, Pierce &amp; Mason
                    </h2>
                    <p className="text-[#3F4143]/55 text-sm font-sans font-light">
                      Lacey headquarters covers the northern service loop.
                    </p>
                  </FadeIn>

                  {/* Office Info card */}
                  <FadeIn direction="up" className="bg-white border border-[#3F4143]/8 p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <p className="text-xs font-black text-[#8DBD42] uppercase tracking-wider">Lacey HQ</p>
                      <h4 className="text-base font-bold text-[#3F4143] font-sans mt-0.5">{NORTH_OFFICE.street}</h4>
                      <p className="text-xs text-[#3F4143]/60 font-sans">{NORTH_OFFICE.city}</p>
                    </div>
                    <a
                      href="tel:+13603451015"
                      className="bg-[#3F4143] hover:bg-[#8DBD42] text-white hover:text-[#1a1c1e] text-xs font-bold uppercase tracking-wider px-4 py-2.5 transition-colors flex items-center gap-2"
                    >
                      <Phone size={12} className="animate-wiggle-hover" />
                      Contact Lacey Office
                    </a>
                  </FadeIn>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {north.map(city => {
                      const isHovered = hoveredCity === city.slug;
                      return (
                        <FadeIn key={city.slug} direction="up" delay={0.1}>
                          <Link
                            href={`/service-area/${city.slug}`}
                            onMouseEnter={() => setHoveredCity(city.slug)}
                            onMouseLeave={() => setHoveredCity(null)}
                            className={`flex items-center justify-between border px-4 py-3 transition-all duration-300 text-sm font-medium rounded-none shadow-sm group cursor-pointer ${
                              isHovered
                                ? "border-[#8DBD42] bg-[#8DBD42]/5 text-[#8DBD42]"
                                : "border-slate-200 bg-white text-[#3F4143] hover:border-[#8DBD42]/50"
                            }`}
                          >
                            <span className="truncate">{city.name}</span>
                            <ArrowUpRight size={13} className={`transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 ml-1 ${
                              isHovered ? "text-[#8DBD42]" : "text-[#3F4143]/30"
                            }`} />
                          </Link>
                        </FadeIn>
                      );
                    })}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-[#3F4143]/8" />

                {/* South Office Section */}
                <div className="space-y-6">
                  <FadeIn direction="up">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="w-8 h-[2px] bg-[#8DBD42]" />
                      <span className="text-[11px] uppercase tracking-[0.2em] font-black text-[#8DBD42]">South Office Dispatch Hub</span>
                    </div>
                    <h2 className="text-[24px] md:text-[30px] font-bold text-[#1a1c1e] font-serif">
                      Lewis County Region
                    </h2>
                    <p className="text-[#3F4143]/55 text-sm font-sans font-light">
                      Chehalis facility covers the southern service loop.
                    </p>
                  </FadeIn>

                  {/* Office Info card */}
                  <FadeIn direction="up" className="bg-white border border-[#3F4143]/8 p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <p className="text-xs font-black text-[#8DBD42] uppercase tracking-wider">Chehalis Branch</p>
                      <h4 className="text-base font-bold text-[#3F4143] font-sans mt-0.5">{SOUTH_OFFICE.street}</h4>
                      <p className="text-xs text-[#3F4143]/60 font-sans">{SOUTH_OFFICE.city}</p>
                    </div>
                    <a
                      href="tel:+13603451015"
                      className="bg-[#3F4143] hover:bg-[#8DBD42] text-white hover:text-[#1a1c1e] text-xs font-bold uppercase tracking-wider px-4 py-2.5 transition-colors flex items-center gap-2"
                    >
                      <Phone size={12} className="animate-wiggle-hover" />
                      Contact Chehalis Office
                    </a>
                  </FadeIn>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {south.map(city => {
                      const isHovered = hoveredCity === city.slug;
                      return (
                        <Link
                          key={city.slug}
                          href={`/service-area/${city.slug}`}
                          onMouseEnter={() => setHoveredCity(city.slug)}
                          onMouseLeave={() => setHoveredCity(null)}
                          className={`flex items-center justify-between border px-4 py-2.5 transition-all duration-300 text-sm font-semibold rounded-none shadow-xs group cursor-pointer ${
                            isHovered
                              ? "border-[#8DBD42] bg-[#8DBD42]/5 text-[#8DBD42]"
                              : "border-[#3F4143]/10 text-[#3F4143] bg-white"
                          }`}
                        >
                          <span className="truncate">{city.name}</span>
                          <ArrowUpRight size={13} className={`transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 ml-1 ${
                            isHovered ? "text-[#8DBD42]" : "text-[#3F4143]/30"
                          }`} />
                        </Link>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Right Column: Interactive Map (Sticky on Desktop) */}
              <div className="lg:col-span-5 lg:sticky lg:top-[160px] space-y-6">
                
                {/* Map Card */}
                <div className="bg-[#FAF9F5] border border-[#3F4143]/12 p-4 md:p-6 shadow-[0_20px_45px_rgba(63,65,67,0.04)] relative">
                  
                  {/* Compass watermark */}
                  <Compass className="absolute right-4 top-4 text-[#3F4143]/5 w-16 h-16 pointer-events-none stroke-[1]" />
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-[#3F4143] font-serif">Coverage Map</h3>
                    <p className="text-xs text-[#3F4143]/50 font-sans">Western Washington Corridor (Thurston, Pierce, Lewis, Mason)</p>
                  </div>

                  <form
                    onSubmit={handleCoverageCheck}
                    className="mb-5 border border-[#3F4143]/10 bg-white p-4 shadow-[0_12px_28px_rgba(63,65,67,0.035)]"
                  >
                    <label
                      htmlFor="coverage-check"
                      className="block text-[11px] uppercase tracking-[0.18em] font-black text-[#8DBD42] font-sans"
                    >
                      Check Your Service Area
                    </label>
                    <div className="mt-3 flex gap-2">
                      <input
                        id="coverage-check"
                        value={coverageQuery}
                        onChange={event => setCoverageQuery(event.target.value)}
                        placeholder="Enter city or ZIP"
                        className="min-w-0 flex-1 border border-[#3F4143]/12 bg-[#FAF9F6] px-3 py-2.5 text-sm text-[#3F4143] outline-none transition-colors placeholder:text-[#3F4143]/35 focus:border-[#8DBD42]"
                      />
                      <button
                        type="submit"
                        className="bg-[#8DBD42] px-4 py-2.5 text-xs font-black uppercase tracking-[0.12em] text-[#1A311F] transition-colors hover:bg-[#7BAE36]"
                      >
                        Check
                      </button>
                    </div>

                    {coverageSearch && (
                      <div
                        className={`mt-3 border-l-2 px-3 py-2.5 text-sm ${
                          coverageMatch
                            ? "border-[#8DBD42] bg-[#8DBD42]/10 text-[#1A311F]"
                            : "border-[#3F4143]/30 bg-[#3F4143]/5 text-[#3F4143]"
                        }`}
                      >
                        {coverageMatch ? (
                          <>
                            <p className="font-black">
                              Yes, we serve {coverageMatch.name}.
                            </p>
                            <p className="mt-1 text-[#3F4143]/70">
                              Covered by our {coverageMatch.office === "North" ? "Lacey HQ" : "Chehalis Branch"}. 24/7 dispatch is available.
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <a
                                href="tel:+13603451015"
                                className="inline-flex items-center gap-1.5 bg-[#1A311F] px-3 py-2 text-[11px] font-black uppercase tracking-[0.12em] text-white"
                              >
                                <Phone size={12} /> Call Dispatch
                              </a>
                              <Link
                                href={`/service-area/${coverageMatch.slug}`}
                                className="inline-flex items-center gap-1.5 border border-[#8DBD42]/40 px-3 py-2 text-[11px] font-black uppercase tracking-[0.12em] text-[#5F8424]"
                              >
                                View Area <ArrowRight size={11} />
                              </Link>
                            </div>
                          </>
                        ) : (
                          <>
                            <p className="font-black">We may still be able to help.</p>
                            <p className="mt-1 text-[#3F4143]/70">
                              This city or ZIP is not in our listed areas. Call us and we will confirm dispatch availability.
                            </p>
                          </>
                        )}
                      </div>
                    )}
                  </form>

                  {/* Google Coverage Map */}
                  <div className="relative border border-[#3F4143]/8 bg-white aspect-[4/5] overflow-hidden shadow-inner">
                    <iframe
                      title="Heritage Restoration service area reference map"
                      src="https://www.google.com/maps?ll=46.900,-122.700&z=8&output=embed"
                      className="absolute inset-0 h-full w-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    <svg
                      className="hidden absolute inset-0 h-full w-full pointer-events-none"
                      viewBox="0 0 400 500"
                      aria-hidden="true"
                    >
                      <defs>
                        <filter id="city-glow" x="-110%" y="-110%" width="320%" height="320%">
                          <feGaussianBlur stdDeviation="5" result="blur" />
                          <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                        <filter id="label-halo" x="-20%" y="-80%" width="140%" height="260%">
                          <feFlood floodColor="white" floodOpacity="0.9" result="bg" />
                          <feComposite in="bg" in2="SourceAlpha" operator="in" />
                          <feGaussianBlur stdDeviation="1.4" />
                          <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>
                      <path
                        d="M 0 0 H 400 V 500 H 0 Z"
                        fill="#F8F6B5"
                        opacity="0"
                      />
                      <path
                        d="M 0 0 C 54 36, 68 70, 86 118 C 102 158, 92 194, 116 238 C 142 286, 128 344, 156 500 L 0 500 Z"
                        fill="#DDE9DF"
                        opacity="0"
                      />
                      <path
                        d="M 58 30 C 96 82, 92 126, 120 170 C 146 210, 136 252, 154 298 C 174 348, 168 396, 198 462"
                        fill="none"
                        stroke="#C6D8D0"
                        strokeWidth="18"
                        strokeLinecap="round"
                        opacity="0"
                      />
                      <path
                        d="M 0 84 L 400 84 M 0 164 L 400 164 M 0 246 L 400 246 M 0 330 L 400 330 M 0 414 L 400 414 M 92 0 L 92 500 M 178 0 L 178 500 M 268 0 L 268 500 M 342 0 L 342 500"
                        fill="none"
                        stroke="#B6B78A"
                        strokeWidth="1.25"
                        opacity="0"
                      />
                      <path
                        d="M 60 126 L 132 136 L 196 116 L 286 128 L 362 112 M 64 212 L 142 200 L 210 216 L 306 198 L 380 218 M 74 304 L 160 284 L 242 306 L 330 292 M 98 386 L 182 366 L 268 386 L 350 372"
                        fill="none"
                        stroke="#B6B78A"
                        strokeWidth="1"
                        strokeLinecap="round"
                        opacity="0"
                      />
                      <path
                        d="M 153 402 L 127 386 L 135 359 L 120 322 L 122 301 L 138 191 L 141 179 L 159 180 L 212 156 L 244 127 L 264 96"
                        fill="none"
                        stroke="transparent"
                        strokeWidth="0"
                        opacity="0"
                      />
                      {[
                        { label: "Mason", x: 92, y: 150 },
                        { label: "Thurston", x: 138, y: 226 },
                        { label: "Pierce", x: 258, y: 164 },
                        { label: "Lewis", x: 178, y: 358 },
                        { label: "Grays Harbor", x: 40, y: 250 },
                        { label: "Cowlitz", x: 192, y: 462 },
                      ].filter(() => false).map(county => (
                        <text
                          key={county.label}
                          x={county.x}
                          y={county.y}
                          fill="#8F9174"
                          fillOpacity="0.72"
                          fontSize="20"
                          fontWeight="700"
                          fontFamily="Hanken Grotesk, sans-serif"
                          textAnchor="middle"
                        >
                          {county.label}
                        </text>
                      ))}
                      {serviceLocations.map(city => {
                        const { x, y } = getXY(city.lat, city.lng);
                        const isOffice = city.slug === "lacey-wa" || city.slug === "chehalis-wa";
                        const isActive = activeCityData?.slug === city.slug;

                        return (
                          <g key={city.slug}>
                            <circle
                              cx={x}
                              cy={y}
                              r={isActive ? 11 : isOffice ? 9 : 7}
                              fill="#8DBD42"
                              fillOpacity={isActive ? "0.32" : "0.18"}
                            />
                            <circle
                              cx={x}
                              cy={y}
                              r={isActive ? 6 : isOffice ? 5 : 4}
                              fill="#5F8424"
                              stroke="white"
                              strokeWidth={isActive ? "3" : "2.4"}
                            />
                            <circle
                              cx={x}
                              cy={y}
                              r={isActive ? 2.6 : isOffice ? 2.2 : 1.8}
                              fill="white"
                              filter="url(#city-glow)"
                            />
                            <text
                              x={x + 7}
                              y={y + 4}
                              fill="#1A311F"
                              fillOpacity="0.95"
                              fontSize="8"
                              fontWeight={isActive ? "800" : "650"}
                              fontFamily="Hanken Grotesk, sans-serif"
                              filter="url(#label-halo)"
                            >
                              {city.name}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                    <div className="pointer-events-none absolute left-4 top-4 z-10 bg-white/95 backdrop-blur-sm border border-[#3F4143]/10 px-3 py-2 shadow-md">
                      <p className="text-[10px] uppercase tracking-[0.18em] font-black text-[#8DBD42]">
                        Google Map
                      </p>
                      <p className="text-xs font-semibold text-[#3F4143]">
                        Zoom and pan to view listed cities
                      </p>
                    </div>
                    
                    {/* Grid lines cartography style */}
                    <svg className="hidden absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 500">
                      {/* Lng Grid */}
                      <line x1="100" y1="0" x2="100" y2="500" stroke="#3F4143" strokeOpacity="0.04" strokeDasharray="3 3" />
                      <line x1="200" y1="0" x2="200" y2="500" stroke="#3F4143" strokeOpacity="0.04" strokeDasharray="3 3" />
                      <line x1="300" y1="0" x2="300" y2="500" stroke="#3F4143" strokeOpacity="0.04" strokeDasharray="3 3" />
                      
                      {/* Lat Grid */}
                      <line x1="0" y1="100" x2="400" y2="100" stroke="#3F4143" strokeOpacity="0.04" strokeDasharray="3 3" />
                      <line x1="0" y1="200" x2="400" y2="200" stroke="#3F4143" strokeOpacity="0.04" strokeDasharray="3 3" />
                      <line x1="0" y1="300" x2="400" y2="300" stroke="#3F4143" strokeOpacity="0.04" strokeDasharray="3 3" />
                      <line x1="0" y1="400" x2="400" y2="400" stroke="#3F4143" strokeOpacity="0.04" strokeDasharray="3 3" />
                      
                      {/* Coordinates texts */}
                      <text x="105" y="15" fill="#3F4143" fillOpacity="0.3" fontSize="9" fontFamily="sans-serif">123°W</text>
                      <text x="205" y="15" fill="#3F4143" fillOpacity="0.3" fontSize="9" fontFamily="sans-serif">122.5°W</text>
                      <text x="5" y="95" fill="#3F4143" fillOpacity="0.3" fontSize="9" fontFamily="sans-serif">47.2°N</text>
                      <text x="5" y="195" fill="#3F4143" fillOpacity="0.3" fontSize="9" fontFamily="sans-serif">47.0°N</text>
                      <text x="5" y="295" fill="#3F4143" fillOpacity="0.3" fontSize="9" fontFamily="sans-serif">46.8°N</text>
                      <text x="5" y="395" fill="#3F4143" fillOpacity="0.3" fontSize="9" fontFamily="sans-serif">46.6°N</text>

                      {/* Stylized Puget Sound Water Inlet Path */}
                      <path
                        d="M 160 215 C 130 205, 110 170, 90 135 C 75 110, 65 60, 70 0 L 260 0 C 260 50, 275 75, 280 90 C 260 100, 230 110, 225 120 C 220 130, 235 150, 220 175 C 205 195, 185 205, 160 215 Z"
                        fill="#D0E3DF"
                        fillOpacity="0.55"
                        stroke="#BDD3CF"
                        strokeWidth="1.5"
                        className="transition-colors duration-300"
                      />

                      {/* I-5 highway line */}
                      {/* Chehalis (120, 322) -> Tacoma (264, 96) */}
                      <path
                        d="M 153 402 L 127 386 L 135 359 L 120 322 L 122 301 L 138 191 L 141 179 L 159 180 L 212 156 L 244 127 L 264 96 L 301 70"
                        fill="none"
                        stroke="#8DBD42"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.25"
                      />
                      <path
                        d="M 153 402 L 127 386 L 135 359 L 120 322 L 122 301 L 138 191 L 141 179 L 159 180 L 212 156 L 244 127 L 264 96 L 301 70"
                        fill="none"
                        stroke="#8DBD42"
                        strokeWidth="1.5"
                        strokeDasharray="4 3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.8"
                      />

                      {/* Lacey HQ Star */}
                      <g className="cursor-pointer">
                        <circle cx="158.7" cy="180" r="14" fill="#8DBD42" fillOpacity="0.15" className="animate-ping" style={{ animationDuration: "3s" }} />
                        <circle cx="158.7" cy="180" r="6" fill="#8DBD42" stroke="white" strokeWidth="1.5" />
                      </g>

                      {/* Chehalis HQ Star */}
                      <g className="cursor-pointer">
                        <circle cx="119.5" cy="321.8" r="14" fill="#8DBD42" fillOpacity="0.15" className="animate-ping" style={{ animationDuration: "3s" }} />
                        <circle cx="119.5" cy="321.8" r="6" fill="#8DBD42" stroke="white" strokeWidth="1.5" />
                      </g>

                      {/* Plot all cities as dots */}
                      {LOCATIONS.map(city => {
                        const { x, y } = getXY(city.lat, city.lng);
                        const isActive = hoveredCity === city.slug;
                        const isLaceyHQ = city.slug === "lacey-wa";
                        const isChehalisHQ = city.slug === "chehalis-wa";

                        // Skip drawing simple dots if they are office hubs
                        if (isLaceyHQ || isChehalisHQ) return null;

                        return (
                          <g
                            key={city.slug}
                            onMouseEnter={() => setHoveredCity(city.slug)}
                            onMouseLeave={() => setHoveredCity(null)}
                            className="cursor-pointer"
                          >
                            {/* Interactive pulse glow ring */}
                            <circle
                              cx={x}
                              cy={y}
                              r={isActive ? 9 : 5}
                              fill={isActive ? "#8DBD42" : "#3F4143"}
                              fillOpacity={isActive ? 0.3 : 0.15}
                              className="transition-all duration-300"
                            />
                            {/* Inner dot */}
                            <circle
                              cx={x}
                              cy={y}
                              r={isActive ? 4 : 2.5}
                              fill={isActive ? "#8DBD42" : "#FAF9F6"}
                              stroke={isActive ? "white" : "#3F4143"}
                              strokeWidth={isActive ? 1.5 : 1}
                              className="transition-all duration-300"
                            />
                          </g>
                        );
                      })}
                    </svg>

                    {/* Floating Info Tooltip */}
                    {activeCityData && false && (
                      <div
                        className="absolute bottom-4 left-4 right-4 bg-white border-t-2 border-[#8DBD42] p-4 shadow-xl z-20 flex flex-col justify-between gap-2 transition-opacity duration-200"
                        style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase tracking-widest font-black text-[#8DBD42]">
                              {activeCityData?.county}
                            </span>
                            <span className="text-[11px] bg-slate-100 text-[#3F4143]/60 px-2 py-0.5 font-bold">
                              {activeCityData?.office} Office Area
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-[#3F4143] mt-1 font-serif">
                            {activeCityData?.name}, WA
                          </h4>
                          <p className="text-xs text-[#3F4143]/70 mt-1 line-clamp-2">
                            {activeCityData?.blurb}
                          </p>
                        </div>
                        <div className="flex items-center justify-between border-t border-slate-100 pt-2 mt-1 text-[11px]">
                          <span className="text-[#3F4143]/50">
                            ZIPs: {activeCityData?.zips?.slice(0, 3).join(", ")}{(activeCityData?.zips?.length ?? 0) > 3 ? "..." : ""}
                          </span>
                          <Link
                            href={`/service-area/${activeCityData?.slug}`}
                            className="text-[#8DBD42] font-black uppercase tracking-wider hover:underline inline-flex items-center gap-0.5"
                          >
                            Details <ArrowRight size={10} />
                          </Link>
                        </div>
                      </div>
                    )}

                    {/* Default Help Hint */}
                    {!activeCityData && false && (
                      <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md text-white p-3 text-center text-xs z-10 font-sans font-light">
                        Hover over any city selector to view details and dispatch coverage.
                      </div>
                    )}
                  </div>

                  {/* Map Legend */}
                  <div className="mt-4 pt-4 border-t border-[#3F4143]/8 grid grid-cols-1 gap-3 text-xs font-sans">
                    <div className="flex items-center gap-2">
                      <MapPin size={13} className="text-[#8DBD42]" />
                      <span className="text-[#3F4143]/75 font-semibold">No pins or overlays, just the normal Google map</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Compass size={13} className="text-[#3F4143]/70" />
                      <span className="text-[#3F4143]/75">Use zoom or pan to inspect the service area</span>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16 bg-[#FAF9F6] border-t border-[#3F4143]/8">
          <Container size="narrow">
            <FadeIn direction="up">
              <div className="bg-[#1A311F] text-white p-10 md:p-16 relative overflow-hidden">
                {/* Decorative glow */}
                <div className="absolute right-[-60px] top-[-60px] w-[300px] h-[300px] rounded-full bg-[#8DBD42]/10 blur-[80px] pointer-events-none" />
                <div className="absolute left-[-40px] bottom-[-40px] w-[200px] h-[200px] rounded-full bg-[#8DBD42]/8 blur-[60px] pointer-events-none" />

                <div className="relative z-10 text-center">
                  <p className="text-[11px] uppercase tracking-[0.22em] font-black text-[#8DBD42] mb-4">Don't See Your City?</p>
                  <h2 className="text-[26px] md:text-[36px] font-bold leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    We Likely Cover It.
                  </h2>
                  <p className="text-white/70 text-[16px] leading-relaxed max-w-[480px] mx-auto mb-10 font-sans font-light">
                    If you're anywhere along the I-5 corridor in Western Washington,
                    call us — our crews travel throughout the region for emergency restoration.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="tel:+13603451015"
                      className="inline-flex items-center justify-center gap-2.5 bg-[#8DBD42] hover:bg-[#7dac35] text-[#1a1c1e] px-8 py-4 font-black uppercase tracking-[0.14em] text-[13px] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(141,189,66,0.4)] active:translate-y-0"
                    >
                      <Phone size={15} className="stroke-[2.5]" /> Call (360) 345-1015
                    </a>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 border-2 border-white/25 hover:border-[#8DBD42] text-white hover:text-[#8DBD42] px-8 py-4 font-black uppercase tracking-[0.14em] text-[13px] transition-all duration-200"
                    >
                      Free Assessment <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>
          </Container>
        </section>

        {/* Trust badges */}
        <div className="bg-white border-t border-gray-100">
          <div className="max-w-[900px] mx-auto px-8 py-14 md:py-16 text-center">
            <p className="text-[11px] uppercase tracking-[0.2em] font-black text-[#8DBD42] mb-10">
              Why Homeowners Trust Heritage
            </p>
            <div className="flex items-center justify-center gap-10 md:gap-20 mb-10">
              {[
                {
                  src: "/photo/emergency-badge-new-2.png",
                  alt: "24 HR Emergency Response",
                  title: "24/7 Emergency Response",
                },
                {
                  src: "/photo/iicrc-badge-new-3.png",
                  alt: "IICRC Certified",
                  title: "IICRC Certified",
                },
                {
                  src: "/photo/warranty-badge-new-3.png",
                  alt: "5-Year Warranty",
                  title: "5-Year Warranty",
                },
              ].map((badge) => (
                <div key={badge.alt} className="flex flex-col items-center gap-4">
                  <img
                    src={badge.src}
                    alt={badge.alt}
                    className="h-24 md:h-28 w-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.18)]"
                  />
                  <p className="text-[13px] font-black text-[#1a1c1e] uppercase tracking-[0.1em] text-center">
                    {badge.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

