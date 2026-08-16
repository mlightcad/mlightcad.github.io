import type { TrialFormCopy } from './i18n/parser'
import { getSupabase, isSupabaseConfigured } from './supabase'

/** Payload stored for a trial-license application. */
export interface TrialApplication {
  /** Applicant company name. */
  companyName: string
  /** Company website, optional. */
  website: string
  /** Country of the company. */
  country: string
  /** Contact person name. */
  contactName: string
  /** Contact email address. */
  contactEmail: string
  /** GitHub username without a leading `@`. */
  githubUsername: string
  /** Product that will use the parser. */
  productName: string
  /** How the product is deployed. */
  deploymentModel: string
  /** Intended use case. */
  useCase: string
}

/** Dialog / form submission state. */
type Status = 'idle' | 'submitting' | 'success' | 'error'

let dialog: HTMLDialogElement | null = null
let statusEl: HTMLElement | null = null
let submitBtn: HTMLButtonElement | null = null
let formEl: HTMLFormElement | null = null
let copy: TrialFormCopy | null = null
let status: Status = 'idle'
let listenersBound = false

/**
 * Render one labeled input or textarea for the trial form.
 *
 * @param name - Form field name matching {@link TrialApplication}.
 * @param label - Visible field label.
 * @param placeholder - Input placeholder text.
 * @param opts - Field options (required, type, optional hint, textarea rows).
 * @returns HTML for a labeled control.
 */
function field(
  name: keyof TrialApplication,
  label: string,
  placeholder: string,
  opts: { required?: boolean; type?: string; optionalHint?: string; rows?: number } = {},
): string {
  const required = opts.required !== false
  const type = opts.type ?? 'text'
  const opt = opts.optionalHint
    ? ` <span class="trial-form__optional">(${opts.optionalHint})</span>`
    : ''
  const reqMark = required ? ' <span class="trial-form__req" aria-hidden="true">*</span>' : ''
  const reqAttr = required ? ' required' : ''

  if (opts.rows) {
    return [
      `<label class="trial-form__field">`,
      `  <span class="trial-form__label">${label}${reqMark}${opt}</span>`,
      `  <textarea name="${name}" rows="${opts.rows}" placeholder="${placeholder}"${reqAttr}></textarea>`,
      `</label>`,
    ].join('\n')
  }

  return [
    `<label class="trial-form__field">`,
    `  <span class="trial-form__label">${label}${reqMark}${opt}</span>`,
    `  <input type="${type}" name="${name}" placeholder="${placeholder}"${reqAttr} autocomplete="on" />`,
    `</label>`,
  ].join('\n')
}

/**
 * Build the trial-license `<dialog>` markup.
 *
 * @param f - Localized form copy.
 * @returns Dialog HTML.
 */
function buildDialogHtml(f: TrialFormCopy): string {
  return [
    `<dialog class="trial-dialog" data-trial-dialog aria-labelledby="trial-dialog-title">`,
    `  <div class="trial-dialog__panel">`,
    `    <header class="trial-dialog__header">`,
    `      <div>`,
    `        <h2 id="trial-dialog-title" class="trial-dialog__title">${f.title}</h2>`,
    `        <p class="trial-dialog__lead">${f.lead}</p>`,
    `      </div>`,
    `      <button type="button" class="trial-dialog__close" data-trial-close aria-label="${f.close}">`,
    `        <span aria-hidden="true">×</span>`,
    `      </button>`,
    `    </header>`,
    `    <form class="trial-form" data-trial-form novalidate>`,
    `      <p class="trial-form__hint">${f.requiredHint}</p>`,
    `      <fieldset class="trial-form__section">`,
    `        <legend>${f.companySection}</legend>`,
    field('companyName', f.companyName, f.companyNamePlaceholder),
    field('website', f.website, f.websitePlaceholder, {
      required: false,
      optionalHint: f.websiteOptional,
    }),
    field('country', f.country, f.countryPlaceholder),
    field('contactName', f.contactName, f.contactNamePlaceholder),
    field('contactEmail', f.contactEmail, f.contactEmailPlaceholder, { type: 'email' }),
    field('githubUsername', f.githubUsername, f.githubUsernamePlaceholder),
    `      </fieldset>`,
    `      <fieldset class="trial-form__section">`,
    `        <legend>${f.useSection}</legend>`,
    field('productName', f.productName, f.productNamePlaceholder),
    field('deploymentModel', f.deploymentModel, f.deploymentModelPlaceholder),
    field('useCase', f.useCase, f.useCasePlaceholder, { rows: 4 }),
    `      </fieldset>`,
    `      <p class="trial-form__status" data-trial-status role="status" aria-live="polite" hidden></p>`,
    `      <div class="trial-form__actions">`,
    `        <button type="button" class="btn btn--ghost" data-trial-close>${f.close}</button>`,
    `        <button type="submit" class="btn btn--primary btn--glow" data-trial-submit>${f.submit}</button>`,
    `      </div>`,
    `    </form>`,
    `  </div>`,
    `</dialog>`,
  ].join('\n')
}

/**
 * Read and trim trial form values.
 *
 * @param form - The trial application form.
 * @returns Application payload.
 */
function readForm(form: HTMLFormElement): TrialApplication {
  const data = new FormData(form)
  /** Read a trimmed string field from the form. */
  const value = (key: keyof TrialApplication) => String(data.get(key) ?? '').trim()
  return {
    companyName: value('companyName'),
    website: value('website'),
    country: value('country'),
    contactName: value('contactName'),
    contactEmail: value('contactEmail'),
    githubUsername: value('githubUsername').replace(/^@/, ''),
    productName: value('productName'),
    deploymentModel: value('deploymentModel'),
    useCase: value('useCase'),
  }
}

/**
 * Validate required fields and website format.
 *
 * @param app - Submitted application.
 * @returns The first invalid field name, or `null` when valid.
 */
function validate(app: TrialApplication): string | null {
  if (!app.companyName) return 'companyName'
  if (!app.country) return 'country'
  if (!app.contactName) return 'contactName'
  if (!app.contactEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(app.contactEmail)) return 'contactEmail'
  if (!app.githubUsername) return 'githubUsername'
  if (!app.productName) return 'productName'
  if (!app.deploymentModel) return 'deploymentModel'
  if (!app.useCase) return 'useCase'
  if (app.website) {
    try {
      const url = app.website.includes('://') ? app.website : `https://${app.website}`
      new URL(url)
    } catch {
      return 'website'
    }
  }
  return null
}

/**
 * Update the status line and submit button for the current form state.
 *
 * @param next - Target status.
 * @param message - Optional status message for success or error.
 */
function setStatus(next: Status, message?: string): void {
  status = next
  if (!statusEl || !submitBtn || !copy) return

  if (next === 'idle') {
    statusEl.hidden = true
    statusEl.textContent = ''
    statusEl.classList.remove('trial-form__status--ok', 'trial-form__status--err')
    submitBtn.disabled = false
    submitBtn.textContent = copy.submit
    return
  }

  statusEl.hidden = false
  statusEl.textContent = message ?? ''
  statusEl.classList.toggle('trial-form__status--ok', next === 'success')
  statusEl.classList.toggle('trial-form__status--err', next === 'error')
  submitBtn.disabled = next === 'submitting'
  submitBtn.textContent = next === 'submitting' ? copy.submitting : copy.submit
}

/**
 * Prefix a website with `https://` when the user omitted a scheme.
 *
 * @param website - Raw website field value.
 * @returns Normalized URL, or an empty string.
 */
function normalizeWebsite(website: string): string {
  if (!website) return ''
  return website.includes('://') ? website : `https://${website}`
}

/**
 * Insert the application into Supabase.
 *
 * @param app - Validated application payload.
 */
async function submitApplication(app: TrialApplication): Promise<void> {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured')
  }
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase client unavailable')

  const { error } = await supabase.from('trial_license_applications').insert({
    company_name: app.companyName,
    website: normalizeWebsite(app.website) || null,
    country: app.country,
    contact_name: app.contactName,
    contact_email: app.contactEmail,
    github_username: app.githubUsername,
    product_name: app.productName,
    deployment_model: app.deploymentModel,
    use_case: app.useCase,
  })

  if (error) throw error
}

/**
 * Validate and submit the trial form.
 *
 * @param event - Form submit event.
 */
function onSubmit(event: Event): void {
  event.preventDefault()
  if (!formEl || !copy || status === 'submitting') return

  const app = readForm(formEl)
  const invalid = validate(app)
  if (invalid) {
    const el = formEl.elements.namedItem(invalid)
    if (el instanceof HTMLElement) el.focus()
    setStatus('error', copy.error)
    return
  }

  setStatus('submitting')
  void submitApplication(app)
    .then(() => {
      setStatus('success', copy!.success)
      formEl?.reset()
    })
    .catch((err: unknown) => {
      console.error('Trial license submit failed:', err)
      setStatus('error', copy!.error)
    })
}

/**
 * Close the dialog when the backdrop (the dialog element itself) is clicked.
 *
 * @param event - Click event on the dialog.
 */
function onBackdropClick(event: MouseEvent): void {
  if (event.target === dialog) closeTrialDialog()
}

/**
 * Cache dialog controls and bind submit / close listeners.
 *
 * @param el - The trial dialog element.
 */
function wireDialog(el: HTMLDialogElement): void {
  dialog = el
  formEl = el.querySelector('[data-trial-form]')
  statusEl = el.querySelector('[data-trial-status]')
  submitBtn = el.querySelector('[data-trial-submit]')
  formEl?.addEventListener('submit', onSubmit)
  el.addEventListener('click', onBackdropClick)
  el.querySelectorAll('[data-trial-close]').forEach((btn) => {
    btn.addEventListener('click', () => closeTrialDialog())
  })
}

export function ensureTrialDialog(formCopy: TrialFormCopy): void {
  copy = formCopy
  const wasOpen = Boolean(dialog?.open)

  const wrap = document.createElement('div')
  wrap.innerHTML = buildDialogHtml(formCopy)
  const next = wrap.querySelector<HTMLDialogElement>('[data-trial-dialog]')
  if (!next) return

  if (dialog) {
    dialog.replaceWith(next)
  } else {
    document.body.appendChild(next)
  }
  wireDialog(next)

  if (!listenersBound) {
    listenersBound = true
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && dialog?.open) closeTrialDialog()
    })
  }

  if (wasOpen) next.showModal()
}

export function openTrialDialog(): void {
  if (!dialog) return
  setStatus('idle')
  dialog.showModal()
  document.body.classList.add('trial-dialog-open')
  const first = dialog.querySelector<HTMLInputElement>('input, textarea')
  window.setTimeout(() => first?.focus(), 40)
}

export function closeTrialDialog(): void {
  if (!dialog?.open) return
  dialog.close()
  document.body.classList.remove('trial-dialog-open')
  if (status !== 'submitting') setStatus('idle')
}

export function bindTrialTriggers(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-trial-open]').forEach((el) => {
    if (el.dataset.trialBound === '1') return
    el.dataset.trialBound = '1'
    el.addEventListener('click', (event) => {
      event.preventDefault()
      openTrialDialog()
    })
  })
}
