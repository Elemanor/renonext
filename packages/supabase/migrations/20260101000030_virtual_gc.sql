-- Migration 030: Virtual GC — AI Assistant tables, pgvector, hybrid search
-- Enables the public-facing AI construction advisor on RenoNext

-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA extensions;

-- ============================================================
-- Document Chunks (RAG knowledge base)
-- ============================================================
CREATE TABLE IF NOT EXISTS document_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,  -- NULL = shared/public knowledge
  project_id UUID,
  source_type TEXT NOT NULL CHECK (source_type IN ('upload', 'obc', 'cost_guide', 'blog', 'sequence', 'rebate', 'service', 'contract')),
  source_name TEXT NOT NULL,
  page_number INT,
  section TEXT,
  chunk_text TEXT NOT NULL,
  embedding vector(3072) NOT NULL,
  tsv tsvector GENERATED ALWAYS AS (to_tsvector('english', chunk_text)) STORED,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for hybrid search
CREATE INDEX idx_document_chunks_embedding ON document_chunks USING hnsw (embedding vector_cosine_ops);
CREATE INDEX idx_document_chunks_tsv ON document_chunks USING gin (tsv);
CREATE INDEX idx_document_chunks_user ON document_chunks (user_id);
CREATE INDEX idx_document_chunks_source ON document_chunks (source_type);

-- ============================================================
-- Chat Conversations
-- ============================================================
CREATE TABLE IF NOT EXISTS chat_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,  -- NULL = anonymous
  anonymous_id TEXT,  -- browser fingerprint for anonymous users
  title TEXT DEFAULT 'New conversation',
  message_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_chat_conversations_user ON chat_conversations (user_id);
CREATE INDEX idx_chat_conversations_anon ON chat_conversations (anonymous_id);

-- ============================================================
-- Chat Messages
-- ============================================================
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES chat_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  sources JSONB DEFAULT '[]',
  token_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_chat_messages_conversation ON chat_messages (conversation_id, created_at);

-- ============================================================
-- Document Uploads (user-uploaded PDFs)
-- ============================================================
CREATE TABLE IF NOT EXISTS document_uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id UUID,
  filename TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'processing' CHECK (status IN ('processing', 'ready', 'failed')),
  chunk_count INT DEFAULT 0,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_document_uploads_user ON document_uploads (user_id);

-- ============================================================
-- Chat Rate Limits
-- ============================================================
CREATE TABLE IF NOT EXISTS chat_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  ip_hash TEXT,
  message_count INT DEFAULT 0,
  window_start TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT rate_limit_identifier CHECK (user_id IS NOT NULL OR ip_hash IS NOT NULL)
);

CREATE UNIQUE INDEX idx_rate_limits_user ON chat_rate_limits (user_id) WHERE user_id IS NOT NULL;
CREATE UNIQUE INDEX idx_rate_limits_ip ON chat_rate_limits (ip_hash) WHERE ip_hash IS NOT NULL;

-- ============================================================
-- Hybrid Search Function (pgvector cosine + full-text → RRF)
-- ============================================================
CREATE OR REPLACE FUNCTION hybrid_search(
  query_embedding vector(3072),
  query_text TEXT,
  match_count INT DEFAULT 10,
  p_user_id UUID DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  source_type TEXT,
  source_name TEXT,
  page_number INT,
  section TEXT,
  chunk_text TEXT,
  metadata JSONB,
  similarity FLOAT,
  rrf_score FLOAT
)
LANGUAGE plpgsql
AS $$
DECLARE
  k CONSTANT INT := 60;  -- RRF constant
BEGIN
  RETURN QUERY
  WITH vector_results AS (
    SELECT
      dc.id,
      dc.source_type,
      dc.source_name,
      dc.page_number,
      dc.section,
      dc.chunk_text,
      dc.metadata,
      1 - (dc.embedding <=> query_embedding) AS similarity,
      ROW_NUMBER() OVER (ORDER BY dc.embedding <=> query_embedding) AS vector_rank
    FROM document_chunks dc
    WHERE dc.user_id IS NULL OR dc.user_id = p_user_id
    ORDER BY dc.embedding <=> query_embedding
    LIMIT match_count * 2
  ),
  text_results AS (
    SELECT
      dc.id,
      ts_rank_cd(dc.tsv, websearch_to_tsquery('english', query_text)) AS text_rank_score,
      ROW_NUMBER() OVER (ORDER BY ts_rank_cd(dc.tsv, websearch_to_tsquery('english', query_text)) DESC) AS text_rank
    FROM document_chunks dc
    WHERE dc.tsv @@ websearch_to_tsquery('english', query_text)
      AND (dc.user_id IS NULL OR dc.user_id = p_user_id)
    LIMIT match_count * 2
  ),
  combined AS (
    SELECT
      vr.id,
      vr.source_type,
      vr.source_name,
      vr.page_number,
      vr.section,
      vr.chunk_text,
      vr.metadata,
      vr.similarity,
      (1.0 / (k + vr.vector_rank)) + COALESCE(1.0 / (k + tr.text_rank), 0) AS rrf_score
    FROM vector_results vr
    LEFT JOIN text_results tr ON vr.id = tr.id
    UNION
    SELECT
      dc.id,
      dc.source_type,
      dc.source_name,
      dc.page_number,
      dc.section,
      dc.chunk_text,
      dc.metadata,
      1 - (dc.embedding <=> query_embedding) AS similarity,
      COALESCE(1.0 / (k + vr2.vector_rank), 0) + (1.0 / (k + tr2.text_rank)) AS rrf_score
    FROM text_results tr2
    JOIN document_chunks dc ON dc.id = tr2.id
    LEFT JOIN vector_results vr2 ON tr2.id = vr2.id
    WHERE vr2.id IS NULL  -- only text-only results not already in vector_results
  )
  SELECT
    c.id,
    c.source_type,
    c.source_name,
    c.page_number,
    c.section,
    c.chunk_text,
    c.metadata,
    c.similarity,
    c.rrf_score
  FROM combined c
  ORDER BY c.rrf_score DESC
  LIMIT match_count;
END;
$$;

-- ============================================================
-- RLS Policies
-- ============================================================

ALTER TABLE document_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_rate_limits ENABLE ROW LEVEL SECURITY;

-- Document chunks: shared (user_id IS NULL) readable by all, user chunks only by owner
CREATE POLICY "Shared chunks readable by all" ON document_chunks
  FOR SELECT USING (user_id IS NULL);

CREATE POLICY "Users read own chunks" ON document_chunks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert own chunks" ON document_chunks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own chunks" ON document_chunks
  FOR DELETE USING (auth.uid() = user_id);

-- Chat conversations: users see own, anonymous handled by API with admin client
CREATE POLICY "Users manage own conversations" ON chat_conversations
  FOR ALL USING (auth.uid() = user_id);

-- Chat messages: users see messages in their conversations
CREATE POLICY "Users see own conversation messages" ON chat_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM chat_conversations cc
      WHERE cc.id = chat_messages.conversation_id
      AND cc.user_id = auth.uid()
    )
  );

CREATE POLICY "Users insert own conversation messages" ON chat_messages
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM chat_conversations cc
      WHERE cc.id = chat_messages.conversation_id
      AND cc.user_id = auth.uid()
    )
  );

-- Document uploads: users manage own
CREATE POLICY "Users manage own uploads" ON document_uploads
  FOR ALL USING (auth.uid() = user_id);

-- Rate limits: users see own
CREATE POLICY "Users see own rate limits" ON chat_rate_limits
  FOR SELECT USING (auth.uid() = user_id);

-- ============================================================
-- Storage Bucket for chat documents
-- ============================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('chat-documents', 'chat-documents', false, 10485760, ARRAY['application/pdf'])
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Users upload chat documents" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'chat-documents' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users read own chat documents" ON storage.objects
  FOR SELECT USING (bucket_id = 'chat-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users delete own chat documents" ON storage.objects
  FOR DELETE USING (bucket_id = 'chat-documents' AND auth.uid()::text = (storage.foldername(name))[1]);
