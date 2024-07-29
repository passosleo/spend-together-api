import { z } from 'zod';
import { VerifyEmailRequestDTO } from '../../dtos/sign-up/verify-email-request-dto';
import { RequestSchema } from '../../../types/generic';

export const VerifyEmailSchema: RequestSchema<VerifyEmailRequestDTO> = {
  query: {
    token: z.string(),
  },
};
