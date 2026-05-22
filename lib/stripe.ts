import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-01-27.acacia',
  typescript: true,
})

// ─── createCheckoutSession ────────────────────────────────────────────────────

export interface CheckoutSessionParams {
  priceId: string
  productId: string
  quantity: number
  customerEmail?: string
  successUrl: string
  cancelUrl: string
  mode: 'payment' | 'subscription'
  metadata?: Record<string, string>
}

export async function createCheckoutSession(
  params: CheckoutSessionParams
): Promise<Stripe.Checkout.Session> {
  const {
    priceId,
    productId,
    quantity,
    customerEmail,
    successUrl,
    cancelUrl,
    mode,
    metadata = {},
  } = params

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode,
    line_items: [
      {
        price: priceId,
        quantity,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      productId,
      ...metadata,
    },
    // Always collect billing address
    billing_address_collection: 'required',
    // Locale
    locale: 'es',
    // Allow promo codes
    allow_promotion_codes: true,
  }

  // Pre-fill email if provided
  if (customerEmail) {
    sessionParams.customer_email = customerEmail
  }

  // Subscription-specific options
  if (mode === 'subscription') {
    sessionParams.subscription_data = {
      metadata: {
        productId,
        ...metadata,
      },
    }
  }

  // Payment-specific options
  if (mode === 'payment') {
    sessionParams.payment_intent_data = {
      metadata: {
        productId,
        ...metadata,
      },
    }
  }

  const session = await stripe.checkout.sessions.create(sessionParams)
  return session
}

// ─── constructWebhookEvent ────────────────────────────────────────────────────

export async function constructWebhookEvent(
  payload: string | Buffer,
  sig: string
): Promise<Stripe.Event> {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error('Missing STRIPE_WEBHOOK_SECRET environment variable')
  }

  const event = stripe.webhooks.constructEvent(
    payload,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET
  )

  return event
}

// ─── retrieveSession ──────────────────────────────────────────────────────────

export async function retrieveSession(
  sessionId: string
): Promise<Stripe.Checkout.Session> {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'customer', 'payment_intent'],
  })

  return session
}
