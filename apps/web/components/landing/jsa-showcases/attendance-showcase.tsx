'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, MapPin, Calendar } from 'lucide-react';

export function AttendanceShowcase() {
  const stats = [
    { label: 'Present', count: 12, color: 'bg-reno-green-50 text-reno-green-700 border-reno-green-200' },
    { label: 'Absent', count: 2, color: 'bg-reno-red-50 text-reno-red-700 border-reno-red-200' },
    { label: 'Vacation', count: 1, color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { label: 'Total', count: 15, color: 'bg-gray-100 text-gray-700 border-gray-300' },
  ];

  const workers = [
    {
      name: 'Marcus Johnson',
      role: 'Foreman',
      status: 'present',
      time: '7:02 AM',
      initials: 'MJ',
      color: 'bg-reno-green-600',
    },
    {
      name: 'Jake Williams',
      role: 'Carpenter',
      status: 'present',
      time: '7:15 AM',
      initials: 'JW',
      color: 'bg-reno-teal-600',
    },
    {
      name: 'Sofia Martinez',
      role: 'Labourer',
      status: 'present',
      time: '7:20 AM',
      initials: 'SM',
      color: 'bg-reno-purple-600',
    },
    {
      name: 'David Park',
      role: 'Electrician',
      status: 'present',
      time: '7:45 AM',
      initials: 'DP',
      color: 'bg-reno-amber-600',
    },
    {
      name: 'Robert Kim',
      role: 'Plumber',
      status: 'absent',
      time: 'No show',
      initials: 'RK',
      color: 'bg-gray-400',
    },
    {
      name: 'Jennifer Lee',
      role: 'Safety Officer',
      status: 'present',
      time: '6:55 AM',
      initials: 'JL',
      color: 'bg-blue-600',
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-reno-dark text-white px-6 py-4">
        <div className="flex items-center gap-2 mb-1">
          <Calendar className="w-5 h-5" />
          <h3 className="font-semibold text-lg">Site Attendance</h3>
        </div>
        <p className="text-sm text-gray-400">February 27, 2026 • GEBOOTH Project</p>
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

        {/* Worker List */}
        <div className="space-y-2">
          {workers.map((worker, idx) => (
            <Card key={idx} className="p-3 bg-white border-gray-200">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${worker.color}`}
                >
                  {worker.initials}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-gray-900">{worker.name}</div>
                  <div className="text-xs text-gray-600">{worker.role}</div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2">
                  {worker.status === 'present' ? (
                    <>
                      <Badge variant="secondary" className="bg-reno-green-50 text-reno-green-700 text-xs">
                        ✓ {worker.time}
                      </Badge>
                      <MapPin className="w-4 h-4 text-reno-green shrink-0" />
                    </>
                  ) : (
                    <Badge variant="secondary" className="bg-reno-red-50 text-reno-red-700 text-xs">
                      ✗ {worker.time}
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* GPS Accuracy */}
        <div className="bg-reno-green-50 border border-reno-green-200 rounded-lg p-3 flex items-center justify-center gap-2">
          <MapPin className="w-4 h-4 text-reno-green" />
          <span className="text-sm font-medium text-reno-green-800">GPS accuracy: ±3m</span>
        </div>
      </div>
    </div>
  );
}
