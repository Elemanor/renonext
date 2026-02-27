-- =============================================================================
-- find_nearby_pros: Find professionals within a radius of a given location
-- Uses earthdistance extension for accurate distance calculation
-- =============================================================================
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
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
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
    (extensions.earth_distance(
      extensions.ll_to_earth(pp.lat, pp.lng),
      extensions.ll_to_earth(search_lat, search_lng)
    ) / 1000.0) AS distance_km
  FROM pro_profiles pp
  INNER JOIN profiles p ON p.id = pp.user_id
  LEFT JOIN pro_categories pc ON pc.pro_profile_id = pp.id
  LEFT JOIN categories c ON c.id = pc.category_id
  WHERE
    pp.is_available = TRUE
    AND pp.lat IS NOT NULL
    AND pp.lng IS NOT NULL
    AND extensions.earth_distance(
      extensions.ll_to_earth(pp.lat, pp.lng),
      extensions.ll_to_earth(search_lat, search_lng)
    ) <= (radius_km * 1000.0)
    AND (cat_slug IS NULL OR c.slug = cat_slug)
  GROUP BY pp.id, pp.user_id, p.full_name, p.avatar_url, pp.headline, pp.bio,
           pp.hourly_rate_min, pp.hourly_rate_max, pp.avg_rating, pp.total_reviews,
           pp.total_jobs_completed, pp.response_time_minutes, pp.years_experience, pp.city,
           pp.lat, pp.lng
  ORDER BY distance_km ASC;
END;
$$;

-- =============================================================================
-- update_pro_rating: Trigger function to recalculate pro average rating
-- Fires after a review is inserted
-- =============================================================================
CREATE OR REPLACE FUNCTION update_pro_rating()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_pro_user_id UUID;
  v_pro_profile_id UUID;
  v_avg DECIMAL(3,2);
  v_count INTEGER;
BEGIN
  v_pro_user_id := NEW.reviewee_id;

  SELECT id INTO v_pro_profile_id
  FROM pro_profiles
  WHERE user_id = v_pro_user_id;

  IF v_pro_profile_id IS NULL THEN
    RETURN NEW;
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

  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_update_pro_rating
  AFTER INSERT ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_pro_rating();

-- =============================================================================
-- update_conversation_last_message: Keeps conversation metadata in sync
-- Fires after a message is inserted
-- =============================================================================
CREATE OR REPLACE FUNCTION update_conversation_last_message()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE conversations
  SET
    last_message_text = CASE
      WHEN NEW.message_type = 'image' THEN '[Image]'
      WHEN NEW.message_type = 'system' THEN '[System message]'
      ELSE LEFT(NEW.content, 200)
    END,
    last_message_at = NEW.created_at
  WHERE id = NEW.conversation_id;

  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_update_conversation_last_message
  AFTER INSERT ON messages
  FOR EACH ROW
  EXECUTE FUNCTION update_conversation_last_message();

-- =============================================================================
-- increment_job_count: Updates job counts when a job is marked completed
-- Fires on job status update
-- =============================================================================
CREATE OR REPLACE FUNCTION increment_job_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_pro_profile_id UUID;
BEGIN
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

    -- Increment client's posted job count
    UPDATE client_profiles
    SET total_jobs_posted = total_jobs_posted + 1
    WHERE user_id = NEW.client_id;

    -- Set completion timestamp
    NEW.completed_at = NOW();
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

    -- Set started timestamp
    NEW.started_at = NOW();
  END IF;

  -- When job is assigned, set assigned timestamp
  IF NEW.status = 'assigned' AND OLD.status <> 'assigned' THEN
    NEW.assigned_at = NOW();
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_increment_job_count
  BEFORE UPDATE ON jobs
  FOR EACH ROW
  WHEN (OLD.status IS DISTINCT FROM NEW.status)
  EXECUTE FUNCTION increment_job_count();

-- =============================================================================
-- Helper: Create profile on auth.users insert
-- Automatically creates a profiles row when a new user signs up
-- =============================================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'avatar_url', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'role', 'client')
  );

  -- If role is client, also create a client_profiles row
  IF COALESCE(NEW.raw_user_meta_data ->> 'role', 'client') = 'client' THEN
    INSERT INTO public.client_profiles (user_id)
    VALUES (NEW.id);
  END IF;

  -- If role is pro, also create a pro_profiles row
  IF NEW.raw_user_meta_data ->> 'role' = 'pro' THEN
    INSERT INTO public.pro_profiles (user_id)
    VALUES (NEW.id);
  END IF;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
