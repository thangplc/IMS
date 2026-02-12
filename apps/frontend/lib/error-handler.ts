import { AxiosError } from 'axios'

/**
 * API error response structure
 */
interface ApiErrorResponse {
  message?: string
  error?: string
  statusCode?: number
  [key: string]: unknown
}

/**
 * Error types for consistent error handling across the app
 */
export type ErrorType = 
  | 'network'      // Network connectivity issues
  | 'auth'         // Authentication/Authorization errors
  | 'validation'   // Input validation errors
  | 'server'       // Server-side errors
  | 'rate_limit'   // Rate limiting errors
  | 'not_found'    // Resource not found
  | 'conflict'     // Resource conflict (409)
  | 'unknown'      // Unknown errors

/**
 * Structured error state for UI
 */
export interface AppError {
  type: ErrorType
  message: string
  statusCode?: number
  canRetry: boolean
  details?: string
}

/**
 * Error messages in Vietnamese
 */
const ERROR_MESSAGES: Record<string, string> = {
  // Network errors
  NETWORK_ERROR: 'Không có kết nối internet. Vui lòng kiểm tra mạng của bạn.',
  NETWORK_TIMEOUT: 'Kết nối quá chậm. Vui lòng thử lại.',
  
  // Auth errors (401)
  UNAUTHORIZED: 'Email hoặc mật khẩu không chính xác.',
  INVALID_CREDENTIALS: 'Thông tin đăng nhập không hợp lệ.',
  SESSION_EXPIRED: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
  
  // Forbidden (403)
  FORBIDDEN: 'Bạn không có quyền truy cập tài nguyên này.',
  ACCOUNT_LOCKED: 'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.',
  ACCOUNT_DISABLED: 'Tài khoản của bạn đã bị vô hiệu hóa.',
  
  // Not found (404)
  NOT_FOUND: 'Không tìm thấy tài nguyên yêu cầu.',
  RESOURCE_NOT_FOUND: 'Dữ liệu không tồn tại hoặc đã bị xóa.',
  
  // Conflict (409)
  CONFLICT: 'Dữ liệu đã tồn tại. Vui lòng kiểm tra lại.',
  DUPLICATE_ENTRY: 'Thông tin này đã được sử dụng.',
  
  // Validation (400)
  BAD_REQUEST: 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.',
  VALIDATION_ERROR: 'Vui lòng kiểm tra các trường đã nhập.',
  
  // Rate limit (429)
  TOO_MANY_REQUESTS: 'Bạn đã thực hiện quá nhiều yêu cầu. Vui lòng đợi ít phút.',
  RATE_LIMIT_EXCEEDED: 'Bạn đã thử đăng nhập quá nhiều lần. Vui lòng đợi 5 phút.',
  
  // Server errors (500+)
  INTERNAL_SERVER_ERROR: 'Máy chủ đang gặp sự cố. Vui lòng thử lại sau.',
  SERVICE_UNAVAILABLE: 'Dịch vụ tạm thời không khả dụng. Vui lòng thử lại sau.',
  BAD_GATEWAY: 'Không thể kết nối đến máy chủ. Vui lòng thử lại.',
  
  // Unknown
  UNKNOWN_ERROR: 'Đã xảy ra lỗi không xác định. Vui lòng thử lại.',
}

/**
 * Parse Axios error and return structured AppError
 */
export function parseError(error: unknown): AppError {
  // Type guard for AxiosError
  if (!error || typeof error !== 'object') {
    return {
      type: 'unknown',
      message: ERROR_MESSAGES.UNKNOWN_ERROR,
      canRetry: true,
    }
  }

  const err = error as Record<string, unknown>
  // Network error (no internet, timeout)
  if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
    return {
      type: 'network',
      message: ERROR_MESSAGES.NETWORK_ERROR,
      canRetry: true,
    }
  }

  // Request timeout
  if (err.code === 'ECONNABORTED') {
    return {
      type: 'network',
      message: ERROR_MESSAGES.NETWORK_TIMEOUT,
      canRetry: true,
    }
  }

  // Axios error with response
  if ('response' in err && err.response && typeof err.response === 'object') {
    const response = err.response as { status: number; data?: ApiErrorResponse }
    const status = response.status
    const data = response.data

    return {
      type: getErrorType(status),
      message: getMessageByStatus(status, data),
      statusCode: status,
      canRetry: canRetryError(status),
      details: data?.message || data?.error,
    }
  }

  // Unknown error
  return {
    type: 'unknown',
    message: ERROR_MESSAGES.UNKNOWN_ERROR,
    canRetry: true,
  }
}

/**
 * Get error type based on HTTP status code
 */
function getErrorType(status: number): ErrorType {
  if (status === 401) return 'auth'
  if (status === 403) return 'auth'
  if (status === 404) return 'not_found'
  if (status === 409) return 'conflict'
  if (status === 429) return 'rate_limit'
  if (status === 400 || status === 422) return 'validation'
  if (status >= 500) return 'server'
  return 'unknown'
}

/**
 * Get user-friendly error message based on status code (internal helper)
 */
function getMessageByStatus(status: number, data?: ApiErrorResponse): string {
  switch (status) {
    case 400:
      return ERROR_MESSAGES.BAD_REQUEST
    case 401:
      return ERROR_MESSAGES.UNAUTHORIZED
    case 403:
      // Check if account is locked/disabled
      if (data?.message?.toLowerCase().includes('locked')) {
        return ERROR_MESSAGES.ACCOUNT_LOCKED
      }
      if (data?.message?.toLowerCase().includes('disabled')) {
        return ERROR_MESSAGES.ACCOUNT_DISABLED
      }
      return ERROR_MESSAGES.FORBIDDEN
    case 404:
      return ERROR_MESSAGES.NOT_FOUND
    case 409:
      return ERROR_MESSAGES.CONFLICT
    case 422:
      return ERROR_MESSAGES.VALIDATION_ERROR
    case 429:
      return ERROR_MESSAGES.RATE_LIMIT_EXCEEDED
    case 500:
      return ERROR_MESSAGES.INTERNAL_SERVER_ERROR
    case 502:
      return ERROR_MESSAGES.BAD_GATEWAY
    case 503:
      return ERROR_MESSAGES.SERVICE_UNAVAILABLE
    default:
      return ERROR_MESSAGES.UNKNOWN_ERROR
  }
}

/**
 * Determine if error is retryable
 */
function canRetryError(status: number): boolean {
  // Network errors, server errors, and rate limits can be retried
  if (status >= 500) return true
  if (status === 429) return false // Rate limit - don't retry immediately
  if (status === 408) return true  // Request timeout
  if (status === 503) return true  // Service unavailable
  
  // Client errors (4xx) generally shouldn't be retried
  return false
}

/**
 * Get error message by key
 */
export function getErrorMessage(key: keyof typeof ERROR_MESSAGES): string {
  return ERROR_MESSAGES[key] || ERROR_MESSAGES.UNKNOWN_ERROR
}

/**
 * Check if error is authentication error
 */
export function isAuthError(error: AppError): boolean {
  return error.type === 'auth' || error.statusCode === 401
}

/**
 * Check if error is network error
 */
export function isNetworkError(error: AppError): boolean {
  return error.type === 'network'
}

/**
 * Check if error is server error
 */
export function isServerError(error: AppError): boolean {
  return error.type === 'server' || (error.statusCode !== undefined && error.statusCode >= 500)
}

/**
 * Format error for display with icon and color
 */
export function getErrorDisplayInfo(error: AppError) {
  switch (error.type) {
    case 'network':
      return {
        color: 'orange',
        bgClass: 'bg-orange-50 border-orange-200 text-orange-800',
        icon: 'wifi',
      }
    case 'auth':
      return {
        color: 'red',
        bgClass: 'bg-red-50 border-red-200 text-red-800',
        icon: 'shield',
      }
    case 'validation':
      return {
        color: 'yellow',
        bgClass: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        icon: 'exclamation',
      }
    case 'server':
      return {
        color: 'purple',
        bgClass: 'bg-purple-50 border-purple-200 text-purple-800',
        icon: 'server',
      }
    case 'rate_limit':
      return {
        color: 'amber',
        bgClass: 'bg-amber-50 border-amber-200 text-amber-800',
        icon: 'clock',
      }
    case 'not_found':
      return {
        color: 'gray',
        bgClass: 'bg-gray-50 border-gray-200 text-gray-800',
        icon: 'question',
      }
    default:
      return {
        color: 'gray',
        bgClass: 'bg-gray-50 border-gray-200 text-gray-800',
        icon: 'exclamation',
      }
  }
}

/**
 * Log error to console (can be extended to send to logging service)
 */
export function logError(error: AppError, context?: string) {
  console.error(`[${context || 'Error'}]`, {
    type: error.type,
    message: error.message,
    statusCode: error.statusCode,
    details: error.details,
    canRetry: error.canRetry,
    timestamp: new Date().toISOString(),
  })
}
