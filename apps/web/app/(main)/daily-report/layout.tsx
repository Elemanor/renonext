import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daily Field Report Generator | RenoNext',
  description: 'Create professional daily construction reports in minutes. Fill in site data, weather, crew details, and work progress — free tool, no sign-up required.',
  openGraph: {
    title: 'Daily Field Report Generator | RenoNext',
    description: 'Create professional daily construction reports in minutes. Fill in site data, weather, crew details, and work progress — free tool, no sign-up required.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
