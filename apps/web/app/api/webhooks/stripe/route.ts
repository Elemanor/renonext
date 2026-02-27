import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-01-28.clover',
  });
}

export async function POST(request: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'Payment processing is not configured' },
      { status: 503 }
    );
  }

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  const stripe = getStripe();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Only process paid sessions
    if (session.payment_status !== 'paid') {
      return NextResponse.json({ received: true });
    }

    const proposalToken = session.metadata?.proposal_token;
    if (!proposalToken) {
      console.error('Stripe webhook: missing proposal_token in metadata');
      return NextResponse.json({ error: 'Missing metadata' }, { status: 400 });
    }

    // Call accept_proposal via service role (bypasses RLS)
    const adminClient = createSupabaseAdminClient();
    const { data, error } = await adminClient.rpc('accept_proposal', {
      p_token: proposalToken,
      p_stripe_session_id: session.id,
    });

    if (error) {
      console.error('accept_proposal RPC error:', error);
      return NextResponse.json(
        { error: 'Failed to process acceptance' },
        { status: 500 }
      );
    }

    const result = data as { success: boolean; error?: string };
    if (!result.success) {
      console.error('accept_proposal failed:', result.error);
      return NextResponse.json(
        { error: result.error ?? 'Acceptance failed' },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}
