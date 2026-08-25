/** Shared shape for CAD Diff Viewer product page copy. */

/** One feature block on the CAD Diff Viewer product page. */
export interface CadDiffViewerFeature {
  id: string
  title: string
  body: string
  image: string
  imageAlt: string
}

/** Localized copy for the CAD Diff Viewer product page. */
export interface CadDiffViewerCopy {
  metaTitle: string
  metaDescription: string
  metaKeywords: string
  eyebrow: string
  title: string
  lead: string
  demoCta: string
  demoHref: string
  githubCta: string
  githubHref: string
  heroImageAlt: string
  highlightsLabel: string
  highlights: string[]
  featuresEyebrow: string
  featuresTitle: string
  featuresLead: string
  features: CadDiffViewerFeature[]
  useCasesTitle: string
  useCasesLead: string
  useCasesImage: string
  useCasesImageAlt: string
  useCases: string[]
  ctaTitle: string
  ctaLead: string
  relatedTitle: string
  related: { name: string; desc: string; href: string }[]
}

const DEMO_HREF = 'https://mlightcad.com/cad-viewer/cad-diff-viewer/'
const GITHUB_HREF =
  'https://github.com/mlightcad/cad-viewer/tree/main/packages/cad-diff-viewer'
const NPM_HREF = 'https://www.npmjs.com/package/@mlightcad/cad-diff-viewer'
const DOCS_HREF =
  'https://cad-viewer.readthedocs.io/en/latest/modules/_mlightcad_cad-diff-viewer.html'

const FEATURE_IMAGES = {
  visualDiff: '/assets/diff-viewer/visual-diff.svg',
  viewModes: '/assets/diff-viewer/view-modes.svg',
  filterViews: '/assets/diff-viewer/filter-views.svg',
  reviewTools: '/assets/diff-viewer/review-tools.svg',
  privacy: '/assets/diff-viewer/privacy.svg',
} as const

const USE_CASES_IMAGE = '/assets/diff-viewer/use-cases.svg'

/**
 * Shared related-link destinations with localized labels.
 *
 * @param labels - Localized name/desc pairs for each related link.
 */
function relatedLinks(labels: {
  demo: { name: string; desc: string }
  viewer: { name: string; desc: string }
  npm: { name: string; desc: string }
  docs: { name: string; desc: string }
  github: { name: string; desc: string }
}): CadDiffViewerCopy['related'] {
  return [
    { ...labels.demo, href: DEMO_HREF },
    { ...labels.viewer, href: 'https://mlightcad.github.io/cad-viewer/' },
    { ...labels.npm, href: NPM_HREF },
    { ...labels.docs, href: DOCS_HREF },
    { ...labels.github, href: GITHUB_HREF },
  ]
}

export const cadDiffViewerEn: CadDiffViewerCopy = {
  metaTitle: 'CAD Diff Viewer — Compare DWG/DXF Revisions in the Browser | MLightCAD',
  metaDescription:
    'Compare DWG/DXF drawing revisions in the browser. Spot added, deleted, and changed geometry instantly — fully client-side, no AutoCAD, no upload server.',
  metaKeywords:
    'CAD diff, DWG compare, DXF compare, drawing review, revision compare, browser CAD, MLightCAD',
  eyebrow: 'Open source',
  title: 'CAD Diff Viewer',
  lead: 'Compare DWG/DXF revisions in the browser — see what was added, deleted, or changed in seconds. No AutoCAD, no upload server, no waiting.',
  demoCta: 'Try Live Demo',
  demoHref: DEMO_HREF,
  githubCta: 'View on GitHub',
  githubHref: GITHUB_HREF,
  heroImageAlt: 'CAD Diff Viewer comparing two drawing revisions side by side',
  highlightsLabel: 'Why teams choose it',
  highlights: [
    'Runs entirely in the browser — drawings never leave the user’s device',
    'No desktop CAD required — open two revisions and start reviewing immediately',
    'Clear review colors — gray unchanged, red deleted, green added',
    'Filter by change type or entity type — focus on what matters',
  ],
  featuresEyebrow: 'Product highlights',
  featuresTitle: 'Drawing review, reimagined for the web',
  featuresLead:
    'Everything you need to compare revisions — without flipping between AutoCAD windows or exporting PDFs to squint at.',
  features: [
    {
      id: 'visual-diff',
      title: 'See every change at a glance',
      body: 'Drop an older revision on the left and a newer one on the right. The viewer classifies each entity and paints the drawing with a review-friendly palette — so reviewers focus on what changed, not on hunting through two files.',
      image: FEATURE_IMAGES.visualDiff,
      imageAlt: 'Side-by-side CAD comparison with color-coded changes',
    },
    {
      id: 'view-modes',
      title: 'Side-by-side or overlay',
      body: 'Split the screen for revision-to-revision walkthroughs, or stack both drawings on one canvas to catch subtle shifts. Switch modes to match how your team actually reviews drawings.',
      image: FEATURE_IMAGES.viewModes,
      imageAlt: 'Side-by-side and overlay comparison modes',
    },
    {
      id: 'filter-views',
      title: 'Filter by change or entity type',
      body: 'Isolate added, deleted, or modified geometry — or narrow the view to lines, circles, text, inserts, and other entity types. Cut through noise and review only the changes that matter for the current task.',
      image: FEATURE_IMAGES.filterViews,
      imageAlt: 'Filters for change type and CAD entity type',
    },
    {
      id: 'review-tools',
      title: 'Built for real review workflows',
      body: 'Jump through deleted, modified, and added items from a results panel. Generate revision clouds around change sets. Pan, zoom, and inspect geometry with the same responsive WebGL experience as CAD-Viewer.',
      image: FEATURE_IMAGES.reviewTools,
      imageAlt: 'Revision clouds and change navigation in CAD Diff Viewer',
    },
    {
      id: 'privacy',
      title: 'Privacy by design',
      body: 'Parsing and comparison happen entirely on-device. No conversion farm, no upload pipeline, no remote service — ideal for confidential projects, regulated industries, and air-gapped environments.',
      image: FEATURE_IMAGES.privacy,
      imageAlt: 'Drawings stay on the local device during comparison',
    },
  ],
  useCasesTitle: 'Who it’s for',
  useCasesLead: 'From design offices to SaaS products — anyone who needs faster, private drawing review.',
  useCasesImage: USE_CASES_IMAGE,
  useCasesImageAlt: 'Use cases for design teams, SaaS, AEC, and privacy-first organizations',
  useCases: [
    'Design teams comparing issued-for-construction drawing sets',
    'SaaS products adding drawing review next to issues, RFIs, or pull requests',
    'Architects and MEP engineers reviewing subcontractor revisions',
    'Privacy-sensitive organizations that cannot upload drawings to third-party servers',
  ],
  ctaTitle: 'Ready to compare your first revision pair?',
  ctaLead: 'Open the live demo in your browser — no install, no account, no upload.',
  relatedTitle: 'Explore further',
  related: relatedLinks({
    demo: { name: 'Live Demo', desc: 'Compare two DWG/DXF files now' },
    viewer: { name: 'CAD-Viewer', desc: 'Full browser DWG/DXF viewer & editor' },
    npm: { name: 'npm', desc: '@mlightcad/cad-diff-viewer' },
    docs: { name: 'API Docs', desc: 'Integration reference on Read the Docs' },
    github: {
      name: 'GitHub',
      desc: '/mlightcad/cad-viewer/tree/main/packages/cad-diff-viewer',
    },
  }),
}

export const cadDiffViewerZh: CadDiffViewerCopy = {
  metaTitle: 'CAD Diff Viewer — 浏览器内对比 DWG/DXF 修订版 | MLightCAD',
  metaDescription:
    '在浏览器中对比 DWG/DXF 图纸修订版，即时发现新增、删除与修改的几何 — 完全本地运行，无需 AutoCAD，无需上传服务器。',
  metaKeywords: 'CAD 对比, DWG 比较, DXF 比较, 图纸审阅, 修订版对比, 浏览器 CAD, MLightCAD',
  eyebrow: '开源产品',
  title: 'CAD Diff Viewer',
  lead: '在浏览器中对比 DWG/DXF 修订版 — 秒级看清新增、删除与修改。无需 AutoCAD，无需上传服务器，无需等待。',
  demoCta: '在线演示',
  demoHref: DEMO_HREF,
  githubCta: '查看 GitHub',
  githubHref: GITHUB_HREF,
  heroImageAlt: 'CAD Diff Viewer 并排对比两份图纸修订版',
  highlightsLabel: '团队选择它的理由',
  highlights: [
    '完全在浏览器内运行 — 图纸永不离开用户设备',
    '无需桌面 CAD — 打开两份修订版即可开始审阅',
    '清晰的审阅配色 — 灰为未变、红为删除、绿为新增',
    '按增删改或图元类型筛选 — 只看当前任务真正关心的变化',
  ],
  featuresEyebrow: '产品亮点',
  featuresTitle: '为 Web 重新设计的图纸审阅',
  featuresLead: '对比修订版所需的一切 — 不必在两个 AutoCAD 窗口间来回切换，也不必导出 PDF 肉眼比对。',
  features: [
    {
      id: 'visual-diff',
      title: '一眼看清每一处变更',
      body: '左侧拖入旧版、右侧拖入新版。查看器自动分类每个实体，并以审阅友好的配色绘制图纸 — 让审阅者专注「变了什么」，而不是在两份文件里反复查找。',
      image: FEATURE_IMAGES.visualDiff,
      imageAlt: '并排 CAD 对比，变更以颜色高亮',
    },
    {
      id: 'view-modes',
      title: '并排或叠加，随心切换',
      body: '分屏逐版审阅，或在同一画布上叠加两份图纸以捕捉细微位移。按团队习惯切换模式，找到最适合的审阅方式。',
      image: FEATURE_IMAGES.viewModes,
      imageAlt: '并排与叠加两种对比模式',
    },
    {
      id: 'filter-views',
      title: '按增删改或图元类型查看',
      body: '可单独查看新增、删除或修改的几何，也可按直线、圆、文字、块参照等图元类型收窄范围。过滤噪音，只审阅当前任务真正关心的变化。',
      image: FEATURE_IMAGES.filterViews,
      imageAlt: '按变更类型与图元类型筛选',
    },
    {
      id: 'review-tools',
      title: '为真实审阅流程而生',
      body: '在结果面板中按 删除 → 修改 → 新增 跳转。为变更集生成修订云线。平移、缩放、检视几何 — 与 CAD-Viewer 同样流畅的 WebGL 体验。',
      image: FEATURE_IMAGES.reviewTools,
      imageAlt: '修订云线与变更导航',
    },
    {
      id: 'privacy',
      title: '隐私从架构上保障',
      body: '解析与对比全部在本地完成。无转换农场、无上传链路、无远程服务 — 适合保密项目、受监管行业与离线环境。',
      image: FEATURE_IMAGES.privacy,
      imageAlt: '对比过程中图纸保留在本地设备',
    },
  ],
  useCasesTitle: '适用场景',
  useCasesLead: '从设计院到 SaaS 产品 — 任何需要更快、更私密图纸审阅的团队。',
  useCasesImage: USE_CASES_IMAGE,
  useCasesImageAlt: '设计团队、SaaS、AEC 与隐私优先组织的适用场景',
  useCases: [
    '设计团队对比施工图发行版',
    'SaaS 产品在 issue、RFI 或 PR 旁加入图纸审阅',
    '建筑师与 MEP 工程师审阅分包商修订',
    '无法将图纸上传至第三方服务器的隐私敏感组织',
  ],
  ctaTitle: '准备好对比第一份修订版了吗？',
  ctaLead: '在浏览器中打开在线演示 — 无需安装、无需账号、无需上传。',
  relatedTitle: '延伸阅读',
  related: relatedLinks({
    demo: { name: '在线演示', desc: '立即对比两份 DWG/DXF' },
    viewer: { name: 'CAD-Viewer', desc: '完整浏览器 DWG/DXF 查看与编辑' },
    npm: { name: 'npm', desc: '@mlightcad/cad-diff-viewer' },
    docs: { name: 'API 文档', desc: 'Read the Docs 集成参考' },
    github: {
      name: 'GitHub',
      desc: '/mlightcad/cad-viewer/tree/main/packages/cad-diff-viewer',
    },
  }),
}

export const cadDiffViewerJa: CadDiffViewerCopy = {
  metaTitle: 'CAD Diff Viewer — ブラウザで DWG/DXF 改訂版を比較 | MLightCAD',
  metaDescription:
    'ブラウザで DWG/DXF 図面の改訂版を比較。追加・削除・変更されたジオメトリを即座に把握 — 完全クライアントサイド、AutoCAD 不要、アップロード不要。',
  metaKeywords:
    'CAD diff, DWG 比較, DXF 比較, 図面レビュー, 改訂比較, ブラウザ CAD, MLightCAD',
  eyebrow: 'オープンソース',
  title: 'CAD Diff Viewer',
  lead: 'ブラウザで DWG/DXF 改訂版を比較 — 追加・削除・変更を数秒で確認。AutoCAD 不要、アップロード不要、待ち時間なし。',
  demoCta: 'ライブデモを試す',
  demoHref: DEMO_HREF,
  githubCta: 'GitHub で見る',
  githubHref: GITHUB_HREF,
  heroImageAlt: '2つの図面改訂版を並べて比較する CAD Diff Viewer',
  highlightsLabel: '選ばれる理由',
  highlights: [
    '完全ブラウザ動作 — 図面はユーザーの端末から出ない',
    'デスクトップ CAD 不要 — 2つの改訂版を開けばすぐにレビュー開始',
    '明確なレビュー配色 — 灰＝変更なし、赤＝削除、緑＝追加',
    '変更種別または図形タイプでフィルタ — 必要な変化だけに集中',
  ],
  featuresEyebrow: '製品ハイライト',
  featuresTitle: 'Web のために再設計された図面レビュー',
  featuresLead:
    '改訂比較に必要なすべて — AutoCAD の2ウィンドウ往復や PDF の目視照合は不要です。',
  features: [
    {
      id: 'visual-diff',
      title: '変更を一目で把握',
      body: '左に旧版、右に新版をドロップ。ビューアが各エンティティを分類し、レビュー向け配色で描画 — 「何が変わったか」に集中できます。',
      image: FEATURE_IMAGES.visualDiff,
      imageAlt: '色分けされた変更を示す CAD 並び比較',
    },
    {
      id: 'view-modes',
      title: 'サイドバイサイドまたはオーバーレイ',
      body: '画面分割で改訂を順にたどるか、1つのキャンバスに重ねて微細なずれを発見。チームのレビュー方法に合わせて切替できます。',
      image: FEATURE_IMAGES.viewModes,
      imageAlt: 'サイドバイサイドとオーバーレイの比較モード',
    },
    {
      id: 'filter-views',
      title: '変更種別または図形タイプで表示',
      body: '追加・削除・変更ジオメトリだけを表示したり、線・円・文字・INSERT など図形タイプで絞り込めます。ノイズを減らし、今の作業に必要な変更だけをレビュー。',
      image: FEATURE_IMAGES.filterViews,
      imageAlt: '変更種別と図形タイプのフィルタ',
    },
    {
      id: 'review-tools',
      title: '実務レビュー向けツール',
      body: '結果パネルで削除 → 変更 → 追加をジャンプ。変更セットにリビジョンクラウドを生成。CAD-Viewer と同じ応答性の WebGL でパン・ズーム・検査。',
      image: FEATURE_IMAGES.reviewTools,
      imageAlt: 'リビジョンクラウドと変更ナビゲーション',
    },
    {
      id: 'privacy',
      title: '設計段階からのプライバシー',
      body: '解析と比較は端末上だけで完結。変換サーバーもアップロードも不要 — 機密案件、規制業界、エアギャップ環境に最適。',
      image: FEATURE_IMAGES.privacy,
      imageAlt: '比較中も図面はローカルに留まる',
    },
  ],
  useCasesTitle: 'こんな用途に',
  useCasesLead: '設計事務所から SaaS まで — より速く、より安全な図面レビューが必要なすべてのチームへ。',
  useCasesImage: USE_CASES_IMAGE,
  useCasesImageAlt: '設計チーム、SaaS、AEC、プライバシー重視組織向けユースケース',
  useCases: [
    '施工図発行セットを比較する設計チーム',
    'issue・RFI・PR の横に図面レビューを追加する SaaS',
    '協力会社の改訂を確認する建築家・MEP エンジニア',
    '図面をサードパーティへアップロードできないプライバシー重視組織',
  ],
  ctaTitle: '最初の改訂ペアを比較してみませんか？',
  ctaLead: 'ブラウザでライブデモを開くだけ — インストール不要、アカウント不要、アップロード不要。',
  relatedTitle: '関連リンク',
  related: relatedLinks({
    demo: { name: 'ライブデモ', desc: '今すぐ DWG/DXF を2つ比較' },
    viewer: { name: 'CAD-Viewer', desc: 'ブラウザ完結の DWG/DXF ビューア＆エディタ' },
    npm: { name: 'npm', desc: '@mlightcad/cad-diff-viewer' },
    docs: { name: 'API ドキュメント', desc: 'Read the Docs の統合リファレンス' },
    github: {
      name: 'GitHub',
      desc: '/mlightcad/cad-viewer/tree/main/packages/cad-diff-viewer',
    },
  }),
}

export const cadDiffViewerKo: CadDiffViewerCopy = {
  metaTitle: 'CAD Diff Viewer — 브라우저에서 DWG/DXF 개정본 비교 | MLightCAD',
  metaDescription:
    '브라우저에서 DWG/DXF 도면 개정본을 비교하세요. 추가·삭제·변경된 지오메트리를 즉시 확인 — 완전 클라이언트 사이드, AutoCAD 불필요, 업로드 서버 불필요.',
  metaKeywords:
    'CAD diff, DWG 비교, DXF 비교, 도면 검토, 개정 비교, 브라우저 CAD, MLightCAD',
  eyebrow: '오픈소스',
  title: 'CAD Diff Viewer',
  lead: '브라우저에서 DWG/DXF 개정본을 비교 — 추가·삭제·변경을 몇 초 만에 확인. AutoCAD 불필요, 업로드 불필요, 대기 없음.',
  demoCta: '라이브 데모 체험',
  demoHref: DEMO_HREF,
  githubCta: 'GitHub에서 보기',
  githubHref: GITHUB_HREF,
  heroImageAlt: '두 도면 개정본을 나란히 비교하는 CAD Diff Viewer',
  highlightsLabel: '팀이 선택하는 이유',
  highlights: [
    '완전 브라우저 실행 — 도면이 사용자 기기를 떠나지 않음',
    '데스크톱 CAD 불필요 — 두 개정본을 열면 바로 검토 시작',
    '명확한 검토 색상 — 회색 미변경, 빨강 삭제, 초록 추가',
    '변경 유형 또는 엔티티 유형으로 필터 — 중요한 변화에 집중',
  ],
  featuresEyebrow: '제품 하이라이트',
  featuresTitle: '웹을 위해 다시 설계된 도면 검토',
  featuresLead:
    '개정본 비교에 필요한 모든 것 — AutoCAD 두 창을 오가거나 PDF를 눈으로 맞출 필요가 없습니다.',
  features: [
    {
      id: 'visual-diff',
      title: '모든 변경을 한눈에',
      body: '왼쪽에 이전 개정본, 오른쪽에 새 개정본을 놓으세요. 뷰어가 각 엔티티를 분류하고 검토용 팔레트로 그려 — 「무엇이 바뀌었는지」에 집중할 수 있습니다.',
      image: FEATURE_IMAGES.visualDiff,
      imageAlt: '색으로 표시된 변경이 있는 CAD 나란히 비교',
    },
    {
      id: 'view-modes',
      title: '나란히 보기 또는 오버레이',
      body: '화면을 나눠 개정본을 차례로 검토하거나, 한 캔버스에 겹쳐 미세한 이동을 잡으세요. 팀의 검토 방식에 맞게 모드를 전환합니다.',
      image: FEATURE_IMAGES.viewModes,
      imageAlt: '나란히 보기와 오버레이 비교 모드',
    },
    {
      id: 'filter-views',
      title: '변경 또는 엔티티 유형으로 보기',
      body: '추가·삭제·수정된 지오메트리만 보거나, 선·원·문자·INSERT 등 엔티티 유형으로 범위를 좁히세요. 잡음을 줄이고 현재 작업에 필요한 변경만 검토합니다.',
      image: FEATURE_IMAGES.filterViews,
      imageAlt: '변경 유형 및 엔티티 유형 필터',
    },
    {
      id: 'review-tools',
      title: '실제 검토 워크플로를 위해',
      body: '결과 패널에서 삭제 → 수정 → 추가로 이동. 변경 세트에 리비전 클라우드 생성. CAD-Viewer와 같은 반응형 WebGL로 팬·줌·검사.',
      image: FEATURE_IMAGES.reviewTools,
      imageAlt: '리비전 클라우드와 변경 탐색',
    },
    {
      id: 'privacy',
      title: '설계부터 보장하는 프라이버시',
      body: '파싱과 비교는 전부 기기에서 이뤄집니다. 변환 팜·업로드 파이프라인·원격 서비스 없음 — 기밀 프로젝트, 규제 산업, 에어갭 환경에 적합.',
      image: FEATURE_IMAGES.privacy,
      imageAlt: '비교 중에도 도면은 로컬에 유지',
    },
  ],
  useCasesTitle: '이런 팀에 적합',
  useCasesLead: '설계 사무소부터 SaaS까지 — 더 빠르고 안전한 도면 검토가 필요한 모든 팀.',
  useCasesImage: USE_CASES_IMAGE,
  useCasesImageAlt: '설계 팀, SaaS, AEC, 프라이버시 우선 조직 사용 사례',
  useCases: [
    '시공용 도면 발행본을 비교하는 설계 팀',
    'issue·RFI·PR 옆에 도면 검토를 넣는 SaaS 제품',
    '하청 개정본을 검토하는 건축가·MEP 엔지니어',
    '도면을 제3자 서버에 올릴 수 없는 프라이버시 민감 조직',
  ],
  ctaTitle: '첫 개정본 쌍을 비교해 볼까요?',
  ctaLead: '브라우저에서 라이브 데모를 여세요 — 설치·계정·업로드 불필요.',
  relatedTitle: '더 알아보기',
  related: relatedLinks({
    demo: { name: '라이브 데모', desc: '지금 DWG/DXF 두 파일 비교' },
    viewer: { name: 'CAD-Viewer', desc: '브라우저 DWG/DXF 뷰어 & 에디터' },
    npm: { name: 'npm', desc: '@mlightcad/cad-diff-viewer' },
    docs: { name: 'API 문서', desc: 'Read the Docs 통합 레퍼런스' },
    github: {
      name: 'GitHub',
      desc: '/mlightcad/cad-viewer/tree/main/packages/cad-diff-viewer',
    },
  }),
}

export const cadDiffViewerEs: CadDiffViewerCopy = {
  metaTitle: 'CAD Diff Viewer — Compara revisiones DWG/DXF en el navegador | MLightCAD',
  metaDescription:
    'Compara revisiones de planos DWG/DXF en el navegador. Detecta geometría añadida, eliminada y modificada al instante — totalmente en el cliente, sin AutoCAD ni servidor de carga.',
  metaKeywords:
    'CAD diff, comparar DWG, comparar DXF, revisión de planos, comparación de revisiones, CAD en navegador, MLightCAD',
  eyebrow: 'Código abierto',
  title: 'CAD Diff Viewer',
  lead: 'Compara revisiones DWG/DXF en el navegador — ve lo añadido, eliminado o cambiado en segundos. Sin AutoCAD, sin subidas, sin esperas.',
  demoCta: 'Probar demo en vivo',
  demoHref: DEMO_HREF,
  githubCta: 'Ver en GitHub',
  githubHref: GITHUB_HREF,
  heroImageAlt: 'CAD Diff Viewer comparando dos revisiones de planos lado a lado',
  highlightsLabel: 'Por qué lo eligen los equipos',
  highlights: [
    'Funciona por completo en el navegador — los planos no salen del dispositivo',
    'Sin CAD de escritorio — abre dos revisiones y empieza a revisar',
    'Colores claros de revisión — gris sin cambios, rojo eliminado, verde añadido',
    'Filtra por tipo de cambio o de entidad — céntrate en lo importante',
  ],
  featuresEyebrow: 'Destacados del producto',
  featuresTitle: 'Revisión de planos, reinventada para la web',
  featuresLead:
    'Todo lo necesario para comparar revisiones — sin saltar entre ventanas de AutoCAD ni exportar PDF para mirarlos de cerca.',
  features: [
    {
      id: 'visual-diff',
      title: 'Ve cada cambio de un vistazo',
      body: 'Suelta una revisión antigua a la izquierda y una nueva a la derecha. El visor clasifica cada entidad y pinta el plano con una paleta pensada para revisión — enfócate en qué cambió, no en buscar en dos archivos.',
      image: FEATURE_IMAGES.visualDiff,
      imageAlt: 'Comparación CAD lado a lado con cambios codificados por color',
    },
    {
      id: 'view-modes',
      title: 'Lado a lado o superposición',
      body: 'Divide la pantalla para recorrer revisiones, o apila ambos planos en un lienzo para detectar desplazamientos sutiles. Cambia de modo según cómo revise tu equipo.',
      image: FEATURE_IMAGES.viewModes,
      imageAlt: 'Modos de comparación lado a lado y superposición',
    },
    {
      id: 'filter-views',
      title: 'Filtra por cambio o tipo de entidad',
      body: 'Aísla geometría añadida, eliminada o modificada — o limita la vista a líneas, círculos, texto, inserts y otros tipos. Reduce el ruido y revisa solo lo que importa ahora.',
      image: FEATURE_IMAGES.filterViews,
      imageAlt: 'Filtros por tipo de cambio y tipo de entidad CAD',
    },
    {
      id: 'review-tools',
      title: 'Hecho para flujos de revisión reales',
      body: 'Salta entre eliminados, modificados y añadidos desde el panel de resultados. Genera nubes de revisión alrededor de conjuntos de cambios. Pan, zoom e inspección con el mismo WebGL ágil que CAD-Viewer.',
      image: FEATURE_IMAGES.reviewTools,
      imageAlt: 'Nubes de revisión y navegación de cambios',
    },
    {
      id: 'privacy',
      title: 'Privacidad por diseño',
      body: 'El análisis y la comparación ocurren por completo en el dispositivo. Sin granja de conversión, sin subidas, sin servicio remoto — ideal para proyectos confidenciales, sectores regulados y entornos aislados.',
      image: FEATURE_IMAGES.privacy,
      imageAlt: 'Los planos permanecen en el dispositivo local durante la comparación',
    },
  ],
  useCasesTitle: 'Para quién es',
  useCasesLead: 'Desde estudios de diseño hasta productos SaaS — quien necesite una revisión de planos más rápida y privada.',
  useCasesImage: USE_CASES_IMAGE,
  useCasesImageAlt: 'Casos de uso para equipos de diseño, SaaS, AEC y organizaciones con prioridad de privacidad',
  useCases: [
    'Equipos de diseño que comparan juegos de planos para construcción',
    'Productos SaaS que añaden revisión de planos junto a issues, RFI o pull requests',
    'Arquitectos e ingenieros MEP que revisan revisiones de subcontratistas',
    'Organizaciones sensibles a la privacidad que no pueden subir planos a terceros',
  ],
  ctaTitle: '¿Listo para comparar tu primer par de revisiones?',
  ctaLead: 'Abre la demo en vivo en el navegador — sin instalación, sin cuenta, sin subidas.',
  relatedTitle: 'Explorar más',
  related: relatedLinks({
    demo: { name: 'Demo en vivo', desc: 'Compara dos DWG/DXF ahora' },
    viewer: { name: 'CAD-Viewer', desc: 'Visor y editor DWG/DXF completo en el navegador' },
    npm: { name: 'npm', desc: '@mlightcad/cad-diff-viewer' },
    docs: { name: 'Docs API', desc: 'Referencia de integración en Read the Docs' },
    github: {
      name: 'GitHub',
      desc: '/mlightcad/cad-viewer/tree/main/packages/cad-diff-viewer',
    },
  }),
}

export const cadDiffViewerPt: CadDiffViewerCopy = {
  metaTitle: 'CAD Diff Viewer — Compare revisões DWG/DXF no navegador | MLightCAD',
  metaDescription:
    'Compare revisões de desenhos DWG/DXF no navegador. Veja geometria adicionada, excluída e alterada na hora — totalmente no cliente, sem AutoCAD e sem servidor de upload.',
  metaKeywords:
    'CAD diff, comparar DWG, comparar DXF, revisão de desenho, comparação de revisão, CAD no navegador, MLightCAD',
  eyebrow: 'Código aberto',
  title: 'CAD Diff Viewer',
  lead: 'Compare revisões DWG/DXF no navegador — veja o que foi adicionado, excluído ou alterado em segundos. Sem AutoCAD, sem upload, sem espera.',
  demoCta: 'Experimentar demo ao vivo',
  demoHref: DEMO_HREF,
  githubCta: 'Ver no GitHub',
  githubHref: GITHUB_HREF,
  heroImageAlt: 'CAD Diff Viewer comparando duas revisões de desenho lado a lado',
  highlightsLabel: 'Por que as equipes escolhem',
  highlights: [
    'Roda inteiramente no navegador — os desenhos não saem do dispositivo',
    'Sem CAD desktop — abra duas revisões e comece a revisar',
    'Cores claras de revisão — cinza inalterado, vermelho excluído, verde adicionado',
    'Filtre por tipo de mudança ou de entidade — foque no que importa',
  ],
  featuresEyebrow: 'Destaques do produto',
  featuresTitle: 'Revisão de desenhos, reinventada para a web',
  featuresLead:
    'Tudo o que você precisa para comparar revisões — sem alternar janelas do AutoCAD nem exportar PDFs para olhar de perto.',
  features: [
    {
      id: 'visual-diff',
      title: 'Veja cada mudança de relance',
      body: 'Solte uma revisão antiga à esquerda e uma nova à direita. O visualizador classifica cada entidade e pinta o desenho com uma paleta amigável à revisão — foque no que mudou, não em caçar em dois arquivos.',
      image: FEATURE_IMAGES.visualDiff,
      imageAlt: 'Comparação CAD lado a lado com mudanças codificadas por cor',
    },
    {
      id: 'view-modes',
      title: 'Lado a lado ou sobreposição',
      body: 'Divida a tela para percorrer revisões, ou empilhe ambos os desenhos em um canvas para captar deslocamentos sutis. Alterne modos conforme o fluxo da sua equipe.',
      image: FEATURE_IMAGES.viewModes,
      imageAlt: 'Modos de comparação lado a lado e sobreposição',
    },
    {
      id: 'filter-views',
      title: 'Filtre por mudança ou tipo de entidade',
      body: 'Isole geometria adicionada, excluída ou modificada — ou restrinja a linhas, círculos, texto, inserts e outros tipos. Reduza o ruído e revise só o que importa agora.',
      image: FEATURE_IMAGES.filterViews,
      imageAlt: 'Filtros por tipo de mudança e tipo de entidade CAD',
    },
    {
      id: 'review-tools',
      title: 'Feito para fluxos reais de revisão',
      body: 'Navegue por excluídos, modificados e adicionados no painel de resultados. Gere nuvens de revisão em torno de conjuntos de mudanças. Pan, zoom e inspeção com o mesmo WebGL responsivo do CAD-Viewer.',
      image: FEATURE_IMAGES.reviewTools,
      imageAlt: 'Nuvens de revisão e navegação de mudanças',
    },
    {
      id: 'privacy',
      title: 'Privacidade por design',
      body: 'Análise e comparação acontecem inteiramente no dispositivo. Sem fazenda de conversão, sem upload, sem serviço remoto — ideal para projetos confidenciais, setores regulados e ambientes isolados.',
      image: FEATURE_IMAGES.privacy,
      imageAlt: 'Desenhos permanecem no dispositivo local durante a comparação',
    },
  ],
  useCasesTitle: 'Para quem é',
  useCasesLead: 'De escritórios de projeto a produtos SaaS — quem precisa de revisão de desenhos mais rápida e privada.',
  useCasesImage: USE_CASES_IMAGE,
  useCasesImageAlt: 'Casos de uso para equipes de projeto, SaaS, AEC e organizações com foco em privacidade',
  useCases: [
    'Equipes de projeto comparando conjuntos emitidos para construção',
    'Produtos SaaS que adicionam revisão de desenho junto a issues, RFIs ou pull requests',
    'Arquitetos e engenheiros MEP revisando revisões de subcontratados',
    'Organizações sensíveis à privacidade que não podem enviar desenhos a servidores de terceiros',
  ],
  ctaTitle: 'Pronto para comparar seu primeiro par de revisões?',
  ctaLead: 'Abra a demo ao vivo no navegador — sem instalação, sem conta, sem upload.',
  relatedTitle: 'Explorar mais',
  related: relatedLinks({
    demo: { name: 'Demo ao vivo', desc: 'Compare dois DWG/DXF agora' },
    viewer: { name: 'CAD-Viewer', desc: 'Visualizador e editor DWG/DXF completo no navegador' },
    npm: { name: 'npm', desc: '@mlightcad/cad-diff-viewer' },
    docs: { name: 'Docs da API', desc: 'Referência de integração no Read the Docs' },
    github: {
      name: 'GitHub',
      desc: '/mlightcad/cad-viewer/tree/main/packages/cad-diff-viewer',
    },
  }),
}

export const cadDiffViewerRu: CadDiffViewerCopy = {
  metaTitle: 'CAD Diff Viewer — Сравнение ревизий DWG/DXF в браузере | MLightCAD',
  metaDescription:
    'Сравнивайте ревизии чертежей DWG/DXF в браузере. Мгновенно видьте добавленную, удалённую и изменённую геометрию — полностью на клиенте, без AutoCAD и без сервера загрузки.',
  metaKeywords:
    'CAD diff, сравнение DWG, сравнение DXF, ревью чертежей, сравнение ревизий, CAD в браузере, MLightCAD',
  eyebrow: 'Open source',
  title: 'CAD Diff Viewer',
  lead: 'Сравнивайте ревизии DWG/DXF в браузере — за секунды видно, что добавлено, удалено или изменено. Без AutoCAD, без загрузки, без ожидания.',
  demoCta: 'Попробовать демо',
  demoHref: DEMO_HREF,
  githubCta: 'Смотреть на GitHub',
  githubHref: GITHUB_HREF,
  heroImageAlt: 'CAD Diff Viewer сравнивает две ревизии чертежа рядом',
  highlightsLabel: 'Почему выбирают команды',
  highlights: [
    'Работает целиком в браузере — чертежи не покидают устройство',
    'Не нужен настольный CAD — откройте две ревизии и сразу ревью',
    'Понятные цвета ревью — серый без изменений, красный удалён, зелёный добавлен',
    'Фильтр по типу изменения или сущности — фокус на важном',
  ],
  featuresEyebrow: 'Возможности продукта',
  featuresTitle: 'Ревью чертежей, переосмысленное для веба',
  featuresLead:
    'Всё нужное для сравнения ревизий — без переключения окон AutoCAD и без экспорта PDF для пристального вглядывания.',
  features: [
    {
      id: 'visual-diff',
      title: 'Каждое изменение — с первого взгляда',
      body: 'Перетащите старую ревизию слева и новую справа. Просмотрщик классифицирует каждую сущность и окрашивает чертёж палитрой для ревью — фокус на том, что изменилось, а не на поиске в двух файлах.',
      image: FEATURE_IMAGES.visualDiff,
      imageAlt: 'Побочное CAD-сравнение с цветовой маркировкой изменений',
    },
    {
      id: 'view-modes',
      title: 'Рядом или наложением',
      body: 'Разделите экран для пошагового обхода ревизий или наложите оба чертежа на один холст, чтобы поймать тонкие сдвиги. Переключайте режимы под процесс вашей команды.',
      image: FEATURE_IMAGES.viewModes,
      imageAlt: 'Режимы сравнения рядом и наложением',
    },
    {
      id: 'filter-views',
      title: 'Фильтр по изменению или типу сущности',
      body: 'Изолируйте добавленную, удалённую или изменённую геометрию — или сузьте вид до линий, окружностей, текста, INSERT и других типов. Уберите шум и ревьюйте только нужные изменения.',
      image: FEATURE_IMAGES.filterViews,
      imageAlt: 'Фильтры по типу изменения и типу CAD-сущности',
    },
    {
      id: 'review-tools',
      title: 'Для реальных процессов ревью',
      body: 'Переходите по удалённым, изменённым и добавленным в панели результатов. Создавайте облака ревизий вокруг наборов изменений. Pan, zoom и осмотр — тот же отзывчивый WebGL, что у CAD-Viewer.',
      image: FEATURE_IMAGES.reviewTools,
      imageAlt: 'Облака ревизий и навигация по изменениям',
    },
    {
      id: 'privacy',
      title: 'Конфиденциальность заложена в архитектуру',
      body: 'Разбор и сравнение происходят только на устройстве. Нет фермы конвертации, нет загрузки, нет удалённого сервиса — для конфиденциальных проектов, регулируемых отраслей и изолированных сред.',
      image: FEATURE_IMAGES.privacy,
      imageAlt: 'Чертежи остаются на локальном устройстве при сравнении',
    },
  ],
  useCasesTitle: 'Для кого это',
  useCasesLead: 'От проектных бюро до SaaS — всем, кому нужно быстрое и приватное ревью чертежей.',
  useCasesImage: USE_CASES_IMAGE,
  useCasesImageAlt: 'Сценарии для проектных команд, SaaS, AEC и организаций с упором на приватность',
  useCases: [
    'Проектные команды, сравнивающие комплекты для строительства',
    'SaaS-продукты с ревью чертежей рядом с issues, RFI или pull request',
    'Архитекторы и MEP-инженеры, проверяющие ревизии субподрядчиков',
    'Организации с жёсткими требованиями к приватности, которые не могут загружать чертежи на сторонние серверы',
  ],
  ctaTitle: 'Готовы сравнить первую пару ревизий?',
  ctaLead: 'Откройте живое демо в браузере — без установки, аккаунта и загрузки.',
  relatedTitle: 'Узнать больше',
  related: relatedLinks({
    demo: { name: 'Живое демо', desc: 'Сравните два DWG/DXF прямо сейчас' },
    viewer: { name: 'CAD-Viewer', desc: 'Полный браузерный DWG/DXF просмотрщик и редактор' },
    npm: { name: 'npm', desc: '@mlightcad/cad-diff-viewer' },
    docs: { name: 'API Docs', desc: 'Справка по интеграции на Read the Docs' },
    github: {
      name: 'GitHub',
      desc: '/mlightcad/cad-viewer/tree/main/packages/cad-diff-viewer',
    },
  }),
}

export const cadDiffViewerCs: CadDiffViewerCopy = {
  metaTitle: 'CAD Diff Viewer — Porovnání revizí DWG/DXF v prohlížeči | MLightCAD',
  metaDescription:
    'Porovnávejte revize výkresů DWG/DXF v prohlížeči. Okamžitě uvidíte přidanou, smazanou a změněnou geometrii — plně na klientovi, bez AutoCADu a bez upload serveru.',
  metaKeywords:
    'CAD diff, porovnání DWG, porovnání DXF, kontrola výkresů, porovnání revizí, CAD v prohlížeči, MLightCAD',
  eyebrow: 'Open source',
  title: 'CAD Diff Viewer',
  lead: 'Porovnávejte revize DWG/DXF v prohlížeči — během sekund uvidíte, co bylo přidáno, smazáno nebo změněno. Bez AutoCADu, bez uploadu, bez čekání.',
  demoCta: 'Vyzkoušet live demo',
  demoHref: DEMO_HREF,
  githubCta: 'Zobrazit na GitHubu',
  githubHref: GITHUB_HREF,
  heroImageAlt: 'CAD Diff Viewer porovnává dvě revize výkresu vedle sebe',
  highlightsLabel: 'Proč ho týmy volí',
  highlights: [
    'Běží celý v prohlížeči — výkresy neopouštějí zařízení uživatele',
    'Bez desktop CADu — otevřete dvě revize a hned kontrolujte',
    'Jasné barvy kontroly — šedá beze změny, červená smazáno, zelená přidáno',
    'Filtr podle typu změny nebo entity — soustřeďte se na důležité',
  ],
  featuresEyebrow: 'Produktové highlighty',
  featuresTitle: 'Kontrola výkresů, přepracovaná pro web',
  featuresLead:
    'Vše potřebné k porovnání revizí — bez přepínání oken AutoCADu a bez exportu PDF na mžourání.',
  features: [
    {
      id: 'visual-diff',
      title: 'Každou změnu na první pohled',
      body: 'Přetáhněte starší revizi vlevo a novější vpravo. Prohlížeč klasifikuje každou entitu a vykreslí výkres paletou určenou ke kontrole — soustřeďte se na to, co se změnilo, ne na hledání ve dvou souborech.',
      image: FEATURE_IMAGES.visualDiff,
      imageAlt: 'CAD porovnání vedle sebe s barevně označenými změnami',
    },
    {
      id: 'view-modes',
      title: 'Vedle sebe nebo překrytí',
      body: 'Rozdělte obrazovku pro procházení revizí, nebo oba výkresy překryjte na jednom plátně a zachyťte jemné posuny. Přepínejte režimy podle toho, jak váš tým kontroluje.',
      image: FEATURE_IMAGES.viewModes,
      imageAlt: 'Režimy porovnání vedle sebe a překrytí',
    },
    {
      id: 'filter-views',
      title: 'Filtr podle změny nebo typu entity',
      body: 'Izolujte přidanou, smazanou nebo upravenou geometrii — nebo zúžte pohled na čáry, kružnice, text, INSERT a další typy. Odfiltrujte šum a kontrolujte jen změny relevantní pro aktuální úkol.',
      image: FEATURE_IMAGES.filterViews,
      imageAlt: 'Filtry podle typu změny a typu CAD entity',
    },
    {
      id: 'review-tools',
      title: 'Pro skutečné kontrolní workflow',
      body: 'Přeskakujte smazané, upravené a přidané položky v panelu výsledků. Generujte revizní mraky kolem sad změn. Pan, zoom a kontrola geometrie se stejným svižným WebGL jako u CAD-Viewer.',
      image: FEATURE_IMAGES.reviewTools,
      imageAlt: 'Revizní mraky a navigace změn',
    },
    {
      id: 'privacy',
      title: 'Soukromí od návrhu',
      body: 'Parsování a porovnání probíhá výhradně na zařízení. Žádná konverzní farma, žádný upload, žádná vzdálená služba — ideální pro důvěrné projekty, regulovaná odvětví a izolovaná prostředí.',
      image: FEATURE_IMAGES.privacy,
      imageAlt: 'Výkresy zůstávají na lokálním zařízení během porovnání',
    },
  ],
  useCasesTitle: 'Pro koho je',
  useCasesLead: 'Od projekčních kanceláří po SaaS — pro každého, kdo potřebuje rychlejší a soukromější kontrolu výkresů.',
  useCasesImage: USE_CASES_IMAGE,
  useCasesImageAlt: 'Případy použití pro projekční týmy, SaaS, AEC a organizace s důrazem na soukromí',
  useCases: [
    'Projekční týmy porovnávající sady výkresů pro výstavbu',
    'SaaS produkty přidávající kontrolu výkresů vedle issues, RFI nebo pull requestů',
    'Architekti a MEP inženýři kontrolující revize subdodavatelů',
    'Organizace citlivé na soukromí, které nemohou nahrávat výkresy na servery třetích stran',
  ],
  ctaTitle: 'Připraveni porovnat první pár revizí?',
  ctaLead: 'Otevřete live demo v prohlížeči — bez instalace, účtu i uploadu.',
  relatedTitle: 'Prozkoumat dál',
  related: relatedLinks({
    demo: { name: 'Live demo', desc: 'Porovnejte dva DWG/DXF teď' },
    viewer: { name: 'CAD-Viewer', desc: 'Plný prohlížečový DWG/DXF prohlížeč a editor' },
    npm: { name: 'npm', desc: '@mlightcad/cad-diff-viewer' },
    docs: { name: 'API docs', desc: 'Integrační reference na Read the Docs' },
    github: {
      name: 'GitHub',
      desc: '/mlightcad/cad-viewer/tree/main/packages/cad-diff-viewer',
    },
  }),
}
