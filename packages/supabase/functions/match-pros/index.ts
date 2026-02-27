import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface RequestBody {
  lat: number
  lng: number
  radius_km?: number
  category?: string
  sort_by?: 'distance' | 'rating' | 'price' | 'experience'
  max_results?: number
  min_rating?: number
  is_urgent?: boolean
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

    const {
      lat,
      lng,
      radius_km = 25,
      category,
      sort_by = 'distance',
      max_results = 20,
      min_rating = 0,
      is_urgent = false,
    }: RequestBody = await req.json()

    if (!lat || !lng) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: lat and lng' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Validate coordinate ranges
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return new Response(
        JSON.stringify({ error: 'Invalid coordinates: lat must be -90 to 90, lng must be -180 to 180' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Use the find_nearby_pros database function
    const { data: nearbyPros, error: searchError } = await supabase
      .rpc('find_nearby_pros', {
        search_lat: lat,
        search_lng: lng,
        radius_km: is_urgent ? Math.max(radius_km, 50) : radius_km,
        cat_slug: category || null,
      })

    if (searchError) {
      return new Response(
        JSON.stringify({ error: 'Search failed', details: searchError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    let results = nearbyPros || []

    // Apply minimum rating filter
    if (min_rating > 0) {
      results = results.filter((pro: Record<string, unknown>) => (pro.avg_rating as number) >= min_rating)
    }

    // Sort results
    switch (sort_by) {
      case 'rating':
        results.sort((a: Record<string, unknown>, b: Record<string, unknown>) =>
          (b.avg_rating as number) - (a.avg_rating as number)
        )
        break
      case 'price':
        results.sort((a: Record<string, unknown>, b: Record<string, unknown>) =>
          ((a.hourly_rate_min as number) || 0) - ((b.hourly_rate_min as number) || 0)
        )
        break
      case 'experience':
        results.sort((a: Record<string, unknown>, b: Record<string, unknown>) =>
          ((b.years_experience as number) || 0) - ((a.years_experience as number) || 0)
        )
        break
      case 'distance':
      default:
        // Already sorted by distance from the database function
        break
    }

    // Limit results
    results = results.slice(0, max_results)

    // Enrich results with category information if a category was specified
    let categoryInfo = null
    if (category) {
      const { data: catData } = await supabase
        .from('categories')
        .select('id, name, slug, icon')
        .eq('slug', category)
        .single()
      categoryInfo = catData
    }

    // Fetch gallery preview for each pro (first featured image)
    const proProfileIds = results.map((r: Record<string, unknown>) => r.pro_profile_id)

    let galleryPreviews: Record<string, string> = {}
    if (proProfileIds.length > 0) {
      const { data: gallery } = await supabase
        .from('pro_gallery')
        .select('pro_profile_id, thumbnail_url, image_url')
        .in('pro_profile_id', proProfileIds)
        .eq('is_featured', true)
        .limit(1)

      if (gallery) {
        for (const item of gallery) {
          galleryPreviews[item.pro_profile_id] = item.thumbnail_url || item.image_url
        }
      }
    }

    // Format response
    const formattedResults = results.map((pro: Record<string, unknown>) => ({
      pro_profile_id: pro.pro_profile_id,
      user_id: pro.user_id,
      full_name: pro.full_name,
      avatar_url: pro.avatar_url,
      headline: pro.headline,
      bio: pro.bio,
      hourly_rate: {
        min: pro.hourly_rate_min,
        max: pro.hourly_rate_max,
      },
      rating: {
        average: pro.avg_rating,
        total_reviews: pro.total_reviews,
      },
      stats: {
        total_jobs_completed: pro.total_jobs_completed,
        years_experience: pro.years_experience,
        response_time_minutes: pro.response_time_minutes,
      },
      location: {
        city: pro.city,
        distance_km: Math.round((pro.distance_km as number) * 10) / 10,
      },
      gallery_preview: galleryPreviews[pro.pro_profile_id as string] || null,
    }))

    return new Response(
      JSON.stringify({
        results: formattedResults,
        count: formattedResults.length,
        search_params: {
          lat,
          lng,
          radius_km: is_urgent ? Math.max(radius_km, 50) : radius_km,
          category: categoryInfo,
          sort_by,
          min_rating,
          is_urgent,
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
