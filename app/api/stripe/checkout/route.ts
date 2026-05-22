import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/stripe'

// IDs de productos de suscripción (cobro recurrente)
const SUBSCRIPTION_PRODUCT_IDS = new Set([
  'escudo-total',
  'pack-empresarial',
])

export async function POST(request: NextRequest) {
  try {
    // Parsear el body
    let body: {
      priceId?: string
      productId?: string
      quantity?: number
      customerEmail?: string
      productName?: string
    }

    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { error: 'El cuerpo de la solicitud no es JSON válido' },
        { status: 400 }
      )
    }

    const { priceId, productId, quantity = 1, customerEmail, productName } = body

    // ── Validaciones ──────────────────────────────────────────────────────────

    if (!priceId || typeof priceId !== 'string') {
      return NextResponse.json(
        { error: 'El campo priceId es obligatorio y debe ser una cadena de texto' },
        { status: 400 }
      )
    }

    if (!productId || typeof productId !== 'string') {
      return NextResponse.json(
        { error: 'El campo productId es obligatorio y debe ser una cadena de texto' },
        { status: 400 }
      )
    }

    if (!productName || typeof productName !== 'string') {
      return NextResponse.json(
        { error: 'El campo productName es obligatorio y debe ser una cadena de texto' },
        { status: 400 }
      )
    }

    if (typeof quantity !== 'number' || quantity < 1 || !Number.isInteger(quantity)) {
      return NextResponse.json(
        { error: 'El campo quantity debe ser un entero positivo' },
        { status: 400 }
      )
    }

    if (customerEmail !== undefined && typeof customerEmail !== 'string') {
      return NextResponse.json(
        { error: 'El campo customerEmail debe ser una cadena de texto' },
        { status: 400 }
      )
    }

    // Validación básica de formato de email
    if (customerEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(customerEmail)) {
        return NextResponse.json(
          { error: 'El formato del email no es válido' },
          { status: 400 }
        )
      }
    }

    // ── Determinar modo de pago ───────────────────────────────────────────────

    const mode: 'payment' | 'subscription' = SUBSCRIPTION_PRODUCT_IDS.has(productId)
      ? 'subscription'
      : 'payment'

    // ── Construir URLs ────────────────────────────────────────────────────────

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const successUrl = `${baseUrl}/checkout/exito?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${baseUrl}/carrito`

    // ── Crear sesión Stripe ───────────────────────────────────────────────────

    const session = await createCheckoutSession({
      priceId,
      productId,
      quantity,
      customerEmail,
      successUrl,
      cancelUrl,
      mode,
      metadata: {
        productName,
        productId,
        source: 'web',
      },
    })

    if (!session.url) {
      return NextResponse.json(
        { error: 'No se pudo generar la URL de pago. Inténtalo de nuevo.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ url: session.url }, { status: 200 })
  } catch (error: unknown) {
    console.error('[stripe/checkout] Error al crear la sesión:', error)

    // Errores específicos de Stripe
    if (
      error &&
      typeof error === 'object' &&
      'type' in error &&
      typeof (error as { type: unknown }).type === 'string'
    ) {
      const stripeError = error as { type: string; message?: string }

      if (stripeError.type === 'StripeInvalidRequestError') {
        return NextResponse.json(
          { error: `Solicitud inválida de Stripe: ${stripeError.message ?? 'desconocido'}` },
          { status: 400 }
        )
      }

      if (stripeError.type === 'StripeAuthenticationError') {
        return NextResponse.json(
          { error: 'Error de autenticación con Stripe. Contacta al soporte.' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Error interno del servidor al procesar el pago. Inténtalo de nuevo.' },
      { status: 500 }
    )
  }
}
