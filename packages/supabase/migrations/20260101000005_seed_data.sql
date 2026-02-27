-- =============================================================================
-- Development seed data
-- Only runs if no profiles exist (prevents double-seeding)
-- =============================================================================
DO $$
DECLARE
  -- Client user IDs
  client1_id UUID := 'c1000000-0000-0000-0000-000000000001';
  client2_id UUID := 'c1000000-0000-0000-0000-000000000002';
  client3_id UUID := 'c1000000-0000-0000-0000-000000000003';

  -- Pro user IDs
  pro1_id UUID := 'd1000000-0000-0000-0000-000000000001';
  pro2_id UUID := 'd1000000-0000-0000-0000-000000000002';
  pro3_id UUID := 'd1000000-0000-0000-0000-000000000003';

  -- Pro profile IDs
  pro_profile1_id UUID := 'dd100000-0000-0000-0000-000000000001';
  pro_profile2_id UUID := 'dd100000-0000-0000-0000-000000000002';
  pro_profile3_id UUID := 'dd100000-0000-0000-0000-000000000003';

  -- Job IDs
  job1_id UUID := 'e1000000-0000-0000-0000-000000000001';
  job2_id UUID := 'e1000000-0000-0000-0000-000000000002';
  job3_id UUID := 'e1000000-0000-0000-0000-000000000003';
  job4_id UUID := 'e1000000-0000-0000-0000-000000000004';
  job5_id UUID := 'e1000000-0000-0000-0000-000000000005';

  -- Bid IDs
  bid1_id UUID := 'b1000000-0000-0000-0000-000000000001';
  bid2_id UUID := 'b1000000-0000-0000-0000-000000000002';
  bid3_id UUID := 'b1000000-0000-0000-0000-000000000003';

  -- Conversation IDs
  conv1_id UUID := 'ce100000-0000-0000-0000-000000000001';
  conv2_id UUID := 'ce100000-0000-0000-0000-000000000002';

  -- Review IDs
  review1_id UUID := 'f1000000-0000-0000-0000-000000000001';
  review2_id UUID := 'f1000000-0000-0000-0000-000000000002';

  -- Category references
  painting_cat UUID := 'a1000000-0000-0000-0000-000000000001';
  moving_cat UUID := 'a1000000-0000-0000-0000-000000000002';
  cleaning_cat UUID := 'a1000000-0000-0000-0000-000000000004';
  handyman_cat UUID := 'a1000000-0000-0000-0000-000000000009';
  landscaping_cat UUID := 'a1000000-0000-0000-0000-000000000008';

  profile_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO profile_count FROM profiles;

  IF profile_count > 0 THEN
    RAISE NOTICE 'Seed data skipped: profiles table already has data.';
    RETURN;
  END IF;

  -- Create auth.users entries (required FK for profiles)
  -- raw_user_meta_data sets role so the handle_new_user() trigger creates the right profile type
  INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token)
  VALUES
    (client1_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'alice@example.com', extensions.crypt('password123', extensions.gen_salt('bf')), NOW(), '{"role":"client","full_name":"Alice Chen"}'::jsonb, NOW(), NOW(), '', ''),
    (client2_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'bob@example.com', extensions.crypt('password123', extensions.gen_salt('bf')), NOW(), '{"role":"client","full_name":"Bob Martinez"}'::jsonb, NOW(), NOW(), '', ''),
    (client3_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'carol@example.com', extensions.crypt('password123', extensions.gen_salt('bf')), NOW(), '{"role":"client","full_name":"Carol Williams"}'::jsonb, NOW(), NOW(), '', ''),
    (pro1_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'david@example.com', extensions.crypt('password123', extensions.gen_salt('bf')), NOW(), '{"role":"pro","full_name":"David Kim"}'::jsonb, NOW(), NOW(), '', ''),
    (pro2_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'elena@example.com', extensions.crypt('password123', extensions.gen_salt('bf')), NOW(), '{"role":"pro","full_name":"Elena Ivanova"}'::jsonb, NOW(), NOW(), '', ''),
    (pro3_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'frank@example.com', extensions.crypt('password123', extensions.gen_salt('bf')), NOW(), '{"role":"pro","full_name":"Frank Brown"}'::jsonb, NOW(), NOW(), '', '')
  ON CONFLICT (id) DO NOTHING;

  -- Create identities (required by Supabase auth)
  INSERT INTO auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
  VALUES
    (client1_id, client1_id, client1_id::text, jsonb_build_object('sub', client1_id::text, 'email', 'alice@example.com'), 'email', NOW(), NOW(), NOW()),
    (client2_id, client2_id, client2_id::text, jsonb_build_object('sub', client2_id::text, 'email', 'bob@example.com'), 'email', NOW(), NOW(), NOW()),
    (client3_id, client3_id, client3_id::text, jsonb_build_object('sub', client3_id::text, 'email', 'carol@example.com'), 'email', NOW(), NOW(), NOW()),
    (pro1_id, pro1_id, pro1_id::text, jsonb_build_object('sub', pro1_id::text, 'email', 'david@example.com'), 'email', NOW(), NOW(), NOW()),
    (pro2_id, pro2_id, pro2_id::text, jsonb_build_object('sub', pro2_id::text, 'email', 'elena@example.com'), 'email', NOW(), NOW(), NOW()),
    (pro3_id, pro3_id, pro3_id::text, jsonb_build_object('sub', pro3_id::text, 'email', 'frank@example.com'), 'email', NOW(), NOW(), NOW())
  ON CONFLICT DO NOTHING;

  -- ===========================================================================
  -- Client profiles
  -- ===========================================================================
  -- Use upsert because Supabase trigger may auto-create profiles from auth.users
  INSERT INTO profiles (id, email, full_name, phone, role, is_verified) VALUES
    (client1_id, 'alice.chen@example.com', 'Alice Chen', '+14165551001', 'client', TRUE),
    (client2_id, 'bob.martinez@example.com', 'Bob Martinez', '+14165551002', 'client', TRUE),
    (client3_id, 'carol.williams@example.com', 'Carol Williams', '+14165551003', 'client', FALSE)
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email, full_name = EXCLUDED.full_name,
    phone = EXCLUDED.phone, role = EXCLUDED.role, is_verified = EXCLUDED.is_verified;

  INSERT INTO client_profiles (user_id, default_address, default_lat, default_lng, default_city) VALUES
    (client1_id, '123 Queen St W, Toronto, ON', 43.6510, -79.3832, 'Toronto'),
    (client2_id, '456 Dundas St, Mississauga, ON', 43.5890, -79.6441, 'Mississauga'),
    (client3_id, '789 Main St N, Brampton, ON', 43.7315, -79.7624, 'Brampton')
  ON CONFLICT (user_id) DO UPDATE SET
    default_address = EXCLUDED.default_address, default_lat = EXCLUDED.default_lat,
    default_lng = EXCLUDED.default_lng, default_city = EXCLUDED.default_city;

  -- ===========================================================================
  -- Pro profiles
  -- ===========================================================================
  INSERT INTO profiles (id, email, full_name, phone, role, is_verified) VALUES
    (pro1_id, 'david.kim@example.com', 'David Kim', '+14165552001', 'pro', TRUE),
    (pro2_id, 'elena.ivanova@example.com', 'Elena Ivanova', '+14165552002', 'pro', TRUE),
    (pro3_id, 'frank.brown@example.com', 'Frank Brown', '+14165552003', 'pro', TRUE)
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email, full_name = EXCLUDED.full_name,
    phone = EXCLUDED.phone, role = EXCLUDED.role, is_verified = EXCLUDED.is_verified;

  -- Delete auto-created pro_profiles (trigger creates bare rows with random IDs;
  -- we need controlled IDs for pro_categories FK references)
  DELETE FROM pro_profiles WHERE user_id IN (pro1_id, pro2_id, pro3_id);

  INSERT INTO pro_profiles (id, user_id, bio, headline, hourly_rate_min, hourly_rate_max, service_radius_km, lat, lng, address, city, province, years_experience, is_available, avg_rating, total_reviews, total_jobs_completed, response_time_minutes, current_status, id_verified, background_check_passed) VALUES
    (
      pro_profile1_id, pro1_id,
      'Professional painter with over 12 years of experience in residential and commercial projects. I take pride in delivering clean, precise work every time. Fully insured and licensed.',
      'Expert Painter | 12+ Years Experience',
      35.00, 55.00, 30,
      43.6532, -79.3832,
      '100 King St W, Toronto, ON', 'Toronto', 'ON',
      12, TRUE, 4.85, 47, 152, 15,
      'available', TRUE, TRUE
    ),
    (
      pro_profile2_id, pro2_id,
      'Reliable and efficient moving specialist. My team and I handle local and long-distance moves with care. We treat your belongings as if they were our own.',
      'Professional Mover | Careful & Efficient',
      40.00, 65.00, 50,
      43.5890, -79.6441,
      '200 Hurontario St, Mississauga, ON', 'Mississauga', 'ON',
      8, TRUE, 4.72, 31, 98, 22,
      'available', TRUE, TRUE
    ),
    (
      pro_profile3_id, pro3_id,
      'Licensed handyman and general contractor specializing in home repairs, furniture assembly, and small renovation projects. No job is too small.',
      'Licensed Handyman | All-Around Fixer',
      30.00, 50.00, 25,
      43.7315, -79.7624,
      '300 Bovaird Dr, Brampton, ON', 'Brampton', 'ON',
      15, TRUE, 4.90, 63, 210, 10,
      'available', TRUE, TRUE
    );

  -- ===========================================================================
  -- Pro category associations
  -- ===========================================================================
  INSERT INTO pro_categories (pro_profile_id, category_id, years_experience, custom_rate_min, custom_rate_max) VALUES
    (pro_profile1_id, painting_cat, 12, 35.00, 55.00),
    (pro_profile2_id, moving_cat, 8, 40.00, 65.00),
    (pro_profile3_id, handyman_cat, 15, 30.00, 50.00),
    (pro_profile3_id, painting_cat, 10, 30.00, 45.00);

  -- ===========================================================================
  -- Jobs in various statuses
  -- ===========================================================================

  -- Job 1: Posted (open for bids)
  INSERT INTO jobs (id, client_id, category_id, title, description, status, address, city, lat, lng, preferred_date, time_start, time_end, is_flexible_date, is_urgent, suggested_price_min, suggested_price_max, details, estimated_hours, estimated_people_needed) VALUES
    (
      job1_id, client1_id, painting_cat,
      'Paint Living Room and Hallway',
      'Need to repaint my living room and hallway. The living room is about 350 sq ft and the hallway is about 120 sq ft. Currently a dark blue, want to go to a light grey. Walls are in good condition, minor nail holes to fill. Ceilings are 9 feet.',
      'posted',
      '123 Queen St W, Toronto, ON', 'Toronto', 43.6510, -79.3832,
      '2026-03-15', '09:00', '17:00',
      TRUE, FALSE,
      400.00, 800.00,
      '{"squareFootage": 470, "numberOfRooms": 2, "currentColor": "dark blue", "desiredColor": "light grey", "ceilingHeight": 9, "wallCondition": "good", "coatsNeeded": 2}',
      8.0, 1
    );

  -- Job 2: Bidding (has bids)
  INSERT INTO jobs (id, client_id, category_id, title, description, status, address, city, lat, lng, preferred_date, time_start, time_end, is_flexible_date, is_urgent, suggested_price_min, suggested_price_max, details, estimated_hours, estimated_people_needed) VALUES
    (
      job2_id, client2_id, moving_cat,
      'Move 2-Bedroom Apartment',
      'Moving from a 2-bedroom apartment on the 3rd floor (no elevator) to a house about 15 km away. Have a couch, dining table with 4 chairs, queen bed, single bed, dresser, desk, and about 30 boxes.',
      'bidding',
      '456 Dundas St, Mississauga, ON', 'Mississauga', 43.5890, -79.6441,
      '2026-03-20', '08:00', '16:00',
      FALSE, FALSE,
      500.00, 1200.00,
      '{"numberOfRooms": 4, "numberOfClosets": 3, "numberOfLargeItems": 6, "numberOfBeds": 2, "numberOfBoxes": 30, "floor": 3, "hasElevator": false, "distanceKm": 15}',
      6.0, 2
    );

  -- Job 3: In progress (assigned and started)
  INSERT INTO jobs (id, client_id, category_id, title, description, status, address, city, lat, lng, preferred_date, time_start, time_end, is_urgent, suggested_price_min, suggested_price_max, final_price, assigned_pro_id, assigned_at, started_at, details, estimated_hours) VALUES
    (
      job3_id, client1_id, handyman_cat,
      'Assemble IKEA Furniture Set',
      'Need help assembling a PAX wardrobe, KALLAX shelf unit, and a MALM dresser. All boxes are already in the rooms where furniture should go.',
      'in_progress',
      '123 Queen St W, Toronto, ON', 'Toronto', 43.6510, -79.3832,
      '2026-02-07', '10:00', '15:00',
      FALSE,
      150.00, 300.00, 220.00,
      pro3_id,
      NOW() - INTERVAL '2 hours',
      NOW() - INTERVAL '1 hour',
      '{"numberOfItems": 3, "numberOfWallMounts": 1, "numberOfTallItems": 2, "items": ["PAX wardrobe", "KALLAX shelf", "MALM dresser"]}',
      4.0
    );

  -- Job 4: Completed
  INSERT INTO jobs (id, client_id, category_id, title, description, status, address, city, lat, lng, preferred_date, suggested_price_min, suggested_price_max, final_price, assigned_pro_id, assigned_at, started_at, completed_at, details, estimated_hours) VALUES
    (
      job4_id, client3_id, cleaning_cat,
      'Deep Clean 3-Bedroom House',
      'End of tenancy deep clean for a 3-bedroom, 2-bathroom house. About 1400 sq ft. Need all rooms cleaned including kitchen appliances, bathroom tiles, and windows.',
      'completed',
      '789 Main St N, Brampton, ON', 'Brampton', 43.7315, -79.7624,
      '2026-01-28',
      200.00, 500.00, 380.00,
      pro3_id,
      '2026-01-26 14:00:00+00',
      '2026-01-28 09:00:00+00',
      '2026-01-28 16:00:00+00',
      '{"squareFootage": 1400, "numberOfRooms": 5, "numberOfBathrooms": 2, "numberOfKitchens": 1, "numberOfWindows": 12, "cleanType": "deep", "includeAppliances": true}',
      7.0
    );

  -- Job 5: Draft
  INSERT INTO jobs (id, client_id, category_id, title, description, status, address, city, lat, lng, details) VALUES
    (
      job5_id, client2_id, landscaping_cat,
      'Spring Lawn Cleanup',
      'Need spring cleanup for front and back yard. Leaf removal, dethatching, first mow of the season. Yard is about 3000 sq ft total.',
      'draft',
      '456 Dundas St, Mississauga, ON', 'Mississauga', 43.5890, -79.6441,
      '{"yardSizeSqFt": 3000, "services": ["leaf removal", "dethatching", "mowing"]}'
    );

  -- ===========================================================================
  -- Job bids
  -- ===========================================================================
  INSERT INTO job_bids (id, job_id, pro_id, amount, message, estimated_hours, estimated_start_date, status) VALUES
    (
      bid1_id, job2_id, pro2_id,
      850.00,
      'Hi Bob, I can handle this move with my team of 2. We have a 16-foot truck which should fit everything in one trip. I have moving blankets and dollies included. The 3rd floor walk-up will add some time but we are experienced with that.',
      5.5,
      '2026-03-20',
      'pending'
    ),
    (
      bid2_id, job1_id, pro1_id,
      650.00,
      'Hello Alice, I would be happy to paint your living room and hallway. Dark to light colour change will need 2 coats of primer plus 2 coats of paint. I will patch all nail holes and do a thorough prep. I use Benjamin Moore Regal Select which provides excellent coverage.',
      7.0,
      '2026-03-15',
      'pending'
    ),
    (
      bid3_id, job2_id, pro3_id,
      950.00,
      'Hi there, I can help with this move. I have a helper who can join and we will bring our own truck, blankets, and straps. The 3rd floor is no problem.',
      6.0,
      '2026-03-20',
      'pending'
    );

  -- ===========================================================================
  -- Conversations and messages
  -- ===========================================================================
  INSERT INTO conversations (id, job_id, participant_ids, last_message_text, last_message_at) VALUES
    (
      conv1_id, job3_id,
      ARRAY[client1_id, pro3_id],
      'I just finished the KALLAX shelf and starting on the dresser now.',
      NOW() - INTERVAL '30 minutes'
    ),
    (
      conv2_id, job2_id,
      ARRAY[client2_id, pro2_id],
      'Sounds good, I will confirm the date soon.',
      NOW() - INTERVAL '2 hours'
    );

  INSERT INTO messages (conversation_id, sender_id, content, message_type) VALUES
    (conv1_id, client1_id, 'Hi Frank, the boxes are all in the rooms. Let me know if you need anything.', 'text'),
    (conv1_id, pro3_id, 'Great, I am here now. Starting with the PAX wardrobe.', 'text'),
    (conv1_id, pro3_id, 'PAX wardrobe is done and secured to the wall. Looks solid.', 'text'),
    (conv1_id, pro3_id, 'I just finished the KALLAX shelf and starting on the dresser now.', 'text'),
    (conv2_id, pro2_id, 'Hi Bob, I am available on March 20th. I will bring a 16-foot truck and one helper.', 'text'),
    (conv2_id, client2_id, 'That works for me. What time would you arrive?', 'text'),
    (conv2_id, pro2_id, 'I can be there by 8 AM. The move should take about 5-6 hours including the drive.', 'text'),
    (conv2_id, client2_id, 'Sounds good, I will confirm the date soon.', 'text');

  -- ===========================================================================
  -- Reviews (for the completed job)
  -- ===========================================================================
  INSERT INTO reviews (id, job_id, reviewer_id, reviewee_id, rating, title, comment, quality_rating, punctuality_rating, communication_rating, value_rating) VALUES
    (
      review1_id, job4_id, client3_id, pro3_id,
      5,
      'Spotless clean, highly recommend',
      'Frank did an outstanding job deep cleaning my house for the end of tenancy. Every room was spotless, the kitchen appliances looked brand new, and the bathroom tiles were gleaming. He arrived on time, brought all his own supplies, and finished within the estimated timeframe. The landlord was very impressed with the result. Would absolutely hire again.',
      5, 5, 5, 5
    );

  -- ===========================================================================
  -- Job progress updates (for the in-progress job)
  -- ===========================================================================
  INSERT INTO job_progress (job_id, pro_id, update_type, message, is_public, metadata) VALUES
    (job3_id, pro3_id, 'started', 'Arrived on site and beginning with the PAX wardrobe assembly.', TRUE, '{"item": "PAX wardrobe"}'),
    (job3_id, pro3_id, 'milestone', 'PAX wardrobe assembled and wall-anchored. Moving to KALLAX shelf.', TRUE, '{"item": "PAX wardrobe", "status": "complete"}'),
    (job3_id, pro3_id, 'milestone', 'KALLAX shelf unit assembled. Starting MALM dresser.', TRUE, '{"item": "KALLAX shelf", "status": "complete"}');

  -- ===========================================================================
  -- Notifications
  -- ===========================================================================
  INSERT INTO notifications (user_id, type, title, body, data, is_read) VALUES
    (client1_id, 'bid_received', 'New bid on your painting job', 'David Kim bid $650 on "Paint Living Room and Hallway"', '{"job_id": "e1000000-0000-0000-0000-000000000001", "bid_id": "b1000000-0000-0000-0000-000000000002"}', FALSE),
    (client2_id, 'bid_received', 'New bid on your moving job', 'Elena Ivanova bid $850 on "Move 2-Bedroom Apartment"', '{"job_id": "e1000000-0000-0000-0000-000000000002", "bid_id": "b1000000-0000-0000-0000-000000000001"}', TRUE),
    (client2_id, 'bid_received', 'New bid on your moving job', 'Frank Brown bid $950 on "Move 2-Bedroom Apartment"', '{"job_id": "e1000000-0000-0000-0000-000000000002", "bid_id": "b1000000-0000-0000-0000-000000000003"}', FALSE),
    (client1_id, 'job_progress', 'Progress update on furniture assembly', 'Frank Brown: KALLAX shelf unit assembled. Starting MALM dresser.', '{"job_id": "e1000000-0000-0000-0000-000000000003"}', FALSE),
    (pro3_id, 'review_received', 'New 5-star review', 'Carol Williams left a 5-star review for "Deep Clean 3-Bedroom House"', '{"job_id": "e1000000-0000-0000-0000-000000000004", "review_id": "f1000000-0000-0000-0000-000000000001"}', FALSE);

  RAISE NOTICE 'Seed data inserted successfully.';
END;
$$;
