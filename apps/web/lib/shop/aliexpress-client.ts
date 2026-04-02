import crypto from 'crypto';

// AliExpress Affiliate API (TOP protocol)
// Gateway: https://api-sg.aliexpress.com/sync
// Docs: https://openservice.aliexpress.com

const GATEWAY = 'https://api-sg.aliexpress.com/sync';

function getConfig() {
  const appKey = process.env.ALIEXPRESS_APP_KEY;
  const appSecret = process.env.ALIEXPRESS_APP_SECRET;
  const trackingId = process.env.ALIEXPRESS_TRACKING_ID || '';

  if (!appKey || !appSecret) {
    throw new Error('Missing ALIEXPRESS_APP_KEY or ALIEXPRESS_APP_SECRET env vars');
  }

  return { appKey, appSecret, trackingId };
}

/** Sign params using HMAC-SHA256 (TOP protocol) */
function signRequest(params: Record<string, string>, secret: string): string {
  const sorted = Object.keys(params).sort();
  const baseString = sorted.map((k) => `${k}${params[k]}`).join('');
  return crypto
    .createHmac('sha256', secret)
    .update(baseString)
    .digest('hex')
    .toUpperCase();
}

/** Execute an AliExpress API call */
async function callApi<T>(method: string, bizParams: Record<string, string | number | boolean> = {}): Promise<T> {
  const { appKey, appSecret } = getConfig();

  const systemParams: Record<string, string> = {
    app_key: appKey,
    method,
    sign_method: 'hmac-sha256',
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    format: 'json',
    v: '2.0',
  };

  // Merge biz params (convert all values to strings)
  const allParams: Record<string, string> = { ...systemParams };
  for (const [k, v] of Object.entries(bizParams)) {
    if (v !== undefined && v !== null && v !== '') {
      allParams[k] = String(v);
    }
  }

  allParams.sign = signRequest(allParams, appSecret);

  const url = new URL(GATEWAY);
  for (const [k, v] of Object.entries(allParams)) {
    url.searchParams.set(k, v);
  }

  const res = await fetch(url.toString(), { method: 'POST' });
  if (!res.ok) {
    throw new Error(`AliExpress API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  // TOP protocol wraps response in `{method_name}_response`
  const responseKey = `${method.replace(/\./g, '_')}_response`;
  const body = data[responseKey] || data;

  if (body.error_response) {
    throw new Error(
      `AliExpress API: ${body.error_response.msg || body.error_response.sub_msg || JSON.stringify(body.error_response)}`
    );
  }

  return body as T;
}

// ─── Types ────────────────────────────────────────────────────

export interface AEProduct {
  product_id: number;
  product_title: string;
  product_main_image_url: string;
  product_small_image_urls?: { string: string[] };
  product_detail_url: string;
  app_sale_price?: string;
  app_sale_price_currency?: string;
  original_price?: string;
  original_price_currency?: string;
  sale_price?: string;
  sale_price_currency?: string;
  discount?: string;
  evaluate_rate?: string;
  first_level_category_id?: number;
  first_level_category_name?: string;
  second_level_category_id?: number;
  second_level_category_name?: string;
  shop_url?: string;
  shop_id?: number;
  target_app_sale_price?: string;
  target_app_sale_price_currency?: string;
  target_original_price?: string;
  target_original_price_currency?: string;
  target_sale_price?: string;
  target_sale_price_currency?: string;
  relevant_market_commission_rate?: string;
  lastest_volume?: string;
  hot_product_commission_rate?: string;
  promotion_link?: string;
}

export interface AECategory {
  category_id: number;
  category_name: string;
  parent_category_id?: number;
}

export interface AESearchResponse {
  resp_result: {
    resp_code: number;
    resp_msg: string;
    result: {
      current_page_no: number;
      current_record_count: number;
      total_page_no: number;
      total_record_count: number;
      products: { product: AEProduct[] };
    };
  };
}

export interface AEHotProductResponse {
  resp_result: {
    resp_code: number;
    resp_msg: string;
    result: {
      current_page_no: number;
      current_record_count: number;
      total_page_no: number;
      total_record_count: number;
      products: { product: AEProduct[] };
    };
  };
}

export interface AEProductDetailResponse {
  resp_result: {
    resp_code: number;
    resp_msg: string;
    result: {
      current_record_count: number;
      products: { product: AEProduct[] };
    };
  };
}

export interface AECategoryResponse {
  resp_result: {
    resp_code: number;
    resp_msg: string;
    result: {
      categories: { category: AECategory[] };
    };
  };
}

// ─── API Methods ──────────────────────────────────────────────

/** Search AliExpress products by keyword */
export async function searchProducts(params: {
  keywords: string;
  categoryIds?: string;
  minSalePrice?: number;
  maxSalePrice?: number;
  pageNo?: number;
  pageSize?: number;
  sort?: 'SALE_PRICE_ASC' | 'SALE_PRICE_DESC' | 'LAST_VOLUME_ASC' | 'LAST_VOLUME_DESC';
  shipToCountry?: string;
}): Promise<AESearchResponse> {
  const { trackingId } = getConfig();
  return callApi<AESearchResponse>('aliexpress.affiliate.product.query', {
    keywords: params.keywords,
    category_ids: params.categoryIds || '',
    min_sale_price: params.minSalePrice || '',
    max_sale_price: params.maxSalePrice || '',
    page_no: params.pageNo || 1,
    page_size: params.pageSize || 20,
    sort: params.sort || 'LAST_VOLUME_DESC',
    ship_to_country: params.shipToCountry || 'CA',
    target_currency: 'CAD',
    target_language: 'EN',
    tracking_id: trackingId,
  });
}

/** Get hot/trending products */
export async function getHotProducts(params: {
  categoryIds?: string;
  pageNo?: number;
  pageSize?: number;
  shipToCountry?: string;
}): Promise<AEHotProductResponse> {
  const { trackingId } = getConfig();
  return callApi<AEHotProductResponse>('aliexpress.affiliate.hotproduct.query', {
    category_ids: params.categoryIds || '',
    page_no: params.pageNo || 1,
    page_size: params.pageSize || 20,
    ship_to_country: params.shipToCountry || 'CA',
    target_currency: 'CAD',
    target_language: 'EN',
    tracking_id: trackingId,
  });
}

/** Get product details by product IDs (comma-separated, max 20) */
export async function getProductDetails(productIds: string[]): Promise<AEProductDetailResponse> {
  const { trackingId } = getConfig();
  return callApi<AEProductDetailResponse>('aliexpress.affiliate.productdetail.get', {
    product_ids: productIds.join(','),
    target_currency: 'CAD',
    target_language: 'EN',
    ship_to_country: 'CA',
    tracking_id: trackingId,
  });
}

/** Get AliExpress category tree */
export async function getCategories(): Promise<AECategoryResponse> {
  return callApi<AECategoryResponse>('aliexpress.affiliate.category.get', {});
}

/** Helper: extract price in cents from AliExpress price string like "12.34" */
export function aePriceToCents(priceStr: string | undefined): number {
  if (!priceStr) return 0;
  const num = parseFloat(priceStr);
  if (isNaN(num)) return 0;
  return Math.round(num * 100);
}

/** Helper: extract all image URLs from an AE product */
export function aeProductImages(product: AEProduct): string[] {
  const images: string[] = [];
  if (product.product_main_image_url) {
    images.push(product.product_main_image_url);
  }
  if (product.product_small_image_urls?.string) {
    for (const url of product.product_small_image_urls.string) {
      if (!images.includes(url)) images.push(url);
    }
  }
  return images;
}
