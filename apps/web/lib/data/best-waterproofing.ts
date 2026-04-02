/**
 * Best Waterproofing Companies — City-Specific Landing Pages
 *
 * SEO landing pages targeting "best waterproofing companies in [city]" keywords.
 * Uses city multipliers from costs.ts for price adjustments.
 */

import {
  cityMultipliers,
  getCityBySlug,
  getCityAdjustedPrice,
  formatPriceRange,
  type CityMultiplier,
} from './costs';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface ServiceDetail {
  name: string;
  slug: string;
  description: string;
  process: string[];
  basePriceMin: number;
  basePriceMax: number;
  labourPct: number;
  materialPct: number;
  timeline: string;
  image: string;
  imageAlt: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface CityWaterproofingData {
  slug: string;
  city: string;
  region: string;
  metaTitle: string;
  metaDescription: string;
  heroTagline: string;
  cityContext: string;
  commonIssues: string[];
  challengeCards: { icon: string; title: string; description: string }[];
  neighborhoods: string[];
  rebateInfo: string;
  faqs: FAQ[];
  nearbyCities: string[];
}

// ---------------------------------------------------------------------------
// Shared educational content (same for all cities)
// ---------------------------------------------------------------------------
export const whatIsWaterproofing = {
  title: 'What Is Basement Waterproofing?',
  paragraphs: [
    'Basement waterproofing is the process of preventing water from entering your home\'s foundation and basement space. It involves a combination of techniques — drainage systems, waterproof membranes, sump pumps, and foundation crack repair — designed to keep your basement dry and structurally sound.',
    'Water enters basements through three main pathways: through cracks in foundation walls, through the floor-wall joint (called the cove joint), and up through the concrete floor slab itself. The approach to waterproofing depends on which pathway is causing the problem and whether the solution addresses water from the exterior (positive side) or interior (negative side).',
    'In the GTA, most homes sit on heavy clay soil that retains water and creates hydrostatic pressure against foundation walls. This pressure, combined with Ontario\'s freeze-thaw cycles, means virtually every home will eventually need some form of waterproofing attention.',
  ],
};

export const warningSignsData = {
  title: 'Warning Signs Your Basement Needs Waterproofing',
  signs: [
    { icon: 'water_drop', title: 'Water Stains or Puddles', description: 'Visible water marks on basement walls or pooling water on the floor after rain or snowmelt. This is the most obvious sign of active water infiltration.' },
    { icon: 'air', title: 'Musty or Damp Smell', description: 'A persistent musty odor indicates moisture is present even when you can\'t see water. Mold and mildew thrive in damp environments and produce this characteristic smell.' },
    { icon: 'texture', title: 'White Mineral Deposits (Efflorescence)', description: 'White, chalky deposits on concrete or block walls. This is salt left behind when water passes through the foundation and evaporates — proof that water is moving through the wall.' },
    { icon: 'format_paint', title: 'Peeling Paint or Bubbling Walls', description: 'Paint peeling off basement walls, wallpaper bubbling, or drywall becoming soft or crumbly. Moisture behind the wall surface causes these visible failures.' },
    { icon: 'vertical_split', title: 'Foundation Cracks', description: 'Horizontal, vertical, or stair-step cracks in foundation walls. Vertical cracks may indicate settling; horizontal cracks suggest hydrostatic pressure from saturated soil.' },
    { icon: 'mold', title: 'Visible Mold Growth', description: 'Black, green, or white mold colonies on walls, floors, or stored items. Mold needs moisture to grow — its presence means your basement has a water problem.' },
    { icon: 'carpenter', title: 'Sticking Doors or Windows', description: 'Doors and windows that suddenly become hard to open or close. This can indicate foundation movement caused by water-related soil shifting.' },
    { icon: 'bug_report', title: 'Insects or Pests', description: 'Increased insects (silverfish, centipedes, earwigs) or rodents in the basement. These pests are attracted to damp, dark environments.' },
  ],
};

export const useCasesData = {
  title: 'Why Waterproof Your Basement?',
  cases: [
    { icon: 'shield', title: 'Protect Your Investment', description: 'A wet basement reduces your home\'s value by 10-25%. Waterproofing protects a property worth $500,000 – $2,000,000+ for a fraction of that cost.' },
    { icon: 'apartment', title: 'Create a Legal Basement Apartment', description: 'Ontario building code requires habitable basement units to be free of water infiltration. Waterproofing is step one before any basement apartment conversion.' },
    { icon: 'health_and_safety', title: 'Eliminate Health Hazards', description: 'Damp basements breed mold, which causes respiratory problems, allergies, and asthma — especially dangerous for children and the elderly.' },
    { icon: 'weekend', title: 'Reclaim Living Space', description: 'A dry basement becomes a family room, home office, gym, or guest suite — adding usable square footage without an addition.' },
    { icon: 'savings', title: 'Qualify for Insurance Coverage', description: 'Many insurers require or incentivize sump pumps and backwater valves. Waterproofing can lower your home insurance premiums.' },
    { icon: 'real_estate_agent', title: 'Increase Resale Value', description: 'Buyers pay a premium for homes with documented waterproofing. A transferable warranty adds $15,000 – $30,000 in perceived value.' },
  ],
};

export const permitChecklistData = {
  title: 'Waterproofing Permits & Requirements in Ontario',
  intro: 'Not all waterproofing work requires a permit, but some does. Here\'s what you need to know:',
  items: [
    { required: false, task: 'Interior crack injection (epoxy or polyurethane)', note: 'Minor repair — no permit needed' },
    { required: false, task: 'Sump pump replacement (like-for-like)', note: 'No permit for replacing existing equipment' },
    { required: true, task: 'New sump pump installation (where none existed)', note: 'Plumbing permit may be required for new discharge line' },
    { required: true, task: 'Backwater valve installation', note: 'Plumbing permit required — needed for rebate applications' },
    { required: true, task: 'Exterior excavation deeper than 1.2 metres', note: 'Excavation permit or building permit depending on municipality' },
    { required: true, task: 'Interior weeping tile and drainage system', note: 'May require plumbing permit for sump and discharge' },
    { required: true, task: 'Any work affecting municipal sewer connection', note: 'Always requires municipal permit and inspection' },
  ],
  tip: 'Your waterproofing contractor should handle all permit applications. At RenoNext, all permit paperwork is managed by the contractor and documented in your project record.',
};

export const rebateProgramsData = {
  title: 'GTA Waterproofing Rebates & Subsidies',
  programs: [
    { municipality: 'City of Toronto', program: 'Basement Flooding Protection Subsidy', amounts: ['Backwater valve: up to $1,250', 'Sump pump: up to $1,750', 'Pipe severance/capping: up to $400'], total: 'Up to $3,400 per property', link: 'Apply through 311 Toronto' },
    { municipality: 'Region of Peel', program: 'Backwater Valve Subsidy', amounts: ['Backwater valve installation: up to $2,800'], total: 'Up to $2,800 per property', link: 'Apply through Region of Peel' },
    { municipality: 'City of Hamilton', program: 'Protective Plumbing Program', amounts: ['Backwater valve + sump pump: up to $2,750'], total: 'Up to $2,750 per property', link: 'Apply through Hamilton Water Division' },
    { municipality: 'York Region', program: 'Basement Flooding Prevention', amounts: ['Backwater valve subsidy: varies by municipality'], total: 'Varies — check with your local municipality', link: 'Contact your municipality' },
    { municipality: 'Durham Region', program: 'Basement Flooding Protection', amounts: ['Backwater valve + sump pump subsidies available periodically'], total: 'Varies by program cycle', link: 'Contact Durham Region' },
    { municipality: 'Halton Region', program: 'Stormwater Management', amounts: ['Periodic basement flooding prevention programs'], total: 'Varies by program', link: 'Contact Halton Region or your local municipality' },
  ],
};

export const methodComparisonData = {
  title: 'Interior vs. Exterior Waterproofing: Which Is Right for You?',
  rows: [
    { factor: 'How it works', interior: 'Captures water that enters and redirects it to a sump pump', exterior: 'Prevents water from reaching the foundation wall' },
    { factor: 'Effectiveness', interior: 'Manages water — doesn\'t stop it from entering the wall', exterior: 'Stops water at the source — gold standard approach' },
    { factor: 'Cost (per wall)', interior: '$5,000 – $10,000', exterior: '$5,000 – $12,000' },
    { factor: 'Disruption', interior: 'Minimal — work done inside, no landscaping damage', exterior: 'Significant — excavation disrupts landscaping, driveways, decks' },
    { factor: 'Best for', interior: 'Homes with finished exteriors, limited access, or budget constraints', exterior: 'Homes with accessible exteriors and active wall leaks' },
    { factor: 'Warranty', interior: '15-20 years (pump components need replacement)', exterior: '25-30+ years for membrane system' },
    { factor: 'Timeline', interior: '2-4 days', exterior: '3-7 days per wall' },
  ],
};

// ---------------------------------------------------------------------------
// 5 core waterproofing services (base Toronto pricing)
// ---------------------------------------------------------------------------
export const waterproofingServices: ServiceDetail[] = [
  {
    name: 'Exterior Waterproofing',
    slug: 'waterproofing',
    description:
      'Full excavation around the foundation to expose the wall, followed by cleaning, crack repair, application of a rubberized membrane, dimpled drainage board, and new weeping tile. This is the gold standard for stopping water infiltration at the source.',
    process: [
      'Excavate soil to the base of the footing',
      'Clean and inspect the foundation wall',
      'Repair all cracks with hydraulic cement',
      'Apply rubberized waterproofing membrane',
      'Install dimpled drainage board over membrane',
      'Lay new weeping tile wrapped in filter fabric',
      'Backfill with clear gravel and native soil',
      'Re-grade surface for proper drainage away from home',
    ],
    basePriceMin: 5000,
    basePriceMax: 12000,
    labourPct: 65,
    materialPct: 35,
    timeline: '3 – 7 days per wall',
    image: '/images/pros/dryspace/exterior-1.webp',
    imageAlt: 'Exterior waterproofing excavation by DrySpace Waterproofing',
  },
  {
    name: 'Interior Waterproofing',
    slug: 'waterproofing',
    description:
      'An interior French drain system that captures water entering through the floor-wall joint and channels it to a sump pit. Ideal when exterior excavation is not feasible due to driveways, decks, or landscaping.',
    process: [
      'Break concrete floor along the perimeter (12-inch strip)',
      'Excavate a trench below the slab',
      'Install perforated drain pipe bedded in gravel',
      'Connect drain to sump pit with check valve',
      'Apply vapor barrier on interior wall',
      'Pour new concrete to close the trench',
      'Install sump pump with battery backup',
    ],
    basePriceMin: 5000,
    basePriceMax: 10000,
    labourPct: 55,
    materialPct: 45,
    timeline: '2 – 4 days',
    image: '/images/pros/dryspace/interior.webp',
    imageAlt: 'Interior waterproofing drain system installed by DrySpace',
  },
  {
    name: 'Sump Pump Installation',
    slug: 'waterproofing',
    description:
      'Professional sump pump installation with a primary pump and battery-backup unit. Includes a properly sized pit, check valve, and exterior discharge line routed away from the foundation.',
    process: [
      'Cut and remove concrete slab at pump location',
      'Excavate sump pit (18" x 24" minimum)',
      'Install pit liner with gravel base',
      'Set primary submersible pump with float switch',
      'Install battery backup pump (12V marine battery)',
      'Connect discharge pipe through rim joist',
      'Route discharge line 6+ feet from foundation',
      'Test both primary and backup systems',
    ],
    basePriceMin: 800,
    basePriceMax: 3500,
    labourPct: 50,
    materialPct: 50,
    timeline: '1 – 2 days',
    image: '/images/pros/dryspace/sump-pump.webp',
    imageAlt: 'Sump pump with battery backup installed by DrySpace',
  },
  {
    name: 'Backwater Valve Installation',
    slug: 'waterproofing',
    description:
      'A backwater valve prevents sewer backups during heavy storms by automatically closing when water flows backward through the sewer line. Many GTA municipalities offer rebates up to $1,250 for installation.',
    process: [
      'Locate main sewer line and determine valve position',
      'Break concrete floor over sewer pipe',
      'Cut existing pipe and fit backwater valve',
      'Install access lid flush with floor',
      'Pour new concrete and finish patch',
      'Test valve operation and flow direction',
      'Complete rebate application paperwork',
    ],
    basePriceMin: 2000,
    basePriceMax: 5000,
    labourPct: 60,
    materialPct: 40,
    timeline: '1 day',
    image: '/images/pros/dryspace/excellence.webp',
    imageAlt: 'Backwater valve installation by DrySpace Waterproofing',
  },
  {
    name: 'Foundation Crack Repair',
    slug: 'foundation-repair',
    description:
      'Structural and non-structural crack repair using epoxy or polyurethane injection from the interior, or excavation and membrane patching from the exterior. The method depends on the crack type, width, and whether it is actively leaking.',
    process: [
      'Inspect crack width, depth, and pattern',
      'Clean crack and remove loose material',
      'Install injection ports at 8-12 inch intervals',
      'Seal surface between ports with epoxy paste',
      'Inject crack with epoxy (structural) or polyurethane (waterproofing)',
      'Allow cure time (24-48 hours for epoxy)',
      'Remove surface seal and ports',
      'Optional: apply exterior membrane if excavated',
    ],
    basePriceMin: 500,
    basePriceMax: 1500,
    labourPct: 70,
    materialPct: 30,
    timeline: '2 – 4 hours per crack',
    image: '/images/pros/dryspace/crack-repair.webp',
    imageAlt: 'Foundation crack repair by DrySpace Waterproofing',
  },
];

// ---------------------------------------------------------------------------
// City-specific data
// ---------------------------------------------------------------------------
const cityData: Record<string, Omit<CityWaterproofingData, 'slug' | 'city' | 'region' | 'nearbyCities'>> = {
  toronto: {
    metaTitle: 'Best Waterproofing Companies in Toronto (2026) | RenoNext',
    metaDescription:
      'Find Toronto\'s top-rated waterproofing contractors. Interior & exterior waterproofing, sump pumps, backwater valves. Verified pros with real project photos.',
    heroTagline: 'Protect Your Toronto Home From Water Damage',
    cityContext:
      'Toronto sits on heavy clay soil that retains water and creates hydrostatic pressure against basement walls. With homes dating back over 100 years in neighborhoods like The Annex, Leslieville, and East York, aging foundations are a leading cause of basement leaks. The city\'s combined sewer system also makes basements vulnerable to sewer backups during major storms.',
    commonIssues: [
      'Clay soil creating hydrostatic pressure against foundations',
      'Pre-1950 rubble stone foundations with no waterproofing membrane',
      'Combined sewer system causing backup during storms',
      'Aging weeping tile (clay tile) that has collapsed or clogged',
      'Frost-heave cracking in foundations from Ontario freeze-thaw cycles',
      'Rising water table in lakefront and ravine-adjacent neighborhoods',
    ],
    challengeCards: [
      { icon: 'terrain', title: 'Clay Soil', description: 'Toronto\'s dense clay retains water and puts constant pressure on foundation walls, especially after spring thaw.' },
      { icon: 'calendar_month', title: 'Aging Homes', description: 'Over 40% of Toronto homes were built before 1980, with original waterproofing that has long since deteriorated.' },
      { icon: 'flood', title: 'Storm Surge Risk', description: 'Toronto\'s combined sewer system means heavy rainfall can push sewage back up through basement floor drains.' },
      { icon: 'ac_unit', title: 'Freeze-Thaw Cycles', description: 'Ontario\'s winters cause repeated expansion and contraction in concrete, opening hairline cracks over time.' },
    ],
    neighborhoods: ['The Annex', 'Leslieville', 'East York', 'Riverdale', 'High Park', 'Scarborough', 'Etobicoke', 'North York', 'Rosedale', 'The Beaches', 'Danforth', 'Junction'],
    rebateInfo: 'The City of Toronto Basement Flooding Protection Subsidy covers up to $3,400 per property: backwater valve ($1,250), sump pump ($1,750), and pipe severance/capping ($400). Apply through 311 Toronto.',
    faqs: [
      { question: 'How much does basement waterproofing cost in Toronto?', answer: 'Interior waterproofing in Toronto typically costs $5,000 – $10,000. Exterior waterproofing ranges from $5,000 – $12,000 per wall, or $18,000 – $40,000 for a full perimeter. Prices depend on home size, soil conditions, and access.' },
      { question: 'Does the City of Toronto offer waterproofing rebates?', answer: 'Yes. The City of Toronto Basement Flooding Protection Subsidy Program offers up to $3,400 per property for installing backwater valves ($1,250), sump pumps ($1,750), and pipe severance/capping ($400). Applications are processed through the city\'s 311 service.' },
      { question: 'How long does exterior waterproofing take in Toronto?', answer: 'A single wall takes 3-5 days. Full perimeter waterproofing on a typical Toronto semi-detached or detached home takes 2-3 weeks, depending on access, utilities, and weather conditions.' },
      { question: 'Do I need a permit for waterproofing in Toronto?', answer: 'Minor waterproofing repairs (crack injection, sump pump) typically do not require a permit. Exterior excavation deeper than 1.2 metres may require a permit, and any work near the property line requires notice to neighbours. Always check with Toronto Building.' },
      { question: 'Is interior or exterior waterproofing better?', answer: 'Exterior waterproofing addresses the source of water entry and is generally more effective long-term. Interior systems manage water that has already entered. The best approach depends on your home\'s condition, budget, and whether exterior access is feasible.' },
      { question: 'How do I know if my Toronto home needs waterproofing?', answer: 'Signs include damp or musty basement smell, white mineral deposits (efflorescence) on walls, visible cracks with staining, peeling paint, or actual water pooling. If your home was built before 1980 and has never been waterproofed, it likely needs assessment.' },
      { question: 'What is hydrostatic pressure?', answer: 'Hydrostatic pressure is the force exerted by water in saturated soil against your foundation walls and floor. In Toronto\'s clay soil, this pressure can be significant — especially after spring thaw or heavy rain — and is the primary cause of basement leaks through the floor-wall joint.' },
      { question: 'How long does waterproofing last?', answer: 'Exterior waterproofing with a rubberized membrane lasts 25-30+ years. Interior drainage systems are typically permanent (the drain pipe doesn\'t wear out), but sump pumps need replacement every 7-10 years. Backwater valves should be inspected annually.' },
      { question: 'Can I waterproof my basement myself?', answer: 'DIY waterproofing products (paint-on sealers) provide only temporary moisture reduction and do not address the root cause. Professional waterproofing involves excavation, drainage systems, and engineered solutions that require specialized equipment and expertise. We strongly recommend professional installation.' },
      { question: 'What warranty does DrySpace Waterproofing offer?', answer: 'DrySpace Waterproofing offers a 25-year transferable warranty on exterior waterproofing membrane systems and a 15-year warranty on interior drainage systems. The warranty transfers to new homeowners if you sell, adding value to your property.' },
      { question: 'Does waterproofing increase my home\'s value?', answer: 'Yes. A professionally waterproofed basement adds $15,000 – $30,000 in perceived value. Buyers specifically look for waterproofing documentation, and a transferable warranty is a significant selling point in Toronto\'s competitive real estate market.' },
      { question: 'What\'s the difference between damp-proofing and waterproofing?', answer: 'Damp-proofing is a thin tar coating applied to new construction that resists moisture but not water under pressure. Waterproofing uses a rubberized membrane that creates a fully waterproof barrier. Most pre-2000 homes only have damp-proofing, which deteriorates within 10-15 years.' },
    ],
  },
  mississauga: {
    metaTitle: 'Best Waterproofing Companies in Mississauga (2026) | RenoNext',
    metaDescription:
      'Top-rated waterproofing contractors in Mississauga. Interior & exterior waterproofing, sump pumps, backwater valves. Verified pros, real project photos.',
    heroTagline: 'Protect Your Mississauga Home From Water Damage',
    cityContext:
      'Mississauga\'s rapid growth from the 1960s through the 1990s means thousands of homes are now 30-60 years old — the age when original waterproofing fails. Subdivisions near the Credit River and Lake Ontario face higher water table levels, while clay-heavy soil in areas like Meadowvale and Erin Mills creates persistent basement moisture issues.',
    commonIssues: [
      'Homes from 1960s-1990s with deteriorating original waterproofing',
      'High water table near Credit River corridor',
      'Clay soil in newer subdivisions causing foundation pressure',
      'Poorly graded lots in tract-built developments',
      'Window well drainage failures in split-level homes',
      'Sump pump failures during spring thaw and storm events',
    ],
    challengeCards: [
      { icon: 'home_work', title: 'Aging Subdivisions', description: 'Mississauga\'s 1970s-80s subdivisions are reaching the age where original waterproofing coatings have failed.' },
      { icon: 'water', title: 'Credit River Corridor', description: 'Homes near the Credit River face elevated water tables that put constant pressure on basement walls and floors.' },
      { icon: 'terrain', title: 'Clay-Heavy Soil', description: 'Many Mississauga neighborhoods sit on dense clay that retains water and swells, pressing against foundations.' },
      { icon: 'landscape', title: 'Poor Lot Grading', description: 'Tract-built homes often have grading that directs water toward the foundation rather than away from it.' },
    ],
    neighborhoods: ['Cooksville', 'Streetsville', 'Meadowvale', 'Erin Mills', 'Port Credit', 'Clarkson', 'Malton', 'Lorne Park', 'Dixie', 'Churchill Meadows'],
    rebateInfo: 'Region of Peel Backwater Valve Subsidy covers up to $2,800 per property. Apply through Region of Peel stormwater programs.',
    faqs: [
      { question: 'How much does waterproofing cost in Mississauga?', answer: 'Interior waterproofing in Mississauga costs $4,650 – $9,300 on average. Exterior waterproofing runs $4,650 – $11,160 per wall. Mississauga pricing is approximately 5% lower than Toronto due to reduced labour costs in Peel Region.' },
      { question: 'Does Mississauga offer rebates for waterproofing?', answer: 'The Region of Peel offers a Backwater Valve Subsidy of up to $2,800 for installing a backwater valve. Additionally, some homeowners may qualify for the Regional Stormwater Charge credit for managing water on their property.' },
      { question: 'What areas of Mississauga are most prone to basement flooding?', answer: 'Areas near the Credit River (including Port Credit, Streetsville, and Meadowvale), homes along Cooksville Creek, and low-lying subdivisions in Malton and Clarkson tend to have the highest risk of basement water issues.' },
      { question: 'How long does waterproofing last?', answer: 'Properly installed exterior waterproofing with a rubberized membrane lasts 25-30+ years. Interior systems with a quality sump pump last 15-20 years for the pump, while the drain system is typically permanent. Backwater valves should be inspected annually.' },
      { question: 'Do I need a permit for waterproofing in Mississauga?', answer: 'Basic waterproofing repairs do not usually require a permit. Deep excavation work near property lines or affecting municipal infrastructure may require a permit from the City of Mississauga Building Division.' },
      { question: 'What warranty does DrySpace offer on waterproofing?', answer: 'DrySpace Waterproofing provides a 25-year transferable warranty on exterior membrane systems and 15-year warranty on interior drainage systems. All work is documented with GPS-verified photos through RenoNext.' },
      { question: 'What is the difference between damp-proofing and waterproofing?', answer: 'Damp-proofing is a thin asphalt coating that resists moisture but not pressurized water. True waterproofing uses a rubberized membrane that creates a watertight barrier. Most homes built before 2000 only have damp-proofing, which fails within 10-15 years.' },
    ],
  },
  brampton: {
    metaTitle: 'Best Waterproofing Companies in Brampton (2026) | RenoNext',
    metaDescription:
      'Top waterproofing contractors in Brampton. Exterior & interior basement waterproofing, sump pumps, crack repair. Verified, insured pros.',
    heroTagline: 'Protect Your Brampton Home From Basement Flooding',
    cityContext:
      'Brampton is one of Canada\'s fastest-growing cities, with a mix of newer construction and established 1970s-80s neighborhoods. The Etobicoke Creek floodplain runs through the city, and many homes in areas like Bramalea, Heart Lake, and Castlemore sit on heavy clay soil that contributes to persistent basement moisture problems.',
    commonIssues: [
      'Etobicoke Creek floodplain affecting nearby subdivisions',
      'Rapid new construction with settling foundations',
      'Clay soil in Bramalea and Heart Lake causing hydrostatic pressure',
      'Older homes in central Brampton with no waterproofing membrane',
      'Inadequate lot grading in newer developments',
      'Downspout extensions discharging too close to foundations',
    ],
    challengeCards: [
      { icon: 'flood', title: 'Floodplain Risk', description: 'Etobicoke Creek runs through Brampton, putting nearby homes at elevated flood risk during heavy storms.' },
      { icon: 'construction', title: 'New Build Settling', description: 'Brampton\'s rapid growth means many new homes experience foundation settling in the first 5-10 years.' },
      { icon: 'terrain', title: 'Heavy Clay Soil', description: 'Dense clay throughout Bramalea and Heart Lake retains water and presses against foundation walls.' },
      { icon: 'water_drop', title: 'Drainage Gaps', description: 'Many newer subdivisions have insufficient grading and downspout routing, directing water toward foundations.' },
    ],
    neighborhoods: ['Bramalea', 'Heart Lake', 'Castlemore', 'Springdale', 'Mount Pleasant', 'Sandalwood', 'Gore Meadows', 'Fletcher\'s Meadow', 'Central Brampton', 'Snelgrove'],
    rebateInfo: 'Region of Peel Backwater Valve Subsidy covers up to $2,800 per property. Apply through Region of Peel.',
    faqs: [
      { question: 'How much does waterproofing cost in Brampton?', answer: 'Interior waterproofing in Brampton typically costs $4,500 – $9,000. Exterior waterproofing costs $4,500 – $10,800 per wall. Brampton pricing is roughly 8% lower than Toronto due to reduced labour rates in Peel Region.' },
      { question: 'Does Brampton offer waterproofing rebates?', answer: 'Yes. The Region of Peel offers a Backwater Valve Subsidy up to $2,800. Brampton homeowners can apply through Peel Region\'s stormwater management programs.' },
      { question: 'What waterproofing do new Brampton homes need?', answer: 'Even newer homes (built after 2000) in Brampton may need sump pump upgrades, backwater valve installation, and improved grading. Builder-grade waterproofing is often minimal — a tar coating rather than a proper membrane.' },
      { question: 'How do I find a reliable waterproofing contractor in Brampton?', answer: 'Look for contractors with WSIB coverage, liability insurance, and verifiable project photos. RenoNext verifies all pros on our platform, including DrySpace Waterproofing, which serves the entire GTA including Brampton.' },
      { question: 'Is basement waterproofing worth it in Brampton?', answer: 'Absolutely. A wet basement reduces your home value by 10-15% and creates health risks from mold. Waterproofing typically costs $5,000-$15,000 but protects a property worth $800,000+.' },
      { question: 'What warranty does DrySpace offer on waterproofing?', answer: 'DrySpace Waterproofing provides a 25-year transferable warranty on exterior membrane systems and 15-year warranty on interior drainage systems. All work is documented with GPS-verified photos through RenoNext.' },
      { question: 'What is the difference between damp-proofing and waterproofing?', answer: 'Damp-proofing is a thin asphalt coating that resists moisture but not pressurized water. True waterproofing uses a rubberized membrane that creates a watertight barrier. Most homes built before 2000 only have damp-proofing, which fails within 10-15 years.' },
    ],
  },
  vaughan: {
    metaTitle: 'Best Waterproofing Companies in Vaughan (2026) | RenoNext',
    metaDescription:
      'Vaughan\'s top waterproofing contractors. Interior & exterior waterproofing, sump pumps, backwater valves. Verified pros with GPS-stamped project records.',
    heroTagline: 'Keep Your Vaughan Basement Dry Year-Round',
    cityContext:
      'Vaughan has experienced explosive growth, with new subdivisions in Kleinburg, Vellore Village, and Maple built on clay-heavy soil. Established neighborhoods in Woodbridge and Thornhill feature homes from the 1970s-90s that are now reaching the age where original waterproofing fails. The Humber River watershed adds flooding risk in low-lying areas.',
    commonIssues: [
      'New subdivisions settling on compacted clay fill',
      'Humber River watershed flooding risk',
      '1980s-90s homes in Woodbridge with aging waterproofing',
      'Walkout basements in Kleinburg with inadequate drainage',
      'High water table in Maple and Vellore areas',
      'Stone veneer homes trapping moisture against foundations',
    ],
    challengeCards: [
      { icon: 'apartment', title: 'New Subdivisions', description: 'Vaughan\'s rapid growth means many homes sit on backfilled clay that retains water around foundations.' },
      { icon: 'water', title: 'Humber River Watershed', description: 'Properties near the Humber River face elevated flood risk and higher water tables year-round.' },
      { icon: 'home_work', title: 'Aging Woodbridge Homes', description: 'Woodbridge\'s 1970s-90s homes are reaching the 30-40 year mark where waterproofing coatings break down.' },
      { icon: 'ac_unit', title: 'Frost Penetration', description: 'Vaughan\'s elevation means slightly colder winters, with frost penetrating deeper and widening foundation cracks.' },
    ],
    neighborhoods: ['Woodbridge', 'Maple', 'Kleinburg', 'Thornhill', 'Vellore Village', 'Concord', 'Patterson', 'Sonoma Heights', 'Elder Mills'],
    rebateInfo: 'York Region periodically offers basement flooding prevention subsidies. Contact the City of Vaughan for current program availability.',
    faqs: [
      { question: 'How much does waterproofing cost in Vaughan?', answer: 'Interior waterproofing in Vaughan costs $4,800 – $9,700. Exterior waterproofing runs $4,800 – $11,650 per wall. Vaughan pricing is about 3% below Toronto due to slightly lower labour rates in York Region.' },
      { question: 'Do Vaughan homes need backwater valves?', answer: 'Yes. Since 2014, the City of Vaughan has required backwater valves in new construction. Older homes without them are at risk of sewer backup during heavy storms. York Region may offer rebates for installation.' },
      { question: 'What areas of Vaughan flood most?', answer: 'Low-lying areas near the Humber River, parts of Woodbridge near Islington Avenue, and newer subdivisions in Vellore where grading issues are common tend to have the most basement water problems.' },
      { question: 'How long does exterior waterproofing take in Vaughan?', answer: 'A single wall takes 3-5 days. Full perimeter on a typical Vaughan detached home takes 2-3 weeks. Larger estate homes in Kleinburg may take longer due to deeper foundations and larger footprints.' },
      { question: 'Is interior or exterior waterproofing better for Vaughan homes?', answer: 'For older Woodbridge homes, exterior waterproofing is ideal if access allows. For newer homes with finished basements, interior drainage systems avoid disrupting landscaping. A professional assessment determines the best approach.' },
      { question: 'What warranty does DrySpace offer on waterproofing?', answer: 'DrySpace Waterproofing provides a 25-year transferable warranty on exterior membrane systems and 15-year warranty on interior drainage systems. All work is documented with GPS-verified photos through RenoNext.' },
      { question: 'What is the difference between damp-proofing and waterproofing?', answer: 'Damp-proofing is a thin asphalt coating that resists moisture but not pressurized water. True waterproofing uses a rubberized membrane that creates a watertight barrier. Most homes built before 2000 only have damp-proofing, which fails within 10-15 years.' },
    ],
  },
  markham: {
    metaTitle: 'Best Waterproofing Companies in Markham (2026) | RenoNext',
    metaDescription:
      'Top waterproofing contractors in Markham. Basement waterproofing, sump pumps, backwater valves, crack repair. Verified pros, transparent pricing.',
    heroTagline: 'Expert Waterproofing for Markham Homeowners',
    cityContext:
      'Markham features a diverse housing stock, from historic homes in Unionville to modern subdivisions in Cornell and Angus Glen. Rouge River and its tributaries run through the city, elevating flood risk in several neighborhoods. Clay and silty soil conditions make proper foundation drainage essential for homes of all ages.',
    commonIssues: [
      'Rouge River and tributary flooding in spring',
      'Heritage homes in Unionville with stone foundations',
      'Silt and clay soil conditions throughout the city',
      'Newer subdivision settling in Cornell and Berczy areas',
      'Finished basements hiding early signs of water entry',
      'Inadequate weeping tile in 1980s-era developments',
    ],
    challengeCards: [
      { icon: 'water', title: 'Rouge River System', description: 'The Rouge River and tributaries elevate flood risk for homes in eastern Markham, especially during spring melt.' },
      { icon: 'museum', title: 'Heritage Foundations', description: 'Historic Unionville homes have stone foundations that require specialized waterproofing approaches.' },
      { icon: 'terrain', title: 'Silty Clay Soil', description: 'Markham\'s soil conditions retain moisture and create steady hydrostatic pressure against basement walls.' },
      { icon: 'foundation', title: 'Aging Weeping Tile', description: 'Many 1980s-90s homes have original clay weeping tile that has cracked, clogged, or collapsed over time.' },
    ],
    neighborhoods: ['Unionville', 'Milliken', 'Cornell', 'Berczy', 'Angus Glen', 'Markham Village', 'Thornhill', 'Cachet', 'Cathedraltown', 'Box Grove'],
    rebateInfo: 'York Region periodically offers backwater valve and sump pump subsidies. Contact the City of Markham for current availability.',
    faqs: [
      { question: 'How much does waterproofing cost in Markham?', answer: 'Interior waterproofing in Markham costs $4,750 – $9,500. Exterior waterproofing ranges from $4,750 – $11,400 per wall. Markham pricing is about 3% below Toronto.' },
      { question: 'What waterproofing methods work best for Markham homes?', answer: 'For older homes near the Rouge River, exterior waterproofing with new weeping tile is most effective. Newer homes benefit from interior drainage systems and sump pump upgrades. Crack injection works for isolated leaks.' },
      { question: 'Does Markham offer basement flooding rebates?', answer: 'York Region periodically offers subsidy programs for backwater valve and sump pump installation. Check with the City of Markham or York Region for current program availability.' },
      { question: 'How can I tell if my Markham home needs waterproofing?', answer: 'Common signs include musty odors, white mineral deposits on walls (efflorescence), peeling paint, damp carpet, visible cracks with water staining, or standing water after rain. Homes built before 1990 should have a professional assessment.' },
      { question: 'Do new Markham homes need waterproofing?', answer: 'Builder-grade waterproofing is often minimal — a thin tar coating. Many new homes in Cornell and Berczy benefit from sump pump upgrades, backwater valves, and improved lot grading within the first 5-10 years.' },
      { question: 'What warranty does DrySpace offer on waterproofing?', answer: 'DrySpace Waterproofing provides a 25-year transferable warranty on exterior membrane systems and 15-year warranty on interior drainage systems. All work is documented with GPS-verified photos through RenoNext.' },
      { question: 'What is the difference between damp-proofing and waterproofing?', answer: 'Damp-proofing is a thin asphalt coating that resists moisture but not pressurized water. True waterproofing uses a rubberized membrane that creates a watertight barrier. Most homes built before 2000 only have damp-proofing, which fails within 10-15 years.' },
    ],
  },
  'richmond-hill': {
    metaTitle: 'Best Waterproofing Companies in Richmond Hill (2026) | RenoNext',
    metaDescription:
      'Richmond Hill waterproofing contractors. Interior & exterior basement waterproofing, sump pumps, crack repair. Verified pros with real project photos.',
    heroTagline: 'Professional Waterproofing for Richmond Hill Homes',
    cityContext:
      'Richmond Hill spans from the Oak Ridges Moraine in the north to more established areas like Bayview Hill and Mill Pond in the south. The moraine acts as a natural aquifer, meaning homes in northern Richmond Hill often face higher water table levels. Older areas feature 1970s-80s homes with original waterproofing that needs replacement.',
    commonIssues: [
      'Oak Ridges Moraine creating high water table in northern areas',
      'Aging 1970s-80s homes in south Richmond Hill',
      'Spring seepage from underground water table',
      'Clay soil retaining water against foundations',
      'Window well flooding in split-level homes',
      'Clogged original weeping tile systems',
    ],
    challengeCards: [
      { icon: 'landscape', title: 'Oak Ridges Moraine', description: 'The moraine acts as a natural aquifer — homes in north Richmond Hill sit on top of year-round groundwater.' },
      { icon: 'home_work', title: 'Established Neighborhoods', description: 'South Richmond Hill has 40-50 year old homes with original waterproofing that has reached end of life.' },
      { icon: 'water_drop', title: 'Spring Seepage', description: 'Groundwater levels rise significantly during spring thaw, pushing water through any weakness in the foundation.' },
      { icon: 'terrain', title: 'Variable Soil', description: 'Richmond Hill has clay in the south and sandy moraine soils in the north — each requiring different waterproofing approaches.' },
    ],
    neighborhoods: ['Bayview Hill', 'Mill Pond', 'Oak Ridges', 'Jefferson', 'Westbrook', 'Rouge Woods', 'Elgin Mills', 'Observatory', 'Langstaff'],
    rebateInfo: 'York Region periodically offers basement flooding prevention programs. Contact the Town of Richmond Hill for current rebate details.',
    faqs: [
      { question: 'How much does waterproofing cost in Richmond Hill?', answer: 'Interior waterproofing in Richmond Hill costs $4,750 – $9,500. Exterior waterproofing costs $4,750 – $11,400 per wall. Pricing is about 4% below Toronto due to York Region labour rates.' },
      { question: 'Why do northern Richmond Hill homes have water issues?', answer: 'Northern Richmond Hill sits on the Oak Ridges Moraine, a major aquifer. The high water table puts constant hydrostatic pressure on foundations, making waterproofing essential even for newer homes.' },
      { question: 'What rebates are available in Richmond Hill?', answer: 'York Region periodically offers subsidy programs for backwater valves and sump pumps. Check with the Town of Richmond Hill for current program details and application procedures.' },
      { question: 'How often should I inspect my sump pump?', answer: 'Test your sump pump at least twice a year — before spring thaw and before fall rains. In Richmond Hill, especially near the moraine, sump pumps run frequently and may need replacement every 7-10 years.' },
      { question: 'Can waterproofing be done in winter in Richmond Hill?', answer: 'Interior waterproofing (drain systems, sump pumps, crack injection) can be done year-round. Exterior excavation is best done from April through November when the ground is not frozen.' },
      { question: 'What warranty does DrySpace offer on waterproofing?', answer: 'DrySpace Waterproofing provides a 25-year transferable warranty on exterior membrane systems and 15-year warranty on interior drainage systems. All work is documented with GPS-verified photos through RenoNext.' },
      { question: 'What is the difference between damp-proofing and waterproofing?', answer: 'Damp-proofing is a thin asphalt coating that resists moisture but not pressurized water. True waterproofing uses a rubberized membrane that creates a watertight barrier. Most homes built before 2000 only have damp-proofing, which fails within 10-15 years.' },
    ],
  },
  oakville: {
    metaTitle: 'Best Waterproofing Companies in Oakville (2026) | RenoNext',
    metaDescription:
      'Oakville\'s top waterproofing contractors. Basement waterproofing, sump pumps, backwater valves. Verified, insured pros with transparent pricing.',
    heroTagline: 'Premium Waterproofing Solutions for Oakville Homes',
    cityContext:
      'Oakville features some of the GTA\'s most valuable residential properties, from lakefront estates in Southeast Oakville to established homes in Old Oakville and River Oaks. Proximity to Lake Ontario creates higher humidity and water table challenges. Sixteen Mile Creek and its tributaries add flood risk, while clay soil across much of the town amplifies moisture problems.',
    commonIssues: [
      'Lake Ontario proximity raising water table levels',
      'Sixteen Mile Creek flooding during heavy storms',
      'Premium homes with deep basements and complex layouts',
      'Lakefront properties with persistent moisture issues',
      'Clay soil throughout River Oaks and Glen Abbey',
      'Mature trees with roots disrupting weeping tile',
    ],
    challengeCards: [
      { icon: 'waves', title: 'Lakefront Conditions', description: 'Oakville\'s proximity to Lake Ontario raises humidity and water tables, especially in Southeast and Bronte areas.' },
      { icon: 'park', title: 'Creek Systems', description: 'Sixteen Mile Creek and tributaries create flood risk for homes in river valleys and adjacent neighborhoods.' },
      { icon: 'villa', title: 'Premium Properties', description: 'Oakville\'s high-value homes require careful waterproofing that protects finished basements and custom finishes.' },
      { icon: 'eco', title: 'Mature Landscapes', description: 'Established neighborhoods have large trees whose roots can infiltrate and damage weeping tile systems.' },
    ],
    neighborhoods: ['Southeast Oakville', 'Old Oakville', 'Bronte', 'Glen Abbey', 'River Oaks', 'Clearview', 'Falgarwood', 'College Park', 'Iroquois Ridge', 'Joshua Creek'],
    rebateInfo: 'Halton Region offers periodic stormwater management programs. The Town of Oakville may offer credits for backwater valve installation.',
    faqs: [
      { question: 'How much does waterproofing cost in Oakville?', answer: 'Interior waterproofing in Oakville costs $5,150 – $10,300. Exterior waterproofing ranges from $5,150 – $12,360 per wall. Oakville pricing is about 2% above Toronto due to premium labour demand in Halton Region.' },
      { question: 'Why is Oakville waterproofing more expensive?', answer: 'Oakville has higher labour rates due to strong demand and affluent market conditions. Larger home footprints and deeper basements also increase the scope and cost of waterproofing work.' },
      { question: 'Does Oakville offer waterproofing rebates?', answer: 'Halton Region periodically offers stormwater and basement flooding prevention programs. The Town of Oakville may offer credits for installing backwater valves. Check with Halton Region for current subsidies.' },
      { question: 'What waterproofing is best for lakefront Oakville homes?', answer: 'Lakefront properties benefit most from comprehensive exterior waterproofing with a robust membrane and drainage system, combined with a high-capacity sump pump with battery backup. The high water table makes a dual approach essential.' },
      { question: 'How do I maintain waterproofing in Oakville?', answer: 'Test your sump pump bi-annually, keep gutters clean, ensure downspouts discharge 6+ feet from the foundation, maintain positive grading, and have your backwater valve inspected annually.' },
      { question: 'What warranty does DrySpace offer on waterproofing?', answer: 'DrySpace Waterproofing provides a 25-year transferable warranty on exterior membrane systems and 15-year warranty on interior drainage systems. All work is documented with GPS-verified photos through RenoNext.' },
      { question: 'What is the difference between damp-proofing and waterproofing?', answer: 'Damp-proofing is a thin asphalt coating that resists moisture but not pressurized water. True waterproofing uses a rubberized membrane that creates a watertight barrier. Most homes built before 2000 only have damp-proofing, which fails within 10-15 years.' },
    ],
  },
  burlington: {
    metaTitle: 'Best Waterproofing Companies in Burlington (2026) | RenoNext',
    metaDescription:
      'Burlington waterproofing contractors. Interior & exterior waterproofing, sump pumps, backwater valves, crack repair. Verified pros, real results.',
    heroTagline: 'Protect Your Burlington Basement From Water Damage',
    cityContext:
      'Burlington sits between Lake Ontario and the Niagara Escarpment, creating unique drainage challenges. Water flowing down the escarpment raises groundwater levels in lower Burlington, while lakefront areas deal with elevated humidity and water tables. Established neighborhoods like Aldershot and Central Burlington have homes from the 1950s-70s needing waterproofing attention.',
    commonIssues: [
      'Niagara Escarpment runoff raising groundwater levels',
      'Lake Ontario proximity increasing water table',
      '1950s-70s homes in Aldershot with aging foundations',
      'Escarpment-area homes with drainage challenges',
      'Spring melt creating rapid water table rise',
      'Conservation authority restrictions on some properties',
    ],
    challengeCards: [
      { icon: 'landscape', title: 'Escarpment Drainage', description: 'Water flows down the Niagara Escarpment and accumulates in lower Burlington neighborhoods.' },
      { icon: 'waves', title: 'Lake Effect', description: 'Burlington\'s lakefront position means higher water tables and humidity year-round.' },
      { icon: 'history', title: 'Post-War Homes', description: 'Aldershot and Central Burlington have 1950s-70s homes with foundations that predate modern waterproofing.' },
      { icon: 'eco', title: 'Conservation Zones', description: 'Properties near the escarpment or lakeshore may face additional requirements from Conservation Halton.' },
    ],
    neighborhoods: ['Aldershot', 'Central Burlington', 'Appleby', 'Brant Hills', 'Palmer', 'Tyandaga', 'Roseland', 'LaSalle', 'Shoreacres', 'Orchard'],
    rebateInfo: 'Halton Region offers periodic basement flooding prevention programs. Contact the City of Burlington for current subsidy availability.',
    faqs: [
      { question: 'How much does waterproofing cost in Burlington?', answer: 'Interior waterproofing in Burlington costs $4,750 – $9,500. Exterior waterproofing costs $4,750 – $11,400 per wall. Burlington pricing is about 4% lower than Toronto.' },
      { question: 'Why do Burlington homes near the Escarpment get wet basements?', answer: 'Water drains down the Niagara Escarpment and collects in the lower elevations of Burlington. Homes at the base of the escarpment can experience persistent groundwater pressure even in dry weather.' },
      { question: 'Does Burlington offer waterproofing rebates?', answer: 'Halton Region offers periodic basement flooding prevention programs. The City of Burlington may have additional stormwater management incentives. Contact Burlington customer service for current rebate availability.' },
      { question: 'Do I need conservation authority approval for waterproofing?', answer: 'If your property is within a Conservation Halton regulated area (near waterways or the escarpment), you may need a permit from Conservation Halton in addition to city permits for major excavation work.' },
      { question: 'What type of waterproofing works best in Burlington?', answer: 'For lower Burlington homes with high water tables, a combined interior and exterior approach is most effective. Escarpment-area homes often need robust exterior drainage to redirect water away from the foundation.' },
      { question: 'What warranty does DrySpace offer on waterproofing?', answer: 'DrySpace Waterproofing provides a 25-year transferable warranty on exterior membrane systems and 15-year warranty on interior drainage systems. All work is documented with GPS-verified photos through RenoNext.' },
      { question: 'What is the difference between damp-proofing and waterproofing?', answer: 'Damp-proofing is a thin asphalt coating that resists moisture but not pressurized water. True waterproofing uses a rubberized membrane that creates a watertight barrier. Most homes built before 2000 only have damp-proofing, which fails within 10-15 years.' },
    ],
  },
  hamilton: {
    metaTitle: 'Best Waterproofing Companies in Hamilton (2026) | RenoNext',
    metaDescription:
      'Hamilton waterproofing contractors. Basement waterproofing, sump pumps, foundation crack repair, backwater valves. Verified pros with transparent pricing.',
    heroTagline: 'Affordable Waterproofing for Hamilton Homeowners',
    cityContext:
      'Hamilton\'s unique geography — divided by the Niagara Escarpment into the lower city and "the Mountain" — creates distinct waterproofing challenges. The lower city features older industrial-era homes from the early 1900s, while the mountain has post-war and modern subdivisions. Water draining down the escarpment creates persistent moisture issues for homes in both areas.',
    commonIssues: [
      'Escarpment runoff flooding lower city basements',
      'Pre-1940 homes in the lower city with stone foundations',
      'Mountain-area homes with poor grading on clay soil',
      'Industrial contamination concerns near former factory sites',
      'Combined sewer system in older neighborhoods',
      'Dundas and Ancaster heritage homes with unique drainage needs',
    ],
    challengeCards: [
      { icon: 'landscape', title: 'Escarpment Geography', description: 'Hamilton is split by the Niagara Escarpment — water draining down the cliff impacts homes in the lower city.' },
      { icon: 'domain', title: 'Century Homes', description: 'Hamilton\'s lower city has some of Ontario\'s oldest housing stock, with stone foundations needing specialized waterproofing.' },
      { icon: 'terrain', title: 'Mountain Clay', description: 'Hamilton Mountain subdivisions sit on heavy clay that retains water and creates persistent hydrostatic pressure.' },
      { icon: 'water_drop', title: 'Combined Sewers', description: 'Older Hamilton neighborhoods have combined storm/sanitary sewers, increasing sewer backup risk during storms.' },
    ],
    neighborhoods: ['Westdale', 'Kirkendall', 'Delta', 'Dundas', 'Ancaster', 'Stoney Creek', 'Bartonville', 'Crown Point', 'Locke Street', 'Corktown'],
    rebateInfo: 'City of Hamilton Protective Plumbing Program covers up to $2,750 for backwater valves and sump pumps. Apply through Hamilton Water Division.',
    faqs: [
      { question: 'How much does waterproofing cost in Hamilton?', answer: 'Interior waterproofing in Hamilton costs $4,350 – $8,700. Exterior waterproofing costs $4,350 – $10,440 per wall. Hamilton is about 10% more affordable than Toronto for waterproofing work.' },
      { question: 'Do heritage homes in Hamilton need special waterproofing?', answer: 'Yes. Stone and rubble foundations found in lower Hamilton, Dundas, and Ancaster cannot be treated the same as poured concrete. They require breathable waterproofing solutions that don\'t trap moisture inside the stone.' },
      { question: 'Does Hamilton offer waterproofing rebates?', answer: 'The City of Hamilton offers a Protective Plumbing Program that provides up to $2,750 for installing backwater valves and sump pumps. Applications are through the City of Hamilton Water Division.' },
      { question: 'Is waterproofing a good investment in Hamilton?', answer: 'Hamilton\'s housing market has grown significantly. Waterproofing protects your investment and adds value — a dry basement is worth $15,000-$30,000 more than a wet one in a home sale.' },
      { question: 'Can you waterproof in Hamilton\'s lower city during spring?', answer: 'Interior work can be done year-round. Exterior excavation in the lower city may need dewatering during spring when the water table is highest. Experienced contractors like DrySpace plan for these conditions.' },
      { question: 'What warranty does DrySpace offer on waterproofing?', answer: 'DrySpace Waterproofing provides a 25-year transferable warranty on exterior membrane systems and 15-year warranty on interior drainage systems. All work is documented with GPS-verified photos through RenoNext.' },
      { question: 'What is the difference between damp-proofing and waterproofing?', answer: 'Damp-proofing is a thin asphalt coating that resists moisture but not pressurized water. True waterproofing uses a rubberized membrane that creates a watertight barrier. Most homes built before 2000 only have damp-proofing, which fails within 10-15 years.' },
    ],
  },
  ajax: {
    metaTitle: 'Best Waterproofing Companies in Ajax (2026) | RenoNext',
    metaDescription:
      'Ajax waterproofing contractors. Basement waterproofing, sump pump installation, crack repair. Verified, insured pros serving Durham Region.',
    heroTagline: 'Reliable Waterproofing for Ajax Homeowners',
    cityContext:
      'Ajax is a growing Durham Region community with a mix of established 1960s-80s neighborhoods and newer subdivisions. Proximity to Lake Ontario and Duffins Creek creates higher water tables in several areas. Many homes in central Ajax and Pickering Village have original waterproofing that has deteriorated over 30-40+ years.',
    commonIssues: [
      'Duffins Creek watershed flooding risk',
      'Aging 1960s-80s homes with original weeping tile',
      'Lake Ontario influence on water table levels',
      'New subdivision settling on backfilled lots',
      'Sewer backup risk during Durham Region storms',
      'Window well drainage failures in older homes',
    ],
    challengeCards: [
      { icon: 'water', title: 'Duffins Creek', description: 'Duffins Creek and its tributaries run through Ajax, creating flood risk for adjacent neighborhoods.' },
      { icon: 'home', title: '30-50 Year Old Homes', description: 'Central Ajax and Pickering Village have established homes where original waterproofing has reached end of life.' },
      { icon: 'waves', title: 'Lake Proximity', description: 'Ajax\'s location on Lake Ontario keeps water tables elevated year-round, especially in south Ajax.' },
      { icon: 'water_drop', title: 'Storm Drainage', description: 'Durham Region\'s storm water system can be overwhelmed during heavy rainfall, causing sewer backup.' },
    ],
    neighborhoods: ['Pickering Village', 'Central Ajax', 'South Ajax', 'Richardson', 'Audley', 'Westney Heights', 'Salem', 'Riverside', 'Lakeside'],
    rebateInfo: 'Durham Region offers periodic basement flooding protection programs. Contact the Town of Ajax for current subsidy availability.',
    faqs: [
      { question: 'How much does waterproofing cost in Ajax?', answer: 'Interior waterproofing in Ajax costs $4,400 – $8,800. Exterior waterproofing runs $4,400 – $10,560 per wall. Ajax pricing is about 9% below Toronto, making it one of the more affordable GTA locations.' },
      { question: 'Does Ajax offer basement flooding rebates?', answer: 'Durham Region offers periodic basement flooding prevention programs including subsidies for backwater valve and sump pump installation. Check with Durham Region or the Town of Ajax for current program availability.' },
      { question: 'Why does my Ajax basement leak in spring?', answer: 'Spring thaw combined with Ajax\'s proximity to Lake Ontario causes a rapid rise in the water table. If your weeping tile is clogged or your sump pump is undersized, water can enter through the floor-wall joint or floor cracks.' },
      { question: 'Should I waterproof before finishing my Ajax basement?', answer: 'Absolutely. Finishing a basement without addressing existing or potential water issues is the most expensive mistake homeowners make. Always waterproof first — it\'s far cheaper than tearing out finished walls later.' },
      { question: 'How do I choose a waterproofing company in Ajax?', answer: 'Look for WSIB coverage, liability insurance, and verifiable project records. RenoNext-verified contractors like DrySpace Waterproofing serve all of Durham Region with GPS-verified proof of work.' },
      { question: 'What warranty does DrySpace offer on waterproofing?', answer: 'DrySpace Waterproofing provides a 25-year transferable warranty on exterior membrane systems and 15-year warranty on interior drainage systems. All work is documented with GPS-verified photos through RenoNext.' },
      { question: 'What is the difference between damp-proofing and waterproofing?', answer: 'Damp-proofing is a thin asphalt coating that resists moisture but not pressurized water. True waterproofing uses a rubberized membrane that creates a watertight barrier. Most homes built before 2000 only have damp-proofing, which fails within 10-15 years.' },
    ],
  },
  pickering: {
    metaTitle: 'Best Waterproofing Companies in Pickering (2026) | RenoNext',
    metaDescription:
      'Pickering waterproofing contractors. Interior & exterior basement waterproofing, sump pumps, foundation repair. Verified pros, Durham Region.',
    heroTagline: 'Waterproofing Solutions for Pickering Homes',
    cityContext:
      'Pickering stretches from Lake Ontario to the rural north, featuring diverse housing from 1960s bungalows in central Pickering to modern developments near the casino district. Frenchman\'s Bay and Duffins Creek create waterfront moisture challenges, while clay-heavy inland soil contributes to basement leaks in established subdivisions.',
    commonIssues: [
      'Frenchman\'s Bay area with high water table',
      'Duffins Creek watershed flooding',
      'Central Pickering 1960s-70s homes with aging foundations',
      'Clay soil throughout established neighborhoods',
      'New development areas with settling foundations',
      'Lakefront humidity and ground moisture',
    ],
    challengeCards: [
      { icon: 'water', title: 'Waterfront Location', description: 'Frenchman\'s Bay and Lake Ontario keep water tables high in south Pickering year-round.' },
      { icon: 'home', title: 'Established Stock', description: 'Central Pickering\'s 1960s-70s homes have foundations with 50+ years of wear and minimal original waterproofing.' },
      { icon: 'terrain', title: 'Inland Clay', description: 'North and central Pickering sit on clay-heavy soil that creates persistent moisture pressure on foundations.' },
      { icon: 'construction', title: 'New Development', description: 'Pickering\'s city centre expansion means new construction on backfilled lots that may settle and shift.' },
    ],
    neighborhoods: ['Bay Ridges', 'Dunbarton', 'Amberlea', 'Liverpool', 'Rosebank', 'Highbush', 'Brock Ridge', 'Rouge Park', 'Village East'],
    rebateInfo: 'Durham Region offers periodic backwater valve and sump pump subsidies. Contact the City of Pickering for current programs.',
    faqs: [
      { question: 'How much does waterproofing cost in Pickering?', answer: 'Interior waterproofing in Pickering costs $4,500 – $9,000. Exterior waterproofing costs $4,500 – $10,800 per wall. Pickering pricing is about 8% below Toronto due to Durham Region labour rates.' },
      { question: 'Is Pickering prone to basement flooding?', answer: 'Yes. Pickering\'s location between Lake Ontario and the Rouge River/Duffins Creek systems creates elevated water tables. Homes in south Pickering near Frenchman\'s Bay are particularly vulnerable.' },
      { question: 'What waterproofing do Pickering homes need most?', answer: 'Older homes benefit from exterior waterproofing with new weeping tile. Homes near the lake need robust sump pump systems with battery backup. All homes should have a backwater valve to prevent sewer backup.' },
      { question: 'Does Pickering offer waterproofing rebates?', answer: 'Durham Region offers periodic subsidies for backwater valve and sump pump installation. Contact Durham Region or the City of Pickering for current program information.' },
      { question: 'Can I waterproof just one wall of my Pickering home?', answer: 'Yes. If the water entry point is identified to a specific wall, single-wall exterior waterproofing is effective and costs $4,500-$10,800 in Pickering. A professional assessment determines if full perimeter work is needed.' },
      { question: 'What warranty does DrySpace offer on waterproofing?', answer: 'DrySpace Waterproofing provides a 25-year transferable warranty on exterior membrane systems and 15-year warranty on interior drainage systems. All work is documented with GPS-verified photos through RenoNext.' },
      { question: 'What is the difference between damp-proofing and waterproofing?', answer: 'Damp-proofing is a thin asphalt coating that resists moisture but not pressurized water. True waterproofing uses a rubberized membrane that creates a watertight barrier. Most homes built before 2000 only have damp-proofing, which fails within 10-15 years.' },
    ],
  },
  oshawa: {
    metaTitle: 'Best Waterproofing Companies in Oshawa (2026) | RenoNext',
    metaDescription:
      'Oshawa waterproofing companies. Affordable basement waterproofing, sump pumps, crack repair, backwater valves. Verified pros, Durham Region.',
    heroTagline: 'Affordable Waterproofing in Oshawa — Quality That Lasts',
    cityContext:
      'Oshawa offers some of the GTA\'s most affordable waterproofing rates while maintaining quality standards. The city\'s housing stock includes post-war homes in the south, 1970s-80s subdivisions, and newer developments in the north. Oshawa Creek runs through the city center, and clay soil conditions make foundation drainage a priority for homeowners across all neighborhoods.',
    commonIssues: [
      'Oshawa Creek flooding risk for central neighborhoods',
      'Post-war homes with original stone or block foundations',
      'Clay soil throughout the city retaining water',
      '1970s-80s homes with failing waterproofing coatings',
      'Downspout and grading issues in older subdivisions',
      'Basement apartments in need of code-compliant waterproofing',
    ],
    challengeCards: [
      { icon: 'water', title: 'Oshawa Creek', description: 'The creek system runs through central Oshawa, elevating flood risk for homes in the valley and adjacent areas.' },
      { icon: 'attach_money', title: 'Best Value in GTA', description: 'Oshawa has the lowest waterproofing labour rates in the GTA — quality work at 12% below Toronto pricing.' },
      { icon: 'home_work', title: 'Diverse Housing Stock', description: 'From post-war bungalows to modern builds — each era has different waterproofing needs and challenges.' },
      { icon: 'terrain', title: 'City-Wide Clay', description: 'Heavy clay soil throughout Oshawa retains water and creates consistent hydrostatic pressure on foundations.' },
    ],
    neighborhoods: ['South Oshawa', 'Central Oshawa', 'Lakeview', 'McLaughlin', 'Pinecrest', 'Eastdale', 'O\'Neill', 'Northwood', 'Windfields', 'Samac'],
    rebateInfo: 'Durham Region offers periodic basement flooding protection subsidies. Contact the City of Oshawa for current program details.',
    faqs: [
      { question: 'How much does waterproofing cost in Oshawa?', answer: 'Interior waterproofing in Oshawa costs $4,250 – $8,500. Exterior waterproofing costs $4,250 – $10,200 per wall. Oshawa has the lowest waterproofing prices in the GTA — about 12% below Toronto.' },
      { question: 'Why is waterproofing cheaper in Oshawa?', answer: 'Oshawa has lower labour rates compared to Toronto and York Region, which are the biggest cost factor in waterproofing. Material costs are similar across the GTA, but labour savings make Oshawa significantly more affordable.' },
      { question: 'Does Oshawa offer basement flooding rebates?', answer: 'Durham Region offers periodic basement flooding protection programs. The City of Oshawa participates in regional stormwater management initiatives that may include subsidies for backwater valves and sump pumps.' },
      { question: 'Should I waterproof my Oshawa basement before renting it?', answer: 'Yes. Ontario building code requires habitable basement apartments to be free of water infiltration. Waterproofing before finishing is required for legal second units and protects your investment.' },
      { question: 'How do Oshawa\'s post-war homes differ for waterproofing?', answer: 'Post-war homes (1940s-60s) often have block or rubble stone foundations without any waterproofing membrane. They require full exterior excavation and membrane application — interior systems alone are often insufficient.' },
      { question: 'What warranty does DrySpace offer on waterproofing?', answer: 'DrySpace Waterproofing provides a 25-year transferable warranty on exterior membrane systems and 15-year warranty on interior drainage systems. All work is documented with GPS-verified photos through RenoNext.' },
      { question: 'What is the difference between damp-proofing and waterproofing?', answer: 'Damp-proofing is a thin asphalt coating that resists moisture but not pressurized water. True waterproofing uses a rubberized membrane that creates a watertight barrier. Most homes built before 2000 only have damp-proofing, which fails within 10-15 years.' },
    ],
  },
  whitby: {
    metaTitle: 'Best Waterproofing Companies in Whitby (2026) | RenoNext',
    metaDescription:
      'Whitby waterproofing contractors. Basement waterproofing, sump pumps, crack repair, backwater valves. Verified pros serving Durham Region.',
    heroTagline: 'Expert Waterproofing for Whitby Homeowners',
    cityContext:
      'Whitby is a rapidly growing Durham Region town with a mix of established neighborhoods near the lake and expanding subdivisions in Brooklin and north Whitby. Lynde Creek and Pringle Creek run through the community, and homes near the waterfront or creek systems face elevated water table challenges. Clay soil conditions across the town make proper drainage essential.',
    commonIssues: [
      'Lynde Creek and Pringle Creek flooding',
      'Lakefront homes with high water table year-round',
      'Rapid growth in Brooklin with settling foundations',
      'Clay soil conditions throughout the town',
      'Older Port Whitby homes with aging waterproofing',
      'Inadequate grading in newer developments',
    ],
    challengeCards: [
      { icon: 'water', title: 'Creek Systems', description: 'Lynde Creek and Pringle Creek create flood risk for homes in valleys and near waterways throughout Whitby.' },
      { icon: 'construction', title: 'Brooklin Growth', description: 'Rapid expansion in north Whitby means new homes on backfilled lots that can settle and cause foundation issues.' },
      { icon: 'waves', title: 'Lakefront Location', description: 'South Whitby and Port Whitby homes near Lake Ontario face consistently elevated water tables.' },
      { icon: 'terrain', title: 'Persistent Clay', description: 'Whitby\'s clay soil retains water and pushes against foundation walls during wet seasons.' },
    ],
    neighborhoods: ['Downtown Whitby', 'Port Whitby', 'Brooklin', 'Williamsburg', 'Blue Grass Meadows', 'Pringle Creek', 'Lynde Creek', 'Rolling Acres', 'Fallingbrook'],
    rebateInfo: 'Durham Region offers periodic basement flooding prevention subsidies. Contact the Town of Whitby for current availability.',
    faqs: [
      { question: 'How much does waterproofing cost in Whitby?', answer: 'Interior waterproofing in Whitby costs $4,350 – $8,700. Exterior waterproofing costs $4,350 – $10,440 per wall. Whitby pricing is about 10% below Toronto.' },
      { question: 'Is Whitby prone to basement flooding?', answer: 'Areas near Lynde Creek, Pringle Creek, and the Whitby waterfront are most at risk. Newer Brooklin homes can also experience issues if lot grading settles over time.' },
      { question: 'Does Whitby offer waterproofing rebates?', answer: 'Durham Region offers periodic basement flooding prevention subsidies. The Town of Whitby participates in regional stormwater management programs. Check with Durham Region for current availability.' },
      { question: 'What should Brooklin homeowners know about waterproofing?', answer: 'Newer Brooklin homes may have minimal builder-grade waterproofing. Monitor for signs of settling (sticking doors, drywall cracks) which can indicate foundation movement. Consider sump pump upgrades and backwater valve installation early.' },
      { question: 'When is the best time to waterproof in Whitby?', answer: 'Spring and fall are ideal for exterior work. Interior systems can be installed year-round. Don\'t wait for a flood — proactive waterproofing costs a fraction of emergency repairs and damage restoration.' },
      { question: 'What warranty does DrySpace offer on waterproofing?', answer: 'DrySpace Waterproofing provides a 25-year transferable warranty on exterior membrane systems and 15-year warranty on interior drainage systems. All work is documented with GPS-verified photos through RenoNext.' },
      { question: 'What is the difference between damp-proofing and waterproofing?', answer: 'Damp-proofing is a thin asphalt coating that resists moisture but not pressurized water. True waterproofing uses a rubberized membrane that creates a watertight barrier. Most homes built before 2000 only have damp-proofing, which fails within 10-15 years.' },
    ],
  },
  milton: {
    metaTitle: 'Best Waterproofing Companies in Milton (2026) | RenoNext',
    metaDescription:
      'Milton waterproofing contractors. Basement waterproofing, sump pumps, backwater valves, crack repair. Verified pros serving Halton Region.',
    heroTagline: 'Waterproofing Solutions for Milton\'s Growing Community',
    cityContext:
      'Milton is one of Canada\'s fastest-growing towns, with most housing stock built after 2000. While newer homes have modern building codes, builder-grade waterproofing is often minimal. The Niagara Escarpment runs through western Milton, creating drainage challenges, while rapid development on clay soil means many homes experience settling and water issues within the first decade.',
    commonIssues: [
      'Builder-grade waterproofing failing within 10-15 years',
      'Niagara Escarpment drainage affecting western subdivisions',
      'Foundation settling in rapidly built developments',
      'Clay soil compaction creating water pooling',
      'Sump pump failures in newer homes during storms',
      'Grading issues where landscaping has altered drainage patterns',
    ],
    challengeCards: [
      { icon: 'construction', title: 'Rapid Build', description: 'Milton\'s explosive growth means many homes were built quickly with minimal waterproofing — often just a thin tar coat.' },
      { icon: 'landscape', title: 'Escarpment Edge', description: 'Western Milton sits near the Niagara Escarpment, where water drainage patterns create unique moisture challenges.' },
      { icon: 'foundation', title: 'Early Settling', description: 'Many Milton homes are only 5-15 years old but are already showing settlement cracks and water entry.' },
      { icon: 'terrain', title: 'Compacted Clay', description: 'Development on compacted clay creates drainage issues as the soil settles unevenly around foundations.' },
    ],
    neighborhoods: ['Old Milton', 'Timberlea', 'Harrison', 'Willmott', 'Beaty', 'Bronte Meadows', 'Dempsey', 'Ford', 'Scott', 'Cobblestone'],
    rebateInfo: 'Halton Region offers periodic stormwater management programs. Contact the Town of Milton for current rebate information.',
    faqs: [
      { question: 'How much does waterproofing cost in Milton?', answer: 'Interior waterproofing in Milton costs $4,500 – $9,000. Exterior waterproofing costs $4,500 – $10,800 per wall. Milton pricing is about 8% below Toronto due to lower Halton Region labour rates.' },
      { question: 'Do new Milton homes need waterproofing?', answer: 'Yes. Builder-grade waterproofing in most new homes is a thin damp-proofing coat, not a waterproofing membrane. Many Milton homes built after 2005 are already showing basement moisture issues. Sump pump upgrades and backwater valves are recommended.' },
      { question: 'Does Milton offer waterproofing rebates?', answer: 'Halton Region offers periodic stormwater management and basement flooding prevention programs. The Town of Milton may participate in regional rebate initiatives for backwater valves and sump pumps.' },
      { question: 'Why is my new Milton home getting wet basement?', answer: 'Common causes include: inadequate builder-grade waterproofing, foundation settling causing cracks, poor lot grading after landscaping changes, and undersized sump pumps. A professional assessment can identify the specific issue.' },
      { question: 'Is exterior waterproofing worth it for a new Milton home?', answer: 'If you have active water entry, yes. For prevention, focus on sump pump upgrades, backwater valve installation, proper grading, and downspout extensions first. These are less invasive and address the most common issues in newer homes.' },
      { question: 'What warranty does DrySpace offer on waterproofing?', answer: 'DrySpace Waterproofing provides a 25-year transferable warranty on exterior membrane systems and 15-year warranty on interior drainage systems. All work is documented with GPS-verified photos through RenoNext.' },
      { question: 'What is the difference between damp-proofing and waterproofing?', answer: 'Damp-proofing is a thin asphalt coating that resists moisture but not pressurized water. True waterproofing uses a rubberized membrane that creates a watertight barrier. Most homes built before 2000 only have damp-proofing, which fails within 10-15 years.' },
    ],
  },
  aurora: {
    metaTitle: 'Best Waterproofing Companies in Aurora (2026) | RenoNext',
    metaDescription:
      'Aurora waterproofing contractors. Basement waterproofing, sump pumps, crack repair, backwater valves. Verified pros serving York Region.',
    heroTagline: 'Professional Waterproofing for Aurora Homeowners',
    cityContext:
      'Aurora is a well-established York Region town with a charming historic downtown and expanding subdivisions in the north and east. Sitting near the headwaters of the Holland River, Aurora\'s northern areas experience elevated water tables. The town\'s heritage district features homes over 100 years old with unique foundation challenges, while newer areas deal with clay soil and settlement issues.',
    commonIssues: [
      'Holland River headwaters creating high water table in north Aurora',
      'Heritage district homes with century-old stone foundations',
      'Clay soil throughout established neighborhoods',
      'Newer subdivision settling on graded lots',
      'Spring groundwater rise affecting basement floors',
      'Mixed soil conditions requiring varied waterproofing approaches',
    ],
    challengeCards: [
      { icon: 'water', title: 'Holland River System', description: 'Aurora sits near the Holland River headwaters — northern neighborhoods face consistently high groundwater levels.' },
      { icon: 'museum', title: 'Heritage Properties', description: 'Aurora\'s historic downtown has homes over 100 years old requiring specialized stone foundation waterproofing.' },
      { icon: 'terrain', title: 'Clay Soil', description: 'Heavy clay throughout Aurora retains water and creates persistent pressure against basement walls and footings.' },
      { icon: 'water_drop', title: 'Seasonal Groundwater', description: 'Water table rises significantly in spring, pushing water through floor cracks and the floor-wall joint.' },
    ],
    neighborhoods: ['Aurora Village', 'Bayview Northeast', 'Bayview Southeast', 'Aurora Heights', 'Aurora Grove', 'Temperance', 'St. Andrew\'s', 'Stonebridge', 'Aurora Highlands'],
    rebateInfo: 'York Region periodically offers basement flooding prevention programs. Contact the Town of Aurora for current rebate availability.',
    faqs: [
      { question: 'How much does waterproofing cost in Aurora?', answer: 'Interior waterproofing in Aurora costs $4,600 – $9,200. Exterior waterproofing costs $4,600 – $11,040 per wall. Aurora pricing is about 6% below Toronto due to York Region labour rates.' },
      { question: 'Can heritage Aurora homes be waterproofed?', answer: 'Yes, but they require specialized approaches. Stone and rubble foundations need breathable waterproofing systems that don\'t trap moisture. Interior drainage with a sump pump is often the best solution for heritage properties.' },
      { question: 'Does Aurora offer waterproofing rebates?', answer: 'York Region periodically offers basement flooding prevention programs. The Town of Aurora may offer additional incentives. Contact Aurora\'s engineering department for current rebate availability.' },
      { question: 'Why does my Aurora basement get damp in spring?', answer: 'Spring snowmelt raises the water table rapidly in Aurora, especially in northern areas near the Holland River. Hydrostatic pressure pushes water up through floor cracks and the floor-wall joint. A sump pump system is the primary defense.' },
      { question: 'What waterproofing approach works best in Aurora?', answer: 'For most Aurora homes, a combination approach works best: interior drainage system with sump pump (for groundwater management) plus targeted crack injection or exterior membrane (for wall leaks). A professional assessment determines the right mix.' },
      { question: 'What warranty does DrySpace offer on waterproofing?', answer: 'DrySpace Waterproofing provides a 25-year transferable warranty on exterior membrane systems and 15-year warranty on interior drainage systems. All work is documented with GPS-verified photos through RenoNext.' },
      { question: 'What is the difference between damp-proofing and waterproofing?', answer: 'Damp-proofing is a thin asphalt coating that resists moisture but not pressurized water. True waterproofing uses a rubberized membrane that creates a watertight barrier. Most homes built before 2000 only have damp-proofing, which fails within 10-15 years.' },
    ],
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Get all city slugs for generateStaticParams */
export function getAllWaterproofingCitySlugs(): string[] {
  return cityMultipliers.map((c) => c.slug);
}

/** Get full city waterproofing data */
export function getCityWaterproofingData(slug: string): CityWaterproofingData | undefined {
  const city = getCityBySlug(slug);
  const data = cityData[slug];
  if (!city || !data) return undefined;

  return {
    slug: city.slug,
    city: city.name,
    region: city.region,
    nearbyCities: city.nearbyCities,
    ...data,
  };
}

/** Get city-adjusted price range string for a service */
export function getServicePriceRange(service: ServiceDetail, citySlug: string): string {
  const city = getCityBySlug(citySlug);
  if (!city) return `$${service.basePriceMin.toLocaleString()} – $${service.basePriceMax.toLocaleString()}`;

  const adjusted = getCityAdjustedPrice(
    service.basePriceMin,
    service.basePriceMax,
    service.labourPct,
    service.materialPct,
    city,
  );
  return formatPriceRange(adjusted.min, adjusted.max);
}

/** Get nearby cities data for cross-linking */
export function getNearbyWaterproofingCities(citySlug: string): CityWaterproofingData[] {
  const city = getCityBySlug(citySlug);
  if (!city) return [];
  return city.nearbyCities
    .map((s) => getCityWaterproofingData(s))
    .filter((c): c is CityWaterproofingData => c !== undefined);
}
