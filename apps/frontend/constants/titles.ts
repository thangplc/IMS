/**
 * Page Titles and Headings Constants
 * Centralized for future i18n support
 */

export const TITLES = {
  // App
  APP: {
    NAME: 'IMS',
    FULL_NAME: 'Inventory Management System',
    TAGLINE: 'Quản lý kho hàng hiệu quả',
  },

  // Pages
  PAGE: {
    LOGIN: 'Đăng nhập vào hệ thống',
    DASHBOARD: 'Dashboard',
    PRODUCTS: 'Quản lý sản phẩm',
    PRODUCTS_LIST: 'Danh sách sản phẩm',
    PRODUCT_DETAIL: 'Chi tiết sản phẩm',
    STOCK_IN: 'Nhập kho',
    STOCK_OUT: 'Xuất kho',
    INVENTORY_HISTORY: 'Lịch sử nhập xuất',
    REPORTS: 'Báo cáo',
    USERS: 'Quản lý người dùng',
    SCAN_QR: 'Quét mã QR',
  },

  // Sections
  SECTION: {
    OVERVIEW: 'Tổng quan',
    STATISTICS: 'Thống kê',
    RECENT_TRANSACTIONS: 'Giao dịch gần đây',
    LOW_STOCK_ALERT: 'Cảnh báo tồn kho thấp',
    TOP_PRODUCTS: 'Sản phẩm bán chạy',
    DEMO_CREDENTIALS: 'Tài khoản demo',
    USER_INFO: 'Thông tin người dùng',
    FEATURES: 'Tính năng',
    LOGIN_FORM: 'Đăng nhập',
  },

  // Features
  FEATURE: {
    SECURITY: 'Bảo mật',
    REPORTS: 'Báo cáo',
    TRACKING: 'Theo dõi',
    QR_CODE: 'QR Code',
    EXPORT_IMPORT: 'Xuất/Nhập dữ liệu',
    DASHBOARD: 'Bảng điều khiển',
  },
} as const

/**
 * Type-safe title getter
 */
export function getTitle(
  category: keyof typeof TITLES,
  key: string
): string {
  const titles = TITLES[category] as Record<string, string>
  return titles[key] || key
}
