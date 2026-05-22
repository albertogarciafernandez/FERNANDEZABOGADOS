'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Shield,
  Zap,
  Target,
  Building2,
  FileCheck,
  Scale,
} from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'
import { formatPrice, getBillingLabel } from '@/lib/products'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const ICON_MAP: Record<string, React.ElementType> = {
  Shield,
  Zap,
  Target,
  Building2,
  FileCheck,
  Scale,
}

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal, getTax, getTotal, getItemCount } =
    useCartStore()

  const overlayRef = useRef<HTMLDivElement>(null)

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    if (isOpen) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, closeCart])

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const subtotal = getSubtotal()
  const tax = getTax()
  const total = getTotal()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md flex flex-col bg-[#0d0d1a] border-l border-white/10 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <ShoppingCart className="h-5 w-5 text-indigo-400" />
                <h2 className="text-lg font-semibold text-white">Tu carrito</h2>
                {getItemCount() > 0 && (
                  <span className="bg-indigo-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {getItemCount()}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Cerrar carrito</span>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {items.length === 0 ? (
                <EmptyCart onClose={closeCart} />
              ) : (
                items.map((item) => (
                  <CartItemRow
                    key={item.product.id}
                    item={item}
                    onRemove={() => removeItem(item.product.id)}
                    onQuantityChange={(q) => updateQuantity(item.product.id, q)}
                  />
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="shrink-0 border-t border-white/10 px-6 py-5 space-y-4">
                {/* Totals */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-white/60">
                    <span>Subtotal (sin IVA)</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>IVA (21%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between text-white font-bold text-base pt-2 border-t border-white/10">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* CTA */}
                <Link href="/checkout" onClick={closeCart} className="block w-full">
                  <Button
                    variant="primary"
                    fullWidth
                    size="lg"
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                  >
                    Ir al pago seguro
                  </Button>
                </Link>

                {/* Trust badges */}
                <div className="flex items-center justify-center gap-2 text-xs text-white/30">
                  <ShieldCheck className="h-3 w-3" />
                  <span>Pago 100% seguro · Stripe · SSL</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function CartItemRow({
  item,
  onRemove,
  onQuantityChange,
}: {
  item: { product: { id: string; name: string; icon: string; color: string; price: number; currency: string; billingPeriod?: string }; quantity: number }
  onRemove: () => void
  onQuantityChange: (q: number) => void
}) {
  return (
    <div className="flex gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
      <div
        className="p-2.5 rounded-lg shrink-0 h-fit"
        style={{ background: `${item.product.color}20` }}
      >
        {(() => {
          const Icon = ICON_MAP[item.product.icon] ?? Shield
          return <Icon className="h-5 w-5" style={{ color: item.product.color }} />
        })()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white leading-tight">{item.product.name}</p>
        <p className="text-xs text-white/40 mt-0.5">
          {formatPrice(item.product.price, item.product.currency)}
          {item.product.billingPeriod === 'month' && '/mes'}
        </p>

        {/* Quantity controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onQuantityChange(item.quantity - 1)}
            className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-colors"
          >
            <Minus className="h-3 w-3" />
          </button>
          <span className="text-sm font-medium text-white w-6 text-center tabular-nums">
            {item.quantity}
          </span>
          <button
            onClick={() => onQuantityChange(item.quantity + 1)}
            className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-colors"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between shrink-0">
        <button
          onClick={onRemove}
          className="p-1.5 rounded-md text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
        <p className="text-sm font-bold text-white">
          {formatPrice(item.product.price * item.quantity, item.product.currency)}
        </p>
      </div>
    </div>
  )
}

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full py-16 text-center">
      <div className="text-5xl mb-4">🛒</div>
      <h3 className="text-lg font-semibold text-white mb-2">Tu carrito está vacío</h3>
      <p className="text-sm text-white/50 mb-6">
        Explora nuestros servicios legales y añade los que necesitas.
      </p>
      <Link href="/tienda" onClick={onClose}>
        <Button variant="primary" size="md">
          Ver servicios
        </Button>
      </Link>
    </div>
  )
}

export default CartDrawer
