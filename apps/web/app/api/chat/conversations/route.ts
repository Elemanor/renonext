import { NextRequest } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('chat_conversations')
      .select('id, title, message_count, created_at, updated_at')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })
      .limit(50);

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(data);
  } catch {
    return Response.json({ error: 'Failed to fetch conversations' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title } = await request.json();

    const { data, error } = await supabase
      .from('chat_conversations')
      .insert({
        user_id: user.id,
        title: title || 'New conversation',
      })
      .select('id, title, message_count, created_at')
      .single();

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(data, { status: 201 });
  } catch {
    return Response.json({ error: 'Failed to create conversation' }, { status: 500 });
  }
}
