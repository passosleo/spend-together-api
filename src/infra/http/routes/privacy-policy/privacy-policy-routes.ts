import { Route } from '../../../types/generic';
import { GetPrivacyPolicyController } from '../../controllers/privacy-policy/get-privacy-policy-controller';

export const privacyPolicyRoutes: Route[] = [
  {
    path: '/api/v1/privacy-policy',
    method: 'GET',
    controller: GetPrivacyPolicyController.handle,
  },
];
