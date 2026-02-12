import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Clean existing data (in development only)
  await prisma.transaction.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Cleaned existing data');

  // ============================================================================
  // USERS
  // ============================================================================

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

  console.log('✅ Created users');

  // ============================================================================
  // CATEGORIES
  // ============================================================================

  const electronics = await prisma.category.create({
    data: {
      name: 'Electronics',
      description: 'Electronic devices and accessories',
    },
  });

  const clothing = await prisma.category.create({
    data: {
      name: 'Clothing',
      description: 'Apparel and fashion items',
    },
  });

  const food = await prisma.category.create({
    data: {
      name: 'Food & Beverage',
      description: 'Food and drink products',
    },
  });

  const furniture = await prisma.category.create({
    data: {
      name: 'Furniture',
      description: 'Home and office furniture',
    },
  });

  const stationery = await prisma.category.create({
    data: {
      name: 'Stationery',
      description: 'Office supplies and stationery',
    },
  });

  console.log('✅ Created categories');

  // ============================================================================
  // PRODUCTS
  // ============================================================================

  const laptop = await prisma.product.create({
    data: {
      name: 'Laptop Dell XPS 13',
      sku: 'ELEC-001',
      description:
        'High-performance laptop with Intel Core i7, 16GB RAM, 512GB SSD',
      price: 1299.99,
      stock: 50,
      unit: 'pcs',
      reorderLevel: 10,
      categoryId: electronics.id,
      barcode: '1234567890123',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?data=ELEC-001&size=300x300',
    },
  });

  const smartphone = await prisma.product.create({
    data: {
      name: 'iPhone 15 Pro',
      sku: 'ELEC-002',
      description: 'Latest iPhone with A17 Pro chip, 256GB storage',
      price: 999.99,
      stock: 30,
      unit: 'pcs',
      reorderLevel: 5,
      categoryId: electronics.id,
      barcode: '1234567890124',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?data=ELEC-002&size=300x300',
    },
  });

  const headphones = await prisma.product.create({
    data: {
      name: 'Sony WH-1000XM5',
      sku: 'ELEC-003',
      description: 'Wireless noise-cancelling headphones',
      price: 349.99,
      stock: 75,
      unit: 'pcs',
      reorderLevel: 15,
      categoryId: electronics.id,
      barcode: '1234567890125',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?data=ELEC-003&size=300x300',
    },
  });

  const tshirtBlue = await prisma.product.create({
    data: {
      name: 'T-Shirt Blue M',
      sku: 'CLO-001',
      description: '100% cotton t-shirt, medium size, blue color',
      price: 19.99,
      stock: 100,
      unit: 'pcs',
      reorderLevel: 20,
      categoryId: clothing.id,
      barcode: '1234567890126',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?data=CLO-001&size=300x300',
    },
  });

  const jeans = await prisma.product.create({
    data: {
      name: 'Jeans Slim Fit',
      sku: 'CLO-002',
      description: 'Slim fit jeans, size 32, dark blue',
      price: 49.99,
      stock: 60,
      unit: 'pcs',
      reorderLevel: 15,
      categoryId: clothing.id,
      barcode: '1234567890127',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?data=CLO-002&size=300x300',
    },
  });

  const coffee = await prisma.product.create({
    data: {
      name: 'Coffee Beans 1kg',
      sku: 'FOOD-001',
      description: 'Premium Arabica coffee beans, 1kg pack',
      price: 24.99,
      stock: 8,
      unit: 'kg',
      reorderLevel: 50,
      categoryId: food.id,
      barcode: '1234567890128',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?data=FOOD-001&size=300x300',
    },
  });

  const tea = await prisma.product.create({
    data: {
      name: 'Green Tea Box',
      sku: 'FOOD-002',
      description: 'Organic green tea, 100 tea bags',
      price: 12.99,
      stock: 150,
      unit: 'box',
      reorderLevel: 30,
      categoryId: food.id,
      barcode: '1234567890129',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?data=FOOD-002&size=300x300',
    },
  });

  const deskChair = await prisma.product.create({
    data: {
      name: 'Office Chair Ergonomic',
      sku: 'FURN-001',
      description: 'Ergonomic office chair with lumbar support',
      price: 299.99,
      stock: 25,
      unit: 'pcs',
      reorderLevel: 5,
      categoryId: furniture.id,
      barcode: '1234567890130',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?data=FURN-001&size=300x300',
    },
  });

  const desk = await prisma.product.create({
    data: {
      name: 'Standing Desk',
      sku: 'FURN-002',
      description: 'Adjustable height standing desk, 120x60cm',
      price: 449.99,
      stock: 15,
      unit: 'pcs',
      reorderLevel: 3,
      categoryId: furniture.id,
      barcode: '1234567890131',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?data=FURN-002&size=300x300',
    },
  });

  const notebook = await prisma.product.create({
    data: {
      name: 'Notebook A4',
      sku: 'STAT-001',
      description: 'A4 notebook, 200 pages, ruled',
      price: 4.99,
      stock: 300,
      unit: 'pcs',
      reorderLevel: 50,
      categoryId: stationery.id,
      barcode: '1234567890132',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?data=STAT-001&size=300x300',
    },
  });

  const pen = await prisma.product.create({
    data: {
      name: 'Ballpoint Pen Blue',
      sku: 'STAT-002',
      description: 'Blue ballpoint pen, pack of 10',
      price: 9.99,
      stock: 200,
      unit: 'pack',
      reorderLevel: 40,
      categoryId: stationery.id,
      barcode: '1234567890133',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?data=STAT-002&size=300x300',
    },
  });

  console.log('✅ Created products');

  // ============================================================================
  // TRANSACTIONS
  // ============================================================================

  // Stock In transactions
  await prisma.transaction.create({
    data: {
      type: 'STOCK_IN',
      quantity: 50,
      unitPrice: 1200.0,
      supplier: 'Dell Supplier',
      notes: 'Initial stock',
      productId: laptop.id,
      userId: staff.id,
    },
  });

  await prisma.transaction.create({
    data: {
      type: 'STOCK_IN',
      quantity: 100,
      unitPrice: 15.0,
      supplier: 'Fashion Wholesale',
      notes: 'Monthly restock',
      productId: tshirtBlue.id,
      userId: staff.id,
    },
  });

  await prisma.transaction.create({
    data: {
      type: 'STOCK_IN',
      quantity: 200,
      unitPrice: 20.0,
      supplier: 'Coffee Importers',
      notes: 'Bulk order',
      productId: coffee.id,
      userId: staff.id,
    },
  });

  // Stock Out transactions
  await prisma.transaction.create({
    data: {
      type: 'STOCK_OUT',
      quantity: 5,
      customer: 'John Doe',
      notes: 'Sale #12345',
      productId: laptop.id,
      userId: staff.id,
    },
  });

  await prisma.transaction.create({
    data: {
      type: 'STOCK_OUT',
      quantity: 10,
      customer: 'Jane Smith',
      notes: 'Bulk order',
      productId: tshirtBlue.id,
      userId: staff.id,
    },
  });

  await prisma.transaction.create({
    data: {
      type: 'STOCK_OUT',
      quantity: 192,
      customer: 'Coffee Shop Chain',
      notes: 'Monthly supply',
      productId: coffee.id,
      userId: staff.id,
    },
  });

  console.log('✅ Created transactions');

  // ============================================================================
  // SUMMARY
  // ============================================================================

  const userCount = await prisma.user.count();
  const categoryCount = await prisma.category.count();
  const productCount = await prisma.product.count();
  const transactionCount = await prisma.transaction.count();

  console.log('\n📊 Seed Summary:');
  console.log(`   Users: ${userCount}`);
  console.log(`   Categories: ${categoryCount}`);
  console.log(`   Products: ${productCount}`);
  console.log(`   Transactions: ${transactionCount}`);
  console.log('\n🎉 Seed completed successfully!');
  console.log('\n📝 Login credentials:');
  console.log('   Admin:   admin@ims.com / Admin@123');
  console.log('   Manager: manager@ims.com / Manager@123');
  console.log('   Staff:   staff@ims.com / Staff@123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
