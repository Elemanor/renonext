import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SOFT_SURFACE, SECTION_TITLE } from '@/lib/ui/tokens';
import { GLOSSARY } from '@/lib/ui/copy';

const terms: { term: string; definition: string }[] = [
  { term: 'Holdback', definition: GLOSSARY.holdback },
  { term: 'BCIN', definition: GLOSSARY.bcin },
  { term: 'Quality Checkpoints', definition: GLOSSARY.qualityCheckpoints },
  { term: 'Inspection', definition: GLOSSARY.inspection },
  { term: 'Milestone', definition: GLOSSARY.milestone },
  { term: 'Payment Hold', definition: GLOSSARY.paymentHold },
];

export function InlineTerms() {
  return (
    <Card className={`border-0 ${SOFT_SURFACE}`}>
      <CardHeader>
        <CardTitle className="text-sm font-semibold">Terms used on this page</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="space-y-3">
          {terms.map((t) => (
            <div key={t.term}>
              <dt className="text-sm font-medium text-foreground">{t.term}</dt>
              <dd className="text-sm text-muted-foreground">{t.definition}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
