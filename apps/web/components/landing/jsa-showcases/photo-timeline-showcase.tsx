'use client';

import { useState } from 'react';
import { Camera, MapPin, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type FilterType = 'all' | 'before' | 'during' | 'after';

const filters: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'before', label: 'Before' },
  { value: 'during', label: 'During' },
  { value: 'after', label: 'After' },
];

const photos = [
  {
    id: 1,
    title: 'Before — Bare basement',
    date: 'Nov 15',
    coordinates: '43.6532°N, 79.3832°W',
    stage: 'before' as const,
    stageColor: 'bg-gray-100 text-gray-700',
  },
  {
    id: 2,
    title: 'Demo complete',
    date: 'Nov 22',
    coordinates: '43.6532°N, 79.3832°W',
    stage: 'during' as const,
    stageColor: 'bg-reno-teal-light text-reno-teal',
  },
  {
    id: 3,
    title: 'Framing started',
    date: 'Dec 3',
    coordinates: '43.6532°N, 79.3832°W',
    stage: 'during' as const,
    stageColor: 'bg-reno-teal-light text-reno-teal',
  },
  {
    id: 4,
    title: 'Electrical rough-in',
    date: 'Jan 15',
    coordinates: '43.6532°N, 79.3832°W',
    stage: 'during' as const,
    stageColor: 'bg-reno-teal-light text-reno-teal',
  },
  {
    id: 5,
    title: 'Plumbing rough-in',
    date: 'Jan 28',
    coordinates: '43.6532°N, 79.3832°W',
    stage: 'during' as const,
    stageColor: 'bg-reno-teal-light text-reno-teal',
  },
  {
    id: 6,
    title: 'Insulation',
    date: 'Feb 10',
    coordinates: '43.6532°N, 79.3832°W',
    stage: 'during' as const,
    stageColor: 'bg-reno-teal-light text-reno-teal',
  },
];

export function PhotoTimelineShowcase() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredPhotos =
    activeFilter === 'all'
      ? photos
      : photos.filter((photo) => photo.stage === activeFilter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Progress Photos</h3>
          <p className="mt-1 text-sm text-gray-600">47 GPS-Verified Photos</p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                activeFilter === filter.value
                  ? 'bg-reno-teal text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Photo grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPhotos.map((photo) => (
          <Card
            key={photo.id}
            className="group overflow-hidden border-2 border-gray-200 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Photo placeholder with overlay */}
            <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200">
              {/* Camera icon placeholder */}
              <div className="flex h-full items-center justify-center">
                <Camera className="h-12 w-12 text-gray-400" />
              </div>

              {/* Stage badge overlay */}
              <div className="absolute left-3 top-3">
                <Badge className={cn('text-xs font-semibold', photo.stageColor)}>
                  {photo.stage.charAt(0).toUpperCase() + photo.stage.slice(1)}
                </Badge>
              </div>

              {/* GPS indicator overlay */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1.5 backdrop-blur-sm">
                <MapPin className="h-3 w-3 text-white" />
                <span className="text-xs font-medium text-white">GPS</span>
              </div>
            </div>

            {/* Photo info */}
            <div className="p-4">
              <h4 className="font-semibold text-gray-900">{photo.title}</h4>
              <div className="mt-2 space-y-1 text-xs text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Camera className="h-3 w-3" />
                  <span>{photo.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3 w-3" />
                  <span className="font-mono">{photo.coordinates}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Trust message */}
      <div className="rounded-lg border-2 border-reno-green/20 bg-gradient-to-r from-reno-green-light to-white p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-reno-green text-white">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">GPS-Verified & Timestamped</h4>
            <p className="mt-1 text-sm text-gray-700">
              All photos include GPS coordinates, timestamp, and worker ID. Every image is
              verified and cannot be altered or backdated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
