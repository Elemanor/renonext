'use client';

import dynamic from 'next/dynamic';

const DeckModelViewer = dynamic(
  () => import('./deck-model-viewer').then((m) => m.DeckModelViewer),
  {
    ssr: false,
    loading: () => (
      <div className="h-[400px] animate-pulse rounded-xl bg-slate-100" />
    ),
  },
);

interface DeckViewerWrapperProps {
  skpDownloadUrl?: string;
}

export function DeckViewerWrapper({ skpDownloadUrl }: DeckViewerWrapperProps) {
  return <DeckModelViewer skpDownloadUrl={skpDownloadUrl} />;
}
