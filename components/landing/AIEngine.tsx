"use client";

import { motion } from "framer-motion";
import { FileText, Scan, Brain, Scale, FileCheck, ArrowRight, Cpu, Database, Zap } from "lucide-react";

const flowSteps = [
  {
    icon: Scan,
    label: "OCR & Extracción",
    sublabel: "Tesseract · Google Vision",
    color: "text-amber-400",
    bg: "bg-amber-400/10 border-amber-400/30",
  },
  {
    icon: Brain,
    label: "Claude AI",
    sublabel: "claude-sonnet-4-6",
    color: "text-indigo-400",
    bg: "bg-indigo-400/10 border-indigo-400/30",
    featured: true,
  },
  {
    icon: Database,
    label: "Base Jurídica",
    sublabel: "10.000+ sentencias",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10 border-cyan-400/30",
  },
  {
    icon: FileCheck,
    label: "Documento Legal",
    sublabel: "Recurso personalizado",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/30",
  },
];

const integrations = [
  { label: "DGT API", icon: "🚗", color: "text-amber-400" },
  { label: "Sede Electrónica", icon: "🏛️", color: "text-indigo-400" },
  { label: "CNMC", icon: "📡", color: "text-cyan-400" },
  { label: "AESA", icon: "✈️", color: "text-rose-400" },
  { label: "BOE", icon: "📜", color: "text-emerald-400" },
  { label: "CEPYME", icon: "🏢", color: "text-violet-400" },
];

const metrics = [
  { label: "Latencia media", value: "< 3s", icon: Zap, color: "text-amber-400" },
  { label: "Sentencias analizadas", value: "10M+", icon: Database, color: "text-indigo-400" },
  { label: "Uptime garantizado", value: "99.9%", icon: Cpu, color: "text-emerald-400" },
];

export default function AIEngine() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.1) 0%, transparent 70%)", filter: "blur(40px)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">
              Motor de Inteligencia Artificial
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              La tecnología legal
              <br />
              <span className="gradient-text-cyber">más avanzada</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-8 text-lg">
              Nuestro motor combina Claude AI con una base de datos de más de 10 millones de sentencias españolas y europeas.
              El resultado: análisis jurídicos que rivalizan con los de un abogado senior, en segundos.
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {metrics.map((metric) => (
                <div key={metric.label} className="glass rounded-xl p-4 border border-white/5">
                  <metric.icon className={`w-5 h-5 ${metric.color} mb-2`} />
                  <div className={`text-xl font-black ${metric.color}`} style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    {metric.value}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{metric.label}</div>
                </div>
              ))}
            </div>

            {/* Integrations */}
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-wider font-semibold mb-3">
                Integrado con
              </p>
              <div className="flex flex-wrap gap-2">
                {integrations.map((int) => (
                  <span
                    key={int.label}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400"
                  >
                    <span>{int.icon}</span>
                    <span>{int.label}</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Flow diagram */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative glass rounded-3xl p-8 border border-white/10">
              {/* Document input */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/3 border border-white/10 mb-8">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-slate-400" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-white font-medium">multa_dgt_20250521.pdf</div>
                  <div className="text-xs text-slate-500">Entrada del sistema</div>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              {/* Flow steps */}
              <div className="space-y-4">
                {flowSteps.map((step, i) => (
                  <div key={step.label}>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                      className={`flex items-center gap-4 p-4 rounded-2xl border ${step.bg} ${step.featured ? "ring-1 ring-indigo-400/30" : ""}`}
                    >
                      <div className={`w-10 h-10 rounded-xl ${step.bg} flex items-center justify-center shrink-0`}>
                        <step.icon className={`w-5 h-5 ${step.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className={`text-sm font-bold ${step.featured ? step.color : "text-white"}`}>
                          {step.label}
                          {step.featured && (
                            <span className="ml-2 text-xs font-normal bg-indigo-400/20 text-indigo-400 px-2 py-0.5 rounded-full">
                              Core
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500">{step.sublabel}</div>
                      </div>
                      {i < flowSteps.length - 1 && (
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step.bg}`}>
                          <div className="w-1 h-1 rounded-full bg-current opacity-50" />
                        </div>
                      )}
                    </motion.div>

                    {/* Arrow connector */}
                    {i < flowSteps.length - 1 && (
                      <div className="flex justify-center my-1">
                        <ArrowRight className="w-4 h-4 text-slate-700 rotate-90" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Output */}
              <div className="mt-8 p-4 rounded-2xl bg-emerald-400/10 border border-emerald-400/20">
                <div className="flex items-center gap-3">
                  <Scale className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="text-sm font-bold text-emerald-400">Recurso Legal Generado</div>
                    <div className="text-xs text-slate-500">Probabilidad de éxito: 91% · Listo en 4.2s</div>
                  </div>
                  <div className="ml-auto">
                    <div className="w-8 h-8 rounded-lg bg-emerald-400/20 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-emerald-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Processing indicator */}
              <div className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/3">
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => (
                    <div
                      key={i}
                      className="w-1 h-3 rounded-full bg-indigo-400"
                      style={{ animation: `glow-pulse 0.8s ease-in-out ${i * 0.15}s infinite` }}
                    />
                  ))}
                </div>
                <span className="text-xs text-slate-500">Procesando base jurídica española...</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
