"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, TrendingUp, Star, Clock } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 12847,
    suffix: "",
    prefix: "",
    label: "Familias y empresas protegidas",
    description: "Clientes activos en toda España",
    formatThousands: true,
  },
  {
    icon: Star,
    value: 94.3,
    suffix: "%",
    prefix: "",
    label: "Valoración positiva",
    description: "En más de 8.200 reseñas verificadas",
    formatThousands: false,
  },
  {
    icon: TrendingUp,
    value: 67,
    suffix: "%",
    prefix: "",
    label: "Recursos de tráfico ganados",
    description: "Frente al 23% de media del sector",
    formatThousands: false,
  },
  {
    icon: Clock,
    value: 47,
    suffix: " min",
    prefix: "",
    label: "Tiempo medio de respuesta",
    description: "Desde la contratación hasta el primer contacto",
    formatThousands: false,
  },
];

function useCounter(target: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    const startTime = Date.now();
    const isFloat = !Number.isInteger(target);

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      setCount(isFloat ? Math.floor(current * 10) / 10 : Math.floor(current));

      if (progress >= 1) {
        clearInterval(timer);
        setCount(target);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration, start]);

  return count;
}

interface StatItemProps {
  stat: (typeof stats)[0];
  index: number;
}

function StatItem({ stat, index }: StatItemProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCounter(stat.value, 1500, inView);

  const formatCount = (n: number) => {
    if (stat.formatThousands && n >= 1000) {
      return n.toLocaleString("es-ES");
    }
    if (!Number.isInteger(stat.value)) {
      return n.toFixed(1);
    }
    return Math.floor(n).toString();
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="relative flex flex-col items-center text-center px-6 py-8 group"
    >
      {/* Icon circle */}
      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-5 border border-[rgba(212,175,55,0.2)] bg-[rgba(212,175,55,0.08)] group-hover:border-[rgba(212,175,55,0.4)] transition-colors duration-300">
        <stat.icon className="w-5 h-5 text-[#D4AF37]" />
      </div>

      {/* Animated number */}
      <div className="mb-2">
        <span
          className="text-5xl md:text-6xl font-bold tabular-nums"
          style={{
            background: "linear-gradient(135deg, #D4AF37 0%, #F5D060 50%, #D4AF37 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontFamily: "var(--font-inter)",
          }}
        >
          {stat.prefix}{formatCount(count)}{stat.suffix}
        </span>
      </div>

      {/* Label */}
      <p className="text-[#F8FAFC] font-semibold text-base mb-1">{stat.label}</p>

      {/* Description */}
      <p className="text-[#94A3B8] text-sm leading-relaxed max-w-[180px]">{stat.description}</p>
    </motion.div>
  );
}

// Vertical separator for desktop
function Separator() {
  return (
    <div className="hidden lg:block w-px self-stretch my-8" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(212,175,55,0.25) 30%, rgba(212,175,55,0.25) 70%, transparent 100%)" }} />
  );
}

export default function Stats() {
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, #040B17 0%, #0A1628 50%, #040B17 100%)" }} />

      {/* Gold line top */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={sectionInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="absolute top-0 left-0 right-0 h-px origin-center"
        style={{ background: "linear-gradient(90deg, transparent 0%, #D4AF37 50%, transparent 100%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12"
        >
          <p className="text-[#D4AF37] text-xs font-semibold uppercase tracking-[0.12em] mb-3">
            Resultados verificados
          </p>
          <h2
            className="text-3xl md:text-5xl font-semibold text-[#F8FAFC] mb-3"
            style={{ fontFamily: "var(--font-inter)", letterSpacing: "-0.01em" }}
          >
            Números que hablan{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #D4AF37 0%, #F5D060 50%, #D4AF37 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              por sí solos
            </span>
          </h2>
          <p className="text-[#94A3B8] max-w-xl mx-auto text-base">
            Cada euro recuperado, cada multa recurrida, cada contrato analizado. Resultados auditables.
          </p>
        </motion.div>

        {/* Glass container with stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            background: "rgba(15, 34, 64, 0.6)",
            backdropFilter: "blur(16px) saturate(180%)",
            WebkitBackdropFilter: "blur(16px) saturate(180%)",
            border: "1px solid rgba(212, 175, 55, 0.15)",
            borderRadius: "16px",
          }}
        >
          {/* Desktop: horizontal row with vertical separators */}
          <div className="hidden lg:flex items-stretch">
            {stats.map((stat, i) => (
              <>
                <div key={stat.label} className="flex-1">
                  <StatItem stat={stat} index={i} />
                </div>
                {i < stats.length - 1 && <Separator key={`sep-${i}`} />}
              </>
            ))}
          </div>

          {/* Mobile: 2x2 grid */}
          <div className="grid grid-cols-2 lg:hidden">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`relative ${
                  i % 2 === 0 ? "border-r border-[rgba(212,175,55,0.12)]" : ""
                } ${
                  i < 2 ? "border-b border-[rgba(212,175,55,0.12)]" : ""
                }`}
              >
                <StatItem stat={stat} index={i} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Gold line bottom */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={sectionInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 h-px origin-center"
        style={{ background: "linear-gradient(90deg, transparent 0%, #D4AF37 50%, transparent 100%)" }}
      />
    </section>
  );
}
