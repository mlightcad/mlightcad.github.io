/** Localized copy for the AI + CAD product page. */
export interface AiCadCopy {
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
  painEyebrow: string
  painTitle: string
  painLead: string
  painItems: { title: string; body: string }[]
  scenariosEyebrow: string
  scenariosTitle: string
  scenariosLead: string
  scenarios: { id: string; title: string; body: string; outcome: string }[]
  waysEyebrow: string
  waysTitle: string
  waysLead: string
  ways: { id: string; title: string; body: string; cta: string; href: string }[]
  differenceTitle: string
  differenceLead: string
  differenceItems: { title: string; body: string }[]
  ctaTitle: string
  ctaLead: string
  ctaPrimary: string
  ctaPrimaryHref: string
  ctaSecondary: string
  ctaSecondaryHref: string
  ctaDevLabel: string
  ctaDevHref: string
}

const VIEWER_DEMO = 'https://mlightcad.github.io/cad-viewer/'
const DEV_ARTICLE =
  'https://dev.to/mlightcad/letting-ai-write-code-against-your-drawings-the-mlightcad-mcp-server-3e6e'

export const aiCadEn: AiCadCopy = {
  metaTitle: 'AI + CAD — Smarter Drawing Workflows | MLightCAD',
  metaDescription:
    'Use AI with your DWG/DXF drawings: understand sheets, extract BOMs and title blocks, edit in batches, and review for issues — inside the browser or from your AI tools.',
  metaKeywords:
    'AI CAD, AI drawing, DWG AI, DXF AI, CAD agent, intelligent drawing review, BOM extraction, title block, MLightCAD',
  eyebrow: 'AI + CAD',
  title: 'AI that works on your drawings',
  lead: 'Stop digging through layers by hand. Ask in plain language — extract data, check issues, and change drawings while the work stays on the CAD canvas.',
  heroImageAlt: 'AI assisting with a CAD drawing: understand, extract, edit, and review',
  primaryCta: 'Try it in CAD Viewer',
  primaryHref: VIEWER_DEMO,
  secondaryCta: 'See what it can do',
  secondaryHref: '#scenarios',
  painEyebrow: 'The reality',
  painTitle: 'Drawings are full of work that should not be manual',
  painLead:
    'Teams already open DWG/DXF every day. The slow part is reading frames, rebuilding tables, hunting inconsistencies, and repeating the same edits.',
  painItems: [
    {
      title: 'Information locked in geometry',
      body: 'BOMs, notes, and title blocks often look like tables to people — and like scattered lines and text to software.',
    },
    {
      title: 'Reviews that burn hours',
      body: 'Checking layers, sizes, duplicates, or missing tags is repetitive. Mistakes slip through when people are tired.',
    },
    {
      title: 'Edits that do not scale',
      body: 'Renaming layers, isolating sheets, or fixing the same pattern across files should not mean clicking one entity at a time.',
    },
  ],
  scenariosEyebrow: 'Use cases',
  scenariosTitle: 'What AI + CAD helps you do',
  scenariosLead:
    'Built for the jobs people already do with drawings — not a list of developer APIs.',
  scenarios: [
    {
      id: 'understand',
      title: 'Intelligent drawing understanding',
      body: 'Ask what is on the sheet: which layers matter, what the assembly shows, where the title block sits, and how content is organized.',
      outcome: 'Get oriented in seconds instead of panning for minutes.',
    },
    {
      id: 'extract',
      title: 'Intelligent information extraction',
      body: 'Pull BOMs, schedules, title-block fields, notes, and legends into structured tables or JSON for search, ERP, or documents.',
      outcome: 'Turn drawing content into data you can reuse.',
    },
    {
      id: 'edit',
      title: 'Intelligent drawing edits',
      body: 'Describe batch changes — move groups, rename layers, isolate a frame, insert standard blocks — and apply them on the live drawing.',
      outcome: 'Finish repetitive edits without a custom macro for every request.',
    },
    {
      id: 'review',
      title: 'Intelligent drawing review',
      body: 'Flag unusual sizes, overlapping geometry, empty layers, or missing attributes. Capture a preview so you can verify before you trust the result.',
      outcome: 'Catch issues earlier with AI as a second pair of eyes.',
    },
  ],
  waysEyebrow: 'How to use it',
  waysTitle: 'Where the AI meets your workflow',
  waysLead:
    'One shared drawing intelligence — available as a built-in agent in our products, or through an MCP server in the AI tools you already use.',
  ways: [
    {
      id: 'in-app',
      title: 'Built-in agent in CAD Viewer & CAD Editor',
      body: 'CAD Viewer and CAD Editor ship with a CAD Agent. Open a drawing, chat in natural language, and watch it understand, extract, edit, or review the sheet you have open.',
      cta: 'Try the agent in CAD Viewer',
      href: VIEWER_DEMO,
    },
    {
      id: 'mcp',
      title: 'MCP server for Claude, Cursor, and more',
      body: 'Prefer your own AI assistant? The mlightcad MCP server lets Claude, Cursor, Codex, and other MCP clients open drawings and do the same work — without leaving your coding or chat environment.',
      cta: 'Read how MCP connects',
      href: DEV_ARTICLE,
    },
  ],
  differenceTitle: 'Why this feels different',
  differenceLead:
    'We do not try to invent a new CAD button for every request. AI reasons about the drawing, then acts through a controlled CAD workbench.',
  differenceItems: [
    {
      title: 'Work stays on the drawing',
      body: 'Heavy filtering and edits run in the CAD environment. You get answers and files — not a flood of raw geometry in the chat.',
    },
    {
      title: 'Results you can check',
      body: 'Ask for summaries, structured tables, or a visual preview. Keep humans in the loop when the stakes are high.',
    },
    {
      title: 'Grows with every new capability',
      body: 'New drawing skills become available to the in-app agent and external assistants together — one brain, multiple places to use it.',
    },
  ],
  ctaTitle: 'Put AI on the drawings you already open',
  ctaLead: 'Start in the browser. Bring your preferred AI tools when you are ready to automate.',
  ctaPrimary: 'Try CAD Viewer',
  ctaPrimaryHref: VIEWER_DEMO,
  ctaSecondary: 'Explore CAD SDK',
  ctaSecondaryHref: '/cad-sdk.html',
  ctaDevLabel: 'Technical deep dive on DEV',
  ctaDevHref: DEV_ARTICLE,
}

export const aiCadZh: AiCadCopy = {
  ...aiCadEn,
  metaTitle: 'AI + CAD — 更聪明的图纸工作流 | MLightCAD',
  metaDescription:
    '让 AI 处理你的 DWG/DXF：理解图面、提取 BOM 与标题栏、批量修改、辅助审图 — 可在浏览器内完成，也可接入你常用的 AI 工具。',
  metaKeywords:
    'AI CAD, AI 图纸, DWG AI, DXF AI, CAD 智能体, 智能审图, BOM 提取, 标题栏, MLightCAD',
  eyebrow: 'AI + CAD',
  title: '让 AI 真正处理你的图纸',
  lead: '别再靠手翻图层。用自然语言提问 — 提取数据、排查问题、修改图面，工作都发生在 CAD 画布上。',
  heroImageAlt: 'AI 协助处理 CAD 图纸：理解、提取、修改与审图',
  primaryCta: '在 CAD Viewer 试用',
  secondaryCta: '看看能做什么',
  painEyebrow: '现状',
  painTitle: '图纸里有大量不该再靠手做的工作',
  painLead:
    '团队每天都在打开 DWG/DXF。真正耗时的是读图框、还原表格、找不一致，以及重复改同一类内容。',
  painItems: [
    {
      title: '信息锁在几何里',
      body: 'BOM、注释、标题栏对人眼像表格 — 对软件却往往只是散落的线段与文字。',
    },
    {
      title: '审图吞噬时间',
      body: '查图层、尺寸、重叠或缺失标注很枯燥。人一累，问题就容易漏。',
    },
    {
      title: '修改难以规模化',
      body: '重命名图层、按图框拆分、修同类问题，不该再逐个实体点选。',
    },
  ],
  scenariosEyebrow: '使用场景',
  scenariosTitle: 'AI + CAD 能帮你做什么',
  scenariosLead: '面向人们已经在做的图纸工作 — 而不是一份开发者 API 清单。',
  scenarios: [
    {
      id: 'understand',
      title: '智能图纸理解',
      body: '用自然语言问清图面：关键图层、装配表达什么、标题栏在哪、内容如何组织。',
      outcome: '几秒建立全局感，而不是拖着画布找半天。',
    },
    {
      id: 'extract',
      title: '智能图纸信息提取',
      body: '把 BOM、明细、标题栏字段、注释与图例抽成表格或结构化数据，便于检索、入库或对接业务系统。',
      outcome: '把图里的内容变成可复用的数据。',
    },
    {
      id: 'edit',
      title: '智能图纸修改',
      body: '描述批量变更 — 移动实体组、重命名图层、按图框隔离、插入标准块 — 直接作用在当前图纸上。',
      outcome: '重复修改不必再为每个需求写专用宏。',
    },
    {
      id: 'review',
      title: '智能审图',
      body: '标出异常尺寸、重叠几何、空图层或缺失属性；可生成预览，方便你核对后再采信结果。',
      outcome: '让 AI 当第二双眼睛，更早发现问题。',
    },
  ],
  waysEyebrow: '怎么用',
  waysTitle: 'AI 如何进入你的工作流',
  waysLead:
    '同一套图纸智能 — 既作为产品内置 Agent，也可通过 MCP Server 进入你已经在用的 AI 工具。',
  ways: [
    {
      id: 'in-app',
      title: 'CAD Viewer / CAD Editor 内置 Agent',
      body: 'CAD Viewer 与 CAD Editor 自带 CAD Agent。打开图纸，用自然语言对话，看着它理解、提取、修改或审阅当前图面。',
      cta: '在 CAD Viewer 试用 Agent',
      href: VIEWER_DEMO,
    },
    {
      id: 'mcp',
      title: '面向 Claude、Cursor 等的 MCP Server',
      body: '更想用自己的 AI 助手？mlightcad MCP Server 让 Claude、Cursor、Codex 等 MCP 客户端打开图纸并完成同类工作 — 不必离开你的编码或对话环境。',
      cta: '了解 MCP 如何接入',
      href: DEV_ARTICLE,
    },
  ],
  differenceTitle: '为什么体验不一样',
  differenceLead:
    '我们不为每个请求再做一个 CAD 按钮。AI 先理解意图，再通过受控的 CAD 工作台去执行。',
  differenceItems: [
    {
      title: '工作留在图纸上',
      body: '过滤与编辑在 CAD 环境内完成。你拿到的是结论与文件 — 而不是聊天里堆满的原始几何。',
    },
    {
      title: '结果可以核对',
      body: '可要求摘要、结构化表格或预览图。关键环节仍由人把关。',
    },
    {
      title: '能力一起成长',
      body: '新的图纸能力会同时进入应用内 Agent 与外部助手 — 一个大脑，多处可用。',
    },
  ],
  ctaTitle: '把 AI 放到你已经在打开的图纸上',
  ctaLead: '从浏览器开始。准备好自动化时，再接入你偏好的 AI 工具。',
  ctaPrimary: '试用 CAD Viewer',
  ctaSecondary: '了解 CAD SDK',
  ctaDevLabel: 'DEV 上的技术深潜',
}

export const aiCadJa: AiCadCopy = {
  ...aiCadEn,
  metaTitle: 'AI + CAD — より賢い図面ワークフロー | MLightCAD',
  metaDescription:
    'DWG/DXF で AI を活用：図面理解、BOM・表題欄の抽出、一括編集、レビュー支援。ブラウザ内でも、お好みの AI ツールからでも。',
  eyebrow: 'AI + CAD',
  title: '図面で動く AI',
  lead: 'レイヤーを手で探すのは終わりに。自然言語で依頼し、データ抽出・チェック・編集を CAD キャンバス上で進めます。',
  primaryCta: 'CAD Viewer で試す',
  secondaryCta: 'できることを見る',
}

export const aiCadKo: AiCadCopy = {
  ...aiCadEn,
  metaTitle: 'AI + CAD — 더 스마트한 도면 워크플로 | MLightCAD',
  metaDescription:
    'DWG/DXF에 AI를 적용하세요: 도면 이해, BOM·표제란 추출, 일괄 수정, 검토 지원. 브라우저에서, 또는 쓰는 AI 도구에서.',
  eyebrow: 'AI + CAD',
  title: '도면 위에서 일하는 AI',
  lead: '레이어를 손으로 뒤지지 마세요. 자연어로 요청하고, 추출·검토·수정을 CAD 캔버스에서 진행하세요.',
  primaryCta: 'CAD Viewer에서 체험',
  secondaryCta: '무엇을 할 수 있는지 보기',
}

export const aiCadEs: AiCadCopy = {
  ...aiCadEn,
  metaTitle: 'AI + CAD — Flujos de dibujo más inteligentes | MLightCAD',
  metaDescription:
    'Usa IA con tus DWG/DXF: entender planos, extraer BOM y cajetines, editar por lotes y revisar — en el navegador o desde tus herramientas de IA.',
  eyebrow: 'AI + CAD',
  title: 'IA que trabaja sobre tus planos',
  lead: 'Deja de buscar capas a mano. Pide en lenguaje natural: extrae datos, revisa problemas y edita el dibujo en el lienzo CAD.',
  primaryCta: 'Probar en CAD Viewer',
  secondaryCta: 'Ver qué puede hacer',
}

export const aiCadPt: AiCadCopy = {
  ...aiCadEn,
  metaTitle: 'AI + CAD — Fluxos de desenho mais inteligentes | MLightCAD',
  metaDescription:
    'Use IA com seus DWG/DXF: entender folhas, extrair BOM e carimbos, editar em lote e revisar — no navegador ou pelas suas ferramentas de IA.',
  eyebrow: 'AI + CAD',
  title: 'IA que trabalha nos seus desenhos',
  lead: 'Pare de vasculhar camadas à mão. Peça em linguagem natural: extraia dados, revise problemas e edite no canvas CAD.',
  primaryCta: 'Experimentar no CAD Viewer',
  secondaryCta: 'Ver o que pode fazer',
}

export const aiCadRu: AiCadCopy = {
  ...aiCadEn,
  metaTitle: 'AI + CAD — Более умные процессы с чертежами | MLightCAD',
  metaDescription:
    'ИИ для DWG/DXF: понимание листа, извлечение BOM и штампа, пакетные правки и проверка — в браузере или из ваших AI-инструментов.',
  eyebrow: 'AI + CAD',
  title: 'ИИ, который работает с чертежами',
  lead: 'Хватит искать слои вручную. Просите на обычном языке: извлекать данные, находить ошибки и править чертёж на холсте CAD.',
  primaryCta: 'Попробовать в CAD Viewer',
  secondaryCta: 'Что умеет',
}

export const aiCadCs: AiCadCopy = {
  ...aiCadEn,
  metaTitle: 'AI + CAD — Chytřejší práce s výkresy | MLightCAD',
  metaDescription:
    'AI nad DWG/DXF: porozumění listu, extrakce BOM a razítka, dávkové úpravy a kontrola — v prohlížeči nebo z vašich AI nástrojů.',
  eyebrow: 'AI + CAD',
  title: 'AI, které pracuje s výkresy',
  lead: 'Přestaňte ručně prohledávat hladiny. Požádejte přirozeným jazykem: extrahujte data, kontrolujte problémy a upravujte výkres na CAD plátně.',
  primaryCta: 'Vyzkoušet v CAD Vieweru',
  secondaryCta: 'Co umí',
}
