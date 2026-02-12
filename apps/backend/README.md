# Backend - Inventory Management System

NestJS API server với PostgreSQL và Prisma ORM.

## 📋 Mục lục

- [Tech Stack](#-tech-stack)
- [Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [Setup](#-setup)
- [Scripts](#-scripts)
- [API Endpoints](#-api-endpoints)
- [Authentication](#-authentication)
- [Database](#-database)
- [Testing](#-testing)
- [Deployment](#-deployment)

---

## 🛠️ Tech Stack

- **Framework**: NestJS 10+
- **Language**: TypeScript 5.3+
- **Database**: PostgreSQL 15+
- **ORM**: Prisma 5+
- **Authentication**: JWT + Passport
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest

---

## 📁 Cấu trúc thư mục

```
apps/backend/
│
├── 📂 prisma/                    # Database
│   ├── schema.prisma             # Database schema
│   ├── seed.ts                   # Seed data
│   └── migrations/               # Migration files
│
├── 📂 src/                       # Source code
│   ├── 📄 main.ts                # Entry point
│   ├── 📄 app.module.ts          # Root module
│   │
│   ├── 📂 prisma/                # Prisma service
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   │
│   ├── 📂 auth/                  # Authentication
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── dto/                  # Data Transfer Objects
│   │   │   ├── login.dto.ts
│   │   │   └── register.dto.ts
│   │   ├── strategies/           # Passport strategies
│   │   │   └── jwt.strategy.ts
│   │   ├── guards/               # Auth guards
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   └── decorators/           # Custom decorators
│   │       ├── roles.decorator.ts
│   │       └── current-user.decorator.ts
│   │
│   ├── 📂 users/                 # Users module
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   └── users.service.ts
│   │
│   ├── 📂 products/              # Products module
│   │   ├── products.module.ts
│   │   ├── products.controller.ts
│   │   ├── products.service.ts
│   │   └── dto/
│   │
│   ├── 📂 inventory/             # Inventory module
│   │   ├── inventory.module.ts
│   │   ├── inventory.controller.ts
│   │   ├── inventory.service.ts
│   │   └── dto/
│   │
│   ├── 📂 reports/               # Reports module
│   │   ├── reports.module.ts
│   │   ├── reports.controller.ts
│   │   └── reports.service.ts
│   │
│   └── 📂 files/                 # Files module
│       ├── files.module.ts
│       ├── files.controller.ts
│       └── files.service.ts
│
├── 📂 test/                      # E2E tests
│
├── 📄 .env.example               # Environment variables template
├── 📄 .eslintrc.js               # ESLint config
├── 📄 .prettierrc                # Prettier config
├── 📄 nest-cli.json              # NestJS CLI config
├── 📄 package.json               # Dependencies
└── 📄 tsconfig.json              # TypeScript config
```

---

## 🚀 Setup

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Tạo file `.env`

```bash
cp .env.example .env
```

### 3. Cấu hình `.env`

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/ims_db?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this"
JWT_EXPIRATION="7d"

# Server
PORT=3001
NODE_ENV="development"

# CORS
CORS_ORIGIN="http://localhost:3000"

# Rate Limiting
RATE_LIMIT_TTL=60000
RATE_LIMIT_MAX=100
```

**⚠️ Tạo JWT_SECRET an toàn:**

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 4. Setup Database

#### Tạo database:

```sql
CREATE DATABASE ims_db;
```

#### Chạy migrations:

```bash
npm run prisma:migrate
```

#### Seed data:

```bash
npm run prisma:seed
```

**Seed data bao gồm:**
- 3 users (Admin, Manager, Staff)
- 5 categories
- 12 products
- 6 transactions

### 5. Start server

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

**Server chạy tại:**
- API: http://localhost:3001
- Swagger Docs: http://localhost:3001/api/docs

---

## 📜 Scripts

```bash
# Development
npm run start:dev          # Start with hot reload
npm run start:debug        # Start with debugger

# Build
npm run build              # Build for production
npm run start:prod         # Run production build

# Database
npm run prisma:generate    # Generate Prisma Client
npm run prisma:migrate     # Run migrations
npm run prisma:seed        # Seed database
npm run prisma:studio      # Open Prisma Studio
npm run prisma:reset       # Reset database (⚠️ deletes all data)

# Code Quality
npm run lint               # Run ESLint
npm run format             # Format with Prettier

# Testing
npm run test               # Run unit tests
npm run test:watch         # Run tests in watch mode
npm run test:cov           # Run tests with coverage
npm run test:e2e           # Run E2E tests
```

---

## 🔌 API Endpoints

### Base URL

```
http://localhost:3001/api/v1
```

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/login` | Login | Public |
| POST | `/auth/register` | Register user | Admin |
| GET | `/auth/me` | Get current user | JWT |

### Users

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/users` | Get all users | Admin |
| GET | `/users/:id` | Get user by ID | Admin |

### Products

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/products` | Get all products | JWT |
| GET | `/products/:id` | Get product by ID | JWT |
| POST | `/products` | Create product | Admin |
| PATCH | `/products/:id` | Update product | Admin |
| DELETE | `/products/:id` | Delete product | Admin |

### Inventory

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/inventory/stock-in` | Record stock in | Staff+ |
| POST | `/inventory/stock-out` | Record stock out | Staff+ |
| GET | `/inventory/transactions` | Get transactions | JWT |

### Reports

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/reports/dashboard` | Dashboard metrics | Manager+ |
| GET | `/reports/revenue` | Revenue report | Manager+ |
| GET | `/reports/inventory` | Inventory report | Manager+ |

**📚 Full API Documentation:** http://localhost:3001/api/docs

---

## 🔐 Authentication

### JWT Flow

```
1. User login với email + password
   ↓
2. Server verify credentials
   ↓
3. Server tạo JWT token
   Token = { sub: userId, email, role }
   ↓
4. Client lưu token
   ↓
5. Client gửi token trong header
   Authorization: Bearer <token>
   ↓
6. Server verify token với JWT_SECRET
```

### Role-Based Access Control (RBAC)

#### Roles:

- **ADMIN**: Full access
- **MANAGER**: Read + Reports
- **STAFF**: Read + Stock transactions

#### Sử dụng Guards:

```typescript
@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
  
  @Get()
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF)
  findAll() {
    // All authenticated users
  }

  @Post()
  @Roles(Role.ADMIN)
  create() {
    // Admin only
  }
}
```

### Login Credentials (sau khi seed)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@ims.com | Admin@123 |
| Manager | manager@ims.com | Manager@123 |
| Staff | staff@ims.com | Staff@123 |

---

## 🗄️ Database

### Schema Overview

```
User (id, email, password, name, role, isActive)
  ↓ 1:N
Transaction (id, type, quantity, productId, userId)
  ↓ N:1
Product (id, name, sku, price, stock, categoryId)
  ↓ N:1
Category (id, name)
```

### Prisma Commands

```bash
# Generate Prisma Client
npm run prisma:generate

# Create migration
npm run prisma:migrate

# View database
npm run prisma:studio
# Opens at http://localhost:5555

# Reset database (⚠️ deletes all data)
npm run prisma:reset
```

### Common Queries

```typescript
// Get all products with category
const products = await prisma.product.findMany({
  where: { deletedAt: null },
  include: { category: true },
});

// Get low stock products
const lowStock = await prisma.product.findMany({
  where: {
    deletedAt: null,
    stock: { lte: prisma.product.fields.reorderLevel },
  },
});

// Create transaction with stock update
await prisma.$transaction(async (tx) => {
  const transaction = await tx.transaction.create({
    data: { type: 'STOCK_IN', quantity: 50, productId, userId },
  });
  
  await tx.product.update({
    where: { id: productId },
    data: { stock: { increment: 50 } },
  });
  
  return transaction;
});
```

---

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

### E2E Tests

```bash
npm run test:e2e
```

### Coverage

```bash
npm run test:cov
```

**Target:** 70%+ coverage

### Example Test

```typescript
describe('AuthService', () => {
  it('should login with valid credentials', async () => {
    const result = await authService.login({
      email: 'admin@ims.com',
      password: 'Admin@123',
    });
    
    expect(result).toHaveProperty('accessToken');
    expect(result.user.email).toBe('admin@ims.com');
  });
});
```

---

## 🚀 Deployment

### Railway

1. Push code to GitHub
2. Connect repository to Railway
3. Add PostgreSQL addon
4. Set environment variables:
   ```
   DATABASE_URL=<from Railway>
   JWT_SECRET=<your-secret>
   NODE_ENV=production
   ```
4. Deploy

### Render

1. Push code to GitHub
2. Create new Web Service
3. Connect repository
4. Build command: `npm install && npm run build`
5. Start command: `npm run start:prod`
6. Add environment variables
7. Deploy

### Environment Variables (Production)

```env
DATABASE_URL="postgresql://..."
JWT_SECRET="<strong-random-secret>"
JWT_EXPIRATION="7d"
PORT=3001
NODE_ENV="production"
CORS_ORIGIN="https://your-frontend.vercel.app"
```

---

## 🐛 Troubleshooting

### Database connection error

**Problem:** `Can't reach database server`

**Solution:**
```bash
# Check PostgreSQL is running
pg_ctl status

# Verify DATABASE_URL
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL
```

### Prisma Client not found

**Problem:** `Cannot find module '@prisma/client'`

**Solution:**
```bash
npm run prisma:generate
```

### Port already in use

**Problem:** `Port 3001 is already in use`

**Solution:**
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Or change PORT in .env
PORT=3002
```

### Migration failed

**Problem:** Migration conflicts

**Solution:**
```bash
# Reset database (⚠️ deletes all data)
npm run prisma:reset

# Or resolve conflicts manually
npm run prisma:migrate resolve
```

---

## 📚 Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [JWT.io](https://jwt.io)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes
3. Run tests: `npm run test`
4. Run linter: `npm run lint`
5. Commit: `git commit -m "feat: add my feature"`
6. Push: `git push origin feature/my-feature`

---

## 📝 Notes

- **Password hashing**: Bcrypt with 10 rounds
- **JWT expiration**: 7 days (configurable)
- **Rate limiting**: 100 requests/minute
- **CORS**: Configured for frontend origin
- **Soft delete**: Products use `deletedAt` field

---

**Need help?** Check the main [README](../../README.md) or open an issue.
