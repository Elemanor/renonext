import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | RenoNext',
  description: 'Get in touch with RenoNext. Questions about renovations, contractor verification, or platform features? We are here to help Ontario homeowners.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us | RenoNext',
    description: 'Get in touch with RenoNext. Questions about renovations, contractor verification, or platform features? We are here to help Ontario homeowners.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
