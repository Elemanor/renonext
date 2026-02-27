import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic']
const THUMBNAIL_MAX_DIMENSION = 400
const STORAGE_BUCKET = 'job-progress'

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

    // Parse multipart form data
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const jobId = formData.get('job_id') as string | null
    const updateType = (formData.get('update_type') as string) || 'photo_update'
    const message = formData.get('message') as string | null
    const isPublic = formData.get('is_public') === 'true'
    const lat = formData.get('lat') ? parseFloat(formData.get('lat') as string) : null
    const lng = formData.get('lng') ? parseFloat(formData.get('lng') as string) : null

    if (!file) {
      return new Response(
        JSON.stringify({ error: 'No file provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!jobId) {
      return new Response(
        JSON.stringify({ error: 'Missing required field: job_id' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return new Response(
        JSON.stringify({
          error: 'Invalid file type',
          allowed: ALLOWED_TYPES,
          received: file.type,
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return new Response(
        JSON.stringify({
          error: `File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)} MB`,
          size: file.size,
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verify the job exists and the user is the assigned pro
    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .select('id, assigned_pro_id, client_id, status')
      .eq('id', jobId)
      .single()

    if (jobError || !job) {
      return new Response(
        JSON.stringify({ error: 'Job not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (job.assigned_pro_id !== user.id) {
      return new Response(
        JSON.stringify({ error: 'Only the assigned professional can upload progress photos' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!['assigned', 'in_progress'].includes(job.status)) {
      return new Response(
        JSON.stringify({ error: `Cannot upload photos for job in status: ${job.status}` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Generate file path with timestamp and random suffix
    const timestamp = Date.now()
    const randomSuffix = Math.random().toString(36).substring(2, 8)
    const extension = file.name.split('.').pop() || 'jpg'
    const filePath = `${jobId}/${timestamp}-${randomSuffix}.${extension}`
    const thumbnailPath = `${jobId}/thumb-${timestamp}-${randomSuffix}.${extension}`

    // Read the file buffer
    const fileBuffer = await file.arrayBuffer()
    const fileBytes = new Uint8Array(fileBuffer)

    // Ensure the storage bucket exists
    const { error: bucketError } = await supabase.storage.getBucket(STORAGE_BUCKET)
    if (bucketError) {
      await supabase.storage.createBucket(STORAGE_BUCKET, {
        public: true,
        fileSizeLimit: MAX_FILE_SIZE,
        allowedMimeTypes: ALLOWED_TYPES,
      })
    }

    // Upload original image
    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, fileBytes, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      return new Response(
        JSON.stringify({ error: 'Failed to upload file', details: uploadError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Upload a copy as thumbnail (in a production system, this would be resized)
    // For now we store the same file; a separate image processing pipeline would handle resizing
    await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(thumbnailPath, fileBytes, {
        contentType: file.type,
        upsert: false,
      })

    // Get public URLs
    const { data: imageUrlData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(filePath)

    const { data: thumbUrlData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(thumbnailPath)

    const imageUrl = imageUrlData.publicUrl
    const thumbnailUrl = thumbUrlData.publicUrl

    // Create a job_progress entry
    const { data: progressEntry, error: progressError } = await supabase
      .from('job_progress')
      .insert({
        job_id: jobId,
        pro_id: user.id,
        update_type: updateType,
        message: message || 'Progress photo uploaded',
        photos: [{ url: imageUrl, thumbnail: thumbnailUrl, filename: file.name, size: file.size }],
        lat,
        lng,
        is_public: isPublic,
        metadata: {
          file_type: file.type,
          file_size: file.size,
          original_filename: file.name,
        },
      })
      .select()
      .single()

    if (progressError) {
      return new Response(
        JSON.stringify({ error: 'Failed to create progress entry', details: progressError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Notify the client about the progress update
    await supabase.from('notifications').insert({
      user_id: job.client_id,
      type: 'job_progress',
      title: 'New progress photo',
      body: message || 'Your pro uploaded a new progress photo.',
      data: {
        job_id: jobId,
        progress_id: progressEntry.id,
        image_url: thumbnailUrl,
      },
    })

    return new Response(
      JSON.stringify({
        progress_id: progressEntry.id,
        image_url: imageUrl,
        thumbnail_url: thumbnailUrl,
        file_size: file.size,
        update_type: updateType,
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
