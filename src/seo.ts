import { LOCALE_META, LOCALES, type Locale } from './i18n'

export const SITE_URL = 'https://mlightcad.com'
export const SITE_NAME = 'MLightCAD'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og.png`

function upsertMeta(attr: 'name' | 'property', key: string, content: string): void {
  const selector = `meta[${attr}="${key}"]`
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function clearAlternateLocales(): void {
  document.head
    .querySelectorAll('meta[property="og:locale:alternate"]')
    .forEach((el) => el.remove())
}

export interface PageMetaOptions {
  title: string
  description: string
  locale: Locale
  path: string
  keywords?: string
  image?: string
  type?: 'website' | 'product'
}

/** Sync document title, language, and social meta tags for the active locale. */
export function applyPageMeta(options: PageMetaOptions): void {
  const {
    title,
    description,
    locale,
    path,
    keywords,
    image = DEFAULT_OG_IMAGE,
    type = 'website',
  } = options

  const url = new URL(path, SITE_URL).toString()
  const ogLocale = LOCALE_META[locale].ogLocale

  document.title = title
  document.documentElement.lang = LOCALE_META[locale].htmlLang

  upsertMeta('name', 'description', description)
  if (keywords) upsertMeta('name', 'keywords', keywords)
  upsertMeta('name', 'author', SITE_NAME)
  upsertMeta('name', 'robots', 'index, follow, max-image-preview:large')
  upsertMeta('name', 'theme-color', '#0B0F14')

  upsertLink('canonical', url)

  upsertMeta('property', 'og:type', type)
  upsertMeta('property', 'og:site_name', SITE_NAME)
  upsertMeta('property', 'og:title', title)
  upsertMeta('property', 'og:description', description)
  upsertMeta('property', 'og:url', url)
  upsertMeta('property', 'og:image', image)
  upsertMeta('property', 'og:image:alt', title)
  upsertMeta('property', 'og:locale', ogLocale)

  clearAlternateLocales()
  for (const alt of LOCALES) {
    if (alt === locale) continue
    const el = document.createElement('meta')
    el.setAttribute('property', 'og:locale:alternate')
    el.setAttribute('content', LOCALE_META[alt].ogLocale)
    document.head.appendChild(el)
  }

  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', title)
  upsertMeta('name', 'twitter:description', description)
  upsertMeta('name', 'twitter:image', image)
  upsertMeta('name', 'twitter:image:alt', title)
}
