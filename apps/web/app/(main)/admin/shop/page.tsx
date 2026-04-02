'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShopProduct, ShopCategory } from '@/lib/shop/types';
import { formatPrice } from '@/lib/shop/helpers';
import Link from 'next/link';

interface Stats {
  totalProducts: number;
  activeProducts: number;
  draftProducts: number;
  totalCategories: number;
}

export default function AdminShopDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    activeProducts: 0,
    draftProducts: 0,
    totalCategories: 0,
  });
  const [recentProducts, setRecentProducts] = useState<ShopProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch products
      const productsRes = await fetch('/api/admin/shop/products?limit=10');
      const productsData = await productsRes.json();

      // Fetch all products for stats
      const allProductsRes = await fetch('/api/admin/shop/products?limit=1000');
      const allProductsData = await allProductsRes.json();

      // Fetch categories
      const categoriesRes = await fetch('/api/admin/shop/categories');
      const categoriesData = await categoriesRes.json();

      setRecentProducts(productsData.products || []);

      const products = allProductsData.products || [];
      setStats({
        totalProducts: products.length,
        activeProducts: products.filter((p: ShopProduct) => p.status === 'active')
          .length,
        draftProducts: products.filter((p: ShopProduct) => p.status === 'draft')
          .length,
        totalCategories: categoriesData.length,
      });
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center py-12">
          <p className="text-slate-600">Loading...</p>
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
        <span className="text-slate-900">Shop Management</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Shop Management</h1>
        <p className="text-slate-600 mt-2">
          Manage your construction marketplace products and categories
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-white rounded-2xl shadow-float">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#0fbabd]/10 flex items-center justify-center">
              <span
                className="material-symbols-outlined text-[#0fbabd]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                inventory_2
              </span>
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.totalProducts}</p>
          <p className="text-sm text-slate-600 mt-1">Total Products</p>
        </Card>

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
            {stats.activeProducts}
          </p>
          <p className="text-sm text-slate-600 mt-1">Active Products</p>
        </Card>

        <Card className="p-6 bg-white rounded-2xl shadow-float">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <span
                className="material-symbols-outlined text-amber-600"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                draft
              </span>
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.draftProducts}</p>
          <p className="text-sm text-slate-600 mt-1">Draft Products</p>
        </Card>

        <Card className="p-6 bg-white rounded-2xl shadow-float">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <span
                className="material-symbols-outlined text-purple-600"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                category
              </span>
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">
            {stats.totalCategories}
          </p>
          <p className="text-sm text-slate-600 mt-1">Categories</p>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6 bg-white rounded-2xl shadow-float">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button
            className="h-auto py-6 flex flex-col items-center gap-2"
            onClick={() => router.push('/admin/shop/products/new')}
          >
            <span className="material-symbols-outlined text-2xl">add</span>
            <span>Add Product</span>
          </Button>

          <Button
            className="h-auto py-6 flex flex-col items-center gap-2 bg-orange-500 hover:bg-orange-600"
            onClick={() => router.push('/admin/shop/aliexpress')}
          >
            <span className="material-symbols-outlined text-2xl">travel_explore</span>
            <span>Search AliExpress</span>
          </Button>

          <Button
            className="h-auto py-6 flex flex-col items-center gap-2 bg-emerald-600 hover:bg-emerald-700"
            onClick={() => router.push('/admin/shop/pricing')}
          >
            <span className="material-symbols-outlined text-2xl">price_check</span>
            <span>Pricing Research</span>
          </Button>

          <Button
            className="h-auto py-6 flex flex-col items-center gap-2"
            variant="outline"
            onClick={() => router.push('/admin/shop/categories')}
          >
            <span className="material-symbols-outlined text-2xl">category</span>
            <span>Manage Categories</span>
          </Button>

          <Button
            className="h-auto py-6 flex flex-col items-center gap-2"
            variant="outline"
            onClick={() => router.push('/admin/shop/products/import')}
          >
            <span className="material-symbols-outlined text-2xl">upload_file</span>
            <span>Import Products</span>
          </Button>

          <Button
            className="h-auto py-6 flex flex-col items-center gap-2"
            variant="outline"
            onClick={() => router.push('/admin/shop/meta-sync')}
          >
            <span className="material-symbols-outlined text-2xl">sync</span>
            <span>Meta Sync</span>
          </Button>

          <Button
            className="h-auto py-6 flex flex-col items-center gap-2"
            variant="outline"
            onClick={() => router.push('/admin/shop/products')}
          >
            <span className="material-symbols-outlined text-2xl">view_list</span>
            <span>View All Products</span>
          </Button>
        </div>
      </Card>

      {/* Recent Products */}
      <Card className="p-6 bg-white rounded-2xl shadow-float">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900">Recent Products</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/admin/shop/products')}
          >
            View All
          </Button>
        </div>

        {recentProducts.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-lg">
            <span className="material-symbols-outlined text-5xl text-slate-400 mb-4">
              inventory_2
            </span>
            <p className="text-slate-600">No products yet</p>
            <Button
              className="mt-4"
              onClick={() => router.push('/admin/shop/products/new')}
            >
              Add Your First Product
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {recentProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:border-[#0fbabd] transition-colors cursor-pointer"
                onClick={() => router.push(`/admin/shop/products/${product.id}`)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded bg-slate-100 flex items-center justify-center">
                    <span className="material-symbols-outlined text-slate-400">
                      inventory_2
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{product.name}</p>
                    <p className="text-sm text-slate-500">
                      {product.category?.name || 'Uncategorized'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-900">
                    {formatPrice(product.price_cents, product.currency)}
                  </p>
                  <p className="text-sm text-slate-500">{product.status}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
