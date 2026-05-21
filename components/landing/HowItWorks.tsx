"use client";

import { motion } from "framer-motion";
import { Upload, Brain, FileCheck, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    emoji: "📤",
    title: "Sube tu documento",
    description:
      "Arrastra y suelta tu multa, contrato, factura o cualquier documento. Aceptamos PDF, fotos y capturas de pantalla. También puedes escribir los detalles directamente.",
    details: ["PDF de la multa DGT", "Foto del ticket o sanción", "Contrato en formato Word", "Capturas de email"],
    color: "from-amber-400/20 to-orange-500/20",
    border: "border-amber-400/30",
    glow: "amber",
    textColor: "text-amber-400",
  },
  {
    number: "02",
    icon: Brain,
    emoji: "🤖",
    title: "La IA lo analiza todo",
    description:
      "Nuestro motor de IA (Claude AI + base jurídica española) extrae el texto, identifica el tipo de caso, busca precedentes legales y evalúa la viabilidad del recurso.",
    details: ["OCR automático", "Análisis jurídico profundo", "Jurisprudencia aplicable", "Probabilidad de éxito"],
    color: "from-indigo-400/20 to-purple-500/20",
    border: "border-indigo-400/30",
    glow: "indigo",
    textColor: "text-indigo-400",
  },
  {
    number: "03",
    icon: FileCheck,
    emoji: "✅",
    title: "Recibe tu recurso listo",
    description:
      "En menos de 5 minutos tienes un documento legal personalizado, los argumentos jurídicos más fuertes y el paso a paso para presentarlo ante la administración.",
    details: ["Recurso legal redactado", "Argumentos personalizados", "Instrucciones de presentación", "Seguimiento del caso"],
    color: "from-emerald-400/20 to-teal-500/20",
    border: "border-emerald-400/30",
    glow: "emerald",
    textColor: "text-emerald-400",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #050508 0%, #0d0d1a 50%, #050508 100%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">
            Proceso simplificado
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Tan sencillo como
            <span className="gradient-text-gold"> 1, 2, 3</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Hemos eliminado toda la complejidad burocrática. Tu único trabajo es subir el documento.
            Nosotros hacemos el resto.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-8 relative">
          {/* Connecting lines (desktop) */}
          <div className="absolute top-20 left-1/3 right-1/3 h-px hidden lg:block" style={{ background: "linear-gradient(90deg, rgba(245,158,11,0.3), rgba(99,102,241,0.3), rgba(52,211,153,0.3))" }} />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative group"
            >
              {/* Arrow between cards (mobile/tablet) */}
              {i < steps.length - 1 && (
                <div className="flex lg:hidden justify-center my-4">
                  <ArrowRight className="w-6 h-6 text-slate-600 rotate-90" />
                </div>
              )}

              <div className={`relative rounded-3xl p-8 bg-gradient-to-br ${step.color} border ${step.border} card-hover h-full`}>
                {/* Step number */}
                <div className="flex items-start justify-between mb-6">
                  <span
                    className={`text-6xl font-black opacity-20 ${step.textColor}`}
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {step.number}
                  </span>
                  <span className="text-4xl animate-float" style={{ animationDelay: `${i * 2}s` }}>
                    {step.emoji}
                  </span>
                </div>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} border ${step.border} flex items-center justify-center mb-4`}>
                  <step.icon className={`w-6 h-6 ${step.textColor}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Detail list */}
                <ul className="space-y-2">
                  {step.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-2 text-sm">
                      <div className={`w-1.5 h-1.5 rounded-full ${step.textColor}`} />
                      <span className="text-slate-400">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <a
            href="/reclamar"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl btn-gold text-base font-bold group shadow-xl"
          >
            <Upload className="w-5 h-5" />
            <span>Empezar ahora — Es Gratis</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-slate-600 text-sm mt-4">
            Sin tarjeta de crédito · Sin compromisos · Primer análisis gratuito
          </p>
        </motion.div>
      </div>
    </section>
  );
}
