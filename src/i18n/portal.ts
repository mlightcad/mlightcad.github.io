import type { Locale } from './types'

export type PortalCopy = {
  metaTitle: string
  metaDescription: string
  eyebrow: string
  title: string
  lead: string
  emailLabel: string
  emailPlaceholder: string
  requestCta: string
  requesting: string
  requestSent: string
  requestError: string
  notConfigured: string
  sessionLoading: string
  sessionError: string
  signedInAs: string
  licensesTitle: string
  noLicenses: string
  product: string
  type: string
  status: string
  expires: string
  licenseKey: string
  copyKey: string
  copied: string
  installTitle: string
  installHint: string
  support: string
  requestAnother: string
}

const en: PortalCopy = {
  metaTitle: 'License Portal — MLightCAD',
  metaDescription: 'View your Proprietary DWG Parser offline license key.',
  eyebrow: 'Account',
  title: 'License portal',
  lead: 'Enter the email used at checkout. We will send a magic link to view your offline license key. Package download access is granted via GitHub Packages.',
  emailLabel: 'Purchase email',
  emailPlaceholder: 'you@company.com',
  requestCta: 'Email magic link',
  requesting: 'Sending…',
  requestSent: 'If that email has a license, a magic link is on its way. Check your inbox.',
  requestError: 'Could not send the link. Try again or email support@mlightcad.com.',
  notConfigured: 'License portal is not configured (missing Supabase URL / publishable key).',
  sessionLoading: 'Loading your licenses…',
  sessionError: 'This link is invalid or expired. Request a new magic link below.',
  signedInAs: 'Signed in as',
  licensesTitle: 'Your licenses',
  noLicenses: 'No active licenses found for this email.',
  product: 'Product',
  type: 'Type',
  status: 'Status',
  expires: 'Expires',
  licenseKey: 'Offline license key',
  copyKey: 'Copy key',
  copied: 'Copied',
  installTitle: 'Install (GitHub Packages)',
  installHint:
    'After MLightCAD grants your GitHub account access, use a PAT with read:packages.',
  support: 'Need help? Email support@mlightcad.com',
  requestAnother: 'Request a new magic link',
}

const zh: PortalCopy = {
  metaTitle: '授权门户 — MLightCAD',
  metaDescription: '查看 Proprietary DWG Parser 的离线 License Key。',
  eyebrow: '账户',
  title: '授权门户',
  lead: '请输入结账时使用的邮箱。我们将发送魔法链接用于查看离线 License Key。私有包下载权限通过 GitHub Packages 开通。',
  emailLabel: '购买邮箱',
  emailPlaceholder: 'you@company.com',
  requestCta: '发送魔法链接',
  requesting: '发送中…',
  requestSent: '若该邮箱存在授权，魔法链接已发出，请查收邮件。',
  requestError: '发送失败。请重试或联系 support@mlightcad.com。',
  notConfigured: '授权门户未配置（缺少 Supabase URL / publishable key）。',
  sessionLoading: '正在加载授权信息…',
  sessionError: '链接无效或已过期。请重新申请魔法链接。',
  signedInAs: '当前邮箱',
  licensesTitle: '你的授权',
  noLicenses: '该邮箱下没有有效授权。',
  product: '产品',
  type: '类型',
  status: '状态',
  expires: '到期',
  licenseKey: '离线 License Key',
  copyKey: '复制 Key',
  copied: '已复制',
  installTitle: '安装（GitHub Packages）',
  installHint: '在 MLightCAD 为你的 GitHub 账号开通权限后，使用带 read:packages 的 PAT 安装。',
  support: '需要帮助？请联系 support@mlightcad.com',
  requestAnother: '重新申请魔法链接',
}

export function portalCopy(locale: Locale): PortalCopy {
  return locale === 'zh' ? zh : en
}
