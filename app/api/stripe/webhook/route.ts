import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { constructWebhookEvent } from '@/lib/stripe'

// Necesario para leer el raw body sin que Next.js lo parsee
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    // Leer el raw body como buffer (imprescindible para verificar la firma)
    const rawBody = await request.arrayBuffer()
    const payload = Buffer.from(rawBody)

    // Obtener la firma del header
    const sig = request.headers.get('stripe-signature')
    if (!sig) {
      console.error('[webhook] Falta el header stripe-signature')
      return NextResponse.json(
        { error: 'Falta el header de firma de Stripe' },
        { status: 400 }
      )
    }

    // Verificar y construir el evento
    let event: Stripe.Event
    try {
      event = await constructWebhookEvent(payload, sig)
    } catch (err) {
      console.error('[webhook] Error al verificar la firma del webhook:', err)
      return NextResponse.json(
        { error: 'Firma de webhook inválida' },
        { status: 400 }
      )
    }

    console.log(`[webhook] Evento recibido: ${event.type} (id: ${event.id})`)

    // ── Manejadores de eventos ────────────────────────────────────────────────

    switch (event.type) {

      // ── Checkout completado ─────────────────────────────────────────────────
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
        console.log('[webhook] ORDEN COMPLETADA')
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
        console.log(`  Session ID     : ${session.id}`)
        console.log(`  Cliente email  : ${session.customer_email ?? session.customer_details?.email ?? 'N/A'}`)
        console.log(`  Cliente nombre : ${session.customer_details?.name ?? 'N/A'}`)
        console.log(`  Importe total  : ${((session.amount_total ?? 0) / 100).toFixed(2)} ${(session.currency ?? 'eur').toUpperCase()}`)
        console.log(`  Modo           : ${session.mode}`)
        console.log(`  Estado pago    : ${session.payment_status}`)
        console.log(`  Producto ID    : ${session.metadata?.productId ?? 'N/A'}`)
        console.log(`  Producto nombre: ${session.metadata?.productName ?? 'N/A'}`)
        console.log(`  Payment Intent : ${session.payment_intent ?? 'N/A'}`)
        console.log(`  Suscripción ID : ${session.subscription ?? 'N/A'}`)
        console.log(`  Timestamp      : ${new Date(event.created * 1000).toISOString()}`)
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

        // TODO: Aquí conectar con la base de datos para registrar la orden
        // await db.orders.create({ sessionId: session.id, ... })

        // TODO: Enviar email de confirmación al cliente
        // await sendConfirmationEmail(session.customer_details?.email, session)

        break
      }

      // ── Suscripción creada ──────────────────────────────────────────────────
      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription

        console.log('[webhook] SUSCRIPCIÓN CREADA')
        console.log(`  Suscripción ID : ${subscription.id}`)
        console.log(`  Cliente ID     : ${subscription.customer}`)
        console.log(`  Estado         : ${subscription.status}`)
        console.log(`  Producto ID    : ${subscription.metadata?.productId ?? 'N/A'}`)
        console.log(`  Ciclo de facturación: ${new Date(subscription.billing_cycle_anchor * 1000).toISOString()}`)
        console.log(`  Cancela en     : ${subscription.cancel_at ? new Date(subscription.cancel_at * 1000).toISOString() : 'N/A'}`)

        // TODO: Activar el plan en la cuenta del usuario
        // await db.subscriptions.create({ subscriptionId: subscription.id, ... })

        break
      }

      // ── Suscripción cancelada ───────────────────────────────────────────────
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription

        console.log('[webhook] SUSCRIPCIÓN CANCELADA')
        console.log(`  Suscripción ID : ${subscription.id}`)
        console.log(`  Cliente ID     : ${subscription.customer}`)
        console.log(`  Estado final   : ${subscription.status}`)
        console.log(`  Cancelado en   : ${subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : 'N/A'}`)

        // TODO: Revocar acceso al plan en la cuenta del usuario
        // await db.subscriptions.deactivate(subscription.id)

        break
      }

      // ── Pago fallido ────────────────────────────────────────────────────────
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        console.error('[webhook] PAGO FALLIDO')
        console.error(`  PaymentIntent ID : ${paymentIntent.id}`)
        console.error(`  Cliente          : ${paymentIntent.customer ?? 'N/A'}`)
        console.error(`  Importe          : ${(paymentIntent.amount / 100).toFixed(2)} ${paymentIntent.currency.toUpperCase()}`)
        console.error(`  Motivo fallo     : ${paymentIntent.last_payment_error?.message ?? 'Desconocido'}`)
        console.error(`  Código error     : ${paymentIntent.last_payment_error?.code ?? 'N/A'}`)
        console.error(`  Método pago      : ${paymentIntent.last_payment_error?.payment_method?.type ?? 'N/A'}`)

        // TODO: Notificar al usuario del fallo
        // await notifyPaymentFailure(paymentIntent)

        break
      }

      // ── Eventos no manejados ────────────────────────────────────────────────
      default:
        console.log(`[webhook] Evento no manejado: ${event.type} — ignorado`)
        break
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error: unknown) {
    console.error('[webhook] Error inesperado al procesar el webhook:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor al procesar el webhook' },
      { status: 500 }
    )
  }
}
