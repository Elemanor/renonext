'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface AEProduct {
  product_id: number;
  product_title: string;
  product_main_image_url: string;
  product_small_image_urls?: { string: string[] };
  product_detail_url: string;
  target_sale_price?: string;
  target_sale_price_currency?: string;
  target_original_price?: string;
  target_original_price_currency?: string;
  sale_price?: string;
  original_price?: string;
  app_sale_price?: string;
  discount?: string;
  evaluate_rate?: string;
  lastest_volume?: string;
  first_level_category_name?: string;
  second_level_category_name?: string;
}

interface ShopCategory {
  id: string;
  name: string;
  slug: string;
}

interface SearchResult {
  current_page_no: number;
  total_page_no: number;
  total_record_count: number;
  products: { product: AEProduct[] };
}

export default function AdminAliExpressPage() {
  const [keywords, setKeywords] = useState('');
  const [mode, setMode] = useState<'search' | 'hot'>('search');
  const [sort, setSort] = useState('LAST_VOLUME_DESC');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult | null>(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');

  // Import state
  const [categories, setCategories] = useState<ShopCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [importing, setImporting] = useState<Record<number, 'loading' | 'done' | 'error'>>({});
  const [importedIds, setImportedIds] = useState<Set<string>>(new Set());

  // Fetch shop categories on mount
  useEffect(() => {
    fetch('/api/admin/shop/categories')
      .then((r) => r.json())
      .then((data) => {
        setCategories(data);
        if (data.length > 0) setSelectedCategory(data[0].id);
      })
      .catch(() => {});
  }, []);

  const doSearch = useCallback(async (pageNo = 1) => {
    setLoading(true);
    setError('');
    setPage(pageNo);

    try {
      const params = new URLSearchParams({
        mode,
        page: String(pageNo),
        page_size: '20',
        sort,
      });
      if (mode === 'search' && keywords) {
        params.set('keywords', keywords);
      }

      const res = await fetch(`/api/admin/shop/aliexpress/search?${params}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Search failed');
        setResults(null);
      } else {
        setResults(data);
      }
    } catch (err) {
      setError('Network error');
      setResults(null);
    } finally {
      setLoading(false);
    }
  }, [keywords, mode, sort]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    doSearch(1);
  };

  const handleImport = async (product: AEProduct) => {
    if (!selectedCategory) {
      setError('Select a category first');
      return;
    }

    setImporting((prev) => ({ ...prev, [product.product_id]: 'loading' }));

    try {
      const res = await fetch('/api/admin/shop/aliexpress/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product,
          category_id: selectedCategory,
          status: 'draft',
        }),
      });

      const data = await res.json();

      if (res.status === 409) {
        setImporting((prev) => ({ ...prev, [product.product_id]: 'done' }));
        setImportedIds((prev) => new Set(prev).add(String(product.product_id)));
        return;
      }

      if (!res.ok) {
        setImporting((prev) => ({ ...prev, [product.product_id]: 'error' }));
        return;
      }

      setImporting((prev) => ({ ...prev, [product.product_id]: 'done' }));
      setImportedIds((prev) => new Set(prev).add(String(product.product_id)));
    } catch {
      setImporting((prev) => ({ ...prev, [product.product_id]: 'error' }));
    }
  };

  const products = results?.products?.product || [];
  const totalPages = results?.total_page_no || 0;

  const getPrice = (p: AEProduct) => p.target_sale_price || p.sale_price || p.app_sale_price || '';
  const getOriginal = (p: AEProduct) => p.target_original_price || p.original_price || '';

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <Link href="/admin" className="hover:text-[#0fbabd]">Admin</Link>
        <span>/</span>
        <Link href="/admin/shop" className="hover:text-[#0fbabd]">Shop</Link>
        <span>/</span>
        <span className="text-slate-900">AliExpress</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">AliExpress Product Search</h1>
        <p className="text-slate-600 mt-2">
          Search AliExpress for products to import into your shop. Products are imported as drafts.
        </p>
      </div>

      {/* Search Form */}
      <Card className="p-6 bg-white rounded-2xl shadow-float">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Mode Toggle */}
            <div className="flex border rounded-lg overflow-hidden shrink-0">
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  mode === 'search'
                    ? 'bg-[#0fbabd] text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-50'
                }`}
                onClick={() => setMode('search')}
              >
                <span className="material-symbols-outlined text-base align-middle mr-1">search</span>
                Search
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  mode === 'hot'
                    ? 'bg-[#0fbabd] text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-50'
                }`}
                onClick={() => setMode('hot')}
              >
                <span className="material-symbols-outlined text-base align-middle mr-1">local_fire_department</span>
                Hot Products
              </button>
            </div>

            {/* Keywords */}
            {mode === 'search' && (
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Search keywords (e.g. no drill shower caddy, tension rod shelf)..."
                className="flex-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0fbabd]"
              />
            )}

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0fbabd] shrink-0"
            >
              <option value="LAST_VOLUME_DESC">Most Sold</option>
              <option value="LAST_VOLUME_ASC">Least Sold</option>
              <option value="SALE_PRICE_ASC">Price: Low → High</option>
              <option value="SALE_PRICE_DESC">Price: High → Low</option>
            </select>

            <Button type="submit" disabled={loading || (mode === 'search' && !keywords)}>
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </div>

          {/* Import Target Category */}
          <div className="flex items-center gap-3 pt-2 border-t">
            <label className="text-sm font-medium text-slate-700 whitespace-nowrap">
              Import to category:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0fbabd] min-w-[220px]"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </Card>

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          <span className="material-symbols-outlined text-base align-middle mr-1">error</span>
          {error}
        </div>
      )}

      {/* Results Count */}
      {results && (
        <div className="text-sm text-slate-600">
          Found {results.total_record_count || 0} products
          {totalPages > 1 && ` — Page ${page} of ${totalPages}`}
        </div>
      )}

      {/* Product Grid */}
      {products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => {
            const price = getPrice(product);
            const original = getOriginal(product);
            const status = importing[product.product_id];
            const isImported = importedIds.has(String(product.product_id));

            return (
              <Card key={product.product_id} className="overflow-hidden bg-white rounded-2xl shadow-float hover:shadow-float-hover transition-shadow">
                {/* Image */}
                <div className="aspect-square bg-slate-100 relative overflow-hidden">
                  {product.product_main_image_url ? (
                    <img
                      src={product.product_main_image_url}
                      alt={product.product_title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-5xl text-slate-300">image</span>
                    </div>
                  )}

                  {/* Volume badge */}
                  {product.lastest_volume && (
                    <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                      {product.lastest_volume} sold
                    </div>
                  )}

                  {/* Discount badge */}
                  {product.discount && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      -{product.discount}%
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4 space-y-3">
                  <h3 className="text-sm font-medium text-slate-900 line-clamp-2 leading-snug">
                    {product.product_title}
                  </h3>

                  {/* Category */}
                  {product.second_level_category_name && (
                    <p className="text-xs text-slate-500">{product.second_level_category_name}</p>
                  )}

                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    {price && (
                      <span className="text-lg font-bold text-slate-900">
                        ${price}
                      </span>
                    )}
                    {original && original !== price && (
                      <span className="text-sm text-slate-400 line-through">
                        ${original}
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  {product.evaluate_rate && (
                    <div className="flex items-center gap-1 text-xs text-amber-600">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      {product.evaluate_rate} rating
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      disabled={status === 'loading' || isImported}
                      onClick={() => handleImport(product)}
                    >
                      {isImported ? (
                        <>
                          <span className="material-symbols-outlined text-sm mr-1">check</span>
                          Imported
                        </>
                      ) : status === 'loading' ? (
                        'Importing...'
                      ) : status === 'error' ? (
                        'Retry Import'
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-sm mr-1">download</span>
                          Import
                        </>
                      )}
                    </Button>
                    <a
                      href={product.product_detail_url || `https://www.aliexpress.com/item/${product.product_id}.html`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-3 py-1 border rounded-lg text-sm text-slate-600 hover:bg-slate-50"
                    >
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </a>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {results && products.length === 0 && (
        <Card className="p-12 text-center bg-white rounded-2xl shadow-float">
          <span className="material-symbols-outlined text-5xl text-slate-300">search_off</span>
          <p className="text-slate-600 mt-4">No products found. Try different keywords or check Hot Products.</p>
        </Card>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1 || loading}
            onClick={() => doSearch(page - 1)}
          >
            Previous
          </Button>
          <span className="flex items-center px-4 text-sm text-slate-600">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages || loading}
            onClick={() => doSearch(page + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {/* Suggested Searches for Renters */}
      {!results && (
        <Card className="p-6 bg-white rounded-2xl shadow-float">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            <span className="material-symbols-outlined text-xl align-middle mr-2">lightbulb</span>
            Suggested Searches (Renter Products)
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              'no drill shower caddy',
              'adhesive hooks renter',
              'tension rod shelf',
              'peel and stick backsplash',
              'magnetic knife holder',
              'over door organizer',
              'removable wallpaper',
              'LED strip lights adhesive',
              'no drill curtain rod',
              'fridge organizer bins',
              'under shelf basket',
              'suction cup towel bar',
              'command strip hooks',
              'floating shelf no drill',
              'door back storage',
              'cable management no drill',
              'no drill soap dispenser',
              'renter friendly kitchen',
              'adhesive toilet paper holder',
              'no damage picture hanging',
            ].map((term) => (
              <button
                key={term}
                onClick={() => {
                  setKeywords(term);
                  setMode('search');
                }}
                className="px-3 py-1.5 text-sm bg-slate-100 hover:bg-[#0fbabd]/10 hover:text-[#0fbabd] rounded-full transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
