"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, CheckCircle, Award, Zap } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: 4.2,
    suffix: "M+",
    prefix: "€",
    label: "Recuperados",
    sublabel: "Para nuestros clientes",
    color: "text-amber-400",
    glow: "shadow-amber-400/20",
    bg: "from-amber-400/10 to-orange-500/10",
    border: "border-amber-400/20",
  },
  {
    icon: CheckCircle,
    value: 12847,
    suffix: "",
    prefix: "",
    label: "Casos Resueltos",
    sublabel: "En toda España",
    color: "text-emerald-400",
    glow: "shadow-emerald-400/20",
    bg: "from-emerald-400/10 to-teal-500/10",
    border: "border-emerald-400/20",
  },
  {
    icon: Award,
    value: 94.3,
    suffix: "%",
    prefix: "",
    label: "Tasa de Éxito",
    sublabel: "Multas y reclamaciones",
    color: "text-indigo-400",
    glow: "shadow-indigo-400/20",
    bg: "from-indigo-400/10 to-purple-500/10",
    border: "border-indigo-400/20",
  },
  {
    icon: Zap,
    value: 48,
    suffix: "h",
    prefix: "",
    label: "Tiempo Medio",
    sublabel: "De análisis a resolución",
    color: "text-cyan-400",
    glow: "shadow-cyan-400/20",
    bg: "from-cyan-400/10 to-blue-500/10",
    border: "border-cyan-400/20",
  },
];

function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    const startTime = Date.now();
    const isFloat = !Number.isInteger(target);

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      if (isFloat) {
        setCount(Math.floor(current * 10) / 10);
      } else {
        setCount(Math.floor(current));
      }

      if (progress >= 1) {
        clearInterval(timer);
        setCount(target);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration, start]);

  return count;
}

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const count = useCounter(stat.value, 2000, inView);

  const formatCount = (n: number) => {
    if (n >= 1000 && !stat.prefix) {
      return n.toLocaleString("es-ES");
    }
    if (n % 1 !== 0) {
      return n.toFixed(1);
    }
    return n.toString();
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative rounded-2xl p-8 bg-gradient-to-br ${stat.bg} border ${stat.border} card-hover group overflow-hidden`}
    >
      {/* Background glow */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-2xl ${stat.glow}`} />

      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.bg} border ${stat.border} flex items-center justify-center mb-6`}>
        <stat.icon className={`w-6 h-6 ${stat.color}`} />
      </div>

      {/* Number */}
      <div className="mb-2">
        <span className={`text-5xl font-black ${stat.color} tabular-nums`} style={{ fontFamily: "var(--font-space-grotesk)" }}>
          {stat.prefix}{formatCount(count)}{stat.suffix}
        </span>
      </div>

      {/* Labels */}
      <p className="text-white font-bold text-lg">{stat.label}</p>
      <p className="text-slate-500 text-sm mt-1">{stat.sublabel}</p>

      {/* Decorative corner */}
      <div className={`absolute top-0 right-0 w-20 h-20 rounded-bl-3xl bg-gradient-to-br ${stat.bg} opacity-50`} />
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-4">
            Resultados reales
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Números que hablan
            <span className="gradient-text-gold"> por sí solos</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Cada euro recuperado, cada multa recurrida, cada contrato analizado.
            Nuestros resultados son verificables y auditados.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        {/* Divider */}
        <div className="divider-gold mt-16 opacity-30" />
      </div>
    </section>
  );
}
