'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'
import {
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  staggerItem,
} from '@/lib/animations'

// ─── Tipos ────────────────────────────────────────────────────────────────────

type AnimationVariant =
  | 'fadeInUp'
  | 'fadeInDown'
  | 'fadeInLeft'
  | 'fadeInRight'
  | 'scaleIn'
  | 'staggerItem'

interface AnimateOnScrollProps {
  children: React.ReactNode
  /** Variante de animación a aplicar. Por defecto: fadeInUp */
  variant?: AnimationVariant
  /** Delay adicional en segundos antes de que inicie la animación */
  delay?: number
  /** Fracción del elemento que debe ser visible para activar (0-1). Por defecto: 0.15 */
  threshold?: number
  /** Si la animación solo ocurre una vez. Por defecto: true */
  once?: boolean
  /** Clase CSS adicional para el wrapper */
  className?: string
}

// ─── Mapa de variantes ────────────────────────────────────────────────────────

const variantMap: Record<AnimationVariant, Variants> = {
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  staggerItem,
}

// ─── Componente ───────────────────────────────────────────────────────────────

/**
 * Wrapper que aplica una animación de Framer Motion automáticamente
 * cuando el elemento entra en el viewport.
 *
 * @example
 * <AnimateOnScroll variant="fadeInUp" delay={0.1}>
 *   <MiComponente />
 * </AnimateOnScroll>
 */
export default function AnimateOnScroll({
  children,
  variant = 'fadeInUp',
  delay = 0,
  threshold = 0.15,
  once = true,
  className,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once,
    amount: threshold,
  })

  const selectedVariant = variantMap[variant]

  // Aplicar delay dinámico sobreescribiendo la transición del variant
  const variantWithDelay: Variants = delay
    ? {
        hidden: selectedVariant.hidden,
        visible: {
          ...(typeof selectedVariant.visible === 'object' &&
          !Array.isArray(selectedVariant.visible) &&
          selectedVariant.visible !== null
            ? selectedVariant.visible
            : {}),
          transition: {
            ...(typeof selectedVariant.visible === 'object' &&
            !Array.isArray(selectedVariant.visible) &&
            selectedVariant.visible !== null &&
            'transition' in selectedVariant.visible
              ? (selectedVariant.visible.transition as object)
              : {}),
            delay,
          },
        },
      }
    : selectedVariant

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variantWithDelay}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  )
}
