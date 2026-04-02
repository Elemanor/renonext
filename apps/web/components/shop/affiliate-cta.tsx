import { Button } from '@/components/ui/button';

interface ProductCtaProps {
  stockStatus?: string;
}

export function AffiliateCTA({ stockStatus = 'in_stock' }: ProductCtaProps) {
  const isInStock = stockStatus !== 'out_of_stock';

  return (
    <div className="space-y-4">
      {/* Primary: Inquiry / Contact */}
      <Button
        size="lg"
        className="w-full bg-reno-primary hover:bg-reno-primary/90 text-white"
        disabled={!isInStock}
      >
        <span className="material-symbols-outlined mr-2">mail</span>
        {isInStock ? 'Inquire About This Product' : 'Out of Stock'}
      </Button>

      {/* Trust signals */}
      <div className="flex items-center justify-center gap-6 text-xs text-gray-500 pt-2">
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">local_shipping</span>
          Free GTA delivery
        </span>
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">verified</span>
          Quality checked
        </span>
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">undo</span>
          Easy returns
        </span>
      </div>
    </div>
  );
}
