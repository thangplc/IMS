'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/auth-store'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Loading } from '@/components/ui/loading'
import { MESSAGES } from '@/constants/messages'
import { apiClient } from '@/lib/api-client'
import { User } from '@/types'

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
      // Try to get user info (cookie sent automatically)
      const { data, error } = await apiClient.get<User>('/auth/me')
      
      if (error || !data) {
        // No valid session - redirect to login
        window.location.href = '/login'
      } else {
        setAuth(data)
      }
      
      setIsLoading(false)
    }

    // If no user in state, check session
    if (!user) {
      checkSession()
    } else {
      setIsLoading(false)
    }
  }, [user, setAuth])

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
