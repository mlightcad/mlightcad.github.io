import type { Locale } from './types'

/** Base URL for the published CAD Viewer VitePress docs. */
export const CAD_VIEWER_DOCS_BASE = 'https://mlightcad.com/cad-viewer/docs'

/**
 * Locale roots published under `/cad-viewer/docs/{locale}/`.
 * English is the default root (no locale segment). Site locales without a
 * docs root fall back to English.
 */
const CAD_VIEWER_DOCS_LOCALES: ReadonlySet<string> = new Set([
  'zh',
  'ja',
  'ko',
  'cs',
  'ar',
  'tr',
])

/**
 * Build a locale-aware CAD Viewer docs URL.
 *
 * @param path - Path under the docs root, e.g. `development` or `''` for the guide home.
 * @param locale - Active marketing-site locale.
 * @returns Absolute docs URL for that locale (English when unsupported).
 */
export function cadViewerDocsUrl(path: string, locale: Locale): string {
  const clean = path.replace(/^\/+|\/+$/g, '')
  const localePrefix = CAD_VIEWER_DOCS_LOCALES.has(locale) ? `${locale}/` : ''
  const suffix = clean ? `${clean}/` : ''
  return `${CAD_VIEWER_DOCS_BASE}/${localePrefix}${suffix}`
}
