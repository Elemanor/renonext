import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  if (!UUID_RE.test(token)) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc('decline_proposal', {
    p_token: token,
  });

  if (error) {
    console.error('decline_proposal RPC error:', error);
    return NextResponse.json(
      { error: 'Failed to decline proposal' },
      { status: 500 }
    );
  }

  const result = data as { success: boolean; error?: string; status?: string };

  if (!result.success) {
    return NextResponse.json(
      { error: result.error ?? 'Failed to decline proposal' },
      { status: 409 }
    );
  }

  return NextResponse.json({ status: 'declined' });
}
