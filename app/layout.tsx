import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Justicia Legalia | Recurre tus Multas con Inteligencia Artificial",
  description:
    "Plataforma legal impulsada por IA para recurrir multas de tráfico, reclamaciones de consumidores, contratos de vivienda y reclamaciones legales. 94% de éxito garantizado.",
  keywords:
    "recurrir multa, abogado IA, reclamación legal, multa tráfico, consumidor, contrato vivienda, inteligencia artificial, DGT",
  authors: [{ name: "Justicia Legalia" }],
  openGraph: {
    title: "Justicia Legalia | Tu Escudo Legal con IA",
    description:
      "Recurre multas y reclamaciones con Inteligencia Artificial. 94% de éxito. Sin pago si no ganamos.",
    type: "website",
    locale: "es_ES",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
