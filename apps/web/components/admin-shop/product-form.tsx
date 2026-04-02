'use client';

import { useState } from 'react';
import { ShopProduct, ShopCategory } from '@/lib/shop/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ImageUploader } from './image-uploader';

interface ProductFormProps {
  product?: ShopProduct;
  categories: ShopCategory[];
  onSubmit: (data: Partial<ShopProduct>) => void;
  loading?: boolean;
}

export function ProductForm({
  product,
  categories,
  onSubmit,
  loading,
}: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    slug: product?.slug || '',
    description: product?.description ?? '',
    short_description: product?.short_description ?? '',
    category_id: product?.category_id ?? '',
    price_cents: product?.price_cents || 0,
    compare_at_cents: product?.compare_at_cents ?? 0,
    currency: product?.currency || 'CAD',
    stock_status: product?.stock_status || 'in_stock',
    status: product?.status || 'draft',
    featured: product?.featured || false,
    tags: product?.tags || [],
    alibaba_url: product?.alibaba_url ?? '',
    images: product?.images || [],
  });

  const [tagInput, setTagInput] = useState('');

  const handleChange = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      handleChange('tags', [...formData.tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    handleChange(
      'tags',
      formData.tags.filter((t) => t !== tag)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="pricing">Pricing & Stock</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="sourcing">Sourcing</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4 mt-6">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Stainless Steel Soap Holder — Suction Cup"
              required
            />
          </div>

          <div>
            <Label htmlFor="slug">Slug (URL)</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => handleChange('slug', e.target.value)}
              placeholder="stainless-steel-soap-holder-suction-cup"
              required
            />
          </div>

          <div>
            <Label htmlFor="short_description">Short Description</Label>
            <Textarea
              id="short_description"
              value={formData.short_description}
              onChange={(e) => handleChange('short_description', e.target.value)}
              placeholder="Wall-mounted soap dish with powerful suction cup. No drilling, no damage."
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="description">Full Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Detailed product description..."
              rows={6}
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category_id}
              onValueChange={(value) => handleChange('category_id', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2 mb-2">
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add tag"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button type="button" onClick={handleAddTag} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer hover:bg-red-100"
                  onClick={() => handleRemoveTag(tag)}
                >
                  {tag} ✕
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => handleChange('featured', checked)}
            />
            <Label htmlFor="featured">Featured Product</Label>
          </div>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4 mt-6">
          <div>
            <Label htmlFor="price_cents">Price (cents)</Label>
            <Input
              id="price_cents"
              type="number"
              value={formData.price_cents}
              onChange={(e) =>
                handleChange('price_cents', parseInt(e.target.value) || 0)
              }
              placeholder="1499"
            />
            <p className="text-sm text-slate-500 mt-1">
              ${(formData.price_cents / 100).toFixed(2)}
            </p>
          </div>

          <div>
            <Label htmlFor="compare_at_cents">Compare at Price (cents)</Label>
            <Input
              id="compare_at_cents"
              type="number"
              value={formData.compare_at_cents}
              onChange={(e) =>
                handleChange('compare_at_cents', parseInt(e.target.value) || 0)
              }
              placeholder="2499"
            />
            <p className="text-sm text-slate-500 mt-1">
              {formData.compare_at_cents > 0
                ? `$${(formData.compare_at_cents / 100).toFixed(2)}`
                : 'No comparison price'}
            </p>
          </div>

          <div>
            <Label htmlFor="currency">Currency</Label>
            <Select
              value={formData.currency}
              onValueChange={(value) => handleChange('currency', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CAD">CAD</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="stock_status">Stock Status</Label>
            <Select
              value={formData.stock_status}
              onValueChange={(value) => handleChange('stock_status', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in_stock">In Stock</SelectItem>
                <SelectItem value="low_stock">Low Stock</SelectItem>
                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="status">Product Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>

        <TabsContent value="images" className="mt-6">
          {product?.id ? (
            <ImageUploader
              productId={product.id}
              images={formData.images}
              onImagesChange={(images) => handleChange('images', images)}
            />
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-lg border-2 border-dashed">
              <p className="text-slate-600">
                Save the product first to upload images
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="sourcing" className="space-y-4 mt-6">
          <div>
            <Label htmlFor="alibaba_url">Alibaba / AliExpress URL</Label>
            <Input
              id="alibaba_url"
              type="url"
              value={formData.alibaba_url}
              onChange={(e) => handleChange('alibaba_url', e.target.value)}
              placeholder="https://www.aliexpress.com/item/..."
            />
            <p className="text-sm text-slate-500 mt-1">
              Internal sourcing link — not shown to customers
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4 pt-6 border-t">
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
        </Button>
      </div>
    </form>
  );
}
