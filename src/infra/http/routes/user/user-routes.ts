import { DeleteUserAccountController } from '../../controllers/user/delete-user-account-controller';
import { GetUserInfoController } from '../../controllers/user/get-user-info-controller';
import { SearchUserController } from '../../controllers/user/search-user-controller';
import { UpdateUserController } from '../../controllers/user/update-user-controller';
import { Route } from '../../../types/generic';
import { UpdateUserSchema } from '../../schemas/user/update-user-schema';
import { SearchUserSchema } from '../../schemas/user/search-user-schema';

export const userRoutes: Route[] = [
  {
    path: '/api/v1/user/info',
    method: 'GET',
    auth: true,
    controller: GetUserInfoController.handle,
  },
  {
    path: '/api/v1/user/delete',
    method: 'DELETE',
    auth: true,
    controller: DeleteUserAccountController.handle,
  },
  {
    path: '/api/v1/user/preferences',
    method: 'PUT',
    auth: true,
    schema: UpdateUserSchema,
    controller: UpdateUserController.handle,
  },
  {
    path: '/api/v1/user/search',
    method: 'GET',
    auth: true,
    schema: SearchUserSchema,
    controller: SearchUserController.handle,
  },
];
