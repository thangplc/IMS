/**
 * Navigation Configuration
 * Centralized navigation structure for sidebar and routing
 */

import {
  Squares2X2Icon,
  CubeIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  ClockIcon,
  ChartBarIcon,
  UsersIcon,
  QrCodeIcon,
} from '@heroicons/react/24/outline'
import {
  Squares2X2Icon as Squares2X2IconSolid,
  CubeIcon as CubeIconSolid,
  ArrowDownTrayIcon as ArrowDownTrayIconSolid,
  ArrowUpTrayIcon as ArrowUpTrayIconSolid,
  ClockIcon as ClockIconSolid,
  ChartBarIcon as ChartBarIconSolid,
  UsersIcon as UsersIconSolid,
  QrCodeIcon as QrCodeIconSolid,
} from '@heroicons/react/24/solid'
import { Role } from '@/types'
import { LABELS } from '@/constants/labels'

export interface NavigationItem {
  name: string
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  iconSolid: React.ComponentType<React.SVGProps<SVGSVGElement>>
  roles: Role[]
}

/**
 * Main navigation items
 * Used in sidebar, mobile menu, breadcrumbs, etc.
 */
export const navigation: readonly NavigationItem[] = [
  {
    name: LABELS.NAV.DASHBOARD,
    href: '/dashboard',
    icon: Squares2X2Icon,
    iconSolid: Squares2X2IconSolid,
    roles: [Role.ADMIN, Role.MANAGER, Role.STAFF],
  },
  {
    name: LABELS.NAV.PRODUCTS,
    href: '/products',
    icon: CubeIcon,
    iconSolid: CubeIconSolid,
    roles: [Role.ADMIN, Role.MANAGER, Role.STAFF],
  },
  {
    name: LABELS.NAV.STOCK_IN,
    href: '/inventory/stock-in',
    icon: ArrowDownTrayIcon,
    iconSolid: ArrowDownTrayIconSolid,
    roles: [Role.ADMIN, Role.MANAGER, Role.STAFF],
  },
  {
    name: LABELS.NAV.STOCK_OUT,
    href: '/inventory/stock-out',
    icon: ArrowUpTrayIcon,
    iconSolid: ArrowUpTrayIconSolid,
    roles: [Role.ADMIN, Role.MANAGER, Role.STAFF],
  },
  {
    name: LABELS.NAV.HISTORY,
    href: '/inventory/history',
    icon: ClockIcon,
    iconSolid: ClockIconSolid,
    roles: [Role.ADMIN, Role.MANAGER, Role.STAFF],
  },
  {
    name: LABELS.NAV.REPORTS,
    href: '/reports',
    icon: ChartBarIcon,
    iconSolid: ChartBarIconSolid,
    roles: [Role.ADMIN, Role.MANAGER],
  },
  {
    name: LABELS.NAV.USERS,
    href: '/users',
    icon: UsersIcon,
    iconSolid: UsersIconSolid,
    roles: [Role.ADMIN],
  },
  {
    name: LABELS.NAV.SCAN_QR,
    href: '/scan',
    icon: QrCodeIcon,
    iconSolid: QrCodeIconSolid,
    roles: [Role.ADMIN, Role.MANAGER, Role.STAFF],
  },
] as const

/**
 * Helper: Filter navigation by user role
 */
export function getNavigationByRole(userRole: Role): NavigationItem[] {
  return navigation.filter((item) => item.roles.includes(userRole))
}

/**
 * Helper: Get navigation item by href
 */
export function getNavigationItem(href: string): NavigationItem | undefined {
  return navigation.find((item) => item.href === href)
}

/**
 * Helper: Check if route is accessible by role
 */
export function isRouteAccessible(href: string, userRole: Role): boolean {
  const item = getNavigationItem(href)
  return item ? item.roles.includes(userRole) : false
}
