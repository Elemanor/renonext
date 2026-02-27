'use client';

import { useState } from 'react';
import { Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const photos = [
  { id: '1', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop', date: 'Feb 18, 2026', description: 'Foundation excavation complete. Ready for concrete pour.' },
  { id: '2', url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop', date: 'Feb 22, 2026', description: 'Framing progressing ahead of schedule. All main beams installed.' },
  { id: '3', url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop', date: 'Feb 24, 2026', description: 'Interior walls going up. Electrical rough-in started today.' },
  { id: '4', url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop', date: 'Today', description: 'Exterior taking shape! Roof sheathing complete, siding begins tomorrow.' },
];

export function ProgressPhotos() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextPhoto = () => setCurrentIndex((p) => (p + 1) % photos.length);
  const prevPhoto = () => setCurrentIndex((p) => (p - 1 + photos.length) % photos.length);

  return (
    <div className="bg-[#141419] rounded-xl p-4 lg:p-3 border border-white/[0.06] shadow-lg shadow-black/20 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3 lg:mb-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center">
            <Camera className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <h2 className="text-white/90 text-sm tracking-tight">Progress Photos</h2>
        </div>
        <span className="text-gray-500 text-[11px]">{currentIndex + 1} / {photos.length}</span>
      </div>
      <div className="relative flex-1 flex flex-col min-h-0">
        <div className="relative rounded-lg overflow-hidden bg-black/30 min-h-[160px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img key={currentIndex} src={photos[currentIndex].url} alt={photos[currentIndex].description} className="w-full h-full object-cover absolute inset-0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} />
          </AnimatePresence>
          {photos.length > 1 && (
            <>
              <button onClick={prevPhoto} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm flex items-center justify-center transition-colors">
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
              <button onClick={nextPhoto} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm flex items-center justify-center transition-colors">
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </>
          )}
          <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md">
            <span className="text-white text-[11px] font-medium">{photos[currentIndex].date}</span>
          </div>
        </div>
        <div className="mt-2 flex-shrink-0">
          <p className="text-gray-400 text-xs leading-relaxed lg:line-clamp-1">{photos[currentIndex].description}</p>
        </div>
        {photos.length > 1 && (
          <div className="flex gap-1.5 mt-2 justify-center flex-shrink-0">
            {photos.map((_, i) => (
              <button key={i} onClick={() => setCurrentIndex(i)} className={`h-1 rounded-full transition-all ${i === currentIndex ? 'w-6 bg-indigo-400' : 'w-1 bg-white/20'}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
