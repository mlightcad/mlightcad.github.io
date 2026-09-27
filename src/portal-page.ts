import './styles/main.css'
import { scrambleText, setupPageFX } from './fx'
import { t } from './i18n'
import { portalCopy } from './i18n/portal'
import {
  fetchPortalSession,
  isPortalConfigured,
  requestPortalLink,
  type PortalLicense,
  type PortalSession,
} from './license-portal-api'
import { applyPageMeta } from './seo'
import { mountShell } from './shell'
import {
  applyCommonI18n,
  locale,
  setupLocaleToggle,
  setupNav,
  setupWebGL,
} from './shared'

function el<T extends HTMLElement>(selector: string): T | null {
  return document.querySelector(selector)
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function installSnippet(): string {
  return [
    'registry=https://registry.npmjs.org/',
    '//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}',
    '',
    'pnpm add @mlightcad/dwg-converter --registry https://npm.pkg.github.com',
  ].join('\n')
}

async function copyText(text: string): Promise<void> {
  await navigator.clipboard.writeText(text)
}

function renderLicenses(session: PortalSession): void {
  const copy = portalCopy(locale)
  const host = el<HTMLElement>('[data-portal-session]')
  if (!host) return

  const cards = session.licenses.map((lic) => licenseCardHtml(lic, copy)).join('')

  host.hidden = false
  host.innerHTML = [
    `<p class="portal-signed-in">${escapeHtml(copy.signedInAs)} <strong>${escapeHtml(session.email)}</strong></p>`,
    `<h2>${escapeHtml(copy.licensesTitle)}</h2>`,
    session.licenses.length ? cards : `<p>${escapeHtml(copy.noLicenses)}</p>`,
    `<button type="button" class="btn btn--ghost portal-reset" data-portal-reset>${escapeHtml(copy.requestAnother)}</button>`,
  ].join('\n')

  host.querySelectorAll<HTMLButtonElement>('[data-copy-key]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-copy-key') ?? ''
      void copyText(key).then(() => {
        btn.textContent = copy.copied
        setTimeout(() => {
          btn.textContent = copy.copyKey
        }, 1600)
      })
    })
  })

  host.querySelector('[data-portal-reset]')?.addEventListener('click', () => {
    const url = new URL(window.location.href)
    url.searchParams.delete('session')
    window.history.replaceState({}, '', url.pathname)
    host.hidden = true
    host.innerHTML = ''
    const form = el<HTMLFormElement>('[data-portal-request-form]')
    if (form) form.hidden = false
    setStatus('')
  })
}

function licenseCardHtml(lic: PortalLicense, copy: ReturnType<typeof portalCopy>): string {
  return `<article class="portal-card" data-license-id="${escapeHtml(lic.id)}">
    <dl class="portal-meta">
      <div><dt>${escapeHtml(copy.product)}</dt><dd><code>${escapeHtml(lic.product)}</code></dd></div>
      <div><dt>${escapeHtml(copy.type)}</dt><dd>${escapeHtml(lic.product_type)}</dd></div>
      <div><dt>${escapeHtml(copy.status)}</dt><dd>${escapeHtml(lic.status)}</dd></div>
      <div><dt>${escapeHtml(copy.expires)}</dt><dd>${escapeHtml(lic.expires_at.slice(0, 10))}</dd></div>
    </dl>
    <h3>${escapeHtml(copy.licenseKey)}</h3>
    <pre class="portal-pre">${escapeHtml(lic.license_jwt)}</pre>
    <button type="button" class="btn btn--ghost" data-copy-key="${escapeHtml(lic.license_jwt)}">${escapeHtml(copy.copyKey)}</button>
    <h3>${escapeHtml(copy.installTitle)}</h3>
    <p class="portal-muted">${escapeHtml(copy.installHint)}</p>
    <pre class="portal-pre">${escapeHtml(installSnippet())}</pre>
  </article>`
}

function setStatus(message: string, isError = false): void {
  const status = el<HTMLElement>('[data-portal-status]')
  if (!status) return
  if (!message) {
    status.hidden = true
    status.textContent = ''
    status.classList.remove('portal-status--error')
    return
  }
  status.hidden = false
  status.textContent = message
  status.classList.toggle('portal-status--error', isError)
}

function applyPortalI18n(): void {
  const copy = portalCopy(locale)
  applyPageMeta({
    title: copy.metaTitle,
    description: copy.metaDescription,
    locale,
    path: '/license-portal.html',
    robots: 'noindex, nofollow',
  })
  const eyebrow = el<HTMLElement>('[data-portal-eyebrow]')
  const title = el<HTMLElement>('[data-portal-title]')
  const lead = el<HTMLElement>('[data-portal-lead]')
  if (eyebrow) eyebrow.textContent = copy.eyebrow
  if (title) title.textContent = copy.title
  if (lead) lead.textContent = copy.lead
  const emailLabel = el<HTMLElement>('[data-portal-email-label]')
  if (emailLabel) emailLabel.textContent = copy.emailLabel
  const emailInput = el<HTMLInputElement>('[data-portal-email]')
  if (emailInput) emailInput.placeholder = copy.emailPlaceholder
  const cta = el<HTMLElement>('[data-portal-request-cta]')
  if (cta) cta.textContent = copy.requestCta
  const support = el<HTMLElement>('[data-portal-support]')
  if (support) support.textContent = copy.support
}

function bindRequestForm(): void {
  const form = el<HTMLFormElement>('[data-portal-request-form]')
  const copy = () => portalCopy(locale)
  form?.addEventListener('submit', (ev) => {
    ev.preventDefault()
    if (!isPortalConfigured()) {
      setStatus(copy().notConfigured, true)
      return
    }
    const email = el<HTMLInputElement>('[data-portal-email]')?.value ?? ''
    const cta = el<HTMLButtonElement>('[data-portal-request-cta]')
    if (cta) {
      cta.disabled = true
      cta.textContent = copy().requesting
    }
    void requestPortalLink(email)
      .then(() => setStatus(copy().requestSent))
      .catch(() => setStatus(copy().requestError, true))
      .finally(() => {
        if (cta) {
          cta.disabled = false
          cta.textContent = copy().requestCta
        }
      })
  })
}

async function bootSession(): Promise<void> {
  const params = new URLSearchParams(window.location.search)
  const sessionToken = params.get('session')
  if (!sessionToken) return

  const form = el<HTMLFormElement>('[data-portal-request-form]')
  if (form) form.hidden = true
  setStatus(portalCopy(locale).sessionLoading)

  if (!isPortalConfigured()) {
    setStatus(portalCopy(locale).notConfigured, true)
    if (form) form.hidden = false
    return
  }

  try {
    const session = await fetchPortalSession(sessionToken)
    // Drop the bearer token from the address bar so it is not kept in history/referrers.
    const clean = new URL(window.location.href)
    clean.searchParams.delete('session')
    const next = `${clean.pathname}${clean.search}${clean.hash}`
    window.history.replaceState({}, '', next)
    setStatus('')
    renderLicenses(session)
  } catch {
    setStatus(portalCopy(locale).sessionError, true)
    if (form) form.hidden = false
  }
}

function main(): void {
  mountShell('portal')
  applyCommonI18n(t(locale))
  applyPortalI18n()
  setupNav()
  setupLocaleToggle(() => {
    applyCommonI18n(t(locale))
    applyPortalI18n()
  })
  setupWebGL()
  setupPageFX()
  document.querySelectorAll<HTMLElement>('[data-scramble]').forEach((node) => {
    scrambleText(node, node.textContent ?? '')
  })
  bindRequestForm()
  void bootSession()
}

main()
