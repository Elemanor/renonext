'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Clock,
  FileText,
  Camera,
  Package,
  Droplets,
  AlertTriangle,
  Wind,
  Sun,
  Users,
  Truck,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function ForemanDashboardShowcase() {
  const quickActions = [
    { icon: Clock, label: 'Clock In/Out', color: 'bg-reno-green-50 text-reno-green-700' },
    { icon: FileText, label: 'JSA Form', color: 'bg-reno-teal-50 text-reno-teal-700' },
    { icon: Camera, label: 'Photos', color: 'bg-reno-purple-50 text-reno-purple-700' },
    { icon: Package, label: 'Material Request', color: 'bg-reno-amber-50 text-reno-amber-700' },
    { icon: Droplets, label: 'Concrete', color: 'bg-blue-50 text-blue-700' },
    { icon: AlertTriangle, label: 'Deficiency', color: 'bg-reno-red-50 text-reno-red-700' },
  ];

  const workAreas = [
    {
      name: 'GEB — Formwork B2',
      stage: 'Rebar',
      progress: 65,
      workers: 4,
      foreman: 'Marcus J.',
    },
    {
      name: 'RPS — Foundation Walls',
      stage: 'Concrete Pour',
      progress: 40,
      workers: 6,
      foreman: 'Jake W.',
    },
    {
      name: 'GEB — Slab on Grade A',
      stage: 'Curing',
      progress: 90,
      workers: 2,
      foreman: 'Marcus J.',
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      {/* Top Bar */}
      <div className="bg-reno-dark text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-reno-green rounded-lg flex items-center justify-center font-bold text-lg">
            MJR
          </div>
          <div>
            <div className="font-semibold text-sm">MJR Construction</div>
            <div className="text-xs text-gray-400">Foreman Dashboard</div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-yellow-400" />
            <span>-2°C</span>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-blue-400" />
            <span>12 km/h NW</span>
          </div>
          <div className="font-semibold">8:47 AM EST</div>
        </div>
      </div>

      <div className="p-6 space-y-6 bg-gray-50">
        {/* Quick Actions */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow flex flex-col items-center gap-2 text-center"
              >
                <div className={cn('p-2 rounded-lg', action.color)}>
                  <action.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-gray-700">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Work Areas */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Active Work Areas</h3>
          <div className="space-y-3">
            {workAreas.map((area, idx) => (
              <Card key={idx} className="p-4 bg-white border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{area.name}</div>
                    <div className="text-xs text-gray-600 mt-0.5">Stage: {area.stage}</div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {area.progress}%
                  </Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
                  <div
                    className="bg-reno-green h-1.5 rounded-full transition-all"
                    style={{ width: `${area.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>{area.workers} workers</span>
                  </div>
                  <div>Foreman: {area.foreman}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Today's Concrete */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-700" />
              <div>
                <div className="font-semibold text-sm text-blue-900">Today's Concrete</div>
                <div className="text-xs text-blue-700">2 deliveries • 45m³ total</div>
              </div>
            </div>
            <div className="text-xs font-medium text-blue-700">Next: 10:30 AM</div>
          </div>
        </div>

        {/* Cert Alerts */}
        <div className="bg-reno-red-50 border border-reno-red-200 rounded-xl p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-reno-red" />
            <div className="flex-1">
              <div className="font-semibold text-sm text-reno-red-800">Certificate Alerts</div>
              <div className="text-xs text-reno-red-600">2 expiring soon • 1 expired</div>
            </div>
            <button className="text-xs font-medium text-reno-red hover:underline">
              Review →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
