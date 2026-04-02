import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Toolbox Talk Generator | RenoNext',
  description: 'Create professional Weekly Toolbox Safety Meeting forms with 35+ pre-built safety topics. Free tool with attendance tracking and printable sign-in sheets.',
  openGraph: {
    title: 'Toolbox Talk Generator | RenoNext',
    description: 'Create professional Weekly Toolbox Safety Meeting forms with 35+ pre-built safety topics. Free tool with attendance tracking and printable sign-in sheets.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
