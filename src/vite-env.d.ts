/// <reference types="vite/client" />

/** Build-time environment variables exposed by Vite. */
interface ImportMetaEnv {
  /** Optional license key for the private RealDWG-Web converter. */
  readonly VITE_DWG_LICENSE_KEY?: string
  /** Paddle.js environment: `sandbox` (default) or `production`. */
  readonly VITE_PADDLE_ENV?: 'sandbox' | 'production'
  /** Paddle client-side token (safe to expose in the browser). */
  readonly VITE_PADDLE_CLIENT_TOKEN?: string
  /** Paddle price id for the perpetual license. */
  readonly VITE_PADDLE_PRICE_PERPETUAL?: string
  /** Paddle price id for annual updates. */
  readonly VITE_PADDLE_PRICE_ANNUAL?: string
  /** Optional Supabase project URL (future customer portal). */
  readonly VITE_SUPABASE_URL?: string
  /** Optional Supabase publishable key (`sb_publishable_…`). */
  readonly VITE_SUPABASE_PUBLISHABLE_KEY?: string
}

/** Vite `import.meta` surface used by this site. */
interface ImportMeta {
  /** Typed environment bag. */
  readonly env: ImportMetaEnv
}
