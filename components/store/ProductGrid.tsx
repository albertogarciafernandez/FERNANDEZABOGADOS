'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ProductCard } from './ProductCard'
import { PRODUCTS, getProductsByCategory } from '@/lib/products'
import type { Product } from '@/types/product'

type FilterCategory = 'all' | Product['category']

const FILTER_LABELS: Record<FilterCategory, string> = {
  all: 'Todos los servicios',
  subscription: 'Suscripción mensual',
  'one-time': 'Pago único',
  'success-fee': 'A éxito',
}

interface ProductGridProps {
  showFilter?: boolean
  initialCategory?: FilterCategory
  limit?: number
}

export function ProductGrid({
  showFilter = true,
  initialCategory = 'all',
  limit,
}: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>(initialCategory)

  const products =
    activeCategory === 'all' ? PRODUCTS : getProductsByCategory(activeCategory)
  const displayed = limit ? products.slice(0, limit) : products

  return (
    <div>
      {showFilter && (
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {(Object.keys(FILTER_LABELS) as FilterCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
                }
              `}
            >
              {FILTER_LABELS[cat]}
              <span className="ml-2 text-xs opacity-60">
                (
                {cat === 'all'
                  ? PRODUCTS.length
                  : getProductsByCategory(cat).length}
                )
              </span>
            </button>
          ))}
        </div>
      )}

      <motion.div
        key={activeCategory}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {displayed.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            variant={product.popular ? 'featured' : 'default'}
            index={i}
          />
        ))}
      </motion.div>

      {limit && products.length > limit && (
        <div className="mt-10 text-center">
          <p className="text-white/40 text-sm">
            Mostrando {limit} de {products.length} servicios
          </p>
        </div>
      )}
    </div>
  )
}

export default ProductGrid
