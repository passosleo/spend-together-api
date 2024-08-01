import { ISpendCategoryRepository } from '../../../domain/repositories/spend-category/spend-category-repository';
import { SpendCategoryMapper } from '../mappers/spend-category-mapper';
import { SpendCategory } from '../../../domain/entities/spend-category/spend-category';
import { prisma } from '../db';

export class SpendCategoryRepositoryPrisma implements ISpendCategoryRepository {
  public async findOne(spendCategoryId: string): Promise<SpendCategory | null> {
    try {
      const model = await prisma.spendCategory.findFirst({
        where: { spendCategoryId },
      });
      return model ? SpendCategoryMapper.toDomain(model) : null;
    } finally {
      await prisma.$disconnect();
    }
  }

  public async findAll(): Promise<SpendCategory[]> {
    try {
      const models = await prisma.spendCategory.findMany();
      return models.map((model) => SpendCategoryMapper.toDomain(model));
    } finally {
      await prisma.$disconnect();
    }
  }
}
