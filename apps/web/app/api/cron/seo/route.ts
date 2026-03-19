/**
 * Vercel Cron — SEO Autopilot
 * Runs daily: audit → auto-fix critical issues → collect experiment metrics.
 * Protected by CRON_SECRET header.
 */

import { NextRequest, NextResponse } from 'next/server';
import { runAutopilot } from '@/lib/seo/autopilot';

export const maxDuration = 300; // 5 min (Vercel Pro limit)
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await runAutopilot();

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (err) {
    console.error('[SEO Cron] Autopilot failed:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
