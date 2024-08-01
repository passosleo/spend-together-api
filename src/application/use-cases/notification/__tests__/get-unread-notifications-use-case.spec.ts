import { GetUnreadNotificationsUseCase } from './../get-unread-notifications-use-case';
import { UserFactory } from './../../../../test/factories/user-factory';
import { NotificationRepositoryMock } from './../../../../test/repositories/notification-repository-mock';
import { AuthProviderMock } from './../../../../test/providers/auth-provider-mock';
import { UnreadNotificationResponseDTO } from '../../../../infra/http/dtos/notification/unread-notification-response-dto';

describe('Get unread notifications use case', () => {
  let sut: GetUnreadNotificationsUseCase;

  beforeEach(() => {
    sut = new GetUnreadNotificationsUseCase(AuthProviderMock, NotificationRepositoryMock);
    jest.clearAllMocks();
  });

  it('should return unread notifications', async () => {
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(UserFactory.createAccount());
    NotificationRepositoryMock.count.mockResolvedValue(10);

    const result = await sut.execute();

    expect(result).toEqual({ hasUnread: true, total: 10 });
    expect(result).toBeInstanceOf(UnreadNotificationResponseDTO);
    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(NotificationRepositoryMock.count).toHaveBeenCalledTimes(1);
  });
});
