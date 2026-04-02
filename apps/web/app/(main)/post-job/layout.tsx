import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Post a Job | RenoNext',
  description: 'Post your renovation project on RenoNext. Get bids from verified Ontario contractors with WSIB coverage, insurance, and proven track records.',
  openGraph: {
    title: 'Post a Job | RenoNext',
    description: 'Post your renovation project on RenoNext. Get bids from verified Ontario contractors with WSIB coverage, insurance, and proven track records.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
