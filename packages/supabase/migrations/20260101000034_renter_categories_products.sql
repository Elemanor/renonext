-- Migration 034: Renter-friendly product categories + 27 seed products
-- Focus: No-drill, no-damage products for rental apartments

-- ── New renter-focused categories (replace old construction ones for now) ──
INSERT INTO shop_categories (slug, name, description, icon, sort_order) VALUES
  ('no-drill-bathroom', 'No-Drill Bathroom', 'Suction cup, adhesive, and hook-mount bathroom accessories — zero holes, zero damage.', 'bathroom', 1),
  ('no-drill-kitchen', 'No-Drill Kitchen', 'Magnetic, adhesive, and over-cabinet kitchen organizers that install in seconds.', 'kitchen', 2),
  ('no-drill-storage', 'No-Drill Storage', 'Tension rods, hanging organizers, and stackable solutions — no tools needed.', 'shelves', 3),
  ('no-drill-decor', 'No-Drill Decor', 'LED lights, peel-and-stick tiles, removable wallpaper, and damage-free wall art.', 'palette', 4)
ON CONFLICT (slug) DO NOTHING;

-- ══════════════════════════════════════════════════════════════════
-- NO-DRILL BATHROOM (8 products)
-- ══════════════════════════════════════════════════════════════════

-- 1. Suction Cup Shower Caddy
INSERT INTO shop_products (
  slug, name, category_id, description, short_description,
  price_cents, currency, images, status, featured, tags, specs, stock_status
) VALUES (
  'suction-cup-shower-caddy-2-tier',
  '2-Tier Suction Cup Shower Caddy',
  (SELECT id FROM shop_categories WHERE slug = 'no-drill-bathroom'),
  E'## Keep Your Shower Organized — No Drilling Required\n\nThis 2-tier corner shower shelf mounts with powerful suction cups on any smooth surface. Holds shampoo, conditioner, body wash, and razors without taking up floor space.\n\n### Features\n- **2 spacious tiers** — fits full-size bottles\n- **Rust-proof stainless steel** — built for wet environments\n- **Drainage holes** — no standing water\n- **Repositionable** — move it anytime, no marks left\n- **Holds 15 lbs** — strong enough for heavy bottles\n\n### Installation\n1. Clean the surface with rubbing alcohol\n2. Press suction cups firmly against smooth tile or glass\n3. Lock the lever — done in 30 seconds',
  '2-tier corner shower shelf with powerful suction cups. Rust-proof stainless steel. Holds 15 lbs. No drilling.',
  0, 'CAD',
  ARRAY['https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=800&fit=crop'],
  'active', true,
  ARRAY['no-drilling', 'suction-cup', 'shower', 'caddy', 'bathroom', 'rental-friendly', 'organizer'],
  '{"Material": "304 Stainless Steel", "Installation": "Vacuum Suction Cups", "Tiers": "2", "Weight Capacity": "15 lbs (7 kg)", "Color": "Chrome / Matte Black", "Surface": "Smooth tile, glass, marble", "Drainage": "Built-in drain holes"}',
  'in_stock'
);

-- 2. Adhesive Towel Bar
INSERT INTO shop_products (
  slug, name, category_id, description, short_description,
  price_cents, currency, images, status, featured, tags, specs, stock_status
) VALUES (
  'adhesive-towel-bar-stainless-steel',
  'Self-Adhesive Towel Bar — Stainless Steel',
  (SELECT id FROM shop_categories WHERE slug = 'no-drill-bathroom'),
  E'## A Real Towel Bar — Without a Single Screw\n\nThis adhesive-mounted towel bar looks and functions exactly like a drilled one. Strong 3M VHB adhesive holds up to 20 lbs on smooth surfaces.\n\n### Features\n- **Brushed stainless steel** finish\n- **20 lb capacity** — holds bath towels and robes\n- **3M VHB adhesive** — industrial-strength, removable\n- **16" wide** — standard towel bar size\n- **Clean removal** — leaves no residue when removed with heat\n\n### Perfect For\n- Rental bathrooms\n- Behind the bathroom door\n- Kitchen towel bar',
  'Self-adhesive towel bar, brushed stainless steel. Holds 20 lbs. No drilling, clean removal. 16" wide.',
  0, 'CAD',
  ARRAY['https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&h=800&fit=crop'],
  'active', false,
  ARRAY['no-drilling', 'adhesive', 'towel-bar', 'bathroom', 'stainless-steel', 'rental-friendly'],
  '{"Material": "304 Stainless Steel", "Installation": "3M VHB Adhesive", "Width": "16 inches", "Weight Capacity": "20 lbs (9 kg)", "Color": "Brushed Nickel", "Surface": "Smooth tile, glass, painted wall"}',
  'in_stock'
);

-- 3. Suction Cup Razor Holder
INSERT INTO shop_products (
  slug, name, category_id, description, short_description,
  price_cents, currency, images, status, featured, tags, specs, stock_status
) VALUES (
  'suction-cup-razor-holder-shower',
  'Suction Cup Razor Holder — Shower Mount',
  (SELECT id FROM shop_categories WHERE slug = 'no-drill-bathroom'),
  E'## Stop Leaving Your Razor on the Shower Floor\n\nSmall, discreet holder that sticks to any smooth shower surface. Keeps your razor blade dry between uses — extending blade life by 2-3x.\n\n### Features\n- **Fits all standard razors** — Gillette, Schick, Harry''s, Dollar Shave Club\n- **Suction cup mount** — installs in 2 seconds\n- **Keeps blade dry** — extends razor life significantly\n- **Chrome finish** — matches any bathroom hardware',
  'Shower-mounted razor holder with suction cup. Fits all standard razors. Keeps blades dry. Chrome finish.',
  0, 'CAD',
  ARRAY['https://images.unsplash.com/photo-1585412727339-54e8681ef5d9?w=800&h=800&fit=crop'],
  'active', false,
  ARRAY['no-drilling', 'suction-cup', 'razor', 'shower', 'bathroom', 'rental-friendly'],
  '{"Material": "ABS Plastic + Chrome", "Installation": "Suction Cup", "Compatibility": "All standard razors", "Color": "Chrome", "Weight Capacity": "1 lb"}',
  'in_stock'
);

-- 4. Adhesive Toilet Paper Holder
INSERT INTO shop_products (
  slug, name, category_id, description, short_description,
  price_cents, currency, images, status, featured, tags, specs, stock_status
) VALUES (
  'adhesive-toilet-paper-holder-matte-black',
  'Adhesive Toilet Paper Holder — Matte Black',
  (SELECT id FROM shop_categories WHERE slug = 'no-drill-bathroom'),
  E'## Looks Drilled. Isn''t.\n\nThis wall-mounted toilet paper holder uses strong adhesive backing to mount on smooth surfaces. The matte black finish gives it a premium, modern look.\n\n### Features\n- **Spring-loaded roll bar** — easy one-hand roll changes\n- **Matte black finish** — modern and stylish\n- **Adhesive mount** — 3M adhesive strips included\n- **Holds standard & jumbo rolls**\n- **SUS304 stainless steel** — rust-proof',
  'Wall-mounted toilet paper holder with adhesive backing. Matte black stainless steel. Holds standard & jumbo rolls.',
  0, 'CAD',
  ARRAY['https://images.unsplash.com/photo-1585412727339-54e8681ef5d9?w=800&h=800&fit=crop'],
  'active', false,
  ARRAY['no-drilling', 'adhesive', 'toilet-paper', 'bathroom', 'matte-black', 'rental-friendly'],
  '{"Material": "SUS304 Stainless Steel", "Installation": "3M Adhesive", "Color": "Matte Black", "Compatibility": "Standard + Jumbo rolls", "Weight Capacity": "5 lbs"}',
  'in_stock'
);

-- 5. Over-Door Towel Rack
INSERT INTO shop_products (
  slug, name, category_id, description, short_description,
  price_cents, currency, images, status, featured, tags, specs, stock_status
) VALUES (
  'over-door-towel-rack-3-bar',
  'Over-Door Towel Rack — 3 Bars',
  (SELECT id FROM shop_categories WHERE slug = 'no-drill-bathroom'),
  E'## Triple Your Towel Space Instantly\n\nHooks over any standard door — no tools, no drilling, no adhesive. Three bars hold bath towels, hand towels, and washcloths separately.\n\n### Features\n- **3 independent bars** — organize by towel type\n- **Fits doors up to 2" thick** — standard interior doors\n- **Foam padding** — won''t scratch door paint\n- **Chrome finish** — looks like permanent hardware\n- **Holds 10 lbs per bar** — 30 lbs total',
  'Over-door towel rack with 3 bars. Fits standard doors. No drilling, no adhesive. Chrome finish, 30 lb capacity.',
  0, 'CAD',
  ARRAY['https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=800&fit=crop'],
  'active', false,
  ARRAY['no-drilling', 'over-door', 'towel-rack', 'bathroom', 'chrome', 'rental-friendly'],
  '{"Material": "Steel + Chrome plating", "Installation": "Over-door hook (no tools)", "Bars": "3", "Door Compatibility": "Up to 2 inches thick", "Weight Capacity": "30 lbs total (10 per bar)", "Protection": "Foam padding on hooks"}',
  'in_stock'
);

-- 6. Suction Cup Magnifying Mirror
INSERT INTO shop_products (
  slug, name, category_id, description, short_description,
  price_cents, currency, images, status, featured, tags, specs, stock_status
) VALUES (
  'suction-cup-magnifying-mirror-10x',
  '10x Magnifying Mirror — Suction Cup Mount',
  (SELECT id FROM shop_categories WHERE slug = 'no-drill-bathroom'),
  E'## Makeup and Grooming Mirror — Mounts Anywhere\n\nThis 10x magnifying mirror sticks to any smooth surface with a powerful suction cup. Perfect for makeup application, tweezing, and close grooming.\n\n### Features\n- **10x magnification** — see every detail\n- **6.5" diameter** — large enough for full-face use\n- **Flexible gooseneck** — adjust to any angle\n- **Suction cup mount** — sticks to mirrors, tile, glass\n- **Rotates 360°** — portrait or landscape',
  '10x magnifying mirror with suction cup mount. 6.5" diameter, flexible gooseneck. Perfect for makeup and grooming.',
  0, 'CAD',
  ARRAY['https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=800&h=800&fit=crop'],
  'active', false,
  ARRAY['no-drilling', 'suction-cup', 'mirror', 'magnifying', 'bathroom', 'makeup', 'rental-friendly'],
  '{"Magnification": "10x", "Diameter": "6.5 inches", "Installation": "Suction Cup", "Arm": "Flexible Gooseneck", "Rotation": "360°", "Surface": "Mirrors, tile, glass"}',
  'in_stock'
);

-- 7. Adhesive Toothbrush Holder
INSERT INTO shop_products (
  slug, name, category_id, description, short_description,
  price_cents, currency, images, status, featured, tags, specs, stock_status
) VALUES (
  'adhesive-toothbrush-holder-4-slot',
  'Wall-Mount Toothbrush Holder — 4 Slots, Adhesive',
  (SELECT id FROM shop_categories WHERE slug = 'no-drill-bathroom'),
  E'## Keep Your Toothbrushes Off the Counter\n\nWall-mounted toothbrush holder with 4 individual slots. Self-adhesive backing — no drilling. Keeps brushes upright, separated, and hygienic.\n\n### Features\n- **4 individual slots** — keeps brushes separated and sanitary\n- **Self-adhesive mount** — peels off clean\n- **Covered design** — protects bristles from dust\n- **Drainage tray** — catches water drips\n- **ABS + stainless steel** — durable and rust-proof',
  'Wall-mounted toothbrush holder with 4 slots. Self-adhesive, no drilling. Covered design with drainage tray.',
  0, 'CAD',
  ARRAY['https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&h=800&fit=crop'],
  'active', false,
  ARRAY['no-drilling', 'adhesive', 'toothbrush', 'holder', 'bathroom', 'rental-friendly', 'organizer'],
  '{"Material": "ABS Plastic + Stainless Steel", "Installation": "Self-Adhesive", "Slots": "4", "Design": "Covered with drainage", "Color": "White / Gray"}',
  'in_stock'
);

-- 8. Shower Door Hook Set
INSERT INTO shop_products (
  slug, name, category_id, description, short_description,
  price_cents, currency, images, status, featured, tags, specs, stock_status
) VALUES (
  'shower-door-hooks-stainless-6-pack',
  'Shower Glass Door Hooks — Stainless Steel, 6-Pack',
  (SELECT id FROM shop_categories WHERE slug = 'no-drill-bathroom'),
  E'## Hang Towels, Loofahs, and Razors on Your Shower Door\n\nThese hooks slip over the top edge of frameless glass shower doors. No suction, no adhesive — they just hook on.\n\n### Features\n- **6 hooks included** — enough for the whole family\n- **Fits frameless glass doors** — 6mm to 12mm thick\n- **304 stainless steel** — no rust ever\n- **Silicone grips** — won''t scratch glass\n- **Holds 5 lbs each** — towels, loofahs, razors, clothes',
  'Over-glass shower door hooks, 6-pack. 304 stainless steel. Fits frameless glass doors 6-12mm. No drilling.',
  0, 'CAD',
  ARRAY['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=800&fit=crop'],
  'active', true,
  ARRAY['no-drilling', 'hooks', 'shower', 'glass-door', 'stainless-steel', 'bathroom', 'rental-friendly'],
  '{"Material": "304 Stainless Steel + Silicone", "Installation": "Over-door hook", "Quantity": "6 hooks", "Glass Compatibility": "6mm to 12mm frameless", "Weight Capacity": "5 lbs per hook", "Protection": "Silicone grip pads"}',
  'in_stock'
);

-- ══════════════════════════════════════════════════════════════════
-- NO-DRILL KITCHEN (7 products)
-- ══════════════════════════════════════════════════════════════════

-- 9. Magnetic Knife Strip
INSERT INTO shop_products (
  slug, name, category_id, description, short_description,
  price_cents, currency, images, status, featured, tags, specs, stock_status
) VALUES (
  'magnetic-knife-strip-adhesive-16-inch',
  'Magnetic Knife Strip — Adhesive Mount, 16"',
  (SELECT id FROM shop_categories WHERE slug = 'no-drill-kitchen'),
  E'## Display Your Knives Like a Chef — No Drilling\n\nThis magnetic knife strip mounts with industrial-strength adhesive tape. Holds up to 8 knives securely with powerful rare-earth magnets.\n\n### Features\n- **Rare-earth magnets** — holds knives firmly, won''t slip\n- **3M VHB adhesive** — industrial strength, clean removal\n- **Natural acacia wood** — looks premium on any wall\n- **16" long** — holds 6-8 knives\n- **Also holds** — scissors, metal utensils, spice tins',
  'Magnetic knife strip with adhesive mount. Acacia wood, rare-earth magnets. Holds 8 knives. No drilling required.',
  0, 'CAD',
  ARRAY['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=800&fit=crop'],
  'active', true,
  ARRAY['no-drilling', 'magnetic', 'knife', 'kitchen', 'adhesive', 'wood', 'rental-friendly', 'organizer'],
  '{"Material": "Acacia Wood + Rare-Earth Magnets", "Installation": "3M VHB Adhesive", "Length": "16 inches", "Capacity": "6-8 knives", "Magnet Type": "Neodymium N52", "Color": "Natural Acacia"}',
  'in_stock'
);

-- 10. Over-Cabinet Door Hooks
INSERT INTO shop_products (
  slug, name, category_id, description, short_description,
  price_cents, currency, images, status, featured, tags, specs, stock_status
) VALUES (
  'over-cabinet-hooks-stainless-6-pack',
  'Over-Cabinet Door Hooks — 6 Pack, Stainless Steel',
  (SELECT id FROM shop_categories WHERE slug = 'no-drill-kitchen'),
  E'## Instant Storage on Every Cabinet Door\n\nThese hooks slip over the top of kitchen cabinet doors, adding instant storage for towels, oven mitts, utensils, and bags.\n\n### Features\n- **6 hooks** — outfit your whole kitchen\n- **Fits standard cabinet doors** — 0.5" to 0.75" thick\n- **Stainless steel** — won''t rust or tarnish\n- **Slim profile** — doors still close fully\n- **3 lbs per hook** — towels, aprons, bags',
  'Over-cabinet door hooks, 6-pack. Stainless steel. Fits standard cabinets. No drilling, no adhesive.',
  0, 'CAD',
  ARRAY['https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=800&fit=crop'],
  'active', false,
  ARRAY['no-drilling', 'over-cabinet', 'hooks', 'kitchen', 'stainless-steel', 'rental-friendly', 'organizer'],
  '{"Material": "304 Stainless Steel", "Installation": "Over-cabinet hook", "Quantity": "6", "Door Compatibility": "0.5 to 0.75 inches thick", "Weight Capacity": "3 lbs per hook", "Color": "Brushed Steel"}',
  'in_stock'
);

-- 11. Adhesive Spice Rack (Cabinet Door)
INSERT INTO shop_products (
  slug, name, category_id, description, short_description,
  price_cents, currency, images, status, featured, tags, specs, stock_status
) VALUES (
  'adhesive-spice-rack-cabinet-door',
  'Adhesive Spice Rack — Inside Cabinet Door Mount',
  (SELECT id FROM shop_categories WHERE slug = 'no-drill-kitchen'),
  E'## Hidden Spice Storage Inside Your Cabinet Door\n\nThis rack mounts inside your cabinet door with adhesive strips, turning wasted space into organized spice storage.\n\n### Features\n- **Holds 20+ spice jars** — 3 tiers\n- **Self-adhesive mount** — installs in 60 seconds\n- **Clear acrylic** — see all your spices at a glance\n- **Guard rail** — jars won''t fall when door opens\n- **Fits standard cabinets** — measures 13" × 11"',
  'Inside-cabinet-door spice rack, 3 tiers. Self-adhesive mount, clear acrylic. Holds 20+ jars. No drilling.',
  0, 'CAD',
  ARRAY['https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&h=800&fit=crop'],
  'active', false,
  ARRAY['no-drilling', 'adhesive', 'spice-rack', 'kitchen', 'cabinet', 'organizer', 'rental-friendly'],
  '{"Material": "Clear Acrylic", "Installation": "Self-Adhesive Strips", "Tiers": "3", "Capacity": "20+ standard spice jars", "Dimensions": "13\" × 11\" × 2.5\"", "Guard": "Front rail on each tier"}',
  'in_stock'
);

-- 12. Under-Cabinet Paper Towel Holder
INSERT INTO shop_products (
  slug, name, category_id, description, short_description,
  price_cents, currency, images, status, featured, tags, specs, stock_status
) VALUES (
  'under-cabinet-paper-towel-holder-adhesive',
  'Under-Cabinet Paper Towel Holder — Adhesive',
  (SELECT id FROM shop_categories WHERE slug = 'no-drill-kitchen'),
  E'## Free Up Counter Space\n\nMounts under any cabinet with strong adhesive. One-hand tear design — pull a sheet with one hand while cooking.\n\n### Features\n- **Under-cabinet mount** — out of sight, always in reach\n- **One-hand operation** — built-in tear bar\n- **Fits all roll sizes** — standard and jumbo\n- **Stainless steel** — matches kitchen hardware\n- **Adhesive mount** — no screws needed',
  'Under-cabinet paper towel holder with adhesive mount. One-hand tear design. Fits all roll sizes. Stainless steel.',
  0, 'CAD',
  ARRAY['https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&h=800&fit=crop'],
  'active', false,
  ARRAY['no-drilling', 'adhesive', 'paper-towel', 'kitchen', 'under-cabinet', 'rental-friendly', 'organizer'],
  '{"Material": "Stainless Steel", "Installation": "Adhesive Mount", "Compatibility": "Standard + Jumbo rolls", "Design": "One-hand tear bar", "Color": "Brushed Steel"}',
  'in_stock'
);

-- 13. Suction Cup Sponge Holder
INSERT INTO shop_products (
  slug, name, category_id, description, short_description,
  price_cents, currency, images, status, featured, tags, specs, stock_status
) VALUES (
  'suction-cup-sponge-holder-sink',
  'Kitchen Sink Sponge Holder — Suction Cup',
  (SELECT id FROM shop_categories WHERE slug = 'no-drill-kitchen'),
  E'## No More Soggy Sponges on the Counter\n\nThis suction-cup sponge holder sticks to the inside of your sink or on the backsplash. Drains directly into the sink — no puddles.\n\n### Features\n- **Double compartment** — sponge + dish brush\n- **Drain holes** — water goes straight into sink\n- **Suction cup** — sticks to stainless steel, porcelain, tile\n- **Quick-dry design** — sponge dries faster, lasts longer\n- **Compact** — doesn''t take up counter space',
  'Kitchen sink sponge holder with suction cup. Double compartment, drain holes. Keeps counters clean and dry.',
  0, 'CAD',
  ARRAY['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=800&fit=crop'],
  'active', false,
  ARRAY['no-drilling', 'suction-cup', 'sponge', 'kitchen', 'sink', 'organizer', 'rental-friendly'],
  '{"Material": "ABS Plastic + Stainless Steel", "Installation": "Suction Cup", "Compartments": "2 (sponge + brush)", "Drainage": "Built-in drain holes", "Color": "White / Gray"}',
  'in_stock'
);

-- 14. Magnetic Fridge Shelf
INSERT INTO shop_products (
  slug, name, category_id, description, short_description,
  price_cents, currency, images, status, featured, tags, specs, stock_status
) VALUES (
  'magnetic-fridge-side-shelf-spice-rack',
  'Magnetic Fridge Side Shelf — Spice Rack & Organizer',
  (SELECT id FROM shop_categories WHERE slug = 'no-drill-kitchen'),
  E'## Turn Your Fridge Side Into Storage\n\nPowerful magnets attach this shelf to the side of any fridge, adding instant storage for spices, paper towels, wrap, and small kitchen tools.\n\n### Features\n- **Strong magnets** — holds 15 lbs, won''t slide\n- **3-tier design** — shelf + basket + hooks\n- **Paper towel bar** — built into the bottom tier\n- **6 S-hooks included** — hang utensils, keys, towels\n- **Works on any magnetic surface** — fridge, dishwasher, washer/dryer',
  'Magnetic fridge side shelf with 3 tiers. Holds spices, paper towels, utensils. 15 lb capacity. No drilling.',
  0, 'CAD',
  ARRAY['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=800&fit=crop'],
  'active', true,
  ARRAY['no-drilling', 'magnetic', 'fridge', 'kitchen', 'spice-rack', 'organizer', 'rental-friendly'],
  '{"Material": "Powder-coated Steel", "Installation": "Magnetic (built-in magnets)", "Tiers": "3 (shelf + basket + hook bar)", "Weight Capacity": "15 lbs total", "Accessories": "6 S-hooks + paper towel bar", "Color": "Matte Black / White"}',
  'in_stock'
);

-- 15. Over-Sink Dish Drying Rack
INSERT INTO shop_products (
  slug, name, category_id, description, short_description,
  price_cents, currency, images, status, featured, tags, specs, stock_status
) VALUES (
  'over-sink-dish-drying-rack-adjustable',
  'Over-Sink Dish Drying Rack — Adjustable Width',
  (SELECT id FROM shop_categories WHERE slug = 'no-drill-kitchen'),
  E'## Dry Dishes Over the Sink — Save Counter Space\n\nThis expandable rack sits across your sink, using zero counter space. Adjustable width fits sinks from 24" to 36".\n\n### Features\n- **Adjustable width** — fits 24" to 36" sinks\n- **2 tiers** — plates on top, cups/utensils below\n- **Utensil holder + cutting board holder** included\n- **Stainless steel** — rust-resistant\n- **Freestanding** — just place over sink, no installation',
  'Over-sink dish drying rack, adjustable 24-36". 2 tiers with utensil holder. Stainless steel. No installation.',
  0, 'CAD',
  ARRAY['https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=800&fit=crop'],
  'active', false,
  ARRAY['no-drilling', 'freestanding', 'dish-rack', 'kitchen', 'over-sink', 'stainless-steel', 'rental-friendly'],
  '{"Material": "Stainless Steel", "Installation": "Freestanding (no tools)", "Width": "Adjustable 24\" to 36\"", "Tiers": "2", "Includes": "Utensil holder + cutting board holder", "Color": "Chrome / Matte Black"}',
  'in_stock'
);

-- ══════════════════════════════════════════════════════════════════
-- NO-DRILL STORAGE (6 products)
-- ══════════════════════════════════════════════════════════════════

-- 16. Tension Rod Closet Shelf
INSERT INTO shop_products (
  slug, name, category_id, description, short_description,
  price_cents, currency, images, status, featured, tags, specs, stock_status
) VALUES (
  'tension-rod-closet-shelf-expandable',
  'Tension Rod Closet Shelf — Expandable',
  (SELECT id FROM shop_categories WHERE slug = 'no-drill-storage'),
  E'## Add a Shelf to Any Closet in 30 Seconds\n\nThis spring-loaded tension shelf expands to fit between walls, adding instant storage without drilling or screwing into anything.\n\n### Features\n- **Expandable** — fits 24" to 40" openings\n- **Holds 30 lbs** — strong enough for folded clothes, shoes, bins\n- **Non-slip rubber ends** — won''t scratch walls\n- **Mesh design** — lets air circulate\n- **Stackable** — add multiple shelves at different heights',
  'Tension rod closet shelf, expandable 24-40". Holds 30 lbs. Non-slip ends. No drilling, installs in seconds.',
  0, 'CAD',
  ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=800&fit=crop'],
  'active', true,
  ARRAY['no-drilling', 'tension', 'closet', 'shelf', 'expandable', 'storage', 'rental-friendly'],
  '{"Material": "Steel + Powder Coating", "Installation": "Spring-loaded tension", "Width": "Expandable 24\" to 40\"", "Weight Capacity": "30 lbs", "End Caps": "Non-slip rubber", "Design": "Mesh for airflow"}',
  'in_stock'
);

-- 17. Over-Door Hook Rack (6 hooks)
INSERT INTO shop_products (
  slug, name, category_id, description, short_description,
  price_cents, currency, images, status, featured, tags, specs, stock_status
) VALUES (
  'over-door-hook-rack-6-hooks',
  'Over-Door Hook Rack — 6 Hooks',
  (SELECT id FROM shop_categories WHERE slug = 'no-drill-storage'),
  E'## Instant Coat Rack Behind Any Door\n\nSlips over the top of any standard door. Six heavy-duty hooks for coats, bags, scarves, hats, and towels.\n\n### Features\n- **6 hooks** — coat, bag, scarf, hat, towel, robe\n- **Fits standard doors** — up to 1.75" thick\n- **Steel construction** — each hook holds 5 lbs\n- **Foam padding** — protects door finish\n- **No tools required** — hang it and go',
  'Over-door hook rack with 6 hooks. Steel construction. Fits standard doors. No drilling, no tools, no damage.',
  0, 'CAD',
  ARRAY['https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&h=800&fit=crop'],
  'active', false,
  ARRAY['no-drilling', 'over-door', 'hooks', 'coat-rack', 'storage', 'rental-friendly'],
  '{"Material": "Steel + Powder Coating", "Installation": "Over-door", "Hooks": "6", "Door Compatibility": "Up to 1.75 inches thick", "Weight Capacity": "5 lbs per hook (30 lbs total)", "Protection": "Foam padding"}',
  'in_stock'
);

-- 18. Adhesive Cable Management Clips
INSERT INTO shop_products (
  slug, name, category_id, description, short_description,
  price_cents, currency, images, status, featured, tags, specs, stock_status
) VALUES (
  'adhesive-cable-clips-desk-20-pack',
  'Adhesive Cable Management Clips — 20 Pack',
  (SELECT id FROM shop_categories WHERE slug = 'no-drill-storage'),
  E'## Tame Your Cable Chaos\n\n20 self-adhesive clips in 3 sizes to organize charging cables, monitor cables, and headphone wires on your desk, nightstand, or entertainment center.\n\n### Features\n- **20 clips** — 3 sizes (small, medium, large)\n- **Self-adhesive** — peel and stick to any smooth surface\n- **Cable routing** — keeps cables from falling behind desk\n- **Soft silicone** — won''t damage cable insulation\n- **Clean removal** — no residue when removed',
  'Adhesive cable management clips, 20-pack in 3 sizes. Organizes desk cables. Self-adhesive, clean removal.',
  0, 'CAD',
  ARRAY['https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800&h=800&fit=crop'],
  'active', false,
  ARRAY['no-drilling', 'adhesive', 'cable', 'clips', 'desk', 'organizer', 'rental-friendly', 'office'],
  '{"Material": "Soft Silicone + 3M Adhesive", "Installation": "Peel and Stick", "Quantity": "20 (mixed sizes)", "Sizes": "Small (1 cable), Medium (3 cables), Large (5 cables)", "Removal": "Clean, no residue", "Color": "White / Black"}',
  'in_stock'
);

-- 19. Stackable Cabinet Shelf Risers
INSERT INTO shop_products (
  slug, name, category_id, description, short_description,
  price_cents, currency, images, status, featured, tags, specs, stock_status
) VALUES (
  'stackable-shelf-risers-kitchen-cabinet',
  'Stackable Shelf Risers — Cabinet Organizer, 2-Pack',
  (SELECT id FROM shop_categories WHERE slug = 'no-drill-storage'),
  E'## Double Your Cabinet Storage Instantly\n\nThese freestanding shelf risers sit inside kitchen cabinets, adding a second level of storage. No installation — just place and stack.\n\n### Features\n- **2-pack** — organize two cabinets\n- **Expandable width** — adjusts from 15" to 22"\n- **Holds 20 lbs each** — plates, bowls, mugs\n- **Non-slip feet** — won''t slide on shelf surface\n- **Stackable** — use two high for triple storage',
  'Stackable shelf risers for cabinets, 2-pack. Expandable 15-22". Doubles cabinet space. No installation required.',
  0, 'CAD',
  ARRAY['https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&h=800&fit=crop'],
  'active', false,
  ARRAY['freestanding', 'shelf-riser', 'cabinet', 'kitchen', 'storage', 'organizer', 'rental-friendly', 'stackable'],
  '{"Material": "Steel + Powder Coating", "Installation": "Freestanding", "Width": "Expandable 15\" to 22\"", "Quantity": "2 pack", "Weight Capacity": "20 lbs each", "Color": "White / Matte Black"}',
  'in_stock'
);

-- 20. Hanging Closet Organizer (6-Shelf)
INSERT INTO shop_products (
  slug, name, category_id, description, short_description,
  price_cents, currency, images, status, featured, tags, specs, stock_status
) VALUES (
  'hanging-closet-organizer-6-shelf',
  'Hanging Closet Organizer — 6 Shelves',
  (SELECT id FROM shop_categories WHERE slug = 'no-drill-storage'),
  E'## 6 Extra Shelves — Hang From Any Closet Rod\n\nThis fabric hanging organizer hooks onto your closet rod, instantly adding 6 shelves for sweaters, shoes, bags, and accessories.\n\n### Features\n- **6 shelves** — each fits folded sweaters or shoe pairs\n- **Hooks on closet rod** — no tools, no drilling\n- **Reinforced shelves** — won''t sag under weight\n- **Side pockets** — bonus storage for small items\n- **Collapsible** — folds flat when not needed',
  'Hanging closet organizer with 6 reinforced shelves. Hooks on closet rod. Side pockets. No installation required.',
  0, 'CAD',
  ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=800&fit=crop'],
  'active', false,
  ARRAY['no-drilling', 'hanging', 'closet', 'organizer', 'shelves', 'storage', 'rental-friendly'],
  '{"Material": "Durable Fabric + Cardboard Shelves", "Installation": "Hook on closet rod", "Shelves": "6", "Dimensions": "12\" × 12\" × 48\"", "Side Pockets": "4", "Weight Capacity": "5 lbs per shelf"}',
  'in_stock'
);

-- 21. Under-Bed Rolling Storage Bins (2-Pack)
INSERT INTO shop_products (
  slug, name, category_id, description, short_description,
  price_cents, currency, images, status, featured, tags, specs, stock_status
) VALUES (
  'under-bed-storage-bins-rolling-2-pack',
  'Under-Bed Rolling Storage Bins — 2 Pack',
  (SELECT id FROM shop_categories WHERE slug = 'no-drill-storage'),
  E'## Use the Space Under Your Bed\n\nThese low-profile bins slide under most beds on smooth-rolling wheels. Store off-season clothes, shoes, blankets, or holiday decorations.\n\n### Features\n- **2 bins included** — one for each side of the bed\n- **4 wheels per bin** — rolls in and out easily\n- **Clear lid** — see contents without opening\n- **Low profile** — fits under beds with 6"+ clearance\n- **40L capacity each** — holds a full season of clothes',
  'Under-bed rolling storage bins, 2-pack. Clear lids, 40L each. Fits 6" clearance. Organize seasonal items.',
  0, 'CAD',
  ARRAY['https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&h=800&fit=crop'],
  'active', false,
  ARRAY['freestanding', 'under-bed', 'storage', 'bins', 'rolling', 'bedroom', 'rental-friendly', 'organizer'],
  '{"Material": "Durable PP Plastic", "Installation": "None — freestanding", "Quantity": "2 bins", "Capacity": "40L each", "Wheels": "4 per bin (smooth rolling)", "Clearance": "Fits under 6\"+ gap", "Lid": "Clear snap-on"}',
  'in_stock'
);

-- ══════════════════════════════════════════════════════════════════
-- NO-DRILL DECOR (6 products)
-- ══════════════════════════════════════════════════════════════════

-- 22. LED Strip Lights (RGB, Remote)
INSERT INTO shop_products (
  slug, name, category_id, description, short_description,
  price_cents, currency, images, status, featured, tags, specs, stock_status
) VALUES (
  'led-strip-lights-rgb-remote-5m',
  'LED Strip Lights — RGB with Remote, 5m',
  (SELECT id FROM shop_categories WHERE slug = 'no-drill-decor'),
  E'## Transform Any Room in 10 Minutes\n\nPeel-and-stick LED strip with 16 colors, multiple modes, and a wireless remote. Stick behind your TV, under shelves, around your bed frame, or along the ceiling.\n\n### Features\n- **5 meters (16.4 ft)** — enough for a full room accent\n- **16 colors + warm white** — set the mood\n- **Wireless remote** — change colors from the couch\n- **Cuttable every 3 LEDs** — customize the length\n- **3M adhesive backing** — peels off clean\n- **USB powered** — plug into any USB port or adapter',
  'RGB LED strip lights, 5m with wireless remote. 16 colors. Peel-and-stick. USB powered. No drilling.',
  0, 'CAD',
  ARRAY['https://images.unsplash.com/photo-1615529162924-f8605388461d?w=800&h=800&fit=crop'],
  'active', true,
  ARRAY['no-drilling', 'LED', 'lights', 'RGB', 'decor', 'bedroom', 'rental-friendly', 'peel-and-stick', 'ambient'],
  '{"Type": "SMD 5050 RGB LED", "Length": "5m (16.4 ft)", "Colors": "16 + warm white", "Control": "IR Remote (44 keys)", "Power": "USB (5V)", "Adhesive": "3M peel-and-stick", "Cuttable": "Every 3 LEDs", "Waterproof": "IP20 (indoor)"}',
  'in_stock'
);

-- 23. Adhesive Floating Shelf
INSERT INTO shop_products (
  slug, name, category_id, description, short_description,
  price_cents, currency, images, status, featured, tags, specs, stock_status
) VALUES (
  'adhesive-floating-shelf-acrylic-2-pack',
  'Adhesive Floating Shelves — Clear Acrylic, 2-Pack',
  (SELECT id FROM shop_categories WHERE slug = 'no-drill-decor'),
  E'## Floating Shelves Without a Single Nail\n\nThese clear acrylic shelves mount with industrial adhesive strips. Perfect for small plants, candles, photos, and decor items.\n\n### Features\n- **2 shelves included** — create a display pair\n- **Clear acrylic** — invisible bracket look\n- **3M adhesive mount** — no drilling\n- **Holds 8 lbs each** — books, plants, frames\n- **15" × 4"** — fits standard decor items\n- **Clean removal** — heat adhesive with hair dryer to remove',
  'Adhesive floating shelves, clear acrylic 2-pack. Holds 8 lbs each. No drilling. Perfect for decor and plants.',
  0, 'CAD',
  ARRAY['https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&h=800&fit=crop'],
  'active', false,
  ARRAY['no-drilling', 'adhesive', 'floating-shelf', 'acrylic', 'decor', 'rental-friendly', 'wall-mount'],
  '{"Material": "Clear Acrylic (8mm thick)", "Installation": "3M Adhesive Strips", "Quantity": "2 shelves", "Dimensions": "15\" × 4\" × 0.3\"", "Weight Capacity": "8 lbs each", "Removal": "Heat with hair dryer"}',
  'in_stock'
);

-- 24. Peel-and-Stick Backsplash Tiles
INSERT INTO shop_products (
  slug, name, category_id, description, short_description,
  price_cents, currency, images, status, featured, tags, specs, stock_status
) VALUES (
  'peel-stick-backsplash-tiles-subway-10-pack',
  'Peel & Stick Backsplash Tiles — Subway Style, 10-Pack',
  (SELECT id FROM shop_categories WHERE slug = 'no-drill-decor'),
  E'## Upgrade Your Kitchen Backsplash in an Hour\n\nThese thick, 3D gel tiles look like real subway tile but peel and stick in seconds. Heat-resistant, waterproof, and completely removable.\n\n### Features\n- **10 sheets** — covers approx. 10 sq ft\n- **3D raised gel** — looks and feels like real tile\n- **Heat resistant** — safe behind stovetops\n- **Waterproof** — works in bathroom too\n- **Removable** — peels off cleanly, no wall damage\n- **Subway tile pattern** — classic and timeless',
  'Peel and stick subway backsplash tiles, 10-pack. 3D gel, heat resistant, waterproof. Covers 10 sq ft. Removable.',
  0, 'CAD',
  ARRAY['https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&h=800&fit=crop'],
  'active', true,
  ARRAY['no-drilling', 'peel-and-stick', 'backsplash', 'tiles', 'kitchen', 'bathroom', 'decor', 'rental-friendly', 'subway'],
  '{"Material": "3D Gel Epoxy", "Installation": "Peel and Stick", "Quantity": "10 sheets", "Coverage": "~10 sq ft", "Sheet Size": "12\" × 12\"", "Heat Resistant": "Up to 180°F", "Waterproof": "Yes", "Removal": "Peels off clean"}',
  'in_stock'
);

-- 25. Command Strip Picture Ledge
INSERT INTO shop_products (
  slug, name, category_id, description, short_description,
  price_cents, currency, images, status, featured, tags, specs, stock_status
) VALUES (
  'command-strip-picture-ledge-24-inch',
  'Picture Ledge Shelf — Command Strip Mount, 24"',
  (SELECT id FROM shop_categories WHERE slug = 'no-drill-decor'),
  E'## Gallery Wall Without the Nail Holes\n\nThis picture ledge mounts with Command strips — swap photos and art whenever you want without committing to nail holes.\n\n### Features\n- **24" wide** — fits 3-5 framed photos\n- **Command strip mount** — included, damage-free\n- **Natural wood** — warm, modern look\n- **1.5" deep lip** — frames lean securely\n- **Holds 10 lbs** — frames, small plants, books',
  'Picture ledge shelf, 24" natural wood. Command strip mount included. Holds 10 lbs. No drilling, no damage.',
  0, 'CAD',
  ARRAY['https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&h=800&fit=crop'],
  'active', false,
  ARRAY['no-drilling', 'command-strip', 'picture-ledge', 'shelf', 'wood', 'decor', 'rental-friendly', 'gallery'],
  '{"Material": "Natural Pine Wood", "Installation": "3M Command Strips (included)", "Width": "24 inches", "Depth": "1.5 inches", "Weight Capacity": "10 lbs", "Color": "Natural / White / Black"}',
  'in_stock'
);

-- 26. Removable Wallpaper — Accent Wall
INSERT INTO shop_products (
  slug, name, category_id, description, short_description,
  price_cents, currency, images, status, featured, tags, specs, stock_status
) VALUES (
  'removable-wallpaper-geometric-accent',
  'Removable Wallpaper — Modern Geometric Pattern',
  (SELECT id FROM shop_categories WHERE slug = 'no-drill-decor'),
  E'## Accent Wall in 30 Minutes — Peels Off When You Move\n\nSelf-adhesive wallpaper that peels off cleanly without damaging paint. Create a statement wall in your bedroom, living room, or home office.\n\n### Features\n- **Peel-and-stick** — no paste, no tools, no mess\n- **Repositionable** — adjust during installation\n- **Removable** — peels off cleanly, won''t damage paint\n- **Modern geometric pattern** — neutral tones\n- **1 roll covers 28 sq ft** — enough for one accent wall\n- **Matte finish** — no glare, premium look',
  'Removable peel-and-stick wallpaper, modern geometric pattern. Covers 28 sq ft. Repositionable. No damage removal.',
  0, 'CAD',
  ARRAY['https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&h=800&fit=crop'],
  'active', false,
  ARRAY['no-drilling', 'peel-and-stick', 'wallpaper', 'removable', 'accent-wall', 'decor', 'rental-friendly', 'geometric'],
  '{"Material": "PVC-free vinyl", "Installation": "Peel and Stick", "Coverage": "28 sq ft per roll", "Roll Size": "20.5\" × 16.5 ft", "Pattern": "Modern Geometric", "Finish": "Matte", "Removal": "Clean peel, no residue"}',
  'in_stock'
);

-- 27. Magnetic Picture Frames (6-Pack)
INSERT INTO shop_products (
  slug, name, category_id, description, short_description,
  price_cents, currency, images, status, featured, tags, specs, stock_status
) VALUES (
  'magnetic-photo-frames-fridge-6-pack',
  'Magnetic Photo Frames — Fridge Display, 6-Pack',
  (SELECT id FROM shop_categories WHERE slug = 'no-drill-decor'),
  E'## Turn Your Fridge Into a Photo Gallery\n\nThese magnetic frames snap onto any fridge, filing cabinet, or metal surface. Swap photos in and out easily — no tape, no pins, no damage.\n\n### Features\n- **6 frames** — mix of 4×6 and 5×7 sizes\n- **Strong magnets** — won''t slide or fall\n- **Clear front** — shows photos beautifully\n- **Easy swap** — slide photos in and out\n- **Instant gallery** — decorate in 2 minutes',
  'Magnetic photo frames for fridge, 6-pack. Mix of 4×6 and 5×7. Strong magnets. Easy photo swap. No damage.',
  0, 'CAD',
  ARRAY['https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&h=800&fit=crop'],
  'active', false,
  ARRAY['no-drilling', 'magnetic', 'photo-frames', 'fridge', 'decor', 'rental-friendly'],
  '{"Material": "Acrylic + Neodymium Magnets", "Sizes": "3× 4×6 + 3× 5×7", "Installation": "Magnetic", "Quantity": "6 frames", "Surface": "Fridge, filing cabinet, any magnetic metal", "Front": "Clear acrylic"}',
  'in_stock'
);
