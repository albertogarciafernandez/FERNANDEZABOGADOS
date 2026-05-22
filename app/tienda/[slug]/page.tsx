import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PRODUCTS, getProductBySlug, formatPrice, getBillingLabel, getDiscount } from '@/lib/products'
import { ProductPageClient } from './ProductPageClient'

// ─── Static params ─────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export const revalidate = 3600

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return { title: 'Producto no encontrado' }

  const priceLabel =
    product.price === 0
      ? 'Sin coste inicial'
      : `${formatPrice(product.price, product.currency)}${getBillingLabel(product)}`

  return {
    title: `${product.trademark} | Justicia Legalia Premium`,
    description: `${product.description} ${priceLabel}. ${product.guarantee}`,
    keywords: `abogado online, ${product.name.toLowerCase()}, servicios legales, protección legal`,
    openGraph: {
      title: product.trademark,
      description: product.description,
      type: 'website',
      locale: 'es_ES',
    },
    twitter: { card: 'summary_large_image', site: '@JusticiaLegalia' },
    robots: { index: true, follow: true },
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  // Related products: up to 2 others (prefer same category, then any)
  const sameCategory = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category,
  ).slice(0, 2)
  const relatedProducts =
    sameCategory.length >= 2
      ? sameCategory
      : [
          ...sameCategory,
          ...PRODUCTS.filter(
            (p) =>
              p.id !== product.id &&
              !sameCategory.find((s) => s.id === p.id),
          ),
        ].slice(0, 2)

  const discount = getDiscount(product)

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: product.trademark,
    description: product.description,
    provider: {
      '@type': 'Organization',
      name: 'Justicia Legalia Premium',
      url: 'https://justicialegalia.com',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '8200',
    },
  }

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductPageClient
        product={product}
        relatedProducts={relatedProducts}
        discount={discount}
      />
    </>
  )
}
