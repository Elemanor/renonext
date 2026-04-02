'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShopCategory, ShopProduct } from '@/lib/shop/types';
import { ProductForm } from '@/components/admin-shop/product-form';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function AdminShopProductEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [product, setProduct] = useState<ShopProduct | null>(null);
  const [categories, setCategories] = useState<ShopCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [productRes, categoriesRes] = await Promise.all([
        fetch(`/api/admin/shop/products/${id}`),
        fetch('/api/admin/shop/categories'),
      ]);

      const productData = await productRes.json();
      const categoriesData = await categoriesRes.json();

      setProduct(productData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      alert('Failed to load product');
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (data: Partial<ShopProduct>) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/shop/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const updatedProduct = await response.json();
      setProduct(updatedProduct);
      alert('Product updated successfully');
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center py-12">
          <p className="text-slate-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-8">
        <div className="text-center py-12">
          <p className="text-slate-600">Product not found</p>
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
          Shop
        </Link>
        <span>/</span>
        <Link href="/admin/shop/products" className="hover:text-[#0fbabd]">
          Products
        </Link>
        <span>/</span>
        <span className="text-slate-900">{product.name}</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Edit Product</h1>
        <p className="text-slate-600 mt-2">{product.name}</p>
      </div>

      {/* Form */}
      <Card className="p-6 bg-white rounded-2xl shadow-float">
        <ProductForm
          product={product}
          categories={categories}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </Card>
    </div>
  );
}
