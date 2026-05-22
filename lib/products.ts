import type { Product } from '@/types/product'

export const PRODUCTS: Product[] = [
  {
    id: 'escudo-total',
    slug: 'escudo-total',
    name: 'Escudo Total™',
    trademark: 'Escudo Total™',
    tagline: 'Protección legal 360° sin límites',
    description:
      'Asesoría jurídica ilimitada para particulares y autónomos. Acceso directo a abogados especializados en todas las áreas del derecho. Respuesta garantizada en menos de 2 horas.',
    category: 'subscription',
    price: 49,
    originalPrice: 89,
    currency: 'EUR',
    billingPeriod: 'month',
    badge: { text: 'MÁS POPULAR', color: 'gold' },
    popular: true,
    successRate: 94,
    deliveryTime: '< 2h',
    icon: '🛡️',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-orange-600',
    features: [
      { text: 'Consultas ilimitadas con abogado', included: true, highlight: true },
      { text: 'Respuesta en menos de 2 horas', included: true, highlight: true },
      { text: 'Revisión de contratos (hasta 5/mes)', included: true },
      { text: 'Acceso a todos los especialistas', included: true },
      { text: 'Redacción de escritos básicos', included: true },
      { text: 'Portal del cliente 24/7', included: true },
      { text: 'Representación en juicio', included: false },
      { text: 'Recursos administrativos', included: false },
    ],
    guarantee: 'Si no resolvemos tu consulta en 2h, te devolvemos el mes.',
    targetAudience: 'Particulares y autónomos con necesidades legales recurrentes',
    stripeProductId: process.env.STRIPE_PRODUCT_ESCUDO_TOTAL,
    stripePriceId: process.env.STRIPE_PRICE_ESCUDO_TOTAL,
  },
  {
    id: 'analisis-expres',
    slug: 'analisis-expres',
    name: 'Análisis Exprés™',
    trademark: 'Análisis Exprés™',
    tagline: 'Diagnóstico legal en 24 horas',
    description:
      'Análisis jurídico completo de tu situación en 24 horas. Informe detallado con opciones legales, probabilidades de éxito y hoja de ruta personalizada.',
    category: 'one-time',
    price: 149,
    originalPrice: 249,
    currency: 'EUR',
    billingPeriod: 'one-time',
    badge: { text: 'URGENTE', color: 'red' },
    urgent: true,
    successRate: 97,
    deliveryTime: '24h',
    icon: '⚡',
    color: '#ef4444',
    gradient: 'from-red-500 to-rose-600',
    features: [
      { text: 'Análisis completo de tu caso', included: true, highlight: true },
      { text: 'Informe PDF detallado', included: true, highlight: true },
      { text: 'Probabilidad de éxito estimada', included: true },
      { text: 'Hoja de ruta legal personalizada', included: true },
      { text: 'Consulta de seguimiento (30min)', included: true },
      { text: 'Revisión de documentos adjuntos', included: true },
      { text: 'Representación incluida', included: false },
      { text: 'Asesoría mensual incluida', included: false },
    ],
    guarantee: 'Informe entregado en 24h o reembolso completo.',
    targetAudience: 'Personas con una situación legal concreta que necesitan claridad',
    stripeProductId: process.env.STRIPE_PRODUCT_ANALISIS_EXPRES,
    stripePriceId: process.env.STRIPE_PRICE_ANALISIS_EXPRES,
  },
  {
    id: 'recurso-garantizado',
    slug: 'recurso-garantizado',
    name: 'Recurso Garantizado™',
    trademark: 'Recurso Garantizado™',
    tagline: 'Pagamos si no ganamos',
    description:
      'Interponemos tu recurso administrativo o judicial con honorarios a éxito. Sin victoria, sin cobro. Máxima motivación para ganar tu caso.',
    category: 'success-fee',
    price: 0,
    originalPrice: undefined,
    currency: 'EUR',
    billingPeriod: 'one-time',
    badge: { text: 'SIN RIESGO', color: 'green' },
    successRate: 89,
    deliveryTime: '48-72h',
    icon: '⚖️',
    color: '#22c55e',
    gradient: 'from-green-500 to-emerald-600',
    features: [
      { text: 'Sin pago hasta obtener resultado', included: true, highlight: true },
      { text: 'Abogado especialista en recursos', included: true, highlight: true },
      { text: 'Redacción completa del recurso', included: true },
      { text: 'Presentación ante organismos', included: true },
      { text: 'Seguimiento del expediente', included: true },
      { text: 'Notificación de resolución', included: true },
      { text: 'Múltiples instancias incluidas', included: false },
      { text: 'Representación en vistas', included: false },
    ],
    guarantee: '0€ si no conseguimos resultado favorable.',
    targetAudience: 'Personas con multas, sanciones o resoluciones administrativas desfavorables',
    stripeProductId: process.env.STRIPE_PRODUCT_RECURSO,
    stripePriceId: process.env.STRIPE_PRICE_RECURSO,
  },
  {
    id: 'pack-empresarial',
    slug: 'pack-empresarial',
    name: 'Pack Empresarial™',
    trademark: 'Pack Empresarial™',
    tagline: 'Asesoría jurídica para tu empresa',
    description:
      'Servicio completo de asesoría legal para PYMES y empresas en crecimiento. Contratos, compliance, laboral, mercantil y más. Tu departamento legal externo.',
    category: 'subscription',
    price: 199,
    originalPrice: 349,
    currency: 'EUR',
    billingPeriod: 'month',
    badge: { text: 'EMPRESAS', color: 'blue' },
    successRate: 96,
    deliveryTime: '< 4h',
    icon: '🏢',
    color: '#6366f1',
    gradient: 'from-indigo-500 to-violet-600',
    features: [
      { text: 'Consultas ilimitadas (todo el equipo)', included: true, highlight: true },
      { text: 'Contratos y acuerdos (hasta 10/mes)', included: true, highlight: true },
      { text: 'Asesoría laboral y RRHH', included: true },
      { text: 'Compliance y normativa sectorial', included: true },
      { text: 'Protección de datos (RGPD)', included: true },
      { text: 'Propiedad intelectual', included: true },
      { text: 'Representación en negociaciones', included: true },
      { text: 'Abogado de guardia 24/7', included: false },
    ],
    guarantee: 'Garantía de satisfacción los primeros 30 días, devolución completa.',
    targetAudience: 'PYMES, startups y empresas con necesidades legales recurrentes',
    stripeProductId: process.env.STRIPE_PRODUCT_EMPRESARIAL,
    stripePriceId: process.env.STRIPE_PRICE_EMPRESARIAL,
  },
  {
    id: 'contrato-blindado',
    slug: 'contrato-blindado',
    name: 'Contrato Blindado™',
    trademark: 'Contrato Blindado™',
    tagline: 'Tu contrato, a prueba de todo',
    description:
      'Redacción o revisión exhaustiva de cualquier contrato. Cláusulas de protección máxima, detección de riesgos ocultos y negociación de condiciones.',
    category: 'one-time',
    price: 299,
    originalPrice: 450,
    currency: 'EUR',
    billingPeriod: 'one-time',
    successRate: 99,
    deliveryTime: '48h',
    icon: '📋',
    color: '#0ea5e9',
    gradient: 'from-sky-500 to-cyan-600',
    features: [
      { text: 'Redacción o revisión completa', included: true, highlight: true },
      { text: 'Informe de riesgos detectados', included: true, highlight: true },
      { text: 'Cláusulas de protección añadidas', included: true },
      { text: 'Negociación de condiciones', included: true },
      { text: 'Versión bilingüe (ES/EN)', included: true },
      { text: '2 rondas de revisión incluidas', included: true },
      { text: 'Asesoría post-firma (30 días)', included: false },
      { text: 'Representación en disputas', included: false },
    ],
    guarantee: 'Si el contrato presenta problemas legales, revisión adicional gratuita.',
    targetAudience: 'Particulares y empresas que van a firmar contratos importantes',
    stripeProductId: process.env.STRIPE_PRODUCT_CONTRATO,
    stripePriceId: process.env.STRIPE_PRICE_CONTRATO,
  },
  {
    id: 'defensa-premium',
    slug: 'defensa-premium',
    name: 'Defensa Premium™',
    trademark: 'Defensa Premium™',
    tagline: 'Representación de élite en juicio',
    description:
      'Representación legal completa en procedimientos judiciales complejos. Nuestros abogados más experimentados defienden tu caso en todas las instancias.',
    category: 'one-time',
    price: 1500,
    originalPrice: 2500,
    currency: 'EUR',
    billingPeriod: 'one-time',
    badge: { text: 'ÉLITE', color: 'gold' },
    successRate: 91,
    deliveryTime: 'Inmediato',
    icon: '👑',
    color: '#f59e0b',
    gradient: 'from-yellow-400 to-amber-600',
    features: [
      { text: 'Abogado senior dedicado a tu caso', included: true, highlight: true },
      { text: 'Representación en todas las instancias', included: true, highlight: true },
      { text: 'Estrategia legal personalizada', included: true },
      { text: 'Acceso directo al abogado (WhatsApp)', included: true },
      { text: 'Peritajes y pruebas periciales', included: true },
      { text: 'Coordinación con otros especialistas', included: true },
      { text: 'Informe mensual del estado del caso', included: true },
      { text: 'Recurso en instancias superiores', included: true },
    ],
    guarantee: 'Compromiso total con tu caso. Sin resultado, honorarios reducidos al 50%.',
    targetAudience: 'Casos complejos que requieren representación legal de primer nivel',
    stripeProductId: process.env.STRIPE_PRODUCT_DEFENSA,
    stripePriceId: process.env.STRIPE_PRICE_DEFENSA,
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return PRODUCTS.filter((p) => p.category === category)
}

export function getPopularProducts(): Product[] {
  return PRODUCTS.filter((p) => p.popular)
}

export function formatPrice(price: number, currency = 'EUR'): string {
  if (price === 0) return 'A éxito'
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function getDiscount(product: Product): number | null {
  if (!product.originalPrice || product.originalPrice <= product.price) return null
  return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
}

export function getBillingLabel(product: Product): string {
  switch (product.billingPeriod) {
    case 'month':
      return '/mes'
    case 'year':
      return '/año'
    case 'one-time':
      return ' pago único'
    default:
      return ''
  }
}
