'use client';

import { motion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
};

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  index?: number;
  pressable?: boolean;
}

export function AnimatedCard({ children, className = '', index = 0, pressable = true }: AnimatedCardProps) {
  return (
    <motion.div
      className={`h-full ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileTap={pressable ? { scale: 0.985 } : undefined}
    >
      {children}
    </motion.div>
  );
}
