import type { Locale } from './types'

/** Legal pages required for Paddle verification. */
export type LegalPage = 'terms' | 'privacy' | 'refund'

/** One titled block inside a legal document. */
export interface LegalSection {
  title: string
  paragraphs: string[]
  list?: string[]
}

/** Localized copy for a single legal page. */
export interface LegalPageCopy {
  metaTitle: string
  metaDescription: string
  eyebrow: string
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}

type LegalBundle = Record<LegalPage, LegalPageCopy>

const legalEn: LegalBundle = {
  terms: {
    metaTitle: 'Terms of Service — MLightCAD',
    metaDescription:
      'Terms of service for MLightCAD websites, open-source projects, and commercial software licenses sold through Paddle.',
    eyebrow: 'Legal',
    title: 'Terms of Service',
    updated: 'Last updated: August 24, 2026',
    intro:
      'These Terms of Service ("Terms") govern your access to MLightCAD websites, documentation, open-source software, and paid commercial licenses (including the Proprietary DWG Parser). By using our sites or purchasing a license, you agree to these Terms.',
    sections: [
      {
        title: '1. Who we are',
        paragraphs: [
          'MLightCAD ("we", "us", "our") provides open-source CAD infrastructure for the web and commercial software licenses for business customers. Our primary website is https://mlightcad.com.',
          'For licensing, billing, or support questions, contact support@mlightcad.com.',
        ],
      },
      {
        title: '2. Open-source software',
        paragraphs: [
          'Open-source components published by MLightCAD (for example cad-viewer and related packages on GitHub) are licensed under their respective open-source licenses shown in each repository. Nothing in these Terms limits those license terms.',
        ],
      },
      {
        title: '3. Commercial licenses',
        paragraphs: [
          'Paid products, including the Proprietary DWG Parser (@mlight-cad/dwg-converter), are sold as commercial software licenses to businesses and organizations. A separate license agreement applies to each purchase and defines permitted use, restrictions, delivery, and support scope.',
          'Unless expressly stated in writing, commercial licenses do not include source code. You may not redistribute or resell the proprietary parser as a standalone library or SDK.',
        ],
      },
      {
        title: '4. Orders and payment',
        paragraphs: [
          'Commercial licenses may be purchased through our checkout provider, Paddle, which acts as Merchant of Record for applicable transactions. Prices, taxes, and currency are shown at checkout.',
          'Access to licensed packages is provided digitally after successful payment. Delivery instructions are sent to the email address supplied at checkout.',
        ],
      },
      {
        title: '5. Acceptable use',
        paragraphs: ['You agree not to:'],
        list: [
          'Use our services for unlawful purposes or in violation of export, sanctions, or intellectual-property laws.',
          'Attempt to reverse engineer, decompile, or extract source code from proprietary packages except where applicable law expressly permits.',
          'Interfere with the security or availability of our websites, checkout, or delivery systems.',
          'Misrepresent your affiliation with MLightCAD or resell proprietary packages outside the scope of your license.',
        ],
      },
      {
        title: '6. Disclaimer of warranties',
        paragraphs: [
          'Our websites and software are provided "as is" and "as available" to the fullest extent permitted by law. We disclaim all warranties, whether express or implied, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.',
          'CAD parsing and rendering depend on drawing content and deployment environment. You are responsible for validating suitability for your production use case.',
        ],
      },
      {
        title: '7. Limitation of liability',
        paragraphs: [
          'To the fullest extent permitted by law, MLightCAD will not be liable for any indirect, incidental, special, consequential, or punitive damages, or for loss of profits, data, or business opportunity, arising from your use of our sites or software.',
          'Our aggregate liability for any claim relating to a commercial license purchase is limited to the amount you paid to us for that license in the twelve (12) months before the event giving rise to the claim, except where such limitation is prohibited by law.',
        ],
      },
      {
        title: '8. Changes',
        paragraphs: [
          'We may update these Terms from time to time. The "Last updated" date above indicates the latest revision. Material changes will be posted on this page. Continued use of our services after changes become effective constitutes acceptance of the revised Terms.',
        ],
      },
      {
        title: '9. Governing law',
        paragraphs: [
          'These Terms are governed by the laws applicable to MLightCAD as seller, without regard to conflict-of-law rules. Mandatory consumer protections in your jurisdiction remain unaffected where applicable.',
        ],
      },
      {
        title: '10. Contact',
        paragraphs: ['Questions about these Terms: support@mlightcad.com'],
      },
    ],
  },
  privacy: {
    metaTitle: 'Privacy Policy — MLightCAD',
    metaDescription:
      'How MLightCAD collects, uses, and protects personal information on its websites and during commercial license checkout.',
    eyebrow: 'Legal',
    title: 'Privacy Policy',
    updated: 'Last updated: August 24, 2026',
    intro:
      'This Privacy Policy explains how MLightCAD ("we", "us", "our") handles personal information when you visit our websites, request a trial license, or purchase a commercial software license.',
    sections: [
      {
        title: '1. Information we collect',
        paragraphs: ['Depending on how you interact with us, we may collect:'],
        list: [
          'Contact details such as name, company name, work email address, and country or region.',
          'Billing and transaction information processed by our payment provider (Paddle), including order status, amount paid, and tax-related data required for invoicing.',
          'Technical data such as IP address, browser type, device information, and pages visited, collected through standard server logs or analytics tools.',
          'Support communications and trial-license application details you choose to send us by email or form.',
        ],
      },
      {
        title: '2. How we use information',
        paragraphs: ['We use personal information to:'],
        list: [
          'Provide, deliver, and support commercial software licenses.',
          'Process payments and fulfill orders.',
          'Respond to support requests and trial-license applications.',
          'Send transactional messages related to purchases, access, or account issues.',
          'Improve our websites, documentation, and products.',
          'Comply with legal, tax, and accounting obligations.',
        ],
      },
      {
        title: '3. Payment processing',
        paragraphs: [
          'Commercial checkout is handled by Paddle.com Market Limited and its affiliates ("Paddle"), which act as Merchant of Record for applicable transactions. When you purchase a license, Paddle collects payment and customer information needed to complete the order.',
          'Paddle processes personal data under its own privacy policy. We receive order and customer details needed to deliver your license and provide support.',
        ],
      },
      {
        title: '4. Sharing of information',
        paragraphs: ['We do not sell personal information. We may share information with:'],
        list: [
          'Service providers that help us operate our websites, deliver software access, or provide support (for example hosting, email, or package distribution via GitHub/npm).',
          'Paddle and related payment, tax, and fraud-prevention providers for checkout and invoicing.',
          'Authorities when required by law or to protect our rights, users, or the public.',
        ],
      },
      {
        title: '5. Data retention',
        paragraphs: [
          'We retain information for as long as needed to fulfill the purposes described in this policy, including license delivery, support, tax records, and dispute resolution, unless a longer retention period is required by law.',
        ],
      },
      {
        title: '6. Security',
        paragraphs: [
          'We use reasonable administrative, technical, and organizational measures to protect personal information. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.',
        ],
      },
      {
        title: '7. Your rights',
        paragraphs: [
          'Depending on your location, you may have rights to access, correct, delete, or restrict processing of your personal information, or to object to certain processing. To exercise these rights, contact support@mlightcad.com. We may need to verify your identity before responding.',
        ],
      },
      {
        title: '8. International transfers',
        paragraphs: [
          'We and our service providers may process information in countries other than your own. Where required, we rely on appropriate safeguards for cross-border transfers.',
        ],
      },
      {
        title: '9. Children',
        paragraphs: [
          'Our commercial products and checkout are intended for businesses and organizations. We do not knowingly collect personal information from children.',
        ],
      },
      {
        title: '10. Changes and contact',
        paragraphs: [
          'We may update this Privacy Policy from time to time by posting a revised version on this page. Questions: support@mlightcad.com.',
        ],
      },
    ],
  },
  refund: {
    metaTitle: 'Refund Policy — MLightCAD',
    metaDescription:
      'Refund policy for MLightCAD commercial software licenses purchased through Paddle, including perpetual licenses and annual update packages.',
    eyebrow: 'Legal',
    title: 'Refund Policy',
    updated: 'Last updated: August 24, 2026',
    intro:
      'This Refund Policy applies to commercial software licenses sold by MLightCAD through Paddle, including the Proprietary DWG Parser perpetual license and annual update packages.',
    sections: [
      {
        title: '1. Digital products',
        paragraphs: [
          'Our paid products are digital software licenses delivered electronically (for example via npm package access and email instructions). No physical goods are shipped.',
        ],
      },
      {
        title: '2. General policy',
        paragraphs: [
          'Because licenses grant immediate access to proprietary software, all sales are generally final once access has been delivered or activated, except where a refund is required by applicable law or expressly approved by us in writing.',
          'If you believe a purchase was made in error, contact support@mlightcad.com within fourteen (14) days of purchase and before substantial use or deployment. We review refund requests case by case.',
        ],
      },
      {
        title: '3. Perpetual license',
        paragraphs: [
          'The perpetual license is a one-time purchase that grants ongoing use of the licensed package version subject to the applicable license terms. Refunds may be considered if access has not yet been provisioned or if a duplicate charge occurred.',
        ],
      },
      {
        title: '4. Annual update packages',
        paragraphs: [
          'Annual update packages provide access to new upgrade releases for an additional year. You may continue using the version already licensed without purchasing updates.',
          'If you cancel or request a refund for an annual update package, access to future update releases may end for that subscription period. Fees for completed billing periods are generally non-refundable unless required by law.',
        ],
      },
      {
        title: '5. How to request a refund',
        paragraphs: ['Email support@mlightcad.com with:'],
        list: [
          'Your company name and contact email used at checkout.',
          'Paddle order or transaction reference, if available.',
          'Product purchased (perpetual license or annual updates).',
          'Reason for the request.',
        ],
      },
      {
        title: '6. Chargebacks',
        paragraphs: [
          'If you have a billing concern, please contact us before initiating a chargeback so we can help resolve the issue. Unauthorized or abusive chargebacks may result in suspension of license access while the dispute is investigated.',
        ],
      },
      {
        title: '7. Contact',
        paragraphs: ['Refund questions: support@mlightcad.com'],
      },
    ],
  },
}

const legalZh: LegalBundle = {
  terms: {
    metaTitle: '服务条款 — MLightCAD',
    metaDescription: 'MLightCAD 网站、开源项目及通过 Paddle 销售的商业软件授权之服务条款。',
    eyebrow: '法律信息',
    title: '服务条款',
    updated: '最后更新：2026 年 8 月 24 日',
    intro:
      '本服务条款（"条款"）适用于您对 MLightCAD 网站、文档、开源软件及付费商业授权（含 Proprietary DWG Parser）的访问与使用。使用本网站或购买授权，即表示您同意本条款。',
    sections: [
      {
        title: '1. 关于我们',
        paragraphs: [
          'MLightCAD（"我们"）提供面向 Web 的开源 CAD 基础设施，并向企业客户销售商业软件授权。主站：https://mlightcad.com。',
          '授权、付款或支持相关问题请联系 support@mlightcad.com。',
        ],
      },
      {
        title: '2. 开源软件',
        paragraphs: [
          'MLightCAD 在 GitHub 等平台发布的开源组件（如 cad-viewer 及相关包）适用各自仓库中标注的开源许可证。本条款不限制那些许可证的效力。',
        ],
      },
      {
        title: '3. 商业授权',
        paragraphs: [
          '付费产品（含 Proprietary DWG Parser，包名 @mlight-cad/dwg-converter）以商业软件授权形式销售给企业及组织。每次购买均受相应授权条款约束，包括允许的使用范围、限制、交付方式与支持范围。',
          '除非书面明确说明，商业授权不包含源代码。您不得将专有解析器作为独立库或 SDK 再分发或转售。',
        ],
      },
      {
        title: '4. 订单与付款',
        paragraphs: [
          '商业授权可通过结账服务商 Paddle 购买；在适用交易中 Paddle 作为 Merchant of Record。价格、税费与币种以结账页面显示为准。',
          '授权包在付款成功后以数字方式交付，访问说明将发送至结账时填写的邮箱。',
        ],
      },
      {
        title: '5. 可接受使用',
        paragraphs: ['您同意不得：'],
        list: [
          '将我们的服务用于违法目的，或违反出口、制裁或知识产权相关法规。',
          '对专有软件包进行逆向工程、反编译或提取源代码（适用法律明确允许的除外）。',
          '破坏或干扰我们网站、结账或交付系统的安全或可用性。',
          '虚假陈述与 MLightCAD 的关系，或在授权范围外转售专有软件包。',
        ],
      },
      {
        title: '6. 免责声明',
        paragraphs: [
          '在法律允许的最大范围内，我们的网站与软件按"现状"和"可用"基础提供。我们否认所有明示或默示保证，包括适销性、特定用途适用性及不侵权的默示保证。',
          'CAD 解析与渲染效果取决于图纸内容与部署环境。您应自行验证是否满足生产使用要求。',
        ],
      },
      {
        title: '7. 责任限制',
        paragraphs: [
          '在法律允许的最大范围内，MLightCAD 不对因使用我们的网站或软件而产生的间接、附带、特殊、后果性或惩罚性损害，或利润、数据或商业机会损失承担责任。',
          '与某次商业授权购买相关的我们的总责任，以该授权购买前十二（12）个月内您就相应授权向我们支付的金额为上限（法律禁止此类限制的除外）。',
        ],
      },
      {
        title: '8. 变更',
        paragraphs: [
          '我们可能不时更新本条款。上方"最后更新"日期表示最新版本。重大变更将发布在本页面。变更生效后继续使用我们的服务，即视为接受修订后的条款。',
        ],
      },
      {
        title: '9. 适用法律',
        paragraphs: [
          '本条款受 MLightCAD 作为销售方所适用法律的管辖，冲突法规则除外。您所在司法辖区强制性消费者保护规定（如适用）不受影响。',
        ],
      },
      {
        title: '10. 联系方式',
        paragraphs: ['条款相关问题：support@mlightcad.com'],
      },
    ],
  },
  privacy: {
    metaTitle: '隐私政策 — MLightCAD',
    metaDescription: 'MLightCAD 在其网站及商业授权结账过程中如何收集、使用和保护个人信息。',
    eyebrow: '法律信息',
    title: '隐私政策',
    updated: '最后更新：2026 年 8 月 24 日',
    intro:
      '本隐私政策说明 MLightCAD（"我们"）在您访问网站、申请试用授权或购买商业软件授权时如何处理个人信息。',
    sections: [
      {
        title: '1. 我们收集的信息',
        paragraphs: ['根据您的互动方式，我们可能收集：'],
        list: [
          '联系信息，如姓名、公司名称、工作邮箱、国家或地区。',
          '由支付服务商 Paddle 处理的账单与交易信息，包括订单状态、支付金额及开票所需的税务相关数据。',
          '技术数据，如 IP 地址、浏览器类型、设备信息及访问页面，可能通过服务器日志或分析工具收集。',
          '您通过邮件或表单发送给我们的支持沟通内容及试用授权申请信息。',
        ],
      },
      {
        title: '2. 信息用途',
        paragraphs: ['我们使用个人信息用于：'],
        list: [
          '提供、交付和支持商业软件授权。',
          '处理付款并履行订单。',
          '回复支持请求与试用授权申请。',
          '发送与购买、访问或账户问题相关的交易类通知。',
          '改进网站、文档与产品。',
          '履行法律、税务与会计义务。',
        ],
      },
      {
        title: '3. 支付处理',
        paragraphs: [
          '商业结账由 Paddle.com Market Limited 及其关联公司（"Paddle"）处理；在适用交易中 Paddle 作为 Merchant of Record。购买授权时，Paddle 会收集完成订单所需的付款与客户信息。',
          'Paddle 依据其隐私政策处理个人数据。我们会收到交付授权及提供支持所需的订单与客户信息。',
        ],
      },
      {
        title: '4. 信息共享',
        paragraphs: ['我们不出售个人信息。我们可能向以下对象共享信息：'],
        list: [
          '帮助我们运营网站、交付软件访问或提供支持的服务提供商（如托管、邮件或 GitHub/npm 包分发）。',
          'Paddle 及相关的支付、税务与防欺诈服务提供商。',
          '在法律要求或为保护我们、用户或公众权利时向主管机关提供。',
        ],
      },
      {
        title: '5. 数据保留',
        paragraphs: [
          '我们会在实现本政策所述目的所需期间内保留信息，包括授权交付、支持、税务记录与争议处理，法律要求更长保留期的除外。',
        ],
      },
      {
        title: '6. 安全',
        paragraphs: [
          '我们采取合理的管理、技术与组织措施保护个人信息。任何传输或存储方式都无法保证绝对安全。',
        ],
      },
      {
        title: '7. 您的权利',
        paragraphs: [
          '根据您所在地区，您可能享有访问、更正、删除或限制处理个人信息，或反对特定处理的权利。请发送邮件至 support@mlightcad.com 行使权利。我们可能在回复前要求验证身份。',
        ],
      },
      {
        title: '8. 跨境传输',
        paragraphs: [
          '我们及服务提供商可能在您所在国家/地区以外的地点处理信息。在需要时，我们会采用适当的跨境传输保障措施。',
        ],
      },
      {
        title: '9. 儿童',
        paragraphs: [
          '我们的商业产品与结账面向企业及组织。我们不会有意收集儿童个人信息。',
        ],
      },
      {
        title: '10. 变更与联系',
        paragraphs: [
          '我们可能通过在本页发布修订版来更新本隐私政策。相关问题：support@mlightcad.com。',
        ],
      },
    ],
  },
  refund: {
    metaTitle: '退款政策 — MLightCAD',
    metaDescription: '通过 Paddle 购买的 MLightCAD 商业软件授权（含永久授权与年度升级包）的退款政策。',
    eyebrow: '法律信息',
    title: '退款政策',
    updated: '最后更新：2026 年 8 月 24 日',
    intro:
      '本退款政策适用于 MLightCAD 通过 Paddle 销售的商业软件授权，包括 Proprietary DWG Parser 永久授权与年度升级包。',
    sections: [
      {
        title: '1. 数字产品',
        paragraphs: [
          '我们的付费产品为以电子方式交付的数字软件授权（例如通过 npm 包访问及邮件说明）。不涉及实体商品发货。',
        ],
      },
      {
        title: '2. 一般原则',
        paragraphs: [
          '由于授权会在交付后立即提供对专有软件的访问，在访问已交付或激活后，除适用法律要求或我们书面明确同意外，销售通常为最终交易。',
          '若您认为购买有误，请在购买后十四（14）日内、且在尚未实质性使用或部署前联系 support@mlightcad.com。我们将逐案审核退款申请。',
        ],
      },
      {
        title: '3. 永久授权',
        paragraphs: [
          '永久授权为一次性购买，在相应授权条款下可持续使用已授权版本。若访问尚未开通，或发生重复扣款，我们可能考虑退款。',
        ],
      },
      {
        title: '4. 年度升级包',
        paragraphs: [
          '年度升级包可在额外一年内获取新的升级版本。您可继续使用已授权版本，无需购买升级包。',
          '若取消或申请年度升级包退款，该订阅周期内对未来升级版本的访问可能终止。已完成的计费周期费用通常不予退款（法律另有规定的除外）。',
        ],
      },
      {
        title: '5. 如何申请退款',
        paragraphs: ['请发送邮件至 support@mlightcad.com，并提供：'],
        list: [
          '公司名称及结账时使用的联系邮箱。',
          'Paddle 订单或交易编号（如有）。',
          '购买的产品（永久授权或年度升级）。',
          '申请原因。',
        ],
      },
      {
        title: '6. 拒付',
        paragraphs: [
          '如有账单疑问，请先联系我们协助处理，再发起拒付。未经授权或滥用的拒付可能在调查期间导致授权访问被暂停。',
        ],
      },
      {
        title: '7. 联系方式',
        paragraphs: ['退款相关问题：support@mlightcad.com'],
      },
    ],
  },
}

/** Canonical path for each legal page. */
export const LEGAL_PATHS: Record<LegalPage, string> = {
  terms: '/terms.html',
  privacy: '/privacy.html',
  refund: '/refunds.html',
}

/**
 * Resolve localized legal copy.
 * Non-English locales fall back to English for legal text.
 */
export function legalCopy(page: LegalPage, locale: Locale): LegalPageCopy {
  const bundle = locale === 'zh' ? legalZh : legalEn
  return bundle[page]
}

/** Detect which legal page is active from `document.body`. */
export function detectLegalPage(): LegalPage | null {
  const raw = document.body.dataset.legal
  if (raw === 'terms' || raw === 'privacy' || raw === 'refund') return raw
  return null
}
