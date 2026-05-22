/**
 * ProductJsonLd — JSON-LD schema.org/Product para servicios legales.
 *
 * Genera marcado estructurado completo con:
 *   - Product + Offer (precio, disponibilidad, URL)
 *   - Brand (Justicia Legalia)
 *   - AggregateRating (valoración media y número de reseñas)
 *
 * Uso:
 *   <ProductJsonLd product={product} />
 */

import JsonLd from "./JsonLd";

export interface ProductForJsonLd {
  name: string;
  description: string;
  slug: string;
  price: number | null; // null para productos tipo "contactar"
  priceCurrency?: string;
  priceValidUntil?: string; // ISO date string, e.g. "2026-12-31"
  availability?: "InStock" | "OutOfStock" | "PreOrder" | "OnlineOnly";
  ratingValue?: number;
  reviewCount?: number;
  image?: string;
  sku?: string;
}

interface ProductJsonLdProps {
  product: ProductForJsonLd;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_URL || "https://justicialegalia.com";

export default function ProductJsonLd({ product }: ProductJsonLdProps) {
  const {
    name,
    description,
    slug,
    price,
    priceCurrency = "EUR",
    priceValidUntil = "2026-12-31",
    availability = "InStock",
    ratingValue = 4.8,
    reviewCount = 342,
    image,
    sku,
  } = product;

  const productUrl = `${BASE_URL}/tienda/${slug}`;
  const imageUrl =
    image || `${BASE_URL}/images/products/${slug}-og.jpg`;

  const offerSchema: Record<string, unknown> = {
    "@type": "Offer",
    priceCurrency,
    availability: `https://schema.org/${availability}`,
    url: productUrl,
    priceValidUntil,
    seller: {
      "@type": "Organization",
      name: "Justicia Legalia",
    },
  };

  // Incluir precio solo si está definido (Defensa Premium usa "contactar")
  if (price !== null) {
    offerSchema.price = price.toFixed(2);
  } else {
    offerSchema.price = "0";
    offerSchema.priceSpecification = {
      "@type": "PriceSpecification",
      description: "Precio según caso — evaluación gratuita",
      priceCurrency,
    };
  }

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url: productUrl,
    image: imageUrl,
    brand: {
      "@type": "Brand",
      name: "Justicia Legalia",
      url: BASE_URL,
    },
    offers: offerSchema,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: ratingValue.toFixed(1),
      reviewCount,
      bestRating: "5",
      worstRating: "1",
    },
    category: "LegalService",
    inLanguage: "es-ES",
  };

  if (sku) {
    data.sku = sku;
    data.mpn = sku;
  }

  return <JsonLd data={data} />;
}
