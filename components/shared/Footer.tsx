import { Scale, Zap, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, Shield } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  servicios: [
    { label: "Multas de Tráfico", href: "/reclamar?tipo=multa_trafico" },
    { label: "Vivienda y Alquiler", href: "/reclamar?tipo=contrato_vivienda" },
    { label: "Compras Online", href: "/reclamar?tipo=compra_online" },
    { label: "Aerolíneas", href: "/reclamar?tipo=aerolinea" },
    { label: "Telefónicas", href: "/reclamar?tipo=telefonica" },
    { label: "Contratos Abusivos", href: "/reclamar?tipo=contrato_abusivo" },
  ],
  empresa: [
    { label: "Sobre Nosotros", href: "#" },
    { label: "Nuestro Equipo", href: "#" },
    { label: "Blog Legal", href: "#" },
    { label: "Casos de Éxito", href: "#" },
    { label: "Prensa", href: "#" },
    { label: "API para Despachos", href: "#" },
  ],
  legal: [
    { label: "Términos de Uso", href: "#" },
    { label: "Política de Privacidad", href: "#" },
    { label: "Política de Cookies", href: "#" },
    { label: "Aviso Legal", href: "#" },
    { label: "GDPR / RGPD", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer id="contacto" className="bg-[#050508] border-t border-white/5">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group w-fit">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <Scale className="w-5 h-5 text-slate-900" />
                </div>
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-cyan-400 flex items-center justify-center">
                  <Zap className="w-2 h-2 text-slate-900" />
                </div>
              </div>
              <div>
                <div className="font-bold text-xl gradient-text-gold" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  Justicia Legalia
                </div>
                <div className="text-xs text-slate-500">Powered by IA · Validado por Abogados</div>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              La plataforma legal impulsada por inteligencia artificial más avanzada de España.
              Defendemos tus derechos con tecnología de vanguardia y supervisión jurídica profesional.
            </p>

            {/* Contact info */}
            <div className="space-y-2 mb-6">
              <a href="mailto:hola@justicia-legalia.es" className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors text-sm">
                <Mail className="w-4 h-4" />
                hola@justicia-legalia.es
              </a>
              <a href="tel:+34900123456" className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors text-sm">
                <Phone className="w-4 h-4" />
                900 123 456 (gratuito)
              </a>
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <MapPin className="w-4 h-4" />
                Madrid, Barcelona, Valencia · España
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Instagram, href: "#", label: "Instagram" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-amber-400/10 border border-white/10 hover:border-amber-400/30 flex items-center justify-center text-slate-400 hover:text-amber-400 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Servicios
            </h3>
            <ul className="space-y-2">
              {footerLinks.servicios.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-amber-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Empresa
            </h3>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-amber-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-amber-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-500 text-xs">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Supervisado por abogados colegiados · GDPR Compliant · SSL Seguro · ISO 27001</span>
            </div>
            <p className="text-slate-600 text-xs text-center md:text-right">
              © 2025 Justicia Legalia S.L. · CIF: B-12345678 · Todos los derechos reservados
            </p>
          </div>
          <p className="text-slate-700 text-xs mt-4 leading-relaxed">
            <strong className="text-slate-600">Aviso Legal:</strong> Justicia Legalia proporciona análisis jurídico asistido por inteligencia artificial con carácter orientativo y meramente informativo.
            Los análisis generados no constituyen asesoramiento jurídico profesional y deben ser revisados por un abogado colegiado antes de cualquier acción legal.
            Justicia Legalia no se responsabiliza de las decisiones tomadas basándose exclusivamente en los análisis de la plataforma.
          </p>
        </div>
      </div>
    </footer>
  );
}
