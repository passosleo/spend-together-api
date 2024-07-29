import { z } from 'zod';
import { RequestSchema } from '../../../types/generic';
import { SignInRequestDTO } from '../../dtos/sign-in/sign-in-request-dto';

export const SignInSchema: RequestSchema<SignInRequestDTO> = {
  body: {
    email: z.string().email().max(255).trim().toLowerCase(),
    password: z.string().min(8),
  },
};
