import { type FormEvent, useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { MapPin, Phone, ArrowRight, ArrowUpRight } from "lucide-react";
import PageCTA from "@/components/PageCTA";
import Layout from "@/components/layout/Layout";
import { LOCATIONS, NORTH_OFFICE, SOUTH_OFFICE } from "@/data/locations";
import { BASE_URL, buildBreadcrumbSchema } from "@/seo";
import ServiceHeader from "@/components/ui/ServiceHeader";
import TrustBadges from "@/components/TrustBadges";
import StaticTrustBar from "@/components/StaticTrustBar";
import ServiceAreaMap from "@/components/ServiceAreaMap";

const HERO_IMAGE = "/photo/hero-new.jpg";

export default function ServiceAreas() {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [coverageQuery, setCoverageQuery] = useState("");
  const [coverageSearch, setCoverageSearch] = useState("");
  const [selectedCitySlug, setSelectedCitySlug] = useState<string | null>(null);

  const canonical = `${BASE_URL}/service-areas`;
  const pageTitle =
    "Service Areas in Western Washington | Heritage Restoration";
  const metaDescription =
    "Fire, water & storm damage restoration in 23 cities along the I-5 corridor, from Chehalis to Tacoma. 24/7 emergency response, IICRC certified.";

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
    serviceLocations.find(l => l.slug === hoveredCity) || selectedCityData || coverageMatch;

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
    setHoveredCity(null);
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
        <meta property="og:image" content={`${BASE_URL}/photo/og-default.jpg`} />
        <script type="application/ld+json">
          {JSON.stringify(itemListSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumb)}
        </script>
      </Helmet>

      <div className="bg-white pt-[112px] sm:pt-[116px] lg:pt-[132px]">
        <ServiceHeader
          title="Areas We Serve"
          subtitle="Western Washington"
          heroImg={HERO_IMAGE}
        />

        <StaticTrustBar
          items={[
            "Licensed & Bonded in WA",
            "22+ Years Serving Washington",
            "Locally Owned & Operated",
          ]}
        />

        {/* Intro */}
        <section className="bg-white pt-16 md:pt-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-16 lg:items-end">
              <div className="lg:col-span-7">
                <p className="text-[15px] font-semibold text-[#44781a]">Coverage area</p>
                <h2 className="mt-3 font-serif text-[34px] font-bold leading-[1.08] text-[#1f2a24] md:text-[46px]">
                  Serving the I-5 Corridor &amp; Western Washington
                </h2>
              </div>
              <p className="max-w-[460px] text-[16px] leading-relaxed text-[#3F4143]/80 md:text-[17px] lg:col-span-5">
                From Lewis County to Pierce County, our two offices dispatch certified
                crews across the entire region — 24 hours a day, 7 days a week, 365 days a year.
              </p>
            </div>
          </div>
        </section>

        {/* Cities + map */}
        <section className="bg-[linear-gradient(180deg,#FFFFFF_0%,#F7F5F0_18%,#F7F5F0_100%)] py-12 md:py-16">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
              {/* Map: first on phones, pinned on the right on desktop */}
              <div className="lg:order-2 lg:col-span-6">
                <div className="lg:sticky lg:top-[150px]">
                  <div className="card-3d overflow-hidden bg-white">
                    <div className="h-[380px] sm:h-[460px] lg:h-[min(640px,calc(100svh-290px))] lg:min-h-[440px]">
                      <ServiceAreaMap
                        cities={serviceLocations}
                        activeSlug={activeCityData?.slug ?? null}
                        offices={["lacey-wa", "chehalis-wa"]}
                      />
                    </div>
                    <div className="flex min-h-[92px] items-center justify-between gap-4 border-t border-[#E6E1D7] px-5 py-4 md:px-6">
                      {activeCityData ? (
                        <>
                          <div className="min-w-0">
                            <p className="font-serif text-[20px] font-bold leading-tight text-[#1f2a24]">
                              {activeCityData.full}
                            </p>
                            <p className="mt-1 text-[14px] text-[#3F4143]/75">
                              {activeCityData.county}, covered by our {activeCityData.office === "North" ? "Lacey HQ" : "Chehalis Branch"}
                            </p>
                          </div>
                          <Link
                            href={`/service-area/${activeCityData.slug}`}
                            className="btn-3d inline-flex shrink-0 items-center gap-2 bg-[#173d24] px-4 py-2.5 text-[14px] font-bold text-white transition-colors hover:bg-[#8DBD42] hover:text-[#173d24]"
                          >
                            View area <ArrowRight size={15} />
                          </Link>
                        </>
                      ) : (
                        <p className="flex items-center gap-2.5 text-[15px] text-[#3F4143]/75">
                          <MapPin size={17} className="shrink-0 text-[#44781a]" />
                          <span>
                            <span className="hidden lg:inline">Hover</span>
                            <span className="lg:hidden">Search</span> a city to drop a pin on the map.
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Search + city lists */}
              <div className="lg:order-1 lg:col-span-6">
                <form onSubmit={handleCoverageCheck} className="card-3d bg-white p-5 md:p-6">
                  <label htmlFor="coverage-check" className="block font-serif text-[20px] font-bold text-[#1f2a24]">
                    Check Your Service Area
                  </label>
                  <div className="mt-4 flex gap-2">
                    <input
                      id="coverage-check"
                      value={coverageQuery}
                      onChange={event => setCoverageQuery(event.target.value)}
                      placeholder="Enter city or ZIP"
                      className="min-w-0 flex-1 border border-[#E6E1D7] bg-[#FAF9F6] px-3.5 py-3 text-[15px] text-[#1f2a24] outline-none transition-colors placeholder:text-[#3F4143]/45 focus:border-[#8DBD42]"
                    />
                    <button
                      type="submit"
                      className="btn-3d bg-[#8DBD42] px-5 py-3 text-[15px] font-bold text-[#173d24] transition-colors hover:bg-[#97cf4f]"
                    >
                      Check
                    </button>
                  </div>

                  {coverageSearch && (
                    <div
                      className={`mt-4 px-4 py-3.5 text-[15px] ${
                        coverageMatch ? "bg-[#EEF3E6] text-[#173d24]" : "bg-[#F7F5F0] text-[#3F4143]"
                      }`}
                    >
                      {coverageMatch ? (
                        <>
                          <p className="font-bold">Yes, we serve {coverageMatch.name}.</p>
                          <p className="mt-1 text-[#3F4143]/80">
                            Covered by our {coverageMatch.office === "North" ? "Lacey HQ" : "Chehalis Branch"}. 24/7 dispatch is available.
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <a
                              href="tel:+13604561886"
                              className="btn-3d inline-flex items-center gap-1.5 bg-[#173d24] px-3.5 py-2 text-[14px] font-bold text-white"
                            >
                              <Phone size={14} /> Call Dispatch
                            </a>
                            <Link
                              href={`/service-area/${coverageMatch.slug}`}
                              className="btn-3d inline-flex items-center gap-1.5 border border-[#173d24]/30 bg-white px-3.5 py-2 text-[14px] font-bold text-[#173d24] hover:border-[#173d24]"
                            >
                              View Area <ArrowRight size={13} />
                            </Link>
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="font-bold">We may still be able to help.</p>
                          <p className="mt-1 text-[#3F4143]/80">
                            This city or ZIP is not in our listed areas. Call us and we will confirm dispatch availability.
                          </p>
                        </>
                      )}
                    </div>
                  )}
                </form>

                {[
                  {
                    key: "north",
                    hub: "North Office Dispatch Hub",
                    title: "Thurston, Pierce & Mason",
                    note: "Lacey headquarters covers the northern service loop.",
                    office: NORTH_OFFICE,
                    officeName: "Lacey HQ",
                    tel: "tel:+13604561886",
                    callLabel: "Contact Lacey Office",
                    list: north,
                  },
                  {
                    key: "south",
                    hub: "South Office Dispatch Hub",
                    title: "Lewis County Region",
                    note: "Chehalis facility covers the southern service loop.",
                    office: SOUTH_OFFICE,
                    officeName: "Chehalis Branch",
                    tel: "tel:+13603451015",
                    callLabel: "Contact Chehalis Office",
                    list: south,
                  },
                ].map(group => (
                  <div key={group.key} className="mt-12">
                    <p className="text-[15px] font-semibold text-[#44781a]">{group.hub}</p>
                    <h2 className="mt-2 font-serif text-[26px] font-bold leading-tight text-[#1f2a24] md:text-[30px]">
                      {group.title}
                    </h2>
                    <p className="mt-2 text-[15px] text-[#3F4143]/75">{group.note}</p>

                    <div className="mt-5 flex flex-col gap-4 bg-[#173d24] p-5 text-white sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-[13px] font-semibold text-[#a9d468]">{group.officeName}</p>
                        <p className="mt-0.5 text-[16px] font-bold">{group.office.street}</p>
                        <p className="text-[14px] text-white/75">{group.office.city}</p>
                      </div>
                      <a
                        href={group.tel}
                        className="btn-3d inline-flex shrink-0 items-center justify-center gap-2 bg-[#8DBD42] px-4 py-2.5 text-[14px] font-bold text-[#173d24] transition-colors hover:bg-[#97cf4f]"
                      >
                        <Phone size={14} /> {group.callLabel}
                      </a>
                    </div>

                    <ul className="mt-3 grid grid-cols-1 gap-px bg-[#E6E1D7] sm:grid-cols-2">
                      {group.list.map(city => {
                        const on = activeCityData?.slug === city.slug;
                        return (
                          <li key={city.slug}>
                            <Link
                              href={`/service-area/${city.slug}`}
                              onMouseEnter={() => setHoveredCity(city.slug)}
                              onFocus={() => setHoveredCity(city.slug)}
                              aria-current={on ? "true" : undefined}
                              className={`group flex h-full items-center justify-between gap-3 px-4 py-3.5 transition-colors duration-200 ${
                                on ? "bg-[#EEF3E6]" : "bg-white hover:bg-[#FAF9F6]"
                              }`}
                            >
                              <span className="min-w-0">
                                <span className={`block truncate text-[15.5px] font-bold ${on ? "text-[#173d24]" : "text-[#1f2a24]"}`}>
                                  {city.name}
                                </span>
                                <span className="block truncate text-[13px] text-[#3F4143]/80">{city.county}</span>
                              </span>
                              <span
                                className={`grid h-8 w-8 shrink-0 place-items-center transition-colors duration-200 ${
                                  on ? "bg-[#173d24] text-[#8DBD42]" : "text-[#3F4143]/40 group-hover:text-[#173d24]"
                                }`}
                              >
                                {on ? <MapPin size={15} /> : <ArrowUpRight size={15} />}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trust badges */}
        <section className="bg-[linear-gradient(180deg,#F7F5F0_0%,#FFFFFF_100%)] pb-6 pt-4 md:pb-8">
          <div className="mx-auto max-w-[1120px] px-6 text-center">
            <h2 className="mb-10 font-serif text-[26px] font-bold text-[#1f2a24] md:text-[30px]">
              Why Homeowners Trust Heritage
            </h2>
            <TrustBadges />
          </div>
        </section>

        <PageCTA
          kicker="Don't see your city?"
          title="We Likely Cover It."
          primary={{ href: "tel:+13604561886", label: "Call (360) 456-1886" }}
          secondary={{ href: "/contact", label: "Free Assessment" }}
          image={{ src: "/photo/hero-new.jpg", alt: "Heritage Restoration crew in Western Washington" }}
        >
          <p>
            If you're anywhere along the I-5 corridor in Western Washington,
            call us — our crews travel throughout the region for emergency restoration.
          </p>
        </PageCTA>
      </div>
    </Layout>
  );
}
