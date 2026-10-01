/** Localized copy for the Solutions / use-cases page. */
export interface UseCasesCopy {
  metaTitle: string
  metaDescription: string
  metaKeywords: string
  eyebrow: string
  title: string
  lead: string
  heroImageAlt: string
  primaryCta: string
  primaryHref: string
  secondaryCta: string
  secondaryHref: string
  industryTitle: string
  industryLead: string
  cases: { id: string; title: string; body: string }[]
  renderTitle: string
  renderLead: string
  modes: { id: string; label: string; title: string; body: string; points: string[] }[]
  fitTitle: string
  fitLead: string
  fitItems: string[]
  renderNote: string
  articleLabel: string
  articleHref: string
  sampleLabel: string
  sampleHref: string
}

const RENDER_ARTICLE =
  'https://medium.com/@mlightcad/viewing-cad-drawings-in-the-browser-live-parse-vs-server-side-prerender-97e46f0bed4e'
const RENDER_SAMPLE = 'https://github.com/mlightcad/cad-viewer-nextjs-demo'

export const useCasesEn: UseCasesCopy = {
  metaTitle: 'Use Cases — Web CAD for Construction, Manufacturing, GIS & AI | MLightCAD',
  metaDescription:
    'Embed DWG/DXF into construction, manufacturing, GIS, document management, and AI CAD workflows. Parse live in the browser, or prerender once on the server.',
  metaKeywords:
    'CAD SaaS, construction drawings browser, manufacturing DWG, GIS CAD, AI CAD, document management DWG, CAD live parse, server-side prerender, ACEX',
  eyebrow: 'Solutions',
  title: 'CAD where users already work',
  lead: 'Teams do not want another desktop CAD seat. They want drawings inside the products they already ship: parsed live in the browser, or opened from a package the server rendered once.',
  heroImageAlt:
    'CAD drawings embedded across construction, manufacturing, GIS, and SaaS products',
  primaryCta: 'Build with CAD SDK',
  primaryHref: '/cad-sdk.html',
  secondaryCta: 'Try CAD Viewer',
  secondaryHref: 'https://mlightcad.github.io/cad-viewer/',
  cases: [
    {
      id: 'construction',
      title: 'Construction',
      body: 'Review construction drawings directly in the browser — field teams, PMs, and partners open the same DWG/DXF without installing AutoCAD.',
    },
    {
      id: 'manufacturing',
      title: 'Manufacturing',
      body: 'Embed DWG/DXF viewing into MES, ERP, or PLM so operators and planners inspect parts and layouts inside the tools they already use.',
    },
    {
      id: 'gis',
      title: 'GIS',
      body: 'Combine CAD drawings with geospatial workflows — open engineering drawings next to maps without standing up a separate CAD stack.',
    },
    {
      id: 'dms',
      title: 'Document management',
      body: 'Preview engineering drawings in your DMS or vault without desktop CAD software — pan, zoom, layers, and measure in the tab.',
    },
    {
      id: 'ai',
      title: 'AI CAD',
      body: 'Parse and understand CAD drawings inside AI workflows — turn DWG/DXF into structured data your agents and models can reason over.',
    },
  ],
  industryTitle: 'By industry',
  industryLead:
    'Construction, manufacturing, GIS, document systems, and AI products need drawings inside the tools people already use.',
  renderTitle: 'By architecture',
  renderLead:
    'The same viewer opens the original DWG or DXF in the browser, or a display package the server rendered once. The fit depends on who opens the drawing, and how often.',
  modes: [
    {
      id: 'live-parse',
      label: 'Client',
      title: 'Live parse',
      body: 'The browser downloads the original file and parses it with WebAssembly and Web Workers. There is no conversion step after upload.',
      points: [
        'Entity-level fidelity, closer to a full viewer pipeline',
        'A good default for smaller files, stronger devices, and infrequent opens',
        'The path when you cannot run a headless converter',
      ],
    },
    {
      id: 'server-prerender',
      label: 'Server',
      title: 'Prerender once',
      body: 'The server converts the drawing once into an ACEX package. Later opens skip DWG parsing and load geometry meant for viewing.',
      points: [
        'Faster first paint and lower peak memory on phones and tablets',
        'Convert once, then open the same drawing many times',
        'Built for pan, zoom, layers, and measure',
      ],
    },
  ],
  fitTitle: 'When server prerender fits',
  fitLead:
    'If most people look at a drawing instead of editing entities, paying the conversion cost once on the server is usually the better deal.',
  fitItems: [
    'Project portals, share links, and drawing libraries where the same file is opened again and again',
    'Field teams on phones and lower-end tablets',
    'Publish-and-share flows that can wait for one background conversion',
    'Products that accept a larger download in exchange for a predictable open',
  ],
  renderNote:
    'Many products expose both. Live parse stays available for people who need the full client pipeline. Prerender is the default open for everyone else.',
  articleLabel: 'Read the comparison',
  articleHref: RENDER_ARTICLE,
  sampleLabel: 'Open sample',
  sampleHref: RENDER_SAMPLE,
}

export const useCasesZh: UseCasesCopy = {
  ...useCasesEn,
  metaTitle: '用例 — 面向施工、制造、GIS 与 AI 的 Web CAD | MLightCAD',
  metaDescription:
    '把 DWG/DXF 嵌入施工、制造、GIS、文档管理与 AI CAD 工作流。可在浏览器中即时解析，也可在服务端预渲染一次。',
  eyebrow: '解决方案',
  title: '把 CAD 嵌入现有产品',
  lead: '团队不想再买一套桌面 CAD。他们想在已有产品里直接看图：在浏览器里即时解析，或打开服务端渲染一次后的显示包。',
  heroImageAlt: 'CAD 图纸嵌入施工、制造、GIS 与 SaaS 产品',
  primaryCta: '用 CAD SDK 构建',
  secondaryCta: '试用 CAD Viewer',
  cases: [
    {
      id: 'construction',
      title: '施工与工程协同',
      body: '在浏览器中直接审阅施工图 — 现场、项目经理与合作方打开同一份 DWG/DXF，无需安装 AutoCAD。',
    },
    {
      id: 'manufacturing',
      title: '制造业',
      body: '把 DWG/DXF 查看嵌入 MES、ERP 或 PLM，让操作员与计划员在现有工具内检查零件与布局。',
    },
    {
      id: 'gis',
      title: 'GIS',
      body: '把 CAD 图纸与地理空间工作流结合 — 在地图旁打开工程图，无需另建 CAD 技术栈。',
    },
    {
      id: 'dms',
      title: '文档管理',
      body: '在 DMS 或图纸库中预览工程图，无需桌面 CAD — 在标签页内平移、缩放、图层与测量。',
    },
    {
      id: 'ai',
      title: 'AI CAD',
      body: '在 AI 工作流中解析与理解 CAD 图纸 — 把 DWG/DXF 变成智能体与模型可推理的结构化数据。',
    },
  ],
  industryTitle: '按行业',
  industryLead: '施工、制造、GIS、文档系统和 AI 产品，都需要把图纸放进用户已经在用的工具里。',
  renderTitle: '按架构',
  renderLead:
    '同一套查看器可以在浏览器里打开原始 DWG 或 DXF，也可以打开服务端渲染一次后的显示包。选哪条路径，取决于谁在看图、看多少次。',
  modes: [
    {
      id: 'live-parse',
      label: '客户端',
      title: '直接解析',
      body: '浏览器下载原始文件，用 WebAssembly 和 Web Worker 解析并渲染。上传之后没有转换等待。',
      points: [
        '更接近完整查看管线的实体级保真',
        '适合较小的文件、较强的设备，以及不太频繁的打开',
        '无法运行无头转换服务时走这条路径',
      ],
    },
    {
      id: 'server-prerender',
      label: '服务端',
      title: '预渲染一次',
      body: '服务端把图纸转换一次，生成 ACEX 显示包。之后打开时跳过 DWG 解析，只加载用于查看的几何。',
      points: [
        '在手机和平板上更快出图，峰值内存更低',
        '转换一次，同一张图可以反复打开',
        '面向平移、缩放、图层和测量',
      ],
    },
  ],
  fitTitle: '什么时候更适合服务端预渲染',
  fitLead: '如果大多数人是在看图，而不是在改实体，把转换成本在服务端付一次，通常更划算。',
  fitItems: [
    '项目门户、分享链接和图库：同一份文件会被反复打开',
    '现场团队使用手机和较低端的平板',
    '发布与分享流程可以接受一次后台转换',
    '可以接受更大的下载，换来更稳定的打开时间',
  ],
  renderNote:
    '很多产品会同时提供两种方式。需要完整客户端管线的人走直接解析；其他人默认打开预渲染结果。',
  articleLabel: '阅读两种方式的对比',
  sampleLabel: '打开样例',
}

export const useCasesJa: UseCasesCopy = {
  ...useCasesEn,
  metaTitle: 'ユースケース — 建設・製造・GIS・AI 向け Web CAD | MLightCAD',
  metaDescription:
    'DWG/DXF を建設・製造・GIS・文書管理・AI CAD ワークフローへ。ブラウザでライブ解析するか、サーバーで一度プリレンダーします。',
  eyebrow: 'ソリューション',
  title: '既存製品に CAD を置く',
  lead: 'チームは別のデスクトップ CAD 席を欲しくありません。既に出荷している製品の中で図面を見たい：ブラウザでライブ解析するか、サーバーが一度レンダリングしたパッケージを開くか。',
  heroImageAlt: '建設・製造・GIS・SaaS 製品に埋め込まれた CAD 図面',
  primaryCta: 'CAD SDK で構築',
  secondaryCta: 'CAD Viewer を試す',
  cases: [
    {
      id: 'construction',
      title: '建設',
      body: '施工図をブラウザで直接レビュー — 現場・PM・協力会社が同じ DWG/DXF を開き、AutoCAD 不要。',
    },
    {
      id: 'manufacturing',
      title: '製造',
      body: 'MES / ERP / PLM に DWG/DXF 表示を埋め込み、現場と計画が既存ツール内で部品・レイアウトを確認。',
    },
    {
      id: 'gis',
      title: 'GIS',
      body: 'CAD 図面と地理空間ワークフローを組み合わせ — 別 CAD スタックなしで地図の横に図面を開く。',
    },
    {
      id: 'dms',
      title: '文書管理',
      body: 'DMS や図面庫でエンジニアリング図面をプレビュー — タブ内でパン・ズーム・レイヤー・計測。',
    },
    {
      id: 'ai',
      title: 'AI CAD',
      body: 'AI ワークフロー内で CAD 図面を解析・理解 — DWG/DXF をエージェントが扱える構造化データへ。',
    },
  ],
  industryTitle: '業界別',
  industryLead:
    '建設、製造、GIS、文書システム、AI 製品は、すでに使っているツールの中で図面を開く必要があります。',
  renderTitle: 'アーキテクチャ別',
  renderLead:
    '同じビューアで、ブラウザ上の元の DWG または DXF も、サーバーが一度レンダリングした表示パッケージも開けます。どちらが合うかは、誰が何回開くかで決まります。',
  modes: [
    {
      id: 'live-parse',
      label: 'クライアント',
      title: 'ライブ解析',
      body: 'ブラウザが元ファイルをダウンロードし、WebAssembly と Web Worker で解析して描画します。アップロード後の変換待ちはありません。',
      points: [
        'エンティティ単位の忠実度。完全なビューアパイプラインに近い',
        '小さめのファイル、強いデバイス、開く回数が少ない場合の既定',
        'ヘッドレス変換を動かせないときの経路',
      ],
    },
    {
      id: 'server-prerender',
      label: 'サーバー',
      title: '一度だけ事前レンダリング',
      body: 'サーバーが図面を一度 ACEX パッケージに変換します。その後のオープンは DWG 解析を飛ばし、表示用のジオメトリだけを読みます。',
      points: [
        'スマホとタブレットで初回表示が速く、ピークメモリが低い',
        '一度変換すれば、同じ図面を何度でも開ける',
        'パン、ズーム、レイヤー、計測向け',
      ],
    },
  ],
  fitTitle: 'サーバー事前レンダリングが合うとき',
  fitLead:
    'ほとんどの人がエンティティを編集せず図面を見るだけなら、変換コストをサーバーで一度払う方が通常は得です。',
  fitItems: [
    '同じファイルを繰り返し開くプロジェクトポータル、共有リンク、図面ライブラリ',
    'スマホやスペックの低いタブレットを使う現場チーム',
    '一度のバックグラウンド変換を待てる公開・共有フロー',
    'ダウンロードは大きくなっても、開く時間を安定させたい製品',
  ],
  renderNote:
    '多くの製品は両方を出します。完全なクライアントパイプラインが必要な人にはライブ解析を残し、それ以外の既定は事前レンダリングにします。',
  articleLabel: '二つの方式を読む',
  sampleLabel: 'サンプルを開く',
}

export const useCasesKo: UseCasesCopy = {
  ...useCasesEn,
  metaTitle: '사용 사례 — 건설·제조·GIS·AI용 Web CAD | MLightCAD',
  metaDescription:
    '건설, 제조, GIS, 문서 관리, AI CAD 워크플로에 DWG/DXF를 임베드합니다. 브라우저에서 바로 파싱하거나, 서버에서 한 번 프리렌더합니다.',
  eyebrow: '솔루션',
  title: '사용자가 일하는 곳에 CAD를',
  lead: '팀은 또 다른 데스크톱 CAD 좌석을 원하지 않습니다. 이미 출하한 제품 안에서 도면을 보고 싶어 합니다. 브라우저에서 바로 파싱하거나, 서버가 한 번 렌더한 패키지를 엽니다.',
  heroImageAlt: '건설·제조·GIS·SaaS 제품에 임베드된 CAD 도면',
  primaryCta: 'CAD SDK로 구축',
  secondaryCta: 'CAD Viewer 체험',
  cases: [
    {
      id: 'construction',
      title: '건설',
      body: '브라우저에서 시공 도면을 바로 리뷰 — 현장, PM, 협력사가 같은 DWG/DXF를 열고 AutoCAD 설치가 필요 없습니다.',
    },
    {
      id: 'manufacturing',
      title: '제조',
      body: 'MES·ERP·PLM에 DWG/DXF 보기를 넣어 작업자와 계획이 기존 도구 안에서 부품과 레이아웃을 확인합니다.',
    },
    {
      id: 'gis',
      title: 'GIS',
      body: 'CAD 도면과 지리공간 워크플로를 결합 — 별도 CAD 스택 없이 지도 옆에서 공학 도면을 엽니다.',
    },
    {
      id: 'dms',
      title: '문서 관리',
      body: 'DMS나 도면 저장소에서 공학 도면을 미리보기 — 탭에서 팬·줌·레이어·측정.',
    },
    {
      id: 'ai',
      title: 'AI CAD',
      body: 'AI 워크플로 안에서 CAD 도면을 파싱·이해 — DWG/DXF를 에이전트가 다룰 구조화 데이터로 바꿉니다.',
    },
  ],
  industryTitle: '산업별',
  industryLead:
    '건설, 제조, GIS, 문서 시스템, AI 제품은 사람들이 이미 쓰는 도구 안에서 도면을 열어야 합니다.',
  renderTitle: '아키텍처별',
  renderLead:
    '같은 뷰어가 브라우저에서 원본 DWG 또는 DXF를 열 수도 있고, 서버가 한 번 렌더한 표시 패키지를 열 수도 있습니다. 어느 쪽이 맞는지는 누가, 얼마나 자주 여는지에 달렸습니다.',
  modes: [
    {
      id: 'live-parse',
      label: '클라이언트',
      title: '라이브 파싱',
      body: '브라우저가 원본 파일을 받아 WebAssembly와 Web Worker로 파싱하고 그립니다. 업로드 뒤에 변환을 기다리지 않습니다.',
      points: [
        '엔티티 단위 충실도. 전체 뷰어 파이프라인에 가깝습니다',
        '파일이 작고, 기기가 강하고, 여는 횟수가 적을 때의 기본값',
        '헤드리스 변환기를 돌릴 수 없을 때의 경로',
      ],
    },
    {
      id: 'server-prerender',
      label: '서버',
      title: '한 번 프리렌더',
      body: '서버가 도면을 한 번 ACEX 패키지로 변환합니다. 이후에는 DWG 파싱을 건너뛰고 보기용 지오메트리만 불러옵니다.',
      points: [
        '휴대폰과 태블릿에서 첫 화면이 더 빠르고 최대 메모리가 낮습니다',
        '한 번 변환하면 같은 도면을 여러 번 엽니다',
        '팬, 줌, 레이어, 측정에 맞습니다',
      ],
    },
  ],
  fitTitle: '서버 프리렌더가 더 맞는 경우',
  fitLead:
    '대부분 엔티티를 고치지 않고 도면을 보기만 한다면, 변환 비용을 서버에서 한 번 내는 편이 보통 더 낫습니다.',
  fitItems: [
    '같은 파일을 반복해서 여는 프로젝트 포털, 공유 링크, 도면 라이브러리',
    '휴대폰과 낮은 사양 태블릿을 쓰는 현장 팀',
    '백그라운드 변환 한 번을 기다릴 수 있는 게시·공유 흐름',
    '다운로드가 커져도 여는 시간을 예측하고 싶은 제품',
  ],
  renderNote:
    '많은 제품이 둘 다 제공합니다. 전체 클라이언트 파이프라인이 필요한 사람에게는 라이브 파싱을 남기고, 나머지는 프리렌더를 기본 열기로 둡니다.',
  articleLabel: '두 방식 비교 읽기',
  sampleLabel: '샘플 열기',
}

export const useCasesEs: UseCasesCopy = {
  ...useCasesEn,
  metaTitle: 'Casos de uso — CAD web para construcción, fabricación, GIS e IA | MLightCAD',
  metaDescription:
    'Incruste DWG/DXF en construcción, fabricación, GIS, gestión documental y flujos de IA CAD. Analice en el navegador, o prerenderice una vez en el servidor.',
  eyebrow: 'Soluciones',
  title: 'CAD donde ya trabajan',
  lead: 'Los equipos no quieren otro asiento de CAD de escritorio. Quieren dibujos dentro de los productos que ya envían: analizados en el navegador, o abiertos desde un paquete que el servidor renderizó una vez.',
  heroImageAlt:
    'Dibujos CAD incrustados en productos de construcción, fabricación, GIS y SaaS',
  primaryCta: 'Construir con CAD SDK',
  secondaryCta: 'Probar CAD Viewer',
  cases: [
    {
      id: 'construction',
      title: 'Construcción',
      body: 'Revise planos de obra en el navegador — campo, PMs y socios abren el mismo DWG/DXF sin instalar AutoCAD.',
    },
    {
      id: 'manufacturing',
      title: 'Fabricación',
      body: 'Incruste visualización DWG/DXF en MES, ERP o PLM para que operadores y planificadores inspeccionen piezas y layouts en las herramientas que ya usan.',
    },
    {
      id: 'gis',
      title: 'GIS',
      body: 'Combine dibujos CAD con flujos geoespaciales — abra planos de ingeniería junto a mapas sin un stack CAD aparte.',
    },
    {
      id: 'dms',
      title: 'Gestión documental',
      body: 'Previsualice planos de ingeniería en su DMS sin CAD de escritorio — pan, zoom, capas y medición en la pestaña.',
    },
    {
      id: 'ai',
      title: 'IA CAD',
      body: 'Analice y comprenda dibujos CAD en flujos de IA — convierta DWG/DXF en datos estructurados para agentes y modelos.',
    },
  ],
  industryTitle: 'Por industria',
  industryLead:
    'Construcción, fabricación, GIS, sistemas documentales y productos de IA necesitan los planos dentro de las herramientas que la gente ya usa.',
  renderTitle: 'Por arquitectura',
  renderLead:
    'El mismo visor abre el DWG o DXF original en el navegador, o un paquete de visualización que el servidor renderizó una vez. Cuál encaja depende de quién abre el plano y con qué frecuencia.',
  modes: [
    {
      id: 'live-parse',
      label: 'Cliente',
      title: 'Análisis en vivo',
      body: 'El navegador descarga el archivo original y lo analiza con WebAssembly y Web Workers. No hay un paso de conversión después de subirlo.',
      points: [
        'Fidelidad a nivel de entidad, más cerca de un visor completo',
        'Buen valor por defecto con archivos más pequeños, equipos potentes y aperturas poco frecuentes',
        'El camino cuando no puede ejecutar un conversor headless',
      ],
    },
    {
      id: 'server-prerender',
      label: 'Servidor',
      title: 'Prerenderizar una vez',
      body: 'El servidor convierte el plano una vez en un paquete ACEX. Las aperturas siguientes omiten el análisis DWG y cargan geometría pensada para ver.',
      points: [
        'Primera imagen más rápida y menos memoria pico en teléfonos y tabletas',
        'Convierta una vez y abra el mismo plano muchas veces',
        'Hecho para pan, zoom, capas y medición',
      ],
    },
  ],
  fitTitle: 'Cuándo encaja el prerender en el servidor',
  fitLead:
    'Si la mayoría mira el plano en lugar de editar entidades, pagar el coste de conversión una vez en el servidor suele ser el mejor trato.',
  fitItems: [
    'Portales de proyecto, enlaces compartidos y bibliotecas donde el mismo archivo se abre una y otra vez',
    'Equipos de campo en teléfonos y tabletas de gama baja',
    'Flujos de publicar y compartir que pueden esperar una conversión en segundo plano',
    'Productos que aceptan una descarga mayor a cambio de una apertura predecible',
  ],
  renderNote:
    'Muchos productos ofrecen ambos. El análisis en vivo queda para quien necesita el pipeline completo del cliente. El prerender es la apertura por defecto para los demás.',
  articleLabel: 'Leer la comparación',
  sampleLabel: 'Abrir ejemplo',
}

export const useCasesPt: UseCasesCopy = {
  ...useCasesEn,
  metaTitle: 'Casos de uso — CAD web para construção, manufatura, GIS e IA | MLightCAD',
  metaDescription:
    'Incorpore DWG/DXF em construção, manufatura, GIS, gestão documental e fluxos de IA CAD. Analise no navegador, ou pré-renderize uma vez no servidor.',
  eyebrow: 'Soluções',
  title: 'CAD onde os usuários já trabalham',
  lead: 'Times não querem outro assento de CAD desktop. Querem desenhos dentro dos produtos que já enviam: analisados no navegador, ou abertos a partir de um pacote que o servidor renderizou uma vez.',
  heroImageAlt:
    'Desenhos CAD incorporados em produtos de construção, manufatura, GIS e SaaS',
  primaryCta: 'Construir com CAD SDK',
  secondaryCta: 'Experimentar CAD Viewer',
  cases: [
    {
      id: 'construction',
      title: 'Construção',
      body: 'Revise desenhos de obra no navegador — campo, PMs e parceiros abrem o mesmo DWG/DXF sem instalar AutoCAD.',
    },
    {
      id: 'manufacturing',
      title: 'Manufatura',
      body: 'Incorpore visualização DWG/DXF em MES, ERP ou PLM para operadores e planejadores inspecionarem peças e layouts nas ferramentas que já usam.',
    },
    {
      id: 'gis',
      title: 'GIS',
      body: 'Combine desenhos CAD com fluxos geoespaciais — abra plantas de engenharia ao lado de mapas sem um stack CAD separado.',
    },
    {
      id: 'dms',
      title: 'Gestão documental',
      body: 'Pré-visualize desenhos de engenharia no DMS sem CAD desktop — pan, zoom, camadas e medição na aba.',
    },
    {
      id: 'ai',
      title: 'IA CAD',
      body: 'Analise e entenda desenhos CAD em fluxos de IA — transforme DWG/DXF em dados estruturados para agentes e modelos.',
    },
  ],
  industryTitle: 'Por setor',
  industryLead:
    'Construção, manufatura, GIS, sistemas de documentos e produtos de IA precisam dos desenhos dentro das ferramentas que as pessoas já usam.',
  renderTitle: 'Por arquitetura',
  renderLead:
    'O mesmo visualizador abre o DWG ou DXF original no navegador, ou um pacote de exibição que o servidor renderizou uma vez. O caminho certo depende de quem abre o desenho e com que frequência.',
  modes: [
    {
      id: 'live-parse',
      label: 'Cliente',
      title: 'Análise ao vivo',
      body: 'O navegador baixa o arquivo original e o analisa com WebAssembly e Web Workers. Não há etapa de conversão depois do upload.',
      points: [
        'Fidelidade no nível da entidade, mais perto de um visualizador completo',
        'Bom padrão para arquivos menores, dispositivos fortes e aberturas raras',
        'O caminho quando não dá para rodar um conversor headless',
      ],
    },
    {
      id: 'server-prerender',
      label: 'Servidor',
      title: 'Pré-renderizar uma vez',
      body: 'O servidor converte o desenho uma vez em um pacote ACEX. As aberturas seguintes pulam o parsing DWG e carregam geometria feita para visualização.',
      points: [
        'Primeira imagem mais rápida e menos pico de memória em telefones e tablets',
        'Converta uma vez e abra o mesmo desenho muitas vezes',
        'Feito para pan, zoom, camadas e medição',
      ],
    },
  ],
  fitTitle: 'Quando o pré-render no servidor encaixa',
  fitLead:
    'Se a maioria olha o desenho em vez de editar entidades, pagar o custo da conversão uma vez no servidor costuma ser o melhor negócio.',
  fitItems: [
    'Portais de projeto, links de compartilhamento e bibliotecas em que o mesmo arquivo é aberto de novo e de novo',
    'Equipes de campo em telefones e tablets mais simples',
    'Fluxos de publicar e compartilhar que podem esperar uma conversão em segundo plano',
    'Produtos que aceitam um download maior em troca de uma abertura previsível',
  ],
  renderNote:
    'Muitos produtos expõem os dois. A análise ao vivo fica para quem precisa do pipeline completo do cliente. O pré-render é a abertura padrão para os demais.',
  articleLabel: 'Ler a comparação',
  sampleLabel: 'Abrir exemplo',
}

export const useCasesRu: UseCasesCopy = {
  ...useCasesEn,
  metaTitle: 'Сценарии — веб-CAD для строительства, производства, GIS и ИИ | MLightCAD',
  metaDescription:
    'Встраивайте DWG/DXF в строительство, производство, GIS, документооборот и ИИ-CAD. Разбирайте в браузере или один раз пререндерьте на сервере.',
  eyebrow: 'Решения',
  title: 'CAD там, где уже работают',
  lead: 'Командам не нужно ещё одно место desktop CAD. Им нужны чертежи внутри уже поставляемых продуктов: разобранные в браузере или открытые из пакета, который сервер отрисовал один раз.',
  heroImageAlt:
    'CAD-чертежи, встроенные в продукты строительства, производства, GIS и SaaS',
  primaryCta: 'Собрать на CAD SDK',
  secondaryCta: 'Попробовать CAD Viewer',
  cases: [
    {
      id: 'construction',
      title: 'Строительство',
      body: 'Просматривайте строительные чертежи прямо в браузере — полевые команды, PM и партнёры открывают тот же DWG/DXF без AutoCAD.',
    },
    {
      id: 'manufacturing',
      title: 'Производство',
      body: 'Встройте просмотр DWG/DXF в MES, ERP или PLM, чтобы операторы и планировщики смотрели детали и планировки в привычных инструментах.',
    },
    {
      id: 'gis',
      title: 'GIS',
      body: 'Сочетайте CAD-чертежи с геопространственными сценариями — открывайте инженерные чертежи рядом с картами без отдельного CAD-стека.',
    },
    {
      id: 'dms',
      title: 'Документооборот',
      body: 'Предпросмотр инженерных чертежей в DMS без desktop CAD — pan, zoom, слои и измерение во вкладке.',
    },
    {
      id: 'ai',
      title: 'ИИ CAD',
      body: 'Разбирайте и понимайте CAD-чертежи в ИИ-потоках — превращайте DWG/DXF в структурированные данные для агентов и моделей.',
    },
  ],
  industryTitle: 'По отраслям',
  industryLead:
    'Строительству, производству, GIS, документным системам и AI-продуктам нужны чертежи внутри инструментов, которыми люди уже пользуются.',
  renderTitle: 'По архитектуре',
  renderLead:
    'Один и тот же просмотрщик открывает исходный DWG или DXF в браузере либо пакет, который сервер отрисовал один раз. Подходящий путь зависит от того, кто открывает чертёж и как часто.',
  modes: [
    {
      id: 'live-parse',
      label: 'Клиент',
      title: 'Разбор в браузере',
      body: 'Браузер скачивает исходный файл и разбирает его через WebAssembly и Web Workers. После загрузки нет шага конвертации.',
      points: [
        'Точность на уровне сущностей, ближе к полному конвейеру просмотрщика',
        'Хороший вариант по умолчанию для небольших файлов, сильных устройств и редких открытий',
        'Путь, когда нельзя запустить headless-конвертер',
      ],
    },
    {
      id: 'server-prerender',
      label: 'Сервер',
      title: 'Пререндер один раз',
      body: 'Сервер один раз конвертирует чертёж в пакет ACEX. Следующие открытия пропускают разбор DWG и грузят геометрию для просмотра.',
      points: [
        'Быстрее первый кадр и ниже пик памяти на телефонах и планшетах',
        'Конвертация один раз, затем тот же чертёж открывают много раз',
        'Для панорамирования, масштаба, слоёв и измерения',
      ],
    },
  ],
  fitTitle: 'Когда уместен серверный пререндер',
  fitLead:
    'Если большинство смотрит чертёж, а не правит сущности, один раз оплатить конвертацию на сервере обычно выгоднее.',
  fitItems: [
    'Порталы проектов, ссылки для доступа и библиотеки, где один и тот же файл открывают снова и снова',
    'Полевые команды на телефонах и слабых планшетах',
    'Публикация и шаринг, которые могут подождать одну фоновую конвертацию',
    'Продукты, которые принимают больший объём скачивания ради предсказуемого открытия',
  ],
  renderNote:
    'Многие продукты дают оба пути. Разбор в браузере остаётся тем, кому нужен полный клиентский конвейер. Пререндер — открытие по умолчанию для остальных.',
  articleLabel: 'Прочитать сравнение',
  sampleLabel: 'Открыть пример',
}

export const useCasesCs: UseCasesCopy = {
  ...useCasesEn,
  metaTitle: 'Případy použití — webové CAD pro stavebnictví, výrobu, GIS a AI | MLightCAD',
  metaDescription:
    'Vložte DWG/DXF do stavebnictví, výroby, GIS, správy dokumentů a AI CAD workflow. Parsujte v prohlížeči, nebo jednou předrenderujte na serveru.',
  eyebrow: 'Řešení',
  title: 'CAD tam, kde uživatelé pracují',
  lead: 'Týmy nechtějí další desktopové CAD místo. Chtějí výkresy uvnitř produktů, které už dodávají: parsované v prohlížeči, nebo otevřené z balíčku, který server jednou vyrenderoval.',
  heroImageAlt:
    'CAD výkresy vložené do produktů pro stavebnictví, výrobu, GIS a SaaS',
  primaryCta: 'Stavět s CAD SDK',
  secondaryCta: 'Vyzkoušet CAD Viewer',
  cases: [
    {
      id: 'construction',
      title: 'Stavebnictví',
      body: 'Prohlížejte stavební výkresy přímo v prohlížeči — terén, PM i partneři otevřou stejný DWG/DXF bez instalace AutoCADu.',
    },
    {
      id: 'manufacturing',
      title: 'Výroba',
      body: 'Vložte prohlížení DWG/DXF do MES, ERP nebo PLM, aby operátoři a plánovači kontrolovali díly a layouty v nástrojích, které už používají.',
    },
    {
      id: 'gis',
      title: 'GIS',
      body: 'Kombinujte CAD výkresy s geoprostorovými workflows — otevírejte technické výkresy vedle map bez samostatného CAD stacku.',
    },
    {
      id: 'dms',
      title: 'Správa dokumentů',
      body: 'Náhled technických výkresů v DMS bez desktop CADu — pan, zoom, vrstvy a měření v záložce.',
    },
    {
      id: 'ai',
      title: 'AI CAD',
      body: 'Parsujte a chápejte CAD výkresy v AI workflows — převeďte DWG/DXF na strukturovaná data pro agenty a modely.',
    },
  ],
  industryTitle: 'Podle odvětví',
  industryLead:
    'Stavebnictví, výroba, GIS, dokumentové systémy a AI produkty potřebují výkresy v nástrojích, které lidé už používají.',
  renderTitle: 'Podle architektury',
  renderLead:
    'Stejný prohlížeč otevře původní DWG nebo DXF v prohlížeči, nebo balíček, který server jednou vyrenderoval. Vhodná cesta záleží na tom, kdo výkres otevírá a jak často.',
  modes: [
    {
      id: 'live-parse',
      label: 'Klient',
      title: 'Živé parsování',
      body: 'Prohlížeč stáhne původní soubor a parsuje ho přes WebAssembly a Web Workers. Po nahrání není krok převodu.',
      points: [
        'Věrnost na úrovni entit, blíž k plné pipeline prohlížeče',
        'Vhodné pro menší soubory, silnější zařízení a občasné otevření',
        'Cesta, když nemůžete spustit headless konvertor',
      ],
    },
    {
      id: 'server-prerender',
      label: 'Server',
      title: 'Jednou předrenderovat',
      body: 'Server jednou převede výkres na balíček ACEX. Další otevření přeskočí parsování DWG a načtou geometrii určenou k prohlížení.',
      points: [
        'Rychlejší první vykreslení a nižší špičková paměť na telefonech a tabletech',
        'Převod jednou, stejný výkres se otevírá mnohokrát',
        'Pro posun, zoom, vrstvy a měření',
      ],
    },
  ],
  fitTitle: 'Kdy se hodí předrender na serveru',
  fitLead:
    'Když většina lidí výkres prohlíží a neupravuje entity, jednorázová cena převodu na serveru se obvykle vyplatí.',
  fitItems: [
    'Projektové portály, odkazy ke sdílení a knihovny, kde se stejný soubor otevírá znovu a znovu',
    'Týmy v terénu na telefonech a slabších tabletech',
    'Publikování a sdílení, které unese jeden převod na pozadí',
    'Produkty, které přijmou větší stažení výměnou za předvídatelné otevření',
  ],
  renderNote:
    'Mnoho produktů nabízí obojí. Živé parsování zůstává pro ty, kdo potřebují plnou klientskou pipeline. Předrender je výchozí otevření pro ostatní.',
  articleLabel: 'Přečíst srovnání',
  sampleLabel: 'Otevřít ukázku',
}
