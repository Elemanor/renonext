'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { AssemblyViewerStub } from '@/components/proposal/assembly-viewer-stub';
import type { AssemblyViewerProps } from './assembly-viewer';

const AssemblyViewerLazy = dynamic(
  () =>
    import('./assembly-viewer').then((mod) => ({
      default: mod.AssemblyViewer,
    })),
  { ssr: false, loading: () => null },
);

function useShouldSkip3D() {
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

export function AssemblyViewerLoader(props: AssemblyViewerProps) {
  const skip = useShouldSkip3D();

  // null = not yet mounted; avoids hydration mismatch (server renders null)
  if (skip === null) return null;

  // reduced motion or Save-Data → show static stub, Three.js bundle never downloaded
  if (skip) return <AssemblyViewerStub stepCount={props.steps.length} />;

  return <AssemblyViewerLazy {...props} />;
}
