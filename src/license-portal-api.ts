/**
 * Browser client for the license-portal Edge Function.
 */

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined

/** Whether the portal API can be called from this build. */
export function isPortalConfigured(): boolean {
  return Boolean(url && publishableKey)
}

async function portalFetch(body: Record<string, unknown>): Promise<Response> {
  if (!url || !publishableKey) {
    throw new Error('Supabase not configured')
  }
  return fetch(`${url.replace(/\/$/, '')}/functions/v1/license-portal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: publishableKey,
      Authorization: `Bearer ${publishableKey}`,
    },
    body: JSON.stringify(body),
  })
}

export type PortalLicense = {
  id: string
  product: string
  product_type: string
  status: string
  expires_at: string
  license_jwt: string
  created_at: string
}

export type PortalSession = {
  email: string
  product: string
  licenses: PortalLicense[]
}

/** Request a magic-link email. */
export async function requestPortalLink(email: string): Promise<void> {
  const res = await portalFetch({ action: 'request-link', email })
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string }
    throw new Error(body.error ?? `HTTP ${res.status}`)
  }
}

/** Load licenses for a portal session token. */
export async function fetchPortalSession(sessionToken: string): Promise<PortalSession> {
  const res = await portalFetch({ action: 'session', sessionToken })
  const body = (await res.json()) as PortalSession & { ok?: boolean; error?: string }
  if (!res.ok || !body.ok) throw new Error(body.error ?? `HTTP ${res.status}`)
  return body
}
