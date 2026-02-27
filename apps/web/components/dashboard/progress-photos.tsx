'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedCard } from './animated-card';
import { progressPhotos } from '@/lib/mock-data/command-center';

export function ProgressPhotos() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const photo = progressPhotos[index];

  function go(dir: -1 | 1) {
    setDirection(dir);
    setIndex((prev) => (prev + dir + progressPhotos.length) % progressPhotos.length);
  }

  return (
    <AnimatedCard className="flex flex-col" delay={0.15}>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Camera className="h-4 w-4 text-gray-500" />
          <span className="text-xs font-medium text-white/80">Progress Photos</span>
        </div>
        <span className="text-[10px] text-gray-500">
          {index + 1} / {progressPhotos.length}
        </span>
      </div>

      {/* Photo area */}
      <div className="relative mb-3 overflow-hidden rounded-xl bg-gradient-to-br from-white/[0.04] to-white/[0.02]" style={{ aspectRatio: '16/10' }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={photo.id}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Placeholder gradient — replace with <Image> when real photos exist */}
            <div className="h-full w-full bg-gradient-to-br from-emerald-900/30 via-teal-900/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
              <p className="text-xs font-medium text-white/90">{photo.description}</p>
              <p className="text-[10px] text-gray-400">{photo.date}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Nav arrows */}
        <button
          onClick={() => go(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1 text-white/70 backdrop-blur-sm transition-colors hover:bg-black/60"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => go(1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1 text-white/70 backdrop-blur-sm transition-colors hover:bg-black/60"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5">
        {progressPhotos.map((p, i) => (
          <button
            key={p.id}
            onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? 'w-4 bg-emerald-400' : 'w-1.5 bg-gray-600'
            }`}
          />
        ))}
      </div>
    </AnimatedCard>
  );
}
