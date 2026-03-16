import { NextResponse, type NextRequest } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get pro_profile_id for this user
  const { data: pro } = await supabase
    .from('pro_profiles')
    .select('id')
    .eq('user_id', user.id)
    .single();

  if (!pro) {
    return NextResponse.json({ error: 'Pro profile not found' }, { status: 404 });
  }

  const { data: gallery, error } = await supabase
    .from('pro_gallery')
    .select('*')
    .eq('pro_profile_id', pro.id)
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ gallery: gallery || [] });
}

export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get pro_profile_id
  const { data: pro } = await supabase
    .from('pro_profiles')
    .select('id')
    .eq('user_id', user.id)
    .single();

  if (!pro) {
    return NextResponse.json({ error: 'Pro profile not found' }, { status: 404 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  const caption = formData.get('caption') as string | null;
  const isFeatured = formData.get('is_featured') === 'true';

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  // Validate file type
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type. Use JPEG, PNG, or WebP.' }, { status: 400 });
  }

  // Validate file size (5MB)
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: 'File too large. Maximum 5MB.' }, { status: 400 });
  }

  // Upload to storage
  const ext = file.name.split('.').pop() || 'jpg';
  const fileName = `${user.id}/${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from('pro-gallery')
    .upload(fileName, file, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from('pro-gallery')
    .getPublicUrl(fileName);

  // Insert gallery record
  const { data: entry, error: insertError } = await supabase
    .from('pro_gallery')
    .insert({
      pro_profile_id: pro.id,
      image_url: urlData.publicUrl,
      caption: caption || null,
      is_featured: isFeatured,
    })
    .select()
    .single();

  if (insertError) {
    // Clean up uploaded file on DB error
    await supabase.storage.from('pro-gallery').remove([fileName]);
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ entry });
}

export async function DELETE(request: NextRequest) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const entryId = searchParams.get('id');

  if (!entryId) {
    return NextResponse.json({ error: 'Missing gallery entry id' }, { status: 400 });
  }

  // Get pro_profile_id for verification
  const { data: pro } = await supabase
    .from('pro_profiles')
    .select('id')
    .eq('user_id', user.id)
    .single();

  if (!pro) {
    return NextResponse.json({ error: 'Pro profile not found' }, { status: 404 });
  }

  // Get the gallery entry to find the storage path
  const { data: entry } = await supabase
    .from('pro_gallery')
    .select('image_url')
    .eq('id', entryId)
    .eq('pro_profile_id', pro.id)
    .single();

  if (!entry) {
    return NextResponse.json({ error: 'Gallery entry not found' }, { status: 404 });
  }

  // Extract storage path from URL (format: .../pro-gallery/{user_id}/{filename})
  const url = new URL(entry.image_url);
  const pathParts = url.pathname.split('/pro-gallery/');
  if (pathParts[1]) {
    await supabase.storage.from('pro-gallery').remove([pathParts[1]]);
  }

  // Delete gallery record
  const { error: deleteError } = await supabase
    .from('pro_gallery')
    .delete()
    .eq('id', entryId)
    .eq('pro_profile_id', pro.id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
