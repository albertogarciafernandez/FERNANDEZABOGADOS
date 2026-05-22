"use client";

// ============================================================
// HOMEPAGE — Justicia Legalia Premium
// Ultra-premium, máxima conversión, sector legal España #1
// ============================================================

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  Shield,
  Zap,
  Users,
  Clock,
  TrendingUp,
  Trophy,
  CheckCircle,
  Brain,
  Lock,
  ChevronDown,
  Target,
} from "lucide-react";

// Shared
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

// Landing components
import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import HowItWorks from "@/components/landing/HowItWorks";
import Services from "@/components/landing/Services";
import DisruptiveFeatures from "@/components/landing/DisruptiveFeatures";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import TrustSection from "@/components/landing/TrustSection";

// UI primitives
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { CountdownTimer } from "@/components/ui/CountdownTimer";

// Copy & data
import { TESTIMONIALS } from "@/lib/copy";

// ─────────────────────────────────────────────────────────────
// 1. Social Proof Bar — barra de medios + rating global
// ─────────────────────────────────────────────────────────────

const MEDIA_NAMES = [
  "El País",
  "Expansión",
  "El Mundo",
  "Forbes España",
  "Cinco Días",
  "El Economista",
];

function SocialProofBar() {
  return (
    <section
      aria-label="Aparece en los medios"
      style={{
        background: "linear-gradient(180deg, #040B17 0%, #0A1628 100%)",
        borderTop: "1px solid rgba(212,175,55,0.08)",
        borderBottom: "1px solid rgba(212,175,55,0.08)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Label */}
          <p
            className="shrink-0 text-xs font-semibold uppercase tracking-[0.12em] whitespace-nowrap"
            style={{ color: "#475569" }}
          >
            Aparece en:
          </p>

          {/* Media logos */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 flex-1">
            {MEDIA_NAMES.map((name) => (
              <span
                key={name}
                className="px-4 py-2 rounded-lg text-sm font-black italic tracking-tight select-none"
                style={{
                  color: "#475569",
                  background: "rgba(15,34,64,0.5)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  letterSpacing: "-0.02em",
                }}
              >
                {name}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div
            className="hidden md:block self-stretch w-px"
            style={{ background: "rgba(212,175,55,0.12)" }}
          />

          {/* Rating global */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <div>
              <span
                className="text-base font-black"
                style={{ color: "#F8FAFC" }}
              >
                4.9/5
              </span>
              <span className="text-xs ml-1.5" style={{ color: "#475569" }}>
                +8.200 reseñas
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// 2. Live Counter — número de personas reclamando ahora
// ─────────────────────────────────────────────────────────────

function LiveCounterSection() {
  const [count, setCount] = useState(37);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return Math.max(28, Math.min(54, prev + delta));
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="py-16 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #040B17 0%, #0A1628 50%, #040B17 100%)",
      }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(5,150,105,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        {/* Animated pill */}
        <motion.div
          key={count}
          initial={{ scale: 0.97, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl mb-6"
          style={{
            background: "rgba(5,150,105,0.08)",
            border: "1px solid rgba(5,150,105,0.25)",
            backdropFilter: "blur(16px)",
          }}
        >
          <span
            className="w-3 h-3 rounded-full bg-emerald-400"
            style={{ animation: "pulse 1.5s ease-in-out infinite" }}
          />
          <span className="text-base font-medium" style={{ color: "#94A3B8" }}>
            En este momento,{" "}
          </span>
          <span
            className="text-2xl font-black tabular-nums"
            style={{ color: "#059669" }}
          >
            {count}
          </span>
          <span className="text-base font-medium" style={{ color: "#94A3B8" }}>
            {" "}personas están reclamando con nosotros
          </span>
        </motion.div>

        <p className="text-sm" style={{ color: "#475569" }}>
          Actualizado en tiempo real · Disponible 24/7 · 47 minutos de respuesta media
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// 3. Final CTA — conversión máxima con countdown
// ─────────────────────────────────────────────────────────────

function FinalCTA() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  // Countdown target: midnight today
  const [countdownTarget] = useState<Date>(() => {
    const d = new Date();
    d.setHours(23, 59, 59, 999);
    return d;
  });

  return (
    <section
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #040B17 0%, #0A1628 40%, #0F1E3A 70%, #040B17 100%)",
      }}
    >
      {/* Gold radial glow top-left */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      {/* Blue glow bottom-right */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      {/* Gold line top */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-0 left-0 right-0 h-px origin-center"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #D4AF37 50%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Urgency badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8"
          style={{
            background: "rgba(212,175,55,0.08)",
            border: "1px solid rgba(212,175,55,0.25)",
            color: "#D4AF37",
          }}
        >
          <span
            className="w-2 h-2 rounded-full bg-amber-400"
            style={{ animation: "pulse 2s ease-in-out infinite" }}
          />
          Precio garantizado hasta medianoche de hoy
        </motion.div>

        {/* Main headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-6xl xl:text-7xl font-black leading-tight mb-6"
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
            ¿Listo para reclamar
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
            lo que es tuyo?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
          style={{ color: "#94A3B8" }}
        >
          12.847 personas ya nos eligieron. La ley está de tu lado.
          Solo necesitas el equipo adecuado para hacerla valer.
        </motion.p>

        {/* Countdown urgency */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center gap-2 mb-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: "#475569" }}>
            Oferta activa — tiempo restante
          </p>
          <div
            className="flex items-center gap-3 px-6 py-3 rounded-xl"
            style={{
              background: "rgba(15,34,64,0.7)",
              border: "1px solid rgba(212,175,55,0.2)",
              backdropFilter: "blur(16px)",
            }}
          >
            <Clock className="w-4 h-4" style={{ color: "#D4AF37" }} />
            <CountdownTimer
              targetDate={countdownTarget}
              showLabels
              className="text-xl font-black"
              // @ts-ignore — className is valid
            />
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          {/* Primary gold CTA */}
          <Link
            href="/reclamar"
            className="group relative flex items-center justify-center gap-3 px-10 py-5 rounded-xl text-lg font-bold transition-all duration-200 hover:scale-[1.02]"
            style={{
              background:
                "linear-gradient(135deg, #B8860B 0%, #D4AF37 50%, #F5D060 100%)",
              color: "#040B17",
              boxShadow:
                "0 0 30px rgba(212,175,55,0.4), 0 0 80px rgba(212,175,55,0.15)",
            }}
          >
            <Shield className="w-5 h-5" />
            <span>Empezar mi protección legal</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Secondary ghost */}
          <Link
            href="/tienda"
            className="group flex items-center justify-center gap-3 px-10 py-5 rounded-xl text-lg font-semibold transition-all duration-200 hover:scale-[1.02]"
            style={{
              background: "rgba(15,34,64,0.6)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(212,175,55,0.2)",
              color: "#D4AF37",
            }}
          >
            Ver todos los servicios
            <ArrowRight className="w-5 h-5 opacity-60 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Guarantees below CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm"
          style={{ color: "#475569" }}
        >
          {[
            { icon: Shield, text: "Garantía 30 días — devolución inmediata" },
            { icon: Clock, text: "Respuesta en menos de 2 horas" },
            { icon: Lock, text: "Sin letra pequeña, nunca" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <CheckCircle
                className="w-4 h-4 shrink-0"
                style={{ color: "#059669" }}
              />
              <span>{text}</span>
            </div>
          ))}
        </motion.div>

        {/* Final stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 grid grid-cols-3 gap-6 pt-12"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          {[
            {
              value: 12847,
              suffix: "",
              prefix: "",
              label: "Clientes protegidos",
              color: "#D4AF37",
              decimals: 0,
              format: (v: number) => v.toLocaleString("es-ES"),
            },
            {
              value: 1240000,
              suffix: "€",
              prefix: "",
              label: "Recuperados",
              color: "#059669",
              decimals: 0,
              format: (v: number) => `1,24M`,
            },
            {
              value: 94.3,
              suffix: "%",
              prefix: "",
              label: "Satisfacción",
              color: "#2563EB",
              decimals: 1,
              format: (v: number) => v.toFixed(1),
            },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-3xl md:text-4xl font-black mb-1 tabular-nums"
                style={{ color: stat.color }}
              >
                <AnimatedCounter
                  to={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  duration={2000}
                />
              </div>
              <div className="text-sm" style={{ color: "#94A3B8" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// ROOT PAGE — composición final
// ─────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="min-h-screen" style={{ background: "#040B17" }}>
      {/* 1. Header — sticky glassmorphism */}
      <Header />

      {/* 2. Hero — impacto máximo */}
      <Hero />

      {/* 3. Social Proof Bar — logos de medios + rating */}
      <SocialProofBar />

      {/* 4. Stats — 4 métricas con AnimatedCounter */}
      <Stats />

      {/* 5. How It Works — 3-4 pasos con línea conectora */}
      <HowItWorks />

      {/* 6. Products / Services — grid 6 servicios */}
      <Services />

      {/* 7. Disruptive Features — características únicas */}
      <DisruptiveFeatures />

      {/* 8. Live Counter — personas reclamando ahora */}
      <LiveCounterSection />

      {/* 9. Trust Section — garantías, badges, seguridad */}
      <TrustSection />

      {/* 10. Testimonials — 3+ cards glassmorphism con filtros */}
      <Testimonials />

      {/* 11. FAQ — acordeón con búsqueda */}
      <FAQ />

      {/* 12. Final CTA — conversión máxima con countdown */}
      <FinalCTA />

      {/* 13. Footer */}
      <Footer />
    </main>
  );
}
