import { NextRequest, NextResponse } from "next/server";
import { anthropic, LEGAL_SYSTEM_PROMPT, type LegalAnalysis } from "@/lib/claude";

const CLAIM_TYPE_CONTEXT: Record<string, string> = {
  multa_trafico:
    "Multa de tráfico de la DGT o policía municipal. Analiza la procedencia legal de la sanción, posibles defectos formales, plazos de prescripción y argumentos de defensa.",
  contrato_vivienda:
    "Contrato de arrendamiento o compraventa de vivienda. Analiza cláusulas abusivas, incumplimientos, derechos del arrendatario/comprador según la LAU y Código Civil.",
  compra_online:
    "Reclamación por compra online. Aplica la Ley General para la Defensa de los Consumidores y Usuarios, directivas europeas de comercio electrónico y derecho de desistimiento.",
  aerolinea:
    "Reclamación contra aerolínea. Aplica el Reglamento CE 261/2004 sobre compensación por retrasos, cancelaciones y denegación de embarque.",
  telefonica:
    "Reclamación contra operadora de telecomunicaciones. Aplica la normativa de la CNMC, Ley General de Telecomunicaciones y condiciones contractuales.",
  contrato_abusivo:
    "Contrato con cláusulas posiblemente abusivas. Analiza según el TRLGDCU, Directiva 93/13/CEE y jurisprudencia del TJUE y Tribunal Supremo.",
  otro: "Reclamación general. Analiza el caso según la legislación española aplicable más relevante.",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { documentText, claimType, additionalInfo } = body;

    if (!documentText || documentText.trim().length < 10) {
      return NextResponse.json(
        { error: "Se requiere texto del documento para el análisis" },
        { status: 400 }
      );
    }

    const claimContext =
      CLAIM_TYPE_CONTEXT[claimType] || CLAIM_TYPE_CONTEXT.otro;

    const userMessage = `TIPO DE RECLAMACIÓN: ${claimType || "general"}
CONTEXTO ESPECÍFICO: ${claimContext}

DOCUMENTO / INFORMACIÓN APORTADA:
${documentText}

${additionalInfo ? `INFORMACIÓN ADICIONAL DEL CLIENTE:\n${additionalInfo}` : ""}

Por favor, analiza este caso en detalle y proporciona tu evaluación jurídica completa en formato JSON como se indicó en el sistema.`;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2000,
      system: LEGAL_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Respuesta inesperada del modelo de IA");
    }

    // Extract JSON from the response
    let analysis: LegalAnalysis;
    try {
      const jsonMatch = content.text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No se encontró JSON en la respuesta");
      }
      analysis = JSON.parse(jsonMatch[0]);
    } catch {
      // If JSON parsing fails, create a structured response from the text
      analysis = {
        viabilidad: "MEDIA",
        probabilidadExito: 60,
        resumen: content.text.slice(0, 300),
        fundamentosJuridicos: ["Análisis en proceso - contacte con un abogado"],
        posiblesDefensas: [],
        proximos_pasos: ["Consultar con abogado especialista"],
        documentosNecesarios: ["Documentación completa del caso"],
        plazosImportantes: ["Verificar plazos con abogado"],
        estimacionRecuperacion: "Por determinar",
        advertencias: [
          "El análisis automático no pudo procesarse completamente. Se recomienda revisión manual.",
        ],
      };
    }

    return NextResponse.json({
      success: true,
      analysis,
      tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
    });
  } catch (error) {
    console.error("Error en análisis legal:", error);

    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return NextResponse.json(
          {
            error:
              "Error de configuración del servidor. Por favor, contacte con soporte.",
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      {
        error:
          "Error al procesar el análisis. Por favor, inténtelo de nuevo en unos momentos.",
      },
      { status: 500 }
    );
  }
}
