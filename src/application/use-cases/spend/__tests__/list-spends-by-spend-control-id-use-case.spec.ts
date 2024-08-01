import { SpendMockFactory } from './../../../../test/factories/spend-mock-factory';
import { UserMockFactory } from './../../../../test/factories/user-mock-factory';
import { SpendRepositoryMock } from './../../../../test/repositories/spend-repository-mock';
import { AuthProviderMock } from './../../../../test/providers/auth-provider-mock';
import { ListSpendsBySpendControlIdUseCase } from './../list-spends-by-spend-control-id-use-case';
import { SpendResponseDTO } from '../../../../infra/http/dtos/spend/spend-response-dto';

describe('List spends by spend control id use case', () => {
  let sut: ListSpendsBySpendControlIdUseCase;

  beforeEach(() => {
    sut = new ListSpendsBySpendControlIdUseCase(AuthProviderMock, SpendRepositoryMock);
    jest.clearAllMocks();
  });

  it('should return a list of spends by spend control id', async () => {
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(UserMockFactory.createAccount());
    SpendRepositoryMock.findAll.mockResolvedValue(SpendMockFactory.createEntities(5));

    const result = await sut.execute('spend-control-id');

    expect(result).toHaveLength(5);
    expect(result[0]).toBeInstanceOf(SpendResponseDTO);
    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(SpendRepositoryMock.findAll).toHaveBeenCalledTimes(1);
  });
});
