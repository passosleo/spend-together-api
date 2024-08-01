import { NotificationFactory } from './../../../../test/factories/notification-factory';
import { UserFactory } from './../../../../test/factories/user-factory';
import { NotificationRepositoryMock } from './../../../../test/repositories/notification-repository-mock';
import { AuthProviderMock } from './../../../../test/providers/auth-provider-mock';
import { DeleteNotificationUseCase } from './../delete-notification-use-case';
import { Exception } from '../../../../infra/exception';
describe('Delete notification use case', () => {
  let sut: DeleteNotificationUseCase;

  beforeEach(() => {
    sut = new DeleteNotificationUseCase(AuthProviderMock, NotificationRepositoryMock);
    jest.clearAllMocks();
  });

  it('should throw NOT_FOUND exception if notification does not exist', async () => {
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(UserFactory.createAccount());
    NotificationRepositoryMock.findOne.mockResolvedValue(null);

    await expect(sut.execute('notificationId')).rejects.toBeInstanceOf(Exception);

    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(NotificationRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(NotificationRepositoryMock.delete).not.toHaveBeenCalled();
  });

  it('should delete notification', async () => {
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(UserFactory.createAccount());
    NotificationRepositoryMock.findOne.mockResolvedValue(NotificationFactory.createEntity());

    await sut.execute('notificationId');

    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(NotificationRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(NotificationRepositoryMock.delete).toHaveBeenCalledTimes(1);
  });
});
