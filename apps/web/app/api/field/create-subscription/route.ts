import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-01-28.clover',
  });
}

interface CreateSubscriptionRequest {
  organization_id: string;
  plan_tier: 'pro' | 'enterprise';
  success_url: string;
  cancel_url: string;
}

export async function POST(request: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: 'Payment processing is not configured' },
      { status: 503 }
    );
  }

  let body: CreateSubscriptionRequest;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { organization_id, plan_tier, success_url, cancel_url } = body;

  // Validate required fields
  if (!organization_id || !plan_tier || !success_url || !cancel_url) {
    return NextResponse.json(
      { error: 'Missing required fields: organization_id, plan_tier, success_url, cancel_url' },
      { status: 400 }
    );
  }

  // Validate organization_id format
  if (!UUID_RE.test(organization_id)) {
    return NextResponse.json({ error: 'Invalid organization_id' }, { status: 400 });
  }

  // Validate plan_tier
  if (!['pro', 'enterprise'].includes(plan_tier)) {
    return NextResponse.json(
      { error: 'Invalid plan_tier. Must be "pro" or "enterprise"' },
      { status: 400 }
    );
  }

  // Validate URLs
  try {
    new URL(success_url);
    new URL(cancel_url);
  } catch {
    return NextResponse.json(
      { error: 'Invalid success_url or cancel_url' },
      { status: 400 }
    );
  }

  const adminClient = createSupabaseAdminClient();

  // Fetch organization
  const { data: org, error: orgError } = await adminClient
    .from('organizations')
    .select('id, name, stripe_customer_id')
    .eq('id', organization_id)
    .single();

  if (orgError || !org) {
    return NextResponse.json(
      { error: 'Organization not found' },
      { status: 404 }
    );
  }

  const stripe = getStripe();
  let customerId = org.stripe_customer_id;

  // Create Stripe customer if not exists
  if (!customerId) {
    try {
      const customer = await stripe.customers.create({
        metadata: {
          organization_id: org.id,
        },
        description: `${org.name} - Field App Subscription`,
      });

      customerId = customer.id;

      // Update organization with new stripe_customer_id
      const { error: updateError } = await adminClient
        .from('organizations')
        .update({ stripe_customer_id: customerId })
        .eq('id', organization_id);

      if (updateError) {
        console.error('Failed to update organization with stripe_customer_id:', updateError);
        // Continue anyway - we have the customer ID
      }
    } catch (err) {
      console.error('Stripe customer creation failed:', err);
      return NextResponse.json(
        { error: 'Failed to create customer' },
        { status: 500 }
      );
    }
  }

  // Get price ID from environment
  const priceId =
    plan_tier === 'pro'
      ? process.env.STRIPE_PRO_PRICE_ID
      : process.env.STRIPE_ENTERPRISE_PRICE_ID;

  if (!priceId) {
    console.error(`Missing price ID for plan_tier: ${plan_tier}`);
    return NextResponse.json(
      { error: 'Subscription plan not configured' },
      { status: 500 }
    );
  }

  // Create Checkout session
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        organization_id,
        plan_tier,
      },
      success_url,
      cancel_url,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe session creation failed:', err);
    return NextResponse.json(
      { error: 'Failed to create subscription session' },
      { status: 500 }
    );
  }
}
