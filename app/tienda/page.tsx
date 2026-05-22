import type { Metadata } from 'next'
import { TiendaClient } from './TiendaClient'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Tienda | Justicia Legalia Premium — Servicios Legales Online',
  description:
    'Explora nuestro catálogo completo de servicios legales. Suscripciones, análisis de documentos, recursos de multas y defensa legal profesional. Garantía 30 días en todos los productos.',
  keywords:
    'tienda servicios legales, abogado online, protección legal, análisis contrato, recurrir multa, pack empresarial',
  openGraph: {
    title: 'Servicios Legales Premium | Justicia Legalia',
    description: 'Tu escudo legal. Siempre encendido.',
    type: 'website',
    locale: 'es_ES',
  },
  robots: { index: true, follow: true },
}

export default function TiendaPage() {
  return <TiendaClient />
}
