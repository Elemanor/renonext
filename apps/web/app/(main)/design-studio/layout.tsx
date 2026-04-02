import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Design Studio | RenoNext',
  description: 'Visualize your renovation with RenoNext Design Studio. Explore materials, finishes, and layouts before you build with our interactive planning tools.',
  openGraph: {
    title: 'Design Studio | RenoNext',
    description: 'Visualize your renovation with RenoNext Design Studio. Explore materials, finishes, and layouts before you build with our interactive planning tools.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
