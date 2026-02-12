'use client'

import { BellIcon } from '@heroicons/react/24/outline'
import { UserMenu } from './user-menu'
import { TITLES } from '@/constants/titles'

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-gray-800">{TITLES.PAGE.DASHBOARD}</h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative rounded-lg p-2 hover:bg-gray-100 transition-colors">
          <BellIcon className="h-6 w-6 text-gray-600" />
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
        </button>

        {/* User Menu */}
        <UserMenu />
      </div>
    </header>
  )
}
