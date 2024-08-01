import { Route } from '../../../types/generic';
import { GetSpendByIdController } from '../../controllers/spend/get-spend-by-id-controller';
import { GetSpendByIdSchema } from '../../schemas/spend/get-spend-by-id-schema';

export const spendRoutes: Route[] = [
  {
    path: '/api/v1/spend/:spendId',
    method: 'GET',
    auth: true,
    schema: GetSpendByIdSchema,
    controller: GetSpendByIdController.handle,
  },
];
