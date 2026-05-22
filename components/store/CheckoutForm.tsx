'use client'

import { useState, useCallback } from 'react'
import {
  User,
  Mail,
  Phone,
  Building2,
  FileText,
  CreditCard,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Lock,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Receipt,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface CheckoutPersonalData {
  nombre: string
  apellidos: string
  email: string
  telefono: string
  quiereFactura: boolean
  empresa: string
  nif: string
}

export interface CheckoutFormProps {
  /** Step 1 → 2 trigger. Called with collected personal data. */
  onPersonalDataComplete: (data: CheckoutPersonalData) => void
  /** Step 2 → 3 trigger. Called when T&C accepted. */
  onConfirmationComplete: () => void
  /** Reset form to step 1 */
  onBack: () => void
  currentStep: 1 | 2
  loading?: boolean
  error?: string | null
}

// ─── Validators ────────────────────────────────────────────────────────────────

type PersonalErrors = Partial<Record<keyof CheckoutPersonalData, string>>

function validatePersonal(data: CheckoutPersonalData): PersonalErrors {
  const errors: PersonalErrors = {}

  if (!data.nombre.trim()) errors.nombre = 'El nombre es obligatorio'
  if (!data.apellidos.trim()) errors.apellidos = 'Los apellidos son obligatorios'

  if (!data.email.trim()) {
    errors.email = 'El email es obligatorio'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Introduce un email válido'
  }

  if (data.telefono && !/^[+\d\s\-()]{7,20}$/.test(data.telefono)) {
    errors.telefono = 'Formato de teléfono no válido'
  }

  if (data.quiereFactura) {
    if (!data.empresa.trim()) errors.empresa = 'El nombre de empresa es obligatorio'
    if (!data.nif.trim()) {
      errors.nif = 'El NIF/CIF es obligatorio para factura'
    } else if (!/^[A-Za-z0-9]{7,12}$/.test(data.nif.trim())) {
      errors.nif = 'Formato de NIF/CIF no válido'
    }
  }

  return errors
}

// ─── Form input field ───────────────────────────────────────────────────────────

interface FieldProps {
  label: string
  name: string
  type?: string
  value: string
  onChange: (val: string) => void
  placeholder?: string
  error?: string
  icon?: React.ReactNode
  required?: boolean
  autoComplete?: string
}

function Field({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  icon,
  required,
  autoComplete,
}: FieldProps) {
  const [touched, setTouched] = useState(false)
  const showError = error && touched

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-widest mb-1.5"
      >
        {label}
        {required && <span className="text-[#D4AF37] ml-0.5">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div
            className={cn(
              'absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-150',
              showError ? 'text-[#DC2626]' : value ? 'text-[#D4AF37]' : 'text-[#475569]',
            )}
          >
            {icon}
          </div>
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder={placeholder}
          className={cn(
            'w-full py-3.5 rounded-xl text-sm text-[#F8FAFC] placeholder:text-[#475569]',
            'bg-[rgba(22,45,82,0.6)] backdrop-blur-sm',
            'border transition-all duration-150',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            icon ? 'pl-10 pr-4' : 'px-4',
            showError
              ? 'border-[rgba(220,38,38,0.5)] focus:border-[rgba(220,38,38,0.7)] focus:ring-[rgba(220,38,38,0.2)]'
              : value
              ? 'border-[rgba(212,175,55,0.3)] focus:border-[rgba(212,175,55,0.5)] focus:ring-[rgba(212,175,55,0.15)]'
              : 'border-[rgba(255,255,255,0.1)] focus:border-[rgba(212,175,55,0.4)] focus:ring-[rgba(212,175,55,0.12)]',
          )}
        />
        {/* Valid indicator */}
        {touched && !error && value && (
          <CheckCircle2 className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#059669]" />
        )}
        {showError && (
          <AlertCircle className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#DC2626]" />
        )}
      </div>
      {showError && (
        <p className="mt-1.5 text-xs text-[#DC2626] flex items-center gap-1">
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

// ─── Checkbox field ─────────────────────────────────────────────────────────────

function CheckboxField({
  checked,
  onChange,
  children,
  error,
}: {
  checked: boolean
  onChange: (val: boolean) => void
  children: React.ReactNode
  error?: string
}) {
  return (
    <div>
      <label className="flex items-start gap-3 cursor-pointer group">
        <div className="relative mt-0.5 flex-shrink-0">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="sr-only"
          />
          <div
            className={cn(
              'w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-150',
              checked
                ? 'bg-[#D4AF37] border-[#D4AF37]'
                : 'bg-[rgba(22,45,82,0.6)] border-[rgba(255,255,255,0.15)] group-hover:border-[rgba(212,175,55,0.4)]',
            )}
          >
            {checked && (
              <svg viewBox="0 0 12 10" className="w-3 h-3" fill="none">
                <path
                  d="M1 5l3.5 3.5L11 1"
                  stroke="#040B17"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </div>
        <span className="text-sm text-[#94A3B8] group-hover:text-[#F8FAFC] transition-colors duration-150 leading-snug">
          {children}
        </span>
      </label>
      {error && (
        <p className="mt-1.5 text-xs text-[#DC2626] flex items-center gap-1 ml-8">
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

// ─── Step 1 — Personal information ────────────────────────────────────────────

interface Step1Props {
  onComplete: (data: CheckoutPersonalData) => void
}

function Step1PersonalInfo({ onComplete }: Step1Props) {
  const [data, setData] = useState<CheckoutPersonalData>({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    quiereFactura: false,
    empresa: '',
    nif: '',
  })
  const [errors, setErrors] = useState<PersonalErrors>({})
  const [submitAttempted, setSubmitAttempted] = useState(false)

  const update = useCallback(
    <K extends keyof CheckoutPersonalData>(key: K, value: CheckoutPersonalData[K]) => {
      setData((prev) => {
        const next = { ...prev, [key]: value }
        if (submitAttempted) setErrors(validatePersonal(next))
        return next
      })
    },
    [submitAttempted],
  )

  const handleSubmit = () => {
    setSubmitAttempted(true)
    const errs = validatePersonal(data)
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      onComplete(data)
    }
  }

  return (
    <div className="space-y-6">
      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          label="Nombre"
          name="nombre"
          value={data.nombre}
          onChange={(v) => update('nombre', v)}
          placeholder="Juan"
          icon={<User className="w-4 h-4" />}
          error={errors.nombre}
          required
          autoComplete="given-name"
        />
        <Field
          label="Apellidos"
          name="apellidos"
          value={data.apellidos}
          onChange={(v) => update('apellidos', v)}
          placeholder="García Martínez"
          icon={<User className="w-4 h-4" />}
          error={errors.apellidos}
          required
          autoComplete="family-name"
        />
      </div>

      <Field
        label="Email"
        name="email"
        type="email"
        value={data.email}
        onChange={(v) => update('email', v)}
        placeholder="juan@empresa.com"
        icon={<Mail className="w-4 h-4" />}
        error={errors.email}
        required
        autoComplete="email"
      />

      <Field
        label="Teléfono"
        name="telefono"
        type="tel"
        value={data.telefono}
        onChange={(v) => update('telefono', v)}
        placeholder="+34 600 000 000"
        icon={<Phone className="w-4 h-4" />}
        error={errors.telefono}
        autoComplete="tel"
      />

      {/* Invoice toggle */}
      <div className="p-4 rounded-xl border border-[rgba(212,175,55,0.12)] bg-[rgba(212,175,55,0.04)]">
        <CheckboxField
          checked={data.quiereFactura}
          onChange={(v) => update('quiereFactura', v)}
        >
          <span className="font-medium text-[#F8FAFC]">Quiero factura para empresa</span>
          <span className="block text-xs text-[#475569] mt-0.5">
            Se habilitarán los campos de empresa y NIF/CIF
          </span>
        </CheckboxField>
      </div>

      {/* Company fields — conditional */}
      {data.quiereFactura && (
        <div className="space-y-4 animate-slide-in-up">
          <div className="h-px bg-[rgba(212,175,55,0.1)]" />
          <p className="text-[11px] font-semibold text-[#D4AF37] uppercase tracking-widest">
            Datos de facturación
          </p>
          <Field
            label="Nombre de empresa"
            name="empresa"
            value={data.empresa}
            onChange={(v) => update('empresa', v)}
            placeholder="Mi Empresa S.L."
            icon={<Building2 className="w-4 h-4" />}
            error={errors.empresa}
            required
            autoComplete="organization"
          />
          <Field
            label="NIF / CIF"
            name="nif"
            value={data.nif}
            onChange={(v) => update('nif', v.toUpperCase())}
            placeholder="B12345678"
            icon={<FileText className="w-4 h-4" />}
            error={errors.nif}
            required
          />
        </div>
      )}

      {/* CTA */}
      <button
        onClick={handleSubmit}
        className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-bold text-[#040B17] text-base transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(212,175,55,0.35)] active:scale-[0.99]"
        style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #F5D060 50%, #D4AF37 100%)' }}
      >
        Continuar al resumen
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}

// ─── Step 2 — Confirmation ────────────────────────────────────────────────────

interface Step2Props {
  personalData: CheckoutPersonalData
  onBack: () => void
  onConfirm: () => void
}

function Step2Confirmation({ personalData, onBack, onConfirm }: Step2Props) {
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [acceptPrivacy, setAcceptPrivacy] = useState(false)
  const [termsError, setTermsError] = useState('')
  const [privacyError, setPrivacyError] = useState('')

  const handleConfirm = () => {
    let valid = true
    if (!acceptTerms) {
      setTermsError('Debes aceptar los Términos y Condiciones para continuar')
      valid = false
    } else {
      setTermsError('')
    }
    if (!acceptPrivacy) {
      setPrivacyError('Debes aceptar la Política de Privacidad para continuar')
      valid = false
    } else {
      setPrivacyError('')
    }
    if (valid) onConfirm()
  }

  return (
    <div className="space-y-6">
      {/* Personal data summary */}
      <div className="p-5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(22,45,82,0.4)]">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-4 h-4 text-[#D4AF37]" />
          <h3 className="text-sm font-semibold text-[#F8FAFC]">Datos confirmados</h3>
          <button
            onClick={onBack}
            className="ml-auto text-[10px] text-[#D4AF37] hover:text-[#F5D060] transition-colors font-semibold uppercase tracking-wider"
          >
            Editar
          </button>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex gap-2">
            <span className="text-[#475569] w-24 flex-shrink-0">Nombre:</span>
            <span className="text-[#F8FAFC]">
              {personalData.nombre} {personalData.apellidos}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="text-[#475569] w-24 flex-shrink-0">Email:</span>
            <span className="text-[#F8FAFC]">{personalData.email}</span>
          </div>
          {personalData.telefono && (
            <div className="flex gap-2">
              <span className="text-[#475569] w-24 flex-shrink-0">Teléfono:</span>
              <span className="text-[#F8FAFC]">{personalData.telefono}</span>
            </div>
          )}
          {personalData.quiereFactura && (
            <>
              <div className="h-px bg-[rgba(255,255,255,0.06)] my-2" />
              <div className="flex gap-2">
                <span className="text-[#475569] w-24 flex-shrink-0">Empresa:</span>
                <span className="text-[#F8FAFC]">{personalData.empresa}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-[#475569] w-24 flex-shrink-0">NIF/CIF:</span>
                <span className="text-[#F8FAFC]">{personalData.nif}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* SSL security badge */}
      <div className="flex items-center gap-3 p-4 rounded-xl border border-[rgba(5,150,105,0.2)] bg-[rgba(5,150,105,0.06)]">
        <ShieldCheck className="w-5 h-5 text-[#059669] flex-shrink-0" />
        <div>
          <p className="text-[#059669] text-sm font-semibold">Pago 100% seguro</p>
          <p className="text-[#94A3B8] text-xs mt-0.5">
            Tus datos están protegidos con encriptación SSL 256-bit. El pago es
            procesado de forma segura por Stripe.
          </p>
        </div>
        <div className="ml-auto flex-shrink-0">
          <Lock className="w-4 h-4 text-[#059669]" />
        </div>
      </div>

      {/* Legal acceptances */}
      <div className="space-y-4">
        <CheckboxField
          checked={acceptTerms}
          onChange={setAcceptTerms}
          error={termsError}
        >
          He leído y acepto los{' '}
          <a
            href="/legal/terminos"
            className="text-[#D4AF37] hover:text-[#F5D060] underline underline-offset-2 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Términos y Condiciones
          </a>{' '}
          del servicio
        </CheckboxField>

        <CheckboxField
          checked={acceptPrivacy}
          onChange={setAcceptPrivacy}
          error={privacyError}
        >
          He leído y acepto la{' '}
          <a
            href="/legal/privacidad"
            className="text-[#D4AF37] hover:text-[#F5D060] underline underline-offset-2 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Política de Privacidad
          </a>{' '}
          y el tratamiento de mis datos
        </CheckboxField>
      </div>

      {/* RGPD note */}
      <p className="text-[#475569] text-xs leading-relaxed border-l-2 border-[rgba(212,175,55,0.2)] pl-3">
        En cumplimiento del RGPD, tus datos personales se utilizan exclusivamente
        para gestionar el servicio contratado. Nunca los compartimos con terceros
        sin tu consentimiento explícito.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onBack}
          className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl text-sm font-medium text-[#94A3B8] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] hover:text-[#F8FAFC] hover:border-[rgba(255,255,255,0.18)] transition-all duration-150"
        >
          <ChevronLeft className="w-4 h-4" />
          Volver
        </button>

        <button
          onClick={handleConfirm}
          className="flex-1 flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-bold text-[#040B17] text-base transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(212,175,55,0.35)] active:scale-[0.99]"
          style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #F5D060 50%, #D4AF37 100%)' }}
        >
          <CreditCard className="w-5 h-5" />
          Ir al pago con Stripe
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function CheckoutForm({
  onPersonalDataComplete,
  onConfirmationComplete,
  onBack,
  currentStep,
  loading = false,
  error = null,
}: CheckoutFormProps) {
  const [personalData, setPersonalData] = useState<CheckoutPersonalData | null>(null)

  const handleStep1Complete = (data: CheckoutPersonalData) => {
    setPersonalData(data)
    onPersonalDataComplete(data)
  }

  if (currentStep === 2 && personalData) {
    return (
      <Step2Confirmation
        personalData={personalData}
        onBack={onBack}
        onConfirm={onConfirmationComplete}
      />
    )
  }

  return <Step1PersonalInfo onComplete={handleStep1Complete} />
}

// ─── Step 3 — Payment trigger ─────────────────────────────────────────────────

interface Step3Props {
  onPay: () => void
  onBack: () => void
  loading: boolean
  error: string | null
  total: string
}

export function Step3Payment({ onPay, onBack, loading, error, total }: Step3Props) {
  return (
    <div className="space-y-6">
      {/* Stripe badge */}
      <div className="flex items-center gap-4 p-5 rounded-xl border border-[rgba(99,91,255,0.2)] bg-[rgba(99,91,255,0.06)]">
        <div className="w-12 h-12 rounded-xl bg-[rgba(99,91,255,0.15)] flex items-center justify-center flex-shrink-0">
          <CreditCard className="w-6 h-6 text-[#635BFF]" />
        </div>
        <div>
          <p className="text-[#F8FAFC] font-semibold text-sm">Pago procesado por Stripe</p>
          <p className="text-[#94A3B8] text-xs mt-0.5">
            Plataforma de pagos certificada PCI DSS Level 1. Tus datos de tarjeta nunca
            tocan nuestros servidores.
          </p>
        </div>
      </div>

      {/* Payment methods accepted */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Tarjeta Visa / Mastercard', icon: CreditCard },
          { label: 'Apple Pay / Google Pay', icon: ShieldCheck },
          { label: 'Bizum', icon: Receipt },
          { label: 'Transferencia bancaria', icon: Building2 },
        ].map(({ label, icon: Icon }) => (
          <div
            key={label}
            className="flex items-center gap-2.5 p-3 rounded-xl border border-[rgba(255,255,255,0.07)] bg-[rgba(22,45,82,0.3)] text-xs text-[#94A3B8]"
          >
            <Icon className="w-3.5 h-3.5 text-[#475569]" />
            {label}
          </div>
        ))}
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl border border-[rgba(220,38,38,0.3)] bg-[rgba(220,38,38,0.08)]">
          <AlertCircle className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[#DC2626] text-sm font-semibold">Error al procesar el pago</p>
            <p className="text-[#94A3B8] text-xs mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Pay button */}
      <button
        onClick={onPay}
        disabled={loading}
        className={cn(
          'w-full flex items-center justify-center gap-3 py-5 px-6 rounded-xl font-black text-lg transition-all duration-200',
          loading
            ? 'opacity-80 cursor-not-allowed'
            : 'hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(212,175,55,0.4)] active:scale-[0.99]',
          'text-[#040B17]',
        )}
        style={{
          background: loading
            ? 'linear-gradient(135deg, #B8860B 0%, #D4AF37 100%)'
            : 'linear-gradient(135deg, #D4AF37 0%, #F5D060 50%, #D4AF37 100%)',
        }}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Redirigiendo a Stripe…
          </>
        ) : (
          <>
            <Lock className="w-5 h-5" />
            Pagar ahora {total}
            <ChevronRight className="w-5 h-5" />
          </>
        )}
      </button>

      {/* Guarantee note */}
      <p className="text-center text-[#475569] text-xs leading-relaxed">
        Garantía de satisfacción 30 días · Sin permanencia · Reembolso inmediato
      </p>

      {/* Back button */}
      <button
        onClick={onBack}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-medium text-[#94A3B8] border border-[rgba(255,255,255,0.08)] bg-transparent hover:text-[#F8FAFC] hover:border-[rgba(255,255,255,0.15)] transition-all duration-150 disabled:opacity-40"
      >
        <ChevronLeft className="w-4 h-4" />
        Volver al resumen
      </button>
    </div>
  )
}

export default CheckoutForm
