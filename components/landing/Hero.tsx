"use client";

import { motion } from "framer-motion";
import { ArrowRight, Upload, FileText, CheckCircle, Sparkles, TrendingUp, Clock, Shield } from "lucide-react";
import Link from "next/link";

const floatingStats = [
  { icon: TrendingUp, label: "€2.4M recuperados", color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20" },
  { icon: CheckCircle, label: "94% éxito", color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
  { icon: Clock, label: "48h resolución", color: "text-cyan-400", bg: "bg-cyan-400/10 border-cyan-400/20" },
  { icon: Shield, label: "GDPR seguro", color: "text-indigo-400", bg: "bg-indigo-400/10 border-indigo-400/20" },
];

const acceptedTypes = ["PDF", "JPG", "PNG", "DOCX"];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full animate-blob"
          style={{
            background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
            animationDelay: "0s",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full animate-blob"
          style={{
            background: "radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 70%)",
            filter: "blur(40px)",
            animationDelay: "-3s",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-gold text-sm font-medium mb-8"
            >
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="gradient-text-gold">Impulsado por Claude AI · Validado por Abogados</span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-6"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              <span className="gradient-text-white">Tu Escudo</span>
              <br />
              <span className="gradient-text-gold">Legal</span>
              <br />
              <span className="text-slate-300 text-4xl md:text-5xl lg:text-6xl font-bold">
                con Inteligencia
              </span>
              <br />
              <span className="gradient-text-cyber text-4xl md:text-5xl lg:text-6xl font-bold">
                Artificial
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-400 leading-relaxed mb-10 max-w-xl"
            >
              Recupera tu dinero de multas injustas, contratos abusivos y compras fallidas.
              Nuestra IA analiza tu caso en segundos y genera el recurso legal perfecto.
              <span className="text-amber-400 font-semibold"> Sin pago inicial si no ganamos.</span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link
                href="/reclamar"
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl btn-gold text-base font-bold group shadow-lg glow-gold"
              >
                <Upload className="w-5 h-5" />
                <span>Analiza tu Multa GRATIS</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#como-funciona"
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl btn-outline text-base font-semibold"
              >
                Ver cómo funciona
                <ArrowRight className="w-4 h-4 opacity-50" />
              </a>
            </motion.div>

            {/* Floating stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              {floatingStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${stat.bg} text-xs font-medium`}
                >
                  <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} />
                  <span className="text-slate-300">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Interactive card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Main card */}
            <div className="relative rounded-3xl overflow-hidden glass border border-white/10 p-8 shadow-2xl">
              {/* Card header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <div className="ml-auto text-xs text-slate-500 font-mono">legalia.ai/analizar</div>
              </div>

              {/* Upload zone */}
              <Link href="/reclamar">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="border-2 border-dashed border-amber-400/30 rounded-2xl p-8 text-center mb-6 bg-amber-400/5 hover:bg-amber-400/10 transition-colors cursor-pointer group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-7 h-7 text-amber-400" />
                  </div>
                  <p className="text-white font-semibold mb-1">Arrastra tu documento aquí</p>
                  <p className="text-slate-400 text-sm">o haz clic para seleccionar</p>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    {acceptedTypes.map((type) => (
                      <span
                        key={type}
                        className="px-2 py-0.5 rounded text-xs bg-white/5 border border-white/10 text-slate-400 font-mono"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </Link>

              {/* Recent analyses preview */}
              <div className="space-y-3">
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  Análisis recientes
                </p>
                {[
                  { icon: "🚗", text: "Multa DGT €200 · Recurso generado", status: "success", time: "hace 2 min" },
                  { icon: "✈️", text: "Vuelo cancelado Ryanair · €400 en proceso", status: "processing", time: "hace 5 min" },
                  { icon: "🏠", text: "Cláusula suelo eliminada · €3.200 recuperados", status: "success", time: "hace 12 min" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5">
                    <span className="text-xl">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-300 truncate">{item.text}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-slate-600">{item.time}</span>
                      <div className={`w-2 h-2 rounded-full ${item.status === "success" ? "bg-emerald-400" : "bg-amber-400 animate-pulse"}`} />
                    </div>
                  </div>
                ))}
              </div>

              {/* AI indicator */}
              <div className="mt-6 flex items-center gap-3 p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-indigo-300">Motor IA activo</p>
                  <p className="text-xs text-slate-500">Claude AI · Base jurídica española</p>
                </div>
                <div className="ml-auto">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-1 h-4 rounded-full bg-indigo-400"
                        style={{ animation: `glow-pulse 1s ease-in-out ${i * 0.2}s infinite` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl glass-gold border border-amber-400/20 flex items-center justify-center animate-float">
              <FileText className="w-8 h-8 text-amber-400" />
            </div>
            <div
              className="absolute -bottom-4 -left-4 w-16 h-16 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center animate-float"
              style={{ animationDelay: "-2s" }}
            >
              <CheckCircle className="w-6 h-6 text-indigo-400" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #050508)" }}
      />
    </section>
  );
}
