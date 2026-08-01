import headerHtml from './partials/header.html?raw'
import footerHtml from './partials/footer.html?raw'
import { markActiveNav } from './shared'

export type SitePage = 'home' | 'parser'

function replacePlaceholder(selector: string, html: string): void {
  const host = document.querySelector(selector)
  if (!host) return
  host.outerHTML = html.trim()
}

/** Inject shared header/footer into page placeholders. */
export function mountShell(page: SitePage): void {
  replacePlaceholder('[data-site-header]', headerHtml)
  replacePlaceholder('[data-site-footer]', footerHtml)
  markActiveNav(page)
}
