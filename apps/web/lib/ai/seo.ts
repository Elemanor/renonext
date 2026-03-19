/**
 * SEO content generation functions powered by Gemini.
 * All functions take source-of-truth data as input — never hallucinate.
 */

import { callGemini, callGeminiJSON } from './gemini';

// ---------------------------------------------------------------------------
// System prompt (shared guardrails)
// ---------------------------------------------------------------------------

const SEO_SYSTEM_PROMPT = `You are an SEO content specialist for RenoNext, an Ontario-based renovation platform.

Context:
- All content is for Ontario homeowners considering renovation projects in the GTA (Greater Toronto Area).
- Prices, timelines, and technical details MUST come from the input data provided. Never invent numbers.
- Year: 2026. Currency: CAD.

Brand voice:
- Professional, knowledgeable, direct.
- No superlatives ("best", "top", "leading", "#1").
- No unsupported claims or guarantees.
- No specific timelines or costs unless they come from input data.

Banned claims:
- No guarantees on permit approval timelines.
- No promises about specific savings amounts.
- No claims about being the cheapest or fastest.
- No medical, legal, or financial advice.

Source attribution:
- Price ranges must directly reference the input data provided.
- If no data is provided for a claim, do not make the claim.

Format rules:
- Titles: max 60 characters, keyword near front.
- Meta descriptions: 150-160 characters, benefit-driven, include a soft CTA.
- FAQs: concise answers, 2-4 sentences each.
- JSON-LD: valid structured data per schema.org specs.`;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MetaDescriptionParams {
  url: string;
  currentTitle: string;
  currentDescription?: string;
  pageType: string;
  serviceName?: string;
  cityName?: string;
  priceRange?: string;
  keyFeatures?: string[];
}

export interface SEOTitleParams {
  url: string;
  currentTitle: string;
  pageType: string;
  serviceName?: string;
  cityName?: string;
  targetKeyword?: string;
}

export interface FAQParams {
  url: string;
  serviceName: string;
  pageType: string;
  existingFaqs?: { q: string; a: string }[];
  priceRanges?: string[];
  timeline?: string;
  permits?: string[];
  count?: number;
}

export interface BlogDraftParams {
  topic: string;
  targetKeyword: string;
  relatedKeywords?: string[];
  priceData?: string[];
  wordCount?: number;
}

export interface IntroRewriteParams {
  url: string;
  currentIntro: string;
  serviceName: string;
  pageType: string;
  keyPoints?: string[];
}

export interface JsonLdParams {
  url: string;
  pageType: 'faq' | 'service' | 'local_business';
  serviceName?: string;
  faqs?: { q: string; a: string }[];
  priceRange?: string;
  areaServed?: string[];
}

export interface FullPageBriefParams {
  url: string;
  serviceName: string;
  cityName?: string;
  pageType: string;
  currentTitle: string;
  currentDescription?: string;
  currentIntro?: string;
  priceRanges?: string[];
  timeline?: string;
  permits?: string[];
  existingFaqs?: { q: string; a: string }[];
}

// ---------------------------------------------------------------------------
// Generation functions
// ---------------------------------------------------------------------------

/** Generate a 150-160 char meta description */
export async function generateMetaDescription(params: MetaDescriptionParams) {
  const prompt = `Generate a meta description for this page.

Page URL: ${params.url}
Page type: ${params.pageType}
Current title: ${params.currentTitle}
${params.currentDescription ? `Current description: ${params.currentDescription}` : ''}
${params.serviceName ? `Service: ${params.serviceName}` : ''}
${params.cityName ? `City: ${params.cityName}` : ''}
${params.priceRange ? `Price range: ${params.priceRange}` : ''}
${params.keyFeatures?.length ? `Key features: ${params.keyFeatures.join(', ')}` : ''}

Requirements:
- Exactly 150-160 characters (count carefully)
- Benefit-driven, speaks to homeowner pain points
- Include a soft CTA (e.g., "Get a free quote", "Compare prices", "Learn more")
- Include the service name and city if provided
- Do NOT use superlatives

Return ONLY the meta description text, nothing else.`;

  const result = await callGemini({ prompt, systemInstruction: SEO_SYSTEM_PROMPT, maxOutputTokens: 256 });
  return { description: result.text.trim().replace(/^["']|["']$/g, ''), tokensUsed: result.usage.totalTokenCount || 0 };
}

/** Generate 3 alternative SEO titles, each ≤60 chars */
export async function improveSEOTitle(params: SEOTitleParams) {
  const prompt = `Generate 3 alternative SEO title tags for this page.

Page URL: ${params.url}
Page type: ${params.pageType}
Current title: ${params.currentTitle}
${params.serviceName ? `Service: ${params.serviceName}` : ''}
${params.cityName ? `City: ${params.cityName}` : ''}
${params.targetKeyword ? `Target keyword: ${params.targetKeyword}` : ''}

Requirements:
- Each title must be 60 characters or fewer
- Place the primary keyword near the front
- Include location if relevant
- Use pipes (|) or dashes (-) as separators
- No superlatives

Return a JSON array of 3 title strings.`;

  const result = await callGeminiJSON<string[]>({
    prompt,
    systemInstruction: SEO_SYSTEM_PROMPT,
    maxOutputTokens: 512,
    responseSchema: {
      type: 'ARRAY',
      items: { type: 'STRING' },
    },
  });
  return { titles: result.data, tokensUsed: result.usage.totalTokenCount || 0 };
}

/** Generate FAQ pairs via structured output */
export async function generateFAQs(params: FAQParams) {
  const count = params.count || 5;
  const prompt = `Generate ${count} FAQ pairs for this page.

Service: ${params.serviceName}
Page type: ${params.pageType}
URL: ${params.url}
${params.priceRanges?.length ? `Price ranges from data: ${params.priceRanges.join('; ')}` : ''}
${params.timeline ? `Typical timeline: ${params.timeline}` : ''}
${params.permits?.length ? `Permit info: ${params.permits.join('; ')}` : ''}
${params.existingFaqs?.length ? `Existing FAQs (do not duplicate): ${params.existingFaqs.map((f) => f.q).join('; ')}` : ''}

Requirements:
- Questions homeowners actually search for
- Answers: 2-4 sentences, factual, reference the input data
- Include pricing questions if price data is provided
- Include permit/timeline questions if that data is provided
- Ontario/GTA context`;

  const result = await callGeminiJSON<{ q: string; a: string }[]>({
    prompt,
    systemInstruction: SEO_SYSTEM_PROMPT,
    maxOutputTokens: 2048,
    responseSchema: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          q: { type: 'STRING' },
          a: { type: 'STRING' },
        },
        required: ['q', 'a'],
      },
    },
  });
  return { faqs: result.data, tokensUsed: result.usage.totalTokenCount || 0 };
}

/** Generate a blog draft in markdown */
export async function generateBlogDraft(params: BlogDraftParams) {
  const wordCount = params.wordCount || 1500;
  const prompt = `Write a blog article in markdown format.

Topic: ${params.topic}
Target keyword: ${params.targetKeyword}
${params.relatedKeywords?.length ? `Related keywords to naturally include: ${params.relatedKeywords.join(', ')}` : ''}
${params.priceData?.length ? `Price data to reference: ${params.priceData.join('; ')}` : ''}
Target length: ~${wordCount} words

Requirements:
- Use ## for H2 headings, ### for H3
- Include an engaging intro paragraph
- Include a "Key Takeaways" section at the top
- Include actionable advice for Ontario homeowners
- Reference price data if provided — do not invent prices
- End with a clear CTA paragraph
- Natural keyword usage, no stuffing
- Ontario/GTA context throughout`;

  const result = await callGemini({
    prompt,
    systemInstruction: SEO_SYSTEM_PROMPT,
    maxOutputTokens: 4096,
    temperature: 0.5,
  });
  return { markdown: result.text, tokensUsed: result.usage.totalTokenCount || 0 };
}

/** Rewrite/improve an intro paragraph */
export async function generateIntroRewrite(params: IntroRewriteParams) {
  const prompt = `Rewrite the intro paragraph for this page to improve SEO and readability.

URL: ${params.url}
Service: ${params.serviceName}
Page type: ${params.pageType}
Current intro:
${params.currentIntro}
${params.keyPoints?.length ? `Key points to include: ${params.keyPoints.join('; ')}` : ''}

Requirements:
- 2-3 sentences, concise and engaging
- Front-load the primary keyword
- Address the homeowner's pain point or goal
- Include Ontario/GTA context
- No superlatives or unsupported claims

Return ONLY the improved intro paragraph.`;

  const result = await callGemini({ prompt, systemInstruction: SEO_SYSTEM_PROMPT, maxOutputTokens: 512 });
  return { intro: result.text.trim(), tokensUsed: result.usage.totalTokenCount || 0 };
}

/** Generate valid JSON-LD structured data */
export async function generateJsonLd(params: JsonLdParams) {
  let prompt: string;

  if (params.pageType === 'faq' && params.faqs?.length) {
    prompt = `Generate valid FAQPage JSON-LD for this page.

URL: ${params.url}
FAQs:
${params.faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n')}

Return valid JSON-LD with @context, @type "FAQPage", and mainEntity array.`;
  } else if (params.pageType === 'service') {
    prompt = `Generate valid Service JSON-LD for this page.

URL: ${params.url}
Service name: ${params.serviceName || 'Renovation Service'}
${params.priceRange ? `Price range: ${params.priceRange}` : ''}
${params.areaServed?.length ? `Area served: ${params.areaServed.join(', ')}` : 'Area served: Greater Toronto Area, Ontario'}

Return valid JSON-LD with @context, @type "Service", provider (RenoNext), areaServed, and priceRange if available.`;
  } else {
    prompt = `Generate valid LocalBusiness JSON-LD for RenoNext.

URL: ${params.url}
Business: RenoNext — Ontario Renovation Platform
Area served: Greater Toronto Area, Ontario

Return valid JSON-LD with @context, @type "LocalBusiness", name, url, and areaServed.`;
  }

  const result = await callGeminiJSON<Record<string, unknown>>({
    prompt,
    systemInstruction: SEO_SYSTEM_PROMPT,
    maxOutputTokens: 1024,
  });
  return { jsonLd: result.data, tokensUsed: result.usage.totalTokenCount || 0 };
}

/** Generate a full page brief: title + meta + intro + FAQs + JSON-LD */
export async function generateFullPageBrief(params: FullPageBriefParams) {
  const prompt = `Generate a complete SEO brief for this page, including all elements below.

URL: ${params.url}
Service: ${params.serviceName}
${params.cityName ? `City: ${params.cityName}` : ''}
Page type: ${params.pageType}
Current title: ${params.currentTitle}
${params.currentDescription ? `Current description: ${params.currentDescription}` : ''}
${params.currentIntro ? `Current intro: ${params.currentIntro}` : ''}
${params.priceRanges?.length ? `Price data: ${params.priceRanges.join('; ')}` : ''}
${params.timeline ? `Timeline: ${params.timeline}` : ''}
${params.permits?.length ? `Permits: ${params.permits.join('; ')}` : ''}

Generate all of the following:
1. "title" — SEO title tag, ≤60 chars, keyword near front
2. "metaDescription" — 150-160 chars, benefit-driven, soft CTA
3. "intro" — 2-3 sentence intro paragraph
4. "faqs" — 5 FAQ pairs [{q, a}], based on input data
5. "jsonLd" — FAQPage JSON-LD object for the FAQs`;

  const result = await callGeminiJSON<{
    title: string;
    metaDescription: string;
    intro: string;
    faqs: { q: string; a: string }[];
    jsonLd: Record<string, unknown>;
  }>({
    prompt,
    systemInstruction: SEO_SYSTEM_PROMPT,
    maxOutputTokens: 4096,
    responseSchema: {
      type: 'OBJECT',
      properties: {
        title: { type: 'STRING' },
        metaDescription: { type: 'STRING' },
        intro: { type: 'STRING' },
        faqs: {
          type: 'ARRAY',
          items: {
            type: 'OBJECT',
            properties: {
              q: { type: 'STRING' },
              a: { type: 'STRING' },
            },
            required: ['q', 'a'],
          },
        },
        jsonLd: { type: 'OBJECT' },
      },
      required: ['title', 'metaDescription', 'intro', 'faqs', 'jsonLd'],
    },
  });

  return { brief: result.data, tokensUsed: result.usage.totalTokenCount || 0 };
}
