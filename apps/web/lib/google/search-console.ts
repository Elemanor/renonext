/**
 * Google Search Console API client.
 * Provides keyword analytics, sitemap status, and URL inspection.
 */

import { getAccessToken } from './auth';

const SC_API = 'https://searchconsole.googleapis.com/webmasters/v3';
const SC_INSPECT_API = 'https://searchconsole.googleapis.com/v1';
const SITE_URL = 'https://renonext.com';
const SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly'];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SearchAnalyticsRow {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface SearchAnalyticsResponse {
  rows: SearchAnalyticsRow[];
  responseAggregationType?: string;
}

export interface SitemapInfo {
  path: string;
  lastSubmitted?: string;
  isPending: boolean;
  isSitemapsIndex: boolean;
  lastDownloaded?: string;
  warnings?: number;
  errors?: number;
  contents?: {
    type: string;
    submitted: number;
    indexed: number;
  }[];
}

export interface UrlInspectionResult {
  inspectionResult: {
    indexStatusResult?: {
      verdict: string;
      coverageState: string;
      lastCrawlTime?: string;
      pageFetchState?: string;
      crawledAs?: string;
      indexingState?: string;
    };
    mobileUsabilityResult?: {
      verdict: string;
    };
    richResultsResult?: {
      verdict: string;
    };
  };
}

export interface QuickWin {
  query: string;
  page: string;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
}

// ---------------------------------------------------------------------------
// Auth helper
// ---------------------------------------------------------------------------

async function authHeaders(): Promise<Record<string, string>> {
  const token = await getAccessToken(SCOPES);
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

// ---------------------------------------------------------------------------
// Search Analytics
// ---------------------------------------------------------------------------

export interface SearchAnalyticsParams {
  startDate: string;  // YYYY-MM-DD
  endDate: string;    // YYYY-MM-DD
  dimensions: ('query' | 'page' | 'country' | 'device' | 'date')[];
  rowLimit?: number;
  startRow?: number;
  dimensionFilterGroups?: {
    filters: {
      dimension: string;
      operator: string;
      expression: string;
    }[];
  }[];
}

/** Fetch search analytics data (keywords, pages, etc.) */
export async function getSearchAnalytics(params: SearchAnalyticsParams): Promise<SearchAnalyticsResponse> {
  const headers = await authHeaders();
  const url = `${SC_API}/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`;

  const body = {
    startDate: params.startDate,
    endDate: params.endDate,
    dimensions: params.dimensions,
    rowLimit: params.rowLimit || 100,
    startRow: params.startRow || 0,
    ...(params.dimensionFilterGroups && { dimensionFilterGroups: params.dimensionFilterGroups }),
  };

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Search Console API error ${res.status}: ${err}`);
  }

  return res.json();
}

/** Get top keywords for the site */
export async function getTopKeywords(startDate: string, endDate: string, limit = 50): Promise<SearchAnalyticsRow[]> {
  const data = await getSearchAnalytics({
    startDate,
    endDate,
    dimensions: ['query'],
    rowLimit: limit,
  });
  return data.rows || [];
}

/** Get top pages by clicks */
export async function getTopPages(startDate: string, endDate: string, limit = 50): Promise<SearchAnalyticsRow[]> {
  const data = await getSearchAnalytics({
    startDate,
    endDate,
    dimensions: ['page'],
    rowLimit: limit,
  });
  return data.rows || [];
}

/** Get keyword + page combinations for a specific page */
export async function getKeywordsForPage(pageUrl: string, startDate: string, endDate: string): Promise<SearchAnalyticsRow[]> {
  const data = await getSearchAnalytics({
    startDate,
    endDate,
    dimensions: ['query'],
    dimensionFilterGroups: [{
      filters: [{
        dimension: 'page',
        operator: 'equals',
        expression: pageUrl,
      }],
    }],
    rowLimit: 100,
  });
  return data.rows || [];
}

/** Find quick wins: high impressions but low CTR (positions 5-20) */
export async function getQuickWins(startDate: string, endDate: string, limit = 30): Promise<QuickWin[]> {
  const data = await getSearchAnalytics({
    startDate,
    endDate,
    dimensions: ['query', 'page'],
    rowLimit: 500,
  });

  const rows = data.rows || [];
  return rows
    .filter((r) => r.position >= 5 && r.position <= 20 && r.impressions >= 50)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, limit)
    .map((r) => ({
      query: r.keys[0],
      page: r.keys[1],
      impressions: r.impressions,
      clicks: r.clicks,
      ctr: r.ctr,
      position: r.position,
    }));
}

// ---------------------------------------------------------------------------
// Sitemaps
// ---------------------------------------------------------------------------

/** List all sitemaps submitted for the site */
export async function getSitemaps(): Promise<SitemapInfo[]> {
  const headers = await authHeaders();
  const url = `${SC_API}/sites/${encodeURIComponent(SITE_URL)}/sitemaps`;

  const res = await fetch(url, { headers });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Sitemaps API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return (data.sitemap || []).map((s: Record<string, unknown>) => ({
    path: s.path,
    lastSubmitted: s.lastSubmitted,
    isPending: s.isPending || false,
    isSitemapsIndex: s.isSitemapsIndex || false,
    lastDownloaded: s.lastDownloaded,
    warnings: s.warnings,
    errors: s.errors,
    contents: s.contents,
  }));
}

/** Submit a sitemap to Search Console */
export async function submitSitemap(sitemapUrl: string): Promise<void> {
  const headers = await authHeaders();
  const url = `${SC_API}/sites/${encodeURIComponent(SITE_URL)}/sitemaps/${encodeURIComponent(sitemapUrl)}`;

  const res = await fetch(url, { method: 'PUT', headers });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Submit sitemap error ${res.status}: ${err}`);
  }
}

// ---------------------------------------------------------------------------
// URL Inspection
// ---------------------------------------------------------------------------

/** Inspect a URL's indexing status */
export async function inspectUrl(pageUrl: string): Promise<UrlInspectionResult> {
  const headers = await authHeaders();
  const url = `${SC_INSPECT_API}/urlInspection/index:inspect`;

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      inspectionUrl: pageUrl,
      siteUrl: SITE_URL,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`URL Inspection API error ${res.status}: ${err}`);
  }

  return res.json();
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Get date string N days ago in YYYY-MM-DD format */
export function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
}
