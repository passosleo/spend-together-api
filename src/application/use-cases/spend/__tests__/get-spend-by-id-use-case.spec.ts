import { GetSpendByIdUseCase } from './../get-spend-by-id-use-case';
import { SpendMockFactory } from './../../../../test/factories/spend-mock-factory';
import { UserMockFactory } from './../../../../test/factories/user-mock-factory';
import { SpendRepositoryMock } from './../../../../test/repositories/spend-repository-mock';
import { AuthProviderMock } from './../../../../test/providers/auth-provider-mock';
import { SpendResponseDTO } from '../../../../infra/http/dtos/spend/spend-response-dto';
import { Exception } from '../../../../infra/exception';

describe('GetSpendByIdUseCase', () => {
  let sut: GetSpendByIdUseCase;

  beforeEach(() => {
    sut = new GetSpendByIdUseCase(AuthProviderMock, SpendRepositoryMock);
    jest.clearAllMocks();
  });

  it('should throw an NOT_FOUND exception if spend does not exist', async () => {
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(UserMockFactory.createAccount());
    SpendRepositoryMock.findOne.mockResolvedValue(null);

    await expect(sut.execute('spend-id')).rejects.toBeInstanceOf(Exception);

    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(SpendRepositoryMock.findOne).toHaveBeenCalledTimes(1);
  });

  it('should return a spend by id', async () => {
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(UserMockFactory.createAccount());
    SpendRepositoryMock.findOne.mockResolvedValue(SpendMockFactory.createEntity());

    const result = await sut.execute('spend-id');

    expect(result).toBeInstanceOf(SpendResponseDTO);
    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(SpendRepositoryMock.findOne).toHaveBeenCalledTimes(1);
  });
});
