import './styles/embed.css'
import {
  ensureViewer,
  openDrawingFromUrl,
  parseBoolParam,
  parseOpenMode,
  parseOpenViewMode,
  parseTheme,
  parseViewerLocale,
} from './try-drawing/viewer'

/** Localized idle / error copy for the embed viewer. */
type EmbedCopy = {
  /** Idle panel heading. */
  idleTitle: string
  /** Idle panel body. */
  idleBody: string
  /** Error panel heading. */
  errorTitle: string
  /** Message when the URL is not a DWG/DXF path. */
  badType: string
  /** Message when the viewer fails to start. */
  initFailed: string
  /** Message when the drawing cannot be opened. */
  openFailed: string
  /** Message when the fetch looks like a CORS / network failure. */
  corsHint: string
}

const COPY: Record<'en' | 'zh' | 'tr' | 'cs', EmbedCopy> = {
  en: {
    idleTitle: 'Waiting for a drawing',
    idleBody: 'Pass a public DWG/DXF URL with the url query parameter.',
    errorTitle: 'Could not open drawing',
    badType: 'Only .dwg and .dxf files are supported.',
    initFailed: 'Could not start the viewer.',
    openFailed: 'Could not open the drawing from the given URL.',
    corsHint:
      'Fetch failed. The file host must allow CORS from this origin, or serve the file from the same site.',
  },
  zh: {
    idleTitle: '等待打开图纸',
    idleBody: '请通过 url 查询参数传入可公开访问的 DWG/DXF 地址。',
    errorTitle: '无法打开图纸',
    badType: '仅支持 .dwg 与 .dxf 文件。',
    initFailed: '无法启动查看器。',
    openFailed: '无法从给定 URL 打开图纸。',
    corsHint: '拉取文件失败。文件所在服务器需允许本站跨域（CORS），或将文件放在同源站点。',
  },
  tr: {
    idleTitle: 'Bir çizim bekleniyor',
    idleBody: 'url sorgu parametresiyle herkese açık bir DWG/DXF URL’si geçin.',
    errorTitle: 'Çizim açılamadı',
    badType: 'Yalnızca .dwg ve .dxf dosyaları desteklenir.',
    initFailed: 'Görüntüleyici başlatılamadı.',
    openFailed: 'Verilen URL’den çizim açılamadı.',
    corsHint:
      'Dosya alınamadı. Dosya sunucusu bu origin için CORS’a izin vermeli veya dosyayı aynı siteden sunmalıdır.',
  },
  cs: {
    idleTitle: 'Čeká se na výkres',
    idleBody: 'Předajte veřejnou URL souboru DWG/DXF parametrem url.',
    errorTitle: 'Výkres se nepodařilo otevřít',
    badType: 'Podporovány jsou pouze soubory .dwg a .dxf.',
    initFailed: 'Prohlížeč se nepodařilo spustit.',
    openFailed: 'Výkres se z dané URL nepodařilo otevřít.',
    corsHint:
      'Stažení souboru selhalo. Hostitel souboru musí povolit CORS pro tento origin, nebo soubor servírovat ze stejného webu.',
  },
}

/**
 * Pick embed copy for a viewer locale, falling back to English.
 *
 * @param lang - Viewer locale from the query string.
 * @returns Copy for that locale.
 */
function pickCopy(lang: string): EmbedCopy {
  return COPY[lang as keyof typeof COPY] ?? COPY.en
}

/**
 * Whether the URL path looks like a DWG or DXF file.
 *
 * @param url - Absolute drawing URL.
 * @returns `true` when the path ends with `.dwg` or `.dxf`.
 */
function isCadUrl(url: string): boolean {
  try {
    const path = new URL(url).pathname.toLowerCase()
    return path.endsWith('.dwg') || path.endsWith('.dxf')
  } catch {
    return false
  }
}

/**
 * Show the idle panel, the error panel, or neither.
 *
 * @param idle - Idle overlay element.
 * @param error - Error overlay element.
 * @param which - Which overlay to display.
 */
function setPanel(idle: HTMLElement, error: HTMLElement, which: 'idle' | 'error' | 'none'): void {
  idle.hidden = which !== 'idle'
  error.hidden = which !== 'error'
}

/** Parse embed query parameters and open the drawing when a URL is present. */
async function main(): Promise<void> {
  const host = document.querySelector<HTMLElement>('[data-embed-host]')
  const container = document.querySelector<HTMLElement>('[data-embed-container]')
  const idle = document.querySelector<HTMLElement>('[data-embed-idle]')
  const error = document.querySelector<HTMLElement>('[data-embed-error]')
  const errorMsg = document.querySelector<HTMLElement>('[data-embed-error-msg]')
  if (!host || !container || !idle || !error || !errorMsg) return

  const params = new URLSearchParams(window.location.search)
  const lang = parseViewerLocale(params.get('lang') ?? params.get('locale'))
  const copy = pickCopy(lang)
  const theme = parseTheme(params.get('theme'))
  const toolbar = parseBoolParam(params.get('toolbar'), false)
  const commandLine = parseBoolParam(
    params.get('commandline') ?? params.get('commandLine') ?? params.get('cli'),
    false,
  )
  const mode = parseOpenMode(params.get('mode'))
  const openViewMode = parseOpenViewMode(
    params.get('view') ?? params.get('openView') ?? params.get('viewport'),
  )
  const url = (params.get('url') ?? '').trim()

  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang
  document.querySelector('[data-embed-idle-title]')!.textContent = copy.idleTitle
  document.querySelector('[data-embed-idle-body]')!.textContent = copy.idleBody
  document.querySelector('[data-embed-error-title]')!.textContent = copy.errorTitle

  if (!url) {
    setPanel(idle, error, 'idle')
    return
  }

  if (!isCadUrl(url)) {
    errorMsg.textContent = copy.badType
    setPanel(idle, error, 'error')
    return
  }

  // Let cad-simple-viewer own the busy indicator — do not stack a second loading overlay.
  setPanel(idle, error, 'none')

  const ready = await ensureViewer(host, container, {
    theme,
    lang,
    toolbar,
    commandLine,
  })
  if (!ready) {
    errorMsg.textContent = copy.initFailed
    setPanel(idle, error, 'error')
    return
  }

  try {
    const ok = await openDrawingFromUrl(url, { mode, openViewMode })
    if (!ok) {
      errorMsg.textContent = copy.openFailed
      setPanel(idle, error, 'error')
      return
    }
    setPanel(idle, error, 'none')
  } catch (err) {
    console.error('Embed open failed:', err)
    const message = err instanceof Error ? err.message : String(err)
    const looksLikeCors =
      /failed to fetch|networkerror|cors|load failed/i.test(message) ||
      message === 'Failed to fetch'
    errorMsg.textContent = looksLikeCors ? copy.corsHint : `${copy.openFailed} ${message}`
    setPanel(idle, error, 'error')
  }
}

void main()
