import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Safety Inspection Checklist | RenoNext',
  description: 'OHSA-aligned construction safety checklists for ladders, scaffolds, excavation, electrical, fall protection, and more. Free tool with printable inspection reports.',
  openGraph: {
    title: 'Safety Inspection Checklist | RenoNext',
    description: 'OHSA-aligned construction safety checklists for ladders, scaffolds, excavation, electrical, fall protection, and more. Free tool with printable inspection reports.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
