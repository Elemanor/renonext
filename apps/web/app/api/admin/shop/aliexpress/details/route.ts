import { NextResponse, type NextRequest } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getProductDetails } from '@/lib/shop/aliexpress-client';

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

  const productIds = request.nextUrl.searchParams.get('product_ids');

  if (!productIds) {
    return NextResponse.json({ error: 'product_ids required' }, { status: 400 });
  }

  const ids = productIds.split(',').slice(0, 20); // Max 20

  try {
    const result = await getProductDetails(ids);
    return NextResponse.json(result.resp_result?.result || { products: { product: [] } });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
