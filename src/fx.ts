/**
 * Whether the user prefers reduced motion.
 *
 * @returns `true` when `(prefers-reduced-motion: reduce)` matches.
 */
function reducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Whether the primary pointing device is precise (mouse / trackpad).
 *
 * @returns `true` when `(pointer: fine)` matches.
 */
function finePointer(): boolean {
  return window.matchMedia('(pointer: fine)').matches
}

/** Cursor spotlight + CAD crosshair + CSS pointer vars */
export function setupPointerFX(): void {
  if (reducedMotion() || !finePointer()) return

  const root = document.documentElement
  const crossX = document.querySelector<HTMLElement>('[data-cross-x]')
  const crossY = document.querySelector<HTMLElement>('[data-cross-y]')
  const spot = document.querySelector<HTMLElement>('[data-spot]')
  if (!crossX && !crossY && !spot) return

  let raf = 0
  let cx = window.innerWidth * 0.5
  let cy = window.innerHeight * 0.4

  /** Write pointer CSS variables and move the crosshair / spotlight. */
  const paint = () => {
    raf = 0
    root.style.setProperty('--px', `${cx / window.innerWidth}`)
    root.style.setProperty('--py', `${cy / window.innerHeight}`)
    root.style.setProperty('--px-px', `${cx}px`)
    root.style.setProperty('--py-px', `${cy}px`)
    if (crossX) crossX.style.transform = `translate3d(0, ${cy}px, 0)`
    if (crossY) crossY.style.transform = `translate3d(${cx}px, 0, 0)`
    if (spot) {
      spot.style.opacity = '1'
      spot.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
    }
  }

  window.addEventListener(
    'pointermove',
    (e) => {
      cx = e.clientX
      cy = e.clientY
      if (!raf) raf = requestAnimationFrame(paint)
    },
    { passive: true },
  )

  document.documentElement.addEventListener('mouseleave', () => {
    if (spot) spot.style.opacity = '0'
  })

  paint()
}

export function setupScrollChrome(): void {
  const bar = document.querySelector<HTMLElement>('[data-scroll-progress]')
  const nav = document.querySelector('.nav')
  /** Update the scroll-progress bar and nav scrolled state. */
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    const p = max > 0 ? (window.scrollY / max) * 100 : 0
    if (bar) bar.style.width = `${Math.min(100, Math.max(0, p))}%`
    nav?.classList.toggle('is-scrolled', window.scrollY > 12)
  }
  update()
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
}

export function setupHud(): void {
  const el = document.querySelector<HTMLElement>('[data-hud-coords]')
  if (!el || reducedMotion()) return
  let raf = 0
  let x = 0
  let y = 0
  window.addEventListener(
    'pointermove',
    (e) => {
      x = (e.clientX / window.innerWidth - 0.5) * 100
      y = (0.5 - e.clientY / window.innerHeight) * 100
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        el.textContent = `X ${x.toFixed(2)}   Y ${y.toFixed(2)}`
      })
    },
    { passive: true },
  )
}

/** Subtle perspective tilt on framed hero blocks */
export function setupHeroTilt(): void {
  if (reducedMotion() || !finePointer()) return

  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((frame) => {
    const host = frame.closest('section') ?? frame.parentElement
    if (!host) return

    let raf = 0
    let tx = 0
    let ty = 0

    host.addEventListener(
      'pointermove',
      (e: Event) => {
        const pe = e as PointerEvent
        const rect = frame.getBoundingClientRect()
        const x = (pe.clientX - rect.left) / rect.width - 0.5
        const y = (pe.clientY - rect.top) / rect.height - 0.5
        tx = x * 6
        ty = -y * 5
        if (raf) return
        raf = requestAnimationFrame(() => {
          raf = 0
          frame.style.transform = `perspective(900px) rotateX(${ty}deg) rotateY(${tx}deg)`
        })
      },
      { passive: true },
    )

    host.addEventListener('pointerleave', () => {
      frame.style.transform = ''
    })
  })
}

/** Magnetic pull on primary glow buttons */
export function setupMagneticButtons(): void {
  if (reducedMotion() || !finePointer()) return

  document.querySelectorAll<HTMLElement>('.btn--glow').forEach((btn) => {
    let raf = 0
    btn.addEventListener(
      'pointermove',
      (e) => {
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - (rect.left + rect.width / 2)
        const y = e.clientY - (rect.top + rect.height / 2)
        if (raf) return
        raf = requestAnimationFrame(() => {
          raf = 0
          btn.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`
        })
      },
      { passive: true },
    )
    btn.addEventListener('pointerleave', () => {
      btn.style.transform = ''
    })
  })
}

const SCRAMBLE_GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/'

/** Terminal-style decode scramble for [data-scramble] or hero meta */
export function scrambleText(el: HTMLElement | null, text?: string): void {
  if (!el || reducedMotion()) return

  const target = text ?? el.textContent ?? ''
  if (!target) return

  let frame = 0
  const total = 16 + Math.min(target.length, 28)

  /** Advance one scramble animation frame. */
  const tick = () => {
    frame++
    const progress = frame / total
    let out = ''
    for (let i = 0; i < target.length; i++) {
      const ch = target[i]
      if (ch === ' ' || ch === '·' || ch === '/') {
        out += ch
        continue
      }
      if (i / target.length < progress) out += ch
      else out += SCRAMBLE_GLYPHS[(Math.random() * SCRAMBLE_GLYPHS.length) | 0]
    }
    el.textContent = out
    if (frame < total) requestAnimationFrame(tick)
    else el.textContent = target
  }
  requestAnimationFrame(tick)
}

export function scrambleMeta(text?: string): void {
  scrambleText(document.querySelector<HTMLElement>('[data-i18n="hero.meta"]'), text)
}

/** Brief boot line in hero */
export function setupBootLine(): void {
  const boot = document.querySelector<HTMLElement>('[data-boot]')
  if (!boot) return
  if (reducedMotion()) {
    boot.classList.add('is-done')
    return
  }
  requestAnimationFrame(() => boot.classList.add('is-on'))
  window.setTimeout(() => boot.classList.add('is-done'), 1600)
}

/** Options for {@link setupPageFX}. */
export interface PageFXOptions {
  /** Home-only boot sequence */
  boot?: boolean
}

/** Shared page chrome + interaction FX (home + parser) */
export function setupPageFX(options: PageFXOptions = {}): void {
  setupPointerFX()
  setupScrollChrome()
  setupHud()
  setupHeroTilt()
  setupMagneticButtons()
  if (options.boot) setupBootLine()
  requestAnimationFrame(() => document.body.classList.add('is-ready'))
}

/** @deprecated use setupPageFX({ boot: true }) */
export function setupHomeFX(): void {
  setupPageFX({ boot: true })
}
