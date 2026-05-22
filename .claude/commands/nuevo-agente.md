# /nuevo-agente — Crear Nuevo Agente IA

Crea un nuevo agente IA para el sistema multi-agente de Imperio Legal SLP, siguiendo el patrón de los 8 agentes existentes.

## Uso

```
/nuevo-agente <NOMBRE> <especialidad> <descripción>
```

Ejemplo: `/nuevo-agente HERALD "Comunicación y Notificaciones" "Gestiona comunicaciones automáticas con clientes y juzgados"`

## Pasos

1. Lee `landing-premium/index.html` para ver el patrón visual de los 8 agentes existentes
2. Lee `app/page.tsx` para entender cómo se presentan los agentes en la homepage
3. Crea el componente agente en `components/landing/Agent<NOMBRE>Card.tsx` con:
   - Glassmorphism dark card (`glass glass-hover rounded-2xl p-6`)
   - Icono de 60px con gradiente temático
   - Badge con nombre del agente en gold
   - Título, descripción, tags de especialidad
   - Animación `fadeInUp` de `lib/animations.ts`
4. Añade la entrada del agente en el array de agentes en `lib/copy.ts` (o crear si no existe)
5. Integra la card en `app/page.tsx` en la sección de agentes
6. Actualiza `landing-premium/index.html` añadiendo la card del nuevo agente en la sección de agentes
7. Ejecuta `npm run build` para verificar

## Convenciones de Diseño

- Colores de icono únicos por agente (blue, purple, gold, green, cyan, red, orange, yellow)
- Tags de especialidad con color matching al icono
- Descripción máximo 2 líneas (~100 caracteres)
- Siempre incluir `reveal reveal-delay-N` para animación de entrada
