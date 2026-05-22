'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShoppingCart,
  CheckCircle2,
  Lock,
  ShieldCheck,
  Package,
  Zap,
  Shield,
  Target,
  Building2,
  FileCheck,
  Scale,
} from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'
import { formatPrice } from '@/lib/products'
import { CheckoutForm, Step3Payment } from '@/components/store/CheckoutForm'
import type { CheckoutPersonalData } from '@/components/store/CheckoutForm'
import type { Product } from '@/types/product'

// ─── Product icon map ─────────────────────────────────────────────────────────

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
  return <Icon className="w-4 h-4" style={{ color }} />
}

// ─── Step indicator ───────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: 'Información' },
  { id: 2, label: 'Confirmación' },
  { id: 3, label: 'Pago' },
]

function StepIndicator({ current }: { current: 1 | 2 | 3 }) {
  return (
    <div className="flex items-center justify-center gap-0">
      {STEPS.map((step, idx) => {
        const isCompleted = step.id < current
        const isActive = step.id === current
        const isUpcoming = step.id > current

        return (
          <div key={step.id} className="flex items-center">
            {/* Step circle */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`relative w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-[#059669] border-2 border-[#059669] text-white'
                    : isActive
                    ? 'border-2 border-[#D4AF37] text-[#D4AF37] bg-[rgba(212,175,55,0.1)]'
                    : 'border-2 border-[rgba(255,255,255,0.1)] text-[#475569] bg-transparent'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <span>{step.id}</span>
                )}
                {isActive && (
                  <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-[#D4AF37]" />
                )}
              </div>
              <span
                className={`text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap transition-colors duration-300 ${
                  isCompleted
                    ? 'text-[#059669]'
                    : isActive
                    ? 'text-[#D4AF37]'
                    : 'text-[#475569]'
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {idx < STEPS.length - 1 && (
              <div
                className={`w-16 sm:w-24 h-px mx-2 mb-5 transition-all duration-500 ${
                  step.id < current ? 'bg-[#059669]' : 'bg-[rgba(255,255,255,0.08)]'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Order summary sidebar ────────────────────────────────────────────────────

function CheckoutSidebar({ collapsed }: { collapsed?: boolean }) {
  const { items, getSubtotal, getTax, getTotal } = useCartStore()
  const [open, setOpen] = useState(false)
  const subtotal = getSubtotal()
  const tax = getTax()
  const total = getTotal()

  const content = (
    <div className="space-y-4">
      {/* Products */}
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.product.id} className="flex items-start gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: `${item.product.color}22` }}
            >
              <ProductIcon iconName={item.product.icon} color={item.product.color} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#F8FAFC] text-sm font-medium leading-tight truncate">
                {item.product.trademark}
              </p>
              <p className="text-[#475569] text-xs">
                {item.quantity > 1 ? `×${item.quantity}` : ''}
                {item.product.category === 'subscription' ? ' · mensual' : ' · pago único'}
              </p>
            </div>
            <span className="text-[#D4AF37] text-sm font-semibold flex-shrink-0">
              {formatPrice(item.product.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="h-px bg-[rgba(212,175,55,0.1)]" />

      {/* Totals */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-[#94A3B8]">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-[#94A3B8]">
          <span>IVA 21%</span>
          <span>{formatPrice(tax)}</span>
        </div>
        <div className="h-px bg-[rgba(255,255,255,0.06)]" />
        <div className="flex justify-between items-center">
          <span className="text-[#F8FAFC] font-bold">Total</span>
          <span
            className="text-xl font-black"
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #F5D060 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {formatPrice(total)}
          </span>
        </div>
      </div>

      {/* Trust indicators */}
      <div className="pt-2 space-y-2">
        <div className="flex items-center gap-2 text-xs text-[#475569]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
          <span>Garantía de devolución 30 días</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#475569]">
          <Lock className="w-3.5 h-3.5 text-[#059669]" />
          <span>SSL 256-bit · Stripe certificado PCI</span>
        </div>
      </div>
    </div>
  )

  if (collapsed) {
    return (
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl border border-[rgba(212,175,55,0.18)] bg-[rgba(15,34,64,0.6)] backdrop-blur-sm text-sm font-semibold text-[#F8FAFC]"
        >
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-[#D4AF37]" />
            <span>Ver resumen del pedido</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="font-bold"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #F5D060)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {formatPrice(total)}
            </span>
            <span className={`transition-transform duration-200 text-[#475569] ${open ? 'rotate-180' : ''}`}>
              ▾
            </span>
          </div>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="mt-2 p-5 rounded-xl border border-[rgba(212,175,55,0.12)] bg-[rgba(10,22,40,0.8)] backdrop-blur-xl">
                {content}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div
      className="rounded-2xl border border-[rgba(212,175,55,0.2)] p-6"
      style={{
        background: 'rgba(10, 22, 40, 0.8)',
        backdropFilter: 'blur(24px) saturate(200%)',
        boxShadow: '0 0 40px rgba(212,175,55,0.06), inset 0 1px 0 rgba(245,208,96,0.08)',
      }}
    >
      <div className="flex items-center gap-2 mb-5">
        <ShoppingCart className="w-4 h-4 text-[#D4AF37]" />
        <h2 className="text-[#F8FAFC] font-bold text-sm">Resumen del pedido</h2>
      </div>
      {content}
    </div>
  )
}

// ─── Step title / description per step ───────────────────────────────────────

const STEP_META = {
  1: {
    title: 'Información personal',
    description: 'Necesitamos algunos datos para gestionar tu servicio legal.',
  },
  2: {
    title: 'Confirma tu pedido',
    description: 'Revisa los detalles y acepta los términos para continuar al pago.',
  },
  3: {
    title: 'Pago seguro',
    description: 'Serás redirigido a Stripe para completar el pago de forma segura.',
  },
}

// ─── Empty cart redirect ──────────────────────────────────────────────────────

function EmptyCartState() {
  return (
    <div className="text-center py-20">
      <ShoppingCart className="w-16 h-16 text-[rgba(212,175,55,0.3)] mx-auto mb-5" />
      <h2 className="text-xl font-bold text-[#F8FAFC] mb-3">Tu carrito está vacío</h2>
      <p className="text-[#94A3B8] mb-7">Añade servicios antes de proceder al pago.</p>
      <Link
        href="/tienda"
        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-[#040B17] text-sm transition-all duration-200 hover:scale-105"
        style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #F5D060 100%)' }}
      >
        Explorar servicios
      </Link>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [personalData, setPersonalData] = useState<CheckoutPersonalData | null>(null)
  const [loading, setLoading] = useState(false)
  const [payError, setPayError] = useState<string | null>(null)

  const total = getTotal()
  const itemCount = items.reduce((n, i) => n + i.quantity, 0)

  // Step 1 → 2
  const handlePersonalComplete = useCallback((data: CheckoutPersonalData) => {
    setPersonalData(data)
    setStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Step 2 → 3
  const handleConfirmationComplete = useCallback(() => {
    setStep(3)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Step back
  const handleBack = useCallback(() => {
    setStep((s) => Math.max(1, s - 1) as 1 | 2 | 3)
    setPayError(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Step 3 — fire Stripe checkout
  const handlePay = useCallback(async () => {
    if (!personalData || items.length === 0) return

    setLoading(true)
    setPayError(null)

    try {
      // The API supports a single product. We use the first item's Stripe IDs.
      // For multi-item carts, iterate or use a custom endpoint; here we send
      // the first item as the primary product for Stripe session creation.
      const firstItem = items[0]
      const product = firstItem.product

      const body = {
        priceId: product.stripePriceId ?? `price_${product.id}`,
        productId: product.id,
        productName: product.trademark,
        quantity: firstItem.quantity,
        customerEmail: personalData.email,
      }

      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json.error ?? 'Error desconocido al procesar el pago.')
      }

      if (!json.url) {
        throw new Error('No se recibió la URL de pago. Inténtalo de nuevo.')
      }

      // Redirect to Stripe hosted checkout
      window.location.href = json.url
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Error al conectar con el servidor de pagos. Inténtalo de nuevo.'
      setPayError(msg)
      setLoading(false)
    }
  }, [personalData, items])

  const stepMeta = STEP_META[step]

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(135deg, #040B17 0%, #0A1628 50%, #0F1E3A 100%)' }}
    >
      {/* Background decorative glows */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-[rgba(37,99,235,0.05)] blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[rgba(212,175,55,0.04)] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-10 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] text-[#475569] mb-8 uppercase tracking-widest font-semibold">
          <Link href="/" className="hover:text-[#94A3B8] transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/carrito" className="hover:text-[#94A3B8] transition-colors">Carrito</Link>
          <span>/</span>
          <span className="text-[#D4AF37]">Checkout</span>
        </nav>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <StepIndicator current={step} />
        </motion.div>

        {/* Empty cart guard */}
        {itemCount === 0 ? (
          <EmptyCartState />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* LEFT — main checkout card (3 cols) */}
            <div className="lg:col-span-3">

              {/* Mobile collapsible summary */}
              <CheckoutSidebar collapsed />

              {/* Glassmorphism card */}
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="rounded-2xl border border-[rgba(212,175,55,0.15)] p-6 sm:p-8"
                style={{
                  background: 'rgba(15, 34, 64, 0.6)',
                  backdropFilter: 'blur(16px) saturate(180%)',
                  boxShadow:
                    '0 0 40px rgba(212,175,55,0.06), inset 0 1px 0 rgba(245,208,96,0.08)',
                }}
              >
                {/* Step header */}
                <div className="mb-7">
                  <p className="text-[11px] font-semibold text-[#D4AF37] uppercase tracking-widest mb-1">
                    Paso {step} de 3
                  </p>
                  <h1 className="text-2xl font-bold text-[#F8FAFC]">{stepMeta.title}</h1>
                  <p className="text-[#94A3B8] text-sm mt-1.5 leading-relaxed">
                    {stepMeta.description}
                  </p>
                </div>

                {/* Step content */}
                <AnimatePresence mode="wait">
                  {(step === 1 || step === 2) && (
                    <motion.div
                      key={`form-${step}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CheckoutForm
                        currentStep={step as 1 | 2}
                        onPersonalDataComplete={handlePersonalComplete}
                        onConfirmationComplete={handleConfirmationComplete}
                        onBack={handleBack}
                        loading={loading}
                        error={payError}
                      />
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="pay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Step3Payment
                        onPay={handlePay}
                        onBack={handleBack}
                        loading={loading}
                        error={payError}
                        total={formatPrice(total)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Below card: security note */}
              <p className="mt-4 text-center text-xs text-[#475569]">
                Proceso de pago seguro · Tus datos nunca se almacenan en nuestros servidores
              </p>
            </div>

            {/* RIGHT — sticky sidebar (2 cols) */}
            <div className="hidden lg:block lg:col-span-2">
              <div className="sticky top-8">
                <CheckoutSidebar />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
