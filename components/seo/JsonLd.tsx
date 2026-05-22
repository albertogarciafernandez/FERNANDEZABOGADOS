/**
 * JsonLd — Componente genérico para inyectar JSON-LD en el <head>.
 *
 * Uso:
 *   <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", ... }} />
 *
 * Renderiza un <script type="application/ld+json"> con el JSON serializado,
 * listo para ser indexado por los motores de búsqueda.
 */

interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 0),
      }}
    />
  );
}
