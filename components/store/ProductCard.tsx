'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, X, ShoppingCart, Star, Clock, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useCartStore } from '@/lib/cart-store'
import { formatPrice, getDiscount, getBillingLabel } from '@/lib/products'
import type { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
  variant?: 'default' | 'compact' | 'featured'
  index?: number
}

export function ProductCard({ product, variant = 'default', index = 0 }: ProductCardProps) {
  const { addItem, hasItem } = useCartStore()
  const inCart = hasItem(product.id)
  const discount = getDiscount(product)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
  }

  if (variant === 'compact') {
    return (
      <CompactCard product={product} inCart={inCart} onAddToCart={handleAddToCart} index={index} />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/tienda/${product.slug}`} className="block group h-full">
        <div
          className={cn(
            'relative h-full flex flex-col rounded-2xl border transition-all duration-300',
            'bg-surface border-white/10',
            'hover:border-white/20 hover:shadow-xl',
            product.popular && 'border-amber-500/40 ring-1 ring-amber-500/20',
            variant === 'featured' && 'lg:scale-105'
          )}
          style={{
            background: product.popular
              ? `radial-gradient(circle at top right, ${product.color}15, transparent 60%)`
              : undefined,
          }}
        >
          {/* Badge */}
          {product.badge && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
              <Badge
                text={product.badge.text}
                color={product.badge.color}
                pulse={product.urgent}
              />
            </div>
          )}

          {/* Discount ribbon */}
          {discount && (
            <div className="absolute top-4 right-4 z-10">
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                -{discount}%
              </span>
            </div>
          )}

          <div className="p-6 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
              <div
                className="text-3xl p-3 rounded-xl shrink-0"
                style={{ background: `${product.color}20` }}
              >
                {product.icon}
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-bold text-white leading-tight">{product.name}</h3>
                <p className="text-sm text-white/50 mt-0.5 leading-tight">{product.tagline}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-3 mb-4">
              {product.successRate && (
                <div className="flex items-center gap-1 text-xs text-white/50">
                  <TrendingUp className="h-3 w-3 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">{product.successRate}%</span>
                  <span>éxito</span>
                </div>
              )}
              {product.deliveryTime && (
                <div className="flex items-center gap-1 text-xs text-white/50">
                  <Clock className="h-3 w-3 text-sky-400" />
                  <span className="text-sky-400 font-medium">{product.deliveryTime}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-white/60 leading-relaxed mb-5 line-clamp-2">
              {product.description}
            </p>

            {/* Features (top 4) */}
            <ul className="space-y-2 mb-6 flex-1">
              {product.features.slice(0, 4).map((feat, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  {feat.included ? (
                    <Check
                      className={cn(
                        'h-4 w-4 mt-0.5 shrink-0',
                        feat.highlight ? 'text-emerald-400' : 'text-white/40'
                      )}
                    />
                  ) : (
                    <X className="h-4 w-4 mt-0.5 shrink-0 text-white/20" />
                  )}
                  <span
                    className={cn(
                      feat.included
                        ? feat.highlight
                          ? 'text-white font-medium'
                          : 'text-white/70'
                        : 'text-white/30 line-through'
                    )}
                  >
                    {feat.text}
                  </span>
                </li>
              ))}
            </ul>

            {/* Price + CTA */}
            <div className="mt-auto pt-4 border-t border-white/10">
              <div className="flex items-end justify-between mb-4">
                <div>
                  {product.originalPrice && (
                    <span className="text-sm text-white/30 line-through block">
                      {formatPrice(product.originalPrice, product.currency)}
                    </span>
                  )}
                  <div className="flex items-baseline gap-1">
                    <span
                      className="text-2xl font-bold"
                      style={{ color: product.price === 0 ? '#22c55e' : product.color }}
                    >
                      {formatPrice(product.price, product.currency)}
                    </span>
                    <span className="text-xs text-white/40">
                      {getBillingLabel(product)}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                variant={product.popular ? 'gold' : inCart ? 'secondary' : 'primary'}
                fullWidth
                icon={<ShoppingCart className="h-4 w-4" />}
                onClick={handleAddToCart}
                className="group-hover:shadow-lg"
              >
                {inCart ? 'Añadido al carrito' : 'Añadir al carrito'}
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

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
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-white/10 hover:border-white/20 transition-colors"
    >
      <div
        className="text-2xl p-2.5 rounded-lg shrink-0"
        style={{ background: `${product.color}20` }}
      >
        {product.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-white text-sm leading-tight">{product.name}</p>
        <p className="text-xs text-white/50 mt-0.5 truncate">{product.tagline}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="font-bold text-white text-sm">
          {formatPrice(product.price, product.currency)}
        </p>
        <button
          onClick={onAddToCart}
          className={cn(
            'text-xs mt-1 px-2.5 py-1 rounded-lg transition-colors',
            inCart
              ? 'bg-emerald-500/20 text-emerald-300'
              : 'bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30'
          )}
        >
          {inCart ? '✓ En carrito' : '+ Añadir'}
        </button>
      </div>
    </motion.div>
  )
}

export default ProductCard
