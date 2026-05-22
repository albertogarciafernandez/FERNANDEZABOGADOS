// ============================================================
// COPY MAESTRO — Justicia Legalia Premium
// Todas las constantes de copy de la web.
// Fuente: Master Brief v1.0 — Director Creativo
// ============================================================

// ------------------------------------
// HERO
// ------------------------------------

export const HERO_COPY = {
  headline: "Tu defensa legal. Activa en minutos.",
  subheadline:
    "Abogados colegiados + IA avanzada + precios transparentes. Desde la multa más pequeña hasta el juicio más importante. Sin complicaciones, sin sorpresas.",
  cta_primary: "Analizar mi caso gratis",
  cta_secondary: "Ver servicios",
  tagline: "Tu escudo legal. Siempre encendido.",
  badge: "Plataforma Legal #1 en España",
  social_proof_inline: "4.9/5 · 12.847 clientes · Valorado en Google",
};

// ------------------------------------
// STATS (prueba social animada)
// ------------------------------------

export const STATS = [
  {
    value: 12847,
    label: "familias y empresas protegidas",
    suffix: "",
    prefix: "",
  },
  {
    value: 94.3,
    label: "de valoración positiva en Google y Trustpilot",
    suffix: "%",
    prefix: "",
  },
  {
    value: 1240000,
    label: "€ recuperados para nuestros clientes este año",
    suffix: "€",
    prefix: "",
  },
  {
    value: 67,
    label: "de recursos de tráfico ganados (media del sector: 23%)",
    suffix: "%",
    prefix: "",
  },
  {
    value: 47,
    label: "minutos de media hasta el primer contacto con tu abogado",
    suffix: " min",
    prefix: "",
  },
];

// ------------------------------------
// TRUST BADGES
// ------------------------------------

export const TRUST_BADGES = [
  {
    icon: "shield-check",
    text: "Colegio de Abogados de Madrid",
  },
  {
    icon: "lock",
    text: "SSL 256-bit — Cifrado bancario",
  },
  {
    icon: "file-badge",
    text: "RGPD Compliance — AEPD",
  },
  {
    icon: "award",
    text: "ISO 27001 — Seguridad certificada",
  },
  {
    icon: "credit-card",
    text: "Pago seguro con Stripe",
  },
  {
    icon: "star",
    text: "4.9/5 en Trustpilot — 8.200+ reseñas",
  },
];

// ------------------------------------
// TESTIMONIALS
// ------------------------------------

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  service: string;
  serviceCategory: "Multas" | "Contratos" | "Aerolíneas" | "Alquiler" | "Empresas" | "Consumo";
  avatar: string;
  avatarColor: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  resultado: string;
  date: string;
  verified: boolean;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "María García Rodríguez",
    role: "Profesora",
    company: "CEIP San Isidro",
    location: "Madrid",
    service: "Recurso Garantizado™",
    serviceCategory: "Multas",
    avatar: "MG",
    avatarColor: "from-amber-400 to-orange-500",
    rating: 5,
    text:
      "Tenía una multa de 200€ por superar el límite en una zona de obras. Subí la foto de la sanción y en tres minutos tenía el recurso completo con todos los argumentos legales. El radar no estaba homologado. Multa anulada sin estrés.",
    resultado: "Recuperé 200€",
    date: "Hace 2 semanas",
    verified: true,
  },
  {
    id: "t2",
    name: "Carlos Mendoza Prieto",
    role: "Consultor de Marketing",
    company: "Freelance",
    location: "Barcelona",
    service: "Recurso Garantizado™",
    serviceCategory: "Aerolíneas",
    avatar: "CM",
    avatarColor: "from-indigo-400 to-purple-500",
    rating: 5,
    text:
      "Vuelo de Ryanair cancelado el día antes del viaje. La aerolínea me ofrecía 50€. Con Justicia Legalia reclamé el Reglamento CE 261/2004 y me depositaron 400€ de compensación. El proceso tardó menos tiempo que la llamada al servicio de atención al cliente.",
    resultado: "Recuperé 400€",
    date: "Hace 1 mes",
    verified: true,
  },
  {
    id: "t3",
    name: "Ana Fernández López",
    role: "Diseñadora Gráfica",
    company: "Estudio propio",
    location: "Valencia",
    service: "Análisis Exprés™",
    serviceCategory: "Alquiler",
    avatar: "AF",
    avatarColor: "from-emerald-400 to-teal-500",
    rating: 5,
    text:
      "Mi casero no me devolvía la fianza de 1.800€ con excusas absurdas sobre supuestos daños. Justicia Legalia analizó el contrato, detectó que no había inventario firmado y me generó el burofax legal en minutos. En 15 días tenía el dinero en mi cuenta.",
    resultado: "Recuperé 1.800€",
    date: "Hace 3 semanas",
    verified: true,
  },
  {
    id: "t4",
    name: "Roberto Jiménez Torres",
    role: "Ingeniero de Software",
    company: "Telefónica",
    location: "Sevilla",
    service: "Contrato Blindado™",
    serviceCategory: "Consumo",
    avatar: "RJ",
    avatarColor: "from-cyan-400 to-blue-500",
    rating: 5,
    text:
      "Antes de firmar un contrato de freelance con una empresa grande les pedí el Contrato Blindado™. El análisis detectó tres cláusulas abusivas incluyendo una que me impedía trabajar para competidores durante dos años sin compensación. Negocié desde una posición de fuerza.",
    resultado: "Contrato blindado. Ahorro potencial: 8.000€",
    date: "Hace 5 días",
    verified: true,
  },
  {
    id: "t5",
    name: "Patricia Morales Vega",
    role: "Gerente de Operaciones",
    company: "Distribuidora Noratlántica S.L.",
    location: "Bilbao",
    service: "Pack Empresarial™",
    serviceCategory: "Empresas",
    avatar: "PM",
    avatarColor: "from-rose-400 to-pink-500",
    rating: 5,
    text:
      "Llevamos seis meses con el Pack Empresarial™ y ha cambiado completamente cómo gestionamos los contratos con proveedores. Antes tardábamos semanas en revisar un acuerdo comercial. Ahora tenemos respuesta en horas y con criterio jurídico real. El ROI es indiscutible.",
    resultado: "Ahorro de 3.200€ en honorarios externos este semestre",
    date: "Hace 2 meses",
    verified: true,
  },
  {
    id: "t6",
    name: "Alejandro Ruiz Serrano",
    role: "Propietario",
    company: "Hostal El Mirador",
    location: "Granada",
    service: "Escudo Total™",
    serviceCategory: "Contratos",
    avatar: "AR",
    avatarColor: "from-violet-400 to-indigo-500",
    rating: 5,
    text:
      "Tenía un contrato de suministro de maquinaria de cocina con condiciones trampa. Con el Escudo Total™ pude consultar el caso esa misma tarde. El abogado detectó que la cláusula de mantenimiento era nula. Cancelé el contrato sin penalización. Jamás habría lo sabido solo.",
    resultado: "Recuperé 340€ y cancelé contrato abusivo",
    date: "Hace 6 semanas",
    verified: true,
  },
];

// ------------------------------------
// FAQS
// ------------------------------------

export type FAQ = {
  question: string;
  answer: string;
};

export const FAQS: FAQ[] = [
  {
    question: "¿Necesito conocimientos legales para usar Justicia Legalia?",
    answer:
      "En absoluto. Nuestra plataforma está diseñada para que cualquier persona, sin ningún conocimiento jurídico previo, pueda entender su situación legal y actuar. La IA traduce el lenguaje legal a lenguaje humano y tus abogados asignados explican cada paso con claridad. Si algo no está claro, preguntas y te responden. Sin jerga, sin condescendencia.",
  },
  {
    question: "¿Cuánto tiempo tarda en responder el abogado?",
    answer:
      "Tu abogado responde en menos de 2 horas en horario laboral (de lunes a viernes, 9:00 a 19:00). Si contactas fuera de ese horario, recibirás respuesta a primera hora del siguiente día hábil con prioridad máxima. Si incumplimos este compromiso, ese día de servicio es gratuito. Lo monitorizamos nosotros y aplicamos el descuento sin que tengas que pedirlo.",
  },
  {
    question: "¿Qué documentos puedo analizar con el Análisis Exprés™?",
    answer:
      "Cualquier documento legal de hasta 50 páginas: contratos de trabajo, contratos de alquiler, contratos de suministro, hipotecas, multas de tráfico, cartas de deuda, notificaciones de la administración, acuerdos comerciales, condiciones generales de contratación y mucho más. Formatos aceptados: PDF, DOCX, JPG, PNG. Si tienes dudas sobre si tu documento es compatible, sube el análisis igualmente: si no podemos procesarlo, te lo decimos y no se cobra.",
  },
  {
    question: "¿Tengo que pagar aunque no gane el recurso de tráfico?",
    answer:
      "No. El Recurso Garantizado™ funciona en modo éxito compartido: no pagas nada hasta que el recurso sea resuelto favorablemente. Si tu recurso prospera, pagamos un porcentaje del ahorro conseguido. Si el recurso fracasa, no nos debes nada. La única condición es pasar el análisis de viabilidad previo gratuito: si tu caso no tiene base legal sólida, te lo decimos con honestidad y no procedemos.",
  },
  {
    question: "¿Mis datos y documentos están seguros?",
    answer:
      "La seguridad de tus datos es nuestra prioridad absoluta. Toda la información está cifrada en reposo y en tránsito con AES-256. Nuestros servidores están ubicados en Europa (Frankfurt), cumpliendo con el RGPD de manera nativa. Tenemos certificación ISO 27001. Política de no-retención: tus documentos se eliminan automáticamente a los 30 días salvo que solicites conservarlos. Nunca vendemos ni compartimos datos con terceros.",
  },
  {
    question: "¿Puedo cancelar mi suscripción en cualquier momento?",
    answer:
      "Sí, sin penalización y sin formularios complicados. Puedes cancelar desde el panel de cliente en menos de un minuto, o contactar a nuestro equipo. La cancelación es efectiva al final del período facturado en curso. Además, si en los primeros 30 días no estás satisfecho por cualquier motivo, aplicamos el reembolso completo sin preguntas. La transferencia se realiza en 48 horas.",
  },
  {
    question: "¿Los abogados están colegiados?",
    answer:
      "Sí. Todos los abogados que trabajan en Justicia Legalia están colegiados en activo en colegios de abogados españoles. Sus números de colegiación son públicos y visibles en sus perfiles. No contratamos a asesores jurídicos no colegiados ni a estudiantes de derecho. Esto no es solo una cuestión de calidad: es un requisito legal para poder representarte oficialmente.",
  },
  {
    question: "¿En qué tipos de casos puedo recibir ayuda?",
    answer:
      "Cubrimos un espectro muy amplio: multas de tráfico (DGT y municipales), reclamaciones a aerolíneas, disputas de alquiler (fianzas, cláusulas abusivas), revisión y redacción de contratos, derecho laboral (despidos, ERTE, nóminas), derecho de consumo (compras online, garantías, devoluciones), reclamaciones a servicios de telecomunicaciones y suministros, protección de datos y RGPD para empresas, y litigios civiles y mercantiles de mayor complejidad. Si tu caso no encaja en estas categorías, solicita la evaluación gratuita y te orientamos.",
  },
  {
    question: "¿Cómo funciona el Pack Empresarial™ para PYMEs?",
    answer:
      "El Pack Empresarial™ funciona como un departamento jurídico subcontratado a precio de suscripción SaaS. Por 149€/mes, tu empresa tiene acceso ilimitado a consultas por email, teléfono y videollamada (respuesta garantizada en menos de 4 horas), revisión y redacción de contratos comerciales y laborales, gestión de reclamaciones de clientes y proveedores, y auditoría RGPD inicial con mantenimiento trimestral. Sin permanencia, puedes cancelar cuando quieras. Si en cualquier mes superamos las 4 horas de respuesta en más de 3 consultas, ese mes es gratuito, sin que tengas que pedirlo.",
  },
  {
    question: "¿Qué garantías ofrece Justicia Legalia?",
    answer:
      "Ofrecemos tres garantías concretas e incondicionales. Primera: Garantía de Satisfacción 30 días — si no estás satisfecho por cualquier motivo, reembolso completo en 48 horas, sin formularios, sin discusión. Segunda: Garantía de Respuesta — tu abogado responde en menos de 2 horas en horario laboral o ese día es gratuito. Tercera: Garantía de Transparencia — el precio que ves en nuestra web es el precio final, sin costes ocultos ni sorpresas en la factura. Cualquier trabajo adicional se presupuesta por escrito antes de ejecutarse.",
  },
];

// ------------------------------------
// GUARANTEES
// ------------------------------------

export type Guarantee = {
  icon: string;
  title: string;
  description: string;
};

export const GUARANTEES: Guarantee[] = [
  {
    icon: "shield-check",
    title: "Garantía de Satisfacción 30 días",
    description:
      "Si en los primeros 30 días no estás satisfecho por cualquier motivo, reembolso completo. Sin formularios. Sin discusión. Transferencia en 48 horas.",
  },
  {
    icon: "clock",
    title: "Garantía de Respuesta en 2 horas",
    description:
      "Tu abogado responde en menos de 2 horas en horario laboral (9:00-19:00, L-V) o al día siguiente con prioridad máxima. Si incumplimos, ese día de servicio es gratuito. Automáticamente.",
  },
  {
    icon: "eye",
    title: "Garantía de Transparencia de Precios",
    description:
      "El precio que ves en nuestra web es el precio final. Jamás añadiremos costes adicionales sin tu aprobación explícita previa. Cualquier trabajo extra se presupuesta por escrito antes de ejecutarse.",
  },
];

// ------------------------------------
// URGENCY COPY (10 frases)
// ------------------------------------

export const URGENCY_COPY: string[] = [
  "3 personas están viendo este producto ahora mismo",
  "Precio garantizado hasta medianoche de hoy",
  "Última hora para contratar con abogado disponible hoy",
  "Solo quedan 4 plazas de asesoría gratuita esta semana",
  "Los plazos legales no esperan. El tuyo vence pronto.",
  "23 personas contrataron este servicio en las últimas 24h",
  "Oferta de lanzamiento: termina esta semana",
  "Tu documento puede tener cláusulas abusivas. Compruébalo ahora.",
  "Sin cobertura legal, cada día que pasa es un riesgo innecesario",
  "Actívalo hoy. Tu primera consulta es esta tarde.",
];

// ------------------------------------
// HOW IT WORKS
// ------------------------------------

export type HowItWorksStep = {
  number: number;
  icon: string;
  title: string;
  description: string;
};

export const HOW_IT_WORKS: HowItWorksStep[] = [
  {
    number: 1,
    icon: "search",
    title: "Selecciona tu servicio",
    description:
      "Elige el producto que mejor se adapta a tu situación: análisis de documento, recurso de multa, protección familiar o pack empresarial. Si no sabes cuál, el asistente te guía en 30 segundos.",
  },
  {
    number: 2,
    icon: "file-text",
    title: "Completa el formulario en 2 minutos",
    description:
      "Rellena los datos básicos y sube tu documento si aplica. Sin registros complicados ni datos innecesarios. El proceso está diseñado para ser más rápido que llamar a cualquier despacho.",
  },
  {
    number: 3,
    icon: "zap",
    title: "La IA analiza en 60 segundos",
    description:
      "Nuestra IA entrenada en Derecho Español analiza tu caso al instante: identifica riesgos, detecta cláusulas abusivas y genera las recomendaciones de acción. En lenguaje humano, no jurídico.",
  },
  {
    number: 4,
    icon: "user-check",
    title: "Tu abogado está en marcha",
    description:
      "Un abogado colegiado real revisa el análisis, lo valida y se pone en contacto contigo. Tiempo medio desde la contratación hasta el primer contacto: 47 minutos. No la semana que viene. Hoy.",
  },
];

// ------------------------------------
// SOCIAL PROOF BAR
// ------------------------------------

export const SOCIAL_PROOF_BAR = {
  totalClients: 12847,
  successRate: 94.3,
  avgRecovery: "1.240.000€",
  rating: 4.9,
  reviewCount: 8200,
  avgResponseMinutes: 47,
};
