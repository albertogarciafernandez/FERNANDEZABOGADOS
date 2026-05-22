# Lead Scorer — Puntuador de Leads B2B con Claude AI

Herramienta de línea de comandos que puntúa leads de forma automática usando la API de Claude (Anthropic). Genera un CSV enriquecido con score, clasificación HOT/WARM/COLD y borradores de email personalizados para los mejores prospectos.

---

## Instalación en 5 pasos

**Paso 1 — Clonar el directorio y crear entorno virtual**

```bash
cd entregables/05-tooling
python -m venv .venv
source .venv/bin/activate      # En Windows: .venv\Scripts\activate
```

**Paso 2 — Instalar dependencias**

```bash
pip install -r requirements.txt
```

**Paso 3 — Configurar la API key**

```bash
cp .env.example .env
# Edita .env y reemplaza el valor con tu clave real de Anthropic:
# ANTHROPIC_API_KEY=sk-ant-api03-TU_CLAVE_REAL_AQUI
```

Obtén tu API key en: https://console.anthropic.com/settings/keys

**Paso 4 — Preparar el CSV de leads**

El CSV de entrada debe tener exactamente estas columnas (en cualquier orden):

| Columna | Tipo | Ejemplo |
|---|---|---|
| `nombre` | texto | Carlos Mendoza |
| `email` | texto | carlos@empresa.es |
| `empresa` | texto | TechInnovate SL |
| `presupuesto_mensual` | número | 5000 |
| `urgencia` | texto | alta / media / baja |
| `respuesta_formulario` | texto | Texto libre del formulario |

Puedes usar el archivo de ejemplo incluido: `leads_sample.csv` (10 leads ficticios).

**Paso 5 — Ejecutar el scorer**

```bash
# Con el CSV de ejemplo (por defecto)
python scorer.py

# Con tus propios archivos
python scorer.py --input mis_leads.csv --output resultados.csv
```

---

## Salida

El script genera un CSV con todas las columnas originales más:

| Columna nueva | Descripción |
|---|---|
| `score` | Puntuación 0-100 calculada por Claude |
| `clasificacion` | HOT (≥70) / WARM (40-69) / COLD (<40) |
| `justificacion` | Explicación breve del score |
| `email_draft` | Borrador de email personalizado (solo top-20 leads) |
| `timestamp_analisis` | Fecha y hora UTC del análisis |

Los resultados se ordenan por score descendente.

---

## Parámetros opcionales

```
python scorer.py --help

  --input   Ruta al CSV de entrada  (default: leads_sample.csv)
  --output  Ruta al CSV de salida   (default: leads_scored.csv)
```

---

## Notas de uso

- El script realiza **dos pasadas**: primero puntúa todos los leads, luego genera emails solo para el top-20.
- Se respeta un **rate limit de 1 req/s** entre llamadas a la API.
- Cada llamada tiene **3 reintentos automáticos** con backoff exponencial.
- El coste aproximado por lead es ~0.01-0.03 USD dependiendo de la longitud de las respuestas.
- Para lotes grandes (>500 leads) considera usar la [Batches API](https://docs.anthropic.com/en/docs/build-with-claude/message-batches) de Anthropic (50% de descuento).
