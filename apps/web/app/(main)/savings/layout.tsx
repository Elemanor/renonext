import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Renovation Savings & Rebates | RenoNext',
  description: 'Explore Ontario renovation rebates, grants, and incentive programs. Save thousands on home improvements with government and utility rebates.',
  openGraph: {
    title: 'Renovation Savings & Rebates | RenoNext',
    description: 'Explore Ontario renovation rebates, grants, and incentive programs. Save thousands on home improvements with government and utility rebates.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
