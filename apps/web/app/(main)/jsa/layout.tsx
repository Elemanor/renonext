import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSA Form Generator | RenoNext',
  description: 'Generate professional Job Safety Analysis forms with pre-built templates for construction trades. OHSA-compliant hazard identification and safety controls.',
  openGraph: {
    title: 'JSA Form Generator | RenoNext',
    description: 'Generate professional Job Safety Analysis forms with pre-built templates for construction trades. OHSA-compliant hazard identification and safety controls.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
