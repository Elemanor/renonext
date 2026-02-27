import { FileQuestion } from 'lucide-react';

export default function ProposalNotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <FileQuestion className="h-16 w-16 text-muted-foreground/40" />
      <h1 className="mt-6 text-2xl font-bold text-foreground">
        Proposal Not Found
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        This proposal link may have expired, been withdrawn, or doesn&apos;t exist.
        If you believe this is an error, please contact the contractor who sent it.
      </p>
    </div>
  );
}
