# Inventory Management System (IMS)

A full-stack inventory management system built with Next.js, NestJS, PostgreSQL, and Prisma.

## 🎯 Features

- **RBAC (Role-Based Access Control)**: Admin, Manager, Staff roles with different permissions
- **Product Management**: CRUD operations for products with categories
- **Inventory Tracking**: Stock in/out transactions with history
- **Dashboard & Analytics**: Revenue charts, stock distribution, low stock alerts
- **Import/Export**: CSV import for products, PDF/Excel export for reports
- **QR Code**: Generate and scan QR codes for products
- **Responsive Design**: Mobile-friendly UI with Shadcn/ui components

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Library**: Shadcn/ui + Tailwind CSS
- **State Management**: React Query + Zustand
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + Passport
- **Validation**: class-validator

## 📁 Project Structure

```
.
├── apps/
│   ├── backend/          # NestJS API
│   │   ├── prisma/       # Database schema & migrations
│   │   └── src/          # Source code
│   │       ├── auth/     # Authentication module
│   │       ├── users/    # Users module
│   │       ├── products/ # Products module
│   │       ├── inventory/# Inventory module
│   │       ├── reports/  # Reports module
│   │       └── files/    # Files module
│   │
│   └── frontend/         # Next.js app
│       ├── app/          # App router pages
│       ├── components/   # React components
│       ├── lib/          # Utilities
│       ├── hooks/        # Custom hooks
│       ├── types/        # TypeScript types
│       └── store/        # Zustand stores
│
└── docs/                 # Documentation
    ├── PROJECT_OVERVIEW.md
    ├── REQUIREMENTS.md
    ├── USER_STORIES.md
    ├── ARCHITECTURE.md
    ├── DATABASE_SCHEMA.md
    ├── API_SPECIFICATION.md
    └── UI_DESIGN.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 15+
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd apps/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your database credentials:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/ims_db"
JWT_SECRET="your-secret-key"
```

5. Run database migrations:
```bash
npm run prisma:migrate
```

6. Seed database with sample data:
```bash
npm run prisma:seed
```

7. Start development server:
```bash
npm run start:dev
```

Backend will run on `http://localhost:3001`

API Documentation: `http://localhost:3001/api/docs`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd apps/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
cp .env.local.example .env.local
```

4. Start development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## 🔑 Default Login Credentials

After seeding the database, you can login with:

- **Admin**: admin@ims.com / Admin@123
- **Manager**: manager@ims.com / Manager@123
- **Staff**: staff@ims.com / Staff@123

## 📚 Documentation

Detailed documentation is available in the `/docs` folder:

- [Project Overview](./docs/PROJECT_OVERVIEW.md)
- [Requirements](./docs/REQUIREMENTS.md)
- [User Stories](./docs/USER_STORIES.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [Database Schema](./docs/DATABASE_SCHEMA.md)
- [API Specification](./docs/API_SPECIFICATION.md)
- [UI Design](./docs/UI_DESIGN.md)

## 🧪 Testing

### Backend Tests
```bash
cd apps/backend

# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```

### Frontend Tests
```bash
cd apps/frontend

# Run tests
npm run test
```

## 📦 Deployment

### Backend (Railway/Render)

1. Push code to GitHub
2. Connect repository to Railway/Render
3. Set environment variables
4. Deploy

### Frontend (Vercel)

1. Push code to GitHub
2. Import project to Vercel
3. Set environment variables
4. Deploy

## 🤝 Contributing

This is a portfolio project. Feel free to fork and customize for your needs.

## 📄 License

MIT

## 👤 Author

**Thang PLC**

- Experience: 1.5 years
- GitHub: [Your GitHub URL]
- LinkedIn: [Your LinkedIn URL]

## 🎓 Learning Outcomes

This project demonstrates:

- ✅ Full-stack TypeScript development
- ✅ RBAC implementation
- ✅ RESTful API design
- ✅ Database modeling with Prisma
- ✅ Modern React patterns (Server Components, React Query)
- ✅ Authentication & Authorization
- ✅ File processing (CSV, PDF)
- ✅ Data visualization
- ✅ QR Code integration
- ✅ Responsive UI design

## 📞 Support

For questions or issues, please open an issue on GitHub.

---

**Built with ❤️ using Next.js, NestJS, and PostgreSQL**
