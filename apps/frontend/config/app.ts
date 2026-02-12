/**
 * Application Configuration
 * Environment-based settings and constants
 */

/**
 * API Configuration
 */
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
} as const

/**
 * Authentication Configuration
 */
export const AUTH_CONFIG = {
  TOKEN_KEY: 'auth_token',
  USER_KEY: 'auth_user',
  SESSION_TIMEOUT: 3600000, // 1 hour in ms
  REFRESH_THRESHOLD: 300000, // 5 minutes in ms
} as const

/**
 * Pagination Configuration
 */
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  MAX_PAGE_SIZE: 100,
} as const

/**
 * File Upload Configuration
 */
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: [
    'application/pdf',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/csv',
  ],
} as const

/**
 * UI Configuration
 */
export const UI_CONFIG = {
  TOAST_DURATION: 5000, // 5 seconds
  DEBOUNCE_DELAY: 300, // ms
  ANIMATION_DURATION: 200, // ms
  SKELETON_COUNT: 5, // Number of skeleton items to show
} as const

/**
 * Feature Flags
 */
export const FEATURES = {
  ENABLE_QR_SCAN: true,
  ENABLE_EXPORT: true,
  ENABLE_IMPORT: true,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_DARK_MODE: false, // Future feature
  ENABLE_ANALYTICS: false, // Future feature
} as const

/**
 * Development Configuration
 */
export const DEV_CONFIG = {
  ENABLE_DEBUG: process.env.NODE_ENV === 'development',
  ENABLE_REDUX_DEVTOOLS: process.env.NODE_ENV === 'development',
  LOG_LEVEL: process.env.NODE_ENV === 'development' ? 'debug' : 'error',
} as const

/**
 * Helper: Check if feature is enabled
 */
export function isFeatureEnabled(feature: keyof typeof FEATURES): boolean {
  return FEATURES[feature]
}

/**
 * Helper: Get environment
 */
export function getEnvironment(): 'development' | 'production' | 'test' {
  return (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development'
}

/**
 * Helper: Check if development mode
 */
export function isDevelopment(): boolean {
  return getEnvironment() === 'development'
}

/**
 * Helper: Check if production mode
 */
export function isProduction(): boolean {
  return getEnvironment() === 'production'
}
