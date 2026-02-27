import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface RequestBody {
  return_url: string
  refresh_url: string
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    if (!stripeSecretKey) {
      return new Response(
        JSON.stringify({ error: 'Stripe is not configured on this server' }),
        { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verify the caller is authenticated
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { return_url, refresh_url }: RequestBody = await req.json()

    if (!return_url || !refresh_url) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: return_url and refresh_url' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verify the user is a pro
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, email, full_name, role')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      return new Response(
        JSON.stringify({ error: 'Profile not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (profile.role !== 'pro') {
      return new Response(
        JSON.stringify({ error: 'Only professionals can create Stripe Connect accounts' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check if the pro already has a Stripe account
    const { data: proProfile, error: proError } = await supabase
      .from('pro_profiles')
      .select('id, stripe_account_id')
      .eq('user_id', user.id)
      .single()

    if (proError || !proProfile) {
      return new Response(
        JSON.stringify({ error: 'Pro profile not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    let stripeAccountId = proProfile.stripe_account_id

    // If no Stripe account exists, create one
    if (!stripeAccountId) {
      const createAccountResponse = await fetch('https://api.stripe.com/v1/accounts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${stripeSecretKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          type: 'express',
          country: 'CA',
          email: profile.email,
          'capabilities[card_payments][requested]': 'true',
          'capabilities[transfers][requested]': 'true',
          'business_type': 'individual',
          'business_profile[mcc]': '1520', // General Contractors
          'business_profile[product_description]': 'Local professional services - home improvement, cleaning, moving, and more.',
          'metadata[user_id]': user.id,
          'metadata[platform]': 'renonext',
          ...(profile.full_name ? {
            'individual[first_name]': profile.full_name.split(' ')[0] || '',
            'individual[last_name]': profile.full_name.split(' ').slice(1).join(' ') || '',
          } : {}),
        }),
      })

      const account = await createAccountResponse.json()

      if (account.error) {
        return new Response(
          JSON.stringify({ error: 'Failed to create Stripe account', details: account.error.message }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      stripeAccountId = account.id

      // Save the Stripe account ID to the pro profile
      const { error: updateError } = await supabase
        .from('pro_profiles')
        .update({ stripe_account_id: stripeAccountId })
        .eq('id', proProfile.id)

      if (updateError) {
        return new Response(
          JSON.stringify({ error: 'Failed to save Stripe account ID', details: updateError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    }

    // Create an account link for onboarding or dashboard access
    const accountLinkResponse = await fetch('https://api.stripe.com/v1/account_links', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        account: stripeAccountId,
        refresh_url: refresh_url,
        return_url: return_url,
        type: 'account_onboarding',
      }),
    })

    const accountLink = await accountLinkResponse.json()

    if (accountLink.error) {
      return new Response(
        JSON.stringify({ error: 'Failed to create account link', details: accountLink.error.message }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check if the account is already fully onboarded
    const accountCheckResponse = await fetch(`https://api.stripe.com/v1/accounts/${stripeAccountId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`,
      },
    })

    const accountDetails = await accountCheckResponse.json()
    const isOnboarded = accountDetails.charges_enabled && accountDetails.payouts_enabled

    return new Response(
      JSON.stringify({
        stripe_account_id: stripeAccountId,
        onboarding_url: accountLink.url,
        is_onboarded: isOnboarded,
        charges_enabled: accountDetails.charges_enabled || false,
        payouts_enabled: accountDetails.payouts_enabled || false,
        details_submitted: accountDetails.details_submitted || false,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
