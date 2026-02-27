import type { InspectionEntry } from '@/lib/mock-data/homeowner-dashboard';
import { ClipboardCheck } from 'lucide-react';
import { InspectionCard } from './inspection-card';

interface UpcomingInspectionsProps {
  inspections: InspectionEntry[];
}

export function UpcomingInspections({ inspections }: UpcomingInspectionsProps) {
  // Find next upcoming inspection
  const upcomingInspections = inspections.filter(
    (insp) => insp.status === 'upcoming' || insp.status === 'pending_schedule'
  );
  const nextInspection = upcomingInspections.length > 0 ? upcomingInspections[0] : null;

  // Find past inspections
  const pastInspections = inspections.filter(
    (insp) => insp.status === 'passed' || insp.status === 'failed'
  );

  // Count completed inspections
  const completedCount = inspections.filter((insp) => insp.status === 'passed').length;
  const totalCount = inspections.length;

  return (
    <section className="space-y-4">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5 text-gray-700" />
          <h2 className="text-xl font-semibold text-gray-900">Inspections</h2>
        </div>
        <p className="text-sm text-gray-500">
          {completedCount} of {totalCount} inspections complete
        </p>
      </div>

      {/* Inspection cards */}
      <div className="space-y-3">
        {/* Next upcoming inspection */}
        {nextInspection && (
          <InspectionCard inspection={nextInspection} isNext={true} />
        )}

        {/* Other upcoming inspections */}
        {upcomingInspections.slice(1).map((inspection, idx) => (
          <InspectionCard key={`upcoming-${idx}`} inspection={inspection} />
        ))}

        {/* Past inspections */}
        {pastInspections.length > 0 && (
          <>
            <div className="pt-2">
              <h3 className="text-sm font-medium text-gray-700">
                Past Inspections
              </h3>
            </div>
            {pastInspections.map((inspection, idx) => (
              <InspectionCard key={`past-${idx}`} inspection={inspection} />
            ))}
          </>
        )}

        {/* Empty state */}
        {inspections.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <ClipboardCheck className="h-12 w-12 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No inspections scheduled yet</p>
          </div>
        )}
      </div>
    </section>
  );
}
