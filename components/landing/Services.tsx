"use client";

import { motion } from "framer-motion";
import { Car, Home, ShoppingBag, Phone, Plane, FileWarning, ChevronRight, TrendingUp } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Car,
    emoji: "🚗",
    title: "Multas de Tráfico",
    subtitle: "DGT · Policía Municipal",
    description:
      "Recurrimos multas de velocidad, estacionamiento, semáforos y cualquier sanción de tráfico. Analizamos defectos formales, prescripción y validez del radar.",
    stats: "€320 recuperados de media",
    successRate: 91,
    href: "/reclamar?tipo=multa_trafico",
    color: "text-amber-400",
    bg: "from-amber-400/10 to-orange-500/5",
    border: "border-amber-400/20",
    hoverBorder: "hover:border-amber-400/40",
    tag: "Más solicitado",
    tagColor: "bg-amber-400/20 text-amber-400",
  },
  {
    icon: Home,
    emoji: "🏠",
    title: "Reclamaciones de Vivienda",
    subtitle: "Alquiler · Compraventa · Hipoteca",
    description:
      "Cláusulas abusivas en contratos de arrendamiento, fianzas no devueltas, defectos en la vivienda, gastos hipotecarios y cláusula suelo.",
    stats: "€2.800 recuperados de media",
    successRate: 88,
    href: "/reclamar?tipo=contrato_vivienda",
    color: "text-indigo-400",
    bg: "from-indigo-400/10 to-purple-500/5",
    border: "border-indigo-400/20",
    hoverBorder: "hover:border-indigo-400/40",
    tag: null,
    tagColor: "",
  },
  {
    icon: ShoppingBag,
    emoji: "📦",
    title: "Devoluciones Online",
    subtitle: "Amazon · AliExpress · Shein y más",
    description:
      "Productos no recibidos, defectuosos o que no corresponden con la descripción. Derecho de desistimiento y reclamaciones a marketplaces.",
    stats: "€180 recuperados de media",
    successRate: 96,
    href: "/reclamar?tipo=compra_online",
    color: "text-emerald-400",
    bg: "from-emerald-400/10 to-teal-500/5",
    border: "border-emerald-400/20",
    hoverBorder: "hover:border-emerald-400/40",
    tag: "Alta tasa de éxito",
    tagColor: "bg-emerald-400/20 text-emerald-400",
  },
  {
    icon: Phone,
    emoji: "📱",
    title: "Conflictos con Telefónicas",
    subtitle: "Vodafone · Movistar · Orange · MásMóvil",
    description:
      "Cobros indebidos, permanencias abusivas, cambios de tarifa no comunicados y cargos por servicios no contratados. Reclamación ante la CNMC.",
    stats: "€450 recuperados de media",
    successRate: 89,
    href: "/reclamar?tipo=telefonica",
    color: "text-cyan-400",
    bg: "from-cyan-400/10 to-blue-500/5",
    border: "border-cyan-400/20",
    hoverBorder: "hover:border-cyan-400/40",
    tag: null,
    tagColor: "",
  },
  {
    icon: Plane,
    emoji: "✈️",
    title: "Reclamaciones Aerolíneas",
    subtitle: "Vuelos cancelados · Retrasos · Denegación",
    description:
      "Reglamento CE 261/2004. Compensaciones de hasta €600 por retrasos, cancelaciones y denegaciones de embarque. Sin comisión si no ganamos.",
    stats: "€410 recuperados de media",
    successRate: 93,
    href: "/reclamar?tipo=aerolinea",
    color: "text-rose-400",
    bg: "from-rose-400/10 to-pink-500/5",
    border: "border-rose-400/20",
    hoverBorder: "hover:border-rose-400/40",
    tag: "Sin pago inicial",
    tagColor: "bg-rose-400/20 text-rose-400",
  },
  {
    icon: FileWarning,
    emoji: "📋",
    title: "Contratos Abusivos",
    subtitle: "B2C · Préstamos · Seguros · Gimnasios",
    description:
      "Identificamos y reclamamos cláusulas nulas en contratos de consumo. Intereses usureros, penalizaciones desproporcionadas y condiciones ilegales.",
    stats: "€1.200 recuperados de media",
    successRate: 85,
    href: "/reclamar?tipo=contrato_abusivo",
    color: "text-violet-400",
    bg: "from-violet-400/10 to-purple-500/5",
    border: "border-violet-400/20",
    hoverBorder: "hover:border-violet-400/40",
    tag: null,
    tagColor: "",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-24 relative">
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
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">
            Nuestras especialidades
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            ¿Qué tipo de caso
            <span className="gradient-text-gold"> tienes?</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Cubrimos los principales conflictos legales del consumidor español.
            Si no ves tu caso, contacta con nosotros — probablemente también podamos ayudarte.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={service.href}>
                <div className={`relative h-full rounded-2xl p-6 bg-gradient-to-br ${service.bg} border ${service.border} ${service.hoverBorder} card-hover group transition-all duration-300 cursor-pointer`}>
                  {/* Tag */}
                  {service.tag && (
                    <div className={`absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-semibold ${service.tagColor}`}>
                      {service.tag}
                    </div>
                  )}

                  {/* Icon & emoji */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.bg} border ${service.border} flex items-center justify-center shrink-0`}>
                      <service.icon className={`w-6 h-6 ${service.color}`} />
                    </div>
                    <span className="text-3xl mt-1">{service.emoji}</span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    {service.title}
                  </h3>
                  <p className={`text-xs font-medium mb-3 ${service.color}`}>
                    {service.subtitle}
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{service.stats}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"
                          style={{ width: `${service.successRate}%` }}
                        />
                      </div>
                      <span className="text-emerald-400 font-semibold">{service.successRate}%</span>
                    </div>
                  </div>

                  {/* Hover arrow */}
                  <div className={`absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${service.color}`}>
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-slate-500 text-sm">
            ¿No encuentras tu tipo de reclamación?{" "}
            <a href="/reclamar" className="text-amber-400 hover:text-amber-300 transition-colors font-medium">
              Cuéntanos tu caso y lo analizamos igualmente →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
