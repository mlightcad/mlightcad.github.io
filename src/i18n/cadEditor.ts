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
  relatedTitle: string
  related: { name: string; desc: string; href: string }[]
}

const DEMO_HREF = 'https://mlightcad.github.io/cad-viewer/'
const GITHUB_HREF = 'https://github.com/mlightcad/cad-viewer'
const DOCS_HREF = 'https://cad-viewer.readthedocs.io/en/latest/'

const FEATURE_IMAGES = {
  geometryEdit: '/assets/features/edit.svg',
  measureReview: '/assets/features/workflows.svg',
  privacy: '/assets/features/privacy.svg',
  sameEngine: '/assets/features/plugins.svg',
  embed: '/assets/features/integration.svg',
} as const

const USE_CASES_IMAGE = '/assets/features/workflows.svg'

/**
 * Shared related-link destinations with localized labels.
 *
 * @param labels - Localized name/desc pairs for each related link.
 */
function relatedLinks(labels: {
  demo: { name: string; desc: string }
  viewer: { name: string; desc: string }
  sdk: { name: string; desc: string }
  docs: { name: string; desc: string }
  github: { name: string; desc: string }
}): CadEditorCopy['related'] {
  return [
    { ...labels.demo, href: DEMO_HREF },
    { ...labels.viewer, href: '/cad-viewer.html' },
    { ...labels.sdk, href: '/cad-sdk.html' },
    { ...labels.docs, href: DOCS_HREF },
    { ...labels.github, href: GITHUB_HREF },
  ]
}

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
    'UI almost identical to AutoCAD — ribbon, command line, and status bar where you expect them',
    'The same commands you already know — type, pick, and edit without relearning workflows',
    'The same shortcuts and muscle memory — get productive in minutes, not days',
    'The same operation feel in the browser — no desktop seat, no upload, almost no learning curve',
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
  relatedTitle: 'Explore further',
  related: relatedLinks({
    demo: { name: 'Live Demo', desc: 'Open and edit DWG/DXF in the browser' },
    viewer: { name: 'CAD Viewer', desc: 'Browser-native DWG/DXF viewing & review' },
    sdk: { name: 'CAD SDK', desc: 'Embed view and edit in your product' },
    docs: { name: 'API Docs', desc: 'Integration reference on Read the Docs' },
    github: { name: 'GitHub', desc: 'mlightcad/cad-viewer' },
  }),
}
