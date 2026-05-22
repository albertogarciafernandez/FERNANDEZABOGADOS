"use client";

import { motion } from "framer-motion";
import { Shield, Mic, Bot, Link2, Sparkles, Zap, Lock, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Shield,
    badge: "PREVENTIVO",
    badgeColor: "bg-amber-400/20 text-amber-400 border-amber-400/30",
    title: "Escudo Legal Predictivo",
    tagline: "Antes de firmar, sabe qué estás firmando",
    description:
      "Sube cualquier contrato antes de firmarlo. Nuestra IA detecta en segundos todas las cláusulas peligrosas, penalizaciones ocultas y condiciones abusivas. Nunca más firmes algo que no entiendes.",
    features: [
      "Detección de cláusulas nulas según TRLGDCU",
      "Alertas de permanencias y penalizaciones",
      "Comparativa con contratos del sector",
      "Negociación de términos sugerida",
    ],
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    border: "border-amber-400/20",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-400/10",
    glowColor: "rgba(245,158,11,0.15)",
  },
  {
    icon: Mic,
    badge: "TIEMPO REAL",
    badgeColor: "bg-indigo-400/20 text-indigo-400 border-indigo-400/30",
    title: "Abogado IA en Tiempo Real",
    tagline: "Tu escudo durante la llamada",
    description:
      "Activa el asistente de voz antes de llamar a atención al cliente. Te escucha, analiza lo que te dicen en tiempo real y te susurra los argumentos legales exactos que debes usar para conseguir tu devolución.",
    features: [
      "Análisis de audio en tiempo real",
      "Argumentos legales al momento",
      "Detección de presiones ilegales",
      "Grabación legal de la conversación",
    ],
    gradient: "from-indigo-500/20 via-purple-500/10 to-transparent",
    border: "border-indigo-400/20",
    iconColor: "text-indigo-400",
    iconBg: "bg-indigo-400/10",
    glowColor: "rgba(99,102,241,0.15)",
  },
  {
    icon: Bot,
    badge: "AUTÓNOMO",
    badgeColor: "bg-cyan-400/20 text-cyan-400 border-cyan-400/30",
    title: "Agentes Negociadores IA",
    tagline: "Bots que recuperan tu dinero solos",
    description:
      "Agentes autónomos que contactan directamente con Amazon, Ryanair, Booking, y más de 500 empresas. Negocian reembolsos, presentan reclamaciones y hacen seguimiento sin que muevas un dedo.",
    features: [
      "500+ empresas integradas",
      "Negociación autónoma 24/7",
      "Sin intervención manual",
      "Éxito o no cobras nada",
    ],
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    border: "border-cyan-400/20",
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-400/10",
    glowColor: "rgba(34,211,238,0.15)",
  },
  {
    icon: Link2,
    badge: "BLOCKCHAIN",
    badgeColor: "bg-emerald-400/20 text-emerald-400 border-emerald-400/30",
    title: "Certificación Blockchain",
    tagline: "Contratos entre particulares con fuerza legal",
    description:
      "Genera contratos entre particulares (alquiler de coche, préstamo a amigo, acuerdo de trabajo) certificados en blockchain. Valor probatorio ante juzgados. Sin notario.",
    features: [
      "Certificado en Ethereum/Polygon",
      "Valor probatorio reconocido",
      "Sin notario necesario",
      "Firma digital biométrica",
    ],
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    border: "border-emerald-400/20",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-400/10",
    glowColor: "rgba(52,211,153,0.15)",
  },
];

export default function DisruptiveFeatures() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #050508 0%, #080820 50%, #050508 100%)" }} />

      {/* Decorative orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          {/* NUNCA VISTO badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6 border border-amber-400/30 bg-amber-400/5"
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-amber-400 text-sm font-bold uppercase tracking-widest">
              Nunca visto en España
            </span>
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-black text-white mb-6" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Tecnología que va
            <br />
            <span className="gradient-text-gold">más allá de lo posible</span>
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto text-lg">
            No somos solo una plataforma de recursos legales. Somos el futuro de la justicia del consumidor.
            Cuatro herramientas revolucionarias que nadie más tiene.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative"
            >
              <div
                className={`relative rounded-3xl p-8 border ${feature.border} overflow-hidden card-hover`}
                style={{
                  background: `linear-gradient(135deg, ${feature.glowColor} 0%, rgba(13,13,26,0.95) 100%)`,
                  boxShadow: `0 0 60px ${feature.glowColor}`,
                }}
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-60`} />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl ${feature.iconBg} border ${feature.border} flex items-center justify-center`}>
                        <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                      </div>
                      <div>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-bold ${feature.badgeColor}`}>
                          <Zap className="w-3 h-3 mr-1" />
                          {feature.badge}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-black text-white mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    {feature.title}
                  </h3>
                  <p className={`text-sm font-semibold mb-4 ${feature.iconColor}`}>
                    {feature.tagline}
                  </p>
                  <p className="text-slate-400 leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* Feature list */}
                  <ul className="space-y-2 mb-6">
                    {feature.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm">
                        <div className={`w-5 h-5 rounded-full ${feature.iconBg} border ${feature.border} flex items-center justify-center shrink-0`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${feature.iconColor}`} />
                        </div>
                        <span className="text-slate-300">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button className={`flex items-center gap-2 text-sm font-semibold ${feature.iconColor} group-hover:gap-3 transition-all`}>
                    <span>Próximamente</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Corner decoration */}
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-3xl ${feature.iconBg} opacity-20`} />
                <Lock className={`absolute bottom-6 right-6 w-4 h-4 ${feature.iconColor} opacity-30`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
