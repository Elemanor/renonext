'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error boundary caught:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#1A1A1A',
            color: '#F6F5F1',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            padding: '24px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              maxWidth: '600px',
            }}
          >
            <h1
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                marginBottom: '16px',
                color: '#1D6B3F',
              }}
            >
              Something went wrong
            </h1>
            <p
              style={{
                fontSize: '18px',
                marginBottom: '32px',
                opacity: 0.8,
              }}
            >
              We're sorry for the inconvenience. Please try refreshing the page.
            </p>
            <button
              onClick={reset}
              style={{
                backgroundColor: '#1D6B3F',
                color: 'white',
                padding: '12px 32px',
                fontSize: '16px',
                fontWeight: '600',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#155a33';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#1D6B3F';
              }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
