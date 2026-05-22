'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import type { LucideProps } from 'lucide-react'
import {
  Check,
  ShoppingCart,
  Clock,
  TrendingUp,
  Shield,
  Zap,
  Trophy,
  Building2,
  FileCheck,
  Scale,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { useCartStore } from '@/lib/cart-store'
import { formatPrice, getDiscount, getBillingLabel } from '@/lib/products'
import type { Product } from '@/types/product'

// ─────────────────────────────────────────────────────────────────────────────
// ProductCard — Justicia Legalia Premium (Design System v1.0)
//
// Glassmorphism dark con border sutil, gradiente del color del producto como
// accent, badge en esquina superior derecha, icono grande, precio con tachado,
// 3 features principales con checkmarks dorados, guarantee badge verde, CTA
// "Contratar" que navega a /tienda/[slug].
//
// Hover: levita 4px, sombra con el color del producto.
// Popular: borde dorado brillante + ring exterior.
// ─────────────────────────────────────────────────────────────────────────────

// ── Icon map (lucide-react) — typed with LucideProps ─────────────────────────
type LucideIcon = React.ComponentType<LucideProps>

const ICON_MAP: Record<string, LucideIcon> = {
  Shield,
  Zap,
  Trophy,
  Building2,
  FileCheck,
  Scale,
  ShieldCheck,
}

function ProductIcon({
  name,
  color,
  className,
}: {
  name: string
  color: string
  className?: string
}) {
  const Icon: LucideIcon = ICON_MAP[name] ?? Shield
  return <Icon className={className} style={{ color }} />
}

// ── Badge color → Badge variant mapping ──────────────────────────────────────
const badgeVariantMap: Record<string, 'gold' | 'green' | 'red' | 'blue'> = {
  gold: 'gold',
  green: 'green',
  red: 'red',
  blue: 'blue',
}

// ── Props ─────────────────────────────────────────────────────────────────────
interface ProductCardProps {
  product: Product
  /** `featured` renders the popular card slightly larger with extra glow */
  variant?: 'default' | 'compact' | 'featured'
  index?: number
}

// ── Framer Motion variants ────────────────────────────────────────────────────
const cardEntrance = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
}

// ── Main component ────────────────────────────────────────────────────────────
export function ProductCard({ product, variant = 'default', index = 0 }: ProductCardProps) {
  const { addItem, hasItem } = useCartStore()
  const inCart = hasItem(product.id)
  const discount = getDiscount(product)
  const isFeatured = variant === 'featured' || product.popular

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
  }

  // Compact variant — used in sidebars, related products
  if (variant === 'compact') {
    return (
      <CompactCard
        product={product}
        inCart={inCart}
        onAddToCart={handleAddToCart}
        index={index}
      />
    )
  }

  return (
    <motion.div
      variants={cardEntrance}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08 }}
      className={cn('h-full', isFeatured && 'lg:scale-[1.03] lg:z-10')}
    >
      {/* Hover wrapper — levita 4px, sombra con el color del producto */}
      <motion.div
        className="h-full"
        whileHover={{
          y: -4,
          transition: { duration: 0.25, ease: 'easeOut' },
        }}
        style={{ originX: 0.5, originY: 1 }}
      >
        <Link
          href={`/tienda/${product.slug}`}
          className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#040B17] rounded-2xl"
          aria-label={`Ver detalles de ${product.trademark}`}
        >
          {/* ── Card shell — glassmorphism premium ──────────────────────── */}
          <div
            className={cn(
              'relative h-full flex flex-col rounded-2xl overflow-hidden',
              // Glassmorphism premium variant (brief §3)
              'backdrop-blur-[24px]',
              // Border
              isFeatured
                ? 'border-2 border-[#D4AF37]'
                : 'border border-[rgba(212,175,55,0.18)]',
              // Transition for hover shadow
              'transition-shadow duration-250',
            )}
            style={{
              background: 'rgba(10,22,40,0.80)',
              backgroundImage:
                'radial-gradient(ellipse at top, rgba(37,99,235,0.07) 0%, transparent 60%)',
              boxShadow: isFeatured
                ? '0 0 20px rgba(212,175,55,0.3), 0 0 60px rgba(212,175,55,0.1), inset 0 1px 0 rgba(245,208,96,0.1)'
                : '0 4px 16px rgba(0,0,0,0.5), 0 2px 6px rgba(0,0,0,0.3)',
            }}
          >
            {/* ── Product color accent line at top ─────────────────────── */}
            <div
              className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl z-10"
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${product.color} 50%, transparent 100%)`,
              }}
              aria-hidden="true"
            />

            {/* ── Inset top highlight ──────────────────────────────────── */}
            <div
              className="absolute inset-x-0 top-0 h-px z-10"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(245,208,96,0.25) 50%, transparent 100%)',
              }}
              aria-hidden="true"
            />

            {/* ── Badge — top right corner ─────────────────────────────── */}
            {product.badge && (
              <div className="absolute top-4 right-4 z-20">
                <Badge
                  text={product.badge.text}
                  variant={badgeVariantMap[product.badge.color] ?? 'gold'}
                  size="sm"
                  dot={product.urgent}
                  pulse={product.urgent}
                />
              </div>
            )}

            {/* ── Discount ribbon (when no badge) ─────────────────────── */}
            {discount != null && !product.badge && (
              <div className="absolute top-4 right-4 z-20">
                <span className="bg-red-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  -{discount}%
                </span>
              </div>
            )}

            {/* ── Card body ────────────────────────────────────────────── */}
            <div className="relative z-10 flex flex-col h-full p-6 pt-8">

              {/* ── Icon + name header ───────────────────────────────── */}
              <div className="flex items-start gap-4 mb-5">
                {/* Large product icon with color-tinted background */}
                <div
                  className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-md"
                  style={{
                    background: `${product.color}1a`,
                    border: `1px solid ${product.color}33`,
                  }}
                >
                  <ProductIcon name={product.icon} color={product.color} className="w-7 h-7" />
                </div>

                <div className="min-w-0 flex-1 pt-0.5">
                  <h3 className="text-lg font-bold text-[#F8FAFC] leading-tight">
                    {product.trademark}
                  </h3>
                  <p className="text-sm text-[#94A3B8] mt-1 leading-snug line-clamp-2">
                    {product.tagline}
                  </p>
                </div>
              </div>

              {/* ── Stats row ────────────────────────────────────────── */}
              <div className="flex flex-wrap gap-3 mb-5">
                {product.successRate != null && (
                  <div className="flex items-center gap-1.5 text-xs">
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span className="text-emerald-400 font-semibold">{product.successRate}%</span>
                    <span className="text-[#475569]">de éxito</span>
                  </div>
                )}
                {product.deliveryTime && (
                  <div className="flex items-center gap-1.5 text-xs">
                    <Clock className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                    <span className="text-[#94A3B8]">{product.deliveryTime}</span>
                  </div>
                )}
              </div>

              {/* ── Top 3 features with golden checkmarks ────────────── */}
              <ul className="space-y-2.5 mb-5 flex-1">
                {product.features.slice(0, 3).map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    {/* Checkmark circle — gold for highlighted, product color for normal */}
                    <span
                      className="shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                      style={{
                        background: feat.highlight
                          ? `${product.color}22`
                          : 'rgba(212,175,55,0.10)',
                        border: `1px solid ${feat.highlight ? product.color + '44' : 'rgba(212,175,55,0.22)'}`,
                      }}
                    >
                      <Check
                        className="w-2.5 h-2.5"
                        style={{ color: feat.highlight ? product.color : '#D4AF37' }}
                      />
                    </span>
                    <span
                      className={cn(
                        'text-sm leading-snug',
                        feat.highlight ? 'text-[#F8FAFC] font-medium' : 'text-[#94A3B8]',
                      )}
                    >
                      {feat.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* ── Guarantee badge — green small ─────────────────────── */}
              <div className="mb-5 px-3 py-2 rounded-xl flex items-start gap-2 bg-[rgba(5,150,105,0.08)] border border-[rgba(5,150,105,0.22)]">
                <ShieldCheck className="h-3.5 w-3.5 text-[#059669] shrink-0 mt-0.5" />
                <p className="text-[11px] text-[#D1FAE5]/80 leading-relaxed line-clamp-2">
                  {product.guarantee}
                </p>
              </div>

              {/* ── Price + CTA ───────────────────────────────────────── */}
              <div className="pt-4 border-t border-[rgba(212,175,55,0.10)]">
                {/* Price row */}
                <div className="flex items-end justify-between mb-4">
                  <div>
                    {product.originalPrice != null && (
                      <span className="text-xs text-[#475569] line-through block leading-none mb-1">
                        {formatPrice(product.originalPrice, product.currency)}
                        {getBillingLabel(product)}
                      </span>
                    )}
                    <div className="flex items-baseline gap-1">
                      <span
                        className="text-2xl font-black leading-none"
                        style={{ color: product.price === 0 ? '#10b981' : product.color }}
                      >
                        {product.price === 0
                          ? 'Gratis'
                          : formatPrice(product.price, product.currency)}
                      </span>
                      {product.price !== 0 && (
                        <span className="text-[11px] text-[#475569] pb-0.5">
                          {getBillingLabel(product)}
                        </span>
                      )}
                    </div>
                    {product.price === 0 && (
                      <p className="text-[11px] text-[#94A3B8] mt-0.5">
                        30% del ahorro si ganamos
                      </p>
                    )}
                  </div>

                  {discount != null && (
                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-[rgba(5,150,105,0.15)] text-emerald-400 border border-emerald-500/20">
                      -{discount}%
                    </span>
                  )}
                </div>

                {/* CTA button — "Contratar" navigates to /tienda/[slug] */}
                <button
                  onClick={handleAddToCart}
                  className={cn(
                    'w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl',
                    'text-sm font-semibold transition-all duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]',
                    inCart
                      ? 'bg-[rgba(5,150,105,0.2)] border border-emerald-500/30 text-emerald-400'
                      : isFeatured
                        ? [
                            'text-[#040B17]',
                            'shadow-[0_0_20px_rgba(212,175,55,0.3)]',
                            'hover:shadow-[0_0_30px_rgba(212,175,55,0.45)]',
                          ].join(' ')
                        : [
                            'bg-gradient-to-br from-[#1B3A6B] to-[#2563EB] text-white',
                            'border border-[rgba(212,175,55,0.15)]',
                            'hover:from-[#2563EB] hover:to-[#3B82F6]',
                            'hover:shadow-[0_0_20px_rgba(37,99,235,0.35)]',
                          ].join(' '),
                  )}
                  style={
                    !inCart && isFeatured
                      ? { background: 'linear-gradient(135deg, #B8860B 0%, #D4AF37 100%)' }
                      : undefined
                  }
                  aria-label={
                    inCart ? 'Ya en el carrito' : `Contratar ${product.trademark}`
                  }
                >
                  {inCart ? (
                    <>
                      <Check className="h-4 w-4 shrink-0" />
                      Añadido al carrito
                    </>
                  ) : (
                    <>
                      {product.price === 0 ? (
                        <ShieldCheck className="h-4 w-4 shrink-0" />
                      ) : (
                        <ShoppingCart className="h-4 w-4 shrink-0" />
                      )}
                      Contratar
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 ml-auto" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CompactCard — for sidebars, related products, upsell rows
// ─────────────────────────────────────────────────────────────────────────────
function CompactCard({
  product,
  inCart,
  onAddToCart,
  index,
}: {
  product: Product
  inCart: boolean
  onAddToCart: (e: React.MouseEvent) => void
  index: number
}) {
  const Icon: LucideIcon = ICON_MAP[product.icon] ?? Shield

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={cn(
        'flex items-center gap-4 p-4 rounded-xl',
        'bg-[rgba(10,22,40,0.70)] backdrop-blur-lg',
        'border border-[rgba(212,175,55,0.15)]',
        'hover:border-[rgba(212,175,55,0.30)] hover:-translate-y-0.5',
        'transition-all duration-200',
      )}
    >
      {/* Icon */}
      <div
        className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
        style={{
          background: `${product.color}18`,
          border: `1px solid ${product.color}30`,
        }}
      >
        <Icon className="w-5 h-5" style={{ color: product.color }} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[#F8FAFC] text-sm leading-tight truncate">
          {product.trademark}
        </p>
        <p className="text-xs text-[#94A3B8] mt-0.5 truncate">{product.tagline}</p>
      </div>

      {/* Price + action */}
      <div className="text-right shrink-0">
        <p className="font-bold text-[#F8FAFC] text-sm">
          {product.price === 0
            ? 'Gratis'
            : formatPrice(product.price, product.currency)}
        </p>
        <button
          onClick={onAddToCart}
          className={cn(
            'text-xs mt-1 px-3 py-1 rounded-lg font-medium transition-colors',
            inCart
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/20'
              : 'bg-[rgba(37,99,235,0.15)] text-[#DBEAFE] border border-[rgba(37,99,235,0.25)] hover:bg-[rgba(37,99,235,0.25)]',
          )}
        >
          {inCart ? '✓ En carrito' : '+ Añadir'}
        </button>
      </div>
    </motion.div>
  )
}

export default ProductCard
