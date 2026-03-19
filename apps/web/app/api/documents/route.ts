import { NextRequest } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('document_uploads')
      .select('id, filename, status, chunk_count, error_message, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(data);
  } catch {
    return Response.json({ error: 'Failed to fetch documents' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return Response.json({ error: 'Document ID required' }, { status: 400 });
    }

    // Verify ownership
    const { data: doc } = await supabase
      .from('document_uploads')
      .select('id, storage_path')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (!doc) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const admin = createSupabaseAdminClient();

    // Delete chunks
    await admin
      .from('document_chunks')
      .delete()
      .eq('user_id', user.id)
      .eq('source_name', id)
      .eq('source_type', 'upload');

    // Delete from storage
    await admin.storage
      .from('chat-documents')
      .remove([doc.storage_path]);

    // Delete record
    await admin
      .from('document_uploads')
      .delete()
      .eq('id', id);

    return new Response(null, { status: 204 });
  } catch {
    return Response.json({ error: 'Failed to delete document' }, { status: 500 });
  }
}
