'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  FileText,
  TrendingUp,
  Target,
  MapPin,
  Calendar,
  DollarSign,
  Building2,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface Tender {
  id: string;
  title: string;
  projectName: string;
  gcCompany: string;
  location: string;
  closesDate: string;
  budgetMin: number;
  budgetMax: number;
  scopeTags: string[];
  status: 'open' | 'closing-soon' | 'submitted' | 'awarded';
  trade: string;
  submittedBid?: number;
  specifications?: string[];
}

const mockTenders: Tender[] = [
  {
    id: '1',
    title: 'Drywall — 5,000 sq ft Board & Tape',
    projectName: '200 Front St W Development',
    gcCompany: 'Apex Construction',
    location: '200 Front St W, Toronto',
    closesDate: 'Feb 14',
    budgetMin: 15000,
    budgetMax: 25000,
    scopeTags: ['Level 4 Finish', 'Fire-rated', 'Sound insulation'],
    status: 'open',
    trade: 'drywall',
    specifications: ['Level 4 finish required', 'Fire-rated Type X boards', 'Sound insulation RC-1'],
  },
  {
    id: '2',
    title: 'Electrical Rough-In — 24 Units',
    projectName: '45 Lakeshore Townhomes',
    gcCompany: 'Meridian Homes',
    location: '45 Lakeshore Blvd, Mississauga',
    closesDate: 'Feb 9',
    budgetMin: 28000,
    budgetMax: 40000,
    scopeTags: ['200A Service', 'EV Charging', 'Smart Panel'],
    status: 'submitted',
    trade: 'electrical',
    submittedBid: 34200,
    specifications: ['200A main service', 'EV charging rough-in', 'Smart panel integration'],
  },
  {
    id: '3',
    title: 'Foundation Drain Tile — 400 LF',
    projectName: '88 King St E Residential',
    gcCompany: 'BuildRight Inc',
    location: '88 King St E, Toronto',
    closesDate: 'Feb 18',
    budgetMin: 10000,
    budgetMax: 18000,
    scopeTags: ['Perimeter drainage', 'Sump pit', 'Waterproofing'],
    status: 'open',
    trade: 'plumbing',
  },
  {
    id: '4',
    title: 'Concrete Forming — Basement Walls',
    projectName: '12 Birch Ave Custom Home',
    gcCompany: 'Premier Builds',
    location: '12 Birch Ave, Oakville',
    closesDate: 'Feb 7',
    budgetMin: 20000,
    budgetMax: 35000,
    scopeTags: ['8ft walls', 'Form & pour', '3000 PSI'],
    status: 'closing-soon',
    trade: 'general',
  },
  {
    id: '5',
    title: 'HVAC Ductwork — 3,200 sq ft',
    projectName: '200 Front St W Development',
    gcCompany: 'Apex Construction',
    location: '200 Front St W, Toronto',
    closesDate: 'Feb 20',
    budgetMin: 18000,
    budgetMax: 28000,
    scopeTags: ['Supply & return', 'Insulated', 'Balancing'],
    status: 'open',
    trade: 'general',
  },
];

export default function TendersPage() {
  const [selectedTrade, setSelectedTrade] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTenders = mockTenders.filter((tender) => {
    const matchesTrade = selectedTrade === 'all' || tender.trade === selectedTrade;
    const matchesStatus = selectedStatus === 'all' || tender.status === selectedStatus;
    return matchesTrade && matchesStatus;
  });

  const openInvitations = mockTenders.filter((t) => t.status === 'open' || t.status === 'closing-soon').length;
  const avgBudget = Math.round(
    mockTenders.reduce((sum, t) => sum + (t.budgetMin + t.budgetMax) / 2, 0) / mockTenders.length
  );
  const winRate = 34;

  const getStatusConfig = (status: Tender['status']) => {
    switch (status) {
      case 'open':
        return { label: 'Open', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' };
      case 'closing-soon':
        return { label: 'Closing Soon', color: 'bg-amber-500/10 text-amber-600 border-amber-500/20' };
      case 'submitted':
        return { label: 'Bid Submitted', color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' };
      case 'awarded':
        return { label: 'Awarded', color: 'bg-teal-500/10 text-teal-600 border-teal-500/20' };
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="pt-8 pb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#1D6B3F] to-[#0D7377]">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Incoming Tenders</h1>
              <p className="text-slate-600 mt-1">Tender invitations matching your trade & service area</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Open Invitations</p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">{openInvitations}</p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/10">
                  <Target className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Avg Budget</p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">{formatCurrency(avgBudget)}</p>
                </div>
                <div className="p-3 rounded-xl bg-blue-500/10">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Win Rate</p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">{winRate}%</p>
                </div>
                <div className="p-3 rounded-xl bg-purple-500/10">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Bar */}
        <Card className="border-slate-200 shadow-sm mb-6">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Trade Filters */}
              <div>
                <p className="text-sm font-medium text-slate-700 mb-3">Trade</p>
                <div className="flex flex-wrap gap-2">
                  {['all', 'plumbing', 'electrical', 'general', 'drywall'].map((trade) => (
                    <button
                      key={trade}
                      onClick={() => setSelectedTrade(trade)}
                      className={cn(
                        'px-4 py-2 rounded-xl text-sm font-medium transition-all',
                        selectedTrade === trade
                          ? 'bg-[#1D6B3F] text-white shadow-md'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      )}
                    >
                      {trade === 'all' ? 'All Trades' : trade.charAt(0).toUpperCase() + trade.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Filters */}
              <div>
                <p className="text-sm font-medium text-slate-700 mb-3">Status</p>
                <div className="flex flex-wrap gap-2">
                  {['all', 'open', 'closing-soon', 'submitted'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      className={cn(
                        'px-4 py-2 rounded-xl text-sm font-medium transition-all',
                        selectedStatus === status
                          ? 'bg-[#1D6B3F] text-white shadow-md'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      )}
                    >
                      {status === 'all'
                        ? 'All Status'
                        : status
                            .split('-')
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Field */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  placeholder="Search tenders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 rounded-xl border-slate-300 focus:border-[#1D6B3F] focus:ring-[#1D6B3F]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tender Cards List */}
        <div className="space-y-4">
          {filteredTenders.map((tender) => {
            const statusConfig = getStatusConfig(tender.status);
            const isSubmitted = tender.status === 'submitted';

            return (
              <Card
                key={tender.id}
                className="border-slate-200 shadow-sm hover:shadow-lg transition-all duration-200 hover:border-[#1D6B3F]/30"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    {/* Left Section - Tender Details */}
                    <div className="flex-1 space-y-4">
                      {/* Title & Status */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-slate-900">{tender.title}</h3>
                            <Badge className={cn('border', statusConfig.color)}>{statusConfig.label}</Badge>
                          </div>
                          <p className="text-sm text-slate-600">{tender.projectName}</p>
                        </div>
                      </div>

                      {/* GC Company */}
                      <div className="flex items-center gap-2 text-slate-700">
                        <Building2 className="h-4 w-4 text-slate-500" />
                        <span className="text-sm font-medium">{tender.gcCompany}</span>
                      </div>

                      {/* Location & Date */}
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-slate-600">
                          <MapPin className="h-4 w-4 text-slate-500" />
                          <span className="text-sm">{tender.location}</span>
                        </div>
                        <div
                          className={cn(
                            'flex items-center gap-2',
                            tender.status === 'closing-soon' ? 'text-amber-600' : 'text-slate-600'
                          )}
                        >
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm font-medium">Closes {tender.closesDate}</span>
                          {tender.status === 'closing-soon' && <Clock className="h-4 w-4 text-amber-500" />}
                        </div>
                      </div>

                      {/* Budget Range */}
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-slate-500" />
                        <span className="text-sm font-medium text-slate-700">
                          Budget: {formatCurrency(tender.budgetMin)} - {formatCurrency(tender.budgetMax)}
                        </span>
                      </div>

                      {/* Scope Tags */}
                      <div className="flex flex-wrap gap-2">
                        {tender.scopeTags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-slate-50 border-slate-300 text-slate-700 text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Submitted Bid Display */}
                      {isSubmitted && tender.submittedBid && (
                        <div className="pt-2 border-t border-slate-200">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-blue-600" />
                            <span className="text-sm font-medium text-slate-700">Your Bid:</span>
                            <span className="text-lg font-bold text-blue-600">
                              {formatCurrency(tender.submittedBid)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Section - Action Button */}
                    <div className="flex flex-col items-end gap-2 min-w-[180px]">
                      {isSubmitted ? (
                        <div className="flex flex-col items-end gap-2 w-full">
                          <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20 px-4 py-2">
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Bid Submitted
                          </Badge>
                          <Link href={`/pro-network/bid/${tender.id}`} className="w-full">
                            <Button
                              variant="outline"
                              className="w-full border-slate-300 hover:border-[#1D6B3F] hover:bg-slate-50"
                            >
                              View Bid
                            </Button>
                          </Link>
                        </div>
                      ) : (
                        <Link href={`/pro-network/bid/${tender.id}`} className="w-full">
                          <Button className="w-full bg-gradient-to-r from-[#1D6B3F] to-[#0D7377] hover:from-[#164d2e] hover:to-[#0a5c5f] text-white shadow-md hover:shadow-lg transition-all">
                            Submit Bid
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredTenders.length === 0 && (
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-12 text-center">
              <div className="p-4 rounded-2xl bg-slate-100 inline-block mb-4">
                <FileText className="h-12 w-12 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No tenders found</h3>
              <p className="text-slate-600">Try adjusting your filters to see more results</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
