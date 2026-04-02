-- Add rental-friendly and bathroom/kitchen categories + seed first products

-- New categories for home essentials
INSERT INTO shop_categories (slug, name, description, icon, sort_order) VALUES
  ('bathroom-kitchen', 'Bathroom & Kitchen', 'Fixtures, organizers, holders, and accessories — no drilling required.', 'bathroom', 11),
  ('home-essentials', 'Home Essentials', 'Smart storage, organizers, and renter-friendly upgrades for any space.', 'home', 12)
ON CONFLICT (slug) DO NOTHING;

-- First product: Suction cup soap holder (renter-friendly, no drilling)
INSERT INTO shop_products (
  slug, name, category_id, description, short_description,
  price_cents, compare_at_cents, currency,
  images, thumbnail_url,
  alibaba_url, amazon_asin, amazon_affiliate_url, amazon_price_cents,
  status, featured, tags, specs, stock_status
) VALUES (
  'stainless-steel-soap-holder-suction-cup-no-drilling',
  'Stainless Steel Soap Holder — Suction Cup, No Drilling',
  (SELECT id FROM shop_categories WHERE slug = 'bathroom-kitchen'),
  E'## No Drilling. No Damage. No Problem.\n\nThis wall-mounted soap dish installs in one second with a powerful vacuum suction cup — no screws, no holes, no tools. Perfect for rental apartments, dorms, and anywhere you can''t drill into walls.\n\n### Why This One?\n\n- **Stainless steel** construction — won''t rust in your shower\n- **Self-draining design** — keeps soap dry and lasting longer\n- **4 built-in hooks** — hang loofahs, razors, or washcloths\n- **Removable & repositionable** — move it anytime, leaves no marks\n- **Waterproof suction** — rated for smooth tile, glass, marble, and metal surfaces\n\n### Perfect For\n\n- Rental apartments (no drilling = no damage deposit issues)\n- Student housing and dorms\n- Bathroom renovations in progress\n- Airbnb and short-term rentals\n- Kitchen sink sponge holder\n\n### How It Works\n\n1. Clean the surface with the included alcohol pad\n2. Press the suction cup lever down\n3. Done — holds up to 5 lbs\n\nTo remove, simply flip the lever up. No residue, no damage.',
  'Wall-mounted soap dish with powerful suction cup. No drilling, no damage. Stainless steel with 4 hooks. Perfect for rentals.',
  1499, 2499, 'CAD',
  '{}', NULL,
  'https://www.aliexpress.com/w/wholesale-soap-dish-suction-cup.html',
  'B0D1BTWFW7',
  'https://www.amazon.ca/dp/B0D1BTWFW7',
  1999,
  'active', true,
  ARRAY['no-drilling', 'suction-cup', 'rental-friendly', 'bathroom', 'stainless-steel', 'kitchen', 'organizer'],
  '{"Material": "304 Stainless Steel + ABS Plastic", "Installation": "Vacuum Suction Cup (no drilling)", "Color": "Matte Black", "Weight Capacity": "5 lbs (2.3 kg)", "Hooks": "4 built-in", "Surface Compatibility": "Smooth tile, glass, marble, metal", "Drainage": "Self-draining slotted design", "Dimensions": "5.5\" × 3.5\" × 2.8\""}',
  'in_stock'
);
