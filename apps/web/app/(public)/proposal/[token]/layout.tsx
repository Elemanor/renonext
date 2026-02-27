import type { Metadata } from 'next';
import { ProposalTopBar } from '@/components/proposal/proposal-top-bar';

export const metadata: Metadata = {
  title: 'Proposal',
};

export default function ProposalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-gray-50">
      <ProposalTopBar />
      {children}
    </div>
  );
}
