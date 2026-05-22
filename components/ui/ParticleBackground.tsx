'use client'

// ─── Tipos ────────────────────────────────────────────────────────────────────

type ParticleVariant = 'dots' | 'grid' | 'noise'
type ParticleIntensity = 'low' | 'medium' | 'high'

interface ParticleBackgroundProps {
  /** Patrón visual: puntos circulares, grid lineal, o ruido sutil */
  variant?: ParticleVariant
  /** Nivel de intensidad visual: baja, media o alta opacidad */
  intensity?: ParticleIntensity
  /** Clase CSS adicional */
  className?: string
}

// ─── Configuraciones de intensidad ───────────────────────────────────────────

const intensityConfig: Record<ParticleIntensity, { opacity: number; size: string }> = {
  low: { opacity: 0.03, size: '1px' },
  medium: { opacity: 0.06, size: '1.5px' },
  high: { opacity: 0.1, size: '2px' },
}

// ─── Generador de estilos por variante ───────────────────────────────────────

function getBackgroundStyle(
  variant: ParticleVariant,
  opacity: number,
  size: string
): React.CSSProperties {
  const dotColor = `rgba(212, 175, 55, ${opacity})`
  const lineColor = `rgba(27, 58, 107, ${opacity * 4})`

  switch (variant) {
    case 'dots':
      return {
        backgroundImage: `radial-gradient(${dotColor} ${size}, transparent ${size})`,
        backgroundSize: '32px 32px',
      }

    case 'grid':
      return {
        backgroundImage: `
          linear-gradient(${lineColor} 1px, transparent 1px),
          linear-gradient(90deg, ${lineColor} 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
      }

    case 'noise':
      // Combina dots muy pequeños con distintos tamaños y densidades
      // para simular textura de ruido con CSS puro
      return {
        backgroundImage: `
          radial-gradient(${dotColor} 0.5px, transparent 0.5px),
          radial-gradient(rgba(37, 99, 235, ${opacity * 0.5}) 0.5px, transparent 0.5px)
        `,
        backgroundSize: '20px 20px, 37px 37px',
        backgroundPosition: '0 0, 10px 10px',
      }

    default:
      return {}
  }
}

// ─── Estilos de animación (keyframes via style tag) ───────────────────────────

const KEYFRAMES_ID = 'particle-bg-keyframes'

function injectKeyframes() {
  if (typeof document === 'undefined') return
  if (document.getElementById(KEYFRAMES_ID)) return

  const style = document.createElement('style')
  style.id = KEYFRAMES_ID
  style.textContent = `
    @keyframes particleDrift {
      0%   { transform: translate(0, 0); }
      25%  { transform: translate(4px, -4px); }
      50%  { transform: translate(8px, 0); }
      75%  { transform: translate(4px, 4px); }
      100% { transform: translate(0, 0); }
    }
    @keyframes particleDriftSlow {
      0%   { transform: translate(0, 0) scale(1); }
      50%  { transform: translate(-6px, 6px) scale(1.01); }
      100% { transform: translate(0, 0) scale(1); }
    }
    @keyframes glowPulse {
      0%, 100% { opacity: 0.6; transform: scale(1); }
      50%       { opacity: 1; transform: scale(1.08); }
    }
  `
  document.head.appendChild(style)
}

// ─── Componente ───────────────────────────────────────────────────────────────

/**
 * Fondo decorativo con partículas animadas en CSS puro.
 * Usa will-change y transform para aceleración GPU.
 * No depende de librerías externas — solo CSS animations.
 *
 * @example
 * <div className="relative">
 *   <ParticleBackground variant="dots" intensity="low" />
 *   <HeroContent />
 * </div>
 */
export default function ParticleBackground({
  variant = 'dots',
  intensity = 'low',
  className = '',
}: ParticleBackgroundProps) {
  // Inyectar keyframes en client
  if (typeof window !== 'undefined') {
    injectKeyframes()
  }

  const { opacity, size } = intensityConfig[intensity]
  const bgStyle = getBackgroundStyle(variant, opacity, size)

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {/* Capa de partículas animadas */}
      <div
        style={{
          ...bgStyle,
          position: 'absolute',
          inset: '-10%',
          // GPU acceleration
          willChange: 'transform',
          transform: 'translateZ(0)',
          animation: 'particleDrift 20s ease-in-out infinite',
        }}
      />

      {/* Segunda capa con offset y velocidad diferente para profundidad */}
      <div
        style={{
          ...bgStyle,
          position: 'absolute',
          inset: '-10%',
          willChange: 'transform',
          transform: 'translateZ(0)',
          backgroundPosition: '16px 16px',
          animation: 'particleDriftSlow 35s ease-in-out infinite',
          opacity: 0.5,
        }}
      />

      {/* Glow radial central — añade sensación de profundidad */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '80%',
          height: '80%',
          transform: 'translate(-50%, -50%) translateZ(0)',
          background:
            'radial-gradient(ellipse at center, rgba(37, 99, 235, 0.06) 0%, transparent 70%)',
          willChange: 'transform, opacity',
          animation: 'glowPulse 8s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      {/* Vignette perimetral para enmarcar el contenido */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(4, 11, 23, 0.6) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
