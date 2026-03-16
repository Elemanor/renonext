-- Migration 025: Fix DrySpace fake stats and bio
-- Remove fabricated claims, use honest placeholder data

UPDATE pro_profiles
SET
  bio = 'Basement waterproofing and foundation repair specialists serving the Greater Toronto Area. We offer interior and exterior waterproofing, foundation crack repair, sump pump installation, and drainage solutions. Over 20 years of industry experience. WSIB covered and fully insured.',
  headline = 'Waterproofing & Foundation Repair | GTA',
  -- Reset fabricated review/project stats to honest values
  avg_rating = 0,
  total_reviews = 0,
  total_jobs_completed = 0,
  -- Keep real fields: experience, availability, verification
  years_experience = 20
WHERE id = (
  SELECT id FROM pro_profiles
  WHERE bio LIKE '%most trusted water protection%'
  LIMIT 1
);
