/**
 * Commercial restoration content — single source for the /commercial pages.
 * Copy mirrors the Heritage commercial fire & water one-pagers.
 */

export const MAIN_PHONE = "(360) 456-1886";
export const MAIN_PHONE_TEL = "tel:+13604561886";

export const COMMERCIAL_CREDENTIALS = [
  {
    title: "Licensed & bonded",
    text: "Washington contractor HERITRI964J2",
  },
  {
    title: "IICRC Certified Firm",
    text: "Industry-standard fire, smoke and water work",
  },
  {
    title: "5-year warranty",
    text: "On workmanship. Written terms on request.",
  },
  {
    title: "Works with insurance",
    text: "Direct insurance billing. We work with your adjuster.",
  },
];

export const COMMERCIAL_CLIENTS = [
  "Providence Hospital",
  "Washington Orthopedic",
  "Aberdeen High School",
  "Essex Property Management",
  "Rants Group",
  "Reliable Enterprises",
  "Dental clinics across the South Sound",
];

export const PROPERTY_TYPES = [
  {
    title: "Apartments & multi-family",
    text: "Unit-to-unit leaks, kitchen fires and sprinkler discharge, phased so occupied units stay livable.",
  },
  {
    title: "HOAs & condominiums",
    text: "Clear scopes for the board, one contact for the manager, and work around residents' schedules.",
  },
  {
    title: "Medical & dental",
    text: "Hospitals, orthopedic and dental clinics where downtime and clean air matter most.",
  },
  {
    title: "Hotels & hospitality",
    text: "Room blocks taken offline in phases so the rest of the property keeps booking.",
  },
  {
    title: "Schools & public buildings",
    text: "Work scheduled around classes and events, with documentation for district and carrier.",
  },
  {
    title: "Offices, retail & clubs",
    text: "Storefronts, office suites, golf and club facilities secured, cleaned and rebuilt.",
  },
];

export const WHY_PROPERTY_TEAMS = [
  {
    title: "No handoff between cleanup and rebuild",
    text: "Most losses get split between a mitigation company and a general contractor. That handoff is where schedules slip and scope gets argued. We do both, so one team owns the result.",
  },
  {
    title: "On your side through the insurance claim",
    text: "We work directly with insurance adjusters throughout the claims process, advocating for our clients to help ensure all necessary repairs are properly documented, fairly evaluated and included in the settlement.",
  },
  {
    title: "Work planned around your operations",
    text: "Apartments, clinics and hotels can't just close. We phase the work and tell you up front which areas go offline, and for how long.",
  },
  {
    title: "We own all our equipment",
    text: "Every air mover, dehumidifier and extractor we bring is ours. No waiting on rentals, even when a freeze or storm hits the whole region at once.",
  },
];

export type CommercialServiceKey = "fire" | "water";

export type CommercialService = {
  key: CommercialServiceKey;
  path: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  heroImg: string;
  heroAlt: string;
  handles?: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  callChecklist: string;
  urgentLine: string;
  gallery: { src: string; alt: string; label: string }[];
};

export const COMMERCIAL_SERVICES: Record<CommercialServiceKey, CommercialService> = {
  fire: {
    key: "fire",
    path: "/commercial/fire-restoration",
    navLabel: "Commercial Fire Restoration",
    eyebrow: "Commercial fire restoration",
    title: "Commercial fire restoration",
    titleAccent: "and rebuild, under one contract.",
    intro:
      "After a fire, the building has to be secured, cleaned and rebuilt, and the business has to keep running. Heritage handles the board-up, the smoke, soot and water cleanup, and the full reconstruction with one crew and one point of contact.",
    metaTitle: "Commercial Fire Damage Restoration | Heritage Restoration",
    metaDescription:
      "Commercial and multi-family fire restoration in Western Washington: board-up, smoke and soot cleanup and full rebuild under one contract.",
    heroImg: "/photo/Fisher before.jpg",
    heroAlt: "Fire-damaged interior before Heritage commercial fire restoration",
    steps: [
      {
        title: "Secure the property",
        text: "We assess the damage, then board up, tarp and stabilize so the building is protected from further loss. If it's an insured loss, we help you take the first steps to open the claim.",
      },
      {
        title: "Scope and estimate",
        text: "We photograph and document every area of damage and write a detailed scope and estimate. Then we walk it through with your adjuster so every necessary repair is accounted for.",
      },
      {
        title: "Clean and restore",
        text: "Smoke, soot, water from firefighting and affected contents are dealt with before any rebuilding starts, so odor and damage don't get sealed in behind new walls.",
      },
      {
        title: "Permit and rebuild",
        text: "Same team, no handoff. We pull permits and complete the structural repairs and finishes. If hidden damage turns up once walls are open, we document it and send it to the adjuster before moving on.",
      },
      {
        title: "Walkthrough and handover",
        text: "Final walkthrough with your property team, punch list closed, warranty paperwork in hand.",
      },
    ],
    callChecklist:
      "Property address and on-site contact · areas affected · whether the building is secured · insurance carrier and claim number, if you have one.",
    urgentLine: "Fire, smoke or water damage right now?",
    gallery: [
      { src: "/photo/Fisher before.jpg", alt: "Fire-damaged kitchen before restoration", label: "Before" },
      { src: "/photo/Fisher after.jpg", alt: "Kitchen rebuilt by Heritage after fire", label: "After" },
      { src: "/photo/Monnett Fire Before.jpg", alt: "Fire damage before restoration", label: "Before" },
      { src: "/photo/Monnett Fire After.jpg", alt: "Completed fire rebuild by Heritage", label: "After" },
    ],
  },
  water: {
    key: "water",
    path: "/commercial/water-restoration",
    navLabel: "Commercial Water Restoration",
    eyebrow: "Commercial water damage restoration",
    title: "Commercial water damage restoration",
    titleAccent: "and rebuild, under one contract.",
    intro:
      "Water doesn't stay where it starts. In a multi-unit building it moves through walls and ceilings into the spaces below, and every hour adds to the damage. Heritage extracts it, dries the structure and rebuilds what was lost, with one crew and one point of contact.",
    metaTitle: "Commercial Water Damage Restoration | Heritage Restoration",
    metaDescription:
      "Commercial and multi-family water damage restoration in Western Washington: extraction, measured drying and rebuild under one contract.",
    heroImg: "/photo/water-flooded-hallway.jpg",
    heroAlt: "Flooded multi-unit hallway during commercial water mitigation",
    handles: [
      { title: "Burst and frozen pipes", text: "Supply lines, risers and pipes that split in a cold snap." },
      { title: "Sprinkler discharge", text: "Fire sprinkler heads that fire, freeze or get knocked loose." },
      { title: "Roof and window leaks", text: "Storm water getting in through the roof or envelope." },
      { title: "Sewer and drain backups", text: "Category 3 water handled with the right protection." },
      { title: "Appliance and water heater failures", text: "Washers, dishwashers, ice makers and tanks." },
      { title: "Unit-to-unit leaks", text: "Water from one unit damaging the units and ceilings below." },
    ],
    steps: [
      {
        title: "Stop the water and extract",
        text: "We help locate and shut off the source, extract standing water with truck-mounted equipment, and protect contents, equipment and the areas still dry. If it's an insured loss, we help you take the first steps to open the claim.",
      },
      {
        title: "Dry and monitor",
        text: "We map hidden moisture with thermal imaging, set our own dehumidifiers and air movers, and log readings in walls, floors and framing every day until they reach dry standard. Those drying logs go to your adjuster.",
      },
      {
        title: "Scope and estimate",
        text: "We photograph and document every area of damage and write a detailed scope and estimate. Then we walk it through with your adjuster so every necessary repair is accounted for.",
      },
      {
        title: "Remove and rebuild",
        text: "Same team, no handoff. Materials that can't be saved come out, then we rebuild drywall, flooring, cabinets and finishes. Hidden damage found along the way gets documented and sent to the adjuster.",
      },
      {
        title: "Walkthrough and handover",
        text: "Final walkthrough with your property team, punch list closed, warranty paperwork in hand.",
      },
    ],
    callChecklist:
      "Property address and on-site contact · where the water is coming from and whether it's shut off · which units or floors are affected · insurance carrier and claim number, if you have one.",
    urgentLine: "Water coming in right now?",
    gallery: [
      { src: "/photo/water-flooded-hallway.jpg", alt: "Flooded hallway before water mitigation", label: "Water in" },
      { src: "/photo/water2-containment.jpg", alt: "Containment and drying set up by Heritage", label: "Containment" },
      { src: "/photo/water2-flir-meter.jpg", alt: "Thermal imaging used to find hidden moisture", label: "Moisture mapping" },
      { src: "/photo/water-cta-before-after.png", alt: "Water damage before and after restoration", label: "Before / after" },
    ],
  },
};

/** Shown on the commercial pages and emitted as FAQPage JSON-LD — keep the two in sync by using this list for both. */
export const COMMERCIAL_FAQ = [
  {
    question: "Do you handle both the cleanup and the rebuild on commercial properties?",
    answer:
      "Yes. Heritage handles emergency board-up, water extraction and drying, smoke and soot cleanup, permits and the full reconstruction with one crew and one point of contact. There is no handoff between a mitigation company and a separate general contractor.",
  },
  {
    question: "Can tenants, patients or guests stay while the work is done?",
    answer:
      "In most cases, yes. Apartments, clinics and hotels can't just close, so we phase the work and tell you up front which areas go offline and for how long.",
  },
  {
    question: "Do you work directly with our insurance carrier and adjuster?",
    answer:
      "Yes. We offer direct insurance billing and work with your adjuster throughout the claim. We photograph and document every area of damage, write a detailed scope and estimate, and walk it through with the adjuster. Hidden damage found during the work is documented and sent to the adjuster before we move on.",
  },
  {
    question: "How quickly can a crew get to our building?",
    answer:
      "Dispatch answers 24/7 at (360) 456-1886, and crews are on site within 60 minutes of dispatch in our Western Washington service area.",
  },
  {
    question: "What is the commercial priority list?",
    answer:
      "Before a loss, we walk your property at no charge and record shutoff locations, access and key contacts. If something happens, your call goes to the front of the line and our crew arrives already knowing the building.",
  },
  {
    question: "Are you licensed and certified for commercial restoration?",
    answer:
      "Heritage Restoration is licensed and bonded in Washington (contractor HERITRI964J2), an IICRC Certified Firm, and offers a 5-year warranty on workmanship, with written terms on request.",
  },
  {
    question: "What types of commercial water damage do you handle?",
    answer:
      "Burst and frozen pipes, fire sprinkler discharge, roof and window leaks, sewer and drain backups (Category 3 water), appliance and water heater failures, and unit-to-unit leaks in multi-family buildings.",
  },
  {
    question: "Which areas do you serve?",
    answer:
      "Western Washington, from our offices in Lacey (North, (360) 456-1886) and Chehalis (South, (360) 345-1015), including Thurston, Pierce, Lewis and Mason counties.",
  },
];

export const COMMERCIAL_STATS = [
  { value: "2004", label: "Locally owned since" },
  { value: "24/7", label: "Dispatch answers" },
  { value: "60 min", label: "On site after dispatch" },
  { value: "5 yr", label: "Workmanship warranty" },
];
