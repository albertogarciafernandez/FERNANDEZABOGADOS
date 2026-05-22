export type ProductCategory = 'subscription' | 'one-time' | 'success-fee'

export type ProductId =
  | 'escudo-total'
  | 'analisis-expres'
  | 'recurso-garantizado'
  | 'pack-empresarial'
  | 'contrato-blindado'
  | 'defensa-premium'

export interface ProductFeature {
  text: string
  included: boolean
  highlight?: boolean
}

export interface ProductBadge {
  text: string
  color: 'gold' | 'red' | 'green' | 'blue'
}

export interface Product {
  id: ProductId
  slug: string
  name: string
  trademark: string
  tagline: string
  description: string
  category: ProductCategory
  price: number
  originalPrice?: number
  currency: string
  billingPeriod?: 'month' | 'year' | 'one-time'
  badge?: ProductBadge
  features: ProductFeature[]
  guarantee: string
  targetAudience: string
  stripeProductId?: string
  stripePriceId?: string
  popular?: boolean
  urgent?: boolean
  successRate?: number
  deliveryTime?: string
  icon: string
  color: string
  gradient: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: 'pending' | 'paid' | 'processing' | 'completed'
  createdAt: Date
  customerEmail: string
  stripeSessionId?: string
}
