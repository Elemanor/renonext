import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import type { SequenceStep } from '@renonext/shared/types';
import { fetchProposalByToken } from '@/lib/supabase/queries/proposal';
import { computeScopeConfidence } from '@/lib/utils/scope-confidence';
import { derivePaymentMilestones } from '@/lib/utils/payment-milestones';
import { ProposalPdfDocument } from '@/lib/pdf/proposal-document';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  // Validate token format
  if (!UUID_RE.test(token)) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
  }

  // Fetch proposal data
  const { data, error } = await fetchProposalByToken(token);

  if (error || !data) {
    return NextResponse.json(
      { error: error ?? 'Proposal not found' },
      { status: 404 }
    );
  }

  const { proposal, contractor_profile, pro_profile } = data;

  // Parse steps
  const steps = (proposal.steps_snapshot ?? []) as SequenceStep[];

  // Compute SCI
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

  // Derive milestones
  const estimatedCost = proposal.estimated_cost ?? 0;
  const milestones = derivePaymentMilestones(steps, estimatedCost);

  // Render PDF
  try {
    const buffer = await renderToBuffer(
      ProposalPdfDocument({
        proposal,
        contractorProfile: contractor_profile,
        proProfile: pro_profile,
        sci,
        milestones,
        steps,
      }) as React.ReactElement
    );

    // Build filename
    const slug = proposal.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const filename = `proposal-${slug}.pdf`;

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'private, max-age=60',
      },
    });
  } catch (err) {
    console.error('PDF generation failed:', err);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
