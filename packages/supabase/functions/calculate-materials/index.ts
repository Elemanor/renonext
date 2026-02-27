import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface MaterialResult {
  material_name: string
  quantity: number
  unit: string
  estimated_unit_price: number
  estimated_total: number
  is_required: boolean
  notes: string | null
}

interface RequestBody {
  category: string
  details: Record<string, number | string | boolean>
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
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { category, details }: RequestBody = await req.json()

    if (!category || !details) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: category and details' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Look up category by slug
    const { data: categoryData, error: catError } = await supabase
      .from('categories')
      .select('id, name, slug')
      .eq('slug', category)
      .single()

    if (catError || !categoryData) {
      return new Response(
        JSON.stringify({ error: `Category not found: ${category}` }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Fetch material templates for this category
    const { data: templates, error: tplError } = await supabase
      .from('material_templates')
      .select('*')
      .eq('category_id', categoryData.id)
      .order('sort_order', { ascending: true })

    if (tplError) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch material templates', details: tplError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!templates || templates.length === 0) {
      return new Response(
        JSON.stringify({ error: `No material templates found for category: ${category}` }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Evaluate each formula with the provided details
    const materials: MaterialResult[] = []

    for (const template of templates) {
      let quantity: number

      try {
        // Create a safe evaluation context with the details object
        const evalFunc = new Function('details', `"use strict"; return (${template.formula});`)
        const rawQuantity = evalFunc(details)
        quantity = typeof rawQuantity === 'number' && !isNaN(rawQuantity) ? rawQuantity : (template.default_quantity || 1)
      } catch {
        // If formula evaluation fails, use the default quantity
        quantity = template.default_quantity || 1
      }

      // Ensure quantity is at least 1 for required materials
      if (template.is_required && quantity < 1) {
        quantity = 1
      }

      // Skip non-required materials that evaluate to 0 or less
      if (!template.is_required && quantity <= 0) {
        continue
      }

      const estimatedUnitPrice = template.estimated_unit_price || 0
      const estimatedTotal = Math.round(quantity * estimatedUnitPrice * 100) / 100

      materials.push({
        material_name: template.material_name,
        quantity: Math.round(quantity * 100) / 100,
        unit: template.unit,
        estimated_unit_price: estimatedUnitPrice,
        estimated_total: estimatedTotal,
        is_required: template.is_required,
        notes: template.notes,
      })
    }

    const totalEstimate = materials.reduce((sum, m) => sum + m.estimated_total, 0)
    const requiredTotal = materials
      .filter((m) => m.is_required)
      .reduce((sum, m) => sum + m.estimated_total, 0)

    return new Response(
      JSON.stringify({
        category: categoryData.name,
        category_slug: categoryData.slug,
        details_provided: details,
        materials,
        summary: {
          total_items: materials.length,
          required_items: materials.filter((m) => m.is_required).length,
          optional_items: materials.filter((m) => !m.is_required).length,
          required_materials_estimate: Math.round(requiredTotal * 100) / 100,
          total_materials_estimate: Math.round(totalEstimate * 100) / 100,
        },
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
