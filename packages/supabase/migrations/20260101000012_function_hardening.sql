-- =============================================================================
-- Migration 012: Function Hardening + Seed Safety
-- =============================================================================
-- Fixes:
--   A) material_templates unique index (prevent double-seeding)
--   B) find_nearby_pros: EXISTS pattern, LANGUAGE sql, SET search_path
--   C) update_pro_rating: SET search_path, support UPDATE/DELETE
--   D) update_conversation_last_message: SET search_path, COALESCE
--   E) increment_job_count: SET search_path, fix client counter, idempotent timestamps
--   F) handle_new_user: clamp role to allowed values
--   G) Project RLS helpers: SET search_path on all SECURITY DEFINER functions
--   H) projects_after_insert_seed: SET search_path
--   I) Privilege hygiene: REVOKE PUBLIC, GRANT authenticated
-- =============================================================================

-- =========================================================================
-- A) Prevent material_templates double-seeding
-- =========================================================================

CREATE UNIQUE INDEX IF NOT EXISTS uq_material_templates_category_name
  ON material_templates (category_id, material_name);

-- =========================================================================
-- B) find_nearby_pros: rewrite with EXISTS, no GROUP BY, proper search_path
-- =========================================================================

CREATE OR REPLACE FUNCTION find_nearby_pros(
  search_lat DOUBLE PRECISION,
  search_lng DOUBLE PRECISION,
  radius_km INTEGER DEFAULT 25,
  cat_slug TEXT DEFAULT NULL
)
RETURNS TABLE (
  pro_profile_id UUID,
  user_id UUID,
  full_name TEXT,
  avatar_url TEXT,
  headline TEXT,
  bio TEXT,
  hourly_rate_min DECIMAL(10,2),
  hourly_rate_max DECIMAL(10,2),
  avg_rating DECIMAL(3,2),
  total_reviews INTEGER,
  total_jobs_completed INTEGER,
  response_time_minutes INTEGER,
  years_experience INTEGER,
  city TEXT,
  distance_km DOUBLE PRECISION
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
  WITH ranked AS (
    SELECT
      pp.id AS pro_profile_id,
      pp.user_id,
      p.full_name,
      p.avatar_url,
      pp.headline,
      pp.bio,
      pp.hourly_rate_min,
      pp.hourly_rate_max,
      pp.avg_rating,
      pp.total_reviews,
      pp.total_jobs_completed,
      pp.response_time_minutes,
      pp.years_experience,
      pp.city,
      (earth_distance(
        ll_to_earth(pp.lat, pp.lng),
        ll_to_earth(search_lat, search_lng)
      ) / 1000.0) AS distance_km
    FROM pro_profiles pp
    JOIN profiles p ON p.id = pp.user_id
    WHERE
      pp.is_available = TRUE
      AND pp.lat IS NOT NULL
      AND pp.lng IS NOT NULL
      AND earth_distance(
        ll_to_earth(pp.lat, pp.lng),
        ll_to_earth(search_lat, search_lng)
      ) <= (radius_km * 1000.0)
      AND (
        cat_slug IS NULL OR EXISTS (
          SELECT 1
          FROM pro_categories pc
          JOIN categories c ON c.id = pc.category_id
          WHERE pc.pro_profile_id = pp.id
            AND c.slug = cat_slug
        )
      )
  )
  SELECT * FROM ranked
  ORDER BY distance_km ASC;
$$;

-- =========================================================================
-- C) update_pro_rating: search_path + support UPDATE/DELETE on reviews
-- =========================================================================

CREATE OR REPLACE FUNCTION update_pro_rating()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_pro_user_id UUID;
  v_pro_profile_id UUID;
  v_avg DECIMAL(3,2);
  v_count INTEGER;
BEGIN
  -- Handle DELETE (use OLD) vs INSERT/UPDATE (use NEW)
  v_pro_user_id := COALESCE(NEW.reviewee_id, OLD.reviewee_id);

  SELECT id INTO v_pro_profile_id
  FROM pro_profiles
  WHERE user_id = v_pro_user_id;

  IF v_pro_profile_id IS NULL THEN
    RETURN COALESCE(NEW, OLD);
  END IF;

  SELECT
    COALESCE(AVG(rating)::DECIMAL(3,2), 0),
    COUNT(*)
  INTO v_avg, v_count
  FROM reviews
  WHERE reviewee_id = v_pro_user_id;

  UPDATE pro_profiles
  SET
    avg_rating = v_avg,
    total_reviews = v_count,
    updated_at = NOW()
  WHERE id = v_pro_profile_id;

  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Recreate trigger to support INSERT, UPDATE, and DELETE
DROP TRIGGER IF EXISTS trigger_update_pro_rating ON reviews;

CREATE TRIGGER trigger_update_pro_rating
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_pro_rating();

-- =========================================================================
-- D) update_conversation_last_message: search_path + COALESCE safety
-- =========================================================================

CREATE OR REPLACE FUNCTION update_conversation_last_message()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE conversations
  SET
    last_message_text = CASE
      WHEN NEW.message_type = 'image' THEN '[Image]'
      WHEN NEW.message_type = 'system' THEN '[System message]'
      ELSE LEFT(COALESCE(NEW.content, ''), 200)
    END,
    last_message_at = NEW.created_at
  WHERE id = NEW.conversation_id;

  RETURN NEW;
END;
$$;

-- =========================================================================
-- E) increment_job_count: search_path + fix client counter + idempotent timestamps
-- =========================================================================

CREATE OR REPLACE FUNCTION increment_job_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_pro_profile_id UUID;
BEGIN
  -- When job is completed
  IF NEW.status = 'completed' AND OLD.status <> 'completed' THEN
    -- Increment pro's completed job count
    IF NEW.assigned_pro_id IS NOT NULL THEN
      SELECT id INTO v_pro_profile_id
      FROM pro_profiles
      WHERE user_id = NEW.assigned_pro_id;

      IF v_pro_profile_id IS NOT NULL THEN
        UPDATE pro_profiles
        SET
          total_jobs_completed = total_jobs_completed + 1,
          current_job_id = NULL,
          current_status = 'available',
          updated_at = NOW()
        WHERE id = v_pro_profile_id;
      END IF;
    END IF;

    -- Set completion timestamp (only if not already set)
    IF NEW.completed_at IS NULL THEN
      NEW.completed_at = NOW();
    END IF;
  END IF;

  -- When job is posted (increment client's posted count)
  IF NEW.status = 'posted' AND OLD.status <> 'posted' THEN
    UPDATE client_profiles
    SET total_jobs_posted = total_jobs_posted + 1
    WHERE user_id = NEW.client_id;
  END IF;

  -- When job is assigned, update pro status
  IF NEW.status = 'in_progress' AND OLD.status <> 'in_progress' THEN
    IF NEW.assigned_pro_id IS NOT NULL THEN
      SELECT id INTO v_pro_profile_id
      FROM pro_profiles
      WHERE user_id = NEW.assigned_pro_id;

      IF v_pro_profile_id IS NOT NULL THEN
        UPDATE pro_profiles
        SET
          current_job_id = NEW.id,
          current_status = 'working',
          updated_at = NOW()
        WHERE id = v_pro_profile_id;
      END IF;
    END IF;

    -- Set started timestamp (only if not already set)
    IF NEW.started_at IS NULL THEN
      NEW.started_at = NOW();
    END IF;
  END IF;

  -- When job is assigned, set assigned timestamp (only if not already set)
  IF NEW.status = 'assigned' AND OLD.status <> 'assigned' THEN
    IF NEW.assigned_at IS NULL THEN
      NEW.assigned_at = NOW();
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

-- =========================================================================
-- F) handle_new_user: clamp role to allowed values only
-- =========================================================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_role TEXT;
BEGIN
  -- Clamp role to allowed values (never trust raw metadata blindly)
  v_role := CASE
    WHEN (NEW.raw_user_meta_data ->> 'role') IN ('client', 'pro') THEN NEW.raw_user_meta_data ->> 'role'
    ELSE 'client'
  END;

  INSERT INTO public.profiles (id, email, full_name, avatar_url, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'avatar_url', ''),
    v_role
  );

  -- If role is client, also create a client_profiles row
  IF v_role = 'client' THEN
    INSERT INTO public.client_profiles (user_id)
    VALUES (NEW.id);
  END IF;

  -- If role is pro, also create a pro_profiles row
  IF v_role = 'pro' THEN
    INSERT INTO public.pro_profiles (user_id)
    VALUES (NEW.id);
  END IF;

  RETURN NEW;
END;
$$;

-- =========================================================================
-- G) Project RLS helpers: SET search_path on all SECURITY DEFINER functions
-- =========================================================================

CREATE OR REPLACE FUNCTION is_project_member(p_project_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM project_members
    WHERE project_id = p_project_id
      AND user_id = auth.uid()
      AND is_active = TRUE
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public;

CREATE OR REPLACE FUNCTION is_project_contractor(p_project_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM project_members
    WHERE project_id = p_project_id
      AND user_id = auth.uid()
      AND role = 'contractor'
      AND is_active = TRUE
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public;

CREATE OR REPLACE FUNCTION is_project_client(p_project_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM project_members
    WHERE project_id = p_project_id
      AND user_id = auth.uid()
      AND role = 'client'
      AND is_active = TRUE
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public;

CREATE OR REPLACE FUNCTION is_project_admin(p_project_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM project_members
    WHERE project_id = p_project_id
      AND user_id = auth.uid()
      AND role = 'admin'
      AND is_active = TRUE
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public;

CREATE OR REPLACE FUNCTION task_gate_project_id(p_task_id UUID)
RETURNS UUID AS $$
  SELECT project_id FROM project_tasks WHERE id = p_task_id;
$$ LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public;

-- =========================================================================
-- H) projects_after_insert_seed: SET search_path
-- =========================================================================

CREATE OR REPLACE FUNCTION projects_after_insert_seed()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO project_counters (project_id) VALUES (NEW.id);

  INSERT INTO project_members (project_id, user_id, role, accepted_at)
  VALUES
    (NEW.id, NEW.client_id, 'client', NOW()),
    (NEW.id, NEW.contractor_id, 'contractor', NOW())
  ON CONFLICT (project_id, user_id) DO NOTHING;

  RETURN NEW;
END;
$$;

-- =========================================================================
-- I) Privilege hygiene: lock down SECURITY DEFINER functions
-- =========================================================================

-- Revoke public access to sensitive functions, grant only to authenticated users
REVOKE ALL ON FUNCTION find_nearby_pros(double precision, double precision, integer, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION find_nearby_pros(double precision, double precision, integer, text) TO authenticated;

-- RLS helpers are called internally by policies, but restrict direct invocation
REVOKE ALL ON FUNCTION is_project_member(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION is_project_member(uuid) TO authenticated;

REVOKE ALL ON FUNCTION is_project_contractor(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION is_project_contractor(uuid) TO authenticated;

REVOKE ALL ON FUNCTION is_project_client(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION is_project_client(uuid) TO authenticated;

REVOKE ALL ON FUNCTION is_project_admin(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION is_project_admin(uuid) TO authenticated;

REVOKE ALL ON FUNCTION task_gate_project_id(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION task_gate_project_id(uuid) TO authenticated;
