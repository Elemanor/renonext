'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ShopProduct {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  price_cents: number;
  tags: string[];
  category?: { name: string; slug: string };
}

interface AEResult {
  product_id: number;
  product_title: string;
  product_main_image_url: string;
  target_sale_price?: string;
  target_original_price?: string;
  sale_price?: string;
  original_price?: string;
  app_sale_price?: string;
  lastest_volume?: string;
  evaluate_rate?: string;
  product_detail_url?: string;
}

interface PricingRow {
  product: ShopProduct;
  aeResults: AEResult[];
  selectedAE: AEResult | null;
  aeCostCAD: number;       // AliExpress sourcing cost in CAD cents
  shippingCAD: number;     // Estimated shipping in CAD cents
  landedCost: number;      // product + shipping
  markup: number;          // multiplier, default 2.5x
  retailPreTax: number;    // landed × markup
  hst: number;             // 13%
  finalPrice: number;      // retail + HST
  margin: number;          // retail - landed
  marginPct: number;       // margin / retail × 100
  loading: boolean;
  searched: boolean;
}

const HST_RATE = 0.13;
const DEFAULT_MARKUP = 2.5;
const DEFAULT_SHIPPING_CAD = 500; // $5.00 estimated flat shipping per item

// Search terms optimized for AliExpress results
const SEARCH_TERMS: Record<string, string> = {
  'suction-cup-shower-caddy-2-tier': 'suction cup shower caddy 2 tier corner',
  'adhesive-towel-bar-stainless-steel': 'adhesive towel bar stainless steel no drill',
  'suction-cup-razor-holder-shower': 'suction cup razor holder shower',
  'adhesive-toilet-paper-holder-matte-black': 'adhesive toilet paper holder matte black',
  'over-door-towel-rack-3-bar': 'over door towel rack 3 bar',
  'suction-cup-magnifying-mirror-10x': 'suction cup magnifying mirror 10x',
  'adhesive-toothbrush-holder-4-slot': 'adhesive toothbrush holder wall mount',
  'shower-door-hooks-stainless-6-pack': 'shower glass door hooks stainless steel',
  'magnetic-knife-strip-adhesive-16-inch': 'magnetic knife strip adhesive wood',
  'over-cabinet-hooks-stainless-6-pack': 'over cabinet door hooks stainless',
  'adhesive-spice-rack-cabinet-door': 'adhesive spice rack cabinet door',
  'under-cabinet-paper-towel-holder-adhesive': 'under cabinet paper towel holder adhesive',
  'suction-cup-sponge-holder-sink': 'suction cup sponge holder sink',
  'magnetic-fridge-side-shelf-spice-rack': 'magnetic fridge side shelf organizer',
  'over-sink-dish-drying-rack-adjustable': 'over sink dish drying rack adjustable',
  'tension-rod-closet-shelf-expandable': 'tension rod shelf expandable closet',
  'over-door-hook-rack-6-hooks': 'over door hook rack 6 hooks',
  'adhesive-cable-clips-desk-20-pack': 'adhesive cable management clips 20 pack',
  'stackable-shelf-risers-kitchen-cabinet': 'stackable shelf riser cabinet organizer',
  'hanging-closet-organizer-6-shelf': 'hanging closet organizer 6 shelf fabric',
  'under-bed-storage-bins-rolling-2-pack': 'under bed storage bins rolling wheels',
  'led-strip-lights-rgb-remote-5m': 'LED strip lights RGB remote 5m USB',
  'adhesive-floating-shelf-acrylic-2-pack': 'adhesive floating shelf acrylic clear',
  'peel-stick-backsplash-tiles-subway-10-pack': 'peel stick backsplash tiles subway 3D',
  'command-strip-picture-ledge-24-inch': 'picture ledge shelf adhesive wood 24',
  'removable-wallpaper-geometric-accent': 'removable wallpaper peel stick geometric',
  'magnetic-photo-frames-fridge-6-pack': 'magnetic photo frame fridge',
};

function calcPricing(aeCostCAD: number, shippingCAD: number, markup: number) {
  const landedCost = aeCostCAD + shippingCAD;
  const retailPreTax = Math.round(landedCost * markup);
  const hst = Math.round(retailPreTax * HST_RATE);
  const finalPrice = retailPreTax + hst;
  const margin = retailPreTax - landedCost;
  const marginPct = retailPreTax > 0 ? Math.round((margin / retailPreTax) * 100) : 0;
  return { landedCost, retailPreTax, hst, finalPrice, margin, marginPct };
}

function formatCAD(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function AdminPricingResearch() {
  const [rows, setRows] = useState<PricingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalMarkup, setGlobalMarkup] = useState(DEFAULT_MARKUP);
  const [globalShipping, setGlobalShipping] = useState(DEFAULT_SHIPPING_CAD);
  const [searchingAll, setSearchingAll] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/shop/products?limit=100');
      const data = await res.json();
      const products: ShopProduct[] = data.products || [];

      setRows(
        products.map((p) => ({
          product: p,
          aeResults: [],
          selectedAE: null,
          aeCostCAD: 0,
          shippingCAD: globalShipping,
          landedCost: 0,
          markup: globalMarkup,
          retailPreTax: 0,
          hst: 0,
          finalPrice: 0,
          margin: 0,
          marginPct: 0,
          loading: false,
          searched: false,
        }))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const searchAE = async (index: number) => {
    const row = rows[index];
    const searchTerm = SEARCH_TERMS[row.product.slug] || row.product.name;

    setRows((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], loading: true };
      return copy;
    });

    try {
      const res = await fetch(
        `/api/admin/shop/aliexpress/search?keywords=${encodeURIComponent(searchTerm)}&page_size=5&sort=LAST_VOLUME_DESC`
      );
      const data = await res.json();
      const aeProducts: AEResult[] = data.products?.product || [];

      setRows((prev) => {
        const copy = [...prev];
        const best = aeProducts[0] || null;
        const aeCostCAD = best
          ? Math.round(
              parseFloat(best.target_sale_price || best.sale_price || best.app_sale_price || '0') * 100
            )
          : 0;
        const pricing = calcPricing(aeCostCAD, copy[index].shippingCAD, copy[index].markup);

        copy[index] = {
          ...copy[index],
          aeResults: aeProducts,
          selectedAE: best,
          aeCostCAD,
          ...pricing,
          loading: false,
          searched: true,
        };
        return copy;
      });
    } catch {
      setRows((prev) => {
        const copy = [...prev];
        copy[index] = { ...copy[index], loading: false, searched: true };
        return copy;
      });
    }
  };

  const searchAll = async () => {
    setSearchingAll(true);
    for (let i = 0; i < rows.length; i++) {
      if (!rows[i].searched) {
        await searchAE(i);
        // Rate limit: 1 request per second
        await new Promise((r) => setTimeout(r, 1200));
      }
    }
    setSearchingAll(false);
  };

  const selectAE = (rowIndex: number, ae: AEResult) => {
    setRows((prev) => {
      const copy = [...prev];
      const aeCostCAD = Math.round(
        parseFloat(ae.target_sale_price || ae.sale_price || ae.app_sale_price || '0') * 100
      );
      const pricing = calcPricing(aeCostCAD, copy[rowIndex].shippingCAD, copy[rowIndex].markup);
      copy[rowIndex] = { ...copy[rowIndex], selectedAE: ae, aeCostCAD, ...pricing };
      return copy;
    });
  };

  const updateMarkup = (index: number, markup: number) => {
    setRows((prev) => {
      const copy = [...prev];
      const pricing = calcPricing(copy[index].aeCostCAD, copy[index].shippingCAD, markup);
      copy[index] = { ...copy[index], markup, ...pricing };
      return copy;
    });
  };

  const updateShipping = (index: number, shippingCAD: number) => {
    setRows((prev) => {
      const copy = [...prev];
      const pricing = calcPricing(copy[index].aeCostCAD, shippingCAD, copy[index].markup);
      copy[index] = { ...copy[index], shippingCAD, ...pricing };
      return copy;
    });
  };

  const applyGlobalMarkup = () => {
    setRows((prev) =>
      prev.map((row) => {
        const pricing = calcPricing(row.aeCostCAD, row.shippingCAD, globalMarkup);
        return { ...row, markup: globalMarkup, ...pricing };
      })
    );
  };

  const applyGlobalShipping = () => {
    setRows((prev) =>
      prev.map((row) => {
        const pricing = calcPricing(row.aeCostCAD, globalShipping, row.markup);
        return { ...row, shippingCAD: globalShipping, ...pricing };
      })
    );
  };

  // Summary stats
  const searchedRows = rows.filter((r) => r.searched && r.selectedAE);
  const totalLanded = searchedRows.reduce((sum, r) => sum + r.landedCost, 0);
  const totalRetail = searchedRows.reduce((sum, r) => sum + r.retailPreTax, 0);
  const totalMargin = searchedRows.reduce((sum, r) => sum + r.margin, 0);
  const avgMarginPct = searchedRows.length > 0
    ? Math.round(searchedRows.reduce((sum, r) => sum + r.marginPct, 0) / searchedRows.length)
    : 0;

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center py-20">
        <p className="text-slate-500">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <Link href="/admin" className="hover:text-[#0fbabd]">Admin</Link>
        <span>/</span>
        <Link href="/admin/shop" className="hover:text-[#0fbabd]">Shop</Link>
        <span>/</span>
        <span className="text-slate-900">Pricing Research</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Pricing Research</h1>
          <p className="text-slate-600 mt-1">
            Compare AliExpress sourcing costs vs retail pricing. HST 13% (Ontario).
          </p>
        </div>
        <Button
          onClick={searchAll}
          disabled={searchingAll}
          className="bg-orange-500 hover:bg-orange-600 shrink-0"
        >
          <span className="material-symbols-outlined text-sm mr-1">travel_explore</span>
          {searchingAll ? `Searching... (${rows.filter((r) => r.searched).length}/${rows.length})` : 'Search All on AliExpress'}
        </Button>
      </div>

      {/* Global Controls */}
      <Card className="p-4 bg-white rounded-2xl shadow-float">
        <div className="flex flex-wrap items-end gap-6">
          <div>
            <label className="text-xs font-medium text-slate-500 block mb-1">Global Markup</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.1"
                min="1"
                max="10"
                value={globalMarkup}
                onChange={(e) => setGlobalMarkup(parseFloat(e.target.value) || 2)}
                className="w-20 px-3 py-1.5 border rounded-lg text-sm"
              />
              <span className="text-sm text-slate-500">×</span>
              <Button size="sm" variant="outline" onClick={applyGlobalMarkup}>
                Apply to All
              </Button>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500 block mb-1">Est. Shipping (CAD)</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="1"
                min="0"
                value={(globalShipping / 100).toFixed(2)}
                onChange={(e) => setGlobalShipping(Math.round(parseFloat(e.target.value || '0') * 100))}
                className="w-24 px-3 py-1.5 border rounded-lg text-sm"
              />
              <Button size="sm" variant="outline" onClick={applyGlobalShipping}>
                Apply to All
              </Button>
            </div>
          </div>

          {/* Summary */}
          {searchedRows.length > 0 && (
            <div className="flex gap-6 ml-auto text-sm">
              <div>
                <span className="text-slate-500">Products Priced:</span>{' '}
                <span className="font-bold">{searchedRows.length}/{rows.length}</span>
              </div>
              <div>
                <span className="text-slate-500">Avg Cost:</span>{' '}
                <span className="font-bold">{formatCAD(Math.round(totalLanded / searchedRows.length))}</span>
              </div>
              <div>
                <span className="text-slate-500">Avg Retail:</span>{' '}
                <span className="font-bold">{formatCAD(Math.round(totalRetail / searchedRows.length))}</span>
              </div>
              <div>
                <span className="text-slate-500">Avg Margin:</span>{' '}
                <span className="font-bold text-green-600">{avgMarginPct}%</span>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-100 text-left">
              <th className="px-3 py-3 font-medium text-slate-700 w-[250px]">Product</th>
              <th className="px-3 py-3 font-medium text-slate-700">AE Source</th>
              <th className="px-3 py-3 font-medium text-slate-700 text-right">AE Cost</th>
              <th className="px-3 py-3 font-medium text-slate-700 text-right">Shipping</th>
              <th className="px-3 py-3 font-medium text-slate-700 text-right">Landed</th>
              <th className="px-3 py-3 font-medium text-slate-700 text-center">Markup</th>
              <th className="px-3 py-3 font-medium text-slate-700 text-right">Retail</th>
              <th className="px-3 py-3 font-medium text-slate-700 text-right">HST</th>
              <th className="px-3 py-3 font-medium text-slate-700 text-right">Customer Price</th>
              <th className="px-3 py-3 font-medium text-slate-700 text-right">Margin</th>
              <th className="px-3 py-3 font-medium text-slate-700 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={row.product.id} className="border-b hover:bg-slate-50">
                {/* Product Name */}
                <td className="px-3 py-3">
                  <div className="font-medium text-slate-900 leading-snug">{row.product.name}</div>
                  <div className="text-xs text-slate-500">{row.product.category?.name}</div>
                </td>

                {/* AE Match */}
                <td className="px-3 py-3">
                  {row.selectedAE ? (
                    <div className="flex items-center gap-2">
                      <img
                        src={row.selectedAE.product_main_image_url}
                        alt=""
                        className="w-10 h-10 rounded object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs leading-snug line-clamp-2">{row.selectedAE.product_title}</p>
                        {row.selectedAE.lastest_volume && (
                          <p className="text-xs text-slate-400">{row.selectedAE.lastest_volume} sold</p>
                        )}
                      </div>
                    </div>
                  ) : row.searched ? (
                    <span className="text-xs text-red-500">No results</span>
                  ) : (
                    <span className="text-xs text-slate-400">Not searched</span>
                  )}
                  {/* Alt choices */}
                  {row.aeResults.length > 1 && (
                    <div className="flex gap-1 mt-1">
                      {row.aeResults.map((ae, i) => (
                        <button
                          key={ae.product_id}
                          onClick={() => selectAE(idx, ae)}
                          className={`w-6 h-6 rounded text-xs ${
                            row.selectedAE?.product_id === ae.product_id
                              ? 'bg-[#0fbabd] text-white'
                              : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                  )}
                </td>

                {/* AE Cost */}
                <td className="px-3 py-3 text-right font-mono">
                  {row.aeCostCAD > 0 ? (
                    <span className="text-blue-600">{formatCAD(row.aeCostCAD)}</span>
                  ) : '—'}
                </td>

                {/* Shipping */}
                <td className="px-3 py-3 text-right">
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={(row.shippingCAD / 100).toFixed(2)}
                    onChange={(e) => updateShipping(idx, Math.round(parseFloat(e.target.value || '0') * 100))}
                    className="w-16 px-1 py-0.5 border rounded text-xs text-right"
                  />
                </td>

                {/* Landed Cost */}
                <td className="px-3 py-3 text-right font-mono">
                  {row.landedCost > 0 ? formatCAD(row.landedCost) : '—'}
                </td>

                {/* Markup */}
                <td className="px-3 py-3 text-center">
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="10"
                    value={row.markup}
                    onChange={(e) => updateMarkup(idx, parseFloat(e.target.value) || 2)}
                    className="w-14 px-1 py-0.5 border rounded text-xs text-center"
                  />
                </td>

                {/* Retail */}
                <td className="px-3 py-3 text-right font-mono">
                  {row.retailPreTax > 0 ? formatCAD(row.retailPreTax) : '—'}
                </td>

                {/* HST */}
                <td className="px-3 py-3 text-right font-mono text-slate-500">
                  {row.hst > 0 ? formatCAD(row.hst) : '—'}
                </td>

                {/* Customer Price */}
                <td className="px-3 py-3 text-right font-mono font-bold">
                  {row.finalPrice > 0 ? formatCAD(row.finalPrice) : '—'}
                </td>

                {/* Margin */}
                <td className="px-3 py-3 text-right">
                  {row.margin > 0 ? (
                    <div>
                      <span className="font-mono text-green-600">{formatCAD(row.margin)}</span>
                      <span className="text-xs text-slate-400 ml-1">({row.marginPct}%)</span>
                    </div>
                  ) : '—'}
                </td>

                {/* Action */}
                <td className="px-3 py-3 text-center">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={row.loading || searchingAll}
                    onClick={() => searchAE(idx)}
                  >
                    {row.loading ? (
                      <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                    ) : row.searched ? (
                      <span className="material-symbols-outlined text-sm">refresh</span>
                    ) : (
                      <span className="material-symbols-outlined text-sm">search</span>
                    )}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <Card className="p-4 bg-slate-50 rounded-xl text-xs text-slate-600 space-y-1">
        <p><strong>AE Cost</strong> = AliExpress product price in CAD (converted by AE API)</p>
        <p><strong>Landed Cost</strong> = AE Cost + Shipping to Canada</p>
        <p><strong>Retail</strong> = Landed Cost × Markup multiplier (pre-tax price you charge)</p>
        <p><strong>HST</strong> = 13% Ontario Harmonized Sales Tax on retail price</p>
        <p><strong>Customer Price</strong> = Retail + HST (what customer pays at checkout)</p>
        <p><strong>Margin</strong> = Retail − Landed Cost (your profit per unit, before income tax)</p>
        <p className="pt-1 text-slate-400">AliExpress search returns top 5 matches sorted by sales volume. Click 1-5 buttons to compare different sources.</p>
      </Card>
    </div>
  );
}
