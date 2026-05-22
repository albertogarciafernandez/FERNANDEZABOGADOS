# Motion Done — Librería de Animaciones Completada

**Fecha:** 2026-05-22
**Agente:** Senior Animations Engineer — Framer Motion / Next.js

---

## Archivos creados

### 1. `/lib/animations.ts`
Librería central de variantes y configuraciones de Framer Motion. Exporta:

**Variants de entrada:**
- `fadeInUp` — opacity 0→1 + translateY 24px→0, 500ms, easing `[0.25, 0.46, 0.45, 0.94]`
- `fadeInDown` — espejo vertical de fadeInUp
- `fadeInLeft` / `fadeInRight` — entrada horizontal desde ±32px
- `scaleIn` — scale 0.95→1 con spring `[0.34, 1.56, 0.64, 1]`, 200ms (para modales)
- `staggerContainer` — contenedor con stagger 80ms entre hijos
- `staggerItem` — hijo heredable del stagger container

**Variants de hover (whileHover / whileTap):**
- `hoverLift` — translateY -4px, 250ms ease-out
- `hoverGlow` — box-shadow dorado `rgba(212,175,55,0.3)`
- `hoverScale` — scale 1.02, 200ms ease-out (botones CTA)
- `tapScale` — scale 0.97, feedback táctil
- `cardHover` — lift + shadow upgrade combinados
- `glassMorphHover` — lift + border glow dorado intensificado

**Page transitions:**
- `pageVariants` — fade + y 16px→0 en entrada, y 0→-8px en salida
- `pageTransition` — 400ms, easing suave

**Springs:**
- `springConfig` — stiffness 300, damping 30 (estándar)
- `bouncySpring` — stiffness 500, damping 20 (modales)
- `smoothSpring` — stiffness 200, damping 40 (navegación)

**Extras del brief:**
- `goldLineReveal` — scaleX 0→1, 800ms, delay 300ms
- `navbarScroll` — transparent→glassmorphism al scroll >80px, 300ms
- `pulseVariants` — opacity 1→0.7→1, 2s infinite (badges urgencia)
- `floatVariants` — flotación parametrizada por amplitud/duración/delay
- `scrollFadeIn` — configuración base para useInView

---

### 2. `/components/ui/AnimateOnScroll.tsx`
Wrapper con `useInView` de Framer Motion que aplica cualquier variant al entrar en viewport.

**Props:** `variant?` (default: fadeInUp), `delay?`, `threshold?` (default: 0.15), `once?` (default: true), `className?`

**Variantes disponibles:** fadeInUp, fadeInDown, fadeInLeft, fadeInRight, scaleIn, staggerItem

---

### 3. `/components/ui/ParticleBackground.tsx`
Fondo de partículas en CSS puro (sin librerías externas). 3 capas: partículas primarias, partículas offset para profundidad, glow radial central pulsante.

**Props:** `variant`: 'dots' | 'grid' | 'noise', `intensity`: 'low' | 'medium' | 'high'

**Performance:** `will-change: transform`, `transform: translateZ(0)`, `overflow: hidden`

---

### 4. `/components/ui/GlowCard.tsx`
Card con glow que sigue al cursor mediante CSS custom properties + radial-gradient dinámico.

**Props:** `glowColor?` (default: dorado `212, 175, 55`), `glowRadius?` (default: 300px), `glowOpacity?` (default: 0.15)

**Técnica:** `onMouseMove` calcula posición relativa → `--glow-x` / `--glow-y` → `radial-gradient()` dinámico. CSS transition para suavizar salida.

---

### 5. `/components/ui/FloatingElement.tsx`
Elemento con flotación continua loop infinito yoyo usando Framer Motion.

**Props:** `amplitude?` (px, default: 8), `duration?` (s, default: 3), `delay?` (s, default: 0)

---

### 6. `/components/shared/PageTransition.tsx`
Wrapper para transiciones entre páginas usando `AnimatePresence` + `motion.div`.

Usa `usePathname()` como key para que AnimatePresence detecte cambios de ruta. Listo para insertar en `app/layout.tsx`.

---

## Verificación TypeScript
`npx tsc --noEmit` — 0 errores en archivos nuevos. Los únicos errores existentes son pre-existentes en `lib/stripe.ts` y `api/stripe/webhook/route.ts` (incompatibilidad de versión de API de Stripe, no relacionada con este agente).

---

## Notas de implementación
- Todos los valores de duración, easing y offset provienen directamente del master brief (sección 3 — Animaciones)
- Los componentes son 100% compatibles con Framer Motion 12+ (framer-motion `^12.12.1` instalado)
- `ParticleBackground` y `GlowCard` no requieren Framer Motion — CSS puro para máximo rendimiento
- `FloatingElement` y `AnimateOnScroll` usan `'use client'` correctamente para Next.js App Router
