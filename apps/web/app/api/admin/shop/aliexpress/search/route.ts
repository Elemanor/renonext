import { NextResponse, type NextRequest } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { searchProducts, getHotProducts } from '@/lib/shop/aliexpress-client';

export async function GET(request: NextRequest) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const sp = request.nextUrl.searchParams;
  const keywords = sp.get('keywords') || '';
  const categoryIds = sp.get('category_ids') || '';
  const page = parseInt(sp.get('page') || '1');
  const pageSize = parseInt(sp.get('page_size') || '20');
  const sort = sp.get('sort') as 'SALE_PRICE_ASC' | 'SALE_PRICE_DESC' | 'LAST_VOLUME_ASC' | 'LAST_VOLUME_DESC' | null;
  const mode = sp.get('mode') || 'search'; // 'search' or 'hot'

  try {
    if (mode === 'hot') {
      const result = await getHotProducts({
        categoryIds,
        pageNo: page,
        pageSize,
      });
      return NextResponse.json(result.resp_result?.result || { products: { product: [] } });
    }

    if (!keywords) {
      return NextResponse.json({ error: 'Keywords required for search' }, { status: 400 });
    }

    const result = await searchProducts({
      keywords,
      categoryIds,
      pageNo: page,
      pageSize,
      sort: sort || undefined,
    });

    return NextResponse.json(result.resp_result?.result || { products: { product: [] } });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
