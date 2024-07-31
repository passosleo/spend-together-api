import { Route } from '../../../types/generic';
import { GetSpendControlByIdController } from './../../controllers/spend-control/get-spend-control-by-id-controller';
import { ListSpendControlsController } from '../../controllers/spend-control/list-spend-controls-controller';
import { GetSpendControlByIdSchema } from '../../schemas/spend-control/get-spend-control-by-id-schema';

export const spendControlRoutes: Route[] = [
  {
    path: '/api/v1/spend-control',
    method: 'GET',
    auth: true,
    controller: ListSpendControlsController.handle,
  },
  {
    path: '/api/v1/spend-control/:spendControlId',
    method: 'GET',
    auth: true,
    schema: GetSpendControlByIdSchema,
    controller: GetSpendControlByIdController.handle,
  },
];
