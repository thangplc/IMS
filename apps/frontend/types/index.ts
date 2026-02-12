export enum Role {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  STAFF = 'STAFF',
}

export enum TransactionType {
  STOCK_IN = 'STOCK_IN',
  STOCK_OUT = 'STOCK_OUT',
}

export interface User {
  id: string
  email: string
  name: string
  role: Role
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface Product {
  id: string
  name: string
  sku: string
  description?: string
  price: number
  stock: number
  unit: string
  reorderLevel: number
  barcode?: string
  qrCode?: string
  imageUrl?: string
  categoryId: string
  category?: Category
  createdAt: string
  updatedAt: string
  deletedAt?: string
}

export interface Transaction {
  id: string
  type: TransactionType
  quantity: number
  unitPrice?: number
  notes?: string
  supplier?: string
  customer?: string
  productId: string
  product?: Product
  userId: string
  user?: User
  createdAt: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  user: User
}

export interface ApiResponse<T> {
  data: T
  meta?: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}
