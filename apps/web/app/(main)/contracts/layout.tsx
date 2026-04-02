import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Renovation Contract Generator — Ontario 2026 | RenoNext',
  description: 'Generate professional renovation contracts instantly. CPA-compliant templates with milestone schedules, HST calculations, and escrow integration for Ontario homeowners and contractors.',
  alternates: {
    canonical: '/contracts',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
