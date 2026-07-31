/** Shared shape for proprietary DWG parser page copy (EN / ZH). */

export interface ParserFaq {
  q: string
  a: string
}

export interface TrialFormCopy {
  title: string
  lead: string
  close: string
  companySection: string
  useSection: string
  companyName: string
  companyNamePlaceholder: string
  website: string
  websitePlaceholder: string
  websiteOptional: string
  country: string
  countryPlaceholder: string
  contactName: string
  contactNamePlaceholder: string
  contactEmail: string
  contactEmailPlaceholder: string
  githubUsername: string
  githubUsernamePlaceholder: string
  productName: string
  productNamePlaceholder: string
  deploymentModel: string
  deploymentModelPlaceholder: string
  useCase: string
  useCasePlaceholder: string
  submit: string
  submitting: string
  success: string
  error: string
  requiredHint: string
}

export interface ParserCopy {
  metaTitle: string
  metaDescription: string
  eyebrow: string
  title: string
  lead: string
  contactCta: string
  docsCta: string
  docsHref: string
  scopeTitle: string
  scopeLead: string
  scopeRows: { label: string; value: string }[]
  benefitsTitle: string
  benefits: string[]
  licenseTitle: string
  receiveTitle: string
  receive: string[]
  permittedTitle: string
  permitted: string[]
  restrictionsTitle: string
  restrictions: string[]
  pricingTitle: string
  pricingRows: { item: string; amount: string }[]
  pricingNote: string
  trialTitle: string
  trialLead: string
  trialCta: string
  trialSteps: string[]
  trialNote: string
  trialForm: TrialFormCopy
  integrationTitle: string
  integrationLead: string
  supportTitle: string
  supportRows: { area: string; detail: string }[]
  faqTitle: string
  faqs: ParserFaq[]
  relatedTitle: string
  related: { name: string; desc: string; href: string }[]
  imageAlts: {
    scope: string
    license: string
    trial: string
    integration: string
    support: string
    faq: string
    related: string
  }
}

export const parserEn: ParserCopy = {
  metaTitle: 'Proprietary DWG Parser — MLightCAD',
  metaDescription:
    'Commercial DWG parser for closed-source products: perpetual license, no GPL distribution, drop-in replacement for LibreDWG in cad-viewer.',
  eyebrow: 'Commercial product',
  title: 'Proprietary DWG Parser',
  lead: 'A commercial alternative to the open-source LibreDWG stack — built for closed-source products, white-label deployments, and SaaS / on-premise viewers that cannot ship GPL-3.0 code to customers.',
  contactCta: 'Apply for Trial License',
  docsCta: 'Full license document',
  docsHref: 'https://github.com/mlightcad/cad-viewer/blob/main/PROPRIETARY-PARSER.md',
  scopeTitle: 'Scope',
  scopeLead: 'Drop-in replacement for the default open-source DWG converter.',
  scopeRows: [
    { label: 'Format', value: 'DWG' },
    { label: 'Package', value: '@mlight-cad/dwg-converter' },
    { label: 'Delivery', value: 'Pre-built npm package (no source)' },
  ],
  benefitsTitle: 'Why teams choose it',
  benefits: [
    'Lower memory usage than the LibreDWG-based WASM stack',
    'Support for larger DWG files — not constrained by libredwg-web heap limits',
    'More accurate parsing for production drawings',
    'Keeps the rest of the cad-viewer stack MIT-only when GPL deps are removed',
  ],
  licenseTitle: 'Licensing',
  receiveTitle: 'What you receive',
  receive: [
    'A pre-built npm package (compiled / bundled). Source code is not included.',
    'A perpetual license to use the package in your products and deployments.',
  ],
  permittedTitle: 'Permitted use',
  permitted: [
    'Embed and redistribute inside your closed-source application (desktop, mobile, or web)',
    'Deploy in SaaS, on-premise, and white-labeled environments',
    'Unlimited users, tenants, projects, or files — no per-seat or per-file fees',
  ],
  restrictionsTitle: 'Restrictions',
  restrictions: [
    'You may not redistribute or resell the parser as a standalone DWG parsing library or SDK.',
  ],
  pricingTitle: 'Pricing',
  pricingRows: [
    { item: 'Perpetual license (one-time donation)', amount: '$3,000 USD' },
    { item: 'Upgrade packages — first year', amount: 'Included' },
    { item: 'Upgrade packages — after first year', amount: '$1,500 / year' },
  ],
  pricingNote:
    'No royalties, no per-seat fees, no usage caps. After year one you may keep using the version you have without paying; the annual donation is only for new upgrade packages.',
  trialTitle: 'Trial license',
  trialLead: 'Companies and organizations can apply for a trial before purchase. Personal / individual applications are not accepted at this time.',
  trialCta: 'Apply for Trial License',
  trialSteps: [
    'Submit the trial application form with company information and intended use',
    'Include a GitHub username — access is granted via the mlight-cad organization',
    'After approval, accept the GitHub org invite and install @mlight-cad/dwg-converter',
  ],
  trialNote: 'Public evaluation is also available via the realdwg-web-example demo project on GitHub.',
  trialForm: {
    title: 'Apply for Trial License',
    lead: 'For companies and organizations only. We will review your application and follow up by email.',
    close: 'Close',
    companySection: 'Company information',
    useSection: 'Intended use',
    companyName: 'Company / organization name',
    companyNamePlaceholder: 'Your company name',
    website: 'Website',
    websitePlaceholder: 'https://example.com',
    websiteOptional: 'optional',
    country: 'Country / region',
    countryPlaceholder: 'Country or region',
    contactName: 'Contact name',
    contactNamePlaceholder: 'Your name',
    contactEmail: 'Contact email',
    contactEmailPlaceholder: 'Your work email',
    githubUsername: 'GitHub username',
    githubUsernamePlaceholder: 'your-github-username',
    productName: 'Product / project name',
    productNamePlaceholder: 'Brief name',
    deploymentModel: 'Deployment model',
    deploymentModelPlaceholder: 'e.g. SaaS, on-premise, desktop, white-label',
    useCase: 'Brief description of use case',
    useCasePlaceholder: '1–3 sentences on how you plan to use the parser',
    submit: 'Submit application',
    submitting: 'Submitting…',
    success: 'Application submitted. We will review it and reply by email.',
    error: 'Could not submit the application. Please try again or email mlight.lee@outlook.com.',
    requiredHint: 'Required fields are marked with *',
  },
  integrationTitle: 'Integration',
  integrationLead:
    'Register as an AcDbDatabaseConverter through AcDbDatabaseConverterManager — the same path as LibreDWG. Output conforms to the MIT @mlightcad/data-model; rendering and plugins stay unchanged.',
  supportTitle: 'Support',
  supportRows: [
    { area: 'Bug fixes', detail: 'Addressed as quickly as possible' },
    { area: 'Upgrade packages', detail: 'First year included; thereafter with annual donation' },
    { area: 'Integration support', detail: 'Reasonable email support' },
    { area: 'Response time', detail: 'Typically within one business day for reported bugs' },
  ],
  faqTitle: 'FAQ',
  faqs: [
    {
      q: 'Can we use this in a white-labeled product?',
      a: 'Yes. Embed it in a closed-source, white-labeled commercial application for SaaS or on-premise customers.',
    },
    {
      q: 'Do we need to open-source our application?',
      a: 'No. The proprietary parser license allows closed-source use. Open-source cad-viewer components you use remain under their own licenses (MIT for the core stack).',
    },
    {
      q: 'What if we stop the annual donation?',
      a: 'You keep perpetual rights to versions already received. You simply will not get new upgrade packages until renewed.',
    },
    {
      q: 'Does it support 3D entities?',
      a: 'Partially. 3DSOLID can be extracted with best-effort wireframe or bounding-box fallback; full B-rep tessellation is not yet available.',
    },
  ],
  relatedTitle: 'Related',
  related: [
    {
      name: 'Full product documentation',
      desc: 'Complete commercial guide covering scope, licensing, pricing, trial, and integration.',
      href: 'https://github.com/mlightcad/cad-viewer/blob/main/PROPRIETARY-PARSER.md',
    },
    {
      name: 'realdwg-web-example',
      desc: 'Sample app that demonstrates the proprietary DWG parser in the browser.',
      href: 'https://github.com/mlightcad/realdwg-web-example',
    },
    {
      name: 'API Docs',
      desc: 'API reference for cad-viewer, data-model, and converter integration.',
      href: 'https://mlightcad.github.io/cad-viewer/docs/',
    },
  ],
  imageAlts: {
    scope: 'DWG file flowing into the proprietary converter package and data-model',
    license: 'Sealed commercial package with perpetual license mark',
    trial: 'Trial path from company email to GitHub org access',
    integration: 'Registering the DWG converter on the shared manager bus',
    support: 'Shield covering bug fixes, upgrades, and email support',
    faq: 'Question and answer panels for common license topics',
    related: 'Parser hub linked to license docs, example, and API reference',
  },
}

export const parserZh: ParserCopy = {
  metaTitle: '专有 DWG 解析器 — MLightCAD',
  metaDescription:
    '面向闭源产品的商业 DWG 解析器：永久授权、避免分发 GPL，可替换 cad-viewer 中的 LibreDWG 默认路径。',
  eyebrow: '商业产品',
  title: '专有 DWG 解析器',
  lead: '开源 LibreDWG 栈的商业替代方案 — 面向无法向客户分发 GPL-3.0 代码的闭源产品、白标部署，以及 SaaS / 本地化 CAD 查看器。',
  contactCta: '申请试用授权',
  docsCta: '完整授权文档',
  docsHref: 'https://github.com/mlightcad/cad-viewer/blob/main/PROPRIETARY-PARSER.zh-CN.md',
  scopeTitle: '范围',
  scopeLead: '可替换默认开源 DWG 转换器的即插即用方案。',
  scopeRows: [
    { label: '格式', value: 'DWG' },
    { label: '包名', value: '@mlight-cad/dwg-converter' },
    { label: '交付', value: '预构建 npm 包（不含源码）' },
  ],
  benefitsTitle: '核心优势',
  benefits: [
    '内存占用低于基于 LibreDWG 的 WASM 方案',
    '支持更大 DWG 文件 — 不受 libredwg-web 堆限制约束',
    '面向生产图纸的更高解析准确度',
    '移除 GPL 依赖后，其余 cad-viewer 栈可保持纯 MIT',
  ],
  licenseTitle: '授权说明',
  receiveTitle: '你将获得',
  receive: [
    '预构建 npm 包（已编译 / 打包），不包含源代码。',
    '在产品与部署中使用该包的永久授权。',
  ],
  permittedTitle: '允许的用途',
  permitted: [
    '嵌入并随闭源应用一起分发（桌面、移动或 Web）',
    '用于 SaaS、本地部署与白标交付',
    '用户 / 租户 / 项目 / 文件数量不限 — 无按席位或按文件收费',
  ],
  restrictionsTitle: '限制',
  restrictions: [
    '不得将解析器作为独立的 DWG 解析库或 SDK 再分发或转售。',
  ],
  pricingTitle: '定价',
  pricingRows: [
    { item: '永久授权（一次性捐赠）', amount: '3,000 美元' },
    { item: '升级包 — 首年', amount: '包含' },
    { item: '升级包 — 首年后', amount: '1,500 美元 / 年' },
  ],
  pricingNote:
    '无版税、无按席位费用、无用量上限。首年后可继续使用已获得版本而无需付费；年度捐赠仅用于获取新的升级包。',
  trialTitle: '试用授权',
  trialLead: '公司与组织可在购买前申请试用。暂不接受个人开发者申请。',
  trialCta: '申请试用授权',
  trialSteps: [
    '填写试用申请表，提供公司信息与用途说明',
    '须提供 GitHub 用户名 — 通过 mlight-cad 组织开通访问',
    '获批后接受组织邀请，安装 @mlight-cad/dwg-converter',
  ],
  trialNote: '也可通过 GitHub 上的 realdwg-web-example 公开演示项目进行能力评估。',
  trialForm: {
    title: '申请试用授权',
    lead: '仅面向公司与组织。我们会审核申请并通过邮件回复。',
    close: '关闭',
    companySection: '公司信息',
    useSection: '用途说明',
    companyName: '公司 / 组织名称',
    companyNamePlaceholder: '贵公司名称',
    website: '网站',
    websitePlaceholder: 'https://example.com',
    websiteOptional: '选填',
    country: '国家 / 地区',
    countryPlaceholder: '国家或地区',
    contactName: '联系人姓名',
    contactNamePlaceholder: '您的姓名',
    contactEmail: '联系邮箱',
    contactEmailPlaceholder: '工作邮箱',
    githubUsername: 'GitHub 用户名',
    githubUsernamePlaceholder: 'your-github-username',
    productName: '产品 / 项目名称',
    productNamePlaceholder: '简要名称',
    deploymentModel: '部署模式',
    deploymentModelPlaceholder: '例如：SaaS、本地部署、桌面端、白标',
    useCase: '用例简述',
    useCasePlaceholder: '用 1–3 句话说明计划如何使用解析器',
    submit: '提交申请',
    submitting: '提交中…',
    success: '申请已提交。我们会审核后通过邮件回复。',
    error: '提交失败。请重试，或直接发送邮件至 mlight.lee@outlook.com。',
    requiredHint: '标有 * 的为必填项',
  },
  integrationTitle: '集成方式',
  integrationLead:
    '通过 AcDbDatabaseConverterManager 注册为 AcDbDatabaseConverter — 与 LibreDWG 相同路径。输出符合 MIT 的 @mlightcad/data-model；渲染与插件无需改动。',
  supportTitle: '支持与维护',
  supportRows: [
    { area: '缺陷修复', detail: '尽快处理已报告问题' },
    { area: '升级包', detail: '首年包含；之后需年度捐赠' },
    { area: '集成支持', detail: '合理范围内的邮件支持' },
    { area: '响应时间', detail: '已报告缺陷通常一个工作日内回复' },
  ],
  faqTitle: '常见问题',
  faqs: [
    {
      q: '可以用于白标产品吗？',
      a: '可以。可嵌入闭源白标商业应用，并向 SaaS 或本地客户交付。',
    },
    {
      q: '是否必须开源我们的应用？',
      a: '不必。专有解析器授权允许闭源使用；你选用的开源 cad-viewer 组件仍遵循其各自许可证（核心栈为 MIT）。',
    },
    {
      q: '停止年度捐赠会怎样？',
      a: '你仍永久拥有已获得版本的使用权，只是在续费前不会再收到新的升级包。',
    },
    {
      q: '是否支持三维实体？',
      a: '部分支持。可提取 3DSOLID 并以尽力而为的线框或包围盒回退；完整 B-rep 细分尚未提供。',
    },
  ],
  relatedTitle: '相关链接',
  related: [
    {
      name: '完整介绍文档',
      desc: '覆盖范围、授权、定价、试用与集成的完整商业说明。',
      href: 'https://github.com/mlightcad/cad-viewer/blob/main/PROPRIETARY-PARSER.zh-CN.md',
    },
    {
      name: 'realdwg-web-example',
      desc: 'DWG parser 示例程序，演示专有解析器在浏览器中的用法。',
      href: 'https://github.com/mlightcad/realdwg-web-example',
    },
    {
      name: 'API 文档',
      desc: 'cad-viewer、data-model 与转换器集成的 API 参考。',
      href: 'https://mlightcad.github.io/cad-viewer/docs/',
    },
  ],
  imageAlts: {
    scope: 'DWG 文件进入专有转换包并输出到 data-model',
    license: '带永久授权标记的封装商业包',
    trial: '从公司邮件到 GitHub 组织试用访问的路径',
    integration: '在共享 Manager 总线上注册 DWG 转换器',
    support: '覆盖缺陷修复、升级与邮件支持的护盾',
    faq: '常见授权问题的问答面板',
    related: '解析器与授权文档、示例、API 文档的关联',
  },
}
