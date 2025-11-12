import { create } from "zustand"

export interface CartItem {
  productId: string
  productName: string
  price: number
  quantity: number
  unit: string
}

interface CartStore {
  items: CartItem[]
  discount: number
  taxRate: number
  paymentMethod: "cash" | "card" | "online"
  addItem: (item: CartItem) => void
  updateItem: (productId: string, quantity: number) => void
  removeItem: (productId: string) => void
  clearCart: () => void
  setDiscount: (discount: number) => void
  setTaxRate: (rate: number) => void
  setPaymentMethod: (method: "cash" | "card" | "online") => void
  getSubtotal: () => number
  getTax: () => number
  getTotal: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  discount: 0,
  taxRate: 0,
  paymentMethod: "cash",

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.productId === item.productId)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i,
          ),
        }
      }
      return { items: [...state.items, item] }
    }),

  updateItem: (productId, quantity) =>
    set((state) => ({
      items: state.items.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
    })),

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.productId !== productId),
    })),

  clearCart: () => set({ items: [], discount: 0, paymentMethod: "cash" }),

  setDiscount: (discount) => set({ discount }),
  setTaxRate: (rate) => set({ taxRate: rate }),
  setPaymentMethod: (method) => set({ paymentMethod: method }),

  getSubtotal: () => {
    const state = get()
    return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },

  getTax: () => {
    const state = get()
    const subtotal = state.getSubtotal()
    return (subtotal * state.taxRate) / 100
  },

  getTotal: () => {
    const state = get()
    const subtotal = state.getSubtotal()
    const tax = state.getTax()
    return subtotal - state.discount + tax
  },
}))
