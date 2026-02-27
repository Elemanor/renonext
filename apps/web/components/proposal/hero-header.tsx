import { format, parseISO, differenceInDays } from 'date-fns';
import { CARD_PAD, SOFT_SURFACE, BODY, SCROLL_OFFSET, FOCUS_RING } from '@/lib/ui/tokens';
import { formatCurrency } from '@/lib/utils/format';

interface HeroHeaderProps {
  title: string;
  contractorName: string;
  sentAt: string;
  coverLetter: string | null;
  plainLanguageSummary: string | null;
  contractorCompany: string;
  estimatedCost: number;
  durationDays: number;
  expiresAt: string | null;
}

export function HeroHeader({
  title,
  contractorName,
  sentAt,
  coverLetter,
  plainLanguageSummary,
  contractorCompany,
  estimatedCost,
  durationDays,
  expiresAt,
}: HeroHeaderProps) {
  const sentDate = format(parseISO(sentAt), 'MMMM d, yyyy');
  const daysLeft = expiresAt
    ? differenceInDays(parseISO(expiresAt), new Date())
    : null;
  const formattedPrice = formatCurrency(estimatedCost);

  return (
    <div className={CARD_PAD}>
      {/* Title */}
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h1>

      {/* Summary */}
      {plainLanguageSummary && (
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
          {plainLanguageSummary}
        </p>
      )}

      {/* Meta line */}
      <p className="mt-4 text-sm text-muted-foreground">
        <span>{contractorName}</span>
        <span className="mx-1.5" aria-hidden="true">&middot;</span>
        <span>{contractorCompany}</span>
        <span className="mx-1.5" aria-hidden="true">&middot;</span>
        <span>Sent {sentDate}</span>
        {daysLeft != null && daysLeft > 0 && (
          <>
            <span className="mx-1.5" aria-hidden="true">&middot;</span>
            <span>Valid for {daysLeft} more days</span>
          </>
        )}
      </p>

      {/* Mobile price bar */}
      <div className="mt-6 flex items-baseline justify-between lg:hidden">
        <span
          className="text-2xl font-extrabold tabular-nums tracking-tight text-foreground"
          style={{ minWidth: `${formattedPrice.length}ch` }}
        >
          {formattedPrice}
        </span>
        <span className="text-sm text-muted-foreground">{durationDays} days</span>
      </div>

      {/* Cover letter */}
      {coverLetter && coverLetter.trim().length > 0 && (
        <div className={`mt-6 rounded-xl ${SOFT_SURFACE} ${CARD_PAD}`}>
          <p className="text-xs font-semibold text-muted-foreground">
            Personal Note from {contractorName}
          </p>
          <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground">
            {coverLetter}
          </p>
        </div>
      )}

      {/* Section anchors */}
      <nav className="mt-6 flex flex-wrap gap-3" aria-label="Page sections">
        {[
          { href: '#scope', label: 'Scope' },
          { href: '#journey', label: 'Journey' },
          { href: '#payments', label: 'Payments' },
          { href: '#protection', label: 'Protection' },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`inline-flex min-h-[44px] items-center rounded-md px-3 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground ${FOCUS_RING}`}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
