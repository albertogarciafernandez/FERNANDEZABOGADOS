"use client";

import { motion } from "framer-motion";
import { Shield, UserCheck, Scale, Lock, Award, AlertTriangle, CheckCircle, Users } from "lucide-react";

const badges = [
  { icon: Award, label: "Colegio de Abogados", sublabel: "Supervisión colegiada", color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20" },
  { icon: Shield, label: "GDPR / RGPD", sublabel: "Datos protegidos UE", color: "text-indigo-400", bg: "bg-indigo-400/10 border-indigo-400/20" },
  { icon: Lock, label: "SSL 256-bit", sublabel: "Cifrado de grado bancario", color: "text-cyan-400", bg: "bg-cyan-400/10 border-cyan-400/20" },
  { icon: Scale, label: "ISO 27001", sublabel: "Seguridad certificada", color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
];

const team = [
  { name: "Dra. Carmen Ruiz", role: "Directora Legal", specialty: "Derecho del Consumidor", exp: "18 años" },
  { name: "Lic. Miguel Sánchez", role: "Abogado Senior", specialty: "Derecho de Tráfico", exp: "12 años" },
  { name: "Dra. Laura Martínez", role: "Abogada Senior", specialty: "Contratos y Civil", exp: "15 años" },
];

export default function TrustSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #050508 0%, #0a0a20 100%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Trust content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-4">
              Seguridad y confianza
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              IA validada por
              <br />
              <span className="gradient-text-gold">abogados reales</span>
            </h2>

            {/* Hybrid model explanation */}
            <div className="glass rounded-2xl p-6 border border-white/10 mb-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
                  <UserCheck className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Supervisión Jurídica Híbrida</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Nuestro modelo combina la velocidad de la IA con la precisión del conocimiento jurídico humano.
                    Cada análisis es revisado por abogados colegiados antes de convertirse en un recurso oficial.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { step: "1", text: "IA genera el análisis jurídico inicial", color: "bg-indigo-400" },
                  { step: "2", text: "Abogado colegiado revisa y valida", color: "bg-amber-400" },
                  { step: "3", text: "Documento certificado y enviado", color: "bg-emerald-400" },
                ].map((item) => (
                  <div key={item.step} className="flex items-center gap-3 text-sm">
                    <div className={`w-5 h-5 rounded-full ${item.color} flex items-center justify-center text-slate-900 text-xs font-bold shrink-0`}>
                      {item.step}
                    </div>
                    <span className="text-slate-400">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-400/5 border border-amber-400/20">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-sm text-slate-400 leading-relaxed">
                <strong className="text-amber-400">Aviso importante:</strong> Los análisis de Justicia Legalia tienen carácter orientativo.
                Para casos complejos, recomendamos siempre consultar con un abogado colegiado.
                Nuestro servicio Premium incluye revisión humana de todos los documentos.
              </p>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              {badges.map((badge) => (
                <div key={badge.label} className={`flex items-center gap-3 p-3 rounded-xl border ${badge.bg}`}>
                  <badge.icon className={`w-5 h-5 ${badge.color} shrink-0`} />
                  <div>
                    <div className="text-xs font-bold text-white">{badge.label}</div>
                    <div className="text-xs text-slate-500">{badge.sublabel}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Team + stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="glass rounded-2xl border border-white/10 overflow-hidden">
              {/* Team header */}
              <div className="p-6 border-b border-white/5">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-bold text-white">Nuestro Equipo Legal</h3>
                </div>
                <p className="text-sm text-slate-500">Abogados colegiados que supervisan cada análisis</p>
              </div>

              {/* Team members */}
              <div className="divide-y divide-white/5">
                {team.map((member, i) => (
                  <div key={member.name} className="p-5 flex items-center gap-4">
                    {/* Avatar placeholder */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400/30 to-purple-500/30 border border-indigo-400/30 flex items-center justify-center shrink-0">
                      <span className="text-lg font-bold text-indigo-400">
                        {member.name.charAt(member.name.includes(".") ? member.name.indexOf(".") + 2 : 0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-white text-sm">{member.name}</div>
                      <div className="text-indigo-400 text-xs">{member.role}</div>
                      <div className="text-slate-500 text-xs">{member.specialty} · {member.exp} exp.</div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="p-6 bg-white/2 border-t border-white/5">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { value: "45+", label: "Años exp. combinada" },
                    { value: "3", label: "Colegios de Abogados" },
                    { value: "100%", label: "Revisión humana" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="text-xl font-black text-amber-400" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                        {stat.value}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Security features */}
            <div className="mt-6 grid grid-cols-1 gap-3">
              {[
                { icon: Lock, text: "Datos cifrados en reposo y en tránsito con AES-256" },
                { icon: Shield, text: "Servidores alojados en Europa (Frankfurt) · GDPR nativo" },
                { icon: CheckCircle, text: "Política de no-retención: tus documentos se eliminan en 30 días" },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3 text-sm text-slate-400">
                  <item.icon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
