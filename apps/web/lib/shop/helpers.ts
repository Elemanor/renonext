/**
 * Format cents to dollar string. e.g. 4299 → "$42.99"
 */
export function formatPrice(cents: number, currency = 'CAD'): string {
  const dollars = cents / 100;
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(dollars);
}

/**
 * Build the public URL for a product page.
 */
export function getProductUrl(categorySlug: string, productSlug: string): string {
  return `/shop/${categorySlug}/${productSlug}`;
}

/**
 * Build Supabase storage public URL for a shop image.
 */
export function getProductImageUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  return `${base}/storage/v1/object/public/shop-images/${path}`;
}

/**
 * Calculate savings percentage between compare-at and actual price.
 * Returns 0 if no compare-at price or if compare-at is lower.
 */
export function calculateSavings(priceCents: number, compareAtCents: number | null): number {
  if (!compareAtCents || compareAtCents <= priceCents) return 0;
  return Math.round(((compareAtCents - priceCents) / compareAtCents) * 100);
}

/**
 * Generate a URL-safe slug from a name.
 */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Stock status display helpers
 */
export const stockStatusLabels: Record<string, string> = {
  in_stock: 'In Stock',
  low_stock: 'Low Stock',
  out_of_stock: 'Out of Stock',
};

export const stockStatusColors: Record<string, string> = {
  in_stock: 'text-green-600 bg-green-50',
  low_stock: 'text-amber-600 bg-amber-50',
  out_of_stock: 'text-red-600 bg-red-50',
};
