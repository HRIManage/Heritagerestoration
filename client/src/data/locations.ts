/**
 * Heritage Restoration: Service-Area (City) Landing Page Data
 *
 * Each entry powers a dedicated, SEO-optimized location landing page at
 * /service-area/{slug}. Content is intentionally localized (county, ZIP codes,
 * neighborhoods, nearby cities, landmarks, and a unique intro blurb) so each
 * page is genuinely distinct rather than thin duplicate content.
 *
 * To add a new city, append an entry here — the route, sitemap helper, footer
 * links, and schema are all generated from this list.
 */

export interface CityLocation {
  /** URL slug used at /service-area/{slug} */
  slug: string;
  /** City name only, e.g. "Olympia" */
  name: string;
  /** City + state, e.g. "Olympia, WA" */
  full: string;
  county: string;
  /** Which Heritage office primarily covers this city */
  office: "North" | "South";
  /** Approximate drive context shown to build local trust */
  distance: string;
  zips: string[];
  /** Nearby cities for internal context + "areas near" copy */
  nearby: string[];
  /** Neighborhoods / districts within the city */
  neighborhoods: string[];
  /** A recognizable local reference (landmark, highway, base, etc.) */
  landmark: string;
  /** Unique 1-2 sentence localized intro */
  blurb: string;
  lat: number;
  lng: number;
}

export const NORTH_OFFICE = {
  label: "North Office",
  street: "8695 Martin Way E, Unit 102",
  city: "Lacey, WA 98516",
  mapsQuery: "8695+Martin+Way+E+Unit+102+Lacey+WA+98516",
};

export const SOUTH_OFFICE = {
  label: "South Office",
  street: "1581 N. National Ave",
  city: "Chehalis, WA 98532",
  mapsQuery: "1581+N.+National+Ave+Chehalis+WA+98532",
};

export const LOCATIONS: CityLocation[] = [
  {
    slug: "olympia-wa",
    name: "Olympia",
    full: "Olympia, WA",
    county: "Thurston County",
    office: "North",
    distance: "minutes from our Lacey headquarters",
    zips: ["98501", "98502", "98506", "98512", "98513"],
    nearby: ["Lacey", "Tumwater", "Tenino", "Yelm"],
    neighborhoods: [
      "Downtown Olympia",
      "West Olympia",
      "South Capitol",
      "Bigelow Highlands",
      "Eastside",
    ],
    landmark: "the Washington State Capitol campus",
    blurb:
      "As Washington's capital city, Olympia's mix of historic downtown buildings and established residential neighborhoods demands restoration crews who understand older construction and local permitting. Our Lacey headquarters puts a certified team at your Olympia door fast.",
    lat: 47.0379,
    lng: -122.9007,
  },
  {
    slug: "lacey-wa",
    name: "Lacey",
    full: "Lacey, WA",
    county: "Thurston County",
    office: "North",
    distance: "based right here in Lacey",
    zips: ["98503", "98509", "98513", "98516"],
    nearby: ["Olympia", "Tumwater", "Yelm", "DuPont"],
    neighborhoods: [
      "Hawks Prairie",
      "Meadows",
      "Woodland Creek",
      "Horizon Pointe",
      "Long Lake",
    ],
    landmark: "Hawks Prairie and the Martin Way corridor",
    blurb:
      "Lacey is home base for Heritage Restoration — our North office on Martin Way E means the fastest possible emergency response for Lacey homeowners and businesses. We know these neighborhoods because we live and work here.",
    lat: 47.0343,
    lng: -122.8232,
  },
  {
    slug: "tumwater-wa",
    name: "Tumwater",
    full: "Tumwater, WA",
    county: "Thurston County",
    office: "North",
    distance: "a short drive from our Lacey office",
    zips: ["98501", "98511", "98512"],
    nearby: ["Olympia", "Lacey", "Tenino"],
    neighborhoods: [
      "Tumwater Hill",
      "Littlerock Road",
      "Historic Brewery District",
      "Black Hills",
    ],
    landmark: "Tumwater Falls and the historic brewery district",
    blurb:
      "From the historic brewery district to newer developments along the Black Hills, Tumwater properties get the same 60-minute emergency response and IICRC-certified restoration our Thurston County neighbors rely on.",
    lat: 47.0073,
    lng: -122.9093,
  },
  {
    slug: "dupont-wa",
    name: "DuPont",
    full: "DuPont, WA",
    county: "Pierce County",
    office: "North",
    distance: "directly along our I-5 service corridor",
    zips: ["98327"],
    nearby: ["Lakewood", "Lacey", "Steilacoom", "JBLM"],
    neighborhoods: [
      "Northwest Landing",
      "Hoffman Hill",
      "Palisade",
      "Historic Village",
    ],
    landmark: "Joint Base Lewis-McChord (JBLM)",
    blurb:
      "DuPont's master-planned Northwest Landing community and its proximity to JBLM mean we work regularly with military families and newer construction here. We coordinate directly with USAA and other military insurers to make recovery seamless.",
    lat: 47.0973,
    lng: -122.6318,
  },
  {
    slug: "lakewood-wa",
    name: "Lakewood",
    full: "Lakewood, WA",
    county: "Pierce County",
    office: "North",
    distance: "on our I-5 North service route",
    zips: ["98498", "98499", "98439"],
    nearby: ["Tacoma", "University Place", "Steilacoom", "JBLM"],
    neighborhoods: [
      "Lake City",
      "Tillicum",
      "American Lake",
      "Oakbrook",
      "Springbrook",
    ],
    landmark: "American Lake and Joint Base Lewis-McChord",
    blurb:
      "Serving the Lakewood community and the many military families around JBLM, our crews handle everything from waterfront homes on American Lake to multi-family properties — with direct insurance billing and a 5-year workmanship warranty.",
    lat: 47.1718,
    lng: -122.5185,
  },
  {
    slug: "tacoma-wa",
    name: "Tacoma",
    full: "Tacoma, WA",
    county: "Pierce County",
    office: "North",
    distance: "covered daily from our North office",
    zips: ["98402", "98404", "98405", "98406", "98407", "98408", "98409"],
    nearby: ["Lakewood", "University Place", "Fife", "Puyallup", "Fircrest"],
    neighborhoods: [
      "North End",
      "Stadium District",
      "Proctor",
      "Hilltop",
      "South Tacoma",
      "Old Town",
    ],
    landmark: "the Tacoma Narrows and Point Defiance",
    blurb:
      "Tacoma's century-old North End craftsman homes and dense urban neighborhoods need restoration specialists who respect historic detail while meeting modern code. Heritage delivers full fire, water, and storm recovery across the City of Destiny.",
    lat: 47.2529,
    lng: -122.4443,
  },
  {
    slug: "puyallup-wa",
    name: "Puyallup",
    full: "Puyallup, WA",
    county: "Pierce County",
    office: "North",
    distance: "within our Pierce County service area",
    zips: ["98371", "98372", "98373", "98374", "98375"],
    nearby: ["Tacoma", "Sumner", "South Hill", "Edgewood"],
    neighborhoods: [
      "Downtown Puyallup",
      "South Hill",
      "North Hill",
      "Riverside",
      "Shaw Road",
    ],
    landmark: "the Washington State Fairgrounds",
    blurb:
      "From historic downtown near the Fairgrounds to the growing South Hill plateau, Puyallup homeowners trust Heritage for rapid water extraction, fire cleanup, and storm rebuilds — handled start to finish with your insurance.",
    lat: 47.1854,
    lng: -122.2929,
  },
  {
    slug: "federal-way-wa",
    name: "Federal Way",
    full: "Federal Way, WA",
    county: "King County",
    office: "North",
    distance: "the northern edge of our service corridor",
    zips: ["98003", "98023", "98063"],
    nearby: ["Tacoma", "Auburn", "Milton", "Des Moines"],
    neighborhoods: [
      "Twin Lakes",
      "Mirror Lake",
      "Lakeland",
      "Dash Point",
      "West Campus",
    ],
    landmark: "Dash Point and the Wild Waves area",
    blurb:
      "Federal Way marks the northern reach of our Western Washington corridor. From Twin Lakes to Dash Point, we bring the same certified crews, insurance advocacy, and warranty-backed reconstruction to King County's south end.",
    lat: 47.3223,
    lng: -122.3126,
  },
  {
    slug: "centralia-wa",
    name: "Centralia",
    full: "Centralia, WA",
    county: "Lewis County",
    office: "South",
    distance: "served from our Chehalis office next door",
    zips: ["98531"],
    nearby: ["Chehalis", "Napavine", "Bucoda", "Rochester"],
    neighborhoods: [
      "Downtown Centralia",
      "Edison District",
      "Seminary Hill",
      "Fords Prairie",
    ],
    landmark: "the historic Centralia downtown and Borst Park",
    blurb:
      "Centralia's historic downtown and frequent Chehalis River flood exposure make fast, certified water and storm response essential. Our South office in neighboring Chehalis is minutes away when disaster strikes.",
    lat: 46.7163,
    lng: -122.9543,
  },
  {
    slug: "chehalis-wa",
    name: "Chehalis",
    full: "Chehalis, WA",
    county: "Lewis County",
    office: "South",
    distance: "based right here in Chehalis",
    zips: ["98532"],
    nearby: ["Centralia", "Napavine", "Adna", "Winlock"],
    neighborhoods: [
      "Downtown Chehalis",
      "Westside",
      "Pennsylvania Avenue",
      "Newaukum Valley",
    ],
    landmark: "the Lewis County Courthouse and I-5 Exit 77",
    blurb:
      "Chehalis is home to our South office, giving Lewis County the fastest local response for fire, water, and flood damage. We've helped this community recover from Chehalis River flooding and structure fires for over 20 years.",
    lat: 46.6624,
    lng: -122.964,
  },
];

export const getLocationBySlug = (slug?: string) =>
  LOCATIONS.find(l => l.slug === slug);
