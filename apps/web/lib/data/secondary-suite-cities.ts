/**
 * Secondary Suite / Basement Apartment / ADU City-Specific Guide Data
 * Ontario municipalities with granular requirements and incentives
 *
 * Pure data file — no React imports, no project dependencies
 */

export interface CityRequirement {
  label: string;
  value: string;
  notes?: string;
}

export interface CityIncentive {
  name: string;
  amount: string;
  details: string;
  deadline?: string;
}

export interface CitySecondaryGuide {
  slug: string;
  city: string;
  region: string;
  metaTitle: string;
  metaDescription: string;
  heroTagline: string;
  overview: string;
  requirements: {
    ceilingHeight: CityRequirement;
    fireSeparation: CityRequirement;
    egressWindows: CityRequirement;
    parking: CityRequirement;
    electrical: CityRequirement;
    plumbing: CityRequirement;
    hvac: CityRequirement;
    zoning: CityRequirement;
  };
  permitProcess: {
    steps: { title: string; description: string; duration?: string }[];
    fees: string;
    timeline: string;
  };
  incentives: CityIncentive[];
  localNotes: string[];
  officialLinks: { label: string; url: string }[];
  nearbyGuides: string[];
  faqs: { q: string; a: string }[];
}

// ---------------------------------------------------------------------------
// Ontario Building Code standards (apply everywhere)
// ---------------------------------------------------------------------------
export const obcRequirements = [
  {
    label: 'Fire Separation',
    value: '1-hour fire-rated ceiling assembly (Type X drywall)',
    notes: 'Required between dwelling units. Inspected before occupancy permit.',
  },
  {
    label: 'Egress Windows',
    value: 'Min 0.35 m² openable area per bedroom',
    notes: 'Bottom of opening max 1.5 m above floor. Must be rescuable from outside.',
  },
  {
    label: 'Electrical',
    value: 'Separate 100A panel minimum',
    notes: 'ESA inspection mandatory. AFCI breakers required for bedrooms.',
  },
  {
    label: 'Plumbing',
    value: 'Separate water meter + backwater valve',
    notes: 'Drainage must meet Part 7 standards. Backflow prevention required.',
  },
  {
    label: 'HVAC',
    value: 'Independent heating system OR zone control',
    notes: 'Ventilation: min 10 L/s per occupant. HRV recommended.',
  },
];

// ---------------------------------------------------------------------------
// City-specific guides
// ---------------------------------------------------------------------------
export const cityGuides: CitySecondaryGuide[] = [
  {
    slug: 'toronto',
    city: 'Toronto',
    region: 'Toronto (GTA)',
    metaTitle: 'Toronto Secondary Suite & Basement Apartment Guide 2026 | Permits, Costs, Incentives',
    metaDescription: 'Complete guide to building a legal secondary suite in Toronto. Zoning rules, permit fees ($3,600+), OBC requirements, and $80K+ in federal/provincial incentives.',
    heroTagline: 'Everything you need to know about creating a legal secondary suite in Toronto — permits, zoning, building code, and up to $120K in incentives.',
    overview: `Toronto actively encourages secondary suites to increase housing supply. As of 2024, you can build a second unit in any residential zone without a variance (zoning reform under Bill 23).

The city offers streamlined permits, and federal/provincial programs provide up to $120,000 in low-interest loans and forgivable grants. Typical project cost: $60,000–$140,000 depending on scope.`,
    requirements: {
      ceilingHeight: {
        label: 'Ceiling Height',
        value: '1.95 m (6\'5") minimum for habitable rooms',
        notes: 'Toronto applies OBC minimum. Beams can drop to 1.85 m if <20% of room area.',
      },
      fireSeparation: {
        label: 'Fire Separation',
        value: '1-hour fire-rated assembly (ceiling + walls)',
        notes: 'Type X drywall, sealed penetrations, self-closing door to shared stairs.',
      },
      egressWindows: {
        label: 'Egress Windows',
        value: '0.35 m² openable area per bedroom',
        notes: 'Window well required if below grade. Bottom sill max 1.5 m above floor.',
      },
      parking: {
        label: 'Parking',
        value: 'NOT required (eliminated 2022)',
        notes: 'Toronto removed parking requirements for all secondary suites city-wide.',
      },
      electrical: {
        label: 'Electrical',
        value: 'Separate 100A panel + ESA permit',
        notes: 'Main panel upgrade may be needed. ESA inspection mandatory before occupancy.',
      },
      plumbing: {
        label: 'Plumbing',
        value: 'Separate water meter + backwater valve',
        notes: 'City may require larger service if you add 2+ bathrooms. Drainage capacity study recommended.',
      },
      hvac: {
        label: 'HVAC',
        value: 'Independent heating system OR thermostat per unit',
        notes: 'HRV or ERV required if upgrading insulation. Furnace must be code-compliant (no mid-efficiency).',
      },
      zoning: {
        label: 'Zoning',
        value: 'Permitted city-wide (any residential zone)',
        notes: 'No variance needed as of 2024. Heritage districts may have additional design review.',
      },
    },
    permitProcess: {
      steps: [
        {
          title: 'Pre-Consultation (Optional)',
          description: 'Book a free meeting with Toronto Building to review your drawings and confirm compliance. Highly recommended for complex projects.',
          duration: '1–2 weeks to book',
        },
        {
          title: 'Permit Application',
          description: 'Submit complete drawings (architectural, structural, mechanical, electrical) via the online portal. Requires stamped drawings from a designer or architect.',
          duration: '1 day',
        },
        {
          title: 'Plan Review',
          description: 'Toronto Building reviews for zoning, OBC, and fire safety compliance. Respond to any comments within 30 days to keep file active.',
          duration: '4–8 weeks',
        },
        {
          title: 'Permit Issuance',
          description: 'Pay permit fees and receive your building permit. ESA and plumbing permits filed separately by licensed contractors.',
          duration: '1 week after approval',
        },
        {
          title: 'Construction + Inspections',
          description: 'Toronto Building inspects at: foundation (if digging), framing, insulation, fire separation, final. ESA inspects rough-in and final electrical.',
          duration: '8–16 weeks (typical)',
        },
        {
          title: 'Occupancy Permit',
          description: 'After all inspections pass, receive final occupancy permit. You can now legally rent or occupy the suite.',
          duration: '1–2 weeks',
        },
      ],
      fees: '$3,600–$5,500 (depends on scope)',
      timeline: '3–5 months (permit + construction)',
    },
    incentives: [
      {
        name: 'Canada Secondary Suite Loan',
        amount: 'Up to $80,000 at 0% interest',
        details: 'Federal program for creating rental units. Forgivable after 5 years if you maintain affordability criteria. No income test.',
      },
      {
        name: 'Ontario Secondary Suite Incentive',
        amount: 'Up to $40,000 forgivable',
        details: 'Provincial grant for basement apartments. Must rent at 80% of market rate for 5 years. Stacks with federal program.',
      },
      {
        name: 'Toronto Home Energy Loan',
        amount: 'Up to $125,000 at 2% interest',
        details: 'HELP program for energy retrofits. Covers insulation, windows, HVAC if you upgrade during renovation. Paid via property tax over 20 years.',
      },
    ],
    localNotes: [
      'Toronto has NO parking requirement for secondary suites (eliminated in 2022).',
      'Heritage districts may require design review even if zoning allows suites.',
      'If your home is >100 years old, check for knob-and-tube wiring — full rewire may be needed.',
      'Toronto Water may require a larger service line if adding 2+ bathrooms.',
      'Fire separation MUST include the shared stairwell — often overlooked in DIY projects.',
    ],
    officialLinks: [
      {
        label: 'Toronto Building Permits Portal',
        url: 'https://www.toronto.ca/services-payments/building-construction/apply-for-a-building-permit/',
      },
      {
        label: 'Secondary Suite Zoning Guide',
        url: 'https://www.toronto.ca/city-government/planning-development/official-plan-guidelines/design-guidelines/multiple-residential-zone/',
      },
      {
        label: 'Permit Fee Calculator',
        url: 'https://www.toronto.ca/services-payments/building-construction/building-permit-fees/',
      },
    ],
    nearbyGuides: ['mississauga', 'vaughan', 'markham', 'pickering'],
    faqs: [
      {
        q: 'Do I need a variance to build a secondary suite in Toronto?',
        a: 'No. As of 2024, secondary suites are permitted city-wide in all residential zones without a variance. You only need a building permit.',
      },
      {
        q: 'Can I build a secondary suite if my ceiling is 6 feet tall?',
        a: 'No. OBC requires 1.95 m (6\'5") for habitable rooms. You may need underpinning (excavating to lower the floor) or raising the main floor — both are expensive ($40K–$80K).',
      },
      {
        q: 'How much does a building permit cost in Toronto?',
        a: 'Typical range: $3,600–$5,500 depending on project scope. Toronto charges per $1,000 of construction value. ESA and plumbing permits are separate ($200–$400 total).',
      },
      {
        q: 'Can I rent my basement apartment on Airbnb?',
        a: 'No. Toronto bans short-term rentals (under 28 days) in secondary suites. You must rent long-term (12+ month leases) to comply with zoning.',
      },
      {
        q: 'What happens if I build without a permit?',
        a: 'Toronto can issue a stop-work order, force demolition, and fine you up to $100,000. Unlawful units also void home insurance and can block future sales.',
      },
    ],
  },
  {
    slug: 'mississauga',
    city: 'Mississauga',
    region: 'Peel (GTA)',
    metaTitle: 'Mississauga Secondary Suite Guide 2026 | Basement Apartment Permits & Incentives',
    metaDescription: 'Build a legal secondary suite in Mississauga. Zoning rules, permit process, $2,800+ fees, and up to $120K in federal/provincial funding.',
    heroTagline: 'Create a legal basement apartment in Mississauga — permits, zoning, OBC requirements, and federal incentives up to $120,000.',
    overview: `Mississauga allows secondary suites in most residential zones (R-zones) without a variance. The city has streamlined permits and pre-approved drawings to speed up approval.

Typical project cost: $50,000–$120,000. Federal and provincial programs offer up to $120,000 in low-interest loans and grants.`,
    requirements: {
      ceilingHeight: {
        label: 'Ceiling Height',
        value: '1.95 m (6\'5") minimum',
        notes: 'OBC minimum applies. No Mississauga-specific variance.',
      },
      fireSeparation: {
        label: 'Fire Separation',
        value: '1-hour fire-rated ceiling + walls',
        notes: 'Type X drywall, sealed penetrations, self-closing door to shared stairs.',
      },
      egressWindows: {
        label: 'Egress Windows',
        value: '0.35 m² openable area per bedroom',
        notes: 'Window well required if below grade. Must comply with OBC 9.9.',
      },
      parking: {
        label: 'Parking',
        value: '1 space required (reduced from 2 in 2023)',
        notes: 'Mississauga requires 1 parking space per secondary suite. Driveway must be widened if needed.',
      },
      electrical: {
        label: 'Electrical',
        value: 'Separate 100A panel + ESA permit',
        notes: 'ESA inspection mandatory. Panel upgrade may be needed.',
      },
      plumbing: {
        label: 'Plumbing',
        value: 'Separate water meter + backwater valve',
        notes: 'City may require drainage capacity study for older homes.',
      },
      hvac: {
        label: 'HVAC',
        value: 'Independent heating OR thermostat per unit',
        notes: 'HRV required if upgrading insulation beyond R-20.',
      },
      zoning: {
        label: 'Zoning',
        value: 'Permitted in R1–R5 zones',
        notes: 'Check zoning on GeoHub. Some older subdivisions may have restrictive covenants.',
      },
    },
    permitProcess: {
      steps: [
        {
          title: 'Zoning Confirmation',
          description: 'Verify your property is in an R-zone using Mississauga GeoHub. Most single-family homes qualify.',
          duration: '1 day',
        },
        {
          title: 'Permit Application',
          description: 'Submit drawings via online portal. Mississauga offers pre-approved templates for standard layouts.',
          duration: '1 day',
        },
        {
          title: 'Plan Review',
          description: 'City reviews for OBC and zoning compliance. Typical turnaround is faster than Toronto.',
          duration: '3–6 weeks',
        },
        {
          title: 'Permit Issuance',
          description: 'Pay fees and receive building permit. ESA/plumbing permits filed by contractors.',
          duration: '1 week',
        },
        {
          title: 'Construction + Inspections',
          description: 'City inspects at framing, insulation, fire separation, and final stages.',
          duration: '8–14 weeks',
        },
        {
          title: 'Occupancy Permit',
          description: 'Final approval after all inspections pass. Suite is now legally rentable.',
          duration: '1–2 weeks',
        },
      ],
      fees: '$2,800–$4,500',
      timeline: '3–4 months',
    },
    incentives: [
      {
        name: 'Canada Secondary Suite Loan',
        amount: 'Up to $80,000 at 0% interest',
        details: 'Federal forgivable loan after 5 years. Stacks with provincial program.',
      },
      {
        name: 'Ontario Secondary Suite Incentive',
        amount: 'Up to $40,000 forgivable',
        details: 'Must rent at 80% of market rate for 5 years.',
      },
    ],
    localNotes: [
      'Mississauga REQUIRES 1 parking space per secondary suite (unlike Toronto).',
      'Pre-approved drawings available from the city for standard layouts.',
      'Older subdivisions may have restrictive covenants banning rentals — check title.',
      'Drainage capacity study often required for homes built before 1990.',
    ],
    officialLinks: [
      {
        label: 'Mississauga Building Permits',
        url: 'https://www.mississauga.ca/services-and-programs/building-and-development/building-permits/',
      },
      {
        label: 'GeoHub (Zoning Lookup)',
        url: 'https://mississauga.maps.arcgis.com/',
      },
    ],
    nearbyGuides: ['toronto', 'brampton', 'oakville'],
    faqs: [
      {
        q: 'Do I need parking for a secondary suite in Mississauga?',
        a: 'Yes. Mississauga requires 1 parking space per secondary suite. You may need to widen your driveway.',
      },
      {
        q: 'Can I use pre-approved drawings?',
        a: 'Yes. Mississauga offers pre-approved templates for standard basement apartments. This can save $2,000–$4,000 in design fees.',
      },
      {
        q: 'What if my subdivision has a no-rental clause?',
        a: 'Provincial law (Bill 23) overrides restrictive covenants for secondary suites. The covenant is unenforceable, but verify with a lawyer.',
      },
    ],
  },
  {
    slug: 'brampton',
    city: 'Brampton',
    region: 'Peel (GTA)',
    metaTitle: 'Brampton Secondary Suite Guide 2026 | Basement Apartment Permits & Costs',
    metaDescription: 'Complete guide to building a legal secondary suite in Brampton. Zoning rules, permit fees ($2,500+), OBC requirements, and federal incentives.',
    heroTagline: 'Build a legal basement apartment in Brampton — zoning, permits, building code, and up to $120K in federal/provincial incentives.',
    overview: `Brampton permits secondary suites in all residential zones as of 2024. The city has one of the fastest approval times in the GTA (3–5 weeks for simple projects).

Typical cost: $45,000–$110,000. Federal and provincial incentives provide up to $120,000 in low-interest loans and forgivable grants.`,
    requirements: {
      ceilingHeight: {
        label: 'Ceiling Height',
        value: '1.95 m (6\'5") minimum',
        notes: 'OBC standard. Brampton does not offer variances for ceiling height.',
      },
      fireSeparation: {
        label: 'Fire Separation',
        value: '1-hour fire-rated assembly',
        notes: 'Type X drywall, sealed penetrations, self-closing door.',
      },
      egressWindows: {
        label: 'Egress Windows',
        value: '0.35 m² openable per bedroom',
        notes: 'Window well required for below-grade bedrooms.',
      },
      parking: {
        label: 'Parking',
        value: '1 space required',
        notes: 'Brampton requires 1 space per suite. Driveway widening often needed.',
      },
      electrical: {
        label: 'Electrical',
        value: 'Separate 100A panel + ESA permit',
        notes: 'ESA inspection mandatory.',
      },
      plumbing: {
        label: 'Plumbing',
        value: 'Separate meter + backwater valve',
        notes: 'Backwater valve required for all below-grade plumbing.',
      },
      hvac: {
        label: 'HVAC',
        value: 'Independent system OR zone control',
        notes: 'HRV required if upgrading insulation.',
      },
      zoning: {
        label: 'Zoning',
        value: 'Permitted city-wide (all R-zones)',
        notes: 'No variance needed as of 2024.',
      },
    },
    permitProcess: {
      steps: [
        {
          title: 'Pre-Application Consultation',
          description: 'Free 30-minute meeting with Brampton Building to confirm compliance.',
          duration: '1 week to book',
        },
        {
          title: 'Submit Permit Application',
          description: 'Upload drawings via online portal. Faster turnaround than Toronto/Mississauga.',
          duration: '1 day',
        },
        {
          title: 'Plan Review',
          description: 'City reviews for OBC compliance. Brampton has streamlined approval for secondary suites.',
          duration: '3–5 weeks',
        },
        {
          title: 'Permit Issuance',
          description: 'Pay fees and receive permit.',
          duration: '1 week',
        },
        {
          title: 'Construction + Inspections',
          description: 'City inspects at framing, insulation, fire separation, final.',
          duration: '6–12 weeks',
        },
        {
          title: 'Occupancy Permit',
          description: 'Final approval after inspections.',
          duration: '1 week',
        },
      ],
      fees: '$2,500–$4,000',
      timeline: '2.5–4 months',
    },
    incentives: [
      {
        name: 'Canada Secondary Suite Loan',
        amount: 'Up to $80,000 at 0% interest',
        details: 'Federal forgivable loan.',
      },
      {
        name: 'Ontario Secondary Suite Incentive',
        amount: 'Up to $40,000 forgivable',
        details: 'Must rent at 80% of market rate for 5 years.',
      },
    ],
    localNotes: [
      'Brampton has the FASTEST permit approval in Peel Region (3–5 weeks).',
      'Parking requirement: 1 space per suite (same as Mississauga).',
      'Pre-application meetings highly recommended — they catch issues early.',
    ],
    officialLinks: [
      {
        label: 'Brampton Building Permits',
        url: 'https://www.brampton.ca/en/building-planning-development/Pages/Building-Permits.aspx',
      },
    ],
    nearbyGuides: ['mississauga', 'toronto', 'vaughan'],
    faqs: [
      {
        q: 'How long does a permit take in Brampton?',
        a: 'Typical turnaround: 3–5 weeks for simple projects. Brampton has streamlined secondary suite approvals.',
      },
      {
        q: 'Do I need a parking space?',
        a: 'Yes. Brampton requires 1 parking space per secondary suite.',
      },
    ],
  },
  {
    slug: 'vaughan',
    city: 'Vaughan',
    region: 'York (GTA)',
    metaTitle: 'Vaughan Secondary Suite Guide 2026 | Basement Apartment Permits & Incentives',
    metaDescription: 'Build a legal secondary suite in Vaughan. Zoning rules, permit fees ($3,200+), OBC requirements, and up to $120K in federal funding.',
    heroTagline: 'Create a legal basement apartment in Vaughan — permits, zoning, building code, and federal incentives up to $120,000.',
    overview: `Vaughan permits secondary suites in all residential zones. The city offers pre-approved drawings and has a dedicated secondary suite helpline.

Typical cost: $55,000–$130,000. Federal and provincial programs provide up to $120,000 in incentives.`,
    requirements: {
      ceilingHeight: {
        label: 'Ceiling Height',
        value: '1.95 m (6\'5") minimum',
        notes: 'OBC standard applies.',
      },
      fireSeparation: {
        label: 'Fire Separation',
        value: '1-hour fire-rated assembly',
        notes: 'Type X drywall, sealed penetrations.',
      },
      egressWindows: {
        label: 'Egress Windows',
        value: '0.35 m² openable per bedroom',
        notes: 'Window well required for below-grade.',
      },
      parking: {
        label: 'Parking',
        value: '1 space required',
        notes: 'Vaughan requires 1 space per suite.',
      },
      electrical: {
        label: 'Electrical',
        value: 'Separate 100A panel + ESA permit',
        notes: 'ESA inspection mandatory.',
      },
      plumbing: {
        label: 'Plumbing',
        value: 'Separate meter + backwater valve',
        notes: 'Backwater valve required.',
      },
      hvac: {
        label: 'HVAC',
        value: 'Independent system OR zone control',
        notes: 'HRV required if upgrading insulation.',
      },
      zoning: {
        label: 'Zoning',
        value: 'Permitted city-wide',
        notes: 'No variance needed.',
      },
    },
    permitProcess: {
      steps: [
        {
          title: 'Pre-Consultation',
          description: 'Book free consultation with Vaughan Building.',
          duration: '1–2 weeks',
        },
        {
          title: 'Submit Application',
          description: 'Upload drawings via portal.',
          duration: '1 day',
        },
        {
          title: 'Plan Review',
          description: 'City reviews for compliance.',
          duration: '4–6 weeks',
        },
        {
          title: 'Permit Issuance',
          description: 'Pay fees and receive permit.',
          duration: '1 week',
        },
        {
          title: 'Construction + Inspections',
          description: 'City inspects at key milestones.',
          duration: '8–14 weeks',
        },
        {
          title: 'Occupancy Permit',
          description: 'Final approval.',
          duration: '1–2 weeks',
        },
      ],
      fees: '$3,200–$4,800',
      timeline: '3–4 months',
    },
    incentives: [
      {
        name: 'Canada Secondary Suite Loan',
        amount: 'Up to $80,000 at 0% interest',
        details: 'Federal forgivable loan.',
      },
      {
        name: 'Ontario Secondary Suite Incentive',
        amount: 'Up to $40,000 forgivable',
        details: 'Must rent at 80% of market rate.',
      },
    ],
    localNotes: [
      'Vaughan offers pre-approved drawings for standard layouts.',
      'Parking: 1 space required per suite.',
      'Heritage districts may require design review.',
    ],
    officialLinks: [
      {
        label: 'Vaughan Building Permits',
        url: 'https://www.vaughan.ca/services/building-permits',
      },
    ],
    nearbyGuides: ['toronto', 'markham', 'richmond-hill'],
    faqs: [
      {
        q: 'Does Vaughan require parking?',
        a: 'Yes. 1 parking space per secondary suite is required.',
      },
    ],
  },
  {
    slug: 'markham',
    city: 'Markham',
    region: 'York (GTA)',
    metaTitle: 'Markham Secondary Suite Guide 2026 | Basement Apartment Permits & Costs',
    metaDescription: 'Build a legal secondary suite in Markham. Zoning rules, permit fees ($3,000+), OBC requirements, and up to $120K in federal incentives.',
    heroTagline: 'Create a legal basement apartment in Markham — permits, zoning, building code, and federal incentives up to $120,000.',
    overview: `Markham permits secondary suites in all residential zones. The city has a streamlined approval process and offers free pre-consultation meetings.

Typical cost: $50,000–$125,000. Federal and provincial programs provide up to $120,000 in incentives.`,
    requirements: {
      ceilingHeight: {
        label: 'Ceiling Height',
        value: '1.95 m (6\'5") minimum',
        notes: 'OBC standard applies.',
      },
      fireSeparation: {
        label: 'Fire Separation',
        value: '1-hour fire-rated assembly',
        notes: 'Type X drywall required.',
      },
      egressWindows: {
        label: 'Egress Windows',
        value: '0.35 m² openable per bedroom',
        notes: 'Window well required for below-grade.',
      },
      parking: {
        label: 'Parking',
        value: '1 space required',
        notes: 'Markham requires 1 space per suite.',
      },
      electrical: {
        label: 'Electrical',
        value: 'Separate 100A panel + ESA permit',
        notes: 'ESA inspection mandatory.',
      },
      plumbing: {
        label: 'Plumbing',
        value: 'Separate meter + backwater valve',
        notes: 'Backwater valve required.',
      },
      hvac: {
        label: 'HVAC',
        value: 'Independent system OR zone control',
        notes: 'HRV required if upgrading insulation.',
      },
      zoning: {
        label: 'Zoning',
        value: 'Permitted city-wide',
        notes: 'No variance needed.',
      },
    },
    permitProcess: {
      steps: [
        {
          title: 'Pre-Consultation',
          description: 'Free meeting with Markham Building.',
          duration: '1–2 weeks',
        },
        {
          title: 'Submit Application',
          description: 'Upload drawings via portal.',
          duration: '1 day',
        },
        {
          title: 'Plan Review',
          description: 'City reviews for compliance.',
          duration: '3–6 weeks',
        },
        {
          title: 'Permit Issuance',
          description: 'Pay fees and receive permit.',
          duration: '1 week',
        },
        {
          title: 'Construction + Inspections',
          description: 'City inspects at key milestones.',
          duration: '8–14 weeks',
        },
        {
          title: 'Occupancy Permit',
          description: 'Final approval.',
          duration: '1–2 weeks',
        },
      ],
      fees: '$3,000–$4,500',
      timeline: '3–4 months',
    },
    incentives: [
      {
        name: 'Canada Secondary Suite Loan',
        amount: 'Up to $80,000 at 0% interest',
        details: 'Federal forgivable loan.',
      },
      {
        name: 'Ontario Secondary Suite Incentive',
        amount: 'Up to $40,000 forgivable',
        details: 'Must rent at 80% of market rate.',
      },
    ],
    localNotes: [
      'Markham offers free pre-consultation meetings.',
      'Parking: 1 space required per suite.',
      'Fast approval times (3–6 weeks for simple projects).',
    ],
    officialLinks: [
      {
        label: 'Markham Building Permits',
        url: 'https://www.markham.ca/building',
      },
    ],
    nearbyGuides: ['vaughan', 'richmond-hill', 'toronto'],
    faqs: [
      {
        q: 'Does Markham require parking?',
        a: 'Yes. 1 parking space per secondary suite is required.',
      },
    ],
  },
  {
    slug: 'richmond-hill',
    city: 'Richmond Hill',
    region: 'York (GTA)',
    metaTitle: 'Richmond Hill Secondary Suite Guide 2026 | Basement Apartment Permits',
    metaDescription: 'Build a legal secondary suite in Richmond Hill. Zoning rules, permit fees, OBC requirements, and up to $120K in federal incentives.',
    heroTagline: 'Create a legal basement apartment in Richmond Hill — permits, zoning, building code, and federal incentives.',
    overview: `Richmond Hill permits secondary suites in all residential zones. The city has streamlined approvals and offers pre-consultation meetings.

Typical cost: $50,000–$125,000. Federal and provincial programs provide up to $120,000 in incentives.`,
    requirements: {
      ceilingHeight: {
        label: 'Ceiling Height',
        value: '1.95 m (6\'5") minimum',
        notes: 'OBC standard applies.',
      },
      fireSeparation: {
        label: 'Fire Separation',
        value: '1-hour fire-rated assembly',
        notes: 'Type X drywall required.',
      },
      egressWindows: {
        label: 'Egress Windows',
        value: '0.35 m² openable per bedroom',
        notes: 'Window well required for below-grade.',
      },
      parking: {
        label: 'Parking',
        value: '1 space required',
        notes: 'Richmond Hill requires 1 space per suite.',
      },
      electrical: {
        label: 'Electrical',
        value: 'Separate 100A panel + ESA permit',
        notes: 'ESA inspection mandatory.',
      },
      plumbing: {
        label: 'Plumbing',
        value: 'Separate meter + backwater valve',
        notes: 'Backwater valve required.',
      },
      hvac: {
        label: 'HVAC',
        value: 'Independent system OR zone control',
        notes: 'HRV required if upgrading insulation.',
      },
      zoning: {
        label: 'Zoning',
        value: 'Permitted city-wide',
        notes: 'No variance needed.',
      },
    },
    permitProcess: {
      steps: [
        {
          title: 'Pre-Consultation',
          description: 'Free meeting with Richmond Hill Building.',
          duration: '1–2 weeks',
        },
        {
          title: 'Submit Application',
          description: 'Upload drawings via portal.',
          duration: '1 day',
        },
        {
          title: 'Plan Review',
          description: 'City reviews for compliance.',
          duration: '4–6 weeks',
        },
        {
          title: 'Permit Issuance',
          description: 'Pay fees and receive permit.',
          duration: '1 week',
        },
        {
          title: 'Construction + Inspections',
          description: 'City inspects at key milestones.',
          duration: '8–14 weeks',
        },
        {
          title: 'Occupancy Permit',
          description: 'Final approval.',
          duration: '1–2 weeks',
        },
      ],
      fees: '$3,200–$4,800',
      timeline: '3–4 months',
    },
    incentives: [
      {
        name: 'Canada Secondary Suite Loan',
        amount: 'Up to $80,000 at 0% interest',
        details: 'Federal forgivable loan.',
      },
      {
        name: 'Ontario Secondary Suite Incentive',
        amount: 'Up to $40,000 forgivable',
        details: 'Must rent at 80% of market rate.',
      },
    ],
    localNotes: [
      'Richmond Hill offers pre-consultation meetings.',
      'Parking: 1 space required per suite.',
    ],
    officialLinks: [
      {
        label: 'Richmond Hill Building Permits',
        url: 'https://www.richmondhill.ca/en/building-and-renovating',
      },
    ],
    nearbyGuides: ['vaughan', 'markham', 'aurora'],
    faqs: [
      {
        q: 'Does Richmond Hill require parking?',
        a: 'Yes. 1 parking space per secondary suite is required.',
      },
    ],
  },
  {
    slug: 'oakville',
    city: 'Oakville',
    region: 'Halton',
    metaTitle: 'Oakville Secondary Suite Guide 2026 | Basement Apartment Permits & Costs',
    metaDescription: 'Build a legal secondary suite in Oakville. Zoning rules, permit fees, OBC requirements, and up to $120K in federal incentives.',
    heroTagline: 'Create a legal basement apartment in Oakville — permits, zoning, building code, and federal incentives.',
    overview: `Oakville permits secondary suites in all residential zones. The city has streamlined approvals and offers pre-consultation meetings.

Typical cost: $55,000–$135,000. Federal and provincial programs provide up to $120,000 in incentives.`,
    requirements: {
      ceilingHeight: {
        label: 'Ceiling Height',
        value: '1.95 m (6\'5") minimum',
        notes: 'OBC standard applies.',
      },
      fireSeparation: {
        label: 'Fire Separation',
        value: '1-hour fire-rated assembly',
        notes: 'Type X drywall required.',
      },
      egressWindows: {
        label: 'Egress Windows',
        value: '0.35 m² openable per bedroom',
        notes: 'Window well required for below-grade.',
      },
      parking: {
        label: 'Parking',
        value: '1 space required',
        notes: 'Oakville requires 1 space per suite.',
      },
      electrical: {
        label: 'Electrical',
        value: 'Separate 100A panel + ESA permit',
        notes: 'ESA inspection mandatory.',
      },
      plumbing: {
        label: 'Plumbing',
        value: 'Separate meter + backwater valve',
        notes: 'Backwater valve required.',
      },
      hvac: {
        label: 'HVAC',
        value: 'Independent system OR zone control',
        notes: 'HRV required if upgrading insulation.',
      },
      zoning: {
        label: 'Zoning',
        value: 'Permitted city-wide',
        notes: 'No variance needed.',
      },
    },
    permitProcess: {
      steps: [
        {
          title: 'Pre-Consultation',
          description: 'Free meeting with Oakville Building.',
          duration: '1–2 weeks',
        },
        {
          title: 'Submit Application',
          description: 'Upload drawings via portal.',
          duration: '1 day',
        },
        {
          title: 'Plan Review',
          description: 'City reviews for compliance.',
          duration: '4–6 weeks',
        },
        {
          title: 'Permit Issuance',
          description: 'Pay fees and receive permit.',
          duration: '1 week',
        },
        {
          title: 'Construction + Inspections',
          description: 'City inspects at key milestones.',
          duration: '8–14 weeks',
        },
        {
          title: 'Occupancy Permit',
          description: 'Final approval.',
          duration: '1–2 weeks',
        },
      ],
      fees: '$3,500–$5,000',
      timeline: '3–4 months',
    },
    incentives: [
      {
        name: 'Canada Secondary Suite Loan',
        amount: 'Up to $80,000 at 0% interest',
        details: 'Federal forgivable loan.',
      },
      {
        name: 'Ontario Secondary Suite Incentive',
        amount: 'Up to $40,000 forgivable',
        details: 'Must rent at 80% of market rate.',
      },
    ],
    localNotes: [
      'Oakville has higher permit fees than surrounding municipalities.',
      'Parking: 1 space required per suite.',
      'Heritage districts may require additional approvals.',
    ],
    officialLinks: [
      {
        label: 'Oakville Building Permits',
        url: 'https://www.oakville.ca/business-development/building-permits',
      },
    ],
    nearbyGuides: ['mississauga', 'burlington'],
    faqs: [
      {
        q: 'Does Oakville require parking?',
        a: 'Yes. 1 parking space per secondary suite is required.',
      },
    ],
  },
  {
    slug: 'burlington',
    city: 'Burlington',
    region: 'Halton',
    metaTitle: 'Burlington Secondary Suite Guide 2026 | Basement Apartment Permits',
    metaDescription: 'Build a legal secondary suite in Burlington. Zoning rules, permit fees, OBC requirements, and up to $120K in federal incentives.',
    heroTagline: 'Create a legal basement apartment in Burlington — permits, zoning, building code, and federal incentives.',
    overview: `Burlington permits secondary suites in all residential zones. The city has streamlined approvals and offers pre-consultation meetings.

Typical cost: $50,000–$125,000. Federal and provincial programs provide up to $120,000 in incentives.`,
    requirements: {
      ceilingHeight: {
        label: 'Ceiling Height',
        value: '1.95 m (6\'5") minimum',
        notes: 'OBC standard applies.',
      },
      fireSeparation: {
        label: 'Fire Separation',
        value: '1-hour fire-rated assembly',
        notes: 'Type X drywall required.',
      },
      egressWindows: {
        label: 'Egress Windows',
        value: '0.35 m² openable per bedroom',
        notes: 'Window well required for below-grade.',
      },
      parking: {
        label: 'Parking',
        value: '1 space required',
        notes: 'Burlington requires 1 space per suite.',
      },
      electrical: {
        label: 'Electrical',
        value: 'Separate 100A panel + ESA permit',
        notes: 'ESA inspection mandatory.',
      },
      plumbing: {
        label: 'Plumbing',
        value: 'Separate meter + backwater valve',
        notes: 'Backwater valve required.',
      },
      hvac: {
        label: 'HVAC',
        value: 'Independent system OR zone control',
        notes: 'HRV required if upgrading insulation.',
      },
      zoning: {
        label: 'Zoning',
        value: 'Permitted city-wide',
        notes: 'No variance needed.',
      },
    },
    permitProcess: {
      steps: [
        {
          title: 'Pre-Consultation',
          description: 'Free meeting with Burlington Building.',
          duration: '1–2 weeks',
        },
        {
          title: 'Submit Application',
          description: 'Upload drawings via portal.',
          duration: '1 day',
        },
        {
          title: 'Plan Review',
          description: 'City reviews for compliance.',
          duration: '4–6 weeks',
        },
        {
          title: 'Permit Issuance',
          description: 'Pay fees and receive permit.',
          duration: '1 week',
        },
        {
          title: 'Construction + Inspections',
          description: 'City inspects at key milestones.',
          duration: '8–14 weeks',
        },
        {
          title: 'Occupancy Permit',
          description: 'Final approval.',
          duration: '1–2 weeks',
        },
      ],
      fees: '$3,000–$4,500',
      timeline: '3–4 months',
    },
    incentives: [
      {
        name: 'Canada Secondary Suite Loan',
        amount: 'Up to $80,000 at 0% interest',
        details: 'Federal forgivable loan.',
      },
      {
        name: 'Ontario Secondary Suite Incentive',
        amount: 'Up to $40,000 forgivable',
        details: 'Must rent at 80% of market rate.',
      },
    ],
    localNotes: [
      'Burlington offers pre-consultation meetings.',
      'Parking: 1 space required per suite.',
    ],
    officialLinks: [
      {
        label: 'Burlington Building Permits',
        url: 'https://www.burlington.ca/services/building-permits',
      },
    ],
    nearbyGuides: ['oakville', 'hamilton', 'milton'],
    faqs: [
      {
        q: 'Does Burlington require parking?',
        a: 'Yes. 1 parking space per secondary suite is required.',
      },
    ],
  },
  {
    slug: 'hamilton',
    city: 'Hamilton',
    region: 'Hamilton',
    metaTitle: 'Hamilton Secondary Suite Guide 2026 | Basement Apartment Permits & Costs',
    metaDescription: 'Build a legal secondary suite in Hamilton. Zoning rules, permit fees, OBC requirements, and up to $120K in federal incentives.',
    heroTagline: 'Create a legal basement apartment in Hamilton — permits, zoning, building code, and federal incentives.',
    overview: `Hamilton permits secondary suites in all residential zones. The city has streamlined approvals and lower permit fees than the GTA.

Typical cost: $40,000–$100,000. Federal and provincial programs provide up to $120,000 in incentives.`,
    requirements: {
      ceilingHeight: {
        label: 'Ceiling Height',
        value: '1.95 m (6\'5") minimum',
        notes: 'OBC standard applies.',
      },
      fireSeparation: {
        label: 'Fire Separation',
        value: '1-hour fire-rated assembly',
        notes: 'Type X drywall required.',
      },
      egressWindows: {
        label: 'Egress Windows',
        value: '0.35 m² openable per bedroom',
        notes: 'Window well required for below-grade.',
      },
      parking: {
        label: 'Parking',
        value: 'NOT required (eliminated 2023)',
        notes: 'Hamilton removed parking requirements for secondary suites.',
      },
      electrical: {
        label: 'Electrical',
        value: 'Separate 100A panel + ESA permit',
        notes: 'ESA inspection mandatory.',
      },
      plumbing: {
        label: 'Plumbing',
        value: 'Separate meter + backwater valve',
        notes: 'Backwater valve required.',
      },
      hvac: {
        label: 'HVAC',
        value: 'Independent system OR zone control',
        notes: 'HRV required if upgrading insulation.',
      },
      zoning: {
        label: 'Zoning',
        value: 'Permitted city-wide',
        notes: 'No variance needed.',
      },
    },
    permitProcess: {
      steps: [
        {
          title: 'Pre-Consultation',
          description: 'Free meeting with Hamilton Building.',
          duration: '1–2 weeks',
        },
        {
          title: 'Submit Application',
          description: 'Upload drawings via portal.',
          duration: '1 day',
        },
        {
          title: 'Plan Review',
          description: 'City reviews for compliance.',
          duration: '3–5 weeks',
        },
        {
          title: 'Permit Issuance',
          description: 'Pay fees and receive permit.',
          duration: '1 week',
        },
        {
          title: 'Construction + Inspections',
          description: 'City inspects at key milestones.',
          duration: '6–12 weeks',
        },
        {
          title: 'Occupancy Permit',
          description: 'Final approval.',
          duration: '1–2 weeks',
        },
      ],
      fees: '$2,200–$3,500',
      timeline: '2.5–3.5 months',
    },
    incentives: [
      {
        name: 'Canada Secondary Suite Loan',
        amount: 'Up to $80,000 at 0% interest',
        details: 'Federal forgivable loan.',
      },
      {
        name: 'Ontario Secondary Suite Incentive',
        amount: 'Up to $40,000 forgivable',
        details: 'Must rent at 80% of market rate.',
      },
    ],
    localNotes: [
      'Hamilton has NO parking requirement (eliminated in 2023).',
      'Permit fees are lower than GTA municipalities.',
      'Fast approval times (3–5 weeks).',
    ],
    officialLinks: [
      {
        label: 'Hamilton Building Permits',
        url: 'https://www.hamilton.ca/business-development/building-permits',
      },
    ],
    nearbyGuides: ['burlington', 'oakville', 'milton'],
    faqs: [
      {
        q: 'Does Hamilton require parking for secondary suites?',
        a: 'No. Hamilton eliminated parking requirements for secondary suites in 2023.',
      },
      {
        q: 'How much does a permit cost in Hamilton?',
        a: 'Typical range: $2,200–$3,500 — significantly lower than Toronto or Mississauga.',
      },
    ],
  },
  {
    slug: 'aurora',
    city: 'Aurora',
    region: 'York (GTA)',
    metaTitle: 'Aurora Secondary Suite Guide 2026 | Basement Apartment Permits',
    metaDescription: 'Build a legal secondary suite in Aurora. Zoning rules, permit fees, OBC requirements, and up to $120K in federal incentives.',
    heroTagline: 'Create a legal basement apartment in Aurora — permits, zoning, building code, and federal incentives.',
    overview: `Aurora permits secondary suites in all residential zones. The city has streamlined approvals and offers pre-consultation meetings.

Typical cost: $50,000–$120,000. Federal and provincial programs provide up to $120,000 in incentives.`,
    requirements: {
      ceilingHeight: {
        label: 'Ceiling Height',
        value: '1.95 m (6\'5") minimum',
        notes: 'OBC standard applies.',
      },
      fireSeparation: {
        label: 'Fire Separation',
        value: '1-hour fire-rated assembly',
        notes: 'Type X drywall required.',
      },
      egressWindows: {
        label: 'Egress Windows',
        value: '0.35 m² openable per bedroom',
        notes: 'Window well required for below-grade.',
      },
      parking: {
        label: 'Parking',
        value: '1 space required',
        notes: 'Aurora requires 1 space per suite.',
      },
      electrical: {
        label: 'Electrical',
        value: 'Separate 100A panel + ESA permit',
        notes: 'ESA inspection mandatory.',
      },
      plumbing: {
        label: 'Plumbing',
        value: 'Separate meter + backwater valve',
        notes: 'Backwater valve required.',
      },
      hvac: {
        label: 'HVAC',
        value: 'Independent system OR zone control',
        notes: 'HRV required if upgrading insulation.',
      },
      zoning: {
        label: 'Zoning',
        value: 'Permitted city-wide',
        notes: 'No variance needed.',
      },
    },
    permitProcess: {
      steps: [
        {
          title: 'Pre-Consultation',
          description: 'Free meeting with Aurora Building.',
          duration: '1–2 weeks',
        },
        {
          title: 'Submit Application',
          description: 'Upload drawings via portal.',
          duration: '1 day',
        },
        {
          title: 'Plan Review',
          description: 'City reviews for compliance.',
          duration: '4–6 weeks',
        },
        {
          title: 'Permit Issuance',
          description: 'Pay fees and receive permit.',
          duration: '1 week',
        },
        {
          title: 'Construction + Inspections',
          description: 'City inspects at key milestones.',
          duration: '8–14 weeks',
        },
        {
          title: 'Occupancy Permit',
          description: 'Final approval.',
          duration: '1–2 weeks',
        },
      ],
      fees: '$2,800–$4,200',
      timeline: '3–4 months',
    },
    incentives: [
      {
        name: 'Canada Secondary Suite Loan',
        amount: 'Up to $80,000 at 0% interest',
        details: 'Federal forgivable loan.',
      },
      {
        name: 'Ontario Secondary Suite Incentive',
        amount: 'Up to $40,000 forgivable',
        details: 'Must rent at 80% of market rate.',
      },
    ],
    localNotes: [
      'Aurora offers pre-consultation meetings.',
      'Parking: 1 space required per suite.',
    ],
    officialLinks: [
      {
        label: 'Aurora Building Permits',
        url: 'https://www.aurora.ca/building-permits',
      },
    ],
    nearbyGuides: ['richmond-hill', 'vaughan', 'markham'],
    faqs: [
      {
        q: 'Does Aurora require parking?',
        a: 'Yes. 1 parking space per secondary suite is required.',
      },
    ],
  },
  {
    slug: 'milton',
    city: 'Milton',
    region: 'Halton Region',
    metaTitle: 'Milton Secondary Suite Guide 2026 | ARU Permits, Registration & Costs',
    metaDescription: 'Build a legal additional residential unit in Milton. ARU registration ($340), building permit guide, OBC requirements, and federal incentives up to $120K.',
    heroTagline: 'Milton now allows up to 3 ARUs per lot — here is how to register, permit, and build yours.',
    overview: `Milton Town Council approved amendments to allow up to three additional residential units (ARUs) on a lot containing a detached, semi-detached, or townhouse in urban areas. The town has a dedicated ARU Building Permit Application Guide (updated June 2025) that walks you through drawings, inspections, and construction requirements.

All ARUs must be self-contained with a kitchen, sleeping area, and bathroom for exclusive use. Registration is mandatory — $340 one-time fee per ARU, done in person at Town Hall or online.`,
    requirements: {
      ceilingHeight: {
        label: 'Ceiling Height',
        value: '1.95 m (6\'5") minimum',
        notes: 'OBC standard. Measure from finished floor to finished ceiling. Beams and ducts can project below if they cover less than 20% of room area.',
      },
      fireSeparation: {
        label: 'Fire Separation',
        value: '1-hour fire-rated assembly',
        notes: '5/8" Type X gypsum both sides of demising assembly. Full tested system required — not just drywall thickness.',
      },
      egressWindows: {
        label: 'Egress Windows',
        value: '0.35 m² unobstructed opening per bedroom',
        notes: 'No dimension less than 380 mm. Window wells required for below-grade bedrooms.',
      },
      parking: {
        label: 'Parking',
        value: 'Check current zoning by-law',
        notes: 'Milton zoning amendments in progress — parking requirements may change. Contact Zoning Division: 905-878-7252 x2329.',
      },
      electrical: {
        label: 'Electrical',
        value: 'Separate sub-panel + ESA permit',
        notes: 'ESA inspection mandatory. Dedicated circuits for kitchen, bathroom, laundry.',
      },
      plumbing: {
        label: 'Plumbing',
        value: 'Verify drain capacity + backwater valve',
        notes: 'Backwater valve required. Check fixture unit count against existing drain capacity.',
      },
      hvac: {
        label: 'HVAC',
        value: 'Independent heating or zone control',
        notes: 'Separate thermostat required. Mini-split common for basement ARUs.',
      },
      zoning: {
        label: 'Zoning',
        value: 'Up to 3 ARUs in urban residential zones',
        notes: 'Council approved amendments for detached, semi, and townhouse. Rural zones may have different rules.',
      },
    },
    permitProcess: {
      steps: [
        {
          title: 'Review ARU Guide',
          description: 'Download Milton\'s ARU Building Permit Application Guide (June 2025 edition). Review drawing requirements, inspection stages, and construction standards.',
          duration: '1-2 days',
        },
        {
          title: 'Prepare Drawings',
          description: 'Hire a qualified designer to prepare floor plans, sections, and details showing fire separation, egress, plumbing, electrical, and HVAC.',
          duration: '1-3 weeks',
        },
        {
          title: 'Submit Building Permit',
          description: 'Submit application with drawings to Milton Building Department. Pay permit fees.',
          duration: '1 day',
        },
        {
          title: 'Plan Review',
          description: 'Milton reviews drawings for OBC, zoning, and fire code compliance. Expect revision requests.',
          duration: '4-6 weeks',
        },
        {
          title: 'Construction + Inspections',
          description: 'Build per approved drawings. Call for inspections at framing, insulation, plumbing, electrical, and final stages.',
          duration: '8-12 weeks',
        },
        {
          title: 'Register ARU',
          description: 'Once all inspections pass, register your ARU with the town. One-time fee of $340 per unit.',
          duration: '1-2 weeks',
        },
      ],
      fees: '$340 registration + building permit (varies by project value)',
      timeline: '3-5 months from application to occupancy',
    },
    incentives: [
      {
        name: 'Canada Secondary Suite Loan',
        amount: 'Up to $80,000 at 2% interest',
        details: 'Federal loan program. 15-year repayment. Available to homeowners building new secondary suites.',
      },
      {
        name: 'Ontario Secondary Suite Incentive',
        amount: 'Up to $40,000 forgivable',
        details: 'Rent at below-market rates for 5 years — loan forgiven at 20% per year.',
      },
    ],
    localNotes: [
      'ARU registration is mandatory — $340 one-time fee per unit, in person at Town Hall or online.',
      'Milton\'s ARU Building Permit Application Guide (June 2025) is the best starting resource.',
      'Zoning amendments allow up to 3 ARUs in urban residential areas — check your specific zone.',
      'Contact Zoning Division at 905-878-7252 x2329 for zoning-specific questions.',
    ],
    officialLinks: [
      {
        label: 'Milton ARU Building Permit Guide (PDF)',
        url: 'https://www.milton.ca/en/business-and-development/resources/Building/2025-ADU-Guide-and-sample-drawings---June-27.2025-edition.pdf',
      },
      {
        label: 'Milton Additional Residential Units',
        url: 'https://www.milton.ca/en/business-and-development/additional-residential-units.aspx',
      },
      {
        label: 'Milton Basement Apartments',
        url: 'https://www.milton.ca/en/business-and-development/basement-apartments.aspx',
      },
    ],
    nearbyGuides: ['burlington', 'oakville', 'brampton'],
    faqs: [
      {
        q: 'How much does ARU registration cost in Milton?',
        a: '$340 one-time fee per additional residential unit. Register in person at Town Hall or online.',
      },
      {
        q: 'How many units can I add to my property in Milton?',
        a: 'Up to 3 ARUs in urban residential zones (detached, semi, townhouse). That means up to 4 total units on one lot. Rural areas may have different limits — check with the Zoning Division.',
      },
      {
        q: 'Do I need a building permit for a basement apartment in Milton?',
        a: 'Yes. A building permit is required before any work starts. Submit drawings showing compliance with OBC, fire code, and zoning by-law. Milton has a dedicated ARU Building Permit Application Guide with sample drawings and checklists.',
      },
    ],
  },
  {
    slug: 'ajax',
    city: 'Ajax',
    region: 'Durham Region',
    metaTitle: 'Ajax Secondary Suite Guide 2026 | Basement Apartment Permits & Grants',
    metaDescription: 'Build a legal basement apartment in Ajax. Build More Get More Grant, e-permitting portal, OBC requirements, and size limits for accessory apartments.',
    heroTagline: 'Ajax offers the Build More, Get More Grant and a new e-permitting portal — making secondary suites easier than ever.',
    overview: `Ajax permits accessory apartments in eligible dwellings with specific size limits: minimum 25 m² (269 sq ft) gross floor area, and the apartment cannot exceed the ground floor area of the main dwelling. Houses less than 5 years old face stricter Part 9, Division B OBC requirements.

The town launched its e-permitting portal (eapply.ajax.ca) in April 2025, reducing approval timelines. Ajax also offers the Build More, Get More Grant Program for new additional dwelling units.`,
    requirements: {
      ceilingHeight: {
        label: 'Ceiling Height',
        value: '1.95 m (6\'5") minimum',
        notes: 'OBC standard. Houses less than 5 years old reviewed under stricter Part 9 Division B requirements.',
      },
      fireSeparation: {
        label: 'Fire Separation',
        value: '1-hour fire-rated assembly',
        notes: 'Type X drywall both sides. Newer homes (<5 years) may have additional fire separation requirements under Part 9 Division B.',
      },
      egressWindows: {
        label: 'Egress Windows',
        value: '0.35 m² unobstructed opening per bedroom',
        notes: 'No dimension less than 380 mm. Below-grade bedrooms need window wells.',
      },
      parking: {
        label: 'Parking',
        value: 'Check Ajax zoning by-law',
        notes: 'Requirements vary by zone. Contact Ajax Building Department.',
      },
      electrical: {
        label: 'Electrical',
        value: 'Separate sub-panel + ESA permit',
        notes: 'ESA inspection mandatory for all electrical work.',
      },
      plumbing: {
        label: 'Plumbing',
        value: 'Verify drain capacity + backwater valve',
        notes: 'Backwater valve recommended. Verify fixture unit count.',
      },
      hvac: {
        label: 'HVAC',
        value: 'Independent heating or zone control',
        notes: 'Separate thermostat required for accessory apartment.',
      },
      zoning: {
        label: 'Zoning',
        value: 'Min 25 m² floor area, max = ground floor area of main dwelling',
        notes: 'Accessory apartment cannot be larger than the primary dwelling\'s ground floor.',
      },
    },
    permitProcess: {
      steps: [
        {
          title: 'Check Eligibility',
          description: 'Verify your property is eligible. Minimum 25 m² apartment, cannot exceed ground floor area of main dwelling. Houses under 5 years old face stricter OBC Division B requirements.',
          duration: '1-2 days',
        },
        {
          title: 'Prepare Drawings',
          description: 'Hire a designer for floor plans, sections, and details. Show fire separation, egress, plumbing, electrical, and HVAC compliance.',
          duration: '1-3 weeks',
        },
        {
          title: 'Submit via e-Permitting',
          description: 'Submit application through Ajax\'s e-permitting portal at eapply.ajax.ca (launched April 2025). Upload drawings and pay fees online.',
          duration: '1 day',
        },
        {
          title: 'Plan Review',
          description: 'Ajax reviews for OBC, zoning, and fire code compliance.',
          duration: '4-8 weeks',
        },
        {
          title: 'Construction + Inspections',
          description: 'Build per approved plans. Call for inspections at framing, insulation, electrical, plumbing, and final.',
          duration: '8-12 weeks',
        },
        {
          title: 'Occupancy',
          description: 'All inspections pass, receive occupancy permit.',
          duration: '1-2 weeks',
        },
      ],
      fees: 'Varies by project value — check e-permitting portal',
      timeline: '3-5 months from application to occupancy',
    },
    incentives: [
      {
        name: 'Build More, Get More Grant',
        amount: 'Varies — contact Ajax for current amounts',
        details: 'Ajax\'s grant program for new additional dwelling units including basement apartments, garden suites, and garage conversions.',
      },
      {
        name: 'Canada Secondary Suite Loan',
        amount: 'Up to $80,000 at 2% interest',
        details: 'Federal loan program. 15-year repayment.',
      },
      {
        name: 'Ontario Secondary Suite Incentive',
        amount: 'Up to $40,000 forgivable',
        details: 'Rent at below-market rates for 5 years — loan forgiven at 20% per year.',
      },
    ],
    localNotes: [
      'Houses less than 5 years old face stricter Part 9 Division B OBC requirements — more restrictive construction standards.',
      'Apartment size limits: minimum 25 m² (269 sq ft), maximum cannot exceed ground floor area of the main dwelling.',
      'Ajax launched e-permitting (eapply.ajax.ca) in April 2025 — submit applications and track progress online.',
      'Build More, Get More Grant available for new ADUs — check with Ajax for current funding and eligibility.',
    ],
    officialLinks: [
      {
        label: 'Ajax Building Requirements and Permits',
        url: 'https://www.ajax.ca/en/business-and-growth/building-requirements-and-permits.aspx',
      },
      {
        label: 'Ajax e-Permitting Portal',
        url: 'https://eapply.ajax.ca',
      },
      {
        label: 'Ajax Housing Programs',
        url: 'https://www.housing.ajax.ca/',
      },
    ],
    nearbyGuides: ['pickering', 'whitby', 'oshawa'],
    faqs: [
      {
        q: 'What are the size limits for a basement apartment in Ajax?',
        a: 'Minimum 25 m² (269 sq ft) gross floor area, and the total area cannot exceed the ground floor area of the main dwelling. So if your main floor is 900 sq ft, the basement apartment can be up to 900 sq ft.',
      },
      {
        q: 'My house is only 3 years old — can I still add a basement apartment?',
        a: 'Yes, but houses under 5 years old are reviewed under Part 9, Division B of the Ontario Building Code, which has more restrictive construction requirements. This may mean additional fire separation, structural, and mechanical requirements compared to older homes. Budget extra for compliance.',
      },
      {
        q: 'What is Ajax\'s Build More, Get More Grant?',
        a: 'It\'s a grant program for new additional dwelling units — basement apartments, garden suites, upstairs apartments, and garage conversions. Contact the town for current funding amounts and eligibility requirements.',
      },
    ],
  },
  {
    slug: 'pickering',
    city: 'Pickering',
    region: 'Durham Region',
    metaTitle: 'Pickering Basement Apartment Guide 2026 | Permits, Size Limits & Registration',
    metaDescription: 'Build a legal basement apartment in Pickering. 100 m² size limit, $500 registration fee, 3 parking spaces required. OBC requirements and federal incentives.',
    heroTagline: 'Pickering caps basement apartments at 100 m² and requires 3 on-site parking spaces — plan your project around these limits.',
    overview: `Pickering permits basement apartments in eligible residential dwellings with specific restrictions. The maximum size is 100 m² (1,076 sq ft), and the apartment must be smaller than the primary dwelling. Registration is mandatory ($500 fee).

Notable Pickering rules: minimum 3 on-site parking spaces required on the property, and home-based businesses are prohibited in either unit of a dwelling containing a basement apartment. These are stricter than most GTA municipalities.`,
    requirements: {
      ceilingHeight: {
        label: 'Ceiling Height',
        value: '1.95 m (6\'5") minimum',
        notes: 'OBC standard applies.',
      },
      fireSeparation: {
        label: 'Fire Separation',
        value: '1-hour fire-rated assembly',
        notes: '5/8" Type X gypsum both sides. Full tested assembly required.',
      },
      egressWindows: {
        label: 'Egress Windows',
        value: '0.35 m² unobstructed opening per bedroom',
        notes: 'Window wells required for below-grade. No dimension less than 380 mm.',
      },
      parking: {
        label: 'Parking',
        value: '3 on-site parking spaces minimum',
        notes: 'All 3 spaces must be on the property — street parking does not count. This is stricter than most GTA cities.',
      },
      electrical: {
        label: 'Electrical',
        value: 'Separate sub-panel + ESA permit',
        notes: 'ESA inspection mandatory.',
      },
      plumbing: {
        label: 'Plumbing',
        value: 'Verify drain capacity + backwater valve',
        notes: 'Backwater valve required.',
      },
      hvac: {
        label: 'HVAC',
        value: 'Independent heating or zone control',
        notes: 'Separate thermostat required.',
      },
      zoning: {
        label: 'Zoning',
        value: 'Max 100 m² (1,076 sq ft), must be smaller than primary dwelling',
        notes: 'Home-based business prohibited in either unit of a dwelling containing a basement apartment.',
      },
    },
    permitProcess: {
      steps: [
        {
          title: 'Check Zoning',
          description: 'Verify your property zone allows basement apartments. Confirm parking (3 spaces required).',
          duration: '1-2 days',
        },
        {
          title: 'Prepare Drawings',
          description: 'Floor plans, sections, fire separation details, plumbing, electrical, HVAC.',
          duration: '1-3 weeks',
        },
        {
          title: 'Submit Building Permit',
          description: 'Submit to Pickering Building Department with drawings and fees.',
          duration: '1 day',
        },
        {
          title: 'Plan Review',
          description: 'City reviews for OBC, zoning, and fire code.',
          duration: '4-8 weeks',
        },
        {
          title: 'Construction + Inspections',
          description: 'Build per approved plans. Inspections at framing, insulation, electrical, plumbing, final.',
          duration: '8-12 weeks',
        },
        {
          title: 'Registration',
          description: 'Register basement apartment with the City. Pay $500 registration fee.',
          duration: '1-2 weeks',
        },
      ],
      fees: '$500 registration + building permit (varies)',
      timeline: '3-5 months from application to occupancy',
    },
    incentives: [
      {
        name: 'Canada Secondary Suite Loan',
        amount: 'Up to $80,000 at 2% interest',
        details: 'Federal loan program. 15-year repayment.',
      },
      {
        name: 'Ontario Secondary Suite Incentive',
        amount: 'Up to $40,000 forgivable',
        details: 'Rent at below-market rates for 5 years — loan forgiven at 20% per year.',
      },
    ],
    localNotes: [
      'Maximum apartment size: 100 m² (1,076 sq ft) — must be smaller than the primary dwelling.',
      'Parking: 3 on-site spaces required — stricter than most GTA cities. Plan your driveway carefully.',
      'Home-based business is prohibited in EITHER unit of a dwelling with a basement apartment.',
      'Registration fee: $500. Register with the City after all inspections pass.',
    ],
    officialLinks: [
      {
        label: 'Pickering Building Permits',
        url: 'https://www.pickering.ca/en/city-hall/building-permits.aspx',
      },
    ],
    nearbyGuides: ['ajax', 'markham', 'toronto'],
    faqs: [
      {
        q: 'What is the maximum size for a basement apartment in Pickering?',
        a: '100 m² (1,076 sq ft), and it must be smaller than the primary dwelling. So if your main floor is 1,200 sq ft, the basement apartment can be up to 1,076 sq ft.',
      },
      {
        q: 'Can I run a home business if I have a basement apartment?',
        a: 'No. Pickering prohibits home-based businesses in either unit of a dwelling that contains a basement apartment. This applies to both the main unit and the basement unit.',
      },
      {
        q: 'How much is the registration fee in Pickering?',
        a: '$500 one-time fee. You must register your basement apartment with the City after all building inspections pass.',
      },
    ],
  },
  {
    slug: 'oshawa',
    city: 'Oshawa',
    region: 'Durham Region',
    metaTitle: 'Oshawa Accessory Apartment Guide 2026 | Permits, Zoning & Requirements',
    metaDescription: 'Build a legal accessory apartment in Oshawa. Permitted in R1, R2, R5 zones, 11m lot frontage minimum, 3 parking spaces. OBC requirements and incentives.',
    heroTagline: 'Oshawa requires 11m lot frontage and 3 parking spaces for accessory apartments — check your lot before you start.',
    overview: `Oshawa permits accessory apartments (basement apartments) in single detached and semi-detached dwellings in specific zones: R1, R2, R5, OSR-A, OS-ORM, AG-A, AG-B, and AG-ORM. Your lot must have at least 11 m (36 ft) of frontage.

If your second or third unit was created after July 1994, a building permit is required to legalize the use. Oshawa requires 3 parking spaces (2 accessible to the street at all times). The city is part of Durham Region, sharing regional services with Ajax, Pickering, and Whitby.`,
    requirements: {
      ceilingHeight: {
        label: 'Ceiling Height',
        value: '1.95 m (6\'5") minimum',
        notes: 'OBC standard applies.',
      },
      fireSeparation: {
        label: 'Fire Separation',
        value: '1-hour fire-rated assembly',
        notes: '5/8" Type X gypsum both sides. Full assembly required.',
      },
      egressWindows: {
        label: 'Egress Windows',
        value: '0.35 m² unobstructed opening per bedroom',
        notes: 'Window wells for below-grade. No dimension less than 380 mm.',
      },
      parking: {
        label: 'Parking',
        value: '3 spaces minimum (2 accessible to street at all times)',
        notes: 'This is one of the stricter parking requirements in the GTA. Tandem parking (one behind the other) may count if both are accessible.',
      },
      electrical: {
        label: 'Electrical',
        value: 'Separate sub-panel + ESA permit',
        notes: 'ESA inspection mandatory.',
      },
      plumbing: {
        label: 'Plumbing',
        value: 'Verify drain capacity + backwater valve',
        notes: 'Backwater valve required in many cases.',
      },
      hvac: {
        label: 'HVAC',
        value: 'Independent heating or zone control',
        notes: 'Separate thermostat for accessory apartment.',
      },
      zoning: {
        label: 'Zoning',
        value: 'R1, R2, R5, OSR-A, OS-ORM, AG-A, AG-B, AG-ORM zones only',
        notes: 'Minimum 11 m (36 ft) lot frontage required. Single detached and semi-detached only.',
      },
    },
    permitProcess: {
      steps: [
        {
          title: 'Verify Zoning',
          description: 'Confirm your property is in R1, R2, R5, OSR-A, OS-ORM, AG-A, AG-B, or AG-ORM zone. Check lot frontage is at least 11 m.',
          duration: '1-2 days',
        },
        {
          title: 'Prepare Drawings',
          description: 'Floor plans, sections, fire separation details, plumbing, electrical, HVAC. Show 3 parking spaces on site plan.',
          duration: '1-3 weeks',
        },
        {
          title: 'Submit Building Permit',
          description: 'Submit to Oshawa Building Department.',
          duration: '1 day',
        },
        {
          title: 'Plan Review',
          description: 'City reviews for OBC, zoning, and fire code compliance.',
          duration: '4-8 weeks',
        },
        {
          title: 'Construction + Inspections',
          description: 'Build per approved plans. Inspections at framing, insulation, electrical, plumbing, final.',
          duration: '8-12 weeks',
        },
        {
          title: 'Final Approval',
          description: 'All inspections pass, receive certificate of occupancy.',
          duration: '1-2 weeks',
        },
      ],
      fees: 'Varies by project value — contact Oshawa Building',
      timeline: '3-5 months from application to occupancy',
    },
    incentives: [
      {
        name: 'Canada Secondary Suite Loan',
        amount: 'Up to $80,000 at 2% interest',
        details: 'Federal loan program. 15-year repayment.',
      },
      {
        name: 'Ontario Secondary Suite Incentive',
        amount: 'Up to $40,000 forgivable',
        details: 'Rent at below-market rates for 5 years — loan forgiven at 20% per year.',
      },
    ],
    localNotes: [
      'Limited to specific zones: R1, R2, R5, OSR-A, OS-ORM, AG-A, AG-B, AG-ORM. Check your zoning before investing in drawings.',
      'Minimum lot frontage: 11 m (36 ft). Narrow lots may not qualify.',
      '3 parking spaces required with 2 accessible to the street at all times.',
      'Units created after July 1994 need a building permit to be legalized — if your existing apartment was never permitted, start the legalization process now.',
    ],
    officialLinks: [
      {
        label: 'Oshawa Accessory Apartments',
        url: 'https://www.oshawa.ca/living-here/building-and-renovating/accessory-apartments/',
      },
      {
        label: 'Oshawa Building Permits',
        url: 'https://www.oshawa.ca/living-here/building-and-renovating/building-permits/',
      },
    ],
    nearbyGuides: ['whitby', 'ajax', 'pickering'],
    faqs: [
      {
        q: 'What zones allow accessory apartments in Oshawa?',
        a: 'R1, R2, R5, OSR-A, OS-ORM, AG-A, AG-B, and AG-ORM zones. Only single detached and semi-detached dwellings qualify. Check your property\'s zoning on the City of Oshawa website or call their planning department.',
      },
      {
        q: 'My basement apartment has been there since the 1980s — do I need a permit?',
        a: 'If it was created before July 1994 and has been continuously occupied, it may be grandfathered. But if it was created after July 1994, or if there\'s been a gap in occupancy, you need a building permit to legalize it. Contact Oshawa Building to verify your situation.',
      },
      {
        q: 'Can I have an accessory apartment in a townhouse in Oshawa?',
        a: 'Currently, Oshawa limits accessory apartments to single detached and semi-detached dwellings. Townhouses are not eligible under the current zoning by-law. This may change as the city updates its ARU policies.',
      },
    ],
  },
  {
    slug: 'whitby',
    city: 'Whitby',
    region: 'Durham Region',
    metaTitle: 'Whitby Secondary Suite Guide 2026 | Basement Apartment Permits & Requirements',
    metaDescription: 'Build a legal second suite in Whitby. Zoning rules, building permit requirements, fire safety upgrades, and federal incentives up to $120K.',
    heroTagline: 'Whitby allows second suites in multiple residential zones — here are the building permit and fire safety requirements.',
    overview: `Whitby permits second suites in multiple residential zones, making it one of the more accessible Durham Region municipalities for basement apartment construction. Building permits are required for all second suite work, and the town has additional requirements for parking and fire safety upgrades.

As part of Durham Region, Whitby shares regional water and sewer services with Ajax, Pickering, and Oshawa. The municipality continues to update its ARU policies to comply with Bill 23 and provincial housing targets.`,
    requirements: {
      ceilingHeight: {
        label: 'Ceiling Height',
        value: '1.95 m (6\'5") minimum',
        notes: 'OBC standard applies. Measure from finished floor to finished ceiling.',
      },
      fireSeparation: {
        label: 'Fire Separation',
        value: '1-hour fire-rated assembly',
        notes: '5/8" Type X gypsum both sides. Interconnected smoke and CO alarms required.',
      },
      egressWindows: {
        label: 'Egress Windows',
        value: '0.35 m² unobstructed opening per bedroom',
        notes: 'Window wells for below-grade. No dimension less than 380 mm.',
      },
      parking: {
        label: 'Parking',
        value: 'Additional parking may be required',
        notes: 'Check Whitby zoning by-law for your zone. Requirements vary.',
      },
      electrical: {
        label: 'Electrical',
        value: 'Separate sub-panel + ESA permit',
        notes: 'ESA inspection mandatory for all electrical work.',
      },
      plumbing: {
        label: 'Plumbing',
        value: 'Verify drain capacity + backwater valve',
        notes: 'Regional water/sewer connections shared with Durham Region.',
      },
      hvac: {
        label: 'HVAC',
        value: 'Independent heating or zone control',
        notes: 'Separate thermostat required.',
      },
      zoning: {
        label: 'Zoning',
        value: 'Permitted in multiple residential zones',
        notes: 'Whitby allows second suites more broadly than some Durham Region neighbors. Verify your specific zone with the Building Division.',
      },
    },
    permitProcess: {
      steps: [
        {
          title: 'Check Zoning',
          description: 'Verify your property zone allows second suites. Contact Whitby Building Division for confirmation.',
          duration: '1-2 days',
        },
        {
          title: 'Prepare Drawings',
          description: 'Floor plans, sections, fire separation, plumbing, electrical, HVAC details. Show parking on site plan.',
          duration: '1-3 weeks',
        },
        {
          title: 'Submit Building Permit',
          description: 'Submit application to Whitby Building Division with drawings and fees.',
          duration: '1 day',
        },
        {
          title: 'Plan Review',
          description: 'Town reviews for OBC, zoning, and fire code compliance.',
          duration: '4-8 weeks',
        },
        {
          title: 'Construction + Inspections',
          description: 'Build per approved plans. Call for inspections at key milestones.',
          duration: '8-12 weeks',
        },
        {
          title: 'Final Approval',
          description: 'All inspections pass, receive occupancy permit.',
          duration: '1-2 weeks',
        },
      ],
      fees: 'Varies by project value — contact Whitby Building Division',
      timeline: '3-5 months from application to occupancy',
    },
    incentives: [
      {
        name: 'Canada Secondary Suite Loan',
        amount: 'Up to $80,000 at 2% interest',
        details: 'Federal loan program. 15-year repayment.',
      },
      {
        name: 'Ontario Secondary Suite Incentive',
        amount: 'Up to $40,000 forgivable',
        details: 'Rent at below-market rates for 5 years — loan forgiven at 20% per year.',
      },
    ],
    localNotes: [
      'Whitby allows second suites in more zones than some Durham Region neighbors — but always verify your specific zone.',
      'Fire safety upgrades are a key focus: interconnected alarms, fire-rated doors, self-closing devices.',
      'Durham Region shares water and sewer services — verify connection capacity with the Region.',
      'Building Division: contact for current fee schedules and zoning verification.',
    ],
    officialLinks: [
      {
        label: 'Whitby Building Permits',
        url: 'https://www.whitby.ca/en/work/building-permits.aspx',
      },
    ],
    nearbyGuides: ['oshawa', 'ajax', 'pickering'],
    faqs: [
      {
        q: 'Is Whitby more permissive than other Durham Region cities for second suites?',
        a: 'Generally yes — Whitby allows second suites in more residential zones than Oshawa or Pickering. But requirements for fire separation, egress, and parking still apply. Check your specific zone with the Building Division.',
      },
      {
        q: 'Do I need to register my second suite in Whitby?',
        a: 'Contact Whitby Building Division for current registration requirements. Durham Region municipalities are increasingly requiring registration and fire inspections for second suites.',
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Helper function
// ---------------------------------------------------------------------------
export function getCityGuide(slug: string): CitySecondaryGuide | undefined {
  return cityGuides.find((c) => c.slug === slug);
}
