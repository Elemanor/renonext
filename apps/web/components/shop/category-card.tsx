import Link from 'next/link';
import { ShopCategory } from '@/lib/shop/types';
import { Card } from '@/components/ui/card';

interface CategoryCardProps {
  category: ShopCategory & { product_count?: number };
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/shop/${category.slug}`}>
      <Card className="p-6 text-center hover:shadow-float-hover transition-all duration-300 group h-full">
        {/* Icon */}
        {category.icon && (
          <div className="mb-4 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-reno-primary/10 flex items-center justify-center group-hover:bg-reno-primary/20 transition-colors">
              <span className="material-symbols-outlined text-4xl text-reno-primary">
                {category.icon}
              </span>
            </div>
          </div>
        )}

        {/* Name */}
        <h3 className="text-lg font-bold text-reno-dark mb-2 group-hover:text-reno-primary transition-colors">
          {category.name}
        </h3>

        {/* Description */}
        {category.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {category.description}
          </p>
        )}

        {/* Product Count */}
        {category.product_count !== undefined && (
          <p className="text-sm text-gray-500">
            {category.product_count} {category.product_count === 1 ? 'product' : 'products'}
          </p>
        )}
      </Card>
    </Link>
  );
}
