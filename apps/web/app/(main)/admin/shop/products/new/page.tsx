'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShopCategory, ShopProduct } from '@/lib/shop/types';
import { ProductForm } from '@/components/admin-shop/product-form';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function AdminShopProductNewPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<ShopCategory[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/shop/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleSubmit = async (data: Partial<ShopProduct>) => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/shop/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      router.push('/admin/shop/products');
    } catch (error) {
      console.error('Create error:', error);
      alert('Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <Link href="/admin" className="hover:text-[#0fbabd]">
          Admin
        </Link>
        <span>/</span>
        <Link href="/admin/shop" className="hover:text-[#0fbabd]">
          Shop
        </Link>
        <span>/</span>
        <Link href="/admin/shop/products" className="hover:text-[#0fbabd]">
          Products
        </Link>
        <span>/</span>
        <span className="text-slate-900">New</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Add New Product</h1>
        <p className="text-slate-600 mt-2">
          Create a new product for your construction marketplace
        </p>
      </div>

      {/* Form */}
      <Card className="p-6 bg-white rounded-2xl shadow-float">
        <ProductForm
          categories={categories}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </Card>
    </div>
  );
}
