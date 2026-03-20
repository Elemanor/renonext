import { HeroFloating } from '@/components/landing/hero-floating';
import { SecurityPillars } from '@/components/landing/security-pillars';

import { TrustProtocol } from '@/components/landing/trust-protocol';
import { ProjectShowcase } from '@/components/landing/project-showcase';
import { AudienceSplit } from '@/components/landing/audience-split';
import { TrustCredibility } from '@/components/landing/trust-credibility';
import { ProsPreview } from '@/components/landing/pros-preview';
import { FinalCtaAnimated } from '@/components/landing/final-cta-animated';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroFloating />
      <SecurityPillars />
      <TrustProtocol />
      <ProjectShowcase />
      <AudienceSplit />
      <TrustCredibility />
      <ProsPreview />
      <FinalCtaAnimated />
    </div>
  );
}
