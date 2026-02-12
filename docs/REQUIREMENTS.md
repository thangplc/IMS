# Requirements Specification - IMS

## 📋 Functional Requirements

### FR-001: Authentication & Authorization

#### FR-001.1: User Registration
- **Priority:** High
- **Description:** Hệ thống cho phép Admin tạo tài khoản cho users mới
- **Acceptance Criteria:**
  - ✅ Form có các trường: email, password, name, role
  - ✅ Email phải unique
  - ✅ Password tối thiểu 8 ký tự, có chữ hoa, số, ký tự đặc biệt
  - ✅ Chỉ Admin mới được tạo user
  - ✅ Password được hash trước khi lưu database

#### FR-001.2: User Login
- **Priority:** High
- **Description:** Users đăng nhập bằng email/password
- **Acceptance Criteria:**
  - ✅ Form login với email và password
  - ✅ Trả về JWT token khi login thành công
  - ✅ Token có thời hạn 7 ngày
  - ✅ Lưu token vào localStorage/cookie
  - ✅ Redirect đến dashboard sau khi login
  - ✅ Hiển thị lỗi rõ ràng khi sai credentials

#### FR-001.3: Role-Based Access Control (RBAC)
- **Priority:** High
- **Description:** Phân quyền theo 3 roles: Admin, Manager, Staff
- **Permission Matrix:**

| Feature | Admin | Manager | Staff |
|---------|-------|---------|-------|
| View Products | ✅ | ✅ | ✅ |
| Create Product | ✅ | ❌ | ❌ |
| Update Product | ✅ | ❌ | ❌ |
| Delete Product | ✅ | ❌ | ❌ |
| View Dashboard | ✅ | ✅ | ❌ |
| View Reports | ✅ | ✅ | ❌ |
| Export Reports | ✅ | ✅ | ❌ |
| Stock In | ✅ | ✅ | ✅ |
| Stock Out | ✅ | ✅ | ✅ |
| View Transactions | ✅ | ✅ | ✅ (own only) |
| Manage Users | ✅ | ❌ | ❌ |
| Scan QR Code | ✅ | ✅ | ✅ |

- **Acceptance Criteria:**
  - ✅ API endpoints có guards kiểm tra role
  - ✅ Frontend ẩn/hiện UI elements theo role
  - ✅ Unauthorized access trả về 403 Forbidden
  - ✅ Role được lưu trong JWT payload

---

### FR-002: Product Management

#### FR-002.1: Create Product
- **Priority:** High
- **Role:** Admin only
- **Description:** Tạo sản phẩm mới trong hệ thống
- **Input Fields:**
  - Name (required, max 200 chars)
  - SKU (required, unique, alphanumeric)
  - Description (optional, max 1000 chars)
  - Category (required, dropdown)
  - Price (required, decimal, min 0)
  - Initial Stock (required, integer, min 0)
  - Unit (required, e.g., "pcs", "kg", "liter")
  - Image URL (optional)
  - Reorder Level (required, integer, min 0)
- **Acceptance Criteria:**
  - ✅ Form validation theo rules trên
  - ✅ Auto-generate barcode từ SKU
  - ✅ Auto-generate QR code chứa product ID
  - ✅ Success message sau khi tạo
  - ✅ Redirect về product list

#### FR-002.2: View Products
- **Priority:** High
- **Role:** All roles
- **Description:** Xem danh sách tất cả sản phẩm
- **Features:**
  - Pagination (20 items/page)
  - Search by name/SKU
  - Filter by category
  - Sort by name/price/stock
  - Display: name, SKU, category, price, stock, status
- **Acceptance Criteria:**
  - ✅ Load products < 1 second
  - ✅ Search real-time (debounce 300ms)
  - ✅ Responsive table/grid view
  - ✅ Show stock status badge (In Stock/Low Stock/Out of Stock)

#### FR-002.3: Update Product
- **Priority:** High
- **Role:** Admin only
- **Description:** Chỉnh sửa thông tin sản phẩm
- **Acceptance Criteria:**
  - ✅ Pre-fill form với data hiện tại
  - ✅ Validate giống create
  - ✅ Không cho đổi SKU nếu đã có transactions
  - ✅ Update timestamp `updatedAt`
  - ✅ Show confirmation dialog

#### FR-002.4: Delete Product
- **Priority:** Medium
- **Role:** Admin only
- **Description:** Xóa sản phẩm khỏi hệ thống
- **Acceptance Criteria:**
  - ✅ Soft delete (set `deletedAt` timestamp)
  - ✅ Không cho xóa nếu còn stock > 0
  - ✅ Confirmation dialog với warning
  - ✅ Cascade delete QR codes

#### FR-002.5: View Product Detail
- **Priority:** Medium
- **Role:** All roles
- **Description:** Xem chi tiết 1 sản phẩm
- **Display:**
  - All product info
  - QR code image (downloadable)
  - Barcode image (printable)
  - Stock history chart
  - Recent transactions (last 10)
- **Acceptance Criteria:**
  - ✅ QR code có button "Download"
  - ✅ Barcode có button "Print"
  - ✅ Chart hiển thị stock changes theo thời gian

---

### FR-003: Inventory Management

#### FR-003.1: Stock In (Nhập hàng)
- **Priority:** High
- **Role:** Staff, Manager, Admin
- **Description:** Nhập hàng vào kho
- **Input Fields:**
  - Product (required, searchable dropdown)
  - Quantity (required, integer, min 1)
  - Unit Price (optional, decimal)
  - Supplier (optional, text)
  - Notes (optional, max 500 chars)
  - Date (default: today)
- **Acceptance Criteria:**
  - ✅ Tăng stock của product
  - ✅ Tạo transaction record
  - ✅ Log user thực hiện
  - ✅ Success notification
  - ✅ Option: "Add another" hoặc "View product"

#### FR-003.2: Stock Out (Xuất hàng)
- **Priority:** High
- **Role:** Staff, Manager, Admin
- **Description:** Xuất hàng ra khỏi kho
- **Input Fields:**
  - Product (required, searchable dropdown)
  - Quantity (required, integer, min 1)
  - Customer (optional, text)
  - Notes (optional, max 500 chars)
  - Date (default: today)
- **Acceptance Criteria:**
  - ✅ Giảm stock của product
  - ✅ Không cho xuất quá số lượng tồn
  - ✅ Warning nếu stock sau khi xuất < reorder level
  - ✅ Tạo transaction record
  - ✅ Log user thực hiện

#### FR-003.3: View Transaction History
- **Priority:** Medium
- **Role:** All roles (Staff chỉ xem của mình)
- **Description:** Xem lịch sử nhập/xuất
- **Features:**
  - Filter by type (Stock In/Out)
  - Filter by product
  - Filter by date range
  - Filter by user (Admin/Manager only)
  - Pagination
  - Export to CSV
- **Acceptance Criteria:**
  - ✅ Display: date, type, product, quantity, user, notes
  - ✅ Color coding: green (in), red (out)
  - ✅ Click vào transaction → view details

#### FR-003.4: Low Stock Alerts
- **Priority:** Medium
- **Role:** All roles
- **Description:** Cảnh báo khi sản phẩm sắp hết
- **Logic:**
  - Alert khi `current_stock <= reorder_level`
  - Hiển thị badge "Low Stock" trên product list
  - Dashboard widget: "Products Need Reorder"
- **Acceptance Criteria:**
  - ✅ Real-time check khi stock thay đổi
  - ✅ Notification bell icon với count
  - ✅ Click vào notification → list low stock products
  - ✅ Option: "Mark as ordered" để tắt alert tạm thời

---

### FR-004: Dashboard & Analytics

#### FR-004.1: Dashboard Overview
- **Priority:** High
- **Role:** Manager, Admin
- **Description:** Trang tổng quan với metrics và charts
- **Widgets:**
  1. **Summary Cards:**
     - Total Products
     - Total Stock Value (sum of price × stock)
     - Low Stock Items Count
     - Today's Transactions Count
  
  2. **Revenue Chart:**
     - Line chart: Revenue theo ngày (last 30 days)
     - Tính từ stock out transactions
  
  3. **Stock Level Chart:**
     - Pie chart: Distribution by category
     - Bar chart: Top 10 products by stock value
  
  4. **Recent Activities:**
     - Last 10 transactions
     - Real-time updates
  
  5. **Low Stock Alerts:**
     - List products cần reorder
     - Quick action: "Create purchase order"

- **Acceptance Criteria:**
  - ✅ Load dashboard < 2 seconds
  - ✅ Charts responsive và interactive
  - ✅ Data refresh mỗi 5 phút hoặc manual refresh
  - ✅ Export dashboard as PDF

#### FR-004.2: Reports
- **Priority:** Medium
- **Role:** Manager, Admin
- **Description:** Generate các loại báo cáo
- **Report Types:**
  1. **Inventory Report:**
     - All products với current stock
     - Stock value
     - Last transaction date
  
  2. **Transaction Report:**
     - All transactions trong date range
     - Group by type/product/user
     - Summary: total in, total out
  
  3. **Revenue Report:**
     - Revenue by day/week/month
     - Top selling products
     - Revenue by category

- **Acceptance Criteria:**
  - ✅ Date range picker
  - ✅ Preview report trước khi export
  - ✅ Export formats: PDF, Excel, CSV
  - ✅ Include charts trong PDF
  - ✅ Generate < 10 seconds

---

### FR-005: Import/Export

#### FR-005.1: Import Products from CSV/Excel
- **Priority:** Medium
- **Role:** Admin only
- **Description:** Bulk import products từ file
- **CSV Format:**
```csv
name,sku,category,price,stock,unit,reorder_level,description
Product A,SKU001,Electronics,99.99,100,pcs,20,Description here
Product B,SKU002,Clothing,49.99,50,pcs,10,Another description
```
- **Acceptance Criteria:**
  - ✅ Upload file (max 5MB)
  - ✅ Validate format và data
  - ✅ Preview import (show errors nếu có)
  - ✅ Option: "Skip errors" hoặc "Cancel"
  - ✅ Progress bar khi importing
  - ✅ Summary: X created, Y failed
  - ✅ Download error log nếu có failures

#### FR-005.2: Export Products to CSV/Excel
- **Priority:** Medium
- **Role:** Manager, Admin
- **Description:** Export danh sách products
- **Acceptance Criteria:**
  - ✅ Export all hoặc filtered products
  - ✅ Include all fields
  - ✅ File name: `products_YYYYMMDD.csv`
  - ✅ Download automatically

#### FR-005.3: Export Reports to PDF
- **Priority:** Medium
- **Role:** Manager, Admin
- **Description:** Export báo cáo ra PDF đẹp
- **Acceptance Criteria:**
  - ✅ Include company logo/header
  - ✅ Include charts as images
  - ✅ Professional formatting
  - ✅ Page numbers
  - ✅ Generated date/time
  - ✅ File name: `report_TYPE_YYYYMMDD.pdf`

---

### FR-006: QR Code & Barcode

#### FR-006.1: Generate QR Code
- **Priority:** Medium
- **Role:** System (auto-generate)
- **Description:** Tự động tạo QR code khi tạo product
- **QR Content:**
```json
{
  "productId": "uuid",
  "sku": "SKU001",
  "name": "Product Name",
  "url": "https://yourapp.com/products/uuid"
}
```
- **Acceptance Criteria:**
  - ✅ QR code size: 300x300px
  - ✅ Format: PNG
  - ✅ Store URL trong database
  - ✅ Scannable bằng điện thoại

#### FR-006.2: Scan QR Code
- **Priority:** Medium
- **Role:** All roles
- **Description:** Scan QR code để xem product
- **Acceptance Criteria:**
  - ✅ Camera permission request
  - ✅ Real-time scanning
  - ✅ Beep sound khi scan thành công
  - ✅ Redirect to product detail page
  - ✅ Fallback: Manual enter SKU
  - ✅ Works on mobile browsers

#### FR-006.3: Generate Barcode
- **Priority:** Low
- **Role:** System (auto-generate)
- **Description:** Tạo barcode từ SKU
- **Acceptance Criteria:**
  - ✅ Format: Code 128
  - ✅ Printable quality
  - ✅ Include SKU text below barcode

---

### FR-007: User Management

#### FR-007.1: View Users
- **Priority:** Medium
- **Role:** Admin only
- **Description:** Xem danh sách users
- **Display:**
  - Name, Email, Role, Status, Created Date
  - Actions: Edit, Deactivate
- **Acceptance Criteria:**
  - ✅ Search by name/email
  - ✅ Filter by role
  - ✅ Sort by name/date

#### FR-007.2: Edit User
- **Priority:** Medium
- **Role:** Admin only
- **Description:** Sửa thông tin user
- **Editable Fields:**
  - Name
  - Role
  - Status (Active/Inactive)
- **Acceptance Criteria:**
  - ✅ Không cho edit email (unique identifier)
  - ✅ Confirmation khi đổi role
  - ✅ Log change history

#### FR-007.3: Deactivate User
- **Priority:** Medium
- **Role:** Admin only
- **Description:** Vô hiệu hóa user
- **Acceptance Criteria:**
  - ✅ Soft delete (set status = inactive)
  - ✅ User không login được
  - ✅ Không xóa transaction history
  - ✅ Option: Reactivate

---

## 🔧 Non-Functional Requirements

### NFR-001: Performance
- **Page Load:** < 2 seconds (first load)
- **API Response:** < 500ms (average)
- **Dashboard Load:** < 3 seconds (with charts)
- **Search:** < 300ms (debounced)
- **File Upload:** Support up to 5MB
- **Concurrent Users:** Support 50+ users

### NFR-002: Security
- **Authentication:** JWT with 7-day expiration
- **Password:** Bcrypt hashing (10 rounds)
- **HTTPS:** All communications encrypted
- **SQL Injection:** Use Prisma ORM (parameterized queries)
- **XSS Prevention:** Sanitize all user inputs
- **CORS:** Whitelist frontend domain only
- **Rate Limiting:** 100 requests/minute per IP
- **Session Management:** Auto-logout after 7 days

### NFR-003: Scalability
- **Database:** Support 10,000+ products
- **Transactions:** Handle 1,000+ transactions/day
- **Users:** Support 100+ concurrent users
- **File Storage:** Cloudinary/S3 for images
- **Caching:** Redis for frequently accessed data (future)

### NFR-004: Usability
- **Responsive:** Mobile, Tablet, Desktop
- **Browser Support:** Chrome, Firefox, Safari, Edge (last 2 versions)
- **Accessibility:** WCAG 2.1 Level AA
- **Loading States:** Skeleton screens, spinners
- **Error Messages:** Clear, actionable Vietnamese
- **Keyboard Navigation:** Full support

### NFR-005: Reliability
- **Uptime:** 99% (allow 7 hours downtime/month)
- **Data Backup:** Daily automated backups
- **Error Logging:** Sentry/LogRocket integration
- **Graceful Degradation:** App works without JS (basic features)

### NFR-006: Maintainability
- **Code Quality:** ESLint + Prettier
- **Testing:** 70%+ code coverage
- **Documentation:** JSDoc for complex functions
- **Git Workflow:** Feature branches + PR reviews
- **Versioning:** Semantic versioning (1.0.0)

### NFR-007: Compatibility
- **Mobile:** iOS Safari 14+, Chrome Mobile 90+
- **Desktop:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Screen Sizes:** 320px - 3840px width
- **Offline:** Service Worker for basic offline support (future)

---

## 🎯 Out of Scope (Phase 1)

Các tính năng **KHÔNG** làm trong version 1.0:

- ❌ Multi-tenancy (nhiều cửa hàng)
- ❌ Real-time notifications (WebSocket)
- ❌ Mobile app (React Native)
- ❌ Advanced analytics (ML predictions)
- ❌ Integration với payment gateways
- ❌ Supplier management module
- ❌ Purchase order workflow
- ❌ Multi-language support
- ❌ Dark mode
- ❌ Email notifications

---

## ✅ Acceptance Criteria Summary

Dự án được coi là hoàn thành khi:

- ✅ Tất cả Functional Requirements (FR-001 đến FR-007) đã implement
- ✅ RBAC hoạt động đúng cho 3 roles
- ✅ Dashboard có ít nhất 3 loại charts
- ✅ Import/Export CSV và PDF hoạt động
- ✅ QR Code scan được trên mobile
- ✅ All NFRs đạt tiêu chuẩn
- ✅ Unit tests coverage > 70%
- ✅ E2E tests cho critical flows
- ✅ Deployed lên production
- ✅ Documentation đầy đủ

---

## 📝 Change Log

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2026-02-12 | Initial requirements | Thang PLC |
