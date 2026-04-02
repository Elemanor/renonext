'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { ShopCategory, ProductFilters as ProductFiltersType } from '@/lib/shop/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ProductFiltersProps {
  categories: ShopCategory[];
  currentCategory?: string;
  onFilterChange: (filters: ProductFiltersType) => void;
}

export function ProductFilters({
  categories,
  currentCategory,
  onFilterChange,
}: ProductFiltersProps) {
  const [inStockOnly, setInStockOnly] = useState(false);

  const handleApplyFilters = () => {
    onFilterChange({
      inStock: inStockOnly,
    });
  };

  const handleReset = () => {
    setInStockOnly(false);
    onFilterChange({});
  };

  return (
    <Card className="p-6 sticky top-6">
      <h3 className="text-lg font-bold text-reno-dark mb-6">Filters</h3>

      {/* Categories */}
      <div className="mb-8">
        <h4 className="font-semibold text-reno-dark mb-3">Categories</h4>
        <div className="space-y-2">
          <Link
            href="/shop"
            className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
              !currentCategory
                ? 'bg-reno-primary text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All Products
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop/${category.slug}`}
              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                currentCategory === category.slug
                  ? 'bg-reno-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Stock Status */}
      <div className="mb-8">
        <h4 className="font-semibold text-reno-dark mb-3">Availability</h4>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 text-reno-primary focus:ring-reno-primary rounded"
          />
          <span className="text-sm text-gray-700">In Stock Only</span>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <Button onClick={handleApplyFilters} className="w-full">
          Apply Filters
        </Button>
        <Button onClick={handleReset} variant="outline" className="w-full">
          Reset
        </Button>
      </div>
    </Card>
  );
}
