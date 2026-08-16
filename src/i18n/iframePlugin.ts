/** Shared shape for iframe embed plugin docs page. */

/** One query-parameter row in the iframe plugin docs table. */
export interface IframePluginParam {
  /** Parameter name as used in the embed URL. */
  name: string
  /** Default value shown in the table. */
  defaultValue: string
  /** Localized description of the parameter. */
  desc: string
}

/** Localized copy for the iframe plugin docs page (string fields are translation values). */
export interface IframePluginCopy {
  metaTitle: string
  metaDescription: string
  metaKeywords: string
  eyebrow: string
  title: string
  lead: string
  exampleTitle: string
  exampleLead: string
  playgroundTitle: string
  playgroundUrl: string
  playgroundUrlPlaceholder: string
  playgroundMode: string
  playgroundView: string
  playgroundLang: string
  playgroundTheme: string
  playgroundToolbar: string
  playgroundCommandLine: string
  playgroundOpen: string
  playgroundPreview: string
  playgroundSnippet: string
  playgroundPreviewLabel: string
  playgroundUrlRequired: string
  paramsTitle: string
  paramsLead: string
  /** Query-parameter table rows. */
  params: IframePluginParam[]
  modesTitle: string
  modesLead: string
  /** Open-mode rows for the modes table. */
  modes: { name: string; desc: string }[]
  notesTitle: string
  notes: string[]
  compareTitle: string
  compareLead: string
  compareDemoCta: string
  compareDemoHref: string
  relatedTitle: string
  /** Related-product links shown at the bottom of the page. */
  related: { name: string; desc: string; href: string }[]
}

const COMPARE_DEMO_HREF =
  '/embed.html?url=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fmlightcad%2Fcad-data%40main%2Fdata%2Fcanteen.dwg&mode=review&toolbar=1&view=extents'

const PARAM_DEFAULTS = {
  url: '—',
  filename: '—',
  mode: 'review',
  view: 'extents',
  lang: 'en',
  toolbar: '0',
  commandline: '0',
  theme: 'dark',
} as const

/**
 * Build the related-links list with shared destinations.
 *
 * @param live - Live demo label and description.
 * @param docs - API docs label and description.
 * @param github - GitHub label and description.
 * @returns Related links with fixed hrefs.
 */
function related(
  live: { name: string; desc: string },
  docs: { name: string; desc: string },
  github: { name: string; desc: string },
): IframePluginCopy['related'] {
  return [
    { ...live, href: 'https://mlightcad.github.io/cad-viewer/' },
    { ...docs, href: 'https://cad-viewer.readthedocs.io/en/latest/' },
    { ...github, href: 'https://github.com/mlightcad/cad-viewer' },
  ]
}

/**
 * Pair each known embed parameter with a localized description.
 *
 * @param descs - Description text keyed by parameter name.
 * @returns Rows for the query-parameter table.
 */
function params(descs: Record<keyof typeof PARAM_DEFAULTS, string>): IframePluginParam[] {
  return (Object.keys(PARAM_DEFAULTS) as (keyof typeof PARAM_DEFAULTS)[]).map((name) => ({
    name,
    defaultValue: PARAM_DEFAULTS[name],
    desc: descs[name],
  }))
}

export const iframePluginEn: IframePluginCopy = {
  metaTitle: 'iframe Plugin — Embed DWG/DXF on Your Site | MLightCAD',
  metaDescription:
    'Embed MLightCAD’s browser DWG/DXF viewer with an iframe. Control language, toolbar, command line, and review/write open mode via query parameters.',
  metaKeywords:
    'iframe CAD viewer, embed DWG, embed DXF, ShareCAD alternative, browser CAD embed, MLightCAD',
  eyebrow: 'Integration',
  title: 'iframe Plugin',
  lead: 'Add DWG/DXF viewing to any website with a single iframe — no registration, no backend. Files stay on your host; the viewer runs entirely in the browser.',
  exampleTitle: 'Drop-in embed',
  exampleLead:
    'Use the controls below to build an embed URL, preview the iframe snippet, then open it. The drawing URL must be publicly reachable (CORS allowed for this origin).',
  playgroundTitle: 'Try it',
  playgroundUrl: 'Drawing URL',
  playgroundUrlPlaceholder: 'https://example.com/drawing.dwg',
  playgroundMode: 'mode',
  playgroundView: 'view',
  playgroundLang: 'lang',
  playgroundTheme: 'theme',
  playgroundToolbar: 'Show toolbar',
  playgroundCommandLine: 'Show command line',
  playgroundOpen: 'Open embed',
  playgroundPreview: 'Refresh preview',
  playgroundSnippet: 'Generated iframe',
  playgroundPreviewLabel: 'Live embed preview',
  playgroundUrlRequired: 'Enter a .dwg or .dxf URL first.',
  paramsTitle: 'Query parameters',
  paramsLead: 'Append these to https://mlightcad.com/embed.html',
  params: params({
    url: 'Required to auto-open from the network. Absolute HTTPS URL of a drawing. Path need not end in .dwg/.dxf if filename is set.',
    filename: 'Optional. Drawing name with .dwg or .dxf when the url path has no extension (Google Drive media URLs). Alias: name.',
    mode: 'Open mode: review (measure/annotate, no edit), read, or write.',
    view: 'Initial view: extents (zoom to fit) or saved (file default VPORT). Aliases: openView, viewport.',
    lang: 'Viewer UI locale: en, zh, tr, or cs.',
    toolbar: '1 / true / yes to show the toolbar.',
    commandline: '1 / true / yes to show the command line (aliases: commandLine, cli).',
    theme: 'UI theme: dark or light.',
  }),
  modesTitle: 'Open modes',
  modesLead: 'Defaults to review so embeds are safe for sharing without accidental edits.',
  modes: [
    {
      name: 'review',
      desc: 'View, measure, and annotate. Cannot modify the drawing or create new entities.',
    },
    {
      name: 'read',
      desc: 'View only — no review tools that alter review overlays beyond read access.',
    },
    {
      name: 'write',
      desc: 'Full edit access (create and modify entities). Alias: edit.',
    },
  ],
  notesTitle: 'Requirements',
  notes: [
    'Supported formats: .dwg and .dxf.',
    'The file URL must be reachable from the visitor’s browser. If the file is on another origin, that host must send CORS headers allowing this site.',
    'Private or authenticated files (Google Drive, etc.) should be fetched by the host page and opened with postMessage: { type: "mlightcad-embed:open", filename, buffer } after the embed posts { type: "mlightcad-embed:ready" }.',
    'Archives (zip/rar) are not fetched by this plugin — point url at the drawing file itself.',
    'For a full product UI, use the live cad-viewer demo instead of this minimal embed.',
  ],
  compareTitle: 'Embed vs full demo',
  compareLead:
    'The iframe target is intentionally minimal: open a remote file and optionally show chrome. The full demo ships richer menus and workflows.',
  compareDemoCta: 'Try embed with sample DWG',
  compareDemoHref: COMPARE_DEMO_HREF,
  relatedTitle: 'Related',
  related: related(
    { name: 'Live Demo', desc: 'Full-featured browser CAD' },
    { name: 'API Docs', desc: 'cad-viewer on Read the Docs' },
    { name: 'GitHub', desc: 'mlightcad/cad-viewer' },
  ),
}

export const iframePluginZh: IframePluginCopy = {
  metaTitle: 'iframe 插件 — 在网站中嵌入 DWG/DXF | MLightCAD',
  metaDescription:
    '通过 iframe 嵌入 MLightCAD 浏览器端 DWG/DXF 查看器。可用查询参数控制语言、工具栏、命令行以及 review/write 打开模式。',
  metaKeywords: 'iframe CAD 查看器, 嵌入 DWG, 嵌入 DXF, 浏览器 CAD 嵌入, MLightCAD',
  eyebrow: '集成',
  title: 'iframe 插件',
  lead: '只需一个 iframe，即可在任意网站中查看 DWG/DXF — 无需注册、无需后端。文件仍存放在你的服务器上，查看器完全在浏览器内运行。',
  exampleTitle: '嵌入示例',
  exampleLead:
    '用下方控件填写图纸 URL、调整查询参数，预览生成的 iframe 代码，再打开嵌入页试用。图纸地址须可公开访问（若跨域，需允许本站 CORS）。',
  playgroundTitle: '在线试用',
  playgroundUrl: '图纸 URL',
  playgroundUrlPlaceholder: 'https://example.com/drawing.dwg',
  playgroundMode: 'mode',
  playgroundView: 'view',
  playgroundLang: 'lang',
  playgroundTheme: 'theme',
  playgroundToolbar: '显示工具栏',
  playgroundCommandLine: '显示命令行',
  playgroundOpen: '打开嵌入页',
  playgroundPreview: '刷新预览',
  playgroundSnippet: '生成的 iframe',
  playgroundPreviewLabel: '嵌入效果预览',
  playgroundUrlRequired: '请先填写 .dwg 或 .dxf 的 URL。',
  paramsTitle: '查询参数',
  paramsLead: '附加到 https://mlightcad.com/embed.html',
  params: params({
    url: '从网络自动打开时必填。图纸的绝对 HTTPS 地址。若设置了 filename，url 路径不必以 .dwg/.dxf 结尾。',
    filename: '可选。当 url 路径没有扩展名时提供带 .dwg 或 .dxf 的文件名（例如 Google Drive media URL）。别名：name。',
    mode: '打开模式：review（可测量/批注，不可改图）、read 或 write。',
    view: '初始视图：extents（缩放到全图范围）或 saved（使用文件中保存的默认视口）。别名：openView、viewport。',
    lang: '查看器界面语言：en、zh、tr 或 cs。',
    toolbar: '设为 1 / true / yes 显示工具栏。',
    commandline: '设为 1 / true / yes 显示命令行（别名：commandLine、cli）。',
    theme: '界面主题：dark 或 light。',
  }),
  modesTitle: '打开模式',
  modesLead: '默认 review，便于安全分享，避免误改图纸。',
  modes: [
    { name: 'review', desc: '可查看、测量与批注；不能修改图纸或创建新图元。' },
    { name: 'read', desc: '只读查看。' },
    { name: 'write', desc: '完整编辑（可创建与修改图元）。别名：edit。' },
  ],
  notesTitle: '使用要求',
  notes: [
    '支持格式：.dwg 与 .dxf。',
    '文件 URL 须能被访问者浏览器直接拉取。若文件在其他域名，该站点需配置 CORS 允许本站访问。',
    '私有或需登录的文件（如 Google Drive）应由宿主页面下载后，通过 postMessage 打开：embed 发出 { type: "mlightcad-embed:ready" } 后，发送 { type: "mlightcad-embed:open", filename, buffer }。',
    '本插件不会解压 zip/rar，请让 url 直接指向图纸文件。',
    '若需要完整产品界面，请使用完整版 cad-viewer 演示，而非此精简嵌入页。',
  ],
  compareTitle: '嵌入页与完整演示',
  compareLead:
    'iframe 目标页刻意保持精简：打开远程文件，并按需显示工具栏/命令行。完整演示提供更丰富的菜单与工作流。',
  compareDemoCta: '用样例 DWG 试用嵌入页',
  compareDemoHref: COMPARE_DEMO_HREF,
  relatedTitle: '相关链接',
  related: related(
    { name: '在线演示', desc: '功能完整的浏览器 CAD' },
    { name: 'API 文档', desc: 'Read the Docs 上的 cad-viewer' },
    { name: 'GitHub', desc: 'mlightcad/cad-viewer' },
  ),
}

export const iframePluginJa: IframePluginCopy = {
  metaTitle: 'iframe プラグイン — サイトに DWG/DXF を埋め込む | MLightCAD',
  metaDescription:
    'iframe で MLightCAD のブラウザ DWG/DXF ビューアを埋め込みます。言語、ツールバー、コマンドライン、review/write モードをクエリで制御できます。',
  metaKeywords: 'iframe CAD ビューア, DWG 埋め込み, DXF 埋め込み, ブラウザ CAD, MLightCAD',
  eyebrow: '統合',
  title: 'iframe プラグイン',
  lead: '登録もバックエンドも不要。iframe 一つで任意のサイトに DWG/DXF 表示を追加できます。ファイルは自ホストに置き、ビューアはブラウザ内だけで動作します。',
  exampleTitle: '埋め込み例',
  exampleLead:
    '下のコントロールで図面 URL とクエリを組み立て、iframe コードを確認してから開けます。図面 URL は公開アクセス可能である必要があります（このオリジン向けの CORS が必要）。',
  playgroundTitle: '試してみる',
  playgroundUrl: '図面 URL',
  playgroundUrlPlaceholder: 'https://example.com/drawing.dwg',
  playgroundMode: 'mode',
  playgroundView: 'view',
  playgroundLang: 'lang',
  playgroundTheme: 'theme',
  playgroundToolbar: 'ツールバーを表示',
  playgroundCommandLine: 'コマンドラインを表示',
  playgroundOpen: '埋め込みを開く',
  playgroundPreview: 'プレビューを更新',
  playgroundSnippet: '生成された iframe',
  playgroundPreviewLabel: '埋め込みプレビュー',
  playgroundUrlRequired: '先に .dwg または .dxf の URL を入力してください。',
  paramsTitle: 'クエリパラメータ',
  paramsLead: 'https://mlightcad.com/embed.html に追加します',
  params: params({
    url: 'ネットワークから自動オープンする場合は必須。図面の絶対 HTTPS URL。filename があればパス末尾は .dwg/.dxf でなくてよい。',
    filename: '任意。url パスに拡張子がない場合の .dwg / .dxf ファイル名（Google Drive media URL など）。別名: name。',
    mode: 'オープンモード: review（計測/注釈、編集不可）、read、write。',
    view: '初期表示: extents（全体表示）または saved（ファイルの既定 VPORT）。別名: openView、viewport。',
    lang: 'ビューア UI 言語: en、zh、tr、cs。',
    toolbar: '1 / true / yes でツールバー表示。',
    commandline: '1 / true / yes でコマンドライン表示（別名: commandLine、cli）。',
    theme: 'UI テーマ: dark または light。',
  }),
  modesTitle: 'オープンモード',
  modesLead: '誤編集を防ぐため、既定は review です。',
  modes: [
    { name: 'review', desc: '表示・計測・注釈が可能。図面の変更や新規図形の作成は不可。' },
    { name: 'read', desc: '表示のみ。' },
    { name: 'write', desc: '完全編集（図形の作成・変更可）。別名: edit。' },
  ],
  notesTitle: '要件',
  notes: [
    '対応形式: .dwg と .dxf。',
    'ファイル URL は訪問者のブラウザから到達できる必要があります。別オリジンの場合、このサイト向け CORS が必要です。',
    '非公開・認証付きファイル（Google Drive など）は親ページで取得し、embed が { type: "mlightcad-embed:ready" } を送ったあと { type: "mlightcad-embed:open", filename, buffer } で postMessage してください。',
    'zip/rar は取得しません。url は図面ファイルそのものを指してください。',
    'フル UI が必要な場合は、この最小埋め込みではなく live cad-viewer デモを使用してください。',
  ],
  compareTitle: '埋め込みとフルデモ',
  compareLead:
    'iframe 先は意図的に最小構成です。リモートファイルを開き、必要に応じて UI を表示します。フルデモはより豊富なメニューとワークフローを提供します。',
  compareDemoCta: 'サンプル DWG で埋め込みを試す',
  compareDemoHref: COMPARE_DEMO_HREF,
  relatedTitle: '関連',
  related: related(
    { name: 'ライブデモ', desc: 'フル機能のブラウザ CAD' },
    { name: 'API ドキュメント', desc: 'Read the Docs の cad-viewer' },
    { name: 'GitHub', desc: 'mlightcad/cad-viewer' },
  ),
}

export const iframePluginKo: IframePluginCopy = {
  metaTitle: 'iframe 플러그인 — 사이트에 DWG/DXF 임베드 | MLightCAD',
  metaDescription:
    'iframe으로 MLightCAD 브라우저 DWG/DXF 뷰어를 임베드합니다. 언어, 툴바, 명령줄, review/write 모드를 쿼리로 제어할 수 있습니다.',
  metaKeywords: 'iframe CAD 뷰어, DWG 임베드, DXF 임베드, 브라우저 CAD, MLightCAD',
  eyebrow: '통합',
  title: 'iframe 플러그인',
  lead: '등록과 백엔드 없이 iframe 하나로 어떤 사이트에도 DWG/DXF 보기를 추가할 수 있습니다. 파일은 호스트에 두고, 뷰어는 브라우저에서만 실행됩니다.',
  exampleTitle: '임베드 예제',
  exampleLead:
    '아래 컨트롤로 도면 URL과 쿼리를 구성하고 iframe 코드를 확인한 뒤 엽니다. 도면 URL은 공개 접근 가능해야 하며(이 오리진에 대한 CORS 필요).',
  playgroundTitle: '직접 사용해 보기',
  playgroundUrl: '도면 URL',
  playgroundUrlPlaceholder: 'https://example.com/drawing.dwg',
  playgroundMode: 'mode',
  playgroundView: 'view',
  playgroundLang: 'lang',
  playgroundTheme: 'theme',
  playgroundToolbar: '툴바 표시',
  playgroundCommandLine: '명령줄 표시',
  playgroundOpen: '임베드 열기',
  playgroundPreview: '미리보기 새로고침',
  playgroundSnippet: '생성된 iframe',
  playgroundPreviewLabel: '임베드 미리보기',
  playgroundUrlRequired: '먼저 .dwg 또는 .dxf URL을 입력하세요.',
  paramsTitle: '쿼리 파라미터',
  paramsLead: 'https://mlightcad.com/embed.html 에 추가',
  params: params({
    url: '네트워크에서 자동 열 때 필수. 도면의 절대 HTTPS URL. filename이 있으면 경로가 .dwg/.dxf로 끝나지 않아도 됩니다.',
    filename: '선택. url 경로에 확장자가 없을 때 .dwg 또는 .dxf 파일 이름(Google Drive media URL 등). 별칭: name.',
    mode: '열기 모드: review(측정/주석, 편집 불가), read, write.',
    view: '초기 뷰: extents(전체 맞춤) 또는 saved(파일 기본 VPORT). 별칭: openView, viewport.',
    lang: '뷰어 UI 언어: en, zh, tr, cs.',
    toolbar: '1 / true / yes 로 툴바 표시.',
    commandline: '1 / true / yes 로 명령줄 표시(별칭: commandLine, cli).',
    theme: 'UI 테마: dark 또는 light.',
  }),
  modesTitle: '열기 모드',
  modesLead: '실수 편집을 막기 위해 기본값은 review입니다.',
  modes: [
    { name: 'review', desc: '보기·측정·주석 가능. 도면 수정이나 새 엔티티 생성은 불가.' },
    { name: 'read', desc: '보기만 가능.' },
    { name: 'write', desc: '전체 편집(생성·수정 가능). 별칭: edit.' },
  ],
  notesTitle: '요구 사항',
  notes: [
    '지원 형식: .dwg, .dxf.',
    '파일 URL은 방문자의 브라우저에서 접근 가능해야 합니다. 다른 오리진이면 이 사이트에 대한 CORS가 필요합니다.',
    '비공개/인증 파일(Google Drive 등)은 호스트 페이지에서 받은 뒤, embed가 { type: "mlightcad-embed:ready" }를 보낸 다음 { type: "mlightcad-embed:open", filename, buffer }로 postMessage하세요.',
    'zip/rar는 가져오지 않습니다. url은 도면 파일 자체를 가리켜야 합니다.',
    '전체 UI가 필요하면 이 최소 임베드 대신 live cad-viewer 데모를 사용하세요.',
  ],
  compareTitle: '임베드 vs 전체 데모',
  compareLead:
    'iframe 대상은 의도적으로 최소 구성입니다. 원격 파일을 열고 필요 시 UI를 표시합니다. 전체 데모는 더 풍부한 메뉴와 워크플로를 제공합니다.',
  compareDemoCta: '샘플 DWG로 임베드 체험',
  compareDemoHref: COMPARE_DEMO_HREF,
  relatedTitle: '관련',
  related: related(
    { name: '라이브 데모', desc: '전체 기능 브라우저 CAD' },
    { name: 'API 문서', desc: 'Read the Docs의 cad-viewer' },
    { name: 'GitHub', desc: 'mlightcad/cad-viewer' },
  ),
}

export const iframePluginEs: IframePluginCopy = {
  metaTitle: 'Plugin iframe — Incruste DWG/DXF en su sitio | MLightCAD',
  metaDescription:
    'Incruste el visor DWG/DXF de MLightCAD con un iframe. Controle idioma, barra de herramientas, línea de comandos y modo review/write con parámetros de consulta.',
  metaKeywords: 'visor CAD iframe, incrustar DWG, incrustar DXF, CAD en el navegador, MLightCAD',
  eyebrow: 'Integración',
  title: 'Plugin iframe',
  lead: 'Añada visualización DWG/DXF a cualquier sitio con un solo iframe — sin registro ni backend. Los archivos permanecen en su host; el visor se ejecuta por completo en el navegador.',
  exampleTitle: 'Incrustación lista para usar',
  exampleLead:
    'Use los controles para construir la URL, previsualizar el iframe y abrirlo. La URL del dibujo debe ser pública (CORS permitido para este origen).',
  playgroundTitle: 'Probar',
  playgroundUrl: 'URL del dibujo',
  playgroundUrlPlaceholder: 'https://example.com/drawing.dwg',
  playgroundMode: 'mode',
  playgroundView: 'view',
  playgroundLang: 'lang',
  playgroundTheme: 'theme',
  playgroundToolbar: 'Mostrar barra de herramientas',
  playgroundCommandLine: 'Mostrar línea de comandos',
  playgroundOpen: 'Abrir incrustación',
  playgroundPreview: 'Actualizar vista previa',
  playgroundSnippet: 'iframe generado',
  playgroundPreviewLabel: 'Vista previa de la incrustación',
  playgroundUrlRequired: 'Introduzca primero una URL .dwg o .dxf.',
  paramsTitle: 'Parámetros de consulta',
  paramsLead: 'Añádalos a https://mlightcad.com/embed.html',
  params: params({
    url: 'Obligatorio para abrir desde la red. URL HTTPS absoluta del dibujo. Si hay filename, la ruta no tiene que terminar en .dwg/.dxf.',
    filename: 'Opcional. Nombre .dwg o .dxf cuando la ruta de url no tiene extensión (p. ej. URLs media de Google Drive). Alias: name.',
    mode: 'Modo de apertura: review (medir/anotar, sin editar), read o write.',
    view: 'Vista inicial: extents (ajustar) o saved (VPORT por defecto del archivo). Alias: openView, viewport.',
    lang: 'Idioma de la UI del visor: en, zh, tr o cs.',
    toolbar: '1 / true / yes para mostrar la barra de herramientas.',
    commandline: '1 / true / yes para mostrar la línea de comandos (alias: commandLine, cli).',
    theme: 'Tema de UI: dark o light.',
  }),
  modesTitle: 'Modos de apertura',
  modesLead: 'El valor por defecto es review para compartir sin ediciones accidentales.',
  modes: [
    {
      name: 'review',
      desc: 'Ver, medir y anotar. No se puede modificar el dibujo ni crear entidades nuevas.',
    },
    { name: 'read', desc: 'Solo visualización.' },
    { name: 'write', desc: 'Edición completa (crear y modificar). Alias: edit.' },
  ],
  notesTitle: 'Requisitos',
  notes: [
    'Formatos admitidos: .dwg y .dxf.',
    'La URL del archivo debe ser accesible desde el navegador del visitante. Si está en otro origen, ese host debe permitir CORS a este sitio.',
    'Archivos privados o autenticados (Google Drive, etc.) debe obtenerlos la página anfitriona y abrirlos con postMessage: { type: "mlightcad-embed:open", filename, buffer } tras { type: "mlightcad-embed:ready" }.',
    'No se descargan zip/rar: url debe apuntar al archivo del dibujo.',
    'Para una UI completa, use la demo de cad-viewer en lugar de este incrustado mínimo.',
  ],
  compareTitle: 'Incrustación vs demo completa',
  compareLead:
    'El destino del iframe es deliberadamente mínimo: abre un archivo remoto y opcionalmente muestra la UI. La demo completa ofrece menús y flujos más ricos.',
  compareDemoCta: 'Probar incrustación con DWG de ejemplo',
  compareDemoHref: COMPARE_DEMO_HREF,
  relatedTitle: 'Relacionado',
  related: related(
    { name: 'Demo en vivo', desc: 'CAD completo en el navegador' },
    { name: 'Docs API', desc: 'cad-viewer en Read the Docs' },
    { name: 'GitHub', desc: 'mlightcad/cad-viewer' },
  ),
}

export const iframePluginPt: IframePluginCopy = {
  metaTitle: 'Plugin iframe — Incorporar DWG/DXF no seu site | MLightCAD',
  metaDescription:
    'Incorpore o visualizador DWG/DXF do MLightCAD com um iframe. Controle idioma, barra de ferramentas, linha de comando e modo review/write via parâmetros de consulta.',
  metaKeywords: 'visualizador CAD iframe, incorporar DWG, incorporar DXF, CAD no navegador, MLightCAD',
  eyebrow: 'Integração',
  title: 'Plugin iframe',
  lead: 'Adicione visualização DWG/DXF a qualquer site com um único iframe — sem registro e sem backend. Os arquivos ficam no seu host; o visualizador roda inteiramente no navegador.',
  exampleTitle: 'Incorporação pronta',
  exampleLead:
    'Use os controles para montar a URL, pré-visualizar o iframe e abrir. A URL do desenho deve ser pública (CORS permitido para esta origem).',
  playgroundTitle: 'Experimentar',
  playgroundUrl: 'URL do desenho',
  playgroundUrlPlaceholder: 'https://example.com/drawing.dwg',
  playgroundMode: 'mode',
  playgroundView: 'view',
  playgroundLang: 'lang',
  playgroundTheme: 'theme',
  playgroundToolbar: 'Mostrar barra de ferramentas',
  playgroundCommandLine: 'Mostrar linha de comando',
  playgroundOpen: 'Abrir incorporação',
  playgroundPreview: 'Atualizar pré-visualização',
  playgroundSnippet: 'iframe gerado',
  playgroundPreviewLabel: 'Pré-visualização da incorporação',
  playgroundUrlRequired: 'Informe primeiro uma URL .dwg ou .dxf.',
  paramsTitle: 'Parâmetros de consulta',
  paramsLead: 'Acrescente a https://mlightcad.com/embed.html',
  params: params({
    url: 'Obrigatório para abrir pela rede. URL HTTPS absoluta do desenho. Com filename, o caminho não precisa terminar em .dwg/.dxf.',
    filename: 'Opcional. Nome .dwg ou .dxf quando o caminho de url não tem extensão (ex.: URLs media do Google Drive). Alias: name.',
    mode: 'Modo de abertura: review (medir/anotar, sem editar), read ou write.',
    view: 'Vista inicial: extents (ajustar) ou saved (VPORT padrão do arquivo). Aliases: openView, viewport.',
    lang: 'Idioma da UI do visualizador: en, zh, tr ou cs.',
    toolbar: '1 / true / yes para mostrar a barra de ferramentas.',
    commandline: '1 / true / yes para mostrar a linha de comando (aliases: commandLine, cli).',
    theme: 'Tema da UI: dark ou light.',
  }),
  modesTitle: 'Modos de abertura',
  modesLead: 'O padrão é review para compartilhar sem edições acidentais.',
  modes: [
    {
      name: 'review',
      desc: 'Ver, medir e anotar. Não é possível modificar o desenho nem criar novas entidades.',
    },
    { name: 'read', desc: 'Somente visualização.' },
    { name: 'write', desc: 'Edição completa (criar e modificar). Alias: edit.' },
  ],
  notesTitle: 'Requisitos',
  notes: [
    'Formatos suportados: .dwg e .dxf.',
    'A URL do arquivo deve ser acessível pelo navegador do visitante. Se estiver em outra origem, esse host precisa permitir CORS para este site.',
    'Arquivos privados ou autenticados (Google Drive etc.) devem ser baixados pela página hospedeira e abertos com postMessage: { type: "mlightcad-embed:open", filename, buffer } após { type: "mlightcad-embed:ready" }.',
    'zip/rar não são baixados — aponte url para o arquivo do desenho.',
    'Para uma UI completa, use a demo do cad-viewer em vez deste embed mínimo.',
  ],
  compareTitle: 'Incorporação vs demo completa',
  compareLead:
    'O destino do iframe é intencionalmente mínimo: abre um arquivo remoto e opcionalmente mostra a UI. A demo completa oferece menus e fluxos mais ricos.',
  compareDemoCta: 'Experimentar incorporação com DWG de exemplo',
  compareDemoHref: COMPARE_DEMO_HREF,
  relatedTitle: 'Relacionado',
  related: related(
    { name: 'Demo ao vivo', desc: 'CAD completo no navegador' },
    { name: 'Docs da API', desc: 'cad-viewer no Read the Docs' },
    { name: 'GitHub', desc: 'mlightcad/cad-viewer' },
  ),
}

export const iframePluginRu: IframePluginCopy = {
  metaTitle: 'iframe-плагин — встраивание DWG/DXF на сайт | MLightCAD',
  metaDescription:
    'Встраивайте браузерный DWG/DXF-просмотрщик MLightCAD через iframe. Язык, панель инструментов, командная строка и режим review/write задаются query-параметрами.',
  metaKeywords: 'iframe CAD просмотрщик, встроить DWG, встроить DXF, CAD в браузере, MLightCAD',
  eyebrow: 'Интеграция',
  title: 'iframe-плагин',
  lead: 'Добавьте просмотр DWG/DXF на любой сайт одним iframe — без регистрации и без backend. Файлы остаются на вашем хосте; просмотрщик работает целиком в браузере.',
  exampleTitle: 'Готовое встраивание',
  exampleLead:
    'Соберите URL с параметрами ниже, посмотрите фрагмент iframe и откройте его. URL чертежа должен быть публично доступен (нужен CORS для этого origin).',
  playgroundTitle: 'Попробовать',
  playgroundUrl: 'URL чертежа',
  playgroundUrlPlaceholder: 'https://example.com/drawing.dwg',
  playgroundMode: 'mode',
  playgroundView: 'view',
  playgroundLang: 'lang',
  playgroundTheme: 'theme',
  playgroundToolbar: 'Показать панель инструментов',
  playgroundCommandLine: 'Показать командную строку',
  playgroundOpen: 'Открыть встраивание',
  playgroundPreview: 'Обновить превью',
  playgroundSnippet: 'Сгенерированный iframe',
  playgroundPreviewLabel: 'Превью встраивания',
  playgroundUrlRequired: 'Сначала укажите URL .dwg или .dxf.',
  paramsTitle: 'Параметры запроса',
  paramsLead: 'Добавьте к https://mlightcad.com/embed.html',
  params: params({
    url: 'Обязателен для открытия по сети. Абсолютный HTTPS URL чертежа. Если задан filename, путь не обязан оканчиваться на .dwg/.dxf.',
    filename: 'Необязательно. Имя .dwg или .dxf, если в пути url нет расширения (например media URL Google Drive). Псевдоним: name.',
    mode: 'Режим открытия: review (измерение/аннотации, без правки), read или write.',
    view: 'Начальный вид: extents (вписать) или saved (сохранённый VPORT). Псевдонимы: openView, viewport.',
    lang: 'Язык UI просмотрщика: en, zh, tr или cs.',
    toolbar: '1 / true / yes — показать панель инструментов.',
    commandline: '1 / true / yes — показать командную строку (псевдонимы: commandLine, cli).',
    theme: 'Тема UI: dark или light.',
  }),
  modesTitle: 'Режимы открытия',
  modesLead: 'По умолчанию review — безопасно делиться без случайных правок.',
  modes: [
    {
      name: 'review',
      desc: 'Просмотр, измерение и аннотации. Нельзя менять чертёж и создавать новые объекты.',
    },
    { name: 'read', desc: 'Только просмотр.' },
    { name: 'write', desc: 'Полное редактирование (создание и изменение). Псевдоним: edit.' },
  ],
  notesTitle: 'Требования',
  notes: [
    'Поддерживаемые форматы: .dwg и .dxf.',
    'URL файла должен быть доступен из браузера посетителя. Если файл на другом origin, хост должен отдавать CORS для этого сайта.',
    'Закрытые или требующие входа файлы (Google Drive и т. п.) должна загрузить страница-хост и открыть через postMessage: { type: "mlightcad-embed:open", filename, buffer } после { type: "mlightcad-embed:ready" }.',
    'zip/rar не загружаются — url должен указывать на сам файл чертежа.',
    'Для полного UI используйте live-демо cad-viewer, а не этот минимальный embed.',
  ],
  compareTitle: 'Встраивание и полное демо',
  compareLead:
    'Цель iframe намеренно минимальна: открыть удалённый файл и при необходимости показать UI. Полное демо даёт более богатые меню и сценарии.',
  compareDemoCta: 'Попробовать embed с образцом DWG',
  compareDemoHref: COMPARE_DEMO_HREF,
  relatedTitle: 'Связанное',
  related: related(
    { name: 'Живое демо', desc: 'Полнофункциональный CAD в браузере' },
    { name: 'API Docs', desc: 'cad-viewer на Read the Docs' },
    { name: 'GitHub', desc: 'mlightcad/cad-viewer' },
  ),
}

export const iframePluginCs: IframePluginCopy = {
  metaTitle: 'iframe plugin — vložení DWG/DXF na web | MLightCAD',
  metaDescription:
    'Vložte prohlížeč DWG/DXF od MLightCAD přes iframe. Jazyk, panel nástrojů, příkazový řádek a režim review/write ovládáte query parametry.',
  metaKeywords: 'iframe CAD prohlížeč, vložit DWG, vložit DXF, CAD v prohlížeči, MLightCAD',
  eyebrow: 'Integrace',
  title: 'iframe plugin',
  lead: 'Přidejte prohlížení DWG/DXF na jakýkoli web jedním iframe — bez registrace a bez backendu. Soubory zůstávají na vašem hostiteli; prohlížeč běží celý v prohlížeči.',
  exampleTitle: 'Hotové vložení',
  exampleLead:
    'Pomocí ovládacích prvků sestavte URL, zobrazte náhled iframe a otevřete ho. URL výkresu musí být veřejně dostupná (CORS pro tento origin).',
  playgroundTitle: 'Vyzkoušet',
  playgroundUrl: 'URL výkresu',
  playgroundUrlPlaceholder: 'https://example.com/drawing.dwg',
  playgroundMode: 'mode',
  playgroundView: 'view',
  playgroundLang: 'lang',
  playgroundTheme: 'theme',
  playgroundToolbar: 'Zobrazit panel nástrojů',
  playgroundCommandLine: 'Zobrazit příkazový řádek',
  playgroundOpen: 'Otevřít vložení',
  playgroundPreview: 'Obnovit náhled',
  playgroundSnippet: 'Vygenerovaný iframe',
  playgroundPreviewLabel: 'Náhled vložení',
  playgroundUrlRequired: 'Nejdříve zadejte URL .dwg nebo .dxf.',
  paramsTitle: 'Query parametry',
  paramsLead: 'Přidejte k https://mlightcad.com/embed.html',
  params: params({
    url: 'Povinné pro otevření ze sítě. Absolutní HTTPS URL výkresu. Pokud je filename, cesta nemusí končit na .dwg/.dxf.',
    filename: 'Volitelné. Název .dwg nebo .dxf, když cesta url nemá příponu (např. Google Drive media URL). Alias: name.',
    mode: 'Režim otevření: review (měření/anotace, bez úprav), read nebo write.',
    view: 'Počáteční pohled: extents (přizpůsobit) nebo saved (výchozí VPORT souboru). Alias: openView, viewport.',
    lang: 'Jazyk UI prohlížeče: en, zh, tr nebo cs.',
    toolbar: '1 / true / yes zobrazí panel nástrojů.',
    commandline: '1 / true / yes zobrazí příkazový řádek (alias: commandLine, cli).',
    theme: 'Motiv UI: dark nebo light.',
  }),
  modesTitle: 'Režimy otevření',
  modesLead: 'Výchozí je review, aby šlo bezpečně sdílet bez nechtěných úprav.',
  modes: [
    {
      name: 'review',
      desc: 'Prohlížení, měření a anotace. Nelze měnit výkres ani vytvářet nové entity.',
    },
    { name: 'read', desc: 'Pouze prohlížení.' },
    { name: 'write', desc: 'Plná editace (vytváření a úpravy). Alias: edit.' },
  ],
  notesTitle: 'Požadavky',
  notes: [
    'Podporované formáty: .dwg a .dxf.',
    'URL souboru musí být dostupná z prohlížeče návštěvníka. Pokud je na jiném originu, hostitel musí povolit CORS pro tento web.',
    'Soukromé nebo autentizované soubory (Google Drive aj.) stáhne hostitelská stránka a otevře přes postMessage: { type: "mlightcad-embed:open", filename, buffer } po { type: "mlightcad-embed:ready" }.',
    'zip/rar se nenačítají — url musí ukazovat přímo na soubor výkresu.',
    'Pro plné UI použijte live demo cad-viewer místo tohoto minimálního embedu.',
  ],
  compareTitle: 'Vložení vs plné demo',
  compareLead:
    'Cíl iframe je záměrně minimální: otevře vzdálený soubor a volitelně zobrazí UI. Plné demo nabízí bohatší nabídky a workflow.',
  compareDemoCta: 'Vyzkoušet vložení se vzorovým DWG',
  compareDemoHref: COMPARE_DEMO_HREF,
  relatedTitle: 'Související',
  related: related(
    { name: 'Živé demo', desc: 'Plně vybavený CAD v prohlížeči' },
    { name: 'API docs', desc: 'cad-viewer na Read the Docs' },
    { name: 'GitHub', desc: 'mlightcad/cad-viewer' },
  ),
}
