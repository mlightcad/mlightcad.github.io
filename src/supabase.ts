import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined

let client: SupabaseClient | null = null

/** Browser Supabase client (publishable key). Unused for checkout; kept for future portals. */
export function getSupabase(): SupabaseClient | null {
  if (!url || !publishableKey) return null
  if (!client) client = createClient(url, publishableKey)
  return client
}

/** Whether Vite has Supabase URL + publishable key configured. */
export function isSupabaseConfigured(): boolean {
  return Boolean(url && publishableKey)
}
