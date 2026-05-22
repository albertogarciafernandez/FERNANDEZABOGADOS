/**
 * lib/seo.ts — Utilidades centralizadas de metadata para Next.js 15.
 *
 * Exporta:
 *   - defaultMetadata       → Metadata base del sitio
 *   - generatePageMetadata  → Metadata genérica para cualquier página
 *   - generateProductMetadata → Metadata optimizada para páginas de producto
 */

import type { Metadata } from "next";
import type { ProductForJsonLd } from "@/components/seo/ProductJsonLd";

// ─────────────────────────────────────────────────────────────────────────────
// Constantes del sitio
// ─────────────────────────────────────────────────────────────────────────────

const SITE_NAME = "Justicia Legalia";
const BASE_URL =
  process.env.NEXT_PUBLIC_URL || "https://justicialegalia.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/og-default.jpg`;

// ─────────────────────────────────────────────────────────────────────────────
// defaultMetadata — Metadata base del sitio (hereda el layout raíz)
// ─────────────────────────────────────────────────────────────────────────────

export const defaultMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME} | Abogado Online, Recurrir Multas y Reclamaciones con IA`,
  },

  description:
    "Plataforma legal con IA para recurrir multas de tráfico, reclamaciones de consumidores y protección legal online. Abogado online desde 9,90€. 94% de éxito. Sin pago si no ganamos.",

  keywords: [
    "abogado online",
    "recurrir multa",
    "recurrir multa tráfico",
    "reclamación online",
    "protección legal",
    "recurso DGT",
    "abogado IA",
    "reclamación consumidor",
    "contrato revisión abogado",
    "defensa legal online",
    "multa tráfico recurso",
    "servicio legal online España",
    "abogado inteligencia artificial",
    "legal tech España",
  ],

  authors: [{ name: SITE_NAME, url: BASE_URL }],

  creator: SITE_NAME,
  publisher: SITE_NAME,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "es_ES",
    url: BASE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Tu Escudo Legal con IA`,
    description:
      "Recurre multas y reclamaciones con Inteligencia Artificial. Abogados colegiados. 94% de éxito. Sin pago si no ganamos.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Tu escudo legal. Siempre encendido.`,
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@justicialegalia",
    creator: "@justicialegalia",
    title: `${SITE_NAME} | Abogado Online con IA`,
    description:
      "Recurre multas, revisa contratos y recibe asesoría legal online. Resultados en 60 segundos.",
    images: [DEFAULT_OG_IMAGE],
  },

  alternates: {
    canonical: BASE_URL,
    languages: {
      "es-ES": BASE_URL,
    },
  },

  verification: {
    // Reemplazar con el token real de Google Search Console
    google: "GOOGLE_SEARCH_CONSOLE_VERIFICATION_TOKEN",
  },

  category: "legal services",
};

// ─────────────────────────────────────────────────────────────────────────────
// generatePageMetadata — Metadata genérica para cualquier página
// ─────────────────────────────────────────────────────────────────────────────

interface PageMetadataParams {
  title: string;
  description: string;
  path: string; // e.g. "/reclamar" o "/tienda"
  image?: string;
  noIndex?: boolean;
}

export function generatePageMetadata({
  title,
  description,
  path,
  image,
  noIndex = false,
}: PageMetadataParams): Metadata {
  const canonicalUrl = `${BASE_URL}${path}`;
  const ogImage = image || DEFAULT_OG_IMAGE;

  return {
    title,
    description,

    alternates: {
      canonical: canonicalUrl,
    },

    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },

    openGraph: {
      type: "website",
      locale: "es_ES",
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/jpeg",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: "@justicialegalia",
      creator: "@justicialegalia",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [ogImage],
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// generateProductMetadata — Metadata optimizada para páginas de producto
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Extiende ProductForJsonLd con los campos adicionales necesarios para
 * generar metadata completa de una página de producto.
 */
export interface Product extends ProductForJsonLd {
  /** Descripción larga para SEO (puede diferir del description corto) */
  longDescription?: string;
  /** Keywords específicas del producto */
  keywords?: string[];
}

export function generateProductMetadata(product: Product): Metadata {
  const {
    name,
    description,
    longDescription,
    slug,
    price,
    priceCurrency = "EUR",
    ratingValue = 4.8,
    reviewCount = 342,
    image,
    keywords = [],
  } = product;

  const canonicalUrl = `${BASE_URL}/tienda/${slug}`;
  const ogImage = image || `${BASE_URL}/images/products/${slug}-og.jpg`;

  // Construir el título y descripción SEO del producto
  const seoTitle = name.replace("™", "");
  const metaDescription =
    longDescription ||
    `${description} — ${
      price !== null
        ? `Desde ${price.toFixed(2).replace(".", ",")}${priceCurrency === "EUR" ? "€" : priceCurrency}`
        : "Evaluación gratuita"
    }. ${ratingValue}/5 estrellas (${reviewCount} valoraciones). Justicia Legalia.`;

  const priceDisplay =
    price !== null
      ? `${price.toFixed(2).replace(".", ",")}€`
      : "Desde 1.200€";

  return {
    title: seoTitle,
    description: metaDescription.slice(0, 160),

    keywords: [
      name.replace("™", ""),
      "abogado online",
      "servicio legal",
      "España",
      ...keywords,
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    openGraph: {
      type: "website",
      locale: "es_ES",
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: `${seoTitle} — ${priceDisplay} | ${SITE_NAME}`,
      description: metaDescription.slice(0, 200),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${name} — ${SITE_NAME}`,
          type: "image/jpeg",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: "@justicialegalia",
      creator: "@justicialegalia",
      title: `${seoTitle} — ${priceDisplay} | ${SITE_NAME}`,
      description: description.slice(0, 200),
      images: [ogImage],
    },

    // Structured data hints for Next.js
    other: {
      "product:price:amount": price !== null ? String(price) : "1200",
      "product:price:currency": priceCurrency,
      "product:availability": "in stock",
      "og:price:amount": price !== null ? String(price) : "1200",
      "og:price:currency": priceCurrency,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Catálogo de productos — referencia rápida para las páginas de la tienda
// ─────────────────────────────────────────────────────────────────────────────

export const PRODUCT_CATALOG: Product[] = [
  {
    name: "Escudo Total™",
    slug: "escudo-total",
    description:
      "Protección legal 360° para tu familia durante todo el año. Consultas ilimitadas, revisión de contratos y línea de emergencia 24/7.",
    longDescription:
      "Suscripción anual de protección legal completa para particulares y familias. Abogado colegiado con respuesta garantizada en menos de 2 horas, revisión de hasta 10 documentos al mes y cobertura en Derecho Civil, Laboral, Administrativo y de Consumo.",
    price: 29,
    priceCurrency: "EUR",
    availability: "InStock",
    ratingValue: 4.9,
    reviewCount: 1247,
    sku: "JL-001",
    keywords: [
      "protección legal familiar",
      "abogado suscripción",
      "consultas ilimitadas abogado",
    ],
  },
  {
    name: "Análisis Exprés™",
    slug: "analisis-expres",
    description:
      "Análisis IA de cualquier contrato, multa o documento legal en 60 segundos. Riesgos, cláusulas abusivas y recomendaciones de acción.",
    longDescription:
      "Sube tu contrato, multa o carta notarial y recibe en 60 segundos un análisis completo: cláusulas abusivas, riesgos legales, recomendaciones de acción y resumen ejecutivo. Entrenado en Derecho Español.",
    price: 9.9,
    priceCurrency: "EUR",
    availability: "InStock",
    ratingValue: 4.8,
    reviewCount: 3421,
    sku: "JL-002",
    keywords: [
      "análisis contrato IA",
      "revisar contrato online",
      "análisis multa tráfico",
      "cláusulas abusivas",
    ],
  },
  {
    name: "Recurso Garantizado™",
    slug: "recurso-garantizado",
    description:
      "Recurso de multas de tráfico sin pago inicial. Solo pagas si ganamos. Tasa de éxito del 67% ante DGT y Ayuntamientos.",
    longDescription:
      "Recurrimos tu multa de tráfico sin que pagues ni un euro hasta que el recurso sea resuelto. Abogados especializados en derecho de tráfico con una tasa de éxito del 67%. Si ganamos, pagas el 30% del ahorro. Si perdemos, no nos debes nada.",
    price: 0,
    priceCurrency: "EUR",
    availability: "InStock",
    ratingValue: 4.7,
    reviewCount: 2156,
    sku: "JL-003",
    keywords: [
      "recurrir multa tráfico",
      "recurso DGT",
      "recurso multa gratis",
      "sin pago si no ganas",
    ],
  },
  {
    name: "Pack Empresarial™",
    slug: "pack-empresarial",
    description:
      "Departamento jurídico externo para PYMEs de hasta 50 empleados. Contratos, RGPD, despidos y reclamaciones.",
    longDescription:
      "El departamento jurídico que tu empresa necesita a precio de SaaS. Abogado de empresa asignado, consultas ilimitadas, revisión y redacción de contratos comerciales y laborales, gestión de reclamaciones y auditoría RGPD trimestral.",
    price: 149,
    priceCurrency: "EUR",
    availability: "InStock",
    ratingValue: 4.9,
    reviewCount: 418,
    sku: "JL-004",
    keywords: [
      "abogado empresa PYME",
      "asesoría jurídica empresa",
      "departamento legal externo",
      "RGPD empresa",
    ],
  },
  {
    name: "Contrato Blindado™",
    slug: "contrato-blindado",
    description:
      "Revisión de contrato por IA más abogado especialista. Informe de riesgos, cláusulas reescritas y sesión de 30 minutos incluida.",
    longDescription:
      "Tu contrato revisado en dos capas: análisis IA en 60 segundos y revisión humana por abogado especialista en la materia del contrato. Recibes un informe de riesgos con semáforo, cláusulas reescritas y una sesión de 30 minutos para resolver dudas.",
    price: 149,
    priceCurrency: "EUR",
    availability: "InStock",
    ratingValue: 4.8,
    reviewCount: 876,
    sku: "JL-005",
    keywords: [
      "revisar contrato abogado",
      "revisión contrato alquiler",
      "contrato laboral revisión",
      "cláusulas abusivas contrato",
    ],
  },
  {
    name: "Defensa Premium™",
    slug: "defensa-premium",
    description:
      "Abogado senior dedicado exclusivamente a tu caso hasta sentencia. Estrategia legal personalizada y representación completa.",
    longDescription:
      "Un abogado de élite asignado exclusivamente a tu caso con acceso directo por teléfono, disponibilidad para audiencias y estrategia legal personalizada. Representación completa desde negociación hasta sentencia, con informes quincenales de estado.",
    price: null,
    priceCurrency: "EUR",
    availability: "InStock",
    ratingValue: 5.0,
    reviewCount: 134,
    sku: "JL-006",
    keywords: [
      "abogado dedicado",
      "defensa judicial",
      "representación legal completa",
      "abogado caso complejo",
    ],
  },
];
