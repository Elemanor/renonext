import { Shield, Clock, MessageCircle, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils/format';

interface QuickStatsRowProps {
  daysSinceIncident: number;
  hoursThisWeek: number;
  pendingQuestions: number;
  spentToDate: number;
  contractValue: number;
}

export function QuickStatsRow({
  daysSinceIncident,
  hoursThisWeek,
  pendingQuestions,
  spentToDate,
  contractValue,
}: QuickStatsRowProps) {
  const hasPendingQuestions = pendingQuestions > 0;

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Days Without Incident */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100">
              <Shield className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-lg font-bold">{daysSinceIncident} days</div>
              <div className="text-xs text-gray-500">Without incident</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hours This Week */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-lg font-bold">{hoursThisWeek} hrs</div>
              <div className="text-xs text-gray-500">Worked this week</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending Questions */}
      <Card className={cn(hasPendingQuestions && 'bg-amber-50')}>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-full',
                hasPendingQuestions ? 'bg-amber-100' : 'bg-gray-100'
              )}
            >
              <MessageCircle
                className={cn(
                  'h-5 w-5',
                  hasPendingQuestions ? 'text-amber-600' : 'text-gray-600'
                )}
              />
            </div>
            <div>
              <div className="text-lg font-bold">{pendingQuestions}</div>
              <div className="text-xs text-gray-500">Pending questions</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget Spent */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
              <DollarSign className="h-5 w-5 text-slate-600" />
            </div>
            <div>
              <div className="text-lg font-bold">
                {formatCurrency(spentToDate)} / {formatCurrency(contractValue)}
              </div>
              <div className="text-xs text-gray-500">Budget spent</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
