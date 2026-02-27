import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface RequestBody {
  category: string
  details: Record<string, number | string | boolean>
  location?: {
    lat: number
    lng: number
    city?: string
  }
}

interface PriceSuggestion {
  min: number
  max: number
  average: number
  estimatedHours: number
}

// Base rate ranges by category slug (CAD per hour)
const BASE_RATES: Record<string, { minRate: number; maxRate: number; baseHours: number }> = {
  painting: { minRate: 35, maxRate: 55, baseHours: 4 },
  moving: { minRate: 40, maxRate: 65, baseHours: 3 },
  'snow-removal': { minRate: 30, maxRate: 50, baseHours: 1 },
  cleaning: { minRate: 25, maxRate: 45, baseHours: 3 },
  'furniture-assembly': { minRate: 30, maxRate: 50, baseHours: 2 },
  plumbing: { minRate: 50, maxRate: 80, baseHours: 2 },
  electrical: { minRate: 50, maxRate: 85, baseHours: 2 },
  landscaping: { minRate: 30, maxRate: 55, baseHours: 3 },
  handyman: { minRate: 30, maxRate: 50, baseHours: 2 },
  'general-labor': { minRate: 25, maxRate: 40, baseHours: 3 },
}

// City-based cost multipliers (GTA area)
const CITY_MULTIPLIERS: Record<string, number> = {
  toronto: 1.15,
  'north york': 1.10,
  scarborough: 1.05,
  etobicoke: 1.08,
  mississauga: 1.05,
  brampton: 1.00,
  vaughan: 1.08,
  markham: 1.05,
  oakville: 1.12,
  hamilton: 0.95,
  richmond_hill: 1.05,
  ajax: 0.98,
  pickering: 0.98,
  oshawa: 0.92,
  burlington: 1.05,
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function estimateHours(category: string, details: Record<string, number | string | boolean>): number {
  const base = BASE_RATES[category]?.baseHours || 2

  switch (category) {
    case 'painting': {
      const sqft = Number(details.squareFootage) || 300
      const rooms = Number(details.numberOfRooms) || 1
      const coats = Number(details.coatsNeeded) || 2
      // ~100 sqft per hour per coat, plus 1 hour prep per room
      return Math.ceil((sqft * coats) / 100 + rooms * 1)
    }
    case 'moving': {
      const rooms = Number(details.numberOfRooms) || 2
      const floor = Number(details.floor) || 1
      const hasElevator = Boolean(details.hasElevator)
      const distanceKm = Number(details.distanceKm) || 10
      // Base: 1 hour per room, +0.5 per floor without elevator, +0.5 per 10km distance
      const floorPenalty = hasElevator ? 0 : floor * 0.5
      return Math.ceil(rooms * 1 + floorPenalty + distanceKm / 20 + 1)
    }
    case 'snow-removal': {
      const area = Number(details.areaSqFt) || 500
      // ~500 sqft per hour
      return Math.max(1, Math.ceil(area / 500))
    }
    case 'cleaning': {
      const sqft = Number(details.squareFootage) || 800
      const bathrooms = Number(details.numberOfBathrooms) || 1
      const isDeep = details.cleanType === 'deep'
      // ~300 sqft per hour for standard, ~200 for deep, plus 0.5 per bathroom
      const rate = isDeep ? 200 : 300
      return Math.ceil(sqft / rate + bathrooms * 0.5)
    }
    case 'furniture-assembly': {
      const items = Number(details.numberOfItems) || 1
      // ~1.5 hours per item average
      return Math.ceil(items * 1.5)
    }
    case 'landscaping': {
      const yardSize = Number(details.yardSizeSqFt) || 1500
      // ~1000 sqft per hour for general work
      return Math.max(2, Math.ceil(yardSize / 1000))
    }
    default:
      return base
  }
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { category, details, location }: RequestBody = await req.json()

    if (!category || !details) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: category and details' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verify category exists
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

    const rates = BASE_RATES[category] || { minRate: 30, maxRate: 50, baseHours: 2 }
    const estimatedHours = estimateHours(category, details)

    // Apply city multiplier if location is provided
    let cityMultiplier = 1.0
    if (location?.city) {
      const normalizedCity = location.city.toLowerCase().replace(/\s+/g, '_')
      cityMultiplier = CITY_MULTIPLIERS[normalizedCity] || 1.0
    }

    // Check actual pro rates from the database for this category
    const { data: proRates } = await supabase
      .from('pro_categories')
      .select('custom_rate_min, custom_rate_max')
      .eq('category_id', categoryData.id)

    let dbMinRate = rates.minRate
    let dbMaxRate = rates.maxRate

    if (proRates && proRates.length > 0) {
      const mins = proRates.map((r) => r.custom_rate_min).filter(Boolean) as number[]
      const maxes = proRates.map((r) => r.custom_rate_max).filter(Boolean) as number[]

      if (mins.length > 0) {
        dbMinRate = mins.reduce((a, b) => a + b, 0) / mins.length
      }
      if (maxes.length > 0) {
        dbMaxRate = maxes.reduce((a, b) => a + b, 0) / maxes.length
      }
    }

    // Calculate price range
    const minPrice = Math.round(dbMinRate * estimatedHours * cityMultiplier * 100) / 100
    const maxPrice = Math.round(dbMaxRate * estimatedHours * cityMultiplier * 100) / 100
    const averagePrice = Math.round(((minPrice + maxPrice) / 2) * 100) / 100

    // Factor in number of people needed
    const peopleNeeded = Number(details.estimatedPeopleNeeded) || 1
    const adjustedMin = Math.round(minPrice * peopleNeeded * 100) / 100
    const adjustedMax = Math.round(maxPrice * peopleNeeded * 100) / 100
    const adjustedAverage = Math.round(((adjustedMin + adjustedMax) / 2) * 100) / 100

    const suggestion: PriceSuggestion = {
      min: adjustedMin,
      max: adjustedMax,
      average: adjustedAverage,
      estimatedHours,
    }

    return new Response(
      JSON.stringify({
        ...suggestion,
        category: categoryData.name,
        category_slug: categoryData.slug,
        city_multiplier: cityMultiplier,
        people_needed: peopleNeeded,
        rate_range: {
          hourly_min: Math.round(dbMinRate * cityMultiplier * 100) / 100,
          hourly_max: Math.round(dbMaxRate * cityMultiplier * 100) / 100,
        },
        breakdown: {
          base_hourly_min: dbMinRate,
          base_hourly_max: dbMaxRate,
          estimated_hours: estimatedHours,
          city_multiplier: cityMultiplier,
          people_multiplier: peopleNeeded,
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
