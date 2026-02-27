'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, CheckCircle2, XCircle, AlertTriangle, Calendar } from 'lucide-react';

export function CertExpiryShowcase() {
  const stats = [
    { label: 'Total', count: 47, color: 'bg-gray-100 text-gray-700 border-gray-300' },
    { label: 'Valid', count: 43, color: 'bg-reno-green-50 text-reno-green-700 border-reno-green-200' },
    { label: 'Expiring', count: 3, color: 'bg-reno-amber-50 text-reno-amber-700 border-reno-amber-200' },
    { label: 'Expired', count: 1, color: 'bg-reno-red-50 text-reno-red-700 border-reno-red-200' },
  ];

  const certificates = [
    {
      name: 'Marcus Johnson',
      cert: 'Working at Heights',
      expiry: 'Mar 15, 2028',
      status: 'valid',
      statusLabel: '✓ Valid',
      statusColor: 'bg-reno-green-50 text-reno-green-700 border-reno-green-200',
      initials: 'MJ',
      color: 'bg-reno-green-600',
    },
    {
      name: 'Jake Williams',
      cert: 'WHMIS',
      expiry: 'Jan 10, 2026',
      status: 'expired',
      statusLabel: '✗ EXPIRED',
      statusColor: 'bg-reno-red-50 text-reno-red-700 border-reno-red-200',
      initials: 'JW',
      color: 'bg-gray-400',
      pulse: true,
    },
    {
      name: 'Sofia Martinez',
      cert: 'Confined Spaces',
      expiry: 'Apr 20, 2026',
      status: 'expiring',
      statusLabel: '⚠ 52 days',
      statusColor: 'bg-reno-amber-50 text-reno-amber-700 border-reno-amber-200',
      initials: 'SM',
      color: 'bg-reno-purple-600',
    },
    {
      name: 'David Park',
      cert: 'First Aid & CPR',
      expiry: 'May 01, 2026',
      status: 'expiring',
      statusLabel: '⚠ 63 days',
      statusColor: 'bg-reno-amber-50 text-reno-amber-700 border-reno-amber-200',
      initials: 'DP',
      color: 'bg-reno-amber-600',
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-reno-dark text-white px-6 py-4">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5" />
          <div>
            <h3 className="font-semibold text-lg">Certificate Tracking</h3>
            <p className="text-xs text-gray-400">Crew Certifications & Expiry Status</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 bg-gray-50">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`border rounded-lg px-3 py-2 text-center ${stat.color}`}
            >
              <div className="text-2xl font-bold">{stat.count}</div>
              <div className="text-xs font-medium mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Certificate Cards */}
        <div className="space-y-3">
          {certificates.map((cert, idx) => (
            <Card
              key={idx}
              className={`p-4 bg-white border-gray-200 ${
                cert.pulse ? 'animate-pulse' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0 ${cert.color}`}
                >
                  {cert.initials}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="font-semibold text-sm text-gray-900">{cert.name}</div>
                      <div className="text-xs text-gray-600">{cert.cert}</div>
                    </div>
                    <Badge className={`${cert.statusColor} border text-xs font-medium shrink-0`}>
                      {cert.statusLabel}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Expires: {cert.expiry}</span>
                  </div>

                  {cert.status === 'expired' && (
                    <div className="mt-2 bg-reno-red-50 border border-reno-red-200 rounded px-2 py-1 text-xs text-reno-red-700 font-medium">
                      Action required: Worker must not perform related tasks
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
          <p className="text-xs text-blue-700 font-medium">
            System automatically notifies workers 90 days before expiry
          </p>
        </div>
      </div>
    </div>
  );
}
