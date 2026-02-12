'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
import { useAuthStore } from '@/store/auth-store'
import { cn } from '@/lib/utils'
import { Role } from '@/types'

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Squares2X2Icon,
    iconSolid: Squares2X2IconSolid,
    roles: [Role.ADMIN, Role.MANAGER, Role.STAFF],
  },
  {
    name: 'Sản phẩm',
    href: '/products',
    icon: CubeIcon,
    iconSolid: CubeIconSolid,
    roles: [Role.ADMIN, Role.MANAGER, Role.STAFF],
  },
  {
    name: 'Nhập kho',
    href: '/inventory/stock-in',
    icon: ArrowDownTrayIcon,
    iconSolid: ArrowDownTrayIconSolid,
    roles: [Role.ADMIN, Role.MANAGER, Role.STAFF],
  },
  {
    name: 'Xuất kho',
    href: '/inventory/stock-out',
    icon: ArrowUpTrayIcon,
    iconSolid: ArrowUpTrayIconSolid,
    roles: [Role.ADMIN, Role.MANAGER, Role.STAFF],
  },
  {
    name: 'Lịch sử',
    href: '/inventory/history',
    icon: ClockIcon,
    iconSolid: ClockIconSolid,
    roles: [Role.ADMIN, Role.MANAGER, Role.STAFF],
  },
  {
    name: 'Báo cáo',
    href: '/reports',
    icon: ChartBarIcon,
    iconSolid: ChartBarIconSolid,
    roles: [Role.ADMIN, Role.MANAGER],
  },
  {
    name: 'Quản lý User',
    href: '/users',
    icon: UsersIcon,
    iconSolid: UsersIconSolid,
    roles: [Role.ADMIN],
  },
  {
    name: 'Scan QR',
    href: '/scan',
    icon: QrCodeIcon,
    iconSolid: QrCodeIconSolid,
    roles: [Role.ADMIN, Role.MANAGER, Role.STAFF],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const user = useAuthStore((state) => state.user)

  const filteredNavigation = navigation.filter((item) =>
    user?.role ? item.roles.includes(user.role) : false
  )

  return (
    <div className="flex w-64 flex-col border-r bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg">
            <CubeIconSolid className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">IMS</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {filteredNavigation.map((item) => {
          const isActive = pathname === item.href
          const Icon = isActive ? item.iconSolid : item.icon

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* User Info */}
      {user && (
        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
