import './styles/fonts.css'
import './styles/tokens.css'
import './styles/chrome.css'

import { t } from './i18n'
import { mountShell } from './shell'
import { applyCommonI18n, locale, setupLocaleToggle, setupNav } from './shared'

/** Apply nav/footer copy for the active locale, without touching the host page. */
function applyChromeI18n(): void {
  const dict = t(locale)
  document.querySelectorAll<HTMLElement>('.nav, .footer').forEach((root) => {
    applyCommonI18n(dict, root)
  })
}

/** Match marketing pages: denser bar after a short scroll. */
function setupNavScroll(): void {
  const nav = document.querySelector<HTMLElement>('.nav')
  if (!nav) return
  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 12)
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
}

/**
 * Inject shared header/footer into `[data-site-nav]` / `[data-site-footer]`.
 * Used by satellite apps (e.g. OneDrive viewer) that must not copy site markup.
 */
export function mountSiteChrome(): void {
  // `legal` skips current-page highlighting so a satellite URL does not mark a product link.
  mountShell('legal')
  document.querySelectorAll<HTMLElement>('.nav, .footer').forEach((el) => {
    el.classList.add('is-embedded')
  })
  applyChromeI18n()
  const nav = document.querySelector<HTMLElement>('.nav')
  setupLocaleToggle(() => applyChromeI18n(), nav ?? document)
  setupNav(nav ?? document)
  setupNavScroll()
}

mountSiteChrome()
