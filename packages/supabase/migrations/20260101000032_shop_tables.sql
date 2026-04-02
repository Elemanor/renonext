-- Shop / Marketplace tables
-- 4 tables: categories, products, amazon trending, meta sync log

-- Product status enum
CREATE TYPE product_status AS ENUM ('draft', 'active', 'archived');

-- Stock status enum
CREATE TYPE stock_status AS ENUM ('in_stock', 'low_stock', 'out_of_stock');

-- ── Shop Categories ─────────────────────────────────────────────
CREATE TABLE shop_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT, -- Material Symbols icon name
  sort_order INTEGER DEFAULT 0,
  parent_id UUID REFERENCES shop_categories(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── Shop Products ───────────────────────────────────────────────
CREATE TABLE shop_products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES shop_categories(id) ON DELETE SET NULL,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  short_description TEXT,
  price_cents INTEGER NOT NULL DEFAULT 0,
  compare_at_cents INTEGER,
  currency TEXT DEFAULT 'CAD',
  images TEXT[] DEFAULT '{}',
  thumbnail_url TEXT,
  alibaba_url TEXT,
  amazon_asin TEXT,
  amazon_affiliate_url TEXT,
  amazon_price_cents INTEGER,
  meta_product_id TEXT,
  meta_synced_at TIMESTAMPTZ,
  status product_status DEFAULT 'draft',
  featured BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  specs JSONB DEFAULT '{}',
  stock_status stock_status DEFAULT 'in_stock',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_shop_products_category ON shop_products(category_id);
CREATE INDEX idx_shop_products_status ON shop_products(status);
CREATE INDEX idx_shop_products_slug ON shop_products(slug);
CREATE INDEX idx_shop_products_featured ON shop_products(featured) WHERE featured = true;

-- ── Amazon Trending ─────────────────────────────────────────────
CREATE TABLE shop_amazon_trending (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  asin TEXT NOT NULL,
  title TEXT NOT NULL,
  image_url TEXT,
  price_cents INTEGER,
  category TEXT,
  rating NUMERIC(3,1),
  review_count INTEGER DEFAULT 0,
  affiliate_url TEXT,
  fetched_at TIMESTAMPTZ DEFAULT now(),
  rank INTEGER DEFAULT 0,
  UNIQUE(asin, category)
);

CREATE INDEX idx_amazon_trending_category ON shop_amazon_trending(category);

-- ── Meta Sync Log ───────────────────────────────────────────────
CREATE TABLE shop_meta_sync_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES shop_products(id) ON DELETE CASCADE,
  action TEXT NOT NULL, -- 'create', 'update', 'delete'
  status TEXT NOT NULL, -- 'success', 'error'
  error_message TEXT,
  synced_at TIMESTAMPTZ DEFAULT now()
);

-- ── RLS ─────────────────────────────────────────────────────────
ALTER TABLE shop_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_amazon_trending ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_meta_sync_log ENABLE ROW LEVEL SECURITY;

-- Public read for categories
CREATE POLICY "Public can read categories"
  ON shop_categories FOR SELECT
  USING (true);

-- Public read for active products only
CREATE POLICY "Public can read active products"
  ON shop_products FOR SELECT
  USING (status = 'active');

-- Admin full access to categories
CREATE POLICY "Admin full access categories"
  ON shop_categories FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admin full access to products
CREATE POLICY "Admin full access products"
  ON shop_products FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Public read for amazon trending
CREATE POLICY "Public can read amazon trending"
  ON shop_amazon_trending FOR SELECT
  USING (true);

-- Admin full access to amazon trending
CREATE POLICY "Admin full access amazon trending"
  ON shop_amazon_trending FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admin full access to meta sync log
CREATE POLICY "Admin full access meta sync log"
  ON shop_meta_sync_log FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ── Updated_at trigger ──────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_shop_products_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER shop_products_updated_at
  BEFORE UPDATE ON shop_products
  FOR EACH ROW
  EXECUTE FUNCTION update_shop_products_updated_at();

-- ── Storage bucket ──────────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('shop-images', 'shop-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can read shop images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'shop-images');

CREATE POLICY "Admin can upload shop images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'shop-images'
    AND EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admin can delete shop images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'shop-images'
    AND EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ── Seed categories ─────────────────────────────────────────────
INSERT INTO shop_categories (slug, name, description, icon, sort_order) VALUES
  ('power-tools', 'Power Tools', 'Drills, saws, grinders, and power equipment for every trade.', 'construction', 1),
  ('hand-tools', 'Hand Tools', 'Hammers, wrenches, pliers, and precision hand tools.', 'handyman', 2),
  ('safety-equipment', 'Safety Equipment', 'Hard hats, gloves, glasses, vests, and fall protection.', 'health_and_safety', 3),
  ('concrete-masonry', 'Concrete & Masonry', 'Mix, forms, trowels, rebar, and masonry supplies.', 'foundation', 4),
  ('waterproofing', 'Waterproofing', 'Membranes, sealants, drainage boards, and sump pumps.', 'water_drop', 5),
  ('plumbing', 'Plumbing', 'Pipes, fittings, valves, fixtures, and plumbing tools.', 'plumbing', 6),
  ('electrical', 'Electrical', 'Wire, panels, outlets, switches, and electrical tools.', 'electrical_services', 7),
  ('fasteners-hardware', 'Fasteners & Hardware', 'Screws, bolts, anchors, brackets, and structural hardware.', 'settings', 8),
  ('paint-finishing', 'Paint & Finishing', 'Interior/exterior paint, primers, brushes, and finishing supplies.', 'format_paint', 9),
  ('lumber-framing', 'Lumber & Framing', 'Dimensional lumber, plywood, engineered wood, and framing hardware.', 'carpenter', 10);
