import { Route } from '../../../types/generic';
import { GetUnreadNotificationsController } from '../../controllers/notification/get-unread-notifications-controller';
import { ListNotificationsController } from '../../controllers/notification/list-notifications-controller';

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
];
