import { notFound } from 'next/navigation';
import type { SequenceStep } from '@renonext/shared/types';
import { fetchProposalByToken } from '@/lib/supabase/queries/proposal';
import { computeScopeConfidence } from '@/lib/utils/scope-confidence';
import { derivePaymentMilestones } from '@/lib/utils/payment-milestones';
import { HeroHeader } from '@/components/proposal/hero-header';
import { ScoreCards } from '@/components/proposal/score-cards';
import { CompareTable } from '@/components/proposal/compare-table';
import { JourneyStepper } from '@/components/proposal/journey-stepper';
import { AssemblyViewerLoader } from '@/components/3d/assembly-viewer-loader';
import { WATERPROOFING_ASSEMBLY } from '@/lib/assemblies/waterproofing';
import { TrustGuarantees } from '@/components/proposal/trust-guarantees';
import { PaymentSchedule } from '@/components/proposal/payment-schedule';
import { ContractorCard } from '@/components/proposal/contractor-card';
import { AcceptCTA } from '@/components/proposal/accept-cta';
import { WhatHappensNext } from '@/components/proposal/what-happens-next';
import { InlineTerms } from '@/components/proposal/inline-terms';
import { ProposalViewTracker } from '@/components/proposal/proposal-view-tracker';
import { PdfDownloadButton } from '@/components/proposal/pdf-download-button';
import { ScrollReveal } from '@/components/landing/_animations/scroll-reveal';
import { Card, CardContent } from '@/components/ui/card';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SECTION_GAP, SOFT_SURFACE } from '@/lib/ui/tokens';
import { DISCLAIMER_COPY, PAYMENT_HOLD_COPY, CANCEL_COPY } from '@/lib/ui/copy';
import { REVEAL_DURATION } from '@/lib/ui/motion';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function ProposalPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  if (!UUID_RE.test(token)) {
    notFound();
  }

  const { data, error } = await fetchProposalByToken(token);

  if (error || !data) {
    notFound();
  }

  const { proposal, contractor_profile, pro_profile } = data;

  // Parse steps_snapshot back into typed array
  const steps = (proposal.steps_snapshot ?? []) as SequenceStep[];

  // Compute Scope Confidence Index
  const sci = computeScopeConfidence({
    steps,
    templateStepCount: steps.length,
    totalInspections: proposal.total_inspections,
    totalGates: proposal.total_gates,
    hasCodeReferences: proposal.has_code_references,
    hasHoldback: true,
    hasMilestones: true,
    hasWarrantyTerms: !!proposal.warranty_terms,
    hasBcin: pro_profile?.bcin_verified ?? false,
  });

  // Derive payment milestones from steps
  const estimatedCost = proposal.estimated_cost ?? 0;
  const paymentMilestones = derivePaymentMilestones(steps, estimatedCost);

  // Contractor display values with fallbacks
  const contractorName = contractor_profile.full_name;
  const contractorCompany = pro_profile?.company_name ?? contractorName;
  const contractorAvatarUrl = contractor_profile.avatar_url ?? null;
  const isVerified = contractor_profile.is_verified;

  // Pro profile for ContractorCard (with fallbacks for nullable fields)
  const contractorCardProfile = pro_profile
    ? {
        bio: pro_profile.bio ?? '',
        years_experience: pro_profile.years_experience ?? 0,
        avg_rating: pro_profile.avg_rating,
        total_reviews: pro_profile.total_reviews,
        total_jobs_completed: pro_profile.total_jobs_completed,
        bcin: pro_profile.bcin ?? '',
        bcin_verified: pro_profile.bcin_verified,
        response_time_minutes: pro_profile.response_time_minutes ?? 0,
        company_name: pro_profile.company_name ?? contractorName,
      }
    : {
        bio: '',
        years_experience: 0,
        avg_rating: 0,
        total_reviews: 0,
        total_jobs_completed: 0,
        bcin: '',
        bcin_verified: false,
        response_time_minutes: 0,
        company_name: contractorName,
      };

  return (
    <TooltipProvider>
      <ProposalViewTracker token={token} />
      <div className="mx-auto max-w-5xl px-4 pb-28 pt-6 sm:pt-8 md:pb-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* ── Main Column ── */}
          <div className={SECTION_GAP}>
            {/* Beat 1 — Orient: "I understand what this is" */}
            <HeroHeader
              title={proposal.title}
              contractorName={contractorName}
              sentAt={proposal.sent_at!}
              coverLetter={proposal.cover_letter}
              plainLanguageSummary={proposal.plain_language_summary}
              contractorCompany={contractorCompany}
              estimatedCost={estimatedCost}
              durationDays={proposal.estimated_duration_days!}
              expiresAt={proposal.expires_at}
            />

            {/* Beat 2 — Prove: "I can see this is thorough" */}
            <ScrollReveal direction="up" delay={0.05} duration={REVEAL_DURATION}>
              <ScoreCards
                score={sci.score}
                tier={sci.tier}
                breakdown={sci.breakdown}
                inspectionCount={proposal.total_inspections}
                gateCount={proposal.total_gates}
                holdbackPercent={10}
              />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.05} duration={REVEAL_DURATION}>
              <CompareTable
                stepCount={steps.length}
                inspectionCount={proposal.total_inspections}
                gateCount={proposal.total_gates}
                codeReference={proposal.has_code_references}
                holdbackPercent={10}
                hasBcin={pro_profile?.bcin_verified ?? false}
                bcin={pro_profile?.bcin ?? null}
                bcinVerified={pro_profile?.bcin_verified ?? false}
              />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.05} duration={REVEAL_DURATION}>
              <JourneyStepper steps={steps} />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.05} duration={REVEAL_DURATION}>
              <AssemblyViewerLoader steps={steps} assembly={WATERPROOFING_ASSEMBLY} />
            </ScrollReveal>

            {/* Beat 3 — Reassure: "I'm protected if something goes wrong" */}
            <ScrollReveal direction="up" delay={0.05} duration={0.35}>
              <TrustGuarantees />
            </ScrollReveal>

            {/* Beat 4 — Decide: "I'm ready to decide" */}
            <ScrollReveal direction="up" delay={0.05} duration={REVEAL_DURATION}>
              <WhatHappensNext />
            </ScrollReveal>

            {/* Mobile: pricing + contractor inline (below main content) */}
            <div className="space-y-6 lg:hidden">
              <Card className="overflow-hidden">
                <CardContent className="p-5">
                  <PaymentSchedule
                    estimatedCost={estimatedCost}
                    durationDays={proposal.estimated_duration_days!}
                    startDate={proposal.estimated_start_date!}
                    warrantyTerms={proposal.warranty_terms}
                    holdbackPercent={10}
                    paymentMilestones={paymentMilestones}
                  />
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardContent className="p-5">
                  <ContractorCard
                    profile={{
                      full_name: contractorName,
                      avatar_url: contractorAvatarUrl,
                      is_verified: isVerified,
                    }}
                    proProfile={contractorCardProfile}
                  />
                </CardContent>
              </Card>

              <PdfDownloadButton token={token} className="w-full" />
            </div>

            {/* Footer: terms + disclaimer */}
            <InlineTerms />
            <p className="mt-4 text-center text-xs text-muted-foreground/60">
              {DISCLAIMER_COPY}
            </p>
          </div>

          {/* ── Desktop Sidebar — sticky ── */}
          <div className="hidden space-y-6 lg:block lg:sticky lg:top-24 lg:self-start">
            <ScrollReveal direction="right" delay={0.1} distance={20}>
              <Card className="overflow-hidden">
                <CardContent className="p-5">
                  <PaymentSchedule
                    estimatedCost={estimatedCost}
                    durationDays={proposal.estimated_duration_days!}
                    startDate={proposal.estimated_start_date!}
                    warrantyTerms={proposal.warranty_terms}
                    holdbackPercent={10}
                    paymentMilestones={paymentMilestones}
                  />
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.15} distance={20}>
              <Card className="overflow-hidden">
                <CardContent className="p-5">
                  <ContractorCard
                    profile={{
                      full_name: contractorName,
                      avatar_url: contractorAvatarUrl,
                      is_verified: isVerified,
                    }}
                    proProfile={contractorCardProfile}
                  />
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Cost Protection Summary */}
            <ScrollReveal direction="right" delay={0.18} distance={20}>
              <Card className={`border-0 ${SOFT_SURFACE}`}>
                <CardContent className="p-4 space-y-2">
                  <p className="text-xs font-semibold text-foreground">Cost Protection</p>
                  <p className="text-xs text-muted-foreground">&bull; 10% held until completion</p>
                  <p className="text-xs text-muted-foreground">&bull; Milestones release only after your confirmation</p>
                  <p className="text-xs text-muted-foreground">&bull; Change orders require explicit approval</p>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2} distance={20}>
              <AcceptCTA
                status={proposal.status}
                expiresAt={proposal.expires_at}
                holdbackPercent={10}
                estimatedCost={estimatedCost}
                token={token}
              />
            </ScrollReveal>

            <PdfDownloadButton token={token} className="w-full" />
          </div>
        </div>

        {/* Mobile CTA renders its own fixed bottom bar via AcceptCTA */}
        <div className="lg:hidden">
          <AcceptCTA
            status={proposal.status}
            expiresAt={proposal.expires_at}
            holdbackPercent={10}
            estimatedCost={estimatedCost}
            token={token}
          />
        </div>
      </div>
    </TooltipProvider>
  );
}
