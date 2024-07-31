import { Route } from '../../../types/generic';
import { ListSpendControlsController } from '../../controllers/spend-control/list-spend-controls-controller';

export const spendControlRoutes: Route[] = [
  {
    path: '/api/v1/spend-control',
    method: 'GET',
    auth: true,
    controller: ListSpendControlsController.handle,
  },
];
