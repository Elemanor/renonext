/**
 * Work Breakdown Structure (WBS) Templates
 * Comprehensive task decomposition for all 25 renovation services
 * Ontario residential construction standards
 */

export interface WbsTask {
  code: string;
  name: string;
  description?: string;   // Plain-language explanation for homeowners
  durationDays: number;
  costPctOfTotal: number;
  dependsOn?: string[];
}

export interface WbsPhase {
  code: string;
  name: string;
  description?: string;   // Phase-level summary for homeowners
  tasks: WbsTask[];
}

export interface WbsTemplate {
  serviceSlug: string;
  summary?: string;        // 2-3 sentence overview of what this project involves
  phases: WbsPhase[];
  totalDurationDays: { min: number; max: number };
}

export const wbsTemplates: WbsTemplate[] = [
  // ========================================
  // 1. UNDERPINNING
  // ========================================
  {
    serviceSlug: "underpinning",
    summary: "Underpinning deepens your existing foundation to create more headroom in the basement. The process involves excavating beneath the existing footings in alternating sections, pouring new deeper concrete footings, and installing a new floor slab. It\u2019s the most structurally sensitive renovation you can do \u2014 your house is literally being held up while the ground beneath it is removed and rebuilt. A typical Toronto semi takes 6\u201312 weeks of active work.",
    totalDurationDays: { min: 42, max: 84 },
    phases: [
      {
        code: "1.0",
        name: "Pre-Construction",
        description: "A structural engineer designs the underpinning plan, a geotechnical firm tests your soil, and the city reviews everything before issuing a building permit. Skipping any of these steps is illegal and dangerous.",
        tasks: [
          { code: "1.1", name: "Structural engineer assessment and design", durationDays: 5, costPctOfTotal: 4, description: "The engineer visits your home, measures the existing foundation, and designs the underpinning sequence \u2014 which sections to dig first, how deep to go, what rebar to use, and concrete strength (typically 25\u201332 MPa). Their stamped drawings are legally required for your permit." },
          { code: "1.2", name: "Geotechnical soil report", durationDays: 7, costPctOfTotal: 3, description: "A drill rig takes soil samples beside your foundation to determine bearing capacity. This tells the engineer how deep the new footings need to go and whether you have clay, sand, or rock. Costs $2,500\u2013$5,000 but prevents $50K+ surprises." },
          { code: "1.3", name: "Obtain building permit", durationDays: 14, costPctOfTotal: 2, dependsOn: ["1.1", "1.2"], description: "The city reviews the structural drawings and geotech report. Toronto building permits for underpinning take 2\u20134 weeks. The permit must be posted on site before work begins." },
          { code: "1.4", name: "Material procurement and delivery", durationDays: 5, costPctOfTotal: 2, dependsOn: ["1.3"], description: "Ordering concrete, rebar (#15M and #20M bars), formwork lumber, gravel, waterproofing membrane, and weeping tile. Concrete is ordered for specific pour dates \u2014 you can\u2019t store it." },
        ],
      },
      {
        code: "2.0",
        name: "Site Preparation",
        description: "The crew prepares the inside of your basement for heavy construction. Temporary steel beams carry the weight of your house while the foundation is exposed. Everything that can be damaged is protected or removed.",
        tasks: [
          { code: "2.1", name: "Install temporary shoring and support beams", durationDays: 2, costPctOfTotal: 5, dependsOn: ["1.4"], description: "Steel needle beams and timber posts are installed to transfer the house\u2019s weight while sections of foundation are exposed. This is engineered \u2014 the shoring plan is part of the structural drawings. The house will creak and groan slightly; this is normal." },
          { code: "2.2", name: "Protect interior floors and utilities", durationDays: 1, costPctOfTotal: 1, dependsOn: ["1.4"], description: "Plywood covers the main floor to protect from debris below. Gas, water, and electrical lines near the work area are capped or rerouted. Furniture on the main floor should be moved away from exterior walls." },
          { code: "2.3", name: "Set up dust barriers and ventilation", durationDays: 1, costPctOfTotal: 1, dependsOn: ["1.4"], description: "Plastic sheeting seals the stairway to the main floor. A negative air machine pulls dust out through a window. You can live in the house during underpinning, but expect noise 7am\u20135pm on work days." },
          { code: "2.4", name: "Mark underground utilities (Locate)", durationDays: 1, costPctOfTotal: 1, dependsOn: ["1.4"], description: "Ontario One Call marks the location of gas, hydro, water, and telecom lines near your foundation. This is free and legally required before excavation. If exterior work is involved, the contractor needs to know where everything is buried." },
        ],
      },
      {
        code: "3.0",
        name: "Foundation Underpinning",
        description: "The core of the project. Workers dig out 4-foot sections beneath your existing foundation, pour new deeper footings, wait for concrete to cure, then move to the next section. This alternating pattern ensures the house is always supported. A typical semi-detached has 20\u201330 sections.",
        tasks: [
          { code: "3.1", name: "Excavate section 1 (alternating 4-ft bays)", durationDays: 3, costPctOfTotal: 8, dependsOn: ["2.1", "2.4"], description: "Workers dig by hand (yes, by hand \u2014 no machines fit in a basement) beneath the first set of alternating foundation sections. Each bay is about 4 feet wide. They dig down to the new footing depth (typically 2\u20134 feet deeper than the existing footing)." },
          { code: "3.2", name: "Install formwork and rebar for section 1", durationDays: 2, costPctOfTotal: 6, dependsOn: ["3.1"], description: "Plywood forms are built to shape the new concrete footings. Steel rebar (#15M bars) is tied into a cage and connected to the existing foundation with drilled-in dowels. This reinforcement prevents the new concrete from cracking." },
          { code: "3.3", name: "Pour concrete footings section 1", durationDays: 1, costPctOfTotal: 7, dependsOn: ["3.2"], description: "Concrete (25\u201332 MPa) is pumped through a hose into each bay and vibrated to remove air pockets. The new footing must make full contact with the bottom of the existing foundation \u2014 any gap is packed with non-shrink grout." },
          { code: "3.4", name: "Cure period section 1", durationDays: 7, costPctOfTotal: 0, dependsOn: ["3.3"], description: "Concrete needs 7 days to reach enough strength to support the house. During curing, the concrete is kept moist. No work happens on these sections during this time. The crew may work on other sections or other jobs." },
          { code: "3.5", name: "Excavate section 2 (remaining bays)", durationDays: 3, costPctOfTotal: 8, dependsOn: ["3.4"], description: "Once section 1 has cured, the crew excavates the remaining alternating bays between them. Now the new footings from section 1 carry the load while section 2 is exposed." },
          { code: "3.6", name: "Install formwork and rebar for section 2", durationDays: 2, costPctOfTotal: 6, dependsOn: ["3.5"], description: "Same process as section 1: forms, rebar cages, and dowel connections. The crew ensures the new footings will be continuous once both sections are complete." },
          { code: "3.7", name: "Pour concrete footings section 2", durationDays: 1, costPctOfTotal: 7, dependsOn: ["3.6"], description: "Second concrete pour fills the remaining bays. After this pour, the entire perimeter of your foundation sits on new, deeper footings." },
          { code: "3.8", name: "Cure period section 2", durationDays: 7, costPctOfTotal: 0, dependsOn: ["3.7"], description: "Another 7-day cure. After this, the full foundation is on new footings and the structural work is essentially complete." },
          { code: "3.9", name: "Build new foundation walls (full height)", durationDays: 5, costPctOfTotal: 12, dependsOn: ["3.8"], description: "If more headroom was needed, new concrete block or poured concrete walls are built from the new footing up to the underside of the floor joists. This creates the full-height basement walls." },
          { code: "3.10", name: "Pour new floor slab with vapor barrier", durationDays: 2, costPctOfTotal: 8, dependsOn: ["3.9"], description: "The basement floor gets 4\u2033 of gravel, a 6-mil polyethylene vapor barrier, and 4\u2033 of concrete. The new slab is level and sits at the lower elevation. This is your finished floor surface (or the base for whatever flooring you choose later)." },
        ],
      },
      {
        code: "4.0",
        name: "Drainage & Mechanical",
        description: "While the floor is open, the crew installs drainage to keep the new deeper basement dry. An interior weeping tile system collects any groundwater and routes it to a sump pump.",
        tasks: [
          { code: "4.1", name: "Install interior weeping tile system", durationDays: 2, costPctOfTotal: 5, dependsOn: ["3.9"], description: "Perforated PVC pipe (weeping tile) is laid in gravel around the interior perimeter of the foundation, below the new floor slab. This collects any groundwater that seeps through and routes it to the sump pit. Filter fabric wraps the pipe to prevent clogging." },
          { code: "4.2", name: "Install sump pump and basin", durationDays: 1, costPctOfTotal: 3, dependsOn: ["4.1"], description: "A sump pit (usually 18\u2033 diameter) is set into the gravel beneath the floor slab. A 1/3 HP submersible pump activates automatically when water reaches a set level and pushes it outside. A battery backup pump ($600\u2013$1,200 extra) protects you during power outages." },
          { code: "4.3", name: "Electrical rough-in for sump pump", durationDays: 1, costPctOfTotal: 2, dependsOn: ["4.2"], description: "The sump pump needs a dedicated circuit (typically 15A) with a GFCI outlet. If you\u2019re adding a battery backup, it needs its own outlet too. A high-water alarm ($30) is cheap insurance." },
        ],
      },
      {
        code: "5.0",
        name: "Finishing & Protection",
        description: "The exterior of the foundation is waterproofed and backfilled. This protects your new deeper foundation from water infiltration for decades.",
        tasks: [
          { code: "5.1", name: "Apply exterior waterproofing membrane", durationDays: 2, costPctOfTotal: 4, dependsOn: ["3.9"], description: "If exterior excavation was done, the exposed foundation walls get a rubberized asphalt waterproofing membrane (sprayed or rolled on). This creates a seamless barrier against groundwater. It\u2019s much more effective than the tar-based \u2018damp proofing\u2019 used on older homes." },
          { code: "5.2", name: "Install dimpled drainage board", durationDays: 1, costPctOfTotal: 2, dependsOn: ["5.1"], description: "A plastic dimpled membrane goes over the waterproofing. The dimples create an air gap that lets any water drain down to the weeping tile instead of sitting against the foundation wall." },
          { code: "5.3", name: "Backfill and compact in lifts", durationDays: 2, costPctOfTotal: 4, dependsOn: ["5.2"], description: "Clean gravel or granular fill is placed against the foundation in 12-inch layers, each mechanically compacted. Poor backfill or skipping compaction causes the ground to settle and slope toward your house \u2014 the exact opposite of what you want." },
          { code: "5.4", name: "Restore grade and landscaping", durationDays: 1, costPctOfTotal: 2, dependsOn: ["5.3"], description: "The final grade slopes away from the house (minimum 6 inches over 10 feet). Topsoil, sod, and any removed landscaping are restored. Walkways and driveways disturbed by excavation are repaired." },
        ],
      },
      {
        code: "6.0",
        name: "Close-Out",
        description: "Your structural engineer and the city building inspector verify the work matches the approved drawings. The engineer provides a sign-off letter you\u2019ll need for resale and insurance.",
        tasks: [
          { code: "6.1", name: "Structural inspection by engineer", durationDays: 1, costPctOfTotal: 2, dependsOn: ["3.10"], description: "Your structural engineer inspects the completed underpinning, verifies rebar placement and concrete quality, and checks that the new foundation matches their design. They issue a completion letter \u2014 keep this document forever. You\u2019ll need it when selling." },
          { code: "6.2", name: "Building inspector final approval", durationDays: 1, costPctOfTotal: 1, dependsOn: ["6.1"], description: "The city building inspector does a final inspection and closes the permit. An open (unclosed) building permit shows up on title searches and can delay or kill a home sale." },
          { code: "6.3", name: "Load settlement monitoring documentation", durationDays: 2, costPctOfTotal: 1, dependsOn: ["6.1"], description: "Level readings are taken at key points around the foundation to document that no settlement has occurred. This baseline data is valuable if any future movement questions arise." },
          { code: "6.4", name: "Site cleanup and debris removal", durationDays: 1, costPctOfTotal: 2, dependsOn: ["5.4"], description: "All construction debris, excess concrete, formwork, and soil are removed from the property. The basement is swept and the work area is left broom-clean." },
          { code: "6.5", name: "Engineer sign-off and warranty documentation", durationDays: 1, costPctOfTotal: 1, dependsOn: ["6.2"], description: "The contractor provides warranty documentation (typically 10\u201325 years on structural work). Combined with the engineer\u2019s completion letter, this is your proof that the work was done properly and to code." },
        ],
      },
    ],
  },

  // ========================================
  // 2. WATERPROOFING
  // ========================================
  {
    serviceSlug: "waterproofing",
    summary: "Exterior waterproofing involves excavating around your foundation down to the footing, cleaning the walls, applying a waterproof membrane, installing drainage board and weeping tile, and backfilling. It\u2019s the gold standard for stopping basement leaks \u2014 far more effective than interior solutions, but it requires digging up your yard, garden, walkways, and possibly part of your driveway.",
    totalDurationDays: { min: 3, max: 14 },
    phases: [
      {
        code: "1.0",
        name: "Pre-Construction",
        description: "The crew inspects your basement to find the source of moisture (cracks, failed weeping tile, hydrostatic pressure, or simply poor grading). They\u2019ll recommend exterior waterproofing if water is entering through the foundation walls or footing \u2014 not just condensation.",
        tasks: [
          { code: "1.1", name: "Site assessment and moisture testing", durationDays: 1, costPctOfTotal: 3, description: "A technician checks your basement for signs of water entry: efflorescence (white mineral deposits), staining, active leaks, and musty odors. They may use a moisture meter on the walls. The assessment determines which walls need treatment and whether interior or exterior waterproofing is appropriate." },
          { code: "1.2", name: "Obtain permit (if required)", durationDays: 3, costPctOfTotal: 2, description: "Some municipalities require a permit for exterior excavation near property lines. Toronto typically doesn\u2019t for basic waterproofing, but your contractor should check. If your weeping tile connects to the city storm sewer, a plumbing permit may be needed." },
          { code: "1.3", name: "Order materials and schedule delivery", durationDays: 2, costPctOfTotal: 2, dependsOn: ["1.1"], description: "Waterproofing membrane, dimpled drainage board, Big-O weeping tile with filter fabric, clean gravel, and backfill material are ordered. Most materials are in stock at building supply stores \u2014 no long lead times." },
        ],
      },
      {
        code: "2.0",
        name: "Site Preparation",
        description: "The crew digs a trench along the exterior of your foundation, all the way down to the footing (typically 6\u20138 feet deep). This is the most disruptive phase \u2014 your yard, garden beds, walkways, and possibly a deck or driveway section will be temporarily removed.",
        tasks: [
          { code: "2.1", name: "Protect landscaping and utilities", durationDays: 0.5, costPctOfTotal: 2, dependsOn: ["1.3"], description: "Shrubs and plants near the foundation are transplanted or protected. Gas meters, AC units, and downspouts along the work area are temporarily disconnected or moved. The crew marks the excavation zone." },
          { code: "2.2", name: "Excavation to footing depth", durationDays: 2, costPctOfTotal: 12, dependsOn: ["2.1"], description: "A mini excavator digs a trench 3\u20134 feet wide along the foundation, all the way down to the concrete footing. In a typical Toronto semi with 6-foot-deep footings, this produces 10\u201320 cubic yards of soil per wall. The soil is stockpiled on site for backfill." },
          { code: "2.3", name: "Remove old parging and loose material", durationDays: 1, costPctOfTotal: 5, dependsOn: ["2.2"], description: "The exposed foundation wall is cleaned with a pressure washer or wire brush. Old parging (the thin cement coating), deteriorated tar-based damp proofing, and loose concrete are removed to create a clean surface for the new membrane." },
        ],
      },
      {
        code: "3.0",
        name: "Waterproofing Application",
        description: "This is the actual waterproofing work. The clean foundation wall gets a multi-layer system: crack repair, primer, rubberized membrane, drainage board, and new weeping tile. Each layer serves a specific purpose \u2014 together they create a system that keeps water out for 25+ years.",
        tasks: [
          { code: "3.1", name: "Foundation wall cleaning and prep", durationDays: 0.5, costPctOfTotal: 3, dependsOn: ["2.3"], description: "Any remaining dirt, morite, or old coatings are cleaned off. The wall must be dry and free of loose material for the membrane to bond. Cracks are chiseled open to a V-shape for proper repair." },
          { code: "3.2", name: "Crack and void repair with epoxy/polyurethane", durationDays: 1, costPctOfTotal: 8, dependsOn: ["3.1"], description: "Cracks are injected with epoxy (structural repair) or polyurethane foam (flexible, for actively leaking cracks). Honeycomb voids in poured concrete are patched with hydraulic cement. This stops water from passing through the wall itself." },
          { code: "3.3", name: "Apply primer coat", durationDays: 0.5, costPctOfTotal: 4, dependsOn: ["3.2"], description: "A bonding primer is rolled or sprayed onto the foundation wall. This ensures the waterproofing membrane adheres properly to the concrete or block surface." },
          { code: "3.4", name: "Apply rubberized asphalt membrane (2 coats)", durationDays: 1, costPctOfTotal: 15, dependsOn: ["3.3"], description: "Two coats of rubberized asphalt waterproofing are sprayed or troweled onto the foundation wall, from footing to grade level. This creates a seamless, flexible, waterproof barrier. Unlike old tar-based damp proofing, rubberized membrane stretches and self-seals around small cracks." },
          { code: "3.5", name: "Install dimpled drainage board", durationDays: 1, costPctOfTotal: 10, dependsOn: ["3.4"], description: "A rigid plastic sheet with raised dimples is placed over the membrane, dimples facing the wall. This creates an air gap that lets any water that reaches the wall drain down to the weeping tile instead of pooling against the membrane. It also protects the membrane from rocks during backfill." },
          { code: "3.6", name: "Install exterior weeping tile at footing", durationDays: 1, costPctOfTotal: 12, dependsOn: ["3.5"], description: "4-inch perforated Big-O pipe wrapped in filter fabric is laid alongside the footing in a bed of clean gravel. This collects groundwater before it can reach your foundation. The filter fabric is critical \u2014 without it, soil particles clog the pipe within a few years." },
          { code: "3.7", name: "Connect to storm sewer or daylighting", durationDays: 0.5, costPctOfTotal: 5, dependsOn: ["3.6"], description: "The weeping tile must drain somewhere. Options: connect to the city storm sewer (requires a permit), daylight to a lower area of your yard, or connect to an interior sump pump. The connection is made with solid (non-perforated) pipe." },
          { code: "3.8", name: "Place gravel over weeping tile", durationDays: 0.5, costPctOfTotal: 6, dependsOn: ["3.7"], description: "6\u201312 inches of clean 3/4-inch gravel covers the weeping tile. This gravel layer acts as a drainage highway \u2014 water flows easily through gravel to the weeping tile below. No sand or soil should contact the weeping tile directly." },
        ],
      },
      {
        code: "4.0",
        name: "Close-Out",
        description: "The trench is backfilled, the grade is restored to slope away from the house, and your yard is put back together. Proper grading is essential \u2014 even the best waterproofing can\u2019t overcome surface water pooling against your foundation.",
        tasks: [
          { code: "4.1", name: "Backfill and compact in layers", durationDays: 1, costPctOfTotal: 8, dependsOn: ["3.8"], description: "The excavated soil is placed back in 12-inch layers, each mechanically compacted. The first few feet against the foundation should be gravel or granular fill (not clay) to promote drainage. Avoid using large rocks that could puncture the drainage board." },
          { code: "4.2", name: "Restore grade (6-inch slope away)", durationDays: 0.5, costPctOfTotal: 4, dependsOn: ["4.1"], description: "The final grade must slope away from the house: minimum 6 inches of drop over the first 10 feet. This is the single most important factor in keeping your basement dry \u2014 surface water must flow away from the foundation, not toward it." },
          { code: "4.3", name: "Municipal inspection (if required)", durationDays: 0.5, costPctOfTotal: 2, dependsOn: ["4.2"], description: "If a permit was pulled, the city inspector checks the drainage connection and backfill. Some municipalities want to see the weeping tile before backfill \u2014 your contractor should coordinate the timing." },
          { code: "4.4", name: "Site cleanup and debris removal", durationDays: 0.5, costPctOfTotal: 3, dependsOn: ["4.2"], description: "Excess soil, old waterproofing material, and construction debris are removed from the property. Landscaping, walkways, and any removed structures are restored or repaired." },
          { code: "4.5", name: "Warranty documentation and handover", durationDays: 0.5, costPctOfTotal: 1, dependsOn: ["4.3"], description: "The contractor provides a written warranty (typically 15\u201325 years for exterior waterproofing). Keep photos of the exposed foundation, membrane, and weeping tile \u2014 you\u2019ll never see these again once the trench is backfilled." },
        ],
      },
    ],
  },

  // ========================================
  // 3. FOUNDATION REPAIR
  // ========================================
  {
    serviceSlug: "foundation-repair",
    summary: "Foundation repair addresses structural cracks, bowing walls, and settlement issues using specialized techniques like epoxy injection, carbon fibre reinforcement, or helical piers. Most repairs are done from inside your basement without excavation. The repair method depends on whether the crack is structural (needs epoxy), actively leaking (needs polyurethane foam), or if the wall is bowing inward (needs carbon fibre straps or wall anchors).",
    totalDurationDays: { min: 1, max: 35 },
    phases: [
      {
        code: "1.0",
        name: "Assessment & Planning",
        description: "A structural engineer inspects your foundation to determine the cause of cracking or movement and recommends the appropriate repair method. Different problems require different solutions—a hairline shrinkage crack is very different from a horizontal crack caused by soil pressure.",
        tasks: [
          { code: "1.1", name: "Structural engineer inspection", durationDays: 2, costPctOfTotal: 5, description: "The engineer examines crack patterns, wall deflection, and any settlement to diagnose the root cause and design the repair strategy." },
          { code: "1.2", name: "Crack mapping and documentation", durationDays: 1, costPctOfTotal: 2, description: "All cracks are measured, photographed, and mapped to establish a baseline for monitoring future movement." },
          { code: "1.3", name: "Determine repair method (epoxy/polyurethane/carbon fiber)", durationDays: 1, costPctOfTotal: 1, dependsOn: ["1.1"], description: "The engineer specifies whether to use epoxy (structural), polyurethane (waterproofing), carbon fibre (reinforcement), or helical piers (settlement)." },
          { code: "1.4", name: "Order specialized materials", durationDays: 3, costPctOfTotal: 3, dependsOn: ["1.3"], description: "Epoxy resins, carbon fibre fabric, injection ports, and other specialized materials are ordered from commercial suppliers." },
        ],
      },
      {
        code: "2.0",
        name: "Preparation",
        description: "The work area is prepared and cracks are cleaned to ensure proper adhesion of repair materials. This phase involves minimal disruption—most work is localized to the cracked areas.",
        tasks: [
          { code: "2.1", name: "Interior prep (move furniture, protect floors)", durationDays: 0.5, costPctOfTotal: 2, dependsOn: ["1.4"], description: "Furniture is moved away from walls and floors are protected with drop sheets where needed." },
          { code: "2.2", name: "Clean and grind crack edges", durationDays: 1, costPctOfTotal: 4, dependsOn: ["2.1"], description: "Cracks are ground into a V-shape and cleaned with wire brushes or compressed air to remove loose material and ensure epoxy bonding." },
          { code: "2.3", name: "Drill injection ports (if applicable)", durationDays: 1, costPctOfTotal: 5, dependsOn: ["2.2"], description: "For epoxy or polyurethane injection, small holes are drilled every 8–12 inches along the crack to insert injection ports." },
        ],
      },
      {
        code: "3.0",
        name: "Repair Execution",
        description: "The actual repair work is performed using the engineer-specified method. Epoxy injection fills cracks to restore structural integrity, carbon fibre prevents further bowing, and helical piers stabilize settled foundations.",
        tasks: [
          { code: "3.1", name: "Epoxy or polyurethane injection", durationDays: 2, costPctOfTotal: 25, dependsOn: ["2.3"], description: "Two-part epoxy or expanding polyurethane foam is injected under pressure through the ports, filling the crack from bottom to top." },
          { code: "3.2", name: "Carbon fiber reinforcement strips (if needed)", durationDays: 2, costPctOfTotal: 20, dependsOn: ["2.3"], description: "High-strength carbon fibre fabric is bonded vertically to bowing walls with epoxy to prevent further inward movement." },
          { code: "3.3", name: "Helical pier installation (if settlement)", durationDays: 5, costPctOfTotal: 18, dependsOn: ["2.1"], description: "For settled foundations, steel helical piers are driven deep into stable soil and attached to the footing to lift and stabilize the foundation." },
          { code: "3.4", name: "Cure time for epoxy/polyurethane", durationDays: 7, costPctOfTotal: 0, dependsOn: ["3.1"], description: "Epoxy requires 7 days to fully cure and develop its structural bond strength." },
        ],
      },
      {
        code: "4.0",
        name: "Close-Out",
        description: "Injection ports are removed, surfaces are patched smooth, and the engineer issues a completion report. The repaired cracks should be monitored annually for any new movement.",
        tasks: [
          { code: "4.1", name: "Remove injection ports and surface prep", durationDays: 1, costPctOfTotal: 3, dependsOn: ["3.4"], description: "Injection ports are cut flush with the wall and surfaces are ground smooth in preparation for patching." },
          { code: "4.2", name: "Patch and finish interior surfaces", durationDays: 2, costPctOfTotal: 6, dependsOn: ["4.1"], description: "Cracks and injection points are filled with hydraulic cement or patching compound and finished to match the surrounding wall." },
          { code: "4.3", name: "Engineer sign-off and report", durationDays: 1, costPctOfTotal: 3, dependsOn: ["3.4"], description: "The structural engineer inspects the completed repairs and issues a letter confirming the work meets their specifications." },
          { code: "4.4", name: "Cleanup and final walkthrough", durationDays: 0.5, costPctOfTotal: 2, dependsOn: ["4.2"], description: "The work area is cleaned of dust and debris, and the homeowner is walked through the repairs and monitoring recommendations." },
          { code: "4.5", name: "Warranty documentation", durationDays: 0.5, costPctOfTotal: 1, dependsOn: ["4.3"], description: "The contractor provides warranty documentation (typically 10–25 years) covering the structural integrity of the repair." },
        ],
      },
    ],
  },

  // ========================================
  // 4. CONCRETE WORKS
  // ========================================
  {
    serviceSlug: "concrete-works",
    summary: "Concrete work includes driveways, garage floors, basement slabs, walkways, and patios. The process involves excavation, compacting a gravel base, building wooden forms, laying rebar or wire mesh, pouring concrete, finishing the surface, and curing for 28 days. Proper base preparation and reinforcement prevent cracking and settling over time.",
    totalDurationDays: { min: 1, max: 38 },
    phases: [
      {
        code: "1.0",
        name: "Planning & Preparation",
        description: "The site is measured and the concrete pour is planned. Permits may be required for large driveways or structural slabs. Concrete is ordered fresh for the pour date—you can't store it.",
        tasks: [
          { code: "1.1", name: "Site measurement and layout", durationDays: 1, costPctOfTotal: 3, description: "The area is measured and marked with stakes and string lines to establish the exact pour dimensions and grade." },
          { code: "1.2", name: "Order concrete and materials", durationDays: 2, costPctOfTotal: 2, description: "Concrete (typically 35 MPa for residential), rebar, wire mesh, gravel, and forming lumber are ordered for delivery on pour day." },
          { code: "1.3", name: "Obtain permit (if required)", durationDays: 5, costPctOfTotal: 2, dependsOn: ["1.1"], description: "Large driveways or structural slabs may require a building permit depending on municipal bylaws." },
        ],
      },
      {
        code: "2.0",
        name: "Site Work",
        description: "The ground is excavated, levelled, and compacted. A gravel base provides drainage and prevents the slab from settling. Forms create the shape and contain the concrete during the pour.",
        tasks: [
          { code: "2.1", name: "Excavation and grading", durationDays: 2, costPctOfTotal: 8, dependsOn: ["1.3"], description: "The area is excavated to the required depth (typically 6–8 inches for a driveway) and graded to ensure proper drainage slope." },
          { code: "2.2", name: "Granular base (MOT Type 1) and compaction", durationDays: 1, costPctOfTotal: 7, dependsOn: ["2.1"], description: "4–6 inches of crushed gravel is spread and mechanically compacted to create a stable, draining base that prevents frost heave and settling." },
          { code: "2.3", name: "Install vapor barrier (if applicable)", durationDays: 0.5, costPctOfTotal: 2, dependsOn: ["2.2"], description: "A 6-mil polyethylene sheet is laid over the gravel to prevent moisture from wicking up into the concrete slab." },
          { code: "2.4", name: "Build formwork and set screed guides", durationDays: 2, costPctOfTotal: 8, dependsOn: ["2.3"], description: "Wooden or metal forms are staked along the perimeter to shape the slab, and screed guides ensure the correct thickness and slope." },
          { code: "2.5", name: "Install rebar or wire mesh reinforcement", durationDays: 1, costPctOfTotal: 6, dependsOn: ["2.4"], description: "Steel rebar (#10M or #15M) or welded wire mesh is placed on chairs to hold it mid-height in the slab, preventing cracking from shrinkage and temperature changes." },
        ],
      },
      {
        code: "3.0",
        name: "Pour & Finish",
        description: "Concrete is poured, levelled, and finished to the desired surface texture. Proper finishing and curing are critical—rushed work leads to surface defects and weak concrete.",
        tasks: [
          { code: "3.1", name: "Concrete pour (35 MPa residential grade)", durationDays: 1, costPctOfTotal: 25, dependsOn: ["2.5"], description: "Fresh concrete is delivered by truck and poured into the forms, spread evenly, and vibrated to eliminate air pockets." },
          { code: "3.2", name: "Screed and level surface", durationDays: 0.5, costPctOfTotal: 5, dependsOn: ["3.1"], description: "A straightedge (screed board) is dragged across the top of the forms to level the concrete to the correct height and slope." },
          { code: "3.3", name: "Bull float and initial finishing", durationDays: 0.5, costPctOfTotal: 4, dependsOn: ["3.2"], description: "A large flat tool (bull float) smooths the surface and embeds aggregate just below the surface, creating a smooth base for final finishing." },
          { code: "3.4", name: "Final trowel finish and edging", durationDays: 0.5, costPctOfTotal: 5, dependsOn: ["3.3"], description: "Steel trowels create the final smooth or textured finish, and edges are rounded with an edging tool to prevent chipping." },
          { code: "3.5", name: "Apply curing compound or cover", durationDays: 0.5, costPctOfTotal: 2, dependsOn: ["3.4"], description: "A liquid curing compound or plastic sheeting is applied to keep the concrete moist, which is essential for proper strength development." },
          { code: "3.6", name: "28-day cure period (for full strength)", durationDays: 28, costPctOfTotal: 0, dependsOn: ["3.5"], description: "Concrete reaches 70% strength in 7 days but requires 28 days to reach full design strength—no heavy loads during this period." },
        ],
      },
      {
        code: "4.0",
        name: "Close-Out",
        description: "Forms are removed, the area is backfilled and graded, and the site is cleaned. An inspection verifies the work meets code if required.",
        tasks: [
          { code: "4.1", name: "Remove forms (after 7 days minimum)", durationDays: 0.5, costPctOfTotal: 2, dependsOn: ["3.5"], description: "Formwork is carefully removed after 7 days when the concrete has sufficient strength to support itself." },
          { code: "4.2", name: "Backfill and grade restoration", durationDays: 1, costPctOfTotal: 5, dependsOn: ["4.1"], description: "Any gaps around the slab are backfilled with soil and graded to slope away from the concrete to prevent water pooling." },
          { code: "4.3", name: "Inspection (if required)", durationDays: 0.5, costPctOfTotal: 2, dependsOn: ["3.6"], description: "If a permit was issued, the municipal inspector verifies the slab thickness, reinforcement, and grading meet code requirements." },
          { code: "4.4", name: "Site cleanup", durationDays: 0.5, costPctOfTotal: 2, dependsOn: ["4.2"], description: "Excess concrete, formwork, and debris are removed from the property, leaving the site clean." },
        ],
      },
    ],
  },

  // ========================================
  // 5. MASONRY
  // ========================================
  {
    serviceSlug: "masonry",
    summary: "Masonry work includes building or repairing brick, stone, or block structures like chimneys, retaining walls, exterior veneers, and garden features. Each brick or stone is individually set in mortar and must be level, plumb, and properly bonded. Quality masonry requires skilled tradespeople—poor workmanship leads to cracking, water infiltration, and structural failure.",
    totalDurationDays: { min: 1, max: 21 },
    phases: [
      {
        code: "1.0",
        name: "Planning",
        description: "The project is designed and materials are selected. Brick and stone have long lead times if custom colours or sizes are required. Scaffolding may be needed for work above ground level.",
        tasks: [
          { code: "1.1", name: "Site assessment and design", durationDays: 2, costPctOfTotal: 4, description: "The mason inspects the site, measures dimensions, and plans the layout, bond pattern, and any structural reinforcement needed." },
          { code: "1.2", name: "Order brick/stone and mortar materials", durationDays: 3, costPctOfTotal: 3, description: "Brick, stone, mortar mix, rebar, and lintels are ordered—custom brick colours or imported stone can have 4–8 week lead times." },
          { code: "1.3", name: "Scaffolding setup (if required)", durationDays: 1, costPctOfTotal: 5, dependsOn: ["1.2"], description: "For work above 6 feet, scaffolding is erected to provide safe access—required by Ontario occupational health and safety regulations." },
        ],
      },
      {
        code: "2.0",
        name: "Preparation",
        description: "Old masonry is removed if this is a repair, and the foundation or base is prepared. String lines establish the precise alignment and level for the first course.",
        tasks: [
          { code: "2.1", name: "Demolition of existing masonry (if repair)", durationDays: 2, costPctOfTotal: 8, dependsOn: ["1.3"], description: "Damaged or deteriorated brick, block, or stone is carefully removed, and mortar is chiselled out to create clean edges for new work." },
          { code: "2.2", name: "Foundation/base preparation", durationDays: 1, costPctOfTotal: 5, dependsOn: ["2.1"], description: "The base (footing or existing wall) is cleaned, levelled, and checked for structural soundness—masonry must rest on a stable, level base." },
          { code: "2.3", name: "Set string lines and layout", durationDays: 0.5, costPctOfTotal: 2, dependsOn: ["2.2"], description: "String lines are stretched between corner stakes to guide the mason in keeping courses level and plumb throughout the build." },
        ],
      },
      {
        code: "3.0",
        name: "Masonry Work",
        description: "The mason lays each course of brick or stone, ensuring proper mortar coverage, alignment, and bond. Steel reinforcement and structural ties are embedded as the wall rises.",
        tasks: [
          { code: "3.1", name: "Lay first course (critical for alignment)", durationDays: 1, costPctOfTotal: 8, dependsOn: ["2.3"], description: "The first course (row) is set in mortar and checked obsessively for level—any error here propagates up the entire wall." },
          { code: "3.2", name: "Build subsequent courses (with rebar if structural)", durationDays: 10, costPctOfTotal: 35, dependsOn: ["3.1"], description: "Each brick or block is buttered with mortar, tapped into position, and checked for alignment. Rebar is embedded in block cores or between brick wythes if structural strength is required." },
          { code: "3.3", name: "Install lintels and structural ties", durationDays: 1, costPctOfTotal: 6, dependsOn: ["3.2"], description: "Steel lintels span openings for windows or doors, and metal ties anchor the masonry veneer to the structural wall behind." },
          { code: "3.4", name: "Pointing and tooling joints", durationDays: 2, costPctOfTotal: 8, dependsOn: ["3.2"], description: "Mortar joints are shaped (concave, flush, or raked) with a pointing tool to create a clean finish and shed water properly." },
        ],
      },
      {
        code: "4.0",
        name: "Finishing",
        description: "Excess mortar is cleaned off, sealant is applied if needed, and scaffolding is removed. The finished masonry is inspected for alignment, joint quality, and structural soundness.",
        tasks: [
          { code: "4.1", name: "Clean excess mortar and efflorescence", durationDays: 1, costPctOfTotal: 4, dependsOn: ["3.4"], description: "Dried mortar splatter is brushed off with a stiff brush, and any white efflorescence (salt deposits) is cleaned with a mild acid wash." },
          { code: "4.2", name: "Apply sealant (if required)", durationDays: 1, costPctOfTotal: 3, dependsOn: ["4.1"], description: "A breathable masonry sealant may be applied to protect against water penetration while allowing moisture vapour to escape." },
          { code: "4.3", name: "Remove scaffolding", durationDays: 0.5, costPctOfTotal: 2, dependsOn: ["4.2"], description: "Scaffolding is carefully dismantled and removed from the site once the work is complete and inspected." },
          { code: "4.4", name: "Site cleanup and debris removal", durationDays: 0.5, costPctOfTotal: 2, dependsOn: ["4.3"], description: "Broken brick, excess mortar, and other debris are removed from the property." },
          { code: "4.5", name: "Final inspection and walkthrough", durationDays: 0.5, costPctOfTotal: 1, dependsOn: ["4.4"], description: "The homeowner and mason walk through the completed work to verify quality and discuss any maintenance requirements." },
        ],
      },
    ],
  },

  // ========================================
  // 6. FRAMING
  // ========================================
  {
    serviceSlug: "framing",
    summary: "Framing creates the wooden skeleton of your walls, floors, and ceilings. Exterior walls use 2×6 studs spaced 16 inches apart, interior walls use 2×4 studs, and openings get engineered headers. Ontario Building Code requires specific lumber grades, fastener schedules, and fire blocking. A framing inspection is mandatory before insulation and drywall can proceed.",
    totalDurationDays: { min: 7, max: 28 },
    phases: [
      {
        code: "1.0",
        name: "Planning",
        description: "Architectural plans are reviewed, materials are calculated and ordered, and a building permit is obtained. Lumber prices fluctuate, so material costs should be locked in early.",
        tasks: [
          { code: "1.1", name: "Review architectural plans", durationDays: 1, costPctOfTotal: 2, description: "The framing crew reviews the architectural drawings to understand wall locations, ceiling heights, window/door openings, and structural requirements." },
          { code: "1.2", name: "Obtain building permit", durationDays: 7, costPctOfTotal: 3, description: "A building permit is required for framing additions, second storey additions, or structural alterations—processing takes 1–2 weeks in most Ontario municipalities." },
          { code: "1.3", name: "Order lumber and framing materials", durationDays: 3, costPctOfTotal: 4, dependsOn: ["1.1"], description: "Dimensional lumber (2×4, 2×6, 2×8, 2×10), engineered lumber (LVL beams), plywood, nails, and metal connectors are ordered for delivery." },
        ],
      },
      {
        code: "2.0",
        name: "Framing Execution",
        description: "Walls are built flat on the floor and then tilted upright. Each wall is plumbed, squared, and braced. Headers span openings, and joists create the structure for floors or ceilings.",
        tasks: [
          { code: "2.1", name: "Layout and mark floor/wall positions", durationDays: 1, costPctOfTotal: 3, dependsOn: ["1.3"], description: "Chalk lines mark the exact position of every wall on the floor or slab, ensuring rooms meet the architectural dimensions." },
          { code: "2.2", name: "Frame exterior walls (2x6 studs @ 16 in. O.C.)", durationDays: 4, costPctOfTotal: 20, dependsOn: ["2.1"], description: "Exterior walls are built with 2×6 studs spaced 16 inches on centre to accommodate R-20 insulation, then tilted into position and braced." },
          { code: "2.3", name: "Frame interior load-bearing walls", durationDays: 2, costPctOfTotal: 12, dependsOn: ["2.1"], description: "Walls that carry the weight of the structure above (supporting beams or joists) are built with the lumber size and spacing specified by the structural engineer." },
          { code: "2.4", name: "Frame interior partition walls (2x4)", durationDays: 3, costPctOfTotal: 10, dependsOn: ["2.3"], description: "Non-load-bearing interior partition walls use 2×4 studs and can be placed anywhere without structural calculations." },
          { code: "2.5", name: "Install headers and lintels for openings", durationDays: 2, costPctOfTotal: 8, dependsOn: ["2.2"], description: "Engineered headers (LVL beams or built-up 2× lumber) span window and door openings to carry the load above the opening." },
          { code: "2.6", name: "Frame ceiling joists or floor joists", durationDays: 3, costPctOfTotal: 15, dependsOn: ["2.4"], description: "2×8 or 2×10 joists are installed at 16-inch centres to support the ceiling below or the floor above." },
          { code: "2.7", name: "Install temporary bracing", durationDays: 1, costPctOfTotal: 3, dependsOn: ["2.6"], description: "Diagonal bracing keeps walls plumb and prevents racking until sheathing or permanent bracing is installed." },
        ],
      },
      {
        code: "3.0",
        name: "Inspection & Close-Out",
        description: "The building inspector verifies framing meets code before it's covered. Fire blocking is installed to prevent fire spread through wall cavities, and the site is cleaned for the next trades.",
        tasks: [
          { code: "3.1", name: "Framing inspection by building department", durationDays: 1, costPctOfTotal: 2, dependsOn: ["2.7"], description: "The municipal inspector checks stud spacing, header sizes, joist spans, and structural connections—no drywall or insulation can be installed until the framing passes." },
          { code: "3.2", name: "Correct deficiencies (if any)", durationDays: 2, costPctOfTotal: 5, dependsOn: ["3.1"], description: "If the inspector identifies code violations (undersized headers, missing blocking, etc.), these must be corrected and re-inspected." },
          { code: "3.3", name: "Install fire blocking and draft stops", durationDays: 1, costPctOfTotal: 4, dependsOn: ["3.1"], description: "Horizontal 2× blocking is installed mid-height in walls and at floor/ceiling intersections to slow fire spread through stud cavities." },
          { code: "3.4", name: "Site cleanup and scrap removal", durationDays: 1, costPctOfTotal: 2, dependsOn: ["3.3"], description: "Cut-off lumber, sawdust, and packaging are cleaned up so electrical, plumbing, and HVAC trades can work safely." },
          { code: "3.5", name: "Handover to mechanical trades", durationDays: 0.5, costPctOfTotal: 1, dependsOn: ["3.4"], description: "The framing crew coordinates with electricians, plumbers, and HVAC installers to ensure everyone knows where to drill and run services." },
        ],
      },
    ],
  },

  // ========================================
  // 7. ELECTRICAL
  // ========================================
  {
    serviceSlug: "electrical",
    summary: "Electrical work must be performed by a licensed electrician and inspected by the Electrical Safety Authority (ESA). It involves calculating electrical load, upgrading the panel if needed, running wire through walls, installing outlets and switches, and connecting circuits. All work requires an ESA permit—unlicensed electrical work voids your home insurance.",
    totalDurationDays: { min: 1, max: 10 },
    phases: [
      {
        code: "1.0",
        name: "Pre-Construction",
        description: "The electrician calculates your home's electrical load to determine if a panel upgrade is needed, obtains an ESA permit, and orders materials. Every electrical project in Ontario requires ESA approval.",
        tasks: [
          { code: "1.1", name: "Load calculation and panel sizing", durationDays: 1, costPctOfTotal: 3, description: "The electrician tallies your electrical load (appliances, HVAC, EV charger, etc.) to determine if your 100A or 200A service panel has sufficient capacity." },
          { code: "1.2", name: "Obtain ESA permit", durationDays: 2, costPctOfTotal: 3, description: "An Electrical Safety Authority (ESA) permit is legally required for all electrical work in Ontario—the permit number must be posted on site." },
          { code: "1.3", name: "Order materials (wire, panel, devices)", durationDays: 2, costPctOfTotal: 4, dependsOn: ["1.1"], description: "NMD-90 cable (Romex), electrical panel, breakers, junction boxes, receptacles, switches, and GFCI/AFCI devices are ordered." },
        ],
      },
      {
        code: "2.0",
        name: "Rough-In",
        description: "With walls open (after framing, before drywall), the electrician runs cables, installs boxes, and upgrades the panel if needed. The ESA inspects this work before walls are closed.",
        tasks: [
          { code: "2.1", name: "Panel upgrade (200A service if required)", durationDays: 1, costPctOfTotal: 15, dependsOn: ["1.3"], description: "If the load calculation shows insufficient capacity, the panel is upgraded from 100A to 200A—this requires coordinating a service disconnect with the utility." },
          { code: "2.2", name: "Run NMD-90 cables through studs and joists", durationDays: 2, costPctOfTotal: 18, dependsOn: ["2.1"], description: "14/2 cable (15A circuits) or 12/2 cable (20A circuits) is pulled through drilled holes in studs and joists to each outlet, switch, and fixture location." },
          { code: "2.3", name: "Install electrical boxes (outlets, switches, fixtures)", durationDays: 1, costPctOfTotal: 10, dependsOn: ["2.2"], description: "Plastic or metal junction boxes are nailed or screwed to studs at the correct height—outlets 12 inches above floor, switches 48 inches." },
          { code: "2.4", name: "Rough-in inspection by ESA", durationDays: 1, costPctOfTotal: 3, dependsOn: ["2.3"], description: "The ESA inspector verifies wire gauge, box fill calculations, proper stapling, and grounding—no drywall can be installed until rough-in passes." },
        ],
      },
      {
        code: "3.0",
        name: "Finishing",
        description: "After drywall is complete, the electrician installs receptacles, switches, light fixtures, and connects all circuits to the panel. Every circuit is tested for proper operation and safety.",
        tasks: [
          { code: "3.1", name: "Install receptacles, switches, and cover plates", durationDays: 1, costPctOfTotal: 12, dependsOn: ["2.4"], description: "Receptacles and switches are wired into boxes, screwed tight, and covered with decorator plates—GFCI outlets required in kitchens, bathrooms, and outdoors." },
          { code: "3.2", name: "Install light fixtures and ceiling fans", durationDays: 1, costPctOfTotal: 10, dependsOn: ["2.4"], description: "Ceiling lights, pot lights, pendant fixtures, and ceiling fans are mounted and wired—fan-rated boxes are required for ceiling fans." },
          { code: "3.3", name: "Connect circuits to panel and label", durationDays: 1, costPctOfTotal: 8, dependsOn: ["3.1", "3.2"], description: "Each circuit is connected to a breaker in the panel, and the panel directory is labelled clearly (e.g., 'Kitchen Outlets,' 'Master Bedroom')." },
          { code: "3.4", name: "Test all circuits and GFCI/AFCI devices", durationDays: 0.5, costPctOfTotal: 4, dependsOn: ["3.3"], description: "Every outlet and switch is tested for correct wiring, polarity, and grounding. GFCI and AFCI devices are trip-tested to ensure they function." },
        ],
      },
      {
        code: "4.0",
        name: "Close-Out",
        description: "The ESA performs a final inspection to verify all electrical work is safe and code-compliant. Once approved, the electrician provides an ESA certificate—required for insurance and resale.",
        tasks: [
          { code: "4.1", name: "Final ESA inspection", durationDays: 1, costPctOfTotal: 3, dependsOn: ["3.4"], description: "The ESA inspector checks receptacles, switches, panel labelling, GFCI/AFCI operation, and bonding/grounding—this is the final approval." },
          { code: "4.2", name: "Provide panel directory and documentation", durationDays: 0.5, costPctOfTotal: 2, dependsOn: ["4.1"], description: "The electrician provides a completed panel directory, ESA certificate, and any load calculations or as-built drawings." },
          { code: "4.3", name: "Cleanup and debris removal", durationDays: 0.5, costPctOfTotal: 2, dependsOn: ["4.1"], description: "Wire cut-offs, packaging, and debris are cleaned from the site." },
          { code: "4.4", name: "Client walkthrough and handover", durationDays: 0.5, costPctOfTotal: 1, dependsOn: ["4.2"], description: "The electrician walks the homeowner through the panel layout, GFCI testing, and any special circuits (EV charger, sub-panel, etc.)." },
        ],
      },
    ],
  },

  // ========================================
  // 8. PLUMBING
  // ========================================
  {
    serviceSlug: "plumbing",
    summary: "Plumbing work involves installing drain, waste, and vent (DWV) pipes, water supply lines, gas lines, and fixtures. Rough-in happens with walls open, followed by a pressure test and inspection. Fixtures are installed after finishes are complete. All plumbing work in Ontario requires a licensed plumber and municipal permit.",
    totalDurationDays: { min: 1, max: 7 },
    phases: [
      {
        code: "1.0",
        name: "Planning",
        description: "The plumber reviews fixture locations, obtains a permit, and orders materials. High-end fixtures (imported tubs, specialty faucets) can have 6–12 week lead times.",
        tasks: [
          { code: "1.1", name: "Review plans and fixture schedule", durationDays: 0.5, costPctOfTotal: 2, description: "The plumber reviews the architectural plans to confirm locations of toilets, sinks, showers, bathtubs, and appliance connections." },
          { code: "1.2", name: "Obtain plumbing permit", durationDays: 2, costPctOfTotal: 3, description: "A municipal plumbing permit is required for any new fixtures, drain alterations, or water line modifications—processing takes 1–3 business days." },
          { code: "1.3", name: "Order fixtures and materials", durationDays: 2, costPctOfTotal: 5, dependsOn: ["1.1"], description: "DWV pipe (ABS), water supply (PEX or copper), gas pipe (black steel or CSST), fixtures, valves, and fittings are ordered." },
        ],
      },
      {
        code: "2.0",
        name: "Rough-In",
        description: "With walls open, the plumber installs all drain, vent, water, and gas piping. Drains must slope 1/4 inch per foot, and vents must extend through the roof. The work is pressure-tested and inspected before walls close.",
        tasks: [
          { code: "2.1", name: "Install DWV (drain-waste-vent) piping", durationDays: 2, costPctOfTotal: 20, dependsOn: ["1.3"], description: "ABS drain pipe is run from each fixture to the main drain stack, with proper slope (1/4 inch per foot) and venting to prevent siphoning and sewer gas entry." },
          { code: "2.2", name: "Install water supply lines (PEX or copper)", durationDays: 1, costPctOfTotal: 15, dependsOn: ["1.3"], description: "PEX tubing (most common) or copper pipe is run from the main shutoff to each fixture, with shutoff valves at every sink, toilet, and appliance." },
          { code: "2.3", name: "Install gas lines (if applicable)", durationDays: 1, costPctOfTotal: 10, dependsOn: ["1.3"], description: "Black steel pipe or CSST (flexible gas line) is run to gas appliances (range, dryer, fireplace, BBQ) and must be pressure-tested and TSSA-inspected." },
          { code: "2.4", name: "Pressure test water lines", durationDays: 0.5, costPctOfTotal: 3, dependsOn: ["2.2"], description: "Water lines are pressurized to 100 PSI for 2 hours to verify there are no leaks before walls are closed—any drop in pressure indicates a leak." },
          { code: "2.5", name: "Rough-in inspection", durationDays: 1, costPctOfTotal: 3, dependsOn: ["2.1", "2.4"], description: "The municipal inspector verifies drain slope, vent sizing, water line support, and gas line installation before drywall can proceed." },
        ],
      },
      {
        code: "3.0",
        name: "Fixture Installation",
        description: "After drywall, flooring, and tile are complete, the plumber installs toilets, sinks, tubs, showers, and appliance connections. All fixtures are tested for proper drainage and no leaks.",
        tasks: [
          { code: "3.1", name: "Install toilets and wax rings", durationDays: 0.5, costPctOfTotal: 8, dependsOn: ["2.5"], description: "Toilets are set on wax rings (or modern foam gaskets) over the closet flange, bolted down, and water supply is connected." },
          { code: "3.2", name: "Install sinks, faucets, and drains", durationDays: 1, costPctOfTotal: 12, dependsOn: ["2.5"], description: "Sinks (vanity, kitchen, laundry) are mounted, faucets attached, P-traps connected to drains, and supply lines connected to shutoff valves." },
          { code: "3.3", name: "Install bathtub/shower and fixtures", durationDays: 1, costPctOfTotal: 10, dependsOn: ["2.5"], description: "Tub/shower valves are trimmed out with handles and escutcheons, showerheads and tub spouts are installed, and drains are connected." },
          { code: "3.4", name: "Connect dishwasher and laundry hookups", durationDays: 0.5, costPctOfTotal: 5, dependsOn: ["2.5"], description: "Dishwasher water supply and drain are connected, and laundry hot/cold valves and standpipe drain are installed." },
        ],
      },
      {
        code: "4.0",
        name: "Close-Out",
        description: "Every fixture is tested for leaks and proper drainage. The inspector performs a final inspection, and the plumber provides warranty documentation for fixtures and workmanship.",
        tasks: [
          { code: "4.1", name: "Test all fixtures for leaks", durationDays: 0.5, costPctOfTotal: 2, dependsOn: ["3.4"], description: "Each sink, toilet, shower, and appliance is run for several minutes to check for leaks at supply connections, drains, and under fixtures." },
          { code: "4.2", name: "Final inspection", durationDays: 0.5, costPctOfTotal: 2, dependsOn: ["4.1"], description: "The municipal inspector verifies all fixtures are properly installed, drains function correctly, and gas connections are leak-free (soapy water test)." },
          { code: "4.3", name: "Cleanup and debris removal", durationDays: 0.5, costPctOfTotal: 2, dependsOn: ["4.2"], description: "Pipe cut-offs, packaging, and plumbing debris are removed from the site." },
          { code: "4.4", name: "Handover with warranty documentation", durationDays: 0.5, costPctOfTotal: 1, dependsOn: ["4.2"], description: "The plumber provides warranty cards for fixtures, shut-off valve locations, and maintenance recommendations (aerator cleaning, P-trap access, etc.)." },
        ],
      },
    ],
  },

  // ========================================
  // 9. HANDYMAN
  // ========================================
  {
    serviceSlug: "handyman",
    summary: "Handyman services cover small repairs, installations, and maintenance tasks that don't require licensed trades—drywall patching, door adjustments, shelf mounting, furniture assembly, caulking, and minor carpentry. Handymen cannot do permitted work (electrical, plumbing, gas, structural) but handle everything else.",
    totalDurationDays: { min: 1, max: 3 },
    phases: [
      {
        code: "1.0",
        name: "Planning",
        description: "The handyman visits to assess the task list, measure for materials, and identify any tools or specialty hardware needed. Materials are ordered or picked up locally.",
        tasks: [
          { code: "1.1", name: "Site visit and task list assessment", durationDays: 0.5, costPctOfTotal: 5, description: "The handyman walks through the property with the homeowner to review the list of repairs, installations, and tasks." },
          { code: "1.2", name: "Order materials and hardware", durationDays: 1, costPctOfTotal: 10, dependsOn: ["1.1"], description: "Materials like drywall compound, caulking, screws, anchors, weatherstripping, or hardware are purchased from local suppliers." },
        ],
      },
      {
        code: "2.0",
        name: "Execution",
        description: "The handyman completes the task list—repairing, installing, assembling, and sealing. Work is done efficiently, often tackling multiple small tasks in one visit.",
        tasks: [
          { code: "2.1", name: "Minor repairs (drywall, trim, doors)", durationDays: 1, costPctOfTotal: 30, dependsOn: ["1.2"], description: "Drywall holes are patched and sanded, trim is re-nailed or replaced, door hinges are adjusted, and squeaky floors are fixed." },
          { code: "2.2", name: "Fixture installations (shelves, towel bars, mirrors)", durationDays: 0.5, costPctOfTotal: 20, dependsOn: ["1.2"], description: "Shelves are mounted to studs or with toggle bolts, towel bars and toilet paper holders are installed, and mirrors are hung securely." },
          { code: "2.3", name: "Assembly (furniture, shelving units)", durationDays: 0.5, costPctOfTotal: 15, dependsOn: ["1.2"], description: "Flat-pack furniture (IKEA, Wayfair, etc.) and shelving units are assembled according to manufacturer instructions." },
          { code: "2.4", name: "Caulking and weatherstripping", durationDays: 0.5, costPctOfTotal: 10, dependsOn: ["1.2"], description: "Gaps around windows, doors, tubs, and baseboards are caulked, and door weatherstripping is replaced to seal drafts." },
        ],
      },
      {
        code: "3.0",
        name: "Close-Out",
        description: "The handyman tests all repairs and installations, cleans up, and walks the homeowner through the completed work.",
        tasks: [
          { code: "3.1", name: "Test functionality (doors, drawers, fixtures)", durationDays: 0.25, costPctOfTotal: 3, dependsOn: ["2.4"], description: "Doors are checked for smooth operation, drawers slide properly, shelves are level, and fixtures are secure." },
          { code: "3.2", name: "Cleanup and debris removal", durationDays: 0.25, costPctOfTotal: 4, dependsOn: ["2.4"], description: "Drywall dust, packaging, cut-offs, and tools are cleaned up and removed from the property." },
          { code: "3.3", name: "Client walkthrough and acceptance", durationDays: 0.25, costPctOfTotal: 3, dependsOn: ["3.1"], description: "The homeowner inspects the completed tasks and the handyman addresses any final touch-ups or adjustments." },
        ],
      },
    ],
  },

  // ========================================
  // 10. HVAC
  // ========================================
  {
    serviceSlug: "hvac",
    summary: "HVAC installation involves replacing or installing furnaces, air conditioners, ductwork, and thermostats. A Manual J load calculation determines the correct equipment size for your home. Gas furnaces require TSSA inspection, and refrigerant work must be done by a certified technician. Properly sized and installed HVAC systems last 15–20 years.",
    totalDurationDays: { min: 1, max: 5 },
    phases: [
      {
        code: "1.0",
        name: "Planning",
        description: "The HVAC contractor performs a load calculation to size equipment correctly, obtains permits, and orders the furnace, air conditioner, and materials. Undersized equipment won't heat/cool effectively; oversized equipment cycles on/off constantly and wastes energy.",
        tasks: [
          { code: "1.1", name: "Load calculation (Manual J)", durationDays: 1, costPctOfTotal: 4, description: "The contractor calculates your home's heating and cooling load based on square footage, insulation, windows, and air leakage to determine the correct equipment capacity." },
          { code: "1.2", name: "Obtain HVAC permit", durationDays: 2, costPctOfTotal: 3, description: "A municipal HVAC permit is required for furnace or air conditioner replacement—gas work also requires TSSA (Technical Standards & Safety Authority) approval." },
          { code: "1.3", name: "Order equipment (furnace, AC, ductwork)", durationDays: 3, costPctOfTotal: 5, dependsOn: ["1.1"], description: "The furnace (80–98% AFUE), air conditioner (13–20 SEER), ductwork, registers, and refrigerant lines are ordered based on the load calculation." },
        ],
      },
      {
        code: "2.0",
        name: "Installation",
        description: "The old equipment is removed, and new furnace, air conditioner, ductwork, and controls are installed. Gas connections, refrigerant lines, and electrical are wired according to code.",
        tasks: [
          { code: "2.1", name: "Remove old equipment (if replacement)", durationDays: 0.5, costPctOfTotal: 5, dependsOn: ["1.3"], description: "The old furnace and air conditioner are disconnected (gas, electrical, ductwork) and removed from the property for recycling or disposal." },
          { code: "2.2", name: "Install new furnace or air handler", durationDays: 1, costPctOfTotal: 20, dependsOn: ["2.1"], description: "The new furnace is positioned, levelled, connected to the gas line (requires TSSA inspection), vented through the roof or wall, and wired for power." },
          { code: "2.3", name: "Install outdoor AC condenser unit", durationDays: 0.5, costPctOfTotal: 12, dependsOn: ["1.3"], description: "The outdoor condenser unit is placed on a level pad, connected to electrical, and positioned away from windows and property lines per code." },
          { code: "2.4", name: "Run refrigerant lines and electrical", durationDays: 1, costPctOfTotal: 15, dependsOn: ["2.3"], description: "Insulated copper refrigerant lines (liquid and suction) are run from the outdoor unit to the indoor coil, and electrical is wired to the disconnect box." },
          { code: "2.5", name: "Install or modify ductwork", durationDays: 2, costPctOfTotal: 18, dependsOn: ["2.2"], description: "New ductwork is installed or existing ducts are sealed, insulated, and resized if needed to balance airflow to all rooms." },
          { code: "2.6", name: "Install thermostat and controls", durationDays: 0.5, costPctOfTotal: 5, dependsOn: ["2.4"], description: "A programmable or smart thermostat is mounted and wired to the furnace and air conditioner to control heating and cooling cycles." },
        ],
      },
      {
        code: "3.0",
        name: "Testing & Close-Out",
        description: "The system is charged with refrigerant, tested for proper operation, and balanced for even airflow. TSSA inspects gas connections, and the homeowner is trained on operating the system.",
        tasks: [
          { code: "3.1", name: "Charge refrigerant and test system", durationDays: 0.5, costPctOfTotal: 6, dependsOn: ["2.6"], description: "The air conditioner is charged with the exact refrigerant quantity specified by the manufacturer and tested for cooling performance." },
          { code: "3.2", name: "Commission and balance airflow", durationDays: 0.5, costPctOfTotal: 4, dependsOn: ["3.1"], description: "Supply and return air flows are measured and balanced to ensure even heating/cooling in all rooms and proper system efficiency." },
          { code: "3.3", name: "TSSA inspection (Technical Standards & Safety Authority)", durationDays: 1, costPctOfTotal: 3, dependsOn: ["3.2"], description: "The TSSA inspector verifies gas line connections, venting, and combustion safety on gas furnaces—required before the system can be used." },
          { code: "3.4", name: "Cleanup and debris removal", durationDays: 0.5, costPctOfTotal: 2, dependsOn: ["3.3"], description: "Old equipment, packaging, ductwork scraps, and debris are removed from the property." },
          { code: "3.5", name: "Client training and warranty registration", durationDays: 0.5, costPctOfTotal: 1, dependsOn: ["3.3"], description: "The homeowner is shown how to operate the thermostat, change filters, and maintain the system, and equipment warranties are registered with the manufacturer." },
        ],
      },
    ],
  },

  // ========================================
  // 11. INSULATION
  // ========================================
  {
    serviceSlug: "insulation",
    summary: "Insulation upgrades reduce heating and cooling costs by slowing heat transfer through walls, attics, and basements. Ontario Building Code requires R-20 in walls, R-60 in attics, and R-20 in basements. Air sealing before insulation is critical—air leaks waste more energy than missing insulation. Many upgrades qualify for Canada Greener Homes rebates.",
    totalDurationDays: { min: 1, max: 5 },
    phases: [
      {
        code: "1.0",
        name: "Planning",
        description: "A thermal audit (often with a blower door test) identifies air leaks and insulation gaps. The contractor calculates the R-values needed and recommends the best insulation type for each area.",
        tasks: [
          { code: "1.1", name: "Thermal audit and R-value calculation", durationDays: 1, costPctOfTotal: 5, description: "An energy auditor performs a blower door test to measure air leakage and uses a thermal camera to identify cold spots and missing insulation." },
          { code: "1.2", name: "Order insulation materials (batts, spray foam, blown-in)", durationDays: 2, costPctOfTotal: 5, dependsOn: ["1.1"], description: "Fibreglass batts (R-20 for walls), blown-in cellulose (R-60 for attics), and spray foam (for rim joists) are ordered based on the audit findings." },
        ],
      },
      {
        code: "2.0",
        name: "Installation",
        description: "Air sealing comes first—gaps, cracks, and penetrations are sealed with caulk or spray foam. Then insulation is installed in walls, attics, and basements. Vapour barriers control moisture in cold climates.",
        tasks: [
          { code: "2.1", name: "Air seal gaps, cracks, and penetrations", durationDays: 1, costPctOfTotal: 10, dependsOn: ["1.2"], description: "Gaps around windows, doors, electrical boxes, plumbing penetrations, and rim joists are sealed with caulk, expanding foam, or weatherstripping to stop air leaks." },
          { code: "2.2", name: "Install vapor barrier (if required)", durationDays: 0.5, costPctOfTotal: 5, dependsOn: ["2.1"], description: "A 6-mil polyethylene vapour barrier is stapled to the warm side of wall insulation to prevent moisture from condensing inside the wall cavity." },
          { code: "2.3", name: "Install batt insulation in walls (R-20)", durationDays: 2, costPctOfTotal: 25, dependsOn: ["2.2"], description: "Fibreglass batts are friction-fit between studs without compressing (compressing reduces R-value), and the vapour barrier is carefully sealed at seams and penetrations." },
          { code: "2.4", name: "Install attic insulation (R-60 blown-in cellulose)", durationDays: 1, costPctOfTotal: 30, dependsOn: ["2.2"], description: "Cellulose or fibreglass is blown into the attic to a depth of 16–18 inches (R-60), with baffles installed at eaves to maintain ventilation." },
          { code: "2.5", name: "Spray foam for rim joists and hard-to-reach areas", durationDays: 1, costPctOfTotal: 15, dependsOn: ["2.1"], description: "Closed-cell spray foam is applied to rim joists (where floor meets foundation) and other hard-to-insulate areas—it seals air leaks and insulates simultaneously." },
        ],
      },
      {
        code: "3.0",
        name: "Close-Out",
        description: "The building inspector verifies insulation meets code (if a permit was required), and the contractor provides documentation for rebate applications.",
        tasks: [
          { code: "3.1", name: "Building inspection (if required)", durationDays: 0.5, costPctOfTotal: 2, dependsOn: ["2.5"], description: "The building inspector checks that insulation R-values meet code requirements and the vapour barrier is properly installed and sealed." },
          { code: "3.2", name: "Cleanup and debris removal", durationDays: 0.5, costPctOfTotal: 2, dependsOn: ["2.5"], description: "Insulation scraps, packaging, and debris are removed from the attic, walls, and work areas." },
          { code: "3.3", name: "Provide insulation certificates for rebates", durationDays: 0.5, costPctOfTotal: 1, dependsOn: ["3.1"], description: "The contractor provides receipts, product specifications, and photos for Canada Greener Homes Grant or provincial rebate applications (up to $5,000 available)." },
        ],
      },
    ],
  },

  // ========================================
  // 12. DRAINS
  // ========================================
  {
    serviceSlug: "drains",
    summary: "Drain repair involves clearing blockages or replacing damaged underground pipes. A camera inspection identifies the problem (tree roots, collapsed pipe, grease buildup). Simple clogs are cleared with hydro-jetting; broken pipes require excavation and replacement. Backwater valves prevent sewer backup during heavy rain.",
    totalDurationDays: { min: 1, max: 5 },
    phases: [
      {
        code: "1.0",
        name: "Assessment",
        description: "A sewer camera is inserted through a cleanout to inspect the drain line from inside. The camera shows exactly where the blockage or damage is located and what's causing it.",
        tasks: [
          { code: "1.1", name: "Camera inspection of drain lines", durationDays: 0.5, costPctOfTotal: 8, description: "A waterproof camera on a flexible cable is pushed through the drain to visually inspect the inside of the pipe and locate blockages, cracks, or root intrusion." },
          { code: "1.2", name: "Diagnose blockage or damage", durationDays: 0.5, costPctOfTotal: 3, dependsOn: ["1.1"], description: "The plumber reviews the camera footage to determine the cause (tree roots, collapsed pipe, grease, foreign object) and recommends clearing or replacement." },
          { code: "1.3", name: "Obtain permit (if excavation required)", durationDays: 2, costPctOfTotal: 3, dependsOn: ["1.2"], description: "If excavation is needed to replace a pipe section, a plumbing permit is required—some municipalities also require a road-cut permit if digging in the boulevard." },
        ],
      },
      {
        code: "2.0",
        name: "Drain Clearing/Repair",
        description: "Blockages are cleared with high-pressure water jetting. Damaged pipes are excavated, cut out, and replaced with PVC or ABS. Backwater valves prevent sewage from flowing backward into your basement during heavy rain.",
        tasks: [
          { code: "2.1", name: "Hydro-jetting to clear blockages", durationDays: 0.5, costPctOfTotal: 15, dependsOn: ["1.3"], description: "A high-pressure water jet (3,000–4,000 PSI) is fed through the drain to blast away grease, roots, and debris, leaving the pipe clean." },
          { code: "2.2", name: "Excavate to expose damaged pipe (if needed)", durationDays: 1, costPctOfTotal: 20, dependsOn: ["1.3"], description: "If the pipe is cracked, collapsed, or offset, the area is excavated (yard, driveway, or basement floor) to expose the damaged section." },
          { code: "2.3", name: "Replace damaged section with PVC or ABS", durationDays: 1, costPctOfTotal: 25, dependsOn: ["2.2"], description: "The damaged pipe is cut out and replaced with Schedule 40 PVC or ABS drain pipe, glued at joints and sloped 1/4 inch per foot toward the main sewer." },
          { code: "2.4", name: "Install backwater valve (if required)", durationDays: 1, costPctOfTotal: 12, dependsOn: ["2.2"], description: "A backwater valve (with a flap that closes if sewage flows backward) is installed in the main drain line to prevent basement flooding during heavy rain—many municipalities offer rebates." },
        ],
      },
      {
        code: "3.0",
        name: "Close-Out",
        description: "A post-repair camera inspection verifies the pipe is clear and properly sloped. Excavations are backfilled, and landscaping or pavement is restored.",
        tasks: [
          { code: "3.1", name: "Post-repair camera inspection", durationDays: 0.5, costPctOfTotal: 5, dependsOn: ["2.4"], description: "The camera is run through the drain again to confirm the blockage is cleared and the new pipe is properly aligned with no gaps or offsets." },
          { code: "3.2", name: "Backfill and compact excavation", durationDays: 0.5, costPctOfTotal: 5, dependsOn: ["2.3"], description: "The excavation is backfilled with clean fill in 12-inch layers, each mechanically compacted to prevent settling." },
          { code: "3.3", name: "Restore landscaping or pavement", durationDays: 1, costPctOfTotal: 8, dependsOn: ["3.2"], description: "Grass, sod, interlocking pavers, or asphalt is restored to match the surrounding area." },
          { code: "3.4", name: "Plumbing inspection (if required)", durationDays: 0.5, costPctOfTotal: 2, dependsOn: ["3.1"], description: "If a permit was pulled, the municipal inspector verifies the new drain is properly sloped, connected, and vented." },
          { code: "3.5", name: "Cleanup and handover", durationDays: 0.5, costPctOfTotal: 2, dependsOn: ["3.4"], description: "Excavated soil, broken pipe, and debris are removed from the property, and the homeowner is advised on drain maintenance (no grease, regular cleaning)." },
        ],
      },
    ],
  },

  // ========================================
  // 13. PAINTING
  // ========================================
  {
    serviceSlug: "painting",
    summary: "Professional painting involves surface preparation (filling holes, sanding, cleaning), priming, and two finish coats. Preparation is 60% of the job—skipping it leads to peeling and visible imperfections. Quality paint lasts 7–10 years indoors. Proper ventilation is essential, especially for oil-based paints.",
    totalDurationDays: { min: 1, max: 7 },
    phases: [
      {
        code: "1.0",
        name: "Preparation",
        description: "Colours are selected, paint is ordered, and surfaces are meticulously prepared. Holes are filled, surfaces are sanded smooth, and trim is masked. Preparation quality determines the final result.",
        tasks: [
          { code: "1.1", name: "Color consultation and paint selection", durationDays: 1, costPctOfTotal: 3, description: "The painter helps select paint colours, sheen (flat, eggshell, satin, semi-gloss), and quality (premium paints have better coverage and durability)." },
          { code: "1.2", name: "Order paint and supplies", durationDays: 1, costPctOfTotal: 5, dependsOn: ["1.1"], description: "Paint, primer, rollers, brushes, tape, drop sheets, and patching compound are ordered—premium paint costs $50–$80/gallon but requires fewer coats." },
          { code: "1.3", name: "Move furniture and protect floors", durationDays: 0.5, costPctOfTotal: 4, dependsOn: ["1.2"], description: "Furniture is moved to the centre of the room and covered with plastic, and floors are protected with canvas drop sheets (better than plastic, which is slippery)." },
          { code: "1.4", name: "Fill holes, sand, and repair surfaces", durationDays: 1, costPctOfTotal: 10, dependsOn: ["1.3"], description: "Nail holes and cracks are filled with spackle or joint compound, sanded smooth when dry, and imperfections are spot-primed—this step makes or breaks the finish quality." },
          { code: "1.5", name: "Tape trim and mask edges", durationDays: 0.5, costPctOfTotal: 5, dependsOn: ["1.4"], description: "Painter's tape is applied along trim, ceiling edges, and fixtures to create clean, straight lines—good painters cut-in freehand, but tape ensures perfection." },
        ],
      },
      {
        code: "2.0",
        name: "Painting",
        description: "Primer seals the surface and improves adhesion. Two finish coats are applied, allowing proper drying time between coats. Ceilings are painted first, then walls, then trim.",
        tasks: [
          { code: "2.1", name: "Apply primer coat", durationDays: 1, costPctOfTotal: 12, dependsOn: ["1.5"], description: "Primer is rolled and brushed onto bare drywall, patched areas, and stained surfaces to seal and create a uniform base for the finish coat." },
          { code: "2.2", name: "First finish coat (walls and ceilings)", durationDays: 1.5, costPctOfTotal: 20, dependsOn: ["2.1"], description: "The first coat of finish paint is applied with rollers (walls) and brushes (edges and corners), covering the primer and establishing the colour." },
          { code: "2.3", name: "Second finish coat", durationDays: 1.5, costPctOfTotal: 20, dependsOn: ["2.2"], description: "The second coat eliminates streaks, evens out colour, and provides full coverage—always required for professional results, even with 'one-coat' paints." },
          { code: "2.4", name: "Paint trim and baseboards", durationDays: 1, costPctOfTotal: 12, dependsOn: ["2.3"], description: "Trim, baseboards, door frames, and window casings are painted with semi-gloss or gloss paint (easier to clean than flat or satin) using small brushes for precision." },
        ],
      },
      {
        code: "3.0",
        name: "Close-Out",
        description: "Tape is carefully removed while paint is still slightly tacky to prevent peeling. Touch-ups are done, the room is cleaned, and furniture is returned.",
        tasks: [
          { code: "3.1", name: "Remove tape and touch-ups", durationDays: 0.5, costPctOfTotal: 4, dependsOn: ["2.4"], description: "Painter's tape is removed at a 45-degree angle while paint is still slightly wet to avoid pulling off dried paint, and any imperfections are touched up." },
          { code: "3.2", name: "Cleanup and debris removal", durationDays: 0.5, costPctOfTotal: 3, dependsOn: ["3.1"], description: "Drop sheets, tape, and painting supplies are removed, floors are vacuumed, and furniture is returned to its original position." },
          { code: "3.3", name: "Final walkthrough and acceptance", durationDays: 0.25, costPctOfTotal: 2, dependsOn: ["3.2"], description: "The homeowner inspects the work in natural light to identify any missed spots or imperfections, and the painter addresses them immediately." },
        ],
      },
    ],
  },

  // ========================================
  // 14. CLEANING
  // ========================================
  {
    serviceSlug: "cleaning",
    summary: "Post-construction cleaning removes drywall dust, paint splatters, adhesive residue, and construction debris. It's done in stages: rough clean (debris removal), detail clean (scrubbing and polishing), and final touch-up. Professional cleaners use commercial vacuums with HEPA filters to capture fine dust that household vacuums recirculate.",
    totalDurationDays: { min: 1, max: 3 },
    phases: [
      {
        code: "1.0",
        name: "Planning",
        description: "The cleaning crew assesses the scope of work, identifies problem areas (paint overspray, adhesive residue), and assembles the necessary equipment and supplies.",
        tasks: [
          { code: "1.1", name: "Site assessment and scope definition", durationDays: 0.5, costPctOfTotal: 5, description: "The cleaning supervisor walks through the property to assess the level of construction dust, identify surfaces needing special attention, and estimate crew size and time needed." },
          { code: "1.2", name: "Mobilize cleaning crew and supplies", durationDays: 0.5, costPctOfTotal: 5, dependsOn: ["1.1"], description: "Commercial vacuums with HEPA filters, mops, buckets, scrapers, solvents, microfibre cloths, and extension poles are assembled and brought to the site." },
        ],
      },
      {
        code: "2.0",
        name: "Cleaning Execution",
        description: "Construction debris is removed first, followed by vacuuming all surfaces (including walls and ceilings where dust settles), washing windows, scrubbing fixtures, and detailing every surface.",
        tasks: [
          { code: "2.1", name: "Remove construction debris and dust", durationDays: 1, costPctOfTotal: 25, dependsOn: ["1.2"], description: "Drywall scraps, wood cut-offs, packaging, and large debris are bagged and removed, and surfaces are swept or dry-vacuumed to remove the bulk of the dust." },
          { code: "2.2", name: "Vacuum all surfaces (floors, walls, ceilings)", durationDays: 0.5, costPctOfTotal: 15, dependsOn: ["2.1"], description: "HEPA-filtered vacuums remove fine drywall dust from floors, walls, ceiling corners, light fixtures, and air vents—standard vacuums just blow the dust around." },
          { code: "2.3", name: "Wash windows and frames", durationDays: 0.5, costPctOfTotal: 12, dependsOn: ["2.2"], description: "Windows are scraped (paint overspray, stickers), washed inside and out with glass cleaner, and frames are wiped down to remove dust and fingerprints." },
          { code: "2.4", name: "Clean kitchen and bathrooms (fixtures, tiles)", durationDays: 0.5, costPctOfTotal: 15, dependsOn: ["2.2"], description: "Sinks, toilets, tubs, and tile are scrubbed with appropriate cleaners to remove grout haze, adhesive residue, and construction grime." },
          { code: "2.5", name: "Mop and polish floors", durationDays: 0.5, costPctOfTotal: 10, dependsOn: ["2.4"], description: "Hardwood, tile, and vinyl floors are mopped, polished, and buffed to remove footprints, dust, and residue—protective film is removed from new fixtures." },
          { code: "2.6", name: "Detail cleaning (baseboards, vents, switches)", durationDays: 0.5, costPctOfTotal: 8, dependsOn: ["2.5"], description: "Baseboards, door frames, light switches, outlet covers, air vents, and door handles are wiped down with microfibre cloths—these details make the difference." },
        ],
      },
      {
        code: "3.0",
        name: "Close-Out",
        description: "The homeowner inspects the cleaned space, and any missed spots are addressed immediately. The property is left move-in ready.",
        tasks: [
          { code: "3.1", name: "Final inspection with client", durationDays: 0.25, costPctOfTotal: 3, dependsOn: ["2.6"], description: "The homeowner walks through the property with the cleaning supervisor to identify any areas needing re-cleaning or additional attention." },
          { code: "3.2", name: "Touch-ups if needed", durationDays: 0.25, costPctOfTotal: 2, dependsOn: ["3.1"], description: "Any missed spots, streaks on windows, or residue on floors are immediately addressed before the crew leaves." },
        ],
      },
    ],
  },

  // ========================================
  // 15. HOME ADDITIONS
  // ========================================
  {
    serviceSlug: "additions",
    summary: "A home addition extends your living space by building a new structure attached to your existing house. This is essentially new construction \u2014 you\u2019re building a new foundation, framing walls and roof, running electrical/plumbing/HVAC, and finishing the interior. The most complex part is tying the new structure into the existing house (structurally, mechanically, and aesthetically). Zoning restrictions (lot coverage, setbacks, height) often determine what you can build.",
    totalDurationDays: { min: 90, max: 180 },
    phases: [
      {
        code: "1.0",
        name: "Pre-Construction",
        description: "Design and permits. This phase takes 2\u20133 months because zoning review, architectural design, structural engineering, and permit processing all happen sequentially. Starting construction without a permit is illegal and can result in a stop-work order, fines, or forced demolition.",
        tasks: [
          { code: "1.1", name: "Architectural design and drawings", durationDays: 14, costPctOfTotal: 5, description: "An architect designs the addition: floor plan, elevations, roof lines, window placement, and how it connects to the existing house. The design must comply with zoning (setbacks, lot coverage, height limits) and look proportional to the existing home. Expect 2\u20134 rounds of revisions." },
          { code: "1.2", name: "Structural engineering review", durationDays: 7, costPctOfTotal: 3, dependsOn: ["1.1"], description: "The structural engineer designs the foundation, beam sizes, joist spans, and the critical connection between the new addition and the existing house. They specify where the existing house wall gets opened up and how loads transfer. Their stamped drawings are required for the permit." },
          { code: "1.3", name: "Obtain building permit and zoning approval", durationDays: 30, costPctOfTotal: 2, dependsOn: ["1.2"], description: "The city reviews architectural and structural drawings, site plan, and zoning compliance. Most GTA municipalities take 4\u20138 weeks for additions. If your addition requires a minor variance (e.g., you\u2019re slightly over lot coverage), add 3\u20136 months for the Committee of Adjustment process." },
          { code: "1.4", name: "Material procurement and scheduling", durationDays: 10, costPctOfTotal: 2, dependsOn: ["1.3"], description: "Ordering lumber, trusses, windows, doors, roofing, and booking subcontractors (electrician, plumber, HVAC). Trusses have a 3\u20136 week lead time. Windows can take 4\u201310 weeks depending on size and style. Smart contractors order long-lead items early." },
        ],
      },
      {
        code: "2.0",
        name: "Site Preparation & Foundation",
        description: "The addition gets its own foundation. Excavation, footings, foundation walls, and waterproofing \u2014 just like building a new house. The foundation must be tied into the existing house foundation with rebar dowels and match the existing footing depth.",
        tasks: [
          { code: "2.1", name: "Site protection and temporary fencing", durationDays: 1, costPctOfTotal: 1, dependsOn: ["1.4"], description: "Construction fencing encloses the work area. Existing landscaping, trees, and structures near the addition footprint are removed or protected. A portable toilet and dumpster are delivered." },
          { code: "2.2", name: "Excavation for foundation", durationDays: 3, costPctOfTotal: 3, dependsOn: ["2.1"], description: "A backhoe or excavator digs the foundation footprint to the required depth (below the frost line \u2014 4 feet in southern Ontario). The excavation must match the engineering drawings exactly. Soil conditions (rock, water table) can cause delays." },
          { code: "2.3", name: "Install footings and foundation walls", durationDays: 5, costPctOfTotal: 8, dependsOn: ["2.2"], description: "Concrete footings (typically 24\u2033 wide \u00d7 10\u2033 deep) are poured first. After they cure, foundation walls are built using poured concrete or concrete blocks. Rebar dowels tie the new foundation to the existing one. A key joint or epoxy-bonded connection prevents differential settlement." },
          { code: "2.4", name: "Waterproofing and drainage", durationDays: 2, costPctOfTotal: 3, dependsOn: ["2.3"], description: "The new foundation walls get waterproofing membrane, dimpled drainage board, and weeping tile connected to the existing drainage system. This must be done before backfilling \u2014 there\u2019s no going back." },
          { code: "2.5", name: "Backfill and compact", durationDays: 2, costPctOfTotal: 2, dependsOn: ["2.4"], description: "Granular fill is placed against the new foundation in compacted layers. The junction between the old and new foundation is a common leak point \u2014 extra waterproofing attention here." },
          { code: "2.6", name: "Foundation inspection", durationDays: 1, costPctOfTotal: 1, dependsOn: ["2.5"], description: "The city inspector verifies footing dimensions, rebar placement, concrete quality, and the connection to the existing foundation. This inspection must pass before framing can start." },
        ],
      },
      {
        code: "3.0",
        name: "Framing & Structure",
        description: "The addition takes shape. Floor joists, wall studs, roof trusses, and sheathing go up quickly \u2014 this is the most dramatic visual transformation. The critical detail is the tie-in to the existing house: removing the existing exterior wall, installing a structural beam, and ensuring the roof lines match.",
        tasks: [
          { code: "3.1", name: "Floor framing and sheathing", durationDays: 4, costPctOfTotal: 5, dependsOn: ["2.6"], description: "Engineered floor joists (I-joists or TJIs) span the new foundation. 3/4\u2033 tongue-and-groove plywood subfloor is glued and screwed on top. If the addition has a basement or crawlspace, this creates the main floor. The height must match the existing house floor exactly." },
          { code: "3.2", name: "Wall framing (exterior and interior)", durationDays: 7, costPctOfTotal: 8, dependsOn: ["3.1"], description: "2\u00d76 exterior walls (for thicker insulation) and 2\u00d74 interior partition walls are framed and stood up. Window and door rough openings are framed with headers. The existing house wall is partially removed and a steel or LVL beam is installed to carry the load \u2014 this is the most structurally sensitive moment." },
          { code: "3.3", name: "Roof framing and trusses", durationDays: 5, costPctOfTotal: 7, dependsOn: ["3.2"], description: "Pre-engineered roof trusses are craned into place and secured to the top plates. The roof design must match or complement the existing house \u2014 matching pitch, fascia height, and overhang. A hip or gable connection to the existing roof is flashed and tied in." },
          { code: "3.4", name: "Sheathing and structural tie-in to existing", durationDays: 3, costPctOfTotal: 4, dependsOn: ["3.3"], description: "OSB or plywood sheathing goes on the walls and roof. House wrap (Tyvek or similar) is applied over wall sheathing. The junction between old and new is sealed with flexible flashing tape. This is where leaks happen 5 years later if not done right." },
          { code: "3.5", name: "Framing inspection", durationDays: 1, costPctOfTotal: 1, dependsOn: ["3.4"], description: "The building inspector checks framing dimensions, joist spans, beam sizes, nailing patterns, sheathing, and the structural tie-in to the existing house. Must pass before enclosure." },
        ],
      },
      {
        code: "4.0",
        name: "Exterior & Rough-In",
        description: "The addition gets weathertight (windows, roof, siding) and all the hidden systems are installed inside the walls: electrical wiring, plumbing pipes, HVAC ducts, and insulation. Multiple trades work simultaneously during this phase.",
        tasks: [
          { code: "4.1", name: "Install windows and exterior doors", durationDays: 3, costPctOfTotal: 6, dependsOn: ["3.5"], description: "Windows and doors are installed, shimmed, and sealed with spray foam and flashing tape. Proper flashing (sill pan, head flashing, and side jamb flashing) is critical \u2014 window leaks are the #1 cause of wall rot in additions." },
          { code: "4.2", name: "Roofing (shingles or membrane)", durationDays: 3, costPctOfTotal: 5, dependsOn: ["3.5"], description: "Ice and water shield is applied on the first 3 feet from the eaves (Ontario code requirement), then underlayment, and finally shingles. The junction with the existing roof gets step flashing. Matching the existing shingle color can be tricky if the roof is more than 5 years old." },
          { code: "4.3", name: "Siding and exterior finishes", durationDays: 5, costPctOfTotal: 6, dependsOn: ["4.1"], description: "Exterior cladding (vinyl, fiber cement, or brick veneer) is installed to match the existing house. Trim, soffits, fascia, and eavestroughs are added. The junction between old and new siding is the detail that makes or breaks curb appeal." },
          { code: "4.4", name: "Electrical rough-in", durationDays: 4, costPctOfTotal: 5, dependsOn: ["3.5"], description: "The electrician runs all wiring: circuits for outlets, lighting, smoke detectors, and any dedicated circuits (kitchen, bathroom). The existing panel may need to be upgraded if there aren\u2019t enough open breaker spaces. ESA permit required." },
          { code: "4.5", name: "Plumbing rough-in", durationDays: 3, costPctOfTotal: 4, dependsOn: ["3.5"], description: "If the addition includes a bathroom or kitchen, drain, vent, and supply lines are run through the walls and floor. The new plumbing connects to the existing house\u2019s main stack and water supply. A backwater valve may be required." },
          { code: "4.6", name: "HVAC ductwork and equipment", durationDays: 4, costPctOfTotal: 5, dependsOn: ["3.5"], description: "Heating and cooling is extended into the addition. Options: extend existing ductwork (if the furnace has capacity), add a mini-split heat pump, or install in-floor radiant. Ductwork runs through the floor or ceiling joists. Your existing furnace may need to be upsized." },
          { code: "4.7", name: "Insulation installation", durationDays: 3, costPctOfTotal: 3, dependsOn: ["4.4", "4.5", "4.6"], description: "Exterior walls get R-24 batt or spray foam insulation (Ontario Building Code minimum). Ceiling gets R-50 or higher blown-in insulation. Spray foam is more expensive but provides both insulation and air sealing. All penetrations are sealed for air tightness." },
          { code: "4.8", name: "Rough-in inspection", durationDays: 1, costPctOfTotal: 1, dependsOn: ["4.7"], description: "The city inspector checks electrical, plumbing, HVAC, and insulation before drywall covers everything. This is a critical checkpoint \u2014 any issues found now are easy to fix; after drywall, they\u2019re expensive." },
        ],
      },
      {
        code: "5.0",
        name: "Finishing",
        description: "The interior takes shape. Drywall, flooring, cabinets, trim, paint, and fixtures transform the framed space into finished rooms. This is where homeowner choices (materials, finishes) have the biggest impact on budget.",
        tasks: [
          { code: "5.1", name: "Drywall installation and taping", durationDays: 7, costPctOfTotal: 5, dependsOn: ["4.8"], description: "1/2\u2033 drywall is hung on walls and ceilings, taped, mudded with three coats of joint compound, and sanded smooth. Level 4 finish is standard for painted surfaces; Level 5 (skim coat) for areas with harsh lighting. Expect 3\u20135 days of drying time between mud coats." },
          { code: "5.2", name: "Interior trim and millwork", durationDays: 5, costPctOfTotal: 4, dependsOn: ["5.1"], description: "Baseboards, door casings, window trim, crown moulding (if applicable), and closet shelving are installed. Matching the existing house\u2019s trim profile ensures the addition doesn\u2019t feel tacked on. Stain-grade vs. paint-grade trim is a big cost difference." },
          { code: "5.3", name: "Flooring installation", durationDays: 4, costPctOfTotal: 4, dependsOn: ["5.1"], description: "Hardwood, engineered wood, LVP, tile, or carpet is installed. The transition between the addition floor and existing house floor needs to be seamless \u2014 matching hardwood species and stain is difficult if the existing floor has aged." },
          { code: "5.4", name: "Kitchen and bathroom cabinets", durationDays: 3, costPctOfTotal: 5, dependsOn: ["5.1"], description: "Cabinets are installed, leveled, and secured. Countertops are templated and fabricated (quartz/granite takes 1\u20132 weeks after templating). Backsplash tile is installed after countertops." },
          { code: "5.5", name: "Painting (primer and 2 coats)", durationDays: 6, costPctOfTotal: 3, dependsOn: ["5.2"], description: "All walls, ceilings, and trim are primed and painted with two coats. Ceilings get flat finish, walls get eggshell or matte, trim and doors get semi-gloss. The junction where the addition meets the existing house often needs blending on both sides." },
          { code: "5.6", name: "Electrical finishing (devices, fixtures)", durationDays: 3, costPctOfTotal: 3, dependsOn: ["5.5"], description: "Outlets, switches, cover plates, and light fixtures are installed. Undercabinet lighting, pot lights, and any smart home devices are connected. The ESA inspection verifies all electrical work." },
          { code: "5.7", name: "Plumbing fixtures installation", durationDays: 2, costPctOfTotal: 3, dependsOn: ["5.5"], description: "Faucets, toilets, shower/tub fixtures, and appliance hookups (dishwasher, fridge water line) are connected and tested for leaks." },
          { code: "5.8", name: "HVAC system commissioning", durationDays: 1, costPctOfTotal: 1, dependsOn: ["5.5"], description: "The HVAC technician balances airflow to the new rooms, adjusts dampers, and verifies heating/cooling reaches every space. A poorly balanced system means the addition is always too hot or too cold." },
        ],
      },
      {
        code: "6.0",
        name: "Close-Out",
        description: "Final inspections, punch list, cleanup, and handover. The city inspector checks everything one last time, and your contractor walks through the addition with you to identify any deficiencies before final payment.",
        tasks: [
          { code: "6.1", name: "Final building inspection", durationDays: 1, costPctOfTotal: 1, dependsOn: ["5.8"], description: "The city building inspector does a comprehensive final inspection covering structural, electrical, plumbing, HVAC, fire safety, and energy code compliance. All deficiencies must be corrected before the permit is closed." },
          { code: "6.2", name: "Punch list completion", durationDays: 3, costPctOfTotal: 2, dependsOn: ["6.1"], description: "You and your contractor walk through the addition together, noting any issues: paint touch-ups, trim gaps, sticky doors, scuffed floors, missing caulk. These are compiled into a \u2018punch list\u2019 and the contractor completes all items. Hold 10% of the contract value until the punch list is done." },
          { code: "6.3", name: "Final cleanup and site restoration", durationDays: 2, costPctOfTotal: 1, dependsOn: ["6.2"], description: "Professional post-construction cleaning inside the addition. Outside: remove construction fencing, restore landscaping, repair driveway damage, and grade the yard for proper drainage." },
          { code: "6.4", name: "Client walkthrough and handover", durationDays: 1, costPctOfTotal: 1, dependsOn: ["6.3"], description: "Final walkthrough confirming all punch list items are complete. The contractor hands over: warranty documents, equipment manuals, paint color records, maintenance schedules, and the closed building permit." },
        ],
      },
    ],
  },

  // ========================================
  // 16. BASEMENT SECOND UNIT
  // ========================================
  {
    serviceSlug: "basement-second-unit",
    summary: "Converting a basement into a legal second unit involves lowering the floor (underpinning), adding a separate entrance, installing egress windows in every bedroom, running independent plumbing/electrical/HVAC, and passing fire separation inspections. Ontario Building Code requires a minimum 6\u20197\u2033 ceiling height, 1-hour fire-rated separation between units, and interconnected smoke/CO alarms. Most Toronto homes built before 2000 need underpinning to meet ceiling height.",
    totalDurationDays: { min: 120, max: 240 },
    phases: [
      {
        code: "1.0",
        name: "Pre-Construction",
        description: "Before any work begins, you need professional drawings, engineering review, and a building permit. The city checks zoning compliance (is a second unit allowed on your lot?), parking requirements, and fire safety. This phase takes 6\u201310 weeks because permit review in the GTA averages 4\u20138 weeks alone.",
        tasks: [
          { code: "1.1", name: "Architectural drawings (separate entrance, egress windows)", durationDays: 14, costPctOfTotal: 3, description: "A licensed architect or designer creates floor plans showing the new unit layout, separate entrance location, egress window placement in each bedroom, kitchen and bathroom positions, and fire separation details. These drawings are required for your building permit application." },
          { code: "1.2", name: "Structural engineering assessment", durationDays: 7, costPctOfTotal: 2, dependsOn: ["1.1"], description: "A structural engineer evaluates your existing foundation to determine if underpinning is needed. They\u2019ll check current footing depth, soil conditions, and load-bearing walls. Their stamped drawings are required for the permit." },
          { code: "1.3", name: "Building permit and zoning compliance", durationDays: 30, costPctOfTotal: 2, dependsOn: ["1.2"], description: "Your contractor submits plans to the city for review. The municipality checks zoning (setbacks, lot coverage, parking), OBC compliance (ceiling height, egress, fire separation), and plumbing/electrical capacity. Toronto averages 4\u20138 weeks; some GTA cities are faster." },
          { code: "1.4", name: "Asbestos testing (if pre-1990 home)", durationDays: 5, costPctOfTotal: 1, dependsOn: ["1.2"], description: "Homes built before 1990 may have asbestos in floor tiles, pipe insulation, or vermiculite attic insulation. Ontario law requires testing before demolition. If found, licensed abatement adds $3,000\u2013$8,000 and 1\u20132 weeks." },
          { code: "1.5", name: "Material procurement", durationDays: 7, costPctOfTotal: 2, dependsOn: ["1.3"], description: "Ordering lumber, concrete, plumbing fixtures, electrical panels, kitchen cabinets, and flooring. Lead times vary \u2014 cabinets often take 3\u20136 weeks, so smart contractors order early." },
        ],
      },
      {
        code: "2.0",
        name: "Site Preparation & Demolition",
        description: "Everything existing comes out \u2014 old drywall, flooring, ceiling tiles. If you\u2019re adding a walkout or side entrance, excavation begins outside the house. Window wells are cut into the foundation wall for legally required egress windows.",
        tasks: [
          { code: "2.1", name: "Demolition of existing finishes", durationDays: 3, costPctOfTotal: 3, dependsOn: ["1.5"], description: "Strip all existing basement finishes: drywall, flooring, ceiling tiles, old insulation. This exposes the foundation walls and floor slab so the crew can assess actual conditions (cracks, moisture, old wiring)." },
          { code: "2.2", name: "Install temporary support (if load-bearing changes)", durationDays: 2, costPctOfTotal: 2, dependsOn: ["2.1"], description: "Steel beams or temporary posts are installed to carry the weight of the house above while foundation work happens below. This is engineered \u2014 never skip this step." },
          { code: "2.3", name: "Excavate for separate entrance", durationDays: 3, costPctOfTotal: 3, dependsOn: ["1.5"], description: "A legal second unit needs its own entrance. This usually means excavating a stairwell outside the house, pouring concrete retaining walls and steps, installing a landing, and adding a steel exterior door. Walkout basements are simpler; side entrances need more excavation." },
          { code: "2.4", name: "Cut openings for egress windows", durationDays: 2, costPctOfTotal: 3, dependsOn: ["2.3"], description: "Ontario Building Code requires every bedroom to have an egress window (minimum 380mm wide \u00d7 760mm tall clear opening). The crew cuts through the foundation wall with a concrete saw and installs steel lintels above each opening. Window wells are added outside with proper drainage." },
        ],
      },
      {
        code: "3.0",
        name: "Structural & Underpinning",
        description: "Most older GTA homes have 6\u2019 basement ceilings. OBC requires 6\u20197\u2033 minimum for a legal unit. Underpinning lowers the floor by excavating beneath the existing foundation in alternating sections, pouring new deeper footings, and adding a new concrete floor slab. This is the most expensive and time-consuming phase.",
        tasks: [
          { code: "3.1", name: "Underpinning (if ceiling height < 6\u20197\u2033)", durationDays: 30, costPctOfTotal: 15, dependsOn: ["2.2"], description: "The crew excavates in alternating 4-foot sections (called \u2018bays\u2019) beneath the existing foundation. Each bay is dug out, new footings are poured with rebar, and concrete cures for 7 days before the next bay starts. A typical semi takes 20\u201330 sections. This is why underpinning takes so long \u2014 you can\u2019t rush concrete curing." },
          { code: "3.2", name: "New floor slab with vapor barrier", durationDays: 3, costPctOfTotal: 5, dependsOn: ["3.1"], description: "Once all bays are complete, a 6-mil polyethylene vapor barrier is laid over gravel, followed by 4\u2033 of concrete. This creates a smooth, dry, level floor for the new unit. Radiant in-floor heating pipes can be added at this stage." },
          { code: "3.3", name: "Structural inspection", durationDays: 1, costPctOfTotal: 1, dependsOn: ["3.2"], description: "The city building inspector and your structural engineer verify the underpinning matches the approved drawings. This inspection must pass before any framing begins." },
        ],
      },
      {
        code: "4.0",
        name: "Framing & Fire Separation",
        description: "New walls divide the basement into rooms (bedroom, kitchen, bathroom, living area). The ceiling between the basement unit and the main floor above gets 1-hour fire-rated assembly \u2014 this is a critical Ontario Building Code requirement. The separate entrance stairwell is framed with fire-rated walls.",
        tasks: [
          { code: "4.1", name: "Frame partition walls (separate suite)", durationDays: 5, costPctOfTotal: 4, dependsOn: ["3.3"], description: "2\u00d74 wood stud walls divide the basement into rooms: bedroom(s), bathroom, kitchen, living area, laundry, and mechanical room. A mechanical room is required for the furnace/water heater \u2014 it must be separated from living spaces." },
          { code: "4.2", name: "Install fire-rated drywall (Type X, 1-hour separation)", durationDays: 4, costPctOfTotal: 4, dependsOn: ["4.1"], description: "The ceiling between your basement unit and the main floor above gets 5/8\u2033 Type X fire-rated drywall on both sides of the floor joists, creating a 1-hour fire separation. All penetrations (pipes, ducts, wires) are sealed with fire caulk. This protects occupants and is non-negotiable for permits." },
          { code: "4.3", name: "Frame separate entrance stairwell", durationDays: 3, costPctOfTotal: 3, dependsOn: ["2.4"], description: "The interior side of the separate entrance gets framed with fire-rated walls. If it\u2019s an exterior walkout, the opening is sealed and a pre-hung steel door is installed. Handrails and guard rails are added per code." },
          { code: "4.4", name: "Install egress windows and wells", durationDays: 2, costPctOfTotal: 4, dependsOn: ["2.4"], description: "Egress-rated windows are installed in the foundation openings. Each window must open fully without tools or special knowledge (casement or slider, not awning). Window wells outside get gravel drainage and a clear cover. At least one per bedroom is required." },
        ],
      },
      {
        code: "5.0",
        name: "Mechanical Rough-In",
        description: "This phase runs all the \u2018hidden\u2019 systems through the walls and ceiling before drywall closes everything up: electrical wiring, plumbing drain/supply lines, HVAC ductwork, and fire alarm wiring. A second unit typically needs its own electrical panel, a new bathroom drain stack, and a separate HVAC zone.",
        tasks: [
          { code: "5.1", name: "Separate electrical panel (200A service upgrade)", durationDays: 2, costPctOfTotal: 5, dependsOn: ["4.2"], description: "Most second units need their own 100A sub-panel (or a full 200A service upgrade if the house has an old 100A panel). The utility company may need to upgrade the service entrance \u2014 this can add 2\u20134 weeks if they\u2019re backed up. ESA permit is required." },
          { code: "5.2", name: "Electrical rough-in (kitchen, bathroom, living areas)", durationDays: 5, costPctOfTotal: 5, dependsOn: ["5.1"], description: "Running 14/2 and 12/2 wire for all circuits: kitchen countertop outlets (must be GFCI), dedicated fridge and dishwasher circuits, bathroom GFCI outlet, bedroom and living room outlets, and lighting. Ontario code requires arc-fault breakers on bedroom circuits." },
          { code: "5.3", name: "Plumbing rough-in (kitchen, bathroom, laundry)", durationDays: 5, costPctOfTotal: 6, dependsOn: ["4.2"], description: "New drain lines connect to the existing main stack or a new stack. A basement bathroom needs a sewage ejector pump if it\u2019s below the sewer line (common in older homes). Copper or PEX supply lines feed the kitchen sink, dishwasher, bathroom fixtures, and laundry. A backwater valve is often required." },
          { code: "5.4", name: "HVAC ductwork and separate zone", durationDays: 4, costPctOfTotal: 5, dependsOn: ["4.2"], description: "The basement unit needs its own heating and cooling. Options: extend existing forced-air with a zone damper, install a separate mini-split heat pump ($4K\u2013$8K), or add electric baseboards (cheapest but highest operating cost). Ductwork is run through bulkheads along the ceiling." },
          { code: "5.5", name: "Install interconnected smoke and CO alarms", durationDays: 1, costPctOfTotal: 2, dependsOn: ["5.2"], description: "Ontario Building Code requires interconnected (hardwired with battery backup) smoke alarms on every level and in every bedroom, plus CO alarms near sleeping areas. In a second unit, alarms in both the main house and the unit must be interconnected so all occupants are warned." },
          { code: "5.6", name: "Insulation (walls, ceiling, rim joists)", durationDays: 3, costPctOfTotal: 3, dependsOn: ["5.2", "5.3", "5.4"], description: "Foundation walls get 2\u2033 rigid foam or spray foam (R-12 minimum per OBC). Interior walls between units get batt insulation for sound control. Rim joists are sealed and insulated. This step dramatically affects comfort \u2014 a well-insulated basement unit feels like a regular apartment." },
          { code: "5.7", name: "Rough-in inspection", durationDays: 1, costPctOfTotal: 1, dependsOn: ["5.6"], description: "The city inspector checks all rough-in work before it\u2019s covered by drywall: electrical wiring, plumbing drains and vents, HVAC ductwork, fire stopping, and insulation. If anything fails, it must be corrected before drywall can proceed." },
        ],
      },
      {
        code: "6.0",
        name: "Finishing",
        description: "Now the unit starts looking like a home. Drywall goes up, floors are installed, the kitchen and bathroom are built out, and everything gets painted. This is the most visible transformation \u2014 and where homeowners get excited.",
        tasks: [
          { code: "6.1", name: "Drywall installation and finishing", durationDays: 7, costPctOfTotal: 5, dependsOn: ["5.7"], description: "Drywall is hung, taped, mudded, and sanded (3 coats of joint compound with drying time between each). The 1-hour fire-rated ceiling assembly uses 5/8\u2033 Type X boards. Expect dust \u2014 the crew will seal off the area but drywall dust gets everywhere." },
          { code: "6.2", name: "Flooring (LVP, tile, carpet)", durationDays: 5, costPctOfTotal: 4, dependsOn: ["6.1"], description: "Luxury vinyl plank (LVP) is the most popular basement flooring \u2014 waterproof, durable, and installs over concrete. Bathrooms and kitchens get ceramic tile. Some homeowners add carpet in bedrooms. All flooring goes on a moisture barrier." },
          { code: "6.3", name: "Kitchen installation (cabinets, countertops)", durationDays: 4, costPctOfTotal: 6, dependsOn: ["6.1"], description: "IKEA-style flat-pack cabinets are common in second units ($3K\u2013$6K). Countertops are typically laminate or quartz. A legal kitchen needs a sink, fridge space, stove connection (gas or electric), and range hood venting to the outside. Countertop outlets must be GFCI." },
          { code: "6.4", name: "Bathroom finishes (tiles, vanity, fixtures)", durationDays: 5, costPctOfTotal: 5, dependsOn: ["6.1"], description: "Shower/tub surround tiles are installed with waterproof membrane underneath. Vanity, toilet, and mirror are mounted. Shower fixtures and faucets are connected. A bathroom fan (vented to exterior, not attic) is required by code." },
          { code: "6.5", name: "Interior doors and trim", durationDays: 4, costPctOfTotal: 3, dependsOn: ["6.1"], description: "Pre-hung interior doors for bedrooms, bathroom, and closets. Baseboards and door casings are installed and caulked. The entrance to the unit gets a solid-core fire-rated door (20-minute rating minimum)." },
          { code: "6.6", name: "Painting (primer and 2 coats)", durationDays: 5, costPctOfTotal: 3, dependsOn: ["6.5"], description: "All walls and ceilings get primer plus two coats of interior latex paint. Light neutral colors are standard for rentals (they photograph well and feel spacious). Bathrooms and kitchens use semi-gloss for moisture resistance." },
          { code: "6.7", name: "Electrical finishing (devices, fixtures, panel labeling)", durationDays: 3, costPctOfTotal: 3, dependsOn: ["6.6"], description: "Outlets, switches, and cover plates are installed. Light fixtures are mounted and wired. The electrical panel is labeled with all circuits. ESA inspection is booked for final approval." },
          { code: "6.8", name: "Plumbing fixture installation", durationDays: 2, costPctOfTotal: 3, dependsOn: ["6.6"], description: "Kitchen faucet, bathroom faucets, toilet, showerhead, and dishwasher hookup are connected and tested. Water heater is verified (shared or separate). All drains are tested for leaks." },
        ],
      },
      {
        code: "7.0",
        name: "Close-Out",
        description: "The final stretch: city inspections, fire department sign-off, and the occupancy permit that makes your unit legal. Without the occupancy permit, you cannot legally rent the unit and your insurance may not cover it.",
        tasks: [
          { code: "7.1", name: "Building inspection (fire separation, egress)", durationDays: 1, costPctOfTotal: 1, dependsOn: ["6.8"], description: "The building inspector checks: fire separation rating, egress windows (can they open fully?), ceiling height, stairway dimensions, handrails, and all structural elements match the approved drawings." },
          { code: "7.2", name: "Fire inspection (alarms, exits, separation)", durationDays: 1, costPctOfTotal: 1, dependsOn: ["6.8"], description: "The fire inspector verifies all smoke and CO alarms are interconnected and working, fire-rated doors are self-closing, fire separation is intact with no gaps, and exit signage is in place. This is separate from the building inspection." },
          { code: "7.3", name: "Occupancy permit", durationDays: 2, costPctOfTotal: 1, dependsOn: ["7.1", "7.2"], description: "Once both inspections pass, the city issues an occupancy permit. This document proves your unit is legal. You need it for insurance, mortgage compliance, and if your city requires landlord registration. Without it, you\u2019re renting an illegal unit." },
          { code: "7.4", name: "Utility hookup (separate meters if required)", durationDays: 2, costPctOfTotal: 2, dependsOn: ["7.3"], description: "Some municipalities or landlords want separate hydro meters for each unit. This requires a meter base installation and utility company activation (2\u20134 week lead time). Otherwise, utilities are shared and included in rent or split by agreement." },
          { code: "7.5", name: "Final cleanup and handover", durationDays: 2, costPctOfTotal: 1, dependsOn: ["7.4"], description: "Professional post-construction cleaning: dust removal, window cleaning, appliance wipe-down, floor polish. The contractor does a final walkthrough with you, hands over warranty documents, and the unit is ready for occupancy or listing." },
        ],
      },
    ],
  },

  // ========================================
  // 17. ROOFING
  // ========================================
  {
    serviceSlug: "roofing",
    summary: "Roof replacement involves tearing off old shingles, inspecting and repairing the plywood deck, installing underlayment and drip edge, laying new architectural shingles, and flashing all penetrations. Most residential roofs in Ontario use asphalt shingles with a 25–50 year warranty. The job typically takes 2–3 days for a standard home.",
    totalDurationDays: { min: 2, max: 5 },
    phases: [
      {
        code: "1.0",
        name: "Planning",
        description: "The roofer measures the roof, inspects for structural issues, and orders materials. Shingle colour and style are selected. A permit may be required in some municipalities.",
        tasks: [
          { code: "1.1", name: "Roof inspection and measurement", durationDays: 0.5, costPctOfTotal: 3, description: "The roofer measures the roof area (in squares—1 square = 100 sq ft), inspects for sagging, damaged decking, and determines how many layers of old shingles exist." },
          { code: "1.2", name: "Order shingles and materials", durationDays: 2, costPctOfTotal: 5, dependsOn: ["1.1"], description: "Architectural shingles (25–50 year warranty), synthetic underlayment, drip edge, ice-and-water shield, ridge cap shingles, roof cement, and nails are ordered." },
          { code: "1.3", name: "Obtain permit (if required)", durationDays: 3, costPctOfTotal: 2, dependsOn: ["1.1"], description: "Some municipalities require a roofing permit for full tear-offs—processing typically takes 1–3 days." },
        ],
      },
      {
        code: "2.0",
        name: "Tear-Off & Preparation",
        description: "Old shingles are stripped off, the roof deck is inspected and repaired, and protective underlayment and drip edge are installed. This is messy work—expect debris and noise.",
        tasks: [
          { code: "2.1", name: "Protect landscaping and property", durationDays: 0.5, costPctOfTotal: 2, dependsOn: ["1.3"], description: "Tarps are laid around the house perimeter to catch falling shingles and nails, and gardens or AC units near the house are covered or protected." },
          { code: "2.2", name: "Remove old shingles and underlayment", durationDays: 1, costPctOfTotal: 12, dependsOn: ["2.1"], description: "Shingles are torn off with roofing shovels, and old nails are pulled—most homes have 2–3 tons of old roofing that goes into a dumpster." },
          { code: "2.3", name: "Inspect and repair roof deck", durationDays: 0.5, costPctOfTotal: 8, dependsOn: ["2.2"], description: "The exposed plywood or OSB deck is inspected for rot, water damage, or sagging—damaged sheets are replaced before new roofing goes on." },
          { code: "2.4", name: "Install drip edge and eaves protection", durationDays: 0.5, costPctOfTotal: 5, dependsOn: ["2.3"], description: "Metal drip edge is nailed along eaves and rakes, and ice-and-water shield (rubberized membrane) is applied along eaves, valleys, and around chimneys to prevent ice dam leaks." },
        ],
      },
      {
        code: "3.0",
        name: "Roofing Installation",
        description: "Synthetic underlayment provides a waterproof backup layer, and architectural shingles are nailed in overlapping courses from eaves to ridge. Flashing seals all penetrations to prevent leaks.",
        tasks: [
          { code: "3.1", name: "Install synthetic underlayment", durationDays: 0.5, costPctOfTotal: 6, dependsOn: ["2.4"], description: "Synthetic underlayment (better than old tar paper) is rolled out horizontally across the roof and nailed down, creating a secondary water barrier." },
          { code: "3.2", name: "Install asphalt shingles (architectural grade)", durationDays: 2, costPctOfTotal: 30, dependsOn: ["3.1"], description: "Shingles are nailed starting at the eaves and working upward in overlapping rows, with tabs staggered for wind resistance and aesthetics—proper nailing (4–6 nails per shingle) is critical." },
          { code: "3.3", name: "Install ridge cap and hip shingles", durationDays: 0.5, costPctOfTotal: 8, dependsOn: ["3.2"], description: "Ridge cap shingles (pre-cut or field-cut from full shingles) are installed along roof peaks and hips, overlapping to shed water and sealed with roof cement." },
          { code: "3.4", name: "Flash chimneys, vents, and skylights", durationDays: 0.5, costPctOfTotal: 7, dependsOn: ["3.2"], description: "Step flashing is woven into shingles around chimneys, plumbing vents get rubber boots, and skylights are flashed with metal and sealed with roof cement—this is where leaks happen if done wrong." },
          { code: "3.5", name: "Install roof vents for attic ventilation", durationDays: 0.5, costPctOfTotal: 4, dependsOn: ["3.2"], description: "Ridge vents, box vents, or turbine vents are installed to exhaust hot air from the attic, preventing ice dams in winter and extending shingle life." },
        ],
      },
      {
        code: "4.0",
        name: "Close-Out",
        description: "The property is cleaned, a magnetic sweep picks up nails, and the roofer provides warranty documentation. An inspection may be required if a permit was pulled.",
        tasks: [
          { code: "4.1", name: "Cleanup and debris removal (magnetic sweep)", durationDays: 0.5, costPctOfTotal: 4, dependsOn: ["3.5"], description: "The dumpster is hauled away, tarps are removed, and a rolling magnet picks up stray nails from the yard, driveway, and roof perimeter." },
          { code: "4.2", name: "Final inspection (if required)", durationDays: 0.5, costPctOfTotal: 2, dependsOn: ["3.5"], description: "If a permit was issued, the municipal inspector verifies the roof was installed per code and manufacturer specifications." },
          { code: "4.3", name: "Warranty documentation and handover", durationDays: 0.25, costPctOfTotal: 2, dependsOn: ["4.2"], description: "The roofer provides shingle warranty cards (25–50 year material warranty) and workmanship warranty (typically 5–10 years)—keep these for insurance and resale." },
        ],
      },
    ],
  },

  // ========================================
  // 18. DEMOLITION
  // ========================================
  {
    serviceSlug: "demolition",
    summary: "Demolition involves tearing down walls, removing fixtures, and clearing debris for renovation. Selective demolition removes specific elements (kitchen, bathroom) while preserving the rest. Full demolition takes a structure down to the studs or foundation. Homes built before 1990 must be tested for asbestos and lead paint before demo begins.",
    totalDurationDays: { min: 1, max: 10 },
    phases: [
      {
        code: "1.0",
        name: "Planning & Permits",
        description: "The scope of demolition is defined, hazardous materials are tested, permits are obtained, and dumpsters are arranged. Asbestos abatement by a licensed contractor is required if testing confirms presence.",
        tasks: [
          { code: "1.1", name: "Site assessment and demolition plan", durationDays: 1, costPctOfTotal: 3, description: "The contractor walks through to identify what gets demolished, what stays, where utilities need disconnection, and potential hazards." },
          { code: "1.2", name: "Asbestos and hazmat testing", durationDays: 3, costPctOfTotal: 5, dependsOn: ["1.1"], description: "Homes built before 1990 are tested for asbestos (insulation, drywall joint compound, vinyl flooring) and lead paint—if present, licensed abatement is required before demo." },
          { code: "1.3", name: "Obtain demolition permit", durationDays: 5, costPctOfTotal: 3, dependsOn: ["1.2"], description: "Most municipalities require a permit for structural demolition or full building tear-downs—interior selective demo usually doesn't need a permit." },
          { code: "1.4", name: "Arrange bin/dumpster rental", durationDays: 1, costPctOfTotal: 5, dependsOn: ["1.1"], description: "A 20–40 cubic yard dumpster is rented and placed on the driveway or street (road occupancy permit may be required)." },
        ],
      },
      {
        code: "2.0",
        name: "Site Preparation",
        description: "Utilities are disconnected by licensed trades, the site is secured with fencing, and neighbours are notified. Dust control measures are critical for occupied homes.",
        tasks: [
          { code: "2.1", name: "Disconnect utilities (electrical, gas, water)", durationDays: 1, costPctOfTotal: 5, dependsOn: ["1.3"], description: "A licensed electrician disconnects power, a gas fitter caps gas lines, and plumbing is shut off and drained—utilities must be dead before demo starts." },
          { code: "2.2", name: "Install temporary fencing and signage", durationDays: 0.5, costPctOfTotal: 3, dependsOn: ["1.3"], description: "Orange safety fencing encloses the work area, and hazard signs are posted—required by occupational health and safety regulations." },
          { code: "2.3", name: "Dust control and neighbor notification", durationDays: 0.5, costPctOfTotal: 2, dependsOn: ["2.2"], description: "Plastic sheeting seals off the work area from occupied spaces, negative air machines pull dust out through windows, and neighbours are notified of the schedule." },
        ],
      },
      {
        code: "3.0",
        name: "Demolition Execution",
        description: "Non-structural elements (drywall, fixtures, cabinets) are removed first, followed by structural demolition of walls, floors, and roofs. Materials are sorted for recycling where possible.",
        tasks: [
          { code: "3.1", name: "Interior selective demolition (non-structural)", durationDays: 2, costPctOfTotal: 15, dependsOn: ["2.3"], description: "Drywall, trim, flooring, insulation, and non-load-bearing walls are torn out with hammers, pry bars, and reciprocating saws." },
          { code: "3.2", name: "Remove fixtures, cabinets, and appliances", durationDays: 1, costPctOfTotal: 8, dependsOn: ["2.3"], description: "Kitchen cabinets, countertops, bathroom fixtures, light fixtures, and appliances are unbolted and removed—reusable items can be donated for tax receipts." },
          { code: "3.3", name: "Structural demolition (walls, floors, roof)", durationDays: 3, costPctOfTotal: 25, dependsOn: ["3.1"], description: "Load-bearing walls, floor joists, and roof structure are cut with reciprocating saws or removed with excavators (for full tear-downs)—temporary shoring supports the structure during demo." },
          { code: "3.4", name: "Sort materials for recycling (metal, wood, concrete)", durationDays: 1, costPctOfTotal: 5, dependsOn: ["3.3"], description: "Metal (copper, steel, aluminum) is separated for scrap recycling, clean lumber is set aside for reuse, and concrete/brick is crushed for aggregate—reduces landfill fees." },
        ],
      },
      {
        code: "4.0",
        name: "Close-Out",
        description: "Debris is hauled to landfill or recycling facilities, the site is graded and cleaned, and the inspector issues a demolition certificate if required.",
        tasks: [
          { code: "4.1", name: "Load and haul debris to landfill/recycling", durationDays: 2, costPctOfTotal: 12, dependsOn: ["3.4"], description: "Dumpsters are hauled to the landfill or transfer station—expect 3–10 tons of waste for a typical renovation, more for full tear-downs." },
          { code: "4.2", name: "Site grading and cleanup", durationDays: 1, costPctOfTotal: 6, dependsOn: ["4.1"], description: "Remaining debris is cleared, the site is swept or vacuumed, and the ground is graded level for the next phase of construction." },
          { code: "4.3", name: "Final inspection and certificate", durationDays: 0.5, costPctOfTotal: 2, dependsOn: ["4.2"], description: "If a demolition permit was required, the inspector verifies the work matches the approved plan and issues a demolition certificate." },
          { code: "4.4", name: "Remove fencing and restore access", durationDays: 0.5, costPctOfTotal: 1, dependsOn: ["4.3"], description: "Temporary fencing and signage are removed, and normal property access is restored." },
        ],
      },
    ],
  },

  // ========================================
  // 19. DECKS
  // ========================================
  {
    serviceSlug: "decks",
    summary: "Deck construction involves pouring concrete footings below the frost line, building a pressure-treated lumber frame, installing deck boards with proper drainage spacing, and adding code-compliant railings. Ontario Building Code requires footings 4 feet deep, railings 42 inches high with no gaps larger than 4 inches, and a building permit for decks over 24 inches high or attached to the house.",
    totalDurationDays: { min: 3, max: 10 },
    phases: [
      {
        code: "1.0",
        name: "Planning & Design",
        description: "The deck is designed to meet code requirements for load capacity, railing height, and footing depth. A permit is required for most decks. Materials are ordered—composite costs 2–3× more than pressure-treated but requires no staining.",
        tasks: [
          { code: "1.1", name: "Deck design and layout", durationDays: 2, costPctOfTotal: 4, description: "The deck size, height, railing style, and stair configuration are planned, and footing locations are marked to ensure posts align with beams and joists." },
          { code: "1.2", name: "Obtain building permit", durationDays: 7, costPctOfTotal: 3, dependsOn: ["1.1"], description: "A building permit is required for decks over 24 inches high or attached to the house—the city reviews structural drawings and footing details." },
          { code: "1.3", name: "Order lumber and materials (pressure-treated or composite)", durationDays: 3, costPctOfTotal: 5, dependsOn: ["1.1"], description: "Pressure-treated lumber (posts, beams, joists), composite decking, or cedar boards are ordered along with galvanized fasteners, concrete, and railing kits." },
        ],
      },
      {
        code: "2.0",
        name: "Foundation & Framing",
        description: "Concrete footings are poured below the frost line to prevent heaving. Posts, beams, and joists create the structural frame. The ledger board is bolted to the house with proper flashing to prevent rot.",
        tasks: [
          { code: "2.1", name: "Mark footing locations and excavate", durationDays: 1, costPctOfTotal: 5, dependsOn: ["1.3"], description: "Footing locations are marked with stakes, and holes are dug or augered to 4 feet deep (below frost line) to prevent frost heaving." },
          { code: "2.2", name: "Pour concrete footings (below frost line 4 ft)", durationDays: 1, costPctOfTotal: 10, dependsOn: ["2.1"], description: "Concrete is poured into cardboard tube forms (Sonotubes) set in the holes, creating footings that extend at least 6 inches above grade." },
          { code: "2.3", name: "Install post anchors and posts", durationDays: 1, costPctOfTotal: 8, dependsOn: ["2.2"], description: "Metal post anchors are embedded in wet concrete or bolted to cured footings, and 6×6 pressure-treated posts are installed and plumbed." },
          { code: "2.4", name: "Attach ledger board to house (with flashing)", durationDays: 1, costPctOfTotal: 6, dependsOn: ["1.3"], description: "A 2× ledger board is bolted to the house rim joist with 1/2-inch lag bolts every 16 inches, and self-adhesive flashing tape is applied over the top to prevent water intrusion." },
          { code: "2.5", name: "Install beams and joists (16 in. O.C.)", durationDays: 2, costPctOfTotal: 12, dependsOn: ["2.3", "2.4"], description: "Double 2× beams span between posts, and 2×8 or 2×10 joists are installed perpendicular to the ledger at 16 inches on centre for proper deck board support." },
          { code: "2.6", name: "Framing inspection", durationDays: 1, costPctOfTotal: 2, dependsOn: ["2.5"], description: "The building inspector verifies footing depth, post-to-beam connections, joist spacing, ledger bolting, and flashing before deck boards can be installed." },
        ],
      },
      {
        code: "3.0",
        name: "Decking & Railings",
        description: "Deck boards are screwed down with 1/8-inch gaps for drainage. Stairs are built to code dimensions. Railings must be 42 inches high with balusters spaced no more than 4 inches apart.",
        tasks: [
          { code: "3.1", name: "Install deck boards (with spacing for drainage)", durationDays: 3, costPctOfTotal: 20, dependsOn: ["2.6"], description: "Deck boards are screwed to joists with 2½-inch deck screws or hidden fasteners, spaced 1/8 inch apart to allow water drainage and wood expansion." },
          { code: "3.2", name: "Install stairs and stringers", durationDays: 2, costPctOfTotal: 10, dependsOn: ["2.6"], description: "Stair stringers (typically 2×12) are cut to the correct rise (7–7.75 inches per step) and run (10–11 inches), attached to the deck frame, and treads are installed." },
          { code: "3.3", name: "Install railing posts and balusters (42 in. height)", durationDays: 2, costPctOfTotal: 12, dependsOn: ["3.1"], description: "4×4 railing posts are bolted to the deck frame at 6-foot intervals, and vertical balusters are installed with no more than 4-inch gaps (to prevent a 4-inch sphere from passing through)." },
          { code: "3.4", name: "Install top rail and cap", durationDays: 1, costPctOfTotal: 5, dependsOn: ["3.3"], description: "A 2×6 top rail is screwed to the posts at 42 inches height, and a 2× cap rail is installed over the top for a finished look and to shed water." },
        ],
      },
      {
        code: "4.0",
        name: "Close-Out",
        description: "The inspector verifies railing height and spacing meet code. Pressure-treated wood is stained or sealed for protection. The site is cleaned and the deck is ready for use.",
        tasks: [
          { code: "4.1", name: "Final inspection", durationDays: 0.5, costPctOfTotal: 2, dependsOn: ["3.4"], description: "The building inspector checks railing height, baluster spacing, stair dimensions, and guardrail strength before issuing final approval." },
          { code: "4.2", name: "Apply stain or sealant (if wood)", durationDays: 1, costPctOfTotal: 4, dependsOn: ["4.1"], description: "Pressure-treated wood is stained or sealed after 6–12 months (once it dries out), or immediately if using a water-based stain designed for wet wood—composite decks don't need staining." },
          { code: "4.3", name: "Cleanup and debris removal", durationDays: 0.5, costPctOfTotal: 2, dependsOn: ["4.2"], description: "Cut-off lumber, concrete bags, and fastener packaging are removed, and the area around the deck is cleaned and graded." },
        ],
      },
    ],
  },

  // ========================================
  // 20. GENERAL CONTRACTOR
  // ========================================
  {
    serviceSlug: "general-contractor",
    summary: "A general contractor oversees all aspects of a renovation project: hiring and managing subcontractors, obtaining permits, ordering materials, scheduling trades, coordinating inspections, and ensuring quality and safety. The GC is the single point of accountability—you hire one person who coordinates everyone else.",
    totalDurationDays: { min: 14, max: 182 },
    phases: [
      {
        code: "1.0",
        name: "Pre-Construction",
        description: "The GC defines the project scope, creates a detailed estimate, bids out work to subcontractors, obtains all permits, develops a construction schedule, and orders long-lead materials. This phase typically takes 4–8 weeks.",
        tasks: [
          { code: "1.1", name: "Project scope definition and estimating", durationDays: 5, costPctOfTotal: 3, description: "The GC reviews architectural drawings, meets with the client to clarify scope, and develops a detailed cost estimate broken down by trade and material." },
          { code: "1.2", name: "Subcontractor bidding and selection", durationDays: 10, costPctOfTotal: 2, description: "The GC sends drawings to multiple subcontractors (electrical, plumbing, HVAC, etc.) to get competitive bids, then selects the best combination of price and quality." },
          { code: "1.3", name: "Permits and approvals coordination", durationDays: 20, costPctOfTotal: 2, dependsOn: ["1.1"], description: "The GC prepares and submits all permit applications, responds to city review comments, and obtains building permits before construction starts." },
          { code: "1.4", name: "Project schedule development", durationDays: 3, costPctOfTotal: 2, dependsOn: ["1.2"], description: "The GC creates a Gantt chart or CPM schedule showing when each trade starts and finishes, material delivery dates, and inspection milestones." },
          { code: "1.5", name: "Material procurement and logistics", durationDays: 7, costPctOfTotal: 3, dependsOn: ["1.3"], description: "The GC orders materials with long lead times (windows, custom cabinets, trusses) and arranges delivery schedules to minimize on-site storage." },
        ],
      },
      {
        code: "2.0",
        name: "Construction Management",
        description: "The GC coordinates all trades, inspects work quality, updates the schedule, manages payments to subcontractors, processes change orders, and maintains site safety. This is the day-to-day management of the active construction phase.",
        tasks: [
          { code: "2.1", name: "Site supervision and coordination", durationDays: 120, costPctOfTotal: 15, dependsOn: ["1.5"], description: "The GC or site supervisor is on-site daily to coordinate trades, resolve conflicts (e.g., who works where today), and ensure the schedule is followed." },
          { code: "2.2", name: "Quality control inspections", durationDays: 120, costPctOfTotal: 8, dependsOn: ["1.5"], description: "The GC inspects completed work before it's covered (framing, rough-in) to catch defects early when they're cheap to fix." },
          { code: "2.3", name: "Schedule management and updates", durationDays: 120, costPctOfTotal: 5, dependsOn: ["1.5"], description: "The GC updates the schedule weekly to reflect actual progress, weather delays, material delays, and scope changes." },
          { code: "2.4", name: "Subcontractor payment management", durationDays: 120, costPctOfTotal: 3, dependsOn: ["1.5"], description: "The GC verifies work is complete before paying subcontractors, managing lien waivers and holdbacks per the Construction Act." },
          { code: "2.5", name: "Change order management", durationDays: 120, costPctOfTotal: 4, dependsOn: ["1.5"], description: "The GC prices and documents all changes to the original scope, gets client approval in writing, and updates the budget and schedule accordingly." },
          { code: "2.6", name: "Safety compliance and site meetings", durationDays: 120, costPctOfTotal: 5, dependsOn: ["1.5"], description: "The GC ensures WSIB compliance, holds weekly safety toolbox talks, and maintains a safe work environment per occupational health and safety regulations." },
        ],
      },
      {
        code: "3.0",
        name: "Coordination & Inspections",
        description: "The GC schedules and coordinates all municipal inspections, corrects any deficiencies identified by inspectors, and keeps the client informed with regular progress meetings.",
        tasks: [
          { code: "3.1", name: "Building department inspections coordination", durationDays: 90, costPctOfTotal: 5, dependsOn: ["2.1"], description: "The GC books inspections at the right milestones (footing, framing, rough-in, final) and ensures the site is ready when the inspector arrives." },
          { code: "3.2", name: "Deficiency resolution", durationDays: 30, costPctOfTotal: 6, dependsOn: ["3.1"], description: "If an inspection fails, the GC coordinates the fix, re-inspects internally, and books a re-inspection with the city." },
          { code: "3.3", name: "Client progress meetings and updates", durationDays: 120, costPctOfTotal: 3, dependsOn: ["2.1"], description: "The GC meets with the client weekly or biweekly to review progress, discuss upcoming decisions (paint colours, fixtures), and address concerns." },
        ],
      },
      {
        code: "4.0",
        name: "Project Close-Out",
        description: "The GC creates a punch list of final touch-ups, coordinates final inspections, assembles warranty documentation, completes final cleanup, and walks the client through the finished project.",
        tasks: [
          { code: "4.1", name: "Punch list development and completion", durationDays: 10, costPctOfTotal: 8, dependsOn: ["2.6"], description: "The GC and client walk through the completed work to identify minor defects (paint touch-ups, squeaky floors, loose fixtures), then the GC coordinates fixes." },
          { code: "4.2", name: "Final inspections and occupancy permit", durationDays: 3, costPctOfTotal: 3, dependsOn: ["4.1"], description: "The GC books final inspections (building, electrical, plumbing, gas) and obtains the occupancy permit or final sign-off." },
          { code: "4.3", name: "As-built documentation and warranties", durationDays: 5, costPctOfTotal: 3, dependsOn: ["4.2"], description: "The GC assembles warranty cards for appliances and materials, as-built drawings showing final conditions, and lien waivers from all subcontractors." },
          { code: "4.4", name: "Final cleanup and handover", durationDays: 2, costPctOfTotal: 4, dependsOn: ["4.1"], description: "A professional cleaning crew does a final clean, the GC removes all tools and materials, and the property is left move-in ready." },
          { code: "4.5", name: "Client training and walkthrough", durationDays: 1, costPctOfTotal: 2, dependsOn: ["4.4"], description: "The GC walks the client through the completed project, explaining how to operate new systems (HVAC, smart home, etc.) and answering questions." },
          { code: "4.6", name: "Project closeout and financial reconciliation", durationDays: 3, costPctOfTotal: 3, dependsOn: ["4.5"], description: "The GC provides final accounting (budget vs. actual), releases subcontractor holdbacks, and closes out the project file." },
        ],
      },
    ],
  },

  // ========================================
  // 21. PROJECT MANAGEMENT
  // ========================================
  {
    serviceSlug: "project-management",
    summary: "Professional project management provides oversight and coordination for complex renovations without doing the actual construction work. A PM develops detailed schedules, tracks budgets, monitors progress, manages risks, coordinates stakeholders, and produces regular reports. Think of it as hiring a project manager for your renovation—common on larger projects or when the homeowner lacks time or expertise.",
    totalDurationDays: { min: 28, max: 182 },
    phases: [
      {
        code: "1.0",
        name: "Initiation",
        description: "The project manager defines the project charter, identifies all stakeholders (homeowner, architect, contractor, neighbours), and develops a comprehensive project management plan.",
        tasks: [
          { code: "1.1", name: "Project charter and scope definition", durationDays: 3, costPctOfTotal: 5, description: "The PM documents the project objectives, success criteria, deliverables, constraints, and assumptions in a formal project charter." },
          { code: "1.2", name: "Stakeholder identification and analysis", durationDays: 2, costPctOfTotal: 3, dependsOn: ["1.1"], description: "The PM identifies everyone with an interest in the project (homeowner, architect, GC, neighbours, city) and analyzes their influence and expectations." },
          { code: "1.3", name: "Develop project management plan", durationDays: 5, costPctOfTotal: 6, dependsOn: ["1.2"], description: "The PM creates a comprehensive plan covering scope, schedule, budget, quality, risk, communication, and procurement strategies." },
        ],
      },
      {
        code: "2.0",
        name: "Planning",
        description: "The PM breaks down the project into tasks, develops a detailed schedule with critical path analysis, establishes a cost baseline, assesses risks, and plans procurement of materials and services.",
        tasks: [
          { code: "2.1", name: "Work breakdown structure (WBS) development", durationDays: 3, costPctOfTotal: 4, dependsOn: ["1.3"], description: "The PM decomposes the project into smaller, manageable work packages—foundation, framing, rough-in, finishes, etc." },
          { code: "2.2", name: "Schedule development (CPM/Gantt)", durationDays: 5, costPctOfTotal: 6, dependsOn: ["2.1"], description: "The PM creates a schedule using critical path method (CPM) or Gantt chart, identifying task dependencies, durations, and the critical path (tasks that cannot be delayed without delaying the project)." },
          { code: "2.3", name: "Budget and cost baseline", durationDays: 4, costPctOfTotal: 5, dependsOn: ["2.1"], description: "The PM develops a detailed budget broken down by cost category (labour, materials, equipment, permits) and establishes a baseline for tracking variances." },
          { code: "2.4", name: "Risk assessment and mitigation planning", durationDays: 3, costPctOfTotal: 4, dependsOn: ["2.2"], description: "The PM identifies potential risks (weather delays, permit delays, material shortages) and develops mitigation strategies and contingency plans." },
          { code: "2.5", name: "Procurement planning", durationDays: 3, costPctOfTotal: 3, dependsOn: ["2.3"], description: "The PM plans what needs to be purchased, when, from whom, and how—identifying long-lead items that must be ordered early." },
        ],
      },
      {
        code: "3.0",
        name: "Execution & Monitoring",
        description: "The PM tracks progress daily or weekly, monitors budget vs. actual costs, updates the schedule, ensures quality standards are met, manages scope changes, and resolves issues as they arise.",
        tasks: [
          { code: "3.1", name: "Daily/weekly progress tracking", durationDays: 150, costPctOfTotal: 12, dependsOn: ["2.5"], description: "The PM visits the site regularly, tracks completed tasks vs. the schedule, and identifies delays or issues early." },
          { code: "3.2", name: "Budget monitoring and cost control", durationDays: 150, costPctOfTotal: 10, dependsOn: ["2.5"], description: "The PM tracks actual costs vs. budget, forecasts final project cost, and alerts the client to potential overruns before they become crises." },
          { code: "3.3", name: "Schedule updates and critical path analysis", durationDays: 150, costPctOfTotal: 8, dependsOn: ["2.5"], description: "The PM updates the schedule weekly, recalculates the critical path, and identifies opportunities to accelerate work or recover delays." },
          { code: "3.4", name: "Quality assurance and inspections", durationDays: 150, costPctOfTotal: 7, dependsOn: ["2.5"], description: "The PM inspects work quality, ensures it meets specifications and code, and coordinates municipal inspections." },
          { code: "3.5", name: "Change management and scope control", durationDays: 150, costPctOfTotal: 6, dependsOn: ["2.5"], description: "The PM evaluates change requests, prices them, gets client approval, and updates the budget and schedule accordingly." },
          { code: "3.6", name: "Risk monitoring and issue resolution", durationDays: 150, costPctOfTotal: 5, dependsOn: ["2.5"], description: "The PM monitors identified risks, resolves issues as they arise (disputes, delays, defects), and escalates to the client when necessary." },
        ],
      },
      {
        code: "4.0",
        name: "Communication & Reporting",
        description: "The PM produces regular progress reports, executive summaries, and dashboards, and coordinates meetings between the client, contractor, architect, and other stakeholders.",
        tasks: [
          { code: "4.1", name: "Weekly progress reports to stakeholders", durationDays: 150, costPctOfTotal: 6, dependsOn: ["3.1"], description: "The PM produces weekly reports showing progress vs. plan, budget status, upcoming milestones, and issues requiring attention." },
          { code: "4.2", name: "Monthly executive summary and dashboards", durationDays: 150, costPctOfTotal: 4, dependsOn: ["3.1"], description: "The PM provides high-level monthly summaries with dashboards (traffic-light indicators) for schedule, budget, quality, and risk." },
          { code: "4.3", name: "Coordination meetings (site, design, client)", durationDays: 150, costPctOfTotal: 5, dependsOn: ["3.1"], description: "The PM chairs weekly site meetings with the contractor, design meetings with the architect, and client update meetings to keep everyone aligned." },
        ],
      },
      {
        code: "5.0",
        name: "Close-Out",
        description: "The PM verifies all deliverables are complete, documents lessons learned for future projects, and archives all project documents for reference.",
        tasks: [
          { code: "5.1", name: "Final deliverables verification", durationDays: 5, costPctOfTotal: 3, dependsOn: ["3.6"], description: "The PM checks that all contracted work is complete, warranties are provided, and final documentation is assembled." },
          { code: "5.2", name: "Lessons learned documentation", durationDays: 3, costPctOfTotal: 2, dependsOn: ["5.1"], description: "The PM conducts a post-project review to identify what went well and what could be improved, documenting lessons for future projects." },
          { code: "5.3", name: "Project archive and handover", durationDays: 2, costPctOfTotal: 2, dependsOn: ["5.2"], description: "The PM archives all project documents (contracts, drawings, schedules, reports, photos, warranties) and hands them over to the client in an organized format." },
        ],
      },
    ],
  },

  // ========================================
  // 22. BUILDING PERMITS
  // ========================================
  {
    serviceSlug: "building-permit",
    summary: "Building permit coordination involves preparing the permit application package (drawings, forms, site plans), submitting to the municipality, responding to review comments, and obtaining final approval. Permit processing times vary widely—simple projects take 2–4 weeks, complex projects or minor variances can take 3–6 months. A permit coordinator navigates this process and ensures compliance.",
    totalDurationDays: { min: 14, max: 84 },
    phases: [
      {
        code: "1.0",
        name: "Pre-Submission",
        description: "The coordinator reviews project scope for zoning compliance, collects all required drawings and documents, prepares the application package, and completes municipal forms.",
        tasks: [
          { code: "1.1", name: "Review project scope and zoning compliance", durationDays: 2, costPctOfTotal: 8, description: "The coordinator checks the project against zoning bylaws (setbacks, lot coverage, height limits) to identify any variances or zoning issues before submitting." },
          { code: "1.2", name: "Collect architectural and engineering drawings", durationDays: 3, costPctOfTotal: 10, dependsOn: ["1.1"], description: "The coordinator gathers stamped architectural drawings, structural engineering drawings, site plans, and any specialty drawings (HVAC, energy compliance) required by the municipality." },
          { code: "1.3", name: "Prepare permit application package", durationDays: 3, costPctOfTotal: 12, dependsOn: ["1.2"], description: "The coordinator assembles the complete submission package: drawings, site plan, construction value estimate, owner authorization, and any supporting documents." },
          { code: "1.4", name: "Complete municipal forms and checklists", durationDays: 2, costPctOfTotal: 8, dependsOn: ["1.3"], description: "The coordinator fills out municipal application forms, zoning checklists, energy compliance forms (OBC SB-12), and any other required documentation." },
        ],
      },
      {
        code: "2.0",
        name: "Submission & Review",
        description: "The application is submitted, fees are paid, and the city reviews the package. Most cities provide review comments within 4–6 weeks. The coordinator responds to comments and resubmits until approval is granted.",
        tasks: [
          { code: "2.1", name: "Submit application to building department", durationDays: 1, costPctOfTotal: 5, dependsOn: ["1.4"], description: "The coordinator submits the complete package electronically or in person to the municipal building department and receives a file number." },
          { code: "2.2", name: "Pay permit fees", durationDays: 1, costPctOfTotal: 10, dependsOn: ["2.1"], description: "Permit fees are calculated based on construction value (typically 0.5–1.5% of project cost) and paid to the municipality." },
          { code: "2.3", name: "Building department plan review", durationDays: 30, costPctOfTotal: 0, dependsOn: ["2.2"], description: "The city reviews the submission for compliance with Ontario Building Code, zoning bylaws, structural adequacy, and fire safety—this takes 4–8 weeks in most GTA municipalities." },
          { code: "2.4", name: "Respond to review comments and resubmit", durationDays: 7, costPctOfTotal: 15, dependsOn: ["2.3"], description: "The coordinator receives review comments (requests for clarification or revisions), coordinates with the architect/engineer to address them, and resubmits." },
          { code: "2.5", name: "Additional review cycles (if needed)", durationDays: 21, costPctOfTotal: 10, dependsOn: ["2.4"], description: "If significant revisions are required, the city may need 2–3 review cycles—each taking 1–3 weeks—before issuing approval." },
        ],
      },
      {
        code: "3.0",
        name: "Approval & Issuance",
        description: "Once the city approves the submission, the building permit is issued. The coordinator picks up the permit package and posts it on site before construction begins.",
        tasks: [
          { code: "3.1", name: "Final approval and permit issuance", durationDays: 3, costPctOfTotal: 5, dependsOn: ["2.5"], description: "The city issues final approval, and the building permit is prepared for pickup or delivery." },
          { code: "3.2", name: "Receive permit package and post on site", durationDays: 1, costPctOfTotal: 2, dependsOn: ["3.1"], description: "The coordinator picks up the permit package (permit card, approved drawings, inspection schedule) and posts the permit card on site in a visible location—legally required before work starts." },
        ],
      },
      {
        code: "4.0",
        name: "Coordination",
        description: "The coordinator schedules inspections throughout construction, provides permit copies to all trades, monitors inspection results, and coordinates the final occupancy permit.",
        tasks: [
          { code: "4.1", name: "Schedule required inspections", durationDays: 2, costPctOfTotal: 5, dependsOn: ["3.2"], description: "The coordinator plans the inspection schedule (footing, framing, rough-in, insulation, final) and provides the contractor with inspection milestones." },
          { code: "4.2", name: "Provide permit copies to contractor and trades", durationDays: 1, costPctOfTotal: 3, dependsOn: ["3.2"], description: "Copies of the permit and approved drawings are distributed to the general contractor and all subcontractors for reference." },
          { code: "4.3", name: "Monitor compliance and inspection results", durationDays: 60, costPctOfTotal: 5, dependsOn: ["4.1"], description: "The coordinator tracks inspection results, coordinates deficiency corrections if inspections fail, and ensures all inspections pass before final close-out." },
          { code: "4.4", name: "Final occupancy permit coordination", durationDays: 3, costPctOfTotal: 2, dependsOn: ["4.3"], description: "Once all inspections pass, the coordinator arranges the final inspection and obtains the occupancy permit or final sign-off letter from the city." },
        ],
      },
    ],
  },

  // ========================================
  // 23. DRAFTING
  // ========================================
  {
    serviceSlug: "drafting",
    summary: "Drafting services produce the construction drawings needed for building permits and contractor bidding. A drafter (or architectural technologist) measures your existing space, develops a design concept based on your requirements, and prepares permit-ready drawings showing floor plans, elevations, sections, and construction details. Less expensive than a full architect, but cannot stamp drawings or design complex structures.",
    totalDurationDays: { min: 14, max: 42 },
    phases: [
      {
        code: "1.0",
        name: "Discovery & Site Measurement",
        description: "The drafter meets with you to understand your goals, measures the existing space, reviews zoning bylaws, and collects any existing drawings if available.",
        tasks: [
          { code: "1.1", name: "Client consultation and design brief", durationDays: 2, costPctOfTotal: 6, description: "The drafter meets with you to understand your project goals, budget, must-haves vs. nice-to-haves, and any specific design preferences." },
          { code: "1.2", name: "Site visit and existing conditions measurement", durationDays: 2, costPctOfTotal: 8, dependsOn: ["1.1"], description: "The drafter measures the existing space with a laser measure or tape, notes ceiling heights, window/door locations, structural elements, and takes reference photos." },
          { code: "1.3", name: "Review zoning bylaws and building code", durationDays: 2, costPctOfTotal: 5, dependsOn: ["1.2"], description: "The drafter reviews municipal zoning bylaws (setbacks, lot coverage, height) and Ontario Building Code requirements to ensure the design will be compliant." },
          { code: "1.4", name: "Collect existing drawings (if available)", durationDays: 1, costPctOfTotal: 3, dependsOn: ["1.2"], description: "If original house plans exist (from the builder or previous permit), the drafter collects them as a reference—saves time measuring." },
        ],
      },
      {
        code: "2.0",
        name: "Conceptual Design",
        description: "The drafter develops 2–3 preliminary layout options for your review, incorporates your feedback, and refines the selected concept into a detailed design.",
        tasks: [
          { code: "2.1", name: "Develop preliminary layout options", durationDays: 5, costPctOfTotal: 12, dependsOn: ["1.4"], description: "The drafter creates 2–3 floor plan options showing different layouts, room sizes, and door/window placements for you to compare." },
          { code: "2.2", name: "Client review and feedback", durationDays: 3, costPctOfTotal: 4, dependsOn: ["2.1"], description: "You review the options, identify what you like and dislike, and the drafter takes notes on requested changes and preferences." },
          { code: "2.3", name: "Refine selected concept", durationDays: 3, costPctOfTotal: 8, dependsOn: ["2.2"], description: "The drafter refines your selected option, incorporating feedback, adjusting dimensions, optimizing flow, and preparing it for detailed drawings." },
        ],
      },
      {
        code: "3.0",
        name: "Construction Documents",
        description: "The drafter produces the full set of construction drawings—floor plans, elevations, sections, foundation plans, and framing plans—with dimensions, notes, and specifications needed for permits and contractor bidding.",
        tasks: [
          { code: "3.1", name: "Prepare floor plans (existing and proposed)", durationDays: 5, costPctOfTotal: 15, dependsOn: ["2.3"], description: "The drafter draws the existing floor plan (to show what's being demolished) and the proposed floor plan (showing new walls, rooms, windows, doors) to scale in CAD software." },
          { code: "3.2", name: "Prepare elevations and sections", durationDays: 4, costPctOfTotal: 12, dependsOn: ["3.1"], description: "Elevations show the exterior walls from all four sides, and sections show vertical cuts through the building to illustrate ceiling heights, floor levels, and roof construction." },
          { code: "3.3", name: "Prepare foundation and framing plans", durationDays: 4, costPctOfTotal: 10, dependsOn: ["3.1"], description: "Foundation plans show footing locations and sizes, and framing plans show joist direction, beam locations, and structural support—required for permits." },
          { code: "3.4", name: "Add dimensions, notes, and specifications", durationDays: 3, costPctOfTotal: 8, dependsOn: ["3.2", "3.3"], description: "The drafter dimensions every wall, opening, and detail, adds construction notes (materials, finishes, code references), and specifies products where needed." },
          { code: "3.5", name: "Coordinate with structural engineer (if required)", durationDays: 5, costPctOfTotal: 0, dependsOn: ["3.4"], description: "If structural changes are involved (removing walls, adding beams), the drafter sends drawings to a structural engineer for calculations and stamped approval." },
        ],
      },
      {
        code: "4.0",
        name: "Finalization",
        description: "The drafter reviews drawings for quality and code compliance, gets your final approval, prepares a permit-ready set, and delivers digital files.",
        tasks: [
          { code: "4.1", name: "Quality review and code compliance check", durationDays: 2, costPctOfTotal: 4, dependsOn: ["3.5"], description: "The drafter checks all drawings for accuracy, completeness, dimensional consistency, and compliance with Ontario Building Code and zoning bylaws." },
          { code: "4.2", name: "Client final review and approval", durationDays: 2, costPctOfTotal: 2, dependsOn: ["4.1"], description: "You review the final drawings to ensure they match your expectations—this is the last chance to make changes before permit submission." },
          { code: "4.3", name: "Prepare permit-ready drawing set", durationDays: 2, costPctOfTotal: 5, dependsOn: ["4.2"], description: "The drafter assembles the complete drawing set (title block, site plan, floor plans, elevations, sections, details) formatted to municipal requirements." },
          { code: "4.4", name: "Deliver PDFs and CAD files", durationDays: 1, costPctOfTotal: 2, dependsOn: ["4.3"], description: "The drafter provides stamped PDFs for permit submission, editable CAD files for contractors, and printed copies if requested." },
        ],
      },
    ],
  },

  // ========================================
  // 24. ESTIMATING
  // ========================================
  {
    serviceSlug: "estimating",
    summary: "Professional estimating services provide detailed, accurate cost projections for renovation projects. An estimator reviews drawings and specifications, measures material quantities, calculates labour hours, prices materials at current market rates, gets subcontractor quotes, and delivers a detailed cost breakdown. This helps secure financing, compare contractor bids, and budget realistically.",
    totalDurationDays: { min: 7, max: 21 },
    phases: [
      {
        code: "1.0",
        name: "Project Review",
        description: "The estimator reviews all project documents, visits the site to understand existing conditions, and clarifies scope and assumptions with the client.",
        tasks: [
          { code: "1.1", name: "Review drawings and specifications", durationDays: 2, costPctOfTotal: 10, description: "The estimator studies architectural drawings, structural plans, finish schedules, and written specifications to understand exactly what work is included." },
          { code: "1.2", name: "Site visit (if required)", durationDays: 1, costPctOfTotal: 5, dependsOn: ["1.1"], description: "For renovation projects, the estimator visits the site to assess existing conditions, access constraints, demolition requirements, and potential unknowns (hidden damage, hazmat)." },
          { code: "1.3", name: "Clarify scope with client", durationDays: 1, costPctOfTotal: 5, dependsOn: ["1.1"], description: "The estimator confirms scope assumptions (what's included vs. excluded), finish quality levels, and any special requirements with the client." },
        ],
      },
      {
        code: "2.0",
        name: "Quantity Takeoff",
        description: "The estimator measures material quantities from drawings, calculates labour hours for each trade, and identifies equipment needs. This is the most time-intensive phase—every board, sheet of drywall, and fixture is counted.",
        tasks: [
          { code: "2.1", name: "Measure materials (lumber, concrete, drywall, etc.)", durationDays: 3, costPctOfTotal: 15, dependsOn: ["1.3"], description: "The estimator measures quantities directly from drawings: board-feet of lumber, cubic metres of concrete, square metres of drywall, linear metres of trim, etc." },
          { code: "2.2", name: "Calculate labor hours by trade", durationDays: 2, costPctOfTotal: 12, dependsOn: ["2.1"], description: "Using productivity rates (e.g., 1 carpenter-hour per 10 sq ft of framing), the estimator calculates labour hours for framing, electrical, plumbing, drywall, painting, etc." },
          { code: "2.3", name: "Identify equipment and rental needs", durationDays: 1, costPctOfTotal: 5, dependsOn: ["2.1"], description: "The estimator lists equipment required (excavator, scaffolding, dumpster, lifts) and rental durations based on the project schedule." },
        ],
      },
      {
        code: "3.0",
        name: "Pricing",
        description: "Material quantities are priced at current market rates, labour is priced at prevailing wage rates, subcontractors provide quotes, and overhead/profit margins are added.",
        tasks: [
          { code: "3.1", name: "Price materials (current market rates)", durationDays: 2, costPctOfTotal: 10, dependsOn: ["2.3"], description: "The estimator prices materials at current supplier rates (lumber, drywall, fixtures, appliances)—these fluctuate, so estimates are typically valid for 30–60 days." },
          { code: "3.2", name: "Price labor (union or open shop rates)", durationDays: 2, costPctOfTotal: 10, dependsOn: ["2.2"], description: "Labour hours are multiplied by wage rates (union scale or open-shop rates) plus burden (WSIB, CPP, EI, vacation pay)—typically adds 30–40% to base wage." },
          { code: "3.3", name: "Get subcontractor quotes", durationDays: 5, costPctOfTotal: 8, dependsOn: ["1.3"], description: "For specialty trades (HVAC, elevators, custom millwork), the estimator sends drawings to subcontractors and collects formal quotes." },
          { code: "3.4", name: "Calculate overhead and profit margin", durationDays: 1, costPctOfTotal: 6, dependsOn: ["3.1", "3.2", "3.3"], description: "The estimator adds overhead (office costs, insurance, vehicles, project management) and profit margin (typically 10–20% for residential work)." },
        ],
      },
      {
        code: "4.0",
        name: "Estimate Finalization",
        description: "The estimator compiles all costs into a detailed breakdown, reviews for accuracy and completeness, and delivers a professional estimate report.",
        tasks: [
          { code: "4.1", name: "Compile detailed cost breakdown", durationDays: 2, costPctOfTotal: 8, dependsOn: ["3.4"], description: "The estimator organizes costs into categories (site work, structure, mechanicals, finishes) and provides a detailed breakdown showing quantities, unit costs, and extensions." },
          { code: "4.2", name: "Review for accuracy and completeness", durationDays: 1, costPctOfTotal: 4, dependsOn: ["4.1"], description: "The estimator double-checks calculations, ensures nothing was missed, and verifies that assumptions and exclusions are clearly stated." },
          { code: "4.3", name: "Deliver estimate report to client", durationDays: 1, costPctOfTotal: 2, dependsOn: ["4.2"], description: "The estimator provides a professional estimate report with executive summary, detailed cost breakdown, assumptions, exclusions, and validity period (typically 30–60 days)." },
        ],
      },
    ],
  },

  // ========================================
  // 25. EQUIPMENT RENTAL
  // ========================================
  {
    serviceSlug: "equipment-rental",
    summary: "Equipment rental provides access to specialized tools and machinery for construction projects without the capital cost of ownership. Common rentals include excavators, skid steers, scaffolding, concrete mixers, dumpsters, lifts, and power tools. Rental rates are typically daily, weekly, or monthly—weekly rates are usually 3× daily, monthly is 3× weekly. Delivery, fuel, and operator training may cost extra.",
    totalDurationDays: { min: 1, max: 28 },
    phases: [
      {
        code: "1.0",
        name: "Rental Planning",
        description: "Identify what equipment is needed, check availability at rental yards, reserve it for your dates, and arrange delivery or pickup.",
        tasks: [
          { code: "1.1", name: "Identify equipment needs", durationDays: 0.5, costPctOfTotal: 5, description: "Determine what equipment is required based on the project scope—mini excavator for trenching, scaffolding for high work, dumpster for debris, etc." },
          { code: "1.2", name: "Check availability and reserve", durationDays: 1, costPctOfTotal: 8, dependsOn: ["1.1"], description: "Call or check online with rental companies (Home Depot, United Rentals, local yards) to confirm availability for your dates and reserve the equipment." },
          { code: "1.3", name: "Arrange delivery or pickup", durationDays: 1, costPctOfTotal: 7, dependsOn: ["1.2"], description: "Decide whether to have the equipment delivered (convenient but costs $100–$300) or pick it up yourself with a trailer." },
        ],
      },
      {
        code: "2.0",
        name: "Equipment Use",
        description: "Equipment is delivered or picked up, operators are trained on safe use, and the rental period begins. Daily rates start when you take possession, not when you first use it.",
        tasks: [
          { code: "2.1", name: "Delivery and setup on site", durationDays: 0.5, costPctOfTotal: 10, dependsOn: ["1.3"], description: "The rental company delivers the equipment on a trailer or truck and unloads it at your site—you need clear access and a stable surface." },
          { code: "2.2", name: "Operator training (if required)", durationDays: 0.5, costPctOfTotal: 5, dependsOn: ["2.1"], description: "The delivery driver provides basic operating instructions and safety tips—more complex equipment (excavators, boom lifts) may require certified operator training." },
          { code: "2.3", name: "Daily/weekly rental period", durationDays: 14, costPctOfTotal: 40, dependsOn: ["2.2"], description: "The rental clock runs from pickup/delivery until return—weekends usually count, so a Friday-to-Monday rental costs 3 days even if you only work Saturday." },
          { code: "2.4", name: "Fuel and maintenance costs", durationDays: 14, costPctOfTotal: 10, dependsOn: ["2.3"], description: "You're responsible for fuel and minor maintenance (checking oil, greasing)—major repairs are the rental company's responsibility if it's not due to misuse." },
        ],
      },
      {
        code: "3.0",
        name: "Return & Close-Out",
        description: "Equipment is cleaned, inspected for damage, and returned to the rental yard. The final invoice is calculated based on actual days rented plus any damage charges.",
        tasks: [
          { code: "3.1", name: "Clean equipment and prep for return", durationDays: 0.5, costPctOfTotal: 5, dependsOn: ["2.4"], description: "Clean off mud, concrete, and debris—rental companies charge cleaning fees ($50–$200) if equipment comes back excessively dirty." },
          { code: "3.2", name: "Pickup or return to rental yard", durationDays: 0.5, costPctOfTotal: 8, dependsOn: ["3.1"], description: "The rental company picks up the equipment (if delivery was included) or you return it to the yard—return it early in the day to avoid being charged for an extra day." },
          { code: "3.3", name: "Final invoice and payment", durationDays: 1, costPctOfTotal: 2, dependsOn: ["3.2"], description: "The rental company inspects the equipment for damage, calculates final charges (rental days + delivery + fuel + damage), and processes payment." },
        ],
      },
    ],
  },
];

// ========================================
// HELPER FUNCTIONS
// ========================================

export function getWbsTemplate(serviceSlug: string): WbsTemplate | undefined {
  return wbsTemplates.find((t) => t.serviceSlug === serviceSlug);
}

export function calculatePhaseCost(
  phase: WbsPhase,
  totalBudget: number
): { min: number; max: number } {
  const phasePct = phase.tasks.reduce((sum, t) => sum + t.costPctOfTotal, 0);
  return {
    min: Math.round(totalBudget * (phasePct / 100) * 0.9),
    max: Math.round(totalBudget * (phasePct / 100) * 1.1),
  };
}

export function calculateTotalDuration(phases: WbsPhase[]): number {
  // Simple sum (no parallelism) — conservative estimate
  return phases.reduce(
    (sum, phase) => sum + phase.tasks.reduce((s, t) => s + t.durationDays, 0),
    0
  );
}

export function calculateCriticalPath(phases: WbsPhase[]): string[] {
  // Simple critical path: all tasks with no dependencies that have longest cumulative duration
  // For a real CPM implementation, you'd need a proper DAG solver
  const allTasks: WbsTask[] = phases.flatMap((p) => p.tasks);
  const longestChain: string[] = [];

  allTasks.forEach((task) => {
    if (!task.dependsOn || task.dependsOn.length === 0) {
      longestChain.push(task.code);
    }
  });

  return longestChain;
}

export function getTasksByPhase(template: WbsTemplate, phaseCode: string): WbsTask[] {
  const phase = template.phases.find((p) => p.code === phaseCode);
  return phase ? phase.tasks : [];
}

export function getTotalCost(template: WbsTemplate, totalBudget: number): number {
  // Should always equal totalBudget (100% of cost)
  return template.phases.reduce((sum, phase) => {
    const phaseCost = calculatePhaseCost(phase, totalBudget);
    return sum + (phaseCost.min + phaseCost.max) / 2;
  }, 0);
}
