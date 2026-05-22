# SEO Técnico — Entrega Completada

**Fecha:** 2026-05-22  
**Agente:** Director SEO Técnico  
**Estado:** COMPLETO

---

## Archivos creados / modificados

| Archivo | Estado | Descripción |
|---|---|---|
| `app/sitemap.ts` | CREADO | Sitemap dinámico Next.js 15 con 10 URLs |
| `app/robots.ts` | CREADO | Robots.txt con reglas de indexación y bloqueo de bots IA |
| `components/seo/JsonLd.tsx` | CREADO | Componente genérico para inyección de JSON-LD |
| `components/seo/ProductJsonLd.tsx` | CREADO | JSON-LD schema.org/Product para los 6 productos |
| `components/seo/OrganizationJsonLd.tsx` | CREADO | JSON-LD LegalService + Organization + WebSite |
| `lib/seo.ts` | CREADO | Utilidades de metadata: defaultMetadata, generatePageMetadata, generateProductMetadata, PRODUCT_CATALOG |
| `app/layout.tsx` | MODIFICADO | Integración de OrganizationJsonLd + defaultMetadata desde lib/seo.ts |

---

## Detalle por archivo

### `app/sitemap.ts`
- 10 URLs totales con `changeFrequency` y `priority` diferenciados
- Homepage: priority 1.0, changeFrequency daily
- /tienda: priority 0.9, daily
- 6 páginas de producto: priority 0.85, weekly
- /reclamar: priority 0.75, monthly
- /dashboard y /checkout: priority baja (0.3 / 0.2) — indexables pero poco relevantes
- Base URL desde `process.env.NEXT_PUBLIC_URL`

### `app/robots.ts`
- Permite todo en `/`
- Bloquea: `/api/`, `/dashboard/`, `/checkout/exito`
- Bloquea GPTBot, ChatGPT-User y CCBot (protección de contenido)
- Sitemap URL dinámica via `process.env.NEXT_PUBLIC_URL`

### `components/seo/JsonLd.tsx`
- Componente server-side puro
- Recibe `data: Record<string, unknown>`
- Renderiza `<script type="application/ld+json">` con JSON minificado
- Compatible con Next.js App Router

### `components/seo/ProductJsonLd.tsx`
- Interface `ProductForJsonLd` exportada (reutilizable en lib/seo.ts)
- Schema `Product` + `Offer` + `Brand` + `AggregateRating`
- Manejo especial para precio null (Defensa Premium — evaluación gratuita)
- Campos: name, description, url, image, brand, offers (price, priceCurrency, availability, priceValidUntil), aggregateRating, sku/mpn

### `components/seo/OrganizationJsonLd.tsx`
- `@graph` con 3 nodos: LegalService, Organization, WebSite
- LegalService: nombre, descripción, teléfono, email, openingHours, 2 contactPoints (soporte y emergencia 24/7)
- areaServed: España + Unión Europea con IDs de Wikidata
- sameAs: LinkedIn, Twitter, Instagram, Facebook (placeholders)
- hasOfferCatalog: los 6 servicios del catálogo con precios
- WebSite: SearchAction para sitelinks search box
- Se añade una sola vez en layout.tsx raíz

### `lib/seo.ts`
- `defaultMetadata`: title template, description con keywords primarias, openGraph completo, twitter card large, alternates canonical, robots googleBot, verification GSC placeholder, metadataBase
- `generatePageMetadata(params)`: genera Metadata completa para cualquier página; admite `noIndex` para páginas privadas
- `generateProductMetadata(product)`: Metadata optimizada para producto con precio en título, keywords del producto, og:price meta tags, y truncado a 160 chars para description
- `PRODUCT_CATALOG`: array de los 6 productos con todos sus metadatos (slug, precio, rating, SKU, keywords) — fuente única de verdad

### `app/layout.tsx` (actualizado)
- Importa y exporta `defaultMetadata` desde `lib/seo.ts`
- Añade `<OrganizationJsonLd />` como primer hijo del `<body>`
- Mantiene fuentes Inter y Space Grotesk, Analytics de Vercel
- `metadataBase` configurado via `NEXT_PUBLIC_URL`

---

## Keywords objetivo cubiertas

- abogado online
- recurrir multa / recurrir multa tráfico
- reclamación online
- protección legal
- recurso DGT
- abogado IA / abogado inteligencia artificial
- reclamación consumidor
- contrato revisión abogado
- defensa legal online
- legal tech España

---

## Próximos pasos recomendados

1. **Añadir `NEXT_PUBLIC_URL=https://justicialegalia.com`** al `.env.local` y variables de entorno de producción
2. **Reemplazar `GOOGLE_SEARCH_CONSOLE_VERIFICATION_TOKEN`** en `lib/seo.ts` con el token real tras dar de alta el dominio en GSC
3. **Generar imágenes OG** en `public/images/og-default.jpg` y `public/images/products/[slug]-og.jpg` (1200x630px) para cada producto
4. **Generar el logo** en `public/images/logo.png` (240x60px) para que aparezca en Knowledge Panel
5. **Usar `generateProductMetadata`** en cada página de producto (`app/tienda/[slug]/page.tsx`) exportando la función desde `lib/seo.ts`
6. **Usar `generatePageMetadata`** en `/reclamar`, `/tienda` y demás páginas públicas
7. **Subir sitemap** a Google Search Console una vez el dominio esté verificado
