'use client'

import { useRef, useCallback } from 'react'

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface GlowCardProps {
  children: React.ReactNode
  /** Clase CSS adicional para el wrapper */
  className?: string
  /**
   * Color del glow en formato CSS (cualquier valor válido para rgba).
   * Por defecto usa el dorado del sistema de diseño.
   */
  glowColor?: string
  /** Radio del glow en píxeles. Por defecto: 300 */
  glowRadius?: number
  /** Opacidad máxima del glow (0-1). Por defecto: 0.15 */
  glowOpacity?: number
}

// ─── Componente ───────────────────────────────────────────────────────────────

/**
 * Card con efecto de glow que sigue al cursor usando radial-gradient dinámico.
 * El glow usa el color dorado del sistema de diseño por defecto.
 * Performance: usa CSS transition para suavidad sin RAF overhead.
 *
 * @example
 * <GlowCard className="p-8 rounded-2xl bg-[#0F2240]">
 *   <PriceCard product={product} />
 * </GlowCard>
 */
export default function GlowCard({
  children,
  className = '',
  glowColor = '212, 175, 55',
  glowRadius = 300,
  glowOpacity = 0.15,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current
      if (!card) return

      const rect = card.getBoundingClientRect()
      // Posición del cursor relativa a la card (0,0 = esquina superior izquierda)
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      card.style.setProperty('--glow-x', `${x}px`)
      card.style.setProperty('--glow-y', `${y}px`)
      card.style.setProperty('--glow-opacity', String(glowOpacity))
    },
    [glowOpacity]
  )

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    // Al salir, desvanece el glow suavemente
    card.style.setProperty('--glow-opacity', '0')
  }, [])

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        {
          '--glow-x': '50%',
          '--glow-y': '50%',
          '--glow-opacity': '0',
          '--glow-color': glowColor,
          '--glow-radius': `${glowRadius}px`,
        } as React.CSSProperties
      }
    >
      {/* Capa de glow — sigue al cursor */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background: `radial-gradient(
            var(--glow-radius) circle at var(--glow-x) var(--glow-y),
            rgba(var(--glow-color), var(--glow-opacity)) 0%,
            transparent 70%
          )`,
          // CSS transition para suavizar el desvanecimiento al salir
          transition: 'opacity 400ms ease',
          borderRadius: 'inherit',
        }}
      />

      {/* Contenido con z-index superior al glow */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
