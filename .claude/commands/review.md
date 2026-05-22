# /review — Code Review según Convenciones del Proyecto

Realiza un code review completo de un archivo o conjunto de cambios.

## Uso

```
/review <archivo o 'staged' para cambios en staging>
```

Ejemplos:
- `/review app/tienda/page.tsx`
- `/review staged` (revisa `git diff --staged`)

## Checklist de Review

### TypeScript
- [ ] Sin `any` ni `@ts-ignore`
- [ ] Tipos explícitos en props de componentes
- [ ] Return types en funciones de utilidad
- [ ] Manejo de `undefined`/`null` seguro

### React / Next.js
- [ ] `'use client'` solo cuando hay hooks o event handlers
- [ ] `generateStaticParams` en páginas con `[slug]`
- [ ] `export const metadata` en todas las páginas
- [ ] `next/image` en lugar de `<img>`
- [ ] No data fetching en componentes client (usar Server Components)

### Estilo
- [ ] Solo clases Tailwind (no `style={}` salvo casos justificados)
- [ ] Colores del design system (navy #050508, gold #f59e0b, #C5A55A)
- [ ] Glassmorphism correcto: `glass` o `glass-strong` classes
- [ ] Animaciones via `lib/animations.ts` (no CSS transitions propias)

### Rendimiento
- [ ] No imports sin usar
- [ ] Componentes pesados en lazy load si aplica
- [ ] `optimizePackageImports` para lucide-react y framer-motion (ya en next.config.ts)

### Seguridad
- [ ] Sin API keys hardcodeadas
- [ ] `process.env.VARIABLE` con fallback seguro
- [ ] Inputs de usuario sanitizados antes de uso en APIs
- [ ] Stripe webhook con `constructWebhookEvent` siempre

### Compliance
- [ ] Formularios con consentimiento RGPD explícito
- [ ] No tracking sin cookie consent previo

## Formato de Salida

Por cada issue encontrado:
```
[SEVERIDAD] archivo.tsx:línea — Descripción del problema
Solución: código exacto corregido
```

Severidades: CRÍTICO / IMPORTANTE / MENOR / SUGERENCIA
