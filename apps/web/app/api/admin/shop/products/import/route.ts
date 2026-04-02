import { NextResponse, type NextRequest } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { slugify } from '@/lib/shop/helpers';

export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServerClient();

  // Verify caller is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Verify caller is admin
  const { data: callerProfile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (callerProfile?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await request.json();
  const { products } = body;

  if (!Array.isArray(products) || products.length === 0) {
    return NextResponse.json(
      { error: 'Products array is required' },
      { status: 400 }
    );
  }

  // Use admin client
  const admin = createSupabaseAdminClient();

  // Fetch all categories for lookup
  const { data: categories } = await admin
    .from('shop_categories')
    .select('id, slug');

  const categoryMap = new Map(categories?.map((c) => [c.slug, c.id]) || []);

  const results: { imported: number; errors: Array<{ name: string; error: string }> } = {
    imported: 0,
    errors: [],
  };

  for (const product of products) {
    try {
      // Validate required fields
      if (!product.name || !product.price_cents) {
        results.errors.push({
          name: product.name || 'Unknown',
          error: 'Name and price_cents are required',
        });
        continue;
      }

      // Look up category by slug
      let categoryId = null;
      if (product.category_slug) {
        categoryId = categoryMap.get(product.category_slug);
        if (!categoryId) {
          results.errors.push({
            name: product.name,
            error: `Category not found: ${product.category_slug}`,
          });
          continue;
        }
      }

      // Generate slug from name if not provided
      const slug = product.slug || slugify(product.name);

      // Insert product
      const { error } = await admin.from('shop_products').insert({
        category_id: categoryId,
        slug,
        name: product.name,
        description: product.description || null,
        short_description: product.short_description || null,
        price_cents: product.price_cents,
        compare_at_cents: product.compare_at_cents || null,
        currency: product.currency || 'CAD',
        images: product.images || [],
        thumbnail_url: product.thumbnail_url || null,
        alibaba_url: product.alibaba_url || null,
        status: product.status || 'draft',
        featured: product.featured || false,
        tags: product.tags || [],
        specs: product.specs || {},
        stock_status: product.stock_status || 'in_stock',
      });

      if (error) {
        results.errors.push({
          name: product.name,
          error: error.message,
        });
      } else {
        results.imported++;
      }
    } catch (err) {
      results.errors.push({
        name: product.name || 'Unknown',
        error: err instanceof Error ? err.message : 'Unknown error',
      });
    }
  }

  return NextResponse.json(results);
}
