# Integración Stripe — Resumen de Implementación

**Fecha:** 2026-05-22  
**Estado:** Completado · TypeScript sin errores · `npx tsc --noEmit` ✓  
**Stripe SDK:** v22.1.1 · API version `2026-04-22.dahlia`

---

## Archivos creados

### 1. `lib/stripe.ts`
Librería central de Stripe reutilizable en toda la app:
- Instancia `stripe` exportada con la API key y versión correctas (`2026-04-22.dahlia`).
- `createCheckoutSession(params)` — crea sesión de Checkout con soporte para `payment` y `subscription`, locale español, billing address, promo codes, metadata en session/subscription/payment_intent.
- `constructWebhookEvent(payload, sig)` — verifica la firma HMAC con `STRIPE_WEBHOOK_SECRET`.
- `retrieveSession(sessionId)` — recupera sesión expandida con `line_items`, `customer` y `payment_intent`.

### 2. `app/api/stripe/checkout/route.ts`
`POST /api/stripe/checkout`:
- Acepta `{ priceId, productId, quantity, customerEmail, productName }`.
- Validación completa de todos los campos con mensajes de error en español.
- Detecta automáticamente `mode: 'subscription'` para `escudo-total` y `pack-empresarial`; `'payment'` para el resto.
- `success_url` → `/checkout/exito?session_id={CHECKOUT_SESSION_ID}`.
- `cancel_url` → `/carrito`.
- Retorna `{ url: session.url }` o errores tipados 400/500.

### 3. `app/api/stripe/webhook/route.ts`
`POST /api/stripe/webhook`:
- `export const dynamic = 'force-dynamic'` para evitar que Next.js cachee o parsee el body.
- Lee raw body con `request.arrayBuffer()` → `Buffer` (requisito de la firma Stripe).
- Verifica firma antes de procesar cualquier evento.
- Maneja 4 eventos con logging detallado:
  - `checkout.session.completed` — loguea la orden completa (session ID, email, importe, metadata).
  - `customer.subscription.created` — loguea la nueva suscripción.
  - `customer.subscription.deleted` — loguea la cancelación.
  - `payment_intent.payment_failed` — loguea el error con código y motivo.
- Retorna `{ received: true }`.

### 4. `app/api/stripe/products/route.ts`
`GET /api/stripe/products`:
- Catálogo de 6 productos legales premium con tipo TypeScript `LegalProduct` exportado.
- Headers `Cache-Control: public, s-maxage=300, stale-while-revalidate=600`.
- Responde con `{ products[], total, updatedAt }`.

| ID | Nombre | Precio | Modo |
|----|--------|--------|------|
| `escudo-total` | Escudo Total | €49/mes | subscription |
| `analisis-expres` | Análisis Exprés | €29 | payment |
| `recurso-garantizado` | Recurso Garantizado | €0 (15% éxito) | payment |
| `pack-empresarial` | Pack Empresarial | €199/mes | subscription |
| `contrato-blindado` | Contrato Blindado | €79 | payment |
| `defensa-premium` | Defensa Premium | €499 | payment |

> **Acción requerida:** Reemplazar los `priceId` placeholder (`price_xxx`) por los IDs reales del Dashboard de Stripe.

### 5. `app/checkout/exito/page.tsx`
Página de confirmación de pago premium:
- Animación `framer-motion`: círculo verde con checkmark SVG animado (pathLength), glow pulsante, entrada escalonada de todos los elementos.
- Título "¡Pago realizado con éxito!" con gradiente dorado (`from-amber-400 to-orange-500`).
- Muestra `session_id` de la URL en `font-mono` como referencia de pago.
- Sección "¿Qué ocurre ahora?" con 4 pasos: email confirmación, dashboard, perfil, soporte.
- CTAs: botón dorado → `/dashboard`, botón outline → `/`.
- `useSearchParams` envuelto en `<Suspense>` (requisito Next.js 15 App Router).
- Fondo oscuro `#050508` con blobs decorativos y grid subtle, consistente con el diseño del sitio.

---

## Variables de entorno requeridas

Añadir al `.env.local` (o al proveedor de hosting):

```
STRIPE_SECRET_KEY=sk_live_...         # o sk_test_... para desarrollo
STRIPE_WEBHOOK_SECRET=whsec_...       # secreto del webhook de Stripe Dashboard
NEXT_PUBLIC_BASE_URL=https://tudominio.com  # para construir success_url y cancel_url
```

## Configuración del webhook en Stripe Dashboard

Registrar el endpoint: `https://tudominio.com/api/stripe/webhook`

Eventos a escuchar:
- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.deleted`
- `payment_intent.payment_failed`

## Testing local del webhook

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
stripe trigger checkout.session.completed
```
