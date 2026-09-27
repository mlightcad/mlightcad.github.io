/**
 * Customer license portal API (magic-link).
 *
 * POST { action: "request-link", email }
 * POST { action: "session", sessionToken }
 *
 * Secrets: RESEND_*, LICENSE_PORTAL_BASE_URL
 * verify_jwt = false
 */

import { adminClient, json } from '../_shared/admin.ts'
import { handleOptions, withCors } from '../_shared/cors.ts'
import { randomToken, sha256Hex } from '../_shared/crypto.ts'
import { portalBaseUrl } from '../_shared/fulfill.ts'
import { LICENSE_PRODUCT } from '../_shared/license-jwt.ts'
import { sendEmail } from '../_shared/resend.ts'

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 // 24h

type LicenseView = {
  id: string
  product: string
  product_type: string
  status: string
  expires_at: string
  license_jwt: string
  created_at: string
}

async function requestLink(emailRaw: string): Promise<Response> {
  const email = emailRaw.trim().toLowerCase()
  if (!email.includes('@')) return json(400, { error: 'Invalid email' })

  const supabase = adminClient()
  const { data: licenses, error } = await supabase
    .from('licenses')
    .select('id')
    .eq('email', email)
    .eq('status', 'active')
    .limit(1)
  if (error) throw error

  // Always return ok to avoid email enumeration.
  if (!licenses?.length) {
    console.log('[portal] no licenses for', email)
    return json(200, { ok: true })
  }

  const plaintext = randomToken('mls_', 32)
  const tokenHash = await sha256Hex(plaintext)
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS)
  const { error: insErr } = await supabase.from('portal_sessions').insert({
    email,
    token_hash: tokenHash,
    expires_at: expiresAt.toISOString(),
  })
  if (insErr) throw insErr

  const link = `${portalBaseUrl()}?session=${encodeURIComponent(plaintext)}`
  const sent = await sendEmail({
    to: email,
    subject: 'Your MLightCAD license portal link',
    text: [
      'Use this link to view your DWG Parser offline license key:',
      '',
      link,
      '',
      `This link expires at ${expiresAt.toISOString()}.`,
      '',
      'If you did not request this, ignore this email.',
    ].join('\n'),
    html: `
      <p>Use this link to view your DWG Parser offline license key:</p>
      <p><a href="${link}">${link}</a></p>
      <p>This link expires at <strong>${expiresAt.toISOString()}</strong>.</p>
    `,
  })
  if (!sent.ok || sent.skipped) {
    throw new Error(sent.error ?? 'Portal link email was not sent')
  }

  return json(200, { ok: true })
}

async function loadSession(sessionToken: string): Promise<{ email: string } | null> {
  const hash = await sha256Hex(sessionToken)
  const supabase = adminClient()
  const { data, error } = await supabase
    .from('portal_sessions')
    .select('email, expires_at')
    .eq('token_hash', hash)
    .maybeSingle()
  if (error) throw error
  if (!data) return null
  if (new Date(data.expires_at).getTime() < Date.now()) return null
  return { email: data.email }
}

async function sessionPayload(sessionToken: string): Promise<Response> {
  const session = await loadSession(sessionToken)
  if (!session) return json(401, { error: 'Invalid or expired session' })

  const supabase = adminClient()
  const { data, error } = await supabase
    .from('licenses')
    .select('id, product, product_type, status, expires_at, license_jwt, created_at')
    .eq('email', session.email)
    .order('created_at', { ascending: false })
  if (error) throw error

  return json(200, {
    ok: true,
    email: session.email,
    product: LICENSE_PRODUCT,
    licenses: (data ?? []) as LicenseView[],
  })
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return handleOptions(req)

  try {
    if (req.method !== 'POST') {
      return withCors(req, json(405, { error: 'Method not allowed' }))
    }

    const body = (await req.json()) as {
      action?: string
      email?: string
      sessionToken?: string
    }

    let res: Response
    switch (body.action) {
      case 'request-link':
        res = await requestLink(body.email ?? '')
        break
      case 'session':
        res = await sessionPayload(body.sessionToken ?? '')
        break
      default:
        res = json(400, { error: 'Unknown action' })
    }
    return withCors(req, res)
  } catch (err) {
    console.error('license-portal error', err)
    return withCors(req, json(500, { error: 'Server error' }))
  }
})
