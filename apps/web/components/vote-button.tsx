'use client';

import { useState } from 'react';
import { ArrowBigUp, ArrowBigDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoteButtonProps {
  upvotes: number;
  downvotes: number;
  userVote?: 'up' | 'down' | null;
  onVote?: (direction: 'up' | 'down') => void;
  layout?: 'vertical' | 'horizontal';
  size?: 'sm' | 'md';
}

export function VoteButton({
  upvotes,
  downvotes,
  userVote: initialVote = null,
  onVote,
  layout = 'vertical',
  size = 'md',
}: VoteButtonProps) {
  const [vote, setVote] = useState(initialVote);
  const [counts, setCounts] = useState({ up: upvotes, down: downvotes });

  const netScore = counts.up - counts.down;

  const handleVote = (direction: 'up' | 'down') => {
    if (vote === direction) {
      // Unvote
      setVote(null);
      setCounts((prev) => ({
        ...prev,
        [direction === 'up' ? 'up' : 'down']: prev[direction === 'up' ? 'up' : 'down'] - 1,
      }));
    } else {
      // Switch or new vote
      const oldVote = vote;
      setVote(direction);
      setCounts((prev) => {
        const next = { ...prev };
        if (oldVote === 'up') next.up -= 1;
        if (oldVote === 'down') next.down -= 1;
        if (direction === 'up') next.up += 1;
        if (direction === 'down') next.down += 1;
        return next;
      });
    }
    onVote?.(direction);
  };

  const iconSize = size === 'sm' ? 'h-5 w-5' : 'h-6 w-6';

  return (
    <div
      className={cn(
        'flex items-center gap-1',
        layout === 'vertical' ? 'flex-col' : 'flex-row'
      )}
    >
      <button
        type="button"
        onClick={() => handleVote('up')}
        className={cn(
          'rounded-md p-1 transition-all duration-150',
          vote === 'up'
            ? 'bg-orange-100 text-orange-600'
            : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
        )}
      >
        <ArrowBigUp
          className={cn(iconSize, vote === 'up' && 'fill-current')}
        />
      </button>

      <span
        className={cn(
          'min-w-[2ch] text-center text-sm font-bold tabular-nums',
          vote === 'up' && 'text-orange-600',
          vote === 'down' && 'text-blue-600',
          !vote && 'text-gray-700'
        )}
      >
        {netScore}
      </span>

      <button
        type="button"
        onClick={() => handleVote('down')}
        className={cn(
          'rounded-md p-1 transition-all duration-150',
          vote === 'down'
            ? 'bg-blue-100 text-blue-600'
            : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
        )}
      >
        <ArrowBigDown
          className={cn(iconSize, vote === 'down' && 'fill-current')}
        />
      </button>
    </div>
  );
}
