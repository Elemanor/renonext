import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { ChevronRight, Check } from 'lucide-react';

interface SlideToActProps {
  label: string;
  onComplete: () => void;
  successLabel?: string;
  className?: string;
}

export function SlideToAct({
  label,
  onComplete,
  successLabel = 'Completed',
  className = '',
}: SlideToActProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  
  // Calculate drag constraints based on container width
  const [dragWidth, setDragWidth] = useState(0);
  
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setDragWidth(containerRef.current.offsetWidth - 56);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const opacity = useTransform(x, [0, dragWidth * 0.5], [1, 0]);
  const successOpacity = useTransform(x, [dragWidth * 0.8, dragWidth], [0, 1]);
  const scale = useTransform(x, [0, dragWidth], [1, 1.05]);

  const handleDragEnd = () => {
    if (x.get() >= dragWidth - 10) {
      setIsCompleted(true);
      onComplete();
    } else {
      animate(x, 0, { type: 'spring', stiffness: 300, damping: 30 });
    }
  };

  if (isCompleted) {
    return (
      <div className={`flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-500 font-bold text-white shadow-lg ${className}`}>
        <Check className="h-5 w-5" />
        <span>{successLabel}</span>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`relative h-14 w-full overflow-hidden rounded-xl bg-slate-100 p-1 shadow-inner ${className}`}
    >
      {/* Background track text */}
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-slate-400"
      >
        {label}
      </motion.div>

      {/* Slide handle */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: dragWidth }}
        dragElastic={0}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        style={{ x, scale }}
        className="relative z-10 flex h-12 w-12 cursor-grab items-center justify-center rounded-lg bg-white shadow-md active:cursor-grabbing"
      >
        <ChevronRight className="h-6 w-6 text-blue-600" />
      </motion.div>

      {/* Progress fill */}
      <motion.div 
        style={{ width: x, opacity: 0.2 }}
        className="absolute left-1 top-1 h-12 rounded-lg bg-blue-500"
      />
    </div>
  );
}
