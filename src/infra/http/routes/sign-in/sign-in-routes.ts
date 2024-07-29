import { Route } from '../../../types/generic';
import { RecoverPasswordController } from '../../controllers/sign-in/recover-password-controller';
import { SendRecoverPasswordController } from '../../controllers/sign-in/send-recover-password-controller';
import { SignInController } from '../../controllers/sign-in/sign-in-controller';
import { renderPage } from '../../middlewares/render-middleware';
import { RecoverPasswordSchema } from '../../schemas/sign-in/recover-password-schema';
import { SendRecoverPasswordSchema } from '../../schemas/sign-in/send-recover-password-schema';
import { SignInSchema } from '../../schemas/sign-in/sign-in-schema';

export const signInRoutes: Route[] = [
  {
    path: '/api/v1/sign-in',
    method: 'POST',
    schema: SignInSchema,
    controller: SignInController.handle,
  },
  {
    path: '/api/v1/sign-in/recover-password',
    method: 'GET',
    controller: renderPage('recover-password'),
  },
  {
    path: '/api/v1/sign-in/recover-password',
    method: 'POST',
    schema: RecoverPasswordSchema,
    controller: RecoverPasswordController.handle,
  },
  {
    path: '/api/v1/sign-in/recover-password/send',
    method: 'POST',
    schema: SendRecoverPasswordSchema,
    controller: SendRecoverPasswordController.handle,
  },
];
