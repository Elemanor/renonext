import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why RenoNext | RenoNext',
  description: 'Discover how RenoNext protects Ontario homeowners with escrow payments, verified contractors, digital paper trails, and guaranteed project completion.',
  openGraph: {
    title: 'Why RenoNext | RenoNext',
    description: 'Discover how RenoNext protects Ontario homeowners with escrow payments, verified contractors, digital paper trails, and guaranteed project completion.',
  },
};

export default function WhyRenoNextLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
