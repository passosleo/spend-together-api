import { z } from 'zod';
import { RequestSchema } from '../../../types/generic';
import { SendRecoverPasswordRequestDTO } from '../../dtos/sign-in/send-recover-password-request-dto';

export const SendRecoverPasswordSchema: RequestSchema<SendRecoverPasswordRequestDTO> = {
  body: {
    email: z.string().email().max(255).trim().toLowerCase(),
  },
};
