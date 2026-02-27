import { supabase } from './supabase';

export async function uploadImage(
  bucket: string,
  path: string,
  file: File | Blob
): Promise<string> {
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    upsert: true,
    cacheControl: '3600',
  });
  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(path);

  return publicUrl;
}

export function getPublicUrl(bucket: string, path: string): string {
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(path);
  return publicUrl;
}

export async function deleteImage(
  bucket: string,
  path: string
): Promise<void> {
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) throw error;
}

export async function uploadJobPhoto(
  jobId: string,
  file: File | Blob
): Promise<string> {
  const timestamp = Date.now();
  const ext = file instanceof File ? file.name.split('.').pop() : 'jpg';
  const path = `jobs/${jobId}/${timestamp}.${ext}`;
  return uploadImage('job-photos', path, file);
}

export async function uploadGalleryPhoto(
  proId: string,
  file: File | Blob
): Promise<string> {
  const timestamp = Date.now();
  const ext = file instanceof File ? file.name.split('.').pop() : 'jpg';
  const path = `gallery/${proId}/${timestamp}.${ext}`;
  return uploadImage('gallery', path, file);
}

export async function uploadProgressPhoto(
  jobId: string,
  file: File | Blob
): Promise<string> {
  const timestamp = Date.now();
  const ext = file instanceof File ? file.name.split('.').pop() : 'jpg';
  const path = `progress/${jobId}/${timestamp}.${ext}`;
  return uploadImage('progress-photos', path, file);
}
