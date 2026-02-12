# Quick Setup Guide

## 📋 Prerequisites

Before you begin, ensure you have:

- ✅ Node.js 18+ installed
- ✅ PostgreSQL 15+ installed and running
- ✅ npm or yarn installed
- ✅ Git installed (optional)

## 🚀 Quick Start (5 minutes)

### Step 1: Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd apps/backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Go back to root
cd ../..
```

### Step 2: Setup Database

1. Create PostgreSQL database:
```sql
CREATE DATABASE ims_db;
```

2. Configure backend environment:
```bash
cd apps/backend
cp .env.example .env
```

3. Edit `.env` file:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/ims_db?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this"
PORT=3001
```

4. Run migrations and seed:
```bash
npm run prisma:migrate
npm run prisma:seed
```

### Step 3: Setup Frontend

```bash
cd ../frontend
cp .env.local.example .env.local
```

`.env.local` should contain:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 4: Start Development Servers

From root directory:
```bash
npm run dev
```

This will start both backend and frontend concurrently.

Or start them separately:

```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

### Step 5: Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Docs**: http://localhost:3001/api/docs
- **Prisma Studio**: `npm run prisma:studio`

## 🔑 Login Credentials

Use these credentials to login:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@ims.com | Admin@123 |
| Manager | manager@ims.com | Manager@123 |
| Staff | staff@ims.com | Staff@123 |

## 🎯 Next Steps

1. ✅ Explore the dashboard
2. ✅ Create a new product (Admin only)
3. ✅ Record stock in/out transactions
4. ✅ View reports (Manager+)
5. ✅ Scan QR codes (mobile)

## 🐛 Troubleshooting

### Database Connection Error

**Problem**: `Error: Can't reach database server`

**Solution**:
1. Ensure PostgreSQL is running: `pg_ctl status`
2. Check DATABASE_URL in `.env`
3. Verify database exists: `psql -l`

### Port Already in Use

**Problem**: `Error: Port 3001 is already in use`

**Solution**:
```bash
# Find and kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Or change PORT in .env
PORT=3002
```

### Prisma Client Not Generated

**Problem**: `Cannot find module '@prisma/client'`

**Solution**:
```bash
cd apps/backend
npm run prisma:generate
```

### Frontend Can't Connect to Backend

**Problem**: Network errors in browser console

**Solution**:
1. Check backend is running: `curl http://localhost:3001/api/v1/health`
2. Verify NEXT_PUBLIC_API_URL in `.env.local`
3. Check CORS settings in backend

## 📚 Additional Resources

- [Full Documentation](./docs/)
- [API Specification](./docs/API_SPECIFICATION.md)
- [Database Schema](./docs/DATABASE_SCHEMA.md)
- [Architecture](./docs/ARCHITECTURE.md)

## 🆘 Need Help?

If you encounter issues:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review error messages carefully
3. Check logs in terminal
4. Open an issue on GitHub

---

**Happy Coding! 🚀**
