-- =============================================================================
-- Seed categories
-- =============================================================================
INSERT INTO categories (id, name, slug, icon, description, is_active, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Painting', 'painting', 'brush', 'Interior and exterior painting services', TRUE, 1),
  ('a1000000-0000-0000-0000-000000000002', 'Moving', 'moving', 'truck', 'Residential and commercial moving services', TRUE, 2),
  ('a1000000-0000-0000-0000-000000000003', 'Snow Removal', 'snow-removal', 'snowflake', 'Driveway and walkway snow clearing', TRUE, 3),
  ('a1000000-0000-0000-0000-000000000004', 'Cleaning', 'cleaning', 'sparkles', 'Residential and commercial cleaning', TRUE, 4),
  ('a1000000-0000-0000-0000-000000000005', 'Furniture Assembly', 'furniture-assembly', 'wrench', 'Assemble and install furniture', TRUE, 5),
  ('a1000000-0000-0000-0000-000000000006', 'Plumbing', 'plumbing', 'droplet', 'Plumbing repair and installation', TRUE, 6),
  ('a1000000-0000-0000-0000-000000000007', 'Electrical', 'electrical', 'zap', 'Electrical repair and installation', TRUE, 7),
  ('a1000000-0000-0000-0000-000000000008', 'Landscaping', 'landscaping', 'leaf', 'Lawn care and landscaping services', TRUE, 8),
  ('a1000000-0000-0000-0000-000000000009', 'Handyman', 'handyman', 'hammer', 'General handyman and repair services', TRUE, 9),
  ('a1000000-0000-0000-0000-000000000010', 'General Labor', 'general-labor', 'hard-hat', 'General labor and physical tasks', TRUE, 10);

-- =============================================================================
-- Painting material templates
-- =============================================================================
INSERT INTO material_templates (category_id, material_name, unit, formula, default_quantity, is_required, estimated_unit_price, notes, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Interior Latex Paint', 'gallon',
   'Math.ceil(details.squareFootage / 350)',
   1.00, TRUE, 45.00,
   'One gallon covers approximately 350 sq ft with one coat. Multiply by number of coats.', 1),

  ('a1000000-0000-0000-0000-000000000001', 'Primer', 'gallon',
   'Math.ceil(details.squareFootage / 300)',
   1.00, TRUE, 35.00,
   'Required for bare surfaces, dark-to-light color changes, and stain blocking.', 2),

  ('a1000000-0000-0000-0000-000000000001', 'Painter''s Tape', 'roll',
   'Math.ceil(details.squareFootage / 200)',
   2.00, TRUE, 8.50,
   'Blue painter''s tape for clean edges. One roll covers roughly 200 sq ft of wall area.', 3),

  ('a1000000-0000-0000-0000-000000000001', 'Drop Cloth (9x12)', 'piece',
   'Math.ceil(details.numberOfRooms)',
   1.00, TRUE, 15.00,
   'One drop cloth per room to protect floors and furniture.', 4),

  ('a1000000-0000-0000-0000-000000000001', 'Roller Cover (3-pack)', 'pack',
   'Math.ceil(details.numberOfRooms / 2)',
   1.00, TRUE, 12.00,
   'Use 3/8" nap for smooth walls, 1/2" for semi-smooth, 3/4" for textured.', 5),

  ('a1000000-0000-0000-0000-000000000001', 'Paint Tray', 'piece',
   '1',
   1.00, FALSE, 6.00,
   'Reusable plastic tray with disposable liners.', 6),

  ('a1000000-0000-0000-0000-000000000001', 'Angled Brush (2.5")', 'piece',
   'Math.ceil(details.numberOfRooms / 3)',
   1.00, TRUE, 14.00,
   'For cutting in around edges, corners, and trim work.', 7),

  ('a1000000-0000-0000-0000-000000000001', 'Sandpaper (220-grit)', 'sheet',
   'Math.ceil(details.squareFootage / 100)',
   5.00, FALSE, 1.50,
   'For light sanding between coats and surface preparation.', 8),

  ('a1000000-0000-0000-0000-000000000001', 'Caulk (paintable)', 'tube',
   'Math.ceil(details.numberOfRooms * 0.5)',
   1.00, FALSE, 7.00,
   'Fill gaps around trim, baseboards, and window frames before painting.', 9),

  ('a1000000-0000-0000-0000-000000000001', 'Exterior Paint', 'gallon',
   'Math.ceil(details.squareFootage / 250)',
   1.00, FALSE, 55.00,
   'Weather-resistant exterior paint. One gallon covers about 250 sq ft on rough surfaces.', 10);

-- =============================================================================
-- Moving material templates
-- =============================================================================
INSERT INTO material_templates (category_id, material_name, unit, formula, default_quantity, is_required, estimated_unit_price, notes, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000002', 'Medium Moving Box', 'box',
   'Math.ceil(details.numberOfRooms * 8)',
   10.00, TRUE, 3.50,
   '18x18x16 inch boxes for books, kitchenware, and general items.', 1),

  ('a1000000-0000-0000-0000-000000000002', 'Large Moving Box', 'box',
   'Math.ceil(details.numberOfRooms * 5)',
   5.00, TRUE, 4.50,
   '24x18x18 inch boxes for bedding, pillows, and lightweight bulky items.', 2),

  ('a1000000-0000-0000-0000-000000000002', 'Wardrobe Box', 'box',
   'Math.ceil(details.numberOfClosets)',
   1.00, FALSE, 15.00,
   'Tall boxes with built-in hanging bar for clothing on hangers.', 3),

  ('a1000000-0000-0000-0000-000000000002', 'Packing Tape', 'roll',
   'Math.ceil((details.numberOfRooms * 13) / 15)',
   3.00, TRUE, 5.00,
   'Heavy-duty tape for securing box bottoms and tops. One roll seals about 15 boxes.', 4),

  ('a1000000-0000-0000-0000-000000000002', 'Bubble Wrap', 'roll',
   'Math.ceil(details.numberOfRooms * 0.5)',
   1.00, TRUE, 25.00,
   'For wrapping fragile items like dishes, glasses, and electronics.', 5),

  ('a1000000-0000-0000-0000-000000000002', 'Furniture Blanket', 'piece',
   'Math.ceil(details.numberOfLargeItems * 1.5)',
   4.00, TRUE, 12.00,
   'Padded blankets to protect furniture from scratches during transport.', 6),

  ('a1000000-0000-0000-0000-000000000002', 'Stretch Wrap', 'roll',
   'Math.ceil(details.numberOfLargeItems / 5)',
   1.00, TRUE, 18.00,
   'Cling film for bundling items together and protecting upholstered furniture.', 7),

  ('a1000000-0000-0000-0000-000000000002', 'Mattress Bag', 'bag',
   'details.numberOfBeds || 1',
   1.00, FALSE, 10.00,
   'Plastic cover to keep mattresses clean during move. Size per bed size.', 8),

  ('a1000000-0000-0000-0000-000000000002', 'Furniture Dolly Rental', 'day',
   '1',
   1.00, FALSE, 20.00,
   'Four-wheel dolly for moving heavy furniture and appliances.', 9),

  ('a1000000-0000-0000-0000-000000000002', 'Packing Paper (25 lb)', 'bundle',
   'Math.ceil(details.numberOfRooms / 3)',
   1.00, TRUE, 30.00,
   'Unprinted newsprint for wrapping dishes and filling box voids.', 10);

-- =============================================================================
-- Snow Removal material templates
-- =============================================================================
INSERT INTO material_templates (category_id, material_name, unit, formula, default_quantity, is_required, estimated_unit_price, notes, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000003', 'Rock Salt (Ice Melt)', 'bag (50lb)',
   'Math.ceil(details.areaSqFt / 1000)',
   1.00, TRUE, 18.00,
   'Standard rock salt for de-icing driveways and walkways. One bag treats ~1000 sq ft.', 1),

  ('a1000000-0000-0000-0000-000000000003', 'Calcium Chloride Pellets', 'bag (50lb)',
   'Math.ceil(details.areaSqFt / 1500)',
   1.00, FALSE, 35.00,
   'Effective down to -25F. Less damaging to concrete than rock salt.', 2),

  ('a1000000-0000-0000-0000-000000000003', 'Sand/Grit Mix', 'bag (50lb)',
   'Math.ceil(details.areaSqFt / 500)',
   1.00, FALSE, 8.00,
   'Provides traction on icy surfaces. Does not melt ice.', 3),

  ('a1000000-0000-0000-0000-000000000003', 'Snow Stakes/Markers', 'piece',
   'Math.ceil(details.drivewayLengthFt / 10)',
   4.00, FALSE, 3.00,
   'Fiberglass markers to outline driveway edges hidden under snow.', 4),

  ('a1000000-0000-0000-0000-000000000003', 'Fuel (Snow Blower)', 'litre',
   'Math.ceil(details.areaSqFt / 2000)',
   5.00, FALSE, 2.00,
   'Gasoline for snow blower operation. Usage depends on snow depth and density.', 5);

-- =============================================================================
-- Cleaning material templates
-- =============================================================================
INSERT INTO material_templates (category_id, material_name, unit, formula, default_quantity, is_required, estimated_unit_price, notes, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000004', 'All-Purpose Cleaner', 'bottle',
   'Math.ceil(details.squareFootage / 800)',
   1.00, TRUE, 6.00,
   'Concentrated all-purpose spray cleaner for counters, walls, and surfaces.', 1),

  ('a1000000-0000-0000-0000-000000000004', 'Glass Cleaner', 'bottle',
   'Math.ceil(details.numberOfWindows / 15)',
   1.00, TRUE, 5.00,
   'Streak-free formula for windows, mirrors, and glass surfaces.', 2),

  ('a1000000-0000-0000-0000-000000000004', 'Bathroom Disinfectant', 'bottle',
   'details.numberOfBathrooms',
   1.00, TRUE, 7.00,
   'Heavy-duty disinfectant for toilet, tub, and tile surfaces.', 3),

  ('a1000000-0000-0000-0000-000000000004', 'Microfiber Cloths', 'pack (12)',
   'Math.ceil(details.numberOfRooms / 4)',
   1.00, TRUE, 15.00,
   'Reusable lint-free cloths for dusting, wiping, and polishing.', 4),

  ('a1000000-0000-0000-0000-000000000004', 'Mop Pads (Reusable)', 'pack (3)',
   'Math.ceil(details.squareFootage / 1500)',
   1.00, TRUE, 12.00,
   'Machine-washable pads for flat mops. One pad covers about 500 sq ft.', 5),

  ('a1000000-0000-0000-0000-000000000004', 'Trash Bags (30 gallon)', 'box (25)',
   'Math.ceil(details.numberOfRooms / 5)',
   1.00, TRUE, 10.00,
   'Heavy-duty bags for collecting waste during deep cleaning.', 6),

  ('a1000000-0000-0000-0000-000000000004', 'Floor Cleaner Concentrate', 'bottle',
   'Math.ceil(details.squareFootage / 2000)',
   1.00, FALSE, 9.00,
   'Concentrated formula diluted in water for mopping hard floors.', 7),

  ('a1000000-0000-0000-0000-000000000004', 'Scrub Sponges', 'pack (6)',
   'Math.ceil(details.numberOfBathrooms + details.numberOfKitchens)',
   1.00, FALSE, 5.00,
   'Non-scratch sponges for tough stains on sinks, tubs, and counters.', 8),

  ('a1000000-0000-0000-0000-000000000004', 'Vacuum Bags/Filters', 'pack',
   '1',
   1.00, FALSE, 15.00,
   'Replacement bags or filters for vacuum cleaners used during deep clean.', 9);

-- =============================================================================
-- Furniture Assembly material templates
-- =============================================================================
INSERT INTO material_templates (category_id, material_name, unit, formula, default_quantity, is_required, estimated_unit_price, notes, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000005', 'Wood Screws Assortment', 'kit',
   'Math.ceil(details.numberOfItems / 5)',
   1.00, FALSE, 12.00,
   'Assorted sizes of common wood screws for replacements and reinforcement.', 1),

  ('a1000000-0000-0000-0000-000000000005', 'Wall Anchors Kit', 'kit',
   'Math.ceil(details.numberOfWallMounts)',
   1.00, FALSE, 10.00,
   'Drywall anchors and toggle bolts for secure wall mounting of shelves and units.', 2),

  ('a1000000-0000-0000-0000-000000000005', 'Wood Glue', 'bottle',
   '1',
   1.00, FALSE, 8.00,
   'For reinforcing joints and dowel connections in assembled furniture.', 3),

  ('a1000000-0000-0000-0000-000000000005', 'Furniture Felt Pads', 'pack (40)',
   'Math.ceil(details.numberOfItems)',
   1.00, FALSE, 6.00,
   'Self-adhesive pads to protect floors from furniture scratches.', 4),

  ('a1000000-0000-0000-0000-000000000005', 'Cable Management Kit', 'kit',
   'Math.ceil(details.numberOfDesks + details.numberOfTvStands)',
   1.00, FALSE, 15.00,
   'Clips, ties, and channels for organizing cables behind desks and entertainment centers.', 5),

  ('a1000000-0000-0000-0000-000000000005', 'Anti-Tip Furniture Straps', 'pair',
   'Math.ceil(details.numberOfTallItems)',
   1.00, FALSE, 9.00,
   'Safety straps to anchor tall bookcases and dressers to the wall.', 6),

  ('a1000000-0000-0000-0000-000000000005', 'Level (Torpedo)', 'piece',
   '1',
   1.00, FALSE, 10.00,
   'Small spirit level for ensuring shelves and wall mounts are perfectly straight.', 7);
