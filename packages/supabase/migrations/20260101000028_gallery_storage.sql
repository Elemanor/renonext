-- Migration 028: Create storage bucket for pro gallery images
-- =============================================================================

-- Create the pro-gallery storage bucket (public for read access)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'pro-gallery',
  'pro-gallery',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS policies
-- Anyone can read (public bucket)
CREATE POLICY "pro_gallery_storage_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'pro-gallery');

-- Authenticated users can upload to their own folder ({user_id}/*)
CREATE POLICY "pro_gallery_storage_insert"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'pro-gallery'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Authenticated users can delete their own uploads
CREATE POLICY "pro_gallery_storage_delete"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'pro-gallery'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );
