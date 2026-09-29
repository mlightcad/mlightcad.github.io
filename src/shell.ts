import cadDiffViewerNavHtml from './partials/cad-diff-viewer-nav.html?raw'
import footerHtml from './partials/footer.html?raw'
import homeNavHtml from './partials/home-nav.html?raw'
import parserNavHtml from './partials/parser-nav.html?raw'
import { markActiveNav } from './shared'

/** Marketing-site page that owns the shared header/footer shell. */
export type SitePage =
  | 'home'
  | 'iframe-plugin'
  | 'cad-diff-viewer'
  | 'legal'
  | 'tutorial'
  | 'portal'
  | 'dwg-engine'
  | 'commercial'
  | 'cad-sdk'
  | 'use-cases'
  | 'benchmarks'

/**
 * Replace a placeholder node with the given HTML fragment.
 *
 * @param selector - CSS selector for the placeholder element.
 * @param html - Markup that becomes the placeholder's `outerHTML`.
 */
function replacePlaceholder(selector: string, html: string): void {
  const host = document.querySelector(selector)
  if (!host) return
  host.outerHTML = html.trim()
}

/**
 * Header markup for a given page.
 *
 * Homepage, tutorials, and marketing pages share the main nav.
 * CAD Diff Viewer keeps a product-specific Live Demo destination.
 * Legal / license portal reuse the denser product nav chrome.
 *
 * @param page - Site page currently being mounted.
 */
function navHtmlFor(page: SitePage): string {
  if (page === 'cad-diff-viewer') return cadDiffViewerNavHtml
  if (page === 'legal' || page === 'portal') return parserNavHtml
  return homeNavHtml
}

/** Inject shared footer and mark active nav. */
export function mountShell(page: SitePage): void {
  replacePlaceholder('[data-site-nav]', navHtmlFor(page))
  replacePlaceholder('[data-site-footer]', footerHtml)
  if (page !== 'legal' && page !== 'portal') {
    markActiveNav(page)
  }
}
