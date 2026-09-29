/** Localized copy for the Solutions / use-cases page. */
export interface UseCasesCopy {
  metaTitle: string
  metaDescription: string
  metaKeywords: string
  eyebrow: string
  title: string
  lead: string
  primaryCta: string
  primaryHref: string
  secondaryCta: string
  secondaryHref: string
  cases: { id: string; title: string; body: string; href: string; cta: string }[]
}

export const useCasesEn: UseCasesCopy = {
  metaTitle: 'Use Cases — Web CAD for Construction, Manufacturing, GIS & AI | MLightCAD',
  metaDescription:
    'Embed DWG/DXF into construction, manufacturing, GIS, document management, and AI CAD workflows — browser-native, no CAD server.',
  metaKeywords:
    'CAD SaaS, construction drawings browser, manufacturing DWG, GIS CAD, AI CAD, document management DWG',
  eyebrow: 'Solutions',
  title: 'Put CAD where your users already work',
  lead: 'Teams do not want another desktop CAD seat. They want drawings inside the products they already ship — in the browser, on-device, without a conversion farm.',
  primaryCta: 'Build with CAD SDK',
  primaryHref: '/cad-sdk.html',
  secondaryCta: 'Try CAD Viewer',
  secondaryHref: 'https://mlightcad.github.io/cad-viewer/',
  cases: [
    {
      id: 'construction',
      title: 'Construction',
      body: 'Review construction drawings directly in the browser — field teams, PMs, and partners open the same DWG/DXF without installing AutoCAD.',
      href: '/cad-sdk.html',
      cta: 'Embed a viewer',
    },
    {
      id: 'manufacturing',
      title: 'Manufacturing',
      body: 'Embed DWG/DXF viewing into MES, ERP, or PLM so operators and planners inspect parts and layouts inside the tools they already use.',
      href: '/cad-sdk.html',
      cta: 'See the SDK',
    },
    {
      id: 'gis',
      title: 'GIS',
      body: 'Combine CAD drawings with geospatial workflows — open engineering drawings next to maps without standing up a separate CAD stack.',
      href: '/cad-sdk.html',
      cta: 'Integrate CAD',
    },
    {
      id: 'dms',
      title: 'Document management',
      body: 'Preview engineering drawings in your DMS or vault without desktop CAD software — pan, zoom, layers, and measure in the tab.',
      href: '/iframe-plugin.html',
      cta: 'iframe embed',
    },
    {
      id: 'ai',
      title: 'AI CAD',
      body: 'Parse and understand CAD drawings inside AI workflows — turn DWG/DXF into structured data your agents and models can reason over.',
      href: '/dwg-engine.html',
      cta: 'DWG Engine',
    },
  ],
}

export const useCasesZh: UseCasesCopy = {
  ...useCasesEn,
  metaTitle: '用例 — 面向施工、制造、GIS 与 AI 的 Web CAD | MLightCAD',
  metaDescription:
    '把 DWG/DXF 嵌入施工、制造、GIS、文档管理与 AI CAD 工作流 — 浏览器原生，无需 CAD 服务器。',
  eyebrow: '解决方案',
  title: '把 CAD 放到用户已经在用的产品里',
  lead: '团队不想再买一套桌面 CAD。他们想在已有产品里直接看图 — 浏览器内、端侧完成，没有转换农场。',
  primaryCta: '用 CAD SDK 构建',
  secondaryCta: '试用 CAD Viewer',
  cases: [
    {
      id: 'construction',
      title: '施工与工程协同',
      body: '在浏览器中直接审阅施工图 — 现场、项目经理与合作方打开同一份 DWG/DXF，无需安装 AutoCAD。',
      href: '/cad-sdk.html',
      cta: '嵌入 Viewer',
    },
    {
      id: 'manufacturing',
      title: '制造业',
      body: '把 DWG/DXF 查看嵌入 MES、ERP 或 PLM，让操作员与计划员在现有工具内检查零件与布局。',
      href: '/cad-sdk.html',
      cta: '了解 SDK',
    },
    {
      id: 'gis',
      title: 'GIS',
      body: '把 CAD 图纸与地理空间工作流结合 — 在地图旁打开工程图，无需另建 CAD 技术栈。',
      href: '/cad-sdk.html',
      cta: '集成 CAD',
    },
    {
      id: 'dms',
      title: '文档管理',
      body: '在 DMS 或图纸库中预览工程图，无需桌面 CAD — 在标签页内平移、缩放、图层与测量。',
      href: '/iframe-plugin.html',
      cta: 'iframe 嵌入',
    },
    {
      id: 'ai',
      title: 'AI CAD',
      body: '在 AI 工作流中解析与理解 CAD 图纸 — 把 DWG/DXF 变成智能体与模型可推理的结构化数据。',
      href: '/dwg-engine.html',
      cta: 'DWG Engine',
    },
  ],
}

export const useCasesJa: UseCasesCopy = {
  ...useCasesEn,
  metaTitle: 'ユースケース — 建設・製造・GIS・AI 向け Web CAD | MLightCAD',
  metaDescription:
    'DWG/DXF を建設・製造・GIS・文書管理・AI CAD ワークフローへ — ブラウザネイティブ、CAD サーバー不要。',
  eyebrow: 'ソリューション',
  title: 'ユーザーが既に使う場所に CAD を置く',
  lead: 'チームは別のデスクトップ CAD 席を欲しくありません。既に出荷している製品の中で図面を見たい — ブラウザ内、端末側、変換ファームなし。',
  primaryCta: 'CAD SDK で構築',
  secondaryCta: 'CAD Viewer を試す',
  cases: [
    {
      id: 'construction',
      title: '建設',
      body: '施工図をブラウザで直接レビュー — 現場・PM・協力会社が同じ DWG/DXF を開き、AutoCAD 不要。',
      href: '/cad-sdk.html',
      cta: 'ビューアを埋め込む',
    },
    {
      id: 'manufacturing',
      title: '製造',
      body: 'MES / ERP / PLM に DWG/DXF 表示を埋め込み、現場と計画が既存ツール内で部品・レイアウトを確認。',
      href: '/cad-sdk.html',
      cta: 'SDK を見る',
    },
    {
      id: 'gis',
      title: 'GIS',
      body: 'CAD 図面と地理空間ワークフローを組み合わせ — 別 CAD スタックなしで地図の横に図面を開く。',
      href: '/cad-sdk.html',
      cta: 'CAD を統合',
    },
    {
      id: 'dms',
      title: '文書管理',
      body: 'DMS や図面庫でエンジニアリング図面をプレビュー — タブ内でパン・ズーム・レイヤー・計測。',
      href: '/iframe-plugin.html',
      cta: 'iframe 埋め込み',
    },
    {
      id: 'ai',
      title: 'AI CAD',
      body: 'AI ワークフロー内で CAD 図面を解析・理解 — DWG/DXF をエージェントが扱える構造化データへ。',
      href: '/dwg-engine.html',
      cta: 'DWG Engine',
    },
  ],
}

export const useCasesKo: UseCasesCopy = {
  ...useCasesEn,
  metaTitle: '사용 사례 — 건설·제조·GIS·AI용 Web CAD | MLightCAD',
  metaDescription:
    '건설, 제조, GIS, 문서 관리, AI CAD 워크플로에 DWG/DXF를 임베드 — 브라우저 네이티브, CAD 서버 불필요.',
  eyebrow: '솔루션',
  title: '사용자가 이미 일하는 곳에 CAD를 두세요',
  lead: '팀은 또 다른 데스크톱 CAD 좌석을 원하지 않습니다. 이미 출하한 제품 안에서 도면을 보고 싶어 합니다 — 브라우저, 온디바이스, 변환 팜 없음.',
  primaryCta: 'CAD SDK로 구축',
  secondaryCta: 'CAD Viewer 체험',
  cases: [
    {
      id: 'construction',
      title: '건설',
      body: '브라우저에서 시공 도면을 바로 리뷰 — 현장, PM, 협력사가 같은 DWG/DXF를 열고 AutoCAD 설치가 필요 없습니다.',
      href: '/cad-sdk.html',
      cta: '뷰어 임베드',
    },
    {
      id: 'manufacturing',
      title: '제조',
      body: 'MES·ERP·PLM에 DWG/DXF 보기를 넣어 작업자와 계획이 기존 도구 안에서 부품과 레이아웃을 확인합니다.',
      href: '/cad-sdk.html',
      cta: 'SDK 보기',
    },
    {
      id: 'gis',
      title: 'GIS',
      body: 'CAD 도면과 지리공간 워크플로를 결합 — 별도 CAD 스택 없이 지도 옆에서 공학 도면을 엽니다.',
      href: '/cad-sdk.html',
      cta: 'CAD 통합',
    },
    {
      id: 'dms',
      title: '문서 관리',
      body: 'DMS나 도면 저장소에서 공학 도면을 미리보기 — 탭에서 팬·줌·레이어·측정.',
      href: '/iframe-plugin.html',
      cta: 'iframe 임베드',
    },
    {
      id: 'ai',
      title: 'AI CAD',
      body: 'AI 워크플로 안에서 CAD 도면을 파싱·이해 — DWG/DXF를 에이전트가 다룰 구조화 데이터로 바꿉니다.',
      href: '/dwg-engine.html',
      cta: 'DWG Engine',
    },
  ],
}

export const useCasesEs: UseCasesCopy = {
  ...useCasesEn,
  metaTitle: 'Casos de uso — CAD web para construcción, fabricación, GIS e IA | MLightCAD',
  metaDescription:
    'Incruste DWG/DXF en construcción, fabricación, GIS, gestión documental y flujos de IA CAD — nativo en el navegador, sin servidor CAD.',
  eyebrow: 'Soluciones',
  title: 'Ponga el CAD donde sus usuarios ya trabajan',
  lead: 'Los equipos no quieren otro asiento de CAD de escritorio. Quieren dibujos dentro de los productos que ya envían — en el navegador, en el dispositivo, sin granja de conversión.',
  primaryCta: 'Construir con CAD SDK',
  secondaryCta: 'Probar CAD Viewer',
  cases: [
    {
      id: 'construction',
      title: 'Construcción',
      body: 'Revise planos de obra en el navegador — campo, PMs y socios abren el mismo DWG/DXF sin instalar AutoCAD.',
      href: '/cad-sdk.html',
      cta: 'Incrustar un visor',
    },
    {
      id: 'manufacturing',
      title: 'Fabricación',
      body: 'Incruste visualización DWG/DXF en MES, ERP o PLM para que operadores y planificadores inspeccionen piezas y layouts en las herramientas que ya usan.',
      href: '/cad-sdk.html',
      cta: 'Ver el SDK',
    },
    {
      id: 'gis',
      title: 'GIS',
      body: 'Combine dibujos CAD con flujos geoespaciales — abra planos de ingeniería junto a mapas sin un stack CAD aparte.',
      href: '/cad-sdk.html',
      cta: 'Integrar CAD',
    },
    {
      id: 'dms',
      title: 'Gestión documental',
      body: 'Previsualice planos de ingeniería en su DMS sin CAD de escritorio — pan, zoom, capas y medición en la pestaña.',
      href: '/iframe-plugin.html',
      cta: 'Embed iframe',
    },
    {
      id: 'ai',
      title: 'IA CAD',
      body: 'Analice y comprenda dibujos CAD en flujos de IA — convierta DWG/DXF en datos estructurados para agentes y modelos.',
      href: '/dwg-engine.html',
      cta: 'DWG Engine',
    },
  ],
}

export const useCasesPt: UseCasesCopy = {
  ...useCasesEn,
  metaTitle: 'Casos de uso — CAD web para construção, manufatura, GIS e IA | MLightCAD',
  metaDescription:
    'Incorpore DWG/DXF em construção, manufatura, GIS, gestão documental e fluxos de IA CAD — nativo no navegador, sem servidor CAD.',
  eyebrow: 'Soluções',
  title: 'Coloque o CAD onde seus usuários já trabalham',
  lead: 'Times não querem outro assento de CAD desktop. Querem desenhos dentro dos produtos que já enviam — no navegador, no dispositivo, sem fazenda de conversão.',
  primaryCta: 'Construir com CAD SDK',
  secondaryCta: 'Experimentar CAD Viewer',
  cases: [
    {
      id: 'construction',
      title: 'Construção',
      body: 'Revise desenhos de obra no navegador — campo, PMs e parceiros abrem o mesmo DWG/DXF sem instalar AutoCAD.',
      href: '/cad-sdk.html',
      cta: 'Incorporar um viewer',
    },
    {
      id: 'manufacturing',
      title: 'Manufatura',
      body: 'Incorpore visualização DWG/DXF em MES, ERP ou PLM para operadores e planejadores inspecionarem peças e layouts nas ferramentas que já usam.',
      href: '/cad-sdk.html',
      cta: 'Ver o SDK',
    },
    {
      id: 'gis',
      title: 'GIS',
      body: 'Combine desenhos CAD com fluxos geoespaciais — abra plantas de engenharia ao lado de mapas sem um stack CAD separado.',
      href: '/cad-sdk.html',
      cta: 'Integrar CAD',
    },
    {
      id: 'dms',
      title: 'Gestão documental',
      body: 'Pré-visualize desenhos de engenharia no DMS sem CAD desktop — pan, zoom, camadas e medição na aba.',
      href: '/iframe-plugin.html',
      cta: 'Embed iframe',
    },
    {
      id: 'ai',
      title: 'IA CAD',
      body: 'Analise e entenda desenhos CAD em fluxos de IA — transforme DWG/DXF em dados estruturados para agentes e modelos.',
      href: '/dwg-engine.html',
      cta: 'DWG Engine',
    },
  ],
}

export const useCasesRu: UseCasesCopy = {
  ...useCasesEn,
  metaTitle: 'Сценарии — веб-CAD для строительства, производства, GIS и ИИ | MLightCAD',
  metaDescription:
    'Встраивайте DWG/DXF в строительство, производство, GIS, документооборот и ИИ-CAD — нативно в браузере, без CAD-сервера.',
  eyebrow: 'Решения',
  title: 'Разместите CAD там, где уже работают пользователи',
  lead: 'Командам не нужно ещё одно место desktop CAD. Им нужны чертежи внутри уже поставляемых продуктов — в браузере, на устройстве, без фермы конвертации.',
  primaryCta: 'Собрать на CAD SDK',
  secondaryCta: 'Попробовать CAD Viewer',
  cases: [
    {
      id: 'construction',
      title: 'Строительство',
      body: 'Просматривайте строительные чертежи прямо в браузере — полевые команды, PM и партнёры открывают тот же DWG/DXF без AutoCAD.',
      href: '/cad-sdk.html',
      cta: 'Встроить viewer',
    },
    {
      id: 'manufacturing',
      title: 'Производство',
      body: 'Встройте просмотр DWG/DXF в MES, ERP или PLM, чтобы операторы и планировщики смотрели детали и планировки в привычных инструментах.',
      href: '/cad-sdk.html',
      cta: 'Смотреть SDK',
    },
    {
      id: 'gis',
      title: 'GIS',
      body: 'Сочетайте CAD-чертежи с геопространственными сценариями — открывайте инженерные чертежи рядом с картами без отдельного CAD-стека.',
      href: '/cad-sdk.html',
      cta: 'Интегрировать CAD',
    },
    {
      id: 'dms',
      title: 'Документооборот',
      body: 'Предпросмотр инженерных чертежей в DMS без desktop CAD — pan, zoom, слои и измерение во вкладке.',
      href: '/iframe-plugin.html',
      cta: 'iframe embed',
    },
    {
      id: 'ai',
      title: 'ИИ CAD',
      body: 'Разбирайте и понимайте CAD-чертежи в ИИ-потоках — превращайте DWG/DXF в структурированные данные для агентов и моделей.',
      href: '/dwg-engine.html',
      cta: 'DWG Engine',
    },
  ],
}

export const useCasesCs: UseCasesCopy = {
  ...useCasesEn,
  metaTitle: 'Případy použití — webové CAD pro stavebnictví, výrobu, GIS a AI | MLightCAD',
  metaDescription:
    'Vložte DWG/DXF do stavebnictví, výroby, GIS, správy dokumentů a AI CAD workflow — nativně v prohlížeči, bez CAD serveru.',
  eyebrow: 'Řešení',
  title: 'Dejte CAD tam, kde uživatelé už pracují',
  lead: 'Týmy nechtějí další desktopové CAD místo. Chtějí výkresy uvnitř produktů, které už dodávají — v prohlížeči, na zařízení, bez konverzní farmy.',
  primaryCta: 'Stavět s CAD SDK',
  secondaryCta: 'Vyzkoušet CAD Viewer',
  cases: [
    {
      id: 'construction',
      title: 'Stavebnictví',
      body: 'Prohlížejte stavební výkresy přímo v prohlížeči — terén, PM i partneři otevřou stejný DWG/DXF bez instalace AutoCADu.',
      href: '/cad-sdk.html',
      cta: 'Vložit viewer',
    },
    {
      id: 'manufacturing',
      title: 'Výroba',
      body: 'Vložte prohlížení DWG/DXF do MES, ERP nebo PLM, aby operátoři a plánovači kontrolovali díly a layouty v nástrojích, které už používají.',
      href: '/cad-sdk.html',
      cta: 'Zobrazit SDK',
    },
    {
      id: 'gis',
      title: 'GIS',
      body: 'Kombinujte CAD výkresy s geoprostorovými workflows — otevírejte technické výkresy vedle map bez samostatného CAD stacku.',
      href: '/cad-sdk.html',
      cta: 'Integrovat CAD',
    },
    {
      id: 'dms',
      title: 'Správa dokumentů',
      body: 'Náhled technických výkresů v DMS bez desktop CADu — pan, zoom, vrstvy a měření v záložce.',
      href: '/iframe-plugin.html',
      cta: 'iframe embed',
    },
    {
      id: 'ai',
      title: 'AI CAD',
      body: 'Parsujte a chápejte CAD výkresy v AI workflows — převeďte DWG/DXF na strukturovaná data pro agenty a modely.',
      href: '/dwg-engine.html',
      cta: 'DWG Engine',
    },
  ],
}
