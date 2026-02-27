'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { ParticleFieldProps } from './particle-field';

const ParticleFieldLazy = dynamic(
  () => import('./particle-field').then((mod) => ({ default: mod.ParticleField })),
  { ssr: false, loading: () => null }
);

function useShouldSkipParticles() {
  const [skip, setSkip] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const check = () => {
      const reducedMotion = mq.matches;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const saveData = (navigator as any)?.connection?.saveData === true;
      setSkip(reducedMotion || saveData);
    };

    check();

    // Safari 13 and older browsers only support addListener/removeListener
    if (mq.addEventListener) {
      mq.addEventListener('change', check);
    } else {
      mq.addListener(check);
    }
    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener('change', check);
      } else {
        mq.removeListener(check);
      }
    };
  }, []);

  return skip;
}

export function ParticleFieldLoader(props: ParticleFieldProps) {
  const skip = useShouldSkipParticles();

  // null = not yet mounted; avoids hydration mismatch (server always renders null)
  // true = reduced motion or Save-Data; Three.js bundle never downloaded
  if (skip === null || skip) return null;

  return <ParticleFieldLazy {...props} />;
}
