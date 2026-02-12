'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/auth-store'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Loading } from '@/components/ui/loading'
import { MESSAGES } from '@/constants/messages'
import api from '@/lib/api'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = useAuthStore((state) => state.user)
  const setAuth = useAuthStore((state) => state.setAuth)
  const [isLoading, setIsLoading] = useState(true)

  // Check session on mount (cookie-based auth)
  useEffect(() => {
    async function checkSession() {
      try {
        // Try to get user info (cookie sent automatically)
        const { data } = await api.get('/auth/me')
        setAuth(data)
      } catch (error) {
        // No valid session - redirect to login
        window.location.href = '/login'
      } finally {
        setIsLoading(false)
      }
    }

    // If no user in state, check session
    if (!user) {
      checkSession()
    } else {
      setIsLoading(false)
    }
  }, [])

  // Show loading while checking session
  if (isLoading) {
    return <Loading fullscreen text={MESSAGES.LOADING.DEFAULT} size="lg" />
  }

  // If no user after check, return null (useEffect will redirect)
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
