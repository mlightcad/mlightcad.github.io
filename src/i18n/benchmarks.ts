/** One row in the offline HTML memory comparison table. */
export interface BenchmarksMemoryRow {
  viewer: string
  memory: string
}

/** Localized copy for the qualitative benchmarks page. */
export interface BenchmarksCopy {
  metaTitle: string
  metaDescription: string
  metaKeywords: string
  eyebrow: string
  title: string
  lead: string
  heroImageAlt: string
  architectureTitle: string
  architectureLead: string
  pillars: { title: string; body: string }[]
  evidenceTitle: string
  evidenceLead: string
  evidenceItems: {
    title: string
    body: string
    note?: string
    tableCaption?: string
    tableHeaders?: [string, string]
    tableRows?: BenchmarksMemoryRow[]
    tableSummary?: string
  }[]
  caveat: string
  ctaTitle: string
  ctaLead: string
  primaryCta: string
  primaryHref: string
  secondaryCta: string
  secondaryHref: string
}

/** Shared canteen.dwg memory numbers published on the CAD Viewer examples page. */
function canteenMemoryRows(measureLabel: string, viewLabel: string): BenchmarksMemoryRow[] {
  return [
    { viewer: 'AutoCAD 2020', memory: '320 MB' },
    { viewer: 'GstarCAD Viewer (浩辰看图王)', memory: '246 MB' },
    { viewer: measureLabel, memory: '56 MB' },
    { viewer: viewLabel, memory: '33 MB' },
  ]
}

export const benchmarksEn: BenchmarksCopy = {
  metaTitle: 'Web CAD Performance — Architecture & Evidence | MLightCAD',
  metaDescription:
    'How MLightCAD approaches browser CAD performance: on-device parsing, workers, progressive rendering, and memory-conscious HTML export — with scoped evidence, not competitor scoreboards.',
  metaKeywords:
    'Web CAD performance, browser DWG memory, progressive CAD rendering, offline HTML CAD, MLightCAD benchmarks',
  eyebrow: 'Resources',
  title: 'Performance by architecture',
  lead: 'We do not publish unverified competitor scoreboards. We document the design choices that make browser-native CAD practical — and the one public memory result we have already shared.',
  heroImageAlt: 'Browser CAD performance architecture and memory-conscious rendering',
  architectureTitle: 'What we optimize for',
  architectureLead: 'Large drawings in a tab need a different shape than server-side conversion. These are the pillars of the MLightCAD runtime.',
  pillars: [
    {
      title: 'On-device parsing',
      body: 'DWG/DXF decoding happens in the browser. There is no upload hop before the first useful pixels, which removes network conversion latency and keeps confidential drawings local.',
    },
    {
      title: 'Workers',
      body: 'Heavy parse and prepare work can run off the main thread so pan, zoom, and UI stay interactive while a drawing is still loading.',
    },
    {
      title: 'Progressive rendering',
      body: 'Geometry streams into the WebGL scene as it becomes ready, so reviewers see structure early instead of waiting for a full silent convert.',
    },
    {
      title: 'Memory-conscious paths',
      body: 'View-mode and offline HTML paths are tuned for sharing and review — not every feature pays the cost of a full desktop CAD session.',
    },
  ],
  evidenceTitle: 'Published evidence',
  evidenceLead: 'Scoped numbers only — with the conditions spelled out.',
  evidenceItems: [
    {
      title: 'Offline HTML memory (view mode)',
      body: 'Memory consumption measured with the sample drawing canteen.dwg. Recipients open a self-contained HTML export in any modern browser — no CAD install, no server, and still get pan, zoom, layers, and distance measurement.',
      tableCaption: 'Memory on canteen.dwg',
      tableHeaders: ['Viewer', 'Memory consumption'],
      tableRows: canteenMemoryRows(
        'Self-contained HTML (measure mode)',
        'Self-contained HTML (view mode)',
      ),
      tableSummary:
        'View mode uses about 83% less memory than AutoCAD 2020 and 77% less than GstarCAD Viewer, while measure mode adds distance tools at 56 MB.',
      note: 'This compares self-contained HTML artifacts to desktop viewers on the same sample drawing. It is not a claim about every drawing, every mode, or every competing web viewer.',
    },
  ],
  caveat:
    'If you need production DWG capacity for closed-source products, evaluate the commercial DWG Engine on your own drawings — we will help with a trial rather than inventing leaderboard numbers.',
  ctaTitle: 'Measure on your files',
  ctaLead: 'Open a drawing in the browser, or apply for a DWG Engine trial with the drawings that matter to your product.',
  primaryCta: 'Try CAD Viewer',
  primaryHref: 'https://mlightcad.github.io/cad-viewer/',
  secondaryCta: 'DWG Engine trial',
  secondaryHref: 'mailto:support@mlightcad.com?subject=Trial%20License%20Application',
}

export const benchmarksZh: BenchmarksCopy = {
  ...benchmarksEn,
  metaTitle: 'Web CAD 性能 — 架构与证据 | MLightCAD',
  metaDescription:
    'MLightCAD 如何做浏览器 CAD 性能：端侧解析、Worker、渐进渲染与注重内存的 HTML 导出 — 只给有范围的证据，不做竞品排行榜。',
  eyebrow: '资源',
  title: '用架构换性能',
  lead: '我们不发布未经核实的竞品排行榜。我们说明让浏览器原生 CAD 可行的设计选择 — 以及已经公开过的那一项内存结果。',
  heroImageAlt: '浏览器 CAD 性能架构与注重内存的渲染',
  architectureTitle: '我们优化什么',
  architectureLead: '标签页里的大图需要和服务器转换不同的形态。以下是 MLightCAD 运行时的支柱。',
  pillars: [
    {
      title: '端侧解析',
      body: 'DWG/DXF 在浏览器内解码。首屏有用像素前没有上传跳转，去掉网络转换延迟，也让机密图纸留在本地。',
    },
    {
      title: 'Worker',
      body: '沉重的解析与准备可离开主线程，图纸仍在加载时平移、缩放与界面仍可交互。',
    },
    {
      title: '渐进渲染',
      body: '几何就绪即进入 WebGL 场景，审阅者尽早看到结构，而不是干等一次完整静默转换。',
    },
    {
      title: '注重内存的路径',
      body: '查看模式与离线 HTML 路径面向分享与审阅调优 — 不是每个功能都支付完整桌面 CAD 会话的成本。',
    },
  ],
  evidenceTitle: '已公开证据',
  evidenceLead: '只给出有范围的数字 — 并写清条件。',
  evidenceItems: [
    {
      title: '离线 HTML 内存（查看模式）',
      body: '以下为示例图纸 canteen.dwg 的内存占用。自包含 HTML 导出可在任何现代浏览器打开 — 无需安装 CAD、无需服务器，仍支持平移、缩放、图层与测距。',
      tableCaption: 'canteen.dwg 内存占用',
      tableHeaders: ['查看器', '内存占用'],
      tableRows: canteenMemoryRows('自包含 HTML（测距模式）', '自包含 HTML（查看模式）'),
      tableSummary:
        '查看模式相对 AutoCAD 2020 约少用 83% 内存，相对浩辰看图王约少用 77%；测距模式在 56 MB 下额外提供距离测量。',
      note: '这是自包含 HTML 产物与桌面查看器在同一示例图纸上的对比。不是对所有图纸、所有模式或所有网页 Viewer 的通称。',
    },
  ],
  caveat: '若你需要面向闭源产品的生产级 DWG 能力，请用自己的图纸评估商用 DWG Engine — 我们提供试用，而不是编造排行榜数字。',
  ctaTitle: '用你的文件衡量',
  ctaLead: '在浏览器中打开图纸，或带着对产品真正重要的图纸申请 DWG Engine 试用。',
  primaryCta: '试用 CAD Viewer',
  secondaryCta: '申请 DWG Engine 试用',
}

export const benchmarksJa: BenchmarksCopy = {
  ...benchmarksEn,
  metaTitle: 'Web CAD パフォーマンス — アーキテクチャと根拠 | MLightCAD',
  metaDescription:
    'ブラウザ CAD の性能への取り組み: 端末内解析、Worker、プログレッシブ描画、メモリを意識した HTML 出力 — 競合スコアボードではなく範囲付きの根拠。',
  eyebrow: 'リソース',
  title: 'アーキテクチャで性能を作る',
  lead: '未検証の競合スコアボードは公開しません。ブラウザネイティブ CAD を実用にする設計選択と、既に共有したメモリ結果を説明します。',
  heroImageAlt: 'ブラウザ CAD の性能アーキテクチャとメモリを意識した描画',
  architectureTitle: '最適化の柱',
  architectureLead: 'タブ内の大きな図面はサーバー変換とは形が違います。MLightCAD ランタイムの柱です。',
  pillars: [
    {
      title: '端末内解析',
      body: 'DWG/DXF はブラウザで復号。有用な最初のピクセル前にアップロードがなく、変換待ちを減らし機密図面をローカルに保てます。',
    },
    {
      title: 'Worker',
      body: '重い解析と準備をメインスレッド外で実行し、読み込み中もパン・ズーム・UI を保てます。',
    },
    {
      title: 'プログレッシブ描画',
      body: '幾何が用意でき次第 WebGL に流し、無言のフル変換を待たずに構造を早く見せます。',
    },
    {
      title: 'メモリを意識した経路',
      body: '表示モードとオフライン HTML は共有・レビュー向け — すべての機能がデスクトップ CAD 並みのコストを払うわけではありません。',
    },
  ],
  evidenceTitle: '公開している根拠',
  evidenceLead: '条件付きの数字のみ — 前提を明示します。',
  evidenceItems: [
    {
      title: 'オフライン HTML のメモリ（表示モード）',
      body: 'サンプル図面 canteen.dwg で測定したメモリ消費です。自己完結 HTML は任意のモダンブラウザで開け、CAD インストールもサーバーも不要で、パン・ズーム・レイヤー・距離計測を維持します。',
      tableCaption: 'canteen.dwg のメモリ',
      tableHeaders: ['ビューア', 'メモリ消費'],
      tableRows: canteenMemoryRows(
        '自己完結 HTML（計測モード）',
        '自己完結 HTML（表示モード）',
      ),
      tableSummary:
        '表示モードは AutoCAD 2020 より約 83%、GstarCAD Viewer より約 77% 少ないメモリ。計測モードは 56 MB で距離ツールを追加します。',
      note: '同一サンプル図面での自己完結 HTML とデスクトップビューアの比較です。あらゆる図面・モード・競合 Web ビューアへの主張ではありません。',
    },
  ],
  caveat: 'クローズドソース製品向けの本番 DWG が必要なら、自社図面で商用 DWG Engine を評価してください — リーダーボードの数字を作る代わりにトライアルを支援します。',
  ctaTitle: '自社ファイルで測る',
  ctaLead: 'ブラウザで図面を開くか、製品に重要な図面で DWG Engine トライアルを申請してください。',
  primaryCta: 'CAD Viewer を試す',
  secondaryCta: 'DWG Engine トライアル',
}

export const benchmarksKo: BenchmarksCopy = {
  ...benchmarksEn,
  metaTitle: 'Web CAD 성능 — 아키텍처와 근거 | MLightCAD',
  metaDescription:
    '브라우저 CAD 성능 접근: 온디바이스 파싱, Worker, 점진 렌더링, 메모리를 의식한 HTML보내기 — 경쟁 순위표가 아닌 범위가 있는 근거.',
  eyebrow: '리소스',
  title: '아키텍처로 만드는 성능',
  lead: '검증되지 않은 경쟁사 순위표를 게시하지 않습니다. 브라우저 네이티브 CAD를 실용적으로 만드는 설계 선택과, 이미 공개한 메모리 결과를 설명합니다.',
  heroImageAlt: '브라우저 CAD 성능 아키텍처와 메모리를 의식한 렌더링',
  architectureTitle: '무엇을 최적화하는가',
  architectureLead: '탭 안의 대형 도면은 서버 변환과 다른 형태가 필요합니다. MLightCAD 런타임의 기둥입니다.',
  pillars: [
    {
      title: '온디바이스 파싱',
      body: 'DWG/DXF는 브라우저에서 디코딩됩니다. 첫 유용 픽셀 전에 업로드 hop이 없어 변환 지연을 줄이고 기밀 도면을 로컬에 둡니다.',
    },
    {
      title: 'Worker',
      body: '무거운 파싱·준비를 메인 스레드 밖에서 실행해 로딩 중에도 팬·줌·UI가 살아 있습니다.',
    },
    {
      title: '점진 렌더링',
      body: '기하가 준비되는 대로 WebGL로 흘려, 조용한 전체 변환을 기다리지 않고 구조를 일찍 보여 줍니다.',
    },
    {
      title: '메모리를 의식한 경로',
      body: '보기 모드와 오프라인 HTML은 공유·리뷰용으로 다듬었습니다 — 모든 기능이 데스크톱 CAD 세션 비용을 치르지는 않습니다.',
    },
  ],
  evidenceTitle: '공개된 근거',
  evidenceLead: '범위가 있는 숫자만 — 조건을 분명히 적습니다.',
  evidenceItems: [
    {
      title: '오프라인 HTML 메모리(보기 모드)',
      body: '샘플 도면 canteen.dwg에서 측정한 메모리 사용량입니다. 자체 완결 HTML은 최신 브라우저에서 열리며 CAD 설치·서버 없이 팬·줌·레이어·거리 측정을 유지합니다.',
      tableCaption: 'canteen.dwg 메모리',
      tableHeaders: ['뷰어', '메모리 사용량'],
      tableRows: canteenMemoryRows(
        '자체 완결 HTML(측정 모드)',
        '자체 완결 HTML(보기 모드)',
      ),
      tableSummary:
        '보기 모드는 AutoCAD 2020보다 약 83%, GstarCAD Viewer보다 약 77% 적은 메모리를 쓰며, 측정 모드는 56 MB에서 거리 도구를 추가합니다.',
      note: '동일 샘플 도면에서 자체 완결 HTML과 데스크톱 뷰어를 비교한 것입니다. 모든 도면·모드·경쟁 웹 뷰어에 대한 주장이 아닙니다.',
    },
  ],
  caveat: '클로즈드소스 제품용 프로덕션 DWG가 필요하면 자체 도면으로 상용 DWG Engine을 평가하세요 — 순위표 숫자를 만들지 않고 체험을 돕습니다.',
  ctaTitle: '내 파일로 측정',
  ctaLead: '브라우저에서 도면을 열거나, 제품에 중요한 도면으로 DWG Engine 체험을 신청하세요.',
  primaryCta: 'CAD Viewer 체험',
  secondaryCta: 'DWG Engine 체험',
}

export const benchmarksEs: BenchmarksCopy = {
  ...benchmarksEn,
  metaTitle: 'Rendimiento CAD web — arquitectura y evidencia | MLightCAD',
  metaDescription:
    'Cómo abordamos el rendimiento CAD en el navegador: análisis en el dispositivo, workers, render progresivo y HTML con memoria consciente — evidencia acotada, no tablas de competidores.',
  eyebrow: 'Recursos',
  title: 'Rendimiento por arquitectura',
  lead: 'No publicamos marcadores de competidores sin verificar. Documentamos las decisiones que hacen práctico el CAD nativo del navegador — y el resultado de memoria que ya compartimos.',
  heroImageAlt: 'Arquitectura de rendimiento CAD en el navegador y render consciente de memoria',
  architectureTitle: 'Qué optimizamos',
  architectureLead: 'Los dibujos grandes en una pestaña necesitan otra forma que la conversión en servidor. Estos son los pilares del runtime MLightCAD.',
  pillars: [
    {
      title: 'Análisis en el dispositivo',
      body: 'DWG/DXF se decodifica en el navegador. No hay hop de subida antes de los primeros píxeles útiles, lo que quita latencia de conversión y mantiene los dibujos confidenciales en local.',
    },
    {
      title: 'Workers',
      body: 'El parseo y la preparación pesados pueden salir del hilo principal para que pan, zoom y UI sigan interactivos mientras carga el dibujo.',
    },
    {
      title: 'Render progresivo',
      body: 'La geometría entra en la escena WebGL conforme está lista, para que los revisores vean estructura pronto en lugar de esperar una conversión silenciosa completa.',
    },
    {
      title: 'Rutas conscientes de memoria',
      body: 'Los modos de vista y el HTML offline se afinan para compartir y revisar — no cada función paga el coste de una sesión CAD de escritorio completa.',
    },
  ],
  evidenceTitle: 'Evidencia publicada',
  evidenceLead: 'Solo números acotados — con las condiciones explícitas.',
  evidenceItems: [
    {
      title: 'Memoria del HTML offline (modo vista)',
      body: 'Consumo de memoria medido con el dibujo de muestra canteen.dwg. El HTML autocontenido se abre en cualquier navegador moderno — sin instalar CAD ni servidor, con pan, zoom, capas y medición de distancia.',
      tableCaption: 'Memoria en canteen.dwg',
      tableHeaders: ['Visor', 'Consumo de memoria'],
      tableRows: canteenMemoryRows(
        'HTML autocontenido (modo medida)',
        'HTML autocontenido (modo vista)',
      ),
      tableSummary:
        'El modo vista usa cerca de un 83% menos de memoria que AutoCAD 2020 y un 77% menos que GstarCAD Viewer; el modo medida añade herramientas de distancia a 56 MB.',
      note: 'Compara artefactos HTML autocontenidos con visores de escritorio en el mismo dibujo de muestra. No es una afirmación sobre todos los dibujos, modos o visores web competidores.',
    },
  ],
  caveat:
    'Si necesita capacidad DWG de producción para productos de código cerrado, evalúe el DWG Engine comercial con sus propios dibujos — ayudamos con una prueba en lugar de inventar tablas de clasificación.',
  ctaTitle: 'Mida con sus archivos',
  ctaLead: 'Abra un dibujo en el navegador, o solicite una prueba del DWG Engine con los dibujos que importan a su producto.',
  primaryCta: 'Probar CAD Viewer',
  secondaryCta: 'Prueba DWG Engine',
}

export const benchmarksPt: BenchmarksCopy = {
  ...benchmarksEn,
  metaTitle: 'Desempenho CAD web — arquitetura e evidência | MLightCAD',
  metaDescription:
    'Como abordamos desempenho CAD no navegador: parsing no dispositivo, workers, render progressivo e HTML consciente de memória — evidência com escopo, sem placares de concorrentes.',
  eyebrow: 'Recursos',
  title: 'Desempenho pela arquitetura',
  lead: 'Não publicamos placares de concorrentes sem verificação. Documentamos as escolhas que tornam o CAD nativo do navegador prático — e o resultado de memória que já compartilhamos.',
  heroImageAlt: 'Arquitetura de desempenho CAD no navegador e render consciente de memória',
  architectureTitle: 'O que otimizamos',
  architectureLead: 'Desenhos grandes em uma aba precisam de outra forma do que conversão no servidor. Estes são os pilares do runtime MLightCAD.',
  pillars: [
    {
      title: 'Parsing no dispositivo',
      body: 'DWG/DXF é decodificado no navegador. Não há hop de upload antes dos primeiros pixels úteis, o que remove latência de conversão e mantém desenhos confidenciais no local.',
    },
    {
      title: 'Workers',
      body: 'Parse e preparação pesados podem sair da thread principal para pan, zoom e UI permanecerem interativos enquanto o desenho carrega.',
    },
    {
      title: 'Render progressivo',
      body: 'A geometria entra na cena WebGL conforme fica pronta, para revisores verem estrutura cedo em vez de esperar uma conversão silenciosa completa.',
    },
    {
      title: 'Caminhos conscientes de memória',
      body: 'Modos de view e HTML offline são afinados para compartilhar e revisar — nem todo recurso paga o custo de uma sessão CAD desktop completa.',
    },
  ],
  evidenceTitle: 'Evidência publicada',
  evidenceLead: 'Apenas números com escopo — com as condições explícitas.',
  evidenceItems: [
    {
      title: 'Memória do HTML offline (modo view)',
      body: 'Consumo de memória medido com o desenho de amostra canteen.dwg. O HTML autocontido abre em qualquer navegador moderno — sem instalar CAD nem servidor, com pan, zoom, camadas e medição de distância.',
      tableCaption: 'Memória em canteen.dwg',
      tableHeaders: ['Viewer', 'Consumo de memória'],
      tableRows: canteenMemoryRows(
        'HTML autocontido (modo measure)',
        'HTML autocontido (modo view)',
      ),
      tableSummary:
        'O modo view usa cerca de 83% menos memória que o AutoCAD 2020 e 77% menos que o GstarCAD Viewer; o modo measure adiciona ferramentas de distância a 56 MB.',
      note: 'Compara artefatos HTML autocontidos com viewers desktop no mesmo desenho de amostra. Não é uma afirmação sobre todos os desenhos, modos ou viewers web concorrentes.',
    },
  ],
  caveat:
    'Se precisar de capacidade DWG de produção para produtos closed-source, avalie o DWG Engine comercial com seus próprios desenhos — ajudamos com um trial em vez de inventar placares.',
  ctaTitle: 'Meça nos seus arquivos',
  ctaLead: 'Abra um desenho no navegador, ou solicite um trial do DWG Engine com os desenhos que importam ao seu produto.',
  primaryCta: 'Experimentar CAD Viewer',
  secondaryCta: 'Trial DWG Engine',
}

export const benchmarksRu: BenchmarksCopy = {
  ...benchmarksEn,
  metaTitle: 'Производительность веб-CAD — архитектура и доказательства | MLightCAD',
  metaDescription:
    'Как мы подходим к производительности CAD в браузере: парсинг на устройстве, workers, прогрессивный рендер и HTML с бережным отношением к памяти — доказательства с оговорками, без таблиц конкурентов.',
  eyebrow: 'Ресурсы',
  title: 'Производительность через архитектуру',
  lead: 'Мы не публикуем непроверенные таблицы конкурентов. Мы описываем решения, которые делают браузерный CAD практичным — и один публичный результат по памяти, который уже делились.',
  heroImageAlt: 'Архитектура производительности CAD в браузере и бережный к памяти рендер',
  architectureTitle: 'Что оптимизируем',
  architectureLead: 'Большие чертежи во вкладке требуют другой формы, чем серверная конвертация. Это столпы runtime MLightCAD.',
  pillars: [
    {
      title: 'Парсинг на устройстве',
      body: 'DWG/DXF декодируется в браузере. Нет upload-hop до первых полезных пикселей — меньше задержки конвертации, конфиденциальные чертежи остаются локально.',
    },
    {
      title: 'Workers',
      body: 'Тяжёлый разбор и подготовка могут идти вне главного потока, чтобы pan, zoom и UI оставались отзывчивыми во время загрузки.',
    },
    {
      title: 'Прогрессивный рендер',
      body: 'Геометрия попадает в WebGL-сцену по мере готовности — ревьюеры раньше видят структуру, а не ждут полной тихой конвертации.',
    },
    {
      title: 'Пути с бережной памятью',
      body: 'Режимы просмотра и офлайн HTML заточены под шаринг и review — не каждая функция платит цену полного desktop CAD-сеанса.',
    },
  ],
  evidenceTitle: 'Опубликованные доказательства',
  evidenceLead: 'Только числа с оговорками — с явными условиями.',
  evidenceItems: [
    {
      title: 'Память офлайн HTML (режим просмотра)',
      body: 'Потребление памяти измерено на образце canteen.dwg. Самодостаточный HTML открывается в любом современном браузере — без установки CAD и без сервера, с pan, zoom, слоями и измерением расстояний.',
      tableCaption: 'Память на canteen.dwg',
      tableHeaders: ['Просмотрщик', 'Потребление памяти'],
      tableRows: canteenMemoryRows(
        'Самодостаточный HTML (режим измерения)',
        'Самодостаточный HTML (режим просмотра)',
      ),
      tableSummary:
        'Режим просмотра использует примерно на 83% меньше памяти, чем AutoCAD 2020, и на 77% меньше, чем GstarCAD Viewer; режим измерения добавляет инструменты дистанции при 56 MB.',
      note: 'Сравнение самодостаточных HTML-артефактов с desktop-просмотрщиками на том же образце. Это не утверждение про все чертежи, режимы или конкурирующие веб-viewer.',
    },
  ],
  caveat:
    'Если нужен производственный DWG для закрытых продуктов, оцените коммерческий DWG Engine на своих чертежах — мы поможем с trial вместо выдуманных таблиц лидеров.',
  ctaTitle: 'Измерьте на своих файлах',
  ctaLead: 'Откройте чертёж в браузере или запросите trial DWG Engine с чертежами, важными для вашего продукта.',
  primaryCta: 'Попробовать CAD Viewer',
  secondaryCta: 'Trial DWG Engine',
}

export const benchmarksCs: BenchmarksCopy = {
  ...benchmarksEn,
  metaTitle: 'Výkon webového CAD — architektura a důkazy | MLightCAD',
  metaDescription:
    'Jak přistupujeme k výkonu CAD v prohlížeči: parsování na zařízení, workery, progresivní rendering a HTML šetrné k paměti — důkazy s rozsahem, bez žebříčků konkurence.',
  eyebrow: 'Zdroje',
  title: 'Výkon skrze architekturu',
  lead: 'Nezveřejňujeme neověřené žebříčky konkurence. Dokumentujeme rozhodnutí, která dělají prohlížečový CAD praktickým — a jeden veřejný výsledek paměti, který už jsme sdíleli.',
  heroImageAlt: 'Architektura výkonu CAD v prohlížeči a render šetrný k paměti',
  architectureTitle: 'Co optimalizujeme',
  architectureLead: 'Velké výkresy v záložce potřebují jiný tvar než serverová konverze. Toto jsou pilíře MLightCAD runtime.',
  pillars: [
    {
      title: 'Parsování na zařízení',
      body: 'DWG/DXF se dekóduje v prohlížeči. Před prvními užitečnými pixely není upload hop — méně latence konverze a důvěrné výkresy zůstávají lokálně.',
    },
    {
      title: 'Workery',
      body: 'Těžké parsování a příprava mohou běžet mimo hlavní vlákno, aby pan, zoom a UI zůstaly interaktivní během načítání.',
    },
    {
      title: 'Progresivní rendering',
      body: 'Geometrie proudí do WebGL scény podle připravenosti — recenzenti vidí strukturu dřív, než čekají na tichou plnou konverzi.',
    },
    {
      title: 'Cesty šetrné k paměti',
      body: 'Režimy view a offline HTML jsou laděné pro sdílení a review — ne každá funkce platí cenu plné desktop CAD session.',
    },
  ],
  evidenceTitle: 'Zveřejněné důkazy',
  evidenceLead: 'Jen čísla s rozsahem — s jasnými podmínkami.',
  evidenceItems: [
    {
      title: 'Paměť offline HTML (view mode)',
      body: 'Spotřeba paměti měřená na vzorovém výkresu canteen.dwg. Samostatný HTML se otevře v jakémkoli moderním prohlížeči — bez instalace CAD a bez serveru, s pan, zoom, vrstvami a měřením vzdálenosti.',
      tableCaption: 'Paměť na canteen.dwg',
      tableHeaders: ['Prohlížeč', 'Spotřeba paměti'],
      tableRows: canteenMemoryRows(
        'Samostatný HTML (measure mode)',
        'Samostatný HTML (view mode)',
      ),
      tableSummary:
        'View mode používá asi o 83 % méně paměti než AutoCAD 2020 a o 77 % méně než GstarCAD Viewer; measure mode přidává nástroje vzdálenosti při 56 MB.',
      note: 'Porovnává samostatné HTML artefakty s desktop prohlížeči na stejném vzorku. Není to tvrzení o všech výkresech, režimech ani konkurenčních web viewerech.',
    },
  ],
  caveat:
    'Pokud potřebujete produkční DWG pro closed-source produkty, vyhodnoťte komerční DWG Engine na vlastních výkresech — pomůžeme se zkušební licencí místo vymýšlení žebříčků.',
  ctaTitle: 'Měřte na svých souborech',
  ctaLead: 'Otevřete výkres v prohlížeči, nebo požádejte o zkušební DWG Engine s výkresy důležitými pro váš produkt.',
  primaryCta: 'Vyzkoušet CAD Viewer',
  secondaryCta: 'Zkušební DWG Engine',
}
