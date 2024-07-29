import { z } from 'zod';
import { SendVerifyEmailRequestDTO } from '../../dtos/sign-up/send-verify-email-request-dto';
import { RequestSchema } from '../../../types/generic';

export const SendVerifyEmailSchema: RequestSchema<SendVerifyEmailRequestDTO> = {
  body: {
    email: z.string().email().max(255).trim().toLowerCase(),
  },
};
