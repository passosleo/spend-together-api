import { SpendBalanceMockFactory } from './../../../../test/factories/spend-balance-mock-factory';
import { SpendCalculatorServiceMock } from './../../../../test/services/spend-calculator-service-mock';
import { GetSpendControlByIdUseCase } from './../get-spend-control-by-id-use-case';
import { SpendControlRepositoryMock } from './../../../../test/repositories/spend-control-repository-mock';
import { UserMockFactory } from './../../../../test/factories/user-mock-factory';
import { AuthProviderMock } from './../../../../test/providers/auth-provider-mock';
import { faker } from '@faker-js/faker';
import { Exception } from '../../../../infra/exception';
import { SpendControlMockFactory } from '../../../../test/factories/spend-control-mock-factory';
import { SpendControlUserMockFactory } from '../../../../test/factories/spend-control-user-mock-factory';
import { SpendControlResponseDTO } from '../../../../infra/http/dtos/spend-control/spend-control-response-dto';

describe('GetSpendControlByIdUseCase', () => {
  let sut: GetSpendControlByIdUseCase;

  beforeEach(() => {
    sut = new GetSpendControlByIdUseCase(AuthProviderMock, SpendControlRepositoryMock, SpendCalculatorServiceMock);
    jest.clearAllMocks();
  });

  it('should throw an NOT_FOUND exception if the spend control does not exist', async () => {
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(UserMockFactory.createAccount());
    SpendControlRepositoryMock.findOne.mockResolvedValue(null);

    await expect(sut.execute(faker.string.uuid())).rejects.toBeInstanceOf(Exception);

    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(SpendControlRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(SpendCalculatorServiceMock.calculateBalance).not.toHaveBeenCalled();
  });

  it('should throw an FORBIDDEN exception if the authenticated user is not the owner of the spend control', async () => {
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
              userId: faker.string.uuid(),
              avatar: faker.image.avatar(),
              name: faker.person.fullName(),
              username: faker.internet.userName(),
            },
            isOwner: true,
            joinedAt: faker.date.recent(),
          }),
          SpendControlUserMockFactory.createEntity({
            user: {
              userId: 'user-id',
              avatar: faker.image.avatar(),
              name: faker.person.fullName(),
              username: faker.internet.userName(),
            },
            isOwner: false,
            joinedAt: null,
          }),
        ],
      }),
    );

    await expect(sut.execute(faker.string.uuid())).rejects.toBeInstanceOf(Exception);

    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(SpendControlRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(SpendCalculatorServiceMock.calculateBalance).not.toHaveBeenCalled();
  });

  it('should return the spend control', async () => {
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
    SpendCalculatorServiceMock.calculateBalance.mockResolvedValue(SpendBalanceMockFactory.createEntity());

    const result = await sut.execute(faker.string.uuid());

    expect(result).toBeInstanceOf(SpendControlResponseDTO);
    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(SpendControlRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(SpendCalculatorServiceMock.calculateBalance).toHaveBeenCalledTimes(1);
  });
});
