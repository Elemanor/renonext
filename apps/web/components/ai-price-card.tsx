'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface AIPriceCardProps {
  min: number;
  max: number;
  confidence: 'high' | 'medium';
  laborEstimate: number;
  materialEstimate: number;
  platformFee: number;
}

export function AIPriceCard({
  min,
  max,
  confidence,
  laborEstimate,
  materialEstimate,
  platformFee,
}: AIPriceCardProps) {
  const [showBreakdown, setShowBreakdown] = useState(false);

  return (
    <Card className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
      <div className="bg-gradient-to-r from-reno-purple-50 to-primary-50 p-5">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-reno-purple-500 to-primary-500">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <h3 className="font-bold text-slate-900">AI Price Estimate</h3>
          <Badge
            className={`ml-auto rounded-full border-transparent px-2.5 py-0.5 text-xs font-semibold ${
              confidence === 'high'
                ? 'bg-reno-green-100 text-reno-green-700'
                : 'bg-amber-100 text-amber-700'
            }`}
          >
            {confidence === 'high' ? 'High' : 'Medium'} Confidence
          </Badge>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-extrabold text-slate-900">
            ${min.toLocaleString()}
          </span>
          <span className="text-lg text-slate-400">–</span>
          <span className="text-3xl font-extrabold text-slate-900">
            ${max.toLocaleString()}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
          <TrendingUp className="h-3 w-3" />
          Based on 2,400+ similar jobs in your area
        </div>
      </div>

      {/* Breakdown Toggle */}
      <div className="border-t border-slate-100">
        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="flex w-full items-center justify-between px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          How we calculated this
          {showBreakdown ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        {showBreakdown && (
          <div className="space-y-2 border-t border-slate-100 px-5 pb-4 pt-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Labor estimate</span>
              <span className="font-semibold text-slate-900">
                ${laborEstimate.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Materials estimate</span>
              <span className="font-semibold text-slate-900">
                ${materialEstimate.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Platform fee</span>
              <span className="font-semibold text-slate-900">
                ${platformFee.toLocaleString()}
              </span>
            </div>
            <div className="h-px bg-slate-200" />
            <div className="flex justify-between text-sm">
              <span className="font-semibold text-slate-700">Total range</span>
              <span className="font-bold text-slate-900">
                ${min.toLocaleString()} – ${max.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
