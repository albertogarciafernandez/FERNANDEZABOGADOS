import type { Product, ProductCategory } from '@/types/product'

// ─────────────────────────────────────────────────────────────────────────────
// CATÁLOGO OFICIAL — Justicia Legalia Premium
// Todos los precios y datos son EXACTOS según el Master Brief v1.0
// ─────────────────────────────────────────────────────────────────────────────

export const PRODUCTS: Product[] = [
  // ── 1. Escudo Total™ ──────────────────────────────────────────────────────
  {
    id: 'escudo-total',
    slug: 'escudo-total',
    name: 'Escudo Total',
    trademark: 'Escudo Total™',
    tagline: 'Protección legal ilimitada para ti y tu familia. Siempre activa.',
    description:
      'Protección legal 360° para tu familia durante todo el año. Desde contratos de alquiler hasta disputas laborales o problemas con vecinos: un abogado real responde en menos de 2 horas, ilimitado. Tu escudo legal siempre activado, pase lo que pase.',
    category: 'subscription',
    // Precio exacto del brief: 29€/mes (facturado anualmente: 348€/año)
    price: 29,
    // Precio tachado del brief: equivalente anual despacho tradicional 599€/año → ~50€/mes
    originalPrice: 50,
    currency: 'EUR',
    billingPeriod: 'month',
    badge: { text: 'MÁS POPULAR', color: 'gold' },
    popular: true,
    urgent: false,
    successRate: 94,
    deliveryTime: 'Primer contacto en menos de 2 horas',
    icon: 'Shield',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-orange-600',
    features: [
      { text: 'Consultas ilimitadas con abogado colegiado (respuesta < 2h en horario laboral)', included: true, highlight: true },
      { text: 'Revisión de hasta 10 documentos/contratos al mes con informe escrito', included: true },
      { text: 'Acceso al Análisis Exprés™ IA incluido sin límite de uso', included: true, highlight: true },
      { text: 'Cobertura en Derecho Civil, Laboral, Administrativo y de Consumo', included: true },
      { text: 'Línea de emergencia legal 24/7 para situaciones urgentes', included: true, highlight: true },
    ],
    guarantee:
      'Si en los primeros 30 días no estás satisfecho por cualquier motivo, reembolso completo inmediato. Sin formularios, sin discusión, sin demora.',
    targetAudience:
      'Familias con hijos, propietarios de inmuebles en alquiler, trabajadores por cuenta ajena con contratos complejos, personas que han sufrido problemas legales previos y quieren prevención activa. Rango de edad: 30-55 años, clase media-alta.',
    stripeProductId: process.env.STRIPE_PRODUCT_ESCUDO_TOTAL,
    stripePriceId: process.env.STRIPE_PRICE_ESCUDO_TOTAL,
  },

  // ── 2. Análisis Exprés™ ───────────────────────────────────────────────────
  {
    id: 'analisis-expres',
    slug: 'analisis-expres',
    name: 'Análisis Exprés',
    trademark: 'Análisis Exprés™',
    tagline: 'Tu documento analizado por IA en 60 segundos. Sin esperas.',
    description:
      'Sube cualquier contrato, multa, carta notarial o documento legal y nuestra IA entrenada en Derecho Español te entrega en 60 segundos un análisis completo: riesgos, cláusulas abusivas, recomendaciones de acción y resumen ejecutivo. Sin esperas, sin citas, sin jerga legal.',
    category: 'one-time',
    // Precio exacto del brief: 9,90€/análisis
    price: 9.9,
    // Precio tachado del brief: ~~49€~~ (tarifa consulta básica despacho)
    originalPrice: 49,
    currency: 'EUR',
    billingPeriod: 'one-time',
    badge: { text: 'RESULTADO EN 60 SEGUNDOS', color: 'gold' },
    popular: false,
    urgent: true,
    successRate: 100,
    deliveryTime: '60 segundos garantizados',
    icon: 'Zap',
    color: '#8b5cf6',
    gradient: 'from-violet-500 to-purple-700',
    features: [
      { text: 'Análisis IA en menos de 60 segundos para cualquier documento (hasta 50 páginas)', included: true, highlight: true },
      { text: 'Detección automática de cláusulas abusivas o ilegales con cita legal exacta', included: true, highlight: true },
      { text: 'Resumen ejecutivo en lenguaje llano (0% jerga jurídica)', included: true },
      { text: 'Semáforo de riesgo (Verde/Ámbar/Rojo) con explicación de cada punto', included: true },
      { text: 'Recomendación de siguiente paso: firmar, negociar, reclamar o consultar abogado', included: true },
    ],
    guarantee:
      'Si el análisis no detecta ningún punto de riesgo o mejora y después un abogado encuentra algo relevante, te devolvemos el importe íntegro.',
    targetAudience:
      'Autónomos que reciben contratos de clientes o proveedores, inquilinos o propietarios revisando contratos de arrendamiento, empleados antes de firmar, compradores de vivienda, cualquier persona que reciba documentos legales inesperados.',
    stripeProductId: process.env.STRIPE_PRODUCT_ANALISIS_EXPRES,
    stripePriceId: process.env.STRIPE_PRICE_ANALISIS_EXPRES,
  },

  // ── 3. Recurso Garantizado™ ───────────────────────────────────────────────
  {
    id: 'recurso-garantizado',
    slug: 'recurso-garantizado',
    name: 'Recurso Garantizado',
    trademark: 'Recurso Garantizado™',
    tagline: 'Solo pagas si ganamos. Sin riesgo, sin coste inicial.',
    description:
      'Recurrimos tu multa de tráfico sin que pagues ni un euro hasta que el recurso sea resuelto. Nuestros abogados especializados en derecho de tráfico tienen una tasa de éxito del 67%. Si ganamos, cobraremos un porcentaje del ahorro conseguido. Si perdemos, no nos debes nada.',
    category: 'success-fee',
    // Precio exacto del brief: 0€ de coste inicial — 30% del ahorro si ganamos
    price: 0,
    originalPrice: undefined,
    currency: 'EUR',
    billingPeriod: 'one-time',
    badge: { text: 'SIN RIESGO', color: 'red' },
    popular: false,
    urgent: true,
    successRate: 67,
    deliveryTime: 'Análisis de viabilidad en 24 horas',
    icon: 'Trophy',
    color: '#10b981',
    gradient: 'from-emerald-500 to-green-600',
    features: [
      { text: 'Análisis de viabilidad gratuito en menos de 24 horas', included: true, highlight: true },
      { text: 'Abogado especialista en tráfico y sanciones administrativas asignado', included: true },
      { text: 'Redacción y presentación del recurso ante la DGT o Ayuntamiento', included: true },
      { text: 'Seguimiento activo del expediente con notificaciones en tiempo real', included: true, highlight: true },
      { text: 'Si el recurso fracasa, asesoramiento sobre opciones de pago reducido', included: true },
    ],
    guarantee:
      'Si aceptamos el caso, garantizamos que el recurso se presenta correctamente y en plazo. Si por error nuestro se pierde el plazo de recurso, cubrimos el importe íntegro de la multa.',
    targetAudience:
      'Conductores con multas de más de 100€ (radares, semáforos, estacionamiento en zonas especiales), especialmente multas con puntos en juego, personas con multas que consideran injustas pero no saben cómo actuar.',
    stripeProductId: process.env.STRIPE_PRODUCT_RECURSO,
    stripePriceId: process.env.STRIPE_PRICE_RECURSO,
  },

  // ── 4. Pack Empresarial™ ──────────────────────────────────────────────────
  {
    id: 'pack-empresarial',
    slug: 'pack-empresarial',
    name: 'Pack Empresarial',
    trademark: 'Pack Empresarial™',
    tagline: 'Tu departamento jurídico completo. A precio de suscripción SaaS.',
    description:
      'El departamento jurídico que tu empresa necesita pero no puede permitirse contratar internamente. Contratos con clientes, reclamaciones de proveedores, despidos, inspecciones laborales, RGPD y más: un equipo de abogados multidisciplinar trabaja como si estuviera en tu plantilla, a precio de suscripción SaaS.',
    category: 'subscription',
    // Precio exacto del brief: 149€/mes (sin permanencia)
    price: 149,
    // Precio tachado del brief: ~~1.200€/mes~~ (retainer mínimo despacho tradicional)
    originalPrice: 1200,
    currency: 'EUR',
    billingPeriod: 'month',
    badge: { text: 'PARA PYMEs', color: 'blue' },
    popular: false,
    urgent: false,
    successRate: 94,
    deliveryTime: 'Primer contacto en menos de 4 horas',
    icon: 'Building2',
    color: '#3b82f6',
    gradient: 'from-blue-500 to-indigo-600',
    features: [
      { text: 'Abogado de empresa asignado con conocimiento de tu sector y contratos habituales', included: true, highlight: true },
      { text: 'Consultas ilimitadas por email, teléfono y videollamada (respuesta garantizada < 4h)', included: true, highlight: true },
      { text: 'Revisión y redacción de contratos comerciales, laborales y con proveedores (ilimitado)', included: true },
      { text: 'Gestión completa de reclamaciones de clientes y proveedores', included: true },
      { text: 'Auditoría RGPD inicial + mantenimiento trimestral incluido', included: true },
    ],
    guarantee:
      'Si en cualquier mes nuestro tiempo de respuesta supera las 4 horas en más de 3 consultas, ese mes es gratuito. Monitorizamos nuestros propios tiempos y aplicamos el descuento automáticamente sin que tengas que pedirlo.',
    targetAudience:
      'PYMEs de 1-50 empleados en sectores con alta exposición contractual (tecnología, construcción, hostelería, retail, consultoría), autónomos con facturación superior a 60.000€/año, startups en fase de crecimiento que manejan contratos de inversión y laborales complejos.',
    stripeProductId: process.env.STRIPE_PRODUCT_EMPRESARIAL,
    stripePriceId: process.env.STRIPE_PRICE_EMPRESARIAL,
  },

  // ── 5. Contrato Blindado™ ─────────────────────────────────────────────────
  {
    id: 'contrato-blindado',
    slug: 'contrato-blindado',
    name: 'Contrato Blindado',
    trademark: 'Contrato Blindado™',
    tagline: 'IA + abogado especialista. Doble revisión garantizada.',
    description:
      'Tu contrato revisado por nuestra IA en 60 segundos y después verificado y blindado por un abogado especializado en la materia del contrato. Recibes un informe de riesgos, las cláusulas reescritas que te perjudican y una versión final negociable lista para enviar a la otra parte.',
    category: 'one-time',
    // Precio exacto del brief: 149€/contrato
    price: 149,
    // Precio tachado del brief: ~~450€~~ (revisión básica despacho)
    originalPrice: 450,
    currency: 'EUR',
    billingPeriod: 'one-time',
    badge: { text: 'ABOGADO + IA', color: 'gold' },
    popular: false,
    urgent: false,
    successRate: 98,
    deliveryTime: 'Informe en 24-48 horas',
    icon: 'FileCheck',
    color: '#06b6d4',
    gradient: 'from-cyan-500 to-sky-600',
    features: [
      { text: 'Pre-análisis IA en 60 segundos con mapa completo de cláusulas de riesgo', included: true },
      { text: 'Revisión humana por abogado especialista en la materia del contrato (civil, mercantil, laboral)', included: true, highlight: true },
      { text: 'Informe ejecutivo con semáforo de riesgo, justificación legal de cada punto problemático', included: true },
      { text: 'Propuesta de redacción alternativa para las cláusulas a negociar (versión lista para enviar)', included: true, highlight: true },
      { text: '1 sesión de 30 minutos con el abogado revisor para resolver dudas del informe', included: true },
    ],
    guarantee:
      'Si el contrato revisado contiene una cláusula que posteriormente un tribunal declara abusiva o nula, cubrimos los honorarios de la reclamación hasta 2.000€.',
    targetAudience:
      'Freelancers y autónomos antes de firmar contratos con clientes grandes, compradores de primera vivienda revisando contratos hipotecarios, emprendedores firmando acuerdos de inversión, cualquier persona o empresa ante un contrato de alto valor económico.',
    stripeProductId: process.env.STRIPE_PRODUCT_CONTRATO,
    stripePriceId: process.env.STRIPE_PRICE_CONTRATO,
  },

  // ── 6. Defensa Premium™ ───────────────────────────────────────────────────
  {
    id: 'defensa-premium',
    slug: 'defensa-premium',
    name: 'Defensa Premium',
    trademark: 'Defensa Premium™',
    tagline: 'Un abogado de élite exclusivo. Del primer día hasta la sentencia.',
    description:
      'Un abogado de élite asignado exclusivamente a tu caso, con acceso directo por teléfono, disponibilidad garantizada para audiencias y una estrategia legal personalizada desde el primer día. Para cuando el asunto es serio y no puedes permitirte perder.',
    category: 'one-time',
    // Precio exacto del brief: Desde 1.200€ (evaluación gratuita)
    price: 1200,
    // Precio tachado del brief: ~~Desde 3.500€~~ (despacho tradicional equivalente)
    originalPrice: 3500,
    currency: 'EUR',
    billingPeriod: 'one-time',
    badge: { text: 'PREMIUM', color: 'blue' },
    popular: false,
    urgent: false,
    successRate: 89,
    deliveryTime: 'Evaluación gratuita en 24 horas',
    icon: 'Scale',
    color: '#ec4899',
    gradient: 'from-pink-500 to-rose-600',
    features: [
      { text: 'Abogado senior asignado y disponible directamente (sin intermediarios ni juniors)', included: true, highlight: true },
      { text: 'Estrategia legal escrita personalizada con escenarios de riesgo y probabilidades de éxito', included: true, highlight: true },
      { text: 'Representación completa en todas las fases del procedimiento (negociación, juicio, recursos)', included: true },
      { text: 'Comunicación directa ilimitada por teléfono, email y videollamada durante el proceso', included: true },
      { text: 'Informe quincenal de estado del caso con próximos pasos y plazos críticos', included: true },
    ],
    guarantee:
      'Si no cumplimos algún plazo procesal por negligencia nuestra, asumimos todos los costes derivados de esa demora, incluyendo sanciones judiciales. Y cambiamos al abogado asignado sin coste adicional si el cliente lo solicita en los primeros 15 días.',
    targetAudience:
      'Particulares con procedimientos judiciales en marcha (divorcios con patrimonio significativo, herencias disputadas, accidentes de tráfico graves), PYMEs con litigios mercantiles, trabajadores en procedimientos de despido improcedente con salarios altos, cualquier persona acusada penalmente.',
    stripeProductId: process.env.STRIPE_PRODUCT_DEFENSA,
    stripePriceId: process.env.STRIPE_PRICE_DEFENSA,
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.popular || p.badge)
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter((p) => p.category === category)
}

export function formatPrice(price: number, currency = 'EUR'): string {
  if (price === 0) return 'A éxito'
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
    minimumFractionDigits: price % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
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
