import { HeroFloating } from '@/components/landing/hero-floating';
import { PainPoints } from '@/components/landing/pain-points';

import { VaultSection } from '@/components/landing/vault-section';
import { HouseFaxKicker } from '@/components/landing/housefax-kicker';
import { AudienceSplit } from '@/components/landing/audience-split';
import { TrustCredibility } from '@/components/landing/trust-credibility';
import { ProsPreview } from '@/components/landing/pros-preview';
import { FinalCtaAnimated } from '@/components/landing/final-cta-animated';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroFloating />
      <PainPoints />
      <VaultSection />
      <HouseFaxKicker />
      <AudienceSplit />
      <TrustCredibility />
      <ProsPreview />
      <FinalCtaAnimated />
    </div>
  );
}
