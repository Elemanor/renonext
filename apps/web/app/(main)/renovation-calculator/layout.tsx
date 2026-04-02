import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Basement Renovation Cost Calculator | Free Estimate | RenoNext',
  description: 'Free basement renovation cost calculator for GTA homeowners. Estimate costs by city, size, finish level, and add-ons. City-adjusted pricing for 15 Ontario cities.',
  alternates: {
    canonical: 'https://renonext.com/renovation-calculator',
  },
  openGraph: {
    title: 'Basement Renovation Cost Calculator | Free Estimate | RenoNext',
    description: 'Free basement renovation cost calculator for GTA homeowners. Estimate costs by city, size, finish level, and add-ons.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
