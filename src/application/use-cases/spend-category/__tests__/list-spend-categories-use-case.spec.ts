import { SpendCategoryMockFactory } from './../../../../test/factories/spend-category-mock-factory';
import { SpendCategoryRepositoryMock } from './../../../../test/repositories/spend-category-repository-mock';
import { ListSpendCategoriesUseCase } from './../list-spend-categories-use-case';
import { SpendCategoryResponseDTO } from '../../../../infra/http/dtos/spend-category/spend-category-response-dto';

describe('ListSpendCategoriesUseCase', () => {
  let sut: ListSpendCategoriesUseCase;

  beforeEach(() => {
    sut = new ListSpendCategoriesUseCase(SpendCategoryRepositoryMock);
    jest.clearAllMocks();
  });

  it('should return a list of spend categories', async () => {
    SpendCategoryRepositoryMock.findAll.mockResolvedValue(SpendCategoryMockFactory.createEntities(5));

    const result = await sut.execute();

    expect(result).toHaveLength(5);
    expect(result[0]).toBeInstanceOf(SpendCategoryResponseDTO);
    expect(SpendCategoryRepositoryMock.findAll).toHaveBeenCalledTimes(1);
  });
});
