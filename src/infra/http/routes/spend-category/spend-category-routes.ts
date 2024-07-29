import { Route } from '../../../types/generic';
import { ListSpendCategoriesController } from '../../controllers/spend-category/list-spend-categories-controller';

export const spendCategoryRoutes: Route[] = [
  {
    path: '/api/v1/spend-category',
    method: 'GET',
    auth: true,
    controller: ListSpendCategoriesController.handle,
  },
];
