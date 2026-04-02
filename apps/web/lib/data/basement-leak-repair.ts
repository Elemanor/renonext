/**
 * Basement Leak Repair Data — City-Specific Landing Pages
 *
 * SEO landing pages targeting "basement leak repair [city]" keywords.
 * Uses city multipliers from costs.ts for price adjustments.
 * Features DrySpace Waterproofing as the primary contractor.
 */

import {
  cityMultipliers,
  getCityBySlug,
  getCityAdjustedPrice,
  type CityMultiplier,
} from './costs';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface WarningSigns {
  icon: string;
  title: string;
  description: string;
  severity: 'urgent' | 'moderate' | 'monitor';
}

export interface RepairMethod {
  id: string;
  name: string;
  bestFor: string;
  basePriceMin: number;
  basePriceMax: number;
  unit: string;
  labourPct: number;
  materialPct: number;
  timeline: string;
  effectiveness: string;
  process: string[];
}

export interface DiagnosisStep {
  step: number;
  title: string;
  description: string;
  tools: string[];
}

export interface PreventionCategory {
  category: string;
  icon: string;
  tips: { task: string; frequency: string }[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface CityLeakRepairData {
  slug: string;
  city: string;
  region: string;
  metaTitle: string;
  metaDescription: string;
  heroTagline: string;
  cityContext: string;
  commonCauses: string[];
  seasonalRisks: string;
  rebateInfo: string;
  faqs: FAQ[];
  nearbyCities: string[];
}

// ---------------------------------------------------------------------------
// Shared — Warning Signs (8 signs)
// ---------------------------------------------------------------------------
export const warningSignsData: WarningSigns[] = [
  { icon: 'water_drop', title: 'Water Stains or Puddles', description: 'Visible water marks on walls or pooling water on the floor after rain. Active water infiltration requires immediate attention to prevent mold and structural damage.', severity: 'urgent' },
  { icon: 'air', title: 'Musty or Damp Smell', description: 'A persistent musty odour indicates hidden moisture and potential mold growth. Even without visible water, this smell means your basement has a moisture problem.', severity: 'moderate' },
  { icon: 'texture', title: 'White Mineral Deposits (Efflorescence)', description: 'White, chalky deposits on concrete or block walls — salt residue left when water passes through the foundation and evaporates. Proof that water is moving through your walls.', severity: 'moderate' },
  { icon: 'format_paint', title: 'Peeling Paint or Bubbling Walls', description: 'Paint peeling, wallpaper bubbling, or drywall softening — all signs of moisture trapped behind the surface. The wall is absorbing water from the foundation.', severity: 'moderate' },
  { icon: 'vertical_split', title: 'Foundation Cracks', description: 'Horizontal cracks suggest hydrostatic pressure. Vertical cracks may indicate settling. Stair-step cracks in block walls signal structural movement. All can admit water.', severity: 'urgent' },
  { icon: 'mold', title: 'Visible Mold Growth', description: 'Black, green, or white mold colonies on walls, floors, or stored items. Mold requires moisture to grow — its presence confirms an active water problem that must be fixed.', severity: 'urgent' },
  { icon: 'carpenter', title: 'Sticking Doors or Windows', description: 'Doors and windows that suddenly become difficult to open or close may indicate foundation movement caused by water-saturated soil shifting against your walls.', severity: 'monitor' },
  { icon: 'bug_report', title: 'Insects or Pests', description: 'Silverfish, centipedes, earwigs, and other moisture-loving insects in the basement indicate damp conditions that attract pests seeking humid environments.', severity: 'monitor' },
];

// ---------------------------------------------------------------------------
// Shared — Repair Methods (6 methods)
// ---------------------------------------------------------------------------
export const repairMethods: RepairMethod[] = [
  {
    id: 'crack-injection',
    name: 'Crack Injection (Epoxy/Polyurethane)',
    bestFor: 'Single cracks in poured concrete walls',
    basePriceMin: 250,
    basePriceMax: 640,
    unit: 'per linear foot',
    labourPct: 70,
    materialPct: 30,
    timeline: '1–2 hours per crack',
    effectiveness: '95%+ for individual cracks',
    process: [
      'Clean and prepare the crack surface',
      'Install injection ports along the crack length',
      'Inject epoxy (structural) or polyurethane (flexible) resin',
      'Resin expands to fill the full depth of the crack',
      'Remove ports and smooth the surface',
    ],
  },
  {
    id: 'interior-drain',
    name: 'Interior Drainage System (Weeping Tile)',
    bestFor: 'Widespread water seepage, floor-wall joint leaks',
    basePriceMin: 70,
    basePriceMax: 240,
    unit: 'per linear foot',
    labourPct: 65,
    materialPct: 35,
    timeline: '3–5 days',
    effectiveness: '98%+ for managing hydrostatic pressure',
    process: [
      'Break and remove concrete floor along the perimeter (12–18 inches)',
      'Excavate trench to below footing level',
      'Install perforated drainage pipe (weeping tile) in gravel bed',
      'Connect drainage to sump pit with pump',
      'Apply dimpled membrane on interior wall face',
      'Pour new concrete floor over the drainage channel',
    ],
  },
  {
    id: 'exterior-waterproofing',
    name: 'Exterior Waterproofing',
    bestFor: 'Severe water infiltration, old or deteriorated foundation',
    basePriceMin: 100,
    basePriceMax: 300,
    unit: 'per linear foot',
    labourPct: 55,
    materialPct: 45,
    timeline: '5–10 days',
    effectiveness: '99%+ — the gold standard',
    process: [
      'Excavate soil around the foundation to the footing',
      'Clean and inspect the foundation wall',
      'Apply waterproof membrane (rubberized asphalt or spray-applied)',
      'Install drainage board and filter fabric',
      'Replace or install exterior weeping tile',
      'Backfill with clean gravel and restore grade',
    ],
  },
  {
    id: 'sump-pump',
    name: 'Sump Pump Installation',
    bestFor: 'High water table, recurring flooding',
    basePriceMin: 600,
    basePriceMax: 3500,
    unit: 'per unit',
    labourPct: 60,
    materialPct: 40,
    timeline: '1–2 days',
    effectiveness: '90%+ when combined with drainage',
    process: [
      'Break concrete floor and excavate sump pit (24" × 24" × 30" deep)',
      'Install sump liner with gravel base',
      'Place primary pump (1/3 HP minimum for residential)',
      'Install check valve and discharge pipe',
      'Route discharge away from foundation (minimum 6 feet)',
      'Optional: install battery backup pump for power outages',
    ],
  },
  {
    id: 'backwater-valve',
    name: 'Backwater Valve Installation',
    bestFor: 'Sewer backup prevention during heavy storms',
    basePriceMin: 1800,
    basePriceMax: 3200,
    unit: 'per unit',
    labourPct: 65,
    materialPct: 35,
    timeline: '1 day',
    effectiveness: '99% for sewer backup prevention',
    process: [
      'Locate the main sewer line inside the basement',
      'Break concrete floor to expose the sewer pipe',
      'Cut the pipe and install the backwater valve',
      'Test valve operation and ensure proper seal',
      'Patch concrete and clean up',
      'Schedule municipal inspection (required for rebates)',
    ],
  },
  {
    id: 'wall-membrane',
    name: 'Interior Wall Membrane System',
    bestFor: 'Block wall seepage, general dampness',
    basePriceMin: 40,
    basePriceMax: 80,
    unit: 'per linear foot',
    labourPct: 60,
    materialPct: 40,
    timeline: '2–3 days',
    effectiveness: '85%+ for managing wall moisture',
    process: [
      'Clean and prepare interior wall surface',
      'Install dimpled drainage membrane on wall face',
      'Seal membrane edges and penetrations',
      'Route collected water to interior drain or sump',
      'Optional: install dehumidifier for residual moisture',
    ],
  },
];

// ---------------------------------------------------------------------------
// Shared — Diagnosis Steps
// ---------------------------------------------------------------------------
export const diagnosisSteps: DiagnosisStep[] = [
  {
    step: 1,
    title: 'Identify the Water Source',
    description: 'Determine whether water is entering through walls, floor, floor-wall joint, or window wells. Use the foil test: tape a 12" square of aluminum foil to the wall. After 24 hours, check if moisture is on the room side (condensation) or wall side (infiltration).',
    tools: ['Aluminum foil', 'Tape', 'Flashlight', 'Moisture meter'],
  },
  {
    step: 2,
    title: 'Inspect Exterior Drainage',
    description: 'Walk around the outside during or after rain. Check if gutters are overflowing, downspouts discharge too close to the foundation, or the grading slopes toward the house. Most basement leaks start with poor exterior water management.',
    tools: ['Level', 'Measuring tape', 'Garden hose (for testing)'],
  },
  {
    step: 3,
    title: 'Assess Foundation Condition',
    description: 'Examine foundation walls for cracks, deterioration, or bowing. Measure crack width — hairline cracks (<1/16") are cosmetic, but wider cracks may be structural. Note if cracks are horizontal (hydrostatic pressure) or vertical (settling).',
    tools: ['Crack gauge card', 'Flashlight', 'Camera for documentation'],
  },
];

// ---------------------------------------------------------------------------
// Shared — Prevention Tips
// ---------------------------------------------------------------------------
export const preventionTips: PreventionCategory[] = [
  {
    category: 'Exterior Drainage',
    icon: 'roofing',
    tips: [
      { task: 'Clean gutters and downspouts', frequency: 'Twice yearly (spring & fall)' },
      { task: 'Extend downspouts 6+ feet from foundation', frequency: 'Check annually' },
      { task: 'Maintain positive grading away from house', frequency: 'Check annually' },
      { task: 'Clear window wells of debris', frequency: 'Quarterly' },
    ],
  },
  {
    category: 'Interior Inspection',
    icon: 'search',
    tips: [
      { task: 'Check for new cracks or crack growth', frequency: 'Monthly' },
      { task: 'Look for water stains or efflorescence', frequency: 'After heavy rain' },
      { task: 'Monitor basement humidity (keep below 60%)', frequency: 'Weekly in summer' },
      { task: 'Inspect stored items for mold or dampness', frequency: 'Quarterly' },
    ],
  },
  {
    category: 'Sump Pump Maintenance',
    icon: 'plumbing',
    tips: [
      { task: 'Test sump pump by pouring water into pit', frequency: 'Quarterly' },
      { task: 'Test battery backup system', frequency: 'Every 6 months' },
      { task: 'Clean sump pit of debris', frequency: 'Annually' },
      { task: 'Replace sump pump', frequency: 'Every 7–10 years' },
    ],
  },
  {
    category: 'Seasonal Preparation',
    icon: 'calendar_month',
    tips: [
      { task: 'Inspect and repair caulking around windows and vents', frequency: 'Before winter' },
      { task: 'Ensure outdoor taps are winterized', frequency: 'Before first frost' },
      { task: 'Clear snow and ice from foundation perimeter', frequency: 'During winter thaw' },
      { task: 'Run dehumidifier during humid months', frequency: 'May–September' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Shared — Rebate Programs Data
// ---------------------------------------------------------------------------
export const rebateProgramsData = {
  title: 'GTA Basement Leak Prevention Rebates',
  programs: [
    { municipality: 'City of Toronto', amount: 'Up to $3,400', details: 'Backwater valve (up to $1,250), sump pump (up to $1,750), pipe severance/capping (up to $400). Apply through 311 Toronto.' },
    { municipality: 'Region of Peel', amount: 'Up to $2,800', details: 'Backwater valve installation subsidy. Covers Mississauga, Brampton, and Caledon. Apply through Region of Peel.' },
    { municipality: 'City of Hamilton', amount: 'Up to $2,750', details: 'Backwater valve and sump pump through the Protective Plumbing Program. Apply through Hamilton Water Division.' },
    { municipality: 'York Region', amount: 'Varies', details: 'Basement flooding prevention subsidies — varies by municipality (Vaughan, Markham, Richmond Hill, Aurora). Contact your local municipality.' },
    { municipality: 'Durham Region', amount: 'Varies', details: 'Periodic backwater valve and sump pump subsidies for Ajax, Pickering, Whitby, Oshawa. Contact Durham Region.' },
    { municipality: 'Halton Region', amount: 'Varies', details: 'Stormwater management programs for Oakville, Burlington, Milton. Contact Halton Region or your municipality.' },
  ],
};

// ---------------------------------------------------------------------------
// City-specific data
// ---------------------------------------------------------------------------
const cityData: CityLeakRepairData[] = [
  {
    slug: 'toronto',
    city: 'Toronto',
    region: 'City of Toronto',
    metaTitle: 'Basement Leak Repair Toronto 2026 | Fix Leaky Basement Costs',
    metaDescription: 'Toronto basement leak repair from $250/crack injection to $35,000 exterior waterproofing. Warning signs, repair methods, costs, and DrySpace Waterproofing — verified on RenoNext.',
    heroTagline: 'Toronto\'s clay soil and aging housing stock make basement leaks one of the most common — and most urgent — home repair needs in the city.',
    cityContext: 'Toronto sits on heavy clay soil that retains moisture and expands when wet, creating hydrostatic pressure against foundation walls. Pre-1960s homes in areas like the Danforth, Leslieville, High Park, and the Beaches are especially vulnerable due to aging weeping tile, deteriorating foundation waterproofing, and original clay sewer connections.',
    commonCauses: [
      'Heavy clay soil retaining moisture and creating hydrostatic pressure',
      'Aging weeping tile (pre-1970s homes) becoming clogged or collapsed',
      'Original tar-based waterproofing deteriorating after 30+ years',
      'Combined sewer system causing backup during heavy rainfall',
      'Poor grading and drainage around older homes',
    ],
    seasonalRisks: 'Toronto\'s peak leak season runs from March to May during spring snowmelt, and again in September–October during fall storms. The spring thaw is particularly risky — frozen ground prevents meltwater from absorbing into the soil, directing it against foundations. Summer thunderstorms (June–August) can overwhelm the city\'s combined sewer system, causing sewer backup in low-lying neighbourhoods.',
    rebateInfo: 'Toronto offers up to $3,400 through the Basement Flooding Protection Subsidy: backwater valve ($1,250), sump pump ($1,750), and pipe severance ($400). Apply through 311 Toronto.',
    faqs: [
      { question: 'Why does my Toronto basement leak after rain?', answer: 'Toronto\'s clay soil retains water and creates hydrostatic pressure against your foundation. When it rains, water saturates the soil around your home and pushes through cracks, the floor-wall joint, or deteriorated waterproofing.' },
      { question: 'How much does basement leak repair cost in Toronto?', answer: 'Costs range from $250–$640 per linear foot for crack injection to $100–$300 per linear foot for exterior waterproofing. A typical Toronto home costs $4,000–$8,000 for interior solutions or $15,000–$35,000 for exterior waterproofing.' },
      { question: 'Do I need interior or exterior waterproofing?', answer: 'Interior solutions (drainage + sump pump) manage water that enters. Exterior waterproofing stops water from reaching the foundation. For best results on older Toronto homes, a combination approach is often recommended.' },
      { question: 'How long does basement leak repair take?', answer: 'Crack injection: 1–2 hours. Interior drainage system: 3–5 days. Exterior waterproofing: 5–10 days. Most repairs cause minimal disruption to daily life.' },
      { question: 'Will my Toronto home insurance cover a basement leak?', answer: 'Most policies cover sudden water damage (burst pipe) but not gradual seepage or foundation leaks. Sewer backup coverage is usually an add-on. Installing a backwater valve may reduce your premium.' },
      { question: 'What rebates are available in Toronto?', answer: 'The City of Toronto offers up to $3,400 through the Basement Flooding Protection Subsidy for backwater valves, sump pumps, and pipe severance. A plumbing permit is required to qualify.' },
      { question: 'Can I fix a basement leak myself?', answer: 'Minor efflorescence can be cleaned, and exterior grading can be improved as DIY projects. However, crack injection, drainage systems, and waterproofing require professional equipment and expertise for lasting results.' },
      { question: 'How do I prevent basement leaks in Toronto?', answer: 'Maintain gutters and downspouts, ensure positive grading, test your sump pump quarterly, install a backwater valve, and run a dehumidifier in summer. Address small cracks before they grow.' },
      { question: 'Is basement waterproofing worth it in Toronto?', answer: 'Absolutely. Untreated water damage leads to mold, structural deterioration, and lost property value. Waterproofing protects a home worth $800K–$2M+ for a fraction of that investment.' },
      { question: 'How do I find a reliable leak repair contractor in Toronto?', answer: 'Look for licensed, insured waterproofing specialists with a track record of foundation work. RenoNext verifies all contractors and holds payments in escrow until work is GPS-verified complete.' },
    ],
    nearbyCities: ['mississauga', 'vaughan', 'markham', 'pickering'],
  },
  {
    slug: 'mississauga',
    city: 'Mississauga',
    region: 'Peel Region',
    metaTitle: 'Basement Leak Repair Mississauga 2026 | Fix Leaky Basement',
    metaDescription: 'Mississauga basement leak repair from $238/crack to $28,500 exterior waterproofing. 5% less than Toronto. Warning signs, repair methods, and verified contractors.',
    heroTagline: 'Mississauga homes near the Credit River and Lake Ontario face unique water challenges — here\'s how to fix and prevent basement leaks.',
    cityContext: 'Mississauga\'s varied topography — from lakeside Port Credit to the Credit River valley — creates different leak patterns across the city. Older homes in Streetsville and Cooksville face aging infrastructure issues, while newer developments may have settlement cracks from rapid construction.',
    commonCauses: [
      'Credit River floodplain proximity raising the water table',
      'Lake Ontario influence on groundwater levels in south Mississauga',
      'Rapid development causing settlement in newer subdivisions',
      'Combined sewer systems in older neighbourhoods',
      'Clay soil composition throughout Peel Region',
    ],
    seasonalRisks: 'Mississauga experiences peak leak risk during the March–May snowmelt period and summer thunderstorm season. Port Credit and lakeside areas face additional risk from high Lake Ontario water levels. Fall storms in October can also trigger basement flooding, especially in low-lying areas near the Credit River.',
    rebateInfo: 'Peel Region offers up to $2,800 for backwater valve installation. This covers Mississauga, Brampton, and Caledon. Apply through the Region of Peel.',
    faqs: [
      { question: 'Why does my Mississauga basement leak?', answer: 'Common causes include clay soil creating hydrostatic pressure, proximity to the Credit River or Lake Ontario, aging weeping tile in older homes, and settlement cracks in newer construction.' },
      { question: 'How much does basement leak repair cost in Mississauga?', answer: 'Costs are approximately 5% less than Toronto. Crack injection: $238–$608/ft, interior drainage: $67–$228/ft, exterior waterproofing: $95–$285/ft.' },
      { question: 'Is Mississauga basement leak repair cheaper than Toronto?', answer: 'Yes, approximately 5% cheaper due to lower labour rates in Peel Region.' },
      { question: 'What rebates are available in Mississauga?', answer: 'Peel Region offers up to $2,800 for backwater valve installation. A plumbing permit and inspection are required to qualify.' },
      { question: 'Do I need a sump pump in Mississauga?', answer: 'If your home is near the Credit River, lakefront, or in a low-lying area, a sump pump is strongly recommended. Homes with any history of water are best protected with pump + drainage.' },
      { question: 'How long does basement leak repair take in Mississauga?', answer: 'Crack injection: 1–2 hours. Interior drainage: 3–5 days. Exterior waterproofing: 5–10 days.' },
      { question: 'Can I get my Mississauga basement leak fixed in winter?', answer: 'Interior repairs (crack injection, drainage systems) can be done year-round. Exterior waterproofing is best done in spring through fall when the ground isn\'t frozen.' },
      { question: 'What causes sewer backup in Mississauga?', answer: 'Heavy storms overwhelm the combined sewer system in older areas. Tree roots can also infiltrate sewer connections. A backwater valve prevents sewage from flowing back into your home.' },
      { question: 'How do I prevent basement leaks in Mississauga?', answer: 'Maintain gutters and downspouts, ensure positive grading, test sump pump quarterly, install a backwater valve, and address cracks early before they worsen.' },
      { question: 'How do I find a leak repair contractor in Mississauga?', answer: 'Use RenoNext to connect with verified waterproofing contractors serving Mississauga. All payments are escrow-protected and work is GPS-verified.' },
    ],
    nearbyCities: ['toronto', 'brampton', 'oakville', 'vaughan'],
  },
  {
    slug: 'brampton',
    city: 'Brampton',
    region: 'Peel Region',
    metaTitle: 'Basement Leak Repair Brampton 2026 | Fix Leaky Basement Costs',
    metaDescription: 'Brampton basement leak repair from $230/crack to $27,600 exterior. 8% below Toronto. Complete guide with warning signs, methods, and verified contractors.',
    heroTagline: 'Brampton\'s rapidly growing neighbourhoods face increasing basement water issues — from settlement cracks in new builds to aging drainage in established areas.',
    cityContext: 'Brampton\'s explosive growth means many homes sit on recently developed land where soil settlement can cause foundation cracks within the first 5–10 years. Older areas like Heart Lake and downtown Brampton have aging infrastructure. The city\'s flat terrain and clay soil can lead to poor surface drainage.',
    commonCauses: [
      'Settlement cracks in newer homes (built 2005–2020)',
      'Clay soil retention creating hydrostatic pressure',
      'Flat terrain causing pooling around foundations',
      'Aging weeping tile in pre-2000 homes',
      'Rapid construction quality issues in some subdivisions',
    ],
    seasonalRisks: 'Brampton\'s flat terrain makes spring snowmelt particularly problematic — water pools rather than draining away. Summer thunderstorms in June–August can overwhelm storm drains. New subdivisions are especially vulnerable during their first 2–3 years as soil settles.',
    rebateInfo: 'Peel Region offers up to $2,800 for backwater valve installation covering Brampton homes. Apply through the Region of Peel.',
    faqs: [
      { question: 'How much does basement leak repair cost in Brampton?', answer: 'Brampton is about 8% cheaper than Toronto. Crack injection: $230–$589/ft, interior drainage: $64–$221/ft, exterior waterproofing: $92–$276/ft.' },
      { question: 'Why does my new Brampton home have basement leaks?', answer: 'Soil settlement in the first 5–10 years after construction is common and can cause foundation cracks. This is normal but should be addressed promptly with crack injection.' },
      { question: 'What rebates are available in Brampton?', answer: 'Peel Region offers up to $2,800 for backwater valve installation. Apply through the Region of Peel.' },
      { question: 'Do I need a sump pump in Brampton?', answer: 'If you have any history of water or live in a low-lying area, yes. Brampton\'s flat terrain makes sump pumps an important safeguard.' },
      { question: 'How long does basement leak repair take in Brampton?', answer: 'Crack injection: 1–2 hours. Interior drainage: 3–5 days. Exterior waterproofing: 5–10 days.' },
      { question: 'Can I claim basement leak repair on insurance in Brampton?', answer: 'Most policies cover sudden water damage but not gradual leaks. Sewer backup coverage is usually an add-on. Installing a backwater valve may lower premiums.' },
      { question: 'What\'s the difference between interior and exterior waterproofing?', answer: 'Interior systems manage water that enters (drainage + pump). Exterior waterproofing prevents water from reaching the foundation. Interior is less disruptive and more affordable; exterior is more thorough.' },
      { question: 'How do I know if my Brampton basement needs waterproofing?', answer: 'Look for water stains, musty smells, efflorescence, peeling paint, mold, or cracks. If you see any of these signs, get a professional assessment.' },
      { question: 'How do I prevent basement leaks in Brampton?', answer: 'Ensure gutters drain away from the house, maintain positive grading, test your sump pump, and install a backwater valve.' },
      { question: 'How do I find a basement leak contractor in Brampton?', answer: 'RenoNext connects you with verified waterproofing contractors serving Brampton with escrow-protected payments.' },
    ],
    nearbyCities: ['mississauga', 'vaughan', 'milton', 'toronto'],
  },
  {
    slug: 'vaughan',
    city: 'Vaughan',
    region: 'York Region',
    metaTitle: 'Basement Leak Repair Vaughan 2026 | Fix Leaky Basement',
    metaDescription: 'Vaughan basement leak repair from $243/crack to $29,100 exterior. Only 3% below Toronto. Complete guide with costs, methods, and verified contractors.',
    heroTagline: 'Vaughan\'s upscale homes deserve premium waterproofing protection — from Kleinburg estates to Maple townhouses.',
    cityContext: 'Vaughan\'s diverse housing stock ranges from century homes in Kleinburg to modern builds in Vellore and Maple. The area\'s hilly terrain near the Humber River valley can create high water table conditions. Premium homes demand thorough waterproofing to protect significant property investments.',
    commonCauses: [
      'Humber River valley proximity raising water tables',
      'Clay soil throughout York Region',
      'Aging waterproofing in 1980s–1990s homes',
      'Poor backfill compaction in newer developments',
      'Grading issues on sloped lots',
    ],
    seasonalRisks: 'Vaughan\'s spring thaw (March–April) is the highest-risk period, especially for homes near the Humber River. Summer storms can overwhelm drainage systems. Homes on sloped lots face additional risk from surface water runoff during heavy rainfall.',
    rebateInfo: 'York Region offers periodic basement flooding prevention subsidies. Contact the City of Vaughan for current programs and eligibility.',
    faqs: [
      { question: 'How much does basement leak repair cost in Vaughan?', answer: 'Vaughan is approximately 3% less than Toronto. Crack injection: $243–$621/ft, interior drainage: $68–$233/ft, exterior waterproofing: $97–$291/ft.' },
      { question: 'Why does my Vaughan basement leak?', answer: 'Common causes include Humber River proximity, clay soil creating pressure, aging waterproofing, and poor grading on sloped lots.' },
      { question: 'Are there rebates in Vaughan?', answer: 'York Region offers periodic basement flooding prevention subsidies. Contact the City of Vaughan for current availability.' },
      { question: 'Do I need exterior waterproofing in Vaughan?', answer: 'For homes near the Humber River or with persistent wall seepage, exterior waterproofing is recommended. It\'s the most effective solution for severe water infiltration.' },
      { question: 'How long does leak repair take in Vaughan?', answer: 'Crack injection: 1–2 hours. Interior drainage: 3–5 days. Exterior waterproofing: 5–10 days.' },
      { question: 'Can a Vaughan basement leak cause mold?', answer: 'Yes. Even small amounts of moisture create conditions for mold growth within 24–48 hours. Mold remediation costs $2,000–$10,000 — far more than fixing the leak early.' },
      { question: 'What\'s the best leak repair method for Vaughan homes?', answer: 'It depends on the source. Single cracks: injection. Widespread seepage: interior drainage. Severe or recurring: exterior waterproofing. A professional assessment determines the right approach.' },
      { question: 'Should I waterproof before finishing my Vaughan basement?', answer: 'Absolutely. Finishing over an existing leak problem will lead to mold, damaged finishes, and costly remediation. Always fix water issues first.' },
      { question: 'How do I prevent basement leaks in Vaughan?', answer: 'Maintain gutters, extend downspouts, ensure positive grading, test sump pump quarterly, and address cracks immediately.' },
      { question: 'How do I find a contractor in Vaughan?', answer: 'Browse verified waterproofing contractors on RenoNext serving Vaughan with escrow-protected payments and GPS-verified work.' },
    ],
    nearbyCities: ['toronto', 'richmond-hill', 'brampton', 'markham'],
  },
  {
    slug: 'markham',
    city: 'Markham',
    region: 'York Region',
    metaTitle: 'Basement Leak Repair Markham 2026 | Fix Leaky Basement',
    metaDescription: 'Markham basement leak repair from $243/crack to $29,100 exterior. Complete guide with costs, warning signs, methods, and verified contractors.',
    heroTagline: 'Markham\'s mix of heritage homes and modern developments means every basement has unique waterproofing needs.',
    cityContext: 'Markham\'s range from historic Unionville cottages to modern homes in Cornell creates diverse leak repair scenarios. Clay soil dominates the area, and older homes may have deteriorated weeping tile. The Rouge River watershed influences groundwater in eastern Markham.',
    commonCauses: [
      'Heavy clay soil creating hydrostatic pressure',
      'Aging infrastructure in Unionville and Old Markham',
      'Rouge River watershed affecting groundwater levels',
      'Settlement in newer Cornell and Berczy developments',
      'Tree root infiltration of older drainage systems',
    ],
    seasonalRisks: 'March–May snowmelt is the peak season for Markham basement leaks. Homes near the Rouge River face additional risk during high water events. Summer storms (June–August) can trigger flash flooding in low-lying areas.',
    rebateInfo: 'York Region offers periodic basement flooding prevention subsidies. Contact the City of Markham for current programs.',
    faqs: [
      { question: 'How much does basement leak repair cost in Markham?', answer: 'Markham is approximately 3% less than Toronto. Crack injection: $243–$621/ft, interior drainage: $68–$233/ft, exterior waterproofing: $97–$291/ft.' },
      { question: 'Why does my Markham basement leak?', answer: 'Clay soil, aging drainage systems, Rouge River proximity, and tree root damage are common causes in Markham.' },
      { question: 'Do Unionville heritage homes have more leak problems?', answer: 'Yes. Older homes (pre-1970s) often have deteriorated waterproofing, clogged weeping tile, and original tar coatings that have broken down.' },
      { question: 'Are there rebates for Markham homeowners?', answer: 'York Region periodically offers basement flooding prevention subsidies. Contact the City of Markham for current availability.' },
      { question: 'How long does leak repair take in Markham?', answer: 'Crack injection: 1–2 hours. Interior drainage: 3–5 days. Exterior waterproofing: 5–10 days.' },
      { question: 'Is mold common in Markham basements?', answer: 'Mold can develop in any damp basement within 24–48 hours. Markham\'s humidity levels make prompt leak repair especially important.' },
      { question: 'What\'s the best waterproofing for a Markham home?', answer: 'For older homes: combination of interior drainage and crack injection. For severe cases: exterior waterproofing. A professional assessment determines the best approach.' },
      { question: 'Can I prevent my Markham basement from leaking?', answer: 'Maintain gutters, ensure downspouts extend 6+ feet from the foundation, maintain positive grading, and test your sump pump quarterly.' },
      { question: 'Do I need a backwater valve in Markham?', answer: 'Strongly recommended, especially if you\'ve experienced sewer backup. It prevents sewage from flowing back into your home during heavy storms.' },
      { question: 'How do I find a leak repair contractor in Markham?', answer: 'Use RenoNext to browse verified waterproofing contractors serving Markham. All payments are escrow-protected.' },
    ],
    nearbyCities: ['toronto', 'richmond-hill', 'vaughan', 'pickering'],
  },
  {
    slug: 'richmond-hill',
    city: 'Richmond Hill',
    region: 'York Region',
    metaTitle: 'Basement Leak Repair Richmond Hill 2026 | Fix Leaky Basement',
    metaDescription: 'Richmond Hill basement leak repair costs and methods. 4% below Toronto pricing. Warning signs, repair options, and verified contractors.',
    heroTagline: 'Richmond Hill homes along the Oak Ridges Moraine face unique groundwater challenges — here\'s how to keep your basement dry.',
    cityContext: 'Richmond Hill straddles the Oak Ridges Moraine, a major groundwater recharge area. Homes in the northern part of the city near the moraine may experience higher water table conditions. Established neighbourhoods along Yonge Street have aging infrastructure.',
    commonCauses: [
      'Oak Ridges Moraine groundwater recharge creating high water tables',
      'Clay soil throughout the municipality',
      'Aging weeping tile in 1970s–1990s housing stock',
      'Surface water runoff from sloped lots',
      'Deteriorated foundation waterproofing',
    ],
    seasonalRisks: 'Homes near the Oak Ridges Moraine face year-round groundwater pressure that intensifies during spring snowmelt. The March–May period is highest risk. Summer storms can also trigger rapid water table rises in affected areas.',
    rebateInfo: 'York Region offers periodic basement flooding prevention subsidies. Contact the City of Richmond Hill for current programs.',
    faqs: [
      { question: 'How much does basement leak repair cost in Richmond Hill?', answer: 'Richmond Hill is approximately 4% less than Toronto. Crack injection: $240–$614/ft, interior drainage: $67–$230/ft, exterior waterproofing: $96–$288/ft.' },
      { question: 'Why do homes near the Oak Ridges Moraine have basement leaks?', answer: 'The moraine is a groundwater recharge area — water percolates through the soil and raises the water table around foundations, creating constant hydrostatic pressure.' },
      { question: 'What\'s the best solution for high water table in Richmond Hill?', answer: 'A combination of interior drainage system and sump pump is most effective. Exterior waterproofing adds maximum protection for severe cases.' },
      { question: 'Are there rebates in Richmond Hill?', answer: 'York Region periodically offers basement flooding prevention subsidies. Contact the City of Richmond Hill for current availability.' },
      { question: 'How long does leak repair take?', answer: 'Crack injection: 1–2 hours. Interior drainage: 3–5 days. Exterior waterproofing: 5–10 days.' },
      { question: 'Can I fix a basement leak myself in Richmond Hill?', answer: 'Minor improvements (grading, gutter maintenance) are DIY-friendly. Crack injection and drainage systems require professional equipment.' },
      { question: 'Do newer Richmond Hill homes have leak issues?', answer: 'Settlement cracks can appear in homes 3–10 years old. This is normal but should be addressed with crack injection before water entry causes damage.' },
      { question: 'Should I get a sump pump in Richmond Hill?', answer: 'Yes, especially if you\'re near the Oak Ridges Moraine. A sump pump with battery backup is essential for managing high water table conditions.' },
      { question: 'How do I prevent basement leaks in Richmond Hill?', answer: 'Maintain exterior drainage, test sump pump quarterly, install a backwater valve, monitor for new cracks, and run a dehumidifier in summer.' },
      { question: 'How do I find a leak repair contractor in Richmond Hill?', answer: 'Browse verified contractors on RenoNext serving Richmond Hill with escrow-protected payments and GPS-verified work.' },
    ],
    nearbyCities: ['markham', 'vaughan', 'aurora', 'toronto'],
  },
  {
    slug: 'aurora',
    city: 'Aurora',
    region: 'York Region',
    metaTitle: 'Basement Leak Repair Aurora 2026 | Fix Leaky Basement Costs',
    metaDescription: 'Aurora basement leak repair costs and methods. 6% below Toronto. Complete guide with warning signs and verified contractors.',
    heroTagline: 'Aurora\'s heritage downtown and newer subdivisions each present unique basement waterproofing challenges.',
    cityContext: 'Aurora sits partially on the Oak Ridges Moraine with a mix of heritage homes downtown and newer developments. The moraine influence means higher groundwater in northern areas. Heritage overlay zones may have additional considerations for exterior work.',
    commonCauses: [
      'Oak Ridges Moraine groundwater influence',
      'Aging infrastructure in heritage core',
      'Clay soil throughout the municipality',
      'Settlement in newer subdivisions',
      'Poor drainage in older lots',
    ],
    seasonalRisks: 'Spring snowmelt (March–May) is peak season. Northern Aurora homes near the moraine face higher groundwater year-round. Fall storms can also trigger leaks in older homes.',
    rebateInfo: 'York Region offers periodic subsidies. Contact the Town of Aurora for current basement flooding prevention programs.',
    faqs: [
      { question: 'How much does basement leak repair cost in Aurora?', answer: 'Aurora is approximately 6% less than Toronto. Crack injection: $235–$602/ft, interior drainage: $66–$226/ft, exterior waterproofing: $94–$282/ft.' },
      { question: 'Why does my Aurora basement leak?', answer: 'Common causes include moraine groundwater, clay soil, aging drainage in heritage homes, and settlement in newer builds.' },
      { question: 'Are there rebates in Aurora?', answer: 'York Region periodically offers subsidies. Contact the Town of Aurora for current programs.' },
      { question: 'How long does leak repair take in Aurora?', answer: 'Crack injection: 1–2 hours. Interior drainage: 3–5 days. Exterior waterproofing: 5–10 days.' },
      { question: 'Do Aurora heritage homes need special waterproofing?', answer: 'Heritage overlay areas may have restrictions on exterior modifications. Interior solutions work well without affecting the exterior appearance.' },
      { question: 'What\'s the best waterproofing method for Aurora?', answer: 'For moraine-area homes: interior drainage + sump pump. For heritage homes: crack injection + interior membrane. For severe cases: exterior waterproofing.' },
      { question: 'Can I waterproof my Aurora basement in winter?', answer: 'Interior repairs can be done year-round. Exterior work is best from April through November.' },
      { question: 'Do I need a sump pump in Aurora?', answer: 'Highly recommended, especially near the Oak Ridges Moraine. A battery backup system adds protection during power outages.' },
      { question: 'How do I prevent leaks in my Aurora basement?', answer: 'Maintain gutters and downspouts, ensure positive grading, test sump pump quarterly, and address cracks promptly.' },
      { question: 'How do I find a leak repair contractor in Aurora?', answer: 'Browse verified waterproofing contractors on RenoNext serving Aurora with escrow protection.' },
    ],
    nearbyCities: ['richmond-hill', 'markham', 'vaughan', 'whitby'],
  },
  {
    slug: 'oakville',
    city: 'Oakville',
    region: 'Halton Region',
    metaTitle: 'Basement Leak Repair Oakville 2026 | Fix Leaky Basement',
    metaDescription: 'Oakville basement leak repair from $255/crack to $30,600 exterior. Premium market pricing. Complete guide with costs, methods, and verified contractors.',
    heroTagline: 'Oakville\'s lakeside location and premium housing stock make professional waterproofing an essential investment.',
    cityContext: 'Oakville\'s proximity to Lake Ontario means higher water tables in south Oakville neighbourhoods like Bronte, Old Oakville, and Lakeshore Road area. The town\'s mature trees can cause root damage to older drainage systems. Premium property values justify thorough waterproofing investments.',
    commonCauses: [
      'Lake Ontario influence on groundwater levels',
      'Tree root infiltration of weeping tile',
      'Aging foundations in Old Oakville heritage homes',
      'High water table in lakeside neighbourhoods',
      'Creek and ravine proximity in Glen Abbey area',
    ],
    seasonalRisks: 'Lake Ontario water levels affect Oakville year-round. Spring snowmelt (March–May) compounds the issue. Lakeside properties face risk during high-water years. Summer storms can overwhelm storm systems in older neighbourhoods.',
    rebateInfo: 'Halton Region periodically offers stormwater management programs. Contact the Town of Oakville for current basement flooding prevention rebates.',
    faqs: [
      { question: 'How much does basement leak repair cost in Oakville?', answer: 'Oakville is approximately 2% more than Toronto due to premium labour. Crack injection: $255–$653/ft, interior drainage: $71–$245/ft, exterior waterproofing: $102–$306/ft.' },
      { question: 'Why is Oakville more expensive for leak repair?', answer: 'Oakville has premium labour rates due to high demand and an affluent market. Contractors serving Oakville price accordingly.' },
      { question: 'Do lakeside Oakville homes have more leak issues?', answer: 'Yes. Properties near Lake Ontario face higher water tables and may need more comprehensive waterproofing solutions.' },
      { question: 'Are there rebates in Oakville?', answer: 'Halton Region offers periodic programs. Contact the Town of Oakville for current basement flooding prevention rebates.' },
      { question: 'How long does leak repair take in Oakville?', answer: 'Crack injection: 1–2 hours. Interior drainage: 3–5 days. Exterior waterproofing: 5–10 days.' },
      { question: 'What waterproofing is best for Oakville lakefront homes?', answer: 'Exterior waterproofing with interior drainage backup is recommended for lakefront properties. The combined approach handles both groundwater and rain infiltration.' },
      { question: 'Can tree roots cause basement leaks in Oakville?', answer: 'Yes. Oakville\'s mature trees can infiltrate weeping tile and drainage systems. Root clearing and replacement of damaged pipes may be needed.' },
      { question: 'Should I waterproof before finishing my Oakville basement?', answer: 'Absolutely. With Oakville home values, protecting your renovation investment with proper waterproofing is essential before any finishing work.' },
      { question: 'How do I prevent basement leaks in Oakville?', answer: 'Maintain gutters, manage tree roots near foundation, ensure positive grading, test sump pump quarterly, and monitor lake water level forecasts.' },
      { question: 'How do I find a leak repair contractor in Oakville?', answer: 'Use RenoNext to browse verified waterproofing contractors serving Oakville with escrow protection.' },
    ],
    nearbyCities: ['mississauga', 'burlington', 'milton', 'toronto'],
  },
  {
    slug: 'burlington',
    city: 'Burlington',
    region: 'Halton Region',
    metaTitle: 'Basement Leak Repair Burlington 2026 | Fix Leaky Basement',
    metaDescription: 'Burlington basement leak repair costs and methods. 4% below Toronto. Complete guide with warning signs and verified contractors.',
    heroTagline: 'Burlington\'s waterfront location and established neighbourhoods require proactive basement waterproofing to protect your home.',
    cityContext: 'Burlington\'s location between Lake Ontario and the Niagara Escarpment creates varied water conditions. Waterfront properties in Aldershot face lake-influenced water tables. Homes near escarpment areas may have spring-fed groundwater. Conservation authority requirements may apply near watercourses.',
    commonCauses: [
      'Lake Ontario groundwater influence in south Burlington',
      'Niagara Escarpment spring water in north Burlington',
      'Aging infrastructure in Aldershot and central Burlington',
      'Conservation area drainage patterns',
      'Clay soil composition throughout the city',
    ],
    seasonalRisks: 'Burlington faces a dual risk: lakeside flooding in spring and escarpment runoff during heavy storms. The March–May snowmelt period is highest risk. Summer thunderstorms can cause flash flooding in escarpment areas.',
    rebateInfo: 'Halton Region offers periodic stormwater management programs. Contact the City of Burlington for current basement flooding prevention rebates.',
    faqs: [
      { question: 'How much does basement leak repair cost in Burlington?', answer: 'Burlington is approximately 4% less than Toronto. Crack injection: $240–$614/ft, interior drainage: $67–$230/ft, exterior waterproofing: $96–$288/ft.' },
      { question: 'Why does my Burlington basement leak?', answer: 'Lakeside proximity, escarpment groundwater, aging drainage systems, and clay soil are common causes in Burlington.' },
      { question: 'Are there rebates in Burlington?', answer: 'Halton Region offers periodic programs. Contact the City of Burlington for current availability.' },
      { question: 'Do waterfront Burlington homes need special waterproofing?', answer: 'Yes. Properties near Lake Ontario benefit from exterior waterproofing with a robust interior drainage and sump pump system.' },
      { question: 'How long does leak repair take in Burlington?', answer: 'Crack injection: 1–2 hours. Interior drainage: 3–5 days. Exterior waterproofing: 5–10 days.' },
      { question: 'What conservation requirements affect Burlington waterproofing?', answer: 'Homes near watercourses or conservation areas may need permits from the Conservation Halton authority for exterior excavation work.' },
      { question: 'Can I fix a Burlington basement leak myself?', answer: 'Improve exterior grading and gutter maintenance as DIY. Professional repair is recommended for crack injection and drainage systems.' },
      { question: 'Should I get a sump pump in Burlington?', answer: 'Yes, especially for lakeside and escarpment properties. A battery backup system is essential for storm-related power outages.' },
      { question: 'How do I prevent leaks in Burlington?', answer: 'Maintain gutters, ensure positive grading, test sump pump quarterly, and address cracks before they worsen.' },
      { question: 'How do I find a leak repair contractor in Burlington?', answer: 'Browse verified contractors on RenoNext serving Burlington with escrow protection.' },
    ],
    nearbyCities: ['oakville', 'hamilton', 'milton', 'mississauga'],
  },
  {
    slug: 'milton',
    city: 'Milton',
    region: 'Halton Region',
    metaTitle: 'Basement Leak Repair Milton 2026 | Fix Leaky Basement',
    metaDescription: 'Milton basement leak repair costs and methods. 8% below Toronto. Complete guide with warning signs and verified contractors.',
    heroTagline: 'Milton\'s newer housing stock means fewer severe leaks — but settlement cracks in fast-growing subdivisions need prompt attention.',
    cityContext: 'Milton\'s rapid growth means most homes are relatively new (2005+), reducing the risk of aging infrastructure issues. However, settlement cracks are common in newer subdivisions, and the area\'s clay soil can still create hydrostatic pressure. Homes near the Niagara Escarpment may face unique drainage challenges.',
    commonCauses: [
      'Settlement cracks in newer construction (5–15 years old)',
      'Clay soil creating hydrostatic pressure',
      'Escarpment runoff affecting homes in west Milton',
      'Poor backfill compaction in rapid-development areas',
      'Grading issues in recently completed lots',
    ],
    seasonalRisks: 'Spring snowmelt (March–May) is the primary risk period. Newer homes may experience their first leaks during the first significant rainfall after settlement. Escarpment-area homes face additional runoff during heavy storms.',
    rebateInfo: 'Halton Region offers periodic programs. Contact the Town of Milton for current basement flooding prevention rebates.',
    faqs: [
      { question: 'How much does basement leak repair cost in Milton?', answer: 'Milton is approximately 8% less than Toronto. Crack injection: $230–$589/ft, interior drainage: $64–$221/ft, exterior waterproofing: $92–$276/ft.' },
      { question: 'Why does my new Milton home have a basement leak?', answer: 'Settlement cracks are common in homes 3–10 years old as the soil compresses. Crack injection is the standard fix and is highly effective.' },
      { question: 'Are there rebates in Milton?', answer: 'Halton Region offers periodic stormwater programs. Contact the Town of Milton for current availability.' },
      { question: 'How long does leak repair take in Milton?', answer: 'Crack injection: 1–2 hours. Interior drainage: 3–5 days. Exterior waterproofing: 5–10 days.' },
      { question: 'Do Milton homes typically need full waterproofing?', answer: 'Most newer Milton homes just need crack injection for settlement cracks. Full waterproofing is usually only needed for escarpment-area homes or properties with persistent water issues.' },
      { question: 'Is a sump pump necessary in Milton?', answer: 'Recommended for escarpment-area homes and any property with a history of water. Most newer homes already have sump pumps installed.' },
      { question: 'Can settlement cracks in Milton homes be serious?', answer: 'Most are cosmetic and easily fixed with injection. Horizontal cracks or cracks wider than 1/4" should be assessed by a structural engineer.' },
      { question: 'How do I prevent basement leaks in my Milton home?', answer: 'Maintain gutters, extend downspouts, monitor for new cracks, test sump pump if installed, and keep grading sloped away from the foundation.' },
      { question: 'Should I worry about a hairline crack in my Milton basement?', answer: 'Hairline cracks (<1/16") are cosmetic in most cases. Monitor them — if they grow or show water, get them injected promptly.' },
      { question: 'How do I find a contractor in Milton?', answer: 'Use RenoNext to connect with verified waterproofing contractors serving Milton with escrow protection.' },
    ],
    nearbyCities: ['oakville', 'brampton', 'burlington', 'mississauga'],
  },
  {
    slug: 'ajax',
    city: 'Ajax',
    region: 'Durham Region',
    metaTitle: 'Basement Leak Repair Ajax 2026 | Fix Leaky Basement',
    metaDescription: 'Ajax basement leak repair costs and methods. 9% below Toronto. Complete guide with warning signs and verified contractors.',
    heroTagline: 'Ajax homes near the waterfront and Duffins Creek face unique water challenges — affordable repairs protect your investment.',
    cityContext: 'Ajax\'s location on Lake Ontario\'s shore means lakeside properties face groundwater issues. Duffins Creek watershed influences water levels in central and northern Ajax. A mix of 1970s–2010s housing stock presents varying maintenance needs.',
    commonCauses: [
      'Lake Ontario influence on waterfront groundwater',
      'Duffins Creek watershed affecting central Ajax',
      'Aging weeping tile in 1970s–1980s homes',
      'Clay soil throughout Durham Region',
      'Settlement in newer north Ajax developments',
    ],
    seasonalRisks: 'Spring snowmelt (March–May) is peak season. Lake Ontario water levels affect waterfront properties year-round. Summer storms can overwhelm older storm systems.',
    rebateInfo: 'Durham Region periodically offers backwater valve and sump pump subsidies. Contact the Town of Ajax for current programs.',
    faqs: [
      { question: 'How much does basement leak repair cost in Ajax?', answer: 'Ajax is approximately 9% less than Toronto. Crack injection: $228–$582/ft, interior drainage: $64–$218/ft, exterior waterproofing: $91–$273/ft.' },
      { question: 'Why does my Ajax basement leak?', answer: 'Lakefront groundwater, Duffins Creek watershed, aging drainage in older homes, and clay soil are common causes.' },
      { question: 'Are there rebates in Ajax?', answer: 'Durham Region periodically offers subsidies. Contact the Town of Ajax for current programs.' },
      { question: 'How long does leak repair take in Ajax?', answer: 'Crack injection: 1–2 hours. Interior drainage: 3–5 days. Exterior waterproofing: 5–10 days.' },
      { question: 'Do Ajax waterfront homes need special waterproofing?', answer: 'Yes. Properties near Lake Ontario benefit from comprehensive waterproofing — exterior membrane plus interior drainage with sump pump.' },
      { question: 'Is a sump pump necessary in Ajax?', answer: 'Recommended for waterfront, low-lying, and flood-prone areas. Durham Region pricing makes installation affordable.' },
      { question: 'Can older Ajax homes be effectively waterproofed?', answer: 'Yes. Interior drainage systems are particularly effective in older homes, managing water without the cost of full exterior excavation.' },
      { question: 'How do I prevent basement leaks in Ajax?', answer: 'Maintain gutters and downspouts, ensure positive grading, test sump pump quarterly, and install a backwater valve.' },
      { question: 'What\'s the most affordable leak fix in Ajax?', answer: 'Crack injection at $228–$582/ft is the most affordable solution for individual cracks. Many Ajax homes just need 1–3 cracks addressed.' },
      { question: 'How do I find a leak repair contractor in Ajax?', answer: 'Browse verified contractors on RenoNext serving Ajax with escrow-protected payments.' },
    ],
    nearbyCities: ['pickering', 'whitby', 'oshawa', 'toronto'],
  },
  {
    slug: 'pickering',
    city: 'Pickering',
    region: 'Durham Region',
    metaTitle: 'Basement Leak Repair Pickering 2026 | Fix Leaky Basement',
    metaDescription: 'Pickering basement leak repair costs and methods. 8% below Toronto. Complete guide with costs and verified contractors.',
    heroTagline: 'Pickering\'s Rouge River corridor and lakefront position create water management challenges that affordable repairs can solve.',
    cityContext: 'Pickering\'s western border at the Rouge River and southern lakefront exposure create dual water challenges. The mix of 1980s–2010s housing stock means varying foundation conditions. The city\'s development growth area brings new construction that may settle over time.',
    commonCauses: [
      'Rouge River watershed affecting western Pickering',
      'Lake Ontario groundwater in south Pickering',
      'Clay soil throughout the municipality',
      'Aging foundation waterproofing in 1980s homes',
      'Settlement in newer development areas',
    ],
    seasonalRisks: 'Spring snowmelt is the primary risk, compounded by Rouge River high water events. Summer storms can overwhelm older drainage systems. Lakefront properties face risk during high Lake Ontario water years.',
    rebateInfo: 'Durham Region periodically offers backwater valve and sump pump subsidies. Contact the City of Pickering for current programs.',
    faqs: [
      { question: 'How much does basement leak repair cost in Pickering?', answer: 'Pickering is approximately 8% less than Toronto. Crack injection: $230–$589/ft, interior drainage: $64–$221/ft, exterior waterproofing: $92–$276/ft.' },
      { question: 'Why does my Pickering basement leak?', answer: 'Rouge River proximity, lakefront groundwater, clay soil, and aging drainage in older homes are the most common causes.' },
      { question: 'Are there rebates in Pickering?', answer: 'Durham Region periodically offers subsidies. Contact the City of Pickering for current programs.' },
      { question: 'How long does leak repair take in Pickering?', answer: 'Crack injection: 1–2 hours. Interior drainage: 3–5 days. Exterior waterproofing: 5–10 days.' },
      { question: 'Do homes near the Rouge River need waterproofing?', answer: 'Properties in the Rouge River corridor face higher water table risks and benefit from comprehensive waterproofing.' },
      { question: 'Is a sump pump necessary in Pickering?', answer: 'Recommended for homes near waterways, low-lying areas, or any property with a history of water intrusion.' },
      { question: 'What\'s the best leak repair for a Pickering home?', answer: 'Crack injection for individual cracks, interior drainage for widespread seepage, exterior waterproofing for severe or persistent issues.' },
      { question: 'How do I prevent leaks in Pickering?', answer: 'Maintain gutters, extend downspouts, test sump pump quarterly, install backwater valve, and monitor for new cracks.' },
      { question: 'Should I waterproof before finishing my Pickering basement?', answer: 'Yes. Address all water issues before investing in finishing to prevent costly damage to new finishes.' },
      { question: 'How do I find a contractor in Pickering?', answer: 'Use RenoNext to browse verified waterproofing contractors serving Pickering with escrow protection.' },
    ],
    nearbyCities: ['ajax', 'toronto', 'markham', 'whitby'],
  },
  {
    slug: 'oshawa',
    city: 'Oshawa',
    region: 'Durham Region',
    metaTitle: 'Basement Leak Repair Oshawa 2026 | Fix Leaky Basement',
    metaDescription: 'Oshawa basement leak repair — GTA\'s most affordable at 12% below Toronto. Complete guide with costs, methods, and verified contractors.',
    heroTagline: 'Oshawa offers the GTA\'s most affordable basement leak repairs — 12% less than Toronto with reliable professional solutions.',
    cityContext: 'Oshawa\'s older housing stock, particularly in the downtown core and south Oshawa, often has deteriorated waterproofing and aging drainage systems. The city\'s lower-cost market makes professional repairs accessible. Oshawa Creek watershed affects groundwater in central areas.',
    commonCauses: [
      'Aging foundation waterproofing in pre-1980s homes',
      'Deteriorated clay weeping tile in older properties',
      'Oshawa Creek watershed raising groundwater',
      'Clay soil throughout Durham Region',
      'Poor maintenance of aging drainage systems',
    ],
    seasonalRisks: 'Spring snowmelt (March–May) is the highest-risk period. Oshawa Creek flooding events can raise water tables throughout central Oshawa. Summer storms overwhelm older combined sewers in the downtown area.',
    rebateInfo: 'Durham Region periodically offers backwater valve and sump pump subsidies. Contact the City of Oshawa for current programs.',
    faqs: [
      { question: 'How much does basement leak repair cost in Oshawa?', answer: 'Oshawa has the GTA\'s lowest prices — 12% less than Toronto. Crack injection: $220–$563/ft, interior drainage: $62–$211/ft, exterior waterproofing: $88–$264/ft.' },
      { question: 'Why is Oshawa the cheapest for leak repairs?', answer: 'Lower labour rates and reduced overhead make Oshawa the most affordable GTA market for basement waterproofing.' },
      { question: 'Do older Oshawa homes need full waterproofing?', answer: 'Many do. Pre-1980s homes often have deteriorated waterproofing and clogged weeping tile. A professional assessment determines the right approach.' },
      { question: 'Are there rebates in Oshawa?', answer: 'Durham Region periodically offers subsidies. Contact the City of Oshawa for current programs.' },
      { question: 'How long does leak repair take in Oshawa?', answer: 'Crack injection: 1–2 hours. Interior drainage: 3–5 days. Exterior waterproofing: 5–10 days.' },
      { question: 'Is a sump pump necessary in Oshawa?', answer: 'Highly recommended for older homes and properties near Oshawa Creek. Battery backup is important for storm-related power outages.' },
      { question: 'Can I fix an Oshawa basement leak cheaply?', answer: 'Crack injection starts at just $220/ft — often the cheapest effective repair. Many leaks can be fixed for under $1,000 in Oshawa.' },
      { question: 'How do I prevent basement leaks in Oshawa?', answer: 'Maintain gutters, ensure positive grading, test sump pump quarterly, and address cracks before they grow.' },
      { question: 'What mold risks exist in Oshawa basements?', answer: 'Older damp basements are high-risk for mold. Fix leaks promptly — mold remediation costs $2,000–$10,000, far more than repairing the leak.' },
      { question: 'How do I find a contractor in Oshawa?', answer: 'Browse verified contractors on RenoNext serving Oshawa with escrow-protected payments and GPS-verified work.' },
    ],
    nearbyCities: ['whitby', 'ajax', 'pickering', 'hamilton'],
  },
  {
    slug: 'whitby',
    city: 'Whitby',
    region: 'Durham Region',
    metaTitle: 'Basement Leak Repair Whitby 2026 | Fix Leaky Basement',
    metaDescription: 'Whitby basement leak repair costs and methods. 10% below Toronto. Complete guide with warning signs and verified contractors.',
    heroTagline: 'Whitby\'s growing community and mix of housing stock make affordable leak repair a smart investment for homeowners.',
    cityContext: 'Whitby\'s blend of established Brooklin Village and newer Taunton Road developments creates diverse waterproofing needs. Older homes need drainage system updates while newer homes may experience settlement. Lynde Creek watershed influences groundwater in some areas.',
    commonCauses: [
      'Aging infrastructure in Brooklin and downtown Whitby',
      'Settlement cracks in newer Taunton Road developments',
      'Lynde Creek watershed groundwater influence',
      'Clay soil throughout Durham Region',
      'Poor grading in older lots',
    ],
    seasonalRisks: 'Spring snowmelt (March–May) is peak season. Lynde Creek flooding events can affect nearby properties. Summer storms may overwhelm older drainage systems.',
    rebateInfo: 'Durham Region periodically offers subsidies. Contact the Town of Whitby for current basement flooding prevention programs.',
    faqs: [
      { question: 'How much does basement leak repair cost in Whitby?', answer: 'Whitby is approximately 10% less than Toronto. Crack injection: $225–$576/ft, interior drainage: $63–$216/ft, exterior waterproofing: $90–$270/ft.' },
      { question: 'Why does my Whitby basement leak?', answer: 'Aging drainage in older areas, settlement in newer builds, Lynde Creek proximity, and clay soil are common causes.' },
      { question: 'Are there rebates in Whitby?', answer: 'Durham Region periodically offers subsidies. Contact the Town of Whitby for current programs.' },
      { question: 'How long does leak repair take in Whitby?', answer: 'Crack injection: 1–2 hours. Interior drainage: 3–5 days. Exterior waterproofing: 5–10 days.' },
      { question: 'Do newer Whitby homes get leaks?', answer: 'Settlement cracks can appear in homes 3–10 years old. Crack injection fixes these effectively.' },
      { question: 'Is a sump pump needed in Whitby?', answer: 'Recommended for homes near Lynde Creek, low-lying areas, or any property with water history.' },
      { question: 'What\'s the most cost-effective repair in Whitby?', answer: 'Crack injection starting at $225/ft is the most affordable. Many Whitby homes just need 1–3 cracks addressed.' },
      { question: 'How do I prevent leaks in Whitby?', answer: 'Maintain gutters, ensure positive grading, test sump pump quarterly, and address cracks early.' },
      { question: 'Should I waterproof before renovating my Whitby basement?', answer: 'Always. Fix water issues first to protect your renovation investment.' },
      { question: 'How do I find a contractor in Whitby?', answer: 'Use RenoNext to browse verified waterproofing contractors serving Whitby with escrow protection.' },
    ],
    nearbyCities: ['oshawa', 'ajax', 'pickering', 'toronto'],
  },
  {
    slug: 'hamilton',
    city: 'Hamilton',
    region: 'City of Hamilton',
    metaTitle: 'Basement Leak Repair Hamilton 2026 | Fix Leaky Basement',
    metaDescription: 'Hamilton basement leak repair costs and methods. 10% below Toronto. Complete guide with warning signs and verified contractors.',
    heroTagline: 'Hamilton\'s revitalizing neighbourhoods need reliable waterproofing — affordable repairs protect your investment in one of the GTA\'s hottest markets.',
    cityContext: 'Hamilton\'s location between Lake Ontario and the Niagara Escarpment creates unique water challenges. The Mountain faces escarpment runoff while lower Hamilton deals with lakeside groundwater. Heritage neighbourhoods like Dundas and Westdale have some of the oldest housing stock in the GTA.',
    commonCauses: [
      'Niagara Escarpment runoff on the Mountain',
      'Lake Ontario groundwater in lower Hamilton',
      'Aging infrastructure in heritage districts (Dundas, Westdale)',
      'Combined sewer system in older areas',
      'Clay soil and poor drainage in north end',
    ],
    seasonalRisks: 'Hamilton faces dual risks: escarpment runoff during spring snowmelt and lakeside flooding during high water events. The March–May period is highest risk. Summer storms can cause flash flooding on the Mountain slopes.',
    rebateInfo: 'Hamilton\'s Protective Plumbing Program offers up to $2,750 for backwater valve and sump pump installation. Apply through Hamilton Water Division.',
    faqs: [
      { question: 'How much does basement leak repair cost in Hamilton?', answer: 'Hamilton is approximately 10% less than Toronto. Crack injection: $225–$576/ft, interior drainage: $63–$216/ft, exterior waterproofing: $90–$270/ft.' },
      { question: 'Why does my Hamilton basement leak?', answer: 'Escarpment runoff, lakeside groundwater, aging heritage infrastructure, combined sewers, and clay soil are common Hamilton causes.' },
      { question: 'What rebates does Hamilton offer?', answer: 'Hamilton\'s Protective Plumbing Program offers up to $2,750 for backwater valve and sump pump. Apply through Hamilton Water Division.' },
      { question: 'Are heritage Hamilton homes harder to waterproof?', answer: 'They may need more comprehensive solutions due to age, but interior systems work well. Heritage district rules may affect exterior modifications.' },
      { question: 'How long does leak repair take in Hamilton?', answer: 'Crack injection: 1–2 hours. Interior drainage: 3–5 days. Exterior waterproofing: 5–10 days.' },
      { question: 'Do Hamilton Mountain homes have leak issues?', answer: 'Yes. Escarpment runoff creates drainage challenges. Homes on sloped lots need good grading and drainage management.' },
      { question: 'Is a sump pump necessary in Hamilton?', answer: 'Highly recommended for both Mountain and lower Hamilton homes. Battery backup is important for storm-related outages.' },
      { question: 'Can I get a Hamilton basement leak fixed affordably?', answer: 'Yes. Hamilton\'s lower rates make professional repair accessible. Crack injection starts at just $225/ft.' },
      { question: 'How do I prevent basement leaks in Hamilton?', answer: 'Maintain gutters, ensure positive grading, install backwater valve, test sump pump quarterly, and monitor for cracks.' },
      { question: 'How do I find a contractor in Hamilton?', answer: 'Browse verified waterproofing contractors on RenoNext serving Hamilton with escrow protection and GPS verification.' },
    ],
    nearbyCities: ['burlington', 'oakville', 'milton', 'oshawa'],
  },
];

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------
export function getAllLeakRepairCitySlugs(): string[] {
  return cityData.map((c) => c.slug);
}

export function getCityLeakRepairData(slug: string): CityLeakRepairData | undefined {
  return cityData.find((c) => c.slug === slug);
}

export function getNearbyLeakRepairCities(slug: string): CityLeakRepairData[] {
  const data = getCityLeakRepairData(slug);
  if (!data) return [];
  return data.nearbyCities
    .map((s) => getCityLeakRepairData(s))
    .filter((c): c is CityLeakRepairData => c !== undefined);
}

export function getMethodPriceForCity(
  method: RepairMethod,
  citySlug: string,
): { min: number; max: number } {
  const city = getCityBySlug(citySlug);
  if (!city) return { min: method.basePriceMin, max: method.basePriceMax };
  return getCityAdjustedPrice(
    method.basePriceMin,
    method.basePriceMax,
    method.labourPct,
    method.materialPct,
    city,
  );
}
