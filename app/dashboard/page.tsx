'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  MessageSquare,
  CreditCard,
  Gift,
  Bell,
  ChevronRight,
  TrendingUp,
  Shield,
  Zap,
  Clock,
  CheckCircle2,
  AlertCircle,
  Hourglass,
  Upload,
  Plus,
  ArrowUpRight,
  Star,
  Scale,
  FileCheck,
} from 'lucide-react'

// ─── Types ─────────────────────────────────────────────────────────────────────

type CaseStatus = 'en-proceso' | 'ganado' | 'pendiente-docs' | 'en-revision'

interface LegalCase {
  id: string
  tipo: string
  descripcion: string
  fechaInicio: string
  estado: CaseStatus
  abogado: string
  proximoPaso: string
  icono: React.ElementType
  color: string
}

interface Document {
  id: string
  nombre: string
  tipo: string
  fecha: string
  estado: 'procesado' | 'analizando' | 'pendiente'
  caso: string
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_CASES: LegalCase[] = [
  {
    id: 'EXP-2026-001',
    tipo: 'Recurso de Multa DGT',
    descripcion: 'Recurso contra multa radar N-IV km 234 · 400€ + 3 puntos',
    fechaInicio: '08/01/2026',
    estado: 'en-proceso',
    abogado: 'Dra. Carmen Ruiz',
    proximoPaso: 'Presentación recurso ante DGT — plazo 14/06/2026',
    icono: Scale,
    color: '#2563EB',
  },
  {
    id: 'EXP-2026-002',
    tipo: 'Contrato Blindado™',
    descripcion: 'Revisión contrato arrendamiento local comercial · 18.000€/año',
    fechaInicio: '14/03/2026',
    estado: 'ganado',
    abogado: 'D. Marcos Herrera',
    proximoPaso: 'Caso resuelto — 3 cláusulas abusivas eliminadas',
    icono: FileCheck,
    color: '#059669',
  },
  {
    id: 'EXP-2026-003',
    tipo: 'Escudo Total™',
    descripcion: 'Consulta laboral — ERE preventivo empresa cliente',
    fechaInicio: '02/05/2026',
    estado: 'pendiente-docs',
    abogado: 'D. Álvaro Méndez',
    proximoPaso: 'Sube el contrato y últimas 3 nóminas para continuar',
    icono: Shield,
    color: '#D97706',
  },
  {
    id: 'EXP-2026-004',
    tipo: 'Análisis Exprés™',
    descripcion: 'Análisis cláusulas contrato de compraventa vivienda · 245.000€',
    fechaInicio: '19/05/2026',
    estado: 'en-revision',
    abogado: 'IA + Dra. Carmen Ruiz',
    proximoPaso: 'Análisis IA completado — revisión humana en progreso',
    icono: Zap,
    color: '#D4AF37',
  },
]

const MOCK_DOCUMENTS: Document[] = [
  {
    id: 'doc-001',
    nombre: 'Contrato_Arrendamiento_Local.pdf',
    tipo: 'PDF',
    fecha: '14/03/2026',
    estado: 'procesado',
    caso: 'EXP-2026-002',
  },
  {
    id: 'doc-002',
    nombre: 'Notificacion_DGT_Multa.pdf',
    tipo: 'PDF',
    fecha: '08/01/2026',
    estado: 'procesado',
    caso: 'EXP-2026-001',
  },
  {
    id: 'doc-003',
    nombre: 'Contrato_Compraventa.pdf',
    tipo: 'PDF',
    fecha: '19/05/2026',
    estado: 'analizando',
    caso: 'EXP-2026-004',
  },
]

// ─── Status config ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  CaseStatus,
  { label: string; color: string; bg: string; border: string; icon: React.ElementType }
> = {
  'en-proceso': {
    label: 'En proceso',
    color: 'text-[#60A5FA]',
    bg: 'bg-[rgba(37,99,235,0.12)]',
    border: 'border-[rgba(37,99,235,0.25)]',
    icon: Clock,
  },
  ganado: {
    label: 'Resuelto',
    color: 'text-[#34D399]',
    bg: 'bg-[rgba(5,150,105,0.12)]',
    border: 'border-[rgba(5,150,105,0.25)]',
    icon: CheckCircle2,
  },
  'pendiente-docs': {
    label: 'Pendiente documentos',
    color: 'text-[#FBBF24]',
    bg: 'bg-[rgba(217,119,6,0.12)]',
    border: 'border-[rgba(217,119,6,0.25)]',
    icon: AlertCircle,
  },
  'en-revision': {
    label: 'En revisión',
    color: 'text-[#A78BFA]',
    bg: 'bg-[rgba(124,58,237,0.12)]',
    border: 'border-[rgba(124,58,237,0.25)]',
    icon: Hourglass,
  },
}

// ─── Stat card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string
  value: string
  sub?: string
  icon: React.ElementType
  color: string
  glow: string
  delay?: number
}

function StatCard({ label, value, sub, icon: Icon, color, glow, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      className="relative rounded-2xl border border-[rgba(212,175,55,0.12)] p-5 overflow-hidden group hover:border-[rgba(212,175,55,0.25)] transition-all duration-250"
      style={{
        background: 'rgba(15, 34, 64, 0.55)',
        backdropFilter: 'blur(16px) saturate(180%)',
      }}
    >
      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: glow }}
      />

      <div className="relative z-10 flex items-start justify-between gap-3">
        <div>
          <p className="text-[#94A3B8] text-xs font-semibold uppercase tracking-widest mb-2">
            {label}
          </p>
          <p
            className="text-2xl font-black leading-none"
            style={{ color }}
          >
            {value}
          </p>
          {sub && <p className="text-[#475569] text-xs mt-1.5">{sub}</p>}
        </div>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}18` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
      </div>
    </motion.div>
  )
}

// ─── Case card ────────────────────────────────────────────────────────────────

function CaseCard({ caso, delay }: { caso: LegalCase; delay: number }) {
  const status = STATUS_CONFIG[caso.estado]
  const StatusIcon = status.icon
  const CaseIcon = caso.icono

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className="flex items-start gap-4 p-5 rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[rgba(15,34,64,0.45)] hover:border-[rgba(212,175,55,0.2)] hover:bg-[rgba(15,34,64,0.65)] transition-all duration-200 group"
    >
      {/* Type icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ background: `${caso.color}18` }}
      >
        <CaseIcon className="w-5 h-5" style={{ color: caso.color }} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 mb-1 flex-wrap">
          <h3 className="text-[#F8FAFC] font-semibold text-sm leading-tight">{caso.tipo}</h3>
          <span className="text-[#475569] text-[10px] font-mono">{caso.id}</span>
        </div>
        <p className="text-[#94A3B8] text-xs leading-relaxed mb-2 line-clamp-2">
          {caso.descripcion}
        </p>
        <div className="flex items-center gap-3 flex-wrap">
          <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${status.color} ${status.bg} ${status.border}`}>
            <StatusIcon className="w-3 h-3" />
            {status.label}
          </span>
          <span className="text-[#475569] text-xs">Inicio: {caso.fechaInicio}</span>
          <span className="text-[#475569] text-xs">{caso.abogado}</span>
        </div>
        <p className="text-[#D4AF37] text-xs mt-2 flex items-center gap-1">
          <ChevronRight className="w-3 h-3" />
          {caso.proximoPaso}
        </p>
      </div>

      {/* Action */}
      <button className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-8 h-8 rounded-lg border border-[rgba(212,175,55,0.2)] bg-[rgba(212,175,55,0.08)] flex items-center justify-center text-[#D4AF37] hover:bg-[rgba(212,175,55,0.15)] hover:border-[rgba(212,175,55,0.35)] transition-colors">
        <ArrowUpRight className="w-4 h-4" />
      </button>
    </motion.div>
  )
}

// ─── Document row ─────────────────────────────────────────────────────────────

function DocRow({ doc, delay }: { doc: Document; delay: number }) {
  const stateMap = {
    procesado: { label: 'Procesado', color: 'text-[#34D399]', bg: 'bg-[rgba(5,150,105,0.1)]' },
    analizando: { label: 'Analizando…', color: 'text-[#FBBF24]', bg: 'bg-[rgba(217,119,6,0.1)]' },
    pendiente: { label: 'Pendiente', color: 'text-[#94A3B8]', bg: 'bg-[rgba(255,255,255,0.05)]' },
  }
  const s = stateMap[doc.estado]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, delay }}
      className="flex items-center gap-3 py-3 border-b border-[rgba(255,255,255,0.05)] last:border-0 hover:bg-[rgba(255,255,255,0.02)] transition-colors rounded-lg px-2 -mx-2 group"
    >
      <div className="w-8 h-8 rounded-lg bg-[rgba(37,99,235,0.12)] border border-[rgba(37,99,235,0.2)] flex items-center justify-center flex-shrink-0">
        <FileText className="w-4 h-4 text-[#60A5FA]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[#F8FAFC] text-sm font-medium truncate">{doc.nombre}</p>
        <p className="text-[#475569] text-xs">{doc.fecha} · {doc.caso}</p>
      </div>
      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${s.color} ${s.bg} flex-shrink-0`}>
        {s.label}
      </span>
    </motion.div>
  )
}

// ─── Sidebar nav ──────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Resumen', active: true },
  { icon: Briefcase, label: 'Mis casos', badge: 4 },
  { icon: FileText, label: 'Documentos' },
  { icon: MessageSquare, label: 'Mensajes', badge: 2 },
  { icon: CreditCard, label: 'Facturación' },
  { icon: Gift, label: 'Referidos' },
]

function SidebarNav() {
  const [active, setActive] = useState('Resumen')
  return (
    <nav className="space-y-1">
      {NAV_ITEMS.map(({ icon: Icon, label, badge, active: _activeFlag }) => {
        const isActive = label === active
        return (
          <button
            key={label}
            onClick={() => setActive(label)}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
              isActive
                ? 'bg-[rgba(212,175,55,0.12)] border border-[rgba(212,175,55,0.2)] text-[#D4AF37]'
                : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[rgba(255,255,255,0.04)] border border-transparent'
            }`}
          >
            <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#D4AF37]' : 'text-[#475569] group-hover:text-[#94A3B8]'}`} />
            <span className="flex-1 text-left">{label}</span>
            {badge !== undefined && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[rgba(37,99,235,0.3)] px-1.5 text-[10px] font-bold text-[#60A5FA]">
                {badge}
              </span>
            )}
          </button>
        )
      })}
    </nav>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const PLACEHOLDER_NAME = 'Carlos'

  const activeCases = MOCK_CASES.filter((c) => c.estado !== 'ganado').length
  const wonCases = MOCK_CASES.filter((c) => c.estado === 'ganado').length

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(135deg, #040B17 0%, #0A1628 60%, #0F1E3A 100%)' }}
    >
      {/* Background glows */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[rgba(37,99,235,0.04)] blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[rgba(212,175,55,0.03)] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

        {/* ── Top bar ──────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <p className="text-[11px] text-[#D4AF37] font-semibold uppercase tracking-widest mb-1">
              Panel de control
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC]">
              Bienvenido de vuelta,{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #D4AF37, #F5D060)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {PLACEHOLDER_NAME}
              </span>
            </h1>
            <p className="text-[#94A3B8] text-sm mt-1">
              Tienes {activeCases} {activeCases === 1 ? 'caso activo' : 'casos activos'} y {wonCases}{' '}
              {wonCases === 1 ? 'caso resuelto' : 'casos resueltos'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification bell */}
            <button className="relative w-10 h-10 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] flex items-center justify-center text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[rgba(212,175,55,0.2)] transition-all duration-150">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#DC2626] ring-2 ring-[#040B17]" />
            </button>

            {/* New case CTA */}
            <Link
              href="/reclamar"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-[#040B17] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #F5D060 100%)' }}
            >
              <Plus className="w-4 h-4" />
              Nuevo caso
            </Link>
          </div>
        </motion.div>

        {/* ── Body ─────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Sidebar (1 col) */}
          <motion.aside
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="hidden lg:block lg:col-span-1"
          >
            <div
              className="rounded-2xl border border-[rgba(212,175,55,0.12)] p-4 sticky top-8"
              style={{
                background: 'rgba(15, 34, 64, 0.55)',
                backdropFilter: 'blur(16px) saturate(180%)',
              }}
            >
              {/* User avatar placeholder */}
              <div className="flex items-center gap-3 p-3 mb-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-base flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #1B3A6B 0%, #2563EB 100%)',
                    color: '#F8FAFC',
                  }}
                >
                  {PLACEHOLDER_NAME.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-[#F8FAFC] text-sm font-semibold truncate">{PLACEHOLDER_NAME} García</p>
                  <p className="text-[#475569] text-xs">Escudo Total™ activo</p>
                </div>
              </div>

              <SidebarNav />

              {/* Upgrade nudge */}
              <div className="mt-4 p-3.5 rounded-xl border border-[rgba(212,175,55,0.2)] bg-[rgba(212,175,55,0.05)]">
                <div className="flex items-center gap-1.5 mb-2">
                  <Star className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <p className="text-[#D4AF37] text-[11px] font-bold uppercase tracking-wider">
                    Pack Empresarial
                  </p>
                </div>
                <p className="text-[#94A3B8] text-xs leading-relaxed mb-3">
                  Añade cobertura empresarial y llega a 50 empleados.
                </p>
                <Link
                  href="/tienda/pack-empresarial"
                  className="text-[11px] font-semibold text-[#D4AF37] hover:text-[#F5D060] transition-colors flex items-center gap-1"
                >
                  Ver oferta
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </motion.aside>

          {/* Main content (3 cols) */}
          <div className="lg:col-span-3 space-y-6">

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard
                label="Casos activos"
                value={String(activeCases)}
                sub="En tramitación"
                icon={Briefcase}
                color="#60A5FA"
                glow="rgba(37,99,235,0.15)"
                delay={0.08}
              />
              <StatCard
                label="Tasa de éxito"
                value="94%"
                sub="Últimos 12 meses"
                icon={TrendingUp}
                color="#34D399"
                glow="rgba(5,150,105,0.15)"
                delay={0.14}
              />
              <StatCard
                label="Ahorro total"
                value="2.400€"
                sub="Recuperado este año"
                icon={Shield}
                color="#D4AF37"
                glow="rgba(212,175,55,0.15)"
                delay={0.20}
              />
              <StatCard
                label="Próxima acción"
                value="14/06"
                sub="DGT · EXP-2026-001"
                icon={Clock}
                color="#F472B6"
                glow="rgba(244,114,182,0.12)"
                delay={0.26}
              />
            </div>

            {/* Active cases */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="rounded-2xl border border-[rgba(212,175,55,0.12)] p-6"
              style={{
                background: 'rgba(15, 34, 64, 0.55)',
                backdropFilter: 'blur(16px) saturate(180%)',
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-[#F8FAFC] font-bold text-lg">Mis casos</h2>
                  <p className="text-[#475569] text-xs mt-0.5">
                    {MOCK_CASES.length} casos en total
                  </p>
                </div>
                <button className="text-xs font-semibold text-[#D4AF37] hover:text-[#F5D060] transition-colors flex items-center gap-1">
                  Ver todos
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {MOCK_CASES.map((caso, i) => (
                  <CaseCard key={caso.id} caso={caso} delay={0.2 + i * 0.07} />
                ))}
              </div>

              {/* CTA */}
              <div className="mt-5 pt-5 border-t border-[rgba(255,255,255,0.06)]">
                <Link
                  href="/reclamar"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl font-bold text-[#040B17] text-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                  style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #F5D060 100%)' }}
                >
                  <Plus className="w-4 h-4" />
                  Iniciar nuevo caso
                </Link>
              </div>
            </motion.section>

            {/* Documents section */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25 }}
              className="rounded-2xl border border-[rgba(212,175,55,0.12)] p-6"
              style={{
                background: 'rgba(15, 34, 64, 0.55)',
                backdropFilter: 'blur(16px) saturate(180%)',
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-[#F8FAFC] font-bold text-lg">Documentos</h2>
                  <p className="text-[#475569] text-xs mt-0.5">
                    {MOCK_DOCUMENTS.length} archivos subidos
                  </p>
                </div>
                <button className="text-xs font-semibold text-[#D4AF37] hover:text-[#F5D060] transition-colors flex items-center gap-1">
                  Ver todos
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Document list */}
              <div className="mb-5">
                {MOCK_DOCUMENTS.map((doc, i) => (
                  <DocRow key={doc.id} doc={doc} delay={0.28 + i * 0.06} />
                ))}
              </div>

              {/* Upload zone */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="border-2 border-dashed border-[rgba(212,175,55,0.2)] rounded-xl p-6 text-center hover:border-[rgba(212,175,55,0.4)] hover:bg-[rgba(212,175,55,0.03)] transition-all duration-200 cursor-pointer group"
              >
                <Upload className="w-8 h-8 text-[rgba(212,175,55,0.4)] group-hover:text-[#D4AF37] transition-colors duration-200 mx-auto mb-2" />
                <p className="text-[#94A3B8] text-sm font-medium group-hover:text-[#F8FAFC] transition-colors">
                  Arrastra tus documentos aquí
                </p>
                <p className="text-[#475569] text-xs mt-1">
                  PDF, DOCX, JPG · máx. 20MB · Análisis IA automático
                </p>
                <button className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] hover:text-[#F5D060] transition-colors">
                  O selecciona un archivo
                  <ChevronRight className="w-3 h-3" />
                </button>
              </motion.div>
            </motion.section>

            {/* Quick access — services */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.32 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div>
                  <p className="text-[11px] text-[#D4AF37] font-semibold uppercase tracking-widest">
                    Servicios disponibles
                  </p>
                  <h2 className="text-[#F8FAFC] font-bold text-lg">Acceso rápido</h2>
                </div>
                <div className="flex-1 h-px bg-[rgba(212,175,55,0.1)]" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    href: '/tienda/analisis-expres',
                    icon: Zap,
                    color: '#D4AF37',
                    label: 'Análisis Exprés™',
                    sub: 'Analiza un documento en 60s',
                  },
                  {
                    href: '/tienda/recurso-garantizado',
                    icon: Scale,
                    color: '#059669',
                    label: 'Recurso Garantizado™',
                    sub: 'Sin riesgo · Solo pagas si ganamos',
                  },
                  {
                    href: '/tienda/contrato-blindado',
                    icon: FileCheck,
                    color: '#EA580C',
                    label: 'Contrato Blindado™',
                    sub: 'IA + abogado especialista',
                  },
                ].map(({ href, icon: Icon, color, label, sub }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-start gap-3 p-4 rounded-xl border border-[rgba(255,255,255,0.07)] bg-[rgba(15,34,64,0.45)] hover:border-[rgba(212,175,55,0.2)] hover:bg-[rgba(15,34,64,0.65)] transition-all duration-200 group"
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${color}18` }}
                    >
                      <Icon className="w-4.5 h-4.5" style={{ color }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[#F8FAFC] text-sm font-semibold leading-tight">{label}</p>
                      <p className="text-[#475569] text-xs mt-0.5 leading-relaxed">{sub}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#475569] group-hover:text-[#D4AF37] transition-colors mt-0.5 flex-shrink-0 ml-auto" />
                  </Link>
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  )
}
