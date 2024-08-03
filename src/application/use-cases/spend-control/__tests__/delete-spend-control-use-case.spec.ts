import { DeleteSpendControlUseCase } from './../delete-spend-control-use-case';
import { SpendControlMockFactory } from './../../../../test/factories/spend-control-mock-factory';
import { SpendControlRepositoryMock } from './../../../../test/repositories/spend-control-repository-mock';
import { UserMockFactory } from './../../../../test/factories/user-mock-factory';
import { AuthProviderMock } from './../../../../test/providers/auth-provider-mock';
import { faker } from '@faker-js/faker';
import { Exception } from '../../../../infra/exception';
import { SpendControlUserMockFactory } from '../../../../test/factories/spend-control-user-mock-factory';

describe('DeleteSpendControlUseCase', () => {
  let sut: DeleteSpendControlUseCase;

  beforeEach(() => {
    sut = new DeleteSpendControlUseCase(AuthProviderMock, SpendControlRepositoryMock);
    jest.clearAllMocks();
  });

  it('should throw an NOT_FOUND exception if the spend control does not exist', async () => {
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(UserMockFactory.createAccount());
    SpendControlRepositoryMock.findOne.mockResolvedValue(null);

    await expect(sut.execute(faker.string.uuid())).rejects.toBeInstanceOf(Exception);

    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(SpendControlRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(SpendControlRepositoryMock.delete).not.toHaveBeenCalled();
  });

  it('should throw an FORBIDDEN exception if the authenticated user is not the owner of the spend control', async () => {
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(UserMockFactory.createAccount());
    SpendControlRepositoryMock.findOne.mockResolvedValue(SpendControlMockFactory.createEntity());

    await expect(sut.execute(faker.string.uuid())).rejects.toBeInstanceOf(Exception);

    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(SpendControlRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(SpendControlRepositoryMock.delete).not.toHaveBeenCalled();
  });

  it('should delete the spend control', async () => {
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(
      UserMockFactory.createAccount({
        userId: 'user-id',
      }),
    );
    SpendControlRepositoryMock.findOne.mockResolvedValue(
      SpendControlMockFactory.createEntity({
        users: [
          SpendControlUserMockFactory.createEntity({
            user: {
              userId: 'user-id',
              avatar: faker.image.avatar(),
              name: faker.person.fullName(),
              username: faker.internet.userName(),
            },
            isOwner: true,
          }),
        ],
      }),
    );
    SpendControlRepositoryMock.delete.mockResolvedValue(SpendControlMockFactory.createEntity());

    const result = await sut.execute(faker.string.uuid());

    expect(result).toBeUndefined();
    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(SpendControlRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(SpendControlRepositoryMock.delete).toHaveBeenCalledTimes(1);
  });
});
