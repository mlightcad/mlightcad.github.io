import footerHtml from './partials/footer.html?raw'
import { markActiveNav } from './shared'

export type SitePage = 'home' | 'parser' | 'iframe-plugin'

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
