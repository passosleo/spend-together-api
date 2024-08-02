import { DeleteSpendUseCase } from './../delete-spend-use-case';
import { SpendMockFactory } from './../../../../test/factories/spend-mock-factory';
import { UserMockFactory } from './../../../../test/factories/user-mock-factory';
import { SpendRepositoryMock } from './../../../../test/repositories/spend-repository-mock';
import { AuthProviderMock } from './../../../../test/providers/auth-provider-mock';
import { Exception } from '../../../../infra/exception';

describe('DeleteSpendUseCase', () => {
  let sut: DeleteSpendUseCase;

  beforeEach(() => {
    sut = new DeleteSpendUseCase(AuthProviderMock, SpendRepositoryMock);
    jest.clearAllMocks();
  });

  it('should throw an NOT_FOUND exception if spend does not exist', async () => {
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(UserMockFactory.createAccount());
    SpendRepositoryMock.findOne.mockResolvedValue(null);

    await expect(sut.execute('spend-id')).rejects.toBeInstanceOf(Exception);

    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(SpendRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(SpendRepositoryMock.delete).not.toHaveBeenCalled();
  });

  it('should delete a spend by id', async () => {
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(UserMockFactory.createAccount());
    SpendRepositoryMock.findOne.mockResolvedValue(SpendMockFactory.createEntity());

    const result = await sut.execute('spend-id');

    expect(result).toBeUndefined();
    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(SpendRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(SpendRepositoryMock.delete).toHaveBeenCalledTimes(1);
  });
});
