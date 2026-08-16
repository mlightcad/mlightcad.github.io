import './styles/embed.css'
import {
  ensureViewer,
  isCadDrawingRef,
  isCadFileName,
  openDrawingFromBuffer,
  openDrawingFromUrl,
  parseBoolParam,
  parseOpenMode,
  parseOpenViewMode,
  parseTheme,
  parseViewerLocale,
  type OpenDrawingOptions,
} from './try-drawing/viewer'

/** Message the embed posts to `window.parent` when it can accept a drawing. */
export const EMBED_READY_TYPE = 'mlightcad-embed:ready'
/** Message a host page posts to open bytes it already fetched. */
export const EMBED_OPEN_TYPE = 'mlightcad-embed:open'

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
    idleBody:
      'Pass a public DWG/DXF URL with the url query parameter, or postMessage the file from the parent page.',
    errorTitle: 'Could not open drawing',
    badType: 'Only .dwg and .dxf files are supported.',
    initFailed: 'Could not start the viewer.',
    openFailed: 'Could not open the drawing from the given URL.',
    corsHint:
      'Fetch failed. The file host must allow CORS from this origin, or serve the file from the same site. Private files should be opened via postMessage instead.',
  },
  zh: {
    idleTitle: '等待打开图纸',
    idleBody:
      '请通过 url 查询参数传入可公开访问的 DWG/DXF 地址，或由父页面 postMessage 传入文件。',
    errorTitle: '无法打开图纸',
    badType: '仅支持 .dwg 与 .dxf 文件。',
    initFailed: '无法启动查看器。',
    openFailed: '无法从给定 URL 打开图纸。',
    corsHint:
      '拉取文件失败。文件所在服务器需允许本站跨域（CORS），或将文件放在同源站点。私有文件请改用 postMessage 打开。',
  },
  tr: {
    idleTitle: 'Bir çizim bekleniyor',
    idleBody:
      'url sorgu parametresiyle herkese açık bir DWG/DXF URL’si geçin veya dosyayı üst sayfadan postMessage ile gönderin.',
    errorTitle: 'Çizim açılamadı',
    badType: 'Yalnızca .dwg ve .dxf dosyaları desteklenir.',
    initFailed: 'Görüntüleyici başlatılamadı.',
    openFailed: 'Verilen URL’den çizim açılamadı.',
    corsHint:
      'Dosya alınamadı. Dosya sunucusu bu origin için CORS’a izin vermeli veya dosyayı aynı siteden sunmalıdır. Özel dosyalar postMessage ile açılmalıdır.',
  },
  cs: {
    idleTitle: 'Čeká se na výkres',
    idleBody:
      'Předajte veřejnou URL souboru DWG/DXF parametrem url, nebo soubor pošlete z nadřazené stránky přes postMessage.',
    errorTitle: 'Výkres se nepodařilo otevřít',
    badType: 'Podporovány jsou pouze soubory .dwg a .dxf.',
    initFailed: 'Prohlížeč se nepodařilo spustit.',
    openFailed: 'Výkres se z dané URL nepodařilo otevřít.',
    corsHint:
      'Stažení souboru selhalo. Hostitel souboru musí povolit CORS pro tento origin, nebo soubor servírovat ze stejného webu. Soukromé soubory otevírejte přes postMessage.',
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

function asArrayBuffer(data: unknown): ArrayBuffer | null {
  if (data instanceof ArrayBuffer) return data
  if (ArrayBuffer.isView(data)) {
    const copy = new ArrayBuffer(data.byteLength)
    new Uint8Array(copy).set(
      new Uint8Array(data.buffer, data.byteOffset, data.byteLength)
    )
    return copy
  }
  return null
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
  const openOptions: OpenDrawingOptions = { mode, openViewMode }
  const url = (params.get('url') ?? '').trim()
  const fileNameHint = (params.get('filename') ?? params.get('name') ?? '').trim()

  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang
  document.querySelector('[data-embed-idle-title]')!.textContent = copy.idleTitle
  document.querySelector('[data-embed-idle-body]')!.textContent = copy.idleBody
  document.querySelector('[data-embed-error-title]')!.textContent = copy.errorTitle

  const ensureReady = async (): Promise<boolean> => {
    const ready = await ensureViewer(host, container, {
      theme,
      lang,
      toolbar,
      commandLine,
    })
    if (!ready) {
      errorMsg.textContent = copy.initFailed
      setPanel(idle, error, 'error')
    }
    return ready
  }

  const showOpenError = (err: unknown): void => {
    console.error('Embed open failed:', err)
    const message = err instanceof Error ? err.message : String(err)
    const looksLikeCors =
      /failed to fetch|networkerror|cors|load failed/i.test(message) ||
      message === 'Failed to fetch'
    errorMsg.textContent = looksLikeCors ? copy.corsHint : `${copy.openFailed} ${message}`
    setPanel(idle, error, 'error')
  }

  const openFromParent = async (fileName: string, buffer: ArrayBuffer): Promise<void> => {
    if (!isCadFileName(fileName)) {
      errorMsg.textContent = copy.badType
      setPanel(idle, error, 'error')
      return
    }
    setPanel(idle, error, 'none')
    if (!(await ensureReady())) return
    try {
      const ok = await openDrawingFromBuffer(fileName, buffer, openOptions)
      if (!ok) {
        errorMsg.textContent = copy.openFailed
        setPanel(idle, error, 'error')
        return
      }
      setPanel(idle, error, 'none')
    } catch (err) {
      showOpenError(err)
    }
  }

  window.addEventListener('message', (event: MessageEvent) => {
    if (event.source !== window.parent) return
    const payload = event.data as { type?: string; filename?: string; buffer?: unknown } | null
    if (!payload || payload.type !== EMBED_OPEN_TYPE) return
    const fileName = String(payload.filename ?? '')
    const buffer = asArrayBuffer(payload.buffer)
    if (!buffer) {
      errorMsg.textContent = copy.openFailed
      setPanel(idle, error, 'error')
      return
    }
    void openFromParent(fileName, buffer)
  })

  if (window.parent !== window) {
    window.parent.postMessage({ type: EMBED_READY_TYPE }, '*')
  }

  if (!url) {
    setPanel(idle, error, 'idle')
    return
  }

  if (!isCadDrawingRef(url, fileNameHint)) {
    errorMsg.textContent = copy.badType
    setPanel(idle, error, 'error')
    return
  }

  // Let cad-simple-viewer own the busy indicator — do not stack a second loading overlay.
  setPanel(idle, error, 'none')
  if (!(await ensureReady())) return

  try {
    const ok = await openDrawingFromUrl(url, openOptions, fileNameHint || undefined)
    if (!ok) {
      errorMsg.textContent = copy.openFailed
      setPanel(idle, error, 'error')
      return
    }
    setPanel(idle, error, 'none')
  } catch (err) {
    showOpenError(err)
  }
}

void main()
