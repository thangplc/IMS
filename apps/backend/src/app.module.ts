import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { InventoryModule } from './inventory/inventory.module';
import { ReportsModule } from './reports/reports.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    // Config
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Rate limiting
    ThrottlerModule.forRoot([
      {
        ttl: parseInt(process.env.RATE_LIMIT_TTL) || 60000,
        limit: parseInt(process.env.RATE_LIMIT_MAX) || 100,
      },
    ]),

    // Modules
    PrismaModule,
    AuthModule,
    UsersModule,
    ProductsModule,
    InventoryModule,
    ReportsModule,
    FilesModule,
  ],
})
export class AppModule {}
