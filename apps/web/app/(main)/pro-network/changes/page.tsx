'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  ChevronDown,
  ChevronUp,
  FileText,
  DollarSign,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Upload,
  Calendar,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ChangeOrder {
  id: string;
  number: string;
  title: string;
  project: string;
  costImpact: number;
  scheduleImpact: string;
  reason: string;
  description: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

const MOCK_CHANGE_ORDERS: ChangeOrder[] = [
  {
    id: '8',
    number: 'CO-008',
    title: 'Upgrade to PEX from copper',
    project: 'Pipe Burst Repair',
    costImpact: 180,
    scheduleImpact: '+1 day',
    reason: 'Client Request',
    description: 'Client requested upgrade from copper piping to PEX for better freeze resistance and easier future modifications.',
    date: 'Feb 6',
    status: 'pending'
  },
  {
    id: '7',
    number: 'CO-007',
    title: 'Add shut-off valve to laundry',
    project: 'Pipe Burst Repair',
    costImpact: 320,
    scheduleImpact: '+1 day',
    reason: 'Code Requirement',
    description: 'Building inspector required individual shut-off valve for laundry area to meet current code standards.',
    date: 'Feb 5',
    status: 'approved'
  },
  {
    id: '6',
    number: 'CO-006',
    title: 'Extra coat of primer on patched areas',
    project: 'Bedroom Painting',
    costImpact: 150,
    scheduleImpact: '+1 day',
    reason: 'Site Condition',
    description: 'Drywall patches required additional primer coat for uniform finish and proper paint adhesion.',
    date: 'Feb 4',
    status: 'pending'
  },
  {
    id: '5',
    number: 'CO-005',
    title: 'Upgrade paint to zero-VOC',
    project: 'Bedroom Painting',
    costImpact: 280,
    scheduleImpact: 'None',
    reason: 'Client Request',
    description: 'Homeowner requested upgrade to zero-VOC paint due to family member with chemical sensitivities.',
    date: 'Feb 3',
    status: 'approved'
  },
  {
    id: '4',
    number: 'CO-004',
    title: 'Add GFCI outlets near water',
    project: 'Panel Upgrade',
    costImpact: 420,
    scheduleImpact: '+2 days',
    reason: 'Code Requirement',
    description: 'Added GFCI protection for all outlets within 6 feet of water sources as per updated electrical code.',
    date: 'Feb 2',
    status: 'approved'
  },
  {
    id: '3',
    number: 'CO-003',
    title: 'Relocate junction box',
    project: 'Panel Upgrade',
    costImpact: 350,
    scheduleImpact: '+1 day',
    reason: 'Site Condition',
    description: 'Existing junction box location conflicts with new panel placement, relocation required.',
    date: 'Feb 1',
    status: 'approved'
  },
  {
    id: '2',
    number: 'CO-002',
    title: 'Remove asbestos tile found',
    project: 'Pipe Burst Repair',
    costImpact: 800,
    scheduleImpact: '+1 week',
    reason: 'Site Condition',
    description: 'Discovered asbestos-containing floor tiles during demolition. Requires certified abatement contractor.',
    date: 'Jan 30',
    status: 'rejected'
  },
  {
    id: '1',
    number: 'CO-001',
    title: 'Additional clean-up scope',
    project: 'Pipe Burst Repair',
    costImpact: 230,
    scheduleImpact: 'None',
    reason: 'Client Request',
    description: 'Extended clean-up to include adjacent hallway and stairwell affected by water damage.',
    date: 'Jan 28',
    status: 'approved'
  }
];

const PROJECTS = ['Pipe Burst Repair', 'Bedroom Painting', 'Panel Upgrade'];
const SCHEDULE_IMPACTS = ['None', '+1 day', '+2 days', '+1 week', '+2 weeks'];
const REASONS = ['Client Request', 'Site Condition', 'Code Requirement', 'Design Change'];

type FilterType = 'all' | 'pending' | 'approved' | 'rejected';

export default function ChangeOrdersPage() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [formExpanded, setFormExpanded] = useState(false);
  const [expandedCO, setExpandedCO] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    project: '',
    title: '',
    description: '',
    costImpact: '',
    costDirection: 'positive' as 'positive' | 'negative',
    scheduleImpact: 'None',
    reason: 'Client Request'
  });

  const stats = {
    total: MOCK_CHANGE_ORDERS.length,
    approved: MOCK_CHANGE_ORDERS.filter(co => co.status === 'approved').length,
    approvedValue: MOCK_CHANGE_ORDERS.filter(co => co.status === 'approved').reduce((sum, co) => sum + co.costImpact, 0),
    pending: MOCK_CHANGE_ORDERS.filter(co => co.status === 'pending').length,
    pendingValue: MOCK_CHANGE_ORDERS.filter(co => co.status === 'pending').reduce((sum, co) => sum + co.costImpact, 0),
    rejected: MOCK_CHANGE_ORDERS.filter(co => co.status === 'rejected').length,
    rejectedValue: MOCK_CHANGE_ORDERS.filter(co => co.status === 'rejected').reduce((sum, co) => sum + co.costImpact, 0)
  };

  const filteredOrders = filter === 'all'
    ? MOCK_CHANGE_ORDERS
    : MOCK_CHANGE_ORDERS.filter(co => co.status === filter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting change order:', formData);
    // Reset form
    setFormData({
      project: '',
      title: '',
      description: '',
      costImpact: '',
      costDirection: 'positive',
      scheduleImpact: 'None',
      reason: 'Client Request'
    });
    setFormExpanded(false);
  };

  const getStatusBadge = (status: ChangeOrder['status']) => {
    switch (status) {
      case 'approved':
        return (
          <Badge className="bg-reno-green/10 text-reno-green border-reno-green/20">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">
            <Clock className="w-3 h-3 mr-1" />
            Pending Review
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-500/10 text-red-600 border-red-500/20">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Change Orders</h1>
              <p className="mt-2 text-lg text-gray-600">
                Track and manage change orders across all projects
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <Card className="p-6 rounded-2xl border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total COs</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
                </div>
                <div className="h-12 w-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-gray-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6 rounded-2xl border-reno-green/20 bg-reno-green/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-3xl font-bold text-reno-green mt-2">{stats.approved}</p>
                  <p className="text-sm text-gray-600 mt-1">${stats.approvedValue.toLocaleString()}</p>
                </div>
                <div className="h-12 w-12 bg-reno-green/10 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-reno-green" />
                </div>
              </div>
            </Card>

            <Card className="p-6 rounded-2xl border-amber-500/20 bg-amber-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Review</p>
                  <p className="text-3xl font-bold text-amber-600 mt-2">{stats.pending}</p>
                  <p className="text-sm text-gray-600 mt-1">${stats.pendingValue.toLocaleString()}</p>
                </div>
                <div className="h-12 w-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6 rounded-2xl border-red-500/20 bg-red-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rejected</p>
                  <p className="text-3xl font-bold text-red-600 mt-2">{stats.rejected}</p>
                  <p className="text-sm text-gray-600 mt-1">${stats.rejectedValue.toLocaleString()}</p>
                </div>
                <div className="h-12 w-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create Change Order Form */}
        <Card className="rounded-2xl border-gray-200 mb-8 overflow-hidden">
          <button
            onClick={() => setFormExpanded(!formExpanded)}
            className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-reno-green rounded-xl flex items-center justify-center">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h2 className="text-lg font-semibold text-gray-900">Create Change Order</h2>
                <p className="text-sm text-gray-600">Submit a new change order for client review</p>
              </div>
            </div>
            {formExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>

          {formExpanded && (
            <form onSubmit={handleSubmit} className="px-6 pb-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Project */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project
                  </label>
                  <select
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-reno-green focus:border-transparent"
                    required
                  >
                    <option value="">Select project...</option>
                    {PROJECTS.map(project => (
                      <option key={project} value={project}>{project}</option>
                    ))}
                  </select>
                </div>

                {/* CO Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Change Order Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Add GFCI outlets near water"
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-reno-green focus:border-transparent"
                    required
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Provide detailed explanation of the change and why it's necessary..."
                    rows={4}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-reno-green focus:border-transparent resize-none"
                    required
                  />
                </div>

                {/* Cost Impact */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cost Impact
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={formData.costImpact}
                        onChange={(e) => setFormData({ ...formData, costImpact: e.target.value })}
                        placeholder="0"
                        min="0"
                        step="0.01"
                        className="w-full pl-8 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-reno-green focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="flex bg-gray-100 rounded-xl p-1">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, costDirection: 'positive' })}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                          formData.costDirection === 'positive'
                            ? "bg-white text-reno-green shadow-sm"
                            : "text-gray-600 hover:text-gray-900"
                        )}
                      >
                        <TrendingUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, costDirection: 'negative' })}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                          formData.costDirection === 'negative'
                            ? "bg-white text-red-600 shadow-sm"
                            : "text-gray-600 hover:text-gray-900"
                        )}
                      >
                        <TrendingDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Schedule Impact */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Schedule Impact
                  </label>
                  <select
                    value={formData.scheduleImpact}
                    onChange={(e) => setFormData({ ...formData, scheduleImpact: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-reno-green focus:border-transparent"
                  >
                    {SCHEDULE_IMPACTS.map(impact => (
                      <option key={impact} value={impact}>{impact}</option>
                    ))}
                  </select>
                </div>

                {/* Reason */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason
                  </label>
                  <select
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-reno-green focus:border-transparent"
                  >
                    {REASONS.map(reason => (
                      <option key={reason} value={reason}>{reason}</option>
                    ))}
                  </select>
                </div>

                {/* Attach Photos */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attach Photos
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-reno-green transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end mt-6">
                <Button
                  type="submit"
                  className="bg-reno-green hover:bg-reno-green/90 text-white px-8 rounded-xl"
                >
                  Submit Change Order
                </Button>
              </div>
            </form>
          )}
        </Card>

        {/* Change Orders Tracker */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Change Orders Tracker</h2>

            {/* Filter Chips */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-colors",
                  filter === 'all'
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
                )}
              >
                All
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-colors",
                  filter === 'pending'
                    ? "bg-amber-500 text-white"
                    : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
                )}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter('approved')}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-colors",
                  filter === 'approved'
                    ? "bg-reno-green text-white"
                    : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
                )}
              >
                Approved
              </button>
              <button
                onClick={() => setFilter('rejected')}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-colors",
                  filter === 'rejected'
                    ? "bg-red-500 text-white"
                    : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
                )}
              >
                Rejected
              </button>
            </div>
          </div>

          {/* Change Orders List */}
          <div className="space-y-4">
            {filteredOrders.map((co) => (
              <Card key={co.id} className="rounded-2xl border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <FileText className="w-6 h-6 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {co.number}: {co.title}
                                </h3>
                                {getStatusBadge(co.status)}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <FileText className="w-4 h-4" />
                                  {co.project}
                                </span>
                                <span className="flex items-center gap-1 font-semibold text-reno-green">
                                  <DollarSign className="w-4 h-4" />
                                  +${co.costImpact}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {co.date}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => setExpandedCO(expandedCO === co.id ? null : co.id)}
                              className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              {expandedCO === co.id ? (
                                <ChevronUp className="w-5 h-5" />
                              ) : (
                                <ChevronDown className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {expandedCO === co.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1">Schedule Impact</p>
                          <p className="text-sm text-gray-900">{co.scheduleImpact}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1">Reason</p>
                          <p className="text-sm text-gray-900">{co.reason}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-2">Description</p>
                        <p className="text-sm text-gray-700 leading-relaxed">{co.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
