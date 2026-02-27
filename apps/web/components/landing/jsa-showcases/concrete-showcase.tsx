'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Truck, CheckCircle2, Clock, Calendar } from 'lucide-react';

export function ConcreteShowcase() {
  const deliveries = [
    {
      time: '7:00 AM',
      truck: 'Truck #1',
      volume: '30m³',
      strength: '32 MPa',
      area: 'GEB Foundation B2',
      status: 'delivered',
      statusLabel: '✓ Delivered',
      details: 'Slump: 120mm • Air: 5.5%',
      color: 'bg-reno-green-50 text-reno-green-700 border-reno-green-200',
    },
    {
      time: '10:30 AM',
      truck: 'Truck #2',
      volume: '25m³',
      strength: '25 MPa',
      area: 'RPS Walls',
      status: 'transit',
      statusLabel: '🚛 In Transit',
      details: 'ETA: 12 minutes',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      time: '2:00 PM',
      truck: 'Truck #3',
      volume: '30m³',
      strength: '32 MPa',
      area: 'GEB Slab A',
      status: 'scheduled',
      statusLabel: '⏳ Scheduled',
      details: 'Supplier confirmed',
      color: 'bg-gray-100 text-gray-700 border-gray-300',
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-reno-dark text-white px-6 py-4">
        <div className="flex items-center gap-2 mb-1">
          <Truck className="w-5 h-5" />
          <h3 className="font-semibold text-lg">Concrete Schedule</h3>
        </div>
        <p className="text-sm text-gray-400">Thursday, February 27, 2026</p>
      </div>

      <div className="p-6 space-y-6 bg-gray-50">
        {/* Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-900">3</div>
              <div className="text-xs text-blue-700 font-medium">Deliveries</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-900">85m³</div>
              <div className="text-xs text-blue-700 font-medium">Total Volume</div>
            </div>
            <div>
              <div className="text-xs text-blue-900 font-semibold mt-1">Dufferin Concrete</div>
              <div className="text-xs text-blue-700">Supplier</div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-4 relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-gray-300" />

          {deliveries.map((delivery, idx) => (
            <div key={idx} className="relative">
              <Card className="p-4 bg-white border-gray-200 ml-12">
                {/* Time marker */}
                <div className="absolute left-0 -ml-12 top-4 w-10 h-10 rounded-full bg-reno-dark flex items-center justify-center text-white font-semibold text-xs z-10">
                  {delivery.time.split(' ')[0]}
                </div>

                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{delivery.truck}</div>
                      <div className="text-xs text-gray-600 mt-0.5">
                        {delivery.volume} • {delivery.strength}
                      </div>
                    </div>
                    <Badge className={`${delivery.color} border text-xs font-medium`}>
                      {delivery.statusLabel}
                    </Badge>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-200">
                    <div className="text-xs font-medium text-gray-700 mb-1">
                      Area: {delivery.area}
                    </div>
                    <div className="text-xs text-gray-600">{delivery.details}</div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
