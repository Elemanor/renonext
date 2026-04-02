import Link from 'next/link';
import Image from 'next/image';
import { ShopProduct } from '@/lib/shop/types';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface ProductCardProps {
  product: ShopProduct;
  categorySlug?: string;
}

export function ProductCard({ product, categorySlug }: ProductCardProps) {
  const category = categorySlug || product.category?.slug;
  const imageUrl = product.images?.[0] || '/placeholder-product.jpg';

  return (
    <Link href={`/shop/${category}/${product.slug}`}>
      <Card className="group overflow-hidden hover:shadow-float-hover transition-all duration-300 h-full">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Category Badge */}
          {product.category && (
            <div className="absolute top-3 left-3">
              <Badge variant="default" className="bg-white/90 text-reno-dark backdrop-blur-sm">
                {product.category.name}
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Product Name */}
          <h3 className="font-semibold text-reno-dark mb-2 line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>

          {/* Short Description */}
          {product.short_description && (
            <p className="text-sm text-gray-500 mb-3 line-clamp-2">
              {product.short_description}
            </p>
          )}

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {product.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
