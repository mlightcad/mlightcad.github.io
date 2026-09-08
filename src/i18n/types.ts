import type { CadDiffViewerCopy } from './cadDiffViewer'
import type { IframePluginCopy } from './iframePlugin'
import type { ParserCopy } from './parser'
import type { TutorialCopy } from './tutorial'

/** Supported marketing-site locales. */
export type Locale = 'en' | 'zh' | 'ja' | 'ko' | 'es' | 'pt' | 'ru' | 'cs'

/** CTA or download control attached to a homepage feature block. */
export interface FeatureAction {
  /** Button label. */
  label: string
  /** Destination URL or download path. */
  href: string
  /** Suggested filename when triggering a download */
  download?: string
  /** Visual treatment for the control. */
  variant?: 'primary' | 'ghost'
}

/** One feature row on the homepage. */
export interface FeatureItem {
  /** Stable id used for the section anchor (`feature-{id}`). */
  id: string
  /** Feature heading. */
  title: string
  /** Supporting copy. */
  body: string
  /** Illustration path. */
  image: string
  /** Accessible description of the illustration. */
  imageAlt: string
  /** Optional CTAs rendered under the body. */
  actions?: FeatureAction[]
}

/**
 * Localized copy tree for the marketing site.
 *
 * Nested string fields are translation values and are not documented here.
 */
export interface Dictionary {
  /** Homepage document metadata. */
  meta: {
    title: string
    description: string
    keywords: string
  }
  /** Primary navigation labels. */
  nav: {
    product: string
    cadViewer: string
    cadDiffViewer: string
    dwgParser: string
    integration: string
    iframePlugin: string
    googleDrive: string
    features: string
    plugins: string
    tutorials: string
    docs: string
    github: string
    demo: string
    language: string
  }
  /** Homepage hero copy. */
  hero: {
    brand: string
    meta: string
    headline: string
    subline: string
    ctaDemo: string
    ctaGithub: string
    firsts: string[]
  }
  /** Flagship product section copy. */
  flagship: {
    eyebrow: string
    title: string
    lead: string
    firstsLabel: string
    firsts: string[]
  }
  /** In-browser “try your drawing” widget copy. */
  tryDrawing: {
    barIdle: string
    barLoading: string
    title: string
    body: string
    open: string
    trust: string
    privacyTitle: string
    privacyBody: string
    verifySummary: string
    verifyBody: string
    dragHint: string
    caption: string
    captionOpen: string
    statusLoading: string
    statusLoadingViewer: string
    statusInit: string
    errorType: string
    errorInit: string
    errorOpen: string
    /** Shown when the DWG converter evaluation period has ended. */
    errorLicenseExpired: string
    /** Shown when the DWG converter license key is missing or invalid. */
    errorLicenseInvalid: string
    retry: string
    fullscreen: string
    exitFullscreen: string
    close: string
  }
  /** Features section copy. */
  features: {
    eyebrow: string
    title: string
    lead: string
    items: FeatureItem[]
  }
  /** Drawing gallery section (remote demo-drawings assets). */
  gallery: {
    eyebrow: string
    title: string
    /** HTML lead with trusted internal links. */
    leadHtml: string
    download: string
    loading: string
    empty: string
    error: string
    openAria: string
    downloadAria: string
  }
  /** Plugins section copy. */
  plugins: {
    eyebrow: string
    title: string
    lead: string
    imageAlt: string
    items: { name: string; role: string }[]
  }
  /** Resources / links section copy. */
  resources: {
    eyebrow: string
    title: string
    lead: string
    links: { name: string; desc: string; href: string }[]
  }
  /** Site footer copy. */
  footer: {
    tagline: string
    terms: string
    privacy: string
    refunds: string
    rights: string
  }
  /** DWG parser product page copy. */
  parser: ParserCopy
  /** iframe plugin docs page copy. */
  iframePlugin: IframePluginCopy
  /** CAD Diff Viewer product page copy. */
  cadDiffViewer: CadDiffViewerCopy
  /** Product tutorial / video gallery page copy. */
  tutorial: TutorialCopy
}
