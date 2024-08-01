import { Route } from '../../types/generic';
import { notificationRoutes } from './notification/notification-routes';
import { privacyPolicyRoutes } from './privacy-policy/privacy-policy-routes';
import { signInRoutes } from './sign-in/sign-in-routes';
import { signUpRoutes } from './sign-up/sign-up-routes';
import { spendCategoryRoutes } from './spend-category/spend-category-routes';
import { spendControlRoutes } from './spend-control/spend-control-routes';
import { spendRoutes } from './spend/spend-routes';
import { userRoutes } from './user/user-routes';

export const routes: Route[] = [
  ...signUpRoutes,
  ...signInRoutes,
  ...userRoutes,
  ...privacyPolicyRoutes,
  ...spendCategoryRoutes,
  ...notificationRoutes,
  ...spendControlRoutes,
  ...spendRoutes,
];
