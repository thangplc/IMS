'use client'

import { useAuthStore } from '@/store/auth-store'

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">
        Chào mừng, {user?.name}!
      </h1>
      <p className="mt-2 text-gray-600">
        Bạn đang đăng nhập với quyền: <strong>{user?.role}</strong>
      </p>

      {/* Placeholder for dashboard content */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Tổng sản phẩm', value: '1,234', color: 'bg-blue-500' },
          { label: 'Giá trị kho', value: '$125,000', color: 'bg-green-500' },
          { label: 'Cảnh báo', value: '15', color: 'bg-yellow-500' },
          { label: 'Giao dịch hôm nay', value: '25', color: 'bg-purple-500' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold">{stat.value}</p>
              </div>
              <div className={`h-12 w-12 rounded-lg ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-lg border bg-white p-6">
        <h2 className="text-lg font-semibold">Hoạt động gần đây</h2>
        <p className="mt-4 text-gray-500">
          Dashboard đang được phát triển. Các biểu đồ và báo cáo sẽ được thêm vào sau.
        </p>
      </div>
    </div>
  )
}
