/**
 * Renovation Cost Data for RenoNext
 * Ontario-focused pricing with city-specific multipliers
 *
 * Pure data file — no React imports, no project dependencies
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface NumericPriceRange {
  scope: string;
  minCAD: number;
  maxCAD: number;
  unit: string;
  labourPct: number;
  materialPct: number;
}

export interface CityMultiplier {
  slug: string;
  name: string;
  region: string;
  labour: number;
  material: number;
  overall: number;
  permitFeeNote?: string;
  nearbyCities: string[];
}

export interface ServiceCostData {
  slug: string;
  title: string;
  category: string;
  startingPrice: number;
  contingencyPct: number;
  typicalTimeline: string;
  priceRanges: NumericPriceRange[];
  includedInPrice: string[];
  notIncludedInPrice: string[];
  costTips: string[];
  requiresEngineering: boolean;
  projectType: 'adu' | 'energy' | 'structural' | 'general';
}

// ---------------------------------------------------------------------------
// 15 GTA Cities — labour & material multipliers (Toronto = 1.00 baseline)
// ---------------------------------------------------------------------------
export const cityMultipliers: CityMultiplier[] = [
  {
    slug: 'toronto',
    name: 'Toronto',
    region: 'City of Toronto',
    labour: 1.00,
    material: 1.00,
    overall: 1.00,
    permitFeeNote: 'Toronto permit fees based on project value (typically $12-$15 per $1,000 of construction value).',
    nearbyCities: ['mississauga', 'vaughan', 'markham', 'pickering'],
  },
  {
    slug: 'mississauga',
    name: 'Mississauga',
    region: 'Peel Region',
    labour: 0.93,
    material: 0.98,
    overall: 0.95,
    permitFeeNote: 'Mississauga permit fees are slightly lower than Toronto. Flat-rate fee schedule for most residential projects.',
    nearbyCities: ['toronto', 'brampton', 'oakville', 'vaughan'],
  },
  {
    slug: 'brampton',
    name: 'Brampton',
    region: 'Peel Region',
    labour: 0.90,
    material: 0.96,
    overall: 0.92,
    permitFeeNote: 'Brampton has a simplified permit process for minor renovations. Larger projects follow standard Peel Region fees.',
    nearbyCities: ['mississauga', 'vaughan', 'milton', 'toronto'],
  },
  {
    slug: 'vaughan',
    name: 'Vaughan',
    region: 'York Region',
    labour: 0.96,
    material: 0.99,
    overall: 0.97,
    permitFeeNote: 'York Region permit fees are comparable to Toronto. New developments may have additional development charges.',
    nearbyCities: ['toronto', 'richmond-hill', 'brampton', 'markham'],
  },
  {
    slug: 'markham',
    name: 'Markham',
    region: 'York Region',
    labour: 0.95,
    material: 0.99,
    overall: 0.97,
    permitFeeNote: 'Markham follows York Region fee schedules. Heritage district properties may require additional review fees.',
    nearbyCities: ['toronto', 'richmond-hill', 'vaughan', 'pickering'],
  },
  {
    slug: 'richmond-hill',
    name: 'Richmond Hill',
    region: 'York Region',
    labour: 0.95,
    material: 0.98,
    overall: 0.96,
    permitFeeNote: 'Richmond Hill permit fees follow York Region standards.',
    nearbyCities: ['markham', 'vaughan', 'aurora', 'toronto'],
  },
  {
    slug: 'aurora',
    name: 'Aurora',
    region: 'York Region',
    labour: 0.92,
    material: 0.97,
    overall: 0.94,
    permitFeeNote: 'Aurora has competitive permit fees within York Region. Heritage overlay areas require additional approvals.',
    nearbyCities: ['richmond-hill', 'markham', 'vaughan', 'whitby'],
  },
  {
    slug: 'oakville',
    name: 'Oakville',
    region: 'Halton Region',
    labour: 1.03,
    material: 1.00,
    overall: 1.02,
    permitFeeNote: 'Oakville has premium labour rates due to high demand and affluent market. Permit fees are moderate.',
    nearbyCities: ['mississauga', 'burlington', 'milton', 'toronto'],
  },
  {
    slug: 'burlington',
    name: 'Burlington',
    region: 'Halton Region',
    labour: 0.95,
    material: 0.97,
    overall: 0.96,
    permitFeeNote: 'Burlington permit fees follow Halton Region standards. Waterfront properties may have conservation authority requirements.',
    nearbyCities: ['oakville', 'hamilton', 'milton', 'mississauga'],
  },
  {
    slug: 'milton',
    name: 'Milton',
    region: 'Halton Region',
    labour: 0.90,
    material: 0.96,
    overall: 0.92,
    permitFeeNote: 'Milton has competitive rates due to rapid growth. Many new-build homes with modern infrastructure.',
    nearbyCities: ['oakville', 'brampton', 'burlington', 'mississauga'],
  },
  {
    slug: 'ajax',
    name: 'Ajax',
    region: 'Durham Region',
    labour: 0.88,
    material: 0.95,
    overall: 0.91,
    permitFeeNote: 'Durham Region permit fees are generally lower than Toronto/York. Ajax follows regional fee schedule.',
    nearbyCities: ['pickering', 'whitby', 'oshawa', 'toronto'],
  },
  {
    slug: 'pickering',
    name: 'Pickering',
    region: 'Durham Region',
    labour: 0.90,
    material: 0.96,
    overall: 0.92,
    permitFeeNote: 'Pickering permit fees follow Durham Region standards. Casino development area may have unique requirements.',
    nearbyCities: ['ajax', 'toronto', 'markham', 'whitby'],
  },
  {
    slug: 'oshawa',
    name: 'Oshawa',
    region: 'Durham Region',
    labour: 0.85,
    material: 0.94,
    overall: 0.88,
    permitFeeNote: 'Oshawa has the lowest labour rates in the GTA. Permit fees follow Durham Region schedule.',
    nearbyCities: ['whitby', 'ajax', 'pickering', 'hamilton'],
  },
  {
    slug: 'whitby',
    name: 'Whitby',
    region: 'Durham Region',
    labour: 0.87,
    material: 0.95,
    overall: 0.90,
    permitFeeNote: 'Whitby follows Durham Region permit fee schedule. Growing market with increasing contractor availability.',
    nearbyCities: ['oshawa', 'ajax', 'pickering', 'toronto'],
  },
  {
    slug: 'hamilton',
    name: 'Hamilton',
    region: 'City of Hamilton',
    labour: 0.87,
    material: 0.94,
    overall: 0.90,
    permitFeeNote: 'Hamilton has its own permit fee schedule. Heritage districts (Dundas, Westdale) require additional review.',
    nearbyCities: ['burlington', 'oakville', 'milton', 'oshawa'],
  },
];

// ---------------------------------------------------------------------------
// Helper: city-adjusted pricing with split multipliers
// ---------------------------------------------------------------------------
export function getCityAdjustedPrice(
  baseMin: number,
  baseMax: number,
  labourPct: number,
  materialPct: number,
  city: CityMultiplier,
): { min: number; max: number } {
  const labourShare = labourPct / 100;
  const materialShare = materialPct / 100;
  const adjustedMin = Math.round(
    baseMin * (labourShare * city.labour + materialShare * city.material),
  );
  const adjustedMax = Math.round(
    baseMax * (labourShare * city.labour + materialShare * city.material),
  );
  return { min: adjustedMin, max: adjustedMax };
}

export function getCityBySlug(slug: string): CityMultiplier | undefined {
  return cityMultipliers.find((c) => c.slug === slug);
}

export function getNearbyCities(citySlug: string): CityMultiplier[] {
  const city = getCityBySlug(citySlug);
  if (!city) return [];
  return city.nearbyCities
    .map((s) => getCityBySlug(s))
    .filter((c): c is CityMultiplier => c !== undefined);
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPriceRange(min: number, max: number): string {
  return `${formatPrice(min)} – ${formatPrice(max)}`;
}

// ---------------------------------------------------------------------------
// 25 Service Cost Datasets
// ---------------------------------------------------------------------------
export const serviceCosts: ServiceCostData[] = [
  // ── Structural ──────────────────────────────────────────────
  {
    slug: 'underpinning',
    title: 'Underpinning',
    category: 'Structural',
    startingPrice: 500,
    contingencyPct: 15,
    typicalTimeline: '6-12 weeks',
    priceRanges: [
      { scope: 'Stabilization only (per linear foot)', minCAD: 500, maxCAD: 800, unit: 'per lin. ft', labourPct: 65, materialPct: 35 },
      { scope: 'Full basement lowering (typical Toronto semi)', minCAD: 75000, maxCAD: 150000, unit: 'per project', labourPct: 60, materialPct: 40 },
      { scope: 'Helical pile underpinning (per pile, 8-12 needed)', minCAD: 1200, maxCAD: 2000, unit: 'per pile', labourPct: 55, materialPct: 45 },
      { scope: 'Engineering and permits', minCAD: 5000, maxCAD: 12000, unit: 'per project', labourPct: 85, materialPct: 15 },
    ],
    includedInPrice: [
      'Structural engineer design and stamped drawings',
      'Building permit application and fees',
      'Temporary shoring and bracing',
      'Excavation in alternating 4-ft sections',
      'Concrete footings (25-32 MPa) with #15M rebar',
      'New basement floor slab with vapor barrier',
      'Interior weeping tile and sump pump',
      'Basic exterior waterproofing',
      'Building inspections at key stages',
    ],
    notIncludedInPrice: [
      'Basement finishing (framing, drywall, flooring)',
      'HVAC relocation and ductwork modifications',
      'Electrical panel relocation',
      'Plumbing rough-in for new bathroom',
      'Exterior landscaping restoration',
      'Window well installation and enlargement',
      'Geotechnical soil report ($2,500-$5,000)',
      'Heated enclosures for winter work',
    ],
    costTips: [
      'Get the geotechnical report — at $2,500-$5,000 it\'s cheap insurance for a $100K+ project.',
      'Bundle waterproofing with underpinning to save 30-40% vs doing them separately.',
      'Avoid winter work if possible — heated enclosures add $3,000-$8,000.',
      'Plan all mechanical relocations before starting — mid-project changes during underpinning are extremely expensive.',
      'Compare bench underpinning vs helical piles — piles are faster but limit future foundation modifications.',
    ],
    requiresEngineering: true,
    projectType: 'structural',
  },
  {
    slug: 'waterproofing',
    title: 'Waterproofing',
    category: 'Structural',
    startingPrice: 5000,
    contingencyPct: 10,
    typicalTimeline: '3-14 days',
    priceRanges: [
      { scope: 'Exterior waterproofing (one wall, 20-30 ft)', minCAD: 5000, maxCAD: 12000, unit: 'per wall', labourPct: 65, materialPct: 35 },
      { scope: 'Full-perimeter exterior waterproofing', minCAD: 18000, maxCAD: 40000, unit: 'per project', labourPct: 60, materialPct: 40 },
      { scope: 'Interior drain tile + sump pump', minCAD: 5000, maxCAD: 10000, unit: 'per project', labourPct: 55, materialPct: 45 },
      { scope: 'Crack injection (epoxy/polyurethane)', minCAD: 500, maxCAD: 1500, unit: 'per crack', labourPct: 70, materialPct: 30 },
      { scope: 'Sump pump replacement', minCAD: 800, maxCAD: 2000, unit: 'per unit', labourPct: 50, materialPct: 50 },
    ],
    includedInPrice: [
      'Excavation to footing depth',
      'Foundation cleaning and crack repair',
      'Rubberized waterproofing membrane',
      'Weeping tile with filter fabric',
      'Dimpled drainage board',
      'Gravel backfill near foundation',
      'Basic grading and surface drainage',
    ],
    notIncludedInPrice: [
      'Landscaping restoration (sod, gardens, walkways)',
      'Driveway repair if excavation crosses it',
      'Interior finishing (drywall, paint) after repair',
      'Mold remediation if existing mold found',
      'Tree removal near foundation',
      'Downspout extensions and gutter repairs',
    ],
    costTips: [
      'Fix grading and extend downspouts first — $1,000-$3,000 in drainage work solves 80% of moisture problems.',
      'Combine waterproofing with underpinning or foundation repair to share excavation costs.',
      'Exterior waterproofing costs 2-3x more than interior but is 5-10x more effective.',
      'Ask for Big-O pipe with filter fabric — contractors who skip the fabric save $100 and cost you $15,000 in a decade.',
      'Battery backup sump pump ($600-$1,200) prevents flooding during power outages.',
    ],
    requiresEngineering: false,
    projectType: 'structural',
  },
  {
    slug: 'foundation-repair',
    title: 'Foundation Repair',
    category: 'Structural',
    startingPrice: 500,
    contingencyPct: 15,
    typicalTimeline: '1-35 days',
    priceRanges: [
      { scope: 'Crack injection (epoxy/polyurethane)', minCAD: 500, maxCAD: 1500, unit: 'per crack', labourPct: 70, materialPct: 30 },
      { scope: 'Carbon fiber reinforcement (bowing walls)', minCAD: 4000, maxCAD: 8000, unit: 'per wall', labourPct: 50, materialPct: 50 },
      { scope: 'Wall anchors (bowing walls)', minCAD: 6000, maxCAD: 12000, unit: 'per wall', labourPct: 55, materialPct: 45 },
      { scope: 'Helical piers (settlement, 4-8 piers)', minCAD: 1500, maxCAD: 2500, unit: 'per pier', labourPct: 55, materialPct: 45 },
      { scope: 'Parging repair', minCAD: 10, maxCAD: 20, unit: 'per sq ft', labourPct: 65, materialPct: 35 },
      { scope: 'Engineering report and design', minCAD: 1500, maxCAD: 4000, unit: 'per project', labourPct: 90, materialPct: 10 },
    ],
    includedInPrice: [
      'Crack mapping and structural assessment',
      'Injection ports and surface sealing',
      'Epoxy or polyurethane injection material',
      'Post-repair crack monitoring',
      'Clean-up and surface restoration',
    ],
    notIncludedInPrice: [
      'Exterior excavation (if accessing from outside)',
      'Waterproofing membrane installation',
      'Interior finishing repair (drywall, paint)',
      'Geotechnical report for settlement cases',
      'Drainage improvements to fix root cause',
      'Tree removal if roots caused the damage',
    ],
    costTips: [
      'Fix the root cause (drainage, grading) before repairing cracks — otherwise they come back in 2-5 years.',
      'Multiple cracks get volume discounts — fix all cracks in one visit to save on mobilization costs.',
      'Carbon fiber is cheaper than wall anchors but can\'t reverse bowing — choose based on wall deflection.',
      'Get engineer reports for any crack wider than 1/4 inch — structural issues need professional assessment.',
      'Combine exterior crack repair with waterproofing to avoid paying for excavation twice.',
    ],
    requiresEngineering: true,
    projectType: 'structural',
  },
  {
    slug: 'concrete-works',
    title: 'Concrete Works',
    category: 'Structural',
    startingPrice: 800,
    contingencyPct: 10,
    typicalTimeline: '1-10 days + 28-day cure',
    priceRanges: [
      { scope: 'Driveway (single-car, 10x20 ft)', minCAD: 2500, maxCAD: 4500, unit: 'per project', labourPct: 55, materialPct: 45 },
      { scope: 'Basement floor slab (1,000 sq ft)', minCAD: 4000, maxCAD: 7000, unit: 'per project', labourPct: 50, materialPct: 50 },
      { scope: 'Walkway or patio (100 sq ft)', minCAD: 800, maxCAD: 1500, unit: 'per project', labourPct: 55, materialPct: 45 },
      { scope: 'Foundation footing', minCAD: 40, maxCAD: 80, unit: 'per lin. ft', labourPct: 55, materialPct: 45 },
      { scope: 'Retaining wall (4-6 ft tall)', minCAD: 150, maxCAD: 300, unit: 'per lin. ft', labourPct: 50, materialPct: 50 },
      { scope: 'Concrete steps (3-5 steps)', minCAD: 1200, maxCAD: 2500, unit: 'per set', labourPct: 60, materialPct: 40 },
    ],
    includedInPrice: [
      'Excavation and subgrade preparation',
      'Compacted gravel base',
      'Formwork and reinforcement (wire mesh or rebar)',
      'Air-entrained concrete (25-32 MPa)',
      'Placement, screeding, and finishing',
      'Control joint cutting',
      'Basic curing (compound or covering)',
    ],
    notIncludedInPrice: [
      'Old concrete removal and disposal ($3-$6/sq ft)',
      'Stamped or decorative finishes ($8-$15/sq ft extra)',
      'Exposed aggregate finish ($5-$10/sq ft extra)',
      'Concrete pump for hard-to-reach areas ($600-$1,200)',
      'Winter premiums (heated enclosures, accelerators)',
      'Grading and drainage modifications',
    ],
    costTips: [
      'Specify air-entrained concrete on every job — non-air-entrained fails in 5-10 Ontario winters.',
      'Verify thickness before the pour (measure the forms) — some contractors pour 3" instead of 4".',
      'Wait 28 days before heavy loads — driving on a 7-day-old driveway causes permanent damage.',
      'Broom finish is included; stamped adds $8-$15/sq ft — weigh aesthetics vs maintenance cost.',
      'Bundle multiple pours (driveway + walkway + steps) to save on mobilization and ready-mix minimums.',
    ],
    requiresEngineering: false,
    projectType: 'structural',
  },
  {
    slug: 'masonry',
    title: 'Masonry',
    category: 'Structural',
    startingPrice: 15,
    contingencyPct: 10,
    typicalTimeline: '1-21 days',
    priceRanges: [
      { scope: 'Tuckpointing (mortar joint repair)', minCAD: 15, maxCAD: 30, unit: 'per sq ft', labourPct: 75, materialPct: 25 },
      { scope: 'Brick replacement (matching existing)', minCAD: 25, maxCAD: 50, unit: 'per brick', labourPct: 60, materialPct: 40 },
      { scope: 'Chimney rebuild (above roofline)', minCAD: 3000, maxCAD: 8000, unit: 'per chimney', labourPct: 55, materialPct: 45 },
      { scope: 'Stone veneer installation', minCAD: 25, maxCAD: 50, unit: 'per sq ft', labourPct: 50, materialPct: 50 },
      { scope: 'Block wall construction', minCAD: 20, maxCAD: 35, unit: 'per sq ft', labourPct: 55, materialPct: 45 },
      { scope: 'Parging (foundation exterior)', minCAD: 8, maxCAD: 15, unit: 'per sq ft', labourPct: 65, materialPct: 35 },
    ],
    includedInPrice: [
      'Mortar matching and colour selection',
      'Old mortar grinding and removal',
      'New mortar mixing and application',
      'Joint tooling and finishing',
      'Brick cleaning and debris removal',
      'Scaffolding for heights under 20 ft',
    ],
    notIncludedInPrice: [
      'Scaffolding rental for multi-story work ($500-$2,000)',
      'Custom brick sourcing for heritage matching',
      'Structural engineering for load-bearing walls',
      'Waterproofing behind brick veneer',
      'Flashing replacement at window/door heads',
      'Chimney liner installation ($1,500-$4,000)',
    ],
    costTips: [
      'Match mortar type to your brick age — Type N for heritage, Type S/M for modern. Wrong mortar destroys old brick.',
      'Tuckpoint early when joints recede 1/4" — waiting until mortar is gone costs 3x more to fix.',
      'Chimney repairs above the roofline are weather-dependent — schedule for dry months to avoid delays.',
      'Get brick samples before starting — colour matching is harder than it looks, especially on 50+ year old homes.',
      'Parging is cosmetic, not structural — don\'t pay for parging to "fix" a structural foundation issue.',
    ],
    requiresEngineering: false,
    projectType: 'structural',
  },
  {
    slug: 'framing',
    title: 'Framing',
    category: 'Structural',
    startingPrice: 5,
    contingencyPct: 10,
    typicalTimeline: '1-4 weeks',
    priceRanges: [
      { scope: 'Interior wall framing', minCAD: 5, maxCAD: 10, unit: 'per sq ft', labourPct: 65, materialPct: 35 },
      { scope: 'Basement framing (full basement)', minCAD: 3000, maxCAD: 6000, unit: 'per project', labourPct: 60, materialPct: 40 },
      { scope: 'Addition framing (per sq ft of floor area)', minCAD: 15, maxCAD: 30, unit: 'per sq ft', labourPct: 55, materialPct: 45 },
      { scope: 'Structural beam installation (steel)', minCAD: 2000, maxCAD: 5000, unit: 'per beam', labourPct: 45, materialPct: 55 },
      { scope: 'Load-bearing wall removal + beam', minCAD: 3000, maxCAD: 8000, unit: 'per opening', labourPct: 50, materialPct: 50 },
    ],
    includedInPrice: [
      'Layout and plate installation',
      'Stud walls (16" or 24" on center)',
      'Headers and cripple studs',
      'Blocking for fixtures and cabinets',
      'Basic fasteners and hardware',
    ],
    notIncludedInPrice: [
      'Structural engineering for load-bearing changes',
      'Steel beams and lally columns (priced separately)',
      'Insulation and vapor barrier',
      'Electrical and plumbing rough-in',
      'Drywall and finishing',
      'Building permits for structural modifications',
    ],
    costTips: [
      'Lumber prices fluctuate 20-30% seasonally — check current rates before budgeting.',
      'Use 2x6 exterior walls instead of 2x4 for better insulation cavity without foam board.',
      'Pre-plan all electrical and plumbing runs before framing to avoid costly re-work.',
      'Steel beam installation requires LVL or engineered lumber specification from an engineer.',
      'Frame and rough-in all services before closing walls — opening finished walls costs 5x more.',
    ],
    requiresEngineering: false,
    projectType: 'structural',
  },
  // ── Trades ──────────────────────────────────────────────────
  {
    slug: 'electrical',
    title: 'Electrical',
    category: 'Trades',
    startingPrice: 150,
    contingencyPct: 10,
    typicalTimeline: '1-10 days',
    priceRanges: [
      { scope: 'Panel upgrade (100A to 200A)', minCAD: 2500, maxCAD: 5000, unit: 'per panel', labourPct: 65, materialPct: 35 },
      { scope: 'Circuit addition (per circuit)', minCAD: 250, maxCAD: 500, unit: 'per circuit', labourPct: 60, materialPct: 40 },
      { scope: 'Full basement wiring', minCAD: 3000, maxCAD: 6000, unit: 'per project', labourPct: 55, materialPct: 45 },
      { scope: 'EV charger installation (Level 2)', minCAD: 1500, maxCAD: 3000, unit: 'per charger', labourPct: 50, materialPct: 50 },
      { scope: 'Knob-and-tube rewiring (per floor)', minCAD: 5000, maxCAD: 10000, unit: 'per floor', labourPct: 70, materialPct: 30 },
      { scope: 'Pot light installation (per light)', minCAD: 150, maxCAD: 300, unit: 'per light', labourPct: 55, materialPct: 45 },
    ],
    includedInPrice: [
      'Licensed electrician labour (ESA certified)',
      'Wire, connectors, and junction boxes',
      'Outlets, switches, and cover plates',
      'Circuit breakers',
      'ESA inspection and certificate',
      'Permit application',
    ],
    notIncludedInPrice: [
      'Drywall patching after wire runs',
      'Light fixtures (beyond basic)',
      'Smart home wiring (Cat6, coax)',
      'Generator installation and transfer switch',
      'Meter base replacement (utility responsibility)',
      'Trenching for underground runs',
    ],
    costTips: [
      'Bundle electrical with other renovation work — opening walls for framing saves re-work on wiring.',
      'Upgrade to 200A panel during renovation — doing it later costs $2,000+ more.',
      'Ask for arc-fault breakers (AFCI) on bedroom circuits — required by OBC and prevents fires.',
      'LED pot lights cost more upfront but save $50-$100/year in electricity per fixture.',
      'Always get the ESA certificate — insurance claims and resale require proof of permitted work.',
    ],
    requiresEngineering: false,
    projectType: 'general',
  },
  {
    slug: 'plumbing',
    title: 'Plumbing',
    category: 'Trades',
    startingPrice: 200,
    contingencyPct: 10,
    typicalTimeline: '1-7 days',
    priceRanges: [
      { scope: 'Basement bathroom rough-in', minCAD: 3000, maxCAD: 6000, unit: 'per bathroom', labourPct: 65, materialPct: 35 },
      { scope: 'Drain line replacement (per floor)', minCAD: 2000, maxCAD: 5000, unit: 'per floor', labourPct: 60, materialPct: 40 },
      { scope: 'Water heater replacement', minCAD: 1500, maxCAD: 3500, unit: 'per unit', labourPct: 40, materialPct: 60 },
      { scope: 'Sump pump installation', minCAD: 800, maxCAD: 2000, unit: 'per unit', labourPct: 55, materialPct: 45 },
      { scope: 'Backwater valve installation', minCAD: 2000, maxCAD: 4000, unit: 'per valve', labourPct: 60, materialPct: 40 },
      { scope: 'Kitchen/bathroom fixture install', minCAD: 200, maxCAD: 500, unit: 'per fixture', labourPct: 70, materialPct: 30 },
    ],
    includedInPrice: [
      'Licensed plumber labour',
      'Basic PEX or copper supply lines',
      'ABS drain pipes and fittings',
      'Shut-off valves and access panels',
      'Pressure testing',
      'Plumbing permit and inspection',
    ],
    notIncludedInPrice: [
      'Fixtures (faucets, toilets, showers)',
      'Concrete cutting for basement drains',
      'Sewer line camera inspection ($300-$500)',
      'Backflow preventer testing',
      'Exterior excavation for sewer repairs',
      'Hot water recirculation system',
    ],
    costTips: [
      'Install a backwater valve — many GTA cities offer $1,000-$2,500 rebates and it prevents sewer backup.',
      'Switch from rental water heater to owned — rental fees add up to $6,000-$10,000 over the equipment lifetime.',
      'Rough-in all plumbing before closing basement walls — adding a bathroom later costs 2-3x more.',
      'PEX costs 30-40% less than copper and is faster to install — use it for supply lines.',
      'Camera inspect your sewer before buying an older home — $300 can save you from a $15,000 surprise.',
    ],
    requiresEngineering: false,
    projectType: 'general',
  },
  {
    slug: 'handyman',
    title: 'Handyman',
    category: 'Trades',
    startingPrice: 50,
    contingencyPct: 5,
    typicalTimeline: '1-3 days',
    priceRanges: [
      { scope: 'General handyman service', minCAD: 50, maxCAD: 90, unit: 'per hour', labourPct: 85, materialPct: 15 },
      { scope: 'Drywall repair (per patch)', minCAD: 150, maxCAD: 400, unit: 'per patch', labourPct: 70, materialPct: 30 },
      { scope: 'Door/window installation', minCAD: 200, maxCAD: 600, unit: 'per unit', labourPct: 60, materialPct: 40 },
      { scope: 'Deck repair (minor)', minCAD: 500, maxCAD: 1500, unit: 'per project', labourPct: 55, materialPct: 45 },
      { scope: 'Tile repair/replacement', minCAD: 300, maxCAD: 800, unit: 'per area', labourPct: 60, materialPct: 40 },
    ],
    includedInPrice: [
      'Labour (typically hourly rate)',
      'Basic fasteners, screws, nails',
      'Small material quantities',
      'Clean-up and debris removal',
    ],
    notIncludedInPrice: [
      'Specialized materials (tile, flooring, lumber)',
      'Electrical or plumbing work (requires licensed trades)',
      'Structural modifications',
      'Appliance installation (may need specialized installer)',
      'Permits (most handyman work is permit-exempt)',
    ],
    costTips: [
      'Create a punch list and batch small jobs — hourly handyman with a full day of work is cheaper per task.',
      'Handyman rates are $50-$90/hr in the GTA — verify before starting.',
      'For any electrical or plumbing beyond basic fixture swaps, hire a licensed trade.',
      'Get photos and measurements before the visit to reduce on-site assessment time.',
      'Half-day minimum is common — fill the time with multiple small tasks.',
    ],
    requiresEngineering: false,
    projectType: 'general',
  },
  {
    slug: 'hvac',
    title: 'HVAC',
    category: 'Trades',
    startingPrice: 3000,
    contingencyPct: 10,
    typicalTimeline: '1-5 days',
    priceRanges: [
      { scope: 'Furnace replacement (high-efficiency)', minCAD: 3000, maxCAD: 6000, unit: 'per unit', labourPct: 35, materialPct: 65 },
      { scope: 'Central air conditioner', minCAD: 3500, maxCAD: 6500, unit: 'per unit', labourPct: 35, materialPct: 65 },
      { scope: 'Heat pump (cold-climate)', minCAD: 5000, maxCAD: 12000, unit: 'per unit', labourPct: 35, materialPct: 65 },
      { scope: 'Ductwork modification/addition', minCAD: 1500, maxCAD: 4000, unit: 'per zone', labourPct: 55, materialPct: 45 },
      { scope: 'HRV/ERV installation', minCAD: 2500, maxCAD: 5000, unit: 'per unit', labourPct: 40, materialPct: 60 },
      { scope: 'Duct cleaning', minCAD: 300, maxCAD: 600, unit: 'per house', labourPct: 80, materialPct: 20 },
    ],
    includedInPrice: [
      'Equipment (furnace, AC, or heat pump)',
      'Installation labour (TSSA certified)',
      'Basic ductwork connections',
      'Thermostat (programmable or smart)',
      'Gas line connection and testing',
      'Start-up, commissioning, and testing',
      'Permit and inspection',
    ],
    notIncludedInPrice: [
      'Ductwork modifications for new zones',
      'Electrical panel upgrade (if needed for heat pump)',
      'Humidifier or air purifier add-ons',
      'Zoning dampers and controls',
      'Asbestos abatement on old ductwork',
      'Concrete pad for outdoor unit',
    ],
    costTips: [
      'Cold-climate heat pumps qualify for $3,000-$5,000 in provincial rebates — apply before installation.',
      'Replace furnace and AC together to save $1,000-$2,000 on shared installation labour.',
      'High-efficiency furnace (96%+ AFUE) saves $300-$500/year in gas vs a standard 80% furnace.',
      'Schedule HVAC installation in spring or fall — summer and winter are peak seasons with higher prices.',
      'HRV is required by code in new construction — retrofit it during renovation for better air quality.',
    ],
    requiresEngineering: false,
    projectType: 'energy',
  },
  {
    slug: 'insulation',
    title: 'Insulation',
    category: 'Trades',
    startingPrice: 1,
    contingencyPct: 5,
    typicalTimeline: '1-5 days',
    priceRanges: [
      { scope: 'Attic insulation (blown-in)', minCAD: 1, maxCAD: 3, unit: 'per sq ft', labourPct: 50, materialPct: 50 },
      { scope: 'Basement wall insulation (spray foam)', minCAD: 3, maxCAD: 6, unit: 'per sq ft', labourPct: 45, materialPct: 55 },
      { scope: 'Exterior wall insulation (blown-in)', minCAD: 2, maxCAD: 5, unit: 'per sq ft', labourPct: 50, materialPct: 50 },
      { scope: 'Spray foam (closed-cell, 2")', minCAD: 4, maxCAD: 8, unit: 'per sq ft', labourPct: 40, materialPct: 60 },
      { scope: 'Batt insulation (R-20 walls)', minCAD: 1, maxCAD: 2, unit: 'per sq ft', labourPct: 55, materialPct: 45 },
    ],
    includedInPrice: [
      'Insulation material and installation',
      'Air sealing at penetrations',
      'Vapor barrier (where required)',
      'R-value testing and verification',
      'Clean-up and disposal of old insulation',
    ],
    notIncludedInPrice: [
      'Asbestos or vermiculite removal ($3,000-$8,000)',
      'Drywall removal and reinstallation',
      'Electrical or plumbing modifications',
      'Ventilation improvements (soffit vents, ridge vents)',
      'EnerGuide audit ($300-$500, required for rebates)',
    ],
    costTips: [
      'Attic insulation has the best ROI — costs $1-$3/sq ft and saves 20-30% on heating bills.',
      'Get an EnerGuide audit first to qualify for $1,500-$5,000 in provincial energy rebates.',
      'Spray foam is expensive but seals air leaks better than batt — best for basements and rim joists.',
      'Check for vermiculite insulation before disturbing — it may contain asbestos and requires professional removal.',
      'Insulate during renovation when walls are open — adding insulation to finished walls costs 3-4x more.',
    ],
    requiresEngineering: false,
    projectType: 'energy',
  },
  {
    slug: 'drains',
    title: 'Drains',
    category: 'Trades',
    startingPrice: 200,
    contingencyPct: 10,
    typicalTimeline: '1-5 days',
    priceRanges: [
      { scope: 'Drain snaking (standard)', minCAD: 200, maxCAD: 400, unit: 'per service', labourPct: 85, materialPct: 15 },
      { scope: 'Drain camera inspection', minCAD: 300, maxCAD: 500, unit: 'per inspection', labourPct: 80, materialPct: 20 },
      { scope: 'Drain lining (trenchless repair)', minCAD: 4000, maxCAD: 10000, unit: 'per section', labourPct: 45, materialPct: 55 },
      { scope: 'Sewer line replacement (excavation)', minCAD: 5000, maxCAD: 15000, unit: 'per project', labourPct: 55, materialPct: 45 },
      { scope: 'Floor drain installation/replacement', minCAD: 1000, maxCAD: 2500, unit: 'per drain', labourPct: 60, materialPct: 40 },
    ],
    includedInPrice: [
      'Camera inspection with video report',
      'Drain cleaning and snaking',
      'Root cutting (mechanical)',
      'Basic water jetting',
      'Plumbing permit (for replacements)',
    ],
    notIncludedInPrice: [
      'Concrete cutting and restoration',
      'Landscaping restoration after excavation',
      'Backwater valve installation',
      'Catch basin repair on private property',
      'Municipal connection fees',
    ],
    costTips: [
      'Camera inspect before buying an older home — a $300 inspection can reveal $15,000 in sewer problems.',
      'Trenchless drain lining costs more upfront but avoids excavation — saves landscaping and driveway costs.',
      'Regular maintenance snaking ($200-$400/year) prevents $5,000+ emergency calls.',
      'Ask about city rebates for backwater valve installation — many GTA cities cover $1,000-$2,500.',
      'Tree roots are the #1 cause of drain blockages — remove trees within 10 ft of sewer lines.',
    ],
    requiresEngineering: false,
    projectType: 'general',
  },
  {
    slug: 'painting',
    title: 'Painting',
    category: 'Trades',
    startingPrice: 2,
    contingencyPct: 5,
    typicalTimeline: '1-7 days',
    priceRanges: [
      { scope: 'Interior painting (per room, walls + ceiling)', minCAD: 400, maxCAD: 800, unit: 'per room', labourPct: 70, materialPct: 30 },
      { scope: 'Full interior (3-bedroom home)', minCAD: 3000, maxCAD: 6000, unit: 'per project', labourPct: 70, materialPct: 30 },
      { scope: 'Exterior painting (2-storey home)', minCAD: 4000, maxCAD: 8000, unit: 'per project', labourPct: 65, materialPct: 35 },
      { scope: 'Cabinet painting (kitchen)', minCAD: 2500, maxCAD: 5000, unit: 'per kitchen', labourPct: 75, materialPct: 25 },
      { scope: 'Trim and door painting (per door)', minCAD: 100, maxCAD: 200, unit: 'per door', labourPct: 75, materialPct: 25 },
    ],
    includedInPrice: [
      'Surface preparation (sanding, patching, priming)',
      'Two coats of quality paint',
      'Trim, baseboards, and crown moulding',
      'Masking and protection of floors/furniture',
      'Clean-up and touch-ups',
    ],
    notIncludedInPrice: [
      'Wallpaper removal ($2-$4/sq ft)',
      'Lead paint testing and abatement',
      'Drywall repair beyond minor patches',
      'Popcorn ceiling removal ($2-$4/sq ft)',
      'Scaffolding for high ceilings or exteriors',
      'Specialty finishes (faux, textured, metallic)',
    ],
    costTips: [
      'Paint during renovation when rooms are empty — saves 30% on masking and prep time.',
      'Quality paint costs $50-$70/gallon but covers better and lasts 2x longer than budget brands.',
      'Exterior painting before winter saves your siding — peeling paint exposes wood to moisture.',
      'Cabinet painting is half the cost of new cabinets — great ROI if the boxes are in good shape.',
      'Bundle rooms to get volume discount — full-house painting saves 15-20% vs room-by-room pricing.',
    ],
    requiresEngineering: false,
    projectType: 'general',
  },
  {
    slug: 'cleaning',
    title: 'Cleaning',
    category: 'Trades',
    startingPrice: 200,
    contingencyPct: 5,
    typicalTimeline: '1-3 days',
    priceRanges: [
      { scope: 'Post-construction cleaning', minCAD: 500, maxCAD: 1500, unit: 'per project', labourPct: 85, materialPct: 15 },
      { scope: 'Pre-sale deep cleaning', minCAD: 300, maxCAD: 600, unit: 'per house', labourPct: 85, materialPct: 15 },
      { scope: 'Window cleaning (interior + exterior)', minCAD: 200, maxCAD: 500, unit: 'per house', labourPct: 80, materialPct: 20 },
      { scope: 'Duct cleaning', minCAD: 300, maxCAD: 600, unit: 'per house', labourPct: 80, materialPct: 20 },
      { scope: 'Carpet cleaning (per room)', minCAD: 50, maxCAD: 100, unit: 'per room', labourPct: 70, materialPct: 30 },
    ],
    includedInPrice: [
      'Professional cleaning crew and equipment',
      'Cleaning supplies and chemicals',
      'Dust and debris removal',
      'Surface sanitization',
      'Waste disposal',
    ],
    notIncludedInPrice: [
      'Mold remediation (requires specialist)',
      'Hazardous material disposal',
      'Appliance cleaning (oven, fridge interior)',
      'Pressure washing (exterior)',
      'Junk removal and hauling',
    ],
    costTips: [
      'Include post-construction cleaning in your renovation contract — negotiate it as a line item.',
      'Bundle duct cleaning with HVAC installation for a 20-30% discount.',
      'Pre-sale cleaning has 5-10x ROI — a clean home sells faster and at higher price.',
      'Regular maintenance cleaning is cheaper than periodic deep cleans.',
      'Get references specifically for post-construction work — general cleaners often can\'t handle renovation dust.',
    ],
    requiresEngineering: false,
    projectType: 'general',
  },
  // ── Building ────────────────────────────────────────────────
  {
    slug: 'additions',
    title: 'Home Additions',
    category: 'Building',
    startingPrice: 200,
    contingencyPct: 20,
    typicalTimeline: '3-6 months',
    priceRanges: [
      { scope: 'Ground-floor addition (per sq ft, finished)', minCAD: 200, maxCAD: 400, unit: 'per sq ft', labourPct: 55, materialPct: 45 },
      { scope: 'Second-storey addition (per sq ft)', minCAD: 250, maxCAD: 450, unit: 'per sq ft', labourPct: 55, materialPct: 45 },
      { scope: 'Sunroom or 3-season room', minCAD: 20000, maxCAD: 50000, unit: 'per project', labourPct: 50, materialPct: 50 },
      { scope: 'Garage conversion (per sq ft)', minCAD: 100, maxCAD: 200, unit: 'per sq ft', labourPct: 55, materialPct: 45 },
      { scope: 'Architectural + engineering drawings', minCAD: 5000, maxCAD: 15000, unit: 'per project', labourPct: 90, materialPct: 10 },
    ],
    includedInPrice: [
      'Architectural and structural drawings',
      'Building permit and application fees',
      'Foundation (footings, walls, slab)',
      'Framing, roofing, and exterior finishes',
      'Insulation, vapor barrier, and drywall',
      'Electrical rough-in and panel modifications',
      'Plumbing rough-in (if applicable)',
      'HVAC extension to new space',
      'Interior trim, paint, and flooring',
    ],
    notIncludedInPrice: [
      'Kitchen or bathroom fixtures and finishes',
      'Custom cabinetry and millwork',
      'Landscaping restoration',
      'Driveway modifications',
      'Zoning variance or Committee of Adjustment fees',
      'Temporary accommodation during construction',
    ],
    costTips: [
      'Second-storey additions cost more per sq ft but don\'t require new foundation — compare total cost.',
      'Design to municipal setback limits upfront — Committee of Adjustment variances cost $5,000-$15,000.',
      'Coordinate all trades before starting — sequencing errors in additions cascade into weeks of delays.',
      'Include a 20% contingency for additions — hidden conditions in the existing structure always appear.',
      'Permits take 4-12 weeks in the GTA — start the application before finalizing contractor timelines.',
    ],
    requiresEngineering: true,
    projectType: 'general',
  },
  {
    slug: 'basement-second-unit',
    title: 'Basement Second Unit',
    category: 'Building',
    startingPrice: 50000,
    contingencyPct: 20,
    typicalTimeline: '4-8 months',
    priceRanges: [
      { scope: 'Legal basement apartment (complete)', minCAD: 80000, maxCAD: 175000, unit: 'per project', labourPct: 55, materialPct: 45 },
      { scope: 'Budget basement conversion (no lowering)', minCAD: 50000, maxCAD: 80000, unit: 'per project', labourPct: 55, materialPct: 45 },
      { scope: 'Premium basement unit (high-end finishes)', minCAD: 150000, maxCAD: 250000, unit: 'per project', labourPct: 50, materialPct: 50 },
      { scope: 'Underpinning + conversion (combined)', minCAD: 125000, maxCAD: 225000, unit: 'per project', labourPct: 58, materialPct: 42 },
    ],
    includedInPrice: [
      'Building permit and ESA/TSSA inspections',
      'Separate entrance construction',
      'Fire separation (1-hour rated walls and ceiling)',
      'Separate electrical panel and circuits',
      'Kitchen rough-in and finishes',
      'Bathroom (full) with plumbing',
      'Egress windows meeting OBC requirements',
      'HVAC (separate zone or independent system)',
      'Smoke and CO detectors (hard-wired, interconnected)',
      'Insulation and drywall',
      'Flooring, trim, and paint',
    ],
    notIncludedInPrice: [
      'Underpinning (if ceiling height insufficient)',
      'Waterproofing (if moisture issues exist)',
      'Appliances (stove, fridge, dishwasher)',
      'Laundry hookup and washer/dryer',
      'Landscaping for separate entrance',
      'Municipal development charges (some cities)',
      'Zoning compliance review ($500-$2,000)',
    ],
    costTips: [
      'Stack rebates: federal MHRTC ($7,500) + provincial ($40,000 forgivable loan) + CMHC refinancing.',
      'Check ceiling height before committing — 1.95m (6\'5") minimum. Below that means underpinning.',
      'Separate entrance is required by code — plan the location early as it affects exterior costs.',
      'Fire separation is non-negotiable — 1-hour rated assembly between unit and main house.',
      'Rent revenue of $1,500-$2,500/month means payback in 3-7 years depending on build cost.',
    ],
    requiresEngineering: true,
    projectType: 'adu',
  },
  {
    slug: 'roofing',
    title: 'Roofing',
    category: 'Building',
    startingPrice: 5000,
    contingencyPct: 10,
    typicalTimeline: '2-5 days',
    priceRanges: [
      { scope: 'Asphalt shingle re-roof (1,200 sq ft roof)', minCAD: 5000, maxCAD: 10000, unit: 'per project', labourPct: 55, materialPct: 45 },
      { scope: 'Flat roof replacement (modified bitumen)', minCAD: 8000, maxCAD: 15000, unit: 'per project', labourPct: 50, materialPct: 50 },
      { scope: 'Metal roof installation', minCAD: 12000, maxCAD: 25000, unit: 'per project', labourPct: 45, materialPct: 55 },
      { scope: 'Roof repair (leak, shingle replacement)', minCAD: 300, maxCAD: 1500, unit: 'per repair', labourPct: 65, materialPct: 35 },
      { scope: 'Soffit and fascia replacement', minCAD: 2000, maxCAD: 5000, unit: 'per project', labourPct: 55, materialPct: 45 },
    ],
    includedInPrice: [
      'Old shingle removal and disposal',
      'Roof deck inspection and minor repairs',
      'Ice and water shield at eaves and valleys',
      'Synthetic underlayment',
      'Shingle installation with proper nailing',
      'Ridge cap and ventilation',
      'Flashing at walls, chimneys, and vents',
      'Clean-up and debris removal',
    ],
    notIncludedInPrice: [
      'Roof deck replacement (plywood, $2-$4/sq ft)',
      'Structural repairs (rafters, trusses)',
      'Skylight installation or replacement',
      'Gutter and eavestrough replacement',
      'Chimney repair or removal',
      'Attic insulation upgrade',
    ],
    costTips: [
      'Replace roof before it leaks — water damage to attic and structure costs 3-5x the roofing price.',
      'Architectural shingles cost 10-15% more than 3-tab but last 10-15 years longer.',
      'Metal roofing has 50-year lifespan vs 20-25 for asphalt — compare lifecycle cost, not installed cost.',
      'Ice and water shield is required in Ontario — don\'t let contractors skip it at eaves.',
      'Schedule roofing for spring or fall — peak summer demand drives prices up 10-20%.',
    ],
    requiresEngineering: false,
    projectType: 'general',
  },
  {
    slug: 'demolition',
    title: 'Demolition',
    category: 'Building',
    startingPrice: 1000,
    contingencyPct: 15,
    typicalTimeline: '1-10 days',
    priceRanges: [
      { scope: 'Interior strip-out (basement or floor)', minCAD: 2000, maxCAD: 5000, unit: 'per floor', labourPct: 75, materialPct: 25 },
      { scope: 'Kitchen demolition', minCAD: 1000, maxCAD: 3000, unit: 'per kitchen', labourPct: 80, materialPct: 20 },
      { scope: 'Bathroom demolition', minCAD: 800, maxCAD: 2000, unit: 'per bathroom', labourPct: 80, materialPct: 20 },
      { scope: 'Garage demolition (detached)', minCAD: 3000, maxCAD: 8000, unit: 'per structure', labourPct: 65, materialPct: 35 },
      { scope: 'Concrete removal (driveway/slab)', minCAD: 3, maxCAD: 6, unit: 'per sq ft', labourPct: 60, materialPct: 40 },
    ],
    includedInPrice: [
      'Selective demolition and removal',
      'Debris containerization and disposal',
      'Dust containment and protection',
      'Utility disconnection coordination',
      'Basic site clean-up',
    ],
    notIncludedInPrice: [
      'Asbestos testing and abatement ($3,000-$10,000)',
      'Structural shoring during removal',
      'Permit fees for full structure demolition',
      'Hazardous material disposal (lead paint, mold)',
      'Landscaping restoration',
      'Utility reconnection',
    ],
    costTips: [
      'Test for asbestos before demolishing anything built before 1990 — removal is 3-5x more expensive if found mid-project.',
      'Salvage reusable materials (doors, fixtures, trim) — donation receipts provide tax deductions.',
      'Interior demo is often DIY-able — do it yourself and save $2,000-$5,000 in labour.',
      'Rent a dumpster directly ($400-$800) instead of paying contractor disposal markup.',
      'Protect finishes you want to keep — dust from demo penetrates everywhere.',
    ],
    requiresEngineering: false,
    projectType: 'general',
  },
  {
    slug: 'decks',
    title: 'Decks',
    category: 'Building',
    startingPrice: 5000,
    contingencyPct: 10,
    typicalTimeline: '3-10 days',
    priceRanges: [
      { scope: 'Pressure-treated wood deck (200 sq ft)', minCAD: 5000, maxCAD: 10000, unit: 'per project', labourPct: 50, materialPct: 50 },
      { scope: 'Composite deck (200 sq ft)', minCAD: 10000, maxCAD: 20000, unit: 'per project', labourPct: 45, materialPct: 55 },
      { scope: 'Cedar deck (200 sq ft)', minCAD: 8000, maxCAD: 15000, unit: 'per project', labourPct: 50, materialPct: 50 },
      { scope: 'Deck repair/re-decking', minCAD: 2000, maxCAD: 6000, unit: 'per project', labourPct: 55, materialPct: 45 },
      { scope: 'Railing installation', minCAD: 50, maxCAD: 150, unit: 'per lin. ft', labourPct: 50, materialPct: 50 },
      { scope: 'Small deck 8×10 (80 sq ft)', minCAD: 2500, maxCAD: 5000, unit: 'per project', labourPct: 45, materialPct: 55 },
      { scope: 'Multi-level deck (300+ sq ft)', minCAD: 18000, maxCAD: 40000, unit: 'per project', labourPct: 50, materialPct: 50 },
      { scope: 'Rooftop/balcony deck', minCAD: 15000, maxCAD: 35000, unit: 'per project', labourPct: 55, materialPct: 45 },
      { scope: 'Deck with built-in features (benches, planters, lighting)', minCAD: 12000, maxCAD: 30000, unit: 'per project', labourPct: 50, materialPct: 50 },
      { scope: 'Hot tub deck pad (reinforced)', minCAD: 3500, maxCAD: 8000, unit: 'per project', labourPct: 55, materialPct: 45 },
      { scope: 'Deck staining/sealing (annual)', minCAD: 400, maxCAD: 1200, unit: 'per project', labourPct: 60, materialPct: 40 },
    ],
    includedInPrice: [
      'Concrete footings (below frost depth)',
      'Post and beam structure',
      'Deck boards and fasteners',
      'Railing and stairs',
      'Building permit',
      'Ledger board flashing',
    ],
    notIncludedInPrice: [
      'Outdoor electrical (lighting, outlets)',
      'Pergola or shade structure',
      'Built-in benches or planters',
      'Hot tub pad and wiring',
      'Old deck removal ($1,000-$3,000)',
      'Privacy screens and wind barriers',
    ],
    costTips: [
      'Composite costs 2x upfront but needs no staining/sealing — breaks even at year 8-10.',
      'Footings must go below frost line (4 ft in Southern Ontario) — shallow footings heave and crack.',
      'Pressure-treated needs annual staining ($500-$1,000) — factor maintenance into lifecycle cost.',
      'A permit is required for any deck over 2 ft above grade or over 100 sq ft in most GTA municipalities.',
      'Build during fall for 10-15% off peak-season spring/summer pricing.',
      'Toronto frost depth requires footings at minimum 4 feet (1.2m) below grade with sonotubes — mandatory inspection before concrete pour.',
      'Toronto building permit for decks costs $350-$600 with 2-4 week approval and mandatory footing + final inspections.',
      'Ravine lot decks require TRCA environmental review adding $2,000-$5,000 and 8-12 weeks — check trca.ca before planning.',
      'Composite saves $800-$1,500 in maintenance over 20 years vs pressure-treated wood requiring biennial staining.',
      'Deck cost per square foot decreases with size: 100 sq ft runs $60-$80/sq ft while 300 sq ft drops to $45-$65/sq ft.',
    ],
    requiresEngineering: false,
    projectType: 'general',
  },
  // ── Professional ────────────────────────────────────────────
  {
    slug: 'general-contractor',
    title: 'General Contractor',
    category: 'Professional',
    startingPrice: 10000,
    contingencyPct: 15,
    typicalTimeline: '2-26 weeks',
    priceRanges: [
      { scope: 'GC management fee (% of project cost)', minCAD: 15, maxCAD: 25, unit: '% of project', labourPct: 95, materialPct: 5 },
      { scope: 'Small renovation ($20K-$50K)', minCAD: 3000, maxCAD: 12500, unit: 'GC fee', labourPct: 95, materialPct: 5 },
      { scope: 'Medium renovation ($50K-$150K)', minCAD: 7500, maxCAD: 37500, unit: 'GC fee', labourPct: 95, materialPct: 5 },
      { scope: 'Major renovation ($150K-$500K)', minCAD: 22500, maxCAD: 125000, unit: 'GC fee', labourPct: 95, materialPct: 5 },
    ],
    includedInPrice: [
      'Project scheduling and coordination',
      'Trade contractor procurement and management',
      'Material ordering and delivery coordination',
      'Building permit management',
      'Quality control and inspections',
      'Client communication and reporting',
      'Site safety and insurance',
    ],
    notIncludedInPrice: [
      'Trade contractor costs (billed separately)',
      'Material costs (billed at cost or cost-plus)',
      'Architectural and engineering fees',
      'Permit application fees',
      'Financing costs',
      'Furniture, appliances, and decor',
    ],
    costTips: [
      'GC markup of 15-25% is standard — compare net cost, not just the management fee.',
      'Fixed-price contracts protect you from overruns — cost-plus contracts give the GC less incentive to control costs.',
      'Ask for a detailed payment schedule tied to milestones, not time — pay for completed work.',
      'A good GC saves you money through trade coordination — poor sequencing wastes thousands in idle labour.',
      'Verify WSIB clearance, liability insurance ($2M minimum), and at least 3 recent references.',
    ],
    requiresEngineering: false,
    projectType: 'general',
  },
  {
    slug: 'project-management',
    title: 'Project Management',
    category: 'Professional',
    startingPrice: 5000,
    contingencyPct: 10,
    typicalTimeline: '4-26 weeks',
    priceRanges: [
      { scope: 'PM fee (% of construction cost)', minCAD: 5, maxCAD: 15, unit: '% of project', labourPct: 95, materialPct: 5 },
      { scope: 'Hourly PM consulting', minCAD: 75, maxCAD: 150, unit: 'per hour', labourPct: 95, materialPct: 5 },
      { scope: 'Owner\'s representative (full project)', minCAD: 5000, maxCAD: 25000, unit: 'per project', labourPct: 95, materialPct: 5 },
    ],
    includedInPrice: [
      'Project planning and scheduling',
      'Budget management and cost tracking',
      'Contractor coordination and oversight',
      'Regular site visits and inspections',
      'Progress reports and documentation',
      'Change order management',
    ],
    notIncludedInPrice: [
      'Construction costs',
      'Design and engineering fees',
      'Permit fees',
      'Materials and equipment',
      'Legal or dispute resolution costs',
    ],
    costTips: [
      'PM saves 10-15% on construction costs through better coordination — the fee often pays for itself.',
      'Hire PM for projects over $100K where multiple trades must be coordinated.',
      'Owner\'s rep is cheaper than full PM — they represent your interests without managing daily work.',
      'Hourly PM consulting is cost-effective for smaller projects where you manage day-to-day.',
      'Ensure your PM has construction experience, not just administrative project management skills.',
    ],
    requiresEngineering: false,
    projectType: 'general',
  },
  {
    slug: 'building-permit',
    title: 'Building Permits',
    category: 'Professional',
    startingPrice: 200,
    contingencyPct: 5,
    typicalTimeline: '2-12 weeks',
    priceRanges: [
      { scope: 'Minor building permit (interior renovation)', minCAD: 200, maxCAD: 800, unit: 'per permit', labourPct: 90, materialPct: 10 },
      { scope: 'Standard building permit (addition, basement)', minCAD: 800, maxCAD: 3000, unit: 'per permit', labourPct: 85, materialPct: 15 },
      { scope: 'Permit expediting service', minCAD: 1500, maxCAD: 5000, unit: 'per project', labourPct: 95, materialPct: 5 },
      { scope: 'Committee of Adjustment application', minCAD: 3000, maxCAD: 8000, unit: 'per application', labourPct: 85, materialPct: 15 },
      { scope: 'Zoning compliance review', minCAD: 500, maxCAD: 2000, unit: 'per review', labourPct: 90, materialPct: 10 },
    ],
    includedInPrice: [
      'Application preparation and submission',
      'Drawing review and coordination',
      'Municipal fee payment',
      'Revision management',
      'Inspection scheduling',
    ],
    notIncludedInPrice: [
      'Architectural drawings (separate fee)',
      'Engineering stamps and reviews',
      'Site plan preparation',
      'Legal fees for variances or appeals',
      'Development charges (city-specific)',
    ],
    costTips: [
      'Apply early — GTA permit wait times are 4-12 weeks depending on municipality and complexity.',
      'Complete applications get processed faster — incomplete submissions restart the clock.',
      'Permit expediting services cost $1,500-$5,000 but can save weeks of construction delays.',
      'Some minor work (painting, flooring, fixtures) doesn\'t require a permit — check before paying.',
      'Keep all permit documents — you\'ll need them when selling the property.',
    ],
    requiresEngineering: false,
    projectType: 'general',
  },
  {
    slug: 'drafting',
    title: 'Drafting',
    category: 'Professional',
    startingPrice: 1500,
    contingencyPct: 5,
    typicalTimeline: '2-6 weeks',
    priceRanges: [
      { scope: 'Basement renovation drawings', minCAD: 1500, maxCAD: 3500, unit: 'per project', labourPct: 95, materialPct: 5 },
      { scope: 'Addition/extension drawings', minCAD: 3000, maxCAD: 8000, unit: 'per project', labourPct: 95, materialPct: 5 },
      { scope: 'Full house design (architectural)', minCAD: 8000, maxCAD: 20000, unit: 'per project', labourPct: 95, materialPct: 5 },
      { scope: 'As-built drawings', minCAD: 1000, maxCAD: 3000, unit: 'per project', labourPct: 95, materialPct: 5 },
      { scope: 'Structural engineering drawings', minCAD: 2000, maxCAD: 6000, unit: 'per project', labourPct: 95, materialPct: 5 },
    ],
    includedInPrice: [
      'Site measurement and documentation',
      'Floor plans and elevations',
      'Building code review (OBC compliance)',
      'Municipal submission package',
      'One round of revisions',
    ],
    notIncludedInPrice: [
      'Structural engineering stamp (P.Eng)',
      'Interior design and 3D rendering',
      'Landscape architecture',
      'Additional revision rounds ($200-$500 each)',
      'Permit application fees',
      'Site survey ($1,000-$2,500)',
    ],
    costTips: [
      'BCIN designer costs 30-50% less than a full architect for permit drawings — same legal authority for Part 9 buildings.',
      'Get a site survey before starting design — assumptions about lot size create expensive redesigns.',
      'Provide a clear wish list before the first meeting — design changes after drawings start cost $200-$500 per round.',
      'Ask for digital files (DWG/PDF) — you\'ll need them for contractor bidding and permit applications.',
      'Structural drawings are separate from architectural — budget for both on additions and underpinning.',
    ],
    requiresEngineering: false,
    projectType: 'general',
  },
  {
    slug: 'estimating',
    title: 'Estimating',
    category: 'Professional',
    startingPrice: 500,
    contingencyPct: 5,
    typicalTimeline: '1-3 weeks',
    priceRanges: [
      { scope: 'Renovation estimate (single trade)', minCAD: 500, maxCAD: 1500, unit: 'per estimate', labourPct: 95, materialPct: 5 },
      { scope: 'Full project estimate (multi-trade)', minCAD: 1500, maxCAD: 5000, unit: 'per estimate', labourPct: 95, materialPct: 5 },
      { scope: 'Quantity surveying (QS)', minCAD: 2000, maxCAD: 8000, unit: 'per project', labourPct: 95, materialPct: 5 },
      { scope: 'Insurance claim estimate', minCAD: 500, maxCAD: 2000, unit: 'per claim', labourPct: 95, materialPct: 5 },
    ],
    includedInPrice: [
      'Site visit and measurement',
      'Material quantity take-offs',
      'Labour hour calculations',
      'Subcontractor pricing',
      'Detailed cost breakdown report',
    ],
    notIncludedInPrice: [
      'Design or engineering services',
      'Multiple revision rounds',
      'Ongoing cost monitoring during construction',
      'Arbitration or dispute support',
    ],
    costTips: [
      'Professional estimates cost $500-$5,000 but save 10-20% by catching scope gaps before construction starts.',
      'Free contractor estimates are valuable but biased — independent QS gives you leverage in negotiations.',
      'Itemized estimates expose markup — compare line by line, not just bottom-line totals.',
      'For projects over $100K, a QS estimate pays for itself by identifying $10K-$30K in scope gaps.',
      'Keep your estimate as a baseline — compare actual costs against it to catch budget creep early.',
    ],
    requiresEngineering: false,
    projectType: 'general',
  },
  {
    slug: 'equipment-rental',
    title: 'Equipment Rental',
    category: 'Professional',
    startingPrice: 150,
    contingencyPct: 5,
    typicalTimeline: '1 day – 4 weeks',
    priceRanges: [
      { scope: 'Mini excavator (1-3 ton)', minCAD: 300, maxCAD: 600, unit: 'per day', labourPct: 30, materialPct: 70 },
      { scope: 'Skid steer loader', minCAD: 250, maxCAD: 500, unit: 'per day', labourPct: 30, materialPct: 70 },
      { scope: 'Concrete pump (line pump)', minCAD: 600, maxCAD: 1200, unit: 'per pour', labourPct: 40, materialPct: 60 },
      { scope: 'Scaffolding (per section/week)', minCAD: 150, maxCAD: 400, unit: 'per week', labourPct: 35, materialPct: 65 },
      { scope: 'Dumpster bin (14-20 yard)', minCAD: 400, maxCAD: 800, unit: 'per load', labourPct: 30, materialPct: 70 },
    ],
    includedInPrice: [
      'Equipment delivery and pickup',
      'Operator (for operated rental)',
      'Fuel (for operated rental)',
      'Basic safety equipment',
      'Insurance coverage (rental company)',
    ],
    notIncludedInPrice: [
      'Fuel (for bare rental)',
      'Operator wages (for bare rental)',
      'Damage deposits and waivers',
      'Extended rental fees',
      'Specialized attachments (hydraulic breaker, auger)',
      'Traffic control or road closure permits',
    ],
    costTips: [
      'Weekly rates are typically 3x daily — rent weekly for projects lasting 4+ days.',
      'Operated rental costs more but eliminates your liability and equipment damage risk.',
      'Coordinate deliveries to minimize mobilization fees — have all equipment arrive on the same day.',
      'Compare rental vs contractor with own equipment — sometimes the contractor rate is cheaper overall.',
      'Book equipment 1-2 weeks ahead during busy season (May-October) — last-minute availability is limited.',
    ],
    requiresEngineering: false,
    projectType: 'general',
  },
];

// ---------------------------------------------------------------------------
// Helpers: look up service cost data
// ---------------------------------------------------------------------------
export function getServiceCostBySlug(slug: string): ServiceCostData | undefined {
  return serviceCosts.find((s) => s.slug === slug);
}

export function getServiceCostsByCategory(category: string): ServiceCostData[] {
  return serviceCosts.filter((s) => s.category === category);
}

export const costCategories = ['Structural', 'Trades', 'Building', 'Professional'] as const;

// ---------------------------------------------------------------------------
// City-specific FAQ generator
// ---------------------------------------------------------------------------
export function generateCityFaqs(
  service: ServiceCostData,
  city: CityMultiplier,
): { q: string; a: string }[] {
  const baseRange = service.priceRanges[0];
  if (!baseRange) return [];
  const adjusted = getCityAdjustedPrice(
    baseRange.minCAD,
    baseRange.maxCAD,
    baseRange.labourPct,
    baseRange.materialPct,
    city,
  );

  const faqs: { q: string; a: string }[] = [
    {
      q: `How much does ${service.title.toLowerCase()} cost in ${city.name}?`,
      a: `${service.title} in ${city.name} typically starts at ${formatPrice(adjusted.min)} and ranges up to ${formatPrice(adjusted.max)} ${baseRange.unit}. ${city.name} prices are ${city.overall > 1 ? `${Math.round((city.overall - 1) * 100)}% above` : city.overall < 1 ? `${Math.round((1 - city.overall) * 100)}% below` : 'at'} the Ontario baseline due to ${city.overall >= 1 ? 'higher demand and labour costs' : 'competitive contractor availability'} in ${city.region}.`,
    },
    {
      q: `Do I need a permit for ${service.title.toLowerCase()} in ${city.name}?`,
      a: `Permit requirements for ${service.title.toLowerCase()} in ${city.name} follow ${city.region} guidelines. ${city.permitFeeNote || 'Contact your local building department for specific fee schedules.'}`,
    },
    {
      q: `How long does ${service.title.toLowerCase()} take in ${city.name}?`,
      a: `${service.title} in ${city.name} typically takes ${service.typicalTimeline}. ${city.name} project timelines can be affected by ${city.region} permit processing times (typically 2-8 weeks) and seasonal demand. Plan ahead for spring and summer, when contractor availability is tighter.`,
    },
    {
      q: `Is ${service.title.toLowerCase()} cheaper in ${city.name} than Toronto?`,
      a: city.slug === 'toronto'
        ? `Toronto is the baseline for Ontario renovation pricing. Prices here reflect the highest labour costs in the GTA, but also the widest selection of experienced contractors and specialists.`
        : `Yes, ${service.title.toLowerCase()} in ${city.name} is typically ${city.overall < 1 ? `${Math.round((1 - city.overall) * 100)}% less` : `${Math.round((city.overall - 1) * 100)}% more`} than Toronto. Labour rates in ${city.region} are ${city.labour < 1 ? 'lower' : 'higher'} and material costs are ${city.material < 1 ? 'slightly lower' : 'comparable'}, making ${city.name} ${city.overall < 1 ? 'a more affordable option' : 'a premium market'} for renovation work.`,
    },
    {
      q: `What should I budget for ${service.title.toLowerCase()} contingency in ${city.name}?`,
      a: `We recommend a ${service.contingencyPct}% contingency on top of your ${service.title.toLowerCase()} estimate in ${city.name}. This covers unexpected conditions like hidden water damage, structural issues, or material price changes. For a project estimated at ${formatPrice(adjusted.max)}, set aside an additional ${formatPrice(Math.round(adjusted.max * service.contingencyPct / 100))}.`,
    },
  ];

  return faqs;
}

// ---------------------------------------------------------------------------
// All valid slugs for generateStaticParams
// ---------------------------------------------------------------------------
export function getAllCostParams(): { service: string; city: string }[] {
  return serviceCosts.flatMap((s) =>
    cityMultipliers.map((c) => ({ service: s.slug, city: c.slug })),
  );
}

export function getAllServiceSlugs(): string[] {
  return serviceCosts.map((s) => s.slug);
}

export function getAllCitySlugs(): string[] {
  return cityMultipliers.map((c) => c.slug);
}
