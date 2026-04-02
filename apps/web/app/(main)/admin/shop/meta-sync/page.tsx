'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MetaSyncLog } from '@/lib/shop/types';
import Link from 'next/link';

interface CatalogStatus {
  productCount: number;
  status: string;
  lastUpdated: string | null;
}

interface SyncStats {
  total: number;
  success: number;
  errors: number;
}

interface SyncData {
  catalog: CatalogStatus;
  recentSyncs: MetaSyncLog[];
  stats: SyncStats;
}

export default function MetaSyncPage() {
  const [data, setData] = useState<SyncData | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [syncResult, setSyncResult] = useState<{
    success: boolean;
    synced: number;
    errors: Array<{ productId: string; error: string }>;
  } | null>(null);

  useEffect(() => {
    fetchSyncStatus();
  }, []);

  const fetchSyncStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/admin/shop/meta-sync');
      const result = await response.json();

      if (!response.ok) {
        setError(result.message || result.error || 'Failed to fetch sync status');
        return;
      }

      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    if (!confirm('Sync all active products to Facebook Shops? This may take a few minutes.')) {
      return;
    }

    try {
      setSyncing(true);
      setSyncResult(null);
      setError(null);

      const response = await fetch('/api/admin/shop/meta-sync', {
        method: 'POST',
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.message || result.error || 'Sync failed');
        return;
      }

      setSyncResult(result);
      // Refresh status after sync
      await fetchSyncStatus();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
    } finally {
      setSyncing(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-4 border-[#0fbabd] border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-600">Loading sync status...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <Link href="/admin" className="hover:text-[#0fbabd]">
          Admin
        </Link>
        <span>/</span>
        <Link href="/admin/shop" className="hover:text-[#0fbabd]">
          Shop Management
        </Link>
        <span>/</span>
        <span className="text-slate-900">Meta Commerce Sync</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Meta Commerce Sync</h1>
          <p className="text-slate-600 mt-2">
            Sync your products to Facebook Shops catalog
          </p>
        </div>
        <Button
          onClick={handleSync}
          disabled={syncing}
          size="lg"
          className="gap-2"
        >
          {syncing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Syncing...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined">sync</span>
              <span>Sync Now</span>
            </>
          )}
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-red-600">error</span>
            <div className="flex-1">
              <p className="font-medium text-red-900">Error</p>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Sync Result */}
      {syncResult && (
        <Card className="p-6 bg-green-50 border-green-200">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-green-600 text-3xl">
              check_circle
            </span>
            <div className="flex-1">
              <p className="font-medium text-green-900 text-lg">Sync Complete</p>
              <p className="text-sm text-green-700 mt-1">
                Successfully synced {syncResult.synced} products to Facebook Shops
              </p>
              {syncResult.errors.length > 0 && (
                <div className="mt-4 p-4 bg-white rounded-lg">
                  <p className="font-medium text-red-900 mb-2">
                    {syncResult.errors.length} products failed to sync:
                  </p>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {syncResult.errors.map((err, i) => (
                      <div key={i} className="text-sm text-red-700">
                        <span className="font-mono text-xs">{err.productId}</span>:{' '}
                        {err.error}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Stats Grid */}
      {data && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Catalog Products */}
            <Card className="p-6 bg-white rounded-2xl shadow-float">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-blue-600"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    storefront
                  </span>
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-900">
                {data.catalog.productCount}
              </p>
              <p className="text-sm text-slate-600 mt-1">Products in Catalog</p>
            </Card>

            {/* Total Syncs (24h) */}
            <Card className="p-6 bg-white rounded-2xl shadow-float">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-purple-600"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    sync
                  </span>
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-900">{data.stats.total}</p>
              <p className="text-sm text-slate-600 mt-1">Syncs (Last 24h)</p>
            </Card>

            {/* Success Rate */}
            <Card className="p-6 bg-white rounded-2xl shadow-float">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-green-600"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-900">
                {data.stats.success}
              </p>
              <p className="text-sm text-slate-600 mt-1">Successful Syncs</p>
            </Card>

            {/* Errors */}
            <Card className="p-6 bg-white rounded-2xl shadow-float">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-red-600"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    error
                  </span>
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-900">{data.stats.errors}</p>
              <p className="text-sm text-slate-600 mt-1">Failed Syncs</p>
            </Card>
          </div>

          {/* Catalog Info */}
          <Card className="p-6 bg-white rounded-2xl shadow-float">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Catalog Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-slate-600 mb-1">Catalog Name</p>
                <p className="font-medium text-slate-900">{data.catalog.status}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Products</p>
                <p className="font-medium text-slate-900">
                  {data.catalog.productCount}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Last Updated</p>
                <p className="font-medium text-slate-900">
                  {data.catalog.lastUpdated
                    ? new Date(data.catalog.lastUpdated).toLocaleString()
                    : 'Never'}
                </p>
              </div>
            </div>
          </Card>

          {/* Recent Sync Logs */}
          <Card className="p-6 bg-white rounded-2xl shadow-float">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Sync Activity</h2>
            {data.recentSyncs.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-lg">
                <span className="material-symbols-outlined text-5xl text-slate-400 mb-4">
                  sync
                </span>
                <p className="text-slate-600">No sync activity yet</p>
                <p className="text-sm text-slate-500 mt-2">
                  Click Sync Now to sync your products to Facebook Shops
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {data.recentSyncs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          log.status === 'success'
                            ? 'bg-green-100'
                            : 'bg-red-100'
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined ${
                            log.status === 'success'
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {log.status === 'success' ? 'check_circle' : 'error'}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">
                          {log.action === 'create' ? 'Created' : 'Updated'} Product
                        </p>
                        <p className="text-sm text-slate-500 font-mono">
                          {log.product_id || 'N/A'}
                        </p>
                        {log.error_message && (
                          <p className="text-sm text-red-600 mt-1">
                            {log.error_message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={log.status === 'success' ? 'default' : 'destructive'}
                      >
                        {log.status}
                      </Badge>
                      <p className="text-sm text-slate-500 mt-1">
                        {new Date(log.synced_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </>
      )}
    </div>
  );
}
