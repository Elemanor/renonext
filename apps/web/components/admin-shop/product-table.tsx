'use client';

import { ShopProduct } from '@/lib/shop/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';

interface ProductTableProps {
  products: ShopProduct[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'draft':
        return 'secondary';
      case 'archived':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const getStockBadgeClass = (status: string) => {
    switch (status) {
      case 'in_stock':
        return 'bg-green-50 text-green-700';
      case 'low_stock':
        return 'bg-amber-50 text-amber-700';
      case 'out_of_stock':
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-slate-50 text-slate-700';
    }
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-50 rounded-lg">
        <p className="text-slate-600">No products found</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden border bg-white shadow-float">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                {(product.thumbnail_url || product.images[0]) ? (
                  <div className="relative w-12 h-12 rounded overflow-hidden bg-slate-100">
                    <Image
                      src={product.thumbnail_url || product.images[0] || '/placeholder.svg'}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded bg-slate-100 flex items-center justify-center">
                    <span className="material-symbols-outlined text-slate-400 text-xl">
                      image
                    </span>
                  </div>
                )}
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium text-slate-900">{product.name}</p>
                  <p className="text-sm text-slate-500">/{product.slug}</p>
                </div>
              </TableCell>
              <TableCell>
                {product.category ? (
                  <span className="text-sm text-slate-600">
                    {product.category.name}
                  </span>
                ) : (
                  <span className="text-sm text-slate-400">Uncategorized</span>
                )}
              </TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(product.status)}>
                  {product.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={getStockBadgeClass(product.stock_status)}
                >
                  {product.stock_status.replace('_', ' ')}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(product.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDelete(product.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
