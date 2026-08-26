import './styles/main.css'
import { scrambleText, setupPageFX } from './fx'
import { t } from './i18n'
import { TUTORIAL_CHANNEL_HREF, TUTORIAL_VIDEOS, type TutorialVideoKey } from './i18n/tutorial'
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

const YT_THUMB = (id: string, kind: 'maxresdefault' | 'hqdefault') =>
  `https://i.ytimg.com/vi/${id}/${kind}.jpg`

const YT_WATCH = (id: string) => `https://www.youtube.com/watch?v=${id}`

const YT_EMBED = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`

/**
 * Escape text for safe interpolation into HTML.
 *
 * @param value - Untrusted or localized string.
 */
function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

/**
 * Build one click-to-play video card.
 *
 * @param youtubeId - YouTube video id.
 * @param key - Copy key for this film.
 * @param title - Localized title.
 * @param body - Localized summary.
 * @param playLabel - Localized play control label.
 * @param openLabel - Localized "Watch on YouTube" label.
 */
function videoCardHtml(
  youtubeId: string,
  key: TutorialVideoKey,
  title: string,
  body: string,
  playLabel: string,
  openLabel: string,
): string {
  const safeTitle = escapeHtml(title)
  const safeBody = escapeHtml(body)
  const playAria = escapeHtml(`${playLabel}: ${title}`)
  return [
    `<article class="tutorial-video reveal" data-video-id="${youtubeId}" data-video-key="${key}">`,
    '  <figure class="tutorial-video__frame viewport-chrome">',
    '    <div class="viewport-chrome__bar">',
    '      <span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>',
    `      <em>${safeTitle}</em>`,
    '    </div>',
    '    <div class="viewport-chrome__stage tutorial-video__stage">',
    `      <button type="button" class="tutorial-video__poster" data-play-video aria-label="${playAria}">`,
    `        <img src="${YT_THUMB(youtubeId, 'maxresdefault')}" alt="" width="1280" height="720" loading="lazy" data-yt-thumb="${youtubeId}" />`,
    '        <span class="tutorial-video__play" aria-hidden="true"></span>',
    '      </button>',
    '    </div>',
    '  </figure>',
    '  <div class="tutorial-video__copy">',
    `    <h2>${safeTitle}</h2>`,
    `    <p>${safeBody}</p>`,
    `    <a class="tutorial-video__yt" href="${YT_WATCH(youtubeId)}" target="_blank" rel="noopener">${escapeHtml(openLabel)}</a>`,
    '  </div>',
    '</article>',
  ].join('\n')
}

/** Swap a failed maxres thumbnail for the always-available hqdefault still. */
function bindThumbFallbacks(root: ParentNode): void {
  root.querySelectorAll<HTMLImageElement>('[data-yt-thumb]').forEach((img) => {
    img.addEventListener('error', () => {
      const id = img.dataset.ytThumb
      if (!id) return
      img.dataset.ytThumb = ''
      img.src = YT_THUMB(id, 'hqdefault')
    })
  })
}

/** Replace a poster with a privacy-enhanced YouTube iframe on first play. */
function bindPlayButtons(root: ParentNode): void {
  root.querySelectorAll<HTMLButtonElement>('[data-play-video]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest<HTMLElement>('[data-video-id]')
      const stage = card?.querySelector<HTMLElement>('.tutorial-video__stage')
      const id = card?.dataset.videoId
      if (!card || !stage || !id) return

      const title = card.querySelector('h2')?.textContent ?? 'YouTube'
      const iframe = document.createElement('iframe')
      iframe.src = YT_EMBED(id)
      iframe.title = title
      iframe.allow =
        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      iframe.allowFullscreen = true
      iframe.referrerPolicy = 'strict-origin-when-cross-origin'
      stage.replaceChildren(iframe)
      card.classList.add('is-playing')
    })
  })
}

/** Whether the painted catalog matches {@link TUTORIAL_VIDEOS} and can be updated in place. */
function catalogNeedsRebuild(root: Element): boolean {
  const cards = [...root.querySelectorAll<HTMLElement>('[data-video-key]')]
  if (cards.length !== TUTORIAL_VIDEOS.length) return true
  return TUTORIAL_VIDEOS.some((video, index) => cards[index]?.dataset.videoKey !== video.key)
}

/**
 * Update titles and links on an existing card without touching the player.
 *
 * @param card - Catalog card already in the DOM.
 * @param title - Localized title.
 * @param body - Localized summary.
 * @param playLabel - Localized play control label.
 * @param openLabel - Localized "Watch on YouTube" label.
 */
function syncCardCopy(
  card: HTMLElement,
  title: string,
  body: string,
  playLabel: string,
  openLabel: string,
): void {
  const chromeTitle = card.querySelector('.viewport-chrome__bar em')
  if (chromeTitle) chromeTitle.textContent = title
  const heading = card.querySelector('h2')
  if (heading) heading.textContent = title
  const para = card.querySelector('.tutorial-video__copy p')
  if (para) para.textContent = body
  const yt = card.querySelector('.tutorial-video__yt')
  if (yt) yt.textContent = openLabel
  const playBtn = card.querySelector('[data-play-video]')
  if (playBtn) playBtn.setAttribute('aria-label', `${playLabel}: ${title}`)
  const iframe = card.querySelector('iframe')
  if (iframe) iframe.title = title
}

/** Paint the video catalog from the active locale dictionary. */
function renderCatalog(): void {
  const root = document.querySelector('[data-tutorial-grid]')
  if (!root) return
  const copy = t(locale).tutorial

  if (!catalogNeedsRebuild(root)) {
    root.querySelectorAll<HTMLElement>('[data-video-key]').forEach((card) => {
      const key = card.dataset.videoKey as TutorialVideoKey | undefined
      if (!key || !(key in copy.videos)) return
      const item = copy.videos[key]
      syncCardCopy(card, item.title, item.body, copy.play, copy.openYoutube)
    })
    return
  }

  root.innerHTML = TUTORIAL_VIDEOS.map((video) => {
    const item = copy.videos[video.key]
    return videoCardHtml(video.youtubeId, video.key, item.title, item.body, copy.play, copy.openYoutube)
  }).join('\n')
  bindThumbFallbacks(root)
  bindPlayButtons(root)
}

/** Keep the static JSON-LD block in sync with the catalog and active locale. */
function syncVideoJsonLd(): void {
  const script = document.querySelector<HTMLScriptElement>('script[type="application/ld+json"]')
  if (!script) return
  const copy = t(locale).tutorial
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: copy.metaTitle,
    itemListElement: TUTORIAL_VIDEOS.map((video, index) => {
      const item = copy.videos[video.key]
      return {
        '@type': 'VideoObject',
        position: index + 1,
        name: item.title,
        description: item.body,
        thumbnailUrl: YT_THUMB(video.youtubeId, 'hqdefault'),
        embedUrl: `https://www.youtube.com/embed/${video.youtubeId}`,
        url: YT_WATCH(video.youtubeId),
        uploadDate: video.uploadDate,
        publisher: { '@type': 'Organization', name: 'MLightCAD' },
      }
    }),
  })
}

/** Apply locale to meta tags, nav, hero, and the video catalog. */
function applyI18n(): void {
  const dict = t(locale)
  const copy = dict.tutorial
  applyPageMeta({
    locale,
    title: copy.metaTitle,
    description: copy.metaDescription,
    keywords: copy.metaKeywords,
    path: '/tutorial.html',
  })
  applyCommonI18n(dict)
  const channel = document.querySelector<HTMLAnchorElement>('.tutorial-more a')
  if (channel) channel.href = TUTORIAL_CHANNEL_HREF
  renderCatalog()
  syncVideoJsonLd()
  const scrambleEl = document.querySelector<HTMLElement>('[data-scramble]')
  window.setTimeout(() => scrambleText(scrambleEl, copy.eyebrow), 450)
  observeReveals()
}

mountShell('tutorial')
applyI18n()
setupLocaleToggle(() => applyI18n())
setupNav()
setupPageFX()
void setupWebGL()
