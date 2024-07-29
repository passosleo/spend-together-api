import { Route } from '../../types/generic';
import { privacyPolicyRoutes } from './privacy-policy/privacy-policy-routes';
import { signInRoutes } from './sign-in/sign-in-routes';
import { signUpRoutes } from './sign-up/sign-up-routes';
import { spendCategoryRoutes } from './spend-category/spend-category-routes';
import { userRoutes } from './user/user-routes';

export const routes: Route[] = [
  ...signUpRoutes,
  ...signInRoutes,
  ...userRoutes,
  ...privacyPolicyRoutes,
  ...spendCategoryRoutes,
];
