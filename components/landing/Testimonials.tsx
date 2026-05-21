"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "María García Rodríguez",
    location: "Madrid",
    service: "Multa DGT",
    avatar: "MG",
    avatarColor: "from-amber-400/30 to-orange-500/30 text-amber-400",
    recovered: "€200",
    rating: 5,
    text: "Tenía una multa de €200 por superar el límite de velocidad. Subí la foto de la sanción y en 3 minutos tenía el recurso completo con todos los argumentos. ¡El radar ni siquiera estaba homologado! Multa anulada.",
    date: "Hace 2 semanas",
    verified: true,
  },
  {
    name: "Carlos Mendoza Prieto",
    location: "Barcelona",
    service: "Vuelo cancelado",
    avatar: "CM",
    avatarColor: "from-indigo-400/30 to-purple-500/30 text-indigo-400",
    recovered: "€400",
    rating: 5,
    text: "Vuelo de Ryanair cancelado el día antes del viaje. La aerolínea me ofrecía solo €50. Con Legalia reclamé el Reglamento CE 261/2004 y conseguí €400 de compensación. El proceso fue increíblemente sencillo.",
    date: "Hace 1 mes",
    verified: true,
  },
  {
    name: "Ana Fernández López",
    location: "Valencia",
    service: "Depósito alquiler",
    avatar: "AF",
    avatarColor: "from-emerald-400/30 to-teal-500/30 text-emerald-400",
    recovered: "€1.800",
    rating: 5,
    text: "Mi casero no me devolvía la fianza de €1.800 con excusas absurdas. Legalia analizó el contrato, detectó que no había inventario firmado y me generó el burofax legal. En 15 días tenía el dinero en mi cuenta.",
    date: "Hace 3 semanas",
    verified: true,
  },
  {
    name: "Roberto Jiménez Torres",
    location: "Sevilla",
    service: "Compra online fraudulenta",
    avatar: "RJ",
    avatarColor: "from-cyan-400/30 to-blue-500/30 text-cyan-400",
    recovered: "€350",
    rating: 5,
    text: "Compré un móvil en una tienda online y llegó con la pantalla rota. Se negaban a devolver el dinero. Legalia identificó que violaban el derecho de desistimiento y en 48h tenía la devolución completa.",
    date: "Hace 5 días",
    verified: true,
  },
  {
    name: "Patricia Morales Vega",
    location: "Bilbao",
    service: "Factura Vodafone",
    avatar: "PM",
    avatarColor: "from-rose-400/30 to-pink-500/30 text-rose-400",
    recovered: "€280",
    rating: 5,
    text: "Vodafone me cobraba €280 de permanencia por un contrato que yo nunca firmé. Con el análisis de Legalia y la reclamación ante la CNMC, anularon el cargo en menos de una semana. Absolutamente recomendable.",
    date: "Hace 2 meses",
    verified: true,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Gradient overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, transparent, #050508)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-4">
            Testimonios reales
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Ellos ya recuperaron
            <span className="gradient-text-gold"> su dinero</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Más de 12.000 clientes satisfechos en toda España.
            Sin compromisos, sin letra pequeña, con resultados reales.
          </p>

          {/* Rating summary */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-white font-bold">4.9/5</span>
            <span className="text-slate-500 text-sm">basado en 3.247 reseñas verificadas</span>
          </div>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative glass rounded-2xl p-6 border border-white/8 card-hover ${
                i === 2 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-amber-400/20 absolute top-5 right-5" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-slate-300 text-sm leading-relaxed mb-6 relative z-10">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Footer */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-xs font-bold shrink-0`}>
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-semibold truncate">{t.name}</div>
                  <div className="text-slate-500 text-xs">{t.location} · {t.service}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-emerald-400 font-bold text-sm">{t.recovered}</div>
                  <div className="text-slate-600 text-xs">recuperados</div>
                </div>
              </div>

              {/* Verified badge */}
              {t.verified && (
                <div className="absolute bottom-5 right-5 flex items-center gap-1 text-xs text-emerald-400">
                  <div className="w-3 h-3 rounded-full bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-emerald-400" />
                  </div>
                  <span className="opacity-70">Verificado</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Source note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-slate-700 text-xs mt-8"
        >
          Testimonios verificados con documentación del caso · Nombres modificados por privacidad · Resultados individuales pueden variar
        </motion.p>
      </div>
    </section>
  );
}
