import { JobDetailContent } from './job-detail-content';

interface JobDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const resolvedParams = await params;
  return <JobDetailContent jobId={resolvedParams.id} />;
}
