import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface RequestBody {
  user_id: string
  title: string
  body: string
  type: string
  data?: Record<string, unknown>
  push_token?: string
}

interface ExpoPushMessage {
  to: string
  title: string
  body: string
  data?: Record<string, unknown>
  sound?: string
  badge?: number
  channelId?: string
  priority?: 'default' | 'normal' | 'high'
}

const EXPO_PUSH_URL = 'https://exp.host/--/api/v2/push/send'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function sendExpoPushNotification(message: ExpoPushMessage): Promise<{ success: boolean; ticket_id?: string; error?: string }> {
  try {
    const response = await fetch(EXPO_PUSH_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })

    const result = await response.json()

    if (result.data && result.data.status === 'ok') {
      return { success: true, ticket_id: result.data.id }
    }

    return {
      success: false,
      error: result.data?.message || result.errors?.[0]?.message || 'Unknown push error',
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Push delivery failed'
    return { success: false, error: errorMessage }
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

    const { user_id, title, body, type, data, push_token }: RequestBody = await req.json()

    if (!user_id || !title || !type) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: user_id, title, type' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verify user exists
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, full_name')
      .eq('id', user_id)
      .single()

    if (profileError || !profile) {
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Store notification in the database
    const { data: notification, error: notifError } = await supabase
      .from('notifications')
      .insert({
        user_id,
        type,
        title,
        body: body || '',
        data: data || {},
        is_read: false,
      })
      .select()
      .single()

    if (notifError) {
      return new Response(
        JSON.stringify({ error: 'Failed to create notification', details: notifError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Attempt push notification delivery if a push token is provided
    let pushResult: { success: boolean; ticket_id?: string; error?: string } | null = null

    if (push_token && push_token.startsWith('ExponentPushToken[')) {
      // Determine channel based on notification type
      let channelId = 'default'
      let priority: 'default' | 'normal' | 'high' = 'default'

      if (type.includes('emergency') || type.includes('urgent')) {
        channelId = 'urgent'
        priority = 'high'
      } else if (type.includes('message') || type.includes('chat')) {
        channelId = 'messages'
        priority = 'high'
      } else if (type.includes('bid') || type.includes('payment')) {
        channelId = 'transactions'
        priority = 'normal'
      }

      const pushMessage: ExpoPushMessage = {
        to: push_token,
        title,
        body: body || '',
        data: {
          ...data,
          notification_id: notification.id,
          type,
        },
        sound: 'default',
        channelId,
        priority,
      }

      pushResult = await sendExpoPushNotification(pushMessage)
    }

    return new Response(
      JSON.stringify({
        notification_id: notification.id,
        stored: true,
        push_delivered: pushResult?.success ?? false,
        push_ticket_id: pushResult?.ticket_id ?? null,
        push_error: pushResult?.error ?? null,
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
