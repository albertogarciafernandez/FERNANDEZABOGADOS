'use client'

import { forwardRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Loader2, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

/* ─────────────────────────────────────────────────────────────────────────────
   Button — Justicia Legalia Premium  (Design System v1.0)

   Variants : primary (brand blue gradient + shimmer)
              secondary (glassmorphism)
              outline (transparent + gold border on hover)
              ghost (minimal)
              danger (red destructive)

   Sizes    : sm · md · lg · xl
   States   : default · loading (spinner) · success (checkmark) · disabled
   Extras   : leftIcon · rightIcon · fullWidth · href (Next Link) · external
   ───────────────────────────────────────────────────────────────────────────── */

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  success?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  /** Renders as Next.js <Link> */
  href?: string
  /** Opens href in new tab */
  external?: boolean
}

// ─── Size presets (8-point scale from brief) ──────────────────────────────────
const sizes: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5 rounded-lg',
  md: 'h-10 px-5 text-sm gap-2 rounded-xl',
  lg: 'h-12 px-7 text-base gap-2.5 rounded-xl',
  xl: 'h-14 px-10 text-lg gap-3 rounded-2xl',
}

// ─── Icon size per button size ─────────────────────────────────────────────────
const iconSz: Record<ButtonSize, string> = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
  xl: 'w-5 h-5',
}

// ─── Variant base styles ───────────────────────────────────────────────────────
const variants: Record<ButtonVariant, string> = {
  /**
   * Primary — gradient #1B3A6B → #2563EB (brief CTA button gradient)
   * Hover: shifts to #2563EB → #3B82F6 + blue glow shadow (200ms ease-out)
   * Shimmer overlay on hover
   */
  primary: cn(
    'relative overflow-hidden',
    // Gradient from brief: linear-gradient(135deg, #1B3A6B 0%, #2563EB 100%)
    'bg-gradient-to-br from-[#1B3A6B] to-[#2563EB]',
    'text-white font-semibold',
    // Border: subtle gold accent
    'border border-[rgba(212,175,55,0.18)]',
    // Hover: gradient shifts brighter
    'hover:from-[#2563EB] hover:to-[#3B82F6]',
    // Hover glow: Shadow Blue Glow from brief
    'hover:shadow-[0_0_30px_rgba(37,99,235,0.4),0_0_80px_rgba(37,99,235,0.15)]',
    // Transition: 200ms ease-out as per brief
    'transition-all duration-200',
    // Disabled
    'disabled:opacity-50 disabled:cursor-not-allowed',
    // Focus ring — gold
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#040B17]',
  ),

  /**
   * Secondary — glassmorphism, background rgba(15,34,64,0.6)
   */
  secondary: cn(
    'relative overflow-hidden',
    'bg-[rgba(15,34,64,0.6)] backdrop-blur-md',
    'border border-[rgba(212,175,55,0.2)]',
    'text-[#F8FAFC] font-medium',
    'hover:bg-[rgba(22,45,82,0.75)]',
    'hover:border-[rgba(212,175,55,0.4)]',
    'hover:shadow-[0_0_20px_rgba(212,175,55,0.12)]',
    'transition-all duration-200',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#040B17]',
  ),

  /**
   * Outline — transparent with subtle border, gold on hover
   */
  outline: cn(
    'relative overflow-hidden',
    'bg-transparent',
    'border border-[rgba(248,250,252,0.18)]',
    'text-[#F8FAFC] font-medium',
    'hover:border-[rgba(212,175,55,0.5)]',
    'hover:bg-[rgba(212,175,55,0.05)]',
    'hover:text-[#F5D060]',
    'transition-all duration-200',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#040B17]',
  ),

  /**
   * Ghost — minimal, no visible border
   */
  ghost: cn(
    'bg-transparent border-transparent',
    'text-[#94A3B8] font-medium',
    'hover:text-[#F8FAFC] hover:bg-[rgba(255,255,255,0.05)]',
    'active:bg-[rgba(255,255,255,0.08)]',
    'transition-all duration-200',
    'disabled:opacity-40 disabled:cursor-not-allowed',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#040B17]',
  ),

  /**
   * Danger — destructive actions
   */
  danger: cn(
    'relative overflow-hidden',
    'bg-[#DC2626] border border-[rgba(220,38,38,0.5)]',
    'text-white font-semibold',
    'hover:bg-[#EF4444]',
    'hover:shadow-[0_0_20px_rgba(220,38,38,0.3)]',
    'transition-all duration-200',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626] focus-visible:ring-offset-2 focus-visible:ring-offset-[#040B17]',
  ),
}

// ─── Shimmer overlay (primary variant) ────────────────────────────────────────
function ShimmerOverlay() {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0',
        'bg-gradient-to-r from-transparent via-white/10 to-transparent',
        'bg-[length:200%_100%]',
        'opacity-0 group-hover:opacity-100',
        'transition-opacity duration-300',
        '[animation:shimmer_2s_linear_infinite] group-hover:[animation-play-state:running]',
        '[animation-play-state:paused]',
      )}
    />
  )
}

// ─── Button inner content ──────────────────────────────────────────────────────
interface ContentProps {
  loading: boolean
  success: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  size: ButtonSize
  children?: React.ReactNode
}

function ButtonContent({ loading, success, leftIcon, rightIcon, size, children }: ContentProps) {
  const ic = iconSz[size]

  if (loading) {
    return (
      <>
        <Loader2 className={cn('animate-spin', ic)} aria-hidden="true" />
        <span>Cargando…</span>
      </>
    )
  }

  if (success) {
    return (
      <>
        <Check className={cn(ic, 'text-[#D1FAE5]')} aria-hidden="true" />
        <span>Listo</span>
      </>
    )
  }

  return (
    <>
      {leftIcon && <span className={cn('shrink-0', ic)}>{leftIcon}</span>}
      {children}
      {rightIcon && <span className={cn('shrink-0', ic)}>{rightIcon}</span>}
    </>
  )
}

// ─── Main export ───────────────────────────────────────────────────────────────
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    success = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    href,
    external = false,
    children,
    className,
    disabled,
    type = 'button',
    ...rest
  },
  ref,
) {
  const isDisabled = disabled || loading

  const cls = cn(
    'inline-flex items-center justify-center',
    'font-medium leading-none whitespace-nowrap select-none',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    'group', // for shimmer
    className,
  )

  const contentProps: ContentProps = {
    loading,
    success,
    leftIcon,
    rightIcon,
    size,
    children,
  }

  // ── Link variant ────────────────────────────────────────────────────────────
  if (href && !isDisabled) {
    const linkContent = (
      <>
        {variant === 'primary' && <ShimmerOverlay />}
        <ButtonContent {...contentProps} />
      </>
    )

    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {linkContent}
        </a>
      )
    }

    return (
      <Link href={href} className={cls}>
        {linkContent}
      </Link>
    )
  }

  // ── Button variant ──────────────────────────────────────────────────────────
  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={loading}
      aria-disabled={isDisabled}
      className={cls}
      // Hover: scale(1→1.02), 200ms ease-out (brief)
      whileHover={isDisabled ? {} : { scale: 1.02 }}
      // Active press: scale(1.02→0.98)
      whileTap={isDisabled ? {} : { scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      {...(rest as React.ComponentProps<typeof motion.button>)}
    >
      {variant === 'primary' && <ShimmerOverlay />}
      <ButtonContent {...contentProps} />
    </motion.button>
  )
})

Button.displayName = 'Button'
export default Button
