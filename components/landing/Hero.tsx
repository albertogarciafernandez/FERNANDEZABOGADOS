"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ChevronDown, Star, TrendingUp, Users, Trophy, Clock } from "lucide-react";
import Link from "next/link";
import { HERO_COPY, SOCIAL_PROOF_BAR } from "@/lib/copy";

// ------------------------------------
// Animated Counter
// ------------------------------------

function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 1500,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  const formatted =
    target >= 1000000
      ? `${(count / 1000000).toFixed(1)}M`
      : target >= 1000
      ? count.toLocaleString("es-ES")
      : count.toString();

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

// ------------------------------------
// Dot Grid Background
// ------------------------------------

function DotGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(212,175,55,0.12) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        maskImage:
          "radial-gradient(ellipse 80% 70% at 50% 40%, black 40%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 70% at 50% 40%, black 40%, transparent 100%)",
      }}
    />
  );
}

// ------------------------------------
// Dashboard Mockup (hero visual)
// ------------------------------------

function DashboardMockup() {
  return (
    <div className="relative w-full max-w-[480px] mx-auto lg:mx-0">
      {/* Glow behind card */}
      <div
        className="absolute inset-0 -m-8 rounded-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(37,99,235,0.18) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* Main panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative rounded-2xl overflow-hidden border"
        style={{
          background: "rgba(10, 22, 40, 0.85)",
          backdropFilter: "blur(24px) saturate(200%)",
          WebkitBackdropFilter: "blur(24px) saturate(200%)",
          border: "1px solid rgba(212, 175, 55, 0.2)",
          boxShadow:
            "0 0 40px rgba(212,175,55,0.06), inset 0 1px 0 rgba(245,208,96,0.08), 0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* Window bar */}
        <div
          className="flex items-center gap-2 px-4 py-3 border-b"
          style={{ borderColor: "rgba(212,175,55,0.1)" }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-70" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 opacity-70" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 opacity-70" />
          <div className="ml-auto text-[10px] font-mono" style={{ color: "#475569" }}>
            justicialegalia.com/dashboard
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Status row */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#D4AF37" }}>
                Panel de cliente
              </p>
              <p className="text-base font-bold mt-0.5" style={{ color: "#F8FAFC" }}>
                Mis casos activos
              </p>
            </div>
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: "rgba(5,150,105,0.15)",
                border: "1px solid rgba(5,150,105,0.3)",
                color: "#059669",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              3 activos
            </div>
          </div>

          {/* Case items */}
          {[
            {
              icon: "🚗",
              title: "Multa DGT N-332",
              sub: "Recurso Garantizado™",
              status: "En tramitación",
              statusColor: "#D4AF37",
              progress: 65,
              progressColor: "#D4AF37",
            },
            {
              icon: "✈️",
              title: "Vuelo cancelado Iberia",
              sub: "Reclamación CE 261/2004",
              status: "Resuelto",
              statusColor: "#059669",
              progress: 100,
              progressColor: "#059669",
            },
            {
              icon: "📄",
              title: "Contrato proveedor",
              sub: "Contrato Blindado™",
              status: "Revisión IA",
              statusColor: "#2563EB",
              progress: 30,
              progressColor: "#2563EB",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.12 }}
              className="rounded-xl p-3.5"
              style={{
                background: "rgba(22, 45, 82, 0.6)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: "#F8FAFC" }}>
                    {item.title}
                  </p>
                  <p className="text-xs truncate" style={{ color: "#94A3B8" }}>
                    {item.sub}
                  </p>
                </div>
                <span
                  className="text-[10px] font-bold shrink-0 px-2 py-0.5 rounded-full"
                  style={{
                    color: item.statusColor,
                    background: `${item.statusColor}15`,
                    border: `1px solid ${item.statusColor}30`,
                  }}
                >
                  {item.status}
                </span>
              </div>
              {/* Progress bar */}
              <div
                className="mt-2.5 h-1 rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.progress}%` }}
                  transition={{ duration: 1, delay: 0.9 + i * 0.12, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: item.progressColor }}
                />
              </div>
            </motion.div>
          ))}

          {/* Bottom metric bar */}
          <div
            className="flex items-center justify-between pt-2 mt-2 border-t"
            style={{ borderColor: "rgba(212,175,55,0.1)" }}
          >
            <div className="text-center">
              <p className="text-sm font-black" style={{ color: "#D4AF37" }}>
                1.240.000€
              </p>
              <p className="text-[10px]" style={{ color: "#475569" }}>
                Recuperados
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-black" style={{ color: "#059669" }}>
                94,3%
              </p>
              <p className="text-[10px]" style={{ color: "#475569" }}>
                Éxito
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-black" style={{ color: "#2563EB" }}>
                47 min
              </p>
              <p className="text-[10px]" style={{ color: "#475569" }}>
                Respuesta
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating stat cards */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="absolute -left-8 top-1/4 rounded-xl px-3 py-2.5 shadow-lg"
        style={{
          background: "rgba(10, 22, 40, 0.92)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(212,175,55,0.25)",
          boxShadow: "0 0 20px rgba(212,175,55,0.12)",
          animation: "float 6s ease-in-out infinite",
        }}
      >
        <div className="flex items-center gap-2">
          <TrendingUp className="w-3.5 h-3.5" style={{ color: "#D4AF37" }} />
          <span className="text-xs font-bold" style={{ color: "#F8FAFC" }}>
            12.847 clientes
          </span>
        </div>
        <p className="text-[10px] mt-0.5" style={{ color: "#94A3B8" }}>
          protegidos este mes
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.15 }}
        className="absolute -right-6 top-2/3 rounded-xl px-3 py-2.5 shadow-lg"
        style={{
          background: "rgba(10, 22, 40, 0.92)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(5,150,105,0.3)",
          boxShadow: "0 0 20px rgba(5,150,105,0.12)",
          animation: "float 6s ease-in-out 2s infinite",
        }}
      >
        <div className="flex items-center gap-2">
          <Trophy className="w-3.5 h-3.5" style={{ color: "#059669" }} />
          <span className="text-xs font-bold" style={{ color: "#F8FAFC" }}>
            67% casos ganados
          </span>
        </div>
        <p className="text-[10px] mt-0.5" style={{ color: "#94A3B8" }}>
          vs. 23% del sector
        </p>
      </motion.div>
    </div>
  );
}

// ------------------------------------
// Main Hero Component
// ------------------------------------

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{
        background: "linear-gradient(135deg, #040B17 0%, #0A1628 50%, #0F1E3A 100%)",
      }}
    >
      {/* Radial glow center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 20%, rgba(37,99,235,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Dot grid pattern */}
      <DotGrid />

      {/* Gold accent line top */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="absolute top-0 left-0 right-0 h-px origin-center"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #D4AF37 50%, transparent 100%)",
          opacity: 0.5,
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          {/* ── Left: Copy ─────────────────────────────────── */}
          <div className="text-center lg:text-left">
            {/* Badge flotante */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8"
              style={{
                background: "rgba(212,175,55,0.08)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(212,175,55,0.25)",
                boxShadow:
                  "0 0 20px rgba(212,175,55,0.12), 0 0 60px rgba(212,175,55,0.04)",
                color: "#D4AF37",
              }}
            >
              <Trophy className="w-4 h-4" />
              <span>{HERO_COPY.badge}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="text-5xl md:text-6xl xl:text-7xl font-black leading-[1.05] mb-6"
              style={{
                fontFamily: "var(--font-playfair, 'Playfair Display', Georgia, serif)",
                letterSpacing: "-0.02em",
              }}
            >
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #F8FAFC 0%, #CBD5E1 50%, #F8FAFC 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Tu defensa legal.
              </span>
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #B8860B 0%, #D4AF37 40%, #F5D060 60%, #D4AF37 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Activa en minutos.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0"
              style={{ color: "#94A3B8" }}
            >
              {HERO_COPY.subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-10 justify-center lg:justify-start"
            >
              {/* Primary CTA */}
              <Link
                href="/reclamar"
                className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-bold transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg, #1B3A6B 0%, #2563EB 100%)",
                  color: "#F8FAFC",
                  boxShadow:
                    "0 0 30px rgba(37,99,235,0.35), 0 0 80px rgba(37,99,235,0.12)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "linear-gradient(135deg, #1B3A6B 0%, #2563EB 100%)";
                }}
              >
                {HERO_COPY.cta_primary}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Secondary CTA */}
              <Link
                href="/tienda"
                className="group flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-semibold transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: "rgba(15,34,64,0.6)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(212,175,55,0.2)",
                  color: "#D4AF37",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "rgba(212,175,55,0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "rgba(212,175,55,0.2)";
                }}
              >
                {HERO_COPY.cta_secondary}
                <ArrowRight className="w-4 h-4 opacity-60 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Social proof inline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex items-center gap-3 justify-center lg:justify-start flex-wrap"
            >
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-semibold" style={{ color: "#F8FAFC" }}>
                4.9/5
              </span>
              <span className="text-sm" style={{ color: "#475569" }}>
                ·
              </span>
              <span className="text-sm" style={{ color: "#94A3B8" }}>
                12.847 clientes
              </span>
              <span className="text-sm" style={{ color: "#475569" }}>
                ·
              </span>
              <span className="text-sm" style={{ color: "#94A3B8" }}>
                Valorado en Google
              </span>
            </motion.div>

            {/* Floating stats — 3 numbers */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4 mt-10 justify-center lg:justify-start"
            >
              {[
                {
                  icon: Users,
                  value: 12847,
                  suffix: "",
                  label: "clientes protegidos",
                  color: "#D4AF37",
                  borderColor: "rgba(212,175,55,0.2)",
                },
                {
                  icon: TrendingUp,
                  value: 94.3,
                  suffix: "%",
                  label: "satisfacción verificada",
                  color: "#059669",
                  borderColor: "rgba(5,150,105,0.2)",
                },
                {
                  icon: Clock,
                  value: 47,
                  suffix: " min",
                  label: "respuesta media",
                  color: "#2563EB",
                  borderColor: "rgba(37,99,235,0.2)",
                },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.65 + i * 0.08 }}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
                  style={{
                    background: "rgba(15,34,64,0.7)",
                    backdropFilter: "blur(12px)",
                    border: `1px solid ${stat.borderColor}`,
                  }}
                >
                  <stat.icon className="w-4 h-4 shrink-0" style={{ color: stat.color }} />
                  <div>
                    <p className="text-sm font-black leading-none" style={{ color: "#F8FAFC" }}>
                      <AnimatedCounter
                        target={stat.value}
                        suffix={stat.suffix}
                        duration={1500}
                      />
                    </p>
                    <p className="text-[10px] mt-0.5" style={{ color: "#94A3B8" }}>
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Dashboard Mockup ─────────────────────── */}
          <div className="flex justify-center lg:justify-end">
            <DashboardMockup />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #040B17)",
        }}
      />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() =>
          document
            .getElementById("servicios")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <span className="text-xs uppercase tracking-widest" style={{ color: "#475569" }}>
          Descubrir
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" style={{ color: "#D4AF37" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
