import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Metadata } from 'next';
import Link from 'next/link';
import { ProductCard } from '@/components/shop/product-card';
import { CategoryCard } from '@/components/shop/category-card';
import { Button } from '@/components/ui/button';
import { ShopProduct, ShopCategory } from '@/lib/shop/types';

export const metadata: Metadata = {
  title: 'Construction Supply Shop | RenoNext',
  description: 'Curated construction supplies, tools, and materials for renovation professionals and homeowners. Quality products with expert recommendations.',
};

export default async function ShopPage() {
  const supabase = await createSupabaseServerClient();

  // Fetch featured products
  const { data: featured } = await supabase
    .from('shop_products')
    .select('*, category:shop_categories(id,name,slug,icon)')
    .eq('status', 'active')
    .eq('featured', true)
    .limit(8);

  // Fetch categories
  const { data: categories } = await supabase
    .from('shop_categories')
    .select('*')
    .order('sort_order');

  // Get product count for each category
  const categoriesWithCount = await Promise.all(
    (categories || []).map(async (category: ShopCategory) => {
      const { count } = await supabase
        .from('shop_products')
        .select('*', { count: 'exact', head: true })
        .eq('category_id', category.id)
        .eq('status', 'active');

      return {
        ...category,
        product_count: count || 0,
      };
    })
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Construction Supply Shop',
    description: 'Curated construction supplies, tools, and materials for renovation professionals and homeowners.',
    url: 'https://renonext.com/shop',
    provider: {
      '@type': 'Organization',
      name: 'RenoNext',
      url: 'https://renonext.com',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-reno-primary via-reno-primary/90 to-reno-dark py-20 md:py-28">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6">
            Construction Supply Shop
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
            Curated construction supplies, tools, and materials for renovation professionals and homeowners. Quality products with expert recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="default" className="bg-white text-reno-primary hover:bg-white/90">
              Browse All Products
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/pros">Need a Pro to Install?</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featured && featured.length > 0 && (
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-reno-dark mb-4">
                Featured Products
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Top-rated products recommended by construction professionals
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featured.map((product: ShopProduct) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  categorySlug={product.category?.slug}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Grid */}
      <section className="py-20 md:py-28 bg-[#f6f8f8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-reno-dark mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our curated selection of construction supplies and materials
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categoriesWithCount.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Cross-link CTA */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-reno-primary to-reno-dark">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Need a Pro to Install?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Connect with verified construction professionals for installation and renovation services.
          </p>
          <Button size="lg" variant="default" className="bg-white text-reno-primary hover:bg-white/90" asChild>
            <Link href="/pros">Browse Verified Pros</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
