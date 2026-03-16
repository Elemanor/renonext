import { NextResponse, type NextRequest } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
  const supabase = await createSupabaseServerClient();

  // Verify caller is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Verify caller is admin
  const { data: callerProfile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (callerProfile?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await request.json();
  const { action, notes, rejection_reason } = body as {
    action: 'approved' | 'rejected' | 'changes_requested';
    notes?: string;
    rejection_reason?: string;
  };

  if (!['approved', 'rejected', 'changes_requested'].includes(action)) {
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }

  // Use admin client to bypass RLS
  const admin = createSupabaseAdminClient();

  const updates: Record<string, unknown> = {
    application_status: action,
    application_reviewed_at: new Date().toISOString(),
    application_reviewed_by: user.id,
    application_notes: notes || null,
  };

  if (action === 'rejected') {
    updates.rejection_reason = rejection_reason || null;
  }

  const { error: proError } = await admin
    .from('pro_profiles')
    .update(updates)
    .eq('user_id', userId);

  if (proError) {
    return NextResponse.json({ error: proError.message }, { status: 500 });
  }

  // If approved, also set profiles.is_verified = true
  if (action === 'approved') {
    const { error: profileError } = await admin
      .from('profiles')
      .update({ is_verified: true })
      .eq('id', userId);

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}
