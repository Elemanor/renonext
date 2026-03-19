/**
 * Seed RenoNext knowledge base into document_chunks table.
 *
 * Usage:
 *   cd apps/web
 *   GEMINI_API_KEY=... NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npx tsx scripts/seed-knowledge-base.ts
 *
 * Sources: costs, services, contracts, rebates, blog articles
 * All chunks are inserted with user_id = NULL (shared/public knowledge).
 */

import { createClient } from '@supabase/supabase-js';

// Data imports
import { serviceCosts, type ServiceCostData } from '../lib/data/costs';
import { services, type ServicePageContent } from '../lib/data/services';
import { contractTemplates, type ContractTemplate } from '../lib/data/contracts';
import { allPrograms, type RebateProgram } from '../lib/data/rebates';
import { mockBlogPosts, type BlogPost } from '../lib/mock-data/blog';

// ── Config ──────────────────────────────────────────────────────────────────
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
const EMBEDDING_MODEL = 'text-embedding-004';
const CHUNK_SIZE = 1200;
const CHUNK_OVERLAP = 200;
const BATCH_SIZE = 50;

// ── Supabase admin client ───────────────────────────────────────────────────
function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  return createClient(url, key, { auth: { persistSession: false } });
}

// ── Embedding helper ────────────────────────────────────────────────────────
async function batchEmbed(texts: string[]): Promise<number[][]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('Set GEMINI_API_KEY');

  const results: number[][] = [];
  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts.slice(i, i + BATCH_SIZE);
    const url = `${GEMINI_API_URL}/${EMBEDDING_MODEL}:batchEmbedContents?key=${apiKey}`;
    const requests = batch.map((text) => ({
      model: `models/${EMBEDDING_MODEL}`,
      content: { parts: [{ text }] },
    }));

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requests }),
    });

    if (res.status === 429) {
      console.log('  Rate limited, waiting 5s...');
      await new Promise((r) => setTimeout(r, 5000));
      const retry = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requests }),
      });
      if (!retry.ok) throw new Error(`Gemini error: ${retry.status} ${await retry.text()}`);
      const data = await retry.json();
      results.push(...data.embeddings.map((e: { values: number[] }) => e.values));
    } else if (!res.ok) {
      throw new Error(`Gemini error: ${res.status} ${await res.text()}`);
    } else {
      const data = await res.json();
      results.push(...data.embeddings.map((e: { values: number[] }) => e.values));
    }

    if (i + BATCH_SIZE < texts.length) {
      await new Promise((r) => setTimeout(r, 1000)); // Polite delay
    }
  }
  return results;
}

// ── Simple chunker ──────────────────────────────────────────────────────────
function chunkText(text: string): string[] {
  const cleaned = text.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
  if (!cleaned || cleaned.length <= CHUNK_SIZE) return cleaned ? [cleaned] : [];

  const paragraphs = cleaned.split(/\n\n+/);
  const chunks: string[] = [];
  let current = '';

  for (const p of paragraphs) {
    if (current && (current.length + p.length + 2) > CHUNK_SIZE) {
      chunks.push(current.trim());
      // Overlap: take last N characters
      const overlap = current.slice(-CHUNK_OVERLAP);
      const sentenceBreak = overlap.indexOf('. ');
      current = sentenceBreak > 0 ? overlap.slice(sentenceBreak + 2) : overlap;
    }
    current += (current ? '\n\n' : '') + p;
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

// ── Data formatters ─────────────────────────────────────────────────────────

interface ChunkRecord {
  source_type: string;
  source_name: string;
  section?: string;
  chunk_text: string;
  metadata?: Record<string, unknown>;
}

function formatCostGuide(s: ServiceCostData): string {
  const ranges = s.priceRanges.map(
    (r) => `${r.scope}: $${r.minCAD.toLocaleString()}–$${r.maxCAD.toLocaleString()} ${r.unit} (${r.labourPct}% labour, ${r.materialPct}% material)`
  ).join('\n');
  const tips = s.costTips.map((t) => `- ${t}`).join('\n');
  return [
    `# ${s.title} Cost Guide`,
    `Category: ${s.category}`,
    `Starting price: $${s.startingPrice.toLocaleString()}`,
    `Timeline: ${s.typicalTimeline}`,
    `Contingency: ${s.contingencyPct}%`,
    `Engineering required: ${s.requiresEngineering ? 'Yes' : 'No'}`,
    '',
    '## Price Ranges',
    ranges,
    '',
    '## Included in Price',
    s.includedInPrice.map((i) => `- ${i}`).join('\n'),
    '',
    '## Not Included',
    s.notIncludedInPrice.map((i) => `- ${i}`).join('\n'),
    '',
    '## Cost Tips',
    tips,
  ].join('\n');
}

function formatService(s: ServicePageContent): string {
  const steps = s.processSteps.map((p, i) =>
    `${i + 1}. ${p.title}: ${p.description}${p.duration ? ` (${p.duration})` : ''}`
  ).join('\n');
  const permits = s.permits.items.map((p) =>
    `- ${p.name} (${p.authority}, ~${p.typical_cost})${p.notes ? ` — ${p.notes}` : ''}`
  ).join('\n');
  const faqs = s.faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n');
  const pricing = s.pricing.breakdowns.map(
    (b) => `- ${b.scope}: ${b.range}${b.factors ? ` (${b.factors})` : ''}`
  ).join('\n');

  return [
    `# ${s.title}`,
    s.overview.summary,
    `Timeline: ${s.overview.timeline} | Difficulty: ${s.overview.difficulty}`,
    '',
    '## What Is It',
    s.whatIsIt,
    '',
    '## When You Need It',
    s.whenYouNeedIt.map((w) => `- ${w}`).join('\n'),
    '',
    '## Process',
    steps,
    '',
    '## Permits',
    `OBC Required: ${s.permits.obcRequired ? 'Yes' : 'No'}`,
    permits,
    s.permits.notes.map((n) => `Note: ${n}`).join('\n'),
    '',
    '## Pricing',
    s.pricing.intro,
    pricing,
    '',
    '## FAQs',
    faqs,
  ].join('\n');
}

function formatContract(t: ContractTemplate): string {
  const milestones = t.defaultMilestones.map(
    (m) => `- ${m.name} (${m.percentOfTotal}%): ${m.description}${m.requiresInspection ? ' [inspection required]' : ''}`
  ).join('\n');
  const warranty = t.warrantyDefaults.map(
    (w) => `- ${w.item}: ${w.labourYears}yr labour, ${w.materialYears}yr material`
  ).join('\n');

  return [
    `# ${t.serviceName} Contract Template`,
    `Category: ${t.category}`,
    `Engineering required: ${t.requiresEngineering ? 'Yes' : 'No'}`,
    `Insurance minimum: ${t.insuranceMinimum}`,
    `WSIB required: ${t.wsibRequired ? 'Yes' : 'No'}`,
    '',
    '## Milestone Schedule',
    milestones,
    '',
    '## Warranty',
    warranty,
    '',
    '## Common Exclusions',
    t.commonExclusions.map((e) => `- ${e}`).join('\n'),
    '',
    '## Required Permits',
    t.requiredPermits.map((p) => `- ${p}`).join('\n'),
  ].join('\n');
}

function formatRebate(p: RebateProgram): string {
  return [
    `# ${p.name}`,
    `Level: ${p.level} | Admin: ${p.adminBody}`,
    `Amount: ${p.amount} (max $${p.maxValue.toLocaleString()})`,
    `Status: ${p.status}`,
    `Stackable: ${p.stackable ? 'Yes' : 'No'}`,
    '',
    p.description,
    '',
    '## Eligibility',
    p.eligibility.map((e) => `- ${e}`).join('\n'),
    '',
    `Project types: ${p.projectTypes.join(', ')}`,
    `Coverage: ${Array.isArray(p.coverage) ? p.coverage.join(', ') : p.coverage}`,
    p.notes ? `\nNotes: ${p.notes}` : '',
  ].join('\n');
}

// ── Main ────────────────────────────────────────────────────────────────────
async function main() {
  const supabase = getAdminClient();
  const records: ChunkRecord[] = [];

  // 1. Cost guides
  console.log('Formatting cost guides...');
  for (const cost of serviceCosts) {
    const text = formatCostGuide(cost);
    const chunks = chunkText(text);
    for (const chunk of chunks) {
      records.push({
        source_type: 'cost_guide',
        source_name: cost.title,
        section: 'Cost Guide',
        chunk_text: chunk,
        metadata: { slug: cost.slug },
      });
    }
  }

  // 2. Services
  console.log('Formatting service guides...');
  for (const svc of services) {
    const text = formatService(svc);
    const chunks = chunkText(text);
    for (const chunk of chunks) {
      records.push({
        source_type: 'service',
        source_name: svc.title,
        section: 'Service Guide',
        chunk_text: chunk,
        metadata: { slug: svc.slug },
      });
    }
  }

  // 3. Contracts
  console.log('Formatting contract templates...');
  for (const tmpl of contractTemplates) {
    const text = formatContract(tmpl);
    const chunks = chunkText(text);
    for (const chunk of chunks) {
      records.push({
        source_type: 'contract',
        source_name: tmpl.serviceName,
        section: 'Contract Template',
        chunk_text: chunk,
        metadata: { slug: tmpl.serviceSlug },
      });
    }
  }

  // 4. Rebates
  console.log('Formatting rebate programs...');
  for (const prog of allPrograms) {
    const text = formatRebate(prog);
    const chunks = chunkText(text);
    for (const chunk of chunks) {
      records.push({
        source_type: 'rebate',
        source_name: prog.name,
        section: 'Rebate Program',
        chunk_text: chunk,
        metadata: { id: prog.id },
      });
    }
  }

  // 5. Blog articles
  console.log('Formatting blog articles...');
  for (const post of mockBlogPosts) {
    // Strip markdown images/links for clean text
    const cleanContent = post.content
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    const chunks = chunkText(cleanContent);
    for (const chunk of chunks) {
      records.push({
        source_type: 'blog',
        source_name: post.title,
        section: post.category,
        chunk_text: chunk,
        metadata: { slug: post.slug },
      });
    }
  }

  console.log(`\nTotal chunks to embed: ${records.length}`);

  // Clear existing shared chunks (re-runnable)
  console.log('Clearing existing shared chunks...');
  await supabase
    .from('document_chunks')
    .delete()
    .is('user_id', null);

  // Embed all chunks
  console.log('Generating embeddings...');
  const texts = records.map((r) => r.chunk_text);
  const embeddings = await batchEmbed(texts);
  console.log(`Embeddings generated: ${embeddings.length}`);

  // Insert in batches of 50
  console.log('Inserting chunks into database...');
  const INSERT_BATCH = 50;
  let inserted = 0;

  for (let i = 0; i < records.length; i += INSERT_BATCH) {
    const batch = records.slice(i, i + INSERT_BATCH).map((r, j) => ({
      user_id: null,
      source_type: r.source_type,
      source_name: r.source_name,
      section: r.section || null,
      chunk_text: r.chunk_text,
      embedding: JSON.stringify(embeddings[i + j]),
      metadata: r.metadata || {},
    }));

    const { error } = await supabase.from('document_chunks').insert(batch);
    if (error) {
      console.error(`Insert error at batch ${i}:`, error.message);
      throw error;
    }
    inserted += batch.length;
    process.stdout.write(`  ${inserted}/${records.length}\r`);
  }

  console.log(`\nDone! Inserted ${inserted} chunks.`);

  // Summary
  const byType: Record<string, number> = {};
  for (const r of records) {
    byType[r.source_type] = (byType[r.source_type] || 0) + 1;
  }
  console.log('\nBreakdown by source_type:');
  for (const [type, count] of Object.entries(byType).sort()) {
    console.log(`  ${type}: ${count}`);
  }
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
