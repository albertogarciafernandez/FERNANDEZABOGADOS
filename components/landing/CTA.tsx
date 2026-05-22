"use client";

import { motion } from "framer-motion";
import { Upload, ArrowRight, Shield, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Dramatic gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #0d0520 0%, #0a0a2e 30%, #050508 60%, #1a0800 100%)",
        }}
      />

      {/* Animated orbs */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none animate-blob"
        style={{
          background: "radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none animate-blob"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
          animationDelay: "-4s",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-gold border border-amber-400/30 text-sm font-medium mb-8"
        >
          <Shield className="w-4 h-4 text-amber-400" />
          <span className="text-amber-400">Sin pago si no ganamos · Primer análisis GRATIS</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black leading-tight mb-6"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <span className="gradient-text-white">¿Tienes una</span>
          <br />
          <span className="gradient-text-gold">multa injusta?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          En menos de 5 minutos sabrás si tienes opciones de ganar y tendrás
          el recurso legal listo para presentar. <strong className="text-amber-400">Gratis. Sin compromisos.</strong>
        </motion.p>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Link
            href="/reclamar"
            className="flex items-center justify-center gap-3 px-10 py-5 rounded-2xl btn-gold text-lg font-bold group shadow-2xl glow-gold"
          >
            <Upload className="w-6 h-6" />
            <span>Analiza tu caso GRATIS</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="#como-funciona"
            className="flex items-center justify-center gap-3 px-10 py-5 rounded-2xl btn-outline text-lg font-semibold"
          >
            Ver cómo funciona
          </a>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500"
        >
          {[
            { icon: CheckCircle, text: "Sin tarjeta de crédito" },
            { icon: Clock, text: "Análisis en menos de 5 min" },
            { icon: Shield, text: "100% confidencial" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2">
              <item.icon className="w-4 h-4 text-emerald-400" />
              <span>{item.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 grid grid-cols-3 gap-8 pt-12 border-t border-white/5"
        >
          {[
            { value: "€4.2M+", label: "Recuperados" },
            { value: "12.847", label: "Casos resueltos" },
            { value: "94.3%", label: "Tasa de éxito" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-black gradient-text-gold" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                {stat.value}
              </div>
              <div className="text-slate-500 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
