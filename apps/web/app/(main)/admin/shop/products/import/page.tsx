'use client';

import { useRouter } from 'next/navigation';
import { ImportWizard } from '@/components/admin-shop/import-wizard';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function AdminShopProductImportPage() {
  const router = useRouter();

  const handleComplete = () => {
    router.push('/admin/shop/products');
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
        <span className="text-slate-900">Import</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Import Products</h1>
        <p className="text-slate-600 mt-2">
          Bulk import products from JSON file or paste data
        </p>
      </div>

      {/* Import Wizard */}
      <Card className="p-8 bg-white rounded-2xl shadow-float">
        <ImportWizard onComplete={handleComplete} />
      </Card>
    </div>
  );
}
