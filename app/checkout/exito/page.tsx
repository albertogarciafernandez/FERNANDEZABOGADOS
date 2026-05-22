'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Home, LayoutDashboard, Shield, Mail, FileText, Phone } from 'lucide-react'

// ─── Animated checkmark SVG ───────────────────────────────────────────────────

function AnimatedCheckmark() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
      className="relative mx-auto mb-8 w-28 h-28"
    >
      {/* Outer glow ring */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1.15, opacity: 0 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
        className="absolute inset-0 rounded-full bg-emerald-400/30"
      />

      {/* Circle background */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/40" />

      {/* Checkmark SVG */}
      <svg
        viewBox="0 0 52 52"
        className="absolute inset-0 w-full h-full p-6"
        fill="none"
        stroke="white"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d="M14 27 L22 35 L38 18"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.6 }}
        />
      </svg>
    </motion.div>
  )
}

// ─── Next steps list ─────────────────────────────────────────────────────────

const NEXT_STEPS = [
  {
    icon: Mail,
    title: 'Email de confirmación',
    description:
      'Te hemos enviado un email con el resumen de tu compra y los próximos pasos a seguir.',
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/20',
  },
  {
    icon: Shield,
    title: 'Accede a tu dashboard',
    description:
      'Tu cuenta está activa. Entra al panel de control para gestionar tus casos y documentos.',
    color: 'text-indigo-400',
    bg: 'bg-indigo-400/10',
    border: 'border-indigo-400/20',
  },
  {
    icon: FileText,
    title: 'Completa tu perfil',
    description:
      'Sube la documentación de tu caso para que nuestro equipo legal e IA empiecen a trabajar.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    border: 'border-cyan-400/20',
  },
  {
    icon: Phone,
    title: 'Soporte disponible',
    description:
      'Si tienes alguna duda, nuestro equipo está disponible en soporte@justicialegalia.com o por chat.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/20',
  },
]

// ─── Main content (uses useSearchParams → needs Suspense) ─────────────────────

function ExitoContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  return (
    <div className="min-h-screen bg-[#050508] flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">

      {/* Background decorative blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl" />
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-indigo-500/5 blur-3xl" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto">

        {/* ── Header card ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl p-10 text-center mb-6 shadow-2xl"
        >
          <AnimatedCheckmark />

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-4xl md:text-5xl font-black mb-4"
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              background: 'linear-gradient(135deg, #f59e0b, #f97316)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            ¡Pago realizado<br />con éxito!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-slate-400 text-lg mb-8 leading-relaxed"
          >
            Tu compra ha sido procesada correctamente. Bienvenido a
            <span className="text-white font-semibold"> Justicia Legalia</span>, donde la IA
            trabaja para defender tus derechos.
          </motion.p>

          {/* Session ID reference */}
          {sessionId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-500 font-mono mb-8"
            >
              <span className="text-slate-600">Ref. de pago:</span>
              <span className="text-slate-400 truncate max-w-[220px]">{sessionId}</span>
            </motion.div>
          )}

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-slate-900 text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25"
              style={{
                background: 'linear-gradient(135deg, #f59e0b, #f97316)',
              }}
            >
              <LayoutDashboard className="w-5 h-5" />
              Ir a mi Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-white/15 text-white text-sm font-semibold transition-all duration-200 hover:bg-white/5 hover:border-white/25"
            >
              <Home className="w-4 h-4" />
              Volver al inicio
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Next steps ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/3 to-white/1 backdrop-blur-xl p-8 shadow-xl"
        >
          <h2
            className="text-xl font-bold text-white mb-6 text-center"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            ¿Qué ocurre ahora?
          </h2>

          <div className="space-y-4">
            {NEXT_STEPS.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.4 }}
                  className={`flex items-start gap-4 p-4 rounded-2xl border ${step.bg} ${step.border}`}
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${step.bg} ${step.border} border flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${step.color}`} />
                  </div>
                  <div>
                    <p className={`font-semibold text-sm mb-1 ${step.color}`}>{step.title}</p>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* ── Footer note ─────────────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9, duration: 0.5 }}
          className="text-center text-slate-600 text-xs mt-6"
        >
          ¿Tienes algún problema? Contacta con nosotros en{' '}
          <a
            href="mailto:soporte@justicialegalia.com"
            className="text-amber-400/70 hover:text-amber-400 transition-colors"
          >
            soporte@justicialegalia.com
          </a>
          {' '}· Pagos procesados con{' '}
          <span className="text-slate-500">Stripe</span> · Encriptación SSL 256-bit
        </motion.p>
      </div>
    </div>
  )
}

// ─── Page export ──────────────────────────────────────────────────────────────

export default function ExitoPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#050508] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-amber-400/30 border-t-amber-400 animate-spin" />
        </div>
      }
    >
      <ExitoContent />
    </Suspense>
  )
}
