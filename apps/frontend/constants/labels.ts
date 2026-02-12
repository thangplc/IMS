/**
 * UI Labels Constants
 * Centralized for future i18n support
 */

export const LABELS = {
  // Auth
  AUTH: {
    EMAIL: 'Email',
    PASSWORD: 'Mật khẩu',
    LOGIN: 'Đăng nhập',
    LOGOUT: 'Đăng xuất',
    REGISTER: 'Đăng ký',
    PROFILE: 'Profile',
    SETTINGS: 'Settings',
  },

  // Navigation
  NAV: {
    DASHBOARD: 'Dashboard',
    PRODUCTS: 'Sản phẩm',
    STOCK_IN: 'Nhập kho',
    STOCK_OUT: 'Xuất kho',
    HISTORY: 'Lịch sử',
    REPORTS: 'Báo cáo',
    USERS: 'Quản lý User',
    SCAN_QR: 'Scan QR',
  },

  // Form fields
  FORM: {
    NAME: 'Tên',
    DESCRIPTION: 'Mô tả',
    CATEGORY: 'Danh mục',
    PRICE: 'Giá',
    QUANTITY: 'Số lượng',
    SKU: 'Mã SKU',
    BARCODE: 'Mã vạch',
    QR_CODE: 'Mã QR',
    DATE: 'Ngày',
    TIME: 'Giờ',
    STATUS: 'Trạng thái',
    NOTES: 'Ghi chú',
  },

  // Table headers
  TABLE: {
    ACTIONS: 'Thao tác',
    NO_DATA: 'Không có dữ liệu',
    LOADING: 'Đang tải...',
    PAGE: 'Trang',
    OF: 'của',
    ROWS_PER_PAGE: 'Số dòng mỗi trang',
  },

  // Buttons
  BUTTON: {
    ADD: 'Thêm',
    EDIT: 'Sửa',
    DELETE: 'Xóa',
    SAVE: 'Lưu',
    CANCEL: 'Hủy',
    CONFIRM: 'Xác nhận',
    CLOSE: 'Đóng',
    VIEW_DETAILS: 'Xem chi tiết',
    EXPORT: 'Xuất dữ liệu',
    IMPORT: 'Nhập dữ liệu',
    SEARCH: 'Tìm kiếm',
    FILTER: 'Lọc',
    RESET: 'Đặt lại',
  },

  // Roles
  ROLE: {
    ADMIN: 'Admin',
    MANAGER: 'Manager',
    STAFF: 'Staff',
  },

  // Status
  STATUS: {
    ACTIVE: 'Hoạt động',
    INACTIVE: 'Không hoạt động',
    PENDING: 'Chờ xử lý',
    COMPLETED: 'Hoàn thành',
    CANCELLED: 'Đã hủy',
  },
} as const

/**
 * Type-safe label getter
 */
export function getLabel(
  category: keyof typeof LABELS,
  key: string
): string {
  const labels = LABELS[category] as Record<string, string>
  return labels[key] || key
}
