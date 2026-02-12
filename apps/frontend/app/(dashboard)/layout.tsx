'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth-store'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Loading } from '@/components/ui/loading'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = useAuthStore((state) => state.user)
  const hasHydrated = useAuthStore((state) => state._hasHydrated)

  console.log('📊 Dashboard layout state:', { hasHydrated, user: user?.name })

  // Protect routes - redirect to login if not authenticated
  useEffect(() => {
    console.log('🔍 Dashboard useEffect:', { hasHydrated, hasUser: !!user })
    
    // Only check after Zustand has hydrated from localStorage
    if (hasHydrated && !user) {
      console.log('❌ No user found after hydration, redirecting to login...')
      console.log('📍 localStorage:', localStorage.getItem('auth-storage'))
      window.location.href = '/login'
    } else if (hasHydrated && user) {
      console.log('✅ User authenticated:', user)
    }
  }, [hasHydrated, user])

  // Show loading while waiting for hydration
  if (!hasHydrated) {
    return <Loading fullscreen text="Đang tải..." size="lg" />
  }

  // After hydration, if no user, return null (useEffect will redirect)
  if (!user) {
    return null
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
