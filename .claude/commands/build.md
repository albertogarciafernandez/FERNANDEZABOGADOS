# /build — Compilar y Verificar el Proyecto

Ejecuta el build de Next.js y reporta el resultado de forma clara.

## Pasos

1. Ejecuta `npm run build` en `/home/user/FERNANDEZABOGADOS`
2. Analiza la salida:
   - **Sin errores:** muestra el resumen de rutas generadas y tamaños de bundle
   - **Con errores TypeScript:** muestra cada error con archivo:línea y descripción
   - **Con errores de compilación:** identifica la causa raíz
3. Si hay errores, propón la corrección exacta antes de aplicarla
4. Verifica que estas rutas estén generadas: `/`, `/tienda`, `/tienda/[slug]` (×6), `/carrito`, `/checkout`, `/dashboard`, `/reclamar`

## Errores Frecuentes en Este Proyecto

- `LEGAL_PRODUCTS` exportado desde route handler → eliminar `export`
- `variant="gold"` en Button → usar `variant="primary"`
- `icon=` en Button → usar `leftIcon=` o `rightIcon=`
- Stripe lanza error sin clave → ya resuelto con `?? 'sk_placeholder'`

## Criterios de Éxito

- Exit code 0
- 0 errores TypeScript
- 21+ rutas generadas
