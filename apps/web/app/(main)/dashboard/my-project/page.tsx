import type { Metadata } from 'next';
import { getMockHomeownerDashboard } from '@/lib/mock-data/homeowner-dashboard';
import { MyProjectContent } from './my-project-content';

export const metadata: Metadata = {
  title: 'My Project — RenoNext',
};

export default async function MyProjectPage() {
  // TODO: fetch real data with fetchProjectCommandCenter + extras
  // For now, always use mock data
  const data = getMockHomeownerDashboard();

  return <MyProjectContent data={data} />;
}
