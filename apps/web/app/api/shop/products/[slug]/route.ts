import { createSupabaseServerClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const supabase = await createSupabaseServerClient();

    // Fetch product
    const { data: product, error: productError } = await supabase
      .from('shop_products')
      .select('*, category:shop_categories(id,name,slug,icon,description)')
      .eq('slug', slug)
      .eq('status', 'active')
      .single();

    if (productError || !product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Fetch related products (same category, exclude current)
    const { data: related } = await supabase
      .from('shop_products')
      .select('*, category:shop_categories(id,name,slug,icon)')
      .eq('category_id', product.category_id)
      .eq('status', 'active')
      .neq('id', product.id)
      .limit(4);

    return NextResponse.json({
      product,
      related: related || [],
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
