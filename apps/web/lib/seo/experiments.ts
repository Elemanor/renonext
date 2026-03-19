/**
 * SEO Experiment Tracking Engine.
 * Auto-populates baseline metrics from Search Console when a recommendation is applied.
 * After 14 days, auto-fills post-change metrics and computes deltas.
 */

import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { getSearchAnalytics, daysAgo } from '@/lib/google/search-console';

const COMPARISON_WINDOW_DAYS = 14;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Experiment {
  id: string;
  recommendation_id: string | null;
  url: string;
  change_type: string;
  hypothesis: string | null;
  baseline_start: string | null;
  baseline_end: string | null;
  post_change_start: string | null;
  post_change_end: string | null;
  baseline_impressions: number | null;
  baseline_clicks: number | null;
  baseline_ctr: number | null;
  baseline_position: number | null;
  post_impressions: number | null;
  post_clicks: number | null;
  post_ctr: number | null;
  post_position: number | null;
  delta_impressions: number | null;
  delta_clicks: number | null;
  notes: string | null;
  created_at: string;
}

export interface ExperimentWithStatus extends Experiment {
  status: 'baseline' | 'monitoring' | 'complete';
  daysRemaining: number;
  confidence: 'positive' | 'negative' | 'neutral' | 'pending';
}

// ---------------------------------------------------------------------------
// Create experiment when recommendation is applied
// ---------------------------------------------------------------------------

export async function createExperimentForRecommendation(
  recommendationId: string,
  url: string,
  changeType: string,
  hypothesis?: string
): Promise<string | null> {
  const admin = createSupabaseAdminClient();

  // Baseline = last 14 days before today
  const baselineEnd = daysAgo(1);
  const baselineStart = daysAgo(COMPARISON_WINDOW_DAYS + 1);

  // Fetch baseline metrics from Search Console
  let baselineImpressions = 0;
  let baselineClicks = 0;
  let baselineCtr = 0;
  let baselinePosition = 0;

  try {
    const data = await getSearchAnalytics({
      startDate: baselineStart,
      endDate: baselineEnd,
      dimensions: ['page'],
      dimensionFilterGroups: [{
        filters: [{
          dimension: 'page',
          operator: 'equals',
          expression: url,
        }],
      }],
      rowLimit: 1,
    });

    if (data.rows && data.rows.length > 0) {
      const row = data.rows[0];
      baselineImpressions = row.impressions;
      baselineClicks = row.clicks;
      baselineCtr = row.ctr;
      baselinePosition = row.position;
    }
  } catch (err) {
    console.warn('Could not fetch baseline from Search Console:', err);
    // Continue — experiment is still created, baseline can be filled later
  }

  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await admin
    .from('seo_experiments')
    .insert({
      recommendation_id: recommendationId,
      url,
      change_type: changeType,
      hypothesis: hypothesis || `Improve ${changeType.replace(/_/g, ' ')} to increase CTR and clicks`,
      baseline_start: baselineStart,
      baseline_end: baselineEnd,
      post_change_start: today,
      baseline_impressions: baselineImpressions,
      baseline_clicks: baselineClicks,
      baseline_ctr: baselineCtr,
      baseline_position: baselinePosition,
    })
    .select('id')
    .single();

  if (error) {
    console.error('Failed to create experiment:', error);
    return null;
  }

  return data.id;
}

// ---------------------------------------------------------------------------
// Collect post-change metrics for mature experiments
// ---------------------------------------------------------------------------

export async function collectPostMetrics(): Promise<{ updated: number; errors: number }> {
  const admin = createSupabaseAdminClient();
  let updated = 0;
  let errors = 0;

  // Find experiments that have post_change_start set but no post metrics,
  // and where enough time has passed (14 days)
  const cutoff = daysAgo(COMPARISON_WINDOW_DAYS);

  const { data: experiments, error } = await admin
    .from('seo_experiments')
    .select('*')
    .not('post_change_start', 'is', null)
    .is('post_impressions', null)
    .lte('post_change_start', cutoff);

  if (error || !experiments) {
    console.error('Failed to fetch experiments for post-metric collection:', error);
    return { updated: 0, errors: 1 };
  }

  for (const exp of experiments) {
    try {
      const postStart = exp.post_change_start;
      const postEnd = daysAgo(1);

      const data = await getSearchAnalytics({
        startDate: postStart,
        endDate: postEnd,
        dimensions: ['page'],
        dimensionFilterGroups: [{
          filters: [{
            dimension: 'page',
            operator: 'equals',
            expression: exp.url,
          }],
        }],
        rowLimit: 1,
      });

      if (data.rows && data.rows.length > 0) {
        const row = data.rows[0];
        const deltaImpressions = row.impressions - (exp.baseline_impressions || 0);
        const deltaClicks = row.clicks - (exp.baseline_clicks || 0);

        await admin
          .from('seo_experiments')
          .update({
            post_change_end: postEnd,
            post_impressions: row.impressions,
            post_clicks: row.clicks,
            post_ctr: row.ctr,
            post_position: row.position,
            delta_impressions: deltaImpressions,
            delta_clicks: deltaClicks,
          })
          .eq('id', exp.id);

        updated++;
      }
    } catch (err) {
      console.error(`Failed to collect post metrics for experiment ${exp.id}:`, err);
      errors++;
    }
  }

  return { updated, errors };
}

// ---------------------------------------------------------------------------
// Enrich experiments with computed status
// ---------------------------------------------------------------------------

export function enrichExperiment(exp: Experiment): ExperimentWithStatus {
  const now = new Date();
  let status: ExperimentWithStatus['status'] = 'baseline';
  let daysRemaining = 0;
  let confidence: ExperimentWithStatus['confidence'] = 'pending';

  if (exp.post_change_start) {
    const postStart = new Date(exp.post_change_start);
    const elapsed = Math.floor((now.getTime() - postStart.getTime()) / (1000 * 60 * 60 * 24));

    if (exp.post_impressions !== null) {
      status = 'complete';
      daysRemaining = 0;

      // Determine confidence based on deltas
      if (exp.delta_clicks !== null && exp.delta_impressions !== null) {
        if (exp.delta_clicks > 0 && exp.delta_impressions >= 0) {
          confidence = 'positive';
        } else if (exp.delta_clicks < 0) {
          confidence = 'negative';
        } else {
          confidence = 'neutral';
        }
      }
    } else {
      status = 'monitoring';
      daysRemaining = Math.max(0, COMPARISON_WINDOW_DAYS - elapsed);
    }
  }

  return { ...exp, status, daysRemaining, confidence };
}
