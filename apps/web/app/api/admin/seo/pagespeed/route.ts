import { NextResponse, type NextRequest } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';

export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await request.json();
  const { url, strategy = 'mobile' } = body as { url: string; strategy?: 'mobile' | 'desktop' };

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'GOOGLE_API_KEY not configured' }, { status: 500 });
  }

  // Trigger PageSpeed fetch in background
  fetchPageSpeed(url, strategy, apiKey).catch((err) => {
    console.error(`PageSpeed fetch failed for ${url}:`, err);
  });

  return NextResponse.json({ status: 'processing', url, strategy }, { status: 202 });
}

async function fetchPageSpeed(url: string, strategy: string, apiKey: string) {
  const admin = createSupabaseAdminClient();
  const psiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&key=${apiKey}&category=PERFORMANCE&category=SEO&category=ACCESSIBILITY&category=BEST_PRACTICES`;

  const res = await fetch(psiUrl);
  if (!res.ok) {
    console.error(`PageSpeed API error: ${res.status} ${await res.text()}`);
    return;
  }

  const data = await res.json();
  const categories = data.lighthouseResult?.categories || {};
  const audits = data.lighthouseResult?.audits || {};

  await admin.from('seo_pagespeed_scores').insert({
    url,
    strategy,
    performance_score: Math.round((categories.performance?.score || 0) * 100),
    seo_score: Math.round((categories.seo?.score || 0) * 100),
    accessibility_score: Math.round((categories.accessibility?.score || 0) * 100),
    best_practices_score: Math.round((categories['best-practices']?.score || 0) * 100),
    fcp_ms: Math.round(audits['first-contentful-paint']?.numericValue || 0),
    lcp_ms: Math.round(audits['largest-contentful-paint']?.numericValue || 0),
    cls: audits['cumulative-layout-shift']?.numericValue || 0,
    ttfb_ms: Math.round(audits['server-response-time']?.numericValue || 0),
  });
}

export async function GET(request: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  const admin = createSupabaseAdminClient();
  let query = admin
    .from('seo_pagespeed_scores')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20);

  if (url) {
    query = query.eq('url', url);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ scores: data });
}
