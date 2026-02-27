import { supabase } from './supabase';
import type { Profile, ProProfile, ClientProfile } from '../types/user';

export async function getProfile(id: string): Promise<Profile> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data as Profile;
}

export async function updateProfile(
  id: string,
  updates: Partial<Pick<Profile, 'full_name' | 'phone' | 'avatar_url'>>
): Promise<Profile> {
  const { data, error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Profile;
}

export async function getProProfile(userId: string): Promise<ProProfile> {
  const { data, error } = await supabase
    .from('pro_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
  if (error) throw error;
  return data as ProProfile;
}

export async function updateProProfile(
  userId: string,
  updates: Partial<
    Omit<ProProfile, 'id' | 'user_id' | 'created_at' | 'updated_at'>
  >
): Promise<ProProfile> {
  const { data, error } = await supabase
    .from('pro_profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('user_id', userId)
    .select()
    .single();
  if (error) throw error;
  return data as ProProfile;
}

export async function createProProfile(
  profileData: Omit<ProProfile, 'id' | 'created_at' | 'updated_at'>
): Promise<ProProfile> {
  const { data, error } = await supabase
    .from('pro_profiles')
    .insert(profileData)
    .select()
    .single();
  if (error) throw error;
  return data as ProProfile;
}

export async function getClientProfile(
  userId: string
): Promise<ClientProfile> {
  const { data, error } = await supabase
    .from('client_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
  if (error) throw error;
  return data as ClientProfile;
}

export async function createClientProfile(
  profileData: Omit<ClientProfile, 'id' | 'created_at'>
): Promise<ClientProfile> {
  const { data, error } = await supabase
    .from('client_profiles')
    .insert(profileData)
    .select()
    .single();
  if (error) throw error;
  return data as ClientProfile;
}

export async function uploadAvatar(
  userId: string,
  file: File | Blob
): Promise<string> {
  const fileExt = file instanceof File ? file.name.split('.').pop() : 'jpg';
  const filePath = `${userId}/avatar.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, { upsert: true });
  if (uploadError) throw uploadError;

  const {
    data: { publicUrl },
  } = supabase.storage.from('avatars').getPublicUrl(filePath);

  await updateProfile(userId, { avatar_url: publicUrl });

  return publicUrl;
}
