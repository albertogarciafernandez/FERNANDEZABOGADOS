# components/ — Guía de Componentes

Estructura de componentes del proyecto. Importar siempre con `@/components/`.

## Organización

```
components/
├── ui/          ← Átomos: bloques de construcción base
├── store/       ← E-commerce: carrito, productos, checkout
├── landing/     ← Secciones de la homepage
├── seo/         ← JSON-LD y metadata
└── shared/      ← Header, Footer, layout global
```

---

## ui/ — Componentes Base

| Componente | Props clave | Notas |
|------------|------------|-------|
| `Button` | `variant: 'primary'\|'secondary'\|'outline'\|'ghost'\|'danger'`, `leftIcon`, `rightIcon`, `size` | NO usar `variant="gold"` ni prop `icon` |
| `Badge` | `variant: string` | NO usar prop `color` |
| `Modal` | `isOpen`, `onClose`, `title` | Usa Radix Dialog |
| `Accordion` | estándar | Usa Radix Accordion |
| `AnimatedCounter` | `target: number`, `duration?` | Framer Motion counter |
| `AnimateOnScroll` | `children`, `delay?` | Wrapper con IntersectionObserver |
| `CountdownTimer` | `targetDate` | Timer regresivo |
| `FloatingElement` | `children`, `amplitude?` | Animación flotante CSS |
| `GlowCard` | `children`, `glowColor?` | Card con efecto glow gold |
| `ParticleBackground` | ninguna | Canvas partículas animadas |

---

## store/ — E-Commerce

| Componente | Descripción |
|------------|-------------|
| `ProductCard` | Card de producto con glassmorphism, hover glow, popular badge |
| `ProductGrid` | Grid con AnimatePresence y filtros por categoría |
| `CartDrawer` | Drawer lateral del carrito — usa `ICON_MAP` para iconos lucide |
| `CheckoutForm` | Formulario 3 pasos con validación real-time y RGPD |
| `PriceCard` | Card de precio con features list |

**IMPORTANTE CartDrawer:** Los iconos de producto se resuelven via `ICON_MAP` interno — no pasar el string directamente como componente JSX.

---

## landing/ — Secciones Homepage

| Componente | Sección |
|------------|---------|
| `Hero` | Hero con AnimatedCounters, dot grid, dashboard mockup |
| `Stats` | Fila de estadísticas animadas |
| `SocialProofBar` | Barra de logos y validadores |
| `HowItWorks` | 3 pasos del proceso |
| `Services` | Grid de 6 productos |
| `DisruptiveFeatures` | Sección diferenciadores IA |
| `LiveCounter` | Counter en tiempo real (WebSocket-ready) |
| `TrustSection` | Garantías y sellos de confianza |
| `Testimonials` | 6 testimonios filtrables (tabs por categoría) |
| `FAQ` | 2 columnas Accordion |
| `FinalCTA` | CTA final con CountdownTimer y glow |
| `AIEngine` | Presentación de los 8 agentes IA |
| `Pricing` | Planes y precios |

---

## seo/ — Datos Estructurados JSON-LD

| Componente | JSON-LD |
|------------|---------|
| `OrganizationJsonLd` | `@graph`: LegalService + Organization + WebSite + SearchAction. Incluido en `app/layout.tsx` (todas las páginas) |
| `ProductJsonLd` | `Product` schema para /tienda/[slug]. Incluir en cada página de producto |
| `JsonLd` | Genérico — acepta cualquier schema como prop `data` |

---

## shared/ — Layout Global

| Componente | Notas |
|------------|-------|
| `Header` | Navbar sticky con glassmorphism, menú móvil, carrito badge |
| `Footer` | Footer con links legales, redes sociales, copyright |
| `PageTransition` | Wrapper `AnimatePresence` para transiciones entre rutas |
| `CookieBanner` | AEPD 2024: 3 botones igual prominencia (Rechazar/Configurar/Aceptar) |

---

## Convenciones

### Crear un nuevo componente
1. Determinar la categoría correcta (ui/ para átomos, landing/ para secciones, etc.)
2. Archivo: `PascalCase.tsx`
3. Si usa hooks/eventos → `'use client'` al inicio
4. Si usa Framer Motion → SIEMPRE `'use client'`
5. Props tipadas con interfaz nombrada: `interface MyComponentProps { ... }`
6. Exportar como named export: `export function MyComponent`

### Glassmorphism estándar
```tsx
<div className="bg-[rgba(15,23,42,0.6)] backdrop-blur-lg border border-[rgba(245,158,11,0.15)] rounded-2xl">
```

### Animaciones
```tsx
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { motion } from 'framer-motion'

<motion.div variants={staggerContainer} initial="hidden" whileInView="visible">
  <motion.div variants={fadeInUp}>...</motion.div>
</motion.div>
```

### Hover gold glow
```tsx
className="hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-shadow duration-300"
```
