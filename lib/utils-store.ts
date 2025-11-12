import { create } from "zustand"

interface AuthStore {
  token: string | null
  organizationId: string | null
  userId: string | null
  setAuth: (token: string, organizationId: string, userId?: string) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  organizationId: null,
  userId: null,
  setAuth: (token, organizationId, userId) => set({ token, organizationId, userId }),
  clearAuth: () => set({ token: null, organizationId: null, userId: null }),
}))
