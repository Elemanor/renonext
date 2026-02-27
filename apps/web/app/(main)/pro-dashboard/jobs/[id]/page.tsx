import { ProJobDetailContent } from './pro-job-detail-content';

interface ProJobDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProJobDetailPage({
  params,
}: ProJobDetailPageProps) {
  const resolvedParams = await params;
  return <ProJobDetailContent jobId={resolvedParams.id} />;
}
