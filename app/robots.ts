import { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_URL || "https://justicialegalia.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Regla principal: permite todo el sitio público
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",          // Rutas de API internas
          "/dashboard/",    // Área privada de usuario
          "/checkout/exito", // Página de confirmación de pago (no indexar)
        ],
      },
      // Bloquear crawlers agresivos / scrapers conocidos
      {
        userAgent: "GPTBot",
        disallow: ["/"],
      },
      {
        userAgent: "ChatGPT-User",
        disallow: ["/"],
      },
      {
        userAgent: "CCBot",
        disallow: ["/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
