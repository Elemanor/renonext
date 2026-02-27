import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Browse Verified Pros | RenoNext',
  description: 'Verified work, not profiles. Every photo GPS-tagged from a real job site. Every rating linked to a verified milestone. Every stat calculated from actual project data.',
};

export default function ProsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
