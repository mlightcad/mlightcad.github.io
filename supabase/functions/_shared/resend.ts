/** Send an email via Resend. No-ops (logs) when `RESEND_API_KEY` is unset. */
export async function sendEmail(opts: {
  to: string
  subject: string
  html: string
  text: string
}): Promise<{ ok: boolean; id?: string; skipped?: boolean; error?: string }> {
  const apiKey = Deno.env.get('RESEND_API_KEY')
  const from = Deno.env.get('RESEND_FROM_EMAIL') ?? 'MLightCAD Licenses <licenses@mlightcad.com>'
  if (!apiKey) {
    console.warn('[resend] RESEND_API_KEY unset; skipping email to', opts.to)
    console.log('[resend] subject:', opts.subject)
    console.log('[resend] text:\n', opts.text)
    return { ok: true, skipped: true }
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [opts.to],
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    console.error('[resend] failed', res.status, body)
    return { ok: false, error: body }
  }

  const data = (await res.json()) as { id?: string }
  return { ok: true, id: data.id }
}
