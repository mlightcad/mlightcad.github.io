const DEFAULT_ORIGINS = [
  'https://mlightcad.com',
  'https://www.mlightcad.com',
  'https://mlightcad.github.io',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
]

/** Allowed browser origins for portal CORS (comma-separated env overrides defaults). */
function allowedOrigins(): string[] {
  const raw = Deno.env.get('CORS_ALLOWED_ORIGINS')
  if (!raw) return DEFAULT_ORIGINS
  return raw.split(',').map((s) => s.trim()).filter(Boolean)
}

/** Build CORS headers for a request Origin. */
export function corsHeaders(req: Request): HeadersInit {
  const origin = req.headers.get('Origin')
  const allowed = allowedOrigins()
  const matched = origin && allowed.includes(origin) ? origin : allowed[0]
  return {
    'Access-Control-Allow-Origin': matched,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Vary': 'Origin',
  }
}

/** Handle CORS preflight. */
export function handleOptions(req: Request): Response {
  return new Response(null, { status: 204, headers: corsHeaders(req) })
}

/** Attach CORS headers to a response. */
export function withCors(req: Request, res: Response): Response {
  const headers = new Headers(res.headers)
  for (const [k, v] of Object.entries(corsHeaders(req))) {
    headers.set(k, v)
  }
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers })
}
