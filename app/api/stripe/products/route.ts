import { NextResponse } from 'next/server'

export interface LegalProduct {
  id: string
  name: string
  description: string
  longDescription: string
  priceId: string
  price: number
  currency: string
  mode: 'payment' | 'subscription'
  interval?: 'month' | 'year'
  badge?: string
  popular?: boolean
  features: string[]
  category: 'subscription' | 'one-time' | 'success-fee'
}

export const LEGAL_PRODUCTS: LegalProduct[] = [
  {
    id: 'escudo-total',
    name: 'Escudo Total',
    description: 'Protección legal ilimitada mensual. Recurre todas las multas y reclamaciones que necesites.',
    longDescription:
      'Suscripción mensual con acceso ilimitado a la plataforma. Análisis IA, generación de recursos, seguimiento de casos y soporte prioritario incluidos.',
    priceId: 'price_escudoTotal_monthly', // Reemplazar con el ID real de Stripe
    price: 49,
    currency: 'eur',
    mode: 'subscription',
    interval: 'month',
    badge: 'MÁS POPULAR',
    popular: true,
    features: [
      'Análisis IA ilimitados',
      'Generación de recursos legales',
      'Presentación automática en sede electrónica',
      'Seguimiento en tiempo real',
      'Agente negociador IA',
      'Soporte prioritario 24h',
      'Sin comisión sobre recuperados',
      'Historial completo de casos',
    ],
    category: 'subscription',
  },
  {
    id: 'analisis-expres',
    name: 'Análisis Exprés',
    description: 'Diagnóstico legal inmediato de tu caso con probabilidad de éxito y estrategia recomendada.',
    longDescription:
      'Análisis completo del caso por IA con informe detallado. Probabilidad de éxito, fundamentos legales aplicables y hoja de ruta recomendada. Entrega en menos de 2 horas.',
    priceId: 'price_analisisExpres_once', // Reemplazar con el ID real de Stripe
    price: 29,
    currency: 'eur',
    mode: 'payment',
    features: [
      'Análisis IA del caso en detalle',
      'Probabilidad de éxito estimada',
      'Fundamentos legales aplicables',
      'Estrategia jurídica recomendada',
      'Informe PDF descargable',
      'Entrega en menos de 2 horas',
    ],
    category: 'one-time',
  },
  {
    id: 'recurso-garantizado',
    name: 'Recurso Garantizado',
    description: 'Sin pago inicial. Solo pagamos el 15% si ganamos tu caso. Éxito compartido.',
    longDescription:
      'El modelo No-Win No-Fee definitivo. Nuestros abogados y la IA trabajan tu caso sin coste inicial. Solo cobramos el 15% del importe recuperado si ganamos. Si no ganamos, tú no pagas nada.',
    priceId: 'price_recursoGarantizado_nwnf', // Reemplazar con el ID real de Stripe
    price: 0,
    currency: 'eur',
    mode: 'payment',
    badge: 'SIN RIESGO',
    features: [
      'Sin pago inicial',
      'Abogado revisor incluido',
      'Análisis completo del caso',
      'Recurso redactado por IA + abogado',
      'Presentación en sede electrónica',
      'Seguimiento completo del proceso',
      'Solo 15% si recuperas dinero',
      'Si no ganamos, no pagas nada',
    ],
    category: 'success-fee',
  },
  {
    id: 'pack-empresarial',
    name: 'Pack Empresarial',
    description: 'Solución legal completa para despachos y empresas. API, white-label y volumen ilimitado.',
    longDescription:
      'La suite profesional para despachos de abogados, gestorías y empresas con alto volumen de casos. Incluye API completa, dashboard de gestión, facturación personalizada y SLA garantizado.',
    priceId: 'price_packEmpresarial_monthly', // Reemplazar con el ID real de Stripe
    price: 199,
    currency: 'eur',
    mode: 'subscription',
    interval: 'month',
    features: [
      'API completa + white-label',
      'Volumen ilimitado de casos',
      'Dashboard para el despacho',
      'Formación del equipo incluida',
      'SLA garantizado (99.9% uptime)',
      'Abogado dedicado',
      'Facturación personalizada',
      'Integraciones CRM/ERP',
      'Soporte telefónico dedicado',
      'Informes y analytics avanzados',
    ],
    category: 'subscription',
  },
  {
    id: 'contrato-blindado',
    name: 'Contrato Blindado',
    description: 'Redacción y revisión de contratos con blindaje jurídico completo. Sin sorpresas legales.',
    longDescription:
      'Redacción profesional o revisión exhaustiva de cualquier contrato (arrendamiento, servicios, laboral, etc.) con identificación de cláusulas abusivas y propuestas de mejora garantizadas.',
    priceId: 'price_contratoBlindado_once', // Reemplazar con el ID real de Stripe
    price: 79,
    currency: 'eur',
    mode: 'payment',
    features: [
      'Redacción o revisión completa',
      'Detección de cláusulas abusivas',
      'Propuestas de modificación',
      'Informe de riesgos legales',
      'Asesoría de negociación incluida',
      'Entrega en 24-48 horas',
      'Revisión por abogado colegiado',
      'Garantía de calidad jurídica',
    ],
    category: 'one-time',
  },
  {
    id: 'defensa-premium',
    name: 'Defensa Premium',
    description: 'Representación legal completa en procedimientos judiciales y administrativos complejos.',
    longDescription:
      'Servicio de representación legal premium para casos complejos que requieren intervención judicial o administrativa de alto nivel. Precio base desde 499€ según complejidad del caso.',
    priceId: 'price_defensaPremium_once', // Reemplazar con el ID real de Stripe
    price: 499,
    currency: 'eur',
    mode: 'payment',
    badge: 'PREMIUM',
    features: [
      'Abogado especialista dedicado',
      'Representación judicial completa',
      'Estrategia procesal personalizada',
      'Gestión de toda la documentación',
      'Comunicación directa con el abogado',
      'Actualizaciones semanales del caso',
      'Defensa en vía administrativa y judicial',
      'Precio desde €499 según complejidad',
    ],
    category: 'one-time',
  },
]

export async function GET() {
  try {
    // Transformar para la respuesta pública (omitir datos sensibles si los hubiera)
    const products = LEGAL_PRODUCTS.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      longDescription: product.longDescription,
      priceId: product.priceId,
      price: product.price,
      currency: product.currency,
      mode: product.mode,
      interval: product.interval ?? null,
      badge: product.badge ?? null,
      popular: product.popular ?? false,
      features: product.features,
      category: product.category,
      // Precio formateado para mostrar en UI
      priceFormatted:
        product.price === 0
          ? 'Gratis'
          : `€${product.price}${product.mode === 'subscription' ? `/${product.interval === 'month' ? 'mes' : 'año'}` : ''}`,
    }))

    return NextResponse.json(
      {
        products,
        total: products.length,
        updatedAt: new Date().toISOString(),
      },
      {
        status: 200,
        headers: {
          // Cache de 5 minutos en CDN, revalidable en background
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    )
  } catch (error: unknown) {
    console.error('[stripe/products] Error al obtener el catálogo:', error)
    return NextResponse.json(
      { error: 'Error interno al obtener el catálogo de productos' },
      { status: 500 }
    )
  }
}
