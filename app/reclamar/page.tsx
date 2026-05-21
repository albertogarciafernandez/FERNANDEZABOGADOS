"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, FileText, AlertCircle, CheckCircle, Loader2, Shield, Scale } from "lucide-react";

const CLAIM_TYPES = [
  { value: "multa_trafico", label: "🚗 Multa de Tráfico (DGT)" },
  { value: "contrato_vivienda", label: "🏠 Contrato de Vivienda" },
  { value: "compra_online", label: "📦 Compra Online / Devolución" },
  { value: "aerolinea", label: "✈️ Reclamación Aerolínea" },
  { value: "telefonica", label: "📱 Operadora Telefónica" },
  { value: "contrato_abusivo", label: "📋 Contrato Abusivo" },
  { value: "otro", label: "⚖️ Otro Tipo de Reclamación" },
];

type Analysis = {
  viabilidad: "ALTA" | "MEDIA" | "BAJA";
  probabilidadExito: number;
  resumen: string;
  fundamentosJuridicos: string[];
  posiblesDefensas: string[];
  proximos_pasos: string[];
  documentosNecesarios: string[];
  plazosImportantes: string[];
  estimacionRecuperacion: string;
  advertencias: string[];
};

const VIABILIDAD_COLORS = {
  ALTA: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
  MEDIA: "text-amber-400 bg-amber-400/10 border-amber-400/30",
  BAJA: "text-red-400 bg-red-400/10 border-red-400/30",
};

export default function ReclamarPage() {
  const [documentText, setDocumentText] = useState("");
  const [claimType, setClaimType] = useState("multa_trafico");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (ev) => setDocumentText(ev.target?.result as string);
      reader.readAsText(file);
    } else {
      setDocumentText(`[Archivo: ${file?.name}] Por favor, copia y pega el contenido del documento aquí para el análisis.`);
    }
  }, []);

  const handleAnalyze = async () => {
    if (!documentText.trim()) {
      setError("Por favor, introduce el contenido del documento a analizar.");
      return;
    }
    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentText, claimType, additionalInfo }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error en el análisis");
      setAnalysis(data.analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Volver al inicio</span>
          </Link>
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-white">Justicia <span className="text-amber-400">Legalia</span></span>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/40">
            <Shield className="w-3 h-3" />
            <span>Análisis seguro y confidencial</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">
            Analiza tu <span className="text-amber-400">Reclamación</span>
          </h1>
          <p className="text-white/60 text-lg">
            La IA analiza tu documento en segundos y determina la viabilidad legal de tu caso
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Input */}
          <div className="space-y-6">
            {/* Claim type */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-3">Tipo de reclamación</label>
              <div className="grid grid-cols-2 gap-2">
                {CLAIM_TYPES.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setClaimType(type.value)}
                    className={`p-3 rounded-xl border text-sm text-left transition-all ${
                      claimType === type.value
                        ? "border-amber-400 bg-amber-400/10 text-white"
                        : "border-white/10 bg-white/5 text-white/60 hover:border-white/20"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Document upload */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-3">Contenido del documento</label>
              <div
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                className={`border-2 border-dashed rounded-2xl p-4 transition-all ${
                  dragOver ? "border-amber-400 bg-amber-400/5" : "border-white/20 bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2 text-white/40 text-xs mb-3">
                  <Upload className="w-4 h-4" />
                  <span>Arrastra un archivo .txt o pega el texto directamente</span>
                </div>
                <textarea
                  value={documentText}
                  onChange={(e) => setDocumentText(e.target.value)}
                  placeholder="Pega aquí el texto de tu multa, contrato, ticket de compra, o describe tu situación detalladamente...

Ejemplo: 'Me notificaron una multa de la DGT de 200€ por exceso de velocidad el 15/03/2024 en la A-3 km 45. El radar estaba señalizado pero creo que la velocidad indicada no corresponde con la real...'"
                  className="w-full h-48 bg-transparent text-white/80 text-sm resize-none outline-none placeholder:text-white/30"
                />
              </div>
            </div>

            {/* Additional info */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-3">
                Información adicional <span className="text-white/40 font-normal">(opcional)</span>
              </label>
              <textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Añade cualquier detalle adicional relevante para tu caso..."
                className="w-full h-24 bg-white/5 border border-white/10 rounded-xl p-4 text-white/80 text-sm resize-none outline-none placeholder:text-white/30 focus:border-amber-400/50 transition-colors"
              />
            </div>

            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl font-bold text-black text-lg hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analizando con IA...
                </>
              ) : (
                <>
                  <Scale className="w-5 h-5" />
                  Analizar mi Caso Gratis
                </>
              )}
            </button>

            <p className="text-center text-xs text-white/30">
              🔒 Tu información es confidencial y está protegida. Análisis revisado por abogados colegiados.
            </p>
          </div>

          {/* Right: Results */}
          <div>
            {!analysis && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 border border-white/10 rounded-2xl bg-white/5">
                <FileText className="w-16 h-16 text-white/20 mb-4" />
                <h3 className="text-white/40 font-medium mb-2">Resultados del Análisis</h3>
                <p className="text-white/20 text-sm">
                  Introduce el contenido de tu documento y pulsa &quot;Analizar&quot; para obtener un análisis jurídico completo
                </p>
              </div>
            )}

            {loading && (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 border border-amber-400/20 rounded-2xl bg-amber-400/5">
                <div className="relative mb-6">
                  <div className="w-20 h-20 border-4 border-amber-400/20 rounded-full" />
                  <div className="absolute inset-0 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
                  <Scale className="absolute inset-0 m-auto w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-amber-400 font-bold text-lg mb-2">Analizando tu caso...</h3>
                <p className="text-white/40 text-sm">La IA está revisando la legislación española aplicable</p>
              </div>
            )}

            {analysis && (
              <div className="space-y-4 animate-fade-in">
                {/* Viabilidad */}
                <div className={`p-5 rounded-2xl border ${VIABILIDAD_COLORS[analysis.viabilidad]}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-bold text-lg">Viabilidad: {analysis.viabilidad}</span>
                    </div>
                    <span className="text-3xl font-black">{analysis.probabilidadExito}%</span>
                  </div>
                  <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${analysis.probabilidadExito}%`,
                        background: analysis.viabilidad === "ALTA" ? "#10b981" : analysis.viabilidad === "MEDIA" ? "#f59e0b" : "#ef4444"
                      }}
                    />
                  </div>
                  <p className="text-sm mt-3 opacity-90">{analysis.resumen}</p>
                </div>

                {/* Fundamentos jurídicos */}
                {analysis.fundamentosJuridicos?.length > 0 && (
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <h4 className="font-bold text-white mb-3 text-sm">⚖️ Fundamentos Jurídicos</h4>
                    <ul className="space-y-2">
                      {analysis.fundamentosJuridicos.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-white/70 text-sm">
                          <span className="text-amber-400 mt-0.5">•</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Próximos pasos */}
                {analysis.proximos_pasos?.length > 0 && (
                  <div className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
                    <h4 className="font-bold text-indigo-300 mb-3 text-sm">📋 Próximos Pasos</h4>
                    <ol className="space-y-2">
                      {analysis.proximos_pasos.map((paso, i) => (
                        <li key={i} className="flex items-start gap-3 text-white/70 text-sm">
                          <span className="text-indigo-400 font-bold flex-shrink-0">{i + 1}.</span>
                          {paso}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Estimación */}
                {analysis.estimacionRecuperacion && (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                    <h4 className="font-bold text-emerald-300 mb-1 text-sm">💰 Estimación de Recuperación</h4>
                    <p className="text-white/80 text-sm">{analysis.estimacionRecuperacion}</p>
                  </div>
                )}

                {/* Advertencias */}
                {analysis.advertencias?.length > 0 && (
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                    <h4 className="font-bold text-yellow-300 mb-3 text-sm">⚠️ Advertencias</h4>
                    {analysis.advertencias.map((adv, i) => (
                      <p key={i} className="text-white/60 text-xs">{adv}</p>
                    ))}
                  </div>
                )}

                <button className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl font-bold text-black hover:opacity-90 transition-all">
                  🚀 Continuar con Abogado — Empieza Ahora
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
