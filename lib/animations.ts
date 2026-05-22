import type { Variants, Transition } from 'framer-motion'

// ─── Tipos auxiliares ─────────────────────────────────────────────────────────

type SpringConfig = {
  type: 'spring'
  stiffness: number
  damping: number
  mass?: number
}

// ─── Variants de entrada ──────────────────────────────────────────────────────

/**
 * Entrada desde abajo con fade. Animación principal para la mayoría de elementos.
 * Duración 500ms, easing cubic-bezier(0.25, 0.46, 0.45, 0.94) — del master brief.
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

/**
 * Entrada desde arriba con fade. Para elementos que caen al viewport.
 */
export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

/**
 * Entrada desde la izquierda con fade.
 */
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -32,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

/**
 * Entrada desde la derecha con fade.
 */
export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 32,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

/**
 * Entrada con escala. Para modales y overlays.
 * easing con spring para apertura natural — del master brief.
 */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.15,
      ease: 'easeIn',
    },
  },
}

/**
 * Contenedor para animar hijos con stagger.
 * Stagger entre cards: 80ms — del master brief.
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0,
    },
  },
}

/**
 * Item hijo para usar dentro de staggerContainer.
 * Hereda el stagger del padre y aplica fadeInUp.
 */
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

// ─── Variants de hover ────────────────────────────────────────────────────────

/**
 * Levantamiento sutil al hover. Para cards y elementos interactivos.
 * translateY -4px, 250ms ease-out — del master brief.
 */
export const hoverLift = {
  y: -4,
  transition: {
    duration: 0.25,
    ease: 'easeOut',
  },
}

/**
 * Glow dorado al hover. Para botones y elementos premium.
 * Combina con boxShadow del sistema de diseño.
 */
export const hoverGlow = {
  boxShadow: '0 0 20px rgba(212,175,55,0.3), 0 0 60px rgba(212,175,55,0.1)',
  transition: {
    duration: 0.25,
    ease: 'easeOut',
  },
}

/**
 * Escala sutil al hover. Para botones CTA.
 * scale 1.02, 200ms ease-out — del master brief.
 */
export const hoverScale = {
  scale: 1.02,
  transition: {
    duration: 0.2,
    ease: 'easeOut',
  },
}

/**
 * Compresión al click/tap. Para feedback táctil inmediato.
 */
export const tapScale = {
  scale: 0.97,
  transition: {
    duration: 0.1,
    ease: 'easeOut',
  },
}

// ─── Variants de cards ────────────────────────────────────────────────────────

/**
 * Hover completo para cards de producto.
 * Combina lift + upgrade de sombra — del master brief.
 */
export const cardHover = {
  y: -4,
  boxShadow: '0 20px 48px rgba(0,0,0,0.6), 0 8px 16px rgba(0,0,0,0.4)',
  transition: {
    duration: 0.25,
    ease: 'easeOut',
  },
}

/**
 * Hover para cards glassmorphism.
 * Intensifica el backdrop blur visualmente con border glow dorado.
 */
export const glassMorphHover = {
  y: -4,
  borderColor: 'rgba(212,175,55,0.35)',
  boxShadow:
    '0 20px 48px rgba(0,0,0,0.6), 0 0 40px rgba(212,175,55,0.12), inset 0 1px 0 rgba(245,208,96,0.15)',
  transition: {
    duration: 0.25,
    ease: 'easeOut',
  },
}

// ─── Page transitions ─────────────────────────────────────────────────────────

/**
 * Variantes para transiciones entre páginas.
 * Fade + ligero movimiento vertical.
 */
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 16,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.25,
      ease: 'easeIn',
    },
  },
}

/**
 * Transición base para pages. Compatibilidad con AnimatePresence.
 */
export const pageTransition: Transition = {
  duration: 0.4,
  ease: [0.25, 0.46, 0.45, 0.94],
}

// ─── Configuraciones de spring ────────────────────────────────────────────────

/**
 * Spring estándar. Equilibrio entre velocidad y suavidad.
 */
export const springConfig: SpringConfig = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 1,
}

/**
 * Spring con rebote. Para modales de apertura, elementos de atención.
 * Basado en easing [0.34, 1.56, 0.64, 1] del brief convertido a spring.
 */
export const bouncySpring: SpringConfig = {
  type: 'spring',
  stiffness: 500,
  damping: 20,
  mass: 0.8,
}

/**
 * Spring suave. Para transiciones largas y navegación.
 */
export const smoothSpring: SpringConfig = {
  type: 'spring',
  stiffness: 200,
  damping: 40,
  mass: 1.2,
}

// ─── Animaciones basadas en scroll ───────────────────────────────────────────

/**
 * Configuración base para animaciones scroll-based con useInView.
 * threshold 0.15 = el elemento debe estar 15% visible para activarse.
 */
export const scrollFadeIn = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, amount: 0.15 },
}

/**
 * Variante de entrada para la línea dorada decorativa.
 * scaleX 0→1 desde el centro, 800ms, delay 300ms — del master brief.
 */
export const goldLineReveal: Variants = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      delay: 0.3,
    },
  },
}

/**
 * Variante para el navbar al scroll.
 * transparent → glassmorphism al pasar 80px, 300ms — del master brief.
 */
export const navbarScroll: Variants = {
  transparent: {
    backgroundColor: 'rgba(4, 11, 23, 0)',
    backdropFilter: 'blur(0px)',
    borderColor: 'rgba(212, 175, 55, 0)',
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  scrolled: {
    backgroundColor: 'rgba(15, 34, 64, 0.85)',
    backdropFilter: 'blur(16px)',
    borderColor: 'rgba(212, 175, 55, 0.2)',
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}

/**
 * Pulse para badges de urgencia.
 * opacity 1→0.7→1, 2000ms infinite — del master brief.
 */
export const pulseVariants: Variants = {
  pulse: {
    opacity: [1, 0.7, 1],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'loop',
    },
  },
}

/**
 * Animación de flotación continua base.
 * Para usar con FloatingElement.
 */
export const floatVariants: Variants = {
  float: (custom: { amplitude: number; duration: number; delay: number }) => ({
    y: [-custom.amplitude / 2, custom.amplitude / 2],
    transition: {
      duration: custom.duration,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
      delay: custom.delay,
    },
  }),
}
