'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Shield,
  CheckCircle2,
  MapPin,
  Star,
  AlertCircle,
  Camera,
  TrendingUp,
  Calendar,
  HelpCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

const mockContractors = [
  {
    id: '1',
    slug: 'apex-builders',
    company: 'Apex Builders',
    trade: 'General Contractor',
    location: 'Toronto, ON',
    rating: 4.9,
    reviewCount: 30,
    projectCount: 30,
    proofCompleteness: 95,
    inspectionPassRate: 100,
    disputeCount: 0,
    lastJobDays: 12,
    wsib: true,
    insured: true,
    verified: true,
    photos: [
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&fit=crop',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&fit=crop',
    ],
  },
  {
    id: '2',
    slug: 'sparkline-electric',
    company: 'SparkLine Electric',
    trade: 'Electrical',
    location: 'Mississauga, ON',
    rating: 4.8,
    reviewCount: 42,
    projectCount: 42,
    proofCompleteness: 88,
    inspectionPassRate: 98,
    disputeCount: 1,
    lastJobDays: 5,
    wsib: true,
    insured: true,
    verified: true,
    photos: [
      'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&fit=crop',
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&fit=crop',
    ],
  },
  {
    id: '3',
    slug: 'flowright-plumbing',
    company: 'FlowRight Plumbing',
    trade: 'Plumbing',
    location: 'Oakville, ON',
    rating: 4.7,
    reviewCount: 28,
    projectCount: 28,
    proofCompleteness: 92,
    inspectionPassRate: 97,
    disputeCount: 0,
    lastJobDays: 8,
    wsib: true,
    insured: true,
    verified: true,
    photos: [
      'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&fit=crop',
      'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&fit=crop',
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&fit=crop',
    ],
  },
  {
    id: '4',
    slug: 'truefinish-painting',
    company: 'TrueFinish Painting',
    trade: 'Painting',
    location: 'Burlington, ON',
    rating: 4.6,
    reviewCount: 55,
    projectCount: 55,
    proofCompleteness: 85,
    inspectionPassRate: 100,
    disputeCount: 0,
    lastJobDays: 3,
    wsib: true,
    insured: true,
    verified: true,
    photos: [
      'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=400&fit=crop',
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&fit=crop',
      'https://images.unsplash.com/photo-1572883454114-1cf0031ede2a?w=400&fit=crop',
    ],
  },
  {
    id: '5',
    slug: 'foundation-first',
    company: 'Foundation First',
    trade: 'Underpinning',
    location: 'Toronto, ON',
    rating: 4.9,
    reviewCount: 18,
    projectCount: 18,
    proofCompleteness: 98,
    inspectionPassRate: 100,
    disputeCount: 0,
    lastJobDays: 21,
    wsib: true,
    insured: true,
    verified: true,
    photos: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&fit=crop',
      'https://images.unsplash.com/photo-1581092160607-ee67e5838242?w=400&fit=crop',
      'https://images.unsplash.com/photo-1590496793929-8a161ea0d1f7?w=400&fit=crop',
    ],
  },
  {
    id: '6',
    slug: 'proframe-carpentry',
    company: 'ProFrame Carpentry',
    trade: 'Framing',
    location: 'Hamilton, ON',
    rating: 4.5,
    reviewCount: 35,
    projectCount: 35,
    proofCompleteness: 80,
    inspectionPassRate: 95,
    disputeCount: 2,
    lastJobDays: 14,
    wsib: true,
    insured: true,
    verified: true,
    photos: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&fit=crop',
      'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=400&fit=crop',
      'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=400&fit=crop',
    ],
  },
  {
    id: '7',
    slug: 'rooftech-specialists',
    company: 'RoofTech Specialists',
    trade: 'Roofing',
    location: 'Brampton, ON',
    rating: 4.7,
    reviewCount: 39,
    projectCount: 39,
    proofCompleteness: 91,
    inspectionPassRate: 99,
    disputeCount: 0,
    lastJobDays: 6,
    wsib: true,
    insured: true,
    verified: true,
    photos: [
      'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400&fit=crop',
      'https://images.unsplash.com/photo-1595814433015-e6f5ce69e8fd?w=400&fit=crop',
      'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&fit=crop',
    ],
  },
  {
    id: '8',
    slug: 'precision-hvac',
    company: 'Precision HVAC',
    trade: 'HVAC',
    location: 'Markham, ON',
    rating: 4.8,
    reviewCount: 47,
    projectCount: 47,
    proofCompleteness: 89,
    inspectionPassRate: 98,
    disputeCount: 0,
    lastJobDays: 2,
    wsib: true,
    insured: true,
    verified: true,
    photos: [
      'https://images.unsplash.com/photo-1581092160607-ee67e5838242?w=400&fit=crop',
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&fit=crop',
      'https://images.unsplash.com/photo-1590496793929-8a161ea0d1f7?w=400&fit=crop',
    ],
  },
  {
    id: '9',
    slug: 'concrete-solutions-pro',
    company: 'Concrete Solutions Pro',
    trade: 'Concrete',
    location: 'Vaughan, ON',
    rating: 4.6,
    reviewCount: 32,
    projectCount: 32,
    proofCompleteness: 87,
    inspectionPassRate: 96,
    disputeCount: 1,
    lastJobDays: 18,
    wsib: true,
    insured: true,
    verified: true,
    photos: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&fit=crop',
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&fit=crop',
    ],
  },
  // Unverified contractor example
  {
    id: '10',
    slug: 'new-horizons-construction',
    company: 'New Horizons Construction',
    trade: 'General Contractor',
    location: 'Toronto, ON',
    rating: 0,
    reviewCount: 0,
    projectCount: 0,
    proofCompleteness: 0,
    inspectionPassRate: 0,
    disputeCount: 0,
    lastJobDays: 0,
    wsib: false,
    insured: false,
    verified: false,
    photos: [],
  },
];

const tradeOptions = [
  'All Trades',
  'General Contractor',
  'Electrical',
  'Plumbing',
  'Painting',
  'Framing',
  'Roofing',
  'HVAC',
  'Concrete',
  'Underpinning',
];

const areaOptions = [
  'GTA Area',
  'Toronto',
  'Mississauga',
  'Brampton',
  'Oakville',
  'Burlington',
  'Hamilton',
  'Markham',
  'Vaughan',
];

export default function BrowseProsPage() {
  const [showOnlyVerified, setShowOnlyVerified] = useState(true);
  const [proofFilter, setProofFilter] = useState('any');
  const [passRateFilter, setPassRateFilter] = useState('any');
  const [disputesFilter, setDisputesFilter] = useState('any');
  const [lastJobFilter, setLastJobFilter] = useState('any');
  const [wsibFilter, setWsibFilter] = useState(false);

  // Filter contractors based on all criteria
  const filteredContractors = mockContractors.filter((contractor) => {
    if (showOnlyVerified && !contractor.verified) return false;

    if (proofFilter === '90' && contractor.proofCompleteness < 90) return false;
    if (proofFilter === '80' && contractor.proofCompleteness < 80) return false;
    if (proofFilter === '70' && contractor.proofCompleteness < 70) return false;

    if (passRateFilter === '100' && contractor.inspectionPassRate < 100) return false;
    if (passRateFilter === '95' && contractor.inspectionPassRate < 95) return false;
    if (passRateFilter === '90' && contractor.inspectionPassRate < 90) return false;

    if (disputesFilter === '0' && contractor.disputeCount > 0) return false;
    if (disputesFilter === '1-2' && contractor.disputeCount > 2) return false;
    if (disputesFilter === '3+' && contractor.disputeCount < 3) return false;

    if (lastJobFilter === '7' && contractor.lastJobDays > 7) return false;
    if (lastJobFilter === '30' && contractor.lastJobDays > 30) return false;
    if (lastJobFilter === '90' && contractor.lastJobDays > 90) return false;

    if (wsibFilter && !contractor.wsib) return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-reno-warm">
      {/* S1: Thesis Bar - Improved */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-reno-purple/20 bg-reno-purple-light"
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="flex-1">
              <h1 className="font-display text-3xl font-bold text-reno-dark md:text-4xl">
                Verified work, not profiles.
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-reno-dark/70 md:text-base">
                Every photo is GPS-tagged from a real job site. Every rating is linked to a verified milestone.
                Every stat is calculated from actual project data — not self-reported.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowOnlyVerified(!showOnlyVerified)}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-full px-5 py-3 shadow-md transition-all hover:shadow-lg",
                  showOnlyVerified
                    ? "bg-reno-purple text-white"
                    : "bg-white text-reno-dark"
                )}
              >
                <div
                  className={cn(
                    "relative h-6 w-11 rounded-full transition-colors",
                    showOnlyVerified ? "bg-white/30" : "bg-gray-300"
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-1 h-4 w-4 rounded-full transition-all",
                      showOnlyVerified
                        ? "left-6 bg-white"
                        : "left-1 bg-white"
                    )}
                  />
                </div>
                <span className="text-sm font-semibold">Show only verified pros</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* S2: Search + Trust Filters Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="border-b border-gray-200 bg-gray-50"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by trade, location, specialty..."
                className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-12 pr-4 text-sm font-medium text-reno-dark placeholder-gray-400 shadow-sm transition-all focus:border-reno-purple focus:outline-none focus:ring-2 focus:ring-reno-purple/20"
              />
            </div>
            <Button className="h-12 rounded-xl bg-reno-purple px-6 text-sm font-semibold text-white shadow-sm hover:bg-reno-purple/90">
              Search
            </Button>
          </div>

          {/* Basic Filters */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Filters:
            </span>

            {/* Trade Filter */}
            <select className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-reno-dark shadow-sm transition-all hover:border-gray-300 focus:border-reno-purple focus:outline-none focus:ring-2 focus:ring-reno-purple/20">
              {tradeOptions.map((trade) => (
                <option key={trade}>{trade}</option>
              ))}
            </select>

            {/* Area Filter */}
            <select className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-reno-dark shadow-sm transition-all hover:border-gray-300 focus:border-reno-purple focus:outline-none focus:ring-2 focus:ring-reno-purple/20">
              {areaOptions.map((area) => (
                <option key={area}>{area}</option>
              ))}
            </select>
          </div>

          {/* S2: Trust Filters Row */}
          <div className="flex flex-wrap items-center gap-2 rounded-lg border-2 border-reno-purple/20 bg-reno-purple-light/30 p-3">
            <span className="text-xs font-bold uppercase tracking-wider text-reno-purple">
              TRUST FILTERS:
            </span>

            {/* Proof % Filter */}
            <select
              value={proofFilter}
              onChange={(e) => setProofFilter(e.target.value)}
              className="rounded-lg border-2 border-reno-purple/30 bg-white px-3 py-2 text-sm font-medium text-reno-dark shadow-sm transition-all hover:border-reno-purple focus:border-reno-purple focus:outline-none focus:ring-2 focus:ring-reno-purple/20"
            >
              <option value="any">Proof % (Any)</option>
              <option value="90">90%+</option>
              <option value="80">80%+</option>
              <option value="70">70%+</option>
            </select>

            {/* Pass Rate Filter */}
            <select
              value={passRateFilter}
              onChange={(e) => setPassRateFilter(e.target.value)}
              className="rounded-lg border-2 border-reno-purple/30 bg-white px-3 py-2 text-sm font-medium text-reno-dark shadow-sm transition-all hover:border-reno-purple focus:border-reno-purple focus:outline-none focus:ring-2 focus:ring-reno-purple/20"
            >
              <option value="any">Pass Rate (Any)</option>
              <option value="100">100%</option>
              <option value="95">95%+</option>
              <option value="90">90%+</option>
            </select>

            {/* Disputes Filter */}
            <select
              value={disputesFilter}
              onChange={(e) => setDisputesFilter(e.target.value)}
              className="rounded-lg border-2 border-reno-purple/30 bg-white px-3 py-2 text-sm font-medium text-reno-dark shadow-sm transition-all hover:border-reno-purple focus:border-reno-purple focus:outline-none focus:ring-2 focus:ring-reno-purple/20"
            >
              <option value="any">Disputes (Any)</option>
              <option value="0">0</option>
              <option value="1-2">1-2</option>
              <option value="3+">3+</option>
            </select>

            {/* Last Job Filter */}
            <select
              value={lastJobFilter}
              onChange={(e) => setLastJobFilter(e.target.value)}
              className="rounded-lg border-2 border-reno-purple/30 bg-white px-3 py-2 text-sm font-medium text-reno-dark shadow-sm transition-all hover:border-reno-purple focus:border-reno-purple focus:outline-none focus:ring-2 focus:ring-reno-purple/20"
            >
              <option value="any">Last Job (Any)</option>
              <option value="7">7 days</option>
              <option value="30">30 days</option>
              <option value="90">90 days</option>
            </select>

            {/* WSIB Toggle */}
            <button
              onClick={() => setWsibFilter(!wsibFilter)}
              className={cn(
                "flex items-center gap-2 rounded-lg border-2 px-3 py-2 text-sm font-semibold transition-all",
                wsibFilter
                  ? "border-reno-purple bg-reno-purple text-white"
                  : "border-reno-purple/30 bg-white text-reno-dark hover:border-reno-purple"
              )}
            >
              <Shield className="h-4 w-4" />
              <span>WSIB</span>
              {wsibFilter && <span>✓</span>}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Results Section */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-6 flex items-center justify-between"
        >
          <p className="text-sm text-gray-600">
            Showing <span className="font-bold text-reno-dark">{filteredContractors.length}</span> verified contractors
          </p>
          <p className="text-xs text-gray-500">
            Updated 3 minutes ago
          </p>
        </motion.div>

        {/* S3: Contractor Cards Grid with Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredContractors.map((contractor) => (
            <motion.div key={contractor.id} variants={cardVariants}>
              <Card
                className={cn(
                  "group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-lg",
                  contractor.verified
                    ? "border-gray-200"
                    : "border-gray-300 opacity-60"
                )}
              >
                <Link href={`#`} className="block">
                  {/* Photos or Placeholder */}
                  {contractor.verified ? (
                    <div className="grid grid-cols-3 gap-1 bg-gray-100 p-2">
                      {contractor.photos.map((photo, idx) => (
                        <div
                          key={idx}
                          className="relative aspect-square overflow-hidden rounded-lg bg-gray-200"
                        >
                          <img
                            src={photo}
                            alt={`${contractor.company} work ${idx + 1}`}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                          <div className="absolute right-1 top-1 rounded-full bg-black/40 p-1 backdrop-blur-sm">
                            <Camera className="h-3 w-3 text-white" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-100 p-2">
                      <div className="flex aspect-[3/1] items-center justify-center rounded-lg bg-gray-200">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-300">
                          <HelpCircle className="h-10 w-10 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  )}

                {/* Content */}
                <div className="p-5">
                  {/* Header */}
                  <div className="mb-3">
                    <h3 className="font-display text-lg font-bold text-reno-dark group-hover:text-reno-purple">
                      {contractor.company}
                    </h3>
                    <p className="mt-0.5 flex items-center gap-1.5 text-sm text-gray-600">
                      <span className="font-medium">{contractor.trade}</span>
                      <span className="text-gray-300">•</span>
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{contractor.location}</span>
                    </p>
                  </div>

                  {contractor.verified ? (
                    <>
                      {/* Rating & Projects */}
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-reno-amber text-reno-amber" />
                          <span className="text-sm font-bold text-reno-dark">{contractor.rating}</span>
                          <span className="text-xs text-gray-500">({contractor.reviewCount})</span>
                        </div>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-600">
                          {contractor.projectCount} projects
                        </span>
                      </div>

                      {/* Trust Metrics */}
                      <div className="space-y-3 border-t border-gray-100 pt-4">
                        {/* Proof Completeness */}
                        <div>
                          <div className="mb-1.5 flex items-center justify-between">
                            <span className="text-xs font-semibold text-gray-600">Proof completeness</span>
                            <span className="text-xs font-bold text-reno-teal">
                              {contractor.proofCompleteness}%
                            </span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-reno-teal to-reno-green transition-all"
                              style={{ width: `${contractor.proofCompleteness}%` }}
                            />
                          </div>
                        </div>

                        {/* Pass Rate & Disputes */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="rounded-lg border border-reno-green/20 bg-reno-green-light/30 p-2.5">
                            <div className="flex items-center gap-1.5">
                              <CheckCircle2 className="h-3.5 w-3.5 text-reno-green" />
                              <span className="text-xs font-semibold text-gray-600">Pass Rate</span>
                            </div>
                            <p className="mt-1 text-lg font-bold text-reno-green">
                              {contractor.inspectionPassRate}%
                            </p>
                          </div>
                          <div
                            className={cn(
                              "rounded-lg border p-2.5",
                              contractor.disputeCount === 0
                                ? "border-reno-green/20 bg-reno-green-light/30"
                                : contractor.disputeCount <= 2
                                ? "border-reno-amber/20 bg-reno-amber-light/30"
                                : "border-red-200 bg-red-50"
                            )}
                          >
                            <div className="flex items-center gap-1.5">
                              <AlertCircle
                                className={cn(
                                  "h-3.5 w-3.5",
                                  contractor.disputeCount === 0
                                    ? "text-reno-green"
                                    : contractor.disputeCount <= 2
                                    ? "text-reno-amber"
                                    : "text-red-500"
                                )}
                              />
                              <span className="text-xs font-semibold text-gray-600">Disputes</span>
                            </div>
                            <p
                              className={cn(
                                "mt-1 text-lg font-bold",
                                contractor.disputeCount === 0
                                  ? "text-reno-green"
                                  : contractor.disputeCount <= 2
                                  ? "text-reno-amber"
                                  : "text-red-600"
                              )}
                            >
                              {contractor.disputeCount}
                            </p>
                          </div>
                        </div>

                        {/* Last Job */}
                        <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                          <div className="flex items-center gap-1.5 text-xs text-gray-600">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>Last job</span>
                          </div>
                          <span className="text-xs font-bold text-reno-dark">
                            {contractor.lastJobDays} days ago
                          </span>
                        </div>
                      </div>

                      {/* Trust Badges */}
                      <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-4">
                        {contractor.wsib && (
                          <Badge className="border-reno-green/20 bg-reno-green-light/50 text-xs font-semibold text-reno-green hover:bg-reno-green-light">
                            <Shield className="mr-1 h-3 w-3" />
                            WSIB ✓
                          </Badge>
                        )}
                        {contractor.insured && (
                          <Badge className="border-reno-teal/20 bg-reno-teal-light/50 text-xs font-semibold text-reno-teal hover:bg-reno-teal-light">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Insured ✓
                          </Badge>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Unverified State */}
                      <div className="mb-4 rounded-lg border-2 border-gray-300 bg-gray-50 p-4 text-center">
                        <Badge className="mb-2 border-gray-400 bg-gray-200 text-xs font-semibold text-gray-600">
                          Not Yet Verified
                        </Badge>
                        <p className="text-xs leading-relaxed text-gray-600">
                          This contractor has applied but hasn't completed a verified project yet.
                        </p>
                      </div>

                      {/* Pending Trust Badges */}
                      <div className="flex items-center gap-2 border-t border-gray-200 pt-4">
                        <Badge className="border-gray-300 bg-gray-100 text-xs font-semibold text-gray-500">
                          <Shield className="mr-1 h-3 w-3" />
                          WSIB Pending
                        </Badge>
                        <Badge className="border-gray-300 bg-gray-100 text-xs font-semibold text-gray-500">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Insurance Pending
                        </Badge>
                      </div>
                    </>
                  )}
                </div>
              </Link>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* S5: Bottom CTA - Dual-Sided */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          <div className="grid gap-6 md:grid-cols-2">
            {/* Left: Homeowners */}
            <Card className="overflow-hidden rounded-2xl border border-reno-green/20 bg-gradient-to-br from-reno-green-light to-white shadow-lg">
              <div className="p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-reno-green/10">
                  <CheckCircle2 className="h-6 w-6 text-reno-green" />
                </div>
                <h2 className="font-display text-2xl font-bold text-reno-dark">
                  Found someone you like?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  Start a project with escrow protection. Your money is held safely until each milestone is verified.
                </p>
                <Button
                  asChild
                  className="mt-6 w-full rounded-xl bg-reno-green px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-reno-green/90 md:w-auto"
                >
                  <Link href="/price-check">Start Project</Link>
                </Button>
              </div>
            </Card>

            {/* Right: Contractors */}
            <Card className="overflow-hidden rounded-2xl border border-reno-purple/20 bg-gradient-to-br from-reno-purple-light to-white shadow-lg">
              <div className="p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-reno-purple/10">
                  <TrendingUp className="h-6 w-6 text-reno-purple" />
                </div>
                <h2 className="font-display text-2xl font-bold text-reno-dark">
                  Want to be listed here with verified stats?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  Join the network. Get verified, build your reputation with real project data, and attract quality clients.
                </p>
                <Button
                  asChild
                  className="mt-6 w-full rounded-xl bg-reno-purple px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-reno-purple/90 md:w-auto"
                >
                  <Link href="/join">Apply</Link>
                </Button>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
