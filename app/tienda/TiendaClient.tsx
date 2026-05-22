'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShieldCheck,
  Clock,
  Star,
  Award,
  Zap,
  ArrowRight,
  Check,
  Shield,
  Target,
  Building2,
  FileCheck,
  Scale,
  ShoppingCart,
  TrendingUp,
} from 'lucide-react'
import { PRODUCTS, getProductsByCategory, formatPrice, getBillingLabel, getDiscount } from '@/lib/products'
import { useCartStore } from '@/lib/cart-store'
import { cn } from '@/lib/utils'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import type { Product, ProductCategory } from '@/types/product'

// ─── Icon map ─────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ElementType> = {
  Shield,
  Zap,
  Target,
  Building2,
  FileCheck,
  Scale,
}

// ─── Filter categories ────────────────────────────────────────────────────────

type FilterCategory = 'all' | ProductCategory

const FILTER_LABELS: Record<FilterCategory, string> = {
  all: 'Todos los servicios',
  subscription: 'Suscripción mensual',
  'one-time': 'Pago único',
  'success-fee': 'A éxito',
}

const FILTER_DESCRIPTIONS: Record<FilterCategory, string> = {
  all: 'Todos nuestros servicios legales',
  subscription: 'Protección continua con abogado asignado',
  'one-time': 'Pago único, sin compromisos',
  'success-fee': 'Solo pagas si ganamos',
}

// ─── Product card ─────────────────────────────────────────────────────────────

function StoreProductCard({ product, index }: { product: Product; index: number }) {
  const { addItem, hasItem, openCart } = useCartStore()
  const inCart = hasItem(product.id)
  const discount = getDiscount(product)
  const Icon = ICON_MAP[product.icon] ?? Shield

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    if (inCart) {
      openCart()
      return
    }
    addItem(product)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <div
        className={cn(
          'relative h-full flex flex-col rounded-2xl transition-all duration-300',
          'hover:shadow-[0_20px_48px_rgba(0,0,0,0.6),0_8px_16px_rgba(0,0,0,0.4)]',
          product.popular && 'ring-1 ring-[rgba(212,175,55,0.3)]',
        )}
        style={{
          background: product.popular
            ? `radial-gradient(circle at top right, ${product.color}12, rgba(10,22,40,0.9) 60%)`
            : 'rgba(10, 22, 40, 0.8)',
          backdropFilter: 'blur(24px) saturate(200%)',
          border: product.popular
            ? '1px solid rgba(212, 175, 55, 0.25)'
            : '1px solid rgba(212, 175, 55, 0.12)',
          boxShadow: product.popular
            ? '0 0 40px rgba(212,175,55,0.08), inset 0 1px 0 rgba(245,208,96,0.1)'
            : undefined,
        }}
      >
        {/* Popular ribbon */}
        {product.popular && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
            <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.4)] text-[#F5D060]">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              Más popular
            </span>
          </div>
        )}

        {/* Discount badge */}
        {discount && (
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              -{discount}%
            </span>
          </div>
        )}

        <div className={cn('flex flex-col h-full p-7', product.popular && 'pt-9')}>
          {/* Header */}
          <div className="flex items-start gap-4 mb-5">
            <div
              className="p-3.5 rounded-xl shrink-0"
              style={{
                background: `${product.color}20`,
                boxShadow: `0 0 20px ${product.color}20`,
              }}
            >
              <Icon className="w-6 h-6" style={{ color: product.color }} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-bold text-white leading-tight">{product.trademark}</h3>
              <p className="text-sm text-[#94A3B8] mt-0.5 leading-snug">{product.tagline}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-3 mb-5">
            {product.successRate && (
              <div className="flex items-center gap-1.5 text-xs">
                <TrendingUp className="h-3.5 w-3.5 text-[#059669]" />
                <span className="text-[#059669] font-semibold">{product.successRate}%</span>
                <span className="text-[#475569]">éxito</span>
              </div>
            )}
            {product.deliveryTime && (
              <div className="flex items-center gap-1.5 text-xs">
                <Clock className="h-3.5 w-3.5 text-[#2563EB]" />
                <span className="text-[#2563EB] font-medium">{product.deliveryTime}</span>
              </div>
            )}
          </div>

          {/* Features */}
          <ul className="space-y-2.5 mb-6 flex-1">
            {product.features.map((feat, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <Check
                  className={cn(
                    'h-4 w-4 mt-0.5 shrink-0',
                    feat.highlight ? 'text-[#D4AF37]' : 'text-[#059669]',
                  )}
                />
                <span
                  className={cn(
                    'text-sm leading-snug',
                    feat.highlight ? 'text-white font-medium' : 'text-[#94A3B8]',
                  )}
                >
                  {feat.text}
                </span>
              </li>
            ))}
          </ul>

          {/* Price + CTA */}
          <div className="mt-auto pt-5 border-t border-white/10">
            <div className="mb-4">
              {product.originalPrice && (
                <span className="text-sm text-[#475569] line-through block">
                  {formatPrice(product.originalPrice, product.currency)}
                </span>
              )}
              <div className="flex items-baseline gap-1.5 flex-wrap">
                <span
                  className="text-3xl font-extrabold"
                  style={{ color: product.price === 0 ? '#059669' : product.color }}
                >
                  {product.price === 0 ? 'Sin coste' : formatPrice(product.price, product.currency)}
                </span>
                <span className="text-sm text-[#475569]">{getBillingLabel(product)}</span>
              </div>
              {product.price === 0 && (
                <p className="text-xs text-[#475569] mt-0.5">30% del ahorro si ganamos</p>
              )}
            </div>

            <div className="flex gap-2">
              <Link href={`/tienda/${product.slug}`} className="flex-1">
                <button
                  className={cn(
                    'w-full h-10 rounded-xl text-sm font-medium transition-all duration-200',
                    'bg-transparent border border-white/15 text-[#94A3B8]',
                    'hover:border-[rgba(212,175,55,0.4)] hover:text-[#F5D060]',
                  )}
                >
                  Ver detalles
                </button>
              </Link>
              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className={cn(
                  'flex-1 h-10 rounded-xl text-sm font-semibold text-white transition-all duration-200',
                  'flex items-center justify-center gap-1.5',
                  inCart
                    ? 'bg-[rgba(5,150,105,0.2)] border border-[rgba(5,150,105,0.4)] text-[#D1FAE5]'
                    : product.popular
                    ? 'bg-gradient-to-br from-[#B8860B] to-[#D4AF37] text-[#0A1628]'
                    : 'bg-gradient-to-br from-[#1B3A6B] to-[#2563EB] hover:from-[#2563EB] hover:to-[#3B82F6]',
                )}
              >
                {inCart ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    En carrito
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-3.5 w-3.5" />
                    Contratar
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function TiendaClient() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all')

  const filteredProducts =
    activeFilter === 'all' ? PRODUCTS : getProductsByCategory(activeFilter)

  return (
    <div className="min-h-screen bg-[#040B17] text-[#F8FAFC]">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-24 pb-20"
        style={{ background: 'linear-gradient(135deg, #040B17 0%, #0A1628 50%, #0F1E3A 100%)' }}
      >
        {/* Decorative glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 70% 50%, rgba(37,99,235,0.12) 0%, transparent 60%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.p
              variants={fadeInUp}
              className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-4"
            >
              Justicia Legalia Premium
            </motion.p>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: 'var(--font-playfair, serif)' }}
            >
              Tu defensa legal.{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #D4AF37 0%, #F5D060 100%)',
                }}
              >
                Activa en minutos.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-[#94A3B8] max-w-2xl mx-auto leading-relaxed mb-10"
            >
              Abogados colegiados + IA avanzada + precios transparentes. Desde la multa más pequeña
              hasta el juicio más importante. Sin complicaciones, sin sorpresas.
            </motion.p>

            {/* Trust bar */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#475569]"
            >
              {[
                { icon: <ShieldCheck className="h-4 w-4 text-[#059669]" />, text: 'Garantía 30 días' },
                { icon: <Clock className="h-4 w-4 text-[#2563EB]" />, text: 'Respuesta < 2h' },
                { icon: <Star className="h-4 w-4 text-[#D4AF37]" />, text: '94,3% satisfacción' },
                { icon: <Award className="h-4 w-4 text-[#D4AF37]" />, text: '12.847 clientes' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Gold divider ─────────────────────────────────────────────────────── */}
      <div
        className="h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #D4AF37 50%, transparent 100%)',
        }}
      />

      {/* ── Filters ──────────────────────────────────────────────────────────── */}
      <section className="py-12 bg-[#0A1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {(Object.keys(FILTER_LABELS) as FilterCategory[]).map((cat) => {
              const count =
                cat === 'all' ? PRODUCTS.length : getProductsByCategory(cat).length
              return (
                <motion.button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className={cn(
                    'px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2',
                    activeFilter === cat
                      ? 'bg-gradient-to-br from-[#1B3A6B] to-[#2563EB] text-white border border-[rgba(37,99,235,0.5)] shadow-[0_0_20px_rgba(37,99,235,0.25)]'
                      : 'bg-[rgba(15,34,64,0.6)] text-[#94A3B8] border border-white/10 hover:border-white/20 hover:text-white',
                  )}
                >
                  {FILTER_LABELS[cat]}
                  <span
                    className={cn(
                      'inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold',
                      activeFilter === cat
                        ? 'bg-white/20 text-white'
                        : 'bg-white/10 text-[#475569]',
                    )}
                  >
                    {count}
                  </span>
                </motion.button>
              )
            })}
          </div>

          <p className="text-center text-sm text-[#475569] mt-4">
            {FILTER_DESCRIPTIONS[activeFilter]}
          </p>
        </div>
      </section>

      {/* ── Products grid ────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#040B17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
            >
              {filteredProducts.map((product, i) => (
                <StoreProductCard key={product.id} product={product} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProducts.length === 0 && (
            <div className="text-center py-24">
              <p className="text-[#475569] text-lg">No hay productos en esta categoría.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0A1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p variants={fadeInUp} className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-3">
              Proceso
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-white">
              Empezar es muy fácil
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[#94A3B8] mt-4 max-w-xl mx-auto">
              Tiempo medio desde la contratación hasta el primer contacto con tu abogado: 47 minutos.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Elige tu servicio',
                description:
                  'Selecciona el producto que mejor se adapta a tu situación. Si tienes dudas, el chat en vivo te ayuda antes de pagar.',
                icon: <Zap className="w-6 h-6" />,
              },
              {
                step: '2',
                title: 'Completa en 2 minutos',
                description:
                  'Formulario minimalista. Sin registro obligatorio. Pago seguro con Stripe — tarjeta, Bizum o transferencia.',
                icon: <Check className="w-6 h-6" />,
              },
              {
                step: '3',
                title: 'Tu abogado está en marcha',
                description:
                  'En menos de 47 minutos recibes el primer mensaje personalizado de tu abogado asignado. La cobertura es inmediata.',
                icon: <ShieldCheck className="w-6 h-6" />,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative text-center"
              >
                {i < 2 && (
                  <div className="hidden lg:block absolute top-8 right-0 translate-x-1/2 z-10">
                    <ArrowRight className="w-5 h-5 text-[#D4AF37]/40" />
                  </div>
                )}
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mx-auto mb-5"
                  style={{
                    background: 'linear-gradient(135deg, rgba(37,99,235,0.2), rgba(37,99,235,0.08))',
                    border: '1px solid rgba(37,99,235,0.3)',
                    color: '#2563EB',
                  }}
                >
                  {item.icon}
                </div>
                <div
                  className="inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-black text-[#D4AF37] mb-3"
                  style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.3)' }}
                >
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust banner ─────────────────────────────────────────────────────── */}
      <section
        className="py-20"
        style={{
          background: 'linear-gradient(135deg, #0A1628 0%, #0F2240 50%, #0A1628 100%)',
          borderTop: '1px solid rgba(212,175,55,0.1)',
          borderBottom: '1px solid rgba(212,175,55,0.1)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              {
                value: '12.847',
                label: 'Familias y empresas protegidas',
                icon: <ShieldCheck className="h-6 w-6 text-[#059669]" />,
              },
              {
                value: '94,3%',
                label: 'Valoración positiva verificada',
                icon: <Star className="h-6 w-6 text-[#D4AF37]" />,
              },
              {
                value: '67%',
                label: 'Recursos de tráfico ganados',
                icon: <TrendingUp className="h-6 w-6 text-[#2563EB]" />,
              },
              {
                value: '1.240.000€',
                label: 'Recuperados para clientes',
                icon: <Award className="h-6 w-6 text-[#D4AF37]" />,
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col items-center gap-2"
              >
                {stat.icon}
                <p className="text-3xl font-extrabold text-white">{stat.value}</p>
                <p className="text-sm text-[#475569]">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Guarantees row */}
          <div className="mt-16 grid lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Garantía de satisfacción 30 días',
                text: 'Si en los primeros 30 días no estás satisfecho por cualquier motivo, reembolso completo. Sin formularios. Sin discusión. Transferencia en 48 horas.',
              },
              {
                title: 'Garantía de respuesta',
                text: 'Tu abogado responde en menos de 2 horas en horario laboral (9:00–19:00, L–V). Si incumplimos, ese día de servicio es gratuito.',
              },
              {
                title: 'Garantía de transparencia',
                text: 'El precio que ves en nuestra web es el precio final. Jamás añadiremos costes adicionales sin tu aprobación explícita previa.',
              },
            ].map((g, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl p-6"
                style={{
                  background: 'rgba(5, 150, 105, 0.06)',
                  border: '1px solid rgba(5, 150, 105, 0.2)',
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[rgba(5,150,105,0.12)] shrink-0">
                    <ShieldCheck className="h-5 w-5 text-[#059669]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">{g.title}</h3>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">{g.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#040B17]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl lg:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-playfair, serif)' }}
            >
              La ley es complicada.{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg, #D4AF37, #F5D060)' }}
              >
                Nosotros la hacemos simple.
              </span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[#94A3B8] text-lg mb-10">
              Empieza ahora. Pregunta después. Tu primera cobertura activa en menos de una hora.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#productos">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    'inline-flex items-center justify-center gap-2.5',
                    'h-14 px-10 rounded-xl font-semibold text-lg text-white',
                    'bg-gradient-to-br from-[#1B3A6B] to-[#2563EB]',
                    'hover:from-[#2563EB] hover:to-[#3B82F6]',
                    'border border-[rgba(212,175,55,0.18)]',
                    'hover:shadow-[0_0_30px_rgba(37,99,235,0.4),0_0_80px_rgba(37,99,235,0.15)]',
                    'transition-all duration-200',
                  )}
                >
                  Explorar servicios
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </Link>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="mt-5 flex items-center justify-center gap-2 text-sm text-[#475569]"
            >
              <ShieldCheck className="h-4 w-4 text-[#059669]" />
              <span>30 días de garantía total. Sin preguntas.</span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default TiendaClient
