/**
 * Admin API: Meta Commerce Catalog Sync
 *
 * GET /api/admin/shop/meta-sync
 * - Get catalog status from Meta API
 * - Get recent sync logs
 * - Get sync stats (last 24h)
 *
 * POST /api/admin/shop/meta-sync
 * - Sync all active products to Meta catalog
 * - Log results to shop_meta_sync_log
 * - Update meta_product_id and meta_synced_at
 */

import { NextResponse, type NextRequest } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import {
  syncProduct,
  batchSync,
  getCatalogStatus,
  isConfigured,
} from '@/lib/shop/meta-commerce';
import type { ShopProduct, MetaSyncLog } from '@/lib/shop/types';

/**
 * Admin auth check helper
 */
async function verifyAdmin() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { authorized: false, error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  }

  const { data: callerProfile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (callerProfile?.role !== 'admin') {
    return { authorized: false, error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) };
  }

  return { authorized: true, user };
}

/**
 * GET: Get catalog status and recent sync logs
 */
export async function GET() {
  const auth = await verifyAdmin();
  if (!auth.authorized) return auth.error;

  // Check if Meta API is configured
  if (!isConfigured()) {
    return NextResponse.json(
      {
        error: 'Meta Commerce API not configured',
        message: 'Set META_ACCESS_TOKEN and META_CATALOG_ID environment variables',
      },
      { status: 503 }
    );
  }

  const admin = createSupabaseAdminClient();

  try {
    // Get catalog status from Meta API
    const catalogStatus = await getCatalogStatus();

    // Get recent sync logs (last 20)
    const { data: recentSyncs, error: logsError } = await admin
      .from('shop_meta_sync_log')
      .select('*')
      .order('synced_at', { ascending: false })
      .limit(20);

    if (logsError) {
      console.error('Error fetching sync logs:', logsError);
    }

    // Get sync stats from last 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data: statsData, error: statsError } = await admin
      .from('shop_meta_sync_log')
      .select('status')
      .gte('synced_at', oneDayAgo);

    if (statsError) {
      console.error('Error fetching sync stats:', statsError);
    }

    const stats = {
      total: statsData?.length || 0,
      success: statsData?.filter((log) => log.status === 'success').length || 0,
      errors: statsData?.filter((log) => log.status === 'error').length || 0,
    };

    return NextResponse.json({
      catalog: catalogStatus,
      recentSyncs: (recentSyncs || []) as MetaSyncLog[],
      stats,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to fetch sync status', message: errorMessage },
      { status: 500 }
    );
  }
}

/**
 * POST: Sync all active products to Meta catalog
 */
export async function POST() {
  const auth = await verifyAdmin();
  if (!auth.authorized) return auth.error;

  // Check if Meta API is configured
  if (!isConfigured()) {
    return NextResponse.json(
      {
        error: 'Meta Commerce API not configured',
        message: 'Set META_ACCESS_TOKEN and META_CATALOG_ID environment variables',
      },
      { status: 503 }
    );
  }

  const admin = createSupabaseAdminClient();

  try {
    // Fetch all active products with category join
    const { data: products, error: fetchError } = await admin
      .from('shop_products')
      .select(`
        *,
        category:shop_categories(*)
      `)
      .eq('status', 'active');

    if (fetchError) {
      return NextResponse.json(
        { error: 'Failed to fetch products', message: fetchError.message },
        { status: 500 }
      );
    }

    if (!products || products.length === 0) {
      return NextResponse.json({
        success: true,
        synced: 0,
        errors: [],
        message: 'No active products to sync',
      });
    }

    // Batch sync all products
    const result = await batchSync(products as ShopProduct[]);

    // Log each product sync attempt
    const syncTime = new Date().toISOString();
    const logEntries: Array<{
      product_id: string;
      action: string;
      status: string;
      error_message: string | null;
      synced_at: string;
    }> = [];

    // Track successfully synced products for updating meta_product_id
    const successfulSyncs: Array<{ productId: string; metaProductId: string }> = [];

    // Process successful syncs
    products.forEach((product) => {
      const hasError = result.errors.find((e) => e.productId === product.id);
      if (!hasError) {
        logEntries.push({
          product_id: product.id,
          action: product.meta_product_id ? 'update' : 'create',
          status: 'success',
          error_message: null,
          synced_at: syncTime,
        });

        // For individual sync to get meta_product_id (if creating new)
        if (!product.meta_product_id) {
          // We'll need to sync individually to get the ID
          // This is a limitation of batch API - it doesn't return individual IDs
          // For now, we'll mark it as synced but won't have the meta_product_id
          // A follow-up improvement would be to use individual syncs for new products
        }
      }
    });

    // Process errors
    result.errors.forEach((error) => {
      logEntries.push({
        product_id: error.productId,
        action: 'sync',
        status: 'error',
        error_message: error.error,
        synced_at: syncTime,
      });
    });

    // Insert sync logs
    const { error: logError } = await admin
      .from('shop_meta_sync_log')
      .insert(logEntries);

    if (logError) {
      console.error('Error inserting sync logs:', logError);
    }

    // Update meta_synced_at for successfully synced products
    const successfulProductIds = products
      .map((p) => p.id)
      .filter((id) => !result.errors.find((e) => e.productId === id));

    if (successfulProductIds.length > 0) {
      const { error: updateError } = await admin
        .from('shop_products')
        .update({ meta_synced_at: syncTime })
        .in('id', successfulProductIds);

      if (updateError) {
        console.error('Error updating meta_synced_at:', updateError);
      }
    }

    return NextResponse.json({
      success: true,
      synced: result.synced,
      errors: result.errors,
      totalProducts: products.length,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Sync failed', message: errorMessage },
      { status: 500 }
    );
  }
}
