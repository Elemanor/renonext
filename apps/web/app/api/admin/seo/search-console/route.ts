import { NextResponse, type NextRequest } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import {
  getTopKeywords,
  getTopPages,
  getQuickWins,
  getKeywordsForPage,
  getSitemaps,
  submitSitemap,
  inspectUrl,
  daysAgo,
} from '@/lib/google/search-console';

async function verifyAdmin() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') return null;
  return user;
}

export async function GET(request: NextRequest) {
  const user = await verifyAdmin();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const days = parseInt(searchParams.get('days') || '28', 10);
  const startDate = searchParams.get('startDate') || daysAgo(days);
  const endDate = searchParams.get('endDate') || daysAgo(1);
  const limit = parseInt(searchParams.get('limit') || '50', 10);

  try {
    switch (action) {
      case 'keywords': {
        const rows = await getTopKeywords(startDate, endDate, limit);
        return NextResponse.json({ rows, startDate, endDate });
      }

      case 'pages': {
        const rows = await getTopPages(startDate, endDate, limit);
        return NextResponse.json({ rows, startDate, endDate });
      }

      case 'quick-wins': {
        const wins = await getQuickWins(startDate, endDate, limit);
        return NextResponse.json({ wins, startDate, endDate });
      }

      case 'page-keywords': {
        const pageUrl = searchParams.get('pageUrl');
        if (!pageUrl) return NextResponse.json({ error: 'pageUrl required' }, { status: 400 });
        const rows = await getKeywordsForPage(pageUrl, startDate, endDate);
        return NextResponse.json({ rows, pageUrl, startDate, endDate });
      }

      case 'sitemaps': {
        const sitemaps = await getSitemaps();
        return NextResponse.json({ sitemaps });
      }

      case 'inspect': {
        const inspectUrlParam = searchParams.get('url');
        if (!inspectUrlParam) return NextResponse.json({ error: 'url required' }, { status: 400 });
        const result = await inspectUrl(inspectUrlParam);
        return NextResponse.json(result);
      }

      default:
        return NextResponse.json({ error: 'Unknown action. Use: keywords, pages, quick-wins, page-keywords, sitemaps, inspect' }, { status: 400 });
    }
  } catch (error) {
    console.error('Search Console API error:', error);
    const message = error instanceof Error ? error.message : 'API request failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const user = await verifyAdmin();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { action } = body as { action: string };

  try {
    if (action === 'submit-sitemap') {
      const { sitemapUrl } = body as { sitemapUrl: string; action: string };
      if (!sitemapUrl) return NextResponse.json({ error: 'sitemapUrl required' }, { status: 400 });
      await submitSitemap(sitemapUrl);
      return NextResponse.json({ success: true, sitemapUrl });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('Search Console POST error:', error);
    const message = error instanceof Error ? error.message : 'Request failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
