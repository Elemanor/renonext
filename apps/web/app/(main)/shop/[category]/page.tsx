import { createSupabaseServerClient, createSupabaseStaticClient } from '@/lib/supabase/server';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ProductGrid } from '@/components/shop/product-grid';
import { ShopProduct, ShopCategory } from '@/lib/shop/types';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateStaticParams() {
  const supabase = createSupabaseStaticClient();
  const { data: categories } = await supabase
    .from('shop_categories')
    .select('slug');

  return (categories || []).map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const supabase = await createSupabaseServerClient();

  const { data: category } = await supabase
    .from('shop_categories')
    .select('name,description')
    .eq('slug', categorySlug)
    .single();

  if (!category) {
    return {
      title: 'Category Not Found | RenoNext Shop',
    };
  }

  return {
    title: `${category.name} | Construction Supply Shop | RenoNext`,
    description: category.description || `Browse ${category.name} products for construction and renovation projects.`,
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const search = await searchParams;
  const supabase = await createSupabaseServerClient();

  // Fetch category
  const { data: category, error: categoryError } = await supabase
    .from('shop_categories')
    .select('*')
    .eq('slug', categorySlug)
    .single();

  if (categoryError || !category) {
    notFound();
  }

  // Parse filters from search params
  const page = parseInt((search.page as string) || '1');
  const limit = 24;
  const sort = (search.sort as string) || 'created_at_desc';

  // Build query
  let query = supabase
    .from('shop_products')
    .select('*, category:shop_categories(id,name,slug,icon)', { count: 'exact' })
    .eq('status', 'active')
    .eq('category_id', category.id);

  // Apply sorting
  switch (sort) {
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

  const { data: products, count } = await query;
  const totalPages = count ? Math.ceil(count / limit) : 0;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: category.name,
    description: category.description,
    numberOfItems: count || 0,
    itemListElement: (products || []).map((product: ShopProduct, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        description: product.short_description,
        url: `https://renonext.com/shop/${categorySlug}/${product.slug}`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/shop" className="hover:text-reno-primary">
              Shop
            </Link>
            <span className="material-symbols-outlined text-base">chevron_right</span>
            <span className="text-reno-dark font-medium">{category.name}</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-reno-primary to-reno-dark py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            {category.icon && (
              <span className="material-symbols-outlined text-5xl text-white">{category.icon}</span>
            )}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {category.description}
            </p>
          )}
          <p className="text-white/80 mt-4">
            {count || 0} {count === 1 ? 'product' : 'products'} available
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 bg-[#f6f8f8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Sort & Filter Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="text-sm text-gray-600">
              Showing {products?.length || 0} of {count || 0} products
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <div className="flex gap-2">
                <Link
                  href={`/shop/${categorySlug}?sort=created_at_desc`}
                  className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                    sort === 'created_at_desc'
                      ? 'bg-reno-primary text-white border-reno-primary'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-reno-primary'
                  }`}
                >
                  Newest
                </Link>
                <Link
                  href={`/shop/${categorySlug}?sort=name_asc`}
                  className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                    sort === 'name_asc'
                      ? 'bg-reno-primary text-white border-reno-primary'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-reno-primary'
                  }`}
                >
                  Name: A–Z
                </Link>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <ProductGrid products={products as ShopProduct[] || []} />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center gap-2">
              {page > 1 && (
                <Link
                  href={`/shop/${categorySlug}?page=${page - 1}`}
                  className="px-4 py-2 border rounded-lg bg-white hover:bg-gray-50"
                >
                  Previous
                </Link>
              )}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Link
                    key={pageNum}
                    href={`/shop/${categorySlug}?page=${pageNum}`}
                    className={`px-4 py-2 border rounded-lg ${
                      pageNum === page
                        ? 'bg-reno-primary text-white'
                        : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </Link>
                );
              })}
              {page < totalPages && (
                <Link
                  href={`/shop/${categorySlug}?page=${page + 1}`}
                  className="px-4 py-2 border rounded-lg bg-white hover:bg-gray-50"
                >
                  Next
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
