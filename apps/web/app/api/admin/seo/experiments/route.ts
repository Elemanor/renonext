import { NextResponse, type NextRequest } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { collectPostMetrics, enrichExperiment, type Experiment } from '@/lib/seo/experiments';
import { getCruxHistory, parseCruxTrend } from '@/lib/google/crux';

async function verifyAdmin() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') return null;
  return user;
}

export async function GET(request: NextRequest) {
  const user = await verifyAdmin();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  try {
    if (action === 'crux') {
      const url = searchParams.get('url') || undefined;
      const formFactor = (searchParams.get('formFactor') || undefined) as 'PHONE' | 'DESKTOP' | 'TABLET' | undefined;
      const data = await getCruxHistory({ url, formFactor });
      const trend = parseCruxTrend(data);
      return NextResponse.json({ trend, raw: data.record.key });
    }

    // Default: list experiments
    const admin = createSupabaseAdminClient();
    const { data, error } = await admin
      .from('seo_experiments')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const experiments = (data || []).map((exp: Experiment) => enrichExperiment(exp));

    return NextResponse.json({ experiments });
  } catch (error) {
    console.error('Experiments API error:', error);
    const message = error instanceof Error ? error.message : 'Request failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const user = await verifyAdmin();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { action } = body as { action: string };

  try {
    if (action === 'collect-post-metrics') {
      const result = await collectPostMetrics();
      return NextResponse.json(result);
    }

    if (action === 'update-notes') {
      const { id, notes } = body as { id: string; notes: string; action: string };
      if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

      const admin = createSupabaseAdminClient();
      const { error } = await admin
        .from('seo_experiments')
        .update({ notes })
        .eq('id', id);

      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('Experiments POST error:', error);
    const message = error instanceof Error ? error.message : 'Request failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
