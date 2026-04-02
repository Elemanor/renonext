'use client';

import { useEffect, useState } from 'react';
import { ShopCategory } from '@/lib/shop/types';
import { CategoryManager } from '@/components/admin-shop/category-manager';
import Link from 'next/link';

export default function AdminShopCategoriesPage() {
  const [categories, setCategories] = useState<ShopCategory[]>([]);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (category: Partial<ShopCategory>) => {
    try {
      const isUpdate = !!category.id;
      const url = isUpdate
        ? `/api/admin/shop/categories/${category.id}`
        : '/api/admin/shop/categories';
      const method = isUpdate ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
      });

      if (!response.ok) {
        throw new Error('Failed to save category');
      }

      fetchCategories();
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save category');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/shop/categories/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete category');
      }

      fetchCategories();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete category');
    }
  };

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    const index = categories.findIndex((c) => c.id === id);
    if (index === -1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= categories.length) return;

    const newCategories = [...categories];
    const [moved] = newCategories.splice(index, 1);
    newCategories.splice(targetIndex, 0, moved);

    // Update sort_order for all affected categories
    const updates = newCategories.map((cat, idx) => ({
      id: cat.id,
      sort_order: idx,
    }));

    setCategories(newCategories);

    try {
      // Update both categories
      await Promise.all(
        updates.slice(Math.min(index, targetIndex), Math.max(index, targetIndex) + 1).map((update) =>
          fetch(`/api/admin/shop/categories/${update.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sort_order: update.sort_order }),
          })
        )
      );
    } catch (error) {
      console.error('Reorder error:', error);
      alert('Failed to reorder category');
      fetchCategories();
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
        <Link href="/admin/shop" className="hover:text-[#0fbabd]">
          Shop
        </Link>
        <span>/</span>
        <span className="text-slate-900">Categories</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Shop Categories</h1>
        <p className="text-slate-600 mt-2">
          Organize your products into categories for easier browsing
        </p>
      </div>

      {/* Category Manager */}
      <CategoryManager
        categories={categories}
        onSave={handleSave}
        onDelete={handleDelete}
        onReorder={handleReorder}
      />
    </div>
  );
}
