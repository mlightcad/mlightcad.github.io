import type { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1'
import { sendEmail } from './resend.ts'

export const SUPPORT_EMAIL = Deno.env.get('SUPPORT_NOTIFY_EMAIL') ?? 'support@mlightcad.com'

export type SupportNotifySource = 'webhook' | 'cron' | 'manual'

/** Whether support was already emailed successfully for this Paddle transaction. */
export async function isSupportNotified(
  supabase: SupabaseClient,
  paddleTransactionId: string,
): Promise<boolean> {
  const { data, error } = await supabase
    .from('paddle_support_notifications')
    .select('paddle_transaction_id')
    .eq('paddle_transaction_id', paddleTransactionId)
    .maybeSingle()
  if (error) throw error
  return Boolean(data)
}

/**
 * Record a successful support notification (idempotent).
 * Only call after Resend accepted the email (not skipped).
 */
export async function recordSupportNotified(
  supabase: SupabaseClient,
  paddleTransactionId: string,
  source: SupportNotifySource,
  resendId?: string,
): Promise<void> {
  const { error } = await supabase.from('paddle_support_notifications').upsert(
    {
      paddle_transaction_id: paddleTransactionId,
      emailed_at: new Date().toISOString(),
      resend_id: resendId ?? null,
      source,
    },
    { onConflict: 'paddle_transaction_id' },
  )
  if (error) throw error
}

/**
 * Email support and, on real delivery success, mark the transaction notified.
 * Returns false when skipped (no API key) or Resend failed — cron can retry.
 */
export async function notifySupportOnce(opts: {
  supabase: SupabaseClient
  paddleTransactionId: string
  source: SupportNotifySource
  subject: string
  text: string
  html?: string
}): Promise<{ sent: boolean; skipped?: boolean; error?: string }> {
  const already = await isSupportNotified(opts.supabase, opts.paddleTransactionId)
  if (already) {
    return { sent: false, skipped: true }
  }

  console.log(`[support-notify] ${SUPPORT_EMAIL}: ${opts.subject}`)
  const result = await sendEmail({
    to: SUPPORT_EMAIL,
    subject: opts.subject,
    text: opts.text,
    html: opts.html ?? `<pre>${escapeHtml(opts.text)}</pre>`,
  })

  if (result.skipped) {
    return { sent: false, skipped: true, error: 'RESEND_API_KEY unset' }
  }
  if (!result.ok) {
    return { sent: false, error: result.error }
  }

  await recordSupportNotified(opts.supabase, opts.paddleTransactionId, opts.source, result.id)
  return { sent: true }
}

function escapeHtml(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}
