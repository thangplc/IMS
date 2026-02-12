# System Architecture - IMS

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│  Next.js 14 (App Router) + TypeScript + Shadcn/ui              │
│  - Server Components (RSC)                                       │
│  - Client Components (Interactive UI)                           │
│  - React Query (Server State)                                   │
│  - Zustand (Client State)                                       │
└────────────────────┬────────────────────────────────────────────┘
                     │ HTTPS/REST API
                     │ JSON
┌────────────────────▼────────────────────────────────────────────┐
│                      APPLICATION LAYER                           │
├─────────────────────────────────────────────────────────────────┤
│  NestJS + TypeScript                                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│  │   Auth      │  │  Products   │  │  Inventory  │           │
│  │   Module    │  │   Module    │  │   Module    │           │
│  └─────────────┘  └─────────────┘  └─────────────┘           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│  │   Users     │  │   Reports   │  │   Files     │           │
│  │   Module    │  │   Module    │  │   Module    │           │
│  └─────────────┘  └─────────────┘  └─────────────┘           │
│                                                                  │
│  Middleware: JWT Auth, RBAC Guards, Logging, Validation        │
└────────────────────┬────────────────────────────────────────────┘
                     │ Prisma ORM
                     │ SQL
┌────────────────────▼────────────────────────────────────────────┐
│                       DATA LAYER                                 │
├─────────────────────────────────────────────────────────────────┤
│  PostgreSQL 15+                                                 │
│  - Users, Roles, Products, Categories                           │
│  - Transactions, Inventory                                      │
│  - Reports, Audit Logs                                          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                             │
├─────────────────────────────────────────────────────────────────┤
│  - Cloudinary (QR Code & Product Images)                        │
│  - Vercel (Frontend Hosting)                                    │
│  - Railway/Render (Backend Hosting)                             │
│  - Supabase (Database Hosting - Optional)                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Architecture Principles

### 1. Separation of Concerns
- **Frontend:** Presentation logic only
- **Backend:** Business logic, validation, data access
- **Database:** Data persistence

### 2. Modularity
- NestJS modules for each domain (Auth, Products, Inventory, etc.)
- Reusable components in Frontend
- Shared types between FE and BE

### 3. Security First
- JWT authentication
- RBAC at API level
- Input validation on both FE and BE
- SQL injection prevention via Prisma

### 4. Scalability
- Stateless API (horizontal scaling ready)
- Database indexing for performance
- CDN for static assets
- Ready for caching layer (Redis)

### 5. Developer Experience
- TypeScript end-to-end
- Hot reload in development
- Automated testing
- Clear folder structure

---

## 🖥️ Frontend Architecture (Next.js)

### Tech Stack
```typescript
{
  "framework": "Next.js 14.2+",
  "language": "TypeScript 5.3+",
  "styling": "Tailwind CSS 3.4+",
  "ui": "Shadcn/ui",
  "state": {
    "server": "React Query (TanStack Query)",
    "client": "Zustand"
  },
  "forms": "React Hook Form + Zod",
  "charts": "Recharts",
  "http": "Axios",
  "qr": "html5-qrcode"
}
```

### Folder Structure
```
apps/frontend/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth layout group
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   │
│   ├── (dashboard)/              # Dashboard layout group
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Main dashboard
│   │   ├── products/
│   │   │   ├── page.tsx          # Product list
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx      # Product detail
│   │   │   └── new/
│   │   │       └── page.tsx      # Create product
│   │   ├── inventory/
│   │   │   ├── stock-in/
│   │   │   │   └── page.tsx
│   │   │   ├── stock-out/
│   │   │   │   └── page.tsx
│   │   │   └── history/
│   │   │       └── page.tsx
│   │   ├── reports/
│   │   │   └── page.tsx
│   │   ├── users/                # Admin only
│   │   │   └── page.tsx
│   │   ├── scan/                 # QR scanner
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   │
│   ├── api/                      # API routes (optional)
│   │   └── health/
│   │       └── route.ts
│   │
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
│
├── components/
│   ├── ui/                       # Shadcn components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   ├── table.tsx
│   │   └── ...
│   │
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── sidebar.tsx
│   │   └── footer.tsx
│   │
│   ├── forms/
│   │   ├── product-form.tsx
│   │   ├── stock-in-form.tsx
│   │   └── stock-out-form.tsx
│   │
│   ├── tables/
│   │   ├── products-table.tsx
│   │   ├── transactions-table.tsx
│   │   └── data-table.tsx        # Generic table
│   │
│   ├── charts/
│   │   ├── revenue-chart.tsx
│   │   ├── stock-chart.tsx
│   │   └── pie-chart.tsx
│   │
│   └── features/
│       ├── qr-scanner.tsx
│       ├── qr-generator.tsx
│       └── low-stock-alert.tsx
│
├── lib/
│   ├── api.ts                    # Axios instance
│   ├── auth.ts                   # Auth helpers
│   ├── utils.ts                  # Utility functions
│   └── constants.ts              # App constants
│
├── hooks/
│   ├── use-auth.ts               # Auth hook
│   ├── use-products.ts           # Products queries
│   ├── use-inventory.ts          # Inventory queries
│   └── use-reports.ts            # Reports queries
│
├── types/
│   ├── user.ts
│   ├── product.ts
│   ├── transaction.ts
│   └── api.ts
│
├── store/
│   ├── auth-store.ts             # Zustand store
│   └── ui-store.ts
│
└── middleware.ts                 # Auth middleware
```

### Key Patterns

#### 1. Server Components (Default)
```typescript
// app/(dashboard)/products/page.tsx
import { getProducts } from '@/lib/api';

export default async function ProductsPage() {
  const products = await getProducts(); // Fetch on server
  
  return <ProductsTable products={products} />;
}
```

#### 2. Client Components (Interactive)
```typescript
'use client';

import { useProducts } from '@/hooks/use-products';

export function ProductsTable() {
  const { data, isLoading } = useProducts();
  
  if (isLoading) return <Skeleton />;
  
  return <DataTable data={data} />;
}
```

#### 3. React Query for Server State
```typescript
// hooks/use-products.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => api.get('/products').then(res => res.data),
  });
}

export function useCreateProduct() {
  return useMutation({
    mutationFn: (data) => api.post('/products', data),
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });
}
```

#### 4. RBAC on Frontend
```typescript
// components/layout/sidebar.tsx
import { useAuth } from '@/hooks/use-auth';

export function Sidebar() {
  const { user } = useAuth();
  
  return (
    <nav>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/products">Products</Link>
      
      {user.role === 'ADMIN' && (
        <Link href="/users">Users</Link>
      )}
      
      {['ADMIN', 'MANAGER'].includes(user.role) && (
        <Link href="/reports">Reports</Link>
      )}
    </nav>
  );
}
```

---

## ⚙️ Backend Architecture (NestJS)

### Tech Stack
```typescript
{
  "framework": "NestJS 10+",
  "language": "TypeScript 5.3+",
  "database": "PostgreSQL 15+",
  "orm": "Prisma 5+",
  "auth": "Passport JWT",
  "validation": "class-validator",
  "testing": "Jest",
  "docs": "Swagger"
}
```

### Folder Structure
```
apps/backend/
├── src/
│   ├── main.ts                   # Entry point
│   ├── app.module.ts             # Root module
│   │
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── strategies/
│   │   │   └── jwt.strategy.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   └── decorators/
│   │       ├── roles.decorator.ts
│   │       └── current-user.decorator.ts
│   │
│   ├── users/
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── dto/
│   │   │   ├── create-user.dto.ts
│   │   │   └── update-user.dto.ts
│   │   └── entities/
│   │       └── user.entity.ts
│   │
│   ├── products/
│   │   ├── products.module.ts
│   │   ├── products.controller.ts
│   │   ├── products.service.ts
│   │   ├── dto/
│   │   │   ├── create-product.dto.ts
│   │   │   ├── update-product.dto.ts
│   │   │   └── query-product.dto.ts
│   │   └── entities/
│   │       └── product.entity.ts
│   │
│   ├── inventory/
│   │   ├── inventory.module.ts
│   │   ├── inventory.controller.ts
│   │   ├── inventory.service.ts
│   │   ├── dto/
│   │   │   ├── stock-in.dto.ts
│   │   │   └── stock-out.dto.ts
│   │   └── entities/
│   │       └── transaction.entity.ts
│   │
│   ├── reports/
│   │   ├── reports.module.ts
│   │   ├── reports.controller.ts
│   │   ├── reports.service.ts
│   │   └── generators/
│   │       ├── pdf.generator.ts
│   │       └── excel.generator.ts
│   │
│   ├── files/
│   │   ├── files.module.ts
│   │   ├── files.controller.ts
│   │   ├── files.service.ts
│   │   └── processors/
│   │       ├── csv-import.processor.ts
│   │       └── qr-generator.processor.ts
│   │
│   ├── common/
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   ├── interceptors/
│   │   │   ├── logging.interceptor.ts
│   │   │   └── transform.interceptor.ts
│   │   ├── pipes/
│   │   │   └── validation.pipe.ts
│   │   └── decorators/
│   │       └── api-paginated-response.decorator.ts
│   │
│   └── prisma/
│       ├── prisma.module.ts
│       └── prisma.service.ts
│
├── prisma/
│   ├── schema.prisma             # Database schema
│   ├── migrations/               # Migration files
│   └── seed.ts                   # Seed data
│
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
│
└── package.json
```

### Key Patterns

#### 1. Module Structure
```typescript
// products/products.module.ts
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
```

#### 2. Controller with RBAC
```typescript
// products/products.controller.ts
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF)
  findAll() {
    return this.productsService.findAll();
  }

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }
}
```

#### 3. Service with Business Logic
```typescript
// products/products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductDto) {
    // Generate QR code
    const qrCode = await this.generateQRCode(dto.sku);
    
    return this.prisma.product.create({
      data: {
        ...dto,
        qrCode,
        barcode: this.generateBarcode(dto.sku),
      },
    });
  }

  async findAll() {
    return this.prisma.product.findMany({
      where: { deletedAt: null },
      include: { category: true },
    });
  }

  private async generateQRCode(sku: string): Promise<string> {
    // QR code generation logic
  }

  private generateBarcode(sku: string): string {
    // Barcode generation logic
  }
}
```

#### 4. DTO with Validation
```typescript
// products/dto/create-product.dto.ts
import { IsString, IsNumber, IsOptional, Min, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MaxLength(200)
  name: string;

  @IsString()
  @MaxLength(50)
  sku: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsString()
  categoryId: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;
}
```

#### 5. Custom Guards
```typescript
// auth/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.role === role);
  }
}
```

---

## 🗄️ Database Architecture

### PostgreSQL Schema (via Prisma)

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  ADMIN
  MANAGER
  STAFF
}

enum TransactionType {
  STOCK_IN
  STOCK_OUT
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String
  role      Role     @default(STAFF)
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  transactions Transaction[]
  
  @@index([email])
  @@map("users")
}

model Category {
  id        String    @id @default(uuid())
  name      String    @unique
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  
  products  Product[]
  
  @@map("categories")
}

model Product {
  id           String    @id @default(uuid())
  name         String
  sku          String    @unique
  description  String?
  price        Decimal   @db.Decimal(10, 2)
  stock        Int       @default(0)
  unit         String    @default("pcs")
  reorderLevel Int       @default(10)
  barcode      String?
  qrCode       String?
  imageUrl     String?
  categoryId   String
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  deletedAt    DateTime?
  
  category     Category  @relation(fields: [categoryId], references: [id])
  transactions Transaction[]
  
  @@index([sku])
  @@index([categoryId])
  @@map("products")
}

model Transaction {
  id        String          @id @default(uuid())
  type      TransactionType
  quantity  Int
  unitPrice Decimal?        @db.Decimal(10, 2)
  notes     String?
  supplier  String?
  customer  String?
  productId String
  userId    String
  createdAt DateTime        @default(now())
  
  product   Product         @relation(fields: [productId], references: [id])
  user      User            @relation(fields: [userId], references: [id])
  
  @@index([productId])
  @@index([userId])
  @@index([createdAt])
  @@map("transactions")
}
```

### Indexing Strategy
- **Primary Keys:** All tables use UUID
- **Unique Indexes:** email, sku, category name
- **Query Indexes:** productId, userId, createdAt (for filtering/sorting)
- **Composite Indexes:** (future) For complex queries

---

## 🔐 Security Architecture

### Authentication Flow
```
1. User submits email + password
2. Backend validates credentials
3. Backend generates JWT token (7-day expiry)
4. Frontend stores token in localStorage
5. Frontend includes token in Authorization header
6. Backend validates token on each request
7. Backend checks user role for RBAC
```

### JWT Payload
```typescript
{
  sub: "user-uuid",
  email: "user@example.com",
  role: "ADMIN",
  iat: 1234567890,
  exp: 1234567890
}
```

### Security Measures
- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT with short expiration
- ✅ HTTPS only in production
- ✅ CORS whitelist
- ✅ Rate limiting (100 req/min)
- ✅ Input validation (class-validator)
- ✅ SQL injection prevention (Prisma)
- ✅ XSS prevention (sanitize inputs)
- ✅ CSRF protection (SameSite cookies)

---

## 🚀 Deployment Architecture

### Frontend (Vercel)
```
GitHub → Vercel
- Auto-deploy on push to main
- Environment variables in Vercel dashboard
- CDN for static assets
- Automatic HTTPS
```

### Backend (Railway/Render)
```
GitHub → Railway/Render
- Auto-deploy on push to main
- Environment variables in dashboard
- PostgreSQL addon
- Automatic HTTPS
```

### Environment Variables
```bash
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=https://api.yourapp.com
NEXT_PUBLIC_APP_URL=https://yourapp.com

# Backend (.env)
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=your-secret-key
JWT_EXPIRATION=7d
CLOUDINARY_URL=cloudinary://...
PORT=3001
```

---

## 📊 Performance Considerations

### Frontend
- Server Components for initial load
- React Query for caching
- Image optimization (Next.js Image)
- Code splitting (automatic)
- Lazy loading for charts

### Backend
- Database connection pooling (Prisma)
- Indexed queries
- Pagination for large datasets
- Caching headers
- Compression middleware

### Database
- Proper indexing
- Query optimization
- Regular VACUUM
- Connection pooling

---

## 🧪 Testing Strategy

### Frontend
- Unit tests: Vitest
- Component tests: React Testing Library
- E2E tests: Playwright

### Backend
- Unit tests: Jest
- Integration tests: Jest + Supertest
- E2E tests: Jest

### Coverage Goals
- Unit tests: 70%+
- Integration tests: Critical flows
- E2E tests: User journeys

---

## 📈 Future Enhancements

### Phase 2
- Redis caching layer
- WebSocket for real-time updates
- Email notifications
- Advanced analytics with ML

### Phase 3
- Mobile app (React Native)
- Multi-tenancy
- Supplier management
- Purchase order workflow

---

## 📚 Tech Stack Justification

### Why Next.js?
- ✅ SSR for SEO and performance
- ✅ App Router for modern patterns
- ✅ Built-in optimization
- ✅ Great DX
- ✅ Easy deployment (Vercel)

### Why NestJS?
- ✅ Enterprise-grade structure
- ✅ Built-in RBAC support
- ✅ TypeScript native
- ✅ Modular architecture
- ✅ Great for scaling

### Why PostgreSQL?
- ✅ ACID compliance
- ✅ Mature and stable
- ✅ Great Prisma support
- ✅ JSON support for flexibility
- ✅ Free hosting options

### Why Prisma?
- ✅ Type-safe queries
- ✅ Auto-generated types
- ✅ Easy migrations
- ✅ Great DX
- ✅ Active community

---

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [NestJS Docs](https://docs.nestjs.com)
- [Prisma Docs](https://www.prisma.io/docs)
- [Shadcn/ui](https://ui.shadcn.com)
- [React Query](https://tanstack.com/query)
