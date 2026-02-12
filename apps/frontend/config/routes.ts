/**
 * Route Configuration
 * Centralized route definitions for type-safe routing
 */

/**
 * Public routes (no authentication required)
 */
export const PUBLIC_ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
} as const

/**
 * Protected routes (authentication required)
 */
export const PROTECTED_ROUTES = {
  DASHBOARD: '/dashboard',
  
  // Products
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (id: string | number) => `/products/${id}`,
  PRODUCT_CREATE: '/products/create',
  PRODUCT_EDIT: (id: string | number) => `/products/${id}/edit`,
  
  // Inventory
  STOCK_IN: '/inventory/stock-in',
  STOCK_OUT: '/inventory/stock-out',
  INVENTORY_HISTORY: '/inventory/history',
  
  // Reports
  REPORTS: '/reports',
  REPORT_DETAIL: (id: string | number) => `/reports/${id}`,
  
  // Users (Admin only)
  USERS: '/users',
  USER_DETAIL: (id: string | number) => `/users/${id}`,
  USER_CREATE: '/users/create',
  USER_EDIT: (id: string | number) => `/users/${id}/edit`,
  
  // QR Scan
  SCAN: '/scan',
  
  // Settings
  SETTINGS: '/settings',
  PROFILE: '/settings/profile',
} as const

/**
 * API routes
 */
export const API_ROUTES = {
  // Auth
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REGISTER: '/auth/register',
  ME: '/auth/me',
  
  // Products
  PRODUCTS: '/api/products',
  PRODUCT_DETAIL: (id: string | number) => `/api/products/${id}`,
  
  // Inventory
  STOCK_IN: '/api/inventory/stock-in',
  STOCK_OUT: '/api/inventory/stock-out',
  INVENTORY_HISTORY: '/api/inventory/history',
  
  // Reports
  REPORTS: '/api/reports',
  REPORT_DETAIL: (id: string | number) => `/api/reports/${id}`,
  
  // Users
  USERS: '/api/users',
  USER_DETAIL: (id: string | number) => `/api/users/${id}`,
  
  // Files
  UPLOAD: '/api/files/upload',
  DOWNLOAD: (id: string | number) => `/api/files/${id}/download`,
} as const

/**
 * External routes
 */
export const EXTERNAL_ROUTES = {
  DOCUMENTATION: 'https://docs.ims.com',
  SUPPORT: 'https://support.ims.com',
  GITHUB: 'https://github.com/ims/ims',
} as const

/**
 * Route groups for middleware
 */
export const ROUTE_GROUPS = {
  PUBLIC: Object.values(PUBLIC_ROUTES),
  AUTH_REQUIRED: [
    PROTECTED_ROUTES.DASHBOARD,
    PROTECTED_ROUTES.PRODUCTS,
    PROTECTED_ROUTES.STOCK_IN,
    PROTECTED_ROUTES.STOCK_OUT,
    PROTECTED_ROUTES.INVENTORY_HISTORY,
    PROTECTED_ROUTES.REPORTS,
    PROTECTED_ROUTES.SCAN,
    PROTECTED_ROUTES.SETTINGS,
    PROTECTED_ROUTES.PROFILE,
  ],
  ADMIN_ONLY: [
    PROTECTED_ROUTES.USERS,
  ],
} as const

/**
 * Helper: Check if route is public
 */
export function isPublicRoute(pathname: string): boolean {
  return Object.values(PUBLIC_ROUTES).some(route => pathname.startsWith(route))
}

/**
 * Helper: Check if route requires authentication
 */
export function requiresAuth(pathname: string): boolean {
  return !isPublicRoute(pathname)
}

/**
 * Helper: Get redirect after login
 */
export function getRedirectAfterLogin(from?: string): string {
  if (from && !isPublicRoute(from)) {
    return from
  }
  return PROTECTED_ROUTES.DASHBOARD
}
