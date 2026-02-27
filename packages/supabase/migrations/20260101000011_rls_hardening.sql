-- =============================================================================
-- Migration 011: RLS Hardening + Schema Fixes
-- =============================================================================
-- Fixes:
--   A) pro_gallery: add missing policies (RLS enabled, zero policies = locked)
--   B) jobs: allow assigned pro to update (status transitions, started_at, etc.)
--   C) job_materials: add WITH CHECK to update policy
--   D) conversations: add WITH CHECK to update policy
--   E) lat/lng range constraints on coordinate tables
--   F) extensions schema safety (idempotent)
-- =============================================================================

-- =========================================================================
-- F) Ensure extensions schema exists (Supabase creates it, but be safe)
-- =========================================================================
CREATE SCHEMA IF NOT EXISTS extensions;

-- =========================================================================
-- A) pro_gallery: public read, pro manages own (was hard-locked)
-- =========================================================================

CREATE POLICY "pro_gallery_select_public"
  ON pro_gallery FOR SELECT
  USING (true);

CREATE POLICY "pro_gallery_insert_own"
  ON pro_gallery FOR INSERT
  WITH CHECK (
    pro_profile_id IN (
      SELECT id FROM pro_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "pro_gallery_update_own"
  ON pro_gallery FOR UPDATE
  USING (
    pro_profile_id IN (
      SELECT id FROM pro_profiles WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    pro_profile_id IN (
      SELECT id FROM pro_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "pro_gallery_delete_own"
  ON pro_gallery FOR DELETE
  USING (
    pro_profile_id IN (
      SELECT id FROM pro_profiles WHERE user_id = auth.uid()
    )
  );

-- =========================================================================
-- B) jobs: assigned pro can also update (status transitions, timestamps)
-- =========================================================================

-- Drop the overly-strict client-only policy
DROP POLICY IF EXISTS "jobs_update_own" ON jobs;

CREATE POLICY "jobs_update_client_or_assigned_pro"
  ON jobs FOR UPDATE
  USING (client_id = auth.uid() OR assigned_pro_id = auth.uid())
  WITH CHECK (client_id = auth.uid() OR assigned_pro_id = auth.uid());

-- =========================================================================
-- C) job_materials: add WITH CHECK to prevent moving materials to other jobs
-- =========================================================================

DROP POLICY IF EXISTS "job_materials_update_relevant" ON job_materials;

CREATE POLICY "job_materials_update_relevant"
  ON job_materials FOR UPDATE
  USING (
    job_id IN (
      SELECT id FROM jobs
      WHERE client_id = auth.uid() OR assigned_pro_id = auth.uid()
    )
  )
  WITH CHECK (
    job_id IN (
      SELECT id FROM jobs
      WHERE client_id = auth.uid() OR assigned_pro_id = auth.uid()
    )
  );

-- =========================================================================
-- D) conversations: add WITH CHECK to prevent participant list hijacking
-- =========================================================================

DROP POLICY IF EXISTS "conversations_update_participant" ON conversations;

CREATE POLICY "conversations_update_participant"
  ON conversations FOR UPDATE
  USING (auth.uid() = ANY(participant_ids))
  WITH CHECK (auth.uid() = ANY(participant_ids));

-- =========================================================================
-- E) Lat/lng range constraints — prevent junk coordinates
-- =========================================================================

-- jobs
ALTER TABLE jobs
  ADD CONSTRAINT jobs_lat_range CHECK (lat IS NULL OR (lat BETWEEN -90 AND 90)),
  ADD CONSTRAINT jobs_lng_range CHECK (lng IS NULL OR (lng BETWEEN -180 AND 180));

-- pro_profiles
ALTER TABLE pro_profiles
  ADD CONSTRAINT pro_profiles_lat_range CHECK (lat IS NULL OR (lat BETWEEN -90 AND 90)),
  ADD CONSTRAINT pro_profiles_lng_range CHECK (lng IS NULL OR (lng BETWEEN -180 AND 180));

-- pro_gallery
ALTER TABLE pro_gallery
  ADD CONSTRAINT pro_gallery_lat_range CHECK (lat IS NULL OR (lat BETWEEN -90 AND 90)),
  ADD CONSTRAINT pro_gallery_lng_range CHECK (lng IS NULL OR (lng BETWEEN -180 AND 180));

-- projects
ALTER TABLE projects
  ADD CONSTRAINT projects_lat_range CHECK (lat IS NULL OR (lat BETWEEN -90 AND 90)),
  ADD CONSTRAINT projects_lng_range CHECK (lng IS NULL OR (lng BETWEEN -180 AND 180));

-- client_profiles
ALTER TABLE client_profiles
  ADD CONSTRAINT client_profiles_lat_range CHECK (default_lat IS NULL OR (default_lat BETWEEN -90 AND 90)),
  ADD CONSTRAINT client_profiles_lng_range CHECK (default_lng IS NULL OR (default_lng BETWEEN -180 AND 180));
