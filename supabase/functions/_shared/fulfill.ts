import type { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1'
import {
  LICENSE_PRODUCT,
  customerSubFor,
  expiryForProduct,
  issueLicenseJwt,
  type ProductType,
} from './license-jwt.ts'
import { sendEmail } from './resend.ts'

export type FulfillInput = {
  paddleTransactionId: string
  paddleCustomerId: string | null
  email: string
  productType: ProductType
  periodEndIso?: string | null
}

export type FulfillResult = {
  licenseId: string
  licenseJwt: string
  expiresAt: string
  reused: boolean
}

/** Customer portal page base URL (no query). */
export function portalBaseUrl(): string {
  return (
    Deno.env.get('LICENSE_PORTAL_BASE_URL') ?? 'https://mlightcad.com/license-portal.html'
  ).replace(/\/$/, '')
}

/** Build HTML + text fulfillment email (license key + GitHub access note). */
function fulfillmentEmail(opts: {
  email: string
  productType: ProductType
  licenseJwt: string
  expiresAt: Date
}): { subject: string; html: string; text: string } {
  const portal = portalBaseUrl()
  const exp = opts.expiresAt.toISOString().slice(0, 10)
  const subject = 'Your MLightCAD DWG Parser license'
  const text = [
    'Thank you for purchasing the Proprietary DWG Parser.',
    '',
    `Product: ${LICENSE_PRODUCT}`,
    `License type: ${opts.productType}`,
    `License expires: ${exp}`,
    '',
    '--- Offline license key ---',
    opts.licenseJwt,
    '',
    '--- GitHub Packages access ---',
    'We will grant your GitHub account access to the private package.',
    'Reply to this email (or contact support@mlightcad.com) with your GitHub username if we do not already have it.',
    '',
    `View your license key anytime: ${portal}`,
    'Request a portal link with this purchase email.',
    '',
    'Support: support@mlightcad.com',
  ].join('\n')

  const html = `
    <div style="font-family:Segoe UI,Helvetica,Arial,sans-serif;line-height:1.5;color:#0b0f14">
      <h1 style="font-size:20px">Your MLightCAD DWG Parser license</h1>
      <p>Thank you for purchasing the Proprietary DWG Parser.</p>
      <p>
        <strong>Product:</strong> <code>${LICENSE_PRODUCT}</code><br/>
        <strong>Type:</strong> ${opts.productType}<br/>
        <strong>Expires:</strong> ${exp}
      </p>
      <h2 style="font-size:16px">Offline license key</h2>
      <pre style="background:#f4f6f8;padding:12px;overflow:auto;white-space:pre-wrap">${opts.licenseJwt}</pre>
      <h2 style="font-size:16px">GitHub Packages access</h2>
      <p>
        We will grant your GitHub account access to the private package.
        Reply with your <strong>GitHub username</strong> if we do not already have it.
      </p>
      <p>
        View your license key anytime:
        <a href="${portal}">${portal}</a>
        (request a magic link with <strong>${opts.email}</strong>).
      </p>
      <p>Support: <a href="mailto:support@mlightcad.com">support@mlightcad.com</a></p>
    </div>
  `.trim()

  return { subject, html, text }
}

async function emailLicense(
  email: string,
  productType: ProductType,
  licenseJwt: string,
  expiresAt: Date,
): Promise<void> {
  const mail = fulfillmentEmail({ email, productType, licenseJwt, expiresAt })
  const sent = await sendEmail({ to: email, ...mail })
  // Treat skip (missing RESEND_API_KEY) as failure so orders are not marked fulfilled
  // without delivery; Paddle will retry and support is notified via the webhook catch.
  if (!sent.ok || sent.skipped) {
    throw new Error(sent.error ?? 'License email was not sent (Resend unavailable or failed)')
  }
}

/**
 * Issue (or reuse) an offline license JWT for a paid transaction, then email the buyer.
 * Package download access is granted separately via GitHub Packages.
 */
export async function fulfillPaidOrder(
  supabase: SupabaseClient,
  input: FulfillInput,
): Promise<FulfillResult> {
  const email = input.email.trim().toLowerCase()
  if (!email.includes('@')) throw new Error('Customer email required for fulfillment')

  const { data: existing, error: existingErr } = await supabase
    .from('licenses')
    .select('id, license_jwt, expires_at')
    .eq('paddle_transaction_id', input.paddleTransactionId)
    .maybeSingle()
  if (existingErr) throw existingErr

  if (existing) {
    await emailLicense(
      email,
      input.productType,
      existing.license_jwt,
      new Date(existing.expires_at),
    )
    return {
      licenseId: existing.id,
      licenseJwt: existing.license_jwt,
      expiresAt: existing.expires_at,
      reused: true,
    }
  }

  // Annual renewal: extend the latest active annual license for this customer.
  if (input.productType === 'annual' && input.paddleCustomerId) {
    const { data: prior } = await supabase
      .from('licenses')
      .select('id, customer_sub, license_jwt, expires_at')
      .eq('paddle_customer_id', input.paddleCustomerId)
      .eq('product', LICENSE_PRODUCT)
      .eq('product_type', 'annual')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (prior) {
      const expiresAt = expiryForProduct(input.productType, input.periodEndIso)
      const jwt = await issueLicenseJwt(prior.customer_sub, expiresAt)
      const { error: updErr } = await supabase
        .from('licenses')
        .update({
          license_jwt: jwt,
          expires_at: expiresAt.toISOString(),
          paddle_transaction_id: input.paddleTransactionId,
          // Keep portal lookup in sync if the buyer paid with a new checkout email.
          email,
          updated_at: new Date().toISOString(),
        })
        .eq('id', prior.id)
      if (updErr) throw updErr

      await emailLicense(email, input.productType, jwt, expiresAt)
      return {
        licenseId: prior.id,
        licenseJwt: jwt,
        expiresAt: expiresAt.toISOString(),
        reused: true,
      }
    }
  }

  const expiresAt = expiryForProduct(input.productType, input.periodEndIso)
  const customerSub = customerSubFor(input.paddleCustomerId, email)
  const licenseJwt = await issueLicenseJwt(customerSub, expiresAt)

  const { data: license, error: licErr } = await supabase
    .from('licenses')
    .insert({
      paddle_transaction_id: input.paddleTransactionId,
      paddle_customer_id: input.paddleCustomerId,
      email,
      product: LICENSE_PRODUCT,
      product_type: input.productType,
      customer_sub: customerSub,
      license_jwt: licenseJwt,
      expires_at: expiresAt.toISOString(),
      status: 'active',
    })
    .select('id')
    .single()
  if (licErr) throw licErr

  await emailLicense(email, input.productType, licenseJwt, expiresAt)

  return {
    licenseId: license.id,
    licenseJwt,
    expiresAt: expiresAt.toISOString(),
    reused: false,
  }
}
