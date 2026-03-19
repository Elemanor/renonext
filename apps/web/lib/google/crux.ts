/**
 * Chrome UX Report (CrUX) History API client.
 * Provides real-user Core Web Vitals trend data for renonext.com.
 * Uses GOOGLE_API_KEY (same key as PageSpeed).
 */

const CRUX_API = 'https://chromeuxreport.googleapis.com/v1/records:queryHistoryRecord';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CruxMetricTimeseries {
  percentilesTimeseries: {
    p75s: (number | null)[];
  };
}

export interface CruxCollectionPeriod {
  firstDate: { year: number; month: number; day: number };
  lastDate: { year: number; month: number; day: number };
}

export interface CruxHistoryRecord {
  record: {
    key: {
      origin?: string;
      url?: string;
      formFactor?: string;
    };
    metrics: {
      largest_contentful_paint?: CruxMetricTimeseries;
      cumulative_layout_shift?: CruxMetricTimeseries;
      interaction_to_next_paint?: CruxMetricTimeseries;
      first_contentful_paint?: CruxMetricTimeseries;
      experimental_time_to_first_byte?: CruxMetricTimeseries;
    };
    collectionPeriods: CruxCollectionPeriod[];
  };
}

export interface CruxTrendPoint {
  date: string;
  lcp: number | null;
  cls: number | null;
  inp: number | null;
  fcp: number | null;
  ttfb: number | null;
}

// ---------------------------------------------------------------------------
// API
// ---------------------------------------------------------------------------

/** Fetch CrUX history for the origin (site-wide) or a specific URL */
export async function getCruxHistory(options?: {
  url?: string;
  formFactor?: 'PHONE' | 'DESKTOP' | 'TABLET';
}): Promise<CruxHistoryRecord> {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) throw new Error('GOOGLE_API_KEY is not set');

  const body: Record<string, unknown> = {};

  if (options?.url) {
    body.url = options.url;
  } else {
    body.origin = 'https://renonext.com';
  }

  if (options?.formFactor) {
    body.formFactor = options.formFactor;
  }

  const res = await fetch(`${CRUX_API}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`CrUX API error ${res.status}: ${err}`);
  }

  return res.json();
}

/** Parse CrUX history into a flat array of trend points for charting */
export function parseCruxTrend(data: CruxHistoryRecord): CruxTrendPoint[] {
  const metrics = data.record.metrics;
  const periods = data.record.collectionPeriods;

  return periods.map((period, i) => {
    const lastDate = period.lastDate;
    const date = `${lastDate.year}-${String(lastDate.month).padStart(2, '0')}-${String(lastDate.day).padStart(2, '0')}`;

    return {
      date,
      lcp: metrics.largest_contentful_paint?.percentilesTimeseries.p75s[i] ?? null,
      cls: metrics.cumulative_layout_shift?.percentilesTimeseries.p75s[i] ?? null,
      inp: metrics.interaction_to_next_paint?.percentilesTimeseries.p75s[i] ?? null,
      fcp: metrics.first_contentful_paint?.percentilesTimeseries.p75s[i] ?? null,
      ttfb: metrics.experimental_time_to_first_byte?.percentilesTimeseries.p75s[i] ?? null,
    };
  });
}
