import { NextResponse, type NextRequest } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { slugify } from '@/lib/shop/helpers';

export async function GET(request: NextRequest) {
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

  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get('status');
  const category_id = searchParams.get('category_id');
  const search = searchParams.get('search');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');

  // Use admin client for full access (including draft products)
  const admin = createSupabaseAdminClient();

  let query = admin
    .from('shop_products')
    .select('*, category:shop_categories(id,name,slug)', { count: 'exact' });

  if (status) {
    query = query.eq('status', status);
  }

  if (category_id) {
    query = query.eq('category_id', category_id);
  }

  if (search) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
  }

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await query
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    products: data,
    total: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit),
  });
}

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

  // Generate slug from name if not provided
  if (!body.slug && body.name) {
    body.slug = slugify(body.name);
  }

  if (!body.name || !body.slug) {
    return NextResponse.json(
      { error: 'Name and slug are required' },
      { status: 400 }
    );
  }

  // Use admin client to create product
  const admin = createSupabaseAdminClient();

  const { data, error } = await admin
    .from('shop_products')
    .insert({
      category_id: body.category_id || null,
      slug: body.slug,
      name: body.name,
      description: body.description || null,
      short_description: body.short_description || null,
      price_cents: body.price_cents || 0,
      compare_at_cents: body.compare_at_cents || null,
      currency: body.currency || 'CAD',
      images: body.images || [],
      thumbnail_url: body.thumbnail_url || null,
      alibaba_url: body.alibaba_url || null,
      status: body.status || 'draft',
      featured: body.featured || false,
      tags: body.tags || [],
      specs: body.specs || {},
      stock_status: body.stock_status || 'in_stock',
    })
    .select('*, category:shop_categories(id,name,slug)')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
