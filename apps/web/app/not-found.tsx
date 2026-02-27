import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-reno-dark px-6">
      <div className="text-center">
        <h1 className="font-display text-9xl font-bold text-reno-green">404</h1>
        <p className="mt-4 text-2xl font-medium text-reno-cream">
          Page not found
        </p>
        <p className="mt-2 text-lg text-reno-cream/70">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-8">
          <Button asChild size="lg" className="bg-reno-green hover:bg-reno-green/90">
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
