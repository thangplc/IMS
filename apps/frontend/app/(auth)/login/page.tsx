'use client'

import { LoginForm } from '@/components/forms/login-form'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Logo & Title */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">IMS</h1>
          <h2 className="mt-6 text-2xl font-semibold text-gray-900">
            Đăng nhập vào hệ thống
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Quản lý kho hàng hiệu quả
          </p>
        </div>

        {/* Login Form */}
        <LoginForm />

        {/* Demo Credentials */}
        <div className="rounded-md bg-blue-50 p-4">
          <h3 className="text-sm font-medium text-blue-800">
            Demo Credentials:
          </h3>
          <ul className="mt-2 space-y-1 text-xs text-blue-700">
            <li>
              <strong>Admin:</strong> admin@ims.com / Admin@123
            </li>
            <li>
              <strong>Manager:</strong> manager@ims.com / Manager@123
            </li>
            <li>
              <strong>Staff:</strong> staff@ims.com / Staff@123
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
