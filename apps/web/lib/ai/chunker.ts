import { AI_CONFIG } from './config';

export interface Chunk {
  text: string;
  section?: string;
  index: number;
}

// Common section header patterns
const SECTION_PATTERNS = [
  /^#{1,3}\s+(.+)$/m,           // Markdown headers
  /^([A-Z][A-Za-z\s&]+):?\s*$/m, // Title Case lines
  /^\*\*(.+)\*\*\s*$/m,          // Bold markdown
];

function detectSection(text: string): string | undefined {
  for (const pattern of SECTION_PATTERNS) {
    const match = text.match(pattern);
    if (match) return match[1].trim();
  }
  return undefined;
}

/**
 * Split text into overlapping chunks suitable for embedding.
 * Tries to break at paragraph/sentence boundaries.
 */
export function chunkText(
  text: string,
  options?: { chunkSize?: number; overlap?: number }
): Chunk[] {
  const chunkSize = options?.chunkSize ?? AI_CONFIG.chunkSize;
  const overlap = options?.overlap ?? AI_CONFIG.chunkOverlap;

  // Normalize whitespace
  const cleaned = text.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
  if (!cleaned) return [];

  // Split into paragraphs first
  const paragraphs = cleaned.split(/\n\n+/);
  const chunks: Chunk[] = [];
  let currentChunk = '';
  let currentSection: string | undefined;
  let chunkIndex = 0;

  for (const paragraph of paragraphs) {
    const trimmed = paragraph.trim();
    if (!trimmed) continue;

    // Detect section headers
    const section = detectSection(trimmed);
    if (section) currentSection = section;

    // If adding this paragraph would exceed chunk size, finalize current chunk
    if (currentChunk && (currentChunk.length + trimmed.length + 2) > chunkSize) {
      chunks.push({
        text: currentChunk.trim(),
        section: currentSection,
        index: chunkIndex++,
      });

      // Start new chunk with overlap from end of previous
      if (overlap > 0 && currentChunk.length > overlap) {
        // Take last N characters, break at sentence/word boundary
        const overlapText = currentChunk.slice(-overlap);
        const sentenceBreak = overlapText.indexOf('. ');
        currentChunk = sentenceBreak > 0
          ? overlapText.slice(sentenceBreak + 2)
          : overlapText;
      } else {
        currentChunk = '';
      }
    }

    currentChunk += (currentChunk ? '\n\n' : '') + trimmed;

    // If single paragraph exceeds chunk size, split by sentences
    if (currentChunk.length > chunkSize) {
      const sentences = currentChunk.match(/[^.!?]+[.!?]+/g) || [currentChunk];
      currentChunk = '';

      for (const sentence of sentences) {
        if ((currentChunk + sentence).length > chunkSize && currentChunk) {
          chunks.push({
            text: currentChunk.trim(),
            section: currentSection,
            index: chunkIndex++,
          });
          currentChunk = '';
        }
        currentChunk += sentence;
      }
    }
  }

  // Don't forget the last chunk
  if (currentChunk.trim()) {
    chunks.push({
      text: currentChunk.trim(),
      section: currentSection,
      index: chunkIndex,
    });
  }

  return chunks;
}
