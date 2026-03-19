/**
 * Shared Gemini caller for SEO content generation.
 * Configurable model via GEMINI_MODEL env var (defaults to gemini-2.5-flash).
 * Exponential backoff on 429, token usage logging.
 */

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000;

interface GeminiGenerateOptions {
  prompt: string;
  systemInstruction?: string;
  temperature?: number;
  maxOutputTokens?: number;
  /** If set, Gemini returns structured JSON matching this schema */
  responseSchema?: Record<string, unknown>;
}

interface GeminiUsageMetadata {
  promptTokenCount?: number;
  candidatesTokenCount?: number;
  totalTokenCount?: number;
}

interface GeminiResponse {
  text: string;
  usage: GeminiUsageMetadata;
}

function getModel(): string {
  return process.env.GEMINI_MODEL || 'gemini-2.5-flash';
}

function getApiKey(): string {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error('GEMINI_API_KEY is not set');
  return key;
}

export async function callGemini(options: GeminiGenerateOptions): Promise<GeminiResponse> {
  const { prompt, systemInstruction, temperature = 0.3, maxOutputTokens = 2048, responseSchema } = options;
  const model = getModel();
  const apiKey = getApiKey();
  const url = `${GEMINI_API_URL}/${model}:generateContent?key=${apiKey}`;

  const body: Record<string, unknown> = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature,
      maxOutputTokens,
    },
  };

  if (systemInstruction) {
    body.systemInstruction = { parts: [{ text: systemInstruction }] };
  }

  if (responseSchema) {
    (body.generationConfig as Record<string, unknown>).responseMimeType = 'application/json';
    (body.generationConfig as Record<string, unknown>).responseSchema = responseSchema;
  }

  let lastError: Error | null = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.status === 429) {
      const delay = BASE_DELAY_MS * Math.pow(2, attempt);
      console.warn(`Gemini rate limited (429), retrying in ${delay}ms (attempt ${attempt + 1}/${MAX_RETRIES})`);
      await new Promise((r) => setTimeout(r, delay));
      lastError = new Error(`Gemini rate limited after ${attempt + 1} attempts`);
      continue;
    }

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Gemini API error ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    const usage: GeminiUsageMetadata = data.usageMetadata || {};
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (usage.totalTokenCount) {
      console.log(`[Gemini] ${model} — ${usage.promptTokenCount ?? '?'} prompt + ${usage.candidatesTokenCount ?? '?'} output = ${usage.totalTokenCount} total tokens`);
    }

    return { text, usage };
  }

  throw lastError || new Error('Gemini: max retries exceeded');
}

/** Convenience: call Gemini and parse the response as JSON */
export async function callGeminiJSON<T = unknown>(options: GeminiGenerateOptions): Promise<{ data: T; usage: GeminiUsageMetadata }> {
  const response = await callGemini(options);
  try {
    const data = JSON.parse(response.text) as T;
    return { data, usage: response.usage };
  } catch {
    throw new Error(`Failed to parse Gemini JSON response: ${response.text.slice(0, 200)}`);
  }
}
