'use client';

import { usePathname } from 'next/navigation';

export function CanonicalURL() {
  const pathname = usePathname();
  return <link rel="canonical" href={`https://renonext.com${pathname}`} />;
}
