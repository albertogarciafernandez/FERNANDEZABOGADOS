'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Check,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Star,
  ArrowRight,
  Users,
  Zap,
  Target,
  Building2,
  FileCheck,
  Scale,
  Shield,
  CheckCircle2,
} from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'
import { formatPrice, getBillingLabel } from '@/lib/products'
import type { Product } from '@/types/product'
import { cn } from '@/lib/utils'
import { fadeInUp, staggerContainer } from '@/lib/animations'

// ─── Icon map ─────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ElementType> = {
  Shield,
  Zap,
  Target,
  Building2,
  FileCheck,
  Scale,
}

function ProductIcon({ name, color, size = 'lg' }: { name: string; color: string; size?: 'sm' | 'lg' }) {
  const Icon = ICON_MAP[name] ?? Shield
  const sz = size === 'lg' ? 'w-10 h-10' : 'w-6 h-6'
  return <Icon className={sz} style={{ color }} />
}

// ─── Product-specific data ─────────────────────────────────────────────────────

type ProductData = {
  steps: { title: string; description: string }[]
  testimonials: { name: string; city: string; text: string; result: string; rating: number }[]
  faqs: { q: string; a: string }[]
  audience: string[]
}

const PRODUCT_DATA: Record<string, ProductData> = {
  'escudo-total': {
    steps: [
      {
        title: 'Activa tu Escudo en 2 minutos',
        description:
          'Completa el formulario con tus datos y elige el plan anual. Aceptamos tarjeta, Bizum y transferencia. Sin permanencia forzada.',
      },
      {
        title: 'Tu abogado asignado te escribe hoy',
        description:
          'En menos de 47 minutos recibirás un mensaje personalizado de tu abogado de cabecera presentándose y confirmando tu cobertura activa.',
      },
      {
        title: 'Consulta siempre que necesites',
        description:
          'Email, teléfono o videollamada. Respuesta garantizada en menos de 2 horas en horario laboral. La línea de emergencia 24/7 está disponible desde el primer momento.',
      },
    ],
    testimonials: [
      {
        name: 'Elena Rodríguez',
        city: 'Madrid',
        text:
          'Tenía problemas con mi casero que no devolvía la fianza y no sabía cómo actuar. Activé el Escudo Total™ y en dos horas tenía un abogado explicándome exactamente qué carta enviar. Recuperé 1.800€ en 3 semanas.',
        result: 'Recuperó 1.800€ de fianza en 3 semanas',
        rating: 5,
      },
      {
        name: 'Carlos Martínez',
        city: 'Barcelona',
        text:
          'Me llegó un burofax de una empresa por supuestos daños que nunca causé. Mi abogado del Escudo Total™ revisó el caso, me redactó la respuesta y el asunto quedó archivado. Sin ese seguro, hubiera pagado los 2.400€ que pedían.',
        result: 'Evitó reclamación injusta de 2.400€',
        rating: 5,
      },
      {
        name: 'Lucía Fernández',
        city: 'Valencia',
        text:
          'Como propietaria con tres pisos en alquiler, el Escudo Total™ es imprescindible. Este año tuve que revisar contratos, gestionar una cláusula abusiva de una comunidad y reclamar facturas impagadas. Todo resuelto por el mismo coste mensual.',
        result: 'Gestionó 3 casos legales distintos sin coste adicional',
        rating: 5,
      },
    ],
    faqs: [
      {
        q: '¿Hay límite en el número de consultas mensuales?',
        a: 'No. Las consultas con abogado colegiado son completamente ilimitadas. Puedes escribir o llamar tantas veces como necesites durante tu suscripción activa.',
      },
      {
        q: '¿Qué tipos de derecho cubre el Escudo Total™?',
        a: 'Cubre Derecho Civil (contratos, familia, herencias), Laboral (contratos de trabajo, despidos, reclamaciones salariales), Administrativo (multas, sanciones, permisos) y Derecho de Consumo (garantías, devoluciones, cláusulas abusivas de empresas).',
      },
      {
        q: '¿Puedo cancelar en cualquier momento?',
        a: 'Sí. No hay permanencia mínima. Si cancelas en los primeros 30 días recibes un reembolso completo. Después, la suscripción continúa activa hasta el fin del periodo pagado.',
      },
      {
        q: '¿La línea de emergencia 24/7 es realmente disponible siempre?',
        a: 'Sí. Para situaciones que no pueden esperar — detenciones, notificaciones urgentes, plazos que vencen en horas — nuestra línea de guardia está activa las 24 horas, los 7 días de la semana, incluidos festivos.',
      },
    ],
    audience: [
      'Familias con hijos menores de edad',
      'Propietarios de inmuebles en alquiler',
      'Trabajadores con contratos laborales complejos',
      'Personas que han tenido problemas legales previos',
      'Autónomos que necesitan cobertura personal además de empresarial',
    ],
  },

  'analisis-expres': {
    steps: [
      {
        title: 'Sube tu documento',
        description:
          'Arrastra o selecciona el PDF, Word o imagen del contrato, multa o carta que quieres analizar. Hasta 50 páginas. Cifrado SSL de extremo a extremo.',
      },
      {
        title: 'La IA analiza en 60 segundos',
        description:
          'Nuestra IA entrenada en Derecho Español escanea cada cláusula, detecta anomalías y clasifica los riesgos. Verás el progreso en tiempo real.',
      },
      {
        title: 'Recibe tu informe completo',
        description:
          'Semáforo de riesgo por sección, cláusulas problemáticas con cita legal exacta, resumen en lenguaje llano y recomendación clara de acción. Descargable en PDF.',
      },
    ],
    testimonials: [
      {
        name: 'Adrián Sanz',
        city: 'Sevilla',
        text:
          'Iba a firmar un contrato de arrendamiento de local para mi negocio. El Análisis Exprés™ detectó una cláusula de revisión de renta abusiva que hubiera podido triplicar mi alquiler al segundo año. Por 9,90€ me ahorré una negociación durísima o peor, un contrato trampa.',
        result: 'Detectó cláusula abusiva antes de firmar contrato de 48.000€',
        rating: 5,
      },
      {
        name: 'Marta López',
        city: 'Bilbao',
        text:
          'Recibí una carta de un proveedor reclamando daños y no entendía si tenía razón o no. En un minuto el análisis me confirmó que sus argumentos no tenían base legal y me dio los artículos exactos para responder. Resuelto en un día.',
        result: 'Reclamación de proveedor desestimada con argumentación legal precisa',
        rating: 5,
      },
      {
        name: 'Javier Ruiz',
        city: 'Zaragoza',
        text:
          'Como autónomo firmo contratos de servicios continuamente. Ahora los analizo siempre antes de firmar. En un caso detectó que el cliente se reservaba la propiedad intelectual de todo lo que yo creara. Eso hubiera sido devastador para mi negocio.',
        result: 'Protegió la propiedad intelectual de su negocio',
        rating: 5,
      },
    ],
    faqs: [
      {
        q: '¿Qué tipos de documentos puedo analizar?',
        a: 'Contratos de arrendamiento, contratos de servicios, cartas notariales, multas administrativas, convenios colectivos, acuerdos de confidencialidad, contratos hipotecarios, cartas de reclamación, y cualquier documento legal en español de hasta 50 páginas.',
      },
      {
        q: '¿El análisis es tan fiable como el de un abogado?',
        a: 'Para detección de riesgos y cláusulas problemáticas, la precisión de nuestra IA supera el 95% comparada con revisiones manuales. Para decisiones de alta importancia, el informe indica si se recomienda consulta adicional con abogado humano.',
      },
      {
        q: '¿Mis documentos están seguros y son confidenciales?',
        a: 'Sí. Todos los documentos se cifran en tránsito (TLS 1.3) y en reposo (AES-256). No son utilizados para entrenar modelos ni compartidos con terceros. Cumplimos íntegramente con el RGPD. Los documentos se eliminan de nuestros servidores a las 24 horas del análisis.',
      },
      {
        q: '¿Qué pasa si el análisis no encuentra nada y luego hay un problema?',
        a: 'Activamos nuestra garantía: si el análisis indica que el documento es correcto (riesgo verde) y posteriormente un abogado o un tribunal identifica un problema significativo que debimos detectar, te reembolsamos el importe íntegro del análisis.',
      },
    ],
    audience: [
      'Autónomos que reciben contratos de clientes o proveedores',
      'Inquilinos y propietarios revisando contratos de arrendamiento',
      'Empleados antes de firmar un contrato laboral',
      'Compradores de primera vivienda',
      'Emprendedores ante acuerdos de inversión o socios',
    ],
  },

  'recurso-garantizado': {
    steps: [
      {
        title: 'Análisis de viabilidad gratuito',
        description:
          'Envíanos los datos de tu multa (foto, boletín de denuncia o notificación DGT). En menos de 24 horas te decimos si tiene viabilidad de recurso y cuánto estimamos recuperar.',
      },
      {
        title: 'Aceptamos el caso sin coste',
        description:
          'Si decidimos aceptar el recurso (tasas de aceptación del 73%), un abogado especialista en tráfico se hace cargo del expediente. Tú no pagas nada todavía.',
      },
      {
        title: 'Presentamos el recurso y seguimos el expediente',
        description:
          'Redactamos y presentamos el recurso con los argumentos más sólidos disponibles. Recibirás notificaciones en tiempo real del estado. Si ganamos, cobras; si perdemos, no nos debes nada.',
      },
    ],
    testimonials: [
      {
        name: 'Roberto García',
        city: 'Madrid',
        text:
          'Me pusieron una multa de radar de 200€ con 4 puntos. Pensaba que era imposible recurrir. El equipo detectó que el radar no estaba homologado correctamente en ese tramo. La multa fue anulada completamente.',
        result: 'Multa de 200€ y 4 puntos anulada completamente',
        rating: 5,
      },
      {
        name: 'Pilar Moreno',
        city: 'Valencia',
        text:
          'Me multaron por estacionar en una zona prohibida pero la señal estaba tapada por un árbol. Lo fotografié pero no sabía cómo presentarlo. El Recurso Garantizado™ gestionó todo y me anularon la multa en 6 semanas.',
        result: 'Multa de 100€ anulada por señalización defectuosa',
        rating: 5,
      },
      {
        name: 'Antonio Vega',
        city: 'Bilbao',
        text:
          'Semáforo en ámbar, yo lo vi en verde. Multa de 400€ y 6 puntos. El equipo encontró que la cámara tenía problemas de calibración y el Ayuntamiento no aportó las certificaciones exigidas. Recurso estimado.',
        result: 'Multa de 400€ y 6 puntos recurrida con éxito',
        rating: 5,
      },
    ],
    faqs: [
      {
        q: '¿Qué tipo de multas podéis recurrir?',
        a: 'Multas de radar (velocidad), semáforo en rojo, estacionamiento en zonas especiales, uso del móvil al volante, y sanciones administrativas de tráfico en general. Tanto multas de la DGT como de Ayuntamientos.',
      },
      {
        q: '¿Cuánto tardará la resolución del recurso?',
        a: 'Depende del organismo. La DGT resuelve en un plazo medio de 3-6 meses. Los Ayuntamientos varían entre 1-4 meses. Durante todo ese tiempo te mantenemos informado con notificaciones en tiempo real.',
      },
      {
        q: '¿Qué porcentaje os quedáis si ganamos?',
        a: 'El 30% del ahorro obtenido. Si la multa era de 200€ y la ganamos completamente, nos corresponden 60€. Si se reduce a la mitad (100€), nuestros honorarios son 30€ sobre el ahorro de 100€.',
      },
      {
        q: '¿Qué pasa si el recurso fracasa?',
        a: 'No pagas absolutamente nada en honorarios. Además, te asesoramos gratuitamente sobre las opciones disponibles: fraccionamiento del pago, reducción por pronto pago si aún está en plazo, o recursos adicionales ante órganos superiores.',
      },
    ],
    audience: [
      'Conductores con multas de radar de más de 100€',
      'Personas con multas con puntos en juego',
      'Conductores profesionales (camioneros, VTCs, comerciales)',
      'Personas que creen que la multa fue puesta por error',
      'Cualquiera que quiera recurrir sin asumir costes por adelantado',
    ],
  },

  'pack-empresarial': {
    steps: [
      {
        title: 'Alta y diagnóstico inicial',
        description:
          'Rellenamos contigo un formulario de diagnóstico legal de tu empresa: sector, número de empleados, tipos de contratos habituales y riesgos específicos de tu actividad. En 24 horas tienes tu abogado asignado.',
      },
      {
        title: 'Tu abogado de empresa se presenta',
        description:
          'El abogado asignado tiene experiencia en tu sector. Te envía un informe de primeras impresiones y queda disponible por teléfono, email y videollamada desde ese momento.',
      },
      {
        title: 'Cobertura legal completa sin sorpresas',
        description:
          'Contratos, reclamaciones, despidos, RGPD, inspecciones — todo gestionado por tu equipo legal asignado. Sin coste por consulta, sin tarifas por hora. Precio fijo mensual, sin permanencia.',
      },
    ],
    testimonials: [
      {
        name: 'Sofía Jiménez',
        city: 'Madrid',
        text:
          'Soy CEO de una startup de 22 personas. Antes teníamos una gestoría pero sin cobertura legal real. Con el Pack Empresarial™ hemos revisado contratos de clientes, gestionado dos bajas por enfermedad complejas y superado una inspección de trabajo sin ningún expediente. Vale cada euro.',
        result: 'Superó inspección de trabajo sin expediente. 3 contratos complejos gestionados.',
        rating: 5,
      },
      {
        name: 'Miguel Torres',
        city: 'Barcelona',
        text:
          'Tenía un proveedor que no cumplía el contrato y me costaba dinero cada mes. Mi abogada del Pack Empresarial™ redactó el burofax, negoció la rescisión y recuperé la fianza de 8.000€ que pensaba que había perdido.',
        result: 'Recuperó fianza de 8.000€ de proveedor incumplidor',
        rating: 5,
      },
      {
        name: 'Carmen Álvarez',
        city: 'Sevilla',
        text:
          'Como empresa de hostelería tenemos contratos laborales, licencias, proveedores, clientes... Es un caos legal constante. El Pack Empresarial™ es nuestro departamento jurídico a un precio que podemos permitirnos.',
        result: 'Gestión jurídica completa de empresa hostelera con 35 empleados',
        rating: 5,
      },
    ],
    faqs: [
      {
        q: '¿Cuántos empleados o consultas están incluidos?',
        a: 'El pack cubre hasta 50 empleados de la empresa y no limita el número de consultas mensuales. El precio es fijo independientemente de cuánto lo uses.',
      },
      {
        q: '¿Puedo cambiar de abogado asignado si no me convence?',
        a: 'Sí. En los primeros 15 días puedes solicitar el cambio sin ningún coste ni explicación. Después, puedes solicitarlo con una semana de preaviso si tienes razones justificadas.',
      },
      {
        q: '¿Cubre litigios en los tribunales?',
        a: 'El Pack Empresarial™ cubre asesoría, negociación y gestión documental. Para representación en tribunales (litigios activos), se presupuesta parte a parte como servicio adicional con descuento del 20% para clientes Pack.',
      },
      {
        q: '¿Qué pasa si un mes necesito más de 3 consultas urgentes?',
        a: 'No hay límite. Si nuestra respuesta supera las 4 horas en más de 3 consultas en un mes, ese mes es gratuito. Lo monitorizamos nosotros y lo aplicamos automáticamente.',
      },
    ],
    audience: [
      'PYMEs de 1 a 50 empleados en cualquier sector',
      'Startups en fase de crecimiento con contratos de inversión',
      'Autónomos con facturación superior a 60.000€/año',
      'Empresas de tecnología, construcción, hostelería o retail',
      'Negocios con contratos complejos o alta exposición contractual',
    ],
  },

  'contrato-blindado': {
    steps: [
      {
        title: 'Sube tu contrato',
        description:
          'Comparte el documento que necesitas revisar: contrato de arrendamiento, hipoteca, inversión, servicios o cualquier acuerdo de importancia económica. Máximo confidencialidad garantizada.',
      },
      {
        title: 'Análisis IA + revisión humana',
        description:
          'En 60 segundos la IA genera un mapa de riesgos. A continuación un abogado especialista en la materia del contrato lo revisa en profundidad y añade los matices que la IA no puede ver.',
      },
      {
        title: 'Informe completo + cláusulas reescritas',
        description:
          'Recibes el informe con semáforo de riesgo, justificación legal de cada punto problemático, y una versión alternativa de las cláusulas a negociar lista para enviar a la otra parte.',
      },
    ],
    testimonials: [
      {
        name: 'David Palacios',
        city: 'Madrid',
        text:
          'Iba a firmar un acuerdo de inversión de 80.000€ con un Business Angel. El Contrato Blindado™ detectó que cedía el control de la empresa antes de tiempo y que las cláusulas de dilución eran abusivas. Renegocié desde cero. Fue la mejor inversión de 149€ que he hecho.',
        result: 'Protegió el control de su empresa en acuerdo de inversión de 80.000€',
        rating: 5,
      },
      {
        name: 'Isabel Navarro',
        city: 'Barcelona',
        text:
          'Compradora de piso por primera vez. El contrato hipotecario tenía dos cláusulas que mi banco me presentó como "estándar" pero el abogado del Contrato Blindado™ me explicó que podía negociarlas. Ahorré 3.200€ en comisiones de apertura y amortización.',
        result: 'Ahorró 3.200€ en condiciones hipotecarias renegociadas',
        rating: 5,
      },
      {
        name: 'Pablo Herrera',
        city: 'Valencia',
        text:
          'Freelance de diseño. Un cliente corporativo me envió un contrato de 40 páginas. Tardé 3 horas en leerlo y seguía sin entenderlo. El Contrato Blindado™ me lo resumió en 5 minutos y me dio la redacción alternativa para 4 cláusulas. Firmé con tranquilidad.',
        result: 'Contrato de cliente corporativo analizado y negociado favorablemente',
        rating: 5,
      },
    ],
    faqs: [
      {
        q: '¿Cuánto tarda la revisión completa (IA + abogado)?',
        a: 'El pre-análisis IA está listo en 60 segundos. La revisión humana completa con el informe ejecutivo y las cláusulas reescritas se entrega en 24-48 horas laborables.',
      },
      {
        q: '¿En qué materias están especializados vuestros abogados revisores?',
        a: 'Tenemos abogados especialistas en: Derecho Civil (arrendamientos, compraventas, hipotecas), Mercantil (sociedades, inversión, distribución), Laboral (contratos de trabajo, convenios) y Propiedad Intelectual (licencias, cesión de derechos).',
      },
      {
        q: '¿La sesión de 30 minutos con el abogado es obligatoria?',
        a: 'No, es opcional. Está incluida sin coste adicional por si quieres que el abogado te explique verbalmente algún punto del informe. Puedes usarla o no según tu necesidad.',
      },
      {
        q: '¿Qué cubre la garantía de cláusula abusiva?',
        a: 'Si el contrato que revisamos contiene una cláusula que posteriormente un tribunal español declara abusiva o nula, y esa cláusula no estaba marcada como problemática en nuestro informe, cubrimos los honorarios de la reclamación hasta 2.000€.',
      },
    ],
    audience: [
      'Freelancers y autónomos antes de firmar contratos de alta cuantía',
      'Compradores de primera vivienda con contratos hipotecarios',
      'Emprendedores firmando acuerdos de inversión o con socios',
      'Empresas ante contratos con clientes o proveedores importantes',
      'Cualquier persona ante un contrato con implicaciones económicas significativas',
    ],
  },

  'defensa-premium': {
    steps: [
      {
        title: 'Evaluación gratuita de tu caso',
        description:
          'Cuéntanos tu situación. En 24 horas recibes un análisis honesto: viabilidad estimada, estrategia recomendada, plazos críticos y presupuesto exacto. Sin compromiso ni coste.',
      },
      {
        title: 'Abogado senior asignado desde el primer día',
        description:
          'Ningún junior, ningún intermediario. El abogado senior que acepta tu caso es quien lo lleva de principio a fin, con contacto directo por teléfono y disponibilidad garantizada para audiencias.',
      },
      {
        title: 'Estrategia y seguimiento quincenal',
        description:
          'Recibirás un informe quincenal con el estado del caso, próximos pasos, plazos críticos y probabilidad de éxito actualizada. Siempre sabes exactamente dónde estás.',
      },
    ],
    testimonials: [
      {
        name: 'Fernando Castillo',
        city: 'Madrid',
        text:
          'Divorcio con patrimonio significativo y custodia en disputa. Contraté la Defensa Premium™ y fue la decisión más importante del proceso. Mi abogado negoció un acuerdo que protegió mis derechos patrimoniales y la custodia compartida que buscaba. Fue a juicio preparado para ganar.',
        result: 'Custodia compartida y patrimonio protegido en divorcio complejo',
        rating: 5,
      },
      {
        name: 'Raquel Domingo',
        city: 'Barcelona',
        text:
          'Me despidieron improcedentemente con 12 años de antigüedad y un salario alto. La Defensa Premium™ identificó irregularidades en el procedimiento y consiguió una indemnización un 40% superior a la legal. El juicio duró 8 meses pero valió cada día.',
        result: 'Indemnización por despido 40% superior a la legal',
        rating: 5,
      },
      {
        name: 'Ignacio Blanco',
        city: 'Bilbao',
        text:
          'Litigio mercantil con un socio que se había apropiado de fondos de la empresa. Caso complejo, documentación extensa, plazos muy ajustados. La Defensa Premium™ presentó todo en tiempo, el juicio fue ganado y recuperamos los 145.000€ apropiados.',
        result: 'Recuperó 145.000€ en litigio mercantil complejo',
        rating: 5,
      },
    ],
    faqs: [
      {
        q: '¿La evaluación inicial es realmente gratuita y sin compromiso?',
        a: 'Completamente. En 24 horas recibirás un análisis detallado de tu caso con la opinión honesta de nuestro equipo. Si creemos que tu caso no tiene suficiente viabilidad, te lo decimos. Si decidimos no aceptarlo, no pagas nada.',
      },
      {
        q: '¿Qué tipo de casos acepta la Defensa Premium™?',
        a: 'Divorcios y separaciones con patrimonio significativo, herencias disputadas, despidos improcedentes con salarios altos, litigios mercantiles entre empresas, accidentes de tráfico graves, y procedimientos penales. Cada caso se evalúa individualmente.',
      },
      {
        q: '¿Cuánto cuesta exactamente?',
        a: 'El precio mínimo es de 1.200€, pero el presupuesto exacto depende de la complejidad del caso, la fase procesal en que se encuentre y el tiempo estimado. El presupuesto se entrega por escrito tras la evaluación gratuita y no cambia sin tu aprobación.',
      },
      {
        q: '¿Qué garantías tengo si el caso se pierde?',
        a: 'No garantizamos el resultado (ningún abogado honesto puede hacerlo), pero garantizamos la excelencia procesal: si perdemos algún plazo por negligencia nuestra, cubrimos todos los costes derivados. Y puedes cambiar de abogado en los primeros 15 días sin coste.',
      },
    ],
    audience: [
      'Personas en procesos de divorcio con patrimonio o hijos menores',
      'Trabajadores en procedimientos de despido improcedente',
      'Empresas con litigios mercantiles activos',
      'Personas acusadas penalmente o investigadas',
      'Herederos en disputas sucesorias complejas',
    ],
  },
}

// ─── FAQ Accordion ─────────────────────────────────────────────────────────────

function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="font-medium text-white pr-4">{q}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-[#D4AF37] shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-white/40 shrink-0" />
        )}
      </button>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="px-5 pb-5 text-[#94A3B8] text-sm leading-relaxed"
        >
          {a}
        </motion.div>
      )}
    </div>
  )
}

// ─── Main client component ─────────────────────────────────────────────────────

interface ProductPageClientProps {
  product: Product
  relatedProducts: Product[]
  discount: number | null
}

export function ProductPageClient({ product, relatedProducts, discount }: ProductPageClientProps) {
  const { addItem, hasItem, openCart } = useCartStore()
  const inCart = hasItem(product.id)
  const [openFaqs, setOpenFaqs] = useState<number[]>([0])
  const [ctaLoading, setCtaLoading] = useState(false)

  const data = PRODUCT_DATA[product.slug]

  const priceLabel =
    product.price === 0
      ? 'Sin coste inicial'
      : formatPrice(product.price, product.currency)

  const billingLabel = getBillingLabel(product)

  const handleCTA = async () => {
    if (inCart) {
      openCart()
      return
    }
    setCtaLoading(true)
    addItem(product)
    await new Promise((r) => setTimeout(r, 400))
    setCtaLoading(false)
    openCart()
  }

  const toggleFaq = (i: number) => {
    setOpenFaqs((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]))
  }

  return (
    <div className="min-h-screen bg-[#040B17] text-[#F8FAFC]">

      {/* ── Breadcrumb ───────────────────────────────────────────────────────── */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-[#475569]">
            <Link href="/" className="hover:text-[#94A3B8] transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/tienda" className="hover:text-[#94A3B8] transition-colors">Tienda</Link>
            <span>/</span>
            <span className="text-[#94A3B8]">{product.trademark}</span>
          </nav>
        </div>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #040B17 0%, #0A1628 50%, #0F1E3A 100%)' }}
      >
        {/* Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at top left, ${product.color}18 0%, transparent 60%)`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: copy */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {/* Badge */}
              {product.badge && (
                <motion.div variants={fadeInUp} className="mb-6">
                  <span
                    className={cn(
                      'inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest',
                      product.badge.color === 'gold'
                        ? 'bg-[rgba(212,175,55,0.12)] border border-[rgba(212,175,55,0.35)] text-[#F5D060]'
                        : product.badge.color === 'green'
                        ? 'bg-[rgba(5,150,105,0.12)] border border-[rgba(5,150,105,0.35)] text-[#D1FAE5]'
                        : product.badge.color === 'blue'
                        ? 'bg-[rgba(37,99,235,0.12)] border border-[rgba(37,99,235,0.35)] text-[#DBEAFE]'
                        : 'bg-[rgba(212,175,55,0.12)] border border-[rgba(212,175,55,0.35)] text-[#F5D060]',
                    )}
                  >
                    <span
                      className="inline-block w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: product.color }}
                    />
                    {product.badge.text}
                  </span>
                </motion.div>
              )}

              {/* Name + Icon */}
              <motion.div variants={fadeInUp} className="flex items-center gap-5 mb-4">
                <div
                  className="p-4 rounded-2xl shrink-0"
                  style={{
                    background: `${product.color}20`,
                    boxShadow: `0 0 30px ${product.color}30`,
                  }}
                >
                  <ProductIcon name={product.icon} color={product.color} size="lg" />
                </div>
                <div>
                  <h1
                    className="text-4xl lg:text-5xl font-bold leading-tight"
                    style={{ fontFamily: 'var(--font-playfair, serif)' }}
                  >
                    {product.trademark}
                  </h1>
                </div>
              </motion.div>

              <motion.p variants={fadeInUp} className="text-xl text-[#94A3B8] mb-8 leading-relaxed">
                {product.tagline}
              </motion.p>

              {/* Price */}
              <motion.div variants={fadeInUp} className="mb-8">
                <div className="flex items-baseline gap-3 flex-wrap">
                  {product.originalPrice && (
                    <span className="text-xl text-[#475569] line-through">
                      {formatPrice(product.originalPrice, product.currency)}
                    </span>
                  )}
                  {discount && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      -{discount}%
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-5xl font-extrabold"
                    style={{ color: product.price === 0 ? '#059669' : product.color }}
                  >
                    {priceLabel}
                  </span>
                  {billingLabel && (
                    <span className="text-[#94A3B8] text-lg">{billingLabel}</span>
                  )}
                </div>
                {product.price === 0 && (
                  <p className="text-sm text-[#94A3B8] mt-1">30% del ahorro conseguido si ganamos</p>
                )}
              </motion.div>

              {/* CTA buttons */}
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  onClick={handleCTA}
                  disabled={ctaLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className={cn(
                    'inline-flex items-center justify-center gap-2.5',
                    'h-14 px-8 rounded-xl font-semibold text-base text-white',
                    'bg-gradient-to-br from-[#1B3A6B] to-[#2563EB]',
                    'hover:from-[#2563EB] hover:to-[#3B82F6]',
                    'border border-[rgba(212,175,55,0.18)]',
                    'hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]',
                    'transition-all duration-200',
                    'disabled:opacity-60 disabled:cursor-not-allowed',
                  )}
                >
                  {ctaLoading ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Añadiendo...
                    </>
                  ) : inCart ? (
                    <>
                      <CheckCircle2 className="h-5 w-5" />
                      Ver mi carrito
                    </>
                  ) : (
                    <>
                      Contratar ahora
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </motion.button>

                <Link
                  href="#como-funciona"
                  className={cn(
                    'inline-flex items-center justify-center gap-2',
                    'h-14 px-6 rounded-xl font-medium text-base text-[#F8FAFC]',
                    'bg-[rgba(15,34,64,0.6)] backdrop-blur-md',
                    'border border-[rgba(212,175,55,0.2)]',
                    'hover:bg-[rgba(22,45,82,0.75)] hover:border-[rgba(212,175,55,0.4)]',
                    'transition-all duration-200',
                  )}
                >
                  Cómo funciona
                </Link>
              </motion.div>

              {/* Trust micro-copy */}
              <motion.div variants={fadeInUp} className="mt-5 flex items-center gap-2 text-sm text-[#475569]">
                <ShieldCheck className="h-4 w-4 text-[#059669]" />
                <span>Garantía 30 días · Pago 100% seguro · Sin permanencia</span>
              </motion.div>
            </motion.div>

            {/* Right: features card */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div
                className="rounded-2xl p-8"
                style={{
                  background: 'rgba(10, 22, 40, 0.8)',
                  backdropFilter: 'blur(24px) saturate(200%)',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  boxShadow:
                    '0 0 40px rgba(212,175,55,0.08), inset 0 1px 0 rgba(245,208,96,0.1)',
                }}
              >
                <h3 className="text-sm font-semibold uppercase tracking-widest text-[#D4AF37] mb-5">
                  Incluido en {product.trademark}
                </h3>
                <ul className="space-y-4">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check
                        className={cn(
                          'h-5 w-5 mt-0.5 shrink-0',
                          feat.highlight ? 'text-[#D4AF37]' : 'text-[#059669]',
                        )}
                      />
                      <span
                        className={cn(
                          'text-sm leading-relaxed',
                          feat.highlight ? 'text-white font-medium' : 'text-[#94A3B8]',
                        )}
                      >
                        {feat.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Guarantee */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-[#059669] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#059669] mb-1">
                        Garantía incluida
                      </p>
                      <p className="text-sm text-[#94A3B8] leading-relaxed">{product.guarantee}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────────────────── */}
      <div className="border-y border-white/5 bg-[#0A1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: '12.847', label: 'Clientes protegidos' },
              { value: '94,3%', label: 'Valoración positiva' },
              { value: '< 2h', label: 'Tiempo de respuesta' },
              { value: '30 días', label: 'Garantía completa' },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-[#475569] mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── How it works ─────────────────────────────────────────────────────── */}
      <section id="como-funciona" className="py-24 bg-[#040B17]">
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
              Cómo funciona
            </motion.h2>
          </motion.div>

          {data && (
            <div className="grid lg:grid-cols-3 gap-8">
              {data.steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative"
                >
                  {/* Connector line */}
                  {i < data.steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-[calc(100%_-_1rem)] w-8 h-[2px] bg-gradient-to-r from-[#D4AF37] to-transparent z-10" />
                  )}
                  <div
                    className="rounded-2xl p-7 h-full"
                    style={{
                      background: 'rgba(15, 34, 64, 0.6)',
                      backdropFilter: 'blur(16px) saturate(180%)',
                      border: '1px solid rgba(212, 175, 55, 0.15)',
                    }}
                  >
                    <div
                      className="inline-flex items-center justify-center w-14 h-14 rounded-full text-2xl font-black mb-5"
                      style={{
                        background: `linear-gradient(135deg, ${product.color}30, ${product.color}10)`,
                        border: `2px solid ${product.color}40`,
                        color: product.color,
                      }}
                    >
                      {i + 1}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-[#94A3B8] text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── For whom ─────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0A1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.p variants={fadeInUp} className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-3">
                Público objetivo
              </motion.p>
              <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-white mb-6">
                ¿Para quién es {product.trademark}?
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-[#94A3B8] leading-relaxed mb-8">
                {product.targetAudience}
              </motion.p>

              {data && (
                <motion.ul variants={staggerContainer} className="space-y-3">
                  {data.audience.map((item, i) => (
                    <motion.li key={i} variants={fadeInUp} className="flex items-start gap-3">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: `${product.color}20` }}
                      >
                        <Users className="w-3 h-3" style={{ color: product.color }} />
                      </div>
                      <span className="text-[#94A3B8] text-sm">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </motion.div>

            {/* Guarantee card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="rounded-2xl p-8"
                style={{
                  background: 'rgba(5, 150, 105, 0.08)',
                  border: '1px solid rgba(5, 150, 105, 0.3)',
                  boxShadow: '0 0 40px rgba(5, 150, 105, 0.05)',
                }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-3 rounded-xl bg-[rgba(5,150,105,0.15)]">
                    <ShieldCheck className="h-6 w-6 text-[#059669]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#059669]">
                      Garantía específica
                    </p>
                    <h3 className="text-lg font-bold text-white">{product.trademark}</h3>
                  </div>
                </div>
                <p className="text-[#94A3B8] leading-relaxed">{product.guarantee}</p>

                <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                  {[
                    'Garantía de satisfacción 30 días completa',
                    'Garantía de respuesta en menos de 2 horas',
                    'Precio final sin costes ocultos',
                  ].map((g, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-sm text-[#94A3B8]">
                      <Check className="h-4 w-4 text-[#059669] shrink-0" />
                      {g}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────────── */}
      {data && (
        <section className="py-24 bg-[#040B17]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.p variants={fadeInUp} className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-3">
                Clientes reales
              </motion.p>
              <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-white">
                Lo que dicen nuestros clientes
              </motion.h2>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6">
              {data.testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-2xl p-7 flex flex-col"
                  style={{
                    background: 'rgba(15, 34, 64, 0.6)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(212, 175, 55, 0.15)',
                  }}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 text-[#D4AF37] fill-[#D4AF37]" />
                    ))}
                  </div>

                  <blockquote className="text-[#94A3B8] text-sm leading-relaxed mb-5 flex-1">
                    &ldquo;{t.text}&rdquo;
                  </blockquote>

                  {/* Result highlight */}
                  <div className="rounded-lg p-3 mb-4" style={{ background: 'rgba(5,150,105,0.08)', border: '1px solid rgba(5,150,105,0.2)' }}>
                    <p className="text-xs text-[#059669] font-medium">{t.result}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ background: product.gradient }}
                    >
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{t.name}</p>
                      <p className="text-xs text-[#475569]">{t.city}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      {data && (
        <section className="py-24 bg-[#0A1628]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <motion.p variants={fadeInUp} className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-3">
                Preguntas frecuentes
              </motion.p>
              <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-white">
                Resolvemos tus dudas
              </motion.h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              {data.faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  q={faq.q}
                  a={faq.a}
                  isOpen={openFaqs.includes(i)}
                  onToggle={() => toggleFaq(i)}
                />
              ))}
            </motion.div>

            <p className="text-center text-sm text-[#475569] mt-8">
              ¿Tienes más dudas?{' '}
              <Link href="/contacto" className="text-[#D4AF37] hover:underline">
                Habla con nosotros ahora →
              </Link>
            </p>
          </div>
        </section>
      )}

      {/* ── Related products ─────────────────────────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section className="py-24 bg-[#040B17]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <motion.p variants={fadeInUp} className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-3">
                También te puede interesar
              </motion.p>
              <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-white">
                Servicios relacionados
              </motion.h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {relatedProducts.map((rp, i) => {
                const RelatedIcon = ICON_MAP[rp.icon] ?? Shield
                return (
                  <motion.div
                    key={rp.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <Link
                      href={`/tienda/${rp.slug}`}
                      className="block rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-250"
                      style={{
                        background: 'rgba(15, 34, 64, 0.6)',
                        border: '1px solid rgba(212, 175, 55, 0.15)',
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="p-3 rounded-xl shrink-0"
                          style={{ background: `${rp.color}20` }}
                        >
                          <RelatedIcon className="w-6 h-6" style={{ color: rp.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                            {rp.trademark}
                          </h3>
                          <p className="text-sm text-[#94A3B8] mt-1 line-clamp-2">{rp.tagline}</p>
                          <p className="text-sm font-bold mt-2" style={{ color: rp.price === 0 ? '#059669' : rp.color }}>
                            {rp.price === 0 ? 'Sin coste inicial' : formatPrice(rp.price, rp.currency)}
                            <span className="text-[#94A3B8] font-normal">{getBillingLabel(rp)}</span>
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-[#475569] group-hover:text-[#D4AF37] transition-colors shrink-0 mt-1" />
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Final CTA ─────────────────────────────────────────────────────────── */}
      <section
        className="py-24"
        style={{
          background: 'linear-gradient(135deg, #0A1628 0%, #0F2240 50%, #0A1628 100%)',
          borderTop: '1px solid rgba(212,175,55,0.1)',
        }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Sin cobertura legal,{' '}
              <span style={{ color: product.color }}>cada día es un riesgo.</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[#94A3B8] text-lg mb-10">
              Tu abogado puede estar activo hoy. En menos de 47 minutos desde la contratación.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={handleCTA}
                disabled={ctaLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className={cn(
                  'inline-flex items-center justify-center gap-2.5',
                  'h-14 px-10 rounded-xl font-semibold text-lg text-white',
                  'bg-gradient-to-br from-[#1B3A6B] to-[#2563EB]',
                  'hover:from-[#2563EB] hover:to-[#3B82F6]',
                  'border border-[rgba(212,175,55,0.18)]',
                  'hover:shadow-[0_0_30px_rgba(37,99,235,0.4),0_0_80px_rgba(37,99,235,0.15)]',
                  'transition-all duration-200 disabled:opacity-60',
                )}
              >
                {inCart ? 'Ver mi carrito' : `Contratar ${product.trademark}`}
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </motion.div>
            <motion.div variants={fadeInUp} className="mt-5 flex items-center justify-center gap-2 text-sm text-[#475569]">
              <ShieldCheck className="h-4 w-4 text-[#059669]" />
              <span>30 días de garantía completa. Sin preguntas. Sin formularios.</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Mobile sticky CTA ─────────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden px-4 pb-4 pt-3 bg-gradient-to-t from-[#040B17] to-transparent">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xs text-[#475569]">
              {product.originalPrice && (
                <span className="line-through mr-1">{formatPrice(product.originalPrice, product.currency)}</span>
              )}
            </p>
            <p className="font-bold text-white">
              {priceLabel}
              <span className="text-[#94A3B8] text-sm font-normal">{billingLabel}</span>
            </p>
          </div>
          <motion.button
            onClick={handleCTA}
            disabled={ctaLoading}
            whileTap={{ scale: 0.97 }}
            className={cn(
              'h-12 px-7 rounded-xl font-semibold text-sm text-white',
              'bg-gradient-to-br from-[#1B3A6B] to-[#2563EB]',
              'border border-[rgba(212,175,55,0.18)]',
              'transition-all duration-200 disabled:opacity-60',
            )}
          >
            {inCart ? 'Ver carrito' : 'Contratar ahora'}
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default ProductPageClient
