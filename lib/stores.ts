import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Product {
  id: string
  name: string
  sku: string
  category: string
  price: number
  cost: number
  stock: number
  unit: string
  createdAt: Date
}

export const useProductStore = create<{
  products: Product[]
  addProduct: (product: Omit<Product, "id" | "createdAt">) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
}>()(
  persist(
    (set) => ({
      products: [
        {
          id: "1",
          name: "Laptop",
          sku: "SKU001",
          category: "Electronics",
          price: 999,
          cost: 600,
          stock: 15,
          unit: "pc",
          createdAt: new Date(),
        },
        {
          id: "2",
          name: "Mouse",
          sku: "SKU002",
          category: "Electronics",
          price: 29,
          cost: 10,
          stock: 150,
          unit: "pc",
          createdAt: new Date(),
        },
        {
          id: "3",
          name: "Keyboard",
          sku: "SKU003",
          category: "Electronics",
          price: 79,
          cost: 30,
          stock: 80,
          unit: "pc",
          createdAt: new Date(),
        },
        {
          id: "4",
          name: "Monitor",
          sku: "SKU004",
          category: "Electronics",
          price: 299,
          cost: 150,
          stock: 25,
          unit: "pc",
          createdAt: new Date(),
        },
      ],
      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, { ...product, id: Date.now().toString(), createdAt: new Date() }],
        })),
      updateProduct: (id, product) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...product } : p)),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
    }),
    { name: "product-store" },
  ),
)

export interface Customer {
  _id: string
  name: string
  email: string
  phone: string
  creditLimit: number
  totalPurchases: number
  createdAt: Date
}

export const useCustomerStore = create<{
  customers: Customer[]
  addCustomer: (customer: Omit<Customer, "_id" | "createdAt" | "totalPurchases">) => void
  updateCustomer: (id: string, customer: Partial<Customer>) => void
  deleteCustomer: (id: string) => void
}>()(
  persist(
    (set) => ({
      customers: [
        {
          _id: "1",
          name: "John Doe",
          email: "john@example.com",
          phone: "555-0101",
          creditLimit: 5000,
          totalPurchases: 2500,
          createdAt: new Date(),
        },
        {
          _id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          phone: "555-0102",
          creditLimit: 10000,
          totalPurchases: 7500,
          createdAt: new Date(),
        },
      ],
      addCustomer: (customer) =>
        set((state) => ({
          customers: [
            ...state.customers,
            { ...customer, _id: Date.now().toString(), totalPurchases: 0, createdAt: new Date() },
          ],
        })),
      updateCustomer: (id, customer) =>
        set((state) => ({
          customers: state.customers.map((c) => (c._id === id ? { ...c, ...customer } : c)),
        })),
      deleteCustomer: (id) =>
        set((state) => ({
          customers: state.customers.filter((c) => c._id !== id),
        })),
    }),
    { name: "customer-store" },
  ),
)

export interface Sale {
  _id: string
  saleNumber: string
  items: Array<{ productId: string; quantity: number; price: number }>
  subtotal: number
  tax: number
  discount: number
  total: number
  paymentMethod: string
  customerId?: string
  createdAt: Date
}

export const useSalesStore = create<{
  sales: Sale[]
  addSale: (sale: Omit<Sale, "_id" | "createdAt">) => void
  getSales: () => Sale[]
}>()(
  persist(
    (set, get) => ({
      sales: [
        {
          _id: "1",
          saleNumber: "SALE-001",
          items: [],
          subtotal: 1234,
          tax: 123,
          discount: 0,
          total: 1357,
          paymentMethod: "cash",
          createdAt: new Date(Date.now() - 86400000),
        },
        {
          _id: "2",
          saleNumber: "SALE-002",
          items: [],
          subtotal: 2567,
          tax: 257,
          discount: 100,
          total: 2724,
          paymentMethod: "card",
          createdAt: new Date(Date.now() - 43200000),
        },
      ],
      addSale: (sale) =>
        set((state) => ({
          sales: [...state.sales, { ...sale, _id: Date.now().toString(), createdAt: new Date() }],
        })),
      getSales: () => get().sales,
    }),
    { name: "sales-store" },
  ),
)

export interface Purchase {
  _id: string
  purchaseNumber: string
  supplier: string
  invoiceNumber: string
  items: Array<{ productId: string; quantity: number; cost: number }>
  subtotal: number
  tax: number
  total: number
  status: string
  createdAt: Date
}

export const usePurchaseStore = create<{
  purchases: Purchase[]
  addPurchase: (purchase: Omit<Purchase, "_id" | "createdAt" | "purchaseNumber">) => void
  getPurchases: () => Purchase[]
}>()(
  persist(
    (set, get) => ({
      purchases: [
        {
          _id: "1",
          purchaseNumber: "PO-001",
          supplier: "Tech Supplies Inc",
          invoiceNumber: "INV-001",
          items: [],
          subtotal: 5000,
          tax: 500,
          total: 5500,
          status: "Received",
          createdAt: new Date(Date.now() - 172800000),
        },
      ],
      addPurchase: (purchase) =>
        set((state) => ({
          purchases: [
            ...state.purchases,
            {
              ...purchase,
              _id: Date.now().toString(),
              purchaseNumber: `PO-${(state.purchases.length + 1).toString().padStart(3, "0")}`,
              createdAt: new Date(),
            },
          ],
        })),
      getPurchases: () => get().purchases,
    }),
    { name: "purchase-store" },
  ),
)

export const useAuthStore = create<{
  token: string | null
  organizationId: string | null
  setAuth: (token: string, organizationId: string) => void
  clearAuth: () => void
}>()(
  persist(
    (set) => ({
      token: null,
      organizationId: null,
      setAuth: (token, organizationId) => set({ token, organizationId }),
      clearAuth: () => set({ token: null, organizationId: null }),
    }),
    { name: "auth-store" },
  ),
)

export const useBackupStore = create<{
  createBackup: () => void
  restoreBackup: (backupData: BackupData) => void
  exportBackup: () => void
  importBackup: (file: File) => Promise<void>
}>()((set) => ({
  createBackup: () => {
    const productStore = useProductStore.getState()
    const customerStore = useCustomerStore.getState()
    const salesStore = useSalesStore.getState()
    const purchaseStore = usePurchaseStore.getState()

    const backup: BackupData = {
      version: "1.0",
      timestamp: new Date().toISOString(),
      data: {
        products: productStore.products,
        customers: customerStore.customers,
        sales: salesStore.sales,
        purchases: purchaseStore.purchases,
      },
    }

    localStorage.setItem("backup-data", JSON.stringify(backup))
  },
  restoreBackup: (backupData: BackupData) => {
    try {
      useProductStore.setState({ products: backupData.data.products })
      useCustomerStore.setState({ customers: backupData.data.customers })
      useSalesStore.setState({ sales: backupData.data.sales })
      usePurchaseStore.setState({ purchases: backupData.data.purchases })
    } catch (error) {
      console.error("Failed to restore backup:", error)
    }
  },
  exportBackup: () => {
    const backupData = localStorage.getItem("backup-data")
    if (!backupData) {
      alert("No backup found. Please create one first.")
      return
    }

    const element = document.createElement("a")
    element.setAttribute("href", `data:text/plain;charset=utf-8,${encodeURIComponent(backupData)}`)
    element.setAttribute("download", `pos-backup-${new Date().toISOString().split("T")[0]}.json`)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  },
  importBackup: async (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string
          const backupData = JSON.parse(content) as BackupData
          useBackupStore.getState().restoreBackup(backupData)
          resolve()
        } catch (error) {
          reject(error)
        }
      }
      reader.onerror = () => reject(new Error("Failed to read file"))
      reader.readAsText(file)
    })
  },
}))

export interface BackupData {
  version: string
  timestamp: string
  data: {
    products: Product[]
    customers: Customer[]
    sales: Sale[]
    purchases: Purchase[]
  }
}
