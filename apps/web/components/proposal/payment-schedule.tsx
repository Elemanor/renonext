'use client';

import { format, parseISO } from 'date-fns';
import { Calendar, Clock, Shield, Lock, XCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CountUp } from '@/components/landing/_animations/count-up';
import { LABEL, ROW_HOVER, SCROLL_OFFSET } from '@/lib/ui/tokens';
import { MILESTONE_CAPTION, CANCEL_COPY, PAYMENT_HOLD_COPY } from '@/lib/ui/copy';
import { formatCurrency } from '@/lib/utils/format';

interface PaymentMilestone {
  label: string;
  amount: number;
  percent: number;
  dueAt: string;
}

interface PaymentScheduleProps {
  estimatedCost: number;
  durationDays: number;
  startDate: string;
  warrantyTerms: string | null;
  holdbackPercent: number;
  paymentMilestones: PaymentMilestone[];
}

export function PaymentSchedule({
  estimatedCost,
  durationDays,
  startDate,
  warrantyTerms,
  holdbackPercent,
  paymentMilestones,
}: PaymentScheduleProps) {
  const formattedTotal = formatCurrency(estimatedCost);

  return (
    <div id="payments" className={`space-y-5 ${SCROLL_OFFSET}`}>
      {/* Price hero */}
      <div className="text-center">
        <p className={LABEL}>Total Investment</p>
        <div className="mt-1">
          <CountUp
            target={estimatedCost}
            prefix="$"
            duration={1000}
            locale="en-CA"
            className="text-4xl font-extrabold tabular-nums tracking-tight text-foreground"
          />
        </div>
        {holdbackPercent > 0 && (
          <p className="mt-2 text-xs text-muted-foreground">
            <Lock className="mr-1 inline h-3 w-3" />
            {holdbackPercent}% holdback until completion
          </p>
        )}
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-2">
        <Card>
          <CardContent className="p-3 text-center">
            <Clock className="mx-auto h-4 w-4 text-muted-foreground" />
            <p className="mt-1.5 text-lg font-bold tabular-nums text-foreground">{durationDays}d</p>
            <p className="text-[10px] text-muted-foreground">Duration</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <Calendar className="mx-auto h-4 w-4 text-muted-foreground" />
            <p className="mt-1.5 text-lg font-bold tabular-nums text-foreground">
              {format(parseISO(startDate), 'MMM d')}
            </p>
            <p className="text-[10px] text-muted-foreground">Start Date</p>
          </CardContent>
        </Card>
      </div>

      {/* Warranty */}
      {warrantyTerms && (
        <Card className="border-emerald-200 bg-emerald-50">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-500" />
              <p className="text-xs font-bold text-emerald-700">Warranty Protection</p>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-emerald-600">{warrantyTerms}</p>
          </CardContent>
        </Card>
      )}

      {/* Payment milestones */}
      {paymentMilestones.length > 0 && (
        <div>
          <div className="mb-3 flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
            <p className={LABEL}>Payment Schedule</p>
          </div>

          {/* Stacked bar */}
          <div className="mb-3 flex h-3 overflow-hidden rounded-full bg-muted">
            {paymentMilestones.map((ms, i) => {
              const colors = ['bg-primary', 'bg-primary/80', 'bg-emerald-500', 'bg-emerald-400'];
              return (
                <div
                  key={ms.label}
                  className={`${colors[i % colors.length]} transition-all duration-500 ${i > 0 ? 'border-l-2 border-white' : ''}`}
                  style={{ width: `${ms.percent}%` }}
                  title={`${ms.label}: ${ms.percent}%`}
                />
              );
            })}
          </div>

          {/* Milestones table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8">#</TableHead>
                <TableHead>Milestone</TableHead>
                <TableHead>When</TableHead>
                <TableHead className="text-right tabular-nums">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentMilestones.map((ms, i) => (
                <TableRow key={ms.label} className={ROW_HOVER}>
                  <TableCell>
                    <div className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white ${
                      i === 0 ? 'bg-primary' : i === paymentMilestones.length - 1 ? 'bg-emerald-400' : 'bg-primary/80'
                    }`}>
                      {i + 1}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs font-medium text-foreground">{ms.label}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{ms.dueAt}</TableCell>
                  <TableCell className="text-right text-sm font-bold tabular-nums text-foreground">
                    {formatCurrency(ms.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell />
                <TableCell className="text-xs font-bold text-foreground">Total</TableCell>
                <TableCell />
                <TableCell className="text-right text-sm font-bold tabular-nums text-foreground">
                  {formattedTotal}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>

          {/* Caption */}
          <p className="mt-3 text-xs text-muted-foreground/70">{MILESTONE_CAPTION}</p>
        </div>
      )}

      {/* Compact trust signals */}
      <div className="space-y-2 pt-2">
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <Lock className="h-3.5 w-3.5 shrink-0" />
          {PAYMENT_HOLD_COPY}
        </p>
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <XCircle className="h-3.5 w-3.5 shrink-0" />
          {CANCEL_COPY}
        </p>
      </div>
    </div>
  );
}
