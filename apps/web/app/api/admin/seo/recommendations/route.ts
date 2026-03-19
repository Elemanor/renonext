import { NextResponse, type NextRequest } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { createExperimentForRecommendation } from '@/lib/seo/experiments';

export async function GET(request: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const limit = parseInt(searchParams.get('limit') || '50', 10);
  const offset = parseInt(searchParams.get('offset') || '0', 10);

  const admin = createSupabaseAdminClient();
  let query = admin
    .from('seo_recommendations')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error, count } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ recommendations: data, total: count });
}

export async function PATCH(request: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await request.json();
  const { id, action } = body as { id: string; action: 'approved' | 'applied' | 'dismissed' };

  if (!id || !['approved', 'applied', 'dismissed'].includes(action)) {
    return NextResponse.json({ error: 'Invalid id or action' }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();
  const updates: Record<string, unknown> = { status: action };

  if (action === 'approved') {
    updates.approved_by = user.id;
  } else if (action === 'applied') {
    updates.applied_by = user.id;
    updates.applied_at = new Date().toISOString();
  }

  // Fetch the recommendation first so we have url and type for experiment creation
  const { data: rec } = await admin
    .from('seo_recommendations')
    .select('url, recommendation_type')
    .eq('id', id)
    .single();

  const { error } = await admin
    .from('seo_recommendations')
    .update(updates)
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Auto-create experiment when a recommendation is applied
  let experimentId: string | null = null;
  if (action === 'applied' && rec) {
    experimentId = await createExperimentForRecommendation(
      id,
      rec.url,
      rec.recommendation_type
    );
  }

  return NextResponse.json({ success: true, experimentId });
}
