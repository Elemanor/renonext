-- Migration 026: Remove fake seed contractors
-- Keep only DrySpace Waterproofing as the real first pro

-- Delete in dependency order to avoid FK violations

-- Remove reviews by/for fake pros
DELETE FROM reviews WHERE reviewer_id IN (
  SELECT user_id FROM pro_profiles WHERE bio LIKE '%professional painter%'
     OR bio LIKE '%professional mover%'
     OR bio LIKE '%handyman%with over 15 years%'
);

-- Remove pro gallery for fake pros
DELETE FROM pro_gallery WHERE pro_profile_id IN (
  SELECT id FROM pro_profiles WHERE bio LIKE '%professional painter%'
     OR bio LIKE '%professional mover%'
     OR bio LIKE '%handyman%with over 15 years%'
);

-- Remove pro_categories for fake pros
DELETE FROM pro_categories WHERE pro_profile_id IN (
  SELECT id FROM pro_profiles WHERE bio LIKE '%professional painter%'
     OR bio LIKE '%professional mover%'
     OR bio LIKE '%handyman%with over 15 years%'
);

-- Remove pro_profiles
DELETE FROM pro_profiles WHERE bio LIKE '%professional painter%'
   OR bio LIKE '%professional mover%'
   OR bio LIKE '%handyman%with over 15 years%';

-- Remove profiles (keep auth.users — Supabase manages those)
DELETE FROM profiles WHERE email IN (
  'david@example.com',
  'elena@example.com',
  'frank@example.com'
);
