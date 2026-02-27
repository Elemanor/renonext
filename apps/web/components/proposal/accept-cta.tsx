'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { differenceInDays, parseISO } from 'date-fns';
import {
  CheckCircle,
  XCircle,
  Clock,
  Rocket,
  Shield,
  Lock,
  ArrowRight,
  Loader2,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { SOFT_SURFACE, FOCUS_RING } from '@/lib/ui/tokens';
import {
  PAYMENT_HOLD_COPY,
  CANCEL_COPY,
  ACCEPT_DIALOG_TITLE,
  ACCEPT_DIALOG_DESCRIPTION,
  DECLINE_DIALOG_TITLE,
  DECLINE_DIALOG_DESCRIPTION,
} from '@/lib/ui/copy';
import { formatCurrency } from '@/lib/utils/format';

import type { ProposalStatus } from '@renonext/shared/types';

interface AcceptCTAProps {
  status: ProposalStatus;
  expiresAt: string | null;
  holdbackPercent?: number;
  estimatedCost?: number;
  token: string;
}

export function AcceptCTA({
  status,
  expiresAt,
  holdbackPercent = 10,
  estimatedCost,
  token,
}: AcceptCTAProps) {
  const router = useRouter();
  const [acceptOpen, setAcceptOpen] = useState(false);
  const [declineOpen, setDeclineOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const daysLeft = expiresAt
    ? differenceInDays(parseISO(expiresAt), new Date())
    : null;

  const depositAmount = (estimatedCost ?? 0) * 0.10;

  async function handleAccept() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/proposal/${token}/accept`, {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong');
        return;
      }
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleDecline() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/proposal/${token}/decline`, {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong');
        return;
      }
      setDeclineOpen(false);
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (status === 'accepted') {
    return (
      <Card className="border-emerald-200 bg-emerald-50">
        <CardContent className="p-5 text-center">
          <CheckCircle className="mx-auto h-10 w-10 text-emerald-500" />
          <p className="mt-3 text-lg font-bold text-emerald-700">Proposal Accepted</p>
          <p className="mt-1 text-sm text-emerald-600">Your project is underway.</p>
        </CardContent>
      </Card>
    );
  }

  if (status === 'declined') {
    return (
      <Card className="border-border">
        <CardContent className="p-5 text-center">
          <XCircle className="mx-auto h-10 w-10 text-muted-foreground" />
          <p className="mt-3 text-lg font-bold text-muted-foreground">Proposal Declined</p>
        </CardContent>
      </Card>
    );
  }

  if (status === 'expired') {
    return (
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-5 text-center">
          <Clock className="mx-auto h-10 w-10 text-amber-500" />
          <p className="mt-3 text-lg font-bold text-amber-700">Proposal Expired</p>
          <p className="mt-1 text-sm text-amber-600">Contact the contractor for a new proposal.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {/* Desktop: full CTA block (hidden on mobile) */}
      <div className="hidden space-y-4 lg:block">
        <Button
          onClick={() => { setError(null); setAcceptOpen(true); }}
          className="shine group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 py-6 text-base font-bold text-white shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:shadow-xl hover:shadow-emerald-500/35 hover:brightness-105"
        >
          <Rocket className="mr-2 h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          Accept Proposal
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Button>

        <button
          onClick={() => { setError(null); setDeclineOpen(true); }}
          className={`w-full text-center text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground ${FOCUS_RING}`}
        >
          Decline this proposal
        </button>

        {/* Cost Protection Summary */}
        <div className={`space-y-2 rounded-xl ${SOFT_SURFACE} p-3`}>
          <p className="flex items-start gap-2 text-xs text-muted-foreground">
            <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {PAYMENT_HOLD_COPY}
          </p>
          <p className="flex items-start gap-2 text-xs text-muted-foreground">
            <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {holdbackPercent}% held until completion
          </p>
          <p className="flex items-start gap-2 text-xs text-muted-foreground">
            <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {CANCEL_COPY}
          </p>
        </div>

        {expiresAt && daysLeft != null && daysLeft > 0 && (
          <p className="text-center text-xs text-muted-foreground">
            Valid for {daysLeft} more days
          </p>
        )}
      </div>

      {/* Mobile: fixed sticky bottom bar (hidden on desktop)
          Rules: Accept only. No Decline button — Decline lives inline on desktop.
          Max height ~120px to stay in thumb zone. */}
      <div className="fixed bottom-0 left-0 right-0 z-40 max-h-[120px] border-t border-border bg-background/95 px-4 py-3 backdrop-blur-xl lg:hidden">
        <Button
          onClick={() => { setError(null); setAcceptOpen(true); }}
          className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 py-5 text-base font-bold text-white shadow-lg"
        >
          <Rocket className="mr-2 h-5 w-5" />
          Accept Proposal
        </Button>
        <div className="mt-2 flex flex-col items-center gap-0.5 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Lock className="h-3 w-3" /> {holdbackPercent}% holdback until completion
          </span>
          <span className="flex items-center gap-1">
            <XCircle className="h-3 w-3" /> {CANCEL_COPY}
          </span>
        </div>
      </div>

      {/* ── Accept Dialog ── */}
      <Dialog open={acceptOpen} onOpenChange={setAcceptOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{ACCEPT_DIALOG_TITLE}</DialogTitle>
            <DialogDescription>{ACCEPT_DIALOG_DESCRIPTION}</DialogDescription>
          </DialogHeader>

          <div className="mt-2 rounded-lg bg-emerald-50 p-4 text-center">
            <p className="text-sm text-emerald-600">Deposit amount</p>
            <p className="text-2xl font-bold text-emerald-700">
              {formatCurrency(depositAmount)}
            </p>
            <p className="mt-1 text-xs text-emerald-600/80">
              10% of {formatCurrency(estimatedCost ?? 0)} estimated total
            </p>
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="mt-2 flex flex-col gap-2">
            <Button
              onClick={handleAccept}
              disabled={loading}
              className="w-full rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Lock className="mr-2 h-4 w-4" />
              )}
              {loading ? 'Redirecting...' : 'Pay Deposit'}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setAcceptOpen(false)}
              disabled={loading}
              className="w-full rounded-xl"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Decline Dialog ── */}
      <Dialog open={declineOpen} onOpenChange={setDeclineOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{DECLINE_DIALOG_TITLE}</DialogTitle>
            <DialogDescription>{DECLINE_DIALOG_DESCRIPTION}</DialogDescription>
          </DialogHeader>

          {error && (
            <div className="flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="mt-2 flex flex-col gap-2">
            <Button
              onClick={handleDecline}
              disabled={loading}
              variant="destructive"
              className="w-full rounded-xl"
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <XCircle className="mr-2 h-4 w-4" />
              )}
              {loading ? 'Declining...' : 'Decline Proposal'}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setDeclineOpen(false)}
              disabled={loading}
              className="w-full rounded-xl"
            >
              Keep Proposal
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
