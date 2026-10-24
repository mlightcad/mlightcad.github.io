/** Shared shape for CAD Editor product page copy. */

/** One feature block on the CAD Editor product page. */
export interface CadEditorFeature {
  id: string
  title: string
  body: string
  image: string
  imageAlt: string
}

/** Try-drawing string overrides for the CAD Editor product demo. */
export interface CadEditorTryDrawingCopy {
  barIdle: string
  title: string
  body: string
  caption: string
}

/** Localized copy for the CAD Editor product page. */
export interface CadEditorCopy {
  metaTitle: string
  metaDescription: string
  metaKeywords: string
  eyebrow: string
  title: string
  lead: string
  /** Primary hero CTA — scrolls to the in-page write-mode demo. */
  openCta: string
  demoCta: string
  demoHref: string
  viewerCta: string
  viewerHref: string
  githubCta: string
  githubHref: string
  heroImageAlt: string
  highlightsLabel: string
  highlights: string[]
  /** Write-mode try-drawing widget copy (merged onto shared `tryDrawing`). */
  tryDrawing: CadEditorTryDrawingCopy
  featuresEyebrow: string
  featuresTitle: string
  featuresLead: string
  features: CadEditorFeature[]
  useCasesTitle: string
  useCasesLead: string
  useCasesImage: string
  useCasesImageAlt: string
  useCases: string[]
  ctaTitle: string
  ctaLead: string
}

const DEMO_HREF = 'https://mlightcad.github.io/cad-viewer/'
const GITHUB_HREF = 'https://github.com/mlightcad/cad-viewer'

const FEATURE_IMAGES = {
  geometryEdit: '/assets/cad-editor/geometry-edit.svg',
  measureReview: '/assets/cad-editor/measure-review.svg',
  privacy: '/assets/cad-editor/privacy.svg',
  sameEngine: '/assets/cad-editor/same-engine.svg',
  embed: '/assets/cad-editor/embed.svg',
} as const

const USE_CASES_IMAGE = '/assets/cad-editor/use-cases.svg'

/** English copy for the CAD Editor product page. */
export const cadEditorEn: CadEditorCopy = {
  metaTitle: 'CAD Editor — AutoCAD-like DWG/DXF Editing in the Browser | MLightCAD',
  metaDescription:
    'Browser CAD Editor with an AutoCAD-like ribbon, the same commands and shortcuts, and the same muscle memory — edit DWG/DXF with almost no learning curve.',
  metaKeywords:
    'CAD Editor, AutoCAD alternative, DWG editor, DXF editor, browser CAD, AutoCAD commands, CAD shortcuts, MLightCAD',
  eyebrow: 'Open source',
  title: 'CAD Editor',
  lead: 'An AutoCAD-like experience in the browser — the same ribbon layout, the same commands, the same shortcuts, the same muscle memory. Open a DWG/DXF and start editing with almost no learning curve.',
  openCta: 'Open file',
  demoCta: 'Try Live Demo',
  demoHref: DEMO_HREF,
  viewerCta: 'View CAD Viewer',
  viewerHref: '/cad-viewer.html',
  githubCta: 'View on GitHub',
  githubHref: GITHUB_HREF,
  heroImageAlt: 'CAD Editor with an AutoCAD-like ribbon editing a DWG drawing in the browser',
  highlightsLabel: 'Why it feels familiar',
  highlights: [
    'Same AutoCAD-like ribbon, commands, and shortcuts — your muscle memory carries over',
    'Same editing feel in the browser — no desktop seat, no upload, almost no learning curve',
  ],
  tryDrawing: {
    barIdle: 'edit your drawing',
    title: 'Open a drawing to edit',
    body: 'Drop a DWG or DXF here. Opens with an AutoCAD-like ribbon in write mode — edit in this tab, never uploaded.',
    caption: '.dwg · .dxf · AutoCAD-like · write mode · no upload',
  },
  featuresEyebrow: 'Product highlights',
  featuresTitle: 'Desktop CAD familiarity, built for the web',
  featuresLead:
    'Keep the AutoCAD-like commands and shortcuts your team already knows — then run them entirely in the browser on the same engine as CAD Viewer.',
  features: [
    {
      id: 'geometry-edit',
      title: 'Edit geometry in place',
      body: 'Select entities and modify geometry with grips and edit tools that follow familiar CAD patterns. Built for real drawing changes — not a static preview you export back to desktop CAD.',
      image: FEATURE_IMAGES.geometryEdit,
      imageAlt: 'Grip editing and geometry modification in the browser CAD Editor',
    },
    {
      id: 'measure-review',
      title: 'Measure and review in the same session',
      body: 'Measure distances, add review markup, and edit on one canvas. Keep stakeholders in a single browser session instead of bouncing between a viewer and a desktop seat.',
      image: FEATURE_IMAGES.measureReview,
      imageAlt: 'Measure, markup, and edit on the same CAD canvas',
    },
    {
      id: 'privacy',
      title: 'Privacy by design',
      body: 'Parsing and editing run entirely on-device. No conversion farm, no upload pipeline, no remote service — suited to confidential projects, regulated industries, and air-gapped environments.',
      image: FEATURE_IMAGES.privacy,
      imageAlt: 'Drawings stay on the local device during editing',
    },
    {
      id: 'same-engine',
      title: 'One engine for view and edit',
      body: 'Viewer, Editor, plugins, and agents read and write the same entities. Ship one browser-native CAD stack instead of stitching separate view-only and edit-only tools.',
      image: FEATURE_IMAGES.sameEngine,
      imageAlt: 'Shared CAD engine powering viewer, editor, and plugins',
    },
    {
      id: 'embed',
      title: 'Ship editing inside your product',
      body: 'Embed editing through the CAD SDK on the same stack as read-only viewing. Give users “open drawing, make a change” without a separate desktop workflow.',
      image: FEATURE_IMAGES.embed,
      imageAlt: 'CAD Editor embedded inside a host product UI',
    },
  ],
  useCasesTitle: 'Who it’s for',
  useCasesLead:
    'From design offices to SaaS products — anyone who wants AutoCAD-like editing in the browser without another desktop seat.',
  useCasesImage: USE_CASES_IMAGE,
  useCasesImageAlt: 'Use cases for design teams, SaaS, AEC, and privacy-first organizations',
  useCases: [
    'CAD users who want the same commands and shortcuts without installing another desktop seat',
    'SaaS and construction collaboration products that must open drawings and allow edits in the browser',
    'Manufacturing and AEC workflows that tweak annotations or geometry in the field or on the web',
    'Privacy-sensitive organizations that cannot upload drawings to third-party servers',
  ],
  ctaTitle: 'Ready to edit with the commands you already know?',
  ctaLead: 'Open the live demo — no install, no account, no upload, almost no learning curve.',
}

/** Chinese copy for the CAD Editor product page. */
export const cadEditorZh: CadEditorCopy = {
  metaTitle: 'CAD Editor — 浏览器内类 AutoCAD 的 DWG/DXF 编辑 | MLightCAD',
  metaDescription:
    '浏览器 CAD Editor：类 AutoCAD 功能区、相同命令与快捷键、相同操作习惯 — 几乎零学习成本即可编辑 DWG/DXF。',
  metaKeywords:
    'CAD Editor, AutoCAD 替代, DWG 编辑器, DXF 编辑器, 浏览器 CAD, AutoCAD 命令, CAD 快捷键, MLightCAD',
  eyebrow: '开源产品',
  title: 'CAD Editor',
  lead: '浏览器中的类 AutoCAD 体验 — 相同的功能区布局、相同的命令、相同的快捷键、相同的操作习惯。打开 DWG/DXF 即可开始编辑，几乎零学习成本。',
  openCta: '打开文件',
  demoCta: '在线演示',
  demoHref: DEMO_HREF,
  viewerCta: '查看 CAD Viewer',
  viewerHref: '/cad-viewer.html',
  githubCta: '查看 GitHub',
  githubHref: GITHUB_HREF,
  heroImageAlt: '浏览器中带类 AutoCAD 功能区、正在编辑 DWG 图纸的 CAD Editor',
  highlightsLabel: '为何感觉熟悉',
  highlights: [
    '相同的类 AutoCAD 功能区、命令与快捷键 — 肌肉记忆直接沿用',
    '浏览器中同样的编辑手感 — 无需桌面席位、无需上传，几乎零学习成本',
  ],
  tryDrawing: {
    barIdle: '编辑你的图纸',
    title: '打开图纸进行编辑',
    body: '将 DWG 或 DXF 拖到这里。以类 AutoCAD 功能区、写入模式打开 — 在本标签页内编辑，永不上传。',
    caption: '.dwg · .dxf · 类 AutoCAD · 写入模式 · 不上传',
  },
  featuresEyebrow: '产品亮点',
  featuresTitle: '桌面 CAD 的熟悉感，为 Web 而生',
  featuresLead:
    '保留团队已熟悉的类 AutoCAD 命令与快捷键 — 再在浏览器中基于与 CAD Viewer 相同的引擎完整运行。',
  features: [
    {
      id: 'geometry-edit',
      title: '就地编辑几何',
      body: '选择实体，用夹点与编辑工具按熟悉的 CAD 方式修改几何。面向真实改图，而不是只能预览再导回桌面 CAD 的静态查看。',
      image: FEATURE_IMAGES.geometryEdit,
      imageAlt: '浏览器 CAD Editor 中的夹点编辑与几何修改',
    },
    {
      id: 'measure-review',
      title: '同一会话内测量与审阅',
      body: '在同一画布上测量距离、添加审阅批注并编辑。让相关方留在同一浏览器会话，不必在查看器与桌面席位间来回切换。',
      image: FEATURE_IMAGES.measureReview,
      imageAlt: '在同一 CAD 画布上测量、批注与编辑',
    },
    {
      id: 'privacy',
      title: '隐私从架构上保障',
      body: '解析与编辑全部在本地完成。无转换农场、无上传链路、无远程服务 — 适合保密项目、受监管行业与离线环境。',
      image: FEATURE_IMAGES.privacy,
      imageAlt: '编辑过程中图纸保留在本地设备',
    },
    {
      id: 'same-engine',
      title: '查看与编辑共用一套引擎',
      body: 'Viewer、Editor、插件与 Agent 读写同一套实体。交付一套浏览器原生 CAD 技术栈，而不是拼凑只读与只写两套工具。',
      image: FEATURE_IMAGES.sameEngine,
      imageAlt: '驱动查看器、编辑器与插件的共用 CAD 引擎',
    },
    {
      id: 'embed',
      title: '把编辑能力嵌入你的产品',
      body: '通过 CAD SDK 在与只读查看相同的技术栈上嵌入编辑。让用户「打开图纸、直接改」——无需另走桌面流程。',
      image: FEATURE_IMAGES.embed,
      imageAlt: '嵌入宿主产品界面中的 CAD Editor',
    },
  ],
  useCasesTitle: '适用场景',
  useCasesLead:
    '从设计院到 SaaS 产品 — 任何希望在浏览器中获得类 AutoCAD 编辑、又不想再装桌面席位的团队。',
  useCasesImage: USE_CASES_IMAGE,
  useCasesImageAlt: '设计团队、SaaS、AEC 与隐私优先组织的适用场景',
  useCases: [
    '希望沿用相同命令与快捷键、又不想再装桌面席位的 CAD 用户',
    '需要在浏览器中打开图纸并允许编辑的 SaaS 与施工协作产品',
    '在现场或 Web 上微调标注与几何的制造与 AEC 工作流',
    '无法将图纸上传至第三方服务器的隐私敏感组织',
  ],
  ctaTitle: '准备好用你已熟悉的命令开始编辑了吗？',
  ctaLead: '打开在线演示 — 无需安装、无需账号、无需上传，几乎零学习成本。',
}

/** Japanese copy for the CAD Editor product page. */
export const cadEditorJa: CadEditorCopy = {
  metaTitle: 'CAD Editor — ブラウザで AutoCAD ライクな DWG/DXF 編集 | MLightCAD',
  metaDescription:
    'ブラウザ CAD Editor：AutoCAD ライクなリボン、同じコマンドとショートカット、同じ操作感 — ほぼ学習コストなしで DWG/DXF を編集。',
  metaKeywords:
    'CAD Editor, AutoCAD 代替, DWG エディタ, DXF エディタ, ブラウザ CAD, AutoCAD コマンド, CAD ショートカット, MLightCAD',
  eyebrow: 'オープンソース',
  title: 'CAD Editor',
  lead: 'ブラウザでの AutoCAD ライクな体験 — 同じリボン構成、同じコマンド、同じショートカット、同じ操作感。DWG/DXF を開いてすぐ編集を開始でき、学習コストはほぼゼロです。',
  openCta: 'ファイルを開く',
  demoCta: 'ライブデモ',
  demoHref: DEMO_HREF,
  viewerCta: 'CAD Viewer を見る',
  viewerHref: '/cad-viewer.html',
  githubCta: 'GitHub で見る',
  githubHref: GITHUB_HREF,
  heroImageAlt: 'ブラウザで AutoCAD ライクなリボンを使い DWG を編集する CAD Editor',
  highlightsLabel: '馴染みやすい理由',
  highlights: [
    'AutoCAD ライクなリボン・コマンド・ショートカットはそのまま — 筋肉記憶がそのまま活きる',
    'ブラウザでも同じ編集感 — デスクトップ席不要、アップロード不要、ほぼ学習コストなし',
  ],
  tryDrawing: {
    barIdle: '図面を編集',
    title: '図面を開いて編集',
    body: 'DWG または DXF をここにドロップ。AutoCAD ライクなリボンの書き込みモードで開きます — このタブ内で編集、アップロードしません。',
    caption: '.dwg · .dxf · AutoCAD ライク · 書き込みモード · アップロードなし',
  },
  featuresEyebrow: '製品ハイライト',
  featuresTitle: 'デスクトップ CAD の馴染みやすさを Web 向けに',
  featuresLead:
    'チームがすでに知っている AutoCAD ライクなコマンドとショートカットを維持しつつ、CAD Viewer と同じエンジンでブラウザ上で実行します。',
  features: [
    {
      id: 'geometry-edit',
      title: 'その場でジオメトリを編集',
      body: 'エンティティを選択し、馴染みのある CAD パターンのグリップと編集ツールでジオメトリを変更。静的プレビューではなく、実際の図面変更向けです。',
      image: FEATURE_IMAGES.geometryEdit,
      imageAlt: 'ブラウザ CAD Editor でのグリップ編集とジオメトリ変更',
    },
    {
      id: 'measure-review',
      title: '同じセッションで計測とレビュー',
      body: '距離計測、レビュー用マークアップ、編集を 1 つのキャンバスで。ビューアとデスクトップ席を行き来せず、関係者を 1 つのブラウザセッションに留めます。',
      image: FEATURE_IMAGES.measureReview,
      imageAlt: '同じ CAD キャンバスでの計測・マークアップ・編集',
    },
    {
      id: 'privacy',
      title: '設計としてのプライバシー',
      body: '解析と編集はすべて端末上で実行。変換ファームもアップロードパイプラインも遠隔サービスもなし — 機密案件、規制業種、エアギャップ環境に適します。',
      image: FEATURE_IMAGES.privacy,
      imageAlt: '編集中も図面はローカル端末に留まる',
    },
    {
      id: 'same-engine',
      title: '表示と編集で 1 つのエンジン',
      body: 'Viewer、Editor、プラグイン、エージェントが同じエンティティを読み書き。閲覧専用と編集専用を継ぎ接ぎせず、ブラウザネイティブな CAD スタックを 1 つ提供します。',
      image: FEATURE_IMAGES.sameEngine,
      imageAlt: 'ビューア・エディタ・プラグインを支える共通 CAD エンジン',
    },
    {
      id: 'embed',
      title: '製品内に編集を組み込む',
      body: '読み取り専用ビューと同じスタックの CAD SDK で編集を埋め込み。「図面を開いて変更する」を、別途デスクトップ作業なしでユーザーに提供します。',
      image: FEATURE_IMAGES.embed,
      imageAlt: 'ホスト製品 UI に埋め込まれた CAD Editor',
    },
  ],
  useCasesTitle: '想定ユーザー',
  useCasesLead:
    '設計事務所から SaaS まで — デスクトップ席を増やさず、ブラウザで AutoCAD ライクな編集を求めるすべての人へ。',
  useCasesImage: USE_CASES_IMAGE,
  useCasesImageAlt: '設計チーム、SaaS、AEC、プライバシー重視組織向けのユースケース',
  useCases: [
    '同じコマンドとショートカットを使い、別のデスクトップ席を入れたくない CAD ユーザー',
    'ブラウザで図面を開き編集を許可する必要がある SaaS と建設コラボレーション製品',
    '現場や Web で注記やジオメトリを微調整する製造・AEC ワークフロー',
    '図面をサードパーティサーバーへアップロードできないプライバシー重視の組織',
  ],
  ctaTitle: 'すでに知っているコマンドで編集を始めますか？',
  ctaLead: 'ライブデモを開く — インストール不要、アカウント不要、アップロード不要、ほぼ学習コストなし。',
}

/** Korean copy for the CAD Editor product page. */
export const cadEditorKo: CadEditorCopy = {
  metaTitle: 'CAD Editor — 브라우저에서 AutoCAD처럼 DWG/DXF 편집 | MLightCAD',
  metaDescription:
    '브라우저 CAD Editor: AutoCAD와 비슷한 리본, 같은 명령과 단축키, 같은 조작감 — 거의 학습 비용 없이 DWG/DXF를 편집합니다.',
  metaKeywords:
    'CAD Editor, AutoCAD 대안, DWG 편집기, DXF 편집기, 브라우저 CAD, AutoCAD 명령, CAD 단축키, MLightCAD',
  eyebrow: '오픈 소스',
  title: 'CAD Editor',
  lead: '브라우저의 AutoCAD와 비슷한 경험 — 같은 리본 레이아웃, 같은 명령, 같은 단축키, 같은 조작감. DWG/DXF를 열고 거의 학습 비용 없이 바로 편집을 시작하세요.',
  openCta: '파일 열기',
  demoCta: '라이브 데모',
  demoHref: DEMO_HREF,
  viewerCta: 'CAD Viewer 보기',
  viewerHref: '/cad-viewer.html',
  githubCta: 'GitHub에서 보기',
  githubHref: GITHUB_HREF,
  heroImageAlt: '브라우저에서 AutoCAD와 비슷한 리본으로 DWG를 편집하는 CAD Editor',
  highlightsLabel: '익숙하게 느껴지는 이유',
  highlights: [
    'AutoCAD와 비슷한 리본·명령·단축키 그대로 — 근육 기억을 그대로 활용',
    '브라우저에서도 같은 편집 감각 — 데스크톱 시트 불필요, 업로드 불필요, 거의 학습 비용 없음',
  ],
  tryDrawing: {
    barIdle: '도면 편집',
    title: '도면을 열어 편집',
    body: 'DWG 또는 DXF를 여기에 놓으세요. AutoCAD와 비슷한 리본의 쓰기 모드로 엽니다 — 이 탭에서 편집하며 업로드되지 않습니다.',
    caption: '.dwg · .dxf · AutoCAD와 비슷 · 쓰기 모드 · 업로드 없음',
  },
  featuresEyebrow: '제품 하이라이트',
  featuresTitle: '데스크톱 CAD의 익숙함, 웹을 위해',
  featuresLead:
    '팀이 이미 아는 AutoCAD와 비슷한 명령과 단축키를 유지한 채, CAD Viewer와 같은 엔진으로 브라우저에서 실행합니다.',
  features: [
    {
      id: 'geometry-edit',
      title: '제자리에서 지오메트리 편집',
      body: '엔티티를 선택하고 익숙한 CAD 패턴의 그립과 편집 도구로 지오메트리를 수정합니다. 정적 미리보기가 아니라 실제 도면 변경을 위한 기능입니다.',
      image: FEATURE_IMAGES.geometryEdit,
      imageAlt: '브라우저 CAD Editor의 그립 편집과 지오메트리 수정',
    },
    {
      id: 'measure-review',
      title: '같은 세션에서 측정과 검토',
      body: '거리 측정, 검토 마크업, 편집을 한 캔버스에서. 뷰어와 데스크톱 시트 사이를 오가지 않고 이해관계자를 하나의 브라우저 세션에 유지합니다.',
      image: FEATURE_IMAGES.measureReview,
      imageAlt: '같은 CAD 캔버스에서 측정·마크업·편집',
    },
    {
      id: 'privacy',
      title: '설계부터 프라이버시',
      body: '파싱과 편집은 전부 기기에서 실행됩니다. 변환 팜, 업로드 파이프라인, 원격 서비스 없음 — 기밀 프로젝트, 규제 산업, 에어갭 환경에 적합합니다.',
      image: FEATURE_IMAGES.privacy,
      imageAlt: '편집 중에도 도면은 로컬 기기에 유지',
    },
    {
      id: 'same-engine',
      title: '보기와 편집을 위한 하나의 엔진',
      body: 'Viewer, Editor, 플러그인, 에이전트가 같은 엔티티를 읽고 씁니다. 읽기 전용과 편집 전용 도구를 짜깁기하지 않고, 브라우저 네이티브 CAD 스택 하나를 제공합니다.',
      image: FEATURE_IMAGES.sameEngine,
      imageAlt: '뷰어·편집기·플러그인을 구동하는 공통 CAD 엔진',
    },
    {
      id: 'embed',
      title: '제품 안에 편집을 탑재',
      body: '읽기 전용 보기와 같은 스택의 CAD SDK로 편집을 임베드합니다. 별도 데스크톱 워크플로 없이 사용자에게 “도면 열고 바로 수정”을 제공합니다.',
      image: FEATURE_IMAGES.embed,
      imageAlt: '호스트 제품 UI에 임베드된 CAD Editor',
    },
  ],
  useCasesTitle: '이런 분께 적합합니다',
  useCasesLead:
    '설계 사무소부터 SaaS까지 — 데스크톱 시트를 추가하지 않고 브라우저에서 AutoCAD와 비슷한 편집을 원하는 모든 분께.',
  useCasesImage: USE_CASES_IMAGE,
  useCasesImageAlt: '설계 팀, SaaS, AEC, 프라이버시 우선 조직을 위한 사용 사례',
  useCases: [
    '같은 명령과 단축키를 쓰고 또 다른 데스크톱 시트를 설치하고 싶지 않은 CAD 사용자',
    '브라우저에서 도면을 열고 편집을 허용해야 하는 SaaS 및 건설 협업 제품',
    '현장이나 웹에서 주석·지오메트리를 미세 조정하는 제조·AEC 워크플로',
    '도면을 타사 서버에 업로드할 수 없는 프라이버시 민감 조직',
  ],
  ctaTitle: '이미 아는 명령으로 편집을 시작할까요?',
  ctaLead: '라이브 데모를 여세요 — 설치 없음, 계정 없음, 업로드 없음, 거의 학습 비용 없음.',
}

/** Spanish copy for the CAD Editor product page. */
export const cadEditorEs: CadEditorCopy = {
  metaTitle: 'CAD Editor — Edición DWG/DXF tipo AutoCAD en el navegador | MLightCAD',
  metaDescription:
    'CAD Editor en el navegador con cinta tipo AutoCAD, los mismos comandos y atajos, y la misma memoria muscular — edite DWG/DXF casi sin curva de aprendizaje.',
  metaKeywords:
    'CAD Editor, alternativa a AutoCAD, editor DWG, editor DXF, CAD en navegador, comandos AutoCAD, atajos CAD, MLightCAD',
  eyebrow: 'Código abierto',
  title: 'CAD Editor',
  lead: 'Una experiencia tipo AutoCAD en el navegador — la misma cinta, los mismos comandos, los mismos atajos, la misma memoria muscular. Abra un DWG/DXF y empiece a editar casi sin curva de aprendizaje.',
  openCta: 'Abrir archivo',
  demoCta: 'Probar demo en vivo',
  demoHref: DEMO_HREF,
  viewerCta: 'Ver CAD Viewer',
  viewerHref: '/cad-viewer.html',
  githubCta: 'Ver en GitHub',
  githubHref: GITHUB_HREF,
  heroImageAlt: 'CAD Editor con cinta tipo AutoCAD editando un DWG en el navegador',
  highlightsLabel: 'Por qué se siente familiar',
  highlights: [
    'Misma cinta, comandos y atajos tipo AutoCAD — su memoria muscular se traslada',
    'Misma sensación de edición en el navegador — sin asiento de escritorio, sin subida, casi sin curva de aprendizaje',
  ],
  tryDrawing: {
    barIdle: 'edite su dibujo',
    title: 'Abra un dibujo para editar',
    body: 'Suelte un DWG o DXF aquí. Se abre con una cinta tipo AutoCAD en modo escritura — edite en esta pestaña, nunca se sube.',
    caption: '.dwg · .dxf · tipo AutoCAD · modo escritura · sin subida',
  },
  featuresEyebrow: 'Aspectos destacados',
  featuresTitle: 'Familiaridad de CAD de escritorio, pensada para la web',
  featuresLead:
    'Conserve los comandos y atajos tipo AutoCAD que su equipo ya conoce — y ejecútelos por completo en el navegador con el mismo motor que CAD Viewer.',
  features: [
    {
      id: 'geometry-edit',
      title: 'Edite geometría in situ',
      body: 'Seleccione entidades y modifique la geometría con grips y herramientas de edición que siguen patrones CAD familiares. Pensado para cambios reales — no una vista previa estática que vuelva a exportar al CAD de escritorio.',
      image: FEATURE_IMAGES.geometryEdit,
      imageAlt: 'Edición con grips y modificación de geometría en el CAD Editor del navegador',
    },
    {
      id: 'measure-review',
      title: 'Mida y revise en la misma sesión',
      body: 'Mida distancias, añada marcas de revisión y edite en un solo lienzo. Mantenga a las partes interesadas en una sola sesión del navegador en lugar de saltar entre un visor y un asiento de escritorio.',
      image: FEATURE_IMAGES.measureReview,
      imageAlt: 'Medir, marcar y editar en el mismo lienzo CAD',
    },
    {
      id: 'privacy',
      title: 'Privacidad por diseño',
      body: 'El análisis y la edición se ejecutan por completo en el dispositivo. Sin granja de conversión, sin canal de subida, sin servicio remoto — adecuado para proyectos confidenciales, industrias reguladas y entornos aislados.',
      image: FEATURE_IMAGES.privacy,
      imageAlt: 'Los dibujos permanecen en el dispositivo local durante la edición',
    },
    {
      id: 'same-engine',
      title: 'Un motor para ver y editar',
      body: 'Viewer, Editor, plugins y agentes leen y escriben las mismas entidades. Ofrezca una sola pila CAD nativa del navegador en lugar de ensamblar herramientas solo de lectura y solo de edición.',
      image: FEATURE_IMAGES.sameEngine,
      imageAlt: 'Motor CAD compartido que impulsa el visor, el editor y los plugins',
    },
    {
      id: 'embed',
      title: 'Integre la edición en su producto',
      body: 'Incruste la edición con el CAD SDK en la misma pila que la visualización de solo lectura. Ofrezca a los usuarios “abrir el dibujo y hacer un cambio” sin un flujo de escritorio aparte.',
      image: FEATURE_IMAGES.embed,
      imageAlt: 'CAD Editor incrustado en la UI de un producto anfitrión',
    },
  ],
  useCasesTitle: 'Para quién es',
  useCasesLead:
    'Desde oficinas de diseño hasta productos SaaS — cualquiera que quiera edición tipo AutoCAD en el navegador sin otro asiento de escritorio.',
  useCasesImage: USE_CASES_IMAGE,
  useCasesImageAlt: 'Casos de uso para equipos de diseño, SaaS, AEC y organizaciones que priorizan la privacidad',
  useCases: [
    'Usuarios de CAD que quieren los mismos comandos y atajos sin instalar otro asiento de escritorio',
    'Productos SaaS y de colaboración en construcción que deben abrir dibujos y permitir ediciones en el navegador',
    'Flujos de fabricación y AEC que ajustan anotaciones o geometría en campo o en la web',
    'Organizaciones sensibles a la privacidad que no pueden subir dibujos a servidores de terceros',
  ],
  ctaTitle: '¿Listo para editar con los comandos que ya conoce?',
  ctaLead: 'Abra la demo en vivo — sin instalación, sin cuenta, sin subida, casi sin curva de aprendizaje.',
}

/** Portuguese copy for the CAD Editor product page. */
export const cadEditorPt: CadEditorCopy = {
  metaTitle: 'CAD Editor — Edição DWG/DXF tipo AutoCAD no navegador | MLightCAD',
  metaDescription:
    'CAD Editor no navegador com faixa tipo AutoCAD, os mesmos comandos e atalhos, e a mesma memória muscular — edite DWG/DXF com quase nenhuma curva de aprendizado.',
  metaKeywords:
    'CAD Editor, alternativa ao AutoCAD, editor DWG, editor DXF, CAD no navegador, comandos AutoCAD, atalhos CAD, MLightCAD',
  eyebrow: 'Código aberto',
  title: 'CAD Editor',
  lead: 'Uma experiência tipo AutoCAD no navegador — a mesma faixa, os mesmos comandos, os mesmos atalhos, a mesma memória muscular. Abra um DWG/DXF e comece a editar com quase nenhuma curva de aprendizado.',
  openCta: 'Abrir arquivo',
  demoCta: 'Experimentar demo ao vivo',
  demoHref: DEMO_HREF,
  viewerCta: 'Ver CAD Viewer',
  viewerHref: '/cad-viewer.html',
  githubCta: 'Ver no GitHub',
  githubHref: GITHUB_HREF,
  heroImageAlt: 'CAD Editor com faixa tipo AutoCAD editando um DWG no navegador',
  highlightsLabel: 'Por que parece familiar',
  highlights: [
    'Mesma faixa, comandos e atalhos tipo AutoCAD — sua memória muscular continua valendo',
    'Mesma sensação de edição no navegador — sem licença de desktop, sem upload, quase sem curva de aprendizado',
  ],
  tryDrawing: {
    barIdle: 'edite seu desenho',
    title: 'Abra um desenho para editar',
    body: 'Solte um DWG ou DXF aqui. Abre com uma faixa tipo AutoCAD em modo de escrita — edite nesta aba, nunca é enviado.',
    caption: '.dwg · .dxf · tipo AutoCAD · modo de escrita · sem upload',
  },
  featuresEyebrow: 'Destaques do produto',
  featuresTitle: 'Familiaridade de CAD de desktop, feita para a web',
  featuresLead:
    'Mantenha os comandos e atalhos tipo AutoCAD que sua equipe já conhece — e execute-os inteiramente no navegador no mesmo mecanismo do CAD Viewer.',
  features: [
    {
      id: 'geometry-edit',
      title: 'Edite geometria no local',
      body: 'Selecione entidades e modifique a geometria com grips e ferramentas de edição que seguem padrões CAD familiares. Feito para mudanças reais — não uma prévia estática para exportar de volta ao CAD de desktop.',
      image: FEATURE_IMAGES.geometryEdit,
      imageAlt: 'Edição com grips e modificação de geometria no CAD Editor do navegador',
    },
    {
      id: 'measure-review',
      title: 'Meça e revise na mesma sessão',
      body: 'Meça distâncias, adicione marcações de revisão e edite em um único canvas. Mantenha as partes interessadas em uma única sessão do navegador em vez de alternar entre um visualizador e uma licença de desktop.',
      image: FEATURE_IMAGES.measureReview,
      imageAlt: 'Medir, marcar e editar no mesmo canvas CAD',
    },
    {
      id: 'privacy',
      title: 'Privacidade por design',
      body: 'A análise e a edição rodam inteiramente no dispositivo. Sem fazenda de conversão, sem pipeline de upload, sem serviço remoto — adequado a projetos confidenciais, indústrias reguladas e ambientes isolados.',
      image: FEATURE_IMAGES.privacy,
      imageAlt: 'Os desenhos permanecem no dispositivo local durante a edição',
    },
    {
      id: 'same-engine',
      title: 'Um mecanismo para ver e editar',
      body: 'Viewer, Editor, plugins e agentes leem e escrevem as mesmas entidades. Entregue uma única pilha CAD nativa do navegador em vez de juntar ferramentas só de leitura e só de edição.',
      image: FEATURE_IMAGES.sameEngine,
      imageAlt: 'Mecanismo CAD compartilhado que alimenta o visualizador, o editor e os plugins',
    },
    {
      id: 'embed',
      title: 'Leve a edição para dentro do seu produto',
      body: 'Incorpore a edição pelo CAD SDK na mesma pilha da visualização somente leitura. Ofereça aos usuários “abrir o desenho e fazer uma alteração” sem um fluxo de desktop separado.',
      image: FEATURE_IMAGES.embed,
      imageAlt: 'CAD Editor incorporado na UI de um produto anfitrião',
    },
  ],
  useCasesTitle: 'Para quem é',
  useCasesLead:
    'De escritórios de projeto a produtos SaaS — quem quiser edição tipo AutoCAD no navegador sem outra licença de desktop.',
  useCasesImage: USE_CASES_IMAGE,
  useCasesImageAlt: 'Casos de uso para equipes de projeto, SaaS, AEC e organizações que priorizam privacidade',
  useCases: [
    'Usuários de CAD que querem os mesmos comandos e atalhos sem instalar outra licença de desktop',
    'Produtos SaaS e de colaboração em construção que precisam abrir desenhos e permitir edições no navegador',
    'Fluxos de fabricação e AEC que ajustam anotações ou geometria em campo ou na web',
    'Organizações sensíveis à privacidade que não podem enviar desenhos a servidores de terceiros',
  ],
  ctaTitle: 'Pronto para editar com os comandos que você já conhece?',
  ctaLead: 'Abra a demo ao vivo — sem instalação, sem conta, sem upload, quase sem curva de aprendizado.',
}

/** Russian copy for the CAD Editor product page. */
export const cadEditorRu: CadEditorCopy = {
  metaTitle: 'CAD Editor — Редактирование DWG/DXF в браузере в стиле AutoCAD | MLightCAD',
  metaDescription:
    'Браузерный CAD Editor с лентой в стиле AutoCAD, теми же командами и сочетаниями клавиш, той же мышечной памятью — редактируйте DWG/DXF почти без обучения.',
  metaKeywords:
    'CAD Editor, альтернатива AutoCAD, редактор DWG, редактор DXF, браузерный CAD, команды AutoCAD, сочетания CAD, MLightCAD',
  eyebrow: 'Открытый исходный код',
  title: 'CAD Editor',
  lead: 'Опыт в стиле AutoCAD в браузере — та же лента, те же команды, те же сочетания клавиш, та же мышечная память. Откройте DWG/DXF и начните редактировать почти без обучения.',
  openCta: 'Открыть файл',
  demoCta: 'Живое демо',
  demoHref: DEMO_HREF,
  viewerCta: 'Смотреть CAD Viewer',
  viewerHref: '/cad-viewer.html',
  githubCta: 'Смотреть на GitHub',
  githubHref: GITHUB_HREF,
  heroImageAlt: 'CAD Editor с лентой в стиле AutoCAD редактирует DWG в браузере',
  highlightsLabel: 'Почему это привычно',
  highlights: [
    'Та же лента, команды и сочетания в стиле AutoCAD — мышечная память переносится',
    'То же ощущение правки в браузере — без десктопного места, без загрузки, почти без обучения',
  ],
  tryDrawing: {
    barIdle: 'редактируйте чертёж',
    title: 'Откройте чертёж для правки',
    body: 'Перетащите сюда DWG или DXF. Откроется с лентой в стиле AutoCAD в режиме записи — правка в этой вкладке, без загрузки.',
    caption: '.dwg · .dxf · как AutoCAD · режим записи · без загрузки',
  },
  featuresEyebrow: 'Возможности продукта',
  featuresTitle: 'Привычность десктопного CAD, созданная для веба',
  featuresLead:
    'Сохраните команды и сочетания в стиле AutoCAD, которые команда уже знает — и запускайте их целиком в браузере на том же движке, что и CAD Viewer.',
  features: [
    {
      id: 'geometry-edit',
      title: 'Правка геометрии на месте',
      body: 'Выбирайте объекты и меняйте геометрию ручками и инструментами правки по знакомым CAD-паттернам. Для реальных изменений чертежа — не статичный просмотр с выгрузкой обратно в десктопный CAD.',
      image: FEATURE_IMAGES.geometryEdit,
      imageAlt: 'Правка ручками и изменение геометрии в браузерном CAD Editor',
    },
    {
      id: 'measure-review',
      title: 'Измерение и проверка в одной сессии',
      body: 'Измеряйте расстояния, добавляйте пометки проверки и редактируйте на одном холсте. Держите заинтересованных сторон в одной сессии браузера, а не переключайтесь между просмотрщиком и десктопным местом.',
      image: FEATURE_IMAGES.measureReview,
      imageAlt: 'Измерение, пометки и правка на одном CAD-холсте',
    },
    {
      id: 'privacy',
      title: 'Конфиденциальность по архитектуре',
      body: 'Разбор и правка выполняются полностью на устройстве. Без фермы конвертации, без цепочки загрузки, без удалённого сервиса — подходит для конфиденциальных проектов, регулируемых отраслей и изолированных сред.',
      image: FEATURE_IMAGES.privacy,
      imageAlt: 'Чертежи остаются на локальном устройстве во время правки',
    },
    {
      id: 'same-engine',
      title: 'Один движок для просмотра и правки',
      body: 'Viewer, Editor, плагины и агенты читают и пишут одни и те же объекты. Поставляйте один браузерный CAD-стек вместо склейки инструментов только для просмотра и только для правки.',
      image: FEATURE_IMAGES.sameEngine,
      imageAlt: 'Общий CAD-движок для просмотрщика, редактора и плагинов',
    },
    {
      id: 'embed',
      title: 'Встройте правку в свой продукт',
      body: 'Встраивайте правку через CAD SDK на том же стеке, что и просмотр только для чтения. Дайте пользователям «открыть чертёж и внести изменение» без отдельного десктопного процесса.',
      image: FEATURE_IMAGES.embed,
      imageAlt: 'CAD Editor, встроенный в UI продукта-хоста',
    },
  ],
  useCasesTitle: 'Кому это подходит',
  useCasesLead:
    'От проектных бюро до SaaS — всем, кому нужна правка в стиле AutoCAD в браузере без ещё одного десктопного места.',
  useCasesImage: USE_CASES_IMAGE,
  useCasesImageAlt: 'Сценарии для проектных команд, SaaS, AEC и организаций с приоритетом конфиденциальности',
  useCases: [
    'Пользователи CAD, которым нужны те же команды и сочетания без установки ещё одного десктопного места',
    'SaaS и продукты строительной совместной работы, которым нужно открывать чертежи и разрешать правку в браузере',
    'Производственные и AEC-процессы, где правят аннотации или геометрию в поле или в вебе',
    'Организации с жёсткими требованиями к конфиденциальности, которые не могут загружать чертежи на сторонние серверы',
  ],
  ctaTitle: 'Готовы править командами, которые уже знаете?',
  ctaLead: 'Откройте живое демо — без установки, без аккаунта, без загрузки, почти без обучения.',
}

/** Czech copy for the CAD Editor product page. */
export const cadEditorCs: CadEditorCopy = {
  metaTitle: 'CAD Editor — Úpravy DWG/DXF v prohlížeči ve stylu AutoCAD | MLightCAD',
  metaDescription:
    'CAD Editor v prohlížeči s pásem ve stylu AutoCAD, stejnými příkazy a zkratkami a stejnou svalovou pamětí — upravujte DWG/DXF téměř bez učení.',
  metaKeywords:
    'CAD Editor, alternativa k AutoCAD, editor DWG, editor DXF, CAD v prohlížeči, příkazy AutoCAD, zkratky CAD, MLightCAD',
  eyebrow: 'Open source',
  title: 'CAD Editor',
  lead: 'Zážitek ve stylu AutoCAD v prohlížeči — stejný pás, stejné příkazy, stejné zkratky, stejná svalová paměť. Otevřete DWG/DXF a začněte upravovat téměř bez učení.',
  openCta: 'Otevřít soubor',
  demoCta: 'Vyzkoušet živé demo',
  demoHref: DEMO_HREF,
  viewerCta: 'Zobrazit CAD Viewer',
  viewerHref: '/cad-viewer.html',
  githubCta: 'Zobrazit na GitHubu',
  githubHref: GITHUB_HREF,
  heroImageAlt: 'CAD Editor s pásem ve stylu AutoCAD upravující DWG v prohlížeči',
  highlightsLabel: 'Proč působí povědomě',
  highlights: [
    'Stejný pás, příkazy a zkratky ve stylu AutoCAD — svalová paměť se přenáší',
    'Stejný pocit úprav v prohlížeči — bez desktopové licence, bez nahrávání, téměř bez učení',
  ],
  tryDrawing: {
    barIdle: 'upravte výkres',
    title: 'Otevřete výkres k úpravě',
    body: 'Přetáhněte sem DWG nebo DXF. Otevře se s pásem ve stylu AutoCAD v režimu zápisu — úpravy v této kartě, nikdy se nenahrává.',
    caption: '.dwg · .dxf · ve stylu AutoCAD · režim zápisu · bez nahrávání',
  },
  featuresEyebrow: 'Hlavní body produktu',
  featuresTitle: 'Známé desktopové CAD, postavené pro web',
  featuresLead:
    'Zachovejte příkazy a zkratky ve stylu AutoCAD, které tým už zná — a spusťte je celé v prohlížeči na stejném enginu jako CAD Viewer.',
  features: [
    {
      id: 'geometry-edit',
      title: 'Upravujte geometrii na místě',
      body: 'Vyberte entity a měňte geometrii grips a editačními nástroji podle známých CAD vzorů. Pro skutečné změny výkresu — ne statický náhled k exportu zpět do desktopového CAD.',
      image: FEATURE_IMAGES.geometryEdit,
      imageAlt: 'Úpravy grips a změna geometrie v CAD Editoru v prohlížeči',
    },
    {
      id: 'measure-review',
      title: 'Měřte a kontrolujte ve stejné relaci',
      body: 'Měřte vzdálenosti, přidávejte kontrolní značky a upravujte na jednom plátně. Udržte zainteresované strany v jedné relaci prohlížeče místo přeskakování mezi prohlížečem a desktopovou licencí.',
      image: FEATURE_IMAGES.measureReview,
      imageAlt: 'Měření, značky a úpravy na stejném CAD plátně',
    },
    {
      id: 'privacy',
      title: 'Soukromí od návrhu',
      body: 'Parsování a úpravy běží celé na zařízení. Bez konverzní farmy, bez nahrávací pipeline, bez vzdálené služby — vhodné pro důvěrné projekty, regulovaná odvětví a izolovaná prostředí.',
      image: FEATURE_IMAGES.privacy,
      imageAlt: 'Výkresy zůstávají během úprav na lokálním zařízení',
    },
    {
      id: 'same-engine',
      title: 'Jeden engine pro prohlížení i úpravy',
      body: 'Viewer, Editor, pluginy a agenti čtou a zapisují stejné entity. Dodávejte jeden prohlížečový CAD stack místo skládání nástrojů jen pro čtení a jen pro úpravy.',
      image: FEATURE_IMAGES.sameEngine,
      imageAlt: 'Sdílený CAD engine pohánějící prohlížeč, editor a pluginy',
    },
    {
      id: 'embed',
      title: 'Vložte úpravy do svého produktu',
      body: 'Vložte úpravy přes CAD SDK na stejném stacku jako prohlížení jen pro čtení. Dejte uživatelům „otevřít výkres a provést změnu“ bez samostatného desktopového postupu.',
      image: FEATURE_IMAGES.embed,
      imageAlt: 'CAD Editor vložený do UI hostitelského produktu',
    },
  ],
  useCasesTitle: 'Pro koho je',
  useCasesLead:
    'Od projekčních kanceláří po SaaS — pro každého, kdo chce úpravy ve stylu AutoCAD v prohlížeči bez další desktopové licence.',
  useCasesImage: USE_CASES_IMAGE,
  useCasesImageAlt: 'Případy použití pro projekční týmy, SaaS, AEC a organizace s důrazem na soukromí',
  useCases: [
    'Uživatelé CAD, kteří chtějí stejné příkazy a zkratky bez instalace další desktopové licence',
    'SaaS a produkty stavební spolupráce, které musí otevírat výkresy a povolit úpravy v prohlížeči',
    'Výrobní a AEC postupy, které ladí anotace nebo geometrii v terénu či na webu',
    'Organizace citlivé na soukromí, které nemohou nahrávat výkresy na servery třetích stran',
  ],
  ctaTitle: 'Připraveni upravovat příkazy, které už znáte?',
  ctaLead: 'Otevřete živé demo — bez instalace, bez účtu, bez nahrávání, téměř bez učení.',
}
