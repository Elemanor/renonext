-- Migration 023: Contractor Onboarding Pipeline
-- Adds license, insurance, WSIB, business, portfolio, and application workflow fields to pro_profiles.
-- Creates contractor-documents storage bucket with RLS policies.

-- ─────────────────────────────────────────────
-- 1. Add columns to pro_profiles
-- ─────────────────────────────────────────────

-- License
ALTER TABLE pro_profiles ADD COLUMN IF NOT EXISTS license_number TEXT;
ALTER TABLE pro_profiles ADD COLUMN IF NOT EXISTS license_type TEXT;
ALTER TABLE pro_profiles ADD COLUMN IF NOT EXISTS license_province TEXT DEFAULT 'ON';
ALTER TABLE pro_profiles ADD COLUMN IF NOT EXISTS license_expiry DATE;

-- Insurance
ALTER TABLE pro_profiles ADD COLUMN IF NOT EXISTS insurance_provider TEXT;
ALTER TABLE pro_profiles ADD COLUMN IF NOT EXISTS insurance_policy_number TEXT;
ALTER TABLE pro_profiles ADD COLUMN IF NOT EXISTS insurance_coverage_amount DECIMAL(12,2);
ALTER TABLE pro_profiles ADD COLUMN IF NOT EXISTS insurance_expiry DATE;
ALTER TABLE pro_profiles ADD COLUMN IF NOT EXISTS insurance_certificate_url TEXT;

-- WSIB
ALTER TABLE pro_profiles ADD COLUMN IF NOT EXISTS wsib_number TEXT;
ALTER TABLE pro_profiles ADD COLUMN IF NOT EXISTS wsib_status TEXT CHECK (wsib_status IN ('active','expired','exempt','not_applicable'));
ALTER TABLE pro_profiles ADD COLUMN IF NOT EXISTS wsib_certificate_url TEXT;

-- Business
ALTER TABLE pro_profiles ADD COLUMN IF NOT EXISTS business_number TEXT;
ALTER TABLE pro_profiles ADD COLUMN IF NOT EXISTS business_type TEXT CHECK (business_type IN ('sole_proprietor','partnership','corporation','other'));

-- Portfolio
ALTER TABLE pro_profiles ADD COLUMN IF NOT EXISTS portfolio_urls JSONB DEFAULT '[]';

-- Application workflow
ALTER TABLE pro_profiles ADD COLUMN IF NOT EXISTS application_status TEXT NOT NULL DEFAULT 'incomplete'
  CHECK (application_status IN ('incomplete','pending_review','approved','rejected','changes_requested'));
ALTER TABLE pro_profiles ADD COLUMN IF NOT EXISTS application_submitted_at TIMESTAMPTZ;
ALTER TABLE pro_profiles ADD COLUMN IF NOT EXISTS application_reviewed_at TIMESTAMPTZ;
ALTER TABLE pro_profiles ADD COLUMN IF NOT EXISTS application_reviewed_by UUID REFERENCES profiles(id);
ALTER TABLE pro_profiles ADD COLUMN IF NOT EXISTS application_notes TEXT;
ALTER TABLE pro_profiles ADD COLUMN IF NOT EXISTS rejection_reason TEXT;

-- ─────────────────────────────────────────────
-- 2. Index for admin queries
-- ─────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_pro_profiles_application_status
  ON pro_profiles (application_status, application_submitted_at DESC);

-- ─────────────────────────────────────────────
-- 3. Storage bucket: contractor-documents
-- ─────────────────────────────────────────────

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'contractor-documents',
  'contractor-documents',
  false,
  10485760, -- 10 MB
  ARRAY['application/pdf','image/jpeg','image/png','image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────────
-- 4. Storage RLS policies
-- ─────────────────────────────────────────────

-- Contractors can upload to their own folder
CREATE POLICY "Contractors upload own docs"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'contractor-documents'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Contractors can read their own docs
CREATE POLICY "Contractors read own docs"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'contractor-documents'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Contractors can update their own docs
CREATE POLICY "Contractors update own docs"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'contractor-documents'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Contractors can delete their own docs
CREATE POLICY "Contractors delete own docs"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'contractor-documents'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Admins can read all docs
CREATE POLICY "Admins read all contractor docs"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'contractor-documents'
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
  );
