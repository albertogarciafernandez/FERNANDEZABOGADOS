"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, CheckCircle } from "lucide-react";
import { TESTIMONIALS, type Testimonial } from "@/lib/copy";

// ------------------------------------
// Types
// ------------------------------------

type Category = "Todos" | "Multas" | "Contratos" | "Aerolíneas" | "Alquiler" | "Empresas" | "Consumo";

const CATEGORIES: Category[] = [
  "Todos",
  "Multas",
  "Contratos",
  "Aerolíneas",
  "Alquiler",
  "Empresas",
  "Consumo",
];

// ------------------------------------
// Star Rating
// ------------------------------------

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, delay: i * 0.04 }}
        >
          <Star
            className="w-3.5 h-3.5"
            style={{
              fill: i <= rating ? "#D4AF37" : "transparent",
              color: i <= rating ? "#D4AF37" : "#475569",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

// ------------------------------------
// Testimonial Card
// ------------------------------------

function TestimonialCard({
  t,
  index,
}: {
  t: Testimonial;
  index: number;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12, scale: 0.97 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative flex flex-col rounded-2xl p-6 transition-all duration-250"
      style={{
        background: "rgba(15, 34, 64, 0.6)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        border: "1px solid rgba(212, 175, 55, 0.12)",
      }}
      whileHover={{
        y: -4,
        boxShadow:
          "0 20px 48px rgba(0,0,0,0.5), 0 0 40px rgba(212,175,55,0.06)",
      }}
    >
      {/* Decorative quote */}
      <Quote
        className="absolute top-4 right-4 w-8 h-8 opacity-10 group-hover:opacity-20 transition-opacity"
        style={{ color: "#D4AF37" }}
      />

      {/* Stars */}
      <StarRating rating={t.rating} />

      {/* Review text */}
      <p
        className="flex-1 text-sm leading-relaxed mt-4 mb-5 relative z-10"
        style={{ color: "#94A3B8" }}
      >
        &ldquo;{t.text}&rdquo;
      </p>

      {/* Resultado badge */}
      <div className="mb-4">
        <span
          className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
          style={{
            background: "rgba(5,150,105,0.12)",
            border: "1px solid rgba(5,150,105,0.3)",
            color: "#059669",
          }}
        >
          <CheckCircle className="w-3 h-3" />
          {t.resultado}
        </span>
      </div>

      {/* Divider */}
      <div
        className="border-t pt-4"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}
      >
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-xs font-black text-white shrink-0`}
          >
            {t.avatar}
          </div>

          {/* Name / role */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate" style={{ color: "#F8FAFC" }}>
              {t.name}
            </p>
            <p className="text-xs truncate" style={{ color: "#475569" }}>
              {t.role} · {t.location}
            </p>
          </div>

          {/* Service tag */}
          <span
            className="text-[10px] font-semibold px-2 py-1 rounded-lg shrink-0"
            style={{
              background: "rgba(37,99,235,0.1)",
              border: "1px solid rgba(37,99,235,0.2)",
              color: "#2563EB",
            }}
          >
            {t.service}
          </span>
        </div>

        {/* Verified + date row */}
        <div className="flex items-center justify-between mt-3">
          {t.verified && (
            <div className="flex items-center gap-1.5">
              <div
                className="w-3.5 h-3.5 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(5,150,105,0.15)",
                  border: "1px solid rgba(5,150,105,0.3)",
                }}
              >
                <CheckCircle className="w-2.5 h-2.5" style={{ color: "#059669" }} />
              </div>
              <span className="text-[10px] font-medium" style={{ color: "#059669" }}>
                Reseña verificada
              </span>
            </div>
          )}
          <span className="text-[10px] ml-auto" style={{ color: "#475569" }}>
            {t.date}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ------------------------------------
// Main Component
// ------------------------------------

export default function Testimonials() {
  const [activeCategory, setActiveCategory] = useState<Category>("Todos");

  const filtered =
    activeCategory === "Todos"
      ? TESTIMONIALS
      : TESTIMONIALS.filter((t) => t.serviceCategory === activeCategory);

  return (
    <section
      id="testimonios"
      className="relative py-24 overflow-hidden"
      style={{ background: "#040B17" }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(212,175,55,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(37,99,235,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#D4AF37", letterSpacing: "0.12em" }}
          >
            Testimonios reales
          </p>

          <h2
            className="text-4xl md:text-5xl font-black mb-4 leading-tight"
            style={{
              fontFamily: "var(--font-space-grotesk, system-ui)",
              color: "#F8FAFC",
            }}
          >
            Ellos ya recuperaron{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #B8860B 0%, #D4AF37 50%, #F5D060 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              su dinero
            </span>
          </h2>

          <p className="max-w-xl mx-auto text-base mb-8" style={{ color: "#94A3B8" }}>
            Clientes reales con resultados medibles. Sin compromisos, sin letra pequeña.
          </p>

          {/* Aggregate rating */}
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full"
            style={{
              background: "rgba(15,34,64,0.7)",
              border: "1px solid rgba(212,175,55,0.15)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-black text-base" style={{ color: "#F8FAFC" }}>
              4.9 de 5
            </span>
            <span className="text-sm" style={{ color: "#475569" }}>
              basado en 2.847 opiniones verificadas
            </span>
          </div>
        </motion.div>

        {/* ── Category Filters ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              style={
                activeCategory === cat
                  ? {
                      background: "rgba(212,175,55,0.15)",
                      border: "1px solid rgba(212,175,55,0.4)",
                      color: "#D4AF37",
                      boxShadow: "0 0 12px rgba(212,175,55,0.15)",
                    }
                  : {
                      background: "rgba(15,34,64,0.5)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      color: "#94A3B8",
                    }
              }
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ── Testimonials Grid ───────────────────────────── */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((t, i) => (
              <TestimonialCard key={t.id} t={t} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Footer note ─────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs mt-10"
          style={{ color: "#475569" }}
        >
          Testimonios verificados con documentación del caso · Nombres con consentimiento
          del cliente · Los resultados individuales pueden variar según la situación legal
        </motion.p>
      </div>

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #040B17)" }}
      />
    </section>
  );
}
