import './styles/main.css'
import { scrambleMeta, setupPageFX } from './fx'
import { t } from './i18n'
import { applyPageMeta } from './seo'
import { mountShell } from './shell'
import {
  applyCommonI18n,
  locale,
  observeReveals,
  setupLocaleToggle,
  setupNav,
  setupWebGL,
} from './shared'
import { refreshTryDrawingI18n, setupTryDrawing } from './try-drawing'

function applyI18n(): void {
  const dict = t(locale)
  applyPageMeta({
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    locale,
    path: '/',
  })

  applyCommonI18n(dict)

  document.querySelectorAll<HTMLElement>('[data-i18n-firsts]').forEach((list) => {
    const scope = list.dataset.i18nFirsts
    const items = scope === 'flagship' ? dict.flagship.firsts : dict.hero.firsts
    list.innerHTML = items.map((item) => `<li><span class="firsts__mark">01</span><span>${item}</span></li>`).join('')
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
              const target = action.download ? '' : ' target="_blank" rel="noopener"'
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

  const resources = document.querySelector('[data-i18n-resources]')
  if (resources) {
    resources.innerHTML = dict.resources.links
      .map(
        (link) =>
          `<a href="${link.href}" target="_blank" rel="noopener"><strong>${link.name}</strong><span>${link.desc}</span></a>`,
      )
      .join('')
  }

  const brandEl = document.querySelector<HTMLElement>('[data-i18n="hero.brand"]')
  if (brandEl) brandEl.innerHTML = 'MLight<em>CAD</em>'

  refreshTryDrawingI18n()
  window.setTimeout(() => scrambleMeta(dict.hero.meta), 450)
  observeReveals()
}

mountShell('home')
applyI18n()
setupLocaleToggle(() => applyI18n())
setupNav()
setupTryDrawing()
setupPageFX({ boot: true })
void setupWebGL()
