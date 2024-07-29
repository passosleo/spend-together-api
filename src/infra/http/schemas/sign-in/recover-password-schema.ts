import { z } from 'zod';
import { RecoverPasswordRequestDTO } from '../../dtos/sign-in/recover-password-request-dto';
import { RequestSchema } from '../../../types/generic';

export const RecoverPasswordSchema: RequestSchema<RecoverPasswordRequestDTO> = {
  body: { newPassword: z.string().min(8).optional() },
  query: { token: z.string() },
};
