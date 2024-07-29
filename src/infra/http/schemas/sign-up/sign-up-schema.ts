import { z } from 'zod';
import { RequestSchema } from '../../../types/generic';
import { SignUpRequestDTO } from '../../dtos/sign-up/sign-up-request-dto';

export const SignUpSchema: RequestSchema<SignUpRequestDTO> = {
  body: {
    email: z.string().email().max(255).trim().toLowerCase(),
    password: z.string().min(8),
    username: z.string().min(3).max(50).trim().toLowerCase(),
    name: z.string().min(3).max(50).trim().toUpperCase().optional(),
    avatar: z.string().optional(),
  },
};
