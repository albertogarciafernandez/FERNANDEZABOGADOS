/* ============================================================
   IMPERIO LEGAL SLP — 6 Calculadoras Jurídicas
   Todas las fórmulas son orientativas y no constituyen
   consejo jurídico (disclaimer legal automático)
   ============================================================ */

'use strict';

const DISCLAIMER = '⚠️ Cálculo orientativo. Las cantidades finales dependen de convenio colectivo aplicable, sentencia judicial y circunstancias del caso. Consulte con abogado.';
const SMI_2026 = 1184; // SMI mensual 2026 (14 pagas)
const SMI_DIARIO = (SMI_2026 * 14) / 365;

/* ── 1. CALCULADORA DE DESPIDO ── */
function calcDespido() {
  const salarioBruto = parseFloat(document.getElementById('calc-salario').value) || 0;
  const antiguedadAnios = parseFloat(document.getElementById('calc-antiguedad').value) || 0;
  const tipoDespido = document.getElementById('calc-tipo-despido').value;

  if (!salarioBruto || !antiguedadAnios) {
    showCalcError('despido', 'Introduce salario y antigüedad.');
    return;
  }

  const salarioDiario = (salarioBruto * 14) / 365;
  let diasPorAnio, nombre;

  switch (tipoDespido) {
    case 'improcedente':
      diasPorAnio = 33;
      nombre = 'Despido improcedente';
      break;
    case 'objetivo':
      diasPorAnio = 20;
      nombre = 'Despido objetivo';
      break;
    case 'disciplinario_proc':
      showCalcResult('despido', '0 €', 'Despido disciplinario procedente: sin indemnización.', nombre);
      return;
    case 'nulo':
      showCalcResult('despido', 'Readmisión + salarios', 'Despido nulo: derecho a readmisión con salarios de tramitación.', 'Despido nulo');
      return;
    default:
      diasPorAnio = 33;
      nombre = 'Despido';
  }

  const topes = {
    improcedente: { diasMax: 33 * 20, aniosMax: 20 },
    objetivo: { diasMax: 20 * 12, aniosMax: 12 },
  };

  const tope = topes[tipoDespido] || topes.improcedente;
  const diasTotales = Math.min(diasPorAnio * antiguedadAnios, tope.diasMax);
  const indemnizacion = salarioDiario * diasTotales;
  const indemnizacionMax = salarioDiario * tope.diasMax;

  showCalcResult(
    'despido',
    formatEuros(indemnizacion),
    `${nombre}: ${diasPorAnio} días/año × ${antiguedadAnios} año(s) = ${diasTotales.toFixed(1)} días. Límite: ${tope.diasMax} días (${tope.aniosMax} años). Salario diario: ${formatEuros(salarioDiario)}/día.\n${DISCLAIMER}`
  );
}

/* ── 2. CALCULADORA PENSIÓN ALIMENTICIA ── */
function calcAlimentos() {
  const ingresosPagador = parseFloat(document.getElementById('calc-ingresos-pagador').value) || 0;
  const ingresosReceptor = parseFloat(document.getElementById('calc-ingresos-receptor').value) || 0;
  const numHijos = parseInt(document.getElementById('calc-num-hijos').value) || 1;

  if (!ingresosPagador) {
    showCalcError('alimentos', 'Introduce los ingresos del pagador.');
    return;
  }

  // Fórmula orientativa basada en tablas del CGPJ
  const totalIngresos = ingresosPagador + ingresosReceptor;
  const participacionPagador = totalIngresos > 0 ? ingresosPagador / totalIngresos : 0.6;
  const necesidadesBase = numHijos * 350; // estimación necesidades básicas
  const pension = Math.max(necesidadesBase * participacionPagador, SMI_2026 * 0.25 * numHijos);
  const pensionMax = ingresosPagador * 0.35; // tope habitual jurisprudencial

  showCalcResult(
    'alimentos',
    `${formatEuros(Math.min(pension, pensionMax))}/mes`,
    `Estimación para ${numHijos} hijo(s). Rango orientativo: ${formatEuros(pension * 0.8)} – ${formatEuros(pensionMax)}/mes. El juez valorará: necesidades reales, capacidad económica, régimen de custodia y nivel de vida familiar.\n${DISCLAIMER}`
  );
}

/* ── 3. CALCULADORA DE PLAZOS LEGALES ── */
function calcPlazos() {
  const fechaInicio = document.getElementById('calc-fecha-inicio').value;
  const tipoPlazo = document.getElementById('calc-tipo-plazo').value;

  if (!fechaInicio) {
    showCalcError('plazos', 'Introduce la fecha del hecho.');
    return;
  }

  const inicio = new Date(fechaInicio);
  const hoy = new Date();

  const plazos = {
    despido_20dias:       { dias: 20, tipo: 'hábiles', nombre: 'Recurso despido (papeleta conciliación)' },
    despido_20dias_lab:   { dias: 20, tipo: 'hábiles', nombre: 'Demanda laboral por despido' },
    administrativo_1mes:  { dias: 30, tipo: 'naturales', nombre: 'Recurso de reposición administrativo' },
    contencioso_2meses:   { dias: 60, tipo: 'naturales', nombre: 'Recurso contencioso-administrativo' },
    civil_prescripcion:   { dias: 5 * 365, tipo: 'naturales', nombre: 'Prescripción acción personal (5 años)' },
    trafico_1anio:        { dias: 365, tipo: 'naturales', nombre: 'Prescripción accidente de tráfico' },
    herencia_6meses:      { dias: 180, tipo: 'naturales', nombre: 'Impuesto de Sucesiones' },
    clausula_abusiva:     { dias: 0, tipo: 'imprescriptible', nombre: 'Nulidad cláusula abusiva (imprescriptible)' },
    despido_60dias_obj:   { dias: 60, tipo: 'naturales', nombre: 'Impugnación despido objetivo (caducidad)' },
  };

  const plazoData = plazos[tipoPlazo];
  if (!plazoData) { showCalcError('plazos', 'Selecciona un tipo de plazo.'); return; }

  if (plazoData.tipo === 'imprescriptible') {
    showCalcResult('plazos', 'Sin plazo', 'Acción imprescriptible — puede ejercitarse en cualquier momento.', plazoData.nombre);
    return;
  }

  let fechaFin = new Date(inicio);
  if (plazoData.tipo === 'hábiles') {
    let diasContados = 0;
    while (diasContados < plazoData.dias) {
      fechaFin.setDate(fechaFin.getDate() + 1);
      const dia = fechaFin.getDay();
      if (dia !== 0 && dia !== 6) diasContados++;
    }
  } else {
    fechaFin.setDate(fechaFin.getDate() + plazoData.dias);
  }

  const diasRestantes = Math.ceil((fechaFin - hoy) / (1000 * 60 * 60 * 24));
  const vencido = diasRestantes < 0;
  const urgente = diasRestantes >= 0 && diasRestantes <= 5;

  const estado = vencido ? '🚨 PLAZO VENCIDO' : urgente ? `⚠️ URGENTE — Quedan ${diasRestantes} días` : `✅ Tiempo restante: ${diasRestantes} días`;

  showCalcResult(
    'plazos',
    formatDate(fechaFin),
    `${plazoData.nombre}\nFecha límite: ${formatDate(fechaFin)}\n${estado}\n${DISCLAIMER}`
  );
}

/* ── 4. CALCULADORA COSTAS PROCESALES ── */
function calcCostas() {
  const cuantia = parseFloat(document.getElementById('calc-cuantia').value) || 0;
  const tipoJuicio = document.getElementById('calc-tipo-juicio').value;

  if (!cuantia) { showCalcError('costas', 'Introduce la cuantía del procedimiento.'); return; }

  const tarifas = {
    verbal:      { base: 120, porcentaje: 0.02, nombre: 'Juicio Verbal', max: 600 },
    ordinario:   { base: 300, porcentaje: 0.025, nombre: 'Juicio Ordinario', max: 2000 },
    laboral:     { base: 180, porcentaje: 0.02, nombre: 'Procedimiento Laboral', max: 1200 },
    contencioso: { base: 400, porcentaje: 0.03, nombre: 'Contencioso-Administrativo', max: 4000 },
    monitorio:   { base: 60,  porcentaje: 0.015, nombre: 'Proceso Monitorio', max: 400 },
  };

  const tarifa = tarifas[tipoJuicio] || tarifas.ordinario;
  const honorariosAbogado = Math.min(tarifa.base + cuantia * tarifa.porcentaje, tarifa.max);
  const honorariosProcurador = honorariosAbogado * 0.6;
  const tasasJudiciales = tipoJuicio === 'contencioso' ? Math.min(200 + cuantia * 0.004, 10000) : 0;
  const total = honorariosAbogado + honorariosProcurador + tasasJudiciales;

  showCalcResult(
    'costas',
    formatEuros(total),
    `${tarifa.nombre} — Cuantía: ${formatEuros(cuantia)}\n• Honorarios abogado (orientativos): ${formatEuros(honorariosAbogado)}\n• Honorarios procurador: ${formatEuros(honorariosProcurador)}\n• Tasas judiciales: ${formatEuros(tasasJudiciales)}\n\n${DISCLAIMER}`
  );
}

/* ── 5. CALCULADORA IMPUESTO SUCESIONES ── */
function calcSucesiones() {
  const baseImponible = parseFloat(document.getElementById('calc-base-sucesiones').value) || 0;
  const parentesco = document.getElementById('calc-parentesco').value;
  const ccaa = document.getElementById('calc-ccaa').value;

  if (!baseImponible) { showCalcError('sucesiones', 'Introduce el valor de la herencia.'); return; }

  // Reducciones por parentesco (base estatal — las CC.AA. pueden mejorar)
  const reducciones = {
    'conyuge': 15957,
    'hijo_menor': 47859,
    'hijo_mayor': 15957,
    'nieto': 15957,
    'hermano': 7993,
    'otro': 0,
  };
  const reduction = reducciones[parentesco] || 0;
  const baseL = Math.max(baseImponible - reduction, 0);

  // Tarifa estatal Art. 21 Ley 29/1987
  let cuota = 0;
  const tramos = [
    [7993,   0,      7.65],
    [7987,   611.5,  8.50],
    [7987,   1290.43, 9.35],
    [7987,   2037.26, 10.20],
    [7987,   2851.98, 11.05],
    [7987,   3734.59, 11.90],
    [7987,   4685.10, 12.75],
    [7987,   5703.50, 13.60],
    [7987,   6789.79, 14.45],
    [7987,   7943.98, 15.30],
    [39877,  9144.06, 16.15],
    [39877,  15606.22, 18.70],
    [79754,  23063.25, 21.25],
    [239389, 39877.48, 25.50],
    [398778, 101251.28, 29.75],
    [Infinity, 219939.36, 34.00],
  ];

  let resto = baseL;
  for (const [limite, base, tipo] of tramos) {
    if (resto <= 0) break;
    const aplicable = Math.min(resto, limite);
    cuota += aplicable * tipo / 100;
    resto -= aplicable;
  }

  const reduccionesCCAA = { 'madrid': 0.99, 'andalucia': 0.99, 'cataluna': 0.80, 'otras': 1 };
  const coefCCAA = reduccionesCCAA[ccaa] || 1;
  const cuotaFinal = cuota * coefCCAA;

  const etiquetaCCAA = { madrid: 'Madrid (bonificación 99%)', andalucia: 'Andalucía (bonificación 99%)', cataluna: 'Cataluña (bonificación 20% aprox.)', otras: 'Otras CC.AA.' };

  showCalcResult(
    'sucesiones',
    formatEuros(cuotaFinal),
    `Base imponible: ${formatEuros(baseImponible)} | Reducción: ${formatEuros(reduction)}\nBase liquidable: ${formatEuros(baseL)}\nCuota estatal: ${formatEuros(cuota)}\nCC.AA.: ${etiquetaCCAA[ccaa] || ccaa}\nCuota a pagar: ${formatEuros(cuotaFinal)}\n\nPlazo: 6 meses desde fallecimiento (prorrogables 6 más).\n${DISCLAIMER}`
  );
}

/* ── 6. CALCULADORA BIENES GANANCIALES ── */
function calcGananciales() {
  const bienesComunes = parseFloat(document.getElementById('calc-bienes-comunes').value) || 0;
  const deudasComunes = parseFloat(document.getElementById('calc-deudas-comunes').value) || 0;
  const bienesPriv1 = parseFloat(document.getElementById('calc-bienes-priv1').value) || 0;
  const bienesPriv2 = parseFloat(document.getElementById('calc-bienes-priv2').value) || 0;

  const patrimonioNeto = bienesComunes - deudasComunes;
  const mitadCada = Math.max(patrimonioNeto / 2, 0);
  const total1 = bienesPriv1 + mitadCada;
  const total2 = bienesPriv2 + mitadCada;

  showCalcResult(
    'gananciales',
    `${formatEuros(mitadCada)} c/u`,
    `Patrimonio ganancial neto: ${formatEuros(patrimonioNeto)}\nMitad por cónyuge: ${formatEuros(mitadCada)}\n\nCónyuge 1: ${formatEuros(bienesPriv1)} privativos + ${formatEuros(mitadCada)} = **${formatEuros(total1)}**\nCónyuge 2: ${formatEuros(bienesPriv2)} privativos + ${formatEuros(mitadCada)} = **${formatEuros(total2)}**\n\nArt. 1344-1410 CC — régimen ganancial. Requiere escritura de liquidación ante notario.\n${DISCLAIMER}`
  );
}

/* ── HELPERS ── */
function formatEuros(n) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(n);
}

function formatDate(d) {
  return new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }).format(d);
}

function showCalcResult(id, value, note) {
  const el = document.getElementById(`result-${id}`);
  if (!el) return;
  el.classList.add('visible');
  const valEl = el.querySelector('.calc-result-value');
  const noteEl = el.querySelector('.calc-result-note');
  if (valEl) valEl.textContent = value;
  if (noteEl) noteEl.textContent = note;
}

function showCalcError(id, msg) {
  const el = document.getElementById(`result-${id}`);
  if (!el) return;
  el.classList.add('visible');
  const valEl = el.querySelector('.calc-result-value');
  const noteEl = el.querySelector('.calc-result-note');
  if (valEl) valEl.textContent = '—';
  if (noteEl) noteEl.textContent = msg;
}

/* Expose globally */
window.calcDespido = calcDespido;
window.calcAlimentos = calcAlimentos;
window.calcPlazos = calcPlazos;
window.calcCostas = calcCostas;
window.calcSucesiones = calcSucesiones;
window.calcGananciales = calcGananciales;
