import { ISpendCategoryRepository } from '../../../domain/repositories/spend-category/spend-category-repository';
import { SpendCategoryResponseDTO } from '../../../infra/http/dtos/spend-category/spend-category-response-dto';

export class ListSpendCategoriesUseCase {
  constructor(private readonly spendCategoryRepository: ISpendCategoryRepository) {}

  public async execute(): Promise<SpendCategoryResponseDTO[]> {
    const spendCategories = await this.spendCategoryRepository.findAll();
    return spendCategories.map((spendCategory) => SpendCategoryResponseDTO.create(spendCategory));
  }
}
