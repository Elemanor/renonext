/**
 * Meta Commerce API Integration
 * Direct Facebook Graph API integration for syncing products to Facebook Shops.
 * Uses fetch instead of SDK for Next.js edge runtime compatibility.
 */

import type { ShopProduct } from './types';
import { getProductImageUrl } from './helpers';

const META_API_VERSION = 'v19.0';
const META_BASE_URL = `https://graph.facebook.com/${META_API_VERSION}`;

interface MetaConfig {
  accessToken: string;
  catalogId: string;
  pixelId: string;
}

function getConfig(): MetaConfig {
  return {
    accessToken: process.env.META_ACCESS_TOKEN || '',
    catalogId: process.env.META_CATALOG_ID || '',
    pixelId: process.env.META_PIXEL_ID || '',
  };
}

export function isConfigured(): boolean {
  const config = getConfig();
  return Boolean(config.accessToken && config.catalogId);
}

interface MetaProduct {
  retailer_id: string;
  name: string;
  description: string;
  availability: string;
  condition: string;
  price: string;
  image_url: string;
  url: string;
  brand: string;
  category: string;
}

interface SyncResult {
  success: boolean;
  metaProductId?: string;
  error?: string;
}

interface BatchSyncResult {
  synced: number;
  errors: Array<{ productId: string; error: string }>;
}

export interface CatalogStatus {
  productCount: number;
  status: string;
  lastUpdated: string | null;
}

/**
 * Map ShopProduct to Meta Commerce product format
 */
function mapProductToMeta(product: ShopProduct): MetaProduct {
  // Determine availability based on stock status
  let availability = 'in stock';
  if (product.stock_status === 'out_of_stock') {
    availability = 'out of stock';
  } else if (product.stock_status === 'low_stock') {
    availability = 'in stock'; // Meta only supports "in stock" or "out of stock"
  }

  // Get the best image URL
  let imageUrl = '';
  if (product.thumbnail_url) {
    imageUrl = getProductImageUrl(product.thumbnail_url);
  } else if (product.images && product.images.length > 0) {
    imageUrl = getProductImageUrl(product.images[0]);
  }

  // Build product URL
  const categorySlug = product.category?.slug || 'products';
  const productUrl = `https://renonext.com/shop/${categorySlug}/${product.slug}`;

  return {
    retailer_id: product.id,
    name: product.name,
    description: product.description || product.short_description || '',
    availability,
    condition: 'new',
    price: `${(product.price_cents / 100).toFixed(2)} ${product.currency}`,
    image_url: imageUrl,
    url: productUrl,
    brand: 'RenoNext',
    category: 'Hardware > Tools',
  };
}

/**
 * Make authenticated request to Meta Graph API
 */
async function metaRequest(
  endpoint: string,
  method: 'GET' | 'POST' | 'DELETE' = 'GET',
  body?: Record<string, unknown>
): Promise<{ success: boolean; data?: unknown; error?: string }> {
  const config = getConfig();

  if (!isConfigured()) {
    return {
      success: false,
      error: 'Meta Commerce API not configured. Set META_ACCESS_TOKEN and META_CATALOG_ID.',
    };
  }

  const url = new URL(`${META_BASE_URL}${endpoint}`);
  url.searchParams.set('access_token', config.accessToken);

  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body && (method === 'POST' || method === 'DELETE')) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url.toString(), options);
    const data = await response.json();

    if (!response.ok) {
      const errorMessage =
        data.error?.message || `Meta API error: ${response.status} ${response.statusText}`;
      return { success: false, error: errorMessage };
    }

    return { success: true, data };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: `Network error: ${errorMessage}` };
  }
}

/**
 * Sync a single product to Meta catalog.
 * Creates if new, updates if meta_product_id exists.
 */
export async function syncProduct(product: ShopProduct): Promise<SyncResult> {
  const config = getConfig();
  const metaProduct = mapProductToMeta(product);

  if (product.meta_product_id) {
    // Update existing product
    const result = await metaRequest(
      `/${product.meta_product_id}`,
      'POST',
      metaProduct as unknown as Record<string, unknown>
    );

    if (result.success) {
      return {
        success: true,
        metaProductId: product.meta_product_id,
      };
    } else {
      return {
        success: false,
        error: result.error,
      };
    }
  } else {
    // Create new product
    const result = await metaRequest(
      `/${config.catalogId}/products`,
      'POST',
      metaProduct as unknown as Record<string, unknown>
    );

    if (result.success && typeof result.data === 'object' && result.data !== null) {
      const data = result.data as { id?: string };
      return {
        success: true,
        metaProductId: data.id,
      };
    } else {
      return {
        success: false,
        error: result.error,
      };
    }
  }
}

/**
 * Delete a product from Meta catalog
 */
export async function deleteProduct(metaProductId: string): Promise<SyncResult> {
  const result = await metaRequest(`/${metaProductId}`, 'DELETE');

  if (result.success) {
    return { success: true };
  } else {
    return {
      success: false,
      error: result.error,
    };
  }
}

/**
 * Batch sync multiple products to Meta catalog.
 * Processes in batches of 20 (Meta API limit).
 */
export async function batchSync(products: ShopProduct[]): Promise<BatchSyncResult> {
  const config = getConfig();
  const BATCH_SIZE = 20;
  let synced = 0;
  const errors: Array<{ productId: string; error: string }> = [];

  // Process in batches
  for (let i = 0; i < products.length; i += BATCH_SIZE) {
    const batch = products.slice(i, i + BATCH_SIZE);
    const requests = batch.map((product) => {
      const metaProduct = mapProductToMeta(product);
      const method = product.meta_product_id ? 'UPDATE' : 'CREATE';

      return {
        method,
        retailer_id: product.id,
        data: metaProduct,
      };
    });

    // Send batch request
    const result = await metaRequest(
      `/${config.catalogId}/batch`,
      'POST',
      { requests }
    );

    if (result.success && typeof result.data === 'object' && result.data !== null) {
      const data = result.data as { handles?: string[] };
      if (data.handles && Array.isArray(data.handles)) {
        synced += data.handles.length;
      }
    } else {
      // If batch fails, log errors for all products in batch
      batch.forEach((product) => {
        errors.push({
          productId: product.id,
          error: result.error || 'Batch request failed',
        });
      });
    }

    // Rate limit: wait 100ms between batches to avoid hitting Meta's rate limit
    if (i + BATCH_SIZE < products.length) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  return { synced, errors };
}

/**
 * Get Meta catalog status (product count, name)
 */
export async function getCatalogStatus(): Promise<CatalogStatus> {
  const config = getConfig();
  const result = await metaRequest(
    `/${config.catalogId}?fields=product_count,name,update_time`
  );

  if (result.success && typeof result.data === 'object' && result.data !== null) {
    const data = result.data as {
      product_count?: number;
      name?: string;
      update_time?: string;
    };
    return {
      productCount: data.product_count || 0,
      status: data.name || 'Unknown',
      lastUpdated: data.update_time || null,
    };
  } else {
    return {
      productCount: 0,
      status: result.error || 'Error fetching catalog',
      lastUpdated: null,
    };
  }
}
