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
  street: "8695 Martin Way E, Unit 103",
  city: "Lacey, WA 98516",
  mapsQuery: "8695+Martin+Way+E+Unit+103+Lacey+WA+98516",
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
      "Serving the Lakewood community and the many military families around JBLM, our crews handle everything from waterfront homes on American Lake to multi-family properties — with direct insurance billing and a 5-year warranty.",
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
    slug: "bonney-lake-wa",
    name: "Bonney Lake",
    full: "Bonney Lake, WA",
    county: "Pierce County",
    office: "North",
    distance: "within our Pierce County service area",
    zips: ["98391"],
    nearby: ["Sumner", "Auburn", "Enumclaw", "Buckley", "Lake Tapps"],
    neighborhoods: [
      "Lake Tapps",
      "Allan Yorke Park area",
      "Tehaleh",
      "East Bonney Lake",
      "West Bonney Lake",
    ],
    landmark: "Lake Tapps and Allan Yorke Park",
    blurb:
      "Bonney Lake's lakefront homes and fast-growing Tehaleh community face real exposure to storm damage and water intrusion. Heritage brings IICRC-certified crews and direct insurance billing to get your home back quickly — without the franchise markup.",
    lat: 47.1773,
    lng: -122.1768,
  },
  {
    slug: "graham-wa",
    name: "Graham",
    full: "Graham, WA",
    county: "Pierce County",
    office: "North",
    distance: "within our South Pierce County service area",
    zips: ["98338"],
    nearby: ["Spanaway", "Orting", "Puyallup", "Eatonville"],
    neighborhoods: [
      "Graham Hill",
      "South Graham",
      "Mountain Meadows",
      "Elk Plain",
    ],
    landmark: "the foothills of Mount Rainier and Orting Valley",
    blurb:
      "Graham's rural-residential character and proximity to the Orting Valley means storm and flooding events can hit fast and hard. Heritage's North office dispatches certified crews to Graham with the same urgency we bring to every Pierce County emergency.",
    lat: 47.049,
    lng: -122.3082,
  },
  {
    slug: "gig-harbor-wa",
    name: "Gig Harbor",
    full: "Gig Harbor, WA",
    county: "Pierce County",
    office: "North",
    distance: "across the Narrows from our service corridor",
    zips: ["98329", "98332", "98335"],
    nearby: ["Tacoma", "Port Orchard", "Fox Island", "Purdy"],
    neighborhoods: [
      "Downtown Gig Harbor",
      "Uptown",
      "Rosedale",
      "Artondale",
      "Fox Island",
    ],
    landmark: "Gig Harbor Marina and the Tacoma Narrows Bridge",
    blurb:
      "Gig Harbor's waterfront homes, marine-influenced weather, and high-value properties demand a restoration partner who understands moisture intrusion, saltwater exposure, and premium reconstruction. Heritage serves Gig Harbor with the full range of fire, water, and storm services.",
    lat: 47.3293,
    lng: -122.5793,
  },
  {
    slug: "parkland-wa",
    name: "Parkland",
    full: "Parkland, WA",
    county: "Pierce County",
    office: "North",
    distance: "minutes from our North office on I-5",
    zips: ["98444"],
    nearby: ["Tacoma", "Spanaway", "Lakewood", "South Hill"],
    neighborhoods: [
      "Parkland Center",
      "Midland",
      "Pacific Lutheran University area",
      "Mountain View",
    ],
    landmark: "Pacific Lutheran University",
    blurb:
      "Parkland's dense residential streets and proximity to Tacoma make it one of the most active areas in our Pierce County coverage zone. From burst pipes in older homes to fire cleanup near PLU, Heritage is on-site fast with certified technicians.",
    lat: 47.1384,
    lng: -122.4399,
  },
  {
    slug: "university-place-wa",
    name: "University Place",
    full: "University Place, WA",
    county: "Pierce County",
    office: "North",
    distance: "part of our core Pierce County coverage",
    zips: ["98466"],
    nearby: ["Tacoma", "Lakewood", "Steilacoom", "Fircrest"],
    neighborhoods: [
      "Chambers Bay",
      "Cirque Drive",
      "Grandview",
      "Bridgeport",
      "Fircrest border area",
    ],
    landmark: "Chambers Bay Golf Course and the Puget Sound shoreline",
    blurb:
      "University Place homeowners along the Puget Sound bluffs and Chambers Bay face unique weather exposure. Heritage brings full-service fire, water, and storm restoration to UP with the speed and insurance expertise this community expects.",
    lat: 47.2154,
    lng: -122.5482,
  },
  {
    slug: "yelm-wa",
    name: "Yelm",
    full: "Yelm, WA",
    county: "Thurston County",
    office: "North",
    distance: "southeast of our Lacey headquarters",
    zips: ["98597"],
    nearby: ["Lacey", "Rainier", "Roy", "McKenna"],
    neighborhoods: [
      "Downtown Yelm",
      "Prairie View",
      "Yelm Prairie",
      "Longmire area",
    ],
    landmark: "the Yelm-Tenino Trail and Nisqually River corridor",
    blurb:
      "Yelm's prairie setting and rural-residential mix mean storm damage and flooding can leave homeowners isolated. Heritage's Lacey office covers Yelm and surrounding Thurston County communities with the same IICRC-certified team and direct insurance coordination.",
    lat: 46.9404,
    lng: -122.6096,
  },
  {
    slug: "spanaway-wa",
    name: "Spanaway",
    full: "Spanaway, WA",
    county: "Pierce County",
    office: "North",
    distance: "within our South Pierce County service area",
    zips: ["98387"],
    nearby: ["Tacoma", "Graham", "Parkland", "Roy"],
    neighborhoods: [
      "Spanaway Lake",
      "Fort Lewis area",
      "Frederickson",
      "South Spanaway",
    ],
    landmark: "Spanaway Lake Park",
    blurb:
      "Spanaway's mix of military families near JBLM and established residential neighborhoods makes it one of our busiest service areas. Heritage coordinates directly with military insurers and handles everything from water extraction to full structural rebuild.",
    lat: 47.1043,
    lng: -122.4357,
  },
  {
    slug: "steilacoom-wa",
    name: "Steilacoom",
    full: "Steilacoom, WA",
    county: "Pierce County",
    office: "North",
    distance: "along our I-5 Pierce County corridor",
    zips: ["98388"],
    nearby: ["Lakewood", "DuPont", "JBLM", "University Place"],
    neighborhoods: [
      "Historic Steilacoom",
      "Steilacoom Lake",
      "Blair Waterway area",
      "Chambers Creek",
    ],
    landmark: "Washington's oldest incorporated town and Steilacoom Lake",
    blurb:
      "As Washington's oldest incorporated city, Steilacoom's historic homes need restoration specialists who respect original craftsmanship while meeting modern code. Heritage brings 22+ years of experience to Steilacoom's unique mix of heritage properties and waterfront homes.",
    lat: 47.1687,
    lng: -122.5999,
  },
  {
    slug: "ruston-wa",
    name: "Ruston",
    full: "Ruston, WA",
    county: "Pierce County",
    office: "North",
    distance: "part of our greater Tacoma coverage area",
    zips: ["98407"],
    nearby: ["Tacoma", "University Place", "Fircrest", "Proctor"],
    neighborhoods: [
      "Point Ruston",
      "Ruston Way waterfront",
      "North Tacoma border",
    ],
    landmark: "Point Ruston waterfront development and Ruston Way",
    blurb:
      "Ruston's compact waterfront community and high-value Point Ruston properties sit right on Puget Sound — making moisture, storm surge, and wind damage a real risk. Heritage responds to Ruston with the same certified team that covers greater Tacoma.",
    lat: 47.2912,
    lng: -122.4837,
  },
  {
    slug: "winlock-wa",
    name: "Winlock",
    full: "Winlock, WA",
    county: "Lewis County",
    office: "South",
    distance: "south of our Chehalis office on I-5",
    zips: ["98596"],
    nearby: ["Chehalis", "Toledo", "Vader", "Napavine"],
    neighborhoods: [
      "Downtown Winlock",
      "Winlock Heights",
      "South Winlock",
      "Olequa Valley",
    ],
    landmark: "Winlock's giant egg monument and Olequa Creek",
    blurb:
      "Winlock and the surrounding Olequa Valley are covered by Heritage's South office in Chehalis — just minutes away. Whether it's storm damage from a Lewis County weather event or a house fire, our team arrives fast and handles every step with your insurer.",
    lat: 46.494,
    lng: -122.938,
  },
  {
    slug: "napavine-wa",
    name: "Napavine",
    full: "Napavine, WA",
    county: "Lewis County",
    office: "South",
    distance: "minutes from our Chehalis South office",
    zips: ["98565"],
    nearby: ["Chehalis", "Centralia", "Winlock", "Vader"],
    neighborhoods: [
      "Downtown Napavine",
      "Napavine Heights",
      "I-5 corridor",
    ],
    landmark: "Newaukum River and I-5 Exit 72",
    blurb:
      "Napavine sits in the heart of Lewis County between our Chehalis office and the I-5 corridor, making it one of our fastest response areas in the south. Heritage handles fire, water, and storm restoration here with the same certified team and 5-year warranty.",
    lat: 46.5694,
    lng: -122.9076,
  },
  {
    slug: "toledo-wa",
    name: "Toledo",
    full: "Toledo, WA",
    county: "Lewis County",
    office: "South",
    distance: "south of Winlock on our Lewis County route",
    zips: ["98591"],
    nearby: ["Winlock", "Vader", "Castle Rock", "Kelso"],
    neighborhoods: [
      "Downtown Toledo",
      "Cowlitz River area",
      "South Toledo",
    ],
    landmark: "the Cowlitz River and Toledo School District",
    blurb:
      "Toledo's agricultural community along the Cowlitz River relies on Heritage's South office when fire, flooding, or storm damage strikes. We bring full insurance coordination and IICRC-certified restoration to rural Lewis County properties of all sizes.",
    lat: 46.4522,
    lng: -122.8448,
  },
  {
    slug: "shelton-wa",
    name: "Shelton",
    full: "Shelton, WA",
    county: "Mason County",
    office: "North",
    distance: "west of Olympia across the Mason County line",
    zips: ["98584"],
    nearby: ["Olympia", "Hoodsport", "Belfair", "McCleary"],
    neighborhoods: [
      "Downtown Shelton",
      "Oakland Bay",
      "Shelton Heights",
      "Agate",
      "Arcadia",
    ],
    landmark: "Oakland Bay and the Mason County Courthouse",
    blurb:
      "Shelton's timber heritage and Oakland Bay waterfront make it a unique restoration market — one Heritage knows well. Our North office covers Mason County with the same certified crews, direct insurance billing, and 5-year warranty that Thurston County clients rely on.",
    lat: 47.2154,
    lng: -123.0994,
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
      "Chehalis is home to our South office, giving Lewis County the fastest local response for fire, water, and flood damage. We've helped this community recover from Chehalis River flooding and structure fires for over 22 years.",
    lat: 46.6624,
    lng: -122.964,
  },
];

export const getLocationBySlug = (slug?: string) =>
  LOCATIONS.find(l => l.slug === slug);
