'use client'

import { motion } from 'framer-motion'

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface FloatingElementProps {
  children: React.ReactNode
  /** Amplitud de la oscilación vertical en píxeles. Por defecto: 8 */
  amplitude?: number
  /** Duración de un ciclo completo en segundos. Por defecto: 3 */
  duration?: number
  /** Delay inicial en segundos antes de iniciar la animación. Por defecto: 0 */
  delay?: number
  /** Clase CSS adicional para el wrapper */
  className?: string
}

// ─── Componente ───────────────────────────────────────────────────────────────

/**
 * Elemento con animación de flotación continua (loop infinito yoyo).
 * Usa Framer Motion con GPU acceleration via transform.
 *
 * @example
 * <FloatingElement amplitude={12} duration={4} delay={0.5}>
 *   <ShieldIcon />
 * </FloatingElement>
 */
export default function FloatingElement({
  children,
  amplitude = 8,
  duration = 3,
  delay = 0,
  className = '',
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-amplitude / 2, amplitude / 2],
      }}
      transition={{
        duration,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'reverse',
        delay,
      }}
      style={{
        // GPU acceleration
        willChange: 'transform',
      }}
    >
      {children}
    </motion.div>
  )
}
