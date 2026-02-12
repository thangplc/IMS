# Examples - Hướng dẫn sử dụng Constants

## 1. Form Validation

### Before (Hardcode ❌)
```typescript
const validateForm = () => {
  if (!email) {
    setError('Email là bắt buộc')
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    setError('Email không hợp lệ')
  }
  if (!password) {
    setError('Mật khẩu là bắt buộc')
  }
  if (password.length < 8) {
    setError('Mật khẩu phải có ít nhất 8 ký tự')
  }
}
```

### After (Using Constants ✅)
```typescript
import { MESSAGES } from '@/constants'

const validateForm = () => {
  if (!email) {
    setError(MESSAGES.VALIDATION.EMAIL_REQUIRED)
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    setError(MESSAGES.VALIDATION.EMAIL_INVALID)
  }
  if (!password) {
    setError(MESSAGES.VALIDATION.PASSWORD_REQUIRED)
  }
  if (password.length < 8) {
    setError(MESSAGES.VALIDATION.PASSWORD_MIN_LENGTH)
  }
}
```

**Lợi ích:**
- Thay đổi message ở 1 chỗ, apply cho toàn bộ app
- Dễ chuyển sang tiếng Anh sau này
- TypeScript autocomplete

---

## 2. Error Handling

### Before (Hardcode ❌)
```typescript
try {
  await api.login(credentials)
} catch (error) {
  if (error.code === 'NETWORK_ERROR') {
    toast.error('Không có kết nối internet. Vui lòng kiểm tra mạng của bạn.')
  } else if (error.status === 401) {
    toast.error('Email hoặc mật khẩu không chính xác.')
  } else if (error.status === 429) {
    toast.error('Bạn đã thử đăng nhập quá nhiều lần. Vui lòng đợi 5 phút.')
  } else {
    toast.error('Đã xảy ra lỗi không xác định. Vui lòng thử lại.')
  }
}
```

### After (Using Constants ✅)
```typescript
import { MESSAGES } from '@/constants'

try {
  await api.login(credentials)
} catch (error) {
  if (error.code === 'NETWORK_ERROR') {
    toast.error(MESSAGES.ERROR.NETWORK_ERROR)
  } else if (error.status === 401) {
    toast.error(MESSAGES.ERROR.INVALID_CREDENTIALS)
  } else if (error.status === 429) {
    toast.error(MESSAGES.ERROR.RATE_LIMIT)
  } else {
    toast.error(MESSAGES.ERROR.UNKNOWN_ERROR)
  }
}
```

---

## 3. Navigation Menu

### Before (Hardcode ❌)
```typescript
const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Sản phẩm', href: '/products', icon: CubeIcon },
  { name: 'Nhập kho', href: '/stock-in', icon: ArrowDownIcon },
  { name: 'Xuất kho', href: '/stock-out', icon: ArrowUpIcon },
  { name: 'Báo cáo', href: '/reports', icon: ChartIcon },
]
```

### After (Using Constants ✅)
```typescript
import { LABELS } from '@/constants'

const navigation = [
  { name: LABELS.NAV.DASHBOARD, href: '/dashboard', icon: HomeIcon },
  { name: LABELS.NAV.PRODUCTS, href: '/products', icon: CubeIcon },
  { name: LABELS.NAV.STOCK_IN, href: '/stock-in', icon: ArrowDownIcon },
  { name: LABELS.NAV.STOCK_OUT, href: '/stock-out', icon: ArrowUpIcon },
  { name: LABELS.NAV.REPORTS, href: '/reports', icon: ChartIcon },
]
```

---

## 4. Page Titles & Metadata

### Before (Hardcode ❌)
```typescript
export const metadata = {
  title: 'IMS - Inventory Management System',
  description: 'Hệ thống quản lý kho hàng thông minh',
}

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Tổng quan hệ thống</p>
    </div>
  )
}
```

### After (Using Constants ✅)
```typescript
import { TITLES } from '@/constants'

export const metadata = {
  title: `${TITLES.APP.NAME} - ${TITLES.APP.FULL_NAME}`,
  description: TITLES.APP.TAGLINE,
}

export default function DashboardPage() {
  return (
    <div>
      <h1>{TITLES.PAGE.DASHBOARD}</h1>
      <p>{TITLES.SECTION.OVERVIEW}</p>
    </div>
  )
}
```

---

## 5. Button Labels

### Before (Hardcode ❌)
```typescript
<Button onClick={handleSave}>Lưu</Button>
<Button onClick={handleDelete} variant="destructive">Xóa</Button>
<Button onClick={handleCancel} variant="outline">Hủy</Button>
<Button onClick={handleExport}>Xuất dữ liệu</Button>
```

### After (Using Constants ✅)
```typescript
import { LABELS } from '@/constants'

<Button onClick={handleSave}>{LABELS.BUTTON.SAVE}</Button>
<Button onClick={handleDelete} variant="destructive">{LABELS.BUTTON.DELETE}</Button>
<Button onClick={handleCancel} variant="outline">{LABELS.BUTTON.CANCEL}</Button>
<Button onClick={handleExport}>{LABELS.BUTTON.EXPORT}</Button>
```

---

## 6. Loading States

### Before (Hardcode ❌)
```typescript
{isLoading && <Loading text="Đang tải..." />}
{isSaving && <Loading text="Đang lưu..." />}
{isDeleting && <Loading text="Đang xóa..." />}
{isProcessing && <Loading text="Đang xử lý..." />}
```

### After (Using Constants ✅)
```typescript
import { MESSAGES } from '@/constants'

{isLoading && <Loading text={MESSAGES.LOADING.DEFAULT} />}
{isSaving && <Loading text={MESSAGES.LOADING.SAVING} />}
{isDeleting && <Loading text={MESSAGES.LOADING.DELETING} />}
{isProcessing && <Loading text={MESSAGES.LOADING.PROCESSING} />}
```

---

## 7. Table Headers

### Before (Hardcode ❌)
```typescript
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Tên</TableHead>
      <TableHead>Mô tả</TableHead>
      <TableHead>Số lượng</TableHead>
      <TableHead>Giá</TableHead>
      <TableHead>Thao tác</TableHead>
    </TableRow>
  </TableHeader>
</Table>
```

### After (Using Constants ✅)
```typescript
import { LABELS } from '@/constants'

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>{LABELS.FORM.NAME}</TableHead>
      <TableHead>{LABELS.FORM.DESCRIPTION}</TableHead>
      <TableHead>{LABELS.FORM.QUANTITY}</TableHead>
      <TableHead>{LABELS.FORM.PRICE}</TableHead>
      <TableHead>{LABELS.TABLE.ACTIONS}</TableHead>
    </TableRow>
  </TableHeader>
</Table>
```

---

## 8. Status Badge

### Before (Hardcode ❌)
```typescript
function StatusBadge({ status }: { status: string }) {
  const labels = {
    active: 'Hoạt động',
    inactive: 'Không hoạt động',
    pending: 'Chờ xử lý',
  }
  
  return <Badge>{labels[status]}</Badge>
}
```

### After (Using Constants ✅)
```typescript
import { LABELS } from '@/constants'

function StatusBadge({ status }: { status: string }) {
  const labels = {
    active: LABELS.STATUS.ACTIVE,
    inactive: LABELS.STATUS.INACTIVE,
    pending: LABELS.STATUS.PENDING,
  }
  
  return <Badge>{labels[status]}</Badge>
}
```

---

## 9. Complex Form Example

### Before (Hardcode ❌)
```typescript
export function ProductForm() {
  return (
    <form>
      <Label>Tên sản phẩm</Label>
      <Input placeholder="Nhập tên sản phẩm" />
      
      <Label>Mô tả</Label>
      <Textarea placeholder="Nhập mô tả" />
      
      <Label>Giá</Label>
      <Input type="number" placeholder="Nhập giá" />
      
      <Label>Số lượng</Label>
      <Input type="number" placeholder="Nhập số lượng" />
      
      <div className="flex gap-2">
        <Button type="submit">Lưu</Button>
        <Button type="button" variant="outline">Hủy</Button>
      </div>
    </form>
  )
}
```

### After (Using Constants ✅)
```typescript
import { LABELS } from '@/constants'

export function ProductForm() {
  return (
    <form>
      <Label>{LABELS.FORM.NAME}</Label>
      <Input placeholder={`Nhập ${LABELS.FORM.NAME.toLowerCase()}`} />
      
      <Label>{LABELS.FORM.DESCRIPTION}</Label>
      <Textarea placeholder={`Nhập ${LABELS.FORM.DESCRIPTION.toLowerCase()}`} />
      
      <Label>{LABELS.FORM.PRICE}</Label>
      <Input type="number" placeholder={`Nhập ${LABELS.FORM.PRICE.toLowerCase()}`} />
      
      <Label>{LABELS.FORM.QUANTITY}</Label>
      <Input type="number" placeholder={`Nhập ${LABELS.FORM.QUANTITY.toLowerCase()}`} />
      
      <div className="flex gap-2">
        <Button type="submit">{LABELS.BUTTON.SAVE}</Button>
        <Button type="button" variant="outline">{LABELS.BUTTON.CANCEL}</Button>
      </div>
    </form>
  )
}
```

---

## 10. Role-based Display

### Before (Hardcode ❌)
```typescript
function UserBadge({ role }: { role: string }) {
  const roleLabels = {
    ADMIN: 'Admin',
    MANAGER: 'Manager',
    STAFF: 'Staff',
  }
  
  return <Badge>{roleLabels[role]}</Badge>
}
```

### After (Using Constants ✅)
```typescript
import { LABELS } from '@/constants'

function UserBadge({ role }: { role: string }) {
  const roleLabels = {
    ADMIN: LABELS.ROLE.ADMIN,
    MANAGER: LABELS.ROLE.MANAGER,
    STAFF: LABELS.ROLE.STAFF,
  }
  
  return <Badge>{roleLabels[role]}</Badge>
}
```

---

## Benefits Summary

### 1. **Maintainability** 🛠️
- Thay đổi text ở 1 chỗ → apply toàn bộ app
- Dễ tìm kiếm và refactor

### 2. **Consistency** 📏
- Đảm bảo dùng từ nhất quán
- Tránh viết sai chính tả

### 3. **i18n Ready** 🌍
- Chuẩn bị sẵn cho đa ngôn ngữ
- Chỉ cần swap constants file

### 4. **Developer Experience** 💻
- TypeScript autocomplete
- Type-safe
- Self-documenting code

### 5. **Scalability** 📈
- Dễ thêm ngôn ngữ mới
- Dễ quản lý khi app lớn

---

## Quick Reference

```typescript
// Import
import { MESSAGES, LABELS, TITLES } from '@/constants'

// Usage
MESSAGES.ERROR.*           // Error messages
MESSAGES.VALIDATION.*      // Validation messages
MESSAGES.LOADING.*         // Loading messages
MESSAGES.SUCCESS.*         // Success messages
MESSAGES.AUTH.*            // Auth messages
MESSAGES.COMMON.*          // Common actions

LABELS.NAV.*               // Navigation items
LABELS.AUTH.*              // Auth labels
LABELS.FORM.*              // Form field labels
LABELS.TABLE.*             // Table labels
LABELS.BUTTON.*            // Button labels
LABELS.ROLE.*              // Role labels
LABELS.STATUS.*            // Status labels

TITLES.APP.*               // App name, tagline
TITLES.PAGE.*              // Page titles
TITLES.SECTION.*           // Section headers
TITLES.FEATURE.*           // Feature names
```
