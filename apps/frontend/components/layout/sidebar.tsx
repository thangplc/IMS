'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  ArrowDownToLine,
  ArrowUpFromLine,
  History,
  BarChart3,
  Users,
  QrCode,
} from 'lucide-react'
import { useAuthStore } from '@/store/auth-store'
import { cn } from '@/lib/utils'
import { Role } from '@/types'

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: [Role.ADMIN, Role.MANAGER, Role.STAFF],
  },
  {
    name: 'Sản phẩm',
    href: '/products',
    icon: Package,
    roles: [Role.ADMIN, Role.MANAGER, Role.STAFF],
  },
  {
    name: 'Nhập kho',
    href: '/inventory/stock-in',
    icon: ArrowDownToLine,
    roles: [Role.ADMIN, Role.MANAGER, Role.STAFF],
  },
  {
    name: 'Xuất kho',
    href: '/inventory/stock-out',
    icon: ArrowUpFromLine,
    roles: [Role.ADMIN, Role.MANAGER, Role.STAFF],
  },
  {
    name: 'Lịch sử',
    href: '/inventory/history',
    icon: History,
    roles: [Role.ADMIN, Role.MANAGER, Role.STAFF],
  },
  {
    name: 'Báo cáo',
    href: '/reports',
    icon: BarChart3,
    roles: [Role.ADMIN, Role.MANAGER],
  },
  {
    name: 'Quản lý User',
    href: '/users',
    icon: Users,
    roles: [Role.ADMIN],
  },
  {
    name: 'Scan QR',
    href: '/scan',
    icon: QrCode,
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
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
            <Package className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold">IMS</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {filteredNavigation.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
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
