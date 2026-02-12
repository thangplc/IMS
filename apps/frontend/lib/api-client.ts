/**
 * Enhanced API Client with type safety and better error handling
 * 
 * Features:
 * - Type-safe responses
 * - Automatic error parsing
 * - Consistent error handling
 * - Better developer experience
 */

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { API_CONFIG } from '@/config'
import { parseError, type AppError } from './error-handler'

/**
 * API Response wrapper
 */
export interface ApiResponse<T = unknown> {
  data: T | null
  error: AppError | null
  response?: AxiosResponse<T>
}

/**
 * API Client class with enhanced methods
 */
class ApiClient {
  private instance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  constructor() {
    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Response interceptor for global error handling
    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        // Auto logout on 401
        if (error.response?.status === 401) {
          const isLoginPage = window.location.pathname === '/login'
          
          if (!isLoginPage) {
            const { useAuthStore } = require('@/store/auth-store')
            useAuthStore.getState().logout()
            window.location.href = '/login'
          }
        }
        
        return Promise.reject(error)
      }
    )
  }

  /**
   * GET request with type safety
   */
  async get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.get<T>(url, config)
      return {
        data: response.data,
        error: null,
        response,
      }
    } catch (error) {
      return {
        data: null,
        error: parseError(error),
      }
    }
  }

  /**
   * POST request with type safety
   */
  async post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.post<T>(url, data, config)
      return {
        data: response.data,
        error: null,
        response,
      }
    } catch (error) {
      return {
        data: null,
        error: parseError(error),
      }
    }
  }

  /**
   * PUT request with type safety
   */
  async put<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.put<T>(url, data, config)
      return {
        data: response.data,
        error: null,
        response,
      }
    } catch (error) {
      return {
        data: null,
        error: parseError(error),
      }
    }
  }

  /**
   * PATCH request with type safety
   */
  async patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.patch<T>(url, data, config)
      return {
        data: response.data,
        error: null,
        response,
      }
    } catch (error) {
      return {
        data: null,
        error: parseError(error),
      }
    }
  }

  /**
   * DELETE request with type safety
   */
  async delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.delete<T>(url, config)
      return {
        data: response.data,
        error: null,
        response,
      }
    } catch (error) {
      return {
        data: null,
        error: parseError(error),
      }
    }
  }

  /**
   * Direct access to axios instance for special cases
   */
  get axios() {
    return this.instance
  }
}

// Export singleton instance
export const apiClient = new ApiClient()

// Default export
export default apiClient
