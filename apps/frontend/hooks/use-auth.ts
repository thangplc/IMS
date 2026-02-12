import { useMutation, useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { useAuthStore } from '@/store/auth-store'
import { LoginRequest, LoginResponse } from '@/types'

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth)

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      console.log('🔐 Calling login API...')
      const response = await api.post<LoginResponse>('/auth/login', data)
      console.log('📦 Login response:', response.data)
      return response.data
    },
    onSuccess: (data) => {
      console.log('💾 Saving to store:', { user: data.user, token: data.accessToken })
      setAuth(data.user, data.accessToken)
      
      // Verify save
      setTimeout(() => {
        const stored = localStorage.getItem('auth-storage')
        console.log('✅ Verified localStorage:', stored)
      }, 100)
    },
  })
}

export function useLogout() {
  const logout = useAuthStore((state) => state.logout)

  return () => {
    logout()
    window.location.href = '/login'
  }
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
