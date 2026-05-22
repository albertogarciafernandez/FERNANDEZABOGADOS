import type { Config } from "tailwindcss";

/**
 * Justicia Legalia Premium — Tailwind CSS Configuration
 * Design System v1.0 — Based on Master Brief
 *
 * NOTE: This project uses Tailwind CSS v4. The primary configuration is
 * handled via @theme in globals.css. This file provides the extended
 * theme for tooling compatibility (IDE autocompletion, etc.).
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── BRAND COLORS (exact HEX from Master Brief) ──────────────────────
      colors: {
        // Brand: Azul judicial profundo
        brand: {
          navy:    "#0A1628", // Navy oscuro — fondo hero, headers
          primary: "#1B3A6B", // Azul primario — botones principales, enlaces
          bright:  "#2563EB", // Azul brillante — hover states, highlights
        },

        // Gold: Dorado premium
        gold: {
          dark:    "#B8860B", // Dorado oscuro — acentos de lujo, iconos premium
          DEFAULT: "#D4AF37", // Dorado principal — badges, estrellas, precio destacado
          light:   "#F5D060", // Dorado claro — glassmorphism highlights
        },

        // Surface: 5 niveles de fondo
        surface: {
          base:  "#040B17", // Fondo base absoluto — body background
          "1":   "#0A1628", // Fondo nivel 1 — secciones principales
          "2":   "#0F2240", // Fondo nivel 2 — cards, modales
          "3":   "#162D52", // Fondo nivel 3 — cards hover, inputs
          "4":   "#1E3A6E", // Fondo nivel 4 — elementos activos, focus states
        },

        // Text: 3 niveles
        text: {
          primary:   "#F8FAFC", // Títulos, copy principal
          secondary: "#94A3B8", // Subtítulos, descripciones
          tertiary:  "#475569", // Captions, placeholders, metadatos
        },

        // Success / Error / Warning / Info
        success: {
          DEFAULT: "#059669",
          light:   "#D1FAE5",
        },
        error: {
          DEFAULT: "#DC2626",
          light:   "#FEE2E2",
        },
        warning: {
          DEFAULT: "#D97706",
          light:   "#FEF3C7",
        },
        info: {
          DEFAULT: "#2563EB",
          light:   "#DBEAFE",
        },
      },

      // ─── TYPOGRAPHY ────────────────────────────────────────────────────────
      fontFamily: {
        inter:    ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        playfair: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        "space-grotesk": ["var(--font-space-grotesk)", "Space Grotesk", "system-ui", "sans-serif"],
      },

      fontSize: {
        // Caption & Overline
        "caption":  ["12px", { lineHeight: "16px", letterSpacing: "0.02em" }],
        "overline": ["11px", { lineHeight: "16px", letterSpacing: "0.12em" }],

        // Body scale
        "body-sm":  ["14px", { lineHeight: "20px" }],
        "body":     ["16px", { lineHeight: "24px" }],
        "body-lg":  ["18px", { lineHeight: "28px" }],

        // Heading scale (mobile)
        "h4":       ["24px", { lineHeight: "32px" }],
        "h3-mob":   ["24px", { lineHeight: "32px" }],
        "h2-mob":   ["32px", { lineHeight: "40px" }],
        "h1-mob":   ["42px", { lineHeight: "48px", letterSpacing: "-0.02em" }],

        // Heading scale (desktop)
        "h3":       ["32px", { lineHeight: "40px" }],
        "h2":       ["48px", { lineHeight: "56px", letterSpacing: "-0.01em" }],
        "h1":       ["72px", { lineHeight: "80px", letterSpacing: "-0.02em" }],
      },

      // ─── SPACING (8-point scale from Master Brief) ──────────────────────
      spacing: {
        "micro": "4px",   // micro — separaciones de iconos internos
        "xs":    "8px",   // xs — gap entre badge e icono, padding interno de tags
        "sm":    "12px",  // sm — padding de inputs, separación de metadatos
        "md":    "16px",  // md — padding horizontal de botones, gap entre elementos inline
        "lg":    "24px",  // lg — padding de cards, gap entre secciones inline
        "xl":    "32px",  // xl — padding interno de secciones, gap entre cards
        "2xl":   "48px",  // 2xl — separación entre secciones de contenido
        "3xl":   "64px",  // 3xl — padding vertical de secciones grandes
        "4xl":   "96px",  // 4xl — separación entre secciones hero/features
        "5xl":   "128px", // 5xl — padding máximo del hero section
      },

      // ─── BORDER RADIUS ──────────────────────────────────────────────────
      borderRadius: {
        "none":  "0px",
        "sm":    "4px",
        "md":    "8px",
        "lg":    "12px",
        "xl":    "16px",
        "2xl":   "20px",
        "3xl":   "24px",
        "full":  "9999px",
        // Glass card radius from brief
        "glass": "16px",
      },

      // ─── BOX SHADOWS ────────────────────────────────────────────────────
      boxShadow: {
        // Standard shadows
        "sm":          "0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)",
        "md":          "0 4px 16px rgba(0,0,0,0.5), 0 2px 6px rgba(0,0,0,0.3)",
        "lg":          "0 20px 48px rgba(0,0,0,0.6), 0 8px 16px rgba(0,0,0,0.4)",

        // Glow effects (from brief)
        "gold-glow":   "0 0 20px rgba(212,175,55,0.3), 0 0 60px rgba(212,175,55,0.1)",
        "gold-glow-lg":"0 0 20px rgba(212,175,55,0.3), 0 0 60px rgba(212,175,55,0.1), 0 0 100px rgba(212,175,55,0.05)",
        "blue-glow":   "0 0 30px rgba(37,99,235,0.4), 0 0 80px rgba(37,99,235,0.15)",
        "blue-glow-sm":"0 0 12px rgba(37,99,235,0.3), 0 0 30px rgba(37,99,235,0.1)",

        // Glass card shadow from premium glass variant
        "glass-premium": "0 0 40px rgba(212,175,55,0.08), inset 0 1px 0 rgba(245,208,96,0.1)",

        // Hover card upgrade
        "card-hover":  "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(212,175,55,0.08)",

        "none":        "none",
      },

      // ─── BACKDROP BLUR ──────────────────────────────────────────────────
      backdropBlur: {
        "xs":   "4px",
        "sm":   "8px",
        "md":   "12px",
        "lg":   "16px",   // standard glass
        "xl":   "24px",   // premium glass
        "2xl":  "32px",
        "3xl":  "48px",
      },

      // ─── BACKGROUND IMAGES (gradients from brief) ───────────────────────
      backgroundImage: {
        // Hero background
        "gradient-hero":    "linear-gradient(135deg, #040B17 0%, #0A1628 50%, #0F1E3A 100%)",

        // CTA button gradients
        "gradient-brand":   "linear-gradient(135deg, #1B3A6B 0%, #2563EB 100%)",
        "gradient-brand-hover": "linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)",

        // Gold accent line
        "gradient-gold":    "linear-gradient(90deg, transparent 0%, #D4AF37 50%, transparent 100%)",

        // Card glow radial
        "gradient-card-glow": "radial-gradient(ellipse at top, rgba(37,99,235,0.15) 0%, transparent 70%)",

        // Section divider
        "gradient-section": "linear-gradient(180deg, #0A1628 0%, #040B17 100%)",

        // Text gradients
        "gradient-text-brand": "linear-gradient(135deg, #D4AF37 0%, #F5D060 50%, #D4AF37 100%)",
        "gradient-text-blue":  "linear-gradient(135deg, #2563EB 0%, #60A5FA 100%)",
      },

      // ─── KEYFRAME ANIMATIONS ────────────────────────────────────────────
      keyframes: {
        // Float — gentle levitation for decorative elements
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-20px)" },
        },

        // Shimmer — for loading states and CTA buttons
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },

        // Glow pulse — for badges of urgency (opacity 1 → 0.7 → 1)
        "glow-pulse": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%":      { opacity: "0.7", transform: "scale(1.02)" },
        },

        // Slide in up — card entrance animation
        "slide-in-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },

        // Fade in — simple opacity entrance
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },

        // Scale in — modals and overlays
        "scale-in": {
          "0%":   { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },

        // Particle drift — for hero background particles
        "particle-drift": {
          "0%":   { transform: "translateY(0px) translateX(0px)", opacity: "0" },
          "10%":  { opacity: "0.03" },
          "90%":  { opacity: "0.03" },
          "100%": { transform: "translateY(-80px) translateX(20px)", opacity: "0" },
        },

        // Gold line reveal — scaleX(0→1) from center
        "line-reveal": {
          "0%":   { transform: "scaleX(0)", transformOrigin: "center" },
          "100%": { transform: "scaleX(1)", transformOrigin: "center" },
        },

        // Count up — for animated number counters
        "count-up": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },

        // Pulse badge — urgency badge pulse
        "pulse-badge": {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.7" },
        },

        // Progress shimmer — for AI analysis loading
        "progress-shimmer": {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },

        // Spin slow — decorative rotation
        "spin-slow": {
          "from": { transform: "rotate(0deg)" },
          "to":   { transform: "rotate(360deg)" },
        },

        // Navbar glass — background transition on scroll
        "glass-appear": {
          "0%":   { backdropFilter: "blur(0px)", backgroundColor: "rgba(4,11,23,0)" },
          "100%": { backdropFilter: "blur(16px)", backgroundColor: "rgba(4,11,23,0.8)" },
        },
      },

      // ─── ANIMATION UTILITIES ────────────────────────────────────────────
      animation: {
        // Float — 6s ease-in-out infinite
        "float":          "float 6s ease-in-out infinite",
        "float-slow":     "float 8s ease-in-out infinite",

        // Shimmer — for loading and CTA effects
        "shimmer":        "shimmer 2.5s linear infinite",

        // Glow pulse — for urgency badges (2000ms as per brief)
        "glow-pulse":     "glow-pulse 2s ease-in-out infinite",

        // Entrance animations (duration from brief: 500ms)
        "slide-in-up":    "slide-in-up 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
        "fade-in":        "fade-in 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
        "scale-in":       "scale-in 200ms cubic-bezier(0.34, 1.56, 0.64, 1) both",

        // Particle drift — slow, infinite
        "particle-drift": "particle-drift 8s ease-in-out infinite",

        // Gold line reveal (800ms ease-out, delay 300ms)
        "line-reveal":    "line-reveal 800ms ease-out 300ms both",

        // Count up entrance
        "count-up":       "count-up 400ms ease-out both",

        // Pulse badge — 2s infinite as per brief
        "pulse-badge":    "pulse-badge 2s ease-in-out infinite",

        // Progress shimmer — 3s for demo
        "progress-shimmer": "progress-shimmer 3s linear infinite",

        // Spin slow
        "spin-slow":      "spin-slow 20s linear infinite",

        // With stagger delays (use animate-[name] with delay utilities)
        "slide-in-up-1":  "slide-in-up 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 80ms both",
        "slide-in-up-2":  "slide-in-up 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 160ms both",
        "slide-in-up-3":  "slide-in-up 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 240ms both",
        "slide-in-up-4":  "slide-in-up 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 320ms both",
        "slide-in-up-5":  "slide-in-up 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 400ms both",
        "slide-in-up-6":  "slide-in-up 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 480ms both",
      },

      // ─── TRANSITION TIMING FUNCTIONS ────────────────────────────────────
      transitionTimingFunction: {
        "ease-premium":  "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "ease-spring":   "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "ease-out-soft": "cubic-bezier(0.16, 1, 0.3, 1)",
      },

      // ─── TRANSITION DURATION ────────────────────────────────────────────
      transitionDuration: {
        "150":  "150ms",
        "200":  "200ms",
        "250":  "250ms",
        "300":  "300ms",
        "500":  "500ms",
        "800":  "800ms",
        "1500": "1500ms",
      },
    },
  },
  plugins: [],
};

export default config;
