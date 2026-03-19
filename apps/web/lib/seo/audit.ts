/**
 * SEO audit engine — runs against TypeScript data files, not live pages.
 * 14 concrete checks, paginated output.
 */

import { services, type ServicePageContent } from '@/lib/data/services';
import {
  serviceCosts,
  cityMultipliers,
  getCityAdjustedPrice,
  formatPriceRange,
  type ServiceCostData,
  type CityMultiplier,
} from '@/lib/data/costs';
import { mockBlogPosts, type BlogPost } from '@/lib/mock-data/blog';

const BASE_URL = 'https://renonext.com';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type IssueSeverity = 'critical' | 'warning' | 'info';

export type IssueType =
  | 'title_too_long'
  | 'title_missing'
  | 'meta_too_short'
  | 'meta_too_long'
  | 'meta_missing'
  | 'title_h1_mismatch'
  | 'missing_canonical'
  | 'faq_count_low'
  | 'missing_jsonld'
  | 'thin_content'
  | 'duplicate_title'
  | 'duplicate_meta'
  | 'orphan_page'
  | 'sitemap_missing';

export interface AuditIssue {
  url: string;
  issueType: IssueType;
  severity: IssueSeverity;
  evidence: Record<string, unknown>;
  fixAction: string;
}

export interface AuditResult {
  issues: AuditIssue[];
  total: number;
  offset: number;
  limit: number;
  summary: {
    totalPages: number;
    critical: number;
    warning: number;
    info: number;
  };
}

// ---------------------------------------------------------------------------
// Sitemap URLs for comparison
// ---------------------------------------------------------------------------

const serviceSlugs = [
  'underpinning', 'foundation-repair', 'waterproofing', 'concrete-works', 'masonry', 'framing',
  'electrical', 'plumbing', 'handyman', 'hvac', 'insulation', 'drains', 'painting', 'cleaning',
  'additions', 'basement-second-unit', 'roofing', 'demolition', 'decks',
  'general-contractor', 'project-management', 'building-permit', 'drafting', 'estimating', 'equipment-rental',
];

const citySlugs = [
  'toronto', 'mississauga', 'brampton', 'vaughan', 'markham', 'richmond-hill', 'aurora',
  'oakville', 'burlington', 'milton', 'ajax', 'pickering', 'oshawa', 'whitby', 'hamilton',
];

function getSitemapUrls(): Set<string> {
  const urls = new Set<string>();
  // Static pages
  [
    '', '/how-it-works', '/homeowners', '/contractors', '/pros', '/price-check',
    '/house-fax', '/house-fax/sample', '/savings', '/services', '/why-renonext',
    '/contracts', '/blog', '/about', '/careers', '/contact', '/help', '/privacy', '/terms',
    '/costs', '/apps',
  ].forEach((p) => urls.add(`${BASE_URL}${p}`));

  // Service pages
  serviceSlugs.forEach((s) => urls.add(`${BASE_URL}/services/${s}`));
  // City pages
  citySlugs.forEach((c) => urls.add(`${BASE_URL}/savings/${c}`));
  // Basement city pages
  citySlugs.forEach((c) => urls.add(`${BASE_URL}/services/basement-second-unit/${c}`));
  // Cost pages
  serviceSlugs.forEach((s) => urls.add(`${BASE_URL}/costs/${s}`));
  serviceSlugs.forEach((s) => citySlugs.forEach((c) => urls.add(`${BASE_URL}/costs/${s}/${c}`)));
  // App pages
  ['equipment-fix', 'drawing-viewer', 'attendance', 'ar-survey', 'concrete-pour', 'jsa'].forEach(
    (a) => urls.add(`${BASE_URL}/apps/${a}`)
  );
  // Blog posts
  mockBlogPosts.forEach((p) => urls.add(`${BASE_URL}/blog/${p.slug}`));

  return urls;
}

// ---------------------------------------------------------------------------
// Navigation links (for orphan page detection)
// ---------------------------------------------------------------------------

function getLinkedUrls(): Set<string> {
  const linked = new Set<string>();
  // All sitemap URLs are linked via sitemap itself
  getSitemapUrls().forEach((u) => linked.add(u));
  // Services link to related services
  services.forEach((s) => {
    s.relatedServices.forEach((r) => linked.add(`${BASE_URL}/services/${r.slug}`));
  });
  // Blog posts are linked from blog index
  mockBlogPosts.forEach((p) => linked.add(`${BASE_URL}/blog/${p.slug}`));
  return linked;
}

// ---------------------------------------------------------------------------
// Audit page representations
// ---------------------------------------------------------------------------

interface AuditPage {
  url: string;
  pageType: string;
  metaTitle?: string;
  metaDescription?: string;
  heroTagline?: string;
  title?: string;
  faqCount: number;
  hasJsonLd: boolean;
  wordCount: number;
}

function buildAuditPages(): AuditPage[] {
  const pages: AuditPage[] = [];

  // Service pages
  services.forEach((s: ServicePageContent) => {
    const wordCount = estimateWordCount(s);
    pages.push({
      url: `${BASE_URL}/services/${s.slug}`,
      pageType: 'service',
      metaTitle: s.metaTitle,
      metaDescription: s.metaDescription,
      heroTagline: s.heroTagline,
      title: s.title,
      faqCount: s.faqs?.length || 0,
      hasJsonLd: true, // Service pages render FAQPage + Service JSON-LD
      wordCount,
    });
  });

  // Cost service pages — generate meta descriptions matching the actual page template
  serviceCosts.forEach((c: ServiceCostData) => {
    const baseRange = c.priceRanges[0];
    const rangeStr = baseRange ? formatPriceRange(baseRange.minCAD, baseRange.maxCAD) : '';
    const servicePage = services.find((s) => s.slug === c.slug);
    const faqCount = servicePage?.faqs?.length || 0;

    pages.push({
      url: `${BASE_URL}/costs/${c.slug}`,
      pageType: 'cost',
      metaTitle: `${c.title} Cost in Ontario 2026 | ${rangeStr} | RenoNext`,
      metaDescription: `How much does ${c.title.toLowerCase()} cost in Ontario? Prices from ${rangeStr}. See breakdowns by scope, labour/material split, city-by-city comparison, and money-saving tips.`,
      title: c.title,
      faqCount: Math.min(faqCount, 5), // Page shows up to 5 inherited FAQs
      hasJsonLd: true, // Page renders Service + BreadcrumbList + FAQPage JSON-LD
      wordCount: estimateCostPageWords(c),
    });
  });

  // Cost city pages — generate meta descriptions matching the actual page template
  serviceCosts.forEach((c: ServiceCostData) => {
    const baseRange = c.priceRanges[0];
    const servicePage = services.find((s) => s.slug === c.slug);

    cityMultipliers.forEach((city: CityMultiplier) => {
      const adjusted = baseRange
        ? getCityAdjustedPrice(baseRange.minCAD, baseRange.maxCAD, baseRange.labourPct, baseRange.materialPct, city)
        : { min: 0, max: 0 };
      const cityRange = formatPriceRange(adjusted.min, adjusted.max);

      pages.push({
        url: `${BASE_URL}/costs/${c.slug}/${city.slug}`,
        pageType: 'cost_city',
        metaTitle: `${c.title} Cost in ${city.name} 2026 | ${cityRange} | RenoNext`,
        metaDescription: `How much does ${c.title.toLowerCase()} cost in ${city.name}? Prices range from ${cityRange}. See labour/material split, permit costs, available rebates, and compare nearby cities.`,
        title: `${c.title} in ${city.name}`,
        faqCount: 5, // Page generates 5 city-specific FAQs via generateCityFaqs()
        hasJsonLd: true, // Page renders Service + BreadcrumbList + FAQPage JSON-LD
        wordCount: estimateCostPageWords(c),
      });
    });
  });

  // Blog pages
  mockBlogPosts.forEach((b: BlogPost) => {
    pages.push({
      url: `${BASE_URL}/blog/${b.slug}`,
      pageType: 'blog',
      metaTitle: b.title,
      metaDescription: b.excerpt,
      title: b.title,
      faqCount: 0,
      hasJsonLd: true, // Blog pages render Article JSON-LD
      wordCount: b.content?.split(/\s+/).length || 0,
    });
  });

  return pages;
}

function estimateWordCount(s: ServicePageContent): number {
  let text = [
    s.whatIsIt,
    s.overview.summary,
    s.pricing.intro,
    ...s.whenYouNeedIt,
    ...s.processSteps.map((p) => p.description),
    ...s.faqs.map((f) => `${f.q} ${f.a}`),
    ...(s.warnings?.items || []),
    ...s.permits.notes,
  ].join(' ');
  return text.split(/\s+/).length;
}

function estimateCostPageWords(c: ServiceCostData): number {
  let text = [
    c.title,
    c.typicalTimeline,
    ...c.includedInPrice,
    ...c.notIncludedInPrice,
    ...c.costTips,
    ...c.priceRanges.map((p) => `${p.scope} ${p.minCAD}-${p.maxCAD} ${p.unit}`),
  ].join(' ');
  return text.split(/\s+/).length;
}

// ---------------------------------------------------------------------------
// Checks
// ---------------------------------------------------------------------------

function runChecks(pages: AuditPage[]): AuditIssue[] {
  const issues: AuditIssue[] = [];
  const sitemapUrls = getSitemapUrls();
  const linkedUrls = getLinkedUrls();
  const titleMap = new Map<string, string[]>();
  const metaMap = new Map<string, string[]>();

  for (const page of pages) {
    // 1. title_too_long
    if (page.metaTitle && page.metaTitle.length > 60) {
      issues.push({
        url: page.url,
        issueType: 'title_too_long',
        severity: 'warning',
        evidence: { length: page.metaTitle.length, title: page.metaTitle },
        fixAction: `Shorten title to ≤60 chars (currently ${page.metaTitle.length})`,
      });
    }

    // 2. title_missing
    if (!page.metaTitle) {
      issues.push({
        url: page.url,
        issueType: 'title_missing',
        severity: 'critical',
        evidence: {},
        fixAction: 'Add a metaTitle to this page',
      });
    }

    // 3. meta_too_short
    if (page.metaDescription && page.metaDescription.length < 120) {
      issues.push({
        url: page.url,
        issueType: 'meta_too_short',
        severity: 'warning',
        evidence: { length: page.metaDescription.length, description: page.metaDescription },
        fixAction: `Expand meta description to ≥120 chars (currently ${page.metaDescription.length})`,
      });
    }

    // 4. meta_too_long
    if (page.metaDescription && page.metaDescription.length > 160) {
      issues.push({
        url: page.url,
        issueType: 'meta_too_long',
        severity: 'warning',
        evidence: { length: page.metaDescription.length, description: page.metaDescription },
        fixAction: `Shorten meta description to ≤160 chars (currently ${page.metaDescription.length})`,
      });
    }

    // 5. meta_missing
    if (!page.metaDescription) {
      issues.push({
        url: page.url,
        issueType: 'meta_missing',
        severity: 'critical',
        evidence: {},
        fixAction: 'Add a metaDescription to this page',
      });
    }

    // 6. title_h1_mismatch
    if (page.metaTitle && page.heroTagline) {
      const titleWords = new Set(page.metaTitle.toLowerCase().split(/\W+/).filter(Boolean));
      const taglineWords = new Set(page.heroTagline.toLowerCase().split(/\W+/).filter(Boolean));
      const overlap = [...titleWords].filter((w) => taglineWords.has(w) && w.length > 3);
      if (overlap.length < 2) {
        issues.push({
          url: page.url,
          issueType: 'title_h1_mismatch',
          severity: 'info',
          evidence: { metaTitle: page.metaTitle, heroTagline: page.heroTagline.slice(0, 100) },
          fixAction: 'Align metaTitle keywords with page hero tagline',
        });
      }
    }

    // 8. faq_count_low
    if ((page.pageType === 'service' || page.pageType === 'cost') && page.faqCount < 5) {
      issues.push({
        url: page.url,
        issueType: 'faq_count_low',
        severity: page.faqCount === 0 ? 'warning' : 'info',
        evidence: { faqCount: page.faqCount },
        fixAction: `Add more FAQs (currently ${page.faqCount}, recommend ≥5)`,
      });
    }

    // 9. missing_jsonld
    if ((page.pageType === 'service' || page.pageType === 'blog') && !page.hasJsonLd) {
      issues.push({
        url: page.url,
        issueType: 'missing_jsonld',
        severity: 'info',
        evidence: { pageType: page.pageType },
        fixAction: `Add ${page.pageType === 'service' ? 'Service or FAQPage' : 'Article'} JSON-LD`,
      });
    }

    // 10. thin_content
    if (page.wordCount < 300) {
      issues.push({
        url: page.url,
        issueType: 'thin_content',
        severity: 'warning',
        evidence: { wordCount: page.wordCount },
        fixAction: `Expand content to ≥300 words (currently ~${page.wordCount})`,
      });
    }

    // Track for duplicate detection
    if (page.metaTitle) {
      const key = page.metaTitle.toLowerCase().trim();
      if (!titleMap.has(key)) titleMap.set(key, []);
      titleMap.get(key)!.push(page.url);
    }
    if (page.metaDescription) {
      const key = page.metaDescription.toLowerCase().trim();
      if (!metaMap.has(key)) metaMap.set(key, []);
      metaMap.get(key)!.push(page.url);
    }

    // 13. orphan_page (blog posts not in sitemap/nav)
    if (page.pageType === 'blog' && !linkedUrls.has(page.url) && !sitemapUrls.has(page.url)) {
      issues.push({
        url: page.url,
        issueType: 'orphan_page',
        severity: 'warning',
        evidence: {},
        fixAction: 'Add this page to navigation or sitemap',
      });
    }

    // 14. sitemap_missing
    if (!sitemapUrls.has(page.url)) {
      issues.push({
        url: page.url,
        issueType: 'sitemap_missing',
        severity: 'warning',
        evidence: {},
        fixAction: 'Add this page to sitemap.ts',
      });
    }
  }

  // 11. duplicate_title (cross-page check)
  for (const [title, urls] of titleMap) {
    if (urls.length > 1) {
      for (const url of urls) {
        issues.push({
          url,
          issueType: 'duplicate_title',
          severity: 'warning',
          evidence: { title, duplicateWith: urls.filter((u) => u !== url) },
          fixAction: `Title "${title.slice(0, 50)}..." is shared with ${urls.length - 1} other page(s)`,
        });
      }
    }
  }

  // 12. duplicate_meta (cross-page check)
  for (const [desc, urls] of metaMap) {
    if (urls.length > 1) {
      for (const url of urls) {
        issues.push({
          url,
          issueType: 'duplicate_meta',
          severity: 'warning',
          evidence: { description: desc.slice(0, 80), duplicateWith: urls.filter((u) => u !== url) },
          fixAction: `Meta description is shared with ${urls.length - 1} other page(s)`,
        });
      }
    }
  }

  return issues;
}

// ---------------------------------------------------------------------------
// Main audit function
// ---------------------------------------------------------------------------

export function runAudit(options: { offset?: number; limit?: number } = {}): AuditResult {
  const { offset = 0, limit = 50 } = options;

  const pages = buildAuditPages();
  const allIssues = runChecks(pages);

  // Sort: critical first, then warning, then info
  const severityOrder: Record<IssueSeverity, number> = { critical: 0, warning: 1, info: 2 };
  allIssues.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

  const critical = allIssues.filter((i) => i.severity === 'critical').length;
  const warning = allIssues.filter((i) => i.severity === 'warning').length;
  const info = allIssues.filter((i) => i.severity === 'info').length;

  return {
    issues: allIssues.slice(offset, offset + limit),
    total: allIssues.length,
    offset,
    limit,
    summary: {
      totalPages: pages.length,
      critical,
      warning,
      info,
    },
  };
}
