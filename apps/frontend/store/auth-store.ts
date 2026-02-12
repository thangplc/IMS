import { create } from 'zustand'
import { User } from '@/types'

interface AuthState {
  user: User | null
  setAuth: (user: User) => void
  logout: () => void
}

// Store only user in memory (no token, no persistence)
// Token is managed by HTTP-only cookie
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setAuth: (user) => set({ user }),
  logout: () => set({ user: null }),
}))
