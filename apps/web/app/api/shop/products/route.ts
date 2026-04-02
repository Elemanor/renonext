import { createSupabaseServerClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const searchParams = request.nextUrl.searchParams;

    // Query params
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const tags = searchParams.get('tags');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '24');
    const sort = searchParams.get('sort') || 'created_at_desc';

    // Build query
    let query = supabase
      .from('shop_products')
      .select('*, category:shop_categories(id,name,slug,icon)', { count: 'exact' })
      .eq('status', 'active');

    // Apply filters
    if (category) {
      const { data: cat } = await supabase
        .from('shop_categories')
        .select('id')
        .eq('slug', category)
        .single();
      if (cat) {
        query = query.eq('category_id', cat.id);
      }
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,short_description.ilike.%${search}%`);
    }

    if (minPrice) {
      query = query.gte('price_cents', parseInt(minPrice) * 100);
    }

    if (maxPrice) {
      query = query.lte('price_cents', parseInt(maxPrice) * 100);
    }

    if (tags) {
      const tagArray = tags.split(',');
      query = query.contains('tags', tagArray);
    }

    // Apply sorting
    switch (sort) {
      case 'price_asc':
        query = query.order('price_cents', { ascending: true });
        break;
      case 'price_desc':
        query = query.order('price_cents', { ascending: false });
        break;
      case 'name_asc':
        query = query.order('name', { ascending: true });
        break;
      case 'created_at_desc':
      default:
        query = query.order('created_at', { ascending: false });
        break;
    }

    // Pagination
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);

    const { data: products, error, count } = await query;

    if (error) {
      console.error('Error fetching products:', error);
      return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }

    const totalPages = count ? Math.ceil(count / limit) : 0;

    return NextResponse.json({
      products: products || [],
      total: count || 0,
      page,
      totalPages,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
