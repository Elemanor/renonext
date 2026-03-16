/**
 * GTA Renovation Rebates & Incentives Data
 *
 * ~25 active programs across federal, provincial, regional, municipal, and utility levels.
 * Pure data file — no React imports.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type ProgramLevel = 'federal' | 'provincial' | 'regional' | 'municipal' | 'utility';
export type ProjectType = 'adu' | 'energy' | 'structural' | 'general';

export interface RebateProgram {
  id: string;
  name: string;
  level: ProgramLevel;
  adminBody: string;
  amount: string;
  maxValue: number;
  description: string;
  eligibility: string[];
  projectTypes: ProjectType[];
  coverage: string[] | 'all-ontario';
  applicationUrl: string;
  deadline?: string;
  status: 'active' | 'closed' | 'upcoming';
  stackable: boolean;
  notes?: string;
}

export interface CityRebateSummary {
  slug: string;
  city: string;
  region: string;
  metaTitle: string;
  metaDescription: string;
  heroTagline: string;
  highlights: string[];
  nearbyGuides: string[];
}

// ---------------------------------------------------------------------------
// Programs — Federal (4)
// ---------------------------------------------------------------------------
const federalPrograms: RebateProgram[] = [
  {
    id: 'mhrtc',
    name: 'Multigenerational Home Renovation Tax Credit',
    level: 'federal',
    adminBody: 'CRA (Canada Revenue Agency)',
    amount: 'Up to $7,500 refundable tax credit',
    maxValue: 7500,
    description:
      'A 15% refundable tax credit on up to $50,000 in eligible renovation expenses to create a secondary dwelling unit for a qualifying relative. The unit must be a self-contained suite with a private entrance, kitchen, and bathroom.',
    eligibility: [
      'Must create a self-contained secondary unit',
      'For a senior (65+) or adult with disability',
      'Must be a qualifying relative (parent, grandparent, child, sibling, etc.)',
      'Expenses claimed within 12 months of completion',
    ],
    projectTypes: ['adu'],
    coverage: 'all-ontario',
    applicationUrl: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/deductions-credits-expenses/multigenerational-home-renovation.html',
    status: 'active',
    stackable: true,
    notes: 'Claim on your annual tax return. One-time credit per qualifying renovation.',
  },
  {
    id: 'cmhc-refinance',
    name: 'CMHC Insured Refinancing for Secondary Suites',
    level: 'federal',
    adminBody: 'CMHC',
    amount: 'Refinance up to 90% of post-reno value',
    maxValue: 80000,
    description:
      'CMHC allows homeowners to refinance up to 90% of the improved value of their home (vs. 80% normally) when creating a legal secondary suite. On a $900K home, this unlocks up to $80,000+ in additional equity.',
    eligibility: [
      'Must create a self-contained secondary suite',
      'Suite must meet local building code and zoning',
      'Property must be owner-occupied',
      'Standard CMHC mortgage insurance qualification',
    ],
    projectTypes: ['adu'],
    coverage: 'all-ontario',
    applicationUrl: 'https://www.cmhc-schl.gc.ca/professionals/project-funding-and-mortgage-financing/mortgage-loan-insurance/mortgage-loan-insurance-homeownership/cmhc-secondary-suite',
    status: 'active',
    stackable: true,
    notes: 'Works through your mortgage lender. Not a grant — increased borrowing capacity.',
  },
  {
    id: 'hst-rebate',
    name: 'HST New Housing Rebate (Substantial Renovations)',
    level: 'federal',
    adminBody: 'CRA',
    amount: 'Up to $16,080 HST rebate',
    maxValue: 16080,
    description:
      'If your renovation is classified as "substantial" (90%+ of interior removed/replaced), you may qualify for the federal GST/HST new housing rebate. Combined federal + Ontario portions can return up to $16,080 in tax.',
    eligibility: [
      'Renovation must be "substantial" — 90%+ of interior removed',
      'Property must be primary residence after renovation',
      'Fair market value under $450,000 for full rebate',
      'Must file within 2 years of completion',
    ],
    projectTypes: ['adu', 'general'],
    coverage: 'all-ontario',
    applicationUrl: 'https://www.canada.ca/en/revenue-agency/services/forms-publications/publications/rc4028/gst-hst-new-housing-rebate.html',
    status: 'active',
    stackable: true,
    notes: 'Applies mainly to gut-renovation or full basement conversion projects.',
  },
  {
    id: 'greener-homes-2026',
    name: 'Canada Greener Homes Affordability Program',
    level: 'federal',
    adminBody: 'NRCan',
    amount: 'Up to $5,000 in grants (expected)',
    maxValue: 5000,
    description:
      'The successor to the Greener Homes Grant is expected to launch in 2026 with a focus on low-to-moderate income households. Covers insulation, heat pumps, windows, and air sealing upgrades.',
    eligibility: [
      'Income-qualified (details TBA)',
      'Must complete EnerGuide audit',
      'Eligible upgrades: insulation, heat pumps, windows, air sealing',
      'Primary residence only',
    ],
    projectTypes: ['energy'],
    coverage: 'all-ontario',
    applicationUrl: 'https://natural-resources.canada.ca/energy-efficiency/homes',
    status: 'upcoming',
    stackable: true,
    notes: 'Program details expected mid-2026. Register for updates.',
  },
];

// ---------------------------------------------------------------------------
// Programs — Provincial (5)
// ---------------------------------------------------------------------------
const provincialPrograms: RebateProgram[] = [
  {
    id: 'home-reno-savings',
    name: 'Home Renovation Savings Program',
    level: 'provincial',
    adminBody: 'Enbridge Gas / Save on Energy',
    amount: 'Up to $10,000+ in rebates',
    maxValue: 10000,
    description:
      'Ontario\'s main energy retrofit rebate program, delivered through Enbridge Gas and Save on Energy. Covers insulation, heat pumps, windows, air sealing, and smart thermostats. Extended through November 2026.',
    eligibility: [
      'Ontario homeowner with existing natural gas or electric heating',
      'Must complete pre- and post-retrofit EnerGuide evaluations',
      'Home must be primary residence',
      'Eligible upgrades: insulation, heat pumps, windows, air sealing, thermostats',
    ],
    projectTypes: ['energy'],
    coverage: 'all-ontario',
    applicationUrl: 'https://saveonenergy.ca/en/For-Your-Home/Home-Renovation-Savings',
    deadline: 'Extended to Nov 2026',
    status: 'active',
    stackable: true,
  },
  {
    id: 'ontario-secondary-suite',
    name: 'Ontario Secondary Suite Incentive',
    level: 'provincial',
    adminBody: 'Ontario Ministry of Municipal Affairs',
    amount: 'Up to $40,000 forgivable loan',
    maxValue: 40000,
    description:
      'A forgivable loan to help homeowners create a legal secondary suite (basement apartment, garden suite, or laneway house). The loan is forgiven if you rent the unit at or below average market rent for 15 years.',
    eligibility: [
      'Must create a new legal secondary suite',
      'Owner-occupied property',
      'Suite must meet Ontario Building Code',
      'Must maintain affordable rent for 15 years to have loan forgiven',
    ],
    projectTypes: ['adu'],
    coverage: 'all-ontario',
    applicationUrl: 'https://www.ontario.ca/page/ontario-secondary-suite-incentive-program',
    status: 'active',
    stackable: true,
    notes: 'Forgivable after 15 years of affordable rent. Pro-rated repayment if you sell early.',
  },
  {
    id: 'ontario-renovates',
    name: 'Ontario Renovates',
    level: 'provincial',
    adminBody: 'Ontario Ministry of Municipal Affairs',
    amount: 'Up to $25,000 forgivable loan',
    maxValue: 25000,
    description:
      'A forgivable loan for low-to-moderate income homeowners to make essential home repairs, accessibility modifications, or create a secondary suite. Delivered through local Service Managers.',
    eligibility: [
      'Low-to-moderate household income (varies by region)',
      'Must own and live in the property',
      'Home in need of essential repairs or accessibility upgrades',
      'Applied through your local Service Manager',
    ],
    projectTypes: ['adu', 'structural', 'general'],
    coverage: 'all-ontario',
    applicationUrl: 'https://www.ontario.ca/page/ontario-renovates',
    status: 'active',
    stackable: true,
    notes: 'Income thresholds vary by municipality. Contact your local Service Manager.',
  },
  {
    id: 'oil-to-heat-pump',
    name: 'Oil to Heat Pump Affordability (OHPA)',
    level: 'provincial',
    adminBody: 'NRCan / Ontario',
    amount: 'Up to $15,000',
    maxValue: 15000,
    description:
      'Covers the cost of switching from oil heating to an electric heat pump. Includes equipment, installation, and removal of oil tank. For homes currently heated by oil or propane.',
    eligibility: [
      'Home currently heated by oil or propane',
      'Must switch to an eligible heat pump system',
      'Owner-occupied primary residence',
      'Low-to-median household income (enhanced stream available)',
    ],
    projectTypes: ['energy'],
    coverage: 'all-ontario',
    applicationUrl: 'https://natural-resources.canada.ca/energy-efficiency/homes/canada-greener-homes-initiative/oil-to-heat-pump-affordability-program/25506',
    status: 'active',
    stackable: true,
  },
  {
    id: 'ontario-electricity-rebate',
    name: 'Ontario Electricity Rebate',
    level: 'provincial',
    adminBody: 'Ontario Energy Board',
    amount: '23.5% off electricity bills',
    maxValue: 1200,
    description:
      'An ongoing bill reduction of 23.5% applied automatically to residential electricity bills. Reduces the cost of running heat pumps, electric water heaters, and other energy-efficient systems.',
    eligibility: [
      'Automatic for all Ontario residential electricity customers',
      'Applied directly to your monthly bill',
      'No application required',
    ],
    projectTypes: ['energy'],
    coverage: 'all-ontario',
    applicationUrl: 'https://www.oeb.ca/consumer-information-and-protection/electricity-rates/ontario-electricity-rebate',
    status: 'active',
    stackable: true,
    notes: 'Automatic — no application needed. Reduces annual electricity costs by ~$400-$1,200.',
  },
];

// ---------------------------------------------------------------------------
// Programs — Regional (5)
// ---------------------------------------------------------------------------
const regionalPrograms: RebateProgram[] = [
  {
    id: 'peel-my-home',
    name: 'Peel "My Home" Second Unit Program',
    level: 'regional',
    adminBody: 'Region of Peel',
    amount: 'Up to $30,000 forgivable loan',
    maxValue: 30000,
    description:
      'Forgivable loan for homeowners in Mississauga and Brampton to create a legal secondary unit. Covers construction, permits, and inspections. Loan is forgiven after maintaining affordable rent for 15 years.',
    eligibility: [
      'Property in Mississauga or Brampton',
      'Must create a new legal secondary unit',
      'Owner-occupied property',
      'Must rent at or below average market rent for 15 years',
    ],
    projectTypes: ['adu'],
    coverage: ['mississauga', 'brampton'],
    applicationUrl: 'https://www.peelregion.ca/housing/second-unit/',
    status: 'active',
    stackable: true,
  },
  {
    id: 'durham-at-home',
    name: 'Durham At Home Second Unit Incentive',
    level: 'regional',
    adminBody: 'Durham Region',
    amount: 'Up to $25,000 forgivable loan',
    maxValue: 25000,
    description:
      'Forgivable loan for homeowners in Durham Region to create or legalize a secondary unit. Covers construction costs, permits, and professional fees. Available in Ajax, Pickering, Oshawa, and Whitby.',
    eligibility: [
      'Property in Durham Region (Ajax, Pickering, Oshawa, Whitby, Clarington)',
      'Must create or legalize a secondary unit',
      'Owner-occupied property',
      'Must maintain affordable rent',
    ],
    projectTypes: ['adu'],
    coverage: ['ajax', 'pickering', 'oshawa', 'whitby'],
    applicationUrl: 'https://www.durham.ca/en/living-here/second-units.aspx',
    status: 'active',
    stackable: true,
  },
  {
    id: 'halton-renovates',
    name: 'Halton Ontario Renovates',
    level: 'regional',
    adminBody: 'Halton Region',
    amount: 'Up to $25,000 forgivable loan',
    maxValue: 25000,
    description:
      'Delivered through Halton Region, this program provides forgivable loans for home repairs, accessibility modifications, and secondary suite creation. Available in Oakville, Burlington, Milton, and Halton Hills.',
    eligibility: [
      'Property in Halton Region',
      'Low-to-moderate household income',
      'Owner-occupied primary residence',
      'Home in need of essential repairs or creating secondary suite',
    ],
    projectTypes: ['adu', 'structural', 'general'],
    coverage: ['oakville', 'burlington', 'milton'],
    applicationUrl: 'https://www.halton.ca/For-Residents/Housing-Halton/Ontario-Renovates',
    status: 'active',
    stackable: true,
  },
  {
    id: 'york-housing-support',
    name: 'York Region Housing Support',
    level: 'regional',
    adminBody: 'York Region',
    amount: 'Up to $25,000 forgivable loan',
    maxValue: 25000,
    description:
      'York Region delivers Ontario Renovates funding for secondary suite creation, essential repairs, and accessibility modifications. Available in Vaughan, Markham, Richmond Hill, Aurora, and Newmarket.',
    eligibility: [
      'Property in York Region',
      'Low-to-moderate household income',
      'Owner-occupied primary residence',
      'Must create secondary unit or make essential repairs',
    ],
    projectTypes: ['adu', 'structural', 'general'],
    coverage: ['vaughan', 'markham', 'richmond-hill', 'aurora'],
    applicationUrl: 'https://www.york.ca/support/housing/renovating-your-home',
    status: 'active',
    stackable: true,
  },
  {
    id: 'halton-basement-flooding',
    name: 'Halton Basement Flooding Prevention Subsidy',
    level: 'regional',
    adminBody: 'Halton Region',
    amount: 'Up to $3,400 per property',
    maxValue: 3400,
    description:
      'Subsidy for homeowners in Halton Region to install backwater valves, sump pumps, and disconnecting downspouts to prevent basement flooding.',
    eligibility: [
      'Property in Halton Region (Oakville, Burlington, Milton, Halton Hills)',
      'Must install eligible flood-prevention measures',
      'Owner-occupied property',
    ],
    projectTypes: ['structural'],
    coverage: ['oakville', 'burlington', 'milton'],
    applicationUrl: 'https://www.halton.ca/For-Residents/Water-and-Environment/Basement-Flooding-Prevention',
    status: 'active',
    stackable: true,
  },
];

// ---------------------------------------------------------------------------
// Programs — Municipal (6)
// ---------------------------------------------------------------------------
const municipalPrograms: RebateProgram[] = [
  {
    id: 'toronto-help',
    name: 'Toronto Home Energy Loan Program (HELP)',
    level: 'municipal',
    adminBody: 'City of Toronto',
    amount: 'Up to $125,000 at ~3% interest',
    maxValue: 125000,
    description:
      'Low-interest financing for energy-efficient home improvements. Attached to your property tax bill — transfers if you sell. Covers insulation, windows, heat pumps, solar panels, EV chargers, and basement waterproofing.',
    eligibility: [
      'Property in City of Toronto',
      'Owner-occupied or rental property',
      'Must use approved contractor',
      'Repaid through property tax bill over up to 20 years',
    ],
    projectTypes: ['energy', 'structural'],
    coverage: ['toronto'],
    applicationUrl: 'https://www.toronto.ca/services-payments/water-environment/environmental-grants-incentives/home-energy-loan-program-help/',
    status: 'active',
    stackable: true,
    notes: 'Not a grant — low-interest loan repaid via property tax. Stays with the property.',
  },
  {
    id: 'toronto-basement-flooding',
    name: 'Toronto Basement Flooding Protection Subsidy',
    level: 'municipal',
    adminBody: 'City of Toronto',
    amount: 'Up to $3,400',
    maxValue: 3400,
    description:
      'Subsidy for Toronto homeowners to install a backwater valve ($1,250), sump pump ($1,750), and/or pipe severance ($400) to protect against basement flooding.',
    eligibility: [
      'Property in City of Toronto',
      'Owner-occupied residential property',
      'Must use licensed plumber',
      'Work must be inspected by the City',
    ],
    projectTypes: ['structural'],
    coverage: ['toronto'],
    applicationUrl: 'https://www.toronto.ca/services-payments/water-environment/managing-rain-melted-snow/basement-flooding/basement-flooding-protection-subsidy-program/',
    status: 'active',
    stackable: true,
  },
  {
    id: 'toronto-eco-roof',
    name: 'Toronto Eco-Roof Incentive Program',
    level: 'municipal',
    adminBody: 'City of Toronto',
    amount: 'Up to $100,000',
    maxValue: 100000,
    description:
      'Grants for green roofs ($100/m²) and cool roofs ($2-$5/m²) on residential and commercial buildings. Green roofs up to $100,000; cool roofs up to $50,000.',
    eligibility: [
      'Property in City of Toronto',
      'New green or cool roof installation',
      'Must meet City design standards',
      'Applications accepted annually',
    ],
    projectTypes: ['energy', 'general'],
    coverage: ['toronto'],
    applicationUrl: 'https://www.toronto.ca/services-payments/water-environment/environmental-grants-incentives/green-your-roof/',
    status: 'active',
    stackable: true,
  },
  {
    id: 'burlington-cip',
    name: 'Burlington Community Improvement Plan',
    level: 'municipal',
    adminBody: 'City of Burlington',
    amount: 'Permit fee waiver + forgivable loan',
    maxValue: 5000,
    description:
      'Burlington offers permit fee waivers and forgivable loans for creating legal secondary suites. Part of the city\'s intensification strategy to increase housing supply.',
    eligibility: [
      'Property in City of Burlington',
      'Must create a legal secondary suite',
      'Must meet Ontario Building Code',
      'Owner-occupied property',
    ],
    projectTypes: ['adu'],
    coverage: ['burlington'],
    applicationUrl: 'https://www.burlington.ca/en/services-for-you/secondary-dwelling-units.aspx',
    deadline: 'Through Dec 2026',
    status: 'active',
    stackable: true,
  },
  {
    id: 'whitby-fee-reimbursement',
    name: 'Whitby Secondary Suite Fee Reimbursement',
    level: 'municipal',
    adminBody: 'Town of Whitby',
    amount: 'Full permit fee reimbursement',
    maxValue: 4000,
    description:
      'Whitby reimburses the full building permit fee for homeowners creating a legal secondary suite. Aimed at increasing the rental housing supply in Durham Region.',
    eligibility: [
      'Property in Town of Whitby',
      'Must create a legal secondary suite',
      'Must obtain building permit and occupancy permit',
      'Owner-occupied property',
    ],
    projectTypes: ['adu'],
    coverage: ['whitby'],
    applicationUrl: 'https://www.whitby.ca/en/build/second-unit-registration.aspx',
    status: 'active',
    stackable: true,
  },
  {
    id: 'ajax-build-more',
    name: 'Ajax Build More Get More',
    level: 'municipal',
    adminBody: 'Town of Ajax',
    amount: 'Up to $12,000 ($4K/unit)',
    maxValue: 12000,
    description:
      'Ajax offers $4,000 per additional dwelling unit created, up to a maximum of $12,000 (3 units). Incentivizes gentle densification through basement apartments and garden suites.',
    eligibility: [
      'Property in Town of Ajax',
      'Must create 1-3 additional dwelling units',
      'Must obtain all required permits',
      'Owner-occupied property',
    ],
    projectTypes: ['adu'],
    coverage: ['ajax'],
    applicationUrl: 'https://www.ajax.ca/en/build-invest-grow/additional-residential-units.aspx',
    status: 'active',
    stackable: true,
  },
];

// ---------------------------------------------------------------------------
// Programs — Utility (4)
// ---------------------------------------------------------------------------
const utilityPrograms: RebateProgram[] = [
  {
    id: 'enbridge-home-efficiency',
    name: 'Enbridge Home Efficiency Rebate',
    level: 'utility',
    adminBody: 'Enbridge Gas',
    amount: 'Up to $5,000 in combined rebates',
    maxValue: 5000,
    description:
      'Rebates for insulation, windows, heat pumps, smart thermostats, and air sealing through Enbridge Gas. Part of the Home Renovation Savings Program. Requires pre- and post-retrofit EnerGuide evaluations.',
    eligibility: [
      'Enbridge Gas customer in Ontario',
      'Must complete EnerGuide pre- and post-evaluations',
      'Primary residence',
      'Eligible upgrades: insulation, windows, heat pumps, thermostats',
    ],
    projectTypes: ['energy'],
    coverage: 'all-ontario',
    applicationUrl: 'https://www.enbridgegas.com/residential/rebates-energy-conservation/home-efficiency-rebate',
    status: 'active',
    stackable: true,
    notes: 'Part of the Home Renovation Savings Program. Often bundled with provincial rebates.',
  },
  {
    id: 'save-on-energy-reno',
    name: 'Save on Energy Home Renovation Savings',
    level: 'utility',
    adminBody: 'IESO / Save on Energy',
    amount: 'Up to $5,000 in combined rebates',
    maxValue: 5000,
    description:
      'Provincial electricity conservation program offering rebates on insulation, heat pumps, windows, and air sealing for electrically-heated homes. Delivered through local utilities.',
    eligibility: [
      'Ontario residential electricity customer',
      'Home with electric heating (no natural gas)',
      'Must complete EnerGuide evaluations',
      'Primary residence',
    ],
    projectTypes: ['energy'],
    coverage: 'all-ontario',
    applicationUrl: 'https://saveonenergy.ca/en/For-Your-Home/Home-Renovation-Savings',
    status: 'active',
    stackable: true,
  },
  {
    id: 'toronto-hydro-peak-perks',
    name: 'Toronto Hydro peaksaver PLUS / Peak Perks',
    level: 'utility',
    adminBody: 'Toronto Hydro',
    amount: '$75-$95 in rewards',
    maxValue: 95,
    description:
      'Enroll your smart thermostat or AC in demand response events during peak summer periods. Earn $75-$95 in bill credits for allowing brief temperature adjustments.',
    eligibility: [
      'Toronto Hydro residential customer',
      'Must have central AC or smart thermostat',
      'Enroll online — automated participation',
    ],
    projectTypes: ['energy'],
    coverage: ['toronto'],
    applicationUrl: 'https://www.torontohydro.com/for-home/peaksaver',
    status: 'active',
    stackable: true,
  },
  {
    id: 'home-winterproofing',
    name: 'Home Winterproofing Program',
    level: 'utility',
    adminBody: 'Enbridge Gas / Save on Energy',
    amount: 'Free upgrades (income-qualified)',
    maxValue: 5000,
    description:
      'Free energy upgrades for income-qualified homeowners and renters, including insulation, draftproofing, smart thermostats, LED lighting, and in some cases a new furnace or heat pump.',
    eligibility: [
      'Low-income Ontario household (income thresholds vary)',
      'Must be primary residence',
      'Homeowners and renters eligible',
      'Free in-home assessment included',
    ],
    projectTypes: ['energy'],
    coverage: 'all-ontario',
    applicationUrl: 'https://saveonenergy.ca/en/For-Your-Home/Home-Winterproofing',
    status: 'active',
    stackable: true,
    notes: 'Income-qualified: no out-of-pocket cost for eligible households.',
  },
];

// ---------------------------------------------------------------------------
// Combined programs list
// ---------------------------------------------------------------------------
export const allPrograms: RebateProgram[] = [
  ...federalPrograms,
  ...provincialPrograms,
  ...regionalPrograms,
  ...municipalPrograms,
  ...utilityPrograms,
];

// ---------------------------------------------------------------------------
// City Rebate Summaries — 15 GTA cities
// ---------------------------------------------------------------------------
export const cityRebateSummaries: CityRebateSummary[] = [
  {
    slug: 'toronto',
    city: 'Toronto',
    region: 'Toronto',
    metaTitle: 'Toronto Renovation Rebates & Incentives 2026 | Up to $175K+ in Savings | RenoNext',
    metaDescription: 'Complete guide to Toronto renovation rebates in 2026. Stack federal, provincial, and municipal programs for up to $175K+ in savings. HELP loans, basement flooding subsidies, eco-roof incentives, and more.',
    heroTagline: 'Toronto homeowners can access more renovation incentives than any other GTA city — up to $175K+ when you stack federal, provincial, and municipal programs.',
    highlights: [
      '$125K HELP loan at ~3% through property taxes',
      '$40K forgivable provincial secondary suite loan',
      'Eco-roof incentive up to $100K for green roofs',
    ],
    nearbyGuides: ['mississauga', 'markham', 'vaughan', 'pickering', 'ajax'],
  },
  {
    slug: 'mississauga',
    city: 'Mississauga',
    region: 'Peel',
    metaTitle: 'Mississauga Renovation Rebates & Incentives 2026 | Up to $130K+ | RenoNext',
    metaDescription: 'Mississauga renovation rebates: Peel "My Home" program, federal tax credits, provincial grants. Stack incentives for up to $130K+ in savings on your next project.',
    heroTagline: 'Mississauga homeowners benefit from Peel Region\'s generous "My Home" program plus federal and provincial stacking — up to $130K+ in combined savings.',
    highlights: [
      '$30K forgivable loan through Peel "My Home" program',
      '$40K provincial secondary suite incentive',
      'Stack with federal $7,500 tax credit + CMHC refinancing',
    ],
    nearbyGuides: ['toronto', 'brampton', 'oakville', 'burlington', 'vaughan'],
  },
  {
    slug: 'brampton',
    city: 'Brampton',
    region: 'Peel',
    metaTitle: 'Brampton Renovation Rebates & Incentives 2026 | Up to $130K+ | RenoNext',
    metaDescription: 'Brampton renovation incentives: Peel "My Home" forgivable loans, Ontario secondary suite grants, federal tax credits. Stack programs for $130K+ in potential savings.',
    heroTagline: 'Brampton is one of the GTA\'s best cities for renovation incentives — Peel Region\'s "My Home" program stacks with provincial and federal grants.',
    highlights: [
      '$30K forgivable loan through Peel "My Home" program',
      'Ontario Secondary Suite Incentive — $40K forgivable',
      'Multigenerational Tax Credit — $7,500 refundable',
    ],
    nearbyGuides: ['mississauga', 'vaughan', 'toronto'],
  },
  {
    slug: 'vaughan',
    city: 'Vaughan',
    region: 'York',
    metaTitle: 'Vaughan Renovation Rebates & Incentives 2026 | Up to $120K+ | RenoNext',
    metaDescription: 'Vaughan renovation rebates: York Region housing support, Ontario grants, federal tax credits. Access up to $120K+ in stacked renovation incentives.',
    heroTagline: 'Vaughan homeowners can leverage York Region housing programs plus provincial and federal incentives — over $120K+ in potential savings.',
    highlights: [
      'York Region housing support — up to $25K forgivable',
      '$40K provincial secondary suite incentive',
      'CMHC refinancing unlocks $80K+ in equity',
    ],
    nearbyGuides: ['markham', 'richmond-hill', 'toronto', 'brampton'],
  },
  {
    slug: 'markham',
    city: 'Markham',
    region: 'York',
    metaTitle: 'Markham Renovation Rebates & Incentives 2026 | Up to $120K+ | RenoNext',
    metaDescription: 'Markham renovation rebates: York Region support, provincial forgivable loans, federal tax credits. Stack incentives for up to $120K+ in savings.',
    heroTagline: 'Markham\'s strong housing values make renovation incentives especially powerful — access $120K+ through York Region, provincial, and federal programs.',
    highlights: [
      'York Region housing support — up to $25K forgivable',
      'Ontario Renovates — up to $25K for essential repairs',
      'Federal multigenerational tax credit — $7,500',
    ],
    nearbyGuides: ['vaughan', 'richmond-hill', 'toronto', 'pickering', 'ajax'],
  },
  {
    slug: 'richmond-hill',
    city: 'Richmond Hill',
    region: 'York',
    metaTitle: 'Richmond Hill Renovation Rebates 2026 | Up to $120K+ | RenoNext',
    metaDescription: 'Richmond Hill renovation incentives: York Region housing loans, provincial secondary suite grants, federal tax credits. Up to $120K+ in stacked savings.',
    heroTagline: 'Richmond Hill homeowners can access York Region plus provincial and federal renovation incentives — up to $120K+ in combined support.',
    highlights: [
      'York Region housing support — up to $25K',
      '$40K Ontario secondary suite incentive',
      'Home Renovation Savings Program — $10K+ for energy',
    ],
    nearbyGuides: ['markham', 'vaughan', 'aurora', 'toronto'],
  },
  {
    slug: 'aurora',
    city: 'Aurora',
    region: 'York',
    metaTitle: 'Aurora Renovation Rebates & Incentives 2026 | Up to $120K+ | RenoNext',
    metaDescription: 'Aurora renovation rebates: York Region housing programs, Ontario grants, federal incentives. Up to $120K+ in stacked savings for your renovation project.',
    heroTagline: 'Aurora residents can stack York Region, provincial, and federal programs for up to $120K+ in renovation savings.',
    highlights: [
      'York Region housing support — up to $25K forgivable',
      'Provincial energy rebates — up to $10K',
      'Federal CMHC refinancing — unlock $80K+ equity',
    ],
    nearbyGuides: ['richmond-hill', 'markham', 'vaughan'],
  },
  {
    slug: 'oakville',
    city: 'Oakville',
    region: 'Halton',
    metaTitle: 'Oakville Renovation Rebates & Incentives 2026 | Up to $125K+ | RenoNext',
    metaDescription: 'Oakville renovation rebates: Halton Ontario Renovates, basement flooding subsidy, provincial grants, federal tax credits. Up to $125K+ in combined incentives.',
    heroTagline: 'Oakville homeowners benefit from Halton Region programs plus provincial and federal stacking — up to $125K+ in renovation incentives.',
    highlights: [
      'Halton Ontario Renovates — $25K forgivable loan',
      'Basement flooding prevention — $3,400 subsidy',
      'Stack with $40K provincial + $7.5K federal',
    ],
    nearbyGuides: ['burlington', 'mississauga', 'milton', 'toronto'],
  },
  {
    slug: 'burlington',
    city: 'Burlington',
    region: 'Halton',
    metaTitle: 'Burlington Renovation Rebates & Incentives 2026 | Up to $130K+ | RenoNext',
    metaDescription: 'Burlington renovation incentives: CIP forgivable loans, Halton programs, provincial grants, federal tax credits. Up to $130K+ in stacked savings.',
    heroTagline: 'Burlington offers its own CIP incentive plus Halton Region programs — stack with provincial and federal grants for $130K+ in potential savings.',
    highlights: [
      'Burlington CIP — permit fee waiver + forgivable loan',
      'Halton Ontario Renovates — $25K forgivable',
      'Ontario Secondary Suite Incentive — $40K forgivable',
    ],
    nearbyGuides: ['oakville', 'milton', 'mississauga'],
  },
  {
    slug: 'milton',
    city: 'Milton',
    region: 'Halton',
    metaTitle: 'Milton Renovation Rebates & Incentives 2026 | Up to $120K+ | RenoNext',
    metaDescription: 'Milton renovation rebates: Halton Region programs, provincial grants, federal tax credits. Access up to $120K+ in stacked incentives for your renovation.',
    heroTagline: 'Milton homeowners can access Halton Region incentives plus provincial and federal programs — up to $120K+ in combined renovation savings.',
    highlights: [
      'Halton Ontario Renovates — $25K forgivable loan',
      'Basement flooding prevention subsidy — $3,400',
      'Provincial energy rebates — up to $10K',
    ],
    nearbyGuides: ['oakville', 'burlington', 'brampton', 'mississauga'],
  },
  {
    slug: 'ajax',
    city: 'Ajax',
    region: 'Durham',
    metaTitle: 'Ajax Renovation Rebates & Incentives 2026 | Up to $135K+ | RenoNext',
    metaDescription: 'Ajax renovation rebates: Build More Get More, Durham At Home, provincial grants, federal tax credits. Up to $135K+ in stacked incentives.',
    heroTagline: 'Ajax stands out with its "Build More Get More" program plus Durham Region support — stack with provincial and federal programs for $135K+.',
    highlights: [
      'Ajax Build More Get More — $4K/unit, max $12K',
      'Durham At Home — $25K forgivable loan',
      'Stack with $40K provincial + $7.5K federal',
    ],
    nearbyGuides: ['pickering', 'whitby', 'oshawa', 'toronto', 'markham'],
  },
  {
    slug: 'pickering',
    city: 'Pickering',
    region: 'Durham',
    metaTitle: 'Pickering Renovation Rebates & Incentives 2026 | Up to $120K+ | RenoNext',
    metaDescription: 'Pickering renovation incentives: Durham At Home program, provincial grants, federal tax credits. Stack programs for up to $120K+ in savings.',
    heroTagline: 'Pickering homeowners can access Durham Region\'s At Home program plus provincial and federal renovation incentives — $120K+ in combined support.',
    highlights: [
      'Durham At Home — up to $25K forgivable loan',
      'Ontario Secondary Suite Incentive — $40K forgivable',
      'Federal CMHC refinancing — unlock $80K+ equity',
    ],
    nearbyGuides: ['ajax', 'toronto', 'markham', 'whitby'],
  },
  {
    slug: 'oshawa',
    city: 'Oshawa',
    region: 'Durham',
    metaTitle: 'Oshawa Renovation Rebates & Incentives 2026 | Up to $120K+ | RenoNext',
    metaDescription: 'Oshawa renovation rebates: Durham At Home incentive, Ontario grants, federal tax credits. Access up to $120K+ in stacked renovation savings.',
    heroTagline: 'Oshawa offers some of the most affordable housing in the GTA — stretch your budget further with $120K+ in stacked renovation incentives.',
    highlights: [
      'Durham At Home — up to $25K forgivable loan',
      'Ontario Renovates — $25K for essential repairs',
      'Energy rebates reduce ongoing costs by $2K+/year',
    ],
    nearbyGuides: ['whitby', 'ajax', 'pickering'],
  },
  {
    slug: 'whitby',
    city: 'Whitby',
    region: 'Durham',
    metaTitle: 'Whitby Renovation Rebates & Incentives 2026 | Up to $125K+ | RenoNext',
    metaDescription: 'Whitby renovation incentives: fee reimbursement, Durham At Home, provincial grants, federal tax credits. Stack for up to $125K+ in savings.',
    heroTagline: 'Whitby is one of the few GTA cities offering full permit fee reimbursement for secondary suites — plus regional, provincial, and federal stacking.',
    highlights: [
      'Whitby fee reimbursement — full permit fees back',
      'Durham At Home — $25K forgivable loan',
      'Ontario Secondary Suite Incentive — $40K forgivable',
    ],
    nearbyGuides: ['ajax', 'oshawa', 'pickering'],
  },
  {
    slug: 'hamilton',
    city: 'Hamilton',
    region: 'Hamilton',
    metaTitle: 'Hamilton Renovation Rebates & Incentives 2026 | Up to $115K+ | RenoNext',
    metaDescription: 'Hamilton renovation rebates: provincial grants, federal tax credits, energy rebates. Access up to $115K+ in stacked renovation incentives.',
    heroTagline: 'Hamilton homeowners can access provincial and federal renovation incentives — up to $115K+ in combined savings with energy and secondary suite programs.',
    highlights: [
      'Ontario Secondary Suite Incentive — $40K forgivable',
      'Home Renovation Savings Program — up to $10K',
      'CMHC refinancing — unlock $80K+ in equity',
    ],
    nearbyGuides: ['burlington', 'oakville', 'milton'],
  },
];

// ---------------------------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------------------------

/** Get all programs available in a specific city */
export function getProgramsByCity(citySlug: string): RebateProgram[] {
  return allPrograms.filter((p) => {
    if (p.status === 'closed') return false;
    if (p.coverage === 'all-ontario') return true;
    return p.coverage.includes(citySlug);
  });
}

/** Get all programs for a specific project type */
export function getProgramsByProjectType(type: ProjectType): RebateProgram[] {
  return allPrograms.filter(
    (p) => p.status !== 'closed' && p.projectTypes.includes(type)
  );
}

/** Get city rebate summary by slug */
export function getCityRebateSummary(slug: string): CityRebateSummary | undefined {
  return cityRebateSummaries.find((c) => c.slug === slug);
}

/** Calculate max potential savings for a city + project types combo */
export function calculateMaxSavings(
  citySlug: string,
  projectTypes: ProjectType[]
): number {
  const cityPrograms = getProgramsByCity(citySlug);
  const matching = cityPrograms.filter((p) =>
    p.projectTypes.some((pt) => projectTypes.includes(pt))
  );

  // Deduplicate: home-reno-savings and enbridge-home-efficiency overlap
  const seen = new Set<string>();
  let total = 0;

  for (const p of matching) {
    // Skip if we've already counted the overlapping program
    if (p.id === 'enbridge-home-efficiency' && seen.has('home-reno-savings')) continue;
    if (p.id === 'home-reno-savings' && seen.has('enbridge-home-efficiency')) continue;
    if (p.id === 'save-on-energy-reno' && seen.has('home-reno-savings')) continue;

    seen.add(p.id);
    total += p.maxValue;
  }

  return total;
}

/** Get programs grouped by level */
export function getProgramsByLevel(programs: RebateProgram[]): Record<ProgramLevel, RebateProgram[]> {
  const groups: Record<ProgramLevel, RebateProgram[]> = {
    federal: [],
    provincial: [],
    regional: [],
    municipal: [],
    utility: [],
  };

  for (const p of programs) {
    groups[p.level].push(p);
  }

  return groups;
}

/** Human-readable level label */
export function getLevelLabel(level: ProgramLevel): string {
  const labels: Record<ProgramLevel, string> = {
    federal: 'Federal',
    provincial: 'Provincial',
    regional: 'Regional',
    municipal: 'Municipal',
    utility: 'Utility',
  };
  return labels[level];
}

/** Level badge color classes */
export function getLevelColor(level: ProgramLevel): string {
  const colors: Record<ProgramLevel, string> = {
    federal: 'bg-red-100 text-red-800',
    provincial: 'bg-blue-100 text-blue-800',
    regional: 'bg-purple-100 text-purple-800',
    municipal: 'bg-amber-100 text-amber-800',
    utility: 'bg-teal-100 text-teal-800',
  };
  return colors[level];
}
