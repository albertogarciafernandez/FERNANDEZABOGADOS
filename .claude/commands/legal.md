# /legal — Analizar Caso Jurídico con Agente LEX

Usa el sistema de IA legal del proyecto para analizar un caso jurídico siguiendo el patrón de `lib/claude.ts`.

## Uso

```
/legal <descripción del caso>
```

Ejemplo: `/legal Mi jefe me ha despedido alegando causas objetivas pero creo que es represalia por mis quejas de acoso`

## Pasos

1. Lee `lib/claude.ts` para entender `LEGAL_SYSTEM_PROMPT` y el tipo `LegalAnalysis`
2. Actúa como el agente **LEX** usando el system prompt del archivo
3. Analiza el caso proporcionado y devuelve un informe estructurado con:
   - **Viabilidad**: ALTA / MEDIA / BAJA
   - **Probabilidad de éxito**: porcentaje con justificación
   - **Fundamentos jurídicos**: artículos del ET, CC, etc. aplicables
   - **Posibles defensas** de la otra parte
   - **Próximos pasos** ordenados por prioridad
   - **Documentos necesarios** a recopilar
   - **Plazos importantes** (prescripción, caducidad)
   - **Estimación de recuperación** económica si aplica
   - **Advertencias** relevantes
4. Siempre incluir: "Este análisis es orientativo. Debe ser revisado por un abogado colegiado."

## Contexto

- Especialidad: Derecho español (ET, Código Civil, LOPJ, Ley de Tráfico, Ley Consumidores)
- Respuesta siempre en español
- Tono: profesional pero comprensible para no abogados
- Productos relacionados: Análisis Exprés (€29), Recurso Garantizado (€0 upfront), Defensa Premium (€499+)
