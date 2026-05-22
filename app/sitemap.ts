import { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_URL || "https://justicialegalia.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Páginas de producto de la tienda
  const productSlugs = [
    "escudo-total",
    "analisis-expres",
    "recurso-garantizado",
    "pack-empresarial",
    "contrato-blindado",
    "defensa-premium",
  ];

  const productPages: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${BASE_URL}/tienda/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [
    // --- Homepage ---
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },

    // --- Tienda (listado de servicios) ---
    {
      url: `${BASE_URL}/tienda`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },

    // --- Páginas individuales de producto ---
    ...productPages,

    // --- Formulario de reclamación ---
    {
      url: `${BASE_URL}/reclamar`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },

    // --- Dashboard (autenticado, prioridad baja) ---
    {
      url: `${BASE_URL}/dashboard`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },

    // --- Checkout (flujo de pago) ---
    {
      url: `${BASE_URL}/checkout`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
