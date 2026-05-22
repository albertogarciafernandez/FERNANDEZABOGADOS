'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { CreditCard, User, Mail, Phone, Building2, FileText, ShieldCheck, Loader2 } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/products'
import { cn } from '@/lib/utils'

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  nif: string
  acceptTerms: boolean
  acceptPrivacy: boolean
}

const initialForm: FormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  nif: '',
  acceptTerms: false,
  acceptPrivacy: false,
}

export function CheckoutForm() {
  const router = useRouter()
  const { items, getTotal, getSubtotal, getTax, clearCart } = useCartStore()
  const [formData, setFormData] = useState<FormData>(initialForm)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio'
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Introduce un email válido'
    }
    if (!formData.acceptTerms) newErrors.acceptTerms = 'Debes aceptar los términos'
    if (!formData.acceptPrivacy) newErrors.acceptPrivacy = 'Debes aceptar la política de privacidad'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    if (items.length === 0) {
      toast.error('Tu carrito está vacío')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          customer: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            nif: formData.nif,
          },
        }),
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.message || 'Error al procesar el pago')
      }

      const { url } = await response.json()

      if (url) {
        window.location.href = url
      } else {
        throw new Error('No se recibió la URL de pago')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      toast.error(error instanceof Error ? error.message : 'Error al procesar el pago')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-white/50">No hay productos en tu carrito.</p>
        <a href="/tienda" className="text-indigo-400 hover:text-indigo-300 text-sm mt-2 block">
          Explorar servicios →
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Left: Form */}
      <div className="lg:col-span-3 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <User className="h-4 w-4 text-indigo-400" />
            Datos de contacto
          </h2>
          <div className="space-y-4">
            <FormField
              label="Nombre completo *"
              icon={<User className="h-4 w-4" />}
              value={formData.name}
              onChange={handleChange('name')}
              placeholder="Juan García Martínez"
              error={errors.name}
            />
            <FormField
              label="Email *"
              icon={<Mail className="h-4 w-4" />}
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              placeholder="juan@empresa.com"
              error={errors.email}
            />
            <FormField
              label="Teléfono"
              icon={<Phone className="h-4 w-4" />}
              type="tel"
              value={formData.phone}
              onChange={handleChange('phone')}
              placeholder="+34 600 000 000"
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-indigo-400" />
            Datos de facturación (opcional)
          </h2>
          <div className="space-y-4">
            <FormField
              label="Empresa"
              icon={<Building2 className="h-4 w-4" />}
              value={formData.company}
              onChange={handleChange('company')}
              placeholder="Mi Empresa S.L."
            />
            <FormField
              label="NIF / CIF"
              icon={<FileText className="h-4 w-4" />}
              value={formData.nif}
              onChange={handleChange('nif')}
              placeholder="B12345678"
            />
          </div>
        </div>

        {/* Legal checkboxes */}
        <div className="space-y-3">
          <CheckboxField
            label={
              <span>
                Acepto los{' '}
                <a href="/legal/terminos" className="text-indigo-400 hover:underline">
                  Términos y Condiciones
                </a>{' '}
                del servicio
              </span>
            }
            checked={formData.acceptTerms}
            onChange={handleChange('acceptTerms')}
            error={errors.acceptTerms}
          />
          <CheckboxField
            label={
              <span>
                He leído y acepto la{' '}
                <a href="/legal/privacidad" className="text-indigo-400 hover:underline">
                  Política de Privacidad
                </a>
              </span>
            }
            checked={formData.acceptPrivacy}
            onChange={handleChange('acceptPrivacy')}
            error={errors.acceptPrivacy}
          />
        </div>
      </div>

      {/* Right: Order summary */}
      <div className="lg:col-span-2">
        <div className="sticky top-6 bg-surface border border-white/10 rounded-2xl p-6 space-y-5">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-indigo-400" />
            Resumen del pedido
          </h2>

          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span>{item.product.icon}</span>
                  <span className="text-white/70">
                    {item.product.name}
                    {item.quantity > 1 && ` ×${item.quantity}`}
                  </span>
                </div>
                <span className="text-white font-medium">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-3 border-t border-white/10 text-sm">
            <div className="flex justify-between text-white/50">
              <span>Subtotal</span>
              <span>{formatPrice(getSubtotal())}</span>
            </div>
            <div className="flex justify-between text-white/50">
              <span>IVA 21%</span>
              <span>{formatPrice(getTax())}</span>
            </div>
            <div className="flex justify-between text-white font-bold text-base pt-2 border-t border-white/10">
              <span>Total</span>
              <span>{formatPrice(getTotal())}</span>
            </div>
          </div>

          <Button
            type="submit"
            variant="gold"
            fullWidth
            size="lg"
            loading={loading}
            icon={<CreditCard className="h-4 w-4" />}
          >
            {loading ? 'Procesando...' : 'Pagar ahora'}
          </Button>

          <div className="flex items-center justify-center gap-2 text-xs text-white/30">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Pago seguro · SSL 256-bit · Stripe</span>
          </div>
        </div>
      </div>
    </form>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FormField({
  label,
  icon,
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
}: {
  label: string
  icon: React.ReactNode
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: string
  error?: string
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20">{icon}</div>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cn(
            'w-full pl-10 pr-4 py-3 rounded-xl text-sm',
            'bg-white/[0.04] border text-white placeholder:text-white/20',
            'focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-colors',
            error ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-white/20'
          )}
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  )
}

function CheckboxField({
  label,
  checked,
  onChange,
  error,
}: {
  label: React.ReactNode
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
}) {
  return (
    <div>
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-0 cursor-pointer"
        />
        <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors leading-snug">
          {label}
        </span>
      </label>
      {error && <p className="mt-1 text-xs text-red-400 ml-7">{error}</p>}
    </div>
  )
}

export default CheckoutForm
