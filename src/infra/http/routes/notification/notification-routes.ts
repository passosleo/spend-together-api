import { Route } from '../../../types/generic';
import { ListNotificationsController } from '../../controllers/notification/list-notifications-controller';

export const notificationRoutes: Route[] = [
  {
    path: '/api/v1/notification',
    method: 'GET',
    auth: true,
    controller: ListNotificationsController.handle,
  },
];
