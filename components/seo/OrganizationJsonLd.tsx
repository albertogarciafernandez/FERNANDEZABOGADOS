/**
 * OrganizationJsonLd — JSON-LD schema.org/LegalService + Organization.
 *
 * Describe Justicia Legalia como organización y servicio legal para Google:
 *   - LegalService (tipo principal para búsquedas legales)
 *   - Organization (datos de marca y contacto)
 *   - ContactPoint (teléfono, email, disponibilidad)
 *   - sameAs (perfiles sociales)
 *   - areaServed (España + UE)
 *   - hasOfferCatalog (los 6 servicios del catálogo)
 *
 * Añadir una sola vez en el layout raíz.
 */

import JsonLd from "./JsonLd";

const BASE_URL =
  process.env.NEXT_PUBLIC_URL || "https://justicialegalia.com";

const organizationData: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@graph": [
    // ─── LegalService ───────────────────────────────────────────────────────────
    {
      "@type": ["LegalService", "ProfessionalService"],
      "@id": `${BASE_URL}/#legalservice`,
      name: "Justicia Legalia",
      alternateName: "Justicia Legalia Premium",
      description:
        "Plataforma legal impulsada por Inteligencia Artificial para recurrir multas, reclamaciones de consumidores y protección legal online. Abogados colegiados con respuesta en menos de 2 horas. 94% de éxito garantizado.",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logo.png`,
        width: 240,
        height: 60,
      },
      image: `${BASE_URL}/images/og-default.jpg`,
      telephone: "+34-900-000-000",
      email: "hola@justicialegalia.com",
      priceRange: "€€",
      currenciesAccepted: "EUR",
      paymentAccepted: "Tarjeta de crédito, transferencia bancaria, PayPal",
      openingHours: "Mo-Fr 09:00-19:00",
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          telephone: "+34-900-000-000",
          email: "hola@justicialegalia.com",
          availableLanguage: ["Spanish", "English"],
          hoursAvailable: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "19:00",
          },
        },
        {
          "@type": "ContactPoint",
          contactType: "emergency legal line",
          telephone: "+34-900-000-001",
          availableLanguage: "Spanish",
          hoursAvailable: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "00:00",
            closes: "23:59",
          },
          description: "Línea de emergencia legal 24/7",
        },
      ],
      areaServed: [
        {
          "@type": "Country",
          name: "España",
          "@id": "https://www.wikidata.org/wiki/Q29",
        },
        {
          "@type": "Place",
          name: "Unión Europea",
          description: "Cobertura en los 27 estados miembro de la UE",
        },
      ],
      knowsAbout: [
        "Derecho de Tráfico",
        "Derecho del Consumidor",
        "Derecho Civil",
        "Derecho Laboral",
        "Derecho Administrativo",
        "RGPD y Protección de Datos",
        "Derecho Mercantil",
        "Recursos y reclamaciones ante la DGT",
      ],
      sameAs: [
        "https://www.linkedin.com/company/justicia-legalia",
        "https://twitter.com/justicialegalia",
        "https://www.instagram.com/justicialegalia",
        "https://www.facebook.com/justicialegalia",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Catálogo de Servicios Legales",
        description:
          "6 productos y servicios legales para particulares y empresas en España",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "LegalService",
              name: "Escudo Total™",
              description:
                "Protección legal 360° anual para tu familia. Consultas ilimitadas con abogado colegiado, respuesta en menos de 2 horas.",
              url: `${BASE_URL}/tienda/escudo-total`,
            },
            price: "29.00",
            priceCurrency: "EUR",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "29.00",
              priceCurrency: "EUR",
              unitText: "mes",
              billingDuration: {
                "@type": "QuantitativeValue",
                value: 1,
                unitCode: "MON",
              },
            },
            availability: "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "LegalService",
              name: "Análisis Exprés™",
              description:
                "Análisis IA de cualquier contrato, multa o documento legal en 60 segundos. Riesgos, cláusulas abusivas y recomendaciones de acción.",
              url: `${BASE_URL}/tienda/analisis-expres`,
            },
            price: "9.90",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "LegalService",
              name: "Recurso Garantizado™",
              description:
                "Recurso de multas de tráfico sin pago inicial. Solo pagas el 30% del ahorro si ganamos. Tasa de éxito del 67%.",
              url: `${BASE_URL}/tienda/recurso-garantizado`,
            },
            price: "0.00",
            priceCurrency: "EUR",
            description:
              "Sin coste inicial — 30% del ahorro conseguido si el recurso prospera",
            availability: "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "LegalService",
              name: "Pack Empresarial™",
              description:
                "Departamento jurídico externo para PYMEs de hasta 50 empleados. Contratos, RGPD, reclamaciones y representación.",
              url: `${BASE_URL}/tienda/pack-empresarial`,
            },
            price: "149.00",
            priceCurrency: "EUR",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "149.00",
              priceCurrency: "EUR",
              unitText: "mes",
            },
            availability: "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "LegalService",
              name: "Contrato Blindado™",
              description:
                "Revisión de contrato por IA + abogado especialista. Informe de riesgos, cláusulas reescritas y sesión de 30 minutos.",
              url: `${BASE_URL}/tienda/contrato-blindado`,
            },
            price: "149.00",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "LegalService",
              name: "Defensa Premium™",
              description:
                "Abogado senior dedicado exclusivamente a tu caso hasta sentencia. Estrategia personalizada, representación completa.",
              url: `${BASE_URL}/tienda/defensa-premium`,
            },
            price: "1200.00",
            priceCurrency: "EUR",
            description: "Desde 1.200€ — evaluación del caso gratuita",
            availability: "https://schema.org/InStock",
          },
        ],
      },
    },

    // ─── Organization (marca) ────────────────────────────────────────────────────
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Justicia Legalia",
      alternateName: "Justicia Legalia Premium",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logo.png`,
        width: 240,
        height: 60,
        caption: "Justicia Legalia — Tu escudo legal. Siempre encendido.",
      },
      foundingDate: "2024",
      foundingLocation: {
        "@type": "Place",
        name: "Madrid, España",
      },
      description:
        "Legal tech española que democratiza el acceso a la justicia combinando Inteligencia Artificial y abogados colegiados reales.",
      slogan: "Tu escudo legal. Siempre encendido.",
      sameAs: [
        "https://www.linkedin.com/company/justicia-legalia",
        "https://twitter.com/justicialegalia",
        "https://www.instagram.com/justicialegalia",
        "https://www.facebook.com/justicialegalia",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "hola@justicialegalia.com",
        telephone: "+34-900-000-000",
        availableLanguage: ["Spanish"],
      },
    },

    // ─── WebSite (sitelinks search box) ─────────────────────────────────────────
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Justicia Legalia",
      description:
        "Plataforma legal con IA para recurrir multas y reclamaciones online en España",
      inLanguage: "es-ES",
      publisher: {
        "@id": `${BASE_URL}/#organization`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/tienda?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function OrganizationJsonLd() {
  return <JsonLd data={organizationData} />;
}
