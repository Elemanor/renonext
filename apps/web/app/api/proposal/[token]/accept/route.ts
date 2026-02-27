import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-01-28.clover',
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: 'Payment processing is not configured' },
      { status: 503 }
    );
  }

  const { token } = await params;

  if (!UUID_RE.test(token)) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
  }

  // Fetch proposal via anon client (uses RPC)
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc('get_proposal_detail', {
    p_token: token,
  });

  if (error || !data) {
    return NextResponse.json(
      { error: 'Proposal not found' },
      { status: 404 }
    );
  }

  const proposal = (data as Record<string, unknown>).proposal as {
    id: string;
    status: string;
    estimated_cost: number | null;
    expires_at: string | null;
    contractor_id: string;
    job_id: string | null;
    title: string;
  };

  // Validate status
  if (!['sent', 'viewed'].includes(proposal.status)) {
    return NextResponse.json(
      { error: `Proposal is already ${proposal.status}` },
      { status: 409 }
    );
  }

  // Check expiry
  if (proposal.expires_at && new Date(proposal.expires_at) < new Date()) {
    return NextResponse.json(
      { error: 'Proposal has expired' },
      { status: 410 }
    );
  }

  // Calculate deposit (10% of estimated cost)
  const estimatedCost = proposal.estimated_cost ?? 0;
  const depositAmount = Math.round(estimatedCost * 0.10 * 100); // cents
  const platformFee = Math.round(depositAmount * 0.10); // 10% of deposit

  if (depositAmount <= 0) {
    return NextResponse.json(
      { error: 'Invalid proposal amount' },
      { status: 400 }
    );
  }

  // Fetch pro's stripe_account_id via admin client (bypasses RLS)
  const adminClient = createSupabaseAdminClient();
  const { data: proProfile, error: proError } = await adminClient
    .from('pro_profiles')
    .select('stripe_account_id')
    .eq('user_id', proposal.contractor_id)
    .single();

  if (proError || !proProfile?.stripe_account_id) {
    return NextResponse.json(
      { error: 'Contractor hasn\'t completed payment setup yet. Please contact them directly.' },
      { status: 422 }
    );
  }

  // Build success/cancel URLs
  const origin = request.nextUrl.origin;
  const successUrl = `${origin}/proposal/${token}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${origin}/proposal/${token}/cancel`;

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      currency: 'cad',
      line_items: [
        {
          price_data: {
            currency: 'cad',
            unit_amount: depositAmount,
            product_data: {
              name: `Deposit — ${proposal.title}`,
              description: '10% project deposit, held in escrow until first milestone',
            },
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        application_fee_amount: platformFee,
        transfer_data: {
          destination: proProfile.stripe_account_id,
        },
      },
      metadata: {
        proposal_token: token,
        proposal_id: proposal.id,
        job_id: proposal.job_id ?? '',
        contractor_id: proposal.contractor_id,
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return NextResponse.json({ checkout_url: session.url });
  } catch (err) {
    console.error('Stripe session creation failed:', err);
    return NextResponse.json(
      { error: 'Failed to create payment session' },
      { status: 500 }
    );
  }
}
