import { HeroAnimated } from '@/components/landing/hero-animated';
import { PainPoints } from '@/components/landing/pain-points';
import { VaultSection } from '@/components/landing/vault-section';
import { HouseFaxKicker } from '@/components/landing/housefax-kicker';
import { AudienceSplit } from '@/components/landing/audience-split';
import { ProsPreview } from '@/components/landing/pros-preview';
import { FinalCtaAnimated } from '@/components/landing/final-cta-animated';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroAnimated />
      <PainPoints />
      <VaultSection />
      <HouseFaxKicker />
      <AudienceSplit />
      <ProsPreview />
      <FinalCtaAnimated />
    </div>
  );
}
