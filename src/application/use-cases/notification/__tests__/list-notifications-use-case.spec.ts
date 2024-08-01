import { NotificationMockFactory } from '../../../../test/factories/notification-mock-factory';
import { ListNotificationsUseCase } from './../list-notifications-use-case';
import { UserMockFactory } from '../../../../test/factories/user-mock-factory';
import { NotificationRepositoryMock } from './../../../../test/repositories/notification-repository-mock';
import { AuthProviderMock } from './../../../../test/providers/auth-provider-mock';
import { NotificationResponseDTO } from '../../../../infra/http/dtos/notification/notification-response-dto';

describe('List notifications use case', () => {
  let sut: ListNotificationsUseCase;

  beforeEach(() => {
    sut = new ListNotificationsUseCase(AuthProviderMock, NotificationRepositoryMock);
    jest.clearAllMocks();
  });

  it('should list notifications and update them as read', async () => {
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(UserMockFactory.createAccount());
    NotificationRepositoryMock.findAll.mockResolvedValue(NotificationMockFactory.createEntities(5));

    const result = await sut.execute();

    expect(result).toHaveLength(5);
    expect(result[0]).toBeInstanceOf(NotificationResponseDTO);
    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(NotificationRepositoryMock.findAll).toHaveBeenCalledTimes(1);
    expect(NotificationRepositoryMock.update).toHaveBeenCalledTimes(5);
  });
});
