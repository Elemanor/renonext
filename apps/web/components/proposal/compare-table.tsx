import {
  ClipboardCheck,
  ShieldCheck,
  Lock,
  BookOpen,
  Layers,
  Info,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { BCINBadge } from '@/components/shared/bcin-badge';
import { CARD_PAD, SECTION_TITLE, BODY, FOCUS_RING, ROW_HOVER } from '@/lib/ui/tokens';
import { COMPARE_CAPTION, GLOSSARY } from '@/lib/ui/copy';

interface CompareTableProps {
  stepCount: number;
  inspectionCount: number;
  gateCount: number;
  codeReference: boolean;
  holdbackPercent: number;
  hasBcin: boolean;
  bcin: string | null;
  bcinVerified?: boolean;
}

function JargonTooltip({ term, label }: { term: string; label: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          aria-label={`What is ${label}?`}
          className={`inline-flex items-center justify-center rounded-full min-h-[44px] min-w-[44px] -m-2 focus-visible:outline-none ${FOCUS_RING}`}
        >
          <Info className="h-3.5 w-3.5 text-muted-foreground/50 hover:text-muted-foreground transition-colors duration-200" />
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-[240px]">
        <p className="text-xs">{term}</p>
      </TooltipContent>
    </Tooltip>
  );
}

interface FeatureRow {
  icon: React.ElementType;
  label: string;
  detail: string;
  tooltip?: { term: string; label: string };
}

export function CompareTable({
  stepCount,
  inspectionCount,
  gateCount,
  codeReference,
  holdbackPercent,
  hasBcin,
  bcin,
  bcinVerified,
}: CompareTableProps) {
  const features: FeatureRow[] = [
    {
      icon: Layers,
      label: 'Defined steps',
      detail: `${stepCount} documented steps with expected durations`,
    },
    {
      icon: ShieldCheck,
      label: 'Inspections',
      detail: inspectionCount > 0
        ? `${inspectionCount} city-mandated inspection${inspectionCount > 1 ? 's' : ''}`
        : 'None required for this scope',
      tooltip: { term: GLOSSARY.inspection, label: 'Inspection' },
    },
    {
      icon: ClipboardCheck,
      label: 'Quality checkpoints',
      detail: gateCount > 0
        ? `${gateCount} go/no-go gate${gateCount > 1 ? 's' : ''}`
        : 'None defined',
      tooltip: { term: GLOSSARY.qualityCheckpoints, label: 'Quality Checkpoints' },
    },
    {
      icon: BookOpen,
      label: 'Code compliance',
      detail: codeReference ? 'References Ontario Building Code' : 'No code references provided',
    },
    {
      icon: Lock,
      label: 'Holdback',
      detail: holdbackPercent > 0
        ? `${holdbackPercent}% held until completion`
        : 'No holdback specified',
      tooltip: { term: GLOSSARY.holdback, label: 'Holdback' },
    },
  ];

  // Summary for mobile collapsed state
  const summaryParts = [
    `${stepCount} steps`,
    `${inspectionCount} inspection${inspectionCount !== 1 ? 's' : ''}`,
    `${holdbackPercent}% holdback`,
  ];

  return (
    <div className={CARD_PAD}>
      <h2 className={`${SECTION_TITLE} text-foreground`}>What&apos;s Included</h2>
      <p className={`mt-1 ${BODY}`}>Key items that affect schedule, approvals, and payment</p>

      {/* Desktop table */}
      <div className="mt-5 hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {features.map((f) => (
              <TableRow key={f.label} className={ROW_HOVER}>
                <TableCell>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                    <f.icon className="h-4 w-4 text-muted-foreground" />
                    {f.label}
                    {f.tooltip && (
                      <JargonTooltip term={f.tooltip.term} label={f.tooltip.label} />
                    )}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {f.detail}
                </TableCell>
              </TableRow>
            ))}
            {/* BCIN row */}
            <TableRow className={ROW_HOVER}>
              <TableCell>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                  <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                  BCIN
                  <JargonTooltip term={GLOSSARY.bcin} label="BCIN" />
                </span>
              </TableCell>
              <TableCell>
                {bcinVerified && bcin ? (
                  <BCINBadge bcin={bcin} verified />
                ) : bcin && !bcinVerified ? (
                  <span className="text-sm text-muted-foreground">BCIN Provided (Unverified)</span>
                ) : null}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Mobile: collapsed by default */}
      <details className="mt-5 sm:hidden">
        <summary className="cursor-pointer text-sm text-muted-foreground">
          {summaryParts.join(' \u00b7 ')} — View details
        </summary>
        <div className="mt-3 space-y-3">
          {features.map((f) => (
            <div key={f.label} className="flex items-start gap-3">
              <f.icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {f.label}
                  {f.tooltip && (
                    <span className="ml-1 inline-flex">
                      <JargonTooltip term={f.tooltip.term} label={f.tooltip.label} />
                    </span>
                  )}
                </p>
                <p className="text-sm text-muted-foreground">{f.detail}</p>
              </div>
            </div>
          ))}
          {/* BCIN mobile */}
          {(bcinVerified && bcin) && (
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">BCIN</p>
                <BCINBadge bcin={bcin} verified />
              </div>
            </div>
          )}
        </div>
      </details>

      {/* Caption */}
      <p className="mt-3 text-xs text-muted-foreground/70">{COMPARE_CAPTION}</p>
    </div>
  );
}
