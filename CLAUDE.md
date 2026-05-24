# CLAUDE.md — Justicia Legalia Premium / Imperio Legal SLP

Proyecto legal-tech e-commerce completo. Lee este archivo antes de hacer cualquier cambio.

## Identidad del Proyecto

- **Nombre:** Justicia Legalia Premium · Imperio Legal SLP
- **Tagline:** "Tu escudo legal. Siempre encendido."
- **Dominio:** Plataforma de servicios jurídicos online con IA en España
- **Idioma:** Español (toda la UI y copy en español)

## Stack Técnico

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| Next.js | 15.3.2 | Framework principal (App Router) |
| React | 19 | UI |
| TypeScript | 5 | Lenguaje (strict mode) |
| Tailwind CSS | 4 | Estilos (no CSS inline) |
| Framer Motion | 12.12.1 | Todas las animaciones |
| Zustand | 5.0.13 | Estado global del carrito |
| Stripe | 22.1.1 | Pagos y suscripciones |
| @anthropic-ai/sdk | 0.52.0 | Claude AI para análisis legal |
| Vercel Analytics | 2.0.1 | Métricas de uso |
| React Hot Toast | 2.6.0 | Notificaciones |

## Comandos Esenciales

```bash
npm run dev      # Desarrollo en http://localhost:3000
npm run build    # Build de producción (verifica tipos)
npm start        # Servidor producción
```

## Arquitectura — App Router

```
app/
├── page.tsx                    # Homepage (13 secciones, 527 líneas)
├── layout.tsx                  # Root layout + Analytics + OrganizationJsonLd
├── tienda/page.tsx             # Catálogo de productos
├── tienda/[slug]/page.tsx      # Página producto individual (generateStaticParams)
├── carrito/page.tsx            # Carrito + IVA 21% + sugerencias
├── checkout/page.tsx           # Checkout 3 pasos + Stripe redirect
├── checkout/exito/page.tsx     # Página de éxito animada
├── dashboard/page.tsx          # Dashboard del cliente
├── reclamar/page.tsx           # Análisis IA de reclamaciones
├── sitemap.ts                  # SEO sitemap
├── robots.ts                   # SEO robots
└── api/
    ├── stripe/checkout/route.ts  # POST → crea Checkout Session
    ├── stripe/webhook/route.ts   # Webhook events de Stripe
    ├── stripe/products/route.ts  # GET productos con cache CDN
    └── analyze/route.ts          # POST análisis legal Claude AI
```

## Design System

```
Colores:
  Navy oscuro:    #050508  (fondo principal)
  Navy medio:     #0F172A  (cards)
  Gold primario:  #f59e0b  (CTAs, highlights)
  Gold acento:    #C5A55A  (texto dorado)
  Texto:          #e2e8f0  (principal) · #94a3b8 (secundario)

Fuentes:
  Body:     Inter (variable: --font-inter)
  Display:  Playfair Display (variable: --font-space-grotesk)

Glassmorphism:
  background: rgba(15,23,42,0.6)
  backdrop-filter: blur(16px)
  border: 1px solid rgba(245,158,11,0.15)

Animaciones (lib/animations.ts):
  fadeInUp, fadeInDown, fadeInLeft, fadeInRight
  scaleIn, staggerContainer, staggerItem
  hoverLift, cardHover, pageVariants
  springConfig, bouncySpring, smoothSpring
```

## Productos (lib/products.ts — fuente única de verdad)

| ID | Slug | Precio | Modo |
|----|------|--------|------|
| prod_escudo_total | escudo-total | €49/mes | subscription |
| prod_analisis_expres | analisis-expres | €29 | payment |
| prod_recurso_garantizado | recurso-garantizado | €0 upfront | payment |
| prod_pack_empresarial | pack-empresarial | €199/mes | subscription |
| prod_contrato_blindado | contrato-blindado | €79 | payment |
| prod_defensa_premium | defensa-premium | €499+ | payment |

Helpers: `getProductBySlug`, `getProductById`, `getFeaturedProducts`, `getProductsByCategory`, `formatPrice`, `getBillingLabel`

## 8 Agentes IA

| Agente | Especialidad |
|--------|-------------|
| ARPA | Análisis & Research de Procedimientos |
| LEGIS | Legislación y Normativa (BOE live) |
| LEX | Asesoría Legal IA 24/7 |
| SCRIPTOR | Redacción de documentos legales |
| MÉTRICA | Analytics y predicción de éxito |
| CUSTODIA | Protección de Datos (RGPD/DPO) |
| NEXUS | Gestión de expedientes y plazos |
| CONSTRUCTOR | Arquitectura jurídica societaria |

## Variables de Entorno

```bash
# .env.local (nunca commitear)
ANTHROPIC_API_KEY=sk-ant-...         # Claude AI
STRIPE_SECRET_KEY=sk_live_...        # Stripe (usa 'sk_placeholder' si no existe)
STRIPE_WEBHOOK_SECRET=whsec_...      # Stripe webhooks
NEXT_PUBLIC_URL=https://...          # URL base del sitio
```

**Importante:** `lib/stripe.ts` usa `?? 'sk_placeholder'` para que el build funcione sin credenciales reales.

## Archivos Clave

| Archivo | Responsabilidad |
|---------|----------------|
| `lib/products.ts` | Catálogo de productos — única fuente de verdad |
| `lib/stripe.ts` | `createCheckoutSession`, `constructWebhookEvent`, `retrieveSession` |
| `lib/claude.ts` | Anthropic client + `LEGAL_SYSTEM_PROMPT` + tipo `LegalAnalysis` |
| `lib/seo.ts` | `defaultMetadata`, `generatePageMetadata`, `generateProductMetadata` |
| `lib/copy.ts` | `HERO_COPY`, `STATS`, `TESTIMONIALS`, `FAQS`, `HOW_IT_WORKS` |
| `lib/animations.ts` | Todas las variantes de Framer Motion |
| `lib/cart-store.ts` | Zustand store del carrito |
| `components/seo/OrganizationJsonLd.tsx` | @graph con LegalService + Organization + WebSite |

## Flujo Stripe

```
Cliente → POST /api/stripe/checkout { priceId, productId, quantity }
       → stripe.checkout.sessions.create()
       → { url: session.url }
       → Redirect a Stripe Hosted Checkout
       → Éxito: /checkout/exito?session_id=xxx
       → Webhook: /api/stripe/webhook (checkout.session.completed, subscription.*)
```

**CRÍTICO:** `LEGAL_PRODUCTS` en `/api/stripe/products/route.ts` NO se exporta. Los Route handlers solo pueden exportar GET/POST/PUT/etc.

## Compliance Legal

- **LSSI-CE**: Aviso legal, condiciones de uso, información empresa en footer
- **RGPD/LOPDGDD**: Política de privacidad, consentimiento explícito, DPO
- **AEPD 2024 (cookies)**: 3 botones de IGUAL prominencia (Rechazar / Configurar / Aceptar). Nunca diseñar "rechazar" más pequeño.
- **RD 135/2021**: Accesibilidad, atributos aria, contraste mínimo
- **VeriFactu**: Facturación electrónica (pendiente implementación)

## Convenciones de Código

- TypeScript strict — no `any`, no `@ts-ignore`
- Solo Tailwind classes — nunca `style={}` inline salvo gradientes dinámicos
- Framer Motion para **todas** las animaciones (no CSS transitions propias)
- Componentes client: `'use client'` solo cuando hay hooks/interactividad
- Route handlers: solo exportar verbos HTTP (GET, POST, etc.) — nunca constantes
- `generateStaticParams` obligatorio en `[slug]` pages
- SEO: cada página debe tener `export const metadata` o `generateMetadata`
- Imágenes: `next/image` siempre (nunca `<img>`)

## Estructura de Componentes

```
components/
├── ui/          # Átomos: Button, Badge, Card, Modal, Accordion, Input...
├── store/       # E-commerce: ProductCard, ProductGrid, CartDrawer, CheckoutForm
├── landing/     # Secciones de homepage: Hero, Pricing, FAQ, Stats...
├── seo/         # JSON-LD: OrganizationJsonLd, ProductJsonLd
└── shared/      # Header, Footer, PageTransition, CookieBanner
```

## Deployment

- **Plataforma:** Vercel (proyecto: `fernandez-abogados/justicialegalia`)
- **Branch producción:** `main`
- **Variables en Vercel:** ANTHROPIC_API_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, NEXT_PUBLIC_URL
- **Analytics:** Vercel Analytics ya integrado en `app/layout.tsx`
