'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProductCard } from './ProductCard'
import { PRODUCTS, getProductsByCategory } from '@/lib/products'
import type { Product } from '@/types/product'

// ─────────────────────────────────────────────────────────────────────────────
// ProductGrid — Justicia Legalia Premium (Design System v1.0)
//
// Grid responsivo: 3 columnas desktop, 2 tablet, 1 mobile.
// El producto popular aparece destacado (ligeramente más grande en desktop).
// Stagger animation de entrada: cada card con delay de 80ms.
// Filtro por categoría con animación de filtrado suave.
// Props: products?, title?, subtitle?, showFilter?, initialCategory?, limit?
// ─────────────────────────────────────────────────────────────────────────────

type FilterCategory = 'all' | Product['category']

const FILTER_LABELS: Record<FilterCategory, string> = {
  all: 'Todos los servicios',
  subscription: 'Suscripción',
  'one-time': 'Pago único',
  'success-fee': 'A éxito',
}

// ── Framer Motion variants ────────────────────────────────────────────────────

/** Container that staggers its children */
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

/** Individual card entrance — fadeInUp as per brief */
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
}

// ── Props ─────────────────────────────────────────────────────────────────────
interface ProductGridProps {
  /** Override the product list (defaults to all PRODUCTS) */
  products?: Product[]
  /** Section heading displayed above the grid */
  title?: string
  /** Section subheading displayed below the title */
  subtitle?: string
  /** Show the category filter bar (default: true) */
  showFilter?: boolean
  /** Which category tab is active on mount (default: 'all') */
  initialCategory?: FilterCategory
  /** Cap the number of displayed products */
  limit?: number
}

// ── Component ─────────────────────────────────────────────────────────────────
export function ProductGrid({
  products: productsProp,
  title,
  subtitle,
  showFilter = true,
  initialCategory = 'all',
  limit,
}: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>(initialCategory)

  // Determine the base list — prop override or the full catalogue
  const baseProducts = productsProp ?? PRODUCTS

  // Filter by active category
  const filtered =
    activeCategory === 'all'
      ? baseProducts
      : baseProducts.filter((p) => p.category === activeCategory)

  // Apply optional limit
  const displayed = limit ? filtered.slice(0, limit) : filtered

  // Count per category for the filter labels
  const countFor = (cat: FilterCategory) =>
    cat === 'all'
      ? baseProducts.length
      : baseProducts.filter((p) => p.category === cat).length

  return (
    <div className="w-full">
      {/* ── Optional section header ─────────────────────────────────────── */}
      {(title || subtitle) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-10"
        >
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-3 font-inter">
              {title}
            </h2>
          )}
          {/* Gold accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="w-24 h-px mx-auto mb-4 origin-center"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, #D4AF37 50%, transparent 100%)',
            }}
            aria-hidden="true"
          />
          {subtitle && (
            <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>
      )}

      {/* ── Category filter bar ─────────────────────────────────────────── */}
      {showFilter && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {(Object.keys(FILTER_LABELS) as FilterCategory[]).map((cat) => {
            const isActive = activeCategory === cat
            const count = countFor(cat)
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={[
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]',
                  isActive
                    ? 'bg-gradient-to-br from-[#1B3A6B] to-[#2563EB] text-white shadow-[0_0_20px_rgba(37,99,235,0.35)] border border-[rgba(212,175,55,0.2)]'
                    : 'bg-[rgba(10,22,40,0.5)] text-[#94A3B8] border border-[rgba(212,175,55,0.1)] hover:bg-[rgba(10,22,40,0.8)] hover:border-[rgba(212,175,55,0.25)] hover:text-[#F8FAFC]',
                ].join(' ')}
                aria-pressed={isActive}
              >
                {FILTER_LABELS[cat]}
                <span
                  className={[
                    'ml-2 text-xs',
                    isActive ? 'text-white/70' : 'text-[#475569]',
                  ].join(' ')}
                >
                  ({count})
                </span>
              </button>
            )
          })}
        </motion.div>
      )}

      {/* ── Product grid ────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          // 3 cols desktop · 2 cols tablet · 1 col mobile
          // items-stretch ensures equal-height cards in each row
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
        >
          {displayed.map((product, i) => (
            <motion.div
              key={product.id}
              variants={fadeInUp}
              // Popular card gets a subtle z-index lift in the DOM
              className={product.popular ? 'lg:z-10' : ''}
            >
              <ProductCard
                product={product}
                variant={product.popular ? 'featured' : 'default'}
                index={i}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* ── "Show more" notice when limit is active ─────────────────────── */}
      {limit != null && filtered.length > limit && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center text-sm text-[#475569]"
        >
          Mostrando {limit} de {filtered.length} servicios
        </motion.p>
      )}
    </div>
  )
}

export default ProductGrid
