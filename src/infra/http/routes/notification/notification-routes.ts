import { Route } from '../../../types/generic';
import { DeleteNotificationController } from '../../controllers/notification/delete-notification-controller';
import { GetUnreadNotificationsController } from '../../controllers/notification/get-unread-notifications-controller';
import { ListNotificationsController } from '../../controllers/notification/list-notifications-controller';
import { DeleteNotificationSchema } from '../../schemas/notification/delete-notification-schema';

export const notificationRoutes: Route[] = [
  {
    path: '/api/v1/notification',
    method: 'GET',
    auth: true,
    controller: ListNotificationsController.handle,
  },
  {
    path: '/api/v1/notification/unread',
    method: 'GET',
    auth: true,
    controller: GetUnreadNotificationsController.handle,
  },
  {
    path: '/api/v1/notification/:notificationId',
    method: 'DELETE',
    auth: true,
    schema: DeleteNotificationSchema,
    controller: DeleteNotificationController.handle,
  },
];
