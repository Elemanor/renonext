import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Verify user has a pro profile
  const { data: proProfile } = await supabase
    .from('pro_profiles')
    .select('id')
    .eq('user_id', user.id)
    .single();

  if (!proProfile) {
    return NextResponse.json(
      { error: 'Only contractors can submit bids' },
      { status: 403 }
    );
  }

  const body = await request.json();

  const bidData = {
    job_id: body.job_id,
    pro_id: proProfile.id,
    amount: Number(body.amount),
    estimated_hours: Number(body.estimated_hours ?? 0),
    message: body.message ?? null,
    proposed_date: body.proposed_date ?? null,
    includes_materials: body.includes_materials ?? false,
    material_cost: body.material_cost ? Number(body.material_cost) : null,
    status: 'pending' as const,
  };

  const { data, error } = await supabase
    .from('job_bids')
    .insert(bidData)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
