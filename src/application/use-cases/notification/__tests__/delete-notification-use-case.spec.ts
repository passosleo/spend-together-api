import { NotificationMockFactory } from '../../../../test/factories/notification-mock-factory';
import { UserMockFactory } from '../../../../test/factories/user-mock-factory';
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
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(UserMockFactory.createAccount());
    NotificationRepositoryMock.findOne.mockResolvedValue(null);

    await expect(sut.execute('notificationId')).rejects.toBeInstanceOf(Exception);

    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(NotificationRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(NotificationRepositoryMock.delete).not.toHaveBeenCalled();
  });

  it('should delete notification', async () => {
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(UserMockFactory.createAccount());
    NotificationRepositoryMock.findOne.mockResolvedValue(NotificationMockFactory.createEntity());

    await sut.execute('notificationId');

    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(NotificationRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(NotificationRepositoryMock.delete).toHaveBeenCalledTimes(1);
  });
});
