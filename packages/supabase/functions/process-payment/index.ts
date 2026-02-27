import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface RequestBody {
  job_id: string
  amount: number
  type: 'job_payment' | 'material_payment' | 'tool_rental' | 'tip'
  payment_method_id?: string
}

const PLATFORM_FEE_PERCENTAGE = 0.10 // 10% platform fee

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

    const { job_id, amount, type, payment_method_id }: RequestBody = await req.json()

    if (!job_id || !amount || !type) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: job_id, amount, type' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (amount <= 0) {
      return new Response(
        JSON.stringify({ error: 'Amount must be greater than zero' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Fetch the job to verify it exists and get participant info
    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .select('id, client_id, assigned_pro_id, status, final_price')
      .eq('id', job_id)
      .single()

    if (jobError || !job) {
      return new Response(
        JSON.stringify({ error: 'Job not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verify the caller is the client (payer)
    if (job.client_id !== user.id) {
      return new Response(
        JSON.stringify({ error: 'Only the job client can initiate payments' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verify the job has an assigned pro (payee)
    if (!job.assigned_pro_id) {
      return new Response(
        JSON.stringify({ error: 'Job has no assigned professional' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verify the job is in a valid status for payment
    const validStatuses = ['assigned', 'in_progress', 'completed']
    if (!validStatuses.includes(job.status)) {
      return new Response(
        JSON.stringify({ error: `Cannot process payment for job in status: ${job.status}` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Calculate fees
    const platformFee = Math.round(amount * PLATFORM_FEE_PERCENTAGE * 100) / 100
    const netAmount = Math.round((amount - platformFee) * 100) / 100

    // Get the pro's Stripe account for the transfer
    const { data: proProfile } = await supabase
      .from('pro_profiles')
      .select('stripe_account_id')
      .eq('user_id', job.assigned_pro_id)
      .single()

    let stripePaymentIntentId: string | null = null
    let stripeTransferId: string | null = null

    // Process with Stripe if configured
    if (stripeSecretKey && payment_method_id) {
      try {
        // Create a PaymentIntent with Stripe
        const paymentIntentResponse = await fetch('https://api.stripe.com/v1/payment_intents', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${stripeSecretKey}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            amount: String(Math.round(amount * 100)), // Stripe uses cents
            currency: 'cad',
            payment_method: payment_method_id,
            confirm: 'true',
            'metadata[job_id]': job_id,
            'metadata[type]': type,
            'metadata[platform_fee]': String(Math.round(platformFee * 100)),
            ...(proProfile?.stripe_account_id ? {
              'transfer_data[destination]': proProfile.stripe_account_id,
              'transfer_data[amount]': String(Math.round(netAmount * 100)),
            } : {}),
          }),
        })

        const paymentIntent = await paymentIntentResponse.json()

        if (paymentIntent.error) {
          return new Response(
            JSON.stringify({ error: 'Stripe payment failed', details: paymentIntent.error.message }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        stripePaymentIntentId = paymentIntent.id
        stripeTransferId = paymentIntent.transfer?.id || null
      } catch (stripeError) {
        const message = stripeError instanceof Error ? stripeError.message : 'Stripe API error'
        return new Response(
          JSON.stringify({ error: 'Payment processing failed', details: message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    }

    // Record the payment in the database
    const paymentStatus = stripePaymentIntentId ? 'held' : 'pending'

    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert({
        job_id,
        payer_id: user.id,
        payee_id: job.assigned_pro_id,
        amount,
        platform_fee: platformFee,
        net_amount: netAmount,
        type,
        status: paymentStatus,
        stripe_payment_intent_id: stripePaymentIntentId,
        stripe_transfer_id: stripeTransferId,
      })
      .select()
      .single()

    if (paymentError) {
      return new Response(
        JSON.stringify({ error: 'Failed to record payment', details: paymentError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create notification for the pro
    await supabase.from('notifications').insert({
      user_id: job.assigned_pro_id,
      type: 'payment_received',
      title: 'Payment received',
      body: `A payment of $${amount.toFixed(2)} has been ${paymentStatus} for your job.`,
      data: { job_id, payment_id: payment.id, amount, net_amount: netAmount },
    })

    return new Response(
      JSON.stringify({
        payment_id: payment.id,
        status: paymentStatus,
        amount,
        platform_fee: platformFee,
        net_amount: netAmount,
        stripe_payment_intent_id: stripePaymentIntentId,
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
