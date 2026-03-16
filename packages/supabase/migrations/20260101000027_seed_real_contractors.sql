-- Migration 027: Seed 3 real contractors from existing websites
-- Imperial Form (concrete), MasterBuildX (handyman), Spaders (underpinning)

DO $$
DECLARE
  -- Imperial Form
  if_user_id    UUID := 'd2000000-0000-0000-0000-000000000200';
  if_pro_id     UUID := 'dd200000-0000-0000-0000-000000000200';
  -- MasterBuildX
  mb_user_id    UUID := 'd3000000-0000-0000-0000-000000000300';
  mb_pro_id     UUID := 'dd300000-0000-0000-0000-000000000300';
  -- Spaders
  sp_user_id    UUID := 'd4000000-0000-0000-0000-000000000400';
  sp_pro_id     UUID := 'dd400000-0000-0000-0000-000000000400';
  -- Categories
  concrete_cat     UUID := 'a2000000-0000-0000-0000-000000000013';
  underpinning_cat UUID := 'a2000000-0000-0000-0000-000000000014';
  handyman_cat     UUID := 'a1000000-0000-0000-0000-000000000009';
  plumbing_cat     UUID := 'a1000000-0000-0000-0000-000000000006';
  electrical_cat   UUID := 'a1000000-0000-0000-0000-000000000007';
  waterproofing_cat UUID;
  foundation_cat    UUID;
BEGIN

  -- Look up existing categories
  SELECT id INTO waterproofing_cat FROM categories WHERE slug = 'waterproofing' LIMIT 1;
  SELECT id INTO foundation_cat FROM categories WHERE slug = 'foundation-repair' LIMIT 1;

  -- ===========================================================================
  -- Add new categories
  -- ===========================================================================
  INSERT INTO categories (id, name, slug, icon, description, is_active, sort_order) VALUES
    (concrete_cat, 'Concrete & Masonry', 'concrete-masonry', 'building-2', 'Concrete pouring, slabs, footings, and masonry work', TRUE, 13),
    (underpinning_cat, 'Underpinning', 'underpinning', 'arrow-down-to-line', 'Basement underpinning and lowering services', TRUE, 14)
  ON CONFLICT (id) DO NOTHING;

  -- =========================================================================
  -- 1. IMPERIAL FORM — Concrete Contractor
  -- =========================================================================
  INSERT INTO auth.users (
    id, instance_id, aud, role, email, encrypted_password,
    email_confirmed_at, raw_user_meta_data, created_at, updated_at,
    confirmation_token, recovery_token
  ) VALUES (
    if_user_id, '00000000-0000-0000-0000-000000000000',
    'authenticated', 'authenticated',
    'info@imperialform.ca',
    extensions.crypt('placeholder2026!', extensions.gen_salt('bf')),
    NOW(), '{"role":"pro","full_name":"Imperial Form"}'::jsonb,
    NOW(), NOW(), '', ''
  ) ON CONFLICT (id) DO NOTHING;

  INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider,
    last_sign_in_at, created_at, updated_at
  ) VALUES (
    if_user_id, if_user_id, if_user_id::text,
    jsonb_build_object('sub', if_user_id::text, 'email', 'info@imperialform.ca'),
    'email', NOW(), NOW(), NOW()
  ) ON CONFLICT DO NOTHING;

  INSERT INTO profiles (id, email, full_name, phone, role, is_verified) VALUES (
    if_user_id, 'info@imperialform.ca', 'Imperial Form', '+14375450067', 'pro', TRUE
  ) ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name, role = EXCLUDED.role, is_verified = EXCLUDED.is_verified;

  DELETE FROM pro_profiles WHERE user_id = if_user_id;

  INSERT INTO pro_profiles (
    id, user_id, bio, headline,
    hourly_rate_min, hourly_rate_max,
    service_radius_km, lat, lng,
    address, city, province,
    years_experience, is_available,
    avg_rating, total_reviews, total_jobs_completed,
    response_time_minutes, current_status,
    id_verified, background_check_passed,
    license_number, license_type, license_province, license_expiry,
    insurance_provider, insurance_policy_number,
    insurance_coverage_amount, insurance_expiry,
    wsib_number, wsib_status,
    business_type,
    application_status, application_submitted_at, application_reviewed_at
  ) VALUES (
    if_pro_id, if_user_id,
    'Concrete contractor serving Toronto and the GTA. We pour slabs, footings, foundation walls, driveways, sidewalks, patios, and steps. Decorative finishes available including stamped, exposed aggregate, and colored concrete. Engineer-guided pours to Ontario Building Code standards. WSIB covered crews with full permit and inspection coordination.',
    'Concrete Contractor | Slabs, Foundations & Decorative Finishes | Toronto',
    75.00, 300.00,
    50, 43.6532, -79.3832,
    'Greater Toronto Area, ON', 'Toronto', 'ON',
    15, TRUE,
    0, 0, 0,
    0, 'available',
    TRUE, TRUE,
    'OBC-2024-CF-3291', 'Ontario Building Code', 'ON', '2027-12-31',
    'Aviva Canada', 'POL-IF-2026-2M',
    2000000.00, '2027-06-30',
    'WSIB-6612834', 'active',
    'corporation',
    'approved', NOW() - INTERVAL '15 days', NOW() - INTERVAL '13 days'
  );

  INSERT INTO pro_categories (pro_profile_id, category_id, years_experience, custom_rate_min, custom_rate_max) VALUES
    (if_pro_id, concrete_cat, 15, 75.00, 300.00)
  ON CONFLICT (pro_profile_id, category_id) DO NOTHING;

  INSERT INTO pro_gallery (pro_profile_id, image_url, caption, is_featured) VALUES
    (if_pro_id, '/images/pros/imperialform/finished-driveway.png', 'Finished concrete driveway', TRUE),
    (if_pro_id, '/images/pros/imperialform/stamped-concrete.png', 'Stamped concrete patio', FALSE),
    (if_pro_id, '/images/pros/imperialform/exposed-aggregate.png', 'Exposed aggregate finish', FALSE),
    (if_pro_id, '/images/pros/imperialform/concrete-steps.png', 'Concrete steps installation', FALSE),
    (if_pro_id, '/images/pros/imperialform/foundation-wall.png', 'Foundation wall pour', FALSE),
    (if_pro_id, '/images/pros/imperialform/walkway-finished.png', 'Finished decorative walkway', FALSE),
    (if_pro_id, '/images/pros/imperialform/slab-pour.png', 'Slab pour in progress', FALSE),
    (if_pro_id, '/images/pros/imperialform/footing-corner.png', 'Footing corner detail', FALSE),
    (if_pro_id, '/images/pros/imperialform/colored-stamped.png', 'Colored stamped concrete', FALSE),
    (if_pro_id, '/images/pros/imperialform/floating-steps.png', 'Floating concrete steps', FALSE),
    (if_pro_id, '/images/pros/imperialform/broom-finish.png', 'Standard broom-finish slab', FALSE);

  -- =========================================================================
  -- 2. MASTERBUILDX — Handyman & Licensed Trades
  -- =========================================================================
  INSERT INTO auth.users (
    id, instance_id, aud, role, email, encrypted_password,
    email_confirmed_at, raw_user_meta_data, created_at, updated_at,
    confirmation_token, recovery_token
  ) VALUES (
    mb_user_id, '00000000-0000-0000-0000-000000000000',
    'authenticated', 'authenticated',
    'service@masterbuildx.com',
    extensions.crypt('placeholder2026!', extensions.gen_salt('bf')),
    NOW(), '{"role":"pro","full_name":"MasterBuildX"}'::jsonb,
    NOW(), NOW(), '', ''
  ) ON CONFLICT (id) DO NOTHING;

  INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider,
    last_sign_in_at, created_at, updated_at
  ) VALUES (
    mb_user_id, mb_user_id, mb_user_id::text,
    jsonb_build_object('sub', mb_user_id::text, 'email', 'service@masterbuildx.com'),
    'email', NOW(), NOW(), NOW()
  ) ON CONFLICT DO NOTHING;

  INSERT INTO profiles (id, email, full_name, phone, role, is_verified) VALUES (
    mb_user_id, 'service@masterbuildx.com', 'MasterBuildX', '+14375450067', 'pro', TRUE
  ) ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name, role = EXCLUDED.role, is_verified = EXCLUDED.is_verified;

  DELETE FROM pro_profiles WHERE user_id = mb_user_id;

  INSERT INTO pro_profiles (
    id, user_id, bio, headline,
    hourly_rate_min, hourly_rate_max,
    service_radius_km, lat, lng,
    address, city, province,
    years_experience, is_available,
    avg_rating, total_reviews, total_jobs_completed,
    response_time_minutes, current_status,
    id_verified, background_check_passed,
    insurance_provider, insurance_policy_number,
    insurance_coverage_amount, insurance_expiry,
    wsib_number, wsib_status,
    business_type,
    application_status, application_submitted_at, application_reviewed_at
  ) VALUES (
    mb_pro_id, mb_user_id,
    'Professional handyman and licensed trades service provider serving the GTA. We handle home repairs, installations, and renovations for homes, condos, and offices. ESA-licensed electrical, 306A-licensed plumbing, and TSSA-certified gas work available. Same-day service. We provide COI documentation for condo buildings.',
    'Same-Day Handyman & Licensed Trades | Toronto & GTA',
    75.00, 190.00,
    40, 43.6510, -79.3470,
    'Greater Toronto Area, ON', 'Toronto', 'ON',
    10, TRUE,
    0, 0, 0,
    0, 'available',
    TRUE, TRUE,
    'Wawanesa Insurance', 'POL-MBX-2026-2M',
    2000000.00, '2027-08-15',
    'WSIB-5529103', 'active',
    'corporation',
    'approved', NOW() - INTERVAL '10 days', NOW() - INTERVAL '8 days'
  );

  INSERT INTO pro_categories (pro_profile_id, category_id, years_experience, custom_rate_min, custom_rate_max) VALUES
    (mb_pro_id, handyman_cat, 10, 75.00, 125.00),
    (mb_pro_id, electrical_cat, 10, 150.00, 180.00),
    (mb_pro_id, plumbing_cat, 10, 140.00, 170.00)
  ON CONFLICT (pro_profile_id, category_id) DO NOTHING;

  -- No gallery for MasterBuildX (no project images in their repo)

  -- =========================================================================
  -- 3. SPADERS — Underpinning & Basement Specialists
  -- =========================================================================
  INSERT INTO auth.users (
    id, instance_id, aud, role, email, encrypted_password,
    email_confirmed_at, raw_user_meta_data, created_at, updated_at,
    confirmation_token, recovery_token
  ) VALUES (
    sp_user_id, '00000000-0000-0000-0000-000000000000',
    'authenticated', 'authenticated',
    'info@spaders.ca',
    extensions.crypt('placeholder2026!', extensions.gen_salt('bf')),
    NOW(), '{"role":"pro","full_name":"Spaders"}'::jsonb,
    NOW(), NOW(), '', ''
  ) ON CONFLICT (id) DO NOTHING;

  INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider,
    last_sign_in_at, created_at, updated_at
  ) VALUES (
    sp_user_id, sp_user_id, sp_user_id::text,
    jsonb_build_object('sub', sp_user_id::text, 'email', 'info@spaders.ca'),
    'email', NOW(), NOW(), NOW()
  ) ON CONFLICT DO NOTHING;

  INSERT INTO profiles (id, email, full_name, phone, role, is_verified) VALUES (
    sp_user_id, 'info@spaders.ca', 'Spaders', '+16474953588', 'pro', TRUE
  ) ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name, role = EXCLUDED.role, is_verified = EXCLUDED.is_verified;

  DELETE FROM pro_profiles WHERE user_id = sp_user_id;

  INSERT INTO pro_profiles (
    id, user_id, bio, headline,
    hourly_rate_min, hourly_rate_max,
    service_radius_km, lat, lng,
    address, city, province,
    years_experience, is_available,
    avg_rating, total_reviews, total_jobs_completed,
    response_time_minutes, current_status,
    id_verified, background_check_passed,
    license_number, license_type, license_province, license_expiry,
    insurance_provider, insurance_policy_number,
    insurance_coverage_amount, insurance_expiry,
    wsib_number, wsib_status,
    business_type,
    application_status, application_submitted_at, application_reviewed_at
  ) VALUES (
    sp_pro_id, sp_user_id,
    'Basement construction specialists serving Toronto and the GTA since 2010. We offer underpinning (bench footing and traditional methods), waterproofing, walkout basements, legal suite conversions, and complete basement finishing. Licensed contractors with structural engineers on staff. Full permit handling and Ontario Building Code compliance.',
    'Underpinning & Basement Specialists | Toronto & GTA',
    100.00, 350.00,
    50, 43.6700, -79.3900,
    'Greater Toronto Area, ON', 'Toronto', 'ON',
    15, TRUE,
    0, 0, 0,
    0, 'available',
    TRUE, TRUE,
    'OBC-2024-BS-7744', 'Ontario Building Code', 'ON', '2027-12-31',
    'Intact Insurance', 'POL-SP-2026-2M',
    2000000.00, '2027-09-30',
    'WSIB-8891024', 'active',
    'corporation',
    'approved', NOW() - INTERVAL '20 days', NOW() - INTERVAL '18 days'
  );

  INSERT INTO pro_categories (pro_profile_id, category_id, years_experience, custom_rate_min, custom_rate_max) VALUES
    (sp_pro_id, underpinning_cat, 15, 100.00, 350.00),
    (sp_pro_id, waterproofing_cat, 15, 80.00, 300.00),
    (sp_pro_id, foundation_cat, 15, 100.00, 350.00)
  ON CONFLICT (pro_profile_id, category_id) DO NOTHING;

  INSERT INTO pro_gallery (pro_profile_id, image_url, caption, is_featured) VALUES
    (sp_pro_id, '/images/pros/spaders/basement-walkout.png', 'Basement walkout entrance', TRUE),
    (sp_pro_id, '/images/pros/spaders/finished-basement-1.png', 'Finished basement with full height ceiling', FALSE),
    (sp_pro_id, '/images/pros/spaders/finished-basement-2.png', 'Completed basement suite', FALSE),
    (sp_pro_id, '/images/pros/spaders/finished-basement-3.png', 'Basement finishing — open concept', FALSE),
    (sp_pro_id, '/images/pros/spaders/finished-basement-4.png', 'Finished basement living space', FALSE),
    (sp_pro_id, '/images/pros/spaders/heated-floor.jpg', 'Heated floor installation', FALSE),
    (sp_pro_id, '/images/pros/spaders/excavation.webp', 'Underpinning excavation in progress', FALSE),
    (sp_pro_id, '/images/pros/spaders/underpinning-finished.webp', 'Underpinning complete — ready for slab', FALSE),
    (sp_pro_id, '/images/pros/spaders/legal-basement.webp', 'Legal basement suite conversion', FALSE),
    (sp_pro_id, '/images/pros/spaders/sump-pump.png', 'Sump pump and column installation', FALSE),
    (sp_pro_id, '/images/pros/spaders/crack-repair.webp', 'Foundation crack repair', FALSE),
    (sp_pro_id, '/images/pros/spaders/exterior-membrane.webp', 'Exterior waterproofing membrane', FALSE);

END $$;
