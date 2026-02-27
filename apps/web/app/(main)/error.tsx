'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error boundary caught:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-reno-dark px-6">
      <div className="text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-reno-green/10">
          <svg
            className="h-10 w-10 text-reno-green"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h1 className="mt-6 font-display text-4xl font-bold text-reno-cream">
          Something went wrong
        </h1>
        <p className="mt-2 text-lg text-reno-cream/70">
          We're sorry for the inconvenience. Please try again.
        </p>
        {error.digest && (
          <p className="mt-2 text-sm text-reno-cream/50">
            Error ID: {error.digest}
          </p>
        )}
        <div className="mt-8 flex gap-4 justify-center">
          <Button
            onClick={reset}
            size="lg"
            className="bg-reno-green hover:bg-reno-green/90"
          >
            Try again
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-reno-cream/20 text-reno-cream hover:bg-reno-cream/10"
          >
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
