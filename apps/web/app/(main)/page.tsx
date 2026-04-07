import type { Metadata } from 'next';
import { HeroFloating } from '@/components/landing/hero-floating';
import { SecurityPillars } from '@/components/landing/security-pillars';
import { TrustProtocol } from '@/components/landing/trust-protocol';
import { ProjectShowcase } from '@/components/landing/project-showcase';
import { AudienceSplit } from '@/components/landing/audience-split';
import { ProsPreview } from '@/components/landing/pros-preview';
import { FinalCtaAnimated } from '@/components/landing/final-cta-animated';

export const metadata: Metadata = {
  title: 'RenoNext — Renovate with Proof, Not Promises',
  description: 'Ontario renovation platform with escrow protection, verified contractors, and every project documented. From permit to paint, one platform handles it all.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'RenoNext — Renovate with Proof, Not Promises',
    description: 'Ontario renovation platform with escrow protection, verified contractors, and every project documented. From permit to paint, one platform handles it all.',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <HeroFloating />
      <SecurityPillars />
      <TrustProtocol />
      <ProjectShowcase />
      <AudienceSplit />
      <ProsPreview />
      <FinalCtaAnimated />
    </div>
  );
}
