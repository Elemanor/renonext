'use client';

import { useState, useMemo, use } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { cn } from '@/lib/utils';
import {
  ArrowLeft,
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  Calculator,
  TrendingUp,
  Users,
  ClipboardList,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface BOQItem {
  id: string;
  item: string;
  quantity: number;
  unit: string;
  unitCost: number;
  category: 'material' | 'labour';
}

const mockTender = {
  id: '1',
  title: 'Drywall — 5,000 sq ft Board & Tape',
  projectName: '200 Front St W Development',
  gcCompany: 'Apex Construction',
  location: '200 Front St W, Toronto',
  closesDate: 'Feb 14, 2026',
  budgetMin: 15000,
  budgetMax: 25000,
};

const mockBOQ: BOQItem[] = [
  {
    id: '1',
    item: '12mm Drywall Board',
    quantity: 250,
    unit: 'sheets',
    unitCost: 14.5,
    category: 'material',
  },
  {
    id: '2',
    item: 'Joint Compound',
    quantity: 20,
    unit: 'pails',
    unitCost: 28.0,
    category: 'material',
  },
  {
    id: '3',
    item: 'Paper Tape',
    quantity: 15,
    unit: 'rolls',
    unitCost: 4.5,
    category: 'material',
  },
  {
    id: '4',
    item: 'Corner Bead',
    quantity: 80,
    unit: 'pcs',
    unitCost: 3.2,
    category: 'material',
  },
  {
    id: '5',
    item: 'Screws (Box)',
    quantity: 12,
    unit: 'boxes',
    unitCost: 18.5,
    category: 'material',
  },
  {
    id: '6',
    item: 'Labour — Board & Tape',
    quantity: 160,
    unit: 'hrs',
    unitCost: 55.0,
    category: 'labour',
  },
  {
    id: '7',
    item: 'Labour — Sand & Finish',
    quantity: 80,
    unit: 'hrs',
    unitCost: 60.0,
    category: 'labour',
  },
];

export default function BidBuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: tenderId } = use(params);
  const [overheadPercent, setOverheadPercent] = useState<number>(10);
  const [profitMarginPercent, setProfitMarginPercent] = useState<number>(15);
  const [startDate, setStartDate] = useState('');
  const [duration, setDuration] = useState('2-weeks');
  const [crewSize, setCrewSize] = useState(4);
  const [specialConditions, setSpecialConditions] = useState('');

  // Calculate costs
  const materialCost = useMemo(() => {
    return mockBOQ
      .filter((item) => item.category === 'material')
      .reduce((sum, item) => sum + item.quantity * item.unitCost, 0);
  }, []);

  const labourCost = useMemo(() => {
    return mockBOQ
      .filter((item) => item.category === 'labour')
      .reduce((sum, item) => sum + item.quantity * item.unitCost, 0);
  }, []);

  const subtotal = useMemo(() => {
    return materialCost + labourCost;
  }, [materialCost, labourCost]);

  const overheadAmount = useMemo(() => {
    return (subtotal * overheadPercent) / 100;
  }, [subtotal, overheadPercent]);

  const profitAmount = useMemo(() => {
    return ((subtotal + overheadAmount) * profitMarginPercent) / 100;
  }, [subtotal, overheadAmount, profitMarginPercent]);

  const hst = useMemo(() => {
    return (subtotal + overheadAmount + profitAmount) * 0.13;
  }, [subtotal, overheadAmount, profitAmount]);

  const totalBid = useMemo(() => {
    return subtotal + overheadAmount + profitAmount + hst;
  }, [subtotal, overheadAmount, profitAmount, hst]);

  const totalMargin = useMemo(() => {
    return overheadAmount + profitAmount;
  }, [overheadAmount, profitAmount]);

  const marginPercent = useMemo(() => {
    return ((totalMargin / totalBid) * 100).toFixed(1);
  }, [totalMargin, totalBid]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatCurrencyCompact = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const isWithinBudget = totalBid >= mockTender.budgetMin && totalBid <= mockTender.budgetMax;

  const handleSubmit = () => {
    // Handle bid submission
    alert('Bid submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with Back Link */}
        <div className="pt-8 pb-6">
          <Link
            href="/pro-network/tenders"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#1D6B3F] mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tenders
          </Link>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#1D6B3F] to-[#0D7377]">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Bid Builder</h1>
              <p className="text-slate-600 mt-1">Build and submit your competitive bid</p>
            </div>
          </div>
        </div>

        {/* Tender Summary Card */}
        <Card className="border-slate-200 shadow-sm mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{mockTender.title}</h2>
                  <p className="text-sm text-slate-600 mt-1">{mockTender.projectName}</p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Building2 className="h-4 w-4 text-slate-500" />
                    <span className="text-sm font-medium">{mockTender.gcCompany}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    <span className="text-sm">{mockTender.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-600">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-medium">Closes {mockTender.closesDate}</span>
                  </div>
                </div>
              </div>

              <div className="text-left lg:text-right">
                <p className="text-sm font-medium text-slate-600">Budget Range</p>
                <p className="text-xl font-bold text-slate-900">
                  {formatCurrencyCompact(mockTender.budgetMin)} - {formatCurrencyCompact(mockTender.budgetMax)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - BOQ & Calculations */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bill of Quantities */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-[#1D6B3F]" />
                  <CardTitle className="text-lg">Bill of Quantities</CardTitle>
                </div>
                <p className="text-sm text-slate-600 mt-1">Pre-calculated material and labour breakdown</p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                          Item
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                          Qty
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                          Unit
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                          Unit Cost
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {/* Materials Section */}
                      <tr className="bg-slate-50">
                        <td colSpan={5} className="px-6 py-2 text-xs font-semibold text-slate-700 uppercase">
                          Materials
                        </td>
                      </tr>
                      {mockBOQ
                        .filter((item) => item.category === 'material')
                        .map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-3 text-sm text-slate-900">{item.item}</td>
                            <td className="px-6 py-3 text-sm text-slate-900 text-right">{item.quantity}</td>
                            <td className="px-6 py-3 text-sm text-slate-600">{item.unit}</td>
                            <td className="px-6 py-3 text-sm text-slate-900 text-right">
                              {formatCurrency(item.unitCost)}
                            </td>
                            <td className="px-6 py-3 text-sm font-medium text-slate-900 text-right">
                              {formatCurrency(item.quantity * item.unitCost)}
                            </td>
                          </tr>
                        ))}
                      <tr className="bg-slate-100 font-medium">
                        <td colSpan={4} className="px-6 py-3 text-sm text-slate-900">
                          Material Subtotal
                        </td>
                        <td className="px-6 py-3 text-sm text-slate-900 text-right font-bold">
                          {formatCurrency(materialCost)}
                        </td>
                      </tr>

                      {/* Labour Section */}
                      <tr className="bg-slate-50">
                        <td colSpan={5} className="px-6 py-2 text-xs font-semibold text-slate-700 uppercase">
                          Labour
                        </td>
                      </tr>
                      {mockBOQ
                        .filter((item) => item.category === 'labour')
                        .map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-3 text-sm text-slate-900">{item.item}</td>
                            <td className="px-6 py-3 text-sm text-slate-900 text-right">{item.quantity}</td>
                            <td className="px-6 py-3 text-sm text-slate-600">{item.unit}</td>
                            <td className="px-6 py-3 text-sm text-slate-900 text-right">
                              {formatCurrency(item.unitCost)}
                            </td>
                            <td className="px-6 py-3 text-sm font-medium text-slate-900 text-right">
                              {formatCurrency(item.quantity * item.unitCost)}
                            </td>
                          </tr>
                        ))}
                      <tr className="bg-slate-100 font-medium">
                        <td colSpan={4} className="px-6 py-3 text-sm text-slate-900">
                          Labour Subtotal
                        </td>
                        <td className="px-6 py-3 text-sm text-slate-900 text-right font-bold">
                          {formatCurrency(labourCost)}
                        </td>
                      </tr>

                      {/* Grand Subtotal */}
                      <tr className="bg-slate-200 font-semibold">
                        <td colSpan={4} className="px-6 py-3 text-sm text-slate-900">
                          Subtotal
                        </td>
                        <td className="px-6 py-3 text-sm text-slate-900 text-right font-bold">
                          {formatCurrency(subtotal)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Margin Calculator */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#1D6B3F]" />
                  <CardTitle className="text-lg">Margin Calculator</CardTitle>
                </div>
                <p className="text-sm text-slate-600 mt-1">Adjust overhead and profit margins</p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Material Cost Display */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
                    <span className="text-sm font-medium text-slate-700">Material Cost</span>
                    <span className="text-lg font-bold text-slate-900">{formatCurrency(materialCost)}</span>
                  </div>

                  {/* Labour Cost Display */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
                    <span className="text-sm font-medium text-slate-700">Labour Cost</span>
                    <span className="text-lg font-bold text-slate-900">{formatCurrency(labourCost)}</span>
                  </div>

                  {/* Overhead Slider */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700">Overhead</label>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-[#1D6B3F]">{overheadPercent}%</span>
                        <span className="text-sm text-slate-600">({formatCurrency(overheadAmount)})</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      value={overheadPercent}
                      onChange={(e) => setOverheadPercent(Number(e.target.value))}
                      min={0}
                      max={30}
                      step={1}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200 accent-[#1D6B3F]"
                    />
                  </div>

                  {/* Profit Margin Slider */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700">Profit Margin</label>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-[#1D6B3F]">{profitMarginPercent}%</span>
                        <span className="text-sm text-slate-600">({formatCurrency(profitAmount)})</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      value={profitMarginPercent}
                      onChange={(e) => setProfitMarginPercent(Number(e.target.value))}
                      min={0}
                      max={40}
                      step={1}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200 accent-[#1D6B3F]"
                    />
                  </div>

                  {/* Margin Summary */}
                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200">
                      <div>
                        <p className="text-sm font-medium text-slate-700">Your Margin</p>
                        <p className="text-xs text-slate-600 mt-0.5">Overhead + Profit</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-emerald-700">{formatCurrency(totalMargin)}</p>
                        <p className="text-sm text-emerald-600">{marginPercent}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline & Conditions */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#1D6B3F]" />
                  <CardTitle className="text-lg">Timeline & Conditions</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Start Date */}
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-2">
                      Estimated Start Date
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., March 1, 2026"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="rounded-xl border-slate-300 focus:border-[#1D6B3F] focus:ring-[#1D6B3F]"
                    />
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-2">Estimated Duration</label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-[#1D6B3F] focus:ring-[#1D6B3F] focus:outline-none"
                    >
                      <option value="1-week">1 week</option>
                      <option value="2-weeks">2 weeks</option>
                      <option value="3-weeks">3 weeks</option>
                      <option value="1-month">1 month</option>
                    </select>
                  </div>

                  {/* Crew Size */}
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-2">Crew Size</label>
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-slate-500" />
                      <Input
                        type="number"
                        min={1}
                        max={20}
                        value={crewSize}
                        onChange={(e) => setCrewSize(parseInt(e.target.value) || 1)}
                        className="rounded-xl border-slate-300 focus:border-[#1D6B3F] focus:ring-[#1D6B3F]"
                      />
                      <span className="text-sm text-slate-600">workers</span>
                    </div>
                  </div>

                  {/* Special Conditions */}
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-2">Special Conditions</label>
                    <Textarea
                      placeholder="Add any special conditions, exclusions, or notes..."
                      value={specialConditions}
                      onChange={(e) => setSpecialConditions(e.target.value)}
                      rows={4}
                      className="rounded-xl border-slate-300 focus:border-[#1D6B3F] focus:ring-[#1D6B3F] resize-none"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Bid Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">
              {/* Bid Total Card */}
              <Card className="border-slate-200 shadow-lg">
                <CardHeader className="border-b border-slate-200 bg-gradient-to-br from-slate-50 to-white">
                  <CardTitle className="text-lg">Bid Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Subtotal</span>
                      <span className="font-medium text-slate-900">{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Overhead ({overheadPercent}%)</span>
                      <span className="font-medium text-slate-900">{formatCurrency(overheadAmount)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Profit ({profitMarginPercent}%)</span>
                      <span className="font-medium text-slate-900">{formatCurrency(profitAmount)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm border-t border-slate-200 pt-3">
                      <span className="text-slate-600">HST (13%)</span>
                      <span className="font-medium text-slate-900">{formatCurrency(hst)}</span>
                    </div>

                    <div className="pt-3 border-t-2 border-slate-300">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-slate-700">Total Bid Amount</span>
                      </div>
                      <div className="p-4 rounded-xl bg-gradient-to-br from-[#1D6B3F] to-[#0D7377]">
                        <p className="text-3xl font-bold text-white">{formatCurrency(totalBid)}</p>
                      </div>
                    </div>

                    {/* Budget Check */}
                    <div
                      className={cn(
                        'p-3 rounded-xl flex items-start gap-2',
                        isWithinBudget
                          ? 'bg-emerald-50 border border-emerald-200'
                          : 'bg-amber-50 border border-amber-200'
                      )}
                    >
                      {isWithinBudget ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                      )}
                      <div>
                        <p className={cn('text-sm font-medium', isWithinBudget ? 'text-emerald-700' : 'text-amber-700')}>
                          {isWithinBudget ? 'Within Budget Range' : 'Outside Budget Range'}
                        </p>
                        <p className={cn('text-xs mt-0.5', isWithinBudget ? 'text-emerald-600' : 'text-amber-600')}>
                          Budget: {formatCurrencyCompact(mockTender.budgetMin)} -{' '}
                          {formatCurrencyCompact(mockTender.budgetMax)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                className="w-full h-auto py-4 text-lg font-semibold bg-gradient-to-r from-[#1D6B3F] to-[#0D7377] hover:from-[#164d2e] hover:to-[#0a5c5f] text-white shadow-lg hover:shadow-xl transition-all rounded-xl"
              >
                <CheckCircle2 className="mr-2 h-5 w-5" />
                Submit Bid — {formatCurrency(totalBid)}
              </Button>

              {/* Info Card */}
              <Card className="border-blue-200 bg-blue-50/30 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start gap-2">
                    <DollarSign className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-blue-900">Bid Protection</p>
                      <p className="text-xs text-blue-700 mt-1">
                        Your bid is locked for 30 days. GC must respond within the tender closing period.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
