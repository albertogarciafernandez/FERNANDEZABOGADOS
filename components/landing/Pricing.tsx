"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Zap, Star, Building2, X, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "libre",
    name: "Libre",
    icon: Zap,
    emoji: "⚡",
    price: { monthly: 0, yearly: 0 },
    description: "Perfecto para conocer la plataforma",
    cta: "Empezar Gratis",
    href: "/reclamar",
    popular: false,
    color: "text-slate-400",
    border: "border-white/10",
    hoverBorder: "hover:border-white/20",
    bg: "from-white/3 to-white/1",
    ctaClass: "btn-outline",
    features: [
      { text: "1 análisis al mes", included: true },
      { text: "Diagnóstico básico del caso", included: true },
      { text: "Probabilidad de éxito estimada", included: true },
      { text: "Generación de recursos legales", included: false },
      { text: "Seguimiento del caso", included: false },
      { text: "Soporte prioritario", included: false },
      { text: "Presentación en sede electrónica", included: false },
      { text: "Agente negociador IA", included: false },
    ],
  },
  {
    id: "nowin",
    name: "No-Win No-Fee",
    icon: Star,
    emoji: "🏆",
    price: { monthly: 0, yearly: 0 },
    priceNote: "+ 15% si ganamos",
    description: "Sin pago inicial. Solo pagas si recuperas",
    cta: "Reclamar Ahora",
    href: "/reclamar",
    popular: true,
    color: "text-amber-400",
    border: "border-amber-400/40",
    hoverBorder: "hover:border-amber-400/60",
    bg: "from-amber-400/10 to-orange-500/5",
    ctaClass: "btn-gold",
    features: [
      { text: "Análisis ilimitados", included: true },
      { text: "Recursos legales completos", included: true },
      { text: "Presentación automática", included: true },
      { text: "Seguimiento en tiempo real", included: true },
      { text: "Agente negociador IA", included: true },
      { text: "Soporte prioritario", included: true },
      { text: "Sin pago si no ganamos", included: true },
      { text: "Abogado revisor incluido", included: true },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    icon: Sparkles,
    emoji: "💎",
    price: { monthly: 29, yearly: 23 },
    description: "Para reclamadores frecuentes",
    cta: "Empezar Premium",
    href: "/reclamar",
    popular: false,
    color: "text-indigo-400",
    border: "border-indigo-400/30",
    hoverBorder: "hover:border-indigo-400/50",
    bg: "from-indigo-400/10 to-purple-500/5",
    ctaClass: "bg-indigo-500 hover:bg-indigo-600 text-white font-bold",
    features: [
      { text: "Análisis ilimitados", included: true },
      { text: "Recursos legales completos", included: true },
      { text: "Presentación automática", included: true },
      { text: "Seguimiento en tiempo real", included: true },
      { text: "Agente negociador IA", included: true },
      { text: "Soporte prioritario 24h", included: true },
      { text: "Sin comisión sobre recuperados", included: true },
      { text: "API acceso propio", included: false },
    ],
  },
  {
    id: "b2b",
    name: "Despachos B2B",
    icon: Building2,
    emoji: "🏢",
    price: null,
    priceNote: "Precio personalizado",
    description: "Para despachos y gestorías profesionales",
    cta: "Contactar Ventas",
    href: "#contacto",
    popular: false,
    color: "text-emerald-400",
    border: "border-emerald-400/20",
    hoverBorder: "hover:border-emerald-400/40",
    bg: "from-emerald-400/8 to-teal-500/5",
    ctaClass: "border border-emerald-400/40 text-emerald-400 hover:bg-emerald-400/10 font-semibold",
    features: [
      { text: "API completa + white-label", included: true },
      { text: "Volumen ilimitado de casos", included: true },
      { text: "Dashboard para el despacho", included: true },
      { text: "Formación del equipo", included: true },
      { text: "SLA garantizado", included: true },
      { text: "Abogado dedicado", included: true },
      { text: "Facturación personalizada", included: true },
      { text: "Integraciones CRM/ERP", included: true },
    ],
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="precios" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #050508 0%, #0d0d1a 50%, #050508 100%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-4">
            Planes transparentes
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Sin sorpresas.
            <span className="gradient-text-gold"> Sin letra pequeña.</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-10">
            Elige el plan que mejor se adapte a ti. El modelo No-Win No-Fee es el favorito:
            no arriesgas nada y solo pagamos si recuperas tu dinero.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={cn("text-sm font-medium", !yearly ? "text-white" : "text-slate-500")}>
              Mensual
            </span>
            <button
              onClick={() => setYearly(!yearly)}
              className={cn(
                "relative w-12 h-6 rounded-full transition-colors duration-300",
                yearly ? "bg-amber-400" : "bg-white/20"
              )}
            >
              <div className={cn(
                "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300",
                yearly ? "translate-x-7" : "translate-x-1"
              )} />
            </button>
            <span className={cn("text-sm font-medium flex items-center gap-2", yearly ? "text-white" : "text-slate-500")}>
              Anual
              <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-400 text-xs font-bold">-20%</span>
            </span>
          </div>
        </motion.div>

        {/* Plans grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn(
                "relative rounded-2xl p-6 bg-gradient-to-br border card-hover flex flex-col",
                plan.bg,
                plan.border,
                plan.hoverBorder,
                plan.popular && "ring-1 ring-amber-400/50"
              )}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 text-xs font-bold whitespace-nowrap">
                  ⭐ MÁS POPULAR
                </div>
              )}

              {/* Plan header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{plan.emoji}</span>
                  <div>
                    <h3 className={cn("font-bold text-lg", plan.popular ? "text-amber-400" : "text-white")} style={{ fontFamily: "var(--font-space-grotesk)" }}>
                      {plan.name}
                    </h3>
                    <p className="text-xs text-slate-500">{plan.description}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mt-4">
                  {plan.price === null ? (
                    <div>
                      <div className="text-3xl font-black text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                        Contactar
                      </div>
                      <div className="text-xs text-slate-500 mt-1">{plan.priceNote}</div>
                    </div>
                  ) : plan.price.monthly === 0 ? (
                    <div>
                      <div className="text-3xl font-black text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                        €0
                        <span className="text-sm font-normal text-slate-500">/mes</span>
                      </div>
                      {plan.priceNote && (
                        <div className={cn("text-sm font-semibold mt-1", plan.color)}>{plan.priceNote}</div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <div className="text-3xl font-black text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                        €{yearly ? plan.price.yearly : plan.price.monthly}
                        <span className="text-sm font-normal text-slate-500">/mes</span>
                      </div>
                      {yearly && (
                        <div className="text-xs text-emerald-400 mt-1">
                          Facturado €{plan.price.yearly * 12}/año
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-2.5 text-sm">
                    {feature.included ? (
                      <Check className={cn("w-4 h-4 shrink-0 mt-0.5", plan.color)} />
                    ) : (
                      <X className="w-4 h-4 shrink-0 mt-0.5 text-slate-700" />
                    )}
                    <span className={feature.included ? "text-slate-300" : "text-slate-600"}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={plan.href}
                className={cn(
                  "flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm transition-all duration-200",
                  plan.ctaClass
                )}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-slate-600 text-sm mt-10"
        >
          Todos los planes incluyen cifrado SSL · GDPR compliant · Cancelación en cualquier momento
        </motion.p>
      </div>
    </section>
  );
}
