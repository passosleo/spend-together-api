import { NotificationFactory } from './../../../../test/factories/notification-factory';
import { ListNotificationsUseCase } from './../list-notifications-use-case';
import { UserFactory } from './../../../../test/factories/user-factory';
import { NotificationRepositoryMock } from './../../../../test/repositories/notification-repository-mock';
import { AuthProviderMock } from './../../../../test/providers/auth-provider-mock';
import { NotificationResponseDTO } from '../../../../infra/http/dtos/notification/notification-response-dto';

describe('List notifications use case', () => {
  let sut: ListNotificationsUseCase;

  beforeEach(() => {
    sut = new ListNotificationsUseCase(AuthProviderMock, NotificationRepositoryMock);
    jest.clearAllMocks();
  });

  it('should list notifications', async () => {
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(UserFactory.createAccount());
    NotificationRepositoryMock.findAll.mockResolvedValue(NotificationFactory.createEntities(5));

    const result = await sut.execute();

    expect(result).toHaveLength(5);
    expect(result[0]).toBeInstanceOf(NotificationResponseDTO);
    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(NotificationRepositoryMock.findAll).toHaveBeenCalledTimes(1);
    expect(NotificationRepositoryMock.update).toHaveBeenCalledTimes(5);
  });
});
