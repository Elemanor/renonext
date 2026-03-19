import { NextResponse, type NextRequest } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import {
  generateMetaDescription,
  generateFAQs,
  improveSEOTitle,
  generateBlogDraft,
  generateIntroRewrite,
  generateJsonLd,
  generateFullPageBrief,
} from '@/lib/ai/seo';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const generators: Record<string, (params: any) => Promise<{ tokensUsed: number; [k: string]: unknown }>> = {
  meta_description: (p) => generateMetaDescription(p),
  title: (p) => improveSEOTitle(p),
  faq: (p) => generateFAQs(p),
  blog_draft: (p) => generateBlogDraft(p),
  intro: (p) => generateIntroRewrite(p),
  jsonld: (p) => generateJsonLd(p),
  full_brief: (p) => generateFullPageBrief(p),
};

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
  const { type, params } = body as { type: string; params: Record<string, unknown> };

  if (!type || !params) {
    return NextResponse.json({ error: 'Missing type or params' }, { status: 400 });
  }

  const generator = generators[type];
  if (!generator) {
    return NextResponse.json({ error: `Unknown generation type: ${type}` }, { status: 400 });
  }

  try {
    const result = await generator(params);
    const { tokensUsed, ...output } = result;

    // Save as draft recommendation
    const admin = createSupabaseAdminClient();
    const { data: rec, error: dbError } = await admin
      .from('seo_recommendations')
      .insert({
        url: (params.url as string) || '',
        recommendation_type: type,
        input_snapshot: params,
        output_json: output,
        status: 'draft',
        created_by: user.id,
        tokens_used: tokensUsed,
      })
      .select('id')
      .single();

    if (dbError) {
      console.error('Failed to save recommendation:', dbError);
    }

    return NextResponse.json({ output, tokensUsed, recommendationId: rec?.id || null });
  } catch (error) {
    console.error('SEO generation error:', error);
    const message = error instanceof Error ? error.message : 'Generation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
