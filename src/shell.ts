import cadDiffViewerNavHtml from './partials/cad-diff-viewer-nav.html?raw'
import footerHtml from './partials/footer.html?raw'
import homeNavHtml from './partials/home-nav.html?raw'
import parserNavHtml from './partials/parser-nav.html?raw'
import { markActiveNav } from './shared'

/** Marketing-site page that owns the shared header/footer shell. */
export type SitePage = 'home' | 'parser' | 'iframe-plugin' | 'cad-diff-viewer' | 'legal' | 'tutorial'

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
 * Homepage and tutorials share the main nav. CAD Diff Viewer and the parser
 * keep product-specific Docs / GitHub / Live Demo destinations. iframe-plugin
 * inlines its header; other pages inject a partial here.
 *
 * @param page - Site page currently being mounted.
 */
function navHtmlFor(page: SitePage): string {
  if (page === 'home' || page === 'tutorial') return homeNavHtml
  if (page === 'cad-diff-viewer') return cadDiffViewerNavHtml
  return parserNavHtml
}

/** Inject shared footer and mark active nav. */
export function mountShell(page: SitePage): void {
  replacePlaceholder('[data-site-nav]', navHtmlFor(page))
  replacePlaceholder('[data-site-footer]', footerHtml)
  markActiveNav(page === 'legal' ? 'parser' : page)
}
