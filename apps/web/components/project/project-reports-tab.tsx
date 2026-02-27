'use client';

import { useState } from 'react';
import type { DailyReport } from '@renonext/shared/types';
import { FileText } from 'lucide-react';
import { DailyReportCard } from './daily-report-card';
import { ImageLightbox } from '@/components/ui/image-lightbox';
import { WebBarChart } from '@/components/charts/bar-chart';
import { CHART_COLORS } from '@renonext/shared/utils/chart-theme';
import { workerHoursPerReport } from '@/lib/mock-data/project-charts';

interface ProjectReportsTabProps {
  reports: DailyReport[];
}

export function ProjectReportsTab({ reports }: ProjectReportsTabProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (reports.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <FileText className="mb-3 h-10 w-10 text-gray-300" />
        <p className="text-sm font-medium text-gray-500">
          Project starts soon. First report coming soon.
        </p>
      </div>
    );
  }

  const latestDate = new Date(reports[0].created_at).toLocaleString('en-CA', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  const handleClickImage = (reportPhotos: string[], url: string) => {
    setLightboxImages(reportPhotos);
    setLightboxIndex(reportPhotos.indexOf(url));
    setLightboxOpen(true);
  };

  return (
    <div className="space-y-3">
      {/* Worker Hours Chart */}
      <WebBarChart
        title="Daily Worker Hours"
        data={workerHoursPerReport}
        xKey="date"
        yKeys={['hours']}
        height={160}
        colors={[CHART_COLORS.primary]}
        formatter={(v) => `${v}h total`}
        ariaLabel="Total worker hours per daily report"
      />

      <p className="text-xs text-gray-500">Latest update: {latestDate}</p>

      {reports.map((report) => (
        <DailyReportCard
          key={report.id}
          report={report}
          onClickImage={(url) => handleClickImage(report.photos, url)}
        />
      ))}

      <ImageLightbox
        images={lightboxImages}
        activeIndex={lightboxIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
