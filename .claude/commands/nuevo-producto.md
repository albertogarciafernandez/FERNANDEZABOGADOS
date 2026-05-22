# /nuevo-producto — Añadir Nuevo Producto al Catálogo

Scaffolding completo de un nuevo producto: entrada en el catálogo + página slug + metadata SEO.

## Uso

```
/nuevo-producto <nombre> <precio> <modo: payment|subscription> <descripción breve>
```

Ejemplo: `/nuevo-producto "Divorcio Express" 299 payment "Tramitación de divorcio de mutuo acuerdo en menos de 30 días"`

## Pasos

1. Lee `lib/products.ts` completo para entender la estructura `LegalProduct`
2. Lee `lib/seo.ts` para entender `PRODUCT_CATALOG` y `generateProductMetadata`
3. Genera un `slug` kebab-case a partir del nombre
4. Genera un ID único tipo `prod_nombre_snake`
5. Añade el producto a `lib/products.ts` con todos los campos:
   - `id`, `slug`, `name`, `tagline`, `description`, `price`, `billingInterval`, `mode`
   - `features` (mínimo 5), `icon`, `color`, `badge` (si aplica), `popular` (boolean)
   - `priceId` (placeholder `price_XXX`), `productId` (placeholder `prod_XXX`)
6. Añade entrada en `PRODUCT_CATALOG` en `lib/seo.ts`
7. Verifica que `generateStaticParams` en `app/tienda/[slug]/page.tsx` incluye el nuevo slug
8. Ejecuta `npm run build` para verificar que no hay errores de tipos

## Convenciones

- Precio en céntimos internamente si es necesario, pero `formatPrice` maneja la visualización
- Todos los productos tienen IVA incluido
- `billingInterval` solo para suscripciones: `'monthly'` o `'annual'`
- Icono: emoji o nombre de icono lucide-react
