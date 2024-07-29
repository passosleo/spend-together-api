import { Route } from '../../../types/generic';
import { SendVerifyEmailController } from '../../controllers/sign-up/send-verify-email-controller';
import { SignUpController } from '../../controllers/sign-up/sign-up-controller';
import { VerifyEmailController } from '../../controllers/sign-up/verify-email-controller';
import { renderPage } from '../../middlewares/render-middleware';
import { SendVerifyEmailSchema } from '../../schemas/sign-up/send-verify-email-schema';
import { SignUpSchema } from '../../schemas/sign-up/sign-up-schema';
import { VerifyEmailSchema } from '../../schemas/sign-up/verify-email-schema';

export const signUpRoutes: Route[] = [
  {
    path: '/api/v1/sign-up',
    method: 'POST',
    schema: SignUpSchema,
    controller: SignUpController.handle,
  },
  {
    path: '/api/v1/sign-up/verify-email',
    method: 'GET',
    controller: renderPage('verify-email'),
  },
  {
    path: '/api/v1/sign-up/verify-email',
    method: 'POST',
    schema: VerifyEmailSchema,
    controller: VerifyEmailController.handle,
  },
  {
    path: '/api/v1/sign-up/verify-email/send',
    method: 'POST',
    schema: SendVerifyEmailSchema,
    controller: SendVerifyEmailController.handle,
  },
];
