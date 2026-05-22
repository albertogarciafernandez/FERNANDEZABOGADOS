"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Lock, FileCheck, Award, CreditCard, Star, Users, CheckCircle } from "lucide-react";
import { GUARANTEES } from "@/lib/copy";

// ------------------------------------
// Pulsing real-time counter
// ------------------------------------

function LiveCounter() {
  const [count, setCount] = useState(34);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, or +1
        return Math.max(28, Math.min(42, prev + delta));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      key={count}
      initial={{ opacity: 0.6, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
      style={{
        background: "rgba(5,150,105,0.1)",
        border: "1px solid rgba(5,150,105,0.25)",
        color: "#059669",
      }}
    >
      <span
        className="w-2 h-2 rounded-full bg-emerald-400"
        style={{ animation: "pulse 2s ease-in-out infinite" }}
      />
      En este momento,{" "}
      <span className="font-black text-emerald-400 mx-1">{count}</span> personas
      están reclamando con nosotros
    </motion.div>
  );
}

// ------------------------------------
// Guarantee Card
// ------------------------------------

const GUARANTEE_ICONS: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  "shield-check": Shield,
  "clock": (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  "eye": (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
};

// ------------------------------------
// Media logos bar
// ------------------------------------

const MEDIA_LOGOS = [
  "El País",
  "Expansión",
  "El Mundo",
  "Forbes España",
  "Cinco Días",
  "El Economista",
];

// ------------------------------------
// Security badges
// ------------------------------------

const SECURITY_BADGES = [
  { icon: Lock, label: "SSL 256-bit", sub: "Cifrado bancario" },
  { icon: FileCheck, label: "RGPD Compliance", sub: "AEPD Certificado" },
  { icon: Award, label: "Colegio Abogados", sub: "Madrid · Nº 45.218" },
  { icon: Shield, label: "ISO 27001", sub: "Seguridad datos" },
  { icon: CreditCard, label: "Stripe Verified", sub: "Pago 100% seguro" },
  { icon: Star, label: "Trustpilot 4.9", sub: "8.200+ reseñas" },
];

// ------------------------------------
// Main Component
// ------------------------------------

export default function TrustSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="confianza"
      className="relative py-24 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #040B17 0%, #0A1628 50%, #040B17 100%)",
      }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* ── SECTION 1: Aparece en los medios ─────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-center text-xs font-semibold uppercase tracking-widest mb-8"
            style={{ color: "#475569", letterSpacing: "0.12em" }}
          >
            Como aparece en
          </p>

          {/* Media logos — CSS text design */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {MEDIA_LOGOS.map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.08 * i }}
                className="group relative px-5 py-3 rounded-xl transition-all duration-200"
                style={{
                  background: "rgba(15,34,64,0.5)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span
                  className="text-base font-black tracking-tight select-none group-hover:opacity-100 transition-opacity"
                  style={{
                    color: "#475569",
                    fontStyle: "italic",
                    opacity: 0.7,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── SECTION 2: Real-time counter ──────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <LiveCounter />
        </motion.div>

        {/* ── SECTION 3: 3 Garantías ─────────────────────────────── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-center mb-12"
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "#D4AF37", letterSpacing: "0.12em" }}
            >
              Sin letra pequeña
            </p>
            <h2
              className="text-3xl md:text-4xl font-black"
              style={{
                fontFamily: "var(--font-space-grotesk, system-ui)",
                color: "#F8FAFC",
              }}
            >
              Tres garantías{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #B8860B 0%, #D4AF37 50%, #F5D060 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                incondicionales
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {GUARANTEES.map((g, i) => {
              const Icon = GUARANTEE_ICONS[g.icon] ?? Shield;
              return (
                <motion.div
                  key={g.title}
                  initial={{ opacity: 0, y: 28 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + i * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="relative rounded-2xl p-7 flex flex-col items-start"
                  style={{
                    background: "rgba(10, 22, 40, 0.8)",
                    backdropFilter: "blur(24px) saturate(200%)",
                    WebkitBackdropFilter: "blur(24px) saturate(200%)",
                    border: "1px solid rgba(212, 175, 55, 0.2)",
                    boxShadow:
                      "0 0 40px rgba(212,175,55,0.06), inset 0 1px 0 rgba(245,208,96,0.08)",
                  }}
                >
                  {/* Glow corner */}
                  <div
                    className="absolute top-0 left-0 w-24 h-24 rounded-tl-2xl pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at top left, rgba(212,175,55,0.08) 0%, transparent 70%)",
                    }}
                  />

                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shrink-0"
                    style={{
                      background: "rgba(212,175,55,0.1)",
                      border: "1px solid rgba(212,175,55,0.2)",
                    }}
                  >
                    <Icon
                      className="w-7 h-7"
                      style={{ color: "#D4AF37" }}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-lg font-bold mb-3"
                    style={{ color: "#F8FAFC" }}
                  >
                    {g.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#94A3B8" }}
                  >
                    {g.description}
                  </p>

                  {/* Accent bottom line */}
                  <div
                    className="mt-5 h-0.5 w-full rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, #D4AF37 0%, transparent 100%)",
                      opacity: 0.3,
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── SECTION 4: Security badges grid ────────────────────── */}
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center text-xs font-semibold uppercase tracking-widest mb-8"
            style={{ color: "#475569", letterSpacing: "0.12em" }}
          >
            Seguridad y certificaciones
          </motion.p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {SECURITY_BADGES.map((badge, i) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.06 }}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl text-center"
                  style={{
                    background: "rgba(15,34,64,0.5)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: "rgba(37,99,235,0.1)",
                      border: "1px solid rgba(37,99,235,0.15)",
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: "#2563EB" }} />
                  </div>
                  <div>
                    <p
                      className="text-xs font-bold leading-tight"
                      style={{ color: "#F8FAFC" }}
                    >
                      {badge.label}
                    </p>
                    <p className="text-[10px] mt-0.5" style={{ color: "#475569" }}>
                      {badge.sub}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── SECTION 5: Key trust stats ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative rounded-2xl px-8 py-10 overflow-hidden"
          style={{
            background: "rgba(10, 22, 40, 0.7)",
            border: "1px solid rgba(212,175,55,0.15)",
          }}
        >
          {/* Bg glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at top, rgba(37,99,235,0.08) 0%, transparent 65%)",
            }}
          />

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              {
                icon: Users,
                value: "12.847",
                label: "Clientes protegidos",
                color: "#D4AF37",
              },
              {
                icon: CheckCircle,
                value: "94,3%",
                label: "Satisfacción verificada",
                color: "#059669",
              },
              {
                icon: Shield,
                value: "67%",
                label: "Recursos ganados",
                color: "#2563EB",
              },
              {
                icon: Star,
                value: "4,9/5",
                label: "Rating Trustpilot",
                color: "#D4AF37",
              },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label}>
                  <Icon
                    className="w-6 h-6 mx-auto mb-3"
                    style={{ color: stat.color }}
                  />
                  <p
                    className="text-3xl font-black mb-1"
                    style={{
                      color: stat.color,
                      fontFamily: "var(--font-space-grotesk, system-ui)",
                    }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-sm" style={{ color: "#94A3B8" }}>
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
