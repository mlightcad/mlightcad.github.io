import * as jose from 'npm:jose@5.9.6'
import { normalizePem } from './crypto.ts'

export const LICENSE_PRODUCT = '@mlightcad/dwg-converter'

export type ProductType = 'perpetual' | 'annual' | 'unknown'

/** Load PKCS#8 private key from `DWG_LICENSE_PRIVATE_KEY` secret. */
export async function loadLicensePrivateKey(): Promise<CryptoKey> {
  const raw = Deno.env.get('DWG_LICENSE_PRIVATE_KEY')
  if (!raw) throw new Error('Missing DWG_LICENSE_PRIVATE_KEY')
  return jose.importPKCS8(normalizePem(raw), 'RS256')
}

/**
 * Compute license expiry.
 * Perpetual → far future; annual → +1 year (or subscription period end).
 */
export function expiryForProduct(
  productType: ProductType,
  periodEndIso?: string | null,
): Date {
  if (periodEndIso) {
    const d = new Date(periodEndIso)
    if (!Number.isNaN(d.getTime())) return d
  }
  const now = new Date()
  if (productType === 'annual') {
    return new Date(Date.UTC(now.getUTCFullYear() + 1, now.getUTCMonth(), now.getUTCDate(), 23, 59, 59))
  }
  // Perpetual / unknown: long-lived offline key (100 years).
  return new Date(Date.UTC(now.getUTCFullYear() + 100, 11, 31, 23, 59, 59))
}

/**
 * Issue an offline license JWT matching `scripts/issue-license.mjs` claims.
 *
 * @param customerSub - Stable subject id (e.g. paddle customer id or email slug).
 * @param expiresAt - Absolute expiry.
 */
export async function issueLicenseJwt(
  customerSub: string,
  expiresAt: Date,
): Promise<string> {
  const key = await loadLicensePrivateKey()
  const expSec = Math.floor(expiresAt.getTime() / 1000)
  return new jose.SignJWT({ product: LICENSE_PRODUCT })
    .setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
    .setIssuer('mlightcad')
    .setSubject(customerSub)
    .setIssuedAt()
    .setExpirationTime(expSec)
    .sign(key)
}

/** Derive a stable JWT `sub` from Paddle customer id or email. */
export function customerSubFor(paddleCustomerId: string | null, email: string): string {
  if (paddleCustomerId) return paddleCustomerId
  return email.trim().toLowerCase().replace(/[^a-z0-9@._+-]/g, '_')
}
