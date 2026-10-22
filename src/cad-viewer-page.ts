import './styles/main.css'
import { scrambleText, setupPageFX } from './fx'
import { t } from './i18n'
import { applyPageMeta } from './seo'
import { mountShell } from './shell'
import {
  applyCommonI18n,
  getByPath,
  locale,
  observeReveals,
  setupLocaleToggle,
  setupNav,
  setupWebGL,
} from './shared'
import {
  refreshDrawingGalleryI18n,
  setupDrawingGallery,
} from './drawing-gallery'
import { refreshTryDrawingI18n, setupTryDrawing } from './try-drawing'

/** Apply CAD Viewer page copy, feature/plugin lists, and try-drawing i18n. */
function applyI18n(): void {
  const dict = t(locale)
  applyPageMeta({
    title: `${dict.flagship.title} — MLightCAD`,
    description: dict.flagship.lead,
    keywords: dict.meta.keywords,
    locale,
    path: '/cad-viewer.html',
  })

  applyCommonI18n(dict)

  document.querySelectorAll<HTMLElement>('[data-i18n-html]').forEach((el) => {
    const key = el.dataset.i18nHtml
    if (!key) return
    const value = getByPath(dict, key)
    if (typeof value === 'string') el.innerHTML = value
  })

  document.querySelectorAll<HTMLElement>('[data-i18n-highlights]').forEach((list) => {
    const items = dict.flagship.highlights
    list.innerHTML = items
      .map((item) => `<li><span class="firsts__mark">01</span><span>${item}</span></li>`)
      .join('')
    list.querySelectorAll('li').forEach((li, i) => {
      const mark = li.querySelector('.firsts__mark')
      if (mark) mark.textContent = String(i + 1).padStart(2, '0')
    })
  })

  const featuresRoot = document.querySelector('[data-i18n-features]')
  if (featuresRoot) {
    featuresRoot.innerHTML = dict.features.items
      .map((item, index) => {
        const reverse = index % 2 === 1 ? ' feature--reverse' : ''
        const actions =
          item.actions
            ?.map((action) => {
              const variant = action.variant === 'ghost' ? 'btn--ghost' : 'btn--primary btn--glow'
              const download = action.download ? ` download="${action.download}"` : ''
              const isExternal = /^https?:\/\//i.test(action.href)
              const target = action.download || !isExternal ? '' : ' target="_blank" rel="noopener"'
              return `<a class="btn ${variant}" href="${action.href}"${target}${download}>${action.label}</a>`
            })
            .join('') ?? ''
        const actionsBlock = actions ? `<div class="feature__actions">${actions}</div>` : ''
        return `
          <article class="feature reveal${reverse}" id="feature-${item.id}">
            <figure class="feature__visual">
              <img src="${item.image}" alt="${item.imageAlt}" width="640" height="400" loading="lazy" />
            </figure>
            <div class="feature__copy">
              <p class="feature__index">${String(index + 1).padStart(2, '0')}</p>
              <h3>${item.title}</h3>
              <p>${item.body}</p>
              ${actionsBlock}
            </div>
          </article>
        `
      })
      .join('')
  }

  const plugins = document.querySelector('[data-i18n-plugins]')
  if (plugins) {
    plugins.innerHTML = dict.plugins.items
      .map((p) => `<li><strong>${p.name}</strong><span>${p.role}</span></li>`)
      .join('')
  }

  refreshTryDrawingI18n()
  refreshDrawingGalleryI18n()
  const scrambleEl = document.querySelector<HTMLElement>('[data-scramble]')
  window.setTimeout(() => scrambleText(scrambleEl, dict.flagship.eyebrow), 450)
  observeReveals()
  scrollToHash()
}

/** Feature blocks are injected after load; restore deep links like #feature-privacy. */
function scrollToHash(): void {
  const id = decodeURIComponent(location.hash.replace(/^#/, ''))
  if (!id) return
  const target = document.getElementById(id)
  if (!target) return
  requestAnimationFrame(() => {
    target.scrollIntoView()
  })
}

mountShell('cad-viewer')
applyI18n()
setupLocaleToggle(() => applyI18n())
setupNav()
setupTryDrawing()
setupDrawingGallery()
setupPageFX({ boot: false })
void setupWebGL()