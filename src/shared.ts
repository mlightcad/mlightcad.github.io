import { detectLocale, isLocale, LOCALE_META, setLocale, t, type Locale } from './i18n'

export let locale: Locale = detectLocale()
setLocale(locale)

export function getByPath(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, obj)
}

let revealObserver: IntersectionObserver | null = null

export function observeReveals(root: ParentNode = document): void {
  const nodes = root.querySelectorAll('.reveal:not(.is-in)')
  if (!('IntersectionObserver' in window)) {
    nodes.forEach((n) => n.classList.add('is-in'))
    return
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            revealObserver?.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
  }
  nodes.forEach((n) => revealObserver?.observe(n))
}

function syncLangSwitcher(dict: ReturnType<typeof t>): void {
  const meta = LOCALE_META[locale]
  document.querySelectorAll<HTMLElement>('[data-lang-current]').forEach((el) => {
    el.textContent = meta.nativeLabel
  })
  document.querySelectorAll<HTMLButtonElement>('[data-lang-toggle]').forEach((btn) => {
    btn.setAttribute('aria-label', dict.nav.language)
  })
  document.querySelectorAll<HTMLButtonElement>('[data-locale]').forEach((btn) => {
    const selected = btn.dataset.locale === locale
    btn.setAttribute('aria-selected', String(selected))
    btn.classList.toggle('is-active', selected)
  })
}

export function applyCommonI18n(dict: ReturnType<typeof t>): void {
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n
    if (!key) return
    const value = getByPath(dict, key)
    if (typeof value === 'string') el.textContent = value
  })

  document.querySelectorAll<HTMLAnchorElement>('[data-i18n-href]').forEach((el) => {
    const key = el.dataset.i18nHref
    if (!key) return
    const value = getByPath(dict, key)
    if (typeof value === 'string') el.href = value
  })

  document.querySelectorAll<HTMLImageElement>('[data-i18n-alt]').forEach((img) => {
    const key = img.dataset.i18nAlt
    if (!key) return
    const value = getByPath(dict, key)
    if (typeof value === 'string') img.alt = value
  })

  document.querySelectorAll<HTMLElement>('[data-i18n-aria]').forEach((el) => {
    const key = el.dataset.i18nAria
    if (!key) return
    const value = getByPath(dict, key)
    if (typeof value === 'string') el.setAttribute('aria-label', value)
  })

  syncLangSwitcher(dict)
}

export function setupLocaleToggle(onChange: (next: Locale) => void): void {
  document.querySelectorAll<HTMLButtonElement>('[data-locale]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      const next = btn.dataset.locale
      if (!isLocale(next) || next === locale) {
        closeDropdowns()
        return
      }
      locale = next
      setLocale(locale)
      closeDropdowns()
      onChange(next)
    })
  })
}

function closeDropdowns(): void {
  document.querySelectorAll<HTMLElement>('[data-dropdown]').forEach((dd) => {
    dd.classList.remove('is-open')
    const btn = dd.querySelector<HTMLButtonElement>('[data-drop-toggle]')
    if (btn) btn.setAttribute('aria-expanded', 'false')
  })
}

export function setupNav(): void {
  const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]')
  const links = document.querySelector<HTMLElement>('[data-nav-links]')

  document.querySelectorAll<HTMLElement>('[data-dropdown]').forEach((dd) => {
    const btn = dd.querySelector<HTMLButtonElement>('[data-drop-toggle]')
    if (!btn) return
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      const open = !dd.classList.contains('is-open')
      closeDropdowns()
      dd.classList.toggle('is-open', open)
      btn.setAttribute('aria-expanded', String(open))
    })
  })

  document.addEventListener('click', () => closeDropdowns())

  if (!toggle || !links) return

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('is-open')
    toggle.setAttribute('aria-expanded', String(open))
    if (!open) closeDropdowns()
  })

  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      links.classList.remove('is-open')
      toggle.setAttribute('aria-expanded', 'false')
      closeDropdowns()
    })
  })
}

type BlueprintSceneHandle = import('./webgl/blueprintScene').BlueprintSceneHandle

let backgroundScene: BlueprintSceneHandle | null = null

/** Pause/resume the homepage background WebGL loop (e.g. while CAD viewer is fullscreen). */
export function setBackgroundWebGLPaused(paused: boolean): void {
  backgroundScene?.setPaused(paused)
}

export async function setupWebGL(): Promise<void> {
  const canvas = document.querySelector<HTMLCanvasElement>('#bg-canvas')
  if (!canvas) return
  try {
    const { createBlueprintScene } = await import('./webgl/blueprintScene')
    const handle = createBlueprintScene(canvas)
    backgroundScene = handle
    if (import.meta.hot) {
      import.meta.hot.dispose(() => {
        if (backgroundScene === handle) backgroundScene = null
        handle.destroy()
      })
    }
  } catch (err) {
    console.warn('WebGL background unavailable', err)
    canvas.remove()
  }
}

export function markActiveNav(page: 'home' | 'parser'): void {
  document.querySelectorAll<HTMLAnchorElement>('.nav__menu a').forEach((a) => {
    const isParser = a.getAttribute('href')?.includes('dwg-parser')
    const current =
      page === 'parser'
        ? !!isParser
        : !isParser && !!a.getAttribute('href')?.includes('product')
    a.classList.toggle('is-current', current)
    if (current) a.setAttribute('aria-current', 'page')
    else a.removeAttribute('aria-current')
  })
}
