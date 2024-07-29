import { SpendCategory } from '../../entities/spend-category';

export interface ISpendCategoryRepository {
  findAll(): Promise<SpendCategory[]>;
}
