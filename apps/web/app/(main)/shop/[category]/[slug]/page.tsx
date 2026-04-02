import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ProductGallery } from '@/components/shop/product-gallery';
import { ProductSpecs } from '@/components/shop/product-specs';
import { AffiliateCTA } from '@/components/shop/affiliate-cta';
import { RelatedProducts } from '@/components/shop/related-products';
import { Badge } from '@/components/ui/badge';
import { ShopProduct } from '@/lib/shop/types';
import { mockBlogPosts, categoryLabels, categoryColors, BlogPost } from '@/lib/mock-data/blog';

interface ProductPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();

  const { data: product } = await supabase
    .from('shop_products')
    .select('name,short_description,images')
    .eq('slug', slug)
    .single();

  if (!product) {
    return {
      title: 'Product Not Found | RenoNext Shop',
    };
  }

  return {
    title: `${product.name} | RenoNext Shop`,
    description: product.short_description || `${product.name} — quality construction and renovation supplies from RenoNext.`,
    openGraph: {
      images: product.images?.[0] ? [product.images[0]] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { category: categorySlug, slug } = await params;
  const supabase = await createSupabaseServerClient();

  // Fetch product
  const { data: product, error: productError } = await supabase
    .from('shop_products')
    .select('*, category:shop_categories(id,name,slug,icon,description)')
    .eq('slug', slug)
    .eq('status', 'active')
    .single();

  if (productError || !product) {
    notFound();
  }

  // Fetch related products
  const { data: related } = await supabase
    .from('shop_products')
    .select('*, category:shop_categories(id,name,slug,icon)')
    .eq('category_id', product.category_id)
    .eq('status', 'active')
    .neq('id', product.id)
    .limit(4);

  // Fetch verified pros for installation section
  const { data: pros } = await supabase
    .from('contractor_profiles')
    .select('id, user_id, business_name, trade, services, profile_image, badge')
    .eq('current_status', 'active')
    .limit(3);

  // Filter related blog posts
  const getRelatedBlogPosts = (): BlogPost[] => {
    const productTags = (product.tags || []) as string[];
    const matchedPosts = new Set<BlogPost>();
    const matchTags = new Set<string>();

    // Build match tags based on product category and tags
    if (categorySlug === 'no-drill-bathroom' || productTags.some(t => t.includes('bathroom'))) {
      matchTags.add('bathroom');
      matchTags.add('rental');
      matchTags.add('no-drilling');
    }
    if (categorySlug === 'no-drill-kitchen' || productTags.some(t => t.includes('kitchen'))) {
      matchTags.add('kitchen');
      matchTags.add('rental');
      matchTags.add('no-drilling');
    }
    if (productTags.some(t => t.includes('no-drilling'))) {
      matchTags.add('rental');
      matchTags.add('no-drilling');
      matchTags.add('shop');
    }
    // Always include shop as fallback
    matchTags.add('shop');

    // Filter posts
    for (const post of mockBlogPosts) {
      if (matchedPosts.size >= 3) break;
      const hasMatch = post.tags.some(tag =>
        Array.from(matchTags).some(matchTag => tag.includes(matchTag))
      );
      if (hasMatch) {
        matchedPosts.add(post);
      }
    }

    return Array.from(matchedPosts).slice(0, 3);
  };

  const relatedArticles = getRelatedBlogPosts();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.short_description,
    image: product.images || [],
    brand: {
      '@type': 'Brand',
      name: product.brand || 'RenoNext',
    },
    category: product.category?.name,
    url: `https://renonext.com/shop/${categorySlug}/${slug}`,
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
          <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
            <Link href="/shop" className="hover:text-reno-primary">
              Shop
            </Link>
            <span className="material-symbols-outlined text-base">chevron_right</span>
            <Link href={`/shop/${categorySlug}`} className="hover:text-reno-primary">
              {product.category?.name}
            </Link>
            <span className="material-symbols-outlined text-base">chevron_right</span>
            <span className="text-reno-dark font-medium">{product.name}</span>
          </div>
        </div>
      </nav>

      {/* Product Details */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Gallery */}
            <div>
              <ProductGallery
                images={product.images || []}
                productName={product.name}
              />
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                <Badge variant="default" className="mb-2">
                  {product.category?.name}
                </Badge>
                {product.featured && (
                  <Badge variant="secondary" className="mb-2 ml-2">
                    Featured
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-reno-dark mb-4">
                {product.name}
              </h1>

              {product.brand && (
                <p className="text-gray-600 mb-6">
                  by <span className="font-medium text-reno-dark">{product.brand}</span>
                </p>
              )}

              {/* Short Description */}
              {product.short_description && (
                <p className="text-lg text-gray-700 mb-8">
                  {product.short_description}
                </p>
              )}

              {/* CTA */}
              <AffiliateCTA stockStatus={product.stock_status} />

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {product.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Tabs: Description & Specs */}
          <div className="mt-16">
            <div className="border-b mb-8">
              <div className="flex gap-8">
                <button className="pb-4 border-b-2 border-reno-primary text-reno-primary font-medium">
                  Description
                </button>
                {product.specs && Object.keys(product.specs).length > 0 && (
                  <button className="pb-4 text-gray-600 hover:text-reno-primary font-medium">
                    Specifications
                  </button>
                )}
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="prose max-w-none mb-12">
                <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
              </div>
            )}

            {/* Specs */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-reno-dark mb-6">Specifications</h3>
                <ProductSpecs specs={product.specs} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related && related.length > 0 && (
        <section className="py-20 bg-[#f6f8f8]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <RelatedProducts
              products={related as ShopProduct[]}
              categorySlug={categorySlug}
            />
          </div>
        </section>
      )}

      {/* Need Help Installing? */}
      {pros && pros.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-reno-dark to-slate-900">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Need Help Installing?</h2>
              <p className="text-white/70">Our verified pros can handle the installation for you</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pros.map((pro) => (
                <Link
                  key={pro.id}
                  href={`/pros/${pro.user_id}`}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    {pro.profile_image ? (
                      <Image
                        src={pro.profile_image}
                        alt={pro.business_name}
                        width={56}
                        height={56}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-reno-primary/20 flex items-center justify-center">
                        <span className="text-white text-xl font-bold">
                          {pro.business_name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-white font-bold mb-1">{pro.business_name}</h3>
                      <p className="text-white/60 text-sm">{pro.trade}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[#0fbabd] font-semibold text-sm group">
                    View Profile
                    <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/pros"
                className="inline-flex items-center gap-2 text-[#0fbabd] font-semibold hover:underline"
              >
                Browse all verified pros
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-reno-dark mb-2">Related Articles</h2>
            <p className="text-gray-500 mb-8">Learn more about this type of product</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <Badge
                      className={`mb-3 ${categoryColors[post.category]}`}
                      variant="outline"
                    >
                      {categoryLabels[post.category]}
                    </Badge>
                    <h3 className="font-semibold text-reno-dark mb-2 line-clamp-2 group-hover:text-reno-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-1 text-[#0fbabd] text-sm font-medium">
                      Read more
                      <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
