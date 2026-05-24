# /sync — Sincronizar con Main

Sincroniza la rama actual con `main` de forma segura.

## Pasos

1. Ejecuta `git status` para verificar que no hay cambios sin commitear
2. Si hay cambios: haz stash o pide al usuario que los commitee primero
3. Ejecuta `git fetch origin main`
4. Muestra `git log --oneline HEAD..origin/main` para ver qué commits hay en main que no tienes
5. Ejecuta `git merge origin/main --no-edit`
6. Si hay conflictos, resuélvelos:
   - Para archivos de código: mantén los cambios de la feature branch salvo que main tenga mejoras claras
   - Para `package.json`/`package-lock.json`: usa la versión más reciente de dependencias
   - Para `CLAUDE.md`: combina ambas versiones preservando toda la información
7. Verifica con `npm run build` que el merge no rompió nada
8. Muestra un resumen de qué cambió

## Contexto

- Rama desarrollo: `claude/antigravity-connection-Q0bay`
- Rama producción: `main`
- PR #2 fue mergeado el 2026-05-22 con 19 commits y 86 archivos cambiados
