import { SpendControlMockFactory } from './../../../../test/factories/spend-control-mock-factory';
import { CreateSpendControlUseCase } from './../create-spend-control-use-case';
import { NotificationRepositoryMock } from './../../../../test/repositories/notification-repository-mock';
import { SpendControlRepositoryMock } from './../../../../test/repositories/spend-control-repository-mock';
import { UserMockFactory } from './../../../../test/factories/user-mock-factory';
import { AuthProviderMock } from './../../../../test/providers/auth-provider-mock';
import { UserRepositoryMock } from '../../../../test/repositories/user-repository-mock';
import { CreateSpendControlRequestDTO } from '../../../../infra/http/dtos/spend-control/create-spend-control-request-dto';
import { faker } from '@faker-js/faker';
import { SpendControlResponseDTO } from '../../../../infra/http/dtos/spend-control/spend-control-response-dto';
import { Exception } from '../../../../infra/exception';

describe('CreateSpendControlUseCase', () => {
  let sut: CreateSpendControlUseCase;

  beforeEach(() => {
    sut = new CreateSpendControlUseCase(
      AuthProviderMock,
      SpendControlRepositoryMock,
      NotificationRepositoryMock,
      UserRepositoryMock,
    );
    jest.clearAllMocks();
  });

  it('should throw an NOT_FOUND exception if one of the invited users does not exist', async () => {
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(UserMockFactory.createAccount());
    UserRepositoryMock.findByUniqueKey.mockResolvedValue(null);
    SpendControlRepositoryMock.create.mockResolvedValue(SpendControlMockFactory.createEntity());

    await expect(
      sut.execute(
        CreateSpendControlRequestDTO.create({
          name: faker.lorem.word(),
          color: faker.color.rgb(),
          invitedUsernames: [faker.internet.userName()],
        }),
      ),
    ).rejects.toBeInstanceOf(Exception);

    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.findByUniqueKey).toHaveBeenCalledTimes(1);
    expect(SpendControlRepositoryMock.create).not.toHaveBeenCalled();
    expect(NotificationRepositoryMock.create).not.toHaveBeenCalled();
  });

  it('should throw an FORBIDDEN exception if one of the invited users has a private profile', async () => {
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(UserMockFactory.createAccount());
    UserRepositoryMock.findByUniqueKey.mockResolvedValue(UserMockFactory.createEntity({ isPublic: false }));
    SpendControlRepositoryMock.create.mockResolvedValue(SpendControlMockFactory.createEntity());

    await expect(
      sut.execute(
        CreateSpendControlRequestDTO.create({
          name: faker.lorem.word(),
          color: faker.color.rgb(),
          invitedUsernames: [faker.internet.userName()],
        }),
      ),
    ).rejects.toBeInstanceOf(Exception);

    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.findByUniqueKey).toHaveBeenCalledTimes(1);
    expect(SpendControlRepositoryMock.create).not.toHaveBeenCalled();
    expect(NotificationRepositoryMock.create).not.toHaveBeenCalled();
  });

  it('should create a shared spend control', async () => {
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(UserMockFactory.createAccount());
    UserRepositoryMock.findByUniqueKey.mockResolvedValue(UserMockFactory.createEntity({ isPublic: true }));
    SpendControlRepositoryMock.create.mockResolvedValue(SpendControlMockFactory.createEntity());

    const result = await sut.execute(
      CreateSpendControlRequestDTO.create({
        name: faker.lorem.word(),
        color: faker.color.rgb(),
        invitedUsernames: [faker.internet.userName()],
      }),
    );

    expect(result).toBeInstanceOf(SpendControlResponseDTO);
    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.findByUniqueKey).toHaveBeenCalledTimes(1);
    expect(SpendControlRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(NotificationRepositoryMock.create).toHaveBeenCalledTimes(1);
  });

  it('should create a solo spend control', async () => {
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(UserMockFactory.createAccount());
    SpendControlRepositoryMock.create.mockResolvedValue(SpendControlMockFactory.createEntity());

    const result = await sut.execute(
      CreateSpendControlRequestDTO.create({
        name: faker.lorem.word(),
        color: faker.color.rgb(),
        invitedUsernames: [],
      }),
    );

    expect(result).toBeInstanceOf(SpendControlResponseDTO);
    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(SpendControlRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(NotificationRepositoryMock.create).not.toHaveBeenCalled();
    expect(UserRepositoryMock.findByUniqueKey).not.toHaveBeenCalled();
  });
});
