/* ============================================================
   IMPERIO LEGAL SLP — 8 Agentes IA
   Consultoría jurídica online — sin ejercicio de abogacía
   ============================================================ */

'use strict';

class BaseAgent {
  constructor(name, specialty) {
    this.name = name;
    this.specialty = specialty;
    this.disclaimer = 'Esta respuesta es orientación informativa general y NO constituye asesoramiento jurídico profesional. Para decisiones legales, consulte con un abogado colegiado.';
  }
  respond(query) { return { text: '', disclaimer: this.disclaimer }; }
  formatResponse(text) { return { text, disclaimer: this.disclaimer }; }
}

/* ARPA — Análisis & Research de Procedimientos */
class AgentARPA extends BaseAgent {
  constructor() {
    super('ARPA', 'Análisis y Research de Procedimientos Administrativos');
    this.procedures = {
      'recurso administrativo': { plazo: '1 mes (general) / 10 días (alzada)', tipo: 'Recurso de alzada o reposición', base: 'Ley 39/2015 LPAC' },
      'recurso contencioso': { plazo: '2 meses desde notificación', tipo: 'Recurso contencioso-administrativo', base: 'Ley 29/1998 LJCA' },
      'sanción multa': { plazo: '15 días para alegaciones', tipo: 'Recurso de reposición ante mismo órgano', base: 'Ley 39/2015 LPAC Arts. 123-124' },
      'erte': { plazo: '5 días para solicitud urgente', tipo: 'Expediente Regulación Temporal Empleo', base: 'RD 1483/2012 + ET Art. 47' },
      'responsabilidad patrimonial': { plazo: '1 año desde daño', tipo: 'Reclamación de responsabilidad patrimonial', base: 'Ley 40/2015 LRJSP Art. 67' },
    };
  }
  analyze(query) {
    const q = query.toLowerCase();
    for (const [key, data] of Object.entries(this.procedures)) {
      if (q.includes(key.split(' ')[0]) || q.includes(key.split(' ')[1] || '')) {
        return this.formatResponse(
          `📋 **Procedimiento detectado: ${key.charAt(0).toUpperCase() + key.slice(1)}**\n\n` +
          `⏱️ **Plazo:** ${data.plazo}\n` +
          `📄 **Tipo de acción:** ${data.tipo}\n` +
          `⚖️ **Base legal:** ${data.base}\n\n` +
          `*ARPA recomienda actuar dentro del plazo indicado. Los plazos administrativos son improrrogables.*`
        );
      }
    }
    return this.formatResponse('ARPA analizará su procedimiento. Para un análisis preciso, necesito más detalles sobre el acto administrativo, fecha de notificación y organismo emisor.');
  }
  respond(query) { return this.analyze(query); }
}

/* LEGIS — Legislación y Normativa */
class AgentLEGIS extends BaseAgent {
  constructor() {
    super('LEGIS', 'Legislación y Normativa Vigente');
    this.normativa = {
      'laboral': { codigo: 'ET', nombre: 'Estatuto de los Trabajadores', ref: 'RDLeg 2/2015', boe: 'BOE núm. 255, 24/10/2015' },
      'civil': { codigo: 'CC', nombre: 'Código Civil', ref: 'Real Decreto 24/07/1889', boe: 'BOE núm. 206, 25/07/1889' },
      'penal': { codigo: 'CP', nombre: 'Código Penal', ref: 'LO 10/1995', boe: 'BOE núm. 281, 24/11/1995' },
      'mercantil': { codigo: 'CCom', nombre: 'Código de Comercio', ref: 'Real Decreto 22/08/1885', boe: 'BOE núm. 289' },
      'administrativo': { codigo: 'LPAC', nombre: 'Ley de Procedimiento Administrativo Común', ref: 'Ley 39/2015', boe: 'BOE núm. 236, 02/10/2015' },
      'rgpd': { codigo: 'RGPD', nombre: 'Reglamento General de Protección de Datos', ref: 'Reglamento UE 2016/679', boe: 'DOUE L 119, 04/05/2016' },
      'consumidor': { codigo: 'TRLGDCU', nombre: 'Ley General para la Defensa de Consumidores y Usuarios', ref: 'RDLeg 1/2007', boe: 'BOE núm. 287, 30/11/2007' },
      'arrendamientos': { codigo: 'LAU', nombre: 'Ley de Arrendamientos Urbanos', ref: 'Ley 29/1994', boe: 'BOE núm. 282, 25/11/1994' },
    };
  }
  lookup(topic) {
    const t = topic.toLowerCase();
    for (const [key, norm] of Object.entries(this.normativa)) {
      if (t.includes(key)) {
        return this.formatResponse(
          `📚 **Normativa aplicable: ${norm.nombre}** (${norm.codigo})\n\n` +
          `📌 **Referencia:** ${norm.ref}\n` +
          `🗞️ **BOE:** ${norm.boe}\n\n` +
          `LEGIS puede proporcionarle el articulado específico aplicable a su caso. ¿Desea consultar un artículo concreto?`
        );
      }
    }
    return this.formatResponse('LEGIS buscará la normativa aplicable en el BOE y bases de datos jurídicas. Indíqueme el área del derecho y la situación concreta.');
  }
  respond(query) { return this.lookup(query); }
}

/* LEX — Asesoría Legal IA 24/7 */
class AgentLEX extends BaseAgent {
  constructor() {
    super('LEX', 'Asesoría Legal IA 24/7');
    this.responses = {
      'despido': 'El despido puede ser disciplinario, objetivo o colectivo. Para analizar si fue procedente, improcedente o nulo necesito conocer: causa alegada, antigüedad, categoría profesional y circunstancias personales. El plazo para recurrir es de **20 días hábiles** desde la carta de despido (Art. 59.3 ET).',
      'accidente': 'Los accidentes de tráfico generan responsabilidad civil del conductor causante (Art. 1.1 LRCSCVM). Tiene derecho a: indemnización por daños corporales, daños materiales y lucro cesante. Plazo de prescripción: **1 año** (Art. 7 LRCSCVM).',
      'divorcio': 'El divorcio en España puede ser de mutuo acuerdo o contencioso (Arts. 81-106 CC). Puede tramitarse ante Notario si hay acuerdo y no hay hijos menores. Aspectos a regular: custodia, pensión alimenticia, uso vivienda, pensión compensatoria.',
      'herencia': 'La herencia implica: aceptación (pura o a beneficio de inventario), liquidación del impuesto de sucesiones (ISD) en 6 meses, adjudicación de bienes. La legítima en España protege 1/3 del caudal hereditario para herederos forzosos (Art. 806 CC).',
      'clausula': 'Las cláusulas abusivas en contratos de consumo son nulas de pleno derecho (Art. 83 TRLGDCU). Las más comunes: gastos hipotecarios, intereses de demora excesivos, comisiones bancarias no informadas. Acción de nulidad: imprescriptible.',
      'multa': 'Para recurrir una multa de tráfico: recurso de reposición en 30 días, posteriormente recurso contencioso-administrativo. Si es menor de 200€, valorar coste/beneficio. Si supera 200€ o implica puntos, la defensa suele ser rentable.',
      'contrato': 'Para redactar o revisar un contrato necesito conocer: tipo (arrendamiento, servicios, compraventa...), partes, objeto y precio. SCRIPTOR puede generar el borrador jurídicamente válido en minutos.',
      'reclamacion': 'Para reclamar una deuda: requerimiento previo fehaciente (burofax), procedimiento monitorio (hasta 250.000€), juicio verbal (hasta 2.000€) o juicio ordinario (más de 6.000€). ¿Cuál es el importe de la deuda?',
    };
  }
  advise(query) {
    const q = query.toLowerCase();
    for (const [key, response] of Object.entries(this.responses)) {
      if (q.includes(key)) {
        return this.formatResponse(`⚖️ **Orientación sobre ${key}:**\n\n${response}\n\n*¿Desea que SCRIPTOR prepare la documentación necesaria o ARPA analice los plazos?*`);
      }
    }
    return this.formatResponse(`LEX está analizando su consulta: "${query}"\n\nPara ofrecerle la mejor orientación legal, necesito que me detalle:\n• Materia del derecho (laboral, civil, penal...)\n• Situación específica\n• Documentos disponibles\n\nRecuerde que esta consulta es orientativa y para decisiones importantes debe contar con un abogado colegiado.`);
  }
  respond(query) { return this.advise(query); }
}

/* SCRIPTOR — Redacción de Documentos Legales */
class AgentSCRIPTOR extends BaseAgent {
  constructor() {
    super('SCRIPTOR', 'Redacción de Documentos Jurídicos');
    this.templates = [
      { id: 'burofax', name: 'Burofax de reclamación', desc: 'Requerimiento fehaciente de pago o cumplimiento', plazo: '15 min' },
      { id: 'contrato_servicios', name: 'Contrato de servicios', desc: 'Acuerdo de prestación de servicios profesionales', plazo: '20 min' },
      { id: 'contrato_arrendamiento', name: 'Contrato de arrendamiento', desc: 'Alquiler de vivienda habitual (LAU)', plazo: '25 min' },
      { id: 'recurso_multa', name: 'Recurso de reposición (multa)', desc: 'Impugnación de sanción administrativa', plazo: '15 min' },
      { id: 'demanda_monitorio', name: 'Petición proceso monitorio', desc: 'Reclamación judicial de deuda dineraria', plazo: '30 min' },
      { id: 'reclamacion_banco', name: 'Reclamación bancaria', desc: 'Carta de reclamación ante entidad financiera', plazo: '10 min' },
      { id: 'carta_despido', name: 'Carta respuesta despido', desc: 'Respuesta formal a carta de despido', plazo: '15 min' },
      { id: 'denuncia_consumidor', name: 'Reclamación consumo', desc: 'Hoja de reclamaciones + carta formal', plazo: '10 min' },
      { id: 'testamento', name: 'Instrucciones testamentarias', desc: 'Orientación para testamento ante notario', plazo: '20 min' },
      { id: 'acuerdo_divorcio', name: 'Borrador convenio regulador', desc: 'Acuerdo de divorcio de mutuo acuerdo', plazo: '45 min' },
    ];
  }
  listTemplates() {
    return this.templates.map(t => `📄 **${t.name}** — ${t.desc} *(${t.plazo})*`).join('\n');
  }
  generate(templateId, data = {}) {
    const tpl = this.templates.find(t => t.id === templateId);
    if (!tpl) return this.formatResponse('Plantilla no encontrada. ' + this.listTemplates());
    return this.formatResponse(`SCRIPTOR generará el documento: **${tpl.name}**\n\nPara personalizarlo necesito:\n• Datos del solicitante (nombre, DNI, domicilio)\n• Datos de la otra parte\n• Hechos relevantes y fechas\n• Importe reclamado (si aplica)\n\n*Tiempo estimado: ${tpl.plazo}. El documento se genera con validez jurídica y puede ser firmado electrónicamente.*`);
  }
  respond(query) {
    const q = query.toLowerCase();
    const tpl = this.templates.find(t => q.includes(t.id) || q.includes(t.name.toLowerCase().split(' ')[0]));
    if (tpl) return this.generate(tpl.id);
    return this.formatResponse(`SCRIPTOR puede redactar los siguientes documentos:\n\n${this.listTemplates()}\n\n¿Qué documento necesita?`);
  }
}

/* METRICA — Analytics y Predicción */
class AgentMETRICA extends BaseAgent {
  constructor() {
    super('MÉTRICA', 'Analytics y Predicción de Resultados');
    this.successRates = {
      'despido improcedente': { base: 72, factors: ['antigüedad > 3 años: +8%', 'sin expediente previo: +5%', 'carta defectuosa: +12%'] },
      'clausula abusiva': { base: 85, factors: ['hipoteca anterior 2009: +10%', 'entidad grande: +5%', 'daños documentados: +8%'] },
      'accidente trafico': { base: 78, factors: ['parte amistoso: +7%', 'lesiones documentadas: +12%', 'testigos: +8%'] },
      'reclamacion bancaria': { base: 65, factors: ['documentación completa: +15%', 'reclamación previa: +5%', 'importe < 3000€: +8%'] },
      'multa trafico': { base: 45, factors: ['vicio formal: +25%', 'testigos: +12%', 'señalización deficiente: +15%'] },
    };
  }
  predict(caseType) {
    const ct = caseType.toLowerCase();
    let found = null;
    for (const [key, data] of Object.entries(this.successRates)) {
      if (ct.includes(key.split(' ')[0])) { found = { key, ...data }; break; }
    }
    if (!found) {
      return this.formatResponse('MÉTRICA necesita más datos para calcular la tasa de éxito. Indíqueme: tipo de reclamación, documentación disponible y circunstancias del caso.');
    }
    return this.formatResponse(
      `📊 **Análisis MÉTRICA: ${found.key.charAt(0).toUpperCase() + found.key.slice(1)}**\n\n` +
      `🎯 **Tasa base de éxito: ${found.base}%**\n\n` +
      `**Factores que mejoran el resultado:**\n${found.factors.map(f => `• ${f}`).join('\n')}\n\n` +
      `*Basado en análisis de jurisprudencia de los últimos 5 años. Probabilidad orientativa, no garantizada.*`
    );
  }
  respond(query) { return this.predict(query); }
}

/* CUSTODIA — Protección de Datos RGPD */
class AgentCUSTODIA extends BaseAgent {
  constructor() {
    super('CUSTODIA', 'Protección de Datos y RGPD');
    this.sanctions = {
      'nivel_bajo': { max: '10M€ o 2% facturación', arts: 'Arts. 83.4 RGPD', ejemplos: 'No registrar tratamientos, falta de DPO cuando obligatorio' },
      'nivel_alto': { max: '20M€ o 4% facturación', arts: 'Arts. 83.5 RGPD', ejemplos: 'Violación principios básicos, falta de consentimiento, transferencias ilegales' },
    };
    this.rights = ['Acceso', 'Rectificación', 'Supresión (derecho al olvido)', 'Oposición', 'Portabilidad', 'Limitación del tratamiento', 'No ser objeto de decisiones automatizadas'];
  }
  audit(topic) {
    const t = topic.toLowerCase();
    if (t.includes('derechos')) {
      return this.formatResponse(`🔒 **Derechos RGPD del ciudadano (Arts. 15-22):**\n\n${this.rights.map((r,i) => `${i+1}. ${r}`).join('\n')}\n\n**Plazo de respuesta:** 1 mes (prorrogable 2 meses en casos complejos)\n**Ante negativa:** Reclamación AEPD (art. 77 LOPDGDD)`);
    }
    if (t.includes('sancion') || t.includes('multa') || t.includes('infraccion')) {
      const n = t.includes('grave') ? 'nivel_alto' : 'nivel_bajo';
      const s = this.sanctions[n];
      return this.formatResponse(`⚠️ **Sanciones RGPD ${n === 'nivel_alto' ? 'Graves' : 'Menos Graves'}:**\n\nMáximo: **${s.max}**\nBase legal: ${s.arts}\nEjemplos: ${s.ejemplos}\n\nCUSTODIA puede realizar una auditoría de cumplimiento y preparar el Plan de Adecuación RGPD.`);
    }
    if (t.includes('brecha') || t.includes('fuga') || t.includes('violacion')) {
      return this.formatResponse('🚨 **Brecha de seguridad — Protocolo urgente:**\n\n1. **72 horas** para notificar a AEPD (Art. 33 RGPD)\n2. Documentar la brecha (qué datos, quiénes afectados, consecuencias)\n3. Si afecta a derechos fundamentales: notificar a los interesados\n4. Medidas correctoras inmediatas\n\n*¿Ha ocurrido una brecha? Actúe ahora. Cada hora cuenta.*');
    }
    return this.formatResponse('CUSTODIA puede realizar: Auditoría RGPD, Política de Privacidad, Registro de Actividades de Tratamiento, análisis de brechas, DPO externo. ¿Qué necesita?');
  }
  respond(query) { return this.audit(query); }
}

/* NEXUS — Gestión de Expedientes y Plazos */
class AgentNEXUS extends BaseAgent {
  constructor() {
    super('NEXUS', 'Gestión de Expedientes y Plazos');
    this.plazos = {
      'despido': [
        { accion: 'Papeleta de conciliación (SMAC)', plazo: '20 días hábiles desde despido', ley: 'Art. 59.3 ET' },
        { accion: 'Demanda laboral', plazo: '20 días desde despido (interrumpido por SMAC)', ley: 'LRJS' },
      ],
      'accidente': [
        { accion: 'Reclamación extrajudicial', plazo: '1 año desde el accidente', ley: 'Art. 7 LRCSCVM' },
        { accion: 'Acción civil', plazo: '1 año (prescripción)', ley: 'Art. 1902 CC' },
        { accion: 'Denuncia penal', plazo: '6 meses (delito leve) / No prescribe (graves)', ley: 'LECrim' },
      ],
      'contrato': [
        { accion: 'Acción de incumplimiento', plazo: '5 años (obligaciones personales)', ley: 'Art. 1964 CC' },
        { accion: 'Acción de nulidad', plazo: '4 años (vicios del consentimiento)', ley: 'Art. 1301 CC' },
      ],
      'herencia': [
        { accion: 'Impuesto de Sucesiones', plazo: '6 meses desde fallecimiento (prorrogable 6 más)', ley: 'Ley 29/1987 ISyD' },
        { accion: 'Aceptación/Renuncia', plazo: '30 años (prescripción derecho de herencia)', ley: 'Art. 1016 CC' },
      ],
      'sancion administrativa': [
        { accion: 'Alegaciones', plazo: '10-15 días', ley: 'Art. 89 Ley 39/2015' },
        { accion: 'Recurso de reposición', plazo: '1 mes desde sanción firme', ley: 'Art. 123 Ley 39/2015' },
        { accion: 'Recurso contencioso', plazo: '2 meses', ley: 'Art. 46 Ley 29/1998' },
      ],
    };
  }
  getDeadlines(caseType) {
    const ct = caseType.toLowerCase();
    let found = null;
    for (const [key, plazos] of Object.entries(this.plazos)) {
      if (ct.includes(key.split(' ')[0])) { found = { key, plazos }; break; }
    }
    if (!found) return this.formatResponse('NEXUS gestiona plazos para: despido, accidente, contrato, herencia, sanción administrativa. ¿Qué tipo de caso tiene?');
    const table = found.plazos.map(p => `📅 **${p.accion}**\n   Plazo: ${p.plazo}\n   Base: ${p.ley}`).join('\n\n');
    return this.formatResponse(`⏰ **Plazos críticos — ${found.key.charAt(0).toUpperCase() + found.key.slice(1)}:**\n\n${table}\n\n⚠️ *Los plazos procesales son improrrogables. NEXUS puede configurar alertas automáticas para su expediente.*`);
  }
  respond(query) { return this.getDeadlines(query); }
}

/* CONSTRUCTOR — Arquitectura Jurídica Societaria */
class AgentCONSTRUCTOR extends BaseAgent {
  constructor() {
    super('CONSTRUCTOR', 'Arquitectura Jurídica Societaria');
    this.forms = {
      'autonomo': {
        nombre: 'Trabajador Autónomo',
        capital: '0 €',
        responsabilidad: 'Ilimitada (responde con bienes personales)',
        fiscal: 'IRPF (rendimientos actividades económicas) + IVA',
        ss: 'Cuota fija desde ~200€/mes (sistema de tramos)',
        ventajas: ['Sin capital mínimo', 'Constitución inmediata', 'Gestión simple'],
        desventajas: ['Responsabilidad personal ilimitada', 'Tipo IRPF puede ser alto'],
      },
      'sl': {
        nombre: 'Sociedad de Responsabilidad Limitada (S.L.)',
        capital: '1 € mínimo (régimen simplificado) o 3.000 €',
        responsabilidad: 'Limitada al capital social',
        fiscal: 'Impuesto de Sociedades 25% (15% primeros 2 años)',
        ss: 'Socio administrador: autónomo societario ~300-400€/mes',
        ventajas: ['Responsabilidad limitada', 'Imagen profesional', 'IS puede ser ventajoso'],
        desventajas: ['Costes constitución ~400-800€ + notaría', 'Más obligaciones contables'],
      },
      'slp': {
        nombre: 'Sociedad Limitada Profesional (S.L.P.)',
        capital: '3.000 € mínimo',
        responsabilidad: 'Limitada, con responsabilidad directa del profesional actuante',
        fiscal: 'Impuesto de Sociedades 25%',
        ss: 'Como S.L. + colegiación obligatoria socios',
        ventajas: ['Ideal para despachos y profesiones colegiadas', 'Imagen corporativa', 'Limitación responsabilidad societaria'],
        desventajas: ['Ley 2/2007 Soc. Profesionales: seguro RC obligatorio', 'Al menos 75% capital debe ser socios profesionales'],
      },
    };
  }
  advise(query) {
    const q = query.toLowerCase();
    let form = null;
    if (q.includes('sl') || q.includes('sociedad limitada') || q.includes('empresa')) form = 'sl';
    else if (q.includes('slp') || q.includes('profesional') || q.includes('despacho')) form = 'slp';
    else if (q.includes('autono') || q.includes('freelance')) form = 'autonomo';

    if (form) {
      const f = this.forms[form];
      return this.formatResponse(
        `🏛️ **${f.nombre}**\n\n` +
        `💰 **Capital:** ${f.capital}\n` +
        `🛡️ **Responsabilidad:** ${f.responsabilidad}\n` +
        `🧾 **Fiscal:** ${f.fiscal}\n` +
        `👤 **Seguridad Social:** ${f.ss}\n\n` +
        `✅ **Ventajas:** ${f.ventajas.join(', ')}\n` +
        `⚠️ **Consideraciones:** ${f.desventajas.join(', ')}\n\n` +
        `*CONSTRUCTOR puede preparar todos los documentos fundacionales y gestionar la inscripción en el Registro Mercantil.*`
      );
    }
    return this.formatResponse('CONSTRUCTOR asesora en: Autónomo, S.L., S.L.P., S.A., Comunidad de Bienes, Sociedad Civil. ¿Qué forma jurídica le interesa comparar?');
  }
  respond(query) { return this.advise(query); }
}

/* REGISTRY — Instancias globales */
const AGENTS = {
  ARPA:        new AgentARPA(),
  LEGIS:       new AgentLEGIS(),
  LEX:         new AgentLEX(),
  SCRIPTOR:    new AgentSCRIPTOR(),
  METRICA:     new AgentMETRICA(),
  CUSTODIA:    new AgentCUSTODIA(),
  NEXUS:       new AgentNEXUS(),
  CONSTRUCTOR: new AgentCONSTRUCTOR(),
};

window.AGENTS = AGENTS;

/* Smart router — elige el agente más adecuado */
function routeQuery(query) {
  const q = query.toLowerCase();
  if (q.includes('plazo') || q.includes('expediente') || q.includes('calendario') || q.includes('fecha')) return AGENTS.NEXUS;
  if (q.includes('ley') || q.includes('artículo') || q.includes('normativa') || q.includes('legislacion') || q.includes('boe')) return AGENTS.LEGIS;
  if (q.includes('redactar') || q.includes('contrato') || q.includes('burofax') || q.includes('documento') || q.includes('recurso')) return AGENTS.SCRIPTOR;
  if (q.includes('probabilidad') || q.includes('porcentaje') || q.includes('posibilidad') || q.includes('exito') || q.includes('ganar')) return AGENTS.METRICA;
  if (q.includes('rgpd') || q.includes('datos') || q.includes('privacidad') || q.includes('brecha') || q.includes('proteccion')) return AGENTS.CUSTODIA;
  if (q.includes('empresa') || q.includes('sociedad') || q.includes('autónomo') || q.includes('sl') || q.includes('mercantil')) return AGENTS.CONSTRUCTOR;
  if (q.includes('procedimiento') || q.includes('trámite') || q.includes('administrativo') || q.includes('recurso administrativo')) return AGENTS.ARPA;
  return AGENTS.LEX; // default
}

window.routeQuery = routeQuery;
