import type { Metadata } from 'next';
import { PlatformPage } from '@/components/platform/platform-page';

export const metadata: Metadata = {
  title: 'Site Command — Field Operations Platform | RenoNext',
  description: 'GPS attendance, safety forms, concrete tracking, scheduling, RFIs — one app for your entire site. Zero paper. Automatic proof for homeowners.',
};

export default function Platform() {
  return <PlatformPage />;
}
