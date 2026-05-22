'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, X, ArrowRight, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useCartStore } from '@/lib/cart-store'
import { formatPrice, getDiscount, getBillingLabel } from '@/lib/products'
import type { Product } from '@/types/product'

interface PriceCardProps {
  product: Product
  index?: number
  highlighted?: boolean
}

export function PriceCard({ product, index = 0, highlighted = false }: PriceCardProps) {
  const { addItem, hasItem } = useCartStore()
  const inCart = hasItem(product.id)
  const discount = getDiscount(product)
  const isHighlighted = highlighted || product.popular

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className={cn(
        'relative flex flex-col rounded-3xl border p-8 transition-all duration-300',
        isHighlighted
          ? 'bg-gradient-to-b from-indigo-950/80 to-surface border-indigo-500/40 shadow-xl shadow-indigo-500/10 ring-1 ring-indigo-500/20'
          : 'bg-surface border-white/10 hover:border-white/20'
      )}
    >
      {/* Popular ribbon */}
      {isHighlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1.5 bg-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-indigo-500/30">
            <Star className="h-3 w-3 fill-current" />
            Más popular
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-3">
          <div
            className="text-3xl p-3 rounded-xl"
            style={{ background: `${product.color}20` }}
          >
            {product.icon}
          </div>
          {product.badge && (
            <Badge text={product.badge.text} variant={product.badge.color} size="sm" />
          )}
        </div>
        <h3 className="text-xl font-bold text-white">{product.name}</h3>
        <p className="text-sm text-white/50 mt-1">{product.tagline}</p>
      </div>

      {/* Pricing */}
      <div className="mb-6 pb-6 border-b border-white/10">
        {product.originalPrice && (
          <p className="text-sm text-white/30 line-through">
            {formatPrice(product.originalPrice, product.currency)}
          </p>
        )}
        <div className="flex items-end gap-1">
          <span
            className="text-4xl font-black"
            style={{ color: product.price === 0 ? '#22c55e' : product.color }}
          >
            {formatPrice(product.price, product.currency)}
          </span>
          <span className="text-white/40 text-sm pb-1.5">{getBillingLabel(product)}</span>
        </div>
        {discount && (
          <span className="inline-block mt-2 text-xs bg-red-500/20 text-red-300 border border-red-500/30 px-2 py-0.5 rounded-full">
            Ahorra {discount}%
          </span>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-3 flex-1 mb-8">
        {product.features.map((feat, i) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            {feat.included ? (
              <div
                className="mt-0.5 h-4 w-4 shrink-0 rounded-full flex items-center justify-center"
                style={{
                  background: feat.highlight ? `${product.color}30` : 'rgba(255,255,255,0.05)',
                }}
              >
                <Check
                  className="h-2.5 w-2.5"
                  style={{ color: feat.highlight ? product.color : 'rgba(255,255,255,0.4)' }}
                />
              </div>
            ) : (
              <div className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-white/5 flex items-center justify-center">
                <X className="h-2.5 w-2.5 text-white/20" />
              </div>
            )}
            <span
              className={cn(
                feat.included
                  ? feat.highlight
                    ? 'text-white font-medium'
                    : 'text-white/70'
                  : 'text-white/25 line-through'
              )}
            >
              {feat.text}
            </span>
          </li>
        ))}
      </ul>

      {/* Guarantee */}
      <div className="mb-5 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
        <p className="text-xs text-white/50 leading-relaxed">
          <span className="text-emerald-400 font-medium">Garantía:</span> {product.guarantee}
        </p>
      </div>

      {/* CTA */}
      <div className="space-y-2.5">
        <Button
          variant={isHighlighted ? 'primary' : inCart ? 'secondary' : 'primary'}
          fullWidth
          size="lg"
          onClick={() => addItem(product)}
          rightIcon={<ArrowRight className="h-4 w-4" />}
        >
          {inCart ? '✓ Añadido al carrito' : 'Contratar ahora'}
        </Button>
        <Link
          href={`/tienda/${product.slug}`}
          className="block text-center text-xs text-white/30 hover:text-white/60 transition-colors"
        >
          Ver más detalles →
        </Link>
      </div>
    </motion.div>
  )
}

export default PriceCard
