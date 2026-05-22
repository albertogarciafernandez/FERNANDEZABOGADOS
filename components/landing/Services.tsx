"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle, Shield, Zap, Target, Building2, FileSignature, Scale } from "lucide-react";

const services = [
  {
    id: "escudo-total",
    icon: Shield,
    emoji: "🛡️",
    name: "Escudo Total™",
    badge: "MAS POPULAR",
    badgeColor: "#D4AF37",
    tagline: "Protección legal 360° para tu familia",
    description:
      "Consultas ilimitadas con abogado colegiado, revisión de contratos y línea de emergencia 24/7. Tu escudo legal siempre activado.",
    price: 29,
    originalPrice: 599,
    period: "/mes",
    periodNote: "Facturado anualmente",
    href: "/tienda/escudo-total",
    featured: true,
    color: "#D4AF37",
    border: "rgba(212,175,55,0.35)",
    bg: "rgba(212,175,55,0.06)",
    highlights: ["Consultas ilimitadas < 2h", "Revisión de documentos", "Línea emergencia 24/7"],
  },
  {
    id: "analisis-expres",
    icon: Zap,
    emoji: "⚡",
    name: "Análisis Exprés™",
    badge: "60 SEGUNDOS",
    badgeColor: "#2563EB",
    tagline: "Resultado inmediato garantizado",
    description:
      "Sube cualquier contrato o multa. Nuestra IA lo analiza en 60 segundos: riesgos, cláusulas abusivas y recomendación de acción.",
    price: 9.90,
    originalPrice: 49,
    period: "/análisis",
    periodNote: "Pago único por uso",
    href: "/tienda/analisis-expres",
    featured: false,
    color: "#2563EB",
    border: "rgba(37,99,235,0.25)",
    bg: "rgba(37,99,235,0.06)",
    highlights: ["Detección de cláusulas abusivas", "Semáforo de riesgo", "Recomendación de acción"],
  },
  {
    id: "recurso-garantizado",
    icon: Target,
    emoji: "🎯",
    name: "Recurso Garantizado™",
    badge: "SIN RIESGO",
    badgeColor: "#059669",
    tagline: "Solo pagas si ganamos",
    description:
      "Recurrimos tu multa de tráfico sin coste inicial. Tasa de éxito del 67%. Si perdemos, no nos debes nada.",
    price: 0,
    originalPrice: null,
    period: "",
    periodNote: "30% del ahorro conseguido si ganamos",
    href: "/tienda/recurso-garantizado",
    featured: false,
    color: "#059669",
    border: "rgba(5,150,105,0.25)",
    bg: "rgba(5,150,105,0.06)",
    highlights: ["Análisis de viabilidad gratuito", "Abogado especialista en tráfico", "67% de recursos ganados"],
  },
  {
    id: "pack-empresarial",
    icon: Building2,
    emoji: "🏢",
    name: "Pack Empresarial™",
    badge: "PYMES",
    badgeColor: "#7C3AED",
    tagline: "Tu departamento jurídico externo",
    description:
      "El equipo legal que tu empresa necesita pero no puede contratar internamente. Contratos, inspecciones, RGPD y más.",
    price: 149,
    originalPrice: 1200,
    period: "/mes",
    periodNote: "Sin permanencia — cancela cuando quieras",
    href: "/tienda/pack-empresarial",
    featured: false,
    color: "#7C3AED",
    border: "rgba(124,58,237,0.25)",
    bg: "rgba(124,58,237,0.06)",
    highlights: ["Abogado de empresa asignado", "Respuesta garantizada < 4h", "Auditoría RGPD incluida"],
  },
  {
    id: "contrato-blindado",
    icon: FileSignature,
    emoji: "✍️",
    name: "Contrato Blindado™",
    badge: "IA + ABOGADO",
    badgeColor: "#0891B2",
    tagline: "Doble revisión garantizada",
    description:
      "IA en 60 segundos + abogado especialista. Recibes el informe de riesgos y la versión negociable lista para enviar.",
    price: 149,
    originalPrice: 450,
    period: "/contrato",
    periodNote: "Pago único — incluye consulta de 30 min",
    href: "/tienda/contrato-blindado",
    featured: false,
    color: "#0891B2",
    border: "rgba(8,145,178,0.25)",
    bg: "rgba(8,145,178,0.06)",
    highlights: ["Pre-análisis IA inmediato", "Revisión por abogado especialista", "Propuesta de redacción alternativa"],
  },
  {
    id: "defensa-premium",
    icon: Scale,
    emoji: "👨‍⚖️",
    name: "Defensa Premium™",
    badge: "ABOGADO DEDICADO",
    badgeColor: "#DC2626",
    tagline: "Desde primer día hasta sentencia",
    description:
      "Un abogado de élite asignado exclusivamente a tu caso. Estrategia personalizada, comunicación directa y seguimiento quincenal.",
    price: 1200,
    originalPrice: 3500,
    period: "",
    periodNote: "Evaluación gratuita — presupuesto personalizado",
    href: "/tienda/defensa-premium",
    featured: false,
    color: "#DC2626",
    border: "rgba(220,38,38,0.25)",
    bg: "rgba(220,38,38,0.06)",
    highlights: ["Abogado senior dedicado", "Estrategia legal escrita", "Representación completa"],
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
  visible: { transition: { staggerChildren: 0.08 } },
};

interface ServiceCardProps {
  service: (typeof services)[0];
}

function ServiceCard({ service }: ServiceCardProps) {
  const isFree = service.price === 0;
  const isFromPrice = service.id === "defensa-premium";

  return (
    <Link href={service.href} className="block group">
      <div
        className="relative h-full rounded-2xl p-6 flex flex-col transition-all duration-250"
        style={{
          background: service.featured
            ? "rgba(10, 22, 40, 0.8)"
            : `rgba(15, 34, 64, 0.5)`,
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          border: `1px solid ${service.border}`,
          boxShadow: service.featured
            ? `0 0 40px rgba(212,175,55,0.08), inset 0 1px 0 rgba(245,208,96,0.1)`
            : "none",
        }}
      >
        {/* Hover effect overlay */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-250 pointer-events-none"
          style={{ boxShadow: `0 0 30px ${service.color}18` }}
        />

        {/* Featured gold border glow */}
        {service.featured && (
          <div className="absolute -inset-px rounded-2xl pointer-events-none" style={{ background: `linear-gradient(135deg, rgba(212,175,55,0.3), transparent 50%, rgba(212,175,55,0.1))`, borderRadius: "inherit" }} />
        )}

        {/* Badge */}
        <div className="flex items-start justify-between mb-5">
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider"
            style={{
              background: `${service.badgeColor}18`,
              color: service.badgeColor,
              border: `1px solid ${service.badgeColor}30`,
            }}
          >
            {service.badge}
          </div>
          <span className="text-2xl">{service.emoji}</span>
        </div>

        {/* Icon + Name */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: service.bg }}
          >
            <service.icon className="w-5 h-5" style={{ color: service.color }} />
          </div>
          <h3
            className="text-[#F8FAFC] font-semibold text-lg leading-tight"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {service.name}
          </h3>
        </div>

        {/* Tagline */}
        <p className="text-sm font-medium mb-3" style={{ color: service.color }}>
          {service.tagline}
        </p>

        {/* Description */}
        <p className="text-[#94A3B8] text-sm leading-relaxed mb-5 flex-1">
          {service.description}
        </p>

        {/* Highlights */}
        <ul className="space-y-2 mb-6">
          {service.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2 text-xs text-[#94A3B8]">
              <CheckCircle className="w-3.5 h-3.5 shrink-0" style={{ color: service.color }} />
              {h}
            </li>
          ))}
        </ul>

        {/* Price */}
        <div className="pt-4 border-t" style={{ borderColor: `${service.border}` }}>
          <div className="flex items-baseline gap-2 mb-0.5">
            {isFree ? (
              <span className="text-3xl font-bold" style={{ color: service.color }}>
                0€ inicial
              </span>
            ) : (
              <>
                {isFromPrice && (
                  <span className="text-sm text-[#94A3B8] mr-0.5">Desde</span>
                )}
                <span className="text-3xl font-bold" style={{ color: service.color }}>
                  {service.price.toLocaleString("es-ES", { style: "currency", currency: "EUR", minimumFractionDigits: service.price % 1 !== 0 ? 2 : 0 })}
                </span>
                {service.period && (
                  <span className="text-sm text-[#94A3B8]">{service.period}</span>
                )}
                {service.originalPrice && (
                  <span className="text-sm text-[#475569] line-through ml-1">
                    {service.originalPrice.toLocaleString("es-ES", { style: "currency", currency: "EUR", minimumFractionDigits: 0 })}
                  </span>
                )}
              </>
            )}
          </div>
          <p className="text-[#475569] text-xs">{service.periodNote}</p>
        </div>

        {/* CTA row */}
        <div
          className="mt-4 flex items-center justify-between text-sm font-medium transition-colors duration-200"
          style={{ color: service.color }}
        >
          <span>Ver más detalles</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

export default function Services() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="servicios" ref={sectionRef} className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, #040B17 0%, #0A1628 100%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.12em] mb-3" style={{ color: "#D4AF37" }}>
            Nuestros servicios
          </p>
          <h2
            className="text-3xl md:text-5xl font-semibold text-[#F8FAFC] mb-4"
            style={{ fontFamily: "var(--font-inter)", letterSpacing: "-0.01em" }}
          >
            La protección legal que{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #D4AF37 0%, #F5D060 50%, #D4AF37 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              necesitas
            </span>
          </h2>
          <p className="text-[#94A3B8] max-w-2xl mx-auto text-base md:text-lg">
            Desde protección continua para tu familia hasta representación completa en juicio.
            Precios fijos y transparentes — sin sorpresas en la factura, nunca.
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={fadeInUp}>
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mt-10"
        >
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#F5D060] font-medium text-sm transition-colors duration-200 border border-[rgba(212,175,55,0.3)] hover:border-[rgba(212,175,55,0.5)] px-5 py-2.5 rounded-xl hover:bg-[rgba(212,175,55,0.06)]"
          >
            Ver todos los servicios
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
