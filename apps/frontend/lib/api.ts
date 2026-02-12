import axios from 'axios'
import { API_CONFIG } from '@/config'

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  withCredentials: true, // Important: send cookies with requests
  headers: {
    'Content-Type': 'application/json',
  },
})

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // On 401, redirect to login (except if already on login page)
    if (error.response?.status === 401) {
      const isLoginPage = window.location.pathname === '/login'
      
      if (!isLoginPage) {
        // Clear user state
        const { useAuthStore } = require('@/store/auth-store')
        useAuthStore.getState().logout()
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api
