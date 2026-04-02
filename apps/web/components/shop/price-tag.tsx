import { formatPrice, calculateSavings } from '@/lib/shop/helpers';
import { Badge } from '@/components/ui/badge';

interface PriceTagProps {
  priceCents: number;
  compareAtCents?: number | null;
  currency?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function PriceTag({
  priceCents,
  compareAtCents,
  currency = 'CAD',
  size = 'md',
}: PriceTagProps) {
  const savings = compareAtCents ? calculateSavings(priceCents, compareAtCents) : 0;

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  const compareAtSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Current Price */}
      <span className={`${sizeClasses[size]} font-bold text-reno-primary`}>
        {formatPrice(priceCents, currency)}
      </span>

      {/* Compare At Price */}
      {compareAtCents && compareAtCents > priceCents && (
        <>
          <span className={`${compareAtSizeClasses[size]} text-gray-400 line-through`}>
            {formatPrice(compareAtCents, currency)}
          </span>

          {/* Savings Badge */}
          {savings > 0 && (
            <Badge variant="destructive" className="bg-red-500 text-white">
              Save {savings}%
            </Badge>
          )}
        </>
      )}
    </div>
  );
}
