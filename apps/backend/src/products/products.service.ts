import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // TODO: Implement CRUD operations
  async findAll() {
    return this.prisma.product.findMany({
      where: { deletedAt: null },
      include: { category: true },
    });
  }
}
