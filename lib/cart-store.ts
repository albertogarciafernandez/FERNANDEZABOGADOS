'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Product, CartItem } from '@/types/product'

interface CartState {
  items: CartItem[]
  isOpen: boolean

  // Actions
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void

  // Computed
  getTotal: () => number
  getItemCount: () => number
  getSubtotal: () => number
  getTax: () => number
  hasItem: (productId: string) => boolean
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: Product, quantity = 1) => {
        const { items } = get()
        const existing = items.find((item) => item.product.id === product.id)

        if (existing) {
          set({
            items: items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
            isOpen: true,
          })
        } else {
          set({
            items: [...items, { product, quantity }],
            isOpen: true,
          })
        }
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }))
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      getTotal: () => {
        const { items } = get()
        const subtotal = items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        )
        const tax = subtotal * 0.21 // IVA 21%
        return subtotal + tax
      },

      getSubtotal: () => {
        const { items } = get()
        return items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        )
      },

      getTax: () => {
        const subtotal = get().getSubtotal()
        return subtotal * 0.21
      },

      getItemCount: () => {
        const { items } = get()
        return items.reduce((count, item) => count + item.quantity, 0)
      },

      hasItem: (productId: string) => {
        return get().items.some((item) => item.product.id === productId)
      },
    }),
    {
      name: 'fernandez-abogados-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
)
