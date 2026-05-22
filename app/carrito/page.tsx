'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ShieldCheck,
  ArrowRight,
  Package,
  Zap,
  Shield,
  Target,
  Building2,
  FileCheck,
  Scale,
  ChevronRight,
  Lock,
  Star,
} from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'
import { PRODUCTS, formatPrice } from '@/lib/products'
import type { Product } from '@/types/product'

// ─── Icon mapping ─────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ElementType> = {
  Shield,
  Zap,
  Target,
  Building2,
  FileCheck,
  Scale,
}

function ProductIcon({ iconName, color }: { iconName: string; color: string }) {
  const Icon = ICON_MAP[iconName] ?? Package
  return <Icon className="w-5 h-5" style={{ color }} />
}

// ─── Badge label helpers ───────────────────────────────────────────────────────

function getBillingBadge(product: Product): { label: string; isSubscription: boolean } {
  if (product.category === 'subscription') {
    return { label: 'Suscripción', isSubscription: true }
  }
  if (product.category === 'success-fee') {
    return { label: 'Solo si ganamos', isSubscription: false }
  }
  return { label: 'Pago único', isSubscription: false }
}

// ─── Payment method SVGs ──────────────────────────────────────────────────────

function VisaSVG() {
  return (
    <svg viewBox="0 0 60 20" className="h-5" aria-label="Visa">
      <text
        x="0"
        y="16"
        fontFamily="Arial"
        fontWeight="bold"
        fontSize="18"
        fill="#1A1F71"
        letterSpacing="-1"
      >
        VISA
      </text>
    </svg>
  )
}

function MastercardSVG() {
  return (
    <svg viewBox="0 0 38 24" className="h-5" aria-label="Mastercard">
      <circle cx="13" cy="12" r="10" fill="#EB001B" />
      <circle cx="25" cy="12" r="10" fill="#F79E1B" />
      <path
        d="M19 5.5A10 10 0 0 1 24.5 12 10 10 0 0 1 19 18.5 10 10 0 0 1 13.5 12 10 10 0 0 1 19 5.5z"
        fill="#FF5F00"
      />
    </svg>
  )
}

function StripeSVG() {
  return (
    <svg viewBox="0 0 60 25" className="h-5" aria-label="Stripe">
      <text
        x="0"
        y="19"
        fontFamily="Arial"
        fontWeight="bold"
        fontSize="17"
        fill="#635BFF"
      >
        stripe
      </text>
    </svg>
  )
}

// ─── Suggested products (3 not in cart) ───────────────────────────────────────

function useSuggestedProducts(cartProductIds: string[]): Product[] {
  return PRODUCTS.filter((p) => !cartProductIds.includes(p.id)).slice(0, 3)
}

// ─── Cart item row ────────────────────────────────────────────────────────────

function CartItemRow({ item }: { item: { product: Product; quantity: number } }) {
  const { updateQuantity, removeItem } = useCartStore()
  const { label, isSubscription } = getBillingBadge(item.product)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, height: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-start gap-4 p-5 rounded-2xl border border-[rgba(212,175,55,0.12)] bg-[rgba(15,34,64,0.5)] backdrop-blur-sm hover:border-[rgba(212,175,55,0.25)] transition-all duration-200"
    >
      {/* Icon */}
      <div
        className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
        style={{ background: `${item.product.color}22` }}
      >
        <ProductIcon iconName={item.product.icon} color={item.product.color} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <h3 className="text-[#F8FAFC] font-semibold text-sm leading-tight">
              {item.product.trademark}
            </h3>
            <p className="text-[#94A3B8] text-xs mt-0.5 line-clamp-2 leading-relaxed">
              {item.product.tagline}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-[#D4AF37] font-bold text-base">
              {formatPrice(item.product.price * item.quantity)}
            </p>
            <span
              className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1 ${
                isSubscription
                  ? 'bg-[rgba(37,99,235,0.2)] text-[#60A5FA] border border-[rgba(37,99,235,0.3)]'
                  : 'bg-[rgba(212,175,55,0.15)] text-[#D4AF37] border border-[rgba(212,175,55,0.25)]'
              }`}
            >
              {label}
            </span>
          </div>
        </div>

        {/* Quantity controls + delete */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              className="w-7 h-7 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] text-[#94A3B8] hover:text-white hover:border-[rgba(212,175,55,0.3)] hover:bg-[rgba(212,175,55,0.08)] transition-all duration-150 flex items-center justify-center"
              aria-label="Reducir cantidad"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-white font-semibold text-sm w-6 text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              className="w-7 h-7 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] text-[#94A3B8] hover:text-white hover:border-[rgba(212,175,55,0.3)] hover:bg-[rgba(212,175,55,0.08)] transition-all duration-150 flex items-center justify-center"
              aria-label="Aumentar cantidad"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <button
            onClick={() => removeItem(item.product.id)}
            className="flex items-center gap-1.5 text-xs text-[#475569] hover:text-[#DC2626] transition-colors duration-150 group"
            aria-label={`Eliminar ${item.product.name}`}
          >
            <Trash2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            <span>Eliminar</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Empty cart state ─────────────────────────────────────────────────────────

function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-24 px-6"
    >
      {/* Illustration */}
      <div className="relative mx-auto w-32 h-32 mb-8">
        <div className="absolute inset-0 rounded-full bg-[rgba(212,175,55,0.08)] border border-[rgba(212,175,55,0.15)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <ShoppingCart className="w-14 h-14 text-[rgba(212,175,55,0.4)]" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#0A1628] border border-[rgba(212,175,55,0.2)] flex items-center justify-center">
          <span className="text-[10px] text-[#D4AF37] font-bold">0</span>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-[#F8FAFC] mb-3">Tu carrito está vacío</h2>
      <p className="text-[#94A3B8] text-base mb-8 max-w-md mx-auto leading-relaxed">
        Aún no has añadido ningún servicio legal. Explora nuestra tienda y encuentra la
        protección que necesitas.
      </p>
      <Link
        href="/tienda"
        className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-[#040B17] text-sm transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
        style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #F5D060 100%)' }}
      >
        Explorar servicios
        <ArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  )
}

// ─── Order summary sidebar ────────────────────────────────────────────────────

function OrderSummary() {
  const { items, getSubtotal, getTax, getTotal } = useCartStore()
  const subtotal = getSubtotal()
  const tax = getTax()
  const total = getTotal()

  // Discount: if subtotal > 200€, apply 5% (example promo)
  const discountAmount = subtotal >= 200 ? subtotal * 0.05 : 0
  const discountedTotal = total - discountAmount

  return (
    <div
      className="rounded-2xl border border-[rgba(212,175,55,0.2)] backdrop-blur-xl p-6 space-y-5"
      style={{
        background: 'rgba(10, 22, 40, 0.8)',
        boxShadow: '0 0 40px rgba(212,175,55,0.06), inset 0 1px 0 rgba(245,208,96,0.08)',
      }}
    >
      <h2 className="text-lg font-bold text-[#F8FAFC]">Resumen del pedido</h2>

      {/* Line items */}
      <div className="space-y-2.5">
        {items.map((item) => (
          <div key={item.product.id} className="flex justify-between items-center text-sm">
            <span className="text-[#94A3B8] truncate max-w-[160px]">
              {item.product.name}
              {item.quantity > 1 && (
                <span className="text-[#475569] ml-1">×{item.quantity}</span>
              )}
            </span>
            <span className="text-[#F8FAFC] font-medium flex-shrink-0">
              {formatPrice(item.product.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-[rgba(212,175,55,0.1)]" />

      {/* Totals */}
      <div className="space-y-2.5 text-sm">
        <div className="flex justify-between text-[#94A3B8]">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-[#059669]">
            <span className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5" />
              Descuento aplicado (5%)
            </span>
            <span>−{formatPrice(discountAmount)}</span>
          </div>
        )}

        <div className="flex justify-between text-[#94A3B8]">
          <span>IVA 21%</span>
          <span>{formatPrice(tax)}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[rgba(212,175,55,0.1)]" />

      {/* Total */}
      <div className="flex justify-between items-center">
        <span className="text-[#F8FAFC] font-bold text-base">Total</span>
        <span
          className="text-2xl font-black"
          style={{
            background: 'linear-gradient(135deg, #D4AF37 0%, #F5D060 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {formatPrice(discountedTotal)}
        </span>
      </div>

      {/* CTA */}
      <Link
        href="/checkout"
        className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-bold text-[#040B17] text-base transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(212,175,55,0.4)] active:scale-[0.99]"
        style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #F5D060 50%, #D4AF37 100%)' }}
      >
        <Lock className="w-4 h-4" />
        Proceder al pago
        <ChevronRight className="w-4 h-4" />
      </Link>

      {/* Payment methods */}
      <div>
        <p className="text-[#475569] text-[11px] text-center mb-3 uppercase tracking-wider font-semibold">
          Métodos de pago aceptados
        </p>
        <div className="flex items-center justify-center gap-4 bg-[rgba(255,255,255,0.03)] rounded-xl px-4 py-3 border border-[rgba(255,255,255,0.06)]">
          <div className="bg-white rounded-md px-2 py-1 flex items-center">
            <VisaSVG />
          </div>
          <div className="bg-white rounded-md px-2 py-1 flex items-center">
            <MastercardSVG />
          </div>
          <div className="bg-white rounded-md px-2 py-1 flex items-center">
            <StripeSVG />
          </div>
        </div>
      </div>

      {/* SSL badge */}
      <div className="flex items-center justify-center gap-2 text-xs text-[#475569]">
        <ShieldCheck className="w-4 h-4 text-[#059669]" />
        <span>Pago 100% seguro · SSL 256-bit encriptado</span>
      </div>
    </div>
  )
}

// ─── Suggested product mini-card ──────────────────────────────────────────────

function SuggestedCard({ product }: { product: Product }) {
  const { addItem, hasItem } = useCartStore()
  const inCart = hasItem(product.id)

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="p-5 rounded-2xl border border-[rgba(212,175,55,0.12)] bg-[rgba(15,34,64,0.4)] backdrop-blur-sm hover:border-[rgba(212,175,55,0.25)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-250 flex flex-col gap-3"
    >
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${product.color}22` }}
        >
          <ProductIcon iconName={product.icon} color={product.color} />
        </div>
        <div>
          <h4 className="text-[#F8FAFC] font-semibold text-sm leading-tight">
            {product.trademark}
          </h4>
          <p className="text-[#D4AF37] font-bold text-sm mt-0.5">
            {product.price === 0 ? 'A éxito' : formatPrice(product.price)}
          </p>
        </div>
      </div>
      <p className="text-[#94A3B8] text-xs leading-relaxed line-clamp-2">{product.tagline}</p>
      <button
        onClick={() => !inCart && addItem(product, 1)}
        disabled={inCart}
        className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition-all duration-150 ${
          inCart
            ? 'bg-[rgba(5,150,105,0.15)] text-[#059669] border border-[rgba(5,150,105,0.2)] cursor-default'
            : 'bg-[rgba(212,175,55,0.12)] text-[#D4AF37] border border-[rgba(212,175,55,0.2)] hover:bg-[rgba(212,175,55,0.2)] hover:border-[rgba(212,175,55,0.35)]'
        }`}
      >
        {inCart ? '✓ En el carrito' : 'Añadir al carrito'}
      </button>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CarritoPage() {
  const { items, getItemCount } = useCartStore()
  const itemCount = getItemCount()
  const suggestedProducts = useSuggestedProducts(items.map((i) => i.product.id))

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(135deg, #040B17 0%, #0A1628 50%, #0F1E3A 100%)' }}
    >
      {/* Background glows */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[rgba(37,99,235,0.06)] blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-[rgba(212,175,55,0.04)] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <ShoppingCart className="w-7 h-7 text-[#D4AF37]" />
            <h1 className="text-3xl font-bold text-[#F8FAFC]">
              Tu Carrito
              {itemCount > 0 && (
                <span className="ml-3 text-sm font-medium text-[#94A3B8] align-middle">
                  ({itemCount} {itemCount === 1 ? 'servicio' : 'servicios'})
                </span>
              )}
            </h1>
          </div>
          {/* Gold underline */}
          <div
            className="h-px w-24 mt-3 animate-line-reveal"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, #D4AF37 50%, transparent 100%)',
            }}
          />
        </motion.div>

        {/* Empty cart */}
        {itemCount === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT — item list */}
            <div className="lg:col-span-2 space-y-3">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <CartItemRow key={item.product.id} item={item} />
                ))}
              </AnimatePresence>

              {/* Back to store */}
              <div className="pt-2">
                <Link
                  href="/tienda"
                  className="inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#D4AF37] transition-colors duration-150"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Seguir explorando servicios
                </Link>
              </div>
            </div>

            {/* RIGHT — sticky summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <OrderSummary />
              </div>
            </div>
          </div>
        )}

        {/* Suggested products */}
        {suggestedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16"
          >
            {/* Section header */}
            <div className="flex items-center gap-4 mb-6">
              <div>
                <p className="text-[11px] text-[#D4AF37] font-semibold uppercase tracking-widest mb-1">
                  Completa tu protección
                </p>
                <h2 className="text-xl font-bold text-[#F8FAFC]">
                  También te puede interesar
                </h2>
              </div>
              <div className="flex-1 h-px bg-[rgba(212,175,55,0.1)]" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestedProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
                >
                  <SuggestedCard product={product} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  )
}
