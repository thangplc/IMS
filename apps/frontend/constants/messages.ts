/**
 * Application Messages Constants
 * Centralized for future i18n support
 */

const MESSAGES = {
  // Auth messages
  AUTH: {
    LOGIN_SUCCESS: 'Đăng nhập thành công!',
    LOGIN_FAILED: 'Đăng nhập thất bại',
    LOGOUT_SUCCESS: 'Đăng xuất thành công',
    REDIRECTING: 'Đang chuyển hướng...',
    REDIRECTING_TO_DASHBOARD: 'Đang chuyển hướng đến dashboard',
    AUTHENTICATING: 'Đang xác thực...',
    AUTHENTICATING_CREDENTIALS: 'Đang xác thực thông tin đăng nhập...',
    SESSION_EXPIRED: 'Phiên đăng nhập đã hết hạn',
    UNAUTHORIZED: 'Bạn không có quyền truy cập',
  },

  // Validation messages
  VALIDATION: {
    EMAIL_REQUIRED: 'Email là bắt buộc',
    EMAIL_INVALID: 'Email không hợp lệ',
    PASSWORD_REQUIRED: 'Mật khẩu là bắt buộc',
    PASSWORD_MIN_LENGTH: 'Mật khẩu phải có ít nhất 8 ký tự',
    FIELD_REQUIRED: 'Trường này là bắt buộc',
    INVALID_FORMAT: 'Định dạng không hợp lệ',
  },

  // Error messages
  ERROR: {
    NETWORK_ERROR: 'Không có kết nối internet. Vui lòng kiểm tra mạng của bạn.',
    NETWORK_TIMEOUT: 'Kết nối quá chậm. Vui lòng thử lại.',
    SERVER_ERROR: 'Máy chủ đang gặp sự cố. Vui lòng thử lại sau.',
    UNKNOWN_ERROR: 'Đã xảy ra lỗi không xác định. Vui lòng thử lại.',
    INVALID_CREDENTIALS: 'Email hoặc mật khẩu không chính xác.',
    ACCOUNT_LOCKED: 'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.',
    RATE_LIMIT: 'Bạn đã thử đăng nhập quá nhiều lần. Vui lòng đợi 5 phút.',
    NOT_FOUND: 'Không tìm thấy tài nguyên yêu cầu.',
  },

  // Loading messages
  LOADING: {
    DEFAULT: 'Đang tải...',
    LOADING_DATA: 'Đang tải dữ liệu...',
    PROCESSING: 'Đang xử lý...',
    SAVING: 'Đang lưu...',
    DELETING: 'Đang xóa...',
    UPLOADING: 'Đang tải lên...',
  },

  // Success messages
  SUCCESS: {
    SAVED: 'Đã lưu thành công',
    DELETED: 'Đã xóa thành công',
    UPDATED: 'Đã cập nhật thành công',
    CREATED: 'Đã tạo thành công',
  },

  // Common UI messages
  COMMON: {
    RETRY: 'Thử lại',
    RETRY_COUNT: 'Lần thử',
    CANCEL: 'Hủy',
    CONFIRM: 'Xác nhận',
    SAVE: 'Lưu',
    DELETE: 'Xóa',
    EDIT: 'Sửa',
    VIEW: 'Xem',
    SEARCH: 'Tìm kiếm',
    FILTER: 'Lọc',
    EXPORT: 'Xuất',
    IMPORT: 'Nhập',
  },

  // Error tips
  ERROR_TIPS: {
    CHECK_NETWORK: 'Kiểm tra: WiFi/4G đang bật, không bật chế độ máy bay.',
    RATE_LIMIT_INFO: 'Để bảo vệ hệ thống, chúng tôi tạm thời giới hạn số lần đăng nhập.',
    CONTACT_ADMIN: 'Vui lòng liên hệ quản trị viên nếu vấn đề vẫn tiếp diễn.',
  },
} as const

/**
 * Type-safe message getter
 */
function getMessage(
  category: keyof typeof MESSAGES,
  key: string
): string {
  const messages = MESSAGES[category] as Record<string, string>
  return messages[key] || ''
}

export { MESSAGES, getMessage }