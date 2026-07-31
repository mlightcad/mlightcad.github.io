import { parserZh } from './parser'
import type { Dictionary } from './types'

export const zh: Dictionary = {
  meta: {
    title: 'MLightCAD — 首个开源浏览器端 CAD 编辑栈',
    description:
      'cad-viewer：首个完全不依赖后端、可在浏览器内直接运行的 DWG/DXF 查看与编辑器，也是首个开源的 DXF/DWG Web 端编辑工具。',
  },
  nav: {
    product: '产品',
    cadViewer: 'cad-viewer',
    dwgParser: 'DWG 解析器',
    features: '特性',
    plugins: '插件',
    docs: '文档',
    github: 'GitHub',
    demo: '在线演示',
    langEn: 'EN',
    langZh: '中文',
  },
  hero: {
    brand: 'MLightCAD',
    meta: '开源 · WEBGL · 零后端',
    headline: '首个从不离开浏览器的开源 CAD 栈。',
    subline: '在本机完成 DXF/DWG 解析、渲染与编辑 — 无后端、无上传链路，隐私无需妥协。',
    ctaDemo: '试用在线演示',
    ctaGithub: '查看 GitHub',
    firsts: [
      '首个完全不需要后端、可在浏览器端直接运行的 DWG/DXF 查看器与编辑器',
      '首个开源的 DXF/DWG Web 端编辑工具',
    ],
  },
  flagship: {
    eyebrow: '旗舰产品',
    title: 'cad-viewer',
    lead: '面向生产的 WebGL CAD 运行时：DWG/DXF 解析、几何、查看与编辑 — 全部发生在现代浏览器标签页内。',
    firstsLabel: '行业第一',
    firsts: [
      '首个完全不依赖任何后端服务、可在浏览器中完整运行的 DWG/DXF 查看器与编辑器。',
      '首个面向 Web 的开源 DXF/DWG 真正编辑工具包 — 不是只读预览。',
    ],
    ctaDemo: '打开演示',
    ctaDocs: 'API 文档',
  },
  features: {
    eyebrow: '特性',
    title: '为隐私、可移植性与产品集成而生。',
    lead: '每一项能力都围绕同一原则：不必搭建 CAD 服务器，也能完成严肃的图纸工作。',
    items: [
      {
        id: 'privacy',
        title: '架构级数据安全',
        body: '图纸在客户端完成解析与渲染。不会上传、暂存或镜像到远端主机 — 机密性是结构保证，而不是条款里的一句话。',
        image: '/assets/features/privacy.svg',
        imageAlt: '概念图：图纸留在本地设备',
      },
      {
        id: 'integration',
        title: '零基础设施，深度可集成',
        body: '把 CAD 能力嵌进你的产品，无需搭建后端或转换集群。模块化插件体系让界面、导出与 AI Agent 都能作为一等扩展组合使用。',
        image: '/assets/features/integration.svg',
        imageAlt: '宿主应用连接 CAD 核心与插件',
      },
      {
        id: 'html-export',
        title: '单文件离线 HTML 导出',
        body: '将当前图纸导出为自包含 .html：内嵌轻量查看器，支持平移、缩放、范围、图层、测距与中英文界面。任意现代浏览器离线打开 — 无需安装、无需 cad-viewer 实例、无需服务器。同一张样例图纸上，查看模式离线 HTML 的内存占用约为 AutoCAD 2020 的约 17%，仍支持平移、缩放、图层与测距。',
        image: '/assets/features/html-export.svg',
        imageAlt: 'DWG 转化为可移植 HTML 文件',
        actions: [
          {
            label: '打开演示 HTML',
            href: 'https://mlightcad.github.io/cad-viewer/self-contained-html/canteen.html',
            variant: 'primary',
          },
          {
            label: '下载 canteen.html',
            href: 'https://mlightcad.github.io/cad-viewer/self-contained-html/canteen.html',
            download: 'canteen.html',
            variant: 'ghost',
          },
        ],
      },
      {
        id: 'workflows',
        title: '离线与在线，同一引擎',
        body: '用同一运行时覆盖隔离网审阅与在线产品流程。断网时本地编辑，恢复连接后再汇入你的平台 — 无需重写 CAD 核心。',
        image: '/assets/features/workflows.svg',
        imageAlt: '离线与在线工作流循环',
      },
      {
        id: 'edit',
        title: '真正的编辑器，而不只是查看器',
        body: '不止于平移缩放。支持选择、修改与创建几何，并提供接近 AutoCAD 的命令体验 — 让 Web 产品承载真实绘图工作，而不只是只读预览。',
        image: '/assets/features/edit.svg',
        imageAlt: '图纸上的夹点与编辑操作',
      },
    ],
  },
  plugins: {
    eyebrow: '生态',
    title: '官方插件',
    lead: '在共享插件总线上组合界面、导出与 AI — 按产品需要按需加载。',
    imageAlt: 'CAD 核心与可插拔的 UI、Agent、HTML、PDF、SVG 模块',
    items: [
      { name: 'cad-simple-ui-plugin', role: '工具栏与图层管理（框架无关 DOM）' },
      { name: 'cad-agent-plugin', role: '自然语言 CAD Agent 与绘图工具' },
      { name: 'cad-html-plugin', role: '导出自包含离线 HTML' },
      { name: 'cad-pdf-plugin', role: '矢量 PDF 导出与 PDF 转 CAD' },
      { name: 'cad-svg-plugin', role: '矢量 SVG 导出' },
    ],
  },
  resources: {
    eyebrow: '资源',
    title: '文档、演示与社区',
    lead: '从在线演示开始，再深入 API 参考与项目 Wiki。',
    links: [
      {
        name: '在线演示',
        desc: '浏览器中的完整功能查看器',
        href: 'https://mlightcad.github.io/cad-viewer/',
      },
      {
        name: 'API 文档',
        desc: 'Read the Docs 版本化文档',
        href: 'https://cad-viewer.readthedocs.io/en/latest/',
      },
      {
        name: '最新文档',
        desc: 'GitHub Pages（开发 / 最新）',
        href: 'https://mlightcad.github.io/cad-viewer/docs/',
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
      {
        name: 'X',
        desc: '@mlightcad',
        href: 'https://x.com/mlightcad',
      },
      {
        name: 'YouTube',
        desc: '@mlightcad',
        href: 'https://www.youtube.com/@mlightcad',
      },
      {
        name: 'Medium',
        desc: '@mlightcad',
        href: 'https://medium.com/@mlightcad',
      },
      {
        name: '掘金专栏',
        desc: '@mlightcad',
        href: 'https://juejin.cn/column/7501992214283501579',
      },
    ],
  },
  footer: {
    tagline: '面向 Web 的开源 CAD 基础设施。',
    license:
      'cad-viewer 主体为 MIT。默认 DWG 加载路径依赖 GPL 的 LibreDWG 相关包 — 闭源商业产品请参阅专有解析器方案。',
    parser: '专有 DWG 解析器',
    parserHref: '/dwg-parser.html',
    contact: 'mlight.lee@outlook.com',
    rights: 'MLightCAD',
  },
  parser: parserZh,
}
