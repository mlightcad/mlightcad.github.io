/** SHA-256 hex digest of a UTF-8 string. */
export async function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

/** URL-safe random token with a stable prefix (e.g. `mls_…` for portal sessions). */
export function randomToken(prefix: string, bytes = 32): string {
  const buf = new Uint8Array(bytes)
  crypto.getRandomValues(buf)
  const body = btoa(String.fromCharCode(...buf))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
  return `${prefix}${body}`
}

/** Normalize PEM stored in secrets (`\n` escapes → real newlines). */
export function normalizePem(raw: string): string {
  return raw.replace(/\\n/g, '\n').trim()
}
