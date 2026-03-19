/**
 * Contract Templates & Data for RenoNext
 * Pure data file for Ontario renovation contracts
 */

// ============================================================================
// Types & Interfaces
// ============================================================================

export interface Milestone {
  name: string;
  percentOfTotal: number;
  description: string;
  requiresInspection: boolean;
}

export interface WarrantyItem {
  item: string;
  labourYears: number;
  materialYears: number;
}

export interface ContractTemplate {
  serviceSlug: string;
  serviceName: string;
  category: 'structural' | 'trades' | 'building' | 'professional';
  defaultMilestones: Milestone[];
  warrantyDefaults: WarrantyItem[];
  commonExclusions: string[];
  requiredPermits: string[];
  requiresEngineering: boolean;
  insuranceMinimum: string;
  wsibRequired: boolean;
}

export interface MilestoneSchedule {
  name: string;
  percentage: number;
  amount: number;
  description: string;
  requiresInspection?: boolean;
}

export interface ContractFormData {
  projectAddress: string;
  propertyType: 'detached' | 'semi' | 'townhouse' | 'condo';
  squareFeet?: number;
  workDescription: string;
  homeowner: {
    fullName: string;
    address: string;
    phone: string;
    email: string;
  };
  contractor: {
    businessName: string;
    address: string;
    phone: string;
    email: string;
    wsibNumber: string;
    insurancePolicy: string;
  };
  totalPrice: number;
  milestones: MilestoneSchedule[];
  startDate: string;
  completionDate: string;
  warrantyTerms: string;
  changeOrderPolicy: string;
  disputeResolution: string;
  permitResponsibility: 'contractor' | 'homeowner';
  materialSubstitution: string;
}

export interface ContractSection {
  title: string;
  content: string;
}

// ============================================================================
// Contract Templates Data
// ============================================================================

export const contractTemplates: ContractTemplate[] = [
  {
    serviceSlug: 'underpinning',
    serviceName: 'Underpinning',
    category: 'structural',
    defaultMilestones: [
      {
        name: 'Engineering & Design',
        percentOfTotal: 10,
        description: 'Structural engineering report complete, drawings approved, shoring plan finalized',
        requiresInspection: true,
      },
      {
        name: 'Excavation',
        percentOfTotal: 25,
        description: 'All excavation complete, foundation exposed, soil conditions verified',
        requiresInspection: true,
      },
      {
        name: 'Concrete Pour',
        percentOfTotal: 30,
        description: 'New footings and walls poured, reinforcement installed, municipal inspection passed',
        requiresInspection: true,
      },
      {
        name: 'Curing & Waterproofing',
        percentOfTotal: 20,
        description: 'Concrete fully cured, waterproofing membrane applied, drainage system installed',
        requiresInspection: true,
      },
      {
        name: 'Backfill & Restoration',
        percentOfTotal: 15,
        description: 'Backfilling complete, grading restored, site cleaned, final inspection passed',
        requiresInspection: true,
      },
    ],
    warrantyDefaults: [
      {
        item: 'Structural work (footings, walls)',
        labourYears: 10,
        materialYears: 999, // Lifetime
      },
      {
        item: 'Waterproofing membrane',
        labourYears: 5,
        materialYears: 25,
      },
    ],
    commonExclusions: [
      'Landscaping restoration beyond basic grading',
      'Interior finishing work or basement renovation',
      'Furniture or contents removal and storage',
      'Electrical or plumbing work not directly related to underpinning',
      'Unforeseen soil contamination or archaeological discoveries',
    ],
    requiredPermits: ['Building permit', 'Shoring permit'],
    requiresEngineering: true,
    insuranceMinimum: '$2M CGL',
    wsibRequired: true,
  },
  {
    serviceSlug: 'waterproofing',
    serviceName: 'Waterproofing',
    category: 'structural',
    defaultMilestones: [
      {
        name: 'Excavation & Exposure',
        percentOfTotal: 25,
        description: 'Foundation walls fully exposed, old drainage removed, surface cleaned and prepared',
        requiresInspection: true,
      },
      {
        name: 'Membrane & Coating',
        percentOfTotal: 30,
        description: 'Waterproofing membrane applied, protection board installed, joints sealed',
        requiresInspection: true,
      },
      {
        name: 'Drainage System',
        percentOfTotal: 25,
        description: 'Weeping tile installed, gravel backfill placed, sump connection complete',
        requiresInspection: true,
      },
      {
        name: 'Backfill & Grading',
        percentOfTotal: 20,
        description: 'Backfilling complete, final grading sloped away from foundation, site cleaned',
        requiresInspection: false,
      },
    ],
    warrantyDefaults: [
      {
        item: 'Waterproofing membrane and application',
        labourYears: 5,
        materialYears: 25,
      },
      {
        item: 'Drainage system (weeping tile, connections)',
        labourYears: 5,
        materialYears: 10,
      },
    ],
    commonExclusions: [
      'Landscaping restoration beyond basic grading',
      'Interior drywall repair or painting',
      'Sump pump supply and installation (unless specifically included)',
      'Window well installation or replacement',
      'Downspout disconnection or municipal permits',
    ],
    requiredPermits: ['Building permit (if structural work involved)'],
    requiresEngineering: false,
    insuranceMinimum: '$2M CGL',
    wsibRequired: true,
  },
  {
    serviceSlug: 'foundation-repair',
    serviceName: 'Foundation Repair',
    category: 'structural',
    defaultMilestones: [
      {
        name: 'Assessment & Engineering',
        percentOfTotal: 15,
        description: 'Structural engineer report complete, repair method approved, permits obtained',
        requiresInspection: true,
      },
      {
        name: 'Structural Repair',
        percentOfTotal: 35,
        description: 'Crack injection or structural reinforcement complete, municipal inspection passed',
        requiresInspection: true,
      },
      {
        name: 'Curing Period',
        percentOfTotal: 25,
        description: 'Repair materials fully cured, monitoring period complete, no new movement detected',
        requiresInspection: true,
      },
      {
        name: 'Surface Restoration',
        percentOfTotal: 25,
        description: 'Surface finishing complete, site cleaned, final inspection passed',
        requiresInspection: false,
      },
    ],
    warrantyDefaults: [
      {
        item: 'Structural repair (carbon fiber, steel, helical piers)',
        labourYears: 10,
        materialYears: 999, // Lifetime
      },
      {
        item: 'Crack injection (epoxy or polyurethane)',
        labourYears: 5,
        materialYears: 10,
      },
    ],
    commonExclusions: [
      'Interior finishing, drywall repair, or painting',
      'Unrelated plumbing or electrical work',
      'Foundation issues caused by future settling or soil movement',
      'Landscaping or exterior grading adjustments',
      'Structural issues not identified in original engineering report',
    ],
    requiredPermits: ['Building permit', "Engineer's letter"],
    requiresEngineering: true,
    insuranceMinimum: '$2M CGL',
    wsibRequired: true,
  },
  {
    serviceSlug: 'basement-second-unit',
    serviceName: 'Basement Second Unit',
    category: 'building',
    defaultMilestones: [
      {
        name: 'Demolition & Prep',
        percentOfTotal: 10,
        description: 'Existing finishes removed, space cleared, protection installed, waste removed',
        requiresInspection: false,
      },
      {
        name: 'Structural & Framing',
        percentOfTotal: 20,
        description: 'Load-bearing assessments complete, framing installed, fire-rated assemblies built',
        requiresInspection: true,
      },
      {
        name: 'Rough-In (MEP)',
        percentOfTotal: 20,
        description: 'Plumbing, electrical, HVAC rough-in complete, separate entrance framed',
        requiresInspection: true,
      },
      {
        name: 'Inspections & Insulation',
        percentOfTotal: 15,
        description: 'All rough-in inspections passed, insulation and vapour barrier installed',
        requiresInspection: true,
      },
      {
        name: 'Finishes & Fixtures',
        percentOfTotal: 25,
        description: 'Drywall, flooring, kitchen, bathroom complete, trim and paint finished',
        requiresInspection: false,
      },
      {
        name: 'Final Inspection & Cleanup',
        percentOfTotal: 10,
        description: 'Final building inspection passed, occupancy permit issued, unit ready for tenant',
        requiresInspection: true,
      },
    ],
    warrantyDefaults: [
      {
        item: 'General workmanship (framing, drywall, trim)',
        labourYears: 2,
        materialYears: 5,
      },
      {
        item: 'Plumbing installation and fixtures',
        labourYears: 2,
        materialYears: 5,
      },
      {
        item: 'Electrical installation and devices',
        labourYears: 2,
        materialYears: 5,
      },
    ],
    commonExclusions: [
      'Appliances (fridge, stove, washer/dryer) unless specifically included',
      'Furniture, window coverings, or tenant move-in coordination',
      'Ongoing tenant relations or property management',
      'Parking pad or additional driveway construction',
      'Municipal development charges or Section 37 fees',
    ],
    requiredPermits: [
      'Building permit',
      'Plumbing permit',
      'Electrical permit',
      'HVAC permit',
      'Fire separation certificate',
    ],
    requiresEngineering: true,
    insuranceMinimum: '$2M CGL',
    wsibRequired: true,
  },
  {
    serviceSlug: 'kitchen-renovation',
    serviceName: 'Kitchen Renovation',
    category: 'building',
    defaultMilestones: [
      {
        name: 'Demolition',
        percentOfTotal: 10,
        description: 'Old cabinets, countertops, and fixtures removed, waste hauled, protection installed',
        requiresInspection: false,
      },
      {
        name: 'Rough-In (Plumbing & Electrical)',
        percentOfTotal: 20,
        description: 'Plumbing and electrical relocated/upgraded, wall modifications complete, inspections passed',
        requiresInspection: true,
      },
      {
        name: 'Cabinet Installation',
        percentOfTotal: 30,
        description: 'All cabinets installed, leveled, secured, crown molding and trim complete',
        requiresInspection: false,
      },
      {
        name: 'Countertops & Fixtures',
        percentOfTotal: 25,
        description: 'Countertops templated and installed, sink/faucet connected, backsplash complete',
        requiresInspection: false,
      },
      {
        name: 'Final Details & Cleanup',
        percentOfTotal: 15,
        description: 'Hardware installed, touch-up paint complete, final cleaning, walkthrough complete',
        requiresInspection: false,
      },
    ],
    warrantyDefaults: [
      {
        item: 'Cabinetry installation and adjustments',
        labourYears: 2,
        materialYears: 5,
      },
      {
        item: 'Countertops (quartz, granite, or laminate)',
        labourYears: 2,
        materialYears: 10,
      },
      {
        item: 'Plumbing fixtures and connections',
        labourYears: 2,
        materialYears: 5,
      },
    ],
    commonExclusions: [
      'Appliances (fridge, stove, dishwasher, microwave) unless specifically included',
      'Dining furniture, chairs, or decorative items',
      'Window treatments or wall art',
      'Flooring replacement (unless specifically included)',
      'Structural modifications beyond scope (e.g., removing load-bearing walls)',
    ],
    requiredPermits: [
      'Building permit (if structural work involved)',
      'Plumbing permit',
      'Electrical permit',
    ],
    requiresEngineering: false,
    insuranceMinimum: '$2M CGL',
    wsibRequired: true,
  },
  {
    serviceSlug: 'bathroom-renovation',
    serviceName: 'Bathroom Renovation',
    category: 'building',
    defaultMilestones: [
      {
        name: 'Demolition & Prep',
        percentOfTotal: 15,
        description: 'Old fixtures, tile, and vanity removed, subfloor assessed, waste removed',
        requiresInspection: false,
      },
      {
        name: 'Plumbing & Tile',
        percentOfTotal: 35,
        description: 'Plumbing rough-in complete, waterproofing installed, tile work finished, grout cured',
        requiresInspection: true,
      },
      {
        name: 'Fixtures & Vanity',
        percentOfTotal: 30,
        description: 'Vanity, toilet, shower/tub fixtures installed, connections tested, no leaks',
        requiresInspection: false,
      },
      {
        name: 'Final Details & Cleanup',
        percentOfTotal: 20,
        description: 'Paint, trim, accessories complete, final cleaning, walkthrough complete',
        requiresInspection: false,
      },
    ],
    warrantyDefaults: [
      {
        item: 'Tile work (walls and floors)',
        labourYears: 2,
        materialYears: 5,
      },
      {
        item: 'Plumbing installation and fixtures',
        labourYears: 2,
        materialYears: 5,
      },
      {
        item: 'Waterproofing (shower pan and walls)',
        labourYears: 5,
        materialYears: 10,
      },
    ],
    commonExclusions: [
      'Towels, bath mats, and decorative accessories',
      'Mirrors (unless specifically included in scope)',
      'Heated floors or towel warmers (unless specifically included)',
      'Structural modifications beyond scope',
      'Ventilation fan upgrade (unless specifically included)',
    ],
    requiredPermits: ['Plumbing permit', 'Electrical permit (if rewiring)'],
    requiresEngineering: false,
    insuranceMinimum: '$2M CGL',
    wsibRequired: true,
  },
  {
    serviceSlug: 'home-addition',
    serviceName: 'Home Addition',
    category: 'building',
    defaultMilestones: [
      {
        name: 'Foundation & Footings',
        percentOfTotal: 15,
        description: 'Excavation complete, footings poured, foundation walls complete, inspection passed',
        requiresInspection: true,
      },
      {
        name: 'Framing & Sheathing',
        percentOfTotal: 20,
        description: 'Floor, wall, and roof framing complete, sheathing installed, building envelope closed',
        requiresInspection: true,
      },
      {
        name: 'Rough-In (MEP)',
        percentOfTotal: 20,
        description: 'Plumbing, electrical, HVAC rough-in complete, all inspections passed',
        requiresInspection: true,
      },
      {
        name: 'Exterior & Roofing',
        percentOfTotal: 15,
        description: 'Roofing, siding, windows, and doors installed, exterior weatherproofed',
        requiresInspection: false,
      },
      {
        name: 'Interior Finishes',
        percentOfTotal: 20,
        description: 'Insulation, drywall, flooring, trim, paint complete, fixtures installed',
        requiresInspection: false,
      },
      {
        name: 'Final Inspection & Handover',
        percentOfTotal: 10,
        description: 'Final building inspection passed, occupancy permit issued, punch list complete',
        requiresInspection: true,
      },
    ],
    warrantyDefaults: [
      {
        item: 'Structural work (foundation, framing)',
        labourYears: 5,
        materialYears: 10,
      },
      {
        item: 'Roofing (shingles or membrane)',
        labourYears: 5,
        materialYears: 25,
      },
      {
        item: 'Windows and doors',
        labourYears: 2,
        materialYears: 10,
      },
    ],
    commonExclusions: [
      'Landscaping restoration or new landscaping design',
      'Furnishing, window treatments, or decorative items',
      'Appliances (unless specifically included)',
      'HVAC system upgrades beyond addition requirements',
      'Zoning variances or Committee of Adjustment fees',
    ],
    requiredPermits: [
      'Building permit',
      'Grading permit',
      'Plumbing permit',
      'Electrical permit',
    ],
    requiresEngineering: true,
    insuranceMinimum: '$2M CGL',
    wsibRequired: true,
  },
  {
    serviceSlug: 'electrical',
    serviceName: 'Electrical',
    category: 'trades',
    defaultMilestones: [
      {
        name: 'Rough-In & Wiring',
        percentOfTotal: 40,
        description: 'All wiring installed, panel upgraded, circuits run, boxes installed',
        requiresInspection: true,
      },
      {
        name: 'ESA Inspection',
        percentOfTotal: 30,
        description: 'Electrical Safety Authority rough-in inspection passed, corrections (if any) complete',
        requiresInspection: true,
      },
      {
        name: 'Trim & Devices',
        percentOfTotal: 30,
        description: 'All devices, switches, outlets installed, panel labeled, final ESA inspection passed',
        requiresInspection: true,
      },
    ],
    warrantyDefaults: [
      {
        item: 'Electrical workmanship and installation',
        labourYears: 2,
        materialYears: 5,
      },
    ],
    commonExclusions: [
      'Light fixtures, ceiling fans, or specialty devices (unless specifically included)',
      'Drywall patching or painting after electrical work',
      'Flooring repair or replacement',
      'Service upgrade fees charged by utility company',
      'Permit fees or ESA inspection fees (unless specifically included)',
    ],
    requiredPermits: ['Electrical permit', 'ESA inspection'],
    requiresEngineering: false,
    insuranceMinimum: '$2M CGL',
    wsibRequired: true,
  },
  {
    serviceSlug: 'plumbing',
    serviceName: 'Plumbing',
    category: 'trades',
    defaultMilestones: [
      {
        name: 'Rough-In & Piping',
        percentOfTotal: 40,
        description: 'All supply and drain piping installed, venting complete, pressure tested',
        requiresInspection: true,
      },
      {
        name: 'Inspection & Testing',
        percentOfTotal: 30,
        description: 'Municipal plumbing inspection passed, system tested, no leaks detected',
        requiresInspection: true,
      },
      {
        name: 'Fixture Installation',
        percentOfTotal: 30,
        description: 'All fixtures installed, connections complete, final testing passed',
        requiresInspection: false,
      },
    ],
    warrantyDefaults: [
      {
        item: 'Piping (supply, drain, vent)',
        labourYears: 2,
        materialYears: 10,
      },
      {
        item: 'Fixtures (sinks, toilets, faucets)',
        labourYears: 2,
        materialYears: 5,
      },
    ],
    commonExclusions: [
      'Plumbing fixture supply (unless specifically included)',
      'Drywall patching or painting after plumbing work',
      'Flooring removal or replacement',
      'Water heater or water treatment systems (unless specifically included)',
      'Permit fees or inspection fees (unless specifically included)',
    ],
    requiredPermits: ['Plumbing permit'],
    requiresEngineering: false,
    insuranceMinimum: '$2M CGL',
    wsibRequired: true,
  },
  {
    serviceSlug: 'general-renovation',
    serviceName: 'General Renovation',
    category: 'building',
    defaultMilestones: [
      {
        name: 'Demolition & Prep',
        percentOfTotal: 10,
        description: 'Demolition complete, debris removed, site protected, temporary barriers installed',
        requiresInspection: false,
      },
      {
        name: 'Framing & Structural',
        percentOfTotal: 20,
        description: 'Structural modifications complete, framing installed, load-bearing assessments passed',
        requiresInspection: true,
      },
      {
        name: 'Rough-In (MEP)',
        percentOfTotal: 25,
        description: 'Plumbing, electrical, HVAC rough-in complete, all inspections passed',
        requiresInspection: true,
      },
      {
        name: 'Finishes & Fixtures',
        percentOfTotal: 30,
        description: 'Drywall, flooring, trim, paint complete, fixtures installed',
        requiresInspection: false,
      },
      {
        name: 'Final Inspection & Cleanup',
        percentOfTotal: 15,
        description: 'Punch list complete, final inspection passed, site cleaned, walkthrough complete',
        requiresInspection: true,
      },
    ],
    warrantyDefaults: [
      {
        item: 'General workmanship (all trades)',
        labourYears: 2,
        materialYears: 5,
      },
    ],
    commonExclusions: [
      'Furniture, appliances (unless specifically included)',
      'Window treatments or decorative items',
      'Landscaping or exterior work beyond scope',
      'Structural issues discovered after demolition (change order required)',
      'Asbestos or mold remediation (unless specifically included)',
    ],
    requiredPermits: ['Building permit (as required per scope)'],
    requiresEngineering: false,
    insuranceMinimum: '$2M CGL',
    wsibRequired: true,
  },
];

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get contract template by service slug
 */
export function getContractTemplate(
  serviceSlug: string
): ContractTemplate | undefined {
  return contractTemplates.find((t) => t.serviceSlug === serviceSlug);
}

/**
 * Get all available contract template slugs
 */
export function getAllContractSlugs(): string[] {
  return contractTemplates.map((t) => t.serviceSlug);
}

/**
 * Generate milestone schedule with calculated amounts
 * Applies 10% statutory holdback across all milestones
 */
export function generateMilestoneSchedule(
  totalPrice: number,
  template: ContractTemplate
): MilestoneSchedule[] {
  const milestones: MilestoneSchedule[] = [];
  let accumulatedAmount = 0;

  // Calculate 90% of each milestone (10% holdback applied across all)
  for (let i = 0; i < template.defaultMilestones.length; i++) {
    const milestone = template.defaultMilestones[i];
    let amount: number;

    if (i === template.defaultMilestones.length - 1) {
      // Last milestone gets remainder to ensure total adds up
      amount = Math.round(totalPrice * 0.9) - accumulatedAmount;
    } else {
      amount = Math.round((milestone.percentOfTotal / 100) * totalPrice * 0.9);
      accumulatedAmount += amount;
    }

    milestones.push({
      name: milestone.name,
      percentage: milestone.percentOfTotal,
      amount,
      description: milestone.description,
      requiresInspection: milestone.requiresInspection,
    });
  }

  return milestones;
}

/**
 * Calculate statutory holdback (10% in Ontario)
 */
export function calculateHoldback(totalPrice: number): {
  holdbackAmount: number;
  holdbackPercent: number;
  releaseNote: string;
} {
  return {
    holdbackAmount: Math.round(totalPrice * 0.1),
    holdbackPercent: 10,
    releaseNote:
      'Released 60 days after substantial completion per Ontario Construction Act',
  };
}

/**
 * Calculate HST (13% in Ontario)
 */
export function calculateHST(subtotal: number): {
  hst: number;
  total: number;
} {
  const hst = Math.round(subtotal * 0.13 * 100) / 100;
  const total = subtotal + hst;
  return { hst, total };
}

/**
 * Generate full contract sections from form data
 */
export function generateContractSections(
  formData: ContractFormData,
  template: ContractTemplate
): ContractSection[] {
  const sections: ContractSection[] = [];

  // Section 1: Parties to the Agreement
  sections.push({
    title: 'Parties to the Agreement',
    content: `This Renovation Contract ("Agreement") is entered into on ${new Date().toLocaleDateString('en-CA')} between:

HOMEOWNER:
${formData.homeowner.fullName}
${formData.homeowner.address}
Phone: ${formData.homeowner.phone}
Email: ${formData.homeowner.email}

CONTRACTOR:
${formData.contractor.businessName}
${formData.contractor.address}
Phone: ${formData.contractor.phone}
Email: ${formData.contractor.email}
WSIB Number: ${formData.contractor.wsibNumber}
Insurance Policy: ${formData.contractor.insurancePolicy}`,
  });

  // Section 2: Project Description
  sections.push({
    title: 'Project Description',
    content: `Project Address: ${formData.projectAddress}
Property Type: ${formData.propertyType.charAt(0).toUpperCase() + formData.propertyType.slice(1)}
Square Footage: ${formData.squareFeet || 'Not specified'} sq ft
Service Type: ${template.serviceName}

Scope of Work Summary:
${formData.workDescription}`,
  });

  // Section 3: Detailed Scope of Work
  sections.push({
    title: 'Scope of Work',
    content: `The Contractor agrees to perform the following work in a professional and workmanlike manner, in accordance with industry standards and all applicable building codes:

${formData.workDescription}

This scope includes:
${template.defaultMilestones.map((m) => `- ${m.name}: ${m.description}`).join('\n')}

The following items are explicitly EXCLUDED from this contract unless otherwise specified in writing:
${template.commonExclusions.map((e) => `- ${e}`).join('\n')}`,
  });

  // Section 4: Payment Schedule
  const holdback = calculateHoldback(formData.totalPrice);
  const subtotalWithHoldback = formData.totalPrice * 0.9;
  const hstCalc = calculateHST(formData.totalPrice);

  sections.push({
    title: 'Payment Schedule',
    content: `Total Contract Price: $${formData.totalPrice.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
HST (13%): $${hstCalc.hst.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Total Including HST: $${hstCalc.total.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}

Milestone Payments (90% of total - 10% holdback applied):
${formData.milestones
  .map(
    (m, i) =>
      `${i + 1}. ${m.name} (${m.percentage.toFixed(1)}%): $${m.amount.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
   ${m.description}
   ${m.requiresInspection ? '   Requires inspection before payment' : ''}`
  )
  .join('\n\n')}

Statutory Holdback (10%): $${holdback.holdbackAmount.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
${holdback.releaseNote}

Payment Terms:
- Milestone payments due within 7 days of milestone completion and acceptance
- Payment by e-transfer, certified cheque, or wire transfer
- No cash payments accepted
- All payments subject to lien verification`,
  });

  // Section 5: Project Timeline
  sections.push({
    title: 'Project Timeline',
    content: `Start Date: ${formData.startDate}
Substantial Completion Date: ${formData.completionDate}

The Contractor shall make reasonable efforts to complete the work by the substantial completion date. Delays caused by the following shall extend the completion date accordingly:
- Homeowner-requested changes or delays in decision-making
- Material delays beyond the Contractor's control
- Unforeseen conditions (hidden structural issues, hazardous materials, etc.)
- Weather conditions that prevent safe work (for exterior work)
- Delays in permit issuance or inspections by municipal authorities

The Contractor shall notify the Homeowner in writing within 3 business days of any anticipated delay, including the reason and revised completion estimate.`,
  });

  // Section 6: Warranty
  sections.push({
    title: 'Warranty',
    content: `The Contractor warrants the following:

${formData.warrantyTerms || template.warrantyDefaults
  .map(
    (w) =>
      `${w.item}:
- Labour Warranty: ${w.labourYears === 999 ? 'Lifetime' : w.labourYears + ' years'}
- Material Warranty: ${w.materialYears === 999 ? 'Lifetime' : w.materialYears + ' years'}`
  )
  .join('\n\n')}

Warranty Coverage:
- Warranty period begins on the date of substantial completion
- Covers defects in workmanship and materials under normal use
- Does not cover damage caused by homeowner neglect, misuse, or alterations
- Does not cover normal wear and tear or cosmetic issues (minor cracks, colour fading, etc.)
- Manufacturer warranties on supplied materials shall be passed through to homeowner

To make a warranty claim, the Homeowner must notify the Contractor in writing within 30 days of discovering the defect. The Contractor shall respond within 10 business days and remedy valid warranty claims within a reasonable timeframe.`,
  });

  // Section 7: Change Orders
  sections.push({
    title: 'Change Orders',
    content: formData.changeOrderPolicy || `All changes to the scope of work must be documented in a written Change Order signed by both parties before the work is performed. Each Change Order shall include:
- Description of the change
- Impact on project timeline
- Additional cost or credit
- Updated payment schedule (if applicable)

Verbal agreements or unsigned changes will not be considered part of this contract. The Contractor is not obligated to perform additional work without a signed Change Order.

Change Order pricing shall be based on:
- Time and materials (labour at agreed hourly rate + materials at cost + 15% markup), or
- Fixed price quote provided by Contractor and accepted by Homeowner

Emergency changes to address immediate safety or structural concerns may be performed without prior written approval, but must be documented within 24 hours.`,
  });

  // Section 8: Permits & Inspections
  sections.push({
    title: 'Permits & Inspections',
    content: `Permit Responsibility: ${formData.permitResponsibility === 'contractor' ? 'Contractor' : 'Homeowner'}

Required Permits:
${template.requiredPermits.map((p) => `- ${p}`).join('\n')}

${
  formData.permitResponsibility === 'contractor'
    ? `The Contractor shall obtain all required permits prior to commencing work. Permit fees are included in the contract price unless otherwise specified. The Contractor shall schedule and coordinate all required inspections with municipal authorities.

The Homeowner agrees to provide access to the property for inspections and shall be available (or designate a representative) to be present if required by the inspector.`
    : `The Homeowner is responsible for obtaining all required permits prior to the Contractor commencing work. The Contractor shall provide all necessary documentation and drawings to support permit applications. Work shall not begin until the Homeowner confirms all permits are in place.

The Homeowner shall schedule and coordinate all required inspections. The Contractor shall notify the Homeowner at least 48 hours in advance when work is ready for inspection.`
}

${template.requiresEngineering ? 'This project requires a structural engineering report and stamped drawings. The engineering report must be approved by the municipality before work begins.' : ''}

Failed inspections due to Contractor workmanship shall be corrected at Contractor's expense. Failed inspections due to design issues, unforeseen conditions, or changes requested by Homeowner may result in additional charges.`,
  });

  // Section 9: Insurance & WSIB
  sections.push({
    title: 'Insurance & WSIB',
    content: `The Contractor warrants that they maintain the following coverage throughout the duration of this project:

Commercial General Liability Insurance: ${template.insuranceMinimum}
- Policy must include completed operations coverage
- Homeowner shall be named as additional insured upon request
- Proof of insurance provided: ${formData.contractor.insurancePolicy}

${
  template.wsibRequired
    ? `WSIB Coverage: ${formData.contractor.wsibNumber}
- Contractor is registered with the Workplace Safety and Insurance Board
- Contractor is responsible for WSIB coverage for all workers on site
- Homeowner shall not be held liable for workplace injuries`
    : 'WSIB: Not required for this trade/project scope'
}

The Contractor shall ensure all subcontractors carry appropriate insurance and WSIB coverage. The Homeowner may request proof of coverage from subcontractors at any time.

The Homeowner is responsible for maintaining home insurance throughout the renovation. The Homeowner shall notify their insurance provider of the renovation and ensure coverage remains in effect.`,
  });

  // Section 10: Dispute Resolution
  sections.push({
    title: 'Dispute Resolution',
    content: formData.disputeResolution || `In the event of a dispute arising from this contract, the parties agree to the following resolution process:

1. Good Faith Negotiation:
   The parties shall first attempt to resolve the dispute through direct negotiation in good faith. Either party may request a meeting to discuss the dispute, and both parties agree to participate within 10 business days.

2. Mediation:
   If negotiation fails to resolve the dispute within 30 days, the parties agree to participate in mediation. A neutral mediator shall be selected by mutual agreement or, if no agreement can be reached, appointed by the Residential Construction Council of Ontario (RESCON).

   Mediation costs shall be shared equally by both parties. Each party is responsible for their own legal fees.

3. Arbitration or Litigation:
   If mediation fails to resolve the dispute within 60 days, either party may pursue arbitration or litigation. The prevailing party may be entitled to recover reasonable legal fees and costs.

4. Continued Performance:
   Unless the dispute relates to an immediate safety concern, both parties agree to continue performing their respective obligations under this contract during the dispute resolution process.

This contract is governed by the laws of the Province of Ontario and the Construction Act (Ontario).`,
  });

  // Section 11: Cancellation Rights
  sections.push({
    title: 'Cancellation Rights',
    content: `Consumer Protection Act (Ontario):
If this contract was signed at the Homeowner's residence (not at the Contractor's place of business), the Homeowner has a 10-day cooling-off period during which they may cancel this contract for any reason without penalty.

To exercise this right, the Homeowner must provide written notice of cancellation within 10 days of signing this contract. Cancellation notice may be delivered in person, by registered mail, or by email to: ${formData.contractor.email}

If the Homeowner cancels during the cooling-off period:
- The Contractor must return any deposit within 15 days
- No cancellation fee applies
- Any work already performed will be charged at cost (materials + labour)

After Cooling-Off Period:
Either party may terminate this contract for material breach by the other party. Material breach includes:
- Failure to make payment when due (Homeowner)
- Abandonment of the project for more than 10 consecutive days without notice (Contractor)
- Failure to obtain required permits or insurance (Contractor)
- Denial of reasonable access to the property (Homeowner)

The non-breaching party must provide 10 days written notice to cure the breach. If the breach is not cured within 10 days, the contract may be terminated.

Upon termination:
- Contractor shall be paid for all work completed to date, less any damages
- Homeowner shall receive all materials purchased for the project
- Statutory holdback provisions continue to apply`,
  });

  // Section 12: General Terms
  sections.push({
    title: 'General Terms',
    content: `Governing Law:
This Agreement shall be governed by and construed in accordance with the laws of the Province of Ontario and the federal laws of Canada applicable therein, without regard to conflict of law principles.

Entire Agreement:
This Agreement, including all attached schedules and referenced documents, constitutes the entire agreement between the parties and supersedes all prior negotiations, representations, or agreements, whether written or oral. No amendment or modification of this Agreement shall be valid unless in writing and signed by both parties.

Severability:
If any provision of this Agreement is found to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect.

Assignment:
Neither party may assign this Agreement without the prior written consent of the other party. The Contractor may subcontract portions of the work but remains fully responsible for all work performed.

Notices:
All notices required under this Agreement shall be in writing and delivered:
- In person with proof of delivery
- By registered mail to the addresses listed in Section 1
- By email to the email addresses listed in Section 1 (with read receipt)

Notices are deemed received on the date of personal delivery, 3 business days after mailing, or upon confirmed email receipt.

${formData.materialSubstitution || 'Material Selection and Approval:\nThe Homeowner shall approve all material selections in writing before the Contractor proceeds with purchase or installation. Delays in material approval may extend the project timeline. Once materials are ordered based on Homeowner approval, changes may result in restocking fees or additional charges.'}

Site Access and Safety:
The Contractor shall maintain a safe work site in accordance with Occupational Health and Safety Act (Ontario). The Homeowner and any visitors enter the work site at their own risk. The Contractor shall secure the site at the end of each work day.

Debris and Cleanup:
The Contractor shall remove construction debris and maintain a reasonably clean work site. Final cleanup shall be performed upon substantial completion. The Contractor is not responsible for cleaning areas outside the work zone unless specifically included in the scope.

Utilities and Services:
The Homeowner shall provide access to electricity and water at no charge to the Contractor. If utilities must be temporarily disconnected, the Contractor shall provide reasonable advance notice.

Force Majeure:
Neither party shall be liable for delays or failures in performance resulting from acts beyond their reasonable control, including natural disasters, pandemics, labour strikes, or government restrictions.

Lien Rights:
The Homeowner acknowledges that the Contractor, subcontractors, and material suppliers have lien rights under the Construction Act (Ontario). The Homeowner may use the statutory holdback to protect against liens. Upon final payment and release of holdback, the Contractor shall provide a statutory declaration and certification that all subcontractors and suppliers have been paid.`,
  });

  return sections;
}

/**
 * Generate unique contract reference number
 * Format: RN-YYYY-XXXXXX (6 random alphanumeric chars)
 */
export function generateContractReferenceNumber(): string {
  const year = new Date().getFullYear();
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomPart = '';
  for (let i = 0; i < 6; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `RN-${year}-${randomPart}`;
}
