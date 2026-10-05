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

function normalizePath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, '')
  return trimmed === '' ? '/' : trimmed
}

/** Highlight the dropdown link whose path matches this satellite URL. */
function markSatelliteNav(): void {
  const path = normalizePath(window.location.pathname)
  document.querySelectorAll<HTMLAnchorElement>('.nav__menu a').forEach((a) => {
    const href = a.getAttribute('href') ?? ''
    let hrefPath = href
    try {
      hrefPath = new URL(href, window.location.origin).pathname
    } catch {
      /* keep the raw href if it is not a valid URL */
    }
    const normalizedHref = normalizePath(hrefPath)
    const current =
      normalizedHref !== '/' &&
      (path === normalizedHref || path.startsWith(`${normalizedHref}/`))
    a.classList.toggle('is-current', current)
    if (current) a.setAttribute('aria-current', 'page')
    else a.removeAttribute('aria-current')
  })
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
  markSatelliteNav()
  const nav = document.querySelector<HTMLElement>('.nav')
  setupLocaleToggle((next) => {
    applyChromeI18n()
    markSatelliteNav()
    window.dispatchEvent(new CustomEvent('mlightcad:localechange', { detail: { locale: next } }))
  }, nav ?? document)
  setupNav(nav ?? document)
  setupNavScroll()
}

mountSiteChrome()
