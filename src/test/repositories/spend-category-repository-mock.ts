import { ISpendCategoryRepository } from '../../domain/repositories/spend-category/spend-category-repository';
import { SpendCategory } from '@prisma/client';

export const SpendCategoryRepositoryMock: jest.Mocked<ISpendCategoryRepository> = {
  findAll: jest.fn<Promise<SpendCategory[]>, []>(),
  findOne: jest.fn<Promise<SpendCategory | null>, [string]>(),
};
