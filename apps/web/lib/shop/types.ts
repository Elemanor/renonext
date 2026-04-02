export type ProductStatus = 'draft' | 'active' | 'archived';
export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export interface ShopCategory {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
  parent_id: string | null;
  created_at: string;
}

export interface ShopProduct {
  id: string;
  category_id: string | null;
  slug: string;
  name: string;
  brand: string | null;
  description: string | null;
  short_description: string | null;
  price_cents: number;
  compare_at_cents: number | null;
  currency: string;
  images: string[];
  thumbnail_url: string | null;
  alibaba_url: string | null;
  meta_product_id: string | null;
  meta_synced_at: string | null;
  status: ProductStatus;
  featured: boolean;
  tags: string[];
  specs: Record<string, string>;
  stock_status: StockStatus;
  stock_quantity: number | null;
  created_at: string;
  updated_at: string;
  // Joined
  category?: ShopCategory;
}

export interface MetaSyncLog {
  id: string;
  product_id: string | null;
  action: string;
  status: string;
  error_message: string | null;
  synced_at: string;
}

export interface CartItem {
  product: ShopProduct;
  quantity: number;
}

export interface ProductFilters {
  category?: string;
  status?: ProductStatus;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  stockStatus?: StockStatus;
  inStock?: boolean;
  featured?: boolean;
  tags?: string[];
  page?: number;
  limit?: number;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'name';
}
