import { useMutation, useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { useAuthStore } from '@/store/auth-store'
import { User } from '@/types'

interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  user: User
  // No token in response - it's set as HTTP-only cookie by backend
}

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth)

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      // Cookie automatically set by backend in Set-Cookie header
      const response = await api.post<LoginResponse>('/auth/login', data)
      return response.data
    },
    onSuccess: (data) => {
      // Store only user data (token is in cookie)
      setAuth(data.user)
    },
  })
}

export function useLogout() {
  const logout = useAuthStore((state) => state.logout)

  return useMutation({
    mutationFn: async () => {
      // Call logout endpoint to clear cookie
      await api.post('/auth/logout')
    },
    onSuccess: () => {
      logout()
      window.location.href = '/login'
    },
  })
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await api.get('/auth/me')
      return response.data
    },
  })
}
