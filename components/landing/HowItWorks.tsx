"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { MousePointerClick, ClipboardList, UserCheck, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    icon: MousePointerClick,
    title: "Selecciona tu producto",
    description:
      "Elige el servicio que mejor se adapta a tu situación: protección continua, análisis de documento, recurso de multa o representación completa. Si tienes dudas, nuestro asistente te guía en 60 segundos.",
    detail: "Sin compromisos — cancela cuando quieras",
    color: "#D4AF37",
    bg: "rgba(212,175,55,0.08)",
    border: "rgba(212,175,55,0.25)",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Completa el formulario en 2 minutos",
    description:
      "Un formulario inteligente que solo te pregunta lo que necesitamos. Sube tu documento (PDF, foto o captura) o escribe los detalles del caso. Sin tecnicismos legales. Sin papeleos innecesarios.",
    detail: "Pago seguro con Stripe — Visa, Mastercard, Bizum",
    color: "#2563EB",
    bg: "rgba(37,99,235,0.08)",
    border: "rgba(37,99,235,0.25)",
  },
  {
    number: "03",
    icon: UserCheck,
    title: "Tu abogado está en marcha",
    description:
      "En menos de 2 horas en horario laboral, un abogado colegiado asignado contacta contigo con el primer diagnóstico de tu caso. Recibes su nombre, número de colegiación y línea directa.",
    detail: "Tiempo medio real: 47 minutos",
    color: "#059669",
    bg: "rgba(5,150,105,0.08)",
    border: "rgba(5,150,105,0.25)",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Seguimiento y resolución",
    description:
      "Accede a tu dashboard para ver el estado en tiempo real, enviar documentos adicionales y comunicarte directamente con tu abogado. Transparencia total en cada fase del proceso.",
    detail: "Dashboard 24/7 con notificaciones en tiempo real",
    color: "#D4AF37",
    bg: "rgba(212,175,55,0.08)",
    border: "rgba(212,175,55,0.25)",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// Animated connector line for desktop
function ConnectorLine({ inView, delay }: { inView: boolean; delay: number }) {
  return (
    <div className="hidden lg:flex items-center justify-center w-16 shrink-0 pt-10">
      <div className="relative w-full h-px bg-[rgba(255,255,255,0.06)]">
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay, ease: "easeOut" }}
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, #D4AF37 0%, rgba(212,175,55,0.3) 100%)" }}
        />
        {/* Arrowhead */}
        <motion.div
          initial={{ opacity: 0, x: -4 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.3, delay: delay + 0.5 }}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1"
        >
          <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
        </motion.div>
      </div>
    </div>
  );
}

// Vertical connector for mobile
function MobileConnector({ inView, delay }: { inView: boolean; delay: number }) {
  return (
    <div className="flex lg:hidden justify-center my-2">
      <div className="relative h-12 w-px bg-[rgba(255,255,255,0.06)]">
        <motion.div
          initial={{ scaleY: 0, originY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.4, delay, ease: "easeOut" }}
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, #D4AF37 0%, rgba(212,175,55,0.2) 100%)" }}
        />
      </div>
    </div>
  );
}

interface StepCardProps {
  step: (typeof steps)[0];
  index: number;
  inView: boolean;
}

function StepCard({ step, index, inView }: StepCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      className="relative flex-1 min-w-0 group"
    >
      {/* Mobile connector above (except first) */}
      {index > 0 && <MobileConnector inView={inView} delay={index * 0.15 + 0.3} />}

      <div
        className="relative rounded-2xl p-6 h-full transition-all duration-300 group-hover:-translate-y-1"
        style={{
          background: `rgba(15, 34, 64, 0.6)`,
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          border: `1px solid ${step.border}`,
          boxShadow: `0 0 40px rgba(0,0,0,0.3)`,
        }}
      >
        {/* Number circle */}
        <div className="flex items-center gap-4 mb-5">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-bold text-base transition-transform duration-300 group-hover:scale-110"
            style={{
              background: step.bg,
              border: `2px solid ${step.color}`,
              color: step.color,
              fontFamily: "var(--font-inter)",
            }}
          >
            {step.number}
          </div>
          {/* Icon */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: step.bg }}
          >
            <step.icon className="w-5 h-5" style={{ color: step.color }} />
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-[#F8FAFC] font-semibold text-lg mb-3"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-[#94A3B8] text-sm leading-relaxed mb-5">
          {step.description}
        </p>

        {/* Detail badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
          style={{ background: step.bg, color: step.color }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: step.color }} />
          {step.detail}
        </div>

        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ boxShadow: `0 0 30px ${step.color}15, inset 0 1px 0 ${step.color}10` }}
        />
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="como-funciona" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #040B17 0%, #0A1628 40%, #0A1628 60%, #040B17 100%)" }}
      />

      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, #D4AF37 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeInUp}
            className="text-xs font-semibold uppercase tracking-[0.12em] mb-3"
            style={{ color: "#D4AF37" }}
          >
            Proceso simplificado
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-semibold text-[#F8FAFC] mb-4"
            style={{ fontFamily: "var(--font-inter)", letterSpacing: "-0.01em" }}
          >
            De cero a protegido en{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #D4AF37 0%, #F5D060 50%, #D4AF37 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              4 pasos
            </span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-[#94A3B8] max-w-2xl mx-auto text-base md:text-lg">
            Hemos eliminado toda la burocracia. Tu único trabajo es elegir y subir el documento.
            Nosotros hacemos el resto — con el respaldo de abogados reales.
          </motion.p>
        </motion.div>

        {/* Steps — desktop: horizontal with connectors, mobile: vertical */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col lg:flex-row lg:items-start gap-0"
        >
          {steps.map((step, i) => (
            <div key={step.number} className="contents">
              <StepCard step={step} index={i} inView={inView} />
              {i < steps.length - 1 && (
                <ConnectorLine inView={inView} delay={i * 0.15 + 0.4} />
              )}
            </div>
          ))}
        </motion.div>

        {/* Time proof bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-[#94A3B8]"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
            <span>Tiempo medio contratación → primer contacto: <strong className="text-[#F8FAFC]">47 minutos</strong></span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-[rgba(255,255,255,0.1)]" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <span>Garantía de respuesta en <strong className="text-[#F8FAFC]">menos de 2 horas</strong></span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mt-12"
        >
          <Link
            href="/reclamar"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:scale-[1.02] group"
            style={{
              background: "linear-gradient(135deg, #1B3A6B 0%, #2563EB 100%)",
              color: "#F8FAFC",
              boxShadow: "0 0 30px rgba(37,99,235,0.4), 0 0 80px rgba(37,99,235,0.15)",
            }}
          >
            <span>Empezar mi protección legal</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <p className="text-[#475569] text-sm mt-4">
            Sin registro previo · Garantía 30 días · Primer análisis gratuito
          </p>
        </motion.div>
      </div>
    </section>
  );
}
