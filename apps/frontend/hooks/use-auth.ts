import { useMutation, useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
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
    mutationFn: async (credentials: LoginRequest) => {
      // Cookie automatically set by backend in Set-Cookie header
      const { data, error } = await apiClient.post<LoginResponse>('/auth/login', credentials)
      
      if (error || !data) {
        throw error || new Error('No data received')
      }
      
      return data
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
      const { error } = await apiClient.post('/auth/logout')
      
      if (error) {
        throw error
      }
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
      const response = await apiClient.get('/auth/me')
      return response.data
    },
  })
}
