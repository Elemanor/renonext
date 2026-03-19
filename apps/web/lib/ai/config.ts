// AI Assistant configuration — server-only

export const AI_CONFIG = {
  // LLM (DeepSeek)
  model: 'deepseek-chat',
  maxTokens: 2048,
  temperature: 0.3,

  // Embeddings (Gemini embedding-001, 3072 dimensions)
  embeddingModel: 'text-embedding-004',
  embeddingDimensions: 3072,
  embeddingBatchSize: 50,

  // Chunking
  chunkSize: 1200,
  chunkOverlap: 200,

  // Search
  searchResultCount: 8,

  // Rate limits (messages per day)
  anonymousRateLimit: 10,
  authenticatedRateLimit: 50,
  rateLimitWindowMs: 24 * 60 * 60 * 1000, // 24 hours
} as const;
