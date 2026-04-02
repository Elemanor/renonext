import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Log In | RenoNext',
  description: 'Access your RenoNext account. Manage renovation projects, track progress, communicate with contractors, and monitor escrow payments.',
  openGraph: {
    title: 'Log In | RenoNext',
    description: 'Access your RenoNext account. Manage renovation projects, track progress, communicate with contractors, and monitor escrow payments.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
