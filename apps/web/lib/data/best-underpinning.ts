/**
 * Best Underpinning Contractors — City-Specific Landing Pages
 *
 * SEO landing pages targeting "best underpinning contractors in [city]" keywords.
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
export interface UnderpinningServiceDetail {
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

export interface CityUnderpinningData {
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
  permitInfo: string;
  faqs: FAQ[];
  nearbyCities: string[];
}

// ---------------------------------------------------------------------------
// Shared educational content (same for all cities)
// ---------------------------------------------------------------------------
export const whatIsUnderpinning = {
  title: 'What Is Underpinning?',
  paragraphs: [
    'Underpinning is the process of strengthening and deepening an existing foundation to either stabilize a settling structure or increase basement ceiling height. The most common method in Ontario is bench footing underpinning, where sections of the existing footing are extended downward using reinforced concrete in an alternating sequence.',
    'The process requires a licensed structural engineer to design the underpinning layout, specifying the sequence of sections, concrete strength (typically 25-32 MPa), and rebar requirements. Work is done in alternating 4-foot sections to ensure the home remains supported at all times — no more than 25% of the foundation is exposed simultaneously.',
    'In the Greater Toronto Area, underpinning is most commonly performed to create legal basement apartments under Ontario\'s second suite provisions, or to add livable space in homes where the existing basement has insufficient ceiling height (typically under 6\'6").',
  ],
};

export const angleOfReposeData = {
  title: 'Understanding the Angle of Repose',
  paragraphs: [
    'The angle of repose is the steepest angle at which soil can maintain stability without sliding. In underpinning, this concept is critical because excavating below an existing footing removes the soil that supports it. If the excavation extends beyond the angle of repose, the adjacent soil — and the footing above it — can collapse.',
    'In Toronto\'s clay soil, the angle of repose is typically 45 degrees (1:1 ratio). This means for every foot you dig down, you must stay at least one foot back from the edge of the existing footing. Structural engineers calculate the safe excavation profile for each project based on the specific soil conditions identified in the geotechnical report.',
    'This is why underpinning must be done in alternating sections — each section is small enough that the adjacent, un-excavated sections support the building load while the new footing is poured and cured.',
  ],
};

export const underpinningWarningSignsData = {
  title: 'Signs Your Home May Need Underpinning',
  signs: [
    { icon: 'straighten', title: 'Low Basement Ceiling Height', description: 'Ceiling height under 6\'6" makes your basement unusable for living space and non-compliant with Ontario Building Code for habitable rooms. Underpinning raises the ceiling to 8\' or 9\'.' },
    { icon: 'vertical_split', title: 'Foundation Cracks', description: 'Horizontal cracks indicate lateral pressure from soil. Vertical cracks may show settling. Stair-step cracks in block foundations suggest differential settlement. All may require underpinning to stabilize.' },
    { icon: 'swap_vert', title: 'Uneven or Sloping Floors', description: 'Floors that slope or feel uneven indicate foundation settlement. If one part of the foundation has sunk more than another, underpinning can level and stabilize the structure.' },
    { icon: 'meeting_room', title: 'Doors and Windows That Stick', description: 'Doors and windows that suddenly become hard to open or won\'t close properly can indicate the foundation is shifting, causing the frame of the house to rack.' },
    { icon: 'water_drop', title: 'Persistent Basement Water Issues', description: 'If waterproofing alone hasn\'t solved your basement moisture problems, the foundation may have settled and cracked, creating pathways for water entry that only underpinning can address.' },
    { icon: 'foundation', title: 'Visible Foundation Deterioration', description: 'Crumbling concrete, spalling, or exposed rebar indicates the foundation has deteriorated beyond repair and needs to be reinforced through underpinning.' },
  ],
};

export const underpinningUseCasesData = {
  title: 'Why Underpin Your Home?',
  cases: [
    { icon: 'apartment', title: 'Create a Legal Basement Apartment', description: 'Ontario\'s second suite provisions allow basement apartments in most residential zones. Underpinning provides the ceiling height required by building code (minimum 6\'5", typically 8\'-9\' for comfort).' },
    { icon: 'family_restroom', title: 'Build an In-Law Suite', description: 'Multi-generational families can create self-contained in-law suites with a bedroom, bathroom, kitchen, and separate entrance through underpinning and basement finishing.' },
    { icon: 'savings', title: 'Generate Rental Income', description: 'A legal basement apartment generates $1,200 – $2,500/month in the GTA. At typical underpinning costs, the payback period is 4-7 years — plus the added property value.' },
    { icon: 'fitness_center', title: 'Create Recreation Space', description: 'A full-height basement becomes a home gym, theatre room, playroom, or entertainment space — adding usable square footage without building an addition.' },
    { icon: 'foundation', title: 'Stabilize a Settling Foundation', description: 'If your foundation has settled or cracked, underpinning restores structural integrity by transferring the building load to deeper, more stable soil.' },
    { icon: 'trending_up', title: 'Maximize Property Value', description: 'Underpinning adds $100,000 – $250,000 in property value in the GTA. A finished, full-height basement is one of the highest-ROI home improvements available.' },
  ],
};

export const underpinningDocumentationData = {
  title: 'Documentation Required for Underpinning in Ontario',
  intro: 'Underpinning is a regulated construction activity requiring professional engineering and municipal permits. Here\'s what\'s needed:',
  items: [
    { document: 'Geotechnical Soil Report', description: 'A professional soil investigation ($2,500 – $5,000) determines soil bearing capacity, water table depth, and the appropriate underpinning method. Required by most municipalities.', cost: '$2,500 – $5,000' },
    { document: 'Structural Engineering Drawings', description: 'Stamped drawings showing the underpinning layout, sequence, concrete specifications, rebar details, and shoring plan. Required for building permit.', cost: '$3,000 – $8,000' },
    { document: 'Building Permit', description: 'Obtained from your municipality\'s building department. Application requires the engineering drawings, site plan, and sometimes the geotechnical report.', cost: '$1,000 – $3,000' },
    { document: 'Site Plan', description: 'A scaled drawing showing property boundaries, the home\'s footprint, setbacks, and the underpinning work area. Required for the building permit application.', cost: 'Included in engineering' },
    { document: 'Commitment to General Review', description: 'The structural engineer signs a commitment to inspect the work at critical stages. Required by Ontario Building Code for structural work.', cost: 'Included in engineering' },
    { document: 'Shoring Plan', description: 'Detailed plan for temporary support during excavation. Ensures the home is safely supported while sections are being underpinned.', cost: 'Included in engineering' },
  ],
  tip: 'Total engineering and permit costs typically add $5,000 – $12,000 to an underpinning project. DrySpace Waterproofing works with licensed structural engineers and handles all permit applications.',
};

export const underpinningMethodComparisonData = {
  title: 'Underpinning Methods Compared',
  rows: [
    { factor: 'How it works', benchFooting: 'Excavate below existing footing, pour new deeper footings in alternating sections', helicalPile: 'Screw steel piles through soil to load-bearing stratum, bracket to existing footing' },
    { factor: 'Best for', benchFooting: 'Full basement lowering, creating new living space', helicalPile: 'Foundation stabilization, limited access, faster timeline' },
    { factor: 'Cost', benchFooting: '$500 – $800 per linear foot', helicalPile: '$1,200 – $2,000 per pile (8-12 piles typical)' },
    { factor: 'Timeline', benchFooting: '6-12 weeks for full basement', helicalPile: '1-3 weeks' },
    { factor: 'Disruption', benchFooting: 'Significant — full basement excavation required', helicalPile: 'Moderate — access holes only, no full excavation' },
    { factor: 'Adds ceiling height?', benchFooting: 'Yes — primary purpose', helicalPile: 'No — stabilizes only, doesn\'t lower floor' },
    { factor: 'Engineering required?', benchFooting: 'Yes — structural + geotechnical', helicalPile: 'Yes — structural + geotechnical' },
  ],
};

// ---------------------------------------------------------------------------
// 5 core underpinning services (base Toronto pricing)
// ---------------------------------------------------------------------------
export const underpinningServices: UnderpinningServiceDetail[] = [
  {
    name: 'Bench Footing Underpinning',
    slug: 'underpinning',
    description:
      'The traditional and most common method in the GTA. The existing footing is extended downward in alternating sections using reinforced concrete bench footings. Each section is excavated, formed, poured, and cured before moving to the next, ensuring the structure is supported at all times.',
    process: [
      'Structural engineer designs underpinning layout and sequence',
      'Obtain building permit and schedule inspections',
      'Install temporary shoring and bracing',
      'Excavate first section (max 4 ft wide) below existing footing',
      'Form and pour reinforced concrete bench footing (25-32 MPa)',
      'Allow minimum 7-day cure before loading',
      'Move to next alternating section and repeat',
      'Pour new basement floor slab with vapor barrier',
      'Final inspection by engineer and municipality',
    ],
    basePriceMin: 500,
    basePriceMax: 800,
    labourPct: 65,
    materialPct: 35,
    timeline: '6 – 12 weeks',
    image: '/images/pros/spaders/excavation.webp',
    imageAlt: 'Bench footing underpinning excavation by DrySpace Waterproofing',
  },
  {
    name: 'Full Basement Lowering',
    slug: 'underpinning',
    description:
      'Complete basement floor lowering to gain additional ceiling height — typically from 6 ft to 8 or 9 ft. This involves underpinning all foundation walls and pouring a new floor slab at the lower elevation. The most comprehensive underpinning project, commonly done in Toronto to create legal basement apartments.',
    process: [
      'Geotechnical soil report and structural engineering design',
      'Building permit application with full drawings',
      'Temporary support and shoring installation',
      'Sequential underpinning of all foundation walls',
      'Excavate interior soil to new lower elevation',
      'Install interior weeping tile and sump pump system',
      'Pour new reinforced concrete floor slab',
      'Waterproofing membrane and vapor barrier',
      'HVAC, electrical, and plumbing rough-in adjustments',
      'Municipal inspections at each critical stage',
    ],
    basePriceMin: 75000,
    basePriceMax: 150000,
    labourPct: 60,
    materialPct: 40,
    timeline: '8 – 16 weeks',
    image: '/images/pros/spaders/underpinning-finished.webp',
    imageAlt: 'Completed basement lowering project',
  },
  {
    name: 'Helical Pile Underpinning',
    slug: 'underpinning',
    description:
      'Steel helical piles are screwed into the ground beneath the existing footing to transfer the building load to deeper, more stable soil. This method is faster than traditional bench footing and causes less disruption. Ideal for homes with poor soil conditions or where excavation access is limited.',
    process: [
      'Geotechnical assessment to determine pile depth and capacity',
      'Structural engineer specifies pile layout (typically 8-12 piles)',
      'Access points cut in basement floor at pile locations',
      'Hydraulic equipment drives helical piles to load-bearing stratum',
      'Steel bracket connects pile to existing footing',
      'Load transferred from footing to piles',
      'Concrete patches poured at access points',
      'Engineer certifies load transfer and settlement monitoring',
    ],
    basePriceMin: 1200,
    basePriceMax: 2000,
    labourPct: 55,
    materialPct: 45,
    timeline: '1 – 3 weeks',
    image: '/images/pros/dryspace/exterior-1.webp',
    imageAlt: 'Foundation work for helical pile underpinning',
  },
  {
    name: 'Foundation Crack Repair & Stabilization',
    slug: 'foundation-repair',
    description:
      'Structural cracks in foundations indicate movement that may require underpinning. Before or alongside underpinning, cracks are repaired using epoxy injection (for structural restoration) or carbon fiber straps (for wall stabilization). This prevents further movement while the foundation is being strengthened.',
    process: [
      'Engineer inspects crack pattern to determine cause',
      'Install crack monitors to track movement over 2-4 weeks',
      'Clean and prepare crack surfaces',
      'Install injection ports along crack length',
      'Inject structural epoxy under pressure',
      'Install carbon fiber reinforcement straps if wall is bowing',
      'Seal and finish repaired area',
      'Monitor for continued movement post-repair',
    ],
    basePriceMin: 500,
    basePriceMax: 1500,
    labourPct: 70,
    materialPct: 30,
    timeline: '1 – 2 days per crack',
    image: '/images/pros/dryspace/crack-repair.webp',
    imageAlt: 'Foundation crack repair with epoxy injection',
  },
  {
    name: 'Waterproofing with Underpinning',
    slug: 'waterproofing',
    description:
      'Underpinning projects expose the full foundation wall — the ideal time to add waterproofing. A rubberized membrane, dimpled drainage board, and new weeping tile are installed on the exterior wall before backfilling. Bundling waterproofing with underpinning saves 30-40% compared to doing them separately.',
    process: [
      'Foundation wall exposed during underpinning excavation',
      'Clean and inspect entire wall surface',
      'Repair any cracks with hydraulic cement',
      'Apply rubberized waterproofing membrane',
      'Install dimpled drainage board over membrane',
      'Lay new weeping tile wrapped in filter fabric at footing',
      'Connect weeping tile to sump pump or storm drain',
      'Backfill with clear gravel and native soil',
    ],
    basePriceMin: 5000,
    basePriceMax: 12000,
    labourPct: 65,
    materialPct: 35,
    timeline: 'Included in underpinning timeline',
    image: '/images/pros/dryspace/membrane.webp',
    imageAlt: 'Waterproofing membrane applied during underpinning project',
  },
];

// ---------------------------------------------------------------------------
// City-specific data
// ---------------------------------------------------------------------------
const cityData: Record<string, Omit<CityUnderpinningData, 'slug' | 'city' | 'region' | 'nearbyCities'>> = {
  toronto: {
    metaTitle: 'Best Underpinning Contractors in Toronto (2026) | RenoNext',
    metaDescription:
      'Find Toronto\'s top-rated underpinning contractors. Basement lowering, bench footing, helical piles. Verified pros with real project photos and transparent pricing.',
    heroTagline: 'Trusted Underpinning Contractors for Toronto Homeowners',
    cityContext:
      'Toronto is the underpinning capital of Canada. With housing prices exceeding $1M for a typical semi-detached, homeowners are lowering basements to gain livable space rather than moving. Older neighborhoods like The Annex, Leslieville, Riverdale, and East York have shallow basements (5\'6" – 6\'6") that were never designed for living. Bench footing underpinning is the most common method in Toronto\'s clay soil conditions.',
    commonIssues: [
      'Shallow basements (under 6\'6") in pre-1960s homes',
      'Creating legal basement apartments under Toronto\'s second suite bylaw',
      'Foundation settlement from aging clay soil conditions',
      'Structural cracks from decades of freeze-thaw cycles',
      'Rubble stone foundations in century homes needing stabilization',
      'Insufficient ceiling height for building code compliance',
    ],
    challengeCards: [
      { icon: 'straighten', title: 'Low Ceilings', description: 'Most pre-1960s Toronto homes have basement ceilings under 6\'6" — too low for legal living space without underpinning.' },
      { icon: 'home_work', title: 'Century Homes', description: 'Toronto\'s oldest neighborhoods have rubble stone or unreinforced concrete foundations requiring specialized underpinning.' },
      { icon: 'apartment', title: 'Second Suites', description: 'Toronto\'s second suite bylaw encourages basement apartments, but most require underpinning to meet ceiling height code.' },
      { icon: 'terrain', title: 'Clay Soil', description: 'Toronto\'s heavy clay creates both the need for underpinning (settlement) and complicates it (water management during work).' },
    ],
    neighborhoods: ['The Annex', 'Leslieville', 'East York', 'Riverdale', 'High Park', 'Scarborough', 'Etobicoke', 'North York', 'Rosedale', 'The Beaches', 'Danforth', 'Junction'],
    permitInfo: 'Toronto Building requires a building permit for all underpinning. Stamped structural engineering drawings, geotechnical report, and multiple stage inspections are mandatory.',
    faqs: [
      { question: 'How much does underpinning cost in Toronto?', answer: 'Bench footing underpinning in Toronto costs $500 – $800 per linear foot of wall. A full basement lowering on a typical Toronto semi-detached costs $75,000 – $150,000. Engineering and permits add $5,000 – $12,000. The total depends on the depth increase, home size, and soil conditions.' },
      { question: 'Do I need a permit for underpinning in Toronto?', answer: 'Yes. All underpinning work in Toronto requires a building permit from Toronto Building. You also need stamped structural engineering drawings and, in most cases, a geotechnical soil report. Inspections are required at multiple stages during the project.' },
      { question: 'How long does basement underpinning take in Toronto?', answer: 'A typical Toronto semi-detached basement lowering takes 8-12 weeks. Larger detached homes can take 12-16 weeks. The timeline depends on the number of walls being underpinned, the depth increase, and the alternating section sequence required for safety.' },
      { question: 'Is underpinning worth it in Toronto?', answer: 'For most Toronto homeowners, underpinning adds $100,000 – $200,000 in property value by creating a legal basement apartment or additional living space. With average project costs of $75,000 – $150,000, the ROI is typically positive, especially with rental income potential.' },
      { question: 'Can I live in my Toronto home during underpinning?', answer: 'In most cases, yes. Work is done section by section, so the home remains structurally supported throughout. However, expect noise, dust, and temporary loss of basement access. Some homeowners choose to vacate during the most disruptive phases.' },
      { question: 'What\'s the difference between underpinning and bench footing?', answer: 'Bench footing is the most common type of underpinning in Toronto. It involves excavating below the existing footing and pouring new, deeper concrete footings in alternating sections. Other underpinning methods include helical piles and push piers, which are used when soil conditions require them.' },
    ],
  },
  mississauga: {
    metaTitle: 'Best Underpinning Contractors in Mississauga (2026) | RenoNext',
    metaDescription:
      'Top underpinning contractors in Mississauga. Basement lowering, foundation repair, helical piles. Verified pros, transparent pricing in Peel Region.',
    heroTagline: 'Expert Underpinning for Mississauga Homeowners',
    cityContext:
      'Mississauga\'s 1960s-1990s housing boom produced thousands of homes with 6-foot basements that homeowners now want to convert into living space. Areas like Cooksville, Meadowvale, and Streetsville have established homes where underpinning is increasingly popular for creating rental units or family space. Mississauga pricing runs about 5% below Toronto while maintaining the same engineering standards.',
    commonIssues: [
      'Low basement ceilings in 1960s-80s tract-built homes',
      'Creating basement apartments for rental income',
      'Foundation settlement in clay-heavy Meadowvale area',
      'Older Cooksville and Port Credit homes with shallow foundations',
      'Split-level homes requiring partial underpinning',
      'Concrete block foundations needing reinforcement during lowering',
    ],
    challengeCards: [
      { icon: 'home_work', title: 'Tract-Built Homes', description: 'Mississauga\'s 1970s-80s subdivisions have shallow basements with 6-foot ceilings — perfect candidates for lowering.' },
      { icon: 'attach_money', title: '5% Below Toronto', description: 'Mississauga underpinning costs about 5% less than Toronto due to Peel Region labour rates, without compromising quality.' },
      { icon: 'apartment', title: 'Rental Demand', description: 'Strong rental demand in Mississauga makes basement apartment conversion a smart investment for homeowners.' },
      { icon: 'foundation', title: 'Block Foundations', description: 'Many Mississauga homes have concrete block foundations that need careful handling during underpinning work.' },
    ],
    neighborhoods: ['Cooksville', 'Streetsville', 'Meadowvale', 'Erin Mills', 'Port Credit', 'Clarkson', 'Malton', 'Lorne Park', 'Dixie', 'Churchill Meadows'],
    permitInfo: 'City of Mississauga requires a building permit, structural engineering drawings, and typically a geotechnical report. Inspections at each underpinning stage.',
    faqs: [
      { question: 'How much does underpinning cost in Mississauga?', answer: 'Bench footing underpinning in Mississauga costs $465 – $745 per linear foot. Full basement lowering costs $70,500 – $141,000. Mississauga pricing is approximately 5% lower than Toronto due to reduced labour costs in Peel Region.' },
      { question: 'Do I need a permit to underpin in Mississauga?', answer: 'Yes. The City of Mississauga requires a building permit for all underpinning work. You need stamped structural engineering drawings and may need a geotechnical report. Inspections are required at each stage of the underpinning sequence.' },
      { question: 'Can I create a basement apartment through underpinning in Mississauga?', answer: 'Yes. Mississauga permits second units in most residential zones. Underpinning to achieve the required 6\'5" minimum ceiling height is a common first step. You\'ll also need to address fire separation, egress windows, plumbing, and electrical.' },
      { question: 'How long does underpinning take in Mississauga?', answer: 'A typical Mississauga home takes 8-14 weeks for full basement lowering. The timeline depends on home size, the number of walls, depth increase, and soil conditions. Engineering and permit approvals add 4-8 weeks before construction begins.' },
      { question: 'Is underpinning safe for my Mississauga home?', answer: 'Yes, when done by a qualified contractor with proper engineering. The alternating section method ensures the home is always supported. DrySpace Waterproofing follows strict engineering protocols and has all work inspected by both the structural engineer and the municipality.' },
    ],
  },
  brampton: {
    metaTitle: 'Best Underpinning Contractors in Brampton (2026) | RenoNext',
    metaDescription:
      'Brampton underpinning contractors. Basement lowering, bench footing, foundation repair. Verified pros with transparent pricing in Peel Region.',
    heroTagline: 'Affordable Underpinning Solutions for Brampton Homes',
    cityContext:
      'Brampton\'s fast-growing population has driven demand for basement apartments and additional living space. With homes from the 1970s-90s in Bramalea and Heart Lake, and newer builds in Vales of Castlemore, underpinning is increasingly common. Brampton offers some of the best underpinning value in the GTA at roughly 8% below Toronto pricing.',
    commonIssues: [
      'Shallow basements in 1970s-90s Bramalea subdivisions',
      'Growing families needing additional living space',
      'Basement apartment demand for multi-generational homes',
      'Foundation settlement in clay soil developments',
      'New-build homes with minimal basement depth for future conversion',
      'Concrete block foundations in older central Brampton homes',
    ],
    challengeCards: [
      { icon: 'groups', title: 'Multi-Generational Living', description: 'Brampton\'s large families drive demand for basement apartments and in-law suites through underpinning.' },
      { icon: 'attach_money', title: 'Best Value in Peel', description: 'Brampton underpinning costs about 8% below Toronto — the best value in Peel Region for quality work.' },
      { icon: 'home_work', title: 'Bramalea Homes', description: 'The Bramalea neighborhoods have thousands of 1970s-80s homes with shallow basements ideal for lowering.' },
      { icon: 'terrain', title: 'Clay Conditions', description: 'Heavy clay soil in Brampton requires careful water management during excavation phases of underpinning.' },
    ],
    neighborhoods: ['Bramalea', 'Heart Lake', 'Castlemore', 'Springdale', 'Mount Pleasant', 'Sandalwood', 'Gore Meadows', 'Fletcher\'s Meadow', 'Central Brampton', 'Snelgrove'],
    permitInfo: 'City of Brampton requires a building permit and stamped structural engineering drawings. Geotechnical report recommended for all clay soil conditions.',
    faqs: [
      { question: 'How much does underpinning cost in Brampton?', answer: 'Bench footing underpinning in Brampton costs $450 – $720 per linear foot. Full basement lowering costs $68,000 – $136,000. Brampton is approximately 8% more affordable than Toronto for underpinning work.' },
      { question: 'Do I need a permit to underpin my Brampton home?', answer: 'Yes. Brampton requires a building permit for all underpinning projects. You need structural engineering drawings, a building permit from the City of Brampton, and inspections at each stage of construction.' },
      { question: 'How deep can I lower my Brampton basement?', answer: 'Most Brampton basements can be lowered to achieve 8-9 foot ceilings. The exact depth depends on your soil conditions, foundation type, and proximity to adjacent structures. A structural engineer and geotechnical report will determine the maximum safe depth.' },
      { question: 'Is underpinning a good investment in Brampton?', answer: 'Yes. A legal basement apartment in Brampton can rent for $1,500 – $2,200/month. At a project cost of $68,000 – $136,000, the payback period is typically 4-7 years through rental income alone, plus added property value.' },
      { question: 'Can I underpin my Brampton home in winter?', answer: 'Yes, but winter underpinning requires heated enclosures to allow concrete to cure properly. This adds $5,000 – $15,000 to the project cost. Most homeowners prefer to schedule underpinning for spring through fall to avoid this extra expense.' },
    ],
  },
  vaughan: {
    metaTitle: 'Best Underpinning Contractors in Vaughan (2026) | RenoNext',
    metaDescription:
      'Vaughan underpinning contractors. Basement lowering, bench footing, helical piles. Verified pros serving Woodbridge, Maple, Kleinburg.',
    heroTagline: 'Professional Underpinning for Vaughan Homeowners',
    cityContext:
      'Vaughan\'s diverse housing stock — from 1970s-90s homes in Woodbridge to estate properties in Kleinburg — presents varied underpinning opportunities. Many Woodbridge homes have shallow basements that homeowners are lowering for additional living space or rental income. Vaughan\'s proximity to Toronto means strong rental demand, making basement apartment conversion an excellent investment.',
    commonIssues: [
      'Shallow basements in 1980s-90s Woodbridge homes',
      'Large estate homes in Kleinburg with deep but unfinished basements',
      'Foundation settlement in Vellore Village and Maple developments',
      'Creating in-law suites in multi-generational households',
      'Concrete block foundations in older Thornhill homes',
      'High water table near Humber River requiring dewatering during work',
    ],
    challengeCards: [
      { icon: 'home_work', title: 'Woodbridge Homes', description: 'Woodbridge\'s 1980s-90s housing stock has the shallow basements most commonly underpinned in Vaughan.' },
      { icon: 'villa', title: 'Kleinburg Estates', description: 'Estate properties in Kleinburg often have large basement footprints that benefit from full lowering for entertaining space.' },
      { icon: 'water', title: 'Water Management', description: 'Near the Humber River, underpinning requires dewatering systems to manage groundwater during excavation.' },
      { icon: 'groups', title: 'In-Law Suites', description: 'Multi-generational families in Vaughan are converting basements to self-contained in-law suites through underpinning.' },
    ],
    neighborhoods: ['Woodbridge', 'Maple', 'Kleinburg', 'Thornhill', 'Vellore Village', 'Concord', 'Patterson', 'Sonoma Heights', 'Elder Mills'],
    permitInfo: 'City of Vaughan requires a building permit, structural engineering drawings, and geotechnical soil report. Stage inspections at each critical construction phase.',
    faqs: [
      { question: 'How much does underpinning cost in Vaughan?', answer: 'Bench footing underpinning in Vaughan costs $485 – $775 per linear foot. Full basement lowering costs $72,500 – $145,500. Vaughan pricing is approximately 3% below Toronto.' },
      { question: 'Does Vaughan allow basement apartments?', answer: 'Yes. The City of Vaughan permits second units in most residential zones. Underpinning to meet ceiling height requirements (minimum 6\'5") is typically the first step, followed by fire separation, egress, plumbing, and electrical work.' },
      { question: 'How long does underpinning take in Vaughan?', answer: 'A typical Vaughan detached home takes 10-14 weeks for full basement lowering. Larger homes in Kleinburg may take 14-18 weeks due to deeper foundations and larger footprints.' },
      { question: 'Do I need a geotechnical report for underpinning in Vaughan?', answer: 'Yes, a geotechnical soil report ($2,500 – $5,000) is typically required by the structural engineer and the City of Vaughan. It determines soil bearing capacity, water table depth, and the appropriate underpinning method.' },
      { question: 'What\'s the ROI on underpinning in Vaughan?', answer: 'Vaughan basement apartments rent for $1,800 – $2,500/month. At a project cost of $72,500 – $145,500, the payback through rental income is typically 3-6 years, plus $150,000 – $250,000 in added property value.' },
    ],
  },
  markham: {
    metaTitle: 'Best Underpinning Contractors in Markham (2026) | RenoNext',
    metaDescription:
      'Markham underpinning contractors. Basement lowering, bench footing, foundation repair. Verified pros with transparent pricing in York Region.',
    heroTagline: 'Reliable Underpinning Solutions for Markham Homes',
    cityContext:
      'Markham\'s housing ranges from heritage properties in Unionville to modern builds in Cornell and Angus Glen. The 1970s-90s homes in Central Markham and Milliken are prime candidates for underpinning as homeowners seek to maximize their property value. Markham\'s strong real estate market makes basement apartment conversion especially profitable.',
    commonIssues: [
      'Heritage homes in Unionville with unique foundation challenges',
      'Shallow basements in 1970s-90s Central Markham homes',
      'Foundation settlement in newer Cornell and Berczy developments',
      'Creating rental units to offset high mortgage costs',
      'Silt and clay soil requiring careful excavation management',
      'Homes with finished basements needing demolition before underpinning',
    ],
    challengeCards: [
      { icon: 'museum', title: 'Unionville Heritage', description: 'Historic Unionville homes have unique foundations that need specialized underpinning approaches to preserve character.' },
      { icon: 'home', title: 'Central Markham', description: 'The 1970s-90s homes in Central Markham and Milliken are the most commonly underpinned in the city.' },
      { icon: 'trending_up', title: 'High Property Values', description: 'Markham\'s strong real estate market means underpinning ROI is excellent — added space adds significant value.' },
      { icon: 'terrain', title: 'Silt-Clay Soil', description: 'Markham\'s soil conditions require careful water management and monitoring during underpinning excavation.' },
    ],
    neighborhoods: ['Unionville', 'Milliken', 'Cornell', 'Berczy', 'Angus Glen', 'Markham Village', 'Thornhill', 'Cachet', 'Cathedraltown', 'Box Grove'],
    permitInfo: 'City of Markham requires a building permit and stamped engineering drawings. Heritage district properties in Unionville may need additional heritage committee approval.',
    faqs: [
      { question: 'How much does underpinning cost in Markham?', answer: 'Bench footing underpinning in Markham costs $475 – $760 per linear foot. Full basement lowering costs $71,000 – $142,500. Markham pricing is about 3% below Toronto due to York Region labour rates.' },
      { question: 'Can I underpin a heritage home in Markham?', answer: 'Yes, but heritage properties in Unionville may require additional approvals and specialized methods. Stone or rubble foundations need careful handling, and the structural engineer must design an approach that preserves the building\'s heritage character.' },
      { question: 'How does underpinning affect my Markham home\'s value?', answer: 'A professionally underpinned basement in Markham typically adds $150,000 – $250,000 in property value. A legal basement apartment can generate $1,600 – $2,200/month in rental income, providing ongoing return on investment.' },
      { question: 'What permits do I need for underpinning in Markham?', answer: 'You need a building permit from the City of Markham, stamped structural engineering drawings, and typically a geotechnical soil report. For second suites, additional zoning approvals and inspections are required.' },
      { question: 'How do I choose an underpinning contractor in Markham?', answer: 'Look for contractors with structural engineering partnerships, WSIB coverage, liability insurance, and verifiable project records. RenoNext-verified contractors like DrySpace Waterproofing serve all of York Region with GPS-verified proof of work.' },
    ],
  },
  'richmond-hill': {
    metaTitle: 'Best Underpinning Contractors in Richmond Hill (2026) | RenoNext',
    metaDescription:
      'Richmond Hill underpinning contractors. Basement lowering, bench footing, foundation repair. Verified pros in York Region with transparent pricing.',
    heroTagline: 'Expert Underpinning for Richmond Hill Properties',
    cityContext:
      'Richmond Hill spans from the Oak Ridges Moraine to established neighborhoods like Bayview Hill and Mill Pond. The moraine\'s high water table creates unique challenges for underpinning in northern Richmond Hill, requiring advanced dewatering techniques. Southern areas have 1970s-80s homes with the shallow basements that are most commonly underpinned in York Region.',
    commonIssues: [
      'High water table in northern Richmond Hill near the moraine',
      'Shallow basements in 1970s-80s south Richmond Hill homes',
      'Dewatering requirements during underpinning near groundwater',
      'Foundation settlement in clay soil conditions',
      'Creating rental-ready basement apartments',
      'Large homes requiring extensive underpinning sequences',
    ],
    challengeCards: [
      { icon: 'landscape', title: 'Moraine Challenges', description: 'Northern Richmond Hill sits on the Oak Ridges Moraine — underpinning requires dewatering to manage high groundwater.' },
      { icon: 'home_work', title: 'South Richmond Hill', description: 'The 1970s-80s homes in south Richmond Hill have 6-foot basements ideal for lowering to full living height.' },
      { icon: 'water', title: 'Dewatering Needed', description: 'High water table areas require pumped dewatering systems during excavation phases, adding complexity and cost.' },
      { icon: 'attach_money', title: 'Strong ROI', description: 'Richmond Hill\'s premium real estate market means underpinning investments deliver excellent property value returns.' },
    ],
    neighborhoods: ['Bayview Hill', 'Mill Pond', 'Oak Ridges', 'Jefferson', 'Westbrook', 'Rouge Woods', 'Elgin Mills', 'Observatory', 'Langstaff'],
    permitInfo: 'Town of Richmond Hill requires a building permit, structural engineering, and geotechnical report. Properties near Oak Ridges Moraine may have additional requirements.',
    faqs: [
      { question: 'How much does underpinning cost in Richmond Hill?', answer: 'Bench footing underpinning in Richmond Hill costs $475 – $760 per linear foot. Full basement lowering costs $71,000 – $142,500. Richmond Hill pricing is about 4% below Toronto.' },
      { question: 'Is underpinning harder near the Oak Ridges Moraine?', answer: 'Yes. Homes in northern Richmond Hill near the moraine face high water tables that require dewatering systems during excavation. This adds $5,000 – $15,000 to project costs but is essential for safe, quality work.' },
      { question: 'Can I create a basement apartment in Richmond Hill?', answer: 'Yes. Richmond Hill permits second units in most residential zones under York Region\'s official plan. Underpinning to achieve minimum ceiling height is the most common first step.' },
      { question: 'How long does underpinning take in Richmond Hill?', answer: 'Typical projects take 10-14 weeks. Homes near the moraine may take longer due to dewatering requirements and slower-paced excavation needed in saturated soil conditions.' },
      { question: 'Do I need a soil report for underpinning in Richmond Hill?', answer: 'Yes. A geotechnical soil report is required for all underpinning projects in Richmond Hill. It\'s especially critical near the moraine where water table depth and soil bearing capacity vary significantly between properties.' },
    ],
  },
  oakville: {
    metaTitle: 'Best Underpinning Contractors in Oakville (2026) | RenoNext',
    metaDescription:
      'Oakville underpinning contractors. Premium basement lowering, foundation repair, helical piles. Verified pros serving Halton Region.',
    heroTagline: 'Premium Underpinning for Oakville\'s Finest Homes',
    cityContext:
      'Oakville features some of the GTA\'s most valuable properties, making underpinning an especially smart investment. From old Oakville\'s character homes to River Oaks and Glen Abbey estates, homeowners are lowering basements to create entertainment spaces, home theatres, wine cellars, and luxury in-law suites. Oakville\'s premium market means higher labour rates but also stronger ROI.',
    commonIssues: [
      'High-value homes justifying premium underpinning for entertainment space',
      'Old Oakville character homes with shallow, dated foundations',
      'Large estate homes in Glen Abbey with extensive basement footprints',
      'Lake Ontario proximity affecting water table during excavation',
      'Creating luxury in-law suites and guest apartments',
      'Mature landscape restoration after exterior underpinning work',
    ],
    challengeCards: [
      { icon: 'villa', title: 'Premium Properties', description: 'Oakville\'s high-value homes justify premium underpinning for luxury basement spaces like theatres and wine cellars.' },
      { icon: 'museum', title: 'Character Homes', description: 'Old Oakville has charming homes with shallow foundations that need careful underpinning to preserve period character.' },
      { icon: 'waves', title: 'Lake Proximity', description: 'Properties near Lake Ontario face elevated water tables that require dewatering during underpinning excavation.' },
      { icon: 'park', title: 'Landscape Impact', description: 'Oakville\'s mature landscapes require careful planning to minimize and restore exterior disruption from excavation.' },
    ],
    neighborhoods: ['Southeast Oakville', 'Old Oakville', 'Bronte', 'Glen Abbey', 'River Oaks', 'Clearview', 'Falgarwood', 'College Park', 'Iroquois Ridge', 'Joshua Creek'],
    permitInfo: 'Town of Oakville requires a building permit and full structural engineering package. Halton Region standards apply. Conservation Halton approval may be needed near waterways.',
    faqs: [
      { question: 'How much does underpinning cost in Oakville?', answer: 'Bench footing underpinning in Oakville costs $515 – $825 per linear foot. Full basement lowering costs $76,500 – $153,000. Oakville pricing is about 2% above Toronto due to premium labour demand in Halton Region.' },
      { question: 'Why is underpinning more expensive in Oakville?', answer: 'Oakville has higher labour rates due to strong demand, affluent market conditions, and larger home sizes. Larger footprints mean more linear feet of underpinning, and premium finishes are more common, increasing overall project scope.' },
      { question: 'What underpinning options work best for Oakville estates?', answer: 'Large Glen Abbey and River Oaks homes often benefit from bench footing underpinning for the full perimeter. For homes with access limitations, helical piles offer a less invasive alternative. The structural engineer recommends the best method for each property.' },
      { question: 'How does underpinning increase Oakville home values?', answer: 'In Oakville\'s premium market, a finished underpinned basement can add $200,000 – $400,000 in property value. A luxury in-law suite or entertainment basement commands significant premiums in the Oakville real estate market.' },
      { question: 'Can I stay in my Oakville home during underpinning?', answer: 'Yes, in most cases. Work is done section by section. However, for larger Oakville homes with extensive underpinning, some homeowners prefer to relocate during the most intensive phases for comfort.' },
    ],
  },
  burlington: {
    metaTitle: 'Best Underpinning Contractors in Burlington (2026) | RenoNext',
    metaDescription:
      'Burlington underpinning contractors. Basement lowering, bench footing, foundation repair. Verified pros serving Halton Region.',
    heroTagline: 'Quality Underpinning for Burlington Homeowners',
    cityContext:
      'Burlington\'s location between Lake Ontario and the Niagara Escarpment creates unique underpinning considerations. Established neighborhoods like Aldershot and Central Burlington have 1950s-70s homes with shallow basements perfect for lowering. The escarpment\'s influence on drainage and the lake\'s effect on water tables require experienced contractors who understand the local geology.',
    commonIssues: [
      'Shallow basements in 1950s-70s Aldershot and Central Burlington homes',
      'Escarpment drainage affecting excavation conditions',
      'Lake Ontario influence on water table levels',
      'Post-war homes with dated foundation systems',
      'Creating additional living space in established neighborhoods',
      'Conservation authority requirements near the escarpment',
    ],
    challengeCards: [
      { icon: 'history', title: 'Post-War Homes', description: 'Burlington\'s 1950s-70s homes in Aldershot and Central have the shallow basements most in need of lowering.' },
      { icon: 'landscape', title: 'Escarpment Influence', description: 'The Niagara Escarpment affects drainage patterns and soil conditions, requiring specialized engineering for underpinning.' },
      { icon: 'waves', title: 'Lakefront Water Table', description: 'Properties closer to Lake Ontario face elevated water tables during excavation phases of underpinning.' },
      { icon: 'eco', title: 'Conservation Zones', description: 'Homes near the escarpment may need Conservation Halton approval in addition to standard building permits.' },
    ],
    neighborhoods: ['Aldershot', 'Central Burlington', 'Appleby', 'Brant Hills', 'Palmer', 'Tyandaga', 'Roseland', 'LaSalle', 'Shoreacres', 'Orchard'],
    permitInfo: 'City of Burlington requires a building permit and structural engineering. Properties near the Niagara Escarpment may need Conservation Halton approval.',
    faqs: [
      { question: 'How much does underpinning cost in Burlington?', answer: 'Bench footing underpinning in Burlington costs $475 – $760 per linear foot. Full basement lowering costs $71,000 – $142,500. Burlington pricing is about 4% below Toronto.' },
      { question: 'Are there special requirements for underpinning near the Escarpment?', answer: 'Properties within Conservation Halton\'s regulated area may require a permit from the conservation authority in addition to the City of Burlington building permit. This applies to homes near waterways, the escarpment, and hazard areas.' },
      { question: 'What Burlington neighborhoods benefit most from underpinning?', answer: 'Aldershot, Central Burlington, and Appleby are the most common areas for underpinning. These neighborhoods have established 1950s-70s homes with shallow basements and strong property values that justify the investment.' },
      { question: 'Can I underpin a post-war Burlington home?', answer: 'Yes. Post-war homes with poured concrete or concrete block foundations can be underpinned using bench footing methods. The structural engineer assesses the existing foundation condition and designs the appropriate approach.' },
      { question: 'How does underpinning affect Burlington home values?', answer: 'A professionally underpinned basement in Burlington typically adds $100,000 – $200,000 in property value. Combined with a basement apartment (renting $1,500 – $2,000/month), the ROI makes underpinning one of the best home investments in Burlington.' },
    ],
  },
  hamilton: {
    metaTitle: 'Best Underpinning Contractors in Hamilton (2026) | RenoNext',
    metaDescription:
      'Hamilton underpinning contractors. Affordable basement lowering, bench footing, foundation repair. Verified pros with the GTA\'s best value.',
    heroTagline: 'Affordable Underpinning in Hamilton — Quality That Lasts',
    cityContext:
      'Hamilton offers the most affordable underpinning rates in the GTA — approximately 10% below Toronto — while maintaining the same engineering and safety standards. The city\'s lower and upper (Mountain) areas have distinct housing stocks: lower Hamilton features some of Ontario\'s oldest homes with stone foundations, while the Mountain has 1960s-80s subdivisions with shallow basements perfect for lowering.',
    commonIssues: [
      'Century homes in the lower city with stone foundations',
      'Shallow basements in Mountain-area 1960s-80s subdivisions',
      'Heritage district requirements in Dundas and Ancaster',
      'Creating rental units to capitalize on growing Hamilton market',
      'Foundation settlement from mixed soil conditions',
      'Industrial-area homes with unique foundation challenges',
    ],
    challengeCards: [
      { icon: 'attach_money', title: 'Best GTA Value', description: 'Hamilton underpinning costs about 10% less than Toronto — the best value in the GTA for quality structural work.' },
      { icon: 'domain', title: 'Century Foundations', description: 'Lower Hamilton has century homes with stone foundations requiring specialized underpinning techniques.' },
      { icon: 'landscape', title: 'Mountain vs Lower', description: 'Hamilton\'s upper and lower areas have completely different housing stocks, each with unique underpinning needs.' },
      { icon: 'trending_up', title: 'Rising Market', description: 'Hamilton\'s growing real estate market makes basement conversion an excellent investment with strong rental demand.' },
    ],
    neighborhoods: ['Westdale', 'Kirkendall', 'Delta', 'Dundas', 'Ancaster', 'Stoney Creek', 'Bartonville', 'Crown Point', 'Locke Street', 'Corktown'],
    permitInfo: 'City of Hamilton requires a building permit, structural engineering, and geotechnical report. Heritage districts (Dundas, Westdale) require additional heritage review.',
    faqs: [
      { question: 'How much does underpinning cost in Hamilton?', answer: 'Bench footing underpinning in Hamilton costs $435 – $695 per linear foot. Full basement lowering costs $65,000 – $131,000. Hamilton has the most affordable underpinning rates in the GTA — about 10% below Toronto.' },
      { question: 'Can stone foundations be underpinned in Hamilton?', answer: 'Yes, but stone foundations require specialized techniques. The contractor must carefully support the stone wall while excavating beneath it. Some heritage homes may need the stone wall rebuilt with modern reinforcement during the underpinning process.' },
      { question: 'Does Hamilton\'s heritage district affect underpinning?', answer: 'In heritage-designated areas (Dundas, Ancaster, parts of lower Hamilton), you may need additional approvals from Hamilton\'s heritage committee. The underpinning method must preserve the building\'s heritage character and appearance.' },
      { question: 'Is Hamilton underpinning a good investment?', answer: 'Excellent. Hamilton basement apartments rent for $1,200 – $1,800/month. At a project cost of $65,000 – $131,000, the payback through rental income is typically 4-7 years. Hamilton\'s rising property values add further ROI.' },
      { question: 'What areas of Hamilton are most underpinned?', answer: 'The lower city (Westdale, Kirkendall, Delta) and the Mountain (Stoney Creek, Upper Stoney Creek) are the most common areas. Lower city homes often need deeper lowering, while Mountain homes typically have more straightforward shallow-to-standard conversions.' },
    ],
  },
  ajax: {
    metaTitle: 'Best Underpinning Contractors in Ajax (2026) | RenoNext',
    metaDescription:
      'Ajax underpinning contractors. Basement lowering, bench footing, foundation repair. Verified pros serving Durham Region with affordable pricing.',
    heroTagline: 'Reliable Underpinning for Ajax Homeowners',
    cityContext:
      'Ajax is a growing Durham Region community where homeowners are increasingly turning to underpinning to maximize their property value. The 1960s-80s homes in central Ajax and Pickering Village have shallow basements that benefit from lowering, while newer developments offer opportunities for basement apartment conversion to offset mortgage costs.',
    commonIssues: [
      'Shallow basements in 1960s-80s central Ajax homes',
      'Creating basement apartments for rental income',
      'Foundation settlement in lakefront areas',
      'Clay soil complicating excavation',
      'Limited basement headroom for building code compliance',
      'Homes near Duffins Creek with water table challenges',
    ],
    challengeCards: [
      { icon: 'home', title: 'Established Homes', description: 'Central Ajax and Pickering Village have 1960s-80s homes with shallow basements ideal for lowering.' },
      { icon: 'attach_money', title: 'Affordable Rates', description: 'Ajax underpinning costs about 9% below Toronto — excellent value in Durham Region.' },
      { icon: 'apartment', title: 'Rental Income', description: 'Strong Durham Region rental demand makes basement apartment conversion a smart financial move.' },
      { icon: 'water', title: 'Creek Proximity', description: 'Homes near Duffins Creek may face water management challenges during underpinning excavation.' },
    ],
    neighborhoods: ['Pickering Village', 'Central Ajax', 'South Ajax', 'Richardson', 'Audley', 'Westney Heights', 'Salem', 'Riverside', 'Lakeside'],
    permitInfo: 'Town of Ajax requires a building permit and structural engineering drawings. Durham Region standards apply. Geotechnical report required.',
    faqs: [
      { question: 'How much does underpinning cost in Ajax?', answer: 'Bench footing underpinning in Ajax costs $440 – $700 per linear foot. Full basement lowering costs $66,000 – $132,000. Ajax pricing is about 9% below Toronto — one of the most affordable locations in the GTA.' },
      { question: 'Do I need a permit for underpinning in Ajax?', answer: 'Yes. The Town of Ajax requires a building permit for all underpinning work. You need structural engineering drawings, typically a geotechnical report, and inspections at each stage of the underpinning sequence.' },
      { question: 'Can I create a basement apartment in Ajax?', answer: 'Yes. Durham Region permits second units in most residential zones. Underpinning to meet minimum ceiling height is typically the first step, followed by fire separation, egress, and mechanical work.' },
      { question: 'How long does underpinning take in Ajax?', answer: 'A typical Ajax home takes 8-12 weeks for full basement lowering. The timeline includes engineering, permit approval, construction, and final inspection.' },
      { question: 'Is underpinning worth it for my Ajax home?', answer: 'Ajax basement apartments rent for $1,400 – $1,900/month. At a project cost of $66,000 – $132,000, the payback through rental income is typically 4-7 years, plus significant added property value.' },
    ],
  },
  pickering: {
    metaTitle: 'Best Underpinning Contractors in Pickering (2026) | RenoNext',
    metaDescription:
      'Pickering underpinning contractors. Basement lowering, bench footing, foundation repair. Verified pros in Durham Region with transparent pricing.',
    heroTagline: 'Underpinning Solutions for Pickering Properties',
    cityContext:
      'Pickering\'s housing ranges from 1960s bungalows in central Pickering to modern developments near the city centre. The established neighborhoods have shallow basements that homeowners are lowering for additional living space and rental income. Pickering\'s proximity to Toronto and strong transit connections make basement apartments especially valuable.',
    commonIssues: [
      'Shallow basements in 1960s-70s central Pickering bungalows',
      'Creating rental units near GO Transit stations',
      'Foundation issues in lakefront properties',
      'Clay soil conditions throughout established neighborhoods',
      'Converting crawl spaces to full basements',
      'Limited ceiling height in older split-level homes',
    ],
    challengeCards: [
      { icon: 'home', title: 'Bungalow Belt', description: 'Central Pickering\'s 1960s-70s bungalows have the shallow basements most commonly lowered in Durham Region.' },
      { icon: 'train', title: 'Transit Premium', description: 'Proximity to Pickering GO station makes basement apartments highly rentable, boosting underpinning ROI.' },
      { icon: 'terrain', title: 'Clay Soil', description: 'Pickering\'s clay soil conditions require careful water management during underpinning excavation phases.' },
      { icon: 'attach_money', title: 'Durham Rates', description: 'Pickering underpinning costs about 8% below Toronto while maintaining the same engineering standards.' },
    ],
    neighborhoods: ['Bay Ridges', 'Dunbarton', 'Amberlea', 'Liverpool', 'Rosebank', 'Highbush', 'Brock Ridge', 'Rouge Park', 'Village East'],
    permitInfo: 'City of Pickering requires a building permit and stamped structural engineering drawings. Geotechnical report and stage inspections required.',
    faqs: [
      { question: 'How much does underpinning cost in Pickering?', answer: 'Bench footing underpinning in Pickering costs $450 – $720 per linear foot. Full basement lowering costs $68,000 – $136,000. Pickering pricing is about 8% below Toronto due to Durham Region labour rates.' },
      { question: 'Can I convert a crawl space to a full basement in Pickering?', answer: 'Yes. Some older Pickering homes have partial crawl spaces that can be converted to full basements through underpinning. This is more complex than standard lowering and requires careful structural engineering.' },
      { question: 'How does underpinning affect Pickering property values?', answer: 'A finished underpinned basement in Pickering adds $100,000 – $175,000 in property value. Combined with rental income of $1,400 – $1,900/month, underpinning is one of the best investments for Pickering homeowners.' },
      { question: 'Do Pickering homes near the lake need special underpinning?', answer: 'Homes in south Pickering near Lake Ontario may face higher water tables during excavation. Dewatering systems are sometimes needed, adding $5,000 – $10,000 to the project cost.' },
      { question: 'What inspections are needed for underpinning in Pickering?', answer: 'The City of Pickering requires inspections at each stage: initial excavation, form placement, rebar installation, concrete pour, and final completion. The structural engineer also conducts independent inspections.' },
    ],
  },
  oshawa: {
    metaTitle: 'Best Underpinning Contractors in Oshawa (2026) | RenoNext',
    metaDescription:
      'Oshawa underpinning contractors. Most affordable basement lowering in the GTA. Verified pros with transparent pricing in Durham Region.',
    heroTagline: 'Most Affordable Underpinning in the GTA — Oshawa',
    cityContext:
      'Oshawa offers the lowest underpinning rates in the entire GTA — approximately 12% below Toronto — making it the most affordable location for basement lowering. The city\'s post-war homes in the south, 1970s-80s subdivisions, and growing northern areas all present underpinning opportunities. Strong rental demand from Durham College and Ontario Tech University makes basement apartments especially valuable.',
    commonIssues: [
      'Post-war homes in south Oshawa with very shallow basements',
      'Student rental demand near Durham College and Ontario Tech',
      'Block foundations in 1960s-70s subdivisions',
      'Foundation settlement from Oshawa Creek corridor clay',
      'Affordable housing demand driving basement conversion',
      'Older industrial-area homes with unique foundation types',
    ],
    challengeCards: [
      { icon: 'attach_money', title: 'Lowest GTA Rates', description: 'Oshawa has the lowest underpinning labour rates in the GTA — quality work at 12% below Toronto pricing.' },
      { icon: 'school', title: 'Student Housing', description: 'Durham College and Ontario Tech create strong rental demand, making basement apartments highly profitable.' },
      { icon: 'home_work', title: 'Post-War Stock', description: 'South Oshawa has post-war homes with very shallow basements (5\'6") that benefit most from lowering.' },
      { icon: 'terrain', title: 'Creek Clay', description: 'Clay soil near Oshawa Creek requires careful water management during underpinning excavation.' },
    ],
    neighborhoods: ['South Oshawa', 'Central Oshawa', 'Lakeview', 'McLaughlin', 'Pinecrest', 'Eastdale', 'O\'Neill', 'Northwood', 'Windfields', 'Samac'],
    permitInfo: 'City of Oshawa requires a building permit and structural engineering. Durham Region standards apply. Geotechnical report recommended for clay soil areas.',
    faqs: [
      { question: 'How much does underpinning cost in Oshawa?', answer: 'Bench footing underpinning in Oshawa costs $425 – $680 per linear foot. Full basement lowering costs $63,000 – $126,000. Oshawa has the most affordable underpinning in the GTA — about 12% below Toronto.' },
      { question: 'Is underpinning a good investment near Oshawa\'s universities?', answer: 'Excellent. Student rentals near Durham College and Ontario Tech command $1,200 – $1,600/month. At Oshawa\'s lower project costs, the payback period can be as short as 4-5 years, with steady demand year-round.' },
      { question: 'Can block foundations be underpinned in Oshawa?', answer: 'Yes. Concrete block foundations require careful engineering and temporary support during underpinning. The block wall is supported while new bench footings are poured beneath it. Some older blocks may need reinforcement as part of the project.' },
      { question: 'Why is underpinning cheaper in Oshawa?', answer: 'Oshawa has lower labour rates than Toronto and York Region. Labour is the largest cost component of underpinning (60-65%). Material costs are similar across the GTA, but labour savings make Oshawa significantly more affordable.' },
      { question: 'What permits does Oshawa require for underpinning?', answer: 'The City of Oshawa requires a building permit, structural engineering drawings, and typically a geotechnical report. Inspections are required at multiple stages. For second suites, additional zoning and fire code compliance is required.' },
    ],
  },
  whitby: {
    metaTitle: 'Best Underpinning Contractors in Whitby (2026) | RenoNext',
    metaDescription:
      'Whitby underpinning contractors. Basement lowering, bench footing, foundation repair. Verified pros serving Durham Region.',
    heroTagline: 'Quality Underpinning for Whitby Homeowners',
    cityContext:
      'Whitby is a rapidly growing Durham Region town where underpinning demand is rising as homeowners seek to maximize their properties. Established neighborhoods near downtown Whitby and the lakeshore have homes from the 1960s-80s with shallow basements, while the expanding Brooklin area has newer homes that homeowners are already planning to convert for rental income.',
    commonIssues: [
      'Shallow basements in 1960s-80s downtown Whitby homes',
      'Growing families needing additional living space',
      'Brooklin homeowners planning basement conversions',
      'Lakefront properties with water table challenges',
      'Clay soil throughout established neighborhoods',
      'Foundation settlement near Lynde Creek and Pringle Creek',
    ],
    challengeCards: [
      { icon: 'home', title: 'Downtown Whitby', description: 'Established downtown Whitby has 1960s-80s homes with shallow basements prime for lowering.' },
      { icon: 'construction', title: 'Brooklin Growth', description: 'Newer Brooklin homes are being proactively underpinned as homeowners plan for basement apartment income.' },
      { icon: 'waves', title: 'Lakeshore Location', description: 'South Whitby homes near Lake Ontario may face water table challenges during underpinning excavation.' },
      { icon: 'attach_money', title: 'Durham Value', description: 'Whitby underpinning costs about 10% below Toronto — great value with strong rental market returns.' },
    ],
    neighborhoods: ['Downtown Whitby', 'Port Whitby', 'Brooklin', 'Williamsburg', 'Blue Grass Meadows', 'Pringle Creek', 'Lynde Creek', 'Rolling Acres', 'Fallingbrook'],
    permitInfo: 'Town of Whitby requires a building permit, structural engineering drawings, and geotechnical report. Durham Region inspection standards apply.',
    faqs: [
      { question: 'How much does underpinning cost in Whitby?', answer: 'Bench footing underpinning in Whitby costs $435 – $695 per linear foot. Full basement lowering costs $65,000 – $131,000. Whitby pricing is about 10% below Toronto.' },
      { question: 'Can I create a basement apartment in Whitby?', answer: 'Yes. Durham Region permits second units in most residential zones. Underpinning to meet minimum ceiling height is the first step, followed by fire separation, separate entrance, egress windows, and mechanical work.' },
      { question: 'How long does underpinning take in Whitby?', answer: 'A typical Whitby home takes 8-12 weeks for full basement lowering. Engineering and permit approvals typically take an additional 4-6 weeks before construction begins.' },
      { question: 'What\'s the ROI on underpinning in Whitby?', answer: 'Whitby basement apartments rent for $1,400 – $1,800/month. At a project cost of $65,000 – $131,000, the payback through rental income is 4-6 years. Added property value of $100,000 – $175,000 further boosts ROI.' },
      { question: 'Do Whitby homes near creeks need special underpinning?', answer: 'Homes near Lynde Creek and Pringle Creek may face higher water tables. The geotechnical report will identify any dewatering requirements, which can add $5,000 – $10,000 to the project cost.' },
    ],
  },
  milton: {
    metaTitle: 'Best Underpinning Contractors in Milton (2026) | RenoNext',
    metaDescription:
      'Milton underpinning contractors. Basement lowering, foundation repair, helical piles. Verified pros serving Halton Region with affordable pricing.',
    heroTagline: 'Underpinning Solutions for Milton\'s Growing Community',
    cityContext:
      'Milton is one of Canada\'s fastest-growing towns, and many homeowners are already planning basement conversions in homes built after 2000. While builder-grade basements often have decent ceiling height, many are built with minimal foundation depth that limits future finishing options. Milton also has established areas where older homes benefit from traditional basement lowering.',
    commonIssues: [
      'Newer homes with builder-grade foundations limiting basement finishing',
      'Niagara Escarpment proximity affecting soil and drainage',
      'Growing families needing multi-generational living space',
      'Foundation settling in rapidly built developments',
      'Creating rental income in Ontario\'s most expensive housing market',
      'Limited foundation depth in some newer construction',
    ],
    challengeCards: [
      { icon: 'construction', title: 'Newer Builds', description: 'Many Milton homes built after 2000 have builder-grade foundations that may limit basement finishing without underpinning.' },
      { icon: 'landscape', title: 'Escarpment Soil', description: 'Western Milton near the Niagara Escarpment has varied soil conditions requiring careful geotechnical assessment.' },
      { icon: 'groups', title: 'Growing Families', description: 'Milton\'s family-oriented community drives demand for additional living space through basement conversion.' },
      { icon: 'attach_money', title: 'Halton Value', description: 'Milton underpinning costs about 8% below Toronto while maintaining the same Halton Region standards.' },
    ],
    neighborhoods: ['Old Milton', 'Timberlea', 'Harrison', 'Willmott', 'Beaty', 'Bronte Meadows', 'Dempsey', 'Ford', 'Scott', 'Cobblestone'],
    permitInfo: 'Town of Milton requires a building permit and full engineering package. Conservation Halton approval may be needed near the Niagara Escarpment.',
    faqs: [
      { question: 'How much does underpinning cost in Milton?', answer: 'Bench footing underpinning in Milton costs $450 – $720 per linear foot. Full basement lowering costs $68,000 – $136,000. Milton pricing is about 8% below Toronto due to Halton Region labour rates.' },
      { question: 'Do new Milton homes need underpinning?', answer: 'Some newer Milton homes have adequate ceiling height but limited foundation depth. If you want to finish your basement with in-floor heating, a bathroom rough-in below grade, or a walkout, underpinning may be needed.' },
      { question: 'Are there special requirements near the Escarpment?', answer: 'Properties near the Niagara Escarpment may need Conservation Halton approval in addition to the Town of Milton building permit. The geotechnical report is especially important in areas with varied escarpment soil conditions.' },
      { question: 'How does underpinning affect Milton home values?', answer: 'A finished underpinned basement in Milton adds $125,000 – $200,000 in property value. With Milton\'s strong real estate market and growing rental demand, the ROI on underpinning is excellent.' },
      { question: 'Can I underpin while living in my Milton home?', answer: 'Yes. Work is done in alternating sections, so your home remains supported throughout. Expect 8-14 weeks of construction with some noise and dust. Many Milton families stay in the home and find it manageable.' },
    ],
  },
  aurora: {
    metaTitle: 'Best Underpinning Contractors in Aurora (2026) | RenoNext',
    metaDescription:
      'Aurora underpinning contractors. Basement lowering, bench footing, foundation repair. Verified pros serving York Region with transparent pricing.',
    heroTagline: 'Professional Underpinning for Aurora Properties',
    cityContext:
      'Aurora is a well-established York Region town with a charming historic downtown and expanding subdivisions. The heritage district features homes over 100 years old with unique foundation challenges, while 1970s-90s developments have the shallow basements most commonly lowered. Aurora\'s proximity to the Holland River means some areas face water table challenges during underpinning excavation.',
    commonIssues: [
      'Heritage downtown homes with century-old stone foundations',
      'Shallow basements in 1970s-90s established neighborhoods',
      'Holland River headwaters affecting water table in north Aurora',
      'Creating in-law suites and rental units',
      'Mixed soil conditions requiring varied underpinning approaches',
      'Foundation settlement in clay-heavy areas',
    ],
    challengeCards: [
      { icon: 'museum', title: 'Heritage Homes', description: 'Aurora\'s historic downtown has century homes with stone foundations needing specialized underpinning.' },
      { icon: 'home_work', title: 'Established Suburbs', description: 'The 1970s-90s neighborhoods have the shallow basements most commonly underpinned in Aurora.' },
      { icon: 'water', title: 'Holland River', description: 'North Aurora near the Holland River headwaters may face water table challenges during excavation.' },
      { icon: 'attach_money', title: 'York Region Rates', description: 'Aurora underpinning costs about 6% below Toronto — competitive pricing in York Region.' },
    ],
    neighborhoods: ['Aurora Village', 'Bayview Northeast', 'Bayview Southeast', 'Aurora Heights', 'Aurora Grove', 'Temperance', 'St. Andrew\'s', 'Stonebridge', 'Aurora Highlands'],
    permitInfo: 'Town of Aurora requires a building permit, structural engineering, and geotechnical report. Heritage committee approval needed for historic downtown properties.',
    faqs: [
      { question: 'How much does underpinning cost in Aurora?', answer: 'Bench footing underpinning in Aurora costs $460 – $735 per linear foot. Full basement lowering costs $69,000 – $138,000. Aurora pricing is about 6% below Toronto due to York Region labour rates.' },
      { question: 'Can Aurora heritage homes be underpinned?', answer: 'Yes, but heritage properties require specialized techniques and may need additional approvals from Aurora\'s heritage committee. Stone foundations require careful support during excavation, and the underpinning method must preserve the building\'s character.' },
      { question: 'How long does underpinning take in Aurora?', answer: 'A typical Aurora home takes 8-14 weeks for full basement lowering. Heritage homes may take longer due to the care required for older foundation materials. Engineering and permits add 4-8 weeks before construction.' },
      { question: 'Is underpinning a good investment in Aurora?', answer: 'Yes. Aurora basement apartments rent for $1,500 – $2,000/month. At a project cost of $69,000 – $138,000, the payback through rental income is typically 4-6 years, plus $125,000 – $200,000 in added property value.' },
      { question: 'What should I know about underpinning near the Holland River?', answer: 'Properties in north Aurora near the Holland River may have elevated water tables. A geotechnical report will determine if dewatering is needed during excavation, which can add $5,000 – $10,000 to the project cost.' },
    ],
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Get all city slugs for generateStaticParams */
export function getAllUnderpinningCitySlugs(): string[] {
  return cityMultipliers.map((c) => c.slug);
}

/** Get full city underpinning data */
export function getCityUnderpinningData(slug: string): CityUnderpinningData | undefined {
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
export function getUnderpinningServicePriceRange(service: UnderpinningServiceDetail, citySlug: string): string {
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
export function getNearbyUnderpinningCities(citySlug: string): CityUnderpinningData[] {
  const city = getCityBySlug(citySlug);
  if (!city) return [];
  return city.nearbyCities
    .map((s) => getCityUnderpinningData(s))
    .filter((c): c is CityUnderpinningData => c !== undefined);
}
