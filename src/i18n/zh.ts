import { benchmarksZh } from './benchmarks'
import { cadDiffViewerZh } from './cadDiffViewer'
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
    cadSdk: 'CAD SDK',
    dwgEngine: 'DWG Engine',
    cadDiffViewer: 'CAD Diff Viewer',
    dwgToHtml: 'DWG 转 HTML',
    developers: '开发者',
    iframePlugin: 'iframe 插件',
    googleDrive: 'Google Drive 集成',
    solutions: '解决方案',
    pricing: '价格',
    resourcesNav: '资源',
    benchmarks: '性能与证据',
    commercial: '开源与商业',
    tutorials: '教程',
    docs: '文档',
    userGuide: '用户指南',
    wiki: 'Wiki',
    apiReference: 'API 参考',
    installationUsage: '安装与使用',
    github: 'GitHub',
    demo: '在线演示',
    language: '语言',
  },
  hero: {
    brand: 'MLightCAD',
    meta: '开源 · 浏览器原生 · 数据安全',
    headline: '面向 DWG 与 DXF 的 Web CAD 基础设施',
    subline: '直接在浏览器中构建 CAD 产品。',
    ctaDemo: '试用 CAD Viewer',
    ctaBuild: '用 MLightCAD 构建',
    guarantees: ['无需 CAD 服务器。', '无需上传文件。', '无需安装。'],
  },
  platform: {
    eyebrow: '平台',
    title: '浏览器原生 CAD，专为嵌入而生',
    lead: '使用完整 Viewer，或用 SDK 打造自己的 CAD 体验 — 同一套浏览器原生引擎。',
    closing: '构建在 MLightCAD Viewer 所用的同一套 CAD 引擎之上。',
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
    paths: [
      {
        label: '开源',
        title: 'CAD Viewer',
        body: '免费浏览器 CAD，用于查看、审阅与编辑 — 进入技术栈的旗舰入口。',
        href: '/#product',
        cta: '了解 Viewer',
      },
      {
        label: '商业',
        title: 'DWG Engine',
        body: '面向闭源产品、SaaS 与 OEM 的生产级 DWG — 再分发权利清晰。',
        href: '/dwg-engine.html',
        cta: '查看 Engine',
      },
    ],
  },
  flagship: {
    eyebrow: '旗舰产品',
    title: 'CAD Viewer',
    lead: '面向生产的 WebGL CAD 运行时：DWG/DXF 解析、几何、查看与编辑 — 全部发生在现代浏览器标签页内。',
    highlightsLabel: '核心能力',
    highlights: [
      '在浏览器内查看、批注审阅并编辑 DWG/DXF — 无需 CAD 服务器。',
      '面向真实 Web 编辑工作流的开源工具包 — 不是只读预览。',
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
      {
        id: 'edit',
        title: '真正的编辑器 — 不是被动 Viewer',
        body: '不止平移缩放。用 AutoCAD 风格的命令面选择、修改与创建几何 — 让 Web 产品交付真实绘图工作，而不只是只读预览。',
        image: '/assets/features/edit.svg',
        imageAlt: '图纸上的夹点与编辑操作',
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
    imageAlt: '带可插拔 UI、Agent、HTML、PDF、SVG 模块的 CAD 核心',
    items: [
      { name: 'cad-simple-ui-plugin', role: '工具栏与图层管理（框架无关 DOM）' },
      { name: 'cad-agent-plugin', role: '带绘图工具的自然语言 CAD Agent' },
      { name: 'cad-html-plugin', role: '导出自包含离线 HTML' },
      { name: 'cad-pdf-plugin', role: '矢量 PDF 导出与 PDF 转 CAD 导入' },
      { name: 'cad-svg-plugin', role: '矢量 SVG 导出' },
    ],
  },
  showcase: {
    eyebrow: '基于 MLightCAD 构建',
    title: '技术栈上的项目',
    lead: '已在同一引擎上运行的开放演示与集成 — 从完整 Viewer 到嵌入与离线 HTML。',
    items: [
      {
        name: 'CAD Viewer',
        desc: '完整浏览器 CAD 体验',
        href: 'https://mlightcad.github.io/cad-viewer/',
      },
      {
        name: 'CAD Simple Viewer',
        desc: '轻量可嵌入查看器',
        href: 'https://mlightcad.github.io/cad-viewer/cad-simple-viewer/',
      },
      {
        name: 'CAD Diff Viewer',
        desc: '在浏览器中对比图纸修订',
        href: '/cad-diff-viewer.html',
      },
      {
        name: 'iframe 插件',
        desc: '一行嵌入 DWG/DXF',
        href: '/iframe-plugin.html',
      },
      {
        name: 'Google Drive 集成',
        desc: '从 Drive 打开图纸',
        href: 'https://mlightcad.com/google-drive-cad-viewer/',
      },
      {
        name: '自包含 HTML',
        desc: '无需服务器分享 CAD',
        href: 'https://mlightcad.github.io/cad-viewer/self-contained-html/canteen.html',
      },
    ],
  },
  resources: {
    eyebrow: '资源',
    title: '文档、演示与社区',
    lead: '从在线 Viewer 开始，再深入 API、授权与性能证据。',
    links: [
      {
        name: '在线演示',
        desc: '功能完整的浏览器查看器',
        href: 'https://mlightcad.github.io/cad-viewer/',
      },
      { name: 'CAD SDK', desc: '把 DWG/DXF 嵌入你的产品', href: '/cad-sdk.html' },
      { name: 'DWG Engine', desc: '商用生产级 DWG', href: '/dwg-engine.html' },
      { name: '性能与证据', desc: '架构与已公开证据', href: '/benchmarks.html' },
      {
        name: 'API 参考',
        desc: 'Read the Docs 上的版本化文档',
        href: 'https://cad-viewer.readthedocs.io/en/latest/',
      },
      {
        name: '用户指南',
        desc: '查看器用法、交互与快捷键',
        href: 'https://mlightcad.com/cad-viewer/docs/',
      },
      {
        name: 'Wiki',
        desc: '指南与架构说明',
        href: 'https://github.com/mlightcad/cad-viewer/wiki',
      },
      {
        name: 'GitHub',
        desc: 'mlightcad/cad-viewer',
        href: 'https://github.com/mlightcad/cad-viewer',
      },
      { name: 'X', desc: '@mlightcad', href: 'https://x.com/mlightcad' },
      {
        name: 'YouTube',
        desc: '@mlightcad',
        href: 'https://www.youtube.com/@mlightcad',
      },
      {
        name: '掘金',
        desc: '@mlightcad',
        href: 'https://juejin.cn/column/7501992214283501579',
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
  tutorial: tutorialZh,
  commercial: commercialZh,
  cadSdk: cadSdkZh,
  useCases: useCasesZh,
  benchmarks: benchmarksZh,
}
