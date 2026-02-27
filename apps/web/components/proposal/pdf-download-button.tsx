'use client';

import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PdfDownloadButtonProps {
  token: string;
  className?: string;
}

export function PdfDownloadButton({ token, className }: PdfDownloadButtonProps) {
  return (
    <Button variant="outline" size="sm" asChild className={className}>
      <a href={`/api/proposal/${token}/pdf`} download>
        <Download className="mr-2 h-4 w-4" />
        Download PDF
      </a>
    </Button>
  );
}
