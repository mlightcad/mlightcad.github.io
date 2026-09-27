import { createClient, type SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1'

/**
 * Resolve the platform secret key for admin (BYPASSRLS) access.
 * Prefers `SUPABASE_SECRET_KEYS` JSON (`default`); falls back to legacy service_role.
 */
export function resolveSecretKey(): string | undefined {
  const raw = Deno.env.get('SUPABASE_SECRET_KEYS')
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as Record<string, string>
      if (parsed.default) return parsed.default
    } catch {
      // Fall through to legacy env.
    }
  }
  return Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? undefined
}

/** Admin Supabase client (secret key / legacy service_role). */
export function adminClient(): SupabaseClient {
  const url = Deno.env.get('SUPABASE_URL')
  const key = resolveSecretKey()
  if (!url || !key) {
    throw new Error('Missing SUPABASE_URL or secret key (SUPABASE_SECRET_KEYS / SUPABASE_SERVICE_ROLE_KEY)')
  }
  return createClient(url, key, { auth: { persistSession: false } })
}

/** JSON response helper. */
export function json(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  })
}
