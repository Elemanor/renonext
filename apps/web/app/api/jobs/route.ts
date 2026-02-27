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

  const body = await request.json();

  const jobData = {
    client_id: user.id,
    category_id: body.category_id ?? null,
    title: body.title,
    description: body.description,
    status: 'posted' as const,
    address: body.address ?? '',
    city: body.city ?? '',
    province: body.province ?? 'ON',
    postal_code: body.postal_code ?? '',
    latitude: body.latitude ?? 0,
    longitude: body.longitude ?? 0,
    scheduled_date: body.scheduled_date ?? null,
    is_flexible_date: body.is_flexible_date ?? false,
    is_urgent: body.is_urgent ?? false,
    budget_min: body.budget_min ? Number(body.budget_min) : null,
    budget_max: body.budget_max ? Number(body.budget_max) : null,
    photos: body.photos ?? [],
    details: body.details ?? {},
  };

  const { data, error } = await supabase
    .from('jobs')
    .insert(jobData)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
