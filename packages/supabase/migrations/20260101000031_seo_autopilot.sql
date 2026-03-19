-- SEO Autopilot System
-- 6 tables: page inventory, audit runs, audit issues, recommendations, pagespeed scores, experiments

-- Page inventory (tracks all known pages)
CREATE TABLE seo_page_inventory (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL UNIQUE,
  page_type TEXT NOT NULL,
  slug TEXT,
  canonical TEXT,
  indexable BOOLEAN DEFAULT true,
  in_sitemap BOOLEAN DEFAULT true,
  template_name TEXT,
  last_audited_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Audit runs (each full audit is a run)
CREATE TABLE seo_audit_runs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  total_pages INTEGER,
  total_issues INTEGER,
  critical_count INTEGER DEFAULT 0,
  warning_count INTEGER DEFAULT 0,
  run_by UUID REFERENCES auth.users(id)
);

-- Individual audit issues
CREATE TABLE seo_audit_issues (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  run_id UUID REFERENCES seo_audit_runs(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  issue_type TEXT NOT NULL,
  severity TEXT NOT NULL,
  evidence JSONB,
  first_seen_at TIMESTAMPTZ DEFAULT now(),
  resolved_at TIMESTAMPTZ
);

-- AI-generated recommendations with approval workflow
CREATE TABLE seo_recommendations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  recommendation_type TEXT NOT NULL,
  input_snapshot JSONB NOT NULL,
  output_json JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  created_by UUID REFERENCES auth.users(id),
  approved_by UUID REFERENCES auth.users(id),
  applied_by UUID REFERENCES auth.users(id),
  applied_at TIMESTAMPTZ,
  tokens_used INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- PageSpeed scores (cached, on-demand)
CREATE TABLE seo_pagespeed_scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  strategy TEXT NOT NULL DEFAULT 'mobile',
  performance_score INTEGER,
  seo_score INTEGER,
  accessibility_score INTEGER,
  best_practices_score INTEGER,
  fcp_ms INTEGER,
  lcp_ms INTEGER,
  cls DECIMAL(5,4),
  ttfb_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Experiments (before/after tracking)
CREATE TABLE seo_experiments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  recommendation_id UUID REFERENCES seo_recommendations(id),
  url TEXT NOT NULL,
  change_type TEXT NOT NULL,
  hypothesis TEXT,
  baseline_start DATE,
  baseline_end DATE,
  post_change_start DATE,
  post_change_end DATE,
  baseline_impressions INTEGER,
  baseline_clicks INTEGER,
  baseline_ctr DECIMAL(5,4),
  baseline_position DECIMAL(5,2),
  post_impressions INTEGER,
  post_clicks INTEGER,
  post_ctr DECIMAL(5,4),
  post_position DECIMAL(5,2),
  delta_impressions INTEGER,
  delta_clicks INTEGER,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_seo_inventory_type ON seo_page_inventory(page_type);
CREATE INDEX idx_seo_issues_url ON seo_audit_issues(url, issue_type);
CREATE INDEX idx_seo_issues_run ON seo_audit_issues(run_id);
CREATE INDEX idx_seo_recs_status ON seo_recommendations(status, created_at DESC);
CREATE INDEX idx_seo_recs_url ON seo_recommendations(url);
CREATE INDEX idx_seo_pagespeed_url ON seo_pagespeed_scores(url, created_at DESC);
CREATE INDEX idx_seo_experiments_url ON seo_experiments(url);

-- RLS: admin only on all tables
ALTER TABLE seo_page_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_audit_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_audit_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_pagespeed_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_experiments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin_all_seo_inventory" ON seo_page_inventory FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "admin_all_seo_audit_runs" ON seo_audit_runs FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "admin_all_seo_audit_issues" ON seo_audit_issues FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "admin_all_seo_recommendations" ON seo_recommendations FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "admin_all_seo_pagespeed" ON seo_pagespeed_scores FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "admin_all_seo_experiments" ON seo_experiments FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
