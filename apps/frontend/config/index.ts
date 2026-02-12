/**
 * Central export for all configurations
 */

// Navigation
export {
  navigation,
  getNavigationByRole,
  getNavigationItem,
  isRouteAccessible,
  type NavigationItem,
} from './navigation'

// App Configuration
export {
  API_CONFIG,
  AUTH_CONFIG,
  PAGINATION_CONFIG,
  UPLOAD_CONFIG,
  UI_CONFIG,
  FEATURES,
  DEV_CONFIG,
  isFeatureEnabled,
  getEnvironment,
  isDevelopment,
  isProduction,
} from './app'

// Routes
export {
  PUBLIC_ROUTES,
  PROTECTED_ROUTES,
  API_ROUTES,
  EXTERNAL_ROUTES,
  ROUTE_GROUPS,
  isPublicRoute,
  requiresAuth,
  getRedirectAfterLogin,
} from './routes'
