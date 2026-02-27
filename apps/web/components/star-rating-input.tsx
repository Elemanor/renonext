'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingInputProps {
  value: number;
  onChange?: (value: number) => void;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};

export function StarRatingInput({
  value,
  onChange,
  size = 'md',
  readonly = false,
}: StarRatingInputProps) {
  const [hoverValue, setHoverValue] = useState(0);

  const displayValue = hoverValue || value;

  return (
    <div
      className={cn('flex gap-0.5', !readonly && 'cursor-pointer')}
      onMouseLeave={() => !readonly && setHoverValue(0)}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= Math.floor(displayValue);
        const halfFilled = !filled && readonly && star - 0.5 <= displayValue;

        return (
          <button
            key={star}
            type="button"
            disabled={readonly}
            className={cn(
              'relative transition-transform duration-150',
              !readonly && 'hover:scale-110 disabled:cursor-default'
            )}
            onMouseEnter={() => !readonly && setHoverValue(star)}
            onClick={() => !readonly && onChange?.(star)}
          >
            {/* Background (empty) star */}
            <Star className={cn(sizeClasses[size], 'text-gray-200')} />

            {/* Filled overlay */}
            {(filled || halfFilled) && (
              <Star
                className={cn(
                  sizeClasses[size],
                  'absolute inset-0 fill-amber-400 text-amber-400',
                  halfFilled && '[clip-path:inset(0_50%_0_0)]'
                )}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
