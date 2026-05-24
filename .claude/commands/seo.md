# /seo — Auditoría SEO de una Página

Analiza y optimiza el SEO de una página del proyecto.

## Uso

```
/seo <ruta>
```

Ejemplo: `/seo /tienda` o `/seo /tienda/escudo-total`

## Pasos

1. Lee `lib/seo.ts` para entender `defaultMetadata` y los helpers disponibles
2. Lee el archivo de la página especificada
3. Verifica cada punto del checklist:

### Checklist SEO

**Metadata:**
- [ ] `export const metadata` o `generateMetadata` presente
- [ ] `title` único y con keyword principal (máx 60 chars)
- [ ] `description` con CTA (máx 160 chars)
- [ ] `openGraph.title`, `openGraph.description`, `openGraph.image`
- [ ] `twitter.card` configurado
- [ ] `canonical` URL correcta

**JSON-LD:**
- [ ] Datos estructurados apropiados (`LegalService`, `Product`, `BreadcrumbList`)
- [ ] Precios, disponibilidad y moneda correctos para productos
- [ ] `Organization` en homepage

**Técnico:**
- [ ] En sitemap (`app/sitemap.ts`)
- [ ] No bloqueado en robots (`app/robots.ts`)
- [ ] Headings semánticos (h1 único, h2 para secciones)
- [ ] Alt text en todas las imágenes
- [ ] Core Web Vitals: no blocking resources

4. Propón correcciones concretas con código exacto para cada punto fallido
5. Prioriza por impacto SEO: metadata > JSON-LD > técnico

## Contexto

- Dominio target: España (lang="es", hreflang="es-ES")
- Keywords principales: "abogados online", "asesoría jurídica IA", "defensa legal España"
- Competidores: LegalZoom ES, Rocket Lawyer, despachos tradicionales
