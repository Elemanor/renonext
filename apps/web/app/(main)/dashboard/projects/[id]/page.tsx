import type { Metadata } from 'next';
import { getMockProjectCommandCenter, mockProject } from '@/lib/mock-data/project';
import {
  fetchProjectCommandCenter,
  fetchProjectTitle,
} from '@/lib/supabase/queries/project-command-center';
import { ProjectDetailContent } from './project-detail-content';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  // Try real data first, fall back to mock
  const title = await fetchProjectTitle(id).catch(() => null);
  if (title) return { title };

  if (id === mockProject.id) {
    return { title: mockProject.title };
  }
  return { title: 'Project' };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;

  // Try real data first, fall back to mock
  const data = await fetchProjectCommandCenter(id).catch(() => null);

  if (data) {
    return <ProjectDetailContent data={data} />;
  }

  // Fall back to mock data for development
  const mockData = getMockProjectCommandCenter(id);
  return <ProjectDetailContent data={mockData} />;
}
