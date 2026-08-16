import footerHtml from './partials/footer.html?raw'
import { markActiveNav } from './shared'

/** Marketing-site page that owns the shared header/footer shell. */
export type SitePage = 'home' | 'parser' | 'iframe-plugin'

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

/** Inject shared footer and mark active nav. */
export function mountShell(page: SitePage): void {
  replacePlaceholder('[data-site-footer]', footerHtml)
  markActiveNav(page)
}
