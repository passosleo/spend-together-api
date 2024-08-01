import { SpendCategory } from '../../entities/spend-category/spend-category';

export interface ISpendCategoryRepository {
  findAll(): Promise<SpendCategory[]>;
  findOne(spendCategoryId: string): Promise<SpendCategory | null>;
}
