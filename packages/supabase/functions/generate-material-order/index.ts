import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface RequestBody {
  job_id: string
  material_ids?: string[]
  delivery_address?: string
  delivery_date?: string
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

    const { job_id, material_ids, delivery_address, delivery_date }: RequestBody = await req.json()

    if (!job_id) {
      return new Response(
        JSON.stringify({ error: 'Missing required field: job_id' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verify the job exists and the user is the client
    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .select('id, client_id, assigned_pro_id, address, status')
      .eq('id', job_id)
      .single()

    if (jobError || !job) {
      return new Response(
        JSON.stringify({ error: 'Job not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (job.client_id !== user.id) {
      return new Response(
        JSON.stringify({ error: 'Only the job client can create material orders' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Fetch approved materials for this job
    let materialsQuery = supabase
      .from('job_materials')
      .select('*')
      .eq('job_id', job_id)
      .eq('status', 'approved')

    if (material_ids && material_ids.length > 0) {
      materialsQuery = materialsQuery.in('id', material_ids)
    }

    const { data: materials, error: matError } = await materialsQuery

    if (matError) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch materials', details: matError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!materials || materials.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No approved materials found for this job' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Build the order items
    const orderItems = materials.map((mat) => ({
      material_id: mat.id,
      material_name: mat.material_name,
      quantity: mat.quantity,
      unit: mat.unit,
      estimated_price: mat.estimated_price,
      supplier: mat.supplier,
      notes: mat.notes,
    }))

    // Calculate total amount
    const totalAmount = orderItems.reduce(
      (sum, item) => sum + (item.estimated_price || 0) * item.quantity,
      0
    )
    const roundedTotal = Math.round(totalAmount * 100) / 100

    // Use the job address as default delivery address
    const orderDeliveryAddress = delivery_address || job.address || ''

    // Create Stripe PaymentIntent if Stripe is configured
    let stripePaymentIntentId: string | null = null
    let clientSecret: string | null = null

    if (stripeSecretKey && roundedTotal > 0) {
      try {
        const paymentIntentResponse = await fetch('https://api.stripe.com/v1/payment_intents', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${stripeSecretKey}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            amount: String(Math.round(roundedTotal * 100)),
            currency: 'cad',
            'metadata[job_id]': job_id,
            'metadata[type]': 'material_order',
            'metadata[items_count]': String(orderItems.length),
          }),
        })

        const paymentIntent = await paymentIntentResponse.json()

        if (paymentIntent.error) {
          return new Response(
            JSON.stringify({ error: 'Failed to create payment intent', details: paymentIntent.error.message }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        stripePaymentIntentId = paymentIntent.id
        clientSecret = paymentIntent.client_secret
      } catch (stripeErr) {
        const errMsg = stripeErr instanceof Error ? stripeErr.message : 'Stripe API error'
        return new Response(
          JSON.stringify({ error: 'Payment processing failed', details: errMsg }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    }

    // Create the material order
    const { data: order, error: orderError } = await supabase
      .from('material_orders')
      .insert({
        job_id,
        client_id: user.id,
        items: orderItems,
        total_amount: roundedTotal,
        delivery_address: orderDeliveryAddress,
        delivery_date: delivery_date || null,
        status: 'pending',
        stripe_payment_intent_id: stripePaymentIntentId,
      })
      .select()
      .single()

    if (orderError) {
      return new Response(
        JSON.stringify({ error: 'Failed to create order', details: orderError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Update material statuses to 'ordered'
    const materialIdsToUpdate = materials.map((m) => m.id)
    await supabase
      .from('job_materials')
      .update({ status: 'ordered' })
      .in('id', materialIdsToUpdate)

    // Notify the assigned pro about the order
    if (job.assigned_pro_id) {
      await supabase.from('notifications').insert({
        user_id: job.assigned_pro_id,
        type: 'material_ordered',
        title: 'Materials ordered',
        body: `Client ordered ${orderItems.length} material(s) totaling $${roundedTotal.toFixed(2)} for your job.`,
        data: {
          job_id,
          order_id: order.id,
          total_amount: roundedTotal,
          items_count: orderItems.length,
        },
      })
    }

    return new Response(
      JSON.stringify({
        order_id: order.id,
        status: order.status,
        items: orderItems,
        total_amount: roundedTotal,
        delivery_address: orderDeliveryAddress,
        delivery_date: delivery_date || null,
        stripe_payment_intent_id: stripePaymentIntentId,
        client_secret: clientSecret,
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
