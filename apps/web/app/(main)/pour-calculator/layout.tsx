import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Concrete Pour Calculator | RenoNext',
  description: 'Calculate concrete volume for slabs, footings, columns, and steps. Get cubic yards, bag count, truck requirements, and estimated cost for Ontario projects.',
  openGraph: {
    title: 'Concrete Pour Calculator | RenoNext',
    description: 'Calculate concrete volume for slabs, footings, columns, and steps. Get cubic yards, bag count, truck requirements, and estimated cost for Ontario projects.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
