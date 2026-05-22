/* ─────────────────────────────────────────────────────────────────────────────
   Badge — Justicia Legalia Premium  (Design System v1.0)

   Variants : gold · green · red · blue · glass
   Sizes    : sm · md
   Extras   : dot (colored indicator) · pulse (2s infinite animation)
   ───────────────────────────────────────────────────────────────────────────── */

import { cn } from '@/lib/utils'

export type BadgeVariant = 'gold' | 'green' | 'red' | 'blue' | 'glass'
export type BadgeSize = 'sm' | 'md'

export interface BadgeProps {
  /** Badge text content */
  children?: React.ReactNode
  /** Convenience prop — used when children is not provided */
  text?: string
  /** Visual variant */
  variant?: BadgeVariant
  /** Size preset */
  size?: BadgeSize
  /** Show colored dot indicator */
  dot?: boolean
  /**
   * Animate dot and badge with pulse (opacity 1→0.7→1, 2000ms infinite)
   * as defined in the brief for urgency badges
   */
  pulse?: boolean
  className?: string
}

// ─── Variant Styles ────────────────────────────────────────────────────────────
// Colors: exact HEX from Master Brief §3
const variantStyles: Record<BadgeVariant, string> = {
  /**
   * Gold — primary accent, dorado principal #D4AF37
   * Used for: badges de popularidad, precio destacado
   */
  gold: cn(
    'bg-[rgba(212,175,55,0.12)] border border-[rgba(212,175,55,0.35)]',
    'text-[#F5D060]',
    // Subtle glow
    'shadow-[0_0_8px_rgba(212,175,55,0.15)]',
  ),

  /**
   * Green — success / checkmarks / garantías
   * Success color: #059669 / #D1FAE5 from brief
   */
  green: cn(
    'bg-[rgba(5,150,105,0.12)] border border-[rgba(5,150,105,0.35)]',
    'text-[#D1FAE5]',
  ),

  /**
   * Red — error / urgency / alerta
   * Error color: #DC2626 / #FEE2E2 from brief
   */
  red: cn(
    'bg-[rgba(220,38,38,0.12)] border border-[rgba(220,38,38,0.35)]',
    'text-[#FEE2E2]',
  ),

  /**
   * Blue — info / brand / highlights
   * Brand bright: #2563EB / Info light: #DBEAFE from brief
   */
  blue: cn(
    'bg-[rgba(37,99,235,0.12)] border border-[rgba(37,99,235,0.35)]',
    'text-[#DBEAFE]',
  ),

  /**
   * Glass — glassmorphism badge
   * background: rgba(15,34,64,0.6), border: rgba(212,175,55,0.15)
   */
  glass: cn(
    'bg-[rgba(15,34,64,0.6)] backdrop-blur-md border border-[rgba(212,175,55,0.15)]',
    'text-[#94A3B8]',
  ),
}

// ─── Dot colors per variant ────────────────────────────────────────────────────
const dotColors: Record<BadgeVariant, string> = {
  gold:  'bg-[#D4AF37]',
  green: 'bg-[#059669]',
  red:   'bg-[#DC2626]',
  blue:  'bg-[#2563EB]',
  glass: 'bg-[#94A3B8]',
}

const dotPingColors: Record<BadgeVariant, string> = {
  gold:  'bg-[#F5D060]',
  green: 'bg-[#34D399]',
  red:   'bg-[#EF4444]',
  blue:  'bg-[#60A5FA]',
  glass: 'bg-[#CBD5E1]',
}

// ─── Size presets ──────────────────────────────────────────────────────────────
const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[10px] tracking-wide gap-1',
  md: 'px-2.5 py-1 text-xs tracking-wide gap-1.5',
}

// ─── Dot sizes ─────────────────────────────────────────────────────────────────
const dotSizes: Record<BadgeSize, string> = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
}

// ─── Component ─────────────────────────────────────────────────────────────────
export function Badge({
  children,
  text,
  variant = 'gold',
  size = 'md',
  dot = false,
  pulse = false,
  className,
}: BadgeProps) {
  const content = children ?? text

  return (
    <span
      className={cn(
        // Base layout
        'inline-flex items-center justify-center',
        'font-semibold uppercase rounded-full',
        'select-none',
        // Variant
        variantStyles[variant],
        // Size
        sizeStyles[size],
        // Pulse — brief: opacity 1→0.7→1, 2000ms infinite
        pulse && 'animate-[pulse-badge_2s_ease-in-out_infinite]',
        className,
      )}
    >
      {/* Colored dot indicator */}
      {dot && (
        <span className={cn('relative flex shrink-0', dotSizes[size])}>
          {/* Ping animation ring (Tailwind animate-ping equivalent) */}
          <span
            className={cn(
              'absolute inline-flex h-full w-full rounded-full opacity-75',
              dotPingColors[variant],
              pulse ? 'animate-ping' : '',
            )}
          />
          {/* Solid dot */}
          <span
            className={cn(
              'relative inline-flex rounded-full',
              dotSizes[size],
              dotColors[variant],
            )}
          />
        </span>
      )}

      {content}
    </span>
  )
}

export default Badge
