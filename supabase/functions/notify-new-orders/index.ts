/**
 * Daily cron: list completed Paddle transactions, email support for any not yet
 * notified. Successful sends are recorded in paddle_support_notifications so
 * they are never emailed again.
 *
 * Secrets: PADDLE_API_KEY, PADDLE_ENV, RESEND_*, SUPPORT_NOTIFY_EMAIL, CRON_SECRET
 *
 * Deploy:
 *   supabase functions deploy notify-new-orders
 *
 * Invoke (manual):
 *   curl -X POST "$SUPABASE_URL/functions/v1/notify-new-orders" \
 *     -H "Authorization: Bearer $CRON_SECRET"
 */

import { Environment, Paddle, type Transaction } from 'npm:@paddle/paddle-node-sdk@3.10.0'
import { adminClient, json } from '../_shared/admin.ts'
import {
  SUPPORT_EMAIL,
  recordSupportNotified,
} from '../_shared/support-notify.ts'
import { sendEmail } from '../_shared/resend.ts'

/** Look back far enough to cover missed cron days; already-notified rows are skipped. */
const LOOKBACK_DAYS = 14

const PRICE_PERPETUAL = Deno.env.get('PADDLE_PRICE_PERPETUAL') ?? ''
const PRICE_ANNUAL = Deno.env.get('PADDLE_PRICE_ANNUAL') ?? ''

function paddleEnvironment(): Environment {
  return Deno.env.get('PADDLE_ENV') === 'production' ? Environment.production : Environment.sandbox
}

function authorized(req: Request): boolean {
  const secret = Deno.env.get('CRON_SECRET')
  if (!secret) {
    console.error('CRON_SECRET is not set')
    return false
  }
  const header = req.headers.get('Authorization') ?? ''
  const match = /^Bearer\s+(.+)$/i.exec(header)
  return Boolean(match && match[1] === secret)
}

function productLabel(priceId: string | null | undefined): string {
  if (!priceId) return 'unknown'
  if (PRICE_PERPETUAL && priceId === PRICE_PERPETUAL) return 'perpetual'
  if (PRICE_ANNUAL && priceId === PRICE_ANNUAL) return 'annual'
  return priceId
}

function formatAmount(tx: Transaction): string {
  const total = tx.details?.totals?.total
  const currency = tx.currencyCode ?? ''
  if (!total) return '(amount n/a)'
  return `${total} ${currency}`.trim()
}

async function listRecentCompleted(paddle: Paddle): Promise<Transaction[]> {
  const sinceMs = Date.now() - LOOKBACK_DAYS * 24 * 60 * 60 * 1000
  const collection = paddle.transactions.list({
    status: ['completed'],
  })

  const out: Transaction[] = []
  for await (const tx of collection) {
    const created = Date.parse(tx.createdAt)
    if (!Number.isNaN(created) && created < sinceMs) {
      // API returns newest-first by default (id[DESC]); older than lookback → stop.
      break
    }
    out.push(tx)
  }
  return out
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
  try {
    transactions = await listRecentCompleted(paddle)
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
    return json(200, { ok: true, newOrders: 0, emailed: false })
  }

  const lines: string[] = []
  for (const tx of fresh) {
    const email = await customerEmail(paddle, tx.customerId)
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

  const html = `<p>New completed Paddle order(s) needing attention (${fresh.length}):</p>
<pre>${text.replaceAll('&', '&amp;').replaceAll('<', '&lt;')}</pre>
<p>Grant GitHub Packages access when you have the buyer’s GitHub username.</p>`

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

  for (const tx of fresh) {
    await recordSupportNotified(supabase, tx.id, 'cron', sent.id)
  }

  return json(200, {
    ok: true,
    newOrders: fresh.length,
    emailed: true,
    transactionIds: fresh.map((t) => t.id),
    resendId: sent.id,
  })
})
