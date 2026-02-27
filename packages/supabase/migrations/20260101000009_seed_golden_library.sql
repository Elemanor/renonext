-- Golden Library Seed Data
-- Real construction trade sequences from "The Complete Guide to Contracting Your Home" by Kent Lester
-- Ontario Building Code compliance
BEGIN;

-- ============================================================================
-- 1. PRE-CONSTRUCTION (PC) - 12 construction steps
-- ============================================================================

WITH compliance_insert AS (
  INSERT INTO public.compliance_rulesets (
    id, trade_type, region, name, rules, created_at
  ) VALUES (
    gen_random_uuid(),
    'PC',
    'ON',
    'Pre-Construction Compliance (Ontario)',
    jsonb_build_object(
      'required_permits', jsonb_build_array(
        jsonb_build_object('type', 'building_permit', 'description', 'Building permit required', 'issuing_body', 'Municipal Building Department'),
        jsonb_build_object('type', 'builder_risk_insurance', 'description', 'Builder risk insurance required', 'issuing_body', 'Insurance Provider')
      ),
      'required_inspections', jsonb_build_array(
        jsonb_build_object('type', 'site_survey', 'stage', 'pre_construction', 'description', 'Lot survey and boundary marking', 'authority', 'Municipal Building Inspector')
      ),
      'code_references', jsonb_build_array(
        jsonb_build_object('code', 'OBC', 'section', '1.2', 'description', 'Demolition and site preparation requirements')
      )
    ),
    NOW()
  )
  RETURNING id AS compliance_id
),
sequence_insert AS (
  INSERT INTO public.execution_sequences (
    id, trade_type, name, description, region, source, is_public, is_verified, created_by_id, created_at
  ) VALUES (
    gen_random_uuid(),
    'PC',
    'Pre-Construction Preparation',
    'Site preparation, permits, and groundbreaking coordination for residential construction project',
    'ON',
    'platform_template',
    TRUE,
    TRUE,
    NULL,
    NOW()
  )
  RETURNING id AS sequence_id
),
steps_insert AS (
  INSERT INTO public.sequence_steps (
    sequence_id, step_number, title, description, plain_language_summary, requires_inspection, requires_permit, is_milestone, triggers_payment, code_reference, authority_body, quality_criteria, skip_risk_description, created_at
  ) VALUES
  ((SELECT sequence_id FROM sequence_insert), 1, 'Obtain Building Permit', 'Apply for and receive building permit from municipal building department. Ensure all plans are approved and stamped.', 'Get official approval from the city to build. You''ll need approved blueprints and must wait for the permit before any construction work starts.', FALSE, TRUE, TRUE, FALSE, 'OBC 1.2', 'Municipal Building Department', 'Permit issued with all required stamps and signatures; copy posted on site', 'Without a building permit, entire project is illegal and uninsurable', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 2, 'Obtain Builder Risk Insurance Policy', 'Secure builder risk (course of construction) insurance covering property damage, theft, and liability during construction.', 'Buy insurance that covers your home while it''s being built. This protects against theft, fire, and damage during construction.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Policy issued and active; minimum coverage $[construction_value]', 'No insurance means you''re personally liable for all damage and theft', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 3, 'Obtain Worker Compensation Policy', 'Secure worker compensation insurance for all on-site labor, meeting Ontario requirements.', 'Buy insurance that covers workers if they''re injured on your job site. This is legally required in Ontario.', FALSE, FALSE, FALSE, FALSE, 'OBC 1.3', 'Ontario Ministry of Labour', 'Policy certificate provided to all subs; proof of coverage documented', 'Missing WCB coverage exposes you to massive liability and fines', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 4, 'Acquire Minimum Tools', 'Obtain essential hand tools and equipment for on-site management: levels, tape measures, stakes, marking paint, transit, straightedges.', 'Get the basic tools you''ll need to oversee the job: tape measures, levels, string, marking paint, and surveying equipment.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'All tools functional and calibrated; transit checked for accuracy', 'Poor tools lead to measurement errors that compound throughout build', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 5, 'Visit Construction Sites for Reference', 'Tour 3-5 local construction sites to observe current building practices, finishes, and problem areas in similar projects.', 'Look at other houses being built. See what works, what looks good, and what problems to avoid on your project.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Notes taken on observed practices; photos of relevant details documented', 'Skipping this means missing real-world insights that prevent expensive mistakes', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 6, 'Determine Need for On-Site Storage', 'Assess lot size and layout to determine if temporary storage shed is needed for tools, materials, and equipment during construction.', 'Decide if you need a small storage shed on site to protect tools and materials. This depends on your lot size and access.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Storage needs documented; rental arrangements confirmed if needed', 'Lack of secure storage leads to theft and weather damage to materials', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 7, 'Notify All Subs and Labor of Groundbreaking Date', 'Communicate official groundbreaking date to all subcontractors and labor crew. Confirm availability and scheduling.', 'Tell all the builders, electricians, plumbers, and other workers when the project officially starts so everyone shows up ready to go.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Written notification sent to all parties; confirmations received', 'Poor communication causes crews to show up unprepared or at wrong times', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 8, 'Conduct Spot Survey of Lot', 'Perform preliminary survey to locate property boundaries, easements, existing structures, and utilities.', 'Have a surveyor check your lot to confirm where your property lines are and mark any easements or utilities underground.', FALSE, TRUE, FALSE, FALSE, 'OBC 1.2.1', 'Professional Land Surveyor', 'Survey marks clearly visible; boundary stakes set; utility locations marked', 'Building on wrong lot or hitting utilities is catastrophic and costly', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 9, 'Mark All Lot Boundaries', 'Clearly mark all property boundaries with bright tape or markers. Ensure setback requirements from property lines are understood.', 'Mark your property lines clearly with tape or paint so everyone knows where the building can go. Check setback requirements.', FALSE, FALSE, FALSE, FALSE, 'OBC 4.1.1', 'Municipal Building Department', 'All boundaries clearly marked; setback distances verified and documented', 'Building too close to property line violates code and requires demolition', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 10, 'Post Construction and Warning Signs', 'Install visible construction site signs, danger warnings, and site access restrictions. Comply with Ontario workplace safety requirements.', 'Put up warning signs so people don''t wander into the dangerous construction zone. Mark areas as restricted.', FALSE, FALSE, FALSE, FALSE, 'OBC 3.2.2', 'Ontario Ministry of Labour', 'Signs installed at all site entry points; visibility confirmed', 'Missing safety signs creates liability and may violate workplace safety laws', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 11, 'Post Building Permit Visibly', 'Display building permit prominently at site entrance so inspectors and all workers can verify approval and requirements.', 'Post the building permit where everyone can see it. This proves the work is approved and shows officials everything is official.', FALSE, FALSE, FALSE, FALSE, 'OBC 1.2', 'Municipal Building Department', 'Permit posted in weatherproof container at main entrance; readable and current', 'Concealing or failing to post permit shows lack of compliance to inspectors', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 12, 'Arrange for Rental Toilet and Site Telephone', 'Contract for portable toilet, hand washing station, and temporary site telephone for worker health, safety, and communication.', 'Rent a portable toilet and set up a phone or communication system on site. Workers need facilities, and you need to stay in contact.', FALSE, FALSE, TRUE, TRUE, 'OBC 3.2.3', 'Ontario Ministry of Labour', 'Toilet installed and serviced weekly; phone line active; log maintained', 'No facilities creates workplace safety violations and morale issues', NOW())
)
SELECT 1;

-- ============================================================================
-- 2. EXCAVATION (EX) - 20 construction steps
-- ============================================================================

WITH compliance_insert AS (
  INSERT INTO public.compliance_rulesets (
    id, trade_type, region, name, rules, created_at
  ) VALUES (
    gen_random_uuid(),
    'EX',
    'ON',
    'Excavation and Grading Compliance (Ontario)',
    jsonb_build_object(
      'required_permits', jsonb_build_array(
        jsonb_build_object('type', 'excavation_permit', 'description', 'Excavation and grading permit', 'issuing_body', 'Municipal Building Department'),
        jsonb_build_object('type', 'utility_locate', 'description', 'Utility locating service required', 'issuing_body', 'Ontario One-Call (1-800-400-2255)')
      ),
      'required_inspections', jsonb_build_array(
        jsonb_build_object('type', 'cleared_site', 'stage', 'post_clearing', 'description', 'Site clearing and excavation inspection', 'authority', 'Municipal Building Inspector'),
        jsonb_build_object('type', 'batter_boards', 'stage', 'foundation_layout', 'description', 'Batter board layout and measurements inspection', 'authority', 'Municipal Building Inspector')
      ),
      'code_references', jsonb_build_array(
        jsonb_build_object('code', 'OBC', 'section', '4.1.2', 'description', 'Grading and drainage requirements'),
        jsonb_build_object('code', 'OBC', 'section', '5.10', 'description', 'Foundation excavation requirements'),
        jsonb_build_object('code', 'NBC Part 9', 'section', '9.12.1', 'description', 'Excavation general: remove topsoil/organic matter, keep free of standing water, protect from freezing'),
        jsonb_build_object('code', 'NBC Part 9', 'section', '9.12.2.2', 'description', 'Minimum foundation depth based on frost index, soil type, and heating status'),
        jsonb_build_object('code', 'NBC Part 9', 'section', '9.12.3', 'description', 'Backfill: grade 1.5-2m away from foundation, no boulders >250mm within 600mm, brace walls before backfill')
      )
    ),
    NOW()
  )
  RETURNING id AS compliance_id
),
sequence_insert AS (
  INSERT INTO public.execution_sequences (
    id, trade_type, name, description, region, source, is_public, is_verified, created_by_id, created_at
  ) VALUES (
    gen_random_uuid(),
    'EX',
    'Excavation and Foundation Layout',
    'Site clearing, foundation excavation, and precise layout with batter boards for accurate footings and foundation positioning',
    'ON',
    'platform_template',
    TRUE,
    TRUE,
    NULL,
    NOW()
  )
  RETURNING id AS sequence_id
),
steps_insert AS (
  INSERT INTO public.sequence_steps (
    sequence_id, step_number, title, description, plain_language_summary, requires_inspection, requires_permit, is_milestone, triggers_payment, code_reference, authority_body, quality_criteria, skip_risk_description, created_at
  ) VALUES
  ((SELECT sequence_id FROM sequence_insert), 1, 'Locate Underground Utilities', 'Call Ontario One-Call service (1-800-400-2255) to locate all underground utilities including gas, hydro, water, sewer, and telecommunications.', 'Call before you dig. Utility companies will mark where gas, electric, water, and sewer lines are buried so you don''t hit them.', FALSE, TRUE, FALSE, FALSE, 'OBC 5.10.2', 'Ontario One-Call', 'All utilities marked with paint/flags; location photos taken; clearances confirmed', 'Hitting utilities causes explosions, electrocution, service disruption, and massive fines', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 2, 'Determine Dwelling Position (Survey)', 'Use survey stakes to accurately position the dwelling on the lot according to approved plans, respecting all setbacks and regulations.', 'Confirm exactly where the house will sit on your lot using the survey marks. Make sure it''s far enough from property lines and easements.', FALSE, FALSE, FALSE, FALSE, 'OBC 1.2.1', 'Professional Land Surveyor', 'Dwelling position confirmed with survey; all setbacks verified; documented with photos', 'Wrong positioning requires expensive relocation or demolition', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 3, 'Mark Area to be Cleared (Trees Saved with Red Tape)', 'Clearly mark area to be cleared with white paint or flags. Mark trees to be saved with red tape or paint to protect from heavy equipment.', 'Mark where to clear with white paint. Use red tape to protect any trees you want to keep so equipment operators don''t damage them.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Cleared area marked; protected trees clearly identified; heavy equipment operators briefed', 'Unmarked trees get damaged; unmarked areas get over-cleared causing regrading costs', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 4, 'Mark Curb Cut Location', 'Mark the location of the driveway curb cut and apron on the street/sidewalk. Coordinate with municipal works department if required.', 'Mark where the driveway will meet the street. Get approval from the city if you''re cutting into a public street or sidewalk.', FALSE, TRUE, FALSE, FALSE, 'OBC 4.1.3', 'Municipal Public Works Department', 'Curb cut location approved and marked; measurements documented', 'Incorrect curb cut location violates municipal regulations and may require repair', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 5, 'Take Pre-Construction Site Photos', 'Document the site conditions before any work begins with dated photos showing current state of lot, neighbors, vegetation, and surrounding area.', 'Take pictures of the lot before work starts. This documents the original condition for comparison later and protects you if there are disputes.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Photos timestamped and dated; multiple angles showing lot condition and surroundings', 'Pre-construction photos prevent disputes about pre-existing damage', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 6, 'Clear Site Area', 'Remove all debris, vegetation, rocks, and hazardous materials from construction area. Leave protected trees untouched. Dispose of waste appropriately.', 'Clear the lot of trees, brush, rocks, and junk. Be careful not to damage protected trees. Haul away or chip all waste.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Site cleared to bare ground; protected areas undamaged; debris removed and disposed', 'Incomplete clearing leads to debris in footings and foundation issues', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 7, 'Excavate Trash Pit (if allowed)', 'If permitted by local regulations, dig trash pit for on-site disposal of non-hazardous construction waste. Confirm authorization.', 'If allowed by the city, dig a pit on your lot to bury non-hazardous construction waste. Confirm you can do this before digging.', FALSE, TRUE, FALSE, FALSE, 'OBC 4.2.1', 'Municipal Environmental Services', 'Pit location approved; hazardous materials excluded; pit dimensions documented', 'Illegal waste disposal results in environmental fines and remediation costs', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 8, 'Inspect Cleared Site', 'Arrange municipal building inspector to verify site is properly cleared and ready for excavation. Get sign-off on photos.', 'Have the building inspector come see that the lot is cleared properly and ready for digging. Get written approval.', TRUE, FALSE, FALSE, FALSE, 'OBC 4.1.2', 'Municipal Building Inspector', 'Inspector approval documented; sign-off on site condition report; photos attached', 'Proceeding without inspection approval can result in stop-work orders', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 9, 'Stake Out Foundation Area', 'Drive wooden stakes at corners of foundation area according to survey marks and approved plans. Mark with bright tape.', 'Drive stakes at the corners of where the foundation will go. Use the survey marks as your guide. Mark them so they''re easy to see.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Stakes driven at all corners; measurements verified; markers clearly visible', 'Incorrect staking leads to misaligned foundation and structural problems', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 10, 'Excavate Foundation/Basement Area', 'Remove soil from foundation footprint to required depth plus 2 feet for working room. Compact subsoil. Do not undermine utilities. Excavation must reach undisturbed soil per NBC §9.12.2.1 and extend below frost line per NBC Table 9.12.2.2 for unheated spaces.', 'Dig the foundation hole to the depth shown on the plans, plus extra room to work. Don''t disturb utility lines. The hole must reach solid undisturbed soil below the frost line.', FALSE, FALSE, TRUE, FALSE, 'NBC 9.12.2', 'Ontario Building Code', 'Excavation to undisturbed soil; depth below frost line per NBC Table 9.12.2.2; free of standing water (§9.12.1.2); protected from freezing (§9.12.1.3); subsoil compacted', 'Over-excavation wastes money; under-excavation means code violation; frozen/wet subsoil fails under load', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 11, 'Inspect Site and Excavated Area', 'Arrange building inspector to verify excavation depth, slope for drainage, absence of utilities, and subsoil condition.', 'Have the inspector check that the hole is dug to the right depth and that you haven''t hit any utilities. Get written approval.', TRUE, FALSE, FALSE, FALSE, 'OBC 5.10', 'Municipal Building Inspector', 'Excavation dimensions verified; depth confirmed per plans; inspection report filed', 'Proceeding with inadequate excavation requires costly rework', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 12, 'Layout Corners with Batter Boards (3-4-5 Triangle)', 'Set batter board frames at each corner using 2x4 lumber. Use 3-4-5 right triangle method to ensure perfect 90-degree corners.', 'Build wooden frames (batter boards) at each corner. Use the 3-4-5 triangle trick to get perfect right angles.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Batter boards level and square; 3-4-5 triangle verified; corners 90 degrees ± 1/8 inch', 'Out-of-square corners cause racking, alignment problems, and code violations', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 13, 'Drive Batter Board Stakes', 'Drive stakes deeply (minimum 2 feet) into ground on outside of batter boards. Use 2x4 stakes, triple-nailed for rigidity.', 'Drive sturdy stakes deep into the ground to hold the batter boards in place so they don''t move during the next steps.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Stakes driven 2+ feet; no movement when pushed; nails secure; frames rigid', 'Loose batter boards shift, ruining all subsequent measurements', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 14, 'Pull Strings Between Batter Boards', 'Stretch string lines between batter boards to mark the exact edges of the foundation. Use nails or notches to secure strings precisely.', 'Tie string between the batter boards to show exactly where the foundation edges will be. Use the strings as a guide.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Strings taut and level; positions marked clearly; transit checked alignment', 'Sagging or misaligned strings throw off all foundation dimensions', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 15, 'Re-Check All Measurements and Diagonals', 'Verify foundation dimensions with tape measure. Check diagonals—they must be equal to confirm square geometry. Use transit for level verification.', 'Measure everything. Check diagonals to make sure it''s square. If the diagonals are equal, your corners are 90 degrees.', FALSE, FALSE, TRUE, FALSE, 'OBC 5.10.1', 'Professional Land Surveyor', 'All dimensions verified; diagonals equal ± 1/8 inch; transit checks passed; documented', 'Measurement errors at this stage compound through entire structure', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 16, 'Layout Inside Corners and Remaining Batter Boards', 'Set interior batter boards for basement wall, pier, or interior footing locations according to blueprints and string measurements.', 'Set up more batter boards for interior walls, columns, and other foundation features. Use strings to show their exact positions.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Interior positions marked; strings aligned with exterior; measurements cross-verified', 'Incorrect interior layout causes misaligned walls and structural weakness', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 17, 'Apply Crusher Run to Driveway', 'Spread and compact 4-6 inches of crusher run (compacted stone) in driveway area for drainage and base preparation.', 'Spread crushed stone in the driveway area and pack it down. This provides a base and helps with water drainage.', FALSE, FALSE, FALSE, FALSE, 'OBC 4.1.2', 'Ontario Building Code', 'Crusher run 4-6 inches thick; compacted to 95% density; level, no settlement', 'Poor base causes premature driveway cracking and drainage problems', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 18, 'Set Up Silt Fence', 'Install silt fence around disturbed areas to prevent soil erosion and sediment runoff into storm drains or adjacent properties.', 'Install silt fence around the construction area to stop dirt from washing away. This prevents erosion and runoff problems.', FALSE, TRUE, FALSE, FALSE, 'OBC 4.2.2', 'Municipal Environmental Services', 'Silt fence installed 6+ inches deep; securely staked; no gaps; drainage verified', 'Missing silt fence violates environmental regulations and causes neighbor complaints', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 19, 'Backfill Foundation (after framing)', 'After foundation and framing work complete, backfill excavated area around foundation with compacted soil and gravel. Per NBC §9.12.3: floor must provide lateral support before backfill, or temporary bracing installed. No boulders >250mm within 600mm of foundation. Grade to slope away 1.5-2m from building.', 'After the foundation is done, fill the hole back in around the foundation. Make sure the floor is in place first (or brace the walls). Slope it away from the house so water drains properly.', FALSE, FALSE, FALSE, FALSE, 'NBC 9.12.3', 'Ontario Building Code', 'Floor lateral support in place or temp bracing installed (§9.12.3.1); no boulders >250mm within 600mm (§9.12.3.3); backfill free of deleterious debris; compacted in 12-inch lifts; initial slope 50-100mm over 1.5-2m away from foundation (§9.12.3.2)', 'Poor backfill causes settlement, foundation cracking, and water intrusion; backfilling without lateral support can collapse foundation walls', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 20, 'Perform Final Grade', 'Grade and slope all final grades away from structure minimum 2 percent slope for minimum 10 feet. Remove all debris and level ruts.', 'Finish grading the lot so water runs away from the house. Make sure there are no low spots where water can collect.', FALSE, FALSE, TRUE, TRUE, 'OBC 4.1.2', 'Ontario Building Code', 'Final grade sloped 2% minimum for 10 feet; no settlement; drainage verified; clean', 'Poor final grading causes water pooling, basement moisture, and foundation damage', NOW())
)
SELECT 1;

-- ============================================================================
-- 3. PEST CONTROL (PS) - 4 construction steps
-- ============================================================================

WITH compliance_insert AS (
  INSERT INTO public.compliance_rulesets (
    id, trade_type, region, name, rules, created_at
  ) VALUES (
    gen_random_uuid(),
    'PS',
    'ON',
    'Pest Control Compliance (Ontario)',
    jsonb_build_object(
      'required_permits', jsonb_build_array(
        jsonb_build_object('type', 'pest_control_license', 'description', 'Licensed pest control applicator required', 'issuing_body', 'Ontario Pesticide Education Program')
      ),
      'required_inspections', jsonb_build_array(
        jsonb_build_object('type', 'pest_control_coverage', 'stage', 'post_treatment', 'description', 'Pest control coverage inspection and warranty', 'authority', 'Licensed Pest Control Professional')
      ),
      'code_references', jsonb_build_array(
        jsonb_build_object('code', 'OBC', 'section', '9.25.2', 'description', 'Pest control and termite prevention')
      )
    ),
    NOW()
  )
  RETURNING id AS compliance_id
),
sequence_insert AS (
  INSERT INTO public.execution_sequences (
    id, trade_type, name, description, region, source, is_public, is_verified, created_by_id, created_at
  ) VALUES (
    gen_random_uuid(),
    'PS',
    'Pest Control Pre-Treatment',
    'Professional pest control treatment to prevent termites, carpenter ants, and other wood-damaging insects in foundation and crawl spaces',
    'ON',
    'platform_template',
    TRUE,
    TRUE,
    NULL,
    NOW()
  )
  RETURNING id AS sequence_id
),
steps_insert AS (
  INSERT INTO public.sequence_steps (
    sequence_id, step_number, title, description, plain_language_summary, requires_inspection, requires_permit, is_milestone, triggers_payment, code_reference, authority_body, quality_criteria, skip_risk_description, created_at
  ) VALUES
  ((SELECT sequence_id FROM sequence_insert), 1, 'Apply Pre-Treatment Poison to Footing and Slab Ground', 'Apply approved termiticide/pesticide by licensed professional to soil beneath footing and slab. Follow manufacturer label instructions and Ontario regulations.', 'Have a licensed pest control company spray poison in the soil under the footing and slab to kill termites and carpenter ants before they can establish colonies.', FALSE, TRUE, FALSE, FALSE, 'OBC 9.25.2', 'Licensed Pest Control Professional', 'Treatment applied by licensed applicator; label instructions followed; coverage documented; receipt filed', 'Without pre-treatment, termites can cause structural damage worth tens of thousands', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 2, 'Apply Poison to Ground-Level Perimeter', 'Apply termiticide barrier around the exterior perimeter of foundation at ground level. Create continuous chemical barrier to prevent pest entry.', 'Apply poison around the outside of the foundation to create a barrier that stops termites and other pests from entering the house.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.25.2', 'Licensed Pest Control Professional', 'Continuous perimeter barrier applied; treatment width 6-12 inches; documented with photos', 'Gaps in perimeter barrier allow termite entry and hidden infestation', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 3, 'Obtain Signed Pest Control Warranty', 'Request and file signed warranty certificate from pest control provider covering treatment duration (typically 5 years) and renewal options.', 'Get a warranty document from the pest control company. It should cover the treatment for at least 5 years and be transferable with the house.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Warranty certificate signed and dated; coverage period clearly stated; transferable to future owner', 'Missing warranty means you have no recourse if pest damage occurs', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 4, 'Inspect Pest Control Coverage', 'Arrange inspector visit to verify complete and continuous pest control treatment. Obtain written inspection report and sign-off.', 'Have the pest control company inspect their own work to make sure they covered everything. Get a written report and approval.', TRUE, FALSE, TRUE, TRUE, 'OBC 9.25.2', 'Licensed Pest Control Professional', 'Inspection report filed; complete coverage verified; no gaps noted; warranty active', 'Incomplete coverage will allow pest entry and infestation in future', NOW())
)
SELECT 1;

-- ============================================================================
-- 4. CONCRETE - FOOTINGS (CN footings) - 10 steps
-- ============================================================================

WITH compliance_insert AS (
  INSERT INTO public.compliance_rulesets (
    id, trade_type, region, name, rules, created_at
  ) VALUES (
    gen_random_uuid(),
    'CN',
    'ON',
    'Concrete and Foundation Compliance (Ontario)',
    jsonb_build_object(
      'required_permits', jsonb_build_array(
        jsonb_build_object('type', 'concrete_pour_permit', 'description', 'Building permit covers concrete work', 'issuing_body', 'Municipal Building Department')
      ),
      'required_inspections', jsonb_build_array(
        jsonb_build_object('type', 'footing_inspection', 'stage', 'before_pour', 'description', 'Footing forms inspection before concrete pour', 'authority', 'Municipal Building Inspector'),
        jsonb_build_object('type', 'footing_post_pour', 'stage', 'after_pour', 'description', 'Footing inspection after concrete cure', 'authority', 'Municipal Building Inspector')
      ),
      'code_references', jsonb_build_array(
        jsonb_build_object('code', 'OBC', 'section', '5.10.2', 'description', 'Footings below frost line and minimum dimensions'),
        jsonb_build_object('code', 'OBC', 'section', '5.10.3', 'description', 'Footing drain requirements'),
        jsonb_build_object('code', 'NBC Part 9', 'section', '9.15.3.4', 'description', 'Minimum footing widths/areas by storey count; soil must have ≥75 kPa bearing capacity'),
        jsonb_build_object('code', 'NBC Part 9', 'section', '9.15.3.8', 'description', 'Footing thickness: projection ≤ thickness, minimum 100mm; unreinforced footings fail at 45° shear'),
        jsonb_build_object('code', 'NBC Part 9', 'section', '9.15.1.1', 'description', 'Application limits: max 4.9m joist span for prescriptive tables; beyond requires Part 4 design')
      )
    ),
    NOW()
  )
  RETURNING id AS compliance_id
),
sequence_insert AS (
  INSERT INTO public.execution_sequences (
    id, trade_type, name, description, region, source, is_public, is_verified, created_by_id, created_at
  ) VALUES (
    gen_random_uuid(),
    'CN',
    'Concrete Footings',
    'Foundation footing construction including forms, inspection, concrete pour, and finishing for load-bearing requirements below frost line',
    'ON',
    'platform_template',
    TRUE,
    TRUE,
    NULL,
    NOW()
  )
  RETURNING id AS sequence_id
),
steps_insert AS (
  INSERT INTO public.sequence_steps (
    sequence_id, step_number, title, description, plain_language_summary, requires_inspection, requires_permit, is_milestone, triggers_payment, code_reference, authority_body, quality_criteria, skip_risk_description, created_at
  ) VALUES
  ((SELECT sequence_id FROM sequence_insert), 1, 'Inspect Batter Boards with Transit', 'Use surveyor''s transit to verify batter board positions are level and precisely positioned. Check that string lines are taut and properly positioned.', 'Use a surveying tool to confirm the batter boards are perfectly level and in the right spot. This is the foundation for everything else.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Batter boards level to ±1/8 inch; transit verification documented with photos', 'Unlevel batter boards throw off all footing measurements and alignment', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 2, 'Dig Footings for Foundation and Support Columns', 'Excavate footing trenches to proper depth (below frost line per OBC), width, and dimensions specified on blueprints. Use string lines as guides.', 'Dig the trenches where the footings will go. They must go below the frost line so frost heave doesn''t lift them. Go exactly to the depth on the plans.', FALSE, FALSE, FALSE, FALSE, 'OBC 5.10.2', 'Ontario Building Code', 'Footing depth 4+ feet (below frost line); trenches straight and plumb; no soil displacement', 'Shallow footings fail when frost heave pushes from below', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 3, 'Set Footing Forms', 'Build wooden forms for footings using 2x lumber, level and secure. Forms define the shape and height of concrete footings.', 'Build wooden frames in the trenches to shape the concrete footings. Make sure they''re level and won''t move when concrete is poured.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Forms level to ±1/8 inch; braced to prevent movement; nails or bolts secure', 'Shifting forms cause uneven footings and uneven foundation', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 4, 'Inspect Footing Forms (sturdy, level, parallel, oiled)', 'Arrange building inspector to verify footing forms are sturdy, level, properly braced, and oiled or coated to prevent concrete adhesion.', 'Have the building inspector check that the forms are sturdy, level, properly braced, and ready for concrete. Get written approval.', TRUE, FALSE, FALSE, FALSE, 'OBC 5.10.2', 'Municipal Building Inspector', 'Forms verified level; bracing adequate; oil/release agent applied; inspection report filed', 'Proceeding without inspection approval violates building code', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 5, 'Schedule and Complete Footing Inspection (building inspector sign-off)', 'Confirm building inspector availability and conduct formal footing inspection. Document sign-off in writing with photo evidence.', 'Schedule the inspector to officially approve the forms before you pour concrete. Get them to sign off on the inspection report.', TRUE, FALSE, TRUE, FALSE, 'OBC 5.10.2', 'Municipal Building Inspector', 'Formal inspection completed; inspector signature on report; approval documented with photos', 'Missing formal inspection approval can result in stop-work order', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 6, 'Pour Footings (quickly, before soil softens)', 'Order concrete and pour footings in one continuous pour. Do not allow concrete to partially set between loads. Work quickly to avoid soil weakening.', 'Order concrete and pour it all in one go while the ground is still firm. Don''t pause and let concrete harden partially—pour all at once.', FALSE, FALSE, FALSE, FALSE, 'OBC 5.10.2', 'Ontario Building Code', 'Concrete poured in single pour; continuous stream; no cold joints; slump tested', 'Partial pours create weak cold joints that fail under load', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 7, 'Install Key Forms Before Concrete Sets', 'Insert key forms (if specified) into footings before concrete hardens to create mechanical bond for foundation walls.', 'Before the concrete fully hardens, insert key forms if the plans call for them. These create a mechanical lock for the walls above.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Key forms properly inserted; centered; protruding correct depth; concrete still workable', 'Missing keys create weak interface between footings and walls', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 8, 'Finish Footings (screed and smooth)', 'Screed concrete level with top of forms using a straight 2x4. Smooth surface for consistent wall bearing.', 'Scrape the concrete level with the top of the forms using a straight board. Make the top smooth so the walls sit evenly.', FALSE, FALSE, FALSE, FALSE, 'OBC 5.10.3', 'Ontario Building Code', 'Top screeded level to ±1/4 inch; surface smooth; no voids or honeycombing', 'Uneven footings cause settlement and cracking', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 9, 'Remove Footing Forms', 'After concrete has cured (typically 3-7 days), carefully remove wooden forms. Check for adequate concrete strength before removal.', 'After the concrete hardens (usually a week), carefully remove the wooden forms. Be careful not to damage the concrete.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Forms removed without damage; concrete strength verified; no spalling or chipping', 'Premature form removal causes concrete collapse; late removal wastes time', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 10, 'Inspect Footings (level, no cracks)', 'Arrange building inspector to verify footings are level, properly dimensioned, and free of significant cracks or structural defects.', 'Have the inspector check that the footings are level, the right size, and don''t have cracks. Get official approval before proceeding.', TRUE, FALSE, TRUE, TRUE, 'OBC 5.10.3', 'Municipal Building Inspector', 'Footings level to ±1/2 inch over 10 feet; no major cracks; proper dimensions verified; inspection signed off', 'Cracked or uneven footings fail structurally and cause cascading problems', NOW())
)
SELECT 1;

-- ============================================================================
-- 5. CONCRETE - POURED WALLS (CN walls) - 7 steps
-- ============================================================================

-- Reusing CN compliance ruleset from footings
WITH sequence_insert AS (
  INSERT INTO public.execution_sequences (
    id, trade_type, name, description, region, source, is_public, is_verified, created_by_id, created_at
  ) VALUES (
    gen_random_uuid(),
    'CN',
    'Concrete Poured Foundation Walls',
    'Poured concrete foundation walls with forms, reinforcement, continuous pour, and finishing for waterproofing and structural integrity',
    'ON',
    'platform_template',
    TRUE,
    TRUE,
    NULL,
    NOW()
  )
  RETURNING id AS sequence_id
),
steps_insert AS (
  INSERT INTO public.sequence_steps (
    sequence_id, step_number, title, description, plain_language_summary, requires_inspection, requires_permit, is_milestone, triggers_payment, code_reference, authority_body, quality_criteria, skip_risk_description, created_at
  ) VALUES
  ((SELECT sequence_id FROM sequence_insert), 1, 'Set Poured Wall Foundation Forms (steel/metal ties)', 'Erect wall forms using plywood or 2x lumber with steel ties and bracing to contain concrete. Forms must be straight, plumb, and rigidly braced.', 'Build wooden wall forms that will hold the concrete while it hardens. Use steel ties and braces so the forms don''t bow out when the concrete is poured.', FALSE, FALSE, FALSE, FALSE, 'OBC 5.10.4', 'Ontario Building Code', 'Forms plumb to ±1/8 inch per 10 feet; steel ties properly spaced; diagonal bracing secure', 'Loose forms create bowed walls and concrete spalling', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 2, 'Inspect Poured Foundation Wall Forms (level, parallel, sturdy, oiled)', 'Arrange building inspector to verify forms are plumb, parallel, properly braced, sealed, and coated with release agent.', 'Have the inspector check that the forms are perfectly plumb, parallel, sturdy, and ready for the wet concrete. Get written approval.', TRUE, FALSE, FALSE, FALSE, 'OBC 5.10.4', 'Municipal Building Inspector', 'Forms plumb ±1/8 inch per 10 feet; parallel within 1/4 inch; oil applied; bracing verified', 'Proceeding without inspection risks form failure and concrete defects', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 3, 'Pour Foundation Walls (continuous pour, no setting between loads)', 'Order concrete and pour walls in single continuous pour from bottom to top. Do not stop mid-pour or allow concrete to partially set.', 'Order concrete and pour the walls all in one continuous stream from bottom to top. Don''t pause—the concrete must stay workable.', FALSE, FALSE, FALSE, FALSE, 'OBC 5.10.4', 'Ontario Building Code', 'Continuous pour without pause; concrete temperature 50-85°F; slump tested and verified', 'Cold joints from partial pours create weak planes and failure points', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 4, 'Finish Poured Walls (smooth, set lag bolts)', 'Strike off excess concrete, smooth walls, and install anchor bolts in top of walls per specifications while concrete is still workable.', 'Smooth the walls as the concrete hardens. Install anchor bolts in the top of the walls while the concrete is still soft.', FALSE, FALSE, FALSE, FALSE, 'OBC 5.10.5', 'Ontario Building Code', 'Surface smooth; no major voids; bolts set properly spaced and plumb; height verified', 'Rough walls are difficult to waterproof; misplaced bolts prevent proper sill attachment', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 5, 'Remove Foundation Wall Forms (several days after pour)', 'After concrete has cured (typically 5-7 days), carefully remove side forms. Do not use nails or tools that damage concrete surface.', 'After the concrete hardens (usually a week), carefully strip away the wooden wall forms without damaging the concrete.', FALSE, FALSE, FALSE, FALSE, 'OBC 5.10.5', 'Ontario Building Code', 'Forms removed without spalling or damage; concrete strength verified before removal; surface inspected', 'Premature removal causes collapse; pry marks damage waterproofing surface', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 6, 'Inspect Poured Walls (square, level, no cracks)', 'Arrange building inspector to verify walls are plumb, square, no major cracks, proper thickness, and ready for waterproofing.', 'Have the inspector verify the walls are plumb, square, properly thick, and don''t have bad cracks. Get official sign-off.', TRUE, FALSE, TRUE, FALSE, 'OBC 5.10.5', 'Municipal Building Inspector', 'Walls plumb to ±1/4 inch per 10 feet; square to ±1/2 inch; no major cracks; proper thickness verified', 'Out-of-plumb walls cause racking above and water intrusion', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 7, 'Break Off Tie Ends', 'Break off exposed concrete tie rod ends flush with the wall surface. Smooth any protruding concrete. Patch holes with concrete grout.', 'Break off the tie rods sticking out of the wall flush with the surface. Smooth it down and fill the holes so water can''t get in.', FALSE, FALSE, TRUE, TRUE, 'OBC 5.10.5', 'Ontario Building Code', 'Tie ends broken flush; surface smooth; holes patched with hydraulic cement; smooth finish', 'Protruding tie ends trap water and promote rust staining and deterioration', NOW())
)
SELECT 1;

-- ============================================================================
-- 6. CONCRETE - BLOCK WALLS (CN block) - 5 steps
-- ============================================================================

WITH sequence_insert AS (
  INSERT INTO public.execution_sequences (
    id, trade_type, name, description, region, source, is_public, is_verified, created_by_id, created_at
  ) VALUES (
    gen_random_uuid(),
    'CN',
    'Concrete Block Foundation Walls',
    'Concrete block foundation construction including block laying, mortar finishing, and inspection against blueprints for structural soundness',
    'ON',
    'platform_template',
    TRUE,
    TRUE,
    NULL,
    NOW()
  )
  RETURNING id AS sequence_id
),
steps_insert AS (
  INSERT INTO public.sequence_steps (
    sequence_id, step_number, title, description, plain_language_summary, requires_inspection, requires_permit, is_milestone, triggers_payment, code_reference, authority_body, quality_criteria, skip_risk_description, created_at
  ) VALUES
  ((SELECT sequence_id FROM sequence_insert), 1, 'Order and Stage Concrete Blocks', 'Order concrete blocks to specification and delivery schedule. Stage blocks and materials at site with adequate working space nearby.', 'Order the right number of concrete blocks and have them delivered. Stack them near where you''ll be working for easy access.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Blocks delivered to spec; staged with 10-foot working access; inventory verified against bill', 'Wrong blocks or improper staging delays work and increases cost', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 2, 'Lay Concrete Blocks (compare against blueprints)', 'Lay blocks in mortar following blueprints for position, height, and window/door openings. Ensure proper mortar joint thickness (10 mm nominal).', 'Lay the concrete blocks in mortar, checking constantly against the blueprints. Keep mortar joints even and properly filled.', FALSE, FALSE, FALSE, FALSE, 'OBC 5.10.6', 'Ontario Building Code', 'Blocks plumb and level; mortar joints 10 mm ±2 mm; pattern matches blueprints; no missing blocks', 'Misaligned or missing blocks cause structural weakness and water intrusion', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 3, 'Finish Blocks (tool joints, stucco if exposed)', 'Tool mortar joints to compress and remove voids. Apply stucco coating if blocks are exposed to weather (exterior of block walls).', 'Finish the mortar joints between blocks so they don''t trap water. If the blocks are exposed, coat them with stucco for waterproofing.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.20.1', 'Ontario Building Code', 'Joints tooled concave; no voids; stucco applied at 2+ coats if specified; waterproof seal intact', 'Poor mortar finishing allows water infiltration and block deterioration', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 4, 'Inspect Block Work Against Blueprints', 'Arrange building inspector to verify block wall is built to blueprints, proper dimensions, plumb, level, and mortar quality acceptable.', 'Have the building inspector verify the block wall matches the blueprints and is properly built. Get written approval.', TRUE, FALSE, TRUE, FALSE, 'OBC 5.10.6', 'Municipal Building Inspector', 'Dimensions verified; plumb and level checked; mortar joints approved; blueprint compliance confirmed', 'Proceeding without inspection approval violates building code', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 5, 'Clean Up Excess Blocks and Materials', 'Remove excess blocks, mortar, and construction debris from site. Return unused materials. Leave site clean for next trade.', 'Clean up leftover blocks, mortar, and garbage. Remove everything to leave a clean work site for the next tradespeople.', FALSE, FALSE, TRUE, TRUE, NULL, NULL, 'All excess materials removed; mortar drippings cleaned; debris haul-away complete; site swept', 'Excess material tripping hazard; attracts pests; causes delays for next trades', NOW())
)
SELECT 1;

-- ============================================================================
-- 7. CONCRETE - SLAB (CN slab) - 11 steps
-- ============================================================================

WITH sequence_insert AS (
  INSERT INTO public.execution_sequences (
    id, trade_type, name, description, region, source, is_public, is_verified, created_by_id, created_at
  ) VALUES (
    gen_random_uuid(),
    'CN',
    'Concrete Slabs (basement, stoop, garage)',
    'Slab-on-grade construction including base preparation, plumbing stub-out, reinforcement, pour, and finishing for durability and drainage',
    'ON',
    'platform_template',
    TRUE,
    TRUE,
    NULL,
    NOW()
  )
  RETURNING id AS sequence_id
),
steps_insert AS (
  INSERT INTO public.sequence_steps (
    sequence_id, step_number, title, description, plain_language_summary, requires_inspection, requires_permit, is_milestone, triggers_payment, code_reference, authority_body, quality_criteria, skip_risk_description, created_at
  ) VALUES
  ((SELECT sequence_id FROM sequence_insert), 1, 'Set Slab Forms (basement, stoop, fireplace pad, garage)', 'Erect wooden or metal forms around the perimeter of slab areas. Forms must be level, secure, and positioned to create proper slab edges.', 'Build forms around the edge of where the slab will go. Make sure they''re level so the concrete pours evenly and doesn''t slump in one direction.', FALSE, FALSE, FALSE, FALSE, 'OBC 5.11.1', 'Ontario Building Code', 'Forms level to ±1/4 inch; securely braced; positioned to blueprint dimensions; edges square', 'Unlevel forms cause sloped slabs with poor drainage and standing water', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 2, 'Pack Slab Sub-Soil (moisten and power tamp)', 'Compact subgrade soil under slab area using power tamper. Pre-moisten soil for optimal compaction to 95% standard density.', 'Compress the soil under the slab using a power tamper. Water it first so it compacts better. This prevents settling later.', FALSE, FALSE, FALSE, FALSE, 'OBC 5.11.1', 'Ontario Building Code', 'Soil compacted to 95% standard proctor density; even compaction across slab area; no soft spots', 'Poor subgrade compaction causes slab settlement and cracking', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 3, 'Install Stub Plumbing Under Slab', 'Run all necessary plumbing stub lines and drains under slab before concrete pour. Secure pipes to prevent movement during pour. Cap off endpoints.', 'Run the water lines, drains, and other plumbing pipes under the slab before pouring concrete. Secure them so they don''t move.', FALSE, FALSE, FALSE, FALSE, 'OBC 7.3.1', 'Ontario Building Code', 'Pipes secured; positioned per blueprints; ends capped; protected from concrete damage', 'Crushed pipes after pour require expensive slab cutting and rework', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 4, 'Schedule HVAC Sub for Gas Lines Under Slab', 'Coordinate with HVAC subcontractor to install gas lines under slab before pour. Verify routing and pressure test location.', 'Have the HVAC contractor install gas lines under the slab. Coordinate with them to make sure they''re done before you pour concrete.', FALSE, FALSE, FALSE, FALSE, 'OBC 6.1.2', 'Ontario Building Code', 'Gas lines installed and pressure tested before pour; routed per blueprints; ends capped', 'Installing gas after slab pour requires expensive rework and delays', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 5, 'Inspect Plumbing/Gas Against Blueprint', 'Arrange inspector to verify all plumbing and gas lines are installed correctly, at proper depth, and protected from pour damage.', 'Have the building inspector verify that the plumbing and gas are installed correctly and protected before you pour.', TRUE, FALSE, FALSE, FALSE, 'OBC 7.3.1', 'Municipal Building Inspector', 'Plumbing and gas routes verified against blueprints; proper depth confirmed; protection adequate; inspection signed', 'Proceeding without inspection approval violates code and wastes concrete', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 6, 'Pour and Spread Crushed Stone', 'Spread 4 inches of crushed stone or gravel over compacted subgrade. This provides drainage bed and capillary break.', 'Spread crushed stone (4 inches deep) over the packed soil. This creates a drainage layer so water doesn''t get trapped under the slab.', FALSE, FALSE, FALSE, FALSE, 'OBC 5.11.1', 'Ontario Building Code', 'Stone layer 4 inches ±1/2 inch thick; spread evenly; compacted lightly; damp but not saturated', 'Inadequate drainage base causes moisture and mold under slab', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 7, 'Install 6 mil Poly Vapor Barrier', 'Lay ≥0.15mm (6-mil) polyethylene sheet over stone layer per NBC §9.13.2.6 with seams overlapped ≥100mm (4 in.) and sealed. Provides vapor barrier and soil gas barrier. Also serves as air barrier component per §9.25.3.', 'Lay plastic sheeting over the gravel to stop moisture and soil gases from rising up into the slab. Overlap seams and tape them shut.', FALSE, FALSE, FALSE, FALSE, 'NBC 9.13.2.6', 'Ontario Building Code', 'Poly ≥0.15mm (6 mil); seams overlapped ≥100mm; taped sealed; no tears or punctures; serves as soil gas barrier per §9.13.4', 'Missing vapor barrier causes humidity, mold, and allows soil gas (including radon) into living space', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 8, 'Install Radon Rough-In (Subfloor Depressurization)', 'MANDATORY per NBC §9.13.4.2 for all dwellings. Install ≥100mm (4 in.) diameter pipe through slab near centre, opening into granular layer with ≥150mm depth for 300mm radius. Cap pipe with airtight seal. Label clearly for future radon mitigation. Ensure granular layer (≥100mm coarse clean material, ≤10% passing 4mm sieve) under entire slab.', 'Install a capped pipe through the slab for radon protection. This is required by code for all homes. If radon testing later shows a problem, this pipe connects to a fan to pull radon gas from under the slab. Much cheaper to install now (~$200) than to retrofit later (~$3,000+).', FALSE, FALSE, TRUE, FALSE, 'NBC 9.13.4.3', 'Ontario Building Code', 'Pipe ≥100mm diameter; near slab centre; bottom opens into granular layer; granular ≥150mm deep for 300mm radius around pipe (§9.13.4.3); airtight cap installed; clearly labelled "RADON MITIGATION ROUGH-IN"; granular ≤10% passing 4mm sieve under entire slab', 'Radon is the #1 cause of lung cancer after smoking. Omitting rough-in violates NBC §9.13.4.2 and costs $3,000+ to retrofit. Health Canada guideline: 200 Bq/m³', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 9, 'Lay Reinforcing Wire', 'Position reinforcing wire mesh or rebar over vapor barrier per blueprints. Support on chairs or blocks so it sits mid-slab height.', 'Lay steel reinforcement wire or rebar over the plastic. Position it so it ends up in the middle of the concrete thickness.', FALSE, FALSE, FALSE, FALSE, 'OBC 5.11.3', 'Ontario Building Code', 'Reinforcement at mid-depth; spacing per blueprints; properly supported on chairs; no sagging; radon pipe protected from damage', 'Improperly positioned reinforcement reduces structural capacity', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 10, 'Pour Slab and Garage Slab', 'Order concrete and pour basement slab, stoop, and garage slab. Strike off excess, smooth surface, and finish as specified. Protect radon rough-in pipe during pour.', 'Order concrete and pour the slab all in one pour if possible. Spread it evenly and smooth the top surface. Be careful around the radon pipe.', FALSE, FALSE, FALSE, FALSE, 'OBC 5.11.3', 'Ontario Building Code', 'Continuous pour completed; surface screeded level to ±1/4 inch; no major voids; radon pipe intact and sealed to slab air barrier; cured properly', 'Poor pours create weak slabs prone to cracking and settling', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 11, 'Inspect Slab (rough spots, cracks, level, radon rough-in)', 'Arrange building inspector to verify slab is level, properly reinforced, has acceptable surface finish, no major cracks, and radon rough-in is intact and labelled.', 'Have the inspector check that the slab is level, properly reinforced, radon pipe is capped and labelled, and ready for the next phase.', TRUE, FALSE, TRUE, TRUE, 'OBC 5.11.4', 'Municipal Building Inspector', 'Slab level to ±1/2 inch over 10 feet; no major cracks; reinforcement visible; radon pipe capped, sealed, and labelled (§9.13.4.3); approval documented', 'Cracked or unlevel slabs cause structural and drainage problems; missing radon rough-in violates NBC', NOW())
)
SELECT 1;

-- ============================================================================
-- 8. WATERPROOFING (WP) - 9 steps
-- ============================================================================

WITH compliance_insert AS (
  INSERT INTO public.compliance_rulesets (
    id, trade_type, region, name, rules, created_at
  ) VALUES (
    gen_random_uuid(),
    'WP',
    'ON',
    'Waterproofing Compliance (Ontario)',
    jsonb_build_object(
      'required_inspections', jsonb_build_array(
        jsonb_build_object('type', 'waterproofing_coverage', 'stage', 'post_application', 'description', 'Waterproofing seal and drainage inspection', 'authority', 'Municipal Building Inspector')
      ),
      'code_references', jsonb_build_array(
        jsonb_build_object('code', 'OBC', 'section', '5.12', 'description', 'Foundation waterproofing and drainage requirements'),
        jsonb_build_object('code', 'NBC Part 9', 'section', '9.13.2', 'description', 'Dampproofing: required on all below-grade walls/floors; 2 coats asphalt at 1 L/m²; surface prep per §9.13.2.3'),
        jsonb_build_object('code', 'NBC Part 9', 'section', '9.13.3', 'description', 'Waterproofing: required where hydrostatic pressure exists; continuous membrane floor-to-wall; distinct from dampproofing'),
        jsonb_build_object('code', 'NBC Part 9', 'section', '9.13.2.5', 'description', 'Interior moisture barrier: required where finishes touch foundation; permeance limit 170 ng/(Pa·s·m²)'),
        jsonb_build_object('code', 'NBC Part 9', 'section', '9.14.3', 'description', 'Drain tile: ≥100mm diameter; 150mm crushed stone cover; laid level or slight slope; filter fabric recommended')
      ),
      'dampproofing_vs_waterproofing', 'Dampproofing (§9.13.2) controls capillary water/vapour — required on ALL below-grade walls. Waterproofing (§9.13.3) resists hydrostatic pressure — required only where water table is high. Different materials, different cost, different scope.'
    ),
    NOW()
  )
  RETURNING id AS compliance_id
),
sequence_insert AS (
  INSERT INTO public.execution_sequences (
    id, trade_type, name, description, region, source, is_public, is_verified, created_by_id, created_at
  ) VALUES (
    gen_random_uuid(),
    'WP',
    'Foundation Waterproofing and Drainage',
    'Waterproofing basement and foundation walls with sealants, membranes, and installation of drainage tile for moisture protection',
    'ON',
    'platform_template',
    TRUE,
    TRUE,
    NULL,
    NOW()
  )
  RETURNING id AS sequence_id
),
steps_insert AS (
  INSERT INTO public.sequence_steps (
    sequence_id, step_number, title, description, plain_language_summary, requires_inspection, requires_permit, is_milestone, triggers_payment, code_reference, authority_body, quality_criteria, skip_risk_description, created_at
  ) VALUES
  ((SELECT sequence_id FROM sequence_insert), 1, 'Seal Footing and Wall Intersection with Portland Cement', 'Apply portland cement grout to seal the connection between footing and foundation wall. Cove mortar over footing-wall junction per NBC §9.13.2.3 to create smooth surface for dampproofing. This prevents water from entering at the joint.', 'Seal where the wall meets the footing with a strong cement grout. This blocks water from getting in where those two concrete pieces meet.', FALSE, FALSE, FALSE, FALSE, 'NBC 9.13.2.3', 'Ontario Building Code', 'Joint sealed continuously with portland cement; coved over footing junction (§9.13.2.3); no gaps; smooth application; surface clean and dry', 'Open joints at footing/wall interface are primary water entry point; per NBC four moisture sources: surface water, soil moisture, groundwater, construction moisture', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 2, 'Apply First Coat Portland Cement to Masonry Wall (roughen, dry 24h)', 'Apply first coat of waterproof portland cement coating to below-grade masonry. Roughen surface first for adhesion. Allow 24-hour cure.', 'Paint the first coat of waterproofing cement on the foundation wall. Roughen the surface first so it sticks. Let it dry a full day.', FALSE, FALSE, FALSE, FALSE, 'OBC 5.12.1', 'Ontario Building Code', 'First coat applied uniformly; thickness 6-10 mm; surface roughened before application; full 24-hour cure', 'Thin or uneven coats fail to provide waterproofing protection', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 3, 'Apply Second Coat Portland Cement (keep moist 48h)', 'Apply second coat of waterproof cement over first coat. Keep damp for 48 hours to ensure proper cure and hydration.', 'Apply the second coat of waterproofing cement. Keep it moist for two days after applying it so it cures properly and gets strong.', FALSE, FALSE, FALSE, FALSE, 'OBC 5.12.1', 'Ontario Building Code', 'Second coat applied uniformly over first; thickness 6-10 mm; kept moist for 48-hour cure; no cracks', 'Improper cure results in weak waterproofing that fails under water pressure', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 4, 'Apply Waterproofing Compound to Below-Grade Walls', 'Apply liquid waterproofing membrane or coating to all below-grade foundation surfaces per NBC §9.13.2.4. Coverage from finished ground level to top of footing. Cover all cracks, joints, and form-tie holes. For unit masonry: parge with 6mm mortar first (§9.13.2.3).', 'Apply liquid waterproofing compound over the cement coats to create an additional moisture barrier. Cover everything, especially cracks and form-tie holes.', FALSE, FALSE, FALSE, FALSE, 'NBC 9.13.2.4', 'Ontario Building Code', 'Dampproofing from grade to footing top (§9.13.2.4); coverage ≥1 L/m² (§9.13.2.4); form-tie holes sealed with mortar; no bare spots; joints/cracks/penetrations sealed; manufacturer cure time observed', 'Incomplete dampproofing allows capillary water and vapour migration into building; causes finish damage, mould, structural deterioration', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 5, 'Apply 6 mil Poly to Waterproofing Surface While Tacky', 'Lay 6-mil (0.15mm) polyethylene membrane over waterproofing compound while still tacky. Per NBC §9.13.2.6 and §9.13.3.4, waterproofing must be continuous across joints and at junctions between building elements.', 'While the waterproofing is still sticky, lay plastic sheeting over it to create an extra barrier against water. Overlap all seams and tape them.', FALSE, FALSE, FALSE, FALSE, 'NBC 9.13.3.4', 'Ontario Building Code', 'Poly ≥0.15mm (6 mil) per §9.13.2.6; adhered to tacky surface; seams overlapped 150mm (6 in.) and taped; continuous across joints (§9.13.3.4); no wrinkles or gaps; protected during backfill', 'Air gaps in poly membrane allow water bypass of waterproofing layer; non-continuous membrane fails under hydrostatic pressure', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 6, 'Inspect Waterproofing (no holes visible)', 'Arrange building inspector to verify complete waterproofing coverage, no visible holes, cracks, or missed spots. Get formal approval.', 'Have the building inspector check that the waterproofing is complete with no holes or missed spots anywhere. Get written approval.', TRUE, FALSE, TRUE, FALSE, 'OBC 5.12.2', 'Municipal Building Inspector', 'Waterproofing coverage complete; no holes or bare spots visible; poly sealed; inspection report filed', 'Proceeding without waterproofing inspection approval will result in water problems', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 7, 'Install Gravel Bed for Drain Tile (1 inch layer)', 'Lay layer of clean gravel or drainage stone on outside of foundation wall per NBC §9.14.3.3. Granular must contain ≤10% material passing 4mm sieve. Provides drainage bed for perforated drain tile.', 'Put down a layer of gravel on the outside of the foundation. This creates a bed for the drainage pipe and helps water drain away from the wall.', FALSE, FALSE, FALSE, FALSE, 'NBC 9.14.3.3', 'Ontario Building Code', 'Gravel layer clean granular (≤10% passing 4mm sieve per §9.14.4.1); distributed evenly along foundation; extends to drain pipe level', 'Inadequate gravel bed blocks drainage and causes hydrostatic pressure against foundation', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 8, 'Install 4 Inch Perforated Drain Tile Around Perimeter', 'Install ≥100mm (4 in.) perforated PVC or clay drain tile around complete foundation perimeter at footing level per NBC §9.14.3. Cover with ≥150mm crushed stone (§9.14.3.3). Holes face downward. Laid level or slight slope to sump/outlet.', 'Install a 4-inch perforated pipe around the foundation footing. Cover it with at least 6 inches of crushed stone. Position holes facing down to collect groundwater.', FALSE, FALSE, FALSE, FALSE, 'NBC 9.14.3', 'Ontario Building Code', 'Drain pipe ≥100mm (§9.14.3.2); perforations down; ≥150mm crushed stone cover (§9.14.3.3); continuous perimeter; laid level or slight slope; firm base; connected to sump/sewer/dry well (§9.14.5)', 'Reversed or missing drain tile results in water pooling against foundation; undersized pipe floods in heavy rain', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 9, 'Inspect Drain Tile (proper drainage, holes down)', 'Arrange building inspector to verify drain tile is complete, properly sloped, holes face downward, and connected to proper outlet.', 'Have the inspector verify the drain tile is installed correctly with holes facing down and proper slope. Get approval before backfill.', TRUE, FALSE, TRUE, TRUE, 'OBC 5.12.3', 'Municipal Building Inspector', 'Drain tile continuous; holes down; slope 1%+ verified; outlet to daylight or sump approved; inspection signed', 'Poor drainage installation defeats waterproofing and causes wet basements', NOW())
)
SELECT 1;

-- ============================================================================
-- 9. FRAMING (FR) - 25 steps
-- ============================================================================

WITH compliance_insert AS (
  INSERT INTO public.compliance_rulesets (
    id, trade_type, region, name, rules, created_at
  ) VALUES (
    gen_random_uuid(),
    'FR',
    'ON',
    'Framing Compliance (Ontario)',
    jsonb_build_object(
      'required_inspections', jsonb_build_array(
        jsonb_build_object('type', 'framing_plumb_line', 'stage', 'post_framing', 'description', 'Framing plumb and level inspection', 'authority', 'Municipal Building Inspector'),
        jsonb_build_object('type', 'roof_framing', 'stage', 'roof_installation', 'description', 'Roof framing and sheathing inspection', 'authority', 'Municipal Building Inspector'),
        jsonb_build_object('type', 'final_framing', 'stage', 'pre_rough_in', 'description', 'Final framing inspection before MEP rough-in', 'authority', 'Municipal Building Inspector')
      ),
      'code_references', jsonb_build_array(
        jsonb_build_object('code', 'OBC', 'section', '9.8', 'description', 'Wood frame construction requirements'),
        jsonb_build_object('code', 'OBC', 'section', '9.23', 'description', 'Wood roof construction')
      )
    ),
    NOW()
  )
  RETURNING id AS compliance_id
),
sequence_insert AS (
  INSERT INTO public.execution_sequences (
    id, trade_type, name, description, region, source, is_public, is_verified, created_by_id, created_at
  ) VALUES (
    gen_random_uuid(),
    'FR',
    'Wood Frame Construction',
    'Complete structural framing including floor joists, walls, roof assembly, windows, doors, sheathing, and final inspection before utilities',
    'ON',
    'platform_template',
    TRUE,
    TRUE,
    NULL,
    NOW()
  )
  RETURNING id AS sequence_id
),
steps_insert AS (
  INSERT INTO public.sequence_steps (
    sequence_id, step_number, title, description, plain_language_summary, requires_inspection, requires_permit, is_milestone, triggers_payment, code_reference, authority_body, quality_criteria, skip_risk_description, created_at
  ) VALUES
  ((SELECT sequence_id FROM sequence_insert), 1, 'Discuss All Aspects with Framing Crew', 'Meet with lead framing contractor to review blueprints, specifications, sequencing, site conditions, and quality expectations.', 'Talk to the framing crew about the plans, the schedule, and what you expect. Make sure everyone understands the approach.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Meeting documented; blueprints reviewed; questions answered; start date confirmed', 'Poor communication with framing crew leads to errors and rework', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 2, 'Order Special Materials (custom doors, windows, beams)', 'Order non-standard framing materials including custom beams, large window units, pre-hung doors, and specialty hardware with adequate lead time.', 'Order any special materials the framing crew needs—unusual beams, large windows, pre-made doors. Order early so they arrive on time.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Special orders placed with verified lead times; delivery confirmed; specifications documented', 'Late material delivery delays framing work for weeks', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 3, 'Order and Receive Framing Lumber', 'Order framing lumber grade, species, and dimensions per blueprints with delivery schedule. Inspect on arrival for damage and quality.', 'Order all the lumber for framing. Inspect it when it arrives to make sure it''s the right grade and not damaged.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Lumber delivered to spec; graded correctly; inspected for damage and moisture; stored protected', 'Damaged or wrong-grade lumber compromises structural integrity', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 4, 'Install Sill Felt/Caulk', 'Install sill sealer (felt, foam, or rubber) on top of foundation wall. Apply caulk at seams. This prevents air infiltration and insect entry.', 'Put felt or foam seal on top of the foundation wall. This blocks air and bugs from getting in where the sill plate sits.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.25.1', 'Ontario Building Code', 'Sill sealer continuous; caulk sealed at seams; no gaps; soft compression when compressed', 'Missing sill seal allows air infiltration and pest entry', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 5, 'Attach Sill Plate to Lag Bolts', 'Bolt sill plate to foundation wall using anchor bolts (typically 1/2 inch diameter, 6 feet on center). Use lock washers and nuts.', 'Bolt the sill plate (bottom of the wood frame) to the foundation with anchor bolts. Use washers and lock nuts so they don''t come loose.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.8.1', 'Ontario Building Code', 'Sill plate bolted per OBC spacing (6 feet max); lock washers and nuts tight; level and straight', 'Loose sill plate allows movement and causes settling and cracks', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 6, 'Install Support Columns in Basement', 'Install load-bearing columns in basement per blueprints. Use adjustable posts with proper bracing to support beam and upper floors.', 'Install support posts in the basement to hold up the beams and floors above. Position them per the plans and brace them.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.8.2', 'Ontario Building Code', 'Columns positioned per blueprint; footings adequate; tops and bottoms secured; adjustable posts not over-compressed', 'Improper column support causes dangerous sagging', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 7, 'Frame First Floor Joists and Subfloor', 'Install first floor joists over sill plate and beam per blueprint spacing. Add blocking and bridging. Sheath with plywood subfloor.', 'Install the floor joists for the first floor, spacing them as shown on the plans. Add the plywood subfloor on top.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.8.3', 'Ontario Building Code', 'Joists properly spaced per blueprint; adequate bearing on sill/beam; plywood subfloor nailed every 6-8 inches', 'Improper joist spacing or loose subfloor creates squeaky floors and bounce', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 8, 'Position Large Fixtures Before Wall Framing', 'Place large fixtures (bathtubs, stoves, islands) in their framing openings before walls are framed to ensure they fit and determine framing needs.', 'Before you frame the walls, place large fixtures like the bathtub in their spots to make sure they fit and to figure out the framing.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Fixtures positioned; opening dimensions verified; framing adjusted as needed; documented with photos', 'Late fixture discovery requires expensive wall rebuilding', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 9, 'Frame Exterior Walls/Partitions (first floor)', 'Build and erect exterior walls and interior partition walls per blueprint layout. Use proper wall plate, studs (16 on center), top plates, and let-in bracing.', 'Build and raise the exterior walls and interior walls for the first floor. Space the studs properly and brace the walls so they don''t fall over.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.8.2', 'Ontario Building Code', 'Walls plumb and straight; studs 16 inches on center; headers sized for spans; bracing diagonal across studs', 'Out-of-plumb walls cause racking and misaligned openings', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 10, 'Plumb and Line First Floor (critical quality step)', 'Use transit or laser level to verify first floor walls are plumb (vertical) and true (straight). Correct any out-of-plumb conditions before nailing off.', 'Check that the first floor walls are perfectly plumb (vertical) and straight. Use a level or laser. Fix any that are crooked.', FALSE, FALSE, TRUE, FALSE, 'OBC 9.8.2', 'Ontario Building Code', 'Walls plumb to ±1/8 inch per 10 feet; straight within 1/4 inch over 20 feet; documented with photos', 'Out-of-plumb first floor causes cascading problems in upper floors', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 11, 'Frame Second Floor Joists and Subfloor', 'Install second floor joists and subfloor per blueprint. Ensure adequate bearing and proper attachment to walls below.', 'Install the second floor joists and plywood subfloor the same way as the first floor. Make sure they''re level and properly nailed.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.8.3', 'Ontario Building Code', 'Joists properly spaced; adequate bearing; subfloor secured every 6-8 inches; floor level to ±1/8 inch per 10 feet', 'Improper upper floor framing causes movement and cracking in lower floors', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 12, 'Frame Second Floor Walls/Partitions', 'Build and erect second floor exterior and interior walls. Align with first floor walls where appropriate per blueprint.', 'Build the second floor walls aligned over the first floor walls. Make sure they''re properly spaced and braced.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.8.2', 'Ontario Building Code', 'Walls plumb and straight; aligned with lower walls per blueprint; studs 16 inches on center; braced', 'Misaligned upper walls cause structural weakness and drywall problems', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 13, 'Plumb and Line Second Floor', 'Use laser level to verify second floor is plumb and true. Correct out-of-plumb conditions before final attachment.', 'Check that the second floor walls are plumb and straight, just like you did for the first floor. Fix any that aren''t straight.', FALSE, FALSE, TRUE, FALSE, 'OBC 9.8.2', 'Ontario Building Code', 'Walls plumb to ±1/8 inch per 10 feet; straight within 1/4 inch; documented with laser level readings', 'Out-of-plumb second floor compromises roof and upper structural integrity', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 14, 'Install Ceiling Joists', 'Install ceiling joists at top of walls per blueprint spacing. Provide adequate bearing and proper nailing. Tie in to create rafter support base.', 'Install ceiling joists to hold up the ceiling. They also help tie the roof together and prevent the walls from spreading apart.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.8.3', 'Ontario Building Code', 'Joists properly spaced per blueprint; adequate bearing at walls; toe-nailed or bolted for resistance', 'Loose ceiling joists allow wall movement and roof separation', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 15, 'Frame Roof (trusses or stick-built)', 'Install roof structure per blueprint—either prefab roof trusses or stick-built rafters with collar ties and bracing.', 'Install the roof structure. Use pre-made roof trusses or build rafters and tie them together. Make sure they''re level and braced.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.23.1', 'Ontario Building Code', 'Trusses/rafters properly spaced; adequate bearing at walls; collar ties installed; bracing adequate; plumb', 'Improper roof framing causes leaks, sagging, and structural failure', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 16, 'Install Roof Deck (plywood sheathing)', 'Cover roof structure with plywood sheathing per blueprint thickness. Nail or screw according to specifications. This is the substrate for roofing.', 'Cover the roof with plywood. Nail it down properly so it won''t blow off in the wind. This gives the roofer something to nail shingles to.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.23.2', 'Ontario Building Code', 'Plywood thickness per blueprint; nailed 6-8 inches on center; staggered joints; no gaps at seams', 'Loose roof deck allows wind damage and water intrusion', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 17, 'Install Tar Paper (structure "dried in")', 'Cover roof deck with roofing underlayment (tar paper or synthetic) to provide temporary weather protection until shingles installed.', 'Cover the roof deck with tar paper. This is temporary protection from rain while you wait for the roofer to install shingles.', FALSE, FALSE, TRUE, FALSE, 'OBC 9.23.3', 'Ontario Building Code', 'Underlayment installed per manufacturer instructions; overlapped; fastened; no tears', 'Missing underlayment allows water damage during construction', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 18, 'Frame Chimney Chases', 'Build framing for chimney chase (structural opening) per blueprints. Ensure proper clearance from combustible materials.', 'Build the wooden frame for the chimney opening. Make sure it has the right clearances so it''s safe.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.26', 'Ontario Building Code', 'Chase framing sized per blueprint; clearances per code; braced to prevent movement', 'Improper chimney chase causes fires or compromised draft', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 19, 'Install Prefab Fireplaces', 'Install zero-clearance fireplace units if specified. Secure per manufacturer instructions and code requirements for clearances.', 'If the plans call for a prefab fireplace, install it according to the manufacturer''s instructions and building code.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.26.1', 'Ontario Building Code', 'Fireplace installed per manufacturer spec; clearances verified; properly secured; draft test performed', 'Incorrect fireplace installation creates fire hazard', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 20, 'Frame Dormers and Skylights', 'Install framing for dormer structures and skylight openings per blueprints. Ensure proper flashing provisions in framing.', 'Build the frames for dormers and skylights. Make sure the framing is ready for the roofer to install flashing.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.23.4', 'Ontario Building Code', 'Dormer/skylight framing per blueprint; headers adequate for opening; bracing; flashing prep complete', 'Poor dormer/skylight framing causes expensive leak problems', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 21, 'Install Sheathing on Exterior Walls', 'Cover exterior walls with plywood or OSB sheathing per blueprint thickness and nailing pattern. This provides structural bracing and substrate for weatherproofing.', 'Cover the outside of the walls with plywood. This braces the structure and gives the house shape. The exterior wrap goes on top of this.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.8.4', 'Ontario Building Code', 'Sheathing installed per blueprint thickness; nailed 6-8 inches on center; staggered joints; no gaps', 'Loose or missing sheathing allows racking and water damage', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 22, 'Inspect Sheathing (no punctures/gaps)', 'Arrange building inspector to verify all sheathing is installed, no punctures or gaps, and properly fastened per code.', 'Have the building inspector check that the sheathing is all there with no holes or gaps, and that it''s properly nailed.', TRUE, FALSE, FALSE, FALSE, 'OBC 9.8.4', 'Municipal Building Inspector', 'Sheathing complete; no punctures or gaps; fastening verified; inspection report filed', 'Proceeding with damaged sheathing allows water and pest intrusion', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 23, 'Install Exterior Windows and Doors', 'Install all exterior windows and exterior doors per manufacturer instructions. Ensure proper flashing and sealing around openings.', 'Install the windows and exterior doors. Seal them properly so wind and water don''t get in around them.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.7.2', 'Ontario Building Code', 'Windows/doors installed per manufacturer spec; flashing in place; caulked and sealed; operation verified', 'Improperly installed windows cause leaks and drafts', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 24, 'Apply Dead Wood for Drywall Backing', 'Add backing boards behind drywall at all fixture locations (cabinets, grab bars, shelving, TV mounts, etc.) for secure fastening later.', 'Install wooden backing behind the walls where fixtures will be mounted (cabinet hardware, towel bars, TVs, shelves).', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Backing installed at all planned fixture locations; positioned for future fastening; documented with layout', 'Missing backing prevents secure fixture mounting later', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 25, 'Inspect Framing (final check before payment)', 'Arrange comprehensive building inspector visit. Verify structure is plumb, level, square, properly braced, and ready for MEP trades.', 'Have the building inspector do a final walkthrough of all the framing. Check that everything is plumb, level, and properly braced.', TRUE, FALSE, TRUE, TRUE, 'OBC 9.8.5', 'Municipal Building Inspector', 'Framing plumb and level per standards; bracing adequate; openings properly sized; inspection fully signed off', 'Proceeding with structural defects requires demolition and rebuild', NOW())
)
SELECT 1;

-- ============================================================================
-- 10. ROOFING (RF) - 6 steps
-- ============================================================================

WITH compliance_insert AS (
  INSERT INTO public.compliance_rulesets (
    id, trade_type, region, name, rules, created_at
  ) VALUES (
    gen_random_uuid(),
    'RF',
    'ON',
    'Roofing Compliance (Ontario)',
    jsonb_build_object(
      'required_inspections', jsonb_build_array(
        jsonb_build_object('type', 'roofing_final', 'stage', 'post_installation', 'description', 'Final roofing inspection and weather tightness', 'authority', 'Municipal Building Inspector')
      ),
      'code_references', jsonb_build_array(
        jsonb_build_object('code', 'OBC', 'section', '9.23', 'description', 'Roof assembly and shingle installation requirements')
      )
    ),
    NOW()
  )
  RETURNING id AS compliance_id
),
sequence_insert AS (
  INSERT INTO public.execution_sequences (
    id, trade_type, name, description, region, source, is_public, is_verified, created_by_id, created_at
  ) VALUES (
    gen_random_uuid(),
    'RF',
    'Roofing Installation',
    'Complete roofing system from underlayment through shingles, flashing, and final inspection for weather tightness',
    'ON',
    'platform_template',
    TRUE,
    TRUE,
    NULL,
    NOW()
  )
  RETURNING id AS sequence_id
),
steps_insert AS (
  INSERT INTO public.sequence_steps (
    sequence_id, step_number, title, description, plain_language_summary, requires_inspection, requires_permit, is_milestone, triggers_payment, code_reference, authority_body, quality_criteria, skip_risk_description, created_at
  ) VALUES
  ((SELECT sequence_id FROM sequence_insert), 1, 'Install Roofing Felt (immediately after deck inspection)', 'Install roofing felt or synthetic underlayment over inspected deck. Overlap courses per manufacturer specs. Felt protects deck before shingles.', 'Install roofing underlayment immediately after the deck is approved. Overlap it properly so water doesn''t get under it.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.23.3', 'Ontario Building Code', 'Underlayment installed per manufacturer instructions; overlapped per spec; fastened with caps; no tears', 'Wet roof deck causes rot and mold', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 2, 'Install Metal Drip Edge and Flashing', 'Install metal drip edge at eaves and rakes. Install flashing around chimney, penetrations, valleys, and against other structures.', 'Install metal edge trim at the edges of the roof. Install flashing where the roof meets the chimney and other spots where water could get in.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.23.3', 'Ontario Building Code', 'Drip edge continuous at all perimeter; flashing properly overlapped; sealed at joints; tight fit to surfaces', 'Missing flashing causes the most common roof leaks', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 3, 'Install Roofing Shingles', 'Install asphalt shingles (or specified roofing material) starting from eave and working upward. Follow manufacturer nailing and spacing specs.', 'Install shingles starting at the bottom. Nail them per the manufacturer''s instructions. Keep the lines straight so it looks good.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.23.4', 'Ontario Building Code', 'Shingles installed per manufacturer spec; straight lines; proper nailing; appropriate weather; alignment checked', 'Improper shingle installation causes leaks and blow-offs', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 4, 'Inspect Roofing (straight lines, even pattern, sealed vents)', 'Arrange building inspector to verify shingles are installed per specification, valleys are sealed, vents are flashed, and no leaks visible.', 'Have the building inspector check that the shingles are installed straight, vents are sealed, and everything looks right.', TRUE, FALSE, FALSE, FALSE, 'OBC 9.23.4', 'Municipal Building Inspector', 'Shingle lines straight and even; valleys sealed; vents flashed; no leaks visible; inspection approved', 'Proceeding with roofing defects allows leaks during construction', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 5, 'Install Ridge Vent', 'Install ridge vent or other roof ventilation per specification. Ensure proper airflow path from eave vents to ridge.', 'Install a vent at the ridge (top of the roof) to allow air to flow through the attic. This prevents moisture buildup.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.19.1', 'Ontario Building Code', 'Ridge vent installed per manufacturer spec; continuous; properly fastened; compatible with soffit vents', 'Missing ventilation causes attic moisture and rot', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 6, 'Final Roof Inspection', 'Conduct final roof inspection by building inspector. Verify complete installation, weather tightness, and all code requirements met.', 'Have the inspector do one final check of the entire roof. Make sure it''s watertight and everything is installed right.', TRUE, FALSE, TRUE, TRUE, 'OBC 9.23.5', 'Municipal Building Inspector', 'Roof complete and weather-tight; water tightness tested; all code requirements verified; final sign-off documented', 'Roof leaks during construction cause interior damage and mold', NOW())
)
SELECT 1;

-- ============================================================================
-- 11. GUTTERS (GU) - 5 steps
-- ============================================================================

WITH sequence_insert AS (
  INSERT INTO public.execution_sequences (
    id, trade_type, name, description, region, source, is_public, is_verified, created_by_id, created_at
  ) VALUES (
    gen_random_uuid(),
    'GU',
    'Gutter and Drainage System',
    'Installation of gutters, downspouts, underground drainage, and water management systems to protect foundation and landscaping',
    'ON',
    'platform_template',
    TRUE,
    TRUE,
    NULL,
    NOW()
  )
  RETURNING id AS sequence_id
),
steps_insert AS (
  INSERT INTO public.sequence_steps (
    sequence_id, step_number, title, description, plain_language_summary, requires_inspection, requires_permit, is_milestone, triggers_payment, code_reference, authority_body, quality_criteria, skip_risk_description, created_at
  ) VALUES
  ((SELECT sequence_id FROM sequence_insert), 1, 'Install Underground Drain Pipe', 'Install underground drainage pipe from downspout locations to daylight or storm drain. Use 4-inch perforated or solid PVC pipe as appropriate.', 'Install pipes underground that carry water from the downspouts away from the house—at least 6-10 feet away, or to a storm drain.', FALSE, FALSE, FALSE, FALSE, 'OBC 4.1.2', 'Ontario Building Code', 'Pipe installed 6-10 feet from foundation; proper slope 1-2%; connected to appropriate outlet; marked for future access', 'Poor drainage system causes water to pool against foundation', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 2, 'Install Gutters and Downspouts', 'Install gutters (typically aluminum or steel) along roof eaves. Install downspouts at designed locations. Secure with proper hangers and straps.', 'Install gutters along the edges of the roof. Install downspouts to carry water down to the underground pipes. Secure them properly.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.23.5', 'Ontario Building Code', 'Gutters sloped 1/8-1/4 inch per 10 feet toward downspouts; properly supported every 24-32 inches; secure connections', 'Sagging gutters allow water to overflow and damage walls', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 3, 'Install Splashblocks/Water Channeling', 'Install splash blocks under downspouts or grade-level drainage channels to direct water away from foundation. Ensure water flows away from house.', 'Put blocks under the downspout openings to direct the water away from the house. Make sure water flows at least 6 feet from the foundation.', FALSE, FALSE, FALSE, FALSE, 'OBC 4.1.2', 'Ontario Building Code', 'Splash blocks or channels direct water 6+ feet from foundation; proper slope maintained; no water pooling', 'Water that doesn''t drain away from foundation causes leaks', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 4, 'Inspect Gutters (slope, coverage, connections)', 'Arrange inspector to verify gutters are properly sloped, downspouts direct water correctly, and system functions properly without overflow.', 'Have the inspector check that gutters are sloped right so water flows to downspouts, and everything is connected properly.', TRUE, FALSE, TRUE, FALSE, 'OBC 9.23.5', 'Municipal Building Inspector', 'Gutter slope and slope verified; downspout discharge confirmed; no pooling areas; system functional during test', 'Inspection catches drainage problems before they cause water damage', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 5, 'Install Copper Awnings/Dormer Tops', 'Install decorative copper or metal awnings over doors/windows and metal flashing over dormers if specified in design. Ensure proper flashing integration.', 'If the plans call for decorative copper awnings or metal-topped dormers, install them and make sure they''re flashed properly.', FALSE, FALSE, TRUE, TRUE, 'OBC 9.23.5', 'Ontario Building Code', 'Awnings/tops installed per design; properly flashed and sealed; secure attachment; aesthetic appearance verified', 'Improper flashing of decorative elements causes leaks', NOW())
)
SELECT 1;

-- ============================================================================
-- 12. PLUMBING (PL) - 12 steps
-- ============================================================================

WITH compliance_insert AS (
  INSERT INTO public.compliance_rulesets (
    id, trade_type, region, name, rules, created_at
  ) VALUES (
    gen_random_uuid(),
    'PL',
    'ON',
    'Plumbing Compliance (Ontario)',
    jsonb_build_object(
      'required_permits', jsonb_build_array(
        jsonb_build_object('type', 'plumbing_permit', 'description', 'Plumbing installation permit', 'issuing_body', 'Municipal Building Department')
      ),
      'required_inspections', jsonb_build_array(
        jsonb_build_object('type', 'plumbing_roughin', 'stage', 'rough_in', 'description', 'Rough-in plumbing inspection before walls closed', 'authority', 'Municipal Building Inspector'),
        jsonb_build_object('type', 'plumbing_finish', 'stage', 'finish', 'description', 'Final plumbing inspection and water pressure test', 'authority', 'Municipal Building Inspector')
      ),
      'code_references', jsonb_build_array(
        jsonb_build_object('code', 'OBC', 'section', '7.1', 'description', 'Plumbing installations and water supply'),
        jsonb_build_object('code', 'OBC', 'section', '7.3', 'description', 'Drainage systems')
      )
    ),
    NOW()
  )
  RETURNING id AS compliance_id
),
sequence_insert AS (
  INSERT INTO public.execution_sequences (
    id, trade_type, name, description, region, source, is_public, is_verified, created_by_id, created_at
  ) VALUES (
    gen_random_uuid(),
    'PL',
    'Plumbing Installation',
    'Complete plumbing system from rough-in through final fixtures, water supply connection, and code inspection',
    'ON',
    'platform_template',
    TRUE,
    TRUE,
    NULL,
    NOW()
  )
  RETURNING id AS sequence_id
),
steps_insert AS (
  INSERT INTO public.sequence_steps (
    sequence_id, step_number, title, description, plain_language_summary, requires_inspection, requires_permit, is_milestone, triggers_payment, code_reference, authority_body, quality_criteria, skip_risk_description, created_at
  ) VALUES
  ((SELECT sequence_id FROM sequence_insert), 1, 'Walk Through Site with Plumber', 'Meet with plumbing contractor to review all plans, fixture locations, rough-in locations, water/sewer access, and sequencing.', 'Talk to the plumber about the plans and what you want. Point out where all the fixtures will go.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Meeting documented; plans reviewed; fixture locations confirmed; start schedule established', 'Poor planning causes fixture misplacement and rework', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 2, 'Install Stub Plumbing (if cast in concrete)', 'If plumbing runs under slab, ensure stub-outs are installed before concrete pour as planned during excavation phase.', 'If you already cast plumbing into the concrete slab, make sure those rough-in stubs are ready before the next phases.', FALSE, FALSE, FALSE, FALSE, 'OBC 7.3.1', 'Ontario Building Code', 'Stub-outs positioned per plans; protected during concrete work; ends capped; locations marked', 'Disturbed concrete stubs require slab cutting for correction', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 3, 'Place Large Fixtures Before Framing', 'Position bathtubs, showers, and other large fixtures in framing openings before walls are closed to ensure fit and rough-in routing.', 'Place the bathtub, shower, and other large fixtures before the walls close in. This helps the plumber route pipes correctly.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Large fixtures positioned; plumbing routes verified; clearances adequate; documented with photos', 'Late fixture discovery requires wall demolition for routing', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 4, 'Mark All Fixture Locations', 'Clearly mark on framing all water supply, drain, and vent locations for every fixture. Use blueprints as reference and mark with chalk.', 'Mark on the studs exactly where the pipes need to go for each fixture—toilets, sinks, showers, everything.', FALSE, FALSE, FALSE, FALSE, 'OBC 7.2.1', 'Ontario Building Code', 'All fixtures marked with chalk per blueprint; heights verified; clearances noted; documented with photos', 'Unmarked locations cause pipe misrouting and rework', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 5, 'Install Rough-In Plumbing (hot/cold lines, sewer, vent)', 'Install all water supply lines (hot and cold), drain lines, and vent stack. Run through walls to all marked fixture locations. Support properly.', 'Run the water pipes and drain pipes through the walls to all the fixtures. Support the pipes so they don''t sag. Install vent pipes to the roof.', FALSE, FALSE, FALSE, FALSE, 'OBC 7.2.2', 'Ontario Building Code', 'Pipes sloped properly; vent stack continuous to roof; supply lines per code sizing; proper hangers and support', 'Improper slope or support causes slow drains and water damage', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 6, 'Install Water Meter and Spigot', 'Install water meter at property line and exterior spigot for construction use and future reference. Ensure accessibility.', 'Install the water meter where the city line comes into your property. Install an outdoor spigot for the hose.', FALSE, FALSE, FALSE, FALSE, 'OBC 7.1.2', 'Ontario Building Code', 'Meter installed per municipal requirements; accessible for reading; spigot functional and protected', 'Meter location issues prevent proper utility billing', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 7, 'Install Sewer Line', 'Install sewer line from house to main sewer connection or septic system per municipal requirements. Proper slope and support critical.', 'Run the sewer line from the house to the main sewer in the street. Make sure it slopes properly so waste flows.', FALSE, TRUE, FALSE, FALSE, 'OBC 7.3.1', 'Ontario Building Code', 'Slope 1/8-1/4 inch per 10 feet; proper pipe size per code; joints sealed; no damage; properly documented', 'Improper sewer slope causes backups and damage', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 8, 'Conduct Rough-In Plumbing Inspection (VERY important — county inspector)', 'Schedule building inspector for mandatory rough-in inspection. Inspector verifies all pipes, vents, drains in correct locations and per code before drywall.', 'Have the building inspector come and check all the plumbing before you close the walls. This is a critical inspection—get it right.', TRUE, TRUE, TRUE, FALSE, 'OBC 7.2.3', 'Municipal Building Inspector', 'All pipes visible and verified; correct locations per blueprint; vent stack continuous; inspection fully signed off', 'Proceeding without rough-in inspection approval allows hidden code violations', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 9, 'Install Finish Plumbing (sinks, faucets, toilets, showers)', 'Install all plumbing fixtures: sinks, faucets, toilets, shower bases, and trim after drywall and before painting. Follow manufacturer specs.', 'Install all the sinks, faucets, toilets, and showers according to the manufacturer''s instructions. Connect them to the rough-in pipes.', FALSE, FALSE, FALSE, FALSE, 'OBC 7.2.4', 'Ontario Building Code', 'All fixtures installed per manufacturer spec; properly sealed and caulked; operation verified', 'Improper fixture installation causes leaks', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 10, 'Tap Into Water Supply (bleed air, flush system)', 'Connect to main water supply line. Open all fixtures and run water to purge air from system and check for leaks.', 'Turn on the water main. Run water from all the fixtures to get the air out of the pipes. Check for leaks everywhere.', FALSE, FALSE, FALSE, FALSE, 'OBC 7.1.1', 'Ontario Building Code', 'Water pressure tested; no leaks at any connection; system flushed; water quality acceptable', 'Water system with air locks causes spurting and pressure problems', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 11, 'Conduct Finish Plumbing Inspection', 'Arrange final plumbing inspection. Inspector verifies all fixtures installed, connected properly, pressure tested, and system functional.', 'Have the inspector check all the finished plumbing. Make sure everything works, there are no leaks, and the pressure is right.', TRUE, FALSE, TRUE, FALSE, 'OBC 7.2.5', 'Municipal Building Inspector', 'All fixtures present and functional; no leaks; water pressure adequate; final inspection signed off', 'Proceeding without final inspection allows hidden leaks', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 12, 'Correct Any Problems', 'Address any punch-list items identified by inspector or homeowner walkthrough. Repair leaks, fix pressure issues, or replace defective fixtures.', 'Fix any problems found by the inspector or during your walkthrough. Replace anything that doesn''t work right.', FALSE, FALSE, TRUE, TRUE, 'OBC 7.2.5', 'Ontario Building Code', 'All identified issues corrected; system re-tested and verified; final approval obtained', 'Uncorrected plumbing issues cause damage and occupancy delays', NOW())
)
SELECT 1;

-- ============================================================================
-- 13. HVAC (HV) - 9 steps
-- ============================================================================

WITH compliance_insert AS (
  INSERT INTO public.compliance_rulesets (
    id, trade_type, region, name, rules, created_at
  ) VALUES (
    gen_random_uuid(),
    'HV',
    'ON',
    'HVAC Compliance (Ontario)',
    jsonb_build_object(
      'required_permits', jsonb_build_array(
        jsonb_build_object('type', 'hvac_permit', 'description', 'HVAC system installation permit', 'issuing_body', 'Municipal Building Department')
      ),
      'required_inspections', jsonb_build_array(
        jsonb_build_object('type', 'hvac_roughin', 'stage', 'rough_in', 'description', 'HVAC rough-in inspection before drywall', 'authority', 'Municipal Building Inspector'),
        jsonb_build_object('type', 'hvac_final', 'stage', 'finish', 'description', 'Final HVAC inspection and system test', 'authority', 'Municipal Building Inspector'),
        jsonb_build_object('type', 'gas_connection', 'stage', 'finish', 'description', 'Gas line connection and pressure test', 'authority', 'Licensed Gas Fitter')
      ),
      'code_references', jsonb_build_array(
        jsonb_build_object('code', 'OBC', 'section', '6.1', 'description', 'Heating and cooling systems')
      )
    ),
    NOW()
  )
  RETURNING id AS compliance_id
),
sequence_insert AS (
  INSERT INTO public.execution_sequences (
    id, trade_type, name, description, region, source, is_public, is_verified, created_by_id, created_at
  ) VALUES (
    gen_random_uuid(),
    'HV',
    'HVAC System Installation',
    'Heating, ventilation, and air conditioning system from design through rough-in, finish, and operational testing',
    'ON',
    'platform_template',
    TRUE,
    TRUE,
    NULL,
    NOW()
  )
  RETURNING id AS sequence_id
),
steps_insert AS (
  INSERT INTO public.sequence_steps (
    sequence_id, step_number, title, description, plain_language_summary, requires_inspection, requires_permit, is_milestone, triggers_payment, code_reference, authority_body, quality_criteria, skip_risk_description, created_at
  ) VALUES
  ((SELECT sequence_id FROM sequence_insert), 1, 'Conduct Energy Audit to Determine Requirements', 'Perform energy audit or heat loss calculation to size heating/cooling system properly. Determine equipment capacity, ductwork requirements.', 'Calculate how much heating and cooling the house needs based on size, insulation, and location. This tells you what equipment to buy.', FALSE, FALSE, FALSE, FALSE, 'OBC 6.1.1', 'Ontario Building Code', 'Energy audit completed; load calculations documented; equipment sizing specified; efficiency rated', 'Undersized equipment fails to heat/cool; oversized equipment wastes energy', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 2, 'Finalize HVAC Design (gas company review)', 'Complete HVAC system design including ductwork layout, equipment location, gas line routing. Coordinate with gas utility if applicable.', 'Finalize the plan for how the heating and cooling will work. If you''re using gas heat, the gas company reviews the design.', FALSE, FALSE, FALSE, FALSE, 'OBC 6.1.2', 'Ontario Building Code', 'HVAC design completed; ductwork sizing per code; equipment specifications documented; gas company approval obtained', 'Design errors require expensive rework after installation', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 3, 'Rough-In Heating and AC System', 'Install ductwork, supply air lines, return air paths, furnace/boiler, and equipment base. Support properly. Test for ductwork integrity.', 'Install the furnace, air conditioner, and all the ducts that carry hot and cold air. Position the equipment and run the ducts to each room.', FALSE, FALSE, FALSE, FALSE, 'OBC 6.1.3', 'Ontario Building Code', 'Ductwork installed per design; proper sizing; sealed joints; supported with hangers; accessible for maintenance', 'Leaky ductwork wastes energy; collapsed ducts reduce airflow', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 4, 'Inspect HVAC Rough-In (county inspector)', 'Schedule building inspector to verify HVAC rough-in layout, ductwork sizing, equipment positioning, and compliance before drywall closes.', 'Have the building inspector verify the HVAC rough-in is correct before you close the walls and insulate.', TRUE, TRUE, TRUE, FALSE, 'OBC 6.1.3', 'Municipal Building Inspector', 'Rough-in layout verified against plans; ductwork sizing checked; clearances adequate; inspection fully approved', 'Proceeding without rough-in inspection allows hidden HVAC defects', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 5, 'Correct Rough-In Deficiencies', 'Address any inspection deficiencies: reposition ducts, reseal joints, adjust equipment location, or resize as required.', 'Fix any problems the inspector found. Reposition ducts, reseal leaks, or make other corrections needed.', FALSE, FALSE, FALSE, FALSE, 'OBC 6.1.3', 'Ontario Building Code', 'All deficiencies corrected; re-inspection passed if required; changes documented', 'Uncorrected deficiencies prevent final HVAC system operation', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 6, 'Install Finish HVAC (thermostat, registers, compressor)', 'Install all HVAC trim and controls: supply/return registers, baseboard convectors, thermostat, and outdoor air conditioner compressor unit.', 'Install the AC unit outside, the thermostat, and all the vents and registers throughout the house after drywall and paint.', FALSE, FALSE, FALSE, FALSE, 'OBC 6.1.4', 'Ontario Building Code', 'All registers and trim installed per design; thermostat positioned in living space; compressor unit secure and level', 'Improperly positioned thermostat causes incorrect temperature readings', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 7, 'Inspect HVAC Final (county inspector)', 'Schedule final HVAC inspection. Verify all equipment connected, system operational, thermostat functional, and performance tested.', 'Have the inspector check that the HVAC system is complete and works properly. Test the thermostat and all registers.', TRUE, FALSE, TRUE, FALSE, 'OBC 6.1.4', 'Municipal Building Inspector', 'Equipment connected and operational; thermostat functional; registers all open; performance verified; inspection signed off', 'Proceeding without final inspection allows hidden system failures', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 8, 'Connect Gas Lines', 'If heating system uses gas, connect gas line from supply to furnace/boiler. Pressure test per code. Use licensed gas fitter.', 'Connect the gas line to the furnace. A licensed gas professional must do this. Test the connection for leaks.', FALSE, TRUE, FALSE, FALSE, 'OBC 6.1.2', 'Licensed Gas Fitter', 'Gas line connected by licensed fitter; pressure tested; no leaks; regulator installed; safety valve functional', 'Gas line leaks are dangerous and illegal', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 9, 'Test Full System Operation', 'Run heating and cooling cycles. Verify all zones heat/cool properly. Check thermostat response. Confirm system balancing and comfort levels.', 'Turn on heat and air conditioning. Check that all rooms heat and cool properly. Adjust the thermostat and make sure everything works.', FALSE, FALSE, TRUE, TRUE, 'OBC 6.1.4', 'Ontario Building Code', 'System heats to target temperature; cooling works; thermostat responsive; airflow balanced; homeowner trained', 'Unbalanced systems cause cold/hot spots', NOW())
)
SELECT 1;

-- ============================================================================
-- 14. ELECTRICAL (EL) - 12 steps
-- ============================================================================

WITH compliance_insert AS (
  INSERT INTO public.compliance_rulesets (
    id, trade_type, region, name, rules, created_at
  ) VALUES (
    gen_random_uuid(),
    'EL',
    'ON',
    'Electrical Compliance (Ontario)',
    jsonb_build_object(
      'required_permits', jsonb_build_array(
        jsonb_build_object('type', 'electrical_permit', 'description', 'Electrical installation permit', 'issuing_body', 'Municipal Building Department'),
        jsonb_build_object('type', 'utility_connection', 'description', 'Utility company electrical connection authorization', 'issuing_body', 'Local Utility Provider')
      ),
      'required_inspections', jsonb_build_array(
        jsonb_build_object('type', 'electrical_roughin', 'stage', 'rough_in', 'description', 'Rough-in electrical inspection before drywall', 'authority', 'Electrical Inspector'),
        jsonb_build_object('type', 'electrical_final', 'stage', 'finish', 'description', 'Final electrical inspection and power connection', 'authority', 'Electrical Inspector')
      ),
      'code_references', jsonb_build_array(
        jsonb_build_object('code', 'OBC', 'section', '8.1', 'description', 'Electrical power supply and distribution'),
        jsonb_build_object('code', 'Canadian Electrical Code', 'section', 'Part I', 'description', 'General requirements for electrical installations')
      )
    ),
    NOW()
  )
  RETURNING id AS compliance_id
),
sequence_insert AS (
  INSERT INTO public.execution_sequences (
    id, trade_type, name, description, region, source, is_public, is_verified, created_by_id, created_at
  ) VALUES (
    gen_random_uuid(),
    'EL',
    'Electrical System Installation',
    'Complete electrical system from temporary power through rough-in wiring, finish connections, power activation, and testing',
    'ON',
    'platform_template',
    TRUE,
    TRUE,
    NULL,
    NOW()
  )
  RETURNING id AS sequence_id
),
steps_insert AS (
  INSERT INTO public.sequence_steps (
    sequence_id, step_number, title, description, plain_language_summary, requires_inspection, requires_permit, is_milestone, triggers_payment, code_reference, authority_body, quality_criteria, skip_risk_description, created_at
  ) VALUES
  ((SELECT sequence_id FROM sequence_insert), 1, 'Determine Electrical Requirements (outlets, switches, fixtures)', 'Review plans to determine total amperage needed, outlet/switch count, fixture locations, and special requirements (appliances, etc).', 'Look at the plans and count all the outlets, switches, and light fixtures. This tells you what capacity electrical panel you need.', FALSE, FALSE, FALSE, FALSE, 'CEC Part I', 'Licensed Electrician', 'Load calculation completed; outlet/switch count verified; fixture locations mapped; amperage service sized', 'Undersized service causes overloading; excess capacity wastes money', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 2, 'Select Fixtures and Appliances', 'Choose all electrical fixtures (light fixtures, exhaust fans, etc.) and appliances (stove, dishwasher, dryer, etc.) that will be hardwired.', 'Choose light fixtures, kitchen appliances, ceiling fans, and other electrical items. Make sure they fit the design and wiring plan.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Fixtures and appliances selected; electrical requirements verified; specifications documented', 'Incompatible appliances require costly rewiring', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 3, 'Install Temporary Electric Pole', 'Install temporary power pole for construction. Coordinate with utility to run power. Provide generator or temporary service panel.', 'Set up temporary power on the job site. Get electricity hooked up for tools and jobsite lighting during construction.', FALSE, TRUE, FALSE, FALSE, 'CEC Part I', 'Licensed Electrician', 'Temporary service installed by licensed electrician; proper grounding; GFCI protection on all outlets', 'Unsafe temporary power causes electrocution and fires', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 4, 'Perform Rough-In Electrical (wiring through studs)', 'Run all electrical wiring (Romex, conduit, or cable) through walls to all switch/outlet locations and fixture locations per code and plan.', 'Run the electrical wires through the walls to each outlet, switch, and light fixture location. Support and secure all wiring properly.', FALSE, FALSE, FALSE, FALSE, 'CEC Part I', 'Licensed Electrician', 'Wiring routed per plans; proper gauge per load; supported every 4.5 feet; protected from mechanical damage', 'Improper wiring routing causes shock hazards and fires', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 5, 'Install Phone/Data/Speaker/Cable Wiring', 'Run data cables for phone, internet, speakers, and TV coax. Separate from electrical for interference prevention. Install junction boxes.', 'Run cables for phone, internet, and TV throughout the house. Keep them separate from electrical wires to avoid interference.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Cabling separated from power lines; adequate separation maintained; junction boxes installed; locations marked', 'Bundled cables create interference and signal degradation', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 6, 'Inspect Rough-In Electrical (county inspector sign-off)', 'Schedule electrical inspector for rough-in inspection. Verify wiring type, routing, protection, and code compliance before drywall closure.', 'Have the electrical inspector check all the wiring before you close the walls. Make sure it''s installed correctly and safe.', TRUE, TRUE, TRUE, FALSE, 'CEC Part I', 'Electrical Inspector', 'Wiring verified for proper type and gauge; routing per code; protection adequate; grounding correct; inspection fully approved', 'Proceeding without rough-in inspection allows hidden code violations and fire hazards', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 7, 'Correct Rough-In Problems', 'Address any inspection deficiencies: reroute wiring, add protection, fix grounding, or reinstall boxes as required.', 'Fix any problems the inspector found with the wiring. Reroute, add protection, or reinstall boxes as needed.', FALSE, FALSE, FALSE, FALSE, 'CEC Part I', 'Licensed Electrician', 'All deficiencies corrected; re-inspection passed; changes documented', 'Uncorrected wiring defects are fire hazards', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 8, 'Install Garage Doors and Openers', 'Install garage doors, openers, and associated electrical connections per manufacturer specs. Include safety sensors and proper grounding.', 'Install the garage doors and electric openers. Wire the opener motors and safety sensors according to the manufacturer''s instructions.', FALSE, FALSE, FALSE, FALSE, 'CEC Part I', 'Licensed Electrician', 'Garage doors operational; openers functional; sensors working; emergency release manual backup functional', 'Improperly installed openers are safety hazards', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 9, 'Perform Finish Electrical (terminate all wiring, install appliances)', 'Terminate all wires in switches, outlets, fixtures, and appliances. Install all electrical devices and fixtures after drywall and painting.', 'Connect all the wiring to switches, outlets, and light fixtures. Install all the lights and appliances after the walls are done.', FALSE, FALSE, FALSE, FALSE, 'CEC Part I', 'Licensed Electrician', 'All devices properly connected; polarity verified; grounding confirmed; devices secured and rated for location', 'Improper connections cause shock hazards and fires', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 10, 'Inspect Finish Electrical (county inspector)', 'Schedule final electrical inspection. Verify all devices installed, wiring terminated correctly, grounding complete, system safe to energize.', 'Have the electrical inspector check all the finished electrical work. Make sure everything is connected right and safe.', TRUE, FALSE, TRUE, FALSE, 'CEC Part I', 'Electrical Inspector', 'All devices present and correctly wired; polarity and grounding verified; safety compliant; inspection fully approved', 'Proceeding without final inspection allows hidden hazards', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 11, 'Connect Utility Power', 'Coordinate with utility company to connect main service. Install meter. Activate utility power to house. Test breaker operation.', 'Have the utility company hook up the main power line. The meter gets installed. Test the breakers to make sure everything works.', FALSE, TRUE, FALSE, FALSE, 'CEC Part I', 'Electrical Inspector', 'Main service connected by utility; meter operational; breakers functional; no overloads on startup', 'Utility connection problems prevent house occupancy', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 12, 'Test All Circuits and Outlets', 'Verify every circuit operates properly. Test all outlets with a receptacle tester. Check that lights, fans, and appliances all function.', 'Test every outlet, light, and appliance. Make sure they all work and have correct voltage and polarity.', FALSE, FALSE, TRUE, TRUE, 'CEC Part I', 'Licensed Electrician', 'All circuits tested and operational; voltage within spec; proper polarity; all fixtures and outlets functional', 'Untested circuits may have hidden problems', NOW())
)
SELECT 1;

-- ============================================================================
-- 15. MASONRY & STUCCO (MA) - 12 steps
-- ============================================================================

WITH sequence_insert AS (
  INSERT INTO public.execution_sequences (
    id, trade_type, name, description, region, source, is_public, is_verified, created_by_id, created_at
  ) VALUES (
    gen_random_uuid(),
    'MA',
    'Masonry and Stucco Work',
    'Exterior masonry including brick/stone veneer, fireplace/chimney, and finish stucco coating for weather protection',
    'ON',
    'platform_template',
    TRUE,
    TRUE,
    NULL,
    NOW()
  )
  RETURNING id AS sequence_id
),
steps_insert AS (
  INSERT INTO public.sequence_steps (
    sequence_id, step_number, title, description, plain_language_summary, requires_inspection, requires_permit, is_milestone, triggers_payment, code_reference, authority_body, quality_criteria, skip_risk_description, created_at
  ) VALUES
  ((SELECT sequence_id FROM sequence_insert), 1, 'Install Flashing Above Windows and Doors', 'Install metal flashing above all windows and doors to direct water away from openings before laying brick. Ensure proper overlap and sealing.', 'Install metal trim above windows and doors to prevent water from getting in. Make sure it overlaps the sheathing properly.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.27.2', 'Ontario Building Code', 'Flashing installed per detail; overlaps sheathing; sealed with sealant; no gaps', 'Missing flashing is primary cause of water damage around openings', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 2, 'Lay Brick/Stone Veneer (exterior, chimney, fireplace, hearth)', 'Install brick or stone veneer on exterior walls, chimney, fireplace, and hearth. Lay in mortar with consistent joint thickness per plans.', 'Lay brick or stone on the outside walls, chimney, fireplace, and hearth. Keep mortar joints even. Follow the pattern on the plans.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.20.1', 'Ontario Building Code', 'Bricks laid plumb and level; mortar joints 10mm ±2mm; pattern matches design; no chips or cracks', 'Misaligned or uneven brickwork looks bad and lacks structural integrity', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 3, 'Finish Bricks and Mortar', 'Tool mortar joints to create consistent profile (concave preferred). Brush bricks clean. Apply sealer if specified.', 'Finish the mortar between bricks with a tool to make it look nice and keep water out. Brush the bricks clean.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.20.1', 'Ontario Building Code', 'Joints tooled concave; mortar firm set; bricks clean; no excess mortar smears', 'Poor mortar finishing allows water infiltration and accelerated deterioration', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 4, 'Inspect Brickwork', 'Arrange inspector to verify brick is laid per blueprints, all joints properly filled, no cracked bricks, and acceptable workmanship.', 'Have the building inspector check that the brickwork is done right—even lines, consistent colors, and solid joints.', TRUE, FALSE, FALSE, FALSE, 'OBC 9.20.1', 'Municipal Building Inspector', 'Brickwork per design; joints solid; no cracks; color consistent; workmanship acceptable; inspection approved', 'Poor brickwork quality causes water problems and aesthetic issues', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 5, 'Clean Up Excess Bricks and Mortar', 'Remove leftover bricks, mortar drippings, and debris from site and building facade. Clean exterior surfaces.', 'Clean up leftover bricks and mortar. Wash the brick facade so it looks clean and professional.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Excess bricks removed; mortar smears cleaned; debris hauled away; facade appearance professional', 'Excess materials and mortar stains look unprofessional and attract pests', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 6, 'Install Base for Decorative Stucco', 'If stucco finish is planned, prepare surface by installing metal lath or scratch coat base per specification.', 'If the plans call for stucco finish, install the metal mesh base that the stucco will stick to.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.21.1', 'Ontario Building Code', 'Lath securely fastened every 6 inches; laps overlapped 1 inch; no tears or missing sections', 'Loose lath allows stucco cracking and separation', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 7, 'Prepare Stucco Test Area', 'Apply test stucco sample to verify color, finish, and compatibility before full application. Adjust formula if needed.', 'Make a test patch of stucco to make sure the color and finish look right before you do the whole house.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Test area applied; sample cured; color and finish approved by homeowner; documented with photos', 'Color/finish mismatch discovered after full application is expensive to correct', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 8, 'Apply Stucco Lath and Formwork', 'Install temporary control joints, expansion joints, and edge forms to guide stucco application to proper thickness and profile.', 'Set up guides and controls for where the stucco will be applied. This helps you keep the thickness even.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.21.1', 'Ontario Building Code', 'Controls installed per design; joints at proper intervals; edges square and defined', 'Poorly controlled stucco application results in uneven finish', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 9, 'Apply First Coat of Stucco', 'Apply scratch coat (first coat) of stucco to lath. Embed lath in first coat. Allow proper cure time before second coat.', 'Apply the first layer of stucco over the mesh. Score it slightly to help the next coat stick. Let it cure.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.21.2', 'Ontario Building Code', 'First coat applied per spec thickness; properly embedded; scored lightly; full cure before next coat', 'Inadequate cure between coats causes cracking and delamination', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 10, 'Apply Second Coat of Stucco (wait for first to dry)', 'Apply brown coat (second coat) after first coat cures. Smooth and level surface. Allow full cure before finish coat.', 'Apply the second coat of stucco after the first one dries. Smooth it and let it cure again before the final coat.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.21.2', 'Ontario Building Code', 'Second coat applied after first cure; uniform thickness; smooth finish; full cure before finish coat', 'Poor second coat application compromises final appearance and durability', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 11, 'Inspect Stucco Work', 'Arrange inspector to verify stucco application per specification, proper color, no cracks, and weather-tight finish.', 'Have the building inspector check the stucco finish. Make sure there are no cracks and it looks like the approved test patch.', TRUE, FALSE, TRUE, FALSE, 'OBC 9.21.3', 'Municipal Building Inspector', 'Stucco per specification; no major cracks; color uniform; finish weather-tight; inspection approved', 'Cracked or poorly finished stucco allows water intrusion and deterioration', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 12, 'Correct Any Issues', 'Address any punch-list items: patch cracks, touch up color, repair damaged areas, or recoat if finish quality inadequate.', 'Fix any cracks or imperfect areas in the stucco. Touch up the color to match and make sure it looks uniform.', FALSE, FALSE, TRUE, TRUE, 'OBC 9.21.3', 'Ontario Building Code', 'All cracks patched; color uniform; finish quality acceptable; no active water paths visible', 'Uncorrected stucco defects lead to water damage and further deterioration', NOW())
)
SELECT 1;

-- ============================================================================
-- 16. SIDING & CORNICE (SC) - 10 steps
-- ============================================================================

WITH sequence_insert AS (
  INSERT INTO public.execution_sequences (
    id, trade_type, name, description, region, source, is_public, is_verified, created_by_id, created_at
  ) VALUES (
    gen_random_uuid(),
    'SC',
    'Exterior Siding and Cornice',
    'Installation of siding material, trim, flashing, caulking, soffit, and fascia for complete weather-tight exterior enclosure',
    'ON',
    'platform_template',
    TRUE,
    TRUE,
    NULL,
    NOW()
  )
  RETURNING id AS sequence_id
),
steps_insert AS (
  INSERT INTO public.sequence_steps (
    sequence_id, step_number, title, description, plain_language_summary, requires_inspection, requires_permit, is_milestone, triggers_payment, code_reference, authority_body, quality_criteria, skip_risk_description, created_at
  ) VALUES
  ((SELECT sequence_id FROM sequence_insert), 1, 'Install Windows and Doors (if not done by framer)', 'If windows and doors not yet installed by framing crew, install all units per manufacturer specifications and code requirements.', 'Install any windows and doors that the framer didn''t already put in. Make sure they''re level and square.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.7.2', 'Ontario Building Code', 'Windows/doors level and plumb; proper flashing installed; operation verified', 'Improperly installed windows cause leaks and operation problems', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 2, 'Install Flashing Around Windows, Doors, Perimeter', 'Install metal flashing around all window/door openings and at building corners/edges. Overlap sheathing and ensure continuous path.', 'Install metal flashing around windows, doors, and corners. Make sure water runs down and away, not into the house.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.27.2', 'Ontario Building Code', 'Flashing continuous; overlapped properly; sealed at joints; directs water away; no gaps', 'Improper flashing is the #1 cause of water intrusion', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 3, 'Install Siding', 'Install exterior siding material (vinyl, fiber cement, wood, etc.) per manufacturer specs. Maintain proper overlap and fastening per code.', 'Install the siding according to the material type and manufacturer instructions. Overlap it properly so water runs down.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.27.1', 'Ontario Building Code', 'Siding installed per manufacturer spec; proper overlap; fastening per spec; not over-driven', 'Over-driven or misaligned siding causes water infiltration', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 4, 'Install Siding Trim (corners, windows, doors)', 'Install trim around windows, doors, and corners. Include corner posts, window/door casings, and edge trim. Ensure tight fit and overlap.', 'Install trim around window and door openings and at corners. Make sure all trim overlaps siding properly to shed water.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.27.3', 'Ontario Building Code', 'Trim installed per design; tight fit; proper overlap; fastening secure; no gaps', 'Loose trim or gaps allow water behind siding', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 5, 'Caulk All Siding Joints', 'Apply sealant (caulk) at all siding joints: corners, trim joints, expansion joints. Use appropriate sealant for material type.', 'Caulk all the seams and joints in the siding. This keeps water from getting in at the joints.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.27.4', 'Ontario Building Code', 'Caulk applied continuously; joint properly sealed; sealant compatible with siding material; smooth application', 'Missing or failed caulk allows water infiltration behind siding', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 6, 'Inspect Siding', 'Arrange inspector to verify siding installation per specification, proper overlap, all flashing installed, and weather-tight.', 'Have the inspector check the siding to make sure it''s installed correctly and all the flashing is in place.', TRUE, FALSE, FALSE, FALSE, 'OBC 9.27.4', 'Municipal Building Inspector', 'Siding per specification; flashing complete; overlap correct; caulk applied; no gaps; inspection approved', 'Proceeding with siding defects allows water damage', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 7, 'Install Soffit and Fascia (cornice)', 'Install fascia boards at roof edges, and soffit panels underneath with proper ventilation. Include gutters and drainage as needed.', 'Install the trim around the roof edge (fascia) and the underside panels (soffit). Make sure there''s ventilation for the attic.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.19.2', 'Ontario Building Code', 'Fascia secure and straight; soffit properly vented; connections sealed; no gaps or damage', 'Improper soffit/fascia installation allows water under roofline and pest entry', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 8, 'Inspect Cornice Work', 'Arrange inspector to verify fascia, soffit, and ventilation installation per code and design specifications.', 'Have the inspector verify the soffit and fascia are installed right and the attic ventilation is adequate.', TRUE, FALSE, FALSE, FALSE, 'OBC 9.19.2', 'Municipal Building Inspector', 'Soffit/fascia per design; ventilation adequate; connections sealed; workmanship acceptable; inspection approved', 'Poor soffit/fascia work causes ventilation problems and water damage', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 9, 'Arrange for Painter to Paint Trim', 'Coordinate with painting contractor to paint all exterior trim: fascia, soffits, trim boards, siding (if required). Use exterior grade paint.', 'Have the painter paint all the exterior trim, siding (if needed), and fascia. Use exterior paint rated for weather.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Paint applied to spec; coverage complete; color uniform; weatherproof application', 'Unpainted trim deteriorates quickly from weather exposure', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 10, 'Correct Problems After Shrinkage', 'After wood shrinkage occurs (30-60 days), re-caulk gaps that opened. Touch up paint. Tighten any loose trim or hardware.', 'After the house sits for a while and wood shrinks, re-caulk any gaps that opened up. Touch up paint where needed.', FALSE, FALSE, TRUE, TRUE, 'OBC 9.27.4', 'Ontario Building Code', 'Gaps re-caulked; paint touchup complete; trim tight and secure; final inspection approved', 'Uncorrected gaps and loose trim allow water infiltration', NOW())
)
SELECT 1;

-- ============================================================================
-- 17. INSULATION (IN) - 7 steps
-- ============================================================================

WITH sequence_insert AS (
  INSERT INTO public.execution_sequences (
    id, trade_type, name, description, region, source, is_public, is_verified, created_by_id, created_at
  ) VALUES (
    gen_random_uuid(),
    'IN',
    'Building Insulation',
    'Installation of wall, floor, attic, and acoustic insulation with proper vapor barriers and coverage for energy efficiency',
    'ON',
    'platform_template',
    TRUE,
    TRUE,
    NULL,
    NOW()
  )
  RETURNING id AS sequence_id
),
steps_insert AS (
  INSERT INTO public.sequence_steps (
    sequence_id, step_number, title, description, plain_language_summary, requires_inspection, requires_permit, is_milestone, triggers_payment, code_reference, authority_body, quality_criteria, skip_risk_description, created_at
  ) VALUES
  ((SELECT sequence_id FROM sequence_insert), 1, 'Determine Insulation Requirements (R-values by Climate Zone)', 'Review NBC §9.36.2.6 for above-ground and §9.36.2.8 for below-ground RSI values by climate zone (Zone 4-8 based on Heating Degree-Days per NBC Table C-2). Determine whether HRV/ERV is installed (changes required RSI values). Identify energy performance tier target (1-5) per §9.36.7.', 'Check the building code to determine what R-value (insulation strength) you need based on your climate zone. Ontario ranges from Zone 5-7 depending on location. If you have a heat-recovery ventilator, different values apply.', FALSE, FALSE, FALSE, FALSE, 'NBC 9.36.2.6', 'Ontario Building Code', 'RSI values specified per NBC climate zone (§9.36.2.6); HRV/ERV status confirmed (changes tables); energy tier target documented; thermal bridging accounted for (§9.36.2.5); energy modeling completed if performance path chosen', 'Inadequate insulation violates code; wrong climate zone lookup results in under-insulation', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 2, 'Install Wall Insulation (hand-pack nooks first)', 'Hand-pack insulation around electrical outlets, HVAC rough-in, and difficult corners. Then fill remainder of wall cavities with batts or blown-in.', 'Pack insulation carefully around corners, outlets, and pipes. Then fill all the wall cavities with batts or blow-in insulation.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.36.1', 'Ontario Building Code', 'Cavities fully filled; no voids around penetrations; proper vapor barrier placement; coverage uniform', 'Voids in insulation create thermal bridges and energy loss', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 3, 'Install Soundproofing', 'Install acoustic insulation between walls, around doors, and in areas needing sound control. Use sound-rated materials per plan.', 'If the plans call for soundproofing, install acoustic insulation between rooms that need privacy (bathrooms, bedrooms).', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Sound-rated insulation installed per design; all cavities filled; no air gaps; STC rating adequate', 'Missing soundproofing allows noise transmission between rooms', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 4, 'Install Floor Insulation', 'Insulate floor cavities if required: basement ceilings, crawl space floors, cantilevered overhangs. Use appropriate materials and R-value.', 'Insulate any floors that need it—like the basement ceiling or crawl space floor. Install with proper vapor barrier positioning.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.36.1', 'Ontario Building Code', 'Insulation installed to spec R-value; cavities fully filled; vapor barrier properly positioned; no compression', 'Compressed insulation loses effectiveness', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 5, 'Install Attic Insulation (batts or blown-in)', 'Install attic insulation per spec R-value using batts or blown-in material. Maintain clearance around recessed lights and exhaust vents.', 'Install insulation in the attic to the required thickness. Be careful not to cover recessed lights or vents—they need clearance.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.36.1', 'Ontario Building Code', 'Insulation to spec R-value thickness; coverage uniform; clearance maintained around lights/vents; vents unblocked', 'Covered recessed lights or vents cause overheating and fire hazard', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 6, 'Inspect Insulation and Air Barrier (vapor barrier, no gaps, no covered recessed lights)', 'Arrange inspector to verify: insulation coverage per RSI values (§9.36.2.6), continuity of insulation at junctions (§9.36.2.5), proper vapor barrier placement (§9.25.4), air barrier system continuity (§9.25.3), no gaps, no covered lights or vents. Note: this is one of the 21 mandatory OBC inspections (Division C §1.3.5: "Insulation & vapour barrier").', 'Have the inspector check that all insulation, vapor barriers, and air barriers are installed correctly. This is a mandatory inspection — you cannot proceed without it.', TRUE, FALSE, TRUE, FALSE, 'NBC 9.25.3', 'Municipal Building Inspector', 'RSI values met per climate zone (§9.36.2.6); air barrier continuous and sealed (§9.25.3); vapour barrier on warm side (§9.25.4); thermal bridging minimized (§9.36.2.5); recessed lights clear; vents unobstructed; mandatory OBC inspection passed', 'Proceeding without insulation inspection violates OBC Division C §1.3.5; air leaks cause moisture, energy loss, and comfort issues', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 7, 'Correct Insulation Work', 'Address any deficiencies: add insulation to under-filled areas, reposition vapor barriers, clear blocked vents, or add clearance around lights.', 'Fix any problems the inspector found. Add more insulation where needed, fix vapor barriers, or clear blocked vents.', FALSE, FALSE, TRUE, TRUE, 'OBC 9.36.1', 'Ontario Building Code', 'All deficiencies corrected; insulation coverage complete; vapor barriers secure; clearances adequate; re-inspection passed', 'Uncorrected insulation defects prevent achieving energy code compliance', NOW())
)
SELECT 1;

-- ============================================================================
-- 18. DRYWALL (DR) - 5 steps
-- ============================================================================

WITH sequence_insert AS (
  INSERT INTO public.execution_sequences (
    id, trade_type, name, description, region, source, is_public, is_verified, created_by_id, created_at
  ) VALUES (
    gen_random_uuid(),
    'DR',
    'Drywall Installation and Finishing',
    'Drywall hanging, taping, mud application, sanding, and finishing for smooth interior wall surfaces',
    'ON',
    'platform_template',
    TRUE,
    TRUE,
    NULL,
    NOW()
  )
  RETURNING id AS sequence_id
),
steps_insert AS (
  INSERT INTO public.sequence_steps (
    sequence_id, step_number, title, description, plain_language_summary, requires_inspection, requires_permit, is_milestone, triggers_payment, code_reference, authority_body, quality_criteria, skip_risk_description, created_at
  ) VALUES
  ((SELECT sequence_id FROM sequence_insert), 1, 'Hang Drywall on All Walls (metal edging on corners)', 'Install drywall sheets on all walls and ceilings. Use metal corner bead at corners. Tape seams with joint tape before mudding.', 'Screw drywall to studs. Install metal corner bead at all corners. Tape all seams with paper tape before applying mud.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.29.1', 'Ontario Building Code', 'Drywall properly fastened every 12-16 inches; metal bead at corners; tape applied to seams', 'Loose drywall causes nail pops and damage', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 2, 'Finish Drywall (3 coats mud + sand cycle)', 'Apply three coats of joint compound: first coat (embed tape), second coat (build up), finish coat (skim smooth). Sand between coats.', 'Apply mud in three coats. First coat embeds the tape, second coat builds thickness, third coat smooths it. Sand smooth between coats.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.29.2', 'Ontario Building Code', 'Three-coat system applied per spec; sand between coats; final surface smooth; no ridges or imperfections', 'Inadequate finishing leaves visible imperfections and tape shadows', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 3, 'Inspect Drywall (angle light test for imperfections)', 'Arrange inspector to verify drywall is smooth and properly finished. Use angled lighting to detect any imperfections or defects.', 'Have the inspector check the drywall finish with angled light. This shows any bumps, depressions, or imperfections that need fixing.', TRUE, FALSE, FALSE, FALSE, 'OBC 9.29.2', 'Ontario Building Code', 'Surface smooth to angled light inspection; no tape shadows; joints blended; imperfections minimal; acceptable finish', 'Poor drywall finish shows every light and shadow after painting', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 4, 'Touch Up and Repair Imperfect Areas', 'Sand high spots, fill low spots with compound, sand smooth. Repeat as needed until wall meets finish standard.', 'Fix any bumps, dips, or rough spots found in the inspection. Sand, fill, and sand again until it''s smooth.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.29.2', 'Ontario Building Code', 'All imperfections corrected; surface smooth; ready for paint; re-inspection passed', 'Uncorrected drywall imperfections show after painting', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 5, 'Mark Stud Locations on Floor Before Covering', 'Mark stud locations on floor and ceiling with chalk before covering with flooring/trim. This aids future installations and patching.', 'Mark where the studs are on the floor and ceiling with chalk or pencil before you cover them with flooring. This helps for future work.', FALSE, FALSE, TRUE, TRUE, NULL, NULL, 'Stud locations marked on floor; measurements documented; marks visible and legible', 'Unmarked studs make future fixture mounting difficult and damaging', NOW())
)
SELECT 1;

-- ============================================================================
-- 19. TRIM (TR) - 12 steps
-- ============================================================================

WITH sequence_insert AS (
  INSERT INTO public.execution_sequences (
    id, trade_type, name, description, region, source, is_public, is_verified, created_by_id, created_at
  ) VALUES (
    gen_random_uuid(),
    'TR',
    'Interior Trim and Millwork',
    'Installation of interior doors, windows trim, moldings, railings, hardware, and finish carpentry for complete interior',
    'ON',
    'platform_template',
    TRUE,
    TRUE,
    NULL,
    NOW()
  )
  RETURNING id AS sequence_id
),
steps_insert AS (
  INSERT INTO public.sequence_steps (
    sequence_id, step_number, title, description, plain_language_summary, requires_inspection, requires_permit, is_milestone, triggers_payment, code_reference, authority_body, quality_criteria, skip_risk_description, created_at
  ) VALUES
  ((SELECT sequence_id FROM sequence_insert), 1, 'Install Interior Doors (pre-hung)', 'Install all pre-hung interior doors in frames. Ensure plumb, level, and proper operation. Shim as needed and secure with nails/screws.', 'Install interior doors in their openings. Make sure they''re plumb and level and swing freely without hitting the frame.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Doors plumb and level; proper clearance; operation smooth; frames square and tight', 'Misaligned doors bind and won''t close properly', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 2, 'Install Window Casing and Aprons', 'Install interior window trim: side casing, top casing, and aprons (sills) at all interior windows. Miter or butt joints per design.', 'Install interior trim around windows. This makes the windows look finished and neat.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Casing installed plumb and level; joints mitered or butted cleanly; nail holes filled', 'Poor trim installation looks unprofessional', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 3, 'Install Trim Around Cased Openings', 'Install decorative trim around archways and open doorways. Create finished edges without doors using trim casings.', 'Install trim around any open doorways or archways to create a finished look.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Trim properly mitered or joined; plumb and level; nail holes filled; uniform width', 'Poor casing quality degrades interior appearance', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 4, 'Install Staircase Moulding (treads, risers, railings)', 'Install stair trim: tread noses, riser boards, and railings. Ensure railings meet code height and strength requirements.', 'Install the trim on stairs: treads, risers, and railings. Make sure railings are safe and meet building code.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.8.8', 'Ontario Building Code', 'Railing height 34-38 inches; spindle spacing per code; solid assembly; structural integrity verified', 'Weak railings are safety hazards; improper spacing allows child entrapment', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 5, 'Install Crown Moulding', 'Install crown molding at the junction of walls and ceiling. Miter or coped joints at corners. Install at consistent height.', 'Install decorative crown molding where walls meet the ceiling. Miter or cope the corners so they fit perfectly.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Crown installed at consistent height; joints tight; mitered or coped cleanly; level appearance', 'Uneven or gapped crown molding looks poor', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 6, 'Install Base and Base Cap Moulding', 'Install baseboard (base) at bottom of all walls, and base cap molding on top. Use consistent height and finish throughout.', 'Install baseboards along the bottom of walls. Add base cap molding on top if specified. Keep it all at the same height.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Baseboard level and consistent height; base cap aligned; joints tight; nail holes filled', 'Uneven baseboards detract from overall appearance', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 7, 'Install Picture Moulding', 'Install picture rails or picture molding on walls per design. Position at consistent height, secured to studs.', 'If the design calls for picture rails, install them at the specified height. This is decorative trim that holds artwork.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Picture molding level and consistent height throughout rooms; securely fastened; supports artwork weight', 'Weak installation cannot support artwork weight', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 8, 'Install Paneling', 'If specified in design, install wood or other paneling on walls. Ensure proper sealing/finishing per material type.', 'If the design includes wood paneling or other wall treatments, install them carefully and finish them properly.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Paneling installed plumb and level; joints tight; finish uniform; sealing complete', 'Loose or poorly finished paneling looks bad and deteriorates', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 9, 'Install Thresholds and Weather Stripping', 'Install door thresholds at exterior doors and weather stripping around all door frames for air sealing.', 'Install thresholds at exterior doors and weather stripping around doors to keep out drafts and water.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.25.1', 'Ontario Building Code', 'Thresholds installed level; weather stripping compressed evenly; seals tight; operation smooth', 'Missing weather stripping causes drafts and energy loss', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 10, 'Install Shoe Moulding After Flooring', 'After flooring is installed, install shoe molding at the base of all baseboards to conceal flooring edges and transitions.', 'After the flooring is done, install shoe molding to cover the gap between the baseboards and the floor.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Shoe molding installed tight to baseboard and floor; consistent height; neat appearance', 'Missing shoe molding looks unfinished', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 11, 'Install Door Hardware (knobs, deadbolts, stops)', 'Install all door hardware: interior knobs, exterior locksets, deadbolts, door stops, and hinges per specification.', 'Install door knobs, locks, deadbolts, and stops. Make sure they all work smoothly and are properly adjusted.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Hardware installed per spec; operation smooth; deadbolt extends fully; stops prevent wall damage', 'Improperly installed hardware damages doors and walls', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 12, 'Inspect Trim Work', 'Arrange inspector or conduct detailed walkthrough to verify all trim is installed, properly finished, and meets design specifications.', 'Have someone inspect all the trim to make sure it''s installed right and looks like the design. Check all the joints and finishes.', TRUE, FALSE, TRUE, TRUE, NULL, NULL, 'All trim installed per design; joints tight and well-finished; appearance professional; operation verified', 'Poor trim work detracts from the entire interior', NOW())
)
SELECT 1;

-- ============================================================================
-- 20. PAINTING (PT) - 9 steps
-- ============================================================================

WITH sequence_insert AS (
  INSERT INTO public.execution_sequences (
    id, trade_type, name, description, region, source, is_public, is_verified, created_by_id, created_at
  ) VALUES (
    gen_random_uuid(),
    'PT',
    'Interior and Exterior Painting',
    'Complete painting system from surface preparation through primer to finish coats on all interior and exterior surfaces',
    'ON',
    'platform_template',
    TRUE,
    TRUE,
    NULL,
    NOW()
  )
  RETURNING id AS sequence_id
),
steps_insert AS (
  INSERT INTO public.sequence_steps (
    sequence_id, step_number, title, description, plain_language_summary, requires_inspection, requires_permit, is_milestone, triggers_payment, code_reference, authority_body, quality_criteria, skip_risk_description, created_at
  ) VALUES
  ((SELECT sequence_id FROM sequence_insert), 1, 'Prepare All Surfaces', 'Clean all interior and exterior surfaces. Fill nail holes, sand rough spots, and caulk seams. Remove dust before priming.', 'Get all surfaces ready for paint. Fill holes, sand rough spots, caulk seams, and clean off all dust.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Surfaces cleaned; nail holes filled; gaps caulked; dust removed; primed within 48 hours of prep', 'Paint on dirty surfaces adheres poorly and looks bad', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 2, 'Prime and Caulk All Exterior Surfaces', 'Apply primer to all exterior surfaces. Apply caulk to joints and seams before primer application.', 'Caulk all exterior seams and joints. Then prime everything so the finish coat will stick and look even.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.27.5', 'Ontario Building Code', 'Primer applied per manufacturer spec; caulk cured before primer; coverage complete; no bare spots', 'Unprimed wood absorbs paint unevenly and fails to protect', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 3, 'Paint Exterior Siding, Trim, Shutters', 'Apply finish coat(s) to exterior siding, trim, windows, doors, and shutters. Use exterior grade paint rated for climate zone.', 'Paint the outside siding, trim, and shutters with exterior paint. Apply as many coats as needed for good coverage and color.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.27.5', 'Ontario Building Code', 'Finish coat(s) applied per spec; coverage uniform; color matches specification; weatherproof finish', 'Inadequate exterior paint allows water and UV damage', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 4, 'Paint Cornice Work', 'Apply finish coat to fascia, soffits, and other cornice trim to match exterior color scheme and protect from weather.', 'Paint the fascia, soffits, and cornice work with matching exterior paint. Make sure all surfaces are fully covered.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.27.5', 'Ontario Building Code', 'Cornice painted per spec; coverage complete; color uniform; weatherproof finish', 'Unpainted cornice deteriorates quickly from weather exposure', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 5, 'Paint Prime Coat on Ceilings, Walls, Trim', 'Apply primer to all interior ceilings, walls, and trim. Prime before any finish painting to ensure even coverage and durability.', 'Prime all interior walls, ceilings, and trim with primer. This helps the finish paint stick and cover evenly.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Primer applied per manufacturer spec; coverage complete; drying time observed before finish coat', 'Unprimed drywall absorbs paint unevenly, requiring extra coats', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 6, 'Paint or Stipple Ceilings', 'Apply ceiling paint or apply texture (stipple/popcorn) per design. Use low-VOC paint where specified. Apply finish coat with roller.', 'Paint the ceilings or apply texture if the design calls for it. Use appropriate equipment for even coverage.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Ceiling paint applied evenly; texture (if used) uniform; no drips or sags; coverage complete', 'Uneven ceiling paint shows drips and variations', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 7, 'Paint or Stain Trim, Cabinets, Doors', 'Apply finish paint or stain to interior trim, doors, and cabinetry per design and material specifications. Sand between coats.', 'Paint or stain doors, trim, and cabinets. Use paint or stain appropriate for the material and design finish.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Finish applied per spec; coverage uniform; color consistent; sheen appropriate; protected with topcoat', 'Poor trim finishing degrades interior appearance and durability', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 8, 'Inspect Paint Job for Touch-Up Spots', 'Conduct final paint inspection. Check for thin spots, drips, sags, color mismatches, or missed areas. Identify touch-up work.', 'Check all the paint carefully for any spots that need touching up. Look for thin areas, drips, or color mismatches.', TRUE, FALSE, FALSE, FALSE, NULL, NULL, 'Paint coverage complete and even; color uniform; no drips or sags; touch-up list prepared', 'Poor paint job becomes obvious after occupancy', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 9, 'Remove Paint from Windows', 'Clean excess paint from windows and glass surfaces. Remove tape, clean up drips, and achieve final clean appearance.', 'Clean paint off the windows and glass. Remove any tape and make sure windows look clean and professional.', FALSE, FALSE, TRUE, TRUE, NULL, NULL, 'Windows cleaned of paint drips; tape removed; final appearance professional; ready for glazing inspection', 'Paint residue on windows looks unprofessional', NOW())
)
SELECT 1;

-- ============================================================================
-- 21. FLOORING, TILE & GLAZING (FL) - 15 steps
-- ============================================================================

WITH sequence_insert AS (
  INSERT INTO public.execution_sequences (
    id, trade_type, name, description, region, source, is_public, is_verified, created_by_id, created_at
  ) VALUES (
    gen_random_uuid(),
    'FL',
    'Flooring, Tile, and Glazing Installation',
    'Complete flooring system including tile, hardwood, vinyl, and carpet with proper preparation, installation, and finishing',
    'ON',
    'platform_template',
    TRUE,
    TRUE,
    NULL,
    NOW()
  )
  RETURNING id AS sequence_id
),
steps_insert AS (
  INSERT INTO public.sequence_steps (
    sequence_id, step_number, title, description, plain_language_summary, requires_inspection, requires_permit, is_milestone, triggers_payment, code_reference, authority_body, quality_criteria, skip_risk_description, created_at
  ) VALUES
  ((SELECT sequence_id FROM sequence_insert), 1, 'Prepare Area for Tiling (sweep, nail squeaks)', 'Clean and prepare all surfaces for tile. Sweep clean, fix squeaky floors, and ensure substrate is smooth and level.', 'Prepare the floor for tile. Clean it, fix any squeaky spots, and make sure it''s smooth and level.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Substrate clean and free of squeaks; level within 1/8 inch per 10 feet; properly prepared', 'Squeaky floors defeat soundproofing; uneven substrate causes tile cracking', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 2, 'Install Tile Base in Shower Stalls', 'Install pre-formed or custom tile base in shower areas before wall tile. Ensure proper slope for drainage and watertight corners.', 'Install the curved tile base in shower areas before you tile the walls. Make sure it slopes toward the drain.', FALSE, FALSE, FALSE, FALSE, 'OBC 7.2.3', 'Ontario Building Code', 'Base installed with proper slope to drain; corner seals tight; substrate level and smooth', 'Poor shower base installation causes water leaks into walls', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 3, 'Apply Tile Adhesive', 'Apply thin-set or thick-set mortar to substrate using proper notched trowel. Ensure even coverage without voids for proper tile bond.', 'Spread tile adhesive on the substrate using the right trowel. Make sure there are no voids or high spots.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Adhesive applied with proper notch size; consistent coverage; no voids or air pockets', 'Hollow spots under tile cause cracking and movement', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 4, 'Install Tile and Marble Thresholds', 'Set tile, marble, or stone thresholds at doorways and transitions. Ensure proper height and secure bonding to substrate.', 'Install marble or tile thresholds at doorways to create finished transitions between different floor levels.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Thresholds level and properly bonded; height appropriate; edge transition smooth', 'Loose thresholds are tripping hazards', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 5, 'Inspect Tile', 'Inspect completed tile installation. Verify no lippage (uneven edges), proper grout joint spacing, and overall appearance.', 'Inspect the tile work. Check that all edges are even, grout lines are straight, and nothing is loose or cracked.', TRUE, FALSE, FALSE, FALSE, NULL, NULL, 'Tile even and level; no lippage; joints consistent; pattern correct; adhesive coverage confirmed', 'Crooked or loose tile becomes obvious and is expensive to fix', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 6, 'Seal Grout (after 3 weeks)', 'After grout has fully cured (typically 3 weeks), apply grout sealer to protect from moisture and staining.', 'Wait 3 weeks after the grout sets. Then apply grout sealer to protect it from water and stains.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Sealer applied after full cure; coverage complete; excess wiped clean', 'Unsealed grout absorbs moisture and stains', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 7, 'Install Hardwood Flooring (acclimate first)', 'Allow hardwood to acclimate to room humidity for 2-4 weeks before installation. Install per manufacturer specs with proper expansion gap.', 'Let hardwood flooring sit in the room for a few weeks before installing it so it adjusts to humidity. Then install it carefully.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.35.1', 'Ontario Building Code', 'Wood acclimated per manufacturer spec; proper expansion gap at walls (1/2-3/4 inch); installed per spec', 'Improper acclimation causes cupping, crowning, or gaps', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 8, 'Sand Hardwood Flooring', 'Sand hardwood floor with appropriate grit progression (36-80-120+ grit). Creates smooth surface for staining.', 'Sand the hardwood floor with progressively finer sandpaper. Start rough, then smooth. This prepares it for staining.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.35.1', 'Ontario Building Code', 'Sanding complete with proper grit progression; surface smooth; dust removed; ready for stain', 'Poor sanding preparation shows in final stain appearance', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 9, 'Stain and Seal Hardwood', 'Apply stain per design color. Apply finish coat (polyurethane) per manufacturer specs. Sand between coats for proper adhesion.', 'Stain the hardwood to the desired color. Then apply protective sealer. Sand between coats if needed.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.35.2', 'Ontario Building Code', 'Stain applied uniformly per color specification; sealer applied per manufacturer spec; protection complete', 'Uneven staining or weak sealer looks poor and wears quickly', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 10, 'Inspect Hardwood', 'Inspect hardwood flooring for color uniformity, proper seal application, absence of scratches, and overall quality.', 'Check the hardwood floor for color uniformity, proper sealing, and no damage or scratches.', TRUE, FALSE, FALSE, FALSE, 'OBC 9.35.2', 'Municipal Building Inspector', 'Hardwood appearance uniform; seal coverage adequate; protection effective; no major defects', 'Damaged hardwood is expensive to repair', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 11, 'Install Vinyl Floor Covering', 'Install vinyl sheet or tile flooring per manufacturer specifications. Ensure proper seaming, adhesion, and seamless appearance.', 'Install vinyl flooring in the designed areas. Make sure seams are sealed and it''s firmly adhered.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.35.1', 'Ontario Building Code', 'Vinyl installed per manufacturer spec; seams sealed; adhesion complete; no bubbles or wrinkles', 'Improper vinyl installation causes wrinkles and separates', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 12, 'Inspect Vinyl', 'Inspect vinyl flooring for proper seaming, adhesion, appearance, and absence of bubbles, wrinkles, or defects.', 'Check the vinyl floor. Make sure seams are sealed, it''s stuck down, and there are no bubbles or wrinkles.', TRUE, FALSE, FALSE, FALSE, 'OBC 9.35.1', 'Municipal Building Inspector', 'Vinyl properly adhered; seams sealed; no wrinkles or bubbles; appearance professional', 'Loose vinyl is a tripping hazard', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 13, 'Install Carpet Padding and Stretcher Strips', 'Install tack strips around perimeter of carpet areas. Install padding over tack strips, properly fitted to room dimensions.', 'Install metal strips around the edges of the room, then lay down carpet padding stretched tight and secure.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.35.1', 'Ontario Building Code', 'Tack strips properly positioned at perimeter; padding stretched tight; no wrinkles; seams sealed', 'Loose padding causes wrinkles and accelerated wear', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 14, 'Install Carpet (use stretcher)', 'Install carpet using power stretcher for proper tension. Seam pieces appropriately, cut precisely at edges, and secure at tack strips.', 'Install the carpet using a power stretcher to pull it tight and eliminate wrinkles. Seam and cut edges carefully.', FALSE, FALSE, FALSE, FALSE, 'OBC 9.35.1', 'Ontario Building Code', 'Carpet stretched with power stretcher; seams hidden; edges secured at tack strips; no wrinkles; pattern aligned', 'Improperly stretched carpet wrinkles and wears prematurely', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 15, 'Inspect Carpet', 'Inspect carpet installation for proper stretch, seam quality, secure edge bonding, appearance, and absence of defects.', 'Check the carpet. Make sure it''s stretched tight with no wrinkles, seams are hidden, and edges are secure.', TRUE, FALSE, TRUE, TRUE, 'OBC 9.35.1', 'Municipal Building Inspector', 'Carpet properly stretched with no wrinkles; seams hidden; edges secure at tack strips; appearance professional', 'Wrinkled or loose carpet is a tripping hazard and wears quickly', NOW())
)
SELECT 1;

-- ============================================================================
-- 22. LANDSCAPING (LD) - 14 steps
-- ============================================================================

WITH sequence_insert AS (
  INSERT INTO public.execution_sequences (
    id, trade_type, name, description, region, source, is_public, is_verified, created_by_id, created_at
  ) VALUES (
    gen_random_uuid(),
    'LD',
    'Landscape Development and Finishing',
    'Site landscaping including grading, soil preparation, plantings, irrigation, and lawn establishment for complete property finalization',
    'ON',
    'platform_template',
    TRUE,
    TRUE,
    NULL,
    NOW()
  )
  RETURNING id AS sequence_id
),
steps_insert AS (
  INSERT INTO public.sequence_steps (
    sequence_id, step_number, title, description, plain_language_summary, requires_inspection, requires_permit, is_milestone, triggers_payment, code_reference, authority_body, quality_criteria, skip_risk_description, created_at
  ) VALUES
  ((SELECT sequence_id FROM sequence_insert), 1, 'Evaluate Lot (trees, drainage, slopes, sun exposure)', 'Assess existing site conditions: trees to preserve, drainage patterns, slopes, sun exposure (north/south). Document in base plan.', 'Look at your lot and note any trees, slopes, wet areas, and how much sun different areas get. This guides your landscaping plan.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Lot assessment documented; site conditions photographed; drainage patterns identified', 'Ignoring lot conditions causes drainage and landscape failure', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 2, 'Develop Site Plan', 'Create landscape design including hardscaping (driveway, patio, walkways), plantings, and drainage. Coordinate with house position.', 'Design the landscape—where paths, patios, and plants will go. Make sure it all relates properly to the house and drains well.', FALSE, FALSE, FALSE, FALSE, 'OBC 4.1.2', 'Ontario Building Code', 'Landscape design completed; grading plan shows drainage; plantings specified; drainage verified', 'Poor landscape design causes water problems and dead plants', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 3, 'Finalize Site Plan and Submit to Officials', 'Finalize landscape design and submit to municipal authorities for approval if required. Obtain any necessary permits.', 'Finalize the landscape plan and get approval from the city if needed. Make sure it complies with any local requirements.', FALSE, TRUE, FALSE, FALSE, 'OBC 4.1.2', 'Municipal Public Works Department', 'Landscape plan submitted; approval obtained; permits issued if required; signed plan filed', 'Unapproved landscaping may violate municipal standards', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 4, 'Conduct Soil Tests (pH, nutrients)', 'Test soil for pH, nutrient levels, and composition. Adjust based on test results and planned plantings.', 'Test the soil to see what nutrients and pH it needs. Adjust it based on the test results for better plant growth.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Soil test completed; pH and nutrient levels documented; amendments specified per test results', 'Unbalanced soil prevents healthy plant growth', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 5, 'Till Soil and Add Conditioners', 'Till existing soil and incorporate compost, peat, or other soil amendments per test recommendations and planting requirements.', 'Till the soil and mix in compost and amendments. This improves soil quality for plants.', FALSE, FALSE, FALSE, FALSE, 'OBC 4.1.2', 'Ontario Building Code', 'Soil tilled and conditioned per spec; amendments incorporated; depth 6-12 inches; soil ready for planting', 'Poor soil preparation results in poor plant establishment', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 6, 'Install Underground Sprinkling System', 'Install underground irrigation system if specified. Lay pipes, install heads, and zone system for efficient water delivery.', 'Install the underground sprinkler system with proper zones so each area gets the right amount of water.', FALSE, FALSE, FALSE, FALSE, 'OBC 4.1.2', 'Ontario Building Code', 'Irrigation system installed per design; proper spacing and coverage; zones functional; efficient operation', 'Poor irrigation coverage results in dry spots and water waste', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 7, 'Plant Flower Bulbs', 'Plant spring bulbs (tulips, daffodils, crocus) in designated areas at proper depth and spacing. Mulch for protection.', 'Plant spring flower bulbs in the areas where you want color. Plant at the right depth so they come up in spring.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Bulbs planted at proper depth per species; spacing correct; mulch protection applied; locations documented', 'Shallow planting results in bulb exposure and failure', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 8, 'Apply Seed or Sod', 'Install seed (if in budget) or sod for lawn areas. Prepare seedbed, water well. Sod must be rolled and watered immediately.', 'Plant the lawn with seed or sod. If using sod, roll it down and water immediately. If seed, water it well.', FALSE, FALSE, FALSE, FALSE, 'OBC 4.1.2', 'Ontario Building Code', 'Seed or sod applied per specification; seedbed prepared; initial watering complete; establishment documented', 'Poor seeding/sodding practices result in thin, patchy lawns', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 9, 'Soak Lawn / Water New Growth', 'Water lawn daily or as needed to establish seed/sod. Maintain consistent moisture without overwatering. Continue for 4-8 weeks.', 'Water the lawn every day to help it establish. Don''t overwater—keep it moist but not soggy.', FALSE, FALSE, FALSE, FALSE, 'OBC 4.1.2', 'Ontario Building Code', 'Watering schedule established; consistent moisture maintained; no overwatering; grass establishes properly', 'Irregular watering results in poor establishment and dead spots', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 10, 'Install Bushes and Trees (4ft from driveway)', 'Plant shrubs and trees in designated locations per design. Ensure proper spacing from structures. Plant at proper depth with stake support.', 'Plant trees and bushes in the landscape. Keep them 4 feet from the driveway and house. Stake trees for support.', FALSE, FALSE, FALSE, FALSE, 'OBC 4.1.2', 'Ontario Building Code', 'Plants installed per design; spacing correct; planted at proper depth; staked if needed; mulched', 'Improper planting depth or location causes plant failure', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 11, 'Prepare Landscaped Islands (mulch, bark)', 'Create planting beds with proper mulch, bark, or ground cover around plantings. Maintain defined edges and appropriate depth.', 'Prepare landscaping beds around plants. Add mulch or bark to define areas and keep weeds down.', FALSE, FALSE, FALSE, FALSE, 'OBC 4.1.2', 'Ontario Building Code', 'Landscaping beds defined; mulch 2-4 inches deep; edges maintained; appearance professional', 'Undefined landscaping areas look unfinished and allow weed growth', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 12, 'Install Mailbox', 'Install mail delivery box at lot frontage per postal service requirements. Ensure proper positioning and secure mounting.', 'Install the mailbox at the street according to the postal service requirements. Make sure it''s secure and the right height.', FALSE, FALSE, FALSE, FALSE, NULL, NULL, 'Mailbox installed per postal service spec; proper height and position; secure mounting; accessible delivery', 'Improper mailbox installation fails to meet postal service requirements', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 13, 'Inspect Landscaping', 'Conduct final landscape inspection. Verify all plantings, irrigation, grading, and drainage function as designed.', 'Check the landscape to make sure everything is planted right, the irrigation works, and the grading is good.', TRUE, FALSE, TRUE, FALSE, 'OBC 4.1.2', 'Municipal Building Department', 'Plantings healthy and established; irrigation functional; grading proper; drainage working; appearance professional', 'Poor landscaping requires rework and replanting', NOW()),
  ((SELECT sequence_id FROM sequence_insert), 14, 'Correct Problems and Establish Lawn', 'Address any punch-list items: replant dead plants, adjust irrigation, fix drainage issues, reseed thin lawn areas.', 'Fix any problems. Replace dead plants, adjust watering, fix drainage, or reseed any thin areas.', FALSE, FALSE, TRUE, TRUE, 'OBC 4.1.2', 'Ontario Building Code', 'All deficiencies corrected; plants established; lawn healthy; irrigation optimized; final approval obtained', 'Uncorrected landscape defects prevent proper establishment', NOW())
)
SELECT 1;

-- ============================================================================
-- Link execution_sequences to their compliance_rulesets by trade_type + region
-- ============================================================================
UPDATE execution_sequences es
SET ruleset_id = cr.id
FROM compliance_rulesets cr
WHERE es.trade_type = cr.trade_type
  AND COALESCE(es.region, 'ON') = cr.region
  AND es.source = 'platform_template'
  AND cr.is_active = TRUE;

COMMIT;
