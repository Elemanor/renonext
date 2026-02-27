import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sample HouseFax™ Record | RenoNext',
  description:
    'See what a verified renovation record looks like. 47 GPS-verified photos, 6 city inspections, 24 tracked materials with warranties — all documented automatically.',
};

export default function SampleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
