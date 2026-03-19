/**
 * SEO Autopilot — fully automated pipeline.
 * Runs audit → auto-generates fixes for critical issues → saves as drafts.
 * Collects experiment post-metrics for mature experiments.
 * Stores run logs in seo_audit_runs.
 */

import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { runAudit, type AuditIssue } from './audit';
import { collectPostMetrics } from './experiments';
import {
  generateMetaDescription,
  improveSEOTitle,
  generateFAQs,
} from '@/lib/ai/seo';
import { services } from '@/lib/data/services';
import { serviceCosts } from '@/lib/data/costs';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AutopilotRunResult {
  auditSummary: {
    totalPages: number;
    critical: number;
    warning: number;
    info: number;
  };
  fixesGenerated: number;
  experimentsUpdated: number;
  errors: string[];
}

// ---------------------------------------------------------------------------
// Issue-to-fix mapping
// ---------------------------------------------------------------------------

/** Map of issue types that can be auto-fixed with AI */
const AUTO_FIXABLE: Record<string, (issue: AuditIssue) => Promise<{ type: string; output: Record<string, unknown>; tokensUsed: number } | null>> = {
  meta_missing: autoFixMeta,
  meta_too_short: autoFixMeta,
  meta_too_long: autoFixMeta,
  title_too_long: autoFixTitle,
  faq_count_low: autoFixFAQs,
};

async function autoFixMeta(issue: AuditIssue) {
  const serviceName = extractServiceName(issue.url);
  if (!serviceName) return null;

  const result = await generateMetaDescription({
    url: issue.url,
    currentTitle: serviceName,
    pageType: getPageType(issue.url),
    serviceName,
  });

  return {
    type: 'meta_description',
    output: { description: result.description },
    tokensUsed: result.tokensUsed,
  };
}

async function autoFixTitle(issue: AuditIssue) {
  const serviceName = extractServiceName(issue.url);
  const currentTitle = (issue.evidence?.title as string) || serviceName || '';

  const result = await improveSEOTitle({
    url: issue.url,
    currentTitle,
    pageType: getPageType(issue.url),
    serviceName: serviceName || undefined,
  });

  return {
    type: 'title',
    output: { titles: result.titles },
    tokensUsed: result.tokensUsed,
  };
}

async function autoFixFAQs(issue: AuditIssue) {
  const serviceName = extractServiceName(issue.url);
  if (!serviceName) return null;

  // Get existing FAQs and price data
  const service = services.find((s) => issue.url.includes(s.slug));
  const cost = serviceCosts.find((c) => issue.url.includes(c.slug));

  const result = await generateFAQs({
    url: issue.url,
    serviceName,
    pageType: getPageType(issue.url),
    existingFaqs: service?.faqs,
    priceRanges: cost?.priceRanges.map((p) => `${p.scope}: $${p.minCAD}-$${p.maxCAD} ${p.unit}`),
    timeline: cost?.typicalTimeline || service?.overview.timeline,
    count: 5,
  });

  return {
    type: 'faq',
    output: { faqs: result.faqs },
    tokensUsed: result.tokensUsed,
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function extractServiceName(url: string): string | null {
  // /services/underpinning → Underpinning
  // /costs/underpinning → Underpinning
  // /costs/underpinning/toronto → Underpinning
  const match = url.match(/\/(services|costs)\/([^/]+)/);
  if (!match) return null;
  const slug = match[2];

  const service = services.find((s) => s.slug === slug);
  if (service) return service.title;

  const cost = serviceCosts.find((c) => c.slug === slug);
  if (cost) return cost.title;

  // Fallback: capitalize slug
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function getPageType(url: string): string {
  if (url.includes('/blog/')) return 'blog';
  if (url.includes('/costs/')) return 'cost';
  if (url.includes('/services/')) return 'service';
  return 'static';
}

// ---------------------------------------------------------------------------
// Main autopilot run
// ---------------------------------------------------------------------------

export async function runAutopilot(): Promise<AutopilotRunResult> {
  const admin = createSupabaseAdminClient();
  const errors: string[] = [];
  let fixesGenerated = 0;

  // 1. Create audit run record
  const { data: auditRun } = await admin
    .from('seo_audit_runs')
    .insert({ started_at: new Date().toISOString() })
    .select('id')
    .single();

  // 2. Run full audit
  const audit = runAudit({ offset: 0, limit: 10000 });

  // 3. Save audit issues to DB
  if (auditRun) {
    const issueRows = audit.issues.map((issue) => ({
      run_id: auditRun.id,
      url: issue.url,
      issue_type: issue.issueType,
      severity: issue.severity,
      evidence: issue.evidence,
    }));

    // Insert in batches of 100
    for (let i = 0; i < issueRows.length; i += 100) {
      const batch = issueRows.slice(i, i + 100);
      const { error } = await admin.from('seo_audit_issues').insert(batch);
      if (error) errors.push(`Issue insert batch ${i}: ${error.message}`);
    }

    // Update audit run
    await admin.from('seo_audit_runs').update({
      completed_at: new Date().toISOString(),
      total_pages: audit.summary.totalPages,
      total_issues: audit.total,
      critical_count: audit.summary.critical,
      warning_count: audit.summary.warning,
    }).eq('id', auditRun.id);
  }

  // 4. Auto-generate fixes for critical and warning issues
  const fixableIssues = audit.issues.filter(
    (i) => (i.severity === 'critical' || i.severity === 'warning') && AUTO_FIXABLE[i.issueType]
  );

  // Deduplicate by URL + issueType (don't fix the same thing twice)
  const seen = new Set<string>();
  const uniqueFixable = fixableIssues.filter((i) => {
    const key = `${i.url}:${i.issueType}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Limit to 20 fixes per run to avoid rate limits
  const toFix = uniqueFixable.slice(0, 20);

  for (const issue of toFix) {
    try {
      const fixer = AUTO_FIXABLE[issue.issueType];
      if (!fixer) continue;

      const fix = await fixer(issue);
      if (!fix) continue;

      await admin.from('seo_recommendations').insert({
        url: issue.url,
        recommendation_type: fix.type,
        input_snapshot: { issueType: issue.issueType, evidence: issue.evidence, autoGenerated: true },
        output_json: fix.output,
        status: 'draft',
        tokens_used: fix.tokensUsed,
      });

      fixesGenerated++;

      // Small delay between AI calls to avoid rate limits
      await new Promise((r) => setTimeout(r, 500));
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      errors.push(`Fix ${issue.issueType} for ${issue.url}: ${msg}`);
    }
  }

  // 5. Collect post-metrics for mature experiments
  let experimentsUpdated = 0;
  try {
    const result = await collectPostMetrics();
    experimentsUpdated = result.updated;
    if (result.errors > 0) {
      errors.push(`${result.errors} experiment metric collection errors`);
    }
  } catch (err) {
    errors.push(`Experiment collection: ${err instanceof Error ? err.message : 'failed'}`);
  }

  return {
    auditSummary: audit.summary,
    fixesGenerated,
    experimentsUpdated,
    errors,
  };
}
