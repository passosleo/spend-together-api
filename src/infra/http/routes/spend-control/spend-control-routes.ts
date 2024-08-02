import { Route } from '../../../types/generic';
import { GetSpendControlByIdController } from './../../controllers/spend-control/get-spend-control-by-id-controller';
import { ListSpendControlsController } from '../../controllers/spend-control/list-spend-controls-controller';
import { GetSpendControlByIdSchema } from '../../schemas/spend-control/get-spend-control-by-id-schema';
import { CreateSpendControlSchema } from '../../schemas/spend-control/create-spend-control-schema';
import { CreateSpendControlController } from '../../controllers/spend-control/create-spend-control-controller';
import { UpdateSpendControlSchema } from '../../schemas/spend-control/update-spend-control-schema';
import { UpdateSpendControlController } from '../../controllers/spend-control/update-spend-control-controller';
import { DeleteSpendControlController } from '../../controllers/spend-control/delete-spend-control-controller';
import { DeleteSpendControlSchema } from '../../schemas/spend-control/delete-spend-control-schema';
import { ListSpendControlsSummaryController } from '../../controllers/spend-control/list-spend-controls-summary-controller';

export const spendControlRoutes: Route[] = [
  {
    path: '/api/v1/spend-control/list',
    method: 'GET',
    auth: true,
    controller: ListSpendControlsController.handle,
  },
  {
    path: '/api/v1/spend-control/list/summary',
    method: 'GET',
    auth: true,
    controller: ListSpendControlsSummaryController.handle,
  },
  {
    path: '/api/v1/spend-control/:spendControlId',
    method: 'GET',
    auth: true,
    schema: GetSpendControlByIdSchema,
    controller: GetSpendControlByIdController.handle,
  },
  {
    path: '/api/v1/spend-control',
    method: 'POST',
    auth: true,
    schema: CreateSpendControlSchema,
    controller: CreateSpendControlController.handle,
  },
  {
    path: '/api/v1/spend-control/:spendControlId',
    method: 'PUT',
    auth: true,
    schema: UpdateSpendControlSchema,
    controller: UpdateSpendControlController.handle,
  },
  {
    path: '/api/v1/spend-control/:spendControlId',
    method: 'DELETE',
    auth: true,
    schema: DeleteSpendControlSchema,
    controller: DeleteSpendControlController.handle,
  },
];
