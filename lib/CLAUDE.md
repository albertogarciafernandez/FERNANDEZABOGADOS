# lib/ — Utilidades del Proyecto

Fuentes de verdad y helpers reutilizables. Importar siempre desde `@/lib/`.

## Archivos

### products.ts — Catálogo de Productos (FUENTE ÚNICA DE VERDAD)
```ts
PRODUCTS: LegalProduct[]          // array con los 6 productos
getProductBySlug(slug)            // → LegalProduct | undefined
getProductById(id)                // → LegalProduct | undefined
getFeaturedProducts()             // → LegalProduct[] (popular: true)
getProductsByCategory(cat)        // → LegalProduct[]
formatPrice(price, interval?)     // → "49€/mes" | "29€"
getDiscount(original, current)    // → porcentaje descuento
getBillingLabel(product)          // → string etiqueta facturación
```
Añadir productos: editar el array `PRODUCTS` y actualizar `ProductId` en `types/product.ts`.

### stripe.ts — Integración Stripe
```ts
stripe                            // Stripe client (sk_placeholder si no hay env var)
createCheckoutSession(params)     // → Stripe.Checkout.Session
constructWebhookEvent(payload, sig) // → Stripe.Event (verifica firma)
retrieveSession(sessionId)        // → Stripe.Checkout.Session (expand: line_items, customer)
```
**Regla crítica:** NUNCA exportar constantes desde route handlers — solo verbos HTTP.

### claude.ts — IA Legal
```ts
anthropic                         // Anthropic client
LEGAL_SYSTEM_PROMPT               // System prompt del agente LEX
LegalAnalysis                     // tipo de respuesta estructurada
```
Modelo usado en `/api/analyze`: `claude-sonnet-4-6`

### cart-store.ts — Estado del Carrito (Zustand)
```ts
useCartStore()                    // hook: { items, addItem, removeItem, clearCart, total }
```
Persiste en localStorage. Importar solo en componentes `'use client'`.

### animations.ts — Variantes Framer Motion
```ts
fadeInUp, fadeInDown, fadeInLeft, fadeInRight
scaleIn, staggerContainer, staggerItem
cardHover, glassMorphHover, hoverLift
pulseVariants, floatVariants
pageVariants                      // para <AnimatePresence> de rutas
springConfig, bouncySpring, smoothSpring
```
Usar siempre estas variantes. No definir nuevas inline en componentes.

### seo.ts — Metadata y SEO
```ts
defaultMetadata                   // Metadata base (usado en app/layout.tsx)
generatePageMetadata({ title, description, path, image?, noIndex? })
generateProductMetadata(product)  // para /tienda/[slug]
PRODUCT_CATALOG                   // array con datos SEO de cada producto
```

### copy.ts — Copy y Contenido
```ts
HERO_COPY                         // headlines del hero
STATS                             // estadísticas (2847 casos, 96%...)
TESTIMONIALS                      // 6 testimonios con rating, rol, empresa
FAQS                              // 10 preguntas frecuentes
HOW_IT_WORKS                      // 3 pasos del proceso
SOCIAL_PROOF_BAR                  // logos/stats de confianza
```

### utils.ts
```ts
cn(...classes)                    // clsx + tailwind-merge (usar SIEMPRE para condicionales)
```

## Reglas

- No importar `stripe` en componentes client (solo en API routes y Server Components)
- No importar `anthropic` en componentes client (solo en API routes)
- `useCartStore` solo en componentes `'use client'`
- `cn()` para todas las clases condicionales — nunca template literals
