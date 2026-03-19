import { generateEmbedding } from './embeddings';
import { AI_CONFIG } from './config';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';

export interface SearchResult {
  id: string;
  source_type: string;
  source_name: string;
  page_number: number | null;
  section: string | null;
  chunk_text: string;
  metadata: Record<string, unknown>;
  similarity: number;
  rrf_score: number;
}

/**
 * Perform hybrid search: embed query → call hybrid_search RPC → return ranked results
 */
export async function hybridSearch(
  query: string,
  userId?: string | null
): Promise<SearchResult[]> {
  const embedding = await generateEmbedding(query);
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase.rpc('hybrid_search', {
    query_embedding: JSON.stringify(embedding),
    query_text: query,
    match_count: AI_CONFIG.searchResultCount,
    p_user_id: userId ?? null,
  });

  if (error) {
    console.error('Hybrid search error:', error);
    return [];
  }

  return (data as SearchResult[]) || [];
}

/**
 * Format search results into context text for the LLM prompt
 */
export function buildContext(results: SearchResult[]): string {
  if (!results.length) return '';

  const sections = results.map((r, i) => {
    const source = [r.source_name, r.section, r.page_number ? `p.${r.page_number}` : null]
      .filter(Boolean)
      .join(' — ');
    return `[Source ${i + 1}: ${source} (${r.source_type})]\n${r.chunk_text}`;
  });

  return `## Relevant Knowledge Base Context\n\n${sections.join('\n\n---\n\n')}`;
}

/**
 * Build source citations for the UI
 */
export function buildSourceCitations(results: SearchResult[]) {
  // Deduplicate by source_name
  const seen = new Set<string>();
  return results
    .filter((r) => {
      if (seen.has(r.source_name)) return false;
      seen.add(r.source_name);
      return true;
    })
    .slice(0, 5)
    .map((r) => ({
      type: r.source_type,
      name: r.source_name,
      section: r.section,
      page: r.page_number,
      metadata: r.metadata,
    }));
}
