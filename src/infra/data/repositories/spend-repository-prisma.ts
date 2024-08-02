import { Prisma } from '@prisma/client';
import { ISpendRepository } from '../../../domain/repositories/spend/spend-repository';
import { Spend } from '../../../domain/entities/spend/spend';
import { prisma } from '../db';
import { SpendMapper } from '../mappers/spend-mapper';

export class SpendRepositoryPrisma implements ISpendRepository {
  constructor() {}
  private spendCategoryFields: Prisma.SpendCategorySelect = {
    spendCategoryId: true,
    name: true,
    description: true,
    color: true,
  };

  private userFields: Prisma.UserSelect = {
    userId: true,
    name: true,
    username: true,
    avatar: true,
  };

  async findOne(spendId: string, userId: string): Promise<Spend | null> {
    try {
      const model = await prisma.spend.findFirst({
        where: {
          spendId,
          spendControl: { users: { some: { userId } } },
        },
        include: {
          spendCategory: {
            select: this.spendCategoryFields,
          },
          user: {
            select: this.userFields,
          },
        },
      });

      return model ? SpendMapper.toDomain(model) : null;
    } finally {
      await prisma.$disconnect();
    }
  }

  async findAll(spendControlId: string, userId: string): Promise<Spend[]> {
    try {
      const models = await prisma.spend.findMany({
        where: {
          spendControlId,
          spendControl: { users: { some: { userId } } },
        },
        orderBy: { createdAt: 'desc' },
        include: {
          spendCategory: {
            select: this.spendCategoryFields,
          },
          user: {
            select: this.userFields,
          },
        },
      });

      return models.map(SpendMapper.toDomain);
    } finally {
      await prisma.$disconnect();
    }
  }

  async create(data: Spend): Promise<Spend> {
    try {
      const model = await prisma.spend.create({
        data: SpendMapper.toEntity(data),
        include: {
          spendCategory: {
            select: this.spendCategoryFields,
          },
          user: {
            select: this.userFields,
          },
        },
      });

      return new Spend(model);
    } finally {
      await prisma.$disconnect();
    }
  }

  async update(spendId: string, data: Partial<Spend>): Promise<Spend> {
    try {
      const model = await prisma.spend.update({
        where: { spendId, userId: data.userId },
        data: SpendMapper.toPartialEntity(data),
        include: {
          spendCategory: {
            select: this.spendCategoryFields,
          },
          user: {
            select: this.userFields,
          },
        },
      });

      return new Spend(model);
    } finally {
      await prisma.$disconnect();
    }
  }

  async delete(spendId: string): Promise<Spend> {
    try {
      const model = await prisma.spend.delete({
        where: { spendId },
        include: {
          spendCategory: {
            select: this.spendCategoryFields,
          },
          user: {
            select: this.userFields,
          },
        },
      });

      return SpendMapper.toDomain(model);
    } finally {
      await prisma.$disconnect();
    }
  }

  async sumTotalSpent(spendControlId: string, userId?: string): Promise<number> {
    try {
      const total = await prisma.spend.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          spendControlId,
          userId,
        },
      });

      return total._sum?.amount || 0;
    } finally {
      await prisma.$disconnect();
    }
  }
}
