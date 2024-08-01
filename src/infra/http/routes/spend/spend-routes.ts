import { ListSpendsBySpendControlIdController } from './../../controllers/spend/list-spends-by-spend-control-id-controller';
import { Route } from '../../../types/generic';
import { GetSpendByIdController } from '../../controllers/spend/get-spend-by-id-controller';
import { GetSpendByIdSchema } from '../../schemas/spend/get-spend-by-id-schema';
import { ListSpendsBySpendControlIdSchema } from '../../schemas/spend/list-spends-by-spend-control-id-schema';

export const spendRoutes: Route[] = [
  {
    path: '/api/v1/spend/:spendId',
    method: 'GET',
    auth: true,
    schema: GetSpendByIdSchema,
    controller: GetSpendByIdController.handle,
  },
  {
    path: '/api/v1/spend/spend-control/:spendControlId',
    method: 'GET',
    auth: true,
    schema: ListSpendsBySpendControlIdSchema,
    controller: ListSpendsBySpendControlIdController.handle,
  },
];
