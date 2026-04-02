import { ShopProduct } from '@/lib/shop/types';
import { ProductCard } from './product-card';

interface RelatedProductsProps {
  products: ShopProduct[];
  categorySlug: string;
}

export function RelatedProducts({ products, categorySlug }: RelatedProductsProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-bold text-reno-dark mb-8">
        Related Products
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            categorySlug={categorySlug}
          />
        ))}
      </div>
    </div>
  );
}
