'use client'

import { useState } from 'react'
import { LogOut, User, Settings } from 'lucide-react'
import { useAuthStore } from '@/store/auth-store'
import { useLogout } from '@/hooks/use-auth'
import { cn } from '@/lib/utils'

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const user = useAuthStore((state) => state.user)
  const logout = useLogout()

  const handleLogout = () => {
    logout()
  }

  if (!user) return null

  return (
    <div className="relative">
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full hover:bg-gray-100 p-2"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-medium">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-medium text-gray-700">
          {user.name}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute right-0 top-12 z-20 w-56 rounded-lg border bg-white shadow-lg">
            {/* User Info */}
            <div className="border-b p-4">
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="mt-1 text-xs text-gray-400">
                Role: {user.role}
              </p>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100">
                <User className="h-4 w-4" />
                Profile
              </button>
              <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100">
                <Settings className="h-4 w-4" />
                Settings
              </button>
            </div>

            {/* Logout */}
            <div className="border-t p-2">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Đăng xuất
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
