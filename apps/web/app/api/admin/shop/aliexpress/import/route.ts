import { NextResponse, type NextRequest } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { slugify } from '@/lib/shop/helpers';
import { AEProduct, aePriceToCents, aeProductImages } from '@/lib/shop/aliexpress-client';

export async function POST(request: NextRequest) {
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

  const body = await request.json();
  const { product, category_id, status: productStatus } = body as {
    product: AEProduct;
    category_id: string;
    status?: string;
  };

  if (!product || !category_id) {
    return NextResponse.json({ error: 'product and category_id required' }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();

  // Check if already imported (by alibaba_url containing the product ID)
  const productUrl = product.product_detail_url || `https://www.aliexpress.com/item/${product.product_id}.html`;
  const { data: existing } = await admin
    .from('shop_products')
    .select('id')
    .eq('alibaba_url', productUrl)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ error: 'Product already imported', existing_id: existing.id }, { status: 409 });
  }

  const images = aeProductImages(product);
  const slug = slugify(product.product_title);

  // Ensure slug is unique
  const { data: slugCheck } = await admin
    .from('shop_products')
    .select('id')
    .eq('slug', slug)
    .maybeSingle();

  const finalSlug = slugCheck ? `${slug}-${Date.now()}` : slug;

  const priceCents = aePriceToCents(product.target_sale_price || product.sale_price || product.app_sale_price);
  const compareAtCents = aePriceToCents(product.target_original_price || product.original_price);

  const { data, error } = await admin
    .from('shop_products')
    .insert({
      category_id,
      slug: finalSlug,
      name: product.product_title,
      description: null,
      short_description: product.second_level_category_name
        ? `${product.second_level_category_name} — sourced from AliExpress`
        : 'Sourced from AliExpress',
      price_cents: priceCents,
      compare_at_cents: compareAtCents > priceCents ? compareAtCents : null,
      currency: 'CAD',
      images,
      thumbnail_url: product.product_main_image_url || images[0] || null,
      alibaba_url: productUrl,
      status: productStatus || 'draft',
      featured: false,
      tags: [
        product.first_level_category_name,
        product.second_level_category_name,
        'aliexpress-import',
      ].filter(Boolean) as string[],
      specs: {
        ...(product.lastest_volume ? { 'AE Sales Volume': product.lastest_volume } : {}),
        ...(product.evaluate_rate ? { 'AE Rating': product.evaluate_rate } : {}),
        'AE Product ID': String(product.product_id),
      },
      stock_status: 'in_stock',
    })
    .select('*, category:shop_categories(id,name,slug)')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
