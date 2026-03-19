import { AI_CONFIG } from './config';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

interface EmbeddingResponse {
  embedding: { values: number[] };
}

interface BatchEmbeddingResponse {
  embeddings: { values: number[] }[];
}

async function callGeminiEmbedding(texts: string[]): Promise<number[][]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set');

  const url = `${GEMINI_API_URL}/${AI_CONFIG.embeddingModel}:batchEmbedContents?key=${apiKey}`;

  const requests = texts.map((text) => ({
    model: `models/${AI_CONFIG.embeddingModel}`,
    content: { parts: [{ text }] },
  }));

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ requests }),
  });

  if (res.status === 429) {
    // Rate limited — wait and retry once
    await new Promise((r) => setTimeout(r, 2000));
    const retry = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requests }),
    });
    if (!retry.ok) throw new Error(`Gemini embedding error: ${retry.status}`);
    const data = (await retry.json()) as BatchEmbeddingResponse;
    return data.embeddings.map((e) => e.values);
  }

  if (!res.ok) throw new Error(`Gemini embedding error: ${res.status} ${await res.text()}`);

  const data = (await res.json()) as BatchEmbeddingResponse;
  return data.embeddings.map((e) => e.values);
}

/** Generate embedding for a single text */
export async function generateEmbedding(text: string): Promise<number[]> {
  const results = await callGeminiEmbedding([text]);
  return results[0];
}

/** Generate embeddings for multiple texts (batched) */
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const results: number[][] = [];
  const batchSize = AI_CONFIG.embeddingBatchSize;

  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    const embeddings = await callGeminiEmbedding(batch);
    results.push(...embeddings);

    // Small delay between batches to avoid rate limits
    if (i + batchSize < texts.length) {
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  return results;
}
