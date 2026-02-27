import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Price Check — What Should Your Renovation Cost? | RenoNext',
  description:
    'Not a quote. Not a guess. A fair market range based on real vault transaction data from the GTA. Answer 8 questions in under 2 minutes.',
};

export default function PriceCheckLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
