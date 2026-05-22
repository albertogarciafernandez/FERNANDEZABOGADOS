"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Search, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import Accordion, { type AccordionItem } from "@/components/ui/Accordion";

const faqItems: AccordionItem[] = [
  {
    id: "que-es",
    question: "¿Qué es Justicia Legalia y cómo funciona?",
    answer:
      "Justicia Legalia es una plataforma legal tech que combina inteligencia artificial entrenada en Derecho Español con abogados colegiados en activo. Puedes contratar protección continua, analizar documentos, recurrir multas o acceder a representación completa — todo online, con precios fijos y transparentes.",
  },
  {
    id: "son-abogados-reales",
    question: "¿Son abogados reales o solo una IA?",
    answer:
      "Somos ambas cosas, en el orden correcto. La IA actúa como primer filtro para acelerar el análisis y detectar patrones jurídicos en segundos. Pero cada caso es revisado y gestionado por un abogado colegiado real, con número de colegiación visible. No somos un chatbot con respuestas genéricas — somos una plataforma con corazón humano.",
  },
  {
    id: "tiempo-respuesta",
    question: "¿En cuánto tiempo recibiré respuesta de mi abogado?",
    answer:
      "En horario laboral (L-V, 9:00-19:00), tu abogado responde en menos de 2 horas. Fuera de horario, la primera respuesta llega al día siguiente con prioridad máxima. El tiempo medio real de nuestro equipo es de 47 minutos desde la contratación hasta el primer contacto. Si incumplimos, ese día de servicio es gratuito — sin formularios ni discusión.",
  },
  {
    id: "garantia-30-dias",
    question: "¿Cómo funciona la garantía de 30 días?",
    answer:
      "Es incondicional. Si en los primeros 30 días no estás satisfecho por cualquier motivo — incluso si simplemente cambias de opinión — te devolvemos el importe íntegro. Sin formularios, sin preguntas, sin demora. La transferencia se realiza en máximo 48 horas. Lo prometemos por escrito.",
  },
  {
    id: "precio-final",
    question: "¿El precio que veo es el precio final con IVA incluido?",
    answer:
      "Sí, siempre. El precio que ves en nuestra web es el precio final que pagas — IVA incluido, sin cargos ocultos, sin costes adicionales que aparezcan en el checkout. Esta es nuestra Garantía de Transparencia. Cualquier trabajo adicional que pudiera surgir se presupuesta por escrito antes de ejecutarse, y tienes que aprobarlo explícitamente.",
  },
  {
    id: "multa-trafico",
    question: "¿Qué posibilidades tengo de ganar un recurso de multa de tráfico?",
    answer:
      "Nuestro equipo tiene una tasa de éxito del 67% en recursos de tráfico, frente al 23% de media del sector. La DGT y los Ayuntamientos cometen errores procedimentales con frecuencia: señalización defectuosa, radares sin homologación vigente, notificaciones defectuosas, prescripción del expediente. El primer paso es el análisis de viabilidad gratuito — si no vemos argumentos sólidos, te lo decimos con honestidad y no cobramos nada.",
  },
  {
    id: "pago-metodos",
    question: "¿Qué métodos de pago aceptáis?",
    answer:
      "Aceptamos tarjeta de crédito y débito (Visa, Mastercard, American Express), Bizum, PayPal, Apple Pay y Google Pay. El pago se procesa a través de Stripe, el estándar mundial de seguridad en pagos online. Nunca almacenamos datos de tarjeta — toda la información financiera va directamente a Stripe.",
  },
  {
    id: "cancelar-suscripcion",
    question: "¿Puedo cancelar mi suscripción cuando quiera?",
    answer:
      "Sí, sin permanencia y sin penalización. Puedes cancelar desde tu dashboard en cualquier momento con un solo clic. La cancelación tiene efecto al final del período de facturación en curso — no te cobraremos nada más. No hay formularios de cancelación interminables ni llamadas telefónicas obligatorias.",
  },
  {
    id: "datos-seguros",
    question: "¿Están seguros mis datos y documentos legales?",
    answer:
      "Tus documentos se almacenan cifrados con AES-256 en servidores europeos. Cumplimos íntegramente con el RGPD (Reglamento General de Protección de Datos), contamos con certificación ISO 27001 y hemos pasado auditoría de la AEPD. Solo los abogados asignados a tu caso tienen acceso a tus documentos. Nunca los compartimos con terceros ni los usamos para entrenar modelos de IA.",
  },
  {
    id: "diferencia-despacho",
    question: "¿En qué sois diferentes a un despacho de abogados tradicional?",
    answer:
      "Un despacho tradicional cobra entre 150-400€/hora, tarda 3-10 días en responder y requiere reuniones presenciales. Nosotros respondemos en menos de 2 horas, a precio fijo y desde cualquier lugar. Pero la diferencia más importante es la transparencia: sabes exactamente qué pagas, qué incluye y qué resultados puedes esperar. No somos más baratos que un despacho — somos incomparablemente más eficientes y predecibles.",
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

export default function FAQ() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return faqItems;
    const q = searchQuery.toLowerCase();
    return faqItems.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Split for 2-column layout
  const half = Math.ceil(filteredItems.length / 2);
  const leftCol = filteredItems.slice(0, half);
  const rightCol = filteredItems.slice(half);

  return (
    <section id="faq" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #040B17 0%, #0A1628 50%, #040B17 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12"
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.12em] mb-3"
            style={{ color: "#D4AF37" }}
          >
            Preguntas frecuentes
          </p>
          <h2
            className="text-3xl md:text-5xl font-semibold text-[#F8FAFC] mb-4"
            style={{ fontFamily: "var(--font-inter)", letterSpacing: "-0.01em" }}
          >
            Todo lo que necesitas{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #D4AF37 0%, #F5D060 50%, #D4AF37 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              saber
            </span>
          </h2>
          <p className="text-[#94A3B8] max-w-xl mx-auto text-base">
            Sin tecnicismos. Respuestas directas a las dudas más habituales antes de contratar.
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-lg mx-auto mb-10"
        >
          <div
            className="relative flex items-center"
            style={{
              background: "rgba(15, 34, 64, 0.7)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(212,175,55,0.2)",
              borderRadius: "12px",
            }}
          >
            <Search className="absolute left-4 w-4 h-4 text-[#475569]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar pregunta..."
              className="w-full bg-transparent pl-11 pr-4 py-3.5 text-sm text-[#F8FAFC] placeholder-[#475569] outline-none focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 text-[#475569] hover:text-[#94A3B8] transition-colors text-xs"
              >
                Limpiar
              </button>
            )}
          </div>
          {filteredItems.length === 0 && searchQuery && (
            <p className="text-center text-[#475569] text-sm mt-3">
              No hay preguntas que coincidan con "{searchQuery}"
            </p>
          )}
        </motion.div>

        {/* FAQ columns */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-6"
        >
          {/* Left column */}
          <div>
            <Accordion items={leftCol} allowMultiple={false} />
          </div>

          {/* Right column */}
          <div>
            <Accordion items={rightCol} allowMultiple={false} />
          </div>
        </motion.div>

        {/* Support CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-14 text-center"
        >
          <div
            className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 px-8 py-6 rounded-2xl"
            style={{
              background: "rgba(15, 34, 64, 0.6)",
              backdropFilter: "blur(16px) saturate(180%)",
              WebkitBackdropFilter: "blur(16px) saturate(180%)",
              border: "1px solid rgba(212,175,55,0.2)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "rgba(212,175,55,0.1)" }}
              >
                <MessageCircle className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div className="text-left">
                <p className="text-[#F8FAFC] font-semibold text-sm">
                  ¿No encuentras tu respuesta?
                </p>
                <p className="text-[#94A3B8] text-xs">
                  Habla con un abogado real ahora — sin compromiso
                </p>
              </div>
            </div>
            <Link
              href="/reclamar"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-200 hover:scale-[1.02] group"
              style={{
                background: "linear-gradient(135deg, #1B3A6B 0%, #2563EB 100%)",
                color: "#F8FAFC",
              }}
            >
              Hablar con un abogado
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
