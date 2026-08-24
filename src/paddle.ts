import { initializePaddle, type Paddle } from '@paddle/paddle-js'

/** Which commercial SKU the buyer is purchasing. */
export type PaddleProduct = 'perpetual' | 'annual'

let paddlePromise: Promise<Paddle | undefined> | null = null

/** Resolve sandbox vs live from Vite env (defaults to sandbox). */
function paddleEnvironment(): 'sandbox' | 'production' {
  return import.meta.env.VITE_PADDLE_ENV === 'production' ? 'production' : 'sandbox'
}

/** Client-side token from Vite env. */
function clientToken(): string | undefined {
  const token = import.meta.env.VITE_PADDLE_CLIENT_TOKEN
  return token && token.length > 0 ? token : undefined
}

/** Price id for a product SKU. */
export function priceIdFor(product: PaddleProduct): string | undefined {
  const id =
    product === 'perpetual'
      ? import.meta.env.VITE_PADDLE_PRICE_PERPETUAL
      : import.meta.env.VITE_PADDLE_PRICE_ANNUAL
  return id && id.length > 0 ? id : undefined
}

/** Whether Paddle checkout can be opened with the current env. */
export function isPaddleConfigured(): boolean {
  return Boolean(clientToken() && priceIdFor('perpetual') && priceIdFor('annual'))
}

/**
 * Lazily load and initialize Paddle.js once.
 *
 * @returns The Paddle instance, or `undefined` when misconfigured / load failed.
 */
export async function getPaddle(): Promise<Paddle | undefined> {
  if (!clientToken()) {
    console.warn('Paddle: VITE_PADDLE_CLIENT_TOKEN is not set')
    return undefined
  }
  if (!paddlePromise) {
    paddlePromise = initializePaddle({
      environment: paddleEnvironment(),
      token: clientToken()!,
    }).catch((err: unknown) => {
      console.error('Paddle initialize failed', err)
      paddlePromise = null
      return undefined
    })
  }
  return paddlePromise
}

/**
 * Fetch localized formatted totals for both SKUs via PricePreview.
 *
 * @returns Map of product → formatted total string (e.g. "$3,000.00").
 */
export async function fetchLocalizedPrices(): Promise<Partial<Record<PaddleProduct, string>>> {
  const perpetual = priceIdFor('perpetual')
  const annual = priceIdFor('annual')
  if (!perpetual || !annual) return {}

  const paddle = await getPaddle()
  if (!paddle) return {}

  try {
    const preview = await paddle.PricePreview({
      items: [
        { priceId: perpetual, quantity: 1 },
        { priceId: annual, quantity: 1 },
      ],
    })
    const out: Partial<Record<PaddleProduct, string>> = {}
    for (const line of preview.data.details.lineItems) {
      const id = line.price.id
      const formatted = line.formattedTotals.total
      if (id === perpetual) out.perpetual = formatted
      if (id === annual) out.annual = formatted
    }
    return out
  } catch (err) {
    console.error('Paddle PricePreview failed', err)
    return {}
  }
}

/**
 * Open overlay checkout for a single SKU.
 *
 * @param product - Perpetual license or annual updates.
 * @param email - Optional email to prefill the contact step.
 */
export async function openCheckout(product: PaddleProduct, email?: string): Promise<void> {
  const priceId = priceIdFor(product)
  if (!priceId) {
    console.error(`Paddle: missing price id for ${product}`)
    return
  }

  const paddle = await getPaddle()
  if (!paddle) return

  const successUrl = new URL('dwg-parser.html', window.location.origin)
  successUrl.searchParams.set('purchase', 'success')
  successUrl.searchParams.set('product', product)

  paddle.Checkout.open({
    items: [{ priceId, quantity: 1 }],
    ...(email ? { customer: { email } } : {}),
    customData: { source: 'dwg-parser', product },
    settings: {
      successUrl: successUrl.toString(),
      allowLogout: true,
    },
  })
}
