# /deploy — Desplegar a Vercel

Despliega el proyecto a Vercel y muestra el estado del despliegue.

## Pasos

1. Verifica que el build local pase sin errores: ejecuta `npm run build`
2. Si hay errores de build, páralos y reporta exactamente qué falla
3. Si el build es correcto, usa el MCP de Vercel para desplegar:
   - Llama a `mcp__86c37a33-b3db-4f5c-9ea3-bd1c949ac72a__deploy_to_vercel`
4. Muestra el estado del despliegue con `get_deployment`
5. Informa la URL de producción cuando esté disponible

## Contexto del Proyecto

- Proyecto Vercel: `fernandez-abogados/justicialegalia`
- Framework: Next.js 15 (App Router)
- Variables de entorno necesarias en Vercel: `ANTHROPIC_API_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_URL`
- Branch de producción: `main`

## Criterios de Éxito

- Build sin errores TypeScript
- Deployment state: `READY`
- URL de producción accesible
