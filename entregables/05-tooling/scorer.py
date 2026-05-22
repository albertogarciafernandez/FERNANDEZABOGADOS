"""
scorer.py — Puntuador de leads B2B para agencias de marketing legal.

Flujo:
  1. Lee leads desde un CSV con columnas estándar.
  2. Llama a Claude API por cada lead para obtener score 0-100 y email personalizado.
  3. Selecciona los top-20 leads por score para incluir el borrador de email.
  4. Exporta un CSV enriquecido con score, clasificación y timestamp.

Uso:
    python scorer.py --input leads_sample.csv --output leads_scored.csv
"""

import argparse
import json
import logging
import time
from datetime import datetime, timezone
from pathlib import Path

import anthropic
import pandas as pd
from dotenv import load_dotenv
from tqdm import tqdm

# ---------------------------------------------------------------------------
# Configuración global
# ---------------------------------------------------------------------------

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler()],
)
logger = logging.getLogger(__name__)

MODEL = "claude-opus-4-7"
MAX_TOKENS = 1024
MAX_RETRIES = 3
RATE_LIMIT_SLEEP = 1.0      # segundos entre llamadas a la API
TOP_N_EMAIL = 20             # solo los top-N reciben borrador de email

# ---------------------------------------------------------------------------
# System prompt — experto en cualificación de leads B2B para marketing legal
# ---------------------------------------------------------------------------

SYSTEM_PROMPT = """Eres un experto en cualificación de leads B2B para una agencia de marketing \
especializada en despachos de abogados y servicios legales. Tu misión es evaluar prospectos \
potenciales que han rellenado un formulario de contacto.

Criterios de puntuación (score 0-100):
- Presupuesto mensual disponible (peso: 35%)
  - >5000€: 35 pts | 2000-5000€: 25 pts | 800-2000€: 15 pts | <800€: 5 pts
- Urgencia declarada (peso: 30%)
  - alta: 30 pts | media: 18 pts | baja: 8 pts
- Calidad y especificidad de la respuesta al formulario (peso: 20%)
  - Concreta con plazos y contexto: 20 pts | General pero seria: 12 pts | Vaga o exploratoria: 5 pts
- Perfil de empresa (peso: 15%)
  - Empresa establecida con necesidad recurrente: 15 pts
  - Empresa con necesidad puntual clara: 9 pts
  - Autónomo/particular: 4 pts

Clasificación por score:
- HOT: score >= 70
- WARM: score 40-69
- COLD: score < 40

Responde SIEMPRE con JSON válido, sin texto adicional fuera del bloque JSON.
"""

# ---------------------------------------------------------------------------
# Funciones auxiliares
# ---------------------------------------------------------------------------


def build_user_prompt(lead: dict, include_email: bool) -> str:
    """
    Construye el prompt de usuario para un lead específico.

    Args:
        lead: Diccionario con los datos del lead (fila del CSV).
        include_email: Si True, pide también el borrador de email personalizado.

    Returns:
        Cadena de texto con el prompt formateado.
    """
    email_instruction = (
        "\n- \"email_draft\": string con un email personalizado de 120-180 palabras "
        "para contactar a este lead. Tono profesional, menciona su situación específica "
        "y propone una llamada de 20 minutos."
        if include_email
        else '\n- "email_draft": null'
    )

    return f"""Evalúa el siguiente lead B2B y devuelve un objeto JSON con exactamente estas claves:
- "score": integer 0-100
- "clasificacion": "HOT" | "WARM" | "COLD"
- "justificacion": string de 1-2 frases explicando el score{email_instruction}

DATOS DEL LEAD:
- Nombre: {lead.get('nombre', 'N/A')}
- Email: {lead.get('email', 'N/A')}
- Empresa: {lead.get('empresa', 'N/A')}
- Presupuesto mensual: {lead.get('presupuesto_mensual', 'N/A')}€
- Urgencia: {lead.get('urgencia', 'N/A')}
- Respuesta al formulario: "{lead.get('respuesta_formulario', 'N/A')}"

JSON:"""


def call_claude_with_retry(
    client: anthropic.Anthropic,
    lead: dict,
    include_email: bool,
) -> dict:
    """
    Llama a la Claude API con reintentos exponenciales ante errores.

    Args:
        client: Instancia del cliente Anthropic.
        lead: Datos del lead a puntuar.
        include_email: Si True, solicita borrador de email.

    Returns:
        Diccionario parseado desde la respuesta JSON de Claude.

    Raises:
        RuntimeError: Si todos los reintentos fallan.
    """
    prompt = build_user_prompt(lead, include_email)

    for attempt in range(1, MAX_RETRIES + 1):
        try:
            response = client.messages.create(
                model=MODEL,
                max_tokens=MAX_TOKENS,
                system=SYSTEM_PROMPT,
                messages=[{"role": "user", "content": prompt}],
            )

            raw_text = response.content[0].text.strip()

            # Extraer JSON aunque Claude añada texto extra (defensa en profundidad)
            if "```json" in raw_text:
                raw_text = raw_text.split("```json")[1].split("```")[0].strip()
            elif "```" in raw_text:
                raw_text = raw_text.split("```")[1].split("```")[0].strip()

            result = json.loads(raw_text)

            # Garantizar que email_draft existe como clave aunque sea null
            if "email_draft" not in result:
                result["email_draft"] = None

            return result

        except anthropic.RateLimitError:
            wait = RATE_LIMIT_SLEEP * (2 ** attempt)
            logger.warning(
                "Rate limit alcanzado (intento %d/%d). Esperando %.1fs...",
                attempt, MAX_RETRIES, wait,
            )
            time.sleep(wait)

        except anthropic.APIStatusError as exc:
            logger.error(
                "Error de API (intento %d/%d): %s %s",
                attempt, MAX_RETRIES, exc.status_code, exc.message,
            )
            if attempt < MAX_RETRIES:
                time.sleep(RATE_LIMIT_SLEEP * attempt)

        except json.JSONDecodeError as exc:
            logger.error(
                "JSON inválido en respuesta (intento %d/%d): %s",
                attempt, MAX_RETRIES, exc,
            )
            if attempt < MAX_RETRIES:
                time.sleep(RATE_LIMIT_SLEEP)

    raise RuntimeError(
        f"Todos los reintentos agotados para el lead '{lead.get('nombre', '?')}'"
    )


def classify_score(score: int) -> str:
    """Devuelve HOT / WARM / COLD según el score numérico."""
    if score >= 70:
        return "HOT"
    if score >= 40:
        return "WARM"
    return "COLD"


# ---------------------------------------------------------------------------
# Pipeline principal
# ---------------------------------------------------------------------------


def score_leads(input_path: str, output_path: str) -> None:
    """
    Ejecuta el pipeline completo de puntuación de leads.

    Args:
        input_path: Ruta al CSV de entrada con los leads.
        output_path: Ruta donde se guardará el CSV enriquecido.
    """
    # 1. Leer CSV
    input_file = Path(input_path)
    if not input_file.exists():
        raise FileNotFoundError(f"No se encuentra el archivo de entrada: {input_path}")

    df = pd.read_csv(input_path)
    required_cols = {
        "nombre", "email", "empresa",
        "presupuesto_mensual", "urgencia", "respuesta_formulario",
    }
    missing = required_cols - set(df.columns)
    if missing:
        raise ValueError(f"Columnas faltantes en el CSV: {missing}")

    logger.info("Leads cargados: %d filas desde '%s'", len(df), input_path)

    # 2. Primera pasada: puntuar todos los leads (sin email aún)
    client = anthropic.Anthropic()
    results: list[dict] = []

    logger.info("Iniciando primera pasada: score para %d leads...", len(df))
    for _, row in tqdm(df.iterrows(), total=len(df), desc="Puntuando leads", unit="lead"):
        lead = row.to_dict()
        try:
            result = call_claude_with_retry(client, lead, include_email=False)
            # Normalizar score y clasificación
            score = max(0, min(100, int(result.get("score", 0))))
            clasificacion = classify_score(score)
            results.append({
                "score": score,
                "clasificacion": clasificacion,
                "justificacion": result.get("justificacion", ""),
                "email_draft": None,
            })
        except RuntimeError as exc:
            logger.error("Fallo definitivo para lead '%s': %s", lead.get("nombre"), exc)
            results.append({
                "score": 0,
                "clasificacion": "COLD",
                "justificacion": "Error al procesar",
                "email_draft": None,
            })

        time.sleep(RATE_LIMIT_SLEEP)

    # 3. Identificar top-20 por score
    scores_series = pd.Series([r["score"] for r in results])
    top_indices = set(scores_series.nlargest(TOP_N_EMAIL).index.tolist())
    hot_warm_count = sum(1 for r in results if r["clasificacion"] in ("HOT", "WARM"))
    logger.info(
        "Clasificación preliminar: %d HOT/WARM de %d leads. "
        "Generando emails para top %d...",
        hot_warm_count, len(df), min(TOP_N_EMAIL, len(top_indices)),
    )

    # 4. Segunda pasada: generar emails solo para top-N
    for idx in tqdm(top_indices, desc="Generando emails", unit="email"):
        lead = df.iloc[idx].to_dict()
        try:
            result = call_claude_with_retry(client, lead, include_email=True)
            results[idx]["email_draft"] = result.get("email_draft")
        except RuntimeError as exc:
            logger.warning(
                "No se pudo generar email para '%s': %s",
                lead.get("nombre"), exc,
            )

        time.sleep(RATE_LIMIT_SLEEP)

    # 5. Construir DataFrame final y exportar
    timestamp_utc = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    results_df = pd.DataFrame(results)
    results_df["timestamp_analisis"] = timestamp_utc

    final_df = pd.concat([df.reset_index(drop=True), results_df], axis=1)

    # Ordenar por score descendente
    final_df = final_df.sort_values("score", ascending=False).reset_index(drop=True)

    final_df.to_csv(output_path, index=False, encoding="utf-8")
    logger.info("CSV exportado: '%s' (%d filas)", output_path, len(final_df))

    # Resumen en consola
    hot = (final_df["clasificacion"] == "HOT").sum()
    warm = (final_df["clasificacion"] == "WARM").sum()
    cold = (final_df["clasificacion"] == "COLD").sum()
    emails_generados = final_df["email_draft"].notna().sum()
    print(
        f"\n{'='*50}\n"
        f"RESUMEN DEL ANÁLISIS\n"
        f"{'='*50}\n"
        f"  Total leads procesados : {len(final_df)}\n"
        f"  HOT  (score >= 70)     : {hot}\n"
        f"  WARM (score 40-69)     : {warm}\n"
        f"  COLD (score < 40)      : {cold}\n"
        f"  Emails generados       : {emails_generados}\n"
        f"  Timestamp análisis     : {timestamp_utc}\n"
        f"  Archivo de salida      : {output_path}\n"
        f"{'='*50}\n"
    )


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------


def parse_args() -> argparse.Namespace:
    """Parsea los argumentos de línea de comandos."""
    parser = argparse.ArgumentParser(
        description="Puntúa leads B2B usando Claude API.",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    parser.add_argument(
        "--input",
        default="leads_sample.csv",
        help="Ruta al CSV de entrada con los leads.",
    )
    parser.add_argument(
        "--output",
        default="leads_scored.csv",
        help="Ruta del CSV de salida enriquecido.",
    )
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_args()
    score_leads(input_path=args.input, output_path=args.output)
