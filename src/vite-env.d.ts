/// <reference types="vite/client" />

/** Build-time environment variables exposed by Vite. */
interface ImportMetaEnv {
  /** Supabase project URL for the trial-license form. */
  readonly VITE_SUPABASE_URL?: string
  /** Supabase anonymous key for the trial-license form. */
  readonly VITE_SUPABASE_ANON_KEY?: string
  /** Optional license key for the private RealDWG-Web converter. */
  readonly VITE_DWG_LICENSE_KEY?: string
}

/** Vite `import.meta` surface used by this site. */
interface ImportMeta {
  /** Typed environment bag. */
  readonly env: ImportMetaEnv
}
