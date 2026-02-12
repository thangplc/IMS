# Database Schema - IMS

## 📊 Entity Relationship Diagram (ERD)

```
┌─────────────────┐
│      User       │
├─────────────────┤
│ id (PK)         │
│ email (UQ)      │
│ password        │
│ name            │
│ role (ENUM)     │
│ isActive        │
│ createdAt       │
│ updatedAt       │
└────────┬────────┘
         │ 1
         │
         │ N
         │
┌────────▼────────┐       N        ┌─────────────────┐
│  Transaction    │◄────────────────┤    Product      │
├─────────────────┤                 ├─────────────────┤
│ id (PK)         │                 │ id (PK)         │
│ type (ENUM)     │                 │ name            │
│ quantity        │                 │ sku (UQ)        │
│ unitPrice       │                 │ description     │
│ notes           │                 │ price           │
│ supplier        │                 │ stock           │
│ customer        │                 │ unit            │
│ productId (FK)  │                 │ reorderLevel    │
│ userId (FK)     │                 │ barcode         │
│ createdAt       │                 │ qrCode          │
└─────────────────┘                 │ imageUrl        │
                                    │ categoryId (FK) │
                                    │ createdAt       │
                                    │ updatedAt       │
                                    │ deletedAt       │
                                    └────────┬────────┘
                                             │ N
                                             │
                                             │ 1
                                             │
                                    ┌────────▼────────┐
                                    │    Category     │
                                    ├─────────────────┤
                                    │ id (PK)         │
                                    │ name (UQ)       │
                                    │ createdAt       │
                                    │ updatedAt       │
                                    └─────────────────┘
```

---

## 🗂️ Complete Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================================================
// ENUMS
// ============================================================================

enum Role {
  ADMIN
  MANAGER
  STAFF
}

enum TransactionType {
  STOCK_IN
  STOCK_OUT
}

enum ProductStatus {
  IN_STOCK
  LOW_STOCK
  OUT_OF_STOCK
}

// ============================================================================
// MODELS
// ============================================================================

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String   // Bcrypt hashed
  name      String
  role      Role     @default(STAFF)
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations
  transactions Transaction[]
  
  // Indexes
  @@index([email])
  @@index([role])
  @@map("users")
}

model Category {
  id          String    @id @default(uuid())
  name        String    @unique
  description String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  // Relations
  products Product[]
  
  // Indexes
  @@index([name])
  @@map("categories")
}

model Product {
  id           String    @id @default(uuid())
  name         String
  sku          String    @unique
  description  String?   @db.Text
  price        Decimal   @db.Decimal(10, 2)
  stock        Int       @default(0)
  unit         String    @default("pcs")
  reorderLevel Int       @default(10)
  barcode      String?
  qrCode       String?   // URL to QR code image
  imageUrl     String?
  categoryId   String
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  deletedAt    DateTime? // Soft delete
  
  // Relations
  category     Category      @relation(fields: [categoryId], references: [id], onDelete: Restrict)
  transactions Transaction[]
  
  // Indexes
  @@index([sku])
  @@index([categoryId])
  @@index([stock])
  @@index([deletedAt])
  @@map("products")
}

model Transaction {
  id        String          @id @default(uuid())
  type      TransactionType
  quantity  Int
  unitPrice Decimal?        @db.Decimal(10, 2)
  notes     String?         @db.Text
  supplier  String?
  customer  String?
  productId String
  userId    String
  createdAt DateTime        @default(now())
  
  // Relations
  product Product @relation(fields: [productId], references: [id], onDelete: Restrict)
  user    User    @relation(fields: [userId], references: [id], onDelete: Restrict)
  
  // Indexes
  @@index([productId])
  @@index([userId])
  @@index([type])
  @@index([createdAt])
  @@map("transactions")
}
```

---

## 📋 Table Details

### 1. Users Table

**Purpose:** Store user accounts and authentication info

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Login email |
| password | VARCHAR(255) | NOT NULL | Bcrypt hashed password |
| name | VARCHAR(255) | NOT NULL | Full name |
| role | ENUM | NOT NULL, DEFAULT 'STAFF' | User role (ADMIN/MANAGER/STAFF) |
| isActive | BOOLEAN | DEFAULT true | Account status |
| createdAt | TIMESTAMP | DEFAULT now() | Account creation time |
| updatedAt | TIMESTAMP | AUTO UPDATE | Last update time |

**Indexes:**
- `users_email_idx` on `email` (for login queries)
- `users_role_idx` on `role` (for filtering by role)

**Sample Data:**
```sql
INSERT INTO users (id, email, password, name, role) VALUES
('uuid-1', 'admin@ims.com', '$2b$10$...', 'Admin User', 'ADMIN'),
('uuid-2', 'manager@ims.com', '$2b$10$...', 'Manager User', 'MANAGER'),
('uuid-3', 'staff@ims.com', '$2b$10$...', 'Staff User', 'STAFF');
```

---

### 2. Categories Table

**Purpose:** Organize products into categories

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| name | VARCHAR(100) | UNIQUE, NOT NULL | Category name |
| description | TEXT | NULLABLE | Category description |
| createdAt | TIMESTAMP | DEFAULT now() | Creation time |
| updatedAt | TIMESTAMP | AUTO UPDATE | Last update time |

**Indexes:**
- `categories_name_idx` on `name` (for search)

**Sample Data:**
```sql
INSERT INTO categories (id, name) VALUES
('cat-1', 'Electronics'),
('cat-2', 'Clothing'),
('cat-3', 'Food & Beverage'),
('cat-4', 'Furniture'),
('cat-5', 'Stationery');
```

---

### 3. Products Table

**Purpose:** Store product information and inventory levels

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| name | VARCHAR(200) | NOT NULL | Product name |
| sku | VARCHAR(50) | UNIQUE, NOT NULL | Stock Keeping Unit |
| description | TEXT | NULLABLE | Product description |
| price | DECIMAL(10,2) | NOT NULL | Unit price |
| stock | INTEGER | DEFAULT 0 | Current stock level |
| unit | VARCHAR(20) | DEFAULT 'pcs' | Unit of measurement |
| reorderLevel | INTEGER | DEFAULT 10 | Low stock threshold |
| barcode | VARCHAR(255) | NULLABLE | Barcode string |
| qrCode | VARCHAR(255) | NULLABLE | QR code image URL |
| imageUrl | VARCHAR(255) | NULLABLE | Product image URL |
| categoryId | UUID | FOREIGN KEY | Reference to category |
| createdAt | TIMESTAMP | DEFAULT now() | Creation time |
| updatedAt | TIMESTAMP | AUTO UPDATE | Last update time |
| deletedAt | TIMESTAMP | NULLABLE | Soft delete timestamp |

**Indexes:**
- `products_sku_idx` on `sku` (for search)
- `products_categoryId_idx` on `categoryId` (for filtering)
- `products_stock_idx` on `stock` (for low stock queries)
- `products_deletedAt_idx` on `deletedAt` (for filtering active products)

**Constraints:**
- `price >= 0`
- `stock >= 0`
- `reorderLevel >= 0`

**Sample Data:**
```sql
INSERT INTO products (id, name, sku, categoryId, price, stock, reorderLevel) VALUES
('prod-1', 'Laptop Dell XPS 13', 'ELEC-001', 'cat-1', 1299.99, 50, 10),
('prod-2', 'T-Shirt Blue M', 'CLO-001', 'cat-2', 19.99, 100, 20),
('prod-3', 'Coffee Beans 1kg', 'FOOD-001', 'cat-3', 24.99, 200, 50);
```

---

### 4. Transactions Table

**Purpose:** Record all inventory movements (stock in/out)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| type | ENUM | NOT NULL | STOCK_IN or STOCK_OUT |
| quantity | INTEGER | NOT NULL | Quantity moved |
| unitPrice | DECIMAL(10,2) | NULLABLE | Price per unit (for costing) |
| notes | TEXT | NULLABLE | Additional notes |
| supplier | VARCHAR(255) | NULLABLE | Supplier name (for stock in) |
| customer | VARCHAR(255) | NULLABLE | Customer name (for stock out) |
| productId | UUID | FOREIGN KEY | Reference to product |
| userId | UUID | FOREIGN KEY | User who created transaction |
| createdAt | TIMESTAMP | DEFAULT now() | Transaction time |

**Indexes:**
- `transactions_productId_idx` on `productId` (for product history)
- `transactions_userId_idx` on `userId` (for user activity)
- `transactions_type_idx` on `type` (for filtering)
- `transactions_createdAt_idx` on `createdAt` (for date range queries)

**Constraints:**
- `quantity > 0`

**Sample Data:**
```sql
INSERT INTO transactions (id, type, quantity, productId, userId, supplier) VALUES
('trans-1', 'STOCK_IN', 50, 'prod-1', 'uuid-3', 'Dell Supplier'),
('trans-2', 'STOCK_OUT', 5, 'prod-1', 'uuid-3', NULL);
```

---

## 🔍 Common Queries

### 1. Get All Active Products with Category
```typescript
const products = await prisma.product.findMany({
  where: { deletedAt: null },
  include: { category: true },
  orderBy: { name: 'asc' },
});
```

### 2. Get Low Stock Products
```typescript
const lowStockProducts = await prisma.product.findMany({
  where: {
    deletedAt: null,
    stock: { lte: prisma.product.fields.reorderLevel },
  },
  include: { category: true },
});
```

### 3. Get Product with Transaction History
```typescript
const product = await prisma.product.findUnique({
  where: { id: productId },
  include: {
    category: true,
    transactions: {
      include: { user: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
    },
  },
});
```

### 4. Create Stock In Transaction
```typescript
const transaction = await prisma.$transaction(async (tx) => {
  // Create transaction record
  const trans = await tx.transaction.create({
    data: {
      type: 'STOCK_IN',
      quantity: 50,
      productId: 'prod-1',
      userId: 'uuid-3',
      supplier: 'ABC Supplier',
    },
  });
  
  // Update product stock
  await tx.product.update({
    where: { id: 'prod-1' },
    data: { stock: { increment: 50 } },
  });
  
  return trans;
});
```

### 5. Get Revenue Report (Last 30 Days)
```typescript
const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

const revenue = await prisma.transaction.groupBy({
  by: ['createdAt'],
  where: {
    type: 'STOCK_OUT',
    createdAt: { gte: thirtyDaysAgo },
  },
  _sum: {
    quantity: true,
  },
});
```

### 6. Get Top Selling Products
```typescript
const topProducts = await prisma.transaction.groupBy({
  by: ['productId'],
  where: { type: 'STOCK_OUT' },
  _sum: { quantity: true },
  orderBy: { _sum: { quantity: 'desc' } },
  take: 10,
});
```

### 7. Get User Activity
```typescript
const userActivity = await prisma.transaction.findMany({
  where: { userId: 'uuid-3' },
  include: {
    product: { select: { name: true, sku: true } },
  },
  orderBy: { createdAt: 'desc' },
  take: 20,
});
```

---

## 🔐 Database Security

### 1. Row-Level Security (Future)
```sql
-- Example: Staff can only see their own transactions
CREATE POLICY staff_transactions ON transactions
  FOR SELECT
  USING (user_id = current_user_id() OR current_user_role() IN ('ADMIN', 'MANAGER'));
```

### 2. Encryption
- Passwords: Bcrypt with 10 rounds
- Sensitive data: Consider encrypting at application level

### 3. Backup Strategy
- Daily automated backups
- Point-in-time recovery enabled
- Backup retention: 30 days

---

## 📈 Performance Optimization

### 1. Indexing Strategy
```sql
-- Most important indexes
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_stock ON products(stock);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);
CREATE INDEX idx_transactions_product_id ON transactions(product_id);
```

### 2. Query Optimization
- Use `select` to fetch only needed fields
- Use `include` instead of multiple queries
- Implement pagination for large datasets
- Use database transactions for consistency

### 3. Connection Pooling
```typescript
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  // Connection pool settings
  // ?connection_limit=10&pool_timeout=20
}
```

---

## 🌱 Seed Data

```typescript
// prisma/seed.ts
import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create users
  const admin = await prisma.user.create({
    data: {
      email: 'admin@ims.com',
      password: await bcrypt.hash('Admin@123', 10),
      name: 'Admin User',
      role: Role.ADMIN,
    },
  });

  const manager = await prisma.user.create({
    data: {
      email: 'manager@ims.com',
      password: await bcrypt.hash('Manager@123', 10),
      name: 'Manager User',
      role: Role.MANAGER,
    },
  });

  const staff = await prisma.user.create({
    data: {
      email: 'staff@ims.com',
      password: await bcrypt.hash('Staff@123', 10),
      name: 'Staff User',
      role: Role.STAFF,
    },
  });

  // Create categories
  const electronics = await prisma.category.create({
    data: { name: 'Electronics' },
  });

  const clothing = await prisma.category.create({
    data: { name: 'Clothing' },
  });

  const food = await prisma.category.create({
    data: { name: 'Food & Beverage' },
  });

  // Create products
  const laptop = await prisma.product.create({
    data: {
      name: 'Laptop Dell XPS 13',
      sku: 'ELEC-001',
      description: 'High-performance laptop',
      price: 1299.99,
      stock: 50,
      unit: 'pcs',
      reorderLevel: 10,
      categoryId: electronics.id,
    },
  });

  const tshirt = await prisma.product.create({
    data: {
      name: 'T-Shirt Blue M',
      sku: 'CLO-001',
      description: 'Cotton t-shirt',
      price: 19.99,
      stock: 100,
      unit: 'pcs',
      reorderLevel: 20,
      categoryId: clothing.id,
    },
  });

  // Create transactions
  await prisma.transaction.create({
    data: {
      type: 'STOCK_IN',
      quantity: 50,
      unitPrice: 1200,
      supplier: 'Dell Supplier',
      productId: laptop.id,
      userId: staff.id,
    },
  });

  await prisma.transaction.create({
    data: {
      type: 'STOCK_OUT',
      quantity: 5,
      customer: 'John Doe',
      productId: laptop.id,
      userId: staff.id,
    },
  });

  console.log('✅ Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

**Run seed:**
```bash
npx prisma db seed
```

---

## 🔄 Migration Strategy

### 1. Initial Migration
```bash
# Create migration
npx prisma migrate dev --name init

# Apply migration
npx prisma migrate deploy
```

### 2. Schema Changes
```bash
# After modifying schema.prisma
npx prisma migrate dev --name add_product_image

# Generate Prisma Client
npx prisma generate
```

### 3. Reset Database (Development)
```bash
npx prisma migrate reset
```

---

## 📊 Database Statistics

### Expected Data Volume (Year 1)

| Table | Estimated Rows | Growth Rate |
|-------|----------------|-------------|
| Users | 50 | Low |
| Categories | 20 | Low |
| Products | 1,000 | Medium |
| Transactions | 50,000 | High (150/day) |

### Storage Estimate
- Products: ~1 MB
- Transactions: ~50 MB (with indexes)
- Total: ~100 MB (Year 1)

---

## 🎓 Best Practices

### 1. Always Use Transactions for Multi-Step Operations
```typescript
await prisma.$transaction(async (tx) => {
  // Multiple operations here
});
```

### 2. Soft Delete Instead of Hard Delete
```typescript
await prisma.product.update({
  where: { id },
  data: { deletedAt: new Date() },
});
```

### 3. Use Enums for Fixed Values
```prisma
enum Role {
  ADMIN
  MANAGER
  STAFF
}
```

### 4. Add Timestamps to All Tables
```prisma
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
```

### 5. Use Descriptive Field Names
```prisma
// ✅ Good
reorderLevel Int

// ❌ Bad
rol Int
```

---

## 🔗 References

- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [PostgreSQL Best Practices](https://wiki.postgresql.org/wiki/Don%27t_Do_This)
- [Database Indexing Guide](https://use-the-index-luke.com/)
