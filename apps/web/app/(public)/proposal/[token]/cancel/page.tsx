import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function CancelPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
        <svg
          className="h-10 w-10 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
          />
        </svg>
      </div>

      <h1 className="mt-6 text-2xl font-bold text-foreground">
        Payment Not Completed
      </h1>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        No charges were made. Your proposal is still available — you can return
        anytime to complete the deposit.
      </p>

      <Link href={`/proposal/${token}`} className="mt-8 inline-block">
        <Button className="rounded-xl">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Proposal
        </Button>
      </Link>
    </div>
  );
}
