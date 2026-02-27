import { notFound } from 'next/navigation';
import { CheckCircle, ArrowRight, FileText, HardHat, CreditCard } from 'lucide-react';
import { fetchProposalByToken } from '@/lib/supabase/queries/proposal';
import { formatCurrency } from '@/lib/utils/format';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function SuccessPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  if (!UUID_RE.test(token)) {
    notFound();
  }

  const { data } = await fetchProposalByToken(token);
  const proposal = data?.proposal;
  const contractorName = data?.contractor_profile.full_name ?? 'your contractor';
  const depositAmount = (proposal?.estimated_cost ?? 0) * 0.10;

  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
        <CheckCircle className="h-10 w-10 text-emerald-600" />
      </div>

      <h1 className="mt-6 text-2xl font-bold text-foreground">
        Deposit Received
      </h1>

      {proposal && (
        <p className="mt-2 text-lg text-muted-foreground">
          {formatCurrency(depositAmount)} paid to secure your project with{' '}
          <span className="font-medium text-foreground">{contractorName}</span>
        </p>
      )}

      <Card className="mt-8 text-left">
        <CardContent className="p-6">
          <h2 className="text-sm font-semibold text-foreground">
            What Happens Next
          </h2>
          <ul className="mt-4 space-y-4">
            <li className="flex gap-3">
              <FileText className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Contract finalized
                </p>
                <p className="text-sm text-muted-foreground">
                  {contractorName} will prepare the project schedule and materials list.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <HardHat className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Work begins
                </p>
                <p className="text-sm text-muted-foreground">
                  You&apos;ll receive updates at each milestone with photos and inspection results.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Milestone payments
                </p>
                <p className="text-sm text-muted-foreground">
                  Payments are released only after you confirm each stage is complete.
                </p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Link href={`/proposal/${token}`} className="mt-6 inline-block">
        <Button variant="outline" className="rounded-xl">
          View Proposal
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}
