'use client';

import { useCallback, useEffect } from 'react';
import { Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';

interface ImageLightboxProps {
  images: string[];
  activeIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (index: number) => void;
}

export function ImageLightbox({ images, activeIndex, open, onOpenChange, onNavigate }: ImageLightboxProps) {
  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < images.length - 1;

  const goPrev = useCallback(() => {
    if (hasPrev) onNavigate(activeIndex - 1);
  }, [hasPrev, activeIndex, onNavigate]);

  const goNext = useCallback(() => {
    if (hasNext) onNavigate(activeIndex + 1);
  }, [hasNext, activeIndex, onNavigate]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, goPrev, goNext]);

  const currentImage = images[activeIndex];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0">
        <DialogTitle className="sr-only">
          Photo {activeIndex + 1} of {images.length}
        </DialogTitle>
        <div className="relative flex min-h-[300px] items-center justify-center bg-black/5 sm:min-h-[400px]">
          {/* Placeholder — in production this would be <Image /> */}
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <Camera className="h-12 w-12" />
            <p className="text-sm">{currentImage}</p>
            <p className="text-xs">Photo {activeIndex + 1} of {images.length}</p>
          </div>

          {/* Navigation */}
          {hasPrev && (
            <button
              onClick={goPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md transition-all hover:bg-white"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          {hasNext && (
            <button
              onClick={goNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md transition-all hover:bg-white"
              aria-label="Next photo"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
