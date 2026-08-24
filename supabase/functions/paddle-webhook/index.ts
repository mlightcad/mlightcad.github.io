/**
 * Paddle Billing webhook → Supabase.
 *
 * Use one Supabase project per Paddle environment (sandbox vs live).
 * Same function name and secret *names* in both projects; different *values*.
 *
 * Secrets (supabase secrets set):
 * - PADDLE_API_KEY
 * - PADDLE_WEBHOOK_SECRET
 * - PADDLE_ENV                  (`sandbox` | `production`)
 * - PADDLE_PRICE_PERPETUAL      (price id for that Paddle environment)
 * - PADDLE_PRICE_ANNUAL
 * - SUPPORT_NOTIFY_EMAIL        (optional)
 * - SUPABASE_URL / SUPABASE_SECRET_KEYS (auto; falls back to SUPABASE_SERVICE_ROLE_KEY)
 *
 * Deploy (after `supabase link --project-ref <ref>`):
 *   supabase functions deploy paddle-webhook
 *
 * Notification URL:
 *   https://<project-ref>.supabase.co/functions/v1/paddle-webhook
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1'
import { Environment, EventName, Paddle } from 'npm:@paddle/paddle-node-sdk@3.10.0'

const PRICE_PERPETUAL = Deno.env.get('PADDLE_PRICE_PERPETUAL') ?? ''
const PRICE_ANNUAL = Deno.env.get('PADDLE_PRICE_ANNUAL') ?? ''
const SUPPORT_EMAIL = Deno.env.get('SUPPORT_NOTIFY_EMAIL') ?? 'support@mlightcad.com'

type ProductType = 'perpetual' | 'annual' | 'unknown'

/** Resolve Paddle API host from secret (defaults to sandbox). */
function paddleEnvironment(): Environment {
  return Deno.env.get('PADDLE_ENV') === 'production' ? Environment.production : Environment.sandbox
}

/** Map a Paddle price id to our product type. */
function productTypeForPrice(priceId: string | null | undefined): ProductType {
  if (!priceId) return 'unknown'
  if (PRICE_PERPETUAL && priceId === PRICE_PERPETUAL) return 'perpetual'
  if (PRICE_ANNUAL && priceId === PRICE_ANNUAL) return 'annual'
  return 'unknown'
}


/** JSON response helper. */
function json(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

/**
 * Resolve the platform secret key for admin (BYPASSRLS) access.
 * Prefers `SUPABASE_SECRET_KEYS` JSON (`default`); falls back to legacy service_role.
 */
function resolveSecretKey(): string | undefined {
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
function adminClient() {
  const url = Deno.env.get('SUPABASE_URL')
  const key = resolveSecretKey()
  if (!url || !key) {
    throw new Error('Missing SUPABASE_URL or secret key (SUPABASE_SECRET_KEYS / SUPABASE_SERVICE_ROLE_KEY)')
  }
  return createClient(url, key, { auth: { persistSession: false } })
}

/**
 * Mark a webhook event as processed (idempotency).
 *
 * @returns `true` when this is the first time we see the event.
 */
async function claimEvent(
  supabase: ReturnType<typeof adminClient>,
  eventId: string,
  eventType: string,
): Promise<boolean> {
  const { error } = await supabase.from('paddle_webhook_events').insert({
    event_id: eventId,
    event_type: eventType,
  })
  if (error) {
    if (error.code === '23505') return false
    throw error
  }
  return true
}

/** Upsert a Paddle customer row. */
async function upsertCustomer(
  supabase: ReturnType<typeof adminClient>,
  paddleCustomerId: string,
  email: string | null,
): Promise<void> {
  const { error } = await supabase.from('paddle_customers').upsert(
    {
      paddle_customer_id: paddleCustomerId,
      email,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'paddle_customer_id' },
  )
  if (error) throw error
}

/** Best-effort email lookup via Paddle Customers API. */
async function fetchCustomerEmail(paddle: Paddle, customerId: string | null): Promise<string | null> {
  if (!customerId) return null
  try {
    const customer = await paddle.customers.get(customerId)
    return customer.email ?? null
  } catch (err) {
    console.error('Failed to fetch Paddle customer email', err)
    return null
  }
}

/** Log a fulfillment reminder (extend later with Resend / SMTP). */
function notifySupport(summary: string): void {
  console.log(`[fulfillment] notify ${SUPPORT_EMAIL}: ${summary}`)
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return json(405, { error: 'Method not allowed' })
  }

  const apiKey = Deno.env.get('PADDLE_API_KEY')
  const secret = Deno.env.get('PADDLE_WEBHOOK_SECRET')
  if (!apiKey || !secret) {
    console.error('Missing PADDLE_API_KEY or PADDLE_WEBHOOK_SECRET')
    return json(500, { error: 'Server misconfigured' })
  }
  if (!PRICE_PERPETUAL || !PRICE_ANNUAL) {
    console.warn('PADDLE_PRICE_PERPETUAL / PADDLE_PRICE_ANNUAL not set; product_type may be unknown')
  }

  const signature = req.headers.get('paddle-signature') ?? ''
  const rawBody = await req.text()
  const paddle = new Paddle(apiKey, { environment: paddleEnvironment() })

  let event
  try {
    event = await paddle.webhooks.unmarshal(rawBody, secret, signature)
  } catch (err) {
    console.error('Webhook signature verification failed', err)
    return json(400, { error: 'Invalid signature' })
  }

  const supabase = adminClient()
  const first = await claimEvent(supabase, event.eventId, event.eventType)
  if (!first) {
    return json(200, { ok: true, duplicate: true })
  }

  try {
    switch (event.eventType) {
      case EventName.TransactionCompleted: {
        const tx = event.data
        const email = await fetchCustomerEmail(paddle, tx.customerId)
        if (tx.customerId) {
          await upsertCustomer(supabase, tx.customerId, email)
        }

        const priceId = tx.items[0]?.price?.id ?? null
        const productType = productTypeForPrice(priceId)
        const amountTotal = tx.details?.totals?.total ?? null

        const { error } = await supabase.from('license_orders').upsert(
          {
            paddle_transaction_id: tx.id,
            paddle_event_id: event.eventId,
            paddle_customer_id: tx.customerId,
            email,
            status: tx.status,
            price_id: priceId,
            product_type: productType,
            amount_total: amountTotal,
            currency: tx.currencyCode,
            custom_data: tx.customData,
            fulfillment_status: 'pending',
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'paddle_transaction_id' },
        )
        if (error) throw error

        notifySupport(
          `Paid ${productType} order ${tx.id} for ${email ?? tx.customerId ?? 'unknown'} (${amountTotal ?? '?'} ${tx.currencyCode})`,
        )
        break
      }

      case EventName.SubscriptionCreated:
      case EventName.SubscriptionUpdated:
      case EventName.SubscriptionActivated:
      case EventName.SubscriptionCanceled:
      case EventName.SubscriptionPastDue:
      case EventName.SubscriptionPaused:
      case EventName.SubscriptionResumed: {
        const sub = event.data
        const email = await fetchCustomerEmail(paddle, sub.customerId)
        await upsertCustomer(supabase, sub.customerId, email)

        const priceId = sub.items[0]?.price?.id ?? null
        const periodEnd = sub.currentBillingPeriod?.endsAt ?? null

        const { error } = await supabase.from('license_subscriptions').upsert(
          {
            paddle_subscription_id: sub.id,
            paddle_customer_id: sub.customerId,
            email,
            price_id: priceId,
            status: sub.status,
            current_period_end: periodEnd,
            custom_data: sub.customData,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'paddle_subscription_id' },
        )
        if (error) throw error

        notifySupport(`Subscription ${sub.id} → ${sub.status} (${email ?? sub.customerId})`)
        break
      }

      default:
        // Acknowledged but unused events still count as processed (idempotent).
        break
    }
  } catch (err) {
    console.error('Webhook handler failed', err)
    // Delete claim so Paddle can retry
    await supabase.from('paddle_webhook_events').delete().eq('event_id', event.eventId)
    return json(500, { error: 'Handler failed' })
  }

  return json(200, { ok: true })
})
