import { aiCadZh } from './aiCad'
import { benchmarksZh } from './benchmarks'
import { cadDiffViewerZh } from './cadDiffViewer'
import { cadEditorZh } from './cadEditor'
import { cadSdkZh } from './cadSdk'
import { commercialZh } from './commercial'
import { iframePluginZh } from './iframePlugin'
import { parserZh } from './parser'
import { tutorialZh } from './tutorial'
import type { Dictionary } from './types'
import { useCasesZh } from './useCases'

export const zh: Dictionary = {
  meta: {
    title: 'MLightCAD — 面向 DWG 与 DXF 的 Web CAD SDK',
    description:
      '在浏览器中直接打开、查看与编辑 DWG/DXF。开源 Web CAD SDK，提供浏览器原生 DWG 解析、渲染、测量与编辑。',
    keywords:
      'MLightCAD, Web CAD SDK, DWG 查看器, DXF 查看器, 浏览器 CAD, DWG Engine, cad-viewer, 开源 CAD, 零后端',
  },
  nav: {
    product: '产品',
    cadViewer: 'CAD Viewer',
    cadEditor: 'CAD Editor',
    cadSdk: 'CAD SDK',
    aiCad: 'AI + CAD',
    dwgEngine: 'DWG Engine',
    cadDiffViewer: 'CAD Diff Viewer',
    dwgToHtml: 'DWG 转 HTML',
    developers: '开发者',
    iframePlugin: 'iframe 插件',
    mcpAiCad: 'AI + CAD',
    integrations: '集成',
    oneDrive: 'OneDrive',
    googleDrive: 'Google Drive',
    solutions: '解决方案',
    pricing: '价格',
    resourcesNav: '资源',
    benchmarks: '性能与证据',
    commercial: '开源与商业',
    tutorials: '教程',
    docs: '文档',
    userGuide: '用户指南',
    developmentGuide: '开发指南',
    wiki: 'Wiki',
    apiReference: 'API 参考',
    installationUsage: '安装与使用',
    github: 'GitHub',
    language: '语言',
  },
  hero: {
    brand: 'MLightCAD',
    meta: '开源 · 浏览器原生 · 数据安全',
    headline: '面向 DWG 与 DXF 的 Web CAD 基础设施',
    subline: '直接在浏览器中构建 CAD 产品。',
    ctaDemo: '试用 CAD Viewer',
    ctaBuild: '试用在线演示',
    guarantees: ['无需 CAD 服务器。', '无需上传文件。', '无需安装。'],
  },
  platform: {
    eyebrow: '平台',
    title: '浏览器原生 CAD，专为嵌入而生',
    lead: '使用完整 Viewer，或用 SDK 打造自己的 CAD 体验 — 同一套浏览器原生引擎。',
    layers: [
      {
        name: '无需 CAD 服务器',
        desc: 'DWG/DXF 在浏览器标签页内完成解析与渲染 — 没有要搭建或扩容的后端。',
      },
      {
        name: '图纸留在端侧',
        desc: '没有上传农场：机密文件不会离开用户的设备。',
      },
      {
        name: '同一套 CAD 模型',
        desc: 'Viewer、编辑器、插件与 Agent 读写同一套实体。',
      },
      {
        name: '不止预览',
        desc: '测量、批注审阅与几何编辑 — 不是只读截图。',
      },
      {
        name: '嵌进你的产品',
        desc: '用 iframe 或 npm 嵌入，或授权商用 DWG Engine 做 SaaS 与 OEM。',
      },
    ],
  },
  flagship: {
    eyebrow: '旗舰产品',
    title: 'CAD Viewer',
    lead: '面向生产的 WebGL CAD 运行时：在浏览器内查看、测量与批注 DWG/DXF — 无需 CAD 服务器，无需上传。',
    heroImageAlt: '浏览器中打开 DWG 图纸的 CAD Viewer',
    highlightsLabel: '核心能力',
    highlights: [
      '在浏览器内查看图纸、测量距离，并添加批注审阅。',
      '面向真实 Web 查看工作流的开源工具包 — 无需 CAD 服务器、无需上传。',
    ],
  },
  tryDrawing: {
    barIdle: '试用你的图纸',
    barLoading: '打开中…',
    title: '打开图纸',
    body: '将 DWG 或 DXF 拖到这里。文件在此标签页内解析和渲染，绝不会上传。',
    open: '打开文件',
    trust: '从不上传 · 无服务器',
    privacyTitle: '图纸不会离开这台浏览器',
    privacyBody: '文件不会上传或存储到我们的服务器。解析和渲染都在当前标签页内完成。',
    verifySummary: '如何用开发者工具确认文件没有被上传',
    verifyBody:
      '使用本演示时打开浏览器开发者工具 → Network。你应能确认 DWG 文件本身没有被发送到外部服务器处理。',
    dragHint: '松开以打开',
    caption: '.dwg · .dxf · 浏览器内解析 · 不上传',
    captionOpen: '本地 · {name} · {size}',
    statusLoading: '正在读取图纸…',
    statusLoadingViewer: '正在加载查看器…',
    statusInit: '正在启动查看器…',
    errorType: '请选择 DWG 或 DXF 文件。',
    errorInit: '无法启动查看器。请刷新后重试。',
    errorOpen: '无法打开 {name}。',
    errorLicenseExpired: '无法打开 {name}。DWG 转换器试用期已结束。',
    errorLicenseInvalid: '无法打开 {name}。DWG 转换器许可证缺失或无效。',
    retry: '换一个文件',
    fullscreen: '全屏',
    exitFullscreen: '退出全屏',
    close: '关闭图纸',
  },
  features: {
    eyebrow: '特性',
    title: '为隐私、可移植性与产品团队而建。',
    lead: '每一项能力都围绕同一原则：严肃的 CAD 工作不应依赖自建 CAD 服务器。',
    items: [
      {
        id: 'privacy',
        title: '浏览器原生 CAD',
        body: '图纸留在你的设备上。无上传、无 CAD 服务器、无云端转换、无安装 — 可在上方演示中用开发者工具自行验证。',
        image: '/assets/features/privacy.svg',
        imageAlt: '概念锁：图纸留在本地设备',
        actions: [
          {
            label: '架构概览',
            href: 'https://github.com/mlightcad/cad-viewer/wiki/architecture-overview',
            variant: 'primary',
          },
        ],
      },
      {
        id: 'integration',
        title: '零基础设施，深度集成',
        body: '无需准备后端或转换农场即可把 CAD 放进产品。模块化插件架构让 UI、导出与 AI Agent 成为一等扩展。',
        image: '/assets/features/integration.svg',
        imageAlt: '宿主应用连接 CAD 核心与插件',
        actions: [
          { label: 'iframe 插件指南', href: '/iframe-plugin.html', variant: 'primary' },
          { label: 'CAD SDK', href: '/cad-sdk.html', variant: 'ghost' },
        ],
      },
      {
        id: 'html-export',
        title: '单文件离线 HTML 导出',
        body: '把实时图纸变成带嵌入式查看器的自包含 .html — 平移、缩放、范围、图层、测距，界面支持英/中/土/捷。收件人在任何现代浏览器打开即可：无需安装、无需 cad-viewer 实例、无需服务器。在示例图纸的查看模式下，离线 HTML 相对 AutoCAD 2020 约少用 83% 内存，同时仍支持平移、缩放、图层与测距。',
        image: '/assets/features/html-export.svg',
        imageAlt: 'DWG 变为可移植 HTML 文件',
        actions: [
          {
            label: '转换为 HTML',
            href: '/cad-viewer/cad-simple-viewer/html-converter.html',
            variant: 'primary',
          },
          {
            label: '打开演示 HTML',
            href: 'https://mlightcad.github.io/cad-viewer/self-contained-html/canteen.html',
            variant: 'ghost',
          },
        ],
      },
      {
        id: 'workflows',
        title: '离线与在线，同一引擎',
        body: '一套运行时同时支持气隙审阅与联网产品流程。断网时本地编辑；恢复后同步进你的平台 — 无需重写 CAD 核心。',
        image: '/assets/features/workflows.svg',
        imageAlt: '离线与在线工作流循环',
      },
    ],
  },
  gallery: {
    eyebrow: '演示图纸',
    title: '图纸库',
    leadHtml:
      '由 <a href="https://github.com/mlightcad/cad-viewer" target="_blank" rel="noopener noreferrer">cad-viewer</a> / <a href="https://github.com/mlightcad/cad-viewer/tree/main/packages/cad-html-plugin" target="_blank" rel="noopener noreferrer">cad-html-plugin</a> 导出的预渲染 CAD 图纸 — 可在查看器中打开预览，或下载原始 DWG。图纸来源 <a href="https://dwgmodels.com/" target="_blank" rel="noopener noreferrer">dwgmodels.com</a>。',
    download: '下载',
    loading: '正在加载图纸…',
    empty: '未找到图纸。',
    error: '无法加载图纸，请稍后再试。',
    openAria: '打开图纸：{title}',
    downloadAria: '下载 {file}',
  },
  plugins: {
    eyebrow: '平台模块',
    title: '在同一引擎上组合',
    lead: 'UI、导出与 AI 模块按产品按需加载 — 构建在驱动 MLightCAD Viewer 的 CAD 引擎之上。',
    imageAlt: '带可插拔 UI、Agent、HTML、PDF、Script 模块的 CAD 核心',
    items: [
      { name: 'cad-simple-ui-plugin', role: '工具栏与图层管理（框架无关 DOM）' },
      { name: 'cad-agent-plugin', role: '自然语言 CAD Agent — 详见 AI + CAD' },
      { name: 'cad-html-plugin', role: '导出自包含离线 HTML' },
      { name: 'cad-pdf-plugin', role: '矢量 PDF 导出与 PDF 转 CAD 导入' },
      { name: 'cad-script-plugin', role: '通过脚本 API 操作图纸 — 可据此构建智能化功能' },
    ],
  },
  showcase: {
    eyebrow: '产品线',
    title: '技术栈上的产品',
    lead: '同一套浏览器原生 CAD 引擎驱动整条产品线 — Viewer、Editor、SDK 与商用 Engine。',
    items: [
      {
        id: 'cad-viewer',
        name: 'CAD Viewer',
        desc: '在浏览器中查看与审阅 DWG/DXF',
        href: '/cad-viewer.html',
      },
      {
        id: 'cad-diff-viewer',
        name: 'CAD Diff Viewer',
        desc: '在浏览器中对比图纸修订',
        href: '/cad-diff-viewer.html',
      },
      {
        id: 'cad-editor',
        name: 'CAD Editor',
        desc: '在浏览器中完整编辑图纸',
        href: '/cad-editor.html',
      },
      {
        id: 'cad-sdk',
        name: 'CAD SDK',
        desc: '将 DWG/DXF 嵌入你的产品',
        href: '/cad-sdk.html',
      },
      {
        id: 'ai-cad',
        name: 'AI + CAD',
        desc: '用 AI 理解、提取、修改与审阅图纸',
        href: '/ai-cad.html',
      },
      {
        id: 'dwg-engine',
        name: 'DWG Engine',
        desc: '面向生产的商用 DWG',
        href: '/dwg-engine.html',
      },
      {
        id: 'dwg-to-html',
        name: 'DWG 转 HTML',
        desc: '导出自包含离线 HTML',
        href: '/cad-viewer/cad-simple-viewer/html-converter.html',
      }
    ],
  },
  resources: {
    eyebrow: '资源',
    title: '文档、演示与社区',
    lead: '从在线 Viewer 开始，再深入文档、性能证据与社区渠道。',
    links: [
      {
        id: 'live-demo',
        name: '在线演示',
        desc: '功能完整的浏览器查看器',
        href: 'https://mlightcad.github.io/cad-viewer/',
      },
      {
        id: 'benchmarks',
        name: '性能与证据',
        desc: '架构与已公开证据',
        href: '/benchmarks.html',
      },
      {
        id: 'api-reference',
        name: 'API 参考',
        desc: 'Read the Docs 上的版本化文档',
        href: 'https://cad-viewer.readthedocs.io/en/latest/',
      },
      {
        id: 'user-guide',
        name: '用户指南',
        desc: '查看器用法、交互与快捷键',
        href: 'https://mlightcad.com/cad-viewer/docs/',
      },
      {
        id: 'development-guide',
        name: '开发指南',
        desc: '构建与扩展 CAD Viewer 技术栈',
        href: 'https://mlightcad.com/cad-viewer/docs/development/',
      },
      {
        id: 'wiki',
        name: 'Wiki',
        desc: '指南与架构说明',
        href: 'https://github.com/mlightcad/cad-viewer/wiki',
      },
      {
        id: 'github',
        name: 'GitHub',
        desc: 'mlightcad/cad-viewer',
        href: 'https://github.com/mlightcad/cad-viewer',
      },
      {
        id: 'x',
        name: 'X',
        desc: '@mlightcad',
        href: 'https://x.com/mlightcad',
      },
      {
        id: 'youtube',
        name: 'YouTube',
        desc: '@mlightcad',
        href: 'https://www.youtube.com/@mlightcad',
      },
      {
        id: 'juejin',
        name: '掘金',
        desc: '@mlightcad',
        href: 'https://juejin.cn/column/7501992214283501579',
      },
      {
        id: 'dev',
        name: 'DEV',
        desc: 'DEV Community 上的技术文章',
        href: 'https://dev.to/mlightcad',
      },
    ],
  },
  footer: {
    tagline: '面向 Web 的开源 CAD 基础设施。',
    terms: '服务条款',
    privacy: '隐私政策',
    refunds: '退款政策',
    licenses: '授权门户',
    rights: '© 2026 MLightCAD',
  },
  parser: parserZh,
  iframePlugin: iframePluginZh,
  cadDiffViewer: cadDiffViewerZh,
  cadEditor: cadEditorZh,
  tutorial: tutorialZh,
  commercial: commercialZh,
  cadSdk: cadSdkZh,
  aiCad: aiCadZh,
  useCases: useCasesZh,
  benchmarks: benchmarksZh,
}
