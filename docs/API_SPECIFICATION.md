# API Specification - IMS

## 📋 Overview

**Base URL:** `https://api.yourapp.com/api/v1`  
**Protocol:** HTTPS  
**Format:** JSON  
**Authentication:** JWT Bearer Token

---

## 🔐 Authentication

### POST /auth/login
Login with email and password

**Request:**
```json
{
  "email": "admin@ims.com",
  "password": "Admin@123"
}
```

**Response (200):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "admin@ims.com",
    "name": "Admin User",
    "role": "ADMIN"
  }
}
```

**Errors:**
- `401 Unauthorized` - Invalid credentials
- `400 Bad Request` - Missing fields

---

### POST /auth/register
Register new user (Admin only)

**Headers:**
```
Authorization: Bearer {token}
```

**Request:**
```json
{
  "email": "newuser@ims.com",
  "password": "Password@123",
  "name": "New User",
  "role": "STAFF"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "email": "newuser@ims.com",
  "name": "New User",
  "role": "STAFF",
  "createdAt": "2026-02-12T10:00:00Z"
}
```

**Errors:**
- `403 Forbidden` - Not admin
- `409 Conflict` - Email already exists
- `400 Bad Request` - Invalid data

---

### POST /auth/refresh
Refresh access token

**Request:**
```json
{
  "refreshToken": "refresh_token_here"
}
```

**Response (200):**
```json
{
  "accessToken": "new_access_token"
}
```

---

### GET /auth/me
Get current user info

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "id": "uuid",
  "email": "admin@ims.com",
  "name": "Admin User",
  "role": "ADMIN",
  "createdAt": "2026-01-01T00:00:00Z"
}
```

---

## 👤 Users

### GET /users
Get all users (Admin only)

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 20)
- `role` (string, optional: ADMIN|MANAGER|STAFF)
- `search` (string, optional)

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "email": "admin@ims.com",
      "name": "Admin User",
      "role": "ADMIN",
      "isActive": true,
      "createdAt": "2026-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "total": 50,
    "page": 1,
    "limit": 20,
    "totalPages": 3
  }
}
```

---

### GET /users/:id
Get user by ID (Admin only)

**Response (200):**
```json
{
  "id": "uuid",
  "email": "admin@ims.com",
  "name": "Admin User",
  "role": "ADMIN",
  "isActive": true,
  "createdAt": "2026-01-01T00:00:00Z",
  "updatedAt": "2026-02-12T10:00:00Z"
}
```

---

### PATCH /users/:id
Update user (Admin only)

**Request:**
```json
{
  "name": "Updated Name",
  "role": "MANAGER",
  "isActive": false
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "email": "user@ims.com",
  "name": "Updated Name",
  "role": "MANAGER",
  "isActive": false,
  "updatedAt": "2026-02-12T10:00:00Z"
}
```

---

### DELETE /users/:id
Deactivate user (Admin only)

**Response (200):**
```json
{
  "message": "User deactivated successfully"
}
```

---

## 📦 Products

### GET /products
Get all products

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 20)
- `search` (string, optional) - Search by name/SKU
- `categoryId` (string, optional)
- `status` (string, optional: IN_STOCK|LOW_STOCK|OUT_OF_STOCK)
- `sortBy` (string, optional: name|price|stock)
- `sortOrder` (string, optional: asc|desc)

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Laptop Dell XPS 13",
      "sku": "ELEC-001",
      "description": "High-performance laptop",
      "price": 1299.99,
      "stock": 50,
      "unit": "pcs",
      "reorderLevel": 10,
      "status": "IN_STOCK",
      "barcode": "123456789",
      "qrCode": "https://cloudinary.com/qr/uuid.png",
      "imageUrl": "https://cloudinary.com/products/uuid.jpg",
      "category": {
        "id": "cat-uuid",
        "name": "Electronics"
      },
      "createdAt": "2026-01-01T00:00:00Z",
      "updatedAt": "2026-02-12T10:00:00Z"
    }
  ],
  "meta": {
    "total": 1000,
    "page": 1,
    "limit": 20,
    "totalPages": 50
  }
}
```

---

### GET /products/:id
Get product by ID

**Response (200):**
```json
{
  "id": "uuid",
  "name": "Laptop Dell XPS 13",
  "sku": "ELEC-001",
  "description": "High-performance laptop",
  "price": 1299.99,
  "stock": 50,
  "unit": "pcs",
  "reorderLevel": 10,
  "status": "IN_STOCK",
  "barcode": "123456789",
  "qrCode": "https://cloudinary.com/qr/uuid.png",
  "imageUrl": "https://cloudinary.com/products/uuid.jpg",
  "category": {
    "id": "cat-uuid",
    "name": "Electronics"
  },
  "transactions": [
    {
      "id": "trans-uuid",
      "type": "STOCK_IN",
      "quantity": 50,
      "user": {
        "name": "Staff User"
      },
      "createdAt": "2026-02-10T10:00:00Z"
    }
  ],
  "createdAt": "2026-01-01T00:00:00Z",
  "updatedAt": "2026-02-12T10:00:00Z"
}
```

---

### POST /products
Create product (Admin only)

**Request:**
```json
{
  "name": "Laptop Dell XPS 13",
  "sku": "ELEC-001",
  "description": "High-performance laptop",
  "price": 1299.99,
  "stock": 50,
  "unit": "pcs",
  "reorderLevel": 10,
  "categoryId": "cat-uuid",
  "imageUrl": "https://cloudinary.com/products/uuid.jpg"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "name": "Laptop Dell XPS 13",
  "sku": "ELEC-001",
  "description": "High-performance laptop",
  "price": 1299.99,
  "stock": 50,
  "unit": "pcs",
  "reorderLevel": 10,
  "barcode": "auto-generated",
  "qrCode": "https://cloudinary.com/qr/uuid.png",
  "imageUrl": "https://cloudinary.com/products/uuid.jpg",
  "categoryId": "cat-uuid",
  "createdAt": "2026-02-12T10:00:00Z"
}
```

**Errors:**
- `403 Forbidden` - Not admin
- `409 Conflict` - SKU already exists
- `400 Bad Request` - Invalid data

---

### PATCH /products/:id
Update product (Admin only)

**Request:**
```json
{
  "name": "Updated Product Name",
  "price": 1399.99,
  "reorderLevel": 15
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "name": "Updated Product Name",
  "price": 1399.99,
  "reorderLevel": 15,
  "updatedAt": "2026-02-12T10:00:00Z"
}
```

---

### DELETE /products/:id
Soft delete product (Admin only)

**Response (200):**
```json
{
  "message": "Product deleted successfully"
}
```

**Errors:**
- `400 Bad Request` - Cannot delete product with stock > 0

---

### GET /products/:id/qr
Get QR code image

**Response (200):**
```
Content-Type: image/png
[QR Code Image Binary]
```

---

### GET /products/low-stock
Get low stock products

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Product Name",
      "sku": "SKU-001",
      "stock": 5,
      "reorderLevel": 10,
      "status": "LOW_STOCK"
    }
  ]
}
```

---

## 📂 Categories

### GET /categories
Get all categories

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Electronics",
      "description": "Electronic products",
      "productCount": 150,
      "createdAt": "2026-01-01T00:00:00Z"
    }
  ]
}
```

---

### POST /categories
Create category (Admin only)

**Request:**
```json
{
  "name": "New Category",
  "description": "Category description"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "name": "New Category",
  "description": "Category description",
  "createdAt": "2026-02-12T10:00:00Z"
}
```

---

### PATCH /categories/:id
Update category (Admin only)

**Request:**
```json
{
  "name": "Updated Category Name"
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "name": "Updated Category Name",
  "updatedAt": "2026-02-12T10:00:00Z"
}
```

---

### DELETE /categories/:id
Delete category (Admin only)

**Response (200):**
```json
{
  "message": "Category deleted successfully"
}
```

**Errors:**
- `400 Bad Request` - Cannot delete category with products

---

## 📊 Inventory

### POST /inventory/stock-in
Record stock in (Staff+)

**Request:**
```json
{
  "productId": "uuid",
  "quantity": 50,
  "unitPrice": 1200.00,
  "supplier": "Dell Supplier",
  "notes": "Monthly restock"
}
```

**Response (201):**
```json
{
  "id": "trans-uuid",
  "type": "STOCK_IN",
  "quantity": 50,
  "unitPrice": 1200.00,
  "supplier": "Dell Supplier",
  "notes": "Monthly restock",
  "product": {
    "id": "uuid",
    "name": "Laptop Dell XPS 13",
    "sku": "ELEC-001",
    "stock": 100
  },
  "user": {
    "id": "user-uuid",
    "name": "Staff User"
  },
  "createdAt": "2026-02-12T10:00:00Z"
}
```

---

### POST /inventory/stock-out
Record stock out (Staff+)

**Request:**
```json
{
  "productId": "uuid",
  "quantity": 5,
  "customer": "John Doe",
  "notes": "Sale #12345"
}
```

**Response (201):**
```json
{
  "id": "trans-uuid",
  "type": "STOCK_OUT",
  "quantity": 5,
  "customer": "John Doe",
  "notes": "Sale #12345",
  "product": {
    "id": "uuid",
    "name": "Laptop Dell XPS 13",
    "sku": "ELEC-001",
    "stock": 95
  },
  "user": {
    "id": "user-uuid",
    "name": "Staff User"
  },
  "createdAt": "2026-02-12T10:00:00Z"
}
```

**Errors:**
- `400 Bad Request` - Insufficient stock
- `400 Bad Request` - Quantity must be positive

---

### GET /inventory/transactions
Get transaction history

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 20)
- `type` (string, optional: STOCK_IN|STOCK_OUT)
- `productId` (string, optional)
- `userId` (string, optional)
- `startDate` (ISO date, optional)
- `endDate` (ISO date, optional)

**Response (200):**
```json
{
  "data": [
    {
      "id": "trans-uuid",
      "type": "STOCK_IN",
      "quantity": 50,
      "unitPrice": 1200.00,
      "supplier": "Dell Supplier",
      "notes": "Monthly restock",
      "product": {
        "id": "uuid",
        "name": "Laptop Dell XPS 13",
        "sku": "ELEC-001"
      },
      "user": {
        "id": "user-uuid",
        "name": "Staff User"
      },
      "createdAt": "2026-02-12T10:00:00Z"
    }
  ],
  "meta": {
    "total": 5000,
    "page": 1,
    "limit": 20,
    "totalPages": 250
  }
}
```

---

### GET /inventory/transactions/:id
Get transaction detail

**Response (200):**
```json
{
  "id": "trans-uuid",
  "type": "STOCK_IN",
  "quantity": 50,
  "unitPrice": 1200.00,
  "supplier": "Dell Supplier",
  "notes": "Monthly restock",
  "product": {
    "id": "uuid",
    "name": "Laptop Dell XPS 13",
    "sku": "ELEC-001",
    "imageUrl": "https://cloudinary.com/products/uuid.jpg"
  },
  "user": {
    "id": "user-uuid",
    "name": "Staff User",
    "email": "staff@ims.com"
  },
  "createdAt": "2026-02-12T10:00:00Z"
}
```

---

## 📈 Reports

### GET /reports/dashboard
Get dashboard metrics (Manager+)

**Response (200):**
```json
{
  "summary": {
    "totalProducts": 1000,
    "totalStockValue": 125000.50,
    "lowStockCount": 15,
    "todayTransactions": 25
  },
  "revenueChart": {
    "labels": ["2026-02-01", "2026-02-02", "..."],
    "data": [1500, 2300, 1800, "..."]
  },
  "stockDistribution": {
    "labels": ["Electronics", "Clothing", "Food"],
    "data": [45, 30, 25]
  },
  "topProducts": [
    {
      "id": "uuid",
      "name": "Laptop Dell XPS 13",
      "totalSold": 150,
      "revenue": 194998.50
    }
  ],
  "recentTransactions": [
    {
      "id": "trans-uuid",
      "type": "STOCK_OUT",
      "quantity": 5,
      "product": { "name": "Laptop Dell XPS 13" },
      "user": { "name": "Staff User" },
      "createdAt": "2026-02-12T10:00:00Z"
    }
  ]
}
```

---

### GET /reports/revenue
Get revenue report (Manager+)

**Query Parameters:**
- `startDate` (ISO date, required)
- `endDate` (ISO date, required)
- `groupBy` (string, optional: day|week|month, default: day)

**Response (200):**
```json
{
  "period": {
    "startDate": "2026-02-01",
    "endDate": "2026-02-12"
  },
  "summary": {
    "totalRevenue": 50000.00,
    "totalTransactions": 250,
    "averageOrderValue": 200.00
  },
  "chart": {
    "labels": ["2026-02-01", "2026-02-02", "..."],
    "data": [1500, 2300, 1800, "..."]
  },
  "topProducts": [
    {
      "id": "uuid",
      "name": "Laptop Dell XPS 13",
      "sku": "ELEC-001",
      "totalSold": 50,
      "revenue": 64999.50
    }
  ],
  "byCategory": [
    {
      "category": "Electronics",
      "revenue": 35000.00,
      "percentage": 70
    }
  ]
}
```

---

### GET /reports/inventory
Get inventory report (Manager+)

**Query Parameters:**
- `categoryId` (string, optional)
- `status` (string, optional: IN_STOCK|LOW_STOCK|OUT_OF_STOCK)

**Response (200):**
```json
{
  "summary": {
    "totalProducts": 1000,
    "totalStockValue": 125000.50,
    "inStock": 850,
    "lowStock": 100,
    "outOfStock": 50
  },
  "products": [
    {
      "id": "uuid",
      "name": "Laptop Dell XPS 13",
      "sku": "ELEC-001",
      "stock": 50,
      "stockValue": 64999.50,
      "status": "IN_STOCK",
      "lastTransaction": "2026-02-10T10:00:00Z"
    }
  ]
}
```

---

### POST /reports/export-pdf
Export report as PDF (Manager+)

**Request:**
```json
{
  "reportType": "revenue",
  "startDate": "2026-02-01",
  "endDate": "2026-02-12"
}
```

**Response (200):**
```
Content-Type: application/pdf
Content-Disposition: attachment; filename="revenue_report_20260212.pdf"
[PDF Binary]
```

---

## 📁 Files

### POST /files/import-products
Import products from CSV (Admin only)

**Request:**
```
Content-Type: multipart/form-data

file: [CSV File]
```

**CSV Format:**
```csv
name,sku,category,price,stock,unit,reorderLevel,description
Product A,SKU001,Electronics,99.99,100,pcs,20,Description here
Product B,SKU002,Clothing,49.99,50,pcs,10,Another description
```

**Response (200):**
```json
{
  "summary": {
    "total": 100,
    "created": 95,
    "failed": 5
  },
  "errors": [
    {
      "row": 10,
      "sku": "SKU010",
      "error": "SKU already exists"
    }
  ]
}
```

---

### GET /files/export-products
Export products to CSV (Manager+)

**Query Parameters:**
- `categoryId` (string, optional)

**Response (200):**
```
Content-Type: text/csv
Content-Disposition: attachment; filename="products_20260212.csv"

name,sku,category,price,stock,unit,reorderLevel
Laptop Dell XPS 13,ELEC-001,Electronics,1299.99,50,pcs,10
```

---

### POST /files/upload-image
Upload product image (Admin only)

**Request:**
```
Content-Type: multipart/form-data

file: [Image File]
```

**Response (200):**
```json
{
  "url": "https://cloudinary.com/products/uuid.jpg",
  "publicId": "products/uuid"
}
```

---

## 🔔 Notifications (Future)

### GET /notifications
Get user notifications

**Response (200):**
```json
{
  "data": [
    {
      "id": "notif-uuid",
      "type": "LOW_STOCK",
      "message": "Product 'Laptop Dell XPS 13' is running low",
      "isRead": false,
      "createdAt": "2026-02-12T10:00:00Z"
    }
  ],
  "unreadCount": 5
}
```

---

## 📊 Error Responses

### Standard Error Format
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### Common Status Codes
- `200 OK` - Success
- `201 Created` - Resource created
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not authorized
- `404 Not Found` - Resource not found
- `409 Conflict` - Duplicate resource
- `422 Unprocessable Entity` - Validation error
- `500 Internal Server Error` - Server error

---

## 🔒 Rate Limiting

**Limits:**
- 100 requests per minute per IP
- 1000 requests per hour per user

**Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1644667200
```

**Error (429):**
```json
{
  "statusCode": 429,
  "message": "Too many requests, please try again later"
}
```

---

## 📝 Pagination

**Standard Pagination:**
```
GET /products?page=2&limit=20
```

**Response:**
```json
{
  "data": [...],
  "meta": {
    "total": 1000,
    "page": 2,
    "limit": 20,
    "totalPages": 50,
    "hasNextPage": true,
    "hasPreviousPage": true
  }
}
```

---

## 🔍 Filtering & Sorting

**Filtering:**
```
GET /products?categoryId=uuid&status=LOW_STOCK
```

**Sorting:**
```
GET /products?sortBy=price&sortOrder=desc
```

**Search:**
```
GET /products?search=laptop
```

---

## 🧪 Testing Endpoints

### GET /health
Health check

**Response (200):**
```json
{
  "status": "ok",
  "timestamp": "2026-02-12T10:00:00Z",
  "database": "connected"
}
```

---

## 📚 Postman Collection

**Import this collection:**
```json
{
  "info": {
    "name": "IMS API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/auth/login",
            "body": {
              "mode": "raw",
              "raw": "{\"email\":\"admin@ims.com\",\"password\":\"Admin@123\"}"
            }
          }
        }
      ]
    }
  ]
}
```

---

## 🎓 Best Practices

### 1. Always Include Authorization Header
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. Use Query Parameters for Filtering
```
GET /products?categoryId=uuid&status=LOW_STOCK&page=1&limit=20
```

### 3. Handle Errors Gracefully
```typescript
try {
  const response = await api.get('/products');
} catch (error) {
  if (error.response.status === 401) {
    // Redirect to login
  }
}
```

### 4. Use Proper HTTP Methods
- `GET` - Read
- `POST` - Create
- `PATCH` - Partial update
- `PUT` - Full update
- `DELETE` - Delete

---

## 🔗 References

- [REST API Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://httpstatuses.com/)
- [JWT.io](https://jwt.io/)
