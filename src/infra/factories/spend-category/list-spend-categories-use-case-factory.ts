import { SpendCategoryRepositoryPrisma } from '../../data/repositories/spend-category-repository-prisma';
import { ListSpendCategoriesUseCase } from './../../../application/use-cases/spend-category/list-spend-categories';

export class ListSpendCategoriesUseCaseFactory {
  public static create(): ListSpendCategoriesUseCase {
    const spendCategoryRepository = new SpendCategoryRepositoryPrisma();
    return new ListSpendCategoriesUseCase(spendCategoryRepository);
  }
}
