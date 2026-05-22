'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { pageVariants } from '@/lib/animations'

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface PageTransitionProps {
  children: React.ReactNode
}

// ─── Componente ───────────────────────────────────────────────────────────────

/**
 * Wrapper para transiciones suaves entre páginas en Next.js App Router.
 * Combina AnimatePresence + motion.div con fade y ligero movimiento vertical.
 *
 * Uso en app/layout.tsx:
 * @example
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <PageTransition>
 *           {children}
 *         </PageTransition>
 *       </body>
 *     </html>
 *   )
 * }
 */
export default function PageTransition({ children }: PageTransitionProps) {
  // usePathname como key para que AnimatePresence detecte el cambio de ruta
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{
          // Evitar layout shifts durante la transición
          width: '100%',
          // GPU acceleration
          willChange: 'opacity, transform',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
