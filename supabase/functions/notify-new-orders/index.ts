/**
 * Daily cron: list completed Paddle transactions, email support for any not yet
 * notified. Successful sends are recorded in paddle_support_notifications so
 * they are never emailed again.
 *
 * Secrets: PADDLE_API_KEY, PADDLE_ENV, RESEND_*, SUPPORT_NOTIFY_EMAIL, CRON_SECRET
 *
 * Deploy (CRON_SECRET is not a user JWT — the gateway must not verify JWT):
 *   supabase functions deploy notify-new-orders --no-verify-jwt
 *
 * Invoke (manual):
 *   curl -X POST "$SUPABASE_URL/functions/v1/notify-new-orders" \
 *     -H "Authorization: Bearer $CRON_SECRET"
 */

import { Environment, Paddle, type Transaction } from 'npm:@paddle/paddle-node-sdk@3.10.0'
import { adminClient, json } from '../_shared/admin.ts'
import {
  SUPPORT_EMAIL,
  escapeHtml,
  recordSupportNotified,
} from '../_shared/support-notify.ts'
import { sendEmail } from '../_shared/resend.ts'

/** Look back far enough to cover missed cron days; already-notified rows are skipped. */
const LOOKBACK_DAYS = 14

/**
 * Leave very new transactions for the webhook. Its email says whether the
 * license was issued; if cron records the row first, that email is suppressed.
 */
const WEBHOOK_GRACE_MS = 15 * 60 * 1000

const PRICE_PERPETUAL = Deno.env.get('PADDLE_PRICE_PERPETUAL') ?? ''
const PRICE_ANNUAL = Deno.env.get('PADDLE_PRICE_ANNUAL') ?? ''

function paddleEnvironment(): Environment {
  return Deno.env.get('PADDLE_ENV') === 'production' ? Environment.production : Environment.sandbox
}

function tokenEquals(a: string, b: string): boolean {
  const enc = new TextEncoder()
  const left = enc.encode(a)
  const right = enc.encode(b)
  const len = Math.max(left.length, right.length)
  let diff = left.length === right.length ? 0 : 1
  for (let i = 0; i < len; i++) diff |= (left[i] ?? 0) ^ (right[i] ?? 0)
  return diff === 0
}

function authorized(req: Request): boolean {
  const secret = Deno.env.get('CRON_SECRET')
  if (!secret) {
    console.error('CRON_SECRET is not set')
    return false
  }
  const header = req.headers.get('Authorization') ?? ''
  const match = /^Bearer\s+(.+)$/i.exec(header)
  return Boolean(match && tokenEquals(match[1], secret))
}

function productLabel(priceId: string | null | undefined): string {
  if (!priceId) return 'unknown'
  if (PRICE_PERPETUAL && priceId === PRICE_PERPETUAL) return 'perpetual'
  if (PRICE_ANNUAL && priceId === PRICE_ANNUAL) return 'annual'
  return priceId
}

/** ISO 4217 exponents. Paddle totals are strings in the minor unit. */
const ZERO_DECIMAL = new Set([
  'BIF', 'CLP', 'DJF', 'GNF', 'JPY', 'KMF', 'KRW', 'MGA', 'PYG', 'RWF', 'UGX', 'VND', 'VUV', 'XAF', 'XOF', 'XPF',
])
const THREE_DECIMAL = new Set(['BHD', 'JOD', 'KWD', 'OMR', 'TND'])

function formatAmount(tx: Transaction): string {
  const total = tx.details?.totals?.total
  const currency = (tx.currencyCode ?? '').toUpperCase()
  if (!total) return '(amount n/a)'
  if (!currency) return total
  const digits = ZERO_DECIMAL.has(currency) ? 0 : THREE_DECIMAL.has(currency) ? 3 : 2
  const value = Number(total) / 10 ** digits
  if (!Number.isFinite(value)) return `${total} ${currency}`
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value)
  } catch {
    return `${value.toFixed(digits)} ${currency}`
  }
}

async function listRecentCompleted(paddle: Paddle): Promise<{
  transactions: Transaction[]
  deferredRecent: number
}> {
  const now = Date.now()
  const graceBefore = now - WEBHOOK_GRACE_MS
  const sinceMs = now - LOOKBACK_DAYS * 24 * 60 * 60 * 1000
  const collection = paddle.transactions.list({
    status: ['completed'],
    include: ['customer'],
    orderBy: 'id[DESC]',
    perPage: 200,
    'createdAt[GTE]': new Date(sinceMs).toISOString(),
  })

  const transactions: Transaction[] = []
  let deferredRecent = 0
  for await (const tx of collection) {
    const created = Date.parse(tx.createdAt)
    if (!Number.isNaN(created) && created < sinceMs) {
      // id[DESC] is newest-first; older than lookback → stop.
      break
    }
    if (!Number.isNaN(created) && created > graceBefore) {
      deferredRecent++
      continue
    }
    transactions.push(tx)
  }
  return { transactions, deferredRecent }
}

async function customerEmail(paddle: Paddle, customerId: string | null | undefined): Promise<string | null> {
  if (!customerId) return null
  try {
    const customer = await paddle.customers.get(customerId)
    return customer.email ?? null
  } catch (err) {
    console.error('Failed to fetch customer', customerId, err)
    return null
  }
}

Deno.serve(async (req) => {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return json(405, { error: 'Method not allowed' })
  }
  if (!authorized(req)) {
    return json(401, { error: 'Unauthorized' })
  }

  const apiKey = Deno.env.get('PADDLE_API_KEY')
  if (!apiKey) {
    return json(500, { error: 'Missing PADDLE_API_KEY' })
  }

  const paddle = new Paddle(apiKey, { environment: paddleEnvironment() })
  const supabase = adminClient()

  let transactions: Transaction[]
  let deferredRecent = 0
  try {
    const listed = await listRecentCompleted(paddle)
    transactions = listed.transactions
    deferredRecent = listed.deferredRecent
  } catch (err) {
    console.error('Paddle list transactions failed', err)
    return json(502, { error: 'Paddle API failed', detail: String(err) })
  }

  const fresh: Transaction[] = []
  if (transactions.length > 0) {
    const ids = transactions.map((t) => t.id)
    const { data: already, error } = await supabase
      .from('paddle_support_notifications')
      .select('paddle_transaction_id')
      .in('paddle_transaction_id', ids)
    if (error) {
      console.error('Failed to load notification state', error)
      return json(500, { error: 'Database error', detail: error.message })
    }
    const notified = new Set((already ?? []).map((r) => r.paddle_transaction_id as string))
    for (const tx of transactions) {
      if (!notified.has(tx.id)) fresh.push(tx)
    }
  }

  if (fresh.length === 0) {
    return json(200, { ok: true, newOrders: 0, emailed: false, deferredRecent })
  }

  const lines: string[] = []
  for (const tx of fresh) {
    const email = tx.customer?.email ?? (await customerEmail(paddle, tx.customerId))
    const priceId = tx.items?.[0]?.price?.id ?? null
    lines.push(
      [
        `Transaction: ${tx.id}`,
        `Status: ${tx.status}`,
        `Product: ${productLabel(priceId)}`,
        `Amount: ${formatAmount(tx)}`,
        `Customer: ${email ?? '(no email)'} (${tx.customerId ?? 'n/a'})`,
        `Created: ${tx.createdAt}`,
      ].join('\n'),
    )
  }

  const subject =
    fresh.length === 1
      ? `[MLightCAD] New Paddle order ${fresh[0].id}`
      : `[MLightCAD] ${fresh.length} new Paddle orders`

  const text = [
    `New completed Paddle order(s) needing attention (${fresh.length}):`,
    '',
    lines.join('\n\n---\n\n'),
    '',
    'Grant GitHub Packages access when you have the buyer’s GitHub username.',
  ].join('\n')

  const html = `<pre>${escapeHtml(text)}</pre>`

  const sent = await sendEmail({
    to: SUPPORT_EMAIL,
    subject,
    text,
    html,
  })

  if (sent.skipped) {
    return json(503, { error: 'RESEND_API_KEY unset; not marking notified', newOrders: fresh.length })
  }
  if (!sent.ok) {
    return json(502, { error: 'Resend failed', detail: sent.error, newOrders: fresh.length })
  }

  const recorded: string[] = []
  const recordFailed: string[] = []
  for (const tx of fresh) {
    try {
      await recordSupportNotified(supabase, tx.id, 'cron', sent.id)
      recorded.push(tx.id)
    } catch (err) {
      console.error('Failed to record support notification', tx.id, err)
      recordFailed.push(tx.id)
    }
  }

  if (recordFailed.length > 0) {
    return json(500, {
      error: 'Email sent but some notifications were not recorded',
      newOrders: fresh.length,
      emailed: true,
      transactionIds: recorded,
      recordFailed,
      resendId: sent.id,
    })
  }

  return json(200, {
    ok: true,
    newOrders: fresh.length,
    emailed: true,
    deferredRecent,
    transactionIds: recorded,
    resendId: sent.id,
  })
})
