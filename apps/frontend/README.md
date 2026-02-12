# Frontend - Inventory Management System

Next.js 14 web application với React Query, Zustand, và Shadcn/ui.

## 📋 Mục lục

- [Tech Stack](#-tech-stack)
- [Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [Setup](#-setup)
- [Scripts](#-scripts)
- [Pages & Routes](#-pages--routes)
- [Components](#-components)
- [State Management](#-state-management)
- [API Integration](#-api-integration)
- [Styling](#-styling)
- [Testing](#-testing)
- [Deployment](#-deployment)

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.3+
- **UI Library**: Shadcn/ui + Tailwind CSS
- **State Management**: 
  - React Query (Server state)
  - Zustand (Client state)
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **QR Scanner**: html5-qrcode

---

## 📁 Cấu trúc thư mục

```
apps/frontend/
│
├── 📂 app/                       # Next.js App Router
│   ├── 📄 layout.tsx             # Root layout
│   ├── 📄 page.tsx               # Landing page
│   ├── 📄 providers.tsx          # React Query provider
│   ├── 📄 globals.css            # Global styles
│   │
│   ├── 📂 (auth)/                # Auth layout group
│   │   ├── layout.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   │
│   └── 📂 (dashboard)/           # Dashboard layout group
│       ├── layout.tsx
│       ├── dashboard/
│       │   └── page.tsx
│       ├── products/
│       │   ├── page.tsx
│       │   ├── [id]/
│       │   │   └── page.tsx
│       │   └── new/
│       │       └── page.tsx
│       ├── inventory/
│       │   ├── stock-in/
│       │   │   └── page.tsx
│       │   ├── stock-out/
│       │   │   └── page.tsx
│       │   └── history/
│       │       └── page.tsx
│       ├── reports/
│       │   └── page.tsx
│       ├── users/
│       │   └── page.tsx
│       └── scan/
│           └── page.tsx
│
├── 📂 components/                # React components
│   ├── 📂 ui/                    # Shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   ├── table.tsx
│   │   ├── card.tsx
│   │   └── ...
│   │
│   ├── 📂 layout/                # Layout components
│   │   ├── header.tsx
│   │   ├── sidebar.tsx
│   │   ├── footer.tsx
│   │   └── mobile-nav.tsx
│   │
│   ├── 📂 forms/                 # Form components
│   │   ├── product-form.tsx
│   │   ├── stock-in-form.tsx
│   │   ├── stock-out-form.tsx
│   │   └── login-form.tsx
│   │
│   ├── 📂 tables/                # Table components
│   │   ├── products-table.tsx
│   │   ├── transactions-table.tsx
│   │   ├── users-table.tsx
│   │   └── data-table.tsx
│   │
│   ├── 📂 charts/                # Chart components
│   │   ├── revenue-chart.tsx
│   │   ├── stock-chart.tsx
│   │   └── pie-chart.tsx
│   │
│   └── 📂 features/              # Feature components
│       ├── qr-scanner.tsx
│       ├── qr-generator.tsx
│       ├── low-stock-alert.tsx
│       └── dashboard-stats.tsx
│
├── 📂 lib/                       # Utilities
│   ├── api.ts                    # Axios instance
│   ├── utils.ts                  # Helper functions
│   └── constants.ts              # App constants
│
├── 📂 hooks/                     # Custom hooks
│   ├── use-auth.ts               # Auth hooks
│   ├── use-products.ts           # Products queries
│   ├── use-inventory.ts          # Inventory queries
│   └── use-reports.ts            # Reports queries
│
├── 📂 types/                     # TypeScript types
│   └── index.ts                  # Shared types
│
├── 📂 store/                     # Zustand stores
│   ├── auth-store.ts             # Auth state
│   └── ui-store.ts               # UI state
│
├── 📄 .env.local.example         # Environment variables template
├── 📄 next.config.js             # Next.js config
├── 📄 tailwind.config.ts         # Tailwind config
├── 📄 postcss.config.js          # PostCSS config
├── 📄 package.json               # Dependencies
└── 📄 tsconfig.json              # TypeScript config
```

---

## 🚀 Setup

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Tạo file `.env.local`

```bash
cp .env.local.example .env.local
```

### 3. Cấu hình `.env.local`

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Start development server

```bash
npm run dev
```

**App chạy tại:** http://localhost:3000

---

## 📜 Scripts

```bash
# Development
npm run dev              # Start dev server with hot reload

# Build
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # TypeScript type checking

# Testing (TODO)
npm run test             # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:e2e         # Run E2E tests
```

---

## 🗺️ Pages & Routes

### Public Routes

| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.tsx` | Landing page |
| `/login` | `app/(auth)/login/page.tsx` | Login page |

### Protected Routes (Require Auth)

| Route | File | Access |
|-------|------|--------|
| `/dashboard` | `app/(dashboard)/dashboard/page.tsx` | All |
| `/products` | `app/(dashboard)/products/page.tsx` | All |
| `/products/new` | `app/(dashboard)/products/new/page.tsx` | Admin |
| `/products/:id` | `app/(dashboard)/products/[id]/page.tsx` | All |
| `/inventory/stock-in` | `app/(dashboard)/inventory/stock-in/page.tsx` | Staff+ |
| `/inventory/stock-out` | `app/(dashboard)/inventory/stock-out/page.tsx` | Staff+ |
| `/inventory/history` | `app/(dashboard)/inventory/history/page.tsx` | All |
| `/reports` | `app/(dashboard)/reports/page.tsx` | Manager+ |
| `/users` | `app/(dashboard)/users/page.tsx` | Admin |
| `/scan` | `app/(dashboard)/scan/page.tsx` | All |

### Route Groups

```
(auth)/     - Auth layout (centered, no sidebar)
(dashboard)/ - Dashboard layout (with sidebar)
```

---

## 🧩 Components

### Shadcn/ui Components

**Installation:**

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add table
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add select
npx shadcn-ui@latest add form
```

**Usage:**

```tsx
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

<Button variant="default">Click me</Button>
<Input type="email" placeholder="Email" />
```

### Custom Components

#### Layout Components

```tsx
// components/layout/header.tsx
export function Header() {
  const { user } = useAuthStore()
  
  return (
    <header>
      <Logo />
      <SearchBar />
      <UserMenu user={user} />
    </header>
  )
}
```

#### Form Components

```tsx
// components/forms/product-form.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export function ProductForm() {
  const form = useForm({
    resolver: zodResolver(productSchema),
  })
  
  return <form onSubmit={form.handleSubmit(onSubmit)}>...</form>
}
```

#### Table Components

```tsx
// components/tables/products-table.tsx
export function ProductsTable({ products }: Props) {
  return (
    <DataTable
      columns={columns}
      data={products}
      searchKey="name"
    />
  )
}
```

---

## 🔄 State Management

### React Query (Server State)

**Setup:** `app/providers.tsx`

```tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient())
  
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
```

**Usage:**

```tsx
// hooks/use-products.ts
import { useQuery, useMutation } from '@tanstack/react-query'

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => api.get('/products').then(res => res.data),
  })
}

export function useCreateProduct() {
  return useMutation({
    mutationFn: (data) => api.post('/products', data),
    onSuccess: () => {
      queryClient.invalidateQueries(['products'])
    },
  })
}
```

### Zustand (Client State)

**Setup:** `store/auth-store.ts`

```tsx
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  user: User | null
  token: string | null
  setAuth: (user: User, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    { name: 'auth-storage' }
  )
)
```

**Usage:**

```tsx
import { useAuthStore } from '@/store/auth-store'

export function Header() {
  const { user, logout } = useAuthStore()
  
  return (
    <div>
      <span>{user?.name}</span>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
```

---

## 🌐 API Integration

### Axios Instance

**Setup:** `lib/api.ts`

```tsx
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

// Request interceptor - Add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
```

### Custom Hooks

```tsx
// hooks/use-auth.ts
export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth)
  
  return useMutation({
    mutationFn: (data: LoginRequest) => 
      api.post<LoginResponse>('/auth/login', data),
    onSuccess: (response) => {
      setAuth(response.data.user, response.data.accessToken)
    },
  })
}

// hooks/use-products.ts
export function useProducts(params?: ProductsParams) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => api.get('/products', { params }),
  })
}
```

---

## 🎨 Styling

### Tailwind CSS

**Config:** `tailwind.config.ts`

```tsx
export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
      },
    },
  },
}
```

**Usage:**

```tsx
<div className="flex items-center justify-between p-4 bg-primary text-white">
  <h1 className="text-2xl font-bold">Dashboard</h1>
</div>
```

### CSS Variables

**File:** `app/globals.css`

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96.1%;
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
}
```

### Responsive Design

```tsx
<div className="
  grid 
  grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3 
  gap-4
">
  {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
</div>
```

---

## 🧪 Testing

### Setup (TODO)

```bash
npm install -D @testing-library/react @testing-library/jest-dom vitest
```

### Component Tests

```tsx
// components/__tests__/button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from '../ui/button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})
```

### E2E Tests (Playwright)

```bash
npm install -D @playwright/test
```

```typescript
// e2e/login.spec.ts
test('user can login', async ({ page }) => {
  await page.goto('/login')
  await page.fill('[name="email"]', 'admin@ims.com')
  await page.fill('[name="password"]', 'Admin@123')
  await page.click('button[type="submit"]')
  await expect(page).toHaveURL('/dashboard')
})
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project to Vercel
3. Set environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api/v1
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   ```
4. Deploy

**Auto-deploy:** Every push to `main` branch

### Build Locally

```bash
npm run build
npm run start
```

### Environment Variables

**Development:**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Production:**
```env
NEXT_PUBLIC_API_URL=https://api.yourapp.com/api/v1
NEXT_PUBLIC_APP_URL=https://yourapp.com
```

---

## 🐛 Troubleshooting

### API connection error

**Problem:** Network errors in browser console

**Solution:**
```bash
# Check backend is running
curl http://localhost:3001/api/v1/health

# Verify NEXT_PUBLIC_API_URL
echo $NEXT_PUBLIC_API_URL

# Check CORS settings in backend
```

### Hydration errors

**Problem:** Text content does not match server-rendered HTML

**Solution:**
```tsx
// Use 'use client' for components with browser APIs
'use client'

export function MyComponent() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return null
  
  return <div>...</div>
}
```

### Build errors

**Problem:** Type errors during build

**Solution:**
```bash
# Run type check
npm run type-check

# Fix TypeScript errors
# Then rebuild
npm run build
```

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Documentation](https://tanstack.com/query)
- [Shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zustand Documentation](https://docs.pmnd.rs/zustand)

---

## 🎯 Development Workflow

### 1. Create Feature Branch

```bash
git checkout -b feature/products-page
```

### 2. Develop

```bash
npm run dev
# Make changes
# Test in browser
```

### 3. Type Check

```bash
npm run type-check
```

### 4. Lint

```bash
npm run lint
```

### 5. Commit

```bash
git add .
git commit -m "feat: add products page"
```

### 6. Push

```bash
git push origin feature/products-page
```

---

## 📝 Best Practices

### 1. Component Organization

```tsx
// ✅ Good: Small, focused components
export function ProductCard({ product }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{product.price}</p>
      </CardContent>
    </Card>
  )
}

// ❌ Bad: Large, monolithic components
```

### 2. Server vs Client Components

```tsx
// ✅ Server Component (default)
export default async function ProductsPage() {
  const products = await getProducts()
  return <ProductsList products={products} />
}

// ✅ Client Component (interactive)
'use client'
export function ProductsList({ products }) {
  const [search, setSearch] = useState('')
  return <input onChange={(e) => setSearch(e.target.value)} />
}
```

### 3. Type Safety

```tsx
// ✅ Good: Proper types
interface ProductCardProps {
  product: Product
  onEdit: (id: string) => void
}

// ❌ Bad: Any types
interface ProductCardProps {
  product: any
  onEdit: any
}
```

### 4. Error Handling

```tsx
// ✅ Good: Handle errors
export function ProductsList() {
  const { data, error, isLoading } = useProducts()
  
  if (isLoading) return <Skeleton />
  if (error) return <ErrorMessage error={error} />
  
  return <Table data={data} />
}
```

---

## 🤝 Contributing

1. Follow the [Development Workflow](#-development-workflow)
2. Write tests for new features
3. Update documentation
4. Create pull request

---

**Need help?** Check the main [README](../../README.md) or open an issue.
