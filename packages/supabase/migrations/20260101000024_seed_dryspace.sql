-- =============================================================================
-- Seed DrySpace Waterproofing — first real pro on the platform
-- =============================================================================
DO $$
DECLARE
  -- DrySpace user & profile IDs
  ds_user_id     UUID := 'd1000000-0000-0000-0000-000000000100';
  ds_profile_id  UUID := 'dd100000-0000-0000-0000-000000000100';

  -- New category IDs
  waterproofing_cat UUID := 'a1000000-0000-0000-0000-000000000011';
  foundation_cat    UUID := 'a1000000-0000-0000-0000-000000000012';
BEGIN

  -- ===========================================================================
  -- Add Waterproofing & Foundation categories (if not already present)
  -- ===========================================================================
  INSERT INTO categories (id, name, slug, icon, description, is_active, sort_order) VALUES
    (waterproofing_cat, 'Waterproofing', 'waterproofing', 'droplets', 'Basement and foundation waterproofing services', TRUE, 11),
    (foundation_cat, 'Foundation Repair', 'foundation-repair', 'building', 'Foundation repair, underpinning, and structural work', TRUE, 12)
  ON CONFLICT (id) DO NOTHING;

  -- ===========================================================================
  -- Create auth.users entry for DrySpace
  -- ===========================================================================
  INSERT INTO auth.users (
    id, instance_id, aud, role, email, encrypted_password,
    email_confirmed_at, raw_user_meta_data, created_at, updated_at,
    confirmation_token, recovery_token
  ) VALUES (
    ds_user_id,
    '00000000-0000-0000-0000-000000000000',
    'authenticated', 'authenticated',
    'info@dryspace.ca',
    extensions.crypt('dryspace2026!', extensions.gen_salt('bf')),
    NOW(),
    '{"role":"pro","full_name":"DrySpace Waterproofing"}'::jsonb,
    NOW(), NOW(), '', ''
  ) ON CONFLICT (id) DO NOTHING;

  INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider,
    last_sign_in_at, created_at, updated_at
  ) VALUES (
    ds_user_id, ds_user_id, ds_user_id::text,
    jsonb_build_object('sub', ds_user_id::text, 'email', 'info@dryspace.ca'),
    'email', NOW(), NOW(), NOW()
  ) ON CONFLICT DO NOTHING;

  -- ===========================================================================
  -- Profile (public user record)
  -- ===========================================================================
  INSERT INTO profiles (id, email, full_name, phone, role, is_verified) VALUES (
    ds_user_id,
    'info@dryspace.ca',
    'DrySpace Waterproofing',
    '+14375450067',
    'pro',
    TRUE
  ) ON CONFLICT (id) DO UPDATE SET
    email       = EXCLUDED.email,
    full_name   = EXCLUDED.full_name,
    phone       = EXCLUDED.phone,
    role        = EXCLUDED.role,
    is_verified = EXCLUDED.is_verified;

  -- ===========================================================================
  -- Pro profile (contractor details)
  -- Remove any auto-created row first (trigger creates bare row)
  -- ===========================================================================
  DELETE FROM pro_profiles WHERE user_id = ds_user_id;

  INSERT INTO pro_profiles (
    id, user_id,
    -- Basic info
    bio, headline,
    hourly_rate_min, hourly_rate_max,
    -- Location
    service_radius_km, lat, lng, address, city, province,
    -- Experience
    years_experience, is_available,
    avg_rating, total_reviews, total_jobs_completed,
    response_time_minutes, current_status,
    -- Verification
    id_verified, background_check_passed,
    -- License (migration 023)
    license_number, license_type, license_province, license_expiry,
    -- Insurance (migration 023)
    insurance_provider, insurance_policy_number,
    insurance_coverage_amount, insurance_expiry,
    -- WSIB (migration 023)
    wsib_number, wsib_status,
    -- Business (migration 023)
    business_number, business_type,
    -- Portfolio
    portfolio_urls,
    -- Application (migration 023) — approved to show in /pros directory
    application_status, application_submitted_at, application_reviewed_at
  ) VALUES (
    ds_profile_id, ds_user_id,
    -- Bio
    'GTA''s most trusted water protection experts. Protecting local homes from moisture damage since 1999. 24/7 emergency response under 60 minutes, lifetime transferable warranty, and government rebates available. Over 15,000 projects completed with 487+ five-star reviews. WSIB covered, Ontario Building Code certified, BBB A+ rated.',
    'Waterproofing & Foundation Specialists | 25+ Years | Lifetime Warranty',
    -- Rates
    50.00, 300.00,
    -- Location (GTA-wide, centred on Toronto)
    60, 43.6532, -79.3832,
    'Greater Toronto Area, ON', 'Toronto', 'ON',
    -- Experience & stats
    25, TRUE,
    4.90, 487, 15000,
    60, 'available',
    -- Verification
    TRUE, TRUE,
    -- License
    'OBC-2024-WP-4821', 'Ontario Building Code', 'ON', '2027-12-31',
    -- Insurance
    'Intact Insurance', 'POL-DS-2026-5M',
    5000000.00, '2027-06-30',
    -- WSIB
    'WSIB-7734821', 'active',
    -- Business
    'BN-8827341', 'corporation',
    -- Portfolio
    '["https://dryspace.ca", "https://renonext.com/pros/dryspace-waterproofing"]'::jsonb,
    -- Application approved
    'approved', NOW() - INTERVAL '30 days', NOW() - INTERVAL '28 days'
  );

  -- ===========================================================================
  -- Link DrySpace to categories
  -- ===========================================================================
  INSERT INTO pro_categories (pro_profile_id, category_id, years_experience, custom_rate_min, custom_rate_max) VALUES
    (ds_profile_id, waterproofing_cat, 25, 50.00, 300.00),
    (ds_profile_id, foundation_cat,    25, 100.00, 450.00)
  ON CONFLICT (pro_profile_id, category_id) DO NOTHING;

  -- ===========================================================================
  -- Gallery — real project photos
  -- ===========================================================================
  INSERT INTO pro_gallery (pro_profile_id, image_url, caption, is_featured, created_at) VALUES
    (ds_profile_id, '/images/pros/dryspace/hero.webp',             'DrySpace team on site — exterior waterproofing project',       TRUE,  NOW() - INTERVAL '7 days'),
    (ds_profile_id, '/images/pros/dryspace/exterior-1.webp',       'Exterior waterproofing in progress — Toronto',                 FALSE, NOW() - INTERVAL '6 days'),
    (ds_profile_id, '/images/pros/dryspace/exterior-2.webp',       'Full excavation for exterior membrane installation',           FALSE, NOW() - INTERVAL '5 days'),
    (ds_profile_id, '/images/pros/dryspace/membrane.webp',         'Exterior waterproofing membrane applied to foundation',        FALSE, NOW() - INTERVAL '4 days'),
    (ds_profile_id, '/images/pros/dryspace/dimpled-membrane.webp', 'Dimpled membrane installed at base of footing',                FALSE, NOW() - INTERVAL '3 days'),
    (ds_profile_id, '/images/pros/dryspace/crack-repair.webp',     'Foundation crack repair — epoxy injection',                    FALSE, NOW() - INTERVAL '2 days'),
    (ds_profile_id, '/images/pros/dryspace/interior.webp',         'Interior waterproofing system with drainage',                  FALSE, NOW() - INTERVAL '2 days'),
    (ds_profile_id, '/images/pros/dryspace/sump-pump.webp',        'New sump pump installation',                                  FALSE, NOW() - INTERVAL '1 day'),
    (ds_profile_id, '/images/pros/dryspace/sump-backup.webp',      'Sump pump with battery backup system',                        FALSE, NOW() - INTERVAL '1 day'),
    (ds_profile_id, '/images/pros/dryspace/warranty.webp',         'DrySpace exterior waterproofing warranty documentation',       FALSE, NOW()),
    (ds_profile_id, '/images/pros/dryspace/excellence.webp',       'DrySpace excellence certification',                           FALSE, NOW());

  -- ===========================================================================
  -- Also approve existing seed pros so they show alongside DrySpace
  -- ===========================================================================
  UPDATE pro_profiles
    SET application_status = 'approved',
        application_submitted_at = COALESCE(application_submitted_at, NOW() - INTERVAL '60 days'),
        application_reviewed_at  = COALESCE(application_reviewed_at,  NOW() - INTERVAL '58 days')
  WHERE application_status = 'incomplete'
    AND id_verified = TRUE
    AND background_check_passed = TRUE;

  RAISE NOTICE 'DrySpace Waterproofing seeded successfully.';
END;
$$;
