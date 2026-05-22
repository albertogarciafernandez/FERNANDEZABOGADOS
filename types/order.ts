import type { CartItem } from './product'

export type OrderStatus = 'pending' | 'paid' | 'processing' | 'completed' | 'cancelled' | 'refunded'

export type PaymentMethod = 'card' | 'sepa_debit' | 'paypal'

export interface CustomerInfo {
  name: string
  email: string
  phone?: string
  company?: string
  nif?: string
  address?: BillingAddress
}

export interface BillingAddress {
  line1: string
  line2?: string
  city: string
  postalCode: string
  province: string
  country: string
}

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  subtotal: number
}

export interface Order {
  id: string
  orderNumber: string
  items: CartItem[]
  orderItems: OrderItem[]
  subtotal: number
  tax: number
  total: number
  currency: string
  status: OrderStatus
  paymentMethod?: PaymentMethod
  customer: CustomerInfo
  createdAt: Date
  updatedAt: Date
  paidAt?: Date
  stripeSessionId?: string
  stripePaymentIntentId?: string
  metadata?: Record<string, string>
}

export interface CreateOrderPayload {
  items: CartItem[]
  customer: CustomerInfo
  currency?: string
}

export interface StripeCheckoutSession {
  sessionId: string
  url: string
}

export interface WebhookEvent {
  id: string
  type: string
  data: {
    object: Record<string, unknown>
  }
  created: number
}
