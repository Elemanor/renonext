import { NextRequest } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { chunkText } from '@/lib/ai/chunker';
import { generateEmbeddings } from '@/lib/ai/embeddings';

export async function POST(request: NextRequest) {
  try {
    // Auth check
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    if (!file || file.type !== 'application/pdf') {
      return Response.json({ error: 'PDF file required' }, { status: 400 });
    }
    if (file.size > 10 * 1024 * 1024) {
      return Response.json({ error: 'File too large (max 10MB)' }, { status: 400 });
    }

    const admin = createSupabaseAdminClient();
    const storagePath = `${user.id}/${Date.now()}-${file.name}`;

    // Upload to Supabase storage
    const buffer = Buffer.from(await file.arrayBuffer());
    const { error: uploadError } = await admin.storage
      .from('chat-documents')
      .upload(storagePath, buffer, { contentType: 'application/pdf' });

    if (uploadError) {
      return Response.json({ error: 'Upload failed' }, { status: 500 });
    }

    // Create document record
    const { data: doc, error: docError } = await admin
      .from('document_uploads')
      .insert({
        user_id: user.id,
        filename: file.name,
        storage_path: storagePath,
        status: 'processing',
      })
      .select('id, filename, status')
      .single();

    if (docError || !doc) {
      return Response.json({ error: 'Failed to create record' }, { status: 500 });
    }

    // Process in background (don't block response)
    processDocument(admin, doc.id, user.id, buffer).catch((err) => {
      console.error(`Document processing failed for ${doc.id}:`, err);
    });

    return Response.json(doc, { status: 201 });
  } catch (error) {
    console.error('Document upload error:', error);
    return Response.json({ error: 'Upload failed' }, { status: 500 });
  }
}

async function processDocument(
  admin: ReturnType<typeof createSupabaseAdminClient>,
  docId: string,
  userId: string,
  buffer: Buffer
) {
  try {
    // Dynamic import pdf-parse (server-only)
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pdfParse = require('pdf-parse') as (buf: Buffer) => Promise<{ text: string }>;
    const parsed = await pdfParse(buffer);
    const text = parsed.text;

    if (!text.trim()) {
      await admin
        .from('document_uploads')
        .update({ status: 'failed', error_message: 'No text content found in PDF' })
        .eq('id', docId);
      return;
    }

    // Chunk the text
    const chunks = chunkText(text);
    if (!chunks.length) {
      await admin
        .from('document_uploads')
        .update({ status: 'failed', error_message: 'Could not extract meaningful text' })
        .eq('id', docId);
      return;
    }

    // Generate embeddings
    const embeddings = await generateEmbeddings(chunks.map((c) => c.text));

    // Insert chunks
    const rows = chunks.map((chunk, i) => ({
      user_id: userId,
      source_type: 'upload' as const,
      source_name: docId,
      section: chunk.section || null,
      chunk_text: chunk.text,
      embedding: JSON.stringify(embeddings[i]),
      metadata: { document_id: docId },
    }));

    const { error: insertError } = await admin.from('document_chunks').insert(rows);

    if (insertError) {
      await admin
        .from('document_uploads')
        .update({ status: 'failed', error_message: insertError.message })
        .eq('id', docId);
      return;
    }

    // Mark as ready
    await admin
      .from('document_uploads')
      .update({ status: 'ready', chunk_count: chunks.length })
      .eq('id', docId);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Processing failed';
    await admin
      .from('document_uploads')
      .update({ status: 'failed', error_message: message })
      .eq('id', docId);
  }
}
