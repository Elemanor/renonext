import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Start Your Renovation Project | RenoNext',
  description: 'Begin your Ontario renovation with RenoNext. Get matched with verified contractors, secure escrow protection, and manage your project from start to finish.',
  openGraph: {
    title: 'Start Your Renovation Project | RenoNext',
    description: 'Begin your Ontario renovation with RenoNext. Get matched with verified contractors, secure escrow protection, and manage your project from start to finish.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
